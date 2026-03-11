import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Roles/add_role.php';
const rawHtml = `
<!-- start page content -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card card-box">
			<div class="card-head">
				<header>Roles Information</header>
				<div class="tools">
					<a class="btn btn-primary" style="margin-top: 5px" href="<!-- php: = $this->Url->build(['controller' => 'Roles', 'action' => 'viewRoles']) -->">View Roles</a>
				</div>
			</div>
			<div class="card-body" id="bar-parent">
				<!--<form action="#" id="form_sample_1" class="form-horizontal">-->
				<!-- php: = $this->Form->create($addRole,['id'=>'role']); -->
					<div class="form-body">
						<div class="form-group row">
							<label class="control-label col-md-3">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="" class="form-control input-height" required /> </div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Description
								
							</label>
							<div class="col-md-5">
								<input type="text" name="description" id="description" data-required="1" placeholder="" class="form-control input-height" /> </div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Status
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<!-- php: $ROLE_STATUSES = [ 1 => 'ENABLED', 2 => 'DISABLED', ]; -->
								<SearchableSelectField class="form-control input-height" name="status_id" id="status_id" required>
									<option value="">Select...</option>
									<!-- php: foreach($ROLE_STATUSES as $key => $value) { -->
									<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-actions">
						<div class="row">
							<div class="offset-md-3 col-md-9">
								<button type="submit" id="submit" class="btn btn-info">Submit</button>
								<button type="button" onclick = 'clearFields()' class="btn btn-success">Reset</button>
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

$(function () {
	$("#role").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>

`;

export default function RolesAddRolePage() {
  return (
    <PageShell title="Roles/add_role.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
