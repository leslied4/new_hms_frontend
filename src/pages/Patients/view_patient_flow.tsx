import PageShell from '../../components/PageShell';

const flowSteps = [
  { step: 'Registration', time: '08:20', status: 'complete' },
  { step: 'Triage', time: '08:45', status: 'complete' },
  { step: 'Consultation', time: '09:30', status: 'active' },
  { step: 'Lab', time: '10:15', status: 'pending' },
  { step: 'Billing', time: '11:00', status: 'pending' },
];

export default function PatientsViewPatientFlow() {
  return (
    <PageShell title="Patients/view_patient_flow.php" sourcePath="templates/Patients/view_patient_flow.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Flow</p>
              <h2 className="text-2xl font-semibold text-slate-900">Patient Flow</h2>
            </div>

            <div className="space-y-3">
              {flowSteps.map((flow) => (
                <div
                  key={flow.step}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{flow.step}</p>
                    <p className="text-xs text-slate-500">Scheduled · {flow.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] ${
                      flow.status === 'complete'
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : flow.status === 'active'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-slate-700/40 text-slate-700'
                    }`}
                  >
                    {flow.status}
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
