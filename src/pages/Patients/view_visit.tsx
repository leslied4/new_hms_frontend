import { Navigate, useSearchParams } from 'react-router-dom';

export default function PatientsViewVisitRedirect() {
  const [searchParams] = useSearchParams();
  const patientId = String(searchParams.get('patient_id') || searchParams.get('id') || '').trim();
  const visitId = String(searchParams.get('visit_id') || '').trim();

  if (!patientId) {
    return <Navigate to="/Patients/view_patients" replace />;
  }

  const params = new URLSearchParams();
  params.set('patient_id', patientId);
  if (visitId) params.set('visit_id', visitId);
  return <Navigate to={`/Patients/visit_space?${params.toString()}`} replace />;
}
