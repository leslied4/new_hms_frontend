import { useState } from 'react';
import PageShell from '../../components/PageShell';
import SearchableSelect from '../../components/SearchableSelect';

export default function SettingsEditDiscount() {
  const [form, setForm] = useState({
    name: 'Staff Discount',
    rate: '15',
    appliesTo: 'Services',
    status: 'Active',
  });

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.confirm('Update discount?');
  };

  return (
    <PageShell title="Settings/edit_discount.php" sourcePath="templates/Settings/edit_discount.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Settings</p>
              <h2 className="text-2xl font-semibold text-slate-900">Edit Discount</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="text-xs text-slate-600">
                Discount Name
                <input
                  value={form.name}
                  onChange={(event) => updateForm('name', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Rate (%)
                <input
                  value={form.rate}
                  onChange={(event) => updateForm('rate', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs text-slate-600">
                Applies To
                <SearchableSelect
                  value={form.appliesTo}
                  onChange={(value) => updateForm('appliesTo', value)}
                  options={[
                    { value: 'Services', label: 'Services' },
                    { value: 'Medications', label: 'Medications' },
                    { value: 'All', label: 'All' },
                  ]}
                  className="mt-2"
                />
              </label>
              <label className="text-xs text-slate-600">
                Status
                <SearchableSelect
                  value={form.status}
                  onChange={(value) => updateForm('status', value)}
                  options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Inactive', label: 'Inactive' },
                  ]}
                  className="mt-2"
                />
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
