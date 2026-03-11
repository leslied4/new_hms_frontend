import { useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRecord = Record<string, unknown>;

type PatientRow = {
  id: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  phone?: string;
  folder_number?: string;
  code?: string;
  registration_date?: string;
  date_created?: string;
  gender?: GenericRecord | string | null;
  gender_name?: string;
  gender_id?: string | number;
  sex?: string;
  blood_group?: GenericRecord | null;
};

const asText = (value: unknown): string => String(value ?? '').trim();

const formatDateTime = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return raw;
  return dt.toLocaleString();
};

const displayName = (patient: PatientRow): string => {
  const composed = `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim();
  if (composed) return composed;
  return asText(patient.name) || 'Unknown';
};

const initials = (patient: PatientRow): string => {
  const name = displayName(patient);
  const chunks = name.split(/\s+/).filter(Boolean);
  if (!chunks.length) return 'U';
  if (chunks.length === 1) return chunks[0].charAt(0).toUpperCase();
  return `${chunks[0].charAt(0)}${chunks[1].charAt(0)}`.toUpperCase();
};

const genderLabel = (patient: PatientRow): string => {
  const mappedById = (() => {
    const id = asText(patient.gender_id);
    if (id === '1') return 'Male';
    if (id === '2') return 'Female';
    if (id === '3') return 'Other';
    return '';
  })();
  const label =
    asText((patient.gender as GenericRecord | null)?.name) ||
    asText(patient.gender_name) ||
    asText(patient.sex) ||
    asText(typeof patient.gender === 'string' ? patient.gender : '') ||
    mappedById;
  return label || 'N/A';
};

const bloodGroupLabel = (patient: PatientRow): string =>
  asText((patient.blood_group as GenericRecord | null)?.name) || 'N/A';

export default function PatientsViewPatients() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<PatientRow[]>([]);
  const [searchInput, setSearchInput] = useState(searchParams.get('searchValue') || '');
  const [searchValue, setSearchValue] = useState(searchParams.get('searchValue') || '');
  const [limit, setLimit] = useState(Number(searchParams.get('limit') || '25'));
  const [page, setPage] = useState(Math.max(1, Number(searchParams.get('page') || '1')));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const safeLimit = useMemo(() => {
    if (!Number.isFinite(limit) || limit <= 0) return 25;
    return Math.min(100, Math.max(10, limit));
  }, [limit]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchValue(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchValue) params.set('searchValue', searchValue);
    if (safeLimit !== 25) params.set('limit', String(safeLimit));
    if (page > 1) params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [searchValue, safeLimit, page, setSearchParams]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('limit', String(safeLimit));
        params.set('page', String(page));
        if (searchValue) params.set('searchValue', searchValue);
        const response = await api.get<PatientRow[]>(`/legacy/patients/view-patients/?${params.toString()}`);
        if (!mounted) return;
        setRows(Array.isArray(response) ? response : []);
      } catch (err) {
        if (!mounted) return;
        setRows([]);
        setError(err instanceof Error ? err.message : 'Unable to load patients.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load().catch(() => {
      if (!mounted) return;
      setIsLoading(false);
      setError('Unable to load patients.');
    });
    return () => {
      mounted = false;
    };
  }, [page, safeLimit, searchValue]);

  const hasPrev = page > 1;
  const hasNext = rows.length >= safeLimit;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Patients</p>
            <h2 className="text-xl font-semibold text-slate-900">All Patients</h2>
          </div>
          <div className="text-xs text-slate-500">
            Page {page}
            <span className="mx-2">•</span>
            Showing {rows.length} records
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_120px]">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, phone, folder number, patient code..."
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <SearchableSelectField
            value={safeLimit}
            onChange={(event) => {
              setLimit(Number(event.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </SearchableSelectField>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Sex</th>
                <th className="px-3 py-2">Folder No.</th>
                <th className="px-3 py-2">Mobile</th>
                <th className="px-3 py-2">Blood Group</th>
                <th className="px-3 py-2">Registration Date</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {!isLoading && !rows.length ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-slate-500">
                    {error || 'No patients found.'}
                  </td>
                </tr>
              ) : null}

              {rows.map((patient) => (
                <tr key={patient.id} className="align-top">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                        {initials(patient)}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => navigate(`/Patients/view_patient?id=${patient.id}`)}
                          className="text-left font-semibold text-sky-700 hover:underline"
                        >
                          {displayName(patient)}
                        </button>
                        <p className="text-xs text-slate-500">{asText(patient.code) || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-slate-700">{genderLabel(patient)}</td>
                  <td className="px-3 py-2 text-slate-700">{asText(patient.folder_number) || 'N/A'}</td>
                  <td className="px-3 py-2 text-slate-700">{asText(patient.phone) || 'N/A'}</td>
                  <td className="px-3 py-2 text-slate-700">{bloodGroupLabel(patient)}</td>
                  <td className="px-3 py-2 text-slate-700">
                    {formatDateTime(patient.registration_date || patient.date_created)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      <button
                        type="button"
                        onClick={() => navigate(`/Patients/visit_space?patient_id=${encodeURIComponent(patient.id)}`)}
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700"
                      >
                        Visit
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/Patients/edit_patient?id=${patient.id}`)}
                        className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/Patients/view_patient?id=${patient.id}`)}
                        className="rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-700"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
        <p className="text-slate-600">
          {isLoading ? 'Loading patients...' : `Page ${page}, ${rows.length} record(s)`}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPrev || isLoading}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={!hasNext || isLoading}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
