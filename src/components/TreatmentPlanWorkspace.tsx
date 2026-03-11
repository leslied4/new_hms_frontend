import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import SearchableSelectField from './SearchableSelectField';
import { api } from '../lib/api';

type JsonRow = Record<string, unknown>;
type ClinicalDiagnosisEntry = {
  diagnosis_record_id: string;
  diagnosis_type: string;
  diagnosis_description: string;
  sub_diagnosis: string;
  standard_diagnosis_id: string;
  clinical_stage: string;
  diagnosis_notes: string;
};
type ClinicalTherapyEntry = {
  primary_treatment: string;
  dosage_dosing: string;
  therapy_notes: string;
  indication_for_use: string;
};

type Props = {
  patientId: string;
  visitId: string;
  diagnosisRows: JsonRow[];
  latestVital: JsonRow | null;
  medicationRows: JsonRow[];
  prescriptionRows: JsonRow[];
  requestLabRows: JsonRow[];
  requestScanRows: JsonRow[];
};

const asText = (value: unknown): string => String(value ?? '').trim();
const makeId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID().replace(/-/g, '');
  return `${Date.now()}${Math.floor(Math.random() * 1000000)}`;
};
const YES_NO_OPTIONS = ['Yes', 'No'] as const;
const PATIENT_PHYSICAL_STATUS_OPTIONS = [
  'Class I:  Normal healthy patient',
  'Class II:  Mild systemic disease',
  'Class III:  Severe systemic disease',
  'Class IV:  Severe systemic disease, constant life threat',
  'Class V:  Moribund, not expected to survive',
  'Class VI:  Brain-dead, organ donor',
] as const;
const PATIENT_SPECIFIC_RISK_OPTIONS = [
  'Cardiac Risk',
  'Pulmonary Risk',
  'Infection Risk',
  'Bleeding Risk',
  'Allergic Reactions',
  'Surgical-Site Risks',
] as const;
const RISK_MITIGATION_OPTIONS = [
  'Cardiac Clearance',
  'Pulmonary Optimization',
  'Infection Control',
  'Bleeding Prevention',
  'Allergy Prevention',
] as const;
type ToggleYesNoProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};
function ToggleYesNo({ label, value, onChange }: ToggleYesNoProps) {
  return (
    <div className="flex flex-col gap-1 text-[11px] text-slate-500">
      <span>{label}</span>
      <div className="flex gap-1">
        {YES_NO_OPTIONS.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-full px-3 py-0.5 text-[11px] font-semibold ${value === option ? 'border border-slate-400 bg-cyan-100 text-slate-900' : 'border border-slate-200 bg-white text-slate-500'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
type MonitoringVital = {
  id: string;
  vital: string;
  vital_local_name: string;
  type: string;
  frequency: string;
  target_range_low: string;
  target_range_high: string;
  alert_low: string;
  alert_high: string;
};

const VITALS_LIBRARY = [
  {
    name: 'Heart Rate',
    vital: 'heart_rate',
    type: '1',
    monitoringFrequency: ['Continuous (ICU)', 'Every 4–6 hours (ward)'],
    targetRange: { adults: { low: 60, high: 100 } },
    alertValues: { adults: { low: 50, high: 120 } },
  },
  {
    name: 'Blood Pressure',
    vital: 'blood_pressure',
    type: '1',
    monitoringFrequency: ['Every 15–30 minutes (unstable)', 'Every 4–6 hours (stable)'],
    targetRange: { adults: { low: 90, high: 120 } },
    alertValues: { adults: { low: 80, high: 140 } },
  },
  {
    name: 'Respiratory Rate',
    vital: 'respiratory_rate',
    type: '1',
    monitoringFrequency: ['Every 4–6 hours', 'Continuous (ICU)'],
    targetRange: { adults: { low: 12, high: 20 } },
    alertValues: { adults: { low: 10, high: 24 } },
  },
  {
    name: 'Oxygen Saturation',
    vital: 'oxygen_saturation',
    type: '1',
    monitoringFrequency: ['Continuous', 'Every 4–6 hours'],
    targetRange: { adults: { low: 94, high: 100 } },
    alertValues: { adults: { low: 88, high: 100 } },
  },
  {
    name: 'Temperature',
    vital: 'temperature',
    type: '1',
    monitoringFrequency: ['Every 4–6 hours', 'As needed'],
    targetRange: { adults: { low: 36.1, high: 37.2 } },
    alertValues: { adults: { low: 35.5, high: 38.2 } },
  },
];

const PREVENTIVE_IMMUNIZATIONS = ['influenza', 'pneumococcal', 'COVID-19', 'tetanusBooster'];
const PREVENTIVE_CANCER_SCREENINGS = ['mammogram', 'colonoscopy', 'papSmear', 'prostateScreening'];
const PREVENTIVE_OTHER_SERVICES = ['cholesterolCheck', 'osteoporosisScreening', 'mentalHealthScreening'];

export default function TreatmentPlanWorkspace({
  patientId,
  visitId,
  diagnosisRows,
  latestVital,
  medicationRows,
  prescriptionRows,
  requestLabRows,
  requestScanRows,
}: Props) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'detail'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [specialNotes, setSpecialNotes] = useState<JsonRow[]>([]);
  const [medicationNotes, setMedicationNotes] = useState<JsonRow[]>([]);
  const [medicalManagement, setMedicalManagement] = useState<JsonRow | null>(null);
  const [tpMedicationRows, setTpMedicationRows] = useState<JsonRow[]>([]);
  const [referralRows, setReferralRows] = useState<JsonRow[]>([]);
  const [surgicalManagementRows, setSurgicalManagementRows] = useState<JsonRow[]>([]);
  const [specialtyOptions, setSpecialtyOptions] = useState<JsonRow[]>([]);
  const [lifestyleRows, setLifestyleRows] = useState<JsonRow[]>([]);
  const [monitoringRows, setMonitoringRows] = useState<JsonRow[]>([]);
  const [progressRows, setProgressRows] = useState<JsonRow[]>([]);
  const [clinicalRows, setClinicalRows] = useState<JsonRow[]>([]);
  const [careRows, setCareRows] = useState<JsonRow[]>([]);
  const [socialRows, setSocialRows] = useState<JsonRow[]>([]);
  const [engagementRows, setEngagementRows] = useState<JsonRow[]>([]);
  const [outcomeRows, setOutcomeRows] = useState<JsonRow[]>([]);
  const [contingencyRows, setContingencyRows] = useState<JsonRow[]>([]);
  const [savingKey, setSavingKey] = useState<string>('');

  const [specialInstructionText, setSpecialInstructionText] = useState('');
  const [medicationNoteText, setMedicationNoteText] = useState('');
  const [medicalForm, setMedicalForm] = useState({
    drug_reviewed: '',
    drug_reviewed_details: '',
    renal_dose: '',
    renal_dose_details: '',
    hepatic_dose: '',
    hepatic_dose_details: '',
    pdmp: '',
    pdmp_details: '',
    insurance_coverage: '',
    insurance_coverage_details: '',
    generic_alternatives: '',
    generic_alternatives_details: '',
    patient_assistance: '',
    patient_assistance_details: '',
  });
  const [lifestyleForm, setLifestyleForm] = useState({
    diet_type_regular: '',
    diet_type_diabetes: '',
    diet_type_dash: '',
    diet_type_mediterranean: '',
    diet_type_low_sodium: '',
    diet_type_renal: '',
    diet_type_cardiac: '',
    diet_type_ketogenic: '',
    diet_type_plant_based: '',
    diet_type_gluten_free: '',
    diet_type_other: '',
    other_diet: '',
    diet_notes: '',
    current_weight: '',
    goal_weight: '',
    bmi: '',
    calculated_needs: '',
    prescribed_intake: '',
    sodium_restriction: '',
    carbs_restriction: '',
    protein_restriction: '',
    fluids_restriction: '',
    meals_per_day: '',
    snacks_per_day: '',
    timing_recommendations: '',
    activity_type: '',
    intensity: '',
    duration: '',
    frequency: '',
    special_precautions: '',
  });
  const [monitoringForm, setMonitoringForm] = useState({
    standard_diagnoses_id: '',
    parameters_to_track: '',
    recording_method: '',
    contact_doctor: '',
    short_term_goals: '',
    long_term_goals: '',
    warning_signs: '',
    primary_care_followup: '',
    specialist_followup: '',
    laboratory_followup: '',
    next_appointment: '',
  });
  const [monitoringVitals, setMonitoringVitals] = useState<MonitoringVital[]>([]);
  const [monitoringSearch, setMonitoringSearch] = useState('');
  const [progressForm, setProgressForm] = useState({
    visit_date: '',
    symptoms_progression: '',
    new_complaints: '',
    treatment_updates: '',
    patient_concerns: '',
    medication_compliance: '',
    side_effects: '',
    disease_status: '',
    disease_complication: '',
    risk_assessment: '',
    progress_plan: '',
    modify_treatment_notes: '',
    intervention_notes: '',
    medications: '',
    testing: '',
    referrals: '',
    patient_education: '',
    next_visit: '',
    visit_type: '',
    procedure_interval: '',
    treating_physician: '',
    additional_care_team: '',
    documentation_checklist: '',
  });
  const [clinicalForm, setClinicalForm] = useState({
    risk_stratification: '',
    risk_factors: '',
    guidelines_referenced: '',
    clinical_stage: '',
    diagnostics_completed: 'No',
    pending_laboratory_tests_details: '',
    pending_imaging_details: '',
    pending_others_details: '',
    findings_summary: '',
    pain_management: '',
    supportive_care: '',
    prophylaxis: '',
    pathway_adherence: '',
    modification_rationale: '',
    immunizations_value: '',
    cancer_screenings_value: '',
    other_services_value: '',
  });
  const [clinicalDiagnoses, setClinicalDiagnoses] = useState<ClinicalDiagnosisEntry[]>([]);
  const [firstLineTherapies, setFirstLineTherapies] = useState<ClinicalTherapyEntry[]>([
    { primary_treatment: '', dosage_dosing: '', therapy_notes: '', indication_for_use: '' },
  ]);
  const [secondLineTherapies, setSecondLineTherapies] = useState<ClinicalTherapyEntry[]>([
    { primary_treatment: '', dosage_dosing: '', therapy_notes: '', indication_for_use: '' },
  ]);
  const [immunizations, setImmunizations] = useState<string[]>([]);
  const [cancerScreenings, setCancerScreenings] = useState<string[]>([]);
  const [otherServices, setOtherServices] = useState<string[]>([]);
  const [careForm, setCareForm] = useState({ communication_plan: '', role_reponsibilities: '', care_gaps: '' });
  const [socialForm, setSocialForm] = useState({
    housingStatus: '',
    housing_notes: '',
    has_reliable_vehicle: '',
    transportation_notes: '',
    foodSecurity: '',
    food_security_notes: '',
    has_family: '',
    social_support_notes: '',
    financial_barriers_medications: '',
    financial_barriers_notes: '',
    transportation_services: '',
    other_referrals: '',
  });
  const [engagementForm, setEngagementForm] = useState({
    primary_language: '',
    interpreter_needed: '',
    visual_learner: '',
    auditory_learner: '',
    hands_on_learner: '',
    learning_barriers: '',
    verbal_format: '',
    written_format: '',
    video_format: '',
    demo_format: '',
    topics_covered: '',
    understanding_verified: '',
    take_home_materials: '',
    patient_goals: '',
    achievement_barriers: '',
    checkin_method: '',
    checkin_frequency: '',
    support_person: '',
  });
  const [outcomeForm, setOutcomeForm] = useState({
    clinical_outcome_targets: '',
    qol_score: '',
    functional_status: '',
    symptom_burden: '',
    medication_adherence_rate: '',
    appointment_adherence_rate: '',
    lifestyle_modification_adherence: '',
  });
  const [contingencyForm, setContingencyForm] = useState({
    warning_signs: '',
    emergency_care: '',
    emergency_contacts: '',
    emergency_facility: '',
    medication_access: '',
    care_access: '',
    support_systems: '',
  });
  const [referralForm, setReferralForm] = useState({ reason: '', specialty_id: '' });
  const [surgeryForm, setSurgeryForm] = useState({
    surgical_intervention_status: '',
    other_tests: '',
    cardiac_clearance_required: '',
    pre_op_testing_needed: '',
    procedure_type: '',
    estimated_duration: '',
    length_of_stay: '',
    admission_type: '',
    post_op_procedure_type: '',
    pain_management: '',
    wound_care: '',
    activity_restrictions: '',
    duration_restrictions: '',
    other_rehabilitation_type: '',
    rehabilitation_type: '',
    additional_notes: '',
    patient_physical_status: '',
    patient_specific_risks: '',
    risk_mitigation_strategy: '',
  });

  const [detailSection, setDetailSection] = useState('specialInstructions');

  const detailNavItems = [
    { key: 'medSafetyCost', label: 'Medication Safety & Cost' },
    { key: 'lifestyle', label: 'Lifestyle Recommendation' },
    { key: 'monitoring', label: 'Monitoring Plan' },
    { key: 'progress', label: 'Progress Notes' },
    { key: 'clinical', label: 'Clinical Decision Support' },
    { key: 'care', label: 'Care Coordination' },
    { key: 'social', label: 'Social Determinants' },
    { key: 'engagement', label: 'Patient Engagement' },
    { key: 'outcome', label: 'Outcome Measures' },
    { key: 'contingency', label: 'Contingency Plan' },
    { key: 'medicationManagement', label: 'Medication Management' },
    { key: 'investigation', label: 'Investigation / Referral' },
    { key: 'surgical', label: 'Surgical Management' },
  ];

  const loadAll = async () => {
    if (!patientId || !visitId) return;
    setLoading(true);
    setError(null);
    try {
      const [
        special,
        medNotes,
        medical,
        tpMedication,
        referrals,
        surgeryManagement,
        specialties,
        lifestyle,
        monitoring,
        progress,
        clinical,
        care,
        social,
        engagement,
        outcomes,
        contingency,
      ] = await Promise.all([
        api.get<JsonRow[]>(`/legacy/patient-visit-doctor-notes/get-all-special-instructions-doctor-notes/?patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patient-visit-doctor-notes/get-all-medication-doctor-notes/?patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow>(`/legacy/patient-visits/get-medical-management/?patient_visit_id=${encodeURIComponent(visitId)}&patient_id=${encodeURIComponent(patientId)}`),
        api.get<JsonRow[]>(`/legacy/request-medications/get-all-medications-tp/?patient_visit_id=${encodeURIComponent(visitId)}&patient_id=${encodeURIComponent(patientId)}&limit=100`),
        api.get<JsonRow[]>(`/legacy/patients/get-all-consultation-request/?patient_visit_id=${encodeURIComponent(visitId)}&limit=50`),
        api.get<JsonRow[]>(`/legacy/request-surgeries/get-surgical-management/?patient_visit_id=${encodeURIComponent(visitId)}&limit=50`),
        api.get<{ results?: JsonRow[] } | JsonRow[]>(`/specialties/?page=1&page_size=300`),
        api.get<JsonRow[]>(`/legacy/patients/get-lifestyle-recommendation/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-monitoring-plans/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-progress-notes/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-clinical-decisions/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-interdisciplinary-care-coordinations/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-health-social-determinants/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-patient-educations/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-outcome-measures/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
        api.get<JsonRow[]>(`/legacy/patients/get-contingency-plannings/?patient_id=${encodeURIComponent(patientId)}&patient_visit_id=${encodeURIComponent(visitId)}&limit=20`),
      ]);
      setSpecialNotes(Array.isArray(special) ? special : []);
      setMedicationNotes(Array.isArray(medNotes) ? medNotes : []);
      setMedicalManagement(medical || null);
      setTpMedicationRows(Array.isArray(tpMedication) ? tpMedication : []);
      setReferralRows(Array.isArray(referrals) ? referrals : []);
      setSurgicalManagementRows(Array.isArray(surgeryManagement) ? surgeryManagement : []);
      const specialtyRows = Array.isArray(specialties) ? specialties : Array.isArray(specialties?.results) ? specialties.results : [];
      setSpecialtyOptions(specialtyRows);
      setLifestyleRows(Array.isArray(lifestyle) ? lifestyle : []);
      setMonitoringRows(Array.isArray(monitoring) ? monitoring : []);
      setProgressRows(Array.isArray(progress) ? progress : []);
      setClinicalRows(Array.isArray(clinical) ? clinical : []);
      setCareRows(Array.isArray(care) ? care : []);
      setSocialRows(Array.isArray(social) ? social : []);
      setEngagementRows(Array.isArray(engagement) ? engagement : []);
      setOutcomeRows(Array.isArray(outcomes) ? outcomes : []);
      setContingencyRows(Array.isArray(contingency) ? contingency : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load treatment plan data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll().catch(() => undefined);
  }, [patientId, visitId]);

  const saveForm = async (key: string, path: string, payload: Record<string, unknown>) => {
    setSavingKey(key);
    setError(null);
    try {
      await api.post(path, payload);
      if (key === 'medical') {
        setMedicalForm({
          drug_reviewed: '',
          drug_reviewed_details: '',
          renal_dose: '',
          renal_dose_details: '',
          hepatic_dose: '',
          hepatic_dose_details: '',
          pdmp: '',
          pdmp_details: '',
          insurance_coverage: '',
          insurance_coverage_details: '',
          generic_alternatives: '',
          generic_alternatives_details: '',
          patient_assistance: '',
          patient_assistance_details: '',
        });
      } else if (key === 'lifestyle') {
        setLifestyleForm({
          diet_type_regular: '',
          diet_type_diabetes: '',
          diet_type_dash: '',
          diet_type_mediterranean: '',
          diet_type_low_sodium: '',
          diet_type_renal: '',
          diet_type_cardiac: '',
          diet_type_ketogenic: '',
          diet_type_plant_based: '',
          diet_type_gluten_free: '',
          diet_type_other: '',
          other_diet: '',
          diet_notes: '',
          current_weight: '',
          goal_weight: '',
          bmi: '',
          calculated_needs: '',
          prescribed_intake: '',
          sodium_restriction: '',
          carbs_restriction: '',
          protein_restriction: '',
          fluids_restriction: '',
          meals_per_day: '',
          snacks_per_day: '',
          timing_recommendations: '',
          activity_type: '',
          intensity: '',
          duration: '',
          frequency: '',
          special_precautions: '',
        });
      } else if (key === 'monitoring') {
        setMonitoringForm({
          standard_diagnoses_id: '',
          parameters_to_track: '',
          recording_method: '',
          contact_doctor: '',
          short_term_goals: '',
          long_term_goals: '',
          warning_signs: '',
          primary_care_followup: '',
          specialist_followup: '',
          laboratory_followup: '',
          next_appointment: '',
        });
        setMonitoringVitals([]);
        setMonitoringSearch('');
      } else if (key === 'progress') {
        setProgressForm({
          visit_date: '',
          symptoms_progression: '',
          new_complaints: '',
          treatment_updates: '',
          patient_concerns: '',
          medication_compliance: '',
          side_effects: '',
          disease_status: '',
          disease_complication: '',
          risk_assessment: '',
          progress_plan: '',
          modify_treatment_notes: '',
          intervention_notes: '',
          medications: '',
          testing: '',
          referrals: '',
          patient_education: '',
          next_visit: '',
          visit_type: '',
          procedure_interval: '',
          treating_physician: '',
          additional_care_team: '',
          documentation_checklist: '',
        });
      } else if (key === 'clinical') {
        setClinicalForm({
          risk_stratification: '',
          risk_factors: '',
          guidelines_referenced: '',
          clinical_stage: '',
          diagnostics_completed: 'No',
          pending_laboratory_tests_details: '',
          pending_imaging_details: '',
          pending_others_details: '',
          findings_summary: '',
          pain_management: '',
          supportive_care: '',
          prophylaxis: '',
          pathway_adherence: '',
          modification_rationale: '',
          immunizations_value: '',
          cancer_screenings_value: '',
          other_services_value: '',
        });
        setClinicalDiagnoses([]);
        setFirstLineTherapies([{ primary_treatment: '', dosage_dosing: '', therapy_notes: '', indication_for_use: '' }]);
        setSecondLineTherapies([{ primary_treatment: '', dosage_dosing: '', therapy_notes: '', indication_for_use: '' }]);
        setImmunizations([]);
        setCancerScreenings([]);
        setOtherServices([]);
      } else if (key === 'care') {
        setCareForm({ communication_plan: '', role_reponsibilities: '', care_gaps: '' });
      } else if (key === 'social') {
        setSocialForm({
          housingStatus: '',
          housing_notes: '',
          has_reliable_vehicle: '',
          transportation_notes: '',
          foodSecurity: '',
          food_security_notes: '',
          has_family: '',
          social_support_notes: '',
          financial_barriers_medications: '',
          financial_barriers_notes: '',
          transportation_services: '',
          other_referrals: '',
        });
      } else if (key === 'engagement') {
        setEngagementForm({
          primary_language: '',
          interpreter_needed: '',
          visual_learner: '',
          auditory_learner: '',
          hands_on_learner: '',
          learning_barriers: '',
          verbal_format: '',
          written_format: '',
          video_format: '',
          demo_format: '',
          topics_covered: '',
          understanding_verified: '',
          take_home_materials: '',
          patient_goals: '',
          achievement_barriers: '',
          checkin_method: '',
          checkin_frequency: '',
          support_person: '',
        });
      } else if (key === 'outcome') {
        setOutcomeForm({
          clinical_outcome_targets: '',
          qol_score: '',
          functional_status: '',
          symptom_burden: '',
          medication_adherence_rate: '',
          appointment_adherence_rate: '',
          lifestyle_modification_adherence: '',
        });
      } else if (key === 'contingency') {
        setContingencyForm({
          warning_signs: '',
          emergency_care: '',
          emergency_contacts: '',
          emergency_facility: '',
          medication_access: '',
          care_access: '',
          support_systems: '',
        });
      } else if (key === 'referral') {
        setReferralForm({ reason: '', specialty_id: '' });
      } else if (key === 'surgical') {
        setSurgeryForm({
          surgical_intervention_status: '',
          other_tests: '',
          cardiac_clearance_required: '',
          pre_op_testing_needed: '',
          procedure_type: '',
          estimated_duration: '',
          length_of_stay: '',
          admission_type: '',
          post_op_procedure_type: '',
          pain_management: '',
          wound_care: '',
          activity_restrictions: '',
          duration_restrictions: '',
          other_rehabilitation_type: '',
          rehabilitation_type: '',
          additional_notes: '',
          patient_physical_status: '',
          patient_specific_risks: '',
          risk_mitigation_strategy: '',
        });
      }
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSavingKey('');
    }
  };

  const filteredMonitoringOptions = useMemo(() => {
    const term = monitoringSearch.trim().toLowerCase();
    if (!term) return VITALS_LIBRARY;
    return VITALS_LIBRARY.filter((item) => item.name.toLowerCase().includes(term));
  }, [monitoringSearch]);

  const addMonitoringVital = (template?: typeof VITALS_LIBRARY[0]) => {
    const id = makeId();
    const vitalLabel = template?.name || '';
    const vitalValue = template?.name || '';
    const vitalLocalName = template?.vital || template?.name || '';
    const frequencyDefault = template?.monitoringFrequency?.[0] || '';
    setMonitoringVitals((prev) => [
      ...prev,
      {
        id,
        vital: vitalLabel,
        vital_local_name: vitalLocalName,
        type: template?.type || '1',
        frequency: frequencyDefault,
        target_range_low: template?.targetRange?.adults?.low ? `${template.targetRange.adults.low}` : '',
        target_range_high: template?.targetRange?.adults?.high ? `${template.targetRange.adults.high}` : '',
        alert_low: template?.alertValues?.adults?.low ? `${template.alertValues.adults.low}` : '',
        alert_high: template?.alertValues?.adults?.high ? `${template.alertValues.adults.high}` : '',
      },
    ]);
  };

  const updateMonitoringVital = (id: string, changes: Partial<MonitoringVital>) => {
    setMonitoringVitals((prev) => prev.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  };

  const deleteMonitoringVital = (id: string) => {
    setMonitoringVitals((prev) => prev.filter((item) => item.id !== id));
  };

  const monitoringPayload = () => ({
    vital: monitoringVitals.map((item) => item.vital),
    vital_local_name: monitoringVitals.map((item) => item.vital_local_name),
    type: monitoringVitals.map((item) => item.type),
    frequency: monitoringVitals.map((item) => item.frequency),
    target_range_low: monitoringVitals.map((item) => item.target_range_low),
    target_range_high: monitoringVitals.map((item) => item.target_range_high),
    alert_low: monitoringVitals.map((item) => item.alert_low),
    alert_high: monitoringVitals.map((item) => item.alert_high),
  });

  const updateTpMedicationStatus = async (row: JsonRow, statusInfo: string) => {
    const type = asText(row.type);
    const id = asText(row.id);
    if (!id) return;
    const endpoint = type === 'infusion'
      ? '/legacy/request-medications/alter-request-infusion-status/'
      : '/legacy/request-medications/alter-request-prescription-status/';
    await saveForm(`med_status_${id}`, endpoint, { id, status_info: statusInfo, reason: `Updated from Treatment Plan (${statusInfo})` });
  };

  const updateTpMedicationFrequency = async (row: JsonRow, frequencyId: string) => {
    const type = asText(row.type);
    const id = asText(row.id);
    if (!id || !frequencyId) return;
    const endpoint = type === 'infusion'
      ? '/legacy/request-medications/alter-request-infusion-frequency/'
      : '/legacy/request-medications/alter-request-prescription-frequency/';
    await saveForm(`med_freq_${id}`, endpoint, { id, frequency: frequencyId });
  };

  const diagnosisSummary = useMemo(() => {
    const rows: string[] = [];
    diagnosisRows.forEach((row) => {
      const groups = [
        ['patient_visit_primary_diagnoses', 'primary_diagnosis'],
        ['patient_visit_provisional_diagnoses', 'diagnosis'],
        ['patient_visit_differential_diagnoses', 'diagnosis'],
        ['patient_visit_other_diagnoses', 'diagnosis'],
      ] as const;
      groups.forEach(([groupKey, diagKey]) => {
        const list = Array.isArray(row[groupKey] as unknown[]) ? (row[groupKey] as JsonRow[]) : [];
        list.forEach((item) => {
          const diag = (item[diagKey] as JsonRow | undefined) || {};
          const name = asText(diag.name);
          const code = asText(diag.code);
          if (name) rows.push(`${name}${code ? ` (${code})` : ''}`);
        });
      });
    });
    return rows.slice(0, 8);
  }, [diagnosisRows]);

  const recentUpdates = useMemo(() => {
    const points: Array<{ title: string; date: string }> = [];
    const collect = (title: string, list: JsonRow[]) => {
      const row = list[0];
      if (!row) return;
      const date = asText(row.date_created || row.date_added || row.date_modified);
      if (!date) return;
      points.push({ title, date });
    };
    collect('Special Instructions', specialNotes);
    collect('Medication Notes', medicationNotes);
    collect('Lifestyle Recommendation', lifestyleRows);
    collect('Monitoring Plan', monitoringRows);
    collect('Progress Notes', progressRows);
    collect('Clinical Decision', clinicalRows);
    collect('Care Coordination', careRows);
    collect('Outcome Measures', outcomeRows);
    return points.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  }, [specialNotes, medicationNotes, lifestyleRows, monitoringRows, progressRows, clinicalRows, careRows, outcomeRows]);

  const diagnosisOptions = useMemo(() => {
    const options: ClinicalDiagnosisEntry[] = [];
    diagnosisRows.forEach((row) => {
      const groups = [
        ['patient_visit_primary_diagnoses', 'primary_diagnosis', 'primary'],
        ['patient_visit_provisional_diagnoses', 'diagnosis', 'provisional'],
        ['patient_visit_differential_diagnoses', 'diagnosis', 'differential'],
        ['patient_visit_other_diagnoses', 'diagnosis', 'other'],
      ] as const;
      groups.forEach(([groupKey, diagKey, diagType]) => {
        const list = Array.isArray(row[groupKey] as unknown[]) ? (row[groupKey] as JsonRow[]) : [];
        list.forEach((item) => {
          const diag = (item[diagKey] as JsonRow | undefined) || {};
          const description = asText(diag.name);
          if (!description) return;
          options.push({
            diagnosis_record_id: asText(item.id),
            diagnosis_type: diagType,
            diagnosis_description: description,
            sub_diagnosis: asText(item.sub_diagnosis_id || (item.sub_diagnosis as JsonRow | undefined)?.id),
            standard_diagnosis_id: asText(diag.id || item.standard_diagnosis_id),
            clinical_stage: '',
            diagnosis_notes: '',
          });
        });
      });
    });
    const map = new Map<string, ClinicalDiagnosisEntry>();
    options.forEach((item) => {
      const key = `${item.diagnosis_type}__${item.diagnosis_record_id}__${item.diagnosis_description}`;
      if (!map.has(key)) map.set(key, item);
    });
    return Array.from(map.values());
  }, [diagnosisRows]);

  const syncClinicalDiagnosisSelection = (next: string[]) => {
    const selected = diagnosisOptions.filter((opt) => next.includes(`${opt.diagnosis_type}__${opt.diagnosis_record_id}`));
    setClinicalDiagnoses((prev) =>
      selected.map((item) => {
        const key = `${item.diagnosis_type}__${item.diagnosis_record_id}`;
        const old = prev.find((p) => `${p.diagnosis_type}__${p.diagnosis_record_id}` === key);
        return old ? old : item;
      }),
    );
  };

  const selectedClinicalDiagnosisKeys = clinicalDiagnoses.map((item) => `${item.diagnosis_type}__${item.diagnosis_record_id}`);
  const updateFirstLineTherapy = (index: number, key: keyof ClinicalTherapyEntry, value: string) => {
    setFirstLineTherapies((prev) => prev.map((row, idx) => (idx === index ? { ...row, [key]: value } : row)));
  };
  const updateSecondLineTherapy = (index: number, key: keyof ClinicalTherapyEntry, value: string) => {
    setSecondLineTherapies((prev) => prev.map((row, idx) => (idx === index ? { ...row, [key]: value } : row)));
  };
  const latestLifestyle = lifestyleRows[0] || null;
  const latestProgress = progressRows[0] || null;
  const latestClinical = clinicalRows[0] || null;
  const latestOutcome = outcomeRows[0] || null;
  const latestContingency = contingencyRows[0] || null;
  const latestReferral = referralRows[0] || null;
  const latestSurgical = surgicalManagementRows[0] || null;
  const medicalHistory = Array.isArray(medicalManagement?.medical_history as unknown[]) ? (medicalManagement?.medical_history as JsonRow[]) : [];
  const costHistory = Array.isArray(medicalManagement?.cost_history as unknown[]) ? (medicalManagement?.cost_history as JsonRow[]) : [];
  const latestMedicalSafety = medicalHistory[0] || null;
  const latestCost = costHistory[0] || null;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" onClick={() => setActiveTab('dashboard')} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${activeTab === 'dashboard' ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-700'}`}>Dashboard</button>
        <button type="button" onClick={() => setActiveTab('detail')} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${activeTab === 'detail' ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-700'}`}>Detail View And Additions</button>
      </div>
      {error ? <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p> : null}
      {activeTab === 'dashboard' ? (
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Diagnosis Summary</p>
            <div className="space-y-1 text-xs text-slate-700">
              {diagnosisSummary.map((item, idx) => <p key={`${item}_${idx}`}>{item}</p>)}
              {!diagnosisSummary.length ? <p className="text-slate-400">No diagnosis data.</p> : null}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Vital Signs Monitoring</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
              <span>BP: <b>{asText(latestVital?.blood_pressure_1) || '-'} / {asText(latestVital?.blood_pressure_2) || '-'}</b></span>
              <span>RR: <b>{asText(latestVital?.respiratory_rate) || '-'}</b></span>
              <span>Temp: <b>{asText(latestVital?.temperature) || '-'}</b></span>
              <span>SpO2: <b>{asText(latestVital?.oxygen_saturation) || '-'}</b></span>
              <span>Wt: <b>{asText(latestVital?.weight) || '-'}</b></span>
              <span>BMI: <b>{asText(latestVital?.bmi) || '-'}</b></span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Medications</p>
            <p className="text-xs text-slate-700">Medication rows: <b>{medicationRows.length}</b></p>
            <p className="text-xs text-slate-700">Prescriptions: <b>{prescriptionRows.length}</b></p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Investigations</p>
            <p className="text-xs text-slate-700">Lab requests: <b>{requestLabRows.length}</b></p>
            <p className="text-xs text-slate-700">Scan requests: <b>{requestScanRows.length}</b></p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Care Goals</p>
              <div className="space-y-1 text-xs text-slate-700">
                {monitoringRows.slice(0, 4).map((row) => (
                <p key={asText(row.id)}>
                  {asText(row.short_term_goals) || asText(row.vital) || 'Monitoring'}
                  {asText(row.long_term_goals) ? ` | ${asText(row.long_term_goals)}` : asText(row.frequency) ? `: ${asText(row.frequency)}` : ''}
                </p>
              ))}
              {!monitoringRows.length ? <p className="text-slate-400">No monitoring plans.</p> : null}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Latest Lifestyle Plan</p>
            <p className="text-xs text-slate-700">Diet: <b>{asText(latestLifestyle?.diet_notes) || '-'}</b></p>
            <p className="text-xs text-slate-700">Activity: <b>{asText(latestLifestyle?.activity_type) || '-'}</b> ({asText(latestLifestyle?.intensity) || '-'})</p>
            <p className="text-xs text-slate-500">{asText(latestLifestyle?.date_created) ? new Date(asText(latestLifestyle?.date_created)).toLocaleString() : 'No record'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Latest Progress Note</p>
            <p className="text-xs text-slate-700">Status: <b>{asText(latestProgress?.disease_status) || '-'}</b></p>
            <p className="line-clamp-2 text-xs text-slate-700">{asText(latestProgress?.progress_plan) || asText(latestProgress?.intervention_notes) || '-'}</p>
            <p className="text-xs text-slate-500">{asText(latestProgress?.date_created) ? new Date(asText(latestProgress?.date_created)).toLocaleString() : 'No record'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Latest Clinical Decision</p>
            <p className="text-xs text-slate-700">Risk: <b>{asText(latestClinical?.risk_stratification) || '-'}</b></p>
            <p className="line-clamp-2 text-xs text-slate-700">{asText(latestClinical?.findings_summary) || asText(latestClinical?.risk_factors) || '-'}</p>
            <p className="text-xs text-slate-500">{asText(latestClinical?.date_created) ? new Date(asText(latestClinical?.date_created)).toLocaleString() : 'No record'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Medication Safety / Cost</p>
            <p className="text-xs text-slate-700">Drug reviewed: <b>{asText(latestMedicalSafety?.drug_reviewed) || '-'}</b></p>
            <p className="text-xs text-slate-700">Insurance: <b>{asText(latestCost?.insurance_coverage) || '-'}</b></p>
            <p className="text-xs text-slate-700">Generic alternatives: <b>{asText(latestCost?.generic_alternatives) || '-'}</b></p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Outcome Snapshot</p>
            <p className="text-xs text-slate-700">Target: <b>{asText(latestOutcome?.clinical_outcome_targets) || '-'}</b></p>
            <p className="text-xs text-slate-700">QOL: <b>{asText(latestOutcome?.qol_score) || '-'}</b> | Functional: <b>{asText(latestOutcome?.functional_status) || '-'}</b></p>
            <p className="text-xs text-slate-500">{asText(latestOutcome?.date_created) ? new Date(asText(latestOutcome?.date_created)).toLocaleString() : 'No record'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Contingency / Plans</p>
            <p className="line-clamp-2 text-xs text-slate-700">Warning: <b>{asText(latestContingency?.warning_signs) || '-'}</b></p>
            <p className="text-xs text-slate-700">Referral: <b>{asText(latestReferral?.reason) || '-'}</b></p>
            <p className="text-xs text-slate-700">Surgery: <b>{asText(latestSurgical?.procedure_type) || '-'}</b></p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Recent Updates</p>
            <div className="grid gap-2 md:grid-cols-3">
              {recentUpdates.map((row, idx) => (
                <div key={`${row.title}_${idx}`} className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5 text-xs text-slate-700">
                  <p className="font-semibold">{row.title}</p>
                  <p>{new Date(row.date).toLocaleString()}</p>
                </div>
              ))}
              {!recentUpdates.length ? <p className="text-xs text-slate-400">No recent updates yet.</p> : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-[220px_1fr]">
          <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 md:sticky md:top-4 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Treatment Plan Sections</p>
            {detailNavItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setDetailSection(item.key)}
                className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${detailSection === item.key ? 'border border-cyan-300 bg-cyan-50 text-cyan-900 shadow-sm' : 'border border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {detailSection === 'medSafetyCost' && (
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-2 text-xs font-semibold text-slate-600">Medication Safety And Cost Considerations</p>
                <div className="space-y-3">
                  {[
                    { label: 'Drug reviewed', key: 'drug_reviewed', details: 'drug_reviewed_details' },
                    { label: 'Renal dose', key: 'renal_dose', details: 'renal_dose_details' },
                    { label: 'Hepatic dose', key: 'hepatic_dose', details: 'hepatic_dose_details' },
                    { label: 'PDMP', key: 'pdmp', details: 'pdmp_details' },
                  ].map((item) => (
                    <div key={item.key} className="grid gap-2 md:grid-cols-[150px,1fr] items-center">
                      <ToggleYesNo
                        label={item.label}
                        value={medicalForm[item.key as keyof typeof medicalForm] as string}
                        onChange={(value) => setMedicalForm((prev) => ({ ...prev, [item.key]: value }))}
                      />
                      <input
                        placeholder={`${item.label} details`}
                        value={medicalForm[item.details as keyof typeof medicalForm] as string}
                        onChange={(e) => setMedicalForm((prev) => ({ ...prev, [item.details]: e.target.value }))}
                        className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                      />
                    </div>
                  ))}
                  <div className="grid gap-2 md:grid-cols-[150px,1fr] items-center">
                    <ToggleYesNo
                      label="Insurance coverage"
                      value={medicalForm.insurance_coverage}
                      onChange={(value) => setMedicalForm((prev) => ({ ...prev, insurance_coverage: value }))}
                    />
                    <input
                      placeholder="Coverage details"
                      value={medicalForm.insurance_coverage_details}
                      onChange={(e) => setMedicalForm((prev) => ({ ...prev, insurance_coverage_details: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                    />
                  </div>
                  <div className="grid gap-2 md:grid-cols-[150px,1fr] items-center">
                    <ToggleYesNo
                      label="Generic alternatives"
                      value={medicalForm.generic_alternatives}
                      onChange={(value) => setMedicalForm((prev) => ({ ...prev, generic_alternatives: value }))}
                    />
                    <input
                      placeholder="Generic details"
                      value={medicalForm.generic_alternatives_details}
                      onChange={(e) => setMedicalForm((prev) => ({ ...prev, generic_alternatives_details: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                    />
                  </div>
                  <div className="grid gap-2 md:grid-cols-[150px,1fr] items-center">
                    <ToggleYesNo
                      label="Patient assistance"
                      value={medicalForm.patient_assistance}
                      onChange={(value) => setMedicalForm((prev) => ({ ...prev, patient_assistance: value }))}
                    />
                    <input
                      placeholder="Assistance details"
                      value={medicalForm.patient_assistance_details}
                      onChange={(e) => setMedicalForm((prev) => ({ ...prev, patient_assistance_details: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                    />
                  </div>
                </div>
                <button type="button" onClick={() => saveForm('medical', '/legacy/patient-visits/add-medical-management/', { patient_id: patientId, patient_visit_id: visitId, ...medicalForm })} disabled={savingKey === 'medical'} className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">{savingKey === 'medical' ? 'Saving...' : 'Save'}</button>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved Medication Safety</p>
                    {(
                      (Array.isArray(medicalManagement?.medical_history as unknown[]) ? (medicalManagement?.medical_history as JsonRow[]) : [])
                    ).slice(0, 5).map((row) => (
                      <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                        <p>Drug reviewed: <b>{asText(row.drug_reviewed) || '-'}</b></p>
                        <p>Renal: <b>{asText(row.renal_dose) || '-'}</b> | Hepatic: <b>{asText(row.hepatic_dose) || '-'}</b> | PDMP: <b>{asText(row.pdmp) || '-'}</b></p>
                        <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                        <FullRecordPanel row={row} />
                      </div>
                    ))}
                    {!Array.isArray(medicalManagement?.medical_history as unknown[]) || !(medicalManagement?.medical_history as JsonRow[]).length ? <p className="text-[11px] text-slate-500">No saved medication safety entries.</p> : null}
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved Cost Considerations</p>
                    {(
                      (Array.isArray(medicalManagement?.cost_history as unknown[]) ? (medicalManagement?.cost_history as JsonRow[]) : [])
                    ).slice(0, 5).map((row) => (
                      <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                        <p>Insurance: <b>{asText(row.insurance_coverage) || '-'}</b> | Generic: <b>{asText(row.generic_alternatives) || '-'}</b> | Assistance: <b>{asText(row.patient_assistance) || '-'}</b></p>
                        <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                        <FullRecordPanel row={row} />
                      </div>
                    ))}
                    {!Array.isArray(medicalManagement?.cost_history as unknown[]) || !(medicalManagement?.cost_history as JsonRow[]).length ? <p className="text-[11px] text-slate-500">No saved cost entries.</p> : null}
                  </div>
                </div>
              </div>
            )}
            {detailSection === 'lifestyle' && (
              <SimpleCard title="Lifestyle Recommendation" saving={savingKey === 'lifestyle'} onSave={() => saveForm('lifestyle', '/legacy/patients/save-lifestyle-recommendation/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...lifestyleForm })}>
                <div className="grid gap-2 md:grid-cols-3">
                  <input placeholder="Diet notes" value={lifestyleForm.diet_notes} onChange={(e) => setLifestyleForm((p) => ({ ...p, diet_notes: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                  <input placeholder="Current weight" value={lifestyleForm.current_weight} onChange={(e) => setLifestyleForm((p) => ({ ...p, current_weight: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Goal weight" value={lifestyleForm.goal_weight} onChange={(e) => setLifestyleForm((p) => ({ ...p, goal_weight: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="BMI" value={lifestyleForm.bmi} onChange={(e) => setLifestyleForm((p) => ({ ...p, bmi: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Calculated needs" value={lifestyleForm.calculated_needs} onChange={(e) => setLifestyleForm((p) => ({ ...p, calculated_needs: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Prescribed intake" value={lifestyleForm.prescribed_intake} onChange={(e) => setLifestyleForm((p) => ({ ...p, prescribed_intake: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Sodium restriction" value={lifestyleForm.sodium_restriction} onChange={(e) => setLifestyleForm((p) => ({ ...p, sodium_restriction: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Carbs restriction" value={lifestyleForm.carbs_restriction} onChange={(e) => setLifestyleForm((p) => ({ ...p, carbs_restriction: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Protein restriction" value={lifestyleForm.protein_restriction} onChange={(e) => setLifestyleForm((p) => ({ ...p, protein_restriction: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Fluids restriction" value={lifestyleForm.fluids_restriction} onChange={(e) => setLifestyleForm((p) => ({ ...p, fluids_restriction: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Meals per day" value={lifestyleForm.meals_per_day} onChange={(e) => setLifestyleForm((p) => ({ ...p, meals_per_day: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Snacks per day" value={lifestyleForm.snacks_per_day} onChange={(e) => setLifestyleForm((p) => ({ ...p, snacks_per_day: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Activity type" value={lifestyleForm.activity_type} onChange={(e) => setLifestyleForm((p) => ({ ...p, activity_type: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <SearchableSelectField value={lifestyleForm.intensity} onChange={(e) => setLifestyleForm((p) => ({ ...p, intensity: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Intensity</option>
                    <option value="Light">Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Vigorous">Vigorous</option>
                  </SearchableSelectField>
                  <input placeholder="Duration" value={lifestyleForm.duration} onChange={(e) => setLifestyleForm((p) => ({ ...p, duration: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Frequency" value={lifestyleForm.frequency} onChange={(e) => setLifestyleForm((p) => ({ ...p, frequency: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Timing recommendations" value={lifestyleForm.timing_recommendations} onChange={(e) => setLifestyleForm((p) => ({ ...p, timing_recommendations: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                  <textarea placeholder="Special precautions" value={lifestyleForm.special_precautions} onChange={(e) => setLifestyleForm((p) => ({ ...p, special_precautions: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                </div>
                <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="text-[11px] font-semibold text-slate-600">Saved lifestyle recommendations ({lifestyleRows.length})</p>
                  <div className="mt-1 space-y-1">
                    {lifestyleRows.slice(0, 5).map((row) => (
                      <div key={asText(row.id)} className="rounded border border-slate-200 bg-white px-2 py-1.5 text-[11px] text-slate-700">
                        <p>
                          Diet: <b>{asText(row.diet_notes) || '-'}</b> | Activity: <b>{asText(row.activity_type) || '-'}</b> | Intensity: <b>{asText(row.intensity) || '-'}</b>
                        </p>
                        <p className="text-slate-500">
                          {asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}
                        </p>
                        <FullRecordPanel row={row} />
                      </div>
                    ))}
                    {!lifestyleRows.length ? <p className="text-[11px] text-slate-500">No saved lifestyle recommendation for this visit yet.</p> : null}
                  </div>
                </div>
              </SimpleCard>
            )}
            {detailSection === 'monitoring' && (
              <SimpleCard title="Monitoring Plan" saving={savingKey === 'monitoring'} onSave={() => saveForm('monitoring', '/legacy/patients/save-monitoring-plans/', {
                id: makeId(),
                patient_id: patientId,
                patient_visit_id: visitId,
                status_id: '1',
                ...monitoringForm,
                ...monitoringPayload(),
              })}>
                <div className="space-y-4">
                  <div className="grid gap-2 md:grid-cols-3">
                    <input placeholder="Condition/Diagnosis id" value={monitoringForm.standard_diagnoses_id} onChange={(e) => setMonitoringForm((p) => ({ ...p, standard_diagnoses_id: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="When to contact doctor" value={monitoringForm.contact_doctor} onChange={(e) => setMonitoringForm((p) => ({ ...p, contact_doctor: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Recording method" value={monitoringForm.recording_method} onChange={(e) => setMonitoringForm((p) => ({ ...p, recording_method: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <textarea placeholder="Parameters to track" value={monitoringForm.parameters_to_track} onChange={(e) => setMonitoringForm((p) => ({ ...p, parameters_to_track: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                    <textarea placeholder="Short term goals" value={monitoringForm.short_term_goals} onChange={(e) => setMonitoringForm((p) => ({ ...p, short_term_goals: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                    <textarea placeholder="Long term goals" value={monitoringForm.long_term_goals} onChange={(e) => setMonitoringForm((p) => ({ ...p, long_term_goals: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                    <textarea placeholder="Warning signs" value={monitoringForm.warning_signs} onChange={(e) => setMonitoringForm((p) => ({ ...p, warning_signs: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                    <input placeholder="Primary care followup" value={monitoringForm.primary_care_followup} onChange={(e) => setMonitoringForm((p) => ({ ...p, primary_care_followup: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Specialist followup" value={monitoringForm.specialist_followup} onChange={(e) => setMonitoringForm((p) => ({ ...p, specialist_followup: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Laboratory followup" value={monitoringForm.laboratory_followup} onChange={(e) => setMonitoringForm((p) => ({ ...p, laboratory_followup: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Next appointment" value={monitoringForm.next_appointment} onChange={(e) => setMonitoringForm((p) => ({ ...p, next_appointment: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <input
                        placeholder="Search for a vital (e.g., Temperature)"
                        value={monitoringSearch}
                        onChange={(event) => setMonitoringSearch(event.target.value)}
                        className="flex-1 rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                      />
                      <button type="button" onClick={() => addMonitoringVital()} className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold text-slate-500">Add blank vital</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filteredMonitoringOptions.slice(0, 5).map((option) => (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => addMonitoringVital(option)}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700"
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {monitoringVitals.map((row) => (
                      <div key={row.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                        <div className="grid gap-2 md:grid-cols-4">
                          <input value={row.vital} onChange={(e) => updateMonitoringVital(row.id, { vital: e.target.value })} placeholder="Vital" className="rounded-lg border border-slate-300 px-2 py-1 text-xs" />
                          <input value={row.frequency} onChange={(e) => updateMonitoringVital(row.id, { frequency: e.target.value })} placeholder="Frequency" className="rounded-lg border border-slate-300 px-2 py-1 text-xs" />
                          <input value={row.target_range_low} onChange={(e) => updateMonitoringVital(row.id, { target_range_low: e.target.value })} placeholder="Target low" className="rounded-lg border border-slate-300 px-2 py-1 text-xs" />
                          <input value={row.target_range_high} onChange={(e) => updateMonitoringVital(row.id, { target_range_high: e.target.value })} placeholder="Target high" className="rounded-lg border border-slate-300 px-2 py-1 text-xs" />
                          <input value={row.alert_low} onChange={(e) => updateMonitoringVital(row.id, { alert_low: e.target.value })} placeholder="Alert low" className="rounded-lg border border-slate-300 px-2 py-1 text-xs" />
                          <input value={row.alert_high} onChange={(e) => updateMonitoringVital(row.id, { alert_high: e.target.value })} placeholder="Alert high" className="rounded-lg border border-slate-300 px-2 py-1 text-xs" />
                        </div>
                        <div className="mt-2 flex justify-between">
                          <span className="text-[11px] text-slate-500">Type {row.type}</span>
                          <button type="button" onClick={() => deleteMonitoringVital(row.id)} className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SimpleCard>
            )}
            {detailSection === 'progress' && (
              <SimpleCard title="Progress Notes" saving={savingKey === 'progress'} onSave={() => saveForm('progress', '/legacy/patients/save-progress-notes/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...progressForm })}>
                <div className="grid gap-2 md:grid-cols-3">
                  <input placeholder="Visit date" value={progressForm.visit_date} onChange={(e) => setProgressForm((p) => ({ ...p, visit_date: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Symptoms progression" value={progressForm.symptoms_progression} onChange={(e) => setProgressForm((p) => ({ ...p, symptoms_progression: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="New complaints" value={progressForm.new_complaints} onChange={(e) => setProgressForm((p) => ({ ...p, new_complaints: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Treatment updates" value={progressForm.treatment_updates} onChange={(e) => setProgressForm((p) => ({ ...p, treatment_updates: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Patient concerns" value={progressForm.patient_concerns} onChange={(e) => setProgressForm((p) => ({ ...p, patient_concerns: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <SearchableSelectField value={progressForm.medication_compliance} onChange={(e) => setProgressForm((p) => ({ ...p, medication_compliance: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Medication compliance</option>
                    <option value="Full">Full</option>
                    <option value="Partial">Partial</option>
                    <option value="Poor">Poor</option>
                  </SearchableSelectField>
                  <input placeholder="Side effects" value={progressForm.side_effects} onChange={(e) => setProgressForm((p) => ({ ...p, side_effects: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <SearchableSelectField value={progressForm.disease_status} onChange={(e) => setProgressForm((p) => ({ ...p, disease_status: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Disease status</option>
                    <option value="Improved">Improved</option>
                    <option value="Stable">Stable</option>
                    <option value="Worsening">Worsening</option>
                  </SearchableSelectField>
                  <input placeholder="Disease complication" value={progressForm.disease_complication} onChange={(e) => setProgressForm((p) => ({ ...p, disease_complication: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <SearchableSelectField value={progressForm.risk_assessment} onChange={(e) => setProgressForm((p) => ({ ...p, risk_assessment: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Risk assessment</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </SearchableSelectField>
                  <input placeholder="Progress plan" value={progressForm.progress_plan} onChange={(e) => setProgressForm((p) => ({ ...p, progress_plan: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Modify treatment notes" value={progressForm.modify_treatment_notes} onChange={(e) => setProgressForm((p) => ({ ...p, modify_treatment_notes: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Intervention notes" value={progressForm.intervention_notes} onChange={(e) => setProgressForm((p) => ({ ...p, intervention_notes: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Medications" value={progressForm.medications} onChange={(e) => setProgressForm((p) => ({ ...p, medications: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Testing" value={progressForm.testing} onChange={(e) => setProgressForm((p) => ({ ...p, testing: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Referrals" value={progressForm.referrals} onChange={(e) => setProgressForm((p) => ({ ...p, referrals: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Patient education" value={progressForm.patient_education} onChange={(e) => setProgressForm((p) => ({ ...p, patient_education: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Next visit" value={progressForm.next_visit} onChange={(e) => setProgressForm((p) => ({ ...p, next_visit: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <SearchableSelectField value={progressForm.visit_type} onChange={(e) => setProgressForm((p) => ({ ...p, visit_type: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Visit type</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Virtual">Virtual</option>
                  </SearchableSelectField>
                  <input placeholder="Procedure interval" value={progressForm.procedure_interval} onChange={(e) => setProgressForm((p) => ({ ...p, procedure_interval: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Treating physician" value={progressForm.treating_physician} onChange={(e) => setProgressForm((p) => ({ ...p, treating_physician: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Additional care team" value={progressForm.additional_care_team} onChange={(e) => setProgressForm((p) => ({ ...p, additional_care_team: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Documentation checklist (comma-separated)" value={progressForm.documentation_checklist} onChange={(e) => setProgressForm((p) => ({ ...p, documentation_checklist: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                </div>
                <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved progress notes ({progressRows.length})</p>
                  <div className="space-y-1">
                    {progressRows.slice(0, 8).map((row) => (
                      <div key={asText(row.id)} className="rounded border border-slate-200 bg-white px-2 py-1.5 text-[11px] text-slate-700">
                        <p>
                          Status: <b>{asText(row.disease_status) || '-'}</b>
                          {asText(row.symptoms_progression) ? ` | Symptoms: ${asText(row.symptoms_progression)}` : ''}
                        </p>
                        <p>
                          {asText(row.progress_plan) || asText(row.modify_treatment_notes) || asText(row.intervention_notes) || 'No summary'}
                        </p>
                        <p className="text-slate-500">
                          {asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}
                        </p>
                        <FullRecordPanel row={row} />
                      </div>
                    ))}
                    {!progressRows.length ? <p className="text-[11px] text-slate-500">No saved progress note entries for this visit yet.</p> : null}
                  </div>
                </div>
              </SimpleCard>
            )}
            {detailSection === 'clinical' && (
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-2 text-xs font-semibold text-slate-600">Clinical Decision Support</p>
                <div className="space-y-2">
                  <div className="grid gap-2 md:grid-cols-2">
                    <SearchableSelectField
                      multiple
                      value={selectedClinicalDiagnosisKeys}
                      onChange={(e) => syncClinicalDiagnosisSelection(Array.from(e.target.selectedOptions).map((opt) => opt.value))}
                      className="min-h-24 rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                    >
                      {diagnosisOptions.map((row) => (
                        <option key={`${row.diagnosis_type}__${row.diagnosis_record_id}`} value={`${row.diagnosis_type}__${row.diagnosis_record_id}`}>
                          [{row.diagnosis_type}] {row.diagnosis_description}
                        </option>
                      ))}
                    </SearchableSelectField>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-600">
                      {clinicalDiagnoses.length ? `${clinicalDiagnoses.length} diagnoses selected.` : 'Select one or more diagnoses.'}
                    </div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    <SearchableSelectField value={clinicalForm.risk_stratification} onChange={(e) => setClinicalForm((p) => ({ ...p, risk_stratification: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                      <option value="">Risk stratification</option>
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </SearchableSelectField>
                    <input placeholder="Risk factors" value={clinicalForm.risk_factors} onChange={(e) => setClinicalForm((p) => ({ ...p, risk_factors: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-slate-500">Diagnostics completed</label>
                      <ToggleYesNo label="" value={clinicalForm.diagnostics_completed} onChange={(value) => setClinicalForm((p) => ({ ...p, diagnostics_completed: value }))} />
                    </div>
                    {clinicalForm.diagnostics_completed === 'No' ? (
                      <>
                        <input placeholder="Pending lab tests details" value={clinicalForm.pending_laboratory_tests_details} onChange={(e) => setClinicalForm((p) => ({ ...p, pending_laboratory_tests_details: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                        <input placeholder="Pending imaging details" value={clinicalForm.pending_imaging_details} onChange={(e) => setClinicalForm((p) => ({ ...p, pending_imaging_details: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                        <input placeholder="Other pending details" value={clinicalForm.pending_others_details} onChange={(e) => setClinicalForm((p) => ({ ...p, pending_others_details: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                      </>
                    ) : null}
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <textarea placeholder="Findings summary" value={clinicalForm.findings_summary} onChange={(e) => setClinicalForm((p) => ({ ...p, findings_summary: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Pain management" value={clinicalForm.pain_management} onChange={(e) => setClinicalForm((p) => ({ ...p, pain_management: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Supportive care" value={clinicalForm.supportive_care} onChange={(e) => setClinicalForm((p) => ({ ...p, supportive_care: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Prophylaxis" value={clinicalForm.prophylaxis} onChange={(e) => setClinicalForm((p) => ({ ...p, prophylaxis: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <SearchableSelectField value={clinicalForm.pathway_adherence} onChange={(e) => setClinicalForm((p) => ({ ...p, pathway_adherence: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                      <option value="">Pathway adherence</option>
                      <option value="Full">Full</option>
                      <option value="Modified">Modified</option>
                      <option value="Alternative">Alternative</option>
                    </SearchableSelectField>
                    <input placeholder="Modification rationale" value={clinicalForm.modification_rationale} onChange={(e) => setClinicalForm((p) => ({ ...p, modification_rationale: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Guidelines referenced" value={clinicalForm.guidelines_referenced} onChange={(e) => setClinicalForm((p) => ({ ...p, guidelines_referenced: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Clinical stage" value={clinicalForm.clinical_stage} onChange={(e) => setClinicalForm((p) => ({ ...p, clinical_stage: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    <SearchableSelectField multiple value={immunizations} onChange={(e) => setImmunizations(Array.from(e.target.selectedOptions).map((opt) => opt.value))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                      {PREVENTIVE_IMMUNIZATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                    </SearchableSelectField>
                    <SearchableSelectField multiple value={cancerScreenings} onChange={(e) => setCancerScreenings(Array.from(e.target.selectedOptions).map((opt) => opt.value))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                      {PREVENTIVE_CANCER_SCREENINGS.map((item) => <option key={item} value={item}>{item}</option>)}
                    </SearchableSelectField>
                    <SearchableSelectField multiple value={otherServices} onChange={(e) => setOtherServices(Array.from(e.target.selectedOptions).map((opt) => opt.value))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                      {PREVENTIVE_OTHER_SERVICES.map((item) => <option key={item} value={item}>{item}</option>)}
                    </SearchableSelectField>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <input placeholder="Immunizations (free text)" value={clinicalForm.immunizations_value} onChange={(e) => setClinicalForm((p) => ({ ...p, immunizations_value: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Cancer screenings (free text)" value={clinicalForm.cancer_screenings_value} onChange={(e) => setClinicalForm((p) => ({ ...p, cancer_screenings_value: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                    <input placeholder="Other services (free text)" value={clinicalForm.other_services_value} onChange={(e) => setClinicalForm((p) => ({ ...p, other_services_value: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-2" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-slate-500">First-Line Therapy</p>
                    {firstLineTherapies.map((row, idx) => (
                      <div key={`fl_${idx}`} className="grid gap-2 md:grid-cols-12">
                        <textarea placeholder="Primary treatment/drug" value={row.primary_treatment} onChange={(e) => updateFirstLineTherapy(idx, 'primary_treatment', e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-4" />
                        <textarea placeholder="Dosage & dosing" value={row.dosage_dosing} onChange={(e) => updateFirstLineTherapy(idx, 'dosage_dosing', e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-4" />
                        <textarea placeholder="Notes" value={row.therapy_notes} onChange={(e) => updateFirstLineTherapy(idx, 'therapy_notes', e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                        <button type="button" onClick={() => setFirstLineTherapies((prev) => prev.filter((_, i) => i !== idx))} className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-1.5 text-[11px] font-semibold text-rose-700 md:col-span-1">Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setFirstLineTherapies((prev) => [...prev, { primary_treatment: '', dosage_dosing: '', therapy_notes: '', indication_for_use: '' }])} className="rounded-lg border border-sky-200 bg-sky-50 px-2 py-1.5 text-[11px] font-semibold text-sky-700">+ Add first-line therapy</button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-slate-500">Alternative / Second-Line Therapy</p>
                    {secondLineTherapies.map((row, idx) => (
                      <div key={`sl_${idx}`} className="grid gap-2 md:grid-cols-12">
                        <textarea placeholder="Alternative treatment/drug" value={row.primary_treatment} onChange={(e) => updateSecondLineTherapy(idx, 'primary_treatment', e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                        <textarea placeholder="Indication for use" value={row.indication_for_use} onChange={(e) => updateSecondLineTherapy(idx, 'indication_for_use', e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                        <textarea placeholder="Dosage & dosing" value={row.dosage_dosing} onChange={(e) => updateSecondLineTherapy(idx, 'dosage_dosing', e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3" />
                        <textarea placeholder="Notes" value={row.therapy_notes} onChange={(e) => updateSecondLineTherapy(idx, 'therapy_notes', e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-2" />
                        <button type="button" onClick={() => setSecondLineTherapies((prev) => prev.filter((_, i) => i !== idx))} className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-1.5 text-[11px] font-semibold text-rose-700 md:col-span-1">Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setSecondLineTherapies((prev) => [...prev, { primary_treatment: '', dosage_dosing: '', therapy_notes: '', indication_for_use: '' }])} className="rounded-lg border border-sky-200 bg-sky-50 px-2 py-1.5 text-[11px] font-semibold text-sky-700">+ Add alternative therapy</button>
                  </div>
                  <button
                    type="button"
                    onClick={() => saveForm('clinical', '/legacy/patients/save-clinical-decision-support/', {
                      id: makeId(),
                      patient_id: patientId,
                      patient_visit_id: visitId,
                      ...clinicalForm,
                      immunizations,
                      cancer_screenings: cancerScreenings,
                      other_services: otherServices,
                      diagnoses: clinicalDiagnoses,
                      first_line_therapies: firstLineTherapies,
                      second_line_therapies: secondLineTherapies,
                    })}
                    disabled={savingKey === 'clinical'}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                  >
                    {savingKey === 'clinical' ? 'Saving...' : 'Save clinical decision support'}
                  </button>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved clinical decisions ({clinicalRows.length})</p>
                    {clinicalRows.slice(0, 8).map((row) => (
                      <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                        <p>Risk: <b>{asText(row.risk_stratification) || '-'}</b> | Diagnostics: <b>{asText(row.diagnostics_completed) || '-'}</b></p>
                        <p>{asText(row.findings_summary) || asText(row.risk_factors) || 'No summary'}</p>
                        <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                        <FullRecordPanel row={row} />
                      </div>
                    ))}
                    {!clinicalRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                  </div>
                </div>
              </div>
            )}
            {detailSection === 'care' && (
              <SimpleCard title="Care Coordination" saving={savingKey === 'care'} onSave={() => saveForm('care', '/legacy/patients/save-care-coordination/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...careForm })}>
                <textarea placeholder="Communication plan" value={careForm.communication_plan} onChange={(e) => setCareForm((p) => ({ ...p, communication_plan: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Role responsibilities" value={careForm.role_reponsibilities} onChange={(e) => setCareForm((p) => ({ ...p, role_reponsibilities: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Care gaps identified" value={careForm.care_gaps} onChange={(e) => setCareForm((p) => ({ ...p, care_gaps: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved care coordination ({careRows.length})</p>
                  {careRows.slice(0, 8).map((row) => (
                    <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                      <p>{asText(row.communication_plan) || '-'}</p>
                      <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                      <FullRecordPanel row={row} />
                    </div>
                  ))}
                  {!careRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                </div>
              </SimpleCard>
            )}
            {detailSection === 'social' && (
              <SimpleCard title="Social Determinants Of Health" saving={savingKey === 'social'} onSave={() => saveForm('social', '/legacy/patients/save-social-determinants/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...socialForm })}>
                <div className="grid gap-2 md:grid-cols-3">
                  <SearchableSelectField value={socialForm.housingStatus} onChange={(e) => setSocialForm((p) => ({ ...p, housingStatus: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs"><option value="">Housing status</option><option value="Stable">Stable</option><option value="Temporary">Temporary</option><option value="Homeless">Homeless</option></SearchableSelectField>
                  <SearchableSelectField value={socialForm.foodSecurity} onChange={(e) => setSocialForm((p) => ({ ...p, foodSecurity: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs"><option value="">Food security</option><option value="Secure">Secure</option><option value="Insecure">Insecure</option></SearchableSelectField>
                  <input placeholder="Housing notes" value={socialForm.housing_notes} onChange={(e) => setSocialForm((p) => ({ ...p, housing_notes: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                </div>
                <div className="grid gap-2 md:grid-cols-4">
                  {[
                    ['has_reliable_vehicle', 'Reliable vehicle'],
                    ['has_family', 'Family support'],
                    ['financial_barriers_medications', 'Barrier: medications'],
                    ['transportation_services', 'Referral: transport'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700">
                      <input type="checkbox" checked={asText(socialForm[key as keyof typeof socialForm]) === 'yes'} onChange={(e) => setSocialForm((p) => ({ ...p, [key]: e.target.checked ? 'yes' : '' }))} />
                      {label}
                    </label>
                  ))}
                </div>
                <textarea placeholder="Transportation notes" value={socialForm.transportation_notes} onChange={(e) => setSocialForm((p) => ({ ...p, transportation_notes: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Food security notes" value={socialForm.food_security_notes} onChange={(e) => setSocialForm((p) => ({ ...p, food_security_notes: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Social support notes" value={socialForm.social_support_notes} onChange={(e) => setSocialForm((p) => ({ ...p, social_support_notes: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Financial barriers notes" value={socialForm.financial_barriers_notes} onChange={(e) => setSocialForm((p) => ({ ...p, financial_barriers_notes: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Other referrals" value={socialForm.other_referrals} onChange={(e) => setSocialForm((p) => ({ ...p, other_referrals: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved social determinants ({socialRows.length})</p>
                  {socialRows.slice(0, 8).map((row) => (
                    <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                      <p>Housing: <b>{asText(row.housingStatus) || '-'}</b> | Food: <b>{asText(row.foodSecurity) || '-'}</b></p>
                      <p>{asText(row.social_support_notes) || asText(row.financial_barriers_notes) || 'No summary'}</p>
                      <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                      <FullRecordPanel row={row} />
                    </div>
                  ))}
                  {!socialRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                </div>
              </SimpleCard>
            )}
            {detailSection === 'engagement' && (
              <SimpleCard title="Patient Engagement / Education" saving={savingKey === 'engagement'} onSave={() => saveForm('engagement', '/legacy/patients/save-patient-engagement/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...engagementForm })}>
                <div className="grid gap-2 md:grid-cols-3">
                  <input placeholder="Primary language" value={engagementForm.primary_language} onChange={(e) => setEngagementForm((p) => ({ ...p, primary_language: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Learning barriers" value={engagementForm.learning_barriers} onChange={(e) => setEngagementForm((p) => ({ ...p, learning_barriers: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Topics covered" value={engagementForm.topics_covered} onChange={(e) => setEngagementForm((p) => ({ ...p, topics_covered: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                </div>
                <div className="grid gap-2 md:grid-cols-4">
                  {[
                    ['interpreter_needed', 'Interpreter needed'],
                    ['visual_learner', 'Visual learner'],
                    ['auditory_learner', 'Auditory learner'],
                    ['hands_on_learner', 'Hands-on learner'],
                    ['verbal_format', 'Verbal format'],
                    ['written_format', 'Written format'],
                    ['video_format', 'Video format'],
                    ['demo_format', 'Demonstration format'],
                    ['understanding_verified', 'Understanding verified'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700">
                      <input type="checkbox" checked={asText(engagementForm[key as keyof typeof engagementForm]) === 'yes'} onChange={(e) => setEngagementForm((p) => ({ ...p, [key]: e.target.checked ? 'yes' : '' }))} />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <textarea placeholder="Take-home materials" value={engagementForm.take_home_materials} onChange={(e) => setEngagementForm((p) => ({ ...p, take_home_materials: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Patient goals" value={engagementForm.patient_goals} onChange={(e) => setEngagementForm((p) => ({ ...p, patient_goals: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <textarea placeholder="Barriers to achievement" value={engagementForm.achievement_barriers} onChange={(e) => setEngagementForm((p) => ({ ...p, achievement_barriers: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Support person" value={engagementForm.support_person} onChange={(e) => setEngagementForm((p) => ({ ...p, support_person: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Check-in method" value={engagementForm.checkin_method} onChange={(e) => setEngagementForm((p) => ({ ...p, checkin_method: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Check-in frequency" value={engagementForm.checkin_frequency} onChange={(e) => setEngagementForm((p) => ({ ...p, checkin_frequency: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved patient engagement ({engagementRows.length})</p>
                  {engagementRows.slice(0, 8).map((row) => (
                    <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                      <p>Language: <b>{asText(row.primary_language) || '-'}</b> | Check-in: <b>{asText(row.checkin_method) || '-'}</b></p>
                      <p>{asText(row.topics_covered) || asText(row.patient_goals) || 'No summary'}</p>
                      <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                      <FullRecordPanel row={row} />
                    </div>
                  ))}
                  {!engagementRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                </div>
              </SimpleCard>
            )}
            {detailSection === 'outcome' && (
              <SimpleCard title="Outcome Measures" saving={savingKey === 'outcome'} onSave={() => saveForm('outcome', '/legacy/patients/save-outcome-measure/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...outcomeForm })}>
                <textarea placeholder="Clinical outcome targets" value={outcomeForm.clinical_outcome_targets} onChange={(e) => setOutcomeForm((p) => ({ ...p, clinical_outcome_targets: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <div className="grid gap-2 md:grid-cols-3">
                  <input type="number" min={0} max={100} placeholder="QOL score (0-100)" value={outcomeForm.qol_score} onChange={(e) => setOutcomeForm((p) => ({ ...p, qol_score: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Functional status" value={outcomeForm.functional_status} onChange={(e) => setOutcomeForm((p) => ({ ...p, functional_status: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Medication adherence rate" value={outcomeForm.medication_adherence_rate} onChange={(e) => setOutcomeForm((p) => ({ ...p, medication_adherence_rate: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                </div>
                <textarea placeholder="Symptom burden" value={outcomeForm.symptom_burden} onChange={(e) => setOutcomeForm((p) => ({ ...p, symptom_burden: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <input type="number" min={0} max={100} placeholder="Appointment adherence rate (%)" value={outcomeForm.appointment_adherence_rate} onChange={(e) => setOutcomeForm((p) => ({ ...p, appointment_adherence_rate: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Lifestyle modification adherence" value={outcomeForm.lifestyle_modification_adherence} onChange={(e) => setOutcomeForm((p) => ({ ...p, lifestyle_modification_adherence: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved outcomes ({outcomeRows.length})</p>
                  {outcomeRows.slice(0, 8).map((row) => (
                    <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                      <p>Target: <b>{asText(row.clinical_outcome_targets) || '-'}</b> | QOL: <b>{asText(row.qol_score) || '-'}</b></p>
                      <p>{asText(row.functional_status) || asText(row.symptom_burden) || 'No summary'}</p>
                      <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                      <FullRecordPanel row={row} />
                    </div>
                  ))}
                  {!outcomeRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                </div>
              </SimpleCard>
            )}
            {detailSection === 'contingency' && (
              <SimpleCard title="Contingency Planning" saving={savingKey === 'contingency'} onSave={() => saveForm('contingency', '/legacy/patients/save-contingency-plan/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...contingencyForm })}>
                <textarea placeholder="Warning signs" value={contingencyForm.warning_signs} onChange={(e) => setContingencyForm((p) => ({ ...p, warning_signs: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="When to seek emergency care" value={contingencyForm.emergency_care} onChange={(e) => setContingencyForm((p) => ({ ...p, emergency_care: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Emergency contacts" value={contingencyForm.emergency_contacts} onChange={(e) => setContingencyForm((p) => ({ ...p, emergency_contacts: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <input placeholder="Preferred emergency facility" value={contingencyForm.emergency_facility} onChange={(e) => setContingencyForm((p) => ({ ...p, emergency_facility: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Medication access plan" value={contingencyForm.medication_access} onChange={(e) => setContingencyForm((p) => ({ ...p, medication_access: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Care access plan" value={contingencyForm.care_access} onChange={(e) => setContingencyForm((p) => ({ ...p, care_access: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <textarea placeholder="Support systems" value={contingencyForm.support_systems} onChange={(e) => setContingencyForm((p) => ({ ...p, support_systems: e.target.value }))} rows={2} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved contingency plans ({contingencyRows.length})</p>
                  {contingencyRows.slice(0, 8).map((row) => (
                    <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                      <p>Warning signs: <b>{asText(row.warning_signs) || '-'}</b></p>
                      <p>{asText(row.emergency_care) || asText(row.support_systems) || 'No summary'}</p>
                      <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                      <FullRecordPanel row={row} />
                    </div>
                  ))}
                  {!contingencyRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                </div>
              </SimpleCard>
            )}
            {detailSection === 'medicationManagement' && (
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-2 text-xs font-semibold text-slate-600">Medication Management</p>
                <div className="space-y-2">
                  {tpMedicationRows.map((row) => {
                    const id = asText(row.id);
                    const status = asText(row.status_info || row.status_id);
                    const frequencyOptions = Array.isArray(row.frequency_options as unknown[]) ? (row.frequency_options as JsonRow[]) : [];
                    return (
                      <div key={id || Math.random()} className="grid gap-2 rounded-lg border border-slate-200 p-2 md:grid-cols-12">
                        <div className="md:col-span-4">
                          <p className="text-xs font-semibold text-slate-700">{asText(row.name) || asText(row.drug_name) || 'Medication'}</p>
                          <p className="text-[11px] text-slate-500">Type: {asText(row.type) || 'medication'} | Status: {status || '-'}</p>
                        </div>
                        <SearchableSelectField onChange={(e) => e.target.value && updateTpMedicationStatus(row, e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3">
                          <option value="">Update status</option>
                          <option value="On track">On track</option>
                          <option value="Needs review">Needs review</option>
                          <option value="Discontinued">Discontinued</option>
                        </SearchableSelectField>
                        <SearchableSelectField onChange={(e) => e.target.value && updateTpMedicationFrequency(row, e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs md:col-span-3">
                          <option value="">Change frequency</option>
                          {frequencyOptions.map((f) => <option key={asText(f.id)} value={asText(f.id)}>{asText(f.name) || asText(f.frequency)}</option>)}
                        </SearchableSelectField>
                        <div className="text-[11px] text-slate-500 md:col-span-2">Qty: {asText(row.quantity_issued || row.quantity) || '-'}</div>
                      </div>
                    );
                  })}
                  {!tpMedicationRows.length ? <p className="text-xs text-slate-500">No treatment-plan medication rows found.</p> : null}
                </div>
              </div>
            )}
            {detailSection === 'investigation' && (
              <SimpleCard title="Investigation / Referral" saving={savingKey === 'referral'} onSave={() => saveForm('referral', '/legacy/patients/save-referral-treatment-action/', { patient_id: patientId, patient_visit_id: visitId, specialty_id: referralForm.specialty_id, reason: referralForm.reason })}>
                <SearchableSelectField value={referralForm.specialty_id} onChange={(e) => setReferralForm((p) => ({ ...p, specialty_id: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                  <option value="">Select specialty</option>
                  {specialtyOptions.map((s) => <option key={asText(s.id)} value={asText(s.id)}>{asText(s.name)}</option>)}
                </SearchableSelectField>
                <textarea placeholder="Referral reason / clinical question" value={referralForm.reason} onChange={(e) => setReferralForm((p) => ({ ...p, reason: e.target.value }))} rows={3} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved referrals ({referralRows.length})</p>
                  {referralRows.slice(0, 8).map((row) => (
                    <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                      <p>Specialty: <b>{asText((row.specialty as JsonRow | undefined)?.name) || asText(row.specialty_id) || '-'}</b></p>
                      <p>{asText(row.reason) || '-'}</p>
                      <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                      <FullRecordPanel row={row} />
                    </div>
                  ))}
                  {!referralRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                </div>
              </SimpleCard>
            )}
            {detailSection === 'surgical' && (
              <SimpleCard title="Surgical Management" saving={savingKey === 'surgical'} onSave={() => saveForm('surgical', '/legacy/request-surgeries/save-surgical-management/', { id: makeId(), patient_id: patientId, patient_visit_id: visitId, ...surgeryForm })}>
                <div className="grid gap-2 md:grid-cols-3">
                  <input placeholder="Surgical intervention status" value={surgeryForm.surgical_intervention_status} onChange={(e) => setSurgeryForm((p) => ({ ...p, surgical_intervention_status: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Other tests" value={surgeryForm.other_tests} onChange={(e) => setSurgeryForm((p) => ({ ...p, other_tests: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Procedure type" value={surgeryForm.procedure_type} onChange={(e) => setSurgeryForm((p) => ({ ...p, procedure_type: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Estimated duration" value={surgeryForm.estimated_duration} onChange={(e) => setSurgeryForm((p) => ({ ...p, estimated_duration: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Length of stay" value={surgeryForm.length_of_stay} onChange={(e) => setSurgeryForm((p) => ({ ...p, length_of_stay: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Admission type" value={surgeryForm.admission_type} onChange={(e) => setSurgeryForm((p) => ({ ...p, admission_type: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Post-op procedure type" value={surgeryForm.post_op_procedure_type} onChange={(e) => setSurgeryForm((p) => ({ ...p, post_op_procedure_type: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Pain management" value={surgeryForm.pain_management} onChange={(e) => setSurgeryForm((p) => ({ ...p, pain_management: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Wound care" value={surgeryForm.wound_care} onChange={(e) => setSurgeryForm((p) => ({ ...p, wound_care: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Activity restrictions" value={surgeryForm.activity_restrictions} onChange={(e) => setSurgeryForm((p) => ({ ...p, activity_restrictions: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Restriction duration" value={surgeryForm.duration_restrictions} onChange={(e) => setSurgeryForm((p) => ({ ...p, duration_restrictions: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Rehabilitation type" value={surgeryForm.rehabilitation_type} onChange={(e) => setSurgeryForm((p) => ({ ...p, rehabilitation_type: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Other rehabilitation type" value={surgeryForm.other_rehabilitation_type} onChange={(e) => setSurgeryForm((p) => ({ ...p, other_rehabilitation_type: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Cardiac clearance required" value={surgeryForm.cardiac_clearance_required} onChange={(e) => setSurgeryForm((p) => ({ ...p, cardiac_clearance_required: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                  <input placeholder="Pre-op testing needed" value={surgeryForm.pre_op_testing_needed} onChange={(e) => setSurgeryForm((p) => ({ ...p, pre_op_testing_needed: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  <SearchableSelectField value={surgeryForm.patient_physical_status} onChange={(e) => setSurgeryForm((p) => ({ ...p, patient_physical_status: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Patient physical status</option>
                    {PATIENT_PHYSICAL_STATUS_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </SearchableSelectField>
                  <SearchableSelectField value={surgeryForm.patient_specific_risks} onChange={(e) => setSurgeryForm((p) => ({ ...p, patient_specific_risks: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Patient-specific risks</option>
                    {PATIENT_SPECIFIC_RISK_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </SearchableSelectField>
                  <SearchableSelectField value={surgeryForm.risk_mitigation_strategy} onChange={(e) => setSurgeryForm((p) => ({ ...p, risk_mitigation_strategy: e.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs">
                    <option value="">Risk mitigation strategy</option>
                    {RISK_MITIGATION_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </SearchableSelectField>
                </div>
                <textarea placeholder="Additional notes" value={surgeryForm.additional_notes} onChange={(e) => setSurgeryForm((p) => ({ ...p, additional_notes: e.target.value }))} rows={3} className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <p className="mb-1 text-[11px] font-semibold text-slate-600">Saved surgical plans ({surgicalManagementRows.length})</p>
                  {surgicalManagementRows.slice(0, 8).map((row) => (
                    <div key={asText(row.id)} className="mb-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                      <p>Procedure: <b>{asText(row.procedure_type) || '-'}</b> | Status: <b>{asText(row.surgical_intervention_status) || '-'}</b></p>
                      <p>{asText(row.additional_notes) || asText(row.risk_mitigation_strategy) || 'No summary'}</p>
                      <p className="text-slate-500">{asText(row.date_created) ? new Date(asText(row.date_created)).toLocaleString() : 'No date'}</p>
                      <FullRecordPanel row={row} />
                    </div>
                  ))}
                  {!surgicalManagementRows.length ? <p className="text-[11px] text-slate-500">No records yet.</p> : null}
                </div>
              </SimpleCard>
            )}
          </div>
        </div>
      )}
      {loading ? <p className="text-xs text-slate-500">Loading treatment plan...</p> : null}
    </div>
  );
}

function SimpleCard({
  title,
  saving,
  onSave,
  children,
}: {
  title: string;
  saving: boolean;
  onSave: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="mb-2 text-xs font-semibold text-slate-600">{title}</p>
      <div className="grid gap-2">{children}</div>
      <button type="button" onClick={onSave} disabled={saving} className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">{saving ? 'Saving...' : 'Save'}</button>
    </div>
  );
}

function FullRecordPanel({ row }: { row: JsonRow }) {
  const hidden = new Set([
    'id',
    'patient_id',
    'patient_visit_id',
    'institution_id',
    'user_id',
    'status_id',
    'date_modified',
  ]);
  const labelFor = (key: string) =>
    key
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'string') return value.trim() || '-';
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return value.map((item) => formatValue(item)).join(', ') || '-';
    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      if (obj.name) return formatValue(obj.name);
      if (obj.full_name) return formatValue(obj.full_name);
      return JSON.stringify(obj);
    }
    return String(value);
  };
  const entries = Object.entries(row).filter(([key, value]) => {
    if (hidden.has(key)) return false;
    const text = formatValue(value);
    return text !== '-' && text !== '';
  });
  if (!entries.length) return null;
  return (
    <details className="mt-1">
      <summary className="cursor-pointer text-[10px] font-semibold text-slate-500">Clinical view</summary>
      <div className="mt-1 grid gap-1 rounded border border-slate-200 bg-slate-50 p-2 md:grid-cols-2">
        {entries.map(([key, value]) => (
          <div key={key} className="rounded border border-slate-200 bg-white px-2 py-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{labelFor(key)}</p>
            <p className="text-[11px] text-slate-700">{formatValue(value)}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
