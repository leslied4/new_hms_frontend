import PageShell from '../../components/PageShell';

const receipt = {
  id: 'RCPT-2201',
  patient: 'Esi Ackah',
  date: '2026-01-30',
  amount: 'GHS 420',
  method: 'Cash',
};

export default function BillingsReceipt() {
  return (
    <PageShell title="Billings/receipt.php" sourcePath="templates/Billings/receipt.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Receipt</p>
              <h2 className="text-2xl font-semibold text-slate-900">Receipt #{receipt.id}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex justify-between text-sm text-slate-700">
                <span>Patient</span>
                <span className="text-slate-900">{receipt.patient}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Date</span>
                <span className="text-slate-900">{receipt.date}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Payment Method</span>
                <span className="text-slate-900">{receipt.method}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-slate-900">
                <span>Total</span>
                <span>{receipt.amount}</span>
              </div>
            </div>

            <button className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-800">Print receipt</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
