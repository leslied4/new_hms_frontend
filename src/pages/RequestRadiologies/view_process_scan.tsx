import { useSearchParams } from 'react-router-dom';

export default function RequestRadiologiesViewProcessScan() {
  const [searchParams] = useSearchParams();
  const scanId = searchParams.get('scan_id') || searchParams.get('id') || '';
  const visitId = searchParams.get('visit_id') || '';

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Request Radiologies</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Process Scan</h1>
        <p className="mt-2 text-sm text-slate-600">Visit ID: {visitId || 'N/A'}</p>
        <p className="mt-1 text-sm text-slate-600">Scan ID: {scanId || 'N/A'}</p>
      </section>
    </div>
  );
}
