import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import InsurancePolicyPicker, { InsurancePolicyOption } from '../../components/InsurancePolicyPicker';
import SearchableSelect from '../../components/SearchableSelect';

type Option = InsurancePolicyOption & {
  id: string;
  name?: string | null;
  nationality?: string | null;
};

type CheckFolderResponse = {
  exists?: boolean;
};

type InsuranceProfileOption = {
  id: string;
  name?: string | null;
  insurance_profile_type_id?: string | null;
};

type InsuranceProfileTypeOption = {
  id: string;
  name?: string | null;
};

type PatientCreateResponse = {
  id?: string;
  first_name?: string;
  last_name?: string;
};

type FormState = {
  folder_number: string;
  first_name: string;
  last_name: string;
  gender_id: string;
  date_of_birth: string;
  phone: string;
  email: string;
  location_id: string;
  home_address: string;
  referring_facility: string;
  nationality_id: string;
  ethnicity_id: string;
  religion_id: string;
  education_id: string;
  occupation_id: string;
  occupation_name: string;
  marital_status_id: string;
  name_of_partner: string;
  language_id: string;
  blood_group_id: string;
  sickling_status: string;
  next_of_kin: string;
  next_of_kin_relation: string;
  next_of_kin_phone: string;
  insurance_profile_policies_id: string;
  insurance_card_name: string;
  insurance_card_serial: string;
  insurance_number: string;
  scheme_number: string;
  date_of_issue: string;
  date_of_renewal: string;
  copay: boolean;
  guarantor_name: string;
  guarantor_contact: string;
  guarantor_address: string;
  guarantor_relation: string;
  national_id_surname: string;
  national_id_first_name: string;
  national_id_middle_name: string;
  national_id_maiden_name: string;
  national_id_gender_id: string;
  national_id_date_of_expiry: string;
  national_id_date_of_birth: string;
  national_id_height: string;
  national_id_personal_id: string;
};

const initialForm: FormState = {
  folder_number: '',
  first_name: '',
  last_name: '',
  gender_id: '',
  date_of_birth: '',
  phone: '',
  email: '',
  location_id: '',
  home_address: '',
  referring_facility: '',
  nationality_id: '',
  ethnicity_id: '',
  religion_id: '',
  education_id: '',
  occupation_id: '',
  occupation_name: '',
  marital_status_id: '',
  name_of_partner: '',
  language_id: '',
  blood_group_id: '',
  sickling_status: '',
  next_of_kin: '',
  next_of_kin_relation: '',
  next_of_kin_phone: '',
  insurance_profile_policies_id: '',
  insurance_card_name: '',
  insurance_card_serial: '',
  insurance_number: '',
  scheme_number: '',
  date_of_issue: '',
  date_of_renewal: '',
  copay: false,
  guarantor_name: '',
  guarantor_contact: '',
  guarantor_address: '',
  guarantor_relation: '',
  national_id_surname: '',
  national_id_first_name: '',
  national_id_middle_name: '',
  national_id_maiden_name: '',
  national_id_gender_id: '',
  national_id_date_of_expiry: '',
  national_id_date_of_birth: '',
  national_id_height: '',
  national_id_personal_id: '',
};

const KIN_RELATIONS = ['Parent', 'Spouse', 'Sibling', 'Partner', 'Child', 'Other'];
const SICKLING_OPTIONS = [
  { id: '4', label: 'POSITIVE' },
  { id: '5', label: 'NEGATIVE' },
  { id: '11', label: 'NOT DONE' },
];

const optionLabel = (item: Option): string => {
  const name = (item.name ?? '').trim();
  const nationality = (item.nationality ?? '').trim();
  if (name) return name;
  if (nationality) return nationality;
  return item.id;
};

const toSearchableOptions = (rows: Option[]) =>
  rows
    .map((item) => {
      const value = String(item.id ?? '').trim();
      const label = optionLabel(item);
      if (!value || !label) return null;
      return { value, label };
    })
    .filter((item): item is { value: string; label: string } => Boolean(item));

const enrichInsurancePolicies = (
  policies: Option[],
  profiles: InsuranceProfileOption[],
  profileTypes: InsuranceProfileTypeOption[],
): Option[] => {
  const profileById = new Map<string, InsuranceProfileOption>();
  profiles.forEach((profile) => profileById.set(String(profile.id), profile));
  const typeById = new Map<string, InsuranceProfileTypeOption>();
  profileTypes.forEach((item) => typeById.set(String(item.id), item));

  return policies.map((policy) => {
    const profile = profileById.get(String(policy.insurance_profile_id ?? ''));
    const profileType = typeById.get(String(profile?.insurance_profile_type_id ?? ''));
    return {
      ...policy,
      insurance_profile_name: profile?.name ?? policy.insurance_profile_name ?? null,
      insurance_profile_type_name: profileType?.name ?? policy.insurance_profile_type_name ?? null,
    };
  });
};

export default function PatientsAddPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [createFolderNumber, setCreateFolderNumber] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [hasNationalId, setHasNationalId] = useState(false);
  const [receiveSms, setReceiveSms] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [nationalCard, setNationalCard] = useState<File | null>(null);

  const [folderChecking, setFolderChecking] = useState(false);
  const [folderAvailable, setFolderAvailable] = useState<boolean | null>(null);

  const [genders, setGenders] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Option[]>([]);
  const [nationalities, setNationalities] = useState<Option[]>([]);
  const [ethnicities, setEthnicities] = useState<Option[]>([]);
  const [religions, setReligions] = useState<Option[]>([]);
  const [educations, setEducations] = useState<Option[]>([]);
  const [occupations, setOccupations] = useState<Option[]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<Option[]>([]);
  const [languages, setLanguages] = useState<Option[]>([]);
  const [bloodGroups, setBloodGroups] = useState<Option[]>([]);
  const [insurancePolicies, setInsurancePolicies] = useState<Option[]>([]);

  useEffect(() => {
    let mounted = true;
    const loadOptions = async () => {
      setIsLoadingOptions(true);
      try {
        const [
          gendersData,
          locationsData,
          nationalitiesData,
          ethnicitiesData,
          religionsData,
          educationsData,
          occupationsData,
          maritalStatusesData,
          languagesData,
          bloodGroupsData,
          insurancePoliciesData,
          insuranceProfilesData,
          insuranceProfileTypesData,
        ] = await Promise.all([
          api.get<Option[]>('/genders/'),
          api.get<Option[]>('/locations/'),
          api.get<Option[]>('/nationalities/'),
          api.get<Option[]>('/ethnicities/'),
          api.get<Option[]>('/religions/'),
          api.get<Option[]>('/educations/'),
          api.get<Option[]>('/occupations/'),
          api.get<Option[]>('/marital_statuses/'),
          api.get<Option[]>('/languages/'),
          api.get<Option[]>('/blood_groups/'),
          api.get<Option[]>('/insurance_profile_policies/'),
          api.get<InsuranceProfileOption[]>('/insurance_profiles/'),
          api.get<InsuranceProfileTypeOption[]>('/insurance_profile_types/'),
        ]);

        if (!mounted) return;
        setGenders(Array.isArray(gendersData) ? gendersData : []);
        setLocations(Array.isArray(locationsData) ? locationsData : []);
        setNationalities(Array.isArray(nationalitiesData) ? nationalitiesData : []);
        setEthnicities(Array.isArray(ethnicitiesData) ? ethnicitiesData : []);
        setReligions(Array.isArray(religionsData) ? religionsData : []);
        setEducations(Array.isArray(educationsData) ? educationsData : []);
        setOccupations(Array.isArray(occupationsData) ? occupationsData : []);
        setMaritalStatuses(Array.isArray(maritalStatusesData) ? maritalStatusesData : []);
        setLanguages(Array.isArray(languagesData) ? languagesData : []);
        setBloodGroups(Array.isArray(bloodGroupsData) ? bloodGroupsData : []);
        setInsurancePolicies(
          enrichInsurancePolicies(
            Array.isArray(insurancePoliciesData) ? insurancePoliciesData : [],
            Array.isArray(insuranceProfilesData) ? insuranceProfilesData : [],
            Array.isArray(insuranceProfileTypesData) ? insuranceProfileTypesData : [],
          ),
        );
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load patient form options.');
      } finally {
        if (mounted) setIsLoadingOptions(false);
      }
    };

    loadOptions().catch(() => {
      if (!mounted) return;
      setError('Unable to load patient form options.');
      setIsLoadingOptions(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const isMarried = useMemo(() => {
    const current = maritalStatuses.find((item) => String(item.id) === form.marital_status_id);
    const label = current ? optionLabel(current).toLowerCase() : '';
    return label.includes('married') || form.marital_status_id === '2';
  }, [form.marital_status_id, maritalStatuses]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'folder_number') {
      setFolderAvailable(null);
    }
    setError(null);
  };

  const checkFolderNumber = async () => {
    if (createFolderNumber) {
      setFolderAvailable(true);
      return;
    }

    const folder = form.folder_number.trim();
    if (!folder) {
      setFolderAvailable(null);
      return;
    }

    setFolderChecking(true);
    try {
      const response = await api.get<CheckFolderResponse>(
        `/legacy/patients/check-folder-number/?folder_number=${encodeURIComponent(folder)}`,
      );
      const available = !Boolean(response?.exists);
      setFolderAvailable(available);
      if (!available) {
        setError('Folder number is already in use.');
      }
    } catch (err) {
      setFolderAvailable(null);
      setError(err instanceof Error ? err.message : 'Unable to validate folder number.');
    } finally {
      setFolderChecking(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setCreateFolderNumber(false);
    setHasInsurance(false);
    setHasNationalId(false);
    setReceiveSms(false);
    setProfilePhoto(null);
    setNationalCard(null);
    setFolderAvailable(null);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!createFolderNumber && !form.folder_number.trim()) {
      setError('Folder number is required unless auto-create is enabled.');
      return;
    }

    if (!createFolderNumber && folderAvailable === false) {
      setError('Folder number is already in use.');
      return;
    }

    const confirmation = window.confirm('Are you sure you want to submit this patient?');
    if (!confirmation) return;

    const payload: Record<string, unknown> = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      gender_id: form.gender_id || null,
      date_of_birth: form.date_of_birth || null,
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      location_id: form.location_id || null,
      home_address: form.home_address.trim() || null,
      referring_facility: form.referring_facility.trim() || null,
      nationality_id: form.nationality_id || null,
      ethnicity_id: form.ethnicity_id || null,
      religion_id: form.religion_id || null,
      education_id: form.education_id || null,
      occupation_id: form.occupation_id === 'other' ? null : (form.occupation_id || null),
      marital_status_id: form.marital_status_id || null,
      name_of_partner: isMarried ? (form.name_of_partner.trim() || null) : null,
      language_id: form.language_id || null,
      blood_group_id: form.blood_group_id || null,
      sickling_status: form.sickling_status || null,
      next_of_kin: form.next_of_kin.trim() || null,
      next_of_kin_relation: form.next_of_kin_relation || null,
      next_of_kin_phone: form.next_of_kin_phone.trim() || null,
      insurance_profile_policies_id: hasInsurance ? (form.insurance_profile_policies_id || null) : null,
      insurance_profile_policy_id: hasInsurance ? (form.insurance_profile_policies_id || null) : null,
      has_insurance: hasInsurance ? 1 : 0,
      sponsor_alternative: hasInsurance ? 'on' : '',
      insurance_card_name: hasInsurance ? (form.insurance_card_name.trim() || null) : null,
      insurance_card_serial: hasInsurance ? (form.insurance_card_serial.trim() || null) : null,
      insurance_number: hasInsurance ? (form.insurance_number.trim() || null) : null,
      scheme_number: hasInsurance ? (form.scheme_number.trim() || null) : null,
      date_of_issue: hasInsurance ? (form.date_of_issue || null) : null,
      date_of_renewal: hasInsurance ? (form.date_of_renewal || null) : null,
      copay: hasInsurance ? (form.copay ? 1 : 0) : 0,
      guarantor_name: hasInsurance ? (form.guarantor_name.trim() || null) : null,
      guarantor_contact: hasInsurance ? (form.guarantor_contact.trim() || null) : null,
      guarantor_address: hasInsurance ? (form.guarantor_address.trim() || null) : null,
      guarantor_relation: hasInsurance ? (form.guarantor_relation || null) : null,
      alternative: hasNationalId ? 'on' : '',
      surname: hasNationalId ? (form.national_id_surname.trim() || null) : null,
      first_name_2: hasNationalId ? (form.national_id_first_name.trim() || null) : null,
      middle_name_2: hasNationalId ? (form.national_id_middle_name.trim() || null) : null,
      maiden_name_2: hasNationalId ? (form.national_id_maiden_name.trim() || null) : null,
      gender_id_2: hasNationalId ? (form.national_id_gender_id || null) : null,
      date_of_expiry: hasNationalId ? (form.national_id_date_of_expiry || null) : null,
      date_of_birth_2: hasNationalId ? (form.national_id_date_of_birth || null) : null,
      height: hasNationalId ? (form.national_id_height.trim() || null) : null,
      personal_id: hasNationalId ? (form.national_id_personal_id.trim() || null) : null,
      accept_sms: receiveSms ? 1 : 0,
      patient_type: 1,
      registration_date: new Date().toISOString().slice(0, 10),
    };

    if (!createFolderNumber) {
      payload.folder_number = form.folder_number.trim();
    }

    if (form.occupation_id === 'other' && form.occupation_name.trim()) {
      payload.occupation = form.occupation_name.trim();
    }

    const payloadData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      payloadData.append(key, String(value));
    });
    if (profilePhoto) {
      payloadData.append('image', profilePhoto);
    }
    if (nationalCard && hasNationalId) {
      payloadData.append('national_card', nationalCard);
    }

    setIsSubmitting(true);
    try {
      const created = await api.post<PatientCreateResponse>('/legacy/patients/add-patient/', payloadData);
      const patientId = created?.id ? String(created.id) : '';
      setSuccess('Patient registered successfully.');
      if (patientId) {
        navigate(`/Home/patient?patient_id=${encodeURIComponent(patientId)}`);
      } else {
        navigate('/Patients/view_patients');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to register patient.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmergencyCreate = async () => {
    setError(null);
    setSuccess(null);

    const confirmation = window.confirm('Create an emergency patient now?');
    if (!confirmation) return;

    const now = new Date();
    const emergencyPayload: Record<string, unknown> = {
      first_name: 'Emergency',
      last_name: `Patient ${now.getTime()}`,
      patient_type: 2,
      accept_sms: 0,
      registration_date: now.toISOString().slice(0, 10),
      date_of_birth: now.toISOString().slice(0, 10),
      phone: '0000000000',
      home_address: 'Emergency',
      gender_id: form.gender_id || '3',
    };

    setIsSubmitting(true);
    try {
      const created = await api.post<PatientCreateResponse>('/legacy/patients/add-patient/', emergencyPayload);
      const patientId = created?.id ? String(created.id) : '';
      setSuccess('Emergency patient created successfully.');
      if (patientId) {
        navigate(`/Home/patient?patient_id=${encodeURIComponent(patientId)}`);
      } else {
        navigate('/Patients/view_patients');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create emergency patient.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Patients</p>
          <h1 className="text-2xl font-semibold text-slate-900">Register New Patient</h1>
          <p className="text-sm text-slate-600">Complete patient information and submit to create a record.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            handleEmergencyCreate().catch(() => {
              setError('Unable to create emergency patient.');
            });
          }}
          disabled={isSubmitting}
          className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Emergency Patient
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
      ) : null}

      <form className="space-y-8" onSubmit={handleSubmit}>
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Patient Information</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-xs text-slate-600">
              Create Folder Number Automatically
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={createFolderNumber}
                  onChange={(event) => {
                    setCreateFolderNumber(event.target.checked);
                    if (event.target.checked) setFolderAvailable(true);
                    else setFolderAvailable(null);
                  }}
                />
                <span>Enable auto-generation</span>
              </div>
            </label>

            <label className="text-xs text-slate-600">
              Folder Number
              <input
                value={form.folder_number}
                onChange={(event) => updateField('folder_number', event.target.value)}
                onBlur={() => {
                  checkFolderNumber().catch(() => {
                    setError('Unable to validate folder number.');
                  });
                }}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
                required={!createFolderNumber}
                disabled={createFolderNumber}
                placeholder={createFolderNumber ? 'Will be generated automatically' : 'Enter folder number'}
              />
              <span className="mt-1 block text-[11px] text-slate-500">
                {createFolderNumber
                  ? 'Folder number will be generated on submit.'
                  : folderChecking
                    ? 'Checking availability...'
                    : folderAvailable === true
                      ? 'Folder number is available'
                      : folderAvailable === false
                        ? 'Folder number is already in use'
                        : ''}
              </span>
            </label>

            <label className="text-xs text-slate-600">
              First Name & Middle Names
              <input
                value={form.first_name}
                onChange={(event) => updateField('first_name', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                required
              />
            </label>

            <label className="text-xs text-slate-600">
              Last Name
              <input
                value={form.last_name}
                onChange={(event) => updateField('last_name', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                required
              />
            </label>

            <label className="text-xs text-slate-600">
              Gender
              <SearchableSelect
                value={form.gender_id}
                onChange={(value) => updateField('gender_id', value)}
                options={toSearchableOptions(genders)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Date of Birth
              <input
                type="date"
                value={form.date_of_birth}
                onChange={(event) => updateField('date_of_birth', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                required
              />
            </label>

            <label className="text-xs text-slate-600 md:col-span-2">
              Profile Photo (Passport)
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                onChange={(event) => setProfilePhoto(event.target.files?.[0] ?? null)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Contact & Location</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-xs text-slate-600">
              Mobile No.
              <input
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                required
              />
            </label>

            <label className="text-xs text-slate-600">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <label className="text-xs text-slate-600 md:col-span-2">
              Address
              <textarea
                value={form.home_address}
                onChange={(event) => updateField('home_address', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                rows={3}
                required
              />
            </label>

            <label className="text-xs text-slate-600">
              Location
              <SearchableSelect
                value={form.location_id}
                onChange={(value) => updateField('location_id', value)}
                options={toSearchableOptions(locations)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Referring Facility
              <input
                value={form.referring_facility}
                onChange={(event) => updateField('referring_facility', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Personal Details & Health History</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-xs text-slate-600">
              Nationality
              <SearchableSelect
                value={form.nationality_id}
                onChange={(value) => updateField('nationality_id', value)}
                options={toSearchableOptions(nationalities)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Ethnicity and Race
              <SearchableSelect
                value={form.ethnicity_id}
                onChange={(value) => updateField('ethnicity_id', value)}
                options={toSearchableOptions(ethnicities)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Religion
              <SearchableSelect
                value={form.religion_id}
                onChange={(value) => updateField('religion_id', value)}
                options={toSearchableOptions(religions)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Education
              <SearchableSelect
                value={form.education_id}
                onChange={(value) => updateField('education_id', value)}
                options={toSearchableOptions(educations)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Occupation
              <SearchableSelect
                value={form.occupation_id}
                onChange={(value) => updateField('occupation_id', value)}
                options={[{ value: 'other', label: 'Other' }, ...toSearchableOptions(occupations)]}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            {form.occupation_id === 'other' ? (
              <label className="text-xs text-slate-600">
                Occupation Name
                <input
                  value={form.occupation_name}
                  onChange={(event) => updateField('occupation_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
            ) : null}

            <label className="text-xs text-slate-600">
              Marital Status
              <SearchableSelect
                value={form.marital_status_id}
                onChange={(value) => updateField('marital_status_id', value)}
                options={toSearchableOptions(maritalStatuses)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            {isMarried ? (
              <label className="text-xs text-slate-600">
                Name of Partner
                <input
                  value={form.name_of_partner}
                  onChange={(event) => updateField('name_of_partner', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
            ) : null}

            <label className="text-xs text-slate-600">
              Language
              <SearchableSelect
                value={form.language_id}
                onChange={(value) => updateField('language_id', value)}
                options={toSearchableOptions(languages)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Blood Group
              <SearchableSelect
                value={form.blood_group_id}
                onChange={(value) => updateField('blood_group_id', value)}
                options={toSearchableOptions(bloodGroups)}
                placeholder="Select..."
                className="mt-2"
                disabled={isLoadingOptions}
              />
            </label>

            <label className="text-xs text-slate-600">
              Sickling Status
              <SearchableSelect
                value={form.sickling_status}
                onChange={(value) => updateField('sickling_status', value)}
                options={SICKLING_OPTIONS.map((item) => ({ value: item.id, label: item.label }))}
                placeholder="Select..."
                className="mt-2"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Next of Kin</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-xs text-slate-600">
              Name
              <input
                value={form.next_of_kin}
                onChange={(event) => updateField('next_of_kin', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <label className="text-xs text-slate-600">
              Relation
              <SearchableSelect
                value={form.next_of_kin_relation}
                onChange={(value) => updateField('next_of_kin_relation', value)}
                options={KIN_RELATIONS.map((item) => ({ value: item, label: item }))}
                placeholder="Select..."
                className="mt-2"
              />
            </label>

            <label className="text-xs text-slate-600 md:col-span-2">
              Phone
              <input
                value={form.next_of_kin_phone}
                onChange={(event) => updateField('next_of_kin_phone', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">Insurance</h2>
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={hasInsurance}
                onChange={(event) => setHasInsurance(event.target.checked)}
              />
              Patient is under insurance
            </label>
          </div>

          {hasInsurance ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-xs text-slate-600 md:col-span-2">
                Sponsor / Policy
                <InsurancePolicyPicker
                  id="insurance_profile_policies_id"
                  options={insurancePolicies}
                  value={form.insurance_profile_policies_id}
                  onChange={(nextValue) => updateField('insurance_profile_policies_id', nextValue)}
                  disabled={isLoadingOptions}
                />
              </label>
              <label className="text-xs text-slate-600">
                Membership Card Name
                <input
                  value={form.insurance_card_name}
                  onChange={(event) => updateField('insurance_card_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Card Serial Number
                <input
                  value={form.insurance_card_serial}
                  onChange={(event) => updateField('insurance_card_serial', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Membership ID
                <input
                  value={form.insurance_number}
                  onChange={(event) => updateField('insurance_number', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Scheme Number
                <input
                  value={form.scheme_number}
                  onChange={(event) => updateField('scheme_number', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Date of Issue
                <input
                  type="date"
                  value={form.date_of_issue}
                  onChange={(event) => updateField('date_of_issue', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Date of Renewal
                <input
                  type="date"
                  value={form.date_of_renewal}
                  onChange={(event) => updateField('date_of_renewal', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 md:col-span-2">
                <input
                  type="checkbox"
                  checked={form.copay}
                  onChange={(event) => updateField('copay', event.target.checked)}
                />
                Co-Pay
              </label>
              <label className="text-xs text-slate-600">
                Guarantor Name
                <input
                  value={form.guarantor_name}
                  onChange={(event) => updateField('guarantor_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Guarantor Contact
                <input
                  value={form.guarantor_contact}
                  onChange={(event) => updateField('guarantor_contact', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600 md:col-span-2">
                Guarantor Address
                <input
                  value={form.guarantor_address}
                  onChange={(event) => updateField('guarantor_address', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600 md:col-span-2">
                Guarantor Relation
                <SearchableSelect
                  value={form.guarantor_relation}
                  onChange={(value) => updateField('guarantor_relation', value)}
                  options={KIN_RELATIONS.map((item) => ({ value: item, label: item }))}
                  placeholder="Select..."
                  className="mt-2"
                />
              </label>
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">National Identification</h2>
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={hasNationalId}
                onChange={(event) => setHasNationalId(event.target.checked)}
              />
              Provide card details
            </label>
          </div>

          {hasNationalId ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-xs text-slate-600">
                Surname
                <input
                  value={form.national_id_surname}
                  onChange={(event) => updateField('national_id_surname', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                First Name
                <input
                  value={form.national_id_first_name}
                  onChange={(event) => updateField('national_id_first_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Middle Name
                <input
                  value={form.national_id_middle_name}
                  onChange={(event) => updateField('national_id_middle_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Previous / Maiden Name
                <input
                  value={form.national_id_maiden_name}
                  onChange={(event) => updateField('national_id_maiden_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Sex
                <SearchableSelect
                  value={form.national_id_gender_id}
                  onChange={(value) => updateField('national_id_gender_id', value)}
                  options={[
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                  ]}
                  placeholder="Select..."
                  className="mt-2"
                />
              </label>
              <label className="text-xs text-slate-600">
                Date of Expiry
                <input
                  type="date"
                  value={form.national_id_date_of_expiry}
                  onChange={(event) => updateField('national_id_date_of_expiry', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Date of Birth
                <input
                  type="date"
                  value={form.national_id_date_of_birth}
                  onChange={(event) => updateField('national_id_date_of_birth', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Height (CM)
                <input
                  value={form.national_id_height}
                  onChange={(event) => updateField('national_id_height', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Personal ID Number
                <input
                  value={form.national_id_personal_id}
                  onChange={(event) => updateField('national_id_personal_id', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600 md:col-span-2">
                Upload ID Card
                <input
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  onChange={(event) => setNationalCard(event.target.files?.[0] ?? null)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold"
                />
              </label>
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input type="checkbox" checked={receiveSms} onChange={(event) => setReceiveSms(event.target.checked)} />
            Send SMS updates to patient
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting || isLoadingOptions}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => navigate('/Patients/view_patients')}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800"
            >
              Cancel
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
