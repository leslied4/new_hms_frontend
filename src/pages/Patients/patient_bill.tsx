import PageShell from '../../components/PageShell';

const charges = [
  { item: 'Consultation', qty: 1, rate: 120, total: 120 },
  { item: 'Lab - Lipid Panel', qty: 1, rate: 180, total: 180 },
  { item: 'Medication', qty: 2, rate: 60, total: 120 },
];

const summary = {
  subtotal: 420,
  discount: 20,
  insuranceCover: 150,
};

export default function PatientsPatientBill() {
  const total = summary.subtotal - summary.discount - summary.insuranceCover;

  return (
    <PageShell title="Patients/patient_bill.php" sourcePath="templates/Patients/patient_bill.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Billing</p>
                <h2 className="text-2xl font-semibold text-slate-900">Patient Bill</h2>
                <p className="text-sm text-slate-600">Invoice for visit VST-001</p>
              </div>
              <button className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-800">
                Print invoice
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 bg-white text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Rate</th>
                    <th className="px-4 py-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {charges.map((charge) => (
                    <tr key={charge.item}>
                      <td className="px-4 py-3 font-medium text-slate-900">{charge.item}</td>
                      <td className="px-4 py-3">{charge.qty}</td>
                      <td className="px-4 py-3">GHS {charge.rate}</td>
                      <td className="px-4 py-3">GHS {charge.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
                <p className="text-sm font-semibold text-slate-900">Payment Notes</p>
                <p className="mt-2">
                  Insurance applied automatically. Please settle the outstanding balance within 7 days.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span>GHS {summary.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Discount</span>
                    <span>- GHS {summary.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Insurance Cover</span>
                    <span>- GHS {summary.insuranceCover}</span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm font-semibold text-slate-900">
                    <span>Total Due</span>
                    <span>GHS {total}</span>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950">
                  Record payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
