import PageShell from '../../components/PageShell';

const vouchers = [
  { id: 'VCH-221', session: 'Physio 2026-01-28', amount: 'GHS 150', status: 'Open' },
  { id: 'VCH-222', session: 'Chiro 2026-01-29', amount: 'GHS 180', status: 'Closed' },
];

export default function BillingsSessionVouchers() {
  return (
    <PageShell
      title="Billings/session_vouchers.php"
      sourcePath="templates/Billings/session_vouchers.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Sessions</p>
              <h2 className="text-2xl font-semibold text-slate-900">Session Vouchers</h2>
            </div>

            <div className="space-y-3">
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{voucher.id}</p>
                    <p className="text-xs text-slate-500">{voucher.session}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-900">{voucher.amount}</p>
                    <p className="text-xs text-emerald-200">{voucher.status}</p>
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
