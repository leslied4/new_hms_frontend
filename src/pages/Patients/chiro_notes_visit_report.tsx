import PageShell from '../../components/PageShell';

const notes = [
  { label: 'Subjective', value: 'Patient reports reduced stiffness.' },
  { label: 'Objective', value: 'Range of motion improved by 10%.' },
  { label: 'Assessment', value: 'Continued progress with treatment.' },
  { label: 'Plan', value: 'Continue weekly adjustments for 3 weeks.' },
];

export default function PatientsChiroNotesVisitReport() {
  return (
    <PageShell
      title="Patients/chiro_notes_visit_report.php"
      sourcePath="templates/Patients/chiro_notes_visit_report.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Chiro Notes</p>
              <h2 className="text-2xl font-semibold text-slate-900">Chiro Notes Visit Report</h2>
            </div>

            <div className="grid gap-4">
              {notes.map((note) => (
                <div key={note.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{note.label}</p>
                  <p className="mt-2 text-sm text-slate-800">{note.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
