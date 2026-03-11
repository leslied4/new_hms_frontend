import PageShell from '../../components/PageShell';

const sessions = [
  { id: 'SS-220', date: '2026-01-24', type: 'Physio', status: 'Completed' },
  { id: 'SS-221', date: '2026-01-27', type: 'Chiro', status: 'In progress' },
  { id: 'SS-222', date: '2026-01-30', type: 'Follow-up', status: 'Scheduled' },
];

export default function PatientsPatientSessionsView() {
  return (
    <PageShell
      title="Patients/patient_sessions_view.php"
      sourcePath="templates/Patients/patient_sessions_view.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Sessions</p>
              <h2 className="text-2xl font-semibold text-slate-900">Patient Sessions</h2>
            </div>

            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{session.type}</p>
                      <p className="text-xs text-slate-500">{session.date}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                      {session.status}
                    </span>
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
