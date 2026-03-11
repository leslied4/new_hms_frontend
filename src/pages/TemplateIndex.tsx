import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { templateRoutes } from '../routes';
import { overriddenPaths } from '../routeOverrides';

const hiddenTemplatePaths = new Set([
  '/patients/visit_space',
  '/patients/view_visit_report',
]);

export default function TemplateIndex() {
  return (
    <PageShell title="Template Catalog" sourcePath="templates/">
      <div className="grid gap-4 md:grid-cols-2">
        {templateRoutes
          .filter(
            (route) =>
              !overriddenPaths.has(route.path) &&
              !hiddenTemplatePaths.has(route.path.toLowerCase()),
          )
          .map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-400/60 hover:bg-white"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-300/70">Template</p>
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-slate-900">
              {route.label}
            </h2>
            <p className="mt-2 text-xs text-slate-600">{route.sourcePath}</p>
          </Link>
          ))}
      </div>
    </PageShell>
  );
}
