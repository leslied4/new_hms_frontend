import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

type ProviderOption = {
  id: string;
  name?: string;
  insurance_profile?: {
    id?: string;
    name?: string;
    insurance_profile_type_id?: string;
    insurance_profile_type?: {
      id?: string;
      name?: string;
    } | null;
  } | null;
};

type GenericOption = {
  id: string;
  name?: string;
  color_code?: string;
};

type PlannerItem = {
  id: string;
  date_created?: string | null;
  patient_id?: string;
  patient?: string;
  title?: string;
  assigned_user_id?: string;
  assigned_user?: string;
  specialty?: string;
  specialty_id?: string;
  date?: string | null;
  duration?: number;
  status?: string;
  status_id?: string;
};

type PlannerGroup = {
  id: string;
  name?: string;
  description?: string;
  color?: string;
  items?: PlannerItem[];
};

type BookingRow = {
  id: string;
  patient_id?: string;
  patient?: string;
  email?: string;
  phone?: string;
  appointment?: string;
  appointment_time?: string | null;
  comment?: string;
  purpose?: string;
  specialty?: string;
  specialty_id?: string;
  specialty_color?: string;
  doctor?: string;
  user_id?: string;
  status?: string;
  status_id?: string;
  due_days?: number | null;
  due_color?: string;
  next_assignment_info?: string;
};

type PlannerBootstrapResponse = {
  planners?: PlannerGroup[];
  booking?: BookingRow[];
  providers?: ProviderOption[];
};

type AppointmentBootstrapResponse = {
  providers?: ProviderOption[];
  specialties?: GenericOption[];
  purposes?: GenericOption[];
  genders?: GenericOption[];
};

type FollowupBootstrapResponse = {
  visits?: Array<{
    id?: string;
    date_of_visit?: string | null;
    purpose?: string;
    assigned_doctor?: string;
    visit_outcome?: string;
  }>;
};

type PlannerTask = {
  start?: string;
  end?: string;
  title?: string;
  specialty?: string;
  user?: string;
  user_id?: string;
  resource?: string;
  patient_id?: string;
  patient?: string;
  task_id?: string;
  color?: string;
  date?: string;
};

type PlannerResource = {
  id: string;
  name?: string;
};

type SetupPlannerResponse = {
  task?: PlannerTask[];
  resource?: PlannerResource[];
  completionRate?: number;
};

type BookingDetail = {
  id?: string;
  patient_id?: string;
  patient?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    folder_number?: string;
  } | string | null;
  patient_name?: string;
  appointment?: string;
  appointment_date?: string;
  purpose?: string;
  doctor?: string;
  specialty?: { id?: string; name?: string } | string | null;
  status?: string;
  due_days?: number | null;
  due_color?: string;
  next_assignment_info?: string;
  patient_visit_purpose?: {
    id?: string;
    name?: string;
  } | null;
  user?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
  } | null;
  selected_doctor_booking_timeslot?: {
    id?: string;
    booking_timeslot_value?: string;
  } | null;
  appointment_time?: string | null;
  comment?: string;
  raw_comment?: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
};

type InsurancePolicyRow = {
  id: string;
  insurance_number?: string;
  insurance_card_name?: string;
  insurance_card_serial?: string;
  insurance_profile_policy?: {
    id?: string;
    name?: string;
    insurance_profile?: {
      id?: string;
      name?: string;
      insurance_profile_type?: {
        id?: string;
        name?: string;
      } | null;
    } | null;
  } | null;
};

type ConflictGroup = {
  key: string;
  userId: string;
  userName: string;
  start: string;
  end: string;
  tasks: PlannerTask[];
};

type CreateMode = 'existing' | 'guest';

type PatientSearchRow = {
  id: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  phone?: string;
  email?: string;
  date_of_birth?: string;
  gender_id?: string;
};

type ConsultationOption = {
  id: string;
  name?: string;
  price?: string;
  session_length?: string;
  patient_visit_purpose_id?: string;
};

type DoctorAvailability = {
  user: {
    id: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
  };
  availability: Array<{
    id: string;
    booking_timeslot_value?: string;
    booking_timeslot_id?: string;
  }>;
};

type BookingForm = {
  patient_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  gender_id: string;
  specialty_id: string;
  consultation_id: string;
  patient_visit_purpose_id: string;
  appointment_time: string;
  appointment_day: string;
  user_id: string;
  booking_timeslot_id: string;
  actual_appointment_time: string;
  comment: string;
  type: string;
  book_for: string;
};

const emptyBookingForm: BookingForm = {
  patient_id: '',
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  date_of_birth: '',
  gender_id: '',
  specialty_id: '',
  consultation_id: '',
  patient_visit_purpose_id: '',
  appointment_time: '',
  appointment_day: '',
  user_id: '',
  booking_timeslot_id: '',
  actual_appointment_time: '',
  comment: '',
  type: 'consultation',
  book_for: 'self',
};

function asText(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function toDisplayDateTime(value?: string | null): string {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

function toDisplayDate(value?: string | null): string {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString();
}

function normalizeTimeInput(value: string): string {
  const raw = asText(value);
  if (!raw) return '';
  const hhmm = raw.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  if (hhmm) {
    return `${hhmm[1].padStart(2, '0')}:${hhmm[2]}`;
  }
  const ampm = raw.match(/^(\d{1,2}):([0-5]\d)\s*(AM|PM)$/i);
  if (ampm) {
    let hour = Number(ampm[1]);
    const minute = ampm[2];
    const marker = ampm[3].toUpperCase();
    if (marker === 'AM') {
      if (hour === 12) hour = 0;
    } else if (hour < 12) {
      hour += 12;
    }
    if (hour >= 0 && hour <= 23) {
      return `${String(hour).padStart(2, '0')}:${minute}`;
    }
  }
  return '';
}

function softenColor(color: string, alpha = 0.22): string {
  const value = asText(color).replace('#', '');
  if (value.length !== 6) return `rgba(219, 234, 254, ${alpha})`;
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  if ([red, green, blue].some((part) => Number.isNaN(part))) return `rgba(219, 234, 254, ${alpha})`;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function startOfWeek(date: Date): Date {
  const next = new Date(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  next.setHours(0, 0, 0, 0);
  return next;
}

function toDayName(value: string): string {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, { weekday: 'long' });
}

function dayIdFromName(dayName: string): string {
  const map: Record<string, string> = {
    Monday: '1',
    Tuesday: '2',
    Wednesday: '3',
    Thursday: '4',
    Friday: '5',
    Saturday: '6',
    Sunday: '7',
  };
  return map[dayName] || '';
}

function endOfWeek(date: Date): Date {
  const next = startOfWeek(date);
  next.setDate(next.getDate() + 6);
  next.setHours(23, 59, 59, 999);
  return next;
}

function startOfMonth(date: Date): Date {
  const next = new Date(date);
  next.setDate(1);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfMonth(date: Date): Date {
  const next = startOfMonth(date);
  next.setMonth(next.getMonth() + 1);
  next.setDate(0);
  next.setHours(23, 59, 59, 999);
  return next;
}

function computeConflicts(tasks: PlannerTask[]): ConflictGroup[] {
  const tasksByUser = new Map<string, PlannerTask[]>();
  tasks.forEach((task) => {
    const userId = asText(task.user_id);
    if (!userId) return;
    const list = tasksByUser.get(userId) || [];
    list.push(task);
    tasksByUser.set(userId, list);
  });

  const conflicts: ConflictGroup[] = [];
  for (const [userId, rows] of tasksByUser.entries()) {
    const ordered = rows
      .slice()
      .sort((left, right) => new Date(asText(left.start)).getTime() - new Date(asText(right.start)).getTime());
    let cluster: PlannerTask[] = [];
    let clusterStart = 0;
    let clusterEnd = 0;
    for (const task of ordered) {
      const start = new Date(asText(task.start)).getTime();
      const end = new Date(asText(task.end || task.start)).getTime();
      if (!Number.isFinite(start) || !Number.isFinite(end)) continue;
      if (!cluster.length) {
        cluster = [task];
        clusterStart = start;
        clusterEnd = end;
        continue;
      }
      if (start < clusterEnd) {
        cluster.push(task);
        clusterEnd = Math.max(clusterEnd, end);
        continue;
      }
      if (cluster.length > 1) {
        conflicts.push({
          key: `${userId}-${clusterStart}`,
          userId,
          userName: asText(cluster[0]?.user) || 'Assigned user',
          start: new Date(clusterStart).toISOString(),
          end: new Date(clusterEnd).toISOString(),
          tasks: cluster,
        });
      }
      cluster = [task];
      clusterStart = start;
      clusterEnd = end;
    }
    if (cluster.length > 1) {
      conflicts.push({
        key: `${userId}-${clusterStart}`,
        userId,
        userName: asText(cluster[0]?.user) || 'Assigned user',
        start: new Date(clusterStart).toISOString(),
        end: new Date(clusterEnd).toISOString(),
        tasks: cluster,
      });
    }
  }
  return conflicts;
}

export default function SessionsPlanner() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [bootstrap, setBootstrap] = useState<PlannerBootstrapResponse>({});
  const [appointmentBootstrap, setAppointmentBootstrap] = useState<AppointmentBootstrapResponse>({});
  const [schedule, setSchedule] = useState<SetupPlannerResponse>({});
  const [typeFilter, setTypeFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [patientFilter, setPatientFilter] = useState('');
  const [surfaceView, setSurfaceView] = useState<'timeline' | 'calendar'>('timeline');
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()));
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [selectedTask, setSelectedTask] = useState<PlannerTask | null>(null);
  const [selectedDayBucket, setSelectedDayBucket] = useState<{ label: string; tasks: PlannerTask[] } | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetail | null>(null);
  const [showConflicts, setShowConflicts] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createMode, setCreateMode] = useState<CreateMode>('existing');
  const [bookingForm, setBookingForm] = useState<BookingForm>(emptyBookingForm);
  const [patientSearch, setPatientSearch] = useState('');
  const [patientSearchOptions, setPatientSearchOptions] = useState<PatientSearchRow[]>([]);
  const [consultationOptions, setConsultationOptions] = useState<ConsultationOption[]>([]);
  const [appointmentDoctorOptions, setAppointmentDoctorOptions] = useState<DoctorAvailability[]>([]);
  const [appointmentDoctorSearch, setAppointmentDoctorSearch] = useState('');
  const [isFollowupOpen, setIsFollowupOpen] = useState(false);
  const [isSavingFollowup, setIsSavingFollowup] = useState(false);
  const [followupSearch, setFollowupSearch] = useState('');
  const [followupPatientOptions, setFollowupPatientOptions] = useState<PatientSearchRow[]>([]);
  const [selectedFollowupPatient, setSelectedFollowupPatient] = useState<PatientSearchRow | null>(null);
  const [followupVisitOptions, setFollowupVisitOptions] = useState<Array<{ id: string; label: string }>>([]);
  const [followupSpecialties, setFollowupSpecialties] = useState<GenericOption[]>([]);
  const [followupDoctors, setFollowupDoctors] = useState<GenericOption[]>([]);
  const [allFollowupDoctors, setAllFollowupDoctors] = useState<GenericOption[]>([]);
  const [followupForm, setFollowupForm] = useState({
    patient_visit_id: '',
    date_of_visit: '',
    description: '',
    comment: '',
    specialty_id: '',
    user_id: '',
  });
  const [rescheduleTarget, setRescheduleTarget] = useState<BookingRow | null>(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    appointment_time: '',
    appointment_day: '',
    user_id: '',
    booking_timeslot_id: '',
    actual_appointment_time: '',
    inform_patient: 'none',
  });
  const [rescheduleDoctors, setRescheduleDoctors] = useState<DoctorAvailability[]>([]);
  const [rescheduleDoctorSearch, setRescheduleDoctorSearch] = useState('');
  const [createVisitTarget, setCreateVisitTarget] = useState<BookingRow | null>(null);
  const [createVisitPolicies, setCreateVisitPolicies] = useState<InsurancePolicyRow[]>([]);
  const [createVisitSelectedTaskIds, setCreateVisitSelectedTaskIds] = useState<string[]>([]);
  const [createVisitForm, setCreateVisitForm] = useState({
    sponsor_alternative: false,
    patient_insurance_profile_policy_id: '',
    insurance_profile_policy_id: '',
    claim_code: '',
    insurance_card_name: '',
    insurance_card_serial: '',
    insurance_number: '',
    scheme_number: '',
    copay: false,
    date_of_issue: '',
    date_of_renewal: '',
  });
  const timelineStripRef = useRef<HTMLDivElement | null>(null);

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

  const loadPlanner = useCallback(async () => {
    const [plannerResponse, setupResponse] = await Promise.all([
      api.get<PlannerBootstrapResponse>('/legacy/sessions/planner/'),
      api.get<SetupPlannerResponse>('/legacy/sessions/setup-planner/'),
    ]);
    setBootstrap(plannerResponse || {});
    setSchedule(setupResponse || {});
    const groups = Array.isArray(plannerResponse?.planners) ? plannerResponse.planners : [];
    setExpandedGroups((current) => {
      if (Object.keys(current).length) return current;
      const next: Record<string, boolean> = {};
      groups.forEach((group, index) => {
        next[group.id] = index < 2;
      });
      next.booking = true;
      return next;
    });
  }, []);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      setError(null);
      try {
        await loadPlanner();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load sessions planner.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadPlanner]);

  const allTasks = useMemo(() => (Array.isArray(schedule.task) ? schedule.task : []), [schedule.task]);
  const resources = useMemo(() => (Array.isArray(schedule.resource) ? schedule.resource : []), [schedule.resource]);
  const bookings = useMemo(() => (Array.isArray(bootstrap.booking) ? bootstrap.booking : []), [bootstrap.booking]);
  const plannerGroups = useMemo(() => (Array.isArray(bootstrap.planners) ? bootstrap.planners : []), [bootstrap.planners]);

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (typeFilter && asText(task.resource) !== typeFilter) return false;
      if (doctorFilter && asText(task.user_id) !== doctorFilter) return false;
      if (patientFilter && asText(task.patient_id) !== patientFilter) return false;
      return true;
    });
  }, [allTasks, typeFilter, doctorFilter, patientFilter]);

  const tasksByDay = useMemo(() => {
    const buckets = new Map<string, PlannerTask[]>();
    filteredTasks.forEach((task) => {
      const parsed = new Date(asText(task.start));
      if (Number.isNaN(parsed.getTime())) return;
      const key = parsed.toISOString().slice(0, 10);
      const current = buckets.get(key) || [];
      current.push(task);
      buckets.set(key, current);
    });
    return Array.from(buckets.entries())
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([dateKey, rows]) => ({
        dateKey,
        rows: rows
          .slice()
          .sort((left, right) => new Date(asText(left.start)).getTime() - new Date(asText(right.start)).getTime()),
      }));
  }, [filteredTasks]);

  const calendarMonthLabel = useMemo(
    () => calendarMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
    [calendarMonth],
  );

  const calendarWeekLabel = useMemo(() => {
    const start = startOfWeek(calendarMonth);
    const end = endOfWeek(calendarMonth);
    const startLabel = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const endLabel = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startLabel} - ${endLabel}`;
  }, [calendarMonth]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(calendarMonth);
    const monthEnd = endOfMonth(calendarMonth);
    const gridStart = startOfWeek(monthStart);
    const gridEnd = endOfWeek(monthEnd);
    const taskMap = new Map<string, PlannerTask[]>();

    filteredTasks.forEach((task) => {
      const parsed = new Date(asText(task.start));
      if (Number.isNaN(parsed.getTime())) return;
      const key = parsed.toISOString().slice(0, 10);
      const current = taskMap.get(key) || [];
      current.push(task);
      taskMap.set(key, current);
    });

    const days: Array<{
      key: string;
      date: Date;
      inMonth: boolean;
      isToday: boolean;
      tasks: PlannerTask[];
    }> = [];
    const cursor = new Date(gridStart);
    const todayKey = new Date().toISOString().slice(0, 10);

    while (cursor <= gridEnd) {
      const key = cursor.toISOString().slice(0, 10);
      days.push({
        key,
        date: new Date(cursor),
        inMonth: cursor.getMonth() === monthStart.getMonth(),
        isToday: key === todayKey,
        tasks: (taskMap.get(key) || [])
          .slice()
          .sort((left, right) => new Date(asText(left.start)).getTime() - new Date(asText(right.start)).getTime()),
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    return days;
  }, [calendarMonth, filteredTasks]);

  const calendarWeekDays = useMemo(() => {
    const weekStart = startOfWeek(calendarMonth);
    const taskMap = new Map<string, PlannerTask[]>();

    filteredTasks.forEach((task) => {
      const parsed = new Date(asText(task.start));
      if (Number.isNaN(parsed.getTime())) return;
      const key = parsed.toISOString().slice(0, 10);
      const current = taskMap.get(key) || [];
      current.push(task);
      taskMap.set(key, current);
    });

    const todayKey = new Date().toISOString().slice(0, 10);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      const key = date.toISOString().slice(0, 10);
      return {
        key,
        date,
        isToday: key === todayKey,
        tasks: (taskMap.get(key) || [])
          .slice()
          .sort((left, right) => new Date(asText(left.start)).getTime() - new Date(asText(right.start)).getTime()),
      };
    });
  }, [calendarMonth, filteredTasks]);

  const conflicts = useMemo(() => computeConflicts(filteredTasks), [filteredTasks]);

  const bookingDetailPatientName = useMemo(() => {
    if (!selectedBooking) return 'Unknown patient';
    if (typeof selectedBooking.patient === 'string') return asText(selectedBooking.patient) || 'Unknown patient';
    return (
      asText(selectedBooking.patient_name) ||
      `${asText(selectedBooking.patient?.first_name)} ${asText(selectedBooking.patient?.last_name)}`.trim() ||
      `${asText(selectedBooking.first_name)} ${asText(selectedBooking.last_name)}`.trim() ||
      'Unknown patient'
    );
  }, [selectedBooking]);

  const bookingDetailSpecialty = useMemo(() => {
    if (!selectedBooking) return 'N/A';
    if (typeof selectedBooking.specialty === 'string') return asText(selectedBooking.specialty) || 'N/A';
    return asText(selectedBooking.specialty?.name) || 'N/A';
  }, [selectedBooking]);

  const bookingDetailPurpose = useMemo(
    () => asText(selectedBooking?.purpose) || asText(selectedBooking?.patient_visit_purpose?.name) || 'No purpose selected',
    [selectedBooking],
  );

  const bookingDetailDoctor = useMemo(
    () =>
      asText(selectedBooking?.doctor) ||
      asText(selectedBooking?.user?.full_name) ||
      `${asText(selectedBooking?.user?.first_name)} ${asText(selectedBooking?.user?.last_name)}`.trim() ||
      'Unassigned',
    [selectedBooking],
  );

  const bookingDetailAppointment = useMemo(() => {
    const appointment = asText(selectedBooking?.appointment);
    if (appointment) return appointment;
    const dateValue = asText(selectedBooking?.appointment_time) || asText(selectedBooking?.appointment_date);
    return toDisplayDateTime(dateValue || undefined);
  }, [selectedBooking]);

  const selectedTaskBooking = useMemo(() => {
    if (!selectedTask) return null;
    const taskId = asText(selectedTask.task_id);
    const resource = asText(selectedTask.resource).toLowerCase();
    const direct = bookings.find((row) => asText(row.id) === taskId);
    if (direct) return direct;
    if (!resource.includes('booking')) return null;
    const taskPatientId = asText(selectedTask.patient_id);
    const taskDate = asText(selectedTask.start).slice(0, 10);
    return (
      bookings.find((row) => {
        const samePatient = taskPatientId && asText(row.patient_id) === taskPatientId;
        const sameDate = taskDate && asText(row.appointment_time).slice(0, 10) === taskDate;
        return Boolean(samePatient && sameDate);
      }) || null
    );
  }, [selectedTask, bookings]);

  const createVisitPendingTasks = useMemo(() => {
    if (!createVisitTarget) return [];
    const patientId = asText(createVisitTarget.patient_id);
    if (!patientId) return [];
    const today = new Date().toISOString().slice(0, 10);
    return allTasks
      .filter((task) => asText(task.patient_id) === patientId)
      .filter((task) => asText(task.start).slice(0, 10) === today)
      .filter((task) => asText(task.task_id))
      .sort((a, b) => new Date(asText(a.start)).getTime() - new Date(asText(b.start)).getTime());
  }, [createVisitTarget, allTasks]);

  const totalPendingWeek = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    return filteredTasks.filter((task) => {
      if (asText(task.resource) === 'booking') return false;
      const parsed = new Date(asText(task.date || task.start));
      if (Number.isNaN(parsed.getTime())) return false;
      return parsed >= weekStart && parsed <= weekEnd;
    }).length;
  }, [filteredTasks]);

  const doctorOptions = useMemo(() => {
    const map = new Map<string, string>();
    allTasks.forEach((task) => {
      const id = asText(task.user_id);
      if (!id) return;
      if (!map.has(id)) {
        map.set(id, asText(task.user) || id);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name })).sort((left, right) => left.name.localeCompare(right.name));
  }, [allTasks]);

  const patientOptions = useMemo(() => {
    const map = new Map<string, string>();
    allTasks.forEach((task) => {
      const id = asText(task.patient_id);
      if (!id) return;
      if (!map.has(id)) {
        map.set(id, asText(task.patient) || id);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name })).sort((left, right) => left.name.localeCompare(right.name));
  }, [allTasks]);

  const filteredRescheduleDoctors = useMemo(() => {
    const search = rescheduleDoctorSearch.trim().toLowerCase();
    return rescheduleDoctors
      .filter((doctor) => {
        const hasSlots = Array.isArray(doctor.availability) && doctor.availability.length > 0;
        if (!search) return hasSlots;
        const name = asText(doctor.user.full_name) || `${asText(doctor.user.first_name)} ${asText(doctor.user.last_name)}`.trim() || asText(doctor.user.id);
        return name.toLowerCase().includes(search);
      });
  }, [rescheduleDoctors, rescheduleDoctorSearch]);

  const filteredAppointmentDoctors = useMemo(() => {
    const search = appointmentDoctorSearch.trim().toLowerCase();
    return appointmentDoctorOptions
      .filter((doctor) => {
        const hasSlots = Array.isArray(doctor.availability) && doctor.availability.length > 0;
        if (!search) return hasSlots;
        const name = asText(doctor.user.full_name) || `${asText(doctor.user.first_name)} ${asText(doctor.user.last_name)}`.trim() || asText(doctor.user.id);
        return name.toLowerCase().includes(search);
      });
  }, [appointmentDoctorOptions, appointmentDoctorSearch]);

  const selectedAppointmentDoctor = useMemo(
    () => appointmentDoctorOptions.find((doctor) => asText(doctor.user.id) === asText(bookingForm.user_id)) || null,
    [appointmentDoctorOptions, bookingForm.user_id],
  );

  const selectedAppointmentSlotLabel = useMemo(() => {
    if (!selectedAppointmentDoctor || !asText(bookingForm.booking_timeslot_id)) return '';
    const slot = selectedAppointmentDoctor.availability.find((item) => asText(item.id) === asText(bookingForm.booking_timeslot_id));
    return asText(slot?.booking_timeslot_value);
  }, [selectedAppointmentDoctor, bookingForm.booking_timeslot_id]);

  const selectedRescheduleDoctor = useMemo(
    () => rescheduleDoctors.find((doctor) => asText(doctor.user.id) === asText(rescheduleForm.user_id)) || null,
    [rescheduleDoctors, rescheduleForm.user_id],
  );

  const selectedRescheduleSlotLabel = useMemo(() => {
    if (!selectedRescheduleDoctor || !asText(rescheduleForm.booking_timeslot_id)) return '';
    const slot = selectedRescheduleDoctor.availability.find((item) => asText(item.id) === asText(rescheduleForm.booking_timeslot_id));
    return asText(slot?.booking_timeslot_value);
  }, [selectedRescheduleDoctor, rescheduleForm.booking_timeslot_id]);

  const openBookingDetails = async (bookingId: string) => {
    clearFeedback();
    try {
      const detail = await api.get<BookingDetail>(`/legacy/book/view-booking-details/${encodeURIComponent(bookingId)}/`);
      setSelectedBooking(detail || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load booking details.');
    }
  };

  useEffect(() => {
    if (!patientSearch.trim() || createMode !== 'existing' || !isCreateOpen) {
      setPatientSearchOptions([]);
      return;
    }
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        params.set('searchValue', patientSearch.trim());
        params.set('limit', '8');
        const response = await api.get<PatientSearchRow[]>(`/legacy/patients/view-patients/?${params.toString()}`);
        setPatientSearchOptions(Array.isArray(response) ? response : []);
      } catch {
        setPatientSearchOptions([]);
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [createMode, isCreateOpen, patientSearch]);

  useEffect(() => {
    if (!followupSearch.trim() || !isFollowupOpen) {
      setFollowupPatientOptions([]);
      return;
    }
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        params.set('searchValue', followupSearch.trim());
        params.set('limit', '8');
        const response = await api.get<PatientSearchRow[]>(`/legacy/patients/view-patients/?${params.toString()}`);
        setFollowupPatientOptions(Array.isArray(response) ? response : []);
      } catch {
        setFollowupPatientOptions([]);
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [followupSearch, isFollowupOpen]);

  useEffect(() => {
    const specialtyId = asText(bookingForm.specialty_id);
    if (!specialtyId || !isCreateOpen) {
      setConsultationOptions([]);
      return;
    }
    void (async () => {
      try {
        const response = await api.get<{ consultations?: ConsultationOption[] }>(
          `/legacy/book/get-consultations-by-specialty/${encodeURIComponent(specialtyId)}/`,
        );
        setConsultationOptions(Array.isArray(response?.consultations) ? response.consultations : []);
      } catch {
        setConsultationOptions([]);
      }
    })();
  }, [bookingForm.specialty_id, isCreateOpen]);

  useEffect(() => {
    const specialtyId = asText(bookingForm.specialty_id);
    const appointmentDate = asText(bookingForm.appointment_time);
    const appointmentDay = asText(bookingForm.appointment_day);
    if (!specialtyId || !appointmentDate || !appointmentDay || !isCreateOpen) {
      setAppointmentDoctorOptions([]);
      return;
    }
    const dayId = dayIdFromName(appointmentDay);
    if (!dayId) {
      setAppointmentDoctorOptions([]);
      return;
    }
    void (async () => {
      try {
        const params = new URLSearchParams();
        params.set('date', appointmentDate);
        const response = await api.get<DoctorAvailability[]>(
          `/legacy/book/get-available-doctors/${encodeURIComponent(specialtyId)}/${encodeURIComponent(dayId)}/?${params.toString()}`,
        );
        setAppointmentDoctorOptions(Array.isArray(response) ? response : []);
      } catch {
        setAppointmentDoctorOptions([]);
      }
    })();
  }, [bookingForm.appointment_day, bookingForm.appointment_time, bookingForm.specialty_id, isCreateOpen]);

  useEffect(() => {
    const specialtyId = asText(followupForm.specialty_id);
    if (!isFollowupOpen) return;
    if (!specialtyId) {
      setFollowupDoctors(allFollowupDoctors);
      return;
    }
    void (async () => {
      try {
        const response = await api.get<GenericOption[]>(
          `/legacy/users/view-users-specialty/?specialty_id=${encodeURIComponent(specialtyId)}&limit=200`,
        );
        setFollowupDoctors(Array.isArray(response) ? response : []);
      } catch {
        setFollowupDoctors(allFollowupDoctors);
      }
    })();
  }, [followupForm.specialty_id, isFollowupOpen, allFollowupDoctors]);

  useEffect(() => {
    const specialtyId = asText(rescheduleTarget?.specialty_id);
    const appointmentDate = asText(rescheduleForm.appointment_time);
    const appointmentDay = asText(rescheduleForm.appointment_day);
    if (!rescheduleTarget || !specialtyId || !appointmentDate || !appointmentDay) {
      setRescheduleDoctors([]);
      return;
    }
    const dayId = dayIdFromName(appointmentDay);
    if (!dayId) {
      setRescheduleDoctors([]);
      return;
    }
    void (async () => {
      try {
        const params = new URLSearchParams();
        params.set('date', appointmentDate);
        const response = await api.get<DoctorAvailability[]>(
          `/legacy/book/get-available-doctors/${encodeURIComponent(specialtyId)}/${encodeURIComponent(dayId)}/?${params.toString()}`,
        );
        setRescheduleDoctors(Array.isArray(response) ? response : []);
      } catch {
        setRescheduleDoctors([]);
      }
    })();
  }, [rescheduleForm.appointment_day, rescheduleForm.appointment_time, rescheduleTarget]);

  useEffect(() => {
    const doctorStillAvailable = rescheduleDoctors.some(
      (doctor) =>
        asText(doctor.user.id) === asText(rescheduleForm.user_id) &&
        Array.isArray(doctor.availability) &&
        doctor.availability.length > 0,
    );
    if (!doctorStillAvailable && asText(rescheduleForm.user_id)) {
      setRescheduleForm((current) => ({
        ...current,
        user_id: '',
        booking_timeslot_id: '',
        actual_appointment_time: '',
      }));
    }
  }, [rescheduleDoctors, rescheduleForm.user_id]);

  useEffect(() => {
    if (surfaceView !== 'timeline' || !tasksByDay.length) return;
    const container = timelineStripRef.current;
    if (!container) return;
    const todayKey = new Date().toISOString().slice(0, 10);
    const targetBucket =
      tasksByDay.find((bucket) => bucket.dateKey >= todayKey)?.dateKey ||
      tasksByDay[tasksByDay.length - 1]?.dateKey;
    if (!targetBucket) return;
    const node = container.querySelector<HTMLElement>(`[data-bucket-key="${targetBucket}"]`);
    if (!node) return;
    const nextLeft = Math.max(0, node.offsetLeft - 8);
    container.scrollTo({ left: nextLeft, behavior: 'smooth' });
  }, [surfaceView, tasksByDay]);

  const openCreateAppointment = async () => {
    clearFeedback();
    setCreateMode('existing');
    setBookingForm(emptyBookingForm);
    setPatientSearch('');
    setPatientSearchOptions([]);
    setConsultationOptions([]);
    setAppointmentDoctorOptions([]);
    setAppointmentDoctorSearch('');
    try {
      const response = await api.get<AppointmentBootstrapResponse>('/legacy/book/manage-appointments/');
      setAppointmentBootstrap(response || {});
    } catch {
      setAppointmentBootstrap({});
    }
    setIsCreateOpen(true);
  };

  const closeCreateAppointment = () => {
    setIsCreateOpen(false);
    setCreateMode('existing');
    setBookingForm(emptyBookingForm);
    setPatientSearch('');
    setPatientSearchOptions([]);
    setConsultationOptions([]);
    setAppointmentDoctorOptions([]);
    setAppointmentDoctorSearch('');
  };

  const pickPatient = (patient: PatientSearchRow) => {
    const fullName = `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim() || asText(patient.name);
    setBookingForm((current) => ({
      ...current,
      patient_id: patient.id,
      first_name: asText(patient.first_name) || fullName,
      last_name: asText(patient.last_name),
      phone: asText(patient.phone),
      email: asText(patient.email),
      date_of_birth: asText(patient.date_of_birth),
      gender_id: asText(patient.gender_id),
    }));
    setPatientSearch(fullName);
    setPatientSearchOptions([]);
  };

  const openCreateFollowup = async () => {
    clearFeedback();
    setFollowupSearch('');
    setFollowupPatientOptions([]);
    setSelectedFollowupPatient(null);
    setFollowupVisitOptions([]);
    setFollowupForm({
      patient_visit_id: '',
      date_of_visit: '',
      description: '',
      comment: '',
      specialty_id: '',
      user_id: '',
    });
    try {
      const [specialties, users] = await Promise.all([
        api.get<GenericOption[]>('/legacy/patients/get-specialties/?limit=400'),
        api.get<GenericOption[]>('/legacy/patients/get-users/?limit=400'),
      ]);
      const specialtyRows = Array.isArray(specialties) ? specialties : [];
      const userRows = Array.isArray(users) ? users : [];
      const doctorRows = userRows.filter((user) => asText((user as Record<string, unknown>).role_id) === '1');
      setFollowupSpecialties(specialtyRows);
      setAllFollowupDoctors(doctorRows);
      setFollowupDoctors(doctorRows);
    } catch {
      setFollowupSpecialties([]);
      setAllFollowupDoctors([]);
      setFollowupDoctors([]);
    }
    setIsFollowupOpen(true);
  };

  const closeCreateFollowup = () => {
    setIsFollowupOpen(false);
    setFollowupSearch('');
    setFollowupPatientOptions([]);
    setSelectedFollowupPatient(null);
    setFollowupVisitOptions([]);
    setFollowupSpecialties([]);
    setFollowupDoctors([]);
    setAllFollowupDoctors([]);
    setFollowupForm({
      patient_visit_id: '',
      date_of_visit: '',
      description: '',
      comment: '',
      specialty_id: '',
      user_id: '',
    });
  };

  const pickFollowupPatient = async (patient: PatientSearchRow) => {
    const fullName = `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim() || asText(patient.name);
    setSelectedFollowupPatient(patient);
    setFollowupSearch(fullName);
    setFollowupPatientOptions([]);
    setFollowupVisitOptions([]);
    setFollowupForm((current) => ({ ...current, patient_visit_id: '' }));
    try {
      const params = new URLSearchParams();
      params.set('patient_id', patient.id);
      const response = await api.get<FollowupBootstrapResponse>(`/legacy/patients/visit-space/?${params.toString()}`);
      const visits = Array.isArray(response?.visits) ? response.visits : [];
      setFollowupVisitOptions(
        visits
          .map((visit) => {
            const id = asText(visit.id);
            if (!id) return null;
            const date = toDisplayDate(visit.date_of_visit);
            const purpose = asText(visit.purpose) || 'Visit';
            const outcome = asText(visit.visit_outcome);
            return {
              id,
              label: `${date} - ${purpose}${outcome ? ` (${outcome})` : ''}`,
            };
          })
          .filter((row): row is { id: string; label: string } => Boolean(row)),
      );
    } catch {
      setFollowupVisitOptions([]);
    }
  };

  const submitCreateAppointment = async (event: FormEvent) => {
    event.preventDefault();
    clearFeedback();
    setIsCreatingAppointment(true);
    try {
      await api.post('/legacy/book/save-booking/', {
        patient_id: bookingForm.patient_id || undefined,
        first_name: bookingForm.first_name,
        last_name: bookingForm.last_name,
        phone: bookingForm.phone,
        email: bookingForm.email,
        date_of_birth: bookingForm.date_of_birth || undefined,
        gender_id: bookingForm.gender_id || undefined,
        specialty_id: bookingForm.specialty_id,
        service_id: bookingForm.consultation_id,
        patient_visit_purpose_id: bookingForm.patient_visit_purpose_id || undefined,
        appointment_time: bookingForm.appointment_time,
        appointment_day: bookingForm.appointment_day,
        user_id: bookingForm.user_id,
        booking_timeslot_id: bookingForm.booking_timeslot_id,
        actual_appointment_time: bookingForm.actual_appointment_time || undefined,
        comment: bookingForm.comment,
        type: bookingForm.type,
        book_for: bookingForm.book_for,
      });
      setSuccess('Appointment created successfully.');
      closeCreateAppointment();
      await loadPlanner();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create appointment.');
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  const submitCreateFollowup = async (event: FormEvent) => {
    event.preventDefault();
    if (!asText(followupForm.patient_visit_id) || !asText(followupForm.date_of_visit) || !asText(followupForm.description)) return;
    clearFeedback();
    setIsSavingFollowup(true);
    try {
      await api.post('/legacy/patients/save-patient-followups/', {
        id: `planner_followup_${Date.now()}`,
        patient_visit_id: followupForm.patient_visit_id,
        date_of_visit: followupForm.date_of_visit,
        description: followupForm.description.trim(),
        comment: asText(followupForm.comment) || undefined,
        specialty_id: asText(followupForm.specialty_id) || undefined,
        user_id: asText(followupForm.user_id) || undefined,
      });
      setSuccess('Follow-up created successfully.');
      closeCreateFollowup();
      await loadPlanner();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create follow-up.');
    } finally {
      setIsSavingFollowup(false);
    }
  };

  const openReschedule = (row: BookingRow) => {
    clearFeedback();
    const appointmentDate = asText(row.appointment_time).slice(0, 10);
    setRescheduleTarget(row);
    setRescheduleForm({
      appointment_time: appointmentDate,
      appointment_day: toDayName(appointmentDate),
      user_id: '',
      booking_timeslot_id: '',
      actual_appointment_time: normalizeTimeInput(asText(row.appointment_time)),
      inform_patient: 'none',
    });
    setRescheduleDoctors([]);
    setRescheduleDoctorSearch('');
  };

  const submitReschedule = async (event: FormEvent) => {
    event.preventDefault();
    if (!rescheduleTarget) return;
    clearFeedback();
    setIsSaving(true);
    try {
      await api.post('/legacy/book/update-booking/', {
        id: rescheduleTarget.id,
        appointment_time: rescheduleForm.appointment_time,
        appointment_day: rescheduleForm.appointment_day,
        user_id: rescheduleForm.user_id || undefined,
        booking_timeslot_id: rescheduleForm.booking_timeslot_id,
        actual_appointment_time: rescheduleForm.actual_appointment_time || undefined,
        specialty_id: rescheduleTarget.specialty_id || undefined,
        inform_patient: rescheduleForm.inform_patient,
      });
      setSuccess('Reschedule successfully completed.');
      setRescheduleTarget(null);
      await loadPlanner();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reschedule booking.');
    } finally {
      setIsSaving(false);
    }
  };

  const openCreateVisit = async (row: BookingRow) => {
    clearFeedback();
    setCreateVisitTarget(row);
    setCreateVisitPolicies([]);
    setCreateVisitSelectedTaskIds([]);
    setCreateVisitForm({
      sponsor_alternative: false,
      patient_insurance_profile_policy_id: '',
      insurance_profile_policy_id: '',
      claim_code: '',
      insurance_card_name: '',
      insurance_card_serial: '',
      insurance_number: '',
      scheme_number: '',
      copay: false,
      date_of_issue: '',
      date_of_renewal: '',
    });
    try {
      const response = await api.get<InsurancePolicyRow[] | false>(
        `/legacy/book/get-appointment-patient-details/${encodeURIComponent(row.id)}/`,
      );
      if (Array.isArray(response)) {
        setCreateVisitPolicies(response);
        if (response[0]?.id) {
          setCreateVisitForm((current) => ({
            ...current,
            patient_insurance_profile_policy_id: asText(response[0].id),
          }));
        }
      }
    } catch {
      setCreateVisitPolicies([]);
    }
  };

  const submitCreateVisit = async (event: FormEvent) => {
    event.preventDefault();
    if (!createVisitTarget) return;
    clearFeedback();
    setIsSaving(true);
    try {
      const response = await api.post<{ patient_id?: string; patient_visit_id?: string }>(
        '/legacy/book/create-appointment-visit/',
        {
          id: createVisitTarget.id,
          sponsor_alternative: createVisitForm.sponsor_alternative,
          patient_insurance_profile_policy_id: createVisitForm.sponsor_alternative ? undefined : (createVisitForm.patient_insurance_profile_policy_id || undefined),
          insurance_profile_policy_id: createVisitForm.sponsor_alternative ? (createVisitForm.insurance_profile_policy_id || undefined) : undefined,
          claim_code: createVisitForm.claim_code || undefined,
          insurance_card_name: createVisitForm.sponsor_alternative ? (createVisitForm.insurance_card_name || undefined) : undefined,
          insurance_card_serial: createVisitForm.sponsor_alternative ? (createVisitForm.insurance_card_serial || undefined) : undefined,
          insurance_number: createVisitForm.sponsor_alternative ? (createVisitForm.insurance_number || undefined) : undefined,
          scheme_number: createVisitForm.sponsor_alternative ? (createVisitForm.scheme_number || undefined) : undefined,
          copay: createVisitForm.sponsor_alternative ? createVisitForm.copay : undefined,
          date_of_issue: createVisitForm.sponsor_alternative ? (createVisitForm.date_of_issue || undefined) : undefined,
          date_of_renewal: createVisitForm.sponsor_alternative ? (createVisitForm.date_of_renewal || undefined) : undefined,
          planner_task_ids: createVisitSelectedTaskIds,
        },
      );
      setSuccess('Visit created successfully.');
      setCreateVisitTarget(null);
      setCreateVisitSelectedTaskIds([]);
      await loadPlanner();
      if (asText(response?.patient_id) && asText(response?.patient_visit_id)) {
        navigate(
          `/Patients/visit_space?patient_id=${encodeURIComponent(asText(response?.patient_id))}&visit_id=${encodeURIComponent(asText(response?.patient_visit_id))}`,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create visit from planner.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-600">Loading sessions planner...</div>;
  }

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Sessions</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Planner</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Live scheduling view for bookings and recurring clinical sessions. The planner keeps the calendar, conflict review, and
              conversion to visit on one working surface.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void loadPlanner()}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Refresh Planner
            </button>
            <button
              type="button"
              onClick={() => void openCreateAppointment()}
              className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700"
            >
              Create Appointment
            </button>
            <button
              type="button"
              onClick={() => void openCreateFollowup()}
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
            >
              Create Follow-Up
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
        ) : null}
        {success ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
        ) : null}

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-amber-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Active Records</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredTasks.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-sky-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Week Sessions</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{totalPendingWeek}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-emerald-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Completion Rate</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{Number(schedule.completionRate || 0).toFixed(2)}%</p>
          </div>
          <button
            type="button"
            onClick={() => setShowConflicts(true)}
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Conflicts</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{conflicts.length}</p>
            <p className="mt-1 text-xs font-semibold text-rose-700">Review overlapping assignments</p>
          </button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Type</label>
            <SearchableSelectField
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">All</option>
              {resources.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {asText(resource.name) || resource.id}
                </option>
              ))}
            </SearchableSelectField>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Doctor</label>
            <SearchableSelectField
              value={doctorFilter}
              onChange={(event) => setDoctorFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">All</option>
              {doctorOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </SearchableSelectField>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</label>
            <SearchableSelectField
              value={patientFilter}
              onChange={(event) => setPatientFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">All</option>
              {patientOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </SearchableSelectField>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Calendar Surface</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Upcoming timeline</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setSurfaceView('timeline')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  surfaceView === 'timeline' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Timeline
              </button>
              <button
                type="button"
                onClick={() => setSurfaceView('calendar')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  surfaceView === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Calendar
              </button>
            </div>
            {surfaceView === 'calendar' ? (
              <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setCalendarView('month')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                    calendarView === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Month
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarView('week')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                    calendarView === 'week' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Week
                </button>
              </div>
            ) : null}
            <p className="text-xs font-semibold text-slate-500">
              {surfaceView === 'timeline'
                ? `${tasksByDay.length} day bucket(s)`
                : calendarView === 'week'
                  ? calendarWeekLabel
                  : calendarMonthLabel}
            </p>
          </div>
        </div>

        {surfaceView === 'timeline' ? (
          !tasksByDay.length ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
              No planner events match the current filters.
            </div>
        ) : (
            <div ref={timelineStripRef} className="mt-4 overflow-x-auto pb-2">
              <div className="flex min-w-max gap-3">
              {tasksByDay.map((bucket) => (
                <div key={bucket.dateKey} data-bucket-key={bucket.dateKey} className="w-[20rem] shrink-0 rounded-2xl border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-900">{toDisplayDate(bucket.dateKey)}</h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{bucket.rows.length} item(s)</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {bucket.rows.slice(0, 4).map((task) => (
                      <button
                        key={asText(task.task_id)}
                        type="button"
                        onClick={() => setSelectedTask(task)}
                        className="w-full rounded-xl border p-3 text-left shadow-sm transition hover:-translate-y-0.5"
                        style={{
                          borderColor: `${asText(task.color) || '#cbd5e1'}55`,
                          backgroundColor: `${asText(task.color) || '#f8fafc'}18`,
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="truncate text-sm font-semibold text-slate-900">{asText(task.title) || 'Untitled task'}</p>
                            <p className="mt-1 text-[11px] font-semibold text-slate-500">{asText(task.resource) || 'Unknown type'}</p>
                          </div>
                          <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: asText(task.color) || '#94a3b8' }} />
                        </div>
                        <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                          <p>{toDisplayDateTime(task.start)}</p>
                          <p className="truncate">{asText(task.patient) || 'No patient linked'}</p>
                          <p className="truncate">{asText(task.user) || 'No assigned clinician'}</p>
                        </div>
                      </button>
                    ))}
                    {bucket.rows.length > 4 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDayBucket({
                            label: toDisplayDate(bucket.dateKey),
                            tasks: bucket.rows,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-700"
                      >
                        +{bucket.rows.length - 4} more
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
              </div>
            </div>
          )
        ) : (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCalendarMonth((current) => {
                  const next = new Date(current);
                  if (calendarView === 'week') {
                    next.setDate(next.getDate() - 7);
                    return next;
                  }
                  next.setMonth(next.getMonth() - 1);
                  return startOfMonth(next);
                })}
                className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Previous
              </button>
              <p className="text-sm font-semibold text-slate-900">{calendarView === 'week' ? calendarWeekLabel : calendarMonthLabel}</p>
              <button
                type="button"
                onClick={() => setCalendarMonth((current) => {
                  const next = new Date(current);
                  if (calendarView === 'week') {
                    next.setDate(next.getDate() + 7);
                    return next;
                  }
                  next.setMonth(next.getMonth() + 1);
                  return startOfMonth(next);
                })}
                className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Next
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
                <div key={label} className="rounded-xl bg-slate-50 px-2 py-2">
                  {label}
                </div>
              ))}
            </div>
            {calendarView === 'week' ? (
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-7">
                {calendarWeekDays.map((day) => (
                  <div key={day.key} className="min-h-[12rem] rounded-xl border border-slate-200 bg-white p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full px-2 text-xs font-semibold ${
                          day.isToday ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {day.date.getDate()}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">{day.tasks.length || ''}</span>
                    </div>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {day.date.toLocaleDateString(undefined, { month: 'short' })}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {day.tasks.slice(0, 4).map((task) => (
                        <button
                          key={asText(task.task_id)}
                          type="button"
                          onClick={() => setSelectedTask(task)}
                          className="w-full rounded-lg border px-2 py-1.5 text-left"
                          style={{
                            borderColor: `${asText(task.color) || '#cbd5e1'}55`,
                            backgroundColor: `${asText(task.color) || '#f8fafc'}18`,
                          }}
                        >
                          <p className="truncate text-[11px] font-semibold text-slate-900">{asText(task.title) || 'Untitled task'}</p>
                          <p className="mt-0.5 truncate text-[10px] text-slate-600">
                            {new Date(asText(task.start)).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </button>
                      ))}
                      {day.tasks.length > 4 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedDayBucket({
                              label: toDisplayDate(day.key),
                              tasks: day.tasks,
                            })
                          }
                          className="w-full rounded-lg bg-slate-100 px-2 py-1.5 text-left text-[10px] font-semibold text-slate-600"
                        >
                          +{day.tasks.length - 4} more
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
                {calendarDays.map((day) => (
                  <div
                    key={day.key}
                    className={`min-h-[7.75rem] rounded-xl border p-2.5 ${
                      day.inMonth ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full px-2 text-xs font-semibold ${
                          day.isToday ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {day.date.getDate()}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">{day.tasks.length || ''}</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {day.tasks.slice(0, 2).map((task) => (
                        <button
                          key={asText(task.task_id)}
                          type="button"
                          onClick={() => setSelectedTask(task)}
                          className="w-full rounded-lg border px-2 py-1.5 text-left"
                          style={{
                            borderColor: `${asText(task.color) || '#cbd5e1'}55`,
                            backgroundColor: `${asText(task.color) || '#f8fafc'}18`,
                          }}
                        >
                          <p className="truncate text-[11px] font-semibold text-slate-900">{asText(task.title) || 'Untitled task'}</p>
                          <p className="mt-0.5 truncate text-[10px] text-slate-600">
                            {new Date(asText(task.start)).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </button>
                      ))}
                      {day.tasks.length > 2 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedDayBucket({
                              label: toDisplayDate(day.key),
                              tasks: day.tasks,
                            })
                          }
                          className="w-full rounded-lg bg-slate-100 px-2 py-1.5 text-left text-[10px] font-semibold text-slate-600"
                        >
                          +{day.tasks.length - 2} more
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="grid items-start gap-4 xl:grid-cols-2">
        {plannerGroups.map((group) => {
          const isExpanded = expandedGroups[group.id] ?? false;
          const items = Array.isArray(group.items) ? group.items : [];
          return (
            <div key={group.id} className="self-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setExpandedGroups((current) => ({ ...current, [group.id]: !isExpanded }))}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                style={{ backgroundColor: asText(group.color) || '#f8fafc' }}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{asText(group.name) || group.id}</p>
                  <p className="mt-0.5 text-[11px] text-slate-600">{asText(group.description)}</p>
                </div>
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700">{items.length}</span>
              </button>
              {isExpanded ? (
                <div className="overflow-x-auto p-3">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-500">
                        <th className="py-2 pr-3">Date</th>
                        <th className="py-2 pr-3">Patient</th>
                        <th className="py-2 pr-3">Session</th>
                        <th className="py-2 pr-3">Assigned To</th>
                        <th className="py-2 pr-3">Start</th>
                        <th className="py-2 pr-3">Duration</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!items.length ? (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-slate-500">
                            No active records in this planner section.
                          </td>
                        </tr>
                      ) : null}
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="py-2.5 pr-3">{toDisplayDateTime(item.date_created)}</td>
                          <td className="py-3 pr-3">
                            {asText(item.patient_id) ? (
                              <Link to={`/Patients/view_patient?patient_id=${encodeURIComponent(asText(item.patient_id))}`} className="font-semibold text-sky-700 hover:underline">
                                {asText(item.patient) || 'Unknown patient'}
                              </Link>
                            ) : (
                              asText(item.patient) || 'Unknown patient'
                            )}
                          </td>
                          <td className="py-2.5 pr-3">{asText(item.title) || 'N/A'}</td>
                          <td className="py-2.5 pr-3">{asText(item.assigned_user) || 'Unassigned'}</td>
                          <td className="py-2.5 pr-3">{toDisplayDateTime(item.date)}</td>
                          <td className="py-2.5 pr-3">{Number(item.duration || 0) || 'N/A'}</td>
                          <td className="py-2.5">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{asText(item.status) || 'N/A'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          );
        })}

        <div className="self-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setExpandedGroups((current) => ({ ...current, booking: !(current.booking ?? true) }))}
            className="flex w-full items-center justify-between bg-sky-50 px-4 py-3 text-left"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">Patient Bookings</p>
              <p className="mt-0.5 text-[11px] text-slate-600">Patient facility bookings awaiting visit creation or rescheduling.</p>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">{bookings.length}</span>
          </button>
          {expandedGroups.booking ?? true ? (
            <div className="overflow-x-auto p-3">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-500">
                    <th className="py-2 pr-3">Actions</th>
                    <th className="py-2 pr-3">Appointment Date</th>
                    <th className="py-2 pr-3">Appointee</th>
                    <th className="py-2 pr-3">Specialty</th>
                    <th className="py-2 pr-3">Doctor</th>
                    <th className="py-2 pr-3">Email / Phone</th>
                    <th className="py-2 pr-3">Next Assignment</th>
                    <th className="py-2 pr-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {!bookings.length ? (
                    <tr>
                      <td colSpan={8} className="py-6 text-center text-slate-500">
                        No active patient bookings.
                      </td>
                    </tr>
                  ) : null}
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-100 align-top">
                      <td className="py-2.5 pr-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700"
                            onClick={() => void openBookingDetails(booking.id)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700"
                            onClick={() => openReschedule(booking)}
                          >
                            Reschedule
                          </button>
                          <button
                            type="button"
                            className="rounded-lg border border-emerald-300 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                            onClick={() => void openCreateVisit(booking)}
                          >
                            Create Visit
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 pr-3">{asText(booking.appointment) || 'N/A'}</td>
                      <td className="py-2.5 pr-3">
                        {asText(booking.patient_id) ? (
                          <Link to={`/Patients/view_patient?patient_id=${encodeURIComponent(asText(booking.patient_id))}`} className="font-semibold text-sky-700 hover:underline">
                            {asText(booking.patient) || 'Unknown patient'}
                          </Link>
                        ) : (
                          <span className="font-semibold text-slate-900">{asText(booking.patient) || 'Unknown patient'}</span>
                        )}
                      </td>
                      <td className="py-2.5 pr-3">
                        <span
                          className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                          style={{ backgroundColor: softenColor(asText(booking.specialty_color), 0.18), color: '#0f172a' }}
                        >
                          {asText(booking.specialty) || 'N/A'}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3">{asText(booking.doctor) || 'Unassigned'}</td>
                      <td className="py-2.5 pr-3">
                        <p>{asText(booking.email) || 'N/A'}</p>
                        <p className="text-xs text-slate-500">{asText(booking.phone) || 'N/A'}</p>
                      </td>
                      <td className="py-2.5 pr-3">
                        <p className="text-xs text-slate-700">{asText(booking.next_assignment_info) || 'N/A'}</p>
                      </td>
                      <td className="py-2.5 pr-3">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{asText(booking.status) || 'N/A'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>

      {showConflicts ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Planner</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Conflict Review</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={() => setShowConflicts(false)}>
                Close
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              {!conflicts.length ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-5 text-sm text-emerald-700">
                  No overlapping task conflicts were found for the current filter set.
                </div>
              ) : (
                conflicts.map((conflict) => (
                  <div key={conflict.key} className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{conflict.userName}</p>
                        <p className="text-xs text-slate-600">
                          {toDisplayDateTime(conflict.start)} to {toDisplayDateTime(conflict.end)}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-rose-700">{conflict.tasks.length} overlapping task(s)</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {conflict.tasks.map((task) => (
                        <button
                          key={asText(task.task_id)}
                          type="button"
                          onClick={() => {
                            setSelectedTask(task);
                            setShowConflicts(false);
                          }}
                          className="block w-full rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-left text-sm text-slate-700"
                        >
                          <span className="font-semibold text-slate-900">{asText(task.title) || 'Untitled task'}</span>
                          <span className="ml-2 text-xs text-slate-500">{toDisplayDateTime(task.start)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}

      {isCreateOpen ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Booking</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Create Appointment</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={closeCreateAppointment}>
                Close
              </button>
            </div>

            <form className="space-y-5 px-6 py-5" onSubmit={submitCreateAppointment}>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${createMode === 'existing' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}
                  onClick={() => {
                    setCreateMode('existing');
                    setBookingForm(emptyBookingForm);
                    setPatientSearch('');
    setPatientSearchOptions([]);
                  }}
                >
                  Existing Patient
                </button>
                <button
                  type="button"
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${createMode === 'guest' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}
                  onClick={() => {
                    setCreateMode('guest');
                    setBookingForm(emptyBookingForm);
                    setPatientSearch('');
                    setPatientSearchOptions([]);
                  }}
                >
                  New / Guest Appointee
                </button>
              </div>

              {createMode === 'existing' ? (
                <div className="rounded-2xl border border-slate-200 p-4">
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Find Patient</label>
                  <input
                    value={patientSearch}
                    onChange={(event) => {
                      setPatientSearch(event.target.value);
                      if (!event.target.value.trim()) {
                        setBookingForm((current) => ({ ...current, patient_id: '' }));
                      }
                    }}
                    placeholder="Search patient by name, folder number, phone..."
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                      {patientSearchOptions.length ? (
                    <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200">
                      {patientSearchOptions.map((patient) => {
                        const name = `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim() || asText(patient.name) || 'Unknown patient';
                        return (
                          <button
                            key={patient.id}
                            type="button"
                            className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-slate-50"
                            onClick={() => pickPatient(patient)}
                          >
                            <div className="font-semibold text-slate-900">{name}</div>
                            <div className="text-xs text-slate-500">{asText(patient.phone) || asText(patient.email) || patient.id}</div>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">First Name</label>
                  <input
                    value={bookingForm.first_name}
                    onChange={(event) => setBookingForm((current) => ({ ...current, first_name: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Last Name</label>
                  <input
                    value={bookingForm.last_name}
                    onChange={(event) => setBookingForm((current) => ({ ...current, last_name: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Phone</label>
                  <input
                    value={bookingForm.phone}
                    onChange={(event) => setBookingForm((current) => ({ ...current, phone: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Email</label>
                  <input
                    type="email"
                    value={bookingForm.email}
                    onChange={(event) => setBookingForm((current) => ({ ...current, email: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Date of Birth</label>
                  <input
                    type="date"
                    value={bookingForm.date_of_birth}
                    onChange={(event) => setBookingForm((current) => ({ ...current, date_of_birth: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Gender</label>
                  <SearchableSelectField
                    value={bookingForm.gender_id}
                    onChange={(event) => setBookingForm((current) => ({ ...current, gender_id: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select gender</option>
                    {(appointmentBootstrap.genders || []).map((gender) => (
                      <option key={gender.id} value={gender.id}>{asText(gender.name)}</option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specialty</label>
                  <SearchableSelectField
                    value={bookingForm.specialty_id}
                    onChange={(event) =>
                      setBookingForm((current) => ({
                        ...current,
                        specialty_id: event.target.value,
                        consultation_id: '',
                        user_id: '',
                        booking_timeslot_id: '',
                        actual_appointment_time: '',
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select specialty</option>
                    {(appointmentBootstrap.specialties || []).map((specialty) => (
                      <option key={specialty.id} value={specialty.id}>{asText(specialty.name)}</option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Consultation</label>
                  <SearchableSelectField
                    value={bookingForm.consultation_id}
                    onChange={(event) => setBookingForm((current) => ({ ...current, consultation_id: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select consultation</option>
                    {consultationOptions.map((consultation) => (
                      <option key={consultation.id} value={consultation.id}>{asText(consultation.name)}</option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Visit Purpose</label>
                  <SearchableSelectField
                    value={bookingForm.patient_visit_purpose_id}
                    onChange={(event) => setBookingForm((current) => ({ ...current, patient_visit_purpose_id: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select purpose</option>
                    {(appointmentBootstrap.purposes || []).map((purpose) => (
                      <option key={purpose.id} value={purpose.id}>{asText(purpose.name)}</option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Book For</label>
                  <SearchableSelectField
                    value={bookingForm.book_for}
                    onChange={(event) => setBookingForm((current) => ({ ...current, book_for: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="self">Self</option>
                    <option value="review">Review</option>
                    <option value="followup">Follow-up</option>
                  </SearchableSelectField>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Appointment Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={bookingForm.appointment_time}
                    onChange={(event) =>
                      setBookingForm((current) => ({
                        ...current,
                        appointment_time: event.target.value,
                        appointment_day: toDayName(event.target.value),
                        user_id: '',
                        booking_timeslot_id: '',
                        actual_appointment_time: '',
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specific Time</label>
                  <input
                    type="time"
                    value={normalizeTimeInput(bookingForm.actual_appointment_time)}
                    onChange={(event) =>
                      setBookingForm((current) => ({
                        ...current,
                        actual_appointment_time: event.target.value,
                        booking_timeslot_id: '',
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Day</label>
                  <input
                    value={bookingForm.appointment_day}
                    readOnly
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Booking Type</label>
                  <input
                    value="Standard Appointment"
                    readOnly
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Available Doctors</p>
                  <p className="mt-1 text-sm text-slate-600">Pick a doctor and an open slot for the selected specialty and date.</p>
                </div>
                {!appointmentDoctorOptions.length ? (
                  <p className="mt-4 text-sm text-slate-500">Select a specialty and date to load available doctors.</p>
                ) : !filteredAppointmentDoctors.length ? (
                  <p className="mt-4 text-sm text-slate-500">No open slots are available for the selected specialty/date.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    <input
                      value={appointmentDoctorSearch}
                      onChange={(event) => setAppointmentDoctorSearch(event.target.value)}
                      placeholder="Search doctor..."
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                    <p className="text-xs text-slate-500">
                      By default only doctors with open slots are shown. Search to include doctors without open slots and use <span className="font-semibold text-slate-700">Use Doctor</span>.
                    </p>
                    <div className="grid gap-4 lg:grid-cols-2">
                    {filteredAppointmentDoctors.map((doctor) => (
                      <div key={doctor.user.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                          <p className="text-sm font-semibold text-slate-900">{asText(doctor.user.full_name) || 'Unnamed doctor'}</p>
                          <p className="text-xs text-slate-500">{doctor.availability.length} open slot(s)</p>
                          </div>
                          <button
                            type="button"
                            className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                              asText(bookingForm.user_id) === asText(doctor.user.id)
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-300 bg-white text-slate-700'
                            }`}
                            onClick={() =>
                              setBookingForm((current) => ({
                                ...current,
                                user_id: doctor.user.id,
                              }))
                            }
                          >
                            Use Doctor
                          </button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {doctor.availability.map((slot) => {
                            const selected = bookingForm.booking_timeslot_id === slot.id;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                                  selected ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
                                }`}
                                  onClick={() =>
                                    setBookingForm((current) => ({
                                      ...current,
                                      user_id: doctor.user.id,
                                      booking_timeslot_id: slot.id,
                                      actual_appointment_time: normalizeTimeInput(asText(slot.booking_timeslot_value)) || asText(current.actual_appointment_time),
                                    }))
                                  }
                                >
                                {asText(slot.booking_timeslot_value) || 'Slot'}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Confirmation</p>
                      <div className="mt-2 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                        <p><span className="font-semibold text-slate-900">Date:</span> {asText(bookingForm.appointment_time) || 'Not set'}</p>
                        <p><span className="font-semibold text-slate-900">Day:</span> {asText(bookingForm.appointment_day) || 'Not set'}</p>
                        <p><span className="font-semibold text-slate-900">Doctor:</span> {asText(selectedAppointmentDoctor?.user.full_name) || 'Not selected'}</p>
                        <p>
                          <span className="font-semibold text-slate-900">Time:</span>{' '}
                          {selectedAppointmentSlotLabel || asText(bookingForm.actual_appointment_time) || 'Not selected'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Comment</label>
                <textarea
                  value={bookingForm.comment}
                  onChange={(event) => setBookingForm((current) => ({ ...current, comment: event.target.value }))}
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Internal notes for the appointment"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={closeCreateAppointment}>
                  Cancel
                </button>
                <button disabled={isCreatingAppointment} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  {isCreatingAppointment ? 'Saving...' : 'Create Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isFollowupOpen ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Sessions Planner</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Create Follow-Up</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={closeCreateFollowup}>
                Close
              </button>
            </div>

            <form className="space-y-5 px-6 py-5" onSubmit={submitCreateFollowup}>
              <div className="rounded-2xl border border-slate-200 p-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Find Patient</label>
                <input
                  value={followupSearch}
                  onChange={(event) => {
                    setFollowupSearch(event.target.value);
                    if (!event.target.value.trim()) {
                      setSelectedFollowupPatient(null);
                      setFollowupVisitOptions([]);
                      setFollowupForm((current) => ({ ...current, patient_visit_id: '' }));
                    }
                  }}
                  placeholder="Search patient by name, folder number, phone..."
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                {followupPatientOptions.length ? (
                  <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200">
                    {followupPatientOptions.map((patient) => {
                      const name = `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim() || asText(patient.name) || 'Unknown patient';
                      return (
                        <button
                          key={patient.id}
                          type="button"
                          className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-slate-50"
                          onClick={() => void pickFollowupPatient(patient)}
                        >
                          <div className="font-semibold text-slate-900">{name}</div>
                          <div className="text-xs text-slate-500">{asText(patient.phone) || asText(patient.email) || patient.id}</div>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
                {selectedFollowupPatient ? (
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    Follow-up will be attached to a visit for <span className="font-semibold text-slate-900">{followupSearch}</span>.
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Visit</label>
                  <SearchableSelectField
                    value={followupForm.patient_visit_id}
                    onChange={(event) => setFollowupForm((current) => ({ ...current, patient_visit_id: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select visit</option>
                    {followupVisitOptions.map((visit) => (
                      <option key={visit.id} value={visit.id}>{visit.label}</option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Follow-Up Date</label>
                  <input
                    type="date"
                    value={followupForm.date_of_visit}
                    onChange={(event) => setFollowupForm((current) => ({ ...current, date_of_visit: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specialty</label>
                  <SearchableSelectField
                    value={followupForm.specialty_id}
                    onChange={(event) => setFollowupForm((current) => ({ ...current, specialty_id: event.target.value, user_id: '' }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select specialty</option>
                    {followupSpecialties.map((specialty) => (
                      <option key={specialty.id} value={specialty.id}>{asText(specialty.name)}</option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Assigned Doctor</label>
                  <SearchableSelectField
                    value={followupForm.user_id}
                    onChange={(event) => setFollowupForm((current) => ({ ...current, user_id: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select doctor</option>
                    {followupDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>{asText(doctor.name) || doctor.id}</option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Description</label>
                  <input
                    value={followupForm.description}
                    onChange={(event) => setFollowupForm((current) => ({ ...current, description: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    placeholder="State the follow-up purpose or instruction"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Comment</label>
                  <textarea
                    value={followupForm.comment}
                    onChange={(event) => setFollowupForm((current) => ({ ...current, comment: event.target.value }))}
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Additional notes for the follow-up"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={closeCreateFollowup}>
                  Cancel
                </button>
                <button
                  disabled={isSavingFollowup || !asText(followupForm.patient_visit_id) || !asText(followupForm.date_of_visit) || !asText(followupForm.description)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isSavingFollowup ? 'Saving...' : 'Create Follow-Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {rescheduleTarget ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Booking</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Reschedule Appointment</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={() => setRescheduleTarget(null)}>
                Close
              </button>
            </div>

            <form className="space-y-5 px-6 py-5" onSubmit={submitReschedule}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Appointee</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{asText(rescheduleTarget.patient) || 'Unknown patient'}</p>
                  <p className="mt-1 text-xs text-slate-500">{asText(rescheduleTarget.email) || asText(rescheduleTarget.phone) || 'No contact on file'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current Booking</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{asText(rescheduleTarget.appointment) || 'N/A'}</p>
                  <p className="mt-1 text-xs text-slate-500">{asText(rescheduleTarget.specialty) || 'No specialty selected'}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">New Appointment Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={rescheduleForm.appointment_time}
                    onChange={(event) =>
                      setRescheduleForm((current) => ({
                        ...current,
                        appointment_time: event.target.value,
                        appointment_day: toDayName(event.target.value),
                        user_id: '',
                        booking_timeslot_id: '',
                        actual_appointment_time: '',
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specific Time</label>
                  <input
                    type="time"
                    value={normalizeTimeInput(rescheduleForm.actual_appointment_time)}
                    onChange={(event) =>
                      setRescheduleForm((current) => ({
                        ...current,
                        actual_appointment_time: event.target.value,
                        booking_timeslot_id: '',
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Day</label>
                  <input
                    value={rescheduleForm.appointment_day}
                    readOnly
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Inform Patient</label>
                  <SearchableSelectField
                    value={rescheduleForm.inform_patient}
                    onChange={(event) => setRescheduleForm((current) => ({ ...current, inform_patient: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="none">Do not notify</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="autocall">Auto Call</option>
                  </SearchableSelectField>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Available Doctors</p>
                  <p className="mt-1 text-sm text-slate-600">Pick a doctor and an open slot for the new date.</p>
                </div>
                {!rescheduleDoctors.length ? (
                  <p className="mt-4 text-sm text-slate-500">Choose a valid date to load available doctors and slots.</p>
                ) : !filteredRescheduleDoctors.length ? (
                  <p className="mt-4 text-sm text-slate-500">No open slots are available for the selected date.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    <input
                      value={rescheduleDoctorSearch}
                      onChange={(event) => setRescheduleDoctorSearch(event.target.value)}
                      placeholder="Search doctor..."
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                    <p className="text-xs text-slate-500">
                      By default only doctors with open slots are shown. Search to include doctors without open slots and use <span className="font-semibold text-slate-700">Use Doctor</span>.
                    </p>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {filteredRescheduleDoctors.map((doctor) => (
                        <div key={doctor.user.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                            <p className="text-sm font-semibold text-slate-900">{asText(doctor.user.full_name) || 'Unnamed doctor'}</p>
                            <p className="text-xs text-slate-500">{doctor.availability.length} open slot(s)</p>
                            </div>
                            <button
                              type="button"
                              className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                                asText(rescheduleForm.user_id) === asText(doctor.user.id)
                                  ? 'border-slate-900 bg-slate-900 text-white'
                                  : 'border-slate-300 bg-white text-slate-700'
                              }`}
                              onClick={() =>
                                setRescheduleForm((current) => ({
                                  ...current,
                                  user_id: doctor.user.id,
                                }))
                              }
                            >
                              Use Doctor
                            </button>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {doctor.availability.map((slot) => {
                              const selected = rescheduleForm.booking_timeslot_id === slot.id;
                              return (
                                <button
                                  key={slot.id}
                                  type="button"
                                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                                    selected ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
                                  }`}
                                  onClick={() =>
                                    setRescheduleForm((current) => ({
                                      ...current,
                                      user_id: doctor.user.id,
                                      booking_timeslot_id: slot.id,
                                      actual_appointment_time: normalizeTimeInput(asText(slot.booking_timeslot_value)) || asText(current.actual_appointment_time),
                                    }))
                                  }
                                >
                                  {asText(slot.booking_timeslot_value) || 'Slot'}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Confirmation</p>
                      <div className="mt-2 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                        <p><span className="font-semibold text-slate-900">Date:</span> {asText(rescheduleForm.appointment_time) || 'Not set'}</p>
                        <p><span className="font-semibold text-slate-900">Day:</span> {asText(rescheduleForm.appointment_day) || 'Not set'}</p>
                        <p><span className="font-semibold text-slate-900">Doctor:</span> {asText(selectedRescheduleDoctor?.user.full_name) || 'Not selected'}</p>
                        <p>
                          <span className="font-semibold text-slate-900">Time:</span>{' '}
                          {selectedRescheduleSlotLabel || normalizeTimeInput(rescheduleForm.actual_appointment_time) || 'Not selected'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => setRescheduleTarget(null)}>
                  Cancel
                </button>
                <button disabled={isSaving} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  {isSaving ? 'Saving...' : 'Save Reschedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {selectedDayBucket ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Planner Day</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">{selectedDayBucket.label}</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600"
                onClick={() => setSelectedDayBucket(null)}
              >
                Close
              </button>
            </div>
            <div className="space-y-3 px-6 py-5">
              {selectedDayBucket.tasks.map((task) => (
                <button
                  key={asText(task.task_id)}
                  type="button"
                  onClick={() => {
                    setSelectedTask(task);
                    setSelectedDayBucket(null);
                  }}
                  className="block w-full rounded-2xl border p-4 text-left"
                  style={{
                    borderColor: `${asText(task.color) || '#cbd5e1'}55`,
                    backgroundColor: `${asText(task.color) || '#f8fafc'}18`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{asText(task.title) || 'Untitled task'}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{asText(task.resource) || 'Unknown type'}</p>
                    </div>
                    <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: asText(task.color) || '#94a3b8' }} />
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    <p>{toDisplayDateTime(task.start)}</p>
                    <p>{asText(task.patient) || 'No patient linked'}</p>
                    <p>{asText(task.user) || 'No assigned clinician'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {selectedTask ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Planner Task</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">{asText(selectedTask.title) || 'Task details'}</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={() => setSelectedTask(null)}>
                Close
              </button>
            </div>
            <div className="grid gap-4 px-6 py-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Resource</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{asText(selectedTask.resource) || 'N/A'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Assigned Clinician</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{asText(selectedTask.user) || 'Unassigned'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{asText(selectedTask.patient) || 'No patient linked'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specialty</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{asText(selectedTask.specialty) || 'N/A'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Timing</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {toDisplayDateTime(selectedTask.start)} to {toDisplayDateTime(selectedTask.end)}
                </p>
              </div>
            </div>
            {selectedTaskBooking ? (
              <div className="border-t border-slate-100 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Booking Actions</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
                    onClick={() => {
                      setSelectedTask(null);
                      void openBookingDetails(asText(selectedTaskBooking.id));
                    }}
                  >
                    View Booking
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
                    onClick={() => {
                      setSelectedTask(null);
                      openReschedule(selectedTaskBooking);
                    }}
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-700"
                    onClick={() => {
                      setSelectedTask(null);
                      void openCreateVisit(selectedTaskBooking);
                    }}
                  >
                    Create Visit
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {selectedBooking ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Booking</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Booking Details</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={() => setSelectedBooking(null)}>
                Close
              </button>
            </div>
            <div className="grid gap-4 px-6 py-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{bookingDetailPatientName}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {asText(typeof selectedBooking.patient === 'object' ? selectedBooking.patient?.folder_number : '') || `ID: ${asText(selectedBooking.patient_id) || 'N/A'}`}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {asText(selectedBooking.email) || asText(typeof selectedBooking.patient === 'object' ? selectedBooking.patient?.email : '') || 'No email'}
                  {' • '}
                  {asText(selectedBooking.phone) || asText(typeof selectedBooking.patient === 'object' ? selectedBooking.patient?.phone : '') || 'No phone'}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Appointment</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{bookingDetailAppointment}</p>
                <p className="mt-1 text-xs text-slate-500">{asText(selectedBooking.selected_doctor_booking_timeslot?.booking_timeslot_value) || 'Slot included in appointment'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specialty / Purpose</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{bookingDetailSpecialty}</p>
                <p className="mt-1 text-xs text-slate-500">{bookingDetailPurpose}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Assigned Doctor</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{bookingDetailDoctor}</p>
                <p className="mt-1 text-xs text-slate-500">{asText(selectedBooking.next_assignment_info) || 'No follow-up assignment info'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Comment</p>
                <p className="mt-1 text-sm text-slate-700">{asText(selectedBooking.comment) || asText(selectedBooking.raw_comment) || 'No comment entered.'}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {createVisitTarget ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Booking</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Create Visit</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={() => setCreateVisitTarget(null)}>
                Close
              </button>
            </div>
            <form className="space-y-5 px-6 py-5" onSubmit={submitCreateVisit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{asText(createVisitTarget.patient) || 'Unknown patient'}</p>
                  <p className="mt-1 text-sm text-slate-600">{asText(createVisitTarget.appointment) || 'No appointment date'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Clinical Context</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{asText(createVisitTarget.specialty) || 'N/A'}</p>
                  <p className="mt-1 text-sm text-slate-600">{asText(createVisitTarget.doctor) || 'Unassigned doctor'}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Today&apos;s Pending Planner Tasks</p>
                <p className="mt-1 text-sm text-slate-600">Select any task you want to close when this visit is created.</p>
                {!createVisitPendingTasks.length ? (
                  <p className="mt-3 text-sm text-slate-500">No pending planner tasks found for this patient today.</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {createVisitPendingTasks.map((task) => {
                      const taskId = asText(task.task_id);
                      const checked = createVisitSelectedTaskIds.includes(taskId);
                      return (
                        <label key={taskId} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(event) => {
                              const nextChecked = event.target.checked;
                              setCreateVisitSelectedTaskIds((current) =>
                                nextChecked ? [...current, taskId] : current.filter((id) => id !== taskId),
                              );
                            }}
                            className="mt-0.5 h-4 w-4"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-slate-900">{asText(task.title) || 'Task'}</span>
                            <span className="block text-xs text-slate-500">
                              {asText(task.resource) || 'Task'} • {toDisplayDateTime(task.start)}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Insurance</p>
                    <p className="mt-1 text-sm text-slate-600">Choose an existing patient policy or register a new sponsor before creating the visit.</p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={createVisitForm.sponsor_alternative}
                      onChange={(event) =>
                        setCreateVisitForm((current) => ({
                          ...current,
                          sponsor_alternative: event.target.checked,
                        }))
                      }
                    />
                    Add New Sponsor
                  </label>
                </div>

                {!createVisitForm.sponsor_alternative ? (
                  <div className="mt-4">
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Existing Patient Insurance</label>
                    <SearchableSelectField
                      value={createVisitForm.patient_insurance_profile_policy_id}
                      onChange={(event) => setCreateVisitForm((current) => ({ ...current, patient_insurance_profile_policy_id: event.target.value }))}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Bill patient directly</option>
                      {createVisitPolicies.map((policy) => (
                        <option key={policy.id} value={policy.id}>
                          {asText(policy.insurance_profile_policy?.insurance_profile?.name) || asText(policy.insurance_profile_policy?.name) || 'Insurance Policy'}
                          {asText(policy.insurance_number) ? ` - ${asText(policy.insurance_number)}` : ''}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </div>
                ) : (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Sponsor</label>
                      <SearchableSelectField
                        value={createVisitForm.insurance_profile_policy_id}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, insurance_profile_policy_id: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="">Select sponsor</option>
                        {(bootstrap.providers || []).map((provider) => (
                          <option key={provider.id} value={provider.id}>
                            {asText(provider.insurance_profile?.name) || asText(provider.name)}
                            {asText(provider.name) ? ` - ${asText(provider.name)}` : ''}
                          </option>
                        ))}
                      </SearchableSelectField>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Claim Code</label>
                      <input
                        value={createVisitForm.claim_code}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, claim_code: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Mandatory for NHIS where required"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Membership Card Name</label>
                      <input
                        value={createVisitForm.insurance_card_name}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, insurance_card_name: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Card Serial Number</label>
                      <input
                        value={createVisitForm.insurance_card_serial}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, insurance_card_serial: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Membership ID</label>
                      <input
                        value={createVisitForm.insurance_number}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, insurance_number: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Scheme Number</label>
                      <input
                        value={createVisitForm.scheme_number}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, scheme_number: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Date of Issue</label>
                      <input
                        type="date"
                        value={createVisitForm.date_of_issue}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, date_of_issue: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Date of Renewal</label>
                      <input
                        type="date"
                        value={createVisitForm.date_of_renewal}
                        onChange={(event) => setCreateVisitForm((current) => ({ ...current, date_of_renewal: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <input
                          type="checkbox"
                          checked={createVisitForm.copay}
                          onChange={(event) => setCreateVisitForm((current) => ({ ...current, copay: event.target.checked }))}
                        />
                        Enable Co-Pay
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {!createVisitForm.sponsor_alternative ? (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Claim Code</label>
                  <input
                    value={createVisitForm.claim_code}
                    onChange={(event) => setCreateVisitForm((current) => ({ ...current, claim_code: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Mandatory for NHIS where required"
                  />
                </div>
              ) : null}

              <div className="flex justify-end gap-2">
                <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => setCreateVisitTarget(null)}>
                  Cancel
                </button>
                <button disabled={isSaving} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  {isSaving ? 'Creating...' : 'Create Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
