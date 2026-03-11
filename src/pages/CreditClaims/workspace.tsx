import { useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type InvoiceRow = {
  id: string;
  invoice_number?: string | null;
  patient_id?: string | null;
  patient_visit_id?: string | null;
  status_id?: string | null;
  final_amount?: string | number | null;
  amount_paid?: string | number | null;
  date_added?: string | null;
  insurance_profile_policy_id?: string | null;
  provider_amount?: string | number | null;
  insurance_number?: string | null;
  insurance_card_serial?: string | null;
  claims_bucket?: 'public_nhis' | 'private' | 'company_credit';
  claims_state?: 'coding' | 'submitted' | 'flagged' | 'paid';
};

type GenericRow = Record<string, unknown> & { id: string };

type ClaimsPayload = {
  invoices?: InvoiceRow[];
  patients_by_id?: Record<string, GenericRow>;
  visits_by_id?: Record<string, GenericRow>;
  statuses_by_id?: Record<string, GenericRow>;
  policies_by_id?: Record<string, GenericRow>;
  profiles_by_id?: Record<string, GenericRow>;
  profile_types_by_id?: Record<string, GenericRow>;
  providers?: GenericRow[];
  summary?: {
    total_count?: number;
    total_final?: number;
    total_paid?: number;
    total_balance?: number;
    state_counts?: Record<string, number>;
    bucket_counts?: Record<string, number>;
  };
  pagination?: {
    page?: number;
    page_size?: number;
    count?: number;
    total_pages?: number;
    has_next?: boolean;
    has_prev?: boolean;
  };
};

type ClaimsTab = 'queue' | 'processed' | 'reconciliation';

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoney = (value: unknown) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(asNumber(value));

const formatDateTime = (value?: string | null) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
};

const claimStateLabel = (value: string) => {
  if (value === 'submitted') return 'Submitted';
  if (value === 'flagged') return 'Flagged';
  if (value === 'paid') return 'Paid';
  return 'Coding Queue';
};

const claimStateClass = (value: string) => {
  if (value === 'submitted') return 'border-sky-200 bg-sky-50 text-sky-700';
  if (value === 'flagged') return 'border-rose-200 bg-rose-50 text-rose-700';
  if (value === 'paid') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  return 'border-amber-200 bg-amber-50 text-amber-700';
};

const bucketLabel = (value: string) => {
  if (value === 'public_nhis') return 'Public NHIS';
  if (value === 'company_credit') return 'Company / Credit';
  return 'Private';
};

export default function CreditClaimsWorkspace({ defaultTab }: { defaultTab: ClaimsTab }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ClaimsTab>((() => {
    const fromQuery = asText(searchParams.get('tab')).toLowerCase();
    if (fromQuery === 'processed' || fromQuery === 'reconciliation') return fromQuery as ClaimsTab;
    return defaultTab;
  })());
  const [careType, setCareType] = useState(asText(searchParams.get('careType') || 'all').toLowerCase());
  const [payerFilter, setPayerFilter] = useState(asText(searchParams.get('payerFilter') || 'all').toLowerCase());
  const [viewFilter, setViewFilter] = useState(asText(searchParams.get('viewFilter') || 'all').toLowerCase());
  const [filterProvider, setFilterProvider] = useState(asText(searchParams.get('filterProvider') || searchParams.get('filter_provider') || ''));
  const [operationType, setOperationType] = useState(asText(searchParams.get('operationType') || '1') || '1');
  const [searchTerm, setSearchTerm] = useState(asText(searchParams.get('q') || ''));
  const [debouncedSearch, setDebouncedSearch] = useState(asText(searchParams.get('q') || ''));
  const [dateFrom, setDateFrom] = useState(asText(searchParams.get('dateFrom') || ''));
  const [dateTo, setDateTo] = useState(asText(searchParams.get('dateTo') || ''));
  const [page, setPage] = useState(Math.max(1, Number(searchParams.get('page') || 1)));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<ClaimsPayload>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedClaimIds, setSelectedClaimIds] = useState<string[]>([]);
  const [reconcileForm, setReconcileForm] = useState({
    date_received: '',
    amount: '',
    reference_number: '',
    comment: '',
  });
  const [denialForm, setDenialForm] = useState({
    denial_date: '',
    denial_reason: '',
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (activeTab !== defaultTab) query.set('tab', activeTab);
    if (careType !== 'all') query.set('careType', careType);
    if (payerFilter !== 'all') query.set('payerFilter', payerFilter);
    if (viewFilter !== 'all') query.set('viewFilter', viewFilter);
    if (filterProvider) query.set('filterProvider', filterProvider);
    if (operationType !== '1') query.set('operationType', operationType);
    if (debouncedSearch) query.set('q', debouncedSearch);
    if (dateFrom) query.set('dateFrom', dateFrom);
    if (dateTo) query.set('dateTo', dateTo);
    if (page > 1) query.set('page', String(page));
    setSearchParams(query, { replace: true });
  }, [activeTab, careType, payerFilter, viewFilter, filterProvider, operationType, debouncedSearch, dateFrom, dateTo, page, defaultTab, setSearchParams]);

  const endpoint = useMemo(() => {
    if (activeTab === 'processed') return '/legacy/credit-claims/flagged-and-submitted-claims/';
    if (activeTab === 'reconciliation') return '/legacy/credit-claims/claim-reconciliation/';
    return '/legacy/credit-claims/index/';
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (careType !== 'all') query.set('careType', careType);
      if (payerFilter !== 'all') query.set('payerFilter', payerFilter);
      if (viewFilter !== 'all') query.set('viewFilter', viewFilter);
      if (activeTab === 'reconciliation' && filterProvider) query.set('filter_provider', filterProvider);
      if (debouncedSearch) query.set('q', debouncedSearch);
      if (dateFrom) query.set('dateFrom', dateFrom);
      if (dateTo) query.set('dateTo', dateTo);
      query.set('page', String(page));
      query.set('page_size', '25');
      const data = await api.get<ClaimsPayload>(`${endpoint}?${query.toString()}`);
      setPayload(data || {});
      setSelectedClaimIds([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load claims.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [endpoint, careType, payerFilter, viewFilter, filterProvider, debouncedSearch, dateFrom, dateTo, page]);

  const rows = Array.isArray(payload.invoices) ? payload.invoices : [];
  const patientsById = payload.patients_by_id || {};
  const visitsById = payload.visits_by_id || {};
  const statusesById = payload.statuses_by_id || {};
  const policiesById = payload.policies_by_id || {};
  const profilesById = payload.profiles_by_id || {};
  const profileTypesById = payload.profile_types_by_id || {};
  const providers = Array.isArray(payload.providers) ? payload.providers : [];

  const selectedAmount = useMemo(() => {
    const selected = new Set(selectedClaimIds);
    return rows.reduce((sum, row) => {
      if (!selected.has(row.id)) return sum;
      return sum + asNumber(row.provider_amount ?? row.final_amount);
    }, 0);
  }, [rows, selectedClaimIds]);

  const clearFilters = () => {
    setCareType('all');
    setPayerFilter('all');
    setViewFilter('all');
    setFilterProvider('');
    setOperationType('1');
    setSearchTerm('');
    setDebouncedSearch('');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const toggleSelectedClaim = (invoiceId: string) => {
    setSelectedClaimIds((current) =>
      current.includes(invoiceId) ? current.filter((value) => value !== invoiceId) : [...current, invoiceId],
    );
  };

  const toggleSelectAllClaims = () => {
    if (selectedClaimIds.length === rows.length) {
      setSelectedClaimIds([]);
      return;
    }
    setSelectedClaimIds(rows.map((row) => row.id));
  };

  const submitReconciliation = async () => {
    setError(null);
    setNotice(null);
    if (!selectedClaimIds.length) {
      setError('No claim selected for reconciliation.');
      return;
    }
    if (!reconcileForm.date_received || !reconcileForm.amount) {
      setError('Date received and amount paid are required.');
      return;
    }
    try {
      await api.post('/legacy/credit-claims/make-claim-payment/', {
        selected_invoice_ids: selectedClaimIds,
        provider: filterProvider,
        amount: reconcileForm.amount,
        date_received: reconcileForm.date_received,
        reference_number: reconcileForm.reference_number,
        comment: reconcileForm.comment,
        start_date: dateFrom,
        end_date: dateTo,
        total_number: payload.summary?.total_final || 0,
      });
      setNotice('Claim payment has been successfully saved.');
      setReconcileForm({ date_received: '', amount: '', reference_number: '', comment: '' });
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Claim payment could not be saved.');
    }
  };

  const submitDenial = async () => {
    setError(null);
    setNotice(null);
    if (!selectedClaimIds.length) {
      setError('No claim selected for denial.');
      return;
    }
    if (!denialForm.denial_date || !denialForm.denial_reason.trim()) {
      setError('Date of denial and reason are required.');
      return;
    }
    try {
      await api.post('/legacy/credit-claims/deny-claim/', {
        selected_invoice_ids: selectedClaimIds,
        provider: filterProvider,
        denial_selected_amount: selectedAmount,
        denial_date: denialForm.denial_date,
        denial_reason: denialForm.denial_reason.trim(),
      });
      setNotice('Claim has been successfully denied.');
      setDenialForm({ denial_date: '', denial_reason: '' });
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Claim could not be denied.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(241,250,255,0.76))] p-6 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Billing</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">Claims</h1>
            <p className="mt-2 text-sm text-slate-600">
              Clinical coding queue, processed claims, and reconciliation are consolidated here instead of split across legacy pages.
            </p>
          </div>
          <button type="button" onClick={() => void loadData()} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Refresh
          </button>
        </div>
      </section>

      {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
      {notice ? <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{notice}</div> : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('queue');
                setPage(1);
              }}
              className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === 'queue'
                  ? 'bg-cyan-600 text-white shadow-[0_10px_24px_rgba(8,145,178,0.22)]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Coding Queue
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('processed');
                setPage(1);
              }}
              className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === 'processed'
                  ? 'bg-cyan-600 text-white shadow-[0_10px_24px_rgba(8,145,178,0.22)]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Processed
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('reconciliation');
                setPage(1);
              }}
              className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === 'reconciliation'
                  ? 'bg-cyan-600 text-white shadow-[0_10px_24px_rgba(8,145,178,0.22)]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Claim Reconciliation
            </button>
          </div>
          <p className="text-xs font-medium text-slate-500 lg:text-sm">
            {activeTab === 'queue'
              ? 'Merged OPD and inpatient coding with filters.'
              : activeTab === 'processed'
                ? 'Submitted, flagged, and paid claims using one surface.'
                : 'Review submitted versus paid amounts by payer.'}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Claims</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{Number(payload.summary?.total_count || 0)}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Total Value</p>
          <p className="mt-3 text-3xl font-black text-slate-900">GHS {formatMoney(payload.summary?.total_final)}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Collected</p>
          <p className="mt-3 text-3xl font-black text-emerald-900">GHS {formatMoney(payload.summary?.total_paid)}</p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">Outstanding</p>
          <p className="mt-3 text-3xl font-black text-amber-900">GHS {formatMoney(payload.summary?.total_balance)}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
        {activeTab === 'reconciliation' ? (
          <>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Total Records: {Number(payload.summary?.total_count || 0)}</span>
                <span className="ml-2">Page {Number(payload.pagination?.page || 1)} of {Number(payload.pagination?.total_pages || 1)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 md:justify-end">
                <span className="text-sm font-semibold text-slate-700">Advance Filter Options</span>
                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters((current) => !current)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  {showAdvancedFilters ? 'Hide Filter' : 'Show Filter'}
                </button>
              </div>
            </div>

            {showAdvancedFilters ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Start Date</span>
                    <input type="date" value={dateFrom} onChange={(event) => { setDateFrom(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">End Date</span>
                    <input type="date" value={dateTo} onChange={(event) => { setDateTo(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Provider</span>
                    <SearchableSelectField value={filterProvider} onChange={(event) => { setFilterProvider(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                      <option value="">All Providers</option>
                      {providers.map((provider) => (
                        <option key={provider.id} value={asText(provider.id)}>
                          {asText(profilesById[asText(provider.insurance_profile_id)]?.name) || 'Provider'} - {asText(provider.name) || asText(provider.id)}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recon / Denial</span>
                    <SearchableSelectField value={operationType} onChange={(event) => setOperationType(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                      <option value="1">Reconciliation</option>
                      <option value="2">Denial</option>
                    </SearchableSelectField>
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap justify-end gap-3">
                  <button type="button" onClick={() => { setPage(1); void loadData(); }} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">
                    Submit
                  </button>
                  <button type="button" onClick={clearFilters} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Search Claims</span>
                <input value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setPage(1); }} placeholder="Search patient, folder, code, or invoice number" className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Care Type</span>
                <SearchableSelectField value={careType} onChange={(event) => { setCareType(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none">
                  <option value="all">All Visits</option>
                  <option value="opd">OPD</option>
                  <option value="ipd">IPD</option>
                </SearchableSelectField>
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{activeTab === 'processed' ? 'Processed Filter' : 'Payer Filter'}</span>
                {activeTab === 'processed' ? (
                  <SearchableSelectField value={viewFilter} onChange={(event) => { setViewFilter(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none">
                    <option value="all">All Processed</option>
                    <option value="public_nhis">Public NHIS</option>
                    <option value="private">Private</option>
                    <option value="company_credit">Company / Credit</option>
                    <option value="flagged">Flagged Claims</option>
                    <option value="paid">Paid Claims</option>
                  </SearchableSelectField>
                ) : (
                  <SearchableSelectField value={payerFilter} onChange={(event) => { setPayerFilter(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none">
                    <option value="all">All Payers</option>
                    <option value="public_nhis">Public NHIS</option>
                    <option value="private">Private</option>
                    <option value="company_credit">Company / Credit</option>
                  </SearchableSelectField>
                )}
              </label>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date From</span>
                <input type="date" value={dateFrom} onChange={(event) => { setDateFrom(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date To</span>
                <input type="date" value={dateTo} onChange={(event) => { setDateTo(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none" />
              </label>
              <div className="flex items-end">
                <button type="button" onClick={clearFilters} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  Clear Filters
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Claim Register</p>
            <h2 className="mt-2 text-lg font-black text-slate-900">{activeTab === 'queue' ? 'Clinical Coding Queue' : activeTab === 'processed' ? 'Processed Claims' : 'Claim Reconciliations'}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(payload.summary?.state_counts || {}).map(([key, value]) => (
              <span key={key} className={`rounded-full border px-3 py-1 text-xs font-semibold ${claimStateClass(key)}`}>
                {claimStateLabel(key)}: {value}
              </span>
            ))}
          </div>
        </div>

        {isLoading ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Loading claims...</div> : null}
        {!isLoading && !rows.length ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No claims match the current filters.</div> : null}
        {!isLoading && rows.length && activeTab === 'reconciliation' ? (
          <div className="space-y-5">
            <div className={`rounded-2xl border px-4 py-4 ${operationType === '1' ? 'border-rose-200 bg-rose-50/40' : 'border-amber-200 bg-amber-50/40'}`}>
              <h3 className="text-base font-black text-slate-900">{operationType === '1' ? 'Submit Claim Payment To Reconcile Claims' : 'Deny Claims'}</h3>
              {operationType === '1' ? (
                <div className="mt-4 grid gap-4 md:grid-cols-6">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Expected Amount</span>
                    <input readOnly value={formatMoney(payload.summary?.total_final || 0)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Selected</span>
                    <input readOnly value={formatMoney(selectedAmount)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date Received</span>
                    <input type="date" value={reconcileForm.date_received} onChange={(event) => setReconcileForm((current) => ({ ...current, date_received: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Amount Paid</span>
                    <input type="number" min="0" step="0.01" value={reconcileForm.amount} onChange={(event) => setReconcileForm((current) => ({ ...current, amount: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ref Number</span>
                    <input value={reconcileForm.reference_number} onChange={(event) => setReconcileForm((current) => ({ ...current, reference_number: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Comment</span>
                    <input value={reconcileForm.comment} onChange={(event) => setReconcileForm((current) => ({ ...current, comment: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                </div>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-4">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Expected Amount</span>
                    <input readOnly value={formatMoney(payload.summary?.total_final || 0)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Selected</span>
                    <input readOnly value={formatMoney(selectedAmount)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date Of Denial</span>
                    <input type="date" value={denialForm.denial_date} onChange={(event) => setDenialForm((current) => ({ ...current, denial_date: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reason</span>
                    <input value={denialForm.denial_reason} onChange={(event) => setDenialForm((current) => ({ ...current, denial_reason: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  </label>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => void (operationType === '1' ? submitReconciliation() : submitDenial())}
                  className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">
                      <input type="checkbox" checked={rows.length > 0 && selectedClaimIds.length === rows.length} onChange={toggleSelectAllClaims} />
                    </th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Folder No.</th>
                    <th className="px-4 py-3">Insurance Number</th>
                    <th className="px-4 py-3">Policy</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {rows.map((row) => {
                    const visit = row.patient_visit_id ? visitsById[row.patient_visit_id] : undefined;
                    const patient = (row.patient_id ? patientsById[row.patient_id] : undefined) || (visit?.patient_id ? patientsById[String(visit.patient_id)] : undefined);
                    const policy = row.insurance_profile_policy_id ? policiesById[row.insurance_profile_policy_id] : undefined;
                    const patientName = [patient?.first_name, patient?.middle_name, patient?.last_name].map(asText).filter(Boolean).join(' ') || asText(patient?.name) || 'Unknown Patient';
                    const isIpd = Number(visit?.admitted || 0) === 1;
                    const detailPath = isIpd ? '/CreditClaims/view_claim_details_inpatient' : '/CreditClaims/view_claim_details';
                    const billPath = `/Billings/view_invoice?id=${encodeURIComponent(row.id)}&billType=insurance`;
                    const visitPath = visit?.patient_id && row.patient_visit_id ? `/Patients/visit_space?patient_id=${encodeURIComponent(asText(visit.patient_id))}&visit_id=${encodeURIComponent(row.patient_visit_id)}` : '';
                    const patientPath = row.patient_id ? `/Patients/view_patient?id=${encodeURIComponent(row.patient_id)}` : '';
                    return (
                      <tr key={row.id}>
                        <td className="px-4 py-4">
                          <input type="checkbox" checked={selectedClaimIds.includes(row.id)} onChange={() => toggleSelectedClaim(row.id)} />
                        </td>
                        <td className="px-4 py-4 text-slate-600">{formatDateTime(row.date_added)}</td>
                        <td className="px-4 py-4 font-semibold text-slate-900">{patientName}</td>
                        <td className="px-4 py-4 text-slate-600">{asText(patient?.folder_number) || 'N/A'}</td>
                        <td className="px-4 py-4 text-slate-600">{asText(row.insurance_number) || 'N/A'}</td>
                        <td className="px-4 py-4 text-slate-600">{asText(policy?.name) || 'N/A'}</td>
                        <td className="px-4 py-4 text-slate-600">{asText(statusesById[asText(row.status_id)]?.name) || asText(row.status_id) || 'N/A'}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => navigate(billPath)} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700">
                              Adjust
                            </button>
                            {visitPath ? (
                              <button type="button" onClick={() => navigate(visitPath)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                                Visit
                              </button>
                            ) : null}
                            {patientPath ? (
                              <button type="button" onClick={() => navigate(patientPath)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                                Patient
                              </button>
                            ) : null}
                            <button type="button" onClick={() => navigate(`${detailPath}?id=${encodeURIComponent(row.id)}&invoice_id=${encodeURIComponent(row.id)}&source_tab=reconciliation&is_inpatient=${isIpd ? '1' : '0'}`)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                              Open Claim
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right font-semibold text-slate-900">GHS {formatMoney(row.provider_amount ?? row.final_amount)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td colSpan={8} className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Total:</td>
                    <td className="px-4 py-3 text-right text-sm font-black text-slate-900">GHS {formatMoney(payload.summary?.total_final || 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : null}
        {!isLoading && rows.length && activeTab !== 'reconciliation' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Payer</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amounts</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {rows.map((row) => {
                  const visit = row.patient_visit_id ? visitsById[row.patient_visit_id] : undefined;
                  const patient = (row.patient_id ? patientsById[row.patient_id] : undefined) || (visit?.patient_id ? patientsById[String(visit.patient_id)] : undefined);
                  const policy = row.insurance_profile_policy_id ? policiesById[row.insurance_profile_policy_id] : undefined;
                  const profile = policy?.insurance_profile_id ? profilesById[String(policy.insurance_profile_id)] : undefined;
                  const profileType = profile?.insurance_profile_type_id ? profileTypesById[String(profile.insurance_profile_type_id)] : undefined;
                  const patientName = [patient?.first_name, patient?.middle_name, patient?.last_name].map(asText).filter(Boolean).join(' ') || asText(patient?.name) || 'Unknown Patient';
                  const patientCode = asText(patient?.code) || asText(patient?.folder_number) || 'N/A';
                  const payerName = asText(policy?.name) || asText(profile?.name) || bucketLabel(asText(row.claims_bucket || 'private'));
                  const payerType = asText(profileType?.name) || bucketLabel(asText(row.claims_bucket || 'private'));
                  const statusName = asText(statusesById[asText(row.status_id)]?.name) || asText(row.status_id) || 'N/A';
                  const isIpd = Number(visit?.admitted || 0) === 1;
                  const detailPath = isIpd ? '/CreditClaims/view_claim_details_inpatient' : '/CreditClaims/view_claim_details';
                  const detailQuery = new URLSearchParams();
                  detailQuery.set('id', row.id);
                  detailQuery.set('invoice_id', row.id);
                  detailQuery.set('source_tab', activeTab);
                  detailQuery.set('is_inpatient', isIpd ? '1' : '0');
                  if (row.patient_visit_id) detailQuery.set('patient_visit_id', row.patient_visit_id);
                  if (row.patient_id) detailQuery.set('patient_id', row.patient_id);
                  const printPdfQuery = new URLSearchParams(detailQuery);
                  printPdfQuery.set('mode', 'print');
                  const downloadPdfQuery = new URLSearchParams(detailQuery);
                  downloadPdfQuery.set('mode', 'download');
                  const printPdfHref = `/CreditClaims/claim_pdf?${printPdfQuery.toString()}`;
                  const downloadPdfHref = `/CreditClaims/claim_pdf?${downloadPdfQuery.toString()}`;
                  const canShowPdfActions = activeTab === 'processed';

                  return (
                    <tr key={row.id}>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">{patientName}</p>
                        <p className="mt-1 text-xs text-slate-500">{patientCode}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">{row.invoice_number || row.id}</p>
                        <p className="mt-1 text-xs text-slate-500">{row.patient_visit_id || 'No visit'}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-slate-900">{payerName}</p>
                        <p className="mt-1 text-xs text-slate-500">{payerType}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${claimStateClass(asText(row.claims_state || 'coding'))}`}>
                          {claimStateLabel(asText(row.claims_state || 'coding'))}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{statusName}</td>
                      <td className="px-4 py-4 text-slate-600">
                        <p>Total: GHS {formatMoney(row.final_amount)}</p>
                        <p>Paid: GHS {formatMoney(row.amount_paid)}</p>
                        <p>Bal: GHS {formatMoney(asNumber(row.final_amount) - asNumber(row.amount_paid))}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{formatDateTime(row.date_added)}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          {canShowPdfActions ? (
                            <>
                              <a
                                href={printPdfHref}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                              >
                                Print PDF
                              </a>
                              <a
                                href={downloadPdfHref}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"
                              >
                                Download PDF
                              </a>
                            </>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => navigate(`${detailPath}?${detailQuery.toString()}`)}
                            className="rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700"
                          >
                            Open Claim
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
          <span>
            Page {Number(payload.pagination?.page || 1)} of {Number(payload.pagination?.total_pages || 1)}
          </span>
          <div className="flex gap-2">
            <button type="button" disabled={!payload.pagination?.has_prev} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 disabled:opacity-50">
              Previous
            </button>
            <button type="button" disabled={!payload.pagination?.has_next} onClick={() => setPage((current) => current + 1)} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
