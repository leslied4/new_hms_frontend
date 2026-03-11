import PageShell from '../../components/PageShell';

export default function ManageRadiologiesUpdateScanTemplate() {
  return (
    <PageShell title="ManageRadiologies/update_scan_template.php" sourcePath="templates/ManageRadiologies/update_scan_template.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">ManageRadiologies</p>
              <h2 className="text-2xl font-semibold text-slate-900">Update Scan Template</h2>
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
