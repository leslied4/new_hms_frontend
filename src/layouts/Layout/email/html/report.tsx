const rawHtml = `
<!-- php: /** * CakePHP(tm) : Rapid Development Framework (http://cakephp.org) * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org) * * Licensed under The MIT License * For full copyright and license information, please see the ... -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
    <title><!-- php: = $this->fetch('title') --></title>
</head>
<body>
    <!-- php: = $this->fetch('content') -->
</body>
</html>

`;

export default function LayoutLayoutEmailHtmlReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
