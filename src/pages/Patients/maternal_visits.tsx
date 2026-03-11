import PageShell from '../../components/PageShell';

const visits = [
  { id: 'MAT-102', patient: 'Akua Mensah', stage: 'Ante-natal', nextVisit: '2026-02-05' },
  { id: 'MAT-103', patient: 'Efe Laryea', stage: 'Post-natal', nextVisit: '2026-02-10' },
  { id: 'MAT-104', patient: 'Mansa Owusu', stage: 'Ante-natal', nextVisit: '2026-02-12' },
];

export default function PatientsMaternalVisits() {
  return (
    <PageShell title="Patients/maternal_visits.php" sourcePath="templates/Patients/maternal_visits.php">
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Maternal Care</p>
              <h2 className="text-2xl font-semibold text-slate-900">Maternal Visits</h2>
            </div>

            <div className="space-y-3">
              {visits.map((visit) => (
                <div key={visit.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{visit.patient}</p>
                      <p className="text-xs text-slate-500">{visit.stage}</p>
                    </div>
                    <div className="text-xs text-slate-700">Next visit · {visit.nextVisit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
