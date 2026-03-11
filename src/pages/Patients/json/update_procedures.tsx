import PageShell from '../../../components/PageShell';

const mockPayload = {
  patientId: 'PT-001',
  visitId: 'VST-001',
  procedures: [
    { id: 'PROC-01', name: 'CBC', status: 'ordered' },
    { id: 'PROC-02', name: 'X-Ray Chest', status: 'completed' },
  ],
  updatedAt: '2026-01-30T14:12:00Z',
};

export default function PatientsJsonUpdateProcedures() {
  return (
    <PageShell
      title="Patients/json/update_procedures.php"
      sourcePath="templates/Patients/json/update_procedures.php"
    >
      <div className="space-y-6">
        <div className="template-frame">
          <div className="template-content space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">JSON</p>
              <h2 className="text-2xl font-semibold text-slate-900">Update Procedures Payload</h2>
              <p className="text-sm text-slate-600">Rendered mock JSON response for API parity.</p>
            </div>

            <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 text-xs text-emerald-200">
{JSON.stringify(mockPayload, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
