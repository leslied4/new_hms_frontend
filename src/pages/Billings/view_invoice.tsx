import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import SearchableSelect from '../../components/SearchableSelect';

type InvoiceItem = {
  id: string;
  item_name?: string | null;
  item_type_id?: string | null;
  quantity?: number | string | null;
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
  status_id?: string | null;
  date_added?: string | null;
  back_date?: string | null;
  items?: InvoiceItem[];
};

type GenericRow = Record<string, unknown> & { id: string };
type PatientVisit = { id: string; patient_id?: string | null };
type Patient = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  folder_number?: string | null;
  code?: string | null;
  email?: string | null;
};
type Payment = {
  id: string;
  invoice_id?: string | null;
  amount?: number | string | null;
  amount_received?: number | string | null;
  change_amount?: number | string | null;
  payment_type_id?: string | null;
  reference_number?: string | null;
  date_created?: string | null;
  status_id?: string | null;
};
type PaymentTypeRow = GenericRow & { name?: string | null };
type VisitPaymentsResponse = {
  patient_visit_id?: string | null;
  invoice_ids?: string[];
  payments?: Payment[];
  invoices_by_id?: Record<string, Invoice>;
};

const asText = (value: unknown): string => String(value ?? '').trim();
const asNumber = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const fmtDate = (value?: string | null): string => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString();
};

const fmtMoney = (value: unknown): string => `GH₵ ${asNumber(value).toFixed(2)}`;

const statusClass = (statusId?: string | null): string => {
  if (String(statusId) === '27') return 'bg-emerald-100 text-emerald-700';
  if (String(statusId) === '26') return 'bg-amber-100 text-amber-700';
  if (String(statusId) === '19') return 'bg-rose-100 text-rose-700';
  return 'bg-slate-100 text-slate-700';
};

export default function BillingsViewInvoice() {
  const [searchParams] = useSearchParams();
  const invoiceId = asText(searchParams.get('id'));
  const type = asText(searchParams.get('type')).toLowerCase();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [itemTypes, setItemTypes] = useState<GenericRow[]>([]);
  const [statuses, setStatuses] = useState<GenericRow[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<PaymentTypeRow[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [visitInvoicesById, setVisitInvoicesById] = useState<Record<string, Invoice>>({});
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    creditPayment: '0',
    paymentTypeId: '',
    bankName: '',
    phoneNumber: '+233',
    referenceNumber: '',
    amountReceived: '',
    amount: '',
    changeAmount: '0.00',
    backdate: false,
    backDate: '',
  });
  const paymentsSectionRef = useRef<HTMLElement | null>(null);

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
        const [invoiceData, itemTypeRows, statusRows, paymentTypeRows] = await Promise.all([
          api.get<Invoice>(`/legacy/billings/view-invoice/?id=${encodeURIComponent(invoiceId)}${type ? `&type=${encodeURIComponent(type)}` : ''}`),
          api.get<GenericRow[]>('/invoice_item_types/'),
          api.get<GenericRow[]>('/statuses/'),
          api.get<PaymentTypeRow[]>('/payment_types/'),
        ]);

        setInvoice(invoiceData || null);
        setItemTypes(Array.isArray(itemTypeRows) ? itemTypeRows : []);
        setStatuses(Array.isArray(statusRows) ? statusRows : []);
        setPaymentTypes(Array.isArray(paymentTypeRows) ? paymentTypeRows : []);
        setPayments([]);
        setVisitInvoicesById({});

        const visitId = asText(invoiceData?.patient_visit_id);
        if (visitId) {
          try {
            const visitPayments = await api.get<VisitPaymentsResponse>(
              `/legacy/billings/visit-payments/?patient_visit_id=${encodeURIComponent(visitId)}`,
            );
            setPayments(Array.isArray(visitPayments?.payments) ? visitPayments.payments : []);
            setVisitInvoicesById(visitPayments?.invoices_by_id && typeof visitPayments.invoices_by_id === 'object' ? visitPayments.invoices_by_id : {});
          } catch {
            setPayments([]);
            setVisitInvoicesById({});
          }
        }
        if (visitId) {
          try {
            const visit = await api.get<PatientVisit>(`/patient_visits/${encodeURIComponent(visitId)}/`);
            const patientId = asText(visit?.patient_id);
            if (patientId) {
              const patientData = await api.get<Patient>(`/patients/${encodeURIComponent(patientId)}/`);
              setPatient(patientData || null);
            } else {
              setPatient(null);
            }
          } catch {
            setPatient(null);
          }
        } else {
          setPatient(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load invoice.');
      } finally {
        setIsLoading(false);
      }
    };

    load().catch(() => {
      setError('Unable to load invoice.');
      setIsLoading(false);
    });
  }, [invoiceId, type]);

  const itemTypeById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    itemTypes.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [itemTypes]);

  const statusById = useMemo(() => {
    const map = new Map<string, GenericRow>();
    statuses.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [statuses]);

  const paymentTypeById = useMemo(() => {
    const map = new Map<string, PaymentTypeRow>();
    paymentTypes.forEach((row) => map.set(String(row.id), row));
    return map;
  }, [paymentTypes]);

  const items = useMemo(() => {
    const list = Array.isArray(invoice?.items) ? invoice.items : [];
    return list.filter((row) => String(row.status_id) !== '24');
  }, [invoice?.items]);

  const activeBillableItems = useMemo(
    () => items.filter((row) => ['1', '26', '27'].includes(String(row.status_id))),
    [items],
  );

  const groupedItems = useMemo(() => {
    const groups = new Map<string, InvoiceItem[]>();
    items.forEach((row) => {
      const key = asText(row.item_type_id) || 'unknown';
      const current = groups.get(key) || [];
      current.push(row);
      groups.set(key, current);
    });

    return Array.from(groups.entries()).map(([itemTypeId, groupRows]) => {
      const groupSubTotal = groupRows.reduce((sum, row) => sum + asNumber(row.quantity) * asNumber(row.unit_cost), 0);
      const groupDiscount = groupRows.reduce((sum, row) => sum + asNumber(row.discount), 0);
      const groupTotal = groupRows.reduce((sum, row) => sum + asNumber(row.final_amount), 0);
      return {
        itemTypeId,
        label: asText(itemTypeById.get(itemTypeId)?.name) || 'Uncategorized',
        rows: groupRows,
        groupSubTotal,
        groupDiscount,
        groupTotal,
      };
    });
  }, [items, itemTypeById]);

  const computed = useMemo(() => {
    const itemSubTotal = activeBillableItems.reduce((sum, row) => sum + asNumber(row.quantity) * asNumber(row.unit_cost), 0);
    const itemDiscountSum = activeBillableItems.reduce((sum, row) => sum + asNumber(row.discount), 0);

    const discountPercent = asNumber(invoice?.discount_percentage);
    const invoiceDiscount = asNumber(invoice?.discount);
    const invoiceFinal = asNumber(invoice?.final_amount);
    const amountPaid = asNumber(invoice?.amount_paid);

    const subTotal = itemSubTotal;
    const itemsDiscount = discountPercent > 0 ? (subTotal * discountPercent) / 100 : (invoiceDiscount > 0 ? invoiceDiscount : itemDiscountSum);
    const preVatTotal = Math.max(subTotal - itemsDiscount, 0);
    const total = invoiceFinal > 0 ? invoiceFinal : preVatTotal;
    const vatAmount = 0;
    const remaining = Math.max(total - amountPaid, 0);
    return { subTotal, itemsDiscount, vatAmount, total, amountPaid, remaining };
  }, [invoice, activeBillableItems]);

  const patientName = `${asText(patient?.first_name)} ${asText(patient?.last_name)}`.trim() || 'N/A';
  const remainingAmount = computed.remaining;
  const canProcessPayment = Boolean(invoiceId) && String(invoice?.parent_invoice_id ?? '0') === '0' && remainingAmount > 0;
  const paymentTypeId = asText(paymentForm.paymentTypeId);
  const showReferenceFields = paymentTypeId === '2' || paymentTypeId === '3';
  const showChequeFields = paymentTypeId === '2';

  const openPaymentModal = () => {
    const nextAmount = remainingAmount.toFixed(2);
    setPaymentError(null);
    setPaymentNotice(null);
    setPaymentForm({
      creditPayment: '0',
      paymentTypeId: asText(paymentTypes[0]?.id),
      bankName: '',
      phoneNumber: '+233',
      referenceNumber: '',
      amountReceived: nextAmount,
      amount: nextAmount,
      changeAmount: '0.00',
      backdate: false,
      backDate: '',
    });
    setPaymentModalOpen(true);
  };

  const updatePaymentAmounts = (value: string) => {
    const received = asNumber(value);
    const applied = Math.min(received, remainingAmount);
    const change = Math.max(received - remainingAmount, 0);
    setPaymentForm((current) => ({
      ...current,
      amountReceived: value,
      amount: applied.toFixed(2),
      changeAmount: change.toFixed(2),
    }));
  };

  const submitPayment = async () => {
    if (!invoiceId) {
      setPaymentError('Missing invoice id.');
      return;
    }
    if (!paymentTypeId) {
      setPaymentError('Select a payment type.');
      return;
    }

    const amount = asNumber(paymentForm.amount);
    const amountReceived = asNumber(paymentForm.amountReceived);
    if (amount <= 0) {
      setPaymentError('Payment amount must be greater than 0.');
      return;
    }
    if (amountReceived <= 0) {
      setPaymentError('Amount received must be greater than 0.');
      return;
    }

    setSubmittingPayment(true);
    setPaymentError(null);
    try {
      const response = await api.post<{ payment?: Payment; invoice?: Invoice }>(
        `/legacy/billings/make-payment/?invoice_id=${encodeURIComponent(invoiceId)}`,
        {
          invoice_id: invoiceId,
          amount,
          amount_received: amountReceived,
          change_amount: asNumber(paymentForm.changeAmount),
          payment_type_id: paymentTypeId,
          reference_number: showReferenceFields ? asText(paymentForm.referenceNumber) : '',
          back_date: paymentForm.backdate ? paymentForm.backDate : '',
        },
      );

      if (response?.invoice) {
        setInvoice((current) => (current ? { ...current, ...response.invoice, items: current.items } : (response.invoice as Invoice)));
      }
      const visitId = asText(invoice?.patient_visit_id);
      if (visitId) {
        try {
          const visitPayments = await api.get<VisitPaymentsResponse>(
            `/legacy/billings/visit-payments/?patient_visit_id=${encodeURIComponent(visitId)}`,
          );
          setPayments(Array.isArray(visitPayments?.payments) ? visitPayments.payments : []);
          setVisitInvoicesById(visitPayments?.invoices_by_id && typeof visitPayments.invoices_by_id === 'object' ? visitPayments.invoices_by_id : {});
        } catch {
          // Keep current state if reload fails.
        }
      }

      setPaymentModalOpen(false);
      setPaymentNotice(
        paymentTypeId === '3'
          ? 'Payment recorded. Mobile money is captured as a local payment entry in this migration pass.'
          : 'Payment processed successfully.',
      );
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : 'Unable to process payment.');
    } finally {
      setSubmittingPayment(false);
    }
  };

  const submitEmailShare = async () => {
    if (!invoiceId) {
      setEmailError('Missing invoice id.');
      return;
    }
    setEmailError(null);
    setEmailNotice(null);
    setSendingEmail(true);
    try {
      const response = await api.post<{ receiver_email?: string; detail?: string }>('/legacy/billings/send-reminder/', {
        invoice_id: invoiceId,
      });
      const target = asText(response?.receiver_email) || asText(patient?.email) || 'the patient';
      setEmailNotice(`Invoice emailed to ${target}.`);
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : 'Unable to send invoice email.');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      <style>{`
        @media print {
          .print-hide { display: none !important; }
          .app-shell-chrome { display: none !important; }
          .app-shell-main { padding: 0 !important; }
          .app-glow-bg { background: #fff !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Billings</p>
            <h1 className="text-2xl font-semibold text-slate-900">Invoice #{asText(invoice?.invoice_number) || invoiceId || 'N/A'}</h1>
            <p className="mt-1 text-sm text-slate-600">Invoice Date: {fmtDate(invoice?.date_added)}</p>
            <p className="text-sm text-slate-600">Patient: {patientName}</p>
            <p className="text-xs text-slate-500">
              MRN / Code: {asText(patient?.folder_number) || 'N/A'} / {asText(patient?.code) || 'N/A'}
            </p>
          </div>
          <div className="flex w-full max-w-[28rem] flex-col items-stretch gap-3 md:w-auto md:items-end">
            <span className={`inline-flex self-start rounded-full px-2 py-1 text-xs font-semibold md:self-end ${statusClass(invoice?.status_id)}`}>
              {asText(statusById.get(asText(invoice?.status_id))?.name) || asText(invoice?.status_id) || 'N/A'}
            </span>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:w-[28rem]">
              {canProcessPayment ? (
                <button
                  type="button"
                  onClick={openPaymentModal}
                  className="print-hide rounded-xl border border-emerald-300 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                >
                  Proceed to Payment
                </button>
              ) : null}
              {invoiceId ? (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="print-hide rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  Print Receipt
                </button>
              ) : null}
              {invoiceId ? (
                <a
                  href={`/Billings/new_billing_report?id=${encodeURIComponent(invoiceId)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="print-hide rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-xs font-semibold text-slate-700"
                >
                  Open Printable View
                </a>
              ) : null}
              {invoiceId ? (
                <a
                  href={`/Billings/new_billing_report?id=${encodeURIComponent(invoiceId)}&mode=download`}
                  target="_blank"
                  rel="noreferrer"
                  className="print-hide rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-xs font-semibold text-slate-700"
                >
                  Download PDF
                </a>
              ) : null}
              {invoiceId ? (
                <button
                  type="button"
                  onClick={() => {
                    paymentsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="print-hide rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  View Payments
                </button>
              ) : null}
              {invoiceId ? (
                <button
                  type="button"
                  onClick={() => {
                    void submitEmailShare();
                  }}
                  disabled={sendingEmail}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  {sendingEmail ? 'Sending Email...' : 'Share by Email'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {paymentNotice ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{paymentNotice}</div> : null}
      {emailNotice ? <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-700">{emailNotice}</div> : null}
      {emailError ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{emailError}</div> : null}

      <section ref={paymentsSectionRef} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        {isLoading ? (
          <p className="px-3 py-4 text-sm text-slate-500">Loading invoice items...</p>
        ) : groupedItems.length === 0 ? (
          <p className="px-3 py-4 text-sm text-slate-500">No invoice items found.</p>
        ) : (
          <div className="space-y-5">
            {groupedItems.map((group) => (
              <div key={group.itemTypeId} className="overflow-hidden rounded-xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <h3 className="text-sm font-semibold text-slate-900">{group.label}</h3>
                  <p className="text-xs text-slate-600">
                    Group Total: <span className="font-semibold text-slate-900">{fmtMoney(group.groupTotal)}</span>
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-2">#</th>
                        <th className="px-3 py-2">Item</th>
                        <th className="px-3 py-2 text-right">Qty</th>
                        <th className="px-3 py-2 text-right">Unit</th>
                        <th className="px-3 py-2 text-right">Discount</th>
                        <th className="px-3 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((row, index) => (
                        <tr key={row.id} className="border-b border-slate-100">
                          <td className="px-3 py-2 text-slate-700">{index + 1}</td>
                          <td className="px-3 py-2 text-slate-900">{asText(row.item_name) || row.id}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{asNumber(row.quantity)}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{fmtMoney(row.unit_cost)}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{fmtMoney(row.discount)}</td>
                          <td className="px-3 py-2 text-right font-semibold text-slate-900">{fmtMoney(row.final_amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50">
                        <td colSpan={3} className="px-3 py-2 text-xs font-semibold text-slate-600">
                          Subtotal: {fmtMoney(group.groupSubTotal)}
                        </td>
                        <td colSpan={3} className="px-3 py-2 text-right text-xs font-semibold text-slate-600">
                          Discount: {fmtMoney(group.groupDiscount)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Sub Total</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{fmtMoney(computed.subTotal)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Discount</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{fmtMoney(computed.itemsDiscount)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Amount Paid</p>
          <p className="mt-1 text-lg font-semibold text-emerald-700">{fmtMoney(computed.amountPaid)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Remaining</p>
          <p className="mt-1 text-lg font-semibold text-rose-700">{fmtMoney(computed.remaining)}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Grand Total</p>
          <p className="text-2xl font-semibold text-slate-900">{fmtMoney(computed.total)}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Payments</p>
            <h2 className="text-lg font-semibold text-slate-900">Invoice Payments</h2>
          </div>
          <p className="text-sm text-slate-600">Payments from this visit: {payments.length}</p>
        </div>
        {payments.length === 0 ? (
          <p className="py-4 text-sm text-slate-500">No payments recorded for this visit yet.</p>
        ) : (
          <div className="overflow-x-auto pt-4">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Invoice</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Reference</th>
                  <th className="px-3 py-2 text-right">Received</th>
                  <th className="px-3 py-2 text-right">Applied</th>
                  <th className="px-3 py-2 text-right">Change</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100">
                    <td className="px-3 py-2 text-slate-700">{fmtDate(row.date_created)}</td>
                    <td className="px-3 py-2 text-slate-900">
                      {asText(visitInvoicesById[asText(row.invoice_id)]?.invoice_number)
                        || asText(row.invoice_id)
                        || 'N/A'}
                    </td>
                    <td className="px-3 py-2 text-slate-900">
                      {asText(paymentTypeById.get(asText(row.payment_type_id))?.name) || asText(row.payment_type_id) || 'N/A'}
                    </td>
                    <td className="px-3 py-2 text-slate-700">{asText(row.reference_number) || 'N/A'}</td>
                    <td className="px-3 py-2 text-right text-slate-700">{fmtMoney(row.amount_received)}</td>
                    <td className="px-3 py-2 text-right font-semibold text-slate-900">{fmtMoney(row.amount)}</td>
                    <td className="px-3 py-2 text-right text-slate-700">{fmtMoney(row.change_amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {paymentModalOpen ? (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/45 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Billings</p>
                <h2 className="text-xl font-semibold text-slate-900">Process Invoice Payment</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPaymentModalOpen(false);
                  setPaymentError(null);
                }}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">Payment By Credit</span>
                    <div className="flex gap-2">
                      {[
                        { value: '0', label: 'No' },
                        { value: '1', label: 'Yes' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPaymentForm((current) => ({ ...current, creditPayment: option.value }))}
                          className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                            paymentForm.creditPayment === option.value
                              ? 'bg-slate-900 text-white'
                              : 'border border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">Payment Type</span>
                    <SearchableSelect
                      value={paymentForm.paymentTypeId}
                      onChange={(value) =>
                        setPaymentForm((current) => ({
                          ...current,
                          paymentTypeId: value,
                          bankName: value === '2' ? current.bankName : '',
                          referenceNumber: value === '2' || value === '3' ? current.referenceNumber : '',
                        }))
                      }
                      options={paymentTypes.map((row) => ({
                        value: String(row.id),
                        label: asText(row.name) || String(row.id),
                      }))}
                      placeholder="Select payment type"
                    />
                  </label>
                </div>

                {showChequeFields ? (
                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">Bank Name</span>
                    <input
                      value={paymentForm.bankName}
                      onChange={(event) => setPaymentForm((current) => ({ ...current, bankName: event.target.value }))}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      placeholder="Enter bank name"
                    />
                  </label>
                ) : null}

                {showReferenceFields ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">Phone Number</span>
                      <input
                        value={paymentForm.phoneNumber}
                        onChange={(event) => setPaymentForm((current) => ({ ...current, phoneNumber: event.target.value }))}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Enter phone number"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">Reference Number</span>
                      <input
                        value={paymentForm.referenceNumber}
                        onChange={(event) => setPaymentForm((current) => ({ ...current, referenceNumber: event.target.value }))}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Enter reference number"
                      />
                      <span className="block text-xs text-slate-500">Reference can be used to reconcile the invoice.</span>
                    </label>
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">Amount Received</span>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={paymentForm.amountReceived}
                      onChange={(event) => updatePaymentAmounts(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">Change</span>
                    <input
                      value={paymentForm.changeAmount}
                      readOnly
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">Amount</span>
                    <input
                      value={paymentForm.amount}
                      readOnly
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={paymentForm.backdate}
                      onChange={(event) => setPaymentForm((current) => ({ ...current, backdate: event.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <span className="font-medium text-slate-900">Do you want to backdate this payment?</span>
                  </label>
                  {paymentForm.backdate ? (
                    <div className="pt-3">
                      <input
                        type="datetime-local"
                        value={paymentForm.backDate}
                        onChange={(event) => setPaymentForm((current) => ({ ...current, backDate: event.target.value }))}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                  ) : null}
                </div>

                {paymentError ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{paymentError}</div>
                ) : null}
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Summary</p>
                  <h3 className="text-lg font-semibold text-slate-900">{patientName}</h3>
                  <p className="text-sm text-slate-600">Invoice #{asText(invoice?.invoice_number) || invoiceId}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Payment Type</span>
                    <span className="font-semibold text-slate-900">{asText(paymentTypeById.get(paymentTypeId)?.name) || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Sub Total</span>
                    <span className="font-semibold text-slate-900">{fmtMoney(computed.subTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Discount</span>
                    <span className="font-semibold text-slate-900">{fmtMoney(computed.itemsDiscount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Total</span>
                    <span className="font-semibold text-slate-900">{fmtMoney(computed.total)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Amount Paid</span>
                    <span className="font-semibold text-emerald-700">{fmtMoney(computed.amountPaid)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Remaining</span>
                    <span className="font-semibold text-rose-700">{fmtMoney(remainingAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                    <span className="text-slate-600">Current Receipt</span>
                    <span className="text-lg font-semibold text-slate-900">{fmtMoney(paymentForm.amount)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={submitPayment}
                  disabled={submittingPayment}
                  className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submittingPayment ? 'Processing Payment...' : 'Make Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
