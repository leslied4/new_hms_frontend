import PageShell from '../../components/PageShell';

const inpatientStats = [
  { label: 'Admissions', value: '312' },
  { label: 'Discharges', value: '298' },
  { label: 'Average LOS', value: '3.4 days' },
  { label: 'Bed Occupancy', value: '79%' },
];

const wards = [
  { name: 'Ward A', occupancy: '82%' },
  { name: 'Ward B', occupancy: '76%' },
  { name: 'Ward C', occupancy: '88%' },
];

export default function PatientsInpatientReport() {
  return (
    <PageShell title="Patients/inpatient_report.php" sourcePath="templates/Patients/inpatient_report.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Reports</p>
              <h2 className="text-2xl font-semibold text-slate-900">Inpatient Report</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {inpatientStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-800">Ward Occupancy</h3>
              <div className="mt-4 space-y-3">
                {wards.map((ward) => (
                  <div key={ward.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-sm text-slate-900">{ward.name}</p>
                    <span className="text-sm text-emerald-200">{ward.occupancy}</span>
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
