import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type LookupOption = {
  id: string;
  name: string;
};

type SectionKey =
  | 'categories'
  | 'sub_categories'
  | 'manufacturers'
  | 'suppliers'
  | 'drug_classes'
  | 'drug_types'
  | 'baskets'
  | 'order_stores';

type ConfigRow = Record<string, unknown> & {
  id: string;
  name?: string;
};

type ManageResponse = {
  sections: Record<SectionKey, ConfigRow[]>;
  options: {
    categories: LookupOption[];
    baskets: LookupOption[];
    specialties: LookupOption[];
  };
  summary: Record<SectionKey, number>;
};

const SECTION_META: Record<SectionKey, { label: string; description: string; fields: string[] }> = {
  categories: {
    label: 'Item Categories',
    description: 'Top-level item classifications used across inventory.',
    fields: ['name', 'label', 'description'],
  },
  sub_categories: {
    label: 'Item Sub Categories',
    description: 'Child categories mapped to a parent inventory category.',
    fields: ['category_name', 'parent_category_id'],
  },
  manufacturers: {
    label: 'Manufacturers',
    description: 'Manufacturing sources tied to items and stock records.',
    fields: ['name', 'description'],
  },
  suppliers: {
    label: 'Suppliers',
    description: 'Procurement suppliers used in purchase receiving and stock.',
    fields: ['name', 'description'],
  },
  drug_classes: {
    label: 'Drug Classes',
    description: 'Clinical grouping for medication classification.',
    fields: ['class_name'],
  },
  drug_types: {
    label: 'Item Unit Of Pricing',
    description: 'Sell/dispense unit definitions with quantity hints.',
    fields: ['type_name', 'quantity', 'type_description'],
  },
  baskets: {
    label: 'Stores / Baskets',
    description: 'Physical or logical stores used for stocking and transfers.',
    fields: ['name', 'description'],
  },
  order_stores: {
    label: 'Order Stores',
    description: 'Clinics or specialties mapped to a parent store for ordering.',
    fields: ['name', 'stock_basket_id', 'specialties_id'],
  },
};

const DEFAULT_FORMS: Record<SectionKey, Record<string, string>> = {
  categories: { name: '', label: '', description: '' },
  sub_categories: { category_name: '', parent_category_id: '' },
  manufacturers: { name: '', description: '' },
  suppliers: { name: '', description: '' },
  drug_classes: { class_name: '' },
  drug_types: { type_name: '', quantity: '', type_description: '' },
  baskets: { name: '', description: '' },
  order_stores: { name: '', stock_basket_id: '', specialties_id: '' },
};

const LOAD_FALLBACK: ManageResponse = {
  sections: {
    categories: [],
    sub_categories: [],
    manufacturers: [],
    suppliers: [],
    drug_classes: [],
    drug_types: [],
    baskets: [],
    order_stores: [],
  },
  options: {
    categories: [],
    baskets: [],
    specialties: [],
  },
  summary: {
    categories: 0,
    sub_categories: 0,
    manufacturers: 0,
    suppliers: 0,
    drug_classes: 0,
    drug_types: 0,
    baskets: 0,
    order_stores: 0,
  },
};

const actionPath = (section: SectionKey, verb: 'add' | 'edit'): string => {
  switch (section) {
    case 'categories':
      return `/legacy/inventory/${verb}category/`;
    case 'sub_categories':
      return `/legacy/inventory/${verb}subcategory/`;
    case 'manufacturers':
      return `/legacy/inventory/${verb}manufacturer/`;
    case 'suppliers':
      return `/legacy/inventory/${verb}supplier/`;
    case 'drug_classes':
      return `/legacy/inventory/${verb}drugclass/`;
    case 'drug_types':
      return `/legacy/inventory/${verb}drugtype/`;
    case 'baskets':
      return `/legacy/inventory/${verb}basket/`;
    default:
      return `/legacy/inventory/${verb}orderstore/`;
  }
};

const asText = (value: unknown): string => String(value ?? '').trim();
const toSelectOptions = (rows: LookupOption[] = []) =>
  rows.map((row) => ({ value: String(row.id), label: row.name || String(row.id) }));

export default function InventoryManage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>('categories');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [data, setData] = useState<ManageResponse>(LOAD_FALLBACK);
  const [formBySection, setFormBySection] = useState<Record<SectionKey, Record<string, string>>>(DEFAULT_FORMS);

  const loadManage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<ManageResponse>('/legacy/inventory/manage/');
      setData({
        sections: {
          categories: Array.isArray(response?.sections?.categories) ? response.sections.categories : [],
          sub_categories: Array.isArray(response?.sections?.sub_categories) ? response.sections.sub_categories : [],
          manufacturers: Array.isArray(response?.sections?.manufacturers) ? response.sections.manufacturers : [],
          suppliers: Array.isArray(response?.sections?.suppliers) ? response.sections.suppliers : [],
          drug_classes: Array.isArray(response?.sections?.drug_classes) ? response.sections.drug_classes : [],
          drug_types: Array.isArray(response?.sections?.drug_types) ? response.sections.drug_types : [],
          baskets: Array.isArray(response?.sections?.baskets) ? response.sections.baskets : [],
          order_stores: Array.isArray(response?.sections?.order_stores) ? response.sections.order_stores : [],
        },
        options: {
          categories: Array.isArray(response?.options?.categories) ? response.options.categories : [],
          baskets: Array.isArray(response?.options?.baskets) ? response.options.baskets : [],
          specialties: Array.isArray(response?.options?.specialties) ? response.options.specialties : [],
        },
        summary: {
          categories: Number(response?.summary?.categories || 0),
          sub_categories: Number(response?.summary?.sub_categories || 0),
          manufacturers: Number(response?.summary?.manufacturers || 0),
          suppliers: Number(response?.summary?.suppliers || 0),
          drug_classes: Number(response?.summary?.drug_classes || 0),
          drug_types: Number(response?.summary?.drug_types || 0),
          baskets: Number(response?.summary?.baskets || 0),
          order_stores: Number(response?.summary?.order_stores || 0),
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load inventory configurations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadManage();
  }, []);

  const activeRows = data.sections[activeSection] || [];
  const activeForm = formBySection[activeSection];
  const activeMeta = SECTION_META[activeSection];

  const updateFormField = (field: string, value: string) => {
    setFormBySection((current) => ({
      ...current,
      [activeSection]: {
        ...current[activeSection],
        [field]: value,
      },
    }));
  };

  const resetSectionForm = (section: SectionKey) => {
    setFormBySection((current) => ({
      ...current,
      [section]: { ...DEFAULT_FORMS[section] },
    }));
  };

  const startEdit = (row: ConfigRow) => {
    setEditingId(row.id);
    setSuccess(null);
    const next = { ...DEFAULT_FORMS[activeSection] };
    for (const field of activeMeta.fields) {
      next[field] = asText(row[field]);
    }
    setFormBySection((current) => ({
      ...current,
      [activeSection]: next,
    }));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSuccess(null);
    resetSectionForm(activeSection);
  };

  const validate = (): string | null => {
    switch (activeSection) {
      case 'categories':
      case 'manufacturers':
      case 'suppliers':
      case 'baskets':
        return activeForm.name ? null : 'Name is required.';
      case 'sub_categories':
        if (!activeForm.category_name) return 'Sub category name is required.';
        if (!activeForm.parent_category_id) return 'Parent category is required.';
        return null;
      case 'drug_classes':
        return activeForm.class_name ? null : 'Class name is required.';
      case 'drug_types':
        return activeForm.type_name ? null : 'Type name is required.';
      case 'order_stores':
        if (!activeForm.name) return 'Order store name is required.';
        if (!activeForm.stock_basket_id) return 'Parent store is required.';
        if (!activeForm.specialties_id) return 'Clinic / specialty is required.';
        return null;
      default:
        return null;
    }
  };

  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = { ...activeForm };
      if (editingId) {
        await api.patch(`${actionPath(activeSection, 'edit')}${editingId}/`, payload);
        setSuccess(`${activeMeta.label} updated.`);
      } else {
        await api.post(actionPath(activeSection, 'add'), payload);
        setSuccess(`${activeMeta.label} saved.`);
      }
      setEditingId(null);
      resetSectionForm(activeSection);
      await loadManage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  const onSectionChange = (section: SectionKey) => {
    setActiveSection(section);
    setEditingId(null);
    setError(null);
    setSuccess(null);
  };

  const renderField = (field: string) => {
    const sharedClassName =
      'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-100';

    if (field === 'description' || field === 'type_description') {
      return (
        <label key={field} className="space-y-1 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {field === 'type_description' ? 'Description' : 'Description'}
          </span>
          <textarea
            value={activeForm[field] || ''}
            onChange={(event) => updateFormField(field, event.target.value)}
            rows={3}
            className={`${sharedClassName} min-h-[96px] resize-y`}
          />
        </label>
      );
    }

    if (field === 'parent_category_id') {
      return (
        <label key={field} className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Parent Category</span>
          <SearchableSelect
            value={activeForm[field] || ''}
            onChange={(value) => updateFormField(field, value)}
            options={toSelectOptions(data.options.categories)}
            placeholder="Select Parent Category"
          />
        </label>
      );
    }

    if (field === 'stock_basket_id') {
      return (
        <label key={field} className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Parent Store</span>
          <SearchableSelect
            value={activeForm[field] || ''}
            onChange={(value) => updateFormField(field, value)}
            options={toSelectOptions(data.options.baskets)}
            placeholder="Select Parent Store"
          />
        </label>
      );
    }

    if (field === 'specialties_id') {
      return (
        <label key={field} className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Clinic / Specialty</span>
          <SearchableSelect
            value={activeForm[field] || ''}
            onChange={(value) => updateFormField(field, value)}
            options={toSelectOptions(data.options.specialties)}
            placeholder="Select Clinic / Specialty"
          />
        </label>
      );
    }

    const labelMap: Record<string, string> = {
      name: 'Name',
      label: 'Label',
      category_name: 'Sub Category Name',
      class_name: 'Class Name',
      type_name: 'Type Name',
      quantity: 'Quantity',
    };

    return (
      <label key={field} className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{labelMap[field] || field}</span>
        <input
          value={activeForm[field] || ''}
          onChange={(event) => updateFormField(field, event.target.value)}
          className={sharedClassName}
        />
      </label>
    );
  };

  const renderRowValue = (row: ConfigRow, field: string) => {
    if (field === 'parent_category_id') {
      const linked = row.parent_category as { name?: string } | undefined;
      return linked?.name || 'N/A';
    }
    if (field === 'stock_basket_id') {
      const linked = row.stock_basket as { name?: string } | undefined;
      return linked?.name || 'N/A';
    }
    if (field === 'specialties_id') {
      const linked = row.specialty as { name?: string } | undefined;
      return linked?.name || 'N/A';
    }
    const value = row[field];
    return asText(value) || 'N/A';
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(236,253,250,0.76))] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-600">Manage</p>
            <div>
              <h1 className="text-3xl font-black tracking-[-0.02em] text-slate-900">Inventory Configurations</h1>
              <p className="text-sm text-slate-600">Manage the legacy inventory setup tables from one operational workspace.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-right shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Active Workspace</p>
            <p className="text-sm font-semibold text-slate-700">
              {activeMeta.label} <span className="text-slate-400">({data.summary[activeSection] || 0})</span>
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_16px_35px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SECTION_META) as SectionKey[]).map((section) => {
            const isActive = section === activeSection;
            return (
              <button
                key={section}
                type="button"
                onClick={() => onSectionChange(section)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'border border-teal-300 bg-teal-50 text-teal-700 shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-700'
                }`}
              >
                {SECTION_META[section].label}
              </button>
            );
          })}
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}
      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.45fr)]">
        <div className="rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">{editingId ? 'Edit Record' : 'Add Record'}</p>
            <h2 className="text-xl font-black text-slate-900">{activeMeta.label}</h2>
            <p className="text-sm text-slate-600">{activeMeta.description}</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {activeMeta.fields.map((field) => renderField(field))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={isSaving}
              className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : editingId ? 'Update Record' : 'Save Record'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              {editingId ? 'Cancel Edit' : 'Reset Form'}
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Current Records</p>
              <h2 className="text-xl font-black text-slate-900">{activeMeta.label}</h2>
            </div>
            <p className="text-sm text-slate-500">
              {isLoading ? 'Loading...' : `${activeRows.length} record${activeRows.length === 1 ? '' : 's'}`}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {activeRows.map((row) => (
              <div key={row.id} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="grid flex-1 gap-3 md:grid-cols-2">
                    {activeMeta.fields.map((field) => (
                      <div key={field} className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {field === 'parent_category_id'
                            ? 'Parent Category'
                            : field === 'stock_basket_id'
                              ? 'Parent Store'
                              : field === 'specialties_id'
                                ? 'Clinic / Specialty'
                                : field.replaceAll('_', ' ')}
                        </p>
                        <p className="text-sm font-semibold text-slate-800">{renderRowValue(row, field)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 transition hover:border-sky-300"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!isLoading && !activeRows.length ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-8 text-center text-sm text-slate-500">
                No records found for {activeMeta.label.toLowerCase()}.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
