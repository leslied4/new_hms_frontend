import PageShell from '../../components/PageShell';

const expiring = [
  { patient: 'Esi Ackah', insurer: 'NHIS', expiry: '2026-02-05' },
  { patient: 'Kojo Mensimah', insurer: 'Premier Health', expiry: '2026-02-08' },
  { patient: 'Adwoa Sika', insurer: 'NHIS', expiry: '2026-02-11' },
];

export default function PatientsPatientInsuranceExpiry() {
  return (
    <PageShell
      title="Patients/patient_insurance_expiry.php"
      sourcePath="templates/Patients/patient_insurance_expiry.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Insurance</p>
              <h2 className="text-2xl font-semibold text-slate-900">Insurance Expiry List</h2>
            </div>

            <div className="space-y-3">
              {expiring.map((item) => (
                <div key={item.patient} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.patient}</p>
                    <p className="text-xs text-slate-500">{item.insurer}</p>
                  </div>
                  <div className="text-xs text-amber-500">Expires {item.expiry}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
