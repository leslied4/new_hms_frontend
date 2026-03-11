const rawHtml = `
<!-- start page content -->
<div class="row">
	<div class="col-md-12 col-sm-12">
	
		<div class="profile-sidebar">
			<div class="card card-topline-<!-- php: = $theme1 -->">
				<div class="card-head card-topline-<!-- php: = $theme1 -->">
					<header><!-- php: = $pageTitle --></header>
				</div>
				<div class="card-body no-padding height-9">
					<div class="profile-usertitle">
						<div class="profile-usertitle-name"><!-- php: = $itemName --></div>
					</div>
					<ul class="list-group list-group-unbordered">
						<!-- php: foreach($itemInformation as $info) { -->
							<li class="list-group-item">
								<b><!-- php: = $info['label'] --></b> <a class="pull-right"><!-- php: = $info['value'] --> </a>
							</li>
						<!-- php: } -->
						
						<li class="list-group-item">
							<a type="button" href="<!-- php: = $this->Url->build(['controller' => $itemController, 'action' => $itemAction]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.Cancel') --> pull-right" title="Cancel"><i class="fa fa-times"></i> Cancel</a>
						</li>
					</ul>
					
					<!-- END SIDEBAR USER TITLE -->
					
				</div>
			</div>
		</div>
			
		<div class="profile-content card card-topline-<!-- php: = $theme1 -->">
			<!-- php: = $this->fetch('content') -->
		</div>
	</div>
</div>

<!-- end page content -->


`;

export default function LayoutLayoutCashbookEditPrice() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
