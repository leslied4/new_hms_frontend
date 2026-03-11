import { useEffect, useMemo, useRef, useState } from 'react';

type SearchableOption = {
  value: string;
  label: string;
  keywords?: string;
};

type SearchableSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SearchableOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const asText = (value: unknown): string => String(value ?? '').trim();

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  className = '',
}: SearchableSelectProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedOption = useMemo(
    () => options.find((option) => asText(option.value) === asText(value)) || null,
    [options, value],
  );

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return options;
    return options.filter((option) => {
      const haystack = `${option.label} ${option.keywords || ''}`.toLowerCase();
      return haystack.includes(search);
    });
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setOpen((prev) => !prev);
          setQuery('');
        }}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm disabled:bg-slate-100 disabled:text-slate-500"
      >
        <span className={selectedOption ? 'text-slate-800' : 'text-slate-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </button>
      {open ? (
        <div className="absolute z-[160] mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="max-h-56 overflow-y-auto p-1">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
              className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-600 hover:bg-slate-100"
            >
              {placeholder}
            </button>
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-slate-100 ${
                  asText(value) === asText(option.value) ? 'bg-sky-50 text-sky-800' : 'text-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
            {!filtered.length ? <p className="px-2 py-1.5 text-xs text-slate-500">No matches.</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
