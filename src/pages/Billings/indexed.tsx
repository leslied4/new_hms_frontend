import PageShell from '../../components/PageShell';

const indexedInvoices = [
  { id: 'INV-3001', patient: 'Akua Mensah', amount: 'GHS 520', status: 'Paid' },
  { id: 'INV-3002', patient: 'Efe Laryea', amount: 'GHS 310', status: 'Pending' },
];

export default function BillingsIndexed() {
  return (
    <PageShell title="Billings/indexed.php" sourcePath="templates/Billings/indexed.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Indexed</p>
              <h2 className="text-2xl font-semibold text-slate-900">Indexed Invoices</h2>
            </div>

            <div className="space-y-3">
              {indexedInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{invoice.id}</p>
                    <p className="text-xs text-slate-500">{invoice.patient}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-900">{invoice.amount}</p>
                    <p className="text-xs text-emerald-200">{invoice.status}</p>
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
