import { useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import PageShell from '../../components/PageShell';

const genderOptions = ['Male', 'Female'];
const statusOptions = ['ENABLED', 'DISABLED'];
const specialtyOptions = ['General', 'Cardiology', 'Orthopedics', 'Radiology'];
const departmentOptions = ['Outpatient', 'Inpatient', 'Lab', 'Billing'];
const roleOptions = ['Doctor', 'Nurse', 'Admin', 'Pharmacist'];

export default function UsersEditUser() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: 'Kofi',
    lastName: 'Owusu',
    gender: 'Male',
    phone: '+233 555 902 312',
    email: 'kofi.owusu@firstline24.com',
    username: 'kofi.owusu',
    status: 'ENABLED',
    specialties: ['General'],
    departments: ['Outpatient'],
    position: 'Doctor',
    roles: ['Doctor'],
    bank: '',
    bankBranch: '',
    accountNumber: '',
    accountType: '',
  });

  const updateForm = (key: keyof typeof form, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setAvatarPreview(null);
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.confirm('Are you sure you want to submit?');
  };

  return (
    <PageShell title="Users/edit_user.php" sourcePath="templates/Users/edit_user.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Users</p>
              <h2 className="text-xl font-semibold text-slate-900">Edit User Details</h2>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-slate-800">Personal Information</h3>
                  <div className="grid gap-4">
                    <label className="text-xs text-slate-600">
                      First Name
                      <input
                        value={form.firstName}
                        onChange={(event) => updateForm('firstName', event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </label>
                    <label className="text-xs text-slate-600">
                      Last Name
                      <input
                        value={form.lastName}
                        onChange={(event) => updateForm('lastName', event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </label>
                    <label className="text-xs text-slate-600">
                      Gender
                      <SearchableSelectField
                        value={form.gender}
                        onChange={(event) => updateForm('gender', event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      >
                        {genderOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </SearchableSelectField>
                    </label>
                    <label className="text-xs text-slate-600">
                      Mobile No.
                      <input
                        value={form.phone}
                        onChange={(event) => updateForm('phone', event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </label>
                    <label className="text-xs text-slate-600">
                      Email
                      <input
                        value={form.email}
                        onChange={(event) => updateForm('email', event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-slate-800">Passport Picture</h3>
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <div className="h-36 w-36 overflow-hidden rounded-2xl border border-slate-300">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="User avatar" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-800 text-xs text-slate-600">
                          Upload photo
                        </div>
                      )}
                    </div>
                    <label className="cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-800 hover:border-emerald-400">
                      Upload photo
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Login Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-xs text-slate-600">
                    Username
                    <input
                      value={form.username}
                      onChange={(event) => updateForm('username', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                  <label className="text-xs text-slate-600">
                    Status
                    <SearchableSelectField
                      value={form.status}
                      onChange={(event) => updateForm('status', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Profession / Role</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-xs text-slate-600">
                    Specialty
                    <SearchableSelectField
                      multiple
                      value={form.specialties}
                      onChange={(event) =>
                        updateForm(
                          'specialties',
                          Array.from(event.target.selectedOptions, (option) => option.value)
                        )
                      }
                      className="mt-2 h-32 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {specialtyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <label className="text-xs text-slate-600">
                    Department
                    <SearchableSelectField
                      multiple
                      value={form.departments}
                      onChange={(event) =>
                        updateForm(
                          'departments',
                          Array.from(event.target.selectedOptions, (option) => option.value)
                        )
                      }
                      className="mt-2 h-32 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {departmentOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <label className="text-xs text-slate-600">
                    Position
                    <SearchableSelectField
                      value={form.position}
                      onChange={(event) => updateForm('position', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <label className="text-xs text-slate-600">
                    Roles
                    <SearchableSelectField
                      multiple
                      value={form.roles}
                      onChange={(event) =>
                        updateForm(
                          'roles',
                          Array.from(event.target.selectedOptions, (option) => option.value)
                        )
                      }
                      className="mt-2 h-32 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-800">Bank Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-xs text-slate-600">
                    Bank
                    <input
                      value={form.bank}
                      onChange={(event) => updateForm('bank', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                  <label className="text-xs text-slate-600">
                    Bank Branch
                    <input
                      value={form.bankBranch}
                      onChange={(event) => updateForm('bankBranch', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                  <label className="text-xs text-slate-600">
                    Account Number
                    <input
                      value={form.accountNumber}
                      onChange={(event) => updateForm('accountNumber', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                  <label className="text-xs text-slate-600">
                    Account Type
                    <input
                      value={form.accountType}
                      onChange={(event) => updateForm('accountType', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                </div>
              </section>

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
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
