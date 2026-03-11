import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Reports_2021_03_11/pdf/drug_consumption.php';
const rawHtml = `
<!-- php: = $this->element('report/drug_consumption') -->
					
`;

export default function Reports20210311PdfDrugConsumptionPage() {
  return (
    <PageShell title="Reports_2021_03_11/pdf/drug_consumption.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
