import PageShell from '../../components/PageShell';

const payments = [
  { invoice: 'INV-3101', patient: 'Esi Ackah', amount: 'GHS 420', status: 'Pending' },
  { invoice: 'INV-3102', patient: 'Kojo Mensimah', amount: 'GHS 680', status: 'Paid' },
  { invoice: 'INV-3103', patient: 'Yaw Boateng', amount: 'GHS 240', status: 'Pending' },
];

export default function BillingsInvoicePayments() {
  return (
    <PageShell title="Billings/invoice_payments.php" sourcePath="templates/Billings/invoice_payments.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Payments</p>
              <h2 className="text-2xl font-semibold text-slate-900">Invoice Payments</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 bg-white text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Invoice</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {payments.map((payment) => (
                    <tr key={payment.invoice}>
                      <td className="px-4 py-3 font-medium text-slate-900">{payment.invoice}</td>
                      <td className="px-4 py-3">{payment.patient}</td>
                      <td className="px-4 py-3">{payment.amount}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
