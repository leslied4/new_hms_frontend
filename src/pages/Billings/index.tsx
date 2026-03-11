import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type InvoiceRow = {
  id: string;
  invoice_number?: string | null;
  patient_id?: string | null;
  patient_visit_id?: string | null;
  status_id?: string | null;
  final_amount?: string | number | null;
  amount_paid?: string | number | null;
  date_added?: string | null;
};

type PatientRow = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  name?: string | null;
  folder_number?: string | null;
  code?: string | null;
};

type VisitRow = {
  id: string;
  patient_id?: string | null;
  admitted?: number | null;
};

type GenericRow = Record<string, unknown> & { id: string };
type PaginationInfo = {
  page: number;
  page_size: number;
  count: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

type BillingsIndexDetailedResponse = {
  invoices?: InvoiceRow[];
  patients_by_id?: Record<string, PatientRow>;
  visits_by_id?: Record<string, VisitRow>;
  statuses_by_id?: Record<string, GenericRow>;
  summary?: {
    total_final?: number;
    total_paid?: number;
    total_balance?: number;
  };
  pagination?: Partial<PaginationInfo>;
};

type BillType = 'all' | 'pending' | 'part' | 'full';
type CareType = 'all' | 'opd' | 'ipd';

const asText = (value: unknown): string => String(value ?? '').trim();

const normalizeId = (value: unknown): string => {
  const text = asText(value);
  if (text.endsWith('.0')) return text.slice(0, -2);
  return text;
};

const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const asInt = (value: string | null, fallback: number): number => {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const formatDateTime = (value?: string | null): string => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString();
};

const normalizeBillType = (value: string): BillType => {
  if (value === 'pending' || value === 'part' || value === 'full') return value;
  return 'all';
};

const normalizeCareType = (value: string): CareType => {
  if (value === 'opd' || value === 'ipd') return value;
  return 'all';
};

const defaultPagination: PaginationInfo = {
  page: 1,
  page_size: 20,
  count: 0,
  total_pages: 1,
  has_next: false,
  has_prev: false,
};

export default function BillingsIndex() {
  const params = useParams<{ billType?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialBillType = normalizeBillType(asText(params.billType || searchParams.get('billType') || 'all').toLowerCase());
  const initialCareType = normalizeCareType(asText(searchParams.get('careType') || 'all').toLowerCase());
  const initialSearch = asText(searchParams.get('q') || '');
  const initialDateFrom = asText(searchParams.get('dateFrom') || '');
  const initialDateTo = asText(searchParams.get('dateTo') || '');
  const initialPage = asInt(searchParams.get('page'), 1);
  const initialPageSize = asInt(searchParams.get('pageSize'), 20);

  const [billType, setBillType] = useState<BillType>(initialBillType);
  const [careType, setCareType] = useState<CareType>(initialCareType);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [dateFrom, setDateFrom] = useState(initialDateFrom);
  const [dateTo, setDateTo] = useState(initialDateTo);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rows, setRows] = useState<InvoiceRow[]>([]);
  const [statusesById, setStatusesById] = useState<Record<string, GenericRow>>({});
  const [patientsById, setPatientsById] = useState<Record<string, PatientRow>>({});
  const [visitsById, setVisitsById] = useState<Record<string, VisitRow>>({});
  const [pagination, setPagination] = useState<PaginationInfo>(defaultPagination);
  const [summary, setSummary] = useState({ total_final: 0, total_paid: 0, total_balance: 0 });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (billType !== 'all') query.set('billType', billType);
    if (careType !== 'all') query.set('careType', careType);
    if (debouncedSearch) query.set('q', debouncedSearch);
    if (dateFrom) query.set('dateFrom', dateFrom);
    if (dateTo) query.set('dateTo', dateTo);
    if (page > 1) query.set('page', String(page));
    if (pageSize !== 20) query.set('pageSize', String(pageSize));
    setSearchParams(query, { replace: true });
  }, [billType, careType, debouncedSearch, dateFrom, dateTo, page, pageSize, setSearchParams]);

  const loadView = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (billType !== 'all') query.set('billType', billType);
      if (careType !== 'all') query.set('careType', careType);
      if (debouncedSearch) query.set('q', debouncedSearch);
      if (dateFrom) query.set('dateFrom', dateFrom);
      if (dateTo) query.set('dateTo', dateTo);
      query.set('page', String(page));
      query.set('page_size', String(pageSize));
      query.set('detailed', '1');

      const payload = await api.get<InvoiceRow[] | BillingsIndexDetailedResponse>(`/legacy/billings/index/?${query.toString()}`);

      if (Array.isArray(payload)) {
        setRows(payload);
        setPatientsById({});
        setVisitsById({});
        setStatusesById({});
        const pageFinal = payload.reduce((acc, row) => acc + asNumber(row.final_amount), 0);
        const pagePaid = payload.reduce((acc, row) => acc + asNumber(row.amount_paid), 0);
        setSummary({
          total_final: pageFinal,
          total_paid: pagePaid,
          total_balance: Math.max(pageFinal - pagePaid, 0),
        });
        setPagination({
          page,
          page_size: pageSize,
          count: payload.length,
          total_pages: 1,
          has_next: false,
          has_prev: page > 1,
        });
      } else {
        const invoices = Array.isArray(payload?.invoices) ? payload.invoices : [];
        setRows(invoices);
        setPatientsById(payload?.patients_by_id ?? {});
        setVisitsById(payload?.visits_by_id ?? {});
        setStatusesById(payload?.statuses_by_id ?? {});
        setSummary({
          total_final: asNumber(payload?.summary?.total_final),
          total_paid: asNumber(payload?.summary?.total_paid),
          total_balance: asNumber(payload?.summary?.total_balance),
        });
        setPagination({
          page: Number(payload?.pagination?.page || page),
          page_size: Number(payload?.pagination?.page_size || pageSize),
          count: Number(payload?.pagination?.count || 0),
          total_pages: Number(payload?.pagination?.total_pages || 1),
          has_next: Boolean(payload?.pagination?.has_next),
          has_prev: Boolean(payload?.pagination?.has_prev),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load billings.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadView().catch(() => {
      setError('Unable to load billings.');
      setIsLoading(false);
    });
  }, [billType, careType, debouncedSearch, dateFrom, dateTo, page, pageSize]);

  const badgeClass = (statusId: string): string => {
    if (statusId === '27') return 'bg-emerald-100 text-emerald-700';
    if (statusId === '26') return 'bg-amber-100 text-amber-700';
    if (statusId === '19') return 'bg-rose-100 text-rose-700';
    return 'bg-slate-100 text-slate-700';
  };

  const onBillTypeChange = (value: BillType) => {
    setBillType(value);
    setPage(1);
  };

  const onCareTypeChange = (value: CareType) => {
    setCareType(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setDateFrom('');
    setDateTo('');
    setBillType('all');
    setCareType('all');
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Billings</p>
            <h1 className="text-2xl font-semibold text-slate-900">Billing Invoices</h1>
            <p className="mt-1 text-sm text-slate-600">Paginated and filterable invoice listing.</p>
          </div>
          <button
            type="button"
            onClick={() => loadView()}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Refresh
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Payment Status</p>
            <div className="flex flex-wrap gap-2">
              {([
                { key: 'all', label: 'All' },
                { key: 'pending', label: 'Pending' },
                { key: 'part', label: 'Part Payment' },
                { key: 'full', label: 'Paid' },
              ] as Array<{ key: BillType; label: string }>).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onBillTypeChange(item.key)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                    billType === item.key ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Care Type</p>
            <div className="flex flex-wrap gap-2">
              {([
                { key: 'all', label: 'All' },
                { key: 'opd', label: 'OPD' },
                { key: 'ipd', label: 'IPD' },
              ] as Array<{ key: CareType; label: string }>).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onCareTypeChange(item.key)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                    careType === item.key ? 'bg-sky-600 text-white' : 'border border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search patient, folder, code, invoice"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700"
          />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700"
          />
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Filtered Final Amount</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">GH₵ {summary.total_final.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Filtered Paid</p>
          <p className="mt-2 text-xl font-semibold text-emerald-700">GH₵ {summary.total_paid.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Filtered Outstanding</p>
          <p className="mt-2 text-xl font-semibold text-rose-700">GH₵ {summary.total_balance.toFixed(2)}</p>
        </div>
      </section>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            {pagination.count} record(s) total | Page {pagination.page} of {pagination.total_pages}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="page-size" className="text-slate-600">Rows:</label>
            <SearchableSelect
              value={String(pageSize)}
              onChange={(value) => {
                setPageSize(asInt(value, 20));
                setPage(1);
              }}
              options={[
                { value: '20', label: '20' },
                { value: '50', label: '50' },
                { value: '100', label: '100' },
              ]}
              className="min-w-[92px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Invoice #</th>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Visit Type</th>
                <th className="px-3 py-2">Final</th>
                <th className="px-3 py-2">Paid</th>
                <th className="px-3 py-2">Balance</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-3 py-4 text-slate-500">Loading invoices...</td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-4 text-slate-500">No invoices found for the selected filters.</td>
                </tr>
              ) : (
                rows.map((row) => {
                  const patientId = normalizeId(row.patient_id);
                  const visitId = normalizeId(row.patient_visit_id);
                  const visit = visitsById[visitId] ?? visitsById[asText(row.patient_visit_id)];
                  const visitPatientId = normalizeId(visit?.patient_id);
                  const patient =
                    patientsById[patientId] ??
                    patientsById[asText(row.patient_id)] ??
                    patientsById[visitPatientId] ??
                    patientsById[asText(visit?.patient_id)];
                  const statusId = asText(row.status_id);
                  const status = statusesById[statusId];
                  const finalAmount = asNumber(row.final_amount);
                  const paidAmount = asNumber(row.amount_paid);
                  const balance = Math.max(finalAmount - paidAmount, 0);
                  const patientName =
                    `${asText(patient?.first_name)} ${asText(patient?.middle_name)} ${asText(patient?.last_name)}`.trim() ||
                    asText(patient?.name) ||
                    patientId ||
                    visitPatientId ||
                    'N/A';

                  return (
                    <tr key={row.id} className="border-b border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{formatDateTime(row.date_added)}</td>
                      <td className="px-3 py-2 text-slate-900">{asText(row.invoice_number) || row.id}</td>
                      <td className="px-3 py-2 text-slate-700">
                        <p>{patientName}</p>
                        <p className="text-xs text-slate-500">
                          {asText(patient?.folder_number) || 'N/A'} / {asText(patient?.code) || 'N/A'}
                        </p>
                      </td>
                      <td className="px-3 py-2 text-slate-700">{visit ? (Number(visit.admitted || 0) === 1 ? 'IPD' : 'OPD') : 'N/A'}</td>
                      <td className="px-3 py-2 text-slate-900">GH₵ {finalAmount.toFixed(2)}</td>
                      <td className="px-3 py-2 text-emerald-700">GH₵ {paidAmount.toFixed(2)}</td>
                      <td className="px-3 py-2 text-rose-700">GH₵ {balance.toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(statusId)}`}>
                          {asText(status?.name) || statusId || 'N/A'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <a
                          href={`/Billings/view_invoice?id=${encodeURIComponent(row.id)}`}
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!pagination.has_prev || isLoading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <p className="text-xs text-slate-600">
            Page {pagination.page} / {pagination.total_pages}
          </p>
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!pagination.has_next || isLoading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
