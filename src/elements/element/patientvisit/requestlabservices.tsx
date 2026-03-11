const rawHtml = `
<!-- php: $billTo = null; $requestLabs = isset($requestLabs) ? $requestLabs : $selectedVisit->request_labs; -->

<!--Lab Table section-->
<section class="mb-5">


    <h4 class="col-md-12" id="labTableDescription">

        <span>
            <a target="_blank" href="<!-- php: = Cake\Routing\Router::url(['controller' => 'RequestLabs', 'action' => 'patientVisitReport', $selectedVisit->id]) -->" class="btn btn-xs btn-outline" escape=false>
                PDF Report
            </a>
        </span>

        <span>
            <a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'RequestLabs', 'action' => 'emailPatientVisitReport', $selectedVisit->id, '?' => ['send_email' => '1']]) -->" class="btn btn-xs btn-primary" escape=false>
                Email Report
            </a>
        </span>


    </h4>

    <div class="table-scrollable" id="labTableData1">
        <table class="table table-hover order-column full-width" id="labs_table1" style="width: 100%">
            <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Lab Test</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Cost (GHS)</th>
                    <th scope="col">Status</th>
                    <th scope="col">Files</th>
                    <th scope="col">Activity</th>
                    <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

        <div class="" id="labModals">
            <div class="modal fade show" id="cookingModal" tabindex="-1" role="dialog" aria-labelledby="select">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalLongTitle">Files for: <span id="lab_test_name_id"></span> </h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
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
                                                        <h4>Files and Images</h4>
                                                        <div id="lab_test_files" class="d-flex align-items-center"></div>
                                                    

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
        </div>
    </div>

    <br />




    <hr class="mt-3" />

</section>







<div class="row">


<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->

    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestLabs', 'action' => 'addRequestLab', $patient->id, $selectedVisit->id], 'id' => 'labForm', 'class' => 'my-5 col-md-6', 'style' => '']); -->
        <h3>Make a new Lab Request</h3>
        <!-- php: // default to patient if no provider is found $billTo = $selectedVisit->has('patient_insurance_profile_policy') ? $selectedVisit->patient_insurance_profile_policy->insurance_profile_policy_id : -1; -->
        <div class="form-body">


            <!-- php: if (Cake\Core\Configure::read('REQUEST_LAB_LAYOUT', 1) == 1) { -->
                <!--Outsourced slider-->
                <div class="form-group row">
                    <label class="control-label col-md-3">Outsourced
                        <span class="required" aria-required="true"> * </span>
                    </label>
                    <div class="col-md-9">
                        <label class="switchToggle">
                            <input type="checkbox" name="in_house_medication_status" onclick="updateMedicationType(this.checked);">
                            <span class="slider green round"></span>
                        </label>
                    </div>
                </div>

                <!--Lab Test - internal -->
                <div class="form-group row">
                    <label class="control-label col-md-3">Lab Tests (Internal)
                        <span class="required"> * </span>
                    </label>
                    <div class="col-md-9" style="min-height: 50px">
                        <input class="input-box" name="searchValue" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ced4da; " class="form-control" id="search-lab-test-box" placeholder="Search Lab Test" />
                    </div>
                    <div class="offset-md-3 col-md-9">
                        <SearchableSelectField class="form-control form-control-lg selectpicker show-menu-arrow show-tick" style="height: 70px;size: 10;"  data-height="100%" data-size="5" name="lab_tests[]" id="lab_test_id" title="Selected lab tests" data-live-search="true" required multiple>
    
                        </SearchableSelectField>
                    </div>

                </div>
            <!-- php: } else { -->
                <div class="row">
                    <label class="control-label col-md-12">Lab Tests
                        <span class="required"> * </span>
                    </label>
                </div>

                <hr />

                <!-- php: $totalTests = sizeof($labTests); $labCount = 0; -->
                <div class="form-group row">
                    <!-- php: foreach ($labTests as $labTest) { -->
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-9">
                                    <label><!-- php: = $labTest->name --></label>
                                </div>
                                <div class="col-md-3">
                                    <label class="switchToggle">
                                        <input type="checkbox" <!-- php: = isset($lab) ? 'checked' : '' --> value="<!-- php: = $labTest->id -->" name="lab_tests[]">
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
                <div class="col-md-9">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="priority_id" data-max-options="1" id="priority_id" multiple required>
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
                <div class="col-md-9">

                    <SearchableSelectField class="form-control input-height patient_insurance_setters show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="bill_to_id" required>
                    </SearchableSelectField>
                </div>
            </div>


            <!--Service Place-->
            <div class="form-group row">
                <label class="control-label col-md-3">Service Place
                    <span class="required"> * </span>
                </label>
                <div class="col-md-9">
                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-required="1" data-size="5" class="form-control input-height" onchange="javascript:updateRefillDate(value);" name="repeat_prescription" id="repeat_prescription" data-max-options="1" multiple required>
                        <option value="">Select...</option>
                        <option value="0" selected>Place 1</option>
                        <option value="1">Place 2</option>
                    </SearchableSelectField>
                </div>
            </div>
           
            </div>


            <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]); -->

            <div class="row">
                <div class="offset-md-3 col-md-8">
                    <button type="submit" class="btn btn-info">Submit</button>
                    <button type="button" class="btn btn-default" onclick='clearLabsForm()'>Reset</button>
                    <!-- php: if($this->AuthUser->hasAccess(['controller' => 'RequestLabs', 'action' => 'addRecurringRequestLab'])) { -->
                    <button class="btn text-slate-900" style="background-color: #8e44ad" type="button" data-toggle="modal" data-target="#lab_requests_recurring"><i class="fa fa-clock-o"></i>&nbsp; Make Labs Recurring for Routine Care </button>
                    <!-- php: } -->
                </div>
            </div>
        <!-- </div> -->
    <!-- php: = $this->Form->end() -->


<!-- php: } -->

<!--card section-->
<div class="col-md-6 row mt-3 d-flex justify-content-center">
    <!--FREQUENTLY REQUESTED LABS section-->
    <div class="col-md-12">
        <div class="card bg-light mb-3 with-transform " style="border-radius: 10px; min-height: 420px;">
            <div class="card-header" style="border-radius:10px;font-weight: bold;">FREQUENTLY REQUESTED LABS</div>
            <div class="card-body" style="padding: 4px !important;">

                <!--frequently requested list-->
                <div class="col-md-12">
                    <div class="card-hover-shadow-2x  ">

                        <div class="scroll-area-sm">
                            <perfect-scrollbar class="ps-show-limits">
                                <div style="position: static;" class="ps ps--active-y">
                                    <div class="ps-content">
                                        <ul class=" list-group list-group-flush" id="frequentlyRequestLabList">

                                            <li class="list-group-item">
                                                <div class="todo-indicator bg-success"></div>
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                        <div class="widget-content-left mr-2">
                                                            <div class="custom-checkbox custom-control"><input class="custom-control-input" id="inestigation_exampleCustomCheckbox2" type="checkbox"><label class="custom-control-label" for="inestigation_exampleCustomCheckbox2">&nbsp;</label></div>
                                                        </div>
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading">Full Blood Count With Film Comment (Manual) <div class="badge badge-danger ml-2">Full</div>
                                                                <div class="widget-subheading">Haematology</div>
                                                                <div>
                                                                    <div class="badge badge-pill badge-info ml-2 d-none">NEW</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="widget-content-right"> <button class="border-0 btn-transition btn btn-outline-success"> <i class="fa fa-check"></i></button> <button class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i> </button> </div>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </perfect-scrollbar>
                        </div>

                    </div>
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
					       <p id="labs_internal_recurring" ></p>
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
					       <p id="lab_imaging_service_place" ></p>
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
    const labContinuousCare = '<!-- php: = $continuousCare -->';
    const labCurrentVisit = '<!-- php: = $isCurrentVisit -->';
    const LabsbillTo = "<!-- php: = $billTo -->";
    const LabsSelectedVisit = '<!-- php: = $selectedVisit->id -->';
    const LabsName = "<!-- php: = $patient->first_name.' '. $patient->last_name -->";
    const LabsAge = "<!-- php: =isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" -->";
    const LabsSex = "<!-- php: =isset( $patient->gender)? $patient->gender->name : "" -->";
    const searchLabTests_link = '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'searchLabTests']) -->'
    const getLabTests_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getLabTests']) -->"
    const getRadioScans_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRadioScans']) -->"
    const getRadiologyRequests_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllRadiologyRequests' : 'getRadiologyRequests', $patient->id, $selectedVisit->id, ]) -->"
    const cancelRequestRadiology_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'cancelRequestRadiology']) -->\`
    const patientReport_link = \`<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'patientReport']) -->\`
    const lab_img_url_link = '<!-- php: = $this->Url->build('/img/') -->'
    const getRequestLabs_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => $continuousCare ? 'getAllRequestLabs' : 'getRequestLabs', $patient->id, $selectedVisit->id, ]) -->"
    const cancelRequestLab_link = '<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'cancelRequestLab']) -->'
    const patientVisitReport_link = "<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'patientVisitReport', $selectedVisit->id]) -->"
    const addRecurringRequestLab_link = "<!-- php: echo $this->Url->build( ['controller' => 'RequestLabs', 'action' => 'addRecurringRequestLab', $patient->id, $selectedVisit->id ] ); -->"
    const getFrequentlyRequestedLabs_link = "<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'getFrequentlyRequestedLabs']) -->"
    const getFrequentlyRequestedScans_link = "<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'getFrequentlyRequestedScans']) -->"
    const addRequestLab_link = "<!-- php: = $this->Url->build(['controller' => 'RequestLabs', 'action' => 'addRequestLab', $patient->id, $selectedVisit->id]) -->"
    const addRequestRadiology_link = "<!-- php: = $this->Url->build(['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiology', $patient->id, $selectedVisit->id]) -->"
    const addRequestRadiologyRecurring_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'RequestRadiologies', 'action' => 'addRequestRadiologyRecurring', $patient->id, $selectedVisit->id ] ); -->"

</script>
<!-- php: = $this->Html->script('../assets/js/pages/visit_space/requestlabservices.js') -->
`;

export default function ElementElementPatientvisitRequestlabservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
