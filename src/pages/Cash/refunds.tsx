import PageShell from '../../components/PageShell';

export default function CashRefunds() {
  return (
    <PageShell title="Cash/refunds.php" sourcePath="templates/Cash/refunds.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Cash</p>
              <h2 className="text-2xl font-semibold text-slate-900">Refunds</h2>
              <p className="text-sm text-slate-600">Placeholder view for cash workflow.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Replace this stub with the cash table or form fields from the legacy template.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
