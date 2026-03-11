import { Outlet, Link, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { templateRoutes } from '../routes';
import { overriddenPaths } from '../routeOverrides';

const hiddenTemplatePaths = new Set([
  '/patients/visit_space',
  '/patients/view_visit_report',
]);

export default function AppLayout() {
  const location = useLocation();
  const [query, setQuery] = useState('');

  const filteredRoutes = useMemo(() => {
    const availableRoutes = templateRoutes.filter((route) => {
      const normalizedPath = route.path.toLowerCase();
      return !overriddenPaths.has(route.path) && !hiddenTemplatePaths.has(normalizedPath);
    });
    if (!query.trim()) {
      return availableRoutes;
    }
    const needle = query.toLowerCase();
    return availableRoutes.filter((route) => route.label.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">HMS Temp</p>
            <h1 className="text-3xl font-semibold text-slate-900">Template Migration Lab</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-amber-400/40 px-3 py-1 text-xs text-amber-500">
              React + Tailwind
            </span>
            <span className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700">
              {templateRoutes.length} templates
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[320px_1fr]">
        <aside className="template-frame h-[75vh] overflow-hidden">
          <div className="template-content flex h-full flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-600">Navigator</p>
              <h2 className="text-lg font-semibold text-slate-900">Browse templates</h2>
            </div>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search templates"
              className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            />
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-1">
                {filteredRoutes.map((route) => {
                  const isActive = location.pathname === route.path;
                  return (
                    <Link
                      key={route.path}
                      to={route.path}
                      className={`block rounded-xl px-3 py-2 text-sm transition ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-100'
                          : 'text-slate-700 hover:bg-slate-800/60 hover:text-slate-900'
                      }`}
                    >
                      {route.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <main className="template-frame min-h-[75vh]">
          <div className="template-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
