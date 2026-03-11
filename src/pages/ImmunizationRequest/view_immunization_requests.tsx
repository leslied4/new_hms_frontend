import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/ImmunizationRequest/view_immunization_requests.php';
const rawHtml = `
<!-- start page content -->
<!-- php: $totalAmount = 0; -->

<div class="row">
	<div class="col-md-12 col-sm-12">
	
		<div class="profile-sidebar">

			<div class="card card-topline-<!-- php: = $theme1 -->">
				<div class="card-body no-padding height-9">
					<div class="row">
						<div class="profile-userpic">
							<!-- php: echo $this->Html->image($patientImage,['class' =>'img-responsive']); -->
						</div>
					</div>
					<div class="profile-usertitle">
						<div class="profile-usertitle-name"><!-- php: = $immunizationRequests['0']->patient->first_name.' '. $immunizationRequests['0']->patient->last_name --></div>
					</div>
					<ul class="list-group list-group-unbordered">
						<!-- php: if(!($patientVisit->walk_in == 1)) { -->
							<li class="list-group-item">
								<b>Folder Number</b> <a class="pull-right"><!-- php: = $immunizationRequests['0']->patient->folder_number --> </a>
							</li>
						<!-- php: } -->
						<li class="list-group-item">
							<b>Gender</b> <a class="pull-right"><!-- php: = isset($immunizationRequests['0']->patient->gender) ? $immunizationRequests['0']->patient->gender->name : "N/A" --> </a>
						</li>
						<li class="list-group-item">
							<b>Age</b> <a class="pull-right"><!-- php: =isset($immunizationRequests['0']->patient->date_of_birth) ? $immunizationRequests['0']->patient->date_of_birth->diffInYears(Cake\I18n\Time::now()) : "N/A" --> </a>
						</li>
						<li class="list-group-item">
							<b>Date Registered</b> <a class="pull-right"><!-- php: =isset($immunizationRequests['0']->patient->date_created)? $immunizationRequests['0']->patient->date_created->nice() : "N/A" --> </a>
						</li>
						<li class="list-group-item">
							<b>Phone</b> <a class="pull-right"><!-- php: =isset($immunizationRequests['0']->patient->phone)? $immunizationRequests['0']->patient->phone : "N/A" --> </a>
						</li>
						<li class="list-group-item">
							<button data-toggle="modal" data-target="#patientBillDialog" class="pull-right btn btn-sm btn-<!-- php: = $theme2 --> btn-outline no-print" type="button"> <span><i class="fa fa-money"></i> Patient Bill</span> </button>
						</li>
					</ul>
					
					<!-- END SIDEBAR USER TITLE -->
					
				</div>
			</div>
			
			<!-- <//?= $this->element('patientvisit/dialogs/patient_bill'); ?> -->

			<div class="card">
				<div class="card-head card-topline-<!-- php: = $theme1 -->">
					<header>Visit Details</header>					
				</div>
				<div class="card-body no-padding height-9">
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Total Amount</b> <a class="pull-right" id="finalAmount"><!-- php: = $this->Number->precision($totalAmount, 2) --> </a>
						</li>
						<li class="list-group-item">
							<b>Visit Date</b> <a class="pull-right"><!-- php: = $patientVisit->date_created->nice() --> </a>
						</li>
					</ul>
				</div>
			</div>
			
		</div>
			
		<div class="card card-topline-<!-- php: = $theme1 -->">
			<div class="card-head">
				<header><!-- php: = ($patientVisit->walk_in == 1) ? 'Walkin Details' : 'Patient: Requested Immunizations' --></header>
			</div>
			<div class="card-body" id="bar-parent">
				 <div class="table-scrollable">
					<table class="table table-hover order-column full-width customDataTable">
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Status</th>
                                <th scope="col">Vaccine</th>
                                <th scope="col">Type</th>
                                <th scope="col">ROA</th>
                                <th scope="col">Batch</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: foreach ($immunizationRequests as $immunizationRequest): -->
							<tr class="odd gradeX">
								<td><!-- php: = h($immunizationRequest->dor) --></td>
								<!-- <td><!-- php: = $immunizationRequest->requested_by --></td> -->
                                <!-- <td class="right">
                                    <!-- php: if(!$immunizationRequest->doa){ -->
                                        None
                                    <!-- php: } -->
                                    <!-- php: if($immunizationRequest->doa){ -->
                                        <!-- php: = h($immunizationRequest->doa) -->
                                    <!-- php: } -->
                                </td> -->
								<!-- <td><!-- php: =h($immunizationRequest->has('user') ? $immunizationRequest->user->first_name : 'None') --></td> -->
								<td>
									<!-- php: if($immunizationRequest->doses_taken == $immunizationRequest->dosage_count){ -->
										<span class="badge badge-success">Fulfilled</span>
									<!-- php: } -->
									<!-- php: if($immunizationRequest->doses_taken > 0 && $immunizationRequest->doses_taken < $immunizationRequest->dosage_count){ -->
										<span class="badge badge-success">Partly Fulfilled</span>
									<!-- php: } -->
									<!-- php: if($immunizationRequest->doses_taken == 0){ -->
										<span class="badge badge-warning">Not Started</span>
									<!-- php: } -->
                                    <!-- <!-- php: if($immunizationRequest->fulfilled == 0){ -->
                                        <span class="badge badge-warning">Not Fulfilled</span>
                                    <!-- php: } -->
                                    <!-- php: if($immunizationRequest->fulfilled == 1){ -->
                                        <span class="badge badge-success">Fulfilled</span>
                                    <!-- php: } -->
									<!-- php: if($immunizationRequest->fulfilled == 2){ -->
                                        <span class="badge badge-danger">Cancelled</span>
                                    <!-- php: } --> -->
								</td>
								<td><!-- php: = $immunizationRequest->drug_stock->drug->name --></td>
                                <td><!-- php: = $immunizationRequest->medication_type->type_name --></td>
                                <td><!-- php: = $immunizationRequest->dosage_form->name --></td>
                                <td><!-- php: = $immunizationRequest->batch_no --></td>
								<td class="actions">
									<!-- php: if($immunizationRequest->doses_taken < $immunizationRequest->dosage_count){ -->
										<a type="button" href="javascript:" data-toggle="modal" data-target="#FulfillDialogue_<!-- php: = $immunizationRequest->id -->" 
											class="btn btn-success btn-xs">
												Fulfill
										</a> <br><br>
									<!-- php: } -->
									
									<!-- php: if($immunizationRequest->fulfilled != 2){ -->
										<!-- php: = $this->Form->postLink(__('Cancel'), ['controller' => 'ImmunizationRequest','action' => 'cancelImmunization', $immunizationRequest->id], ['confirm' => __('Are you sure you want to cancel this Immunization request?'), 'class'=>"btn btn-dang... -->
										<br><br>
									<!-- php: } -->
									<!-- php: if($immunizationRequest->doses_taken > 0){ -->
										<a type="button" href="javascript:" data-toggle="modal" data-target="#ReactionDialogue_<!-- php: = $immunizationRequest->id -->" 
											class="btn btn-info btn-xs">
												Adverse<br>Reaction
										</a>
									<!-- php: } -->
								</td>
							</tr>
							<div class="modal fade" id="FulfillDialogue_<!-- php: = $immunizationRequest->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
										<h4 class="modal-title" id="editProviderDialogueTitle">Fulfill Immunization Request</h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Immunization Request Details</header>
														</div>
														<div class="card-body" id="bar-parent">
																<div class="form-body">																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Patient Name
																			<span class="required"> </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="" id="patient_name_<!-- php: = $immunizationRequest->id -->" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->patient->name -->" readonly/> 
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Request Date
																			<span class="required"> </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="" id="request_date_<!-- php: = $immunizationRequest->id -->" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->dor -->" readonly/> 
																		</div>
																	</div>	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Requester
																			<span class="required"> </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="" id="requester_<!-- php: = $immunizationRequest->id -->" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->requested_by -->" readonly/> 
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Requested Vaccine
																			<span class="required"> </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="" id="vaccine_requested_<!-- php: = $immunizationRequest->id -->" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->drug_stock->drug->name -->" readonly/> 
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Vaccine Type
																			<span class="required"> </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="" id="vaccine_requested_type<!-- php: = $immunizationRequest->id -->" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->medication_type->type_name -->" readonly/> 
																		</div>
																	</div>		
																	<div class="form-group row">
																		<label class="control-label col-md-5">ROA
																			<span class="required"> </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="" id="roa_site_<!-- php: = $immunizationRequest->id -->" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->dosage_form->name -->" readonly/> 
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Site
																			<span class="required"> </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="" id="roa_site_<!-- php: = $immunizationRequest->id -->" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->dosage_form->name -->" readonly/> 
																		</div>
																	</div>
																	<!-- php: = $this->Form->create($immunizationRequest, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'fulfillImmunization', $immunizationRequest->id], 'class' => 'form-horizontal']) -->
																	<div class="form-group row">
																		<label class="control-label col-md-5">Next Schedule
																			<span class="required">  </span>
																		</label>
																		<div class="col-md-7">
																			<div class="input-group date form_date" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																				<input class="form-control" size="16" type="text" value="" readonly name="next_schedule" id="next_schedule" size="16" placeholder="YYYY-MM-DD"  >
																				<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																				<span class="input-group-addon" title="Clear Start Date Filter"><span class="fa fa-remove"></span></span>
																			</div>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Remarks
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<textarea id="remarks" name="remarks" rows="3" cols="28" maxlength="200"></textarea>
																		</div>
																	</div>							
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="submit" class="btn btn-info">Submit</button>
																			<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
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
							<div class="modal fade" id="ReactionDialogue_<!-- php: = $immunizationRequest->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered modal-lg" role="document" id="modal-dialog"> 
									<div class="modal-content">
										<div class="modal-header">
										<h4 class="modal-title" id="editProviderDialogueTitle">Immunization Request</h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Immunization Adverse Reactions</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'recordAdverseReaction'], 'class' => 'form-horizontal']) -->						
																<div>
																	<div>
																		<div class="form-body">	
																			<input hidden type="text" name="immunization_id" id="immunization_id" data-required="1" placeholder="" class="form-control input-height" value="<!-- php: = $immunizationRequest->id -->" /> 
																			<div class="form-group row">
																				<label class="control-label col-md-5">Select Adverse Event From The List If Experienced
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="aefi_category_id" id="aefi_category_id">
																						<option value="">Select...</option>
																						<!-- php: foreach($aefiCategories as $selectOption) { -->
																							<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->category_name --></option>
																						<!-- php: } -->
																					</SearchableSelectField>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Write adverse event in your own words
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<textarea id="adverse_in_words" name="adverse_in_words" rows="2.5" cols="51" maxlength="200"></textarea>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Date the Adverse Event Following Immunisation started
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<div class="input-group date form_date" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																						<input class="form-control" size="16" type="text" value="" readonly name="adverse_event_start_date" id="adverse_event_start_date" size="16" placeholder="YYYY-MM-DD"  >
																						<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																						<span class="input-group-addon" title="Clear Start Date Filter"><span class="fa fa-remove"></span></span>
																					</div>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">How Long After The Vaccine Did Averse Event Start
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="after_time" id="after_time" data-required="1" placeholder="" class="form-control input-height" value="" /> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Time Unit For Adverse Event
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="time_unit" id="time_unit">
																						<option value="">Select Time Unit</option>
																							<option value="min">Minute</option>
																							<option value="hour">Hour</option>
																							<option value="day">Day</option>
																					</SearchableSelectField>
																				</div>
																			</div>																		
																		</div>
																	</div>
																	<hr>
																	<hr>
																	<!-- <div id="more_event" hidden>
																		<div class="form-body">	
																			<div class="form-group row">
																				<label class="control-label col-md-5">Select Adverse Event From The List If Experienced
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="adverse_event" id="adverse_event">
																						<option value="">Select...</option>
																						<!-- php: foreach($aefiCategories as $selectOption) { -->
																							<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->category_name --></option>
																						<!-- php: } -->
																					</SearchableSelectField>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Write adverse event in your own words
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<textarea id="adverse_in_words" name="adverse_in_words" rows="2.5" cols="51" maxlength="200"></textarea>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Date the Adverse Event Following Immunisation started
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<div class="input-group date form_date" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																						<input class="form-control" size="16" type="text" value="" readonly name="adverse_event_start_date" id="adverse_event_end_date" size="16" placeholder="YYYY-MM-DD"  >
																						<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																						<span class="input-group-addon" title="Clear Start Date Filter"><span class="fa fa-remove"></span></span>
																					</div>
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">How Long After The Vaccine Did Averse Event Start
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="after_time" id="after_time" data-required="1" placeholder="" class="form-control input-height" value="" /> 
																				</div>
																			</div>
																			<div class="form-group row">
																				<label class="control-label col-md-5">Time Unit For Adverse Event
																					<span class="required"> * </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="time_unit" id="time_unit">
																						<option value="">Select Time Unit</option>
																							<option value="">Hour</option>
																					</SearchableSelectField>
																				</div>
																			</div>																		
																		</div>
																	</div> -->
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-4 col-md-8">
																			<button type="button" id="add_more" class="btn btn-warning">Add More</button>
																			<button type="submit" class="btn btn-info">Submit</button>
																			<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
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
						<!-- php: endforeach; -->									
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
$(function () {
	$("#labProcessForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
	
	// $("#labCancelForm").click(function () {
	// 	return confirm('Are you sure you want to cancel ?');
	// 	// return true;
	// });
});
</script>
<!-- end page content -->

<script>
	$(document).ready(function($){
		document.getElementById('finalAmount').innerHTML = "GHS <!-- php: = $this->Number->precision($totalAmount, 2) -->";
		// Dropzone.autoDiscover = false;
		/*
		$("#lab_image_drop_11").dropzone({
			maxFiles: 20,
			url: "/ajax_file_upload_handler/",
			success: function (file, response) {
				console.log(response);
			}
		});
		*/
	});
</script>

<script>
	function updateLabGen(checkedValue, elementId) {
		checked = $('#gen_lab_check').is(":checked");
		
		if(checked){
			$('#' + elementId).hide(500);
			$('#lab_number').attr('data-required',0);
			$('#lab_number').removeAttr('required')
		}
		else {
			$('#' + elementId).show(500);
			$('#lab_number').prop('required',true);
			$('#lab_number').attr('data-required',1);
		} 
			
		return;
	}
</script>
<script>
	$("#add_more").click(function(){
		$("#more_event").removeAttr("hidden")
	})
</script>
`;

export default function ImmunizationRequestViewImmunizationRequestsPage() {
  return (
    <PageShell title="ImmunizationRequest/view_immunization_requests.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
