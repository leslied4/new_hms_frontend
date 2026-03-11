import PageShell from '../../components/PageShell';

const examSections = [
  { title: 'General', notes: 'Alert, oriented, no acute distress.' },
  { title: 'Cardiovascular', notes: 'Normal S1/S2, no murmurs.' },
  { title: 'Respiratory', notes: 'Clear breath sounds bilaterally.' },
  { title: 'Abdominal', notes: 'Soft, non-tender, no organomegaly.' },
  { title: 'Neurological', notes: 'No focal deficits noted.' },
];

export default function PatientsViewPatientExamination() {
  return (
    <PageShell
      title="Patients/view_patient_examination.php"
      sourcePath="templates/Patients/view_patient_examination.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Examination</p>
              <h2 className="text-2xl font-semibold text-slate-900">Clinical Examination</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {examSections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{section.title}</p>
                  <p className="mt-2 text-sm text-slate-800">{section.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
