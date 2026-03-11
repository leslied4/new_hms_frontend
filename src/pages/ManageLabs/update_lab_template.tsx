import { FormEvent, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRow = Record<string, unknown>;

type ReferenceField = {
  key: string;
  value: string;
};

type TemplateOption = {
  id?: string;
  name?: string;
  type?: number | string | null;
  reference?: string | null;
};

type LabTemplateRow = {
  id: string;
  id_section?: number | string | null;
  label_name?: string;
  input_type?: string;
  reference?: string | null;
  unit_of_measurement?: string | null;
  status_id?: string | number | null;
  select_values?: string | null;
  lab_template_select_options?: TemplateOption[];
};

type TemplateForm = {
  id_section: string;
  label_name: string;
  input_type: 'Text' | 'Number' | 'TextArea' | 'Select';
  select_values: string;
  unit_of_measurement: string;
  references: ReferenceField[];
};

type UpdateTemplateResponse = {
  lab_test?: GenericRow;
  investigation?: GenericRow | null;
  lab_templates?: LabTemplateRow[];
  unit_of_measurements?: GenericRow[];
  reference_values?: GenericRow[];
};

const INPUT_TYPES: TemplateForm['input_type'][] = ['Text', 'Number', 'TextArea', 'Select'];
const REFERENCE_KEYS = [
  { value: 'child', label: 'Child (0-14)' },
  { value: 'adult_male', label: 'Male' },
  { value: 'adult_female', label: 'Female' },
  { value: 'general_ref', label: 'General Ref' },
];

const asText = (value: unknown): string => String(value ?? '').trim();

const isEnabled = (value: unknown): boolean => {
  const normalized = asText(value).toLowerCase();
  return normalized === '1' || normalized === 'true';
};

const defaultReference = (): ReferenceField => ({ key: 'general_ref', value: '' });

const createEmptyForm = (): TemplateForm => ({
  id_section: '',
  label_name: '',
  input_type: 'Text',
  select_values: '',
  unit_of_measurement: '',
  references: [defaultReference()],
});

const deriveReferences = (template: LabTemplateRow): ReferenceField[] => {
  const options = Array.isArray(template.lab_template_select_options)
    ? template.lab_template_select_options
    : [];
  const refs = options
    .filter((option) => Number(option?.type ?? 0) === 1)
    .map((option) => ({ key: asText(option.name) || 'general_ref', value: asText(option.reference) }));
  if (refs.length > 0) return refs;
  return [{ key: 'general_ref', value: asText(template.reference) }];
};

const deriveSelectValues = (template: LabTemplateRow): string => {
  const fromField = asText(template.select_values);
  if (fromField) return fromField;
  const options = Array.isArray(template.lab_template_select_options)
    ? template.lab_template_select_options
    : [];
  const values = options
    .filter((option) => Number(option?.type ?? 0) !== 1)
    .map((option) => asText(option.name))
    .filter(Boolean);
  return values.join(',');
};

const templateToForm = (template: LabTemplateRow): TemplateForm => ({
  id_section: asText(template.id_section),
  label_name: asText(template.label_name),
  input_type: (INPUT_TYPES.includes(asText(template.input_type) as TemplateForm['input_type'])
    ? (asText(template.input_type) as TemplateForm['input_type'])
    : 'Text'),
  select_values: deriveSelectValues(template),
  unit_of_measurement: asText(template.unit_of_measurement),
  references: deriveReferences(template),
});

export default function ManageLabsUpdateLabTemplate() {
  const [searchParams] = useSearchParams();
  const labTestId = asText(searchParams.get('id'));

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [labTest, setLabTest] = useState<GenericRow | null>(null);
  const [investigation, setInvestigation] = useState<GenericRow | null>(null);
  const [templates, setTemplates] = useState<LabTemplateRow[]>([]);
  const [unitNames, setUnitNames] = useState<string[]>([]);

  const [addForm, setAddForm] = useState<TemplateForm>(createEmptyForm());
  const [editingTemplateId, setEditingTemplateId] = useState('');
  const [editForm, setEditForm] = useState<TemplateForm>(createEmptyForm());

  const pageTitle = useMemo(() => {
    const testName = asText(labTest?.name);
    return testName ? `Update Lab Template - ${testName}` : 'Update Lab Template';
  }, [labTest]);

  const loadPage = async () => {
    if (!labTestId) {
      setError('Missing lab test id. Open this page from Manage Labs > Update Template.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<UpdateTemplateResponse>(
        `/legacy/manage-labs/update-lab-template/?id=${encodeURIComponent(labTestId)}`,
      );
      const loadedTemplates = Array.isArray(response?.lab_templates) ? response.lab_templates : [];
      const loadedUnits = Array.isArray(response?.unit_of_measurements)
        ? response.unit_of_measurements.map((row) => asText((row as GenericRow).name)).filter(Boolean)
        : [];

      setLabTest((response?.lab_test as GenericRow) || null);
      setInvestigation((response?.investigation as GenericRow) || null);
      setTemplates(loadedTemplates);
      setUnitNames(Array.from(new Set(loadedUnits)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load lab template details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPage();
  }, [labTestId]);

  const updateReference = (
    form: TemplateForm,
    index: number,
    field: keyof ReferenceField,
    value: string,
  ): TemplateForm => {
    const nextRefs = form.references.map((reference, refIndex) =>
      refIndex === index ? { ...reference, [field]: value } : reference,
    );
    return { ...form, references: nextRefs };
  };

  const buildPayload = (form: TemplateForm) => {
    const references = form.references
      .map((reference) => ({ key: asText(reference.key), value: asText(reference.value) }))
      .filter((reference) => reference.key || reference.value);

    return {
      id_section: asText(form.id_section),
      label_name: asText(form.label_name),
      input_type: form.input_type,
      select_values: asText(form.select_values),
      unit_of_measurement: asText(form.unit_of_measurement),
      reference_keys: references.map((reference) => reference.key || 'general_ref'),
      reference_values: references.map((reference) => reference.value),
    };
  };

  const handleAddTemplate = async (event: FormEvent) => {
    event.preventDefault();
    if (!labTestId) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post(
        `/legacy/manage-labs/add-lab-template/?id=${encodeURIComponent(labTestId)}`,
        buildPayload(addForm),
      );
      setSuccess('Template added.');
      setAddForm(createEmptyForm());
      await loadPage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add template.');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (template: LabTemplateRow) => {
    setEditingTemplateId(asText(template.id));
    setEditForm(templateToForm(template));
    setError(null);
    setSuccess(null);
  };

  const handleEditTemplate = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingTemplateId) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.patch(
        `/legacy/manage-labs/edit-lab-template/?id=${encodeURIComponent(editingTemplateId)}`,
        buildPayload(editForm),
      );
      setSuccess('Template updated.');
      setEditingTemplateId('');
      await loadPage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update template.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (template: LabTemplateRow) => {
    const templateId = asText(template.id);
    if (!templateId) return;

    const nextStatus = isEnabled(template.status_id) ? '2' : '1';
    setError(null);
    setSuccess(null);
    try {
      await api.patch(
        `/legacy/manage-labs/toggle-lab-test-item-status/?id=${encodeURIComponent(templateId)}`,
        { val: nextStatus },
      );
      setSuccess(isEnabled(template.status_id) ? 'Template disabled.' : 'Template enabled.');
      await loadPage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update template status.');
    }
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Manage Labs</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">{pageTitle}</h1>
            <p className="mt-1 text-xs text-slate-600">
              Investigation: {asText(investigation?.name) || 'N/A'}
            </p>
            <p className="text-xs text-slate-600">Description: {asText(labTest?.description) || 'N/A'}</p>
          </div>
          <Link
            to="/ManageLabs/index"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Back to Manage Labs
          </Link>
        </div>
      </section>

      {error ? <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Section</th>
                <th className="px-3 py-2 text-left font-semibold">Test Item</th>
                <th className="px-3 py-2 text-left font-semibold">Input Type</th>
                <th className="px-3 py-2 text-left font-semibold">Reference</th>
                <th className="px-3 py-2 text-left font-semibold">Unit</th>
                <th className="px-3 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && templates.length === 0 ? (
                <tr>
                  <td className="px-3 py-4 text-slate-500" colSpan={6}>
                    No template items found.
                  </td>
                </tr>
              ) : null}
              {templates.map((template) => {
                const templateId = asText(template.id);
                return (
                  <tr key={templateId} className="border-t border-slate-100">
                    <td className="px-3 py-2">{asText(template.id_section) || '-'}</td>
                    <td className="px-3 py-2">{asText(template.label_name) || '-'}</td>
                    <td className="px-3 py-2">{asText(template.input_type) || '-'}</td>
                    <td className="px-3 py-2">{asText(template.reference) || '-'}</td>
                    <td className="px-3 py-2">{asText(template.unit_of_measurement) || '-'}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(template)}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(template)}
                          className={`rounded-md px-2 py-1 text-[11px] font-semibold ${isEnabled(template.status_id)
                            ? 'border border-slate-300 bg-slate-100 text-slate-700'
                            : 'border border-emerald-300 bg-emerald-100 text-emerald-700'}`}
                        >
                          {isEnabled(template.status_id) ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {isLoading ? (
                <tr>
                  <td className="px-3 py-4 text-slate-500" colSpan={6}>
                    Loading templates...
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        <h2 className="text-sm font-semibold text-slate-900">Add Template Item</h2>
        <form className="mt-3 space-y-3" onSubmit={handleAddTemplate}>
          <div className="grid gap-3 md:grid-cols-6">
            <input
              type="number"
              min={1}
              value={addForm.id_section}
              onChange={(event) => setAddForm((prev) => ({ ...prev, id_section: event.target.value }))}
              placeholder="Section"
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
            />
            <input
              value={addForm.label_name}
              onChange={(event) => setAddForm((prev) => ({ ...prev, label_name: event.target.value }))}
              placeholder="Test Item"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs md:col-span-2"
            />
            <SearchableSelectField
              value={addForm.input_type}
              onChange={(event) => setAddForm((prev) => ({ ...prev, input_type: event.target.value as TemplateForm['input_type'] }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
            >
              {INPUT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SearchableSelectField>
            <input
              list="manage-labs-units"
              value={addForm.unit_of_measurement}
              onChange={(event) => setAddForm((prev) => ({ ...prev, unit_of_measurement: event.target.value }))}
              placeholder="Unit"
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
            />
            <button
              type="submit"
              disabled={isSaving || !labTestId}
              className="rounded-lg border border-sky-400 bg-sky-500 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Add
            </button>
          </div>

          {addForm.input_type === 'Select' ? (
            <input
              value={addForm.select_values}
              onChange={(event) => setAddForm((prev) => ({ ...prev, select_values: event.target.value }))}
              placeholder="Comma-separated select values. Ex: Positive,Negative"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
            />
          ) : null}

          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-700">Reference Values</p>
            {addForm.references.map((reference, index) => (
              <div key={`add-ref-${index}`} className="grid gap-2 md:grid-cols-[1fr,2fr,auto]">
                <SearchableSelectField
                  value={reference.key}
                  onChange={(event) =>
                    setAddForm((prev) => updateReference(prev, index, 'key', event.target.value))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                >
                  {REFERENCE_KEYS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SearchableSelectField>
                <input
                  value={reference.value}
                  onChange={(event) =>
                    setAddForm((prev) => updateReference(prev, index, 'value', event.target.value))
                  }
                  placeholder="Reference value"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() =>
                    setAddForm((prev) => ({
                      ...prev,
                      references:
                        prev.references.length > 1
                          ? prev.references.filter((_, refIndex) => refIndex !== index)
                          : prev.references,
                    }))
                  }
                  className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setAddForm((prev) => ({ ...prev, references: [...prev.references, defaultReference()] }))
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
            >
              + Reference
            </button>
          </div>
        </form>
      </section>

      <datalist id="manage-labs-units">
        {unitNames.map((unitName) => (
          <option key={unitName} value={unitName} />
        ))}
      </datalist>

      {editingTemplateId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Edit Template</h3>
              <button
                type="button"
                onClick={() => setEditingTemplateId('')}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
            <form className="mt-3 space-y-3" onSubmit={handleEditTemplate}>
              <div className="grid gap-3 md:grid-cols-5">
                <input
                  type="number"
                  min={1}
                  value={editForm.id_section}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, id_section: event.target.value }))}
                  placeholder="Section"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
                <input
                  value={editForm.label_name}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, label_name: event.target.value }))}
                  placeholder="Test Item"
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs md:col-span-2"
                />
                <SearchableSelectField
                  value={editForm.input_type}
                  onChange={(event) =>
                    setEditForm((prev) => ({ ...prev, input_type: event.target.value as TemplateForm['input_type'] }))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                >
                  {INPUT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </SearchableSelectField>
                <input
                  list="manage-labs-units"
                  value={editForm.unit_of_measurement}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, unit_of_measurement: event.target.value }))}
                  placeholder="Unit"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
              </div>

              {editForm.input_type === 'Select' ? (
                <input
                  value={editForm.select_values}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, select_values: event.target.value }))}
                  placeholder="Comma-separated select values. Ex: Positive,Negative"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
              ) : null}

              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-700">Reference Values</p>
                {editForm.references.map((reference, index) => (
                  <div key={`edit-ref-${index}`} className="grid gap-2 md:grid-cols-[1fr,2fr,auto]">
                    <SearchableSelectField
                      value={reference.key}
                      onChange={(event) =>
                        setEditForm((prev) => updateReference(prev, index, 'key', event.target.value))
                      }
                      className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                    >
                      {REFERENCE_KEYS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </SearchableSelectField>
                    <input
                      value={reference.value}
                      onChange={(event) =>
                        setEditForm((prev) => updateReference(prev, index, 'value', event.target.value))
                      }
                      placeholder="Reference value"
                      className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditForm((prev) => ({
                          ...prev,
                          references:
                            prev.references.length > 1
                              ? prev.references.filter((_, refIndex) => refIndex !== index)
                              : prev.references,
                        }))
                      }
                      className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, references: [...prev.references, defaultReference()] }))
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  + Reference
                </button>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTemplateId('')}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg border border-sky-400 bg-sky-500 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
