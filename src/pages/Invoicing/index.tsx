import PageShell from '../../components/PageShell';

const invoices = [
  { id: 'INV-401', patient: 'Esi Ackah', amount: 'GHS 420', status: 'Pending' },
  { id: 'INV-402', patient: 'Kojo Mensimah', amount: 'GHS 680', status: 'Paid' },
];

export default function InvoicingIndex() {
  return (
    <PageShell title="Invoicing/index.php" sourcePath="templates/Invoicing/index.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Invoicing</p>
              <h2 className="text-2xl font-semibold text-slate-900">Invoices</h2>
            </div>

            <div className="space-y-3">
              {invoices.map((invoice) => (
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
