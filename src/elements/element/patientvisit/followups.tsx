const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption d-flex align-items-center">
				<span class="caption-subject font-dark bold uppercase">FOLLOW UPS</span>
				<div class="form-check ml-3">
					<input class="form-check-input" type="checkbox" name="assign_to_me" value="<!-- php: = $this->request->getSession()->read()['Auth']['User']['id'] -->" id="assign-to-me">
					<label style="font-size:15px" class="form-check-label" for="defaultCheck1">
						Assign to me
					</label>
				</div>
			</div>
			<ul class="nav nav-tabs" id="followupsTab">
				
				<!-- php: if($isCurrentVisit) { -->
					<li class="nav-item followups_add_follow_up">
						<a href="#borderBox_tab25" data-toggle="tab"> Add </a>
					</li>
				<!-- php: } -->
				
				<li class="nav-item followups_view_follow_ups">
					<a href="#borderBox_tab26" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<!-- php: if($isCurrentVisit) { -->
				<div class="tab-pane followups_add_follow_up " id="borderBox_tab25">
				<!-- php: //= $this->Form->create(null,['url' => ['controller' => 'PatientVisitFollowups', 'action' => 'addFollowup', $patient->id, $selectedVisit->id], 'id'=>'followups']); -->
					<div class="form-body">
						<div class="form-group row">
							<label class="control-label col-md-3">Description/Problem
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<textarea name="description" id="description" placeholder="Provide actionable information on patient’s next examination or observation" class="form-control textarea" rows="5" required ></textarea>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Specialty
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="specialty_id" id="specialty_id" required>
									<option value="">Select Specialty</option>
									<!-- php: foreach($specialties as $specialty) { -->
									<option value="<!-- php: =$specialty->id -->"><!-- php: =$specialty->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Assigned Doctor
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="user_id" id="user_id" required data-max-options="1" data-size="5" multiple>
									<option value="">Select Doctor</option>

								</SearchableSelectField>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-3">Date of Next Visit
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="Select date for next visit" size="16" placeholder="" name = "date_of_visit" id = "date_of_visit" type="text" value="" required >
									<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
								<input type="hidden" id="dtp_input2" value="" />
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">Notes
								
							</label>
							<div class="col-md-5">
								<textarea name="comment"id="follcomment" placeholder="Leave notes for assigned doctor/department" class="form-control textarea" rows="5" ></textarea>
							</div>
						</div>
						<!-- <div class="row">
						    <div class="col-md-3"></div>
						    <div class="col-md-5">

						       
						    </div>
						</div> -->
						
						<div class="row mt-3">
							<div class="offset-md-3 col-md-7">
								<button type="submit" class="btn btn-info" onclick=sumbitPatientFollowupsData();>Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearFields();'>Reset</button>
								<button class="btn btn-link text-slate-900" style="background-color:#8e44ad" type="button" onclick="activateRecurring()"
						            data-toggle="modal" data-target="#followups_recurring">
						            <i class="fa fa-clock-o"></i>&nbsp; Make Routine Care For Followups
						        </button>

							</div>
						</div>
					</div>
					<!-- php: //= $this->Form->end(); -->
				</div>
				<!-- php: } -->
				
				<div class="tab-pane active followups_view_follow_ups" id="borderBox_tab26">
					<div class="card-body ">
						<div class="table-scrollable">
							<table class="table table-hover order-column full-width" id="followups_table">
								<thead>
									<tr>
										<th class="center"> Date</th>
										<th class="center"> description </th>
										<th class="center"> Assigned Doctor </th>
										<th class="center"> Specialty </th>
										<th class="center"> Date of Visit </th>
										<th class="center"> Comment </th>
										<th class="center"> Status </th>
										<th class="center">Activity</th>
										<th class="center"> Actions </th>
									</tr>
								</thead>
								<tbody>
																	
								</tbody>
							</table>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="" id="reschedule-div"></div>
<div class="modal fade" id="followups_recurring" tabindex="-1" aria-labelledby="followups_recurring" aria-hidden="true"
    aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div style="border:2px solid #8e44ad;" class="container px-0">
                <div style="background:#8e44ad;" class="container-fluid pr-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Make Followups Recurring</h4>
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
					        <h5 class="font-weight-bold">Followup Description:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="followups-desc" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Specialty:</h5>
					    </div>
					    <div class="col-md-4 d-flex align-items-center p-1">
					       <span id="specialty-badge" class="badge badge-warning"></span>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Assigned Doctor:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="assigned-doctor" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Date of First Appointment:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="date-appointment" style="my-0"></p>
					    </div>
					</div>
                        <div id="start-end1">
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Start:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="recur_start" id="start1"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>End:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="shift_end" id="end1"
                                        class="form-control form-control-sm">
                                    <input type="hidden" id="totalHours1" name="hours">

                                </div>
                            </div>
                        </div>
						<form id="recurring-followups-form">
                        <div class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Recurring:</h5>
                            </div>
                            <div class="col-md-7 d-flex align-items-center p-1">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="daily1"
                                        value="daily">
                                    <label class="form-check-label" for="daily">Daily</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="weekly1"
                                        value="weekly">
                                    <label class="form-check-label" for="weekly">Weekly</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="monthly1"
                                        value="monthly">
                                    <label class="form-check-label" for="monthly">Monthly</label>
                                </div>
                            </div>
                        </div>
                        <div id="repeat-daily1" class="row mt-2 pl-2">
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
                        <div id="repeat-weekly1" class="row mt-2 pl-2">
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
                        <div id="repeat-monthly1" class="row mt-2 pl-2">
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
                            <div id="until1" class="container-fluid p-2">
                                <!-- <h5 class="text-left">Stop Condition</h5> -->
                                <div style="border: 1px solid #ccc; border-radius:5px;" class="container py-4 p-3">
                                    <div class="row">
                                    </div>
                                    <div class="row mt-3">
                                        <!-- <div class="col-md-1"><input type="radio"></div> -->
                                        <div class="col-md-11">
                                            <div class="d-flex align-items-center">
                                                <div class="col-md-5">
                                                    <h5 class="text-dark text-left m-0 p-0">Stop Condition
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 text-left">
												<div class="form-check form-check-inline">
												    <input class="form-check-input" type="radio" name="condition" id="stop-occurence1"
												        value="stop-occurence">
												    <label class="form-check-label" for="stop-occurence">Occurence</label>
												</div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="condition"
                                                            id="stop-date1" value="stop-date">
                                                        <label class="form-check-label" for="stop-date">Date</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="specific-date1" class="row mt-3">
                                        <!-- <div class="col-md-1"><input type="radio"></div> -->
                                        <div class="col-md-11">
                                            <div class="d-flex align-items-center">
                                                <div class="col-md-5">
                                                    <h5 class="text-dark text-left m-0 p-0">Run until a
                                                        specific date</h5>
                                                </div>
                                                <div class="col-md-6"><input type="date" class="form-control"
                                                        id="recur-type" name="recur_end" ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="specific-occurence1" class="row mt-3">
                                        <!-- <div class="col-md-1"><input type="radio"></div> -->
                                        <div class="col-md-11">
                                            <div class="d-flex align-items-center">
                                                <div class="col-md-5">
                                                    <h5 class="text-dark text-left m-0 p-0"
                                                        style="padding-right:33px!important">Run until it
                                                        reaches</h5>
                                                </div>
                                                <div class="col-md-3"><input type="text" class="form-control"
                                                        id="recur-type" name="occurence"></div>
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
                    <input name="color" type="hidden" value="#f1c40f">
                    <input name="category" type="hidden" value="vacation">
                    <div class="d-flex align-items-center py-1 justify-content-end">
                        <button id="submit-recurring-followups" style="height:20px;width:auto;"
                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Done&nbsp;<i
                                class="fa fa-check text-success fa-1x"></i> </button>	</form>
                        <!-- <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Reset&nbsp;
							<i class="fa fa-refresh" aria-hidden="true"></i> </button> -->
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


<script>
	const followupSpecialty = "<!-- php: = $selectedVisit->specialty_id -->"
	const isCurrentVisitFollowUp = "<!-- php: = $isCurrentVisit -->"

	const followupTheme2 = '<!-- php: = $theme2 -->'

	const specialtiesFollowup = \`<!-- php: foreach($specialties as $specialty) { -->
		<option value="<!-- php: =$specialty->id -->"><!-- php: =$specialty->name --></option>
	<!-- php: } -->\`

	const usersFollowup = \`<!-- php: foreach($users as $doctor) { -->
		<option value="<!-- php: =$doctor->id -->"><!-- php: =$doctor->first_name.' '. $doctor->last_name --></option>
	<!-- php: } -->\`

	const followUpVisitId = "<!-- php: = $selectedVisit->id -->"

	const savePatientFollowupsRecurring_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'savePatientFollowupsRecurring', $patient->id, $selectedVisit->id ] ); -->"
	const viewUsersSpecialty_link = \`<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewUsersSpecialty']) -->/\`
	const getAssignedUser_link = '<!-- php: = $this->Url->build(['controller'=>'Patients', 'action'=>'getAssignedUser']); -->'
	const getSpecialties_link = '<!-- php: = $this->Url->build(['controller'=>'Patients', 'action'=>'getSpecialties']); -->'
	const editFollowupModal_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'editPatientFollowups']) -->"
	const savePatientFollowupsDataAjax_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'savePatientFollowups' ] ); -->"
	const followupsTab_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientFollowups']) -->"
	const cancelFollowUp_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'cancelPatientFollowUp' ] ); -->"
	const submitFollowUpEdit_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'updatePaitentFollowup' ] ); -->"
	const submitFollowUpReschedule_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'reschedulePaitentFollowup' ] ); -->"

</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/followups.js') -->

`;

export default function ElementElementPatientvisitFollowups() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
