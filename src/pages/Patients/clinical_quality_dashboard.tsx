import PageShell from '../../components/PageShell';

const qualityMetrics = [
  { label: 'Sepsis Compliance', value: '96%' },
  { label: 'Medication Errors', value: '2', accent: 'rose' },
  { label: 'Infection Rate', value: '1.4%' },
  { label: 'Readmission Rate', value: '4.2%' },
];

const audits = [
  { title: 'Hand hygiene audit', status: 'Due in 3 days' },
  { title: 'Surgical checklist review', status: 'Completed' },
  { title: 'Medication reconciliation', status: 'In progress' },
];

export default function PatientsClinicalQualityDashboard() {
  return (
    <PageShell
      title="Patients/clinical_quality_dashboard.php"
      sourcePath="templates/Patients/clinical_quality_dashboard.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Quality</p>
              <h2 className="text-2xl font-semibold text-slate-900">Clinical Quality Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {qualityMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className={`rounded-2xl border px-4 py-5 ${
                    metric.accent === 'rose'
                      ? 'border-rose-500/40 bg-rose-500/10'
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
                <h3 className="text-sm font-semibold text-slate-800">Clinical Quality Trends</h3>
                <div className="mt-4 h-40 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
                  Chart placeholder – monthly quality indicators.
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Audit Checklist</h3>
                <ul className="mt-4 space-y-3 text-xs text-slate-700">
                  {audits.map((audit) => (
                    <li key={audit.title} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{audit.title}</p>
                      <p className="text-xs text-slate-500">{audit.status}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
