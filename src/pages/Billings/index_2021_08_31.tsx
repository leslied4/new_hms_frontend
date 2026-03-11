import PageShell from '../../components/PageShell';

const legacyStats = [
  { label: 'Legacy Invoices', value: '420' },
  { label: 'Legacy Revenue', value: 'GHS 380k' },
  { label: 'Legacy Claims', value: '95' },
];

export default function BillingsIndex20210831() {
  return (
    <PageShell title="Billings/index_2021_08_31.php" sourcePath="templates/Billings/index_2021_08_31.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Legacy</p>
              <h2 className="text-2xl font-semibold text-slate-900">Billing Dashboard (2021)</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {legacyStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
