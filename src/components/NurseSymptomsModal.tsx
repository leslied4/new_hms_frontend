import { useEffect, useMemo, useState } from 'react';
import SearchableSelectField from './SearchableSelectField';
import { api } from '../lib/api';

type SymptomsModalProps = {
  open: boolean;
  visitId: string;
  patientId: string;
  patientName?: string;
  patientCode?: string;
  onClose: () => void;
};

type OdqOption = {
  id: string;
  name?: string;
  code?: string;
  odq_category_id?: string | null;
  odq_category_name?: string | null;
};

type OdqEntry = {
  id: string;
  odq_id?: string | null;
  odq_name?: string | null;
  odq_code?: string | null;
  odq_comment?: string | null;
  triage_priority?: string | null;
  onset?: string | null;
  duration?: string | null;
  severity?: string | null;
  character_quality?: string | null;
  radiation?: string | null;
  aggravating_factors?: string | null;
  relieving_factors?: string | null;
  associated_symptoms?: string | null;
  notes?: string | null;
  type?: string | null;
  date_created?: string | null;
};

type ClinicalEncounterResponse = {
  odqs?: OdqEntry[];
  options?: {
    odqs?: OdqOption[];
  };
};

type RoleType = 'triage' | 'doctor' | 'inpatient';
type HistoryFilter = 'all' | RoleType;

function asText(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function toDisplayDateTime(value?: string | null): string {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

const TRIAGE_PRIORITIES = [
  '1 - Immediate (Red)',
  '2 - Urgent (Orange)',
  '3 - Less Urgent (Yellow)',
  '4 - Non-Urgent (Green)',
  '5 - Non-Urgent (Blue)',
];

export default function NurseSymptomsModal({
  open,
  visitId,
  patientId,
  patientName,
  patientCode,
  onClose,
}: SymptomsModalProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all');
  const [role, setRole] = useState<RoleType>('triage');
  const [odqOptions, setOdqOptions] = useState<OdqOption[]>([]);
  const [odqEntries, setOdqEntries] = useState<OdqEntry[]>([]);
  const [selectedOdqId, setSelectedOdqId] = useState('');
  const [form, setForm] = useState<Record<string, string>>({
    onset: '',
    duration: '',
    severity: '',
    triage_priority: '',
    character_quality: '',
    radiation: '',
    aggravating_factors: '',
    relieving_factors: '',
    associated_symptoms: '',
    notes: '',
    odq_comment: '',
  });

  const load = async () => {
    if (!open || !visitId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<ClinicalEncounterResponse>(
        `/legacy/patients/clinical-encounter-space/?visit_id=${encodeURIComponent(visitId)}`,
      );
      setOdqOptions(Array.isArray(response?.options?.odqs) ? response.options?.odqs || [] : []);
      setOdqEntries(Array.isArray(response?.odqs) ? response.odqs || [] : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load symptoms.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    setSearch('');
    setHistoryFilter('all');
    setRole('triage');
    setSelectedOdqId('');
    setForm({
      onset: '',
      duration: '',
      severity: '',
      triage_priority: '',
      character_quality: '',
      radiation: '',
      aggravating_factors: '',
      relieving_factors: '',
      associated_symptoms: '',
      notes: '',
      odq_comment: '',
    });
    void load();
  }, [open, visitId]);

  const filteredOdqOptions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return odqOptions;
    return odqOptions.filter((item) => {
      const text = `${asText(item.name)} ${asText(item.code)} ${asText(item.odq_category_name)}`.toLowerCase();
      return text.includes(term);
    });
  }, [odqOptions, search]);

  const categories = useMemo(() => {
    const map = new Map<string, { id: string; name: string; items: OdqOption[] }>();
    filteredOdqOptions.forEach((item) => {
      const id = asText(item.odq_category_id) || 'uncategorized';
      const name = asText(item.odq_category_name) || 'Uncategorized';
      if (!map.has(id)) {
        map.set(id, { id, name, items: [] });
      }
      map.get(id)?.items.push(item);
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredOdqOptions]);

  const selectedOdq = useMemo(
    () => odqOptions.find((item) => asText(item.id) === selectedOdqId) || null,
    [odqOptions, selectedOdqId],
  );

  const visibleHistory = useMemo(() => {
    if (historyFilter === 'all') return odqEntries;
    return odqEntries.filter((entry) => asText(entry.type).toLowerCase() === historyFilter);
  }, [historyFilter, odqEntries]);

  const saveSymptom = async () => {
    if (!selectedOdqId) {
      setError('Select a symptom first.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-odq/', {
        visit_id: visitId,
        patient_id: patientId,
        odq_id: selectedOdqId,
        role,
        type: role,
        onset: form.onset || undefined,
        duration: form.duration || undefined,
        severity: form.severity || undefined,
        triage_priority: form.triage_priority || undefined,
        character_quality: form.character_quality || undefined,
        radiation: form.radiation || undefined,
        aggravating_factors: form.aggravating_factors || undefined,
        relieving_factors: form.relieving_factors || undefined,
        associated_symptoms: form.associated_symptoms || undefined,
        notes: form.notes || undefined,
        odq_comment: form.odq_comment || undefined,
      });
      setForm({
        onset: '',
        duration: '',
        severity: '',
        triage_priority: '',
        character_quality: '',
        radiation: '',
        aggravating_factors: '',
        relieving_factors: '',
        associated_symptoms: '',
        notes: '',
        odq_comment: '',
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save symptom.');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[123] flex items-center justify-center bg-slate-900/45 px-4 py-6">
      <div className="flex h-[92vh] w-[min(1360px,99vw)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Symptoms</h3>
            <p className="text-xs text-slate-500">
              <span className="text-sm font-semibold text-slate-900">
                {asText(patientName) || 'Unknown patient'}
              </span>
              {asText(patientCode) ? (
                <span className="ml-1 text-xs font-semibold text-cyan-700">({asText(patientCode)})</span>
              ) : null}
              <span className="ml-2">· Add and view in one workspace</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
          >
            Close
          </button>
        </div>
        <div className="grid min-h-0 flex-1 gap-4 overflow-hidden p-4 lg:grid-cols-[360px,1fr,360px]">
          <aside className="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Search symptoms</p>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Name or code..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <article key={category.id} className="rounded-lg border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                    {category.name} ({category.items.length})
                  </div>
                  <div className="max-h-44 overflow-y-auto p-2">
                    {category.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedOdqId(asText(item.id))}
                        className={`btn mb-1 w-full rounded-lg border px-2 py-2 text-left text-xs ${
                          selectedOdqId === asText(item.id)
                            ? 'border-sky-300 bg-sky-100 text-sky-800'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        <p className="font-semibold">{asText(item.name) || 'Unnamed symptom'}</p>
                        <p className="text-[10px] text-slate-500">{asText(item.code)}</p>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <section className="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white p-3">
            {error ? <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div> : null}
            {loading ? <p className="text-sm text-slate-600">Loading symptom workspace...</p> : null}
            {!loading ? (
              <>
                <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedOdq ? `${asText(selectedOdq.name)} (${asText(selectedOdq.code)})` : 'Select a symptom'}
                  </p>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {(['triage', 'doctor', 'inpatient'] as RoleType[]).map((roleItem) => (
                    <button
                      key={roleItem}
                      type="button"
                      onClick={() => setRole(roleItem)}
                      className={`btn rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                        role === roleItem
                          ? 'border-sky-300 bg-sky-100 text-sky-800'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {roleItem === 'inpatient' ? 'Ward nurse' : `${roleItem} nurse`}
                    </button>
                  ))}
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Onset
                    <input
                      type="datetime-local"
                      value={form.onset}
                      onChange={(event) => setForm((prev) => ({ ...prev, onset: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-600">
                    Duration
                    <input
                      value={form.duration}
                      onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
                      placeholder="e.g. 1-6 hours"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-600">
                    Severity
                    <SearchableSelectField
                      value={form.severity}
                      onChange={(event) => setForm((prev) => ({ ...prev, severity: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Select</option>
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </SearchableSelectField>
                  </label>
                  {role === 'triage' ? (
                    <label className="text-xs font-semibold text-slate-600">
                      Triage Priority
                      <SearchableSelectField
                        value={form.triage_priority}
                        onChange={(event) => setForm((prev) => ({ ...prev, triage_priority: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="">Select</option>
                        {TRIAGE_PRIORITIES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </SearchableSelectField>
                    </label>
                  ) : null}
                  {role === 'doctor' ? (
                    <>
                      <label className="text-xs font-semibold text-slate-600">
                        Character / Quality
                        <input
                          value={form.character_quality}
                          onChange={(event) => setForm((prev) => ({ ...prev, character_quality: event.target.value }))}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="text-xs font-semibold text-slate-600">
                        Radiation
                        <input
                          value={form.radiation}
                          onChange={(event) => setForm((prev) => ({ ...prev, radiation: event.target.value }))}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="text-xs font-semibold text-slate-600 md:col-span-2">
                        Aggravating Factors
                        <input
                          value={form.aggravating_factors}
                          onChange={(event) => setForm((prev) => ({ ...prev, aggravating_factors: event.target.value }))}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="text-xs font-semibold text-slate-600 md:col-span-2">
                        Relieving Factors
                        <input
                          value={form.relieving_factors}
                          onChange={(event) => setForm((prev) => ({ ...prev, relieving_factors: event.target.value }))}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="text-xs font-semibold text-slate-600 md:col-span-2">
                        Associated Symptoms
                        <input
                          value={form.associated_symptoms}
                          onChange={(event) => setForm((prev) => ({ ...prev, associated_symptoms: event.target.value }))}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>
                    </>
                  ) : null}
                  <label className="text-xs font-semibold text-slate-600 md:col-span-2">
                    Comments
                    <textarea
                      value={form.odq_comment}
                      onChange={(event) => setForm((prev) => ({ ...prev, odq_comment: event.target.value }))}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-600 md:col-span-2">
                    Clinical Notes
                    <textarea
                      value={form.notes}
                      onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void saveSymptom()}
                    disabled={saving || !selectedOdqId}
                    className="btn rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : 'Save Symptom'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void load()}
                    disabled={loading}
                    className="btn rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    Refresh
                  </button>
                </div>
              </>
            ) : null}
          </section>

          <aside className="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">History</p>
              <p className="text-xs text-slate-500">{visibleHistory.length}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(['all', 'triage', 'doctor', 'inpatient'] as HistoryFilter[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setHistoryFilter(item)}
                  className={`btn rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                    historyFilter === item
                      ? 'border-sky-300 bg-sky-100 text-sky-800'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {item === 'all' ? 'All' : item === 'inpatient' ? 'Ward' : item}
                </button>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {visibleHistory.map((entry) => (
                <article key={entry.id} className="rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                  <p className="text-xs font-semibold text-slate-900">
                    {asText(entry.odq_name) || 'Unnamed symptom'}
                    {asText(entry.odq_code) ? ` (${asText(entry.odq_code)})` : ''}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {toDisplayDateTime(entry.date_created)} · {asText(entry.type) || 'n/a'}
                  </p>
                  <p className="mt-1 text-xs text-slate-700">
                    {[asText(entry.severity), asText(entry.duration), asText(entry.triage_priority)]
                      .filter(Boolean)
                      .join(' · ') || 'No metadata'}
                  </p>
                  {asText(entry.notes) ? <p className="mt-1 text-xs text-slate-600">{asText(entry.notes)}</p> : null}
                </article>
              ))}
              {!visibleHistory.length ? <p className="text-xs text-slate-500">No symptom records.</p> : null}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
