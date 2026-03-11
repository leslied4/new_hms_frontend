import PageShell from '../../components/PageShell';

const reportRows = [
  { label: 'Total Invoices', value: '1,240' },
  { label: 'Total Revenue', value: 'GHS 1.8M' },
  { label: 'Average Invoice', value: 'GHS 1,450' },
];

export default function BillingsBillingReport() {
  return (
    <PageShell title="Billings/billing_report.php" sourcePath="templates/Billings/billing_report.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Reports</p>
              <h2 className="text-2xl font-semibold text-slate-900">Billing Report</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {reportRows.map((row) => (
                <div key={row.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{row.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
