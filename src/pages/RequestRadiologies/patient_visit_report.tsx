import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRow = Record<string, unknown>;

type ReportRequest = {
  request_radiology: GenericRow;
  radiology_scan: GenericRow | null;
  radiology_category: GenericRow | null;
  status: GenericRow | null;
  priority: GenericRow | null;
  ordered_by: GenericRow | null;
  radiology_scan_results: GenericRow[];
};

type ReportGroup = {
  id?: string;
  name?: string;
  requests: ReportRequest[];
};

type ReportResponse = {
  patient_visit: GenericRow | null;
  patient: GenericRow | null;
  settings: GenericRow | null;
  selected_invoice: GenericRow | null;
  investigation_group: ReportGroup[];
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatDate = (value: unknown): string => {
  const text = asText(value);
  if (!text) return 'N/A';
  const dt = new Date(text);
  if (Number.isNaN(dt.getTime())) return text;
  return dt.toLocaleString();
};

const backendOrigin = (() => {
  const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';
  return new URL(apiBase, window.location.origin).origin;
})();

const toMediaUrl = (pathLike: unknown): string => {
  const value = asText(pathLike);
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/media/')) return `${backendOrigin}${value}`;
  if (value.startsWith('media/')) return `${backendOrigin}/${value}`;
  if (value.startsWith('uploads/')) return `${backendOrigin}/media/${value}`;
  if (value.startsWith('/img/')) return `${backendOrigin}${value}`;
  if (value.startsWith('img/')) return `${backendOrigin}/${value}`;
  return `${backendOrigin}/media/${value}`;
};

const isImageFile = (row: GenericRow): boolean => {
  const type = asText(row.file_type).toLowerCase();
  const format = asText(row.file_format).toLowerCase();
  const path = asText(row.file_path).toLowerCase();
  return (
    type.startsWith('image/') ||
    format.includes('png') ||
    format.includes('jpg') ||
    format.includes('jpeg') ||
    format.includes('gif') ||
    format.includes('webp') ||
    /\.(png|jpe?g|gif|webp)$/i.test(path)
  );
};

const getDisplayName = (row: GenericRow | null | undefined): string => {
  if (!row) return 'N/A';
  const first = asText(row.first_name);
  const last = asText(row.last_name);
  const full = `${first} ${last}`.trim();
  return full || asText(row.full_name) || 'N/A';
};

export default function RequestRadiologiesPatientVisitReport() {
  const [searchParams] = useSearchParams();
  const visitId = searchParams.get('visit_id') || searchParams.get('id') || '';
  const requestId = searchParams.get('request_id') || searchParams.get('request_radiology_id') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReportResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!visitId) {
        setError('Missing visit_id.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ visit_id: visitId });
        if (requestId) params.set('request_id', requestId);
        const response = await api.get<ReportResponse>(`/legacy/request-radiologies/patient-visit-report/?${params.toString()}`);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load scan report.');
      } finally {
        setIsLoading(false);
      }
    };
    load().catch(() => {
      setError('Unable to load scan report.');
      setIsLoading(false);
    });
  }, [visitId, requestId]);

  const patientName = useMemo(() => {
    const patient = data?.patient || {};
    return `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim() || 'N/A';
  }, [data?.patient]);

  const insuranceAmount = useMemo(() => {
    const invoice = data?.selected_invoice || {};
    const raw = invoice.insurance_invoice_items;
    if (!Array.isArray(raw)) return 0;
    return raw.reduce((sum, row) => {
      const item = row as GenericRow;
      return sum + asNumber(item.unit_cost) * asNumber(item.quantity || 1);
    }, 0);
  }, [data?.selected_invoice]);

  const referralDoctor = useMemo(() => {
    const groups = data?.investigation_group || [];
    for (const group of groups) {
      for (const req of group.requests || []) {
        const name = getDisplayName(req.ordered_by);
        if (name !== 'N/A') return name;
      }
    }
    return 'N/A';
  }, [data?.investigation_group]);

  if (isLoading) return <div className="p-6 text-sm text-slate-600">Loading report...</div>;
  if (error) return <div className="p-6 text-sm text-rose-700">{error}</div>;

  const patient = data?.patient || {};
  const visit = data?.patient_visit || {};
  const settings = data?.settings || {};
  const selectedInvoice = data?.selected_invoice || {};

  return (
    <div className="mx-auto max-w-6xl space-y-6 bg-white p-6 text-slate-900">
      <style>{'@media print { .print-hide { display: none !important; } body { background: #fff !important; } }'}</style>

      <div className="print-hide flex justify-end">
        <button type="button" onClick={() => window.print()} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
          Print
        </button>
      </div>

      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-semibold">{asText(settings.institution) || 'Medical Scan Report'}</h1>
        <p className="text-sm">{asText(settings.name)}</p>
        <p className="text-sm">{asText(settings.address)}</p>
        <p className="text-sm">Tel: {asText(settings.phone1) || 'N/A'}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Patient Information</p>
          <p className="mt-2 font-semibold">{patientName}</p>
          <p className="text-sm">{asText(patient.home_address) || 'N/A'}</p>
          <p className="text-sm">{asText(patient.email) || 'N/A'}</p>
          <p className="text-sm">{asText(patient.phone) || 'N/A'}</p>
          <p className="mt-2 text-sm">Patient Number: {asText(patient.folder_number) || asText(patient.code) || 'N/A'}</p>
          <p className="text-sm">Date of Birth: {formatDate(patient.date_of_birth)}</p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Visit Information</p>
          <p className="mt-2 text-sm">Date / Time: {formatDate(visit.date_created)}</p>
          <p className="text-sm">Referral Facility: {asText(visit.guarantor_name) || asText(visit.referring_facility) || 'N/A'}</p>
          <p className="text-sm">Referral Doctor: {referralDoctor}</p>
          <p className="text-sm">Payer: N/A</p>
          <p className="text-sm">CoPay: GH₵ {insuranceAmount.toFixed(2)}</p>
          <p className="text-sm">Patient Pay: GH₵ {asNumber(selectedInvoice.final_amount).toFixed(2)}</p>
        </div>
      </section>

      {(data?.investigation_group || []).map((group, groupIndex) => (
        <section key={`${group.id || groupIndex}`} className="space-y-3">
          <h2 className="border-b border-slate-200 pb-2 text-base font-semibold">{asText(group.name) || 'Scan Group'}</h2>
          {(group.requests || []).map((entry, entryIndex) => {
            const scanName = asText(entry.radiology_scan?.name) || `Scan ${entryIndex + 1}`;
            const results = Array.isArray(entry.radiology_scan_results) ? entry.radiology_scan_results : [];
            return (
              <article key={`${asText(entry.request_radiology?.id) || entryIndex}`} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{scanName}</h3>
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{asText(entry.status?.name) || asText(entry.request_radiology?.status_id) || 'N/A'}</span>
                </div>
                <p className="text-xs text-slate-500">Requested by: {getDisplayName(entry.ordered_by)}</p>
                <p className="text-xs text-slate-500">Priority: {asText(entry.priority?.name) || asText(entry.request_radiology?.priority_id) || 'N/A'}</p>

                {results.length === 0 ? (
                  <p className="mt-3 text-sm text-slate-500">No scan results captured yet.</p>
                ) : (
                  <div className="mt-3 space-y-4">
                    {results.map((result, resultIndex) => {
                      const files = Array.isArray(result.radiology_scan_files) ? (result.radiology_scan_files as GenericRow[]) : [];
                      return (
                        <div key={`${asText(result.id) || resultIndex}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <p className="text-sm font-semibold">{asText(result.title) || 'Scan Result'}</p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{asText(result.report) || 'No report entered.'}</p>
                          {asText(result.comment) ? <p className="mt-2 text-xs text-slate-600">Comment: {asText(result.comment)}</p> : null}

                          {files.length > 0 ? (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-semibold text-slate-600">Attached Files</p>
                              <div className="grid gap-3 md:grid-cols-2">
                                {files.map((file) => {
                                  const fileId = asText(file.id) || `${asText(result.id)}-${asText(file.file_path)}-${asText(file.name)}`;
                                  const fileUrl = toMediaUrl(file.file_path);
                                  const name = asText(file.name) || 'File';
                                  const image = isImageFile(file);
                                  return (
                                    <div key={fileId} className="rounded border border-slate-200 bg-white p-2">
                                      <p className="truncate text-xs font-medium text-slate-700">{name}</p>
                                      {image && fileUrl ? (
                                        <img src={fileUrl} alt={name} className="mt-2 h-48 w-full rounded border border-slate-200 object-cover" />
                                      ) : (
                                        <p className="mt-2 text-xs text-slate-500">Preview unavailable for this format.</p>
                                      )}
                                      {fileUrl ? (
                                        <a href={fileUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-sky-700">
                                          Open File
                                        </a>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ))}

      <footer className="border-t border-slate-200 pt-3 text-xs text-slate-600">
        <p className="mb-2">
          Test Limitation: Radiology results should be interpreted with full clinical context and correlated with examination findings.
        </p>
        <p>This is a confidential medical report. Unauthorized disclosure is prohibited.</p>
      </footer>
    </div>
  );
}
