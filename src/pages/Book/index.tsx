import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Book/index.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Appointment</title>

    <!--MobiScroll-->
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->
    <!-- php: = $this->Html->css('../assets/plugins/mobiscroll/css/mobiscroll.javascript.min.css') -->

    <!-- php: = $this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap-select/css/bootstrap-select.min.css') -->
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css') -->

    <!--MobiScroll-->
    <!-- php: = $this->Html->css('../assets/plugins/mobiscroll/css/mobiscroll.javascript.min.css') -->

    <!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/steppercss.css') -->
    <!-- php: = $this->Html->css('../assets/plugins/notify/alertify.default.css') -->
    <!-- php: = $this->Html->css('../assets/plugins/notify/alertify.core.css') -->
    <!-- php: = $this->Html->script('../assets/plugins/notify/alertify.min.js') -->


    <style>
        .ui-helper-hidden-accessible {
            position: absolute !important;
            left: -9999px !important;
            width: 1px !important;
            height: 1px !important;
            overflow: hidden !important;
            clip: rect(0 0 0 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        .black_button {
            color: white;
            background: #6c757d;
        }

        .white_button {
            color: black;
            background: white;
        }

        input,
        select,
        option {
            font-size: 17px !important;
        }

        .btn {
            width: 100% !important;
        }

        .stepper .steps-container .steps {
            padding-left: 25px;
        }

        .box-right {
            padding: 30px 25px;
            background-color: white;
            box-shadow: 0 2px 5px 0 rgb(0 0 0 / 12%), 0 2px 10px rgb(0 0 0 / 8%);
            border-radius: 15px
        }

        .box-left {
            padding: 20px 20px;
            background-color: white;
            box-shadow: 0 2px 5px 0 rgb(0 0 0 / 12%), 0 2px 10px rgb(0 0 0 / 8%);
            border-radius: 15px
        }

        .bg-green {
            background-color: #d4f8f2;
            color: #06e67a;
            padding: 3px 0;
            display: inline;
            border-radius: 25px;
            font-size: 11px
        }

        .p-blue {
            font-size: 14px;
            color: #1976d2
        }

        .fas.fa-circle {
            font-size: 12px
        }

        .p-org {
            font-size: 14px;
            color: #fbc02d
        }

        .h7 {
            font-size: 15px
        }

        .h8 {
            font-size: 12px
        }

        .h9 {
            font-size: 10px
        }

        .bg-blue {
            background-color: #dfe9fc9c;
            border-radius: 5px
        }

        body {
            margin-top: 20px;
        }

        .timeline_area {
            position: relative;
            z-index: 1;
        }

        .single-timeline-area {
            position: relative;
            z-index: 1;
            padding-left: 180px;
        }

        @media only screen and (max-width: 575px) {
            .single-timeline-area {
                padding-left: 100px;
            }
        }

        .single-timeline-area .timeline-date {
            position: absolute;
            width: 180px;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -ms-grid-row-align: center;
            align-items: center;
            -webkit-box-pack: end;
            -ms-flex-pack: end;
            justify-content: flex-end;
            padding-right: 60px;
        }

        @media only screen and (max-width: 575px) {
            .single-timeline-area .timeline-date {
                width: 100px;
            }
        }

        .single-timeline-area .timeline-date::after {
            position: absolute;
            width: 3px;
            height: 100%;
            content: "";
            background-color: #ebebeb;
            top: 0;
            right: 30px;
            z-index: 1;
        }

        .single-timeline-area .timeline-date::before {
            position: absolute;
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background-color: #f1c40f;
            content: "";
            top: 50%;
            right: 26px;
            z-index: 5;
            margin-top: -5.5px;
        }

        .single-timeline-area .timeline-date p {
            margin-bottom: 0;
            color: #020710;
            font-size: 13px;
            text-transform: uppercase;
            font-weight: 500;
        }

        .single-timeline-area .single-timeline-content {
            position: relative;
            z-index: 1;
            padding: 30px 30px 25px;
            border-radius: 6px;
            margin-bottom: 15px;
            margin-top: 15px;
            -webkit-box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
            box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
            border: 1px solid #ebebeb;
        }

        @media only screen and (max-width: 575px) {
            .single-timeline-area .single-timeline-content {
                padding: 20px;
            }
        }

        .single-timeline-area .single-timeline-content .timeline-icon {
            -webkit-transition-duration: 500ms;
            transition-duration: 500ms;
            width: 30px;
            height: 30px;
            background-color: #f1c40f;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 30px;
            flex: 0 0 30px;
            text-align: center;
            max-width: 30px;
            border-radius: 50%;
            margin-right: 15px;
        }

        .single-timeline-area .single-timeline-content .timeline-icon i {
            color: #ffffff;
            line-height: 30px;
        }

        .single-timeline-area .single-timeline-content .timeline-text h6 {
            -webkit-transition-duration: 500ms;
            transition-duration: 500ms;
        }

        .single-timeline-area .single-timeline-content .timeline-text p {
            font-size: 13px;
            margin-bottom: 0;
        }

        .single-timeline-area .single-timeline-content:hover .timeline-icon,
        .single-timeline-area .single-timeline-content:focus .timeline-icon {
            background-color: #020710;
        }

        .single-timeline-area .single-timeline-content:hover .timeline-text h6,
        .single-timeline-area .single-timeline-content:focus .timeline-text h6 {
            color: #3f43fd;
        }

        .md-sync-views {
            display: flex;
        }

        .md-sync-cal {
            width: 350px;
        }

        .md-sync-list {
            flex: 1;
            border-left: 1px solid #ccc;
        }

        .demo-synchronized-views,
        .md-sync-views,
        .md-sync-list {
            height: 100%;
        }

        @media screen and (max-width: 700px) {
            .md-sync-views {
                display: block;
            }

            .md-sync-cal {
                width: auto;
            }
        }

        .info-btn {
            min-width: 70px;
        }

        /* Container alignment */
        .switchToggle {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 26px;
        }

        /* Hide the checkbox */
        .switchToggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        /* The slider background */
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 34px;
        }

        /* The circle knob */
        .slider::before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }

        /* When checked */
        .switchToggle input:checked+.slider {
            background-color: #28a745;
            /* Bootstrap green */
        }

        /* Move the knob to the right */
        .switchToggle input:checked+.slider::before {
            transform: translateX(24px);
        }

        /* Optional shadow/hover */
        .slider:hover {
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        }

        /* Autocomplete dropdown container */
        .ui-autocomplete {
            z-index: 2000 !important;
            /* show above modals/forms */
            background: #fff !important;
            border: 1px solid #dee2e6 !important;
            border-radius: 6px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            padding: 0.25rem 0;
            max-height: 250px;
            overflow-y: auto;
        }

        /* Each suggestion item */
        .ui-menu-item {
            padding: 0.5rem 0.75rem;
            cursor: pointer;
        }

        /* Hover effect */
        .ui-menu-item:hover {
            background-color: #f8f9fa !important;
        }

        /* Accessibility helper (hide it properly) */
        .ui-helper-hidden-accessible {
            position: absolute !important;
            left: -9999px !important;
            width: 1px !important;
            height: 1px !important;
            overflow: hidden !important;
            clip: rect(0 0 0 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
        }
    </style>
</head>

<body>
    <div class="d-flex justify-content-center mt-2">
        <!-- php: = $this->Html->image("../", ['class' => "login-img", 'style' => 'width: auto; height: 80px', 'fullBase' => true, "id" => "logo-img"]) -->
    </div>
    <h3 class="text-center"><!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h3>
    <h6 class="text-center"><!-- php: = ($inst_name != null) ? $inst_name->email1 : '' --></h6>
    <h6 class="text-center"><!-- php: = ($inst_name != null) ? $inst_name->phone1 : '' --></h6>
    <div class="d-flex justify-content-center">
        <div class="col-md-10 mt-3">
            <h2></h2>
            <div id="stepper1" class="bs-stepper">
                <div class="bs-stepper-header">
                    <div class="step" data-target="#test-l-1">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle">1</span>
                            <span class="bs-stepper-label">Personal Data</span>
                        </button>
                    </div>
                    <div class="line"></div>
                    <div class="step" data-target="#test-l-2">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle">2</span>
                            <span class="bs-stepper-label">Select Care Type</span>
                        </button>
                    </div>
                    <div class="line"></div>
                    <div class="step" data-target="#test-l-3">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle">3</span>
                            <span class="bs-stepper-label">Book Appointment</span>
                        </button>
                    </div>
                    <div class="line"></div>
                    <div class="step" data-target="#test-l-4">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle">4</span>
                            <span class="bs-stepper-label">Estimate</span>
                        </button>
                    </div>
                    <div class="line"></div>
                    <div class="step" data-target="#test-l-5">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle">5</span>
                            <span class="bs-stepper-label">Finish</span>
                        </button>
                    </div>
                </div>
                <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Book', 'action' => 'saveBooking'], 'novalidate', 'class' => ""]); -->
                <div class="bs-stepper-content">
                    <div id="test-l-1" class="content">

                        <div>
                            <div class="accordion mb-5" id="accordionExample">
                                <div class="card">
                                    <h2 class="" id="headingOne">
                                        <button class="p-3 btn btn-link text-dark full-width d-flex justify-content-start" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Patient Information
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="card-body row justify-content-center">
                                            <div class="col-md-8">
                                                <div class="row my-3">
                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6 class="my-0 mr-3">Are you booking for a Returning Patient ?</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-check form-check-inline">
                                                            <input onchange="isReturningPatient(this.value)" class="form-check-input" type="radio" name="returningPatient"
                                                                id="isReturning" value="1">
                                                            <label class="form-check-label" for="isReturning">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input onchange="isReturningPatient(this.value)" checked class="form-check-input" type="radio" name="returningPatient"
                                                                id="notReturning" value="0">
                                                            <label class="form-check-label" for="notSomeone">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="old_patient" class="col-md-8" style="display: none">

                                                <div class="row my-3">
                                                    <div class="col-md-4 d-flex align-items-center">
                                                        <h6>Patient</h6>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" data-live-search="true" data-required="1" name="patient_id" onChange="getAgeAndGender()" id="patient_id" required>
                                                            <option value="">Select...</option>
                                                            <!-- php: foreach ($patients as $patient) { -->
                                                                <option data-patient-dob="<!-- php: = $patient->date_of_birth -->" data-gender="<!-- php: = $patient->gender_id -->" data-phone="<!-- php: = $patient->phone -->" data-email="<!-- php: = $patient->email -->" value="<!-- php: = $patient->id -->"><!-- php: = $patient->first_name --> <!-- php: = $patient->last_name -->(<!-- php: = $patient->folder_number -->)</option>
                                                            <!-- php: } -->
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-4 d-flex align-items-center">
                                                        <h6>Gender</h6>
                                                    </div>
                                                    <div class="col-md-5" id="patient_gender_info">
                                                    </div>
                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-4 d-flex align-items-center">
                                                        <h6>Age</h6>
                                                    </div>
                                                    <div class="col-md-5" id="patient_age_info">
                                                    </div>
                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-4 d-flex align-items-center">
                                                        <h6>Email</h6>
                                                    </div>
                                                    <div class="col-md-5" id="">
                                                        <input type="email" class="col-md-12 form-control" name="email_text" id="patient_email_info">
                                                    </div>
                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-4 d-flex align-items-center">
                                                        <h6>Phone Number</h6>
                                                    </div>
                                                    <div class="col-md-5" id="">
                                                        <input type="text" class="col-md-12 form-control" name="phone_text" id="patient_phone_info">
                                                    </div>
                                                </div>

                                            </div>
                                            <div id="new_patient" class="col-md-8">
                                                <div class="row mt-3">


                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6>Are you booking for someone ?</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-check form-check-inline">
                                                            <input onchange="isSomeoneElse(this.value)" class="form-check-input" type="radio" name="book_for"
                                                                id="isSomeone" value="1">
                                                            <label class="form-check-label" for="isSomeone">Yes</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input onchange="isSomeoneElse(this.value)" checked class="form-check-input" type="radio" name="book_for"
                                                                id="notSomeone" value="0">
                                                            <label class="form-check-label" for="notSomeone">No</label>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div id="is-someone-div" class="row my-3">

                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6>First Name & Middle Names</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" name="first_name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6>Last Names</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" name="last_name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6>Gender</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" data-live-search="true" data-required="1" name="gender_id" id="gender_id" required>
                                                            <option selected value="">Select...</option>
                                                            <!-- php: foreach ($genders as $gender) { -->
                                                                <option value="<!-- php: = $gender->id -->"><!-- php: = $gender->name --></option>
                                                            <!-- php: } -->
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                                <div class="row my-3">
                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6>Date of Birth</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="date" name="date_of_birth" class="form-control" id="date_of_birth">
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6>Email</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="email" name="email" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-md-6 d-flex align-items-center">
                                                        <h6>Phone</h6>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" name="phone" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- hidden fields for timeslots, specialty and doctor -->
                                            <input type="text" id="specialty_id" name="specialty_id" value="" class="form-control" hidden>
                                            <input type="text" id="purpose_id" name="purpose_id" value="" class="form-control" hidden>
                                            <input type="text" id="consultation_id" name="consultation_id" value="" class="form-control" hidden>
                                            <input type="text" id="time_slot_id" name="booking_timeslot_id" value="" class="form-control" hidden>
                                            <input type="text" id="user_id" name="user_id" value="" class="form-control" hidden>
                                            <input type="text" id="type" name="type" value="ONLINE" class="form-control" hidden>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <h2 class="" id="headingTwo">
                                        <button class="p-3 btn btn-link text-dark full-width d-flex justify-content-start" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            Medical History
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="card-body row justify-content-center">
                                            <div class="col-md-8 d-flex mt-2">
                                                <div class="col-md-6 d-flex align-items-center">
                                                    <h6>Past Illness</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <SearchableSelectField class="form-control selectpicker" name="comorbidity_id" id="comorbidity_id" data-live-search="true">
                                                        <option value="">Select...</option>
                                                    </SearchableSelectField>
                                                </div>
                                            </div>
                                            <div class="col-md-8 d-flex mt-2">
                                                <div class="col-md-6 d-flex align-items-center">
                                                    <h6>Time Period</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="date" name="illness_period" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-8 d-flex mt-2">
                                                <div class="col-md-6 d-flex align-items-center">
                                                    <h6>Comment</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="comment" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-12 d-flex align-items-center justify-content-between">
                            <span onclick="goHome()" style="width:120px!important;" class="btn btn-secondary"><i class="fa fa-home"></i>&nbsp;Go Home</span>
                            <span class="btn btn-primary" onclick="stepper1.next();getGenderAndAgeBasedMDCs()" style="width:120px!important;">Next</span>
                        </div>
                    </div>
                    <div id="test-l-2" class="content">

                        <div>
                            <div class="container-fluid p-3">
                                <div class="col-md-8">
                                    Diagnostic Booking
                                    <label class="switchToggle">
                                        <input type="checkbox" name="booking_type" id="booking_type_info" onclick="javascript:changeBookingType(); ">
                                        <span class="slider green round"></span>
                                    </label>
                                </div>
                                <div class="row">
                                    <div class="form-group mt-3 col-md-4">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialty" id="mdc_selector" title="MDC / Clinic" data-live-search="true" required onchange="getAvailableDoctors(event.target.value);">

                                        </SearchableSelectField>
                                    </div>
                                    <div class="form-group mt-3 col-md-4">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="patient_visit_purpose_id" id="patient_visit_purpose_id" title="Visit Purpose" data-live-search="true" required onchange="updateVisitPurpose(this, event)">

                                            <!-- php: foreach ($patientVisitPurposes as $purpose) { echo '<option value="' . $purpose->id . '">' . $purpose->name . '</option>'; } -->
                                        </SearchableSelectField>
                                    </div>
                                    <div class="form-group mt-3 col-md-4">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="service_id" id="service_id" title="Service" data-live-search="true" onchange="getPriceEstimations()" required>

                                        </SearchableSelectField>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-12 d-flex align-items-center justify-content-between">
                            <span onclick="goHome()" style="width:120px!important;" class="btn btn-secondary"><i class="fa fa-home"></i>&nbsp;Go Home</span>
                            <div>
                                <span class="btn btn-danger" onclick="stepper1.previous()" style="width:120px!important;">Previous</span>
                                <span class="btn btn-primary" onclick="stepper1.next()" style="width:120px!important;">Next</span>
                            </div>
                        </div>
                    </div>
                    <div id="test-l-3" class="content">

                        <div>
                            <div class="container-fluid pl-0">
                                <div class="row justify-content-center">

                                    <div class="col-md-4">
                                        <div class="form-group mt-3">
                                            <input type="date" name="appointment_time" value="<!-- php: echo date('Y-m-d'); -->" min='<!-- php: echo date('Y-m-d'); -->' class="form-control p-3" id="appointment_date" onchange="getDayFromDate()">
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="appointment_time_div" style="display:none">
                                        <div class="form-group mt-3">
                                            <input type="time" name="actual_appointment_time" value="" class="form-control p-3" id="appointment_time" onchange="getDayFromDate()">
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
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 d-flex align-items-center justify-content-between">
                            <span onclick="goHome()" style="width:120px!important;" class="btn btn-secondary"><i class="fa fa-home"></i>&nbsp;Go Home</span>
                            <div>
                                <span class="btn btn-danger" onclick="stepper1.previous()" style="width:120px!important;">Previous</span>
                                <span class="btn btn-primary" onclick="stepper1.next()" style="width:120px!important;">Next</span>
                            </div>
                        </div>
                    </div>
                    <div id="test-l-4" class="content">


                        <div class="p-3">
                            <div class="row m-0">
                                <div class="col-md-6 col-12 p-3">
                                    <div class="row">
                                        <div class="col-12 mb-4">
                                            <div class="row box-right">
                                                <div class="col-md-8 ps-0 ">
                                                    <p class="ps-3 textmuted fw-bold h6 mb-0">Amount Due</p>
                                                    <p class="h1 fw-bold d-flex"> <!-- php: = $currency --> <span class="total_balance"></span>
                                                    </p>
                                                </div>
                                                <div class="col-md-4">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 px-0 mb-4">
                                            <div class="box-right">

                                                <div class="h8">
                                                    <div class="row m-0 border mb-3">


                                                        <table class="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th><small class="textmuted py-2">Items</small></th>
                                                                    <th><small class="textmuted py-2">Qty</small></th>
                                                                    <th><small class="textmuted py-2">Price</small></th>
                                                                    <th><small class="textmuted py-2">Total</small></th>
                                                                    <th><small class="textmuted py-2">Actions</small></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="invoice-body">

                                                            </tbody>
                                                        </table>

                                                    </div>

                                                    <div class="form-group row" id="lab_tests_div">
                                                        <label class="control-label col-md-4">Lab Tests (Internal)
                                                        </label>
                                                        <div class="col-md-8" style="min-height: 50px">
                                                            <input class="input-box" name="searchValue" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ced4da; " class="form-control" id="search-lab-test-box" placeholder="Search Lab Test" />
                                                        </div>
                                                    </div>


                                                    <div class="d-flex h7 mb-2">
                                                        <p class="">Total Amount</p>
                                                        <p class="ms-auto"><!-- php: = $currency --> <span class="total_balance"></span></p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-6 col-12 pl-md-5 p-0 ">
                                    <div class="box-left">
                                        <p class="textmuted h8">Invoice</p>
                                        <div class="mt-5">



                                            <p class="h7 fw-bold mb-1 mt-5">Available Sponsors</p>
                                            <ul id="sponsors">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 d-flex align-items-center justify-content-between">
                            <span onclick="goHome()" style="width:120px!important;" class="btn btn-secondary"><i class="fa fa-home"></i>&nbsp;Go Home</span>
                            <div>
                                <span class="btn btn-danger" onclick="stepper1.previous()" style="width:120px!important;">Previous</span>
                                <span class="btn btn-primary" onclick="stepper1.next()" style="width:120px!important;">Next</span>
                            </div>
                        </div>
                    </div>
                    <div id="test-l-5" class="content">

                        <div class="mb-5">
                            <h3 class="text-center mt-5">Are you sure you want book appointment at
                                <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') -->
                            </h3>
                            <p class="text-secondary mt-2 text-center">
                            </p>
                            <div class="container mt-5 col-md-6">
                                <div class="d-flex">
                                    <input type="submit" style="font-size:18px" class="btn btn-primary p-3 font-weight-bold" value="Yes" />
                                    <span style="font-size:18px" onclick="goHome()" class="btn btn-danger p-3 font-weight-bold">Cancel</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 d-flex align-items-center justify-content-between">
                            <span onclick="goHome()" style="width:120px!important;" class="btn btn-secondary"><i class="fa fa-home"></i>&nbsp;Go Home</span>
                            <span class="btn btn-danger" onclick="stepper1.previous()" style="width:120px!important;">Previous</span>
                        </div>
                    </div>
                </div>
                <!-- php: = $this->Form->end() -->
            </div>
        </div>
    </div>

    <div id="manage-appointment" class="container d-none">
        <div height="auto" class="stepper" id="stepper2">
            <div class="steps-container col-md-6">
                <div class="steps">
                    <div class="step" icon="fa fa-pencil-alt" id="1">
                        <div class="step-title">
                            <span class="step-number">01</span>
                            <div class="step-text">Enter Booking Code</div>
                        </div>
                    </div>
                    <div class="step" icon="fa fa-pencil-alt" id="2">
                        <div class="step-title">
                            <span class="step-number">02</span>
                            <div class="step-text">Manage Appointments</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="stepper-content-container">
                <div class="stepper-content fade-in" stepper-label="1">
                    <div>
                        <div class="container col-sm-12 pt-5 pb-2 pl -0">
                            <h4 class="mt-3 text-secondary">Enter Booking Code</h4>
                            <div class="d-flex">
                                <input type="text" style="width:90%!important;font-size:17px!important;"
                                    class="form-control p-3">
                                <button style="width:10%!important" class="btn btn-success">Search</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="stepper-content fade-in" stepper-label="2">
                    <div>
                        <div class="container p-3">
                            <div class="md-sync-views">
                                <div class="md-sync-cal">
                                    <div id="demo-month"></div>
                                </div>
                                <div class="md-sync-list">
                                    <div id="demo-day"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onclick="goHome()" style="width:120px!important;" class="btn btn-secondary"><i class="fa fa-home"></i>&nbsp;Go Home</button>
        </div>
    </div>
    <!-- php: = $this->Flash->render() -->
    <!-- <div id="CRMoptions" class="stepper-content fade-in" stepper-label="5">
        <div class="mt-5">
            <h4 class="text-center text-secondary mt-5">
                What will you be using Patient CRM for?
            </h4>
            <div class="container mt-5 col-md-4">
                <div class="d-flex">
                    <button onclick="toggleCRM('book-appointment')" style="font-size:18px;" class="btn p-3">

                        <!-- php: // $this->Html->image("../assets/img/book-service.png", ['class' => "login-img mb-2", 'style' => 'width: auto; height: 80px', 'fullBase' => true]) -->
                        <br />Book Appointment
                    </button>
                    <button onclick="toggleCRM('manage-appointment')" style="font-size:18px;" class="btn p-3">

                        <!-- php: // $this->Html->image("../assets/img/manage-booking.png", ['class' => "login-img mb-2", 'style' => 'width: auto; height: 80px', 'fullBase' => true]) -->
                        <br />Manage Appointment
                    </button>
                    <button style="font-size:18px" class="btn btn-danger p-3 font-weight-bold">No</button>
                </div>
            </div>
        </div>
    </div> -->

    <!-- php: = $this->Html->script('../assets/plugins/jquery/jquery.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/popper/popper.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/bootstrap/js/bootstrap.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery/jquery-migrate-3.0.0.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery-ui/jquery-ui.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/popper/popper.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery-blockui/jquery.blockui.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery-slimscroll/jquery.slimscroll.js') -->

    <!-- php: = $this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->

    <!-- php: = $this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/bootstrap/js/stepperjs.js') -->
    <script>
        var appointment_day_id = '';


        function isReturningPatient(value) {
            console.log("value", value)
            if (value == "1") {
                $("#new_patient").hide()
                $("#old_patient").show(400)
            } else {
                $("#new_patient").show(400);
                $("#old_patient").hide();
            }
        }

        function isSomeoneElse(value) {
            if (value == "1") {
                $("#is-someone-div").html('<div class="col-md-6 d-flex align-items-center"><h6>Booked By</h6></div><div class="col-md-5"><input type="text" class="form-control"></div>');
            } else {
                $("#is-someone-div").html("");
            }
        }

        $("#payer").on('change', function() {

            if ($(this).val() == 'patient') {
                $('#payment-option').html("<option value='mobile-money'>Mobile Money</option>");
            } else {
                $.ajax({
                    type: "POST",
                    data: {
                        value: $(this).val()
                    },
                    url: '<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'getUsers']); -->',
                    success: function(html) {
                        $('#payment-option').html(html);
                    },
                    error: function() {
                        alert('false');
                    }

                });
            }

        });

        //end of mobiscroll

        // step1.navigate(2);
        function getConsultations(specialty_id) {
            //passing specialty id to hidden text field
            $("#specialty_id").val(specialty_id)

            $.ajax({
                url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getConsultationsBySpecialty']) -->/' + specialty_id,
                type: 'GET',
                cache: false,
                success: function(res) {
                    res = JSON.parse(res);
                    res = res.consultations
                    for (var i in res) {
                        $('#appointment_type').append($('<option data-name="' + res[i].name + '"></option>').val(res[i].id).html(res[i].name));
                    }
                    $("#appointment_type").selectpicker("refresh");
                    step1.navigate(3);

                },
                error: function() {
                    console.log("Error Occured");
                }
            });

        }


        function getAvailableDoctors() {
            let val = $('#mdc_selector').val()
            $("#specialty_id").val(val)

            let weekday = ["Sunday/7", "Monday/1", "Tuesday/2", "Wednesday/3", "Thursday/4", "Friday/5", "Saturday/6"]
            let a = new Date($("#appointment_date").val())
            let split = weekday[a.getDay()].split("/")
            let appointment_day_id = split[1]


            $.ajax({
                url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getAvailableDoctors']) -->/' + val + '/' + appointment_day_id,
                data: {
                    'date': new Date($("#appointment_date").val()).toLocaleDateString()
                },
                type: 'GET',
                cache: false,
                success: function(res) {
                    res = JSON.parse(res);
                    displayDoctorsAndTheirAvailability(res)
                },
                error: function() {
                    console.log("Error Occured");
                }
            });
        }

        function getPriceEstimations() {
            let val = $('#service_id').val()



            $.ajax({
                url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getConsultationPriceEstimate']) -->/' + val,
                type: 'GET',
                cache: false,
                success: function(res) {
                    res = JSON.parse(res);
                    console.log("response", res)
                    if (res.insurance_profile_consultation_prices.length < 1) {
                        $('#sponsors').html(\`Insurance Does not cover \${res.name}\`)
                    } else {
                        let result = []

                        res.insurance_profile_consultation_prices.forEach(ele => {
                            result.push(\`<li>\${ele?.insurance_profile?.name}</li>\`)
                        });
                        $('#sponsors').html(result.join(""))
                    }
                    let qty = 1
                    let table_info = \`
                        <tr>
                            <td><small class="py-2">\${res.name}</small></td>
                            <td><small class="py-2">\${qty}</small></td>
                            <td><small class="py-2">\${res.price}</small></td>
                            <td><small class="py-2 total">\${res.price * qty}</small></td>
                        </tr>
                    \`
                    $('#invoice-body').html(table_info)
                    $('.total_balance').html(res.price * qty)
                },
                error: function() {
                    console.log("Error Occured");
                }
            });
        }

        /**
         * displaying extration information about doctors in a modal
         */
        function displayDocotorExtraInfo(doctor_info) {
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

        /**
         * pass timeslot id
         */
        function passTimslotId(time_slot_id, user_id) {
            console.log("this is a crazy")
            $("#time_slot_id").val(time_slot_id)
            $("#user_id").val(user_id)

            $('.' + user_id).addClass('white_button')
            $('#' + time_slot_id + user_id).removeClass('white_button')
            $('#' + time_slot_id + user_id).addClass('black_button')
        }

        function sortTimes(timesArray) {
            return timesArray.sort((a, b) => {
                const [aHours, aMinutes] = a.booking_timeslot_value?.split(':').map(Number);
                const [bHours, bMinutes] = b.booking_timeslot_value?.split(':').map(Number);
                return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
            });
        }

        /**
         * displaying doctors and their respective day and timeslots selected
         */
        function displayDoctorsAndTheirAvailability(doctors) {
            var doctors_and_timslots = ''
            for (var i in doctors) {
                let doctor_image = doctors[i].user.image?.file_path
                if (!doctor_image) {
                    doctor_image = '/img/../assets/img/dp.jpg'
                    // echo $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-circle user-img-circle']);
                }
                /**
                 * drawing out doctors and their times slots based on specialty and consultations selected by user
                 */
                timeSlotdata = '';
                doctors[i].availability = sortTimes(doctors[i].availability)
                for (var q = 0; q < doctors[i].availability.length; q++) {
                    console.log(doctors[i].availability[q].BookingTimeslots.slot);
                    timeSlotdata += \`<div class="col-md-3 p-1"> <button type="button" style="font-size:12px;" class="btn third-step time-slot-button p-3 \${doctors[i].user.id}" id="\${doctors[i].availability[q].id}\${doctors[i].user.id}" onclick="passTimslotId('\${doctors[i].availability[q].id}', '\${doctors[i].user.id}')">\${doctors[i].availability[q].booking_timeslot_value}</button></div>\`;
                }
                if (timeSlotdata != '') {

                    doctors_and_timslots += "<div style='' class='col-md-4 p-2'><div class='p-3' style='background-color:#8055cd;border-radius:10px;'><div class='row'><div class='col-md-3 p-2 px-3'><div style='border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url(" + doctor_image + ");' class='doctor-img p-3'></div></div><div class='col-md-9 p-2 px-3'><p class='text-secondary mb-0' style='color:#ccc!important'>DOCTOR</p><h5 class='mt-2'><a href='#' style='color:white' onclick='displayDocotorExtraInfo(" + JSON.stringify(doctors[i]) + ")'>" + doctors[i].user.first_name + " " + doctors[i].user.last_name + "</a></h5></div></div><div class='row mt-2 p-2'>" + timeSlotdata + "</div></div></div>";
                }
            }
            $("#doctors-div").html(doctors_and_timslots)

        }

        function goHome() {
            window.location = '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'manageAppointments']); -->';
        }

        $(".time-slot-button").on("click", function() {
            // console.log(e);
            alert("clicked");

            $(this).removeClass("bg-white");
            $(this).addClass("bg-primary");
        });

        function toggleCRM(option) {
            $("#CRMoptions").hide();
            $("#" + option).removeClass("d-none");
            sessionStorage.setItem("crmOption", option);
        }
        toggleCRM('book-appointment')

        function checkCRMoption() {
            var option = sessionStorage.getItem("crmOption");
            option ? toggleCRM(option) : console.log('option not saved');

        }
        checkCRMoption();


        var dummy_pic = '<!-- php: = $this->Html->image("../img/dp3-.jpg", ['class' => "login-img", 'style' => 'width: auto; height: 30px; border-radius: 50px;', 'fullBase' => true]) -->';

        //mobiscroll initialization
        mobiscroll.setOptions({
            theme: 'ios',
            themeVariant: 'light'
        });

        var monthInst,
            dayInst;

        monthInst = mobiscroll.eventcalendar('#demo-month', {
            view: {
                calendar: {
                    popover: false,
                    labels: false
                }
            },
            onSelectedDateChange: function(event) {
                dayInst.navigate(event.date);
            }
        });

        dayInst = mobiscroll.eventcalendar('#demo-day', {
            view: {
                agenda: {
                    type: 'day'
                }
            },
            renderEventContent: function(data) {
                console.log(data);
                let title = data.title.split('---');

                if (title.length > 1) {

                    return '<h4>Appointment Test</h4><div style="text-align:left;display:flex;align-items:center;"><img style="height:30px;width:auto;" src="' + data.original.icon + '"/><div class="d-flex flex-column"><span>' + title[0] + '</span><span>' + title[1] + '</span></div></div>' +
                        '<div style="display: flex;align-items: center;padding-top: 10px;font-size: 13px;" class="md-custom-event-cont">' + '' +
                        '<div style="w-100">' + data.original.buttons + '</div>' +
                        '</div>';

                } else {

                    return '<h4 class="mb-3">Appointment Test</h4><div style="text-align:left;display:flex;align-items:center;">' + dummy_pic + '<div class="d-flex flex-column ml-2"><span>Dr. Abu</span></div></div>' +
                        '<div style="display: flex;align-items: center;padding-top: 10px;font-size: 13px;" class="md-custom-event-cont">' + '' +
                        '<div style="w-100">' + data.original.buttons + '</div>' +
                        '</div>';

                }
            },
            onPageChange: function(event, inst) {
                monthInst.navigate(event.firstDay);
            }
        });

        function navigate(inst, val) {
            if (inst) {
                inst.navigate(val);
            }
        }

        function getPatientRoutineCare() {
            $.ajax({
                url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientRoutineCare', 14]) -->",
                method: "GET",
                success: function(data) {
                    dayInst.setEvents(data);
                    monthInst.setEvents(data);
                }
            });

        }
    </script>

    <script>
        /**
         * getting day from the selected date, displaying in the day text field
         */
        function getDayFromDate() {
            var weekday = ["Sunday/7", "Monday/1", "Tuesday/2", "Wednesday/3", "Thursday/4", "Friday/5", "Saturday/6"]
            var a = new Date($("#appointment_date").val())
            var split = weekday[a.getDay()].split("/")
            appointment_day_id = split[1]
            $('#appointment_type').trigger('change');
            getAvailableDoctors()
            $("#day-selected").val(split[0])
        }

        /**
         * functions to run when document is loaded and ready
         */
        $(document).ready(function() {
            getDayFromDate()
            getComorbidities()
        });

        /**
         * function to fetch and append comorbidities
         */
        function getComorbidities() {
            $.ajax({
                type: 'GET',
                url: "<!-- php: echo $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getPastIllnesses']); -->",
                cache: false,
                success: function(response) {
                    var res = JSON.parse(response);
                    $('#comorbidity_id').empty()
                    $.each(res, function(key, value) {
                        $('#comorbidity_id').append($('<option data-name="' + res[key].name + '"></option>').val(res[key].id).html(res[key].name));
                    });
                    $("#comorbidity_id").selectpicker("refresh");
                }
            });
        }

        function getAgeAndGender() {
            let current_year = new Date().getYear()
            let returning_patient = document.querySelector('input[name="returningPatient"]:checked')?.value
            let age = null;
            let gender = null;
            if (returning_patient == '1') {
                gender = $("#patient_id").find(':selected').attr('data-gender').trim();
                phone = $("#patient_id").find(':selected').attr('data-phone').trim();
                email = $("#patient_id").find(':selected').attr('data-email').trim();
                let dob = $("#patient_id").find(':selected').attr('data-patient-dob').trim();
                age = new Date(dob).getYear();
                age = current_year - age + 1;
                $('#patient_gender_info').html(gender == '1' ? 'Male' : "Female")
                $('#patient_age_info').html(age)
                $('#patient_email_info').val(email)
                $('#patient_phone_info').val(phone)
            } else {
                gender = $("#gender_id").val();
                age = new Date($("#date_of_birth").val()).getYear();
                age = current_year - age + 1;
            }
        }

        function getGenderAndAgeBasedMDCs() {
            let current_year = new Date().getYear()
            let returning_patient = document.querySelector('input[name="returningPatient"]:checked')?.value
            let age = null;
            let gender = null;
            if (returning_patient == '1') {
                gender = $("#patient_id").find(':selected').attr('data-gender').trim();
                let dob = $("#patient_id").find(':selected').attr('data-patient-dob').trim();
                age = new Date(dob).getYear();
                age = current_year - age + 1;
                $('#patient_gender_info').html(gender == '1' ? 'Male' : "Female")
                $('#patient_age_info').html(age)
            } else {
                gender = $("#gender_id").val();
                age = new Date($("#date_of_birth").val()).getYear();
                age = current_year - age + 1;
            }
            console.log("gender and age info", gender, age)
            let age_id;
            if (age <= 3) {
                age_id = 1
            } else if (age <= 12) {
                age_id = 2
            } else if (age > 12) {
                age_id = 3
            }

            $.ajax({
                type: 'GET',
                url: "<!-- php: echo $this->Url->build(['controller' => 'Patients', 'action' => 'getGenderAndAgeBasedMDCs']); -->",
                data: {
                    gender_id: gender,
                    age_id: age_id
                },
                cache: false,
                dataType: 'HTML',
                success: function(response) {
                    var mdcs = JSON.parse(response);
                    mdcs = mdcs.filter(mdc => {
                        return mdc.specialties_age.some(special => special.age_id == age_id) &&
                            mdc.specialties_gender.some(special => special.gender_id == gender)
                    })
                    $('#mdc_selector').empty()
                    $.each(mdcs, function(key, value) {
                        $('#mdc_selector').append($('<option data-service-type-name="' + mdcs[key]
                            .name + '"></option>').val(mdcs[key].id).html(mdcs[key].name));
                    });
                    $("#mdc_selector").selectpicker("refresh");
                    console.log("it came here please")
                }
            });
        }

        function getVisitPurposeServices(ele) {
            id = ele.id
            specialty_id = $("#mdc_selector option:selected").val()
            selected = $("#" + id + " option:selected").val()
            $.ajax({
                type: 'GET',
                url: "<!-- php: echo $this->Url->build(['controller' => 'ManageServices', 'action' => 'getVisitpurposeBasedServices']); -->",
                data: {
                    visit_purpose_id: selected,
                    specialty_id: specialty_id
                },
                cache: false,
                success: function(response) {
                    var services = (response);
                    $('#service_id').empty()


                    if (services) {
                        $.each(services, function(key, value) {
                            $('#service_id').append($('<option data-service-type-name="' + services[key]
                                .name + '"></option>').val(services[key].id).html(services[key]
                                .name));
                        });
                        $("#service_id").selectpicker("refresh");
                    } else {
                        alertify.error('The selected MDC has no services')
                    }
                }
            });

        }

        function updateVisitPurpose(ele, event) {
            var val = $(ele).selectpicker('val');

            getVisitPurposeServices(ele)
        }

        document.addEventListener('DOMContentLoaded', function() {
            var stepper = new Stepper(document.querySelector('.bs-stepper'))
        })

        var stepper1 = new Stepper(document.querySelector('#stepper1'))


        function getFacilityLogo() {
            current_url = window.location.href
            split = current_url.split("/");
            uri_captured = split[3]
            split.splice(4, 1);

            split[split.length - 2] = \`assets/img/\${uri_captured}.png\`;

            split.pop()
            split.shift()

            var full_uri = split.join("/");

            console.log(split, full_uri);

            $('#logo-img').attr("src", full_uri)

        }

        function changeBookingType() {
            const checkbox = document.getElementById('booking_type_info');
            const isChecked = checkbox.checked;

            isChecked ? $("#appointment_time_div").show() : $("#appointment_time_div").hide()
            isChecked ? $("#lab_tests_div").show() : $("#lab_tests_div").hide()
        }

        $(document).ready(function() {
            getFacilityLogo()
        })

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
        const searchLabTests_link = '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'searchLabTests']) -->'

        $('#search-lab-test-box').autocomplete({
            appendTo: "#lab_tests_div",
            minLength: 3,
            source: function(request, response) {
                let billTo = null;
                if (!billTo) billTo = 0;

                $.ajax({
                    url: searchLabTests_link,
                    data: {
                        name: request.term
                    },
                    type: "GET",
                    success: function(data) {
                        let lab_info = data.map(element => {
                            let insurancePrice = element?.insurance_profile_lab_prices.filter(
                                insured_item => insured_item.insurance_profile_id == billTo
                            );

                            return {
                                label: element.name,
                                renderedLabel: \`
                            <div>
                                <strong>\${element.name}</strong><br/>
                                <span class='badge bg-primary'>GH₵ \${element?.value_new || 0}</span>
                                <span class='badge bg-danger'>Insured: \${insurancePrice.length > 0 ? insurancePrice[0]?.price : 0}</span>
                                <span class='badge bg-info'>TAT: \${element.turn_around_time}</span>
                                \${generateSpecimen(element.specimen_types)}
                            </div>
                        \`,
                                value: element.id,
                                data: element
                            };
                        });
                        response(lab_info);
                    }
                });
            },
            select: function(event, ui) {
                event.preventDefault();
                $('#search-lab-test-box').val('');

                const element = ui.item.data;
                const billTo = 0;
                const insurancePrice = element?.insurance_profile_lab_prices.filter(
                    insured_item => insured_item.insurance_profile_id == billTo
                );
                const price = insurancePrice.length > 0 ? insurancePrice[0]?.price : element?.value_new || 0;

                // Prevent duplicates
                if ($(\`#invoice-body tr[data-id="\${element.id}"]\`).length > 0) return;

                // ✅ Append to table
                const newRow = \`
                    <tr data-id="\${element.id}">
                        <td>\${element.name} <input type="hidden" name="lab_tests_id[]" value="\${element.id}"> <input type="hidden" name="lab_tests_name[]" value="\${element.name}"> </td>
                        <td><input name="lab_tests_quantities[]" type="number" class="form-control form-control-sm text-end qty" value="1" min="1" style="width:70px;"></td>
                        <td class="text-end price">\${price}</td>
                        <td class="text-end total">\${price}</td>
                        <td class="text-center">
                            <button type="button" class="btn btn-sm btn-outline-danger delete-row">
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                \`;

                $('#invoice-body').append(newRow);
                updateTotalBalance();
            }
        }).autocomplete('instance')._renderItem = function(ul, item) {
            return $("<li>").append(item.renderedLabel).appendTo(ul);
        };


        // Handle quantity change
        $(document).on('input', '.qty', function() {
            const row = $(this).closest('tr');
            const price = parseFloat(row.find('.price').text());
            const qty = parseFloat($(this).val()) || 0;
            row.find('.total').text((qty * price).toFixed(2));
            updateTotalBalance();
        });

        // Handle delete
        $(document).on('click', '.delete-row', function() {
            $(this).closest('tr').remove();
            updateTotalBalance();
        });

        // Update the total balance
        function updateTotalBalance() {
            let total = 0;
            $('#invoice-body .total').each(function() {
                total += parseFloat($(this).text()) || 0;
            });
            $('.total_balance').text(total.toFixed(2));
        }
    </script>

</body>

</html>
`;

export default function BookIndexPage() {
  return (
    <PageShell title="Book/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
