const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">DIAGNOSES / SUMMARY DETAILS</span>
			</div>
			<ul class="nav nav-tabs" id="patientDiagnosesTab">
				<!-- php: if($isCurrentVisit) { -->
					<li class="nav-item diagnoses_add_diagnosis">
						<a href="#borderBox_tab7" data-toggle="tab"> Add </a>
					</li>
				<!-- php: } -->
				<li class="nav-item diagnoses_view_diagnoses">
					<a href="#borderBox_tab8" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		
		<div class="borderBox-body">
			<div class="tab-content">
				<!-- php: if($isCurrentVisit) { -->
				<div class="tab-pane diagnoses_add_diagnosis " id="borderBox_tab7">
					<div class="row">
						<div class="col-md-6 col-sm-12">
							<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'addMini', $selectedVisit->patient_id, $selectedVisit->id], 'id'=>'diagnoses']); -->
								<div class="form-body" style="padding-top: 0px;">
									
									<legend><h4><u>Clinical Notes</u></h4></legend>
									
									<div class="form-group row">
										<label class="control-label col-md-3">Notes 
										
										</label>
										<div class="col-md-8">
											<textarea name="procedure_instructions" id="procedure_instructions" placeholder="Provide notes or clinical information for the user" class="form-control textarea" rows="5" ></textarea>
										</div>
									</div>
									<hr/>

									<legend><h4><u>Diagnoses</u></h4></legend>
									<div class="form-group row">
										<label class="control-label col-md-3">Diagnosis (Note)
											<span class="required"> * </span>
										</label>
										<div class="col-md-8">
											<input name="diagnosis_text" id="diagnosis_text" placeholder="Enter the diagnosis in your own words" class="form-control" required/>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-3">Primary Diagnoses
											<span class="required"> * </span>
										</label>
										<div class="col-md-8">
											<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="primary_diagnosis_ids[]" id="primary_diagnosis_id" title="Select primary diagnosis"  data-live-search="true" multiple required>
												
												<!-- php: foreach($standardDiagnoses as $code => $standardDiagnosis) { $idCode = explode(' ', $code); -->
														<option value="<!-- php: = $idCode[0] -->" data-content="<!-- php: = h($standardDiagnosis) -->   <span class='badge badge-danger'><!-- php: = h($idCode[1]) --></span>"><!-- php: = h($standardDiagnosis) --></option>
													<!-- php: } -->
											</SearchableSelectField>
										</div>
									</div>
														
									<div class="form-group row">
										<label class="control-label col-md-3">Differential Diagnoses
											
										</label>
										<div class="col-md-8">
											
											<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" title="Indicate other diagnoses that co-exist" name="secondary_diagnosis_ids[]" id="secondary_diagnosis_ids"  data-live-search="true" multiple>
												
												<!-- php: foreach($standardDiagnoses as $code => $standardDiagnosis) { $idCode = explode(' ', $code); -->
														<option title="<!-- php: = h($idCode[1]) -->" value="<!-- php: = h($idCode[0]) -->" data-content="<!-- php: = h($standardDiagnosis) -->   <span class='badge badge-danger'><!-- php: = h($idCode[1]) --></span>"><!-- php: = h($standardDiagnosis) --></option>
													<!-- php: } -->
											</SearchableSelectField>
										</div>
									</div>
									
									<div class="form-group row">
										<label class="control-label col-md-3">Clinical Summary
										
										</label>
										<div class="col-md-8">
											<textarea name="clinical_summary" id="clinical_summary" placeholder="Provide actionable information on patient diagnosis" class="form-control textarea" rows="5" ></textarea>
										</div>
									</div>
									
									<div class="form-group row">
										<label class="control-label col-md-3">
											Procedure
										</label>
										<div class="col-md-8">											
											<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" title="Indicate the procedure" name="procedure_ids[]" id="procedure_ids"  data-live-search="true"  multiple>
												
												<!-- php: foreach($procedures as $code => $procedure) { $idCode = explode(' ', $code); -->
														<option title="<!-- php: = h($idCode[1]) -->" value="<!-- php: = h($idCode[0]) -->" data-content="<!-- php: = h($procedure) -->   <span class='badge badge-danger'><!-- php: = h($idCode[1]) --></span>"><!-- php: = h($procedure) --></option>
													<!-- php: } -->
											</SearchableSelectField>
											
										</div>
									</div>
									
									<!-- div class="form-group row">
										<label class="control-label col-md-3">Procedure Instructions
										</label>
										<div class="col-md-8">
											<input name="procedure_instructions" id="procedure_instructions" placeholder="Provide instructions for procedure" class="form-control" />
										</div>
									</div -->
									<hr/>

									<legend><h4><u>Treatment</u></h4></legend>									
									<div style="" id='addPlanForm'>
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitTreatments', 'action' => 'addTreatment', $patient->id, $selectedVisit->id], 'id'=>'treatments']); -->
											<div class="form-body">
												<div class="form-group row">
													<label class="control-label col-md-3">Treatment Plan
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
															<textarea name="treatment_plan" id="treatment_plan" placeholder="Provide treatment options and goal of treatment. side effects and expected treatment length are recommended " class="form-control" rows="5" required ></textarea>
														</div>
												</div>
											</div>
										<!-- php: = $this->Form->end(); -->	
									</div>
									
									<div class="row">
										<div class="offset-md-3 col-md-8">
											<button type="submit" class="btn btn-info">Submit</button>
											<button type="button" class="btn btn-default" onclick = 'clearDiagnosis()'>Reset</button>
										</div>
									</div>
									
								</div>
							<!-- php: =$this->Form->end(); -->
						</div>
					
						<div class="col-md-6 col-sm-12">

							<!-- php: = $this->element('patientvisit/requestmedicationmini') -->

							<hr/>
							
							<div style="padding: 10px; border-radius: 7px; background: #efefef;">
								<legend><h4><u>Please Note</u></h4></legend>
								<div>
									Cant find a diagnoses. Click button below to add it create a new one
									<div style="padding-bottom: 10px">
										<a href="javascript:" type="button" class="btn btn-primary" data-toggle="modal" data-target="#newDiagnoseDialog" >Add New Diagnoses</a>
									</div>
									<br/>
									--- OR ---
									<br/>
									Search from available diagnoses
									<div style="padding-bottom: 10px">
										<a href="javascript:" type="button" class="btn btn-primary" data-toggle="modal" data-target="#existingDiagnoseDialog" >Search Diagnoses</a>
									</div>
								</div>
							</div>
						</div>
							     
						<div class="modal fade" id="newDiagnoseDialog" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title" id="exampleModalLongTitle">Add a New Diagnoses</h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
										</button>
									</div>
									
								<div class="modal-body">
								
								<div class="row">
									<div class="col-md-12 col-sm-12">
										<div class="card card-box">
											<div class="card-head">
												<header>New Diagnoses Form</header>
											</div>
											<div class="card-body" id="bar-parent">
												<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitDiagnoses', 'action' => 'addDiagnoses', 'activeTab' => 'diagnoses'], 'class' => 'form-horizontal']) -->
													<div class="form-body">
														<div class="form-group row">
															<label class="control-label col-md-5">Name
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="name" data-required="1" placeholder="Short name for diagnoses" class="form-control input-height" required /> 
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-5">Code
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="code" data-required="1" placeholder="ICD Code for diagnoses" class="form-control input-height" required /> 
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-5">Description
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="long_name" data-required="1" placeholder="Long for diagnoses" class="form-control input-height" required /> 
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
			
						<div class="modal fade" id="existingDiagnoseDialog" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title" id="searchDiagnosesDialogTitle">Search Existing Diagnoses Database</h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										
										<div class="row">
											<div class="col-md-12 col-sm-12">
												<div class="card card-box">
													<div class="card-body" id="bar-parent">
														<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitDiagnoses', 'action' => 'addDiagnosesFromLocalStore'], 'class' => 'form-horizontal']) -->
															<div class="form-body">
																<div class="form-group row">
																	<label class="control-label col-md-4">Name / ICD10
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-8">
																		<input type="text" id="search_diagnosis" name="name" data-required="1" placeholder="Enter Name or ICD10" class="form-control input-height" /> 
																	</div>
																</div>

																<div class="row">
																	<div class="offset-md-3 col-md-9">
																		<button type="button" class="btn btn-info" onclick="javascript:searchDiagnosis()">Search</button>
																	</div>
																</div>

																<hr/>
																
																<div class="row">
																	<div class="col-md-12">
																		<p id="result_label" style="text-align: center; color: #119">Search results</p>
																	</div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-4">Diagnoses / ICD10
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-8">
																		<SearchableSelectField id="found_diagnosis_list" name="found_diagnoses_ids[]" data-placeholder="Select Diagnoses List" class="form-control selectpicker" multiple required>
																			<option>Select Diagnoses<option>
																		</SearchableSelectField>
																	</div>
																</div>

																<hr/>

																<div class="row">
																	<div class="offset-md-3 col-md-9">
																		<button type="submit" class="btn btn-success">Add to Diagnoses List</button>
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
							
					</div>
				</div>
				<!-- php: } -->
				
				<div class="tab-pane diagnoses_view_diagnoses" id="borderBox_tab8">
					<div class="card-body ">
						
						<h4>Diagnoses</h4>
						<div class="table-scrollable">
							<table class="table table-hover order-column full-width" id="diagnosis_table">
								<thead>
									<tr>
										<th class="center"> Date</th>
										<th class="left"> Diagnosis(Note) </th>
										<th class="left"> Primary Diagnoses </th>
										<th class="left"> Differential Diagnoses </th>
										<th class="center"> Clinical Summary </th>
										<th class="left"> Procedure </th>
										<th class="center"> Actions </th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($selectedVisit->patient_visit_diagnoses as $visitDiagnosis): -->
									<tr class="odd gradeX">
										<td class="center" style="vertical-align: top"><!-- php: = $visitDiagnosis->date_created->nice() --></td>
										<td class="left" style="vertical-align: top"><!-- php: = $visitDiagnosis->diagnosis_text --></td>
										<td class="left" style="vertical-align: top">
											<!-- php: //= $visitDiagnosis->has('primary_diagnosis') ? $visitDiagnosis->primary_diagnosis->name : 'N/A' -->
											<!-- php: $countPD = 1; foreach($visitDiagnosis->patient_visit_primary_diagnoses as $primaryDiagnosis) { if($countPD > 1) { -->
														<br/> 
											<!-- php: } echo $countPD . '. ' . ($primaryDiagnosis->has('primary_diagnosis') ? $primaryDiagnosis->primary_diagnosis->name : 'N/A'); $countPD++; } -->
										</td>
										<td class="left" style="vertical-align: top">
											<!-- php: $countSD = 1; foreach($visitDiagnosis->patient_visit_secondary_diagnoses as $secondaryDiagnosis) { if($countSD > 1) { -->
														<br/> 
											<!-- php: } echo $countSD . '. ' . ($secondaryDiagnosis->has('secondary_diagnosis') ? $secondaryDiagnosis->secondary_diagnosis->name : 'N/A'); $countSD++; } -->
										</td>											
										<td class="center" style="vertical-align: top"><!-- php: = $visitDiagnosis->clinical_summary --></td>	
										<td class="left" style="vertical-align: top">
											<!-- php: $countPR = 1; foreach($visitDiagnosis->patient_visit_procedures as $procedure) { if($countPR > 1) { -->
														<br/>
											<!-- php: } echo $countPR . '. ' . ($procedure->has('procedure') ? $procedure->procedure->name : 'N/A'); $countPR++; } -->
										</td>
										
										<!-- php: if($isCurrentVisit) { -->
											<td class="center" style="vertical-align: top">
												<a href="<!-- php: =$this->Url->build(['controller'=>'PatientVisitDiagnoses','action'=>'editDiagnoses',$visitDiagnosis->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs diagnoses_edit_diagnosis">
													Edit
												</a>
											</td>
										<!-- php: } -->
									</tr>
								<!-- php: endforeach; -->									
								</tbody>
							</table>
						</div>						

						<hr/>
						<br/>

						<h4>Treatments</h4>
						<div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width" id="treatment_table">
								<thead>
									<tr>
										<th class="center"> Date</th>
										<th class="center"> Treatment Plan </th>
										<th class="center"> Actions </th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($selectedVisit->patient_visit_treatments as $patientTreatment): -->
									<tr class="odd gradeX">
										<td class="center"><!-- php: =$patientTreatment->date_created --></td>
										<td class="center"><!-- php: =$patientTreatment->treatment_plan --></td>
										<td class="center">
											<a href="<!-- php: =$this->Url->build(['controller'=>'PatientVisitTreatments', 'action'=>'editTreatment', $patientTreatment->id]) -->" class="btn btn-primary btn-xs treatments_edit_treatment">
												Edit
											</a>
										</td>
									</tr>
								<!-- php: endforeach; -->									
								</tbody>
							</table>
						</div>

						<hr/>
						<br/>
						<div class="table-scrollable">
							<table class="table table-hover order-column full-width" id="medications_table">
								<thead>
									<tr>
										<th scope="col">Date</th>
										<th scope="col">Drug</th>
										<th scope="col">Unit</th>
										<th scope="col">ROA</th>
										<th scope="col">Frequency</th>
										<th scope="col">Days</th>
										<th scope="col">Instructions</th>
										<th scope="col">Cost (GHS)</th>
										<th scope="col">Status</th>
										<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
									</tr>
								</thead>
								<!-- php: if($isCurrentVisit) { -->
									<tfoot>
										<tr>
											<td colspan="8" style="text-align: right;"></td>
											<td colspan="1" style="text-align: right;"><a class="btn btn-sm btn-primary" onclick="javascript:$('#medicationForm').toggle(500); moveToId('medicationForm');">Add <!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --></a></td>
											<td colspan="1" style="text-align: right;"><a class="btn btn-sm btn-success" onclick="javascript:$('#previous_medications').toggle(500); moveToId('previous_medications_button');">View Previous <!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --></a></td>
										</tr>
									</tfoot>
								<!-- php: } -->
							</table>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>

<script>
	$(function () {
		$("#diagnoses").submit(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});
	});


	function clearDiagnosis(){
		$('#primary_diagnosis').val('');
		$('#secondary_diagnosis').val('');
		$('#clinical_summary').val('');
		$('#diagnosis_text').val('');
		$('#procedure').val('');
	}
</script>

<script>
	$(document).ready(function() {
		// save tab in local storage
		$('#patientDiagnosesTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('patientDiagnosesLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var patientDiagnosesLastTab = localStorage.getItem('patientDiagnosesLastTab');
		if (patientDiagnosesLastTab) {
		   $('#patientDiagnosesTab a[href=' + patientDiagnosesLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#patientDiagnosesTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>

<script>
	function searchDiagnosis() {
		str = $('#search_diagnosis').val();
		
		if (str == "") {
			alert('Please enter Diagnosis name or ICD10')
			return;
		}
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				  
				// Sanitize all the json encodings make it a bare string : and ,
				// var myresult = xhttp.responseText.replace(/"/gi,'');
				// myresult = myresult.replace(/{/gi,'');
				// myresult = myresult.replace(/}/gi,'');
				// myresult = myresult.replace('[','');
				// myresult = myresult.replace(']','');
				// var myresult = myresult.split(',');
				
				var myresults = JSON.parse(xhttp.responseText);
				
				var inneroptions = "";
				var i = 0;
				for (i = 0; i < myresults[0].length; i++) {
					inneroptions = inneroptions + "<option value='" + myresults[0][i].id + "' data-content='" + myresults[0][i].name + " <span class=\"badge badge-danger\">" + myresults[0][i].code + "</span>'>" + myresults[0][i].name + "</option>";
				}
					
				document.getElementById("found_diagnosis_list").innerHTML = inneroptions;
				//alert("refreshing");
				$('#found_diagnosis_list').selectpicker('refresh');
				//$('.selectpicker').selectpicker('render');
				//alert("done refreshing");

				document.getElementById("result_label").innerHTML = i + " matches found";
			}
		}
		
		xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'PatientVisitDiagnoses', 'action' => 'getDiagnosesFromLocalStore']) -->/"+str, true);
		xhttp.send();
	}
</script>

<script type="text/javascript">
	$(document).ready(function() {
		$('#medications_table').DataTable( {
			"processing": true,
			"serverSide": true,
			// "searching": false,
			"ordering":  false,
			"paging":  false,
			"ajax": "<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
			/*
			"ajax": {
				"url": "<!-- php: //= $this->Url->build(['controller' => 'RequestMedications', 'action' => 'getMedications', $patient->id, $selectedVisit->id, ]) -->",
				"error": function (xhr, error, thrown) {
					console.log( 'Error loading medication table' );
				}
			}
			*/
		} );
	});
</script>
`;

export default function ElementElementPatientvisitWorkspaceMini() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
