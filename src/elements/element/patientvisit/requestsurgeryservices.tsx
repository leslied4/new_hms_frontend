const rawHtml = `
<!--Cards section-->
<section>
    <div class="row card-section"  style="width:100%">
        <div class="col-md-6">
            <!--History card-->
            <div class="col-md-12">
                <div class="accordion" id="historyAccordion">
                    <div class="card bg-light mb-3 historyCard with-transform">
                        <div class="card-header" id="historyHeading">
                        History <a  data-toggle="collapse" data-target="#historyCollapse" aria-expanded="true" aria-controls="historyCollapse"><span class="float-right">(Last Entered)</span></a>
                        </div>
                        <div id="historyCollapse" class="collapse" aria-labelledby="historyHeading" data-parent="#historyAccordion">
                            <div class="card-body">
                                <!-- Allergy -->
                                <div class="card-body">
                                    <span class="float-left text-primary">Allergy</span><span class="ml-2" id="allergy-action-span"></span><br>
                                    <div class="">
                                        <!-- Set class d-none when live -->
                                        <div class="allergy-small-card" id="this_needed">
                                            <span class="">
                                                None
                                            </span>
                                        </div>
                                    </div>
                                    <span class="float-left text-primary">Allergy Reactions</span><span class="ml-2" id="allergy-reactions-action-span"></span><br>
                                    <div class="">
                                        <div class="allergy-reactions-small-card" id="problem_complaints_noneText">
                                            <span class="">
                                                None
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="pr-3 pb-2">
                                <a href="javascript:;" class="pull-right text-slate-900 text-primary"> View All</a>
                            </div> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-md-6">
            <!--Problems Card-->
            <div class="col-md-12">
                <div class="accordion" id="problemsAccordion">
                    <div class="card bg-light mb-3 problemsCard with-transform">
                        <div class="card-header" id="problemsHeading">
                            Problems <a href="javascript:;" data-toggle="collapse" data-target="#problemsCollapse" class="float-right text-slate-900 text-primary"> (Last Entered)</a>
                        </div>
                        <div id="problemsCollapse" class="collapse" aria-labelledby="problemsHeading" data-parent="#problemsAccordion">
                            <div class="card-body">
                                <!--Complaints-->
                                <span class="float-left text-primary">Complaints</span><span class="ml-2" id="complaint-action-span"></span><br>
                                <div class="">
                                    <!--set class d-none when live-->
                                    <div class="cc-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!--ODQs-->
                                <span class="float-left text-primary">ODQs</span><span class="ml-2" id="odqs-action-span"></span><br>
                                <div class="">
                                    <!--set class d-none when live-->
                                    <div class="odqs-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!--Comorbidity-->
                                <span class="float-left text-primary">Comorbidity</span><span class="ml-2" id="comorbidity-action-span"></span><br>
                                <div class="">
                                    <!--set class d-none when live-->
                                    <div class="comorbidities-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!--Surgeries-->
                                <span class="float-left text-primary">Surgeries</span> <br>
                                <div class="">
                                    <!--set class d-none when live-->
                                    <div class="surgeries-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!--Diagnosis-->
                                <span class="float-left text-primary">Diagnosis</span> <br>
                                <div class="">
                                    <div class="diagnoses-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <span class="float-left text-primary">Hospitalization/Procedures</span> <br>
                                <div class="pl-4">
                                    <div class="hospitalization-small-card" id="problem_complaints_noneText">
                                        <span class="">
                                            None
                                        </span>
                                    </div>
                                </div>

                                <!--System review-->
                                <span class="float-left text-primary">System Review</span> <br>
                                <div class="pl-4">
                                    <div class="row">
                                        <div class="review-small-card" id="problem_complaints_noneText">
                                            <span class="">
                                                None
                                            </span>
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

</section>
<h4>Surgeries</h4>
<div>
    <span class="btn btn-sm btn-success">View History</span>
</div>
<div class="table-scrollable">
    <table class="table table-hover order-column full-width" id="surgeries_table">
        <thead>
            <tr>
                <th> Date</th>
                <th>Start</th>
                <th>End</th>
                <!-- <th>Duration</th> -->
                <th>Surgery</th>
                <th>Other Details</th>
                <th> Surgeon </th>
                <th>Charge</th>
                <th> Status </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody>


           
        </tbody>
    </table>
</div>

<br />
<hr />


<!--Surgeru Request Form-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestSurgeries', 'action' => 'addRequestSurgery', $patient->id, $selectedVisit->id], 'id' => 'requestSurgeryForm']); -->
    <div class="d-flex align-items-center">

        <h3>Make a new Surgery Request</h3>
        <div class="ml-2">

            <div onclick="refreshSurgery()" class="btn btn-xs btn-primary">refresh</div>
        </div>
    </div>
    <div class="form-body">
        <div class="form-group row">
            <label class="control-label col-md-3">Surgery / Procedure
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <!-- select option for old approach -->
                <!-- <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Surgery" name="surgery_stock_id" id="surgery_stock_select" data-live-search="true" onchange="$('#requestSurgeryForm').validate().element('#surgery_stock_select');" required> -->

                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" title="Select Surgery" name="surgery_stock_id" id="surgery_stock_select" data-live-search="true" onchange="$('#requestSurgeryForm').validate().element('#surgery_stock_select');" required>

                </SearchableSelectField>
            </div>
        </div>
        <div class="form-group row">
            <label class="control-label col-md-3">Diagnoses
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <SearchableSelectField class="form-control input-height show-menu-arrow show-tick" id="diagnoses_care_info" data-size="10" title="Select Diagnoses" name="diagnosis_id" id="diagnosis_id" data-live-search="true" onchange="$('#requestSurgeryForm').validate().element('#diagnosis_id');" required>
                </SearchableSelectField>
            </div>
        </div>
        <div class="form-group row">
            <label class="control-label col-md-3">Start Date & Time
                <span class="required"> * </span>
            </label>


            <div class="col-md-5">
                <input id="start_date_time" name="start_time" placeholder="Click to select start date and time" data-required="1" class="form-control" readonly='true' class="w-100" />
            </div>
        </div>

        <div class="form-group row">
            <label class="control-label col-md-3">Duration (Hrs)
                <span class="required"> * </span>
            </label>


            <div class="col-md-5">
                <input placeholder="Enter Duration of Surgery in Hours" name="duration" id="duration" data-required="1" class="form-control" class="w-100" />
            </div>
        </div>

        <div class="form-group row">
            <label class="control-label col-md-3">Surgery type
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="surgery_type_id" id="surgery_type_id" required>
                    <option value="" disabled selected hidden>Select Surgery Type</option>
                    <!-- php: foreach ($surgerytypes as $surgerytype) { -->
                        <option value="<!-- php: = $surgerytype->id -->"><!-- php: = $surgerytype->name --></option>
                    <!-- php: } -->
                </SearchableSelectField>
            </div>
        </div>

        <div class="form-group row">
            <label class="control-label col-md-3">Surgeon
                <!-- <span class="required"> * </span> -->
            </label>
            <div class="col-md-5">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="surgeon_id" id="surgeon_id" required>
                </SearchableSelectField>
            </div>
        </div>

        <div class="form-group row">
            <label class="control-label col-md-3">Anaesthesia
                <!-- <span class="required"> * </span> -->
            </label>
            <div class="col-md-5">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="anaesthesia_id" id="anaesthesia_id" required>
                    <option value="" disabled selected hidden>Select Anaesthesia</option>
                    <!-- php: foreach ($anaesthesia as $anaesthesia) { -->
                        <option value="<!-- php: = $anaesthesia->id -->"><!-- php: = $anaesthesia->name --></option>
                    <!-- php: } -->
                </SearchableSelectField>
            </div>
        </div>


        <div class="form-group row">
            <label class="control-label col-md-3">Anaesthesiologist
                <!-- <span class="required"> * </span> -->
            </label>
            <div class="col-md-5">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="anaesthesiologist_id" id="anaesthesiologist_id" required>
                </SearchableSelectField>
            </div>
        </div>

        <div class="form-group row">
            <label class="control-label col-md-3">Surgery notes

            </label>
            <div class="col-md-5">
                <textarea name="surgery_notes" name="surgery_notes" id="surgery_notes" placeholder="Notes for the surgery" class="form-control textarea" rows="5"></textarea>
            </div>
        </div>

        <div class="form-group row">
            <label class="control-label col-md-3">Charge Bill To
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">
                <!-- php: // default to patient if no provider is found // $billTo = $selectedVisit->has('patient_provider') ? $selectedVisit->patient_provider->provider_id : -1; $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->pat... -->
                <SearchableSelectField class="form-control patient_insurance_setters input-height show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required>
                </SearchableSelectField>
            </div>
        </div>


        <div class="form-group row">
            <label class="control-label col-md-3">Service Place
                <span class="required"> * </span>
            </label>
            <div class="col-md-5">

                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="service_place_id" id="service_place_id" required>
                    <option value="" disabled selected hidden>Select Service Place...</option>
                    <option value="1" selected>Place 1</option>
                    <option value="2">Place 2</option>
                </SearchableSelectField>
            </div>
        </div>



        <div class="row mt-3">
            <div class="offset-md-3 col-md-8">
                <button type="submit" class="btn btn-info">Submit</button>
                <button type="button" class="btn btn-default" onclick='clearSurgery()'>Reset</button>
                <!-- php: if($this->AuthUser->hasAccess(['controller' => 'RequestSurgeries', 'action' => 'addRecurringRequestSurgery'])) { -->
                <button class="btn btn-link text-slate-900" style="background-color:#8e44ad" type="button"
						            data-toggle="modal" data-target="#surgery_recurring">
						            <i class="fa fa-clock-o"></i>&nbsp;Make Routine Care For Surgery
						        </button>
                <!-- php: } -->
            </div>
        </div>
    </div>
    <!-- php: = $this->Form->end(); -->
<!-- php: } -->

<div class="modal fade" id="surgery_recurring" tabindex="-1" aria-labelledby="surgery_recurring" aria-hidden="true"
    aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div style="border:2px solid #8e44ad;" class="container px-0">
                <div style="background:#8e44ad;" class="container-fluid pr-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Make Surgery Request Recurring</h4>
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
					        <h5 class="font-weight-bold">Surgery:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="surgery_stock_select_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Start Date & Time:</h5>
					    </div>
					    <div class="col-md-4 d-flex align-items-center p-1">
					       <span id="start_date_time_recurring" class="badge badge-warning"></span>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Duration (Hrs):</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="duration_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Surgeon:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="surgeon_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Anaesthesiologist:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="anaesthesiologist_recurring" style="my-0"></p>
					    </div>
					</div>
                        <div id="start-end6">
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Start:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="recur_start" id="start6"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>End:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="shift_end" id="end6"
                                        class="form-control form-control-sm">
                                    <input type="hidden" id="totalHours6" name="hours">

                                </div>
                            </div>
                        </div>
						<form id="recurring-surgery-form">
                        <div class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Recurring:</h5>
                            </div>
                            <div class="col-md-7 d-flex align-items-center p-1">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="daily6"
                                        value="daily">
                                    <label class="form-check-label" for="daily">Daily</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="weekly6"
                                        value="weekly">
                                    <label class="form-check-label" for="weekly">Weekly</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="monthly6"
                                        value="monthly">
                                    <label class="form-check-label" for="monthly">Monthly</label>
                                </div>
                            </div>
                        </div>
                        <div id="repeat-daily6" class="row mt-2 pl-2">
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
                        <div id="repeat-weekly6" class="row mt-2 pl-2">
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
                        <div id="repeat-monthly6" class="row mt-2 pl-2">
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
                            <div id="until6" class="container-fluid p-2">
                                <!-- <h5 class="text-left">Stop Condition</h5> -->
                                <div style="border: 1px solid #ccc; border-radius:5px;" class="container py-4 p-3">
                                    <div class="row">
                                    </div>
                                    <div class="row mt-3">
                                        <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                        <div class="col-md-11">
                                            <div class="d-flex align-items-center">
                                                <div class="col-md-5">
                                                    <h5 class="text-dark text-left m-0 p-0">Stop Condition
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 text-left">
												<div class="form-check form-check-inline">
												    <input class="form-check-input" type="radio" name="condition" id="stop-occurence6"
												        value="stop-occurence">
												    <label class="form-check-label" for="stop-occurence">Occurence</label>
												</div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="condition"
                                                            id="stop-date6" value="stop-date">
                                                        <label class="form-check-label" for="stop-date">Date</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="specific-date6" class="row mt-3">
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
                                    <div id="specific-occurence6" class="row mt-3">
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
    const addRequestSurgery_surgery_link = '<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'addRequestSurgery', $patient->id, $selectedVisit->id]) -->'
    const getAllProcedures_surgery_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAllProcedures']) -->\`
    const getPatientVisitDiagnosis_surgery_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitDiagnosis', $patient->id, $selectedVisit->id, '?' => ['_location' => 'diagnosis']]) -->"
    const getAllRequestedSurgeries_surgery_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => ($continuousCare ? 'getAllRequestedSurgeries' : 'getRequestedSurgeries'), $patient->id, $selectedVisit->id, ]) -->"
    const addRecurringRequestSurgery_surgery_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestSurgeries', 'action' => 'addRecurringRequestSurgery', $patient->id, $selectedVisit->id ] ); -->"
    const viewUsersSpecialty_surgery_link = \`<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewUsersSpecialty']) -->/\`
    const cancelRequestSurgery_surgery_link = "<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'cancelRequestSurgery',]) -->/"

</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestsurgeryservices.js') -->
`;

export default function ElementElementPatientvisitRequestsurgeryservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
