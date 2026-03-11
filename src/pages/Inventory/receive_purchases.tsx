import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type LookupOption = {
  id: string;
  name: string;
};

type PurchaseRow = {
  id: string;
  invoice_number?: string | null;
  purchase_type?: number | string | null;
  status?: number | string | null;
  carrier_fees?: number | string | null;
  invoice_sub_total?: number | string | null;
  invoice_total?: number | string | null;
  purchase_date?: string | null;
  vsp?: LookupOption | null;
  department?: LookupOption | null;
  user?: LookupOption | null;
  purchase_order?: LookupOption | null;
  items_count?: number;
};

type PurchaseItemRow = {
  id: string;
  item_id?: string | null;
  batch_number?: string | null;
  expiry_date?: string | null;
  wholesale_pricing_unit?: number | string | null;
  wholesale_quantity?: number | string | null;
  wholesale_unit_cost_price?: number | string | null;
  retail_pricing_unit?: number | string | null;
  quantity_per_wholesale_pricing_unit?: number | string | null;
  retail_quantity?: number | string | null;
  unit_selling_price?: number | string | null;
  reorder_level?: number | string | null;
  total_cost_price?: number | string | null;
  total_selling_price?: number | string | null;
  estimated_profit?: number | string | null;
  item?: { id: string; name?: string | null; item_code?: string | null } | null;
  retail_pricing_unit_data?: LookupOption | null;
  wholesale_pricing_unit_data?: LookupOption | null;
  receive_purchase?: { status?: number | string | null } | null;
};

type ItemSuggestion = {
  id: string;
  full_name?: string | null;
  name?: string | null;
  brand_name?: string | null;
  item_code?: string | null;
  item_type?: LookupOption | null;
};

type ReceivePurchasesResponse = {
  currency: string;
  summary: {
    total: number;
    draft: number;
    finalized: number;
    verified: number;
    completed: number;
  };
  results: PurchaseRow[];
  filters: {
    vsps: LookupOption[];
    departments: LookupOption[];
    purchase_orders: Array<LookupOption & { amount?: number }>;
  };
};

type ReceivePurchaseItemsResponse = {
  success: boolean;
  data: PurchaseItemRow[];
};

type InventoryItemsResponse = {
  results: ItemSuggestion[];
};

const asNumber = (value: unknown): number => {
  const parsed = Number(String(value ?? '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoney = (currency: string, value: unknown): string => {
  return `${currency} ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(asNumber(value))}`;
};

const statusMeta = (status: number) => {
  switch (status) {
    case 1:
      return { label: 'Finalized', pill: 'border-sky-200 bg-sky-50 text-sky-700' };
    case 2:
      return { label: 'Verified', pill: 'border-amber-200 bg-amber-50 text-amber-700' };
    case 3:
      return { label: 'Completed', pill: 'border-emerald-200 bg-emerald-50 text-emerald-700' };
    default:
      return { label: 'Draft', pill: 'border-slate-200 bg-slate-50 text-slate-700' };
  }
};

const purchaseTypeLabel = (value: number) => (value === 2 ? 'Credit' : 'Cash');
const toSelectOptions = (rows: LookupOption[] = []) =>
  rows.map((row) => ({ value: String(row.id), label: row.name || String(row.id) }));

const defaultPurchaseForm = () => ({
  invoice_number: '',
  purchase_type: '1',
  purchase_order_id: '',
  vsp_procurement_id: '',
  purchase_date: '',
  department_id: '',
  invoice_sub_total: '0',
  discount: '0',
  tax: '0',
  invoice_total: '0',
  carrier_fees: '0',
});

const defaultItemForm = () => ({
  id: '',
  item_id: '',
  batch_number: '',
  expiry_date: '',
  wholesale_pricing_unit: '',
  wholesale_quantity: '1',
  wholesale_unit_cost_price: '0',
  retail_pricing_unit: '',
  quantity_per_wholesale_pricing_unit: '1',
  retail_quantity: '1',
  unit_selling_price: '0',
  reorder_level: '0',
});

export default function InventoryReceivePurchases() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingPurchase, setIsSavingPurchase] = useState(false);
  const [isSavingItem, setIsSavingItem] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [response, setResponse] = useState<ReceivePurchasesResponse>({
    currency: 'GHS',
    summary: { total: 0, draft: 0, finalized: 0, verified: 0, completed: 0 },
    results: [],
    filters: { vsps: [], departments: [], purchase_orders: [] },
  });
  const [selectedPurchaseId, setSelectedPurchaseId] = useState('');
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemRow[]>([]);
  const [purchaseForm, setPurchaseForm] = useState(defaultPurchaseForm());
  const [itemForm, setItemForm] = useState(defaultItemForm());
  const [editingItemId, setEditingItemId] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [debouncedItemSearch, setDebouncedItemSearch] = useState('');
  const [itemSuggestions, setItemSuggestions] = useState<ItemSuggestion[]>([]);
  const [selectedItemSuggestion, setSelectedItemSuggestion] = useState<ItemSuggestion | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const loadPurchases = async (preserveSelection = true) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get<ReceivePurchasesResponse>('/legacy/inventory/receive-purchases/');
      const nextResponse: ReceivePurchasesResponse = {
        currency: data?.currency || 'GHS',
        summary: {
          total: Number(data?.summary?.total || 0),
          draft: Number(data?.summary?.draft || 0),
          finalized: Number(data?.summary?.finalized || 0),
          verified: Number(data?.summary?.verified || 0),
          completed: Number(data?.summary?.completed || 0),
        },
        results: Array.isArray(data?.results) ? data.results : [],
        filters: {
          vsps: Array.isArray(data?.filters?.vsps) ? data.filters.vsps : [],
          departments: Array.isArray(data?.filters?.departments) ? data.filters.departments : [],
          purchase_orders: Array.isArray(data?.filters?.purchase_orders) ? data.filters.purchase_orders : [],
        },
      };
      setResponse(nextResponse);
      const nextSelectedId = preserveSelection
        ? (nextResponse.results.find((row) => row.id === selectedPurchaseId)?.id || nextResponse.results[0]?.id || '')
        : (nextResponse.results[0]?.id || '');
      setSelectedPurchaseId(nextSelectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load receive purchases.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPurchaseItems = async (purchaseId: string) => {
    if (!purchaseId) {
      setPurchaseItems([]);
      return;
    }
    try {
      const data = await api.get<ReceivePurchaseItemsResponse>(`/legacy/inventory/fetch-receive-purchase-items/?receive_purchase_id=${encodeURIComponent(purchaseId)}`);
      setPurchaseItems(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load purchase items.');
    }
  };

  useEffect(() => {
    void loadPurchases(false);
  }, []);

  useEffect(() => {
    void loadPurchaseItems(selectedPurchaseId);
  }, [selectedPurchaseId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedItemSearch(itemSearch.trim());
    }, 250);
    return () => window.clearTimeout(timer);
  }, [itemSearch]);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (!debouncedItemSearch || debouncedItemSearch.length < 2) {
        setItemSuggestions([]);
        return;
      }
      try {
        const data = await api.get<InventoryItemsResponse>(`/legacy/inventory/items/?search=${encodeURIComponent(debouncedItemSearch)}&limit=12`);
        setItemSuggestions(Array.isArray(data?.results) ? data.results : []);
      } catch {
        setItemSuggestions([]);
      }
    };
    void loadSuggestions();
  }, [debouncedItemSearch]);

  const selectedPurchase = useMemo(
    () => response.results.find((row) => row.id === selectedPurchaseId) || null,
    [response.results, selectedPurchaseId],
  );

  const purchaseStatus = Number(selectedPurchase?.status || 0);
  const selectedPurchaseMeta = statusMeta(purchaseStatus);

  const computedInvoiceTotal = useMemo(() => {
    return asNumber(purchaseForm.invoice_sub_total) - asNumber(purchaseForm.discount) + asNumber(purchaseForm.tax);
  }, [purchaseForm.discount, purchaseForm.invoice_sub_total, purchaseForm.tax]);

  useEffect(() => {
    setPurchaseForm((current) => ({ ...current, invoice_total: String(computedInvoiceTotal) }));
  }, [computedInvoiceTotal]);

  const computedRetailQuantity = useMemo(() => {
    return asNumber(itemForm.wholesale_quantity) * Math.max(1, asNumber(itemForm.quantity_per_wholesale_pricing_unit));
  }, [itemForm.quantity_per_wholesale_pricing_unit, itemForm.wholesale_quantity]);

  useEffect(() => {
    if (!editingItemId) {
      setItemForm((current) => ({ ...current, retail_quantity: String(computedRetailQuantity) }));
    }
  }, [computedRetailQuantity, editingItemId]);

  const resetPurchaseForm = () => setPurchaseForm(defaultPurchaseForm());

  const resetItemForm = () => {
    setItemForm(defaultItemForm());
    setEditingItemId('');
    setItemSearch('');
    setDebouncedItemSearch('');
    setItemSuggestions([]);
    setSelectedItemSuggestion(null);
    setShowSuggestions(false);
  };

  const savePurchase = async () => {
    if (!purchaseForm.invoice_number.trim()) {
      setError('Invoice number is required.');
      setSuccess(null);
      return;
    }
    if (!purchaseForm.vsp_procurement_id) {
      setError('Vendor, Supplier & Partner is required.');
      setSuccess(null);
      return;
    }
    if (!purchaseForm.department_id) {
      setError('Department is required.');
      setSuccess(null);
      return;
    }
    setIsSavingPurchase(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        invoice_number: purchaseForm.invoice_number.trim(),
        purchase_type: Number(purchaseForm.purchase_type || '1'),
        purchase_order_id: purchaseForm.purchase_order_id || null,
        vsp_procurement_id: purchaseForm.vsp_procurement_id,
        purchase_date: purchaseForm.purchase_date || null,
        department_id: purchaseForm.department_id,
        invoice_sub_total: asNumber(purchaseForm.invoice_sub_total),
        discount: asNumber(purchaseForm.discount),
        tax: asNumber(purchaseForm.tax),
        invoice_total: computedInvoiceTotal,
        carrier_fees: asNumber(purchaseForm.carrier_fees),
      };
      const result = await api.post<{ receive_purchase_id?: string; message?: string }>('/legacy/inventory/create-receive-purchase/', payload);
      setSuccess(result?.message || 'Purchase created.');
      resetPurchaseForm();
      await loadPurchases(false);
      if (result?.receive_purchase_id) setSelectedPurchaseId(result.receive_purchase_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create receive purchase.');
    } finally {
      setIsSavingPurchase(false);
    }
  };

  const savePurchaseItem = async () => {
    if (!selectedPurchaseId) {
      setError('Select a purchase first.');
      setSuccess(null);
      return;
    }
    if (!itemForm.item_id) {
      setError('Select an item to add.');
      setSuccess(null);
      return;
    }
    setIsSavingItem(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...(editingItemId ? { id: editingItemId } : {}),
        receive_purchase_id: selectedPurchaseId,
        item_id: itemForm.item_id,
        batch_number: itemForm.batch_number || null,
        expiry_date: itemForm.expiry_date || null,
        wholesale_pricing_unit: itemForm.wholesale_pricing_unit ? Number(itemForm.wholesale_pricing_unit) : null,
        wholesale_quantity: asNumber(itemForm.wholesale_quantity),
        wholesale_unit_cost_price: asNumber(itemForm.wholesale_unit_cost_price),
        retail_pricing_unit: itemForm.retail_pricing_unit ? Number(itemForm.retail_pricing_unit) : null,
        quantity_per_wholesale_pricing_unit: asNumber(itemForm.quantity_per_wholesale_pricing_unit),
        retail_quantity: asNumber(itemForm.retail_quantity),
        unit_selling_price: asNumber(itemForm.unit_selling_price),
        reorder_level: asNumber(itemForm.reorder_level),
      };
      if (editingItemId) {
        await api.post('/legacy/inventory/update-receive-purchase-item/', payload);
        setSuccess('Purchase item updated.');
      } else {
        await api.post('/legacy/inventory/create-receive-purchase-item/', payload);
        setSuccess('Purchase item added.');
      }
      resetItemForm();
      await loadPurchaseItems(selectedPurchaseId);
      await loadPurchases(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save purchase item.');
    } finally {
      setIsSavingItem(false);
    }
  };

  const updatePurchaseStatus = async (status: 'finalized' | 'verified' | 'completed') => {
    if (!selectedPurchaseId) return;
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/inventory/update-receive-purchase/', { id: selectedPurchaseId, status });
      setSuccess(`Purchase ${status}.`);
      await loadPurchases(true);
      await loadPurchaseItems(selectedPurchaseId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update purchase status.');
    }
  };

  const loadItemIntoForm = (row: PurchaseItemRow) => {
    setEditingItemId(row.id);
    setSelectedItemSuggestion(row.item ? { id: row.item.id, full_name: row.item.name || '', item_code: row.item.item_code || '', item_type: row.retail_pricing_unit_data || row.wholesale_pricing_unit_data || null } : null);
    setItemSearch(row.item?.name || '');
    setItemForm({
      id: row.id,
      item_id: row.item?.id || '',
      batch_number: String(row.batch_number || ''),
      expiry_date: String(row.expiry_date || ''),
      wholesale_pricing_unit: String(row.wholesale_pricing_unit || ''),
      wholesale_quantity: String(row.wholesale_quantity || '1'),
      wholesale_unit_cost_price: String(row.wholesale_unit_cost_price || '0'),
      retail_pricing_unit: String(row.retail_pricing_unit || ''),
      quantity_per_wholesale_pricing_unit: String(row.quantity_per_wholesale_pricing_unit || '1'),
      retail_quantity: String(row.retail_quantity || '1'),
      unit_selling_price: String(row.unit_selling_price || '0'),
      reorder_level: String(row.reorder_level || '0'),
    });
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(241,250,255,0.76))] p-6 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Inventory</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">Receive Purchases</h1>
            <p className="mt-2 text-sm text-slate-600">Record received purchases, load line items, and transition them from draft to stock-ready completion.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-right shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Currency</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{response.currency}</p>
          </div>
        </div>
      </section>

      {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{success}</div> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Total</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{response.summary.total}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Draft</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{response.summary.draft}</p>
        </div>
        <div className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">Finalized</p>
          <p className="mt-3 text-3xl font-black text-sky-900">{response.summary.finalized}</p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">Verified</p>
          <p className="mt-3 text-3xl font-black text-amber-900">{response.summary.verified}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Completed</p>
          <p className="mt-3 text-3xl font-black text-emerald-900">{response.summary.completed}</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Record New Purchase</p>
              <h2 className="mt-2 text-lg font-black text-slate-900">New Purchase</h2>
            </div>
            <div className="space-y-4">
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Invoice ID</span>
                <input value={purchaseForm.invoice_number} onChange={(event) => setPurchaseForm((current) => ({ ...current, invoice_number: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Type of Purchase</span>
                  <SearchableSelect
                    value={purchaseForm.purchase_type}
                    onChange={(value) => setPurchaseForm((current) => ({ ...current, purchase_type: value || '1' }))}
                    options={[
                      { value: '1', label: 'Cash' },
                      { value: '2', label: 'Credit' },
                    ]}
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Related Purchase Order</span>
                  <SearchableSelect
                    value={purchaseForm.purchase_order_id}
                    onChange={(value) => setPurchaseForm((current) => ({ ...current, purchase_order_id: value }))}
                    options={response.filters.purchase_orders.map((option) => ({
                      value: String(option.id),
                      label: `${option.name}${typeof option.amount === 'number' ? ` (${formatMoney(response.currency, option.amount)})` : ''}`,
                    }))}
                    placeholder="None"
                  />
                </label>
              </div>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Vendor, Supplier & Partner</span>
                <SearchableSelect
                  value={purchaseForm.vsp_procurement_id}
                  onChange={(value) => setPurchaseForm((current) => ({ ...current, vsp_procurement_id: value }))}
                  options={toSelectOptions(response.filters.vsps)}
                  placeholder="Select Vendor, Supplier & Partner"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Purchase Date</span>
                  <input type="date" value={purchaseForm.purchase_date} onChange={(event) => setPurchaseForm((current) => ({ ...current, purchase_date: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Department</span>
                  <SearchableSelect
                    value={purchaseForm.department_id}
                    onChange={(value) => setPurchaseForm((current) => ({ ...current, department_id: value }))}
                    options={toSelectOptions(response.filters.departments)}
                    placeholder="Select Department"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Invoice Sub Total</span>
                  <input value={purchaseForm.invoice_sub_total} onChange={(event) => setPurchaseForm((current) => ({ ...current, invoice_sub_total: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Discount</span>
                  <input value={purchaseForm.discount} onChange={(event) => setPurchaseForm((current) => ({ ...current, discount: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Tax</span>
                  <input value={purchaseForm.tax} onChange={(event) => setPurchaseForm((current) => ({ ...current, tax: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Carrier Fees</span>
                  <input value={purchaseForm.carrier_fees} onChange={(event) => setPurchaseForm((current) => ({ ...current, carrier_fees: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                </label>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="font-semibold">Invoice Total:</span> {formatMoney(response.currency, computedInvoiceTotal)}
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => void savePurchase()} disabled={isSavingPurchase || isLoading} className="rounded-2xl bg-cyan-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">{isSavingPurchase ? 'Saving...' : 'Submit Purchase'}</button>
                <button type="button" onClick={resetPurchaseForm} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Reset</button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Purchase Register</p>
                <h2 className="mt-2 text-lg font-black text-slate-900">Received Purchases</h2>
                <p className="mt-1 text-sm text-slate-600">Select a purchase from the register to open it and manage the line items.</p>
              </div>
              <button type="button" onClick={() => void loadPurchases(true)} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Refresh</button>
            </div>
            <div className="space-y-3">
              {isLoading ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Loading purchases...</div> : null}
              {!isLoading && !response.results.length ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No receive purchases recorded yet.</div> : null}
              {!isLoading && response.results.map((row) => {
                const meta = statusMeta(Number(row.status || 0));
                const active = row.id === selectedPurchaseId;
                return (
                  <div
                    key={row.id}
                    className={`rounded-2xl border px-4 py-4 transition ${active ? 'border-cyan-300 bg-cyan-50/70' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <button type="button" onClick={() => setSelectedPurchaseId(row.id)} className="block w-full text-left">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{row.invoice_number || row.id}</p>
                          <p className="mt-1 text-xs text-slate-500">{row.vsp?.name || 'No VSP'} • {row.department?.name || 'No Department'}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${meta.pill}`}>{meta.label}</span>
                      </div>
                      <div className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
                        <span>{purchaseTypeLabel(Number(row.purchase_type || 1))}</span>
                        <span>{formatMoney(response.currency, row.invoice_total)}</span>
                        <span>{row.purchase_date || 'No purchase date'}</span>
                        <span>{row.items_count || 0} item(s)</span>
                      </div>
                    </button>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/Inventory/view_purchases?purchase_id=${encodeURIComponent(row.id)}`)}
                        className="rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Selected Purchase</p>
                <h2 className="mt-2 text-xl font-black text-slate-900">{selectedPurchase?.invoice_number || 'Choose a purchase'}</h2>
                <p className="mt-1 text-sm text-slate-600">{selectedPurchase ? `${selectedPurchase.vsp?.name || 'No VSP'} • ${selectedPurchase.department?.name || 'No Department'}` : 'Select a purchase from the register to manage its items.'}</p>
              </div>
              {selectedPurchase ? <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${selectedPurchaseMeta.pill}`}>{selectedPurchaseMeta.label}</span> : null}
            </div>

            {selectedPurchase ? (
              <>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Sub Total</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(response.currency, selectedPurchase.invoice_sub_total)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Net Total</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(response.currency, selectedPurchase.invoice_total)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Carrier Fees</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(response.currency, selectedPurchase.carrier_fees)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Created By</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{selectedPurchase.user?.name || 'Unknown'}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" disabled={purchaseStatus >= 1} onClick={() => void updatePurchaseStatus('finalized')} className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 disabled:opacity-50">Finalize</button>
                  <button type="button" disabled={purchaseStatus >= 2 || purchaseStatus < 1} onClick={() => void updatePurchaseStatus('verified')} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 disabled:opacity-50">Verify</button>
                  <button type="button" disabled={purchaseStatus >= 3 || purchaseStatus < 2} onClick={() => void updatePurchaseStatus('completed')} className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 disabled:opacity-50">Complete</button>
                  <button
                    type="button"
                    onClick={() => selectedPurchaseId && navigate(`/Inventory/view_purchases?purchase_id=${encodeURIComponent(selectedPurchaseId)}`)}
                    disabled={!selectedPurchaseId}
                    className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 disabled:opacity-50"
                  >
                    Manage Purchase
                  </button>
                </div>
              </>
            ) : null}
          </section>
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 shadow-[0_16px_35px_rgba(15,23,42,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Line Items</p>
            <h2 className="mt-2 text-lg font-black text-slate-900">Manage items on a dedicated page</h2>
            <p className="mt-2 text-sm text-slate-600">
              Use <span className="font-semibold text-slate-900">Manage</span> from the register to open the receive-purchase record and add or edit the line items there.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
