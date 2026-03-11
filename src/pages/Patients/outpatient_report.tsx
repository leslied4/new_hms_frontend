import PageShell from '../../components/PageShell';

const stats = [
  { label: 'Total OPD Visits', value: '1,120' },
  { label: 'Average Wait Time', value: '16 min' },
  { label: 'No-show Rate', value: '5%' },
];

const clinics = [
  { name: 'General OPD', visits: 420 },
  { name: 'Cardiology', visits: 210 },
  { name: 'Pediatrics', visits: 180 },
];

export default function PatientsOutpatientReport() {
  return (
    <PageShell
      title="Patients/outpatient_report.php"
      sourcePath="templates/Patients/outpatient_report.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Reports</p>
              <h2 className="text-2xl font-semibold text-slate-900">Outpatient Report</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-800">Clinic Breakdown</h3>
              <div className="mt-4 space-y-3">
                {clinics.map((clinic) => (
                  <div key={clinic.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-sm text-slate-900">{clinic.name}</p>
                    <span className="text-sm text-emerald-200">{clinic.visits} visits</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
