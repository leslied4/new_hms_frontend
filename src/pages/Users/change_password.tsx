import { useState } from 'react';
import PageShell from '../../components/PageShell';

export default function UsersChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!window.confirm('Are you sure you want to change the password?')) {
      return;
    }

    setSuccess(true);
  };

  return (
    <PageShell title="Users/change_password.php" sourcePath="templates/Users/change_password.php">
      <div className="max-w-3xl space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Security</p>
              <h2 className="text-xl font-semibold text-slate-900">Change Password</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm text-slate-700">
                Old Password
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label className="block text-sm text-slate-700">
                New Password
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label className="block text-sm text-slate-700">
                Confirm Password
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none"
                />
              </label>

              {error ? (
                <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  Password updated. Remember to use the new credentials next time.
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800 hover:border-slate-500"
                  onClick={() => {
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setError('');
                    setSuccess(false);
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
