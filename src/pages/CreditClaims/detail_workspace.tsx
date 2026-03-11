import { Fragment, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type Lookup = {
  id?: string;
  name?: string;
};

type NhisOption = {
  id?: string;
  name?: string;
  gdrg?: string;
};

type GenericRow = Record<string, unknown> & {
  id?: string;
};

type ClaimItem = GenericRow & {
  id: string;
  item_name?: string | null;
  quantity?: string | number | null;
  unit_cost?: string | number | null;
  final_amount?: string | number | null;
  status_id?: string | null;
  item_type?: Lookup | null;
  status?: Lookup | null;
};

type ClaimLog = GenericRow & {
  id: string;
  message?: string | null;
  date_of_added?: string | null;
};

type DetailPayload = {
  invoice?: GenericRow | null;
  visit?: GenericRow | null;
  patient?: GenericRow | null;
  status?: GenericRow | null;
  insurance?: {
    policy?: GenericRow | null;
    profile?: GenericRow | null;
    profile_type?: GenericRow | null;
    coverage_options?: Array<{
      id?: string;
      patient_policy_id?: string;
      selected?: boolean;
      insurance_number?: string;
      guarantor_name?: string;
      insurance_card_serial?: string;
      insurance_card_name?: string;
      policy?: GenericRow | null;
      profile?: GenericRow | null;
      profile_type?: GenericRow | null;
    }>;
    recommended_coverage?: {
      id?: string;
      patient_policy_id?: string;
      policy?: GenericRow | null;
      profile?: GenericRow | null;
      profile_type?: GenericRow | null;
    } | null;
  } | null;
  items?: ClaimItem[];
  logs?: ClaimLog[];
  tariff_diagnostics?: {
    tariffs?: ClaimItem[];
    assessed_diagnoses?: Array<{
      id?: string;
      diagnosis_text?: string;
      clinical_summary?: string;
      lines?: Array<{
        mapping_id?: string;
        role?: string;
        swap_type?: string;
        patient_visit_diagnosis_id?: string;
        diagnosis?: { id?: string; name?: string; code?: string; long_name?: string } | null;
      }>;
    }>;
    service_links?: Array<{
      id?: string;
      diagnosis?: { name?: string; code?: string } | null;
      procedure?: { name?: string; gdrg?: string } | null;
      description?: string;
      code?: string;
    }>;
    procedure_links?: Array<{
      id?: string;
      diagnosis?: { name?: string; code?: string } | null;
      procedure?: { id?: string; name?: string; code?: string; gdrg?: string; nhis_item_id?: string } | null;
      target?: { type?: string; id?: string } | null;
      correction?: string;
      validity?: string;
      suggested_nhis_options?: NhisOption[];
    }>;
    medication_links?: Array<{
      id?: string;
      diagnosis?: { name?: string; code?: string } | null;
      medication?: { id?: string; name?: string; gdrg?: string; nhis_item_id?: string } | null;
      target?: { type?: string; id?: string } | null;
      correction?: string;
      validity?: string;
      suggested_nhis_options?: NhisOption[];
    }>;
    investigation_links?: Array<{
      id?: string;
      lab_test?: { id?: string; name?: string; description?: string; gdrg?: string; nhis_investigation_id?: string } | null;
      investigation?: { name?: string; description?: string } | null;
      target?: { type?: number; id?: string } | null;
      description?: string;
      comment?: string;
      validity?: string;
      suggested_nhis_options?: NhisOption[];
    }>;
    nhis_options?: {
      items?: NhisOption[];
      procedures?: NhisOption[];
      investigations?: NhisOption[];
    };
  };
  summary?: {
    active_total?: number;
    amount_paid?: number;
    remaining_amount?: number;
    item_count?: number;
    disabled_count?: number;
  };
  claim_state?: string;
  claim_bucket?: string;
  warnings?: Array<{ level?: string; message?: string }>;
  scrubber_results?: Array<{ level?: string; message?: string; icon?: string }>;
};

const asText = (value: unknown): string => String(value ?? '').trim();

const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoney = (value: unknown): string =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(asNumber(value));

const formatDateTime = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleString();
};

const formatDate = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString();
};

const getMappingValidityMeta = (value: unknown): { label: string; className: string } => {
  const status = asText(value).toLowerCase();
  if (status === 'valid') {
    return {
      label: 'Valid',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    };
  }
  if (status === 'invalid') {
    return {
      label: 'Invalid NHIS GDRG',
      className: 'border-rose-200 bg-rose-50 text-rose-700',
    };
  }
  return {
    label: 'Needs Mapping',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  };
};

const getPreferredNhisOptions = (suggested: NhisOption[] | undefined, fallback: NhisOption[]): NhisOption[] => {
  const narrowed = Array.isArray(suggested) ? suggested.filter((row) => asText(row.id)) : [];
  return narrowed.length ? narrowed : fallback;
};

const getDisplayName = (row: GenericRow | null | undefined, fallbacks: string[]): string => {
  if (!row) return 'N/A';
  for (const key of fallbacks) {
    const value = asText(row[key]);
    if (value) return value;
  }
  const firstName = asText(row.first_name);
  const lastName = asText(row.last_name);
  const combined = `${firstName} ${lastName}`.trim();
  if (combined) return combined;
  return asText(row.id) || 'N/A';
};

const warningClass = (level: string) => {
  if (level === 'danger') return 'border-rose-200 bg-rose-50 text-rose-700';
  if (level === 'warning') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (level === 'info') return 'border-sky-200 bg-sky-50 text-sky-700';
  return 'border-slate-200 bg-slate-50 text-slate-700';
};

const stateClass = (value: string) => {
  if (value === 'paid') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (value === 'submitted') return 'border-sky-200 bg-sky-50 text-sky-700';
  if (value === 'flagged') return 'border-rose-200 bg-rose-50 text-rose-700';
  return 'border-amber-200 bg-amber-50 text-amber-700';
};

const stateLabel = (value: string) => {
  if (value === 'paid') return 'Paid';
  if (value === 'submitted') return 'Submitted';
  if (value === 'flagged') return 'Flagged';
  return 'Coding';
};

const bucketLabel = (value: string) => {
  if (value === 'public_nhis') return 'Public NHIS';
  if (value === 'company_credit') return 'Company / Credit';
  return 'Private';
};

export default function CreditClaimDetailWorkspace({ isInpatient }: { isInpatient: boolean }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invoiceId = asText(searchParams.get('id') || searchParams.get('invoice_id'));
  const sourceTab = asText(searchParams.get('source_tab')).toLowerCase();
  const [payload, setPayload] = useState<DetailPayload>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [quantityDrafts, setQuantityDrafts] = useState<Record<string, string>>({});
  const [commentEdits, setCommentEdits] = useState<Record<string, string>>({});
  const [commentDraft, setCommentDraft] = useState('');
  const [medicationForm, setMedicationForm] = useState({ item_name: '', unit_cost: '' });
  const [diagnosisForm, setDiagnosisForm] = useState({ item_name: '' });
  const [procedureForm, setProcedureForm] = useState({ item_name: '', service_stock_id: '', unit_cost: '' });
  const [investigationForm, setInvestigationForm] = useState({ item_name: '', unit_cost: '' });
  const [gdrgCheck, setGdrgCheck] = useState({ procedure_code: '', icd_code: '' });
  const [gdrgResult, setGdrgResult] = useState<{ check?: GenericRow[]; suggestions?: GenericRow[] } | null>(null);
  const [isTariffModalOpen, setIsTariffModalOpen] = useState(false);
  const [activeTariffModalTab, setActiveTariffModalTab] = useState<'tariff' | 'diagnoses' | 'investigations'>('tariff');
  const [nhisDrafts, setNhisDrafts] = useState<Record<string, string>>({});
  const [coverageDraft, setCoverageDraft] = useState('');
  const [claimCodeDraft, setClaimCodeDraft] = useState('');
  const [showInfoRuleChecks, setShowInfoRuleChecks] = useState(false);

  const endpoint = isInpatient
    ? '/legacy/credit-claims/view-claim-details-inpatient/'
    : '/legacy/credit-claims/view-claim-details/';

  const loadDetail = async () => {
    if (!invoiceId) {
      setError('Missing invoice id.');
      setPayload({});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get<DetailPayload>(`${endpoint}?id=${encodeURIComponent(invoiceId)}`);
      setPayload(data || {});
      setQuantityDrafts(() => {
        const next: Record<string, string> = {};
        for (const item of Array.isArray(data?.items) ? data.items : []) {
          next[item.id] = String(item.quantity ?? 1);
        }
        return next;
      });
      setCommentEdits(() => {
        const next: Record<string, string> = {};
        for (const item of Array.isArray(data?.items) ? data.items : []) {
          next[item.id] = asText(item.comment);
        }
        return next;
      });
      setNhisDrafts(() => {
        const next: Record<string, string> = {};
        const diagnostics = data?.tariff_diagnostics || {};
        for (const row of Array.isArray(diagnostics.procedure_links) ? diagnostics.procedure_links : []) {
          next[`procedure:${asText(row.target?.id)}`] = asText(row.procedure?.nhis_item_id);
        }
        for (const row of Array.isArray(diagnostics.medication_links) ? diagnostics.medication_links : []) {
          next[`item:${asText(row.target?.id)}`] = asText(row.medication?.nhis_item_id);
        }
        for (const row of Array.isArray(diagnostics.investigation_links) ? diagnostics.investigation_links : []) {
          next[`investigation:${asText(row.target?.type)}:${asText(row.target?.id)}`] = asText(row.lab_test?.nhis_investigation_id);
        }
        return next;
      });
      setCoverageDraft(() => {
        const coverages = Array.isArray(data?.insurance?.coverage_options) ? data?.insurance?.coverage_options : [];
        const selected = coverages.find((row) => Boolean(row?.selected));
        return asText(selected?.id) || asText(data?.insurance?.policy?.id);
      });
      setClaimCodeDraft(asText(data?.visit?.claim_code));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load claim.');
      setPayload({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDetail();
  }, [endpoint, invoiceId]);

  const invoice = payload.invoice || null;
  const visit = payload.visit || null;
  const patient = payload.patient || null;
  const insurance = payload.insurance || null;
  const items = Array.isArray(payload.items) ? payload.items : [];
  const logs = Array.isArray(payload.logs) ? payload.logs : [];
  const warnings = Array.isArray(payload.warnings) ? payload.warnings : [];
  const scrubberResults = Array.isArray(payload.scrubber_results) ? payload.scrubber_results : [];
  const coverageOptions = Array.isArray(insurance?.coverage_options) ? insurance.coverage_options : [];
  const recommendedCoverage = insurance?.recommended_coverage || null;
  const tariffDiagnostics = payload.tariff_diagnostics || {};
  const tariffRows = Array.isArray(tariffDiagnostics.tariffs) ? tariffDiagnostics.tariffs : [];
  const assessedDiagnoses = Array.isArray(tariffDiagnostics.assessed_diagnoses) ? tariffDiagnostics.assessed_diagnoses : [];
  const serviceLinks = Array.isArray(tariffDiagnostics.service_links) ? tariffDiagnostics.service_links : [];
  const procedureLinks = Array.isArray(tariffDiagnostics.procedure_links) ? tariffDiagnostics.procedure_links : [];
  const medicationLinks = Array.isArray(tariffDiagnostics.medication_links) ? tariffDiagnostics.medication_links : [];
  const investigationLinks = Array.isArray(tariffDiagnostics.investigation_links) ? tariffDiagnostics.investigation_links : [];
  const nhisItemOptions = Array.isArray(tariffDiagnostics.nhis_options?.items) ? tariffDiagnostics.nhis_options?.items : [];
  const nhisProcedureOptions = Array.isArray(tariffDiagnostics.nhis_options?.procedures) ? tariffDiagnostics.nhis_options?.procedures : [];
  const nhisInvestigationOptions = Array.isArray(tariffDiagnostics.nhis_options?.investigations) ? tariffDiagnostics.nhis_options?.investigations : [];
  const canChangeClaimState = asText(payload.claim_state) === 'coding' && sourceTab !== 'queue';

  const patientName = useMemo(() => getDisplayName(patient, ['full_name', 'name']), [patient]);
  const clinicianName = useMemo(
    () => getDisplayName(visit, ['doctor_name', 'assigned_doctor_name', 'user_name']),
    [visit],
  );
  const alertRuleChecks = useMemo(
    () => scrubberResults.filter((row) => asText(row.level) !== 'info'),
    [scrubberResults],
  );
  const infoRuleChecks = useMemo(
    () => scrubberResults.filter((row) => asText(row.level) === 'info'),
    [scrubberResults],
  );
  const selectedCoverage = useMemo(
    () =>
      coverageOptions.find((row) => asText(row.id) === coverageDraft)
      || coverageOptions.find((row) => Boolean(row.selected))
      || null,
    [coverageDraft, coverageOptions],
  );
  const groupedTariffRows = useMemo(() => {
    const groups = new Map<string, ClaimItem[]>();
    for (const row of tariffRows) {
      const label = asText(row.item_type?.name) || 'Other';
      const existing = groups.get(label) || [];
      existing.push(row);
      groups.set(label, existing);
    }
    return Array.from(groups.entries()).map(([label, rows]) => ({
      label,
      rows,
    }));
  }, [tariffRows]);
  const groupedClaimItems = useMemo(() => {
    const groups = new Map<string, ClaimItem[]>();
    for (const row of items) {
      const label = asText(row.item_type?.name) || 'Other';
      const existing = groups.get(label) || [];
      existing.push(row);
      groups.set(label, existing);
    }
    return Array.from(groups.entries()).map(([label, rows]) => ({
      label,
      rows,
      subtotal: rows.reduce((sum, row) => sum + asNumber(row.final_amount), 0),
    }));
  }, [items]);

  const runAction = async (task: () => Promise<void>, successMessage: string) => {
    setIsSaving(true);
    setNotice(null);
    setError(null);
    try {
      await task();
      setNotice(successMessage);
      await loadDetail();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateQuantity = async (itemId: string) => {
    const quantity = Math.max(1, Math.round(asNumber(quantityDrafts[itemId] || '1')));
    await runAction(
      async () => {
        await api.post('/legacy/credit-claims/update-invoice-quantity/', {
          id: itemId,
          quantity,
        });
      },
      'Invoice quantity updated.',
    );
  };

  const toggleItem = async (item: ClaimItem) => {
    const isDisabled = asText(item.status_id) === '2';
    await runAction(
      async () => {
        await api.post(isDisabled ? '/legacy/credit-claims/enable-item/' : '/legacy/credit-claims/disable-item/', {
          id: item.id,
        });
      },
      isDisabled ? 'Claim item re-enabled.' : 'Claim item disabled.',
    );
  };

  const updateClaimState = async (statusId: string, message: string) => {
    await runAction(
      async () => {
        await api.post('/legacy/credit-claims/flag-or-submit-claim/', {
          invoice_id: invoiceId,
          status_id: statusId,
        });
      },
      message,
    );
  };

  const saveComment = async () => {
    const message = commentDraft.trim();
    if (!message) {
      setError('Comment is required.');
      return;
    }
    await runAction(
      async () => {
        await api.post(`/legacy/credit-claims/get-claim-comments/?invoice_id=${encodeURIComponent(invoiceId)}`, {
          message,
        });
        setCommentDraft('');
      },
      'Claim note saved.',
    );
  };

  const submitItem = async (
    path: string,
    body: Record<string, unknown>,
    successMessage: string,
    onSuccess?: () => void,
  ) => {
    await runAction(
      async () => {
        await api.post(path, body);
        onSuccess?.();
      },
      successMessage,
    );
  };

  const saveItemCorrection = async (item: ClaimItem) => {
    const correction = (commentEdits[item.id] || '').trim();
    if (!correction) {
      setError('Correction note is required.');
      return;
    }
    const path = asText(item.item_type?.id) === '1'
      ? '/legacy/credit-claims/save-medication-correction/'
      : '/legacy/credit-claims/save-procedure-correction/';
    await runAction(
      async () => {
        await api.post(path, {
          invoice_item_id: item.id,
          correction,
        });
      },
      'Correction saved.',
    );
  };

  const removeItemFromClaim = async (item: ClaimItem) => {
    await runAction(
      async () => {
        await api.post('/legacy/credit-claims/delete-invoice-item/', {
          invoice_item_id: item.id,
        });
      },
      'Claim item removed.',
    );
  };

  const runGdrgVerification = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (gdrgCheck.procedure_code.trim()) query.set('procedure_code', gdrgCheck.procedure_code.trim());
      if (gdrgCheck.icd_code.trim()) query.set('icd_code', gdrgCheck.icd_code.trim());
      const data = await api.get<{ check?: GenericRow[]; suggestions?: GenericRow[] }>(
        `/legacy/credit-claims/verify-gdrd-code/?${query.toString()}`,
      );
      setGdrgResult(data || { check: [], suggestions: [] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to verify GDRG code.');
    } finally {
      setIsSaving(false);
    }
  };

  const swapDiagnosis = async (line: NonNullable<NonNullable<DetailPayload['tariff_diagnostics']>['assessed_diagnoses']>[number]['lines'][number]) => {
    if (!visit?.id || !line.mapping_id || !line.patient_visit_diagnosis_id || !line.swap_type) return;
    await runAction(
      async () => {
        await api.post('/legacy/patient-visit-diagnoses/swap-diagnoses/', {
          patient_visit_id: asText(visit.id),
          swap_diagnosis: asText(line.mapping_id),
          diagnosis_id: asText(line.patient_visit_diagnosis_id),
          type: asText(line.swap_type),
        });
      },
      'Primary diagnosis swapped.',
    );
  };

  const updateNhisMapping = async (
    path: string,
    body: Record<string, unknown>,
    successMessage: string,
  ) => {
    await runAction(
      async () => {
        await api.post(path, body);
      },
      successMessage,
    );
  };

  const swapInsuranceCoverage = async () => {
    if (!invoiceId || !coverageDraft) return;
    await runAction(
      async () => {
        await api.post('/legacy/credit-claims/update-invoice-insurance-profile-policy-id/', {
          id: invoiceId,
          insurance_profile_policy_id: coverageDraft,
        });
      },
      'Insurance coverage updated for this claim.',
    );
  };

  const saveVisitClaimCode = async () => {
    const claimCode = claimCodeDraft.trim();
    if (!visit?.id) {
      setError('Missing visit.');
      return;
    }
    if (!claimCode) {
      setError('Claim code is required.');
      return;
    }
    await runAction(
      async () => {
        await api.post('/legacy/credit-claims/update-visit-claim-code/', {
          patient_visit_id: asText(visit.id),
          invoice_id: invoiceId,
          claim_code: claimCode,
        });
      },
      'Visit claim code updated.',
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(242,249,255,0.8))] p-4 shadow-[0_18px_44px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700">Billing</p>
            <h1 className="mt-1 text-2xl font-black tracking-[-0.03em] text-slate-900">
              {isInpatient ? 'Inpatient Claim Detail' : 'Claim Detail'}
            </h1>
            <p className="mt-1 text-xs text-slate-600 md:text-sm">
              Review coverage context, scrub the claim line items, and submit or flag the claim from one screen.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/CreditClaims/index')}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              Back To Claims
            </button>
            <button
              type="button"
              onClick={() => void loadDetail()}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Invoice</p>
            <p className="mt-1 text-lg font-black text-slate-900">{asText(invoice?.invoice_number) || 'N/A'}</p>
            <p className="mt-1 text-xs text-slate-500">Created {formatDate(invoice?.date_added)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Claim State</p>
            <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${stateClass(asText(payload.claim_state))}`}>
              {stateLabel(asText(payload.claim_state))}
            </span>
            <p className="mt-2 text-xs text-slate-600 md:text-sm">{bucketLabel(asText(payload.claim_bucket))}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Active Total</p>
            <p className="mt-1 text-xl font-black text-slate-900">GHS {formatMoney(payload.summary?.active_total)}</p>
            <p className="mt-1 text-xs text-slate-500">{Number(payload.summary?.item_count || 0)} item(s)</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Remaining</p>
            <p className="mt-1 text-xl font-black text-slate-900">GHS {formatMoney(payload.summary?.remaining_amount)}</p>
            <p className="mt-1 text-xs text-slate-500">Paid: GHS {formatMoney(payload.summary?.amount_paid)}</p>
          </div>
        </div>
      </section>

      {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
      {notice ? <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{notice}</div> : null}

      {warnings.length || scrubberResults.length ? (
        <section className="grid gap-3">
          {warnings.map((warning, index) => (
            <div key={`${warning.message || 'warning'}-${index}`} className={`rounded-2xl border px-4 py-3 text-sm ${warningClass(asText(warning.level))}`}>
              {asText(warning.message)}
            </div>
          ))}
          {alertRuleChecks.length || infoRuleChecks.length ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rule Checks</p>
                  <p className="mt-1 text-sm text-slate-600">Only active alerts are expanded by default.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {alertRuleChecks.length} alert(s)
                  </span>
                  {infoRuleChecks.length ? (
                    <button
                      type="button"
                      onClick={() => setShowInfoRuleChecks((current) => !current)}
                      className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"
                    >
                      {showInfoRuleChecks ? 'Hide Info' : `Show Info (${infoRuleChecks.length})`}
                    </button>
                  ) : null}
                </div>
              </div>
              {alertRuleChecks.length ? (
                <div className="mt-3 grid gap-3">
                  {alertRuleChecks.map((row, index) => (
                    <div
                      key={`${row.message || 'scrubber-alert'}-${index}`}
                      className={`rounded-2xl border px-4 py-3 text-sm ${warningClass(asText(row.level))}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-xs font-black uppercase tracking-[0.18em]">
                          {asText(row.level) === 'danger' ? 'Alert' : 'Check'}
                        </span>
                        <p>{asText(row.message)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  No active alert-level rule checks on this claim.
                </div>
              )}
              {showInfoRuleChecks && infoRuleChecks.length ? (
                <div className="mt-3 grid gap-3 border-t border-slate-200 pt-3">
                  {infoRuleChecks.map((row, index) => (
                    <div
                      key={`${row.message || 'scrubber-info'}-${index}`}
                      className={`rounded-2xl border px-4 py-3 text-sm ${warningClass(asText(row.level))}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-xs font-black uppercase tracking-[0.18em]">Info</span>
                        <p>{asText(row.message)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Patient</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">{patientName}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Folder: {asText(patient?.folder_number) || 'N/A'} • Code: {asText(patient?.patient_code) || 'N/A'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {patient?.id ? (
                  <button
                    type="button"
                    onClick={() => navigate(`/Patients/view_patient?id=${encodeURIComponent(asText(patient.id))}`)}
                    className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700"
                  >
                    View Patient
                  </button>
                ) : null}
                {visit?.patient_id && visit?.id ? (
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/Patients/visit_space?patient_id=${encodeURIComponent(asText(visit.patient_id))}&visit_id=${encodeURIComponent(asText(visit.id))}`,
                      )
                    }
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    Visit Space
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Date of Birth</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(patient?.date_of_birth)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Phone</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{asText(patient?.phone) || 'N/A'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Gender</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{asText(patient?.gender_name) || asText(patient?.gender) || asText(patient?.gender_id) || 'N/A'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Visit Date</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{formatDateTime(visit?.date_created || visit?.date_added)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Clinician</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{clinicianName}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Visit Claim Code</p>
                <div className="mt-2 space-y-2">
                  <input
                    value={claimCodeDraft}
                    onChange={(event) => setClaimCodeDraft(event.target.value)}
                    placeholder="Enter visit claim code"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isSaving || !visit?.id || !claimCodeDraft.trim() || claimCodeDraft.trim() === asText(visit?.claim_code)}
                      onClick={() => void saveVisitClaimCode()}
                      className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-60"
                    >
                      Save Code
                    </button>
                    <button
                      type="button"
                      disabled={isSaving || claimCodeDraft === asText(visit?.claim_code)}
                      onClick={() => setClaimCodeDraft(asText(visit?.claim_code))}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-60"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Claim Items</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Tariff Review</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Enable or disable lines, adjust claim quantity, and keep active totals in sync before submission.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTariffModalTab('tariff');
                    setIsTariffModalOpen(true);
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Tariff And Diagnoses
                </button>
                {canChangeClaimState ? (
                  <>
                    <button
                      type="button"
                      disabled={isSaving || !invoiceId}
                      onClick={() => void updateClaimState('27', 'Claim submitted.')}
                      className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 disabled:opacity-60"
                    >
                      Submit Claim
                    </button>
                    <button
                      type="button"
                      disabled={isSaving || !invoiceId}
                      onClick={() => void updateClaimState('31', 'Claim flagged.')}
                      className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 disabled:opacity-60"
                    >
                      Flag Claim
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            {isLoading ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">
                Loading claim items...
              </div>
            ) : items.length ? (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    <tr>
                      <th className="pb-3 pr-4 font-semibold">Item</th>
                      <th className="pb-3 pr-4 font-semibold">Status</th>
                      <th className="pb-3 pr-4 font-semibold">Unit</th>
                      <th className="pb-3 pr-4 font-semibold">Quantity</th>
                      <th className="pb-3 pr-4 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {groupedClaimItems.map((group) => (
                      <Fragment key={`group-${group.label}`}>
                        <tr key={`group-${group.label}`} className="border-t border-slate-200 bg-slate-50/80">
                          <td colSpan={6} className="py-3 pr-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-bold text-slate-900">{group.label}</p>
                                <p className="mt-1 text-xs text-slate-500">{group.rows.length} item(s)</p>
                              </div>
                              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                Subtotal: GHS {formatMoney(group.subtotal)}
                              </span>
                            </div>
                          </td>
                        </tr>
                        {group.rows.map((item) => {
                          const disabled = asText(item.status_id) === '2';
                          return (
                            <tr key={item.id} className={disabled ? 'bg-slate-50/80' : ''}>
                              <td className="py-4 pr-4">
                                <p className="font-semibold text-slate-900">{asText(item.item_name) || 'Unnamed item'}</p>
                              </td>
                              <td className="py-4 pr-4">
                                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${disabled ? 'border-slate-300 bg-slate-100 text-slate-600' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                                  {asText(item.status?.name) || (disabled ? 'Disabled' : 'Active')}
                                </span>
                              </td>
                              <td className="py-4 pr-4 text-slate-700">GHS {formatMoney(item.unit_cost)}</td>
                              <td className="py-4 pr-4">
                                <div className="flex items-center gap-2">
                                  <input
                                    value={quantityDrafts[item.id] ?? String(item.quantity ?? 1)}
                                    onChange={(event) =>
                                      setQuantityDrafts((current) => ({
                                        ...current,
                                        [item.id]: event.target.value,
                                      }))
                                    }
                                    inputMode="numeric"
                                    className="w-20 rounded-xl border border-slate-300 px-3 py-2 text-sm"
                                  />
                                  <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => void updateQuantity(item.id)}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-60"
                                  >
                                    Update
                                  </button>
                                </div>
                              </td>
                              <td className="py-4 pr-4 font-semibold text-slate-900">GHS {formatMoney(item.final_amount)}</td>
                              <td className="py-4">
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-wrap gap-2">
                                    <button
                                      type="button"
                                      disabled={isSaving}
                                      onClick={() => void toggleItem(item)}
                                      className={`rounded-xl border px-3 py-2 text-xs font-semibold disabled:opacity-60 ${disabled ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}
                                    >
                                      {disabled ? 'Enable' : 'Disable'}
                                    </button>
                                    <button
                                      type="button"
                                      disabled={isSaving}
                                      onClick={() => void removeItemFromClaim(item)}
                                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-60"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      value={commentEdits[item.id] ?? ''}
                                      onChange={(event) =>
                                        setCommentEdits((current) => ({
                                          ...current,
                                          [item.id]: event.target.value,
                                        }))
                                      }
                                      placeholder="Correction note"
                                      className="min-w-[12rem] flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs"
                                    />
                                    <button
                                      type="button"
                                      disabled={isSaving}
                                      onClick={() => void saveItemCorrection(item)}
                                      className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-60"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">
                No invoice items are attached to this claim yet.
              </div>
            )}
          </section>

        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Insurance</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Coverage Context</h2>
            <div className="mt-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {getDisplayName((selectedCoverage?.profile as GenericRow | null | undefined) || insurance?.profile || null, ['name'])}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Policy</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {getDisplayName((selectedCoverage?.policy as GenericRow | null | undefined) || insurance?.policy || null, ['name'])}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Profile Type</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {getDisplayName((selectedCoverage?.profile_type as GenericRow | null | undefined) || insurance?.profile_type || null, ['name'])}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Invoice Status</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{getDisplayName(payload.status || null, ['name'])}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Coverage Swap Panel</p>
                  <button
                    type="button"
                    disabled={isSaving || !coverageDraft || coverageDraft === asText(insurance?.policy?.id)}
                    onClick={() => void swapInsuranceCoverage()}
                    className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-60"
                  >
                    Swap Coverage
                  </button>
                </div>

                {recommendedCoverage ? (
                  <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Recommended Profile:{' '}
                    <span className="font-semibold">{getDisplayName((recommendedCoverage.profile as GenericRow | null | undefined) || null, ['name'])}</span>
                    {' '}•{' '}
                    <span className="font-semibold">{getDisplayName((recommendedCoverage.policy as GenericRow | null | undefined) || null, ['name'])}</span>
                  </div>
                ) : null}

                <div className="mt-3 space-y-2">
                  {coverageOptions.length ? (
                    coverageOptions.map((option) => {
                      const isSelected = asText(option.id) === coverageDraft;
                      const isCurrent = Boolean(option.selected);
                      const copayLabel = asText(option.profile?.copay) === '1' ? 'Copay' : 'No Copay';
                      return (
                        <button
                          key={asText(option.patient_policy_id) || asText(option.id)}
                          type="button"
                          onClick={() => setCoverageDraft(asText(option.id))}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${isSelected ? 'border-cyan-300 bg-cyan-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{getDisplayName((option.profile as GenericRow | null | undefined) || null, ['name'])}</p>
                              <p className="mt-1 text-xs text-slate-500">{getDisplayName((option.policy as GenericRow | null | undefined) || null, ['name'])}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-700">
                                {getDisplayName((option.profile_type as GenericRow | null | undefined) || null, ['name'])}
                              </span>
                              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                                {copayLabel}
                              </span>
                              {isCurrent ? (
                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                                  Current
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                      No patient insurance coverages were found for this claim.
                    </div>
                  )}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">HCP Accreditation Number</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{asText(selectedCoverage?.profile?.accreditation_no) || 'N/A'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">HCP Prescription Level</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{asText(selectedCoverage?.profile?.health_care_prescription_level) || 'N/A'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Guarantor</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{asText(selectedCoverage?.guarantor_name) || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Summary</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Financial Breakdown</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-600">Active Items</span>
                  <span className="text-sm font-semibold text-slate-900">{Number(payload.summary?.item_count || 0)}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-600">Disabled Items</span>
                  <span className="text-sm font-semibold text-slate-900">{Number(payload.summary?.disabled_count || 0)}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-600">Amount Paid</span>
                  <span className="text-sm font-semibold text-slate-900">GHS {formatMoney(payload.summary?.amount_paid)}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-600">Remaining</span>
                  <span className="text-sm font-semibold text-slate-900">GHS {formatMoney(payload.summary?.remaining_amount)}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Claim Log</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Activity</h2>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <input
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
                placeholder="Add a comment for coding, audit, or reconciliation"
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm"
              />
              <button
                type="button"
                disabled={isSaving || !invoiceId}
                onClick={() => void saveComment()}
                className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 disabled:opacity-60"
              >
                Save Note
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {logs.length ? (
                logs.map((log) => (
                  <div key={log.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{asText(log.message) || 'No message'}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatDateTime(log.date_of_added)}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                  No claim activity has been logged yet.
                </div>
              )}
            </div>
          </section>

        </div>
      </section>

      {isTariffModalOpen ? (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(243,249,255,0.88))] shadow-[0_34px_90px_rgba(15,23,42,0.24)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">Claims</p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">Tariffs And Diagnoses</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Review existing tariffs, assessed diagnoses, linked services, procedures, medications, and investigations without leaving the claim.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTariffModalOpen(false)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6">
              <div className="mb-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTariffModalTab('tariff')}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${activeTariffModalTab === 'tariff' ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                  Tariff
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTariffModalTab('diagnoses')}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${activeTariffModalTab === 'diagnoses' ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                  Diagnoses And Procedures/Medications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTariffModalTab('investigations')}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${activeTariffModalTab === 'investigations' ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                  Investigations
                </button>
              </div>

              {activeTariffModalTab === 'tariff' ? (
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tariff</p>
                      <p className="mt-1 text-sm text-slate-600">Claim lines grouped by item type, matching the tariff review workflow.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void loadDetail()}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      Reload Tariff
                    </button>
                  </div>
                  <div className="mt-5 space-y-5">
                    {groupedTariffRows.length ? (
                      groupedTariffRows.map((group) => (
                        <div key={group.label} className="space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold text-slate-900">{group.label}</p>
                              <p className="text-xs text-slate-500">{group.rows.length} item(s)</p>
                            </div>
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                              GHS {formatMoney(group.rows.reduce((sum, row) => sum + asNumber(row.final_amount), 0))}
                            </span>
                          </div>
                          {group.rows.map((row) => (
                            <div key={row.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="font-semibold text-slate-900">{asText(row.item_name) || 'Unnamed item'}</p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {formatDateTime(row.date_added)} • Qty {asNumber(row.quantity)} • GHS {formatMoney(row.final_amount)}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                    {asText(row.status?.name) || 'Active'}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setActiveTariffModalTab('diagnoses')}
                                    className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700"
                                  >
                                    Add Diagnoses
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No tariffs loaded.</p>
                    )}
                  </div>
                </section>
              ) : null}

              {activeTariffModalTab === 'diagnoses' ? (
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-6">
                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">All Diagnoses Assessed</p>
                      <div className="mt-4 space-y-4">
                        {assessedDiagnoses.length ? (
                          assessedDiagnoses.map((group, index) => (
                            <div key={asText(group.id) || `diag-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              {asText(group.diagnosis_text) ? (
                                <p className="text-sm font-semibold text-slate-900">{asText(group.diagnosis_text)}</p>
                              ) : null}
                              {asText(group.clinical_summary) ? (
                                <p className="mt-1 text-xs text-slate-500">{asText(group.clinical_summary)}</p>
                              ) : null}
                              <div className="mt-3 flex flex-wrap gap-2">
                                {(group.lines || []).length ? (
                                  (group.lines || []).map((line) => (
                                    <span key={asText(line.mapping_id) || `${asText(line.role)}-${asText(line.diagnosis?.id)}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                      <span>{asText(line.role)}: {asText(line.diagnosis?.name)} {asText(line.diagnosis?.code)}</span>
                                      {asText(line.role) !== 'Primary' && asText(line.swap_type) ? (
                                        <button
                                          type="button"
                                          disabled={isSaving}
                                          onClick={() => void swapDiagnosis(line)}
                                          className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-amber-700 disabled:opacity-60"
                                        >
                                          Swap To Primary
                                        </button>
                                      ) : null}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-sm text-slate-500">No linked diagnoses.</span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">No assessed diagnoses found.</p>
                        )}
                      </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Diagnoses Assessed With Respective Services</p>
                      <div className="mt-4 space-y-3">
                        {serviceLinks.length ? (
                          serviceLinks.map((row, index) => (
                            <div key={asText(row.id) || `svc-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                              <span className="font-semibold text-slate-900">{asText(row.diagnosis?.name)} {asText(row.diagnosis?.code)}</span>
                              {' '}was assessed with{' '}
                              <span className="font-semibold text-slate-900">{asText(row.procedure?.name) || asText(row.description) || 'Service'}</span>
                              {asText(row.procedure?.gdrg) ? ` (${asText(row.procedure?.gdrg)})` : ''}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">No diagnosis-service mappings found.</p>
                        )}
                      </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Diagnoses Assessed And With Respective Procedures</p>
                      <div className="mt-4 space-y-3">
                        {procedureLinks.length ? (
                          procedureLinks.map((row, index) => {
                            const validity = getMappingValidityMeta(row.validity);
                            const procedureOptions = getPreferredNhisOptions(row.suggested_nhis_options, nhisProcedureOptions);
                            return (
                            <div key={asText(row.id) || `proc-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <p className="text-sm text-slate-700">
                                  <span className="font-semibold text-slate-900">{asText(row.diagnosis?.name)} {asText(row.diagnosis?.code)}</span>
                                  {' '}was assessed and{' '}
                                  <span className="font-semibold text-slate-900">{asText(row.procedure?.name) || 'Procedure'}</span>
                                  {' '}<span className="text-xs text-slate-500">{asText(row.procedure?.code)} {asText(row.procedure?.gdrg)}</span>
                                </p>
                                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${validity.className}`}>
                                  {validity.label}
                                </span>
                              </div>
                              {asText(row.correction) ? <p className="mt-2 text-xs text-amber-700">Correction: {asText(row.correction)}</p> : null}
                              {asText(row.target?.id) ? (
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <SearchableSelectField
                                    value={nhisDrafts[`procedure:${asText(row.target?.id)}`] || ''}
                                    onChange={(event) =>
                                      setNhisDrafts((current) => ({
                                        ...current,
                                        [`procedure:${asText(row.target?.id)}`]: event.target.value,
                                      }))
                                    }
                                    className="min-w-[18rem] rounded-xl border border-slate-300 px-3 py-2 text-xs"
                                  >
                                    <option value="">Select NHIS procedure</option>
                                    {procedureOptions.map((option) => (
                                      <option key={asText(option.id)} value={asText(option.id)}>
                                        {asText(option.name)} {asText(option.gdrg)}
                                      </option>
                                    ))}
                                  </SearchableSelectField>
                                  <button
                                    type="button"
                                    disabled={isSaving || !nhisDrafts[`procedure:${asText(row.target?.id)}`]}
                                    onClick={() =>
                                      void updateNhisMapping(
                                        '/legacy/manage-services/update-nhis-procedure-gdrg/',
                                        {
                                          item_id: asText(row.target?.id),
                                          nhis_item_id: nhisDrafts[`procedure:${asText(row.target?.id)}`],
                                        },
                                        'NHIS procedure mapping updated.',
                                      )
                                    }
                                    className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-60"
                                  >
                                    Save NHIS Mapping
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          )})
                        ) : (
                          <p className="text-sm text-slate-500">No diagnosis-procedure mappings found.</p>
                        )}
                      </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Diagnoses Assessed And Treated With Prescription Or Medication</p>
                      <div className="mt-4 space-y-3">
                        {medicationLinks.length ? (
                          medicationLinks.map((row, index) => {
                            const validity = getMappingValidityMeta(row.validity);
                            const medicationOptions = getPreferredNhisOptions(row.suggested_nhis_options, nhisItemOptions);
                            return (
                            <div key={asText(row.id) || `med-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <p className="text-sm text-slate-700">
                                  <span className="font-semibold text-slate-900">{asText(row.diagnosis?.name)} {asText(row.diagnosis?.code)}</span>
                                  {' '}was treated with{' '}
                                  <span className="font-semibold text-slate-900">{asText(row.medication?.name) || 'Medication'}</span>
                                  {asText(row.medication?.gdrg) ? ` (${asText(row.medication?.gdrg)})` : ''}
                                </p>
                                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${validity.className}`}>
                                  {validity.label}
                                </span>
                              </div>
                              {asText(row.target?.id) ? (
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <SearchableSelectField
                                    value={nhisDrafts[`item:${asText(row.target?.id)}`] || ''}
                                    onChange={(event) =>
                                      setNhisDrafts((current) => ({
                                        ...current,
                                        [`item:${asText(row.target?.id)}`]: event.target.value,
                                      }))
                                    }
                                    className="min-w-[18rem] rounded-xl border border-slate-300 px-3 py-2 text-xs"
                                  >
                                    <option value="">Select NHIS item</option>
                                    {medicationOptions.map((option) => (
                                      <option key={asText(option.id)} value={asText(option.id)}>
                                        {asText(option.name)} {asText(option.gdrg)}
                                      </option>
                                    ))}
                                  </SearchableSelectField>
                                  <button
                                    type="button"
                                    disabled={isSaving || !nhisDrafts[`item:${asText(row.target?.id)}`]}
                                    onClick={() =>
                                      void updateNhisMapping(
                                        '/legacy/inventory/update-nhis-item-gdrg/',
                                        {
                                          item_id: asText(row.target?.id),
                                          nhis_item_id: nhisDrafts[`item:${asText(row.target?.id)}`],
                                        },
                                        'NHIS item mapping updated.',
                                      )
                                    }
                                    className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-60"
                                  >
                                    Save NHIS Mapping
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          )})
                        ) : (
                          <p className="text-sm text-slate-500">No diagnosis-medication mappings found.</p>
                        )}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-6">
                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Add Diagnoses</p>
                      <div className="mt-3 flex gap-2">
                        <input value={diagnosisForm.item_name} onChange={(event) => setDiagnosisForm({ item_name: event.target.value })} placeholder="Diagnosis description or ICD text" className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <button type="button" disabled={isSaving || !diagnosisForm.item_name.trim()} onClick={() => void submitItem('/legacy/credit-claims/save-diagnoses/', { diagnoses_invoice_id: invoiceId, diagnoses_name: diagnosisForm.item_name.trim(), diagnoses_status_id: asText(invoice?.status_id) || '1', diagnoeses_provider_id: asText(invoice?.insurance_profile_policy_id) }, 'Diagnosis added to claim.', () => setDiagnosisForm({ item_name: '' }))} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 disabled:opacity-60">
                          Add
                        </button>
                      </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Add Medication</p>
                      <div className="mt-3 grid gap-2 md:grid-cols-[1fr_8rem_auto]">
                        <input value={medicationForm.item_name} onChange={(event) => setMedicationForm((current) => ({ ...current, item_name: event.target.value }))} placeholder="Medication name" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <input value={medicationForm.unit_cost} onChange={(event) => setMedicationForm((current) => ({ ...current, unit_cost: event.target.value }))} placeholder="Cost" inputMode="decimal" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <button type="button" disabled={isSaving || !medicationForm.item_name.trim()} onClick={() => void submitItem('/legacy/credit-claims/save-medication/', { medication_invoice_id: invoiceId, item_name: medicationForm.item_name.trim(), unit_cost: medicationForm.unit_cost || 0, medication_status_id: asText(invoice?.status_id) || '1', medication_provider_id: asText(invoice?.insurance_profile_policy_id) }, 'Medication added to claim.', () => setMedicationForm({ item_name: '', unit_cost: '' }))} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 disabled:opacity-60">
                          Add
                        </button>
                      </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Add Procedure / Service</p>
                      <div className="mt-3 grid gap-2">
                        <input value={procedureForm.item_name} onChange={(event) => setProcedureForm((current) => ({ ...current, item_name: event.target.value }))} placeholder="Procedure or service name" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <div className="grid gap-2 md:grid-cols-2">
                          <input value={procedureForm.service_stock_id} onChange={(event) => setProcedureForm((current) => ({ ...current, service_stock_id: event.target.value }))} placeholder="Service stock id (optional)" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                          <input value={procedureForm.unit_cost} onChange={(event) => setProcedureForm((current) => ({ ...current, unit_cost: event.target.value }))} placeholder="Cost" inputMode="decimal" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        </div>
                        <button type="button" disabled={isSaving || !procedureForm.item_name.trim()} onClick={() => void submitItem('/legacy/credit-claims/save-procedure-or-service/', { invoice_id: invoiceId, item_name: procedureForm.item_name.trim(), service_id: procedureForm.service_stock_id.trim(), unit_cost: procedureForm.unit_cost || 0, status_id: asText(invoice?.status_id) || '1', provider_id: asText(invoice?.insurance_profile_policy_id) }, 'Procedure or service added to claim.', () => setProcedureForm({ item_name: '', service_stock_id: '', unit_cost: '' }))} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 disabled:opacity-60">
                          Add Procedure
                        </button>
                      </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">GDRG Verification</p>
                      <div className="mt-3 grid gap-2">
                        <input value={gdrgCheck.procedure_code} onChange={(event) => setGdrgCheck((current) => ({ ...current, procedure_code: event.target.value }))} placeholder="Procedure code" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <input value={gdrgCheck.icd_code} onChange={(event) => setGdrgCheck((current) => ({ ...current, icd_code: event.target.value }))} placeholder="ICD code" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <button type="button" disabled={isSaving || (!gdrgCheck.procedure_code.trim() && !gdrgCheck.icd_code.trim())} onClick={() => void runGdrgVerification()} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 disabled:opacity-60">
                          Verify Codes
                        </button>
                      </div>
                      {gdrgResult ? (
                        <div className="mt-4 grid gap-3">
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Matches</p>
                            <div className="mt-2 space-y-2 text-xs text-slate-700">
                              {(gdrgResult.check || []).length ? (gdrgResult.check || []).map((row, index) => (
                                <div key={`${asText(row.id) || 'match'}-${index}`} className="rounded-xl border border-slate-200 bg-white px-3 py-2">{asText(row.a)} {asText(row.b)} {asText(row.c)}</div>
                              )) : <p>No direct match.</p>}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Suggestions</p>
                            <div className="mt-2 space-y-2 text-xs text-slate-700">
                              {(gdrgResult.suggestions || []).length ? (gdrgResult.suggestions || []).map((row, index) => (
                                <div key={`${asText(row.id) || 'suggestion'}-${index}`} className="rounded-xl border border-slate-200 bg-white px-3 py-2">{asText(row.b)} {asText(row.a)} {asText(row.c)}</div>
                              )) : <p>No suggestions.</p>}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </section>
                  </div>
                </div>
              ) : null}

              {activeTariffModalTab === 'investigations' ? (
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Investigations Performed</p>
                    <div className="mt-4 space-y-3">
                      {investigationLinks.length ? (
                        investigationLinks.map((row, index) => {
                          const validity = getMappingValidityMeta(row.validity);
                          const investigationOptions = getPreferredNhisOptions(row.suggested_nhis_options, nhisInvestigationOptions);
                          return (
                          <div key={asText(row.id) || `inv-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  {asText(row.lab_test?.name) || asText(row.investigation?.name) || 'Investigation'}
                                </p>
                                {asText(row.lab_test?.description) || asText(row.investigation?.description) || asText(row.description) ? (
                                  <p className="mt-1 text-xs text-slate-500">
                                    {asText(row.lab_test?.description) || asText(row.investigation?.description) || asText(row.description)}
                                  </p>
                                ) : null}
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${validity.className}`}>
                                  {validity.label}
                                </span>
                                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                  {asText(row.comment) || 'Recorded'}
                                </span>
                              </div>
                            </div>
                            {asText(row.target?.id) ? (
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <SearchableSelectField
                                  value={nhisDrafts[`investigation:${asText(row.target?.type)}:${asText(row.target?.id)}`] || ''}
                                  onChange={(event) =>
                                    setNhisDrafts((current) => ({
                                      ...current,
                                      [`investigation:${asText(row.target?.type)}:${asText(row.target?.id)}`]: event.target.value,
                                    }))
                                  }
                                  className="min-w-[18rem] rounded-xl border border-slate-300 px-3 py-2 text-xs"
                                >
                                  <option value="">Select NHIS investigation</option>
                                  {investigationOptions.map((option) => (
                                    <option key={asText(option.id)} value={asText(option.id)}>
                                      {asText(option.name)} {asText(option.gdrg)}
                                    </option>
                                  ))}
                                </SearchableSelectField>
                                <button
                                  type="button"
                                  disabled={isSaving || !nhisDrafts[`investigation:${asText(row.target?.type)}:${asText(row.target?.id)}`]}
                                  onClick={() =>
                                    void updateNhisMapping(
                                      '/legacy/manage-labs/update-nhis-investigation-gdrg/',
                                      {
                                        lab_test_id: asText(row.target?.id),
                                        type: asText(row.target?.type),
                                        nhis_investigation_id: nhisDrafts[`investigation:${asText(row.target?.type)}:${asText(row.target?.id)}`],
                                      },
                                      'NHIS investigation mapping updated.',
                                    )
                                  }
                                  className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-60"
                                >
                                  Save NHIS Mapping
                                </button>
                              </div>
                            ) : null}
                          </div>
                        )})
                      ) : (
                        <p className="text-sm text-slate-500">No investigations found.</p>
                      )}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Add Investigation</p>
                      <div className="mt-3 grid gap-2 md:grid-cols-[1fr_8rem_auto]">
                        <input value={investigationForm.item_name} onChange={(event) => setInvestigationForm((current) => ({ ...current, item_name: event.target.value }))} placeholder="Investigation name" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <input value={investigationForm.unit_cost} onChange={(event) => setInvestigationForm((current) => ({ ...current, unit_cost: event.target.value }))} placeholder="Cost" inputMode="decimal" className="rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
                        <button type="button" disabled={isSaving || !investigationForm.item_name.trim()} onClick={() => void submitItem('/legacy/credit-claims/save-investigation/', { investigation_invoice_id: invoiceId, investigation_name: investigationForm.item_name.trim(), investigation_cost: investigationForm.unit_cost || 0, investigation_status_id: asText(invoice?.status_id) || '1', investigation_provider_id: asText(invoice?.insurance_profile_policy_id) }, 'Investigation added to claim.', () => setInvestigationForm({ item_name: '', unit_cost: '' }))} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 disabled:opacity-60">
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Context</p>
                      <p className="mt-2 text-sm text-slate-600">
                        This tab focuses on performed investigations only. Diagnosis and tariff corrections remain in the other modal tabs, matching the legacy separation.
                      </p>
                    </div>
                  </section>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
