import PageShell from '../../components/PageShell';

export default function SessionsPlannerCalendar() {
  return (
    <PageShell title="Sessions/planner_calendar.php" sourcePath="templates/Sessions/planner_calendar.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Sessions</p>
              <h2 className="text-2xl font-semibold text-slate-900">Planner Calendar</h2>
              <p className="text-sm text-slate-600">Placeholder view for session workflow.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Replace this stub with the legacy template content.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
