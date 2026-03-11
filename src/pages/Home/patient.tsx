import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type PatientPayload = {
  id?: string;
  first_name?: string;
  last_name?: string;
  folder_number?: string;
  status_id?: string | number;
  date_modified?: string;
  date_created?: string;
  phone?: string;
  email?: string;
};

type GenericRow = Record<string, unknown>;
type InvoiceRow = {
  id: string;
  patient_visit_id?: string | null;
  final_amount?: string | number | null;
  amount_paid?: string | number | null;
  date_added?: string | null;
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function HomePatient() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patient_id') ?? '';
  const visitIdFromQuery = searchParams.get('visit_id') ?? '';
  const [patient, setPatient] = useState<PatientPayload | null>(null);
  const [visits, setVisits] = useState<GenericRow[]>([]);
  const [pendingLabs, setPendingLabs] = useState(0);
  const [pendingScans, setPendingScans] = useState(0);
  const [billing, setBilling] = useState({ total: 0, paid: 0, balance: 0, invoices: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const query = patientId ? `?patient_id=${encodeURIComponent(patientId)}` : '';
        const [response, detailed] = await Promise.all([
          api.get<{ patient: PatientPayload | null }>(`/legacy/home/patient/${query}`),
          patientId
            ? api.get<{ patient?: PatientPayload; visits?: GenericRow[] }>(
                `/legacy/patients/view-patient/?id=${encodeURIComponent(patientId)}&detailed=1`,
              )
            : Promise.resolve({ patient: null, visits: [] }),
        ]);
        if (!mounted) return;
        const mergedPatient = (detailed.patient as PatientPayload | undefined) || response.patient || null;
        const nextVisits = Array.isArray(detailed.visits) ? detailed.visits : [];
        setPatient(mergedPatient);
        setVisits(nextVisits);

        const activeVisitId = asText(visitIdFromQuery) || asText(nextVisits[0]?.id) || '';
        const visitIds = Array.from(
          new Set(
            nextVisits
              .map((row) => asText(row?.id))
              .filter(Boolean),
          ),
        );
        const targetVisitIds = visitIds.length ? visitIds : (activeVisitId ? [activeVisitId] : []);

        if (targetVisitIds.length) {
          const [invoicePayload, labRowsByVisit, scanRowsByVisit] = await Promise.all([
            api.get<{ invoices?: InvoiceRow[] } | InvoiceRow[]>('/legacy/billings/index/?detailed=1&page=1&page_size=500'),
            Promise.all(
              targetVisitIds.map((visitId) =>
                api
                  .get<GenericRow[]>(`/legacy/request-labs/view-request/?patient_visit_id=${encodeURIComponent(visitId)}`)
                  .catch(() => []),
              ),
            ),
            Promise.all(
              targetVisitIds.map((visitId) =>
                api
                  .get<GenericRow[]>(`/legacy/request-radiologies/view-request/?patient_visit_id=${encodeURIComponent(visitId)}`)
                  .catch(() => []),
              ),
            ),
          ]);
          if (!mounted) return;

          const labs = labRowsByVisit.flatMap((rows) => (Array.isArray(rows) ? rows : []));
          const scans = scanRowsByVisit.flatMap((rows) => (Array.isArray(rows) ? rows : []));
          const invoicesRaw = Array.isArray(invoicePayload)
            ? invoicePayload
            : Array.isArray(invoicePayload?.invoices)
              ? invoicePayload.invoices
              : [];
          const visitIdSet = new Set(targetVisitIds);
          const invoices = invoicesRaw.filter((row) => visitIdSet.has(asText(row.patient_visit_id)));

          setPendingLabs(
            labs.filter((row) => {
              const status = asText(row.status_id);
              return status !== '23' && status !== '24';
            }).length,
          );
          setPendingScans(
            scans.filter((row) => {
              const status = asText(row.status_id);
              return status !== '23' && status !== '24';
            }).length,
          );
          const totals = invoices.reduce(
            (acc, row) => {
              acc.total += asNumber(row.final_amount);
              acc.paid += asNumber(row.amount_paid);
              return acc;
            },
            { total: 0, paid: 0 },
          );
          setBilling({
            total: totals.total,
            paid: totals.paid,
            balance: Math.max(totals.total - totals.paid, 0),
            invoices: invoices.length,
          });
        } else {
          setPendingLabs(0);
          setPendingScans(0);
          setBilling({ total: 0, paid: 0, balance: 0, invoices: 0 });
        }
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load patient data.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [patientId]);

  const name = useMemo(() => {
    if (!patient) return '-';
    const full = [patient.first_name, patient.last_name].filter(Boolean).join(' ').trim();
    return full || '-';
  }, [patient]);

  const status = useMemo(() => {
    if (!patient?.status_id) return 'Unknown';
    return String(patient.status_id) === '1' ? 'Active' : `Status ${patient.status_id}`;
  }, [patient]);

  const updatedOn = patient?.date_modified || patient?.date_created || '-';
  const selectedPatientId = patient?.id || patientId;
  const activeVisitId = useMemo(() => {
    const fromQuery = asText(visitIdFromQuery);
    if (fromQuery) return fromQuery;
    return asText(visits[0]?.id);
  }, [visitIdFromQuery, visits]);

  const handleQuickAction = (action: string) => {
    if (!selectedPatientId) {
      return;
    }
    const encoded = encodeURIComponent(selectedPatientId);
    if (action === 'View profile') {
      navigate(`/Patients/view_patient?patient_id=${encoded}`);
      return;
    }
    if (action === 'View visit') {
      const params = new URLSearchParams();
      params.set('patient_id', selectedPatientId);
      if (activeVisitId) params.set('visit_id', activeVisitId);
      navigate(`/Patients/visit_space?${params.toString()}`);
      return;
    }
    if (action === 'Send reminder') {
      navigate(`/Patients/view_visits?patient_id=${encoded}`);
      return;
    }
    if (action === 'Medication') {
      if (!activeVisitId) return;
      navigate(`/RequestMedications/view_request?visit_id=${encodeURIComponent(activeVisitId)}`);
      return;
    }
    if (action === 'Lab') {
      if (!activeVisitId) return;
      navigate(`/RequestLabs/view_request?visit_id=${encodeURIComponent(activeVisitId)}`);
      return;
    }
    if (action === 'Scan') {
      if (!activeVisitId) return;
      navigate(`/RequestRadiologies/view_request?visit_id=${encodeURIComponent(activeVisitId)}`);
      return;
    }
    if (action === 'Billing') {
      if (!activeVisitId) return;
      const patientCode = asText(patient?.code) || asText(patient?.folder_number) || asText(selectedPatientId);
      const query = new URLSearchParams();
      if (patientCode) query.set('q', patientCode);
      navigate(`/Billings/index?${query.toString()}`);
    }
  };

  const quickActions = [
    'View profile',
    'View visit',
    'Lab',
    'Scan',
    'Medication',
    'Billing',
  ] as const;

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Home</p>
        <h2 className="text-2xl font-semibold text-slate-900">Patient Shortcut</h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs text-slate-500">{patient?.folder_number || '-'}</p>
        <p className="mt-2 text-xl font-semibold text-slate-900">
          {isLoading ? 'Loading...' : name}
        </p>
        <p className="text-xs text-slate-600">Status: {status}</p>
        <div className="mt-4 grid gap-2 text-xs text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500">Last Updated</span>
            <span>{updatedOn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Phone</span>
            <span>{asText(patient?.phone) || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>
            <span>{asText(patient?.email) || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Active Visit</span>
            <span>{activeVisitId || '-'}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Patient Summary</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Pending Labs</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{pendingLabs}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Pending Scans</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{pendingScans}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Invoices</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{billing.invoices}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Bill Total</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">GH₵ {billing.total.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Amount Paid</p>
            <p className="mt-1 text-sm font-semibold text-emerald-700">GH₵ {billing.paid.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Outstanding</p>
            <p className="mt-1 text-sm font-semibold text-rose-700">GH₵ {billing.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={() => handleQuickAction(action)}
            disabled={!selectedPatientId || ((action === 'Lab' || action === 'Scan' || action === 'Medication' || action === 'Billing') && !activeVisitId)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 hover:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
