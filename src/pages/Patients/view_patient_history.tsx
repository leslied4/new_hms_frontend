import PageShell from '../../components/PageShell';

const history = [
  { label: 'Past Medical History', value: 'Hypertension, Type II Diabetes' },
  { label: 'Past Surgical History', value: 'Appendectomy (2015)' },
  { label: 'Allergies', value: 'Penicillin' },
  { label: 'Family History', value: 'Father: Stroke, Mother: Diabetes' },
  { label: 'Social History', value: 'Non-smoker, Occasional alcohol' },
];

export default function PatientsViewPatientHistory() {
  return (
    <PageShell
      title="Patients/view_patient_history.php"
      sourcePath="templates/Patients/view_patient_history.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">History</p>
              <h2 className="text-2xl font-semibold text-slate-900">Patient History</h2>
            </div>

            <div className="grid gap-4">
              {history.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
