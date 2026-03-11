const rawHtml = `
<!-- start page content -->
<div class="row">
	<div class="col-md-12 col-sm-12">
	
		<div class="card-container">
			<div class="card card-topline-<!-- php: = $theme1 -->">
				<div class="card-body">
					<div class="card-content d-flex justify-content-between align-items-center">
						<div>

							<h4 class="card-title"><!-- php: = $itemName --></h4>
							
							<div class="info-badges">
								<!-- php: foreach($itemInformation as $info): -->
									<span class="badge badge-md badge-info">
										<!-- php: = $info['label'] -->: <!-- php: = $info['value'] -->
									</span>
								<!-- php: endforeach; -->
							</div>
						</div>
						<a type="button" href="<!-- php: = $this->Url->build(['controller' => $itemController, 'action' => $itemAction]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.Cancel') --> pull-right" title="Cancel"><i class="fa fa-times"></i> Cancel</a>
					</div>
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

export default function LayoutLayoutLabEditTemplate() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
