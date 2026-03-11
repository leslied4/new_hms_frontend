import { useSearchParams } from 'react-router-dom';
import ClinicalEncounterWorkspace from '../../components/ClinicalEncounterWorkspace';

const asText = (value: unknown): string => String(value ?? '').trim();

export default function PatientsViewPatientNote() {
  const [searchParams] = useSearchParams();
  const patientId = asText(searchParams.get('patient_id') || searchParams.get('id'));
  const visitId = asText(searchParams.get('visit_id'));

  return <ClinicalEncounterWorkspace patientId={patientId} visitId={visitId} />;
}

