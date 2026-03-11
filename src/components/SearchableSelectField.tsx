import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

type FlatOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type ChangeEventLike = {
  target: {
    value: string;
    selectedOptions: Array<{ value: string; label: string }>;
    name?: string;
    id?: string;
  };
};

type Props = {
  value?: string | string[];
  onChange?: (event: ChangeEventLike) => void;
  children?: ReactNode;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
};

const text = (v: unknown): string => String(v ?? '').trim();

function flatten(children: ReactNode): FlatOption[] {
  const out: FlatOption[] = [];
  const walk = (node: ReactNode) => {
    if (node == null) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node !== 'object') return;
    const el = node as { type?: unknown; props?: Record<string, unknown> };
    const type = text(el.type).toLowerCase();
    if (type === 'option') {
      const rawValue = el.props?.value;
      const value = rawValue === undefined || rawValue === null ? '' : String(rawValue);
      const label = text(el.props?.children) || value;
      out.push({ value, label, disabled: Boolean(el.props?.disabled) });
      return;
    }
    if (type === 'optgroup') {
      walk(el.props?.children as ReactNode);
      return;
    }
    walk((el.props?.children as ReactNode) ?? null);
  };
  walk(children);
  return out;
}

export default function SearchableSelectField({
  value,
  onChange,
  children,
  multiple = false,
  disabled = false,
  className = '',
  name,
  id,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const options = useMemo(() => flatten(children), [children]);

  const selectedValues = useMemo(() => {
    if (multiple) {
      if (Array.isArray(value)) return value.map((v) => String(v));
      return text(value) ? [String(value)] : [];
    }
    return [text(value)];
  }, [multiple, value]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return options;
    return options.filter((o) => `${o.label} ${o.value}`.toLowerCase().includes(q));
  }, [options, query]);

  const selectedLabel = useMemo(() => {
    if (multiple) {
      const count = selectedValues.filter(Boolean).length;
      if (!count) return 'Select...';
      return `${count} selected`;
    }
    const found = options.find((o) => o.value === selectedValues[0]);
    return found?.label || options.find((o) => o.value === '')?.label || 'Select...';
  }, [multiple, options, selectedValues]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const emit = (nextValues: string[]) => {
    if (!onChange) return;
    const selectedOptions = options
      .filter((o) => nextValues.includes(o.value))
      .map((o) => ({ value: o.value, label: o.label }));
    onChange({
      target: {
        value: multiple ? (nextValues[0] || '') : (nextValues[0] || ''),
        selectedOptions,
        name,
        id,
      },
    });
  };

  const selectOne = (picked: string) => {
    emit([picked]);
    setOpen(false);
  };

  const toggleMulti = (picked: string) => {
    const set = new Set(selectedValues);
    if (set.has(picked)) set.delete(picked);
    else set.add(picked);
    emit(Array.from(set));
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => {
          setOpen((prev) => !prev);
          setQuery('');
        }}
        className={className || 'w-full rounded border border-slate-300 px-3 py-2 text-sm text-left'}
      >
        {selectedLabel}
      </button>
      {open ? (
        <div className="absolute z-[220] mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl">
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
            {!multiple ? (
              <button
                type="button"
                onClick={() => selectOne('')}
                className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-600 hover:bg-slate-100"
              >
                {options.find((o) => o.value === '')?.label || 'None'}
              </button>
            ) : null}
            {filtered.map((option) => {
              const active = selectedValues.includes(option.value);
              return (
                <button
                  key={`${option.value}-${option.label}`}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => (multiple ? toggleMulti(option.value) : selectOne(option.value))}
                  className={`block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-slate-100 ${
                    active ? 'bg-sky-50 text-sky-800' : 'text-slate-700'
                  } ${option.disabled ? 'opacity-50' : ''}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
