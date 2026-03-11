import PageShell from '../../components/PageShell';

export default function ExpensesDisableRecurringModal() {
  return (
    <PageShell title="Expenses/disable_recurring_modal.php" sourcePath="templates/Expenses/disable_recurring_modal.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Expenses</p>
              <h2 className="text-2xl font-semibold text-slate-900">Disable Recurring Expense</h2>
              <p className="text-sm text-slate-600">Modal content placeholder for this expense action.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              This modal should be reimplemented with form fields and workflow actions from the legacy template.
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">Confirm</button>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
