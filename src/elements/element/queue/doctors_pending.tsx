const rawHtml = `
<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			
			<div class="card  card-box">
				<div class="card-head">
					<header>Pending Doctor's Queue</header>
				</div>
				<div class="card-body ">
					<div class="d-flex align-items-center" id="patient_location_section">
						<span class="">Working Location</span>
						<div class="col-md-3">

							<SearchableSelectField name="infacilityLocation" class="form-control" id="infacility_user_location">
								<option value=""></option>
							</SearchableSelectField>
						</div>
						<div class="col-md-3">
							<button class="btn btn-info btn-md" onclick="callNextDoctorPatient()">Next Patient</button>
						</div>
					</div>
				  <div class="table-scrollable">
					<table class="table table-hover table-checkable table-striped order-column full-width customDataTable">
						<thead>
							<tr>
								<th></th>
								<th>Queue Time</th>
								<th>Patient</th>
								<th>Folder No.</th>
								<th>Assigned Doctor</th>
								<!-- th>Comment</th -->
								<th class="center">Action</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: foreach ($pending_queue as $doctorQueue): // Get the last vital recorded $lastVital = null; $severityColor = ''; $severityTitle = ''; $severityComment = ''; if($doctorQueue->has('patient_visit') && isset($doctorQueue->patient_visit->patient... -->
							<tr class="odd gradeX">
								<td>
									<span class="<!-- php: = $severityColor != '' ? 'label label-mini' : '' -->" style="<!-- php: = $severityColor != '' ? 'background: #' . $severityColor : '' -->" title="<!-- php: = $severityTitle -->" >&nbsp;</span>
								</td>
								<td><!-- php: = isset($doctorQueue->date_created) ? $doctorQueue->date_created->nice() : '' --></td>
								<td>
									<a href="<!-- php: =$this->Url->build(['controller'=>'Patients', 'action'=>'viewPatient', $doctorQueue->patient_visit->patient_id]) -->" >
										<!-- php: = $doctorQueue->patient_visit->patient->first_name .' '. $doctorQueue->patient_visit->patient->last_name -->
									</a>	
								</td>
								<td><!-- php: = $doctorQueue->patient_visit->patient->folder_number --></td>
								<td><!-- php: = isset($doctorQueue->assigned_user)? $doctorQueue->assigned_user->full_name : "" --></td>
								<!-- td>
									<!-- php: // = $severityComment -->
								</td -->
								
								<td class="left">
									<a href="<!-- php: =$this->Url->build(['controller'=>'Patients', 'action'=>'viewVisit', $doctorQueue->patient_visit->patient_id, $doctorQueue->patient_visit->id, $doctorQueue->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">
										Visit
									</a>		
									<a href="<!-- php: =$this->Url->build(['controller'=>'Queue', 'action'=>'processPatient', $doctorQueue->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">
										Complete
									</a>
									<button href="javascript" id='called_me<!-- php: = $doctorQueue->patient_visit->patient_id -->' onclick="callSelectedDoctorPatient('<!-- php: = $doctorQueue->patient_visit->patient_id -->')" class="btn btn-danger btn-xs patient_view_patient_info">
										Call
									</button>

									<!-- php: if ($doctorQueue->has('consultation_request') && isset($doctorQueue->consultation_request) && $doctorQueue->consultation_request->status_id != 23) { -->
										<a class="btn btn-xs text-slate-900 mr-2" style="background-color: #6c5ce7;" data-toggle="modal" data-target="#referralModal<!-- php: =$doctorQueue->id -->">referral</a>
										<div class="modal fade" id="referralModal<!-- php: =$doctorQueue->id -->" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div class="modal-dialog  modal-lg" role="document">
												<div class="modal-content">
													<div class="modal-header border-bottom-0">
														<h5 class="pl-4 modal-title" style="font-weight: bolder;" id="consultation_description"><!-- php: =$doctorQueue->consultation_request->consultation->name --></h5>
														<span class="pull-left" style="color: red;">
															<button type="button" class="close" data-dismiss="modal" aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
													</div>
													<div class="mb-2">
														<span class="label label-lg bg-<!-- php: =$doctorQueue->consultation_request->consultation->consultation_type->color_code --> text-uppercase" id="consultation_type"><b><!-- php: =$doctorQueue->consultation_request->consultation->consultation_type->name --></b>
														</span>
													</div>

													<div>
														<div class="modal-body">
															<div class="row">
																<article class="card-body pt-2 pl-5 pr-5 p-0">
																	<section class="">
																		<div class="form-group row">
																			<label class="control-label col-md-5">From:

																			</label>
																			<div class=" col-md-7">
																				<!-- php: = $doctorQueue->consultation_request->from->user->first_name . ' ' . $doctorQueue->consultation_request->from->user->last_name -->
																			</div>
																		</div>

																		<div class="form-group row">
																			<label class="control-label col-md-5">Reason For Consult?

																			</label>
																			<div class="col-md-7">
																				<!-- php: = $doctorQueue->consultation_request->reason -->
																			</div>
																		</div>

																		<div class="form-group row">
																			<label class="control-label col-md-5">Level of Consultation

																			</label>
																			<div class="col-md-7">

																				<!-- php: = $doctorQueue->consultation_request->consultation_level->name -->


																				
																			</div>
																		</div>

																		<div class="form-group row">
																			<label class="control-label col-md-5">Diagnosis

																			</label>
																			<div class="col-md-7" id="consultation_diagnosis" style="">
																				<!-- php: foreach ($doctorQueue->consultation_request->consultation_request_diagnoses as $key => $consultation_diagnosis) { -->
																					<!-- php: = $consultation_diagnosis->diagnosis->name --> <span class="badge badge-danger"><!-- php: =$consultation_diagnosis->diagnosis->code --></span> <br>
																				<!-- php: } -->
																			</div>
																		</div>

																		<!-- <div class="form-group row" id="consultation_type_display">
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
																		</div> -->

																	</section>
																</article>
															</div> <!-- row.// -->



															<hr>


														</div> <!-- row.// -->
														<div class="modal-footer border-top-0 d-flex justify-content-center">
															<!-- <button id="save_medicationService" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
																Approve
															</button> -->
															<form method="post" action="<!-- php: = $this->Url->build(['controller' => 'Queue', 'action' => 'referralStatusChange', $doctorQueue->id]) -->/21" class="statusChangeForm">
																<button class="btn btn-lg  mb-2 btn-success" type="submit" name="submit_param" value="submit_value">
																	Approve
																</button>
															</form>
															<form method="post" action="<!-- php: = $this->Url->build(['controller' => 'Queue', 'action' => 'referralStatusChange', $doctorQueue->id]) -->/24" class="statusChangeForm">
																<button class="btn btn-lg  mb-2 btn-danger" type="submit" name="submit_param" value="submit_value">
																	Cancel
																</button>
															</form>

															<!-- <button data-dismiss="modal" type="button" class="btn btn-secondary btn-lg  mb-2"><i class="fa fa-link"></i>
																Link Order</button> -->
														</div>
													</div>
												</div>

											</div>
										</div>
									<!-- php: } -->															
								</td>
							</tr>
						<!-- php: endforeach; -->									
						</tbody>
					</table>
				  </div>
				</div>
			</div>


		</div>
	</div>
</div>

<script>
// 	function statusChangeForm(e, id){
// 		// e.preventDefault(),
// 		console.log(e)
// 		var action = e.action
// 		console.log(action)
// 		if(confirm(\`Are you sure you want to cancel #\${id}?\`)){
// 			$.ajax({
// 				type: 'POST',
// 				url: action,
// 				data: [],
// 				success: function g(data, textStatus) {
// 						if (data == true){
// 							alertify.success('Consultation has been cancelled')
// 						}	else{
// 							alertify.error('Error Occured. Please try again');
// 						}
// 						$(\`#referral_table\`).DataTable().ajax.reload();
// 				},
// 				fail: function g(xhr, textStatus, errorThrown) {
// 						console.log(xhr);
// 				}
// 			});
// 			return false
// 		}
// 		return false
// 	}
// 

	function fetchActiveLocations() {
		$.ajax({
			type: 'GET',
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'infacilityLocations']) -->",
			data: [],
			success: function g(data, textStatus) {
					let result = ''
					data.forEach(ele => {
						result += \`<option data-content='\${ele.name} <span class="badge badge-danger badge-pill">\${ele.specialty.name}</span>' value="\${ele.id}">\${ele.name}</option>\`
					});
					if (data.length < 1) {
						$('#patient_location_section').hide()
					}
					$(\`#infacility_user_location\`).html(result);
					$(\`#infacility_user_location\`).selectpicker('refresh');
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}
	function callNextDoctorPatient() {
		if (sessionStorage.getItem('selectedSoundLocation') != $('#infacility_user_location').val()) {
			sessionStorage.setItem('selectedSoundLocation', $('#infacility_user_location').val())
			alertify.success('Your in facility location has been set to ' + $("#infacility_user_location").find(':selected').text())
		}
		$.ajax({
			type: 'POST',
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'callNextDoctorPatient']) -->",
			data: {
				'infacility_location_id': sessionStorage.getItem('selectedSoundLocation')
			},
			success: function g(data, textStatus) {
				if (data) {
					alertify.success('Fetching Next Patient In queue')
				} else {
					alertify.error('An Error Occured while fetching next patient. Please try again.')

				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}
	function callSelectedDoctorPatient(patient_id) {
		if (sessionStorage.getItem('selectedSoundLocation') != $('#infacility_user_location').val()) {
			sessionStorage.setItem('selectedSoundLocation', $('#infacility_user_location').val())
			alertify.success('Your in facility location has been set to ' + $("#infacility_user_location").find(':selected').text())
		}
		$.ajax({
			type: 'POST',
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'callNextDoctorPatient']) -->",
			data: {
				'infacility_location_id': sessionStorage.getItem('selectedSoundLocation'),
				'patient_id': patient_id,
			},
			success: function g(data, textStatus) {
				if (data) {
					$('#called_me'+patient_id).html('Re-call')
					alertify.success('Fetching Next Patient In queue')
				} else {
					alertify.error('An Error Occured while fetching next patient. Please try again.')

				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}


	$(document).ready(function () {
		fetchActiveLocations()

		if (sessionStorage.getItem('selectedSoundLocation') != null || sessionStorage.getItem('selectedSoundLocation') != 'null') {
			$('#infacility_user_location').val(sessionStorage.getItem('selectedSoundLocation'))
			$('#infacility_user_location').selectpicker('refresh')
		}
	})
</script>
`;

export default function ElementElementQueueDoctorsPending() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
