import PageShell from '../../components/PageShell';

export default function ManageLabsViewLabTest() {
  return (
    <PageShell title="ManageLabs/view_lab_test.php" sourcePath="templates/ManageLabs/view_lab_test.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">ManageLabs</p>
              <h2 className="text-2xl font-semibold text-slate-900">View Lab Test</h2>
              <p className="text-sm text-slate-600">Management view placeholder.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Replace this stub with the legacy management form and data table.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
