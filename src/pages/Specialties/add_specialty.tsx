import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Specialties/add_specialty.php';
const rawHtml = `
<!-- start page content -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card card-box">
			<div class="card-head">
				<header>Specialties Information</header>
				<div class="tools">
					<a class="btn btn-primary" style="margin-top: 5px" href="<!-- php: = $this->Url->build(['controller' => 'Specialties', 'action' => 'viewSpecialties']) -->">View Specialties</a>
				</div>
			</div>
			<div class="card-body" id="bar-parent">
				<!--<form action="#" id="form_sample_1" class="form-horizontal">-->
				<!-- php: = $this->Form->create($addSpecialty,['id' => 'specialty']); -->
					<div class="form-body">
						<div class="form-group row">
							<label class="control-label col-md-3">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="" class="form-control input-height" required = true /> </div>
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
								<button type="submit" id ="submit" class="btn btn-info">Submit</button>
								<button type="button" onclick = 'clearFields()' class="btn btn-success">Reset</button>
								<a href="<!-- php: =$this->Url->build(['controller'=>'Specialties','action'=>'viewSpecialties']) -->"><button type="button" class="btn btn-default">Cancel</button></a>
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
	$("#specialty").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>

`;

export default function SpecialtiesAddSpecialtyPage() {
  return (
    <PageShell title="Specialties/add_specialty.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
