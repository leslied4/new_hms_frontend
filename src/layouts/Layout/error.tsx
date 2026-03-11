const rawHtml = `
<!-- php: /** * CakePHP(tm) : Rapid Development Framework (http://cakephp.org) * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org) * * Licensed under The MIT License * For full copyright and license information, please see the ... -->
<!DOCTYPE html>
<html>
<head>
    <!-- php: = $this->Html->charset() -->
    <title>
        <!-- php: = $this->fetch('title') -->
    </title>
    <!-- php: = $this->Html->meta('icon') -->

    <!-- php: = $this->Html->css('base.css') -->
    <!-- php: = $this->Html->css('cake.css') -->

    <!-- php: = $this->fetch('meta') -->
    <!-- php: = $this->fetch('css') -->
    <!-- php: = $this->fetch('script') -->
</head>
<body>
    <div id="container">
        <div id="header">
            <h1><!-- php: = __('Error') --></h1>
        </div>
        <div id="content">
            <!-- php: = $this->Flash->render() -->

            <!-- php: = $this->fetch('content') -->
        </div>
        <div id="footer">
            <!-- php: = $this->Html->link(__('Back'), 'javascript:history.back()') -->
        </div>
    </div>
</body>
</html>

`;

export default function LayoutLayoutError() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
