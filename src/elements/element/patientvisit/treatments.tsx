const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">TREATMENTS</span>
			</div>
			<ul class="nav nav-tabs" id="fluidTab">
				<li class="nav-item treatments_view_treatments">
					<a href="#borderBox_tab17" data-toggle="tab">Treatment Plan</a>
				</li>
				
				<!-- php: if($isCurrentVisit) { -->
					<li class="nav-item">
						<a href="#administerDrugTab" data-toggle="tab">Drug Administration</a>
					</li>
				<!-- php: } -->
				
				<li class="nav-item treatments_view_treatments">
					<a href="#fluid_chart" data-toggle="tab">Fluid Administration</a>
				</li>
			</ul>
		</div>


		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="administerDrugTab">
					<h4>Drug Administration</h4>
				
					<button class="btn btn-primary" onclick="javascript:$('#administerForm').toggle(500);">Add Drug</button>

					<div style="display: none" id='administerForm'>
						<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestMedications', 'action' => 'addAdministeredDrug', $selectedVisit->patient_id, $selectedVisit->id], 'id' => 'administerMedicationForm']); -->
						
							<div class="form-body">
								<div class="form-group row">
									<label class="control-label col-md-3">Drug Form/Generic Name, Dosage Form, Strength
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<!-- medication id is passed instead of drug id to get drug id in medication table -->
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select drug" name="request_medication_id" id="request_medication_id" data-live-search="true"  required>
										<!-- php: foreach($selectedVisit->request_medications as $requestPaidMedication) { if($requestPaidMedication->status_id != 23) { continue; } -->
													<option value="<!-- php: = $requestPaidMedication->id -->" data-content="<!-- php: = $requestPaidMedication->has('drug_stock') ? $requestPaidMedication->drug_stock->drug->full_name : '' -->" > </option>
												<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-3">Drug Administered
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" onChange="updateAdministerReason(this.value);" data-live-search="true" class="form-control input-height" name="drug_administered" id="drug_administered" required>
											<option value="">Select Yes or No</option>
											<option value="0">No</option>
											<option value="1">Yes</option>
										</SearchableSelectField>
									</div>
								</div>
								<div class="form-group row" id="notesDiv" style="display: none">
									<label class="control-label col-md-3">Notes (Indicate adverse effects or other)
									</label>
									<div class="col-md-5">
										<textarea name="notes" id="notes" placeholder="Indicate adverse effects or other" class="form-control text-area" rows="5" ></textarea>
									</div>
								</div>
								<div class="form-group row" id="reasonsDiv" style="display: none">
									<label class="control-label col-md-3">Reasons for Not Administering
									</label>
									<div class="col-md-5">
										<textarea name="reasons" id="reasons" placeholder="Enter Reasons for Not Administering" class="form-control text-area" rows="5" ></textarea>
									</div>
								</div>
								
								<div class="row">
									<div class="offset-md-3 col-md-5">
										<button type="submit" class="btn btn-info">Submit</button>
										<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
									</div>
								</div>
							</div>
						<!-- php: =$this->Form->end(); -->

					</div>

					<div class="table-scrollable">
						<table class="table table-hover order-column full-width" id="medications_table">
							<thead>
								<tr>
									<th class="left">Time Given</th>
									<th class="left">Drug</th>
									<th class="left">Type of Dose</th>
									<th class="left">Dosage Frequency</th>
									<th class="left">Route</th>
									<th class="left">Administered</th>
									<th class="left">Comments/Side effects</th>
								</tr>
							</thead>
							<tbody>
							<!-- php: foreach ($selectedVisit->patient_administered_drugs as $administerMedication): -->
								<tr class="odd gradeX">
									<td class="left"><!-- php: = $administerMedication->date_created->nice() --></td>
									<td class="left"><!-- php: = $administerMedication->request_medication->has('drug_stock') ? $administerMedication->request_medication->drug_stock->drug->full_name : '' --></td>
									<td class="left"><!-- php: = $administerMedication->request_medication->has('medication_type') ? $administerMedication->request_medication->medication_type->type_name : '' --></td>
									<td class="left"><!-- php: = $administerMedication->request_medication->frequency --></td>
									<td class="left"><!-- php: = $administerMedication->request_medication->has('dosage_form') ? $administerMedication->request_medication->dosage_form->name : '' --></td>
									<td class="left"><!-- php: = $administerMedication->drug_administered == 1 ? 'Yes' : 'No' --></td>
									<td class="left"><!-- php: = $administerMedication->drug_administered == 1 ? $administerMedication->notes : $administerMedication->reasons --></td>
								</tr>
							<!-- php: endforeach; -->									
							</tbody>
						</table>
					</div>
						
					<div style="margin-top: 40px;" id="patient_administered_drugs_button">
						<div style="float: right;"><a class="btn btn-sm btn-success" onclick="javascript:$('#patient_administered_drugs').toggle(500); moveToId('patient_administered_drugs_button');">View Previous Administered Drugs</a></div>
						<div style="clear: both;"></div>
					</div>

					<div id="patient_administered_drugs" style="display: none;">
						<!-- php: foreach($patientVisits as $pVisit) { $dateDiff = $pVisit->date_created->diffForHumans($selectedVisit->date_created); if(sizeof($pVisit->patient_administered_drugs) <= 0 || $pVisit->id == $selectedVisit->id || (!stristr($dateDiff, 'ago') && ... -->

							<br/><br/>
							<div class="col-sm-12"><h4>Details for visit: <!-- php: = $pVisit->date_created->nice() . ' (' . $dateDiff . ')' --></h4></div>

							<div class="table-scrollable">
								<table class="table table-hover order-column full-width" id="medications_table">
									<thead>
										<tr>
											<th class="left">Time Given</th>
											<th class="left">Drug</th>
											<th class="left">Type of Dose</th>
											<th class="left">Dosage Frequency</th>
											<th class="left">Route</th>
											<th class="left">Administered</th>
											<th class="left">Comments/Side effects</th>
										</tr>
									</thead>
									<tbody>
									<!-- php: foreach ($pVisit->patient_administered_drugs as $administerMedication): -->
										<tr class="odd gradeX">
											<td class="left"><!-- php: = $administerMedication->date_created->nice() --></td>
											<td class="left"><!-- php: = $administerMedication->request_medication->has('drug_stock') ? $administerMedication->request_medication->drug_stock->drug->full_name : '' --></td>
											<td class="left"><!-- php: = $administerMedication->request_medication->has('medication_type') ? $administerMedication->request_medication->medication_type->type_name : '' --></td>
											<td class="left"><!-- php: = $administerMedication->request_medication->frequency --></td>
											<td class="left"><!-- php: = $administerMedication->request_medication->has('dosage_form') ? $administerMedication->request_medication->dosage_form->name : '' --></td>
											<td class="left"><!-- php: = $administerMedication->drug_administered == 1 ? 'Yes' : 'No' --></td>
											<td class="left"><!-- php: = $administerMedication->drug_administered == 1 ? $administerMedication->notes : $administerMedication->reasons --></td>
										</tr>
									<!-- php: endforeach; -->									
									</tbody>
								</table>
							</div>
							
						<!-- php: } -->
					</div>
				</div>
				
				<div class="tab-pane treatments_view_treatments" id="borderBox_tab17">
					<div class="card-body ">
								
						<!-- php: if($isCurrentVisit) { -->
							<h4>Treatment Plan</h4>
							<button class="btn btn-primary" onclick="javascript:$('#addPlanForm').toggle(500);">Add</button>
							
							<div style="display: none" id='addPlanForm'>
								<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitTreatments', 'action' => 'addTreatment', $patient->id, $selectedVisit->id], 'id'=>'treatments']); -->
									<div class="form-body">
										<div class="form-group row">
											<label class="control-label col-md-3">Treatment Plan
												<span class="required"> * </span>
											</label>
											<div class="col-md-5">
													<textarea name="treatment_plan" id="treatment_plan" placeholder="Provide treatment options and goal of treatment. side effects and expected treatment length are recommended " class="form-control" rows="5" required ></textarea>
												</div>
										</div>
										
										<div class="row">
											<div class="offset-md-4 col-md-8">
												<button type="submit" class="btn btn-info">Submit</button>
												<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
											</div>
										</div>
									</div>
								<!-- php: = $this->Form->end(); -->	
							</div>
						<!-- php: } -->

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
						
						<div style="margin-top: 40px;" id="previous_treatment_plans_button">
							<div style="float: right;"><a class="btn btn-sm btn-success" onclick="javascript:$('#previous_treatment_plans').toggle(500); moveToId('previous_treatment_plans_button');">View Previous Treatment Plans</a></div>
							<div style="clear: both;"></div>
						</div>

						<div id="previous_treatment_plans" style="display: none;">
							<!-- php: foreach($patientVisits as $pVisit) { $dateDiff = $pVisit->date_created->diffForHumans($selectedVisit->date_created); if(sizeof($pVisit->patient_visit_treatments) <= 0 || $pVisit->id == $selectedVisit->id || (!stristr($dateDiff, 'ago') && !s... -->

								<br/><br/>
								<div class="col-sm-12"><h4>Details for visit: <!-- php: = $pVisit->date_created->nice() . ' (' . $dateDiff . ')' --></h4></div>
								
								<div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="treatment_table">
										<thead>
											<tr>
												<th class="center"> Date</th>
												<th class="center"> Treatment Plan </th>
											</tr>
										</thead>
										<tbody>
										<!-- php: foreach ($pVisit->patient_visit_treatments as $patientTreatment): -->
											<tr class="odd gradeX">
												<td class="center"><!-- php: =$patientTreatment->date_created --></td>
												<td class="center"><!-- php: =$patientTreatment->treatment_plan --></td>
											</tr>
										<!-- php: endforeach; -->									
										</tbody>
									</table>
								</div>
							<!-- php: } -->
						</div>
					</div>
				</div>
				
				<div class="tab-pane" id="fluid_chart">
				
					<h4>Fluid Administration</h4>

					<div class="table-scrollable">
						<table class="table table-hover order-column full-width" id="medications_table">
							<thead>
								<tr>
									<th scope="col">Date</th>
									<th scope="col">Time</th>
									<th scope="col">Fluid Input</th>
									<th scope="col">Amount(mls)</th>
									<th scope="col">Route</th>
									<th scope="col">Fluid Output</th>
									<th scope="col">Amount(mls)</th>
									<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
								</tr>
							</thead>
							<tbody>
								<!-- php: foreach ($selectedVisit->patient_visit_fluids as $pFluid): -->
								<tr>
									<td><!-- php: = $pFluid->date_recorded->format('Y-m-d') --></td>
									<td><!-- php: = $pFluid->time_recorded->format('H:i') --></td>
									<td><!-- php: = $pFluid->fluid_input --></td>
									<td><!-- php: = $pFluid->amount_input --></td>
									<td><!-- php: = $pFluid->route --></td>
									<td><!-- php: = $pFluid->fluid_output --></td>
									<td><!-- php: = $pFluid->amount_output --></td>
									<td class="actions">
										<a type="button" href="javascript:" data-toggle="modal" data-target="#editFluid_<!-- php: = $pFluid->id -->" 
											class="btn btn-primary btn-xs">
												Edit
										</a>
									</td>
									
									<div class="modal fade" id="editFluid_<!-- php: = $pFluid->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title">Edit Fluid for Patient</h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
													
															<!-- php: = $this->Form->create($pFluid, ['url' => ['controller' => 'PatientVisitFluids', 'action' => 'editFluid', $pFluid->id]]) -->
							
																<div class="form-group row">
																	<label class="control-label col-md-4">Fluid Input (Type)
																	
																	</label>
																	<div class="col-md-8">
																		<input type="text" value="<!-- php: = $pFluid->fluid_input -->" name="fluid_input" id="fluid_input" placeholder="Enter fluid input (type)" class="form-control input-height"  /> </div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-4">Input Amount (mls)
																	
																	</label>
																	<div class="col-md-8">
																		<input type="number" value="<!-- php: = $pFluid->amount_input -->" min="0" step="0.01" name="amount_input" id="amount_input" placeholder="Enter input amount (mls)" class="form-control input-height"  /> </div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-4">Route
																	
																	</label>
																	<div class="col-md-8">
																		<!-- input type="text" value="<!-- php: //= $pFluid->route -->" name="route" id="route" placeholder="Enter route" class="form-control input-height"  / --> 
																		<SearchableSelectField class="form-control input-height" name="route" id="route" >
																			<option value="">Select Route</option>
																				<!-- php: foreach($dosageForms as $key => $dosageForm) { -->
																					<option <!-- php: = $pFluid->route == $dosageForm ? 'selected' : '' --> value="<!-- php: = $dosageForm -->"><!-- php: = h($dosageForm) --></option>
																				<!-- php: } -->
																		</SearchableSelectField>
																	</div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-4">Fluid Output (Type)
																	
																	</label>
																	<div class="col-md-8">
																		<input type="text" value="<!-- php: = $pFluid->fluid_output -->" name="fluid_output" id="fluid_output" placeholder="Enter fluid output (type)" class="form-control input-height"  /> </div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-4">Output Amount (mls)
																	
																	</label>
																	<div class="col-md-8">
																		<input type="number" value="<!-- php: = $pFluid->amount_output -->" min="0" step="0.01" name="amount_output" id="amount_output" placeholder="Enter output amount (mls)" class="form-control input-height"  /> </div>
																</div>
																
																<div class="row">
																	<div class="offset-md-4 col-md-8">
																		<button type="submit" class="btn btn-info">Submit</button>
																	</div>
																</div>
															<!-- php: =$this->Form->end(); -->
															
														</div>
													</div>
												</div>
											</div>
										  </div>
										</div>
									  </div>
									</div>
										
		
		
								</tr>
								<!-- php: endforeach; -->
							</tbody>
						</table>
					</div>
					
					<div style="margin-top: 40px;" id="previous_fluids_button">
						<div style="float: right;"><a class="btn btn-sm btn-success" onclick="javascript:$('#previous_fluids_plans').toggle(500); moveToId('previous_fluids_button');">View Previous Fluid Administrations</a></div>
						<div style="clear: both;"></div>
					</div>

					<div id="previous_fluids" style="display: none;">
						<!-- php: foreach($patientVisits as $pVisit) { $dateDiff = $pVisit->date_created->diffForHumans($selectedVisit->date_created); if(sizeof($pVisit->patient_visit_fluids) <= 0 || $pVisit->id == $selectedVisit->id || (!stristr($dateDiff, 'ago') && !stris... -->

							<br/><br/>
							<div class="col-sm-12"><h4>Details for visit: <!-- php: = $pVisit->date_created->nice() . ' (' . $dateDiff . ')' --></h4></div>
									
							<div class="table-scrollable">
								<table class="table table-hover order-column full-width" id="patient_visit_fluids_table">
									<thead>
										<tr>
											<th scope="col">Date</th>
											<th scope="col">Time</th>
											<th scope="col">Fluid Input</th>
											<th scope="col">Amount(mls)</th>
											<th scope="col">Route</th>
											<th scope="col">Fluid Output</th>
											<th scope="col">Amount(mls)</th>
										</tr>
									</thead>
									<tbody>
										<!-- php: foreach ($pVisit->patient_visit_fluids as $pFluid): -->
										<tr>
											<td><!-- php: = $pFluid->date_recorded->format('Y-m-d') --></td>
											<td><!-- php: = $pFluid->time_recorded->format('H:i') --></td>
											<td><!-- php: = $pFluid->fluid_input --></td>
											<td><!-- php: = $pFluid->amount_input --></td>
											<td><!-- php: = $pFluid->route --></td>
											<td><!-- php: = $pFluid->fluid_output --></td>
											<td><!-- php: = $pFluid->amount_output --></td>
										</tr>
										<!-- php: endforeach; -->
									</tbody>
								</table>
							</div>					
							
						<!-- php: } -->
					</div>

					<br/>
					<hr/>
				<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFluids', 'action' => 'addFluid', $patient->id, $selectedVisit->id], 'id' => 'patientFluidForm']); -->
					<h3>Record Patient Fluid In / Out</h3>
					<div class="form-body">
												
						<div class="form-group row">
							<label class="control-label col-md-3">Date
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">								
								<div class="input-group date form_date " data-link-field="dtp_input4" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" size="16" placeholder="Enter date" data-required="1" name = "date_recorded" id = "date_recorded" type="text" required >
									<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
								<input type="hidden" id="dtp_input4" value="" />
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Time
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">								
								<div class="input-group date form_time " data-time="" data-link-field="dtp_input3" data-date-format="HH:ii" data-link-format="HH:ii">
									<input class="form-control input-height" size="16" placeholder="Enter time" data-required="1" name = "time_recorded" id = "time_recorded" type="text" required >
									<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
								<input type="hidden" id="dtp_input3" value="" />
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Fluid Input (Type)
							
							</label>
							<div class="col-md-5">
								<input type="text" name="fluid_input" id="fluid_input" placeholder="Enter fluid input (type)" class="form-control input-height"  /> </div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Input Amount (mls)
							
							</label>
							<div class="col-md-5">
								<input type="number" min="0" step="0.01" name="amount_input" id="amount_input" placeholder="Enter input amount (mls)" class="form-control input-height"  /> </div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Route
							
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="route" id="route" >
									<option value="">Select Route</option>
										<!-- php: foreach($dosageForms as $key => $dosageForm) { -->
											<option value="<!-- php: = $dosageForm -->"><!-- php: = h($dosageForm) --></option>
										<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Fluid Output (Type)
							
							</label>
							<div class="col-md-5">
								<input type="text" name="fluid_output" id="fluid_output" placeholder="Enter fluid output (type)" class="form-control input-height"  /> </div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Output Amount (mls)
							
							</label>
							<div class="col-md-5">
								<input type="number" min="0" step="0.01" name="amount_output" id="amount_output" placeholder="Enter output amount (mls)" class="form-control input-height"  /> </div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
							</div>
						</div>
					</div>
				<!-- php: =$this->Form->end(); -->
				</div>




			</div>
		</div>


	</div>
</div>
<script>
$(function () {
	$("#patientFluidForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>

<script type="text/javascript">
    // CKEDITOR.replace( 'treatment_plan',
    // {
    //     toolbar : 'Basic', /* this does the magic */
    //     uiColor : '#9AB8F3'
    // });
</script>		
					
<script type="text/javascript">
	$(document).ready(function() {
		// save tab in local storage
		$('#fluidTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('fluidLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var fluidLastTab = localStorage.getItem('fluidLastTab');
		if (fluidLastTab) {
		   $('#fluidTab a[href=' + fluidLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#fluidTab a[data-toggle="tab"]:first').tab('show');
		}
//
//		$('#treatment_plan').summernote({
//			placeholder: '',
//			tabsize: 2,
//			height: 350
//		});

		CKEDITOR.replace( 'treatment_plan',
		{
			toolbar : 'Basic',
			uiColor : '#9AB8F3'
		});
	})
</script>

<script>
	function updateDosage(str) {
			if (str == "") {
				return;
			}

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {	
					$('#dosage_frequency').val(xhttp.responseText.replace(/"(.+)"/g, '$1'));
				}
			}
			
			xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateDosage']) -->/"+str, true);
			xhttp.send();
		}
		function updateRoute(str) {
			if (str == "") {
				return;
			}

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {	
					$('#dosage_form_id').val(xhttp.responseText);
				}
			}
			
			xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateRoute']) -->/"+str, true);
			xhttp.send();
		}
</script>

<script>

	function updateDuration(str) {
		if (str == "") {
			return;
		}

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {	
				$('#treatment_duration').val(xhttp.responseText.replace(/"(.+)"/g, '$1'));
			}
		}

		xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateDuration']) -->/"+str, true);
		xhttp.send();
	}
	
	function updateAdministerReason(str) {

		if(str == "0") {
			$('#notesDiv').hide(500);
			$('#notesDiv').val('') ;
			$('#reasonsDiv').show(500);
		}
		else if(str == "1"){
			$('#notesDiv').show(500);
			$('#reasonsDiv').hide(500);
			$('#reasonsDiv').val('');
		}
		else {
			$('#notesDiv').hide(500);
			$('#notesDiv').val('');
			$('#reasonsDiv').hide(500);
			$('#reasonsDiv').val('');
		}
		   
	}
</script>
`;

export default function ElementElementPatientvisitTreatments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
