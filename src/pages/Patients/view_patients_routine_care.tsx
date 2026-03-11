import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

type BucketKey = 'all' | '>30days' | '21-29days' | '14-21days' | '7-14days' | '0-7days' | 'overdue';
type TabKey = 'actionable' | 'reminders';
type ViewMode = 'list' | 'calendar';

type RoutineItem = {
  id: string;
  single_id?: string;
  date?: string | null;
  title?: string | null;
  details?: string | null;
  record_type?: string | null;
  patient_id?: string | null;
  patient_name?: string | null;
  doctor_name?: string | null;
  specialty_name?: string | null;
  patient_phone?: string | null;
  patient_email?: string | null;
  status?: string | null;
  status_id?: string | null;
  bucket?: string | null;
};

type ReminderItem = {
  id: string;
  due_date?: string | null;
  patient_id?: string | null;
  patient_name?: string | null;
  patient_phone?: string | null;
  patient_email?: string | null;
  subject?: string | null;
  body?: string | null;
  message_type?: string | null;
  date_delivered?: string | null;
};

type ActionableResponse = {
  items?: RoutineItem[];
  total?: number;
  page?: number;
  page_size?: number;
  count?: number;
};

type ReminderResponse = {
  items?: ReminderItem[];
};

const asText = (value: unknown): string => String(value ?? '').trim();

const parseDate = (value?: string | null): Date | null => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value?: string | null): string => {
  const date = parseDate(value);
  return date ? date.toLocaleDateString() : 'N/A';
};

const diffInDays = (value?: string | null): number | null => {
  const date = parseDate(value);
  if (!date) return null;
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
};

const bucketOf = (item: RoutineItem): BucketKey => {
  if (item.bucket === 'overdue' || item.bucket === '0-7days' || item.bucket === '7-14days' || item.bucket === '14-21days' || item.bucket === '21-29days' || item.bucket === '>30days') {
    return item.bucket;
  }
  const days = diffInDays(item.date);
  if (days === null) return 'all';
  if (days < 0) return 'overdue';
  if (days <= 7) return '0-7days';
  if (days <= 14) return '7-14days';
  if (days <= 21) return '14-21days';
  if (days <= 29) return '21-29days';
  return '>30days';
};

const bucketBadge = (bucket: BucketKey): string => {
  if (bucket === 'overdue') return 'bg-rose-100 text-rose-700';
  if (bucket === '0-7days') return 'bg-orange-100 text-orange-700';
  if (bucket === '7-14days') return 'bg-amber-100 text-amber-700';
  if (bucket === '14-21days') return 'bg-emerald-100 text-emerald-700';
  if (bucket === '21-29days') return 'bg-sky-100 text-sky-700';
  if (bucket === '>30days') return 'bg-violet-100 text-violet-700';
  return 'bg-slate-100 text-slate-700';
};

const sameDayKey = (date: Date): string => date.toISOString().slice(0, 10);

const startOfMonthGrid = (date: Date): Date => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  start.setDate(start.getDate() - start.getDay());
  return start;
};

const sameMonth = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();

export default function PatientsViewPatientsRoutineCare() {
  const [activeTab, setActiveTab] = useState<TabKey>('actionable');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [bucket, setBucket] = useState<BucketKey>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [items, setItems] = useState<RoutineItem[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [rescheduleItem, setRescheduleItem] = useState<RoutineItem | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [total, setTotal] = useState(0);
  const [calendarDate, setCalendarDate] = useState(() => new Date());

  const fetchActionable = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      query.set('page', String(page));
      query.set('page_size', String(pageSize));
      if (bucket !== 'all') query.set('status', bucket);
      const response = await api.get<ActionableResponse>(`/legacy/patients/actionable/?${query.toString()}`);
      const rows = Array.isArray(response?.items) ? response.items : [];
      setItems(rows);
      setTotal(Number(response?.total ?? rows.length));
      if (response?.page_size) setPageSize(Number(response.page_size));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load routine care.');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, bucket]);

  const fetchReminders = useCallback(async () => {
    try {
      const response = await api.get<ReminderResponse>('/legacy/patients/get-routine-reminders/1/?limit=500');
      setReminders(Array.isArray(response?.items) ? response.items : []);
    } catch {
      setReminders([]);
    }
  }, []);

  useEffect(() => {
    void fetchActionable();
  }, [fetchActionable]);

  useEffect(() => {
    void fetchReminders();
  }, [fetchReminders]);

  const actionableRows = useMemo(
    () => items.filter((item) => asText(item.status) !== 'cancelled' && asText(item.status_id) !== '24'),
    [items],
  );

  const reminderRows = useMemo(
    () =>
      reminders.slice().sort((a, b) => {
        const aDate = parseDate(a.due_date)?.getTime() || 0;
        const bDate = parseDate(b.due_date)?.getTime() || 0;
        return aDate - bDate;
      }),
    [reminders],
  );

  const calendarItems = useMemo(() => actionableRows, [actionableRows]);

  const calendarItemsByDay = useMemo(() => {
    const map = new Map<string, RoutineItem[]>();
    calendarItems.forEach((item) => {
      const parsed = parseDate(item.date);
      if (!parsed) return;
      const key = sameDayKey(parsed);
      const group = map.get(key) || [];
      group.push(item);
      map.set(key, group);
    });
    return map;
  }, [calendarItems]);

  const calendarDays = useMemo(() => {
    const start = startOfMonthGrid(calendarDate);
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  }, [calendarDate]);

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

  const openRescheduleModal = (item: RoutineItem) => {
    setRescheduleItem(item);
    const dt = parseDate(item.date);
    setRescheduleDate(dt ? dt.toISOString().slice(0, 16) : '');
  };

  const closeRescheduleModal = () => {
    setRescheduleItem(null);
    setRescheduleDate('');
  };

  const cancelRoutine = async (id: string) => {
    if (!window.confirm('Cancel this routine care item?')) return;
    clearFeedback();
    setIsSaving(true);
    try {
      await api.patch(`/legacy/patients/cancel-routine-care/?id=${encodeURIComponent(id)}`, {});
      setSuccess('Routine care cancelled.');
      await fetchActionable();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel routine care.');
    } finally {
      setIsSaving(false);
    }
  };

  const submitReschedule = async (event: FormEvent) => {
    event.preventDefault();
    const rescheduleId = rescheduleItem?.single_id || rescheduleItem?.id || '';
    if (!rescheduleId || !rescheduleDate) return;
    clearFeedback();
    setIsSaving(true);
    try {
      await api.patch(`/legacy/patients/reschedule-routine-care/?id=${encodeURIComponent(rescheduleId)}`, { date: rescheduleDate });
      setSuccess('Routine care rescheduled.');
      closeRescheduleModal();
      await fetchActionable();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reschedule routine care.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabButtonClass = (tab: TabKey): string =>
    `rounded-lg px-3 py-2 text-xs font-semibold ${
      activeTab === tab ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
    }`;

  const bucketButtonClass = (value: BucketKey): string =>
    `rounded-lg border px-2 py-1 text-xs font-semibold ${
      bucket === value ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700'
    }`;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const monthLabel = calendarDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  if (isLoading && items.length === 0) {
    return <div className="p-6 text-sm text-slate-600">Loading routine care...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Patients</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Patient Routine Care</h1>
      </section>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button type="button" className={tabButtonClass('actionable')} onClick={() => setActiveTab('actionable')}>Actionable</button>
          <button type="button" className={tabButtonClass('reminders')} onClick={() => setActiveTab('reminders')}>Reminder Tracker</button>
        </div>
      </section>

      {activeTab === 'actionable' ? (
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button type="button" className={bucketButtonClass('all')} onClick={() => { setBucket('all'); setPage(1); }}>All</button>
              <button type="button" className={bucketButtonClass('>30days')} onClick={() => { setBucket('>30days'); setPage(1); }}> &gt;30 days</button>
              <button type="button" className={bucketButtonClass('21-29days')} onClick={() => { setBucket('21-29days'); setPage(1); }}>21-29 days</button>
              <button type="button" className={bucketButtonClass('14-21days')} onClick={() => { setBucket('14-21days'); setPage(1); }}>14-21 days</button>
              <button type="button" className={bucketButtonClass('7-14days')} onClick={() => { setBucket('7-14days'); setPage(1); }}>7-14 days</button>
              <button type="button" className={bucketButtonClass('0-7days')} onClick={() => { setBucket('0-7days'); setPage(1); }}>0-7 days</button>
              <button type="button" className={bucketButtonClass('overdue')} onClick={() => { setBucket('overdue'); setPage(1); }}>Overdue</button>
            </div>
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button
                type="button"
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${viewMode === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                onClick={() => setViewMode('calendar')}
              >
                Calendar
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase text-slate-500">
                      <th className="py-2">Due Date</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Type</th>
                      <th>Details</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actionableRows.map((item) => {
                      const patientId = asText(item.patient_id);
                      const patientName = asText(item.patient_name) || 'Unknown patient';
                      const doctor = asText(item.doctor_name) || 'N/A';
                      const itemBucket = bucketOf(item);
                      return (
                        <tr key={item.id} className="border-t border-slate-100">
                          <td className="py-2">{formatDate(item.date)}</td>
                          <td>
                            {patientId ? (
                              <Link className="text-sky-700 hover:underline" to={`/Patients/view_patient?patient_id=${encodeURIComponent(patientId)}`}>
                                {patientName}
                              </Link>
                            ) : patientName}
                          </td>
                          <td>{doctor}</td>
                          <td>{asText(item.record_type) || asText(item.title) || 'Routine Care'}</td>
                          <td>{asText(item.details) || asText(item.title) || 'N/A'}</td>
                          <td>
                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${bucketBadge(itemBucket)}`}>{itemBucket}</span>
                          </td>
                          <td className="py-2 text-right">
                            <button
                              type="button"
                              className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs"
                              onClick={() => openRescheduleModal(item)}
                            >
                              Reschedule
                            </button>
                            <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void cancelRoutine(item.single_id || item.id)}>Cancel</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-600">
                  Page {page} of {totalPages} ({total} total)
                </p>
                <div className="flex gap-2">
                  <button type="button" className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700 disabled:opacity-50" disabled={page <= 1 || isLoading} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Previous</button>
                  <button type="button" className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700 disabled:opacity-50" disabled={page >= totalPages || isLoading} onClick={() => setPage((prev) => prev + 1)}>Next</button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                  onClick={() => setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                >
                  Previous
                </button>
                <div className="text-sm font-semibold text-slate-900">{monthLabel}</div>
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                  onClick={() => setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                >
                  Next
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
                  <div key={label} className="py-1">{label}</div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-7">
                {calendarDays.map((day) => {
                  const key = sameDayKey(day);
                  const dayItems = calendarItemsByDay.get(key) || [];
                  const inMonth = sameMonth(day, calendarDate);
                  const isToday = key === sameDayKey(new Date());
                  return (
                    <div
                      key={key}
                      className={`min-h-[9rem] rounded-2xl border p-3 ${
                        inMonth ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50/70 text-slate-400'
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isToday ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          {day.getDate()}
                        </span>
                        {dayItems.length ? <span className="text-[11px] font-semibold text-slate-500">{dayItems.length}</span> : null}
                      </div>
                      <div className="space-y-2">
                        {dayItems.slice(0, 3).map((item) => {
                          const patientName = asText(item.patient_name) || 'Unknown patient';
                          return (
                            <button
                              key={item.id}
                              type="button"
                              className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-left text-[11px] text-slate-700 hover:border-slate-300 hover:bg-white"
                              onClick={() => openRescheduleModal(item)}
                            >
                              <p className="font-semibold text-slate-900">{patientName}</p>
                              <p className="truncate">{asText(item.record_type) || asText(item.title) || 'Routine Care'}</p>
                            </button>
                          );
                        })}
                        {dayItems.length > 3 ? <p className="text-[11px] font-semibold text-slate-500">+{dayItems.length - 3} more</p> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      ) : null}

      {activeTab === 'reminders' ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-slate-500">
                  <th className="py-2">Due Date</th>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {reminderRows.map((item) => (
                  <tr key={`rem-${item.id}`} className="border-t border-slate-100">
                    <td className="py-2">{formatDate(item.due_date)}</td>
                    <td>{asText(item.patient_name) || 'Unknown patient'}</td>
                    <td>{asText(item.patient_phone) || 'N/A'}</td>
                    <td>{asText(item.patient_email) || 'N/A'}</td>
                    <td>{asText(item.subject) || 'Routine Care Reminder'}</td>
                    <td>{item.date_delivered ? 'Delivered' : 'Pending'}</td>
                    <td>{asText(item.message_type) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {rescheduleItem ? (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/35 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Routine Care</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Reschedule Routine Care</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600"
                onClick={closeRescheduleModal}
              >
                Close
              </button>
            </div>
            <div className="space-y-5 px-6 py-5">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{asText(rescheduleItem.patient_name) || 'Unknown patient'}</p>
                  <p className="mt-1 text-sm text-slate-600">{asText(rescheduleItem.patient_phone) || asText(rescheduleItem.patient_email) || 'No contact recorded'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Assigned Clinician</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{asText(rescheduleItem.doctor_name) || 'N/A'}</p>
                  <p className="mt-1 text-sm text-slate-600">{asText(rescheduleItem.specialty_name) || 'No specialty recorded'}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Care Type</p>
                    <p className="mt-1 text-sm text-slate-900">{asText(rescheduleItem.record_type) || asText(rescheduleItem.title) || 'Routine Care'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current Due Date</p>
                    <p className="mt-1 text-sm text-slate-900">{formatDate(rescheduleItem.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Status Window</p>
                    <p className="mt-1">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${bucketBadge(bucketOf(rescheduleItem))}`}>
                        {bucketOf(rescheduleItem)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Care Details</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{asText(rescheduleItem.details) || asText(rescheduleItem.title) || 'No routine care details recorded.'}</p>
                </div>
              </div>

              <form className="space-y-3" onSubmit={submitReschedule}>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500" htmlFor="reschedule-date">
                  New Date/Time
                </label>
                <input
                  id="reschedule-date"
                  type="datetime-local"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                  value={rescheduleDate}
                  onChange={(event) => setRescheduleDate(event.target.value)}
                  required
                />
                <div className="flex justify-end gap-2">
                  <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700" onClick={closeRescheduleModal}>
                    Cancel
                  </button>
                  <button disabled={isSaving} className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
                    {isSaving ? 'Saving...' : 'Reschedule'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
