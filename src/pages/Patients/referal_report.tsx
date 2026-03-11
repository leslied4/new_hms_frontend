import PageShell from '../../components/PageShell';

const referrals = [
  { patient: 'Esi Ackah', referredTo: 'Cardiology', date: '2026-01-26' },
  { patient: 'Kojo Mensimah', referredTo: 'Orthopedics', date: '2026-01-28' },
  { patient: 'Akua Mensah', referredTo: 'Maternal Care', date: '2026-01-29' },
];

export default function PatientsReferalReport() {
  return (
    <PageShell
      title="Patients/referal_report.php"
      sourcePath="templates/Patients/referal_report.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Referrals</p>
              <h2 className="text-2xl font-semibold text-slate-900">Referral Report</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 bg-white text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Referred To</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {referrals.map((referral) => (
                    <tr key={`${referral.patient}-${referral.date}`}>
                      <td className="px-4 py-3 font-medium text-slate-900">{referral.patient}</td>
                      <td className="px-4 py-3">{referral.referredTo}</td>
                      <td className="px-4 py-3">{referral.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
