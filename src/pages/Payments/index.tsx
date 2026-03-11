import PageShell from '../../components/PageShell';

const payments = [
  { id: 'PAY-1201', patient: 'Esi Ackah', amount: 'GHS 420', method: 'Cash', status: 'Completed' },
  { id: 'PAY-1202', patient: 'Kojo Mensimah', amount: 'GHS 680', method: 'Card', status: 'Pending' },
];

export default function PaymentsIndex() {
  return (
    <PageShell title="Payments/index.php" sourcePath="templates/Payments/index.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Payments</p>
              <h2 className="text-2xl font-semibold text-slate-900">Payments</h2>
            </div>

            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{payment.id}</p>
                    <p className="text-xs text-slate-500">{payment.patient}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-900">{payment.amount}</p>
                    <p className="text-xs text-emerald-200">{payment.method} · {payment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
