import { useEffect, useMemo, useState } from 'react';
import SearchableSelect from '../../components/SearchableSelect';
import { api } from '../../lib/api';

type OptionRow = {
  id: string;
  name: string;
  insurance_profile_type_id?: string;
};

type InsuranceType = {
  id: string;
  name: string;
  description?: string;
  profile_count?: number;
};

type InsuranceProfile = {
  id: string;
  name: string;
  insurance_profile_type_id: string;
  insurance_profile_type_name: string;
  region?: string;
  directorate?: string;
  accreditation_no?: string;
  copay?: number;
  capitation?: number;
  nhis_payer_id?: string;
  policy_count?: number;
  sponsor?: {
    company_name?: string;
    tin_number?: string;
    business_email?: string;
    business_mobile?: string;
  };
};

type InsurancePolicy = {
  id: string;
  name: string;
  insurance_profile_id: string;
  insurance_profile_name: string;
  insurance_profile_type_id: string;
  insurance_profile_type_name: string;
  copay?: number;
  is_configured?: number;
  is_disabled?: number;
  status_label?: string;
  date_created?: string | null;
  created_by?: string;
};

type InsuranceIndexResponse = {
  profiles: InsuranceProfile[];
  policies: InsurancePolicy[];
  types: InsuranceType[];
  summary: {
    total_profiles: number;
    total_policies: number;
    active_policies: number;
    disabled_policies: number;
    sponsors: number;
  };
  options: {
    types: OptionRow[];
    profiles: OptionRow[];
    statuses: OptionRow[];
  };
};

const EMPTY_RESPONSE: InsuranceIndexResponse = {
  profiles: [],
  policies: [],
  types: [],
  summary: {
    total_profiles: 0,
    total_policies: 0,
    active_policies: 0,
    disabled_policies: 0,
    sponsors: 0,
  },
  options: {
    types: [],
    profiles: [],
    statuses: [],
  },
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

type CreateMode = 'profile' | 'policy' | 'type';
type DirectoryTab = 'profiles' | 'policies';

export default function ManageInsurancesIndex() {
  const [data, setData] = useState<InsuranceIndexResponse>(EMPTY_RESPONSE);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [typeId, setTypeId] = useState('');
  const [status, setStatus] = useState('all');
  const [directoryTab, setDirectoryTab] = useState<DirectoryTab>('profiles');
  const [createMode, setCreateMode] = useState<CreateMode>('profile');

  const [profileForm, setProfileForm] = useState({
    name: '',
    insurance_profile_type_id: '',
    region: '',
    directorate: '',
    accreditation_no: '',
    copay: '0',
    capitation: '0',
    nhis_payer_id: '',
    company_name: '',
    tin_number: '',
    business_email: '',
    business_mobile: '',
    business_address: '',
    country: 'Ghana',
  });
  const [policyForm, setPolicyForm] = useState({
    name: '',
    insurance_profile_id: '',
    copay: '0',
    is_disabled: '0',
    is_configured: '0',
  });
  const [typeForm, setTypeForm] = useState({ name: '', description: '' });

  const loadData = async (params?: { search?: string; typeId?: string; status?: string; scope?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (params?.search) query.set('search', params.search);
      if (params?.typeId) query.set('profile_type_id', params.typeId);
      if (params?.status && params.status !== 'all') query.set('status', params.status);
      if (params?.scope && params.scope !== 'all') query.set('scope', params.scope);
      const suffix = query.toString() ? `?${query.toString()}` : '';
      const response = await api.get<InsuranceIndexResponse>(`/legacy/manage-insurances/index/${suffix}`);
      setData({
        profiles: Array.isArray(response?.profiles) ? response.profiles : [],
        policies: Array.isArray(response?.policies) ? response.policies : [],
        types: Array.isArray(response?.types) ? response.types : [],
        summary: {
          total_profiles: asNumber(response?.summary?.total_profiles),
          total_policies: asNumber(response?.summary?.total_policies),
          active_policies: asNumber(response?.summary?.active_policies),
          disabled_policies: asNumber(response?.summary?.disabled_policies),
          sponsors: asNumber(response?.summary?.sponsors),
        },
        options: {
          types: Array.isArray(response?.options?.types) ? response.options.types : [],
          profiles: Array.isArray(response?.options?.profiles) ? response.options.profiles : [],
          statuses: Array.isArray(response?.options?.statuses) ? response.options.statuses : [],
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load insurance directory.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData({
        search,
        typeId,
        status,
        scope: directoryTab === 'profiles' ? 'profiles' : 'policies',
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [search, typeId, status, directoryTab]);

  const typeOptions = useMemo(
    () => data.options.types.map((row) => ({ value: row.id, label: row.name })),
    [data.options.types],
  );

  const profileOptions = useMemo(
    () =>
      data.options.profiles.map((row) => ({
        value: row.id,
        label: row.insurance_profile_type_id === '3' ? `${row.name} (Sponsor)` : row.name,
      })),
    [data.options.profiles],
  );

  const statusOptions = useMemo(
    () => data.options.statuses.map((row) => ({ value: row.id, label: row.name })),
    [data.options.statuses],
  );

  const selectedTypeIsSponsor = asText(profileForm.insurance_profile_type_id) === '3';

  const refreshAfterSave = async (message: string) => {
    setSuccess(message);
    await loadData({
      search,
      typeId,
      status,
      scope: directoryTab === 'profiles' ? 'profiles' : 'policies',
    });
  };

  const saveProfile = async () => {
    if (!profileForm.name.trim()) {
      setError('Profile name is required.');
      return;
    }
    if (!profileForm.insurance_profile_type_id) {
      setError('Insurance type is required.');
      return;
    }
    if (selectedTypeIsSponsor) {
      if (!profileForm.company_name.trim() || !profileForm.tin_number.trim() || !profileForm.business_address.trim()) {
        setError('Company sponsor requires company name, TIN number, and business address.');
        return;
      }
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/manage-insurances/add-provider/', {
        ...profileForm,
        copay: asNumber(profileForm.copay),
        capitation: asNumber(profileForm.capitation),
      });
      setProfileForm({
        name: '',
        insurance_profile_type_id: profileForm.insurance_profile_type_id,
        region: '',
        directorate: '',
        accreditation_no: '',
        copay: '0',
        capitation: '0',
        nhis_payer_id: '',
        company_name: '',
        tin_number: '',
        business_email: '',
        business_mobile: '',
        business_address: '',
        country: 'Ghana',
      });
      await refreshAfterSave('Insurance profile created.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create insurance profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const savePolicy = async () => {
    if (!policyForm.name.trim()) {
      setError('Policy name is required.');
      return;
    }
    if (!policyForm.insurance_profile_id) {
      setError('Select an insurance profile for this policy.');
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/manage-insurances/add-provider-policy/', {
        ...policyForm,
        copay: asNumber(policyForm.copay),
        is_disabled: asNumber(policyForm.is_disabled),
        is_configured: asNumber(policyForm.is_configured),
      });
      setPolicyForm({ name: '', insurance_profile_id: '', copay: '0', is_disabled: '0', is_configured: '0' });
      await refreshAfterSave('Policy created.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create policy.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveType = async () => {
    if (!typeForm.name.trim()) {
      setError('Type name is required.');
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/manage-insurances/add-provider-type/', typeForm);
      setTypeForm({ name: '', description: '' });
      await refreshAfterSave('Insurance type created.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create insurance type.');
    } finally {
      setIsSaving(false);
    }
  };

  const togglePolicy = async (row: InsurancePolicy) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/manage-insurances/toggleinsurance/', {
        id: row.id,
        target_type: 'policy',
        is_disabled: asNumber(row.is_disabled) === 1 ? 0 : 1,
      });
      await refreshAfterSave(`Policy ${asNumber(row.is_disabled) === 1 ? 'enabled' : 'disabled'}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update policy status.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Manage</p>
        <h2 className="text-xl font-semibold text-slate-900">Insurance & Sponsors</h2>
        <p className="mt-1 text-sm text-slate-600">
          Unified directory for insurance types, payer/sponsor profiles, and policy coverages.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Profiles</p>
          <p className="text-2xl font-semibold text-slate-900">{data.summary.total_profiles}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Policies</p>
          <p className="text-2xl font-semibold text-slate-900">{data.summary.total_policies}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Active Policies</p>
          <p className="text-2xl font-semibold text-emerald-900">{data.summary.active_policies}</p>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Disabled Policies</p>
          <p className="text-2xl font-semibold text-rose-900">{data.summary.disabled_policies}</p>
        </div>
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-700">Sponsors</p>
          <p className="text-2xl font-semibold text-indigo-900">{data.summary.sponsors}</p>
        </div>
      </div>

      {error ? <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <div className="grid gap-4 xl:grid-cols-12">
        <section className="space-y-4 xl:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCreateMode('profile')}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${createMode === 'profile' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-slate-300 bg-white text-slate-700'}`}
              >
                Create Profile
              </button>
              <button
                type="button"
                onClick={() => setCreateMode('policy')}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${createMode === 'policy' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-slate-300 bg-white text-slate-700'}`}
              >
                Create Policy
              </button>
              <button
                type="button"
                onClick={() => setCreateMode('type')}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${createMode === 'type' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-slate-300 bg-white text-slate-700'}`}
              >
                Create Type
              </button>
            </div>

            {createMode === 'profile' ? (
              <div className="mt-4 space-y-2">
                <input
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Profile name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <SearchableSelect
                  value={profileForm.insurance_profile_type_id}
                  onChange={(value) => setProfileForm((s) => ({ ...s, insurance_profile_type_id: value }))}
                  options={typeOptions}
                  placeholder="Select insurance/sponsor type"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input value={profileForm.region} onChange={(e) => setProfileForm((s) => ({ ...s, region: e.target.value }))} placeholder="Region" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={profileForm.directorate} onChange={(e) => setProfileForm((s) => ({ ...s, directorate: e.target.value }))} placeholder="Directorate" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={profileForm.copay} onChange={(e) => setProfileForm((s) => ({ ...s, copay: e.target.value }))} placeholder="Copay %" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={profileForm.capitation} onChange={(e) => setProfileForm((s) => ({ ...s, capitation: e.target.value }))} placeholder="Capitation" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </div>
                <input value={profileForm.accreditation_no} onChange={(e) => setProfileForm((s) => ({ ...s, accreditation_no: e.target.value }))} placeholder="Accreditation No" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <input value={profileForm.nhis_payer_id} onChange={(e) => setProfileForm((s) => ({ ...s, nhis_payer_id: e.target.value }))} placeholder="NHIS Payer ID" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />

                {selectedTypeIsSponsor ? (
                  <div className="space-y-2 rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Sponsor Company Details</p>
                    <input value={profileForm.company_name} onChange={(e) => setProfileForm((s) => ({ ...s, company_name: e.target.value }))} placeholder="Company name" className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-sm" />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={profileForm.tin_number} onChange={(e) => setProfileForm((s) => ({ ...s, tin_number: e.target.value }))} placeholder="TIN Number" className="rounded-lg border border-indigo-200 px-3 py-2 text-sm" />
                      <input value={profileForm.country} onChange={(e) => setProfileForm((s) => ({ ...s, country: e.target.value }))} placeholder="Country" className="rounded-lg border border-indigo-200 px-3 py-2 text-sm" />
                    </div>
                    <input value={profileForm.business_address} onChange={(e) => setProfileForm((s) => ({ ...s, business_address: e.target.value }))} placeholder="Business address" className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-sm" />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={profileForm.business_email} onChange={(e) => setProfileForm((s) => ({ ...s, business_email: e.target.value }))} placeholder="Business email" className="rounded-lg border border-indigo-200 px-3 py-2 text-sm" />
                      <input value={profileForm.business_mobile} onChange={(e) => setProfileForm((s) => ({ ...s, business_mobile: e.target.value }))} placeholder="Business mobile" className="rounded-lg border border-indigo-200 px-3 py-2 text-sm" />
                    </div>
                  </div>
                ) : null}

                <button type="button" disabled={isSaving} onClick={() => void saveProfile()} className="w-full rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800 disabled:opacity-60">
                  Save Profile
                </button>
              </div>
            ) : null}

            {createMode === 'policy' ? (
              <div className="mt-4 space-y-2">
                <input value={policyForm.name} onChange={(e) => setPolicyForm((s) => ({ ...s, name: e.target.value }))} placeholder="Policy name" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <SearchableSelect
                  value={policyForm.insurance_profile_id}
                  onChange={(value) => setPolicyForm((s) => ({ ...s, insurance_profile_id: value }))}
                  options={profileOptions}
                  placeholder="Select insurance profile"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input value={policyForm.copay} onChange={(e) => setPolicyForm((s) => ({ ...s, copay: e.target.value }))} placeholder="Copay %" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <SearchableSelect
                    value={policyForm.is_disabled}
                    onChange={(value) => setPolicyForm((s) => ({ ...s, is_disabled: value }))}
                    options={[
                      { value: '0', label: 'Active' },
                      { value: '1', label: 'Disabled' },
                    ]}
                    placeholder="Status"
                  />
                </div>
                <button type="button" disabled={isSaving} onClick={() => void savePolicy()} className="w-full rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800 disabled:opacity-60">
                  Save Policy
                </button>
              </div>
            ) : null}

            {createMode === 'type' ? (
              <div className="mt-4 space-y-2">
                <input value={typeForm.name} onChange={(e) => setTypeForm((s) => ({ ...s, name: e.target.value }))} placeholder="Type name" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={typeForm.description} onChange={(e) => setTypeForm((s) => ({ ...s, description: e.target.value }))} placeholder="Description (optional)" rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <button type="button" disabled={isSaving} onClick={() => void saveType()} className="w-full rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800 disabled:opacity-60">
                  Save Type
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="space-y-4 xl:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="grid gap-2 md:grid-cols-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search policy, sponsor, accreditation..."
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
              />
              <SearchableSelect value={typeId} onChange={setTypeId} options={typeOptions} placeholder="All types" />
              <SearchableSelect value={status} onChange={setStatus} options={statusOptions} placeholder="Policy status" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { id: 'profiles', label: 'Profiles & Sponsors' },
                { id: 'policies', label: 'Policies & Coverages' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDirectoryTab(item.id as DirectoryTab)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${directoryTab === item.id ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-slate-300 bg-white text-slate-700'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600">Loading insurance directory...</div> : null}

          {!isLoading && directoryTab === 'profiles' ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Profiles & Sponsors</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{data.profiles.length} records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2 text-left">Profile</th>
                      <th className="px-3 py-2 text-left">Type</th>
                      <th className="px-3 py-2 text-left">Coverage</th>
                      <th className="px-3 py-2 text-left">Region / Directorate</th>
                      <th className="px-3 py-2 text-left">Sponsor Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.profiles.map((row) => (
                      <tr key={row.id}>
                        <td className="px-3 py-2">
                          <p className="font-semibold text-slate-900">{row.name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">Acc: {row.accreditation_no || 'N/A'} | NHIS: {row.nhis_payer_id || 'N/A'}</p>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${row.insurance_profile_type_id === '3' ? 'bg-indigo-100 text-indigo-700' : 'bg-cyan-100 text-cyan-700'}`}>
                            {row.insurance_profile_type_name || row.insurance_profile_type_id || 'N/A'}
                          </span>
                        </td>
                        <td className="px-3 py-2">Copay {asNumber(row.copay)}% | Policies {asNumber(row.policy_count)}</td>
                        <td className="px-3 py-2">{asText(row.region) || 'N/A'} / {asText(row.directorate) || 'N/A'}</td>
                        <td className="px-3 py-2">{asText(row.sponsor?.company_name) || '—'}</td>
                      </tr>
                    ))}
                    {!data.profiles.length ? (
                      <tr>
                        <td colSpan={5} className="px-3 py-8 text-center text-sm text-slate-500">No profiles found for this filter.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {!isLoading && directoryTab === 'policies' ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Policies & Coverages</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{data.policies.length} records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2 text-left">Policy</th>
                      <th className="px-3 py-2 text-left">Profile</th>
                      <th className="px-3 py-2 text-left">Type</th>
                      <th className="px-3 py-2 text-left">Copay</th>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.policies.map((row) => (
                      <tr key={row.id}>
                        <td className="px-3 py-2">
                          <p className="font-semibold text-slate-900">{row.name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{row.created_by || 'N/A'}</p>
                        </td>
                        <td className="px-3 py-2">{row.insurance_profile_name || 'N/A'}</td>
                        <td className="px-3 py-2">{row.insurance_profile_type_name || 'N/A'}</td>
                        <td className="px-3 py-2">{asNumber(row.copay)}%</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${asNumber(row.is_disabled) === 1 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {asNumber(row.is_disabled) === 1 ? 'Disabled' : 'Active'}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => void togglePolicy(row)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-60"
                          >
                            {asNumber(row.is_disabled) === 1 ? 'Enable' : 'Disable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!data.policies.length ? (
                      <tr>
                        <td colSpan={6} className="px-3 py-8 text-center text-sm text-slate-500">No policies found for this filter.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
