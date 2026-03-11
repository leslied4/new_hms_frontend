import PageShell from '../../components/PageShell';

const outstanding = [
  { patient: 'Esi Ackah', amount: 'GHS 420', days: 5 },
  { patient: 'Kojo Mensimah', amount: 'GHS 680', days: 12 },
  { patient: 'Yaw Boateng', amount: 'GHS 240', days: 3 },
];

export default function BillingsPatientOutstandingBills() {
  return (
    <PageShell
      title="Billings/patient_outstanding_bills.php"
      sourcePath="templates/Billings/patient_outstanding_bills.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Outstanding</p>
              <h2 className="text-2xl font-semibold text-slate-900">Patient Outstanding Bills</h2>
            </div>

            <div className="space-y-3">
              {outstanding.map((item) => (
                <div key={item.patient} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.patient}</p>
                    <p className="text-xs text-slate-500">{item.days} days overdue</p>
                  </div>
                  <p className="text-sm font-semibold text-rose-200">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
