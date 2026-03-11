import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type GenericRow = Record<string, unknown> & { id: string };
type TabKey =
  | 'facility'
  | 'referral'
  | 'discount'
  | 'bundled'
  | 'communication'
  | 'locations'
  | 'storage'
  | 'medconnect';

type SettingsIndexResponse = {
  page_title?: string;
  settings?: GenericRow[];
  health_facilities?: GenericRow[];
  departments?: GenericRow[];
  discounts?: GenericRow[];
  services?: GenericRow[];
  item_types?: GenericRow[];
  bundled_services?: GenericRow[];
  infacility_locations?: GenericRow[];
  specialties?: GenericRow[];
  storage_conditions?: GenericRow[];
  routine_config?: GenericRow | null;
  users?: GenericRow[];
  medconnect_integration?: GenericRow | null;
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'facility', label: 'Facility' },
  { key: 'referral', label: 'Referral Facilities' },
  { key: 'discount', label: 'Discount & Markup' },
  { key: 'bundled', label: 'Bundled Services' },
  { key: 'communication', label: 'Communication Configuration' },
  { key: 'locations', label: 'In Facility Locations' },
  { key: 'storage', label: 'Storage Conditions' },
  { key: 'medconnect', label: 'MedConnect Integration' },
];

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};
const fmtDate = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return raw;
  return dt.toLocaleString();
};
const toSelectOptions = (rows: GenericRow[] = [], fallback = 'name') =>
  rows.map((row) => ({
    value: asText(row.id),
    label: asText(row[fallback]) || asText(row.name) || asText(row.username) || asText(row.id),
  }));

export default function SettingsIndex() {
  const [activeTab, setActiveTab] = useState<TabKey>('facility');
  const [data, setData] = useState<SettingsIndexResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [facilityForm, setFacilityForm] = useState({ name: '', phone: '', address: '', specialty: 'General', user_id: '' });
  const [discountForm, setDiscountForm] = useState({ title: '', description: '', value_type: 'percentage', value: '', amount_applicable: '', department_id: '' });
  const [locationForm, setLocationForm] = useState({ name: '', specialty_id: '' });
  const [storageForm, setStorageForm] = useState({ condition_name: '', temperature_min: '', temperature_max: '', humidity_min: '', humidity_max: '', remarks: '' });
  const [routineForm, setRoutineForm] = useState({ id: '', first_notif: 'email', second_notif: 'email', third_notif: 'email', first_due: '1', second_due: '1', third_due: '1', status: '0' });
  const [medconnectForm, setMedconnectForm] = useState({
    organization_name: '',
    webhook_enabled: true,
  });

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<SettingsIndexResponse>('/legacy/settings/index/');
      setData(response);
      const routine = response.routine_config;
      if (routine) {
        setRoutineForm({
          id: asText(routine.id),
          first_notif: asText(routine.first_notif) || 'email',
          second_notif: asText(routine.second_notif) || 'email',
          third_notif: asText(routine.third_notif) || 'email',
          first_due: String(asNumber(routine.first_due) || 1),
          second_due: String(asNumber(routine.second_due) || 1),
          third_due: String(asNumber(routine.third_due) || 1),
          status: String(asNumber(routine.status)),
        });
      }
      const medconnect = response.medconnect_integration;
      if (medconnect) {
        setMedconnectForm({
          organization_name: asText(medconnect.organization_name),
          webhook_enabled: Boolean(medconnect.webhook_enabled),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load settings.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSettings();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('settingsIndexActiveTab');
    if (!stored) return;
    const matched = tabs.find((tab) => tab.key === stored);
    if (matched) setActiveTab(matched.key);
  }, []);

  useEffect(() => {
    localStorage.setItem('settingsIndexActiveTab', activeTab);
  }, [activeTab]);

  const specialtyOptions = useMemo(() => data?.specialties || [], [data?.specialties]);
  const departmentOptions = useMemo(() => data?.departments || [], [data?.departments]);
  const userOptions = useMemo(() => data?.users || [], [data?.users]);

  const runSave = async (action: () => Promise<void>, okMessage: string) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await action();
      setSuccess(okMessage);
      await loadSettings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save.');
    } finally {
      setIsSaving(false);
    }
  };

  const addFacility = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/add-health-facility/', facilityForm);
      setFacilityForm({ name: '', phone: '', address: '', specialty: 'General', user_id: '' });
    }, 'Health facility added.');
  };

  const addDiscount = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/add-discount/', {
        ...discountForm,
        value: asNumber(discountForm.value),
        amount_applicable: discountForm.amount_applicable ? asNumber(discountForm.amount_applicable) : null,
      });
      setDiscountForm({ title: '', description: '', value_type: 'percentage', value: '', amount_applicable: '', department_id: '' });
    }, 'Discount added.');
  };

  const addLocation = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/add-infacility-location/', locationForm);
      setLocationForm({ name: '', specialty_id: '' });
    }, 'In-facility location added.');
  };

  const addStorage = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/add-storage-conditions/', storageForm);
      setStorageForm({ condition_name: '', temperature_min: '', temperature_max: '', humidity_min: '', humidity_max: '', remarks: '' });
    }, 'Storage condition added.');
  };

  const saveRoutineConfig = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/index/', {
        kind: 'routine_config',
        ...routineForm,
        first_due: asNumber(routineForm.first_due),
        second_due: asNumber(routineForm.second_due),
        third_due: asNumber(routineForm.third_due),
        status: asNumber(routineForm.status),
      });
    }, 'Routine communication configuration updated.');
  };

  const toggleDiscount = async (id: string) => {
    await runSave(async () => {
      await api.post('/legacy/settings/toggle-discount-disable/', { id });
    }, 'Discount status updated.');
  };

  const removeDiscount = async (id: string) => {
    await runSave(async () => {
      await api.post('/legacy/settings/remove-discount/', { id });
    }, 'Discount removed.');
  };

  const connectMedconnect = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/connect-medconnect-integration/', {
        organization_name: medconnectForm.organization_name,
        webhook_enabled: medconnectForm.webhook_enabled,
      });
    }, 'MedConnect connected.');
  };

  const saveMedconnect = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/save-medconnect-integration/', {
        organization_name: medconnectForm.organization_name,
        webhook_enabled: medconnectForm.webhook_enabled,
      });
    }, 'MedConnect settings saved.');
  };

  const disconnectMedconnect = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/disconnect-medconnect-integration/', {});
    }, 'MedConnect disconnected.');
  };

  const testMedconnect = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/test-medconnect-integration/', {});
    }, 'MedConnect test completed.');
  };

  const syncMedconnectLabTests = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/sync-medconnect-lab-tests/', {});
    }, 'MedConnect lab tests sync triggered.');
  };

  const syncMedconnectRadiologyScans = async () => {
    await runSave(async () => {
      await api.post('/legacy/settings/sync-medconnect-radiology-scans/', {});
    }, 'MedConnect radiology scans sync triggered.');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Settings</p>
        <h2 className="text-xl font-semibold text-slate-900">{asText(data?.page_title) || 'Global Settings'}</h2>
      </div>

      {error ? <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${activeTab === tab.key ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600">Loading settings...</div> : null}

      {!isLoading && activeTab === 'facility' ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Facility Settings</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr><th className="px-3 py-2 text-left">Institution</th><th className="px-3 py-2 text-left">Code Prefix</th><th className="px-3 py-2 text-left">Folder Prefix</th><th className="px-3 py-2 text-left">Phone</th><th className="px-3 py-2 text-left">Email</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data?.settings || []).map((row) => (
                  <tr key={row.id}>
                    <td className="px-3 py-2">{asText(row.institution) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.code_prefix) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.folder_prefix) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.phone1) || 'N/A'}</td>
                    <td className="px-3 py-2">{asText(row.email1) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {!isLoading && activeTab === 'referral' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Add Referral Facility</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <input value={facilityForm.name} onChange={(e) => setFacilityForm((s) => ({ ...s, name: e.target.value }))} placeholder="Facility name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={facilityForm.phone} onChange={(e) => setFacilityForm((s) => ({ ...s, phone: e.target.value }))} placeholder="Phone" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={facilityForm.address} onChange={(e) => setFacilityForm((s) => ({ ...s, address: e.target.value }))} placeholder="Address" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={facilityForm.specialty} onChange={(e) => setFacilityForm((s) => ({ ...s, specialty: e.target.value }))} placeholder="Specialty label" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <SearchableSelect
                value={facilityForm.user_id}
                onChange={(value) => setFacilityForm((s) => ({ ...s, user_id: value }))}
                options={userOptions.map((row) => ({
                  value: asText(row.id),
                  label: `${asText(row.first_name)} ${asText(row.last_name)}`.trim() || asText(row.username) || asText(row.id),
                }))}
                placeholder="Assign user (optional)"
              />
              <button type="button" disabled={isSaving} onClick={() => void addFacility()} className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60">Save Facility</button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Referral Facilities</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Phone</th><th className="px-3 py-2 text-left">Address</th><th className="px-3 py-2 text-left">Specialty</th><th className="px-3 py-2 text-left">User</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(data?.health_facilities || []).map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2">{asText(row.name) || 'N/A'}</td>
                      <td className="px-3 py-2">{asText(row.phone) || 'N/A'}</td>
                      <td className="px-3 py-2">{asText(row.address) || 'N/A'}</td>
                      <td className="px-3 py-2">{asText(row.specialty) || 'N/A'}</td>
                      <td className="px-3 py-2">{`${asText((row.user as GenericRow | undefined)?.first_name)} ${asText((row.user as GenericRow | undefined)?.last_name)}`.trim() || asText((row.user as GenericRow | undefined)?.username) || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {!isLoading && activeTab === 'discount' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Add Discount</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              <input value={discountForm.title} onChange={(e) => setDiscountForm((s) => ({ ...s, title: e.target.value }))} placeholder="Title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={discountForm.description} onChange={(e) => setDiscountForm((s) => ({ ...s, description: e.target.value }))} placeholder="Description" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <SearchableSelect
                value={discountForm.value_type}
                onChange={(value) => setDiscountForm((s) => ({ ...s, value_type: value }))}
                options={[
                  { value: 'percentage', label: 'Percentage' },
                  { value: 'amount', label: 'Amount' },
                ]}
              />
              <input value={discountForm.value} onChange={(e) => setDiscountForm((s) => ({ ...s, value: e.target.value }))} placeholder="Value" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={discountForm.amount_applicable} onChange={(e) => setDiscountForm((s) => ({ ...s, amount_applicable: e.target.value }))} placeholder="Amount applicable (optional)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <SearchableSelect
                value={discountForm.department_id}
                onChange={(value) => setDiscountForm((s) => ({ ...s, department_id: value }))}
                options={toSelectOptions(departmentOptions)}
                placeholder="Department (optional)"
              />
              <button type="button" disabled={isSaving} onClick={() => void addDiscount()} className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60">Save Discount</button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Discounts</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2 text-left">Title</th><th className="px-3 py-2 text-left">Type</th><th className="px-3 py-2 text-left">Value</th><th className="px-3 py-2 text-left">Status</th><th className="px-3 py-2 text-left">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(data?.discounts || []).map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2">{asText(row.title) || 'N/A'}</td>
                      <td className="px-3 py-2">{asText(row.value_type) || 'N/A'}</td>
                      <td className="px-3 py-2">{asText(row.value) || '0'}</td>
                      <td className="px-3 py-2">{asNumber(row.status) === 1 ? 'Active' : 'Disabled'}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button type="button" disabled={isSaving} onClick={() => void toggleDiscount(row.id)} className="rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-700">Toggle</button>
                          <button type="button" disabled={isSaving} onClick={() => void removeDiscount(row.id)} className="rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-700">Remove</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {!isLoading && activeTab === 'bundled' ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Bundled Services</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Description</th><th className="px-3 py-2 text-left">Date Added</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data?.bundled_services || []).map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2">{asText(row.name) || 'N/A'}</td>
                      <td className="px-3 py-2">{asText(row.description) || 'N/A'}</td>
                      <td className="px-3 py-2">{fmtDate(row.date_created || row.date_added)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {!isLoading && activeTab === 'communication' ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Routine Care Notification Configuration</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <SearchableSelect value={routineForm.first_notif} onChange={(value) => setRoutineForm((s) => ({ ...s, first_notif: value }))} options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }]} />
            <SearchableSelect value={routineForm.second_notif} onChange={(value) => setRoutineForm((s) => ({ ...s, second_notif: value }))} options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }]} />
            <SearchableSelect value={routineForm.third_notif} onChange={(value) => setRoutineForm((s) => ({ ...s, third_notif: value }))} options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }]} />
            <input value={routineForm.first_due} onChange={(e) => setRoutineForm((s) => ({ ...s, first_due: e.target.value }))} placeholder="First due (days)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input value={routineForm.second_due} onChange={(e) => setRoutineForm((s) => ({ ...s, second_due: e.target.value }))} placeholder="Second due (days)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input value={routineForm.third_due} onChange={(e) => setRoutineForm((s) => ({ ...s, third_due: e.target.value }))} placeholder="Third due (days)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <SearchableSelect
              value={routineForm.status}
              onChange={(value) => setRoutineForm((s) => ({ ...s, status: value }))}
              options={[
                { value: '0', label: 'Disabled' },
                { value: '1', label: 'Enabled' },
              ]}
            />
            <button type="button" disabled={isSaving} onClick={() => void saveRoutineConfig()} className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60">Save Configuration</button>
          </div>
        </div>
      ) : null}

      {!isLoading && activeTab === 'locations' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Add In-Facility Location</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              <input value={locationForm.name} onChange={(e) => setLocationForm((s) => ({ ...s, name: e.target.value }))} placeholder="Location name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <SearchableSelect
                value={locationForm.specialty_id}
                onChange={(value) => setLocationForm((s) => ({ ...s, specialty_id: value }))}
                options={toSelectOptions(specialtyOptions)}
                placeholder="Specialty"
              />
              <button type="button" disabled={isSaving} onClick={() => void addLocation()} className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60">Save Location</button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">In-Facility Locations</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Specialty</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(data?.infacility_locations || []).map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2">{asText(row.name) || 'N/A'}</td>
                      <td className="px-3 py-2">{asText((row.specialty as GenericRow | undefined)?.name) || asText(row.specialty_id) || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {!isLoading && activeTab === 'storage' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Add Storage Condition</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              <input value={storageForm.condition_name} onChange={(e) => setStorageForm((s) => ({ ...s, condition_name: e.target.value }))} placeholder="Condition name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={storageForm.temperature_min} onChange={(e) => setStorageForm((s) => ({ ...s, temperature_min: e.target.value }))} placeholder="Temp min" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={storageForm.temperature_max} onChange={(e) => setStorageForm((s) => ({ ...s, temperature_max: e.target.value }))} placeholder="Temp max" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={storageForm.humidity_min} onChange={(e) => setStorageForm((s) => ({ ...s, humidity_min: e.target.value }))} placeholder="Humidity min" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={storageForm.humidity_max} onChange={(e) => setStorageForm((s) => ({ ...s, humidity_max: e.target.value }))} placeholder="Humidity max" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input value={storageForm.remarks} onChange={(e) => setStorageForm((s) => ({ ...s, remarks: e.target.value }))} placeholder="Remarks" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <button type="button" disabled={isSaving} onClick={() => void addStorage()} className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60">Save Storage</button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Storage Conditions</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Temperature</th><th className="px-3 py-2 text-left">Humidity</th><th className="px-3 py-2 text-left">Remarks</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(data?.storage_conditions || []).map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2">{asText(row.condition_name) || 'N/A'}</td>
                      <td className="px-3 py-2">{`${asText(row.temperature_min)} - ${asText(row.temperature_max)}`.replace(' - ', asText(row.temperature_min) || asText(row.temperature_max) ? ' - ' : 'N/A')}</td>
                      <td className="px-3 py-2">{`${asText(row.humidity_min)} - ${asText(row.humidity_max)}`.replace(' - ', asText(row.humidity_min) || asText(row.humidity_max) ? ' - ' : 'N/A')}</td>
                      <td className="px-3 py-2">{asText(row.remarks) || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {!isLoading && activeTab === 'medconnect' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">MedConnect Integration</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-[11px] text-slate-500">API Base URL</p>
                <p className="text-sm text-slate-800">{asText(data?.medconnect_integration?.api_base_url) || 'Not configured'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-[11px] text-slate-500">Webhook URL</p>
                <p className="text-sm text-slate-800">{asText(data?.medconnect_integration?.webhook_url) || 'Not configured'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-[11px] text-slate-500">Provision Token</p>
                <p className="text-sm text-slate-800">{Boolean(data?.medconnect_integration?.provision_token_configured) ? 'Configured' : 'Missing'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-[11px] text-slate-500">Status</p>
                <p className="text-sm text-slate-800">{Boolean(data?.medconnect_integration?.is_active) ? 'Connected' : 'Disconnected'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-slate-900">Integration Controls</h4>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <input
                value={medconnectForm.organization_name}
                onChange={(e) => setMedconnectForm((s) => ({ ...s, organization_name: e.target.value }))}
                placeholder="Organization name"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={medconnectForm.webhook_enabled}
                  onChange={(e) => setMedconnectForm((s) => ({ ...s, webhook_enabled: e.target.checked }))}
                />
                Enable webhook
              </label>
              <button type="button" disabled={isSaving} onClick={() => void connectMedconnect()} className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 disabled:opacity-60">Connect</button>
              <button type="button" disabled={isSaving} onClick={() => void saveMedconnect()} className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60">Save</button>
              <button type="button" disabled={isSaving} onClick={() => void disconnectMedconnect()} className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 disabled:opacity-60">Disconnect</button>
              <button type="button" disabled={isSaving} onClick={() => void testMedconnect()} className="rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 disabled:opacity-60">Test Connection</button>
              <button type="button" disabled={isSaving} onClick={() => void syncMedconnectLabTests()} className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 disabled:opacity-60">Sync Lab Tests</button>
              <button type="button" disabled={isSaving} onClick={() => void syncMedconnectRadiologyScans()} className="rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700 disabled:opacity-60">Sync Radiology Scans</button>
            </div>
            {asText(data?.medconnect_integration?.connected_at) ? (
              <p className="mt-2 text-xs text-slate-500">Connected at: {fmtDate(data?.medconnect_integration?.connected_at)}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
