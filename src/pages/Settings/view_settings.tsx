import PageShell from '../../components/PageShell';

const settings = [
  { label: 'Facility Name', value: 'Firstline24 Clinic' },
  { label: 'Timezone', value: 'GMT' },
  { label: 'Default Currency', value: 'GHS' },
  { label: 'Auto-logout', value: '30 mins' },
];

export default function SettingsViewSettings() {
  return (
    <PageShell title="Settings/view_settings.php" sourcePath="templates/Settings/view_settings.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Settings</p>
              <h2 className="text-2xl font-semibold text-slate-900">View Settings</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {settings.map((setting) => (
                <div key={setting.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">{setting.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{setting.value}</p>
                </div>
              ))}
            </div>

            <button className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-800">
              Edit settings
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
