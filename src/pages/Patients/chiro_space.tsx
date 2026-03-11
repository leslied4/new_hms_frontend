import PageShell from '../../components/PageShell';

const chiroModules = [
  { title: 'Posture Assessment', status: 'Complete' },
  { title: 'Pain Scale', status: 'Complete' },
  { title: 'Adjustment Plan', status: 'In progress' },
  { title: 'Exercise Therapy', status: 'Pending' },
];

export default function PatientsChiroSpace() {
  return (
    <PageShell title="Patients/chiro_space.php" sourcePath="templates/Patients/chiro_space.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Chiropractic</p>
              <h2 className="text-2xl font-semibold text-slate-900">Chiro Visit Workspace</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {chiroModules.map((module) => (
                <div key={module.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{module.title}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] ${
                        module.status === 'Complete'
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : module.status === 'In progress'
                          ? 'bg-amber-500/20 text-amber-500'
                          : 'bg-slate-700/40 text-slate-700'
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>
                  <button className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-2 text-xs text-slate-800">
                    Open module
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
