import { FormEvent, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type Option = {
  id: string;
  name?: string | null;
};

type PatientSearchResult = {
  id: string;
  first_name?: string;
  last_name?: string;
  folder_number?: string;
  code?: string;
  phone?: string;
  email?: string;
  date_of_birth?: string | null;
  patient_visits?: Array<{ date_created?: string | null }>;
};

type PatientSummary = {
  id: string;
  first_name?: string;
  last_name?: string;
  folder_number?: string;
  code?: string;
  phone?: string;
  email?: string;
  date_of_birth?: string | null;
  gender_id?: string;
};

type WalkinServiceResponse = {
  ok?: boolean;
  patient_id?: string;
  visit_id?: string;
  redirect_path?: string;
};

type WalkinForm = {
  first_name: string;
  last_name: string;
  gender_id: string;
  date_of_birth: string;
  phone: string;
  email: string;
  home_address: string;
};

const initialForm: WalkinForm = {
  first_name: '',
  last_name: '',
  gender_id: '',
  date_of_birth: '',
  phone: '',
  email: '',
  home_address: '',
};

const formatDate = (value?: string | null): string => {
  if (!value) return 'N/A';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-GB');
};

const calculateAge = (value?: string | null): string => {
  if (!value) return 'N/A';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'N/A';
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const hasNotHadBirthday =
    now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate());
  if (hasNotHadBirthday) age -= 1;
  return age >= 0 ? String(age) : 'N/A';
};

const mapGender = (genderId?: string): string => {
  if (String(genderId) === '1') return 'Male';
  if (String(genderId) === '2') return 'Female';
  return 'Other';
};

const moduleLabel = (type: string): string => {
  if (type === 'walkinScan') return 'Scan';
  if (type === 'walkindrug') return 'Pharmacy';
  if (type === 'walkinlab') return 'Lab';
  return '';
};

const moduleTitle = (type: string): string => {
  const label = moduleLabel(type);
  if (!label) return 'Firstline24 Walk-In Module';
  return `Firstline24 ${label} Walk-In Module`;
};

const normalizeType = (value: string | null): string => {
  const type = String(value || '').trim();
  if (type === 'walkinScan' || type === 'walkindrug' || type === 'walkinlab') return type;
  return '';
};

const serviceOptions = [
  { value: 'walkinlab', label: 'Lab' },
  { value: 'walkinScan', label: 'Scan' },
  { value: 'walkindrug', label: 'Pharmacy' },
];

export default function PatientsAddWalkinPatient() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const type = normalizeType(searchParams.get('type'));
  const label = useMemo(() => moduleLabel(type), [type]);

  const [activeTab, setActiveTab] = useState<'registered' | 'walkin'>('registered');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [genders, setGenders] = useState<Option[]>([]);
  const [form, setForm] = useState<WalkinForm>(initialForm);

  const [search, setSearch] = useState('');
  const [searchHits, setSearchHits] = useState<PatientSearchResult[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [suppressSuggestions, setSuppressSuggestions] = useState(false);

  const updateField = <K extends keyof WalkinForm>(field: K, value: WalkinForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  useEffect(() => {
    let mounted = true;
    const loadOptions = async () => {
      try {
        const genderData = await api.get<Option[]>('/genders/');
        if (!mounted) return;
        setGenders(Array.isArray(genderData) ? genderData : []);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load walk-in form options.');
      }
    };

    loadOptions().catch(() => {
      if (!mounted) return;
      setError('Unable to load walk-in form options.');
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (activeTab !== 'registered') return;
    const term = search.trim();
    if (suppressSuggestions || term.length < 2) {
      setSearchHits([]);
      return;
    }

    const handle = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        const results = await api.get<PatientSearchResult[]>(
          `/legacy/patients/search-predictive-patient-name/?name=${encodeURIComponent(term)}&limit=12`,
        );
        setSearchHits(Array.isArray(results) ? results : []);
      } catch {
        setSearchHits([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => window.clearTimeout(handle);
  }, [search, activeTab]);

  const pickPatient = async (candidate: PatientSearchResult) => {
    setError(null);
    setSearchHits([]);
    setSuppressSuggestions(true);
    setSearch(`${candidate.first_name || ''} ${candidate.last_name || ''}`.trim());

    try {
      const patient = await api.get<PatientSummary>(
        `/legacy/patients/view-patient/?id=${encodeURIComponent(candidate.id)}`,
      );
      setSelectedPatient(patient || candidate);
    } catch (err) {
      setSelectedPatient(candidate);
      setError(err instanceof Error ? err.message : 'Could not load full patient details.');
    }
  };

  const startServiceForPatient = async (patientId: string) => {
    if (!type) {
      throw new Error('Select the walk-in service before continuing.');
    }
    const response = await api.post<WalkinServiceResponse>(
      `/legacy/patients/request-walkin-service/?type=${encodeURIComponent(type)}`,
      { patient_id: patientId },
    );
    if (response?.redirect_path) {
      navigate(response.redirect_path);
      return;
    }
    setSuccess(`Service request created. Visit ID: ${response?.visit_id || 'N/A'}`);
  };

  const submitRegisteredPatient = async () => {
    if (!selectedPatient?.id) {
      setError('Select a patient first.');
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    try {
      await startServiceForPatient(selectedPatient.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to request walk-in service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitWalkinRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (!type) {
        throw new Error('Select the walk-in service before registering the patient.');
      }
      const created = await api.post<{ id?: string }>(
        `/legacy/patients/add-walkin-patient/?type=${encodeURIComponent(type)}`,
        {
          ...form,
          patient_type: 2,
          accept_sms: 0,
        },
      );

      const patientId = created?.id;
      if (!patientId) {
        throw new Error('Patient was created but no patient ID was returned.');
      }

      await startServiceForPatient(patientId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to register walk-in patient.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmergency = async () => {
    setActiveTab('walkin');
    setForm((prev) => ({
      ...prev,
      first_name: 'Emergency',
      last_name: 'Patient',
      gender_id: prev.gender_id || '3',
      date_of_birth: prev.date_of_birth || '1990-01-01',
      phone: prev.phone || '0000000000',
      home_address: prev.home_address || 'Emergency intake',
    }));
    setSuccess('Emergency defaults applied. Review and submit the registration form.');
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Patients</p>
            <h1 className="text-2xl font-semibold text-slate-900">{moduleTitle(type)}</h1>
            <p className="mt-1 text-sm text-slate-600">Patient registration and request handling</p>
          </div>
          <button
            type="button"
            onClick={handleEmergency}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Emergency Patient
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {serviceOptions.map((option) => (
            <span
              key={option.value}
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                type === option.value ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {option.label}
            </span>
          ))}
          {!type ? (
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Select the required walk-in service below
            </span>
          ) : null}
        </div>
      </section>

      {!type ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Service Selection</p>
              <h2 className="text-base font-semibold text-slate-900">Choose a walk-in service</h2>
              <p className="mt-1 text-sm text-slate-600">The selected service determines where the patient request is routed next.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {serviceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => navigate(`/Patients/add_walkin_patient?type=${encodeURIComponent(option.value)}`)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-sky-300 hover:bg-sky-50"
              >
                <p className="text-sm font-semibold text-slate-900">{option.label} Walk-In</p>
                <p className="mt-1 text-xs text-slate-600">Open the {option.label.toLowerCase()} workflow for registered or new walk-in patients.</p>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {type ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-2">
          <div className="grid gap-2 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setActiveTab('registered')}
              className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                activeTab === 'registered' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Registered Patients
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('walkin')}
              className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                activeTab === 'walkin' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Walk-In Registration
            </button>
          </div>
        </section>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
      ) : null}

      {type && activeTab === 'registered' ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold text-slate-900">Search Patient Records</h2>

          <div className="relative mt-4">
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedPatient(null);
                setSuppressSuggestions(false);
              }}
              placeholder="Search by MRN, mobile number, or patient name..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
            />
            {searchHits.length > 0 ? (
              <div className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {searchHits.map((item) => {
                  const age = calculateAge(item.date_of_birth);
                  const lastVisit = formatDate(item.patient_visits?.[0]?.date_created || null);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => pickPatient(item)}
                      className="mb-1 w-full rounded-lg border border-transparent px-3 py-2 text-left hover:border-slate-200 hover:bg-slate-50"
                    >
                      <p className="text-sm font-medium text-slate-900">
                        {(item.first_name || '').trim()} {(item.last_name || '').trim()}
                      </p>
                      <p className="text-xs text-slate-500">
                        MRN: {item.folder_number || 'N/A'} | Age: {age} | Last visit: {lastVisit}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          {selectedPatient ? (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-900">Patient Record Found</h3>
              <p className="mt-2">Name: {(selectedPatient.first_name || '').trim()} {(selectedPatient.last_name || '').trim()}</p>
              <p>MRN: {selectedPatient.folder_number || 'N/A'}</p>
              <p>Code: {selectedPatient.code || 'N/A'}</p>
              <p>
                Age/Gender: {calculateAge(selectedPatient.date_of_birth)} / {mapGender(selectedPatient.gender_id)}
              </p>
              <p>Contact: {selectedPatient.phone || 'N/A'}</p>
              <p>Email: {selectedPatient.email || 'N/A'}</p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSearchHits([]);
                setSelectedPatient(null);
                setError(null);
                setSuccess(null);
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submitRegisteredPatient}
              disabled={isSubmitting || !selectedPatient?.id}
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Processing...' : `Request ${label} →`}
            </button>
          </div>
        </section>
      ) : null}

      {type && activeTab === 'walkin' ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold text-slate-900">Patient Registration</h2>

          <form className="mt-4 space-y-5" onSubmit={submitWalkinRegistration}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-xs text-slate-600">
                Last Name *
                <input
                  required
                  value={form.last_name}
                  onChange={(event) => updateField('last_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                First Name & Middle Names *
                <input
                  required
                  value={form.first_name}
                  onChange={(event) => updateField('first_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Gender *
                <SearchableSelectField
                  required
                  value={form.gender_id}
                  onChange={(event) => updateField('gender_id', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="">Select gender</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.name || gender.id}
                    </option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Date of Birth *
                <input
                  required
                  type="date"
                  value={form.date_of_birth}
                  onChange={(event) => updateField('date_of_birth', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Mobile Number *
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Email Address
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
            </div>

            <label className="block text-xs text-slate-600">
              Home Address *
              <textarea
                required
                rows={3}
                value={form.home_address}
                onChange={(event) => updateField('home_address', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
              Digital reports are available when an email is provided. SMS can be sent from later workflow steps.
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setError(null);
                  setSuccess(null);
                }}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Registering...' : 'Register Patient →'}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
