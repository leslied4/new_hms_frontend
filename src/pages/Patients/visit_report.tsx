import PageShell from '../../components/PageShell';

const report = {
  patient: 'Esi Ackah',
  visitId: 'VST-001',
  date: '2026-01-27',
  clinician: 'Dr. Boateng',
  summary: 'Patient stable. Medication adjusted, follow-up scheduled in one week.',
};

const vitals = [
  { label: 'BP', value: '130/86' },
  { label: 'HR', value: '78 bpm' },
  { label: 'Temp', value: '36.8°C' },
  { label: 'SpO2', value: '98%' },
];

export default function PatientsVisitReport() {
  return (
    <PageShell title="Patients/visit_report.php" sourcePath="templates/Patients/visit_report.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Visit Report</p>
                <h2 className="text-2xl font-semibold text-slate-900">Visit Report</h2>
                <p className="text-sm text-slate-600">{report.patient} · {report.date}</p>
              </div>
              <button className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-800">Print</button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Visit ID</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{report.visitId}</p>
                <p className="mt-2 text-xs text-slate-600">Clinician: {report.clinician}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Summary</p>
                <p className="mt-2 text-sm text-slate-800">{report.summary}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {vitals.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
