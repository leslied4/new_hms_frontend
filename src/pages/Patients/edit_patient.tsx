import { FormEvent, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InsurancePolicyPicker, { InsurancePolicyOption } from '../../components/InsurancePolicyPicker';
import { api } from '../../lib/api';

type Option = InsurancePolicyOption & {
  id: string;
  name?: string | null;
  nationality?: string | null;
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

type GenericRecord = Record<string, unknown>;
type PatientRecord = Record<string, unknown>;

type DetailedPatientResponse = {
  patient?: PatientRecord;
  patient_image?: GenericRecord | null;
  insurances?: GenericRecord[];
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
  marital_status_id: string;
  name_of_partner: string;
  language_id: string;
  blood_group_id: string;
  sickling_status: string;
  next_of_kin: string;
  next_of_kin_relation: string;
  next_of_kin_phone: string;
  accept_sms: boolean;
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
  marital_status_id: '',
  name_of_partner: '',
  language_id: '',
  blood_group_id: '',
  sickling_status: '',
  next_of_kin: '',
  next_of_kin_relation: '',
  next_of_kin_phone: '',
  accept_sms: false,
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
};

const KIN_RELATIONS = ['Parent', 'Spouse', 'Sibling', 'Partner', 'Child', 'Other'];
const SICKLING_OPTIONS = [
  { id: '4', label: 'POSITIVE' },
  { id: '5', label: 'NEGATIVE' },
  { id: '11', label: 'NOT DONE' },
];

const BACKEND_ORIGIN = String(import.meta.env.VITE_BACKEND_ORIGIN || window.location.origin).replace(/\/$/, '');

const optionLabel = (item: Option): string => {
  const name = (item.name ?? '').trim();
  const nationality = (item.nationality ?? '').trim();
  if (name) return name;
  if (nationality) return nationality;
  return item.id;
};

const imageUrlFromPath = (filePath: unknown): string | null => {
  const path = String(filePath || '').trim();
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('uploads/')) return `${BACKEND_ORIGIN}/media/${path}`;
  if (path.startsWith('media/')) return `${BACKEND_ORIGIN}/${path}`;
  if (path.startsWith('/')) return `${BACKEND_ORIGIN}${path}`;
  return `${BACKEND_ORIGIN}/img/${path}`;
};

const toInputDate = (value: unknown): string => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

const asString = (value: unknown): string => String(value ?? '').trim();

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

export default function PatientsEditPatient() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patient_id') || searchParams.get('id') || '';

  const [form, setForm] = useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceRecordId, setInsuranceRecordId] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);

  const isMarried = useMemo(() => {
    const current = maritalStatuses.find((item) => String(item.id) === form.marital_status_id);
    const label = current ? optionLabel(current).toLowerCase() : '';
    return label.includes('married') || form.marital_status_id === '2';
  }, [form.marital_status_id, maritalStatuses]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!patientId) {
        setError('Missing patient_id in URL.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const [
          detail,
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
          api.get<DetailedPatientResponse>(`/legacy/patients/view-patient/?id=${encodeURIComponent(patientId)}&detailed=1`),
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

        const patient = detail.patient ?? (detail as unknown as PatientRecord);
        const insurances = Array.isArray(detail.insurances) ? detail.insurances : [];
        const primaryInsurance = insurances[0] ?? null;

        setForm({
          folder_number: asString(patient.folder_number),
          first_name: asString(patient.first_name),
          last_name: asString(patient.last_name),
          gender_id: asString(patient.gender_id),
          date_of_birth: toInputDate(patient.date_of_birth),
          phone: asString(patient.phone),
          email: asString(patient.email),
          location_id: asString(patient.location_id),
          home_address: asString(patient.home_address),
          referring_facility: asString(patient.referring_facility),
          nationality_id: asString(patient.nationality_id),
          ethnicity_id: asString(patient.ethnicity_id),
          religion_id: asString(patient.religion_id),
          education_id: asString(patient.education_id),
          occupation_id: asString(patient.occupation_id),
          marital_status_id: asString(patient.marital_status_id),
          name_of_partner: asString(patient.name_of_partner),
          language_id: asString(patient.language_id),
          blood_group_id: asString(patient.blood_group_id),
          sickling_status: asString(patient.sickling_status),
          next_of_kin: asString(patient.next_of_kin),
          next_of_kin_relation: asString(patient.next_of_kin_relation),
          next_of_kin_phone: asString(patient.next_of_kin_phone),
          accept_sms: String(patient.accept_sms || '0') === '1',
          insurance_profile_policies_id: asString(primaryInsurance?.insurance_profile_policy_id),
          insurance_card_name: asString(primaryInsurance?.insurance_card_name),
          insurance_card_serial: asString(primaryInsurance?.insurance_card_serial),
          insurance_number: asString(primaryInsurance?.insurance_number),
          scheme_number: asString(primaryInsurance?.scheme_number),
          date_of_issue: toInputDate(primaryInsurance?.date_of_issue),
          date_of_renewal: toInputDate(primaryInsurance?.date_of_renewal),
          copay: String(primaryInsurance?.copay || '0') === '1',
          guarantor_name: asString(primaryInsurance?.guarantor_name),
          guarantor_contact: asString(primaryInsurance?.guarantor_contact),
          guarantor_address: asString(primaryInsurance?.guarantor_address),
          guarantor_relation: asString(primaryInsurance?.guarantor_relation),
        });

        setHasInsurance(Boolean(primaryInsurance));
        setInsuranceRecordId(asString(primaryInsurance?.id));
        setExistingPhotoUrl(imageUrlFromPath(detail.patient_image?.file_path));

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
        setError(err instanceof Error ? err.message : 'Unable to load patient details.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load().catch(() => {
      if (!mounted) return;
      setError('Unable to load patient details.');
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [patientId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patientId) {
      setError('Missing patient_id in URL.');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = new FormData();
      payload.append('folder_number', form.folder_number.trim());
      payload.append('first_name', form.first_name.trim());
      payload.append('last_name', form.last_name.trim());
      payload.append('gender_id', form.gender_id || '');
      payload.append('date_of_birth', form.date_of_birth || '');
      payload.append('phone', form.phone.trim());
      payload.append('email', form.email.trim());
      payload.append('location_id', form.location_id || '');
      payload.append('home_address', form.home_address.trim());
      payload.append('referring_facility', form.referring_facility.trim());
      payload.append('nationality_id', form.nationality_id || '');
      payload.append('ethnicity_id', form.ethnicity_id || '');
      payload.append('religion_id', form.religion_id || '');
      payload.append('education_id', form.education_id || '');
      payload.append('occupation_id', form.occupation_id || '');
      payload.append('marital_status_id', form.marital_status_id || '');
      payload.append('name_of_partner', form.name_of_partner.trim());
      payload.append('language_id', form.language_id || '');
      payload.append('blood_group_id', form.blood_group_id || '');
      payload.append('sickling_status', form.sickling_status || '');
      payload.append('next_of_kin', form.next_of_kin.trim());
      payload.append('next_of_kin_relation', form.next_of_kin_relation.trim());
      payload.append('next_of_kin_phone', form.next_of_kin_phone.trim());
      payload.append('accept_sms', form.accept_sms ? '1' : '0');
      if (profilePhoto) {
        payload.append('image', profilePhoto);
      }

      await api.patch(`/legacy/patients/edit-patient/?id=${encodeURIComponent(patientId)}`, payload);

      if (
        hasInsurance &&
        form.insurance_profile_policies_id &&
        form.insurance_number.trim()
      ) {
        const insurancePayload = {
          insurance_profile_policy_id: form.insurance_profile_policies_id || null,
          insurance_card_name: form.insurance_card_name.trim() || null,
          insurance_number: form.insurance_number.trim(),
          insurance_card_serial: form.insurance_card_serial.trim() || null,
          scheme_number: form.scheme_number.trim() || null,
          copay: form.copay ? 1 : 0,
          date_of_issue: form.date_of_issue || null,
          date_of_renewal: form.date_of_renewal || null,
          guarantor_name: form.guarantor_name.trim() || null,
          guarantor_contact: form.guarantor_contact.trim() || null,
          guarantor_address: form.guarantor_address.trim() || null,
          guarantor_relation: form.guarantor_relation.trim() || null,
        };
        if (insuranceRecordId) {
          await api.patch(`/legacy/patients/edit-insurance-provider/?id=${encodeURIComponent(insuranceRecordId)}`, insurancePayload);
        } else {
          await api.post('/legacy/patients/add-insurance-provider/', {
            patient_id: patientId,
            ...insurancePayload,
          });
        }
      }

      setSuccess('Patient updated successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update patient.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Patients</p>
          <h1 className="text-2xl font-semibold text-slate-900">Edit Patient</h1>
          <p className="text-sm text-slate-600">Update patient profile and sponsor details.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/Patients/view_patient?patient_id=${encodeURIComponent(patientId)}`)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800"
          >
            Back to Profile
          </button>
        </div>
      </div>

      {error ? <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}
      {isLoading ? <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Loading patient...</div> : null}

      {!isLoading ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-900">Profile Photo</h2>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {profilePhoto ? (
                <img
                  src={URL.createObjectURL(profilePhoto)}
                  alt="Selected profile"
                  className="h-24 w-24 rounded-full border border-slate-200 object-cover"
                />
              ) : existingPhotoUrl ? (
                <img src={existingPhotoUrl} alt="Current profile" className="h-24 w-24 rounded-full border border-slate-200 object-cover" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-500">
                  No Image
                </div>
              )}
              <label className="text-xs text-slate-600">
                Replace Profile Photo
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(event) => setProfilePhoto(event.target.files?.[0] ?? null)}
                  className="mt-2 block text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-700"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-900">Basic Information</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-xs text-slate-600">
                Folder Number
                <input
                  value={form.folder_number}
                  onChange={(event) => updateField('folder_number', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Gender
                <SearchableSelectField
                  value={form.gender_id}
                  onChange={(event) => updateField('gender_id', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="">Select...</option>
                  {genders.map((item) => (
                    <option key={item.id} value={item.id}>
                      {optionLabel(item)}
                    </option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                First Name
                <input
                  value={form.first_name}
                  onChange={(event) => updateField('first_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Last Name
                <input
                  value={form.last_name}
                  onChange={(event) => updateField('last_name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Date of Birth
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={(event) => updateField('date_of_birth', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Email
                <input
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={form.accept_sms}
                  onChange={(event) => updateField('accept_sms', event.target.checked)}
                />
                Receive SMS updates
              </label>
              <label className="text-xs text-slate-600">
                Location
                <SearchableSelectField
                  value={form.location_id}
                  onChange={(event) => updateField('location_id', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="">Select...</option>
                  {locations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {optionLabel(item)}
                    </option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600 md:col-span-2">
                Home Address
                <textarea
                  value={form.home_address}
                  onChange={(event) => updateField('home_address', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  rows={2}
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-900">Demographics & Clinical</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label className="text-xs text-slate-600">
                Nationality
                <SearchableSelectField value={form.nationality_id} onChange={(event) => updateField('nationality_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {nationalities.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Ethnicity
                <SearchableSelectField value={form.ethnicity_id} onChange={(event) => updateField('ethnicity_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {ethnicities.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Religion
                <SearchableSelectField value={form.religion_id} onChange={(event) => updateField('religion_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {religions.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Education
                <SearchableSelectField value={form.education_id} onChange={(event) => updateField('education_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {educations.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Occupation
                <SearchableSelectField value={form.occupation_id} onChange={(event) => updateField('occupation_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {occupations.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Marital Status
                <SearchableSelectField value={form.marital_status_id} onChange={(event) => updateField('marital_status_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {maritalStatuses.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              {isMarried ? (
                <label className="text-xs text-slate-600 md:col-span-2">
                  Partner Name
                  <input value={form.name_of_partner} onChange={(event) => updateField('name_of_partner', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
              ) : null}
              <label className="text-xs text-slate-600">
                Language
                <SearchableSelectField value={form.language_id} onChange={(event) => updateField('language_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {languages.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Blood Group
                <SearchableSelectField value={form.blood_group_id} onChange={(event) => updateField('blood_group_id', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {bloodGroups.map((item) => (
                    <option key={item.id} value={item.id}>{optionLabel(item)}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Sickling Status
                <SearchableSelectField value={form.sickling_status} onChange={(event) => updateField('sickling_status', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {SICKLING_OPTIONS.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </SearchableSelectField>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-900">Next of Kin</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label className="text-xs text-slate-600">
                Name
                <input value={form.next_of_kin} onChange={(event) => updateField('next_of_kin', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
              </label>
              <label className="text-xs text-slate-600">
                Relation
                <SearchableSelectField value={form.next_of_kin_relation} onChange={(event) => updateField('next_of_kin_relation', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="">Select...</option>
                  {KIN_RELATIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600">
                Phone
                <input value={form.next_of_kin_phone} onChange={(event) => updateField('next_of_kin_phone', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
              </label>
              <label className="text-xs text-slate-600 md:col-span-3">
                Referring Facility
                <input value={form.referring_facility} onChange={(event) => updateField('referring_facility', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
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
                  />
                </label>
                <label className="text-xs text-slate-600">
                  Membership Card Name
                  <input value={form.insurance_card_name} onChange={(event) => updateField('insurance_card_name', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Card Serial Number
                  <input value={form.insurance_card_serial} onChange={(event) => updateField('insurance_card_serial', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Membership ID
                  <input value={form.insurance_number} onChange={(event) => updateField('insurance_number', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Scheme Number
                  <input value={form.scheme_number} onChange={(event) => updateField('scheme_number', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Date of Issue
                  <input type="date" value={form.date_of_issue} onChange={(event) => updateField('date_of_issue', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Date of Renewal
                  <input type="date" value={form.date_of_renewal} onChange={(event) => updateField('date_of_renewal', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-600 md:col-span-2">
                  <input type="checkbox" checked={form.copay} onChange={(event) => updateField('copay', event.target.checked)} />
                  Co-Pay
                </label>
                <label className="text-xs text-slate-600">
                  Guarantor Name
                  <input value={form.guarantor_name} onChange={(event) => updateField('guarantor_name', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Guarantor Contact
                  <input value={form.guarantor_contact} onChange={(event) => updateField('guarantor_contact', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Guarantor Address
                  <input value={form.guarantor_address} onChange={(event) => updateField('guarantor_address', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
                <label className="text-xs text-slate-600">
                  Guarantor Relation
                  <input value={form.guarantor_relation} onChange={(event) => updateField('guarantor_relation', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
                </label>
              </div>
            ) : null}
          </section>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/Patients/view_patient?patient_id=${encodeURIComponent(patientId)}`)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
