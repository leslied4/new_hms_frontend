import PageShell from '../../components/PageShell';

export default function InventoryOutlets() {
  return (
    <PageShell title="Inventory/outlets.php" sourcePath="templates/Inventory/outlets.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Inventory</p>
              <h2 className="text-2xl font-semibold text-slate-900">Outlets</h2>
              <p className="text-sm text-slate-600">Placeholder view for inventory workflows.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Replace this stub with inventory tables and forms from the legacy template.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
