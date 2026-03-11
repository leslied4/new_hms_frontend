import PageShell from '../../components/PageShell';

const metrics = [
  { label: 'Total Revenue', value: 'GHS 1.2M' },
  { label: 'Cash Collected', value: 'GHS 520k' },
  { label: 'Claims Approved', value: 'GHS 410k' },
  { label: 'Write-offs', value: 'GHS 32k' },
];

const trends = [
  { label: 'January', value: 'GHS 120k' },
  { label: 'February', value: 'GHS 110k' },
  { label: 'March', value: 'GHS 145k' },
];

export default function BillingsAnalytics() {
  return (
    <PageShell title="Billings/analytics.php" sourcePath="templates/Billings/analytics.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Analytics</p>
              <h2 className="text-2xl font-semibold text-slate-900">Billing Analytics</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-800">Monthly Trend</h3>
              <div className="mt-4 space-y-3">
                {trends.map((trend) => (
                  <div key={trend.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-sm text-slate-900">{trend.label}</p>
                    <p className="text-sm text-emerald-200">{trend.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
