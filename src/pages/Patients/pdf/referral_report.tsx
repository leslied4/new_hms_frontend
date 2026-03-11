import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Patients/pdf/referral_report.php';
const rawHtml = `

<!-- php: = $this->element('patientvisit/report/referral_report') -->
`;

export default function PatientsPdfReferralReportPage() {
  return (
    <PageShell title="Patients/pdf/referral_report.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
