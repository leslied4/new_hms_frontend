import { useState } from 'react';
import PageShell from '../../components/PageShell';

const initialSpecialties = ['Cardiology', 'Orthopedics', 'Radiology'];

export default function ManageSecurityEditSpecialties() {
  const [specialties, setSpecialties] = useState(initialSpecialties);
  const [newSpecialty, setNewSpecialty] = useState('');

  const addSpecialty = () => {
    if (!newSpecialty.trim()) return;
    setSpecialties((prev) => [...prev, newSpecialty.trim()]);
    setNewSpecialty('');
  };

  return (
    <PageShell
      title="ManageSecurity/edit_specialties.php"
      sourcePath="templates/ManageSecurity/edit_specialties.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Security</p>
              <h2 className="text-2xl font-semibold text-slate-900">Edit Specialties</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <input
                value={newSpecialty}
                onChange={(event) => setNewSpecialty(event.target.value)}
                placeholder="Add new specialty"
                className="w-64 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs text-slate-900 placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
              >
                Add
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {specialties.map((spec) => (
                <div key={spec} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm text-slate-800">{spec}</p>
                  <button
                    type="button"
                    onClick={() => setSpecialties((prev) => prev.filter((item) => item !== spec))}
                    className="text-xs text-rose-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
