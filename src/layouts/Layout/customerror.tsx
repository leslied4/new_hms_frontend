const rawHtml = `
<!-- php: /** * CakePHP(tm) : Rapid Development Framework (http://cakephp.org) * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org) * * Licensed under The MIT License * For full copyright and license information, please see the ... -->
<!DOCTYPE html>
<html>
<head>
    <!-- php: = $this->Html->charset() -->
    <title>
        Firstline24 - Error
    </title>
    <!-- php: = $this->Html->meta('icon') -->

    <!-- php: = $this->Html->css('base.css') -->
    <!-- php: = $this->Html->css('cake.css') -->

	<!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->
	<!-- php: = $this->Html->css('../assets/css/pages/extra_pages.css') -->
</head>
<body>
        <div id="content">
            <!-- php: = $this->fetch('content') -->
        </div>
</body>
</html>

`;

export default function LayoutLayoutCustomerror() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
