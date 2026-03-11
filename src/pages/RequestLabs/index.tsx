import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type Option = { id: string; name: string };
type TypeFilter = 'all' | 'regular' | 'walkin';

type RequestLabRow = {
  id: string;
  visit_id: string;
  patient_id?: string;
  date_created?: string;
  is_walkin?: boolean;
  lab_no?: string;
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
  priority?: {
    id?: string;
    name?: string;
  } | null;
  status?: {
    id?: string;
    name?: string;
  } | null;
  lab_test_summary?: string;
  request_count?: number;
};

type RequestLabIndexResponse = {
  summary?: {
    total?: number;
    regular?: number;
    walkin?: number;
  };
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  options?: {
    statuses?: Option[];
    priorities?: Option[];
    doctors?: Option[];
    specialties?: Option[];
    lab_tests?: Option[];
  };
  results?: RequestLabRow[];
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeType = (value: string): TypeFilter => {
  const key = value.trim().toLowerCase();
  if (key === 'regular') return 'regular';
  if (key === 'walkin' || key === 'walkinlab' || key === 'walkin_lab') return 'walkin';
  return 'all';
};

const formatDateTime = (value?: string): string => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};
const toSelectOptions = (rows: Option[] = []) =>
  rows.map((option) => ({ value: asText(option.id), label: asText(option.name) || asText(option.id) }));

export default function RequestLabsIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState<TypeFilter>(normalizeType(searchParams.get('type') || 'all'));
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [statusId, setStatusId] = useState(searchParams.get('status_id') || '');
  const [priorityId, setPriorityId] = useState(searchParams.get('priority_id') || '');
  const [doctorId, setDoctorId] = useState(searchParams.get('doctor_id') || '');
  const [specialtyId, setSpecialtyId] = useState(searchParams.get('specialty_id') || '');
  const [labTestId, setLabTestId] = useState(searchParams.get('lab_test_id') || '');
  const [fromDate, setFromDate] = useState(searchParams.get('from_date') || '');
  const [toDate, setToDate] = useState(searchParams.get('to_date') || '');
  const [page, setPage] = useState(asNumber(searchParams.get('page') || 1, 1));
  const limit = 50;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RequestLabIndexResponse | null>(null);

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
    if (priorityId) params.set('priority_id', priorityId);
    if (doctorId) params.set('doctor_id', doctorId);
    if (specialtyId) params.set('specialty_id', specialtyId);
    if (labTestId) params.set('lab_test_id', labTestId);
    if (fromDate) params.set('from_date', fromDate);
    if (toDate) params.set('to_date', toDate);
    if (page > 1) params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [type, searchValue, statusId, priorityId, doctorId, specialtyId, labTestId, fromDate, toDate, page, setSearchParams]);

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
        if (priorityId) params.set('priority_id', priorityId);
        if (doctorId) params.set('doctor_id', doctorId);
        if (specialtyId) params.set('specialty_id', specialtyId);
        if (labTestId) params.set('lab_test_id', labTestId);
        if (fromDate) params.set('from_date', fromDate);
        if (toDate) params.set('to_date', toDate);
        const response = await api.get<RequestLabIndexResponse>(`/legacy/request-labs/index/?${params.toString()}`);
        if (!mounted) return;
        setData(response);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load requested labs.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load().catch(() => {
      if (!mounted) return;
      setError('Unable to load requested labs.');
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [type, searchValue, statusId, priorityId, doctorId, specialtyId, labTestId, fromDate, toDate, page]);

  const rows = data?.results || [];
  const summary = data?.summary || {};
  const options = data?.options || {};
  const total = asNumber(data?.pagination?.total, 0);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const title = useMemo(() => {
    if (type === 'walkin') return 'Requested Labs - Walk-In';
    if (type === 'regular') return 'Requested Labs - Regular';
    return 'Requested Labs';
  }, [type]);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Request Labs</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => { setType('all'); setPage(1); }} className={`rounded-full border px-3 py-1 text-xs font-semibold ${type === 'all' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>All</button>
            <button type="button" onClick={() => { setType('regular'); setPage(1); }} className={`rounded-full border px-3 py-1 text-xs font-semibold ${type === 'regular' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>Regular</button>
            <button type="button" onClick={() => { setType('walkin'); setPage(1); }} className={`rounded-full border px-3 py-1 text-xs font-semibold ${type === 'walkin' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>Walk-In</button>
          </div>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] text-slate-500">Total Visits</p>
            <p className="text-sm font-semibold text-slate-900">{asNumber(summary.total)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] text-slate-500">Regular</p>
            <p className="text-sm font-semibold text-slate-900">{asNumber(summary.regular)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] text-slate-500">Walk-In</p>
            <p className="text-sm font-semibold text-slate-900">{asNumber(summary.walkin)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search patient, folder, visit, lab no..." className="rounded-lg border border-slate-300 px-3 py-2 text-xs" />
          <SearchableSelect value={statusId} onChange={(value) => { setStatusId(value); setPage(1); }} options={toSelectOptions(options.statuses)} placeholder="All Statuses" />
          <SearchableSelect value={priorityId} onChange={(value) => { setPriorityId(value); setPage(1); }} options={toSelectOptions(options.priorities)} placeholder="All Priorities" />
          <SearchableSelect value={doctorId} onChange={(value) => { setDoctorId(value); setPage(1); }} options={toSelectOptions(options.doctors)} placeholder="All Doctors" />
          <SearchableSelect value={specialtyId} onChange={(value) => { setSpecialtyId(value); setPage(1); }} options={toSelectOptions(options.specialties)} placeholder="All Care Teams" />
          <SearchableSelect value={labTestId} onChange={(value) => { setLabTestId(value); setPage(1); }} options={toSelectOptions(options.lab_tests)} placeholder="All Lab Tests" />
          <input type="date" value={fromDate} onChange={(event) => { setFromDate(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2 text-xs" />
          <input type="date" value={toDate} onChange={(event) => { setToDate(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2 text-xs" />
          <button
            type="button"
            onClick={() => {
              setType('all');
              setSearchInput('');
              setSearchValue('');
              setStatusId('');
              setPriorityId('');
              setDoctorId('');
              setSpecialtyId('');
              setLabTestId('');
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
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Patient</th>
                <th className="px-3 py-2 text-left font-semibold">Folder No.</th>
                <th className="px-3 py-2 text-left font-semibold">Care Team</th>
                <th className="px-3 py-2 text-left font-semibold">Lab Tests</th>
                <th className="px-3 py-2 text-left font-semibold">Priority</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Type</th>
                <th className="px-3 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={9} className="px-3 py-8 text-center text-slate-500">Loading requested labs...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={9} className="px-3 py-8 text-center text-slate-500">No requested labs found.</td></tr>
              ) : (
                rows.map((row) => {
                  const patientName = [row.patient?.first_name, row.patient?.last_name].filter(Boolean).join(' ').trim() || asText(row.patient?.name) || 'Unknown patient';
                  const folder = asText(row.patient?.folder_number) || asText(row.patient?.code) || 'N/A';
                  return (
                    <tr key={row.id} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(row.date_created)}</td>
                      <td className="px-3 py-2 text-slate-800">
                        {row.patient_id ? (
                          <Link className="text-sky-700 hover:underline" to={`/Patients/view_patient?patient_id=${encodeURIComponent(row.patient_id)}`}>
                            {patientName}
                          </Link>
                        ) : patientName}
                      </td>
                      <td className="px-3 py-2 text-slate-700">{folder}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.specialty?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.lab_test_summary) || 'N/A'} {row.request_count ? `(${row.request_count})` : ''}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.priority?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.status?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{row.is_walkin ? 'Walk-In' : 'Regular'}</td>
                      <td className="px-3 py-2">
                        <Link to={`/RequestLabs/view_request?visit_id=${encodeURIComponent(row.visit_id)}`} className="rounded border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700">
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs">
        <p className="text-slate-600">Showing page {page} of {totalPages} ({total} records)</p>
        <div className="flex items-center gap-2">
          <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded border border-slate-300 px-3 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50">
            Previous
          </button>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded border border-slate-300 px-3 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50">
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
