import PageShell from '../../components/PageShell';

const efficiencyCards = [
  { label: 'Average Wait Time', value: '18 min' },
  { label: 'Bed Turnover', value: '3.4 / day' },
  { label: 'Lab TAT', value: '2.1 hrs' },
  { label: 'Pharmacy SLA', value: '94%' },
];

const bottlenecks = [
  { area: 'Radiology', note: 'Queue spike after 2pm' },
  { area: 'Billing', note: 'Average checkout 12 min' },
  { area: 'Ward B', note: 'Discharge delays' },
];

export default function PatientsOperationEfficiency() {
  return (
    <PageShell
      title="Patients/operation_efficiency.php"
      sourcePath="templates/Patients/operation_efficiency.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Operations</p>
              <h2 className="text-2xl font-semibold text-slate-900">Operational Efficiency</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {efficiencyCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{card.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Throughput Trends</h3>
                <div className="mt-4 h-40 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
                  Chart placeholder – patient flow vs wait time.
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Bottlenecks</h3>
                <div className="mt-4 space-y-3">
                  {bottlenecks.map((item) => (
                    <div key={item.area} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{item.area}</p>
                      <p className="text-xs text-slate-500">{item.note}</p>
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
