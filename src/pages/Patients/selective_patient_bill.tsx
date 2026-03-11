import PageShell from '../../components/PageShell';

const billItems = [
  { item: 'Consultation', amount: 120 },
  { item: 'Lab - CBC', amount: 80 },
  { item: 'X-Ray', amount: 200 },
];

export default function PatientsSelectivePatientBill() {
  const total = billItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <PageShell
      title="Patients/selective_patient_bill.php"
      sourcePath="templates/Patients/selective_patient_bill.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Billing</p>
              <h2 className="text-2xl font-semibold text-slate-900">Selective Patient Bill</h2>
            </div>

            <div className="space-y-3">
              {billItems.map((item) => (
                <div key={item.item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm text-slate-800">{item.item}</p>
                  <p className="text-sm font-semibold text-slate-900">GHS {item.amount}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3">
              <p className="text-sm text-emerald-200">Total</p>
              <p className="text-lg font-semibold text-slate-900">GHS {total}</p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
