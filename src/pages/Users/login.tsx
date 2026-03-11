import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiError, api, login } from '../../lib/api';

type InstitutionBranding = {
  id?: string;
  name?: string;
  uri?: string;
  logo_url?: string;
};

export default function UsersLogin() {
  const navigate = useNavigate();
  const { institutionUri } = useParams<{ institutionUri?: string }>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [branding, setBranding] = useState<InstitutionBranding | null>(null);
  const [showLogo, setShowLogo] = useState(true);

  const normalizedInstitutionUri = useMemo(
    () => String(institutionUri || '').trim().replace(/^\/+|\/+$/g, ''),
    [institutionUri],
  );

  useEffect(() => {
    let mounted = true;
    const loadBranding = async () => {
      setShowLogo(true);
      if (!normalizedInstitutionUri) {
        setBranding(null);
        return;
      }
      try {
        const response = await api.get<InstitutionBranding>(
          `/legacy/institutions/get-uri/?uri=${encodeURIComponent(normalizedInstitutionUri)}`,
        );
        if (!mounted) return;
        setBranding(response || null);
      } catch (_err) {
        if (!mounted) return;
        setBranding({
          uri: normalizedInstitutionUri,
          name: normalizedInstitutionUri.toUpperCase(),
          logo_url: `/assets/img/${normalizedInstitutionUri}.png`,
        });
      }
    };
    void loadBranding();
    return () => {
      mounted = false;
    };
  }, [normalizedInstitutionUri]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(username, password, normalizedInstitutionUri || undefined);
      navigate('/Patients/dashboard');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to login. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {branding?.logo_url && showLogo ? (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <img
            src={branding.logo_url}
            alt={branding.name || branding.uri || 'Institution logo'}
            className="h-10 w-auto rounded-md object-contain"
            onError={() => setShowLogo(false)}
          />
          <div className="min-w-0">
            <p className="truncate text-xs uppercase tracking-[0.22em] text-slate-500">Institution</p>
            <p className="truncate text-sm font-semibold text-slate-900">
              {branding.name || branding.uri || normalizedInstitutionUri}
            </p>
          </div>
        </div>
      ) : null}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">Secure Login</p>
        <h2 className="text-2xl font-semibold text-slate-900">Sign in to HMS</h2>
        <p className="text-sm text-slate-600">
          Use your staff credentials to access appointments, billing, and patient records.
        </p>
      </div>

      {isSubmitting ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-6 text-center">
            <p className="text-sm text-emerald-200">Logging in</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{username || '...'}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Verifying session…
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error ? (
            <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}
          <label className="block text-sm text-slate-700">
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoFocus
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              placeholder="Enter username"
              name="username"
            />
          </label>
          <label className="block text-sm text-slate-700">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              placeholder="••••••••"
              name="password"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Login
          </button>
        </form>
      )}

      <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-xs text-amber-500">
        Forgot your password? Please contact your supervisor.
      </div>
    </div>
  );
}
