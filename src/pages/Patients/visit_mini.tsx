import PageShell from '../../components/PageShell';

const quickSummary = [
  { label: 'Visit ID', value: 'VST-001' },
  { label: 'Clinic', value: 'General OPD' },
  { label: 'Clinician', value: 'Dr. Boateng' },
  { label: 'Status', value: 'In progress' },
];

export default function PatientsVisitMini() {
  return (
    <PageShell title="Patients/visit_mini.php" sourcePath="templates/Patients/visit_mini.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Visit Mini</p>
              <h2 className="text-2xl font-semibold text-slate-900">Visit Snapshot</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {quickSummary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
              Quick actions: capture vitals, add note, schedule labs.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
