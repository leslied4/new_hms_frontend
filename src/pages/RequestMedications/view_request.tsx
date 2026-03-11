import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import PatientBillModal from '../../components/PatientBillModal';
import SearchableSelect from '../../components/SearchableSelect';

type GenericRow = Record<string, unknown> & { id: string };
type RequestType = 'medication' | 'prescription' | 'infusion' | 'transfusion';

type InvoiceItem = {
  id: string;
  final_amount?: string | number | null;
  unit_cost?: string | number | null;
  quantity?: string | number | null;
  status_id?: string | null;
  insurance_profile_policy_id?: string | null;
};

type RequestDisplay = {
  name?: string;
  ordered_by?: string;
  status_name?: string;
  frequency_name?: string;
  dosage_form_name?: string;
  quantity?: string | number | null;
  stock_remaining?: string | number | null;
  batch_number?: string | null;
  expiry_date?: string | null;
};

type StockOption = {
  id: string;
  item_id?: string;
  name?: string;
  full_name?: string;
  dosage?: string | null;
  dosage_form_name?: string | null;
  route_name?: string | null;
  sub_route_name?: string | null;
  unit_type_name?: string | null;
  cup?: string | null;
  least_dosage?: string | null;
  unit_selling_price?: string | number | null;
  insurance_price?: string | number | null;
  instruction?: string | null;
  direction?: string | null;
  caution?: string | null;
  stock_basket_id?: string | null;
  batch_number?: string | null;
  expiry_date?: string | null;
  quantity_left?: string | number | null;
};

type RequestBundle = {
  request: GenericRow;
  display?: RequestDisplay;
  invoice_items?: InvoiceItem[];
  stock_options?: StockOption[];
  unit_price?: string | number | null;
};

type ViewResponse = {
  patient_visit?: GenericRow | null;
  patient?: GenericRow | null;
  gender?: GenericRow | null;
  patient_image?: GenericRow | null;
  admission?: GenericRow | null;
  bed?: GenericRow | null;
  ward?: GenericRow | null;
  request_medications?: RequestBundle[];
  request_prescriptions?: RequestBundle[];
  request_infusions?: RequestBundle[];
  request_transfusions?: RequestBundle[];
  drug_administration_frequencies?: GenericRow[];
  bill_to_options?: GenericRow[];
  summary?: {
    total_amount?: number;
    medications_count?: number;
    prescriptions_count?: number;
    infusions_count?: number;
    transfusions_count?: number;
  };
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};
const fmtMoney = (value: unknown): string => `GH₵ ${asNumber(value).toFixed(2)}`;
const fmtDateTime = (value?: string | null): string => {
  if (!value) return 'N/A';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString();
};
const toIsoDate = (value: Date): string => {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const addDays = (dateValue: string, daysValue: number): string => {
  if (!dateValue || !Number.isFinite(daysValue)) return '';
  const start = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(start.getTime())) return '';
  start.setDate(start.getDate() + daysValue);
  return toIsoDate(start);
};
const diffInDays = (startValue: string, endValue: string): number | null => {
  if (!startValue || !endValue) return null;
  const start = new Date(`${startValue}T00:00:00`);
  const end = new Date(`${endValue}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};
const parseAmountUnit = (raw: unknown): { amount: number | null; unit: string | null } => {
  const text = asText(raw);
  if (!text) return { amount: null, unit: null };
  const matched = text.match(/([0-9]*\.?[0-9]+)/);
  if (!matched) return { amount: null, unit: text.toLowerCase() || null };
  const amount = Number(matched[1]);
  const unit = text.replace(matched[1], '').trim().toLowerCase();
  return { amount: Number.isFinite(amount) ? amount : null, unit: unit || null };
};
const makeId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '');
  }
  return `${Date.now()}${Math.random().toString(16).slice(2)}`;
};
const statusBadgeClass = (statusId: string): string => {
  if (statusId === '24') return 'bg-rose-100 text-rose-700';
  if (statusId === '23') return 'bg-emerald-100 text-emerald-700';
  if (statusId === '22') return 'bg-sky-100 text-sky-700';
  if (statusId === '20') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-700';
};
const resolveMediaUrl = (value?: string): string => {
  const filePath = asText(value);
  if (!filePath) return '';
  if (/^https?:\/\//i.test(filePath)) return filePath;
  const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';
  const apiUrl = new URL(apiBase, window.location.origin);
  const backendOrigin = apiUrl.origin;
  if (filePath.startsWith('/media/')) return `${backendOrigin}${filePath}`;
  if (filePath.startsWith('media/')) return `${backendOrigin}/${filePath}`;
  return `${backendOrigin}/media/${filePath.replace(/^\/+/, '')}`;
};

const requestTypeMeta: Record<RequestType, { label: string; key: keyof ViewResponse }> = {
  medication: { label: 'Medications', key: 'request_medications' },
  prescription: { label: 'Prescriptions', key: 'request_prescriptions' },
  infusion: { label: 'Infusions', key: 'request_infusions' },
  transfusion: { label: 'Transfusions', key: 'request_transfusions' },
};

export default function RequestMedicationsViewRequest() {
  const [searchParams] = useSearchParams();
  const visitId = searchParams.get('visit_id') || searchParams.get('patient_visit_id') || '';
  const [data, setData] = useState<ViewResponse | null>(null);
  const [activeType, setActiveType] = useState<RequestType>('medication');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPatientBillModal, setShowPatientBillModal] = useState(false);
  const [processing, setProcessing] = useState<{ requestType: RequestType; requestId: string } | null>(null);
  const [processQuantity, setProcessQuantity] = useState('');
  const [processComment, setProcessComment] = useState('');
  const [savingAction, setSavingAction] = useState(false);
  const [formType, setFormType] = useState<'prescription' | 'infusion' | null>(null);
  const [drugSearch, setDrugSearch] = useState('');
  const [debouncedDrugSearch, setDebouncedDrugSearch] = useState('');
  const [stockSearchRows, setStockSearchRows] = useState<StockOption[]>([]);
  const [stockSearchLoading, setStockSearchLoading] = useState(false);
  const [selectedStockRow, setSelectedStockRow] = useState<StockOption | null>(null);
  const [frequencyId, setFrequencyId] = useState('');
  const [days, setDays] = useState('1');
  const [doseAmount, setDoseAmount] = useState('');
  const [doseAmountUnit, setDoseAmountUnit] = useState('mg');
  const [doseQty, setDoseQty] = useState('');
  const [doseQtyUnit, setDoseQtyUnit] = useState('tablet');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructionInfo, setInstructionInfo] = useState('');
  const [requestComment, setRequestComment] = useState('');
  const [billToId, setBillToId] = useState('-1');
  const [servicePlaceId, setServicePlaceId] = useState('0');
  const [submittingRequest, setSubmittingRequest] = useState(false);

  const loadView = async () => {
    if (!visitId) {
      setError('Missing visit_id in URL.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<ViewResponse>(
        `/legacy/request-medications/view-request/?patient_visit_id=${encodeURIComponent(visitId)}`,
      );
      setData(response || null);
      if (!frequencyId) {
        const firstFrequency = Array.isArray(response?.drug_administration_frequencies)
          ? response.drug_administration_frequencies[0]
          : null;
        if (firstFrequency?.id) setFrequencyId(asText(firstFrequency.id));
      }
      if (!billToId || billToId === '-1') {
        const firstBillTo = Array.isArray(response?.bill_to_options) ? response.bill_to_options[0] : null;
        if (firstBillTo?.id) setBillToId(asText(firstBillTo.id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load request medications view.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => {
      setError('Unable to load request medications view.');
      setIsLoading(false);
    });
  }, [visitId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedDrugSearch(drugSearch.trim().toLowerCase()), 260);
    return () => window.clearTimeout(timer);
  }, [drugSearch]);

  const rows = useMemo(() => {
    if (!data) return [];
    const key = requestTypeMeta[activeType].key;
    const value = data[key];
    return Array.isArray(value) ? value : [];
  }, [data, activeType]);

  const patientName = useMemo(() => {
    const firstName = asText(data?.patient?.first_name);
    const lastName = asText(data?.patient?.last_name);
    return `${firstName} ${lastName}`.trim() || asText(data?.patient?.name) || 'Unknown Patient';
  }, [data?.patient]);

  const folderLabel = useMemo(() => {
    const patientType = asText(data?.patient?.patient_type);
    return patientType === '2' ? 'Code' : 'Folder Number';
  }, [data?.patient?.patient_type]);

  const folderValue = useMemo(() => {
    const patientType = asText(data?.patient?.patient_type);
    return patientType === '2' ? asText(data?.patient?.code) || 'N/A' : asText(data?.patient?.folder_number) || 'N/A';
  }, [data?.patient?.code, data?.patient?.folder_number, data?.patient?.patient_type]);

  const totalAmount = asNumber(data?.summary?.total_amount);
  const imageUrl = resolveMediaUrl(asText(data?.patient_image?.file_path));
  const patientId = asText(data?.patient?.id) || asText(data?.patient_visit?.patient_id);

  const processingBundle = useMemo(() => {
    if (!processing || !data) return null;
    const key = requestTypeMeta[processing.requestType].key;
    const list = Array.isArray(data[key]) ? (data[key] as RequestBundle[]) : [];
    return list.find((entry) => asText(entry.request?.id) === processing.requestId) || null;
  }, [data, processing]);

  const processingStockOptions = useMemo(() => {
    if (!processingBundle) return [];
    return Array.isArray(processingBundle.stock_options) ? processingBundle.stock_options : [];
  }, [processingBundle]);

  useEffect(() => {
    if (!formType) return;
    if (debouncedDrugSearch.length < 2) {
      setStockSearchRows([]);
      setStockSearchLoading(false);
      return;
    }
    let cancelled = false;
    setStockSearchLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await api.get<Record<string, unknown>>(
          `/legacy/request-medications/search-drug-stocks/?searchValue=${encodeURIComponent(debouncedDrugSearch)}&limit=40`,
        );
        if (cancelled) return;
        const results = Array.isArray(response?.results) ? (response.results as StockOption[]) : [];
        setStockSearchRows(results);
      } catch {
        if (!cancelled) setStockSearchRows([]);
      } finally {
        if (!cancelled) setStockSearchLoading(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [debouncedDrugSearch, formType]);

  useEffect(() => {
    if (!formType) return;
    const today = toIsoDate(new Date());
    if (!startDate) setStartDate(today);
    if (!endDate) {
      const dayCount = Math.max(1, asNumber(days) || 1);
      setEndDate(addDays(today, dayCount));
    }
  }, [formType, startDate, endDate, days]);

  const selectedStock = useMemo(() => {
    if (!selectedStockRow?.id) return null;
    return stockSearchRows.find((row) => asText(row.id) === asText(selectedStockRow.id)) || selectedStockRow;
  }, [stockSearchRows, selectedStockRow]);

  const selectedFrequency = useMemo(
    () => (Array.isArray(data?.drug_administration_frequencies) ? data.drug_administration_frequencies : []).find((row) => asText(row.id) === frequencyId) || null,
    [data?.drug_administration_frequencies, frequencyId],
  );

  const frequencyDosePerDay = useMemo(() => {
    if (!selectedFrequency) return null;
    const direct = Number((selectedFrequency as GenericRow).dose_per_day ?? (selectedFrequency as GenericRow).doses_per_day);
    if (Number.isFinite(direct) && direct > 0) return direct;
    const name = asText(selectedFrequency.name).toLowerCase();
    const timesDaily = name.match(/(\d+)\s*times?\s*daily/);
    if (timesDaily) {
      const parsed = Number(timesDaily[1]);
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
    const hourly = name.match(/(\d+)\s*hourly/);
    if (hourly) {
      const everyHours = Number(hourly[1]);
      if (Number.isFinite(everyHours) && everyHours > 0) return 24 / everyHours;
    }
    return null;
  }, [selectedFrequency]);

  const numberOfDoses = useMemo(() => {
    const dayCount = Math.max(1, asNumber(days) || 1);
    if (!Number.isFinite(frequencyDosePerDay || NaN) || !frequencyDosePerDay) return dayCount;
    return Math.max(1, Math.round(dayCount * frequencyDosePerDay));
  }, [days, frequencyDosePerDay]);

  const computedDoseRatio = useMemo(() => {
    const strength = parseAmountUnit(selectedStock?.dosage);
    const least = parseAmountUnit(selectedStock?.least_dosage);
    if (!Number.isFinite(strength.amount || NaN) || !Number.isFinite(least.amount || NaN)) return null;
    if (!strength.amount || !least.amount || least.amount <= 0) return null;
    return strength.amount / least.amount;
  }, [selectedStock]);

  const administerDose = useMemo(() => {
    const amount = asText(doseAmount);
    const qty = asText(doseQty);
    if (!amount || !qty) return '';
    return `${amount} ${asText(doseAmountUnit) || 'mg'} / ${qty} ${asText(doseQtyUnit) || 'tablet'}`.trim();
  }, [doseAmount, doseAmountUnit, doseQty, doseQtyUnit]);

  const quantityHint = useMemo(() => {
    const qtyValue = Number(doseQty);
    if (!Number.isFinite(qtyValue) || qtyValue <= 0 || !Number.isFinite(numberOfDoses)) return null;
    return Math.round(qtyValue * numberOfDoses * 100) / 100;
  }, [doseQty, numberOfDoses]);

  const selectedStockLabel = useMemo(() => {
    if (!selectedStock) return '';
    return asText(selectedStock.full_name) || asText(selectedStock.name) || asText(selectedStock.item_id) || asText(selectedStock.id);
  }, [selectedStock]);

  const resetRequestForm = () => {
    setDrugSearch('');
    setDebouncedDrugSearch('');
    setStockSearchRows([]);
    setSelectedStockRow(null);
    setDays('1');
    setDoseAmount('');
    setDoseAmountUnit('mg');
    setDoseQty('');
    setDoseQtyUnit('tablet');
    const today = toIsoDate(new Date());
    setStartDate(today);
    setEndDate(addDays(today, 1));
    setInstructionInfo('');
    setRequestComment('');
    setServicePlaceId('0');
  };

  const submitRequest = async () => {
    if (!visitId || !formType) return;
    if (!selectedStock?.id) {
      setError('Select an internal drug stock first.');
      return;
    }
    setSubmittingRequest(true);
    setError(null);
    setSuccess(null);
    try {
      const endpoint =
        formType === 'prescription'
          ? '/legacy/request-medications/add-request-prescription/'
          : '/legacy/request-medications/add-request-infusion/';
      const computedQuantity = asNumber(quantityHint) || 1;
      const estimatedDoses = Math.max(1, asNumber(numberOfDoses) || 1);
      const payload: Record<string, unknown> = {
        id: makeId(),
        request_type: formType,
        patient_visit_id: visitId,
        drug_stock_id: asText(selectedStock.id),
        drug_id: asText(selectedStock.item_id) || undefined,
        number_of_days: asNumber(days) || 1,
        drug_administration_frequency_id: frequencyId || undefined,
        service_place_id: servicePlaceId || '0',
        bill_to_id: billToId || '-1',
        number_of_doses: estimatedDoses,
        administer_dose: administerDose || undefined,
        drug_administration_instruction_info: instructionInfo || undefined,
        comment: requestComment || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        status_id: '20',
        quantity: computedQuantity,
      };
      if (formType === 'prescription') {
        payload.prescription_to_be_issued = estimatedDoses;
        payload.prescription_requested_quantity = computedQuantity;
      } else {
        payload.infusion_to_be_issued = estimatedDoses;
        payload.quantity_issued = estimatedDoses;
      }
      await api.post(endpoint, payload);
      setSuccess(`${formType === 'prescription' ? 'Prescription' : 'Continuous infusion'} request added.`);
      resetRequestForm();
      setFormType(null);
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add request.');
    } finally {
      setSubmittingRequest(false);
    }
  };

  const isStockAllocatedProcessType = processing?.requestType === 'prescription' || processing?.requestType === 'infusion';
  const computedProcessQuantity = useMemo(() => asNumber(processQuantity), [processQuantity]);

  const processUnitLabel = useMemo(() => {
    const raw =
      asText(processingBundle?.request?.prescription_requested_quantity_form) ||
      asText(processingBundle?.request?.quantity_issued_form) ||
      asText(processingBundle?.display?.dosage_form_name);
    return raw || 'units';
  }, [processingBundle]);

  const submitProcess = async () => {
    if (!processing || !processingBundle) return;
    const payload: Record<string, unknown> = {
      request_type: processing.requestType,
      request_id: processing.requestId,
      quantity: computedProcessQuantity > 0 ? computedProcessQuantity : undefined,
      comment: processComment || undefined,
    };
    if (isStockAllocatedProcessType) {
      const requiredQty = asNumber(
        processing.requestType === 'infusion'
          ? (processingBundle.request?.infusion_to_be_issued ?? processingBundle.display?.quantity)
          : (processingBundle.request?.prescription_to_be_issued ?? processingBundle.display?.quantity),
      );
      let text = '';
      if (requiredQty > 0 && computedProcessQuantity < requiredQty) {
        text = 'You have under fulfilled the request. Do you want to continue and ';
      } else if (requiredQty > 0 && computedProcessQuantity > requiredQty) {
        text = 'You have over fulfilled the request. Do you want to continue and ';
      }
      if (!window.confirm(`${text}Are you sure you have received payment?`)) {
        return;
      }
    }
    setSavingAction(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-medications/process-request/', payload);
      setSuccess('Request updated successfully.');
      setProcessing(null);
      setProcessQuantity('');
      setProcessComment('');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process request.');
    } finally {
      setSavingAction(false);
    }
  };

  const cancelRequest = async (requestType: RequestType, requestId: string) => {
    setSavingAction(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/request-medications/cancel-request/', {
        request_type: requestType,
        request_id: requestId,
      });
      setSuccess('Request cancelled successfully.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel request.');
    } finally {
      setSavingAction(false);
    }
  };

  if (isLoading) {
    return <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Loading request medications...</div>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-3">
            {imageUrl ? (
              <img src={imageUrl} alt={patientName} className="h-14 w-14 rounded-full border border-slate-200 object-cover" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-600">
                {patientName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-slate-900">{patientName}</p>
              <p className="text-xs text-slate-500">{folderLabel}: {folderValue}</p>
            </div>
          </div>
          <dl className="space-y-2 text-xs text-slate-700">
            <div className="flex items-center justify-between"><dt>Gender</dt><dd>{asText(data?.gender?.name) || 'N/A'}</dd></div>
            <div className="flex items-center justify-between"><dt>Age</dt><dd>{asText(data?.patient?.age) || 'N/A'}</dd></div>
            <div className="flex items-center justify-between"><dt>Date Registered</dt><dd>{fmtDateTime(asText(data?.patient?.date_created))}</dd></div>
            <div className="flex items-center justify-between"><dt>Total Amount</dt><dd className="font-semibold">{fmtMoney(totalAmount)}</dd></div>
            <div className="flex items-center justify-between"><dt>Visit Date</dt><dd>{fmtDateTime(asText(data?.patient_visit?.date_created) || asText(data?.patient_visit?.date_visited))}</dd></div>
            <div className="flex items-center justify-between"><dt>Ward</dt><dd>{asText(data?.ward?.name) || 'N/A'} {asText(data?.bed?.name) ? `(${asText(data?.bed?.name)})` : ''}</dd></div>
          </dl>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to={`/Patients/view_patient?id=${encodeURIComponent(patientId)}`} className="rounded border border-slate-300 px-2 py-1 text-center text-xs font-semibold text-slate-700">View Patient</Link>
            <button type="button" onClick={() => setShowPatientBillModal(true)} className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700">Patient Bill</button>
          </div>
        </section>
      </aside>

      <section className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Request Medications</p>
              <h1 className="text-xl font-semibold text-slate-900">View Request</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(requestTypeMeta) as RequestType[]).map((typeKey) => {
                const responseKey = requestTypeMeta[typeKey].key;
                const count = Array.isArray(data?.[responseKey]) ? (data?.[responseKey] as RequestBundle[]).length : 0;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => setActiveType(typeKey)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      activeType === typeKey ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    {requestTypeMeta[typeKey].label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {error ? <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
        {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

        <section
          className={`rounded-2xl border p-4 ${
            formType === 'prescription'
              ? 'border-rose-200 bg-rose-50/40'
              : formType === 'infusion'
                ? 'border-violet-200 bg-violet-50/40'
                : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">New Requests</p>
              <h2 className="text-base font-semibold text-slate-900">Add Prescription Or Continuous Infusion</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'prescription' ? null : 'prescription'))}
                className={`rounded px-3 py-2 text-xs font-semibold ${
                  formType === 'prescription'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                    : 'border border-rose-300 bg-white text-rose-700'
                }`}
              >
                Add Prescription
              </button>
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'infusion' ? null : 'infusion'))}
                className={`rounded px-3 py-2 text-xs font-semibold ${
                  formType === 'infusion'
                    ? 'bg-violet-700 text-white ring-2 ring-violet-200'
                    : 'border border-violet-300 bg-white text-violet-700'
                }`}
              >
                Add Continuous Infusion
              </button>
            </div>
          </div>

          {formType ? (
            <div className="mt-4">
              <div
                className={`mb-4 rounded-lg border px-3 py-2 ${
                  formType === 'prescription' ? 'border-rose-200 bg-rose-100/70' : 'border-violet-200 bg-violet-100/70'
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wide ${formType === 'prescription' ? 'text-rose-800' : 'text-violet-800'}`}>
                  {formType === 'prescription' ? 'Prescription Form Active' : 'Continuous Infusion Form Active'}
                </p>
                <p className="text-xs text-slate-700">
                  {formType === 'prescription'
                    ? 'Use this for standard medication prescriptions with dose-per-administration.'
                    : 'Use this for infusion therapy orders and timed infusion schedules.'}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="block text-xs text-slate-600 md:col-span-2">
                  {formType === 'prescription' ? 'Search Internal Drugs' : 'Search Internal Infusions'}
                  <div className={`mt-1 rounded-lg border p-2 ${selectedStock ? 'border-emerald-300 bg-emerald-50/60 ring-1 ring-emerald-200' : 'border-slate-200 bg-white'}`}>
                    <input
                      value={drugSearch}
                      onChange={(event) => {
                        setDrugSearch(event.target.value);
                        setSelectedStockRow(null);
                      }}
                      placeholder="Type at least 2 letters..."
                      className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    />
                    {selectedStock ? (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                          Selected
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-800">{selectedStockLabel || asText(selectedStock.id)}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStockRow(null);
                            setDrugSearch('');
                            setStockSearchRows([]);
                          }}
                          className="rounded border border-emerald-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
                        >
                          Clear
                        </button>
                      </div>
                    ) : null}
                    {stockSearchLoading ? <p className="mt-1 text-[11px] text-slate-500">Searching drug stocks...</p> : null}
                    {!selectedStock && stockSearchRows.length ? (
                      <div className="mt-2 max-h-44 overflow-auto rounded border border-slate-200 bg-white">
                        {stockSearchRows.map((stock) => {
                          const stockId = asText(stock.id);
                          const label = asText(stock.full_name) || asText(stock.name) || stockId;
                          const identity = [
                            asText(stock.dosage),
                            asText(stock.dosage_form_name),
                            asText(stock.sub_route_name) ? `(${asText(stock.sub_route_name)})` : '',
                          ]
                            .filter(Boolean)
                            .join(' ');
                          const meta = [
                            asText(stock.route_name) ? `Route: ${asText(stock.route_name)}` : '',
                            asText(stock.cup) ? `CUP: ${asText(stock.cup)}` : '',
                            asText(stock.quantity_left) ? `Qty: ${asText(stock.quantity_left)} ${asText(stock.unit_type_name)}` : '',
                            asText(stock.unit_selling_price) ? `Cash: GHS ${Number(asText(stock.unit_selling_price) || 0).toFixed(2)}` : '',
                            asText(stock.insurance_price) ? `Insurance: GHS ${Number(asText(stock.insurance_price) || 0).toFixed(2)}` : '',
                          ]
                            .filter(Boolean)
                            .join(' • ');
                          return (
                            <button
                              key={stockId}
                              type="button"
                              onClick={() => {
                                setSelectedStockRow(stock);
                                setStockSearchRows([]);
                                const strength = parseAmountUnit(stock.dosage);
                                const cup = parseAmountUnit(stock.cup);
                                const least = parseAmountUnit(stock.least_dosage);
                                if (Number.isFinite(strength.amount || NaN) && strength.amount) setDoseAmount(`${strength.amount}`);
                                if (asText(strength.unit)) setDoseAmountUnit(asText(strength.unit));
                                const quantitySeed = Number.isFinite(cup.amount || NaN) && cup.amount ? cup : least;
                                if (Number.isFinite(quantitySeed.amount || NaN) && quantitySeed.amount) setDoseQty(`${quantitySeed.amount}`);
                                if (asText(quantitySeed.unit)) setDoseQtyUnit(asText(quantitySeed.unit));
                                const instruction = [asText(stock.instruction), asText(stock.direction), asText(stock.caution)]
                                  .filter(Boolean)
                                  .join(' ')
                                  .trim();
                                if (instruction) setInstructionInfo(instruction);
                              }}
                              className="flex w-full items-start justify-between border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50"
                            >
                              <span className="space-y-0.5">
                                <span className="block text-xs font-semibold text-slate-800">{label}</span>
                                <span className="block text-[11px] text-slate-600">{identity || '-'}</span>
                                <span className="block text-[10px] text-slate-500">{meta || '-'}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                    {!selectedStock && !stockSearchLoading && debouncedDrugSearch.length >= 2 && !stockSearchRows.length ? (
                      <p className="mt-1 text-[11px] text-slate-500">No available drug stock found.</p>
                    ) : null}
                  </div>
                </label>

                <label className="block text-xs text-slate-600">
                  Dosage Frequency
                  <SearchableSelect
                    value={frequencyId}
                    onChange={(value) => setFrequencyId(value)}
                    options={(Array.isArray(data?.drug_administration_frequencies) ? data.drug_administration_frequencies : []).map((row) => ({
                      value: asText(row.id),
                      label: asText(row.name) || asText(row.description) || asText(row.id),
                    }))}
                    placeholder="Select frequency"
                    className="mt-1"
                  />
                </label>

                <label className="block text-xs text-slate-600">
                  {formType === 'prescription' ? 'Administer Per Dose' : 'Administer Infusion Dose'}
                  <div className="mt-1 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2">
                    <input
                      value={doseAmount}
                      onChange={(event) => {
                        const next = event.target.value;
                        setDoseAmount(next);
                        const amount = Number(next);
                        if (computedDoseRatio && Number.isFinite(amount) && amount > 0) {
                          setDoseQty(`${Math.round((amount / computedDoseRatio) * 100) / 100}`);
                        }
                      }}
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Amount"
                      className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input value={doseAmountUnit} onChange={(event) => setDoseAmountUnit(event.target.value)} className="w-20 rounded border border-slate-300 px-2 py-2 text-sm" />
                    <input
                      value={doseQty}
                      onChange={(event) => {
                        const next = event.target.value;
                        setDoseQty(next);
                        const qtyValue = Number(next);
                        if (computedDoseRatio && Number.isFinite(qtyValue) && qtyValue > 0) {
                          setDoseAmount(`${Math.round(qtyValue * computedDoseRatio * 100) / 100}`);
                        }
                      }}
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Quantity"
                      className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input value={doseQtyUnit} onChange={(event) => setDoseQtyUnit(event.target.value)} className="w-24 rounded border border-slate-300 px-2 py-2 text-sm" />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">{administerDose || 'Enter dose and quantity to build the administer value.'}</p>
                </label>

                <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
                  <label className="block text-xs text-slate-600">
                    Start Date
                    <input
                      value={startDate}
                      onChange={(event) => {
                        const nextStart = event.target.value;
                        setStartDate(nextStart);
                        const dayCount = Math.max(0, asNumber(days));
                        if (nextStart && Number.isFinite(dayCount)) {
                          const nextEnd = addDays(nextStart, dayCount);
                          if (nextEnd) setEndDate(nextEnd);
                        }
                      }}
                      type="date"
                      className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-xs text-slate-600">
                    Number Of Days
                    <input
                      value={days}
                      onChange={(event) => {
                        const next = event.target.value;
                        setDays(next);
                        const nextDays = Number(next);
                        if (startDate && Number.isFinite(nextDays) && nextDays >= 0) {
                          const nextEnd = addDays(startDate, nextDays);
                          if (nextEnd) setEndDate(nextEnd);
                        }
                      }}
                      type="number"
                      min={1}
                      className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    />
                    <p className="mt-1 text-[11px] text-slate-500">Estimated doses: {numberOfDoses}</p>
                  </label>
                  <label className="block text-xs text-slate-600">
                    End Date
                    <input
                      value={endDate}
                      onChange={(event) => {
                        const nextEnd = event.target.value;
                        setEndDate(nextEnd);
                        const diff = diffInDays(startDate, nextEnd);
                        if (diff !== null && diff >= 0) setDays(`${diff}`);
                      }}
                      type="date"
                      className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                {quantityHint ? (
                  <p className="text-[11px] text-slate-500 md:col-span-2">Computed quantity: {quantityHint}</p>
                ) : null}

                <label className="block text-xs text-slate-600">
                  Charge Bill To
                  <SearchableSelect
                    value={billToId}
                    onChange={(value) => setBillToId(value)}
                    options={(Array.isArray(data?.bill_to_options) ? data.bill_to_options : []).map((row) => ({
                      value: asText(row.id),
                      label: asText(row.name) || asText(row.id),
                    }))}
                    placeholder="Select bill to"
                    className="mt-1"
                  />
                </label>

                <label className="block text-xs text-slate-600">
                  Service Place
                  <SearchableSelect
                    value={servicePlaceId}
                    onChange={(value) => setServicePlaceId(value)}
                    options={[
                      { value: '0', label: 'Place 1' },
                      { value: '1', label: 'Place 2' },
                    ]}
                    className="mt-1"
                  />
                </label>

                <label className="block text-xs text-slate-600 md:col-span-2">
                  Dosage Instruction Information
                  <textarea
                    value={instructionInfo}
                    onChange={(event) => setInstructionInfo(event.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    placeholder={formType === 'prescription' ? 'Prescription dosing instructions' : 'Infusion instructions / rate notes'}
                  />
                </label>

                <label className="block text-xs text-slate-600 md:col-span-2">
                  Instruction / Comment
                  <textarea
                    value={requestComment}
                    onChange={(event) => setRequestComment(event.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    placeholder={formType === 'prescription' ? 'Additional prescription comment' : 'Additional infusion comment'}
                  />
                </label>

                <div className="flex flex-wrap gap-2 md:col-span-2">
                  <button
                    type="button"
                    onClick={submitRequest}
                    disabled={submittingRequest}
                    className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    {submittingRequest ? 'Saving...' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetRequestForm();
                      setFormType(null);
                    }}
                    className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Requested</th>
                  <th className="px-3 py-2 text-left font-semibold">Item</th>
                  <th className="px-3 py-2 text-left font-semibold">Ordered By</th>
                  <th className="px-3 py-2 text-left font-semibold">Price</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                  <th className="px-3 py-2 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-4 text-slate-500">No {requestTypeMeta[activeType].label.toLowerCase()} found.</td>
                  </tr>
                ) : (
                  rows.map((row) => {
                    const request = row.request || {};
                    const display = row.display || {};
                    const statusId = asText(request.status_id);
                    const requestId = asText(request.id);
                    const invoices = Array.isArray(row.invoice_items) ? row.invoice_items : [];
                    const canProcess = statusId === '20' && asText(request.external_medication) !== '1';
                    return (
                      <tr key={requestId || Math.random().toString()} className="border-t border-slate-100 align-top">
                        <td className="px-3 py-2 text-slate-700">{fmtDateTime(asText(request.date_created))}</td>
                        <td className="px-3 py-2 text-slate-900">
                          <p className="font-semibold">{asText(display.name) || 'N/A'}</p>
                          <p className="text-[11px] text-slate-500">
                            {asText(display.frequency_name) || 'No frequency'}{asText(display.dosage_form_name) ? ` • ${asText(display.dosage_form_name)}` : ''}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Qty: {asText(display.quantity) || 'N/A'} • Stock: {asText(display.stock_remaining) || 'N/A'}
                          </p>
                        </td>
                        <td className="px-3 py-2 text-slate-700">{asText(display.ordered_by) || 'N/A'}</td>
                        <td className="px-3 py-2">
                          {invoices.length === 0 ? <span className="text-slate-500">N/A</span> : (
                            <div className="space-y-1">
                              {invoices.map((invoiceItem) => (
                                <div key={invoiceItem.id} className="rounded border border-slate-200 bg-slate-50 px-2 py-1">
                                  <p className="text-[11px] font-semibold text-slate-700">{fmtMoney(invoiceItem.final_amount)}</p>
                                  <p className="text-[10px] text-slate-500">
                                    {asText(invoiceItem.insurance_profile_policy_id) !== '-1' ? 'Insurance' : (asText(invoiceItem.status_id) === '27' ? 'Paid' : 'Not Paid')}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${statusBadgeClass(statusId)}`}>
                            {asText(display.status_name) || statusId || 'N/A'}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-1">
                            {canProcess ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setProcessing({ requestType: activeType, requestId });
                                  const estimated =
                                    asText(request.number_of_doses) ||
                                    asText(request.prescription_to_be_issued) ||
                                    asText(request.infusion_to_be_issued);
                                  const requested = asText(display.quantity) || asText(request.quantity);
                                  setProcessQuantity(estimated || requested || '1');
                                  setProcessComment(asText(request.comment));
                                }}
                                className="rounded border border-sky-300 bg-sky-50 px-2 py-1 text-[11px] font-semibold text-sky-700"
                              >
                                Process
                              </button>
                            ) : null}
                            {statusId === '20' ? (
                              <button
                                type="button"
                                onClick={() => cancelRequest(activeType, requestId)}
                                disabled={savingAction}
                                className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700 disabled:opacity-50"
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
        </div>
      </section>

      {processing ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-base font-semibold text-slate-900">Process {requestTypeMeta[processing.requestType].label.slice(0, -1)}</h3>
            <div className="mt-3 space-y-3">
              {processingBundle ? (
                <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">{asText(processingBundle.display?.name) || 'N/A'}</p>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    <p><span className="font-semibold">Ordered By:</span> {asText(processingBundle.display?.ordered_by) || 'N/A'}</p>
                    <p><span className="font-semibold">Requested On:</span> {fmtDateTime(asText(processingBundle.request?.date_created))}</p>
                    <p><span className="font-semibold">Frequency:</span> {asText(processingBundle.display?.frequency_name) || 'N/A'}</p>
                    <p><span className="font-semibold">Status:</span> {asText(processingBundle.display?.status_name) || asText(processingBundle.request?.status_id) || 'N/A'}</p>
                    {processing.requestType === 'prescription' ? (
                      <p><span className="font-semibold">Unit Of Pricing:</span> {processUnitLabel}</p>
                    ) : null}
                    <p>
                      <span className="font-semibold">Estimated Dosage:</span>{' '}
                      {asText(processingBundle.request?.number_of_doses) || asText(processingBundle.display?.quantity) || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Administer Dose:</span>{' '}
                      {asText(processingBundle.request?.administer_dose) || asText(processingBundle.request?.administer_infusion) || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity Requested:</span>{' '}
                      {processing.requestType === 'infusion'
                        ? (asText(processingBundle.request?.quantity) || (Array.isArray(processingBundle.invoice_items) ? asText(processingBundle.invoice_items[0]?.quantity) : '') || 'N/A')
                        : `${asText(processingBundle.request?.prescription_requested_quantity) || 'N/A'} ${processUnitLabel}`}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity Required:</span>{' '}
                      {processing.requestType === 'infusion'
                        ? (asText(processingBundle.request?.infusion_to_be_issued) || asText(processingBundle.display?.quantity) || 'N/A')
                        : `${asText(processingBundle.request?.prescription_to_be_issued) || asText(processingBundle.display?.quantity) || 'N/A'} ${processUnitLabel}`}
                    </p>
                  </div>
                  <p className="mt-2"><span className="font-semibold">Request Comment:</span> {asText(processingBundle.request?.comment) || 'N/A'}</p>
                </div>
              ) : null}
              {processingStockOptions.length > 0 ? (
                <div className="rounded border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-600">
                  <p>
                    Available stock records: <span className="font-semibold text-slate-800">{processingStockOptions.length}</span>
                  </p>
                  <div className="mt-1 space-y-1">
                    {processingStockOptions.slice(0, 3).map((option) => (
                      <p key={asText(option.id)}>
                        {asText(option.name) || 'Stock'} • Qty: {asText(option.quantity_left) || '0'}
                        {asText(option.batch_number) ? ` • Batch: ${asText(option.batch_number)}` : ''}
                        {asText(option.expiry_date) ? ` • Exp: ${fmtDateTime(asText(option.expiry_date))}` : ''}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}
              <label className="block text-xs text-slate-700">
                Quantity To Dispense
                <input
                  value={processQuantity}
                  onChange={(event) => setProcessQuantity(event.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
                <p className="mt-1 text-[11px] text-slate-500">You can increase or reduce quantity before saving.</p>
              </label>
              {processing.requestType === 'prescription' ? (
                <p className="text-[11px] text-slate-500">
                  Quantity Dispensed: <span className="font-semibold text-slate-700">{computedProcessQuantity}</span> {processUnitLabel}
                </p>
              ) : null}
              <p className="text-[11px] text-slate-500">
                Unit Price: <span className="font-semibold text-slate-700">{fmtMoney(processingBundle?.unit_price)}</span>
              </p>
              <label className="block text-xs text-slate-700">
                Final Amount (GH₵)
                <input
                  value={(asNumber(processingBundle?.unit_price) * computedProcessQuantity).toFixed(2)}
                  readOnly
                  className="mt-1 w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                />
              </label>
              <p className="text-[11px] text-slate-500">
                Calculation: {computedProcessQuantity} × {fmtMoney(processingBundle?.unit_price)}
              </p>
              <label className="block text-xs text-slate-700">
                Comment
                <textarea value={processComment} onChange={(event) => setProcessComment(event.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setProcessing(null);
                }}
                className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <button type="button" onClick={submitProcess} disabled={savingAction} className="rounded bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                {savingAction ? 'Saving...' : 'Save'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <PatientBillModal
        open={showPatientBillModal}
        onClose={() => setShowPatientBillModal(false)}
        visitId={visitId}
        patientName={patientName}
      />
    </div>
  );
}
