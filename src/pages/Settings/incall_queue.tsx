import PageShell from '../../components/PageShell';

const incallEntries = [
  { patient: 'Esi Ackah', room: 'Room 1', status: 'Waiting' },
  { patient: 'Kojo Mensimah', room: 'Room 2', status: 'In session' },
  { patient: 'Yaw Boateng', room: 'Room 3', status: 'Waiting' },
];

export default function SettingsIncallQueue() {
  return (
    <PageShell title="Settings/incall_queue.php" sourcePath="templates/Settings/incall_queue.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Queue</p>
              <h2 className="text-2xl font-semibold text-slate-900">In-call Queue</h2>
            </div>

            <div className="space-y-3">
              {incallEntries.map((entry) => (
                <div key={entry.patient} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{entry.patient}</p>
                    <p className="text-xs text-slate-500">{entry.room}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] ${
                      entry.status === 'In session'
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : 'bg-slate-700/40 text-slate-700'
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
