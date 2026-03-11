import { FormEvent, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRow = Record<string, unknown> & { id: string };

type ScanRow = {
  scan: GenericRow;
  category: GenericRow | null;
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
  scans: ScanRow[];
  categories: GenericRow[];
  anatomical_areas: GenericRow[];
  priorities: GenericRow[];
  units: GenericRow[];
  age_specifications: GenericRow[];
  nhis_investigations: GenericRow[];
  pagination: PaginationMeta;
};

type ScanForm = {
  name: string;
  radiology_category_id: string;
  value_new: string;
  description: string;
  gender: string;
  is_outsourced: string;
  copay: string;
  process_instruction: string;
  nhis_investigation_id: string;
  age_specifications: string[];
};

const asText = (value: unknown): string => String(value ?? '').trim();

const defaultScanForm: ScanForm = {
  name: '',
  radiology_category_id: '',
  value_new: '',
  description: '',
  gender: 'all',
  is_outsourced: '0',
  copay: '0',
  process_instruction: '',
  nhis_investigation_id: '',
  age_specifications: [],
};

type TabKey = 'anatomical' | 'categories' | 'scans' | 'priorities' | 'units';

export default function ManageRadiologiesIndex() {
  const [activeTab, setActiveTab] = useState<TabKey>('scans');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [enabledFilter, setEnabledFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [scans, setScans] = useState<ScanRow[]>([]);
  const [categories, setCategories] = useState<GenericRow[]>([]);
  const [anatomicalAreas, setAnatomicalAreas] = useState<GenericRow[]>([]);
  const [priorities, setPriorities] = useState<GenericRow[]>([]);
  const [units, setUnits] = useState<GenericRow[]>([]);
  const [ageSpecs, setAgeSpecs] = useState<GenericRow[]>([]);
  const [nhisInvestigations, setNhisInvestigations] = useState<GenericRow[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    page_size: 20,
    total_count: 0,
    total_pages: 1,
    has_next: false,
    has_previous: false,
  });

  const [anatomyForm, setAnatomyForm] = useState({ name: '', description: '', color_code: '#2d8cff' });
  const [editingAnatomyId, setEditingAnatomyId] = useState('');
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', anatomical_area_id: '' });
  const [editingCategoryId, setEditingCategoryId] = useState('');
  const [priorityForm, setPriorityForm] = useState({ name: '', description: '' });
  const [editingPriorityId, setEditingPriorityId] = useState('');
  const [unitForm, setUnitForm] = useState({ name: '', description: '' });
  const [editingUnitId, setEditingUnitId] = useState('');
  const [scanForm, setScanForm] = useState<ScanForm>(defaultScanForm);
  const [editingScanId, setEditingScanId] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  const fetchIndex = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('page_size', String(pageSize));
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (categoryFilter) params.set('category_id', categoryFilter);
      if (enabledFilter !== 'all') params.set('enabled', enabledFilter);
      const data = await api.get<IndexResponse>(`/legacy/manage-radiologies/index/?${params.toString()}`);
      setScans(Array.isArray(data?.scans) ? data.scans : []);
      setCategories(Array.isArray(data?.categories) ? data.categories : []);
      setAnatomicalAreas(Array.isArray(data?.anatomical_areas) ? data.anatomical_areas : []);
      setPriorities(Array.isArray(data?.priorities) ? data.priorities : []);
      setUnits(Array.isArray(data?.units) ? data.units : []);
      setAgeSpecs(Array.isArray(data?.age_specifications) ? data.age_specifications : []);
      setNhisInvestigations(Array.isArray(data?.nhis_investigations) ? data.nhis_investigations : []);
      if (data?.pagination) {
        setPagination(data.pagination);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load manage radiology.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchIndex();
  }, [debouncedSearch, categoryFilter, enabledFilter, page, pageSize]);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const saveAnatomy = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      if (editingAnatomyId) {
        await api.patch(`/legacy/manage-radiologies/edit-anatomical-area/?id=${encodeURIComponent(editingAnatomyId)}`, anatomyForm);
        setSuccess('Anatomical area updated.');
      } else {
        await api.post('/legacy/manage-radiologies/add-anatomical-area/', anatomyForm);
        setSuccess('Anatomical area added.');
      }
      setAnatomyForm({ name: '', description: '', color_code: '#2d8cff' });
      setEditingAnatomyId('');
      await fetchIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save anatomical area.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveCategory = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      if (editingCategoryId) {
        await api.patch(`/radiology_categories/${encodeURIComponent(editingCategoryId)}/`, categoryForm);
        setSuccess('Category updated.');
      } else {
        await api.post('/legacy/manage-radiologies/add-category/', categoryForm);
        setSuccess('Category added.');
      }
      setCategoryForm({ name: '', description: '', anatomical_area_id: '' });
      setEditingCategoryId('');
      await fetchIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save category.');
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
        await api.patch(`/priorities/${encodeURIComponent(editingPriorityId)}/`, priorityForm);
        setSuccess('Priority updated.');
      } else {
        await api.post('/priorities/', priorityForm);
        setSuccess('Priority added.');
      }
      setPriorityForm({ name: '', description: '' });
      setEditingPriorityId('');
      await fetchIndex();
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
        await api.patch(`/unit_of_measurements/${encodeURIComponent(editingUnitId)}/`, unitForm);
        setSuccess('Unit updated.');
      } else {
        await api.post('/unit_of_measurements/', unitForm);
        setSuccess('Unit added.');
      }
      setUnitForm({ name: '', description: '' });
      setEditingUnitId('');
      await fetchIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save unit.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveScan = async (event: FormEvent) => {
    event.preventDefault();
    clearMessages();
    setIsSaving(true);
    try {
      const payload = {
        ...scanForm,
        value_new: Number(scanForm.value_new || 0),
        copay: Number(scanForm.copay),
        outsourced: Number(scanForm.is_outsourced),
      };
      if (editingScanId) {
        await api.patch(`/legacy/manage-radiologies/edit-radiology-scan/?id=${encodeURIComponent(editingScanId)}`, payload);
        setSuccess('Radiology scan updated.');
      } else {
        await api.post('/legacy/manage-radiologies/add-radiology-scan/', payload);
        setSuccess('Radiology scan added.');
      }
      setScanForm(defaultScanForm);
      setEditingScanId('');
      await fetchIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save scan.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRow = async (path: string, label: string) => {
    if (!window.confirm(`Delete this ${label}?`)) return;
    clearMessages();
    setIsSaving(true);
    try {
      await api.delete(path);
      setSuccess(`${label} deleted.`);
      await fetchIndex();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Unable to delete ${label}.`);
    } finally {
      setIsSaving(false);
    }
  };

  const tabClass = (tab: TabKey) =>
    `rounded-lg px-3 py-2 text-xs font-semibold ${
      activeTab === tab ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
    }`;

  const categoriesById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    categories.forEach((item) => map.set(String(item.id), item));
    return map;
  }, [categories]);

  if (isLoading && scans.length === 0) {
    return <div className="p-6 text-sm text-slate-600">Loading manage radiology...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Manage Radiology</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Manage Radiology</h1>
        <p className="mt-2 text-sm text-slate-600">Migrated admin workspace for anatomical areas, categories, scans, priorities, and units.</p>
      </section>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button type="button" className={tabClass('anatomical')} onClick={() => setActiveTab('anatomical')}>Anatomical Areas</button>
          <button type="button" className={tabClass('categories')} onClick={() => setActiveTab('categories')}>Categories</button>
          <button type="button" className={tabClass('scans')} onClick={() => setActiveTab('scans')}>Radiology Scans</button>
          <button type="button" className={tabClass('priorities')} onClick={() => setActiveTab('priorities')}>Priorities</button>
          <button type="button" className={tabClass('units')} onClick={() => setActiveTab('units')}>Units / Formats</button>
        </div>
      </section>

      {activeTab === 'anatomical' ? (
        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveAnatomy} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">{editingAnatomyId ? 'Edit Anatomical Area' : 'Add Anatomical Area'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={anatomyForm.name} onChange={(e) => setAnatomyForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={anatomyForm.description} onChange={(e) => setAnatomyForm((p) => ({ ...p, description: e.target.value }))} />
            <label className="block text-xs font-semibold text-slate-600">Color Code</label>
            <input type="color" className="h-10 w-full rounded-lg border border-slate-300 px-2 py-1" value={anatomyForm.color_code} onChange={(e) => setAnatomyForm((p) => ({ ...p, color_code: e.target.value }))} />
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingAnatomyId ? 'Save Changes' : 'Add Area'}</button>
              {editingAnatomyId ? (
                <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingAnatomyId(''); setAnatomyForm({ name: '', description: '', color_code: '#2d8cff' }); }}>Cancel</button>
              ) : null}
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Description</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {anatomicalAreas.map((row) => (
                  <tr key={String(row.id)} className="border-t border-slate-100">
                    <td className="py-2">{asText(row.name)}</td>
                    <td>{asText(row.description) || 'N/A'}</td>
                    <td className="py-2 text-right">
                      <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingAnatomyId(String(row.id)); setAnatomyForm({ name: asText(row.name), description: asText(row.description), color_code: asText(row.color_code) || '#2d8cff' }); }}>Edit</button>
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void deleteRow(`/anatomical_areas/${encodeURIComponent(String(row.id))}/`, 'anatomical area')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'categories' ? (
        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveCategory} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">{editingCategoryId ? 'Edit Category' : 'Add Category'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={categoryForm.name} onChange={(e) => setCategoryForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={categoryForm.description} onChange={(e) => setCategoryForm((p) => ({ ...p, description: e.target.value }))} />
            <SearchableSelectField className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={categoryForm.anatomical_area_id} onChange={(e) => setCategoryForm((p) => ({ ...p, anatomical_area_id: e.target.value }))} required>
              <option value="">Select anatomical area</option>
              {anatomicalAreas.map((area) => <option key={String(area.id)} value={String(area.id)}>{asText(area.name)}</option>)}
            </SearchableSelectField>
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingCategoryId ? 'Save Changes' : 'Add Category'}</button>
              {editingCategoryId ? (
                <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingCategoryId(''); setCategoryForm({ name: '', description: '', anatomical_area_id: '' }); }}>Cancel</button>
              ) : null}
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Area</th><th>Description</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {categories.map((row) => (
                  <tr key={String(row.id)} className="border-t border-slate-100">
                    <td className="py-2">{asText(row.name)}</td>
                    <td>{asText(anatomicalAreas.find((a) => String(a.id) === asText(row.anatomical_area_id))?.name) || 'N/A'}</td>
                    <td>{asText(row.description) || 'N/A'}</td>
                    <td className="py-2 text-right">
                      <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingCategoryId(String(row.id)); setCategoryForm({ name: asText(row.name), description: asText(row.description), anatomical_area_id: asText(row.anatomical_area_id) }); }}>Edit</button>
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void deleteRow(`/radiology_categories/${encodeURIComponent(String(row.id))}/`, 'category')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'scans' ? (
        <section className="space-y-4">
          <form onSubmit={saveScan} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
            <h2 className="md:col-span-2 text-sm font-semibold text-slate-900">{editingScanId ? 'Edit Radiology Scan' : 'Add Radiology Scan'}</h2>
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Scan Name" value={scanForm.name} onChange={(e) => setScanForm((p) => ({ ...p, name: e.target.value }))} required />
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={scanForm.radiology_category_id} onChange={(e) => setScanForm((p) => ({ ...p, radiology_category_id: e.target.value }))} required>
              <option value="">Select category</option>
              {categories.map((item) => <option key={String(item.id)} value={String(item.id)}>{asText(item.name)}</option>)}
            </SearchableSelectField>
            <input type="number" min="0" step="0.01" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Price" value={scanForm.value_new} onChange={(e) => setScanForm((p) => ({ ...p, value_new: e.target.value }))} required />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={scanForm.description} onChange={(e) => setScanForm((p) => ({ ...p, description: e.target.value }))} />
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={scanForm.gender} onChange={(e) => setScanForm((p) => ({ ...p, gender: e.target.value }))}>
              <option value="all">All Genders</option><option value="male">Male</option><option value="female">Female</option>
            </SearchableSelectField>
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={scanForm.is_outsourced} onChange={(e) => setScanForm((p) => ({ ...p, is_outsourced: e.target.value }))}>
              <option value="0">Not Outsourced</option><option value="1">Outsourced</option>
            </SearchableSelectField>
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={scanForm.copay} onChange={(e) => setScanForm((p) => ({ ...p, copay: e.target.value }))}>
              <option value="0">Copay Disabled</option><option value="1">Copay Enabled</option>
            </SearchableSelectField>
            <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={scanForm.nhis_investigation_id} onChange={(e) => setScanForm((p) => ({ ...p, nhis_investigation_id: e.target.value }))}>
              <option value="">Select NHIS GDRG</option>
              {nhisInvestigations.map((item) => <option key={String(item.id)} value={String(item.id)}>{asText(item.investigation_name) || asText(item.name)}</option>)}
            </SearchableSelectField>
            <SearchableSelectField multiple className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" value={scanForm.age_specifications} onChange={(e) => setScanForm((p) => ({ ...p, age_specifications: Array.from(e.target.selectedOptions).map((opt) => opt.value) }))}>
              {ageSpecs.map((item) => <option key={String(item.id)} value={String(item.id)}>{asText(item.age) || asText(item.name)}</option>)}
            </SearchableSelectField>
            <textarea className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={3} placeholder="Process instruction" value={scanForm.process_instruction} onChange={(e) => setScanForm((p) => ({ ...p, process_instruction: e.target.value }))} />
            <div className="md:col-span-2 flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingScanId ? 'Save Changes' : 'Add Scan'}</button>
              {editingScanId ? (
                <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingScanId(''); setScanForm(defaultScanForm); }}>Cancel</button>
              ) : null}
            </div>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 grid gap-2 md:grid-cols-[1fr_220px_180px_120px]">
              <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Search scans..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
                <option value="">All Categories</option>
                {categories.map((item) => <option key={String(item.id)} value={String(item.id)}>{asText(item.name)}</option>)}
              </SearchableSelectField>
              <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={enabledFilter} onChange={(e) => { setEnabledFilter(e.target.value); setPage(1); }}>
                <option value="all">All Status</option><option value="1">Enabled</option><option value="0">Disabled</option>
              </SearchableSelectField>
              <SearchableSelectField className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={String(pageSize)} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                <option value="10">10 / page</option><option value="20">20 / page</option><option value="50">50 / page</option>
              </SearchableSelectField>
            </div>

            <table className="min-w-full text-sm">
              <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-2">Name</th><th>Category</th><th>Price</th><th>Copay</th><th>Outsourced</th><th>Enabled</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {scans.map((row) => {
                  const scan = row.scan || ({} as GenericRow);
                  const id = String(scan.id);
                  return (
                    <tr key={id} className="border-t border-slate-100">
                      <td className="py-2 font-medium text-slate-800">{asText(scan.name)}</td>
                      <td>{asText(row.category?.name) || asText(categoriesById.get(asText(scan.radiology_category_id))?.name) || 'N/A'}</td>
                      <td>{asText(scan.value_new) || '0.00'}</td>
                      <td>{Number(scan.copay || 0) === 1 ? 'Yes' : 'No'}</td>
                      <td>{Number(scan.outsourced || scan.is_outsourced || 0) === 1 ? 'Yes' : 'No'}</td>
                      <td>{Number(scan.enabled || 0) === 1 ? 'Enabled' : 'Disabled'}</td>
                      <td className="py-2 text-right">
                        <Link to={`/ManageRadiologies/update_scan_template?id=${encodeURIComponent(id)}`} className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs">Template</Link>
                        <button type="button" className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => { setEditingScanId(id); setScanForm({ name: asText(scan.name), radiology_category_id: asText(scan.radiology_category_id), value_new: asText(scan.value_new), description: asText(scan.description), gender: asText(scan.gender) || 'all', is_outsourced: String(Number(scan.outsourced || scan.is_outsourced || 0)), copay: String(Number(scan.copay || 0)), process_instruction: asText(scan.process_instruction), nhis_investigation_id: asText(scan.nhis_investigation_id), age_specifications: [] }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button>
                        <button type="button" className="mr-2 rounded border border-amber-300 px-2 py-1 text-xs text-amber-700" onClick={async () => { await api.patch(`/legacy/manage-radiologies/toggle-enable/?id=${encodeURIComponent(id)}&val=${Number(scan.enabled || 0) === 1 ? 0 : 1}`); await fetchIndex(); }}>{Number(scan.enabled || 0) === 1 ? 'Disable' : 'Enable'}</button>
                        <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void deleteRow(`/radiology_scans/${encodeURIComponent(id)}/`, 'scan')}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-slate-600">Page {pagination.page} of {pagination.total_pages} • {pagination.total_count} scan(s)</p>
              <div className="flex gap-2">
                <button type="button" disabled={!pagination.has_previous || isLoading} className="rounded border border-slate-300 px-3 py-1 text-xs disabled:opacity-50" onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
                <button type="button" disabled={!pagination.has_next || isLoading} className="rounded border border-slate-300 px-3 py-1 text-xs disabled:opacity-50" onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>
            </div>
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
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingPriorityId ? 'Save Changes' : 'Add Priority'}</button>
              {editingPriorityId ? (
                <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingPriorityId(''); setPriorityForm({ name: '', description: '' }); }}>Cancel</button>
              ) : null}
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
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void deleteRow(`/priorities/${encodeURIComponent(String(row.id))}/`, 'priority')}>Delete</button>
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
            <h2 className="text-sm font-semibold text-slate-900">{editingUnitId ? 'Edit Unit / Format' : 'Add Unit / Format'}</h2>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Name" value={unitForm.name} onChange={(e) => setUnitForm((p) => ({ ...p, name: e.target.value }))} required />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Description" value={unitForm.description} onChange={(e) => setUnitForm((p) => ({ ...p, description: e.target.value }))} />
            <div className="flex gap-2">
              <button disabled={isSaving} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{editingUnitId ? 'Save Changes' : 'Add Unit'}</button>
              {editingUnitId ? (
                <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => { setEditingUnitId(''); setUnitForm({ name: '', description: '' }); }}>Cancel</button>
              ) : null}
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
                      <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700" onClick={() => void deleteRow(`/unit_of_measurements/${encodeURIComponent(String(row.id))}/`, 'unit')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
