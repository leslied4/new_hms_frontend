import PageShell from '../../components/PageShell';

const maternityProfile = {
  patient: 'Akua Mensah',
  stage: 'Ante-natal',
  dueDate: '2026-04-18',
  gravida: 'G2P1',
};

const visits = [
  { date: '2026-01-10', summary: 'Routine check, vitals normal.' },
  { date: '2026-01-24', summary: 'Ultrasound scheduled, supplements prescribed.' },
  { date: '2026-02-02', summary: 'BP stable, fetal movement normal.' },
];

export default function PatientsViewMaternity() {
  return (
    <PageShell title="Patients/view_maternity.php" sourcePath="templates/Patients/view_maternity.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Maternal</p>
              <h2 className="text-2xl font-semibold text-slate-900">Maternity Profile</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Patient</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{maternityProfile.patient}</p>
                <p className="mt-1 text-xs text-slate-500">{maternityProfile.gravida}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Stage & Due Date</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{maternityProfile.stage}</p>
                <p className="mt-1 text-xs text-slate-500">Due {maternityProfile.dueDate}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-800">Visit Timeline</h3>
              <div className="mt-4 space-y-3">
                {visits.map((visit) => (
                  <div key={visit.date} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs text-slate-500">{visit.date}</p>
                    <p className="mt-1 text-sm text-slate-800">{visit.summary}</p>
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
