import PageShell from '../../components/PageShell';

const sourcePath = 'templates/CreditClaims/summary.php';
const rawHtml = `

`;

export default function CreditClaimsSummaryPage() {
  return (
    <PageShell title="CreditClaims/summary.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
