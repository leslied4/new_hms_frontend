import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type TrackerTab = '1' | '2' | '3' | '4';
type ViewType = 'all' | 'regular' | 'walkin';

type SpecimenRow = {
  id?: string;
  visit_id?: string;
  lab_request_id?: string;
  request_ids?: string[];
  request_date?: string;
  pathology_number?: string;
  patient_name?: string;
  patient_age?: string;
  patient_folder?: string;
  specimen_name?: string;
  specimen_color?: string;
  waiting_time?: string;
  turn_around_time?: string;
  turn_around_time_ended?: boolean;
  lab_name?: string;
  code?: string;
  sample_id?: string;
  collection_type?: string;
  specimen_volume?: string;
  specimen_condition?: string;
};

const TAB_CONFIG: Array<{ key: TrackerTab; label: string }> = [
  { key: '1', label: 'Needs your Attention' },
  { key: '2', label: 'Collected' },
  { key: '3', label: 'Received' },
  { key: '4', label: 'Report as Analysed' },
];

const asText = (value: unknown): string => String(value ?? '').trim();

const formatDate = (value?: string): string => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const softenColor = (raw: string): string => {
  const value = raw.trim();
  if (!value) return '';
  if (value.startsWith('#')) {
    const hex = value.slice(1);
    const isShort = hex.length === 3;
    const isLong = hex.length === 6;
    if (!isShort && !isLong) return value;
    const full = isShort ? hex.split('').map((c) => c + c).join('') : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return value;
    return `rgba(${r}, ${g}, ${b}, 0.14)`;
  }
  const rgbMatch = value.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(',').map((part) => part.trim());
    if (parts.length >= 3) {
      const r = Number(parts[0]);
      const g = Number(parts[1]);
      const b = Number(parts[2]);
      if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
        return `rgba(${r}, ${g}, ${b}, 0.14)`;
      }
    }
  }
  return value;
};

const normalizeType = (value: string): ViewType => {
  const key = value.trim().toLowerCase();
  if (key === 'walkin' || key === 'walkinlab' || key === 'walkin_lab') return 'walkin';
  if (key === 'regular') return 'regular';
  return 'all';
};

const toLegacyType = (value: ViewType): string => {
  if (value === 'walkin') return 'walkinlab';
  if (value === 'regular') return 'regular';
  return 'all';
};

export default function RequestLabsSpecimenTracker() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<TrackerTab>((searchParams.get('tab') as TrackerTab) || '1');
  const [viewType, setViewType] = useState<ViewType>(normalizeType(searchParams.get('type') || 'all'));
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rows, setRows] = useState<SpecimenRow[]>([]);

  const [attentionRow, setAttentionRow] = useState<SpecimenRow | null>(null);
  const [collectedRow, setCollectedRow] = useState<SpecimenRow | null>(null);
  const [receivedRow, setReceivedRow] = useState<SpecimenRow | null>(null);
  const [reportedRow, setReportedRow] = useState<SpecimenRow | null>(null);

  const [collectForm, setCollectForm] = useState({
    collection_type: '',
    other_collection_type: '',
    specimen_condition: '',
    specimen_volume: '',
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchValue(searchInput.trim());
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('tab', activeTab);
    params.set('type', viewType);
    if (searchValue) params.set('q', searchValue);
    setSearchParams(params, { replace: true });
  }, [activeTab, viewType, searchValue, setSearchParams]);

  const fetchRows = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('filter', activeTab);
      params.set('type', toLegacyType(viewType));
      if (searchValue) params.set('q', searchValue);
      const response = await api.get<SpecimenRow[]>(`/legacy/request-labs/specimen-information/?${params.toString()}`);
      setRows(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load specimen tracker data.');
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchRows();
  }, [activeTab, viewType, searchValue]);

  const requestIdsForRow = (row: SpecimenRow): string => {
    if (Array.isArray(row.request_ids) && row.request_ids.length > 0) {
      return row.request_ids.map((item) => asText(item)).filter(Boolean).join(',');
    }
    return asText(row.lab_request_id);
  };

  const closeModals = () => {
    setAttentionRow(null);
    setCollectedRow(null);
    setReceivedRow(null);
    setReportedRow(null);
  };

  const submitCollect = async (event: FormEvent) => {
    event.preventDefault();
    if (!attentionRow) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-labs/update-collected-specimen/', {
        sample_id: attentionRow.sample_id,
        request_id: requestIdsForRow(attentionRow),
        collection_type: collectForm.collection_type,
        other_collection_type: collectForm.other_collection_type,
        specimen_condition: collectForm.specimen_condition,
        specimen_volume: collectForm.specimen_volume,
      });
      setSuccess('Sample collection saved.');
      setCollectForm({ collection_type: '', other_collection_type: '', specimen_condition: '', specimen_volume: '' });
      closeModals();
      await fetchRows();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save collection details.');
    } finally {
      setIsSaving(false);
    }
  };

  const markReceived = async () => {
    if (!collectedRow) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-labs/update-received-specimen/', {
        sample_id: collectedRow.sample_id,
        request_id: requestIdsForRow(collectedRow),
      });
      setSuccess('Specimen received and TAT started.');
      closeModals();
      await fetchRows();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to mark specimen as received.');
    } finally {
      setIsSaving(false);
    }
  };

  const endTurnAround = async () => {
    if (!receivedRow) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-labs/end-lab-turn-around-time/', {
        sample_id: receivedRow.sample_id,
        request_id: requestIdsForRow(receivedRow),
      });
      setSuccess('Turn around time ended.');
      closeModals();
      await fetchRows();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to end turn around time.');
    } finally {
      setIsSaving(false);
    }
  };

  const markReported = async () => {
    if (!receivedRow) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-labs/update-reported-specimen/', {
        sample_id: receivedRow.sample_id,
        request_id: requestIdsForRow(receivedRow),
      });
      setSuccess('Specimen marked as reported and analysed.');
      closeModals();
      await fetchRows();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to mark specimen as reported.');
    } finally {
      setIsSaving(false);
    }
  };

  const pageTitle = useMemo(() => {
    if (viewType === 'walkin') return 'Specimen Tracker - Walk-In';
    if (viewType === 'regular') return 'Specimen Tracker - Regular';
    return 'Specimen Tracker';
  }, [viewType]);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Request Labs</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setViewType('all')} className={`rounded-full border px-3 py-1 text-xs font-semibold ${viewType === 'all' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>All</button>
            <button type="button" onClick={() => setViewType('regular')} className={`rounded-full border px-3 py-1 text-xs font-semibold ${viewType === 'regular' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>Regular</button>
            <button type="button" onClick={() => setViewType('walkin')} className={`rounded-full border px-3 py-1 text-xs font-semibold ${viewType === 'walkin' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'}`}>Walk-In</button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${activeTab === tab.key
                ? 'border-sky-500 bg-sky-50 text-sky-700'
                : 'border-slate-300 bg-white text-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search patient, folder, pathology no, specimen, lab test..."
            className="w-full max-w-xl rounded-lg border border-slate-300 px-3 py-2 text-xs"
          />
        </div>
      </section>

      {error ? <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Date Created</th>
                <th className="px-3 py-2 text-left font-semibold">Pathology No.</th>
                <th className="px-3 py-2 text-left font-semibold">Patient</th>
                <th className="px-3 py-2 text-left font-semibold">Specimen</th>
                <th className="px-3 py-2 text-left font-semibold">Waiting/TAT</th>
                <th className="px-3 py-2 text-left font-semibold">Lab Tests</th>
                <th className="px-3 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-slate-500">No records found.</td>
                </tr>
              ) : null}
              {rows.map((row, index) => {
                const specimenBg = asText(row.specimen_color);
                const softenedBg = specimenBg ? softenColor(specimenBg) : '';
                return (
                  <tr key={`${asText(row.id)}-${asText(row.sample_id)}-${index}`} className="border-t border-slate-100" style={softenedBg ? { backgroundColor: softenedBg } : undefined}>
                    <td className="px-3 py-2">{formatDate(row.request_date)}</td>
                    <td className="px-3 py-2">{asText(row.pathology_number) || '-'}</td>
                    <td className="px-3 py-2">
                      <div>{asText(row.patient_name) || '-'}</div>
                      <div className="text-[11px] text-slate-600">{asText(row.patient_age)} yrs • {asText(row.patient_folder)}</div>
                    </td>
                    <td className="px-3 py-2">{asText(row.specimen_name) || '-'}</td>
                    <td className="px-3 py-2">{activeTab === '3' || activeTab === '4' ? (asText(row.turn_around_time) || '-') : (asText(row.waiting_time) || '-')}</td>
                    <td className="px-3 py-2">{asText(row.lab_name) || '-'}</td>
                    <td className="px-3 py-2">
                      {activeTab === '1' ? (
                        <button type="button" onClick={() => setAttentionRow(row)} className="rounded-md border border-sky-400 bg-sky-500 px-2 py-1 text-[11px] font-semibold text-white">Collect</button>
                      ) : null}
                      {activeTab === '2' ? (
                        <button type="button" onClick={() => setCollectedRow(row)} className="rounded-md border border-sky-400 bg-sky-500 px-2 py-1 text-[11px] font-semibold text-white">Receive</button>
                      ) : null}
                      {activeTab === '3' ? (
                        <button type="button" onClick={() => setReceivedRow(row)} className="rounded-md border border-sky-400 bg-sky-500 px-2 py-1 text-[11px] font-semibold text-white">Process</button>
                      ) : null}
                      {activeTab === '4' ? (
                        <button type="button" onClick={() => setReportedRow(row)} className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700">View</button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-slate-500">Loading...</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {attentionRow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">Collect Specimen - {asText(attentionRow.specimen_name)}</h3>
            <p className="mt-1 text-xs text-slate-600">Patient: {asText(attentionRow.patient_name)}</p>
            <form className="mt-4 space-y-3" onSubmit={submitCollect}>
              <SearchableSelect
                value={collectForm.collection_type}
                onChange={(value) => setCollectForm((prev) => ({ ...prev, collection_type: value }))}
                options={[
                  { value: 'Venipuncture', label: 'Venipuncture' },
                  { value: 'Swab', label: 'Swab' },
                  { value: 'Tissue Biopsy', label: 'Tissue Biopsy' },
                  { value: 'Saliva Collection', label: 'Saliva Collection' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select collection type"
              />
              {collectForm.collection_type === 'other' ? (
                <input value={collectForm.other_collection_type} onChange={(event) => setCollectForm((prev) => ({ ...prev, other_collection_type: event.target.value }))} placeholder="Specify other collection type" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs" required />
              ) : null}
              <SearchableSelect
                value={collectForm.specimen_condition}
                onChange={(value) => setCollectForm((prev) => ({ ...prev, specimen_condition: value }))}
                options={[
                  { value: 'Adequate Volume', label: 'Adequate Volume' },
                  { value: 'Properly Labeled', label: 'Properly Labeled' },
                  { value: 'No Leakage', label: 'No Leakage' },
                  { value: 'Correct Container Used', label: 'Correct Container Used' },
                  { value: 'On Ice', label: 'On Ice' },
                  { value: 'Refrigerated', label: 'Refrigerated (2–8°C)' },
                  { value: 'Room Tempature', label: 'Room Temp' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select specimen condition"
              />
              <input type="number" step="0.1" min="0" value={collectForm.specimen_volume} onChange={(event) => setCollectForm((prev) => ({ ...prev, specimen_volume: event.target.value }))} placeholder="Specimen volume (mL)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModals} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
                <button type="submit" disabled={isSaving} className="rounded-lg border border-sky-400 bg-sky-500 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">Confirm Collection</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {collectedRow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">Confirm Receipt - {asText(collectedRow.specimen_name)}</h3>
            <div className="mt-3 space-y-1 text-xs text-slate-700">
              <p>Patient: {asText(collectedRow.patient_name)}</p>
              <p>Collection Type: {asText(collectedRow.collection_type) || '-'}</p>
              <p>Condition: {asText(collectedRow.specimen_condition) || '-'}</p>
              <p>Volume: {asText(collectedRow.specimen_volume) || '-'} mL</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={closeModals} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
              <button type="button" onClick={markReceived} disabled={isSaving} className="rounded-lg border border-sky-400 bg-sky-500 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">Confirm Receipt & Start TAT</button>
            </div>
          </div>
        </div>
      ) : null}

      {receivedRow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">Process Specimen - {asText(receivedRow.specimen_name)}</h3>
            <div className="mt-3 space-y-1 text-xs text-slate-700">
              <p>Patient: {asText(receivedRow.patient_name)}</p>
              <p>Turn Around Time: {asText(receivedRow.turn_around_time) || '-'}</p>
              <p>Collection Type: {asText(receivedRow.collection_type) || '-'}</p>
              <p>Condition: {asText(receivedRow.specimen_condition) || '-'}</p>
              <p>Volume: {asText(receivedRow.specimen_volume) || '-'} mL</p>
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {!receivedRow.turn_around_time_ended ? (
                <button type="button" onClick={endTurnAround} disabled={isSaving} className="rounded-lg border border-amber-300 bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-800 disabled:cursor-not-allowed disabled:opacity-60">End Turn Around Time</button>
              ) : null}
              <button type="button" onClick={markReported} disabled={isSaving} className="rounded-lg border border-emerald-300 bg-emerald-500 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">Mark as Reported</button>
              <button type="button" onClick={closeModals} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Close</button>
            </div>
          </div>
        </div>
      ) : null}

      {reportedRow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">Reported Specimen - {asText(reportedRow.specimen_name)}</h3>
            <div className="mt-3 space-y-1 text-xs text-slate-700">
              <p>Patient: {asText(reportedRow.patient_name)}</p>
              <p>Turn Around Time: {asText(reportedRow.turn_around_time) || '-'}</p>
              <p>Collection Type: {asText(reportedRow.collection_type) || '-'}</p>
              <p>Condition: {asText(reportedRow.specimen_condition) || '-'}</p>
              <p>Volume: {asText(reportedRow.specimen_volume) || '-'} mL</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button type="button" onClick={closeModals} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
