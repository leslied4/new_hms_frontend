import PageShell from '../../components/PageShell';

const populationMetrics = [
  { label: 'Chronic Care Cohort', value: '2,140' },
  { label: 'High Risk Patients', value: '128', accent: 'rose' },
  { label: 'Preventive Visits', value: '412' },
  { label: 'Missed Follow-ups', value: '37', accent: 'amber' },
];

const segments = [
  { name: 'Diabetes', count: 540, trend: '+3%' },
  { name: 'Hypertension', count: 780, trend: '+1%' },
  { name: 'Maternal Care', count: 320, trend: '-2%' },
  { name: 'Respiratory', count: 210, trend: '+5%' },
];

export default function PatientsPopulationHealthDashboard() {
  return (
    <PageShell
      title="Patients/population_health_dashboard.php"
      sourcePath="templates/Patients/population_health_dashboard.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Population Health</p>
              <h2 className="text-2xl font-semibold text-slate-900">Population Health Dashboard</h2>
              <p className="text-sm text-slate-600">Track cohorts, risk levels, and outcomes.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {populationMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className={`rounded-2xl border px-4 py-5 ${
                    metric.accent === 'rose'
                      ? 'border-rose-500/40 bg-rose-500/10'
                      : metric.accent === 'amber'
                      ? 'border-amber-400/40 bg-amber-400/10'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className="text-xs text-slate-500">{metric.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Cohort Breakdown</h3>
                <div className="mt-4 space-y-3">
                  {segments.map((segment) => (
                    <div key={segment.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{segment.name}</p>
                        <p className="text-xs text-slate-500">Active patients</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900">{segment.count}</p>
                        <p className="text-xs text-emerald-300">{segment.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Outreach Focus</h3>
                <ul className="mt-4 space-y-3 text-xs text-slate-700">
                  <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    15 high-risk patients need medication reconciliation.
                  </li>
                  <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    7 diabetic patients overdue for HbA1c tests.
                  </li>
                  <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    5 maternal care cases awaiting follow-up visits.
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
