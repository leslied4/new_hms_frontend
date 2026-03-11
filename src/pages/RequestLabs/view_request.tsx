import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type GenericRow = Record<string, unknown> & { id: string };

type RequestLab = {
  id: string;
  patient_visit_id?: string | null;
  lab_test_id?: string | null;
  user_id?: string | null;
  status_id?: string | null;
  priority_id?: string | null;
  date_created?: string | null;
  comment?: string | null;
  description?: string | null;
  source?: string | null;
  is_complete?: number | null;
};

type PatientVisit = {
  id: string;
  patient_id?: string | null;
  lab_no?: string | null;
  specimen_drawn_by?: string | null;
  specimen_drawn_date?: string | null;
  specimen_analyzed_date?: string | null;
  patient_insurance_profile_policy_id?: string | null;
};

type Patient = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  folder_number?: string | null;
  code?: string | null;
  phone?: string | null;
  email?: string | null;
  date_of_birth?: string | null;
  gender_id?: string | null;
  insurance_profile_policies_id?: string | null;
};

type LabTest = {
  id: string;
  name?: string | null;
  value_new?: string | number | null;
  turn_around_time?: string | number | null;
};

type LabTemplate = {
  id: string;
  lab_test_id?: string | null;
  label_name?: string | null;
  input_type?: string | null;
  reference?: string | null;
  unit_of_measurement?: string | null;
  min_value?: string | number | null;
  max_value?: string | number | null;
  id_section?: number | null;
  date_created?: string | null;
};

type LabTemplateSelectOption = {
  id: string;
  lab_template_id?: string | null;
  name?: string | null;
};

type LabResult = {
  id: string;
  request_lab_id?: string | null;
  lab_template_id?: string | null;
  normal_value?: string | null;
  reference_value?: string | null;
  unit_of_measurement?: string | null;
  result_flag_id?: string | null;
  label_name?: string | null;
  type?: string | null;
  id_section?: number | null;
};

type DetailedViewResponse = {
  patient_visit: PatientVisit | null;
  patient: Patient | null;
  request_labs: RequestLab[];
  lab_tests: LabTest[];
  request_lab_tests?: LabTest[];
  users: GenericRow[];
  priorities: GenericRow[];
  statuses: GenericRow[];
  specimen_types: GenericRow[];
  specimen_sources: GenericRow[];
  result_flags: GenericRow[];
  lab_templates: LabTemplate[];
  lab_template_select_options: LabTemplateSelectOption[];
  lab_test_results: LabResult[];
  specimen_types_lab_tests: GenericRow[];
  request_labs_specimen_types: GenericRow[];
};

type ResultEditorValue = {
  id?: string;
  request_lab_id: string;
  lab_template_id: string | null;
  label_name: string;
  type: string;
  input_type?: string;
  id_section: number | null;
  normal_value: string;
  reference_value: string;
  unit_of_measurement: string;
  result_flag_id: string;
};

type AddRequestFormState = {
  lab_test_reasons: string;
  current_medications: string;
  known_allergies: string;
  source: string;
  source_other: string;
  priority_id: string;
  bill_to_id: string;
};

type ProcessFormState = {
  specimen_drawn_by: string;
  specimen_drawn_date: string;
  specimen_analyzed_date: string;
  generate_lab_number: boolean;
  lab_number: string;
  complete_lab: boolean;
};

type BomReagentRow = {
  item_id: string;
  name: string;
  percentage_used: number;
  base_quantity: number;
  auto_quantity_used: number;
  actual_quantity_used_default: number;
};

type BomDetailsResponse = {
  request_lab: {
    id: string;
    patient_visit_id: string;
    lab_test_id: string;
    status_id: string;
  } | null;
  test: {
    id: string;
    name: string;
  } | null;
  reagents: BomReagentRow[];
};
type ProcessTemplateType =
  | 'bloodchemistry'
  | 'toxicology'
  | 'molecular'
  | 'hematopathology'
  | 'biopsy'
  | 'cytological';

type JsonRecord = Record<string, unknown>;

const initialAddRequestForm: AddRequestFormState = {
  lab_test_reasons: '',
  current_medications: '',
  known_allergies: '',
  source: 'Patient',
  source_other: '',
  priority_id: '1',
  bill_to_id: '-1',
};

const processTemplateTypes: ProcessTemplateType[] = [
  'toxicology',
  'molecular',
  'hematopathology',
  'biopsy',
  'cytological',
  'bloodchemistry',
];

const structuredResultTypes = new Set<string>([
  'toxicology',
  'molecular',
  'hematopathology',
  'biopsy',
  'cytological',
  'bloodchemistry',
]);

const normalizeResultType = (value: unknown): string => {
  const normalized = asText(value).toLowerCase();
  return structuredResultTypes.has(normalized) ? normalized : '';
};

const defaultTemplatePayloads: Record<Exclude<ProcessTemplateType, 'bloodchemistry'>, JsonRecord> = {
  toxicology: {
    specimenInfo: {
      typeOfSpecimen: '',
      specimenSource: '',
      numberOfSpecimens: '',
      volumeCollected: '',
      volumeUnit: 'mL',
      weight: '',
      weightUnit: 'g',
      sampleCondition: '',
      colorConsistency: '',
      tissueDescription: '',
      margins: '',
    },
    tests: [
      { analyte: '', method: '', cutoff: '', result: 'Negative', units: '' },
      { analyte: '', method: '', cutoff: '', result: 'Negative', units: '' },
    ],
    interpretation: {
      detectedSubstances: '',
      therapeuticRange: '',
      toxicRange: '',
      lethalRange: '',
      clinicalEffects: '',
    },
    qualityControl: {
      internalControls: 'Yes',
      externalQuality: 'Yes',
      labAccreditation: 'ISO',
    },
  },
  molecular: {
    tests: [
      {
        testName: '',
        methodology: '',
        equipmentUsed: '',
        results: {
          geneTarget: '',
          mutationDetected: '',
          viralLoad: '',
          coverageDepth: '',
          qualityScore: '',
          interpretation: '',
        },
      },
    ],
  },
  cytological: {
    specimenInformation: {
      accessionNumber: '',
      collectionDate: '',
      reportDate: '',
      specimenType: '',
      collectionSite: '',
      procedure: '',
      clinicalIndication: '',
      collectedBy: '',
      fixative: '',
      previousResults: '',
    },
    processingTechnique: {
      preparationTechnique: '',
      stainingMethod: '',
      specialProcessing: '',
      cellBlock: '',
      rose: '',
      roseResults: '',
    },
    microscopicFindings: {
      adequacy: '',
      cellularity: '',
      background: '',
      cellMorphology: '',
      cellularPattern: '',
      cellularArrangement: '',
      nuclearFeatures: '',
      cytoplasmicFeatures: '',
      microorganisms: '',
    },
    specificClassifications: {
      papSmear: {
        bethesdaClassification: '',
        endocervicalComponent: '',
        hormonalEvaluation: '',
        epithelialAbnormalities: [],
      },
      fna: {
        descriptiveDiagnosis: '',
        milanSystem: '',
        bethesdaThyroid: '',
        iacYokohama: '',
      },
      bodyFluid: {
        cellTypes: [],
        atypicalCells: '',
      },
    },
    diagnosisAndInterpretation: {
      primaryDiagnosis: '',
      diagnosticCategory: '',
      additionalFindings: '',
      differentialDiagnosis: '',
      clinicalCorrelation: '',
      previousCorrelation: '',
    },
    recommendations: {
      followUp: '',
      timeFrame: '',
      additionalTesting: '',
      comments: '',
    },
  },
  biopsy: {
    specimenInformation: {
      accessionNumber: '',
      collectionDate: '',
      reportDate: '',
      specimenType: '',
      biopsySite: '',
      procedure: '',
      clinicalIndication: '',
      collectedBy: '',
      fixative: '',
    },
    grossingWorkflow: {
      specimenReceived: '',
      specimenDimensions: '',
      specimenWeight: '',
      colorConsistency: '',
      specimenDescription: '',
      photos: '',
      orientationMarkings: '',
      sectionsSubmitted: '',
      cassetteSummary: '',
      grossImpression: '',
    },
    tissueProcessing: {
      fixationType: '',
      dehydrationReagents: '',
      clearingParaffin: '',
      automatedProcessing: '',
      embeddingOrientation: '',
    },
    microtomyAndStaining: {
      sectionThickness: '',
      slidePreparation: '',
      routineStain: '',
      specialStains: [],
      ihcPanel: [],
      controlSlides: '',
    },
    microscopicExamination: {
      tissueType: '',
      histologicalFindings: '',
      histologicType: '',
      tumorGrade: '',
      tumorSize: '',
      marginStatus: '',
      lymphovascularInvasion: '',
      perineuralInvasion: '',
      necrosis: '',
      necrosisExtent: '',
    },
    specialStainsAndIHC: {
      specialStainsPerformed: '',
      specialStainResults: '',
      ihcMarkers: [],
      ihcResults: '',
      molecularTesting: '',
      molecularResults: '',
    },
    pathologicStaging: {
      tStage: '',
      nStage: '',
      mStage: '',
      overallStage: '',
      ajccStage: '',
    },
    diagnosisAndSummary: {
      primaryDiagnosis: '',
      additionalFindings: '',
      differentialDiagnosis: '',
      commentsRecommendations: '',
      suggestedFollowUp: '',
    },
    tumorCharacteristics: {
      tumorHistologicalType: '',
      tumorGradeDetails: '',
      tumorSizeDetails: '',
      tumorInvasion: '',
      tumorMargins: '',
      tumorLymphovascularInvasion: '',
      tumorPerineuralInvasion: '',
      tumorNecrosis: '',
    },
  },
  hematopathology: {
    specimenInformation: {
      accessionNumber: '',
      collectionDateTime: '',
      reportDate: '',
      specimenType: [],
      collectionSite: '',
      otherCollectionSite: '',
      fixativeAnticoagulant: '',
      otherFixative: '',
      specimensCollected: [],
      collectionPerformedBy: '',
      collectionQuality: '',
      otherQuality: '',
    },
    peripheralBloodExam: {
      cbcResults: {
        wbcCount: '',
        rbcCount: '',
        hemoglobin: '',
        hematocrit: '',
        plateletCount: '',
      },
      differentialCount: {
        neutrophilsPercent: '',
        lymphocytesPercent: '',
        monocytesPercent: '',
        eosinophilsPercent: '',
        basophilsPercent: '',
        blastsPercent: '',
      },
      bloodSmearMorphology: {
        rbcMorphology: [],
        wbcMorphology: [],
        lymphocyteMorphology: [],
        plateletMorphology: [],
      },
    },
    boneMarrowAspirateExam: {
      cellularity: {
        cellularity: '',
        cellularityPercentage: '',
        meRatio: '',
      },
      erythroidSeries: { percentage: '', maturation: '', description: '' },
      myeloidSeries: { percentage: '', maturation: '', description: '' },
      blastCells: { percentage: '', morphology: '' },
      cytochemicalStains: [],
      cytochemicalResults: '',
    },
    diagnosisClassification: {
      hematologicDiagnosis: '',
      whoClassification: '',
      whoSubclassification: '',
      riskStratification: '',
      diseaseStatus: '',
      mrdStatus: '',
      mrdPercentage: '',
    },
    interpretationCorrelation: {
      summaryFindings: '',
      clinicopathologicCorrelation: '',
      comments: '',
      responseToTherapy: '',
      diseaseProgression: '',
    },
    recommendations: {
      additionalStudies: '',
      followUp: '',
      nextBoneMarrowEval: '',
      clinicalTrialEligibility: '',
    },
  },
};

const deepClone = (value: unknown): unknown => JSON.parse(JSON.stringify(value));

const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const mergeDeep = (base: unknown, incoming: unknown): unknown => {
  if (Array.isArray(base)) {
    return Array.isArray(incoming) ? incoming : base;
  }
  if (isRecord(base)) {
    const output: JsonRecord = { ...base };
    if (!isRecord(incoming)) return output;
    Object.keys(incoming).forEach((key) => {
      const currentBase = output[key];
      output[key] = currentBase === undefined ? incoming[key] : mergeDeep(currentBase, incoming[key]);
    });
    return output;
  }
  return incoming === undefined ? base : incoming;
};

const getByPath = (source: unknown, path: string, fallback: unknown = ''): unknown => {
  const segments = path.split('.');
  let current: unknown = source;
  for (const segment of segments) {
    if (!isRecord(current) && !Array.isArray(current)) return fallback;
    const index = Number(segment);
    if (Array.isArray(current) && Number.isInteger(index)) {
      current = current[index];
      continue;
    }
    current = (current as JsonRecord)[segment];
  }
  return current === undefined || current === null ? fallback : current;
};

const setByPath = (source: unknown, path: string, value: unknown): unknown => {
  const segments = path.split('.');
  const root = deepClone(source);
  let current: unknown = root;
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const nextSegment = segments[index + 1];
    const nextIsArrayIndex = Number.isInteger(Number(nextSegment));
    if (Array.isArray(current)) {
      const arrIndex = Number(segment);
      if (isLast) {
        current[arrIndex] = value;
        return;
      }
      if (current[arrIndex] === undefined || current[arrIndex] === null) {
        current[arrIndex] = nextIsArrayIndex ? [] : {};
      }
      current = current[arrIndex];
      return;
    }
    if (!isRecord(current)) return;
    if (isLast) {
      current[segment] = value;
      return;
    }
    if (!isRecord(current[segment]) && !Array.isArray(current[segment])) {
      current[segment] = nextIsArrayIndex ? [] : {};
    }
    current = current[segment];
  });
  return root;
};

const toKey = (requestLabId: string, templateId: string | null): string => `${requestLabId}::${templateId || 'default'}`;

const asText = (value: unknown): string => String(value ?? '').trim();

const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatDateTime = (value?: string | null): string => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString();
};

const toLocalDateTimeInput = (value?: string | null): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offsetMs = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - offsetMs);
  return local.toISOString().slice(0, 16);
};

const fromLocalDateTimeInput = (value: string): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

const idLabel = (row: GenericRow | null | undefined): string => {
  if (!row) return '';
  const candidates = ['name', 'label_name', 'description', 'first_name'];
  for (const key of candidates) {
    const val = asText(row[key]);
    if (val) return val;
  }
  return asText(row.id);
};

const buildId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '');
  }
  return `${Date.now()}${Math.random().toString(16).slice(2, 12)}`;
};

const statusBadgeClass = (statusId?: string | null): string => {
  if (String(statusId) === '24') return 'bg-rose-100 text-rose-700';
  if (String(statusId) === '23') return 'bg-emerald-100 text-emerald-700';
  if (String(statusId) === '19' || String(statusId) === '20') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-700';
};

export default function RequestLabsViewRequest() {
  const [searchParams] = useSearchParams();
  const visitId = searchParams.get('visit_id') || searchParams.get('id') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [isSubmittingProcess, setIsSubmittingProcess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [patientVisit, setPatientVisit] = useState<PatientVisit | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [requestLabs, setRequestLabs] = useState<RequestLab[]>([]);
  const [requestLabTests, setRequestLabTests] = useState<LabTest[]>([]);
  const [searchLabTests, setSearchLabTests] = useState<LabTest[]>([]);
  const [isSearchingLabTests, setIsSearchingLabTests] = useState(false);
  const [users, setUsers] = useState<GenericRow[]>([]);
  const [priorities, setPriorities] = useState<GenericRow[]>([]);
  const [statuses, setStatuses] = useState<GenericRow[]>([]);
  const [specimenTypes, setSpecimenTypes] = useState<GenericRow[]>([]);
  const [resultFlags, setResultFlags] = useState<GenericRow[]>([]);
  const [templates, setTemplates] = useState<LabTemplate[]>([]);
  const [templateOptions, setTemplateOptions] = useState<LabTemplateSelectOption[]>([]);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [specimenTypeLinks, setSpecimenTypeLinks] = useState<GenericRow[]>([]);

  const [addRequestForm, setAddRequestForm] = useState<AddRequestFormState>(initialAddRequestForm);
  const [labSearch, setLabSearch] = useState('');
  const [selectedLabTestIds, setSelectedLabTestIds] = useState<string[]>([]);
  const [selectedLabTestDetails, setSelectedLabTestDetails] = useState<Record<string, LabTest>>({});

  const [resultEditor, setResultEditor] = useState<Record<string, ResultEditorValue>>({});
  const [requestComments, setRequestComments] = useState<Record<string, string>>({});
  const [activeModal, setActiveModal] = useState<'walkin' | 'history' | 'clinical' | 'samples' | null>(null);
  const [activeProcessRequestId, setActiveProcessRequestId] = useState<string | null>(null);
  const [activeBomRequestId, setActiveBomRequestId] = useState<string | null>(null);
  const [isLoadingBom, setIsLoadingBom] = useState(false);
  const [bomDetails, setBomDetails] = useState<BomDetailsResponse | null>(null);
  const [bomQuantities, setBomQuantities] = useState<Record<string, string>>({});
  const [selectedProcessTemplate, setSelectedProcessTemplate] = useState<ProcessTemplateType>('bloodchemistry');
  const [templatePayloads, setTemplatePayloads] = useState<Record<Exclude<ProcessTemplateType, 'bloodchemistry'>, JsonRecord>>(
    () =>
      ({
        toxicology: deepClone(defaultTemplatePayloads.toxicology),
        molecular: deepClone(defaultTemplatePayloads.molecular),
        hematopathology: deepClone(defaultTemplatePayloads.hematopathology),
        biopsy: deepClone(defaultTemplatePayloads.biopsy),
        cytological: deepClone(defaultTemplatePayloads.cytological),
      }) as Record<Exclude<ProcessTemplateType, 'bloodchemistry'>, JsonRecord>,
  );
  const [processForm, setProcessForm] = useState<ProcessFormState>({
    specimen_drawn_by: '',
    specimen_drawn_date: '',
    specimen_analyzed_date: '',
    generate_lab_number: true,
    lab_number: '',
    complete_lab: false,
  });

  const statusById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    statuses.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [statuses]);

  const userById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    users.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [users]);

  const priorityById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    priorities.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [priorities]);

  const labTestById = useMemo(() => {
    const map = new Map<string, LabTest>();
    Object.values(selectedLabTestDetails).forEach((row) => map.set(String(row.id), row));
    requestLabTests.forEach((row) => map.set(String(row.id), row));
    searchLabTests.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [selectedLabTestDetails, requestLabTests, searchLabTests]);

  const specimenTypeById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    specimenTypes.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [specimenTypes]);

  const templatesByLabTestId = useMemo(() => {
    const map = new Map<string, LabTemplate[]>();
    templates.forEach((template) => {
      const key = String(template.lab_test_id || '');
      if (!key) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(template);
    });
    map.forEach((list) => {
      list.sort((a, b) => {
        const sectionA = Number(a.id_section || 0);
        const sectionB = Number(b.id_section || 0);
        if (sectionA !== sectionB) return sectionA - sectionB;
        const dateA = asText(a.date_created);
        const dateB = asText(b.date_created);
        return dateA.localeCompare(dateB);
      });
    });
    return map;
  }, [templates]);

  const optionsByTemplateId = useMemo(() => {
    const map = new Map<string, LabTemplateSelectOption[]>();
    templateOptions.forEach((option) => {
      const key = String(option.lab_template_id || '');
      if (!key) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(option);
    });
    return map;
  }, [templateOptions]);

  const specimenTypeIdsByLabTestId = useMemo(() => {
    const map = new Map<string, string[]>();
    specimenTypeLinks.forEach((link) => {
      const labTestId = asText(link.lab_test_id);
      const specimenTypeId = asText(link.specimen_type_id);
      if (!labTestId || !specimenTypeId) return;
      if (!map.has(labTestId)) map.set(labTestId, []);
      map.get(labTestId)?.push(specimenTypeId);
    });
    return map;
  }, [specimenTypeLinks]);

  const displayedLabTests = useMemo(() => {
    if (labSearch.trim().length < 2) return requestLabTests.slice(0, 30);
    return searchLabTests;
  }, [labSearch, requestLabTests, searchLabTests]);

  const selectedLabTests = useMemo(
    () => selectedLabTestIds.map((id) => labTestById.get(id)).filter(Boolean) as LabTest[],
    [selectedLabTestIds, labTestById],
  );

  const selectedLabTotal = useMemo(
    () => selectedLabTests.reduce((sum, item) => sum + asNumber(item.value_new), 0),
    [selectedLabTests],
  );

  const processableRequests = useMemo(
    () => requestLabs.filter((requestLab) => String(requestLab.status_id || '') !== '24'),
    [requestLabs],
  );

  const loadView = async () => {
    if (!visitId) {
      setError('Missing visit_id in URL.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get<DetailedViewResponse>(
        `/legacy/request-labs/view-request/?patient_visit_id=${encodeURIComponent(visitId)}&detailed=1`,
      );

      setPatientVisit(data?.patient_visit || null);
      setPatient(data?.patient || null);
      setRequestLabs(Array.isArray(data?.request_labs) ? data.request_labs : []);
      setRequestLabTests(Array.isArray(data?.request_lab_tests) ? data.request_lab_tests : []);
      setUsers(Array.isArray(data?.users) ? data.users : []);
      setPriorities(Array.isArray(data?.priorities) ? data.priorities : []);
      setStatuses(Array.isArray(data?.statuses) ? data.statuses : []);
      setSpecimenTypes(Array.isArray(data?.specimen_types) ? data.specimen_types : []);
      setResultFlags(Array.isArray(data?.result_flags) ? data.result_flags : []);
      setTemplates(Array.isArray(data?.lab_templates) ? data.lab_templates : []);
      setTemplateOptions(Array.isArray(data?.lab_template_select_options) ? data.lab_template_select_options : []);
      setLabResults(Array.isArray(data?.lab_test_results) ? data.lab_test_results : []);
      setSpecimenTypeLinks(Array.isArray(data?.specimen_types_lab_tests) ? data.specimen_types_lab_tests : []);

      setProcessForm((prev) => ({
        ...prev,
        specimen_drawn_by: asText(data?.patient_visit?.specimen_drawn_by),
        specimen_drawn_date: toLocalDateTimeInput(data?.patient_visit?.specimen_drawn_date),
        specimen_analyzed_date: toLocalDateTimeInput(data?.patient_visit?.specimen_analyzed_date),
        lab_number: asText(data?.patient_visit?.lab_no),
      }));

      const initialComments: Record<string, string> = {};
      (Array.isArray(data?.request_labs) ? data.request_labs : []).forEach((item) => {
        initialComments[item.id] = asText(item.comment);
      });
      setRequestComments(initialComments);

      const resultMap: Record<string, ResultEditorValue> = {};
      const existingResults = Array.isArray(data?.lab_test_results) ? data.lab_test_results : [];
      const localLabTestMap = new Map<string, LabTest>();
      (Array.isArray(data?.request_lab_tests) ? data.request_lab_tests : []).forEach((row) => {
        localLabTestMap.set(String(row.id), row);
      });

      (Array.isArray(data?.request_labs) ? data.request_labs : []).forEach((requestLab) => {
        const labTestId = asText(requestLab.lab_test_id);
        const testTemplates = (Array.isArray(data?.lab_templates) ? data.lab_templates : []).filter(
          (template) => String(template.lab_test_id || '') === labTestId,
        );

        if (testTemplates.length === 0) {
          const key = toKey(requestLab.id, null);
          const existing = existingResults.find(
            (row) =>
              String(row.request_lab_id || '') === requestLab.id &&
              !asText(row.lab_template_id) &&
              !structuredResultTypes.has(asText(row.type).toLowerCase()),
          );
          resultMap[key] = {
            id: existing?.id,
            request_lab_id: requestLab.id,
            lab_template_id: null,
            label_name: asText(localLabTestMap.get(labTestId)?.name) || 'Result',
            type: normalizeResultType(existing?.type),
            input_type: 'Text',
            id_section: null,
            normal_value: asText(existing?.normal_value),
            reference_value: asText(existing?.reference_value),
            unit_of_measurement: asText(existing?.unit_of_measurement),
            result_flag_id: asText(existing?.result_flag_id),
          };
          return;
        }

        testTemplates.forEach((template) => {
          const templateId = String(template.id || '');
          const existing = existingResults.find(
            (row) => String(row.request_lab_id || '') === requestLab.id && String(row.lab_template_id || '') === templateId,
          );
          const key = toKey(requestLab.id, templateId);
          resultMap[key] = {
            id: existing?.id,
            request_lab_id: requestLab.id,
            lab_template_id: templateId,
            label_name: asText(template.label_name) || 'Result',
            type: normalizeResultType(existing?.type),
            input_type: asText(template.input_type) || 'Text',
            id_section: template.id_section ?? null,
            normal_value: asText(existing?.normal_value),
            reference_value: asText(existing?.reference_value) || asText(template.reference),
            unit_of_measurement: asText(existing?.unit_of_measurement) || asText(template.unit_of_measurement),
            result_flag_id: asText(existing?.result_flag_id),
          };
        });
      });

      setResultEditor(resultMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load laboratory request view.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => {
      setError('Unable to load laboratory request view.');
      setIsLoading(false);
    });
  }, [visitId]);

  useEffect(() => {
    const term = labSearch.trim();
    if (term.length < 2) {
      setSearchLabTests([]);
      setIsSearchingLabTests(false);
      return;
    }

    let isCancelled = false;
    setIsSearchingLabTests(true);

    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<unknown>(
          `/legacy/patients/get-lab-tests/?searchValue=${encodeURIComponent(term)}&limit=30`,
        );
        let rows: LabTest[] = [];
        if (Array.isArray(response)) {
          rows = response as LabTest[];
        } else if (response && typeof response === 'object') {
          const payload = response as Record<string, unknown>;
          const candidates = [payload.data, payload.rows, payload.items, payload.lab_tests];
          const firstArray = candidates.find((entry) => Array.isArray(entry));
          if (Array.isArray(firstArray)) {
            rows = firstArray as LabTest[];
          }
        }
        if (!isCancelled) setSearchLabTests(rows);
      } catch {
        if (!isCancelled) setSearchLabTests([]);
      } finally {
        if (!isCancelled) setIsSearchingLabTests(false);
      }
    }, 350);

    return () => {
      isCancelled = true;
      window.clearTimeout(timer);
    };
  }, [labSearch]);

  useEffect(() => {
    setSelectedLabTestDetails((prev) => {
      let next: Record<string, LabTest> | null = null;
      const merged = [...requestLabTests, ...searchLabTests];
      merged.forEach((test) => {
        const id = String(test.id || '');
        if (!id || !selectedLabTestIds.includes(id)) return;
        if (!prev[id]) {
          if (!next) next = { ...prev };
          next[id] = test;
        }
      });
      return next || prev;
    });
  }, [requestLabTests, searchLabTests, selectedLabTestIds]);

  const toggleLabSelection = (labTestId: string, test?: LabTest) => {
    setSelectedLabTestIds((prev) => {
      if (prev.includes(labTestId)) return prev.filter((id) => id !== labTestId);
      if (test) {
        setSelectedLabTestDetails((cachePrev) => ({ ...cachePrev, [labTestId]: test }));
      }
      return [...prev, labTestId];
    });
  };

  const submitAddRequests = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patientVisit?.id) {
      setError('Patient visit is not available.');
      return;
    }
    if (selectedLabTestIds.length === 0) {
      setError('Select at least one lab test.');
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmittingAdd(true);
    try {
      const source = ['Other', 'Referring Physician'].includes(addRequestForm.source)
        ? `${addRequestForm.source}: ${addRequestForm.source_other || ''}`.trim()
        : addRequestForm.source;

      await Promise.all(
        selectedLabTestIds.map((labTestId) =>
          api.post('/legacy/request-labs/add-request-lab/', {
            id: buildId(),
            patient_visit_id: patientVisit.id,
            lab_test_id: labTestId,
            priority_id: addRequestForm.priority_id || '1',
            status_id: '20',
            is_complete: 0,
            source,
            description: addRequestForm.lab_test_reasons || null,
            comment: addRequestForm.known_allergies || null,
            date_created: new Date().toISOString(),
          }),
        ),
      );

      setAddRequestForm(initialAddRequestForm);
      setSelectedLabTestIds([]);
      setLabSearch('');
      setSuccess('Lab request(s) submitted.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit lab request(s).');
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  const cancelRequest = async (requestLabId: string) => {
    const confirmed = window.confirm('Cancel this lab request?');
    if (!confirmed) return;

    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/legacy/request-labs/cancel-request-lab/?id=${encodeURIComponent(requestLabId)}`, {
        status_id: '24',
        is_complete: 0,
      });
      setSuccess('Lab request cancelled.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel lab request.');
    }
  };

  const openCompleteBomModal = async (requestLabId: string) => {
    setError(null);
    setSuccess(null);
    setIsLoadingBom(true);
    setActiveBomRequestId(requestLabId);
    try {
      const data = await api.get<BomDetailsResponse>(
        `/legacy/request-labs/complete-bom-details/?id=${encodeURIComponent(requestLabId)}&patient_visit_id=${encodeURIComponent(visitId)}`,
      );
      setBomDetails(data || null);
      const initialQuantities: Record<string, string> = {};
      (Array.isArray(data?.reagents) ? data.reagents : []).forEach((row) => {
        initialQuantities[row.item_id] = String(row.actual_quantity_used_default ?? 0);
      });
      setBomQuantities(initialQuantities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load bill of materials.');
      setActiveBomRequestId(null);
      setBomDetails(null);
    } finally {
      setIsLoadingBom(false);
    }
  };

  const completeRequestWithBom = async () => {
    if (!activeBomRequestId) return;
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/legacy/request-labs/complete-request-lab/?id=${encodeURIComponent(activeBomRequestId)}`, {
        status_id: '23',
        is_complete: 1,
        actual_quantity_used: bomQuantities,
      });
      setSuccess('Lab request completed.');
      setActiveBomRequestId(null);
      setBomDetails(null);
      setBomQuantities({});
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to complete lab request.');
    }
  };

  const submitProcessLabs = async (requestIdsOverride?: string[]) => {
    if (!patientVisit?.id) {
      setError('Patient visit is not available.');
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmittingProcess(true);
    try {
      const targetRequestIds = Array.isArray(requestIdsOverride) && requestIdsOverride.length > 0
        ? requestIdsOverride
        : processableRequests.map((item) => item.id);

      const resultsPayload = Object.values(resultEditor)
        .filter((item) => targetRequestIds.includes(item.request_lab_id))
        .filter((item) => {
          if (item.id) return true;
          return Boolean(
            asText(item.normal_value) ||
              asText(item.reference_value) ||
              asText(item.unit_of_measurement) ||
              asText(item.result_flag_id),
          );
        })
        .map((item) => ({
          id: item.id,
          request_lab_id: item.request_lab_id,
          lab_template_id: item.lab_template_id,
          label_name: item.label_name,
          type: normalizeResultType(item.type) || null,
          id_section: item.id_section,
          normal_value: item.normal_value,
          reference_value: item.reference_value,
          unit_of_measurement: item.unit_of_measurement,
          result_flag_id: item.result_flag_id || null,
        }));

      await api.post('/legacy/request-labs/process-labs/', {
        patient_visit_id: patientVisit.id,
        request_lab_ids: targetRequestIds,
        request_comments: requestComments,
        complete_lab: processForm.complete_lab,
        specimen_drawn_by: processForm.specimen_drawn_by || null,
        specimen_drawn_date: fromLocalDateTimeInput(processForm.specimen_drawn_date),
        specimen_analyzed_date: fromLocalDateTimeInput(processForm.specimen_analyzed_date),
        generate_lab_number: processForm.generate_lab_number,
        lab_number: processForm.generate_lab_number ? '' : processForm.lab_number,
        results: resultsPayload,
      });

      setSuccess('Lab processing updated.');
      setActiveProcessRequestId(null);
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process labs.');
    } finally {
      setIsSubmittingProcess(false);
    }
  };

  const patientName = `${asText(patient?.first_name)} ${asText(patient?.last_name)}`.trim() || 'Unknown Patient';
  const patientIdForActions = asText(patient?.id) || asText(patientVisit?.patient_id);
  const latestRequest = requestLabs[0] || null;
  const activeProcessRequest = useMemo(
    () => processableRequests.find((item) => item.id === activeProcessRequestId) || null,
    [processableRequests, activeProcessRequestId],
  );
  const activeTypedResults = useMemo(() => {
    if (!activeProcessRequestId) return [];
    return labResults.filter(
      (row) =>
        String(row.request_lab_id || '') === activeProcessRequestId &&
        asText(row.type) &&
        asText(row.type).toLowerCase() !== 'bloodchemistry',
    );
  }, [labResults, activeProcessRequestId]);

  useEffect(() => {
    if (!activeProcessRequestId) return;
    setSelectedProcessTemplate('bloodchemistry');
    const next: Record<Exclude<ProcessTemplateType, 'bloodchemistry'>, JsonRecord> = {
      toxicology: deepClone(defaultTemplatePayloads.toxicology) as JsonRecord,
      molecular: deepClone(defaultTemplatePayloads.molecular) as JsonRecord,
      hematopathology: deepClone(defaultTemplatePayloads.hematopathology) as JsonRecord,
      biopsy: deepClone(defaultTemplatePayloads.biopsy) as JsonRecord,
      cytological: deepClone(defaultTemplatePayloads.cytological) as JsonRecord,
    };
    (Object.keys(next) as Array<Exclude<ProcessTemplateType, 'bloodchemistry'>>).forEach((templateType) => {
      const existing = activeTypedResults.find((row) => asText(row.type).toLowerCase() === templateType);
      const raw = existing?.normal_value || existing?.reference_value || '';
      if (!raw) return;
      let parsed: unknown = {};
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { notes: raw };
      }
      next[templateType] = mergeDeep(next[templateType], parsed) as JsonRecord;
    });
    setTemplatePayloads(next);
  }, [activeProcessRequestId, activeTypedResults]);

  const setTemplateValue = (
    templateType: Exclude<ProcessTemplateType, 'bloodchemistry'>,
    path: string,
    value: unknown,
  ) => {
    setTemplatePayloads((prev) => ({
      ...prev,
      [templateType]: setByPath(prev[templateType], path, value) as JsonRecord,
    }));
  };

  const getTemplateValue = (
    templateType: Exclude<ProcessTemplateType, 'bloodchemistry'>,
    path: string,
    fallback: unknown = '',
  ): unknown => getByPath(templatePayloads[templateType], path, fallback);

  const pushTemplateArrayItem = (
    templateType: Exclude<ProcessTemplateType, 'bloodchemistry'>,
    path: string,
    item: JsonRecord,
  ) => {
    const current = getTemplateValue(templateType, path, []);
    const arrayValue = Array.isArray(current) ? current : [];
    setTemplateValue(templateType, path, [...arrayValue, item]);
  };

  const removeTemplateArrayItem = (
    templateType: Exclude<ProcessTemplateType, 'bloodchemistry'>,
    path: string,
    index: number,
  ) => {
    const current = getTemplateValue(templateType, path, []);
    const arrayValue = Array.isArray(current) ? current : [];
    setTemplateValue(
      templateType,
      path,
      arrayValue.filter((_, idx) => idx !== index),
    );
  };

  const toggleTemplateArrayValue = (
    templateType: Exclude<ProcessTemplateType, 'bloodchemistry'>,
    path: string,
    value: string,
  ) => {
    const current = getTemplateValue(templateType, path, []);
    const arrayValue = Array.isArray(current) ? current.map((item) => String(item)) : [];
    const next = arrayValue.includes(value)
      ? arrayValue.filter((item) => item !== value)
      : [...arrayValue, value];
    setTemplateValue(templateType, path, next);
  };

  const submitTemplateProcess = async () => {
    if (!activeProcessRequest?.id || !patientVisit?.id) {
      setError('Request context is missing.');
      return;
    }
    setError(null);
    setSuccess(null);
    setIsSubmittingProcess(true);
    try {
      const templateType = selectedProcessTemplate as Exclude<ProcessTemplateType, 'bloodchemistry'>;
      const payload = templatePayloads[templateType] || {};
      await api.post('/legacy/request-labs/process-lab-template/', {
        request_lab_id: activeProcessRequest.id,
        patient_visit_id: patientVisit.id,
        template: selectedProcessTemplate,
        template_payload: payload,
        comment: requestComments[activeProcessRequest.id] || '',
      });
      setSuccess('Lab template saved.');
      setActiveProcessRequestId(null);
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process selected template.');
    } finally {
      setIsSubmittingProcess(false);
    }
  };

  const renderTemplateInput = (
    templateType: Exclude<ProcessTemplateType, 'bloodchemistry'>,
    path: string,
    label: string,
    inputType: 'text' | 'number' | 'date' | 'datetime-local' | 'textarea' = 'text',
  ) => {
    const commonClasses = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900';
    if (inputType === 'textarea') {
      return (
        <label className="block text-xs text-slate-600">
          {label}
          <textarea
            value={String(getTemplateValue(templateType, path, ''))}
            onChange={(event) => setTemplateValue(templateType, path, event.target.value)}
            rows={3}
            className={commonClasses}
          />
        </label>
      );
    }
    return (
      <label className="block text-xs text-slate-600">
        {label}
        <input
          type={inputType}
          value={String(getTemplateValue(templateType, path, ''))}
          onChange={(event) => setTemplateValue(templateType, path, event.target.value)}
          className={commonClasses}
        />
      </label>
    );
  };

  const renderTemplateSelect = (
    templateType: Exclude<ProcessTemplateType, 'bloodchemistry'>,
    path: string,
    label: string,
    options: Array<{ value: string; label: string }>,
  ) => (
    <label className="block text-xs text-slate-600">
      {label}
      <SearchableSelect
        value={String(getTemplateValue(templateType, path, ''))}
        onChange={(value) => setTemplateValue(templateType, path, value)}
        options={options}
        placeholder="Select..."
        className="mt-1"
      />
    </label>
  );

  const renderNonBloodTemplateForm = () => {
    if (selectedProcessTemplate === 'bloodchemistry') return null;
    if (selectedProcessTemplate === 'toxicology') {
      const tests = getTemplateValue('toxicology', 'tests', []) as Array<Record<string, string>>;
      return (
        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sample Information</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {renderTemplateSelect('toxicology', 'specimenInfo.typeOfSpecimen', 'Type of Specimen', [
                { value: 'Blood', label: 'Blood' },
                { value: 'Urine', label: 'Urine' },
                { value: 'Hair', label: 'Hair' },
                { value: 'Tissue', label: 'Tissue' },
                { value: 'Other', label: 'Other' },
              ])}
              {renderTemplateInput('toxicology', 'specimenInfo.specimenSource', 'Specimen Source')}
              {renderTemplateInput('toxicology', 'specimenInfo.numberOfSpecimens', 'Number of Specimens', 'number')}
              {renderTemplateInput('toxicology', 'specimenInfo.volumeCollected', 'Volume Collected', 'number')}
              {renderTemplateSelect('toxicology', 'specimenInfo.volumeUnit', 'Volume Unit', [
                { value: 'mL', label: 'mL' },
                { value: 'µL', label: 'µL' },
              ])}
              {renderTemplateInput('toxicology', 'specimenInfo.weight', 'Weight', 'number')}
              {renderTemplateSelect('toxicology', 'specimenInfo.weightUnit', 'Weight Unit', [
                { value: 'g', label: 'g' },
                { value: 'mg', label: 'mg' },
              ])}
              {renderTemplateSelect('toxicology', 'specimenInfo.sampleCondition', 'Sample Condition', [
                { value: 'Normal', label: 'Normal' },
                { value: 'Hemolyzed', label: 'Hemolyzed' },
                { value: 'Clotted', label: 'Clotted' },
                { value: 'Contaminated', label: 'Contaminated' },
              ])}
              {renderTemplateInput('toxicology', 'specimenInfo.colorConsistency', 'Color / Consistency', 'textarea')}
              {renderTemplateInput('toxicology', 'specimenInfo.tissueDescription', 'Tissue Description', 'textarea')}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tests Performed</p>
              <button
                type="button"
                onClick={() =>
                  pushTemplateArrayItem('toxicology', 'tests', {
                    analyte: '',
                    method: '',
                    cutoff: '',
                    result: 'Negative',
                    units: '',
                  })
                }
                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
              >
                Add Test
              </button>
            </div>
            <div className="space-y-3">
              {tests.map((_, index) => (
                <div key={`tox-test-${index}`} className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 md:grid-cols-6">
                  <input value={String(getTemplateValue('toxicology', `tests.${index}.analyte`, ''))} onChange={(event) => setTemplateValue('toxicology', `tests.${index}.analyte`, event.target.value)} placeholder="Analyte" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <input value={String(getTemplateValue('toxicology', `tests.${index}.method`, ''))} onChange={(event) => setTemplateValue('toxicology', `tests.${index}.method`, event.target.value)} placeholder="Method" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <input value={String(getTemplateValue('toxicology', `tests.${index}.cutoff`, ''))} onChange={(event) => setTemplateValue('toxicology', `tests.${index}.cutoff`, event.target.value)} placeholder="Cutoff" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <SearchableSelect
                    value={String(getTemplateValue('toxicology', `tests.${index}.result`, ''))}
                    onChange={(value) => setTemplateValue('toxicology', `tests.${index}.result`, value)}
                    options={[
                      { value: 'Positive', label: 'Positive' },
                      { value: 'Negative', label: 'Negative' },
                      { value: 'Within Normal Range', label: 'Within Normal Range' },
                      { value: 'Above Normal Range', label: 'Above Normal Range' },
                    ]}
                    className="min-w-[170px]"
                  />
                  <input value={String(getTemplateValue('toxicology', `tests.${index}.units`, ''))} onChange={(event) => setTemplateValue('toxicology', `tests.${index}.units`, event.target.value)} placeholder="Units" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <button type="button" onClick={() => removeTemplateArrayItem('toxicology', 'tests', index)} className="rounded border border-rose-300 bg-white px-2 py-1 text-xs text-rose-700">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {renderTemplateInput('toxicology', 'interpretation.detectedSubstances', 'Detected Substances', 'textarea')}
            {renderTemplateInput('toxicology', 'interpretation.clinicalEffects', 'Possible Clinical Effects', 'textarea')}
            {renderTemplateInput('toxicology', 'interpretation.therapeuticRange', 'Therapeutic Range')}
            {renderTemplateInput('toxicology', 'interpretation.toxicRange', 'Toxic Range')}
            {renderTemplateInput('toxicology', 'interpretation.lethalRange', 'Lethal Range')}
            {renderTemplateSelect('toxicology', 'qualityControl.labAccreditation', 'Lab Accreditation', [
              { value: 'ISO', label: 'ISO' },
              { value: 'CLIA', label: 'CLIA' },
              { value: 'CAP', label: 'CAP' },
            ])}
          </div>
        </div>
      );
    }

    if (selectedProcessTemplate === 'molecular') {
      const tests = getTemplateValue('molecular', 'tests', []) as Array<Record<string, unknown>>;
      return (
        <div className="mt-5 space-y-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Molecular Tests</p>
            <button
              type="button"
              onClick={() =>
                pushTemplateArrayItem('molecular', 'tests', {
                  testName: '',
                  methodology: '',
                  equipmentUsed: '',
                  results: {
                    geneTarget: '',
                    mutationDetected: '',
                    viralLoad: '',
                    coverageDepth: '',
                    qualityScore: '',
                    interpretation: '',
                  },
                })
              }
              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
            >
              Add Test
            </button>
          </div>
          {tests.map((_, index) => (
            <div key={`mole-test-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-700">Test #{index + 1}</p>
                <button type="button" onClick={() => removeTemplateArrayItem('molecular', 'tests', index)} className="rounded border border-rose-300 bg-white px-2 py-1 text-xs text-rose-700">Remove</button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {renderTemplateInput('molecular', `tests.${index}.testName`, 'Test Name')}
                {renderTemplateInput('molecular', `tests.${index}.methodology`, 'Methodology')}
                {renderTemplateInput('molecular', `tests.${index}.equipmentUsed`, 'Equipment Used')}
                {renderTemplateInput('molecular', `tests.${index}.results.geneTarget`, 'Gene / Target Name')}
                {renderTemplateSelect('molecular', `tests.${index}.results.mutationDetected`, 'Mutation / Variant', [
                  { value: 'positive', label: 'Positive' },
                  { value: 'negative', label: 'Negative' },
                ])}
                {renderTemplateInput('molecular', `tests.${index}.results.viralLoad`, 'Viral Load', 'number')}
                {renderTemplateInput('molecular', `tests.${index}.results.coverageDepth`, 'Coverage Depth', 'number')}
                {renderTemplateSelect('molecular', `tests.${index}.results.qualityScore`, 'Quality Score', [
                  { value: 'pass', label: 'PASS' },
                  { value: 'fail', label: 'FAIL' },
                ])}
                {renderTemplateInput('molecular', `tests.${index}.results.interpretation`, 'Interpretation', 'textarea')}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (selectedProcessTemplate === 'cytological') {
      const papOpts = ['abnormalities1', 'abnormalities2', 'abnormalities3', 'abnormalities4', 'abnormalities5', 'abnormalities6', 'abnormalities7'];
      const cellTypeOpts = ['cellType1', 'cellType2', 'cellType3', 'cellType4', 'cellType5', 'cellType6'];
      return (
        <div className="mt-5 space-y-4">
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-2">
            {renderTemplateInput('cytological', 'specimenInformation.accessionNumber', 'Accession Number')}
            {renderTemplateInput('cytological', 'specimenInformation.collectionDate', 'Collection Date', 'date')}
            {renderTemplateInput('cytological', 'specimenInformation.reportDate', 'Report Date', 'date')}
            {renderTemplateInput('cytological', 'specimenInformation.specimenType', 'Specimen Type')}
            {renderTemplateInput('cytological', 'specimenInformation.collectionSite', 'Collection Site')}
            {renderTemplateInput('cytological', 'specimenInformation.procedure', 'Procedure')}
            {renderTemplateInput('cytological', 'specimenInformation.clinicalIndication', 'Clinical Indication', 'textarea')}
            {renderTemplateInput('cytological', 'specimenInformation.fixative', 'Fixative')}
          </div>
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 md:grid-cols-2">
            {renderTemplateInput('cytological', 'microscopicFindings.adequacy', 'Adequacy')}
            {renderTemplateInput('cytological', 'microscopicFindings.cellularity', 'Cellularity')}
            {renderTemplateInput('cytological', 'microscopicFindings.background', 'Background')}
            {renderTemplateInput('cytological', 'microscopicFindings.cellMorphology', 'Cell Morphology')}
            {renderTemplateInput('cytological', 'microscopicFindings.cellularPattern', 'Cellular Pattern', 'textarea')}
            {renderTemplateInput('cytological', 'microscopicFindings.nuclearFeatures', 'Nuclear Features', 'textarea')}
            {renderTemplateInput('cytological', 'microscopicFindings.cytoplasmicFeatures', 'Cytoplasmic Features', 'textarea')}
            {renderTemplateInput('cytological', 'microscopicFindings.microorganisms', 'Microorganisms')}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Classifications</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {renderTemplateInput('cytological', 'specificClassifications.papSmear.bethesdaClassification', 'Bethesda Classification')}
              {renderTemplateInput('cytological', 'specificClassifications.fna.milanSystem', 'Milan System')}
              {renderTemplateInput('cytological', 'specificClassifications.fna.bethesdaThyroid', 'Bethesda Thyroid')}
              {renderTemplateInput('cytological', 'specificClassifications.fna.iacYokohama', 'IAC Yokohama')}
            </div>
            <div className="mt-3">
              <p className="mb-2 text-xs text-slate-600">Epithelial Abnormalities</p>
              <div className="flex flex-wrap gap-2">
                {papOpts.map((option) => (
                  <label key={option} className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={(getTemplateValue('cytological', 'specificClassifications.papSmear.epithelialAbnormalities', []) as string[]).includes(option)}
                      onChange={() => toggleTemplateArrayValue('cytological', 'specificClassifications.papSmear.epithelialAbnormalities', option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className="mb-2 text-xs text-slate-600">Body Fluid Cell Types</p>
              <div className="flex flex-wrap gap-2">
                {cellTypeOpts.map((option) => (
                  <label key={option} className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={(getTemplateValue('cytological', 'specificClassifications.bodyFluid.cellTypes', []) as string[]).includes(option)}
                      onChange={() => toggleTemplateArrayValue('cytological', 'specificClassifications.bodyFluid.cellTypes', option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {renderTemplateInput('cytological', 'diagnosisAndInterpretation.primaryDiagnosis', 'Primary Diagnosis', 'textarea')}
            {renderTemplateInput('cytological', 'diagnosisAndInterpretation.additionalFindings', 'Additional Findings', 'textarea')}
            {renderTemplateInput('cytological', 'diagnosisAndInterpretation.differentialDiagnosis', 'Differential Diagnosis', 'textarea')}
            {renderTemplateInput('cytological', 'recommendations.followUp', 'Follow-up Recommendation', 'textarea')}
          </div>
        </div>
      );
    }

    if (selectedProcessTemplate === 'biopsy') {
      const specialStains = ['specialStain1', 'specialStain2', 'specialStain3', 'specialStain4'];
      const ihcPanel = ['ihc1', 'ihc2', 'ihc3', 'ihc4', 'ihc5', 'ihc6'];
      const ihcMarkers = getTemplateValue('biopsy', 'specialStainsAndIHC.ihcMarkers', []) as Array<Record<string, string>>;
      return (
        <div className="mt-5 space-y-4">
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-2">
            {renderTemplateInput('biopsy', 'specimenInformation.accessionNumber', 'Accession Number')}
            {renderTemplateInput('biopsy', 'specimenInformation.collectionDate', 'Collection Date', 'date')}
            {renderTemplateInput('biopsy', 'specimenInformation.reportDate', 'Report Date', 'date')}
            {renderTemplateInput('biopsy', 'specimenInformation.specimenType', 'Specimen Type')}
            {renderTemplateInput('biopsy', 'specimenInformation.biopsySite', 'Biopsy Site')}
            {renderTemplateInput('biopsy', 'specimenInformation.procedure', 'Procedure')}
            {renderTemplateInput('biopsy', 'specimenInformation.clinicalIndication', 'Clinical Indication', 'textarea')}
            {renderTemplateInput('biopsy', 'specimenInformation.fixative', 'Fixative')}
          </div>
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 md:grid-cols-2">
            {renderTemplateInput('biopsy', 'grossingWorkflow.specimenReceived', 'Specimen Received', 'textarea')}
            {renderTemplateInput('biopsy', 'grossingWorkflow.specimenDescription', 'Specimen Description', 'textarea')}
            {renderTemplateInput('biopsy', 'grossingWorkflow.specimenDimensions', 'Specimen Dimensions')}
            {renderTemplateInput('biopsy', 'grossingWorkflow.specimenWeight', 'Specimen Weight')}
            {renderTemplateInput('biopsy', 'grossingWorkflow.colorConsistency', 'Color / Consistency')}
            {renderTemplateInput('biopsy', 'grossingWorkflow.cassetteSummary', 'Cassette Summary', 'textarea')}
            {renderTemplateInput('biopsy', 'grossingWorkflow.grossImpression', 'Gross Impression', 'textarea')}
            {renderTemplateInput('biopsy', 'microtomyAndStaining.routineStain', 'Routine Stain')}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stains & Panels</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs text-slate-600">Special Stains</p>
                <div className="flex flex-wrap gap-2">
                  {specialStains.map((option) => (
                    <label key={option} className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs">
                      <input
                        type="checkbox"
                        checked={(getTemplateValue('biopsy', 'microtomyAndStaining.specialStains', []) as string[]).includes(option)}
                        onChange={() => toggleTemplateArrayValue('biopsy', 'microtomyAndStaining.specialStains', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-slate-600">IHC Panel</p>
                <div className="flex flex-wrap gap-2">
                  {ihcPanel.map((option) => (
                    <label key={option} className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs">
                      <input
                        type="checkbox"
                        checked={(getTemplateValue('biopsy', 'microtomyAndStaining.ihcPanel', []) as string[]).includes(option)}
                        onChange={() => toggleTemplateArrayValue('biopsy', 'microtomyAndStaining.ihcPanel', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-slate-600">IHC Markers & Results</p>
                <button
                  type="button"
                  onClick={() => pushTemplateArrayItem('biopsy', 'specialStainsAndIHC.ihcMarkers', { marker: '', result: '' })}
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                >
                  Add Marker
                </button>
              </div>
              <div className="space-y-2">
                {ihcMarkers.map((_, index) => (
                  <div key={`ihc-marker-${index}`} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                    <input value={String(getTemplateValue('biopsy', `specialStainsAndIHC.ihcMarkers.${index}.marker`, ''))} onChange={(event) => setTemplateValue('biopsy', `specialStainsAndIHC.ihcMarkers.${index}.marker`, event.target.value)} placeholder="Marker" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                    <input value={String(getTemplateValue('biopsy', `specialStainsAndIHC.ihcMarkers.${index}.result`, ''))} onChange={(event) => setTemplateValue('biopsy', `specialStainsAndIHC.ihcMarkers.${index}.result`, event.target.value)} placeholder="Result" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                    <button type="button" onClick={() => removeTemplateArrayItem('biopsy', 'specialStainsAndIHC.ihcMarkers', index)} className="rounded border border-rose-300 bg-white px-2 py-1 text-xs text-rose-700">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {renderTemplateInput('biopsy', 'microscopicExamination.histologicalFindings', 'Histological Findings', 'textarea')}
            {renderTemplateInput('biopsy', 'microscopicExamination.histologicType', 'Histologic Type')}
            {renderTemplateInput('biopsy', 'microscopicExamination.tumorGrade', 'Tumor Grade')}
            {renderTemplateInput('biopsy', 'pathologicStaging.tStage', 'T Stage')}
            {renderTemplateInput('biopsy', 'pathologicStaging.nStage', 'N Stage')}
            {renderTemplateInput('biopsy', 'pathologicStaging.mStage', 'M Stage')}
            {renderTemplateInput('biopsy', 'pathologicStaging.overallStage', 'Overall Stage')}
            {renderTemplateInput('biopsy', 'diagnosisAndSummary.primaryDiagnosis', 'Primary Diagnosis', 'textarea')}
          </div>
        </div>
      );
    }

    const hemaCheckboxes = [
      { path: 'specimenInformation.specimenType', label: 'Specimen Type', values: ['peripheral_blood', 'aspirate', 'biopsy'] },
      { path: 'specimenInformation.specimensCollected', label: 'Specimens Collected', values: ['pb', 'bma', 'bmb', 'touch_prep'] },
      { path: 'peripheralBloodExam.bloodSmearMorphology.rbcMorphology', label: 'RBC Morphology', values: ['anisocytosis', 'poikilocytosis', 'target_cells', 'tear_drop_cells'] },
      { path: 'peripheralBloodExam.bloodSmearMorphology.wbcMorphology', label: 'WBC Morphology', values: ['toxic_granulation', 'dohle_bodies', 'left_shift'] },
      { path: 'peripheralBloodExam.bloodSmearMorphology.plateletMorphology', label: 'Platelet Morphology', values: ['giant_platelets', 'hypogranular', 'clumping'] },
      { path: 'boneMarrowAspirateExam.cytochemicalStains', label: 'Cytochemical Stains', values: ['mpo', 'pas', 'sudan_black', 'esterase'] },
    ];
    return (
      <div className="mt-5 space-y-4">
        <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-2">
          {renderTemplateInput('hematopathology', 'specimenInformation.accessionNumber', 'Accession Number')}
          {renderTemplateInput('hematopathology', 'specimenInformation.collectionDateTime', 'Collection Date Time', 'datetime-local')}
          {renderTemplateInput('hematopathology', 'specimenInformation.reportDate', 'Report Date', 'date')}
          {renderTemplateInput('hematopathology', 'specimenInformation.collectionSite', 'Collection Site')}
          {renderTemplateInput('hematopathology', 'specimenInformation.fixativeAnticoagulant', 'Fixative / Anticoagulant')}
          {renderTemplateInput('hematopathology', 'specimenInformation.collectionPerformedBy', 'Collection Performed By')}
          {renderTemplateInput('hematopathology', 'specimenInformation.collectionQuality', 'Collection Quality')}
        </div>
        <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 md:grid-cols-3">
          {renderTemplateInput('hematopathology', 'peripheralBloodExam.cbcResults.wbcCount', 'WBC Count')}
          {renderTemplateInput('hematopathology', 'peripheralBloodExam.cbcResults.rbcCount', 'RBC Count')}
          {renderTemplateInput('hematopathology', 'peripheralBloodExam.cbcResults.hemoglobin', 'Hemoglobin')}
          {renderTemplateInput('hematopathology', 'peripheralBloodExam.cbcResults.hematocrit', 'Hematocrit')}
          {renderTemplateInput('hematopathology', 'peripheralBloodExam.cbcResults.plateletCount', 'Platelet Count')}
          {renderTemplateInput('hematopathology', 'peripheralBloodExam.differentialCount.blastsPercent', 'Blasts %')}
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Morphology & Stains</p>
          <div className="space-y-3">
            {hemaCheckboxes.map((group) => (
              <div key={group.path}>
                <p className="mb-1 text-xs text-slate-600">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.values.map((option) => (
                    <label key={`${group.path}-${option}`} className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs">
                      <input
                        type="checkbox"
                        checked={(getTemplateValue('hematopathology', group.path, []) as string[]).includes(option)}
                        onChange={() => toggleTemplateArrayValue('hematopathology', group.path, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {renderTemplateInput('hematopathology', 'diagnosisClassification.hematologicDiagnosis', 'Hematologic Diagnosis', 'textarea')}
          {renderTemplateInput('hematopathology', 'diagnosisClassification.whoClassification', 'WHO Classification')}
          {renderTemplateInput('hematopathology', 'diagnosisClassification.whoSubclassification', 'WHO Subclassification')}
          {renderTemplateInput('hematopathology', 'diagnosisClassification.riskStratification', 'Risk Stratification')}
          {renderTemplateInput('hematopathology', 'diagnosisClassification.diseaseStatus', 'Disease Status')}
          {renderTemplateInput('hematopathology', 'diagnosisClassification.mrdStatus', 'MRD Status')}
          {renderTemplateInput('hematopathology', 'diagnosisClassification.mrdPercentage', 'MRD Percentage')}
          {renderTemplateInput('hematopathology', 'interpretationCorrelation.summaryFindings', 'Summary of Findings', 'textarea')}
          {renderTemplateInput('hematopathology', 'interpretationCorrelation.comments', 'Comments', 'textarea')}
          {renderTemplateInput('hematopathology', 'recommendations.additionalStudies', 'Recommended Additional Studies', 'textarea')}
          {renderTemplateInput('hematopathology', 'recommendations.followUp', 'Recommended Follow-up', 'textarea')}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 lg:sticky lg:top-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Patient Information</p>
          <p className="mt-2 font-semibold text-slate-900">{patientName}</p>
          <p className="mt-1 text-xs text-slate-600">
            MRN / Code: {asText(patient?.folder_number) || 'N/A'} / {asText(patient?.code) || 'N/A'}
          </p>
          <p className="mt-1 text-xs text-slate-600">Contact: {asText(patient?.phone) || 'N/A'}</p>
          <p className="mt-1 text-xs text-slate-600">Email: {asText(patient?.email) || 'N/A'}</p>
          <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</p>
            {patientIdForActions ? (
              <Link
                to={`/Patients/view_patient?patient_id=${encodeURIComponent(patientIdForActions)}`}
                className="block rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Patient
              </Link>
            ) : (
              <span className="block cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-400">
                View Patient
              </span>
            )}
            {patientIdForActions ? (
              <Link
                to={`/Patients/patient_bill?patient_id=${encodeURIComponent(patientIdForActions)}&visit_id=${encodeURIComponent(visitId)}`}
                className="block rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Patient Bill
              </Link>
            ) : (
              <span className="block cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-400">
                Patient Bill
              </span>
            )}
            {patientIdForActions ? (
              <Link
                to={`/Patients/view_patient?patient_id=${encodeURIComponent(patientIdForActions)}&tab=sponsors`}
                className="block rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Manage Insurance
              </Link>
            ) : (
              <span className="block cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-400">
                Manage Insurance
              </span>
            )}
          </div>
        </aside>

        <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Request Labs</p>
            <h1 className="text-2xl font-semibold text-slate-900">View Request</h1>
            <p className="mt-1 text-sm text-slate-600">Visit ID: {visitId || 'N/A'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {visitId ? (
              <>
                <a
                  href={`/RequestLabs/patient_visit_report?visit_id=${encodeURIComponent(visitId)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  Download Report
                </a>
                <a
                  href={`/RequestLabs/email_patient_visit_report?visit_id=${encodeURIComponent(visitId)}&send_email=1`}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  Email Report
                </a>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setActiveModal('walkin')} className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white">
            Walk-in Lab
          </button>
          <button type="button" onClick={() => setActiveModal('history')} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
            Lab History
          </button>
          <button type="button" onClick={() => setActiveModal('clinical')} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
            Clinical Information
          </button>
          <button type="button" onClick={() => setActiveModal('samples')} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
            Samples
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900">Requested Labs</h2>
          <button
            type="button"
            onClick={() => loadView()}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Requested</th>
                <th className="px-3 py-2">Lab Test</th>
                <th className="px-3 py-2">Ordered By</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-slate-500">Loading requests...</td>
                </tr>
              ) : requestLabs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-slate-500">No lab requests found for this visit.</td>
                </tr>
              ) : (
                requestLabs.map((requestLab) => {
                  const test = labTestById.get(String(requestLab.lab_test_id || ''));
                  const user = userById.get(String(requestLab.user_id || ''));
                  const status = statusById.get(String(requestLab.status_id || ''));
                  const specimenIds = specimenTypeIdsByLabTestId.get(String(requestLab.lab_test_id || '')) || [];
                  return (
                    <tr key={requestLab.id} className="border-b border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(requestLab.date_created)}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(test?.name) || requestLab.lab_test_id || 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-700">
                        {asText(user?.first_name)} {asText(user?.last_name)}
                      </td>
                      <td className="px-3 py-2 text-slate-700">GH₵ {asNumber(test?.value_new).toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClass(requestLab.status_id)}`}>
                          {idLabel(status) || `Status ${asText(requestLab.status_id) || 'N/A'}`}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {specimenIds.map((specimenId) => {
                            const specimen = specimenTypeById.get(specimenId);
                            return (
                              <span key={`${requestLab.id}-${specimenId}`} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                                {idLabel(specimen) || specimenId}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveProcessRequestId(requestLab.id)}
                            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
                          >
                            Process Lab
                          </button>
                          {String(requestLab.status_id || '') === '22' ? (
                            <button
                              type="button"
                              onClick={() => openCompleteBomModal(requestLab.id)}
                              className="rounded-lg border border-emerald-300 bg-white px-2 py-1 text-xs font-semibold text-emerald-700"
                            >
                              Complete Request
                            </button>
                          ) : null}
                          {String(requestLab.status_id || '') === '22' || String(requestLab.status_id || '') === '23' ? (
                            <a
                              href={`/RequestLabs/patient_visit_report?visit_id=${encodeURIComponent(visitId)}&request_lab_id=${encodeURIComponent(requestLab.id)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
                            >
                              PDF Report
                            </a>
                          ) : null}
                          {String(requestLab.status_id || '') === '20' ? (
                            <button
                              type="button"
                              onClick={() => cancelRequest(requestLab.id)}
                              className="rounded-lg border border-rose-300 bg-white px-2 py-1 text-xs font-semibold text-rose-700"
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {activeModal === 'walkin' ? (
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
      <section className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Laboratory Test Request</h2>
          <button type="button" onClick={() => setActiveModal(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700">Close</button>
        </div>
        <form className="mt-4 grid gap-6 lg:grid-cols-2" onSubmit={submitAddRequests}>
          <div className="space-y-4">
            <label className="block text-xs text-slate-600">
              Reason for Test / Symptoms
              <textarea
                value={addRequestForm.lab_test_reasons}
                onChange={(event) => setAddRequestForm((prev) => ({ ...prev, lab_test_reasons: event.target.value }))}
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs text-slate-600">
              Current Medications
              <textarea
                value={addRequestForm.current_medications}
                onChange={(event) => setAddRequestForm((prev) => ({ ...prev, current_medications: event.target.value }))}
                rows={2}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs text-slate-600">
              Known Allergies
              <textarea
                value={addRequestForm.known_allergies}
                onChange={(event) => setAddRequestForm((prev) => ({ ...prev, known_allergies: event.target.value }))}
                rows={2}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs text-slate-600">
                Requested By
                <SearchableSelect
                  value={addRequestForm.source}
                  onChange={(value) => setAddRequestForm((prev) => ({ ...prev, source: value }))}
                  options={[
                    { value: 'Patient', label: 'Patient' },
                    { value: 'Referring Physician', label: 'Referring Physician' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  className="mt-2"
                />
              </label>
              <label className="text-xs text-slate-600">
                Priority
                <SearchableSelect
                  value={addRequestForm.priority_id}
                  onChange={(value) => setAddRequestForm((prev) => ({ ...prev, priority_id: value }))}
                  options={priorities.map((priority) => ({
                    value: String(priority.id),
                    label: idLabel(priority),
                  }))}
                  className="mt-2"
                />
              </label>
            </div>

            {['Other', 'Referring Physician'].includes(addRequestForm.source) ? (
              <label className="block text-xs text-slate-600">
                Specify Source
                <input
                  value={addRequestForm.source_other}
                  onChange={(event) => setAddRequestForm((prev) => ({ ...prev, source_other: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
            ) : null}

            <label className="block text-xs text-slate-600">
              Search Lab Tests
              <input
                value={labSearch}
                onChange={(event) => setLabSearch(event.target.value)}
                placeholder="Type at least 2 characters"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
            {labSearch.trim().length >= 2 && isSearchingLabTests ? (
              <p className="text-xs text-slate-500">Searching lab tests...</p>
            ) : null}

            <div className="max-h-56 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
              {displayedLabTests.map((test) => {
                const active = selectedLabTestIds.includes(test.id);
                const specimenIds = specimenTypeIdsByLabTestId.get(String(test.id)) || [];
                return (
                  <button
                    key={test.id}
                    type="button"
                    onClick={() => toggleLabSelection(test.id, test)}
                    className={`mb-1 w-full rounded-lg border px-3 py-2 text-left ${
                      active ? 'border-sky-300 bg-sky-50' : 'border-transparent bg-white hover:border-slate-200'
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-900">{asText(test.name) || test.id}</p>
                    <p className="text-xs text-slate-600">GH₵ {asNumber(test.value_new).toFixed(2)} • TAT: {asText(test.turn_around_time) || 'N/A'}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {specimenIds.map((specimenId) => (
                        <span key={`${test.id}-${specimenId}`} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                          {idLabel(specimenTypeById.get(specimenId)) || specimenId}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
              {labSearch.trim().length >= 2 && !isSearchingLabTests && displayedLabTests.length === 0 ? (
                <p className="px-2 py-3 text-xs text-slate-500">No matching lab tests found.</p>
              ) : null}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Selected Tests: {selectedLabTests.length}</p>
              <p className="mt-1">Total Price: GH₵ {selectedLabTotal.toFixed(2)}</p>
              <p className="text-xs text-slate-500">Billing policy handling remains compatible with visit invoicing flow.</p>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => {
                  setAddRequestForm(initialAddRequestForm);
                  setSelectedLabTestIds([]);
                  setLabSearch('');
                }}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmittingAdd}
                className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingAdd ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </form>
      </section>
      </div>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-base font-semibold text-slate-900">Complete Lab - Enter Results</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use <span className="font-semibold">Process Lab</span> on each request row to open the template-specific result modal.
        </p>
      </section>

      {activeProcessRequest ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                Process Lab: {asText(labTestById.get(String(activeProcessRequest.lab_test_id || ''))?.name) || activeProcessRequest.lab_test_id || 'Unknown Test'}
              </h3>
              <button type="button" onClick={() => setActiveProcessRequestId(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700">Close</button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <label className="text-xs text-slate-600">
                Drawn By
                <SearchableSelect
                  value={processForm.specimen_drawn_by}
                  onChange={(value) => setProcessForm((prev) => ({ ...prev, specimen_drawn_by: value }))}
                  options={users.map((user) => ({
                    value: String(user.id),
                    label: `${asText(user.first_name)} ${asText(user.last_name)}`.trim() || asText(user.username) || String(user.id),
                  }))}
                  placeholder="Select..."
                  className="mt-2"
                />
              </label>

              <label className="text-xs text-slate-600">
                Date Drawn
                <input
                  type="datetime-local"
                  value={processForm.specimen_drawn_date}
                  onChange={(event) => setProcessForm((prev) => ({ ...prev, specimen_drawn_date: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>

              <label className="text-xs text-slate-600">
                Date Analysed
                <input
                  type="datetime-local"
                  value={processForm.specimen_analyzed_date}
                  onChange={(event) => setProcessForm((prev) => ({ ...prev, specimen_analyzed_date: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>

              <label className="flex items-center gap-2 pt-7 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={processForm.complete_lab}
                  onChange={(event) => setProcessForm((prev) => ({ ...prev, complete_lab: event.target.checked }))}
                />
                Complete Lab
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={processForm.generate_lab_number}
                  onChange={(event) => setProcessForm((prev) => ({ ...prev, generate_lab_number: event.target.checked }))}
                />
                Generate Lab Number Automatically
              </label>
              {!processForm.generate_lab_number ? (
                <label className="mt-3 block text-xs text-slate-600">
                  Lab Number
                  <input
                    value={processForm.lab_number}
                    onChange={(event) => setProcessForm((prev) => ({ ...prev, lab_number: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  />
                </label>
              ) : null}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Select Lab Templates</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {processTemplateTypes.map((templateType) => (
                  <button
                    key={templateType}
                    type="button"
                    onClick={() => setSelectedProcessTemplate(templateType)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                      selectedProcessTemplate === templateType
                        ? 'bg-sky-600 text-white'
                        : 'border border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    {templateType === 'bloodchemistry' ? 'Blood Chemistry' : templateType.charAt(0).toUpperCase() + templateType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {activeTypedResults.length > 0 ? (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Existing Template Reports</p>
                <div className="mt-2 space-y-2">
                  {activeTypedResults.map((row) => (
                    <div key={row.id} className="rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
                      <span className="font-semibold">{asText(row.type) || 'Template'}</span> • Result ID: {row.id}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {selectedProcessTemplate !== 'bloodchemistry' ? renderNonBloodTemplateForm() : null}

            {selectedProcessTemplate === 'bloodchemistry' ? (
            <div className="mt-5 space-y-3">
              {(() => {
                const templateList = templatesByLabTestId.get(String(activeProcessRequest.lab_test_id || '')) || [];
                const effectiveTemplates: Array<LabTemplate | null> = templateList.length > 0 ? templateList : [null];
                return effectiveTemplates.map((template) => {
                  const templateId = template ? String(template.id || '') : null;
                  const key = toKey(activeProcessRequest.id, templateId);
                  const value = resultEditor[key];
                  if (!value) return null;
                  const inputType = asText(template?.input_type || value.input_type || 'Text');
                  const options = templateId ? optionsByTemplateId.get(templateId) || [] : [];
                  const minValue = template?.min_value;
                  const maxValue = template?.max_value;
                  return (
                    <div key={key} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {asText(template?.label_name) || value.label_name || 'Result'}
                      </p>
                      <div className="mt-2 grid gap-3 md:grid-cols-5">
                        <div className="md:col-span-2">
                          {inputType === 'Select' ? (
                            <SearchableSelect
                              value={value.normal_value}
                              onChange={(next) => {
                                setResultEditor((prev) => ({ ...prev, [key]: { ...prev[key], normal_value: next } }));
                              }}
                              options={options.map((option) => ({ value: asText(option.name), label: asText(option.name) }))}
                              placeholder="Select..."
                            />
                          ) : inputType === 'TextArea' ? (
                            <textarea
                              value={value.normal_value}
                              onChange={(event) => {
                                const next = event.target.value;
                                setResultEditor((prev) => ({ ...prev, [key]: { ...prev[key], normal_value: next } }));
                              }}
                              rows={2}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                            />
                          ) : (
                            <input
                              type={inputType === 'Number' ? 'number' : 'text'}
                              value={value.normal_value}
                              min={inputType === 'Number' && minValue !== null && minValue !== undefined ? Number(minValue) : undefined}
                              max={inputType === 'Number' && maxValue !== null && maxValue !== undefined ? Number(maxValue) : undefined}
                              step={inputType === 'Number' ? '0.0000001' : undefined}
                              onChange={(event) => {
                                const next = event.target.value;
                                setResultEditor((prev) => ({ ...prev, [key]: { ...prev[key], normal_value: next } }));
                              }}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                            />
                          )}
                        </div>

                        <input
                          value={value.reference_value}
                          onChange={(event) => {
                            const next = event.target.value;
                            setResultEditor((prev) => ({ ...prev, [key]: { ...prev[key], reference_value: next } }));
                          }}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                          placeholder="Reference"
                        />

                        <input
                          value={value.unit_of_measurement}
                          onChange={(event) => {
                            const next = event.target.value;
                            setResultEditor((prev) => ({ ...prev, [key]: { ...prev[key], unit_of_measurement: next } }));
                          }}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                          placeholder="Unit"
                        />

                        <SearchableSelect
                          value={value.result_flag_id}
                          onChange={(next) => {
                            setResultEditor((prev) => ({ ...prev, [key]: { ...prev[key], result_flag_id: next } }));
                          }}
                          options={resultFlags.map((flag) => ({ value: String(flag.id), label: idLabel(flag) }))}
                          placeholder="Flag..."
                        />
                      </div>
                    </div>
                  );
                });
              })()}

            </div>
            ) : null}

            <label className="mt-4 block text-xs text-slate-600">
              Comment
              <input
                value={requestComments[activeProcessRequest.id] || ''}
                onChange={(event) => {
                  const next = event.target.value;
                  setRequestComments((prev) => ({ ...prev, [activeProcessRequest.id]: next }));
                }}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => setActiveProcessRequestId(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => (
                  selectedProcessTemplate === 'bloodchemistry'
                    ? submitProcessLabs([activeProcessRequest.id])
                    : submitTemplateProcess()
                )}
                disabled={isSubmittingProcess}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingProcess ? 'Saving...' : 'Submit'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {activeBomRequestId ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {(asText(bomDetails?.test?.name) || 'Lab Test')} Bill Of Materials
              </h3>
              <button
                type="button"
                onClick={() => {
                  setActiveBomRequestId(null);
                  setBomDetails(null);
                  setBomQuantities({});
                }}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>

            <p className="mb-4 text-sm text-slate-600">
              Assign the appropriate quantities for reagents used to perform {asText(bomDetails?.test?.name) || 'this lab test'}.
            </p>

            {isLoadingBom ? (
              <p className="text-sm text-slate-500">Loading bill of materials...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Reagent</th>
                      <th className="px-3 py-2">Percentage Used</th>
                      <th className="px-3 py-2">Base Quantity</th>
                      <th className="px-3 py-2">Auto Quantity Used</th>
                      <th className="px-3 py-2">Actual Quantity Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(bomDetails?.reagents || []).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-3 py-4 text-slate-500">
                          No reagent mappings found for this lab test. You can still complete the request.
                        </td>
                      </tr>
                    ) : (
                      (bomDetails?.reagents || []).map((row) => (
                        <tr key={`bom-${row.item_id}`} className="border-b border-slate-100">
                          <td className="px-3 py-2 text-slate-900">{row.name}</td>
                          <td className="px-3 py-2 text-slate-700">{row.percentage_used}%</td>
                          <td className="px-3 py-2 text-slate-700">{row.base_quantity}</td>
                          <td className="px-3 py-2 text-slate-700">{row.auto_quantity_used}</td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={bomQuantities[row.item_id] ?? String(row.actual_quantity_used_default ?? 0)}
                              onChange={(event) =>
                                setBomQuantities((prev) => ({
                                  ...prev,
                                  [row.item_id]: event.target.value,
                                }))
                              }
                              className="w-36 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => {
                  setActiveBomRequestId(null);
                  setBomDetails(null);
                  setBomQuantities({});
                }}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => completeRequestWithBom()}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Complete Lab Request
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {activeModal === 'history' ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Lab History</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700">Close</button>
            </div>
            <div className="max-h-[70vh] overflow-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Requested</th>
                    <th className="px-3 py-2">Lab Test</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requestLabs.map((requestLab) => {
                    const test = labTestById.get(String(requestLab.lab_test_id || ''));
                    const status = statusById.get(String(requestLab.status_id || ''));
                    return (
                      <tr key={`history-${requestLab.id}`} className="border-b border-slate-100">
                        <td className="px-3 py-2">{formatDateTime(requestLab.date_created)}</td>
                        <td className="px-3 py-2">{asText(test?.name) || requestLab.lab_test_id || 'N/A'}</td>
                        <td className="px-3 py-2">{idLabel(status) || requestLab.status_id || 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : null}

      {activeModal === 'clinical' ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Clinical Information</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700">Close</button>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Latest Request Source</p>
                <p className="mt-1">{asText(latestRequest?.source) || 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Reason / Description</p>
                <p className="mt-1 whitespace-pre-wrap">{asText(latestRequest?.description) || 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Allergies / Comment</p>
                <p className="mt-1 whitespace-pre-wrap">{asText(latestRequest?.comment) || 'N/A'}</p>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeModal === 'samples' ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Samples</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700">Close</button>
            </div>
            <div className="space-y-3">
              {requestLabs.map((requestLab) => {
                const test = labTestById.get(String(requestLab.lab_test_id || ''));
                const specimenIds = specimenTypeIdsByLabTestId.get(String(requestLab.lab_test_id || '')) || [];
                return (
                  <div key={`sample-${requestLab.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-900">{asText(test?.name) || requestLab.lab_test_id || 'N/A'}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {specimenIds.length > 0 ? specimenIds.map((id) => (
                        <span key={`${requestLab.id}-${id}`} className="rounded bg-white px-2 py-1 text-xs text-slate-700">
                          {idLabel(specimenTypeById.get(id)) || id}
                        </span>
                      )) : <span className="text-xs text-slate-500">No specimen mapping</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
        </div>
      </div>
    </div>
  );
}
