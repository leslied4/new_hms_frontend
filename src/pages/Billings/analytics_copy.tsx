import PageShell from '../../components/PageShell';

const cards = [
  { label: 'Gross Revenue', value: 'GHS 1.6M' },
  { label: 'Net Revenue', value: 'GHS 1.1M' },
  { label: 'Denied Claims', value: 'GHS 75k' },
  { label: 'Average Payment Time', value: '12 days' },
];

export default function BillingsAnalyticsCopy() {
  return (
    <PageShell title="Billings/analytics_copy.php" sourcePath="templates/Billings/analytics_copy.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Analytics</p>
              <h2 className="text-2xl font-semibold text-slate-900">Billing Analytics (Alt)</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{card.label}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
