import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Patients/pdf/visit_report.php';
const rawHtml = `

<!-- php: = $this->element('patientvisit/report/visit_report') -->
`;

export default function PatientsPdfVisitReportPage() {
  return (
    <PageShell title="Patients/pdf/visit_report.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
