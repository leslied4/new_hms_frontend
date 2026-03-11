const rawHtml = `
<!-- BEGIN HEAD -->
<head>
<link rel="stylesheet" href="https://cdn.plyr.io/3.6.8/plyr.css">	
    <!--<meta charset="utf-8" /> -->
	<!-- php: = $this->Html->charset() -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
	<base href="/" />
    <title>
		<!-- php: $controller = $this->request->getParam('controller') ; $action = $this->request->getParam('action') ; -->
		<!-- php: echo "Firstline24 - " . $controller. '-' . $action ; -->
	</title>
    <!-- google font -->
    <!-- link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" type="text/css" / -->
	<!--internal css -->
	<style>
		li.list-group-item.vActive a    {
			           
			background-color: #e91e63;
			color : #ffffff;
		}
		li.list-group-item.vActive a :hover   {
			           
			color : #000000;
		}
		.hide-element{
				display : none !important;
		}
		@media print {    
			.no-print
			{
				display: none !important;
			}
		}
	</style>
	<!-- icons -->
    <link href="../assets/fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<!-- <!-- php: // $this->Html->css('../assets/fonts/font-awesome/css/font-awesome.min.css ') --> -->
	<!-- link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" -->
	<!--bootstrap -->
	<!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/bootstrap-select/css/bootstrap-select.min.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/jquery-ui/jquery-ui.min.css') -->
    <!-- Material Design Lite CSS -->
	<!-- <!-- php: $this->Html->css('../assets/plugins/material/material.min.css') --> -->
	<!-- <!-- php: $this->Html->css('../assets/css/material_style.css') --> -->

	<!-- php: // $this->Html->css("../assets/plugins/pnotify/dist/pnotify.css") -->
	<!-- php: // $this->Html->css("../assets/plugins/pnotify/dist/pnotify.buttons.css") --> 

	<!--MobiScroll-->
	<!-- php: =$this->Html->css('../assets/plugins/mobiscroll/css/mobiscroll.javascript.min.css') -->
	
	<!-- Theme Styles -->
	<!-- php: = $this->Html->css('../assets/css/style.css') -->
	<!-- php: = $this->Html->css('../assets/css/custom_style.css') -->
	<!-- php: = $this->Html->css('../assets/css/plugins.min.css') -->
	<!-- php: = $this->Html->css('../assets/css/responsive.css') -->
	<!-- php: = $this->Html->css('../assets/css/theme-color.css') -->
	<!-- php: = $this->Html->css('../assets/css/pages/formlayout.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/jquery.dataTables.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/searchBuilder.dataTables.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->
	
	<!-- php: = $this->Html->css('../assets/plugins/notify/alertify.default.css') -->	
	<!-- php: = $this->Html->css('../assets/plugins/notify/alertify.core.css') -->	
	
	<!-- php: = $this->Html->css('../assets/plugins/summernote/summernote.css') -->	
	
	<!-- php: = $this->Html->css('../assets/plugins/fullcalendar/fullcalendar.css') -->


	<!-- favicon -->
    <!--<link rel="shortcut icon" href="../assets/img/favicon.ico" />--> 
	<!-- php: // $this->Html->image('../assets/img/favicon.ico') -->
	
	<!-- php: = $this->Html->script('../assets/plugins/jquery/jquery.min.js') -->
	<!-- php: = $this->Html->script('../assets/plugins/jquery/jquery-migrate-3.0.0.min.js') -->
	<!-- php: = $this->Html->script('../assets/plugins/jquery-ui/jquery-ui.min.js') -->
	<!-- php: //= $this->Html->script('../assets/plugins/moment/moment.min.js') -->
	<!-- php: //= $this->Html->script('../assets/plugins/transition/transition.min.js') -->
	<!-- php: //= $this->Html->script('../assets/plugins/collapse/collapse.js') -->
	
	<!-- php: =$this->Html->script('../assets/plugins/tooltip/tooltip.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/popper/popper.min.js') -->
	<!-- php: = $this->Html->script('../assets/plugins/bootstrap/js/bootstrap.min.js') -->
	<!-- php: = $this->Html->script('../assets/plugins/notify/alertify.min.js') -->	
	<!-- php: =$this->Html->script('../assets/plugins/jquery-tags-input/jquery-tags-input.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/jquery-tags-input/jquery-tags-input-init.js') -->
	
	<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') --> 
	
	<!-- php: = $this->Html->meta('icon') -->

	<!-- php: = $this->Html->script('/js/cornerstone.js'); -->
	<!-- php: = $this->Html->script('/js/cornerstoneMath.js'); -->
	<!-- php: = $this->Html->script('/js/cornerstoneTools.js'); -->
	<!-- php: = $this->Html->script('/js/cornerstoneWADOImageLoader.js'); -->
	<!-- php: = $this->Html->script('/js/cornerstoneWebImageLoader.js'); -->
	<!-- php: = $this->Html->script('/js/dicomParser.js'); -->
	<!-- php: = $this->Html->script('/js/custom_scan_viewer.js'); -->

 </head>
 <!-- END HEAD -->
`;

export default function ElementElementHeadTags() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
