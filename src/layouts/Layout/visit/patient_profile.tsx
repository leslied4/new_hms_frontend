const rawHtml = `

<div class="row">
	<div class="col-md-12">
		<!-- BEGIN PROFILE SIDEBAR -->
		
			<div class="card card-topline-<!-- php: = $theme1 -->">
				<div class="card-body no-padding">
					<div class="row">
						<div class="profile-userpic col-md-2 right-border">
							<!-- php: echo $this->Html->image($patientImage,['class' =>'img-responsive', 'style' => 'width: 100px']); -->
							
							<!-- php: if(null !==($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1) { -->
								<span class="mdl-badge custom-badge" data-badge="Admitted"></span>
								
							<!-- php: } -->
							
							<div class="profile-usertitle">
								<div class="profile-usertitle-name" style="font-size: 16px"><!-- php: = $patient->first_name.' '. $patient->last_name --></div>
							</div>
						</div>
						<div class="col-md-3 right-border">
							<ul class="list-group list-group-unbordered">
								<li class="list-group-item">
									<b>Folder Number</b> <a class="pull-right"><!-- php: = $patient->folder --> </a>
								</li>
								<li class="list-group-item">
									<b>Sex</b> <a class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" --> </a>
								</li>
								<li class="list-group-item">
									<b>Age</b> <a class="pull-right"><!-- php: =isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </a>
								</li>
							</ul>
						</div>
						<div class="col-md-3 right-border">
							<ul class="list-group list-group-unbordered">
								<li class="list-group-item">
									<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
									<b>Sickling Status</b> <a class="pull-right"><!-- php: = isset($LAB3_STATUSES[$patient->sickling_status]) ? $LAB3_STATUSES[$patient->sickling_status] : 'N/A' --> </a>
								</li>
								<li class="list-group-item">
									<b>Blood Group</b> <a class="pull-right"><!-- php: =isset($patient->blood_group)? $patient->blood_group->name : "" --> </a>
								</li>
								<li class="list-group-item" style="border-bottom: 0px; padding-top: 22px; padding-bottom: 0px;">
									<a type="button" style="margin-bottom: 10px" href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'editPatient', $patient->id]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> pull-right"><i class="fa fa-pencil" ></i> Edit</a>
									<a type="button" href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPatient', $patient->id]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.View') --> pull-right" style="margin-right: 5px; margin-bottom: 10px"><i class="fa fa-eye"></i> View</a>
									<!-- php: if($seriousness >= 30 && isset($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted != 1 && $isCurrentVisit) { -->
										<a type="button" href="javascript:" data-toggle="modal" data-target="#admitDialogue" class="btn btn-circle btn-info pull-right" style="margin-right: 5px; margin-bottom: 10px"><i class="fa fa-plus"></i> Admit</a>
									<!-- php: } else if(null !==($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1) { -->
									
									<!-- php: } -->
								</li>
							</ul>
						</div>
                        
						<!-- php: if($isCurrentVisit) { -->
						<div class="modal fade" id="admitDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title" id="exampleModalLongTitle">Admit Patient: <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								  <span aria-hidden="true">&times;</span>
								</button>
							  </div>
							  <div class="modal-body">
								
								<div class="row">
									<div class="col-md-12 col-sm-12">
										<div class="card card-box">
											<div class="card-head">
												<header>Room Allotment Form</header>
											</div>
											<div class="card-body" id="bar-parent">
												<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'admitPatient'], 'class' => 'form-horizontal']) -->
													<div class="form-body">
														<!-- php: = $this->Form->hidden('patient_visit_id', ['value' => $selectedVisit->id]) -->
														<div class="form-group row">
															<label class="control-label col-md-5">Ward Type
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<SearchableSelectField class="form-control input-height", onChange="updateWards(this.value);">
																	<option value="">Select...</option>
																	<!-- php: foreach($wardTypes as $wardType) { echo '<option value="' . $wardType->id . '">' . $wardType->name . '</option>'; } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-5">Ward
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<SearchableSelectField class="form-control input-height" id="wardfield", onChange="updateBeds(this.value);">
																	<option value="">Select...</option>
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-5">Bed No
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<SearchableSelectField class="form-control input-height" name="bed_id" id="bedfield">
																	<option value="">Select...</option>
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-5">Patient Name
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="firstname" data-required="1" value="<!-- php: = $patient->first_name . ' ' . $patient->last_name -->" placeholder="enter patient name" class="form-control input-height" readonly /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-5">Allotment Date
															</label>
															<div class="col-md-7">
																<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																	<input name="admission_start" class="form-control input-height" size="16" placeholder="Admission Start" type="text" value="">
																	<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																</div>
																<input type="hidden" id="dtp_input2" value="" />
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-5">Discharge Date
															</label>
															<div class="col-md-7">
																<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																	<input name="admission_end" class="form-control input-height" size="16" placeholder="Admission End" type="text" value="">
																	<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																</div>
																<input type="hidden" id="dtp_input5" value="" />
															</div>
														</div>
													</div>
													<div class="form-actions">
														<div class="row">
															<div class="offset-md-3 col-md-9">
																<button type="submit" class="btn btn-info">Submit</button>
																<button type="button" class="btn btn-default">Cancel</button>
															</div>
														</div>
													</div>
												<!-- php: = $this->Form->end() -->
											</div>
										</div>
									</div>
								</div>
							  </div>
							</div>
						  </div>
						</div>
						<!-- php: } -->
						
						<div class="profile-usertitle col-md-4">

							<!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action' =>'previousVisit', $patient->id]]); -->
								<div class="form-group row">
									<label class="col-md-4 control-label">Change Visit</label>
									<div class="input-group date col-md-8">
										<SearchableSelectField class="form-control" name="visit_id" type="text" required>
											<option value="">--Pick a Visit--</option>
											<!-- php: foreach($patientVisits as $visit){ echo "<option value='" . $visit->id . "' " . ($visit->id == $selectedVisit->id ? "selected": "") . ">" . $visit->date_visited->nice() . "</option>"; } -->
										</SearchableSelectField>
										<span class="input-group-btn">
											<button type="submit" class="btn btn-info btn-flat">Go!</button>
										</span>
									</div>
									<br>
								</div>		
							<!-- php: = $this->Form->end() -->
							
							<!-- php: if ($isCurrentVisit) { -->
							<!-- php: = $this->Form->create(null, ['url'=>['controller'=>'PatientVisits','action' =>'setVisitOutcome']]); -->
								<!-- php: = $this->Form->hidden('patient_visit_id', ['value' => $selectedVisit->id]) -->
							<!-- php: } -->
							
								<div class="form-group row">
									<label class="col-md-4 control-label">Visit Outcome</label>
									<div class="input-group date col-md-8">
										<!-- php: if($isCurrentVisit) { -->
											<SearchableSelectField class="form-control" name="visit_outcome_id" type="text" required>
												<option value="">--Select Outcome--</option>
												<!-- php: foreach($visitOutcomes as $visitOutcome){ echo "<option value='" . $visitOutcome->id . "' " . ($visitOutcome->id == $selectedVisit->visit_outcome_id ? "selected": "") . ">" . $visitOutcome->name . "</option>"; } -->
											</SearchableSelectField>
											<span class="input-group-btn">
												<button type="submit" class="btn btn-info btn-flat">Go!</button>
											</span>
										<!-- php: } else { -->
											<button disabled="disabled" class="btn btn-sm btn-outline m-b-10"><!-- php: = isset($selectedVisit->visit_outcome) ? $selectedVisit->visit_outcome->name : 'N/A' --></button>
										<!-- php: } -->
									</div>									
									<br>
								</div>
							
							<!-- php: if ($isCurrentVisit) { -->
								<!-- php: = $this->Form->end() -->
							<!-- php: } -->
							
							<!-- php: if($isCurrentVisit && isset($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1) { -->	
								<span>
									<button type="button" class="btn deepPink btn-outline m-b-10" style="margin-right: 5px" disabled>Admitted <!-- php: = isset($selectedVisit->patient_visit_admissions) && sizeof($selectedVisit->patient_visit_admissions) > 0 ? $selectedVisit->patient_visit_admissions[0]->admission_start->timeAgoInWords(['format' => 'MMM d, YYY', 'end' => '+1 year']) : '' --></button>
								</span>
								
							<!-- php: } -->

							<!-- php: if(!$hasCurrentVisit) { -->
								<span>
									<a type="button" href="javascript:" data-toggle="modal" data-target="#createVisitDialogue" class="btn btn-info visits_add_visit">Create New Visit</a>
								</span>
							
								<div class="modal fade" id="createVisitDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								  <div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
									  <div class="modal-header">
										<h4 class="modal-title" id="exampleModalLongTitle">Create a new Visit for Patient: <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										  <span aria-hidden="true">&times;</span>
										</button>
									  </div>
									  <div class="modal-body">

										<div class="row">
											<div class="col-md-12 col-sm-12">
												<div class="card card-box">
													<div class="card-head">
														<header>Visit Details</header>
													</div>
													<div class="card-body" id="bar-parent">
														<!-- php: = $this->Form->create(null, ['url'=>['controller'=>'PatientVisits','action' =>'add', $patient->id], 'class' => 'form-horizontal']) -->
															<div class="form-body">
																<div class="form-group row">
																	<label class="control-label col-md-5">Visit Purpose
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<SearchableSelectField class="form-control input-height" id="patient_visit_purpose_id" required >
																			<option value="">Select...</option>
																			<!-- php: foreach($patientVisitPurposes as $purpose) { echo '<option value="' . $purpose->id . '">' . $purpose->name . '</option>'; } -->
																		</SearchableSelectField>
																	</div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-5">Comment</label>
																	<div class="col-md-7">
																		<textarea class="form-control text-area" id="description" rows="5" ></textarea>
																	</div>
																</div>
															</div>

															<div class="form-actions">
																<div class="row">
																	<div class="offset-md-3 col-md-9">
																		<button type="submit" class="btn btn-info">Submit</button>
																		<button type="button" class="btn btn-default">Cancel</button>
																	</div>
																</div>
															</div>
														<!-- php: = $this->Form->end() -->
													</div>
												</div>
											</div>
										</div>
									  </div>
									</div>
								  </div>
								</div>

							<!-- php: } -->
						</div>
					</div>
				</div>
			</div>
			
	</div>
</div>

<div class="row">
	<!-- php: if(null !==($selectedVisit) && $selectedVisit != null) { -->
	<div class="col-md-12 col-sm-12">
		<div class="panel tab-border card-box">
			<header class="panel-heading panel-heading-<!-- php: = $isCurrentVisit ? 'red' : 'gray' --> custom-tab " style="padding-bottom: 0px">
				<ul class="nav nav-tabs" style="margin-bottom: 0px;" id="visitTab">
					<li class="nav-item top-caption vitals_view_vitals">
						<a class="" href="#tab_vitals" data-toggle="tab">
							Vitals
						</a>
					</li>
					
					<li class="nav-item top-caption symptoms_view_symptoms">
						<a href="#tab_symptoms" class="" data-toggle="tab">
							Symptoms
						</a>
					</li>
					
					<li class="nav-item top-caption requests_view_requests">
						<a href="#tab_requestservices" class="" data-toggle="tab">
							Request Services
						</a>
					</li>
					
					<li class="nav-item top-caption diagnoses_view_diagnoses">
						<a href="#tab_diagnoses" class="" data-toggle="tab">
							Diagnoses
						</a>
					</li>
					
					<li class="nav-item top-caption followups_view_follow_ups">
						<a href="#tab_followups" class="" data-toggle="tab">
							Follow Ups
						</a>
					</li>	
					
					<!-- php: if($selectedVisit->admitted == 1) { -->
						<li class="nav-item top-caption">
							<a href="#tab_doctors_note" class="" data-toggle="tab">
								Doctors Note
							</a>
						</li>
					
						<li class="nav-item top-caption">
							<a href="#tab_nurses_note" class="" data-toggle="tab">
								Nurses Note
							</a>
						</li>

						<li class="nav-item top-caption">
							<a href="#tab_admitted" class="" data-toggle="tab">
								Admitted
							</a>
						</li>
					<!-- php: } -->
					
					<li class="nav-item top-caption visits_visit_report">
						<a href="#tab_summary" class="" data-toggle="tab">
							Summary
						</a>
					</li>	
				</ul>
			</header>
			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane " id="tab_vitals">
						<!-- php: = $this->element('patientvisit/vitals') -->
					</div>
					
					<div class="tab-pane " id="tab_symptoms">
						<!-- php: = $this->element('patientvisit/symptom/symptoms') -->
					</div>
					
					<div class="tab-pane " id="tab_requestservices">
						<!-- php: = $this->element('patientvisit/requestservices') -->
					</div>
					
					<div class="tab-pane " id="tab_diagnoses">
						<!-- php: = $this->element('patientvisit/diagnosis') -->
					</div>
					
					<div class="tab-pane " id="tab_followups">
						<!-- php: = $this->element('patientvisit/followups') -->
					</div>
					
					<!-- php: if($selectedVisit->admitted == 1) { -->					
						<div class="tab-pane " id="tab_doctors_note">
							<!-- php: = $this->element('patientvisit/doctorsnote') -->
						</div>
									
						<div class="tab-pane " id="tab_nurses_note">
							<!-- php: = $this->element('patientvisit/nursesnote') -->
						</div>
					
						<div class="tab-pane " id="tab_admitted">
							<!-- php: = $this->element('patientvisit/admitted') -->
						</div>
					<!-- php: } -->
					
					<div class="tab-pane " id="tab_summary">
						<!-- php: = $this->element('patientvisit/summary') -->
					</div>
				</div>
			</div>
		</div>
		
	</div>
	
	<!-- php: } else { -->
		<div class="col-lg-12 col-md-12 col-sm-12 col-12">
			<div class="card card-box">
			  
				<div class="card-body no-padding height-9">
					<h3 align="center" style="margin-bottom: 100px; margin-top: 100px">Please select a previous visit from the patient visit list or create a new Visit</h3>
				</div>
			</div>
		</div>
	<!-- php: } -->
</div>

<script>

	//tags input

	$('.tags-input').each(function() {
		var tagsType = $(this).data('type')
		if (tagsType === 'tags') {
			$(this).tagsInput({
				width: 'auto'

			});
		}
		if (tagsType === 'fruits-tags') {
			$(this).tagsInput({
				width: 'auto'

				  // change color of specific string code
					,onChange: function(elem, elem_tags) {
					 var languages = ['apple', 'banana', 'guava'];
					 var highlightColor = $(this).data('highlight-color');
					 $('.tag', elem_tags).each(function() {
						 if ($(this).text().search(new RegExp('\\b(' + languages.join('|') + ')\\b')) >= 0) $(this).css('background-color', highlightColor);
					 });
				 }
			});
		}
		if (tagsType === 'fixedWidth-tags') {
			$(this).tagsInput({
				width: '350',
			});
		}
	});



	function updateWards(str) {
		if (str == "") {
			return;
		}

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

				// Sanitize all the json encodings make it a bare string : and ,
				var myresult = xhttp.responseText.replace(/"/gi,'');
				myresult = myresult.replace(/{/gi,'');
				myresult = myresult.replace(/}/gi,'');
				myresult = myresult.replace('[','');
				myresult = myresult.replace(']','');
				var mydata = myresult.split(',');

				var inneroptions = "<option>--Select--</option>";
				for (var region in mydata) {
					if (mydata.hasOwnProperty(region)) {
						var current = mydata[region].split(':');
						inneroptions = inneroptions + "<option value='" + current[0] + "'>" + current[1] + "</option>";
					}
				}

				document.getElementById("wardfield").innerHTML = inneroptions;
			}
		}

		xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateWards']) -->/"+str, true);
		xhttp.send();
	}

	function updateBeds(str) {
		if (str == "") {
			return;
		}

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

				// Sanitize all the json encodings make it a bare string : and ,
				var myresult = xhttp.responseText.replace(/"/gi,'');
				myresult = myresult.replace(/{/gi,'');
				myresult = myresult.replace(/}/gi,'');
				myresult = myresult.replace('[','');
				myresult = myresult.replace(']','');
				var mydata = myresult.split(',');

				var inneroptions = "<option>--Select--</option>";
				for (var region in mydata) {
					if (mydata.hasOwnProperty(region)) {
						var current = mydata[region].split(':');
						inneroptions = inneroptions + "<option value='" + current[0] + "'>" + current[1] + "</option>";
					}
				}

				document.getElementById("bedfield").innerHTML = inneroptions;
			}
		}

		xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateBeds']) -->/"+str, true);
		xhttp.send();
	}

</script>

<script type="text/javascript">
	$(document).ready(function() {
		// save tab in local storage
		$('#visitTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('visitLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var vitalsLastTab = localStorage.getItem('visitLastTab');
		if (vitalsLastTab) {
		   $('#visitTab a[href=' + vitalsLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#visitTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function LayoutLayoutVisitPatientProfile() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
