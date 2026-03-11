import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PageShellProps {
  title: string;
  sourcePath?: string;
  children: ReactNode;
}

export default function PageShell({ title, sourcePath, children }: PageShellProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/70">Template</p>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="rounded-full border border-emerald-500/40 px-3 py-1 text-xs font-medium text-emerald-200 transition hover:border-emerald-400 hover:text-emerald-100"
          >
            Back to index
          </Link>
          {sourcePath ? (
            <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-700">
              {sourcePath}
            </span>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}
