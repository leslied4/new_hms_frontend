import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Departments/add_department.php';
const rawHtml = `
<!-- start page content -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card card-box">
			<div class="card-head">
				<header>Departments Information</header>
				<div class="tools">
					<a class="btn btn-primary" style="margin-top: 5px" href="<!-- php: = $this->Url->build(['controller' => 'Departments', 'action' => 'viewDepartments']) -->">View Departments</a>
				</div>
			</div>
			<div class="card-body" id="bar-parent">
				<!--<form action="#" id="form_sample_1" class="form-horizontal">-->
				<!-- php: = $this->Form->create($addDepartment,['id'=>'department']); -->
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
						
						<div class="form-actions">
						<div class="row">
							<div class="offset-md-3 col-md-9">
								<button type="submit" id="submit" class="btn btn-info">Submit</button>
								<button type="button" onclick = 'clearFields()' class="btn btn-success">Reset</button>
								<a href="<!-- php: =$this->Url->build(['controller'=>'Departments','action'=>'viewDepartments']) -->"><button type="button" class="btn btn-default">Cancel</button></a>
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
	$("#department").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>

`;

export default function DepartmentsAddDepartmentPage() {
  return (
    <PageShell title="Departments/add_department.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
