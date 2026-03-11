import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type LookupOption = {
  id: string;
  name: string;
  parent_category_id?: string;
  label?: string;
  quantity?: string;
};

type InventoryOptionsResponse = {
  filters: {
    categories: LookupOption[];
    sub_categories: LookupOption[];
    item_types: LookupOption[];
    suppliers: LookupOption[];
    manufacturers: LookupOption[];
    dosage_forms: LookupOption[];
    drug_classes: LookupOption[];
    storage_conditions: LookupOption[];
    stock_types: string[];
  };
};

type AddMode = 'general' | 'blood_bank' | 'consumables';

type FormState = {
  name: string;
  brand_name: string;
  item_code: string;
  item_category_id: string;
  item_sub_category_id: string;
  item_type_id: string;
  manufacturer_id: string;
  supplier_id: string;
  stock_type: string;
  cup: string;
  price: string;
  quantity: string;
  unit_quantity: string;
  reorder_level: string;
  description: string;
  dosage_form_id: string;
  allergies: string;
  gender_category: string;
  age_category: string;
  drug_class_id: string;
  storage_condition_id: string;
  modifiers_text: string;
  indicators_text: string;
  compatibility_tests: string;
};

const modeConfig: Record<AddMode, { title: string; description: string; categoryLabel: string; accent: string; panel: string }> = {
  general: {
    title: 'Add Item',
    description: 'General inventory item creation.',
    categoryLabel: '',
    accent: 'text-cyan-700',
    panel: 'border-cyan-200 bg-cyan-50/80',
  },
  blood_bank: {
    title: 'Add Blood Item',
    description: 'Matches the legacy `inventory/add_blood_item` workflow.',
    categoryLabel: 'Transfusions',
    accent: 'text-rose-700',
    panel: 'border-rose-200 bg-rose-50/80',
  },
  consumables: {
    title: 'Add Consumables',
    description: 'Matches the legacy `inventory/add_consumables` workflow.',
    categoryLabel: 'Consumables',
    accent: 'text-emerald-700',
    panel: 'border-emerald-200 bg-emerald-50/80',
  },
};

const defaultForm = (): FormState => ({
  name: '',
  brand_name: '',
  item_code: '',
  item_category_id: '',
  item_sub_category_id: '',
  item_type_id: '',
  manufacturer_id: '',
  supplier_id: '',
  stock_type: 'Stock',
  cup: '',
  price: '',
  quantity: '0',
  unit_quantity: '0',
  reorder_level: '0',
  description: '',
  dosage_form_id: '',
  allergies: '',
  gender_category: 'All',
  age_category: 'All',
  drug_class_id: '',
  storage_condition_id: '',
  modifiers_text: '',
  indicators_text: '',
  compatibility_tests: '',
});

const resolveModeFromPath = (pathname: string): AddMode => {
  if (pathname.endsWith('/Inventory/add_blood_item')) return 'blood_bank';
  if (pathname.endsWith('/Inventory/add_consumables')) return 'consumables';
  return 'general';
};

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
      <div className="mb-4">
        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

const toSelectOptions = (
  rows: LookupOption[],
  opts?: { includeQuantity?: boolean; includeLabel?: boolean },
): { value: string; label: string; keywords?: string }[] =>
  rows.map((row) => {
    const baseLabel = row.name || row.id;
    const label =
      opts?.includeQuantity && row.quantity
        ? `${baseLabel} (${row.quantity})`
        : baseLabel;
    const keywords = [
      row.name || '',
      row.label || '',
      row.quantity || '',
      row.parent_category_id || '',
    ]
      .join(' ')
      .trim();
    return {
      value: row.id,
      label,
      keywords: opts?.includeLabel ? keywords : row.name || '',
    };
  });

export default function InventoryAddItem() {
  const location = useLocation();
  const [mode, setMode] = useState<AddMode>(() => resolveModeFromPath(location.pathname));
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filters, setFilters] = useState<InventoryOptionsResponse['filters']>({
    categories: [],
    sub_categories: [],
    item_types: [],
    suppliers: [],
    manufacturers: [],
    dosage_forms: [],
    drug_classes: [],
    storage_conditions: [],
    stock_types: [],
  });
  const [form, setForm] = useState<FormState>(defaultForm());

  useEffect(() => {
    setMode(resolveModeFromPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('limit', '1');
        if (modeConfig[mode].categoryLabel) params.set('category_label', modeConfig[mode].categoryLabel);
        const data = await api.get<InventoryOptionsResponse>(`/legacy/inventory/items/?${params.toString()}`);
        setFilters({
          categories: Array.isArray(data?.filters?.categories) ? data.filters.categories : [],
          sub_categories: Array.isArray(data?.filters?.sub_categories) ? data.filters.sub_categories : [],
          item_types: Array.isArray(data?.filters?.item_types) ? data.filters.item_types : [],
          suppliers: Array.isArray(data?.filters?.suppliers) ? data.filters.suppliers : [],
          manufacturers: Array.isArray(data?.filters?.manufacturers) ? data.filters.manufacturers : [],
          dosage_forms: Array.isArray(data?.filters?.dosage_forms) ? data.filters.dosage_forms : [],
          drug_classes: Array.isArray(data?.filters?.drug_classes) ? data.filters.drug_classes : [],
          storage_conditions: Array.isArray(data?.filters?.storage_conditions) ? data.filters.storage_conditions : [],
          stock_types: Array.isArray(data?.filters?.stock_types) ? data.filters.stock_types : [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load item options.');
      } finally {
        setIsLoading(false);
      }
    };
    void loadOptions();
  }, [mode]);

  const availableCategories = useMemo(() => {
    const label = modeConfig[mode].categoryLabel;
    if (!label) return filters.categories;
    return filters.categories.filter((row) => row.label === label);
  }, [filters.categories, mode]);

  const forcedCategoryId = availableCategories.length === 1 ? availableCategories[0].id : '';

  const availableSubCategories = useMemo(() => {
    const selectedCategoryId = form.item_category_id || forcedCategoryId;
    if (!selectedCategoryId) return filters.sub_categories;
    return filters.sub_categories.filter(
      (row) => !row.parent_category_id || row.parent_category_id === selectedCategoryId,
    );
  }, [filters.sub_categories, form.item_category_id, forcedCategoryId]);

  useEffect(() => {
    const next = defaultForm();
    next.item_category_id = forcedCategoryId;
    setForm(next);
    setError(null);
    setSuccess(null);
  }, [mode, forcedCategoryId]);

  const resetForm = () => {
    const next = defaultForm();
    next.item_category_id = forcedCategoryId;
    setForm(next);
    setError(null);
    setSuccess(null);
  };

  const selectedSubCategory = useMemo(
    () => filters.sub_categories.find((row) => row.id === form.item_sub_category_id) || null,
    [filters.sub_categories, form.item_sub_category_id],
  );

  const saveItem = async () => {
    if (!form.name.trim()) {
      setError(mode === 'blood_bank' ? 'Full Name is required.' : 'Name is required.');
      setSuccess(null);
      return;
    }

    const effectiveCategoryId =
      mode === 'consumables'
        ? form.item_category_id || selectedSubCategory?.parent_category_id || forcedCategoryId
        : form.item_category_id || forcedCategoryId;

    if (!effectiveCategoryId) {
      setError('Category is required.');
      setSuccess(null);
      return;
    }

    if (mode === 'consumables' && !form.item_sub_category_id) {
      setError('Sub Category is required.');
      setSuccess(null);
      return;
    }

    if (!form.item_type_id) {
      setError('Item form / unit of pricing is required.');
      setSuccess(null);
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: Record<string, unknown> = {
        name: form.name.trim(),
        full_name: form.name.trim(),
        brand_name: form.brand_name.trim() || null,
        item_code: form.item_code.trim() || null,
        item_category_id: effectiveCategoryId || null,
        item_sub_category_id: form.item_sub_category_id || null,
        item_type_id: form.item_type_id || null,
        manufacturer_id: form.manufacturer_id || null,
        supplier_id: form.supplier_id || null,
        stock_type: form.stock_type || null,
        cup: form.cup.trim() || null,
        price: form.price || 0,
        quantity: mode === 'blood_bank' ? 0 : form.quantity || 0,
        unit_quantity: mode === 'blood_bank' ? form.unit_quantity || 0 : null,
        reorder_level: mode === 'consumables' ? 0 : form.reorder_level || 0,
        description: form.description.trim() || null,
      };

      if (mode === 'blood_bank') {
        payload.modifiers = form.modifiers_text.trim() || null;
        payload.indicators = form.indicators_text.trim() || null;
        payload.lab_tests = form.compatibility_tests.trim() || null;
        payload.dosage_form_id = form.dosage_form_id || null;
        payload.allergies = form.allergies.trim() || null;
        payload.gender_category = form.gender_category || null;
        payload.age_category = form.age_category || null;
      }

      if (mode === 'consumables') {
        payload.drug_class_id = form.drug_class_id || null;
        payload.storage_condition_id = form.storage_condition_id || null;
      }

      await api.post('/legacy/inventory/additem/', payload);
      setSuccess(`${modeConfig[mode].title} saved.`);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save item.');
    } finally {
      setIsSaving(false);
    }
  };

  const showMedicineMeta = mode === 'consumables' && ['2', '3', '5', '6'].includes(form.item_sub_category_id);
  const selectedCategoryLabel = availableCategories.find((row) => row.id === (form.item_category_id || forcedCategoryId))?.name;
  const selectedItemType = filters.item_types.find((row) => row.id === form.item_type_id) || null;
  const selectedManufacturer = filters.manufacturers.find((row) => row.id === form.manufacturer_id) || null;
  const selectedSupplier = filters.suppliers.find((row) => row.id === form.supplier_id) || null;

  const visibleFieldCount = useMemo(() => {
    if (mode === 'blood_bank') return 12;
    if (mode === 'consumables') return showMedicineMeta ? 8 : 6;
    return 10;
  }, [mode, showMedicineMeta]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(241,250,255,0.76))] p-6 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Inventory Workspace</p>
            <div>
              <h1 className="text-3xl font-black tracking-[-0.03em] text-slate-900">{modeConfig[mode].title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">{modeConfig[mode].description}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {(['general', 'blood_bank', 'consumables'] as AddMode[]).map((option) => {
              const active = option === mode;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  className={`rounded-3xl border px-4 py-3 text-left transition ${
                    active
                      ? `${modeConfig[option].panel} shadow-[0_12px_28px_rgba(15,23,42,0.08)]`
                      : 'border-slate-200 bg-white/85 hover:border-slate-300'
                  }`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${active ? modeConfig[option].accent : 'text-slate-400'}`}>
                    {option === 'general' ? 'General' : option === 'blood_bank' ? 'Blood Bank' : 'Consumables'}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{modeConfig[option].title}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{success}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <SectionCard
            title="Identity"
            subtitle={mode === 'blood_bank' ? 'Core naming and category details for the blood product.' : 'Start with the item identity and classification.'}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{mode === 'blood_bank' ? 'Full Name' : 'Name'}</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder={mode === 'blood_bank' ? 'Full product name' : 'Item name'}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />
              </label>

              {mode === 'general' ? (
                <>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Category</span>
                    <SearchableSelect
                      value={form.item_category_id}
                      onChange={(value) => setForm((current) => ({ ...current, item_category_id: value, item_sub_category_id: '' }))}
                      options={toSelectOptions(availableCategories, { includeLabel: true })}
                      placeholder={isLoading ? 'Loading categories...' : 'Select Category'}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sub Category</span>
                    <SearchableSelect
                      value={form.item_sub_category_id}
                      onChange={(value) => setForm((current) => ({ ...current, item_sub_category_id: value }))}
                      options={toSelectOptions(availableSubCategories, { includeLabel: true })}
                      placeholder="Select Sub Category"
                      disabled={isLoading}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Code</span>
                    <input
                      value={form.item_code}
                      onChange={(event) => setForm((current) => ({ ...current, item_code: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Brand Name</span>
                    <input
                      value={form.brand_name}
                      onChange={(event) => setForm((current) => ({ ...current, brand_name: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                </>
              ) : null}

              {mode === 'blood_bank' ? (
                <>
                  <div className={`rounded-2xl border px-4 py-3 md:col-span-2 ${modeConfig[mode].panel}`}>
                    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${modeConfig[mode].accent}`}>Category</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{selectedCategoryLabel || 'Transfusion'}</p>
                  </div>
                  <label className="block space-y-1 md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Code</span>
                    <input
                      value={form.item_code}
                      onChange={(event) => setForm((current) => ({ ...current, item_code: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                    />
                  </label>
                </>
              ) : null}

              {mode === 'consumables' ? (
                <>
                  <div className={`rounded-2xl border px-4 py-3 md:col-span-2 ${modeConfig[mode].panel}`}>
                    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${modeConfig[mode].accent}`}>Category</p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{selectedCategoryLabel || 'Consumables'}</p>
                  </div>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sub Category</span>
                    <SearchableSelect
                      value={form.item_sub_category_id}
                      onChange={(value) => setForm((current) => ({ ...current, item_sub_category_id: value }))}
                      options={toSelectOptions(availableSubCategories, { includeLabel: true })}
                      placeholder={isLoading ? 'Loading subcategories...' : 'Select Sub Category'}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Brand</span>
                    <input
                      value={form.brand_name}
                      onChange={(event) => setForm((current) => ({ ...current, brand_name: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                  </label>
                </>
              ) : null}
            </div>
          </SectionCard>

          <SectionCard title="Pricing And Unit" subtitle="These fields determine how the item is represented operationally.">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{mode === 'blood_bank' ? 'Item Form (Unit of Pricing)' : 'Unit of Pricing'}</span>
                <SearchableSelect
                  value={form.item_type_id}
                  onChange={(value) => setForm((current) => ({ ...current, item_type_id: value }))}
                  options={toSelectOptions(filters.item_types, { includeQuantity: true, includeLabel: true })}
                  placeholder={isLoading ? 'Loading item forms...' : 'Select Form'}
                  disabled={isLoading}
                  className="w-full"
                />
              </label>

              {mode === 'general' ? (
                <>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Administer Per Dose</span>
                    <input
                      value={form.cup}
                      onChange={(event) => setForm((current) => ({ ...current, cup: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Opening Quantity</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.quantity}
                      onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Reorder Level</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.reorder_level}
                      onChange={(event) => setForm((current) => ({ ...current, reorder_level: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                </>
              ) : null}

              {mode === 'blood_bank' ? (
                <>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Unit Quantity</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.unit_quantity}
                      onChange={(event) => setForm((current) => ({ ...current, unit_quantity: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Reorder Level</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.reorder_level}
                      onChange={(event) => setForm((current) => ({ ...current, reorder_level: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                    />
                  </label>
                </>
              ) : null}

              {mode === 'consumables' && showMedicineMeta ? (
                <>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Drug Class</span>
                    <SearchableSelect
                      value={form.drug_class_id}
                      onChange={(value) => setForm((current) => ({ ...current, drug_class_id: value }))}
                      options={toSelectOptions(filters.drug_classes)}
                      placeholder="Select Drug Class"
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Storage Condition</span>
                    <SearchableSelect
                      value={form.storage_condition_id}
                      onChange={(value) => setForm((current) => ({ ...current, storage_condition_id: value }))}
                      options={toSelectOptions(filters.storage_conditions)}
                      placeholder="Select Storage Condition"
                      className="w-full"
                    />
                  </label>
                </>
              ) : null}
            </div>
          </SectionCard>

          <SectionCard
            title={mode === 'blood_bank' ? 'Clinical Attributes' : 'Operational Details'}
            subtitle={mode === 'blood_bank' ? 'Blood product routing and compatibility details.' : 'Supplier, manufacturer, and stock behavior.'}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {mode === 'general' ? (
                <>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Manufacturer</span>
                    <SearchableSelect
                      value={form.manufacturer_id}
                      onChange={(value) => setForm((current) => ({ ...current, manufacturer_id: value }))}
                      options={toSelectOptions(filters.manufacturers)}
                      placeholder="Select Manufacturer"
                      disabled={isLoading}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Supplier</span>
                    <SearchableSelect
                      value={form.supplier_id}
                      onChange={(value) => setForm((current) => ({ ...current, supplier_id: value }))}
                      options={toSelectOptions(filters.suppliers)}
                      placeholder="Select Supplier"
                      disabled={isLoading}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1 md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stock Type</span>
                    <SearchableSelect
                      value={form.stock_type}
                      onChange={(value) => setForm((current) => ({ ...current, stock_type: value }))}
                      options={[
                        { value: 'Stock', label: 'Stock' },
                        { value: 'Non Stock', label: 'Non Stock' },
                      ]}
                      placeholder="Select Stock Type"
                      className="w-full"
                    />
                  </label>
                </>
              ) : null}

              {mode === 'blood_bank' ? (
                <>
                  <label className="block space-y-1 md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Donor Source</span>
                    <SearchableSelect
                      value={form.supplier_id}
                      onChange={(value) => setForm((current) => ({ ...current, supplier_id: value }))}
                      options={toSelectOptions(filters.suppliers)}
                      placeholder="Select Donor Source"
                      disabled={isLoading}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Administration Route</span>
                    <SearchableSelect
                      value={form.dosage_form_id}
                      onChange={(value) => setForm((current) => ({ ...current, dosage_form_id: value }))}
                      options={toSelectOptions(filters.dosage_forms)}
                      placeholder="Select ROA"
                      disabled={isLoading}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stock Type</span>
                    <SearchableSelect
                      value={form.stock_type}
                      onChange={(value) => setForm((current) => ({ ...current, stock_type: value }))}
                      options={[
                        { value: 'Stock', label: 'Stock' },
                        { value: 'Non Stock', label: 'Non Stock' },
                      ]}
                      placeholder="Select Stock Type"
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1 md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Allergic Components</span>
                    <textarea
                      value={form.allergies}
                      onChange={(event) => setForm((current) => ({ ...current, allergies: event.target.value }))}
                      rows={2}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Gender Category</span>
                    <SearchableSelect
                      value={form.gender_category}
                      onChange={(value) => setForm((current) => ({ ...current, gender_category: value }))}
                      options={[
                        { value: 'All', label: 'All' },
                        { value: 'Males', label: 'Males' },
                        { value: 'Females', label: 'Females' },
                      ]}
                      placeholder="Select Gender Category"
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Age Category</span>
                    <SearchableSelect
                      value={form.age_category}
                      onChange={(value) => setForm((current) => ({ ...current, age_category: value }))}
                      options={[
                        { value: 'All', label: 'All' },
                        { value: 'Infants', label: 'Infants' },
                        { value: 'Infant Child', label: 'Infant Child' },
                        { value: 'Adult', label: 'Adult' },
                      ]}
                      placeholder="Select Age Category"
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Modifiers</span>
                    <textarea
                      value={form.modifiers_text}
                      onChange={(event) => setForm((current) => ({ ...current, modifiers_text: event.target.value }))}
                      rows={3}
                      placeholder="One entry per line"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Indicators</span>
                    <textarea
                      value={form.indicators_text}
                      onChange={(event) => setForm((current) => ({ ...current, indicators_text: event.target.value }))}
                      rows={3}
                      placeholder="One entry per line"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                    />
                  </label>
                  <label className="block space-y-1 md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Compatibility Tests</span>
                    <textarea
                      value={form.compatibility_tests}
                      onChange={(event) => setForm((current) => ({ ...current, compatibility_tests: event.target.value }))}
                      rows={2}
                      placeholder="Enter compatibility test names"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                    />
                  </label>
                </>
              ) : null}

              {mode === 'consumables' ? (
                <label className="block space-y-1 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Manufacturer</span>
                  <SearchableSelect
                    value={form.manufacturer_id}
                    onChange={(value) => setForm((current) => ({ ...current, manufacturer_id: value }))}
                    options={toSelectOptions(filters.manufacturers)}
                    placeholder="Select Manufacturer"
                    disabled={isLoading}
                    className="w-full"
                  />
                </label>
              ) : null}

              <label className="block space-y-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Description</span>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />
              </label>
            </div>
          </SectionCard>

          <div className="flex items-center gap-3 pb-2">
            <button
              type="button"
              onClick={() => void saveItem()}
              disabled={isSaving || isLoading}
              className="rounded-2xl bg-cyan-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(8,145,178,0.24)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save Item'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Reset Form
            </button>
          </div>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Current Mode</p>
            <div className={`mt-3 rounded-2xl border px-4 py-4 ${modeConfig[mode].panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${modeConfig[mode].accent}`}>{modeConfig[mode].title}</p>
              <p className="mt-2 text-sm text-slate-700">{modeConfig[mode].description}</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Visible Fields</p>
                <p className="mt-2 text-lg font-black text-slate-900">{visibleFieldCount}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Form Status</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{isSaving ? 'Saving in progress' : isLoading ? 'Loading options' : 'Ready to submit'}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Live Summary</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Item Name</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{form.name.trim() || 'Not set'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Category</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{selectedCategoryLabel || 'Not set'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Unit / Pricing</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selectedItemType ? `${selectedItemType.name}${selectedItemType.quantity ? ` (${selectedItemType.quantity})` : ''}` : 'Not set'}
                </p>
              </div>
              {mode === 'general' ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Commercial Snapshot</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{form.price || '0.00'} price • {form.quantity || '0'} opening qty</p>
                  <p className="mt-1 text-xs text-slate-500">{form.stock_type || 'Stock'} • {form.reorder_level || '0'} reorder</p>
                </div>
              ) : null}
              {mode === 'blood_bank' ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Blood Product Snapshot</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{form.unit_quantity || '0'} units • {form.stock_type || 'Not set'}</p>
                  <p className="mt-1 text-xs text-slate-500">{form.age_category || 'All'} • {form.gender_category || 'All'}</p>
                </div>
              ) : null}
              {mode === 'consumables' ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Consumable Snapshot</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{selectedSubCategory?.name || 'Subcategory not set'}</p>
                  <p className="mt-1 text-xs text-slate-500">{selectedManufacturer?.name || 'Manufacturer not set'}</p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Selected Links</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                <p className="font-semibold text-slate-900">Manufacturer</p>
                <p className="mt-1">{selectedManufacturer?.name || 'None selected'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                <p className="font-semibold text-slate-900">Supplier</p>
                <p className="mt-1">{selectedSupplier?.name || 'None selected'}</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
