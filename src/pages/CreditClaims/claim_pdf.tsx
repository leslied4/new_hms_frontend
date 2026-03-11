import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRow = Record<string, unknown> & { id?: string };

type ClaimItem = GenericRow & {
  id: string;
  item_name?: string | null;
  quantity?: string | number | null;
  unit_cost?: string | number | null;
  final_amount?: string | number | null;
  status_id?: string | null;
  item_type?: { name?: string } | null;
  status?: { name?: string } | null;
};

type DetailPayload = {
  invoice?: GenericRow | null;
  visit?: GenericRow | null;
  patient?: GenericRow | null;
  insurance?: {
    policy?: GenericRow | null;
    profile?: GenericRow | null;
    profile_type?: GenericRow | null;
    coverage_options?: Array<{
      id?: string;
      selected?: boolean;
      insurance_number?: string;
      guarantor_name?: string;
      insurance_card_serial?: string;
      insurance_card_name?: string;
    }>;
  } | null;
  items?: ClaimItem[];
  summary?: {
    active_total?: number;
    amount_paid?: number;
    remaining_amount?: number;
    item_count?: number;
  };
  claim_state?: string;
  claim_bucket?: string;
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

const formatDate = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString();
};

const formatDateTime = (value: unknown): string => {
  const raw = asText(value);
  if (!raw) return 'N/A';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleString();
};

const getFullName = (row: GenericRow | null | undefined): string => {
  if (!row) return 'N/A';
  const combined = [row.first_name, row.middle_name, row.last_name].map(asText).filter(Boolean).join(' ');
  return combined || asText(row.full_name) || asText(row.name) || 'N/A';
};

const bucketLabel = (value: string) => {
  if (value === 'public_nhis') return 'Public NHIS';
  if (value === 'company_credit') return 'Company / Credit';
  return 'Private';
};

const stateLabel = (value: string) => {
  if (value === 'paid') return 'Paid';
  if (value === 'submitted') return 'Submitted';
  if (value === 'flagged') return 'Flagged';
  return 'Coding';
};

export default function CreditClaimsClaimPdfPage() {
  const [searchParams] = useSearchParams();
  const invoiceId = asText(searchParams.get('id') || searchParams.get('invoice_id'));
  const isInpatient = asText(searchParams.get('is_inpatient')) === '1';
  const mode = asText(searchParams.get('mode')).toLowerCase();
  const [payload, setPayload] = useState<DetailPayload>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const printedRef = useRef(false);

  const endpoint = isInpatient
    ? '/legacy/credit-claims/view-claim-details-inpatient/'
    : '/legacy/credit-claims/view-claim-details/';

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!invoiceId) {
        setError('Missing invoice id.');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.get<DetailPayload>(`${endpoint}?id=${encodeURIComponent(invoiceId)}`);
        if (!cancelled) {
          setPayload(data || {});
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load claim PDF.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [endpoint, invoiceId]);

  useEffect(() => {
    if (printedRef.current) return;
    if (isLoading || error || !payload.invoice) return;
    if (mode !== 'print' && mode !== 'download') return;
    printedRef.current = true;
    window.setTimeout(() => window.print(), 250);
  }, [mode, isLoading, error, payload.invoice]);

  const invoice = payload.invoice || null;
  const visit = payload.visit || null;
  const patient = payload.patient || null;
  const insurance = payload.insurance || null;
  const items = useMemo(
    () => (Array.isArray(payload.items) ? payload.items.filter((row) => asText(row.status_id) !== '2') : []),
    [payload.items],
  );
  const selectedCoverage = useMemo(
    () =>
      (Array.isArray(insurance?.coverage_options) ? insurance?.coverage_options : []).find((row) => Boolean(row.selected)) || null,
    [insurance?.coverage_options],
  );
  const groupedItems = useMemo(() => {
    const groups = new Map<string, ClaimItem[]>();
    for (const row of items) {
      const label = asText(row.item_type?.name) || 'Other';
      const bucket = groups.get(label) || [];
      bucket.push(row);
      groups.set(label, bucket);
    }
    return Array.from(groups.entries()).map(([label, rows]) => ({
      label,
      rows,
      subtotal: rows.reduce((sum, row) => sum + asNumber(row.final_amount), 0),
    }));
  }, [items]);
  const patientName = getFullName(patient);
  const isMale = ['male', '1'].includes(asText(patient?.gender_name).toLowerCase()) || asText(patient?.gender_id) === '1';
  const isFemale = ['female', '2'].includes(asText(patient?.gender_name).toLowerCase()) || asText(patient?.gender_id) === '2';

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm print:max-w-none print:rounded-none print:border-0 print:p-6 print:shadow-none">
        {isLoading ? <div className="text-sm text-slate-500">Loading claim PDF...</div> : null}
        {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

        {!isLoading && !error ? (
          <>
            <header className="border-b-2 border-black pb-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black text-[11px] font-black uppercase tracking-[0.18em] text-slate-900">
                    NHIS
                  </div>
                  <div>
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">National Insurance Scheme</p>
                    <h1 className="mt-1 text-2xl font-black text-slate-900">Claim Form</h1>
                    <p className="text-sm font-semibold text-slate-700">(Regulation 62)</p>
                  </div>
                </div>
                <div className="grid gap-1 text-sm text-slate-800">
                  <div><span className="font-semibold">Form No:</span> {asText(invoice?.invoice_number) || invoiceId || 'N/A'}</div>
                  <div><span className="font-semibold">Date Of Claim:</span> {formatDate(invoice?.date_added)}</div>
                  <div><span className="font-semibold">Claim State:</span> {stateLabel(asText(payload.claim_state))}</div>
                </div>
              </div>
            </header>

            <section className="grid gap-4 border-b-2 border-black py-4 md:grid-cols-[1.1fr_1fr]">
              <div className="border-2 border-black">
                <div className="border-b-2 border-black px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-800">Client Information</div>
                <div className="grid gap-2 px-3 py-3 text-sm text-slate-800">
                  <div className="grid grid-cols-[9rem_1fr] gap-2">
                    <span className="font-semibold">Surname</span>
                    <span>{asText(patient?.last_name) || patientName}</span>
                  </div>
                  <div className="grid grid-cols-[9rem_1fr] gap-2">
                    <span className="font-semibold">Other Names</span>
                    <span>{[patient?.first_name, patient?.middle_name].map(asText).filter(Boolean).join(' ') || patientName}</span>
                  </div>
                  <div className="grid grid-cols-[9rem_1fr] gap-2">
                    <span className="font-semibold">Date of Birth</span>
                    <span>{formatDate(patient?.date_of_birth)}</span>
                  </div>
                  <div className="grid grid-cols-[9rem_1fr] gap-2">
                    <span className="font-semibold">Hospital Record No</span>
                    <span>{asText(patient?.folder_number) || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-[9rem_1fr] gap-2">
                    <span className="font-semibold">Patient Code</span>
                    <span>{asText(patient?.patient_code) || asText(patient?.code) || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                <div className="border-2 border-black">
                  <div className="border-b-2 border-black px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-800">Scheme Details</div>
                  <div className="grid gap-2 px-3 py-3 text-sm text-slate-800">
                    <div className="grid grid-cols-[9rem_1fr] gap-2">
                      <span className="font-semibold">Scheme Name</span>
                      <span>{asText(insurance?.profile?.name) || bucketLabel(asText(payload.claim_bucket))}</span>
                    </div>
                    <div className="grid grid-cols-[9rem_1fr] gap-2">
                      <span className="font-semibold">Policy</span>
                      <span>{asText(insurance?.policy?.name) || 'N/A'}</span>
                    </div>
                    <div className="grid grid-cols-[9rem_1fr] gap-2">
                      <span className="font-semibold">Member Number</span>
                      <span>{asText(selectedCoverage?.insurance_number) || 'N/A'}</span>
                    </div>
                    <div className="grid grid-cols-[9rem_1fr] gap-2">
                      <span className="font-semibold">Card Serial</span>
                      <span>{asText(selectedCoverage?.insurance_card_serial) || 'N/A'}</span>
                    </div>
                    <div className="grid grid-cols-[9rem_1fr] gap-2">
                      <span className="font-semibold">Guarantor</span>
                      <span>{asText(selectedCoverage?.guarantor_name) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-black px-3 py-3">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-800">Gender</p>
                  <div className="mt-3 space-y-3 text-sm text-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-black text-sm font-black">{isMale ? 'X' : ''}</span>
                      <span className="font-semibold">Male</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-black text-sm font-black">{isFemale ? 'X' : ''}</span>
                      <span className="font-semibold">Female</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 border-b-2 border-black py-4 md:grid-cols-[1.15fr_0.85fr]">
              <div className="border-2 border-black">
                <div className="border-b-2 border-black px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-800">Service Provided</div>
                <div className="grid gap-3 px-3 py-3 text-sm text-slate-800">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-black text-sm font-black">{!isInpatient ? 'X' : ''}</span>
                      <span className="font-semibold">Out-Patient</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-black text-sm font-black">{isInpatient ? 'X' : ''}</span>
                      <span className="font-semibold">In-Patient</span>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-black text-sm font-black">X</span>
                      <span className="font-semibold">All Inclusive</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-black text-sm font-black"></span>
                      <span className="font-semibold">Diagnostic</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-black text-sm font-black"></span>
                      <span className="font-semibold">Pharmacy</span>
                    </div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div><span className="font-semibold">Visit Date:</span> {formatDateTime(visit?.date_created || visit?.date_added)}</div>
                    <div><span className="font-semibold">Visit Claim Code:</span> {asText(visit?.claim_code) || 'Not set'}</div>
                  </div>
                </div>
              </div>
              <div className="border-2 border-black">
                <div className="border-b-2 border-black px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-800">Claim Totals</div>
                <div className="grid gap-2 px-3 py-3 text-sm text-slate-800">
                  <div className="grid grid-cols-[8rem_1fr] gap-2">
                    <span className="font-semibold">Payer Type</span>
                    <span>{bucketLabel(asText(payload.claim_bucket))}</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr] gap-2">
                    <span className="font-semibold">Items</span>
                    <span>{Number(payload.summary?.item_count || items.length)}</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr] gap-2">
                    <span className="font-semibold">Active Total</span>
                    <span>GHS {formatMoney(payload.summary?.active_total)}</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr] gap-2">
                    <span className="font-semibold">Paid</span>
                    <span>GHS {formatMoney(payload.summary?.amount_paid)}</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr] gap-2">
                    <span className="font-semibold">Outstanding</span>
                    <span>GHS {formatMoney(payload.summary?.remaining_amount)}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-4">
              <div className="border-2 border-black">
                <div className="border-b-2 border-black px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-800">
                  Services Provided (to be filled in by all health care providers)
                </div>

                {groupedItems.length ? (
                  <div className="space-y-4 px-3 py-3">
                    {groupedItems.map((group) => (
                      <div key={group.label}>
                        <div className="flex items-center justify-between gap-3 border-2 border-black bg-slate-50 px-3 py-2">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{group.label}</p>
                            <p className="text-xs text-slate-600">{group.rows.length} item(s)</p>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">GHS {formatMoney(group.subtotal)}</p>
                        </div>
                        <table className="mt-2 min-w-full border-collapse text-left text-sm">
                          <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-700">
                            <tr>
                              <th className="border-2 border-black px-3 py-2">Item / Service</th>
                              <th className="border-2 border-black px-3 py-2">Status</th>
                              <th className="border-2 border-black px-3 py-2">Qty</th>
                              <th className="border-2 border-black px-3 py-2">Unit Cost</th>
                              <th className="border-2 border-black px-3 py-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.rows.map((row) => (
                              <tr key={row.id}>
                                <td className="border-2 border-black px-3 py-2 font-semibold text-slate-900">{asText(row.item_name) || 'Unnamed item'}</td>
                                <td className="border-2 border-black px-3 py-2 text-slate-700">{asText(row.status?.name) || 'Active'}</td>
                                <td className="border-2 border-black px-3 py-2 text-slate-700">{asNumber(row.quantity)}</td>
                                <td className="border-2 border-black px-3 py-2 text-slate-700">GHS {formatMoney(row.unit_cost)}</td>
                                <td className="border-2 border-black px-3 py-2 font-semibold text-slate-900">GHS {formatMoney(row.final_amount)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-6 text-sm text-slate-500">
                    No active claim items available.
                  </div>
                )}
              </div>
            </section>

            <section className="grid gap-4 pt-2 md:grid-cols-2">
              <div className="border-2 border-black px-3 py-3 text-sm text-slate-800">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-800">Attestation</p>
                <p className="mt-2 leading-6">
                  I certify that the above services were rendered to the named patient under the stated insurance coverage and the
                  claim lines reflect the active tariff items attached to this invoice.
                </p>
              </div>
              <div className="border-2 border-black px-3 py-3 text-sm text-slate-800">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-800">Reference</p>
                <div className="mt-2 grid gap-2">
                  <div><span className="font-semibold">Invoice Number:</span> {asText(invoice?.invoice_number) || invoiceId || 'N/A'}</div>
                  <div><span className="font-semibold">Processed On:</span> {formatDateTime(invoice?.date_added)}</div>
                  <div><span className="font-semibold">Claim Bucket:</span> {bucketLabel(asText(payload.claim_bucket))}</div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
