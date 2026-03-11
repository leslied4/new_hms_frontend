import { useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import InsurancePolicyPicker, { InsurancePolicyOption } from '../../components/InsurancePolicyPicker';

type PatientRecord = Record<string, unknown>;
type GenericRecord = Record<string, unknown>;
type InvoiceSummaryRow = {
  id: string;
  patient_visit_id?: string | null;
  final_amount?: string | number | null;
  amount_paid?: string | number | null;
  status_id?: string | null;
  date_added?: string | null;
};
type Option = InsurancePolicyOption & { id: string; name?: string | null };
type InsuranceProfileOption = {
  id: string;
  name?: string | null;
  insurance_profile_type_id?: string | null;
};
type InsuranceProfileTypeOption = {
  id: string;
  name?: string | null;
};

type DetailedPatientResponse = {
  patient?: PatientRecord;
  patient_image?: GenericRecord | null;
  labels?: Record<string, string | null | undefined>;
  insurances?: GenericRecord[];
  visits?: GenericRecord[];
  routine_care?: GenericRecord[];
  documents?: GenericRecord[];
  credit?: GenericRecord | null;
  history?: Record<string, GenericRecord[]>;
  national_identifications?: GenericRecord[];
};

type SponsorForm = {
  insurance_profile_policy_id: string;
  insurance_card_name: string;
  insurance_number: string;
  insurance_card_serial: string;
  scheme_number: string;
  copay: boolean;
  state: string;
  date_of_issue: string;
  date_of_renewal: string;
  guarantor_name: string;
  guarantor_contact: string;
  guarantor_address: string;
  guarantor_relation: string;
};

type TabKey =
  | 'biometrics'
  | 'sponsors'
  | 'care_flow'
  | 'medical_history'
  | 'medication_history'
  | 'routine_care'
  | 'documents';

type DocumentFormState = {
  name: string;
  description: string;
  document_type: string;
  file_path: string;
};

const TAB_KEYS: TabKey[] = [
  'biometrics',
  'sponsors',
  'care_flow',
  'medical_history',
  'medication_history',
  'routine_care',
  'documents',
];

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'biometrics', label: 'Biometrics' },
  { key: 'sponsors', label: 'Sponsors' },
  { key: 'care_flow', label: 'Care Flow' },
  { key: 'medical_history', label: 'Medical History' },
  { key: 'medication_history', label: 'Medication History' },
  { key: 'routine_care', label: 'Routine Care' },
  { key: 'documents', label: 'Documents' },
];

const initialSponsorForm: SponsorForm = {
  insurance_profile_policy_id: '',
  insurance_card_name: '',
  insurance_number: '',
  insurance_card_serial: '',
  scheme_number: '',
  copay: false,
  state: '1',
  date_of_issue: '',
  date_of_renewal: '',
  guarantor_name: '',
  guarantor_contact: '',
  guarantor_address: '',
  guarantor_relation: '',
};

const initialDocumentForm: DocumentFormState = {
  name: '',
  description: '',
  document_type: 'visit_reports',
  file_path: '',
};

const SICKLING_LABELS: Record<string, string> = {
  '4': 'POSITIVE',
  '5': 'NEGATIVE',
  '11': 'NOT DONE',
};

const normalizeCategory = (value: unknown): string =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const hasCategoryAlias = (row: GenericRecord, aliases: string[]): boolean => {
  const normalizedAliases = aliases.map((item) => normalizeCategory(item));
  const candidates = [
    normalizeCategory(row.document_type),
    normalizeCategory(row.file_type),
  ].filter(Boolean);
  return candidates.some((candidate) => normalizedAliases.includes(candidate));
};

const DOCUMENT_SECTIONS: Array<{ key: string; label: string; match: (row: GenericRecord) => boolean }> = [
  {
    key: 'visit_reports',
    label: 'Visit Reports',
    match: (row) => hasCategoryAlias(row, ['visit_reports', 'visit report', 'visit_reports_files', 'visits']),
  },
  {
    key: 'lab_reports',
    label: 'Lab Reports',
    match: (row) => hasCategoryAlias(row, ['lab_reports', 'lab report', 'labs', 'laboratory_reports']),
  },
  {
    key: 'paid_invoices',
    label: 'Paid Invoices',
    match: (row) => hasCategoryAlias(row, ['paid_invoices', 'paid invoice', 'invoice_paid', 'invoices_paid']),
  },
  {
    key: 'outstanding_invoices',
    label: 'Outstanding Invoices',
    match: (row) => hasCategoryAlias(row, ['outstanding_invoices', 'outstanding invoice', 'pending_invoices', 'unpaid_invoices']),
  },
  {
    key: 'scans',
    label: 'Scans',
    match: (row) => hasCategoryAlias(row, ['scans', 'scan', 'radiology_scans', 'scan_reports']),
  },
  {
    key: 'other_documents',
    label: 'Other Documents',
    match: (row) => hasCategoryAlias(row, ['other_documents', 'other document', 'others', 'misc']),
  },
];

const asString = (value: unknown, fallback = 'N/A'): string => {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text || fallback;
};

const BACKEND_ORIGIN = String(import.meta.env.VITE_BACKEND_ORIGIN || window.location.origin).replace(/\/$/, '');

const formatDate = (value: unknown): string => {
  if (!value) return 'N/A';
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return asString(value);
  }
  return date.toLocaleString();
};

const formatDateOnly = (value: unknown): string => {
  if (!value) return 'N/A';
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    const raw = String(value).trim();
    return raw ? raw.split('T')[0] : 'N/A';
  }
  return date.toLocaleDateString();
};

const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const calculateAgeFromDob = (value: unknown): string => {
  if (!value) return 'N/A';
  const dob = new Date(String(value));
  if (Number.isNaN(dob.getTime())) return 'N/A';
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age >= 0 ? String(age) : 'N/A';
};

const imageUrlFromPath = (filePath: unknown): string | null => {
  const path = String(filePath || '').trim();
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('uploads/')) return `${BACKEND_ORIGIN}/media/${path}`;
  if (path.startsWith('media/')) return `${BACKEND_ORIGIN}/${path}`;
  if (path.startsWith('/')) return `${BACKEND_ORIGIN}${path}`;
  return `${BACKEND_ORIGIN}/img/${path}`;
};

const documentUrlFromPath = (filePath: unknown): string | null => {
  const path = String(filePath || '').trim();
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('uploads/')) return `${BACKEND_ORIGIN}/media/${path}`;
  if (path.startsWith('media/')) return `${BACKEND_ORIGIN}/${path}`;
  if (path.startsWith('/')) return `${BACKEND_ORIGIN}${path}`;
  if (path.startsWith('img/')) return `${BACKEND_ORIGIN}/${path}`;
  return `${BACKEND_ORIGIN}/img/${path}`;
};

const inferFileType = (path: string): string => {
  const cleaned = path.trim().toLowerCase();
  if (!cleaned) return '';
  const parts = cleaned.split('.');
  if (parts.length < 2) return '';
  return parts[parts.length - 1];
};

const enrichInsurancePolicies = (
  policies: Option[],
  profiles: InsuranceProfileOption[],
  profileTypes: InsuranceProfileTypeOption[],
): Option[] => {
  const profileById = new Map<string, InsuranceProfileOption>();
  profiles.forEach((profile) => profileById.set(String(profile.id), profile));
  const typeById = new Map<string, InsuranceProfileTypeOption>();
  profileTypes.forEach((item) => typeById.set(String(item.id), item));

  return policies.map((policy) => {
    const profile = profileById.get(String(policy.insurance_profile_id ?? ''));
    const profileType = typeById.get(String(profile?.insurance_profile_type_id ?? ''));
    return {
      ...policy,
      insurance_profile_name: profile?.name ?? policy.insurance_profile_name ?? null,
      insurance_profile_type_name: profileType?.name ?? policy.insurance_profile_type_name ?? null,
    };
  });
};

export default function PatientsViewPatient() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    const requestedTab = String(searchParams.get('tab') || '').trim() as TabKey;
    return TAB_KEYS.includes(requestedTab) ? requestedTab : 'biometrics';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [labels, setLabels] = useState<Record<string, string | null | undefined>>({});
  const [image, setImage] = useState<GenericRecord | null>(null);
  const [insurances, setInsurances] = useState<GenericRecord[]>([]);
  const [insurancePolicies, setInsurancePolicies] = useState<Option[]>([]);
  const [visits, setVisits] = useState<GenericRecord[]>([]);
  const [routineCare, setRoutineCare] = useState<GenericRecord[]>([]);
  const [documents, setDocuments] = useState<GenericRecord[]>([]);
  const [history, setHistory] = useState<Record<string, GenericRecord[]>>({});
  const [credit, setCredit] = useState<GenericRecord | null>(null);
  const [showAddSponsor, setShowAddSponsor] = useState(false);
  const [isSavingSponsor, setIsSavingSponsor] = useState(false);
  const [sponsorForm, setSponsorForm] = useState<SponsorForm>(initialSponsorForm);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [isSavingDocument, setIsSavingDocument] = useState(false);
  const [documentForm, setDocumentForm] = useState<DocumentFormState>(initialDocumentForm);
  const [editingDocument, setEditingDocument] = useState<GenericRecord | null>(null);
  const [editDocumentForm, setEditDocumentForm] = useState<DocumentFormState>(initialDocumentForm);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [pendingLabsCount, setPendingLabsCount] = useState(0);
  const [pendingScansCount, setPendingScansCount] = useState(0);
  const [billingSummary, setBillingSummary] = useState({ total: 0, paid: 0, balance: 0, invoiceCount: 0 });

  const patientId = searchParams.get('patient_id') || searchParams.get('id') || '';

  useEffect(() => {
    const requestedTab = String(searchParams.get('tab') || '').trim() as TabKey;
    if (TAB_KEYS.includes(requestedTab)) {
      setActiveTab(requestedTab);
    }
  }, [searchParams]);

  const loadPatientDetails = async (patientIdValue: string, mountedRef?: { current: boolean }) => {
    const response = await api.get<DetailedPatientResponse>(
      `/legacy/patients/view-patient/?id=${encodeURIComponent(patientIdValue)}&detailed=1`,
    );
    if (mountedRef && !mountedRef.current) return;
    const rawPatient = response.patient ?? (response as unknown as PatientRecord);
    setPatient(rawPatient ?? null);
    setLabels(response.labels ?? {});
    setImage(response.patient_image ?? null);
    setInsurances(Array.isArray(response.insurances) ? response.insurances : []);
    setVisits(Array.isArray(response.visits) ? response.visits : []);
    setRoutineCare(Array.isArray(response.routine_care) ? response.routine_care : []);
    setDocuments(Array.isArray(response.documents) ? response.documents : []);
    setHistory(response.history ?? {});
    setCredit(response.credit ?? null);
  };

  useEffect(() => {
    let mounted = true;
    const mountedRef = { current: true };
    const load = async () => {
      if (!patientId) {
        setError('Missing patient_id in URL.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const [_, policies, profiles, profileTypes] = await Promise.all([
          loadPatientDetails(patientId, mountedRef),
          api.get<Option[]>('/insurance_profile_policies/'),
          api.get<InsuranceProfileOption[]>('/insurance_profiles/'),
          api.get<InsuranceProfileTypeOption[]>('/insurance_profile_types/'),
        ]);
        if (!mounted) return;
        setInsurancePolicies(
          enrichInsurancePolicies(
            Array.isArray(policies) ? policies : [],
            Array.isArray(profiles) ? profiles : [],
            Array.isArray(profileTypes) ? profileTypes : [],
          ),
        );
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load patient profile.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load().catch(() => {
      if (!mounted) return;
      setError('Unable to load patient profile.');
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      mountedRef.current = false;
    };
  }, [patientId]);

  const patientName = useMemo(() => {
    if (!patient) return 'Patient';
    const first = asString(patient.first_name, '').trim();
    const last = asString(patient.last_name, '').trim();
    const full = `${first} ${last}`.trim();
    return full || asString(patient.name, 'Patient');
  }, [patient]);

  const patientImageUrl = useMemo(() => imageUrlFromPath(image?.file_path), [image]);
  const documentSections = useMemo(() => {
    return DOCUMENT_SECTIONS.map((section) => ({
      ...section,
      rows: documents.filter((row) => section.match(row)),
    }));
  }, [documents]);
  const activeVisitId = useMemo(() => {
    const fromQuery = String(searchParams.get('visit_id') || '').trim();
    if (fromQuery) return fromQuery;
    for (const visit of visits) {
      const visitId = String(visit?.id || '').trim();
      if (visitId) return visitId;
    }
    return '';
  }, [searchParams, visits]);

  useEffect(() => {
    const loadSummaries = async () => {
      if (!activeVisitId) {
        setPendingLabsCount(0);
        setPendingScansCount(0);
        setBillingSummary({ total: 0, paid: 0, balance: 0, invoiceCount: 0 });
        return;
      }

      setSummaryLoading(true);
      try {
        const [labRows, scanRows, invoicePayload] = await Promise.all([
          api.get<GenericRecord[]>(`/legacy/request-labs/view-request/?patient_visit_id=${encodeURIComponent(activeVisitId)}`),
          api.get<GenericRecord[]>(`/legacy/request-radiologies/view-request/?patient_visit_id=${encodeURIComponent(activeVisitId)}`),
          api.get<{ invoices?: InvoiceSummaryRow[] } | InvoiceSummaryRow[]>(
            '/legacy/billings/index/?detailed=1&page=1&page_size=200',
          ),
        ]);

        const labList = Array.isArray(labRows) ? labRows : [];
        const scanList = Array.isArray(scanRows) ? scanRows : [];
        const rawInvoices = Array.isArray(invoicePayload)
          ? invoicePayload
          : Array.isArray(invoicePayload?.invoices)
            ? invoicePayload.invoices
            : [];
        const visitInvoices = rawInvoices.filter((row) => String(row.patient_visit_id || '').trim() === String(activeVisitId).trim());

        const pendingLab = labList.filter((row) => {
          const status = String(row.status_id || '').trim();
          return status !== '23' && status !== '24';
        }).length;
        const pendingScan = scanList.filter((row) => {
          const status = String(row.status_id || '').trim();
          return status !== '23' && status !== '24';
        }).length;

        const totals = visitInvoices.reduce(
          (acc, row) => {
            acc.total += asNumber(row.final_amount);
            acc.paid += asNumber(row.amount_paid);
            return acc;
          },
          { total: 0, paid: 0 },
        );

        setPendingLabsCount(pendingLab);
        setPendingScansCount(pendingScan);
        setBillingSummary({
          total: totals.total,
          paid: totals.paid,
          balance: Math.max(totals.total - totals.paid, 0),
          invoiceCount: visitInvoices.length,
        });
      } catch {
        setPendingLabsCount(0);
        setPendingScansCount(0);
        setBillingSummary({ total: 0, paid: 0, balance: 0, invoiceCount: 0 });
      } finally {
        setSummaryLoading(false);
      }
    };

    loadSummaries().catch(() => {
      setSummaryLoading(false);
    });
  }, [activeVisitId]);

  const updateSponsorField = <K extends keyof SponsorForm>(field: K, value: SponsorForm[K]) => {
    setSponsorForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitSponsor = async () => {
    if (!patientId) {
      setError('Missing patient_id in URL.');
      return;
    }
    if (!sponsorForm.insurance_profile_policy_id) {
      setError('Select a sponsor policy.');
      return;
    }
    if (!sponsorForm.insurance_number.trim()) {
      setError('Membership ID is required.');
      return;
    }

    setIsSavingSponsor(true);
    setError(null);
    try {
      await api.post('/legacy/patients/add-insurance-provider/', {
        patient_id: patientId,
        insurance_profile_policy_id: sponsorForm.insurance_profile_policy_id,
        insurance_card_name: sponsorForm.insurance_card_name.trim() || null,
        insurance_number: sponsorForm.insurance_number.trim(),
        insurance_card_serial: sponsorForm.insurance_card_serial.trim() || null,
        scheme_number: sponsorForm.scheme_number.trim() || null,
        copay: sponsorForm.copay ? 1 : 0,
        state: sponsorForm.state || '1',
        date_of_issue: sponsorForm.date_of_issue || null,
        date_of_renewal: sponsorForm.date_of_renewal || null,
        guarantor_name: sponsorForm.guarantor_name.trim() || null,
        guarantor_contact: sponsorForm.guarantor_contact.trim() || null,
        guarantor_address: sponsorForm.guarantor_address.trim() || null,
        guarantor_relation: sponsorForm.guarantor_relation.trim() || null,
      });
      await loadPatientDetails(patientId);
      setSponsorForm(initialSponsorForm);
      setShowAddSponsor(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add sponsor.');
    } finally {
      setIsSavingSponsor(false);
    }
  };

  const submitDocument = async () => {
    if (!patientId) {
      setError('Missing patient_id in URL.');
      return;
    }
    if (!documentForm.name.trim()) {
      setError('Document name is required.');
      return;
    }
    if (!documentForm.file_path.trim()) {
      setError('Document file path or URL is required.');
      return;
    }
    setIsSavingDocument(true);
    setError(null);
    try {
      const now = new Date().toISOString();
      await api.post('/patient_documents/', {
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g, '') : `${Date.now()}`,
        patient_id: patientId,
        name: documentForm.name.trim(),
        description: documentForm.description.trim() || null,
        document_type: documentForm.document_type,
        file_path: documentForm.file_path.trim(),
        file_type: inferFileType(documentForm.file_path),
        status_id: '1',
        date_created: now,
      });
      await loadPatientDetails(patientId);
      setDocumentForm(initialDocumentForm);
      setShowAddDocument(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add document.');
    } finally {
      setIsSavingDocument(false);
    }
  };

  const openEditDocument = (doc: GenericRecord) => {
    setEditingDocument(doc);
    setEditDocumentForm({
      name: asString(doc.name, ''),
      description: asString(doc.description, ''),
      document_type: asString(doc.document_type, 'other_documents'),
      file_path: asString(doc.file_path, ''),
    });
  };

  const saveEditedDocument = async () => {
    if (!editingDocument) return;
    const documentId = asString(editingDocument.id, '');
    if (!documentId) return;
    if (!editDocumentForm.name.trim()) {
      setError('Document name is required.');
      return;
    }
    setIsSavingDocument(true);
    setError(null);
    try {
      await api.patch(`/patient_documents/${encodeURIComponent(documentId)}/`, {
        name: editDocumentForm.name.trim(),
        description: editDocumentForm.description.trim() || null,
        document_type: editDocumentForm.document_type,
        file_path: editDocumentForm.file_path.trim() || null,
        file_type: inferFileType(editDocumentForm.file_path),
      });
      await loadPatientDetails(patientId);
      setEditingDocument(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to edit document.');
    } finally {
      setIsSavingDocument(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Patients</p>
          <h1 className="text-2xl font-semibold text-slate-900">View Patient</h1>
          <p className="text-sm text-slate-600">Detailed patient profile migrated from CakePHP view.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate(`/Patients/edit_patient?patient_id=${encodeURIComponent(patientId)}`)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams();
              params.set('patient_id', patientId);
              if (activeVisitId) params.set('visit_id', activeVisitId);
              navigate(`/Patients/visit_space?${params.toString()}`);
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Visit
          </button>
          <button
            type="button"
            disabled={!activeVisitId}
            onClick={() => {
              if (!activeVisitId) return;
              navigate(`/RequestLabs/view_request?visit_id=${encodeURIComponent(activeVisitId)}`);
            }}
            className="rounded-xl border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            title={activeVisitId ? 'Open Lab Requests' : 'No visit available'}
          >
            Lab
          </button>
          <button
            type="button"
            disabled={!activeVisitId}
            onClick={() => {
              if (!activeVisitId) return;
              navigate(`/RequestRadiologies/view_request?visit_id=${encodeURIComponent(activeVisitId)}`);
            }}
            className="rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            title={activeVisitId ? 'Open Scan Requests' : 'No visit available'}
          >
            Scan
          </button>
          <button
            type="button"
            disabled={!activeVisitId}
            onClick={() => {
              if (!activeVisitId) return;
              navigate(`/RequestMedications/view_request?visit_id=${encodeURIComponent(activeVisitId)}`);
            }}
            className="rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            title={activeVisitId ? 'Open Medication Requests' : 'No visit available'}
          >
            Medication
          </button>
        </div>
      </div>

      {error ? <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {isLoading ? <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Loading patient...</div> : null}

      {!isLoading && patient ? (
        <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
          <aside className="space-y-4">




            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-col items-center gap-3 text-center">
                {patientImageUrl ? (
                  <img src={patientImageUrl} alt={patientName} className="h-24 w-24 rounded-full border border-slate-200 object-cover" />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-2xl font-semibold text-slate-500">
                    {patientName.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold text-slate-900">{patientName}</p>
                  <p className="text-xs text-slate-500">{asString(patient.id)}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                <li className="flex justify-between gap-3"><span>Folder Number</span><span className="font-medium">{asString(patient.folder_number)}</span></li>
                <li className="flex justify-between gap-3"><span>Patient Code</span><span className="font-medium">{asString(patient.code)}</span></li>
                <li className="flex justify-between gap-3"><span>Date Registered</span><span className="font-medium">{formatDate(patient.date_created)}</span></li>
                <li className="flex justify-between gap-3"><span>Status</span><span className="font-medium">{asString(labels.status)}</span></li>
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900">Contact Information</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex justify-between gap-3"><span>Phone</span><span className="font-medium">{asString(patient.phone)}</span></li>
                <li className="flex justify-between gap-3"><span>Email</span><span className="font-medium">{asString(patient.email)}</span></li>
                <li className="flex justify-between gap-3"><span>Receive SMS</span><span className="font-medium">{String(patient.accept_sms) === '1' ? 'YES' : 'NO'}</span></li>
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900">Credit Information</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex justify-between gap-3"><span>Amount</span><span className="font-medium">{asString(credit?.amount)}</span></li>
                <li className="flex justify-between gap-3"><span>Used</span><span className="font-medium">{asString(credit?.amount_used, '0')}</span></li>
                <li className="flex justify-between gap-3"><span>Remaining</span><span className="font-medium">{asString(credit?.remaining, '0')}</span></li>
                <li className="flex justify-between gap-3"><span>Status</span><span className="font-medium">{asString(credit?.status_name)}</span></li>
                <li className="flex justify-between gap-3"><span>Expiry</span><span className="font-medium">{formatDate(credit?.expiry_date)}</span></li>
              </ul>
            </section>
          </aside>

          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap gap-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                      activeTab === tab.key ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'biometrics' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Biometric Data</h3>
                <div className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                  <p><span className="text-slate-500">Gender:</span> {asString(labels.gender)}</p>
                  <p><span className="text-slate-500">Date of Birth:</span> {formatDateOnly(patient.date_of_birth)}</p>
                  <p><span className="text-slate-500">Age:</span> {calculateAgeFromDob(patient.date_of_birth)}</p>
                  <p><span className="text-slate-500">Blood Group:</span> {asString(labels.blood_group)}</p>
                  <p><span className="text-slate-500">Sickling Status:</span> {SICKLING_LABELS[String(patient.sickling_status || '')] || 'N/A'}</p>
                </div>

                <h3 className="mt-6 text-sm font-semibold text-slate-900">Personal & Kin Details</h3>
                <div className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                  <p><span className="text-slate-500">Education:</span> {asString(labels.education)}</p>
                  <p><span className="text-slate-500">Occupation:</span> {asString(labels.occupation)}</p>
                  <p><span className="text-slate-500">Religion:</span> {asString(labels.religion)}</p>
                  <p><span className="text-slate-500">Ethnicity:</span> {asString(labels.ethnicity)}</p>
                  <p><span className="text-slate-500">Marital Status:</span> {asString(labels.marital_status)}</p>
                  <p><span className="text-slate-500">Partner:</span> {asString(patient.name_of_partner)}</p>
                  <p><span className="text-slate-500">Next of Kin:</span> {asString(patient.next_of_kin)}</p>
                  <p><span className="text-slate-500">Kin Phone:</span> {asString(patient.next_of_kin_phone)}</p>
                  <p><span className="text-slate-500">Kin Relation:</span> {asString(patient.next_of_kin_relation)}</p>
                </div>

                <h3 className="mt-6 text-sm font-semibold text-slate-900">Contact & Location</h3>
                <div className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                  <p><span className="text-slate-500">Email:</span> {asString(patient.email)}</p>
                  <p><span className="text-slate-500">Phone:</span> {asString(patient.phone)}</p>
                  <p><span className="text-slate-500">Address:</span> {asString(patient.home_address)}</p>
                  <p><span className="text-slate-500">Region:</span> {asString(labels.region)}</p>
                  <p><span className="text-slate-500">Location:</span> {asString(labels.location)}</p>
                  <p><span className="text-slate-500">Nationality:</span> {asString(labels.nationality)}</p>
                </div>
              </div>
            ) : null}

            {activeTab === 'sponsors' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">Sponsors</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddSponsor((prev) => !prev)}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                  >
                    {showAddSponsor ? 'Close Form' : 'Add Sponsor'}
                  </button>
                </div>

                {showAddSponsor ? (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-xs text-slate-600 md:col-span-2">
                        Policy / Sponsor
                        <InsurancePolicyPicker
                          id="insurance_profile_policy_id"
                          options={insurancePolicies}
                          value={sponsorForm.insurance_profile_policy_id}
                          onChange={(nextValue) => updateSponsorField('insurance_profile_policy_id', nextValue)}
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Membership Card Name
                        <input
                          value={sponsorForm.insurance_card_name}
                          onChange={(event) => updateSponsorField('insurance_card_name', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Membership ID
                        <input
                          value={sponsorForm.insurance_number}
                          onChange={(event) => updateSponsorField('insurance_number', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                          required
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Card Serial Number
                        <input
                          value={sponsorForm.insurance_card_serial}
                          onChange={(event) => updateSponsorField('insurance_card_serial', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Scheme Number
                        <input
                          value={sponsorForm.scheme_number}
                          onChange={(event) => updateSponsorField('scheme_number', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Date of Issue
                        <input
                          type="date"
                          value={sponsorForm.date_of_issue}
                          onChange={(event) => updateSponsorField('date_of_issue', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Date of Renewal
                        <input
                          type="date"
                          value={sponsorForm.date_of_renewal}
                          onChange={(event) => updateSponsorField('date_of_renewal', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        State
                        <SearchableSelectField
                          value={sponsorForm.state}
                          onChange={(event) => updateSponsorField('state', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        >
                          <option value="1">Primary</option>
                          <option value="2">Secondary</option>
                        </SearchableSelectField>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-600">
                        <input
                          type="checkbox"
                          checked={sponsorForm.copay}
                          onChange={(event) => updateSponsorField('copay', event.target.checked)}
                        />
                        Co Pay
                      </label>
                      <label className="text-xs text-slate-600">
                        Guarantor Name
                        <input
                          value={sponsorForm.guarantor_name}
                          onChange={(event) => updateSponsorField('guarantor_name', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Guarantor Contact
                        <input
                          value={sponsorForm.guarantor_contact}
                          onChange={(event) => updateSponsorField('guarantor_contact', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Guarantor Address
                        <input
                          value={sponsorForm.guarantor_address}
                          onChange={(event) => updateSponsorField('guarantor_address', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Guarantor Relation
                        <input
                          value={sponsorForm.guarantor_relation}
                          onChange={(event) => updateSponsorField('guarantor_relation', event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          submitSponsor().catch(() => {
                            setError('Unable to add sponsor.');
                          });
                        }}
                        disabled={isSavingSponsor}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSavingSponsor ? 'Saving...' : 'Save Sponsor'}
                      </button>
                    </div>
                  </div>
                ) : null}

                {insurances.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-600">No insurance sponsors found.</p>
                ) : (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-slate-700">
                      <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                        <tr>
                          <th className="px-3 py-2">Membership No</th>
                          <th className="px-3 py-2">Sponsor</th>
                          <th className="px-3 py-2">Policy</th>
                          <th className="px-3 py-2">Scheme No</th>
                          <th className="px-3 py-2">Renewal</th>
                          <th className="px-3 py-2">Co Pay</th>
                          <th className="px-3 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {insurances.map((row) => (
                          <tr key={asString(row.id, Math.random().toString())} className="border-b border-slate-100">
                            <td className="px-3 py-2">{asString(row.insurance_number)}</td>
                            <td className="px-3 py-2">{asString(row.sponsor_name)}</td>
                            <td className="px-3 py-2">{asString(row.policy_name)}</td>
                            <td className="px-3 py-2">{asString(row.scheme_number)}</td>
                            <td className="px-3 py-2">{formatDate(row.date_of_renewal)}</td>
                            <td className="px-3 py-2">{String(row.copay) === '1' ? 'Yes' : 'No'}</td>
                            <td className="px-3 py-2">{asString(row.status_name)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === 'care_flow' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Care Flow (Recent Visits)</h3>
                {visits.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-600">No visits found.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {visits.map((visit) => (
                      <div key={asString(visit.id, Math.random().toString())} className="rounded-xl border border-slate-200 p-3">
                        <p className="text-sm font-semibold text-slate-900">Visit #{asString(visit.id)}</p>
                        <p className="text-xs text-slate-600">Created: {formatDate(visit.date_created || visit.date_visited)}</p>
                        <p className="text-xs text-slate-600">Status: {asString(visit.status_id)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === 'medical_history' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Medical History</h3>
                <div className="mt-4 space-y-4">
                  {Object.entries(history).map(([section, rows]) => (
                    <div key={section} className="rounded-xl border border-slate-200 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{section}</p>
                      {rows.length === 0 ? (
                        <p className="mt-2 text-sm text-slate-600">No records.</p>
                      ) : (
                        <div className="mt-2 space-y-2">
                          {rows.map((row) => (
                            <div key={asString(row.id, Math.random().toString())} className="text-sm text-slate-700">
                              {asString(row.description || row.comment || row.hobbies || row.family_circumstance || row.alcohol_details || row.tobacco_details)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === 'medication_history' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Medication History</h3>
                <p className="mt-4 text-sm text-slate-600">
                  Medication records are accessed per visit in this migration phase. Open a visit from Care Flow to view full medication details.
                </p>
              </div>
            ) : null}

            {activeTab === 'routine_care' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Routine Care</h3>
                {routineCare.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-600">No routine care entries found.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {routineCare.map((entry) => (
                      <div key={asString(entry.id, Math.random().toString())} className="rounded-xl border border-slate-200 p-3">
                        <p className="text-sm font-semibold text-slate-900">{asString(entry.title, 'Routine care task')}</p>
                        <p className="text-xs text-slate-600">Date: {formatDate(entry.date || entry.date_created)}</p>
                        <p className="text-xs text-slate-600">Status: {asString(entry.status_id)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === 'documents' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">Documents</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddDocument((prev) => !prev)}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                  >
                    {showAddDocument ? 'Close Form' : 'Upload New Document'}
                  </button>
                </div>

                {showAddDocument ? (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-sm font-semibold text-slate-900">Upload A New Document</h4>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <label className="text-xs text-slate-600">
                        Document Name
                        <input
                          value={documentForm.name}
                          onChange={(event) => setDocumentForm((prev) => ({ ...prev, name: event.target.value }))}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        Document Type
                        <SearchableSelectField
                          value={documentForm.document_type}
                          onChange={(event) => setDocumentForm((prev) => ({ ...prev, document_type: event.target.value }))}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        >
                          {DOCUMENT_SECTIONS.map((section) => (
                            <option key={section.key} value={section.key}>{section.label}</option>
                          ))}
                        </SearchableSelectField>
                      </label>
                      <label className="text-xs text-slate-600 md:col-span-2">
                        Description
                        <textarea
                          value={documentForm.description}
                          onChange={(event) => setDocumentForm((prev) => ({ ...prev, description: event.target.value }))}
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                          rows={2}
                        />
                      </label>
                      <label className="text-xs text-slate-600 md:col-span-2">
                        File Path / URL
                        <input
                          value={documentForm.file_path}
                          onChange={(event) => setDocumentForm((prev) => ({ ...prev, file_path: event.target.value }))}
                          placeholder="e.g. uploads/documents/file.pdf or https://..."
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </label>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setDocumentForm(initialDocumentForm)}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          submitDocument().catch(() => setError('Unable to add document.'));
                        }}
                        disabled={isSavingDocument}
                        className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSavingDocument ? 'Saving...' : 'Save Document'}
                      </button>
                    </div>
                  </div>
                ) : null}

                <div className="mt-4 space-y-4">
                  {documentSections.map((section) => (
                    <details key={section.key} className="rounded-xl border border-slate-200 bg-white" open={section.rows.length > 0}>
                      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-900">
                        {section.label}
                        <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{section.rows.length}</span>
                      </summary>
                      <div className="border-t border-slate-200 p-3">
                        {section.rows.length === 0 ? (
                          <p className="text-sm text-slate-600">No documents.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm text-slate-700">
                              <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                                <tr>
                                  <th className="px-3 py-2">Name</th>
                                  <th className="px-3 py-2">Description</th>
                                  <th className="px-3 py-2">File Type</th>
                                  <th className="px-3 py-2">Date</th>
                                  <th className="px-3 py-2">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {section.rows.map((doc) => {
                                  const docId = asString(doc.id, '');
                                  const viewUrl = documentUrlFromPath(doc.file_path);
                                  return (
                                    <tr key={docId || asString(doc.name)} className="border-b border-slate-100">
                                      <td className="px-3 py-2">{asString(doc.name)}</td>
                                      <td className="px-3 py-2">{asString(doc.description)}</td>
                                      <td className="px-3 py-2">{asString(doc.file_type || inferFileType(asString(doc.file_path, '')))}</td>
                                      <td className="px-3 py-2">{formatDateOnly(doc.date_created)}</td>
                                      <td className="px-3 py-2">
                                        <div className="flex flex-wrap gap-2">
                                          <button
                                            type="button"
                                            onClick={() => openEditDocument(doc)}
                                            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                                          >
                                            Edit
                                          </button>
                                          {viewUrl ? (
                                            <a
                                              href={viewUrl}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                                            >
                                              View
                                            </a>
                                          ) : (
                                            <span className="rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-400">View</span>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
      {editingDocument ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Edit Document</h3>
              <button
                type="button"
                onClick={() => setEditingDocument(null)}
                className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-xs text-slate-600">
                Document Name
                <input
                  value={editDocumentForm.name}
                  onChange={(event) => setEditDocumentForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Document Type
                <SearchableSelectField
                  value={editDocumentForm.document_type}
                  onChange={(event) => setEditDocumentForm((prev) => ({ ...prev, document_type: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  {DOCUMENT_SECTIONS.map((section) => (
                    <option key={section.key} value={section.key}>{section.label}</option>
                  ))}
                </SearchableSelectField>
              </label>
              <label className="text-xs text-slate-600 md:col-span-2">
                Description
                <textarea
                  value={editDocumentForm.description}
                  onChange={(event) => setEditDocumentForm((prev) => ({ ...prev, description: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  rows={2}
                />
              </label>
              <label className="text-xs text-slate-600 md:col-span-2">
                File Path / URL
                <input
                  value={editDocumentForm.file_path}
                  onChange={(event) => setEditDocumentForm((prev) => ({ ...prev, file_path: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingDocument(null)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  saveEditedDocument().catch(() => setError('Unable to edit document.'));
                }}
                disabled={isSavingDocument}
                className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingDocument ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
