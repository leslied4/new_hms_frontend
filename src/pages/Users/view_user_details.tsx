import { useMemo, useState } from 'react';
import PageShell from '../../components/PageShell';

interface TimeEntry {
  date: string;
  start: string;
  end: string;
  totalHours: number;
  department: string;
}

const toHours = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = Math.max(0, endDate.getTime() - startDate.getTime());
  return Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10;
};

export default function UsersViewUserDetails() {
  const [activeTab, setActiveTab] = useState<'about' | 'timesheet'>('about');

  const user = useMemo(
    () => ({
      name: 'Ama Boateng',
      role: 'Senior Nurse',
      gender: 'Female',
      phone: '+233 555 222 910',
      email: 'ama.boateng@firstline24.com',
      username: 'ama.boateng',
      specialties: ['Primary Care', 'Triage'],
      departments: ['Outpatient', 'Emergency'],
      status: 'ENABLED',
      roles: ['Nurse', 'Shift Lead'],
      bank: 'GCB',
      bankBranch: 'Airport',
      accountNumber: '0024981234',
      accountType: 'Savings',
    }),
    []
  );

  const timeSheet: TimeEntry[] = [
    {
      date: '2026-01-26',
      start: '2026-01-26T08:00:00',
      end: '2026-01-26T16:30:00',
      totalHours: 8,
      department: 'Outpatient',
    },
    {
      date: '2026-01-27',
      start: '2026-01-27T08:30:00',
      end: '2026-01-27T17:00:00',
      totalHours: 8,
      department: 'Emergency',
    },
    {
      date: '2026-01-28',
      start: '2026-01-28T09:00:00',
      end: '2026-01-28T18:15:00',
      totalHours: 8,
      department: 'Outpatient',
    },
  ];

  const totalAssigned = timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  const totalWorked = timeSheet.reduce((sum, entry) => sum + toHours(entry.start, entry.end), 0);
  const overtime = Math.max(0, totalWorked - totalAssigned);

  const printTimeSheet = () => {
    const printWindow = window.open('', 'timesheet', 'width=900,height=700');
    if (!printWindow) {
      return;
    }
    printWindow.document.write('<h2>Time Sheet Report</h2>');
    printWindow.document.write(`<p>Name: ${user.name}</p>`);
    printWindow.document.write(`<p>Phone Number: ${user.phone}</p>`);
    printWindow.document.write(`<p>Email: ${user.email}</p>`);
    printWindow.document.write('<hr/>');
    printWindow.document.write(document.getElementById('timesheet-table')?.outerHTML || '');
    printWindow.print();
  };

  return (
    <PageShell title="Users/view_user_details.php" sourcePath="templates/Users/view_user_details.php">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-col items-center gap-4">
              <div className="h-28 w-28 overflow-hidden rounded-2xl border border-slate-300 bg-slate-800" />
              <div className="text-center">
                <p className="text-lg font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-600">{user.role}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 text-xs text-slate-700">
              <li className="flex justify-between gap-3">
                <span className="text-slate-500">Gender</span>
                <span>{user.gender}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-slate-500">Phone</span>
                <span>{user.phone}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-slate-500">Email</span>
                <span className="truncate">{user.email}</span>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <button className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-100">
                Edit
              </button>
              <button className="rounded-full border border-slate-300 px-3 py-1 text-slate-700">
                Users
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-800">Payment Details</h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex justify-between gap-3">
                <span className="text-slate-500">Bank</span>
                <span>{user.bank}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-slate-500">Branch</span>
                <span>{user.bankBranch}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-slate-500">Account</span>
                <span>{user.accountNumber}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-slate-500">Type</span>
                <span>{user.accountType}</span>
              </li>
            </ul>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap gap-3">
              <button
                className={`rounded-full px-4 py-1 text-xs ${
                  activeTab === 'about'
                    ? 'bg-emerald-500/20 text-emerald-100'
                    : 'border border-slate-300 text-slate-700'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About {user.role}
              </button>
              <button
                className={`rounded-full px-4 py-1 text-xs ${
                  activeTab === 'timesheet'
                    ? 'bg-emerald-500/20 text-emerald-100'
                    : 'border border-slate-300 text-slate-700'
                }`}
                onClick={() => setActiveTab('timesheet')}
              >
                Time Sheet
              </button>
            </div>
          </div>

          {activeTab === 'about' ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-800">User Information</h3>
              <div className="mt-4 grid gap-3 text-xs text-slate-700">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">First Name</span>
                  <span>{user.name.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Last Name</span>
                  <span>{user.name.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Username</span>
                  <span>{user.username}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Specialty</span>
                  <span>{user.specialties.join(', ')}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Department</span>
                  <span>{user.departments.join(', ')}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Status</span>
                  <span>{user.status}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-800">Assigned Roles</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-800">Time Sheet</h3>
                <button
                  className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100"
                  onClick={printTimeSheet}
                >
                  Print
                </button>
              </div>

              <div className="mt-4 grid gap-3 text-xs text-slate-700 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-slate-500">Total Assigned</p>
                  <p className="text-lg font-semibold text-slate-900">{totalAssigned}h</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-slate-500">Total Worked</p>
                  <p className="text-lg font-semibold text-slate-900">{totalWorked}h</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-slate-500">Overtime</p>
                  <p className="text-lg font-semibold text-slate-900">{overtime}h</p>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto" id="timesheet-table">
                <table className="min-w-full text-left text-xs text-slate-700">
                  <thead className="border-b border-slate-200 text-[11px] uppercase text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Time In</th>
                      <th className="px-3 py-2">Time Out</th>
                      <th className="px-3 py-2">Hours Assigned</th>
                      <th className="px-3 py-2">Hours Worked</th>
                      <th className="px-3 py-2">Overtime</th>
                      <th className="px-3 py-2">Department</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {timeSheet.map((entry) => {
                      const worked = toHours(entry.start, entry.end);
                      const overtimeHours = Math.max(0, worked - entry.totalHours);
                      return (
                        <tr key={entry.date}>
                          <td className="px-3 py-2">{entry.date}</td>
                          <td className="px-3 py-2">{entry.start.slice(11, 16)}</td>
                          <td className="px-3 py-2">{entry.end.slice(11, 16)}</td>
                          <td className="px-3 py-2">{entry.totalHours}</td>
                          <td className="px-3 py-2">{worked}</td>
                          <td className="px-3 py-2">{overtimeHours}</td>
                          <td className="px-3 py-2">{entry.department}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}
