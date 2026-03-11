const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<!-- BEGIN HEAD -->
<!-- php: echo $this->element('head_tags') -->
<!-- php: = $this->Html->meta('csrfToken', $this->request->getAttribute('csrfToken')) -->

<!-- END HEAD -->
<body class="page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-white <!-- php: = $theme1 -->-sidebar-color logo-<!-- php: = $theme1 -->">
    <div class="page-wrapper">
        <!-- start header -->
		<!-- php: = $this->element('header') -->
        <!-- end header -->
        <!-- start page container -->
		
        <div class="page-container">
 			<!-- start sidebar menu -->
 			<!-- php: =$this->element('menu') -->
			 <!-- end sidebar menu -->
			<!-- start page content -->
            <div class="page-content-wrapper">
                <div class="page-content">
					<!-- start page bar -->
					<!-- php: =$this->element('page_bar') -->
					<!-- end page bar -->
					<!-- start page content -->	
					<!-- php: = $this->Flash->render() -->
					<!-- php: =$this->fetch('content') -->
					<!-- end page content -->
					
					
				</div>  <!--/page-content -->
			</div>
				<!-- start chat sidebar -->
				<!-- php: // = $this->element('chat_side_bar') -->
				<!-- end chat sidebar -->
					  <!--/page-content-wrapper -->
		</div><!--/page-container -->
        <!-- end page container -->
        <!-- start footer -->
		<!-- php: = $this->element('footer'); -->
        <!-- end footer -->
    </div>  <!--/page-wrapper -->
	<!-- start js include path -->
<!-- php: echo $this->element('footer_tags') -->	
</body>
<script>
	// Get CSRF token from meta tag
	const csrfToken = $('meta[name="csrfToken"]').attr('content');

	// Attach token to all jQuery AJAX requests
	$.ajaxSetup({
		headers: {
			'X-CSRF-Token': csrfToken
		}
	});
</script>
</html>


`;

export default function LayoutLayoutDefault() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
