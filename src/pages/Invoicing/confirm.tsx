import PageShell from '../../components/PageShell';

export default function InvoicingConfirm() {
  return (
    <PageShell title="Invoicing/confirm.php" sourcePath="templates/Invoicing/confirm.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Invoicing</p>
              <h2 className="text-2xl font-semibold text-slate-900">Confirm Invoice</h2>
              <p className="text-sm text-slate-600">Review and confirm invoice details.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Invoice confirmation placeholder. Replace with invoice summary and approval actions.
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
                Confirm
              </button>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
