import PageShell from '../../components/PageShell';

const visits = [
  { id: 'VST-001', date: '2026-01-27', type: 'OPD', clinician: 'Dr. Boateng', status: 'Completed' },
  { id: 'VST-002', date: '2026-01-20', type: 'IPD', clinician: 'Dr. Mensah', status: 'In Progress' },
  { id: 'VST-003', date: '2026-01-11', type: 'Telehealth', clinician: 'Dr. Ackah', status: 'Completed' },
];

export default function PatientsViewVisits() {
  return (
    <PageShell title="Patients/view_visits.php" sourcePath="templates/Patients/view_visits.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Visits</p>
                <h2 className="text-2xl font-semibold text-slate-900">Patient Visits</h2>
              </div>
              <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950">
                New visit
              </button>
            </div>

            <div className="space-y-3">
              {visits.map((visit) => (
                <div
                  key={visit.id}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">{visit.id}</p>
                      <p className="text-lg font-semibold text-slate-900">{visit.type} visit</p>
                      <p className="text-xs text-slate-600">
                        {visit.date} · {visit.clinician}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                        {visit.status}
                      </span>
                      <button className="rounded-full border border-slate-300 px-3 py-1 text-[11px] text-slate-800">
                        View
                      </button>
                    </div>
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
