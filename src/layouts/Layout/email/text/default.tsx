const rawHtml = `
<!-- php: /** * CakePHP(tm) : Rapid Development Framework (http://cakephp.org) * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org) * * Licensed under The MIT License * For full copyright and license information, please see the ... -->
<!-- php: = $this->fetch('content') -->

`;

export default function LayoutLayoutEmailTextDefault() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
