import { useMemo, useState } from 'react';
import PageShell from '../../components/PageShell';

const metricCards = [
  { label: 'Active Patients', value: '1,284', delta: '+4.3%' },
  { label: 'Admissions Today', value: '42', delta: '+2' },
  { label: 'Discharges', value: '38', delta: '-1' },
  { label: 'Critical Alerts', value: '7', delta: '+1', alert: true },
];

const tabs = ['Overview', 'Clinical', 'Operations', 'Finance'];

export default function PatientsDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const highlights = useMemo(
    () => [
      { title: 'Average Length of Stay', value: '3.2 days' },
      { title: 'Bed Utilization', value: '82%' },
      { title: 'Pending Lab Results', value: '19' },
      { title: 'Follow-up Compliance', value: '91%' },
    ],
    []
  );

  return (
    <PageShell title="Patients/dashboard.php" sourcePath="templates/Patients/dashboard.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Patients</p>
                <h2 className="text-2xl font-semibold text-slate-900">EHR Dashboard</h2>
                <p className="text-sm text-slate-600">Live operational insights across clinics.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-1 text-xs transition ${
                      activeTab === tab
                        ? 'bg-emerald-500/20 text-emerald-100'
                        : 'border border-slate-300 text-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((metric) => (
                <div
                  key={metric.label}
                  className={`rounded-2xl border px-4 py-5 ${
                    metric.alert
                      ? 'border-rose-500/40 bg-rose-500/10'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="text-2xl font-semibold text-slate-900">{metric.value}</span>
                    <span
                      className={`text-xs ${
                        metric.alert ? 'text-rose-200' : 'text-emerald-300'
                      }`}
                    >
                      {metric.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Clinical Activity</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-500">{item.title}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-40 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
                  Chart placeholder – replace with analytics visualization.
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Today's Priorities</h3>
                <ul className="mt-4 space-y-3 text-xs text-slate-700">
                  <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    Review 12 pending discharge notes.
                  </li>
                  <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    Approve 5 radiology requests awaiting triage.
                  </li>
                  <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    Resolve 3 critical lab alerts in Ward B.
                  </li>
                </ul>
                <button className="mt-4 w-full rounded-xl border border-emerald-500/40 px-4 py-2 text-xs text-emerald-100">
                  View full queue
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
