import PageShell from '../../components/PageShell';

const reportRows = [
  { service: 'Diabetes check-in', count: 42, completion: '88%' },
  { service: 'Hypertension review', count: 38, completion: '91%' },
  { service: 'Prenatal routine', count: 25, completion: '84%' },
];

export default function PatientsRoutineCareReport() {
  return (
    <PageShell
      title="Patients/routine_care_report.php"
      sourcePath="templates/Patients/routine_care_report.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Reports</p>
              <h2 className="text-2xl font-semibold text-slate-900">Routine Care Report</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 bg-white text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Patients</th>
                    <th className="px-4 py-3">Completion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {reportRows.map((row) => (
                    <tr key={row.service}>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.service}</td>
                      <td className="px-4 py-3">{row.count}</td>
                      <td className="px-4 py-3">{row.completion}</td>
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
