const rawHtml = `
<style>

	.has-error .bootstrap-select .btn {
		border-color: #f00;
	}

	.has-success .bootstrap-select .btn {
		border-color: #0f0;
	}
</style>

<!-- php: $requestLabs = $selectedVisit->request_labs; $requestMedications = $selectedVisit->request_medications; $requestSurgeries = $selectedVisit->request_surgeries; $requestServices = $selectedVisit->request_services; -->

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">REQUESTS</span>
			</div>
			<ul class="nav nav-tabs" id="requestTab">
				<!-- php: if($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'addRequestLab']) && !in_array($selectedVisit->patient_visit_purpose_id, [6])) { -->
					<li class="nav-item request_lab">
						<a href="#borderBox_request_lab" data-toggle="tab">Lab</a>
					</li>
				<!-- php: } -->
				
				<!-- php: if($this->AuthUser->hasAccess(['controller' => 'RequestMedications', 'action' => 'addRequestMedication']) && !in_array($selectedVisit->patient_visit_purpose_id, [5])) { -->
					<li class="nav-item request_medication">
						<a href="#borderBox_request_medication" data-toggle="tab"><!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --></a>
					</li>
				<!-- php: } -->
				
				<!-- php: if($this->AuthUser->hasAccess(['controller' => 'RequestSurgeries', 'action' => 'addRequestSurgeries']) && !in_array($selectedVisit->patient_visit_purpose_id, [5, 6])) { -->
					<li class="nav-item request_surgery">
						<a href="#borderBox_request_surgery" data-toggle="tab">Surgery</a>
					</li>
				<!-- php: } -->
				
				<!-- php: if($this->AuthUser->hasAccess(['controller' => 'RequestServices', 'action' => 'addRequestServices']) && !in_array($selectedVisit->patient_visit_purpose_id, [5, 6])) { -->
					<li class="nav-item request_service">
						<a href="#borderBox_request_service" data-toggle="tab">Services</a>
					</li>
				<!-- php: } -->
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane request_lab_content" id="borderBox_request_lab">
					<h4> 
						Labs
						<span>
							<a target="_blank" href="<!-- php: = Cake\Routing\Router::url(['controller' => 'RequestLabs', 'action' => 'patientVisitReport', $selectedVisit->id, '_ext' => 'pdf']) -->" class="btn btn-xs btn-outline" escape=false>
								PDF Report														
							</a>
						</span>
					</h4>
					<div class="table-scrollable">
						<table class="table table-hover order-column full-width" id="labs_table">
							<thead>
								<tr>
									<th scope="col">Investigation</th>
									<th scope="col">Lab Test</th>
									<th scope="col">Date Created</th>
									<th scope="col">Status</th>
									<th scope="col">Files</th>
									<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
								</tr>
							</thead>
							<tbody>
								<!-- php: foreach ($requestLabs as $requestLabItem): -->
								<tr>
									<td><!-- php: = $requestLabItem->has('investigation') ? $requestLabItem->investigation->name : '' --></td>
									<td><!-- php: = $requestLabItem->has('lab_test') ? $requestLabItem->lab_test->name : '' --></td>
									<td><!-- php: = h($requestLabItem->date_created) --></td>
									<td><!-- php: = $requestLabItem->has('status') ? $requestLabItem->status->name : '' --></td>
									<td>
										<!-- php: if (sizeof($requestLabItem->lab_images) > 0 ) { -->
												<a type="button" href="javascript:" data-toggle="modal" data-target="#labImage_<!-- php: = $requestLabItem->id -->" 
													class="btn btn-primary btn-xs">
														View Files (<!-- php: = sizeof($requestLabItem->lab_images) + sizeof($requestLabItem->lab_files) -->)
												</a>
										<!-- php: } else { echo 'No Image'; } -->
									</td>
									<td class="actions">																
										<!-- php: if($isCurrentVisit && !in_array($requestLabItem->status_id, [23, 24])) { -->
											<!-- php: = $this->Form->postLink(__('Cancel'), ['controller' => 'RequestLabs', 'action' => 'cancelRequestLab', $requestLabItem->id], ['confirm' => __('Are you sure you want to delete # {0}?', $requestLabItem->id)]) -->
										<!-- php: } -->
									</td>
									
									<div class="modal fade" id="labImage_<!-- php: = $requestLabItem->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
										<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px">
										<div class="modal-content">
											<div class="modal-header">
											<h4 class="modal-title" id="exampleModalLongTitle">Files for Lab: <!-- php: = $requestLabItem->id --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
											</div>
											<div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
													
															<div class="form-body">
																<div class="form-group row">
																	<div class="col-md-12">
																		<h4>Images: (<!-- php: = sizeof($requestLabItem->lab_images) -->)</h4>
																		<!-- php: foreach($requestLabItem->lab_images as $image) { echo '<div class="section-image img-responsive" style="width: 350px">'; echo '<a target="_blank" href="' . $this->Url->build('/img/' . $image->file_path, true) . '">'; echo $this->Html->image... -->
																	</div>
																	<div class="col-md-12">
																		<h4>Files: (<!-- php: = sizeof($requestLabItem->lab_files) -->)</h4>
																		<!-- php: foreach($requestLabItem->lab_files as $file) { echo '<div class="section-image img-responsive" style="width: 150px; text-align: center;">'; echo '<h5>' . $file->name . '</h5>'; echo '<a target="_blank" href="' . $this->Url->build('/img/' . ... -->
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
									</div>
										
		
		
								</tr>
								<!-- php: endforeach; -->
							</tbody>
						</table>
					</div>
					
					<br/>
					<hr/>
					
					<!-- php: if($isCurrentVisit) { -->
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestLabs', 'action' => 'addRequestLab', $patient->id, $selectedVisit->id], 'id' => 'labForm']); -->
					<h3>Make a new Lab Request</h3>
					<!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
					<div class="form-body">
						<!-- div class="form-group row">
							<label class="control-label col-md-3">Investigation Type
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="investigation_id" id="investigation_id" onChange="updateLabTest(this.value);" multiple required>
									<option value="">Select Investigation Type</option>
									<!-- php: /* foreach($investigations as $key => $investigation) { -->
											<option value="<!-- php: = $key -->"><!-- php: = $investigation --></option>
										<!-- php: } */ -->
								</SearchableSelectField>
							</div>
						</div -->
						<div class="form-group row">
							<label class="control-label col-md-3">Lab Test
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="lab_tests[]" id="lab_test_id" title="Select lab test" data-live-search="true" required multiple >
									<option value="">Select...</option>
									<!-- php: foreach($labTests as $labTest) { $outsourcePriceString = ''; foreach($providers as $provider) { if($provider->provider_type_id == 4) { $outsourcePriceString.= isset($labTest->prices[$provider->id]) && $labTest->prices[$provider->id] > 0 ? '... -->
											<option value="<!-- php: = $labTest->id -->" data-content="<!-- php: = $labTest->name --> <!-- php: = isset($labTest->prices[$billTo]) && $labTest->prices[$billTo] > 0 ? '<span class=\'badge badge-danger\'>' . $labTest->prices[$billTo] . '</span>' : '' --> <!-- php: = $outsourcePriceString -->"><!-- php: = $labTest->name --></option>
										<!-- php: } -->
								</SearchableSelectField>
							</div>
								
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Priority
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="priority_id" id="priority_id" required >
									<option value="">Select Priority</option>
										<!-- php: foreach($priorities as $key => $priority) { -->
											<option value="<!-- php: = $key -->"><!-- php: = $priority --></option>
										<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Charge Bill To
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required >
									<option value="">Select Bill To</option>
									<option <!-- php: = $billTo == -1 ? 'selected' : '' --> value="-1">Patient</option>
									<!-- php: foreach($providers as $provider) { -->
											<option <!-- php: = $billTo == $provider->id ? 'selected' : '' --> value="<!-- php: = $provider->id -->" data-content="<!-- php: = $provider->name -->  <span class='badge badge-<!-- php: = $provider->provider_type_id == 4 ? 'primary' : 'danger' -->'><!-- php: = $provider->has('provider_type') ? $provider->provider_type->name : '' --></span>"></option>
										<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearLabs()'>Reset</button>
							</div>
						</div>
					</div>
					<!-- php: = $this->Form->end() -->
					<!-- php: } -->
				</div>

				<div class="tab-pane request_medication_content" id="borderBox_request_medication">
					<h4><!-- php: = Cake\Core\Configure::read('LABELS.Medications', 'Medications') --></h4>
					<div class="table-scrollable">
						<table class="table table-hover order-column full-width" id="medications_table">
							<thead>
								<tr>
									<th scope="col">Date</th>
									<th scope="col">Drug</th>
									<th scope="col">ROA</th>
									<th scope="col">Frequency</th>
									<th scope="col">Days</th>
									<th scope="col">Instructions</th>
									<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
								</tr>
							</thead>
							<!-- php: if($isCurrentVisit) { -->
								<tfoot>
									<tr>
										<td colspan="7" style="text-align: right;"><a class="btn btn-sm btn-primary" onclick="javascript:$('#medicationForm').toggle(500); moveToId('medicationForm');">Add <!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --></a></td>
									</tr>
								</tfoot>
							<!-- php: } -->
						</table>
						
						<!-- php: // if($isCurrentVisit) { -->
							<!-- php: // = $this->Form->create(null, ['url' => ['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id], 'id' => 'medicationForm', 'style' => 'display: none;']); -->
								<!-- table class="table" style="table-layout: fixed; width: 100%;">
									<tfoot style="background: #fcfcfc">
										<tr>
											<td style="border-top: 3px solid #ececec; height: 0px; width: 1%">
											</td>
											<td style="border-top: 3px solid #ececec; height: 0px; width: 30%">
											</td>
											<td style="border-top: 3px solid #ececec; height: 0px; width: 15%">
											</td>
											<td style="border-top: 3px solid #ececec; height: 0px; width: 15%">
											</td>
											<td style="border-top: 3px solid #ececec; height: 0px; width: 15%">
											</td>
											<td style="border-top: 3px solid #ececec; height: 0px; width: 15%">
											</td>
											<td style="border-top: 3px solid #ececec; height: 0px; width: 9%">
											</td>
										</tr>
										<tr>
											<td></td>
											<td width="25%" class="form-column">
												<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Drug / Strength" data-required="1" name="drug_stock_id" id="drug_stock_id" data-live-search="true"  required>
													<!-- php: // foreach($drugStocks as $drugStock) // { -->
															<option value="<!-- php: // = $drugStock->id -->" data-content="<!-- php: // = h($drugStock->drug->full_name) -->   <span class='badge badge-primary '>Batch: <!-- php: // = $drugStock->batch_number --></span> <span class='badge badge-danger '>Expiry: <!-- php: // = $drugStock->expiry_date->format('Y-m-d') --></span>"><!-- php: // = h($drugStock->drug->full_name) --></option>
														<!-- php: // } -->
												</SearchableSelectField>
											</td>
											<td class="form-column">
												<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" title="ROA" data-size="5" data-required="1" data-live-search="true" class="form-control input-height" name="dosage_form_id" id="dosage_form_id" required>
														<!-- php: // foreach($dosageForms as $key => $dosageForm) // { -->
															<option value="<!-- php: // = $key -->"><!-- php: // = h($dosageForm) --></option>
														<!-- php: // } -->
												</SearchableSelectField>
											</td>
											<td class="form-column">
												<input type="text" name="frequency" id="frequency" data-required="1" placeholder="Frequency" class="form-control input-height" style="height: 35px !important; margin-top: -10px;" />
											</td>
											<td class="form-column">
												<input type="number" min="1" step="1" name="number_of_days" id="number_of_days" data-required="1" placeholder="Days" class="form-control input-height" style="height: 35px !important; margin-top: -10px;" />
											</td>
											<td rowspan="2" class="form-column">
												<textarea name="instructions" id="instructions" data-required="0" placeholder="Instructions" class="form-control text-area" style="height: 110px !important; margin-top: -10px;"></textarea>
											</td>
											<td class="form-column">
												<input type="number" min="1" step="1" name="quantity" id="quantity" data-required="1" placeholder="Qty" class="form-control input-height" style="height: 35px !important; margin-top: -10px;" />
											</td>
										</tr>
										<tr>
											<td></td>
											<td class="form-column"><input type="text" name="allergy" id="allergy" placeholder="Allergy" class="form-control input-height" style="height: 35px !important; margin-top: -10px;" /></td>
											<td class="form-column">
												<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" title="Repeat" data-required="1" data-size="5" class="form-control input-height" name="repeat_prescription" id="repeat_prescription" required>
													<option value="0">No</option>
													<option value="1">Yes</option>
												</SearchableSelectField>
											</td>
											<td class="form-column">
												<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd" style="height: 35px !important; margin-top: -10px;">
													<input class="form-control" placeholder="Refill Date" name = "refill_date" id = "refill_date" type="text" value="" >
													<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
												</div>
												<input type="hidden" id="dtp_input2" value="" />
											</td>
											<td class="form-column">
												<!-- php: // default to patient if no provider is found // $billTo = $selectedVisit->has('patient_provider') ? $selectedVisit->patient_provider->provider_id : -1; -->
												<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" title="Bill To" data-required="1" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required >
													<option <!-- php: // = $billTo == -1 ? 'selected' : '' --> value="-1">Bill To: Patient</option>
													<!-- php: // foreach($providers as $provider) // { -->
															<option <!-- php: // = $billTo == $provider->id ? 'selected' : '' --> value="<!-- php: // = $provider->id -->" data-content="Bill To: <!-- php: // = $provider->name -->  <span class='badge badge-danger'><!-- php: // = $provider->has('provider_type') ? $provider->provider_type->name : '' --></span>"></option>
														<!-- php: // } -->
												</SearchableSelectField>
											</td>
											<td>
												<button type="submit" class="btn btn-success form-control" id="submitMedication" style="height: 35px !important; margin-top: -10px;">Add</button>
											</td>
										</tr>
									</tfoot>														
								</table -->
							<!-- php: // = $this->Form->end(); -->
						<!-- php: // } -->
					</div>

					<br/>
					<hr/>

					<div class="modal fade" id="viewMedicationDialog" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px">
							<div class="modal-content">
								<div class="modal-header">
									<h4 class="modal-title" id="viewMedicationTitle"><!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --> Details</h4>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
								
								
								</div>
								
								</div>
							</div>
						</div>
					</div>
										


					<!-- php: if($isCurrentVisit) { -->
					<!-- php: = $this->Form->create(null, ['id' => 'medicationForm', 'url' => ['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id], 'id' => 'medicationForm', 'style' => 'display:none;']); -->
					<h3>Add <!-- php: = Cake\Core\Configure::read('LABELS.Medication', 'Medication') --></h3>
					<div class="form-body">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Internal Pharmacy
										<span class="required"> * </span>
									</label>
									<div class="col-md-2">
										<label class="switchToggle">
											<input type="checkbox" checked="checked" name="in_house_medication_status" onclick="updateMedicationType(this.checked);" >
											<span class="slider green round"></span>
										</label>
									</div>
								</div>
								<div class="form-group row" id="stock_drugs">
									<label class="control-label col-md-4">Internal Drugs
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#drug_stock_id');" data-size="10" title="Drug / Form / Dosage" name="drug_stock_id" id="drug_stock_id" data-live-search="true" required >
											<!-- option value="">Select...</option -->
											<!-- php: foreach($drugStocks as $drugStock) { -->
													<option value="<!-- php: = $drugStock->id -->" data-content="<!-- php: = h($drugStock->drug->full_name) -->   <span class='badge badge-primary '>Batch: <!-- php: = $drugStock->batch_number --></span> <span class='badge badge-danger '>Expiry: <!-- php: = $drugStock->expiry_date->format('Y-m-d') --></span>"><!-- php: = h($drugStock->drug->full_name) --></option>
												<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
								<div class="form-group row" id="all_drugs" style="display: none">
									<label class="control-label col-md-4">All Drugs
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#drug_id');" data-size="10" title="Drug / Form / Dosage" name="drug_id" id="drug_id" data-live-search="true">
											<!-- option value="">Select...</option -->
											<!-- php: foreach($availableDrugs as $drug) { -->
													<option value="<!-- php: = $drug->id -->" data-content="<!-- php: = h($drug->full_name) -->"><!-- php: = h($drug->full_name) --></option>
												<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Dosage Frequency
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<input type="text" name="frequency" id="frequency" data-required="1" placeholder="" class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Number of Days
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<input type="number" min="1" step="1" name="number_of_days" id="number_of_days" data-required="1" placeholder="" class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Quantity
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<input type="number" min="1" step="1" name="quantity" id="quantity" data-required="1" placeholder="" class="form-control input-height" /> </div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Medication Type
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="medication_type_id" id="medication_type_id" >
											<option value="">Select...</option>
											<!-- php: foreach($medicationTypes as $key => $medicationType) { -->
													<option value="<!-- php: = $key -->"><!-- php: = h($medicationType) --></option>
												<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Route Of Administration
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#dosage_form_id');" data-size="5" data-required="1" data-live-search="true" class="form-control input-height" name="dosage_form_id" id="dosage_form_id" required>
											<option value="">Select Administration Route</option>
												<!-- php: foreach($dosageForms as $key => $dosageForm) { -->
													<option value="<!-- php: = $key -->"><!-- php: = h($dosageForm) --></option>
												<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
							</div>

							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Allergy
										
									</label>
									<div class="col-md-7">
										<textarea name="allergy" id="allergy" data-required="0" placeholder="Allergy" class="form-control text-area" style="height: 80px;"></textarea>
									</div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Repeat Prescription
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height" onchange="javascript:updateRefillDate(value);" name="repeat_prescription" id="repeat_prescription" required>
											<option value="">Select...</option>
											<option value="0">No</option>
											<option value="1">Yes</option>
										</SearchableSelectField>
									</div>
								</div>
								<div class="form-group row" id="refill_date_row" style="display: none;" >
									<label class="control-label col-md-4">Refill Date
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
											<input class="form-control input-height" onchange="$('#medicationForm').validate().element('#refill_date');" placeholder="Refill Date" name = "refill_date" id = "refill_date" type="text" value="" >
											<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
										</div>
										<input type="hidden" id="dtp_input2" value="" />
									</div>
								</div>						
								<div class="form-group row">
									<label class="control-label col-md-4">Instructions
									</label>
									<div class="col-md-7">
										<textarea name="instructions" id="instructions" data-required="0" placeholder="Instructions" class="form-control text-area" style="height: 80px;"></textarea>
									</div>
								</div>
								<div class="form-group row">
									<label class="control-label col-md-4">Charge Bill To
										<span class="required"> * </span>
									</label>
									<div class="col-md-7">
										<!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#medicationForm').validate().element('#bill_to_id');" data-required="1" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required >
											<option value="">Select Bill To</option>
											<option <!-- php: = $billTo == -1 ? 'selected' : '' --> value="-1">Patient</option>
											<!-- php: foreach($providers as $provider) { -->
													<option <!-- php: = $billTo == $provider->id ? 'selected' : '' --> value="<!-- php: = $provider->id -->" data-content="<!-- php: = $provider->insurance_profile->name --><span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile_type->name : '' --></span>"></option>
												<!-- php: } -->
										</SearchableSelectField>
									</div>
								</div>
							</div>
						</div>
						
						<input type="hidden" id="hidden" name="request_type" value="new_request_medication">
						<div class="row">
							<div class="offset-md-4 col-md-7">
								<button id="submitMedication" class="btn btn-info">Submit</button>
								<button type="button" id="resetMedication" class="btn btn-default" onclick = 'clearMedications()'>Reset</button>
							</div>
						</div>
					</div>
					<!-- php: =$this->Form->end(); -->
					<!-- php: } -->
				</div>
				
				
				<div class="tab-pane request_surgery_content" id="borderBox_request_surgery">
					<h4>Surgeries</h4>
					<div class="table-scrollable">
						<table class="table table-hover order-column full-width" id="surgeries_table">
							<thead>
								<tr>
									<th> Date</th>
									<th> Surgery</th>
									<th> Surgery Type </th>
									<th> Surgeon </th>
									<th> Start Date </th>
									<th> End Date </th>
									<th> Comment </th>
									<th> Status </th>
									<th> Images </th>
									<th> Actions </th>
								</tr>
							</thead>
							<tbody>
							<!-- php: foreach ($requestSurgeries as $patientSurgery): -->
								<tr class="odd gradeX">
									<td><!-- php: = $patientSurgery->date_created --></td>
									<td><!-- php: = $patientSurgery->has('surgery_stock')? $patientSurgery->surgery_stock->procedure_name : '' --></td>
									<td><!-- php: = $patientSurgery->has('surgery_type') ? $patientSurgery->surgery_type->name : '' --></td>
									<td><!-- php: = $patientSurgery->has('surgeon') ? $patientSurgery->surgeon->full_name : '' --></td>
									<td><!-- php: = $patientSurgery->start_time --></td>
									<td><!-- php: = $patientSurgery->end_time --></td>
									<td><!-- php: = $patientSurgery->comments --></td>
									<td><!-- php: = $patientSurgery->has('status') ? $patientSurgery->status->name : 'N/A' --></td>
									<td>
										<!-- php: if (sizeof($patientSurgery->surgery_images) > 0 ) { -->
												<a type="button" href="javascript:" data-toggle="modal" data-target="#surgeryImage_<!-- php: = $patientSurgery->id -->" 
													class="btn btn-primary btn-xs">
														View Images (<!-- php: = sizeof($patientSurgery->surgery_images) -->)
												</a>
										<!-- php: } else { echo 'No Image'; } -->
									</td>
									<td>
										<!-- php: if($patientSurgery->status_id == 23) { -->
											<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'RequestSurgeries', 'action' => 'patientReport', $patientSurgery->id, '_ext' => 'pdf']) -->" class="btn btn-xs btn-outline" escape=false>
												PDF														
											</a>
										<!-- php: } -->
										<!-- php: if($isCurrentVisit) { -->
											<a href="<!-- php: =$this->Url->build(['controller'=>'RequestSurgeries','action'=>'editRequestSurgery',$patientSurgery->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs surgeries_edit_surgery">
												Edit
											</a>
										<!-- php: } -->
									</td>
								</tr>
								
									<div class="modal fade" id="surgeryImage_<!-- php: = $patientSurgery->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
										<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px">
										<div class="modal-content">
											<div class="modal-header">
											<h4 class="modal-title" id="surgeryModalLongTitle">Images for Surgery: <!-- php: = $patientSurgery->id --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
											</div>
											<div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
													
															<div class="form-body">
																<div class="form-group row">
																	<div class="col-md-12">
																		<!-- php: foreach($patientSurgery->surgery_images as $image) { echo '<div class="section-image img-responsive" style="width: 350px">'; echo '<a target="_blank" href="' . $this->Url->build('/img/' . $image->file_path, true) . '">'; echo $this->Html->i... -->
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
									</div>
									
							<!-- php: endforeach; -->									
							</tbody>
						</table>
					</div>
					
					<br/>
					<hr/>
					
					<!-- php: if($isCurrentVisit) { -->
					<!-- php: = $this->Form->create(null,['url' => ['controller' => 'RequestSurgeries', 'action' => 'addRequestSurgery', $patient->id, $selectedVisit->id] ,'id'=>'surgeries']); -->
					<h3>Make a new Surgery Request</h3>
					<div class="form-body">
						<div class="form-group row">
								<label class="control-label col-md-3">Surgery
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Surgery" name="surgery_stock_id" id="surgery_stock_id" data-live-search="true"  required>
										<!-- option value="">Select...</option -->
											<!-- php: foreach($surgeryStocks as $selectOption) { -->
													<option value="<!-- php: = $selectOption->id -->" data-content="<!-- php: = $selectOption->procedure_name -->  <span class='badge badge-danger'><!-- php: = $selectOption->unit_value_new --></span>" ?></option>
											<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div> 
							<div class="form-group row">
								<label class="control-label col-md-3">Start time
									<span class="required"> * </span>
								</label>
								<div class="col-md-3">
									<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
										<input class="form-control input-height" size="16" placeholder="Start Date" name = "start_date_value" id = "start_date_value" type="text" value="" required >
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
									</div>
									<input type="hidden" id="dtp_input2" value="" />
									
								</div>
								<div class="col-md-2">
									<span><input class="form-control input-height" type="time" name="start_time_value" id="start_time_value" required /></span>
								</div>
							</div>
							
							<div class="form-group row">
								<label class="control-label col-md-3">End time
									<span class="required"> * </span>
								</label>
								<div class="col-md-3">
									<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
										<input class="form-control input-height" size="16" placeholder="End Date" name = "end_date_value" id = "end_date_value" type="text" value="" required >
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
									</div>
									<input type="hidden" id="dtp_input2" value="" />
									
								</div>
								<div class="col-md-2">
									<span><input class="form-control input-height" type="time" name="end_time_value" id="end_time_value" required /></span>
								</div>
							</div>
							
							<div class="form-group row">
								<label class="control-label col-md-3">Surgery type
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="surgery_type_id" id="surgery_type_id" required>
										<option value="">Select Surgery Type</option>
											<!-- php: foreach($surgerytypes as $surgerytype) { -->
												<option value="<!-- php: = $surgerytype->id -->"><!-- php: = $surgerytype->name --></option>
											<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
						
							<div class="form-group row">
								<label class="control-label col-md-3">Surgeon
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="surgeon_id" id="surgeon_id" required>
										<option value="">Select Surgeon</option>
											<!-- php: foreach($users as $surgeon) { -->
												<option value="<!-- php: = $surgeon->id -->"><!-- php: = $surgeon->full_name --></option>
											<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
							
							<div class="form-group row">
								<label class="control-label col-md-3">Anaesthesia
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="anaesthesia_id" id="anaesthesia_id" required>
										<option value="">Select Anaesthesia</option>
											<!-- php: foreach($anaesthesia as $anaesthesia) { -->
												<option value="<!-- php: = $anaesthesia->id -->"><!-- php: = $anaesthesia->name --></option>
											<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
							
							<div class="form-group row">
								<label class="control-label col-md-3">Surgery notes
									
								</label>
								<div class="col-md-5">
									<textarea name="surgery_notes" id="surgery_notes" placeholder="Notes for the surgery" class="form-control textarea" rows="5" ></textarea>
								</div>
							</div>

							<div class="form-group row">
								<label class="control-label col-md-3">Charge Bill To
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required >
										<option value="">Select Bill To</option>
										<option <!-- php: = $billTo == -1 ? 'selected' : '' --> value="-1">Patient</option>
										<!-- php: foreach($providers as $provider) { -->
												<option <!-- php: = $billTo == $provider->id ? 'selected' : '' --> value="<!-- php: = $provider->id -->" data-content="<!-- php: = $provider->insurance_profile->name --><span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile_type->name : '' --></span>"></option>
											<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
						
							<div class="row">
								<div class="offset-md-4 col-md-8">
									<button type="submit" class="btn btn-info">Submit</button>
									<button type="button" class="btn btn-default" onclick = 'clearSurgery()'>Reset</button>
								</div>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					<!-- php: } -->
				</div>
			
				
				<div class="tab-pane request_service_content" id="borderBox_request_service">
					<h4>Services</h4>
					
					<div class="table-scrollable">
						<table class="table table-hover order-column full-width">
							<thead>
								<tr>
									<th> Date</th>
									<th> Service</th>
									<th> Comment </th>
									<th> Status </th>
									<th> Actions </th>
								</tr>
							</thead>
							<tbody>
								<!-- php: foreach ($requestServices as $service): -->
									<tr class="odd gradeX">
										<td><!-- php: = $service->date_created --></td>
										<td><!-- php: = $service->has('service_stock')? $service->service_stock->procedure_name : '' --></td>
										<td><!-- php: = $service->comment --></td>
										<td><!-- php: = $service->has('status') ? $service->status->name : 'N/A' --></td>
			
										<td>
											
											<!-- php: if(!in_array($service->status_id, [23, 24])) { -->
												<a href="<!-- php: =$this->Url->build(['controller'=>'RequestServices','action'=>'cancelRequestService',$service->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Cancel') --> btn-xs">
													Cancel
												</a>
											<!-- php: } -->
											
											<!-- php: if($service->status_id == 20) { -->
												<a href="<!-- php: =$this->Url->build(['controller'=>'RequestServices', 'action'=>'processService', $service->id, 'Done']) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Complete') --> btn-xs">
													Complete
												</a>
											<!-- php: } -->
										</td>
									</tr>
								<!-- php: endforeach; -->									
							</tbody>
						</table>
					</div>
					
					<br/>
					<hr/>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestServices', 'action' => 'addRequestService', $patient->id, $selectedVisit->id] , 'id'=>'serviceForm']); -->
						<h3>Make a new Service Request</h3>
					
						<div class="form-body">

							<div class="form-group row">
								<label class="control-label col-md-3">Service
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Service" name="service_stock_id" id="service_stock_id" data-live-search="true"  required>
										<!-- option value="">Select...</option -->
										<!-- php: foreach($serviceStocks as $item) { -->
												<option value="<!-- php: = $item->id -->" data-content="<!-- php: = $item->procedure_name -->  <span class='badge badge-danger'><!-- php: = $item->facility_price --></span>" ?></option>
										<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div> 

							<div class="form-group row">
								<label class="control-label col-md-3">Quantity
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<input type="number" min="1" step="1" name="quantity" id="quantity" value="1" data-required="1" placeholder="" class="form-control input-height" />
								</div>
							</div> 
							
							<div class="form-group row">
								<label class="control-label col-md-3">Status
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Status" name="status_id" id="status_id" data-live-search="true"  required>
										<option selected value="20" data-content="Pending" ?></option>
										<option value="23" data-content="Completed" ?></option>
									</SearchableSelectField>
								</div>
							</div>

							<div class="form-group row">
								<label class="control-label col-md-3">Charge Bill To
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required >
										<option value="">Select Bill To</option>
										<option <!-- php: = $billTo == -1 ? 'selected' : '' --> value="-1">Patient</option>
										<!-- php: foreach($providers as $provider) { -->
												<option <!-- php: = $billTo == $provider->id ? 'selected' : '' --> value="<!-- php: = $provider->id -->" data-content="<!-- php: = $provider->insurance_profile->name --><span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile_type->name : '' --></span>"></option>
											<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>

							<div class="row">
								<div class="offset-md-4 col-md-8">
									<button type="submit" class="btn btn-info">Submit</button>
									<button type="button" class="btn btn-default" onclick = 'clearService()'>Reset</button>
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
	"use strict";
	var FormValidation = function () {

		// basic validation
		var handleValidationMedication = function() {
			
			var form1 = $('#medicationForm');
			
			form1.validate({
				errorElement: 'span', //default input error message container
				errorClass: 'help-block help-block-error', // default input error message class
				focusInvalid: false, // do not focus the last invalid input
				ignore: "",  // validate all fields including form hidden input
				messages: {
					select_multi: {
						maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
						minlength: jQuery.validator.format("At least {0} items must be selected")
					}
				},
				rules: {
					frequency: {
						required: true
					},
					number_of_days: {
						required: true
					},
					quantity: {
						required: true,
						digits: true
					},
					dosage_form_id: {
						required: true
					},
					repeat_prescription: {
						required: true
					},
					bill_to_id: {
						required: true
					},

				},

				invalidHandler: function (event, validator) { //display error alert on form submit              
					$([document.documentElement, document.body]).animate({
						scrollTop: $("#medicationForm").offset().top
					}, 100);$([document.documentElement, document.body]).animate({
						scrollTop: $("#medicationForm").offset().top
					}, 100);
				},

				errorPlacement: function (error, element) { // render error placement for each input type
					var cont = $(element).parent('.form-group');
					if (cont) {
						cont.after(error);
					} else {
						element.after(error);
					}
				},

				highlight: function (element) { // hightlight error inputs
					$(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
				},

				unhighlight: function (element) { // revert the change done by hightlight
					$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set error class to the control group
				},

				success: function (label) {
					label.closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
				},

				submitHandler: function (form) {
					$("#submitMedication").html('Processing');
					$("#submitMedication").attr('disabled','disabled');
					$("#resetMedication").attr('disabled','disabled');

					var medicationData = $("#medicationForm").serialize();
					$.ajax({
						type: "POST",
						url: '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id, ]) -->',
						datatype: 'json',
						data: medicationData,
						success: function g(data, textStatus) {
							setTimeout(function(){
								//$('#medications_table').DataTable().ajax.reload(null, false);
								$('#medications_table').DataTable().draw();
							}, 200);
							clearMedications();
							alertify.success('Medication added successfully');

							$("#submitMedication").html('Submit');
							$("#submitMedication").removeAttr('disabled');
							$("#resetMedication").removeAttr('disabled');

							$([document.documentElement, document.body]).animate({
								scrollTop: $("#medications_table").offset().top
							}, 500);
							$([document.documentElement, document.body]).animate({
								scrollTop: $("#medications_table").offset().top
							}, 500);
						},
						fail: function g(xhr, textStatus, errorThrown) {
							$("#submitMedication").html('Submit');
							$("#submitMedication").removeAttr('disabled');
							$("#resetMedication").removeAttr('disabled');
						}
					});
				}
			});
		}

		return {
			//main function to initiate the module
			init: function () {
				handleValidationMedication();
			}

		};

	}();

	jQuery(document).ready(function() {
		'use strict';
		FormValidation.init();
	});
</script>

<script>
	
	function clearMedications() {
		$('#drug_stock_id').val('');
		$('#drug_stock_id').selectpicker('refresh');
		$('#drug_id').val('');
		$('#drug_id').selectpicker('refresh');
		$('#frequency').val('');
		$('#number_of_days').val('');
		$('#quantity').val('');
		$('#dosage_form_id').val('');
		$('#dosage_form_id').selectpicker('refresh');
		$('#allergy').val('');
		$('#repeat_prescription').val('');
		$('#repeat_prescription').selectpicker('refresh');
		$('#medication_type_id').val('');
		$('#medication_type_id').selectpicker('refresh');
		$('#refill_date').val('');
	}

	function clearSurgery(){
		$('#start_date_value').val('');
		$('#start_time_value').val('');
		$('#end_date_value').val('');
		$('#end_time_value').val('');
		$('#surgery_type_id').val('');
		$('#surgeon_id').val('');
		$('#anaesthesia_id').val('');
		$('#surgery_notes').val('');
	}

	function clearService(){
		$('#start_date_value').val('');
		$('#start_time_value').val('');
		$('#end_date_value').val('');
		$('#end_time_value').val('');
		$('#surgeon_id').val('');
		$('#anaesthesia_id').val('');
		$('#surgery_notes').val('');
	}

	$(function () {
		$("#labForm").submit(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});

		// $("#medicationForm").submit(function () {
			// return confirm('Are you sure you want to submit ?');
			// return true;
		// });

		$("#surgeries").submit(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});

		$("#submitMedicationa").click(function () {
			alert('form clicked');
			$('#medicationFrom').validate({
				rules: {
				  frequency: "required"
				},
				messages: {
				  frequency: "Please enter dosage form"
				},
				submitHandler: function (form) { // for demo
				  alert('valid form');
				  return false;
				}
			  });
			/*
			$("#medicationForm").validate({
				submitHandler: function(form) {
					alert('Validated Successfully');
				}
			});
			*/
			alert('done validating');
			return;
			
			$("#submitMedication").html('Processing');
			$("#submitMedication").attr('disabled','disabled');
			$("#resetMedication").attr('disabled','disabled');

			var medicationData = $("#medicationForm").serialize();
			$.ajax({
				type: "POST",
				url: '<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'addRequestMedication', $patient->id, $selectedVisit->id, ]) -->',
				datatype: 'json',
				data: medicationData,
				success: function g(data, textStatus) {
					setTimeout(function(){
						$('#medications_table').DataTable().ajax.reload(null, false);
					}, 200);
					clearMedications();
					alertify.success('Medication added successfully');

					$("#submitMedication").html('Submit');
					$("#submitMedication").removeAttr('disabled');
					$("#resetMedication").removeAttr('disabled');

					$([document.documentElement, document.body]).animate({
						scrollTop: $("#medications_table").offset().top
					}, 500);$([document.documentElement, document.body]).animate({
						scrollTop: $("#medications_table").offset().top
					}, 500);
				},
				fail: function g(xhr, textStatus, errorThrown) {
					$("#submitMedication").html('Submit');
					$("#submitMedication").removeAttr('disabled');
					$("#resetMedication").removeAttr('disabled');
				}
			});
		});
	});
</script>
					
<script>

	function updateLabTest() {
		str = $('#investigation_id').val();
		
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
					
				document.getElementById("lab_test_id").innerHTML = inneroptions;
				//alert("refreshing");
				$('#lab_test_id').selectpicker('refresh');
				//$('.selectpicker').selectpicker('render');
				//alert("done refreshing");
			}
		}
		
		xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'updateLabTest']) -->/"+str, true);
		xhttp.send();
	}

	function clearLabs() {
		document.getElementById('investigation_id').innerHTML = '';
	}

	function moveToId(id = null) {
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#" + id).offset().top
		}, 500);
	}

	function updateMedicationType(value = null) {
		if(value == false) {
			$('#all_drugs').show(500);
			$('#stock_drugs').hide(500);
			document.getElementById("drug_id").required = true;
			document.getElementById("drug_stock_id").required = false;
		}
		else {
			$('#all_drugs').hide(500);
			$('#stock_drugs').show(500);
			document.getElementById("drug_id").required = false;
			document.getElementById("drug_stock_id").required = true;
		}
	}

	function updateRefillDate(value = null) {
		if(value == 1) {
			$('#refill_date_row').show(500);
			document.getElementById("refill_date").required = true;
		}
		else {
			$('#refill_date_row').hide(500);
			document.getElementById("refill_date").required = false;
		}

		$("#medicationForm").validate().element("#repeat_prescription");
	}

	function loadMedicationDetails(id = null) {
		$('.modal-body').load("<!-- php: = $this->Url->build(['controller' => 'RequestMedications', 'action' => 'viewMedication']) -->?id=" + id,function(){
			$('#viewMedicationDialog').modal({show:true});
		});
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
		
		// save tab in local storage
		$('#requestTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('requestLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var requestLastTab = localStorage.getItem('requestLastTab');
		if (requestLastTab) {
		   $('#requestTab a[href=' + requestLastTab + ']').tab('show');
		}		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#requestTab a[data-toggle="tab"]:first').tab('show');
		}
		
	});
</script>

<script type="text/javascript">
	$(document).ready(function() {
		var myDoseResultMain = $.parseJSON('<!-- php: echo $dosageAutocompleteList; -->');
		
		$('#frequency').autocomplete({
				source: myDoseResultMain[0]
		});
	});
</script>
`;

export default function ElementElementPatientvisitRequestservices20200817() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
