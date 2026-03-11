import PageShell from '../../components/PageShell';

const summary = [
  { label: 'Pending Approvals', value: '12' },
  { label: 'Recurring Expenses', value: '34' },
  { label: 'Outstanding', value: 'GHS 18k' },
  { label: 'Write-offs', value: '4' },
];

const expenses = [
  { vendor: 'Med Supplies Ltd', category: 'Supplies', amount: 'GHS 1,200', status: 'Pending' },
  { vendor: 'Facility Utilities', category: 'Utilities', amount: 'GHS 890', status: 'Approved' },
  { vendor: 'Cleaning Services', category: 'Services', amount: 'GHS 430', status: 'Pending' },
];

export default function ExpensesIndex() {
  return (
    <PageShell title="Expenses/index.php" sourcePath="templates/Expenses/index.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Expenses</p>
              <h2 className="text-2xl font-semibold text-slate-900">Expense Overview</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {summary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.vendor} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{expense.vendor}</p>
                    <p className="text-xs text-slate-500">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-900">{expense.amount}</p>
                    <p className="text-xs text-emerald-200">{expense.status}</p>
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
