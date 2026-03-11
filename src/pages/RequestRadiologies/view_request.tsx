import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import PatientBillModal from '../../components/PatientBillModal';
import SearchableSelect from '../../components/SearchableSelect';

type GenericRow = Record<string, unknown> & { id: string };

type RequestRadiology = {
  id: string;
  patient_visit_id?: string | null;
  radiology_scan_id?: string | null;
  user_id?: string | null;
  status_id?: string | null;
  priority_id?: string | null;
  date_created?: string | null;
  comment?: string | null;
  description?: string | null;
  source?: string | null;
  invoice_id?: string | null;
  completed?: number | null;
};

type PatientVisit = {
  id: string;
  patient_id?: string | null;
  walk_in?: number | null;
  date_created?: string | null;
};

type Patient = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  folder_number?: string | null;
  code?: string | null;
  phone?: string | null;
  email?: string | null;
};

type RadiologyScan = {
  id: string;
  name?: string | null;
  value_new?: string | number | null;
  radiology_category_id?: string | null;
};

type InvoiceItem = {
  id: string;
  invoice_id?: string | null;
  final_amount?: string | number | null;
  insurance_profile_policy_id?: string | null;
  status_id?: string | null;
};

type RadiologyScanResult = {
  id: string;
  request_radiology_id?: string | null;
  report?: string | null;
  comment?: string | null;
  title?: string | null;
  date_created?: string | null;
};

type RadiologyScanFile = {
  id: string;
  name?: string | null;
  file_path?: string | null;
  file_type?: string | null;
  file_size?: number | null;
};

type UploadPreview = {
  id: string;
  file: File;
  previewUrl?: string | null;
  isImage: boolean;
  isDicom: boolean;
};

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

const resolveMediaUrl = (value: string): string => {
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

const statusBadgeClass = (statusId?: string | null): string => {
  if (String(statusId) === '24') return 'bg-rose-100 text-rose-700';
  if (String(statusId) === '23') return 'bg-emerald-100 text-emerald-700';
  if (String(statusId) === '22') return 'bg-sky-100 text-sky-700';
  if (String(statusId) === '20') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-700';
};

export default function RequestRadiologiesViewRequest() {
  const [searchParams] = useSearchParams();
  const visitId = searchParams.get('visit_id') || searchParams.get('id') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [patientVisit, setPatientVisit] = useState<PatientVisit | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [requests, setRequests] = useState<RequestRadiology[]>([]);
  const [users, setUsers] = useState<GenericRow[]>([]);
  const [statuses, setStatuses] = useState<GenericRow[]>([]);
  const [priorities, setPriorities] = useState<GenericRow[]>([]);
  const [searchScans, setSearchScans] = useState<RadiologyScan[]>([]);
  const [isSearchingScans, setIsSearchingScans] = useState(false);
  const [scanDetailsById, setScanDetailsById] = useState<Record<string, RadiologyScan>>({});
  const [categories, setCategories] = useState<GenericRow[]>([]);

  const [invoiceItemsByRequestId, setInvoiceItemsByRequestId] = useState<Record<string, InvoiceItem[]>>({});
  const [resultsByRequestId, setResultsByRequestId] = useState<Record<string, RadiologyScanResult[]>>({});
  const [filesByResultId, setFilesByResultId] = useState<Record<string, RadiologyScanFile[]>>({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPatientBillModal, setShowPatientBillModal] = useState(false);
  const [activeResultRequestId, setActiveResultRequestId] = useState<string | null>(null);
  const [activeProcessRequestId, setActiveProcessRequestId] = useState<string | null>(null);

  const [scanSearch, setScanSearch] = useState('');
  const [selectedScanIds, setSelectedScanIds] = useState<string[]>([]);
  const [addPriorityId, setAddPriorityId] = useState('1');
  const [addBillToId, setAddBillToId] = useState('-1');
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);

  const [processReport, setProcessReport] = useState('');
  const [processComment, setProcessComment] = useState('');
  const [markCompleted, setMarkCompleted] = useState(false);
  const [processUploads, setProcessUploads] = useState<UploadPreview[]>([]);
  const [existingProcessFiles, setExistingProcessFiles] = useState<RadiologyScanFile[]>([]);
  const [isSubmittingProcess, setIsSubmittingProcess] = useState(false);

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

  const scanById = useMemo(() => {
    const map = new Map<string, RadiologyScan>();
    Object.values(scanDetailsById).forEach((row) => map.set(String(row.id), row));
    return map;
  }, [scanDetailsById]);

  const categoryById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    categories.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [categories]);

  const displayedSearchScans = useMemo(() => searchScans, [searchScans]);

  const totalAmount = useMemo(
    () =>
      Object.values(invoiceItemsByRequestId)
        .flat()
        .reduce((sum, row) => sum + asNumber(row.final_amount), 0),
    [invoiceItemsByRequestId],
  );

  const patientName = `${asText(patient?.first_name)} ${asText(patient?.last_name)}`.trim() || 'Unknown Patient';
  const patientIdForActions = asText(patient?.id) || asText(patientVisit?.patient_id);
  const activeResultRows = activeResultRequestId ? resultsByRequestId[activeResultRequestId] || [] : [];

  const loadFilesForResults = async (resultRows: RadiologyScanResult[]) => {
    const entries = await Promise.all(
      resultRows.map(async (row) => {
        const resultId = asText(row.id);
        if (!resultId) return [resultId, []] as [string, RadiologyScanFile[]];
        try {
          const files = await api.get<RadiologyScanFile[]>(
            `/legacy/request-radiologies/view-scan-files/?scan_id=${encodeURIComponent(resultId)}`,
          );
          return [resultId, Array.isArray(files) ? files : []] as [string, RadiologyScanFile[]];
        } catch {
          return [resultId, []] as [string, RadiologyScanFile[]];
        }
      }),
    );

    const next: Record<string, RadiologyScanFile[]> = {};
    entries.forEach(([resultId, files]) => {
      if (resultId) next[resultId] = files;
    });
    setFilesByResultId((prev) => ({ ...prev, ...next }));
  };

  const loadView = async () => {
    if (!visitId) {
      setError('Missing visit_id in URL.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [requestRows, visit, usersRows, statusRows, priorityRows, categoryRows] = await Promise.all([
        api.get<RequestRadiology[]>(`/legacy/request-radiologies/view-request/?patient_visit_id=${encodeURIComponent(visitId)}`),
        api.get<PatientVisit>(`/patient_visits/${encodeURIComponent(visitId)}/`),
        api.get<GenericRow[]>('/users/'),
        api.get<GenericRow[]>('/statuses/'),
        api.get<GenericRow[]>('/priorities/'),
        api.get<GenericRow[]>('/radiology_categories/'),
      ]);

      const normalizedRequests = Array.isArray(requestRows) ? requestRows : [];
      setRequests(normalizedRequests);
      setPatientVisit(visit || null);
      setUsers(Array.isArray(usersRows) ? usersRows : []);
      setStatuses(Array.isArray(statusRows) ? statusRows : []);
      setPriorities(Array.isArray(priorityRows) ? priorityRows : []);
      setCategories(Array.isArray(categoryRows) ? categoryRows : []);

      const requestScanIds = Array.from(
        new Set(
          normalizedRequests
            .map((row) => asText(row.radiology_scan_id))
            .filter(Boolean),
        ),
      );
      if (requestScanIds.length > 0) {
        const scanEntries = await Promise.all(
          requestScanIds.map(async (scanId) => {
            try {
              const scan = await api.get<RadiologyScan>(`/radiology_scans/${encodeURIComponent(scanId)}/`);
              return [scanId, scan] as const;
            } catch {
              return [scanId, null] as const;
            }
          }),
        );
        setScanDetailsById((prev) => {
          const next = { ...prev };
          scanEntries.forEach(([scanId, scan]) => {
            if (scan) next[scanId] = scan;
          });
          return next;
        });
      }

      const nextPatientId = asText(visit?.patient_id);
      if (nextPatientId) {
        try {
          const patientRow = await api.get<Patient>(`/patients/${encodeURIComponent(nextPatientId)}/`);
          setPatient(patientRow || null);
        } catch {
          setPatient(null);
        }
      } else {
        setPatient(null);
      }

      const resultsEntries = await Promise.all(
        normalizedRequests.map(async (row) => {
          try {
            const resultRows = await api.get<RadiologyScanResult[]>(
              `/legacy/request-radiologies/scan-test-result/?request_scan_id=${encodeURIComponent(row.id)}`,
            );
            return [row.id, Array.isArray(resultRows) ? resultRows : []] as [string, RadiologyScanResult[]];
          } catch {
            return [row.id, []] as [string, RadiologyScanResult[]];
          }
        }),
      );
      const resultMap: Record<string, RadiologyScanResult[]> = {};
      resultsEntries.forEach(([requestId, rows]) => {
        resultMap[requestId] = rows;
      });
      setResultsByRequestId(resultMap);

      const invoiceEntries = await Promise.all(
        normalizedRequests.map(async (row) => {
          const invoiceId = asText(row.invoice_id);
          if (!invoiceId) return [row.id, []] as [string, InvoiceItem[]];
          try {
            const invoiceItems = await api.get<InvoiceItem[]>(`/invoice_items/?invoice_id=${encodeURIComponent(invoiceId)}`);
            return [row.id, Array.isArray(invoiceItems) ? invoiceItems : []] as [string, InvoiceItem[]];
          } catch {
            return [row.id, []] as [string, InvoiceItem[]];
          }
        }),
      );
      const invoiceMap: Record<string, InvoiceItem[]> = {};
      invoiceEntries.forEach(([requestId, rows]) => {
        invoiceMap[requestId] = rows;
      });
      setInvoiceItemsByRequestId(invoiceMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load radiology request view.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => {
      setError('Unable to load radiology request view.');
      setIsLoading(false);
    });
  }, [visitId]);

  useEffect(() => {
    const term = scanSearch.trim();
    if (term.length < 2) {
      setSearchScans([]);
      setIsSearchingScans(false);
      return;
    }

    let isCancelled = false;
    setIsSearchingScans(true);
    const timer = window.setTimeout(async () => {
      try {
        const rows = await api.get<RadiologyScan[]>(
          `/legacy/patients/get-radiology-scans/?searchValue=${encodeURIComponent(term)}&limit=30`,
        );
        if (!isCancelled) {
          const list = Array.isArray(rows) ? rows : [];
          setSearchScans(list);
          setScanDetailsById((prev) => {
            const next = { ...prev };
            list.forEach((row) => {
              const rowId = asText(row.id);
              if (rowId) next[rowId] = row;
            });
            return next;
          });
        }
      } catch {
        if (!isCancelled) setSearchScans([]);
      } finally {
        if (!isCancelled) setIsSearchingScans(false);
      }
    }, 350);

    return () => {
      isCancelled = true;
      window.clearTimeout(timer);
    };
  }, [scanSearch]);

  const toggleScanSelection = (scanId: string) => {
    setSelectedScanIds((prev) => (prev.includes(scanId) ? prev.filter((id) => id !== scanId) : [...prev, scanId]));
  };

  const submitAddRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patientVisit?.id) {
      setError('Patient visit is not available.');
      return;
    }
    if (selectedScanIds.length === 0) {
      setError('Select at least one scan.');
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmittingAdd(true);
    try {
      await Promise.all(
        selectedScanIds.map((scanId) =>
          api.post('/legacy/request-radiologies/add-request-radiology/', {
            id: buildId(),
            patient_visit_id: patientVisit.id,
            radiology_scan_id: scanId,
            priority_id: addPriorityId || '1',
            status_id: '20',
            is_complete: 0,
            completed: 0,
            source: addBillToId === '-1' ? 'Patient' : 'Insurance',
            date_created: new Date().toISOString(),
          }),
        ),
      );

      setSelectedScanIds([]);
      setScanSearch('');
      setSearchScans([]);
      setShowAddModal(false);
      setSuccess('Scan request(s) submitted.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit scan request(s).');
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  const openViewScanModal = async (requestId: string) => {
    setActiveResultRequestId(requestId);
    const rows = resultsByRequestId[requestId] || [];
    if (rows.length > 0) {
      await loadFilesForResults(rows);
    }
  };

  const openProcessModal = async (requestId: string) => {
    const existing = (resultsByRequestId[requestId] || [])[0];
    setProcessReport(asText(existing?.report));
    setProcessComment(asText(existing?.comment));
    setMarkCompleted(String((requests.find((row) => row.id === requestId)?.status_id || '')) === '23');
    setProcessUploads((prev) => {
      prev.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
      return [];
    });
    if (existing?.id) {
      try {
        const files = await api.get<RadiologyScanFile[]>(
          `/legacy/request-radiologies/view-scan-files/?scan_id=${encodeURIComponent(existing.id)}`,
        );
        setExistingProcessFiles(Array.isArray(files) ? files : []);
      } catch {
        setExistingProcessFiles([]);
      }
    } else {
      setExistingProcessFiles([]);
    }
    setActiveProcessRequestId(requestId);
  };

  const onProcessFilesSelected = (filesList: FileList | null) => {
    if (!filesList) return;
    const incoming = Array.from(filesList);
    if (incoming.length === 0) return;

    setProcessUploads((prev) => {
      const next = [...prev];
      incoming.forEach((file) => {
        const mime = asText(file.type).toLowerCase();
        const name = asText(file.name).toLowerCase();
        const isDicom = mime.includes('dicom') || name.endsWith('.dcm') || name.endsWith('.dicom') || name.endsWith('.ima');
        const isImage = mime.startsWith('image/') && !isDicom;
        next.push({
          id: buildId(),
          file,
          previewUrl: URL.createObjectURL(file),
          isImage,
          isDicom,
        });
      });
      return next;
    });
  };

  const removeProcessUpload = (uploadId: string) => {
    setProcessUploads((prev) => {
      const target = prev.find((row) => row.id === uploadId);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((row) => row.id !== uploadId);
    });
  };

  const submitProcessScan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeProcessRequestId) return;

    setError(null);
    setSuccess(null);
    setIsSubmittingProcess(true);
    try {
      const existing = (resultsByRequestId[activeProcessRequestId] || [])[0];
      const payload = {
        request_radiology_id: activeProcessRequestId,
        report: processReport,
        comment: processComment,
        title: 'Radiology Report',
        date_created: new Date().toISOString(),
      };

      let resultId = asText(existing?.id);
      if (existing?.id) {
        const updated = await api.patch<RadiologyScanResult>(`/radiology_scan_results/${encodeURIComponent(existing.id)}/`, payload);
        resultId = asText(updated?.id) || resultId;
      } else {
        const created = await api.post<RadiologyScanResult>('/radiology_scan_results/', {
          id: buildId(),
          ...payload,
        });
        resultId = asText(created?.id);
      }

      if (resultId && processUploads.length > 0) {
        const formData = new FormData();
        formData.append('radiology_scan_result_id', resultId);
        processUploads.forEach((upload) => {
          formData.append('files', upload.file);
        });
        await api.post('/legacy/request-radiologies/add-scan-files/', formData);
      }

      await api.patch(`/legacy/request-radiologies/process-scan/?id=${encodeURIComponent(activeProcessRequestId)}`, {
        id: activeProcessRequestId,
        status_id: markCompleted ? '23' : '22',
        completed: markCompleted ? 1 : 0,
      });

      if (markCompleted) {
        await api.patch(`/legacy/request-radiologies/complete-request-radiology/?id=${encodeURIComponent(activeProcessRequestId)}`, {
          status_id: '23',
        });
      }

      setSuccess(markCompleted ? 'Scan processed and completed.' : 'Scan processed.');
      setProcessUploads((prev) => {
        prev.forEach((item) => {
          if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        });
        return [];
      });
      setExistingProcessFiles([]);
      setActiveProcessRequestId(null);
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process scan.');
    } finally {
      setIsSubmittingProcess(false);
    }
  };

  const cancelRequest = async (requestId: string) => {
    if (!window.confirm('Cancel this scan request?')) return;
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/legacy/request-radiologies/cancel-request-radiology/?id=${encodeURIComponent(requestId)}`, {
        status_id: '24',
        completed: 0,
      });
      setSuccess('Scan request cancelled.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel scan request.');
    }
  };

  const completeRequest = async (requestId: string) => {
    if (!window.confirm('Complete this scan request?')) return;
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/legacy/request-radiologies/complete-request-radiology/?id=${encodeURIComponent(requestId)}`, {
        status_id: '23',
      });
      await api.patch(`/legacy/request-radiologies/process-scan/?id=${encodeURIComponent(requestId)}`, {
        id: requestId,
        status_id: '23',
        completed: 1,
      });
      setSuccess('Scan request completed.');
      await loadView();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to complete scan request.');
    }
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
              <>
                <Link
                  to={`/Patients/view_patient?patient_id=${encodeURIComponent(patientIdForActions)}`}
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View Patient
                </Link>
                <button
                  type="button"
                  onClick={() => setShowPatientBillModal(true)}
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Patient Bill
                </button>
              </>
            ) : (
              <span className="block w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-left text-xs font-semibold text-slate-400">
                View Patient
              </span>
            )}
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Visit Details</p>
            <p className="text-xs text-slate-600">Visit Date: {formatDateTime(patientVisit?.date_created)}</p>
            <p className="text-xs text-slate-600">Total Amount: GH₵ {totalAmount.toFixed(2)}</p>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Request Radiologies</p>
                <h1 className="text-2xl font-semibold text-slate-900">View Request</h1>
                <p className="mt-1 text-sm text-slate-600">Visit ID: {visitId || 'N/A'}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white"
                >
                  {(patientVisit?.walk_in || 0) === 1 ? 'Walk-In Scan' : 'Alternative Scan'}
                </button>
                {visitId ? (
                  <>
                    <a
                      href={`/RequestRadiologies/patient_visit_report?visit_id=${encodeURIComponent(visitId)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                    >
                      PDF Report
                    </a>
                    <a
                      href={`/legacy/request-radiologies/email-patient-visit-report/?patient_visit_id=${encodeURIComponent(visitId)}&send_email=1`}
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

          <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">Requested Scans</h2>
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
                    <th className="px-3 py-2">Radiology Scan</th>
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
                  ) : requests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-3 py-4 text-slate-500">No scan requests found for this visit.</td>
                    </tr>
                  ) : (
                    requests.map((request) => {
                      const scan = scanById.get(asText(request.radiology_scan_id));
                      const user = userById.get(asText(request.user_id));
                      const status = statusById.get(asText(request.status_id));
                      const items = invoiceItemsByRequestId[request.id] || [];

                      return (
                        <tr key={request.id} className="border-b border-slate-100">
                          <td className="px-3 py-2 text-slate-700">{formatDateTime(request.date_created)}</td>
                          <td className="px-3 py-2 text-slate-900">{asText(scan?.name) || request.radiology_scan_id || 'N/A'}</td>
                          <td className="px-3 py-2 text-slate-700">{asText(user?.first_name)} {asText(user?.last_name)}</td>
                          <td className="px-3 py-2 text-slate-700">
                            {items.length === 0 ? (
                              <span>GH₵ {asNumber(scan?.value_new).toFixed(2)}</span>
                            ) : (
                              <div className="space-y-1">
                                {items.map((item) => (
                                  <div key={item.id} className="rounded bg-slate-50 px-2 py-1 text-xs">
                                    <span className="font-semibold">
                                      {String(item.insurance_profile_policy_id) !== '-1'
                                        ? 'Insurance'
                                        : String(item.status_id) === '27'
                                          ? 'Paid'
                                          : 'Not Paid'}:
                                    </span>{' '}
                                    GH₵ {asNumber(item.final_amount).toFixed(2)}
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClass(request.status_id)}`}>
                              {idLabel(status) || `Status ${asText(request.status_id) || 'N/A'}`}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-2">
                              {String(request.status_id) !== '24' ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    openViewScanModal(request.id).catch(() => {
                                      setError('Unable to load scan results.');
                                    });
                                  }}
                                  className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
                                >
                                  View Scan
                                </button>
                              ) : null}

                              {String(request.status_id) !== '24' && String(request.status_id) !== '23' ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    openProcessModal(request.id).catch(() => {
                                      setError('Unable to open process scan modal.');
                                    });
                                  }}
                                  className="rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700"
                                >
                                  Process Scan
                                </button>
                              ) : null}

                              {String(request.status_id) === '22' ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    completeRequest(request.id).catch(() => {
                                      setError('Unable to complete scan request.');
                                    });
                                  }}
                                  className="rounded-lg border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700"
                                >
                                  Complete Scan
                                </button>
                              ) : null}

                              {(String(request.status_id) === '22' || String(request.status_id) === '23') && visitId ? (
                                <a
                                  href={`/RequestRadiologies/patient_visit_report?visit_id=${encodeURIComponent(visitId)}&request_id=${encodeURIComponent(request.id)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="rounded-lg border border-sky-300 bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-700"
                                >
                                  PDF Report
                                </a>
                              ) : null}

                              {String(request.status_id) === '20' ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    cancelRequest(request.id).catch(() => {
                                      setError('Unable to cancel scan request.');
                                    });
                                  }}
                                  className="rounded-lg border border-rose-300 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700"
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
        </div>
      </div>

      {showAddModal ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                Request {(patientVisit?.walk_in || 0) === 1 ? 'Walk-In' : 'Alternative'} Scan
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={submitAddRequest} className="space-y-4">
              <label className="block text-xs text-slate-600">
                Search Radiology Scan
                <input
                  value={scanSearch}
                  onChange={(event) => setScanSearch(event.target.value)}
                  placeholder="Type scan name..."
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>

              <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 p-2">
                {scanSearch.trim().length < 2 ? (
                  <p className="px-2 py-2 text-sm text-slate-500">Type at least 2 characters to search scans.</p>
                ) : isSearchingScans ? (
                  <p className="px-2 py-2 text-sm text-slate-500">Searching scans...</p>
                ) : displayedSearchScans.length === 0 ? (
                  <p className="px-2 py-2 text-sm text-slate-500">No scans found.</p>
                ) : (
                  displayedSearchScans.map((scan) => {
                    const checked = selectedScanIds.includes(scan.id);
                    const category = categoryById.get(asText(scan.radiology_category_id));
                    return (
                      <label key={scan.id} className="mb-1 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50">
                        <span className="text-sm text-slate-900">
                          {asText(scan.name) || scan.id}
                          <span className="ml-2 text-xs text-slate-500">{idLabel(category) || 'Uncategorized'}</span>
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-slate-600">GH₵ {asNumber(scan.value_new).toFixed(2)}</span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleScanSelection(scan.id)}
                          />
                        </span>
                      </label>
                    );
                  })
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs text-slate-600">
                  Priority
                  <SearchableSelect
                    value={addPriorityId}
                    onChange={(value) => setAddPriorityId(value)}
                    options={priorities.map((row) => ({
                      value: String(row.id),
                      label: idLabel(row),
                    }))}
                    className="mt-1"
                  />
                </label>

                <label className="text-xs text-slate-600">
                  Charge Bill To
                  <SearchableSelect
                    value={addBillToId}
                    onChange={(value) => setAddBillToId(value)}
                    options={[
                      { value: '-1', label: 'Patient' },
                      { value: 'insurance', label: 'Insurance' },
                    ]}
                    className="mt-1"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAdd}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingAdd ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}

      {activeResultRequestId ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Scan Result</h3>
              <button
                type="button"
                onClick={() => setActiveResultRequestId(null)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>

            {activeResultRows.length === 0 ? (
              <p className="text-sm text-slate-500">No scan results available yet.</p>
            ) : (
              <div className="space-y-4">
                {activeResultRows.map((row) => {
                  const files = filesByResultId[row.id] || [];
                  return (
                    <div key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">{asText(row.title) || 'Result'}</p>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">{asText(row.report) || 'No report entered.'}</p>
                      {asText(row.comment) ? <p className="mt-2 text-xs text-slate-600">Comment: {asText(row.comment)}</p> : null}

                      {files.length > 0 ? (
                        <div className="mt-3 space-y-1">
                          <p className="text-xs font-semibold text-slate-600">Attached Files</p>
                          {files.map((file) => (
                            <a
                              key={file.id}
                              href={resolveMediaUrl(asText(file.file_path))}
                              target="_blank"
                              rel="noreferrer"
                              className="block text-xs text-sky-700 underline"
                            >
                              {asText(file.name) || file.id}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      ) : null}

      <PatientBillModal
        open={showPatientBillModal}
        onClose={() => setShowPatientBillModal(false)}
        visitId={visitId}
        patientName={patientName}
      />

      {activeProcessRequestId ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
          <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Process Scan</h3>
              <button
                type="button"
                onClick={() => {
                  setProcessUploads((prev) => {
                    prev.forEach((item) => {
                      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
                    });
                    return [];
                  });
                  setExistingProcessFiles([]);
                  setActiveProcessRequestId(null);
                }}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
              >
                Close
              </button>
            </div>

            {(() => {
              const active = requests.find((row) => row.id === activeProcessRequestId) || null;
              const activeScan = active ? scanById.get(asText(active.radiology_scan_id)) : null;
              const activeCategory = activeScan ? categoryById.get(asText(activeScan.radiology_category_id)) : null;
              const activeUser = active ? userById.get(asText(active.user_id)) : null;

              return (
                <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                  <p>Category: <span className="font-semibold text-slate-900">{idLabel(activeCategory) || 'N/A'}</span></p>
                  <p className="mt-1">Radiology Scan: <span className="font-semibold text-slate-900">{asText(activeScan?.name) || 'N/A'}</span></p>
                  <p className="mt-1">Requested By: <span className="font-semibold text-slate-900">{asText(activeUser?.first_name)} {asText(activeUser?.last_name)}</span></p>
                </div>
              );
            })()}

            <form onSubmit={submitProcessScan} className="space-y-4">
              <label className="block text-xs text-slate-600">
                Report
                <textarea
                  value={processReport}
                  onChange={(event) => setProcessReport(event.target.value)}
                  rows={8}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  placeholder="Enter scan findings/report..."
                />
              </label>

              <label className="block text-xs text-slate-600">
                Comment
                <input
                  value={processComment}
                  onChange={(event) => setProcessComment(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  placeholder="Optional"
                />
              </label>

              <div className="space-y-2">
                <label className="block text-xs text-slate-600">
                  Add Images / DICOM Files
                  <input
                    type="file"
                    accept="image/*,.dcm,.dicom,.ima,application/dicom"
                    multiple
                    onChange={(event) => {
                      onProcessFilesSelected(event.target.files);
                      event.currentTarget.value = '';
                    }}
                    className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  />
                </label>

                {existingProcessFiles.length > 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-700">Existing Attached Files</p>
                    <div className="mt-2 space-y-1">
                      {existingProcessFiles.map((file) => (
                        <a
                          key={file.id}
                          href={resolveMediaUrl(asText(file.file_path))}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-xs text-sky-700 underline"
                        >
                          {asText(file.name) || file.id}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}

                {processUploads.length > 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-700">New Files (to be saved)</p>
                    <div className="mt-2 grid gap-2 md:grid-cols-2">
                      {processUploads.map((upload) => (
                        <div key={upload.id} className="rounded-lg border border-slate-200 bg-white p-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="line-clamp-1 text-xs font-semibold text-slate-800">{upload.file.name}</p>
                              <p className="text-[11px] text-slate-500">
                                {(upload.file.size / (1024 * 1024)).toFixed(2)} MB {upload.isDicom ? '| DICOM' : ''}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeProcessUpload(upload.id)}
                              className="rounded border border-rose-300 bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700"
                            >
                              Remove
                            </button>
                          </div>
                          {upload.isImage && upload.previewUrl ? (
                            <img
                              src={upload.previewUrl}
                              alt={upload.file.name}
                              className="mt-2 h-28 w-full rounded border border-slate-200 object-cover"
                            />
                          ) : (
                            <div className="mt-2 rounded border border-slate-200 bg-slate-50 px-2 py-3 text-center text-[11px] text-slate-500">
                              {upload.isDicom && upload.previewUrl ? (
                                <object
                                  data={upload.previewUrl}
                                  type={upload.file.type || 'application/dicom'}
                                  className="mx-auto block h-40 w-full rounded border border-slate-200 bg-white"
                                >
                                  <p className="px-2 py-3">Browser could not render DICOM inline.</p>
                                </object>
                              ) : null}
                              <p className="mt-2">{upload.isDicom ? 'DICOM: inline preview depends on browser support.' : 'Preview unavailable.'}</p>
                              {upload.previewUrl ? (
                                <a
                                  href={upload.previewUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-1 inline-block text-xs text-sky-700 underline"
                                >
                                  Open File
                                </a>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                <input type="checkbox" checked={markCompleted} onChange={(event) => setMarkCompleted(event.target.checked)} />
                Mark as completed
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setProcessUploads((prev) => {
                      prev.forEach((item) => {
                        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
                      });
                      return [];
                    });
                    setExistingProcessFiles([]);
                    setActiveProcessRequestId(null);
                  }}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingProcess}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingProcess ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
