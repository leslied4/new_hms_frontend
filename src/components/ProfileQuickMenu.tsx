import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { clearTokens } from '../lib/auth';
import { api } from '../lib/api';

type HomeUserResponse = {
  user?: {
    first_name?: string;
    last_name?: string;
    username?: string;
  } | null;
};

const asText = (value: unknown): string => String(value ?? '').trim();

export default function ProfileQuickMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [initials, setInitials] = useState('U');
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocumentMouseDown);
    return () => document.removeEventListener('mousedown', onDocumentMouseDown);
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      try {
        const response = await api.get<HomeUserResponse>('/legacy/home/index/');
        if (!mounted) return;
        const first = asText(response?.user?.first_name);
        const last = asText(response?.user?.last_name);
        const username = asText(response?.user?.username);
        const source = `${first} ${last}`.trim() || username;
        if (!source) return;
        const chunks = source.split(/\s+/).filter(Boolean);
        if (!chunks.length) return;
        const value = chunks.length === 1
          ? chunks[0].slice(0, 2).toUpperCase()
          : `${chunks[0][0]}${chunks[1][0]}`.toUpperCase();
        setInitials(value);
      } catch (_err) {
        // Keep fallback initials.
      }
    };
    void loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    clearTokens();
    navigate('/Users/login', { replace: true });
  };

  return (
    <div ref={menuRef} className="fixed right-5 top-4 z-[70]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.34),rgba(255,255,255,0.08))] text-slate-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),0_10px_18px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:border-white/55 hover:text-slate-900"
        style={{ backdropFilter: 'saturate(170%) blur(10px)' }}
      >
        <span className={`pointer-events-none absolute inset-0 rounded-2xl border-2 transition ${open ? 'border-sky-500/70' : 'border-sky-500/0 group-hover:border-sky-500/55'}`} />
        <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 rotate-12 rounded-[8px] bg-sky-200/45 blur-[3px]" />
        <span className="text-sm font-semibold tracking-wide">{initials}</span>
      </button>

      <div
        className={`absolute right-0 mt-2 w-52 rounded-2xl border border-white/45 bg-[linear-gradient(155deg,rgba(255,255,255,0.42),rgba(255,255,255,0.10))] p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.60),0_12px_24px_rgba(15,23,42,0.10)] backdrop-blur-xl transition ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
        style={{ backdropFilter: 'saturate(170%) blur(11px)' }}
      >
        <Link
          to="/Users/update_profile"
          className="block rounded-xl border border-white/28 bg-white/16 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-white/50 hover:bg-white/30"
          onClick={() => setOpen(false)}
        >
          Profile
        </Link>
        <Link
          to="/Users/change_password"
          className="mt-1 block rounded-xl border border-white/28 bg-white/16 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-white/50 hover:bg-white/30"
          onClick={() => setOpen(false)}
        >
          Change Password
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 block w-full rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-left text-xs font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
