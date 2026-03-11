const rawHtml = `
<!-- php: /** * CakePHP(tm) : Rapid Development Framework (http://cakephp.org) * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org) * * Licensed under The MIT License * For full copyright and license information, please see the ... -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html style="-ms-overflow-style:scrollbar; -ms-text-size-adjust:100%; -webkit-tap-highlight-color:transparent; -webkit-text-size-adjust:100%; font-family:sans-serif; line-height:1.15">
<head>
    <title style="box-sizing: border-box;"><!-- php: = $this->fetch('title') --></title>
  
    
    <body style='background-color:#fff; color:#212529; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-size:1rem; font-weight:400; line-height:1.5; margin:0; text-align:left' bgcolor="#ffffff" align="left">
    <!-- php: = $this->fetch('content') -->
</body>
</html>

`;

export default function LayoutLayoutEmailHtmlInvoiceLayout() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
