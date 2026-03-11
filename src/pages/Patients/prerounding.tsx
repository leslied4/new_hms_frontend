import PageShell from '../../components/PageShell';

const preroundingList = [
  { room: 'Ward A-12', patient: 'Esi Ackah', summary: 'Vitals stable, awaiting labs.' },
  { room: 'Ward B-03', patient: 'Kojo Mensimah', summary: 'Pain reduced, mobility improving.' },
  { room: 'Ward C-08', patient: 'Yaw Boateng', summary: 'Post-op day 2, dressing change needed.' },
];

export default function PatientsPrerounding() {
  return (
    <PageShell title="Patients/prerounding.php" sourcePath="templates/Patients/prerounding.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Rounds</p>
              <h2 className="text-2xl font-semibold text-slate-900">Prerounding Checklist</h2>
            </div>

            <div className="space-y-3">
              {preroundingList.map((item) => (
                <div key={item.room} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.patient}</p>
                      <p className="text-xs text-slate-500">{item.room}</p>
                    </div>
                    <button className="rounded-full border border-slate-300 px-3 py-1 text-[11px] text-slate-800">
                      Review
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-slate-700">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
