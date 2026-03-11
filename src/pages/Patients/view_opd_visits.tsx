import { useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type SelectOption = {
  id: string;
  name: string;
};

type OpdVisitRow = {
  id: string;
  patient_id: string;
  date_created?: string;
  folder_number?: string;
  patient?: {
    first_name?: string;
    last_name?: string;
    name?: string;
    folder_number?: string;
    code?: string;
  };
  purpose?: {
    id?: string;
    name?: string;
  };
  specialty?: {
    id?: string;
    name?: string;
  };
  status?: {
    id?: string;
    name?: string;
  };
  visit_outcome?: {
    id?: string;
    name?: string;
  };
  doctor?: {
    id?: string;
    name?: string;
  } | null;
  is_completed?: boolean;
};

type OpdResponse = {
  page_title?: string;
  summary?: {
    total?: number;
    incomplete?: number;
    completed?: number;
  };
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  options?: {
    purposes?: SelectOption[];
    specialties?: SelectOption[];
    doctors?: SelectOption[];
  };
  results?: OpdVisitRow[];
};

type StatusFilter = 'incomplete' | 'completed' | 'all';
type PeriodFilter = 'today' | 'this_week' | 'all';

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizePeriod = (value: string): PeriodFilter => {
  const key = value.trim().toLowerCase();
  if (key === 'today') return 'today';
  if (key === 'week' || key === 'thisweek' || key === 'this_week') return 'this_week';
  return 'all';
};

const formatDate = (value?: string): string => {
  if (!value) return 'N/A';
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleString();
};

export default function PatientsViewOpdVisits() {
  const navigate = useNavigate();
  const { filterType, periodType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStatus = (searchParams.get('status') || 'incomplete').toLowerCase();
  const [status, setStatus] = useState<StatusFilter>(
    initialStatus === 'completed' || initialStatus === 'all' ? (initialStatus as StatusFilter) : 'incomplete',
  );
  const [period, setPeriod] = useState<PeriodFilter>(normalizePeriod(searchParams.get('period') || periodType || 'all'));
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [fromDate, setFromDate] = useState(searchParams.get('from_date') || '');
  const [toDate, setToDate] = useState(searchParams.get('to_date') || '');
  const [purposeId, setPurposeId] = useState(searchParams.get('purpose_id') || '');
  const [specialtyId, setSpecialtyId] = useState(searchParams.get('specialty_id') || '');
  const [doctorId, setDoctorId] = useState(searchParams.get('doctor_id') || '');
  const [page, setPage] = useState(asNumber(searchParams.get('page') || 1, 1));
  const limit = 50;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OpdResponse | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchValue(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if ((filterType || '').toLowerCase() !== 'opd') return;
    if (periodType) {
      setPeriod(normalizePeriod(periodType));
    }
  }, [filterType, periodType]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('status', status);
    params.set('period', period);
    if (searchValue) params.set('q', searchValue);
    if (fromDate) params.set('from_date', fromDate);
    if (toDate) params.set('to_date', toDate);
    if (purposeId) params.set('purpose_id', purposeId);
    if (specialtyId) params.set('specialty_id', specialtyId);
    if (doctorId) params.set('doctor_id', doctorId);
    if (page > 1) params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [status, period, searchValue, fromDate, toDate, purposeId, specialtyId, doctorId, page, setSearchParams]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('status', status);
        params.set('period', period);
        params.set('limit', String(limit));
        params.set('page', String(page));
        if (searchValue) params.set('q', searchValue);
        if (fromDate) params.set('from_date', fromDate);
        if (toDate) params.set('to_date', toDate);
        if (purposeId) params.set('purpose_id', purposeId);
        if (specialtyId) params.set('specialty_id', specialtyId);
        if (doctorId) params.set('doctor_id', doctorId);
        const response = await api.get<OpdResponse>(`/legacy/patients/view-opd-visits/?${params.toString()}`);
        if (!mounted) return;
        setData(response);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load OPD visits.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load().catch(() => {
      if (!mounted) return;
      setIsLoading(false);
      setError('Unable to load OPD visits.');
    });
    return () => {
      mounted = false;
    };
  }, [status, period, searchValue, fromDate, toDate, purposeId, specialtyId, doctorId, page]);

  const rows = data?.results || [];
  const total = asNumber(data?.pagination?.total, 0);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const summary = data?.summary || {};
  const options = data?.options || {};

  const pageTitle = useMemo(() => {
    if (period === 'today') return 'OPD - Today';
    if (period === 'this_week') return 'OPD - This Week';
    return 'OPD';
  }, [period]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Patients</p>
            <h2 className="text-xl font-semibold text-slate-900">{pageTitle}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPeriod('today');
                setPage(1);
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${period === 'today' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => {
                setPeriod('this_week');
                setPage(1);
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${period === 'this_week' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}
            >
              This Week
            </button>
            <button
              type="button"
              onClick={() => {
                setPeriod('all');
                setPage(1);
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${period === 'all' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}
            >
              All
            </button>
          </div>
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] text-slate-500">Total</p>
            <p className="text-sm font-semibold text-slate-900">{asNumber(summary.total)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] text-slate-500">Incomplete</p>
            <p className="text-sm font-semibold text-amber-700">{asNumber(summary.incomplete)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] text-slate-500">Completed</p>
            <p className="text-sm font-semibold text-emerald-700">{asNumber(summary.completed)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search patient, folder, visit..."
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
          />
          <SearchableSelectField
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as StatusFilter);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
            <option value="all">All</option>
          </SearchableSelectField>
          <SearchableSelectField
            value={purposeId}
            onChange={(event) => {
              setPurposeId(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
          >
            <option value="">All Purposes</option>
            {(options.purposes || []).map((option) => (
              <option key={option.id} value={option.id}>
                {option.name || option.id}
              </option>
            ))}
          </SearchableSelectField>
          <SearchableSelectField
            value={specialtyId}
            onChange={(event) => {
              setSpecialtyId(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
          >
            <option value="">All Care Teams</option>
            {(options.specialties || []).map((option) => (
              <option key={option.id} value={option.id}>
                {option.name || option.id}
              </option>
            ))}
          </SearchableSelectField>
          <SearchableSelectField
            value={doctorId}
            onChange={(event) => {
              setDoctorId(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
          >
            <option value="">All Doctors</option>
            {(options.doctors || []).map((option) => (
              <option key={option.id} value={option.id}>
                {option.name || option.id}
              </option>
            ))}
          </SearchableSelectField>
          <input
            type="date"
            value={fromDate}
            onChange={(event) => {
              setFromDate(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
          />
          <input
            type="date"
            value={toDate}
            onChange={(event) => {
              setToDate(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
          />
          <button
            type="button"
            onClick={() => {
              setSearchInput('');
              setSearchValue('');
              setFromDate('');
              setToDate('');
              setPurposeId('');
              setSpecialtyId('');
              setDoctorId('');
              setStatus('incomplete');
              setPeriod('all');
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Name</th>
                <th className="px-3 py-2 text-left font-semibold">Date</th>
                <th className="px-3 py-2 text-left font-semibold">Folder No.</th>
                <th className="px-3 py-2 text-left font-semibold">Care Team</th>
                <th className="px-3 py-2 text-left font-semibold">Purpose</th>
                <th className="px-3 py-2 text-left font-semibold">Doctor</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-slate-500">
                    Loading OPD visits...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-slate-500">
                    No OPD visits found.
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const patientName = [row.patient?.first_name, row.patient?.last_name]
                    .filter(Boolean)
                    .join(' ')
                    .trim() || asText(row.patient?.name) || 'Unknown patient';
                  const outcomeName = asText(row.visit_outcome?.name);
                  const statusName = asText(row.status?.name) || (row.is_completed ? 'Completed' : 'Incomplete');
                  return (
                    <tr key={row.id} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-800">{patientName}</td>
                      <td className="px-3 py-2 text-slate-700">{formatDate(row.date_created)}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.patient?.folder_number) || asText(row.patient?.code) || asText(row.folder_number) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.specialty?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.purpose?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.doctor?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">
                        {row.is_completed ? (outcomeName || statusName) : statusName}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/Patients/view_patient?id=${encodeURIComponent(row.patient_id)}`)}
                            className="rounded border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700"
                          >
                            Patient
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/Patients/visit_space?patient_id=${encodeURIComponent(row.patient_id)}&visit_id=${encodeURIComponent(row.id)}`)}
                            className="rounded border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700"
                          >
                            Visit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs">
        <p className="text-slate-600">
          Showing page {page} of {totalPages} ({total} records)
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded border border-slate-300 px-3 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded border border-slate-300 px-3 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
