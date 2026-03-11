import { useState } from 'react';
import PageShell from '../../components/PageShell';
import SearchableSelect from '../../components/SearchableSelect';

export default function SettingsAddSetting() {
  const [form, setForm] = useState({ key: '', value: '', category: 'General' });

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.confirm('Save new setting?');
  };

  return (
    <PageShell title="Settings/add_setting.php" sourcePath="templates/Settings/add_setting.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Settings</p>
              <h2 className="text-2xl font-semibold text-slate-900">Add Setting</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="text-xs text-slate-600">
                Setting Key
                <input
                  value={form.key}
                  onChange={(event) => updateForm('key', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  required
                />
              </label>
              <label className="text-xs text-slate-600">
                Value
                <input
                  value={form.value}
                  onChange={(event) => updateForm('value', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  required
                />
              </label>
              <label className="text-xs text-slate-600">
                Category
                <SearchableSelect
                  value={form.category}
                  onChange={(value) => updateForm('category', value)}
                  options={[
                    { value: 'General', label: 'General' },
                    { value: 'Billing', label: 'Billing' },
                    { value: 'Queue', label: 'Queue' },
                    { value: 'Notifications', label: 'Notifications' },
                  ]}
                  className="mt-2"
                />
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Save
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
