import PageShell from '../../components/PageShell';

export default function CashBookEditDrugPriceCredit() {
  return (
    <PageShell title="CashBook/edit_drug_price_credit.php" sourcePath="templates/CashBook/edit_drug_price_credit.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">CashBook</p>
              <h2 className="text-2xl font-semibold text-slate-900">Edit Drug Price (Credit)</h2>
              <p className="text-sm text-slate-600">Pricing editor placeholder.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Replace with pricing forms and tables from the legacy template.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
