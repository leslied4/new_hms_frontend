import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

type CareStatus = 'pending' | 'completed' | 'all';
type ActiveTab = 'queue' | 'planner';

type QueueRow = {
  id: string;
  patient_visit_id: string;
  date_created?: string | null;
  status_id?: string;
  status?: string;
  patient?: {
    id?: string;
    name?: string;
    folder_number?: string;
    code?: string;
  };
  assigned_user?: {
    id?: string;
    name?: string;
  };
  vitals?: {
    oxygen_saturation?: number | null;
    blood_pressure_1?: string;
    blood_pressure_2?: string;
    alert?: {
      color?: string;
      title?: string;
      comment?: string;
    };
  };
  consultation_request?: {
    reason?: string;
    consultation_name?: string;
    consultation_type?: string;
    consultation_level?: string;
    diagnoses?: Array<{ id?: string; name?: string; code?: string }>;
  } | null;
};

type QueueDoctorResponse = {
  summary?: {
    pending?: number;
    completed?: number;
    total?: number;
  };
  data?: QueueRow[];
};

type PlannerTask = {
  task_id?: string;
  title?: string;
  start?: string;
  resource?: string;
  patient?: string;
  user?: string;
};

type PlannerBooking = {
  id?: string;
  patient?: string;
  appointment?: string;
  appointment_time?: string | null;
  specialty?: string;
  status?: string;
  next_assignment_info?: string;
};

type PlannerTimelineEvent = {
  id: string;
  type: 'appointment' | 'task';
  start: string;
  title: string;
  patient: string;
  meta: string;
  status: string;
};

type PlannerBootstrapResponse = {
  booking?: PlannerBooking[];
};

type SetupPlannerResponse = {
  task?: PlannerTask[];
};

type GenericRecord = Record<string, unknown>;

type AvailabilityDay = {
  id: string;
  day: string;
  minute?: number;
  selected_time_values?: string[];
};

type UpdateProfileResponse = {
  ok?: boolean;
  message?: string;
  user?: GenericRecord | null;
  theme?: string;
  selected_consultations?: Array<{ consultation_id?: string }>;
  availability_days?: AvailabilityDay[];
};

type AvailabilityState = Record<string, { minute: string; selectedTimes: string[] }>;

function asText(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function toInputDate(value: Date): string {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateTime(value?: string | null): string {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

function toDateKey(value?: string | null): string {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  const year = parsed.getFullYear();
  const month = `${parsed.getMonth() + 1}`.padStart(2, '0');
  const day = `${parsed.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toDisplayDate(dateKey: string): string {
  const parsed = new Date(`${dateKey}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateKey;
  return parsed.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function alertPillClasses(color: string): string {
  if (color === 'rose') return 'border-rose-200 bg-rose-50 text-rose-700';
  if (color === 'amber') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (color === 'sky') return 'border-sky-200 bg-sky-50 text-sky-700';
  return 'border-emerald-200 bg-emerald-50 text-emerald-700';
}

function buildTimeOptions(minuteValue: string): string[] {
  const step = Number.parseInt(minuteValue || '40', 10);
  const duration = Number.isFinite(step) && step > 0 ? step : 40;
  const slots: string[] = [];
  for (let current = 0; current < 1440; current += duration) {
    const hour = Math.floor(current / 60);
    const minute = current % 60;
    slots.push(`${hour}:${minute === 0 ? '00' : String(minute).padStart(2, '0')}`);
  }
  return slots;
}

const MINUTE_OPTIONS = ['20', '30', '40', '60', '90', '120'];
const DAY_SORT_ORDER: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

export default function QueueDoctor() {
  const navigate = useNavigate();
  const timelineStripRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('queue');

  const [rows, setRows] = useState<QueueRow[]>([]);
  const [careStatus, setCareStatus] = useState<CareStatus>('pending');
  const [summary, setSummary] = useState({ pending: 0, completed: 0, total: 0 });
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [startDate, setStartDate] = useState(() => toInputDate(new Date()));
  const [endDate, setEndDate] = useState(() => toInputDate(new Date()));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [processingQueueId, setProcessingQueueId] = useState<string>('');

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [activeUserId, setActiveUserId] = useState('');
  const [activeUserName, setActiveUserName] = useState('');
  const [selectedConsultationIds, setSelectedConsultationIds] = useState<string[]>([]);
  const [themeValue, setThemeValue] = useState('');
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([]);
  const [availability, setAvailability] = useState<AvailabilityState>({});
  const [editingDayId, setEditingDayId] = useState('');
  const [savingAvailability, setSavingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [availabilitySuccess, setAvailabilitySuccess] = useState<string | null>(null);

  const [plannerLoading, setPlannerLoading] = useState(false);
  const [plannerError, setPlannerError] = useState<string | null>(null);
  const [plannerBookings, setPlannerBookings] = useState<PlannerBooking[]>([]);
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>([]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => window.clearTimeout(handle);
  }, [search]);

  const hydrateProfile = (payload: UpdateProfileResponse) => {
    const user = payload?.user ?? null;
    const firstName = asText(user?.first_name);
    const lastName = asText(user?.last_name);
    setActiveUserId(asText(user?.id));
    setActiveUserName(`${firstName} ${lastName}`.trim() || 'Current User');
    setThemeValue(asText(payload?.theme));
    setSelectedConsultationIds(
      (payload?.selected_consultations || []).map((row) => asText(row.consultation_id)).filter(Boolean),
    );
    const days = Array.isArray(payload?.availability_days) ? payload.availability_days : [];
    setAvailabilityDays(days);
    const mapped: AvailabilityState = {};
    days.forEach((day) => {
      const dayId = asText(day.id);
      if (!dayId) return;
      mapped[dayId] = {
        minute: String(day.minute ?? 40),
        selectedTimes: (day.selected_time_values || []).map((value) => asText(value)).filter(Boolean),
      };
    });
    setAvailability(mapped);
  };

  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    setProfileError(null);
    try {
      const response = await api.get<UpdateProfileResponse>('/legacy/users/update-profile/');
      hydrateProfile(response || {});
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : 'Unable to load active user profile.');
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('care_status', careStatus);
      params.set('limit', '350');
      if (startDate) params.set('start', startDate);
      if (endDate) params.set('end', endDate);
      if (debouncedSearch) params.set('search', debouncedSearch);
      const response = await api.get<QueueDoctorResponse>(`/legacy/queue/doctor/?${params.toString()}`);
      setRows(Array.isArray(response?.data) ? response.data : []);
      setSummary({
        pending: Number(response?.summary?.pending || 0),
        completed: Number(response?.summary?.completed || 0),
        total: Number(response?.summary?.total || 0),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load doctor queue.');
    } finally {
      setLoading(false);
    }
  }, [careStatus, startDate, endDate, debouncedSearch]);

  const loadPlanner = useCallback(async () => {
    if (!activeUserId) return;
    setPlannerLoading(true);
    setPlannerError(null);
    try {
      const query = `user_id=${encodeURIComponent(activeUserId)}`;
      const [plannerResponse, setupResponse] = await Promise.all([
        api.get<PlannerBootstrapResponse>(`/legacy/sessions/planner/?${query}`),
        api.get<SetupPlannerResponse>(`/legacy/sessions/setup-planner/?${query}`),
      ]);
      setPlannerBookings(Array.isArray(plannerResponse?.booking) ? plannerResponse.booking : []);
      setPlannerTasks(Array.isArray(setupResponse?.task) ? setupResponse.task : []);
    } catch (err) {
      setPlannerError(err instanceof Error ? err.message : 'Unable to load scoped planner.');
    } finally {
      setPlannerLoading(false);
    }
  }, [activeUserId]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (activeTab !== 'queue') return;
    void loadQueue();
  }, [activeTab, loadQueue]);

  useEffect(() => {
    if (activeTab !== 'planner') return;
    void loadPlanner();
  }, [activeTab, loadPlanner]);

  const sortedRows = useMemo(() => {
    return [...rows].sort((left, right) => {
      const leftTime = left.date_created ? new Date(left.date_created).getTime() : 0;
      const rightTime = right.date_created ? new Date(right.date_created).getTime() : 0;
      if (careStatus === 'completed') return rightTime - leftTime;
      return leftTime - rightTime;
    });
  }, [rows, careStatus]);

  const plannerTimeline = useMemo(() => {
    const bookingEvents: PlannerTimelineEvent[] = plannerBookings.map((booking, index) => ({
      id: `booking-${asText(booking.id) || index}`,
      type: 'appointment',
      start: asText(booking.appointment_time),
      title: asText(booking.appointment) || 'Appointment',
      patient: asText(booking.patient) || 'Unknown patient',
      meta: asText(booking.specialty) || 'No specialty',
      status: asText(booking.status) || 'Scheduled',
    }));

    const taskEvents: PlannerTimelineEvent[] = plannerTasks
      .filter((task) => {
        const resource = asText(task.resource).toLowerCase();
        const taskId = asText(task.task_id).toUpperCase();
        // setup-planner emits bookings as tasks (resource=booking, task_id=BK:*).
        // We render bookings from plannerBookings, so skip these task duplicates.
        return resource !== 'booking' && !taskId.startsWith('BK:');
      })
      .map((task, index) => ({
        id: `task-${asText(task.task_id) || index}`,
        type: 'task',
        start: asText(task.start),
        title: asText(task.title) || asText(task.resource) || 'Timeline Task',
        patient: asText(task.patient) || 'No patient',
        meta: asText(task.resource) || asText(task.user) || 'No assignee',
        status: 'Task',
      }));

    const seen = new Set<string>();
    return [...bookingEvents, ...taskEvents]
      .filter((event) => {
        const key = [
          event.type,
          event.start,
          event.title.toLowerCase(),
          event.patient.toLowerCase(),
        ].join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((left, right) => {
        const leftTime = left.start ? new Date(left.start).getTime() : 0;
        const rightTime = right.start ? new Date(right.start).getTime() : 0;
        return leftTime - rightTime;
      })
      .slice(0, 36);
  }, [plannerBookings, plannerTasks]);

  const plannerTimelineByDay = useMemo(() => {
    const buckets = new Map<string, PlannerTimelineEvent[]>();
    plannerTimeline.forEach((event) => {
      const dateKey = toDateKey(event.start);
      if (!dateKey) return;
      const current = buckets.get(dateKey) || [];
      current.push(event);
      buckets.set(dateKey, current);
    });
    return Array.from(buckets.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([dateKey, rows]) => ({
        dateKey,
        rows: rows.sort((left, right) => {
          const leftTime = left.start ? new Date(left.start).getTime() : 0;
          const rightTime = right.start ? new Date(right.start).getTime() : 0;
          return leftTime - rightTime;
        }),
      }));
  }, [plannerTimeline]);

  useEffect(() => {
    if (activeTab !== 'planner' || !plannerTimelineByDay.length) return;
    const container = timelineStripRef.current;
    if (!container) return;
    const todayKey = toDateKey(new Date().toISOString());
    const targetBucket = plannerTimelineByDay.find((bucket) => bucket.dateKey >= todayKey)?.dateKey || plannerTimelineByDay[0]?.dateKey;
    if (!targetBucket) return;
    const node = container.querySelector<HTMLElement>(`[data-bucket-key="${targetBucket}"]`);
    if (!node) return;
    const nextLeft = Math.max(0, node.offsetLeft - 8);
    container.scrollTo({ left: nextLeft, behavior: 'smooth' });
  }, [activeTab, plannerTimelineByDay]);

  const editingDay = useMemo(() => {
    if (!editingDayId) return null;
    return availabilityDays.find((day) => asText(day.id) === editingDayId) || null;
  }, [availabilityDays, editingDayId]);

  const orderedAvailabilityDays = useMemo(() => {
    return [...availabilityDays].sort((left, right) => {
      const leftKey = asText(left.day).toLowerCase();
      const rightKey = asText(right.day).toLowerCase();
      const leftRank = DAY_SORT_ORDER[leftKey] ?? 99;
      const rightRank = DAY_SORT_ORDER[rightKey] ?? 99;
      if (leftRank !== rightRank) return leftRank - rightRank;
      return leftKey.localeCompare(rightKey);
    });
  }, [availabilityDays]);

  const processPatient = async (queueId: string) => {
    setActionError(null);
    setProcessingQueueId(queueId);
    try {
      await api.post('/legacy/queue/process-patient/', { queue_id: queueId });
      await loadQueue();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Unable to complete queue item.');
    } finally {
      setProcessingQueueId('');
    }
  };

  const toggleDayTime = (dayId: string, timeValue: string) => {
    setAvailability((current) => {
      const dayState = current[dayId] ?? { minute: '40', selectedTimes: [] };
      const exists = dayState.selectedTimes.includes(timeValue);
      return {
        ...current,
        [dayId]: {
          ...dayState,
          selectedTimes: exists
            ? dayState.selectedTimes.filter((value) => value !== timeValue)
            : [...dayState.selectedTimes, timeValue],
        },
      };
    });
    setAvailabilityError(null);
    setAvailabilitySuccess(null);
  };

  const updateDayMinute = (dayId: string, minute: string) => {
    setAvailability((current) => ({
      ...current,
      [dayId]: {
        minute,
        selectedTimes: current[dayId]?.selectedTimes ?? [],
      },
    }));
    setAvailabilityError(null);
    setAvailabilitySuccess(null);
  };

  const saveAvailability = async () => {
    setSavingAvailability(true);
    setAvailabilityError(null);
    setAvailabilitySuccess(null);
    try {
      const formData = new FormData();
      if (themeValue) {
        formData.append('theme', themeValue);
      }
      selectedConsultationIds.forEach((value) => formData.append('consultation_ids[]', value));
      const availabilityPayload = Object.entries(availability)
        .map(([booking_dayslot_id, value]) => ({
          booking_dayslot_id,
          minute: Number.parseInt(value.minute || '40', 10) || 40,
          selected_times: value.selectedTimes,
        }))
        .filter((row) => row.selected_times.length > 0);
      formData.append('availability', JSON.stringify(availabilityPayload));

      const response = await api.post<UpdateProfileResponse>('/legacy/users/update-profile/', formData);
      hydrateProfile(response || {});
      setAvailabilitySuccess(asText(response?.message) || 'Availability updated.');
      await loadPlanner();
    } catch (err) {
      setAvailabilityError(err instanceof Error ? err.message : 'Unable to save availability.');
    } finally {
      setSavingAvailability(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Queue</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Doctors Queue</h1>
            <p className="mt-1 text-sm text-slate-600">
              Queue care, scoped sessions planner, and doctor availability in one workspace.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('queue')}
              className={`btn rounded-xl border px-3 py-2 text-xs font-semibold ${
                activeTab === 'queue'
                  ? 'border-cyan-300 bg-cyan-100 text-cyan-800'
                  : 'border-slate-300 bg-white text-slate-700'
              }`}
            >
              Queue Care
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('planner')}
              className={`btn rounded-xl border px-3 py-2 text-xs font-semibold ${
                activeTab === 'planner'
                  ? 'border-emerald-300 bg-emerald-100 text-emerald-800'
                  : 'border-slate-300 bg-white text-slate-700'
              }`}
            >
              My Sessions Planner
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-700">Pending</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.pending}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">Completed</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.completed}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">Total</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.total}</p>
          </div>
        </div>
      </section>

      {activeTab === 'queue' ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr,220px,220px]">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Patient name, folder, code, doctor..."
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Start Date</span>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">End Date</span>
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(['pending', 'completed', 'all'] as CareStatus[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCareStatus(option)}
                className={`btn rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                  careStatus === option
                    ? 'border-cyan-300 bg-cyan-100 text-cyan-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                {option}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                const today = toInputDate(new Date());
                setStartDate(today);
                setEndDate(today);
                setSearch('');
              }}
              className="btn rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Reset To Today
            </button>
          </div>

          {error ? <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
          {actionError ? <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{actionError}</div> : null}

          {loading ? (
            <p className="mt-4 text-sm text-slate-600">Loading doctor queue...</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full table-fixed text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                    <th className="w-[150px] px-2 py-2">Queue Time</th>
                    <th className="w-[220px] px-2 py-2">Patient</th>
                    <th className="w-[160px] px-2 py-2">Assigned Doctor</th>
                    <th className="w-[180px] px-2 py-2">Vitals Alert</th>
                    <th className="px-2 py-2">Referral</th>
                    <th className="w-[180px] px-2 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row) => {
                    const alertColor = asText(row.vitals?.alert?.color) || 'emerald';
                    const canComplete = asText(row.status_id) === '19';
                    return (
                      <tr key={row.id} className="border-t border-slate-100 align-top">
                        <td className="px-2 py-3 text-xs text-slate-600">{formatDateTime(row.date_created)}</td>
                        <td className="px-2 py-3">
                          <p className="font-semibold text-slate-900">{asText(row.patient?.name) || 'Unknown patient'}</p>
                          <p className="text-xs text-slate-500">
                            {[asText(row.patient?.folder_number), asText(row.patient?.code)].filter(Boolean).join(' · ') || 'No identifiers'}
                          </p>
                          <span className="mt-1 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                            {asText(row.status) || asText(row.status_id) || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-xs text-slate-700">{asText(row.assigned_user?.name) || 'Unassigned'}</td>
                        <td className="px-2 py-3 text-xs text-slate-700">
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${alertPillClasses(alertColor)}`}>
                            {asText(row.vitals?.alert?.title) || 'Stable'}
                          </span>
                          <p className="mt-1 text-[11px] text-slate-600">
                            BP: {[asText(row.vitals?.blood_pressure_1), asText(row.vitals?.blood_pressure_2)].filter(Boolean).join('/')}
                            {asText(row.vitals?.oxygen_saturation) ? ` · SpO2 ${asText(row.vitals?.oxygen_saturation)}%` : ''}
                          </p>
                          {asText(row.vitals?.alert?.comment) ? <p className="mt-1 text-[11px] text-slate-500">{asText(row.vitals?.alert?.comment)}</p> : null}
                        </td>
                        <td className="px-2 py-3 text-xs text-slate-700">
                          {row.consultation_request ? (
                            <div className="space-y-1">
                              <p className="font-semibold text-slate-900">
                                {asText(row.consultation_request.consultation_name) || 'Consultation Request'}
                              </p>
                              <p>{asText(row.consultation_request.consultation_type)}</p>
                              <p>{asText(row.consultation_request.consultation_level)}</p>
                              <p className="text-slate-600">{asText(row.consultation_request.reason)}</p>
                              {Array.isArray(row.consultation_request.diagnoses) && row.consultation_request.diagnoses.length ? (
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {row.consultation_request.diagnoses.slice(0, 3).map((diagnosis, index) => (
                                    <span key={`${row.id}-diag-${index}`} className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-700">
                                      {asText(diagnosis.name) || 'Diagnosis'}{asText(diagnosis.code) ? ` (${asText(diagnosis.code)})` : ''}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span className="text-slate-400">No referral</span>
                          )}
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex flex-col gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const patientId = asText(row.patient?.id);
                                const visitId = asText(row.patient_visit_id);
                                if (!patientId || !visitId) return;
                                navigate(`/Patients/visit_space?patient_id=${encodeURIComponent(patientId)}&visit_id=${encodeURIComponent(visitId)}`);
                              }}
                              className="btn rounded-lg border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] font-semibold text-sky-700"
                            >
                              Visit Space
                            </button>
                            {canComplete ? (
                              <button
                                type="button"
                                onClick={() => void processPatient(row.id)}
                                disabled={processingQueueId === row.id}
                                className="btn rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 disabled:opacity-60"
                              >
                                {processingQueueId === row.id ? 'Completing...' : 'Complete Care'}
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {!sortedRows.length ? (
                    <tr>
                      <td colSpan={6} className="px-2 py-8 text-center text-sm text-slate-500">
                        No doctor queue records found for current filters.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">My Sessions Planner</h2>
              <p className="text-xs text-slate-500">
                Scoped to {activeUserName || 'current user'} {activeUserId ? `(${activeUserId})` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void loadPlanner()}
              className="btn rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Refresh
            </button>
          </div>

          {profileError ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{profileError}</div> : null}
          {plannerError ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{plannerError}</div> : null}

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-700">Appointments</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{plannerBookings.length}</p>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-700">Timeline Tasks</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{plannerTasks.length}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">Availability Days</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {availabilityDays.filter((day) => (availability[asText(day.id)]?.selectedTimes.length || 0) > 0).length}
              </p>
            </div>
          </div>

          {plannerLoading || profileLoading ? (
            <p className="text-sm text-slate-600">Loading scoped planner...</p>
          ) : (
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-900">Unified Timeline</h3>
              <p className="mt-0.5 text-xs text-slate-500">Appointments and timeline tasks grouped by date, horizontally.</p>
              {!plannerTimelineByDay.length ? (
                <div className="mt-3 rounded-xl border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-500">
                  No planner timeline items for current user.
                </div>
              ) : (
                <div ref={timelineStripRef} className="mt-3 overflow-x-auto pb-2">
                  <div className="flex min-w-max gap-3">
                    {plannerTimelineByDay.map((bucket) => (
                      <div key={bucket.dateKey} data-bucket-key={bucket.dateKey} className="w-[21rem] shrink-0 rounded-2xl border border-slate-200 bg-white p-3">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-900">{toDisplayDate(bucket.dateKey)}</h4>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{bucket.rows.length}</span>
                        </div>
                        <div className="mt-2 space-y-2">
                          {bucket.rows.map((event) => {
                            const typePillClass = event.type === 'appointment'
                              ? 'border-cyan-200 bg-cyan-50 text-cyan-700'
                              : 'border-violet-200 bg-violet-50 text-violet-700';
                            const cardClass = event.type === 'appointment'
                              ? 'border-cyan-200/70 bg-cyan-50/40'
                              : 'border-violet-200/70 bg-violet-50/40';
                            return (
                              <div key={event.id} className={`rounded-lg border px-3 py-2 text-xs ${cardClass}`}>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <p className="font-semibold text-slate-900">{event.title}</p>
                                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${typePillClass}`}>
                                    {event.type === 'appointment' ? 'Appointment' : 'Timeline Task'}
                                  </span>
                                </div>
                                <p className="mt-1 text-slate-700">{event.patient}</p>
                                <p className="text-slate-600">{formatDateTime(event.start)}</p>
                                <p className="text-slate-500">{event.meta} · {event.status}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}

          <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-900">My Availability</h3>
              <button
                type="button"
                onClick={() => void saveAvailability()}
                disabled={savingAvailability || profileLoading}
                className="btn rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 disabled:opacity-60"
              >
                {savingAvailability ? 'Saving...' : 'Save Availability'}
              </button>
            </div>
            {availabilityError ? <div className="mt-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{availabilityError}</div> : null}
            {availabilitySuccess ? <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{availabilitySuccess}</div> : null}
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {orderedAvailabilityDays.map((day) => {
                const dayId = asText(day.id);
                const state = availability[dayId] ?? { minute: String(day.minute ?? 40), selectedTimes: [] };
                return (
                  <section key={dayId} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{asText(day.day) || dayId}</p>
                        <p className="text-xs text-slate-500">
                          {state.selectedTimes.length} slot(s) · Every {state.minute} min
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingDayId(dayId)}
                        className="btn rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="mt-3 max-h-16 overflow-y-auto">
                      <div className="flex flex-wrap gap-1">
                        {state.selectedTimes.slice(0, 10).map((timeValue) => (
                          <span key={`${dayId}-${timeValue}`} className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] text-cyan-700">
                            {timeValue}
                          </span>
                        ))}
                        {state.selectedTimes.length > 10 ? (
                          <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                            +{state.selectedTimes.length - 10} more
                          </span>
                        ) : null}
                        {!state.selectedTimes.length ? (
                          <span className="text-[11px] text-slate-400">No slots selected</span>
                        ) : null}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </article>
        </section>
      )}

      {editingDay ? (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="flex h-[78vh] w-[min(760px,96vw)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Edit Availability</h3>
                <p className="text-xs text-slate-500">{asText(editingDay.day) || asText(editingDay.id)}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingDayId('')}
                className="btn rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Minute Interval</span>
                <SearchableSelectField
                  value={availability[asText(editingDay.id)]?.minute || String(editingDay.minute ?? 40)}
                  onChange={(event) => updateDayMinute(asText(editingDay.id), event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {MINUTE_OPTIONS.map((minute) => (
                    <option key={minute} value={minute}>{minute} min</option>
                  ))}
                </SearchableSelectField>
              </label>
              <div className="rounded-lg border border-slate-200 p-2">
                <div className="flex flex-wrap gap-1.5">
                  {buildTimeOptions(availability[asText(editingDay.id)]?.minute || String(editingDay.minute ?? 40)).map((timeValue) => {
                    const state = availability[asText(editingDay.id)] ?? { minute: String(editingDay.minute ?? 40), selectedTimes: [] };
                    const selected = state.selectedTimes.includes(timeValue);
                    return (
                      <button
                        key={timeValue}
                        type="button"
                        onClick={() => toggleDayTime(asText(editingDay.id), timeValue)}
                        className={`btn rounded-full border px-2 py-1 text-[11px] font-semibold ${
                          selected
                            ? 'border-cyan-300 bg-cyan-100 text-cyan-800'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        {timeValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
              <button
                type="button"
                onClick={() => setEditingDayId('')}
                className="btn rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
