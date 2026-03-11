import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

type HandoffPayload = {
  visit?: {
    id?: string;
    date_created?: string | null;
    description?: string;
    ward?: string;
    bed?: string;
  };
  patient?: {
    id?: string;
    name?: string;
    code?: string;
    folder_number?: string;
    gender_id?: string;
    date_of_birth?: string | null;
  };
  vitals?: Record<string, string | null | undefined>;
  diagnoses?: Array<{ label?: string; name?: string; code?: string }>;
  alerts?: Array<{ type?: string; message?: string }>;
  resources?: {
    scheduled_medications?: Array<Record<string, unknown>>;
    scheduled_flowsheets?: Array<Record<string, unknown>>;
    pending_labs?: Array<Record<string, unknown>>;
    pending_scans?: Array<Record<string, unknown>>;
  };
  sections?: Record<string, Record<string, unknown> | null>;
};

type NurseHandoffModalProps = {
  open: boolean;
  visitId: string;
  patientId: string;
  onClose: () => void;
};

type TabKey =
  | 'current_status'
  | 'medical_history'
  | 'medications'
  | 'ongoing_care'
  | 'lab_results'
  | 'shift_summary'
  | 'plan_care'
  | 'social_behavioral';

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'current_status', label: 'Current Status' },
  { key: 'medical_history', label: 'Medical History' },
  { key: 'medications', label: 'Medications' },
  { key: 'ongoing_care', label: 'Ongoing Care' },
  { key: 'lab_results', label: 'Lab Results' },
  { key: 'shift_summary', label: 'Shift Summary' },
  { key: 'plan_care', label: 'Plan of Care' },
  { key: 'social_behavioral', label: 'Social / Behavioral' },
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

export default function NurseHandoffModal({ open, visitId, patientId, onClose }: NurseHandoffModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('current_status');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<HandoffPayload | null>(null);

  const [currentStatus, setCurrentStatus] = useState<Record<string, string>>({});
  const [medications, setMedications] = useState<Record<string, string>>({});
  const [ongoingCare, setOngoingCare] = useState<Record<string, string>>({});
  const [shiftSummary, setShiftSummary] = useState<Record<string, string>>({});
  const [planCare, setPlanCare] = useState<Record<string, string>>({});
  const [social, setSocial] = useState<Record<string, string>>({});

  const load = async () => {
    if (!visitId || !open) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<{ ok?: boolean; handoff?: HandoffPayload }>(
        `/legacy/nurse-station/nurse-handoff/?visit_id=${encodeURIComponent(visitId)}`,
      );
      const handoff = response?.handoff || {};
      setPayload(handoff);
      const sections = handoff.sections || {};
      setCurrentStatus({
        code_status: asText(sections.current_status?.code_status),
        other_code_status: asText(sections.current_status?.other_code_status),
        mental_status: asText(sections.current_status?.mental_status),
        pain_score: asText(sections.current_status?.pain_score),
        pain_management_strategies: asText(sections.current_status?.pain_management_strategies),
        activity_level: asText(sections.current_status?.activity_level),
        fall_risk: asText(sections.current_status?.fall_risk),
        fall_risk_notes: asText(sections.current_status?.fall_risk_notes),
      });
      setMedications({
        medication_changes: asText(sections.medications?.medication_changes),
      });
      setOngoingCare({
        lines_tubes_drains: asText(sections.ongoing_care?.lines_tubes_drains),
        lines_tubes_drains_other: asText(sections.ongoing_care?.lines_tubes_drains_other),
        lines_tubes_drains_notes: asText(sections.ongoing_care?.lines_tubes_drains_notes),
        dressing_type: asText(sections.ongoing_care?.dressing_type),
        other_dressing: asText(sections.ongoing_care?.other_dressing),
        frequency: asText(sections.ongoing_care?.frequency),
        wound_location: asText(sections.ongoing_care?.wound_location),
        size: asText(sections.ongoing_care?.size),
        signs_of_infection: asText(sections.ongoing_care?.signs_of_infection),
        last_dressing_change: asText(sections.ongoing_care?.last_dressing_change),
        additional_notes: asText(sections.ongoing_care?.additional_notes),
        special_equipment: asText(sections.ongoing_care?.special_equipment),
        special_equipment_other: asText(sections.ongoing_care?.special_equipment_other),
        infection_precautions: asText(sections.ongoing_care?.infection_precautions),
        activity_restriction: asText(sections.ongoing_care?.activity_restriction),
        fall_precaution: asText(sections.ongoing_care?.fall_precaution),
      });
      setShiftSummary({
        key_events: asText(sections.shift_summary?.key_events),
        patient_response_to_treatment: asText(sections.shift_summary?.patient_response_to_treatment),
        concerns: asText(sections.shift_summary?.concerns),
      });
      setPlanCare({
        immediate_care_tasks: asText(sections.plan_care?.immediate_care_tasks),
        immediate_care_notes: asText(sections.plan_care?.immediate_care_notes),
        anticipated_discharge_needs: asText(sections.plan_care?.anticipated_discharge_needs),
        discharge_needs_other: asText(sections.plan_care?.discharge_needs_other),
        discharge_needs_notes: asText(sections.plan_care?.discharge_needs_notes),
        pending_consults: asText(sections.plan_care?.pending_consults),
        barriers_to_discharge: asText(sections.plan_care?.barriers_to_discharge),
        education_status: asText(sections.plan_care?.education_status),
        patient_education: asText(sections.plan_care?.patient_education),
      });
      setSocial({
        family_involvement: asText(sections.social_behavioral?.family_involvement),
        family_involvement_details: asText(sections.social_behavioral?.family_involvement_details),
        communication_needs: asText(sections.social_behavioral?.communication_needs),
        other_communication_needs: asText(sections.social_behavioral?.other_communication_needs),
        behavioral_concerns: asText(sections.social_behavioral?.behavioral_concerns),
        behavioral_concerns_checklist: asText(sections.social_behavioral?.behavioral_concerns_checklist),
        cultural_religious_needs: asText(sections.social_behavioral?.cultural_religious_needs),
        substance_use: asText(sections.social_behavioral?.substance_use),
        substance_use_details: asText(sections.social_behavioral?.substance_use_details),
        mental_health_history: asText(sections.social_behavioral?.mental_health_history),
        safety_alerts: asText(sections.social_behavioral?.safety_alerts),
        safety_alerts_details: asText(sections.social_behavioral?.safety_alerts_details),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load handoff.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    void load();
  }, [open, visitId]);

  const age = useMemo(() => {
    const dob = payload?.patient?.date_of_birth;
    if (!dob) return null;
    const parsed = new Date(dob);
    if (Number.isNaN(parsed.getTime())) return null;
    return Math.floor((Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  }, [payload?.patient?.date_of_birth]);

  const saveSection = async (section: TabKey) => {
    setSaving(true);
    setError(null);
    try {
      let endpoint = '';
      let body: Record<string, string> = { visit_id: visitId, patient_id: patientId };
      if (section === 'current_status') {
        endpoint = '/legacy/nurse-station/current-status-save/';
        body = { ...body, ...currentStatus };
      } else if (section === 'medications') {
        endpoint = '/legacy/nurse-station/medications-save/';
        body = { ...body, ...medications };
      } else if (section === 'ongoing_care') {
        endpoint = '/legacy/nurse-station/ongoing-care-save/';
        body = { ...body, ...ongoingCare };
      } else if (section === 'shift_summary') {
        endpoint = '/legacy/nurse-station/shift-summary-save/';
        body = { ...body, ...shiftSummary };
      } else if (section === 'plan_care') {
        endpoint = '/legacy/nurse-station/plan-care-save/';
        body = { ...body, ...planCare };
      } else if (section === 'social_behavioral') {
        endpoint = '/legacy/nurse-station/social-behavioral-factors-save/';
        body = { ...body, ...social };
      } else {
        return;
      }
      await api.post(endpoint, body);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save handoff section.');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  const resources = payload?.resources || {};

  return (
    <div className="fixed inset-0 z-[122] flex items-center justify-center bg-slate-900/45 px-4 py-6">
      <div className="flex h-[92vh] w-[min(1320px,99vw)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Nurse Handoff</h3>
            <p className="text-xs text-slate-500">Comprehensive shift handoff workflow</p>
          </div>
          <button type="button" onClick={onClose} className="btn rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
            Close
          </button>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-[330px,1fr]">
          <aside className="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
            <h4 className="text-sm font-semibold text-slate-900">{asText(payload?.patient?.name) || 'Unknown patient'}</h4>
            <p className="text-xs text-slate-600">
              {[asText(payload?.patient?.code), asText(payload?.patient?.folder_number)].filter(Boolean).join(' · ') || 'No identifiers'}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Visit: {toDisplayDateTime(payload?.visit?.date_created || null)} · {asText(payload?.visit?.ward) || 'No ward'} / {asText(payload?.visit?.bed) || 'No bed'}
            </p>
            <p className="mt-1 text-xs text-slate-600">{age !== null ? `${age} years` : ''}</p>
            <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Latest Vitals</p>
              <p className="mt-1 text-xs text-slate-700">Temp: {asText(payload?.vitals?.temperature) || 'N/A'}</p>
              <p className="text-xs text-slate-700">Pulse: {asText(payload?.vitals?.pulse) || 'N/A'}</p>
              <p className="text-xs text-slate-700">BP: {asText(payload?.vitals?.blood_pressure_1) || 'N/A'} / {asText(payload?.vitals?.blood_pressure_2) || 'N/A'}</p>
              <p className="text-xs text-slate-700">SpO2: {asText(payload?.vitals?.oxygen_saturation) || 'N/A'}</p>
            </div>
            <div className="mt-3 space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`btn w-full rounded-lg border px-2.5 py-2 text-left text-xs font-semibold ${activeTab === tab.key ? 'border-sky-300 bg-sky-100 text-sky-800' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>
          <section className="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white p-3">
            {error ? <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div> : null}
            {loading ? <p className="text-sm text-slate-600">Loading handoff...</p> : null}
            {!loading && activeTab === 'medical_history' ? (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">Medical History</h4>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Diagnoses</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {(payload?.diagnoses || []).map((diag, idx) => (
                      <li key={`diag-${idx}`}>{asText(diag.label)}: {asText(diag.name)} {asText(diag.code) ? `(${asText(diag.code)})` : ''}</li>
                    ))}
                    {!(payload?.diagnoses || []).length ? <li>No diagnoses available.</li> : null}
                  </ul>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Alerts</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(payload?.alerts || []).map((alert, idx) => (
                      <span key={`alert-${idx}`} className="rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800">
                        {asText(alert.message)}
                      </span>
                    ))}
                    {!(payload?.alerts || []).length ? <span className="text-xs text-slate-500">No active alerts.</span> : null}
                  </div>
                </div>
              </div>
            ) : null}

            {!loading && activeTab === 'lab_results' ? (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">Lab Results / Diagnostics</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Pending Labs</p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-700">
                      {(resources.pending_labs || []).map((row, idx) => <li key={`lab-${idx}`}>{asText(row.title)} · {asText(row.status)}</li>)}
                      {!(resources.pending_labs || []).length ? <li>None</li> : null}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Pending Scans</p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-700">
                      {(resources.pending_scans || []).map((row, idx) => <li key={`scan-${idx}`}>{asText(row.title)} · {asText(row.status)}</li>)}
                      {!(resources.pending_scans || []).length ? <li>None</li> : null}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            {!loading && activeTab === 'current_status' ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">Current Status</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <input value={currentStatus.code_status || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, code_status: e.target.value }))} placeholder="Code status" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={currentStatus.mental_status || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, mental_status: e.target.value }))} placeholder="Mental status" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={currentStatus.pain_score || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, pain_score: e.target.value }))} placeholder="Pain score (0-10)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={currentStatus.activity_level || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, activity_level: e.target.value }))} placeholder="Activity level" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={currentStatus.fall_risk || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, fall_risk: e.target.value }))} placeholder="Fall risk (1/0)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={currentStatus.other_code_status || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, other_code_status: e.target.value }))} placeholder="Other code status notes" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <textarea value={currentStatus.pain_management_strategies || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, pain_management_strategies: e.target.value }))} placeholder="Pain management strategies" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={2} />
                  <textarea value={currentStatus.fall_risk_notes || ''} onChange={(e) => setCurrentStatus((s) => ({ ...s, fall_risk_notes: e.target.value }))} placeholder="Fall risk notes" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={2} />
                </div>
                <button type="button" onClick={() => void saveSection('current_status')} disabled={saving} className="btn rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60">{saving ? 'Saving...' : 'Save Current Status'}</button>
              </div>
            ) : null}

            {!loading && activeTab === 'medications' ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">Medications</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Scheduled</p>
                    <ul className="mt-1 space-y-1 text-xs text-slate-700">
                      {(resources.scheduled_medications || []).map((row, idx) => <li key={`med-${idx}`}>{asText(row.title)} · {asText(row.frequency)}</li>)}
                      {!(resources.scheduled_medications || []).length ? <li>None</li> : null}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Flow Sheets</p>
                    <ul className="mt-1 space-y-1 text-xs text-slate-700">
                      {(resources.scheduled_flowsheets || []).map((row, idx) => <li key={`flow-${idx}`}>{asText(row.title)} · {asText(row.frequency)}</li>)}
                      {!(resources.scheduled_flowsheets || []).length ? <li>None</li> : null}
                    </ul>
                  </div>
                </div>
                <textarea value={medications.medication_changes || ''} onChange={(e) => setMedications((s) => ({ ...s, medication_changes: e.target.value }))} placeholder="Pending medication changes" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={3} />
                <button type="button" onClick={() => void saveSection('medications')} disabled={saving} className="btn rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60">{saving ? 'Saving...' : 'Save Medications'}</button>
              </div>
            ) : null}

            {!loading && activeTab === 'ongoing_care' ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">Ongoing Care</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <input value={ongoingCare.lines_tubes_drains || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, lines_tubes_drains: e.target.value }))} placeholder="Lines/Tubes/Drains (; separated)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
                  <input value={ongoingCare.lines_tubes_drains_other || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, lines_tubes_drains_other: e.target.value }))} placeholder="Lines/Tubes/Drains other" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.dressing_type || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, dressing_type: e.target.value }))} placeholder="Dressing type" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.frequency || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, frequency: e.target.value }))} placeholder="Frequency" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.wound_location || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, wound_location: e.target.value }))} placeholder="Wound location" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.size || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, size: e.target.value }))} placeholder="Wound size" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.signs_of_infection || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, signs_of_infection: e.target.value }))} placeholder="Signs of infection" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.last_dressing_change || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, last_dressing_change: e.target.value }))} placeholder="Last dressing change (datetime)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.special_equipment || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, special_equipment: e.target.value }))} placeholder="Special equipment (; separated)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
                  <input value={ongoingCare.special_equipment_other || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, special_equipment_other: e.target.value }))} placeholder="Special equipment other" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.infection_precautions || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, infection_precautions: e.target.value }))} placeholder="Infection precautions" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.activity_restriction || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, activity_restriction: e.target.value }))} placeholder="Activity restriction" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input value={ongoingCare.fall_precaution || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, fall_precaution: e.target.value }))} placeholder="Fall precaution" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <textarea value={ongoingCare.lines_tubes_drains_notes || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, lines_tubes_drains_notes: e.target.value }))} placeholder="Lines/Tubes/Drains notes" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={2} />
                  <textarea value={ongoingCare.additional_notes || ''} onChange={(e) => setOngoingCare((s) => ({ ...s, additional_notes: e.target.value }))} placeholder="Additional notes" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={2} />
                </div>
                <button type="button" onClick={() => void saveSection('ongoing_care')} disabled={saving} className="btn rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60">{saving ? 'Saving...' : 'Save Ongoing Care'}</button>
              </div>
            ) : null}

            {!loading && activeTab === 'shift_summary' ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">Shift Summary</h4>
                <textarea value={shiftSummary.key_events || ''} onChange={(e) => setShiftSummary((s) => ({ ...s, key_events: e.target.value }))} placeholder="Key events in current shift" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={3} />
                <textarea value={shiftSummary.patient_response_to_treatment || ''} onChange={(e) => setShiftSummary((s) => ({ ...s, patient_response_to_treatment: e.target.value }))} placeholder="Patient response to treatment" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={3} />
                <textarea value={shiftSummary.concerns || ''} onChange={(e) => setShiftSummary((s) => ({ ...s, concerns: e.target.value }))} placeholder="Concerns or escalation needs" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={3} />
                <button type="button" onClick={() => void saveSection('shift_summary')} disabled={saving} className="btn rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60">{saving ? 'Saving...' : 'Save Shift Summary'}</button>
              </div>
            ) : null}

            {!loading && activeTab === 'plan_care' ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">Plan of Care</h4>
                <input value={planCare.immediate_care_tasks || ''} onChange={(e) => setPlanCare((s) => ({ ...s, immediate_care_tasks: e.target.value }))} placeholder="Immediate care tasks (; separated)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={planCare.immediate_care_notes || ''} onChange={(e) => setPlanCare((s) => ({ ...s, immediate_care_notes: e.target.value }))} placeholder="Immediate care notes" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <input value={planCare.anticipated_discharge_needs || ''} onChange={(e) => setPlanCare((s) => ({ ...s, anticipated_discharge_needs: e.target.value }))} placeholder="Anticipated discharge needs (; separated)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={planCare.discharge_needs_other || ''} onChange={(e) => setPlanCare((s) => ({ ...s, discharge_needs_other: e.target.value }))} placeholder="Discharge needs other" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <textarea value={planCare.discharge_needs_notes || ''} onChange={(e) => setPlanCare((s) => ({ ...s, discharge_needs_notes: e.target.value }))} placeholder="Discharge notes" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <input value={planCare.pending_consults || ''} onChange={(e) => setPlanCare((s) => ({ ...s, pending_consults: e.target.value }))} placeholder="Pending consults (; separated)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={planCare.barriers_to_discharge || ''} onChange={(e) => setPlanCare((s) => ({ ...s, barriers_to_discharge: e.target.value }))} placeholder="Barriers to discharge" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <input value={planCare.education_status || ''} onChange={(e) => setPlanCare((s) => ({ ...s, education_status: e.target.value }))} placeholder="Education status" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={planCare.patient_education || ''} onChange={(e) => setPlanCare((s) => ({ ...s, patient_education: e.target.value }))} placeholder="Patient education notes" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <button type="button" onClick={() => void saveSection('plan_care')} disabled={saving} className="btn rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60">{saving ? 'Saving...' : 'Save Plan of Care'}</button>
              </div>
            ) : null}

            {!loading && activeTab === 'social_behavioral' ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">Social / Behavioral</h4>
                <input value={social.family_involvement || ''} onChange={(e) => setSocial((s) => ({ ...s, family_involvement: e.target.value }))} placeholder="Family involvement level" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={social.family_involvement_details || ''} onChange={(e) => setSocial((s) => ({ ...s, family_involvement_details: e.target.value }))} placeholder="Family involvement details" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <textarea value={social.communication_needs || ''} onChange={(e) => setSocial((s) => ({ ...s, communication_needs: e.target.value }))} placeholder="Communication needs" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <textarea value={social.other_communication_needs || ''} onChange={(e) => setSocial((s) => ({ ...s, other_communication_needs: e.target.value }))} placeholder="Other communication needs" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <textarea value={social.behavioral_concerns || ''} onChange={(e) => setSocial((s) => ({ ...s, behavioral_concerns: e.target.value }))} placeholder="Behavioral concerns" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <input value={social.behavioral_concerns_checklist || ''} onChange={(e) => setSocial((s) => ({ ...s, behavioral_concerns_checklist: e.target.value }))} placeholder="Behavioral checklist (; separated)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={social.cultural_religious_needs || ''} onChange={(e) => setSocial((s) => ({ ...s, cultural_religious_needs: e.target.value }))} placeholder="Cultural / religious needs" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <input value={social.substance_use || ''} onChange={(e) => setSocial((s) => ({ ...s, substance_use: e.target.value }))} placeholder="Substance use (; separated)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={social.substance_use_details || ''} onChange={(e) => setSocial((s) => ({ ...s, substance_use_details: e.target.value }))} placeholder="Substance use details" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <textarea value={social.mental_health_history || ''} onChange={(e) => setSocial((s) => ({ ...s, mental_health_history: e.target.value }))} placeholder="Mental health history" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <input value={social.safety_alerts || ''} onChange={(e) => setSocial((s) => ({ ...s, safety_alerts: e.target.value }))} placeholder="Safety alerts (; separated)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <textarea value={social.safety_alerts_details || ''} onChange={(e) => setSocial((s) => ({ ...s, safety_alerts_details: e.target.value }))} placeholder="Safety alerts details" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                <button type="button" onClick={() => void saveSection('social_behavioral')} disabled={saving} className="btn rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 disabled:opacity-60">{saving ? 'Saving...' : 'Save Social / Behavioral'}</button>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
