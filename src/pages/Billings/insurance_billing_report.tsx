import PageShell from '../../components/PageShell';

const insurers = [
  { name: 'NHIS', claims: 320, amount: 'GHS 420k' },
  { name: 'Premier Health', claims: 110, amount: 'GHS 180k' },
  { name: 'Allied Care', claims: 75, amount: 'GHS 95k' },
];

export default function BillingsInsuranceBillingReport() {
  return (
    <PageShell
      title="Billings/insurance_billing_report.php"
      sourcePath="templates/Billings/insurance_billing_report.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Insurance</p>
              <h2 className="text-2xl font-semibold text-slate-900">Insurance Billing Report</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 bg-white text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Insurer</th>
                    <th className="px-4 py-3">Claims</th>
                    <th className="px-4 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {insurers.map((insurer) => (
                    <tr key={insurer.name}>
                      <td className="px-4 py-3 font-medium text-slate-900">{insurer.name}</td>
                      <td className="px-4 py-3">{insurer.claims}</td>
                      <td className="px-4 py-3">{insurer.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
