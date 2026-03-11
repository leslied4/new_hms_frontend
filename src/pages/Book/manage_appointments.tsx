import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type TabKey = 'manage' | 'reminders';
type BucketKey = 'all' | '>30days' | '21-28days' | '14-21days' | '7-14days' | '0-7days' | 'overdue';
type CreateMode = 'existing' | 'guest';

type GenericOption = {
  id: string;
  name?: string;
  color_code?: string;
};

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

type AppointmentRow = {
  id: string;
  patient_id?: string;
  user_id?: string;
  specialty_id?: string;
  booking_timeslot_id?: string;
  patient?: string;
  email?: string;
  phone?: string;
  appointment?: string;
  appointment_date?: string;
  comment?: string;
  purpose?: string;
  specialty?: string;
  specialty_color?: string;
  doctor?: string;
  status?: string;
  booking_type?: number;
  due_color?: string;
  due_days?: number | null;
  next_assignment_info?: string;
  booked_services?: Array<{ id?: string; name?: string; type?: string; quantity?: number }>;
};

type ReminderRow = {
  id: string;
  due_date?: string | null;
  patient_id?: string;
  patient_name?: string;
  patient_phone?: string;
  patient_email?: string;
  subject?: string;
  body?: string;
  message_type?: string;
  date_delivered?: string | null;
};

type BootstrapResponse = {
  providers?: ProviderOption[];
  specialties?: GenericOption[];
  purposes?: GenericOption[];
  genders?: GenericOption[];
};

type AppointmentsResponse = {
  items?: AppointmentRow[];
  summary?: {
    active?: number;
    overdue?: number;
    due_this_week?: number;
  };
};

type ReminderResponse = {
  items?: ReminderRow[];
};

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
    image?: {
      file_path?: string;
    } | null;
  };
  availability: Array<{
    id: string;
    booking_timeslot_value?: string;
    booking_timeslot_id?: string;
  }>;
};

type BookingDetail = AppointmentRow & {
  services?: Array<{ id?: string; name?: string; type?: string; quantity?: number }>;
  raw_comment?: string;
};

type InsurancePolicyRow = {
  id: string;
  insurance_number?: string;
  insurance_card_serial?: string;
  insurance_card_name?: string;
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

const asText = (value: unknown): string => String(value ?? '').trim();
const toSearchableOptions = (
  rows: Array<{ id?: string; name?: string; first_name?: string; last_name?: string; username?: string; code?: string }>,
) =>
  rows
    .map((row) => {
      const value = asText(row.id);
      const label = asText(row.name) || `${asText(row.first_name)} ${asText(row.last_name)}`.trim() || value;
      if (!value || !label) return null;
      return {
        value,
        label,
        keywords: `${asText(row.username)} ${asText(row.code)} ${asText(row.first_name)} ${asText(row.last_name)}`.trim(),
      };
    })
    .filter((row): row is { value: string; label: string; keywords?: string } => Boolean(row));

const softenColor = (value: unknown, fallback = '#e2e8f0'): string => {
  const raw = asText(value);
  if (!raw) return fallback;
  if (/^#([0-9a-fA-F]{6})$/.test(raw)) return `${raw}2A`;
  if (/^#([0-9a-fA-F]{3})$/.test(raw)) {
    const expanded = `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`;
    return `${expanded}2A`;
  }
  return fallback;
};

const toDisplayDateTime = (value?: string | null): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString();
};

const toDayName = (value: string): string => {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, { weekday: 'long' });
};

const dayIdFromName = (dayName: string): string => {
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
};

const bucketLabel = (bucket: BucketKey): string => {
  if (bucket === '>30days') return '>30 days';
  if (bucket === '21-28days') return '21-29 days';
  if (bucket === '14-21days') return '14-21 days';
  if (bucket === '7-14days') return '7-14 days';
  if (bucket === '0-7days') return '0-7 days';
  if (bucket === 'overdue') return 'Overdue';
  return 'All';
};

const detailRows = (detail?: BookingDetail | null): Array<[string, string]> => {
  if (!detail) return [];
  return [
    ['Patient', asText(detail.patient) || 'Unknown patient'],
    ['Email', asText(detail.email) || 'N/A'],
    ['Phone', asText(detail.phone) || 'N/A'],
    ['Appointment', asText(detail.appointment) || 'N/A'],
    ['Purpose', asText(detail.purpose) || 'N/A'],
    ['Specialty', asText(detail.specialty) || 'N/A'],
    ['Doctor', asText(detail.doctor) || 'N/A'],
    ['Next Assignment', asText(detail.next_assignment_info) || 'N/A'],
  ];
};

export default function BookManageAppointmentsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('manage');
  const [bucket, setBucket] = useState<BucketKey>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [bootstrap, setBootstrap] = useState<BootstrapResponse>({});
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [summary, setSummary] = useState({ active: 0, overdue: 0, dueThisWeek: 0 });
  const [reminders, setReminders] = useState<ReminderRow[]>([]);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createMode, setCreateMode] = useState<CreateMode>('existing');
  const [bookingForm, setBookingForm] = useState<BookingForm>(emptyBookingForm);
  const [patientSearch, setPatientSearch] = useState('');
  const [patientOptions, setPatientOptions] = useState<PatientSearchRow[]>([]);
  const [consultationOptions, setConsultationOptions] = useState<ConsultationOption[]>([]);
  const [doctorOptions, setDoctorOptions] = useState<DoctorAvailability[]>([]);
  const [detailModal, setDetailModal] = useState<BookingDetail | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<AppointmentRow | null>(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    appointment_time: '',
    appointment_day: '',
    user_id: '',
    booking_timeslot_id: '',
    actual_appointment_time: '',
    inform_patient: 'none',
  });
  const [rescheduleDoctors, setRescheduleDoctors] = useState<DoctorAvailability[]>([]);
  const [cancelTarget, setCancelTarget] = useState<AppointmentRow | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelInform, setCancelInform] = useState('none');
  const [visitPolicies, setVisitPolicies] = useState<InsurancePolicyRow[]>([]);
  const [createVisitTarget, setCreateVisitTarget] = useState<AppointmentRow | null>(null);
  const [createVisitPolicies, setCreateVisitPolicies] = useState<InsurancePolicyRow[]>([]);
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

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

  const loadBootstrap = useCallback(async () => {
    const response = await api.get<BootstrapResponse>('/legacy/book/manage-appointments/');
    setBootstrap(response || {});
  }, []);

  const loadAppointments = useCallback(async () => {
    const params = new URLSearchParams();
    if (bucket !== 'all') params.set('status', bucket);
    if (search.trim()) params.set('search', search.trim());
    const response = await api.get<AppointmentsResponse>(`/legacy/book/view-appointments/?${params.toString()}`);
    const rows = Array.isArray(response?.items) ? response.items : [];
    setAppointments(rows);
    setSummary({
      active: Number(response?.summary?.active ?? rows.length),
      overdue: Number(response?.summary?.overdue ?? 0),
      dueThisWeek: Number(response?.summary?.due_this_week ?? 0),
    });
  }, [bucket, search]);

  const loadReminders = useCallback(async () => {
    const response = await api.get<ReminderResponse>('/legacy/book/appointment-reminders/');
    setReminders(Array.isArray(response?.items) ? response.items : []);
  }, []);

  const reloadPage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([loadBootstrap(), loadReminders()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load appointment booking.');
    } finally {
      setIsLoading(false);
    }
  }, [loadAppointments, loadBootstrap, loadReminders]);

  useEffect(() => {
    void reloadPage();
  }, [reloadPage]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadAppointments();
    }, 250);
    return () => window.clearTimeout(timer);
  }, [bucket, search, loadAppointments]);

  useEffect(() => {
    if (!patientSearch.trim() || createMode !== 'existing' || !isCreateOpen) {
      setPatientOptions([]);
      return;
    }
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        params.set('searchValue', patientSearch.trim());
        params.set('limit', '8');
        const response = await api.get<PatientSearchRow[]>(`/legacy/patients/view-patients/?${params.toString()}`);
        setPatientOptions(Array.isArray(response) ? response : []);
      } catch {
        setPatientOptions([]);
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [createMode, isCreateOpen, patientSearch]);

  useEffect(() => {
    const specialtyId = asText(bookingForm.specialty_id);
    if (!specialtyId) {
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
  }, [bookingForm.specialty_id]);

  useEffect(() => {
    const specialtyId = asText(bookingForm.specialty_id);
    const appointmentDate = asText(bookingForm.appointment_time);
    const appointmentDay = asText(bookingForm.appointment_day);
    if (!specialtyId || !appointmentDate || !appointmentDay) {
      setDoctorOptions([]);
      return;
    }
    const dayId = dayIdFromName(appointmentDay);
    if (!dayId) {
      setDoctorOptions([]);
      return;
    }
    void (async () => {
      try {
        const params = new URLSearchParams();
        params.set('date', appointmentDate);
        const response = await api.get<DoctorAvailability[]>(
          `/legacy/book/get-available-doctors/${encodeURIComponent(specialtyId)}/${encodeURIComponent(dayId)}/?${params.toString()}`,
        );
        setDoctorOptions(Array.isArray(response) ? response : []);
      } catch {
        setDoctorOptions([]);
      }
    })();
  }, [bookingForm.appointment_day, bookingForm.appointment_time, bookingForm.specialty_id]);

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

  const reminderRows = useMemo(
    () =>
      reminders.slice().sort((left, right) => {
        const leftTime = new Date(asText(left.due_date) || 0).getTime();
        const rightTime = new Date(asText(right.due_date) || 0).getTime();
        return rightTime - leftTime;
      }),
    [reminders],
  );

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
    setPatientOptions([]);
  };

  const openCreate = () => {
    clearFeedback();
    setCreateMode('existing');
    setBookingForm(emptyBookingForm);
    setPatientSearch('');
    setPatientOptions([]);
    setConsultationOptions([]);
    setDoctorOptions([]);
    setIsCreateOpen(true);
  };

  const closeCreate = () => {
    setIsCreateOpen(false);
    setPatientSearch('');
    setPatientOptions([]);
    setConsultationOptions([]);
    setDoctorOptions([]);
    setVisitPolicies([]);
    setBookingForm(emptyBookingForm);
  };

  const openCreateVisit = async (row: AppointmentRow) => {
    clearFeedback();
    setCreateVisitTarget(row);
    setCreateVisitPolicies([]);
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
      const response = await api.post<{ ok?: boolean; patient_id?: string; patient_visit_id?: string }>(
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
        },
      );
      setSuccess('Visit Created successfully.');
      setCreateVisitTarget(null);
      await Promise.all([loadAppointments(), loadReminders()]);
      if (asText(response?.patient_visit_id) && asText(response?.patient_id)) {
        navigate(
          `/Patients/visit_space?patient_id=${encodeURIComponent(asText(response.patient_id))}&visit_id=${encodeURIComponent(asText(response.patient_visit_id))}`,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create visit from booking.');
    } finally {
      setIsSaving(false);
    }
  };

  const submitCreateBooking = async (event: FormEvent) => {
    event.preventDefault();
    clearFeedback();
    setIsSaving(true);
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
      setSuccess('Booking successfully completed.');
      closeCreate();
      await Promise.all([loadAppointments(), loadReminders()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save booking.');
    } finally {
      setIsSaving(false);
    }
  };

  const openBookingDetails = async (appointmentId: string) => {
    clearFeedback();
    try {
      const detail = await api.get<BookingDetail>(`/legacy/book/view-booking-details/${encodeURIComponent(appointmentId)}/`);
      setDetailModal(detail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load booking details.');
    }
  };

  const openReschedule = async (row: AppointmentRow) => {
    clearFeedback();
    const appointmentDate = asText(row.appointment_date);
    setRescheduleTarget(row);
    setRescheduleForm({
      appointment_time: appointmentDate,
      appointment_day: toDayName(appointmentDate),
      user_id: '',
      booking_timeslot_id: '',
      actual_appointment_time: '',
      inform_patient: 'none',
    });
    setRescheduleDoctors([]);
    setVisitPolicies([]);
    try {
      const response = await api.get<InsurancePolicyRow[] | false>(
        `/legacy/book/get-appointment-patient-details/${encodeURIComponent(row.id)}/`,
      );
      setVisitPolicies(Array.isArray(response) ? response : []);
    } catch {
      setVisitPolicies([]);
    }
  };

  const submitReschedule = async (event: FormEvent) => {
    event.preventDefault();
    if (!rescheduleTarget) return;
    if (!asText(rescheduleForm.booking_timeslot_id)) {
      setError('Select a doctor timeslot before rescheduling.');
      return;
    }
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
      await Promise.all([loadAppointments(), loadReminders()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reschedule booking.');
    } finally {
      setIsSaving(false);
    }
  };

  const submitCancel = async (event: FormEvent) => {
    event.preventDefault();
    if (!cancelTarget) return;
    clearFeedback();
    setIsSaving(true);
    try {
      await api.post('/legacy/book/cancel-booking/', {
        id: cancelTarget.id,
        reason: cancelReason,
        inform_patient: cancelInform,
      });
      setSuccess('Cancelled Successfully.');
      setCancelTarget(null);
      setCancelReason('');
      setCancelInform('none');
      await Promise.all([loadAppointments(), loadReminders()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel booking.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !appointments.length) {
    return <div className="p-6 text-sm text-slate-600">Loading appointment booking...</div>;
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Bookings</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Appointment Booking</h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage upcoming bookings, reschedule patients, and create new appointments from one workspace.
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            onClick={openCreate}
          >
            Create Appointment
          </button>
        </div>
      </section>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Active Bookings</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{summary.active}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Due This Week</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{summary.dueThisWeek}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Overdue</p>
          <p className="mt-2 text-3xl font-semibold text-rose-700">{summary.overdue}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${activeTab === 'manage' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Appointments
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${activeTab === 'reminders' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}
            onClick={() => setActiveTab('reminders')}
          >
            Reminder Tracker
          </button>
        </div>
      </section>

      {activeTab === 'manage' ? (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(['all', '>30days', '21-28days', '14-21days', '7-14days', '0-7days', 'overdue'] as BucketKey[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                    bucket === value ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700'
                  }`}
                  onClick={() => setBucket(value)}
                >
                  {bucketLabel(value)}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
              onClick={() => {
                setBucket('all');
                setSearch('');
              }}
            >
              Reset
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patient, doctor, phone, specialty..."
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              onClick={() => void loadAppointments()}
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                  <th className="py-2 pr-3">Due</th>
                  <th className="py-2 pr-3">Appointment Date</th>
                  <th className="py-2 pr-3">Appointee</th>
                  <th className="py-2 pr-3">Department / Specialty</th>
                  <th className="py-2 pr-3">Doctor</th>
                  <th className="py-2 pr-3">Email / Phone</th>
                  <th className="py-2 pr-3">Next Assignment</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!appointments.length ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-sm text-slate-500">
                      No appointments found.
                    </td>
                  </tr>
                ) : null}
                {appointments.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 align-top">
                    <td className="py-3 pr-3">
                      <span className="mt-1 inline-flex h-3.5 w-3.5 rounded-full" style={{ backgroundColor: asText(row.due_color) || '#94a3b8' }} />
                    </td>
                    <td className="py-3 pr-3">{asText(row.appointment) || 'N/A'}</td>
                    <td className="py-3 pr-3">
                      {asText(row.patient_id) ? (
                        <Link className="font-semibold text-sky-700 hover:underline" to={`/Patients/view_patient?patient_id=${encodeURIComponent(asText(row.patient_id))}`}>
                          {asText(row.patient) || 'Unknown patient'}
                        </Link>
                      ) : (
                        <span className="font-semibold text-slate-900">{asText(row.patient) || 'Unknown patient'}</span>
                      )}
                      {Number(row.booking_type || 0) === 1 ? (
                        <p className="mt-1 text-xs font-semibold text-amber-700">Booked service appointment</p>
                      ) : null}
                    </td>
                    <td className="py-3 pr-3">
                      <div
                        className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: softenColor(row.specialty_color),
                          color: '#0f172a',
                        }}
                      >
                        {asText(row.specialty) || 'N/A'}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{asText(row.purpose) || 'No purpose selected'}</p>
                    </td>
                    <td className="py-3 pr-3">{asText(row.doctor) || 'Unassigned'}</td>
                    <td className="py-3 pr-3">
                      <p>{asText(row.email) || 'N/A'}</p>
                      <p className="text-xs text-slate-500">{asText(row.phone) || 'N/A'}</p>
                    </td>
                    <td className="py-3 pr-3">{asText(row.next_assignment_info) || 'N/A'}</td>
                    <td className="py-3 text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button type="button" className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700" onClick={() => void openBookingDetails(row.id)}>
                          View
                        </button>
                        <button type="button" className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700" onClick={() => void openReschedule(row)}>
                          Reschedule
                        </button>
                        <button type="button" className="rounded-lg border border-emerald-300 px-2.5 py-1 text-xs font-semibold text-emerald-700" onClick={() => void openCreateVisit(row)}>
                          Create Visit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-rose-300 px-2.5 py-1 text-xs font-semibold text-rose-700"
                          onClick={() => {
                            setCancelTarget(row);
                            setCancelReason('');
                            setCancelInform('none');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'reminders' ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                  <th className="py-2 pr-3">Due Date</th>
                  <th className="py-2 pr-3">Patient</th>
                  <th className="py-2 pr-3">Phone</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Subject</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {!reminderRows.length ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500">
                      No booking reminders have been recorded.
                    </td>
                  </tr>
                ) : null}
                {reminderRows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100">
                    <td className="py-3 pr-3">{toDisplayDateTime(row.due_date)}</td>
                    <td className="py-3 pr-3">{asText(row.patient_name) || 'Unknown patient'}</td>
                    <td className="py-3 pr-3">{asText(row.patient_phone) || 'N/A'}</td>
                    <td className="py-3 pr-3">{asText(row.patient_email) || 'N/A'}</td>
                    <td className="py-3 pr-3">{asText(row.subject) || 'Appointment Reminder'}</td>
                    <td className="py-3 pr-3">{row.date_delivered ? 'Delivered' : 'Pending'}</td>
                    <td className="py-3">{asText(row.message_type) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {isCreateOpen ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Booking</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Create Appointment</h2>
              </div>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={closeCreate}>
                Close
              </button>
            </div>

            <form className="space-y-5 px-6 py-5" onSubmit={submitCreateBooking}>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${createMode === 'existing' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}
                  onClick={() => {
                    setCreateMode('existing');
                    setBookingForm(emptyBookingForm);
                    setPatientSearch('');
                    setPatientOptions([]);
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
                    setPatientOptions([]);
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
                  {patientOptions.length ? (
                    <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200">
                      {patientOptions.map((patient) => {
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
                  <SearchableSelect
                    value={bookingForm.gender_id}
                    onChange={(value) => setBookingForm((current) => ({ ...current, gender_id: value }))}
                    options={toSearchableOptions(bootstrap.genders || [])}
                    placeholder="Select gender"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Specialty</label>
                  <SearchableSelect
                    value={bookingForm.specialty_id}
                    onChange={(value) =>
                      setBookingForm((current) => ({
                        ...current,
                        specialty_id: value,
                        consultation_id: '',
                        user_id: '',
                        booking_timeslot_id: '',
                        actual_appointment_time: '',
                      }))
                    }
                    options={toSearchableOptions(bootstrap.specialties || [])}
                    placeholder="Select specialty"
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Consultation</label>
                  <SearchableSelect
                    value={bookingForm.consultation_id}
                    onChange={(value) => {
                      const option = consultationOptions.find((item) => item.id === value);
                      setBookingForm((current) => ({
                        ...current,
                        consultation_id: value,
                        patient_visit_purpose_id: asText(option?.patient_visit_purpose_id) || current.patient_visit_purpose_id,
                      }));
                    }}
                    options={consultationOptions.map((consultation) => ({
                      value: asText(consultation.id),
                      label: `${asText(consultation.name)}${asText(consultation.price) ? ` (GHS ${asText(consultation.price)})` : ''}`,
                    }))}
                    placeholder="Select consultation"
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Visit Purpose</label>
                  <SearchableSelect
                    value={bookingForm.patient_visit_purpose_id}
                    onChange={(value) => setBookingForm((current) => ({ ...current, patient_visit_purpose_id: value }))}
                    options={toSearchableOptions(bootstrap.purposes || [])}
                    placeholder="Select purpose"
                    className="mt-2"
                  />
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

              <div className="grid gap-4 md:grid-cols-3">
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
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Available Doctors</p>
                    <p className="mt-1 text-sm text-slate-600">Pick a doctor and an open slot for the selected specialty and date.</p>
                  </div>
                </div>
                {!doctorOptions.length ? (
                  <p className="mt-4 text-sm text-slate-500">Select a specialty and date to load available doctors.</p>
                ) : (
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {doctorOptions.map((doctor) => (
                      <div key={doctor.user.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{asText(doctor.user.full_name) || 'Unnamed doctor'}</p>
                            <p className="text-xs text-slate-500">{doctor.availability.length} open slot(s)</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {doctor.availability.length ? doctor.availability.map((slot) => {
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
                                    actual_appointment_time: asText(slot.booking_timeslot_value),
                                  }))
                                }
                              >
                                {asText(slot.booking_timeslot_value) || 'Slot'}
                              </button>
                            );
                          }) : <p className="text-xs text-slate-500">No available slots.</p>}
                        </div>
                      </div>
                    ))}
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
                <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={closeCreate}>
                  Cancel
                </button>
                <button
                  disabled={isSaving}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? 'Saving...' : 'Create Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {detailModal ? (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <h2 className="text-xl font-semibold text-slate-900">Booking Details</h2>
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600" onClick={() => setDetailModal(null)}>
                Close
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              <div className="grid gap-3 md:grid-cols-2">
                {detailRows(detailModal).map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                    <p className="mt-1 text-sm text-slate-900">{value}</p>
                  </div>
                ))}
              </div>

              {detailModal.services?.length ? (
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Booked Services</p>
                  <div className="mt-3 space-y-3">
                    {detailModal.services.map((service, index) => (
                      <div key={`${service.id || 'service'}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
                        <p><span className="font-semibold text-slate-700">Name:</span> {asText(service.name) || 'N/A'}</p>
                        <p><span className="font-semibold text-slate-700">Type:</span> {asText(service.type) || 'N/A'}</p>
                        <p><span className="font-semibold text-slate-700">Quantity:</span> {asText(service.quantity) || '1'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
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
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{asText(rescheduleTarget.patient) || 'Unknown patient'}</p>
                  <p className="mt-1 text-sm text-slate-600">{asText(rescheduleTarget.phone) || asText(rescheduleTarget.email) || 'No contact details'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current Booking</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{asText(rescheduleTarget.appointment) || 'N/A'}</p>
                  <p className="mt-1 text-sm text-slate-600">{asText(rescheduleTarget.specialty) || 'N/A'} • {asText(rescheduleTarget.doctor) || 'Unassigned'}</p>
                </div>
              </div>

              {visitPolicies.length ? (
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient Insurance</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {visitPolicies.map((policy) => (
                      <div key={policy.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
                        <p className="font-semibold text-slate-900">{asText(policy.insurance_profile_policy?.insurance_profile?.name) || asText(policy.insurance_profile_policy?.name) || 'Insurance Policy'}</p>
                        <p className="mt-1 text-slate-600">{asText(policy.insurance_number) || 'No membership id'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">New Date</label>
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
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Day</label>
                  <input value={rescheduleForm.appointment_day} readOnly className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Inform Patient</label>
                  <SearchableSelectField
                    value={rescheduleForm.inform_patient}
                    onChange={(event) => setRescheduleForm((current) => ({ ...current, inform_patient: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="none">None</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="autocall">Autocall</option>
                  </SearchableSelectField>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Available Doctors</p>
                {!rescheduleDoctors.length ? (
                  <p className="mt-3 text-sm text-slate-500">Select the new date to load open slots.</p>
                ) : (
                  <div className="mt-3 grid gap-4 lg:grid-cols-2">
                    {rescheduleDoctors.map((doctor) => (
                      <div key={doctor.user.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-900">{asText(doctor.user.full_name) || 'Unnamed doctor'}</p>
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
                                    actual_appointment_time: asText(slot.booking_timeslot_value),
                                  }))
                                }
                              >
                                {asText(slot.booking_timeslot_value)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => setRescheduleTarget(null)}>
                  Cancel
                </button>
                <button disabled={isSaving} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  {isSaving ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {cancelTarget ? (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-xl rounded-3xl border border-rose-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-rose-100 bg-rose-50 px-6 py-5">
              <h2 className="text-xl font-semibold text-rose-900">Cancel Booking</h2>
              <button type="button" className="rounded-full border border-rose-200 px-3 py-1 text-sm font-semibold text-rose-700" onClick={() => setCancelTarget(null)}>
                Close
              </button>
            </div>
            <form className="space-y-4 px-6 py-5" onSubmit={submitCancel}>
              <p className="text-sm text-slate-700">
                This will cancel the booking for <span className="font-semibold text-slate-900">{asText(cancelTarget.patient) || 'Unknown patient'}</span>.
              </p>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reason</label>
                <textarea
                  value={cancelReason}
                  onChange={(event) => setCancelReason(event.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Why is this booking being cancelled?"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Inform Patient</label>
                <SearchableSelectField
                  value={cancelInform}
                  onChange={(event) => setCancelInform(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="none">None</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="autocall">Autocall</option>
                </SearchableSelectField>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => setCancelTarget(null)}>
                  Go Back
                </button>
                <button disabled={isSaving} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white">
                  {isSaving ? 'Saving...' : 'Confirm Cancel'}
                </button>
              </div>
            </form>
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
                    <SearchableSelect
                      value={createVisitForm.patient_insurance_profile_policy_id}
                      onChange={(value) => setCreateVisitForm((current) => ({ ...current, patient_insurance_profile_policy_id: value }))}
                      options={createVisitPolicies.map((policy) => ({
                        value: asText(policy.id),
                        label: `${asText(policy.insurance_profile_policy?.insurance_profile?.name) || asText(policy.insurance_profile_policy?.name) || 'Insurance Policy'}${asText(policy.insurance_number) ? ` - ${asText(policy.insurance_number)}` : ''}`,
                        keywords: `${asText(policy.insurance_card_name)} ${asText(policy.insurance_card_serial)}`.trim(),
                      }))}
                      placeholder="Bill patient directly"
                      className="mt-2"
                    />
                  </div>
                ) : (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Sponsor</label>
                      <SearchableSelect
                        value={createVisitForm.insurance_profile_policy_id}
                        onChange={(value) => setCreateVisitForm((current) => ({ ...current, insurance_profile_policy_id: value }))}
                        options={(bootstrap.providers || []).map((provider) => ({
                          value: asText(provider.id),
                          label: `${asText(provider.insurance_profile?.name) || asText(provider.name)}${asText(provider.name) ? ` - ${asText(provider.name)}` : ''}`,
                        }))}
                        placeholder="Select sponsor"
                        className="mt-2"
                      />
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
