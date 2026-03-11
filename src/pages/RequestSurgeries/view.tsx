import PageShell from '../../components/PageShell';

export default function RequestSurgeriesView() {
  return (
    <PageShell title="RequestSurgeries/view.php" sourcePath="templates/RequestSurgeries/view.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">RequestSurgeries</p>
              <h2 className="text-2xl font-semibold text-slate-900">View</h2>
              <p className="text-sm text-slate-600">Request flow placeholder.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Replace this stub with request tables and forms from the legacy template.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
