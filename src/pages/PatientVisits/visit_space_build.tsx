import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/visit_space_build.php';
const rawHtml = `
<!-- php: = $this->element('patientvisit/patientvisittopnew') -->

<!-- Clincal Notes -->
'ccHeading',
'odqHeading',
'pmhHeading',
'allergyHeading',
'fhHeading',
'pshHeading',
'chHeading',
'phHeading',
'ghHeading',
'ohHeading',
`;

export default function PatientVisitsVisitSpaceBuildPage() {
  return (
    <PageShell title="PatientVisits/visit_space_build.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
