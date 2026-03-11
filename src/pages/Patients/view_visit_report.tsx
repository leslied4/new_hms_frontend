import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type ReportDiagnosis = {
  id: string;
  date_created?: string | null;
  diagnosis_text?: string | null;
  clinical_summary?: string | null;
  primary_diagnoses?: Array<{ id?: string; name?: string; ill_episode?: string | null }>;
  differential_diagnoses?: Array<{ id?: string; name?: string }>;
  provisional_diagnoses?: Array<{ id?: string; name?: string }>;
  procedures?: Array<{ id?: string; name?: string }>;
};

type ReportVital = {
  id: string;
  date_created?: string | null;
  blood_pressure_1?: string | number | null;
  blood_pressure_2?: string | number | null;
  pulse?: string | number | null;
  respiratory_rate?: string | number | null;
  temperature?: string | number | null;
  oxygen_saturation?: string | number | null;
  weight?: string | number | null;
  bmi?: string | number | null;
};

type VisitReportPayload = {
  institution?: {
    id?: string;
    name?: string | null;
    location?: string | null;
  } | null;
  patient?: {
    id?: string;
    first_name?: string | null;
    last_name?: string | null;
    name?: string | null;
    code?: string | null;
    folder_number?: string | null;
    date_of_birth?: string | null;
    age?: string | number | null;
    gender?: string | null;
    blood_group?: string | null;
    phone?: string | null;
    home_address?: string | null;
  } | null;
  visit?: {
    id?: string | null;
    date_created?: string | null;
    purpose?: string | null;
    outcome?: string | null;
    admitted?: string | number | null;
    attending_doctors?: string[];
  } | null;
  diagnoses?: ReportDiagnosis[];
  vitals?: ReportVital[];
  history?: {
    contraceptions?: Array<{ type?: string | null; date_started?: string | null; duration?: string | null; complications?: string | null }>;
    drugs?: Array<{ current_medication?: string | null; past_medication?: string | null; herbal_medication?: string | null; allergies?: string | null; vaccination?: string | null }>;
    family?: Record<string, unknown> | null;
    gynaecological?: Record<string, unknown> | null;
    surgeries?: Array<{ description?: string | null; comment?: string | null; time_period?: string | null }>;
    haemotransfusions?: Array<{ description?: string | null; comment?: string | null; time_period?: string | null }>;
    illnesses?: Array<{ illness?: string | null; duration?: string | null; comment?: string | null }>;
    pregnancies?: Array<{ date_conceived?: string | null; mode_of_conception?: string | null; mode_of_delivery?: string | null; outcome?: string | null; pregnancy_complications?: string | null; gender?: string | null; weight?: string | number | null }>;
    social?: Record<string, unknown> | null;
  } | null;
  requests?: {
    labs_count?: number;
    radiologies_count?: number;
  } | null;
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const formatDateTime = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString();
};

const triageFromLatestVital = (row: ReportVital | null) => {
  if (!row) return { label: 'Not Assessed', color: '#cbd5e1' };
  const rr = asNumber(row.respiratory_rate);
  const s = asNumber(row.blood_pressure_1);
  const d = asNumber(row.blood_pressure_2);
  const t = asNumber(row.temperature);
  let score = 0;
  if (rr) {
    if (rr < 9 || rr > 30) score += 2;
    else if ((rr >= 9 && rr <= 11) || (rr >= 21 && rr <= 30)) score += 1;
  }
  if (s) {
    if (s < 90 || s >= 180) score += 2;
    else if (s >= 140) score += 1;
  }
  if (d) {
    if (d >= 120) score += 2;
    else if (d >= 90 || d < 60) score += 1;
  }
  if (t) {
    if (t < 35 || t >= 39) score += 2;
    else if ((t >= 35 && t < 36) || (t >= 38 && t < 39)) score += 1;
  }
  if (score >= 7) return { label: 'Immediate', color: '#dc2626' };
  if (score >= 5) return { label: 'Urgent', color: '#ea580c' };
  if (score >= 3) return { label: 'Less Urgent', color: '#d97706' };
  return { label: 'Not Urgent', color: '#16a34a' };
};

const fmtList = (items: string[]) => (items.length ? items.join(', ') : 'N/A');

export default function PatientsViewVisitReport() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = asText(searchParams.get('patient_id') || searchParams.get('id'));
  const visitId = asText(searchParams.get('visit_id'));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<VisitReportPayload | null>(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!patientId) {
        setError('Missing patient_id in URL.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('patient_id', patientId);
        if (visitId) params.set('visit_id', visitId);
        const payload = await api.get<VisitReportPayload>(`/legacy/patients/view-visit-report/?${params.toString()}`);
        if (!mounted) return;
        setReport(payload);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load visit report.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run().catch(() => {
      if (!mounted) return;
      setLoading(false);
      setError('Unable to load visit report.');
    });
    return () => {
      mounted = false;
    };
  }, [patientId, visitId]);

  const vitals = report?.vitals || [];
  const latestVital = useMemo<ReportVital | null>(() => {
    if (!vitals.length) return null;
    const sorted = [...vitals].sort((a, b) => {
      const ta = new Date(asText(a.date_created)).getTime();
      const tb = new Date(asText(b.date_created)).getTime();
      return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
    });
    return sorted[0] || null;
  }, [vitals]);
  const triage = useMemo(() => triageFromLatestVital(latestVital), [latestVital]);

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading visit report...</div>;
  }

  if (error || !report?.patient || !report?.visit) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error || 'Unable to load visit report.'}</div>;
  }

  const patientName = asText(report.patient.name) || `${asText(report.patient.first_name)} ${asText(report.patient.last_name)}`.trim() || 'N/A';
  const diagnoses = report.diagnoses || [];
  const history = report.history || {};

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-slate-900">Visit Report</h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate(`/Patients/visit_space?patient_id=${encodeURIComponent(patientId)}${visitId ? `&visit_id=${encodeURIComponent(visitId)}` : ''}`)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Back To Visit Space
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700"
          >
            Print Report
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{asText(report.institution?.name) || 'Institution'}</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Patient</p>
            <p className="text-sm font-semibold text-slate-900">{patientName}</p>
            <p className="mt-1 text-xs text-slate-600">Code: {asText(report.patient.code) || 'N/A'}</p>
            <p className="text-xs text-slate-600">Folder: {asText(report.patient.folder_number) || 'N/A'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Visit</p>
            <p className="text-sm font-semibold text-slate-900">{formatDateTime(report.visit.date_created)}</p>
            <p className="mt-1 text-xs text-slate-600">Purpose: {asText(report.visit.purpose) || 'N/A'}</p>
            <p className="text-xs text-slate-600">Outcome: {asText(report.visit.outcome) || 'Pending'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Triage</p>
            <div className="mt-1 inline-flex items-center gap-2">
              <span className="inline-block h-3.5 w-3.5 rounded-full" style={{ backgroundColor: triage.color }} />
              <p className="text-sm font-semibold text-slate-900">{triage.label}</p>
            </div>
            <p className="mt-1 text-xs text-slate-600">Doctors: {fmtList(report.visit.attending_doctors || [])}</p>
            <p className="text-xs text-slate-600">Admitted: {asNumber(report.visit.admitted) ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-4 text-xs text-slate-700">
          <div>Gender: <span className="font-semibold">{asText(report.patient.gender) || 'N/A'}</span></div>
          <div>Age: <span className="font-semibold">{asText(report.patient.age) || 'N/A'}</span></div>
          <div>Blood Group: <span className="font-semibold">{asText(report.patient.blood_group) || 'N/A'}</span></div>
          <div>Phone: <span className="font-semibold">{asText(report.patient.phone) || 'N/A'}</span></div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Diagnoses</h2>
        {diagnoses.length ? (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Diagnosis Note</th>
                  <th className="px-3 py-2">Primary</th>
                  <th className="px-3 py-2">Differential</th>
                  <th className="px-3 py-2">Provisional</th>
                  <th className="px-3 py-2">Procedures</th>
                  <th className="px-3 py-2">Clinical Summary</th>
                </tr>
              </thead>
              <tbody>
                {diagnoses.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 align-top">{formatDateTime(row.date_created)}</td>
                    <td className="px-3 py-2 align-top">{asText(row.diagnosis_text) || 'N/A'}</td>
                    <td className="px-3 py-2 align-top">{fmtList((row.primary_diagnoses || []).map((d) => asText(d.name) || asText(d.id)).filter(Boolean))}</td>
                    <td className="px-3 py-2 align-top">{fmtList((row.differential_diagnoses || []).map((d) => asText(d.name) || asText(d.id)).filter(Boolean))}</td>
                    <td className="px-3 py-2 align-top">{fmtList((row.provisional_diagnoses || []).map((d) => asText(d.name) || asText(d.id)).filter(Boolean))}</td>
                    <td className="px-3 py-2 align-top">{fmtList((row.procedures || []).map((p) => asText(p.name) || asText(p.id)).filter(Boolean))}</td>
                    <td className="px-3 py-2 align-top">{asText(row.clinical_summary) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-500">No diagnoses captured for this visit.</p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Vitals</h2>
        {vitals.length ? (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-3 py-2">Date/Time</th>
                  <th className="px-3 py-2">BP</th>
                  <th className="px-3 py-2">Pulse</th>
                  <th className="px-3 py-2">RR</th>
                  <th className="px-3 py-2">Temp</th>
                  <th className="px-3 py-2">SpO2</th>
                  <th className="px-3 py-2">Weight</th>
                  <th className="px-3 py-2">BMI</th>
                </tr>
              </thead>
              <tbody>
                {vitals.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-3 py-2">{formatDateTime(row.date_created)}</td>
                    <td className="px-3 py-2">{asText(row.blood_pressure_1)}/{asText(row.blood_pressure_2)}</td>
                    <td className="px-3 py-2">{asText(row.pulse) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.respiratory_rate) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.temperature) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.oxygen_saturation) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.weight) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.bmi) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-500">No vitals captured for this visit.</p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Health History</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Contraceptions</p>
            {(history.contraceptions || []).length ? (
              <div className="mt-2 space-y-1 text-xs text-slate-700">
                {(history.contraceptions || []).slice(0, 6).map((row, idx) => (
                  <p key={`${asText(row.type)}-${idx}`}>
                    {asText(row.type) || 'N/A'} ({asText(row.duration) || 'N/A'}) - {asText(row.complications) || 'No complications'}
                  </p>
                ))}
              </div>
            ) : <p className="mt-2 text-xs text-slate-500">No contraception history.</p>}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Drug History</p>
            {(history.drugs || []).length ? (
              <div className="mt-2 space-y-1 text-xs text-slate-700">
                {(history.drugs || []).slice(0, 6).map((row, idx) => (
                  <p key={`drug-${idx}`}>
                    Current: {asText(row.current_medication) || 'N/A'} | Allergies: {asText(row.allergies) || 'N/A'}
                  </p>
                ))}
              </div>
            ) : <p className="mt-2 text-xs text-slate-500">No drug history.</p>}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Illnesses</p>
            {(history.illnesses || []).length ? (
              <div className="mt-2 space-y-1 text-xs text-slate-700">
                {(history.illnesses || []).slice(0, 8).map((row, idx) => (
                  <p key={`illness-${idx}`}>
                    {asText(row.illness) || 'N/A'} - {asText(row.duration) || 'N/A'} ({asText(row.comment) || 'No note'})
                  </p>
                ))}
              </div>
            ) : <p className="mt-2 text-xs text-slate-500">No illness history.</p>}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Surgeries / Haemotransfusions</p>
            <div className="mt-2 space-y-1 text-xs text-slate-700">
              {(history.surgeries || []).slice(0, 4).map((row, idx) => (
                <p key={`surgery-${idx}`}>Surgery: {asText(row.description) || 'N/A'}</p>
              ))}
              {(history.haemotransfusions || []).slice(0, 4).map((row, idx) => (
                <p key={`haemo-${idx}`}>Haemotransfusion: {asText(row.description) || 'N/A'}</p>
              ))}
              {!(history.surgeries || []).length && !(history.haemotransfusions || []).length ? <p className="text-slate-500">No surgical/transfusion history.</p> : null}
            </div>
          </div>
          {(history.pregnancies || []).length ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Pregnancy History</p>
              <div className="mt-2 overflow-x-auto">
                <table className="min-w-full text-left text-xs text-slate-700">
                  <thead className="bg-white text-[11px] uppercase tracking-wide text-slate-600">
                    <tr>
                      <th className="px-2 py-1.5">Date Conceived</th>
                      <th className="px-2 py-1.5">Conception</th>
                      <th className="px-2 py-1.5">Delivery</th>
                      <th className="px-2 py-1.5">Outcome</th>
                      <th className="px-2 py-1.5">Complications</th>
                      <th className="px-2 py-1.5">Sex</th>
                      <th className="px-2 py-1.5">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(history.pregnancies || []).map((row, idx) => (
                      <tr key={`preg-${idx}`} className="border-t border-slate-200">
                        <td className="px-2 py-1.5">{formatDateTime(row.date_conceived)}</td>
                        <td className="px-2 py-1.5">{asText(row.mode_of_conception) || 'N/A'}</td>
                        <td className="px-2 py-1.5">{asText(row.mode_of_delivery) || 'N/A'}</td>
                        <td className="px-2 py-1.5">{asText(row.outcome) || 'N/A'}</td>
                        <td className="px-2 py-1.5">{asText(row.pregnancy_complications) || 'N/A'}</td>
                        <td className="px-2 py-1.5">{asText(row.gender) || 'N/A'}</td>
                        <td className="px-2 py-1.5">{asText(row.weight) || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Requested Services Snapshot</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
            <p className="text-xs text-indigo-600">Laboratory Requests</p>
            <p className="text-lg font-semibold text-indigo-900">{asNumber(report.requests?.labs_count)}</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
            <p className="text-xs text-violet-600">Radiology Requests</p>
            <p className="text-lg font-semibold text-violet-900">{asNumber(report.requests?.radiologies_count)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
