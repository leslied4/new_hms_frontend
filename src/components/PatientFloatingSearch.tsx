import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

type PatientSearchResult = {
  id: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  folder_number?: string;
  code?: string;
  phone?: string;
};

const asText = (value: unknown): string => String(value ?? '').trim();

export default function PatientFloatingSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PatientSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (searchRef.current && target && !searchRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocumentMouseDown);
    return () => document.removeEventListener('mousedown', onDocumentMouseDown);
  }, []);

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await api.get<PatientSearchResult[]>(
          `/legacy/patients/search-predictive-patient-name/?name=${encodeURIComponent(term)}&limit=12`,
        );
        setResults(Array.isArray(response) ? response : []);
      } catch (_err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 320);

    return () => window.clearTimeout(timer);
  }, [query]);

  const openPatientShortcut = (patientId: string) => {
    setOpen(false);
    setQuery('');
    setResults([]);
    navigate(`/Home/patient?patient_id=${encodeURIComponent(patientId)}`);
  };

  return (
    <div ref={searchRef} className="fixed left-1/2 top-4 z-[70] w-[min(900px,calc(100vw-180px))] -translate-x-1/2">
      <div className="flex items-center gap-2">
        <div
          className="group shrink-0 flex h-11 items-center rounded-2xl border border-cyan-300/75 bg-[linear-gradient(140deg,rgba(255,255,255,0.84),rgba(214,244,255,0.48)_45%,rgba(255,255,255,0.24))] px-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_12px_26px_rgba(8,47,73,0.18)] backdrop-blur-xl"
          style={{ backdropFilter: 'saturate(180%) blur(12px)' }}
        >
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-xl border border-cyan-300/70 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(103,232,249,0.38)_55%,rgba(14,116,144,0.48))] text-[11px] font-black text-cyan-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_14px_rgba(8,47,73,0.25)]">
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-cyan-100/85" />
              F
            </span>
            <p className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-800 bg-clip-text text-base font-black tracking-[0.065em] text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.45)]">
              FIRSTLINE24
            </p>
          </div>
        </div>
        <div
          className="min-w-0 flex h-11 flex-1 items-center rounded-2xl border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.40),rgba(255,255,255,0.10))] px-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.62),0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          style={{ backdropFilter: 'saturate(170%) blur(11px)' }}
          onMouseDown={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
            setOpen(true);
          }}
        >
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-slate-600">
              <path d="M10.5 3a7.5 7.5 0 1 1-4.7 13.4L2.7 19.5l-1.2-1.2 3.1-3.1A7.5 7.5 0 0 1 10.5 3Zm0 2A5.5 5.5 0 1 0 16 10.5 5.5 5.5 0 0 0 10.5 5Z" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onFocus={() => setOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              placeholder="Search patient: name, code, folder, card, or phone"
              className="w-full bg-transparent text-sm text-slate-800 placeholder:text-xs placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {open && query.trim() ? (
        <div
          className="mt-2 max-h-[360px] overflow-y-auto rounded-2xl border border-white/45 bg-[linear-gradient(155deg,rgba(255,255,255,0.40),rgba(255,255,255,0.10))] p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.60),0_12px_28px_rgba(15,23,42,0.10)] backdrop-blur-xl"
          style={{ backdropFilter: 'saturate(170%) blur(12px)' }}
        >
          {loading ? <p className="px-2 py-2 text-xs text-slate-600">Searching...</p> : null}

          {!loading && !results.length ? <p className="px-2 py-2 text-xs text-slate-600">No matching patients.</p> : null}

          {results.map((patient) => {
            const fullName = `${asText(patient.first_name)} ${asText(patient.last_name)}`.trim() || asText(patient.name) || 'Unknown';
            const meta = [asText(patient.code), asText(patient.folder_number), asText(patient.phone)].filter(Boolean).join(' • ');
            return (
              <button
                key={patient.id}
                type="button"
                onClick={() => openPatientShortcut(patient.id)}
                className="block w-full rounded-xl border border-white/30 bg-white/18 px-3 py-2 text-left transition hover:border-white/50 hover:bg-white/32"
              >
                <p className="text-sm font-semibold text-slate-900">{fullName}</p>
                <p className="text-xs text-slate-600">{meta || 'No details'}</p>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
