import PageShell from '../../components/PageShell';

const report = {
  patient: 'Kojo Mensimah',
  date: '2026-01-28',
  diagnosis: 'Cervical strain',
  plan: 'Manual therapy and stretching exercises',
};

export default function PatientsSingleChiroAssessmentPlanVisitReport() {
  return (
    <PageShell
      title="Patients/single_chiro_assessment_plan_visit_report.php"
      sourcePath="templates/Patients/single_chiro_assessment_plan_visit_report.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Chiro Report</p>
              <h2 className="text-2xl font-semibold text-slate-900">Chiro Visit Report</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Patient</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{report.patient}</p>
              <p className="mt-1 text-xs text-slate-500">{report.date}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Diagnosis</p>
                <p className="mt-2 text-sm text-slate-800">{report.diagnosis}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Plan</p>
                <p className="mt-2 text-sm text-slate-800">{report.plan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
