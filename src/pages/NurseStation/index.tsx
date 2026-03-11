import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import NurseHandoffModal from '../../components/NurseHandoffModal';
import NurseSymptomsModal from '../../components/NurseSymptomsModal';

type NurseTask = {
  id: string;
  title?: string;
  patient_id?: string;
  patient_name?: string;
  patient_code?: string;
  visit_id?: string;
  ward?: string;
  bed?: string;
  assigned_nurse?: string;
  status?: string;
  priority?: string;
  frequency?: string;
  instruction?: string;
  dose?: string;
  rate?: string;
  volume?: string;
  progress?: string;
  scheduled_for?: string | null;
  date_created?: string | null;
};

type NurseTimelineItem = {
  id: string;
  type?: string;
  title?: string;
  patient_name?: string;
  patient_id?: string;
  visit_id?: string;
  ward?: string;
  scheduled_for?: string | null;
  status?: string;
  priority?: string;
  assigned_nurse?: string;
};

type NurseStationPayload = {
  wards?: Array<{ id: string; name: string }>;
  timeline?: NurseTimelineItem[];
  groups?: {
    flowsheet?: NurseTask[];
    medication_administration?: NurseTask[];
    infusions?: NurseTask[];
    labs?: NurseTask[];
    scans?: NurseTask[];
  };
  summary?: {
    admitted_patients?: number;
    active_visits?: number;
    flowsheet?: number;
    medication_administration?: number;
    infusions?: number;
    labs?: number;
    scans?: number;
  };
  patient_visit_notes?: PatientVisitNoteRow[];
};

type TaskGroupKey = 'flowsheet' | 'medication_administration' | 'infusions' | 'labs' | 'scans';
type NurseTabKey = 'workboard' | 'notes';
type ActionModalState = {
  title: string;
  path: string;
};
type NurseNotesModalState = {
  patientId: string;
  visitId: string;
  visitDate?: string | null;
  patientName: string;
  patientCode: string;
  ward?: string;
  bed?: string;
  gender?: string;
  age?: number | null;
};
type NurseNoteRecord = {
  id: string;
  note_type?: string;
  title?: string;
  notes?: string;
  date_added?: string | null;
  user_id?: string;
  user_name?: string;
  user_role?: string;
};
type NurseHandoffModalState = {
  visitId: string;
  patientId: string;
};
type NurseSymptomsModalState = {
  visitId: string;
  patientId: string;
  patientName?: string;
  patientCode?: string;
};

type PatientVisitNoteRow = {
  visit_id: string;
  visit_date?: string | null;
  patient_id: string;
  patient_name?: string;
  patient_code?: string;
  patient_gender_id?: string;
  patient_folder_number?: string;
  date_of_birth?: string | null;
  ward?: string;
  bed?: string;
  recent_activity?: {
    latest_vital_at?: string | null;
    latest_note_at?: string | null;
    latest_symptom_at?: string | null;
  };
  alerts?: Array<{ type?: string; message?: string }>;
  action_list?: {
    task_description?: string;
    priority?: string;
  };
  working_diagnosis?: Array<{
    label?: string;
    name?: string;
    code?: string;
    is_cleared?: boolean;
  }>;
  consult_referral?: {
    consultation_name?: string;
    specialty_name?: string;
    reason?: string;
    date_created?: string | null;
  } | null;
  counts?: {
    nurse_notes?: number;
    symptoms?: number;
    diagnoses?: number;
  };
};

const GROUP_META: Array<{ key: TaskGroupKey; label: string; tone: string; chip: string; accent: string }> = [
  { key: 'medication_administration', label: 'Medication Administration', tone: 'border-rose-200 bg-rose-50/80', chip: 'border-rose-200 bg-rose-100 text-rose-700', accent: 'border-l-rose-300' },
  { key: 'infusions', label: 'Infusions', tone: 'border-purple-200 bg-purple-50/80', chip: 'border-purple-200 bg-purple-100 text-purple-700', accent: 'border-l-purple-300' },
  { key: 'labs', label: 'Lab Requests', tone: 'border-cyan-200 bg-cyan-50/80', chip: 'border-cyan-200 bg-cyan-100 text-cyan-700', accent: 'border-l-cyan-300' },
  { key: 'scans', label: 'Scan Requests', tone: 'border-indigo-200 bg-indigo-50/80', chip: 'border-indigo-200 bg-indigo-100 text-indigo-700', accent: 'border-l-indigo-300' },
  { key: 'flowsheet', label: 'Flow Sheets', tone: 'border-emerald-200 bg-emerald-50/80', chip: 'border-emerald-200 bg-emerald-100 text-emerald-700', accent: 'border-l-emerald-300' },
];

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

function toDayKey(value?: string | null): string {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().slice(0, 10);
}

function matches(text: string, query: string): boolean {
  if (!query) return true;
  return text.toLowerCase().includes(query);
}

function statusPill(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized.includes('complete')) return 'border-emerald-200 bg-emerald-100 text-emerald-700';
  if (normalized.includes('cancel') || normalized.includes('declin')) return 'border-rose-200 bg-rose-100 text-rose-700';
  if (normalized.includes('progress') || normalized.includes('start')) return 'border-amber-200 bg-amber-100 text-amber-700';
  return 'border-slate-200 bg-slate-100 text-slate-700';
}

function groupMetaForType(type: string) {
  const normalized = asText(type).toLowerCase();
  return GROUP_META.find((entry) => entry.key === normalized) || GROUP_META[0];
}

function renderSemicolonLines(value: unknown, fallback = 'N/A') {
  const text = asText(value);
  if (!text) return <span>{fallback}</span>;
  const parts = text
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);
  if (!parts.length) return <span>{fallback}</span>;
  return (
    <div className="space-y-0.5">
      {parts.map((part, index) => (
        <p key={`${part}-${index}`}>{part}</p>
      ))}
    </div>
  );
}

export default function NurseStationIndexPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NurseStationPayload>({});
  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('');
  const [activeTab, setActiveTab] = useState<NurseTabKey>('workboard');
  const [actionModal, setActionModal] = useState<ActionModalState | null>(null);
  const [handoffModal, setHandoffModal] = useState<NurseHandoffModalState | null>(null);
  const [symptomsModal, setSymptomsModal] = useState<NurseSymptomsModalState | null>(null);
  const [nurseNotesModal, setNurseNotesModal] = useState<NurseNotesModalState | null>(null);
  const [nurseNotes, setNurseNotes] = useState<NurseNoteRecord[]>([]);
  const [nurseNotesLoading, setNurseNotesLoading] = useState(false);
  const [nurseNotesError, setNurseNotesError] = useState<string | null>(null);
  const [nurseNotesSaving, setNurseNotesSaving] = useState(false);
  const [nurseNoteTitle, setNurseNoteTitle] = useState('');
  const [nurseNoteBody, setNurseNoteBody] = useState('');
  const [editingNoteId, setEditingNoteId] = useState('');
  const [editingNoteTitle, setEditingNoteTitle] = useState('');
  const [editingNoteBody, setEditingNoteBody] = useState('');
  const [noteTypeFilter, setNoteTypeFilter] = useState<'all' | 'nurse' | 'doctor'>('all');
  const [expanded, setExpanded] = useState<Record<TaskGroupKey, boolean>>({
    medication_administration: true,
    infusions: false,
    labs: true,
    scans: false,
    flowsheet: false,
  });

  const loadData = useCallback(async () => {
    const response = await api.get<NurseStationPayload>('/legacy/nurse-station/index/');
    setData(response || {});
  }, []);

  const loadNurseNotes = useCallback(async (visitId: string) => {
    setNurseNotesLoading(true);
    setNurseNotesError(null);
    try {
      const response = await api.get<{ ok?: boolean; notes?: NurseNoteRecord[] }>(
        `/legacy/patient-visit-nurse-notes/get-all-nurse-notes/?visit_id=${encodeURIComponent(visitId)}`,
      );
      setNurseNotes(Array.isArray(response?.notes) ? response.notes : []);
    } catch (err) {
      setNurseNotesError(err instanceof Error ? err.message : 'Unable to load notes.');
    } finally {
      setNurseNotesLoading(false);
    }
  }, []);

  const openNurseNotesModal = useCallback((row: PatientVisitNoteRow) => {
    const visitId = asText(row.visit_id);
    const patientId = asText(row.patient_id);
    const genderLabel = asText(row.patient_gender_id) === '1' ? 'Male' : asText(row.patient_gender_id) === '2' ? 'Female' : '';
    const birth = row.date_of_birth ? new Date(row.date_of_birth) : null;
    const age = birth && !Number.isNaN(birth.getTime()) ? Math.floor((Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : null;
    setNurseNotesModal({
      visitId,
      patientId,
      visitDate: row.visit_date || null,
      patientName: asText(row.patient_name) || 'Unknown patient',
      patientCode: asText(row.patient_code),
      ward: asText(row.ward),
      bed: asText(row.bed),
      gender: genderLabel,
      age,
    });
    setNurseNoteTitle('');
    setNurseNoteBody('');
    setEditingNoteId('');
    setEditingNoteTitle('');
    setEditingNoteBody('');
    setNoteTypeFilter('all');
    void loadNurseNotes(visitId);
  }, [loadNurseNotes]);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      setError(null);
      try {
        await loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load nurse station.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadData]);

  const query = search.trim().toLowerCase();
  const groups = data.groups || {};
  const timeline = Array.isArray(data.timeline) ? data.timeline : [];

  const filteredTimeline = useMemo(() => {
    return timeline.filter((item) => {
      const ward = asText(item.ward);
      const text = [
        asText(item.title),
        asText(item.patient_name),
        asText(item.status),
        asText(item.priority),
        ward,
      ].join(' ');
      if (wardFilter && ward !== wardFilter) return false;
      return matches(text, query);
    });
  }, [query, timeline, wardFilter]);

  const timelineBuckets = useMemo(() => {
    const bucketMap = new Map<string, NurseTimelineItem[]>();
    filteredTimeline.forEach((item) => {
      const key = toDayKey(item.scheduled_for) || 'unscheduled';
      const list = bucketMap.get(key) || [];
      list.push(item);
      bucketMap.set(key, list);
    });
    return Array.from(bucketMap.entries())
      .sort((left, right) => {
        if (left[0] === 'unscheduled') return 1;
        if (right[0] === 'unscheduled') return -1;
        return left[0].localeCompare(right[0]);
      })
      .map(([dateKey, rows]) => ({
        dateKey,
        label: dateKey === 'unscheduled' ? 'Unscheduled' : toDisplayDateTime(`${dateKey}T00:00:00`),
        rows: rows.slice().sort((a, b) => {
          const left = new Date(asText(a.scheduled_for)).getTime();
          const right = new Date(asText(b.scheduled_for)).getTime();
          if (!Number.isFinite(left)) return 1;
          if (!Number.isFinite(right)) return -1;
          return left - right;
        }),
      }));
  }, [filteredTimeline]);

  const filteredGroups = useMemo(() => {
    const next: Record<TaskGroupKey, NurseTask[]> = {
      flowsheet: [],
      medication_administration: [],
      infusions: [],
      labs: [],
      scans: [],
    };
    (Object.keys(next) as TaskGroupKey[]).forEach((key) => {
      const rows = Array.isArray(groups[key]) ? groups[key] : [];
      next[key] = rows.filter((row) => {
        const ward = asText(row.ward);
        const text = [
          asText(row.title),
          asText(row.patient_name),
          asText(row.patient_code),
          asText(row.status),
          asText(row.priority),
          asText(row.assigned_nurse),
          ward,
        ].join(' ');
        if (wardFilter && ward !== wardFilter) return false;
        return matches(text, query);
      });
    });
    return next;
  }, [groups, query, wardFilter]);

  const summary = data.summary || {};
  const wards = Array.isArray(data.wards) ? data.wards : [];
  const patientVisitNotes = Array.isArray(data.patient_visit_notes) ? data.patient_visit_notes : [];
  const openActionModal = (title: string, path: string) => setActionModal({ title, path });

  const filteredPatientVisitNotes = useMemo(() => {
    return patientVisitNotes.filter((item) => {
      const ward = asText(item.ward);
      const text = [
        asText(item.patient_name),
        asText(item.patient_code),
        asText(item.patient_folder_number),
        asText(item.action_list?.task_description),
        asText(item.action_list?.priority),
        asText(item.consult_referral?.consultation_name),
        asText(item.consult_referral?.specialty_name),
        asText(item.working_diagnosis?.map((diag) => `${asText(diag.name)} ${asText(diag.code)}`).join(' ')),
        asText(item.alerts?.map((alert) => asText(alert.message)).join(' ')),
        ward,
      ].join(' ');
      if (wardFilter && ward !== wardFilter) return false;
      return matches(text, query);
    });
  }, [patientVisitNotes, query, wardFilter]);

  const saveNurseNote = useCallback(async () => {
    if (!nurseNotesModal) return;
    const trimmedNotes = nurseNoteBody.trim();
    if (!trimmedNotes) {
      setNurseNotesError('Note details are required.');
      return;
    }
    setNurseNotesSaving(true);
    setNurseNotesError(null);
    try {
      await api.post('/legacy/patient-visit-nurse-notes/add-nurse-note/', {
        patient_id: nurseNotesModal.patientId,
        visit_id: nurseNotesModal.visitId,
        title: nurseNoteTitle.trim(),
        notes: trimmedNotes,
      });
      setNurseNoteTitle('');
      setNurseNoteBody('');
      await loadNurseNotes(nurseNotesModal.visitId);
    } catch (err) {
      setNurseNotesError(err instanceof Error ? err.message : 'Unable to save note.');
    } finally {
      setNurseNotesSaving(false);
    }
  }, [loadNurseNotes, nurseNoteBody, nurseNoteTitle, nurseNotesModal]);

  const beginEditNote = useCallback((note: NurseNoteRecord) => {
    setEditingNoteId(asText(note.id));
    setEditingNoteTitle(asText(note.title));
    setEditingNoteBody(asText(note.notes));
  }, []);

  const cancelEditNote = useCallback(() => {
    setEditingNoteId('');
    setEditingNoteTitle('');
    setEditingNoteBody('');
  }, []);

  const saveEditNote = useCallback(async () => {
    if (!nurseNotesModal || !editingNoteId) return;
    const trimmed = editingNoteBody.trim();
    if (!trimmed) {
      setNurseNotesError('Note details are required.');
      return;
    }
    setNurseNotesSaving(true);
    setNurseNotesError(null);
    try {
      await api.post('/legacy/patient-visit-nurse-notes/edit-nurse-note/', {
        id: editingNoteId,
        title: editingNoteTitle.trim(),
        notes: trimmed,
      });
      cancelEditNote();
      await loadNurseNotes(nurseNotesModal.visitId);
    } catch (err) {
      setNurseNotesError(err instanceof Error ? err.message : 'Unable to update note.');
    } finally {
      setNurseNotesSaving(false);
    }
  }, [cancelEditNote, editingNoteBody, editingNoteId, editingNoteTitle, loadNurseNotes, nurseNotesModal]);

  const visibleNurseNotes = useMemo(() => {
    if (noteTypeFilter === 'all') return nurseNotes;
    return nurseNotes.filter((note) => asText(note.note_type).toLowerCase() === noteTypeFilter);
  }, [noteTypeFilter, nurseNotes]);

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-600">Loading nurse station...</div>;
  }

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Home</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Nurse Station</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Live admitted-care workspace with timeline and task groups for medication administration, labs, scans, infusions, and flow sheets.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void loadData()}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Refresh
            </button>
          </div>
        </div>
        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Admitted Patients</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.admitted_patients || 0}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Active Visits</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.active_visits || 0}</p>
          </article>
          {GROUP_META.map((item) => (
            <article key={item.key} className={`rounded-2xl border px-4 py-3 ${item.tone}`}>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{(summary as Record<string, number | undefined>)[item.key] || 0}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Search
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Patient, task, ward, status..."
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Ward
            <SearchableSelectField
              value={wardFilter}
              onChange={(event) => setWardFilter(event.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
            >
              <option value="">All wards</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.name}>
                  {ward.name}
                </option>
              ))}
            </SearchableSelectField>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('workboard')}
            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
              activeTab === 'workboard'
                ? 'border-sky-300 bg-sky-100 text-sky-800'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            Workboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
              activeTab === 'notes'
                ? 'border-violet-300 bg-violet-100 text-violet-800'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            Patient Visit Notes
          </button>
        </div>
      </section>

      {activeTab === 'workboard' ? (
      <>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Timeline</h2>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{filteredTimeline.length} events</p>
        </div>
        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-3">
            {timelineBuckets.map((bucket) => (
              <article key={bucket.dateKey} className="w-72 shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{bucket.label}</p>
                <div className="mt-2 space-y-2">
                  {bucket.rows.map((item) => (
                    <button
                      key={`${bucket.dateKey}-${item.type}-${item.id}`}
                      type="button"
                      className={`w-full rounded-xl border border-slate-200 border-l-4 bg-white px-3 py-2 text-left text-xs ${groupMetaForType(asText(item.type)).accent}`}
                    >
                      <p className="flex items-center gap-2">
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${groupMetaForType(asText(item.type)).chip}`}>
                          {groupMetaForType(asText(item.type)).label}
                        </span>
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">{asText(item.title) || 'Request'}</p>
                      <p className="text-slate-600">{asText(item.patient_name) || 'Unknown patient'}</p>
                      <p className="mt-1 flex items-center gap-2 text-slate-500">
                        {toDisplayDateTime(item.scheduled_for)} · {asText(item.status) || 'Pending'}
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusPill(asText(item.status) || 'Pending')}`}>
                          {asText(item.status) || 'Pending'}
                        </span>
                      </p>
                    </button>
                  ))}
                  {!bucket.rows.length ? <p className="text-xs text-slate-500">No tasks</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {GROUP_META.map((group) => {
          const rows = filteredGroups[group.key] || [];
          const open = expanded[group.key];
          return (
            <article key={group.key} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setExpanded((current) => ({ ...current, [group.key]: !current[group.key] }))}
                className={`flex w-full items-center justify-between border-l-4 px-5 py-4 text-left ${group.accent}`}
              >
                <div>
                  <p className="flex items-center gap-2 text-base font-semibold text-slate-900">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${group.chip}`}>
                      {group.label}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">{rows.length} records</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{open ? 'Hide' : 'Show'}</span>
              </button>
              {open ? (
                <div className="border-t border-slate-200 px-5 pb-5 pt-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                          <th className="px-2 py-2">Task</th>
                          <th className="px-2 py-2">Patient</th>
                          <th className="px-2 py-2">Location</th>
                          <th className="px-2 py-2">Schedule</th>
                          <th className="px-2 py-2">Status</th>
                          <th className="px-2 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr key={`${group.key}-${row.id}`} className={`border-t border-slate-100 border-l-4 align-top ${group.accent}`}>
                            <td className="px-2 py-3">
                              <p className="font-semibold text-slate-900">{asText(row.title) || 'Request'}</p>
                              <p className="text-xs text-slate-500">
                                {[asText(row.frequency), asText(row.dose), asText(row.priority)].filter(Boolean).join(' · ') || 'No extra details'}
                              </p>
                            </td>
                            <td className="px-2 py-3">
                              <p className="font-medium text-slate-800">{asText(row.patient_name) || 'Unknown patient'}</p>
                              <p className="text-xs text-slate-500">{asText(row.patient_code) || 'No code'}</p>
                            </td>
                            <td className="px-2 py-3 text-xs text-slate-600">
                              <p>{asText(row.ward) || 'No ward'}</p>
                              <p>{asText(row.bed) || 'No bed'}</p>
                              <p>{asText(row.assigned_nurse) || 'No nurse assigned'}</p>
                            </td>
                            <td className="px-2 py-3 text-xs text-slate-600">
                              <p>{toDisplayDateTime(row.scheduled_for)}</p>
                            </td>
                            <td className="px-2 py-3 text-xs">
                              <span className={`inline-flex rounded-full border px-2 py-1 font-semibold ${statusPill(asText(row.status) || 'Pending')}`}>
                                {asText(row.status) || 'Pending'}
                              </span>
                            </td>
                            <td className="px-2 py-3">
                              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                                {asText(row.patient_id) ? (
                                  <Link
                                    to={`/Patients/view_patient?patient_id=${encodeURIComponent(asText(row.patient_id))}`}
                                    className="btn inline-flex cursor-pointer items-center rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-sky-700 shadow-sm"
                                  >
                                    View Patient
                                  </Link>
                                ) : null}
                                {asText(row.visit_id) && asText(row.patient_id) ? (
                                  <Link
                                    to={`/Patients/visit_space?patient_id=${encodeURIComponent(asText(row.patient_id))}&visit_id=${encodeURIComponent(asText(row.visit_id))}`}
                                    className="btn inline-flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-slate-700 shadow-sm"
                                  >
                                    Open Visit Space
                                  </Link>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!rows.length ? (
                          <tr>
                            <td colSpan={6} className="px-2 py-6 text-center text-sm text-slate-500">
                              No records match current filters.
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
      </>
      ) : null}

      {activeTab === 'notes' ? (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Patient Visit Notes</h2>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{filteredPatientVisitNotes.length} records</p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-fixed text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                <th className="px-2 py-2">Patient</th>
                <th className="px-2 py-2">Ward / Bed</th>
                <th className="px-2 py-2">Recent Activity</th>
                <th className="px-2 py-2">Alerts</th>
                <th className="px-2 py-2">Action List</th>
                <th className="px-2 py-2">Working Diagnosis</th>
                <th className="px-2 py-2">Consult / Referral</th>
                <th className="w-[170px] px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatientVisitNotes.map((row) => {
                const genderLabel = asText(row.patient_gender_id) === '1' ? 'Male' : asText(row.patient_gender_id) === '2' ? 'Female' : '';
                const birth = row.date_of_birth ? new Date(row.date_of_birth) : null;
                const age = birth && !Number.isNaN(birth.getTime()) ? Math.floor((Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : null;
                const diagnoses = Array.isArray(row.working_diagnosis) ? row.working_diagnosis : [];
                const alerts = Array.isArray(row.alerts) ? row.alerts : [];
                return (
                  <tr key={row.visit_id} className="border-t border-slate-100 align-top">
                    <td className="px-2 py-3">
                      <p className="font-semibold text-slate-900">{asText(row.patient_name) || 'Unknown patient'}</p>
                      <p className="text-xs text-slate-500">
                        {[asText(row.patient_code), asText(row.patient_folder_number)].filter(Boolean).join(' · ') || 'No identifiers'}
                      </p>
                      <p className="mt-1 flex flex-wrap gap-1 text-[10px]">
                        {genderLabel ? <span className="rounded-full border border-sky-200 bg-sky-100 px-2 py-0.5 text-sky-700">{genderLabel}</span> : null}
                        {age !== null ? <span className="rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-emerald-700">{age}y</span> : null}
                      </p>
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-600">
                      <p>{asText(row.ward) || 'No ward'}</p>
                      <p>{asText(row.bed) || 'No bed'}</p>
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-600">
                      <p>Vitals: {toDisplayDateTime(row.recent_activity?.latest_vital_at)}</p>
                      <p>Note: {toDisplayDateTime(row.recent_activity?.latest_note_at)}</p>
                      <p>Symptom: {toDisplayDateTime(row.recent_activity?.latest_symptom_at)}</p>
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-600">
                      {alerts.length ? (
                        <div className="flex flex-wrap gap-1">
                          {alerts.map((alert, index) => (
                            <span key={`${row.visit_id}-alert-${index}`} className="rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800">
                              {asText(alert.message)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">No active alerts</span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-600">
                      {renderSemicolonLines(row.action_list?.task_description, 'No action list')}
                      {asText(row.action_list?.priority) ? (
                        <span className="mt-1 inline-flex rounded-full border border-rose-200 bg-rose-100 px-2 py-0.5 text-[10px] text-rose-700">
                          {asText(row.action_list?.priority)}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-600">
                      {diagnoses.length ? (
                        <ul className="space-y-1">
                          {diagnoses.slice(0, 4).map((diag, index) => (
                            <li key={`${row.visit_id}-diag-${index}`}>
                              <span className="font-semibold text-slate-700">{asText(diag.label)}:</span> {asText(diag.name) || 'N/A'} {asText(diag.code) ? `(${asText(diag.code)})` : ''}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-slate-400">No diagnosis</span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-600">
                      <p>{asText(row.consult_referral?.consultation_name) || 'No consultation'}</p>
                      <p>{asText(row.consult_referral?.specialty_name)}</p>
                      {renderSemicolonLines(row.consult_referral?.reason, '')}
                    </td>
                    <td className="w-[170px] px-2 py-3">
                      <div className="flex w-[150px] flex-col gap-1.5 text-[11px] font-semibold">
                        <button
                          type="button"
                          onClick={() => openNurseNotesModal(row)}
                          className="btn inline-flex items-center justify-center rounded-lg border border-sky-200 bg-sky-50 px-2 py-1 text-sky-700"
                        >
                          Notes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHandoffModal({ visitId: asText(row.visit_id), patientId: asText(row.patient_id) })}
                          className="btn inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700"
                        >
                          Handoff
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSymptomsModal({
                              visitId: asText(row.visit_id),
                              patientId: asText(row.patient_id),
                              patientName: asText(row.patient_name),
                              patientCode: asText(row.patient_code),
                            })
                          }
                          className="btn inline-flex items-center justify-center rounded-lg border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-fuchsia-700"
                        >
                          Symptoms
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!filteredPatientVisitNotes.length ? (
                <tr>
                  <td colSpan={8} className="px-2 py-6 text-center text-sm text-slate-500">
                    No patient visit notes match current filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
      ) : null}

      {nurseNotesModal ? (
        <div className="fixed inset-0 z-[121] flex items-center justify-center bg-slate-900/45 px-4 py-6 backdrop-blur-[1px]">
          <div className="flex h-[88vh] w-[min(1100px,98vw)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Notes</h3>
                <p className="text-xs text-slate-500">Doctor and nurse notes for current visit</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNurseNotesModal(null);
                  setNurseNotesError(null);
                  setEditingNoteId('');
                  setNoteTypeFilter('all');
                }}
                className="btn inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
              >
                Close
              </button>
            </div>
            <div className="grid h-full min-h-0 gap-4 overflow-hidden p-4 lg:grid-cols-[360px,1fr]">
              <section className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="mb-3 rounded-xl border border-cyan-200 bg-cyan-50/70 px-3 py-2">
                  <p className="text-base font-semibold text-slate-900">{nurseNotesModal.patientName}</p>
                  <p className="text-xs text-slate-600">
                    {nurseNotesModal.patientCode || 'No code'}
                    {nurseNotesModal.gender ? ` · ${nurseNotesModal.gender}` : ''}
                    {nurseNotesModal.age !== null && nurseNotesModal.age !== undefined ? ` · ${nurseNotesModal.age}y` : ''}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Visit: {toDisplayDateTime(nurseNotesModal.visitDate)}
                    {(nurseNotesModal.ward || nurseNotesModal.bed) ? ` · ${nurseNotesModal.ward || 'No ward'} / ${nurseNotesModal.bed || 'No bed'}` : ''}
                  </p>
                </div>
                <h4 className="text-sm font-semibold text-slate-900">Add Nurse Note</h4>
                <div className="mt-3 space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Title</span>
                    <input
                      value={nurseNoteTitle}
                      onChange={(event) => setNurseNoteTitle(event.target.value)}
                      placeholder="Short heading"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Notes</span>
                    <textarea
                      value={nurseNoteBody}
                      onChange={(event) => setNurseNoteBody(event.target.value)}
                      placeholder="Enter nursing note"
                      rows={8}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    />
                  </label>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void saveNurseNote()}
                    disabled={nurseNotesSaving}
                    className="btn inline-flex items-center rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60"
                  >
                    {nurseNotesSaving ? 'Saving...' : 'Save Note'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void loadNurseNotes(nurseNotesModal.visitId)}
                    disabled={nurseNotesLoading}
                    className="btn inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-60"
                  >
                    Refresh
                  </button>
                </div>
                {nurseNotesError ? (
                  <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{nurseNotesError}</p>
                ) : null}
              </section>
              <section className="min-h-0 rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-900">Saved Notes</h4>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setNoteTypeFilter('all')}
                      className={`btn rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${noteTypeFilter === 'all' ? 'border-slate-300 bg-slate-100 text-slate-800' : 'border-slate-200 bg-white text-slate-600'}`}
                    >
                      All ({nurseNotes.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoteTypeFilter('nurse')}
                      className={`btn rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${noteTypeFilter === 'nurse' ? 'border-sky-300 bg-sky-100 text-sky-800' : 'border-sky-200 bg-sky-50 text-sky-700'}`}
                    >
                      Nurse ({nurseNotes.filter((note) => asText(note.note_type).toLowerCase() === 'nurse').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoteTypeFilter('doctor')}
                      className={`btn rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${noteTypeFilter === 'doctor' ? 'border-violet-300 bg-violet-100 text-violet-800' : 'border-violet-200 bg-violet-50 text-violet-700'}`}
                    >
                      Doctor ({nurseNotes.filter((note) => asText(note.note_type).toLowerCase() === 'doctor').length})
                    </button>
                  </div>
                </div>
                <div className="mt-3 h-[calc(100%-2rem)] overflow-y-auto pr-1">
                  {nurseNotesLoading ? (
                    <p className="text-sm text-slate-500">Loading notes...</p>
                  ) : null}
                  {!nurseNotesLoading && !visibleNurseNotes.length ? (
                    <p className="text-sm text-slate-500">No notes recorded yet.</p>
                  ) : null}
                  <div className="space-y-3">
                    {visibleNurseNotes.map((note) => {
                      const isEditing = editingNoteId === asText(note.id);
                      const isDoctor = asText(note.note_type).toLowerCase() === 'doctor';
                      return (
                        <article key={note.id} className={`rounded-xl border px-3 py-2 ${isDoctor ? 'border-violet-200 bg-violet-50/70' : 'border-sky-200 bg-sky-50/70'}`}>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                              {isDoctor ? 'Doctor Note' : 'Nurse Note'}
                            </p>
                            <p className="text-xs text-slate-500">{toDisplayDateTime(note.date_added)}</p>
                          </div>
                          {isEditing ? (
                            <div className="mt-2 space-y-2">
                              <input
                                value={editingNoteTitle}
                                onChange={(event) => setEditingNoteTitle(event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                              />
                              <textarea
                                value={editingNoteBody}
                                onChange={(event) => setEditingNoteBody(event.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                              />
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => void saveEditNote()}
                                  disabled={nurseNotesSaving}
                                  className="btn inline-flex items-center rounded-lg border border-sky-300 bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-800 disabled:opacity-60"
                                >
                                  Save Changes
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEditNote}
                                  className="btn inline-flex items-center rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="mt-1 text-sm font-semibold text-slate-900">{asText(note.title) || 'Untitled note'}</p>
                              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{asText(note.notes) || 'No details'}</p>
                              <p className="mt-1 text-xs text-slate-500">
                                {asText(note.user_name) || 'Unknown user'}
                                {asText(note.user_role) ? ` · ${asText(note.user_role)}` : ''}
                              </p>
                              {!isDoctor ? (
                                <button
                                  type="button"
                                  onClick={() => beginEditNote(note)}
                                  className="btn mt-2 inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"
                                >
                                  Edit
                                </button>
                              ) : null}
                            </>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : null}

      {actionModal ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/45 px-4 py-6 backdrop-blur-[1px]">
          <div className="flex h-[90vh] w-[min(1200px,98vw)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{actionModal.title}</h3>
                <p className="text-xs text-slate-500">Nurse Station workflow modal</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={actionModal.path}
                  target="_blank"
                  rel="noreferrer"
                  className="btn inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  Open In New Tab
                </a>
                <button
                  type="button"
                  onClick={() => setActionModal(null)}
                  className="btn inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              title={actionModal.title}
              src={actionModal.path}
              className="h-full w-full border-0 bg-white"
            />
          </div>
        </div>
      ) : null}
      <NurseHandoffModal
        open={Boolean(handoffModal)}
        visitId={handoffModal?.visitId || ''}
        patientId={handoffModal?.patientId || ''}
        onClose={() => setHandoffModal(null)}
      />
      <NurseSymptomsModal
        open={Boolean(symptomsModal)}
        visitId={symptomsModal?.visitId || ''}
        patientId={symptomsModal?.patientId || ''}
        patientName={symptomsModal?.patientName}
        patientCode={symptomsModal?.patientCode}
        onClose={() => setSymptomsModal(null)}
      />
    </div>
  );
}
