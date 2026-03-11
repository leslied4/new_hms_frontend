const rawHtml = `
<!-- php: $status_background = ""; $light_status_background = ""; if(null !==($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1) { $light_status_background = "background: #ffeeee;"; -->

<style type="text/css">
    .list-group-item {
        background: inherit;
    }

    .priority-high {
        border-color: #dc3545 !important;
        background-color: rgba(220, 53, 69, 0.05);
    }
    .priority-medium {
        border-color: #fd7e14 !important;
        background-color: rgba(253, 126, 20, 0.05);
    }
    .priority-low {
        border-color: #198754 !important;
        background-color: rgba(25, 135, 84, 0.05);
    }

    .md-custom-event-img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    .md-custom-event-cont {
        display: flex;
        align-items: center;
        padding-top: 10px;
        font-size: 13px;
    }

    .md-custom-event-btn,
    .md-custom-event-btn.mbsc-button {
        position: absolute;
        right: 10px;
        bottom: 8px;
        line-height: 20px;
    }

    .md-custom-event .mbsc-material.mbsc-event-time {
        margin-top: 5px;
    }

    .demo-event-content-customization {
        height: 100%;
    }

    .radius-10 {
        border-radius: 10px !important;
    }

    .border-info {
        border-left: 5px solid #0dcaf0 !important;
    }

    .border-danger {
        border-left: 5px solid #fd3550 !important;
    }

    .border-success {
        border-left: 5px solid #15ca20 !important;
    }

    .border-warning {
        border-left: 5px solid #ffc107 !important;
    }


    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 0px solid rgba(0, 0, 0, 0);
        border-radius: .25rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
    }

    .bg-gradient-scooter {
        background: #17ead9;
        background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
        background: linear-gradient(45deg, #17ead9, #6078ea) !important;
    }

    .widgets-icons-2 {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ededed;
        font-size: 27px;
        border-radius: 10px;
    }

    .rounded-circle {
        border-radius: 50% !important;
    }

    .text-slate-900 {
        color: #fff !important;
    }

    .ms-auto {
        margin-left: auto !important;
    }

    .bg-gradient-bloody {
        background: #f54ea2;
        background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
        background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
    }

    .bg-gradient-ohhappiness {
        background: #00b09b;
        background: -webkit-linear-gradient(45deg, #00b09b, #96c93d) !important;
        background: linear-gradient(45deg, #00b09b, #96c93d) !important;
    }

    .bg-gradient-blooker {
        background: #ffdf40;
        background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
        background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
    }

    .routine-care-div {
        height: 400px;
        overflow-y: scroll;
    }

    /* width */
    .routine-care-div::-webkit-scrollbar {
        width: 7px !important;
    }

    /* Track */
    .routine-care-div::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    .routine-care-div::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    .routine-care-div::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


    .blinking {
        animation: blink 1s infinite;
    }

    @keyframes blink {
        50% {
            background-color: tomato;
        }
    }

</style>


<!-- php: } -->

<div class="row">
    <div class="col-md-12">
        <!-- BEGIN PROFILE SIDEBAR -->
        <div class="card " style="padding: 0;">
            <div class="card-body no-padding"
                style="<!-- php: = isset($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1 ? $status_background : '' -->">
                <div class="row">
                    <div class="col-md-3 right-border"
                        style="<!-- php: = isset($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1 ? $light_status_background : '' -->">
                        <h6 class="font-weight-bold text-center">CAREFLOW PATHWAYS</h6>

                        <div id="paths-container">

                            <div style="background-color:#f4e8d4; border:2px solid #d4b896; border-radius:12px; padding: 3px; ">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h5 style="color:#8b4513; font-weight:600; margin:0; letter-spacing:-0.5px">Hypertension Management Pathway</h5>
                                    <span style="" class="badge badge-danger">high</span>
                                </div>
                                <span style="color:#8b4513;font-size:10px">Triggered by: BP > 160 mmHg</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-3 right-border">
                        <h6 class="font-weight-bold text-center">REGISTRATION DETAILS</h6>
                        <ul class="list-group list-group-unbordered">
                            <li class="list-group-item">
                                <b>Name</b> <a class="pull-right"><!-- php: = $patient->first_name.' '. $patient->last_name --> </a>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-md-6" style="border-right: 2px solid #ccc"><b>Folder Number</b> <a
                                            class="pull-right"><!-- php: = $patient->folder_number -->
                                        </a></div>
                                    <div class="col-md-6"><b>Triage</b>
                                        <a class="pull-right">
                                            <span class="badge" id="triage_section" style="background: <!-- php: = $triage -->">
                                                &nbsp;&nbsp;&nbsp;
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-md-6" style="border-right: 2px solid #ccc"><b>Sex</b> <a
                                            class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" -->
                                        </a></div>
                                    <div class="col-md-6"><b>Age</b> <a
                                            class="pull-right"><!-- php: =isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" -->
                                            years </a></div>
                                    <input hidden type="text" id="patient_gender" value="<!-- php: = $patient->gender->id -->" />
                                    <input hidden type="text" id="patient_age"
                                        value="<!-- php: = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" -->" />
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <div class="col-md-4 right-border">
                        <h6 class="font-weight-bold text-center">VISIT DETAILS</h6>
                        <!-- <div class="form-group row justify-content-between px-3 mt-2">
                            <b>Last Visit Diagnosis</b>
                            <a class="pull-right">24-10-1735</a>
                        </div> -->
                        <ul class="list-group list-group-unbordered">
                            <!-- php: if($isCurrentVisit) { $assigned_user_id = ''; $queueLabel = 'Assign Doc'; if(null !==($selectedVisit->queue) && sizeof($selectedVisit->queue) > 0) { $activeQueue = $selectedVisit->queue[sizeof($selectedVisit->queue) - 1]; if($activeQueue->s... -->
                            <li class="list-group-item py-0"
                                style="border: none; border-bottom: 0px; padding-top: 22px; padding-bottom: 0px; <!-- php: = ($selectedVisit == null || !in_array($selectedVisit->patient_visit_purpose_id, [5, 6])) ? '' : 'display: none;' -->">

                                <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'PatientVisits','action' =>'assignDoctor']]); -->
                                <!-- php: = $this->Form->hidden('patient_visit_id', ['value' => $selectedVisit->id]) -->
                                <div class="form-group row">
                                    <label class="col-md-4 control-label  font-weight-bold"><!-- php: = $queueLabel --></label>
                                    <div class="input-group date col-md-8">
                                        <SearchableSelectField class="form-control" id="assigned_doctor_id" name="assigned_user_id"
                                            type="text" style="<!-- php: = $status_background -->" required>
                                        </SearchableSelectField>
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-info btn-flat">Go!</button>
                                        </span>
                                    </div>
                                </div>
                                <!-- php: = $this->Form->end() -->
                            </li>
                            <!-- php: } -->
                            <li class="list-group-item py-0"
                                style="border: none; border-bottom: 0px; padding-top: 22px; padding-bottom: 0px;">
                                <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action' =>'previousVisit', $patient->id]]); -->
                                <div class="form-group row">
                                    <label class="col-md-4 control-label  font-weight-bold">Change Visit</label>
                                    <div class="input-group date col-md-8">
                                        <SearchableSelectField class="form-control" name="visit_id" type="text"
                                            style="<!-- php: = $status_background -->" required id="visit_select_option">
                                            <option value="">--Pick a Visit--</option>
                                            <!-- php: foreach($patientVisits as $visit){ echo "<option value='" . $visit->id . "' " . ($visit->id == $selectedVisit->id ? "selected": "") . ">" . $visit->date_visited->nice() . "</option>"; } -->
                                        </SearchableSelectField>
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-info btn-flat">Go!</button>
                                        </span>

                                        <!-- php: = $this->Form->end() -->
                            </li>
                            <li class="list-group-item py-0"
                                style="border: none; border-bottom:0px; padding-top: 22px; padding-bottom: 0px;">
                                <!-- php: if ($isCurrentVisit) { -->
                                <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'PatientVisits','action' =>'setVisitOutcome']]); -->
                                <!-- php: = $this->Form->hidden('patient_visit_id', ['value' => $selectedVisit->id]) -->
                                <!-- php: } -->

                                <div class="form-group row">
                                    <label class="col-md-4 control-label font-weight-bold">Visit Outcome</label>
                                    <div class="input-group date col-md-8">
                                        <!-- php: if($isCurrentVisit) { -->
                                        <SearchableSelectField class="form-control" name="visit_outcome_id" type="text"
                                            onchange="javascript:processOutcome(this.value);"
                                            style="<!-- php: = $status_background -->" required>
                                            <option value="">--Select Outcome--</option>
                                            <!-- php: foreach($visitOutcomes as $visitOutcome){ echo "<option value='" . $visitOutcome->id . "' " . ($visitOutcome->id == $selectedVisit->visit_outcome_id ? "selected": "") . ">" . $visitOutcome->name . "</option>"; } -->
                                        </SearchableSelectField>
                                        <!-- php: } else { -->
                                        <button disabled="disabled"
                                            class="btn btn-sm btn-outline m-b-10"><!-- php: = isset($selectedVisit->visit_outcome) ? $selectedVisit->visit_outcome->name : 'N/A' --></button>
                                        <!-- php: } -->
                                    </div>
                                    <br>
                                </div>
                                <!-- php: if($isCurrentVisit && isset($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1) { -->
                                <div class="d-flex justify-content-center mt-3">
                                    <div class="d-flex align-items-center">
                                        <div style="height:10px;width:10px;border-radius:100px;font-weight:bold;"
                                            class="blinking font-weight-bold"></div> &nbsp; <b>Admitted
                                            <!-- php: = isset($selectedVisit->patient_visit_admissions) && sizeof($selectedVisit->patient_visit_admissions) > 0 ? $selectedVisit->patient_visit_admissions[0]->admission_start->timeAgoInWords(['format' => 'MMM d, YYY', 'end' => '+1 year']) : '' --></b>
                                    </div>
                                </div>
                                <!-- php: } elseif ($isCurrentVisit && $selectedVisit->has('patient_visit_admissions') && sizeof($selectedVisit->patient_visit_admissions) > 0) { -->
                                    <div class="d-flex justify-content-center mt-3">
                                        <div class="d-flex align-items-center">
                                            <div style="height:10px;width:10px;border-radius:100px;font-weight:bold;"
                                                class="blinking font-weight-bold"></div> &nbsp; <b>Admission has ended; waiting on discharge</b>
                                        </div>
                                    </div>
                                <!-- php: } -->

                                <!-- php: if ($isCurrentVisit) { -->
                                <!-- php: = $this->Form->end() -->
                                <!-- php: } -->
                            </li>
                            <li class="list-group-item py-0" style="border: none; border-bottom:0px; padding-top: 22px; padding-bottom: 0px;">
                                
                                <!-- php: if(null !==($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted != 1 && $isCurrentVisit) { -->
                                    <div class="d-flex justify-content-center offset-md-4 col-md-8">
                                        <a id="admit_button" type="button" href="#" data-toggle="modal" data-target="#admitDialogue"
                                            class="btn btn-circle  btn-info pull-right" ><i
                                                class="fa fa-plus"></i> Admit Patient</a>
                                    </div>
                                <!-- php: } else if(null !==($selectedVisit) && $selectedVisit != null && $selectedVisit->admitted == 1) { -->
        
                                <!-- php: } -->
                            </li>

                        </ul>
                    </div>

                    <!-- php: if($isCurrentVisit) { -->
                    <div class="modal fade" id="admitDialogue" tabindex="-1" role="dialog" aria-labelledby="select"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="exampleModalLongTitle">Admit Patient:
                                        <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div class="row">
                                        <div class="col-md-12 col-sm-12">
                                            <div class="card card-box">
                                                <div class="card-head">
                                                    <header>Room Allotment Form</header>
                                                </div>
                                                <div class="card-body" id="bar-parent">
                                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'admitPatient', $selectedVisit->id, $selectedVisit->primary_diagnosis_id], 'class' => 'form-horizontal']) -->
                                                    <div class="form-body">
                                                        <!-- php: = $this->Form->hidden('patient_visit_id', ['value' => $selectedVisit->id]) -->
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Short Stay
                                                                <span class="required"> </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <label class="switchToggle">
                                                                    <input id="stay_check" type="checkbox" onclick="">
                                                                    <span class="slider green round"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Ward Type
                                                                <span class="required"> * </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <SearchableSelectField class="form-control input-height "
                                                                    onChange="updateWards(this.value);"
                                                                    title="select Ward Type" required id="ward_type">
                                                                    <option value="">Select...</option>
                                                                    <!-- php: foreach($wardTypes as $wardType) { echo '<option value="' . $wardType->id . '">' . $wardType->name . '</option>'; } -->
                                                                </SearchableSelectField>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Wards
                                                                <span class="required"> * </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <SearchableSelectField class="form-control input-height "
                                                                    id="wardfield" , title="Select Ward"
                                                                    onChange="updateBeds(this.value);" required>
                                                                    <option value="">Select...</option>
                                                                </SearchableSelectField>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Bed No
                                                                <span class="required"> * </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <SearchableSelectField class="form-control input-height " name="bed_id"
                                                                    id="bedfield" required>
                                                                    <option value="">Select...</option>
                                                                </SearchableSelectField>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Patient Name
                                                                <span class="required"> * </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <input type="text" name="firstname" data-required="1"
                                                                    value="<!-- php: = $patient->first_name . ' ' . $patient->last_name -->"
                                                                    placeholder="enter patient name"
                                                                    class="form-control input-height" readonly /> </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Allotment Date
                                                                <span class="required"> * </span>
                                                            </label>

                                                            <div class="col-md-7">
                                                                <div class="input-group date form_datetime "
                                                                    data-date="" data-date-format="yyyy-mm-dd hh:ii"
                                                                    data-link-field="dtp_input2"
                                                                    data-link-format="yyyy-mm-dd hh:ii">
                                                                    <input name="admission_start"
                                                                        class="form-control input-height" size="16"
                                                                        placeholder="Admission Start" type="text"
                                                                        value="" required>
                                                                    <span class="input-group-addon"><span
                                                                            class="fa fa-calendar"></span></span>
                                                                </div>
                                                                <input type="hidden" id="dtp_input2" value="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-actions">
                                                        <div class="row">
                                                            <div class="offset-md-3 col-md-9">
                                                                <button type="submit"
                                                                    class="btn btn-info">Submit</button>
                                                                <button type="button"
                                                                    class="btn btn-default">Cancel</button>
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

                    <div class="modal fade" id="referredDialogue" tabindex="-1" role="dialog" aria-labelledby="select"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Refer Patient:
                                        <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div class="row">
                                        <div class="col-md-12 col-sm-12">
                                            <div class="card card-box">
                                                <div class="card-head">
                                                    <header>Referral Details</header>
                                                </div>
                                                <div class="card-body" id="bar-parent">
                                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'referPatient'], 'class' => 'form-horizontal']) -->
                                                    <div class="form-body">
                                                        <!-- php: = $this->Form->hidden('patient_visit_id', ['value' => $selectedVisit->id]) -->
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Urgency
                                                                <span class="required"> * </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <SearchableSelectField class="form-control input-height"
                                                                    name="referral_urgency" required>
                                                                    <option value="" disabled>Select...</option>

                                                                    <option value="1">Urgent</option>
                                                                    <option value="2">Soon</option>
                                                                    <option value="3">Routine</option>

                                                                </SearchableSelectField>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Health Facility
                                                                <span class="required"> * </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <SearchableSelectField class="form-control input-height selectpicker"
                                                                    data-live-search="true" data-max-options="1"
                                                                    data-size="4" data-style="bg-white"
                                                                    name="health_facility_id" id="health_facility_id"
                                                                    required>

                                                                </SearchableSelectField>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Reason For Referral
                                                                <span class="required"> * </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <textarea name="reason_for_referral" data-required="1"
                                                                    placeholder="Enter report"
                                                                    class="form-control text-area" required></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-5">Additional Information
                                                                <span class="required"> </span>
                                                            </label>
                                                            <div class="col-md-7">
                                                                <textarea name="additional_info" data-required="1"
                                                                    placeholder="Enter report"
                                                                    class="form-control text-area" required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-actions">
                                                        <div class="row">
                                                            <div class="offset-md-3 col-md-9">
                                                                <button type="submit"
                                                                    class="btn btn-info">Submit</button>
                                                                <button type="button"
                                                                    class="btn btn-default">Cancel</button>
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
                    <div class="modal fade" id="cancelledDialogue" tabindex="-1" role="dialog" aria-labelledby="select"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Cancelled:
                                        <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body cancelled_summary">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="passedAwayDialogue" tabindex="-1" role="dialog" aria-labelledby="select"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Passed Away:
                                        <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body passed_away_outcome">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="abscondedDialogue" tabindex="-1" role="dialog" aria-labelledby="select"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Absconded:
                                        <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body absconded_modal_outcome">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="patientBillDialog" role="dialog">
                        <div class="modal-dialog modal-xs" style="width: 400px">
                            <div class="modal-content">
                                <div class="modal-body bill_summary" id="patientBill">
                                </div>
                                <div class="modal-footer">
                                    <p style="text-align: center;">
                                        <!-- php: if ($authUserPaymentAcceptance == 1){ -->
                                        <button class="btn btn-sm btn-success no-print" type="submit"
                                            data-toggle="modal" data-target="#makePayment"> <i class="fa fa-send"></i>
                                            Pay</button>
                                        <!-- php: } -->
                                        <button data-toggle="modal" data-target="#send_reminder"
                                            class="btn btn-sm btn-info"> <i class="fa fa-envelope"></i> Send
                                            Invoice</button>
                                        <button onclick="javascript:printPOSDiv('patientBill')"
                                            class="btn btn-sm btn-<!-- php: = $theme2 --> btn-outline no-print" type="button">
                                            <span><i class="fa fa-print"></i> Print Bill</span> </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- make payment modal -->
                    <div class="modal fade" id="makePayment" tabindex="-1" role="dialog" aria-labelledby="select"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1000px">
                            <div class="modal-content">

                                <div class="card card-topline-green" id="paymentCard">
                                    <div class="card-head">
                                        <header style="margin-left: 20px">MAKE PAYMENT&nbsp;&nbsp;&nbsp;</header>
                                    </div>
                                    <div class="card-body">
                                        <!-- php: = $this->Form->create(null, ['id' => 'makePaymentForm']); -->
                                        <div class="form-body">
                                            <div class="row">
                                                <div class="col-md-6">

                                                    <div class="form-group row">
                                                        <label class="control-label col-md-4">Payment Type
                                                            <span class="required"> * </span>
                                                        </label>
                                                        <div class="col-md-8">
                                                            <input type="hidden" name="id" id="id" value="" />
                                                            <input type="hidden" name="type" id="type" value="" />
                                                            <SearchableSelectField
                                                                class="form-control selectpicker show-menu-arrow show-tick"
                                                                onchange="javascript:updateReference(this.value);"
                                                                data-live-search="true" data-required="1"
                                                                name="payment_type_id" id="payment_type_id" required>
                                                                <option value="1">Cash</option>
                                                                <option value="2">Cheque</option>
                                                                <option value="3">Mobile Money</option>

                                                            </SearchableSelectField>
                                                        </div>
                                                    </div>
                                                    <div id="cheque_info" style="display:none">
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-4">Bank Name
                                                            </label>
                                                            <div class="col-md-8">
                                                                <input type="text" name="bank_name"
                                                                    class="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="reference_row" style="display: none">
                                                        <div class="form-group row">
                                                            <label class="control-label col-md-4">Phone Number
                                                            </label>
                                                            <div class="col-md-8">
                                                                <input type="text" value="+233" name="phone_number"
                                                                    id="phone_number" placeholder="Enter Phone Number"
                                                                    class="form-control input-height" />

                                                            </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <label class="control-label col-md-4">Reference Number
                                                            </label>
                                                            <div class="col-md-8">
                                                                <input type="text" name="reference_number"
                                                                    id="reference_number"
                                                                    placeholder="Enter Reference Number"
                                                                    class="form-control input-height" />
                                                                <small class="text-danger">Reference can be used to
                                                                    reconcile invoice</small>
                                                                <input type="hidden" id="patient_email"
                                                                    name="patient_email" />
                                                                <input type="hidden" id="phone_no" name="phone_no" />
                                                                <input type="hidden" id="transaction_no"
                                                                    name="transaction_no" />
                                                                <input type="hidden" id="forcepay" name="force_pay"
                                                                    value="0" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label class="control-label col-md-4">Amount Received
                                                            <span class="required"> * </span>
                                                        </label>
                                                        <div class="col-md-8">
                                                            <input type="number"
                                                                oninput="javascript:updateAmount(this.value);" min=""
                                                                step="0.01" name="amount_received" id="amount_received"
                                                                data-required="1" placeholder="Enter Amount Received"
                                                                class="form-control input-height" required />
                                                        </div>

                                                    </div>

                                                    <div class="form-group row">
                                                        <label class="control-label col-md-4">Change
                                                        </label>
                                                        <div class="col-md-8">
                                                            <input type="number" min="0.01" step="0.01"
                                                                name="change_amount" id="change_amount"
                                                                data-required="1" placeholder="Change"
                                                                class="form-control input-height" readonly />
                                                        </div>

                                                    </div>

                                                    <div class="form-group row">
                                                        <label class="control-label col-md-4">Amount
                                                            <span class="required"> * </span>
                                                        </label>
                                                        <div class="col-md-8">
                                                            <input type="number" min="0.01" step="0.01" name="amount"
                                                                id="amount" data-required="1" placeholder="Enter Amount"
                                                                class="form-control input-height" readonly required />
                                                        </div>

                                                    </div>


                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div id="payment_timer"
                                                                class="text-left d-none align-items-center">
                                                                <h6 style="font-size:15px;">Payment Request will Expire
                                                                    In :&nbsp;<span id="timer"
                                                                        class="font-weight-bold">60</span>&nbsp; seconds
                                                                </h6>
                                                            </div>
                                                            <div class="text-right">
                                                                <button id="confirm-payment-btn"
                                                                    class="btn btn-info d-none">Confirm</button>
                                                                <button id="cancel-payment"
                                                                    class="btn btn-danger d-none">Cancel</button>
                                                                <button id="make-payment-btn" class="btn btn-success"
                                                                    type="submit">Make Payment</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-6"
                                                    style="background: #dedede; border-radius: 5px; padding: 10px">
                                                    <div class="row">
                                                        <div class="col-md-4"><b>Sub Total</b><span
                                                                class="pull-right">:</span></div>
                                                        <div class="col-md-8 popup-total">GHS </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-4"><b>Discount</b><span
                                                                class="pull-right">:</span></div>
                                                        <div class="col-md-8">GHS </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-4"><b>VAT (<!-- php: = $vatRate*100 -->%)</b><span
                                                                class="pull-right">:</span></div>
                                                        <div class="col-md-8">GHS </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-4"><b>Total</b><span
                                                                class="pull-right">:</span></div>
                                                        <div class="col-md-8 popup-total">GHS </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-4"><b>Remaining</b><span
                                                                class="pull-right">:</span></div>
                                                        <div class="col-md-8 popup-remaining">GHS </div>
                                                    </div>
                                                    <input type="hidden" value="" id="amount_to_pay" />
                                                </div>
                                            </div>

                                        </div>
                                        <!-- php: = $this->Form->end() -->
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- send reminder modal -->
                    <div class="modal fade" id="send_reminder" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <h4 class="text-slate-900 my-0">Send Invoice Reminder</h4>
                                            <div>
                                                <button data-dismiss="modal" aria-label="Close"
                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                        class="fa fa-times text-primary"></i> </button>
                                            </div>
                                        </div>
                                    </div>
                                    <form id="sendReminderForm">
                                        <div class="container bg-white p-2">
                                            <div class="container-fluid">
                                                <h5 class="text-secondary">
                                                    NOTE: This will turn the cash invoice to a digital invoice for
                                                    secured and safe online payment via email or sms
                                                </h5>
                                                <div class="row mb-3 mt-4">
                                                    <div class="col-md-4">
                                                        <h5>Send Options: </h5>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" name="send_option[]"
                                                                type="checkbox" id="send_option" value="email" checked>
                                                            <label class="form-check-label"
                                                                for="sendEmail">Email</label>&nbsp;&nbsp;
                                                            <input type="text" name="receiver_email" required
                                                                value="<!-- php: = $invoice->patient_visit->patient->email -->"
                                                                class="form-control">

                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" name="send_option[]"
                                                                type="checkbox" id="sendSms" value="sms">
                                                            <label class="form-check-label"
                                                                for="sendSms">SMS</label>&nbsp;&nbsp;
                                                            <input type="text" name="receiver_phone"
                                                                value="<!-- php: = $invoice->patient_visit->patient->phone -->"
                                                                class="form-control">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                            <div class="d-flex align-items-center py-1 justify-content-end">
                                                <input type="hidden" id="reminder_invoice_id" name="invoice_id"
                                                    value="<!-- php: = $invoice->id -->">
                                                <input type="hidden" name="type" value="">
                                                <button style="height:20px;width:auto;"
                                                    class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Send
                                                    &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                                                <button style="height:20px;width:auto;"
                                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                                        class="fa fa-times text-danger fa-1x"></i> </button>
                                            </div>
                                        </div>
                                        <form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade bd-example-modal-lg" id="discharge_modal" tabindex="-1" role="dialog"
                        aria-labelledby="select" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Discharge Summary:
                                        <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body discharge_summary">


                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade bd-example-modal-lg" id="discharge_advice_modal" tabindex="-1" role="dialog"
                        aria-labelledby="select" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Discharge Against Medical Advice:
                                        <!-- php: = $patient->first_name . ' ' . $patient->last_name --></h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body discharge_advice_summary">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- php: } -->

                    <div class="profile-usertitle col-md-2 mt-0">

                        <h6 class="font-weight-bold text-center">ACTIONS</h6>

                        <div class="d-flex justify-content-center" style="text-align: center;">
                            <!-- php: if($isCurrentVisit && $invoice != null) { -->
                            <button onclick="patientBillSummary('patientBillDialog')"
                                class="btn btn-<!-- php: = $theme2 --> btn-outline no-print btn-circle w-75 " type="button">
                                <span><i class="fa fa-money"></i> Bill</span> </button>
                            <!-- php: } -->
                            <input type="hidden" name="bill_to" id="global_bill_to">
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                            <a id="routinebtn" type="button" style="background:#8e44ad;;" data-toggle="modal"
                                data-target="#schedule_events" href="javascript:"
                                class="btn btn-circle w-75 text-slate-900"><i class="fa fa-clock-o"></i>&nbsp;Routine
                                Care</a>
                        </div>


                        <div class="mt-2 d-flex justify-content-center" style="text-align: center;">
                            <!-- php: if($isCurrentVisit && isset($selectedVisit) && $selectedVisit != null && $selectedVisit->patient_visit_purpose_id == 3) { -->

                            <a target="_blank"
                                href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewMaternity', $selectedVisit->patient_id, $selectedVisit->id]) -->"
                                class="btn deepPink w-75 btn-circle btn-outline" disabled>Go to Maternal Care</a>

                            <!-- php: } -->
                        </div>

                        <!-- php: if(!$hasCurrentVisit) { -->
                        <div class="d-flex justify-content-center mt-2">
                            <a type="button" href="javascript:" data-toggle="modal" data-target="#createVisitDialogue"
                                onclick='getGenderAndAgeBasedMDCs(); checkForPatientOutstandingBill();'
                                class="btn btn-info visits_add_visit btn-circle w-75" id="visitModalButton">Create New Visit</a>
                        </div>

                        <div class="modal fade" id="createVisitDialogue" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 80vw">
                                <div class="modal-content">
                                    <div class="px-0 border border-2 border-<!-- php: = $theme2 -->">
                                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <h4 class="text-slate-900 my-0">Create a new Visit for Patient</h4>
                                                <div>
                                                    <button data-dismiss="modal" aria-label="Close"
                                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                            class="fa fa-times text-primary"></i> </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container bg-white p-2">
                                            <div class="col-md-12 d-flex align-items-center">
                                                <ul class="nav nav-tabs align-items-center" id="SpecialtyNav">
                                                        <li id="specialty_nav_1" class="nav-item"><span class="nav-link" data-toggle="tab" href="#specialty_tab_1">1</span></li>
                                                </ul>
                                                <div class="d-flex mx-1">
                                                    <span onclick="addMoreSpecialties()" class="badge badge-danger ">+ add</span>
                                                </div>
                                            </div>
                                            <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'PatientVisits','action' =>'add', $patient->id], 'id' => 'createVisitForm']) -->
                                            <div class="row container-fluid">
                                                <div class="col-md-6">
                                                    <div class="tab-content row" id="specialtyTabs">
                                                        <div class="tab-pane fade active show col-md-12" id="specialty_tab_1">
                                                            <div class="form-body" >
                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-4 text-right">MDC /
                                                                        Clinic
                                                                        <span class="required"> * </span>
                                                                    </label>
                                                                    <div class="col-md-8">
                                                                        <SearchableSelectField
                                                                            class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                            data-size="5" data-live-search="true"
                                                                            class="form-control input-height"
                                                                            name="specialty_id[]" id="mdc_selector1"
                                                                            onchange="getUsers(this);getNurseUsers(this);getServicesBasedVisitPurposes(this)"
                                                                            title="select MDC" required>
                                                                            <!-- getSelectedMDC(this) -->
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-4 text-right">Visit
                                                                        Purpose
                                                                        <span class="required"> * </span>
                                                                    </label>
                                                                    <div class="col-md-8">
                                                                        <SearchableSelectField
                                                                            class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                            data-size="5" data-live-search="true"
                                                                            class="form-control input-height"
                                                                            name="patient_visit_purpose_id[]"
                                                                            id="patientvisittop_purposes_mdc"
                                                                            onchange="updateVisitPurpose(this, event)"
                                                                            required>
                                                                            <option value="">Select...</option>
                                                                            <!-- php: foreach($patientVisitPurposes as $purpose) { echo '<option value="' . $purpose->id . '">' . $purpose->name . '</option>'; } -->
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-4 text-right">Service
                                                                        <span class="required"> * </span>
                                                                    </label>
                                                                    <div class="col-md-8">
                                                                        <SearchableSelectField
                                                                            class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                            data-size="5" data-live-search="true"
                                                                            class="form-control input-height"
                                                                            name="service_id[]" id="service_id1" required>
                                                                            <option value="">Select...</option>
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group row" style="display:none"
                                                                    id="transport_mode">
                                                                    <label class="control-label col-md-4 text-right">Arrival
                                                                        <span class="required"> * </span>
                                                                    </label>
                                                                    <div class="col-md-8">
                                                                        <SearchableSelectField
                                                                            class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                            data-size="5" data-live-search="true"
                                                                            class="form-control input-height"
                                                                            name="transport_mode">
                                                                            <option value="">Select...</option>
                                                                            
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-4 text-right">Payment Type <span class="required"> * </span>
                                                                    </label>
                                                                    <div class="col-md-8">
                                                                        <SearchableSelectField
                                                                            class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                            data-size="5"
                                                                            name="patient_insurance_profile_policy_id"
                                                                            id="patient_provider_id"
                                                                            onchange="return changePaymentType(this, event)"
                                                                            title="Select provider" data-live-search="true"
                                                                            required>
                                                                            <option value="">Patient</option>
                                                                            <!-- php: foreach($patientProviders as $patientProvider){ -->
                                                                                <option value="<!-- php: = $patientProvider->id -->"
                                                                                    data-content="
                                                                                    <!-- php: = $patientProvider->has('insurance_profile_policy') ? $patientProvider->insurance_profile_policy->insurance_profile->name : '' -->  
                                                                                    <!-- php: //$patientProvider->has('insurance_profile_policy') ? $patientProvider->insurance_profile_policy->name : '' -->  
                                                                                    <span class='badge badge-danger'><!-- php: = $patientProvider->insurance_number --></span>
                                                                                    <!-- php: = $patientProvider->has('insurance_profile_policy') && $patientProvider->insurance_profile_policy->copay == 1 ? "<span class='badge badge-primary'>copay</span>": '' --> ">
                                                                                </option>
                                                                            <!-- php: } -->
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row" style="display:none"
                                                                    id="claimCode">
                                                                    <label class="control-label col-md-4 text-right">
                                                                        Claim Code
                                                                    </label>
                                                                    <div class="col-md-8">
                                                                        <input value="" type="text" minlength="5"
                                                                            maxlength="5" placeholder="Claim Code(Numeric)"
                                                                            name="claim_code" class="" style="width:100%;"
                                                                            pattern="[0-9]+">
                                                                    </div>
                                                                </div>

                                                                <!-- sadat -->
                                                                <div class="form-group row">
                                                                    <label class="col-md-4 control-label text-right">Assign Doctor</label>
                                                                    <div class="input-group date col-md-8">
                                                                        <SearchableSelectField
                                                                            class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                            data-size="5" data-live-search="true"
                                                                            name="assigned_user_id[]"
                                                                            id="mdc_selector1-all_facility_doctors" type="text">

                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group row">
                                                                    <label class="col-md-4 control-label text-right">Assign
                                                                        Nurse</label>
                                                                    <div class="input-group date col-md-8">
                                                                        <SearchableSelectField
                                                                            class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                            data-size="5" data-live-search="true"
                                                                            name="assigned_user_nurse_id[]" 
                                                                            id="mdc_selector1-all_facility_nurses"
                                                                            type="text">

                                                                        </SearchableSelectField>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-4 text-right">Care
                                                                        Automomy
                                                                        <!-- <span class="required"> * </span> -->
                                                                    </label>
                                                                    <div class="col-md-4">
                                                                        <label
                                                                            class="switchToggle d-flex justify-content-left">
                                                                            <input name="autonomy_care" type="checkbox"
                                                                                onclick="toggleAutonomy(this,'autonomy_details')">
                                                                            <span class="slider green round"></span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group row" style="display:none"
                                                                    id="autonomy_details">
                                                                    <label class="control-label col-md-4 text-right">
                                                                        Automomy Details
                                                                        <!-- <span class="required"> * </span> -->
                                                                    </label>
                                                                    <div class="col-md-8">
                                                                        <!-- <input class="form-control text-area" name="claim_code" id="claim_code" placeholder="Mandatory for NHIS" required /> -->
                                                                        <input value="" type="text" name="autonomy_name"
                                                                            placeholder="Full Name" class="mb-3"
                                                                            style="width:100%;">
                                                                        <input value="" type="text" name="autonomy_phone"
                                                                            placeholder="Phone Number" class=""
                                                                            style="width:100%;">
                                                                    </div>
                                                                </div>

                                                                <div class="form-group row">
                                                                    <label class="control-label col-md-4 text-right">Reason
                                                                        For
                                                                        Visit</label>
                                                                    <div class="col-md-8">
                                                                        <textarea class="form-control text-area"
                                                                            name="description[]" id="description"
                                                                            rows="3"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mt-4">
                                                    <!--Vitals card-->
                                                    <div class="row">
                                                        <div class="col-md-12 ">
                                                            <div class="card bg-light mb-3 with-transform"
                                                                style="width: 100%; box-shadow:none;border-color:#ffc107; border-radius: 10px 10px 10px 10px">
                                                                <div class="card-body" style="background:white">
                                                                    <div class="col-md-12" style="text-align:left">
                                                                        <div class="">
                                                                            <span><!-- php: = $patient->first_name . ' ' . $patient->last_name -->
                                                                            </span>
                                                                            <span class="badge badge-success"><a
                                                                                    class="pull-right"><!-- php: =isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" -->
                                                                                    years </a></span>
                                                                            <span class="badge badge-primary"><a
                                                                                    class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" -->
                                                                                </a></span>
                                                                        </div>
                                                                        <div class="">
                                                                            <span class="badge badge-warning"><i
                                                                                    class="fa fa-folder-o"
                                                                                    aria-hidden="true"></i></span> :
                                                                            <!-- php: = $patient->folder_number ? $patient->folder_number : 'N/A' -->
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="card bg-light mb-3 with-transform"
                                                                style="width: 100%; box-shadow:none;border-color:#007bff; border-radius: 10px 10px 10px 10px">
                                                                <div class="card-body" style="background:white">
                                                                    <div class="col-md-12" style="text-align:left">
                                                                        <div class="d-flex justify-content-between">
                                                                            <span>Language: <span class="badge badge-primary"><!-- php: = $patient->has('language') ? $patient->language->name : 'n/a' --> </span></span>
                                                                            <!-- <span>|</span> -->
                                                                            <span>Education: <span
                                                                                    class="badge badge-success"><!-- php: = $patient->has('education') ? $patient->education->name : 'n/a' -->
                                                                                </span></span>
                                                                        </div>
                                                                        <div class="d-flex justify-content-between">
                                                                            <span>Religion: <span
                                                                                    class="badge badge-warning"><!-- php: = $patient->has('religion') ? $patient->religion->name : 'n/a' -->
                                                                                </span></span>
                                                                            <!-- <span>|</span> -->
                                                                            <span>Occupation: <span
                                                                                    class="badge badge-dark"><!-- php: = $patient->has('occupation') ? $patient->occupation->name : 'n/a' -->
                                                                                </span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="card bg-light mb-3 with-transform"
                                                                style="width: 100%; box-shadow:none;border-color:#20c997; border-radius: 10px 10px 10px 10px">
                                                                <div class="card-body" style="background:white">
                                                                    <div class="col-md-12" style="text-align:left">
                                                                        <div class="" id="outstanding-bill">

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="card bg-light mb-3 with-transform" style="width: 100%; box-shadow:none;border-color:#CC00FF; border-radius: 10px 10px 10px 10px">
                                                                <div class="card-body" style="background:white">
                                                                    <div class="col-md-12" style="text-align:left">
                                                                        <div class="" id="deposit-div">
                                                                            <div id="toggleButton" class="btn btn-success" style="text-transform: capitalize;">Deposit</div> <span>Deposited Amount: <span class="badge badge-success"> <!-- php: = $patient->has('patient_deposit') ? $patient->patient_deposit->currency . " " . $patient->patient_deposit->amount : 'GH 0.00' --> </span></span>
                                                                            <div id="fields" style="display: none; margin-top: 10px;">
                                                                                <input type="text" id="amount" name="amount" class="form-control input-height" placeholder="Deposit Amount" style="margin-bottom: 10px;">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="card bg-light mb-3 with-transform" style="width: 100%; box-shadow:none;border-color:red; border-radius: 10px 10px 10px 10px">
                                                                <div class="card-body" style="background:white">
                                                                    <div class="col-md-12" style="text-align:left">
                                                                        <!-- php: $cashRefundAmount = 0; $voucherRefundAmount = 0; $approvedCash = 0; $approvedVoucher = 0; if ($patient->has('refunds')) { foreach ($patient->refunds as $refund) { $refundAmount = (!empty($refund->refund_vouchers)) ? array_sum(array_column($... -->
                                                                        <div class="" id="refunds-div">
                                                                            <!-- <span>Approved Cash Refund: <span class="badge badge-success"> <!-- php: // $approvedCash --> </span></span><br> -->
                                                                            <!-- <span>Pending Cash Refund: <span class="badge badge-danger"> <!-- php: // $cashRefundAmount --> </span></span><br> -->
                                                                            <span>Approved Voucher Refund: <span class="badge badge-success"> <!-- php: = $approvedVoucher --> </span></span><br>
                                                                            <span>Pending Voucher Refund: <span class="badge badge-danger"> <!-- php: = $voucherRefundAmount --> </span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>              
                                                            <div class="card bg-light mb-3 with-transform" style="width: 100%; box-shadow:none;border-color:red; border-radius: 10px 10px 10px 10px">
                                                                <div class="card-body" style="background:white">
                                                                    <div class="col-md-12" style="text-align:left">
                                                                        <div class="" id="refunds-div">
                                                                            <div>

                                                                                Patient Insurance Statuses
                                                                            </div>
                                                                            <!-- php: $currentDate = new DateTime(); foreach($patientProviders as $provider){ $renewalDate = new DateTime($provider->date_of_renewal); $interval = $currentDate->diff($renewalDate); $daysRemaining = (int)$interval->format('%r%a'); // %r includes t... -->
                                                                                <div>

                                                                                </div>
                                                                            <!-- php: } -->
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>              
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                            <div class="d-flex align-items-center py-1 justify-content-end">
                                                <button type="submit" style="height:20px;width:auto;"
                                                    class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                                                <button style="height:20px;width:auto;"
                                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                                        class="fa fa-times text-danger fa-1x"></i></button>
                                                <!-- php: = $this->Form->end(); -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- php: } -->
						<div class="d-flex justify-content-center mt-2">
                            <a type="button" href="javascript:" data-toggle="modal" data-target="#generate-efolder"
                                onclick='' style="background: #2c3e50; border:1px solid #2c3e50;"
                                class="btn btn-circle w-75 text-slate-900">E-Folder</a>
                        </div>
						<div class="d-flex justify-content-center mt-2">
                            <a type="button" href="javascript:" onclick="generateEVoucher('evoucher_modal')"
                                onclick='' style="background: #2c3e50; border:1px solid #2c3e50;"
                                class="btn btn-circle  text-slate-900">Voucher</a>
                            <a type="button" href="javascript:" onclick="checkAvailableSessions('session_modal')"
                                onclick='' style="background: #2c3e50; border:1px solid #2c3e50;"
                                class="btn btn-circle  text-slate-900 ml-3">Sessions</a>
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                            <span class="btn btn-xs" onclick='callNextPatientForVisit()'>F12:Next Patient</span>
                            <span class="btn btn-xs ml-1" onclick='noShowPatientForVisit()'>F10:No Show</span>

                        </div>

                        <div class="modal fade" id="schedule_events" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <form method="post" id="">
                                        <div style="border:2px solid #8e44ad" class="container px-0">
                                            <div style="background:#8e44ad;" class="container-fluid pr-0">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <h4 class="text-slate-900 my-0">Routine Care</h4>
                                                    <div>
                                                        <button data-dismiss="modal" aria-label="Close"
                                                            class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                class="fa fa-times text-primary"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container bg-white p-2">
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div style="height:400px;overflow-y:scroll;" id=""
                                                            class="col-md-4 routine-care-div">
                                                            <h4 class="mt-1">
                                                                <!-- php: = $patient->first_name.' '. $patient->last_name -->
                                                                <br />(<!-- php: =isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" -->,
                                                                <!-- php: =isset( $patient->gender)? $patient->gender->name : "" -->)
                                                            </h4>

                                                            <div class="container-fluid px-0">
                                                                <div id="routine-cards"
                                                                    class="row row-cols-1 row-cols-md-2 row-cols-xl-4">

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="height:400px;overflow-y:scroll;" class="col-md-8">
                                                            <div mbsc-page class="demo-basic-usage">
                                                                <div style="height:100%">
                                                                    <div id="demo-daily-events-routine"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="background:#8e44ad;" class="container-fluid pr-0">
                                            <div class="d-flex align-items-center py-1 justify-content-end">
                                                <!-- <button style="height:20px;width:auto;" type="submit"
							                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button> -->
                                                <button style="height:20px;width:auto;"
                                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                                        class="fa fa-times text-danger fa-1x"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
						<div class="modal fade" id="generate-efolder" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
                                <div class="modal-content">
								<form method="post" id="">
                                        <div style="border:2px solid #2c3e50" class="container px-0">
                                            <div style="background:#2c3e50;" class="container-fluid pr-0">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <h4 class="text-slate-900 my-0">E-Folder</h4>
                                                    <div>
                                                        <button data-dismiss="modal" aria-label="Close"
                                                            class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                class="fa fa-times text-primary"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container bg-white p-2">
                                              <div class="container-fluid py-3">
												<!-- <h5 class="font-weight-bold my-0 text-left">Filters:</h5> -->
												<div class="d-flex align-items-center">
														<div class="col-md-5 pl-0 d-flex align-items-center">
															<label style="white-space: nowrap" class="text-left my-0 mr-3" for="">Visit Date</label>
															<SearchableSelectField data-actions-box="true" class="form-control input-height selectpicker mt-2 show-menu-arrow show-tick" data-size="5" name="visit_dates[]" id="efolder_visit_date" title="Select Visit Date(s)"  data-live-search="true" multiple required>
                                                            <!-- php: foreach($patientVisits as $visit){ // $formattedDate = $visit->date_visited->format('Y-m-d\TH:i:sP'); // Use the desired format echo "<option value='" . $visit->id. "' " . ($visit->id == $selectedVisit->id ? "selected": "") . ">" . $visit->... -->
															</SearchableSelectField>
														</div>
														
												</div>
												<div class="d-flex align-items-center mt-3">
														    <div class="form-check">
														        <input class="form-check-input folder_categories" name="folder_categories[]" type="checkbox" checked value="opd" id="opd_checkbox">
														        <label class="form-check-label" for="flexCheckDefault">
														            Opd <span id="opd_id"></span>
														        </label>
														    </div>
														    <div class="form-check ml-3">
														        <input class="form-check-input folder_categories" name="folder_categories[]" type="checkbox" checked value="ipd" id="ipd_checkbox">
														        <label class="form-check-label" for="flexCheckDefault2">
														            Ipd <span id="ipd_id"></span>
														        </label>
														    </div>
														    <div class="form-check ml-3">
														        <input class="form-check-input folder_categories" name="folder_categories[]" type="checkbox" checked value="lab" id="lab_checkbox">
														        <label class="form-check-label" for="flexCheckDefault3">
														            Lab <span id="lab_id"></span>
														        </label>
														    </div>
														    <div class="form-check ml-3">
														        <input class="form-check-input folder_categories" name="folder_categories[]" type="checkbox" checked value="radiology" id="flexCheckDefault4">
														        <label class="form-check-label" for="flexCheckDefault4">
														            Radiology <span id="radiology_id"></span>
														        </label>
														    </div>
														    <div class="form-check ml-3">
														        <input class="form-check-input folder_categories" name="folder_categories[]" type="checkbox" checked value="all_medications" id="flexCheckDefault5">
														        <label class="form-check-label" for="flexCheckDefault5">
														            All Medications
														        </label>
														    </div>
														    <div class="form-check ml-3">
														        <input class="form-check-input folder_categories" name="folder_categories[]" type="checkbox" checked value="active_medications" id="flexCheckDefault6">
														        <label class="form-check-label" for="flexCheckDefault6">
														            Active Medications Only
														        </label>
														    </div>
                                                            <!-- <button type="button" onclick="getEFolder()" class="btn btn-xs btn-secondary ml-2 mb-1"> <i class="fa fa-refresh"></i> </button> -->
                                                            <button type="button" class="btn btn-xs btn-secondary ml-2 mb-1"> <i class="fa fa-refresh"></i> </button>
														</div>
											  </div>
                                            
                                              <div id="e-folder-container" class="col-md-12 mt-3 p-2">
                                                   
                                              </div>
                                            </div>
                                        </div>
                                        <div style="background:#2c3e50;" class="container-fluid pr-0">
                                            <div class="d-flex align-items-center py-1 justify-content-end">
                                                <button style="height:20px;width:auto;" type="submit"
							                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Generate</button>
                                                <button style="height:20px;width:auto;"
                                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                                        class="fa fa-times text-danger fa-1x"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="evoucher_modal" tabindex="-1" role="dialog"
    aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Session Vouchers</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body generate_evoucher">


            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="session_modal" tabindex="-1" role="dialog"
    aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="min-width:90vw;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">View Sessions</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body view_available_sessions" style="margin: 0; padding-top: 0">


            </div>
        </div>
    </div>
</div>


<script>

    const postShortStayValue_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'storeShortStayValueIntoSession' ] ); -->"
    const updateWards_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateWards']) -->/"
    const updateBeds_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'updateBeds']) -->/"
    const dischargeModalInformation_link = \`<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getTakeHomeDrugs', isset($selectedVisit) ? $selectedVisit->id : '']) -->\`
    const patientBillSummary_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'patientBill', isset($selectedVisit) ? $selectedVisit->id : '',]) -->"
    const dischargeSummary_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'dischargeSummary', isset($selectedVisit) ? $selectedVisit->id : '', isset($selectedVisit) ? $selectedVisit->primary_diagnosis_id : '']) -->"
    const generateEVoucher_link = "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'createVoucher', isset($selectedVisit) ? $selectedVisit->patient_id : '', isset($selectedVisit) ? $selectedVisit->id : '',]) -->"
    const checkAvailableSessions_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'patientSessionsView', isset($selectedVisit) ? $selectedVisit->patient_id : '', isset($selectedVisit) ? $selectedVisit->id : '',]) -->"
    const dischargeAdviceSummary_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'dischargeSummary', isset($selectedVisit) ? $selectedVisit->id : '' , isset($selectedVisit) ? $selectedVisit->primary_diagnosis_id : '']) -->"
    const cancelledSummary_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'dischargeSummaryCancelled', isset($selectedVisit) ? $selectedVisit->id : '']) -->"
    const abscondedSummary_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'patientAbscondedOutcome', isset($selectedVisit) ? $selectedVisit->id : '']) -->"
    const passedAwayOutcome_link = "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'passedAwayOutcome', isset($selectedVisit) ? $selectedVisit->id : '']) -->"
    const postPatientGenderAndAge_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'storePatientGenderIntoSession' ] ); -->"
    const getUsers_link = '<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewUsersSpecialty']) -->/'
    const getNurseUsers_link = '<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewNurseUsersSpecialty']) -->/'
    const getServicesBasedVisitPurposes_link = '<!-- php: = $this->Url->build(['controller' => 'ManageServices', 'action' => 'getServicesBasedVisitPurposes']) -->/'
    const getHealthFacilities_link = \`<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'getHealthFacilities']) -->\`
    const getGenderAndAgeBasedMDCs_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getGenderAndAgeBasedMDCs' ] ); -->"
    const getVisitPurposeServices_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getVisitpurposeBasedServices' ] ); -->"
    const getSpecialtyBasedServices_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getSpecialtyBasedServices' ] ); -->"
    const getPatientRoutineCare_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientRoutineCare', isset($patient) ? $patient->id : '', isset($selectedVisit) ? $selectedVisit->id : '']) -->"
    const getPatientRoutineCareMonth_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientRoutineCareMonth', isset($patient) ? $patient->id : '', isset($selectedVisit) ? $selectedVisit->id : '']) -->"
    const checkForPatientOutstandingBill_link = "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'checkForPatientOutstandingBill', isset($patient) ? $patient->id : '']) -->"
    const sendReminderForm_link = "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'sendReminder']) -->"
    const makePaymentForm_link = '<!-- php: = $this->Url->build(['controller ' => 'Billings ', 'action ' => 'confirmPayment ']) -->'
    const getClaimCode_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getClaimCode' ] ); -->"
    const freeUserInQueueManager_link_visit_top = '<!-- php: =$this->Url->build(['controller'=>'PatientVisits', 'action'=>'freeUserInQueueManager']) -->/'
    const noShowInQueueManager_link_visit_top = '<!-- php: =$this->Url->build([ 'controller'=> 'PatientVisits', 'action'=>'noShowInQueueManager' ]) -->/'

    const patientVisitPurposes_option = \`<!-- php: foreach($patientVisitPurposes as $purpose) { echo '<option value="' . $purpose->id . '">' . $purpose->name . '</option>'; } -->\`

    function setActiveDoctor() {
        <!-- php: $assigned_user_id = ''; $queueLabel = 'Assign Doc'; if (isset($selectedVisit->queue) && sizeof($selectedVisit->queue) > 0) { $activeQueue = $selectedVisit->queue[sizeof($selectedVisit->queue) - 1]; if ($activeQueue->status_id == 19) { $assi... -->

        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'Users', 'action' => 'viewUsersSpecialty', $selectedVisit ? $selectedVisit->specialty_id : '']) -->\`,
            success: function g(data, textStatus) {
                let users_data = [];
                if (Array.isArray(data)) {
                    data?.forEach(element => {
                        users_data.push(
                            \`<option \${element.id == '<!-- php: =$assigned_user_id -->' ? 'selected' : '' } value="\${element.id}" >\${element.first_name} \${element.last_name}</option>\`
                            )
                    });
                    if (data.length < 1) {
                        users_data.push(\`<option selected value="-1" >Any Doctor</option>\`)
                    }
                }
                $('#assigned_doctor_id').html(users_data.join(""));
                // $('#assigned_doctor_id').selectpicker("refresh");
            },
            fail: function g(xhr, textStatus, errorThrown) {
                alertify.error('Error Occured. Please try again');
                // console.log(xhr);
            }
        });
    }

    setActiveDoctor()

    var selectedVisit = {
        id: "<!-- php: echo isset($selectedVisit) ? $selectedVisit->id : ''; -->",
        patient_id: "<!-- php: echo isset($selectedVisit) ? $selectedVisit->patient_id : ''; -->",
        primary_diagnosis_id: "<!-- php: echo isset($selectedVisit) ? $selectedVisit->primary_diagnosis_id : ''; -->"
    };

    const patientProviders = JSON.parse(\`<!-- php: = json_encode($patientProviders) -->\`);

    (function () {
        let show_visit_modal = "<!-- php: = $this->request->getSession()->read('show_visit_modal') -->"
        // console.log("it tried here", show_visit_modal);
        if (show_visit_modal == '1') {
            $('#visitModalButton').trigger('click')
            <!-- php: $this->request->getSession()->write('show_visit_modal', false) -->
        }
    })();


</script>

<!-- php: = $this->Html->script('../assets/js/pages/visit_space/patient_visit_top.js') -->
`;

export default function ElementElementPatientvisitPatientvisittopnew() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
