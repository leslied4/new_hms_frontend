import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

type GenericRow = Record<string, unknown>;

type ReportRequest = {
  request_lab: GenericRow;
  lab_test: GenericRow | null;
  investigation: GenericRow | null;
  status: GenericRow | null;
  ordered_by: GenericRow | null;
  specimen_types: GenericRow[];
  results: GenericRow[];
};

type ReportGroup = {
  id?: string;
  name?: string;
  requests: ReportRequest[];
};

type ReportResponse = {
  patient_visit: GenericRow | null;
  patient: GenericRow | null;
  settings: GenericRow | null;
  investigation_group: ReportGroup[];
  result_flags: GenericRow[];
};

const asText = (value: unknown): string => String(value ?? '').trim();

const formatDateTime = (value: unknown): string => {
  const text = asText(value);
  if (!text) return 'N/A';
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return text;
  return date.toLocaleString();
};

const flattenObject = (value: unknown, prefix = ''): Array<{ key: string; value: string }> => {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenObject(item, `${prefix}[${index}]`));
  }
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, item]) =>
      flattenObject(item, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [{ key: prefix || 'value', value: String(value) }];
};

const isBiochemistryResult = (result: GenericRow): boolean => {
  const type = asText(result.type).toLowerCase();
  return !type || type === 'bloodchemistry';
};

export default function RequestLabsPatientVisitReport() {
  const [searchParams] = useSearchParams();
  const visitId = searchParams.get('visit_id') || searchParams.get('id') || '';
  const requestLabId = searchParams.get('request_lab_id') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReportResponse | null>(null);

  const resultFlagById = useMemo(() => {
    const map = new Map<string, string>();
    (data?.result_flags || []).forEach((row) => {
      map.set(asText(row.id), asText(row.name) || asText(row.label_name) || asText(row.description));
    });
    return map;
  }, [data?.result_flags]);

  const allSpecimens = useMemo(() => {
    const names: string[] = [];
    (data?.investigation_group || []).forEach((group) => {
      (group.requests || []).forEach((req) => {
        (req.specimen_types || []).forEach((specimen) => {
          const name = asText(specimen.name);
          if (name) names.push(name);
        });
      });
    });
    return Array.from(new Set(names));
  }, [data?.investigation_group]);

  useEffect(() => {
    const load = async () => {
      if (!visitId) {
        setError('Missing visit_id.');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ visit_id: visitId });
        if (requestLabId) params.set('request_lab_id', requestLabId);
        const response = await api.get<ReportResponse>(`/legacy/request-labs/patient-visit-report/?${params.toString()}`);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load patient visit report.');
      } finally {
        setIsLoading(false);
      }
    };
    load().catch(() => {
      setError('Unable to load patient visit report.');
      setIsLoading(false);
    });
  }, [visitId, requestLabId]);

  if (isLoading) return <div className="p-6 text-sm text-slate-600">Loading report...</div>;
  if (error) return <div className="p-6 text-sm text-rose-700">{error}</div>;

  const patient = data?.patient || {};
  const visit = data?.patient_visit || {};
  const settings = data?.settings || {};

  return (
    <div className="mx-auto max-w-6xl space-y-6 bg-white p-6 text-slate-900">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-semibold">{asText(settings.institution) || 'Medical Laboratory Report'}</h1>
          <p className="text-sm">{asText(settings.name)}</p>
          <p className="text-sm">{asText(settings.address)}</p>
          <p className="text-sm">Tel: {asText(settings.phone1) || 'N/A'}</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Print
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Patient Information</p>
          <p className="mt-2 font-semibold">{`${asText(patient.first_name)} ${asText(patient.last_name)}`.trim() || 'N/A'}</p>
          <p className="text-sm">{asText(patient.home_address) || 'N/A'}</p>
          <p className="text-sm">{asText(patient.email) || 'N/A'}</p>
          <p className="text-sm">{asText(patient.phone) || 'N/A'}</p>
          <p className="mt-2 text-sm">Patient #: {asText(patient.folder_number) || asText(patient.code) || 'N/A'}</p>
          <p className="text-sm">DOB: {formatDateTime(patient.date_of_birth)}</p>
        </section>

        <section className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Visit Information</p>
          <p className="mt-2 text-sm">Date/Time: {formatDateTime(visit.date_created)}</p>
          <p className="text-sm">Referral Facility: {asText(visit.referral_facility) || 'N/A'}</p>
          <p className="text-sm">Referral Doctor: {asText(visit.referral_doctor) || 'N/A'}</p>
          <p className="text-sm">Payer: {asText(visit.payer) || 'N/A'}</p>
        </section>

        <section className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Specimen Information</p>
          <p className="mt-2 text-sm">Pathology #: {asText(visit.lab_no) || 'N/A'}</p>
          <p className="text-sm">Time Collected: {formatDateTime(visit.specimen_drawn_date)}</p>
          <p className="text-sm">Time Reported: {formatDateTime(visit.specimen_analyzed_date)}</p>
          <p className="mt-2 text-sm font-semibold">Specimens</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {allSpecimens.length > 0 ? (
              allSpecimens.map((name) => (
                <span key={name} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  {name.toUpperCase()}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">N/A</span>
            )}
          </div>
        </section>
      </div>

      {(data?.investigation_group || []).map((group, groupIndex) => (
        <section key={`${group.id || 'group'}-${groupIndex}`} className="space-y-3">
          <h2 className="border-b border-slate-200 pb-2 text-base font-semibold text-slate-900">
            {asText(group.name) || 'Investigation'}
          </h2>
          {(group.requests || []).map((req, index) => {
            const labName = asText(req.lab_test?.name) || `Lab Test ${index + 1}`;
            const results = Array.isArray(req.results) ? req.results : [];
            const typedResults = results.filter((row) => !isBiochemistryResult(row));
            const biochemistryResults = results.filter((row) => isBiochemistryResult(row));
            const latestBiochemistryResult = biochemistryResults[biochemistryResults.length - 1];
            return (
              <article key={`${asText(req.request_lab?.id) || index}`} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">{labName}</h3>
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    {asText(req.status?.name) || asText(req.request_lab?.status_id) || 'N/A'}
                  </span>
                </div>

                {results.length === 0 ? (
                  <p className="text-sm text-slate-500">No results captured.</p>
                ) : (
                  <div className="space-y-3">
                    {typedResults.map((result, rIndex) => {
                      const type = asText(result.type);
                        let parsedTemplate: unknown = result.template;
                        if (typeof parsedTemplate === 'string') {
                          try {
                            parsedTemplate = JSON.parse(parsedTemplate);
                          } catch {
                            parsedTemplate = parsedTemplate;
                          }
                        }
                        const flattened = flattenObject(parsedTemplate);
                        return (
                          <div key={`${asText(result.id) || rIndex}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{type} Report</p>
                            {flattened.length === 0 ? (
                              <p className="text-xs text-slate-600">No template values.</p>
                            ) : (
                              <div className="grid gap-2 md:grid-cols-2">
                                {flattened.map((row) => (
                                  <div key={`${row.key}-${row.value}`} className="rounded border border-slate-200 bg-white px-2 py-1 text-xs">
                                    <span className="font-semibold">{row.key}:</span> {row.value}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                    })}

                    {biochemistryResults.length > 0 && (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Blood Chemistry Report</p>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[640px] border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-300 text-left">
                                <th className="px-2 py-1 font-semibold">Test Item</th>
                                <th className="px-2 py-1 font-semibold">Result</th>
                                <th className="px-2 py-1 font-semibold">Reference</th>
                                <th className="px-2 py-1 font-semibold">Unit</th>
                                <th className="px-2 py-1 font-semibold">Flag</th>
                              </tr>
                            </thead>
                            <tbody>
                              {biochemistryResults.map((result, biochemIndex) => {
                                const template = (result.lab_template as GenericRow | null) || null;
                                const rawLabel = asText(result.label_name);
                                const displayLabel = rawLabel === 'Result'
                                  ? labName
                                  : rawLabel || asText(template?.label_name) || labName;
                                const referenceValue = asText(result.reference_value) || asText(template?.reference);
                                const unitValue = asText(result.unit_of_measurement) || asText(template?.unit_of_measurement);
                                return (
                                  <tr key={`${asText(result.id) || biochemIndex}`} className="border-b border-slate-200">
                                    <td className="px-2 py-1">{displayLabel || 'N/A'}</td>
                                    <td className="px-2 py-1">{asText(result.normal_value) || 'N/A'}</td>
                                    <td className="px-2 py-1">{referenceValue || 'N/A'}</td>
                                    <td className="px-2 py-1">{unitValue || 'N/A'}</td>
                                    <td className="px-2 py-1">
                                      {resultFlagById.get(asText(result.result_flag_id)) || asText(result.result_flag_id) || ''}
                                    </td>
                                  </tr>
                                );
                              })}
                              {asText(req.request_lab?.comment) && (
                                <tr>
                                  <td className="px-2 py-2 font-semibold">Comment</td>
                                  <td className="px-2 py-2" colSpan={4}>{asText(req.request_lab?.comment)}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 grid gap-2 text-xs md:grid-cols-2">
                          <p><span className="font-semibold">Recorded By:</span> {asText(latestBiochemistryResult?.recorded_by && (latestBiochemistryResult.recorded_by as GenericRow).full_name) || 'N/A'}</p>
                          <p><span className="font-semibold">Date Drawn:</span> {formatDateTime(latestBiochemistryResult?.date_created)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ))}

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
        <p className="font-semibold">Test Limitation</p>
        <p>
          Laboratory diagnostics should be interpreted with full clinical context. If symptoms and report are discordant,
          please request repeat testing for confirmation.
        </p>
      </section>
    </div>
  );
}
