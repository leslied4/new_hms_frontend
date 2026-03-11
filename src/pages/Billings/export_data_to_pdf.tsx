import PageShell from '../../components/PageShell';

const exports = [
  { name: 'Billing Report', status: 'Ready', generated: '2026-01-30' },
  { name: 'Outstanding Bills', status: 'Pending', generated: '2026-01-31' },
];

export default function BillingsExportDataToPdf() {
  return (
    <PageShell
      title="Billings/export_data_to_pdf.php"
      sourcePath="templates/Billings/export_data_to_pdf.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Exports</p>
              <h2 className="text-2xl font-semibold text-slate-900">Billing PDF Exports</h2>
              <p className="text-sm text-slate-600">PDF generation is disabled in this React shell.</p>
            </div>

            <div className="space-y-3">
              {exports.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">Generated {item.generated}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
