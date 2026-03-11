import { useMemo, useState } from 'react';

export type InsurancePolicyOption = {
  id: string;
  name?: string | null;
  insurance_profile_name?: string | null;
  insurance_profile_policy_name?: string | null;
  insurance_profile_type_name?: string | null;
  policy_type_name?: string | null;
  policy_number?: string | null;
  code?: string | null;
  [key: string]: unknown;
};

const asText = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  return String(value).trim();
};

const policyName = (option: InsurancePolicyOption): string => {
  return (
    asText(option.name) ||
    asText(option.insurance_profile_policy_name) ||
    asText(option.policy_number) ||
    option.id
  );
};

const sponsorName = (option: InsurancePolicyOption): string => {
  const nestedProfile = option.insurance_profile as { name?: string | null } | undefined;
  return asText(option.insurance_profile_name) || asText(nestedProfile?.name);
};

const policyTypeName = (option: InsurancePolicyOption): string => {
  const nestedType = option.insurance_profile_type as { name?: string | null } | undefined;
  return asText(option.insurance_profile_type_name) || asText(option.policy_type_name) || asText(nestedType?.name);
};

const policyCode = (option: InsurancePolicyOption): string => {
  return asText(option.code) || asText(option.policy_number);
};

type InsurancePolicyPickerProps = {
  id: string;
  options: InsurancePolicyOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function InsurancePolicyPicker({
  id,
  options,
  value,
  onChange,
  placeholder = 'Search sponsor or policy...',
  disabled = false,
  className = '',
}: InsurancePolicyPickerProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((item) => String(item.id) === value) ?? null,
    [options, value],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options.slice(0, 60);
    return options
      .filter((item) => {
        const searchable = [
          policyName(item),
          sponsorName(item),
          policyTypeName(item),
          policyCode(item),
          item.id,
        ]
          .join(' ')
          .toLowerCase();
        return searchable.includes(term);
      })
      .slice(0, 60);
  }, [options, query]);

  const selectValue = (next: string) => {
    onChange(next);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type="text"
        value={open ? query : selected ? `${policyName(selected)}${sponsorName(selected) ? ` - ${sponsorName(selected)}` : ''}` : ''}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 120);
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
      />

      {open && !disabled ? (
        <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => selectValue('')}
            className="mb-1 w-full rounded-lg px-2 py-2 text-left text-xs text-slate-500 hover:bg-slate-100"
          >
            Clear selection
          </button>
          {filtered.length === 0 ? (
            <div className="px-2 py-3 text-xs text-slate-500">No matching sponsor/policy found.</div>
          ) : (
            filtered.map((option) => {
              const name = policyName(option);
              const sponsor = sponsorName(option);
              const type = policyTypeName(option);
              const code = policyCode(option);
              const active = String(option.id) === value;
              return (
                <button
                  key={String(option.id)}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectValue(String(option.id))}
                  className={`mb-1 w-full rounded-lg border px-2 py-2 text-left ${
                    active ? 'border-emerald-300 bg-emerald-50' : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900">{name}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {sponsor ? <span className="rounded bg-sky-100 px-2 py-0.5 text-[11px] text-sky-700">{sponsor}</span> : null}
                    {type ? <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] text-emerald-700">{type}</span> : null}
                    {code ? <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700">{code}</span> : null}
                  </div>
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
