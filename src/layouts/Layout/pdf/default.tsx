const rawHtml = `

<!DOCTYPE html>
<html>
	<head>
		<title>
			Report
		</title>

		<!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css', ['fullBase' => true]) -->
		<!-- php: = $this->Html->css('../assets/plugins/material/material.min.css', ['fullBase' => true]) -->
		<!-- php: = $this->Html->css('../assets/css/style.css', ['fullBase' => true]) -->
		<!-- php: = $this->Html->css('../assets/css/custom_style.css', ['fullBase' => true]) -->

	</head>
	
	<body>
		<!-- php: = $this->fetch('content') -->
	</body>

</html>

`;

export default function LayoutLayoutPdfDefault() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
