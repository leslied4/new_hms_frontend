import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Patients/pdf/routine.php';
const rawHtml = `

`;

export default function PatientsPdfRoutinePage() {
  return (
    <PageShell title="Patients/pdf/routine.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
