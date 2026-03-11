const rawHtml = `
<style>

	.has-error .bootstrap-select .btn {
		border-color: #f00;
	}

	.has-success .bootstrap-select .btn {
		border-color: #0f0;
	}

	button.btn.dropdown-toggle.btn-light {
		height: 35px;
	}
</style>

<!-- <h4><!-- php: = Cake\Core\Configure::read('LABELS.Ipts', 'Medications') --></h4> -->
<h4><!-- php: = 'Immunization Records' --></h4>
<hr>
<div class="table-scrollable mt-5">
	<table class="table table-hover order-column full-width" id="immunization_table">
		<thead>
			<tr>
				<th class="right">Status</th>
				<th class="right">Doses(Taken/Count)</th>
				<th class="right">Vaccine</th>
				<th class="right">Vaccine Type</th>
				<th class="right">ROA</th>
				<th class="right" class="actions"><!-- php: = __('Actions') --></th>
			</tr>
		</thead>
		<tbody>

		</tbody>
	</table>
	<div class="" id="immunization_modals"></div>
</div>


<!-- php: if($isCurrentVisit): -->
	<div class="row mt-4 pl-3">
		<a class="btn btn-sm text-slate-900 mr-2" style="background-color: #e74c3c;" onclick="javascript:$('#immu_form').toggle(500); moveToId('immu_form'); currentForm ='immu_form' ">Request Immunization</a>
	</div>


	<div style="clear: both"></div>

	<br>
	<hr>
	<form id="immu_form" style="display: none;">
		<h3>Request Immunization</h3>
		<div class="row">
			<div class="col-md-6">
				<div class="form-group row">
					<label class="control-label col-md-4">Select Vaccine
						<span class="required"> * </span>
					</label>
					<div class="col-md-6">
						<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#ImmunizationForm').validate().element('#drug_stock');" data-size="10" title="Vaccine / Type / Strength" name="drug_stock" id="drug_stock" data-live-search="true" required >
						</SearchableSelectField>
						<input hidden type="text" name="drug_stock_id" id="drug_stock_id_immu" data-required="1" placeholder="" class="form-control input-height" readonly required/>  
					</div>
				</div>
				<div class="form-group row">
					<label class="control-label col-md-4">Select Vaccine Type
						<span class="required"> * </span>
					</label>
					<div class="col-md-6">
						<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="medication_type" id="medication_type" required>
							<option value="">Select Vaccine Type</option>
							<!-- php: foreach($medicationTypes as $key => $medicationType) { -->
									<option value="<!-- php: = $key -->" data-medication-type-id="<!-- php: = $key -->"><!-- php: = h($medicationType) --></option>
								<!-- php: } -->
						</SearchableSelectField>
						<input hidden type="text" name="medication_type_id" id="medication_type_id_immu" data-required="1" placeholder="" class="form-control input-height" readonly required/> 
					</div>
				</div>
				<div class="form-group row">
					<label class="control-label col-md-4">Select Administration Route
						<span class="required"> * </span>
					</label>
					<div class="col-md-6">
						<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" onchange="$('#ImmunizationForm').validate().element('#dosage_form');" data-size="5" data-required="1" data-live-search="true" class="form-control input-height" name="dosage_form" id="dosage_form" required>
							<option value="">Select Administration Route</option>
								<!-- php: foreach($dosageForms as $key => $dosageForm) { -->
									<option value="<!-- php: = $key -->" data-dosage-form-id="<!-- php: = $key -->"><!-- php: = h($dosageForm) --></option>
								<!-- php: } -->
						</SearchableSelectField>
						<input hidden type="text" name="dosage_form_id" id="dosage_form_id_immu" data-required="1" placeholder="" class="form-control input-height" readonly required/> 
					</div>
				</div>
				<div class="form-group row">
					<label class="control-label col-md-4">Select Number of Doses
						<span class="required"> * </span>
					</label>
					<div class="col-md-6">
						<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" class="form-control input-height" name="dosage_count" id="dosage_count_select" required>
							<option value="">Select Number of Doses</option>
							<option value="1">One Dose</option>
							<option value="2">Two Doses</option>
							<option value="3">Three Doses</option>
						</SearchableSelectField>
						<input hidden type="text" name="dosage_count" id="dosage_count_immu" data-required="1" placeholder="" class="form-control input-height" readonly required/> 
						<input type="hidden" id="patient_id" name="patient_id" value="<!-- php: = $patient->id -->" />
					</div>
				</div>

				<div>
					<input hidden type="text" name="batch_no" id="batch_no" data-required="1" placeholder="" class="form-control input-height selectpicker show-menu-arrow show-tick" readonly style="height:28px !important;"/> 
				</div>
				<button id="submit_immunization_request_button" onclick="submitImmunizationData()" class="btn btn-info mb-2">Submit</button>
				<button type="reset" id="resetForm" class="btn btn-default mb-2">Reset</button>
				<!-- php: if($this->AuthUser->hasAccess(['controller' => 'ImmunizationRequest', 'action' => 'requestImmunizationRecurring'])) { -->
				<button id="make-immunization" class="btn text-slate-900 mb-2" style="background-color: #8e44ad"> <i class="fa fa-clock-o"></i>&nbsp; Make Routine Care For Immunization</button>
				<!-- php: } -->
			</div>
		</div>
	</form>

	<div class="modal fade" id="immunization_recurring" tabindex="-1" aria-labelledby="immunization_recurring" aria-hidden="true"
		aria-hidden="true">
		<div class="modal-dialog  modal-dialog-centered" role="document">
			<div class="modal-content">
				<div style="border:2px solid #8e44ad;" class="container px-0">
					<div style="background:#8e44ad;" class="container-fluid pr-0">
						<div class="d-flex align-items-center justify-content-between">
							<h4 class="text-slate-900 my-0">Make Immunization Recurring For Routine Care</h4>
							<div>
								<button data-dismiss="modal" aria-label="Close"
									class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
										class="fa fa-times text-primary"></i> </button>
							</div>
						</div>
					</div>

					<div class="container bg-white p-2">
						<div class="container-fluid">
						<div class="row mt-2 pl-2">
							<div class="col-md-4 p-1">
								<h5 class="font-weight-bold">Vaccine:</h5>
							</div>
							<div class="col-md-7 d-flex align-items-center p-1">
							<p id="drug_stock_recurring" style="my-0"></p>
							</div>
						</div>
						<div class="row pl-2">
							<div class="col-md-4 p-1">
								<h5 class="font-weight-bold">Vaccine Type:</h5>
							</div>
							<div class="col-md-4 d-flex align-items-center p-1">
							<span id="medication_type_recurring" class="badge badge-warning"></span>
							</div>
						</div>
						<div class="row pl-2">
							<div class="col-md-4 p-1">
								<h5 class="font-weight-bold">Adminstration Route:</h5>
							</div>
							<div class="col-md-7 d-flex align-items-center p-1">
							<p id="dosage_form_recurring" style="my-0"></p>
							</div>
						</div>
						<div class="row pl-2">
							<div class="col-md-4 p-1">
								<h5 class="font-weight-bold">Number of Doses:</h5>
							</div>
							<div class="col-md-7 d-flex align-items-center p-1">
							<p id="dosage_count_select_recurring" style="my-0"></p>
							</div>
						</div>
							<div id="start-end4">
								<div class="row mt-2 pl-2">
									<div class="col-md-3 p-1">
										<h5>Start:</h5>
									</div>
									<div class="col-md-7 d-flex align-items-center p-1">
										<input type="datetime-local" name="recur_start" id="start4"
											class="form-control form-control-sm">
									</div>
								</div>
								<div class="row mt-2 pl-2">
									<div class="col-md-3 p-1">
										<h5>End:</h5>
									</div>
									<div class="col-md-7 d-flex align-items-center p-1">
										<input type="datetime-local" name="shift_end" id="end4"
											class="form-control form-control-sm">
										<input type="hidden" id="totalHours4" name="hours">

									</div>
								</div>
							</div>
							<form id="recurring-immunization-form">
							<div class="row mt-2 pl-2">
								<div class="col-md-3 p-1">
									<h5>Recurring:</h5>
								</div>
								<div class="col-md-7 d-flex align-items-center p-1">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="type" id="daily4"
											value="daily">
										<label class="form-check-label" for="daily">Daily</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="type" id="weekly4"
											value="weekly">
										<label class="form-check-label" for="weekly">Weekly</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="type" id="monthly4"
											value="monthly">
										<label class="form-check-label" for="monthly">Monthly</label>
									</div>
								</div>
							</div>
							<div id="repeat-daily4" class="row mt-2 pl-2">
								<div class="col-md-3 p-1">
									<h5>Repeat every: </h5>
								</div>
								<div class="col-md-3 d-flex align-items-center p-1">
									<input type="number" name="every_day" class="form-control">
								</div>
								<div class="col-md-2 p-1">
									<h5>days</h5>
								</div>
							</div>
							<div id="repeat-weekly4" class="row mt-2 pl-2">
								<div class="col-md-3 p-1">
									<h5>Repeat every: </h5>
								</div>
								<div class="col-md-3 d-flex align-items-center p-1">
									<input type="number" name="every_week" class="form-control">
								</div>
								<div class="col-md-2 p-1">
									<h5>weeks</h5>
								</div>
							</div>
							<div id="repeat-monthly4" class="row mt-2 pl-2">
								<div class="col-md-3 p-1">
									<h5>Repeat every: </h5>
								</div>
								<div class="col-md-3 d-flex align-items-center p-1">
									<input type="number" name="every_month" class="form-control">
								</div>
								<div class="col-md-2 p-1">
									<h5>months</h5>
								</div>
							</div>
							<div class="row">
								<div id="until4" class="container-fluid p-2">
									<!-- <h5 class="text-left">Stop Condition</h5> -->
									<div style="border: 1px solid #ccc; border-radius:5px;" class="container py-4 p-3">
										<div class="row">
										</div>
										<div class="row mt-3">
											<!-- <div class="col-md-1"><input type="radio"/></div> -->
											<div class="col-md-11">
												<div class="d-flex align-items-center">
													<div class="col-md-5">
														<h5 class="text-dark text-left m-0 p-0">Stop Condition </h5>
													</div>
													<div class="col-md-6 text-left">
													<div class="form-check form-check-inline">
														<input class="form-check-input" type="radio" name="condition" id="stop-occurence4"
															value="stop-occurence">
														<label class="form-check-label" for="stop-occurence">Occurence</label>
													</div>
														<div class="form-check form-check-inline">
															<input class="form-check-input" type="radio" name="condition"
																id="stop-date4" value="stop-date">
															<label class="form-check-label" for="stop-date">Date</label>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div id="specific-date4" class="row mt-3">
											<!-- <div class="col-md-1"><input type="radio"/></div> -->
											<div class="col-md-11">
												<div class="d-flex align-items-center">
													<div class="col-md-5">
														<h5 class="text-dark text-left m-0 p-0">Run until a
															specific date</h5>
													</div>
													<div class="col-md-6"><input type="date" class="form-control"
															id="recur-type" name="recur_end" /></div>
												</div>
											</div>
										</div>
										<div id="specific-occurence4" class="row mt-3">
											<!-- <div class="col-md-1"><input type="radio"/></div> -->
											<div class="col-md-11">
												<div class="d-flex align-items-center">
													<div class="col-md-5">
														<h5 class="text-dark text-left m-0 p-0"
															style="padding-right:33px!important">Run until it
															reaches</h5>
													</div>
													<div class="col-md-3"><input type="text" class="form-control"
															id="recur-type" name="occurence" /></div>
													<div style="white-space: nowrap;" class="col-md-2 pl-1">
														occurences</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						
						</div>
					</div>
					<div style="background:#8e44ad;" class="container-fluid pr-0">
						<div class="d-flex align-items-center py-1 justify-content-end">
							<button id="submit-recurring-followups" style="height:20px;width:auto;"
								class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Done&nbsp;<i
									class="fa fa-check text-success fa-1x"></i> </button>	</form>
							<button style="height:20px;width:auto;"
								class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Reset&nbsp;
								<i class="fa fa-refresh" aria-hidden="true"></i> </button>
							<button style="height:20px;width:auto;"
								class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
								data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
									class="fa fa-times text-danger fa-1x"></i> </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- php: endif; -->

<script>
	const immunizationContinuousCare = '<!-- php: = $continuousCare -->'
	const immunizationCurrentVisit = '<!-- php: = $isCurrentVisit -->';
	const immunizationPatientId = "<!-- php: = $patient->id; -->"
	const getImmunizationRequests_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllImmunizationRequests': 'getImmunizationRequests']) -->"
	const deleteImmunization_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'ImmunizationRequest', 'action' => 'deleteImmunization' ] ); -->"
	const requestImmunization_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'ImmunizationRequest', 'action' => 'requestImmunization' ] ); -->"
	const requestImmunizationRecurring_link = "<!-- php: echo $this->Url->build( ['controller' => 'ImmunizationRequest', 'action' => 'requestImmunizationRecurring' ] ); -->"

</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestimmunization.js') -->
`;

export default function ElementElementPatientvisitRequestimmunization() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
