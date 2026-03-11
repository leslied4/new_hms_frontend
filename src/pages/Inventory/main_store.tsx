import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type LookupOption = {
  id: string;
  name: string;
};

type ItemSuggestion = {
  id: string;
  full_name?: string | null;
  name?: string | null;
  brand_name?: string | null;
  item_code?: string | null;
  item_type?: LookupOption | null;
};

type StockRow = {
  id: string;
  batch_number?: string | null;
  date_added?: string | null;
  quantity?: string | number | null;
  quantity_left?: string | number | null;
  unit_selling_price?: string | number | null;
  supplier?: LookupOption | null;
  is_expired?: boolean;
  item?: {
    id: string;
    name?: string | null;
    item_code?: string | null;
    reorder_level?: string | number | null;
    category?: LookupOption | null;
    item_type?: LookupOption | null;
  } | null;
  computed?: {
    total_cost_price?: number;
    total_selling_price?: number;
    expected_profit?: number;
  } | null;
};

type MainStoreResponse = {
  results: StockRow[];
  page: number;
  limit: number;
  total: number;
  summary: {
    total_count: number;
    total_cost_price: number;
    expected_total_sales: number;
    expected_profit: number;
    profit_margin: number;
    low_stock_alert: number;
    avg_item_value: number;
    last_updated?: string | null;
  };
  filters: {
    categories: LookupOption[];
    suppliers: LookupOption[];
    specialties: LookupOption[];
  };
};

type InventoryItemsResponse = {
  results: ItemSuggestion[];
};

const asNumber = (value: unknown): number => {
  const parsed = Number(String(value ?? '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoney = (value: unknown): string => {
  const amount = asNumber(value);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDateTime = (value: string | null | undefined): string => {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
};
const toSelectOptions = (rows: LookupOption[] = []) =>
  rows.map((row) => ({ value: String(row.id), label: row.name || String(row.id) }));

export default function InventoryMainStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAddStock, setShowAddStock] = useState(false);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockLevelFilter, setStockLevelFilter] = useState('');
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);

  const [itemSearch, setItemSearch] = useState('');
  const [debouncedItemSearch, setDebouncedItemSearch] = useState('');
  const [itemSuggestions, setItemSuggestions] = useState<ItemSuggestion[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemSuggestion | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [response, setResponse] = useState<MainStoreResponse>({
    results: [],
    page: 1,
    limit: 25,
    total: 0,
    summary: {
      total_count: 0,
      total_cost_price: 0,
      expected_total_sales: 0,
      expected_profit: 0,
      profit_margin: 0,
      low_stock_alert: 0,
      avg_item_value: 0,
      last_updated: null,
    },
    filters: {
      categories: [],
      suppliers: [],
      specialties: [],
    },
  });

  const [form, setForm] = useState({
    item_id: '',
    batch_number: '',
    quantity: '',
    unit_cost_price: '',
    discount: '0',
    unit_selling_price: '',
    supplier_id: '',
    least_quant: '',
    max_quant: '',
    least_dosage: '',
    expiry_date: '',
    specialty_id: '0',
    order_store: '0',
    copay: false,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedItemSearch(itemSearch.trim());
    }, 250);
    return () => window.clearTimeout(timer);
  }, [itemSearch]);

  useEffect(() => {
    const loadMainStore = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(pageSize));
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (categoryFilter) params.set('category_id', categoryFilter);
        if (stockLevelFilter) params.set('stock_level', stockLevelFilter);
        const data = await api.get<MainStoreResponse>(`/legacy/inventory/mainstore/?${params.toString()}`);
        setResponse({
          results: Array.isArray(data?.results) ? data.results : [],
          page: Number(data?.page || 1),
          limit: Number(data?.limit || pageSize),
          total: Number(data?.total || 0),
          summary: {
            total_count: Number(data?.summary?.total_count || 0),
            total_cost_price: Number(data?.summary?.total_cost_price || 0),
            expected_total_sales: Number(data?.summary?.expected_total_sales || 0),
            expected_profit: Number(data?.summary?.expected_profit || 0),
            profit_margin: Number(data?.summary?.profit_margin || 0),
            low_stock_alert: Number(data?.summary?.low_stock_alert || 0),
            avg_item_value: Number(data?.summary?.avg_item_value || 0),
            last_updated: data?.summary?.last_updated || null,
          },
          filters: {
            categories: Array.isArray(data?.filters?.categories) ? data.filters.categories : [],
            suppliers: Array.isArray(data?.filters?.suppliers) ? data.filters.suppliers : [],
            specialties: Array.isArray(data?.filters?.specialties) ? data.filters.specialties : [],
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load central store data.');
      } finally {
        setIsLoading(false);
      }
    };
    void loadMainStore();
  }, [categoryFilter, debouncedSearch, page, pageSize, stockLevelFilter]);

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

  const totalPages = useMemo(() => {
    const size = response.limit || pageSize || 1;
    return Math.max(1, Math.ceil(response.total / size));
  }, [pageSize, response.limit, response.total]);

  const totalCostPrice = useMemo(() => {
    const quantity = asNumber(form.quantity);
    const unitCost = asNumber(form.unit_cost_price);
    return quantity * unitCost;
  }, [form.quantity, form.unit_cost_price]);

  const newTotalCostPrice = useMemo(() => {
    const discount = asNumber(form.discount);
    if (discount <= 0) return totalCostPrice;
    return totalCostPrice - totalCostPrice * (Math.min(discount, 100) / 100);
  }, [form.discount, totalCostPrice]);

  const totalSellingPrice = useMemo(() => {
    const quantity = asNumber(form.quantity);
    const unitSelling = asNumber(form.unit_selling_price);
    return quantity * unitSelling;
  }, [form.quantity, form.unit_selling_price]);

  const resetForm = () => {
    setSelectedItem(null);
    setItemSearch('');
    setDebouncedItemSearch('');
    setItemSuggestions([]);
    setShowSuggestions(false);
    setForm({
      item_id: '',
      batch_number: '',
      quantity: '',
      unit_cost_price: '',
      discount: '0',
      unit_selling_price: '',
      supplier_id: '',
      least_quant: '',
      max_quant: '',
      least_dosage: '',
      expiry_date: '',
      specialty_id: '0',
      order_store: '0',
      copay: false,
    });
  };

  const saveStock = async () => {
    if (!form.item_id) {
      setError('Item is required.');
      setSuccess(null);
      return;
    }
    if (!form.batch_number.trim()) {
      setError('Batch Number is required.');
      setSuccess(null);
      return;
    }
    if (asNumber(form.quantity) <= 0) {
      setError('Quantity must be greater than zero.');
      setSuccess(null);
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/inventory/additemstore/', {
        item_id: form.item_id,
        batch_number: form.batch_number.trim(),
        quantity: asNumber(form.quantity),
        unit_cost_price: asNumber(form.unit_cost_price),
        discount: asNumber(form.discount),
        unit_selling_price: asNumber(form.unit_selling_price),
        supplier_id: form.supplier_id || null,
        least_quant: form.least_quant ? asNumber(form.least_quant) : null,
        max_quant: form.max_quant ? asNumber(form.max_quant) : null,
        least_dosage: form.least_dosage.trim() || null,
        expiry_date: form.expiry_date || null,
        specialty_id: form.specialty_id && form.specialty_id !== '0' ? [form.specialty_id] : [],
        order_store: form.order_store && form.order_store !== '0' ? [form.order_store] : [],
        copay: form.copay,
      });
      setSuccess('Stock has been saved.');
      setShowAddStock(false);
      resetForm();
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(pageSize));
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (categoryFilter) params.set('category_id', categoryFilter);
      if (stockLevelFilter) params.set('stock_level', stockLevelFilter);
      const data = await api.get<MainStoreResponse>(`/legacy/inventory/mainstore/?${params.toString()}`);
      setResponse({
        results: Array.isArray(data?.results) ? data.results : [],
        page: Number(data?.page || 1),
        limit: Number(data?.limit || pageSize),
        total: Number(data?.total || 0),
        summary: {
          total_count: Number(data?.summary?.total_count || 0),
          total_cost_price: Number(data?.summary?.total_cost_price || 0),
          expected_total_sales: Number(data?.summary?.expected_total_sales || 0),
          expected_profit: Number(data?.summary?.expected_profit || 0),
          profit_margin: Number(data?.summary?.profit_margin || 0),
          low_stock_alert: Number(data?.summary?.low_stock_alert || 0),
          avg_item_value: Number(data?.summary?.avg_item_value || 0),
          last_updated: data?.summary?.last_updated || null,
        },
        filters: {
          categories: Array.isArray(data?.filters?.categories) ? data.filters.categories : [],
          suppliers: Array.isArray(data?.filters?.suppliers) ? data.filters.suppliers : [],
          specialties: Array.isArray(data?.filters?.specialties) ? data.filters.specialties : [],
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save stock.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(244,253,255,0.72))] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-600">Inventory</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.02em] text-slate-900">Central Store</h1>
            <p className="mt-2 text-sm text-slate-600">Add stock, review current stock, and monitor central store value in one workspace.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setSuccess(null);
                setShowAddStock(true);
              }}
              className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              Add New Stock
            </button>
            <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Last Updated</p>
              <p className="text-sm font-semibold text-slate-700">{formatDateTime(response.summary.last_updated || null)}</p>
            </div>
          </div>
        </div>
      </section>

      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200/80 bg-[linear-gradient(135deg,#2b5876,#4e4376)] p-5 text-white shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Number of Stocks</p>
          <p className="mt-3 text-3xl font-black">{response.summary.total_count}</p>
          <p className="mt-2 text-sm text-white/75">Total active stock rows</p>
        </div>
        <div className="rounded-3xl border border-sky-200/70 bg-[radial-gradient(circle_at_top_left,#16d9e3_0%,#30c7ec_45%,#46aef7_100%)] p-5 text-white shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Cost of Stock</p>
          <p className="mt-3 text-3xl font-black">GH₵ {formatMoney(response.summary.total_cost_price)}</p>
          <p className="mt-2 text-sm text-white/75">Total investment value</p>
        </div>
        <div className="rounded-3xl border border-slate-300/70 bg-[linear-gradient(135deg,#434343,#1a1a1a)] p-5 text-white shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Expected Sales</p>
          <p className="mt-3 text-3xl font-black">GH₵ {formatMoney(response.summary.expected_total_sales)}</p>
          <p className="mt-2 text-sm text-white/75">Potential revenue</p>
        </div>
        <div className="rounded-3xl border border-emerald-200/70 bg-[linear-gradient(135deg,#0ba360,#3cba92)] p-5 text-white shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Projected Profit</p>
          <p className="mt-3 text-3xl font-black">GH₵ {formatMoney(response.summary.expected_profit)}</p>
          <p className="mt-2 text-sm text-white/75">Margin {response.summary.profit_margin.toFixed(2)}%</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p className="font-semibold">Low Stock Alert</p>
          <p className="mt-1">{response.summary.low_stock_alert} item(s) need reordering</p>
        </div>
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          <p className="font-semibold">Average Item Value</p>
          <p className="mt-1">GH₵ {formatMoney(response.summary.avg_item_value)}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <p className="font-semibold">Current Stock Analysis</p>
          <p className="mt-1">This overview updates above the table based on the current filters.</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-1 xl:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Search</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search item, code, batch" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Category</span>
            <SearchableSelect
              value={categoryFilter}
              onChange={(value) => { setCategoryFilter(value); setPage(1); }}
              options={toSelectOptions(response.filters.categories)}
              placeholder="All Categories"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stock Level</span>
            <SearchableSelect
              value={stockLevelFilter}
              onChange={(value) => { setStockLevelFilter(value); setPage(1); }}
              options={[
                { value: 'critical', label: 'Critical (0-5)' },
                { value: 'low', label: 'Low (6-10)' },
                { value: 'medium', label: 'Medium (11-50)' },
                { value: 'high', label: 'High (50+)' },
              ]}
              placeholder="All Levels"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Page Size</span>
            <SearchableSelect
              value={String(pageSize)}
              onChange={(value) => { setPageSize(Number(value || 25)); setPage(1); }}
              options={[25, 50, 100].map((size) => ({ value: String(size), label: String(size) }))}
            />
          </label>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Current Stock</p>
            <p className="text-sm text-slate-600">The stock analysis is summarized above. This table focuses on the filtered inventory rows.</p>
          </div>
          <div className="text-sm font-semibold text-slate-700">Showing {response.results.length} of {response.total}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50/90 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-5 py-3">Date Added</th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Unit/Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Batch No</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Remaining</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-slate-500">Loading central store...</td></tr>
              ) : null}
              {!isLoading && !response.results.length ? (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-slate-500">No stock rows matched the current filters.</td></tr>
              ) : null}
              {!isLoading && response.results.map((row) => {
                const lowStock = asNumber(row.quantity_left) <= Math.max(10, asNumber(row.item?.reorder_level));
                return (
                  <tr key={row.id} className={row.is_expired ? 'bg-rose-50/60' : lowStock ? 'bg-amber-50/40' : 'bg-white'}>
                    <td className="px-5 py-4 text-slate-600">{formatDateTime(row.date_added || null)}</td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{row.item?.name || 'Unknown Item'}</p>
                        {row.item?.item_code ? <p className="mt-1 text-xs text-slate-500">Code: {row.item.item_code}</p> : null}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{row.item?.item_type?.name || 'N/A'}</td>
                    <td className="px-4 py-4 text-slate-600">{row.item?.category?.name || 'Unassigned'}</td>
                    <td className="px-4 py-4 text-slate-600">{row.batch_number || 'N/A'}</td>
                    <td className="px-4 py-4 text-slate-600">GH₵ {formatMoney(row.unit_selling_price)}</td>
                    <td className="px-4 py-4 text-slate-600">{asNumber(row.quantity)}</td>
                    <td className="px-4 py-4 text-slate-600">{asNumber(row.quantity_left)}</td>
                    <td className="px-4 py-4">
                      {row.is_expired ? (
                        <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">Expired</span>
                      ) : lowStock ? (
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Low Stock</span>
                      ) : (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Healthy</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200/80 px-5 py-4 text-sm text-slate-600">
          <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-2xl border border-slate-200 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span>Page {response.page} of {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-2xl border border-slate-200 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </section>

      {showAddStock ? (
        <div className="fixed inset-0 z-[140] flex items-start justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[calc(100vh-3rem)] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-white/70 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
            <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Add Stock</p>
                <h2 className="text-2xl font-black text-slate-900">Register a new stock batch</h2>
                <p className="mt-1 text-sm text-slate-600">Capture a batch without pushing the stock table down the page.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddStock(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Item</span>
                    <input
                      value={itemSearch}
                      onChange={(event) => {
                        setItemSearch(event.target.value);
                        setShowSuggestions(true);
                        if (!event.target.value.trim()) {
                          setSelectedItem(null);
                          setForm((current) => ({ ...current, item_id: '' }));
                        }
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Search item by name or code"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                    />
                  </label>
                  {showSuggestions && itemSuggestions.length ? (
                    <div className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
                      {itemSuggestions.map((option) => {
                        const label = option.full_name || option.name || option.id;
                        const meta = [option.brand_name, option.item_code, option.item_type?.name].filter(Boolean).join(' • ');
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              setSelectedItem(option);
                              setItemSearch(label);
                              setShowSuggestions(false);
                              setForm((current) => ({ ...current, item_id: option.id }));
                            }}
                            className="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm last:border-b-0 hover:bg-slate-50"
                          >
                            <p className="font-semibold text-slate-800">{label}</p>
                            {meta ? <p className="mt-1 text-xs text-slate-500">{meta}</p> : null}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                {selectedItem ? (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-3 text-sm text-sky-800">
                    <p className="font-semibold">{selectedItem.full_name || selectedItem.name || selectedItem.id}</p>
                    <p className="mt-1 text-xs text-sky-700">
                      {selectedItem.item_type?.name || 'No unit type'}
                      {selectedItem.item_code ? ` • Code: ${selectedItem.item_code}` : ''}
                    </p>
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Batch Number</span>
                    <input value={form.batch_number} onChange={(event) => setForm((current) => ({ ...current, batch_number: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Supplier</span>
                    <SearchableSelect
                      value={form.supplier_id}
                      onChange={(value) => setForm((current) => ({ ...current, supplier_id: value }))}
                      options={toSelectOptions(response.filters.suppliers)}
                      placeholder="Select Supplier"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Quantity</span>
                    <input type="number" min="1" value={form.quantity} onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Unit Cost Price</span>
                    <input type="number" min="0" step="0.01" value={form.unit_cost_price} onChange={(event) => setForm((current) => ({ ...current, unit_cost_price: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Discount (%)</span>
                    <input type="number" min="0" max="100" step="0.01" value={form.discount} onChange={(event) => setForm((current) => ({ ...current, discount: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Unit Selling Price</span>
                    <input type="number" min="0" step="0.01" value={form.unit_selling_price} onChange={(event) => setForm((current) => ({ ...current, unit_selling_price: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Least Issue Qty / Unit</span>
                    <input type="number" min="0" value={form.least_quant} onChange={(event) => setForm((current) => ({ ...current, least_quant: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Max Issue Qty / Unit</span>
                    <input type="number" min="0" value={form.max_quant} onChange={(event) => setForm((current) => ({ ...current, max_quant: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Least Dosage Qty / Unit</span>
                    <input value={form.least_dosage} onChange={(event) => setForm((current) => ({ ...current, least_dosage: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Expiry Date</span>
                    <input type="date" value={form.expiry_date} onChange={(event) => setForm((current) => ({ ...current, expiry_date: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none" />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Specialty</span>
                    <SearchableSelect
                      value={form.specialty_id}
                      onChange={(value) => setForm((current) => ({ ...current, specialty_id: value || '0' }))}
                      options={toSelectOptions(response.filters.specialties)}
                      placeholder="All"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Order Store</span>
                    <SearchableSelect
                      value={form.order_store}
                      onChange={(value) => setForm((current) => ({ ...current, order_store: value || '0' }))}
                      options={toSelectOptions(response.filters.specialties)}
                      placeholder="All"
                    />
                  </label>
                </div>

                <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input type="checkbox" checked={form.copay} onChange={(event) => setForm((current) => ({ ...current, copay: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-teal-600" />
                  Enable Copay
                </label>

                <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Total Cost Price</p>
                    <p className="mt-2 text-lg font-black text-slate-900">GH₵ {formatMoney(totalCostPrice)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">New Total Cost</p>
                    <p className="mt-2 text-lg font-black text-slate-900">GH₵ {formatMoney(newTotalCostPrice)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Total Selling Price</p>
                    <p className="mt-2 text-lg font-black text-slate-900">GH₵ {formatMoney(totalSellingPrice)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => void saveStock()} disabled={isSaving || isLoading} className="rounded-2xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
                    {isSaving ? 'Saving...' : 'Submit'}
                  </button>
                  <button type="button" onClick={resetForm} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
