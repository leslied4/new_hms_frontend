const rawHtml = `
<!-- php: $requestLabs = isset($requestLabs) ? $requestLabs : $selectedVisit->request_labs; -->

<!--Lab Table section-->
<section class="mb-5">

    <!--section on top of table-->
    <div class="row mt-4 pl-3">
        <a class="btn btn-sm text-slate-900 mr-2" style="background-color: #6c5ce7;" href="<!-- php: = Cake\Routing\Router::url(['controller' => 'RequestRadiologies', 'action' => 'radiologyScansFiles', $patient->id]) -->" target="_blank" href>View All Scan Request</a>
    </div>



    <div class="table-scrollable" id="scanTableData" style="">
        <!-- php: = $this->element('patientvisit/requestscanservices') -->
    </div>



    <br />




    <hr class="mt-3" />

</section>








<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->


    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiology', $patient->id, $selectedVisit->id], 'id' => 'scanForm', 'class' => 'row p-2', 'style' => '']); -->
        <div class="form-body col-md-7">
            <h3>Request A Scan</h3>
            <!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->

            <!-- php: if (Cake\Core\Configure::read('REQUEST_LAB_LAYOUT', 1) == 1) { -->
                <!--Outsourced slider-->
                <div class="form-group row">
                    <label class="control-label col-md-3">Outsourced
                        <span class="required" aria-required="true"> * </span>
                    </label>
                    <div class="col-md-5">
                        <label class="switchToggle">
                            <input type="checkbox" name="in_house_medication_status" onclick="updateMedicationType(this.checked);">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Lab Test - internal -->
                <div class="form-group row">
                    <label class="control-label col-md-3">Radiology Scans
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-7">
                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="radioScans" id="radio_scan_id" title="Select Radiology Scan" data-live-search="true" onchange="personnelChange(this, event)" data-max-options="1" multiple required>
                        </SearchableSelectField>
                    </div>

                </div>
            <!-- php: } else { -->
                <div class="row">
                    <label class="control-label col-md-12">Radiology Scans
                        <span class="required"> * </span>
                    </label>
                </div>

                <hr />

                <!-- php: $totalTests = sizeof($radioScans); $labCount = 0; -->
                <div class="form-group row">
                    <!-- php: foreach ($radioScans as $radioScan) { -->
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-9">
                                    <label><!-- php: = $radioScan->name --></label>
                                </div>
                                <div class="col-md-3">
                                    <label class="switchToggle">
                                        <input type="checkbox" <!-- php: = isset($lab) ? 'checked' : '' --> value="<!-- php: = $radioScan->id -->" name="radioScans">
                                        <span class="slider green round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    <!-- php: } -->
                </div>
                <hr />
            <!-- php: } -->


            <!--Priority-->
            <div class="form-group row">
                <label class="control-label col-md-3">Priority
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="priority_id" id="scan_priority_id" data-max-options="1" multiple required>
                        <option value="">Select Priority</option>
                        <!-- php: foreach ($priorities as $key => $priority) { -->
                            <option value="<!-- php: = $key -->"><!-- php: = $priority --></option>
                        <!-- php: } -->
                    </SearchableSelectField>
                </div>
            </div>



            <!--Charge bill to-->
            <div class="form-group row">
                <label class="control-label col-md-3">Charge Bill To
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">

                <SearchableSelectField class="form-control input-height patient_insurance_setters show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="scan_bill_to_id" data-max-options="1" multiple  required>
                    </SearchableSelectField>
                </div>
            </div>

            <!--Dosage Freq-->
            <!-- <div class="form-group row">
                <label class="control-label col-md-3">Scan Frequency
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control  selectpicker show-menu-arrow show-tick" data-max-options="1" data-required="1" data-live-search="true" data-size="5" class="form-control " id="scan_frequency" name="scan_frequency" onchange="$('#scan_freq_desc_section').addClass('d-none');$('#scan_date_range').val('')" multiple required>
                        <option value="">Select Frequency...</option>
                        <!-- php: // foreach ($drugAdminFreqs as $key => $drugAdminFreq) { -->
                            <option value="<!-- php: // $key -->" data-dose-per-day="<!-- php: // $drugAdminFreq->dose_per_day -->"><!-- php: // h($drugAdminFreq->name) --></option>

                        <!-- php: // } -->
                    </SearchableSelectField>
                </div>
            </div> -->

            <!--Start & End Date-->
            <!-- <div class="form-group row">
                <label class="control-label col-md-3"> Start & End Date
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <div>
                        <input id="scan_date_range" name="scan_date_range" placeholder="Click to select date range" data-required="1" class="form-control bg-light" onchange="" readonly='true' class="w-100" />
                    </div>

                    <div class="mt-2  d-none" id="scan_freq_desc_section">
                        <span class="mr-2">First Scan: <b id="scan_first_do_date"></b></span>
                        <span id="scan_frequency_span" class="d-none">Number of Scan(s): <b id="scan_freq_text"></b></span> <br>
                        <span class="mr-2">Number of Day(s): <b id="scan_number_of_days"></b></span> <br>
                    </div>
                </div>
            </div> -->


            <!--Service Place-->
            <div class="form-group row">
                <label class="control-label col-md-3">Service Place
                    <span class="required"> * </span>
                </label>
                <div class="col-md-7">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height" name="service_place_id" id="scan_service_place_id" data-max-options="1" multiple required>
                        <option value="">Select...</option>
                        <option value="0" selected>Place 1</option>
                        <option value="1">Place 2</option>
                    </SearchableSelectField>
                </div>
            </div>

            <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]); -->

            <div class="row mt-3">
                <div class="offset-md-3 col-md-8">
                    <button type="submit" class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-default" onclick='clearScan()'>Reset</button>
                    <!-- php: if($this->AuthUser->hasAccess(['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiologyRecurring'])) { -->
                    <button class="btn text-slate-900" style="background-color: #8e44ad" type="button" data-toggle="modal" data-target="#scans_recurring"> <i class="fa fa-clock-o"></i>&nbsp; Make Scans Recurring For Routine Care</button>
                    <!-- php: } -->
                </div>
            </div>
        </div>
        <style>

            .form-infomation::-webkit-scrollbar {
                width: 10px;
            }

            /* Track */
            .form-infomation::-webkit-scrollbar-track {
                background: #f1f1f1; 
            }
            
            /* Handle */
            .form-infomation::-webkit-scrollbar-thumb {
                background: #888; 
            }

            /* Handle on hover */
            .form-infomation::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
            
        </style>
        <div class="form-infomation col-md-5" id="process_instructions_id" style="height: 500px;overflow-y: auto;">

        </div>
    <!-- php: = $this->Form->end() -->

<!-- php: } -->

<!--card section-->
<div class="row mt-3 d-flex justify-content-center">

    <!--FREQUENTLY REQUESTED LABS section-->
    <div class="col-md-6">
        <div class="card bg-light mb-3 with-transform " style="border-radius: 10px; min-height: 420px;">
            <div class="card-header" style="border-radius:10px;font-weight: bold;">FREQUENTLY REQUESTED SCANS</div>
            <div class="card-body" style="padding: 4px !important;">

                <!--frequently requested list-->
                <div class="col-md-12">
                    <div class="card-hover-shadow-2x  ">

                        <div class="scroll-area-sm">
                            <perfect-scrollbar class="ps-show-limits">
                                <div style="position: static;" class="ps ps--active-y">
                                    <div class="ps-content">
                                        <ul class=" list-group list-group-flush" id="frequentlyRequestScanList">

                                        </ul>
                                    </div>
                                </div>
                            </perfect-scrollbar>
                        </div>
                        <!-- <div class="d-block text-right card-footer"><button class="mr-2 btn btn-link btn-sm">Cancel</button><button class="btn btn-primary">Add Investigation(s)</button></div> -->
                    </div>
                </div>


            </div>

        </div>

    </div>


</div>

<div class="" id="my_alert_box">
</div>

<div class="modal fade" id="lab_requests_recurring" tabindex="-1" aria-labelledby="lab_requests_recurring" aria-hidden="true"
    aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div style="border:2px solid #8e44ad;" class="container px-0">
                <div style="background:#8e44ad;" class="container-fluid pr-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Make Lab Requests Recurring For Routine Care</h4>
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
					        <h5 class="font-weight-bold">Lab Tests (Internal):</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="labs_internal_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Priority:</h5>
					    </div>
					    <div class="col-md-4 d-flex align-items-center p-1">
					       <span id="priority_recurring" class="badge badge-warning"></span>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Service Place:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="lab_imaging_service_place" style="my-0"></p>
					    </div>
					</div>
                        <div id="start-end2">
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
						<form id="recurring-lab-requests-form">
                        <div class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Recurring:</h5>
                            </div>
                            <div class="col-md-7 d-flex align-items-center p-1">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="daily2"
                                        value="daily">
                                    <label class="form-check-label" for="daily">Daily</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="weekly2"
                                        value="weekly">
                                    <label class="form-check-label" for="weekly">Weekly</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="monthly2"
                                        value="monthly">
                                    <label class="form-check-label" for="monthly">Monthly</label>
                                </div>
                            </div>
                        </div>
                        <div id="repeat-daily2" class="row mt-2 pl-2">
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
                        <div id="repeat-weekly2" class="row mt-2 pl-2">
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
                        <div id="repeat-monthly2" class="row mt-2 pl-2">
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
                            <div id="until2" class="container-fluid p-2">
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
												    <input class="form-check-input" type="radio" name="condition" id="stop-occurence2"
												        value="stop-occurence">
												    <label class="form-check-label" for="stop-occurence">Occurence</label>
												</div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="condition"
                                                            id="stop-date2" value="stop-date">
                                                        <label class="form-check-label" for="stop-date">Date</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="specific-date2" class="row mt-3">
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
                                    <div id="specific-occurence2" class="row mt-3">
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
<div class="modal fade" id="scans_recurring" tabindex="-1" aria-labelledby="scans_recurring" aria-hidden="true"
    aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div style="border:2px solid #8e44ad;" class="container px-0">
                <div style="background:#8e44ad;" class="container-fluid pr-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Make Scans Recurring For Routine Care</h4>
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
					        <h5 class="font-weight-bold">Radiology Scans:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="radio_scan_recurring" style="my-0"></p>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Priority:</h5>
					    </div>
					    <div class="col-md-4 d-flex align-items-center p-1">
					       <span id="radio_scan_priority_recurring" class="badge badge-warning"></span>
					    </div>
					</div>
					<div class="row pl-2">
					    <div class="col-md-4 p-1">
					        <h5 class="font-weight-bold">Service Place:</h5>
					    </div>
					    <div class="col-md-7 d-flex align-items-center p-1">
					       <p id="radio_service_place" style="my-0"></p>
					    </div>
					</div>
                        <div id="start-end3">
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>Start:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="recur_start" id="start3"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="row mt-2 pl-2">
                                <div class="col-md-3 p-1">
                                    <h5>End:</h5>
                                </div>
                                <div class="col-md-7 d-flex align-items-center p-1">
                                    <input type="datetime-local" name="shift_end" id="end3"
                                        class="form-control form-control-sm">
                                    <input type="hidden" id="totalHours3" name="hours">

                                </div>
                            </div>
                        </div>
						<form id="recurring-scans-form">
                        <div class="row mt-2 pl-2">
                            <div class="col-md-3 p-1">
                                <h5>Recurring:</h5>
                            </div>
                            <div class="col-md-7 d-flex align-items-center p-1">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="scan_daily3"
                                        value="daily">
                                    <label class="form-check-label" for="daily">Daily</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="scan_weekly3"
                                        value="weekly">
                                    <label class="form-check-label" for="weekly">Weekly</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type" id="scan_monthly3"
                                        value="monthly">
                                    <label class="form-check-label" for="monthly">Monthly</label>
                                </div>
                            </div>
                        </div>
                        <div id="scan_repeat-daily3" class="row mt-2 pl-2">
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
                        <div id="scan_repeat-weekly3" class="row mt-2 pl-2">
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
                        <div id="scan_repeat-monthly3" class="row mt-2 pl-2">
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
                            <div id="scan_until3" class="container-fluid p-2">
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
												    <input class="form-check-input" type="radio" name="condition" id="stop-occurence3"
												        value="stop-occurence">
												    <label class="form-check-label" for="stop-occurence">Occurence</label>
												</div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="condition"
                                                            id="stop-date3" value="stop-date">
                                                        <label class="form-check-label" for="stop-date">Date</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="scan_specific-date3" class="row mt-3">
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
                                    <div id="scan_specific-occurence3" class="row mt-3">
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



<!-- php: = $this->Html->script('/js/cornerstone.js'); -->
<!-- php: = $this->Html->script('/js/cornerstoneMath.js'); -->
<!-- php: = $this->Html->script('/js/cornerstoneTools.js'); -->

<!-- include the dicomParser library as the WADO image loader depends on it -->
<!-- php: = $this->Html->script('/js/dicomParser.js'); -->

<!-- include the cornerstoneWADOImageLoader library -->
<!-- php: = $this->Html->script('/js/cornerstoneWADOImageLoader.js'); -->
<!-- php: = $this->Html->script('/js/cornerstoneWebImageLoader.js'); -->


<!-- uids -->
<!-- php: = $this->Html->script('/js/uids.js'); -->

<!-- Lines ONLY required for this example to run without building the project -->
<script>window.cornerstoneWADOImageLoader || document.write('<script src="https://unpkg.com/cornerstone-wado-image-loader">\x3C/script>')</script>
<!-- php: = $this->Html->script('/js/initializeWebWorkers.js'); -->

<!-- php: = $this->Html->script('/js/custom_scan_viewer.js'); -->
<script>

    $('#scan_until3').hide();
    $('#scan_repeat-daily3').hide();
    $('#scan_repeat-weekly3').hide();
    $('#scan_repeat-monthly3').hide();
    $('#scan_specific-date3').hide();
    $('#scan_specific-occurence3').hide();

    $('#scan_daily3').on('change', function(){
        $('#scan_repeat-daily3').show();
        $('#scan_repeat-weekly3').hide();
        $('#scan_repeat-monthly3').hide();
        $('#scan_until3').show();
    });
    $('#scan_weekly3').on('change', function(){
        $('#scan_repeat-daily3').hide();
        $('#scan_repeat-weekly3').show();
        $('#scan_repeat-monthly3').hide();
        $('#scan_until3').show();
    });
    $('#scan_monthly3').on('change', function(){
        $('#scan_repeat-daily3').hide();
        $('#scan_repeat-weekly3').hide();
        $('#scan_repeat-monthly3').show();
        $('#scan_until3').show();
    });

    $('#stop-occurence3').on('change', function(){
        $('#scan_specific-date3').hide();
        $('#scan_specific-occurence3').show();
    });

    $('#stop-date3').on('change', function(){
        $('#scan_specific-date3').show();
        $('#scan_specific-occurence3').hide();
    });
    scan_object = {};
    function populateScanObject(data) {
        data.forEach(element => {
            scan_object[\`\${element.id}\`] = {
                "process_instruction":\`\${element.process_instruction}\`,
                "symptoms_indications":\`\${element.symptoms_indications}.\`,
                "category_name":\`\${element.radiology_category?.name}\`,
                "name":\`\${element.name}\`
            } 
        });
    }
    function generateSpecimen(info) {
        let result = []
        info.forEach(ele => {
            
            result.push(\`\${ele.name} <span class='badge' style='background: \${ele.color}'>&nbsp;</span>\`)
        });
        if (result.length > 0) {
            return '(' + result.join(' ') + ')'
        }
        return ''
    }
    function populateLabTests() {
        return
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getLabTests']) -->",
			success: function g(data, textStatus) {
				let result = ''
                let billTo = "<!-- php: = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy->insurance_profile_id : -1; -->";
                
				data.forEach(element => {
                    let insurancePrice = element?.insurance_profile_lab_prices.filter(insured_item =>  insured_item.insurance_profile_id == billTo)
					result += \`
							<option value="\${element.id}" 
                                data-content="\${element.name} <span class='badge badge-primary'> \${element?.value_new || 0 }</span> <span class='badge badge-danger'>\${ insurancePrice.length > 0 ? insurancePrice[0]?.price : 0  }</span> <span></span><br/></span> <span class='badge badge-info'>TAT:\${element.turn_around_time}</span> \${generateSpecimen(element.specimen_types)}"
                            >
								\${element.name}
							</option>
						\`
				});
				$('#lab_test_id').html(result)
				$("#lab_test_id").selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
	function populateRadioScans() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRadioScans']) -->",
			success: function g(data, textStatus) {
				result = ''
                let billTo = "<!-- php: = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->";
                if(Array.isArray(data) && data.length > 0) {
                    data.forEach(element => {
                        let insurancePrice = element?.insurance_profile_radiology_prices.filter(insured_item =>  insured_item.insurance_profile_id == billTo)
                        result += \`
                                <option value="\${element.id}" data-content="
                                        \${element.name}
                                        <span class='badge badge-warning'>\${element.radiology_category?.name}</span> 
                                        <span class='badge badge-warning' style='background: \${element.radiology_category?.anatomical_area?.color_code}'>\${element.radiology_category?.anatomical_area?.name}</span> 
                                        <br><span style='font-weight: 700;'> Price:</span> <span class='badge badge-primary'>\${element.value_new || 0}</span>
                                        <span class='badge badge-danger'>\${ insurancePrice.length > 0 ? insurancePrice[0]?.price : 0  }</span>
                                        "
                                        >\${element.name}
                                </option>
                            \`
                    });
                    $('#radio_scan_id').html(result)
                    populateScanObject(data)
                    $("#radio_scan_id").selectpicker("refresh");
                }
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
    function showSymptoms(title, info, cardStyle) {
        return \`
            <div class="card bg-light mb-3 with-transform" style="width: 100%; box-shadow:none;border-color:\${cardStyle}">
                <div class="card-body" style="background:white">
                    <h5 class="card-subtitle mb-2 text-muted">\${title}</h5>
                    <p class="card-text">\${info}</p>
                </div>
            </div>
        \`
    }
    function personnelChange(ele, event) {
        var val = $(ele).selectpicker('val');
        $('#process_instructions_id').html('') 
        if (scan_object[val] == undefined) {
            return;
        }
        $('#process_instructions_id').html(
            showSymptoms(
                "Symptoms And Indications", scan_object[val]["symptoms_indications"], '#61affe'
            )
        )
        $('#process_instructions_id').append(
            showSymptoms(
                "Preparation For Exam", scan_object[val]["process_instruction"], 'pink'
            )
        )
    }

    function clearScan() {
        // $('#scan_bill_to_id').selectpicker('deselectAll');
        $('#radio_scan_id').selectpicker('deselectAll');
        $('#scan_service_place_id').selectpicker('deselectAll');
        $('#scan_priority_id').selectpicker('deselectAll');
        $('#scan_frequency').selectpicker('deselectAll');
        $('#scan_freq_desc_section').addClass('d-none');$('#scan_date_range').val('')
    }
    function clearLabsForm() {
        $('#lab_test_id').selectpicker('deselectAll');
        $('#priority_id').selectpicker('deselectAll');
        $('#repeat_prescription').selectpicker('deselectAll');
    }

    function flash_message(status, message) {
        $('#my_alert_box').html(\`
            <div class="alert alert-\${status ? 'success': 'danger'}"  style="position: fixed;  bottom: 20px; right: 20px;height: 100px; width: 250px; display:flex; align-items:center; padding: 18px">
                \${message}
            </div>
        \`)
        $("#my_alert_box").children().delay(5000).fadeOut(800);
        clearScan()
    }

    function add_table_row(params) {
        scan_requested = scan_object[params]
        info_result = ''
        info_result += \`
            <tr class="text-muted">
                <td>\${scan_requested["category_name"]}</td>
                <td>\${scan_requested["name"]}</td>
                <td>\${moment().format('DD/MM/YYYY, hh:mm A')}</td>
                <td></td>
                <td>Processing</td>
                <td></td>
                <td>
                    <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                </td>
            </tr>
        \`
        $('#scanTableBody').append(info_result)
    }

    function submitRequestScan(link, value, table=null) {
      $.ajax({
        type: "POST",
        url: link,
        data: value,
        success: function g(data, textStatus) {
            // flash_message(data['status'], data['message'])
            // console.log(value["radioScans"])
            alertify.success("Record Has been Saved");
            clearScan()
            clearLabsForm()
            $(\`#\${table}\`).DataTable().ajax.reload();
        },
        fail: function g(xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
      });
    }
    function makeRequest(link, value = [], method = 'GET', table=null) {
      $.ajax({
        type: method,
        url: link,
        data: value,
        success: function g(data, textStatus) {
            // flash_message(data['status'], data['message'])
            if (data.status) {
                
                alert.success(data.message)
            } else {
                alert.error(data.message)

            }
            $(\`#\${table}\`).DataTable().ajax.reload();
        },
        fail: function g(xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
      });
    }

    $('#scanForm').submit(function(e){
        e.preventDefault();
        form = document.getElementById('scanForm')
        var data = $('#scanForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        data['frequency'] = 1
        if(!!data.scan_date_range){
            let newDateRange = data.scan_date_range.split('-')

            data['start_date'] = moment( newDateRange[0]).format('YYYY/MM/DD')
            data['end_date'] = moment( newDateRange[1]).format('YYYY/MM/DD')
            data['frequency'] = $('#scan_freq_text').html()
        }
      var action = form.action
    //   console.log(action, data)
      submitRequestScan(action,data, "scanDataTable2")
    })

    $('#labForm').submit(function(e){
      e.preventDefault();
      form = document.getElementById('labForm')
      var data = $('#labForm').serializeArray();
      var action = form.action
    //   console.log(action, data)
      submitRequestScan(action,data,"labs_table1")
    })


    scan_date_range = mobiscroll.datepicker('#scan_date_range', {
        controls: ['calendar'],
        select: 'range',
        dateFormat: 'DD MMM YYYY',
        calendarType: 'month',
        pages: 2,
        touchUi: true,
        returnFormat: 'moment',
        theme: 'ios',
        themeVariant: 'light',
        invalid: {
            start: '2000-01-01',
			end: Date(),
		}

    });
    $('#scan_date_range').on('click', function() {
        $('.mbsc-popup-button-primary').on('click', function() {
            let date = scan_date_range.getVal();

            prescription_start_date = date[0];
            prescription_end_date = date[1];
            scan_number_of_days = date[1].diff(date[0], 'days');
            // console.log(date);
            $('#scan_freq_desc_section').removeClass('d-none');

            if (moment().isSame(date[0], 'day')) {
                $('#scan_first_do_date').text('Today')
                $('#schedule_time_startDate').text('Today')
            } else {
                $('#scan_first_do_date').text(date[0].format('DD MMM YYYY'));
                $('#schedule_time_endDate').text(date[0].format('DD MMM YYYY'));

            }


            //number of days 
            // difference between end date moment obj and start date moment obj
            //console.log('number of days:'+date[1].diff(date[0],'days'));
            $('#scan_number_of_days').text(date[1].diff(date[0], 'days'))



            //calculate dose 
            if (prescription_freq != "" && scan_number_of_days != "") {
                let dose_per_day = $('#scan_frequency').find(':selected').attr('data-dose-per-day');


                //show scheduled time 
                $('#prescription_scheduled_time').removeClass('d-none');

                //Show dose span 
                $('#scan_frequency_span').removeClass('d-none');

                //Cal dose 
                prescription_doses_num = scan_number_of_days * dose_per_day;
                $('#scan_freq_text').text(prescription_doses_num);
            }



        })




    })
                //On Frequnency DropDown Change 
    $('#scan_frequency').on('change', function() {
        //get freq 
        prescription_freq = $(this).find(':selected').val();
        let dose_per_day = $(this).find(':selected').attr('data-dose-per-day');
        console.log('dose per day:' + dose_per_day);

        //Calculate dose 
        if (prescription_freq != "" && prescription_number_of_days != "") {
            //show scheduled time 
            $('#prescription_scheduled_time').removeClass('d-none');

            //Show dose span 
            $('#scan_frequency_span').removeClass('d-none');

            //Cal dose 
            $('#prescription_dose_text').text(prescription_number_of_days * dose_per_day);







        }




    })
</script>
<script type="text/javascript">
    function buildDicom(row){
        return \`
            <div style="position: absolute; top: 100px; left: 77vw; display: none" id="controls_\${row.id}">
            <div class="d-flex flex-column justify-content-between">
            <div class="row d-flex justify-content-between">
            </div>
            <button type="button" style="" class="btn btn-md btn-success"  onclick="javascript:zoomIn('dicomImage\${row.id}', event );">Zoom In</button> 
            <button type="button" style="" class="btn btn-md btn-primary mt-3" onclick="javascript:zoomOut('dicomImage\${row.id}', event);">Zoom out</button> 
            <button type="button" style="" class="btn mt-3 btn-md btn-warning" onclick="javascript:invert('dicomImage\${row.id}');">Toggle Invert</button>
            <button type="button" style="" class="btn mt-3 btn-md btn-info" onclick="javascript:interpolation('dicomImage\${row.id}');">Toggle Interpolation</button>
            <button type="button" style="" class="btn mt-3 btn-md btn-secondary" onclick="javascript:hflip('dicomImage\${row.id}');">Horizontal Flip</button>
            <button type="button" style="" class="btn mt-3 btn-md btn-dark" onclick="javascript:vflip('dicomImage\${row.id}');">Vertical Flip</button>
            <button type="button" style="" class="btn mt-3 btn-md btn-danger" onclick="javascript:rotate('dicomImage\${row.id}');">Rotate 90</button>
            <button type="button" style="" class="btn mt-3 btn-md btn-success" onclick="javascript:resize('dicomImage\${row.id}');">Resize</button>
            </div>
            </div>
            <div class="col-md-12" id="dicomZone" style="">
            <div class="col-md-12 mt-3 mb-3" id="dicomZoneButtons" style=""></div>
            <div id="dicomImage\${row.id}" style="width:100%;height:512px"
                    oncontextmenu="return false"
                    onmousedown="return false">
                    <div id="dicomImage\${row.id}_zoom" class="overlay" style="position:absolute;bottom:0px;right:20px;color:white;font-weight:bold;font-size:13px">
                    </div>
                    <div id="topleft" class="overlay" style="position:absolute;top:10px;left:14px;color:white;font:#FFD700">
                        <div class="d-flex flex-column">
                             <span>Name: <!-- php: = $patient->first_name.' '. $patient->last_name --></span>
                             <span>Age: <!-- php: =isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> </span>
                             <span>Sex: <!-- php: =isset( $patient->gender)? $patient->gender->name : "" --></span>
                        </div>
                    </div>
            </div>
            </div>
        \`
    }
    

    function buildDicomImageSelector(scan_file, row, button_number){
        return \`
            <div id="imageButton\${scan_file.id}" type="button" onclick="javascript:loadAndViewImage(('\${scan_file.file_format.toLowerCase().includes('dicom') ? 'wadouri:' : window.location.origin}<!-- php: = $this->Url->build('/img/') -->\${scan_file.file_path}'), 'dicomImage\${row.id}');$('#controls_\${row.id}').show(200);window.onresize = function() {resize('dicomImage\${row.id}');};" class="btn btn-link">
            Image \${button_number + 1}
            </div>
        \`
    }

    function buildModalTop(row, count) {
        return \`
            <div class="modal fade" id="scanImage_\${row.id}" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document"  style="min-width:80vw">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLongTitle">Files for Scan: \${count}</h4>
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
                                                <h4>Scans: (\${count})</h4>
        \`
    }

    function buildModalBottom() {
        return '</div></div></div></div></div></div></div></div></div></div></div>'
    }
    function requestedScanTableGenerator() {
        table = $('#scanDataTable2').DataTable();
        table.destroy();
        $('#scanDataTable2').DataTable({
            "ordering": false,
            "processing": '<!-- php: = $continuousCare -->',
            "serverSide": '<!-- php: = $continuousCare -->',
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllRadiologyRequests' : 'getRadiologyRequests', $patient->id, $selectedVisit->id, ]) -->",
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "date_created",
                    render: function(data, type, row) {
                        return moment(data).format('DD/MM/YYYY, hh:mm A')
                    }
                },
                {data: "radiology_category.name"},
                {data: "radiology_scan.name"},
                {
                    data: "radiology_scan.name",
                    render: function (data, type, row) {
                        return \`\${row?.completed || 0} / \${row?.frequency || 0}\`
                    }
                },
                {
                    data: "invoice_items",
                    render: function (data, type, row) {
                        result = ''
                        if (Array.isArray(data) && data && data.length > 0) {
                            data.forEach(invoiceItem => {
                                result += \`
                                <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
                                    <span class="mdl-chip__contact mdl-color--\${ invoiceItem?.insurance_profile_policy_id != -1 ? 'orange' : (invoiceItem?.status_id == 27 ? 'green' : 'red')} mdl-color-text--white">
                                        <i class="fa fa-\${invoiceItem?.insurance_profile_policy_id != -1 ? 'credit-card' : (invoiceItem?.status_id == 27 ? 'money' : 'question')}"></i>
                                    </span>
                                    <span class="mdl-chip__text">
                                        <strong>\${invoiceItem?.insurance_profile_policy_id != -1 ? 'Insurance' : (invoiceItem?.status_id == 27 ? 'Paid' : 'Not Paid')}: </strong>
                                    </span>
                                    <span class="mdl-chip__text" style="float: right;">
                                        GHS \${invoiceItem?.final_amount}
                                    </span>
                                </span>
                                <br />
                                \`
                            });
                        }
                        return result;
                    }
                },
                {data: "status.name"},
                {
                    data: "radiology_category.name",
                    render: function(data, type, row) {
                        count = 0;
                        if (row.radiology_scan_results.filter(e => e.normal_value === 'Link to Images').length > 0) {
                            if (row?.radiology_scan_results && row?.radiology_scan_results.length > 0) {
                                count = row?.radiology_scan_results?.map(x => {
                                    return x?.radiology_scan_files?.length || 0
                                }).reduce(function(a, b){
                                    return a + b;
                                }, 0);
                            }
                            modalbody='';
                            modalbody+=(buildModalTop(row, count))

                            if (row?.radiology_scan_results && row?.radiology_scan_results.length > 0 && Array.isArray(row.radiology_scan_results)) {
                                row?.radiology_scan_results?.forEach((scan_result, index, result_row) => {
                                    if(scan_result?.normal_value === 'Link to Images'){
                                        scan_result?.radiology_scan_files?.forEach((scan_file, index) => {
                                            modalbody+=(buildDicomImageSelector(scan_file, row, index))
                                        });
                                        modalbody+=(buildDicom(row))
                                    }
                                })
                            }
                            modalbody+=(buildModalBottom())
                            $('#scanModals').append(modalbody)
                            return \`
                                <a type="button" href="javascript:" data-toggle="modal" data-target="#scanImage_\${row.id}" class="btn btn-primary btn-xs" data-whatever="\${count}">
                                    View Files (\${count})
                                </a>
                            \`
                        }else{
                            return 'No Image'
                        }
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                    //     if(row.request_radiologies.length > 0 ){
                    //     return \`\${row ?.request_radiologies[0]?.occurence + '/' + row?.request_radiologies[0]?.occurence_end || ''}\`
                    //    } else {
                        return '';
                    //    }
                    }
                },
                {
                    data: "status_id",
                    render: function(data, type, row) {
                        result = ''
                        <!-- php: if($isCurrentVisit): -->
                            if (![23, 24].includes(data) && row.patient_visit_id == '<!-- php: = $selectedVisit->id -->') {
                                result +=
                                \`
                                    <form method="post" action="<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'cancelRequestRadiology']) -->/\${row.id}" class="cancelForm" onsubmit="return cancelForm(this, \${row.id}, 'scanDataTable2');">
                                        <button class="btn btn-link" type="submit" name="submit_param" value="submit_value">
                                            Cancel
                                        </button>
                                    </form>
                                \`
                            }
                        <!-- php: endif; -->
                        <!-- php: // if ($isCurrentVisit) { -->
                        <!-- php: // } -->
                        if (data == 23) {
                            result += \`
                                <a target="_blank" href="<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'patientReport']) -->/\${row.id}" class="btn btn-xs btn-outline" escape=false>
                                    View
                                </a>
                            \`
                        }
                        return result
                    }
                },
            ]
        });
    };

    function cancelForm(e, id, table){
        // e.preventDefault(),
        console.log(e)
        var action = e.action
        console.log(action)
        if(confirm(\`Are you sure you want to delete #\${id}?\`)){
            makeRequest(action, [], method = 'POST', table)
        }
        return false
    }
</script>

<script>

    function labModalTop(row, count) {
        return \`
        <div class="modal fade" id="labImage_\${row.id}" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="">Files for Lab: \${row?.lab_test?.name}</h4>
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
                                                    <h4>Images: (\${count})</h4>
        \`
    }

    function buildlabImageSelectors(file) {
        return \`
            <div class="section-image img-responsive" style="width: 150px; text-align: center;">
            <a target="_blank" href="<!-- php: = $this->Url->build('/img/') -->/\${file}">
                <img src="<!-- php: = $this->Url->build('/img/') -->/\${file}" alt="" style="width:100%">
            </a>
            </div>
        \`
    }

    function buildlabFileSelectors(name, file, type) {
        return \`
            <div class="section-image img-responsive" style="width: 150px; text-align: center;">
            <h5>\${name}</h5>
            <a target="_blank" href="<!-- php: = $this->Url->build('/img/') -->\${file}">
                <img src="<!-- php: = $this->Url->build('/img/') -->\${type == 'application/pdf' ? './../assets/img/pdf.png' : './../assets/img/excel.png'}" alt="" style="width:90px">
            </a>
            </div>
        \`
    }

    function configureModalForUser(name,items) {
        let result = ''
        items.forEach(file => {
            if (file.type== 'img') {
                result += buildlabImageSelectors(file.file_path)
            } else {
                result += buildlabFileSelectors(file.name, file.file_path, file.file_type)
            }
        });

        $('#lab_test_name_id').html(name)
        $('#lab_test_files').html(result)
        
    }

    function labModalBottom() {
        return \`</div></div></div></div></div></div></div></div></div></div></div>\`
    }
</script>


<script type="text/javascript">
    function requestedLabTableGenerator() {
        return
        table = $('#labs_table1').DataTable();
        table.destroy();
        $('#labs_table1').DataTable({
            "ordering": false,
            "processing": '<!-- php: = $continuousCare -->',
            "serverSide": '<!-- php: = $continuousCare -->',
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllRequestLabs' : 'getRequestLabs', $patient->id, $selectedVisit->id, ]) -->",
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row?.investigation?.name || ''}\`
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row?.lab_test?.name || ''} \${row?.source ? \`<span class="badge badge-primary">\${row?.source}</span>\` : ''}\`
                    }
                },
                {
                    data: "date_created",
                    render: function(data, type, row) {
                        return moment(data).format('DD/MM/YYYY, hh:mm A')
                    }
                },
                {
                    data: "invoice_items",
                    render: function (data, type, row) {
                        result = ''
                        if (data && data.length > 0 && Array.isArray(data)) {
                            data.forEach(invoiceItem => {
                                result += \`
                                <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
                                    <span class="mdl-chip__contact mdl-color--\${ invoiceItem?.insurance_profile_policy_id != -1 ? 'orange' : (invoiceItem?.status_id == 27 ? 'green' : 'red')} mdl-color-text--white">
                                        <i class="fa fa-\${invoiceItem?.insurance_profile_policy_id != -1 ? 'credit-card' : (invoiceItem?.status_id == 27 ? 'money' : 'question')}"></i>
                                    </span>
                                    <span class="mdl-chip__text">
                                        <strong>\${invoiceItem?.insurance_profile_policy_id != -1 ? 'Insurance' : (invoiceItem?.status_id == 27 ? 'Paid' : 'Not Paid')}: </strong>
                                    </span>
                                    <span class="mdl-chip__text" style="float: right;">
                                        GHS \${invoiceItem?.final_amount}
                                    </span>
                                </span>
                                <br />
                                \`
                            });
                        }
                        return result;
                    }
                },
                {
                    data: "status.name",
                    render: function (data, type, row) {
                        return row?.status?.name || ''
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        count = 0;

                        if ((row?.lab_images && row?.lab_images.length > 0 && Array.isArray(row.lab_images)) || (row?.lab_files && row?.lab_files.length > 0 && Array.isArray(row.lab_files))) {
                            count = ((row?.lab_images.length || 0) + (row?.lab_files.length || 0))
                            modalbody=[];
                            // modalbody+=(labModalTop(row, count))
                            if (row?.lab_images && row.lab_images.length > 0 && Array.isArray(row.lab_images)) {
                                row.lab_images.forEach((lab_image, index, result_row) => {
                                    let info = {
                                        name: lab_image.name,
                                        file_path: lab_image.file_path,
                                        file_type: lab_image.file_type,
                                        type:'img'
                                    }
                                    modalbody.push(info)
                                })
                            }
                            if (row?.lab_files && row.lab_files.length > 0 && Array.isArray(row.lab_files)) {
                                row.lab_files.forEach((lab_file, index, result_row) => {
                                    let info = {
                                        name: lab_file.name,
                                        file_path: lab_file.file_path,
                                        file_type: lab_file.file_type,
                                        type:'file'
                                    }
                                    modalbody.push(info)
                                })
                            }
                            // modalbody+=(labModalBottom())

                            // var newDiv = document.createElement("div");

                            // // Add a class to the new div for styling

                            // newDiv.id = row.id;

                            // // Optionally, set other attributes or styles
                            // newDiv.innerHTML = modalbody;

                            // // Append the new div to an existing element in the DOM
                            // let div_to_remove = document.getElementById(row.id)
                            // let container = document.getElementById("labModals");
                            // if (div_to_remove) {
                            //     container.removeChild(div_to_remove)
                            // }
                            // container.appendChild(newDiv);

                            return \`
                                <a type="button" href="javascript:" data-toggle="modal" data-target="#cookingModal" onclick="configureModalForUser('\${row.lab_test?.name}',\${JSON.stringify(modalbody).replace(/"/g, "'")})" class="btn btn-primary btn-xs">
                                    View Files (\${count})
                                </a>
                            \`
                        }else{
                            return 'No Image'
                        }
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                       if(row.request_labs_recurring.length > 0 ){
                        return \`\${row ?.request_labs_recurring[0]?.occurence + '/' + row?.request_labs_recurring[0]?.occurence_end || ''}\`
                       } else {
                        return '';
                       }
                    }
                },
                {
                    data: "status_id",
                    render: function(data, type, row) {
                        result = ''
                        <!-- php: if($isCurrentVisit): -->
                            if (![23, 24].includes(data) && row.patient_visit_id == '<!-- php: = $selectedVisit->id -->') {
                                result +=
                                \`
                                    <form method="post" action="<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'cancelRequestLab']) -->/\${row.id}" class="cancelForm" onsubmit="return cancelForm(this, \${row.id}, 'labs_table1');">
                                        <button class="btn btn-link" type="submit" name="submit_param" value="submit_value">
                                            Cancel
                                        </button>
                                    </form>
                                \`
                            }
                        <!-- php: endif; -->
                        <!-- php: // if ($isCurrentVisit) { -->
                        <!-- php: // } -->
                        if (data == 23) {
                            result += \`
                                <a target="_blank" href="<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'patientVisitReport', $selectedVisit->id]) -->" class="btn btn-xs btn-outline" escape=false>
                                    View
                                </a>
                            \`
                        }
                        return result
                    }
                },
            ]
        });
    };

    function cancelForm(e, id, table){
        // e.preventDefault(),
        console.log(e)
        var action = e.action
        console.log(action)
        if(confirm(\`Are you sure you want to delete #\${id}?\`)){
            makeRequest(action, [], method = 'POST', table)
        }
        return false
    }
</script>

<script>
    //dante code
    //get content for request lab modal
    
	$('#lab_test_id').on('change', function(){
        $("#labs_internal_recurring").text($(this).find(':selected').text());
	});
	$("#priority_id").on("change", function(){
       $("#priority_recurring").text($(this).find(':selected').text());
	});
	$("#bill_to_id").on("change", function(){
       $("#bill_to_id_recurring").text($(this).find(':selected').text());
	});

    // get content for scan modal
    $('#radio_scan_id').on('change', function(){
        $("#radio_scan_recurring").text($(this).find(':selected').text());
	});
	$("#scan_priority_id").on("change", function(){
       $("#radio_scan_priority_recurring").text($(this).find(':selected').text());
	});
	$("#scan_bill_to_id").on("change", function(){
       $("#scan_bill_to_id_recurring").text($(this).find(':selected').text());
	});

    // Lab Request Form(Recurring)
    $('#recurring-lab-requests-form').on('submit', function(e){
		e.preventDefault();
		//   var data = $('#recurring-followups-form').val();
		//   console.log(data);
		// console.log('pls dont submit');
		var data = $(this).serialize();
		//var lab_test_id = $('#lab_test_id').val();
		var priority_id = $("#priority_id").children('option:selected').val();
		var lab_test_id = $("#lab_test_id").children('option:selected').val();
		var bill_to_id = $("#bill_to_id").children('option:selected').val();

        var lab_request_data = $("#labForm").serialize();


		var recur_data = data + "&"+lab_request_data;
		console.log(recur_data);
		$.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( ['controller' => 'RequestLabs', 'action' => 'addRecurringRequestLab', $patient->id, $selectedVisit->id ] ); -->",
			data:recur_data,
			cache: false,
			dataType: 'HTML',
			beforeSend: function(){
				console.log('fetching data')
			},
			success: function (response){
				console.log(response);
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Recurring Request Labs added successfully');
					$('#labs_table1').DataTable().ajax.reload();
                    $("#priority_id").selectpicker('deselectAll');
                    $("#lab_test_id").selectpicker('deselectAll');
                    $("#bill_to_id").selectpicker('deselectAll');
                    $("#labs_internal_recurring").text("");
                    $("#priority_recurring").text("");
                    $("#bill_to_id_recurring").text("");
				}else{
					alertify.error('Something went wrong, please try again');
				}
				$('#lab_requests_recurring').modal('hide');
			}
		});
	});

    //Scan Form(Recurring)
    $('#recurring-scans-form').on('submit', function(e){
		e.preventDefault();
		//   var data = $('#recurring-followups-form').val();
		//   console.log(data);
		// console.log('pls dont submit');
		var data = $(this).serialize();
		//var lab_test_id = $('#lab_test_id').val();
		var radio_scan_id = $("#radio_scan_id").children('option:selected').val();
		var scan_priority_id = $("#scan_priority_id").children('option:selected').val();
		var scan_bill_to_id = $("#scan_bill_to_id").children('option:selected').val();

        var lab_request_data = $("#scanForm").serialize();


		var recur_data = data + "&"+lab_request_data;
		console.log(recur_data);
		$.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestRadiologies', 'action' => 'addRequestRadiologyRecurring', $patient->id, $selectedVisit->id ] ); -->",
			data:recur_data,
			cache: false,
			dataType: 'HTML',
			beforeSend: function(){
				console.log('fetching data');
			},
			success: function (response){
				// console.log(response);
				// var res = JSON.parse(response);
				// if(res == 1){
					alertify.success('Recurring Radiology Scans added successfully' + reponse);
					$('#scanDataTable2').DataTable().ajax.reload();
                    // $("#priority_id").selectpicker('deselectAll');
                    // $("#lab_test_id").selectpicker('deselectAll');
                    // $("#bill_to_id").selectpicker('deselectAll');
                    // $("#labs_internal_recurring").text("");
                    // $("#priority_recurring").text("");
                    // $("#bill_to_id_recurring").text("");
                    var radio_scan_id = $("#radio_scan_id").val("");
                    var scan_priority_id = $("#scan_priority_id").val("");
                    var scan_bill_to_id = $("#scan_bill_to_id").val("");
				// }else{
				// 	alertify.error('Something went wrong, please try again');
				// }
				$('#scans_recurring').modal('hide');
			}
		});
	});

    function populateFrequentlySuggestedLabs() {
        return
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'getFrequentlyRequestedLabs']) -->",
			success: function g(data, textStatus) {
                let result = []
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(ele => {
                        result.push(\`
                            <li class="list-group-item">
                                <div class="todo-indicator bg-success"></div>
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">

                                        <div class="widget-content-left">
                                            <div class="widget-heading">
                                                \${ele.name}
                                            </div>
                                            <div class="widget-subheading"><i>\${ele.investigation}</i></div>
                                        </div>
                                        <div class="widget-content-right">
                                            <button class="border-0 btn-transition btn btn-outline-success" onclick="submitFrequentLabRequest('\${ele.id}')">
                                                <i class="fa fa-check"></i> REQUEST
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        \`)
                    });
                }
				$('#frequentlyRequestLabList').html(result.join(""))
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}
    function populateFrequentlySuggestedScans() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'getFrequentlyRequestedScans']) -->",
			success: function g(data, textStatus) {
                let result = []
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(ele => {
                        result.push(\`
                            <li class="list-group-item">
                                <div class="todo-indicator bg-success"></div>
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">

                                        <div class="widget-content-left">
                                            <div class="widget-heading">
                                                \${ele.name}
                                            </div>
                                        </div>
                                        <div class="widget-content-right">
                                            <button class="border-0 btn-transition btn btn-outline-success" onclick="submitFrequentScanRequest('\${ele.id}')">
                                                <i class="fa fa-check"></i> REQUEST
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        \`)
                    });
                }
				$('#frequentlyRequestScanList').html(result.join(""))
			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

    function submitFrequentLabRequest(id) {
        let action = "<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'addRequestLab', $patient->id, $selectedVisit->id]) -->"
        let data = [
            {
                "name": "lab_tests[]",
                "value": id
            },
            {
                "name": "priority_id",
                "value": "4"
            },
            {
                "name": "bill_to_id",
                "value": $("#global_bill_to").val()
            },
            {
                "name": "repeat_prescription",
                "value": "0"
            },
            {
                "name": "patient_pregnancy_id",
                "value": ""
            }
        ]
        submitRequestScan(action, data, "labs_table1")
    }
    function submitFrequentScanRequest(id) {
        let action = "<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiology', $patient->id, $selectedVisit->id]) -->"
        let data = [
            {
                "name": "radioScans",
                "value": id
            },
            {
                "name": "priority_id",
                "value": "4"
            },
            {
                "name": "bill_to_id",
                "value": $("#global_bill_to").val()
            },
            {
                "name": "service_place_id",
                "value": "0"
            },
            {
                "name": "patient_pregnancy_id",
                "value": ""
            }
        ]
        submitRequestScan(action, data,"scanDataTable2")
    }
</script>
<script>
    $("#repeat_prescription").on("change", function(){
       $("#lab_imaging_service_place").text($(this).find(':selected').text());
    });
    $("#scan_service_place_id").on("change", function(){
       $("#radio_service_place").text($(this).find(':selected').text());
    });
</script>


`;

export default function ElementElementPatientvisitChiroRequestlabservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
