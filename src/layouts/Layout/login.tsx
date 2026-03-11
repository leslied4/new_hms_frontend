const rawHtml = `
<!DOCTYPE html>
<html>
	<head>
		<!-- php: = $this->Html->charset() -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Firstline24</title>
		<!-- php: = $this->Html->meta('icon') -->

		<!-- php: = $this->Html->css('../assets/login/bootstrap.css') -->
		<!-- php: = $this->Html->css('../assets/css/loginstyle.css') -->
		<!-- php: = $this->Html->css('../assets/fonts/font-awesome/css/font-awesome.min.css') -->
		
		<!-- php: = $this->Html->css('../assets/plugins/notify/alertify.default.css') -->	
		<!-- php: = $this->Html->css('../assets/plugins/notify/alertify.core.css') -->	
		
		<!-- php: = $this->Html->css('../assets/css/custom_style.css') -->	
		
		<!-- php: = $this->Html->script('../assets/login/jquery.js') -->
		<!-- php: = $this->Html->script('../assets/login/bootstrap.min.js') -->
		<!-- php: = $this->Html->script('../assets/plugins/notify/alertify.min.js') -->	
		
		<!-- php: = $this->fetch('meta') -->
		<!-- php: = $this->fetch('css') -->
		<!-- php: = $this->fetch('script') -->
	</head>

	<body>
		<!--login modal-->
		<div id="loginModal" class="modal show" tabindex="-1" role="dialog" aria-hidden="true">
		  <div class="modal-dialog" style="max-width: 400px">
			  <div class="modal-content">
				<div class="modal-header" style="padding-top: 0px; padding-bottom: 0px;" >
					<h5>
						<span>
				
							<!-- php: = $this->Html->image("../assets/img/logo4.png", ['class' => "login-img", 'style' => 'width: auto; height: 25px']) --> 
							<span class="badge badge-pill badge-danger" style="background-color: #ff0000;">HMS</span>
						</span>
					</h5>
				</div>
				<div class="modal-body" style="margin-top: 0px; padding-top: 0px;">
					<!-- php:  -->
					<h3 align="center" style="margin-top: 0px">
						<span>
							<!-- php: = $this->Html->image("../", ['class' => "login-img", 'style' => 'width: 150px; height: auto', "id" => "logo-img" ]) -->
						</span>
					</h3>
					<!-- php: = $this->Flash->render() -->
					<!-- php: = $this->fetch('content') -->
				</div>
				<div class="modal-footer" style="padding-top: 0px; padding-bottom: 0px;">
				  <div class="col-md-12">
					<h6 align="center">Copyright Firstline24 <!-- php: = date("Y") -->(c)</h6>
				  </div>	
				</div>
			  </div>
		  </div>
		</div>
	</body>
	<script>
		$(document).ready(function(){
			getLogo()
		})

		function getLogo() {
			current_url = window.location.href
			split = current_url.split("/");
			uri_captured = split[3]
			split.splice(4, 1);

			split[split.length - 2] = \`assets/img/\${uri_captured}.png\`;

			split.pop()
			
			var full_uri = split.join("/");

			console.log(full_uri);
			
			$('#logo-img').attr("src", full_uri)
			
		}
	</script>
</html>

`;

export default function LayoutLayoutLogin() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
