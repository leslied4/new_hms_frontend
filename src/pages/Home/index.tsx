import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

type HomeIndexResponse = {
  vapid_public_key?: string;
  service_worker_url?: string;
  user?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  } | null;
};

type PatientSearchResult = {
  id: string;
  first_name?: string;
  last_name?: string;
  folder_number?: string;
  date_of_birth?: string;
  patient_visits?: Array<{ date_created?: string }>;
};

type PlannerTask = {
  task_id: string;
  start: string;
  title: string;
  patient: string;
  patient_id?: string;
  user_id?: string;
};

type PlannerResponse = {
  task?: PlannerTask[];
};

type Occasion = {
  key: string;
  label: string;
  tone: 'celebration' | 'awareness';
};

const formatLegacyDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const toLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parsePlannerDateTime = (value?: string): Date | null => {
  const raw = String(value || '').trim();
  if (!raw) return null;
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const match = raw.match(/^(\d{2})\/(\d{2})\/(\d{2,4})(?:\s+(\d{1,2}):(\d{2}))?/);
  if (match) {
    const [, dd, mm, yy, hh = '0', min = '0'] = match;
    const yearNum = Number(yy.length === 2 ? `20${yy}` : yy);
    const monthNum = Number(mm) - 1;
    const dayNum = Number(dd);
    const hourNum = Number(hh);
    const minNum = Number(min);
    const localDate = new Date(yearNum, monthNum, dayNum, hourNum, minNum, 0, 0);
    if (!Number.isNaN(localDate.getTime())) return localDate;
  }
  return null;
};

const formatPlannerTime = (value?: string): string => {
  const parsed = parsePlannerDateTime(value);
  if (parsed) {
    return parsed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  const raw = String(value || '').trim();
  const timeMatch = raw.match(/(\d{1,2}:\d{2})/);
  return timeMatch ? timeMatch[1] : 'N/A';
};

const getCurrentDayRange = () => {
  const current = new Date();
  const start = new Date(current);
  start.setHours(0, 0, 0, 0);
  const end = new Date(current);
  end.setHours(23, 59, 59, 999);
  return {
    start: formatLegacyDate(start),
    end: formatLegacyDate(end),
  };
};

const getGreetingForTime = (date: Date) => {
  const hour = date.getHours();
  if (hour < 12) {
    return { icon: '🌅', title: 'Good morning' };
  }
  if (hour < 18) {
    return { icon: '☀️', title: 'Good afternoon' };
  }
  return { icon: '🌙', title: 'Good evening' };
};

const buildOccasions = (date: Date): Occasion[] => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const items: Occasion[] = [];

  if (month === 1 && day <= 7) {
    items.push({ key: 'new-year', label: 'Happy New Year', tone: 'celebration' });
  }
  if (day === 1) {
    items.push({ key: 'new-month', label: 'Happy New Month', tone: 'celebration' });
  }

  if (month === 3 && day === 6) {
    items.push({ key: 'ghana-independence', label: 'Happy Ghana Independence Day', tone: 'celebration' });
  }
  if (month === 7 && day === 1) {
    items.push({ key: 'ghana-republic', label: 'Happy Ghana Republic Day', tone: 'celebration' });
  }
  if (month === 8 && day === 4) {
    items.push({ key: 'ghana-founders', label: "Happy Ghana Founders' Day", tone: 'celebration' });
  }

  if (month === 10) {
    items.push({ key: 'breast-cancer-month', label: 'Breast Cancer Awareness Month', tone: 'awareness' });
  }
  if (month === 10 && day === 10) {
    items.push({ key: 'mental-health-day', label: 'World Mental Health Day', tone: 'awareness' });
  }
  if (month === 2 && day === 4) {
    items.push({ key: 'world-cancer-day', label: 'World Cancer Day', tone: 'awareness' });
  }
  if (month === 4 && day === 7) {
    items.push({ key: 'world-health-day', label: 'World Health Day', tone: 'awareness' });
  }
  if (month === 11 && day === 14) {
    items.push({ key: 'world-diabetes-day', label: 'World Diabetes Day', tone: 'awareness' });
  }

  return items;
};

export default function HomeIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<PatientSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>([]);
  const [data, setData] = useState<HomeIndexResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushSupported, setPushSupported] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<HomeIndexResponse>('/legacy/home/index/');
        if (!mounted) return;
        setData(response);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load home data.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadPlanner = async () => {
      const day = getCurrentDayRange();
      try {
        const params = new URLSearchParams();
        params.set('start', day.start);
        params.set('end', day.end);
        params.set('type', 'homepage');
        const userId = data?.user?.id?.trim();
        if (userId) params.set('user_id', userId);
        const response = await api.get<PlannerResponse>(
          `/legacy/sessions/setup-planner/?${params.toString()}`,
        );
        if (!mounted) return;
        setPlannerTasks(Array.isArray(response.task) ? response.task : []);
      } catch (_err) {
        if (!mounted) return;
        setPlannerTasks([]);
      }
    };
    loadPlanner();
    return () => {
      mounted = false;
    };
  }, [data?.user?.id]);

  const greetingName = useMemo(() => {
    const firstName = data?.user?.first_name?.trim();
    const lastName = data?.user?.last_name?.trim();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    return fullName || data?.user?.username || 'User';
  }, [data]);

  const dayGreeting = useMemo(() => getGreetingForTime(new Date()), []);
  const occasions = useMemo(() => buildOccasions(new Date()), []);
  const greetingDateLabel = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    [],
  );

  const handleSearch = async (rawTerm: string) => {
    const term = rawTerm.trim();
    if (!term) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await api.get<PatientSearchResult[]>(
        `/legacy/patients/search-predictive-patient-name/?name=${encodeURIComponent(term)}&limit=10`,
      );
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to search patients.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const term = search.trim();
    if (!term) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = window.setTimeout(() => {
      void handleSearch(term);
    }, 350);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search]);

  const openPatient = (patientId: string) => {
    navigate(`/Home/patient?patient_id=${encodeURIComponent(patientId)}`);
  };

  const goToRoute = (path: string) => {
    navigate(path);
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const enablePushNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
      setPushStatus('Push notifications are not supported in this browser.');
      setPushSupported(false);
      return;
    }
    setPushSupported(true);

    if (!data?.vapid_public_key) {
      setPushStatus('VAPID key is not configured on the backend.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      setPushStatus('Notification permission was not granted.');
      return;
    }

    const serviceWorkerUrl = data.service_worker_url || '/sw.js';
    await navigator.serviceWorker.register(serviceWorkerUrl);
    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(data.vapid_public_key),
      });
    }

    await api.post('/push/subscribe/', subscription.toJSON());
    setPushEnabled(true);
    setPushStatus('Notifications are enabled.');
  };

  const disablePushNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setPushStatus('Push notifications are not supported in this browser.');
      setPushSupported(false);
      return;
    }
    setPushSupported(true);

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      setPushEnabled(false);
      setPushStatus('No active subscription found.');
      return;
    }

    await api.post('/push/unsubscribe/', { endpoint: subscription.endpoint });
    await subscription.unsubscribe();
    setPushEnabled(false);
    setPushStatus('Notifications are disabled.');
  };

  const sendPushTest = async () => {
    const result = await api.post<{ attempted: number; success: number }>('/push/test/', {});
    setPushStatus(`Test push sent. Success: ${result.success} of ${result.attempted}.`);
  };

  useEffect(() => {
    let mounted = true;
    const syncPushState = async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        if (mounted) {
          setPushSupported(false);
          setPushEnabled(false);
        }
        return;
      }

      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (!mounted) return;
        setPushSupported(true);
        setPushEnabled(Boolean(subscription));
      } catch (_err) {
        if (!mounted) return;
        setPushSupported(false);
        setPushEnabled(false);
      }
    };

    syncPushState().catch(() => {
      if (!mounted) return;
      setPushSupported(false);
      setPushEnabled(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const todayEvents = useMemo(() => {
    const todayIso = toLocalDateKey(new Date());
    const currentUserId = data?.user?.id?.trim() || '';
    return plannerTasks
      .filter((task) => {
        const taskDate = parsePlannerDateTime(task.start);
        if (!taskDate || toLocalDateKey(taskDate) !== todayIso) return false;
        if (!currentUserId) return true;
        return String(task.user_id || '').trim() === currentUserId;
      })
      .sort((left, right) => {
        const leftTime = parsePlannerDateTime(left.start)?.getTime() || 0;
        const rightTime = parsePlannerDateTime(right.start)?.getTime() || 0;
        return leftTime - rightTime;
      })
      .slice(0, 5);
  }, [plannerTasks, data?.user?.id]);

  const clinicalWish = useMemo(() => {
    const hour = new Date().getHours();
    const eventCount = todayEvents.length;
    if (hour < 12) {
      return eventCount
        ? `You have ${eventCount} event${eventCount > 1 ? 's' : ''} lined up this morning.`
        : 'Wishing you a productive start.';
    }
    if (hour < 18) {
      return eventCount
        ? `You have ${eventCount} event${eventCount > 1 ? 's' : ''} on your schedule this afternoon.`
        : 'Wishing you a steady shift.';
    }
    return eventCount
      ? `${eventCount} event${eventCount > 1 ? 's remain' : ' remains'} on your schedule tonight.`
      : 'Wishing you a smooth close-out.';
  }, [todayEvents.length]);

  return (
    <div className="space-y-6">
            {error ? (
              <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Home</p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {isLoading ? 'Loading...' : `Welcome, ${greetingName}`}
                </h2>
              </div>
              <div className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-700">
                {new Date().toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-cyan-100/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(235,249,255,0.86)_45%,rgba(255,250,242,0.8))] p-4 shadow-[0_10px_30px_rgba(2,132,199,0.08)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-200/30 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-amber-200/25 blur-2xl" />
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/80 bg-white/75 text-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                    {dayGreeting.icon}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold tracking-[0.01em] text-slate-900">{dayGreeting.title}</p>
                    <p className="text-xs text-slate-600">{greetingDateLabel}</p>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-600">{clinicalWish}</p>
              </div>
              {occasions.length ? (
                <div className="relative mt-3 flex flex-wrap gap-2">
                  {occasions.map((occasion) => (
                    <span
                      key={occasion.key}
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ${
                        occasion.tone === 'awareness'
                          ? 'border-fuchsia-200/90 bg-fuchsia-50/90 text-fuchsia-700'
                          : 'border-emerald-200/90 bg-emerald-50/90 text-emerald-700'
                      }`}
                    >
                      {occasion.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Search patient</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Enter patient name or MRN"
                  className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs text-slate-900 placeholder:text-slate-500"
                />
              </div>
              {isSearching ? <p className="mt-3 text-xs text-slate-500">Searching...</p> : null}
              {searchResults.length > 0 ? (
                <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
                  {searchResults.map((patient) => {
                    const fullName = [patient.first_name, patient.last_name].filter(Boolean).join(' ').trim() || 'Unnamed patient';
                    const lastVisitDate = patient.patient_visits?.[0]?.date_created;
                    return (
                      <button
                        key={patient.id}
                        onClick={() => openPatient(patient.id)}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-xs hover:bg-slate-50"
                      >
                        <div>
                          <p className="text-slate-800">{fullName}</p>
                          <p className="text-[11px] text-slate-500">
                            Last visit:{' '}
                            {lastVisitDate
                              ? new Date(lastVisitDate).toLocaleDateString()
                              : 'No visits'}
                          </p>
                        </div>
                        <span className="text-slate-500">{patient.folder_number || patient.id}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => goToRoute('/Patients/add_patient')}
                className="rounded-full border border-emerald-400 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-500/20"
              >
                Register New Patient
              </button>
              <button
                onClick={() => goToRoute('/Patients/view_patients')}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:border-emerald-400"
              >
                Go To Registered Patients
              </button>
              {pushSupported && !pushEnabled ? (
                <button
                  onClick={() => {
                    enablePushNotifications().catch((err) => {
                      setPushStatus(err instanceof Error ? err.message : 'Unable to enable notifications.');
                    });
                  }}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:border-emerald-400"
                >
                  Enable Notifications
                </button>
              ) : null}
              {pushSupported && pushEnabled ? (
                <button
                  onClick={() => {
                    disablePushNotifications().catch((err) => {
                      setPushStatus(err instanceof Error ? err.message : 'Unable to disable notifications.');
                    });
                  }}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:border-emerald-400"
                >
                  Disable Notifications
                </button>
              ) : null}
              <button
                onClick={() => {
                  sendPushTest().catch((err) => {
                    setPushStatus(err instanceof Error ? err.message : 'Unable to send test notification.');
                  });
                }}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:border-emerald-400"
              >
                Send Test Notification
              </button>
            </div>
            {pushStatus ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                {pushStatus}
              </div>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Today&apos;s Events</p>
              {todayEvents.length === 0 ? (
                <p className="mt-2 text-xs text-slate-500">No events scheduled for today.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {todayEvents.map((event) => (
                    <button
                      key={event.task_id}
                      onClick={() => event.patient_id && openPatient(event.patient_id)}
                      className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-xs hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-slate-800">{event.title || 'Patient Visit'}</p>
                        <p className="text-slate-500">{event.patient || 'Unknown patient'}</p>
                      </div>
                      <span className="text-slate-500">
                        {formatPlannerTime(event.start)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Actions</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <button
                  onClick={() => goToRoute('/Patients/view_opd_visits')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left hover:border-emerald-400"
                >
                  <p className="text-sm font-semibold text-slate-900">OPD</p>
                  <p className="text-xs text-slate-600">Open outpatient visits with filters</p>
                </button>
                <button
                  onClick={() => goToRoute('/Patients/view_visits_ipd')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left hover:border-emerald-400"
                >
                  <p className="text-sm font-semibold text-slate-900">IPD</p>
                  <p className="text-xs text-slate-600">Open inpatient admissions with filters</p>
                </button>
                <button
                  onClick={() => goToRoute('/Patients/add_walkin_patient?type=walkinlab')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left hover:border-emerald-400"
                >
                  <p className="text-sm font-semibold text-slate-900">Walk-In Lab</p>
                  <p className="text-xs text-slate-600">Request lab for walkin patient</p>
                </button>
                <button
                  onClick={() => goToRoute('/Patients/add_walkin_patient?type=walkindrug')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left hover:border-emerald-400"
                >
                  <p className="text-sm font-semibold text-slate-900">Walk-In Drug</p>
                  <p className="text-xs text-slate-600">Request drugs for walkin patient</p>
                </button>
                <button
                  onClick={() => goToRoute('/Patients/add_walkin_patient?type=walkinScan')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left hover:border-emerald-400"
                >
                  <p className="text-sm font-semibold text-slate-900">Walk-In Scan</p>
                  <p className="text-xs text-slate-600">Request scan for walkin patient</p>
                </button>
                <button
                  onClick={() => goToRoute('/Patients/view_patients')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left hover:border-emerald-400"
                >
                  <p className="text-sm font-semibold text-slate-900">Procedure</p>
                  <p className="text-xs text-slate-600">Request procedure for patient</p>
                </button>
              </div>
            </div>

    </div>
  );
}
