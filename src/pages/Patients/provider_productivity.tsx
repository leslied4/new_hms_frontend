import PageShell from '../../components/PageShell';

const providers = [
  { name: 'Dr. Boateng', visits: 38, avgTime: '18m', satisfaction: '94%' },
  { name: 'Dr. Mensah', visits: 29, avgTime: '22m', satisfaction: '90%' },
  { name: 'Dr. Ackah', visits: 34, avgTime: '19m', satisfaction: '93%' },
];

export default function PatientsProviderProductivity() {
  return (
    <PageShell
      title="Patients/provider_productivity.php"
      sourcePath="templates/Patients/provider_productivity.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Providers</p>
              <h2 className="text-2xl font-semibold text-slate-900">Provider Productivity</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 bg-white text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Visits</th>
                    <th className="px-4 py-3">Avg Visit Time</th>
                    <th className="px-4 py-3">Satisfaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {providers.map((provider) => (
                    <tr key={provider.name} className="hover:bg-white">
                      <td className="px-4 py-3 font-medium text-slate-900">{provider.name}</td>
                      <td className="px-4 py-3">{provider.visits}</td>
                      <td className="px-4 py-3">{provider.avgTime}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                          {provider.satisfaction}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
