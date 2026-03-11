import { useState } from 'react';
import PageShell from '../../components/PageShell';

const queues = [
  { name: 'OPD Queue', active: true, count: 18 },
  { name: 'Lab Queue', active: true, count: 7 },
  { name: 'Radiology Queue', active: false, count: 0 },
];

export default function SettingsQueueManager() {
  const [data, setData] = useState(queues);

  const toggleQueue = (name: string) => {
    setData((prev) =>
      prev.map((queue) =>
        queue.name === name ? { ...queue, active: !queue.active } : queue
      )
    );
  };

  return (
    <PageShell title="Settings/queue_manager.php" sourcePath="templates/Settings/queue_manager.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Settings</p>
              <h2 className="text-2xl font-semibold text-slate-900">Queue Manager</h2>
            </div>

            <div className="space-y-3">
              {data.map((queue) => (
                <div key={queue.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{queue.name}</p>
                    <p className="text-xs text-slate-500">Active patients: {queue.count}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleQueue(queue.name)}
                    className={`rounded-full px-4 py-1 text-xs ${
                      queue.active
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : 'bg-slate-700/40 text-slate-700'
                    }`}
                  >
                    {queue.active ? 'Enabled' : 'Disabled'}
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
