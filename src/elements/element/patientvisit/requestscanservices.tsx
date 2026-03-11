const rawHtml = `
<!-- php: $billTo = null; -->

<!--Lab Table section-->
<section class="mb-5">

  <h4 class="col-md-12" id="scanTableDescription">
    <span>
      <a target="_blank" href="<!-- php: = Cake\Routing\Router::url(['controller' => 'RequestLabs', 'action' => 'patientVisitReport', $selectedVisit->id]) -->" class="btn btn-xs btn-outline" escape=false>
        PDF Report
      </a>
    </span>

    <span>
      <a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'RequestLabs', 'action' => 'emailReport', $selectedVisit->id]) -->" class="btn btn-xs btn-primary" escape=false>
        Email Report
      </a>
    </span>


  </h4>

  <div class="table-scrollable" id="scanTableData">
    <table class="table table-hover order-column full-width" id="scanDataTable2">
      <thead>
        <tr>
          <th scope="col">Date Created</th>
          <th scope="col">Category</th>
          <th scope="col">Scan</th>
          <th scope="col">Frequency</th>
          <th scope="col">Cost (GHS)</th>
          <th scope="col">Status</th>
          <th scope="col">Files</th>
          <th scope="col">Activity</th>
          <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <div id="scanModals"></div>
  </div>


</section>







<div class="row">


<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->

  <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiology', $patient->id, $selectedVisit->id], 'id' => 'scanForm', 'class' => 'row col-md-6 p-2', 'style' => '']); -->
  <div class="form-body col-md-12 p-3">
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

        <SearchableSelectField class="form-control input-height patient_insurance_setters show-menu-arrow show-tick" data-size="5" data-live-search="true" class="form-control input-height" name="bill_to_id" id="scan_bill_to_id" data-max-options="1" multiple required>
        </SearchableSelectField>
      </div>
    </div>




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
        <!-- php: if ($this->AuthUser->hasAccess(['controller' => 'RequestRadiologies', 'action' => 'addRequestRadiologyRecurring'])) { -->
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
  <!-- php: = $this->Form->end() -->
  
  <!-- php: } -->
  <!--card section-->
<div class="col-md-6 mt-3 d-flex justify-content-center">

  <!--FREQUENTLY REQUESTED LABS section-->
  <div class="col-md-12">
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
          </div>
        </div>


      </div>

    </div>

  </div>


</div>
</div>
<div class="form-infomation col-md-5" id="process_instructions_id" style="height: 500px;overflow-y: auto;">

</div>



<div class="" id="my_alert_box">
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
                <p id="radio_scan_recurring"></p>
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
                <p id="radio_service_place"></p>
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
                class="fa fa-check text-success fa-1x"></i> </button> </form>

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
`;

export default function ElementElementPatientvisitRequestscanservices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
