import { Fragment, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { getAccessToken } from '../../lib/auth';
import PatientBillModal from '../../components/PatientBillModal';
import ClinicalEncounterWorkspace from '../../components/ClinicalEncounterWorkspace';
import TreatmentPlanWorkspace from '../../components/TreatmentPlanWorkspace';
import SearchableSelect from '../../components/SearchableSelect';

type VisitRow = {
  id: string;
  date_created?: string | null;
  status_name?: string | null;
  purpose_name?: string | null;
  visit_outcome_name?: string | null;
  visit_outcome_id?: string | null;
  admitted?: string | null;
  is_current?: boolean;
};

type DoctorNoteRow = {
  id: string;
  title?: string | null;
  notes?: string | null;
  date_added?: string | null;
  user_name?: string | null;
};

type VisitSpaceResponse = {
  patient?: {
    id?: string;
    first_name?: string | null;
    last_name?: string | null;
    name?: string | null;
    code?: string | null;
    folder_number?: string | null;
    age?: string | number | null;
    gender_id?: string | null;
    date_of_birth?: string | null;
    sex?: string | null;
    blood_group?: string | null;
    sickling_status_name?: string | null;
    marital_status?: string | null;
    occupation?: string | null;
    ethnicity?: string | null;
    religion?: string | null;
    language?: string | null;
    phone?: string | null;
    email?: string | null;
    next_of_kin?: string | null;
    next_of_kin_phone?: string | null;
  } | null;
  selected_visit?: VisitRow | null;
  visits?: VisitRow[];
  queue?: {
    assigned_user_name?: string | null;
  } | null;
  module_counts?: Record<string, number>;
  billing_summary?: {
    invoice_count?: number;
    total?: number;
    paid?: number;
    balance?: number;
  } | null;
  doctor_notes?: DoctorNoteRow[];
};

type VisitOutcomeRow = {
  id: string;
  name?: string | null;
};

type WardTypeRow = {
  id: string;
  name?: string | null;
  status?: string | number | null;
};

type WardRow = {
  id: string;
  name?: string | null;
  ward_type_id?: string | null;
  status?: string | number | null;
};

type BedRow = {
  id: string;
  name?: string | null;
  ward_id?: string | null;
  status?: string | number | null;
};

type AdmissionRow = {
  id: string;
  patient_visit_id?: string | null;
  admission_outcome_id?: string | null;
  date_admitted?: string | null;
  admission_start?: string | null;
  admission_end?: string | null;
  outcome_setter_id?: string | null;
  bed_change_date?: string | null;
  bed?: {
    id?: string | null;
    name?: string | null;
    ward_id?: string | null;
    ward?: {
      id?: string | null;
      name?: string | null;
    } | null;
  } | null;
  admission_outcome?: {
    id?: string | null;
    name?: string | null;
  } | null;
};

type TabKey =
  | 'vitals'
  | 'clinical_encounter'
  | 'review_of_systems'
  | 'diagnoses'
  | 'treatment_plan'
  | 'request_services'
  | 'follow_up'
  | 'flow_sheet'
  | 'mar'
  | 'admitted'
  | 'report';
type RequestServicesTabKey =
  | 'overview'
  | 'labs'
  | 'imaging'
  | 'immunization'
  | 'medication'
  | 'transfusion'
  | 'surgery'
  | 'referral'
  | 'consumables'
  | 'bundled'
  | 'other_services';

type JsonRow = Record<string, unknown>;
type DiagnosisOption = { id: string; name?: string | null; code?: string | null; long_name?: string | null };
type VisitCreateBootstrapResponse = {
  specialties?: Array<{ id: string; name?: string | null; color_code?: string | null }>;
  purposes?: Array<{ id: string; name?: string | null }>;
  providers?: JsonRow[];
  pending_planner_tasks?: Array<{
    id: string;
    task_type?: string | null;
    title?: string | null;
    due_at?: string | null;
    status_id?: string | null;
  }>;
};
type CreateVisitLine = {
  row_id: string;
  specialty_id: string;
  patient_visit_purpose_id: string;
  consultation_id: string;
  assigned_user_id: string;
  description: string;
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatDateTime = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString();
};

const formatMoney = (value: unknown): string =>
  new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(asNumber(value));

const parseJwtPayload = (token: string | null): Record<string, unknown> | null => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const payload = atob(parts[1]);
    return JSON.parse(payload);
  } catch {
    return null;
  }
};

const stripHtml = (value: string): string => value.replace(/<[^>]+>/g, '').trim();

const dateOnly = (value: string): string => {
  if (!value) return '';
  const [date] = value.split('T');
  return date;
};

const findOptionLabel = (options: JsonRow[], id: string): string => {
  if (!id) return '';
  const found = options.find((row) => asText(row.id) === id);
  return asText(found?.name || found?.label || found?.value);
};

const toSearchableOptions = (
  rows: JsonRow[],
  getLabel: (row: JsonRow) => string = (row) => asText(row.name || row.label || row.value || row.id),
) =>
  rows
    .map((row) => {
      const value = asText(row.id);
      const label = getLabel(row);
      if (!value || !label) return null;
      return {
        value,
        label,
        keywords: `${asText(row.code)} ${asText(row.username)} ${asText(row.first_name)} ${asText(row.last_name)}`.trim(),
      };
    })
    .filter((row): row is { value: string; label: string; keywords?: string } => Boolean(row));

const triageFromVitals = (row: JsonRow | null) => {
  if (!row) return { color: '#cbd5e1', label: 'Not Assessed', score: 0 };

  const rr = asNumber(row.respiratory_rate);
  const s = asNumber(row.blood_pressure_1);
  const d = asNumber(row.blood_pressure_2);
  const t = asNumber(row.temperature);
  const avpu = asText(row.avpu_score).toLowerCase();
  const trauma = asText(row.trauma).toLowerCase();
  const mobility = asText(row.mobility).toLowerCase();

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
  if (avpu) {
    if (avpu === 'unresponsive') score += 2;
    else if (['verbal', 'pain', 'confused'].includes(avpu)) score += 1;
  }
  if (trauma === 'yes') score += 1;
  if (mobility) {
    if (['immobile', 'bedbound', 'stretcher'].includes(mobility)) score += 2;
    else if (['assisted', 'walking aid'].includes(mobility)) score += 1;
  }

  if (score >= 7) return { color: '#ff0000', label: 'Immediate', score };
  if (score >= 5) return { color: '#ed7d31', label: 'Urgent', score };
  if (score >= 3) return { color: '#ffc000', label: 'Less Urgent', score };
  return { color: '#92d050', label: 'Not Urgent', score };
};

const spo2Tone = (value: unknown): string => {
  const v = asNumber(value);
  if (!v) return 'border-slate-200 bg-slate-50 text-slate-700';
  if (v < 85) return 'border-rose-200 bg-rose-50 text-rose-700';
  if (v <= 94) return 'border-amber-200 bg-amber-50 text-amber-700';
  return 'border-emerald-200 bg-emerald-50 text-emerald-700';
};

const bpTone = (systolic: unknown, diastolic: unknown): string => {
  const s = asNumber(systolic);
  const d = asNumber(diastolic);
  if (!s || !d) return 'border-slate-200 bg-slate-50 text-slate-700';
  if (s >= 180 || d >= 120) return 'border-rose-200 bg-rose-50 text-rose-700';
  if (s >= 140 || d >= 90) return 'border-amber-200 bg-amber-50 text-amber-700';
  if (s > 120 || d >= 80) return 'border-yellow-200 bg-yellow-50 text-yellow-700';
  if (s < 90 && d < 60) return 'border-indigo-200 bg-indigo-50 text-indigo-700';
  return 'border-emerald-200 bg-emerald-50 text-emerald-700';
};

const ageFromDob = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const dob = new Date(raw);
  if (Number.isNaN(dob.getTime())) return 'N/A';
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age >= 0 ? `${age}` : 'N/A';
};

const ageSpecificationIdFromPatient = (dobValue: unknown, fallbackAgeValue: unknown): string => {
  const dobRaw = asText(dobValue);
  if (dobRaw) {
    const dob = new Date(dobRaw);
    if (!Number.isNaN(dob.getTime())) {
      const now = new Date();
      const diffMs = now.getTime() - dob.getTime();
      if (diffMs >= 0) {
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays <= 28) return '1';
        if (diffDays < 365) return '2';
      }
      let years = now.getFullYear() - dob.getFullYear();
      const monthDiff = now.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) years -= 1;
      if (years >= 1 && years <= 4) return '3';
      if (years >= 5 && years <= 9) return '4';
      if (years >= 10 && years <= 14) return '5';
      if (years >= 15 && years <= 19) return '6';
      if (years >= 20 && years <= 34) return '7';
      if (years >= 35 && years <= 49) return '8';
      if (years >= 50 && years <= 59) return '9';
      if (years >= 60 && years <= 69) return '10';
      if (years >= 70) return '11';
    }
  }

  const fallbackAge = Number(fallbackAgeValue);
  if (!Number.isFinite(fallbackAge) || fallbackAge < 0) return '';
  if (fallbackAge >= 1 && fallbackAge <= 4) return '3';
  if (fallbackAge >= 5 && fallbackAge <= 9) return '4';
  if (fallbackAge >= 10 && fallbackAge <= 14) return '5';
  if (fallbackAge >= 15 && fallbackAge <= 19) return '6';
  if (fallbackAge >= 20 && fallbackAge <= 34) return '7';
  if (fallbackAge >= 35 && fallbackAge <= 49) return '8';
  if (fallbackAge >= 50 && fallbackAge <= 59) return '9';
  if (fallbackAge >= 60 && fallbackAge <= 69) return '10';
  if (fallbackAge >= 70) return '11';
  return '';
};

const makeId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '');
  }
  return `${Date.now()}${Math.floor(Math.random() * 1000000)}`;
};

function RequestLabServicesPanel({ visitId }: { visitId: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [requestLabs, setRequestLabs] = useState<JsonRow[]>([]);
  const [labTests, setLabTests] = useState<JsonRow[]>([]);
  const [priorities, setPriorities] = useState<JsonRow[]>([]);
  const [statuses, setStatuses] = useState<JsonRow[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchRows, setSearchRows] = useState<JsonRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [selectedTestsMap, setSelectedTestsMap] = useState<Record<string, JsonRow>>({});
  const [submitting, setSubmitting] = useState(false);
  const [priorityId, setPriorityId] = useState('1');
  const [servicePlace, setServicePlace] = useState('0');
  const [billToId, setBillToId] = useState('-1');

  const loadData = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Record<string, unknown>>(
        `/legacy/request-labs/view-request/?patient_visit_id=${encodeURIComponent(visitId)}&detailed=1`,
      );
      setRequestLabs(Array.isArray(response?.request_labs) ? (response.request_labs as JsonRow[]) : []);
      setLabTests(Array.isArray(response?.request_lab_tests) ? (response.request_lab_tests as JsonRow[]) : []);
      setPriorities(Array.isArray(response?.priorities) ? (response.priorities as JsonRow[]) : []);
      setStatuses(Array.isArray(response?.statuses) ? (response.statuses as JsonRow[]) : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load lab services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, [visitId]);

  useEffect(() => {
    const term = searchText.trim();
    if (term.length < 2) {
      setSearchRows([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<unknown>(
          `/legacy/patients/get-lab-tests/?searchValue=${encodeURIComponent(term)}&limit=40`,
        );
        if (cancelled) return;
        if (Array.isArray(response)) {
          setSearchRows(response as JsonRow[]);
          return;
        }
        if (response && typeof response === 'object') {
          const payload = response as Record<string, unknown>;
          const candidates = [payload.data, payload.rows, payload.items, payload.lab_tests];
          const firstArray = candidates.find((entry) => Array.isArray(entry));
          setSearchRows(Array.isArray(firstArray) ? (firstArray as JsonRow[]) : []);
          return;
        }
        setSearchRows([]);
      } catch {
        if (!cancelled) setSearchRows([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [searchText]);

  const testById = useMemo(() => {
    const map = new Map<string, JsonRow>();
    [...labTests, ...searchRows].forEach((row) => {
      const id = asText(row.id);
      if (id) map.set(id, row);
    });
    Object.entries(selectedTestsMap).forEach(([id, row]) => map.set(id, row));
    return map;
  }, [labTests, searchRows, selectedTestsMap]);

  const statusById = useMemo(() => {
    const map = new Map<string, string>();
    statuses.forEach((row) => {
      const id = asText(row.id);
      if (!id) return;
      map.set(id, asText(row.name) || id);
    });
    return map;
  }, [statuses]);

  const displayedTests = useMemo(() => (searchText.trim().length >= 2 ? searchRows : labTests.slice(0, 50)), [searchRows, labTests, searchText]);

  const selectedTests = useMemo(
    () => selectedTestIds.map((id) => testById.get(id)).filter(Boolean) as JsonRow[],
    [selectedTestIds, testById],
  );

  const frequentLabs = useMemo(() => {
    const counts = new Map<string, number>();
    requestLabs.forEach((row) => {
      const testId = asText(row.lab_test_id);
      if (!testId) return;
      counts.set(testId, (counts.get(testId) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([testId, count]) => ({ testId, count, test: testById.get(testId) }));
  }, [requestLabs, testById]);

  const toggleTest = (id: string, row?: JsonRow) => {
    setSelectedTestIds((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
    if (row) setSelectedTestsMap((prev) => ({ ...prev, [id]: row }));
  };

  const submitRequests = async () => {
    if (!visitId) return;
    if (!selectedTestIds.length) {
      setError('Select at least one lab test.');
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await Promise.all(
        selectedTestIds.map((labTestId) =>
          api.post('/legacy/request-labs/add-request-lab/', {
            id: makeId(),
            patient_visit_id: visitId,
            lab_test_id: labTestId,
            priority_id: priorityId || '1',
            bill_to_id: billToId || '-1',
            service_place_id: servicePlace || '0',
            status_id: '20',
            is_complete: 0,
            date_created: new Date().toISOString(),
          }),
        ),
      );
      setSuccess('Lab request(s) submitted.');
      setSelectedTestIds([]);
      setSearchText('');
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit lab request(s).');
    } finally {
      setSubmitting(false);
    }
  };

  const cancelRequest = async (id: string) => {
    if (!window.confirm('Cancel this lab request?')) return;
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/legacy/request-labs/cancel-request-lab/?id=${encodeURIComponent(id)}`, {
        status_id: '24',
        is_complete: 0,
      });
      setSuccess('Lab request cancelled.');
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel lab request.');
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading request lab services...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`/RequestLabs/patient_visit_report?visit_id=${encodeURIComponent(visitId)}`}
          className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
        >
          PDF Report
        </a>
        <a
          href={`/RequestLabs/email_patient_visit_report?visit_id=${encodeURIComponent(visitId)}&send_email=1`}
          className="rounded border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700"
        >
          Email Report
        </a>
      </div>

      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Category</th>
                <th className="px-3 py-2 text-left font-semibold">Lab Test</th>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Cost (GHS)</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Files</th>
                <th className="px-3 py-2 text-left font-semibold">Activity</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requestLabs.length ? (
                requestLabs.map((row) => {
                  const requestId = asText(row.id);
                  const labTest = testById.get(asText(row.lab_test_id));
                  const statusId = asText(row.status_id);
                  const statusLabel = statusById.get(statusId) || statusId || 'N/A';
                  return (
                    <tr key={requestId} className="border-t border-slate-100 align-top">
                      <td className="px-3 py-2 text-slate-700">{asText((labTest as JsonRow | undefined)?.investigation_name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(labTest?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(row.date_created)}</td>
                      <td className="px-3 py-2 text-slate-700">{Number(asText(labTest?.value_new) || 0).toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <a
                          href={`/RequestLabs/patient_visit_report?visit_id=${encodeURIComponent(visitId)}&request_lab_id=${encodeURIComponent(requestId)}`}
                          className="text-xs font-semibold text-sky-700 underline"
                        >
                          View
                        </a>
                      </td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.comment) || asText(row.description) || '-'}</td>
                      <td className="px-3 py-2">
                        {statusId !== '24' ? (
                          <button
                            type="button"
                            onClick={() => cancelRequest(requestId)}
                            className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400">Cancelled</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-3 py-4 text-center text-slate-500">No lab requests found for this visit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Make a new Lab Request</h3>
          <div className="mt-3 space-y-3">
            <label className="block text-xs text-slate-600">
              Lab Tests (Internal)
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search Lab Test"
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <div className="max-h-44 overflow-auto rounded border border-slate-200 p-2">
              {searching ? <p className="text-xs text-slate-500">Searching...</p> : null}
              {(displayedTests.length ? displayedTests : labTests.slice(0, 30)).map((row) => {
                const id = asText(row.id);
                return (
                  <label key={id} className="mb-1 flex items-center justify-between rounded px-2 py-1 hover:bg-slate-50">
                    <span className="text-xs text-slate-800">{asText(row.name) || id}</span>
                    <input type="checkbox" checked={selectedTestIds.includes(id)} onChange={() => toggleTest(id, row)} />
                  </label>
                );
              })}
            </div>

            <label className="block text-xs text-slate-600">
              Priority
              <SearchableSelectField value={priorityId} onChange={(event) => setPriorityId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                {priorities.map((row) => (
                  <option key={asText(row.id)} value={asText(row.id)}>
                    {asText(row.name) || asText(row.id)}
                  </option>
                ))}
              </SearchableSelectField>
            </label>

            <label className="block text-xs text-slate-600">
              Charge Bill To
              <SearchableSelectField value={billToId} onChange={(event) => setBillToId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                <option value="-1">Cash / Self Pay</option>
              </SearchableSelectField>
            </label>

            <label className="block text-xs text-slate-600">
              Service Place
              <SearchableSelectField value={servicePlace} onChange={(event) => setServicePlace(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                <option value="0">Place 1</option>
                <option value="1">Place 2</option>
              </SearchableSelectField>
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={submitRequests}
                disabled={submitting || !selectedTestIds.length}
                className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTestIds([]);
                  setSearchText('');
                }}
                className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Frequently Requested Labs</h3>
          <div className="mt-3 space-y-2">
            {frequentLabs.length ? (
              frequentLabs.map((row) => (
                <button
                  key={row.testId}
                  type="button"
                  onClick={() => {
                    const test = row.test || null;
                    if (test) toggleTest(row.testId, test);
                  }}
                  className="flex w-full items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-2 text-left hover:bg-slate-100"
                >
                  <span className="text-xs font-semibold text-slate-800">{asText((row.test as JsonRow | undefined)?.name) || row.testId}</span>
                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">{row.count}</span>
                </button>
              ))
            ) : (
              <p className="text-xs text-slate-500">No frequent labs yet for this visit.</p>
            )}
          </div>

          {selectedTests.length ? (
            <div className="mt-3 rounded border border-emerald-200 bg-emerald-50 p-2">
              <p className="text-[11px] font-semibold text-emerald-700">Selected</p>
              <p className="text-xs text-emerald-700">{selectedTests.map((row) => asText(row.name)).filter(Boolean).join(', ')}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function RequestScanServicesPanel({ visitId }: { visitId: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [requestScans, setRequestScans] = useState<JsonRow[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchRows, setSearchRows] = useState<JsonRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedScanIds, setSelectedScanIds] = useState<string[]>([]);
  const [selectedScansMap, setSelectedScansMap] = useState<Record<string, JsonRow>>({});
  const [submitting, setSubmitting] = useState(false);
  const [outsourced, setOutsourced] = useState(false);
  const [priorityId, setPriorityId] = useState('1');
  const [servicePlace, setServicePlace] = useState('0');
  const [billToId, setBillToId] = useState('-1');
  const [priorities, setPriorities] = useState<JsonRow[]>([]);
  const [statuses, setStatuses] = useState<JsonRow[]>([]);
  const [categories, setCategories] = useState<JsonRow[]>([]);
  const [scanDetailsById, setScanDetailsById] = useState<Record<string, JsonRow>>({});

  const statusById = useMemo(() => {
    const map = new Map<string, string>();
    statuses.forEach((row) => {
      const id = asText(row.id);
      if (!id) return;
      map.set(id, asText(row.name) || id);
    });
    return map;
  }, [statuses]);

  const categoryById = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((row) => {
      const id = asText(row.id);
      if (!id) return;
      map.set(id, asText(row.name) || id);
    });
    return map;
  }, [categories]);

  const scanById = useMemo(() => {
    const map = new Map<string, JsonRow>();
    Object.entries(scanDetailsById).forEach(([id, row]) => map.set(id, row));
    searchRows.forEach((row) => {
      const id = asText(row.id);
      if (id) map.set(id, row);
    });
    Object.entries(selectedScansMap).forEach(([id, row]) => map.set(id, row));
    return map;
  }, [scanDetailsById, searchRows, selectedScansMap]);

  const loadData = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const [requestRows, priorityRows, statusRows, categoryRows] = await Promise.all([
        api.get<unknown>(`/legacy/request-radiologies/view-request/?patient_visit_id=${encodeURIComponent(visitId)}`),
        api.get<unknown>('/priorities/'),
        api.get<unknown>('/statuses/'),
        api.get<unknown>('/radiology_categories/'),
      ]);

      const normalizedRequests = Array.isArray(requestRows) ? (requestRows as JsonRow[]) : [];
      setRequestScans(normalizedRequests);
      setPriorities(Array.isArray(priorityRows) ? (priorityRows as JsonRow[]) : []);
      setStatuses(Array.isArray(statusRows) ? (statusRows as JsonRow[]) : []);
      setCategories(Array.isArray(categoryRows) ? (categoryRows as JsonRow[]) : []);

      const scanIds = Array.from(
        new Set(normalizedRequests.map((row) => asText(row.radiology_scan_id)).filter(Boolean)),
      );
      if (!scanIds.length) {
        setScanDetailsById({});
      } else {
        const scanEntries = await Promise.all(
          scanIds.map(async (id) => {
            try {
              const scan = await api.get<JsonRow>(`/radiology_scans/${encodeURIComponent(id)}/`);
              return [id, scan] as const;
            } catch {
              return [id, null] as const;
            }
          }),
        );
        const next: Record<string, JsonRow> = {};
        scanEntries.forEach(([id, row]) => {
          if (row) next[id] = row;
        });
        setScanDetailsById(next);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load scan services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, [visitId]);

  useEffect(() => {
    const term = searchText.trim();
    if (term.length < 2) {
      setSearchRows([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<unknown>(
          `/legacy/patients/get-radiology-scans/?searchValue=${encodeURIComponent(term)}&limit=40`,
        );
        if (cancelled) return;
        const rows = Array.isArray(response)
          ? (response as JsonRow[])
          : response && typeof response === 'object'
            ? ((response as Record<string, unknown>).data as JsonRow[]) || []
            : [];
        setSearchRows(Array.isArray(rows) ? rows : []);
      } catch {
        if (!cancelled) setSearchRows([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [searchText]);

  const displayedScans = useMemo(
    () => (searchText.trim().length >= 2 ? searchRows : Object.values(scanDetailsById).slice(0, 60)),
    [searchRows, scanDetailsById, searchText],
  );

  const selectedScans = useMemo(
    () => selectedScanIds.map((id) => scanById.get(id)).filter(Boolean) as JsonRow[],
    [selectedScanIds, scanById],
  );

  const frequentScans = useMemo(() => {
    const counts = new Map<string, number>();
    requestScans.forEach((row) => {
      const scanId = asText(row.radiology_scan_id);
      if (!scanId) return;
      counts.set(scanId, (counts.get(scanId) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([scanId, count]) => ({ scanId, count, scan: scanById.get(scanId) }));
  }, [requestScans, scanById]);

  const toggleScan = (id: string, row?: JsonRow) => {
    setSelectedScanIds((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
    if (row) setSelectedScansMap((prev) => ({ ...prev, [id]: row }));
  };

  const submitRequests = async () => {
    if (!visitId) return;
    if (!selectedScanIds.length) {
      setError('Select at least one scan.');
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await Promise.all(
        selectedScanIds.map((radiologyScanId) =>
          api.post('/legacy/request-radiologies/add-request-radiology/', {
            id: makeId(),
            patient_visit_id: visitId,
            radiology_scan_id: radiologyScanId,
            priority_id: priorityId || '1',
            bill_to_id: billToId || '-1',
            service_place_id: servicePlace || '0',
            status_id: '20',
            completed: 0,
            is_complete: 0,
            source: outsourced ? 'Outsourced' : billToId === '-1' ? 'Patient' : 'Insurance',
            date_created: new Date().toISOString(),
          }),
        ),
      );
      setSuccess('Scan request(s) submitted.');
      setSelectedScanIds([]);
      setSearchText('');
      setOutsourced(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit scan request(s).');
    } finally {
      setSubmitting(false);
    }
  };

  const cancelRequest = async (id: string) => {
    if (!window.confirm('Cancel this scan request?')) return;
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/legacy/request-radiologies/cancel-request-radiology/?id=${encodeURIComponent(id)}`, {
        status_id: '24',
        completed: 0,
      });
      setSuccess('Scan request cancelled.');
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel scan request.');
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading request scan services...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`/RequestRadiologies/view_request?visit_id=${encodeURIComponent(visitId)}`}
          className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
        >
          Scan Reports
        </a>
        <a
          href={`/legacy/request-radiologies/email-patient-visit-report/?patient_visit_id=${encodeURIComponent(visitId)}&send_email=1`}
          className="rounded border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700"
        >
          Email Scan Report
        </a>
      </div>

      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Category</th>
                <th className="px-3 py-2 text-left font-semibold">Scan</th>
                <th className="px-3 py-2 text-left font-semibold">Frequency</th>
                <th className="px-3 py-2 text-left font-semibold">Cost (GHS)</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Files</th>
                <th className="px-3 py-2 text-left font-semibold">Activity</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requestScans.length ? (
                requestScans.map((row) => {
                  const requestId = asText(row.id);
                  const scan = scanById.get(asText(row.radiology_scan_id));
                  const categoryId = asText((scan as JsonRow | undefined)?.radiology_category_id);
                  const statusId = asText(row.status_id);
                  return (
                    <tr key={requestId} className="border-t border-slate-100 align-top">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(row.date_created)}</td>
                      <td className="px-3 py-2 text-slate-700">{categoryById.get(categoryId) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(scan?.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.frequency) || '-'}</td>
                      <td className="px-3 py-2 text-slate-700">{Number(asText(scan?.value_new) || 0).toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {statusById.get(statusId) || statusId || 'N/A'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <a
                          href={`/RequestRadiologies/patient_visit_report?visit_id=${encodeURIComponent(visitId)}&request_id=${encodeURIComponent(requestId)}`}
                          className="text-xs font-semibold text-sky-700 underline"
                        >
                          View
                        </a>
                      </td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.comment) || asText(row.description) || '-'}</td>
                      <td className="px-3 py-2">
                        {statusId !== '24' ? (
                          <button
                            type="button"
                            onClick={() => cancelRequest(requestId)}
                            className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400">Cancelled</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-3 py-4 text-center text-slate-500">No scan requests found for this visit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Request A Scan</h3>
          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-2 text-xs text-slate-700">
              <input type="checkbox" checked={outsourced} onChange={(event) => setOutsourced(event.target.checked)} />
              Outsourced
            </label>

            <label className="block text-xs text-slate-600">
              Radiology Scans
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search Radiology Scan"
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <div className="max-h-44 overflow-auto rounded border border-slate-200 p-2">
              {searching ? <p className="text-xs text-slate-500">Searching...</p> : null}
              {displayedScans.map((row) => {
                const id = asText(row.id);
                return (
                  <label key={id} className="mb-1 flex items-center justify-between rounded px-2 py-1 hover:bg-slate-50">
                    <span className="text-xs text-slate-800">{asText(row.name) || id}</span>
                    <input type="checkbox" checked={selectedScanIds.includes(id)} onChange={() => toggleScan(id, row)} />
                  </label>
                );
              })}
            </div>

            <label className="block text-xs text-slate-600">
              Priority
              <SearchableSelectField value={priorityId} onChange={(event) => setPriorityId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                {priorities.map((row) => (
                  <option key={asText(row.id)} value={asText(row.id)}>
                    {asText(row.name) || asText(row.id)}
                  </option>
                ))}
              </SearchableSelectField>
            </label>

            <label className="block text-xs text-slate-600">
              Charge Bill To
              <SearchableSelectField value={billToId} onChange={(event) => setBillToId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                <option value="-1">Cash / Self Pay</option>
              </SearchableSelectField>
            </label>

            <label className="block text-xs text-slate-600">
              Service Place
              <SearchableSelectField value={servicePlace} onChange={(event) => setServicePlace(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                <option value="0">Place 1</option>
                <option value="1">Place 2</option>
              </SearchableSelectField>
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={submitRequests}
                disabled={submitting || !selectedScanIds.length}
                className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedScanIds([]);
                  setSearchText('');
                  setOutsourced(false);
                }}
                className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Frequently Requested Scans</h3>
          <div className="mt-3 space-y-2">
            {frequentScans.length ? (
              frequentScans.map((row) => (
                <button
                  key={row.scanId}
                  type="button"
                  onClick={() => {
                    const scan = row.scan || null;
                    if (scan) toggleScan(row.scanId, scan);
                  }}
                  className="flex w-full items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-2 text-left hover:bg-slate-100"
                >
                  <span className="text-xs font-semibold text-slate-800">{asText((row.scan as JsonRow | undefined)?.name) || row.scanId}</span>
                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">{row.count}</span>
                </button>
              ))
            ) : (
              <p className="text-xs text-slate-500">No frequent scans yet for this visit.</p>
            )}
          </div>

          {selectedScans.length ? (
            <div className="mt-3 rounded border border-emerald-200 bg-emerald-50 p-2">
              <p className="text-[11px] font-semibold text-emerald-700">Selected</p>
              <p className="text-xs text-emerald-700">{selectedScans.map((row) => asText(row.name)).filter(Boolean).join(', ')}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function RequestImmunizationServicesPanel({ visitId, patientId }: { visitId: string; patientId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rows, setRows] = useState<JsonRow[]>([]);
  const [medicationTypes, setMedicationTypes] = useState<JsonRow[]>([]);
  const [dosageForms, setDosageForms] = useState<JsonRow[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchRows, setSearchRows] = useState<JsonRow[]>([]);
  const [selectedStock, setSelectedStock] = useState<JsonRow | null>(null);
  const [medicationTypeId, setMedicationTypeId] = useState('');
  const [dosageFormId, setDosageFormId] = useState('');
  const [dosageCount, setDosageCount] = useState('1');
  const [viewingId, setViewingId] = useState('');

  const loadView = async () => {
    if (!patientId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Record<string, unknown>>(
        `/legacy/immunization-request/view-immunization-requests/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=200`,
      );
      const fetchedRows = Array.isArray(response?.data) ? (response.data as JsonRow[]) : [];
      const fetchedMedicationTypes = Array.isArray(response?.medication_types) ? (response.medication_types as JsonRow[]) : [];
      const fetchedDosageForms = Array.isArray(response?.dosage_forms) ? (response.dosage_forms as JsonRow[]) : [];
      setRows(fetchedRows);
      setMedicationTypes(fetchedMedicationTypes);
      setDosageForms(fetchedDosageForms);
      if (!medicationTypeId && fetchedMedicationTypes.length) setMedicationTypeId(asText(fetchedMedicationTypes[0].id));
      if (!dosageFormId && fetchedDosageForms.length) setDosageFormId(asText(fetchedDosageForms[0].id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load immunization requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => undefined);
  }, [visitId, patientId]);

  useEffect(() => {
    const term = searchText.trim();
    if (term.length < 2) {
      setSearchRows([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<Record<string, unknown>>(
          `/legacy/request-medications/search-drug-stocks/?searchValue=${encodeURIComponent(term)}&limit=40`,
        );
        if (cancelled) return;
        const nextRows = Array.isArray(response?.results) ? (response.results as JsonRow[]) : [];
        setSearchRows(nextRows);
      } catch {
        if (!cancelled) setSearchRows([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [searchText]);

  const submitImmunization = async () => {
    if (!patientId) return;
    if (!selectedStock) {
      setError('Select a vaccine from search first.');
      return;
    }
    if (!medicationTypeId || !dosageFormId) {
      setError('Select vaccine type and route.');
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/immunization-request/request-immunization/', {
        patient_id: patientId,
        patient_visit_id: visitId || undefined,
        drug_stock_id: asText(selectedStock.id),
        medication_type_id: medicationTypeId,
        dosage_form_id: dosageFormId,
        dosage_count: asNumber(dosageCount) || 1,
        batch_no: asText(selectedStock.batch_number) || undefined,
      });
      setSuccess('Immunization request added.');
      setSelectedStock(null);
      setSearchText('');
      setSearchRows([]);
      setDosageCount('1');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save immunization request.');
    } finally {
      setSaving(false);
    }
  };

  const deleteImmunization = async (id: string) => {
    if (!id) return;
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/immunization-request/delete-immunization/', { id });
      setSuccess('Immunization request deleted.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete immunization request.');
    }
  };

  const selectedStockLabel = useMemo(() => {
    if (!selectedStock) return '';
    return asText(selectedStock.name) || asText(selectedStock.id);
  }, [selectedStock]);

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading immunization requests...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Doses (Taken/Count)</th>
                <th className="px-3 py-2 text-left font-semibold">Vaccine</th>
                <th className="px-3 py-2 text-left font-semibold">Vaccine Type</th>
                <th className="px-3 py-2 text-left font-semibold">Route</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((entry) => {
                  const immunization = (entry.immunization as JsonRow | undefined) || {};
                  const item = (entry.item as JsonRow | undefined) || {};
                  const medicationType = (entry.medication_type as JsonRow | undefined) || {};
                  const dosageForm = (entry.dosage_form as JsonRow | undefined) || {};
                  const id = asText(immunization.id);
                  const dosesTaken = asNumber(immunization.doses_taken);
                  const dosesCount = asNumber(immunization.dosage_count);
                  const statusLabel = asText(entry.status_label) || 'Not Started';
                  return (
                    <Fragment key={id}>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 text-slate-700">
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                              statusLabel === 'Fulfilled'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : statusLabel === 'Partly Fulfilled'
                                ? 'border-amber-200 bg-amber-50 text-amber-700'
                                : 'border-slate-200 bg-slate-50 text-slate-700'
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-slate-700">{`${dosesTaken} / ${dosesCount}`}</td>
                        <td className="px-3 py-2 text-slate-900">{asText(item.name) || asText(item.full_name) || asText(immunization.drug_stock_id) || 'N/A'}</td>
                        <td className="px-3 py-2 text-slate-700">{asText(medicationType.type_name) || 'N/A'}</td>
                        <td className="px-3 py-2 text-slate-700">{asText(dosageForm.name) || 'N/A'}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setViewingId((current) => (current === id ? '' : id))}
                              className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
                            >
                              {viewingId === id ? 'Hide' : 'View'}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteImmunization(id)}
                              className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {viewingId === id ? (
                        <tr className="border-t border-slate-100 bg-slate-50/70">
                          <td colSpan={6} className="px-3 py-3 text-xs text-slate-700">
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-slate-500">Date Requested</p>
                                <p className="font-semibold text-slate-800">{formatDateTime(immunization.dor)}</p>
                              </div>
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-slate-500">Date Administered</p>
                                <p className="font-semibold text-slate-800">{formatDateTime(immunization.doa)}</p>
                              </div>
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-slate-500">Batch Number</p>
                                <p className="font-semibold text-slate-800">{asText(immunization.batch_no) || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-slate-500">Remarks</p>
                                <p className="font-semibold text-slate-800">{asText(immunization.remarks) || 'N/A'}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-center text-slate-500">No immunization requests found for this patient.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">Request Immunization</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="block text-xs text-slate-600 md:col-span-2 xl:col-span-2">
            Select Vaccine
            <input
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setSelectedStock(null);
              }}
              placeholder="Vaccine name / code / batch"
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs text-slate-600">
            Select Vaccine Type
            <SearchableSelectField
              value={medicationTypeId}
              onChange={(event) => setMedicationTypeId(event.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select Vaccine Type</option>
              {medicationTypes.map((row) => (
                <option key={asText(row.id)} value={asText(row.id)}>
                  {asText(row.type_name) || asText(row.id)}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Select Administration Route
            <SearchableSelectField
              value={dosageFormId}
              onChange={(event) => setDosageFormId(event.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select Administration Route</option>
              {dosageForms.map((row) => (
                <option key={asText(row.id)} value={asText(row.id)}>
                  {asText(row.name) || asText(row.id)}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Number of Doses
            <SearchableSelectField value={dosageCount} onChange={(event) => setDosageCount(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="1">One Dose</option>
              <option value="2">Two Doses</option>
              <option value="3">Three Doses</option>
            </SearchableSelectField>
          </label>
        </div>

        {selectedStock ? (
          <div className="mt-3 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            <p className="font-semibold">Selected Vaccine</p>
            <p>{selectedStockLabel}{asText(selectedStock.batch_number) ? ` • Batch ${asText(selectedStock.batch_number)}` : ''}</p>
          </div>
        ) : null}

        {searchText.trim().length >= 2 ? (
          <div className="mt-3 max-h-56 overflow-auto rounded border border-slate-200">
            {searching ? <p className="px-3 py-2 text-xs text-slate-500">Searching vaccines...</p> : null}
            {searchRows.map((row) => {
              const id = asText(row.id);
              const isSelected = asText(selectedStock?.id) === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSelectedStock(row);
                    setSearchText(asText(row.name) || asText(row.id));
                    setSearchRows([]);
                  }}
                  className={`flex w-full items-start justify-between border-b border-slate-100 px-3 py-2 text-left ${isSelected ? 'bg-cyan-50' : 'hover:bg-slate-50'}`}
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{asText(row.name) || id}</p>
                    <p className="text-[11px] text-slate-500">
                      Batch: {asText(row.batch_number) || 'N/A'} • Available: {asNumber(row.available_quantity)}
                    </p>
                  </div>
                </button>
              );
            })}
            {!searching && !searchRows.length ? <p className="px-3 py-2 text-xs text-slate-500">No vaccines found.</p> : null}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={submitImmunization}
            disabled={saving || !selectedStock || !medicationTypeId || !dosageFormId}
            className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            {saving ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchText('');
              setSearchRows([]);
              setSelectedStock(null);
              setDosageCount('1');
              if (medicationTypes.length) setMedicationTypeId(asText(medicationTypes[0].id));
              if (dosageForms.length) setDosageFormId(asText(dosageForms[0].id));
            }}
            className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function RequestConsumablesServicesPanel({ visitId }: { visitId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchRows, setSearchRows] = useState<JsonRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [requests, setRequests] = useState<JsonRow[]>([]);
  const [stocksById, setStocksById] = useState<Record<string, JsonRow>>({});
  const [selectedStockId, setSelectedStockId] = useState('');
  const [quantity, setQuantity] = useState('1');

  const loadRequests = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<unknown>(
        `/legacy/patients/get-used-consumables/?patient_visit_id=${encodeURIComponent(visitId)}&limit=200`,
      );
      const rows = Array.isArray(response) ? (response as JsonRow[]) : [];
      setRequests(rows);
      const stockIds = Array.from(
        new Set(
          rows
            .map((row) => asText(row.department_stock_id))
            .filter(Boolean),
        ),
      );
      if (stockIds.length) {
        const stockResponse = await api.get<Record<string, unknown>>(
          `/legacy/patients/get-consumable-stocks/?selected_ids=${encodeURIComponent(stockIds.join(','))}&limit=200`,
        );
        const stockRows = Array.isArray(stockResponse?.results) ? (stockResponse.results as JsonRow[]) : [];
        const nextMap: Record<string, JsonRow> = {};
        stockRows.forEach((row) => {
          const id = asText(row.id);
          if (id) nextMap[id] = row;
        });
        setStocksById(nextMap);
      } else {
        setStocksById({});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load consumables requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests().catch(() => undefined);
  }, [visitId]);

  useEffect(() => {
    const term = searchText.trim();
    if (term.length < 2) {
      setSearchRows([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<Record<string, unknown>>(
          `/legacy/patients/get-consumable-stocks/?search=${encodeURIComponent(term)}&limit=40`,
        );
        if (cancelled) return;
        const rows = Array.isArray(response?.results) ? (response.results as JsonRow[]) : [];
        setSearchRows(rows);
      } catch {
        if (!cancelled) setSearchRows([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 280);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [searchText]);

  const selectedStock = useMemo(
    () => searchRows.find((row) => asText(row.id) === selectedStockId) || stocksById[selectedStockId] || null,
    [searchRows, selectedStockId, stocksById],
  );

  const submitConsumable = async () => {
    if (!visitId) return;
    if (!selectedStockId) {
      setError('Select a consumable from search.');
      return;
    }
    const qty = Math.max(1, Math.floor(asNumber(quantity) || 0));
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/add-consumables-request/', {
        id: makeId(),
        patient_visit_id: visitId,
        department_stock_id: selectedStockId,
        quantity: qty,
        status_id: '20',
        bill_to_id: '-1',
        date_created: new Date().toISOString(),
      });
      setSuccess('Consumable request added.');
      setSelectedStockId('');
      setSearchText('');
      setSearchRows([]);
      setQuantity('1');
      await loadRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save consumable request.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading consumables...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Name</th>
                <th className="px-3 py-2 text-left font-semibold">Cost (GHS)</th>
                <th className="px-3 py-2 text-left font-semibold">Quantity</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length ? (
                requests.map((row) => {
                  const stockId = asText(row.department_stock_id);
                  const stock = stocksById[stockId];
                  return (
                    <tr key={asText(row.id)} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(row.date_created)}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(stock?.name) || stockId || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asNumber(stock?.unit_selling_price).toFixed(2)}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.quantity) || '0'}</td>
                      <td className="px-3 py-2 text-slate-700">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold">
                          {asText(row.status_id) || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-slate-500">No consumables requested yet for this visit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Add Consumable</h3>
          <div className="mt-3 space-y-3">
            <label className="block text-xs text-slate-600">
              Consumable
              <input
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                  setSelectedStockId('');
                }}
                placeholder="Search consumables"
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <div className="max-h-44 overflow-auto rounded border border-slate-200">
              {searching ? <p className="px-3 py-2 text-xs text-slate-500">Searching...</p> : null}
              {searchRows.map((row) => {
                const id = asText(row.id);
                const isSelected = selectedStockId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedStockId(id)}
                    className={`flex w-full items-start justify-between border-b border-slate-100 px-3 py-2 text-left ${
                      isSelected ? 'bg-cyan-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>
                      <span className="block text-xs font-semibold text-slate-800">{asText(row.name) || id}</span>
                      <span className="block text-[11px] text-slate-500">
                        Qty Left: {asText(row.quantity_left) || '0'}
                        {asText(row.batch_number) ? ` • Batch: ${asText(row.batch_number)}` : ''}
                        {asText(row.expiry_date) ? ` • Exp: ${formatDateTime(row.expiry_date)}` : ''}
                      </span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">{asNumber(row.unit_selling_price).toFixed(2)}</span>
                  </button>
                );
              })}
              {!searching && searchText.trim().length >= 2 && !searchRows.length ? (
                <p className="px-3 py-2 text-xs text-slate-500">No consumables found.</p>
              ) : null}
            </div>
            {selectedStock ? (
              <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                Selected: <span className="font-semibold">{asText(selectedStock.name) || asText(selectedStock.id)}</span>
              </div>
            ) : null}
            <label className="block text-xs text-slate-600">
              Quantity
              <input
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                type="number"
                min={1}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={submitConsumable}
                disabled={saving || !selectedStockId}
                className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {saving ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStockId('');
                  setSearchText('');
                  setSearchRows([]);
                  setQuantity('1');
                }}
                className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestSurgeryServicesPanel({ visitId, diagnosisRows }: { visitId: string; diagnosisRows: JsonRow[] }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionSaving, setActionSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rows, setRows] = useState<JsonRow[]>([]);
  const [priorities, setPriorities] = useState<JsonRow[]>([]);
  const [statuses, setStatuses] = useState<JsonRow[]>([]);
  const [surgeryTypes, setSurgeryTypes] = useState<JsonRow[]>([]);
  const [anaesthesias, setAnaesthesias] = useState<JsonRow[]>([]);
  const [users, setUsers] = useState<JsonRow[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchRows, setSearchRows] = useState<JsonRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedSurgeryStockId, setSelectedSurgeryStockId] = useState('');
  const [selectedSurgeryStock, setSelectedSurgeryStock] = useState<JsonRow | null>(null);
  const [priorityId, setPriorityId] = useState('1');
  const [diagnosisId, setDiagnosisId] = useState('');
  const [surgeryTypeId, setSurgeryTypeId] = useState('');
  const [anaesthesiaId, setAnaesthesiaId] = useState('');
  const [surgeonId, setSurgeonId] = useState('');
  const [anaesthesiologistId, setAnaesthesiologistId] = useState('');
  const [billToId, setBillToId] = useState('-1');
  const [servicePlaceId, setServicePlaceId] = useState('1');
  const [indication, setIndication] = useState('');
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('');
  const [durationHours, setDurationHours] = useState('');

  const loadView = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const [response, usersResponse] = await Promise.all([
        api.get<Record<string, unknown>>(
          `/legacy/request-surgeries/view-request/?patient_visit_id=${encodeURIComponent(visitId)}&limit=200`,
        ),
        api.get<unknown>('/users/?limit=300'),
      ]);
      setRows(Array.isArray(response?.request_surgeries) ? (response.request_surgeries as JsonRow[]) : []);
      const priorityRows = Array.isArray(response?.priorities) ? (response.priorities as JsonRow[]) : [];
      setPriorities(priorityRows);
      setStatuses(Array.isArray(response?.statuses) ? (response.statuses as JsonRow[]) : []);
      setSurgeryTypes(Array.isArray(response?.surgery_types) ? (response.surgery_types as JsonRow[]) : []);
      setAnaesthesias(Array.isArray(response?.anaesthesias) ? (response.anaesthesias as JsonRow[]) : []);
      if (Array.isArray(usersResponse)) {
        setUsers(usersResponse as JsonRow[]);
      } else if (usersResponse && typeof usersResponse === 'object') {
        const payload = usersResponse as Record<string, unknown>;
        if (Array.isArray(payload.results)) setUsers(payload.results as JsonRow[]);
        else if (Array.isArray(payload.data)) setUsers(payload.data as JsonRow[]);
        else setUsers([]);
      } else {
        setUsers([]);
      }
      if (!priorityId && priorityRows.length) {
        setPriorityId(asText(priorityRows[0].id) || '1');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load procedure requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => undefined);
  }, [visitId]);

  useEffect(() => {
    const term = searchText.trim();
    if (term.length < 2) {
      setSearchRows([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<Record<string, unknown>>(
          `/legacy/request-surgeries/search-surgery-stocks/?search=${encodeURIComponent(term)}&limit=40`,
        );
        if (cancelled) return;
        const normalized = Array.isArray(response?.results) ? (response.results as JsonRow[]) : [];
        setSearchRows(normalized);
      } catch {
        if (!cancelled) setSearchRows([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 280);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [searchText]);

  const statusById = useMemo(() => {
    const map = new Map<string, string>();
    statuses.forEach((row) => {
      const id = asText(row.id);
      if (id) map.set(id, asText(row.name) || id);
    });
    return map;
  }, [statuses]);

  const diagnosisOptions = useMemo(() => {
    const seen = new Set<string>();
    const options: Array<{ id: string; label: string }> = [];
    diagnosisRows.forEach((row) => {
      const collect = (items: unknown, key: 'primary_diagnosis' | 'diagnosis') => {
        if (!Array.isArray(items)) return;
        (items as JsonRow[]).forEach((item) => {
          const diagnosis = (item[key] as JsonRow | undefined) || {};
          const id = asText(diagnosis.id);
          if (!id || seen.has(id)) return;
          seen.add(id);
          options.push({
            id,
            label: `${asText(diagnosis.name) || id}${asText(diagnosis.code) ? ` (${asText(diagnosis.code)})` : ''}`,
          });
        });
      };
      collect(row.patient_visit_primary_diagnoses, 'primary_diagnosis');
      collect(row.patient_visit_provisional_diagnoses, 'diagnosis');
      collect(row.patient_visit_differential_diagnoses, 'diagnosis');
      collect(row.patient_visit_other_diagnoses, 'diagnosis');
    });
    return options;
  }, [diagnosisRows]);

  const surgeryById = useMemo(() => {
    const map = new Map<string, JsonRow>();
    searchRows.forEach((row) => {
      const id = asText(row.id);
      if (id) map.set(id, row);
    });
    if (selectedSurgeryStock && asText(selectedSurgeryStock.id)) {
      map.set(asText(selectedSurgeryStock.id), selectedSurgeryStock);
    }
    rows.forEach((row) => {
      const display = ((row.display as JsonRow | undefined) || {}) as JsonRow;
      const request = ((row.request as JsonRow | undefined) || {}) as JsonRow;
      const id = asText(request.surgery_stock_id);
      if (id && !map.has(id)) {
        map.set(id, {
          id,
          name: asText(display.name),
          procedure_code: asText(display.procedure_code),
          cost: asText(display.cost),
        });
      }
    });
    return map;
  }, [rows, searchRows, selectedSurgeryStock]);

  const submitRequest = async () => {
    if (!visitId) return;
    if (!selectedSurgeryStockId) {
      setError('Select a procedure from search.');
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    let endIso: string | undefined;
    if (startTime && asNumber(durationHours) > 0) {
      const start = new Date(startTime);
      if (!Number.isNaN(start.getTime())) {
        const end = new Date(start.getTime() + asNumber(durationHours) * 60 * 60 * 1000);
        endIso = end.toISOString();
      }
    }
    try {
      await api.post('/legacy/request-surgeries/add-request-surgery/', {
        id: makeId(),
        patient_visit_id: visitId,
        surgery_stock_id: selectedSurgeryStockId,
        status_id: '20',
        priority_id: priorityId || '1',
        bill_to_id: billToId || '-1',
        service_place_id: servicePlaceId || '1',
        diagnosis_id: diagnosisId || undefined,
        surgery_type_id: surgeryTypeId || undefined,
        anaesthesia_id: anaesthesiaId || undefined,
        surgeon_id: surgeonId || undefined,
        anaesthesiologist_id: anaesthesiologistId || undefined,
        indication_for_surgery: indication || undefined,
        surgery_notes: notes || undefined,
        start_time: startTime ? new Date(startTime).toISOString() : undefined,
        end_time: endIso,
      });
      setSuccess('Procedure request submitted.');
      setSelectedSurgeryStockId('');
      setSelectedSurgeryStock(null);
      setSearchText('');
      setSearchRows([]);
      setDiagnosisId('');
      setIndication('');
      setNotes('');
      setStartTime('');
      setDurationHours('');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit procedure request.');
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (requestId: string, nextAction: 'cancel' | 'process') => {
    setActionSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post(
        nextAction === 'cancel'
          ? '/legacy/request-surgeries/cancel-request-surgery/'
          : '/legacy/request-surgeries/process-request-surgery/',
        {
          request_id: requestId,
        },
      );
      setSuccess(nextAction === 'cancel' ? 'Procedure request cancelled.' : 'Procedure request marked complete.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update procedure request.');
    } finally {
      setActionSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading procedure requests...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Start</th>
                <th className="px-3 py-2 text-left font-semibold">End</th>
                <th className="px-3 py-2 text-left font-semibold">Surgery</th>
                <th className="px-3 py-2 text-left font-semibold">Other Details</th>
                <th className="px-3 py-2 text-left font-semibold">Surgeon</th>
                <th className="px-3 py-2 text-left font-semibold">Charge</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((entry) => {
                  const request = (entry.request as JsonRow | undefined) || {};
                  const display = (entry.display as JsonRow | undefined) || {};
                  const requestId = asText(request.id);
                  const statusId = asText(request.status_id);
                  return (
                    <tr key={requestId} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(request.date_created)}</td>
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(request.start_time)}</td>
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(request.end_time)}</td>
                      <td className="px-3 py-2 text-slate-900">
                        <p>{asText(display.name) || 'N/A'}</p>
                        <p className="text-[11px] text-slate-500">{asText(display.procedure_code) || 'N/A'}</p>
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        <p>Priority: {asText(display.priority_name) || asText(request.priority_id) || 'N/A'}</p>
                        <p>Type: {asText(display.surgery_type_name) || asText(request.surgery_type_id) || 'N/A'}</p>
                        <p>Anaesthesia: {asText(display.anaesthesia_name) || asText(request.anaesthesia_id) || 'N/A'}</p>
                        <p>Diagnosis: {asText(request.diagnosis_id) || 'N/A'}</p>
                      </td>
                      <td className="px-3 py-2 text-slate-700">{asText(display.ordered_by) || asText(request.surgeon_id) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asNumber(display.cost).toFixed(2)}</td>
                      <td className="px-3 py-2 text-slate-700">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold">
                          {asText(display.status_name) || statusById.get(statusId) || statusId || 'N/A'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          {statusId === '20' ? (
                            <button
                              type="button"
                              onClick={() => updateStatus(requestId, 'process')}
                              disabled={actionSaving}
                              className="rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 disabled:opacity-50"
                            >
                              Complete
                            </button>
                          ) : null}
                          {statusId !== '24' ? (
                            <button
                              type="button"
                              onClick={() => updateStatus(requestId, 'cancel')}
                              disabled={actionSaving}
                              className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-3 py-4 text-center text-slate-500">No procedure requests found for this visit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900">Make a new Surgery Request</h3>
          <button
            type="button"
            onClick={() => {
              loadView().catch(() => undefined);
            }}
            className="rounded border border-indigo-300 bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700"
          >
            refresh
          </button>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="block text-xs text-slate-600 md:col-span-2">
            Procedure
            <input
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setSelectedSurgeryStockId('');
                setSelectedSurgeryStock(null);
              }}
              placeholder="Search procedure"
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <div className="max-h-44 overflow-auto rounded border border-slate-200 md:col-span-2">
            {searching ? <p className="px-3 py-2 text-xs text-slate-500">Searching...</p> : null}
            {searchRows.map((row) => {
              const id = asText(row.id);
              const selected = selectedSurgeryStockId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSelectedSurgeryStockId(id);
                    setSelectedSurgeryStock(row);
                  }}
                  className={`flex w-full items-start justify-between border-b border-slate-100 px-3 py-2 text-left ${
                    selected ? 'bg-cyan-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="space-y-0.5">
                    <span className="block text-xs font-semibold text-slate-800">{asText(row.name) || id}</span>
                    <span className="block text-[11px] text-slate-500">Code: {asText(row.procedure_code) || 'N/A'}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700">{asNumber(row.cost).toFixed(2)}</span>
                </button>
              );
            })}
            {!searching && searchText.trim().length >= 2 && !searchRows.length ? (
              <p className="px-3 py-2 text-xs text-slate-500">No procedures found.</p>
            ) : null}
          </div>
          {selectedSurgeryStockId ? (
            <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 md:col-span-2">
              Selected: <span className="font-semibold">{asText(surgeryById.get(selectedSurgeryStockId)?.name) || selectedSurgeryStockId}</span>
            </div>
          ) : null}
          <label className="block text-xs text-slate-600">
            Diagnoses
            <SearchableSelectField value={diagnosisId} onChange={(e) => setDiagnosisId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select diagnosis</option>
              {diagnosisOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Start Date & Time
            <input value={startTime} onChange={(e) => setStartTime(e.target.value)} type="datetime-local" className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block text-xs text-slate-600">
            Duration (Hrs)
            <input value={durationHours} onChange={(e) => setDurationHours(e.target.value)} type="number" min={0} step="0.25" className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
          </label>

          <label className="block text-xs text-slate-600">
            Priority
            <SearchableSelectField value={priorityId} onChange={(e) => setPriorityId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              {priorities.map((row) => (
                <option key={asText(row.id)} value={asText(row.id)}>
                  {asText(row.name) || asText(row.id)}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Surgery Type
            <SearchableSelectField value={surgeryTypeId} onChange={(e) => setSurgeryTypeId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select type</option>
              {surgeryTypes.map((row) => (
                <option key={asText(row.id)} value={asText(row.id)}>
                  {asText(row.name) || asText(row.id)}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Anaesthesia
            <SearchableSelectField value={anaesthesiaId} onChange={(e) => setAnaesthesiaId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select anaesthesia</option>
              {anaesthesias.map((row) => (
                <option key={asText(row.id)} value={asText(row.id)}>
                  {asText(row.name) || asText(row.id)}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Surgeon
            <SearchableSelectField value={surgeonId} onChange={(e) => setSurgeonId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select surgeon</option>
              {users.map((row) => (
                <option key={asText(row.id)} value={asText(row.id)}>
                  {`${asText(row.first_name)} ${asText(row.last_name)}`.trim() || asText(row.full_name) || asText(row.id)}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Anaesthesiologist
            <SearchableSelectField value={anaesthesiologistId} onChange={(e) => setAnaesthesiologistId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select anaesthesiologist</option>
              {users.map((row) => (
                <option key={`ana-${asText(row.id)}`} value={asText(row.id)}>
                  {`${asText(row.first_name)} ${asText(row.last_name)}`.trim() || asText(row.full_name) || asText(row.id)}
                </option>
              ))}
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Charge Bill To
            <SearchableSelectField value={billToId} onChange={(e) => setBillToId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="-1">Cash / Self Pay</option>
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600">
            Service Place
            <SearchableSelectField value={servicePlaceId} onChange={(e) => setServicePlaceId(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
              <option value="1">Place 1</option>
              <option value="2">Place 2</option>
            </SearchableSelectField>
          </label>
          <label className="block text-xs text-slate-600 md:col-span-2">
            Indication For Surgery
            <textarea value={indication} onChange={(e) => setIndication(e.target.value)} rows={2} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block text-xs text-slate-600 md:col-span-2">
            Surgery Notes
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <div className="flex gap-2 md:col-span-2">
            <button
              type="button"
              onClick={submitRequest}
              disabled={saving || !selectedSurgeryStockId}
              className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              {saving ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedSurgeryStockId('');
                setSelectedSurgeryStock(null);
                setSearchText('');
                setSearchRows([]);
                setDiagnosisId('');
                setSurgeryTypeId('');
                setAnaesthesiaId('');
                setSurgeonId('');
                setAnaesthesiologistId('');
                setBillToId('-1');
                setServicePlaceId('1');
                setIndication('');
                setNotes('');
                setStartTime('');
                setDurationHours('');
              }}
              className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestReferralServicesPanel({
  visitId,
  diagnosisRows,
}: {
  visitId: string;
  diagnosisRows: JsonRow[];
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingBedRequest, setSavingBedRequest] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rows, setRows] = useState<JsonRow[]>([]);
  const [consultations, setConsultations] = useState<JsonRow[]>([]);
  const [consultationLevels, setConsultationLevels] = useState<JsonRow[]>([]);
  const [consultationTypes, setConsultationTypes] = useState<JsonRow[]>([]);
  const [specialties, setSpecialties] = useState<JsonRow[]>([]);
  const [currentUser, setCurrentUser] = useState<JsonRow | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [bedModalOpen, setBedModalOpen] = useState(false);
  const [consultationPool, setConsultationPool] = useState<JsonRow[]>([]);
  const [doctorPool, setDoctorPool] = useState<JsonRow[]>([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState('');
  const [selectedConsultationId, setSelectedConsultationId] = useState('');
  const [selectedLevelId, setSelectedLevelId] = useState('');
  const [selectedToUserId, setSelectedToUserId] = useState('');
  const [requestMode, setRequestMode] = useState<'routine' | 'off_hours' | 'urgent'>('routine');
  const [consultReason, setConsultReason] = useState('');
  const [selectedDiagnosisIds, setSelectedDiagnosisIds] = useState<string[]>([]);
  const [bedSpecialtyId, setBedSpecialtyId] = useState('');

  const diagnosisOptions = useMemo(() => {
    const seen = new Set<string>();
    const options: Array<{ id: string; label: string }> = [];
    diagnosisRows.forEach((row) => {
      const collect = (items: unknown, key: 'primary_diagnosis' | 'diagnosis') => {
        if (!Array.isArray(items)) return;
        (items as JsonRow[]).forEach((item) => {
          const diagnosis = (item[key] as JsonRow | undefined) || {};
          const id = asText(diagnosis.id);
          if (!id || seen.has(id)) return;
          seen.add(id);
          options.push({
            id,
            label: `${asText(diagnosis.name) || id}${asText(diagnosis.code) ? ` (${asText(diagnosis.code)})` : ''}`,
          });
        });
      };
      collect(row.patient_visit_primary_diagnoses, 'primary_diagnosis');
      collect(row.patient_visit_provisional_diagnoses, 'diagnosis');
      collect(row.patient_visit_differential_diagnoses, 'diagnosis');
      collect(row.patient_visit_other_diagnoses, 'diagnosis');
    });
    return options;
  }, [diagnosisRows]);

  const specialtyNameById = useMemo(() => {
    const map = new Map<string, string>();
    specialties.forEach((row) => {
      map.set(asText(row.id), asText(row.name) || asText(row.id));
    });
    return map;
  }, [specialties]);

  const consultationTypeNameById = useMemo(() => {
    const map = new Map<string, string>();
    consultationTypes.forEach((row) => {
      map.set(asText(row.id), asText(row.name) || asText(row.id));
    });
    return map;
  }, [consultationTypes]);

  const levelNameById = useMemo(() => {
    const map = new Map<string, string>();
    consultationLevels.forEach((row) => {
      map.set(asText(row.id), asText(row.name) || asText(row.id));
    });
    return map;
  }, [consultationLevels]);

  const loadView = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const [catalogResponse, rowsResponse] = await Promise.all([
        api.get<Record<string, unknown>>('/legacy/patients/get-referral/?limit=300'),
        api.get<Record<string, unknown>>(`/legacy/patients/get-consultation-request/?patient_visit_id=${encodeURIComponent(visitId)}&limit=200`),
      ]);
      const nextConsultations = Array.isArray(catalogResponse?.consultations) ? (catalogResponse.consultations as JsonRow[]) : [];
      const nextLevels = Array.isArray(catalogResponse?.consultation_levels) ? (catalogResponse.consultation_levels as JsonRow[]) : [];
      const nextTypes = Array.isArray(catalogResponse?.consultation_types) ? (catalogResponse.consultation_types as JsonRow[]) : [];
      const nextSpecialties = Array.isArray(catalogResponse?.specialties) ? (catalogResponse.specialties as JsonRow[]) : [];
      setConsultations(nextConsultations);
      setConsultationPool(nextConsultations);
      setConsultationLevels(nextLevels);
      setConsultationTypes(nextTypes);
      setSpecialties(nextSpecialties);
      setCurrentUser(((catalogResponse?.current_user as JsonRow | undefined) || null));
      setRows(Array.isArray(rowsResponse?.data) ? (rowsResponse.data as JsonRow[]) : []);
      if (!selectedLevelId && nextLevels.length) {
        setSelectedLevelId(asText(nextLevels[0].id));
      }
      if (!bedSpecialtyId && nextSpecialties.length) {
        setBedSpecialtyId(asText(nextSpecialties[0].id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load referral request services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => undefined);
  }, [visitId]);

  const groupedConsultations = useMemo(() => {
    const groups: Record<'emergency' | 'routine' | 'courtesy', JsonRow[]> = {
      emergency: [],
      routine: [],
      courtesy: [],
    };
    consultations.forEach((row) => {
      const typeId = asText(row.consultation_type_id);
      if (typeId === '1') {
        groups.emergency.push(row);
      } else if (typeId === '2') {
        groups.routine.push(row);
      } else {
        groups.courtesy.push(row);
      }
    });
    return groups;
  }, [consultations]);

  const loadSpecialtyDependencies = async (specialtyId: string, preferredConsultationId?: string) => {
    if (!specialtyId) {
      setConsultationPool(consultations);
      setDoctorPool([]);
      return;
    }
    try {
      const [consultationResponse, usersResponse] = await Promise.all([
        api.get<unknown>(`/legacy/manage-services/get-consultation-by-specialty/?specialty_id=${encodeURIComponent(specialtyId)}&limit=200`),
        api.get<unknown>(`/legacy/users/view-users-specialty/?specialty_id=${encodeURIComponent(specialtyId)}&limit=200`),
      ]);
      const nextConsultationPool = Array.isArray(consultationResponse) ? (consultationResponse as JsonRow[]) : consultations.filter((row) => asText(row.specialty_id) === specialtyId);
      const nextDoctorPool = Array.isArray(usersResponse) ? (usersResponse as JsonRow[]) : [];
      setConsultationPool(nextConsultationPool);
      setDoctorPool(nextDoctorPool);
      if (preferredConsultationId && nextConsultationPool.some((row) => asText(row.id) === preferredConsultationId)) {
        setSelectedConsultationId(preferredConsultationId);
      } else if (nextConsultationPool.length) {
        setSelectedConsultationId(asText(nextConsultationPool[0].id));
      } else {
        setSelectedConsultationId('');
      }
      setSelectedToUserId(nextDoctorPool.length ? asText(nextDoctorPool[0].id) : '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load consultation routing details.');
      setConsultationPool(consultations.filter((row) => asText(row.specialty_id) === specialtyId));
      setDoctorPool([]);
    }
  };

  const openConsultModal = (seed: JsonRow) => {
    const specialtyId = asText(seed.specialty_id);
    const typeId = asText(seed.consultation_type_id);
    setSelectedSpecialtyId(specialtyId);
    setSelectedConsultationId(asText(seed.id));
    setSelectedLevelId(consultationLevels.length ? asText(consultationLevels[0].id) : '');
    setSelectedToUserId('');
    setConsultReason('');
    setSelectedDiagnosisIds([]);
    setRequestMode(typeId === '1' ? 'urgent' : 'routine');
    setConsultModalOpen(true);
    loadSpecialtyDependencies(specialtyId, asText(seed.id)).catch(() => undefined);
  };

  const closeConsultModal = () => {
    setConsultModalOpen(false);
    setSelectedSpecialtyId('');
    setSelectedConsultationId('');
    setSelectedToUserId('');
    setConsultReason('');
    setSelectedDiagnosisIds([]);
    setConsultationPool(consultations);
    setDoctorPool([]);
  };

  const selectedConsultation = useMemo(
    () => consultationPool.find((row) => asText(row.id) === selectedConsultationId)
      || consultations.find((row) => asText(row.id) === selectedConsultationId)
      || null,
    [consultationPool, consultations, selectedConsultationId],
  );

  const submitConsultationRequest = async () => {
    if (!visitId) return;
    if (!selectedConsultationId) {
      setError('Select a consultation first.');
      return;
    }
    if (!selectedToUserId) {
      setError('Select the receiving doctor.');
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/add-consultation-request/', {
        id: makeId(),
        patient_visit_id: visitId,
        consultation_id: selectedConsultationId,
        consultation_level_id: selectedLevelId || undefined,
        consultation_type_id: asText(selectedConsultation?.consultation_type_id) || undefined,
        specialty_id: selectedSpecialtyId || asText(selectedConsultation?.specialty_id) || undefined,
        to_user_id: selectedToUserId,
        type: requestMode,
        reason: consultReason || undefined,
        diagnosis_ids: selectedDiagnosisIds,
      });
      setSuccess('Consultation / referral request saved.');
      closeConsultModal();
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save consultation request.');
    } finally {
      setSaving(false);
    }
  };

  const cancelConsultationRequest = async (requestId: string) => {
    if (!requestId) return;
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/referral-status-change/', {
        consultation_request_id: requestId,
      });
      setSuccess('Consultation request cancelled.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel consultation request.');
    }
  };

  const submitBedRequest = async () => {
    if (!visitId) return;
    if (!bedSpecialtyId) {
      setError('Select the target specialty for the bed request.');
      return;
    }
    setSavingBedRequest(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/add-bed-request/', {
        id: makeId(),
        patient_visit_id: visitId,
        specialty_id: bedSpecialtyId,
        is_bed_request: 1,
      });
      setSuccess('Bed movement request logged.');
      setBedModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to log bed movement request.');
    } finally {
      setSavingBedRequest(false);
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading consult to / referral...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date</th>
                <th className="px-3 py-2 text-left font-semibold">From</th>
                <th className="px-3 py-2 text-left font-semibold">To</th>
                <th className="px-3 py-2 text-left font-semibold">Reason</th>
                <th className="px-3 py-2 text-left font-semibold">Level</th>
                <th className="px-3 py-2 text-left font-semibold">Type</th>
                <th className="px-3 py-2 text-left font-semibold">Diagnosis</th>
                <th className="px-3 py-2 text-left font-semibold">Charge (GHS)</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((row) => {
                  const request = (row.request as JsonRow | undefined) || {};
                  const display = (row.display as JsonRow | undefined) || {};
                  const diagnosisNames = Array.isArray(display.diagnosis_names) ? (display.diagnosis_names as string[]) : [];
                  const statusId = asText(request.status_id);
                  return (
                    <tr key={asText(request.id)} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(request.date_created)}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(display.from_name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(display.to_name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(display.reason) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(display.level_name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">
                        {asText(display.type_name) || consultationTypeNameById.get(asText(request.consultation_type_id)) || 'N/A'}
                        {asText(request.type) ? <span className="block text-[10px] text-slate-500">{asText(request.type)}</span> : null}
                      </td>
                      <td className="px-3 py-2 text-slate-700">{diagnosisNames.join(', ') || 'None selected'}</td>
                      <td className="px-3 py-2 text-slate-700">{formatMoney(display.charge || 0)}</td>
                      <td className="px-3 py-2 text-slate-700">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold">
                          {asText(display.status_name) || statusId || 'Pending'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        {statusId !== '23' && statusId !== '24' ? (
                          <button
                            type="button"
                            onClick={() => cancelConsultationRequest(asText(request.id))}
                            className="rounded border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400">Closed</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="px-3 py-4 text-center text-slate-500">No consultation or referral requests recorded for this visit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700">Emergency / Urgent</p>
              <h3 className="text-sm font-semibold text-slate-900">Immediate specialist handoff</h3>
            </div>
            <span className="rounded-full border border-rose-200 bg-white px-2 py-1 text-[11px] font-semibold text-rose-700">
              {groupedConsultations.emergency.length}
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {groupedConsultations.emergency.slice(0, 6).map((row) => (
              <button
                key={asText(row.id)}
                type="button"
                onClick={() => openConsultModal(row)}
                className="flex w-full items-start justify-between rounded-lg border border-white/80 bg-white/85 px-3 py-2 text-left shadow-sm"
              >
                <span>
                  <span className="block text-xs font-semibold text-slate-900">{asText(row.name) || asText(row.id)}</span>
                  <span className="block text-[11px] text-slate-500">{specialtyNameById.get(asText(row.specialty_id)) || 'General specialty'}</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-700">{formatMoney(row.price || 0)}</span>
              </button>
            ))}
            {!groupedConsultations.emergency.length ? <p className="text-xs text-slate-500">No urgent consultations configured.</p> : null}
          </div>
        </section>

        <section className="rounded-xl border border-cyan-200 bg-cyan-50/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">Non-Urgent / Routine</p>
              <h3 className="text-sm font-semibold text-slate-900">Routine and off-hours consults</h3>
            </div>
            <span className="rounded-full border border-cyan-200 bg-white px-2 py-1 text-[11px] font-semibold text-cyan-700">
              {groupedConsultations.routine.length}
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {groupedConsultations.routine.slice(0, 6).map((row) => (
              <button
                key={asText(row.id)}
                type="button"
                onClick={() => openConsultModal(row)}
                className="flex w-full items-start justify-between rounded-lg border border-white/80 bg-white/85 px-3 py-2 text-left shadow-sm"
              >
                <span>
                  <span className="block text-xs font-semibold text-slate-900">{asText(row.name) || asText(row.id)}</span>
                  <span className="block text-[11px] text-slate-500">{specialtyNameById.get(asText(row.specialty_id)) || 'General specialty'}</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-700">{formatMoney(row.price || 0)}</span>
              </button>
            ))}
            {!groupedConsultations.routine.length ? <p className="text-xs text-slate-500">No routine consultations configured.</p> : null}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">Patient Movement / Bed Request</p>
              <h3 className="text-sm font-semibold text-slate-900">Prepare a specialty transfer</h3>
            </div>
            <button
              type="button"
              onClick={() => setBedModalOpen(true)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700"
            >
              New Bed Request
            </button>
          </div>
          <div className="mt-3 space-y-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-600">
            <p>Use this when the patient needs a ward-side specialty movement or a pending bed arrangement before admission is finalised.</p>
            <p>The request is logged against the visit and routed with the current clinician as the source specialty.</p>
          </div>
        </section>
      </div>

      {consultModalOpen ? (
        <div className="fixed inset-0 z-[220] flex items-start justify-center overflow-y-auto bg-slate-950/35 p-4">
          <section className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.3)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">Consult To / Referral</p>
                <h3 className="text-base font-semibold text-slate-900">{asText(selectedConsultation?.name) || 'New consultation request'}</h3>
              </div>
              <button type="button" onClick={closeConsultModal} className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700">
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-xs text-slate-700">
                  From
                  <input
                    value={`${asText(currentUser?.first_name)} ${asText(currentUser?.last_name)}`.trim() || asText(currentUser?.username) || 'Current clinician'}
                    readOnly
                    className="mt-1 w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  />
                </label>

                <label className="block text-xs text-slate-700">
                  Consultation Specialty
                  <SearchableSelectField
                    value={selectedSpecialtyId}
                    onChange={(event) => {
                      const nextSpecialtyId = event.target.value;
                      setSelectedSpecialtyId(nextSpecialtyId);
                      loadSpecialtyDependencies(nextSpecialtyId).catch(() => undefined);
                    }}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select specialty</option>
                    {specialties.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id)}>
                        {asText(row.name) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>

                <label className="block text-xs text-slate-700">
                  Consultation
                  <SearchableSelectField
                    value={selectedConsultationId}
                    onChange={(event) => {
                      const nextId = event.target.value;
                      setSelectedConsultationId(nextId);
                      const nextConsultation = consultationPool.find((row) => asText(row.id) === nextId) || consultations.find((row) => asText(row.id) === nextId) || null;
                      if (nextConsultation) {
                        const nextSpecialtyId = asText(nextConsultation.specialty_id);
                        if (nextSpecialtyId && nextSpecialtyId !== selectedSpecialtyId) {
                          setSelectedSpecialtyId(nextSpecialtyId);
                          loadSpecialtyDependencies(nextSpecialtyId, nextId).catch(() => undefined);
                        }
                        setRequestMode(asText(nextConsultation.consultation_type_id) === '1' ? 'urgent' : requestMode === 'urgent' ? 'routine' : requestMode);
                      }
                    }}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select consultation</option>
                    {consultationPool.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id)}>
                        {asText(row.name) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>

                <label className="block text-xs text-slate-700">
                  To Doctor
                  <SearchableSelectField value={selectedToUserId} onChange={(event) => setSelectedToUserId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select doctor</option>
                    {doctorPool.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id)}>
                        {`${asText(row.first_name)} ${asText(row.last_name)}`.trim() || asText(row.username) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>

                <label className="block text-xs text-slate-700">
                  Consultation Level
                  <SearchableSelectField value={selectedLevelId} onChange={(event) => setSelectedLevelId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select level</option>
                    {consultationLevels.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id)}>
                        {asText(row.name) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>

                {asText(selectedConsultation?.consultation_type_id) !== '1' ? (
                  <label className="block text-xs text-slate-700">
                    Request Type
                    <SearchableSelectField value={requestMode} onChange={(event) => setRequestMode(event.target.value as 'routine' | 'off_hours' | 'urgent')} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                      <option value="routine">Routine</option>
                      <option value="off_hours">Off Hours</option>
                    </SearchableSelectField>
                  </label>
                ) : (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-3 text-xs text-rose-700">
                    This consultation is configured as an urgent / emergency handoff.
                  </div>
                )}

                <label className="block text-xs text-slate-700 md:col-span-2">
                  Reason
                  <textarea value={consultReason} onChange={(event) => setConsultReason(event.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                </label>
              </div>

              <aside className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">Consultation Summary</p>
                  <p className="mt-1">Service: {asText(selectedConsultation?.name) || 'N/A'}</p>
                  <p>Specialty: {specialtyNameById.get(asText(selectedConsultation?.specialty_id)) || specialtyNameById.get(selectedSpecialtyId) || 'N/A'}</p>
                  <p>Level: {levelNameById.get(selectedLevelId) || 'N/A'}</p>
                  <p>Charge: {formatMoney(selectedConsultation?.price || 0)}</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">Linked Diagnoses</p>
                  <div className="mt-2 max-h-48 space-y-2 overflow-y-auto pr-1">
                    {diagnosisOptions.length ? (
                      diagnosisOptions.map((option) => {
                        const checked = selectedDiagnosisIds.includes(option.id);
                        return (
                          <label key={option.id} className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(event) => {
                                setSelectedDiagnosisIds((current) =>
                                  event.target.checked ? [...current, option.id] : current.filter((value) => value !== option.id),
                                );
                              }}
                              className="mt-0.5"
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })
                    ) : (
                      <p className="text-slate-500">No recorded diagnoses on this visit yet.</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={closeConsultModal} className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
                  <button type="button" onClick={submitConsultationRequest} disabled={saving} className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Request'}
                  </button>
                </div>
              </aside>
            </div>
          </section>
        </div>
      ) : null}

      {bedModalOpen ? (
        <div className="fixed inset-0 z-[220] flex items-start justify-center overflow-y-auto bg-slate-950/35 p-4">
          <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.3)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">Patient Movement / Bed Request</p>
                <h3 className="text-base font-semibold text-slate-900">Log a ward-side transfer request</h3>
              </div>
              <button type="button" onClick={() => setBedModalOpen(false)} className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700">
                Close
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block text-xs text-slate-700">
                Target Specialty
                <SearchableSelectField value={bedSpecialtyId} onChange={(event) => setBedSpecialtyId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                  <option value="">Select specialty</option>
                  {specialties.map((row) => (
                    <option key={asText(row.id)} value={asText(row.id)}>
                      {asText(row.name) || asText(row.id)}
                    </option>
                  ))}
                </SearchableSelectField>
              </label>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-600">
                This logs a bed request marker against the visit. Ward/bed assignment remains under the admission workflow.
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setBedModalOpen(false)} className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
              <button type="button" onClick={submitBedRequest} disabled={savingBedRequest} className="rounded bg-slate-900 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                {savingBedRequest ? 'Saving...' : 'Save Bed Request'}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function RequestBundledServicesPanel({
  visitId,
  patientId,
  diagnosisRows,
}: {
  visitId: string;
  patientId: string;
  diagnosisRows: JsonRow[];
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [bundles, setBundles] = useState<JsonRow[]>([]);
  const [requests, setRequests] = useState<JsonRow[]>([]);
  const [billToOptions, setBillToOptions] = useState<JsonRow[]>([{ id: '-1', name: 'Cash / Self Pay' }]);
  const [searchText, setSearchText] = useState('');
  const [selectedBundleId, setSelectedBundleId] = useState('');
  const [billToId, setBillToId] = useState('-1');
  const [diagnosisId, setDiagnosisId] = useState('');

  const diagnosisOptions = useMemo(() => {
    const seen = new Set<string>();
    const options: Array<{ id: string; label: string }> = [];
    diagnosisRows.forEach((row) => {
      const collect = (items: unknown, key: 'primary_diagnosis' | 'diagnosis') => {
        if (!Array.isArray(items)) return;
        (items as JsonRow[]).forEach((item) => {
          const diagnosis = (item[key] as JsonRow | undefined) || {};
          const id = asText(diagnosis.id);
          if (!id || seen.has(id)) return;
          seen.add(id);
          options.push({
            id,
            label: `${asText(diagnosis.name) || id}${asText(diagnosis.code) ? ` (${asText(diagnosis.code)})` : ''}`,
          });
        });
      };
      collect(row.patient_visit_primary_diagnoses, 'primary_diagnosis');
      collect(row.patient_visit_provisional_diagnoses, 'diagnosis');
      collect(row.patient_visit_differential_diagnoses, 'diagnosis');
      collect(row.patient_visit_other_diagnoses, 'diagnosis');
    });
    return options;
  }, [diagnosisRows]);

  const loadView = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const [bundlesResponse, requestsResponse] = await Promise.all([
        api.get<unknown>('/legacy/patients/get-bundled-services/?limit=200'),
        api.get<Record<string, unknown>>(
          `/legacy/bundled-services/get-requested-bundled-services/?patient_visit_id=${encodeURIComponent(visitId)}&patient_id=${encodeURIComponent(patientId)}&limit=200`,
        ),
      ]);
      setBundles(Array.isArray(bundlesResponse) ? (bundlesResponse as JsonRow[]) : []);
      setRequests(Array.isArray(requestsResponse?.data) ? (requestsResponse.data as JsonRow[]) : []);
      const nextBillToOptions = Array.isArray(requestsResponse?.bill_to_options)
        ? (requestsResponse.bill_to_options as JsonRow[])
        : [{ id: '-1', name: 'Cash / Self Pay' }];
      setBillToOptions(nextBillToOptions.length ? nextBillToOptions : [{ id: '-1', name: 'Cash / Self Pay' }]);
      if (!billToId && nextBillToOptions.length) setBillToId(asText(nextBillToOptions[0].id) || '-1');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load bundled services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => undefined);
  }, [visitId, patientId]);

  const filteredBundles = useMemo(() => {
    const needle = searchText.trim().toLowerCase();
    if (!needle) return bundles;
    return bundles.filter((bundle) => {
      const bundleName = asText(bundle.name).toLowerCase();
      const bundleDescription = asText(bundle.description).toLowerCase();
      const itemText = Array.isArray(bundle.bundled_service_items)
        ? (bundle.bundled_service_items as JsonRow[])
            .map((item) => asText(item.display_name))
            .join(' ')
            .toLowerCase()
        : '';
      return `${bundleName} ${bundleDescription} ${itemText}`.includes(needle);
    });
  }, [bundles, searchText]);

  const selectedBundle = useMemo(
    () => filteredBundles.find((bundle) => asText(bundle.id) === selectedBundleId)
      || bundles.find((bundle) => asText(bundle.id) === selectedBundleId)
      || null,
    [filteredBundles, bundles, selectedBundleId],
  );

  const submitBundleRequest = async () => {
    if (!visitId) return;
    if (!selectedBundleId) {
      setError('Select a bundled service first.');
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/bundled-services/add-request-bundle-service/', {
        id: makeId(),
        bundled_service_id: selectedBundleId,
        patient_visit_id: visitId,
        bill_to_id: billToId || '-1',
        diagnosis_id: diagnosisId || undefined,
      });
      setSuccess('Bundled service requested successfully.');
      setSelectedBundleId('');
      setSearchText('');
      setDiagnosisId('');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save bundled service request.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading bundled services...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Name</th>
                <th className="px-3 py-2 text-left font-semibold">Cost (GHS)</th>
                <th className="px-3 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length ? (
                requests.map((row) => {
                  const requestBundle = (row.request_bundled_service as JsonRow | undefined) || {};
                  const bundledService = (row.bundled_service as JsonRow | undefined) || {};
                  const status = (row.status as JsonRow | undefined) || {};
                  return (
                    <tr key={asText(requestBundle.id)} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(requestBundle.date_added)}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(bundledService.name) || asText(requestBundle.bundled_service_id) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{formatMoney(requestBundle.price || bundledService.price || 0)}</td>
                      <td className="px-3 py-2 text-slate-700">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold">
                          {asText(status.name) || asText(requestBundle.status_id) || 'Request'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-center text-slate-500">No bundled services requested for this visit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Request A Bundled Service</h3>
          <div className="mt-3 space-y-3">
            <label className="block text-xs text-slate-600">
              Bundled Service
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search bundled services"
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>

            <div className="max-h-64 overflow-auto rounded border border-slate-200">
              {filteredBundles.map((bundle) => {
                const id = asText(bundle.id);
                const selected = selectedBundleId === id;
                const items = Array.isArray(bundle.bundled_service_items) ? (bundle.bundled_service_items as JsonRow[]) : [];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedBundleId(id)}
                    className={`flex w-full items-start justify-between border-b border-slate-100 px-3 py-2 text-left ${
                      selected ? 'bg-cyan-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>
                      <span className="block text-xs font-semibold text-slate-800">{asText(bundle.name) || id}</span>
                      <span className="block text-[11px] text-slate-500">
                        {items.length} item{items.length === 1 ? '' : 's'}
                        {asText(bundle.description) ? ` • ${asText(bundle.description)}` : ''}
                      </span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">{formatMoney(bundle.price || 0)}</span>
                  </button>
                );
              })}
              {!filteredBundles.length ? <p className="px-3 py-2 text-xs text-slate-500">No bundled services found.</p> : null}
            </div>

            <label className="block text-xs text-slate-600">
              Charge Bill To
              <SearchableSelectField value={billToId} onChange={(event) => setBillToId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                {billToOptions.map((option) => (
                  <option key={asText(option.id)} value={asText(option.id)}>
                    {asText(option.name) || asText(option.id)}
                  </option>
                ))}
              </SearchableSelectField>
            </label>

            <label className="block text-xs text-slate-600">
              Diagnosis For Included Procedures
              <SearchableSelectField value={diagnosisId} onChange={(event) => setDiagnosisId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                <option value="">Select diagnosis if needed</option>
                {diagnosisOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </SearchableSelectField>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={submitBundleRequest}
                disabled={saving || !selectedBundleId}
                className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {saving ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBundleId('');
                  setSearchText('');
                  setDiagnosisId('');
                  setBillToId('-1');
                }}
                className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Included Items</p>
              <h3 className="text-sm font-semibold text-slate-900">{asText(selectedBundle?.name) || 'Select a bundle'}</h3>
            </div>
            {selectedBundle ? (
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                {formatMoney(selectedBundle.price || 0)}
              </span>
            ) : null}
          </div>

          <div className="mt-3 max-h-[500px] space-y-3 overflow-y-auto pr-1">
            {selectedBundle && Array.isArray(selectedBundle.bundled_service_items) && (selectedBundle.bundled_service_items as JsonRow[]).length ? (
              (selectedBundle.bundled_service_items as JsonRow[]).map((item, index) => {
                const itemType = (item.item_type as JsonRow | undefined) || {};
                return (
                  <div key={`${asText(selectedBundle.id)}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{asText(item.display_name) || 'N/A'}</p>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          {asText(itemType.name) || asText((item.bundled_item as JsonRow | undefined)?.item_type_id) || 'Item'}
                        </p>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                Select a bundled service to preview the included requests.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestWardServicesPanel({
  visitId,
  patientId,
  currentWardId,
}: {
  visitId: string;
  patientId: string;
  currentWardId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rows, setRows] = useState<JsonRow[]>([]);
  const [wardServices, setWardServices] = useState<JsonRow[]>([]);
  const [billToOptions, setBillToOptions] = useState<JsonRow[]>([{ id: '-1', name: 'Cash / Self Pay' }]);
  const [searchText, setSearchText] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [billToId, setBillToId] = useState('-1');
  const [wardId, setWardId] = useState(currentWardId);

  const loadView = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Record<string, unknown>>(
        `/legacy/patients/get-requested-ward-service/?patient_visit_id=${encodeURIComponent(visitId)}&patient_id=${encodeURIComponent(patientId)}&limit=200`,
      );
      setRows(Array.isArray(response?.data) ? (response.data as JsonRow[]) : []);
      setWardServices(Array.isArray(response?.ward_services) ? (response.ward_services as JsonRow[]) : []);
      const nextBillTos = Array.isArray(response?.bill_to_options) ? (response.bill_to_options as JsonRow[]) : [{ id: '-1', name: 'Cash / Self Pay' }];
      setBillToOptions(nextBillTos);
      if (!billToId && nextBillTos.length) setBillToId(asText(nextBillTos[0].id) || '-1');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load other services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => undefined);
  }, [visitId, patientId]);

  useEffect(() => {
    if (currentWardId && !wardId) setWardId(currentWardId);
  }, [currentWardId, wardId]);

  const filteredServices = useMemo(() => {
    const needle = searchText.trim().toLowerCase();
    if (!needle) return wardServices;
    return wardServices.filter((row) =>
      `${asText(row.name)} ${asText(row.description)} ${asText(row.id)}`.toLowerCase().includes(needle),
    );
  }, [wardServices, searchText]);

  const selectedService = useMemo(
    () => wardServices.find((row) => asText(row.id) === selectedServiceId) || null,
    [wardServices, selectedServiceId],
  );

  const submitRequest = async () => {
    if (!visitId) return;
    if (!selectedServiceId) {
      setError('Select a service first.');
      return;
    }
    if (!wardId) {
      setError('Service place is required.');
      return;
    }
    const safeQty = Math.max(1, Math.floor(asNumber(quantity) || 0));
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/add-ward-service-request/', {
        id: makeId(),
        patient_visit_id: visitId,
        ward_service_id: selectedServiceId,
        quantity: safeQty,
        bill_to_id: billToId || '-1',
        ward_id: wardId,
      });
      setSuccess('Other service request added.');
      setSelectedServiceId('');
      setSearchText('');
      setQuantity('1');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add other service request.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading other services...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Service</th>
                <th className="px-3 py-2 text-left font-semibold">Quantity</th>
                <th className="px-3 py-2 text-left font-semibold">Cost (GHS)</th>
                <th className="px-3 py-2 text-left font-semibold">Requested By</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((row) => {
                  const service = (row.ward_service as JsonRow | undefined) || {};
                  const user = (row.user as JsonRow | undefined) || {};
                  const invoiceItems = Array.isArray(row.invoice_items) ? (row.invoice_items as JsonRow[]) : [];
                  const totalCost = invoiceItems.reduce((sum, item) => sum + asNumber(item.final_amount), 0);
                  return (
                    <tr key={asText(row.id)} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(row.date_created)}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(service.name) || asText(row.ward_service_id) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(row.quantity) || '0'}</td>
                      <td className="px-3 py-2 text-slate-700">{formatMoney(totalCost || asNumber(service.price) * asNumber(row.quantity || 0))}</td>
                      <td className="px-3 py-2 text-slate-700">
                        {`${asText(user.first_name)} ${asText(user.last_name)}`.trim() || asText(user.name) || asText(row.user_id) || 'N/A'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-slate-500">No other services requested for this visit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Add Other Service</h3>
          <div className="mt-3 space-y-3">
            <label className="block text-xs text-slate-600">
              Services
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search service"
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <div className="max-h-56 overflow-auto rounded border border-slate-200">
              {filteredServices.map((row) => {
                const id = asText(row.id);
                const selected = id === selectedServiceId;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedServiceId(id)}
                    className={`flex w-full items-start justify-between border-b border-slate-100 px-3 py-2 text-left ${
                      selected ? 'bg-cyan-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>
                      <span className="block text-xs font-semibold text-slate-800">{asText(row.name) || id}</span>
                      <span className="block text-[11px] text-slate-500">{asText(row.description) || 'Ward / other service'}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">{formatMoney(row.price || 0)}</span>
                  </button>
                );
              })}
              {!filteredServices.length ? <p className="px-3 py-2 text-xs text-slate-500">No services found.</p> : null}
            </div>

            <label className="block text-xs text-slate-600">
              Quantity
              <input
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                type="number"
                min={1}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-xs text-slate-600">
              Charge Bill To
              <SearchableSelectField value={billToId} onChange={(event) => setBillToId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                {billToOptions.map((row) => (
                  <option key={asText(row.id)} value={asText(row.id)}>
                    {asText(row.name) || asText(row.id)}
                  </option>
                ))}
              </SearchableSelectField>
            </label>

            <label className="block text-xs text-slate-600">
              Service Place
              <input
                value={wardId}
                onChange={(event) => setWardId(event.target.value)}
                readOnly={Boolean(currentWardId)}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                placeholder="Ward id"
              />
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={submitRequest}
                disabled={saving || !selectedServiceId}
                className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {saving ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedServiceId('');
                  setSearchText('');
                  setQuantity('1');
                  setBillToId('-1');
                  setWardId(currentWardId);
                }}
                className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Selected Service</p>
          {selectedService ? (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{asText(selectedService.name) || 'N/A'}</h3>
                  <p className="mt-1 text-xs text-slate-600">{asText(selectedService.description) || 'No description available.'}</p>
                </div>
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {formatMoney(selectedService.price || 0)}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">Quantity</p>
                  <p className="text-sm font-semibold text-slate-900">{Math.max(1, Math.floor(asNumber(quantity) || 1))}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">Estimated Total</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatMoney(asNumber(selectedService.price) * Math.max(1, Math.floor(asNumber(quantity) || 1)))}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              Select a service to preview price and quantity impact.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RequestTransfusionServicesPanel({
  visitId,
}: {
  visitId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [viewData, setViewData] = useState<Record<string, unknown>>({});
  const [searchText, setSearchText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savingAction, setSavingAction] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [processingId, setProcessingId] = useState('');
  const [processingQty, setProcessingQty] = useState('');
  const [processingComment, setProcessingComment] = useState('');
  const [drugSearch, setDrugSearch] = useState('');
  const [debouncedDrugSearch, setDebouncedDrugSearch] = useState('');
  const [stockSearchRows, setStockSearchRows] = useState<JsonRow[]>([]);
  const [stockSearchLoading, setStockSearchLoading] = useState(false);
  const [selectedStockRow, setSelectedStockRow] = useState<JsonRow | null>(null);
  const [selectedStockId, setSelectedStockId] = useState('');
  const [modifierId, setModifierId] = useState('');
  const [indicatorId, setIndicatorId] = useState('');
  const [dosageFormId, setDosageFormId] = useState('');
  const [billToId, setBillToId] = useState('-1');
  const [quantity, setQuantity] = useState('1');
  const [administerTransfusion, setAdministerTransfusion] = useState('');
  const [transfusionVolume, setTransfusionVolume] = useState('');
  const [transfusionRate, setTransfusionRate] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [patientPregnant, setPatientPregnant] = useState('');
  const [patientEstimatedDeliveryDate, setPatientEstimatedDeliveryDate] = useState('');
  const [patientTransfused, setPatientTransfused] = useState('');
  const [previousTransfusionPlace, setPreviousTransfusionPlace] = useState('');
  const [knownAntibodies, setKnownAntibodies] = useState('');
  const [igaDeficient, setIgaDeficient] = useState('');
  const [comment, setComment] = useState('');

  const asRows = (value: unknown): JsonRow[] => {
    if (Array.isArray(value)) return value as JsonRow[];
    if (value && typeof value === 'object') {
      const payload = value as Record<string, unknown>;
      if (Array.isArray(payload.results)) return payload.results as JsonRow[];
      if (Array.isArray(payload.data)) return payload.data as JsonRow[];
      if (Array.isArray(payload.items)) return payload.items as JsonRow[];
    }
    return [];
  };

  const toLocalDateTimeInput = (value: Date): string => {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    const hours = `${value.getHours()}`.padStart(2, '0');
    const minutes = `${value.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const resetForm = () => {
    setDrugSearch('');
    setDebouncedDrugSearch('');
    setStockSearchRows([]);
    setSelectedStockRow(null);
    setSelectedStockId('');
    setModifierId('');
    setIndicatorId('');
    setDosageFormId('');
    setBillToId('-1');
    setQuantity('1');
    setAdministerTransfusion('');
    setTransfusionVolume('');
    setTransfusionRate('');
    setStartDateTime(toLocalDateTimeInput(new Date()));
    setPatientPregnant('');
    setPatientEstimatedDeliveryDate('');
    setPatientTransfused('');
    setPreviousTransfusionPlace('');
    setKnownAntibodies('');
    setIgaDeficient('');
    setComment('');
  };

  const loadView = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Record<string, unknown>>(
        `/legacy/request-medications/view-request/?patient_visit_id=${encodeURIComponent(visitId)}`,
      );
      setViewData(response || {});
      setBillToId((current) => {
        if (current && current !== '-1') return current;
        const first = asRows(response?.bill_to_options)[0];
        return asText(first?.id) || '-1';
      });
      setStartDateTime((current) => current || toLocalDateTimeInput(new Date()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load transfusion requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => undefined);
  }, [visitId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedDrugSearch(drugSearch.trim().toLowerCase()), 260);
    return () => window.clearTimeout(timer);
  }, [drugSearch]);

  useEffect(() => {
    if (debouncedDrugSearch.length < 2) {
      setStockSearchRows([]);
      setStockSearchLoading(false);
      return;
    }
    let cancelled = false;
    setStockSearchLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<Record<string, unknown>>(
          `/legacy/request-medications/search-drug-stocks/?searchValue=${encodeURIComponent(debouncedDrugSearch)}&limit=40`,
        );
        if (cancelled) return;
        setStockSearchRows(asRows(response?.results));
      } catch {
        if (!cancelled) setStockSearchRows([]);
      } finally {
        if (!cancelled) setStockSearchLoading(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [debouncedDrugSearch]);

  const transfusionRows = useMemo(
    () =>
      asRows(viewData.request_transfusions).sort((a, b) =>
        asText(((b.request as JsonRow | undefined) || {}).date_created).localeCompare(
          asText(((a.request as JsonRow | undefined) || {}).date_created),
        ),
      ),
    [viewData],
  );

  const filteredRows = useMemo(() => {
    const needle = searchText.trim().toLowerCase();
    if (!needle) return transfusionRows;
    return transfusionRows.filter((row) => {
      const request = (row.request as JsonRow | undefined) || {};
      const display = (row.display as JsonRow | undefined) || {};
      const haystack = [
        asText(display.name),
        asText(display.status_name),
        asText(display.ordered_by),
        asText(request.id),
        asText(request.transfusion_modifier_id),
        asText(request.transfusion_indicator_id),
        asText(request.comment),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [searchText, transfusionRows]);

  const modifiers = useMemo(() => asRows(viewData.transfusion_modifiers), [viewData]);
  const indicators = useMemo(() => asRows(viewData.transfusion_indicators), [viewData]);
  const dosageForms = useMemo(() => asRows(viewData.dosage_forms), [viewData]);
  const billToOptions = useMemo(() => asRows(viewData.bill_to_options), [viewData]);

  const selectedStock = useMemo(() => {
    if (!selectedStockId) return null;
    return stockSearchRows.find((row) => asText(row.id) === selectedStockId) || selectedStockRow;
  }, [selectedStockId, stockSearchRows, selectedStockRow]);

  const filteredModifiers = useMemo(() => {
    const selectedItemId = asText(selectedStock?.item_id);
    if (!selectedItemId) return modifiers;
    return modifiers.filter((row) => {
      const itemId = asText(row.item_id);
      return !itemId || itemId === selectedItemId;
    });
  }, [modifiers, selectedStock]);

  const filteredIndicators = useMemo(() => {
    if (!modifierId) return [];
    return indicators.filter((row) => asText(row.transfusion_modifier_id) === modifierId);
  }, [indicators, modifierId]);

  const modifierMap = useMemo(
    () => Object.fromEntries(modifiers.map((row) => [asText(row.id), asText(row.name) || asText(row.id)])),
    [modifiers],
  );
  const indicatorMap = useMemo(
    () => Object.fromEntries(indicators.map((row) => [asText(row.id), asText(row.name) || asText(row.id)])),
    [indicators],
  );
  const dosageMap = useMemo(
    () => Object.fromEntries(dosageForms.map((row) => [asText(row.id), asText(row.name) || asText(row.id)])),
    [dosageForms],
  );

  useEffect(() => {
    if (!filteredModifiers.find((row) => asText(row.id) === modifierId)) {
      setModifierId('');
      setIndicatorId('');
    }
  }, [filteredModifiers, modifierId]);

  useEffect(() => {
    if (!filteredIndicators.find((row) => asText(row.id) === indicatorId)) {
      setIndicatorId('');
    }
  }, [filteredIndicators, indicatorId]);

  const transfuseOverHours = useMemo(() => {
    const volume = asNumber(transfusionVolume);
    const rate = asNumber(transfusionRate);
    if (!volume || !rate) return 0;
    const hours = volume / rate;
    return Number.isFinite(hours) && hours > 0 ? Math.round(hours * 100) / 100 : 0;
  }, [transfusionRate, transfusionVolume]);

  useEffect(() => {
    if (administerTransfusion.trim()) return;
    if (!transfuseOverHours || !transfusionVolume || !transfusionRate) return;
    setAdministerTransfusion(`${transfusionVolume} ml @ ${transfusionRate} ml/hr for ${transfuseOverHours} hr(s)`);
  }, [administerTransfusion, transfuseOverHours, transfusionRate, transfusionVolume]);

  const computedEndDateTime = useMemo(() => {
    if (!startDateTime || !transfuseOverHours) return '';
    const start = new Date(startDateTime);
    if (Number.isNaN(start.getTime())) return '';
    start.setMinutes(start.getMinutes() + Math.round(transfuseOverHours * 60));
    return start.toISOString();
  }, [startDateTime, transfuseOverHours]);

  const selectedDetails = useMemo(
    () => transfusionRows.find((row) => asText(((row.request as JsonRow | undefined) || {}).id) === selectedRowId) || null,
    [selectedRowId, transfusionRows],
  );

  const processingRow = useMemo(
    () => transfusionRows.find((row) => asText(((row.request as JsonRow | undefined) || {}).id) === processingId) || null,
    [processingId, transfusionRows],
  );

  const submitRequest = async () => {
    if (!visitId) return;
    if (!selectedStockId) {
      setError('Select a transfusion stock item first.');
      return;
    }
    if (!modifierId) {
      setError('Select a transfusion modifier.');
      return;
    }
    if (!indicatorId) {
      setError('Select an indication.');
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-medications/add-request-transfusion/', {
        id: makeId(),
        request_type: 'transfusion',
        patient_visit_id: visitId,
        drug_stock_id: selectedStockId,
        drug_id: asText(selectedStock?.item_id) || undefined,
        transfusion_modifier_id: modifierId,
        transfusion_indicator_id: indicatorId,
        dosage_form_id: dosageFormId || undefined,
        bill_to_id: billToId || '-1',
        quantity: Math.max(1, Math.round(asNumber(quantity) || 1)),
        administer_transfusion: administerTransfusion || undefined,
        start_date: startDateTime ? new Date(startDateTime).toISOString() : undefined,
        end_date: computedEndDateTime || undefined,
        number_of_days: 1,
        priority: '1',
        transfusion_volume: transfusionVolume || undefined,
        transfusion_rate: transfusionRate || undefined,
        patient_pregnant: patientPregnant || undefined,
        patient_estimated_delivery_date: patientEstimatedDeliveryDate || undefined,
        patient_transfused: patientTransfused || undefined,
        previous_transfusion_place: previousTransfusionPlace || undefined,
        known_antibodies: knownAntibodies || undefined,
        iga_deficient: igaDeficient || undefined,
        comment: comment || undefined,
        service_place_id: '0',
        status_id: '20',
      });
      setSuccess('Transfusion request added.');
      setShowForm(false);
      resetForm();
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add transfusion request.');
    } finally {
      setSubmitting(false);
    }
  };

  const cancelRequest = async (requestId: string) => {
    setSavingAction(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-medications/cancel-request/', {
        request_type: 'transfusion',
        request_id: requestId,
      });
      setSuccess('Transfusion request cancelled.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel transfusion request.');
    } finally {
      setSavingAction(false);
    }
  };

  const processRequest = async () => {
    if (!processingId) return;
    setSavingAction(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-medications/process-request/', {
        request_type: 'transfusion',
        request_id: processingId,
        quantity: Math.max(1, Math.round(asNumber(processingQty) || 1)),
        comment: processingComment || undefined,
      });
      setSuccess('Transfusion request processed.');
      setProcessingId('');
      setProcessingQty('');
      setProcessingComment('');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process transfusion request.');
    } finally {
      setSavingAction(false);
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading transfusion requests...</div>;
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Transfusions</h3>
            <p className="text-xs text-slate-500">Track blood-product requests, pre-transfusion details, and charge lines.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search transfusions..."
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm sm:w-72"
            />
            <button
              type="button"
              onClick={() => {
                const next = !showForm;
                setShowForm(next);
                if (next && !startDateTime) setStartDateTime(toLocalDateTimeInput(new Date()));
              }}
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700"
            >
              {showForm ? 'Hide Form' : 'Add Transfusion'}
            </button>
          </div>
        </div>
        {error ? <div className="mt-3 rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
        {success ? <div className="mt-3 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Type</th>
                <th className="px-3 py-2 text-left font-semibold">Order Name</th>
                <th className="px-3 py-2 text-left font-semibold">Order Status</th>
                <th className="px-3 py-2 text-left font-semibold">Order Details</th>
                <th className="px-3 py-2 text-left font-semibold">Charges</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length ? (
                filteredRows.map((row) => {
                  const request = (row.request as JsonRow | undefined) || {};
                  const display = (row.display as JsonRow | undefined) || {};
                  const requestId = asText(request.id);
                  const statusId = asText(request.status_id);
                  const invoiceItems = Array.isArray(row.invoice_items) ? (row.invoice_items as JsonRow[]) : [];
                  const itemCharge = invoiceItems
                    .filter((entry) => asText(entry.status_id) !== '24')
                    .reduce((sum, entry) => sum + asNumber(entry.final_amount), 0);
                  return (
                    <tr key={requestId} className="border-t border-slate-100 align-top">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(request.date_created)}</td>
                      <td className="px-3 py-2 text-slate-700">{modifierMap[asText(request.transfusion_modifier_id)] || 'Transfusion'}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(display.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(display.status_name) || statusId || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">
                        <p>Indication: {indicatorMap[asText(request.transfusion_indicator_id)] || 'N/A'}</p>
                        <p>Route: {dosageMap[asText(request.dosage_form_id)] || asText(display.dosage_form_name) || 'N/A'}</p>
                        <p>Qty: {asText(request.quantity) || asText(display.quantity) || 'N/A'}</p>
                      </td>
                      <td className="px-3 py-2 text-slate-700">{itemCharge > 0 ? formatMoney(itemCharge) : 'N/A'}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedRowId((current) => (current === requestId ? '' : requestId))}
                            className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
                          >
                            {selectedRowId === requestId ? 'Hide' : 'View'}
                          </button>
                          {statusId === '20' ? (
                            <Fragment>
                              <button
                                type="button"
                                onClick={() => {
                                  setProcessingId(requestId);
                                  setProcessingQty(asText(request.quantity) || '1');
                                  setProcessingComment(asText(request.comment));
                                }}
                                className="rounded border border-sky-300 bg-sky-50 px-2 py-1 text-[11px] font-semibold text-sky-700"
                              >
                                Process
                              </button>
                              <button
                                type="button"
                                onClick={() => cancelRequest(requestId)}
                                disabled={savingAction}
                                className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </Fragment>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-slate-500">No transfusion requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedDetails ? (
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          {(() => {
            const request = (selectedDetails.request as JsonRow | undefined) || {};
            const display = (selectedDetails.display as JsonRow | undefined) || {};
            const invoiceItems = Array.isArray(selectedDetails.invoice_items) ? (selectedDetails.invoice_items as JsonRow[]) : [];
            return (
              <div className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{asText(display.name) || 'Transfusion request'}</h4>
                    <p className="text-xs text-slate-500">
                      {modifierMap[asText(request.transfusion_modifier_id)] || 'Transfusion'} | {indicatorMap[asText(request.transfusion_indicator_id)] || 'No indication set'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedRowId('')}
                    className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
                  >
                    Close
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Timing</p>
                    <p className="mt-2">Start: {formatDateTime(display.start_date || request.start_date)}</p>
                    <p>End: {formatDateTime(display.end_date || request.end_date)}</p>
                    <p>Issued: {formatDateTime(display.issue_date || request.issue_date)}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Clinical</p>
                    <p>Administer: {asText(request.administer_transfusion) || 'N/A'}</p>
                    <p>Pregnant: {asText(request.patient_pregnant) || 'N/A'}</p>
                    <p>Transfused recently: {asText(request.patient_transfused) || 'N/A'}</p>
                    <p>Known antibodies: {asText(request.known_antibodies) || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Billing</p>
                    <p>Total charge: {formatMoney(invoiceItems.reduce((sum, row) => sum + asNumber(row.final_amount), 0))}</p>
                    <p>Quantity: {asText(request.quantity) || 'N/A'}</p>
                    <p>Ordered by: {asText(display.ordered_by) || 'N/A'}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Notes</p>
                  <p className="mt-2">Comment: {asText(request.comment) || 'N/A'}</p>
                  <p>Previous transfusion place: {asText(request.previous_transfusion_place) || 'N/A'}</p>
                  <p>Estimated delivery date: {asText(request.patient_estimated_delivery_date) || 'N/A'}</p>
                </div>
              </div>
            );
          })()}
        </section>
      ) : null}

      {showForm ? (
        <section className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Add Transfusion</h3>
              <p className="text-xs text-slate-600">Mirror the legacy transfusion workflow with the core pre-check and administration data.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
            >
              Close
            </button>
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
            <div className="space-y-4">
              <div className="rounded-lg border border-white/70 bg-white/80 p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-700">Transfusion Stock</p>
                <div className="mt-3 space-y-3">
                  <label className="block text-xs text-slate-700">
                    Search Internal Drugs
                    <input
                      value={drugSearch}
                      onChange={(event) => setDrugSearch(event.target.value)}
                      placeholder="Search blood product stock..."
                      className={`mt-1 w-full rounded border px-3 py-2 text-sm ${
                        selectedStockId ? 'border-emerald-300 bg-emerald-50/60' : 'border-slate-300 bg-white'
                      }`}
                    />
                  </label>
                  {selectedStock ? (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                      Selected: {asText(selectedStock.name) || asText(selectedStock.item_id) || asText(selectedStock.id)}
                    </div>
                  ) : null}
                  {!selectedStockId && (stockSearchLoading || stockSearchRows.length) ? (
                    <div className="max-h-52 overflow-auto rounded-lg border border-slate-200 bg-white">
                      {stockSearchLoading ? (
                        <div className="px-3 py-2 text-xs text-slate-500">Searching stock...</div>
                      ) : (
                        stockSearchRows.map((row) => (
                          <button
                            key={asText(row.id)}
                            type="button"
                            onClick={() => {
                              setSelectedStockId(asText(row.id));
                              setSelectedStockRow(row);
                              setDrugSearch(asText(row.name) || asText(row.item_id) || asText(row.id));
                              setStockSearchRows([]);
                            }}
                            className="flex w-full items-start justify-between gap-3 border-b border-slate-100 px-3 py-2 text-left text-xs text-slate-700 last:border-b-0 hover:bg-slate-50"
                          >
                            <span>
                              <span className="block font-semibold text-slate-900">{asText(row.name) || 'Unnamed stock'}</span>
                              <span className="block text-slate-500">
                                Batch: {asText(row.batch_number) || 'N/A'} | Available: {asText(row.quantity_left) || 'N/A'}
                              </span>
                            </span>
                            <span className="text-slate-500">{formatMoney(row.unit_selling_price || 0)}</span>
                          </button>
                        ))
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-xs text-slate-700">
                  Modifier
                  <SearchableSelectField value={modifierId} onChange={(event) => setModifierId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select modifier</option>
                    {filteredModifiers.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id)}>
                        {asText(row.name) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>
                <label className="block text-xs text-slate-700">
                  Indication
                  <SearchableSelectField
                    value={indicatorId}
                    onChange={(event) => setIndicatorId(event.target.value)}
                    disabled={!modifierId}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
                  >
                    <option value="">Select indication</option>
                    {filteredIndicators.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id)}>
                        {asText(row.name) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>
                <label className="block text-xs text-slate-700">
                  Route Of Administration
                  <SearchableSelectField value={dosageFormId} onChange={(event) => setDosageFormId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select route</option>
                    {dosageForms.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id)}>
                        {asText(row.name) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>
                <label className="block text-xs text-slate-700">
                  Charge Bill To
                  <SearchableSelectField value={billToId} onChange={(event) => setBillToId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                    {billToOptions.map((row) => (
                      <option key={asText(row.id)} value={asText(row.id) || '-1'}>
                        {asText(row.name) || asText(row.label) || asText(row.id)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <label className="block text-xs text-slate-700">
                  Quantity
                  <input type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Volume (ml)
                  <input value={transfusionVolume} onChange={(event) => setTransfusionVolume(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Rate (ml/hr)
                  <input value={transfusionRate} onChange={(event) => setTransfusionRate(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-xs text-slate-700">
                  Date and Time
                  <input type="datetime-local" value={startDateTime} onChange={(event) => setStartDateTime(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  Administer Transfusion Dose
                  <input
                    value={administerTransfusion}
                    onChange={(event) => setAdministerTransfusion(event.target.value)}
                    placeholder="e.g. 250 ml @ 125 ml/hr for 2 hr(s)"
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                  />
                  {transfuseOverHours ? (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Infuse over {transfuseOverHours} hr(s). Expected end: {formatDateTime(computedEndDateTime)}
                    </p>
                  ) : null}
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Pregnancy Check</p>
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => setPatientPregnant('Yes')} className={`rounded px-3 py-1 text-[11px] font-semibold ${patientPregnant === 'Yes' ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>Yes</button>
                    <button type="button" onClick={() => setPatientPregnant('No')} className={`rounded px-3 py-1 text-[11px] font-semibold ${patientPregnant === 'No' ? 'bg-rose-600 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>No</button>
                  </div>
                  {patientPregnant === 'Yes' ? (
                    <label className="mt-3 block text-xs text-slate-700">
                      Estimated Delivery Date
                      <input type="date" value={patientEstimatedDeliveryDate} onChange={(event) => setPatientEstimatedDeliveryDate(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                    </label>
                  ) : null}
                </div>
                <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Recent Transfusion</p>
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => setPatientTransfused('Yes')} className={`rounded px-3 py-1 text-[11px] font-semibold ${patientTransfused === 'Yes' ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>Yes</button>
                    <button type="button" onClick={() => setPatientTransfused('No')} className={`rounded px-3 py-1 text-[11px] font-semibold ${patientTransfused === 'No' ? 'bg-rose-600 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>No</button>
                  </div>
                  <label className="mt-3 block text-xs text-slate-700">
                    Previous Transfusion Place
                    <input value={previousTransfusionPlace} onChange={(event) => setPreviousTransfusionPlace(event.target.value)} placeholder="Facility / unit" className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                  </label>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-xs text-slate-700">
                  Known Antibodies
                  <input value={knownAntibodies} onChange={(event) => setKnownAntibodies(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                </label>
                <label className="block text-xs text-slate-700">
                  IgA Deficient
                  <SearchableSelectField value={igaDeficient} onChange={(event) => setIgaDeficient(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </SearchableSelectField>
                </label>
              </div>
              <label className="block text-xs text-slate-700">
                Comment
                <textarea value={comment} onChange={(event) => setComment(event.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
              </label>
            </div>
            <aside className="space-y-3 rounded-xl border border-white/70 bg-white/85 p-4 shadow-sm">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-700">Selected Order</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selectedStock ? asText(selectedStock.name) || asText(selectedStock.item_id) || asText(selectedStock.id) : 'No stock selected'}
                </p>
                <p className="text-xs text-slate-500">Batch: {selectedStock ? asText(selectedStock.batch_number) || 'N/A' : 'N/A'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-700">
                <p>Modifier: {modifierMap[modifierId] || 'N/A'}</p>
                <p>Indication: {indicatorMap[indicatorId] || 'N/A'}</p>
                <p>Route: {dosageMap[dosageFormId] || 'N/A'}</p>
                <p>Quantity: {asText(quantity) || '1'}</p>
                <p>Expected charge: {formatMoney(asNumber(selectedStock?.unit_selling_price) * Math.max(1, Math.round(asNumber(quantity) || 1)))}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">Administration Summary</p>
                <p className="mt-1">{administerTransfusion || 'Volume and rate can auto-build the instruction.'}</p>
                <p className="mt-1">Start: {startDateTime ? formatDateTime(new Date(startDateTime).toISOString()) : 'N/A'}</p>
                <p>End: {computedEndDateTime ? formatDateTime(computedEndDateTime) : 'N/A'}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={resetForm} className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Reset</button>
                <button type="button" onClick={submitRequest} disabled={submitting} className="rounded bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Save Transfusion'}
                </button>
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {processingRow ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/45 p-4">
          <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.3)]">
            {(() => {
              const request = (processingRow.request as JsonRow | undefined) || {};
              const display = (processingRow.display as JsonRow | undefined) || {};
              return (
                <Fragment>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">Process Transfusion Request</h3>
                      <p className="text-xs text-slate-600">
                        {asText(display.name) || 'Transfusion'} | {modifierMap[asText(request.transfusion_modifier_id)] || 'Transfusion'}
                      </p>
                    </div>
                    <button type="button" onClick={() => setProcessingId('')} className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700">
                      Close
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 md:grid-cols-2">
                    <p><span className="font-semibold text-slate-900">Indication:</span> {indicatorMap[asText(request.transfusion_indicator_id)] || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Route:</span> {dosageMap[asText(request.dosage_form_id)] || asText(display.dosage_form_name) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Administer:</span> {asText(request.administer_transfusion) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Requested Qty:</span> {asText(request.quantity) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Ordered By:</span> {asText(display.ordered_by) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Current Status:</span> {asText(display.status_name) || asText(request.status_id) || 'N/A'}</p>
                    <p className="md:col-span-2"><span className="font-semibold text-slate-900">Comment:</span> {asText(request.comment) || 'N/A'}</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <label className="block text-xs text-slate-700">
                      Quantity To Issue
                      <input value={processingQty} onChange={(event) => setProcessingQty(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                    </label>
                    <label className="block text-xs text-slate-700">
                      Processing Comment
                      <textarea value={processingComment} onChange={(event) => setProcessingComment(event.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                    </label>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => setProcessingId('')} className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
                    <button type="button" onClick={processRequest} disabled={savingAction} className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                      {savingAction ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </Fragment>
              );
            })()}
          </section>
        </div>
      ) : null}
    </div>
  );
}

function RequestMedicationServicesPanel({
  visitId,
}: {
  visitId: string;
}) {
  type RequestKind = 'medication' | 'prescription' | 'infusion';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [viewData, setViewData] = useState<Record<string, unknown>>({});
  const [stockSearchRows, setStockSearchRows] = useState<JsonRow[]>([]);
  const [stockSearchLoading, setStockSearchLoading] = useState(false);
  const [selectedStockRow, setSelectedStockRow] = useState<JsonRow | null>(null);
  const [formType, setFormType] = useState<'prescription' | 'infusion' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState<{ requestType: RequestKind; requestId: string } | null>(null);
  const [processingQty, setProcessingQty] = useState('');
  const [processingComment, setProcessingComment] = useState('');
  const [savingAction, setSavingAction] = useState(false);

  const [drugSearch, setDrugSearch] = useState('');
  const [debouncedDrugSearch, setDebouncedDrugSearch] = useState('');
  const [selectedStockId, setSelectedStockId] = useState('');
  const [frequencyId, setFrequencyId] = useState('');
  const [days, setDays] = useState('1');
  const [doseAmount, setDoseAmount] = useState('');
  const [doseAmountUnit, setDoseAmountUnit] = useState('mg');
  const [doseQty, setDoseQty] = useState('');
  const [doseQtyUnit, setDoseQtyUnit] = useState('tablet');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructionInfo, setInstructionInfo] = useState('');
  const [comment, setComment] = useState('');
  const [billToId, setBillToId] = useState('-1');
  const [servicePlaceId, setServicePlaceId] = useState('0');
  const [showSchedulePlanner, setShowSchedulePlanner] = useState(false);
  const [plannerStartTime, setPlannerStartTime] = useState('');
  const [plannerDraft, setPlannerDraft] = useState<Array<{ dose_number: number; status: '0' | '1'; dose_date: string }>>([]);
  const [customSchedule, setCustomSchedule] = useState<Record<string, string>>({});

  const asRows = (value: unknown): JsonRow[] => {
    if (Array.isArray(value)) return value as JsonRow[];
    if (value && typeof value === 'object') {
      const payload = value as Record<string, unknown>;
      if (Array.isArray(payload.results)) return payload.results as JsonRow[];
      if (Array.isArray(payload.data)) return payload.data as JsonRow[];
      if (Array.isArray(payload.items)) return payload.items as JsonRow[];
    }
    return [];
  };

  const parseAmountUnit = (raw: unknown): { amount: number | null; unit: string | null } => {
    const text = asText(raw);
    if (!text) return { amount: null, unit: null };
    const matched = text.match(/([0-9]*\.?[0-9]+)/);
    if (!matched) return { amount: null, unit: text.toLowerCase() || null };
    const amount = Number(matched[1]);
    const unit = text.replace(matched[1], '').trim().toLowerCase();
    return { amount: Number.isFinite(amount) ? amount : null, unit: unit || null };
  };

  const toIsoDate = (value: Date): string => {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addDays = (dateValue: string, daysValue: number): string => {
    if (!dateValue || !Number.isFinite(daysValue)) return '';
    const start = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(start.getTime())) return '';
    start.setDate(start.getDate() + daysValue);
    return toIsoDate(start);
  };

  const diffInDays = (startValue: string, endValue: string): number | null => {
    if (!startValue || !endValue) return null;
    const start = new Date(`${startValue}T00:00:00`);
    const end = new Date(`${endValue}T00:00:00`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const loadView = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const viewResponse = await api.get<Record<string, unknown>>(
        `/legacy/request-medications/view-request/?patient_visit_id=${encodeURIComponent(visitId)}`,
      );
      setViewData(viewResponse || {});
      if (!frequencyId) {
        const firstFrequency = asRows(viewResponse?.drug_administration_frequencies)[0];
        if (firstFrequency?.id) setFrequencyId(asText(firstFrequency.id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load medication services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => undefined);
  }, [visitId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedDrugSearch(drugSearch.trim().toLowerCase()), 260);
    return () => window.clearTimeout(timer);
  }, [drugSearch]);

  const bundles = useMemo(() => {
    const meds = asRows(viewData.request_medications).map((row) => ({ type: 'medication' as RequestKind, row }));
    const prescriptions = asRows(viewData.request_prescriptions).map((row) => ({ type: 'prescription' as RequestKind, row }));
    const infusions = asRows(viewData.request_infusions).map((row) => ({ type: 'infusion' as RequestKind, row }));
    return [...prescriptions, ...infusions, ...meds].sort((a, b) => {
      const aDate = asText((a.row.request as JsonRow | undefined)?.date_created);
      const bDate = asText((b.row.request as JsonRow | undefined)?.date_created);
      return bDate.localeCompare(aDate);
    });
  }, [viewData]);

  const rows = useMemo(() => {
    const needle = searchText.trim().toLowerCase();
    if (!needle) return bundles;
    return bundles.filter(({ type, row }) => {
      const request = (row.request as JsonRow | undefined) || {};
      const display = (row.display as JsonRow | undefined) || {};
      const haystack = [
        type,
        asText(display.name),
        asText(display.status_name),
        asText(display.ordered_by),
        asText(display.frequency_name),
        asText(display.dosage_form_name),
        asText(request.id),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [bundles, searchText]);

  useEffect(() => {
    if (!formType) return;
    if (debouncedDrugSearch.length < 2) {
      setStockSearchRows([]);
      setStockSearchLoading(false);
      return;
    }
    let cancelled = false;
    setStockSearchLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<Record<string, unknown>>(
          `/legacy/request-medications/search-drug-stocks/?searchValue=${encodeURIComponent(debouncedDrugSearch)}&limit=40`,
        );
        if (cancelled) return;
        setStockSearchRows(asRows(response?.results));
      } catch {
        if (!cancelled) setStockSearchRows([]);
      } finally {
        if (!cancelled) setStockSearchLoading(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [debouncedDrugSearch, formType]);

  const selectedStock = useMemo(() => {
    if (!selectedStockId) return null;
    return stockSearchRows.find((stock) => asText(stock.id) === selectedStockId) || selectedStockRow;
  }, [selectedStockId, stockSearchRows, selectedStockRow]);

  const frequencyDosePerDay = useMemo(() => {
    const selected = asRows(viewData.drug_administration_frequencies).find((row) => asText(row.id) === frequencyId);
    if (!selected) return null;
    const direct = Number(selected.dose_per_day ?? selected.doses_per_day);
    if (Number.isFinite(direct) && direct > 0) return direct;
    const name = asText(selected.name).toLowerCase();
    const timesDaily = name.match(/(\d+)\s*times?\s*daily/);
    if (timesDaily) {
      const parsed = Number(timesDaily[1]);
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
    const hourly = name.match(/(\d+)\s*hourly/);
    if (hourly) {
      const everyHours = Number(hourly[1]);
      if (Number.isFinite(everyHours) && everyHours > 0) return 24 / everyHours;
    }
    return null;
  }, [viewData, frequencyId]);

  const selectedFrequencyRow = useMemo(
    () => asRows(viewData.drug_administration_frequencies).find((row) => asText(row.id) === frequencyId) || null,
    [viewData, frequencyId],
  );

  const plannerEligible = useMemo(() => {
    const name = asText(selectedFrequencyRow?.name).toLowerCase();
    if (!name) return false;
    return /times?\s*daily|hourly/.test(name);
  }, [selectedFrequencyRow]);

  const numberOfDoses = useMemo(() => {
    const dayCount = Math.max(1, asNumber(days) || 1);
    if (!Number.isFinite(frequencyDosePerDay || NaN) || !frequencyDosePerDay) return dayCount;
    return Math.max(1, Math.round(dayCount * frequencyDosePerDay));
  }, [days, frequencyDosePerDay]);

  const computedDoseRatio = useMemo(() => {
    const strength = parseAmountUnit(selectedStock?.dosage);
    const least = parseAmountUnit(selectedStock?.least_dosage);
    if (!Number.isFinite(strength.amount || NaN) || !Number.isFinite(least.amount || NaN)) return null;
    if (!strength.amount || !least.amount || least.amount <= 0) return null;
    return strength.amount / least.amount;
  }, [selectedStock]);

  const administerDose = useMemo(() => {
    const amount = asText(doseAmount);
    const qty = asText(doseQty);
    if (!amount || !qty) return '';
    return `${amount} ${asText(doseAmountUnit) || 'mg'} / ${qty} ${asText(doseQtyUnit) || 'tablet'}`.trim();
  }, [doseAmount, doseAmountUnit, doseQty, doseQtyUnit]);

  const quantityHint = useMemo(() => {
    const qtyValue = Number(doseQty);
    if (!Number.isFinite(qtyValue) || qtyValue <= 0 || !Number.isFinite(numberOfDoses)) return null;
    return Math.round(qtyValue * numberOfDoses * 100) / 100;
  }, [doseQty, numberOfDoses]);

  const selectedStockLabel = useMemo(() => {
    if (!selectedStock) return '';
    return (
      asText(selectedStock.name) ||
      asText(selectedStock.item_id) ||
      asText(selectedStock.id)
    );
  }, [selectedStock]);

  const processingBundle = useMemo(() => {
    if (!processing) return null;
    return bundles.find(({ type, row }) => {
      const request = (row.request as JsonRow | undefined) || {};
      return type === processing.requestType && asText(request.id) === processing.requestId;
    }) || null;
  }, [processing, bundles]);

  const resetForm = () => {
    setDrugSearch('');
    setSelectedStockId('');
    setSelectedStockRow(null);
    setStockSearchRows([]);
    setFrequencyId('');
    setDays('1');
    setDoseAmount('');
    setDoseAmountUnit('mg');
    setDoseQty('');
    setDoseQtyUnit('tablet');
    const today = toIsoDate(new Date());
    setStartDate(today);
    setEndDate(addDays(today, 1));
    setInstructionInfo('');
    setComment('');
    setBillToId('-1');
    setServicePlaceId('0');
    setShowSchedulePlanner(false);
    setPlannerStartTime('');
    setPlannerDraft([]);
    setCustomSchedule({});
  };

  useEffect(() => {
    if (!formType) return;
    const today = toIsoDate(new Date());
    if (!startDate) setStartDate(today);
    if (!endDate) {
      const dayCount = Math.max(1, asNumber(days) || 1);
      setEndDate(addDays(today, dayCount));
    }
  }, [formType, startDate, endDate, days]);

  const submitRequest = async () => {
    if (!visitId || !formType) return;
    if (!selectedStockId) {
      setError('Select an internal drug stock first.');
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const itemId = asText(selectedStock?.item_id);
      const endpoint =
        formType === 'prescription'
          ? '/legacy/request-medications/add-request-prescription/'
          : '/legacy/request-medications/add-request-infusion/';
      const payload: Record<string, unknown> = {
        id: makeId(),
        request_type: formType,
        patient_visit_id: visitId,
        drug_stock_id: selectedStockId,
        drug_id: itemId || undefined,
        number_of_days: asNumber(days) || 1,
        drug_administration_frequency_id: frequencyId || undefined,
        service_place_id: servicePlaceId || '0',
        bill_to_id: billToId || '-1',
        number_of_doses: numberOfDoses || undefined,
        administer_dose: administerDose || undefined,
        drug_administration_instruction_info: instructionInfo || undefined,
        custom_schedule: Object.keys(customSchedule).length ? customSchedule : undefined,
        comment,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        status_id: '20',
      };
      const computedQuantity = asNumber(quantityHint) || 1;
      const estimatedDoses = Math.max(1, asNumber(numberOfDoses) || 1);
      if (formType === 'prescription') {
        payload.quantity = computedQuantity;
        payload.prescription_to_be_issued = estimatedDoses;
        payload.prescription_requested_quantity = computedQuantity;
      } else {
        payload.quantity = computedQuantity;
        payload.infusion_to_be_issued = estimatedDoses;
        payload.quantity_issued = estimatedDoses;
      }
      await api.post(endpoint, payload);
      setSuccess(`${formType === 'prescription' ? 'Prescription' : 'Infusion'} request added.`);
      resetForm();
      setFormType(null);
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add request.');
    } finally {
      setSubmitting(false);
    }
  };

  const generatePlannerRows = () => {
    const count = Math.max(1, numberOfDoses || 1);
    const safeCount = Math.min(count, 120);
    const daysCount = Math.max(1, asNumber(days) || 1);
    const defaultHours = safeCount > 0 ? (24 / (safeCount / daysCount)) : 24;
    const startPoint = plannerStartTime
      ? new Date(plannerStartTime)
      : new Date(`${startDate || toIsoDate(new Date())}T08:00`);
    if (Number.isNaN(startPoint.getTime())) return;
    const nextRows: Array<{ dose_number: number; status: '0' | '1'; dose_date: string }> = [];
    for (let i = 0; i < safeCount; i += 1) {
      const slot = new Date(startPoint.getTime());
      slot.setMinutes(slot.getMinutes() + Math.round(defaultHours * 60 * i));
      const local = `${slot.getFullYear()}-${`${slot.getMonth() + 1}`.padStart(2, '0')}-${`${slot.getDate()}`.padStart(2, '0')}T${`${slot.getHours()}`.padStart(2, '0')}:${`${slot.getMinutes()}`.padStart(2, '0')}`;
      nextRows.push({ dose_number: i + 1, status: '1', dose_date: local });
    }
    setPlannerDraft(nextRows);
  };

  const savePlannerSchedule = () => {
    const mapped: Record<string, string> = {};
    plannerDraft.forEach((row) => {
      mapped[`dose_status_${row.dose_number}`] = row.status;
      mapped[`dose_date${row.dose_number}`] = row.dose_date ? row.dose_date.replace('T', ' ') : '';
    });
    setCustomSchedule(mapped);
    setShowSchedulePlanner(false);
  };

  useEffect(() => {
    if (plannerEligible) return;
    setCustomSchedule({});
  }, [plannerEligible]);

  const cancelRequest = async (requestType: RequestKind, requestId: string) => {
    setSavingAction(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-medications/cancel-request/', {
        request_type: requestType,
        request_id: requestId,
      });
      setSuccess('Request cancelled.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel request.');
    } finally {
      setSavingAction(false);
    }
  };

  const processRequest = async () => {
    if (!processing) return;
    setSavingAction(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-medications/process-request/', {
        request_type: processing.requestType,
        request_id: processing.requestId,
        quantity: asNumber(processingQty) || undefined,
        comment: processingComment || undefined,
      });
      setSuccess('Request processed.');
      setProcessing(null);
      setProcessingQty('');
      setProcessingComment('');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process request.');
    } finally {
      setSavingAction(false);
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading medication services...</div>;
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">New Prescriptions</h3>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search orders..."
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm sm:w-72"
          />
        </div>
        {error ? <div className="mt-3 rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
        {success ? <div className="mt-3 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Type</th>
                <th className="px-3 py-2 text-left font-semibold">Order Name</th>
                <th className="px-3 py-2 text-left font-semibold">Order Status</th>
                <th className="px-3 py-2 text-left font-semibold">Order Details</th>
                <th className="px-3 py-2 text-left font-semibold">Charges</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map(({ type, row }) => {
                  const request = (row.request as JsonRow | undefined) || {};
                  const display = (row.display as JsonRow | undefined) || {};
                  const statusId = asText(request.status_id);
                  const requestId = asText(request.id);
                  const invoiceItems = Array.isArray(row.invoice_items) ? (row.invoice_items as JsonRow[]) : [];
                  return (
                    <tr key={`${type}-${requestId}`} className="border-t border-slate-100 align-top">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(request.date_created)}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {type}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-slate-900">{asText(display.name) || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">{asText(display.status_name) || statusId || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">
                        <p>By: {asText(display.ordered_by) || 'N/A'}</p>
                        <p>Freq: {asText(display.frequency_name) || 'N/A'}</p>
                        <p>Qty: {asText(display.quantity) || 'N/A'}</p>
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        {invoiceItems.length ? (
                          <div className="space-y-1">
                            {invoiceItems.map((entry) => (
                              <p key={asText(entry.id)} className="text-[11px]">
                                {formatMoney(entry.final_amount)}
                              </p>
                            ))}
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          {statusId === '20' ? (
                            <button
                              type="button"
                              onClick={() => cancelRequest(type, requestId)}
                              disabled={savingAction}
                              className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-slate-500">No medication orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={`rounded-xl border p-4 ${
          formType === 'prescription'
            ? 'border-rose-200 bg-rose-50/40'
            : formType === 'infusion'
              ? 'border-violet-200 bg-violet-50/40'
              : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFormType((prev) => (prev === 'prescription' ? null : 'prescription'))}
            className={`rounded px-3 py-2 text-xs font-semibold ${
              formType === 'prescription'
                ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                : 'border border-rose-300 bg-white text-rose-700'
            }`}
          >
            Add Prescription
          </button>
          <button
            type="button"
            onClick={() => setFormType((prev) => (prev === 'infusion' ? null : 'infusion'))}
            className={`rounded px-3 py-2 text-xs font-semibold ${
              formType === 'infusion'
                ? 'bg-violet-700 text-white ring-2 ring-violet-200'
                : 'border border-violet-300 bg-white text-violet-700'
            }`}
          >
            Add Continuous Infusion
          </button>
        </div>
        {formType ? (
          <div className="mt-3">
            <div
              className={`mb-3 rounded-lg border px-3 py-2 ${
                formType === 'prescription'
                  ? 'border-rose-200 bg-rose-100/70'
                  : 'border-violet-200 bg-violet-100/70'
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  formType === 'prescription' ? 'text-rose-800' : 'text-violet-800'
                }`}
              >
                {formType === 'prescription' ? 'Prescription Form Active' : 'Continuous Infusion Form Active'}
              </p>
              <p className="text-xs text-slate-700">
                {formType === 'prescription'
                  ? 'Use this for standard medication prescriptions with dose-per-administration.'
                  : 'Use this for infusion therapy orders and timed infusion schedules.'}
              </p>
            </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block text-xs text-slate-600 md:col-span-2">
              {formType === 'prescription' ? 'Search Internal Drugs' : 'Search Internal Infusions'}
              <div
                className={`mt-1 rounded-lg border p-2 ${
                  selectedStockId
                    ? 'border-emerald-300 bg-emerald-50/60 ring-1 ring-emerald-200'
                    : 'border-slate-200 bg-white'
                }`}
              >
              <input
                value={drugSearch}
                onChange={(event) => {
                  setDrugSearch(event.target.value);
                  setSelectedStockId('');
                  setSelectedStockRow(null);
                }}
                placeholder="Type at least 2 letters..."
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
              {selectedStockId ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                    Selected
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800">{selectedStockLabel || selectedStockId}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStockId('');
                      setSelectedStockRow(null);
                    }}
                    className="rounded border border-emerald-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
                  >
                    Clear
                  </button>
                </div>
              ) : null}
              {stockSearchLoading ? <p className="mt-1 text-[11px] text-slate-500">Searching drug stocks...</p> : null}
              {!selectedStockId && stockSearchRows.length ? (
                <div className="mt-2 max-h-44 overflow-auto rounded border border-slate-200 bg-white">
                {stockSearchRows.map((stock) => {
                  const stockId = asText(stock.id);
                  const label = asText(stock.full_name) || asText(stock.name) || stockId;
                  const identity = [
                    asText(stock.dosage) ? `${asText(stock.dosage)}` : '',
                    asText(stock.dosage_form_name) ? asText(stock.dosage_form_name) : '',
                    asText(stock.sub_route_name) ? `(${asText(stock.sub_route_name)})` : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                  const meta = [
                    asText(stock.route_name) ? `Route: ${asText(stock.route_name)}` : '',
                    asText(stock.cup) ? `CUP: ${asText(stock.cup)}` : '',
                    asText(stock.quantity_left) ? `Qty: ${asText(stock.quantity_left)} ${asText(stock.unit_type_name)}` : '',
                    asText(stock.unit_selling_price) ? `Cash: GHS ${Number(asText(stock.unit_selling_price) || 0).toFixed(2)}` : '',
                    asText(stock.insurance_price) ? `Insurance: GHS ${Number(asText(stock.insurance_price) || 0).toFixed(2)}` : '',
                    asText(stock.batch_number) ? `Batch: ${asText(stock.batch_number)}` : '',
                    asText(stock.expiry_date) ? `Exp: ${asText(stock.expiry_date)}` : '',
                  ]
                    .filter(Boolean)
                    .join(' • ');
                  const basketId = asText(stock.stock_basket_id);
                  return (
                      <button
                        key={stockId}
                        type="button"
                        onClick={() => {
                          setSelectedStockId(stockId);
                          setSelectedStockRow(stock);
                          const strength = parseAmountUnit(stock.dosage);
                          const cup = parseAmountUnit(stock.cup);
                          const least = parseAmountUnit(stock.least_dosage);
                          if (Number.isFinite(strength.amount || NaN) && strength.amount) setDoseAmount(`${strength.amount}`);
                          if (asText(strength.unit)) setDoseAmountUnit(asText(strength.unit));
                          const quantitySeed =
                            Number.isFinite(cup.amount || NaN) && cup.amount
                              ? cup
                              : least;
                          if (Number.isFinite(quantitySeed.amount || NaN) && quantitySeed.amount) setDoseQty(`${quantitySeed.amount}`);
                          if (asText(quantitySeed.unit)) setDoseQtyUnit(asText(quantitySeed.unit));
                          const instruction = [asText(stock.instruction), asText(stock.direction), asText(stock.caution)]
                            .filter(Boolean)
                            .join(' ')
                            .trim();
                          if (instruction) setInstructionInfo(instruction);
                        }}
                        className={`flex w-full items-start justify-between border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50 ${
                          selectedStockId === stockId ? 'bg-cyan-50' : ''
                        }`}
                      >
                        <span className="space-y-0.5">
                          <span className="block text-xs font-semibold text-slate-800">
                            {label}
                            {basketId && basketId !== '1' ? (
                              <span className="ml-2 inline-flex rounded-full border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                                Emergency Basket
                              </span>
                            ) : null}
                          </span>
                          <span className="block text-[11px] text-slate-600">{identity || '-'}</span>
                          <span className="block text-[10px] text-slate-500">{meta || '-'}</span>
                        </span>
                      </button>
                  );
                })}
                </div>
              ) : null}
              {!selectedStockId && !stockSearchLoading && debouncedDrugSearch.length >= 2 && !stockSearchRows.length ? (
                <p className="mt-1 text-[11px] text-slate-500">No available drug stock found.</p>
              ) : null}
              </div>
            </label>
            <label className="block text-xs text-slate-600">
              Dosage Frequency
              <SearchableSelectField value={frequencyId} onChange={(event) => setFrequencyId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                <option value="">Select Frequency</option>
                {asRows(viewData.drug_administration_frequencies).map((row) => (
                  <option key={asText(row.id)} value={asText(row.id)}>
                    {asText(row.name) || asText(row.description) || asText(row.id)}
                  </option>
                ))}
              </SearchableSelectField>
            </label>
            <label className="block text-xs text-slate-600">
              {formType === 'prescription' ? 'Administer Per Dose' : 'Administer Infusion Dose'}
              <div className="mt-1 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2">
                <input
                  value={doseAmount}
                  onChange={(event) => {
                    const next = event.target.value;
                    setDoseAmount(next);
                    const amount = Number(next);
                    if (computedDoseRatio && Number.isFinite(amount) && amount > 0) {
                      setDoseQty(`${Math.round((amount / computedDoseRatio) * 100) / 100}`);
                    }
                  }}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Amount"
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={doseAmountUnit}
                  onChange={(event) => setDoseAmountUnit(event.target.value)}
                  placeholder="Unit"
                  className="w-20 rounded border border-slate-300 px-2 py-2 text-sm"
                />
                <input
                  value={doseQty}
                  onChange={(event) => {
                    const next = event.target.value;
                    setDoseQty(next);
                    const qtyValue = Number(next);
                    if (computedDoseRatio && Number.isFinite(qtyValue) && qtyValue > 0) {
                      setDoseAmount(`${Math.round((qtyValue * computedDoseRatio) * 100) / 100}`);
                    }
                  }}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Quantity"
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={doseQtyUnit}
                  onChange={(event) => setDoseQtyUnit(event.target.value)}
                  placeholder="Unit"
                  className="w-24 rounded border border-slate-300 px-2 py-2 text-sm"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                {administerDose || (formType === 'prescription'
                  ? 'Enter dose and quantity to build administer-per-dose value.'
                  : 'Enter infusion dose and quantity to build infusion dosing value.')}
              </p>
            </label>
            <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
              <label className="block text-xs text-slate-600">
                Start Date
                <input
                  value={startDate}
                  onChange={(event) => {
                    const nextStart = event.target.value;
                    setStartDate(nextStart);
                    const dayCount = Math.max(0, asNumber(days));
                    if (nextStart && Number.isFinite(dayCount)) {
                      const nextEnd = addDays(nextStart, dayCount);
                      if (nextEnd) setEndDate(nextEnd);
                    }
                  }}
                  type="date"
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-xs text-slate-600">
                Number Of Days
                <input
                  value={days}
                  onChange={(event) => {
                    const next = event.target.value;
                    setDays(next);
                    const nextDays = Number(next);
                    if (startDate && Number.isFinite(nextDays) && nextDays >= 0) {
                      const nextEnd = addDays(startDate, nextDays);
                      if (nextEnd) setEndDate(nextEnd);
                    }
                  }}
                  type="number"
                  min={1}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
                <p className="mt-1 text-[11px] text-slate-500">Estimated doses: {numberOfDoses}</p>
              </label>
              <label className="block text-xs text-slate-600">
                End Date
                <input
                  value={endDate}
                  onChange={(event) => {
                    const nextEnd = event.target.value;
                    setEndDate(nextEnd);
                    const diff = diffInDays(startDate, nextEnd);
                    if (diff !== null && diff >= 0) setDays(`${diff}`);
                  }}
                  type="date"
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
            </div>
            {plannerEligible ? (
              <div className="md:col-span-2">
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!plannerStartTime) {
                        const fallback = `${startDate || toIsoDate(new Date())}T08:00`;
                        setPlannerStartTime(fallback);
                      }
                      if (!plannerDraft.length) generatePlannerRows();
                      setShowSchedulePlanner(true);
                    }}
                    className="rounded border border-cyan-300 bg-cyan-50 px-2 py-1 text-[11px] font-semibold text-cyan-700"
                  >
                    Schedule Time
                  </button>
                  {Object.keys(customSchedule).length ? (
                    <span className="text-[11px] font-semibold text-emerald-700">Custom schedule saved</span>
                  ) : (
                    <span className="text-[11px] text-slate-500">No custom schedule yet</span>
                  )}
                </div>
              </div>
            ) : null}
            {quantityHint ? (
              <p className="text-[11px] text-slate-500 md:col-span-2">Computed quantity: {quantityHint}</p>
            ) : null}
            <label className="block text-xs text-slate-600">
              Charge Bill To
              <SearchableSelectField value={billToId} onChange={(event) => setBillToId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                {asRows(viewData.bill_to_options).map((row) => (
                  <option key={asText(row.id)} value={asText(row.id)}>
                    {asText(row.name) || asText(row.id)}
                  </option>
                ))}
              </SearchableSelectField>
            </label>
            <label className="block text-xs text-slate-600">
              Service Place
              <SearchableSelectField value={servicePlaceId} onChange={(event) => setServicePlaceId(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm">
                <option value="0">Place 1</option>
                <option value="1">Place 2</option>
              </SearchableSelectField>
            </label>
            <label className="block text-xs text-slate-600 md:col-span-2">
              Dosage Instruction Information
              <textarea
                value={instructionInfo}
                onChange={(event) => setInstructionInfo(event.target.value)}
                rows={2}
                placeholder={formType === 'prescription' ? 'Prescription dosing instructions' : 'Infusion instructions / rate notes'}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs text-slate-600 md:col-span-2">
              Instruction / Comment
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={2}
                placeholder={formType === 'prescription' ? 'Additional prescription comment' : 'Additional infusion comment'}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            {selectedStockLabel ? (
              <p className="text-xs text-slate-500 md:col-span-2">Selected: {selectedStockLabel}</p>
            ) : null}
            <div className="flex flex-wrap gap-2 md:col-span-2">
              <button
                type="button"
                onClick={submitRequest}
                disabled={submitting}
                className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setFormType(null);
                }}
                className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>
          </div>
        ) : null}
      </section>

      {processing ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-base font-semibold text-slate-900">Process {processing.requestType}</h3>
            {(() => {
              const processingRequest = (processingBundle?.row.request as JsonRow | undefined) || {};
              const processingDisplay = (processingBundle?.row.display as JsonRow | undefined) || {};
              const estimatedDosage = asText(processingRequest.number_of_doses) || asText(processingDisplay.quantity) || 'N/A';
              const administerValue = asText(processingRequest.administer_dose) || asText(processingRequest.administer_infusion) || 'N/A';
              const existingComment = asText(processingRequest.comment) || 'N/A';
              const quantityRequested =
                asText(processingRequest.prescription_requested_quantity) ||
                asText(processingRequest.quantity) ||
                asText(processingDisplay.quantity) ||
                'N/A';
              const quantityRequired =
                asText(processingRequest.prescription_to_be_issued) ||
                asText(processingRequest.infusion_to_be_issued) ||
                asText(processingDisplay.quantity) ||
                'N/A';
              return (
                <div className="mt-3 grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">{asText(processingDisplay.name) || 'Selected order'}</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    <p><span className="font-semibold text-slate-900">Ordered By:</span> {asText(processingDisplay.ordered_by) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Requested On:</span> {formatDateTime(processingRequest.date_created)}</p>
                    <p><span className="font-semibold text-slate-900">Frequency:</span> {asText(processingDisplay.frequency_name) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Status:</span> {asText(processingDisplay.status_name) || asText(processingRequest.status_id) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Estimated Dosage:</span> {estimatedDosage}</p>
                    <p><span className="font-semibold text-slate-900">Administer Dose:</span> {administerValue}</p>
                    <p><span className="font-semibold text-slate-900">Quantity Requested:</span> {quantityRequested}</p>
                    <p><span className="font-semibold text-slate-900">Quantity Required:</span> {quantityRequired}</p>
                  </div>
                  <p><span className="font-semibold text-slate-900">Request Comment:</span> {existingComment}</p>
                </div>
              );
            })()}
            <div className="mt-3 space-y-3">
              <label className="block text-xs text-slate-700">
                Quantity To Dispense
                <input
                  value={processingQty}
                  onChange={(event) => setProcessingQty(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
                <p className="mt-1 text-[11px] text-slate-500">You can increase or reduce this quantity before dispensing.</p>
              </label>
              <label className="block text-xs text-slate-700">
                Comment
                <textarea value={processingComment} onChange={(event) => setProcessingComment(event.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setProcessing(null)}
                className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <button type="button" onClick={processRequest} disabled={savingAction} className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                {savingAction ? 'Saving...' : 'Save'}
              </button>
            </div>
          </section>
        </div>
      ) : null}
      {showSchedulePlanner ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Custom Schedule</h3>
                <p className="text-xs text-slate-600">
                  Frequency: {asText(selectedFrequencyRow?.name) || 'N/A'} | Start: {startDate || 'N/A'} | End: {endDate || 'N/A'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSchedulePlanner(false)}
                className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-2">
              <label className="block text-xs text-slate-600">
                Start Time
                <input
                  type="datetime-local"
                  value={plannerStartTime}
                  onChange={(event) => setPlannerStartTime(event.target.value)}
                  className="mt-1 rounded border border-slate-300 px-2 py-2 text-sm"
                />
              </label>
              <button
                type="button"
                onClick={generatePlannerRows}
                className="rounded border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Generate
              </button>
            </div>
            <div className="mt-3 max-h-[46vh] overflow-auto rounded border border-slate-200">
              <table className="min-w-full text-xs">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Dose</th>
                    <th className="px-3 py-2 text-left font-semibold">Status</th>
                    <th className="px-3 py-2 text-left font-semibold">Date Time</th>
                  </tr>
                </thead>
                <tbody>
                  {plannerDraft.length ? (
                    plannerDraft.map((entry, index) => (
                      <tr key={`planner-${entry.dose_number}`} className="border-t border-slate-100">
                        <td className="px-3 py-2 text-slate-800">Dose {entry.dose_number}</td>
                        <td className="px-3 py-2">
                          <SearchableSelectField
                            value={entry.status}
                            onChange={(event) => {
                              const next = [...plannerDraft];
                              next[index] = { ...next[index], status: event.target.value === '0' ? '0' : '1' };
                              setPlannerDraft(next);
                            }}
                            className="rounded border border-slate-300 px-2 py-1 text-xs"
                          >
                            <option value="1">On</option>
                            <option value="0">Off</option>
                          </SearchableSelectField>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="datetime-local"
                            value={entry.dose_date}
                            onChange={(event) => {
                              const next = [...plannerDraft];
                              next[index] = { ...next[index], dose_date: event.target.value };
                              setPlannerDraft(next);
                            }}
                            className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-3 py-4 text-center text-slate-500">
                        Click Generate to create dose schedule rows.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSchedulePlanner(false)}
                className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePlannerSchedule}
                className="rounded bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
              >
                Save Schedule
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function VisitFlowSheetWorkspace({
  visitId,
}: {
  visitId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'schedule' | 'analysis'>('schedule');
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed'>('all');
  const [workspace, setWorkspace] = useState<Record<string, unknown>>({});
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const localDateTimeValue = (offsetHours = 0) => {
    const next = new Date();
    next.setMinutes(0, 0, 0);
    next.setHours(next.getHours() + offsetHours);
    const shifted = new Date(next.getTime() - next.getTimezoneOffset() * 60000);
    return shifted.toISOString().slice(0, 16);
  };
  const [scheduleForm, setScheduleForm] = useState({
    flow_sheet_type_id: '',
    flow_sheet_frequency_id: '',
    start_date: localDateTimeValue(),
    end_date: localDateTimeValue(24),
  });
  const [entryOpen, setEntryOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<JsonRow | null>(null);
  const [entryForm, setEntryForm] = useState<Record<string, string>>({});
  const [analysisType, setAnalysisType] = useState('');
  const [analysisDate, setAnalysisDate] = useState('');

  const asRows = (value: unknown): JsonRow[] => {
    if (Array.isArray(value)) return value as JsonRow[];
    if (value && typeof value === 'object') {
      const payload = value as Record<string, unknown>;
      if (Array.isArray(payload.results)) return payload.results as JsonRow[];
      if (Array.isArray(payload.data)) return payload.data as JsonRow[];
      if (Array.isArray(payload.items)) return payload.items as JsonRow[];
    }
    return [];
  };

  const loadWorkspace = async () => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Record<string, unknown>>(
        `/legacy/patient-visits/set-flow-sheet/?patient_visit_id=${encodeURIComponent(visitId)}`,
      );
      setWorkspace(response || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load flow sheet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspace().catch(() => undefined);
  }, [visitId]);

  const summary = (workspace.summary as Record<string, unknown>) || {};
  const requestRows = asRows(workspace.requests);
  const typeOptions = asRows(workspace.type_options);
  const frequencyOptions = asRows(workspace.frequency_options);
  const recordsByType = (workspace.records_by_type as Record<string, unknown>) || {};

  useEffect(() => {
    if (!scheduleForm.flow_sheet_type_id && typeOptions.length) {
      setScheduleForm((prev) => ({ ...prev, flow_sheet_type_id: asText(typeOptions[0]?.id) }));
    }
    if (!analysisType && typeOptions.length) {
      setAnalysisType(asText(typeOptions[0]?.key) || 'vitals');
    }
  }, [typeOptions, analysisType, scheduleForm.flow_sheet_type_id]);

  const filteredRequests = useMemo(
    () =>
      requestRows.filter((row) => {
        if (statusFilter === 'all') return true;
        const statusName = asText((row.display as JsonRow | undefined)?.status_name).toLowerCase();
        return statusName === statusFilter;
      }),
    [requestRows, statusFilter],
  );

  const selectedType = useMemo(
    () => typeOptions.find((row) => asText(row.id) === scheduleForm.flow_sheet_type_id) || null,
    [typeOptions, scheduleForm.flow_sheet_type_id],
  );

  const schedulePreview = useMemo(() => {
    const start = scheduleForm.start_date ? new Date(scheduleForm.start_date) : null;
    const end = scheduleForm.end_date ? new Date(scheduleForm.end_date) : null;
    const freqRow = frequencyOptions.find((row) => asText(row.id) === scheduleForm.flow_sheet_frequency_id);
    const interval = asNumber((freqRow as JsonRow | undefined)?.frequency);
    if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start || !interval) {
      return [] as string[];
    }
    const items: string[] = [];
    const cursor = new Date(start.getTime());
    while (cursor <= end && items.length < 20) {
      items.push(cursor.toLocaleString());
      cursor.setHours(cursor.getHours() + interval);
    }
    return items;
  }, [scheduleForm.start_date, scheduleForm.end_date, scheduleForm.flow_sheet_frequency_id, frequencyOptions]);

  const seedEntryForm = (requestRow: JsonRow): Record<string, string> => {
    const currentEntry = (requestRow.current_entry as JsonRow | undefined) || {};
    const display = (requestRow.display as JsonRow | undefined) || {};
    const typeKey = asText(display.type_key);
    const base: Record<string, string> = {
      entry_id: asText(currentEntry.id),
      request_flow_sheet_id: asText(requestRow.id),
    };
    const read = (key: string) => asText(currentEntry[key]);
    if (typeKey === 'vitals') {
      return {
        ...base,
        temperature: read('temperature'),
        heart_rate: read('heart_rate'),
        respiratory_rate: read('respiratory_rate'),
        systolic: read('systolic'),
        diastolic: read('diastolic'),
        spo2: read('spo2'),
        weight: read('weight'),
        notes: read('notes'),
      };
    }
    if (typeKey === 'adls') {
      return {
        ...base,
        has_eaten: read('has_eaten'),
        is_dressed: read('is_dressed'),
        has_toilet: read('has_toilet'),
        has_bath: read('has_bath'),
        has_bed_mobility: read('has_bed_mobility'),
        has_transfer: read('has_transfer'),
        has_walked_in_room: read('has_walked_in_room'),
        notes: read('notes'),
      };
    }
    if (typeKey === 'pca') {
      return {
        ...base,
        pain_assessment: read('pain_assessment'),
        pain_score: read('pain_score'),
        pain_type: read('pain_type'),
        pain_location: read('pain_location'),
        pain_frequency: read('pain_frequency'),
        pain_interventions: read('pain_interventions'),
        intervention_response: read('intervention_response'),
        notes: read('notes'),
      };
    }
    if (typeKey === 'daily_care') {
      return {
        ...base,
        precautions: read('precautions'),
        mobility: read('mobility'),
        medications: read('medications'),
        mental_status: read('mental_status'),
        toileting_needs: read('toileting_needs'),
        activity: read('activity'),
        feeding: read('feeding'),
        hygiene: read('hygiene'),
        notes: read('notes'),
      };
    }
    if (typeKey === 'intake_output') {
      return {
        ...base,
        weight: read('weight'),
        po: read('po'),
        iv: read('iv'),
        voided_urine: read('voided_urine'),
        stool: read('stool'),
        emesis: read('emesis'),
        estimated_blood_loss: read('estimated_blood_loss'),
        notes: read('notes'),
      };
    }
    if (typeKey === 'stroke') {
      return {
        ...base,
        level_of_consciousness_score: read('level_of_consciousness_score'),
        best_gaze_score: read('best_gaze_score'),
        motor_left_arm_score: read('motor_left_arm_score'),
        motor_right_arm_score: read('motor_right_arm_score'),
        motor_left_leg_score: read('motor_left_leg_score'),
        motor_right_leg_score: read('motor_right_leg_score'),
        reassessment_score: read('reassessment_score'),
        notes: read('notes'),
      };
    }
    return {
      ...base,
      site_assessment: read('site_assessment'),
      dressing_type: read('dressing_type'),
      line_status: read('line_status'),
      dressing_status: read('dressing_status'),
      dressing_intervention: read('dressing_intervention'),
      reason_not_rotated: read('reason_not_rotated'),
      dressing_change_due: read('dressing_change_due') ? asText(read('dressing_change_due')).slice(0, 16) : '',
      notes: read('notes'),
    };
  };

  const openRecord = (requestRow: JsonRow) => {
    setSelectedRequest(requestRow);
    setEntryForm(seedEntryForm(requestRow));
    setEntryOpen(true);
  };

  const closeRecord = () => {
    setEntryOpen(false);
    setSelectedRequest(null);
    setEntryForm({});
  };

  const saveSchedule = async () => {
    if (!scheduleForm.flow_sheet_type_id || !scheduleForm.flow_sheet_frequency_id || !scheduleForm.start_date || !scheduleForm.end_date) {
      setError('Flow sheet type, frequency, start date and end date are required.');
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-flow-sheets/add/', {
        patient_visit_id: visitId,
        flow_sheet_type_id: scheduleForm.flow_sheet_type_id,
        flow_sheet_frequency_id: scheduleForm.flow_sheet_frequency_id,
        start_date: scheduleForm.start_date,
        end_date: scheduleForm.end_date,
      });
      setSuccess('Flow sheet scheduled.');
      setScheduleOpen(false);
      setScheduleForm((prev) => ({
        ...prev,
        start_date: localDateTimeValue(),
        end_date: localDateTimeValue(24),
      }));
      await loadWorkspace();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to schedule flow sheet.');
    } finally {
      setSaving(false);
    }
  };

  const saveEntry = async () => {
    if (!selectedRequest) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-flow-sheets/update-entry/', {
        ...entryForm,
        request_flow_sheet_id: asText(selectedRequest.id),
      });
      setSuccess('Flow sheet entry saved.');
      closeRecord();
      await loadWorkspace();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save flow sheet entry.');
    } finally {
      setSaving(false);
    }
  };

  const currentAnalysisRows = useMemo(() => {
    const rows = asRows(recordsByType[analysisType]);
    return rows.filter((row) => {
      if (!analysisDate) return true;
      const recordedOn = dateOnly(asText(row.date_created || row.start));
      return recordedOn === analysisDate;
    });
  }, [analysisType, analysisDate, recordsByType]);

  const renderField = (
    key: string,
    label: string,
    type: 'text' | 'number' | 'datetime-local' | 'textarea' = 'text',
  ) => {
    if (type === 'textarea') {
      return (
        <label className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>
          <textarea
            value={entryForm[key] || ''}
            onChange={(event) => setEntryForm((prev) => ({ ...prev, [key]: event.target.value }))}
            className="min-h-[72px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
        </label>
      );
    }
    return (
      <label className="space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>
        <input
          type={type}
          value={entryForm[key] || ''}
          onChange={(event) => setEntryForm((prev) => ({ ...prev, [key]: event.target.value }))}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        />
      </label>
    );
  };

  const renderYesNo = (key: string, label: string) => (
    <label className="space-y-1">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <SearchableSelectField
        value={entryForm[key] || ''}
        onChange={(event) => setEntryForm((prev) => ({ ...prev, [key]: event.target.value }))}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </SearchableSelectField>
    </label>
  );

  const renderEntryFields = () => {
    const display = (selectedRequest?.display as JsonRow | undefined) || {};
    const typeKey = asText(display.type_key);
    if (typeKey === 'vitals') {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {renderField('temperature', 'Temperature', 'number')}
          {renderField('heart_rate', 'Heart Rate', 'number')}
          {renderField('respiratory_rate', 'Respiratory Rate', 'number')}
          {renderField('spo2', 'SpO2', 'number')}
          {renderField('systolic', 'Systolic', 'number')}
          {renderField('diastolic', 'Diastolic', 'number')}
          {renderField('weight', 'Weight', 'number')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
    }
    if (typeKey === 'adls') {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {renderYesNo('has_eaten', 'Has Eaten')}
          {renderYesNo('is_dressed', 'Is Dressed')}
          {renderYesNo('has_toilet', 'Toilet')}
          {renderYesNo('has_bath', 'Bath')}
          {renderYesNo('has_bed_mobility', 'Bed Mobility')}
          {renderYesNo('has_transfer', 'Transfer')}
          {renderYesNo('has_walked_in_room', 'Walked In Room')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
    }
    if (typeKey === 'pca') {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {renderField('pain_assessment', 'Pain Assessment')}
          {renderField('pain_score', 'Pain Score', 'number')}
          {renderField('pain_type', 'Pain Type')}
          {renderField('pain_location', 'Pain Location')}
          {renderField('pain_frequency', 'Pain Frequency')}
          {renderField('pain_interventions', 'Interventions')}
          {renderField('intervention_response', 'Response')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
    }
    if (typeKey === 'daily_care') {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {renderField('precautions', 'Precautions')}
          {renderField('mobility', 'Mobility')}
          {renderField('medications', 'Medications')}
          {renderField('mental_status', 'Mental Status')}
          {renderField('toileting_needs', 'Toileting Needs')}
          {renderField('activity', 'Activity')}
          {renderField('feeding', 'Feeding')}
          {renderField('hygiene', 'Hygiene')}
          <div className="md:col-span-2">{renderField('notes', 'Notes', 'textarea')}</div>
        </div>
      );
    }
    if (typeKey === 'intake_output') {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {renderField('weight', 'Weight', 'number')}
          {renderField('po', 'Oral Intake', 'number')}
          {renderField('iv', 'IV Intake', 'number')}
          {renderField('voided_urine', 'Voided Urine', 'number')}
          {renderField('stool', 'Stool', 'number')}
          {renderField('emesis', 'Emesis', 'number')}
          {renderField('estimated_blood_loss', 'Estimated Blood Loss', 'number')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
    }
    if (typeKey === 'stroke') {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {renderField('level_of_consciousness_score', 'LOC Score', 'number')}
          {renderField('best_gaze_score', 'Best Gaze', 'number')}
          {renderField('motor_left_arm_score', 'Motor Left Arm', 'number')}
          {renderField('motor_right_arm_score', 'Motor Right Arm', 'number')}
          {renderField('motor_left_leg_score', 'Motor Left Leg', 'number')}
          {renderField('motor_right_leg_score', 'Motor Right Leg', 'number')}
          {renderField('reassessment_score', 'Reassessment', 'number')}
          {renderField('notes', 'Notes', 'textarea')}
        </div>
      );
    }
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {renderField('site_assessment', 'Site Assessment')}
        {renderField('dressing_type', 'Dressing Type')}
        {renderField('line_status', 'Line Status')}
        {renderField('dressing_status', 'Dressing Status')}
        {renderField('dressing_intervention', 'Dressing Intervention')}
        {renderField('reason_not_rotated', 'Reason Not Rotated')}
        {renderField('dressing_change_due', 'Dressing Change Due', 'datetime-local')}
        {renderField('notes', 'Notes', 'textarea')}
      </div>
    );
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading FlowSheet...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Flow Sheet</h3>
            <p className="text-xs text-slate-500">Schedule bedside sheets and record the next due occurrence for this admitted visit.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveSection('schedule')}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                activeSection === 'schedule' ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              Schedule
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('analysis')}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                activeSection === 'analysis' ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              Analysis
            </button>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Scheduled Requests</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{asNumber(summary.scheduled_requests)}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-emerald-600">Completed Requests</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-700">{asNumber(summary.completed_requests)}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-amber-600">Pending Entries</p>
            <p className="mt-1 text-2xl font-semibold text-amber-700">{asNumber(summary.pending_entries)}</p>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-cyan-600">Completed Entries</p>
            <p className="mt-1 text-2xl font-semibold text-cyan-700">{asNumber(summary.completed_entries)}</p>
          </div>
        </div>
      </section>

      {activeSection === 'schedule' ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(['all', 'scheduled', 'completed'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                    statusFilter === value ? 'border-slate-300 bg-slate-100 text-slate-800' : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {value === 'all' ? 'All' : value === 'scheduled' ? 'Scheduled' : 'Completed'}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setScheduleOpen(true)}
              className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700"
            >
              Schedule Flow Sheet
            </button>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-3 py-2">Date Created</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Frequency</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Sheets</th>
                    <th className="px-3 py-2">Current Snapshot</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length ? (
                    filteredRequests.map((row) => {
                      const display = (row.display as JsonRow | undefined) || {};
                      const pendingCount = asNumber(display.pending_count);
                      const currentEntry = (row.current_entry as JsonRow | undefined) || {};
                      return (
                        <tr key={asText(row.id)} className="border-t border-slate-100 align-top">
                          <td className="px-3 py-2">{formatDateTime(row.date_created)}</td>
                          <td className="px-3 py-2 font-semibold text-slate-900">{asText(display.type_name) || 'Flow Sheet'}</td>
                          <td className="px-3 py-2">{asText(display.frequency_name) || 'N/A'}</td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${
                                asText(display.status_name).toLowerCase() === 'completed'
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                  : 'border-amber-200 bg-amber-50 text-amber-700'
                              }`}
                            >
                              {asText(display.status_name) || 'Scheduled'}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            {asNumber(display.completed_count)}/{asNumber(display.total_count) || asNumber(row.total_sheets)}
                          </td>
                          <td className="px-3 py-2 text-slate-600">{asText(currentEntry.summary) || 'No values entered yet.'}</td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-2">
                              {pendingCount > 0 && asText(currentEntry.id) ? (
                                <button
                                  type="button"
                                  onClick={() => openRecord(row)}
                                  className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold text-sky-700"
                                >
                                  Record Next
                                </button>
                              ) : null}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveSection('analysis');
                                  setAnalysisType(asText(display.type_key));
                                }}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700"
                              >
                                View Analysis
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-3 py-6 text-center text-slate-500">
                        No flow sheet requests match the current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,240px)_minmax(0,220px)_1fr]">
            <label className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sheet Type</span>
              <SearchableSelectField
                value={analysisType}
                onChange={(event) => setAnalysisType(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                {typeOptions.map((row) => (
                  <option key={asText(row.key) || asText(row.id)} value={asText(row.key)}>
                    {asText(row.name)}
                  </option>
                ))}
              </SearchableSelectField>
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Filter Date</span>
              <input
                type="date"
                value={analysisDate}
                onChange={(event) => setAnalysisDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              />
            </label>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">Records Loaded</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{currentAnalysisRows.length}</p>
              <p className="mt-1 text-xs text-slate-500">Filtered by selected sheet type and optional date.</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {typeOptions.map((row) => {
              const typeKey = asText(row.key);
              const count = asRows(recordsByType[typeKey]).length;
              return (
                <button
                  key={typeKey || asText(row.id)}
                  type="button"
                  onClick={() => setAnalysisType(typeKey)}
                  className={`rounded-2xl border p-3 text-left ${
                    analysisType === typeKey ? 'border-cyan-300 bg-cyan-50' : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-900">{asText(row.name)}</p>
                  <p className="mt-1 text-xl font-semibold text-slate-700">{count}</p>
                  <p className="text-[11px] text-slate-500">{asText(row.description) || 'Saved records'}</p>
                </button>
              );
            })}
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-3 py-2">Recorded</th>
                    <th className="px-3 py-2">Sheet #</th>
                    <th className="px-3 py-2">Summary</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAnalysisRows.length ? (
                    currentAnalysisRows.map((row) => (
                      <tr key={asText(row.id)} className="border-t border-slate-100">
                        <td className="px-3 py-2">{formatDateTime(row.date_created || row.start)}</td>
                        <td className="px-3 py-2">{asText(row.patient_sheet_number) || 'N/A'}</td>
                        <td className="px-3 py-2 text-slate-600">{asText(row.summary) || 'No captured values.'}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${
                              asText(row.is_complete) === '1'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-amber-200 bg-amber-50 text-amber-700'
                            }`}
                          >
                            {asText(row.is_complete) === '1' ? 'Complete' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-slate-500">
                        No saved records for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {scheduleOpen ? (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/35 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">Schedule Flow Sheet</h4>
                <p className="text-sm text-slate-500">Create timed occurrences for a bedside sheet and generate the pending rows automatically.</p>
              </div>
              <button type="button" onClick={() => setScheduleOpen(false)} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sheet Type</span>
                <SearchableSelectField
                  value={scheduleForm.flow_sheet_type_id}
                  onChange={(event) => setScheduleForm((prev) => ({ ...prev, flow_sheet_type_id: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                >
                  <option value="">Select</option>
                  {typeOptions.map((row) => (
                    <option key={asText(row.id)} value={asText(row.id)}>
                      {asText(row.name)}
                    </option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Frequency</span>
                <SearchableSelectField
                  value={scheduleForm.flow_sheet_frequency_id}
                  onChange={(event) => setScheduleForm((prev) => ({ ...prev, flow_sheet_frequency_id: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                >
                  <option value="">Select</option>
                  {frequencyOptions.map((row) => (
                    <option key={asText(row.id)} value={asText(row.id)}>
                      {asText(row.name)} {asText(row.description) ? `(${asText(row.description)})` : ''}
                    </option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Start Date</span>
                <input
                  type="datetime-local"
                  value={scheduleForm.start_date}
                  onChange={(event) => setScheduleForm((prev) => ({ ...prev, start_date: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">End Date</span>
                <input
                  type="datetime-local"
                  value={scheduleForm.end_date}
                  onChange={(event) => setScheduleForm((prev) => ({ ...prev, end_date: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                />
              </label>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">Schedule Preview</p>
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                  {schedulePreview.length} occurrence{schedulePreview.length === 1 ? '' : 's'}
                </span>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {schedulePreview.length ? (
                  schedulePreview.map((item) => (
                    <div key={item} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white px-3 py-4 text-xs text-slate-500 md:col-span-2">
                    Select a valid frequency and date range to preview generated sheet times.
                  </div>
                )}
              </div>
              {selectedType ? (
                <p className="mt-3 text-xs text-slate-500">
                  {asText(selectedType.name)} {asText(selectedType.description) ? `- ${asText(selectedType.description)}` : ''}
                </p>
              ) : null}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setScheduleOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSchedule}
                disabled={saving}
                className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 disabled:opacity-50"
              >
                {saving ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {entryOpen && selectedRequest ? (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/35 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">Record Flow Sheet</h4>
                <p className="text-sm text-slate-500">
                  {asText((selectedRequest.display as JsonRow | undefined)?.type_name)} sheet #{asText((selectedRequest.current_entry as JsonRow | undefined)?.patient_sheet_number) || 'N/A'}
                </p>
              </div>
              <button type="button" onClick={closeRecord} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Scheduled Time</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{formatDateTime((selectedRequest.current_entry as JsonRow | undefined)?.start)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Pending</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{asText((selectedRequest.display as JsonRow | undefined)?.pending_count)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Latest Snapshot</p>
                <p className="mt-1 text-sm text-slate-600">{asText((selectedRequest.current_entry as JsonRow | undefined)?.summary) || 'No values entered yet.'}</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">{renderEntryFields()}</div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeRecord}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEntry}
                disabled={saving}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VisitMarWorkspace({
  visitId,
}: {
  visitId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState('0');
  const [payload, setPayload] = useState<Record<string, unknown>>({});
  const [selectedTask, setSelectedTask] = useState<JsonRow | null>(null);
  const [scheduleTarget, setScheduleTarget] = useState<JsonRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionNote, setActionNote] = useState('');
  const [actionVolume, setActionVolume] = useState('');
  const [actionRate, setActionRate] = useState('');
  const [actionWaste, setActionWaste] = useState('');
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [scheduleDescription, setScheduleDescription] = useState('');
  const [scheduleStart, setScheduleStart] = useState('');
  const [scheduleDuration, setScheduleDuration] = useState('60');
  const [scheduleOccurrences, setScheduleOccurrences] = useState('1');
  const [scheduleIntervalHours, setScheduleIntervalHours] = useState('24');

  const asRows = (value: unknown): JsonRow[] => {
    if (Array.isArray(value)) return value as JsonRow[];
    if (value && typeof value === 'object') {
      const payloadValue = value as Record<string, unknown>;
      if (Array.isArray(payloadValue.results)) return payloadValue.results as JsonRow[];
      if (Array.isArray(payloadValue.data)) return payloadValue.data as JsonRow[];
      if (Array.isArray(payloadValue.items)) return payloadValue.items as JsonRow[];
    }
    return [];
  };

  const filterOptions = [
    { id: '0', label: 'All', tone: 'slate' },
    { id: '1', label: 'Scheduled', tone: 'emerald' },
    { id: '2', label: 'Unscheduled', tone: 'slate' },
    { id: '4', label: 'Paused', tone: 'amber' },
    { id: '3', label: 'Stopped', tone: 'rose' },
    { id: '5', label: 'Completed', tone: 'cyan' },
    { id: '6', label: 'Overdue', tone: 'rose' },
  ];

  const loadWorkspace = async (filterValue: string) => {
    if (!visitId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Record<string, unknown>>(
        `/legacy/patient-visits/set-mar/?patient_visit_id=${encodeURIComponent(visitId)}&filter=${encodeURIComponent(filterValue)}`,
      );
      setPayload(response || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load MAR.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspace(filter).catch(() => undefined);
  }, [visitId, filter]);

  const sections = (payload.sections as Record<string, unknown>) || {};
  const summary = (payload.summary as Record<string, unknown>) || {};
  const timeline = asRows(payload.timeline);
  const sectionLookup = useMemo(() => {
    const lookup = new Map<string, JsonRow>();
    Object.values(sections).forEach((value) => {
      asRows(value).forEach((row) => {
        lookup.set(asText(row.id), row);
      });
    });
    return lookup;
  }, [sections]);
  const sectionOrder: Array<{ key: string; label: string }> = [
    { key: 'prescription', label: 'Prescriptions' },
    { key: 'prn', label: 'PRN' },
    { key: 'infusion', label: 'Infusions' },
    { key: 'transfusion', label: 'Transfusions' },
    { key: 'miscellaneous', label: 'Miscellaneous' },
    { key: 'sample_collection', label: 'Sample Collection' },
  ];
  const timelineEntries = useMemo(() => {
    return timeline.map((row) => {
      const matched = sectionLookup.get(asText(row.id));
      const display = ((matched?.display as JsonRow | undefined) || {}) as JsonRow;
      const task = ((matched?.task as JsonRow | undefined) || {}) as JsonRow;
      const requestInfo = ((matched?.request as JsonRow | undefined) || {}) as JsonRow;
      const hasTask = asText(row.has_task) === 'true' || row.has_task === true || Boolean(asText(task.id));
      const anchor = asText(row.start) || asText(task.start) || asText(requestInfo.date_created);
      return {
        row,
        matched,
        display,
        task,
        requestInfo,
        hasTask,
        anchor,
      };
    });
  }, [timeline, sectionLookup]);
  const unscheduledEntries = timelineEntries.filter((entry) => !entry.hasTask);
  const scheduledEntries = timelineEntries.filter((entry) => entry.hasTask);
  const nextScheduledEntry = scheduledEntries[0] || null;

  const openTask = (row: JsonRow) => {
    const task = (row.task as JsonRow | undefined) || {};
    setSelectedTask(row);
    setActionNote(asText(task.info) || asText(task.report_reaction) || '');
    setActionVolume(asText(task.volume));
    setActionRate(asText(task.rate));
    setActionWaste(asText(task.waste_volume));
  };

  const inferIntervalHours = (row: JsonRow) => {
    const display = (row.display as JsonRow | undefined) || {};
    const frequency = ((display.frequency as JsonRow | undefined) || {}).name;
    const text = asText(frequency).toLowerCase();
    if (!text) return '24';
    const hourMatch = text.match(/(\d+)\s*hour/);
    if (hourMatch?.[1]) return hourMatch[1];
    if (text.includes('four times')) return '6';
    if (text.includes('three times')) return '8';
    if (text.includes('twice')) return '12';
    if (text.includes('daily') || text.includes('morning') || text.includes('night')) return '24';
    return '24';
  };

  const toLocalInputValue = (value: unknown) => {
    const text = asText(value);
    if (!text) {
      const now = new Date();
      const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
      return local.toISOString().slice(0, 16);
    }
    const parsed = new Date(text);
    if (Number.isNaN(parsed.getTime())) return '';
    const local = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  };

  const openSchedule = (row: JsonRow) => {
    const display = (row.display as JsonRow | undefined) || {};
    const requestInfo = (row.request as JsonRow | undefined) || {};
    setScheduleTarget(row);
    setScheduleTitle(asText(display.title) || asText(display.item_name) || 'MAR Task');
    setScheduleDescription(asText(display.comment) || asText(display.description));
    setScheduleStart(toLocalInputValue((row.task as JsonRow | undefined)?.start || requestInfo.start_date));
    setScheduleDuration('60');
    setScheduleOccurrences(asText(requestInfo.number_of_doses) || '1');
    setScheduleIntervalHours(inferIntervalHours(row));
  };

  const closeSchedule = () => {
    setScheduleTarget(null);
    setScheduleTitle('');
    setScheduleDescription('');
    setScheduleStart('');
    setScheduleDuration('60');
    setScheduleOccurrences('1');
    setScheduleIntervalHours('24');
  };

  const saveTaskAction = async (transition: 'start' | 'complete' | 'pause' | 'stop') => {
    if (!selectedTask) return;
    const task = (selectedTask.task as JsonRow | undefined) || {};
    const taskId = asText(task.id);
    const type = asText(selectedTask.type);
    if (!taskId || !type) return;
    const controllerMap: Record<string, string> = {
      prescription: 'patient-visit-prescription-tasks',
      prn: 'patient-visit-prn-tasks',
      infusion: 'patient-visit-infusion-tasks',
      transfusion: 'patient-visit-transfusion-tasks',
      sample_collection: 'patient-visit-sample-collection-tasks',
    };
    const controller = controllerMap[type];
    if (!controller) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post(`/legacy/${controller}/update-task/${encodeURIComponent(taskId)}/`, {
        transition,
        additional_info: actionNote || undefined,
        report_reaction: actionNote || undefined,
        volume: actionVolume || undefined,
        rate: actionRate || undefined,
        waste: actionWaste || undefined,
      });
      setSuccess('MAR task updated.');
      setSelectedTask(null);
      await loadWorkspace(filter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update MAR task.');
    } finally {
      setSaving(false);
    }
  };

  const saveSchedule = async () => {
    if (!scheduleTarget) return;
    const type = asText(scheduleTarget.type);
    const requestInfo = (scheduleTarget.request as JsonRow | undefined) || {};
    const requestId = asText(requestInfo.id);
    const controllerMap: Record<string, string> = {
      prescription: 'patient-visit-prescription-tasks',
      infusion: 'patient-visit-infusion-tasks',
      transfusion: 'patient-visit-transfusion-tasks',
    };
    const controller = controllerMap[type];
    if (!controller || !requestId || !visitId) return;
    const startDate = scheduleStart ? new Date(scheduleStart) : new Date();
    if (Number.isNaN(startDate.getTime())) {
      setError('Enter a valid schedule start date and time.');
      return;
    }
    const duration = Math.max(Number.parseInt(scheduleDuration, 10) || 60, 1);
    const occurrences = Math.max(Number.parseInt(scheduleOccurrences, 10) || 1, 1);
    const intervalHours = Math.max(Number.parseInt(scheduleIntervalHours, 10) || 24, 1);
    const frequencyId = asText((requestInfo.frequency as JsonRow | undefined)?.id);
    const events = Array.from({ length: occurrences }, (_, index) => {
      const start = new Date(startDate.getTime() + index * intervalHours * 60 * 60 * 1000);
      const end = new Date(start.getTime() + duration * 60 * 1000);
      return {
        title: scheduleTitle || asText((scheduleTarget.display as JsonRow | undefined)?.title) || 'MAR Task',
        task_desc: scheduleDescription || undefined,
        task_duration_in_minutes: duration,
        start: start.toISOString(),
        end: end.toISOString(),
        drug_administration_frequency_id: frequencyId || undefined,
      };
    });
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post(`/legacy/${controller}/add/${encodeURIComponent(visitId)}/${encodeURIComponent(requestId)}/`, {
        events,
      });
      setSuccess(`${events.length === 1 ? 'Task' : 'Tasks'} scheduled.`);
      closeSchedule();
      await loadWorkspace(filter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to schedule MAR tasks.');
    } finally {
      setSaving(false);
    }
  };

  const stateTone = (stateName: string): string => {
    const normalized = stateName.toLowerCase();
    if (normalized.includes('completed')) return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    if (normalized.includes('paused')) return 'border-amber-200 bg-amber-50 text-amber-700';
    if (normalized.includes('stopped')) return 'border-rose-200 bg-rose-50 text-rose-700';
    if (normalized.includes('overdue')) return 'border-rose-200 bg-rose-50 text-rose-700';
    if (normalized.includes('scheduled')) return 'border-sky-200 bg-sky-50 text-sky-700';
    return 'border-slate-200 bg-slate-50 text-slate-700';
  };

  const streamTone = (entry: { anchor: string; row: JsonRow }) => {
    const stateName = asText(entry.row.state_name).toLowerCase();
    if (stateName.includes('completed')) {
      return {
        card: 'border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100/70',
        accent: 'bg-emerald-500',
        meta: 'text-emerald-700',
      };
    }
    if (stateName.includes('paused')) {
      return {
        card: 'border-amber-200 bg-amber-50/85 hover:bg-amber-100/75',
        accent: 'bg-amber-500',
        meta: 'text-amber-700',
      };
    }
    if (stateName.includes('stopped') || stateName.includes('overdue')) {
      return {
        card: 'border-rose-200 bg-rose-50/85 hover:bg-rose-100/75',
        accent: 'bg-rose-500',
        meta: 'text-rose-700',
      };
    }
    const anchorText = asText(entry.anchor);
    const anchorDate = anchorText ? new Date(anchorText) : null;
    if (anchorDate && !Number.isNaN(anchorDate.getTime())) {
      const diffMs = anchorDate.getTime() - Date.now();
      const diffHours = diffMs / (1000 * 60 * 60);
      if (diffHours < 0) {
        return {
          card: 'border-rose-200 bg-rose-50/85 hover:bg-rose-100/75',
          accent: 'bg-rose-500',
          meta: 'text-rose-700',
        };
      }
      if (diffHours <= 2) {
        return {
          card: 'border-orange-200 bg-orange-50/85 hover:bg-orange-100/75',
          accent: 'bg-orange-500',
          meta: 'text-orange-700',
        };
      }
      if (diffHours <= 8) {
        return {
          card: 'border-amber-200 bg-amber-50/85 hover:bg-amber-100/75',
          accent: 'bg-amber-500',
          meta: 'text-amber-700',
        };
      }
    }
    return {
      card: 'border-sky-200 bg-sky-50/80 hover:bg-sky-100/70',
      accent: 'bg-sky-500',
      meta: 'text-sky-700',
    };
  };

  if (loading) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading MAR...</div>;
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Medication Administration Record</h3>
            <p className="text-xs text-slate-500">Filter and action scheduled administration tasks for this admitted visit.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                  filter === option.id
                    ? option.tone === 'emerald'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                      : option.tone === 'amber'
                        ? 'border-amber-300 bg-amber-50 text-amber-700'
                        : option.tone === 'rose'
                          ? 'border-rose-300 bg-rose-50 text-rose-700'
                          : option.tone === 'cyan'
                            ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
                            : 'border-slate-300 bg-slate-100 text-slate-800'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Total Tasks</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{asNumber(summary.total)}</p>
          </div>
          {sectionOrder.slice(0, 3).map((section) => (
            <div key={section.key} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{section.label}</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{asNumber(summary[section.key])}</p>
            </div>
          ))}
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-700">Needs Scheduling</p>
            <p className="mt-1 text-xl font-semibold text-amber-900">{unscheduledEntries.length}</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-3 md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-sky-700">Next Timeline</p>
            {nextScheduledEntry ? (
              <Fragment>
                <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                  {asText(nextScheduledEntry.display.title) || asText(nextScheduledEntry.row.title) || 'Scheduled task'}
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  {asText(nextScheduledEntry.row.section)} •{' '}
                  {nextScheduledEntry.anchor ? formatDateTime(nextScheduledEntry.anchor) : 'No start time'}
                </p>
              </Fragment>
            ) : (
              <p className="mt-1 text-sm font-semibold text-slate-700">No scheduled tasks</p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
              <h4 className="text-sm font-semibold text-slate-900">Scheduled Stream</h4>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600">
                {scheduledEntries.length}
              </span>
            </div>
            <div className="max-h-[30rem] overflow-auto p-3">
              {scheduledEntries.length ? (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {scheduledEntries.map((entry) => {
                    const tone = streamTone(entry);
                    return (
                      <button
                        key={asText(entry.row.id)}
                        type="button"
                        onClick={() => {
                          if (entry.matched) openTask(entry.matched);
                        }}
                        className={`relative overflow-hidden rounded-2xl border px-3 py-3 text-left transition-colors ${tone.card}`}
                      >
                        <span className={`absolute inset-y-0 left-0 w-1.5 ${tone.accent}`} />
                        <div className="pl-2">
                          <div className="flex items-start justify-between gap-2">
                            <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                              {asText(entry.display.title) || asText(entry.row.title) || asText(entry.row.section) || 'Task'}
                            </p>
                            <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${stateTone(asText(entry.row.state_name))}`}>
                              {asText(entry.row.state_name) || 'Pending'}
                            </span>
                          </div>
                          <p className={`mt-2 text-[11px] font-semibold ${tone.meta}`}>
                            {asText(entry.row.section)}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-600">
                            {entry.anchor ? formatDateTime(entry.anchor) : 'No start time'}
                          </p>
                          {asText(entry.row.end) ? (
                            <p className="text-[11px] text-slate-500">
                              Ends {formatDateTime(entry.row.end)}
                            </p>
                          ) : null}
                          {asText(entry.display.item_name) || asText(entry.display.description) ? (
                            <p className="mt-2 line-clamp-2 text-xs text-slate-700">
                              {asText(entry.display.item_name) || asText(entry.display.description)}
                            </p>
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                  No scheduled MAR tasks match the selected filter.
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {sectionOrder.map((section) => {
          const rows = asRows(sections[section.key]);
          return (
            <div key={section.key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
                <h4 className="text-sm font-semibold text-slate-900">{section.label}</h4>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600">
                  {rows.length}
                </span>
              </div>
              <div className="max-h-[24rem] overflow-auto">
                {rows.length ? (
                  <table className="min-w-full text-xs">
                    <thead className="bg-white text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Schedule</th>
                        <th className="px-3 py-2 text-left font-semibold">Task</th>
                        <th className="px-3 py-2 text-left font-semibold">Status</th>
                        <th className="px-3 py-2 text-left font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => {
                        const task = (row.task as JsonRow | undefined) || {};
                        const display = (row.display as JsonRow | undefined) || {};
                        const taskType = asText(row.type);
                        const stateName = asText(display.state_name);
                        const canAction = ['prescription', 'prn', 'infusion', 'transfusion', 'sample_collection'].includes(taskType) && Boolean(asText(task.id));
                        const canSchedule = ['prescription', 'infusion', 'transfusion'].includes(taskType) && !Boolean(asText(task.id));
                        return (
                          <tr key={asText(row.id)} className="border-t border-slate-100 align-top">
                            <td className="px-3 py-2 text-slate-700">
                              <p>{formatDateTime(task.start)}</p>
                              <p className="text-[11px] text-slate-500">{asText(task.end) ? formatDateTime(task.end) : ''}</p>
                            </td>
                            <td className="px-3 py-2 text-slate-700">
                              <button type="button" onClick={() => openTask(row)} className="text-left">
                                <p className="font-semibold text-slate-900">{asText(display.title) || 'Task'}</p>
                                <p>{asText(display.item_name) || asText(display.description) || 'No additional description'}</p>
                                <p className="text-[11px] text-slate-500">
                                  {asText(display.administer_dose) || asText((display.frequency as JsonRow | undefined)?.name) || ''}
                                </p>
                              </button>
                            </td>
                            <td className="px-3 py-2">
                              <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${stateTone(stateName)}`}>
                                {stateName || 'Pending'}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              {canAction ? (
                                <button
                                  type="button"
                                  onClick={() => openTask(row)}
                                  className="rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] font-semibold text-sky-700"
                                >
                                  Manage
                                </button>
                              ) : canSchedule ? (
                                <button
                                  type="button"
                                  onClick={() => openSchedule(row)}
                                  className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700"
                                >
                                  Schedule
                                </button>
                              ) : (
                                <span className="text-[11px] text-slate-400">Read only</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-slate-500">No tasks in this section.</div>
                )}
              </div>
            </div>
          );
            })}
          </div>
        </div>
      </section>

      {scheduleTarget ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/45 p-4">
          <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.3)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Schedule MAR Tasks</h3>
                <p className="text-xs text-slate-500">
                  Create one or more administration tasks for {asText(((scheduleTarget.display as JsonRow | undefined) || {}).title) || 'this request'}.
                </p>
              </div>
              <button
                type="button"
                onClick={closeSchedule}
                className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="block text-xs text-slate-700 md:col-span-2">
                Task Title
                <input
                  value={scheduleTitle}
                  onChange={(event) => setScheduleTitle(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-xs text-slate-700 md:col-span-2">
                Notes
                <textarea
                  value={scheduleDescription}
                  onChange={(event) => setScheduleDescription(event.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-xs text-slate-700">
                First Start
                <input
                  type="datetime-local"
                  value={scheduleStart}
                  onChange={(event) => setScheduleStart(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-xs text-slate-700">
                Duration (mins)
                <input
                  type="number"
                  min="1"
                  value={scheduleDuration}
                  onChange={(event) => setScheduleDuration(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-xs text-slate-700">
                Occurrences
                <input
                  type="number"
                  min="1"
                  value={scheduleOccurrences}
                  onChange={(event) => setScheduleOccurrences(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-xs text-slate-700">
                Interval (hours)
                <input
                  type="number"
                  min="1"
                  value={scheduleIntervalHours}
                  onChange={(event) => setScheduleIntervalHours(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={closeSchedule}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSchedule}
                disabled={saving}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Create Tasks'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {selectedTask ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/45 p-4">
          <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.3)]">
            {(() => {
              const task = (selectedTask.task as JsonRow | undefined) || {};
              const display = (selectedTask.display as JsonRow | undefined) || {};
              const requestInfo = (selectedTask.request as JsonRow | undefined) || {};
              const taskType = asText(selectedTask.type);
              const stateName = asText(display.state_name);
              const canAction = ['prescription', 'prn', 'infusion', 'transfusion', 'sample_collection'].includes(taskType) && Boolean(asText(task.id));
              const canSchedule = ['prescription', 'infusion', 'transfusion'].includes(taskType) && !Boolean(asText(task.id));
              const started = asText(task.is_started) === '1';
              const completed = asText(task.is_completed) === '1' || stateName.toLowerCase().includes('completed');
              return (
                <Fragment>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{asText(display.title) || 'MAR Task'}</h3>
                      <p className="text-xs text-slate-500">
                        {asText(selectedTask.section)} • {stateName || 'Pending'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTask(null)}
                      className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                    >
                      Close
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
                      <p><span className="font-semibold text-slate-900">Item:</span> {asText(display.item_name) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Dose / Flow:</span> {asText(display.administer_dose) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Frequency:</span> {asText(((display.frequency as JsonRow | undefined) || {}).name) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Form / Route:</span> {asText(((display.dosage_form as JsonRow | undefined) || {}).name) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Request Status:</span> {asText(display.status_name) || asText(((requestInfo.status as JsonRow | undefined) || {}).name) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Medication Type:</span> {asText(display.medication_type_name) || asText(((requestInfo.medication_type as JsonRow | undefined) || {}).type_name) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Scheduled:</span> {formatDateTime(task.start)}</p>
                      <p><span className="font-semibold text-slate-900">Ends:</span> {asText(task.end) ? formatDateTime(task.end) : 'N/A'}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
                      <p><span className="font-semibold text-slate-900">Assigned User:</span> {asText(display.user_name) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Task #:</span> {asText(task.task_number) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Started At:</span> {asText(task.started_at) ? formatDateTime(task.started_at) : 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Ended At:</span> {asText(task.ended_at) ? formatDateTime(task.ended_at) : 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Comment:</span> {asText(display.comment) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Instruction:</span> {asText(display.instruction_name) || asText(((requestInfo.instruction as JsonRow | undefined) || {}).name) || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
                    <div className="grid gap-2 md:grid-cols-3">
                      <p><span className="font-semibold text-slate-900">Request:</span> {asText(requestInfo.type_name) || asText(selectedTask.section) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Start Date:</span> {asText(requestInfo.start_date) ? formatDateTime(requestInfo.start_date) : 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">End Date:</span> {asText(requestInfo.end_date) ? formatDateTime(requestInfo.end_date) : 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Days:</span> {asText(requestInfo.number_of_days) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Doses:</span> {asText(requestInfo.number_of_doses) || 'N/A'}</p>
                      <p><span className="font-semibold text-slate-900">Quantity:</span> {asText(requestInfo.quantity_issued) || asText(requestInfo.quantity) || 'N/A'}</p>
                    </div>
                    {asText(requestInfo.instruction_info) ? (
                      <p className="mt-2"><span className="font-semibold text-slate-900">Instruction Info:</span> {asText(requestInfo.instruction_info)}</p>
                    ) : null}
                  </div>
                  {taskType === 'infusion' || taskType === 'transfusion' ? (
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <label className="block text-xs text-slate-700">
                        Volume
                        <input value={actionVolume} onChange={(event) => setActionVolume(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                      </label>
                      <label className="block text-xs text-slate-700">
                        Rate
                        <input value={actionRate} onChange={(event) => setActionRate(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                      </label>
                      <label className="block text-xs text-slate-700">
                        Waste
                        <input value={actionWaste} onChange={(event) => setActionWaste(event.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                      </label>
                    </div>
                  ) : null}
                  <label className="mt-4 block text-xs text-slate-700">
                    Notes / Reaction
                    <textarea value={actionNote} onChange={(event) => setActionNote(event.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                  </label>
                  <div className="mt-4 flex flex-wrap justify-end gap-2">
                    {canSchedule ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTask(null);
                          openSchedule(selectedTask);
                        }}
                        className="rounded border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"
                      >
                        Schedule Tasks
                      </button>
                    ) : null}
                    {canAction && !completed ? (
                      <button
                        type="button"
                        onClick={() => saveTaskAction(started ? 'complete' : 'start')}
                        disabled={saving}
                        className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        {saving ? 'Saving...' : started ? 'Complete' : 'Start'}
                      </button>
                    ) : null}
                    {canAction && !completed ? (
                      <button
                        type="button"
                        onClick={() => saveTaskAction('pause')}
                        disabled={saving}
                        className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 disabled:opacity-50"
                      >
                        Pause
                      </button>
                    ) : null}
                    {canAction && !completed ? (
                      <button
                        type="button"
                        onClick={() => saveTaskAction('stop')}
                        disabled={saving}
                        className="rounded border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 disabled:opacity-50"
                      >
                        Stop
                      </button>
                    ) : null}
                  </div>
                </Fragment>
              );
            })()}
          </section>
        </div>
      ) : null}
    </div>
  );
}

const outcomeModalConfig = (outcomeId: string) => {
  if (outcomeId === '1') {
    return {
      title: 'Discharge Summary',
      description: 'Complete discharge details to conclude this visit.',
      notesLabel: 'Discharge Summary Notes',
      submitLabel: 'Save Discharge',
      showAdmissionEnd: true,
    };
  }
  if (outcomeId === '2') {
    return {
      title: 'Referral',
      description: 'Capture referral details before concluding this visit.',
      notesLabel: 'Referral Notes',
      submitLabel: 'Save Referral',
      showAdmissionEnd: false,
    };
  }
  if (outcomeId === '3') {
    return {
      title: 'Passed Away',
      description: 'Record details for this outcome and close the visit.',
      notesLabel: 'Outcome Notes',
      submitLabel: 'Save Outcome',
      showAdmissionEnd: false,
    };
  }
  if (outcomeId === '4') {
    return {
      title: 'Discharge Advice',
      description: 'Add discharge advice for the patient before closing.',
      notesLabel: 'Advice Notes',
      submitLabel: 'Save Advice',
      showAdmissionEnd: false,
    };
  }
  if (outcomeId === '5') {
    return {
      title: 'Absconded',
      description: 'Record absconding details to conclude this visit.',
      notesLabel: 'Absconded Notes',
      submitLabel: 'Save Outcome',
      showAdmissionEnd: false,
    };
  }
  if (outcomeId === '7') {
    return {
      title: 'Cancelled',
      description: 'Provide cancellation details and conclude the visit.',
      notesLabel: 'Cancellation Notes',
      submitLabel: 'Save Cancellation',
      showAdmissionEnd: false,
    };
  }
  return {
    title: 'Visit Outcome',
    description: 'Provide details for the selected visit outcome.',
    notesLabel: 'Notes',
    submitLabel: 'Save Outcome',
    showAdmissionEnd: false,
  };
};

export default function PatientsVisitSpace() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const patientId = asText(searchParams.get('patient_id') || searchParams.get('id'));
  const visitId = asText(searchParams.get('visit_id'));

  const [data, setData] = useState<VisitSpaceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCreateVisitModal, setShowCreateVisitModal] = useState(false);
  const [createVisitLoading, setCreateVisitLoading] = useState(false);
  const [createVisitSaving, setCreateVisitSaving] = useState(false);
  const [createVisitBootstrap, setCreateVisitBootstrap] = useState<VisitCreateBootstrapResponse>({});
  const [createVisitPolicies, setCreateVisitPolicies] = useState<JsonRow[]>([]);
  const [createVisitPendingTasks, setCreateVisitPendingTasks] = useState<
    Array<{
      id: string;
      task_type?: string | null;
      title?: string | null;
      due_at?: string | null;
      status_id?: string | null;
    }>
  >([]);
  const [createVisitSelectedTaskIds, setCreateVisitSelectedTaskIds] = useState<string[]>([]);
  const [createVisitConsultationsBySpecialty, setCreateVisitConsultationsBySpecialty] = useState<Record<string, JsonRow[]>>({});
  const [createVisitLines, setCreateVisitLines] = useState<CreateVisitLine[]>([
    {
      row_id: makeId(),
      specialty_id: '',
      patient_visit_purpose_id: '',
      consultation_id: '',
      assigned_user_id: '',
      description: '',
    },
  ]);
  const [createVisitForm, setCreateVisitForm] = useState({
    patient_insurance_profile_policy_id: '',
    claim_code: '',
  });
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  const [vitalsRows, setVitalsRows] = useState<JsonRow[]>([]);
  const [diagnosisRows, setDiagnosisRows] = useState<JsonRow[]>([]);
  const [followupRows, setFollowupRows] = useState<JsonRow[]>([]);
  const [requestLabRows, setRequestLabRows] = useState<JsonRow[]>([]);
  const [requestScanRows, setRequestScanRows] = useState<JsonRow[]>([]);
  const [medicationSummary, setMedicationSummary] = useState<Record<string, unknown>>({});
  const [medicationRows, setMedicationRows] = useState<JsonRow[]>([]);
  const [prescriptionRows, setPrescriptionRows] = useState<JsonRow[]>([]);
  const [admissionRows, setAdmissionRows] = useState<AdmissionRow[]>([]);
  const [savingVitals, setSavingVitals] = useState(false);
  const [savingFollowup, setSavingFollowup] = useState(false);
  const [savingDiagnosis, setSavingDiagnosis] = useState(false);
  const [diagnosisSearch, setDiagnosisSearch] = useState('');
  const [diagnosisSearchDebounced, setDiagnosisSearchDebounced] = useState('');
  const [diagnosisOptions, setDiagnosisOptions] = useState<DiagnosisOption[]>([]);
  const [diagnosisTypeFocus, setDiagnosisTypeFocus] = useState<'primary' | 'provisional' | 'differential' | 'other'>('primary');
  const [diagnosisForm, setDiagnosisForm] = useState({
    diagnosis_text: '',
    primary_diagnosis_ids: [] as string[],
    provisional_diagnosis_ids: [] as string[],
    differential_diagnosis_ids: [] as string[],
    other_diagnosis_ids: [] as string[],
    ill_episode: 'chronic',
  });
  const [vitalForm, setVitalForm] = useState({
    temperature: '',
    pulse: '',
    respiratory_rate: '',
    oxygen_saturation: '',
    blood_pressure_1: '',
    blood_pressure_2: '',
    weight: '',
    height: '',
    fasting_blood_sugar: '',
    random_blood_sugar: '',
    avpu_score: '',
    mobility: '',
    trauma: '',
    back_date: '',
  });
  const [followupForm, setFollowupForm] = useState({
    date_of_visit: '',
    description: '',
    comment: '',
    specialty_id: '',
    user_id: '',
  });
  const [followupSpecialties, setFollowupSpecialties] = useState<JsonRow[]>([]);
  const [followupDoctors, setFollowupDoctors] = useState<JsonRow[]>([]);
  const [assignToMe, setAssignToMe] = useState(false);
  const [activeFollowupTab, setActiveFollowupTab] = useState<'add' | 'view'>('add');
  const [recurringModalOpen, setRecurringModalOpen] = useState(false);
  const [recurringSaving, setRecurringSaving] = useState(false);
  const [recurringForm, setRecurringForm] = useState({
    type: 'daily',
    interval: '1',
    untilType: 'date',
    recur_end: '',
    occurrences: '',
  });
  const [currentUserId, setCurrentUserId] = useState('');
  const [editingFollowupId, setEditingFollowupId] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState({
    description: '',
    comment: '',
    date_of_visit: '',
  });
  const [reschedulingFollowupId, setReschedulingFollowupId] = useState<string | null>(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date_of_visit: '',
    comment: '',
  });
  const [showPatientBillModal, setShowPatientBillModal] = useState(false);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [wardTypes, setWardTypes] = useState<WardTypeRow[]>([]);
  const [wards, setWards] = useState<WardRow[]>([]);
  const [beds, setBeds] = useState<BedRow[]>([]);
  const [admitLoading, setAdmitLoading] = useState(false);
  const [admitSubmitting, setAdmitSubmitting] = useState(false);
  const [changeBedSubmitting, setChangeBedSubmitting] = useState(false);
  const [endingAdmission, setEndingAdmission] = useState(false);
  const [showChangeBedModal, setShowChangeBedModal] = useState(false);
  const [showEndAdmissionModal, setShowEndAdmissionModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionRow | null>(null);
  const [endAdmissionConfirmation, setEndAdmissionConfirmation] = useState('');
  const [admitForm, setAdmitForm] = useState({
    ward_type_id: '',
    ward_id: '',
    bed_id: '',
    admission_start: '',
    short_stay: false,
  });
  const [changeBedForm, setChangeBedForm] = useState({
    ward_type_id: '',
    ward_id: '',
    new_bed_id: '',
    short_stay: false,
  });
  const [visitOutcomes, setVisitOutcomes] = useState<VisitOutcomeRow[]>([]);
  const [showConcludePicker, setShowConcludePicker] = useState(false);
  const [showConcludeModal, setShowConcludeModal] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<VisitOutcomeRow | null>(null);
  const [concludeNotes, setConcludeNotes] = useState('');
  const [concludeAdmissionEnd, setConcludeAdmissionEnd] = useState('');
  const [concludingVisit, setConcludingVisit] = useState(false);
  const computedBmi = useMemo(() => {
    const weight = Number(vitalForm.weight);
    const heightCm = Number(vitalForm.height);
    if (!Number.isFinite(weight) || !Number.isFinite(heightCm) || weight <= 0 || heightCm <= 0) return '';
    const bmi = weight / ((heightCm * heightCm) * 0.0001);
    return bmi > 0 ? bmi.toFixed(2) : '';
  }, [vitalForm.weight, vitalForm.height]);

  const loadWorkspace = async (patientIdValue: string, visitIdValue: string) => {
    const params = new URLSearchParams();
    params.set('patient_id', patientIdValue);
    if (visitIdValue) params.set('visit_id', visitIdValue);
    const response = await api.get<VisitSpaceResponse>(`/legacy/patients/visit-space/?${params.toString()}`);
    setData(response);
  };

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
        const response = await api.get<VisitSpaceResponse>(`/legacy/patients/visit-space/?${params.toString()}`);
        if (!mounted) return;
        setData(response);
      } catch (err) {
        if (!mounted) return;
        setData(null);
        setError(err instanceof Error ? err.message : 'Unable to load visit space.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run().catch(() => {
      if (!mounted) return;
      setLoading(false);
      setError('Unable to load visit space.');
    });
    return () => {
      mounted = false;
    };
  }, [patientId, visitId]);

  const counts = data?.module_counts || {};
  const visits = data?.visits || [];
  const notes = data?.doctor_notes || [];
  const selectedVisitId = asText(data?.selected_visit?.id);
  const visitLocked = Boolean(selectedVisitId && asText(data?.selected_visit?.visit_outcome_id));
  const canCreateVisitFromHeader = !selectedVisitId || visitLocked;
  const billing = data?.billing_summary || {};
  const hasAdmission = asNumber(counts.admissions) > 0 || asText(data?.selected_visit?.admitted) === '1';
  const latestVital = useMemo(() => {
    const sorted = [...vitalsRows].sort((a, b) => {
      const ta = new Date(asText(a.back_date || a.date_created)).getTime();
      const tb = new Date(asText(b.back_date || b.date_created)).getTime();
      return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
    });
    return (sorted[0] as JsonRow | undefined) || null;
  }, [vitalsRows]);
  const sortedVitalsRows = useMemo(() => {
    return [...vitalsRows].sort((a, b) => {
      const ta = new Date(asText(a.back_date || a.date_created)).getTime();
      const tb = new Date(asText(b.back_date || b.date_created)).getTime();
      return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
    });
  }, [vitalsRows]);
  const triage = useMemo(() => triageFromVitals(latestVital), [latestVital]);

  useEffect(() => {
    let mounted = true;
    const loadTabData = async () => {
      if (!selectedVisitId) {
        setVitalsRows([]);
        setDiagnosisRows([]);
        setFollowupRows([]);
        setRequestLabRows([]);
        setRequestScanRows([]);
        setMedicationSummary({});
        setMedicationRows([]);
        setPrescriptionRows([]);
        setAdmissionRows([]);
        return;
      }
      setTabLoading(true);
      try {
        const [
          vitalsResp,
          diagnosisResp,
          followupResp,
          labsResp,
          scansResp,
          medsResp,
          admissionsResp,
        ] = await Promise.all([
          api.get<JsonRow[]>(`/legacy/patients/get-patient-visit-vitals/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`),
          api.get<JsonRow[]>(`/legacy/patients/get-patient-visit-diagnosis/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`),
          api.get<JsonRow[]>(`/legacy/patients/get-patient-followups/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`),
          api.get<JsonRow[]>(`/legacy/patients/get-request-labs/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`),
          api.get<JsonRow[]>(`/legacy/patients/get-radiology-requests/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`),
          api.get<Record<string, unknown>>(`/legacy/request-medications/view-request/?patient_visit_id=${encodeURIComponent(selectedVisitId)}`),
          api.get<{ data?: AdmissionRow[] } | AdmissionRow[]>(`/legacy/patient-visits/get-visit-admissions/?patient_visit_id=${encodeURIComponent(selectedVisitId)}`),
        ]);
        if (!mounted) return;
        setVitalsRows(Array.isArray(vitalsResp) ? vitalsResp : []);
        setDiagnosisRows(Array.isArray(diagnosisResp) ? diagnosisResp : []);
        setFollowupRows(Array.isArray(followupResp) ? followupResp : []);
        setRequestLabRows(Array.isArray(labsResp) ? labsResp : []);
        setRequestScanRows(Array.isArray(scansResp) ? scansResp : []);
        setMedicationSummary((medsResp?.summary as Record<string, unknown>) || {});
        setMedicationRows(Array.isArray(medsResp?.request_medications) ? (medsResp.request_medications as JsonRow[]) : []);
        setPrescriptionRows(Array.isArray(medsResp?.request_prescriptions) ? (medsResp.request_prescriptions as JsonRow[]) : []);
        const admissionItems = Array.isArray(admissionsResp)
          ? admissionsResp
          : Array.isArray(admissionsResp?.data)
            ? admissionsResp.data
            : [];
        setAdmissionRows(admissionItems);
      } catch (_err) {
        if (!mounted) return;
      } finally {
        if (mounted) setTabLoading(false);
      }
    };
    loadTabData().catch(() => {
      if (!mounted) return;
      setTabLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [selectedVisitId]);

  useEffect(() => {
    const payload = parseJwtPayload(getAccessToken());
    if (payload && payload.user_id) {
      setCurrentUserId(String(payload.user_id));
    }
    const loadOptions = async () => {
      try {
        const [specialties, users] = await Promise.all([
          api.get<JsonRow[]>('/legacy/patients/get-specialties/?limit=400'),
          api.get<JsonRow[]>('/legacy/patients/get-users/?limit=400'),
        ]);
        setFollowupSpecialties(Array.isArray(specialties) ? specialties : []);
        const doctorRows = Array.isArray(users) ? users.filter((user) => asText(user.role_id) === '1') : [];
        setFollowupDoctors(doctorRows);
      } catch (err) {
        //
      }
    };
    loadOptions().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (assignToMe && currentUserId) {
      setFollowupForm((prev) => ({ ...prev, user_id: currentUserId }));
    }
  }, [assignToMe, currentUserId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDiagnosisSearchDebounced(diagnosisSearch.trim()), 280);
    return () => window.clearTimeout(timer);
  }, [diagnosisSearch]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const params = new URLSearchParams();
        if (diagnosisSearchDebounced) params.set('q', diagnosisSearchDebounced);
        params.set('limit', diagnosisSearchDebounced ? '40' : '20');
        const rows = await api.get<DiagnosisOption[]>(`/legacy/patients/get-standard-diagnosis/?${params.toString()}`);
        if (cancelled) return;
        setDiagnosisOptions(Array.isArray(rows) ? rows : []);
      } catch (_err) {
        if (cancelled) return;
        setDiagnosisOptions([]);
      }
    };
    run().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [diagnosisSearchDebounced]);

  const createVisitSpecialties = useMemo(
    () => (Array.isArray(createVisitBootstrap.specialties) ? createVisitBootstrap.specialties : []),
    [createVisitBootstrap.specialties],
  );
  const createVisitPurposes = useMemo(
    () => (Array.isArray(createVisitBootstrap.purposes) ? createVisitBootstrap.purposes : []),
    [createVisitBootstrap.purposes],
  );
  const createVisitProviders = useMemo(
    () => (Array.isArray(createVisitBootstrap.providers) ? createVisitBootstrap.providers : []),
    [createVisitBootstrap.providers],
  );
  const createVisitProviderNameById = useMemo(() => {
    const map = new Map<string, string>();
    createVisitProviders.forEach((row) => {
      const id = asText((row as JsonRow).id);
      if (!id) return;
      const profile = (row as JsonRow).insurance_profile as JsonRow | undefined;
      const profileName = asText(profile?.name);
      const policyName = asText((row as JsonRow).name);
      map.set(id, profileName && policyName ? `${profileName} - ${policyName}` : profileName || policyName || id);
    });
    return map;
  }, [createVisitProviders]);
  const availablePurposesForSpecialty = (specialtyId: string) => {
    if (!createVisitPurposes.length) return [];
    const consultationRows = createVisitConsultationsBySpecialty[specialtyId] || [];
    const purposeIds = new Set(consultationRows.map((row) => asText(row.patient_visit_purpose_id)).filter(Boolean));
    if (!purposeIds.size) return createVisitPurposes;
    return createVisitPurposes.filter((row) => purposeIds.has(asText(row.id)));
  };
  const availableServicesForLine = (line: CreateVisitLine) => {
    const rows = createVisitConsultationsBySpecialty[line.specialty_id] || [];
    if (!line.patient_visit_purpose_id) return rows;
    return rows.filter((row) => {
      const purposeId = asText(row.patient_visit_purpose_id);
      return !purposeId || purposeId === line.patient_visit_purpose_id;
    });
  };

  useEffect(() => {
    if (!showCreateVisitModal || !patientId) return;
    let cancelled = false;
    const loadCreateVisitData = async () => {
      setCreateVisitLoading(true);
      try {
        const [bootstrapResponse, policyResponse] = await Promise.all([
          api.get<VisitCreateBootstrapResponse>(`/legacy/book/manage-appointments/?patient_id=${encodeURIComponent(patientId)}`),
          api.get<JsonRow[]>(`/legacy/patients/get-patient-insurance/?patient_id=${encodeURIComponent(patientId)}`),
        ]);
        if (cancelled) return;
        const bootstrap = bootstrapResponse || {};
        const policies = Array.isArray(policyResponse) ? policyResponse : [];
        const pendingTasks = Array.isArray(bootstrap.pending_planner_tasks) ? bootstrap.pending_planner_tasks : [];
        setCreateVisitBootstrap(bootstrap);
        setCreateVisitPolicies(policies);
        setCreateVisitPendingTasks(pendingTasks);
        setCreateVisitSelectedTaskIds([]);
        const defaultSpecialty = asText(bootstrap?.specialties?.[0]?.id);
        const defaultPolicy = asText(policies[0]?.id);
        setCreateVisitConsultationsBySpecialty({});
        setCreateVisitLines((prev) =>
          prev.length
            ? prev.map((line, index) => (index === 0 ? { ...line, specialty_id: line.specialty_id || defaultSpecialty } : line))
            : [
                {
                  row_id: makeId(),
                  specialty_id: defaultSpecialty,
                  patient_visit_purpose_id: '',
                  consultation_id: '',
                  assigned_user_id: '',
                  description: '',
                },
              ],
        );
        setCreateVisitForm((prev) => ({
          ...prev,
          patient_insurance_profile_policy_id: prev.patient_insurance_profile_policy_id || defaultPolicy,
        }));
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Unable to load create-visit options.');
      } finally {
        if (!cancelled) setCreateVisitLoading(false);
      }
    };
    loadCreateVisitData().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [showCreateVisitModal, patientId]);

  useEffect(() => {
    if (!showCreateVisitModal) {
      return;
    }
    const specialtiesToLoad = Array.from(
      new Set(
        createVisitLines.map((line) => asText(line.specialty_id)).filter((value) => value && !createVisitConsultationsBySpecialty[value]),
      ),
    );
    if (!specialtiesToLoad.length) return;
    let cancelled = false;
    const loadMissing = async () => {
      const entries = await Promise.all(
        specialtiesToLoad.map(async (specialtyId) => {
          try {
            const response = await api.get<{ consultations?: JsonRow[] }>(
              `/legacy/book/get-consultations-by-specialty/?specialty_id=${encodeURIComponent(specialtyId)}&limit=400`,
            );
            return [specialtyId, Array.isArray(response?.consultations) ? response.consultations : []] as const;
          } catch {
            return [specialtyId, []] as const;
          }
        }),
      );
      if (cancelled) return;
      setCreateVisitConsultationsBySpecialty((prev) => {
        const next = { ...prev };
        entries.forEach(([specialtyId, rows]) => {
          next[specialtyId] = rows;
        });
        return next;
      });
    };
    loadMissing().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [showCreateVisitModal, createVisitLines, createVisitConsultationsBySpecialty]);

  useEffect(() => {
    if (!showCreateVisitModal) return;
    setCreateVisitLines((prev) => {
      let changed = false;
      const next = prev.map((line) => {
        const purposes = availablePurposesForSpecialty(line.specialty_id);
        const services = availableServicesForLine(line);
        const validPurposeIds = new Set(purposes.map((item) => asText(item.id)));
        const validServiceIds = new Set(services.map((item) => asText(item.id)));
        let nextPurpose = line.patient_visit_purpose_id;
        let nextService = line.consultation_id;
        if (nextPurpose && !validPurposeIds.has(nextPurpose)) nextPurpose = '';
        if (!nextPurpose && purposes.length === 1) nextPurpose = asText(purposes[0]?.id);
        if (nextService && !validServiceIds.has(nextService)) nextService = '';
        if (!nextService && services.length === 1) nextService = asText(services[0]?.id);
        if (nextPurpose !== line.patient_visit_purpose_id || nextService !== line.consultation_id) {
          changed = true;
          return { ...line, patient_visit_purpose_id: nextPurpose, consultation_id: nextService };
        }
        return line;
      });
      return changed ? next : prev;
    });
  }, [showCreateVisitModal, createVisitLines, createVisitConsultationsBySpecialty, createVisitPurposes]);

  const tabs = useMemo<Array<{ key: TabKey; label: string }>>(() => {
    const base: Array<{ key: TabKey; label: string }> = [
      { key: 'vitals', label: 'Vitals' },
      { key: 'clinical_encounter', label: 'Clinical Encounter' },
      { key: 'review_of_systems', label: 'Review Of Systems' },
      { key: 'diagnoses', label: 'Diagnoses' },
      { key: 'treatment_plan', label: 'Treatment Plan' },
      { key: 'request_services', label: 'Request Services' },
      { key: 'follow_up', label: 'Follow Up' },
    ];
    if (hasAdmission) {
      base.push({ key: 'flow_sheet', label: 'FlowSheet' });
      base.push({ key: 'mar', label: 'MAR' });
      base.push({ key: 'admitted', label: 'Admitted' });
    }
    base.push({ key: 'report', label: 'Report' });
    return base;
  }, [hasAdmission]);

  const requestedTab = asText(searchParams.get('tab')) as TabKey;
  const defaultTab: TabKey = tabs[0]?.key || 'vitals';
  const activeTab: TabKey = tabs.some((item) => item.key === requestedTab) ? requestedTab : defaultTab;
  const requestServiceTabs: Array<{ key: RequestServicesTabKey; label: string }> = [
    { key: 'overview', label: 'Overview' },
    { key: 'labs', label: 'Labs' },
    { key: 'imaging', label: 'Imaging' },
    { key: 'immunization', label: 'Immunization' },
    { key: 'medication', label: 'Medication' },
    { key: 'transfusion', label: 'Transfusion' },
    { key: 'surgery', label: 'Surgery/Procedure' },
    { key: 'referral', label: 'Consult To/Referral' },
    { key: 'consumables', label: 'Consumables' },
    { key: 'bundled', label: 'Bundled Service' },
    { key: 'other_services', label: 'Other Services' },
  ];
  const requestedRequestTab = asText(searchParams.get('request_tab')) as RequestServicesTabKey;
  const storedRequestTab = (() => {
    try {
      return asText(window.localStorage.getItem('visitRequestLastTab'));
    } catch {
      return '';
    }
  })();
  const activeRequestServicesTab: RequestServicesTabKey = requestServiceTabs.some((tab) => tab.key === requestedRequestTab)
    ? requestedRequestTab
    : (requestServiceTabs.find((tab) => tab.key === storedRequestTab)?.key ?? 'overview');

  useEffect(() => {
    let cancelled = false;
    const refreshVitalsForTab = async () => {
      if (!selectedVisitId || activeTab !== 'vitals') return;
      try {
        const rows = await api.get<JsonRow[]>(
          `/legacy/patients/get-patient-visit-vitals/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`,
        );
        if (cancelled) return;
        setVitalsRows(Array.isArray(rows) ? rows : []);
      } catch (_err) {
        if (cancelled) return;
      }
    };
    refreshVitalsForTab().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [selectedVisitId, activeTab]);

  const requestServiceOverviewCards = [
    {
      key: 'labs' as RequestServicesTabKey,
      label: 'Labs',
      tone: 'indigo',
      value: requestLabRows.length,
      sublabel: `${requestLabRows.filter((row) => asText(row.status_id) !== '24').length} active`,
    },
    {
      key: 'imaging' as RequestServicesTabKey,
      label: 'Imaging',
      tone: 'violet',
      value: requestScanRows.length,
      sublabel: `${requestScanRows.filter((row) => asText(row.status_id) !== '24').length} active`,
    },
    {
      key: 'medication' as RequestServicesTabKey,
      label: 'Medication Admin',
      tone: 'emerald',
      value: asNumber(medicationSummary.medications_count),
      sublabel: 'Medication tasks',
    },
    {
      key: 'medication' as RequestServicesTabKey,
      label: 'Prescriptions',
      tone: 'sky',
      value: asNumber(medicationSummary.prescriptions_count),
      sublabel: 'Pharmacy requests',
    },
    {
      key: 'medication' as RequestServicesTabKey,
      label: 'Infusions',
      tone: 'amber',
      value: asNumber(medicationSummary.infusions_count),
      sublabel: 'Infusion requests',
    },
    {
      key: 'transfusion' as RequestServicesTabKey,
      label: 'Transfusions',
      tone: 'rose',
      value: asNumber(medicationSummary.transfusions_count),
      sublabel: 'Blood product requests',
    },
  ];
  const requestServiceWorkspaceLinks = [
    { key: 'immunization' as RequestServicesTabKey, label: 'Immunization', note: 'Vaccines and dose schedules' },
    { key: 'surgery' as RequestServicesTabKey, label: 'Surgery / Procedure', note: 'Procedure requests and theatre flow' },
    { key: 'consumables' as RequestServicesTabKey, label: 'Consumables', note: 'Consumables used during care' },
    { key: 'bundled' as RequestServicesTabKey, label: 'Bundled Service', note: 'Compound service packs' },
    { key: 'other_services' as RequestServicesTabKey, label: 'Other Services', note: 'Ward and service-place requests' },
    { key: 'referral' as RequestServicesTabKey, label: 'Consult To / Referral', note: 'Referrals and consult handoffs' },
  ];
  const requestServiceTotal = requestServiceOverviewCards.reduce((sum, card) => sum + card.value, 0);

  const setTab = (tab: TabKey) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    if (patientId) params.set('patient_id', patientId);
    if (selectedVisitId) params.set('visit_id', selectedVisitId);
    setSearchParams(params, { replace: false });
  };
  const setRequestServicesTab = (tab: RequestServicesTabKey) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', 'request_services');
    params.set('request_tab', tab);
    if (patientId) params.set('patient_id', patientId);
    if (selectedVisitId) params.set('visit_id', selectedVisitId);
    try {
      window.localStorage.setItem('visitRequestLastTab', tab);
    } catch {
      // ignore storage errors
    }
    setSearchParams(params, { replace: false });
  };

  const goToVisit = (nextVisitId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('patient_id', patientId);
    params.set('visit_id', nextVisitId);
    if (!params.get('tab')) params.set('tab', defaultTab);
    setSearchParams(params, { replace: false });
  };

  const go = (path: string) => {
    if (!patientId) return;
    const params = new URLSearchParams();
    params.set('patient_id', patientId);
    if (selectedVisitId) params.set('visit_id', selectedVisitId);
    navigate(`${path}?${params.toString()}`);
  };

  const openCreateVisitModal = () => {
    setError(null);
    setSuccess(null);
    setCreateVisitConsultationsBySpecialty({});
    setCreateVisitPendingTasks([]);
    setCreateVisitSelectedTaskIds([]);
    setCreateVisitLines([
      {
        row_id: makeId(),
        specialty_id: '',
        patient_visit_purpose_id: '',
        consultation_id: '',
        assigned_user_id: '',
        description: '',
      },
    ]);
    setCreateVisitForm({
      patient_insurance_profile_policy_id: '',
      claim_code: '',
    });
    setShowCreateVisitModal(true);
  };

  const closeCreateVisitModal = () => {
    if (createVisitSaving) return;
    setShowCreateVisitModal(false);
    setCreateVisitConsultationsBySpecialty({});
    setCreateVisitPendingTasks([]);
    setCreateVisitSelectedTaskIds([]);
  };

  const updateCreateVisitLine = (rowId: string, updates: Partial<CreateVisitLine>) => {
    setCreateVisitLines((prev) => prev.map((line) => (line.row_id === rowId ? { ...line, ...updates } : line)));
  };

  const addCreateVisitLine = () => {
    setCreateVisitLines((prev) => [
      ...prev,
      {
        row_id: makeId(),
        specialty_id: '',
        patient_visit_purpose_id: '',
        consultation_id: '',
        assigned_user_id: '',
        description: '',
      },
    ]);
  };

  const removeCreateVisitLine = (rowId: string) => {
    setCreateVisitLines((prev) => (prev.length > 1 ? prev.filter((line) => line.row_id !== rowId) : prev));
  };

  const submitCreateVisit = async () => {
    if (!patientId) return;
    const normalizedLines = createVisitLines
      .map((line) => {
        const specialtyId = asText(line.specialty_id);
        const consultationId = asText(line.consultation_id);
        const consultationRows = createVisitConsultationsBySpecialty[specialtyId] || [];
        const selectedService = consultationRows.find((row) => asText(row.id) === consultationId);
        const purposeId = asText(line.patient_visit_purpose_id) || asText(selectedService?.patient_visit_purpose_id);
        return {
          specialty_id: specialtyId,
          consultation_id: consultationId,
          service_id: consultationId,
          patient_visit_purpose_id: purposeId || undefined,
          assigned_user_id: asText(line.assigned_user_id) || undefined,
          description: asText(line.description) || undefined,
        };
      })
      .filter((line) => line.specialty_id || line.consultation_id);
    if (!normalizedLines.length) {
      setError('Add at least one specialty/service row.');
      return;
    }
    if (normalizedLines.some((line) => !line.specialty_id || !line.consultation_id)) {
      setError('Each row must have specialty and service selected.');
      return;
    }

    setCreateVisitSaving(true);
    setError(null);
    try {
      const response = await api.post<{ ok?: boolean; patient_id?: string; patient_visit_id?: string; message?: string }>(
        '/legacy/book/create-appointment-visit/',
        {
          patient_id: patientId,
          specialty_id: normalizedLines[0].specialty_id,
          patient_visit_purpose_id: normalizedLines[0].patient_visit_purpose_id,
          service_id: normalizedLines[0].service_id,
          consultation_id: normalizedLines[0].consultation_id,
          assigned_user_id: normalizedLines[0].assigned_user_id,
          description: normalizedLines[0].description,
          visit_lines: normalizedLines,
          planner_task_ids: createVisitSelectedTaskIds,
          patient_insurance_profile_policy_id: asText(createVisitForm.patient_insurance_profile_policy_id) || undefined,
          claim_code: asText(createVisitForm.claim_code) || undefined,
        },
      );
      const nextVisitId = asText(response?.patient_visit_id);
      const nextPatientId = asText(response?.patient_id) || patientId;
      setShowCreateVisitModal(false);
      if (nextVisitId) {
        const params = new URLSearchParams(searchParams);
        params.set('patient_id', nextPatientId);
        params.set('visit_id', nextVisitId);
        if (!params.get('tab')) params.set('tab', defaultTab);
        setSearchParams(params, { replace: false });
      } else {
        await loadWorkspace(patientId, '');
      }
      setSuccess(asText(response?.message) || 'Visit created successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create visit.');
    } finally {
      setCreateVisitSaving(false);
    }
  };

  const loadWardTypes = async () => {
    const response = await api.get<{ results?: WardTypeRow[] } | WardTypeRow[]>(`/ward_types/?status=1&page=1&page_size=200`);
    const items = Array.isArray(response) ? response : Array.isArray(response?.results) ? response.results : [];
    setWardTypes(items);
  };

  const refreshAdmissions = async () => {
    if (!selectedVisitId) {
      setAdmissionRows([]);
      return;
    }
    const response = await api.get<{ data?: AdmissionRow[] } | AdmissionRow[]>(
      `/legacy/patient-visits/get-visit-admissions/?patient_visit_id=${encodeURIComponent(selectedVisitId)}`,
    );
    const rows = Array.isArray(response) ? response : Array.isArray(response?.data) ? response.data : [];
    setAdmissionRows(rows);
  };

  const openAdmitPatient = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId || hasAdmission) return;
    setError(null);
    setAdmitLoading(true);
    setShowAdmitModal(true);
    try {
      await loadWardTypes();
      setWards([]);
      setBeds([]);
      setAdmitForm({
        ward_type_id: '',
        ward_id: '',
        bed_id: '',
        admission_start: '',
        short_stay: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load ward types.');
    } finally {
      setAdmitLoading(false);
    }
  };

  const loadWardsForType = async (wardTypeId: string, shortStayOverride?: boolean, formType: 'admit' | 'change' = 'admit') => {
    if (!wardTypeId) {
      setWards([]);
      setBeds([]);
      if (formType === 'admit') {
        setAdmitForm((prev) => ({ ...prev, ward_type_id: '', ward_id: '', bed_id: '' }));
      } else {
        setChangeBedForm((prev) => ({ ...prev, ward_type_id: '', ward_id: '', new_bed_id: '' }));
      }
      return;
    }
    setAdmitLoading(true);
    try {
      const ageSpecificationId = ageSpecificationIdFromPatient(
        data?.patient?.date_of_birth,
        data?.patient?.age,
      );
      const params = new URLSearchParams();
      if (data?.patient?.gender_id) params.set('patient_gender', asText(data.patient.gender_id));
      if (ageSpecificationId) params.set('patient_age', ageSpecificationId);
      const shortStayValue = shortStayOverride ?? (formType === 'admit' ? admitForm.short_stay : changeBedForm.short_stay);
      params.set('stay_type', shortStayValue ? '1' : '0');
      params.set('ward_type_id', wardTypeId);
      const rows = await api.get<WardRow[]>(`/legacy/patients/get-related-wards/?${params.toString()}`);
      const activeRows = (Array.isArray(rows) ? rows : []).filter((row) => asText(row.status || '1') !== '0');
      setWards(activeRows);
      setBeds([]);
      if (formType === 'admit') {
        setAdmitForm((prev) => ({ ...prev, ward_type_id: wardTypeId, ward_id: '', bed_id: '' }));
      } else {
        setChangeBedForm((prev) => ({ ...prev, ward_type_id: wardTypeId, ward_id: '', new_bed_id: '' }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load wards.');
    } finally {
      setAdmitLoading(false);
    }
  };

  const loadBedsForWard = async (wardId: string, formType: 'admit' | 'change' = 'admit') => {
    if (!wardId) {
      setBeds([]);
      if (formType === 'admit') {
        setAdmitForm((prev) => ({ ...prev, ward_id: '', bed_id: '' }));
      } else {
        setChangeBedForm((prev) => ({ ...prev, ward_id: '', new_bed_id: '' }));
      }
      return;
    }
    setAdmitLoading(true);
    try {
      const rows = await api.get<BedRow[]>(`/legacy/patients/update-beds/?ward_id=${encodeURIComponent(wardId)}`);
      const availableRows = (Array.isArray(rows) ? rows : []).filter((row) => {
        const statusText = asText(row.status);
        return !statusText || statusText === '1';
      });
      setBeds(availableRows);
      if (formType === 'admit') {
        setAdmitForm((prev) => ({ ...prev, ward_id: wardId, bed_id: '' }));
      } else {
        setChangeBedForm((prev) => ({ ...prev, ward_id: wardId, new_bed_id: '' }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load beds.');
    } finally {
      setAdmitLoading(false);
    }
  };

  const submitAdmitPatient = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId || !admitForm.bed_id) return;
    setAdmitSubmitting(true);
    setError(null);
    try {
      await api.post('/legacy/patient-visits/admit-patient/', {
        patient_visit_id: selectedVisitId,
        bed_id: admitForm.bed_id,
        admission_start: admitForm.admission_start || undefined,
        is_bed_request: admitForm.short_stay ? 1 : 0,
      });
      await refreshAdmissions();
      setShowAdmitModal(false);
      await loadWorkspace(patientId, selectedVisitId);
      setSuccess('Patient admitted successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to admit patient.');
    } finally {
      setAdmitSubmitting(false);
    }
  };

  const openChangeBedModal = async (row: AdmissionRow) => {
    setSelectedAdmission(row);
    setError(null);
    setShowChangeBedModal(true);
    setAdmitLoading(true);
    try {
      await loadWardTypes();
      setWards([]);
      setBeds([]);
      setChangeBedForm({
        ward_type_id: '',
        ward_id: '',
        new_bed_id: '',
        short_stay: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to prepare change bed form.');
    } finally {
      setAdmitLoading(false);
    }
  };

  const submitChangeBed = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId || !selectedAdmission?.id || !changeBedForm.new_bed_id) return;
    const oldBedId = asText(selectedAdmission?.bed?.id);
    if (!oldBedId) {
      setError('Current bed information is missing for this admission.');
      return;
    }
    setChangeBedSubmitting(true);
    setError(null);
    try {
      await api.post('/legacy/patient-visits/change-patient-bed/', {
        patient_visit_id: selectedVisitId,
        visit_id: selectedAdmission.id,
        bed_id: oldBedId,
        ward_id: asText(selectedAdmission?.bed?.ward_id) || undefined,
        new_bed_id: changeBedForm.new_bed_id,
      });
      await refreshAdmissions();
      setShowChangeBedModal(false);
      setSelectedAdmission(null);
      setSuccess('Patient bed changed successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to change bed.');
    } finally {
      setChangeBedSubmitting(false);
    }
  };

  const openEndAdmissionModal = (row: AdmissionRow) => {
    setSelectedAdmission(row);
    setEndAdmissionConfirmation('');
    setShowEndAdmissionModal(true);
    setError(null);
  };

  const submitEndAdmission = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId) return;
    if (endAdmissionConfirmation.trim().toLowerCase() !== 'yes') {
      setError("Type 'yes' to confirm end admission.");
      return;
    }
    setEndingAdmission(true);
    setError(null);
    try {
      await api.post('/legacy/patient-visits/end-admission/', {
        patient_visit_id: selectedVisitId,
        confirmation: 'yes',
        outcome_id: '1',
      });
      await refreshAdmissions();
      setShowEndAdmissionModal(false);
      setSelectedAdmission(null);
      await loadWorkspace(patientId, selectedVisitId);
      setSuccess('Admission ended successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to end admission.');
    } finally {
      setEndingAdmission(false);
    }
  };

  const loadVisitOutcomes = async () => {
    try {
      const response = await api.get<{ results?: VisitOutcomeRow[] } | VisitOutcomeRow[]>('/visit_outcomes/?page=1&page_size=100');
      const rows = Array.isArray(response) ? response : Array.isArray(response?.results) ? response.results : [];
      if (rows.length) {
        const filteredRows = hasAdmission ? rows.filter((row) => asText(row.id) === '1') : rows;
        setVisitOutcomes(filteredRows);
        return;
      }
    } catch (_err) {
      // fall through to defaults
    }
    const defaultRows = [
      { id: '1', name: 'Discharged' },
      { id: '7', name: 'Cancelled' },
      { id: '5', name: 'Absconded' },
      { id: '3', name: 'Passed Away' },
      { id: '4', name: 'Discharge Advice' },
      { id: '2', name: 'Referred' },
    ];
    setVisitOutcomes(hasAdmission ? defaultRows.filter((row) => asText(row.id) === '1') : defaultRows);
  };

  const openConcludePicker = async () => {
    if (visitLocked) {
      setError('This visit is already concluded.');
      return;
    }
    if (!selectedVisitId) return;
    setError(null);
    await loadVisitOutcomes();
    setShowConcludePicker(true);
  };

  const openOutcomeModal = (outcome: VisitOutcomeRow) => {
    setSelectedOutcome(outcome);
    setConcludeNotes('');
    setConcludeAdmissionEnd('');
    setShowConcludePicker(false);
    setShowConcludeModal(true);
  };

  const selectedOutcomeConfig = useMemo(() => {
    return outcomeModalConfig(asText(selectedOutcome?.id));
  }, [selectedOutcome]);

  const submitConcludeVisit = async () => {
    if (!selectedVisitId || !selectedOutcome?.id) return;
    setConcludingVisit(true);
    setError(null);
    const outcomeId = asText(selectedOutcome.id);
    const endpointByOutcomeId: Record<string, string> = {
      '1': '/legacy/patient-visits/set-discharged-visit-outcome/',
      '7': '/legacy/patient-visits/set-cancelled-visit-outcome/',
      '5': '/legacy/patient-visits/set-absconded-visit-outcome/',
      '3': '/legacy/patient-visits/set-passed-away-visit-outcome/',
    };
    const endpoint = endpointByOutcomeId[outcomeId] || '/legacy/patient-visits/set-visit-outcome/';
    try {
      await api.post(endpoint, {
        patient_visit_id: selectedVisitId,
        visit_outcome_id: outcomeId,
        notes: asText(concludeNotes) || undefined,
        admission_end: asText(concludeAdmissionEnd) || undefined,
      });
      setShowConcludeModal(false);
      setSelectedOutcome(null);
      await loadWorkspace(patientId, selectedVisitId);
      setSuccess(`Visit concluded as ${asText(selectedOutcome.name) || 'selected outcome'}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to conclude visit.');
    } finally {
      setConcludingVisit(false);
    }
  };

  const submitDoctorNote = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!patientId || !selectedVisitId || !asText(noteText)) return;
    setSavingNote(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('patient_id', patientId);
      params.set('visit_id', selectedVisitId);
      await api.post(`/legacy/patients/visit-space/?${params.toString()}`, {
        title: "Doctor's Note",
        notes: noteText.trim(),
      });
      setNoteText('');
      await loadWorkspace(patientId, selectedVisitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save doctor note.');
    } finally {
      setSavingNote(false);
    }
  };

  const submitVitals = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId) return;
    setSavingVitals(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        id: makeId(),
        patient_visit_id: selectedVisitId,
      };
      Object.entries(vitalForm).forEach(([key, value]) => {
        if (asText(value)) payload[key] = asText(value);
      });
      if (computedBmi) payload.bmi = computedBmi;
      await api.post('/legacy/patients/save-patient-visit-vitals/', payload);
      setVitalForm({
        temperature: '',
        pulse: '',
        respiratory_rate: '',
        oxygen_saturation: '',
        blood_pressure_1: '',
        blood_pressure_2: '',
        weight: '',
        height: '',
        fasting_blood_sugar: '',
        random_blood_sugar: '',
        avpu_score: '',
        mobility: '',
        trauma: '',
        back_date: '',
      });
      const refreshed = await api.get<JsonRow[]>(`/legacy/patients/get-patient-visit-vitals/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`);
      setVitalsRows(Array.isArray(refreshed) ? refreshed : []);
      await loadWorkspace(patientId, selectedVisitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save vitals.');
    } finally {
      setSavingVitals(false);
    }
  };

  const refreshFollowups = async () => {
    if (!selectedVisitId) return;
    try {
      const refreshed = await api.get<JsonRow[]>(
        `/legacy/patients/get-patient-followups/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`,
      );
      setFollowupRows(Array.isArray(refreshed) ? refreshed : []);
    } catch (_err) {
      //
    }
  };

  const submitFollowup = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId || !asText(followupForm.date_of_visit) || !asText(followupForm.description)) return;
    setSavingFollowup(true);
    setError(null);
    try {
      await api.post('/legacy/patients/save-patient-followups/', {
        id: makeId(),
        patient_visit_id: selectedVisitId,
        date_of_visit: dateOnly(followupForm.date_of_visit),
        description: followupForm.description.trim(),
        comment: asText(followupForm.comment) || null,
        specialty_id: followupForm.specialty_id || undefined,
        user_id: followupForm.user_id || undefined,
        assign_to_me: assignToMe ? 1 : undefined,
      });
      setSuccess('Follow-up saved.');
      setFollowupForm({
        date_of_visit: '',
        description: '',
        comment: '',
        specialty_id: '',
        user_id: assignToMe ? currentUserId : '',
      });
      await refreshFollowups();
      await loadWorkspace(patientId, selectedVisitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save follow-up.');
    } finally {
      setSavingFollowup(false);
    }
  };

  const cancelFollowup = async (id: string) => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!id) return;
    setError(null);
    try {
      await api.post(`/legacy/patients/cancel-patient-followup/${encodeURIComponent(id)}/`, {
        followupstatus_id: 3,
      });
      setSuccess('Follow-up cancelled.');
      await refreshFollowups();
      await loadWorkspace(patientId, selectedVisitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel follow-up.');
    }
  };

  const startEditFollowup = (row: JsonRow) => {
    const rowId = asText(row.id);
    setEditingFollowupId(rowId);
    setEditingForm({
      description: asText(row.description),
      comment: asText(row.comment),
      date_of_visit: asText(row.date_of_visit),
    });
  };

  const saveEditFollowup = async (id: string) => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!id) return;
    setError(null);
    try {
      await api.post(`/legacy/patients/update-patient-followup/${encodeURIComponent(id)}/`, {
        description: editingForm.description,
        comment: editingForm.comment,
        date_of_visit: dateOnly(editingForm.date_of_visit),
      });
      setSuccess('Follow-up updated.');
      setEditingFollowupId(null);
      await refreshFollowups();
      await loadWorkspace(patientId, selectedVisitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update follow-up.');
    }
  };

  const startRescheduleFollowup = (row: JsonRow) => {
    const rowId = asText(row.id);
    setReschedulingFollowupId(rowId);
    setRescheduleForm({
      date_of_visit: asText(row.date_of_visit),
      comment: asText(row.comment),
    });
  };

  const saveRescheduleFollowup = async (id: string) => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!id) return;
    setError(null);
    try {
      await api.post(`/legacy/patients/reschedule-patient-followup/${encodeURIComponent(id)}/`, {
        date_of_visit: dateOnly(rescheduleForm.date_of_visit),
        comment: rescheduleForm.comment,
      });
      setSuccess('Follow-up rescheduled.');
      setReschedulingFollowupId(null);
      await refreshFollowups();
      await loadWorkspace(patientId, selectedVisitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reschedule follow-up.');
    }
  };

  const submitRecurring = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId || !asText(followupForm.description) || !asText(followupForm.date_of_visit)) return;
    setRecurringSaving(true);
    setError(null);
    try {
      await api.post('/legacy/patients/save-patient-followups-recurring/', {
        patient_visit_id: selectedVisitId,
        description: followupForm.description,
        comment: asText(followupForm.comment) || undefined,
        date_of_visit: dateOnly(followupForm.date_of_visit),
        specialty_id: followupForm.specialty_id || undefined,
        user_id: followupForm.user_id || undefined,
        assign_to_me: assignToMe ? 1 : undefined,
        type: recurringForm.type,
        interval: Number(recurringForm.interval) || 1,
        condition: recurringForm.untilType,
        recur_end: recurringForm.untilType === 'date' ? recurringForm.recur_end || undefined : undefined,
        occurrences: recurringForm.untilType === 'occurrence' ? recurringForm.occurrences || undefined : undefined,
      });
      setSuccess('Recurring follow-up scheduled.');
      setRecurringModalOpen(false);
      setRecurringForm({
        type: 'daily',
        interval: '1',
        untilType: 'date',
        recur_end: '',
        occurrences: '',
      });
      await refreshFollowups();
      await loadWorkspace(patientId, selectedVisitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to schedule recurring follow-up.');
    } finally {
      setRecurringSaving(false);
    }
  };

  const diagnosisTypeLabel = (type: 'primary' | 'provisional' | 'differential' | 'other') => {
    if (type === 'primary') return 'Primary';
    if (type === 'provisional') return 'Provisional';
    if (type === 'differential') return 'Differential';
    return 'Other';
  };

  const addDiagnosisToFocusedType = (diagnosisId: string) => {
    const value = asText(diagnosisId);
    if (!value) return;
    const key = `${diagnosisTypeFocus}_diagnosis_ids` as
      | 'primary_diagnosis_ids'
      | 'provisional_diagnosis_ids'
      | 'differential_diagnosis_ids'
      | 'other_diagnosis_ids';
    setDiagnosisForm((prev) => {
      const existing = prev[key];
      if (existing.includes(value)) return prev;
      return { ...prev, [key]: [...existing, value] };
    });
  };

  const removeDiagnosisFromType = (
    type: 'primary' | 'provisional' | 'differential' | 'other',
    diagnosisId: string,
  ) => {
    const key = `${type}_diagnosis_ids` as
      | 'primary_diagnosis_ids'
      | 'provisional_diagnosis_ids'
      | 'differential_diagnosis_ids'
      | 'other_diagnosis_ids';
    setDiagnosisForm((prev) => ({ ...prev, [key]: prev[key].filter((item) => item !== diagnosisId) }));
  };

  const resetDiagnosisForm = () => {
    setDiagnosisForm({
      diagnosis_text: '',
      primary_diagnosis_ids: [],
      provisional_diagnosis_ids: [],
      differential_diagnosis_ids: [],
      other_diagnosis_ids: [],
      ill_episode: 'chronic',
    });
    setDiagnosisTypeFocus('primary');
  };

  const submitDiagnosis = async () => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    if (!selectedVisitId) return;
    if (
      !diagnosisForm.primary_diagnosis_ids.length &&
      !diagnosisForm.provisional_diagnosis_ids.length &&
      !diagnosisForm.differential_diagnosis_ids.length &&
      !diagnosisForm.other_diagnosis_ids.length
    ) {
      setError('Select at least one diagnosis item before saving.');
      return;
    }
    setSavingDiagnosis(true);
    setError(null);
    try {
      await api.post('/legacy/patient-visit-diagnoses/add/', {
        id: makeId(),
        patient_visit_id: selectedVisitId,
        diagnosis_text: asText(diagnosisForm.diagnosis_text) || undefined,
        ill_episode: diagnosisForm.ill_episode,
        primary_diagnosis_ids: diagnosisForm.primary_diagnosis_ids,
        provisional_diagnosis_ids: diagnosisForm.provisional_diagnosis_ids,
        differential_diagnosis_ids: diagnosisForm.differential_diagnosis_ids,
        other_diagnosis_ids: diagnosisForm.other_diagnosis_ids,
      });
      const refreshed = await api.get<JsonRow[]>(
        `/legacy/patient-visit-diagnoses/get-patient-visit-diagnosis/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`,
      );
      setDiagnosisRows(Array.isArray(refreshed) ? refreshed : []);
      resetDiagnosisForm();
      await loadWorkspace(patientId, selectedVisitId);
      setSuccess('Diagnosis saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save diagnosis.');
    } finally {
      setSavingDiagnosis(false);
    }
  };

  const deleteDiagnosis = async (diagnosisRowId: string) => {
    if (visitLocked) {
      setError('This visit has been concluded. No further clinical updates are allowed.');
      return;
    }
    const id = asText(diagnosisRowId);
    if (!id || !selectedVisitId) return;
    if (!window.confirm('Delete this diagnosis record?')) return;
    setError(null);
    try {
      await api.post(`/legacy/patient-visit-diagnoses/delete/?id=${encodeURIComponent(id)}`, {});
      const refreshed = await api.get<JsonRow[]>(
        `/legacy/patient-visit-diagnoses/get-patient-visit-diagnosis/?patient_visit_id=${encodeURIComponent(selectedVisitId)}&limit=50`,
      );
      setDiagnosisRows(Array.isArray(refreshed) ? refreshed : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete diagnosis.');
    }
  };

  const patientName = useMemo(() => {
    const patient = data?.patient;
    if (!patient) return 'Patient';
    const composed = `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim();
    return composed || asText(patient.name) || 'Patient';
  }, [data?.patient]);

  const diagnosisLookup = useMemo(() => {
    const map = new Map<string, { name: string; code: string }>();
    diagnosisOptions.forEach((row) => {
      const id = asText(row.id);
      if (!id) return;
      map.set(id, {
        name: asText(row.name) || asText(row.long_name) || id,
        code: asText(row.code),
      });
    });
    diagnosisRows.forEach((row) => {
      const sections: Array<{ key: string }> = [
        { key: 'patient_visit_primary_diagnoses' },
        { key: 'patient_visit_provisional_diagnoses' },
        { key: 'patient_visit_differential_diagnoses' },
        { key: 'patient_visit_other_diagnoses' },
      ];
      sections.forEach(({ key }) => {
        const entries = Array.isArray(row[key] as unknown[]) ? (row[key] as JsonRow[]) : [];
        entries.forEach((entry) => {
          const diag = (entry.primary_diagnosis as JsonRow | undefined) || (entry.diagnosis as JsonRow | undefined);
          const id = asText(diag?.id);
          if (!id) return;
          map.set(id, { name: asText(diag?.name) || id, code: asText(diag?.code) });
        });
      });
    });
    return map;
  }, [diagnosisOptions, diagnosisRows]);

  const showFollowupStatus = (status_id: string | number) => {
    const id = String(status_id);
    if (id === '1') return 'Scheduled';
    if (id === '2') return 'Completed';
    if (id === '3') return 'Cancelled';
    return 'Scheduled';
  }

  const renderTabPanel = () => {
    if (activeTab === 'vitals') {
      return (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Record and review vitals for this visit.</p>
          <div className="grid gap-2 md:grid-cols-4">
            <input value={vitalForm.temperature} onChange={(e) => setVitalForm((prev) => ({ ...prev, temperature: e.target.value }))} placeholder="Temperature (C)" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.oxygen_saturation} onChange={(e) => setVitalForm((prev) => ({ ...prev, oxygen_saturation: e.target.value }))} placeholder="SpO2" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.respiratory_rate} onChange={(e) => setVitalForm((prev) => ({ ...prev, respiratory_rate: e.target.value }))} placeholder="Resp Rate" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.pulse} onChange={(e) => setVitalForm((prev) => ({ ...prev, pulse: e.target.value }))} placeholder="Pulse" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.blood_pressure_1} onChange={(e) => setVitalForm((prev) => ({ ...prev, blood_pressure_1: e.target.value }))} placeholder="BP Systolic" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.blood_pressure_2} onChange={(e) => setVitalForm((prev) => ({ ...prev, blood_pressure_2: e.target.value }))} placeholder="BP Diastolic" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.weight} onChange={(e) => setVitalForm((prev) => ({ ...prev, weight: e.target.value }))} placeholder="Weight (kg)" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.height} onChange={(e) => setVitalForm((prev) => ({ ...prev, height: e.target.value }))} placeholder="Height (cm)" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={computedBmi} readOnly placeholder="BMI" className="rounded-lg border border-slate-200 bg-slate-100 px-2 py-1.5 text-xs text-slate-600" />
            <input value={vitalForm.fasting_blood_sugar} onChange={(e) => setVitalForm((prev) => ({ ...prev, fasting_blood_sugar: e.target.value }))} placeholder="FBS (mg/dL)" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <input value={vitalForm.random_blood_sugar} onChange={(e) => setVitalForm((prev) => ({ ...prev, random_blood_sugar: e.target.value }))} placeholder="RBS (mg/dL)" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
            <SearchableSelectField value={vitalForm.avpu_score} onChange={(e) => setVitalForm((prev) => ({ ...prev, avpu_score: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
              <option value="">AVPU</option>
              <option value="Alert">Alert</option>
              <option value="Verbal">Verbal Response</option>
              <option value="Pain">Pain Response</option>
              <option value="Unresponsive">Unresponsive</option>
              <option value="Confused">Confused</option>
            </SearchableSelectField>
            <SearchableSelectField value={vitalForm.mobility} onChange={(e) => setVitalForm((prev) => ({ ...prev, mobility: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
              <option value="">Mobility</option>
              <option value="mobile">Mobile</option>
              <option value="assisted">Assisted</option>
              <option value="immobile">Immobile</option>
            </SearchableSelectField>
            <SearchableSelectField value={vitalForm.trauma} onChange={(e) => setVitalForm((prev) => ({ ...prev, trauma: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
              <option value="">Trauma</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </SearchableSelectField>
            <input type="datetime-local" value={vitalForm.back_date} onChange={(e) => setVitalForm((prev) => ({ ...prev, back_date: e.target.value }))} placeholder="Back Date" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setVitalForm({
                temperature: '',
                pulse: '',
                respiratory_rate: '',
                oxygen_saturation: '',
                blood_pressure_1: '',
                blood_pressure_2: '',
                weight: '',
                height: '',
                fasting_blood_sugar: '',
                random_blood_sugar: '',
                avpu_score: '',
                mobility: '',
                trauma: '',
                back_date: '',
              })}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Reset
            </button>
            <button type="button" onClick={submitVitals} disabled={savingVitals || !selectedVisitId} className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 disabled:opacity-50">
              {savingVitals ? 'Saving...' : 'Save Vitals'}
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            {tabLoading ? <p className="text-xs text-slate-500">Loading vitals...</p> : (
              <div className="space-y-2">
                {sortedVitalsRows.slice(0, 8).map((row) => (
                  <div key={asText(row.id)} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800">{formatDateTime(row.back_date || row.date_created)}</p>
                      {asText(row.back_date) ? (
                        <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold text-cyan-700">
                          Back Dated
                        </span>
                      ) : null}
                    </div>
                    <div className="grid gap-1.5 md:grid-cols-4">
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">Temp <b>{asText(row.temperature) || '-'}</b></span>
                      <span className={`rounded-md border px-2 py-1 text-[11px] ${spo2Tone(row.oxygen_saturation)}`}>SpO2 <b>{asText(row.oxygen_saturation) || '-'}</b></span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">RR <b>{asText(row.respiratory_rate) || '-'}</b></span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">Pulse <b>{asText(row.pulse) || '-'}</b></span>
                      <span className={`rounded-md border px-2 py-1 text-[11px] ${bpTone(row.blood_pressure_1, row.blood_pressure_2)}`}>BP <b>{asText(row.blood_pressure_1) || '-'} / {asText(row.blood_pressure_2) || '-'}</b></span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">Wt <b>{asText(row.weight) || '-'}</b></span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">Ht <b>{asText(row.height) || '-'}</b></span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">BMI <b>{asText(row.bmi) || '-'}</b></span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-indigo-700">FBS {asText(row.fasting_blood_sugar) || '-'}</span>
                      <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-rose-700">RBS {asText(row.random_blood_sugar) || '-'}</span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">AVPU {asText(row.avpu_score) || '-'}</span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">Mobility {asText(row.mobility) || '-'}</span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">Trauma {asText(row.trauma) || '-'}</span>
                    </div>
                  </div>
                ))}
                {!sortedVitalsRows.length ? <p className="text-xs text-slate-500">No vitals recorded yet.</p> : null}
              </div>
            )}
          </div>
        </div>
      );
    }
    if (activeTab === 'clinical_encounter') {
      return (
        <div className="space-y-3">
          <ClinicalEncounterWorkspace patientId={patientId} visitId={selectedVisitId} embedded />
        </div>
      );
    }
    if (activeTab === 'review_of_systems') {
      return (
        <div className="space-y-3">
          <ClinicalEncounterWorkspace
            patientId={patientId}
            visitId={selectedVisitId}
            embedded
            initialTab="review_of_systems"
            allowedTabs={['review_of_systems']}
            showTabStrip={false}
          />
        </div>
      );
    }
    if (activeTab === 'diagnoses') {
      return (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Record primary, provisional, differential, and other diagnoses for this visit.</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="grid gap-2 md:grid-cols-12">
              <textarea
                value={diagnosisForm.diagnosis_text}
                onChange={(e) => setDiagnosisForm((prev) => ({ ...prev, diagnosis_text: e.target.value }))}
                placeholder="Summarize diagnosis"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-8"
                rows={2}
              />
              <div className="md:col-span-4">
                <label className="mb-1 block text-[11px] font-semibold text-slate-600">Ill Episode (for primary)</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDiagnosisForm((prev) => ({ ...prev, ill_episode: 'chronic' }))}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                      diagnosisForm.ill_episode === 'chronic' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Chronic
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagnosisForm((prev) => ({ ...prev, ill_episode: 'acute' }))}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                      diagnosisForm.ill_episode === 'acute' ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Acute
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['primary', 'provisional', 'differential', 'other'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDiagnosisTypeFocus(type)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    diagnosisTypeFocus === type ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {diagnosisTypeLabel(type)}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <input
                value={diagnosisSearch}
                onChange={(e) => setDiagnosisSearch(e.target.value)}
                placeholder={`Search ICD-10 by name/code and add to ${diagnosisTypeLabel(diagnosisTypeFocus)}`}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <div className="mt-2 max-h-40 overflow-auto rounded-lg border border-slate-200 bg-white">
                {diagnosisOptions.map((option) => (
                  <button
                    key={asText(option.id)}
                    type="button"
                    onClick={() => addDiagnosisToFocusedType(asText(option.id))}
                    className="flex w-full items-center justify-between border-b border-slate-100 px-3 py-2 text-left text-xs hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-700">{asText(option.name) || asText(option.long_name) || asText(option.id)}</span>
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">{asText(option.code) || 'N/A'}</span>
                  </button>
                ))}
                {!diagnosisOptions.length ? <p className="px-3 py-2 text-xs text-slate-500">No diagnosis matches.</p> : null}
              </div>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {([
                ['primary', diagnosisForm.primary_diagnosis_ids],
                ['provisional', diagnosisForm.provisional_diagnosis_ids],
                ['differential', diagnosisForm.differential_diagnosis_ids],
                ['other', diagnosisForm.other_diagnosis_ids],
              ] as Array<[ 'primary' | 'provisional' | 'differential' | 'other', string[] ]>).map(([type, ids]) => (
                <div key={type} className="rounded-lg border border-slate-200 bg-white p-2">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{diagnosisTypeLabel(type)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ids.map((id) => {
                      const item = diagnosisLookup.get(id);
                      return (
                        <span key={`${type}_${id}`} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700">
                          <span>{item?.name || id}</span>
                          <span className="rounded-full border border-rose-200 bg-rose-50 px-1.5 text-[10px] text-rose-700">{item?.code || 'N/A'}</span>
                          <button type="button" onClick={() => removeDiagnosisFromType(type, id)} className="text-slate-500 hover:text-rose-600">x</button>
                        </span>
                      );
                    })}
                    {!ids.length ? <span className="text-[11px] text-slate-400">No selections</span> : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button type="button" onClick={resetDiagnosisForm} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Reset</button>
              <button type="button" onClick={submitDiagnosis} disabled={savingDiagnosis || !selectedVisitId} className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 disabled:opacity-50">
                {savingDiagnosis ? 'Saving...' : 'Save Diagnosis'}
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            {tabLoading ? <p className="text-xs text-slate-500">Loading diagnoses...</p> : (
              <div className="space-y-2">
                {diagnosisRows.slice(0, 30).map((row) => {
                  const primary = Array.isArray(row.patient_visit_primary_diagnoses as unknown[]) ? (row.patient_visit_primary_diagnoses as JsonRow[]) : [];
                  const provisional = Array.isArray(row.patient_visit_provisional_diagnoses as unknown[]) ? (row.patient_visit_provisional_diagnoses as JsonRow[]) : [];
                  const differential = Array.isArray(row.patient_visit_differential_diagnoses as unknown[]) ? (row.patient_visit_differential_diagnoses as JsonRow[]) : [];
                  const other = Array.isArray(row.patient_visit_other_diagnoses as unknown[]) ? (row.patient_visit_other_diagnoses as JsonRow[]) : [];
                  return (
                    <div key={asText(row.id)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-800">{formatDateTime(row.date_created)}</p>
                          <p className="text-slate-700">{asText(row.diagnosis_text) || 'No doctor diagnosis summary'}</p>
                        </div>
                        <button type="button" onClick={() => deleteDiagnosis(asText(row.id))} className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700">Delete</button>
                      </div>
                      <div className="grid gap-1.5 md:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-semibold text-rose-700">Primary</p>
                          {primary.map((item) => {
                            const diagnosis = (item.primary_diagnosis as JsonRow | undefined) || {};
                            const illEpisode = asText(item.ill_episode);
                            return (
                              <p key={asText(item.id)} className="text-slate-700">
                                {asText(diagnosis.name) || 'N/A'} <span className="text-rose-700">({asText(diagnosis.code) || 'N/A'})</span>
                                {illEpisode ? (
                                  <span
                                    className={`ml-1 inline-flex rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${
                                      illEpisode.toLowerCase() === 'acute'
                                        ? 'border-sky-200 bg-sky-50 text-sky-700'
                                        : 'border-rose-200 bg-rose-50 text-rose-700'
                                    }`}
                                  >
                                    {illEpisode}
                                  </span>
                                ) : null}
                              </p>
                            );
                          })}
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-emerald-700">Provisional</p>
                          {provisional.map((item) => {
                            const diagnosis = (item.diagnosis as JsonRow | undefined) || {};
                            return <p key={asText(item.id)} className="text-slate-700">{asText(diagnosis.name) || 'N/A'} <span className="text-emerald-700">({asText(diagnosis.code) || 'N/A'})</span></p>;
                          })}
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-amber-700">Differential</p>
                          {differential.map((item) => {
                            const diagnosis = (item.diagnosis as JsonRow | undefined) || {};
                            return <p key={asText(item.id)} className="text-slate-700">{asText(diagnosis.name) || 'N/A'} <span className="text-amber-700">({asText(diagnosis.code) || 'N/A'})</span></p>;
                          })}
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-slate-700">Other</p>
                          {other.map((item) => {
                            const diagnosis = (item.diagnosis as JsonRow | undefined) || {};
                            return <p key={asText(item.id)} className="text-slate-700">{asText(diagnosis.name) || 'N/A'} <span className="text-slate-700">({asText(diagnosis.code) || 'N/A'})</span></p>;
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!diagnosisRows.length ? <p className="text-xs text-slate-500">No diagnoses found for this visit.</p> : null}
              </div>
            )}
          </div>
        </div>
      );
    }
    if (activeTab === 'treatment_plan') {
      return (
        <TreatmentPlanWorkspace
          patientId={patientId}
          visitId={selectedVisitId}
          diagnosisRows={diagnosisRows}
          latestVital={latestVital}
          medicationRows={medicationRows}
          prescriptionRows={prescriptionRows}
          requestLabRows={requestLabRows}
          requestScanRows={requestScanRows}
        />
      );
    }
    if (activeTab === 'request_services') {
      return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {requestServiceTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setRequestServicesTab(tab.key)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  activeRequestServicesTab === tab.key
                    ? 'border-cyan-300 bg-cyan-50 text-cyan-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeRequestServicesTab === 'overview' ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,rgba(248,250,252,0.96),rgba(241,245,249,0.9))] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Request Services</p>
                    <h3 className="text-lg font-semibold text-slate-900">Visit Request Command Center</h3>
                    <p className="mt-1 text-xs text-slate-600">
                      Summary of requests already raised for this visit, with direct links into each workflow.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-right">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-700">Tracked Requests</p>
                    <p className="text-2xl font-semibold text-cyan-900">{requestServiceTotal}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {requestServiceOverviewCards.map((card) => (
                  <button
                    key={card.label}
                    type="button"
                    onClick={() => setRequestServicesTab(card.key)}
                    className={`rounded-2xl border p-4 text-left transition hover:shadow-sm ${
                      card.tone === 'indigo'
                        ? 'border-indigo-200 bg-indigo-50'
                        : card.tone === 'violet'
                        ? 'border-violet-200 bg-violet-50'
                        : card.tone === 'emerald'
                        ? 'border-emerald-200 bg-emerald-50'
                        : card.tone === 'sky'
                        ? 'border-sky-200 bg-sky-50'
                        : card.tone === 'amber'
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-rose-200 bg-rose-50'
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-600">{card.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                    <p className="mt-1 text-xs text-slate-600">{card.sublabel}</p>
                  </button>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Workflow Access</p>
                      <h4 className="text-sm font-semibold text-slate-900">Extended Request Workspaces</h4>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">
                      {requestServiceWorkspaceLinks.length} workspaces
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    {requestServiceWorkspaceLinks.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setRequestServicesTab(item.key)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left hover:border-slate-300 hover:bg-white"
                      >
                        <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                        <p className="mt-1 text-xs text-slate-600">{item.note}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Quick Context</p>
                  <h4 className="mt-1 text-sm font-semibold text-slate-900">Current Visit Signals</h4>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <span className="text-slate-600">Labs + Imaging</span>
                      <span className="font-semibold text-slate-900">{requestLabRows.length + requestScanRows.length}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <span className="text-slate-600">Pharmacy-related</span>
                      <span className="font-semibold text-slate-900">
                        {asNumber(medicationSummary.medications_count) +
                          asNumber(medicationSummary.prescriptions_count) +
                          asNumber(medicationSummary.infusions_count) +
                          asNumber(medicationSummary.transfusions_count)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <span className="text-slate-600">Open Admission</span>
                      <span className="font-semibold text-slate-900">{admissionRows.length ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                      <p className="font-semibold text-slate-800">Recent Items Loaded</p>
                      <p className="mt-1 text-slate-600">
                        Labs: {requestLabRows
                          .slice(0, 3)
                          .map((r) => {
                            const labTest = (r.lab_test as JsonRow | undefined) || {};
                            return asText(labTest.name) || asText(labTest.description) || asText(r.lab_test_id) || asText(r.id);
                          })
                          .filter(Boolean)
                          .join(', ') || 'None'}
                      </p>
                      <p className="text-slate-600">
                        Imaging: {requestScanRows
                          .slice(0, 3)
                          .map((r) => {
                            const scan = (r.radiology_scan as JsonRow | undefined) || {};
                            return asText(scan.name) || asText(scan.description) || asText(r.radiology_scan_id) || asText(r.id);
                          })
                          .filter(Boolean)
                          .join(', ') || 'None'}
                      </p>
                      <p className="text-slate-600">
                        Prescriptions: {prescriptionRows
                          .slice(0, 3)
                          .map((r) => {
                            const display = (r.display as JsonRow | undefined) || {};
                            const request = (r.request as JsonRow | undefined) || {};
                            return asText(display.name) || asText(request.id) || asText(r.id);
                          })
                          .filter(Boolean)
                          .join(', ') || 'None'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {activeRequestServicesTab === 'labs' ? (
            <RequestLabServicesPanel visitId={selectedVisitId} />
          ) : null}

          {activeRequestServicesTab === 'imaging' ? (
            <RequestScanServicesPanel visitId={selectedVisitId} />
          ) : null}

          {activeRequestServicesTab === 'medication' ? (
            <RequestMedicationServicesPanel visitId={selectedVisitId} />
          ) : null}

          {activeRequestServicesTab === 'transfusion' ? (
            <RequestTransfusionServicesPanel visitId={selectedVisitId} />
          ) : null}

          {activeRequestServicesTab === 'immunization' ? (
            <RequestImmunizationServicesPanel visitId={selectedVisitId} patientId={patientId} />
          ) : null}

          {activeRequestServicesTab === 'surgery' ? (
            <RequestSurgeryServicesPanel visitId={selectedVisitId} diagnosisRows={diagnosisRows} />
          ) : null}

          {activeRequestServicesTab === 'referral' ? (
            <RequestReferralServicesPanel visitId={selectedVisitId} diagnosisRows={diagnosisRows} />
          ) : null}

          {activeRequestServicesTab === 'consumables' ? (
            <RequestConsumablesServicesPanel visitId={selectedVisitId} />
          ) : null}

          {activeRequestServicesTab === 'bundled' ? (
            <RequestBundledServicesPanel visitId={selectedVisitId} patientId={patientId} diagnosisRows={diagnosisRows} />
          ) : null}

          {activeRequestServicesTab === 'other_services' ? (
            <RequestWardServicesPanel
              visitId={selectedVisitId}
              patientId={patientId}
              currentWardId={asText(selectedAdmission?.bed?.ward_id)}
            />
          ) : null}
        </div>
      );
    }
    if (activeTab === 'follow_up') {
      return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Follow Ups</p>
              <h3 className="text-lg font-semibold text-slate-900">Planned Follow-up Activities</h3>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={assignToMe}
                onChange={(e) => setAssignToMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600"
              />
              Assign to me
            </label>
          </div>
          <div className="flex gap-2">
            {(['add', 'view'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFollowupTab(tab)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  activeFollowupTab === tab
                    ? 'border-sky-300 bg-sky-50 text-sky-800'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                {tab === 'add' ? 'Add' : 'View'}
              </button>
            ))}
          </div>
          {activeFollowupTab === 'add' ? (
            <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Description / Problem</label>
                <textarea
                  value={followupForm.description}
                  onChange={(e) => setFollowupForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="Provide actionable information on the next examination or observation"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                />
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Specialty</label>
                  <SearchableSelectField
                    value={followupForm.specialty_id}
                    onChange={(e) => setFollowupForm((prev) => ({ ...prev, specialty_id: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                  >
                    <option value="">Select specialty</option>
                    {followupSpecialties.map((option) => (
                      <option key={asText(option.id)} value={asText(option.id)}>
                        {asText(option.name)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Assigned Doctor</label>
                  <SearchableSelectField
                    value={followupForm.user_id}
                    onChange={(e) => setFollowupForm((prev) => ({ ...prev, user_id: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                  >
                    <option value="">Select doctor</option>
                    {followupDoctors.map((option) => (
                      <option key={asText(option.id)} value={asText(option.id)}>
                        {asText(option.first_name)} {asText(option.last_name)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </div>
              </div>
              <div className="grid gap-2 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Date of Next Visit</label>
                  <input
                    type="datetime-local"
                    value={followupForm.date_of_visit}
                    onChange={(e) => setFollowupForm((prev) => ({ ...prev, date_of_visit: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Notes</label>
                  <textarea
                    value={followupForm.comment}
                    onChange={(e) => setFollowupForm((prev) => ({ ...prev, comment: e.target.value }))}
                    rows={2}
                    placeholder="Leave notes for assigned staff"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setRecurringModalOpen(true)}
                  disabled={!asText(followupForm.description) || !asText(followupForm.date_of_visit)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-50"
                >
                  <span>Make Routine Care For Followups</span>
                </button>
                <button
                  type="button"
                  onClick={submitFollowup}
                  disabled={savingFollowup || !selectedVisitId || !asText(followupForm.description) || !asText(followupForm.date_of_visit)}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 disabled:opacity-50"
                >
                  {savingFollowup ? 'Saving...' : 'Save Follow-up'}
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {tabLoading ? (
                <p className="text-xs text-slate-500">Loading follow-ups...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Date</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Description</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Doctor</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Specialty</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Visit Date</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Comment</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Status</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Activity</th>
                        <th className="px-2 py-1 text-left uppercase tracking-wide text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      {followupRows.map((row) => {
                        const rowId = asText(row.id);
                        return (
                          <Fragment key={`row-${rowId}`}>
                            <tr className="border-b border-slate-200 bg-white">
                              <td className="px-2 py-2 font-semibold text-slate-800">{formatDateTime(row.date_created)}</td>
                              <td className="px-2 py-2 text-slate-700">{asText(row.description) || 'N/A'}</td>
                              <td className="px-2 py-2 text-slate-700">
                                {findOptionLabel(followupDoctors, asText(row.user_id)) ||
                                  asText(row.assigned_doctor) ||
                                  asText(row.user_name) ||
                                  'N/A'}
                              </td>
                              <td className="px-2 py-2 text-slate-700">
                                {findOptionLabel(followupSpecialties, asText(row.specialty_id)) ||
                                  asText(row.specialty) ||
                                  'N/A'}
                              </td>
                              <td className="px-2 py-2 text-slate-700">{formatDateTime(row.date_of_visit)}</td>
                              <td className="px-2 py-2 text-slate-700">{asText(row.comment) || '-'}</td>
                              <td className="px-2 py-2 text-slate-700">{showFollowupStatus(asText(row.followupstatus_id))}</td>
                              <td className="px-2 py-2 text-slate-700">{stripHtml(asText(row.activity || '')) || '—'}</td>
                              <td className="px-2 py-2 text-slate-700 space-x-1">
                                {/* <button type="button" onClick={() => startEditFollowup(row)} className="rounded border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-50">Edit</button> */}

                                { !['3', '2'].includes(asText(row.followupstatus_id)) ? (
                                  <>
                                    <button type="button" onClick={() => cancelFollowup(rowId)} className="rounded border border-rose-200 px-2 py-1 text-[10px] font-semibold text-rose-700 hover:bg-rose-50">Cancel</button>
                                    {/* <button type="button" onClick={() => startRescheduleFollowup(row)} className="rounded border border-amber-200 px-2 py-1 text-[10px] font-semibold text-amber-700 hover:bg-amber-50">Reschedule</button> */}
                                  </>
                                ) : ''}
                              </td>
                            </tr>
                            {editingFollowupId === rowId ? (
                              <tr>
                                <td colSpan={9} className="bg-slate-50 px-2 py-2">
                                  <div className="space-y-2">
                                    <textarea
                                      value={editingForm.description}
                                      onChange={(e) => setEditingForm((prev) => ({ ...prev, description: e.target.value }))}
                                      rows={2}
                                      className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                                    />
                                    <div className="grid gap-2 md:grid-cols-2">
                                      <input
                                        type="datetime-local"
                                        value={editingForm.date_of_visit}
                                        onChange={(e) => setEditingForm((prev) => ({ ...prev, date_of_visit: e.target.value }))}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                                      />
                                      <input
                                        value={editingForm.comment}
                                        onChange={(e) => setEditingForm((prev) => ({ ...prev, comment: e.target.value }))}
                                        placeholder="Comment"
                                        className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <button type="button" onClick={() => saveEditFollowup(rowId)} className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Save</button>
                                      <button type="button" onClick={() => setEditingFollowupId(null)} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">Cancel</button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : null}
                            {reschedulingFollowupId === rowId ? (
                              <tr>
                                <td colSpan={9} className="bg-slate-50 px-2 py-2">
                                  <div className="flex flex-wrap gap-2">
                                    <input
                                      type="datetime-local"
                                      value={rescheduleForm.date_of_visit}
                                      onChange={(e) => setRescheduleForm((prev) => ({ ...prev, date_of_visit: e.target.value }))}
                                      className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                                    />
                                    <input
                                      value={rescheduleForm.comment}
                                      onChange={(e) => setRescheduleForm((prev) => ({ ...prev, comment: e.target.value }))}
                                      placeholder="Comment"
                                      className="flex-1 min-w-[200px] rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                                    />
                                    <button type="button" onClick={() => saveRescheduleFollowup(rowId)} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Save</button>
                                    <button type="button" onClick={() => setReschedulingFollowupId(null)} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">Cancel</button>
                                  </div>
                                </td>
                              </tr>
                            ) : null}
                          </Fragment>
                        );
                      })}
                      {!followupRows.length ? (
                        <tr>
                          <td colSpan={9} className="px-2 py-3 text-center text-xs text-slate-500">
                            No follow-ups for this visit.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {recurringModalOpen ? (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4">
              <div className="w-full max-w-2xl rounded-2xl bg-white p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Recurring Follow-up</p>
                    <h4 className="text-lg font-semibold text-slate-900">Make Routine Care For Followups</h4>
                  </div>
                  <button type="button" onClick={() => setRecurringModalOpen(false)} className="text-xs text-slate-500 underline">Close</button>
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="font-semibold text-slate-800">Description</p>
                    <p className="text-slate-700">{followupForm.description || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="font-semibold text-slate-800">Specialty</p>
                    <p className="text-slate-700">{findOptionLabel(followupSpecialties, followupForm.specialty_id) || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="font-semibold text-slate-800">Assigned Doctor</p>
                    <p className="text-slate-700">{findOptionLabel(followupDoctors, followupForm.user_id) || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                    <p className="font-semibold text-slate-800">First Appointment</p>
                    <p className="text-slate-700">{formatDateTime(followupForm.date_of_visit)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">Recurrence</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['daily', 'weekly', 'monthly'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setRecurringForm((prev) => ({ ...prev, type }))}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          recurringForm.type === type ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-700">
                    <span>Repeat every</span>
                    <input
                      type="number"
                      min={1}
                      value={recurringForm.interval}
                      onChange={(e) => setRecurringForm((prev) => ({ ...prev, interval: e.target.value }))}
                      className="w-16 rounded-lg border border-slate-300 px-2 py-1 text-xs"
                    />
                    <span>{recurringForm.type === 'daily' ? 'days' : recurringForm.type === 'weekly' ? 'weeks' : 'months'}</span>
                  </div>
                  <div className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-600">
                    <p className="mb-2 font-semibold text-slate-800">Stop Condition</p>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="untilType"
                          value="date"
                          checked={recurringForm.untilType === 'date'}
                          onChange={(e) => setRecurringForm((prev) => ({ ...prev, untilType: e.target.value }))}
                          className="h-4 w-4 text-slate-700"
                        />
                        <span>Run until specific date</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="untilType"
                          value="occurrence"
                          checked={recurringForm.untilType === 'occurrence'}
                          onChange={(e) => setRecurringForm((prev) => ({ ...prev, untilType: e.target.value }))}
                          className="h-4 w-4 text-slate-700"
                        />
                        <span>Run for occurrences</span>
                      </label>
                    </div>
                    {recurringForm.untilType === 'date' ? (
                      <div className="mt-2">
                        <input
                          type="date"
                          value={recurringForm.recur_end}
                          onChange={(e) => setRecurringForm((prev) => ({ ...prev, recur_end: e.target.value }))}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={recurringForm.occurrences}
                          onChange={(e) => setRecurringForm((prev) => ({ ...prev, occurrences: e.target.value }))}
                          className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-xs"
                        />
                        <span>occurances</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRecurringModalOpen(false)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitRecurring}
                    disabled={
                      recurringSaving ||
                      !selectedVisitId ||
                      !asText(followupForm.description) ||
                      !asText(followupForm.date_of_visit)
                    }
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 disabled:opacity-50"
                  >
                    {recurringSaving ? 'Saving...' : 'Done'}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
    if (activeTab === 'flow_sheet') {
      return <VisitFlowSheetWorkspace visitId={selectedVisitId} />;
    }
    if (activeTab === 'mar') {
      return <VisitMarWorkspace visitId={selectedVisitId} />;
    }
    if (activeTab === 'admitted') {
      const isCurrentVisit = Boolean(data?.selected_visit?.is_current);
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-600">Admission details</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
              Status: <span className="font-semibold">{hasAdmission ? 'Admitted' : 'Not admitted'}</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-3 py-2">Date Admitted</th>
                    <th className="px-3 py-2">Admission Start</th>
                    <th className="px-3 py-2">Admission End</th>
                    <th className="px-3 py-2">Ward</th>
                    <th className="px-3 py-2">Bed</th>
                    <th className="px-3 py-2">Outcome</th>
                    <th className="px-3 py-2">Bed Change Date</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admissionRows.length ? admissionRows.map((row) => {
                    const canAct = isCurrentVisit && !asText(row.outcome_setter_id);
                    return (
                      <tr key={row.id} className="border-t border-slate-100">
                        <td className="px-3 py-2">{formatDateTime(row.date_admitted)}</td>
                        <td className="px-3 py-2">{formatDateTime(row.admission_start)}</td>
                        <td className="px-3 py-2">{asText(row.admission_outcome_id) ? formatDateTime(row.admission_end) : ''}</td>
                        <td className="px-3 py-2">{asText(row.bed?.ward?.name) || 'N/A'}</td>
                        <td className="px-3 py-2">{asText(row.bed?.name) || 'N/A'}</td>
                        <td className="px-3 py-2">{asText(row.admission_outcome?.name) || ''}</td>
                        <td className="px-3 py-2">{row.bed_change_date ? formatDateTime(row.bed_change_date) : ''}</td>
                        <td className="px-3 py-2">
                          {canAct ? (
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => openChangeBedModal(row)}
                                className="rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] font-semibold text-sky-700"
                              >
                                Change Bed
                              </button>
                              <button
                                type="button"
                                onClick={() => openEndAdmissionModal(row)}
                                className="rounded border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700"
                              >
                                End Admission
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td className="px-3 py-4 text-center text-slate-500" colSpan={8}>
                        No admission records found for this visit.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" onClick={() => go('/Patients/view_visits_ipd')} className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">Open IPD Visits</button>
        </div>
      );
    }
    return (
      <div className="grid gap-3 md:grid-cols-3">
        <button type="button" onClick={() => go('/Patients/view_visit_report')} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left">
          <p className="text-xs text-slate-600">General</p>
          <p className="text-sm font-semibold text-slate-900">Visit Report</p>
        </button>
        <button type="button" onClick={() => go('/RequestLabs/patient_visit_report')} className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-left">
          <p className="text-xs text-indigo-600">Laboratory</p>
          <p className="text-sm font-semibold text-indigo-900">Lab Report</p>
        </button>
        <button type="button" onClick={() => go('/RequestRadiologies/patient_visit_report')} className="rounded-xl border border-violet-200 bg-violet-50 p-3 text-left">
          <p className="text-xs text-violet-600">Radiology</p>
          <p className="text-sm font-semibold text-violet-900">Scan Report</p>
        </button>
      </div>
    );
  };

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading visit space...</div>;
  }

  if (!data?.patient) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error || 'Unable to load visit space.'}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 bg-white p-4 transition-colors" style={{ borderColor: triage.color }}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visit Space</p>
              <h2 className="text-xl font-semibold text-slate-900">{patientName}</h2>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => navigate(`/Patients/view_patient?id=${patientId}`)} className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">View Patient</button>
              <button type="button" onClick={() => setShowPatientBillModal(true)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">Patient Bill</button>
              {canCreateVisitFromHeader ? (
                <button type="button" onClick={openCreateVisitModal} className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
                  Create Visit
                </button>
              ) : null}
              {!hasAdmission ? (
                <button type="button" onClick={openAdmitPatient} disabled={!selectedVisitId || visitLocked} className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 disabled:opacity-50">
                  Admit Patient
                </button>
              ) : null}
              {!visitLocked ? (
                <button
                  type="button"
                  onClick={openConcludePicker}
                  disabled={!selectedVisitId}
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 disabled:opacity-50"
                >
                  Conclude Visit
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Code:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.code) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Folder:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.folder_number) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Age:</span>
              <span className="font-bold text-slate-900">{ageFromDob(data.patient.date_of_birth)}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Visit Date:</span>
              <span className="font-bold text-slate-900">{formatDateTime(data.selected_visit?.date_created)}</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Sex:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.sex) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Blood:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.blood_group) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Sickling:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.sickling_status_name) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Marital:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.marital_status) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Occupation:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.occupation) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Ethnicity:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.ethnicity) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Religion:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.religion) || 'N/A'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
              <span className="font-semibold text-slate-600">Language:</span>
              <span className="font-bold text-slate-900">{asText(data.patient.language) || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm" style={{ borderColor: triage.color, backgroundColor: `${triage.color}1A` }}>
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: triage.color }} />
            <span className="font-semibold" style={{ color: triage.color }}>Triage: {triage.label}</span>
          </div>
          {hasAdmission ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
              <span className="font-semibold text-rose-700">Admitted</span>
            </div>
          ) : null}
          {asText(data.selected_visit?.visit_outcome_name) ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm">
              <span className="font-semibold text-emerald-700">Outcome:</span>
              <span className="font-bold text-emerald-900">{asText(data.selected_visit?.visit_outcome_name)}</span>
            </div>
          ) : null}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
            <span className="font-semibold text-slate-600">Status:</span>
            <span className="font-bold text-slate-900">{asText(data.selected_visit?.status_name) || 'N/A'}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
            <span className="font-semibold text-slate-600">Purpose:</span>
            <span className="font-bold text-slate-900">{asText(data.selected_visit?.purpose_name) || 'N/A'}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
            <span className="font-semibold text-slate-600">Assigned:</span>
            <span className="font-bold text-slate-900">{asText(data.queue?.assigned_user_name) || 'N/A'}</span>
          </div>
        </div>
      </div>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_250px]">
        <div className="space-y-4">
          {!selectedVisitId ? (
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-700">No Active Visit</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">Start a New Visit for {patientName}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Choose clinic, visit purpose, service and payment details to open this patient&apos;s visit space.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openCreateVisitModal}
                  className="rounded-xl border border-cyan-300 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800"
                >
                  Create Visit
                </button>
              </div>
            </div>
          ) : (
            <>
              {visitLocked ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-sm font-semibold text-amber-800">Visit is concluded</p>
                  <p className="mt-1 text-xs text-amber-700">You can still view all tabs and records, but updates are locked.</p>
                </div>
              ) : null}
              <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto border-b border-slate-200 px-2">
                  <div className="flex min-w-max items-center gap-1 py-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setTab(tab.key)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${activeTab === tab.key ? 'bg-sky-100 text-sky-800' : 'text-slate-700 hover:bg-slate-100'}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4">{renderTabPanel()}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">Doctor&apos;s Remarks</h3>
                  <span className="text-xs text-slate-500">{notes.length} note(s)</span>
                </div>
                <div className="mt-3 space-y-2">
                  {visitLocked ? (
                    <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      Visit concluded. Remarks are locked.
                    </p>
                  ) : null}
                  <textarea
                    value={noteText}
                    onChange={(event) => setNoteText(event.target.value)}
                    placeholder="Add a doctor remark for this visit..."
                    readOnly={visitLocked}
                    className="min-h-[96px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={submitDoctorNote}
                      disabled={!asText(noteText) || !selectedVisitId || savingNote || visitLocked}
                      className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {savingNote ? 'Saving...' : 'Save Remark'}
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  {notes.length ? notes.map((note) => (
                    <div key={note.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold text-slate-700">{asText(note.title) || "Doctor's Note"}</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{asText(note.notes) || '-'}</p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {asText(note.user_name) || 'Unknown'} • {formatDateTime(note.date_added)}
                      </p>
                    </div>
                  )) : <p className="text-xs text-slate-500">No remarks yet for this visit.</p>}
                </div>
              </div>
            </>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <h3 className="text-xs font-semibold text-slate-900">Visit History</h3>
            <div className="mt-2 max-h-[340px] space-y-1.5 overflow-y-auto pr-1">
              {visits.length ? visits.map((visit) => {
                const active = asText(visit.id) === selectedVisitId;
                return (
                  <button
                    key={visit.id}
                    type="button"
                    onClick={() => goToVisit(visit.id)}
                    className={`w-full rounded-lg border px-2.5 py-1.5 text-left transition ${active ? 'border-sky-300 bg-sky-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'}`}
                  >
                    <p className="text-[11px] font-semibold text-slate-800">{formatDateTime(visit.date_created)}</p>
                    <p className="text-[10px] text-slate-600">{asText(visit.purpose_name) || 'No purpose'}</p>
                    <p className="text-[10px] text-slate-500">
                      Outcome: {asText(visit.visit_outcome_name) || 'Pending'}
                    </p>
                  </button>
                );
              }) : <p className="text-xs text-slate-500">No visits found for this patient.</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Billing Snapshot</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Invoices</span>
                <span className="font-semibold text-slate-900">{asNumber(billing.invoice_count)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Sub Total</span>
                <span className="font-semibold text-slate-900">{formatMoney(billing.total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Paid</span>
                <span className="font-semibold text-emerald-700">{formatMoney(billing.paid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Remaining</span>
                <span className="font-semibold text-rose-700">{formatMoney(billing.balance)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showCreateVisitModal ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <section className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Visit Space</p>
                <h3 className="text-lg font-semibold text-slate-900">Create Visit</h3>
              </div>
              <button
                type="button"
                onClick={closeCreateVisitModal}
                className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{patientName}</p>
                <p className="text-xs text-slate-600">Code: {asText(data.patient.code) || 'N/A'} • Folder: {asText(data.patient.folder_number) || 'N/A'}</p>
              </div>

              {createVisitLoading ? (
                <p className="text-sm text-slate-600">Loading visit options...</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specialty Rows</p>
                    <button type="button" onClick={addCreateVisitLine} className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                      + Add Row
                    </button>
                  </div>
                  {createVisitLines.map((line, index) => {
                    const purposes = availablePurposesForSpecialty(line.specialty_id);
                    const services = availableServicesForLine(line);
                    return (
                      <div key={line.row_id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-700">Line {index + 1}</p>
                          {createVisitLines.length > 1 ? (
                            <button type="button" onClick={() => removeCreateVisitLine(line.row_id)} className="rounded border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700">
                              Remove
                            </button>
                          ) : null}
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <label className="block text-xs text-slate-700">
                            Specialty / Clinic
                            <SearchableSelect
                              value={line.specialty_id}
                              onChange={(value) => updateCreateVisitLine(line.row_id, { specialty_id: value, patient_visit_purpose_id: '', consultation_id: '' })}
                              options={toSearchableOptions(createVisitSpecialties)}
                              placeholder="Select specialty"
                              className="mt-1"
                            />
                          </label>

                          <label className="block text-xs text-slate-700">
                            Visit Purpose
                            <SearchableSelect
                              value={line.patient_visit_purpose_id}
                              onChange={(value) => updateCreateVisitLine(line.row_id, { patient_visit_purpose_id: value, consultation_id: '' })}
                              options={toSearchableOptions(purposes)}
                              placeholder="Select purpose"
                              className="mt-1"
                            />
                          </label>

                          <label className="block text-xs text-slate-700">
                            Service
                            <SearchableSelect
                              value={line.consultation_id}
                              onChange={(value) => updateCreateVisitLine(line.row_id, { consultation_id: value })}
                              options={toSearchableOptions(services)}
                              placeholder="Select service"
                              className="mt-1"
                            />
                          </label>

                          <label className="block text-xs text-slate-700">
                            Assign Doctor (Optional)
                            <SearchableSelect
                              value={line.assigned_user_id}
                              onChange={(value) => updateCreateVisitLine(line.row_id, { assigned_user_id: value })}
                              options={toSearchableOptions(
                                followupDoctors,
                                (doctor) =>
                                  asText(doctor.name || `${asText(doctor.first_name)} ${asText(doctor.last_name)}`) || asText(doctor.username) || asText(doctor.id),
                              )}
                              placeholder="No assignment"
                              className="mt-1"
                            />
                          </label>

                          <label className="block text-xs text-slate-700 md:col-span-2">
                            Reason for Visit
                            <textarea
                              value={line.description}
                              onChange={(event) => updateCreateVisitLine(line.row_id, { description: event.target.value })}
                              rows={2}
                              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              placeholder="Brief clinical reason or presenting complaint"
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="block text-xs text-slate-700">
                      Payment Type
                      <SearchableSelect
                        value={createVisitForm.patient_insurance_profile_policy_id}
                        onChange={(value) => setCreateVisitForm((prev) => ({ ...prev, patient_insurance_profile_policy_id: value }))}
                        options={toSearchableOptions(createVisitPolicies, (policy) => {
                          const providerId = asText(policy.insurance_profile_policy_id);
                          const providerLabel = createVisitProviderNameById.get(providerId) || providerId || 'Insurance';
                          const insuranceNumber = asText(policy.insurance_number);
                          return `${providerLabel}${insuranceNumber ? ` - ${insuranceNumber}` : ''}`;
                        })}
                        placeholder="Patient (Cash)"
                        className="mt-1"
                      />
                    </label>

                    <label className="block text-xs text-slate-700">
                      Claim Code (Optional)
                      <input
                        value={createVisitForm.claim_code}
                        onChange={(event) => setCreateVisitForm((prev) => ({ ...prev, claim_code: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Mandatory where required"
                      />
                    </label>
                  </div>

                  {createVisitPendingTasks.length ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                        Today&apos;s Pending Planner Tasks
                      </p>
                      <p className="mt-1 text-xs text-amber-700">
                        Select tasks to mark as completed after visit creation.
                      </p>
                      <div className="mt-2 space-y-2">
                        {createVisitPendingTasks.map((task) => {
                          const taskId = asText(task.id);
                          const checked = createVisitSelectedTaskIds.includes(taskId);
                          return (
                            <label
                              key={taskId}
                              className="flex items-start gap-2 rounded-lg border border-amber-200 bg-white px-2.5 py-2 text-xs text-slate-700"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(event) => {
                                  setCreateVisitSelectedTaskIds((prev) => {
                                    if (event.target.checked) {
                                      if (prev.includes(taskId)) return prev;
                                      return [...prev, taskId];
                                    }
                                    return prev.filter((id) => id !== taskId);
                                  });
                                }}
                                className="mt-0.5"
                              />
                              <span className="flex-1">
                                <span className="font-semibold text-slate-800">{asText(task.task_type) || 'Task'}</span>
                                <span className="mx-1 text-slate-400">•</span>
                                <span>{asText(task.title) || 'Pending planner item'}</span>
                                {task.due_at ? (
                                  <span className="ml-1 text-slate-500">({formatDateTime(task.due_at)})</span>
                                ) : null}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={closeCreateVisitModal}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  createVisitLoading
                  || createVisitSaving
                  || !createVisitLines.some((line) => asText(line.specialty_id) && asText(line.consultation_id))
                }
                onClick={submitCreateVisit}
                className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-50"
              >
                {createVisitSaving ? 'Creating...' : 'Create Visit'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <PatientBillModal
        open={showPatientBillModal}
        onClose={() => setShowPatientBillModal(false)}
        visitId={selectedVisitId || ''}
        patientName={patientName}
      />

      {showAdmitModal ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Admit Patient</h3>
              <button
                type="button"
                onClick={() => setShowAdmitModal(false)}
                className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-xs text-slate-700">
                Ward Type
                <SearchableSelect
                  value={admitForm.ward_type_id}
                  onChange={(value) => {
                    loadWardsForType(value).catch(() => undefined);
                  }}
                  options={toSearchableOptions(wardTypes as unknown as JsonRow[])}
                  placeholder="Select..."
                  className="mt-1"
                />
              </label>

              <label className="block text-xs text-slate-700">
                Ward
                <SearchableSelect
                  value={admitForm.ward_id}
                  onChange={(value) => {
                    loadBedsForWard(value).catch(() => undefined);
                  }}
                  disabled={!admitForm.ward_type_id}
                  options={toSearchableOptions(wards as unknown as JsonRow[])}
                  placeholder="Select..."
                  className="mt-1"
                />
              </label>

              <label className="block text-xs text-slate-700">
                Bed
                <SearchableSelect
                  value={admitForm.bed_id}
                  onChange={(value) => setAdmitForm((prev) => ({ ...prev, bed_id: value }))}
                  disabled={!admitForm.ward_id}
                  options={toSearchableOptions(beds as unknown as JsonRow[])}
                  placeholder="Select..."
                  className="mt-1"
                />
              </label>

              <label className="block text-xs text-slate-700">
                Admission Start
                <input
                  type="datetime-local"
                  value={admitForm.admission_start}
                  onChange={(event) => setAdmitForm((prev) => ({ ...prev, admission_start: event.target.value }))}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
            </div>

            <label className="mt-3 inline-flex items-center gap-2 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={admitForm.short_stay}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setAdmitForm((prev) => ({ ...prev, short_stay: checked }));
                  if (admitForm.ward_type_id) loadWardsForType(admitForm.ward_type_id, checked).catch(() => undefined);
                }}
              />
              Short Stay
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAdmitModal(false)}
                className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitAdmitPatient}
                disabled={admitSubmitting || admitLoading || !admitForm.bed_id}
                className="rounded bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {admitSubmitting ? 'Admitting...' : 'Admit Patient'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {showChangeBedModal ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Change Bed</h3>
              <button
                type="button"
                onClick={() => {
                  setShowChangeBedModal(false);
                  setSelectedAdmission(null);
                }}
                className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
              Current ward/bed: <span className="font-semibold">{asText(selectedAdmission?.bed?.ward?.name) || 'N/A'}</span> /{' '}
              <span className="font-semibold">{asText(selectedAdmission?.bed?.name) || 'N/A'}</span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-xs text-slate-700">
                Ward Type
                <SearchableSelect
                  value={changeBedForm.ward_type_id}
                  onChange={(value) => {
                    loadWardsForType(value, undefined, 'change').catch(() => undefined);
                  }}
                  options={toSearchableOptions(wardTypes as unknown as JsonRow[])}
                  placeholder="Select..."
                  className="mt-1"
                />
              </label>

              <label className="block text-xs text-slate-700">
                Ward
                <SearchableSelect
                  value={changeBedForm.ward_id}
                  onChange={(value) => {
                    loadBedsForWard(value, 'change').catch(() => undefined);
                  }}
                  disabled={!changeBedForm.ward_type_id}
                  options={toSearchableOptions(wards as unknown as JsonRow[])}
                  placeholder="Select..."
                  className="mt-1"
                />
              </label>

              <label className="block text-xs text-slate-700 md:col-span-2">
                New Bed
                <SearchableSelect
                  value={changeBedForm.new_bed_id}
                  onChange={(value) => setChangeBedForm((prev) => ({ ...prev, new_bed_id: value }))}
                  disabled={!changeBedForm.ward_id}
                  options={toSearchableOptions(beds as unknown as JsonRow[])}
                  placeholder="Select..."
                  className="mt-1"
                />
              </label>
            </div>

            <label className="mt-3 inline-flex items-center gap-2 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={changeBedForm.short_stay}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setChangeBedForm((prev) => ({ ...prev, short_stay: checked }));
                  if (changeBedForm.ward_type_id) {
                    loadWardsForType(changeBedForm.ward_type_id, checked, 'change').catch(() => undefined);
                  }
                }}
              />
              Short Stay
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowChangeBedModal(false);
                  setSelectedAdmission(null);
                }}
                className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitChangeBed}
                disabled={changeBedSubmitting || admitLoading || !changeBedForm.new_bed_id}
                className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {changeBedSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {showEndAdmissionModal ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">End Admission</h3>
              <button
                type="button"
                onClick={() => {
                  setShowEndAdmissionModal(false);
                  setSelectedAdmission(null);
                  setEndAdmissionConfirmation('');
                }}
                className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>
            <p className="text-sm text-slate-600">
              Type <span className="font-semibold text-sky-700">yes</span> to confirm ending this admission.
            </p>
            <input
              value={endAdmissionConfirmation}
              onChange={(event) => setEndAdmissionConfirmation(event.target.value)}
              className="mt-3 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              placeholder="yes"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowEndAdmissionModal(false);
                  setSelectedAdmission(null);
                  setEndAdmissionConfirmation('');
                }}
                className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitEndAdmission}
                disabled={endingAdmission || endAdmissionConfirmation.trim().toLowerCase() !== 'yes'}
                className="rounded bg-amber-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {endingAdmission ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {showConcludePicker ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Select Visit Outcome</h3>
              <button type="button" onClick={() => setShowConcludePicker(false)} className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700">Close</button>
            </div>
            {hasAdmission ? (
              <p className="mb-3 text-xs text-amber-700">
                This visit has an active admission. Only <span className="font-semibold">Discharged</span> is allowed.
              </p>
            ) : null}
            <div className="grid gap-2">
              {visitOutcomes.map((outcome) => (
                <button
                  key={outcome.id}
                  type="button"
                  onClick={() => openOutcomeModal(outcome)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {asText(outcome.name) || `Outcome ${outcome.id}`}
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : null}

      {showConcludeModal && selectedOutcome ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {selectedOutcomeConfig.title}
              </h3>
              <button type="button" onClick={() => setShowConcludeModal(false)} className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700">Close</button>
            </div>
            <p className="mb-3 text-sm text-slate-600">{selectedOutcomeConfig.description}</p>

            {selectedOutcomeConfig.showAdmissionEnd ? (
              <label className="block text-xs text-slate-700">
                Admission End
                <input
                  type="datetime-local"
                  value={concludeAdmissionEnd}
                  onChange={(event) => setConcludeAdmissionEnd(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
            ) : null}

            <label className="mt-3 block text-xs text-slate-700">
              {selectedOutcomeConfig.notesLabel}
              <textarea
                value={concludeNotes}
                onChange={(event) => setConcludeNotes(event.target.value)}
                rows={4}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowConcludeModal(false)} className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
              <button
                type="button"
                onClick={submitConcludeVisit}
                disabled={concludingVisit}
                className="rounded bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {concludingVisit ? 'Saving...' : selectedOutcomeConfig.submitLabel}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
