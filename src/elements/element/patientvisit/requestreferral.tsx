const rawHtml = `
	<style>
		.consult-card-section .card ul li {
			margin-bottom: 10px;
			font-size: 15px;

		}
	</style>
	<div>

		<section>
			<h4>Consult/Referral Requests</h4>
			<div>
				<span class="btn btn-sm btn-success">View History</span>
			</div>
			<div class="table-scrollable">
				<table class="table table-hover table-checkable order-column full-width" id="referral_table">
					<thead>
						<tr>
							<th> Date</th>
							<th>From</th>
							<th>To</th>
							<th>Reason</th>
							<th>Level</th>
							<th>Type</th>
							<th>Diagnosis</th>
							<th>Charge</th>
							<th>Status</th>
							<th> Actions </th>
						</tr>
					</thead>
					<tbody>
						

					</tbody>
				</table>
			</div>

			<br />
			<hr />
		</section>

		<!--Cards section-->
		<!-- php: if($isCurrentVisit): -->
			<section>
				<div class="row card-section consult-card-section">
					<div class="row col-md-12">
						<!--emergency card-->
						<div class="col-md-3">
							<div class="card bg-light mb-3  with-transform ">
								<div class="card-header bg-danger text-slate-900">Emergency/Urgent <span class="float-right"></span></div>
								<div class="card-body">

									<ul id="emergency"></ul>

								</div>
							</div>
						</div>
						<!--Non-Urgent-->
						<div class="col-md-3">
							<div class="card bg-light mb-3  with-transform ">
								<div class="card-header bg-warning text-slate-900">Non-Urgent/Routine & Off-Hours <span class="float-right"></span></div>
								<div class="card-body">

									<ul id="routine"></ul>

								</div>

							</div>
						</div>
						<!--Patient movement-->
						<div class="col-md-3">
							<div class="card bg-light mb-3 ">
								<div class="card-header bg-success text-slate-900">Patient Movement/Bed Request <span class="float-right"></span></div>
								<div class="card-body">

									<ul id="movement"></ul>

								</div>

							</div>
						</div>

					</div>

				</div>

			</section>
		<!-- php: endif; -->

		<!--Modal section-->

		<!--referral form-->
		<div class="modal fade" id="referralModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog  modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header border-bottom-0">
						<h5 class="pl-4 modal-title" style="font-weight: bolder;" id="consultation_description">Consultation to "MDC"</h5>
						<span class="pull-left" style="color: red;">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
					</div>
					<div class="mb-2">
						<span class="label label-lg text-uppercase" id="consultation_type"><b>Add Emergency Consultation</b>
						</span>
					</div>
					<div>

					</div>
					<div>
						<div class="modal-body">
							<div class="row">

								<!--Details-->
								<article class="card-body pt-2 pl-5 pr-5 p-0">

									<div class="row">
										<!--Patient Details-->
										<div class="mr-5">
											<dl class="item-property">
												<dt>Patient Details</dt>

												<dd>
													<p>
														Name: <span class="bold text-success"><!-- php: = $patient->first_name . ' ' . $patient->last_name --></span><br>
														Age: <span class="bold text-success"><!-- php: = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </span><br>
														Gender: <span class="bold text-success"><!-- php: = isset($patient->gender) ? $patient->gender->name : "" --> </span> <br>
														location: <br>
														Folder No: <span class="bold text-success"><!-- php: = $patient->folder --></span>

													</p>

												</dd>
											</dl>
										</div>
										<!--Allergy-->
										<div>
											<dl class="item-property">
												<dt>Allergy</dt>

												<dd>
													<p>
														<div class="">
															<div class="allergy-reactions-small-card" id="problem_complaints_noneText">
																<span class="">
																	None
																</span>
															</div>
														</div>

													</p>

												</dd>
											</dl>
										</div>

									</div>
									<hr>
									<!--referral form-->
									<section>
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Patients', 'action' => 'add_consultation_request', $selectedVisit->id], 'id' => 'illness_form', 'class' => 'row']); -->
											<div class="form-body">

												<div class="form-group row">
													<label class="control-label col-md-5">From:

													</label>
													<div class=" col-md-7">
														<input type="text" data-required="0" placeholder="" class="form-control " name="" value="<!-- php: = $this->request->getSession()->read()['Auth']['User']['first_name'] -->"/>
														<input type="hidden" value="" name="consultation_id" id="consultation_id">
													</div>
												</div>


												<div class="form-group row">
													<label class="control-label col-md-5">To:

													</label>
													<div class="input-group col-md-7">
														<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" title="Select Doctor" data-size="5" data-live-search="true" required id="consultation_to_user_id" name="to_user_id">
														</SearchableSelectField>
														<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-search text-slate-900"></span></span>

													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Reason For Consult?

													</label>
													<div class="col-md-7">
														<input type="text" name="reason" id="" data-required="0" placeholder="" class="form-control " />
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Level of Consultation

													</label>
													<div class="col-md-7">

														<SearchableSelectField class="form-control " name="consultation_level_id" id="consultation_level_ids">

														<!-- php: foreach($consultationLevels as $level) { -->
																	<option value="<!-- php: =$level->id -->"><!-- php: =$level->name --></option>
																<!-- php: } -->
														</SearchableSelectField>

														
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Diagnosis

													</label>
													<div class="col-md-7" id="consultation_diagnosis" style="">
															
													</div>
												</div>



												<div class="form-group row" id="consultation_type_display">
													<label class="control-label col-md-5">Type
													</label>
													<div class="col-md-7">
														<div id="priority ">
															<div class="form-check form-check-inline">
																<input class="form-check-input" type="radio" name="type" id="off_hours_radio" value="3">
																<label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Off-Hours</span></label>
															</div>
															<div class="form-check form-check-inline">
																<input class="form-check-input" type="radio" name="type" id="routine_radio" value="2">
																<label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Routine</span></label>
															</div>

														</div>
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-5">Comment

													</label>
													<div class="col-md-7">
														<input type="text" name="" id="" data-required="0" placeholder="" class="form-control " />
													</div>
												</div>
											</div>
										<!-- php: = $this->Form->end(); -->
									</section>
									<!--//Event Paramters -->
								</article>
								<!--//Requested Service Details-->
							</div> <!-- row.// -->
							<hr>
						</div> <!-- row.// -->
						<div class="modal-footer border-top-0 d-flex justify-content-center">
							<button id="save_medicationService" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2" onclick="submitIllnessForm()"><i class="fa fa-check"></i>
								save
							</button>
							<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
								Cancel</button>

							<button data-dismiss="modal" type="button" class="btn btn-secondary btn-lg  mb-2"><i class="fa fa-link"></i>
								Link Order</button>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div class="modal fade" id="bedMovementModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog  modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header border-bottom-0">
						<h5 class="pl-4 modal-title" style="font-weight: bolder;" id="bed_movement_description">bed_movement to "MDC"</h5>
						<span class="pull-left" style="color: red;">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
					</div>
					<div class="mb-2">
						<span class="label label-lg text-uppercase" id="bed_movement_type"><b>Add Emergency bed_movement</b>
						</span>
					</div>
					<div>

					</div>
					<div>
						<div class="modal-body">
							<div class="row">

								<!--Details-->
								<article class="card-body pt-2 pl-5 pr-5 p-0">

									<div class="row">
										<!--Patient Details-->
										<div class="mr-5">
											<dl class="item-property">
												<dt>Patient Details</dt>

												<dd>
													<p>
														Name: <span class="bold text-success"><!-- php: = $patient->first_name . ' ' . $patient->last_name --></span><br>
														Age: <span class="bold text-success"><!-- php: = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </span><br>
														Gender: <span class="bold text-success"><!-- php: = isset($patient->gender) ? $patient->gender->name : "" --> </span> <br>
														location: <br>
														Folder No: <span class="bold text-success"><!-- php: = $patient->folder --></span>

													</p>

												</dd>
											</dl>
										</div>

										<!--Allergy-->
										<div>
											<dl class="item-property">
												<dt>Allergy</dt>

												<dd>
													<p>
														<div class="">
															<div class="allergy-reactions-small-card" id="problem_complaints_noneText">
																<span class="">
																	None
																</span>
															</div>
														</div>
													</p>

												</dd>
											</dl>
										</div>

									</div>
									<hr>
									<!--referral form-->
									<section>
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Patients', 'action' => 'addBedRequest', $selectedVisit->id], 'id' => 'bed_request_form', 'class' => 'row']); -->
											<div class="form-body full-width">

												<div class="form-group row">
													<label class="control-label col-md-5">From:

													</label>
													<div class=" col-md-7">
														<input type="text" data-required="0" placeholder="" class="form-control " name="" value="<!-- php: = $this->request->getSession()->read()['Auth']['User']['first_name'] -->"/>
														<input type="hidden" value="" name="bed_movement_id" id="bed_movement_id">
														<input type="hidden" value="" name="specialty_id" id="bed_movement_specialty_id">
													</div>
												</div>

												<div class="form-group row">
	                                                <label class="control-label col-md-5">
															Consultation
	                                                </label>
	                                                <div class="col-md-7">
														<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" title="Select Consultation" data-size="5" data-live-search="true" required id="selectedConsultationfilter" name="consultation_id">
														</SearchableSelectField>
	                                                </div>
	                                            </div>

												<div class="form-group row">
													<label class="control-label col-md-5">To:

													</label>
													<div class="input-group col-md-7">
														<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" title="Select Doctor" data-size="5" data-live-search="true" required id="to_user_id_filter" name="to_user_id">
														</SearchableSelectField>
														<span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-search text-slate-900"></span></span>

													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Ward Types:

													</label>
													<div class="input-group col-md-7">
														<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" title="Ward Types" data-size="5" data-live-search="true" required id="ward_type_referral" name="ward_type_id">
														</SearchableSelectField>

													</div>
												</div>
											</div>
										<!-- php: = $this->Form->end(); -->
									</section>
									<!--//Event Paramters -->
								</article>
								<!--//Requested Service Details-->
							</div> <!-- row.// -->
							<hr>
						</div> <!-- row.// -->
						<div class="modal-footer border-top-0 d-flex justify-content-center">
							<button id="save_medicationService" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2" onclick="submitBedRequestForm()"><i class="fa fa-check"></i>
								save
							</button>
							<button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
								Cancel</button>

							<button data-dismiss="modal" type="button" class="btn btn-secondary btn-lg  mb-2"><i class="fa fa-link"></i>
								Link Order</button>
						</div>
					</div>
				</div>

			</div>
		</div>

	</div>


<script>
	const referralCurrentVisit = '<!-- php: = $isCurrentVisit -->';
	const referralContinuousCare = '<!-- php: = $continuousCare -->'
	const allSpecialtiesExcept_link = "<!-- php: = $this->Url->build(['controller' => 'Specialties', 'action' => 'allSpecialtiesExcept', $selectedVisit->id]) -->"
	const getWardTypes_link = "<!-- php: = $this->Url->build(['controller' => 'ManageWards', 'action' => 'getWardTypes']) -->"
	const getPatientVisitDiagnosis_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitDiagnosis', $patient->id, $selectedVisit->id, '?' => ['_location' => 'diagnosis']]) -->"
	const referral_viewUsersSpecialty_link = \`<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewUsersSpecialty']) -->/\`
	const getConsultationBySpecialty_link = \`<!-- php: = $this->Url->build(['controller' => 'ManageServices', 'action' => 'getConsultationBySpecialty']) -->/\`
	const getReferral_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getReferral','?' => ['_location' => 'diagnosis']]) -->"
	const getConsultationRequest_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllConsultationRequest' : 'getConsultationRequest', $selectedVisit->id, $patient->id ]) -->"
	const referralStatusChange_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'referralStatusChange']) -->"
</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestreferral.js') -->
`;

export default function ElementElementPatientvisitRequestreferral() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
