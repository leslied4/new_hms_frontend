import PageShell from '../../components/PageShell';

const lineItems = [
  { description: 'Consultation', amount: 'GHS 120' },
  { description: 'Laboratory', amount: 'GHS 280' },
  { description: 'Radiology', amount: 'GHS 300' },
];

export default function BillingsSuperBill() {
  return (
    <PageShell title="Billings/super_bill.php" sourcePath="templates/Billings/super_bill.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Billing</p>
              <h2 className="text-2xl font-semibold text-slate-900">Super Bill</h2>
            </div>

            <div className="space-y-3">
              {lineItems.map((item) => (
                <div key={item.description} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm text-slate-800">{item.description}</p>
                  <p className="text-sm font-semibold text-slate-900">{item.amount}</p>
                </div>
              ))}
            </div>

            <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950">
              Submit for approval
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
