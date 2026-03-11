import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Specialties/edit_specialty.php';
const rawHtml = `
<!-- start page content -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card card-box">
			<div class="card-head">
				<header>Specialty Information</header>
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
				<!-- php: = $this->Form->create($editSpecialty); -->
					<div class="form-body">
						<div class="form-group row">
							<label class="control-label col-md-3">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" data-required="1" placeholder="" value="<!-- php: =$editSpecialty->name --> " class="form-control input-height" /> </div>
						</div>
						<div class="form-actions">
						<div class="row">
							<div class="offset-md-3 col-md-9">
								<button type="submit" id="submit" class="btn btn-info">Submit</button>
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
<script>
$(function () {
	$("#submit").click(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>
<!-- end page content -->

`;

export default function SpecialtiesEditSpecialtyPage() {
  return (
    <PageShell title="Specialties/edit_specialty.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
