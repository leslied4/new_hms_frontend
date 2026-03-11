import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/email/html/patient_portal_view.php';
const rawHtml = `
<h3>Hello there,</h3>
<p>Your access code is <!-- php: echo $access_code; --></p>
`;

export default function EmailHtmlPatientPortalViewPage() {
  return (
    <PageShell title="email/html/patient_portal_view.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
