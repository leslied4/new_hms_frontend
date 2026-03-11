import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { registerToastListener, ToastPayload } from '../lib/toast';

type ToastRecord = Required<ToastPayload>;

function typeClasses(type: ToastRecord['type']): string {
  if (type === 'success') return 'border-emerald-200 bg-emerald-50 text-emerald-900';
  if (type === 'error') return 'border-rose-200 bg-rose-50 text-rose-900';
  return 'border-slate-200 bg-white text-slate-900';
}

export default function ToastViewport() {
  const [items, setItems] = useState<ToastRecord[]>([]);

  useEffect(() => {
    registerToastListener((payload) => {
      setItems((current) => [...current, payload].slice(-6));
      window.setTimeout(() => {
        setItems((current) => current.filter((item) => item.id !== payload.id));
      }, payload.durationMs);
    });
    return () => registerToastListener(null);
  }, []);

  const container = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return document.body;
  }, []);

  if (!container || !items.length) return null;

  return createPortal(
    <div className="pointer-events-none fixed right-4 top-4 z-[300] flex w-[min(420px,calc(100vw-1.5rem))] flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`pointer-events-auto rounded-xl border px-3 py-2 shadow-lg backdrop-blur ${typeClasses(item.type)}`}
        >
          {item.title ? <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">{item.title}</p> : null}
          <p className="text-sm">{item.message}</p>
        </div>
      ))}
    </div>,
    container,
  );
}
