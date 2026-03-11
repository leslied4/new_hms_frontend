import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type LookupOption = {
  id: string;
  name: string;
  parent_category_id?: string;
  label?: string;
};

type InventoryItemRow = {
  id: string;
  full_name?: string | null;
  name?: string | null;
  item_code?: string | null;
  price?: string | number | null;
  quantity?: string | number | null;
  reorder_level?: string | number | null;
  stock_type?: string | null;
  category?: LookupOption | null;
  sub_category?: LookupOption | null;
  item_type?: LookupOption | null;
  supplier?: LookupOption | null;
  manufacturer?: LookupOption | null;
  stock_state?: 'in_stock' | 'low_stock' | 'out_of_stock' | string | null;
};

type InventoryResponse = {
  results: InventoryItemRow[];
  page: number;
  limit: number;
  total: number;
  summary: {
    total_items: number;
    in_stock: number;
    low_stock: number;
    out_of_stock: number;
  };
  filters: {
    categories: LookupOption[];
    sub_categories: LookupOption[];
    item_types: LookupOption[];
    stock_types: string[];
  };
};

const asText = (value: unknown): string => String(value ?? '').trim();

const asNumber = (value: unknown): number => {
  const parsed = Number(String(value ?? '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoney = (value: unknown): string => {
  const amount = asNumber(value);
  if (!amount) return '0.00';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const stockStateMeta = (state: string) => {
  switch (state) {
    case 'out_of_stock':
      return {
        label: 'Out Of Stock',
        pill: 'border-rose-200 bg-rose-50 text-rose-700',
        row: 'bg-rose-50/55',
      };
    case 'low_stock':
      return {
        label: 'Low Stock',
        pill: 'border-amber-200 bg-amber-50 text-amber-700',
        row: 'bg-amber-50/55',
      };
    default:
      return {
        label: 'In Stock',
        pill: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        row: 'bg-white',
      };
  }
};
const toSelectOptions = (rows: LookupOption[] = []) =>
  rows.map((row) => ({ value: asText(row.id), label: asText(row.name) || asText(row.id) }));

const summaryCardTone = (tone: 'sky' | 'emerald' | 'amber' | 'rose') => {
  switch (tone) {
    case 'emerald':
      return 'border-emerald-200/70 bg-emerald-50/80';
    case 'amber':
      return 'border-amber-200/70 bg-amber-50/80';
    case 'rose':
      return 'border-rose-200/70 bg-rose-50/80';
    default:
      return 'border-sky-200/70 bg-sky-50/80';
  }
};

export default function InventoryItems() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryLabelFilter, setCategoryLabelFilter] = useState(searchParams.get('category_label')?.trim() || '');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subCategoryFilter, setSubCategoryFilter] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);

  const [response, setResponse] = useState<InventoryResponse>({
    results: [],
    page: 1,
    limit: 25,
    total: 0,
    summary: { total_items: 0, in_stock: 0, low_stock: 0, out_of_stock: 0 },
    filters: {
      categories: [],
      sub_categories: [],
      item_types: [],
      stock_types: [],
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setCategoryLabelFilter(searchParams.get('category_label')?.trim() || '');
    setCategoryFilter('');
    setSubCategoryFilter('');
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(pageSize));
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (categoryLabelFilter) params.set('category_label', categoryLabelFilter);
        if (categoryFilter) params.set('category_id', categoryFilter);
        if (subCategoryFilter) params.set('sub_category_id', subCategoryFilter);
        if (stockStatusFilter !== 'all') params.set('stock_status', stockStatusFilter);
        const data = await api.get<InventoryResponse>(`/legacy/inventory/items/?${params.toString()}`);
        setResponse({
          results: Array.isArray(data?.results) ? data.results : [],
          page: Number(data?.page || 1),
          limit: Number(data?.limit || pageSize),
          total: Number(data?.total || 0),
          summary: {
            total_items: Number(data?.summary?.total_items || 0),
            in_stock: Number(data?.summary?.in_stock || 0),
            low_stock: Number(data?.summary?.low_stock || 0),
            out_of_stock: Number(data?.summary?.out_of_stock || 0),
          },
          filters: {
            categories: Array.isArray(data?.filters?.categories) ? data.filters.categories : [],
            sub_categories: Array.isArray(data?.filters?.sub_categories) ? data.filters.sub_categories : [],
            item_types: Array.isArray(data?.filters?.item_types) ? data.filters.item_types : [],
            stock_types: Array.isArray(data?.filters?.stock_types) ? data.filters.stock_types : [],
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load inventory items.');
      } finally {
        setIsLoading(false);
      }
    };
    void loadItems();
  }, [categoryFilter, categoryLabelFilter, debouncedSearch, page, pageSize, stockStatusFilter, subCategoryFilter]);

  const subCategoryOptions = useMemo(() => {
    if (!categoryFilter) return response.filters.sub_categories;
    return response.filters.sub_categories.filter((row) => !row.parent_category_id || row.parent_category_id === categoryFilter);
  }, [categoryFilter, response.filters.sub_categories]);

  const totalPages = useMemo(() => {
    const size = response.limit || pageSize || 1;
    return Math.max(1, Math.ceil(response.total / size));
  }, [pageSize, response.limit, response.total]);

  const visibleRange = useMemo(() => {
    if (!response.total) return '0';
    const start = (response.page - 1) * response.limit + 1;
    const end = Math.min(response.total, start + response.results.length - 1);
    return `${start}-${end}`;
  }, [response.limit, response.page, response.results.length, response.total]);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(244,253,255,0.72))] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-600">Inventory</p>
            <div>
              <h1 className="text-3xl font-black tracking-[-0.02em] text-slate-900">Items Directory</h1>
              <p className="text-sm text-slate-600">One searchable inventory workspace with filters instead of tab sprawl.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-right shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Directory Scope</p>
            <p className="text-sm font-semibold text-slate-700">
              Showing <span className="text-slate-900">{visibleRange}</span> of <span className="text-slate-900">{response.total}</span> items
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className={`rounded-3xl border p-5 shadow-sm ${summaryCardTone('sky')}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Total Items</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{response.summary.total_items}</p>
        </div>
        <div className={`rounded-3xl border p-5 shadow-sm ${summaryCardTone('emerald')}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">In Stock</p>
          <p className="mt-3 text-3xl font-black text-emerald-700">{response.summary.in_stock}</p>
        </div>
        <div className={`rounded-3xl border p-5 shadow-sm ${summaryCardTone('amber')}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Low Stock</p>
          <p className="mt-3 text-3xl font-black text-amber-700">{response.summary.low_stock}</p>
        </div>
        <div className={`rounded-3xl border p-5 shadow-sm ${summaryCardTone('rose')}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Out Of Stock</p>
          <p className="mt-3 text-3xl font-black text-rose-700">{response.summary.out_of_stock}</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_16px_35px_rgba(15,23,42,0.06)]">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1 xl:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, code, barcode, description"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Category</span>
            <SearchableSelect
              value={categoryFilter}
              onChange={(value) => {
                setCategoryFilter(value);
                setSubCategoryFilter('');
                setPage(1);
              }}
              options={toSelectOptions(response.filters.categories)}
              placeholder="All Categories"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Subcategory</span>
            <SearchableSelect
              value={subCategoryFilter}
              onChange={(value) => {
                setSubCategoryFilter(value);
                setPage(1);
              }}
              options={toSelectOptions(subCategoryOptions)}
              placeholder="All Subcategories"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stock Status</span>
            <SearchableSelect
              value={stockStatusFilter}
              onChange={(value) => {
                setStockStatusFilter(value || 'all');
                setPage(1);
              }}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'in_stock', label: 'In Stock' },
                { value: 'low_stock', label: 'Low Stock' },
                { value: 'out_of_stock', label: 'Out Of Stock' },
              ]}
            />
          </label>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Inventory Listing</p>
            <p className="text-sm text-slate-600">Filter by category, subtype, stock pressure, and item type in one table.</p>
          </div>
          <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Page Size</span>
            <SearchableSelect
              value={String(pageSize)}
              onChange={(value) => {
                setPageSize(Number(value || 25));
                setPage(1);
              }}
              options={[25, 50, 100].map((size) => ({ value: String(size), label: String(size) }))}
              className="min-w-[92px]"
            />
          </label>
        </div>

        {error ? <div className="border-b border-rose-100 bg-rose-50 px-5 py-3 text-sm text-rose-700">{error}</div> : null}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50/90 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-5 py-3">Item</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Reorder</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-slate-500">Loading inventory items...</td></tr>
              ) : null}
              {!isLoading && !response.results.length ? (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-slate-500">No items matched the current filters.</td></tr>
              ) : null}
              {!isLoading && response.results.map((row) => {
                const state = stockStateMeta(asText(row.stock_state) || 'in_stock');
                const itemLabel = asText(row.full_name) || asText(row.name) || row.id;
                const categoryLabel = asText(row.category?.name) || asText(row.sub_category?.name) || 'Unassigned';
                const typeLabel = asText(row.item_type?.name) || asText(row.stock_type) || 'N/A';
                const supplierLabel = asText(row.supplier?.name) || asText(row.manufacturer?.name) || 'N/A';
                return (
                  <tr key={row.id} className={`${state.row} transition hover:bg-slate-50`}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{itemLabel}</p>
                      <p className="text-xs text-slate-500">{asText(row.sub_category?.name) || 'No subcategory'}</p>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-700">{asText(row.item_code) || 'N/A'}</td>
                    <td className="px-4 py-4 text-slate-600">{categoryLabel}</td>
                    <td className="px-4 py-4 text-slate-600">{typeLabel}</td>
                    <td className="px-4 py-4 font-semibold text-slate-800">{asNumber(row.quantity)}</td>
                    <td className="px-4 py-4 text-slate-600">{asNumber(row.reorder_level)}</td>
                    <td className="px-4 py-4 font-semibold text-slate-800">{formatMoney(row.price)}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${state.pill}`}>{state.label}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{supplierLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200/80 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600">
            Page <span className="font-semibold text-slate-900">{response.page}</span> of <span className="font-semibold text-slate-900">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={response.page <= 1 || isLoading}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={response.page >= totalPages || isLoading}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
