const rawHtml = `
<style>
    .black_button {
        color:white;
        background: #6c757d;
    }
    .white_button {
        color:black;
        background: white;
    }
</style>
<div class="row">

    <div class="borderBox light bordered col-md-12">
        
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="actionable_tab">
                    <!-- <h4>Add a new Invoice</h4> -->

                    <div class="px-2">
                        <div  class="d-flex justify-content-end">
                            <a href="<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'index']) -->" target="_blank" class="btn btn-secondary " style="">
                                Create Appointment
                            </a>
                        </div>

                        <div class="row justify-content-center">
                            <div style="" class="container-fluid text-center p-3 mt-3 mb-2">
                                <div style="z-index:2;" class="container-fluid pl=0">
                                    <div class="row justify-content-between">
                                        <div class="pl-0">
                                            <button style="background:transparent;" onclick="resetRoutineCare()" class="btn btn-xs d-flex align-items-center">
                                                <i class="fa fa-refresh"></i>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important" class="font-weight-bold">Reset</h5></button>
                                        </div>
                                        <div class=" pl-0">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('>30days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#8e44ad;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">>30 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('21-28days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#3867d6;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">21-29 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('14-21days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#26de81;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">14-21 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('7-14days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#fff200;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">7-14 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('0-7days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:tomato;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">0-7 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('overdue')" style="background-color:#ff634712" class="btn btn-xs d-flex align-items-center">
                                                <!-- <div style="height:15px;width:15px;border-radius:100px;cursor:pointer;" class="indicator bg-danger"></div> -->
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold text-danger">Overdue</h5></button>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                </div>
                                    <div class="table-responsive mt-2">
                                        <table id="work-order-table" class="table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Appointment Date</th>
                                                    <th>Appointee</th>
                                                    <th>Department/Specialty</th>
                                                    <th>doctor</th>
                                                    <th>email/phone</th>
                                                    <th>Next Assignment</th>
                                                    <th>actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="patient-routine-table"></tbody>
                                        </table>
                                        <input type="hidden"  id="mdc_selector">

                                    </div>

                                </div>
                        </div>
                    </div>

                </div>


                <div class="tab-pane" id="snoozed_tab">
                    <!-- border border-left-0 border-right-0 border-bottom-0 border-3 border-primary  -->
                    <div class="card mt-3  card-box">
                        <div class="card-body">
                            <div class="container-fluid py-2 mt-4">

                                <div class="table-responsive mt-2">



                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>
<div class="modal fade" id="cancel_routine" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-danger">
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Are you sure you want to cancel Booking ?</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <h4 class="text-secondary">This Booking will be cancelled and cannot be undone</h4>
                   <form id="cancelRoutineCareForm">
                    <div class="d-flex align-items-center">

    
                        <label>Inform Patient of Reschedule?</label>
                        <div class="d-flex justify-content-center ml-1">
                            <div>
                                <input type="radio" class="" name="inform_patient" value="email" id="email">
                                <label for="email">Email</label>
                            </div>
                            <div>
                                <input type="radio" class="" name="inform_patient" value="sms" id="sms">
                                <label for="sms">SMS</label>
                            </div>
                            <div>
                                <input type="radio" class="" name="inform_patient" value="autocall" id="autocall">
                                <label for="autocall">Autocall</label>
                            </div>
                            <div>
                                <input type="radio" class="" name="inform_patient" value="none" id="none">
                                <label for="none">None</label>
                            </div>
                        </div>
                        
                    </div>
                    <div class="row align-items-center">
                        <label class="col-md-3" style="text-align: right" for="cancellation_reason">Reason:</label>

                        <input type="text" name="reason" id="cancellation_reason" class="form-control col-md-7">
                    </div>
                </div>
            </div>
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center py-1 justify-content-end">
                
               <!-- php: //= $this->Form->create(null, ['id'=>'cancelRoutineCareForm','url' => ['controller' => 'Patients', 'action' => 'canceRoutineCare']]); -->
               <input type="hidden" name="id" id="cancel_id"/>
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                  <!-- php: //= $this->Form->end() -->
                  </form>
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="reschedule_routine" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-danger">
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Are you sure you want to reschedule routine care ?</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
            <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Book', 'action' => 'updateBooking']]); -->
                <div>
                    <div class="container-fluid pl-0">
                        <div class="row justify-content-center">
                            <div class="col-md-12 justify-content-center d-flex align-items-center">
    
                                    <label>Inform Patient of Reschedule?</label>
                                    <div class="d-flex justify-content-center ml-1">
                                        <div>
                                            <input type="radio" class="" name="inform_patient" value="email" id="email">
                                            <label for="email">Email</label>
                                        </div>
                                        <div>
                                            <input type="radio" class="" name="inform_patient" value="sms" id="sms">
                                            <label for="sms">SMS</label>
                                        </div>
                                        <div>
                                            <input type="radio" class="" name="inform_patient" value="autocall" id="autocall">
                                            <label for="autocall">Autocall</label>
                                        </div>
                                        <div>
                                            <input type="radio" class="" name="inform_patient" value="none" id="none">
                                            <label for="none">None</label>
                                        </div>
                                    </div>

                            </div>
                            <div class="col-md-4">
                            </div>
                        </div>
                        <div class="row justify-content-center">

                            <div class="col-md-4">
                                <div class="form-group mt-3">
                                    <input type="date" name="appointment_time" value="<!-- php: echo date('Y-m-d'); -->" min='<!-- php: echo date('Y-m-d'); -->' class="form-control p-3" id="appointment_date" onchange="getDayFromDate()">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mt-3">
                                    <input type="text" readonly name="appointment_day" value="" class="form-control p-3" id="day-selected">
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid p-3 mt-4">
                            <div class="row" id="doctors-div">
                                
                            </div>
                            <!-- modal section -->
                            <div id="extra-doc-info-modal"></div>
                            <input type="text" id="time_slot_id" name="booking_timeslot_id" value="" class="form-control" hidden>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center py-1 justify-content-end">
              

               <input type="hidden" name="id" id="reschedule_id"/>
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                  <!-- php: = $this->Form->end() -->
                  </form>
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="create_visit" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <!-- php: = $this->Form->create(null, ['type' => 'file', 'id'=>'','url' => ['controller' => 'Book', 'action' => 'createAppointmentVisit']]); -->

            <div class="container px-0 border border-2 border-danger">
                <div class="container-fluid pr-0 bg-danger">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="text-slate-900 my-0">Create Visit</h4>
                    <div>
                        <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                    </div>
                </div>
                </div>
                <div class="container bg-white p-2">
                    <div class="container my-2">
                        <h4 class="text-secondary mb-2">Confirm Appointee Details In Order to Create Visit</h4>
                        <div class="row">
                            <div class="col-md-7" id="newPatient_insurance">
                                <span class="">Does Patient Have Insurance? </span>
                                <input name="sponsor_alternative" type="checkbox" onclick="$('#alt_div').toggle(500)" />
                                    
                            </div>
                            <div class="col-md-7" id="oldPatient_insurance">
                                <span class="">Does Patient Have Insurance? </span>
                                <SearchableSelectField style="width:100%" data-max-options="1"
                                    data-width="100%"
                                    class="form-control selectpicker show-menu-arrow show-tick"
                                    data-size="4" name="patient_insurance_profile_policy_id"
                                    id="patient_insurance_profile_policy_id" title="Select Insurance Policy"
                                    data-live-search="true" data-style="bg-white"
                                    onchange="changePaymentTypePatient(this, event)">
                                </SearchableSelectField>
                                <div class="form-group row" style="display:none" id="claimCode2">
                                    <label class="control-label col-md-4 text-right">
                                        Claim Code
                                        <!-- <span class="required"> * </span> -->
                                    </label>
                                    <div class="col-md-8">
                                        <!-- <input class="form-control text-area" name="claim_code" id="claim_code" placeholder="Mandatory for NHIS" required /> -->
                                        <input value="" type="text" minlength="5"
                                            maxlength="5" placeholder="Claim Code(Numeric)"
                                            name="claim_code2" class="" style="width:100%;"
                                            pattern="[0-9]+">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div  style="padding: 15px; border-radius: 5px" >
                    <div class="row p-2" id="alt_div" style="display: none">
                        <div class="col-md-12">

                            <div class="form-group row" id="provider_id_div">
                                <label class="control-label col-md-4">Sponsor
                                </label>
                                <div class="col-md-8">
                                    <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" onchange="return changePaymentType(this, event)" data-size="5" name="insurance_profile_policy_id" id="provider_id" onchange="javascript:updatePolicies(this.value);" title="Select sponsor" data-live-search="true" >
                                        <option value="">Select Type of Sponsor</option>
                                            <!-- php: foreach($providers as $provider) { -->
                                                <option value="<!-- php: = $provider->id -->" 
                                                    data-content="<!-- php: = $provider->insurance_profile->name --> <span class='badge badge-primary'><!-- php: = $provider->name --></span>  <span class='badge badge-danger'><!-- php: = $provider->insurance_profile->has('insurance_profile_type') ? $provider->insurance_profile->insurance_profile_type->name : '' --></span>"></option>
                                            <!-- php: } -->
                                    </SearchableSelectField>
                                </div>

                            </div>

                            <div class="form-group row" style="display:none" id="claimCode">
                                <label class="control-label col-md-4 text-right">
                                    Claim Code
                                    <!-- <span class="required"> * </span> -->
                                </label>
                                <div class="col-md-8">
                                    <!-- <input class="form-control text-area" name="claim_code" id="claim_code" placeholder="Mandatory for NHIS" required /> -->
                                    <input value="" type="text" minlength="5"
                                        maxlength="5" placeholder="Claim Code(Numeric)"
                                        name="claim_code" class="" style="width:100%;"
                                        pattern="[0-9]+">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-md-4">Membership Card Name
                                    <span class="required"> * </span>
                                </label>
                                <div class="col-md-8">
                                    <input name="insurance_card_name" value="" id="insurance_card_name"  type="text" placeholder="Insurance card name" data-required="1" class="form-control input-height" /> 
                                </div>

                            </div>	
                            <div class="form-group row">
                                <label class="control-label col-md-4">Card Serial Number
                                    <span class="required"> * </span>
                                </label>
                                <div class="col-md-8">
                                    <input name="insurance_card_serial" value="" id="insurance_card_serial"  type="text" placeholder="Insurance card serial number" data-required="1" class="form-control input-height" /> 
                                </div>

                            </div>	
                            <div class="form-group row">
                                <label class="control-label col-md-4">Membership ID
                                    <span class="required"> * </span>
                                </label>
                                <div class="col-md-8">
                                    <input name="insurance_number" value="" id="insurance_number"  type="text" placeholder="Insurance number" data-required="1" class="form-control input-height" /> 
                                </div>

                            </div>
                            <div class="form-group row">
                                <label class="control-label col-md-4">Scheme No
                                </label>
                                <div class="col-md-8">
                                    <input name="scheme_number" value="" id="scheme_number"  type="text" placeholder="Scheme number" class="form-control input-height" /> 
                                </div>

                            </div>	
                            <div class="form-group row">
                                <label class="control-label col-md-4">Co Pay
                                    <span class="required">  </span>
                                </label>
                                <div class="col-md-8">
                                    <label class="switchToggle">
                                        <input id="copay_check" type="checkbox" onclick="" >
                                        <span class="slider green round"></span>
                                    </label>
                                </div>
                                <input hidden type="text" id="copay" name="copay" value="0"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                    
                            <div class="form-group row">
                                <label class="control-label col-md-4"> Date of Issue
                                </label>
                                <div class="col-md-8">
                                    <div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                        <input class="form-control input-height" size="16" placeholder="YYYY-MM-DD" data-required="0" name = "date_of_issue" id = "date_of_issue" type="text" value="<!-- php: = isset($patient->patient_insurance_profile_policies) ? $patient->patient_insurance_profile_policies[0]->date_of_issue : '' -->" readonly >
                                        <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                    </div>
                                    <input type="hidden" id="dtp_input2" value="" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-md-4">Date of Renewal
                                </label>
                                <div class="col-md-8">
                                    <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                        <input class="form-control input-height" size="16" placeholder="YYYY-MM-DD" name = "date_of_renewal" id = "date_of_renewal" type="text" value="<!-- php: = isset($patient->patient_insurance_profile_policies) ? $patient->patient_insurance_profile_policies[0]->date_of_renewal : '' -->" readonly >
                                        <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-md-4">Upload Membership card
                                </label>
                                <div class="col-md-8">
                                    <input type="file" name="membership_card" id="membership_card" class="btn btn-circle" accept=".jpg,.jpeg" onchange="javascript:readURLCard(this, 'insurance-card-image');" class="btn btn-circle"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid pr-0 bg-danger">
                <div class="d-flex align-items-center py-1 justify-content-end">
                
                    <input type="hidden" name="id" id="create_visit_id"/>
                    <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                    <!-- php: = $this->Form->end() -->

                    <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="booking_details" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">

            <div class="container px-0 border border-2 border-danger">
                <div class="container-fluid pr-0 bg-danger">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="text-slate-900 my-0">Booking Details</h4>
                    <div>
                        <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                    </div>
                </div>
                </div>
                <div class="container bg-white p-2">
                    <div class="container my-2">
                        <h4 class="text-secondary mb-2">Booking Details</h4>
                        <div class="row" id="showBookingDetails">
                        </div>

                    </div>
                </div>
                <div class="container-fluid pr-0 bg-danger">
                    <div class="d-flex align-items-center py-1 justify-content-end">
                    
                        <input type="hidden" name="id" id="create_visit_id"/>


                        <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
<!-- <script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script> -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>
    
    function getRoutineCare(){
        // $('#patient-routine-table').html("");
        // table.destroy();
        $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'viewAppointments']) -->',
        type: 'GET',
        success: function(res){
            // console.log(res);
            let table_info = []
            table = $("#work-order-table").DataTable()
            table.destroy()
            res.forEach(book => {
                table_info.push(\`
                    <tr>
                        <td style="width:1%;!important">
                            <div style="height:15px;width:15px;border-radius:100px;background-color:\${book['due_color']}" class="indicator mr-2"></div>
                        </td>
                        <td class="text-left">\${book['appointment']}</td>
                        <td class="text-left">\${book['patient']}</td>
                        <td class="text-left">
                            <div class="badge badge-pill" style="background: \${book['specialty_color']}">\${book['specialty']}</div>
                            <span class="badge badge-pill badge-success \${book.booking_type == 1 ? '' : 'd-none'}">Diagnostic</span>
                        </td>
                        <td class="text-left">\${book['doctor']}</td>
                        <td class="text-left">\${book['email']}<br/>\${book['phone']}</td>
                        <td class="text-left">\${book['next_assignment_info']}</td>
                        <td class="text-left">\${book['buttons']}</td>
                    </tr>
                \`)
   
            });
            $('#patient-routine-table').html(table_info.join(""));
            table = $("#work-order-table").DataTable();
        
        },
        error: function(err){
            console.log("error");
        }
        })
        // table.draw();
    }

    function resetRoutineCare(){
        // $('#patient-routine-table').html("");
        // table.destroy();
        $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'viewAppointments']) -->',
        type: 'GET',
        success: function(res){
            // console.log(res);
            table = $("#work-order-table").DataTable();
            table.destroy();
            let table_info = []
            res.forEach(book => {
                table_info.push(\`
                    <tr>
                        <td style="width:1%;!important">
                            <div style="height:15px;width:15px;border-radius:100px;background-color:\${book['due_color']}" class="indicator mr-2"></div>
                        </td>
                        <td>\${book['appointment']}</td>
                        <td>\${book['patient']}</td>
                        <td><div class="badge badge-pill" style="background: \${book['specialty_color']}">\${book['specialty']}</div></td>
                        <td>\${book['doctor']}</td>
                        <td>\${book['email']}<br/>\${book['phone']}</td></td>
                        <td class="text-left">\${book['next_assignment_info']}</td>
                        <td>\${book['buttons']}</td>
                    </tr>
                \`)
   
            });
            $('#patient-routine-table').html(table_info.join(""));
            // $("#work-order-table").DataTable();
        
            // $("#work-order-table").DataTable();
        },
        error: function(err){
            console.log("error");
        }
        })
        table.draw();
    }
    function filterByStatus(status){
        $('#patient-routine-table').html("");
        $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'viewAppointments']) -->',
        type: 'POST',
        data: {status: status},
        success: function(res){
            let table_info = []
            var table = $("#work-order-table").DataTable();
            table.destroy()
            res.forEach(book => {
                table_info.push(\`
                    <tr>
                        <td style="width:1%;!important">
                            <div style="height:15px;width:15px;border-radius:100px;background-color:\${book['due_color']}" class="indicator mr-2"></div>
                        </td>
                        <td class="text-left">\${book['appointment']}</td>
                        <td class="text-left">\${book['patient']}</td>
                        <td class="text-left"><div class="badge badge-pill" style="background: \${book['specialty_color']}">\${book['specialty']}</div></td>
                        <td class="text-left">\${book['doctor']}</td>
                        <td class="text-left">\${book['email']}<br/>\${book['phone']}</td>
                        <td class="text-left">\${book['next_assignment_info']}</td>
                        <td class="text-left">\${book['buttons']}</td>
                    </tr>
                \`)
   
            });
            $('#patient-routine-table').html(table_info.join(""));
            // $("#work-order-table").DataTable();
            // table.draw();
        },
        error: function(err){
            console.log("error");
        }
    })
    }
    getRoutineCare();

    function cancelRoutineCare(id){
        $("#cancel_routine").modal("show");
        $("#cancel_id").val(id);
    }
    function rescheduleModal(id, mdc){
        $("#reschedule_routine").modal("show");
        $("#reschedule_id").val(id);
        $("#mdc_selector").val(mdc);
    }
    function createVisitModal(id){
        $("#create_visit").modal("show");
        $("#create_visit_id").val(id);
    }
    function configureVisitModal(id){
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getAppointmentPatientDetails']) -->/' + id,
            type:'POST',
            data: $(this).serialize(),
            success: function(data){

                console.log("this is the data", data)

                if (!data || data == false) {
                    $('#newPatient_insurance').show(400)
                    $('#oldPatient_insurance').hide(400)
                } else {
                    $('#oldPatient_insurance').show(400)
                    $('#newPatient_insurance').hide(400)
                    if (Array.isArray(data) && data && data.length > 0 ) {
                        data?.forEach(ins => {
                            result += \`
                                <option 
                                    data-type="\${ ins?.insurance_profile?.insurance_profile_type_id }" 
                                    value="\${ ins?.id }" 
                                    data-content="\${ins?.insurance_profile?.name }"
                                >\${ins?.insurance_profile?.name }</option>
                            \`
                        });
                        $('#patient_insurance_profile_policy_id').html(result)
                        $("#patient_insurance_profile_policy_id").selectpicker("refresh");
    
                    }
                }


            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");
    
            }
        });
    }
    function viewDetails(id){
        $('#booking_details').modal('show')
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'viewBookingDetails']) -->/' + id,
            type:'POST',
            data: $(this).serialize(),
            success: function(data){
                let result = [];
                ['patient','email','phone','appointment','specialty','doctor','due_days','next_assignment_info', 'services'].forEach(ele => {
                    let name = ele.split("_").join(" ")
                    result.push(\`
                        <div class="row col-md-12" >
                            <div class="col-md-6 text-secondary">\${name[0].toUpperCase() + name.slice(1)}:</div>
                            <div class="col-md-6">\${data[ele]}</div>
                        </div>
                    \`)
                });
                $('#showBookingDetails').html(result.join(""))

            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");
    
            }
        });
    }

    function notify_assignee(id){
        if (!confirm("Confirm Doctor Notification")) {
            return
        }
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'notifyAssignee']) -->/' + id,
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);
                console.log(res);
                // alertify
                alertify.success(res);
                getRoutineCare();
                $("#cancel_routine").modal("hide");
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");
    
            }
        });
    }

    $("#cancelRoutineCareForm").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'cancelBooking']) -->',
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);
                console.log(res);
                // alertify
                alertify.success(res ? "Cancelled Successfully" : "An error Occured");
                getRoutineCare();
                $("#cancel_routine").modal("hide");
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");

            }
        });
    });
    $("#rescheduleRoutineCareForm").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'rescheduleRoutineCare']) -->',
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                var data = JSON.parse(res);
                console.log(data);
                // alertify
                alertify.success(data.message);
                getRoutineCare();
                $("#reschedule_routine").modal("hide");
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");

            }
        });
    });

    function changePaymentType(ele, event) {
        let providers = JSON.parse(\`<!-- php: = json_encode($providers) -->\`)
        var val = $(ele).selectpicker('val');
        insurance_profile = (providers.find(x => x.id == val))
        console.log("providers", providers, val)
        result = insurance_profile?.insurance_profile?.insurance_profile_type_id
        if (result == '1') {
            $('#claimCode').show(400)
            // getClaimCode(insurance_profile.insurance_number, 'NHISCARD')
        } else {
            $('#claimCode').hide(400)
        }
    }
  
    function changePaymentTypePatient(ele, event) {
        let result = $(this).find(':selected').attr('data-type').trim();
        if (result == '1') {
            $('#claimCode2').show(400)
            // getClaimCode(insurance_profile.insurance_number, 'NHISCARD')
        } else {
            $('#claimCode2').hide(400)
        }
    }

    function getAvailableDoctors() {
        let val = $('#mdc_selector').val()
        $("#specialty_id").val(val)

        let weekday = ["Sunday/7","Monday/1","Tuesday/2","Wednesday/3","Thursday/4","Friday/5","Saturday/6"]
        let a = new Date($("#appointment_date").val())
        let split = weekday[a.getDay()].split("/")
        let appointment_day_id = split[1]

        
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getAvailableDoctors']) -->/'+ val + '/' + appointment_day_id,
            data: {
                'date' : new Date($("#appointment_date").val()).toLocaleDateString()
            },
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                displayDoctorsAndTheirAvailability(res)
            },
            error: function(){
                console.log("Error Occured");
            }
        });
    }

    function passTimslotId(time_slot_id, user_id) {
        console.log("this is a crazy")
        $("#time_slot_id").val(time_slot_id)
        $("#user_id").val(user_id)

        $('.'+user_id).addClass('white_button')
        $('#'+time_slot_id+user_id).removeClass('white_button')
        $('#'+time_slot_id+user_id).addClass('black_button')
    }

    function displayDoctorsAndTheirAvailability(doctors) {
        var doctors_and_timslots = ''
        for(var i in doctors){
            let doctor_image = doctors[i].user.image?.file_path
            if(!doctor_image)
            {
                doctor_image = '/img/../assets/img/dp.jpg'
                // echo $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-circle user-img-circle']);
            }
            /**
             * drawing out doctors and their times slots based on specialty and consultations selected by user
             */
            timeSlotdata = '';
            for(var q = 0; q < doctors[i].availability.length; q++){
                console.log(doctors[i].availability[q].BookingTimeslots.slot);
                timeSlotdata += \`<div class="col-md-3 p-1"> <button type="button" style="font-size:12px;" class="btn third-step time-slot-button p-3 \${doctors[i].user.id}" id="\${doctors[i].availability[q].id}\${doctors[i].user.id}" onclick="passTimslotId('\${doctors[i].availability[q].id}', '\${doctors[i].user.id}')">\${doctors[i].availability[q].booking_timeslot_value}</button></div>\`;
            }
            if (timeSlotdata != '') {
            
                doctors_and_timslots += "<div style='' class='col-md-4 p-2'><div class='p-3' style='border-radius:10px; border: 1px solid #ccc;'><div class='row'><div class='col-md-3 p-2 px-3'><div style='border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url("+doctor_image+");' class='doctor-img p-3'></div></div><div class='col-md-9 p-2 px-3'><p class='text-secondary mb-0' style='color:#ccc!important'>DOCTOR</p><h5 class='mt-2'><a href='javascript:' style='color:black' onclick='displayDocotorExtraInfo("+JSON.stringify(doctors[i])+")'>"+doctors[i].user.first_name +" "+doctors[i].user.last_name+"</a></h5></div></div><div class='row mt-2 p-2'>"+timeSlotdata+"</div></div></div>";
            }
        }
        $("#doctors-div").html(doctors_and_timslots)

    }

    function getDayFromDate()
    {
        var weekday = ["Sunday/7","Monday/1","Tuesday/2","Wednesday/3","Thursday/4","Friday/5","Saturday/6"]
        var a = new Date($("#appointment_date").val())
        var split = weekday[a.getDay()].split("/")
        appointment_day_id = split[1]
        $('#appointment_type').trigger('change');
        getAvailableDoctors()
        $("#day-selected").val(split[0])
    }

    function displayDocotorExtraInfo(doctor_info)
        {
            alert("information Not Available Now")
            return
            /**
             * getting doctor_info global variable content to show extra information about the doctor
             */
            console.log('+++++++++++++++')
            console.log('doctor info for modal')
            console.log(doctor_info.availability)
            // hours-list
            // for(var i in doctor_info.availability){
            //     console.log('sadat')
            //     console.log(doctor_info.availability[i])
            // }
            $("#extra-doc-info-modal").html(
                \`<div class="modal fade" id="extra-doc-info" tabindex="-1" ari-hidden="true">
                    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div style="border:2px solid #8e44ad" class="container px-0">
                                <div style="background:#8e44ad;" class="container-fluid pr-0">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h6 class="text-slate-900 my-0">Extra Information</h6>
                                        <div>
                                            <button data-dismiss="modal" aria-label="Close"
                                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                    class="fa fa-times text-primary"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="container bg-white p-2">
                                    <div class="container px-4">
                                        <div class="row" id="">
                                            <div id="accordion">
                                                <div class="card">
                                                    <div class="card-header" id="headingOne">
                                                        <h5 class="mb-0 float-start">
                                                            <button class="btn btn-outline-primary info-btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><i class="fa fa-calendar"></i>Days Of Week</button>
                                                        </h5>
                                                    </div>

                                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                        <div class="card-body">
                                                            <ul></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="headingOneb">
                                                        <h5 class="mb-0 float-start">
                                                            <button class="btn btn-outline-primary collapsed info-btn" data-toggle="collapse" data-target="#collapseOneb" aria-expanded="true" aria-controls="collapseOne"><i class="fa fa-clock-o"></i>Hours</button>
                                                        </h5>
                                                    </div>

                                                    <div id="collapseOneb" class="collapse" aria-labelledby="headingOneb" data-parent="#accordion">
                                                        <div class="card-body">
                                                            hereb
                                                            <ul id="hours-list"></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="headingTwo">
                                                        <h5 class="mb-0 float-start">
                                                            <button class="btn btn-outline-primary collapsed info-btn" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><i class="fa fa-copy"></i>Appointment Types</button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                        <div class="card-body">
                                                            you go
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="headingThree">
                                                        <h5 class="mb-0 float-start">
                                                            <button class="btn btn-outline-primary info-btn" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><i class="fa fa-building"></i>Insurances</button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                                        <div class="card-body">
                                                        nnnnnn
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
                                    <button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Close Extra Information Modal&nbsp;<i class="fa fa-times text-danger fa-1x"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>\`
            )
            $("#extra-doc-info").modal("toggle");
        }
  
</script>
`;

export default function ElementElementBookManageAppointments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
