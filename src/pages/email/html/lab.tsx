import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/email/html/lab.php';
const rawHtml = `
<!-- php: /** * CakePHP(tm) : Rapid Development Framework (http://cakephp.org) * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org) * * Licensed under The MIT License * For full copyright and license information, please see the ... -->
<!-- php: echo 'Please find attached your lab report'; -->

`;

export default function EmailHtmlLabPage() {
  return (
    <PageShell title="email/html/lab.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
