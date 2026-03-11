import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Patients/pdf/drug_administration_chart.php';
const rawHtml = `

<!-- php: = $this->element('patientvisit/report/drug_administration_chart') -->
`;

export default function PatientsPdfDrugAdministrationChartPage() {
  return (
    <PageShell title="Patients/pdf/drug_administration_chart.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
