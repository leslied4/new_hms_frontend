import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Roles/set_permissions.php';
const rawHtml = `
<!-- start page content -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card card-box">
			<div class="card-head">
				<header>Permissions : <!-- php: = $rolename --></header>
				 <button id = "panel-button" 
					   class = "mdl-button mdl-js-button mdl-button--icon pull-right" 
					   data-upgraded = ",MaterialButton">
					   <i class = "material-icons">more_vert</i>
					</button>
					<ul class = "mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
					   data-mdl-for = "panel-button">
					   <li class = "mdl-menu__item"><i class="material-icons">assistant_photo</i>Action</li>
					   <li class = "mdl-menu__item"><i class="material-icons">print</i>Another action</li>
					   <li class = "mdl-menu__item"><i class="material-icons">favorite</i>Something else here</li>
					</ul>
			</div>
			<div class="card-body" id="bar-parent">
				<!--<form action="#" id="form_sample_1" class="form-horizontal">-->
				<!-- php: = $this->Form->create(null); -->
					<div class="form-body">
						<!-- php: $temp_name = ""; foreach($pages as $page){ if($temp_name != strstr($page->label, '-', true)){ $temp_name = strstr($page->label, '-', true); echo "<thead><strong><th colspan='2' class='row-head'>" . $temp_name . "</th></thead></strong><br><h... -->
						<div class="row">
							<div class="col-md-6">
								<!-- php: = $page->label -->
							</div>	
							
							<div class="offset-md-9">
								<!-- php: echo $this->Form->input('permission-' . $page->id, ['label' => false, 'class' => 'input-field', 'type' => 'checkbox', 'checked' => isset($permissions[$page->id]) ? $permissions[$page->id] : 0]); -->
							</div>
						</div>
						<!-- php: } -->		
						<div class="form-actions">
							<div class="row">
								<div class="offset-md-3 col-md-9">
									<button type="submit" class="btn btn-info">Submit</button>
									<!--<button type="button" onclick = 'clearFields()' class="btn btn-success">Reset</button>-->
									<a href="<!-- php: =$this->Url->build(['controller'=>'Roles','action'=>'viewRoles']) -->"><button type="button" class="btn btn-default">Cancel</button></a>
								</div>
							</div>
						</div>
					</div>
				<!-- php: =$this->Form->end(); -->
			</div>
		</div>
	</div>
</div>

<!-- end page content -->
<script>
function clearFields(){
	$('#name').val('');
	$('#description').val('');
	$('#status_id').val('');
}
</script>

`;

export default function RolesSetPermissionsPage() {
  return (
    <PageShell title="Roles/set_permissions.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
