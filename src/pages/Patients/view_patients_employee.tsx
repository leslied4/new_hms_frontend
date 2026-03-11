import PageShell from '../../components/PageShell';

const employees = [
  { name: 'Ama Boateng', role: 'Nurse', patients: 18, status: 'On shift' },
  { name: 'Dr. Mensah', role: 'Physician', patients: 12, status: 'On shift' },
  { name: 'Nana Yeboah', role: 'Lab Tech', patients: 7, status: 'Off shift' },
];

export default function PatientsViewPatientsEmployee() {
  return (
    <PageShell title="Patients/view_patients_employee.php" sourcePath="templates/Patients/view_patients_employee.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Patients</p>
              <h2 className="text-2xl font-semibold text-slate-900">Assigned Patients by Employee</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {employees.map((employee) => (
                <div key={employee.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{employee.name}</p>
                      <p className="text-xs text-slate-600">{employee.role}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] ${
                        employee.status === 'On shift'
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : 'bg-slate-700/40 text-slate-700'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-700">
                    <span>Assigned patients</span>
                    <span className="text-lg font-semibold text-slate-900">{employee.patients}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
