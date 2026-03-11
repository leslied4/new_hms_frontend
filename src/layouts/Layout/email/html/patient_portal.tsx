const rawHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
    <head>
        <title><!-- php: echo $this->fetch('title'); --></title>
    </head>
    <body>
        <!-- php: echo $this->fetch('content'); -->
    </body>
</html>
`;

export default function LayoutLayoutEmailHtmlPatientPortal() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
