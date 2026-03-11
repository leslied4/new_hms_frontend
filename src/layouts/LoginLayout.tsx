import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
        </div>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-6 py-16 lg:flex-row lg:items-center">
          <section className="flex-1 space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Firstline24 HMS</p>
            <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
              Welcome back to the clinical workspace.
            </h1>
            <p className="text-base text-slate-600 md:text-lg">
              This React migration keeps your workflow familiar while unlocking a faster, modern UI
              built with Tailwind. Log in to continue.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Secure sessions</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Unified templates</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Migration in progress</span>
            </div>
          </section>
          <section className="w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
