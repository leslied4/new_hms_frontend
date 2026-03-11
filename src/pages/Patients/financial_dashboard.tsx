import PageShell from '../../components/PageShell';

const financeCards = [
  { label: 'Revenue (MTD)', value: 'GHS 980k', trend: '+6%' },
  { label: 'Outstanding Bills', value: 'GHS 120k', trend: '-4%' },
  { label: 'Insurance Claims', value: 'GHS 420k', trend: '+2%' },
  { label: 'Cash Collections', value: 'GHS 310k', trend: '+3%' },
];

const recentInvoices = [
  { id: 'INV-3012', patient: 'Esi Ackah', amount: 'GHS 420', status: 'Pending' },
  { id: 'INV-3013', patient: 'Yaw Boateng', amount: 'GHS 890', status: 'Paid' },
  { id: 'INV-3014', patient: 'Kojo Mensimah', amount: 'GHS 240', status: 'Pending' },
];

export default function PatientsFinancialDashboard() {
  return (
    <PageShell title="Patients/financial_dashboard.php" sourcePath="templates/Patients/financial_dashboard.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Finance</p>
              <h2 className="text-2xl font-semibold text-slate-900">Financial Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {financeCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{card.label}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-xl font-semibold text-slate-900">{card.value}</p>
                    <span className="text-xs text-emerald-300">{card.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Revenue Trends</h3>
                <div className="mt-4 h-40 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
                  Chart placeholder – daily revenue vs collections.
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Recent Invoices</h3>
                <div className="mt-4 space-y-3">
                  {recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{invoice.id}</p>
                        <p className="text-xs text-slate-500">{invoice.patient}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-900">{invoice.amount}</p>
                        <p className="text-xs text-emerald-300">{invoice.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
