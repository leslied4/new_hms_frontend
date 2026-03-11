const rawHtml = `

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="card  card-box">
			<div class="card-head">
				<header>Examinations</header>
			</div>
			<div class="card-body " id="bar-parent">
				<div class="row">
					<div class="col-md-2 col-sm-3 col-xs-3">
						<ul class="nav nav-tabs tabs-left left-tab-card" id="examinationTab">
							
							<li class="nav-item">
								<a href="#general" data-toggle="tab">General</a>
							</li>
							<li class="nav-item">
								<a href="#eye" data-toggle="tab">Eyes</a>
							</li>
							<li class="nav-item">
								<a href="#nose" data-toggle="tab">Nose</a>
							</li>
							<li class="nav-item">
								<a href="#mouth" data-toggle="tab">Mouth</a>
							</li>
							<li class="nav-item">
								<a href="#neck" data-toggle="tab">Neck</a>
							</li>
							<li class="nav-item">
								<a href="#groin" data-toggle="tab">Groin</a>
							</li>
							<li class="nav-item">
								<a href="#hand" data-toggle="tab">Hands</a>
							</li>
							<li class="nav-item">
								<a href="#breast" data-toggle="tab">Breast</a>
							</li>
							<li class="nav-item">
								<a href="#cardiovascular" data-toggle="tab">Cardiovascular System</a>
							</li>
							<li class="nav-item">
								<a href="#respiratory" data-toggle="tab">Respiratory System</a>
							</li>							
							<li class="nav-item">
								<a href="#abdomen" data-toggle="tab">Abdomen</a>
							</li>
							<li class="nav-item">
								<a href="#extremity" data-toggle="tab">Extremities</a>
							</li>
							<li class="nav-item">
								<a href="#neurological" data-toggle="tab">Neurological</a>
							</li>
							
							<!-- php: if($patient->gender_id == 2) { -->
								<li class="nav-item">
									<a href="#gynaecologic" data-toggle="tab">Gynaecologic</a>
								</li>
								<li class="nav-item">
									<a href="#obstetricabdomen" data-toggle="tab">Obstetric (Abdomen)</a>
								</li>
								<li class="nav-item">
									<a href="#obstetricpelvic" data-toggle="tab">Obstetric (Pelvic)</a>
								</li>
							<!-- php: } -->
							
						</ul>
					</div>
					<div class="col-md-10 col-sm-9 col-xs-9">
						<div class="tab-content">
							<div class="tab-pane" id="abdomen">
								<!-- php: = $this->element('patientvisit/examination/abdomenexam') -->
							</div>
							<div class="tab-pane" id="breast">
								<!-- php: = $this->element('patientvisit/examination/breastexam') -->
							</div>
							<div class="tab-pane" id="eye">
								<!-- php: = $this->element('patientvisit/examination/eyesexam') -->
							</div>
							<div class="tab-pane" id="general">
								<!-- php: = $this->element('patientvisit/examination/generalexam') -->
							</div>
							<div class="tab-pane" id="groin">
								<!-- php: = $this->element('patientvisit/examination/groinexam') -->
							</div>
							<div class="tab-pane" id="extremity">
								<!-- php: = $this->element('patientvisit/examination/extremityexam') -->
							</div>
							<div class="tab-pane" id="cardiovascular">
								<!-- php: = $this->element('patientvisit/examination/cardiovascularexam') -->
							</div>
							<div class="tab-pane" id="respiratory">
								<!-- php: = $this->element('patientvisit/examination/respiratoryexam') -->
							</div>
							<div class="tab-pane" id="hand">
								<!-- php: = $this->element('patientvisit/examination/handexam') -->
							</div>
							<div class="tab-pane" id="mouth">
								<!-- php: = $this->element('patientvisit/examination/mouthexam') -->
							</div>
							<div class="tab-pane" id="neck">
								<!-- php: = $this->element('patientvisit/examination/neckexam') -->
							</div>
							<div class="tab-pane" id="neurological">
								<!-- php: = $this->element('patientvisit/examination/neurologicalexam') -->
							</div>
							
							<!-- php: if($patient->gender_id == 2) { -->
								<div class="tab-pane" id="gynaecologic">
									<!-- php: = $this->element('patientvisit/examination/gynaecologicexam') -->
								</div>
								<div class="tab-pane" id="obstetricabdomen">
									<!-- php: = $this->element('patientvisit/examination/obstetricabdomenexam') -->
								</div>
								<div class="tab-pane" id="obstetricpelvic">
									<!-- php: = $this->element('patientvisit/examination/obstetricpelvicexam') -->
								</div>
							<!-- php: } -->
							
							<div class="tab-pane" id="nose">
								<!-- php: = $this->element('patientvisit/examination/noseexam') -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#examinationTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('lastExaminationTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var lastExaminationTab = localStorage.getItem('lastExaminationTab');
		if (lastExaminationTab) {
		   $('#examinationTab a[href=' + lastExaminationTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#examinationTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ElementElementPatientvisitExamination() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
