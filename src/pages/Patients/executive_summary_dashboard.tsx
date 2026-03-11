import PageShell from '../../components/PageShell';

const kpis = [
  { label: 'Total Visits', value: '8,420' },
  { label: 'Revenue (MTD)', value: 'GHS 1.2M' },
  { label: 'Average LOS', value: '3.1 days' },
  { label: 'Readmission Rate', value: '4.8%' },
];

const highlights = [
  { title: 'Top Performing Clinic', value: 'Outpatient' },
  { title: 'Lowest Wait Time', value: 'Lab Services' },
  { title: 'Patient Satisfaction', value: '92%' },
];

export default function PatientsExecutiveSummaryDashboard() {
  return (
    <PageShell
      title="Patients/executive_summary_dashboard.php"
      sourcePath="templates/Patients/executive_summary_dashboard.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Executive</p>
              <h2 className="text-2xl font-semibold text-slate-900">Executive Summary Dashboard</h2>
              <p className="text-sm text-slate-600">Snapshot of performance across the facility.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Facility Highlights</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {highlights.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-500">{item.title}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-40 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
                  KPI chart placeholder.
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Executive Actions</h3>
                <ul className="mt-4 space-y-3 text-xs text-slate-700">
                  <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    Review staffing levels for Ward B.
                  </li>
                  <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    Approve capital request for imaging upgrades.
                  </li>
                  <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    Follow up on claims backlog reduction.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
