import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type InvoiceItem = {
  id: string;
  item_name?: string | null;
  item_type_id?: string | null;
  quantity?: number | string | null;
  quantity_x?: number | string | null;
  unit_cost?: number | string | null;
  discount?: number | string | null;
  final_amount?: number | string | null;
  status_id?: string | null;
};

type Invoice = {
  id: string;
  invoice_number?: string | null;
  patient_visit_id?: string | null;
  parent_invoice_id?: string | number | null;
  amount?: number | string | null;
  discount?: number | string | null;
  discount_percentage?: number | string | null;
  vat_rate?: number | string | null;
  vat?: number | string | null;
  final_amount?: number | string | null;
  amount_paid?: number | string | null;
  date_added?: string | null;
  due_date?: string | null;
  items?: InvoiceItem[];
};

type GenericRow = Record<string, unknown> & { id: string };
type PatientVisit = { id: string; patient_id?: string | null; date_created?: string | null };
type Patient = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  folder_number?: string | null;
  code?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
};
type FacilitySetting = { institution?: string | null; address?: string | null };

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoney = (value: unknown): string => `GHS ${asNumber(value).toFixed(2)}`;

const formatDate = (value?: string | null): string => {
  if (!value) return 'N/A';
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return 'N/A';
  return dt.toLocaleString();
};

const calcAge = (dob?: string | null): string => {
  if (!dob) return 'N/A';
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return 'N/A';
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    years -= 1;
  }
  return years >= 0 ? String(years) : 'N/A';
};

export default function BillingsNewBillingReport() {
  const [searchParams] = useSearchParams();
  const invoiceId = asText(searchParams.get('id'));
  const type = asText(searchParams.get('type')).toLowerCase();
  const mode = asText(searchParams.get('mode')).toLowerCase();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visit, setVisit] = useState<PatientVisit | null>(null);
  const [itemTypes, setItemTypes] = useState<GenericRow[]>([]);
  const [facility, setFacility] = useState<FacilitySetting | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!invoiceId) {
        setError('Missing invoice id.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const [invoiceData, itemTypeRows] = await Promise.all([
          api.get<Invoice>(`/legacy/billings/view-invoice/?id=${encodeURIComponent(invoiceId)}${type ? `&type=${encodeURIComponent(type)}` : ''}`),
          api.get<GenericRow[]>('/invoice_item_types/'),
        ]);

        setInvoice(invoiceData || null);
        setItemTypes(Array.isArray(itemTypeRows) ? itemTypeRows : []);

        try {
          const settingsRows = await api.get<FacilitySetting[] | { results?: FacilitySetting[] }>('/settings/');
          const rows = Array.isArray(settingsRows) ? settingsRows : Array.isArray(settingsRows?.results) ? settingsRows.results : [];
          setFacility(rows[0] || null);
        } catch {
          setFacility(null);
        }

        const visitId = asText(invoiceData?.patient_visit_id);
        if (!visitId) {
          setVisit(null);
          setPatient(null);
          return;
        }

        try {
          const visitData = await api.get<PatientVisit>(`/patient_visits/${encodeURIComponent(visitId)}/`);
          setVisit(visitData || null);
          const patientId = asText(visitData?.patient_id);
          if (!patientId) {
            setPatient(null);
            return;
          }
          const patientData = await api.get<Patient>(`/patients/${encodeURIComponent(patientId)}/`);
          setPatient(patientData || null);
        } catch {
          setVisit(null);
          setPatient(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load report.');
      } finally {
        setIsLoading(false);
      }
    };

    load().catch(() => {
      setError('Unable to load report.');
      setIsLoading(false);
    });
  }, [invoiceId, type]);

  const itemTypeMap = useMemo(() => {
    const map = new Map<string, string>();
    itemTypes.forEach((row) => map.set(String(row.id), asText(row.name)));
    return map;
  }, [itemTypes]);

  const invoiceItems = useMemo(() => {
    const raw = Array.isArray(invoice?.items) ? invoice.items : [];
    return raw.filter((item) => String(item.status_id) !== '24');
  }, [invoice?.items]);

  const groupedItems = useMemo(() => {
    const groups = new Map<string, InvoiceItem[]>();
    invoiceItems.forEach((item) => {
      const key = asText(item.item_type_id) || 'unknown';
      const current = groups.get(key) || [];
      current.push(item);
      groups.set(key, current);
    });
    return Array.from(groups.entries()).map(([typeId, rows]) => ({
      typeId,
      typeName: itemTypeMap.get(typeId) || 'Uncategorized',
      rows,
    }));
  }, [invoiceItems, itemTypeMap]);

  const totals = useMemo(() => {
    const billable = invoiceItems.filter((item) => ['1', '26', '27'].includes(String(item.status_id)) || asNumber(invoice?.parent_invoice_id) > 0);
    const subTotal = billable.reduce((sum, item) => sum + (asNumber(item.unit_cost) * (asNumber(item.quantity_x) || asNumber(item.quantity))), 0);
    const rowDiscount = billable.reduce((sum, item) => sum + asNumber(item.discount), 0);
    const pct = asNumber(invoice?.discount_percentage);
    const discountValue = pct > 0 ? (subTotal * pct) / 100 : (asNumber(invoice?.discount) > 0 ? asNumber(invoice?.discount) : rowDiscount);
    const preVat = Math.max(subTotal - discountValue, 0);
    // VAT is temporarily disabled.
    const vatRate = 0;
    const vat = 0;
    const total = asNumber(invoice?.final_amount) > 0 ? asNumber(invoice?.final_amount) : preVat;
    const amountPaid = asNumber(invoice?.amount_paid);
    return {
      subTotal,
      discountValue,
      vatRate,
      vat,
      total,
      amountPaid,
      remaining: Math.max(total - amountPaid, 0),
    };
  }, [invoiceItems, invoice]);

  const patientName = `${asText(patient?.first_name)} ${asText(patient?.last_name)}`.trim() || 'N/A';
  const treatmentSummary = groupedItems.map((group) => group.typeName).join(', ') || 'N/A';

  useEffect(() => {
    if (!isLoading && !error && (mode === 'download' || mode === 'print')) {
      const timer = window.setTimeout(() => {
        window.print();
      }, 300);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [error, isLoading, mode]);

  return (
    <div className="mx-auto max-w-6xl space-y-4 pb-8">
      <style>{'@media print { .print-hide { display: none !important; } .app-shell-chrome { display: none !important; } .app-shell-main { padding: 0 !important; } .app-glow-bg { background: #fff !important; } body { background: #fff !important; } }'}</style>
      <div className="print-hide flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Print Invoice
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
        >
          Download / Save PDF
        </button>
      </div>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-sky-600 px-6 py-5 text-white">
          <h1 className="text-2xl font-semibold">INVOICE</h1>
          <span className="rounded-md bg-white/25 px-3 py-1 text-sm font-semibold">#{asText(invoice?.invoice_number) || invoiceId || 'N/A'}</span>
        </header>

        <div className="space-y-5 px-6 py-6">
          {isLoading ? (
            <p className="text-sm text-slate-600">Loading invoice report...</p>
          ) : (
            <>
              <section className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-sky-700">From / Sponsor</h3>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Facility:</span> {asText(facility?.institution) || 'Hospital'}</p>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Sponsor:</span> Self-Pay</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-sky-700">Patient Details</h3>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Full Name:</span> {patientName}</p>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Patient ID:</span> {asText(patient?.code) || asText(patient?.folder_number) || 'N/A'}</p>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Age:</span> {calcAge(patient?.date_of_birth)}</p>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Contact:</span> {asText(patient?.phone) || 'N/A'}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-sky-700">Invoice & Visit Details</h3>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Invoice Date:</span> {formatDate(invoice?.date_added)}</p>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Due Date:</span> {formatDate(invoice?.due_date)}</p>
                  <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Service Date:</span> {formatDate(visit?.date_created || invoice?.date_added)}</p>
                </div>
              </section>

              <section className="rounded-lg bg-slate-50 p-4">
                <h3 className="mb-1 text-sm font-semibold text-sky-700">Visit & Treatment Information</h3>
                <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">Treatment Summary:</span> {treatmentSummary}</p>
              </section>

              <section className="overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                    <tr>
                      <th className="px-3 py-2 text-center">#</th>
                      <th className="px-3 py-2">Item Name</th>
                      <th className="px-3 py-2 text-right">Quantity</th>
                      <th className="px-3 py-2 text-right">Unit Cost</th>
                      <th className="px-3 py-2 text-right">Discount</th>
                      <th className="px-3 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-3 py-4 text-center text-sm text-slate-500">No invoice items found.</td>
                      </tr>
                    ) : (
                      groupedItems.map((group) => (
                        <FragmentGroup
                          key={group.typeId}
                          title={group.typeName}
                          rows={group.rows}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </section>

              <section className="ml-auto w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between"><span className="text-slate-600">Sub Total</span><span className="font-medium text-slate-900">{formatMoney(totals.subTotal)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-slate-600">Discount</span><span className="font-medium text-slate-900">{formatMoney(totals.discountValue)}</span></div>
                  {/* VAT row temporarily hidden */}
                  <div className="border-t border-slate-300 pt-2 text-base font-semibold">
                    <div className="flex items-center justify-between"><span>Total</span><span>{formatMoney(totals.total)}</span></div>
                  </div>
                  <div className="flex items-center justify-between"><span className="text-slate-600">Amount Paid</span><span className="font-medium text-emerald-700">{formatMoney(totals.amountPaid)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-slate-600">Remaining</span><span className="font-medium text-rose-700">{formatMoney(totals.remaining)}</span></div>
                </div>
              </section>
            </>
          )}
        </div>

        <footer className="border-t border-slate-200 px-6 py-3 text-center text-xs text-slate-500">
          Powered By Firstline24
        </footer>
      </article>
    </div>
  );
}

function FragmentGroup({ title, rows }: { title: string; rows: InvoiceItem[] }) {
  return (
    <>
      <tr className="bg-slate-100">
        <td colSpan={6} className="px-3 py-2 text-sm font-semibold text-slate-900">{title}</td>
      </tr>
      {rows.map((item, index) => {
        const qty = asNumber(item.quantity_x) || asNumber(item.quantity);
        const lineTotal = asNumber(item.final_amount) > 0 ? asNumber(item.final_amount) : asNumber(item.unit_cost) * qty;
        return (
          <tr key={item.id} className="border-t border-slate-100">
            <td className="px-3 py-2 text-center text-slate-700">{index + 1}</td>
            <td className="px-3 py-2 text-slate-900">{asText(item.item_name) || item.id}</td>
            <td className="px-3 py-2 text-right text-slate-700">{qty}</td>
            <td className="px-3 py-2 text-right text-slate-700">{formatMoney(item.unit_cost)}</td>
            <td className="px-3 py-2 text-right text-slate-700">{formatMoney(item.discount)}</td>
            <td className="px-3 py-2 text-right font-semibold text-slate-900">{formatMoney(lineTotal)}</td>
          </tr>
        );
      })}
    </>
  );
}
