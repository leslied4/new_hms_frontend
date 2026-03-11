import PageShell from '../../components/PageShell';

const assessment = [
  { label: 'Primary Complaint', value: 'Lower back pain' },
  { label: 'Assessment', value: 'Lumbar strain, moderate' },
  { label: 'Plan', value: 'Spinal adjustment twice weekly for 4 weeks' },
];

export default function PatientsChiroAssessmentPlanVisitReport() {
  return (
    <PageShell
      title="Patients/chiro_assessment_plan_visit_report.php"
      sourcePath="templates/Patients/chiro_assessment_plan_visit_report.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Chiro Report</p>
              <h2 className="text-2xl font-semibold text-slate-900">Chiro Assessment Plan Report</h2>
            </div>

            <div className="grid gap-4">
              {assessment.map((item) => (
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
