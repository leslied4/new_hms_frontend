import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/email/text/default.php';
const rawHtml = `
<!-- php: /** * CakePHP(tm) : Rapid Development Framework (http://cakephp.org) * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org) * * Licensed under The MIT License * For full copyright and license information, please see the ... -->
<!-- php: = $content -->

`;

export default function EmailTextDefaultPage() {
  return (
    <PageShell title="email/text/default.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
