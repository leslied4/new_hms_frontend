import PageShell from '../../components/PageShell';

const cashflow = [
  { label: 'Income', value: 'GHS 45,200' },
  { label: 'Expenses', value: 'GHS 31,400' },
  { label: 'Net', value: 'GHS 13,800' },
];

export default function CashFlowIndex() {
  return (
    <PageShell title="CashFlow/index.php" sourcePath="templates/CashFlow/index.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Cash Flow</p>
              <h2 className="text-2xl font-semibold text-slate-900">Cash Flow Overview</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {cashflow.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
