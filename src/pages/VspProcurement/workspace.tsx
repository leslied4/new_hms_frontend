import { useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type LookupOption = {
  id: string;
  name: string;
};

type VspItemRow = {
  id: string;
  vsp_procurement_id?: string | null;
  brand?: string | null;
  name?: string | null;
  product_code?: string | null;
  cost?: number | string | null;
  status?: string | null;
  manufacturer_id?: string | null;
  manufacturer?: LookupOption | null;
  cost_value?: number;
};

type VspRow = {
  id: string;
  name?: string | null;
  type?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  relationship_manager?: string | null;
  items_count?: number;
  catalogue_value?: number;
  preview_items?: VspItemRow[];
};

type VspResponse = {
  summary: {
    total_vsps: number;
    total_items: number;
    active_items: number;
    purchase_orders: number;
  };
  results: VspRow[];
  selected_vsp?: VspRow | null;
  catalogue: VspItemRow[];
  filters: {
    manufacturers: LookupOption[];
  };
};

const asMoney = (value: unknown) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value || 0));

const blankVspForm = () => ({
  id: '',
  name: '',
  type: '',
  email: '',
  phone: '',
  location: '',
  relationship_manager: '',
});

const blankItemForm = () => ({
  id: '',
  vsp_procurement_id: '',
  brand: '',
  name: '',
  product_code: '',
  cost: '0',
  status: 'Active',
  manufacturer_id: '',
});

export default function VspProcurementWorkspace({ mode }: { mode: 'index' | 'vsp' }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingVsp, setIsSavingVsp] = useState(false);
  const [isSavingItem, setIsSavingItem] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [payload, setPayload] = useState<VspResponse>({
    summary: { total_vsps: 0, total_items: 0, active_items: 0, purchase_orders: 0 },
    results: [],
    selected_vsp: null,
    catalogue: [],
    filters: { manufacturers: [] },
  });
  const [vspForm, setVspForm] = useState(blankVspForm());
  const [itemForm, setItemForm] = useState(blankItemForm());

  const selectedVspId = searchParams.get('vsp_id') || searchParams.get('id') || '';

  const selectedVsp = useMemo(
    () => payload.results.find((row) => row.id === selectedVspId) || payload.selected_vsp || null,
    [payload.results, payload.selected_vsp, selectedVspId],
  );

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const qs = selectedVspId ? `?vsp_id=${encodeURIComponent(selectedVspId)}` : '';
      const data = await api.get<VspResponse>(`/legacy/vsp-procurement/${mode === 'vsp' ? 'vsp/' : ''}${qs}`);
      const nextPayload: VspResponse = {
        summary: {
          total_vsps: Number(data?.summary?.total_vsps || 0),
          total_items: Number(data?.summary?.total_items || 0),
          active_items: Number(data?.summary?.active_items || 0),
          purchase_orders: Number(data?.summary?.purchase_orders || 0),
        },
        results: Array.isArray(data?.results) ? data.results : [],
        selected_vsp: data?.selected_vsp || null,
        catalogue: Array.isArray(data?.catalogue) ? data.catalogue : [],
        filters: {
          manufacturers: Array.isArray(data?.filters?.manufacturers) ? data.filters.manufacturers : [],
        },
      };
      setPayload(nextPayload);
      const nextId = selectedVspId || nextPayload.selected_vsp?.id || nextPayload.results[0]?.id || '';
      if (nextId && nextId !== selectedVspId) {
        setSearchParams({ vsp_id: nextId }, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load VSP procurement.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [selectedVspId, mode]);

  useEffect(() => {
    if (selectedVsp) {
      setVspForm({
        id: selectedVsp.id,
        name: selectedVsp.name || '',
        type: selectedVsp.type || '',
        email: selectedVsp.email || '',
        phone: selectedVsp.phone || '',
        location: selectedVsp.location || '',
        relationship_manager: selectedVsp.relationship_manager || '',
      });
    } else {
      setVspForm(blankVspForm());
    }
    setItemForm((current) => ({ ...blankItemForm(), vsp_procurement_id: selectedVsp?.id || current.vsp_procurement_id || '' }));
  }, [selectedVsp]);

  const saveVsp = async () => {
    if (!vspForm.name.trim()) {
      setError('VSP name is required.');
      setSuccess(null);
      return;
    }
    setIsSavingVsp(true);
    setError(null);
    setSuccess(null);
    try {
      const endpoint = vspForm.id ? '/legacy/vsp-procurement/update-vsp/' : '/legacy/vsp-procurement/add-permission/';
      const result = await api.post<{ id?: string; message?: string }>(endpoint, {
        ...vspForm,
        name: vspForm.name.trim(),
        type: vspForm.type.trim(),
        email: vspForm.email.trim(),
        phone: vspForm.phone.trim(),
        location: vspForm.location.trim(),
        relationship_manager: vspForm.relationship_manager.trim(),
      });
      setSuccess(result?.message || (vspForm.id ? 'VSP updated.' : 'VSP saved.'));
      if (!vspForm.id && result?.id) {
        setSearchParams({ vsp_id: result.id });
      }
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save VSP.');
    } finally {
      setIsSavingVsp(false);
    }
  };

  const deleteVsp = async () => {
    if (!selectedVsp) return;
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/vsp-procurement/delete-vsp/', { id: selectedVsp.id });
      setSuccess('VSP deleted.');
      setSearchParams({});
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete VSP.');
    }
  };

  const saveItem = async () => {
    const targetVspId = itemForm.vsp_procurement_id || selectedVsp?.id || '';
    if (!targetVspId) {
      setError('Select a VSP before adding catalogue items.');
      setSuccess(null);
      return;
    }
    if (!itemForm.name.trim()) {
      setError('Item name is required.');
      setSuccess(null);
      return;
    }
    setIsSavingItem(true);
    setError(null);
    setSuccess(null);
    try {
      const endpoint = itemForm.id ? '/legacy/vsp-procurement/update-item/' : '/legacy/vsp-procurement/add-item/';
      const result = await api.post<{ message?: string }>(endpoint, {
        ...itemForm,
        vsp_procurement_id: targetVspId,
        name: itemForm.name.trim(),
        brand: itemForm.brand.trim(),
        product_code: itemForm.product_code.trim(),
        cost: Number(itemForm.cost || 0),
      });
      setSuccess(result?.message || (itemForm.id ? 'Catalogue item updated.' : 'Catalogue item saved.'));
      setItemForm((current) => ({ ...blankItemForm(), vsp_procurement_id: targetVspId }));
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save catalogue item.');
    } finally {
      setIsSavingItem(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!id) return;
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/vsp-procurement/delete-item/', { id });
      setSuccess('Catalogue item deleted.');
      if (itemForm.id === id) {
        setItemForm((current) => ({ ...blankItemForm(), vsp_procurement_id: selectedVsp?.id || current.vsp_procurement_id || '' }));
      }
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete catalogue item.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(241,250,255,0.76))] p-6 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Manage</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">
              {mode === 'index' ? 'VSP Procurement' : 'VSP Directory'}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Onboard vendors, suppliers, and partners, then maintain the procurement catalogue they expose to purchasing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/VspProcurement/index')}
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${mode === 'index' ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => navigate('/VspProcurement/vsp')}
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${mode === 'vsp' ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              Manage VSPs
            </button>
          </div>
        </div>
      </section>

      {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{success}</div> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">VSPs</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{payload.summary.total_vsps}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Catalogue Items</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{payload.summary.total_items}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Active Items</p>
          <p className="mt-3 text-3xl font-black text-emerald-900">{payload.summary.active_items}</p>
        </div>
        <div className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">Purchase Orders</p>
          <p className="mt-3 text-3xl font-black text-sky-900">{payload.summary.purchase_orders}</p>
        </div>
      </section>

      {mode === 'index' ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">VSP Register</p>
              <h2 className="mt-2 text-lg font-black text-slate-900">All Procurement Partners</h2>
            </div>
            <button type="button" onClick={() => void loadData()} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              Refresh
            </button>
          </div>
          {isLoading ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Loading VSPs...</div> : null}
          {!isLoading && !payload.results.length ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No procurement partners found.</div> : null}
          {!isLoading && payload.results.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Catalogue</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {payload.results.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">{row.name || 'Unnamed VSP'}</p>
                        <p className="mt-1 text-xs text-slate-500">{row.location || 'No location'}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{row.type || 'N/A'}</td>
                      <td className="px-4 py-4 text-slate-600">
                        <p>{row.email || 'No email'}</p>
                        <p>{row.phone || 'No phone'}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        <p>{row.items_count || 0} item(s)</p>
                        <p>GHS {asMoney(row.catalogue_value || 0)}</p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => navigate(`/VspProcurement/vsp?vsp_id=${encodeURIComponent(row.id)}`)}
                          className="rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Directory</p>
                <h2 className="mt-2 text-lg font-black text-slate-900">VSPs</h2>
              </div>
              <button type="button" onClick={() => setVspForm(blankVspForm())} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                New
              </button>
            </div>
            <div className="space-y-3">
              {payload.results.map((row) => {
                const active = row.id === selectedVspId;
                return (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setSearchParams({ vsp_id: row.id })}
                    className={`block w-full rounded-2xl border px-4 py-4 text-left transition ${active ? 'border-cyan-300 bg-cyan-50/70' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <p className="text-sm font-bold text-slate-900">{row.name || 'Unnamed VSP'}</p>
                    <p className="mt-1 text-xs text-slate-500">{row.type || 'No type'} • {row.items_count || 0} item(s)</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Partner Profile</p>
              <h2 className="mt-2 text-lg font-black text-slate-900">{vspForm.id ? 'Update VSP' : 'Add VSP'}</h2>
            </div>
            <div className="space-y-4">
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Name</span>
                <input value={vspForm.name} onChange={(event) => setVspForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Type</span>
                <input value={vspForm.type} onChange={(event) => setVspForm((current) => ({ ...current, type: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</span>
                <input value={vspForm.email} onChange={(event) => setVspForm((current) => ({ ...current, email: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Phone</span>
                  <input value={vspForm.phone} onChange={(event) => setVspForm((current) => ({ ...current, phone: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Relationship Manager</span>
                  <input value={vspForm.relationship_manager} onChange={(event) => setVspForm((current) => ({ ...current, relationship_manager: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                </label>
              </div>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Location</span>
                <input value={vspForm.location} onChange={(event) => setVspForm((current) => ({ ...current, location: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => void saveVsp()} disabled={isSavingVsp} className="rounded-2xl bg-cyan-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
                  {isSavingVsp ? 'Saving...' : vspForm.id ? 'Update VSP' : 'Save VSP'}
                </button>
                <button type="button" onClick={() => setVspForm(blankVspForm())} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  Reset
                </button>
                {selectedVsp ? (
                  <button type="button" onClick={() => void deleteVsp()} className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          </section>
        </aside>

        <section className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Selected VSP</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">{selectedVsp?.name || 'Choose a partner'}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedVsp ? `${selectedVsp.type || 'No type'} • ${selectedVsp.email || 'No email'} • ${selectedVsp.phone || 'No phone'}` : 'Pick a VSP from the directory to manage its catalogue.'}
                </p>
              </div>
              {selectedVsp ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Catalogue Value</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">GHS {asMoney(selectedVsp.catalogue_value || 0)}</p>
                </div>
              ) : null}
            </div>
            {selectedVsp?.preview_items?.length ? (
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {selectedVsp.preview_items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{item.name || 'Unnamed item'}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.product_code || 'No code'}{item.brand ? ` • ${item.brand}` : ''}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">GHS {asMoney(item.cost_value || item.cost || 0)}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <div className="grid gap-6 2xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Catalogue Entry</p>
                <h2 className="mt-2 text-lg font-black text-slate-900">{itemForm.id ? 'Edit Catalogue Item' : 'Add Catalogue Item'}</h2>
              </div>
              {!selectedVsp ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Select a VSP before adding catalogue items.</div>
              ) : (
                <div className="space-y-4">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Item Name</span>
                    <input value={itemForm.name} onChange={(event) => setItemForm((current) => ({ ...current, name: event.target.value, vsp_procurement_id: selectedVsp.id }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Brand</span>
                      <input value={itemForm.brand} onChange={(event) => setItemForm((current) => ({ ...current, brand: event.target.value, vsp_procurement_id: selectedVsp.id }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Product Code</span>
                      <input value={itemForm.product_code} onChange={(event) => setItemForm((current) => ({ ...current, product_code: event.target.value, vsp_procurement_id: selectedVsp.id }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cost</span>
                      <input value={itemForm.cost} onChange={(event) => setItemForm((current) => ({ ...current, cost: event.target.value, vsp_procurement_id: selectedVsp.id }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</span>
                      <SearchableSelectField value={itemForm.status} onChange={(event) => setItemForm((current) => ({ ...current, status: event.target.value, vsp_procurement_id: selectedVsp.id }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </SearchableSelectField>
                    </label>
                  </div>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Manufacturer</span>
                    <SearchableSelectField value={itemForm.manufacturer_id} onChange={(event) => setItemForm((current) => ({ ...current, manufacturer_id: event.target.value, vsp_procurement_id: selectedVsp.id }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none">
                      <option value="">Select Manufacturer</option>
                      {payload.filters.manufacturers.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => void saveItem()} disabled={isSavingItem} className="rounded-2xl bg-cyan-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
                      {isSavingItem ? 'Saving...' : itemForm.id ? 'Update Item' : 'Add Item'}
                    </button>
                    <button type="button" onClick={() => setItemForm({ ...blankItemForm(), vsp_procurement_id: selectedVsp.id })} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Catalogue</p>
                  <h2 className="mt-2 text-lg font-black text-slate-900">Procurement Item Register</h2>
                </div>
                <button type="button" onClick={() => void loadData()} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                  Refresh
                </button>
              </div>
              {!selectedVsp ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Select a VSP to load catalogue items.</div>
              ) : !payload.catalogue.length ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No catalogue items found for this VSP.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3">Brand / Code</th>
                        <th className="px-4 py-3">Manufacturer</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Cost</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {payload.catalogue.map((row) => (
                        <tr key={row.id}>
                          <td className="px-4 py-4 font-semibold text-slate-900">{row.name || 'Unnamed item'}</td>
                          <td className="px-4 py-4 text-slate-600">
                            <p>{row.brand || 'No brand'}</p>
                            <p className="text-xs text-slate-500">{row.product_code || 'No code'}</p>
                          </td>
                          <td className="px-4 py-4 text-slate-600">{row.manufacturer?.name || 'N/A'}</td>
                          <td className="px-4 py-4 text-slate-600">{row.status || 'Active'}</td>
                          <td className="px-4 py-4 text-slate-600">GHS {asMoney(row.cost_value || row.cost || 0)}</td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setItemForm({
                                  id: row.id,
                                  vsp_procurement_id: selectedVsp.id,
                                  brand: row.brand || '',
                                  name: row.name || '',
                                  product_code: row.product_code || '',
                                  cost: String(row.cost_value || row.cost || 0),
                                  status: row.status || 'Active',
                                  manufacturer_id: row.manufacturer_id || row.manufacturer?.id || '',
                                })}
                                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                              >
                                Edit
                              </button>
                              <button type="button" onClick={() => void deleteItem(row.id)} className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
