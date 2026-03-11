import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type Option = { id: string; name: string };
type TypeFilter = 'all' | 'regular' | 'walkin';
type RequestKind = 'all' | 'medication' | 'prescription' | 'infusion' | 'transfusion';

type RequestMedicationRow = {
  id: string;
  visit_id: string;
  date_created?: string;
  is_walkin?: boolean;
  patient?: {
    first_name?: string;
    last_name?: string;
    name?: string;
    folder_number?: string;
    code?: string;
  };
  specialty?: {
    id?: string;
    name?: string;
  };
  doctor?: {
    id?: string;
    name?: string;
  } | null;
  status?: {
    id?: string;
    name?: string;
  } | null;
  counts?: {
    medications?: number;
    prescriptions?: number;
    infusions?: number;
    transfusions?: number;
    total?: number;
  };
  medication_summary?: string;
};

type RequestMedicationIndexResponse = {
  summary?: {
    total?: number;
    regular?: number;
    walkin?: number;
    medications?: number;
    prescriptions?: number;
    infusions?: number;
    transfusions?: number;
  };
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  options?: {
    statuses?: Option[];
    doctors?: Option[];
    specialties?: Option[];
    request_kinds?: Option[];
  };
  results?: RequestMedicationRow[];
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeType = (value: string): TypeFilter => {
  const key = value.trim().toLowerCase();
  if (key === 'regular') return 'regular';
  if (key === 'walkin' || key === 'walkindrug' || key === 'walkin_drug') return 'walkin';
  return 'all';
};

const normalizeKind = (value: string): RequestKind => {
  const key = value.trim().toLowerCase();
  if (key === 'medication') return 'medication';
  if (key === 'prescription') return 'prescription';
  if (key === 'infusion') return 'infusion';
  if (key === 'transfusion') return 'transfusion';
  return 'all';
};

const formatDateTime = (value?: string): string => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const REQUEST_KIND_OPTIONS: Option[] = [
  { id: 'all', name: 'All' },
  { id: 'medication', name: 'Medications' },
  { id: 'prescription', name: 'Prescriptions' },
  { id: 'infusion', name: 'Infusions' },
  { id: 'transfusion', name: 'Transfusions' },
];
const toSelectOptions = (rows: Option[] = []) =>
  rows.map((option) => ({ value: asText(option.id), label: asText(option.name) || asText(option.id) }));

export default function RequestMedicationsIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState<TypeFilter>(normalizeType(searchParams.get('type') || 'all'));
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [statusId, setStatusId] = useState(searchParams.get('status_id') || '');
  const [doctorId, setDoctorId] = useState(searchParams.get('doctor_id') || '');
  const [specialtyId, setSpecialtyId] = useState(searchParams.get('specialty_id') || '');
  const [requestKind, setRequestKind] = useState<RequestKind>(normalizeKind(searchParams.get('request_kind') || 'all'));
  const [fromDate, setFromDate] = useState(searchParams.get('from_date') || '');
  const [toDate, setToDate] = useState(searchParams.get('to_date') || '');
  const [page, setPage] = useState(asNumber(searchParams.get('page') || 1, 1));
  const limit = 50;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RequestMedicationIndexResponse | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchValue(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('type', type);
    if (searchValue) params.set('q', searchValue);
    if (statusId) params.set('status_id', statusId);
    if (doctorId) params.set('doctor_id', doctorId);
    if (specialtyId) params.set('specialty_id', specialtyId);
    if (requestKind !== 'all') params.set('request_kind', requestKind);
    if (fromDate) params.set('from_date', fromDate);
    if (toDate) params.set('to_date', toDate);
    if (page > 1) params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [type, searchValue, statusId, doctorId, specialtyId, requestKind, fromDate, toDate, page, setSearchParams]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('type', type);
        params.set('limit', String(limit));
        params.set('page', String(page));
        if (searchValue) params.set('q', searchValue);
        if (statusId) params.set('status_id', statusId);
        if (doctorId) params.set('doctor_id', doctorId);
        if (specialtyId) params.set('specialty_id', specialtyId);
        if (requestKind !== 'all') params.set('request_kind', requestKind);
        if (fromDate) params.set('from_date', fromDate);
        if (toDate) params.set('to_date', toDate);
        const response = await api.get<RequestMedicationIndexResponse>(`/legacy/request-medications/index/?${params.toString()}`);
        if (!mounted) return;
        setData(response);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load requested medications.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load().catch(() => {
      if (!mounted) return;
      setError('Unable to load requested medications.');
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [type, searchValue, statusId, doctorId, specialtyId, requestKind, fromDate, toDate, page]);

  const rows = data?.results || [];
  const summary = data?.summary || {};
  const options = data?.options || {};
  const requestKindOptions =
    (options.request_kinds || []).length > 0 ? (options.request_kinds || []) : REQUEST_KIND_OPTIONS;
  const total = asNumber(data?.pagination?.total, 0);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const title = useMemo(() => {
    if (type === 'walkin') return 'Requested Medications - Walk-In';
    if (type === 'regular') return 'Requested Medications - Regular';
    return 'Requested Medications';
  }, [type]);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Request Medications</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => { setType('all'); setPage(1); }} className={`rounded-full border px-3 py-1 text-xs font-semibold ${type === 'all' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>All</button>
            <button type="button" onClick={() => { setType('regular'); setPage(1); }} className={`rounded-full border px-3 py-1 text-xs font-semibold ${type === 'regular' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>Regular</button>
            <button type="button" onClick={() => { setType('walkin'); setPage(1); }} className={`rounded-full border px-3 py-1 text-xs font-semibold ${type === 'walkin' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>Walk-In</button>
          </div>
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-7">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"><p className="text-[11px] text-slate-500">Total Visits</p><p className="text-sm font-semibold text-slate-900">{asNumber(summary.total)}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"><p className="text-[11px] text-slate-500">Regular</p><p className="text-sm font-semibold text-slate-900">{asNumber(summary.regular)}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"><p className="text-[11px] text-slate-500">Walk-In</p><p className="text-sm font-semibold text-slate-900">{asNumber(summary.walkin)}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"><p className="text-[11px] text-slate-500">Medications</p><p className="text-sm font-semibold text-slate-900">{asNumber(summary.medications)}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"><p className="text-[11px] text-slate-500">Prescriptions</p><p className="text-sm font-semibold text-slate-900">{asNumber(summary.prescriptions)}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"><p className="text-[11px] text-slate-500">Infusions</p><p className="text-sm font-semibold text-slate-900">{asNumber(summary.infusions)}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"><p className="text-[11px] text-slate-500">Transfusions</p><p className="text-sm font-semibold text-slate-900">{asNumber(summary.transfusions)}</p></div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search patient, folder, code, summary..." className="rounded-lg border border-slate-300 px-3 py-2 text-xs" />
          <SearchableSelect value={requestKind} onChange={(value) => { setRequestKind(normalizeKind(value)); setPage(1); }} options={toSelectOptions(requestKindOptions)} placeholder="All Request Kinds" />
          <SearchableSelect value={statusId} onChange={(value) => { setStatusId(value); setPage(1); }} options={toSelectOptions(options.statuses)} placeholder="All Statuses" />
          <SearchableSelect value={doctorId} onChange={(value) => { setDoctorId(value); setPage(1); }} options={toSelectOptions(options.doctors)} placeholder="All Doctors" />
          <SearchableSelect value={specialtyId} onChange={(value) => { setSpecialtyId(value); setPage(1); }} options={toSelectOptions(options.specialties)} placeholder="All Care Teams" />
          <input type="date" value={fromDate} onChange={(event) => { setFromDate(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2 text-xs" />
          <input type="date" value={toDate} onChange={(event) => { setToDate(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2 text-xs" />
          <button
            type="button"
            onClick={() => {
              setType('all');
              setSearchInput('');
              setSearchValue('');
              setStatusId('');
              setDoctorId('');
              setSpecialtyId('');
              setRequestKind('all');
              setFromDate('');
              setToDate('');
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {error ? <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Visit Date</th>
                <th className="px-3 py-2 text-left font-semibold">Patient</th>
                <th className="px-3 py-2 text-left font-semibold">Folder No.</th>
                <th className="px-3 py-2 text-left font-semibold">Care Team</th>
                <th className="px-3 py-2 text-left font-semibold">Summary</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Type</th>
                <th className="px-3 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && rows.length === 0 ? (
                <tr><td colSpan={8} className="px-3 py-4 text-slate-500">No requested medications found.</td></tr>
              ) : null}
              {rows.map((row) => {
                const patientName = asText(row.patient?.name) || `${asText(row.patient?.first_name)} ${asText(row.patient?.last_name)}`.trim() || 'N/A';
                const folder = asText(row.patient?.folder_number) || asText(row.patient?.code) || 'N/A';
                return (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 text-slate-700">{formatDateTime(row.date_created)}</td>
                    <td className="px-3 py-2 text-slate-900">{patientName}</td>
                    <td className="px-3 py-2 text-slate-700">{folder}</td>
                    <td className="px-3 py-2 text-slate-700">{asText(row.specialty?.name) || 'N/A'}</td>
                    <td className="px-3 py-2 text-slate-700">{asText(row.medication_summary) || 'N/A'}</td>
                    <td className="px-3 py-2 text-slate-700">{asText(row.status?.name) || 'N/A'}</td>
                    <td className="px-3 py-2 text-slate-700">{row.is_walkin ? 'Walk-In' : 'Regular'}</td>
                    <td className="px-3 py-2">
                      <Link to={`/RequestMedications/view_request?visit_id=${encodeURIComponent(row.visit_id)}`} className="rounded border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {isLoading ? <tr><td colSpan={8} className="px-3 py-4 text-slate-500">Loading...</td></tr> : null}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs text-slate-600">
          <span>Page {page} of {totalPages} • {total} visits</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page <= 1} className="rounded border border-slate-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
            <button type="button" onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} disabled={page >= totalPages} className="rounded border border-slate-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
          </div>
        </div>
      </section>
    </div>
  );
}
