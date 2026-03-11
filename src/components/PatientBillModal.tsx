import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

type InvoiceRow = {
  id: string;
  patient_visit_id?: string | null;
  invoice_number?: string | null;
  date_added?: string | null;
  amount_paid?: string | number | null;
  final_amount?: string | number | null;
  status_id?: string | null;
};

type DetailedInvoicesResponse = {
  invoices?: InvoiceRow[];
};

type InvoiceItem = {
  id: string;
  item_name?: string | null;
  quantity?: string | number | null;
  quantity_x?: string | number | null;
  unit_cost?: string | number | null;
  discount?: string | number | null;
  final_amount?: string | number | null;
  status_id?: string | null;
};

type ViewInvoiceResponse = {
  id: string;
  invoice_number?: string | null;
  date_added?: string | null;
  final_amount?: string | number | null;
  amount_paid?: string | number | null;
  items?: InvoiceItem[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  visitId: string;
  patientName: string;
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const fmtMoney = (value: unknown): string => `GH₵ ${asNumber(value).toFixed(2)}`;
const fmtDate = (value?: string | null): string => {
  if (!value) return 'N/A';
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleString();
};

export default function PatientBillModal({ open, onClose, visitId, patientName }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<ViewInvoiceResponse | null>(null);

  useEffect(() => {
    if (!open || !visitId) return;
    let isCancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<DetailedInvoicesResponse | InvoiceRow[]>(
          '/legacy/billings/index/?detailed=1&page=1&page_size=200',
        );
        const rows = Array.isArray(response) ? response : Array.isArray(response?.invoices) ? response.invoices : [];
        const matching = rows.filter((row) => asText(row.patient_visit_id) === asText(visitId));
        matching.sort((a, b) => String(b.date_added || '').localeCompare(String(a.date_added || '')));
        const target = matching[0];
        if (!target?.id) {
          if (!isCancelled) setInvoice(null);
          return;
        }
        const invoiceDetails = await api.get<ViewInvoiceResponse>(
          `/legacy/billings/view-invoice/?id=${encodeURIComponent(target.id)}`,
        );
        if (!isCancelled) setInvoice(invoiceDetails || null);
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load patient bill.');
          setInvoice(null);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    load().catch(() => {
      if (!isCancelled) {
        setError('Unable to load patient bill.');
        setIsLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [open, visitId]);

  const items = useMemo(() => {
    const list = Array.isArray(invoice?.items) ? invoice.items : [];
    return list.filter((row) => String(row.status_id) !== '24');
  }, [invoice?.items]);

  const totals = useMemo(() => {
    const subTotal = items.reduce((sum, row) => {
      const qty = asNumber(row.quantity_x) || asNumber(row.quantity) || 1;
      return sum + qty * asNumber(row.unit_cost);
    }, 0);
    const discount = items.reduce((sum, row) => sum + asNumber(row.discount), 0);
    const total = asNumber(invoice?.final_amount) > 0 ? asNumber(invoice?.final_amount) : Math.max(subTotal - discount, 0);
    const amountPaid = asNumber(invoice?.amount_paid);
    return { subTotal, discount, total, amountPaid, balance: Math.max(total - amountPaid, 0) };
  }, [items, invoice?.amount_paid, invoice?.final_amount]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4">
      <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Patient Bill</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
          >
            Close
          </button>
        </div>

        <div id="patient-bill-print" className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
            <p><span className="font-semibold">Patient:</span> {patientName || 'N/A'}</p>
            <p><span className="font-semibold">Visit ID:</span> {visitId || 'N/A'}</p>
            <p><span className="font-semibold">Invoice #:</span> {asText(invoice?.invoice_number) || 'N/A'}</p>
            <p><span className="font-semibold">Date:</span> {fmtDate(invoice?.date_added)}</p>
          </div>

          {isLoading ? <p className="text-sm text-slate-500">Loading bill...</p> : null}
          {error ? <p className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
          {!isLoading && !error && !invoice ? (
            <p className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              No invoice found for this visit yet.
            </p>
          ) : null}

          {!isLoading && invoice ? (
            <>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Item</th>
                      <th className="px-3 py-2 text-right">Price</th>
                      <th className="px-3 py-2 text-right">Qty</th>
                      <th className="px-3 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-3 py-4 text-center text-slate-500">No bill items found.</td>
                      </tr>
                    ) : (
                      items.map((item) => {
                        const qty = asNumber(item.quantity_x) || asNumber(item.quantity) || 1;
                        const line = asNumber(item.final_amount) > 0 ? asNumber(item.final_amount) : qty * asNumber(item.unit_cost);
                        return (
                          <tr key={item.id} className="border-b border-slate-100">
                            <td className="px-3 py-2 text-slate-900">{asText(item.item_name) || item.id}</td>
                            <td className="px-3 py-2 text-right text-slate-700">{fmtMoney(item.unit_cost)}</td>
                            <td className="px-3 py-2 text-right text-slate-700">{qty}</td>
                            <td className="px-3 py-2 text-right font-semibold text-slate-900">{fmtMoney(line)}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto w-full max-w-xs space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                <p className="flex items-center justify-between"><span>Subtotal</span><span>{fmtMoney(totals.subTotal)}</span></p>
                <p className="flex items-center justify-between"><span>Discount</span><span>{fmtMoney(totals.discount)}</span></p>
                <p className="flex items-center justify-between border-t border-slate-300 pt-2 font-semibold"><span>Total</span><span>{fmtMoney(totals.total)}</span></p>
                <p className="flex items-center justify-between text-emerald-700"><span>Amount Paid</span><span>{fmtMoney(totals.amountPaid)}</span></p>
                <p className="flex items-center justify-between text-rose-700"><span>Balance</span><span>{fmtMoney(totals.balance)}</span></p>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t border-slate-200 pt-4">
          {invoice?.id ? (
            <a
              href={`/Billings/view_invoice?id=${encodeURIComponent(invoice.id)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Open Full Invoice
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white"
          >
            Print Bill
          </button>
        </div>
      </section>
    </div>
  );
}
