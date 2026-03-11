import PageShell from '../../components/PageShell';

const summary = [
  { label: 'ANC Visits', value: '5' },
  { label: 'Supplements', value: 'Iron, Folate' },
  { label: 'Risk Level', value: 'Low' },
];

const checklist = [
  { task: 'Blood pressure check', status: 'Done' },
  { task: 'Ultrasound review', status: 'Pending' },
  { task: 'Nutritional counseling', status: 'Done' },
];

export default function PatientsViewMaternity1() {
  return (
    <PageShell title="Patients/view_maternity_1.php" sourcePath="templates/Patients/view_maternity_1.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Maternal</p>
              <h2 className="text-2xl font-semibold text-slate-900">Maternity Summary</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {summary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-800">Visit Checklist</h3>
              <div className="mt-4 space-y-3">
                {checklist.map((item) => (
                  <div key={item.task} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-sm text-slate-800">{item.task}</p>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
