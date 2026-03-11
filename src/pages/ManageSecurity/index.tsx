import { FormEvent, useEffect, useMemo, useState } from 'react';
import SearchableSelectField from '../../components/SearchableSelectField';
import { api } from '../../lib/api';

type GenericRecord = Record<string, unknown>;
type SectionId = 'users' | 'roles' | 'departments' | 'specialties';

type ManageSecurityResponse = {
  users?: GenericRecord[];
  roles?: GenericRecord[];
  departments?: GenericRecord[];
  specialties?: GenericRecord[];
  capabilities?: {
    accept_payment?: boolean;
  };
  options?: {
    genders?: GenericRecord[];
    roles?: GenericRecord[];
    departments?: GenericRecord[];
    specialties?: GenericRecord[];
    statuses?: GenericRecord[];
    service_places?: GenericRecord[];
    age_categories?: GenericRecord[];
    gender_categories?: GenericRecord[];
  };
  ok?: boolean;
};

type UserDetailResponse = {
  ok?: boolean;
  user?: GenericRecord;
};

const asText = (value: unknown): string => String(value ?? '').trim();

const toArray = (value: unknown): GenericRecord[] => (Array.isArray(value) ? (value as GenericRecord[]) : []);

const SECTION_META: Array<{ id: SectionId; label: string; note: string }> = [
  { id: 'users', label: 'Users', note: 'Review staff accounts and payment acceptance status.' },
  { id: 'roles', label: 'Roles', note: 'Maintain the role register and update role statuses.' },
  { id: 'departments', label: 'Departments', note: 'Add or update departments used across the application.' },
  { id: 'specialties', label: 'Specialities', note: 'Manage clinics, specifications, and service-place mappings.' },
];

type DepartmentForm = {
  id: string;
  name: string;
  description: string;
  code: string;
};

type RoleForm = {
  id: string;
  name: string;
  description: string;
  status_id: string;
};

type SpecialtyForm = {
  id: string;
  name: string;
  description: string;
  department_id: string;
  code: string;
  color_code: string;
  age_ids: string[];
  gender_ids: string[];
  investigation_ids: string[];
  pharmacy_ids: string[];
  operation_room_ids: string[];
  consulting_room_ids: string[];
  ward_ids: string[];
};

type UserForm = {
  first_name: string;
  last_name: string;
  gender_id: string;
  phone: string;
  email: string;
  username: string;
  status_id: string;
  password: string;
  confirm_password: string;
  role_id: string;
  specialty_ids: string[];
  department_ids: string[];
  user_role_ids: string[];
  bank: string;
  bank_branch: string;
  account_number: string;
  account_type: string;
  image: File | null;
};

const emptyDepartmentForm: DepartmentForm = {
  id: '',
  name: '',
  description: '',
  code: '',
};

const emptyRoleForm: RoleForm = {
  id: '',
  name: '',
  description: '',
  status_id: '1',
};

const emptySpecialtyForm: SpecialtyForm = {
  id: '',
  name: '',
  description: '',
  department_id: '',
  code: '',
  color_code: '#2563eb',
  age_ids: [],
  gender_ids: [],
  investigation_ids: [],
  pharmacy_ids: [],
  operation_room_ids: [],
  consulting_room_ids: [],
  ward_ids: [],
};

const emptyUserForm: UserForm = {
  first_name: '',
  last_name: '',
  gender_id: '',
  phone: '',
  email: '',
  username: '',
  status_id: '1',
  password: '',
  confirm_password: '',
  role_id: '',
  specialty_ids: [],
  department_ids: [],
  user_role_ids: [],
  bank: '',
  bank_branch: '',
  account_number: '',
  account_type: '',
  image: null,
};

const userRowToForm = (row: GenericRecord): UserForm => ({
  first_name: asText(row.first_name),
  last_name: asText(row.last_name),
  gender_id: asText(row.gender_id),
  phone: asText(row.phone),
  email: asText(row.email),
  username: asText(row.username),
  status_id: asText(row.status_id) || '1',
  password: '',
  confirm_password: '',
  role_id: asText(row.role_id),
  specialty_ids: toArray(row.specialty_ids).map((value) => asText(value)).filter(Boolean),
  department_ids: toArray(row.department_ids).map((value) => asText(value)).filter(Boolean),
  user_role_ids: toArray(row.user_role_ids).map((value) => asText(value)).filter(Boolean),
  bank: asText(row.bank),
  bank_branch: asText(row.bank_branch),
  account_number: asText(row.account_number),
  account_type: asText(row.account_type),
  image: null,
});

function MultiSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: GenericRecord[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
      {label}
      <SearchableSelectField
        multiple
        value={value}
        onChange={(event) => {
          const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
          onChange(selected);
        }}
        className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
      >
        {options.map((option) => {
          const id = asText(option.id);
          return (
            <option key={`${label}-${id}`} value={id}>
              {asText(option.name) || id}
            </option>
          );
        })}
      </SearchableSelectField>
    </label>
  );
}

export default function ManageSecurityIndex() {
  const [activeSection, setActiveSection] = useState<SectionId>('users');
  const [payload, setPayload] = useState<ManageSecurityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState('');
  const [departmentForm, setDepartmentForm] = useState<DepartmentForm>(emptyDepartmentForm);
  const [roleForm, setRoleForm] = useState<RoleForm>(emptyRoleForm);
  const [specialtyForm, setSpecialtyForm] = useState<SpecialtyForm>(emptySpecialtyForm);
  const [userForm, setUserForm] = useState<UserForm>(emptyUserForm);
  const [viewingUser, setViewingUser] = useState<GenericRecord | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUserForm, setEditingUserForm] = useState<UserForm>(emptyUserForm);
  const [resettingUser, setResettingUser] = useState<GenericRecord | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');

  const hydrate = (data: ManageSecurityResponse) => {
    setPayload(data);
    if (!roleForm.id) {
      const firstRole = toArray(data.roles)[0];
      if (firstRole) {
        setRoleForm({
          id: asText(firstRole.id),
          name: asText(firstRole.name),
          description: asText(firstRole.description),
          status_id: asText(firstRole.status_id) || '1',
        });
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<ManageSecurityResponse>('/legacy/manage-security/index/');
        if (!mounted) return;
        hydrate(response);
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Unable to load security workspace.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const options = payload?.options ?? {};
  const users = toArray(payload?.users);
  const roles = toArray(payload?.roles);
  const departments = toArray(payload?.departments);
  const specialties = toArray(payload?.specialties);
  const canManagePayment = Boolean(payload?.capabilities?.accept_payment);

  const filteredUsers = useMemo(() => {
    const term = userSearch.trim().toLowerCase();
    if (!term) return users;
    return users.filter((row) =>
      [
        asText(row.first_name),
        asText(row.last_name),
        asText(row.username),
        asText(row.email),
        toArray(row.department_names).map((value) => asText(value)).join(' '),
        toArray(row.specialty_names).map((value) => asText(value)).join(' '),
      ]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }, [userSearch, users]);

  const performMutation = async (body: Record<string, unknown>, successMessage: string) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post<ManageSecurityResponse>('/legacy/manage-security/index/', body);
      hydrate(response);
      setSuccess(successMessage);
    } catch (mutationError) {
      setError(mutationError instanceof Error ? mutationError.message : 'Unable to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAcceptPayment = async (userId: string, enable: boolean) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post<GenericRecord>(
        enable ? '/legacy/manage-security/accept-payment/' : '/legacy/manage-security/disable-payment/',
        { user_id: userId },
      );
      const response = await api.get<ManageSecurityResponse>('/legacy/manage-security/index/');
      hydrate(response);
      setSuccess(enable ? 'Payment acceptance enabled.' : 'Payment acceptance disabled.');
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Unable to update payment setting.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleUserStatus = async (userId: string, enable: boolean) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post<ManageSecurityResponse>(
        enable ? '/legacy/manage-security/enable-user/' : '/legacy/manage-security/disable-user/',
        { user_id: userId },
      );
      hydrate(response);
      setSuccess(enable ? 'User enabled.' : 'User disabled.');
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Unable to update user status.');
    } finally {
      setIsSaving(false);
    }
  };

  const onSaveDepartment = async (event: FormEvent) => {
    event.preventDefault();
    await performMutation(
      {
        mutation: departmentForm.id ? 'update_department' : 'add_department',
        ...departmentForm,
      },
      departmentForm.id ? 'Department updated.' : 'Department created.',
    );
    setDepartmentForm(emptyDepartmentForm);
  };

  const onSaveRole = async (event: FormEvent) => {
    event.preventDefault();
    if (!roleForm.id) {
      setError('Select a role to edit.');
      return;
    }
    await performMutation(
      {
        mutation: 'update_role',
        ...roleForm,
      },
      'Role updated.',
    );
  };

  const onSaveUser = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('first_name', userForm.first_name);
      formData.append('last_name', userForm.last_name);
      formData.append('gender_id', userForm.gender_id);
      formData.append('phone', userForm.phone);
      formData.append('email', userForm.email);
      formData.append('username', userForm.username);
      formData.append('status_id', userForm.status_id);
      formData.append('password', userForm.password);
      formData.append('confirm_password', userForm.confirm_password);
      formData.append('role_id', userForm.role_id);
      formData.append('bank', userForm.bank);
      formData.append('bank_branch', userForm.bank_branch);
      formData.append('account_number', userForm.account_number);
      formData.append('account_type', userForm.account_type);
      userForm.specialty_ids.forEach((value) => formData.append('specialty_id[]', value));
      userForm.department_ids.forEach((value) => formData.append('department_id[]', value));
      userForm.user_role_ids.forEach((value) => formData.append('user_roles[]', value));
      if (userForm.image) {
        formData.append('image', userForm.image);
      }
      await api.post('/legacy/users/add-user/', formData);
      const response = await api.get<ManageSecurityResponse>('/legacy/manage-security/index/');
      hydrate(response);
      setUserForm(emptyUserForm);
      setSuccess('User created.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to create user.');
    } finally {
      setIsSaving(false);
    }
  };

  const openViewUser = async (userId: string) => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await api.get<UserDetailResponse>(`/legacy/users/view-user-details/?user_id=${encodeURIComponent(userId)}`);
      setViewingUser(response.user ?? null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load user details.');
    } finally {
      setIsSaving(false);
    }
  };

  const openEditUser = async (userId: string) => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await api.get<UserDetailResponse>(`/legacy/users/view-user-details/?user_id=${encodeURIComponent(userId)}`);
      const user = response.user ?? null;
      if (!user) {
        throw new Error('User details not found.');
      }
      setEditingUserId(userId);
      setEditingUserForm(userRowToForm(user));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load user details.');
    } finally {
      setIsSaving(false);
    }
  };

  const onSaveEditedUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingUserId) {
      setError('Missing user.');
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('id', editingUserId);
      formData.append('first_name', editingUserForm.first_name);
      formData.append('last_name', editingUserForm.last_name);
      formData.append('gender_id', editingUserForm.gender_id);
      formData.append('phone', editingUserForm.phone);
      formData.append('email', editingUserForm.email);
      formData.append('username', editingUserForm.username);
      formData.append('status_id', editingUserForm.status_id);
      formData.append('role_id', editingUserForm.role_id);
      formData.append('bank', editingUserForm.bank);
      formData.append('bank_branch', editingUserForm.bank_branch);
      formData.append('account_number', editingUserForm.account_number);
      formData.append('account_type', editingUserForm.account_type);
      editingUserForm.specialty_ids.forEach((value) => formData.append('specialty_id[]', value));
      editingUserForm.department_ids.forEach((value) => formData.append('department_id[]', value));
      editingUserForm.user_role_ids.forEach((value) => formData.append('user_roles[]', value));
      if (editingUserForm.image) {
        formData.append('image', editingUserForm.image);
      }
      await api.post('/legacy/users/edit-user/', formData);
      const response = await api.get<ManageSecurityResponse>('/legacy/manage-security/index/');
      hydrate(response);
      setEditingUserId(null);
      setEditingUserForm(emptyUserForm);
      setSuccess('User updated.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update user.');
    } finally {
      setIsSaving(false);
    }
  };

  const onResetUserPassword = async (event: FormEvent) => {
    event.preventDefault();
    const userId = asText(resettingUser?.id);
    if (!userId) {
      setError('Missing user.');
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/legacy/users/reset-password/', {
        user_id: userId,
        password: resetPassword,
        confirm_password: resetConfirmPassword,
      });
      setResettingUser(null);
      setResetPassword('');
      setResetConfirmPassword('');
      setSuccess('Password reset.');
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : 'Unable to reset password.');
    } finally {
      setIsSaving(false);
    }
  };

  const onSaveSpecialty = async (event: FormEvent) => {
    event.preventDefault();
    await performMutation(
      {
        mutation: specialtyForm.id ? 'update_specialty' : 'add_specialty',
        ...specialtyForm,
      },
      specialtyForm.id ? 'Speciality updated.' : 'Speciality created.',
    );
    setSpecialtyForm(emptySpecialtyForm);
  };

  const onDeleteSpecialty = async (id: string) => {
    await performMutation(
      {
        mutation: 'delete_specialty',
        id,
      },
      'Speciality deleted.',
    );
    if (specialtyForm.id === id) {
      setSpecialtyForm(emptySpecialtyForm);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-medium text-slate-500">Loading security workspace…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-1 pb-8">
      <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.88))] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-700/80">Security</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Manage Security</h1>
            <p className="mt-1 text-sm text-slate-600">
              Users, roles, departments, and specialities are merged into one working security workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SECTION_META.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeSection === section.id
                    ? 'bg-cyan-600 text-white shadow-[0_12px_24px_rgba(8,145,178,0.22)]'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:text-cyan-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      ) : null}

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {SECTION_META.find((section) => section.id === activeSection)?.label}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {SECTION_META.find((section) => section.id === activeSection)?.note}
        </p>

        {activeSection === 'users' ? (
          <div className="mt-5 grid gap-6 xl:grid-cols-[26rem_minmax(0,1fr)]">
            <form onSubmit={onSaveUser} className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Add User</h3>
                <p className="mt-1 text-xs text-slate-500">Create a staff account and assign departments, specialties, and roles.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  First Name
                  <input
                    type="text"
                    value={userForm.first_name}
                    onChange={(event) => setUserForm((current) => ({ ...current, first_name: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    required
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Last Name
                  <input
                    type="text"
                    value={userForm.last_name}
                    onChange={(event) => setUserForm((current) => ({ ...current, last_name: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Gender
                  <SearchableSelectField
                    value={userForm.gender_id}
                    onChange={(event) => setUserForm((current) => ({ ...current, gender_id: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    required
                  >
                    <option value="">Select Gender</option>
                    {toArray(options.genders).map((row) => (
                      <option key={`gender-${asText(row.id)}`} value={asText(row.id)}>
                        {asText(row.name)}
                      </option>
                    ))}
                  </SearchableSelectField>
                </label>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Mobile No.
                  <input
                    type="text"
                    value={userForm.phone}
                    onChange={(event) => setUserForm((current) => ({ ...current, phone: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Email
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Passport Picture
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(event) =>
                      setUserForm((current) => ({ ...current, image: event.target.files?.[0] ?? null }))
                    }
                    className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 file:mr-3 file:rounded-xl file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-700"
                  />
                </label>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Login Details</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Username
                    <input
                      type="text"
                      value={userForm.username}
                      onChange={(event) => setUserForm((current) => ({ ...current, username: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Status
                    <SearchableSelectField
                      value={userForm.status_id}
                      onChange={(event) => setUserForm((current) => ({ ...current, status_id: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    >
                      {(toArray(options.statuses).length ? toArray(options.statuses) : [
                        { id: '1', name: 'Enabled' },
                        { id: '2', name: 'Disabled' },
                      ]).map((row) => (
                        <option key={`status-${asText(row.id)}`} value={asText(row.id)}>
                          {asText(row.name) || asText(row.id)}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Password
                    <input
                      type="password"
                      value={userForm.password}
                      onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Confirm Password
                    <input
                      type="password"
                      value={userForm.confirm_password}
                      onChange={(event) => setUserForm((current) => ({ ...current, confirm_password: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Profession / Role</p>
                <div className="mt-3 space-y-4">
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Position
                    <SearchableSelectField
                      value={userForm.role_id}
                      onChange={(event) => setUserForm((current) => ({ ...current, role_id: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    >
                      <option value="">Select Position</option>
                      {toArray(options.roles).map((row) => (
                        <option key={`role-${asText(row.id)}`} value={asText(row.id)}>
                          {asText(row.name)}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <MultiSelect
                    label="Specialty"
                    options={toArray(options.specialties)}
                    value={userForm.specialty_ids}
                    onChange={(value) => setUserForm((current) => ({ ...current, specialty_ids: value }))}
                  />
                  <MultiSelect
                    label="Department"
                    options={toArray(options.departments)}
                    value={userForm.department_ids}
                    onChange={(value) => setUserForm((current) => ({ ...current, department_ids: value }))}
                  />
                  <MultiSelect
                    label="Additional Roles"
                    options={toArray(options.roles)}
                    value={userForm.user_role_ids}
                    onChange={(value) => setUserForm((current) => ({ ...current, user_role_ids: value }))}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Bank Details</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Bank
                    <input
                      type="text"
                      value={userForm.bank}
                      onChange={(event) => setUserForm((current) => ({ ...current, bank: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Branch
                    <input
                      type="text"
                      value={userForm.bank_branch}
                      onChange={(event) => setUserForm((current) => ({ ...current, bank_branch: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Account Number
                    <input
                      type="text"
                      value={userForm.account_number}
                      onChange={(event) => setUserForm((current) => ({ ...current, account_number: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Account Type
                    <SearchableSelectField
                      value={userForm.account_type}
                      onChange={(event) => setUserForm((current) => ({ ...current, account_type: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    >
                      <option value="">Select Type</option>
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                      <option value="Salary">Salary</option>
                    </SearchableSelectField>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-2xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setUserForm(emptyUserForm)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="space-y-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Users</p>
                    <p className="mt-1 text-xl font-black text-slate-900">{users.length}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Accepting Payment</p>
                    <p className="mt-1 text-xl font-black text-slate-900">
                      {canManagePayment ? users.filter((row) => Number(row.accept_payment_status || 0) === 1).length : 'N/A'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Disabled</p>
                    <p className="mt-1 text-xl font-black text-slate-900">
                      {users.filter((row) => asText(row.status_name).toLowerCase().includes('disabled')).length}
                    </p>
                  </div>
                </div>
                <input
                  type="search"
                  value={userSearch}
                  onChange={(event) => setUserSearch(event.target.value)}
                  placeholder="Search staff by name, username, email, department…"
                  className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                />
              </div>

              <div className="overflow-hidden rounded-[1.6rem] border border-slate-200">
                <div className="h-[calc(100vh-18rem)] min-h-[48rem] overflow-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Speciality</th>
                      <th className="px-4 py-3">Status</th>
                      {canManagePayment ? <th className="px-4 py-3">Payment</th> : null}
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredUsers.map((row) => {
                      const userId = asText(row.id);
                      const enabled = Number(row.accept_payment_status || 0) === 1;
                      const isUserEnabled = asText(row.status_id) === '1' || asText(row.status_name).toLowerCase().includes('enabled');
                      return (
                        <tr key={userId}>
                          <td className="px-4 py-3 align-top">
                            <p className="font-semibold text-slate-900">
                              {[asText(row.first_name), asText(row.last_name)].filter(Boolean).join(' ') || userId}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {asText(row.username) || asText(row.email) || asText(row.phone)}
                            </p>
                          </td>
                          <td className="px-4 py-3 align-top text-slate-700">{asText(row.role_name) || 'N/A'}</td>
                          <td className="px-4 py-3 align-top text-slate-700">
                            {toArray(row.department_names).map((value) => asText(value)).filter(Boolean).join(', ') || 'N/A'}
                          </td>
                          <td className="px-4 py-3 align-top text-slate-700">
                            {toArray(row.specialty_names).map((value) => asText(value)).filter(Boolean).join(', ') || 'N/A'}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                              {asText(row.status_name) || 'N/A'}
                            </span>
                          </td>
                          {canManagePayment ? (
                            <td className="px-4 py-3 align-top">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                  enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                }`}
                              >
                                {enabled ? 'Enabled' : 'Disabled'}
                              </span>
                            </td>
                          ) : null}
                          <td className="px-4 py-3 align-top">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => void openViewUser(userId)}
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => void openEditUser(userId)}
                                className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 disabled:opacity-50"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => {
                                  setResettingUser(row);
                                  setResetPassword('');
                                  setResetConfirmPassword('');
                                }}
                                className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 disabled:opacity-50"
                              >
                                Reset Password
                              </button>
                              <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => toggleUserStatus(userId, !isUserEnabled)}
                                className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                                  isUserEnabled
                                    ? 'border border-rose-200 bg-rose-50 text-rose-700'
                                    : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                } disabled:opacity-50`}
                              >
                                {isUserEnabled ? 'Disable User' : 'Enable User'}
                              </button>
                              {canManagePayment ? (
                                <button
                                  type="button"
                                  disabled={isSaving}
                                  onClick={() => toggleAcceptPayment(userId, !enabled)}
                                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                                    enabled
                                      ? 'border border-rose-200 bg-rose-50 text-rose-700'
                                      : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                  } disabled:opacity-50`}
                                >
                                  {enabled ? 'Disable Payment' : 'Accept Payment'}
                                </button>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        ) : null}

        {activeSection === 'users' && viewingUser ? (
          <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/45 px-4 py-6">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">User Profile</p>
                  <h3 className="mt-1 text-xl font-black text-slate-900">
                    {[asText(viewingUser.first_name), asText(viewingUser.last_name)].filter(Boolean).join(' ') || asText(viewingUser.id)}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{asText(viewingUser.role_name) || 'No assigned position'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingUser(null)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Identity</p>
                  <div className="grid gap-3 text-sm text-slate-700">
                    <p><span className="font-semibold text-slate-900">Username:</span> {asText(viewingUser.username) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Email:</span> {asText(viewingUser.email) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Phone:</span> {asText(viewingUser.phone) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Gender:</span> {asText(viewingUser.gender_name) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Status:</span> {asText(viewingUser.status_name) || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Assignments</p>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div>
                      <p className="font-semibold text-slate-900">Departments</p>
                      <p>{toArray(viewingUser.department_names).map((value) => asText(value)).filter(Boolean).join(', ') || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Specialties</p>
                      <p>{toArray(viewingUser.specialty_names).map((value) => asText(value)).filter(Boolean).join(', ') || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Roles</p>
                      <p>{toArray(viewingUser.user_role_names).map((value) => asText(value)).filter(Boolean).join(', ') || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-slate-50/70 p-4 lg:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Bank Details</p>
                  <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                    <p><span className="font-semibold text-slate-900">Bank:</span> {asText(viewingUser.bank) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Branch:</span> {asText(viewingUser.bank_branch) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Account Number:</span> {asText(viewingUser.account_number) || 'N/A'}</p>
                    <p><span className="font-semibold text-slate-900">Account Type:</span> {asText(viewingUser.account_type) || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeSection === 'users' && editingUserId ? (
          <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/45 px-4 py-6">
            <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
              <form onSubmit={onSaveEditedUser} className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">User Profile</p>
                    <h3 className="mt-1 text-xl font-black text-slate-900">Edit User</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingUserId(null);
                      setEditingUserForm(emptyUserForm);
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600"
                  >
                    Close
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    First Name
                    <input
                      type="text"
                      value={editingUserForm.first_name}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, first_name: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Last Name
                    <input
                      type="text"
                      value={editingUserForm.last_name}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, last_name: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Gender
                    <SearchableSelectField
                      value={editingUserForm.gender_id}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, gender_id: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    >
                      <option value="">Select Gender</option>
                      {toArray(options.genders).map((row) => (
                        <option key={`edit-gender-${asText(row.id)}`} value={asText(row.id)}>
                          {asText(row.name)}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Mobile No.
                    <input
                      type="text"
                      value={editingUserForm.phone}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, phone: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Email
                    <input
                      type="email"
                      value={editingUserForm.email}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, email: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Username
                    <input
                      type="text"
                      value={editingUserForm.username}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, username: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                      required
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Status
                    <SearchableSelectField
                      value={editingUserForm.status_id}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, status_id: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    >
                      {(toArray(options.statuses).length ? toArray(options.statuses) : [{ id: '1', name: 'Enabled' }, { id: '2', name: 'Disabled' }]).map((row) => (
                        <option key={`edit-status-${asText(row.id)}`} value={asText(row.id)}>
                          {asText(row.name) || asText(row.id)}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Position
                    <SearchableSelectField
                      value={editingUserForm.role_id}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, role_id: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    >
                      <option value="">Select Position</option>
                      {toArray(options.roles).map((row) => (
                        <option key={`edit-role-${asText(row.id)}`} value={asText(row.id)}>
                          {asText(row.name)}
                        </option>
                      ))}
                    </SearchableSelectField>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <MultiSelect
                    label="Specialty"
                    options={toArray(options.specialties)}
                    value={editingUserForm.specialty_ids}
                    onChange={(value) => setEditingUserForm((current) => ({ ...current, specialty_ids: value }))}
                  />
                  <MultiSelect
                    label="Department"
                    options={toArray(options.departments)}
                    value={editingUserForm.department_ids}
                    onChange={(value) => setEditingUserForm((current) => ({ ...current, department_ids: value }))}
                  />
                  <MultiSelect
                    label="Additional Roles"
                    options={toArray(options.roles)}
                    value={editingUserForm.user_role_ids}
                    onChange={(value) => setEditingUserForm((current) => ({ ...current, user_role_ids: value }))}
                  />
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Replace Passport Picture
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) =>
                        setEditingUserForm((current) => ({ ...current, image: event.target.files?.[0] ?? null }))
                      }
                      className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 file:mr-3 file:rounded-xl file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-700"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Bank
                    <input
                      type="text"
                      value={editingUserForm.bank}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, bank: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Bank Branch
                    <input
                      type="text"
                      value={editingUserForm.bank_branch}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, bank_branch: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Account Number
                    <input
                      type="text"
                      value={editingUserForm.account_number}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, account_number: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Account Type
                    <SearchableSelectField
                      value={editingUserForm.account_type}
                      onChange={(event) => setEditingUserForm((current) => ({ ...current, account_type: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    >
                      <option value="">Select Type</option>
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                      <option value="Salary">Salary</option>
                    </SearchableSelectField>
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-2xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingUserId(null);
                      setEditingUserForm(emptyUserForm);
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {activeSection === 'users' && resettingUser ? (
          <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/45 px-4 py-6">
            <div className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
              <form onSubmit={onResetUserPassword} className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Security</p>
                    <h3 className="mt-1 text-xl font-black text-slate-900">Reset Password</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {[asText(resettingUser.first_name), asText(resettingUser.last_name)].filter(Boolean).join(' ') || asText(resettingUser.username)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setResettingUser(null);
                      setResetPassword('');
                      setResetConfirmPassword('');
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600"
                  >
                    Close
                  </button>
                </div>

                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  New Password
                  <input
                    type="password"
                    value={resetPassword}
                    onChange={(event) => setResetPassword(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    required
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Confirm Password
                  <input
                    type="password"
                    value={resetConfirmPassword}
                    onChange={(event) => setResetConfirmPassword(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                    required
                  />
                </label>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-2xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResettingUser(null);
                      setResetPassword('');
                      setResetConfirmPassword('');
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {activeSection === 'roles' ? (
          <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200">
              <div className="max-h-[34rem] overflow-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {roles.map((row) => (
                      <tr key={asText(row.id)}>
                        <td className="px-4 py-3 font-semibold text-slate-900">{asText(row.name)}</td>
                        <td className="px-4 py-3 text-slate-700">{asText(row.description) || 'No description'}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                            {asText(row.status_name) || asText(row.status_id) || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() =>
                              setRoleForm({
                                id: asText(row.id),
                                name: asText(row.name),
                                description: asText(row.description),
                                status_id: asText(row.status_id) || '1',
                              })
                            }
                            className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <form onSubmit={onSaveRole} className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Edit Role</h3>
                <p className="mt-1 text-xs text-slate-500">Select a row from the list, then update it here.</p>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Name
                <input
                  type="text"
                  value={roleForm.name}
                  onChange={(event) => setRoleForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Description
                <input
                  type="text"
                  value={roleForm.description}
                  onChange={(event) => setRoleForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Status
                <SearchableSelectField
                  value={roleForm.status_id}
                  onChange={(event) => setRoleForm((current) => ({ ...current, status_id: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                >
                  <option value="1">Enabled</option>
                  <option value="2">Disabled</option>
                </SearchableSelectField>
              </label>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-2xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Save Role
                </button>
                <button
                  type="button"
                  onClick={() => setRoleForm(emptyRoleForm)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {activeSection === 'departments' ? (
          <div className="mt-5 grid gap-6 xl:grid-cols-[24rem_minmax(0,1fr)]">
            <form onSubmit={onSaveDepartment} className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  {departmentForm.id ? 'Edit Department' : 'Add Department'}
                </h3>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Name
                <input
                  type="text"
                  value={departmentForm.name}
                  onChange={(event) => setDepartmentForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                  required
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Description
                <input
                  type="text"
                  value={departmentForm.description}
                  onChange={(event) => setDepartmentForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Code
                <input
                  type="text"
                  value={departmentForm.code}
                  onChange={(event) => setDepartmentForm((current) => ({ ...current, code: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                />
              </label>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-2xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {departmentForm.id ? 'Save Changes' : 'Add Department'}
                </button>
                <button
                  type="button"
                  onClick={() => setDepartmentForm(emptyDepartmentForm)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200">
              <div className="max-h-[34rem] overflow-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">Users</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {departments.map((row) => (
                      <tr key={asText(row.id)}>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-900">{asText(row.name)}</p>
                          <p className="mt-1 text-xs text-slate-500">{asText(row.description) || 'No description'}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-700">{asText(row.code) || 'N/A'}</td>
                        <td className="px-4 py-3 text-slate-700">{String(row.user_count ?? 0)}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() =>
                              setDepartmentForm({
                                id: asText(row.id),
                                name: asText(row.name),
                                description: asText(row.description),
                                code: asText(row.code),
                              })
                            }
                            className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {activeSection === 'specialties' ? (
          <div className="mt-5 grid gap-6 xl:grid-cols-[26rem_minmax(0,1fr)]">
            <form onSubmit={onSaveSpecialty} className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  {specialtyForm.id ? 'Edit Speciality' : 'Add Speciality'}
                </h3>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Name
                <input
                  type="text"
                  value={specialtyForm.name}
                  onChange={(event) => setSpecialtyForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                  required
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Department
                <SearchableSelectField
                  value={specialtyForm.department_id}
                  onChange={(event) => setSpecialtyForm((current) => ({ ...current, department_id: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                  required
                >
                  <option value="">Select Department</option>
                  {toArray(options.departments).map((row) => (
                    <option key={`dept-${asText(row.id)}`} value={asText(row.id)}>
                      {asText(row.name)}
                    </option>
                  ))}
                </SearchableSelectField>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Code
                  <input
                    type="text"
                    value={specialtyForm.code}
                    onChange={(event) => setSpecialtyForm((current) => ({ ...current, code: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Color
                  <input
                    type="color"
                    value={specialtyForm.color_code}
                    onChange={(event) => setSpecialtyForm((current) => ({ ...current, color_code: event.target.value }))}
                    className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-2"
                  />
                </label>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Description
                <input
                  type="text"
                  value={specialtyForm.description}
                  onChange={(event) => setSpecialtyForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
                />
              </label>

              <MultiSelect
                label="Age Specification"
                options={toArray(options.age_categories)}
                value={specialtyForm.age_ids}
                onChange={(value) => setSpecialtyForm((current) => ({ ...current, age_ids: value }))}
              />
              <MultiSelect
                label="Gender Specification"
                options={toArray(options.gender_categories)}
                value={specialtyForm.gender_ids}
                onChange={(value) => setSpecialtyForm((current) => ({ ...current, gender_ids: value }))}
              />
              <MultiSelect
                label="Investigation / Lab"
                options={toArray(options.service_places)}
                value={specialtyForm.investigation_ids}
                onChange={(value) => setSpecialtyForm((current) => ({ ...current, investigation_ids: value }))}
              />
              <MultiSelect
                label="Pharmacy"
                options={toArray(options.service_places)}
                value={specialtyForm.pharmacy_ids}
                onChange={(value) => setSpecialtyForm((current) => ({ ...current, pharmacy_ids: value }))}
              />
              <MultiSelect
                label="Operation Room(s)"
                options={toArray(options.service_places)}
                value={specialtyForm.operation_room_ids}
                onChange={(value) => setSpecialtyForm((current) => ({ ...current, operation_room_ids: value }))}
              />
              <MultiSelect
                label="Consulting Room(s)"
                options={toArray(options.service_places)}
                value={specialtyForm.consulting_room_ids}
                onChange={(value) => setSpecialtyForm((current) => ({ ...current, consulting_room_ids: value }))}
              />
              <MultiSelect
                label="Ward(s)"
                options={toArray(options.service_places)}
                value={specialtyForm.ward_ids}
                onChange={(value) => setSpecialtyForm((current) => ({ ...current, ward_ids: value }))}
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-2xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {specialtyForm.id ? 'Save Changes' : 'Add Speciality'}
                </button>
                <button
                  type="button"
                  onClick={() => setSpecialtyForm(emptySpecialtyForm)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200">
              <div className="max-h-[40rem] overflow-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      <th className="px-4 py-3">Speciality</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Specifications</th>
                      <th className="px-4 py-3">Service Places</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {specialties.map((row) => {
                      const servicePlaces = (row.service_places as Record<string, unknown>) || {};
                      return (
                        <tr key={asText(row.id)}>
                          <td className="px-4 py-3 align-top">
                            <p className="font-semibold text-slate-900">{asText(row.name)}</p>
                            <p className="mt-1 text-xs text-slate-500">{asText(row.code) || 'No code'}</p>
                          </td>
                          <td className="px-4 py-3 align-top text-slate-700">{asText(row.department_name) || 'N/A'}</td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex flex-wrap gap-1.5">
                              {toArray(row.gender_names).map((value) => (
                                <span key={`${asText(row.id)}-gender-${asText(value)}`} className="rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-semibold text-cyan-700">
                                  {asText(value)}
                                </span>
                              ))}
                              {toArray(row.age_category_names).map((value) => (
                                <span key={`${asText(row.id)}-age-${asText(value)}`} className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                                  {asText(value)}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top text-xs text-slate-600">
                            <div className="space-y-1.5">
                              <p><span className="font-semibold text-slate-700">Lab:</span> {toArray(servicePlaces.investigations).map((v) => asText(v)).join(', ') || 'N/A'}</p>
                              <p><span className="font-semibold text-slate-700">Pharmacy:</span> {toArray(servicePlaces.pharmacies).map((v) => asText(v)).join(', ') || 'N/A'}</p>
                              <p><span className="font-semibold text-slate-700">OR:</span> {toArray(servicePlaces.operation_rooms).map((v) => asText(v)).join(', ') || 'N/A'}</p>
                              <p><span className="font-semibold text-slate-700">Ward:</span> {toArray(servicePlaces.wards).map((v) => asText(v)).join(', ') || 'N/A'}</p>
                              <p><span className="font-semibold text-slate-700">Consulting:</span> {toArray(servicePlaces.consulting_rooms).map((v) => asText(v)).join(', ') || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex flex-col gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSpecialtyForm({
                                    id: asText(row.id),
                                    name: asText(row.name),
                                    description: asText(row.description),
                                    department_id: asText(row.department_id),
                                    code: asText(row.code),
                                    color_code: asText(row.color_code) || '#2563eb',
                                    age_ids: toArray(row.age_ids).map((value) => asText(value)).filter(Boolean),
                                    gender_ids: toArray(row.gender_ids).map((value) => asText(value)).filter(Boolean),
                                    investigation_ids: toArray(row.investigation_ids).map((value) => asText(value)).filter(Boolean),
                                    pharmacy_ids: toArray(row.pharmacy_ids).map((value) => asText(value)).filter(Boolean),
                                    operation_room_ids: toArray(row.operation_room_ids).map((value) => asText(value)).filter(Boolean),
                                    consulting_room_ids: toArray(row.consulting_room_ids).map((value) => asText(value)).filter(Boolean),
                                    ward_ids: toArray(row.ward_ids).map((value) => asText(value)).filter(Boolean),
                                  })
                                }
                                className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700"
                              >
                                Load To Edit
                              </button>
                              <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => onDeleteSpecialty(asText(row.id))}
                                className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
