import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { api } from '../../lib/api';

type ServiceOption = {
  id: string;
  name?: string;
  price?: number;
  specialty_id?: string;
  specialty?: string;
};

type SessionItem = {
  id: string;
  item_type_id?: string;
  item_type?: string;
  item_id?: string;
  item_name?: string;
  unit_cost?: number;
  quantity?: number;
  line_total?: number;
  duration?: number;
  specialty_id?: string;
  specialty?: string;
  user_id?: string;
  user?: string;
  configuration?: string;
};

type SessionRow = {
  id: string;
  code?: string;
  amount?: number;
  actual_amount?: number;
  discount_amount?: number;
  created_by_name?: string;
  date_created?: string | null;
  status?: number;
  status_label?: string;
  session_type?: number;
  session_type_label?: string;
  gender_labels?: string[];
  age_specification_labels?: string[];
  item_count?: number;
  items?: SessionItem[];
};

type SessionsOptions = {
  genders?: Array<{ id: string; name?: string }>;
  age_specifications?: Array<{ id: string; age?: string }>;
  specialties?: Array<{ id: string; name?: string }>;
  users?: Array<{ id: string; name?: string; specialty_id?: string }>;
  item_types?: Array<{ id: string; name?: string }>;
  service_catalog?: Record<string, ServiceOption[]>;
};

type SessionsResponse = {
  sessions?: SessionRow[];
  options?: SessionsOptions;
};

type CreateLine = {
  rowKey: string;
  item_type_id: string;
  item_id: string;
  item_name: string;
  quantity: string;
  unit_cost: string;
  duration: string;
  specialty_id: string;
  user_id: string;
  configuration: string;
};

function asText(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function asMoney(value: unknown): string {
  const numeric = Number(value || 0);
  return Number.isFinite(numeric) ? numeric.toFixed(2) : '0.00';
}

function toDisplayDateTime(value?: string | null): string {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

function nextRowKey(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function emptyLine(): CreateLine {
  return {
    rowKey: nextRowKey(),
    item_type_id: '',
    item_id: '',
    item_name: '',
    quantity: '1',
    unit_cost: '',
    duration: '30',
    specialty_id: '',
    user_id: '',
    configuration: '',
  };
}

export default function SessionsIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [payload, setPayload] = useState<SessionsResponse>({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionRow | null>(null);
  const [editTarget, setEditTarget] = useState<SessionRow | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [createForm, setCreateForm] = useState({
    name: '',
    genders: [] as string[],
    age_specifications: [] as string[],
    price: '',
    lines: [emptyLine()] as CreateLine[],
  });

  const loadSessions = useCallback(async () => {
    const response = await api.get<SessionsResponse>('/legacy/sessions/index/');
    setPayload(response || {});
  }, []);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      setError(null);
      try {
        await loadSessions();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load sessions.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadSessions]);

  const sessions = useMemo(() => (Array.isArray(payload.sessions) ? payload.sessions : []), [payload.sessions]);
  const options = payload.options || {};
  const itemTypes = Array.isArray(options.item_types) ? options.item_types : [];
  const users = Array.isArray(options.users) ? options.users : [];
  const specialties = Array.isArray(options.specialties) ? options.specialties : [];
  const genders = Array.isArray(options.genders) ? options.genders : [];
  const ageSpecs = Array.isArray(options.age_specifications) ? options.age_specifications : [];
  const serviceCatalog = options.service_catalog || {};

  const filteredSessions = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sessions.filter((row) => {
      if (statusFilter && String(row.status ?? '') !== statusFilter) return false;
      if (!term) return true;
      return [
        asText(row.code),
        asText(row.created_by_name),
        asText(row.session_type_label),
        ...(Array.isArray(row.gender_labels) ? row.gender_labels : []),
        ...(Array.isArray(row.age_specification_labels) ? row.age_specification_labels : []),
      ]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }, [search, sessions, statusFilter]);

  const summary = useMemo(() => {
    const active = sessions.filter((row) => Number(row.status || 0) === 1).length;
    const facility = sessions.filter((row) => Number(row.session_type || 0) === 1).length;
    const totalAmount = sessions.reduce((sum, row) => sum + Number(row.amount || 0), 0);
    return { active, facility, totalAmount };
  }, [sessions]);

  const actualAmount = useMemo(
    () =>
      createForm.lines.reduce((sum, line) => {
        const quantity = Number(line.quantity || 0);
        const unitCost = Number(line.unit_cost || 0);
        return sum + (Number.isFinite(quantity) ? quantity : 0) * (Number.isFinite(unitCost) ? unitCost : 0);
      }, 0),
    [createForm.lines],
  );

  const effectivePrice = useMemo(() => {
    const explicit = Number(createForm.price || 0);
    if (createForm.price && Number.isFinite(explicit)) return explicit;
    return actualAmount;
  }, [actualAmount, createForm.price]);

  const discountAmount = Math.max(actualAmount - effectivePrice, 0);

  const resetCreateForm = () => {
    setCreateForm({
      name: '',
      genders: [],
      age_specifications: [],
      price: '',
      lines: [emptyLine()],
    });
  };

  const openSession = async (sessionId: string) => {
    setError(null);
    try {
      const response = await api.get<{ session?: SessionRow }>(`/legacy/sessions/configure-session/${encodeURIComponent(sessionId)}/`);
      setSelectedSession(response?.session || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load session details.');
    }
  };

  const addLine = () => {
    setCreateForm((current) => ({ ...current, lines: [...current.lines, emptyLine()] }));
  };

  const removeLine = (rowKey: string) => {
    setCreateForm((current) => ({
      ...current,
      lines: current.lines.length > 1 ? current.lines.filter((line) => line.rowKey !== rowKey) : [emptyLine()],
    }));
  };

  const updateLine = (rowKey: string, field: keyof CreateLine, value: string) => {
    setCreateForm((current) => ({
      ...current,
      lines: current.lines.map((line) => {
        if (line.rowKey !== rowKey) return line;
        const next = { ...line, [field]: value };
        if (field === 'item_type_id') {
          next.item_id = '';
          next.item_name = '';
          next.unit_cost = '';
          next.specialty_id = '';
        }
        if (field === 'item_id') {
          const option = (serviceCatalog[next.item_type_id] || []).find((entry) => entry.id === value);
          next.item_name = asText(option?.name);
          next.unit_cost = option?.price !== undefined ? String(option.price) : '';
          if (asText(option?.specialty_id)) {
            next.specialty_id = asText(option?.specialty_id);
          }
        }
        return next;
      }),
    }));
  };

  const onCreateSession = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    if (!asText(createForm.name)) {
      setError('Session title is required.');
      return;
    }
    const items = createForm.lines
      .map((line) => ({
        item_type_id: asText(line.item_type_id),
        item_id: asText(line.item_id),
        item_name: asText(line.item_name),
        quantity: asText(line.quantity) || '1',
        unit_cost: asText(line.unit_cost) || '0',
        duration: asText(line.duration) || '0',
        specialty_id: asText(line.specialty_id),
        user_id: asText(line.user_id),
        configuration: asText(line.configuration),
      }))
      .filter((line) => line.item_type_id && line.item_id);

    setIsSaving(true);
    try {
      await api.post('/legacy/sessions/add/', {
        name: createForm.name,
        genders: createForm.genders,
        age_specifications: createForm.age_specifications,
        actual_price: actualAmount,
        price: effectivePrice,
        items,
      });
      setShowCreate(false);
      resetCreateForm();
      await loadSessions();
      setSuccess('Session created successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create session.');
    } finally {
      setIsSaving(false);
    }
  };

  const onToggleSession = async (row: SessionRow) => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);
    try {
      await api.post(`/legacy/sessions/toggle-session/${encodeURIComponent(row.id)}/`, {});
      await loadSessions();
      if (selectedSession?.id === row.id) {
        await openSession(row.id);
      }
      setSuccess(`Session ${Number(row.status || 0) === 1 ? 'disabled' : 'enabled'} successfully.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update session status.');
    } finally {
      setIsSaving(false);
    }
  };

  const openEdit = (row: SessionRow) => {
    setEditTarget(row);
    setEditCode(asText(row.code));
    setEditAmount(asText(row.amount));
  };

  const onEditSession = async (event: FormEvent) => {
    event.preventDefault();
    if (!editTarget) return;
    setError(null);
    setSuccess(null);
    setIsSaving(true);
    try {
      await api.post('/legacy/sessions/edit-session/', {
        id: editTarget.id,
        code: editCode,
        amount: editAmount,
      });
      setEditTarget(null);
      await loadSessions();
      if (selectedSession?.id === editTarget.id) {
        await openSession(editTarget.id);
      }
      setSuccess('Session updated successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update session.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-600">Loading sessions...</div>;
  }

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Manage</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Patient Session Programs</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Manage session templates, pricing, target demographics, and included services from one workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowCreate(true);
              setError(null);
              setSuccess(null);
            }}
            className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700"
          >
            Create Session
          </button>
        </div>

        {error ? <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        {success ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
        ) : null}

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Total Sessions</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{sessions.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-emerald-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Active</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{summary.active}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-sky-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Facility Type</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{summary.facility}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-amber-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Listed Amount</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{asMoney(summary.totalAmount)}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr),14rem]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, user, or demographic"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <SearchableSelectField
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            <option value="1">Active</option>
            <option value="0">Disabled</option>
          </SearchableSelectField>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                <th className="py-3 pr-3">Date</th>
                <th className="py-3 pr-3">Name</th>
                <th className="py-3 pr-3">Amount</th>
                <th className="py-3 pr-3">User</th>
                <th className="py-3 pr-3">Status</th>
                <th className="py-3 pr-3">Type</th>
                <th className="py-3 pr-3">Items</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!filteredSessions.length ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500">
                    No sessions match the current filters.
                  </td>
                </tr>
              ) : null}
              {filteredSessions.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 align-top">
                  <td className="py-3 pr-3 text-slate-600">{toDisplayDateTime(row.date_created)}</td>
                  <td className="py-3 pr-3">
                    <p className="font-semibold text-slate-900">{asText(row.code) || 'Untitled session'}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {(row.gender_labels || []).join(', ') || 'All genders'} | {(row.age_specification_labels || []).join(', ') || 'All ages'}
                    </p>
                  </td>
                  <td className="py-3 pr-3 font-semibold text-slate-900">{asMoney(row.amount)}</td>
                  <td className="py-3 pr-3 text-slate-600">{asText(row.created_by_name) || 'Unknown user'}</td>
                  <td className="py-3 pr-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        Number(row.status || 0) === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {asText(row.status_label)}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-slate-600">{asText(row.session_type_label)}</td>
                  <td className="py-3 pr-3 text-slate-600">{Number(row.item_count || 0)}</td>
                  <td className="py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => void openSession(row.id)}
                        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(row)}
                        className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => void onToggleSession(row)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          Number(row.status || 0) === 1
                            ? 'border border-rose-200 bg-rose-50 text-rose-700'
                            : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {Number(row.status || 0) === 1 ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showCreate ? (
        <div className="fixed inset-0 z-[150] flex items-start justify-center bg-slate-950/35 p-4">
          <div className="max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Sessions</p>
                <h2 className="text-xl font-semibold text-slate-900">Create Session</h2>
              </div>
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                Close
              </button>
            </div>

            <form onSubmit={(event) => void onCreateSession(event)} className="space-y-6 p-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Title</label>
                  <input
                    value={createForm.name}
                    onChange={(event) => setCreateForm((current) => ({ ...current, name: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Enter session title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Price</label>
                  <input
                    value={createForm.price}
                    onChange={(event) => setCreateForm((current) => ({ ...current, price: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    placeholder={asMoney(actualAmount)}
                  />
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Gender Specifications</label>
                  <SearchableSelectField
                    multiple
                    value={createForm.genders}
                    onChange={(event) =>
                      setCreateForm((current) => ({
                        ...current,
                        genders: Array.from(event.target.selectedOptions).map((option) => option.value),
                      }))
                    }
                    className="mt-2 h-36 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    {genders.map((row) => (
                      <option key={row.id} value={row.id}>
                        {asText(row.name) || row.id}
                      </option>
                    ))}
                  </SearchableSelectField>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Age Specifications</label>
                  <SearchableSelectField
                    multiple
                    value={createForm.age_specifications}
                    onChange={(event) =>
                      setCreateForm((current) => ({
                        ...current,
                        age_specifications: Array.from(event.target.selectedOptions).map((option) => option.value),
                      }))
                    }
                    className="mt-2 h-36 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    {ageSpecs.map((row) => (
                      <option key={row.id} value={row.id}>
                        {asText(row.age) || row.id}
                      </option>
                    ))}
                  </SearchableSelectField>
                </div>
              </div>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Included Services</p>
                    <p className="text-xs text-slate-500">Build the services that will be packaged into this session.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addLine}
                    className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-sky-700"
                  >
                    Add Service
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {createForm.lines.map((line, index) => {
                    const itemOptions = serviceCatalog[line.item_type_id] || [];
                    return (
                      <div key={line.rowKey} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-900">Service {index + 1}</p>
                          <button
                            type="button"
                            onClick={() => removeLine(line.rowKey)}
                            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-3">
                          <SearchableSelectField
                            value={line.item_type_id}
                            onChange={(event) => updateLine(line.rowKey, 'item_type_id', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                          >
                            <option value="">Select service type</option>
                            {itemTypes.map((row) => (
                              <option key={row.id} value={row.id}>
                                {asText(row.name) || row.id}
                              </option>
                            ))}
                          </SearchableSelectField>
                          <SearchableSelectField
                            value={line.item_id}
                            onChange={(event) => updateLine(line.rowKey, 'item_id', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            disabled={!line.item_type_id}
                          >
                            <option value="">Select service</option>
                            {itemOptions.map((row) => (
                              <option key={row.id} value={row.id}>
                                {asText(row.name) || row.id}
                              </option>
                            ))}
                          </SearchableSelectField>
                          <SearchableSelectField
                            value={line.specialty_id}
                            onChange={(event) => updateLine(line.rowKey, 'specialty_id', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                          >
                            <option value="">Select department</option>
                            {specialties.map((row) => (
                              <option key={row.id} value={row.id}>
                                {asText(row.name) || row.id}
                              </option>
                            ))}
                          </SearchableSelectField>
                          <input
                            value={line.quantity}
                            onChange={(event) => updateLine(line.rowKey, 'quantity', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            placeholder="Quantity"
                          />
                          <input
                            value={line.unit_cost}
                            onChange={(event) => updateLine(line.rowKey, 'unit_cost', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            placeholder="Unit cost"
                          />
                          <input
                            value={line.duration}
                            onChange={(event) => updateLine(line.rowKey, 'duration', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            placeholder="Duration (minutes)"
                          />
                          <SearchableSelectField
                            value={line.user_id}
                            onChange={(event) => updateLine(line.rowKey, 'user_id', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm lg:col-span-2"
                          >
                            <option value="">Select assigned user</option>
                            {users
                              .filter((row) => !line.specialty_id || asText(row.specialty_id) === line.specialty_id)
                              .map((row) => (
                                <option key={row.id} value={row.id}>
                                  {asText(row.name) || row.id}
                                </option>
                              ))}
                          </SearchableSelectField>
                          <input
                            value={line.item_name}
                            onChange={(event) => updateLine(line.rowKey, 'item_name', event.target.value)}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            placeholder="Display name"
                          />
                        </div>
                        <textarea
                          value={line.configuration}
                          onChange={(event) => updateLine(line.rowKey, 'configuration', event.target.value)}
                          className="mt-3 min-h-[4.5rem] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                          placeholder="Optional configuration notes"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Actual Price</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{asMoney(actualAmount)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Session Price</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{asMoney(effectivePrice)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Discount</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{asMoney(discountAmount)}</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={resetCreateForm}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60"
                >
                  {isSaving ? 'Saving...' : 'Save Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {selectedSession ? (
        <div className="fixed inset-0 z-[150] flex items-start justify-center bg-slate-950/35 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Session</p>
                <h2 className="text-xl font-semibold text-slate-900">{asText(selectedSession.code) || 'Untitled session'}</h2>
              </div>
              <button type="button" onClick={() => setSelectedSession(null)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                Close
              </button>
            </div>
            <div className="space-y-5 p-6">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Amount</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{asMoney(selectedSession.amount)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Actual</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{asMoney(selectedSession.actual_amount)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Discount</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{asMoney(selectedSession.discount_amount)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Status</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{asText(selectedSession.status_label)}</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Demographic Target</p>
                  <p className="mt-3 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Gender:</span>{' '}
                    {(selectedSession.gender_labels || []).join(', ') || 'All genders'}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Age:</span>{' '}
                    {(selectedSession.age_specification_labels || []).join(', ') || 'All ages'}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Record Context</p>
                  <p className="mt-3 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Created:</span> {toDisplayDateTime(selectedSession.date_created)}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Created By:</span> {asText(selectedSession.created_by_name) || 'Unknown user'}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Type:</span> {asText(selectedSession.session_type_label)}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200">
                <div className="border-b border-slate-200 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">Session Items</p>
                </div>
                <div className="overflow-x-auto p-4">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                        <th className="py-2 pr-3">Type</th>
                        <th className="py-2 pr-3">Item</th>
                        <th className="py-2 pr-3">Qty</th>
                        <th className="py-2 pr-3">Unit Cost</th>
                        <th className="py-2 pr-3">Duration</th>
                        <th className="py-2 pr-3">Department</th>
                        <th className="py-2">User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!selectedSession.items?.length ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-500">
                            No session items configured.
                          </td>
                        </tr>
                      ) : null}
                      {(selectedSession.items || []).map((item) => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="py-3 pr-3">{asText(item.item_type)}</td>
                          <td className="py-3 pr-3">
                            <p className="font-semibold text-slate-900">{asText(item.item_name)}</p>
                            {asText(item.configuration) ? <p className="mt-1 text-xs text-slate-500">{asText(item.configuration)}</p> : null}
                          </td>
                          <td className="py-3 pr-3">{Number(item.quantity || 0)}</td>
                          <td className="py-3 pr-3">{asMoney(item.unit_cost)}</td>
                          <td className="py-3 pr-3">{Number(item.duration || 0) || 'N/A'}</td>
                          <td className="py-3 pr-3">{asText(item.specialty) || 'N/A'}</td>
                          <td className="py-3">{asText(item.user) || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {editTarget ? (
        <div className="fixed inset-0 z-[150] flex items-start justify-center bg-slate-950/35 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Sessions</p>
                <h2 className="text-xl font-semibold text-slate-900">Edit Session</h2>
              </div>
              <button type="button" onClick={() => setEditTarget(null)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                Close
              </button>
            </div>
            <form onSubmit={(event) => void onEditSession(event)} className="space-y-4 p-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Title</label>
                <input
                  value={editCode}
                  onChange={(event) => setEditCode(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Price</label>
                <input
                  value={editAmount}
                  onChange={(event) => setEditAmount(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditTarget(null)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 disabled:opacity-60"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
