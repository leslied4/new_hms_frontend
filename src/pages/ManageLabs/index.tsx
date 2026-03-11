import { FormEvent, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRow = Record<string, unknown> & { id: string };

type LabRow = {
  lab_test: GenericRow;
  investigation: GenericRow | null;
  specimen_types: GenericRow[];
};

type PaginationMeta = {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

type IndexResponse = {
  lab_tests: LabRow[];
  investigations: GenericRow[];
  specimen_types: GenericRow[];
  specimen_sources: GenericRow[];
  priorities: GenericRow[];
  units: GenericRow[];
  normal_values: GenericRow[];
  nhis_investigations: GenericRow[];
  pagination: PaginationMeta;
};

type TabKey = 'investigations' | 'lab_tests' | 'specimen_types' | 'specimen_sources' | 'priorities' | 'units';

const asText = (value: unknown): string => String(value ?? '').trim();
const asEnabled = (value: unknown): boolean => ['1', 'true', 'True'].includes(String(value ?? '').trim());

export default function ManageLabsIndex() {
  const [activeTab, setActiveTab] = useState<TabKey>('lab_tests');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [investigationFilter, setInvestigationFilter] = useState('');
  const [enabledFilter, setEnabledFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [labTests, setLabTests] = useState<LabRow[]>([]);
  const [investigations, setInvestigations] = useState<GenericRow[]>([]);
  const [specimenTypes, setSpecimenTypes] = useState<GenericRow[]>([]);
  const [specimenSources, setSpecimenSources] = useState<GenericRow[]>([]);
  const [priorities, setPriorities] = useState<GenericRow[]>([]);
  const [units, setUnits] = useState<GenericRow[]>([]);
  const [normalValues, setNormalValues] = useState<GenericRow[]>([]);
  const [nhisInvestigations, setNhisInvestigations] = useState<GenericRow[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    page_size: 20,
    total_count: 0,
    total_pages: 1,
    has_next: false,
    has_previous: false,
  });

  const [investigationForm, setInvestigationForm] = useState({ name: '', description: '' });
  const [editingInvestigationId, setEditingInvestigationId] = useState('');

  const [specimenTypeForm, setSpecimenTypeForm] = useState({ name: '', description: '', color: '#2d8cff', container_type: '' });
  const [editingSpecimenTypeId, setEditingSpecimenTypeId] = useState('');

  const [specimenSourceForm, setSpecimenSourceForm] = useState({ name: '', description: '' });
  const [editingSpecimenSourceId, setEditingSpecimenSourceId] = useState('');

  const [priorityForm, setPriorityForm] = useState({ name: '', description: '' });
  const [editingPriorityId, setEditingPriorityId] = useState('');

  const [unitForm, setUnitForm] = useState({ name: '', description: '' });
  const [editingUnitId, setEditingUnitId] = useState('');

  const [labForm, setLabForm] = useState({
    name: '',
    investigation_id: '',
    value_new: '',
    description: '',
    outsourced: '0',
    copay: '0',
    gender: '0',
    age_spec: '',
    turn_around_time: '',
    nhis_investigation_id: '',
  });
  const [editingLabId, setEditingLabId] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const loadIndex = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('page_size', String(pageSize));
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (investigationFilter) params.set('investigation_id', investigationFilter);
      if (enabledFilter !== 'all') params.set('enabled', enabledFilter);
      const response = await api.get<IndexResponse>(`/legacy/manage-labs/index/?${params.toString()}`);
      setLabTests(Array.isArray(response?.lab_tests) ? response.lab_tests : []);
      setInvestigations(Array.isArray(response?.investigations) ? response.investigations : []);
      setSpecimenTypes(Array.isArray(response?.specimen_types) ? response.specimen_types : []);
      setSpecimenSources(Array.isArray(response?.specimen_sources) ? response.specimen_sources : []);
      setPriorities(Array.isArray(response?.priorities) ? response.priorities : []);
      setUnits(Array.isArray(response?.units) ? response.units : []);
      setNormalValues(Array.isArray(response?.normal_values) ? response.normal_values : []);
      setNhisInvestigations(Array.isArray(response?.nhis_investigations) ? response.nhis_investigations : []);
      if (response?.pagination) setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load manage labs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadIndex();
  }, [debouncedSearch, investigationFilter, enabledFilter, page, pageSize]);

  const saveInvestigation = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      if (editingInvestigationId) {
        await api.patch(`/legacy/manage-labs/edit-investigation/?id=${encodeURIComponent(editingInvestigationId)}`, investigationForm);
        setSuccess('Investigation updated.');
      } else {
        await api.post('/legacy/manage-labs/add-investigation/', investigationForm);
        setSuccess('Investigation added.');
      }
      setInvestigationForm({ name: '', description: '' });
      setEditingInvestigationId('');
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save investigation.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveSpecimenType = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      if (editingSpecimenTypeId) {
        await api.patch(`/legacy/manage-labs/edit-specimen-type/?id=${encodeURIComponent(editingSpecimenTypeId)}`, specimenTypeForm);
        setSuccess('Specimen type updated.');
      } else {
        await api.post('/legacy/manage-labs/add-specimen-type/', specimenTypeForm);
        setSuccess('Specimen type added.');
      }
      setSpecimenTypeForm({ name: '', description: '', color: '#2d8cff', container_type: '' });
      setEditingSpecimenTypeId('');
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save specimen type.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveSpecimenSource = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      if (editingSpecimenSourceId) {
        await api.patch(`/legacy/manage-labs/edit-specimen-source/?id=${encodeURIComponent(editingSpecimenSourceId)}`, specimenSourceForm);
        setSuccess('Specimen source updated.');
      } else {
        await api.post('/legacy/manage-labs/add-specimen-source/', specimenSourceForm);
        setSuccess('Specimen source added.');
      }
      setSpecimenSourceForm({ name: '', description: '' });
      setEditingSpecimenSourceId('');
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save specimen source.');
    } finally {
      setIsSaving(false);
    }
  };

  const savePriority = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      if (editingPriorityId) {
        await api.patch(`/legacy/manage-labs/edit-priority/?id=${encodeURIComponent(editingPriorityId)}`, priorityForm);
        setSuccess('Priority updated.');
      } else {
        await api.post('/legacy/manage-labs/add-priority/', priorityForm);
        setSuccess('Priority added.');
      }
      setPriorityForm({ name: '', description: '' });
      setEditingPriorityId('');
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save priority.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveUnit = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      if (editingUnitId) {
        await api.patch(`/legacy/manage-labs/edit-unit-of-measurement/?id=${encodeURIComponent(editingUnitId)}`, unitForm);
        setSuccess('Unit updated.');
      } else {
        await api.post('/legacy/manage-labs/add-unit-of-measurement/', unitForm);
        setSuccess('Unit added.');
      }
      setUnitForm({ name: '', description: '' });
      setEditingUnitId('');
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save unit.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveLabTest = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      const payload = {
        ...labForm,
        value_new: Number(labForm.value_new || 0),
        outsourced: Number(labForm.outsourced || 0),
        copay: Number(labForm.copay || 0),
        turn_around_time: labForm.turn_around_time ? Number(labForm.turn_around_time) : null,
      };
      if (editingLabId) {
        await api.patch(`/legacy/manage-labs/edit-lab-test/?id=${encodeURIComponent(editingLabId)}`, payload);
        setSuccess('Lab test updated.');
      } else {
        await api.post('/legacy/manage-labs/add-lab-test/', payload);
        setSuccess('Lab test added.');
      }
      setLabForm({
        name: '',
        investigation_id: '',
        value_new: '',
        description: '',
        outsourced: '0',
        copay: '0',
        gender: '0',
        age_spec: '',
        turn_around_time: '',
        nhis_investigation_id: '',
      });
      setEditingLabId('');
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save lab test.');
    } finally {
      setIsSaving(false);
    }
  };

  const removeItem = async (url: string, label: string) => {
    if (!window.confirm(`Delete this ${label}?`)) return;
    clearMessages();
    setIsSaving(true);
    try {
      await api.delete(url);
      setSuccess(`${label} deleted.`);
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Unable to delete ${label}.`);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleLab = async (id: string, enabled: boolean) => {
    clearMessages();
    setIsSaving(true);
    try {
      await api.patch(`/legacy/manage-labs/toggle-enable/?id=${encodeURIComponent(id)}&val=${enabled ? 0 : 1}`, {});
      setSuccess(`Lab test ${enabled ? 'disabled' : 'enabled'}.`);
      await loadIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to toggle lab test.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabClass = (tab: TabKey) =>
    `rounded-lg px-3 py-2 text-xs font-semibold ${
      activeTab === tab ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
    }`;

  const investigationsById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    investigations.forEach((item) => map.set(String(item.id), item));
    return map;
  }, [investigations]);

  if (isLoading && labTests.length === 0) {
    return <div className="p-6 text-sm text-slate-600">Loading manage labs...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Manage Labs</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Manage Labs</h1>
      </section>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button type="button" className={tabClass('investigations')} onClick={() => setActiveTab('investigations')}>Investigations</button>
          <button type="button" className={tabClass('lab_tests')} onClick={() => setActiveTab('lab_tests')}>Lab Tests</button>
          <button type="button" className={tabClass('specimen_types')} onClick={() => setActiveTab('specimen_types')}>Sample Types</button>
          <button type="button" className={tabClass('specimen_sources')} onClick={() => setActiveTab('specimen_sources')}>Sample Sources</button>
          <button type="button" className={tabClass('priorities')} onClick={() => setActiveTab('priorities')}>Priorities</button>
          <button type="button" className={tabClass('units')} onClick={() => setActiveTab('units')}>Units</button>
        </div>
      </section>

      {activeTab === 'investigations' ? (
        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveInvestigation} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">{editingInvestigationId ? 'Edit Investigation' : 'Add Investigation'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={investigationForm.name} onChange={(e) => setInvestigationForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={investigationForm.description} onChange={(e) => setInvestigationForm((p) => ({ ...p, description: e.target.value }))} />
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingInvestigationId ? 'Save Changes' : 'Add'}</button>
              {editingInvestigationId ? <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingInvestigationId(''); setInvestigationForm({ name: '', description: '' }); }}>Cancel</button> : null}
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Description</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {investigations.map((row) => (
                  <tr key={String(row.id)} className="border-t border-slate-100">
                    <td className="py-2">{asText(row.name)}</td>
                    <td>{asText(row.description) || 'N/A'}</td>
                    <td className="py-2 text-right">
                      <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingInvestigationId(String(row.id)); setInvestigationForm({ name: asText(row.name), description: asText(row.description) }); }}>Edit</button>
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void removeItem(`/legacy/manage-labs/delete-investigation/?id=${encodeURIComponent(String(row.id))}`, 'investigation')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'lab_tests' ? (
        <section className="space-y-4">
          <form onSubmit={saveLabTest} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
            <h2 className="md:col-span-2 text-sm font-semibold text-slate-900">{editingLabId ? 'Edit Lab Test' : 'Add Lab Test'}</h2>
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Test name" value={labForm.name} onChange={(e) => setLabForm((p) => ({ ...p, name: e.target.value }))} required />
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={labForm.investigation_id} onChange={(e) => setLabForm((p) => ({ ...p, investigation_id: e.target.value }))} required>
              <option value="">Select investigation</option>
              {investigations.map((row) => <option key={String(row.id)} value={String(row.id)}>{asText(row.name)}</option>)}
            </SearchableSelectField>
            <input type="number" step="0.01" min="0" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Price" value={labForm.value_new} onChange={(e) => setLabForm((p) => ({ ...p, value_new: e.target.value }))} required />
            <input type="number" step="0.01" min="0" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Turn around time" value={labForm.turn_around_time} onChange={(e) => setLabForm((p) => ({ ...p, turn_around_time: e.target.value }))} />
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={labForm.copay} onChange={(e) => setLabForm((p) => ({ ...p, copay: e.target.value }))}>
              <option value="0">Copay Disabled</option><option value="1">Copay Enabled</option>
            </SearchableSelectField>
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={labForm.outsourced} onChange={(e) => setLabForm((p) => ({ ...p, outsourced: e.target.value }))}>
              <option value="0">Not Outsourced</option><option value="1">Outsourced</option>
            </SearchableSelectField>
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={labForm.gender} onChange={(e) => setLabForm((p) => ({ ...p, gender: e.target.value }))}>
              <option value="0">All Genders</option><option value="1">Male</option><option value="2">Female</option>
            </SearchableSelectField>
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={labForm.nhis_investigation_id} onChange={(e) => setLabForm((p) => ({ ...p, nhis_investigation_id: e.target.value }))}>
              <option value="">Select NHIS Investigation</option>
              {nhisInvestigations.map((row) => <option key={String(row.id)} value={String(row.id)}>{asText(row.investigation_name) || asText(row.name)}</option>)}
            </SearchableSelectField>
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" placeholder="Age specification" value={labForm.age_spec} onChange={(e) => setLabForm((p) => ({ ...p, age_spec: e.target.value }))} />
            <textarea className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={3} placeholder="Description" value={labForm.description} onChange={(e) => setLabForm((p) => ({ ...p, description: e.target.value }))} />
            <div className="md:col-span-2 flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingLabId ? 'Save Changes' : 'Add Lab Test'}</button>
              {editingLabId ? <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingLabId(''); setLabForm({ name: '', investigation_id: '', value_new: '', description: '', outsourced: '0', copay: '0', gender: '0', age_spec: '', turn_around_time: '', nhis_investigation_id: '' }); }}>Cancel</button> : null}
            </div>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 grid gap-2 md:grid-cols-[1fr_220px_180px_120px]">
              <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Search tests..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={investigationFilter} onChange={(e) => { setInvestigationFilter(e.target.value); setPage(1); }}>
                <option value="">All investigations</option>
                {investigations.map((row) => <option key={String(row.id)} value={String(row.id)}>{asText(row.name)}</option>)}
              </SearchableSelectField>
              <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={enabledFilter} onChange={(e) => { setEnabledFilter(e.target.value); setPage(1); }}>
                <option value="all">All status</option><option value="1">Enabled</option><option value="0">Disabled</option>
              </SearchableSelectField>
              <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={String(pageSize)} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                <option value="10">10 / page</option><option value="20">20 / page</option><option value="50">50 / page</option>
              </SearchableSelectField>
            </div>

            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Investigation</th><th>Price</th><th>Specimens</th><th>Enabled</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {labTests.map((row) => {
                  const lab = row.lab_test || ({} as GenericRow);
                  const id = String(lab.id);
                  const enabled = asEnabled(lab.enabled);
                  const invName = asText(row.investigation?.name) || asText(investigationsById.get(asText(lab.investigation_id))?.name) || 'N/A';
                  return (
                    <tr key={id} className="border-t border-slate-100">
                      <td className="py-2 font-medium text-slate-800">{asText(lab.name)}</td>
                      <td>{invName}</td>
                      <td>{asText(lab.value_new) || '0.00'}</td>
                      <td>{(row.specimen_types || []).map((item) => asText(item.name)).filter(Boolean).join(', ') || 'N/A'}</td>
                      <td>{enabled ? 'Enabled' : 'Disabled'}</td>
                      <td className="py-2 text-right">
                        <Link to={`/ManageLabs/update_lab_template?id=${encodeURIComponent(id)}`} className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs">Template</Link>
                        <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingLabId(id); setLabForm({ name: asText(lab.name), investigation_id: asText(lab.investigation_id), value_new: asText(lab.value_new), description: asText(lab.description), outsourced: String(Number(lab.outsourced || 0)), copay: String(Number(lab.copay || 0)), gender: asText(lab.gender) || '0', age_spec: asText(lab.age_spec), turn_around_time: asText(lab.turn_around_time), nhis_investigation_id: asText(lab.nhis_investigation_id) }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button>
                        <button type="button" className="mr-2 rounded border border-amber-300 px-2 py-1 text-xs text-amber-700" onClick={() => void toggleLab(id, enabled)}>{enabled ? 'Disable' : 'Enable'}</button>
                        <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void removeItem(`/legacy/manage-labs/delete-lab-test/?id=${encodeURIComponent(id)}`, 'lab test')}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-slate-600">Page {pagination.page} of {pagination.total_pages} • {pagination.total_count} lab test(s)</p>
              <div className="flex gap-2">
                <button type="button" disabled={!pagination.has_previous || isLoading} className="rounded border border-slate-300 px-3 py-1 text-xs disabled:opacity-50" onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
                <button type="button" disabled={!pagination.has_next || isLoading} className="rounded border border-slate-300 px-3 py-1 text-xs disabled:opacity-50" onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === 'specimen_types' ? (
        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveSpecimenType} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">{editingSpecimenTypeId ? 'Edit Sample Type' : 'Add Sample Type'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={specimenTypeForm.name} onChange={(e) => setSpecimenTypeForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={specimenTypeForm.description} onChange={(e) => setSpecimenTypeForm((p) => ({ ...p, description: e.target.value }))} />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Container Type" value={specimenTypeForm.container_type} onChange={(e) => setSpecimenTypeForm((p) => ({ ...p, container_type: e.target.value }))} />
            <input type="color" className="h-10 w-full rounded-lg border border-slate-300 px-2 py-1" value={specimenTypeForm.color} onChange={(e) => setSpecimenTypeForm((p) => ({ ...p, color: e.target.value }))} />
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingSpecimenTypeId ? 'Save Changes' : 'Add'}</button>
              {editingSpecimenTypeId ? <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingSpecimenTypeId(''); setSpecimenTypeForm({ name: '', description: '', color: '#2d8cff', container_type: '' }); }}>Cancel</button> : null}
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Description</th><th>Container</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {specimenTypes.map((row) => (
                  <tr key={String(row.id)} className="border-t border-slate-100">
                    <td className="py-2">{asText(row.name)}</td>
                    <td>{asText(row.description) || 'N/A'}</td>
                    <td>{asText(row.container_type) || 'N/A'}</td>
                    <td className="py-2 text-right">
                      <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingSpecimenTypeId(String(row.id)); setSpecimenTypeForm({ name: asText(row.name), description: asText(row.description), color: asText(row.color) || '#2d8cff', container_type: asText(row.container_type) }); }}>Edit</button>
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void removeItem(`/legacy/manage-labs/delete-specimen-type/?id=${encodeURIComponent(String(row.id))}`, 'sample type')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'specimen_sources' ? (
        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveSpecimenSource} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">{editingSpecimenSourceId ? 'Edit Sample Source' : 'Add Sample Source'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={specimenSourceForm.name} onChange={(e) => setSpecimenSourceForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={specimenSourceForm.description} onChange={(e) => setSpecimenSourceForm((p) => ({ ...p, description: e.target.value }))} />
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingSpecimenSourceId ? 'Save Changes' : 'Add'}</button>
              {editingSpecimenSourceId ? <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingSpecimenSourceId(''); setSpecimenSourceForm({ name: '', description: '' }); }}>Cancel</button> : null}
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Description</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {specimenSources.map((row) => (
                  <tr key={String(row.id)} className="border-t border-slate-100">
                    <td className="py-2">{asText(row.name)}</td>
                    <td>{asText(row.description) || 'N/A'}</td>
                    <td className="py-2 text-right">
                      <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingSpecimenSourceId(String(row.id)); setSpecimenSourceForm({ name: asText(row.name), description: asText(row.description) }); }}>Edit</button>
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void removeItem(`/legacy/manage-labs/delete-specimen-source/?id=${encodeURIComponent(String(row.id))}`, 'sample source')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'priorities' ? (
        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <form onSubmit={savePriority} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">{editingPriorityId ? 'Edit Priority' : 'Add Priority'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={priorityForm.name} onChange={(e) => setPriorityForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={priorityForm.description} onChange={(e) => setPriorityForm((p) => ({ ...p, description: e.target.value }))} />
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingPriorityId ? 'Save Changes' : 'Add'}</button>
              {editingPriorityId ? <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingPriorityId(''); setPriorityForm({ name: '', description: '' }); }}>Cancel</button> : null}
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Description</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {priorities.map((row) => (
                  <tr key={String(row.id)} className="border-t border-slate-100">
                    <td className="py-2">{asText(row.name)}</td>
                    <td>{asText(row.description) || 'N/A'}</td>
                    <td className="py-2 text-right">
                      <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingPriorityId(String(row.id)); setPriorityForm({ name: asText(row.name), description: asText(row.description) }); }}>Edit</button>
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void removeItem(`/legacy/manage-labs/delete-priority/?id=${encodeURIComponent(String(row.id))}`, 'priority')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'units' ? (
        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveUnit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">{editingUnitId ? 'Edit Unit' : 'Add Unit'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={unitForm.name} onChange={(e) => setUnitForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={unitForm.description} onChange={(e) => setUnitForm((p) => ({ ...p, description: e.target.value }))} />
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingUnitId ? 'Save Changes' : 'Add'}</button>
              {editingUnitId ? <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingUnitId(''); setUnitForm({ name: '', description: '' }); }}>Cancel</button> : null}
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Description</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {units.map((row) => (
                  <tr key={String(row.id)} className="border-t border-slate-100">
                    <td className="py-2">{asText(row.name)}</td>
                    <td>{asText(row.description) || 'N/A'}</td>
                    <td className="py-2 text-right">
                      <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingUnitId(String(row.id)); setUnitForm({ name: asText(row.name), description: asText(row.description) }); }}>Edit</button>
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void removeItem(`/unit_of_measurements/${encodeURIComponent(String(row.id))}/`, 'unit')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'units' ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">Reference Values</h2>
          <p className="mt-1 text-xs text-slate-500">Existing normal/reference values from legacy data.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {normalValues.map((item) => (
              <span key={String(item.id)} className="rounded-full border border-slate-300 px-2 py-1 text-xs text-slate-700">
                {asText(item.name)}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
