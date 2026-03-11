import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Roles/view_role_details.php';
const rawHtml = `
<!-- start page content -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card card-box">
			<div class="card-head">
				<header>Roles Information</header>
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
				<!-- php: = $this->Form->create($viewRole); -->
					<div class="form-body">
						<div class="form-group row">
							<label class="control-label col-md-3">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" data-required="1" placeholder="" value="<!-- php: =$viewRole->name --> " class="form-control input-height" readonly /> </div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Description
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="description" data-required="1" placeholder="" value="<!-- php: =$viewRole->description --> " class="form-control input-height" readonly /> </div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Status
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<!-- php: $ROLE_STATUSES = [ 1 => 'ENABLED', 2 => 'DISABLED', ]; -->
								<input type="text" name="status_id" data-required="1" placeholder="" value="<!-- php: = $ROLE_STATUSES[$viewRole->status_id] --> " class="form-control input-height" readonly />
							</div>
						</div>
						<div class="form-actions">
						<div class="row">
							<div class="offset-md-3 col-md-9">
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

`;

export default function RolesViewRoleDetailsPage() {
  return (
    <PageShell title="Roles/view_role_details.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
