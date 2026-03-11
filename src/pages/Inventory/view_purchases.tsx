import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

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

const defaultItemForm = () => ({
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

export default function InventoryViewPurchases() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingItem, setIsSavingItem] = useState(false);
  const [isRefreshingStatus, setIsRefreshingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currency, setCurrency] = useState('GHS');
  const [purchases, setPurchases] = useState<PurchaseRow[]>([]);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemRow[]>([]);
  const [itemForm, setItemForm] = useState(defaultItemForm());
  const [editingItemId, setEditingItemId] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [debouncedItemSearch, setDebouncedItemSearch] = useState('');
  const [itemSuggestions, setItemSuggestions] = useState<ItemSuggestion[]>([]);
  const [selectedItemSuggestion, setSelectedItemSuggestion] = useState<ItemSuggestion | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const selectedPurchaseId = searchParams.get('purchase_id') || '';

  const selectedPurchase = useMemo(
    () => purchases.find((row) => row.id === selectedPurchaseId) || null,
    [purchases, selectedPurchaseId],
  );

  const purchaseStatus = Number(selectedPurchase?.status || 0);
  const selectedPurchaseMeta = statusMeta(purchaseStatus);

  const computedRetailQuantity = useMemo(() => {
    return asNumber(itemForm.wholesale_quantity) * Math.max(1, asNumber(itemForm.quantity_per_wholesale_pricing_unit));
  }, [itemForm.quantity_per_wholesale_pricing_unit, itemForm.wholesale_quantity]);

  const computedTotals = useMemo(() => {
    const wholesaleQuantity = asNumber(itemForm.wholesale_quantity);
    const wholesaleCost = asNumber(itemForm.wholesale_unit_cost_price);
    const retailQuantity = asNumber(itemForm.retail_quantity);
    const unitSellingPrice = asNumber(itemForm.unit_selling_price);
    return {
      totalCost: wholesaleQuantity * wholesaleCost,
      totalSales: retailQuantity * unitSellingPrice,
      estimatedProfit: retailQuantity * unitSellingPrice - wholesaleQuantity * wholesaleCost,
    };
  }, [itemForm.retail_quantity, itemForm.unit_selling_price, itemForm.wholesale_quantity, itemForm.wholesale_unit_cost_price]);

  useEffect(() => {
    if (!editingItemId) {
      setItemForm((current) => ({ ...current, retail_quantity: String(computedRetailQuantity) }));
    }
  }, [computedRetailQuantity, editingItemId]);

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

  const resetItemForm = () => {
    setItemForm(defaultItemForm());
    setEditingItemId('');
    setItemSearch('');
    setDebouncedItemSearch('');
    setItemSuggestions([]);
    setSelectedItemSuggestion(null);
    setShowSuggestions(false);
  };

  const loadPurchases = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get<ReceivePurchasesResponse>('/legacy/inventory/receive-purchases/');
      const nextResults = Array.isArray(data?.results) ? data.results : [];
      setCurrency(data?.currency || 'GHS');
      setPurchases(nextResults);
      if (!selectedPurchaseId && nextResults[0]?.id) {
        setSearchParams({ purchase_id: nextResults[0].id }, { replace: true });
      }
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
    void loadPurchases();
  }, []);

  useEffect(() => {
    void loadPurchaseItems(selectedPurchaseId);
    resetItemForm();
  }, [selectedPurchaseId]);

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
      await loadPurchases();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save purchase item.');
    } finally {
      setIsSavingItem(false);
    }
  };

  const updatePurchaseStatus = async (status: 'finalized' | 'verified' | 'completed') => {
    if (!selectedPurchaseId) return;
    setIsRefreshingStatus(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/inventory/update-receive-purchase/', { id: selectedPurchaseId, status });
      setSuccess(`Purchase ${status}.`);
      await loadPurchases();
      await loadPurchaseItems(selectedPurchaseId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update purchase status.');
    } finally {
      setIsRefreshingStatus(false);
    }
  };

  const loadItemIntoForm = (row: PurchaseItemRow) => {
    setEditingItemId(row.id);
    setSelectedItemSuggestion(
      row.item
        ? {
            id: row.item.id,
            full_name: row.item.name || '',
            item_code: row.item.item_code || '',
            item_type: row.retail_pricing_unit_data || row.wholesale_pricing_unit_data || null,
          }
        : null,
    );
    setItemSearch(row.item?.name || '');
    setItemForm({
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
            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">Manage Purchase</h1>
            <p className="mt-2 text-sm text-slate-600">Open a received purchase, add stock lines, and move it from draft through completion.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/Inventory/receive_purchases')}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Back To Register
            </button>
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-right shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Currency</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{currency}</p>
            </div>
          </div>
        </div>
      </section>

      {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{success}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Receive Purchases</p>
                <h2 className="mt-2 text-lg font-black text-slate-900">Purchase Register</h2>
              </div>
              <button type="button" onClick={() => void loadPurchases()} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                Refresh
              </button>
            </div>
            <div className="space-y-3">
              {isLoading ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Loading purchases...</div> : null}
              {!isLoading && !purchases.length ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No purchases available.</div> : null}
              {!isLoading &&
                purchases.map((row) => {
                  const active = row.id === selectedPurchaseId;
                  const meta = statusMeta(Number(row.status || 0));
                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setSearchParams({ purchase_id: row.id })}
                      className={`block w-full rounded-2xl border px-4 py-4 text-left transition ${active ? 'border-cyan-300 bg-cyan-50/70' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{row.invoice_number || row.id}</p>
                          <p className="mt-1 text-xs text-slate-500">{row.vsp?.name || 'No VSP'} • {row.department?.name || 'No Department'}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${meta.pill}`}>{meta.label}</span>
                      </div>
                      <div className="mt-3 grid gap-1 text-xs text-slate-600">
                        <span>{purchaseTypeLabel(Number(row.purchase_type || 1))}</span>
                        <span>{row.items_count || 0} item(s)</span>
                        <span>{formatMoney(currency, row.invoice_total)}</span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </section>
        </aside>

        <section className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Current Purchase</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">{selectedPurchase?.invoice_number || 'Choose a purchase'}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedPurchase
                    ? `${selectedPurchase.vsp?.name || 'No VSP'} • ${selectedPurchase.department?.name || 'No Department'} • ${selectedPurchase.purchase_date || 'No purchase date'}`
                    : 'Select a purchase from the register to manage its items.'}
                </p>
              </div>
              {selectedPurchase ? <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${selectedPurchaseMeta.pill}`}>{selectedPurchaseMeta.label}</span> : null}
            </div>

            {selectedPurchase ? (
              <>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Type</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{purchaseTypeLabel(Number(selectedPurchase.purchase_type || 1))}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Sub Total</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(currency, selectedPurchase.invoice_sub_total)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Net Total</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(currency, selectedPurchase.invoice_total)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Carrier Fees</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(currency, selectedPurchase.carrier_fees)}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={purchaseStatus >= 1 || isRefreshingStatus}
                    onClick={() => void updatePurchaseStatus('finalized')}
                    className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 disabled:opacity-50"
                  >
                    Finalize
                  </button>
                  <button
                    type="button"
                    disabled={purchaseStatus >= 2 || purchaseStatus < 1 || isRefreshingStatus}
                    onClick={() => void updatePurchaseStatus('verified')}
                    className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 disabled:opacity-50"
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    disabled={purchaseStatus >= 3 || purchaseStatus < 2 || isRefreshingStatus}
                    onClick={() => void updatePurchaseStatus('completed')}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 disabled:opacity-50"
                  >
                    Complete
                  </button>
                </div>
              </>
            ) : null}
          </section>

          <div className="grid gap-6 2xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Purchase Line Entry</p>
                <h2 className="mt-2 text-lg font-black text-slate-900">{editingItemId ? 'Edit Purchase Item' : 'Add Purchase Item'}</h2>
                <p className="mt-1 text-sm text-slate-600">Search for the stock item, capture the batch information, and define the pricing units for this purchase.</p>
              </div>

              {!selectedPurchase ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Select a purchase before adding items.</div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Search Item</span>
                      <input
                        value={itemSearch}
                        onFocus={() => setShowSuggestions(true)}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          setItemSearch(nextValue);
                          setShowSuggestions(true);
                          if (!nextValue.trim()) {
                            setSelectedItemSuggestion(null);
                            setItemForm((current) => ({ ...current, item_id: '' }));
                          }
                        }}
                        placeholder="Search by name or item code"
                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                          selectedItemSuggestion ? 'border-cyan-300 bg-cyan-50/60 text-slate-900' : 'border-slate-200 bg-slate-50/70'
                        }`}
                      />
                    </label>
                    {showSuggestions && itemSuggestions.length ? (
                      <div className="absolute left-0 right-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                        {itemSuggestions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              setSelectedItemSuggestion(option);
                              setItemSearch(option.full_name || option.name || option.brand_name || option.item_code || '');
                              setItemForm((current) => ({ ...current, item_id: option.id }));
                              setItemSuggestions([]);
                              setShowSuggestions(false);
                            }}
                            className="block w-full rounded-2xl px-3 py-3 text-left hover:bg-slate-50"
                          >
                            <p className="text-sm font-semibold text-slate-900">{option.full_name || option.name || 'Unnamed item'}</p>
                            <p className="mt-1 text-xs text-slate-500">{option.item_code || 'No code'}{option.item_type?.name ? ` • ${option.item_type.name}` : ''}</p>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {selectedItemSuggestion ? (
                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50/80 px-4 py-3 text-sm text-cyan-900">
                      <span className="font-semibold">{selectedItemSuggestion.full_name || selectedItemSuggestion.name || 'Selected item'}</span>
                      <span className="text-cyan-700"> • {selectedItemSuggestion.item_code || 'No code'}</span>
                    </div>
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Batch Number</span>
                      <input value={itemForm.batch_number} onChange={(event) => setItemForm((current) => ({ ...current, batch_number: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Expiry Date</span>
                      <input type="date" value={itemForm.expiry_date} onChange={(event) => setItemForm((current) => ({ ...current, expiry_date: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Wholesale Unit</span>
                      <input value={itemForm.wholesale_pricing_unit} onChange={(event) => setItemForm((current) => ({ ...current, wholesale_pricing_unit: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Retail Unit</span>
                      <input value={itemForm.retail_pricing_unit} onChange={(event) => setItemForm((current) => ({ ...current, retail_pricing_unit: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Wholesale Quantity</span>
                      <input value={itemForm.wholesale_quantity} onChange={(event) => setItemForm((current) => ({ ...current, wholesale_quantity: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Qty Per Wholesale Unit</span>
                      <input value={itemForm.quantity_per_wholesale_pricing_unit} onChange={(event) => setItemForm((current) => ({ ...current, quantity_per_wholesale_pricing_unit: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Retail Quantity</span>
                      <input value={itemForm.retail_quantity} onChange={(event) => setItemForm((current) => ({ ...current, retail_quantity: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reorder Level</span>
                      <input value={itemForm.reorder_level} onChange={(event) => setItemForm((current) => ({ ...current, reorder_level: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Wholesale Cost Price</span>
                      <input value={itemForm.wholesale_unit_cost_price} onChange={(event) => setItemForm((current) => ({ ...current, wholesale_unit_cost_price: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Unit Selling Price</span>
                      <input value={itemForm.unit_selling_price} onChange={(event) => setItemForm((current) => ({ ...current, unit_selling_price: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
                    </label>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Total Cost</p>
                      <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(currency, computedTotals.totalCost)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Total Sales</p>
                      <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(currency, computedTotals.totalSales)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Estimated Profit</p>
                      <p className="mt-2 text-sm font-bold text-slate-900">{formatMoney(currency, computedTotals.estimatedProfit)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => void savePurchaseItem()} disabled={isSavingItem} className="rounded-2xl bg-cyan-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
                      {isSavingItem ? 'Saving...' : editingItemId ? 'Update Item' : 'Add Item'}
                    </button>
                    <button type="button" onClick={resetItemForm} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Purchase Items</p>
                  <h2 className="mt-2 text-lg font-black text-slate-900">Line Item Register</h2>
                  <p className="mt-1 text-sm text-slate-600">Every item attached to this receive purchase is tracked here and can be edited before completion.</p>
                </div>
                <button type="button" onClick={() => void loadPurchaseItems(selectedPurchaseId)} disabled={!selectedPurchaseId} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">
                  Refresh Items
                </button>
              </div>

              {!selectedPurchase ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Select a purchase to load its line items.</div>
              ) : !purchaseItems.length ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No items added yet for this purchase.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3">Batch</th>
                        <th className="px-4 py-3">Quantities</th>
                        <th className="px-4 py-3">Pricing</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {purchaseItems.map((row) => (
                        <tr key={row.id} className="align-top">
                          <td className="px-4 py-4">
                            <p className="font-semibold text-slate-900">{row.item?.name || 'Unknown item'}</p>
                            <p className="mt-1 text-xs text-slate-500">{row.item?.item_code || 'No code'}</p>
                            <p className="mt-1 text-xs text-slate-500">Expiry: {row.expiry_date || 'N/A'}</p>
                          </td>
                          <td className="px-4 py-4 text-slate-600">{row.batch_number || 'N/A'}</td>
                          <td className="px-4 py-4 text-slate-600">
                            <p>Wholesale: {row.wholesale_quantity || 0}</p>
                            <p>Retail: {row.retail_quantity || 0}</p>
                            <p>Reorder: {row.reorder_level || 0}</p>
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            <p>Cost: {formatMoney(currency, row.total_cost_price)}</p>
                            <p>Sales: {formatMoney(currency, row.total_selling_price)}</p>
                            <p>Profit: {formatMoney(currency, row.estimated_profit)}</p>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              <button type="button" onClick={() => loadItemIntoForm(row)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                                Edit
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
