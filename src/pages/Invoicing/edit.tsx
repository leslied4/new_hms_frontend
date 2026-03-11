import { useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import PageShell from '../../components/PageShell';

export default function InvoicingEdit() {
  const [form, setForm] = useState({ invoiceId: 'INV-401', amount: '420', status: 'Pending' });

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.confirm('Update invoice?');
  };

  return (
    <PageShell title="Invoicing/edit.php" sourcePath="templates/Invoicing/edit.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Invoicing</p>
              <h2 className="text-2xl font-semibold text-slate-900">Edit Invoice</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="text-xs text-slate-600">
                Invoice ID
                <input
                  value={form.invoiceId}
                  onChange={(event) => updateForm('invoiceId', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Amount
                <input
                  value={form.amount}
                  onChange={(event) => updateForm('amount', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Status
                <SearchableSelectField
                  value={form.status}
                  onChange={(event) => updateForm('status', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Cancelled</option>
                </SearchableSelectField>
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
