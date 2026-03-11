import PageShell from '../../components/PageShell';

const tiles = [
  { label: 'Cash Records', value: '124' },
  { label: 'Refunds', value: '6' },
  { label: 'Settlement Pending', value: 'GHS 4,200' },
];

export default function CashIndex() {
  return (
    <PageShell title="Cash/index.php" sourcePath="templates/Cash/index.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Cash</p>
              <h2 className="text-2xl font-semibold text-slate-900">Cash Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {tiles.map((tile) => (
                <div key={tile.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{tile.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{tile.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
