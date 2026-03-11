import { useEffect, useMemo, useState } from 'react';
import SearchableSelectField from './SearchableSelectField';
import { api } from '../lib/api';

type OptionRow = {
  id: string;
  name?: string | null;
  code?: string | null;
  odq_category_id?: string | null;
  odq_category_name?: string | null;
  severity?: string | null;
  color_code?: string | null;
  duration?: string | null;
  body_system_id?: string | null;
};

type JsonRow = Record<string, unknown>;

type ClinicalWorkspace = {
  summary?: {
    notes_count?: number;
    complaints_count?: number;
    odqs_count?: number;
    system_reviews_count?: number;
  };
  latest_note?: {
    cc?: string | null;
    cc_onset?: string | null;
    cc_type?: string | null;
    hopi?: string | null;
    doc_remarks?: string | null;
    past_illnes_hx?: string | null;
  } | null;
  complaints?: Array<Record<string, unknown>>;
  odqs?: Array<Record<string, unknown>>;
  system_reviews?: Array<Record<string, unknown>>;
  past_history?: {
    comorbidities?: Array<Record<string, unknown>>;
    past_medications?: Array<Record<string, unknown>>;
    surgeries?: Array<Record<string, unknown>>;
    allergies?: Array<Record<string, unknown>>;
    haemotransfusions?: Array<Record<string, unknown>>;
  };
  family_histories?: Array<Record<string, unknown>>;
  contraception_histories?: Array<Record<string, unknown>>;
  pregnancy_histories?: Array<Record<string, unknown>>;
  gynaecological_histories?: Array<Record<string, unknown>>;
  obstetric_histories?: Array<Record<string, unknown>>;
  personal_histories?: Array<Record<string, unknown>>;
  options?: {
    odqs?: OptionRow[];
    odq_severities?: OptionRow[];
    odq_durations?: OptionRow[];
    body_systems?: OptionRow[];
    reviews?: OptionRow[];
    contraception_types?: OptionRow[];
    occupations?: OptionRow[];
    locations?: OptionRow[];
    religions?: OptionRow[];
  };
};

type Props = {
  patientId?: string;
  visitId?: string;
  embedded?: boolean;
  initialTab?: ClinicalTabKey;
  allowedTabs?: ClinicalTabKey[];
  showTabStrip?: boolean;
};

type ClinicalTabKey =
  | 'summary'
  | 'chief_complaint'
  | 'past_history'
  | 'direct_questioning'
  | 'review_of_systems'
  | 'family_history'
  | 'contraception_history'
  | 'pregnancy_history'
  | 'gynaecological_history'
  | 'obstetric_history'
  | 'personal_history';

type DqRole = 'triage' | 'doctor' | 'inpatient';
type RosCategoryKey = 'general' | 'head_neck' | 'musculoskeletal' | 'female_exam' | 'cardiorespiratory' | 'extremities' | 'neurology';
type RosTemplateKey =
  | 'general_basic'
  | 'eyes'
  | 'nose'
  | 'mouth'
  | 'neck'
  | 'groin'
  | 'hands'
  | 'breast'
  | 'abdomen'
  | 'cardio'
  | 'respiratory'
  | 'extremity'
  | 'neurology'
  | 'gynaecologic'
  | 'obstetric_abdomen'
  | 'obstetric_pelvic'
  | 'musculoskeletal_pain'
  | 'musculoskeletal_stiffness';
type RosFormField = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: string[];
  placeholder?: string;
};
type RosCategoryItem = {
  key: string;
  label: string;
  template: RosTemplateKey;
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatDateTime = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return raw;
  return dt.toLocaleString();
};

const formatDate = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return raw;
  return dt.toLocaleDateString();
};

const toDateTimeLocalInput = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return '';
  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return '';
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  const hh = String(dt.getHours()).padStart(2, '0');
  const mi = String(dt.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

export default function ClinicalEncounterWorkspace({
  patientId = '',
  visitId = '',
  embedded = false,
  initialTab = 'summary',
  allowedTabs,
  showTabStrip = true,
}: Props) {
  const [workspace, setWorkspace] = useState<ClinicalWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [noteForm, setNoteForm] = useState({
    cc: '',
    cc_onset: '',
    cc_type: '',
    hopi: '',
    doc_remarks: '',
    past_illnes_hx: '',
  });
  const [complaintForm, setComplaintForm] = useState({ complaint: '', duration: '' });
  const [odqForm, setOdqForm] = useState({
    odq_id: '',
    odq_severity_id: '',
    odq_duration_id: '',
    odq_comment: '',
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
  });
  const [systemReviewForm, setSystemReviewForm] = useState({
    body_system_id: '',
    review_id: '',
    description: '',
    condition_status: '',
  });
  const [comorbidityForm, setComorbidityForm] = useState({ description: '', diagnosis: '', diagnosis_icd: '', onset: '' });
  const [medicationForm, setMedicationForm] = useState({ name: '', dose: '', frequency: '', status: 'Current' });
  const [surgeryForm, setSurgeryForm] = useState({ name: '', surgery_date: '', hospital: '' });
  const [allergyForm, setAllergyForm] = useState({ type: 'Drug', name: '', reaction: '', severity: 'Mild' });
  const [transfusionForm, setTransfusionForm] = useState({ type: '', units: '', haemo_period: '', indication: '' });
  const [familyHistoryForm, setFamilyHistoryForm] = useState({
    relationship: '',
    relative_condition: '',
    age_at_onset: '',
    status: 'alive',
    notes: '',
  });
  const [contraceptionForm, setContraceptionForm] = useState({
    contraception_type_id: '',
    date_started: '',
    duration: '',
    complications: '',
  });
  const [pregnancyForm, setPregnancyForm] = useState({
    pregnancy_number: '',
    date_conceived: '',
    mode_of_conception: '',
    mode_of_delivery: '',
    outcome: '',
    pregnancy_complications: '',
    gender_id: '',
    weight: '',
    child_info: '',
  });
  const [gynaecologicalForm, setGynaecologicalForm] = useState({
    date_of_last_menstrual_period: '',
    menarche: '',
    menopause: '',
    cycle_length: '',
    duration_of_bleed: '',
    intermenstrual_bleeding: '',
    intermenstrual_bleeding_details: '',
    dysmenorrhoea: '',
    dysmenorrhoea_details: '',
    post_coital_bleeding: '',
    post_coital_bleeding_details: '',
    dyspareunia: '',
    dyspareunia_details: '',
    number_of_lifetime_sexual_partners: '',
    coital_frequency: '',
    cervical_cancer_screening: '',
    cervical_cancer_screening_details: '',
    breast_screening: '',
    breast_screening_details: '',
    previous_gynaecologic_procedures: '',
    previous_gynaecologic_procedures_details: '',
  });
  const [obstetricForm, setObstetricForm] = useState({
    no_of_pregnancies: '',
    no_of_births: '',
    no_of_abortions_spontaneous: '',
    no_of_abortions_induced: '',
    date_of_last_menstrual_period: '',
    date_of_positive_pregnancy_test: '',
    confirmatory_ultrasound_scan: '',
    date_of_scan: '',
    child_info: '',
    gestational_age: '',
    edd: '',
  });
  const [personalHistoryForm, setPersonalHistoryForm] = useState({
    occupation_id: '',
    location_id: '',
    family_circumstance: '',
    religion_id: '',
    hobbies: '',
    alchohol_intake: '',
    alcohol_details: '',
    tobacco_intake: '',
    tobacco_details: '',
  });
  const [odqSearch, setOdqSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<DqRole>('triage');
  const [selectedOdqId, setSelectedOdqId] = useState('');
  const [historyRoleFilter, setHistoryRoleFilter] = useState<'all' | DqRole>('all');
  const [rosMode, setRosMode] = useState<'history' | 'current'>('current');
  const [openRosCategory, setOpenRosCategory] = useState<RosCategoryKey | null>(null);
  const [rosSystemFilter, setRosSystemFilter] = useState('all');
  const [rosHistoryQuery, setRosHistoryQuery] = useState('');
  const [selectedRosItemKey, setSelectedRosItemKey] = useState('');
  const [selectedRosItemLabel, setSelectedRosItemLabel] = useState('');
  const [rosTemplateValues, setRosTemplateValues] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<ClinicalTabKey>(initialTab);

  const allClinicalTabs: Array<{ key: ClinicalTabKey; label: string; migrated: boolean }> = [
    { key: 'summary', label: 'Summary', migrated: true },
    { key: 'chief_complaint', label: 'Chief Complaint', migrated: true },
    { key: 'past_history', label: 'Past History', migrated: true },
    { key: 'direct_questioning', label: 'Direct Questioning', migrated: true },
    { key: 'family_history', label: 'Family History', migrated: true },
    { key: 'contraception_history', label: 'Contraception History', migrated: true },
    { key: 'pregnancy_history', label: 'Pregnancy History', migrated: true },
    { key: 'gynaecological_history', label: 'Gynaecological History', migrated: true },
    { key: 'obstetric_history', label: 'Obstetric History', migrated: true },
    { key: 'personal_history', label: 'Personal History', migrated: true },
    { key: 'review_of_systems', label: 'Review of Systems', migrated: true },
  ];
  const clinicalTabs = useMemo(() => {
    const source = allowedTabs?.length
      ? allClinicalTabs.filter((tab) => allowedTabs.includes(tab.key))
      : allClinicalTabs.filter((tab) => tab.key !== 'review_of_systems');
    return source;
  }, [allowedTabs]);

  const loadWorkspace = async (opts?: { odqSearchValue?: string; bodySystemId?: string }) => {
    if (!visitId) return;
    const params = new URLSearchParams();
    params.set('patient_visit_id', visitId);
    if (opts?.odqSearchValue) params.set('odq_search', opts.odqSearchValue);
    if (opts?.bodySystemId) params.set('body_system_id', opts.bodySystemId);
    const data = await api.get<ClinicalWorkspace>(`/legacy/patients/clinical-encounter-space/?${params.toString()}`);
    setWorkspace(data);
  };

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!visitId) {
        setError('No selected visit.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await loadWorkspace();
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load clinical encounter workspace.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run().catch(() => {
      if (!mounted) return;
      setLoading(false);
      setError('Unable to load clinical encounter workspace.');
    });
    return () => {
      mounted = false;
    };
  }, [visitId]);

  useEffect(() => {
    const handle = setTimeout(() => {
      loadWorkspace({ odqSearchValue: odqSearch, bodySystemId: systemReviewForm.body_system_id }).catch(() => undefined);
    }, 350);
    return () => clearTimeout(handle);
  }, [odqSearch]);

  useEffect(() => {
    if (!visitId) return;
    loadWorkspace({ odqSearchValue: odqSearch, bodySystemId: systemReviewForm.body_system_id }).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemReviewForm.body_system_id]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, visitId]);

  const odqOptions = workspace?.options?.odqs || [];
  const severityOptions = workspace?.options?.odq_severities || [];
  const durationOptions = workspace?.options?.odq_durations || [];
  const bodySystems = workspace?.options?.body_systems || [];
  const reviews = workspace?.options?.reviews || [];
  const contraceptionTypes = workspace?.options?.contraception_types || [];
  const comorbidities = workspace?.past_history?.comorbidities || [];
  const pastMedications = workspace?.past_history?.past_medications || [];
  const surgeries = workspace?.past_history?.surgeries || [];
  const allergies = workspace?.past_history?.allergies || [];
  const haemotransfusions = workspace?.past_history?.haemotransfusions || [];
  const familyHistories = workspace?.family_histories || [];
  const contraceptionHistories = workspace?.contraception_histories || [];
  const pregnancyHistories = workspace?.pregnancy_histories || [];
  const gynaecologicalHistories = workspace?.gynaecological_histories || [];
  const obstetricHistories = workspace?.obstetric_histories || [];
  const personalHistories = workspace?.personal_histories || [];
  const occupationOptions = workspace?.options?.occupations || [];
  const locationOptions = workspace?.options?.locations || [];
  const religionOptions = workspace?.options?.religions || [];
  const conceptionModes = ['Assisted', 'Natural'];
  const deliveryModes = ['CS', 'Medical evacuation', 'Vaginal Delivery (Induced)', 'Vaginal Delivery (Spontaneous)'];
  const pregnancyOutcomes = ['Live Birth', 'Miscarriage', 'Still Birth', 'Termination'];


  const groupedOdqs = useMemo(() => {
    const grouped: Record<string, OptionRow[]> = {};
    odqOptions.forEach((item) => {
      const label = asText(item.odq_category_name) || 'Other';
      if (!grouped[label]) grouped[label] = [];
      grouped[label].push(item);
    });
    Object.keys(grouped).forEach((key) => {
      grouped[key] = grouped[key].sort((a, b) => asText(a.name).localeCompare(asText(b.name)));
    });
    return grouped;
  }, [odqOptions]);

  const recordedSymptoms = useMemo(() => {
    const rows = (workspace?.odqs || []) as Array<Record<string, unknown>>;
    if (historyRoleFilter === 'all') return rows;
    return rows.filter((row) => asText(row.type) === historyRoleFilter);
  }, [workspace?.odqs, historyRoleFilter]);
  const chiefComplaintNotes = ((workspace?.notes || []) as Array<Record<string, unknown>>).filter((row) => asText(row.cc));
  const systemReviewEntries = (workspace?.system_reviews || []) as Array<Record<string, unknown>>;
  const rosCategories: Array<{ key: RosCategoryKey; title: string; icon: string; items: RosCategoryItem[] }> = [
    {
      key: 'general',
      title: 'General',
      icon: '🩺',
      items: [
        { key: 'general', label: 'General', template: 'general_basic' },
        { key: 'groin', label: 'Groin', template: 'groin' },
        { key: 'abdomen', label: 'Abdomen', template: 'abdomen' },
        { key: 'hands', label: 'Hands', template: 'hands' },
        { key: 'breast', label: 'Breast', template: 'breast' },
      ],
    },
    {
      key: 'head_neck',
      title: 'Head & Neck',
      icon: '👁',
      items: [
        { key: 'eyes', label: 'Eyes', template: 'eyes' },
        { key: 'nose', label: 'Nose', template: 'nose' },
        { key: 'mouth', label: 'Mouth', template: 'mouth' },
        { key: 'neck', label: 'Neck', template: 'neck' },
      ],
    },
    {
      key: 'musculoskeletal',
      title: 'Musculoskeletal',
      icon: '💪',
      items: [
        { key: 'joint_noises', label: 'Joint noises', template: 'musculoskeletal_stiffness' },
        { key: 'joint_stiffness', label: 'Joint stiffness', template: 'musculoskeletal_stiffness' },
        { key: 'difficulty_moving', label: 'Difficulty moving', template: 'musculoskeletal_stiffness' },
        { key: 'pain', label: 'Pain', template: 'musculoskeletal_pain' },
        { key: 'single_joint', label: 'Single joint', template: 'musculoskeletal_pain' },
        { key: 'many_joints', label: 'Many joints', template: 'musculoskeletal_pain' },
      ],
    },
    {
      key: 'female_exam',
      title: 'Female Exam',
      icon: '♀',
      items: [
        { key: 'gynaecologic_exam', label: 'Gynaecologic exam', template: 'gynaecologic' },
        { key: 'abdomen_exam', label: 'Abdomen exam', template: 'obstetric_abdomen' },
        { key: 'pelvic_exam', label: 'Pelvic exam', template: 'obstetric_pelvic' },
      ],
    },
    {
      key: 'cardiorespiratory',
      title: 'Cardiorespiratory',
      icon: '🫀',
      items: [
        { key: 'cardiovascular', label: 'Cardiovascular', template: 'cardio' },
        { key: 'respiratory', label: 'Respiratory', template: 'respiratory' },
      ],
    },
    { key: 'extremities', title: 'Extremities', icon: '⚠', items: [{ key: 'extremity', label: 'Extremity', template: 'extremity' }] },
    { key: 'neurology', title: 'Neurology', icon: '🧠', items: [{ key: 'neurological', label: 'Neurological', template: 'neurology' }] },
  ];
  const rosItemsByKey = useMemo(
    () =>
      rosCategories.reduce<Record<string, RosCategoryItem>>((acc, category) => {
        category.items.forEach((item) => {
          acc[item.key] = item;
        });
        return acc;
      }, {}),
    [rosCategories],
  );
  const rosTemplateByType: Record<RosTemplateKey, RosFormField[]> = {
    general_basic: [
      { key: 'temperature', label: 'Temperature (°C)', type: 'number' },
      { key: 'pulse', label: 'Pulse (bpm)', type: 'number' },
      { key: 'respiratory_rate', label: 'Respiratory Rate (cpm)', type: 'number' },
      { key: 'hydration', label: 'Hydration', type: 'select', options: ['No Dehydration', 'Mild Dehydration', 'Moderate Dehydration', 'Severe Dehydration'] },
      { key: 'distress', label: 'Distress', type: 'select', options: ['No', 'Yes'] },
      { key: 'distress_details', label: 'Distress Details', type: 'text' },
      { key: 'mental_state', label: 'Mental State', type: 'select', options: ['Oriented', 'Confused', 'Anxious/Irritable', 'Lethargic', 'Drowsy', 'Comatose'] },
      { key: 'constitution', label: 'Constitution', type: 'select', options: ['Fit', 'Unfit Looking', 'Anxious/Irritable', 'Muscular', 'Obese', 'Weight Loss', 'Thin'] },
      { key: 'pallor', label: 'Pallor', type: 'select', options: ['No', 'Yes'] },
      { key: 'pallor_details', label: 'Pallor Details', type: 'text' },
      { key: 'jaundice', label: 'Jaundice', type: 'select', options: ['No', 'Yes'] },
      { key: 'jaundice_details', label: 'Jaundice Details', type: 'text' },
      { key: 'cyanosis', label: 'Cyanosis', type: 'select', options: ['No', 'Yes'] },
      { key: 'cyanosis_details', label: 'Cyanosis Details', type: 'text' },
      { key: 'oedema', label: 'Oedema', type: 'select', options: ['None', 'Dependent', 'Generalized'] },
      { key: 'environment', label: 'Environment', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea', placeholder: 'Relevant general findings' },
    ],
    eyes: [
      { key: 'sclera_colour', label: 'Sclera Colour', type: 'text' },
      { key: 'conjunctiva', label: 'Conjunctiva', type: 'select', options: ['Normal', 'Pale', 'Congested'] },
      { key: 'discharge', label: 'Discharge', type: 'select', options: ['No', 'Yes'] },
      { key: 'discharge_details', label: 'Discharge Details', type: 'text' },
      { key: 'strabismus', label: 'Strabismus (Squint)', type: 'select', options: ['No', 'Yes'] },
      { key: 'strabismus_details', label: 'Strabismus Details', type: 'text' },
      { key: 'exophthalmos', label: 'Exophthalmos', type: 'select', options: ['No', 'Yes'] },
      { key: 'exophthalmos_details', label: 'Exophthalmos Details', type: 'text' },
      { key: 'fundoscopy', label: 'Fundoscopy', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    nose: [
      { key: 'flaring_alae_nasae', label: 'Flaring Alae Nasae', type: 'select', options: ['No', 'Yes'] },
      { key: 'discharge', label: 'Discharge', type: 'select', options: ['No', 'Yes'] },
      { key: 'discharge_details', label: 'Discharge Details', type: 'text' },
      { key: 'paranasal_tenderness', label: 'Paranasal Tenderness', type: 'select', options: ['No', 'Yes'] },
      { key: 'paranasal_tenderness_details', label: 'Paranasal Tenderness Details', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    mouth: [
      { key: 'lips', label: 'Lips', type: 'select', options: ['Normal', 'Fissuring', 'Discharge', 'Cheilitis'] },
      { key: 'tongue', label: 'Tongue', type: 'text' },
      { key: 'teeth', label: 'Teeth', type: 'text' },
      { key: 'gums', label: 'Gums', type: 'text' },
      { key: 'pharynx', label: 'Pharynx', type: 'text' },
      { key: 'other_significant_findings', label: 'Other Significant Findings', type: 'textarea' },
    ],
    neck: [
      { key: 'lymph_node', label: 'Lymph Nodes', type: 'text' },
      { key: 'thyroid_gland', label: 'Thyroid Gland', type: 'text' },
      { key: 'other_significant_findings', label: 'Other Significant Findings', type: 'textarea' },
    ],
    groin: [
      { key: 'lymph_node', label: 'Lymph Nodes', type: 'text' },
      { key: 'other_significant_findings', label: 'Other Significant Findings', type: 'textarea' },
    ],
    hands: [
      { key: 'clubbing', label: 'Clubbing', type: 'select', options: ['No Clubbing', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'] },
      { key: 'tremors', label: 'Tremors', type: 'select', options: ['No', 'Yes'] },
      { key: 'tremor_details', label: 'Tremor Details', type: 'text' },
      { key: 'nails', label: 'Nails', type: 'text' },
      { key: 'palms', label: 'Palms', type: 'text' },
      { key: 'joints', label: 'Joints', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    breast: [
      { key: 'inspection', label: 'Inspection', type: 'text' },
      { key: 'palpation', label: 'Palpation', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    abdomen: [
      { key: 'inspection', label: 'Inspection', type: 'text' },
      { key: 'palpation', label: 'Palpation', type: 'text' },
      { key: 'percussion', label: 'Percussion', type: 'text' },
      { key: 'auscultation', label: 'Auscultation', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    cardio: [
      { key: 'rate', label: 'Rate', type: 'text' },
      { key: 'rhythm', label: 'Rhythm', type: 'select', options: ['regular', 'regularly irregular', 'irregularly irregular'] },
      { key: 'volume', label: 'Volume', type: 'select', options: ['normal', 'large', 'small'] },
      { key: 'characteristics', label: 'Character', type: 'text' },
      { key: 'vessel_walls', label: 'Vessel Walls', type: 'select', options: ['normal', 'Impalpable', 'hard'] },
      { key: 'radio_femoral_delay', label: 'Radio-Femoral Delay', type: 'select', options: ['No', 'Yes'] },
      { key: 'blood_pressure', label: 'Blood Pressure (mm Hg)', type: 'text' },
      { key: 'posture', label: 'Posture', type: 'select', options: ['supine', 'sitting', 'standing', 'semi-reclining (45 degrees)'] },
      { key: 'jugular_venous_pressure', label: 'Jugular Venous Pressure', type: 'text' },
      { key: 'variscosities', label: 'Variscosities', type: 'text' },
      { key: 'oedema_heart', label: 'Oedema', type: 'select', options: ['none', 'non-pitting', 'pitting', 'generalised'] },
      { key: 'oedema_heart_comment', label: 'Oedema Comment', type: 'text' },
      { key: 'dyspnoea', label: 'Dyspnoea', type: 'select', options: ['No', 'Yes'] },
      { key: 'orthopnoea', label: 'Orthopnoea', type: 'select', options: ['No', 'Yes'] },
      { key: 'paroxysmal_nocturnal_dyspnoea', label: 'Paroxysmal Nocturnal Dyspnoea', type: 'select', options: ['No', 'Yes'] },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    respiratory: [
      { key: 'respiratory_pattern', label: 'Respiratory Pattern', type: 'text' },
      { key: 'chest_expansion', label: 'Chest Expansion', type: 'text' },
      { key: 'trachea_position', label: 'Trachea Position', type: 'text' },
      { key: 'chest_wall_tenderness', label: 'Chest Wall Tenderness', type: 'select', options: ['No', 'Yes'] },
      { key: 'breath_sounds', label: 'Breath Sounds', type: 'text' },
      { key: 'added_sounds', label: 'Added Sounds', type: 'text' },
      { key: 'percussion_note', label: 'Percussion Note', type: 'text' },
      { key: 'respiratory_distress', label: 'Respiratory Distress', type: 'select', options: ['No', 'Yes'] },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    extremity: [
      { key: 'inspection', label: 'Inspection', type: 'text' },
      { key: 'muscle_bulk', label: 'Muscle Bulk', type: 'text' },
      { key: 'tone', label: 'Tone', type: 'text' },
      { key: 'power', label: 'Power', type: 'text' },
      { key: 'reflexes', label: 'Reflexes', type: 'text' },
      { key: 'sensation', label: 'Sensation', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    neurology: [
      { key: 'higher_mental_function', label: 'Higher Mental Function', type: 'text' },
      { key: 'cranial_nerves', label: 'Cranial Nerves', type: 'text' },
      { key: 'motor_exam', label: 'Motor Exam', type: 'text' },
      { key: 'sensory_exam', label: 'Sensory Exam', type: 'text' },
      { key: 'coordination', label: 'Coordination', type: 'text' },
      { key: 'gait', label: 'Gait', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    gynaecologic: [
      { key: 'blood_stained', label: 'Blood Stained', type: 'select', options: ['No', 'Yes'] },
      { key: 'blood_stained_details', label: 'Blood Stained Details', type: 'text' },
      { key: 'discharge', label: 'Discharge', type: 'select', options: ['No', 'Yes'] },
      { key: 'discharge_details', label: 'Discharge Details', type: 'text' },
      { key: 'masses', label: 'Masses', type: 'select', options: ['No', 'Yes'] },
      { key: 'masses_details', label: 'Masses Details', type: 'text' },
      { key: 'ulcerations', label: 'Ulcerations', type: 'select', options: ['No', 'Yes'] },
      { key: 'ulceration_details', label: 'Ulceration Details', type: 'text' },
      { key: 'speculum_findings', label: 'Speculum Findings', type: 'text' },
      { key: 'samples_taken', label: 'Samples Taken', type: 'select', options: ['No', 'Yes'] },
      { key: 'samples_taken_details', label: 'Samples Taken Details', type: 'text' },
      { key: 'vagina_walls', label: 'Vaginal Walls', type: 'text' },
      { key: 'cervix', label: 'Cervix', type: 'text' },
      { key: 'cervical_motion_tenderness', label: 'Cervical Motion Tenderness', type: 'text' },
      { key: 'uterus', label: 'Uterus', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    obstetric_abdomen: [
      { key: 'foetal_lie', label: 'Foetal Lie', type: 'select', options: ['Longitudinal', 'Oblique', 'Transverse'] },
      { key: 'presentation', label: 'Presentation', type: 'select', options: ['Cephalic', 'Breech', 'Other'] },
      { key: 'descent', label: 'Descent', type: 'select', options: ['1/5', '2/5', '3/5', '4/5', '5/5'] },
      { key: 'back_of_baby', label: 'Back Of Baby', type: 'select', options: ['To Maternal Left', 'To Maternal Right'] },
      { key: 'fetal_heart_rate', label: 'Fetal Heart Rate', type: 'number' },
      { key: 'uterine_contractions', label: 'Uterine Contractions', type: 'text' },
      { key: 'liquor_volume', label: 'Liquor Volume', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    obstetric_pelvic: [
      { key: 'dilation', label: 'Dilation (cm)', type: 'select', options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
      { key: 'consistency', label: 'Consistency', type: 'select', options: ['firm', 'medium', 'soft'] },
      { key: 'position_bishop', label: 'Position', type: 'select', options: ['posterior', 'central', 'anterior'] },
      { key: 'station', label: 'Station', type: 'select', options: ['-3', '-2', '-1', '0', '1', '2', '3'] },
      { key: 'membranes', label: 'Membranes', type: 'select', options: ['intact', 'intact and bulding', 'ruptured'] },
      { key: 'amniotic', label: 'Amniotic Fluid', type: 'select', options: ['clear', 'G1 meconium', 'G2 meconium', 'G3 meconium', 'Blood Stained'] },
      { key: 'moulding', label: 'Moulding', type: 'select', options: ['0', '1', '2', '3'] },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    musculoskeletal_pain: [
      { key: 'pain_site', label: 'Pain Site', type: 'text' },
      { key: 'pain_by_disorder', label: 'Pain by Disorder', type: 'select', options: ['No', 'Yes'] },
      { key: 'pain_by_disorder_organ', label: 'Pain by Disorder Organ', type: 'text' },
      { key: 'pain_acute_chronic', label: 'Pain Type', type: 'select', options: ['Acute', 'Chronic', 'Acute on Chronic'] },
      { key: 'joints_involved_info', label: 'Joints Involved', type: 'text' },
      { key: 'central_skeleton', label: 'Central Skeleton', type: 'select', options: ['No', 'Yes'] },
      { key: 'pain_relief', label: 'Relieving Factors', type: 'text' },
      { key: 'pain_worse', label: 'Worsening Factors', type: 'text' },
      { key: 'organ_symptoms', label: 'Organ Symptoms', type: 'select', options: ['No', 'Yes'] },
      { key: 'organ_symptoms_details', label: 'Organ Symptoms Details', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
    musculoskeletal_stiffness: [
      { key: 'range_of_motion', label: 'Range of Motion', type: 'text' },
      { key: 'stiffness_pattern', label: 'Stiffness Pattern', type: 'text' },
      { key: 'inflammation', label: 'Inflammation', type: 'select', options: ['No', 'Yes'] },
      { key: 'weakness', label: 'Weakness', type: 'select', options: ['No', 'Yes'] },
      { key: 'joint_motion_difficulty', label: 'Joint Motion Difficulty', type: 'select', options: ['No', 'Yes'] },
      { key: 'joint_motion_difficulty_details', label: 'Joint Motion Difficulty Details', type: 'text' },
      { key: 'stiff_feeling', label: 'Stiff Feeling', type: 'select', options: ['No', 'Yes'] },
      { key: 'stiff_feeling_details', label: 'Stiff Feeling Details', type: 'text' },
      { key: 'reluctance_to_move', label: 'Reluctance To Move', type: 'select', options: ['No', 'Yes'] },
      { key: 'reluctance_to_move_details', label: 'Reluctance To Move Details', type: 'text' },
      { key: 'weakness_in_joint', label: 'Weakness In Joint', type: 'select', options: ['No', 'Yes'] },
      { key: 'weakness_in_joint_details', label: 'Weakness In Joint Details', type: 'text' },
      { key: 'moves_joint_full_range', label: 'Moves Joint Full Range', type: 'select', options: ['No', 'Yes'] },
      { key: 'moves_joint_full_range_details', label: 'Moves Joint Full Range Details', type: 'text' },
      { key: 'inflammation_joint', label: 'Inflammation Joint', type: 'select', options: ['No', 'Yes'] },
      { key: 'inflammation_joint_details', label: 'Inflammation Joint Details', type: 'text' },
      { key: 'other_findings', label: 'Other Findings', type: 'textarea' },
    ],
  };
  const rosHistoryBySystem = useMemo(() => {
    const grouped: Record<string, Array<Record<string, unknown>>> = {};
    systemReviewEntries.forEach((entry) => {
      const key = asText(entry.body_system_name) || 'Other';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry);
    });
    return grouped;
  }, [systemReviewEntries]);
  const rosRecentlyUsed = useMemo(
    () =>
      Object.entries(rosHistoryBySystem)
        .sort((a, b) => {
          const aDate = new Date(asText(a[1][0]?.date_created || '1970-01-01')).getTime();
          const bDate = new Date(asText(b[1][0]?.date_created || '1970-01-01')).getTime();
          return bDate - aDate;
        })
        .slice(0, 6)
        .map(([name]) => name),
    [rosHistoryBySystem],
  );
  const rosSystemOptions = useMemo(
    () => Object.keys(rosHistoryBySystem).sort((a, b) => a.localeCompare(b)),
    [rosHistoryBySystem],
  );
  const rosFilteredEntries = useMemo(() => {
    const needle = asText(rosHistoryQuery).toLowerCase();
    return systemReviewEntries.filter((entry) => {
      const systemName = asText(entry.body_system_name) || 'Other';
      if (rosSystemFilter !== 'all' && systemName !== rosSystemFilter) return false;
      if (!needle) return true;
      const haystack = [
        systemName,
        asText(entry.review_name),
        asText(entry.condition_status),
        asText(entry.description),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [rosHistoryQuery, rosSystemFilter, systemReviewEntries]);
  const rosStats = useMemo(() => {
    const total = systemReviewEntries.length;
    const abnormal = systemReviewEntries.filter((entry) => asText(entry.condition_status).toLowerCase() === 'abnormal').length;
    const normal = systemReviewEntries.filter((entry) => asText(entry.condition_status).toLowerCase() === 'normal').length;
    const systems = new Set(systemReviewEntries.map((entry) => asText(entry.body_system_name) || 'Other')).size;
    return { total, abnormal, normal, systems };
  }, [systemReviewEntries]);
  const latestChiefComplaint = chiefComplaintNotes[0];
  const latestComplaint = ((workspace?.complaints || []) as Array<Record<string, unknown>>)[0];
  const latestOdq = recordedSymptoms[0];
  const latestFamilyHistory = familyHistories[0];
  const latestContraceptionHistory = contraceptionHistories[0];
  const latestPregnancyHistory = pregnancyHistories[0];
  const latestGynaecologicalHistory = gynaecologicalHistories[0];
  const latestObstetricHistory = obstetricHistories[0];
  const latestPersonalHistory = personalHistories[0];

  const matchBodySystemId = (label: string) => {
    const needle = label.toLowerCase();
    const direct = bodySystems.find((row) => asText(row.name).toLowerCase() === needle);
    if (direct) return asText(direct.id);
    const loose = bodySystems.find((row) => {
      const name = asText(row.name).toLowerCase();
      return name.includes(needle) || needle.includes(name);
    });
    return loose ? asText(loose.id) : '';
  };
  const matchReviewId = (label: string, systemId: string) => {
    const needle = label.toLowerCase();
    const scoped = reviews.filter((row) => !systemId || asText(row.body_system_id) === systemId);
    const exact = scoped.find((row) => asText(row.name).toLowerCase() === needle);
    if (exact) return asText(exact.id);
    const loose = scoped.find((row) => {
      const name = asText(row.name).toLowerCase();
      return name.includes(needle) || needle.includes(name);
    });
    return loose ? asText(loose.id) : '';
  };
  const buildRosTemplateSummary = () => {
    const item = rosItemsByKey[selectedRosItemKey];
    if (!item) return '';
    const fields = rosTemplateByType[item.template] || [];
    const parts = fields
      .map((field) => {
        const value = asText(rosTemplateValues[field.key]);
        if (!value) return '';
        return `${field.label}: ${value}`;
      })
      .filter(Boolean);
    if (!parts.length) return '';
    return `${item.label} findings - ${parts.join('; ')}`;
  };
  const hasRosTemplateValues = useMemo(
    () => Object.values(rosTemplateValues).some((value) => asText(value)),
    [rosTemplateValues],
  );

  const selectRosItem = (input: string | RosCategoryItem) => {
    const selected = typeof input === 'string'
      ? Object.values(rosItemsByKey).find((item) => asText(item.label).toLowerCase() === input.toLowerCase())
      : input;
    const label = selected ? selected.label : asText(input);
    const key = selected ? selected.key : '';
    const systemId = matchBodySystemId(label);
    const reviewId = matchReviewId(label, systemId);
    setSelectedRosItemKey(key);
    setSelectedRosItemLabel(label);
    setRosTemplateValues({});
    setSystemReviewForm((prev) => ({ ...prev, body_system_id: systemId || prev.body_system_id, review_id: reviewId || prev.review_id, description: prev.description }));
    setRosMode('current');
  };

  const reload = async () => loadWorkspace({ odqSearchValue: odqSearch, bodySystemId: systemReviewForm.body_system_id });

  const submitNote = async () => {
    if (!visitId) return;
    if (!asText(noteForm.cc)) {
      setError('Chief complaint is required.');
      setSuccess(null);
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-clinical-encounter-note/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        cc: asText(noteForm.cc) || undefined,
        cc_onset: asText(noteForm.cc_onset) || undefined,
        cc_type: asText(noteForm.cc_type) || undefined,
        hopi: asText(noteForm.hopi) || undefined,
        past_illnes_hx: asText(noteForm.past_illnes_hx) || undefined,
      });
      setNoteForm({ cc: '', cc_onset: '', cc_type: '', hopi: '', doc_remarks: '', past_illnes_hx: '' });
      setSuccess('Clinical encounter note saved.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save clinical encounter note.');
    } finally {
      setSaving(false);
    }
  };

  const submitComplaint = async () => {
    if (!visitId || !asText(complaintForm.complaint)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-complaint/', {
        patient_visit_id: visitId,
        complaint: complaintForm.complaint,
        duration: asText(complaintForm.duration) || undefined,
      });
      setComplaintForm({ complaint: '', duration: '' });
      setSuccess('Complaint saved.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save complaint.');
    } finally {
      setSaving(false);
    }
  };

  const submitOdq = async () => {
    const effectiveOdqId = asText(odqForm.odq_id) || asText(selectedOdqId);
    if (!visitId || !effectiveOdqId) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const severityId =
        asText(odqForm.odq_severity_id) ||
        asText(severityOptions.find((item) => asText(item.severity).toLowerCase() === asText(odqForm.severity).toLowerCase())?.id) ||
        undefined;
      const durationId =
        asText(odqForm.odq_duration_id) ||
        asText(durationOptions.find((item) => asText(item.duration).toLowerCase() === asText(odqForm.duration).toLowerCase())?.id) ||
        undefined;

      await api.post('/legacy/patients/save-patient-visit-odq/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        odq_id: effectiveOdqId,
        odq_severity_id: severityId,
        odq_duration_id: durationId,
        onset: asText(odqForm.onset) || undefined,
        duration: asText(odqForm.duration) || undefined,
        severity: asText(odqForm.severity) || undefined,
        odq_comment: asText(odqForm.odq_comment) || undefined,
        triage_priority: asText(odqForm.triage_priority) || undefined,
        character_quality: asText(odqForm.character_quality) || undefined,
        radiation: asText(odqForm.radiation) || undefined,
        aggravating_factors: asText(odqForm.aggravating_factors) || undefined,
        relieving_factors: asText(odqForm.relieving_factors) || undefined,
        associated_symptoms: asText(odqForm.associated_symptoms) || undefined,
        type: selectedRole,
        notes: asText(odqForm.notes) || undefined,
      });
      setOdqForm({
        odq_id: '',
        odq_severity_id: '',
        odq_duration_id: '',
        odq_comment: '',
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
      });
      setSelectedOdqId('');
      setSuccess('ODQ entry saved.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save ODQ.');
    } finally {
      setSaving(false);
    }
  };

  const submitSystemReview = async () => {
    const canSaveDetailedOnly = !!selectedRosItemKey && hasRosTemplateValues;
    if (!visitId || !canSaveDetailedOnly) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const templateDescription = buildRosTemplateSummary();
      const mergedDescription = [templateDescription, asText(systemReviewForm.description)].filter(Boolean).join(' | ');
      await api.post('/legacy/patients/save-patient-visit-system-review/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        body_system_id: asText(systemReviewForm.body_system_id) || undefined,
        review_id: asText(systemReviewForm.review_id) || undefined,
        description: mergedDescription || undefined,
        condition_status: asText(systemReviewForm.condition_status) || undefined,
        ros_template: selectedRosItemKey ? rosItemsByKey[selectedRosItemKey]?.template : undefined,
        ros_values: selectedRosItemKey ? rosTemplateValues : undefined,
      });
      setSystemReviewForm((prev) => ({ ...prev, review_id: '', description: '', condition_status: '' }));
      setSelectedRosItemKey('');
      setSelectedRosItemLabel('');
      setRosTemplateValues({});
      setSuccess('System review saved.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save system review.');
    } finally {
      setSaving(false);
    }
  };

  const submitPastHistoryNote = async () => {
    if (!visitId) return;
    if (!asText(noteForm.past_illnes_hx) && !asText(noteForm.doc_remarks)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-clinical-encounter-note/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        past_illnes_hx: asText(noteForm.past_illnes_hx) || undefined,
        doc_remarks: asText(noteForm.doc_remarks) || undefined,
      });
      setSuccess('Past history note saved.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save past history note.');
    } finally {
      setSaving(false);
    }
  };

  const submitComorbidity = async () => {
    if (!visitId || !asText(comorbidityForm.description) || !asText(comorbidityForm.onset)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-comorbidity/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        description: comorbidityForm.description,
        diagnosis: asText(comorbidityForm.diagnosis) || undefined,
        diagnosis_icd: asText(comorbidityForm.diagnosis_icd) || undefined,
        onset: comorbidityForm.onset,
      });
      setComorbidityForm({ description: '', diagnosis: '', diagnosis_icd: '', onset: '' });
      setSuccess('Comorbidity added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add comorbidity.');
    } finally {
      setSaving(false);
    }
  };

  const submitPastMedication = async () => {
    if (!visitId || !asText(medicationForm.name)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-past-medication/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        name: medicationForm.name,
        dose: asText(medicationForm.dose) || undefined,
        frequency: asText(medicationForm.frequency) || undefined,
        status: asText(medicationForm.status) || undefined,
      });
      setMedicationForm({ name: '', dose: '', frequency: '', status: 'Current' });
      setSuccess('Medication added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add medication.');
    } finally {
      setSaving(false);
    }
  };

  const submitSurgery = async () => {
    if (!visitId || !asText(surgeryForm.name)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-surgery/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        name: surgeryForm.name,
        surgery_date: asText(surgeryForm.surgery_date) || undefined,
        hospital: asText(surgeryForm.hospital) || undefined,
      });
      setSurgeryForm({ name: '', surgery_date: '', hospital: '' });
      setSuccess('Surgery entry added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add surgery entry.');
    } finally {
      setSaving(false);
    }
  };

  const submitAllergy = async () => {
    if (!visitId || !asText(allergyForm.name)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-allergy/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        type: asText(allergyForm.type) || undefined,
        name: allergyForm.name,
        reaction: asText(allergyForm.reaction) || undefined,
        severity: asText(allergyForm.severity) || undefined,
      });
      setAllergyForm({ type: 'Drug', name: '', reaction: '', severity: 'Mild' });
      setSuccess('Allergy entry added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add allergy entry.');
    } finally {
      setSaving(false);
    }
  };

  const submitHaemotransfusion = async () => {
    if (!visitId || !asText(transfusionForm.type) || !asText(transfusionForm.units)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-haemotransfusion/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        type: transfusionForm.type,
        units: transfusionForm.units,
        haemo_period: asText(transfusionForm.haemo_period) || undefined,
        indication: asText(transfusionForm.indication) || undefined,
      });
      setTransfusionForm({ type: '', units: '', haemo_period: '', indication: '' });
      setSuccess('Blood transfusion entry added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add blood transfusion entry.');
    } finally {
      setSaving(false);
    }
  };

  const submitFamilyHistory = async () => {
    if (!visitId || !asText(familyHistoryForm.relationship) || !asText(familyHistoryForm.relative_condition)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-family-history/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        relationship: familyHistoryForm.relationship,
        relative_condition: familyHistoryForm.relative_condition,
        age_at_onset: asText(familyHistoryForm.age_at_onset) || undefined,
        status: asText(familyHistoryForm.status) || undefined,
        notes: asText(familyHistoryForm.notes) || undefined,
      });
      setFamilyHistoryForm({
        relationship: '',
        relative_condition: '',
        age_at_onset: '',
        status: 'alive',
        notes: '',
      });
      setSuccess('Family history entry added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add family history entry.');
    } finally {
      setSaving(false);
    }
  };

  const submitContraceptionHistory = async () => {
    if (!visitId || !asText(contraceptionForm.contraception_type_id)) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-contraception-history/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        contraception_type_id: contraceptionForm.contraception_type_id,
        date_started: asText(contraceptionForm.date_started) || undefined,
        duration: asText(contraceptionForm.duration) || undefined,
        complications: asText(contraceptionForm.complications) || undefined,
      });
      setContraceptionForm({
        contraception_type_id: '',
        date_started: '',
        duration: '',
        complications: '',
      });
      setSuccess('Contraception history added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add contraception history.');
    } finally {
      setSaving(false);
    }
  };

  const submitPregnancyHistory = async () => {
    if (
      !visitId ||
      !asText(pregnancyForm.pregnancy_number) ||
      !asText(pregnancyForm.date_conceived) ||
      !asText(pregnancyForm.mode_of_conception) ||
      !asText(pregnancyForm.mode_of_delivery) ||
      !asText(pregnancyForm.outcome) ||
      !asText(pregnancyForm.pregnancy_complications) ||
      !asText(pregnancyForm.gender_id) ||
      !asText(pregnancyForm.weight) ||
      !asText(pregnancyForm.child_info)
    ) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-pregnancy-history/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        pregnancy_number: asText(pregnancyForm.pregnancy_number),
        date_conceived: asText(pregnancyForm.date_conceived),
        mode_of_conception: asText(pregnancyForm.mode_of_conception),
        mode_of_delivery: asText(pregnancyForm.mode_of_delivery),
        outcome: asText(pregnancyForm.outcome),
        pregnancy_complications: asText(pregnancyForm.pregnancy_complications),
        gender_id: asText(pregnancyForm.gender_id),
        weight: asText(pregnancyForm.weight),
        child_info: asText(pregnancyForm.child_info),
      });
      setPregnancyForm({
        pregnancy_number: '',
        date_conceived: '',
        mode_of_conception: '',
        mode_of_delivery: '',
        outcome: '',
        pregnancy_complications: '',
        gender_id: '',
        weight: '',
        child_info: '',
      });
      setSuccess('Pregnancy history added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add pregnancy history.');
    } finally {
      setSaving(false);
    }
  };

  const submitGynaecologicalHistory = async () => {
    if (!visitId) return;
    const hasAnyValue = Object.values(gynaecologicalForm).some((value) => asText(value));
    if (!hasAnyValue) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-gynaecological-history/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        date_of_last_menstrual_period: asText(gynaecologicalForm.date_of_last_menstrual_period) || undefined,
        menarche: asText(gynaecologicalForm.menarche) || undefined,
        menopause: asText(gynaecologicalForm.menopause) || undefined,
        cycle_length: asText(gynaecologicalForm.cycle_length) || undefined,
        duration_of_bleed: asText(gynaecologicalForm.duration_of_bleed) || undefined,
        intermenstrual_bleeding: asText(gynaecologicalForm.intermenstrual_bleeding) || undefined,
        intermenstrual_bleeding_details: asText(gynaecologicalForm.intermenstrual_bleeding_details) || undefined,
        dysmenorrhoea: asText(gynaecologicalForm.dysmenorrhoea) || undefined,
        dysmenorrhoea_details: asText(gynaecologicalForm.dysmenorrhoea_details) || undefined,
        post_coital_bleeding: asText(gynaecologicalForm.post_coital_bleeding) || undefined,
        post_coital_bleeding_details: asText(gynaecologicalForm.post_coital_bleeding_details) || undefined,
        dyspareunia: asText(gynaecologicalForm.dyspareunia) || undefined,
        dyspareunia_details: asText(gynaecologicalForm.dyspareunia_details) || undefined,
        number_of_lifetime_sexual_partners: asText(gynaecologicalForm.number_of_lifetime_sexual_partners) || undefined,
        coital_frequency: asText(gynaecologicalForm.coital_frequency) || undefined,
        cervical_cancer_screening: asText(gynaecologicalForm.cervical_cancer_screening) || undefined,
        cervical_cancer_screening_details: asText(gynaecologicalForm.cervical_cancer_screening_details) || undefined,
        breast_screening: asText(gynaecologicalForm.breast_screening) || undefined,
        breast_screening_details: asText(gynaecologicalForm.breast_screening_details) || undefined,
        previous_gynaecologic_procedures: asText(gynaecologicalForm.previous_gynaecologic_procedures) || undefined,
        previous_gynaecologic_procedures_details: asText(gynaecologicalForm.previous_gynaecologic_procedures_details) || undefined,
      });
      setGynaecologicalForm({
        date_of_last_menstrual_period: '',
        menarche: '',
        menopause: '',
        cycle_length: '',
        duration_of_bleed: '',
        intermenstrual_bleeding: '',
        intermenstrual_bleeding_details: '',
        dysmenorrhoea: '',
        dysmenorrhoea_details: '',
        post_coital_bleeding: '',
        post_coital_bleeding_details: '',
        dyspareunia: '',
        dyspareunia_details: '',
        number_of_lifetime_sexual_partners: '',
        coital_frequency: '',
        cervical_cancer_screening: '',
        cervical_cancer_screening_details: '',
        breast_screening: '',
        breast_screening_details: '',
        previous_gynaecologic_procedures: '',
        previous_gynaecologic_procedures_details: '',
      });
      setSuccess('Gynaecological history added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add gynaecological history.');
    } finally {
      setSaving(false);
    }
  };

  const submitObstetricHistory = async () => {
    if (!visitId) return;
    const hasAnyValue = Object.values(obstetricForm).some((value) => asText(value));
    if (!hasAnyValue) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-obstetric-history/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        no_of_pregnancies: asText(obstetricForm.no_of_pregnancies) || undefined,
        no_of_births: asText(obstetricForm.no_of_births) || undefined,
        no_of_abortions_spontaneous: asText(obstetricForm.no_of_abortions_spontaneous) || undefined,
        no_of_abortions_induced: asText(obstetricForm.no_of_abortions_induced) || undefined,
        date_of_last_menstrual_period: asText(obstetricForm.date_of_last_menstrual_period) || undefined,
        date_of_positive_pregnancy_test: asText(obstetricForm.date_of_positive_pregnancy_test) || undefined,
        confirmatory_ultrasound_scan: asText(obstetricForm.confirmatory_ultrasound_scan) || undefined,
        date_of_scan: asText(obstetricForm.date_of_scan) || undefined,
        child_info: asText(obstetricForm.child_info) || undefined,
        gestational_age: asText(obstetricForm.gestational_age) || undefined,
        edd: asText(obstetricForm.edd) || undefined,
      });
      setObstetricForm({
        no_of_pregnancies: '',
        no_of_births: '',
        no_of_abortions_spontaneous: '',
        no_of_abortions_induced: '',
        date_of_last_menstrual_period: '',
        date_of_positive_pregnancy_test: '',
        confirmatory_ultrasound_scan: '',
        date_of_scan: '',
        child_info: '',
        gestational_age: '',
        edd: '',
      });
      setSuccess('Obstetric history added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add obstetric history.');
    } finally {
      setSaving(false);
    }
  };

  const submitPersonalHistory = async () => {
    if (!visitId) return;
    const hasAnyValue = Object.values(personalHistoryForm).some((value) => asText(value));
    if (!hasAnyValue) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/patients/save-patient-visit-personal-history/', {
        patient_id: patientId || undefined,
        patient_visit_id: visitId,
        occupation_id: asText(personalHistoryForm.occupation_id) || undefined,
        location_id: asText(personalHistoryForm.location_id) || undefined,
        family_circumstance: asText(personalHistoryForm.family_circumstance) || undefined,
        religion_id: asText(personalHistoryForm.religion_id) || undefined,
        hobbies: asText(personalHistoryForm.hobbies) || undefined,
        alchohol_intake: asText(personalHistoryForm.alchohol_intake) || undefined,
        alcohol_intake: asText(personalHistoryForm.alchohol_intake) || undefined,
        alcohol_details: asText(personalHistoryForm.alcohol_details) || undefined,
        tobacco_intake: asText(personalHistoryForm.tobacco_intake) || undefined,
        tobacco_details: asText(personalHistoryForm.tobacco_details) || undefined,
      });
      setPersonalHistoryForm({
        occupation_id: '',
        location_id: '',
        family_circumstance: '',
        religion_id: '',
        hobbies: '',
        alchohol_intake: '',
        alcohol_details: '',
        tobacco_intake: '',
        tobacco_details: '',
      });
      setSuccess('Personal history added.');
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add personal history.');
    } finally {
      setSaving(false);
    }
  };

  const selectDirectSymptom = (item: OptionRow) => {
    const odqId = asText(item.id);
    if (!odqId) return;
    const existing = ((workspace?.odqs || []) as Array<Record<string, unknown>>).find((row) => asText(row.odq_id) === odqId);
    setSelectedOdqId(odqId);
    setOdqForm({
      odq_id: odqId,
      odq_severity_id: asText(existing?.odq_severity_id),
      odq_duration_id: asText(existing?.odq_duration_id),
      odq_comment: asText(existing?.odq_comment),
      onset: toDateTimeLocalInput(existing?.onset),
      duration: asText(existing?.duration || existing?.odq_duration),
      severity: asText(existing?.severity || existing?.odq_severity),
      triage_priority: asText(existing?.triage_priority),
      character_quality: asText(existing?.character_quality),
      radiation: asText(existing?.radiation),
      aggravating_factors: asText(existing?.aggravating_factors),
      relieving_factors: asText(existing?.relieving_factors),
      associated_symptoms: asText(existing?.associated_symptoms),
      notes: asText(existing?.notes),
    });
  };

  if (loading) return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading clinical encounter workspace...</div>;
  if (!visitId) return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">No selected visit.</div>;

  return (
    <div className="space-y-4">
      {!embedded ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Clinical Encounter</p>
          <h2 className="text-xl font-semibold text-slate-900">Patient Visit Clinical Workspace</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Notes</p><p className="text-xl font-semibold text-slate-900">{asNumber(workspace?.summary?.notes_count)}</p></div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Complaints</p><p className="text-xl font-semibold text-slate-900">{asNumber(workspace?.summary?.complaints_count)}</p></div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-[11px] text-slate-500">ODQs</p><p className="text-xl font-semibold text-slate-900">{asNumber(workspace?.summary?.odqs_count)}</p></div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-[11px] text-slate-500">System Reviews</p><p className="text-xl font-semibold text-slate-900">{asNumber(workspace?.summary?.system_reviews_count)}</p></div>
          </div>
        </div>
      ) : null}

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <div className="space-y-4">
        <div className="space-y-4">
          {showTabStrip ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">Clinical Notes Workspace</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {clinicalTabs.map((tab) => {
                  const active = tab.key === activeTab;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                        active
                          ? 'border-sky-300 bg-sky-50 text-sky-700'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {tab.label}
                      {!tab.migrated ? ' (pending)' : ''}
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          {activeTab === 'summary' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">Clinical Encounter Summary</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs"><p className="text-slate-500">Chief Complaints</p><p className="text-lg font-semibold text-slate-900">{chiefComplaintNotes.length}</p></div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs"><p className="text-slate-500">Direct Questions</p><p className="text-lg font-semibold text-slate-900">{recordedSymptoms.length}</p></div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs"><p className="text-slate-500">Past History Items</p><p className="text-lg font-semibold text-slate-900">{comorbidities.length + pastMedications.length + surgeries.length + allergies.length + haemotransfusions.length}</p></div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs"><p className="text-slate-500">System Reviews</p><p className="text-lg font-semibold text-slate-900">{asNumber(workspace?.summary?.system_reviews_count)}</p></div>
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest Chief Complaint</p>
                  <p className="mt-1 text-slate-700">{asText(latestChiefComplaint?.cc) || 'N/A'}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestChiefComplaint?.date_created)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest Complaint Entry</p>
                  <p className="mt-1 text-slate-700">{asText(latestComplaint?.complaint) || 'N/A'}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestComplaint?.date_created)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest ODQ</p>
                  <p className="mt-1 text-slate-700">{asText(latestOdq?.odq_name) || 'N/A'}</p>
                  <p className="mt-1 text-slate-500">{asText(latestOdq?.severity || latestOdq?.odq_severity) || 'No severity'} • {formatDateTime(latestOdq?.date_created || latestOdq?.onset)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest Family History</p>
                  <p className="mt-1 text-slate-700">{asText(latestFamilyHistory?.relationship) || 'N/A'} {asText(latestFamilyHistory?.relative_condition) ? `- ${asText(latestFamilyHistory?.relative_condition)}` : ''}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestFamilyHistory?.date_created)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest Contraception History</p>
                  <p className="mt-1 text-slate-700">{asText(latestContraceptionHistory?.contraception_type_name) || 'N/A'}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestContraceptionHistory?.date_created)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest Pregnancy History</p>
                  <p className="mt-1 text-slate-700">Preg {asText(latestPregnancyHistory?.pregnancy_number) || 'N/A'} • {asText(latestPregnancyHistory?.outcome) || 'N/A'}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestPregnancyHistory?.date_created)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest Gynaecological History</p>
                  <p className="mt-1 text-slate-700">LMP: {formatDate(latestGynaecologicalHistory?.date_of_last_menstrual_period)}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestGynaecologicalHistory?.date_created)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs">
                  <p className="font-semibold text-slate-800">Latest Obstetric History</p>
                  <p className="mt-1 text-slate-700">G{asText(latestObstetricHistory?.no_of_pregnancies) || '0'} P{asText(latestObstetricHistory?.no_of_births) || '0'}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestObstetricHistory?.date_created)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 text-xs md:col-span-2">
                  <p className="font-semibold text-slate-800">Latest Personal/Social History</p>
                  <p className="mt-1 text-slate-700">{asText(latestPersonalHistory?.occupation_name) || 'N/A'} • {asText(latestPersonalHistory?.location_name) || 'N/A'} • Tobacco: {asText(latestPersonalHistory?.tobacco_intake) || 'N/A'} • Alcohol: {asText(latestPersonalHistory?.alchohol_intake) || 'N/A'}</p>
                  <p className="mt-1 text-slate-500">{formatDateTime(latestPersonalHistory?.date_created)}</p>
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'chief_complaint' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">Chief Complaint</h3>
              <div className="mt-3 grid gap-2 md:grid-cols-6">
                <textarea
                  value={noteForm.cc}
                  onChange={(e) => setNoteForm((prev) => ({ ...prev, cc: e.target.value }))}
                  rows={2}
                  placeholder="Chief complaint (CC)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3"
                />
                <input
                  type="datetime-local"
                  value={noteForm.cc_onset}
                  onChange={(e) => setNoteForm((prev) => ({ ...prev, cc_onset: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
                />
                <SearchableSelectField
                  value={noteForm.cc_type}
                  onChange={(e) => setNoteForm((prev) => ({ ...prev, cc_type: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-1"
                >
                  <option value="">CC Type</option>
                  <option value="Acute">Acute</option>
                  <option value="Subacute">Subacute</option>
                  <option value="Chronic">Chronic</option>
                </SearchableSelectField>
                <textarea
                  value={noteForm.hopi}
                  onChange={(e) => setNoteForm((prev) => ({ ...prev, hopi: e.target.value }))}
                  rows={4}
                  placeholder="History of presenting illness (HOPI)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-4"
                />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs md:col-span-2">
                  <p className="font-semibold text-slate-800">SOCRATES helper</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[
                      'Site',
                      'Onset',
                      'Character',
                      'Radiation',
                      'Associated',
                      'Time',
                      'Exacerbating',
                      'Severity',
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setNoteForm((prev) => ({
                            ...prev,
                            hopi: `${prev.hopi}${prev.hopi ? '\n' : ''}${item}: `,
                          }))
                        }
                        className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px] text-slate-700"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-end"><button type="button" onClick={submitNote} disabled={saving || !asText(noteForm.cc)} className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50">Save Chief Complaint Note</button></div>
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-600">Saved Chief Complaints</h4>
                <div className="mt-2 max-h-72 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                  {chiefComplaintNotes.map((note) => (
                    <div key={asText(note.id)} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                      <p className="font-semibold text-slate-900">{asText(note.cc)}</p>
                      <p className="mt-1 text-slate-600">
                        {asText(note.cc_type) || 'Unspecified'} • Onset: {formatDateTime(note.cc_onset)}
                      </p>
                      {asText(note.hopi) ? <p className="mt-1 whitespace-pre-wrap text-slate-700">{asText(note.hopi)}</p> : null}
                      {asText(note.past_illnes_hx) ? <p className="mt-1 text-slate-600">Past hx: {asText(note.past_illnes_hx)}</p> : null}
                      <p className="mt-1 text-slate-500">{formatDateTime(note.date_created)}</p>
                      <ClinicalRecordPanel row={note as JsonRow} />
                    </div>
                  ))}
                  {!chiefComplaintNotes.length ? <p className="text-xs text-slate-500">No saved chief complaints yet.</p> : null}
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'past_history' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">Past Medical History & Comorbidities</h3>
              <div className="mt-3 grid gap-2 md:grid-cols-12">
                <input value={comorbidityForm.description} onChange={(e) => setComorbidityForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Condition" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-4" />
                <input value={comorbidityForm.diagnosis} onChange={(e) => setComorbidityForm((prev) => ({ ...prev, diagnosis: e.target.value }))} placeholder="Diagnosis label" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <input value={comorbidityForm.diagnosis_icd} onChange={(e) => setComorbidityForm((prev) => ({ ...prev, diagnosis_icd: e.target.value }))} placeholder="ICD code" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
                <input type="date" value={comorbidityForm.onset} onChange={(e) => setComorbidityForm((prev) => ({ ...prev, onset: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
                <button type="button" onClick={submitComorbidity} disabled={saving || !asText(comorbidityForm.description) || !asText(comorbidityForm.onset)} className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700 disabled:opacity-50 md:col-span-1">Add</button>
              </div>
              <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                {comorbidities.map((item) => (
                  <div key={asText(item.id)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">{asText(item.description) || 'Condition'}</p>
                    <p>{asText(item.diagnosis) || 'No diagnosis'} {asText(item.diagnosis_icd) ? `(${asText(item.diagnosis_icd)})` : ''}</p>
                    <p className="text-slate-500">Onset: {formatDate(item.onset)}</p>
                    <ClinicalRecordPanel row={item as JsonRow} />
                  </div>
                ))}
                {!comorbidities.length ? <p className="text-xs text-slate-500">No conditions added yet.</p> : null}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">Home Medications (Past and Current)</h3>
              <div className="mt-2 grid gap-2 md:grid-cols-12">
                <input value={medicationForm.name} onChange={(e) => setMedicationForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Medication name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-4" />
                <input value={medicationForm.dose} onChange={(e) => setMedicationForm((prev) => ({ ...prev, dose: e.target.value }))} placeholder="Dose" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
                <input value={medicationForm.frequency} onChange={(e) => setMedicationForm((prev) => ({ ...prev, frequency: e.target.value }))} placeholder="Frequency" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <SearchableSelectField value={medicationForm.status} onChange={(e) => setMedicationForm((prev) => ({ ...prev, status: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2">
                  <option value="Current">Current</option>
                  <option value="Discontinued">Discontinued</option>
                  <option value="As needed">As needed</option>
                </SearchableSelectField>
                <button type="button" onClick={submitPastMedication} disabled={saving || !asText(medicationForm.name)} className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 disabled:opacity-50 md:col-span-1">Add</button>
              </div>
              <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                {pastMedications.map((item) => (
                  <div key={asText(item.id)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">{asText(item.name) || 'Medication'}</p>
                    <p>{asText(item.dose) || '-'} {asText(item.frequency) || '-'}</p>
                    <p className="text-slate-500">Status: {asText(item.status) || 'Current'}</p>
                    <ClinicalRecordPanel row={item as JsonRow} />
                  </div>
                ))}
                {!pastMedications.length ? <p className="text-xs text-slate-500">No medications added yet.</p> : null}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">Past Surgeries</h3>
              <div className="mt-2 grid gap-2 md:grid-cols-12">
                <input value={surgeryForm.name} onChange={(e) => setSurgeryForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Procedure name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-5" />
                <input type="date" value={surgeryForm.surgery_date} onChange={(e) => setSurgeryForm((prev) => ({ ...prev, surgery_date: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <input value={surgeryForm.hospital} onChange={(e) => setSurgeryForm((prev) => ({ ...prev, hospital: e.target.value }))} placeholder="Hospital" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <button type="button" onClick={submitSurgery} disabled={saving || !asText(surgeryForm.name)} className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 disabled:opacity-50 md:col-span-1">Add</button>
              </div>
              <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                {surgeries.map((item) => (
                  <div key={asText(item.id)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">{asText(item.name) || 'Surgery'}</p>
                    <p>{asText(item.hospital) || 'No hospital specified'} • {formatDate(item.surgery_date)}</p>
                    <ClinicalRecordPanel row={item as JsonRow} />
                  </div>
                ))}
                {!surgeries.length ? <p className="text-xs text-slate-500">No surgeries added yet.</p> : null}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">Allergies</h3>
              <div className="mt-2 grid gap-2 md:grid-cols-12">
                <SearchableSelectField value={allergyForm.type} onChange={(e) => setAllergyForm((prev) => ({ ...prev, type: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2">
                  <option value="Drug">Drug</option>
                  <option value="Food">Food</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Latex">Latex</option>
                </SearchableSelectField>
                <input value={allergyForm.name} onChange={(e) => setAllergyForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Allergen" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-4" />
                <input value={allergyForm.reaction} onChange={(e) => setAllergyForm((prev) => ({ ...prev, reaction: e.target.value }))} placeholder="Reaction" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <SearchableSelectField value={allergyForm.severity} onChange={(e) => setAllergyForm((prev) => ({ ...prev, severity: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2">
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </SearchableSelectField>
                <button type="button" onClick={submitAllergy} disabled={saving || !asText(allergyForm.name)} className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 disabled:opacity-50 md:col-span-1">Add</button>
              </div>
              <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                {allergies.map((item) => (
                  <div key={asText(item.id)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">{asText(item.type) || 'Allergy'}: {asText(item.name) || 'Unnamed'}</p>
                    <p>{asText(item.reaction) || 'No reaction'} • {asText(item.severity) || 'Unknown severity'}</p>
                    <ClinicalRecordPanel row={item as JsonRow} />
                  </div>
                ))}
                {!allergies.length ? <p className="text-xs text-slate-500">No allergies added yet.</p> : null}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">Blood Transfusions</h3>
              <div className="mt-2 grid gap-2 md:grid-cols-12">
                <input value={transfusionForm.type} onChange={(e) => setTransfusionForm((prev) => ({ ...prev, type: e.target.value }))} placeholder="Blood type / product" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <input value={transfusionForm.units} onChange={(e) => setTransfusionForm((prev) => ({ ...prev, units: e.target.value }))} placeholder="Units" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
                <input type="date" value={transfusionForm.haemo_period} onChange={(e) => setTransfusionForm((prev) => ({ ...prev, haemo_period: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <input value={transfusionForm.indication} onChange={(e) => setTransfusionForm((prev) => ({ ...prev, indication: e.target.value }))} placeholder="Indication" className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3" />
                <button type="button" onClick={submitHaemotransfusion} disabled={saving || !asText(transfusionForm.type) || !asText(transfusionForm.units)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-50 md:col-span-1">Add</button>
              </div>
              <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                {haemotransfusions.map((item) => (
                  <div key={asText(item.id)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">{asText(item.type) || 'Blood product'} • {asText(item.units) || '-'} unit(s)</p>
                    <p>{formatDate(item.haemo_period)} {asText(item.indication) ? `• ${asText(item.indication)}` : ''}</p>
                    <ClinicalRecordPanel row={item as JsonRow} />
                  </div>
                ))}
                {!haemotransfusions.length ? <p className="text-xs text-slate-500">No blood transfusions recorded.</p> : null}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">Past History Clinical Note</h3>
              <div className="mt-2 grid gap-2">
                <textarea
                  value={noteForm.past_illnes_hx}
                  onChange={(e) => setNoteForm((prev) => ({ ...prev, past_illnes_hx: e.target.value }))}
                  rows={3}
                  placeholder="Additional past illness/comorbidity notes"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <textarea
                  value={noteForm.doc_remarks}
                  onChange={(e) => setNoteForm((prev) => ({ ...prev, doc_remarks: e.target.value }))}
                  rows={2}
                  placeholder="Doctor remarks (optional)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="mt-3 flex justify-end"><button type="button" onClick={submitPastHistoryNote} disabled={saving || (!asText(noteForm.past_illnes_hx) && !asText(noteForm.doc_remarks))} className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50">Save Past History Note</button></div>
            </section>
          ) : null}

          {activeTab === 'direct_questioning' ? (
            <>
              <section className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">Direct Questioning</span>
                  <div className="ml-auto flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                    {(['triage', 'doctor', 'inpatient'] as DqRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${
                          selectedRole === role
                            ? role === 'doctor'
                              ? 'bg-emerald-600 text-white'
                              : role === 'triage'
                                ? 'bg-sky-600 text-white'
                                : 'bg-violet-600 text-white'
                            : 'bg-white text-slate-600'
                        }`}
                      >
                        {role === 'triage' ? 'Triage Nurse' : role === 'doctor' ? 'Doctor' : 'Ward Nurse'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <input
                      value={odqSearch}
                      onChange={(e) => setOdqSearch(e.target.value)}
                      placeholder="Search symptoms or ICD..."
                      className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <div className="max-h-[520px] space-y-2 overflow-y-auto">
                      {Object.entries(groupedOdqs).map(([categoryName, items]) => {
                        const filtered = items.filter((item) => {
                          const term = asText(odqSearch).toLowerCase();
                          if (!term) return true;
                          return asText(item.name).toLowerCase().includes(term) || asText(item.code).toLowerCase().includes(term);
                        });
                        if (!filtered.length) return null;
                        return (
                          <div key={categoryName} className="rounded-lg border border-slate-200 bg-white p-2">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{categoryName}</p>
                            <div className="mt-1 space-y-1">
                              {filtered.map((item) => {
                                const isSelected = asText(item.id) === selectedOdqId;
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => selectDirectSymptom(item)}
                                    className={`w-full rounded-md border px-2 py-1.5 text-left text-xs ${
                                      isSelected ? 'border-sky-300 bg-sky-50 text-sky-900' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <p className="font-semibold">{asText(item.name) || item.id}</p>
                                    <p className="text-[10px] text-slate-500">{asText(item.code) || 'No code'}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    {!asText(selectedOdqId) ? (
                      <div className="flex h-full min-h-[240px] items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-500">
                        Select a symptom to begin documentation.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                          <p className="text-xs font-semibold text-slate-900">
                            {asText(odqOptions.find((o) => asText(o.id) === asText(selectedOdqId))?.name) || 'Selected Symptom'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {asText(odqOptions.find((o) => asText(o.id) === asText(selectedOdqId))?.code) || 'No code'}
                          </p>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          <input type="datetime-local" value={odqForm.onset} onChange={(e) => setOdqForm((prev) => ({ ...prev, onset: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                          <input value={odqForm.duration} onChange={(e) => setOdqForm((prev) => ({ ...prev, duration: e.target.value }))} placeholder="Duration" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                          <SearchableSelectField value={odqForm.severity} onChange={(e) => setOdqForm((prev) => ({ ...prev, severity: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            <option value="">Severity</option>
                            <option value="Mild">Mild</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                          </SearchableSelectField>
                          {selectedRole === 'triage' ? (
                            <SearchableSelectField value={odqForm.triage_priority} onChange={(e) => setOdqForm((prev) => ({ ...prev, triage_priority: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                              <option value="">Triage priority</option>
                              <option value="1 - Immediate (Red)">1 - Immediate (Red)</option>
                              <option value="2 - Urgent (Orange)">2 - Urgent (Orange)</option>
                              <option value="3 - Less Urgent (Yellow)">3 - Less Urgent (Yellow)</option>
                              <option value="4 - Non-Urgent (Green)">4 - Non-Urgent (Green)</option>
                              <option value="5 - Non-Urgent (Blue)">5 - Non-Urgent (Blue)</option>
                            </SearchableSelectField>
                          ) : (
                            <input value={odqForm.odq_comment} onChange={(e) => setOdqForm((prev) => ({ ...prev, odq_comment: e.target.value }))} placeholder="Comment" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                          )}
                        </div>
                        {selectedRole === 'doctor' ? (
                          <div className="grid gap-2 md:grid-cols-2">
                            <input value={odqForm.character_quality} onChange={(e) => setOdqForm((prev) => ({ ...prev, character_quality: e.target.value }))} placeholder="Character/Quality" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                            <input value={odqForm.radiation} onChange={(e) => setOdqForm((prev) => ({ ...prev, radiation: e.target.value }))} placeholder="Radiation" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                            <input value={odqForm.aggravating_factors} onChange={(e) => setOdqForm((prev) => ({ ...prev, aggravating_factors: e.target.value }))} placeholder="Aggravating factors" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                            <input value={odqForm.relieving_factors} onChange={(e) => setOdqForm((prev) => ({ ...prev, relieving_factors: e.target.value }))} placeholder="Relieving factors" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                          </div>
                        ) : null}
                        <input value={odqForm.associated_symptoms} onChange={(e) => setOdqForm((prev) => ({ ...prev, associated_symptoms: e.target.value }))} placeholder="Associated symptoms" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                        <textarea value={odqForm.notes} onChange={(e) => setOdqForm((prev) => ({ ...prev, notes: e.target.value, odq_id: selectedOdqId }))} placeholder="Notes" rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setOdqForm((prev) => ({
                                ...prev,
                                odq_id: selectedOdqId,
                                odq_severity_id: '',
                                odq_duration_id: '',
                                odq_comment: '',
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
                              }))
                            }
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                          >
                            Clear
                          </button>
                          <button type="button" onClick={() => setOdqForm((prev) => ({ ...prev, odq_id: selectedOdqId })) || submitOdq()} disabled={saving || !asText(selectedOdqId)} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 disabled:opacity-50">
                            Save & Continue
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Recorded Symptoms</p>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">{recordedSymptoms.length}</span>
                    </div>
                    <div className="mb-2 flex gap-1">
                      {(['all', 'triage', 'doctor', 'inpatient'] as const).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setHistoryRoleFilter(role)}
                          className={`rounded-md px-2 py-1 text-[11px] font-semibold ${historyRoleFilter === role ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                          {role === 'all' ? 'All' : role === 'triage' ? 'Triage' : role === 'doctor' ? 'Doctor' : 'Ward'}
                        </button>
                      ))}
                    </div>
                    <div className="max-h-[520px] space-y-1.5 overflow-y-auto">
                      {recordedSymptoms.map((row) => (
                        <button
                          key={asText(row.id)}
                          type="button"
                          onClick={() => {
                            setSelectedRole((asText(row.type) as DqRole) || 'triage');
                            setSelectedOdqId(asText(row.odq_id));
                            setOdqForm({
                              odq_id: asText(row.odq_id),
                              odq_severity_id: asText(row.odq_severity_id),
                              odq_duration_id: asText(row.odq_duration_id),
                              odq_comment: asText(row.odq_comment),
                              onset: toDateTimeLocalInput(row.onset),
                              duration: asText(row.duration || row.odq_duration),
                              severity: asText(row.severity || row.odq_severity),
                              triage_priority: asText(row.triage_priority),
                              character_quality: asText(row.character_quality),
                              radiation: asText(row.radiation),
                              aggravating_factors: asText(row.aggravating_factors),
                              relieving_factors: asText(row.relieving_factors),
                              associated_symptoms: asText(row.associated_symptoms),
                              notes: asText(row.notes),
                            });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-left text-xs hover:bg-slate-100"
                        >
                          <p className="font-semibold text-slate-800">{asText(row.odq_name) || 'ODQ'}</p>
                          <p className="text-[11px] text-slate-500">{formatDateTime(row.onset || row.date_created)} • {asText(row.type) || 'unknown'}</p>
                          <p className="text-[11px] text-slate-500">{asText(row.severity || row.odq_severity) || 'No severity'} • {asText(row.duration || row.odq_duration) || 'No duration'}</p>
                        </button>
                      ))}
                      {!recordedSymptoms.length ? <p className="text-xs text-slate-500">No ODQ entries yet.</p> : null}
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : null}

          {activeTab === 'review_of_systems' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Review of Systems & Examinations</h3>
                  <p className="text-xs text-slate-500">Document focused systems with clear status and findings.</p>
                </div>
                <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs">
                  <button type="button" onClick={() => setRosMode('current')} className={`rounded-lg px-3 py-1.5 ${rosMode === 'current' ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-600'}`}>Current Review</button>
                  <button type="button" onClick={() => setRosMode('history')} className={`rounded-lg px-3 py-1.5 ${rosMode === 'history' ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-600'}`}>History</button>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">Total Entries</p>
                  <p className="text-lg font-semibold text-slate-900">{rosStats.total}</p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-emerald-700">Normal</p>
                  <p className="text-lg font-semibold text-emerald-900">{rosStats.normal}</p>
                </div>
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-rose-700">Abnormal</p>
                  <p className="text-lg font-semibold text-rose-900">{rosStats.abnormal}</p>
                </div>
                <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-sky-700">Systems Reviewed</p>
                  <p className="text-lg font-semibold text-sky-900">{rosStats.systems}</p>
                </div>
              </div>

              {rosMode === 'history' ? (
                <div className="mt-4 grid gap-4 lg:grid-cols-12">
                  <div className="space-y-3 lg:col-span-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Find in History</p>
                      <input
                        value={rosHistoryQuery}
                        onChange={(e) => setRosHistoryQuery(e.target.value)}
                        placeholder="Search system, review, status or notes..."
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Body Systems</p>
                      <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
                        <button
                          type="button"
                          onClick={() => setRosSystemFilter('all')}
                          className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs ${rosSystemFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                        >
                          <span>All systems</span>
                          <span>{systemReviewEntries.length}</span>
                        </button>
                        {rosSystemOptions.map((name) => {
                          const count = rosHistoryBySystem[name]?.length || 0;
                          return (
                            <button
                              key={name}
                              type="button"
                              onClick={() => setRosSystemFilter(name)}
                              className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs ${rosSystemFilter === name ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                            >
                              <span className="truncate">{name}</span>
                              <span>{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3 lg:col-span-8">
                    <p className="mb-2 text-xs font-semibold text-slate-800">Recorded Findings</p>
                    <div className="max-h-[30rem] space-y-2 overflow-y-auto pr-1">
                      {rosFilteredEntries.map((entry) => {
                        const status = asText(entry.condition_status) || 'No status';
                        const tone =
                          status.toLowerCase() === 'abnormal'
                            ? 'border-rose-200 bg-rose-50 text-rose-800'
                            : status.toLowerCase() === 'normal'
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                              : 'border-slate-200 bg-slate-50 text-slate-700';
                        return (
                          <div key={asText(entry.id)} className="rounded-lg border border-slate-200 bg-white p-2.5">
                            <div className="mb-1 flex flex-wrap items-center gap-1.5">
                              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">{asText(entry.body_system_name) || 'System'}</span>
                              <span className="text-xs font-semibold text-slate-800">{asText(entry.review_name) || 'Review item'}</span>
                              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${tone}`}>{status}</span>
                            </div>
                            {asText(entry.description) ? <p className="text-xs text-slate-700">{asText(entry.description)}</p> : null}
                            <p className="mt-1 text-[11px] text-slate-500">{formatDateTime(entry.date_created)}</p>
                            <ClinicalRecordPanel row={entry as JsonRow} />
                          </div>
                        );
                      })}
                      {!rosFilteredEntries.length ? <p className="text-xs text-slate-500">No matching history records.</p> : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 grid gap-4 lg:grid-cols-12">
                  <div className="space-y-3 lg:col-span-5">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Recently Used</p>
                      <div className="flex flex-wrap gap-1.5">
                        {rosRecentlyUsed.map((item) => (
                          <button key={item} type="button" onClick={() => selectRosItem(item)} className="rounded-md border border-cyan-200 bg-cyan-50 px-2 py-1 text-[11px] text-cyan-700 hover:bg-cyan-100">
                            {item}
                          </button>
                        ))}
                        {!rosRecentlyUsed.length ? <span className="text-xs text-slate-400">No recent systems</span> : null}
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Categories</p>
                      <div className="space-y-2">
                        {rosCategories.map((category) => (
                          <div key={category.key} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                            <button
                              type="button"
                              onClick={() => setOpenRosCategory((prev) => (prev === category.key ? null : category.key))}
                              className="flex w-full items-center justify-between text-left"
                            >
                              <span className="text-xs font-semibold text-slate-800">{category.icon} {category.title}</span>
                              <span className="text-[11px] text-slate-500">{category.items.length}</span>
                            </button>
                            {openRosCategory === category.key ? (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {category.items.map((item) => (
                                  <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => selectRosItem(item)}
                                    className={`rounded-md border px-2 py-1 text-[11px] ${selectedRosItemKey === item.key ? 'border-cyan-300 bg-cyan-50 font-semibold text-cyan-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}`}
                                  >
                                    {item.label}
                                  </button>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 lg:col-span-7">
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <p className="text-xs font-semibold text-slate-800">Record Current Review</p>
                        {selectedRosItemLabel ? <span className="rounded-md border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-800">Selected: {selectedRosItemLabel}</span> : null}
                      </div>
                      {selectedRosItemKey ? (
                        <div className="mb-3 rounded-lg border border-cyan-100 bg-cyan-50/60 p-2.5">
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-cyan-700">{selectedRosItemLabel || 'Selected Template'}</p>
                          <div className="grid gap-2 md:grid-cols-2">
                            {(rosTemplateByType[rosItemsByKey[selectedRosItemKey]?.template || 'general_basic'] || []).map((field) => (
                              <label key={field.key} className={`text-xs text-slate-700 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                                <span className="mb-1 block">{field.label}</span>
                                {field.type === 'select' ? (
                                  <SearchableSelectField
                                    value={rosTemplateValues[field.key] || ''}
                                    onChange={(e) => setRosTemplateValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm"
                                  >
                                    <option value="">Select</option>
                                    {(field.options || []).map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </SearchableSelectField>
                                ) : field.type === 'textarea' ? (
                                  <textarea
                                    value={rosTemplateValues[field.key] || ''}
                                    onChange={(e) => setRosTemplateValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                    rows={2}
                                    placeholder={field.placeholder || ''}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm"
                                  />
                                ) : (
                                  <input
                                    type={field.type === 'number' ? 'number' : 'text'}
                                    value={rosTemplateValues[field.key] || ''}
                                    onChange={(e) => setRosTemplateValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                    placeholder={field.placeholder || ''}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm"
                                  />
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      <div className="grid gap-2 md:grid-cols-12">
                        <SearchableSelectField
                          value={systemReviewForm.condition_status}
                          onChange={(e) => setSystemReviewForm((prev) => ({ ...prev, condition_status: e.target.value }))}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-3"
                        >
                          <option value="">Status</option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                          <option value="Not Examined">Not Examined</option>
                        </SearchableSelectField>
                        <input
                          value={systemReviewForm.description}
                          onChange={(e) => setSystemReviewForm((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Details / findings"
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-6"
                        />
                        <button
                          type="button"
                          onClick={submitSystemReview}
                          disabled={saving || !(selectedRosItemKey && hasRosTemplateValues)}
                          className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700 disabled:opacity-50 md:col-span-3"
                        >
                          Add Review
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="mb-2 text-xs font-semibold text-slate-800">Recent Entries</p>
                      <div className="max-h-72 space-y-1.5 overflow-y-auto">
                        {systemReviewEntries.slice(0, 20).map((entry) => (
                          <div key={asText(entry.id)} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
                            <p className="font-medium text-slate-800">{asText(entry.body_system_name) || 'Body system'} • {asText(entry.review_name) || 'Review'}</p>
                            <p className="text-slate-600">{asText(entry.condition_status) || 'No status'}{asText(entry.description) ? ` • ${asText(entry.description)}` : ''}</p>
                            <p className="text-slate-500">{formatDateTime(entry.date_created)}</p>
                            <ClinicalRecordPanel row={entry as JsonRow} />
                          </div>
                        ))}
                        {!systemReviewEntries.length ? <p className="text-xs text-slate-500">No review of systems entries yet.</p> : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ) : null}

          {activeTab === 'family_history' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Add Family History Entry</h3>
                  <div className="mt-3 space-y-2">
                    <SearchableSelectField
                      value={familyHistoryForm.relationship}
                      onChange={(e) => setFamilyHistoryForm((prev) => ({ ...prev, relationship: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Select relationship</option>
                      {[
                        'Father',
                        'Mother',
                        'Spouse',
                        'Child 1',
                        'Child 2',
                        'Child 3',
                        'Child 4',
                        'Brother',
                        'Sister',
                        'Paternal Grandfather',
                        'Paternal Grandmother',
                        'Maternal Grandfather',
                        'Maternal Grandmother',
                        'Uncle',
                        'Aunt',
                      ].map((relationship) => (
                        <option key={relationship} value={relationship}>
                          {relationship}
                        </option>
                      ))}
                    </SearchableSelectField>
                    <input
                      value={familyHistoryForm.relative_condition}
                      onChange={(e) => setFamilyHistoryForm((prev) => ({ ...prev, relative_condition: e.target.value }))}
                      placeholder="Condition/Disease"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input
                        type="number"
                        min={0}
                        value={familyHistoryForm.age_at_onset}
                        onChange={(e) => setFamilyHistoryForm((prev) => ({ ...prev, age_at_onset: e.target.value }))}
                        placeholder="Age at Onset"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                      <SearchableSelectField
                        value={familyHistoryForm.status}
                        onChange={(e) => setFamilyHistoryForm((prev) => ({ ...prev, status: e.target.value }))}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="alive">Alive</option>
                        <option value="deceased">Deceased</option>
                      </SearchableSelectField>
                    </div>
                    <textarea
                      value={familyHistoryForm.notes}
                      onChange={(e) => setFamilyHistoryForm((prev) => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      placeholder="Notes"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={submitFamilyHistory}
                        disabled={saving || !asText(familyHistoryForm.relationship) || !asText(familyHistoryForm.relative_condition)}
                        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50"
                      >
                        Add Entry
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Family History Timeline</h3>
                  <div className="mt-3 max-h-[520px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                    {[...familyHistories]
                      .sort((a, b) => Number(asText(b.age_at_onset) || 0) - Number(asText(a.age_at_onset) || 0))
                      .map((entry) => (
                        <div key={asText(entry.id)} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                          <p className="font-semibold text-slate-900">
                            {asText(entry.relationship) || 'Unknown'}{asText(entry.age_at_onset) ? ` - Age ${asText(entry.age_at_onset)}` : ''}
                          </p>
                          <p className="mt-1 font-semibold text-slate-800">{asText(entry.relative_condition) || 'No condition specified'}</p>
                          <p className="mt-1 text-slate-600">{asText(entry.notes) || 'No notes'}</p>
                          <p className="mt-1 text-slate-500">{asText(entry.status) || 'Unknown status'} • {formatDateTime(entry.date_created)}</p>
                          <ClinicalRecordPanel row={entry as JsonRow} />
                        </div>
                      ))}
                    {!familyHistories.length ? <p className="text-xs text-slate-500">No family history entries yet.</p> : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'contraception_history' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Add Contraception History</h3>
                  <div className="mt-3 space-y-2">
                    <SearchableSelectField
                      value={contraceptionForm.contraception_type_id}
                      onChange={(e) => setContraceptionForm((prev) => ({ ...prev, contraception_type_id: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Select contraception type...</option>
                      {contraceptionTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {asText(type.name) || type.id}
                        </option>
                      ))}
                    </SearchableSelectField>
                    <input
                      type="date"
                      value={contraceptionForm.date_started}
                      onChange={(e) => setContraceptionForm((prev) => ({ ...prev, date_started: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input
                      value={contraceptionForm.duration}
                      onChange={(e) => setContraceptionForm((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="Duration"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input
                      value={contraceptionForm.complications}
                      onChange={(e) => setContraceptionForm((prev) => ({ ...prev, complications: e.target.value }))}
                      placeholder="Complications"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={submitContraceptionHistory}
                        disabled={saving || !asText(contraceptionForm.contraception_type_id)}
                        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Contraception History</h3>
                  <div className="mt-3 max-h-[520px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                    {contraceptionHistories.map((entry) => (
                      <div key={asText(entry.id)} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                        <p className="font-semibold text-slate-900">{asText(entry.contraception_type_name) || 'Unknown type'}</p>
                        <p className="mt-1 text-slate-600">Date Started: {formatDate(entry.date_started)}</p>
                        <p className="mt-1 text-slate-600">Duration: {asText(entry.duration) || 'N/A'}</p>
                        <p className="mt-1 text-slate-600">Complications: {asText(entry.complications) || 'None'}</p>
                        <ClinicalRecordPanel row={entry as JsonRow} />
                      </div>
                    ))}
                    {!contraceptionHistories.length ? <p className="text-xs text-slate-500">No contraception history entries yet.</p> : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'pregnancy_history' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Add Pregnancy History</h3>
                  <div className="mt-3 space-y-2">
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={pregnancyForm.pregnancy_number}
                      onChange={(e) => setPregnancyForm((prev) => ({ ...prev, pregnancy_number: e.target.value }))}
                      placeholder="Pregnancy number"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input
                      type="date"
                      value={pregnancyForm.date_conceived}
                      onChange={(e) => setPregnancyForm((prev) => ({ ...prev, date_conceived: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <SearchableSelectField
                      value={pregnancyForm.mode_of_conception}
                      onChange={(e) => setPregnancyForm((prev) => ({ ...prev, mode_of_conception: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Mode of conception</option>
                      {conceptionModes.map((mode) => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </SearchableSelectField>
                    <SearchableSelectField
                      value={pregnancyForm.mode_of_delivery}
                      onChange={(e) => setPregnancyForm((prev) => ({ ...prev, mode_of_delivery: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Mode of delivery</option>
                      {deliveryModes.map((mode) => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </SearchableSelectField>
                    <SearchableSelectField
                      value={pregnancyForm.outcome}
                      onChange={(e) => setPregnancyForm((prev) => ({ ...prev, outcome: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Outcome</option>
                      {pregnancyOutcomes.map((outcome) => (
                        <option key={outcome} value={outcome}>{outcome}</option>
                      ))}
                    </SearchableSelectField>
                    <input
                      value={pregnancyForm.pregnancy_complications}
                      onChange={(e) => setPregnancyForm((prev) => ({ ...prev, pregnancy_complications: e.target.value }))}
                      placeholder="Pregnancy complications"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <SearchableSelectField
                        value={pregnancyForm.gender_id}
                        onChange={(e) => setPregnancyForm((prev) => ({ ...prev, gender_id: e.target.value }))}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="">Sex</option>
                        <option value="2">Female</option>
                        <option value="1">Male</option>
                      </SearchableSelectField>
                      <input
                        type="number"
                        min={0.1}
                        step={0.1}
                        value={pregnancyForm.weight}
                        onChange={(e) => setPregnancyForm((prev) => ({ ...prev, weight: e.target.value }))}
                        placeholder="Weight (KG)"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <input
                      value={pregnancyForm.child_info}
                      onChange={(e) => setPregnancyForm((prev) => ({ ...prev, child_info: e.target.value }))}
                      placeholder="Current info on child"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={submitPregnancyHistory}
                        disabled={
                          saving ||
                          !asText(pregnancyForm.pregnancy_number) ||
                          !asText(pregnancyForm.date_conceived) ||
                          !asText(pregnancyForm.mode_of_conception) ||
                          !asText(pregnancyForm.mode_of_delivery) ||
                          !asText(pregnancyForm.outcome) ||
                          !asText(pregnancyForm.pregnancy_complications) ||
                          !asText(pregnancyForm.gender_id) ||
                          !asText(pregnancyForm.weight) ||
                          !asText(pregnancyForm.child_info)
                        }
                        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Pregnancy History</h3>
                  <div className="mt-3 max-h-[520px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                    {pregnancyHistories.map((entry) => (
                      <div key={asText(entry.id)} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                        <p className="font-semibold text-slate-900">
                          Preg {asText(entry.pregnancy_number) || 'N/A'} • {formatDate(entry.date_conceived)}
                        </p>
                        <p className="mt-1 text-slate-600">
                          {asText(entry.mode_of_conception) || 'N/A'} • {asText(entry.mode_of_delivery) || 'N/A'} • {asText(entry.outcome) || 'N/A'}
                        </p>
                        <p className="mt-1 text-slate-600">Complications: {asText(entry.pregnancy_complications) || 'None'}</p>
                        <p className="mt-1 text-slate-600">
                          Child: {asText(entry.gender_id) === '2' ? 'Female' : asText(entry.gender_id) === '1' ? 'Male' : 'N/A'} • {asText(entry.weight) || 'N/A'} KG
                        </p>
                        <p className="mt-1 text-slate-600">{asText(entry.child_info) || 'No child information'}</p>
                        <ClinicalRecordPanel row={entry as JsonRow} />
                      </div>
                    ))}
                    {!pregnancyHistories.length ? <p className="text-xs text-slate-500">No pregnancy history entries yet.</p> : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'gynaecological_history' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Add Gynaecological History</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <input
                      type="date"
                      value={gynaecologicalForm.date_of_last_menstrual_period}
                      onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, date_of_last_menstrual_period: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                    />
                    <input value={gynaecologicalForm.menarche} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, menarche: e.target.value }))} placeholder="Menarche" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input value={gynaecologicalForm.menopause} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, menopause: e.target.value }))} placeholder="Menopause" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input value={gynaecologicalForm.cycle_length} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, cycle_length: e.target.value }))} placeholder="Cycle Length (Days)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input value={gynaecologicalForm.duration_of_bleed} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, duration_of_bleed: e.target.value }))} placeholder="Duration of Bleed (Days)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={gynaecologicalForm.intermenstrual_bleeding} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, intermenstrual_bleeding: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Intermenstrual Bleeding</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input value={gynaecologicalForm.intermenstrual_bleeding_details} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, intermenstrual_bleeding_details: e.target.value }))} placeholder="Intermenstrual Bleeding Details" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={gynaecologicalForm.dysmenorrhoea} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, dysmenorrhoea: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Dysmenorrhoea</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input value={gynaecologicalForm.dysmenorrhoea_details} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, dysmenorrhoea_details: e.target.value }))} placeholder="Dysmenorrhoea Details" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={gynaecologicalForm.post_coital_bleeding} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, post_coital_bleeding: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Post Coital Bleeding</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input value={gynaecologicalForm.post_coital_bleeding_details} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, post_coital_bleeding_details: e.target.value }))} placeholder="Post Coital Bleeding Details" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={gynaecologicalForm.dyspareunia} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, dyspareunia: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Dyspareunia</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input value={gynaecologicalForm.dyspareunia_details} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, dyspareunia_details: e.target.value }))} placeholder="Dyspareunia Details" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input value={gynaecologicalForm.number_of_lifetime_sexual_partners} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, number_of_lifetime_sexual_partners: e.target.value }))} placeholder="Number of Lifetime Sexual Partners" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input value={gynaecologicalForm.coital_frequency} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, coital_frequency: e.target.value }))} placeholder="Coital Frequency (Days/Week)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={gynaecologicalForm.cervical_cancer_screening} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, cervical_cancer_screening: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Cervical Cancer Screening</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input value={gynaecologicalForm.cervical_cancer_screening_details} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, cervical_cancer_screening_details: e.target.value }))} placeholder="Cervical Screening Details" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={gynaecologicalForm.breast_screening} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, breast_screening: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Breast Screening</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input value={gynaecologicalForm.breast_screening_details} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, breast_screening_details: e.target.value }))} placeholder="Breast Screening Details" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={gynaecologicalForm.previous_gynaecologic_procedures} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, previous_gynaecologic_procedures: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Previous Gynaecologic Procedures</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input value={gynaecologicalForm.previous_gynaecologic_procedures_details} onChange={(e) => setGynaecologicalForm((prev) => ({ ...prev, previous_gynaecologic_procedures_details: e.target.value }))} placeholder="Previous Procedures Details" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={submitGynaecologicalHistory}
                      disabled={saving || !Object.values(gynaecologicalForm).some((value) => asText(value))}
                      className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Gynaecological History</h3>
                  <div className="mt-3 max-h-[520px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                    {gynaecologicalHistories.map((entry) => (
                      <div key={asText(entry.id)} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                        <p className="font-semibold text-slate-900">LMP: {formatDate(entry.date_of_last_menstrual_period)} • {formatDateTime(entry.date_created)}</p>
                        <p className="mt-1 text-slate-600">Menarche: {asText(entry.menarche) || 'N/A'} • Menopause: {asText(entry.menopause) || 'N/A'}</p>
                        <p className="mt-1 text-slate-600">Cycle: {asText(entry.cycle_length) || 'N/A'} • Bleed: {asText(entry.duration_of_bleed) || 'N/A'}</p>
                        <p className="mt-1 text-slate-600">Intermenstrual bleeding: {asText(entry.intermenstrual_bleeding) || 'N/A'} {asText(entry.intermenstrual_bleeding_details) ? `(${asText(entry.intermenstrual_bleeding_details)})` : ''}</p>
                        <p className="mt-1 text-slate-600">Dysmenorrhoea: {asText(entry.dysmenorrhoea) || 'N/A'} {asText(entry.dysmenorrhoea_details) ? `(${asText(entry.dysmenorrhoea_details)})` : ''}</p>
                        <p className="mt-1 text-slate-600">Post coital bleeding: {asText(entry.post_coital_bleeding) || 'N/A'} {asText(entry.post_coital_bleeding_details) ? `(${asText(entry.post_coital_bleeding_details)})` : ''}</p>
                        <p className="mt-1 text-slate-600">Dyspareunia: {asText(entry.dyspareunia) || 'N/A'} {asText(entry.dyspareunia_details) ? `(${asText(entry.dyspareunia_details)})` : ''}</p>
                        <p className="mt-1 text-slate-600">Partners: {asText(entry.number_of_lifetime_sexual_partners) || 'N/A'} • Coital freq: {asText(entry.coital_frequency) || 'N/A'}</p>
                        <p className="mt-1 text-slate-600">Cervical screening: {asText(entry.cervical_cancer_screening) || 'N/A'} {asText(entry.cervical_cancer_screening_details) ? `(${asText(entry.cervical_cancer_screening_details)})` : ''}</p>
                        <p className="mt-1 text-slate-600">Breast screening: {asText(entry.breast_screening) || 'N/A'} {asText(entry.breast_screening_details) ? `(${asText(entry.breast_screening_details)})` : ''}</p>
                        <p className="mt-1 text-slate-600">Previous procedures: {asText(entry.previous_gynaecologic_procedures) || 'N/A'} {asText(entry.previous_gynaecologic_procedures_details) ? `(${asText(entry.previous_gynaecologic_procedures_details)})` : ''}</p>
                        <ClinicalRecordPanel row={entry as JsonRow} />
                      </div>
                    ))}
                    {!gynaecologicalHistories.length ? <p className="text-xs text-slate-500">No gynaecological history entries yet.</p> : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'obstetric_history' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Add Obstetric History</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <input type="number" min={0} step={1} value={obstetricForm.no_of_pregnancies} onChange={(e) => setObstetricForm((prev) => ({ ...prev, no_of_pregnancies: e.target.value }))} placeholder="No. of Pregnancies" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input type="number" min={0} step={1} value={obstetricForm.no_of_births} onChange={(e) => setObstetricForm((prev) => ({ ...prev, no_of_births: e.target.value }))} placeholder="No. of Births" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input type="number" min={0} step={1} value={obstetricForm.no_of_abortions_spontaneous} onChange={(e) => setObstetricForm((prev) => ({ ...prev, no_of_abortions_spontaneous: e.target.value }))} placeholder="No. of Abortions (Spontaneous)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input type="number" min={0} step={1} value={obstetricForm.no_of_abortions_induced} onChange={(e) => setObstetricForm((prev) => ({ ...prev, no_of_abortions_induced: e.target.value }))} placeholder="No. of Abortions (Induced)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input type="date" value={obstetricForm.date_of_last_menstrual_period} onChange={(e) => setObstetricForm((prev) => ({ ...prev, date_of_last_menstrual_period: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input type="date" value={obstetricForm.date_of_positive_pregnancy_test} onChange={(e) => setObstetricForm((prev) => ({ ...prev, date_of_positive_pregnancy_test: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <SearchableSelectField value={obstetricForm.confirmatory_ultrasound_scan} onChange={(e) => setObstetricForm((prev) => ({ ...prev, confirmatory_ultrasound_scan: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      <option value="">Confirmatory Ultrasound Scan</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input type="date" value={obstetricForm.date_of_scan} onChange={(e) => setObstetricForm((prev) => ({ ...prev, date_of_scan: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input value={obstetricForm.child_info} onChange={(e) => setObstetricForm((prev) => ({ ...prev, child_info: e.target.value }))} placeholder="Current Info On Child" className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2" />
                    <input value={obstetricForm.gestational_age} onChange={(e) => setObstetricForm((prev) => ({ ...prev, gestational_age: e.target.value }))} placeholder="Gestational Age" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <input type="date" value={obstetricForm.edd} onChange={(e) => setObstetricForm((prev) => ({ ...prev, edd: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={submitObstetricHistory}
                      disabled={saving || !Object.values(obstetricForm).some((value) => asText(value))}
                      className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Obstetric History</h3>
                  <div className="mt-3 max-h-[520px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                    {obstetricHistories.map((entry) => (
                      <div key={asText(entry.id)} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                        <p className="font-semibold text-slate-900">
                          G{asText(entry.no_of_pregnancies) || '0'} P{asText(entry.no_of_births) || '0'} A{asText(entry.no_of_abortions_spontaneous) || '0'}/{asText(entry.no_of_abortions_induced) || '0'}
                        </p>
                        <p className="mt-1 text-slate-600">
                          LMP: {formatDate(entry.date_of_last_menstrual_period)} • Positive test: {formatDate(entry.date_of_positive_pregnancy_test)}
                        </p>
                        <p className="mt-1 text-slate-600">
                          Confirmatory scan: {asText(entry.confirmatory_ultrasound_scan) || 'N/A'} • Date of scan: {formatDate(entry.date_of_scan)}
                        </p>
                        <p className="mt-1 text-slate-600">Gestational age: {asText(entry.gestational_age) || 'N/A'} • EDD: {formatDate(entry.edd)}</p>
                        <p className="mt-1 text-slate-600">{asText(entry.child_info) || 'No child information'}</p>
                        <p className="mt-1 text-slate-500">{formatDateTime(entry.date_created)}</p>
                        <ClinicalRecordPanel row={entry as JsonRow} />
                      </div>
                    ))}
                    {!obstetricHistories.length ? <p className="text-xs text-slate-500">No obstetric history entries yet.</p> : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'personal_history' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Add Personal & Social History</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <SearchableSelectField
                      value={personalHistoryForm.occupation_id}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, occupation_id: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Occupation</option>
                      {occupationOptions.map((row) => (
                        <option key={row.id} value={row.id}>
                          {asText(row.name) || row.id}
                        </option>
                      ))}
                    </SearchableSelectField>
                    <SearchableSelectField
                      value={personalHistoryForm.location_id}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, location_id: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Location</option>
                      {locationOptions.map((row) => (
                        <option key={row.id} value={row.id}>
                          {asText(row.name) || row.id}
                        </option>
                      ))}
                    </SearchableSelectField>
                    <input
                      value={personalHistoryForm.family_circumstance}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, family_circumstance: e.target.value }))}
                      placeholder="Family Circumstance"
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                    />
                    <SearchableSelectField
                      value={personalHistoryForm.religion_id}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, religion_id: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Religion</option>
                      {religionOptions.map((row) => (
                        <option key={row.id} value={row.id}>
                          {asText(row.name) || row.id}
                        </option>
                      ))}
                    </SearchableSelectField>
                    <input
                      value={personalHistoryForm.hobbies}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, hobbies: e.target.value }))}
                      placeholder="Hobbies / Exercise"
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <SearchableSelectField
                      value={personalHistoryForm.alchohol_intake}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, alchohol_intake: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Alcohol Intake</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input
                      value={personalHistoryForm.alcohol_details}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, alcohol_details: e.target.value }))}
                      placeholder="Alcohol Details"
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <SearchableSelectField
                      value={personalHistoryForm.tobacco_intake}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, tobacco_intake: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Tobacco Intake</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </SearchableSelectField>
                    <input
                      value={personalHistoryForm.tobacco_details}
                      onChange={(e) => setPersonalHistoryForm((prev) => ({ ...prev, tobacco_details: e.target.value }))}
                      placeholder="Tobacco Details"
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={submitPersonalHistory}
                      disabled={saving || !Object.values(personalHistoryForm).some((value) => asText(value))}
                      className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Personal History</h3>
                  <div className="mt-3 max-h-[520px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                    {personalHistories.map((entry) => (
                      <div key={asText(entry.id)} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                        <p className="font-semibold text-slate-900">
                          {asText(entry.occupation_name) || 'No occupation'} • {asText(entry.location_name) || 'No location'}
                        </p>
                        <p className="mt-1 text-slate-600">
                          Religion: {asText(entry.religion_name) || 'N/A'} • Hobbies: {asText(entry.hobbies) || 'N/A'}
                        </p>
                        <p className="mt-1 text-slate-600">
                          Alcohol: {asText(entry.alchohol_intake) || 'N/A'} {asText(entry.alcohol_details) ? `(${asText(entry.alcohol_details)})` : ''}
                        </p>
                        <p className="mt-1 text-slate-600">
                          Tobacco: {asText(entry.tobacco_intake) || 'N/A'} {asText(entry.tobacco_details) ? `(${asText(entry.tobacco_details)})` : ''}
                        </p>
                        {asText(entry.family_circumstance) ? <p className="mt-1 text-slate-600">Family: {asText(entry.family_circumstance)}</p> : null}
                        <p className="mt-1 text-slate-500">{formatDateTime(entry.date_created)}</p>
                        <ClinicalRecordPanel row={entry as JsonRow} />
                      </div>
                    ))}
                    {!personalHistories.length ? <p className="text-xs text-slate-500">No personal history entries yet.</p> : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeTab !== 'summary' && activeTab !== 'chief_complaint' && activeTab !== 'past_history' && activeTab !== 'direct_questioning' && activeTab !== 'review_of_systems' && activeTab !== 'family_history' && activeTab !== 'contraception_history' && activeTab !== 'pregnancy_history' && activeTab !== 'gynaecological_history' && activeTab !== 'obstetric_history' && activeTab !== 'personal_history' ? (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-semibold">This section is not fully migrated yet.</p>
              <p className="mt-1">The tab is active and ready for progressive migration from HMS temp. Next I can wire this tab to its exact backend model and form fields.</p>
            </section>
          ) : null}
        </div>

        
      </div>
    </div>
  );
}

function ClinicalRecordPanel({ row }: { row: JsonRow }) {
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
