import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRecord = Record<string, unknown>;

type AvailabilityDay = {
  id: string;
  day: string;
  selected_day_id?: string;
  minute?: number;
  selected_times?: GenericRecord[];
  selected_time_values?: string[];
};

type UpdateProfileResponse = {
  ok?: boolean;
  message?: string;
  user?: GenericRecord | null;
  gender?: GenericRecord | null;
  department?: GenericRecord | null;
  specialty?: GenericRecord | null;
  role?: GenericRecord | null;
  image?: GenericRecord | null;
  consultations?: GenericRecord[];
  selected_consultations?: GenericRecord[];
  availability_days?: AvailabilityDay[];
};

type AvailabilityState = Record<
  string,
  {
    minute: string;
    selectedTimes: string[];
  }
>;

const BACKEND_ORIGIN = String(import.meta.env.VITE_BACKEND_ORIGIN || window.location.origin).replace(/\/$/, '');

const asText = (value: unknown): string => String(value ?? '').trim();

const resolveMediaUrl = (value?: string): string => {
  const filePath = asText(value);
  if (!filePath) return '';
  if (/^https?:\/\//i.test(filePath)) return filePath;
  if (filePath.startsWith('/media/')) return `${BACKEND_ORIGIN}${filePath}`;
  if (filePath.startsWith('media/')) return `${BACKEND_ORIGIN}/${filePath}`;
  if (filePath.startsWith('uploads/')) return `${BACKEND_ORIGIN}/media/${filePath}`;
  if (filePath.startsWith('/')) return `${BACKEND_ORIGIN}${filePath}`;
  return `${BACKEND_ORIGIN}/img/${filePath}`;
};

const MINUTE_OPTIONS = ['20', '30', '40', '60', '90', '120'];

const buildTimeOptions = (minuteValue: string): string[] => {
  const step = Number.parseInt(minuteValue || '40', 10);
  const duration = Number.isFinite(step) && step > 0 ? step : 40;
  const slots: string[] = [];
  for (let current = 0; current < 1440; current += duration) {
    const hour = Math.floor(current / 60);
    const minute = current % 60;
    slots.push(`${hour}:${minute === 0 ? '00' : String(minute).padStart(2, '0')}`);
  }
  return slots;
};

const initialsFromUser = (user?: GenericRecord | null): string => {
  const first = asText(user?.first_name).slice(0, 1);
  const last = asText(user?.last_name).slice(0, 1);
  return `${first}${last}`.trim().toUpperCase() || 'U';
};

export default function UsersUpdateProfile() {
  const navigate = useNavigate();

  const [payload, setPayload] = useState<UpdateProfileResponse | null>(null);
  const [selectedConsultationIds, setSelectedConsultationIds] = useState<string[]>([]);
  const [availability, setAvailability] = useState<AvailabilityState>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [expandedDayId, setExpandedDayId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const roleId = asText(payload?.user?.role_id);
  const isDoctor = roleId === '1';

  const hydrate = (data: UpdateProfileResponse) => {
    setPayload(data);
    setSelectedConsultationIds(
      (data.selected_consultations ?? [])
        .map((row) => asText(row.consultation_id))
        .filter(Boolean),
    );

    const nextAvailability: AvailabilityState = {};
    (data.availability_days ?? []).forEach((day) => {
      const dayId = asText(day.id);
      if (!dayId) return;
      nextAvailability[dayId] = {
        minute: String(day.minute ?? 40),
        selectedTimes: (day.selected_time_values ?? []).map((value) => asText(value)).filter(Boolean),
      };
    });
    setAvailability(nextAvailability);

    const imagePath = asText(data.image?.file_path);
    setAvatarPreview(imagePath ? resolveMediaUrl(imagePath) : '');
    setAvatarFile(null);
    setExpandedDayId('');
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<UpdateProfileResponse>('/legacy/users/update-profile/');
        if (!mounted) return;
        hydrate(response);
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Unable to load profile.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const user = payload?.user ?? null;
  const userName = `${asText(user?.first_name)} ${asText(user?.last_name)}`.trim() || 'My Profile';
  const roleName = asText(payload?.role?.name) || 'User';
  const specialtyName = asText(payload?.specialty?.name);
  const departmentName = asText(payload?.department?.name);
  const genderName = asText(payload?.gender?.name);
  const consultations = payload?.consultations ?? [];
  const availabilityDays = payload?.availability_days ?? [];

  const toggleConsultation = (consultationId: string) => {
    setSelectedConsultationIds((current) =>
      current.includes(consultationId)
        ? current.filter((id) => id !== consultationId)
        : [...current, consultationId],
    );
    setSuccess(null);
    setError(null);
  };

  const updateDayMinute = (dayId: string, minute: string) => {
    setAvailability((current) => ({
      ...current,
      [dayId]: {
        minute,
        selectedTimes: current[dayId]?.selectedTimes ?? [],
      },
    }));
    setSuccess(null);
    setError(null);
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
    setSuccess(null);
    setError(null);
  };

  const onAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAvatarFile(file);
    setSuccess(null);
    setError(null);
    if (!file) {
      if (payload?.image?.file_path) {
        setAvatarPreview(resolveMediaUrl(asText(payload.image.file_path)));
      } else {
        setAvatarPreview('');
      }
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      if (avatarFile) {
        formData.append('image', avatarFile);
      }
      selectedConsultationIds.forEach((value) => {
        formData.append('consultation_ids[]', value);
      });
      const availabilityPayload = Object.entries(availability)
        .map(([booking_dayslot_id, value]) => ({
          booking_dayslot_id,
          minute: Number.parseInt(value.minute || '40', 10) || 40,
          selected_times: value.selectedTimes,
        }))
        .filter((row) => row.selected_times.length > 0);
      formData.append('availability', JSON.stringify(availabilityPayload));

      const response = await api.post<UpdateProfileResponse>('/legacy/users/update-profile/', formData);
      hydrate(response);
      setSuccess(asText(response.message) || 'User details successfully updated.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 px-1 pb-8">
        <div className="rounded-[2rem] border border-white/65 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <p className="text-sm font-medium text-slate-500">Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-1 pb-8">
      <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.88))] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-700/80">Profile</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">{userName}</h1>
            <p className="mt-1 text-sm text-slate-600">
              Update your profile photo and doctor availability settings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
              {roleName}
            </span>
            {specialtyName ? (
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                {specialtyName}
              </span>
            ) : null}
            {departmentName ? (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {departmentName}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
          <section className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Profile Photo</h2>
                <p className="mt-1 text-xs text-slate-500">This updates the image linked to your user record.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-4">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={userName}
                  className="h-40 w-40 rounded-[2rem] border border-slate-200 object-cover shadow-[0_18px_36px_rgba(15,23,42,0.10)]"
                />
              ) : (
                <div className="flex h-40 w-40 items-center justify-center rounded-[2rem] border border-slate-200 bg-slate-900 text-4xl font-black text-white shadow-[0_18px_36px_rgba(15,23,42,0.10)]">
                  {initialsFromUser(user)}
                </div>
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                <span>Choose New Photo</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={onAvatarChange}
                />
              </label>
              <p className="text-center text-xs text-slate-500">Accepted: JPG, JPEG, PNG</p>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Personal Details</h2>
              <p className="mt-1 text-xs text-slate-500">These fields remain read-only here, matching the legacy page.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['First Name', asText(user?.first_name)],
                ['Last Name', asText(user?.last_name)],
                ['Gender', genderName],
                ['Mobile No.', asText(user?.phone)],
                ['Email', asText(user?.email)],
                ['Username', asText(user?.username)],
              ].map(([label, value]) => (
                <label key={label} className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                  <input
                    type="text"
                    disabled
                    value={value}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        {isDoctor ? (
          <>
            <section className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Consultations</h2>
                <p className="mt-1 text-xs text-slate-500">Select the consultation types this doctor can accept.</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {consultations.length ? (
                  consultations.map((row) => {
                    const id = asText(row.id);
                    const active = selectedConsultationIds.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleConsultation(id)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? 'bg-cyan-600 text-white shadow-[0_12px_25px_rgba(8,145,178,0.25)]'
                            : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700'
                        }`}
                      >
                        {asText(row.name) || id}
                      </button>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    No consultations are configured for this user&apos;s specialty yet.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Availability</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Each day stores its own interval in minutes and the selected appointment times.
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {availabilityDays.filter((day) => (availability[asText(day.id)]?.selectedTimes.length ?? 0) > 0).length} day(s) configured
                </span>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                {availabilityDays.map((day) => {
                  const dayId = asText(day.id);
                  const state = availability[dayId] ?? { minute: '40', selectedTimes: [] };
                  const timeOptions = buildTimeOptions(state.minute);
                  const isOpen = expandedDayId === dayId;
                  return (
                    <div
                      key={dayId}
                      className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(145deg,rgba(248,250,252,0.95),rgba(255,255,255,0.95))] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{asText(day.day) || dayId}</h3>
                          <p className="text-xs text-slate-500">
                            {state.selectedTimes.length
                              ? `${state.selectedTimes.length} slot(s) selected`
                              : 'No slot selected'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExpandedDayId((current) => (current === dayId ? '' : dayId))}
                          className={`rounded-2xl px-3 py-2 text-xs font-semibold ${
                            isOpen
                              ? 'bg-slate-900 text-white'
                              : 'border border-slate-200 bg-white text-slate-600'
                          }`}
                        >
                          {isOpen ? 'Hide Slots' : 'Edit Slots'}
                        </button>
                      </div>

                      {state.selectedTimes.length ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {state.selectedTimes.slice(0, 8).map((time) => (
                            <span
                              key={`${dayId}-${time}`}
                              className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700"
                            >
                              {time}
                            </span>
                          ))}
                          {state.selectedTimes.length > 8 ? (
                            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                              +{state.selectedTimes.length - 8} more
                            </span>
                          ) : null}
                        </div>
                      ) : null}

                      {isOpen ? (
                        <div className="mt-4 space-y-4">
                          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                            Minute Interval
                            <SearchableSelectField
                              value={state.minute}
                              onChange={(event) => updateDayMinute(dayId, event.target.value)}
                              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900"
                            >
                              {MINUTE_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                  Every {option} minutes
                                </option>
                              ))}
                            </SearchableSelectField>
                          </label>
                          <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
                            {timeOptions.map((time) => {
                              const active = state.selectedTimes.includes(time);
                              return (
                                <button
                                  key={`${dayId}-${time}-toggle`}
                                  type="button"
                                  onClick={() => toggleDayTime(dayId, time)}
                                  className={`rounded-xl px-2 py-2 text-xs font-semibold transition ${
                                    active
                                      ? 'bg-cyan-600 text-white shadow-[0_10px_18px_rgba(8,145,178,0.22)]'
                                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-cyan-200 hover:text-cyan-700'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(8,145,178,0.25)] transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? 'Saving…' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/Home/index')}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
