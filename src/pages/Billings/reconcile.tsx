import PageShell from '../../components/PageShell';

const reconciliationRows = [
  { date: '2026-01-28', cash: 'GHS 12,400', claims: 'GHS 8,200', variance: 'GHS 120' },
  { date: '2026-01-29', cash: 'GHS 11,800', claims: 'GHS 7,900', variance: 'GHS -80' },
  { date: '2026-01-30', cash: 'GHS 13,100', claims: 'GHS 9,100', variance: 'GHS 40' },
];

export default function BillingsReconcile() {
  return (
    <PageShell title="Billings/reconcile.php" sourcePath="templates/Billings/reconcile.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Reconciliation</p>
              <h2 className="text-2xl font-semibold text-slate-900">Daily Reconciliation</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 bg-white text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Cash</th>
                    <th className="px-4 py-3">Claims</th>
                    <th className="px-4 py-3">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {reconciliationRows.map((row) => (
                    <tr key={row.date}>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.date}</td>
                      <td className="px-4 py-3">{row.cash}</td>
                      <td className="px-4 py-3">{row.claims}</td>
                      <td className="px-4 py-3">{row.variance}</td>
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
