import PageShell from '../../components/PageShell';

const reversals = [
  { id: 'REV-101', invoice: 'INV-3101', amount: 'GHS 120', reason: 'Duplicate charge' },
  { id: 'REV-102', invoice: 'INV-3094', amount: 'GHS 80', reason: 'Service cancelled' },
];

export default function BillingsSalesReversals() {
  return (
    <PageShell
      title="Billings/sales_reversals.php"
      sourcePath="templates/Billings/sales_reversals.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Reversals</p>
              <h2 className="text-2xl font-semibold text-slate-900">Sales Reversals</h2>
            </div>

            <div className="space-y-3">
              {reversals.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.id}</p>
                      <p className="text-xs text-slate-500">{item.invoice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-rose-200">{item.amount}</p>
                      <p className="text-xs text-slate-500">{item.reason}</p>
                    </div>
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
