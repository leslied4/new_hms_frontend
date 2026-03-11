const rawHtml = `
<style>
    #heading {
    text-transform: uppercase;
    color: #673AB7;
    font-weight: normal
   }

   #msform {
      text-align: center;
      position: relative;
      margin-top: 20px
   }

   #msform fieldset {
      background: white;
      border: 0 none;
      border-radius: 0.5rem;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding-bottom: 20px;
      position: relative
   }

   .form-card {
      text-align: left
   }

   #msform fieldset:not(:first-of-type) {
      display: none
   }

   #msform input[type="text"],#msform select
   {
      padding: 8px 15px 8px 15px;
      border: 1px solid #ccc;
      border-radius: 0px;
      margin-bottom: 10px;
      margin-top: 2px;
      box-sizing: border-box;
   }

   #msform input:focus,
   #msform textarea:focus {
      -moz-box-shadow: none !important;
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
      border: 1px solid #673AB7;
      outline-width: 0
   }

   #msform .action-button {
      width: 100px;
      background: #673AB7;
      font-weight: bold;
      color: white;
      border: 0 none;
      border-radius: 0px;
      cursor: pointer;
      padding: 10px 5px;
      margin: 10px 0px 10px 5px;
      float: right
   }

   #msform .action-button:hover,
   #msform .action-button:focus {
      background-color: #311B92
   }

   #msform .action-button-previous {
      width: 100px;
      background: #616161;
      font-weight: bold;
      color: white;
      border: 0 none;
      border-radius: 0px;
      cursor: pointer;
      padding: 10px 5px;
      margin: 10px 5px 10px 0px;
      float: right
   }

   #msform .action-button-previous:hover,
   #msform .action-button-previous:focus {
      background-color: #000000
   }

   .card {
      z-index: 0;
      border: none;
      position: relative
   }

   .fs-title {
      font-size: 25px;
      color: #673AB7;
      margin-bottom: 15px;
      font-weight: normal;
      text-align: left
   }

   .purple-text {
      color: #673AB7;
      font-weight: normal
   }

   .steps {
      font-size: 25px;
      color: gray;
      margin-bottom: 10px;
      font-weight: normal;
      text-align: right
   }

   .fieldlabels {
      color: gray;
      text-align: left
   }

   #progressbar {
      margin-bottom: 30px;
      overflow: hidden;
      color: lightgrey
   }

   #progressbar .active {
      color: #1880c9
   }

   #progressbar li {
      list-style-type: none;
      font-size: 15px;
      width: 25%!important;
      float: left;
      position: relative;
      font-weight: 400
   }

   #progressbar #cart:before {
      font-family: FontAwesome;
      content: "\f07a"
   }

   #progressbar #personal:before {
      font-family: FontAwesome;
      content: "\f007"
   }

   #progressbar #payment:before {
      font-family: FontAwesome;
      content: "\f0d6"
   }

   #progressbar #confirm:before {
      font-family: FontAwesome;
      content: "\f00c"
   }
   #progressbar #file:before {
      font-family: FontAwesome;
      content: "\f15b"
   }


   #progressbar li:before {
      width: 45px;
      height: 45px;
      line-height: 45px;
      display: block;
      font-size: 15px;
      color: #ffffff;
      background: lightgray;
      border-radius: 50%;
      margin: 0 auto 10px auto;
      padding: 2px
   }

   #progressbar li:after {
      content: '';
      width: 100%;
      height: 2px;
      background: lightgray;
      position: absolute;
      left: 0;
      top: 25px;
      z-index: -1
   }

   #progressbar li.active:before,
   #progressbar li.active:after {
      background: #1880c9
   }

   .progress {
      height: 20px
   }

   .progress-bar {
      background-color: #673AB7
   }

   .fit-image {
      width: 100%;
      object-fit: cover
   }
   .invoice-table-header-green 
   {
      border:2px solid #27ae60;
      border-radius:15px;
   }
   .invoice-table-header-yellow
   {
      border:2px solid #f9ca24;
      border-radius:15px;
   }
   .due-date 
   {
      color: darkorange;
   }
   .form-check-label {
      margin-right: 20px;
   }

   .bxn {
   border: 2px solid gray;
   color: gray;
   background-color: white;
   padding: 2px 9px;
   border-radius: 8px;
   font-size: 15px;
   font-weight: bold;
   }
   #file-chosen{
   margin-left: 0.3rem;
   }

   .firstline-table .table .thead-dark th {
      color: black;
      background-color: #e7505a!important;
      border-color: #e7505a!important;
      padding: 5px!important;
   }

   .accordion .card-header:after {
    display:none;
    }

    .card-header{
        padding-top: 0px;
    padding-bottom: 0px;
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
    .md-timezone-meeting-planner .mbsc-schedule-color-text {
    padding: 16px 0;
    text-align: center;
}
.slot-name {
    line-height: 20px;
    font-size: 15px;
}

.slot-time {
    opacity: .5;
    line-height: 20px;
    font-size: 13px;
}

.md-shift-template .mbsc-timeline-header-placeholder {
    height: 74px;
}

.md-shift-template .mbsc-timeline-slots {
    height: 48px;
    text-align: center;
}
/* 
.md-shift-template .mbsc-schedule-event {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
} */

.md-shift-template .mbsc-timeline-slot-title {
    padding: 0;
}

.md-timezone-meeting-planner.mbsc-ios-dark .mbsc-timeline-color,
.md-timezone-meeting-planner.mbsc-material-dark .mbsc-timeline-color,
.md-timezone-meeting-planner.mbsc-windows-dark .mbsc-timeline-color {
    color: #fff !important;
}

.md-meeting-planner-cont {
    font-size: 12px;
    font-weight: 600;
    height: 100%;
    background: #1ad404;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    border-radius: 6px;
    overflow: hidden;
}

.md-meeting-planner-wrapper {
    background: rgba(255, 255, 255, .5);
    height: 100%;
    box-sizing: border-box;
    padding: 0 6px;
    transition: background .15s ease-in-out;
}

.mbsc-schedule-event-hover .md-meeting-planner-wrapper {
    background: rgba(255, 255, 255, .3);
}

.md-meeting-planner-title {
    padding-top: 3px;
    color: initial;
}

.md-meeting-planner-time {
    color: #666;
}

.md-meeting-planner-title,
.md-meeting-planner-time {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.md-meeting-planner-header {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.md-meeting-planner-zone {
    font-size: 12px;
    padding: 3px 6px;
    margin: 0 5px;
    border-radius: 16px;
    color: #888;
}

.md-meeting-planner-work {
    background: #f7f7bb4d;
}

.md-meeting-planner-flex {
    background: #a5ceff4d;
}

.md-meeting-planner-off {
    background: #ffbaba4d;
}

.md-meeting-participant-cont {
    position: relative;
    padding-left: 15px;
    max-height: 40px;
    line-height: 20px;
}

.md-meeting-participant-avatar {
    position: absolute;
    max-height: 40px;
    max-width: 40px;
    top: 25px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    left: 20px;
    border-radius:20px
}

.md-meeting-participant-name {
    font-size: 16px;
}

.md-meeting-participant-offset {
    font-size: 12px;
    opacity: 0.6;
}
.md-work-week-picker {
    flex: 0.5 0 auto;
}

.md-work-week-nav {
    width: 200px;
}
.mbsc-calendar-controls {
    justify-content: space-between;
}
    
</style>

                <div class="borderBox light bordered col-md-12">

                    <div class="borderBox-title tabbable-line">
                        <div class="caption">
                        <header>Patient Manual Appointments</header>
                        </div>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a href="#appointments_add" data-toggle="tab"> Add </a>
                            </li>
                            <li class="nav-item">
                                <a href="#appointments_view" data-toggle="tab"> View </a>
                            </li>
                        </ul>
                    </div>
                    <div class="borderBox-body">
                        <div class="tab-content">
                            <div class="tab-pane active" id="appointments_add">
                                <div id="appointments-page" class="container-fluid">
                                <div class="card px-5 pt-4 pb-0 mt-1 mb-3">
                                <!-- <form id="msform"> --> 
                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Book', 'action' => 'saveBooking'],'id' =>'msform', 'novalidate']); -->                                    
                                    <ul id="progressbar">
                                        <li class="active" id="personal"><strong>Select Care Type</strong></li>
                                        <li id="cart"><strong>Personal Information</strong></li>
                                        <li id="payment"><strong>Estimate</strong></li>
                                        <li id="confirm"><strong>Finish</strong></li>
                                    </ul>
                                    <!-- <div class="progress">
                                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div> <br> fieldsets -->
                                    <fieldset>
                                        <!-- <form> -->
                                        <div class="row mt-5">
                                            <div class="col-md-2 d-flex align-items-center">
                                                <label class="">Select Care Type:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <SearchableSelectField onchange="getConsultations(this.value)" name="care_type"
                                                    id="care_type" class="form-control">
                                                    <option value="">Select Care Type</option>
                                                    <!-- php: foreach($specialties as $specialty){ -->
                                                    <option value="<!-- php: = $specialty->id -->"><!-- php: = $specialty->name -->
                                                    </option>
                                                    <!-- php: } -->
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-2 d-flex align-items-center">
                                                <label class="">Select Appointment Type:</label>
                                            </div>
                                            <div class="col-md-3">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="consultation_id" id="appointment_type"
                                                    title="Appointment Types" data-live-search="true" required
                                                    onchange="getAvailableDoctors(this.value)"></SearchableSelectField>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" name="appointment_time"
                                                    value="<!-- php: echo date('Y-m-d'); -->" class="form-control"
                                                    id="appointment_date" onchange="getDayFromDate()">
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" readonly name="appointment_day" value=""
                                                    class="form-control" id="day-selected">
                                            </div>
                                        </div>
                                        <!-- </form> -->
                                        <div class="container-fluid p-3 mt-4">
                                            <div class="row" id="doctors-div">

                                            </div>
                                            <!-- modal section -->
                                            <div id="extra-doc-info-modal"></div>
                                        </div>
                                        <input type="button" id="next1" name="next"
                                            class="next action-button btn btn-primary" value="Next" />
                                        <!-- <input type="submit" id="draft1" style="width:auto;margin-right:7px;" name="draft" value="Save As Draft" class="btn btn-warning action-button"> -->

                                    </fieldset>
                                    <fieldset>
                                        <div class="accordion mt-5" id="accordionExample">
                                            <div class="card py-0">
                                                <div class="card-header" id="headingOne">
                                                    <h2 class="mb-0 mt-0 py-0">
                                                        <button class="btn btn-link btn-block text-left" type="button"
                                                            data-toggle="collapse" data-target="#collapseOne"
                                                            aria-expanded="true" aria-controls="collapseOne">
                                                            Contact Information
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                                    data-parent="#accordionExample">
                                                    <div class="card-body">
                                                        <div class="row mt-3">
                                                            <div class="col-md-5">
                                                                <div class="d-flex align-items-center">
                                                                    <h6 class="my-0 mr-3">Are you booking for someone ?
                                                                    </h6>
                                                                    <div class="form-check form-check-inline">
                                                                        <input onchange="isSomeone(this.value)"
                                                                            class="form-check-input" type="radio"
                                                                            name="book_for" id="isSomeone" value="1">
                                                                        <label class="form-check-label"
                                                                            for="isSomeone">Yes</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                        <input onchange="isSomeone(this.value)"
                                                                            class="form-check-input" type="radio"
                                                                            name="book_for" id="notSomeone" value="0">
                                                                        <label class="form-check-label"
                                                                            for="notSomeone">No</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="is-someone-div" class="row my-3">

                                                        </div>
                                                        <div class="row my-3">
                                                            <div class="col-md-1 d-flex align-items-center">
                                                                <h6>Fullname</h6>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <input type="text" name="fullname" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-1 d-flex align-items-center">
                                                                <h6>Email</h6>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <input type="email" name="email" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-1 d-flex align-items-center">
                                                                <h6>Phone</h6>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <input type="number" name="phone" class="form-control">
                                                            </div>
                                                        </div>
                                                        <!-- hidden fields for timeslots, specialty and doctor -->
                                                        <input type="text" id="specialty_id" name="specialty_id"
                                                            value="" class="form-control" hidden>
                                                        <input type="text" id="time_slot_id" name="booking_timeslot_id"
                                                            value="" class="form-control" hidden>
                                                        <input type="text" id="user_id" name="user_id" value=""
                                                            class="form-control" hidden>
                                                            <input type="text" id="type" name="type" value="ON PREMISE" class="form-control" hidden>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <div class="card-header" id="headingTwo">
                                                    <h2 class="mb-0 mt-0 py-0">
                                                        <button class="btn btn-link btn-block text-left collapsed"
                                                            type="button" data-toggle="collapse"
                                                            data-target="#collapseTwo" aria-expanded="false"
                                                            aria-controls="collapseTwo">
                                                            Medical Condition
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                                    data-parent="#accordionExample">
                                                    <div class="card-body">
                                                        <div class="row my-3">
                                                            <div class="col-md-1 d-flex align-items-center">
                                                                <h6>Past Illness</h6>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <SearchableSelectField class="form-control selectpicker"
                                                                    name="comorbidity_id" id="comorbidity_id"
                                                                    data-live-search="true">
                                                                    <option value="">Select...</option>
                                                                </SearchableSelectField>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-1 d-flex align-items-center">
                                                                <h6>Time Period</h6>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <input type="date" name="illness_period"
                                                                    class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-1 d-flex align-items-center">
                                                                <h6>Comment</h6>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <input type="text" name="comment" class="form-control">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <input type="button" id="next1" name="next"
                                            class="next action-button btn btn-primary" value="Next" />
                                            <input type="button" name="previous" style="width:125px" class="previous action-button-previous btn btn-secondary" value="Previous" />

                                    </fieldset>
                                    <fieldset>
                                        <div class="">
                                            <div class="row m-0">
                                                <div class="col-md-6 col-12 p-3">
                                                    <div class="row">
                                                        <div class="col-12 mb-4">
                                                            <div class="row box-right">
                                                                <div class="col-md-8 pl-0 ">
                                                                    <p class="pl-3 textmuted font-weight-bold h6 mb-0">
                                                                        Amount Due</p>
                                                                    <p class="h1 font-weight-bold d-flex">
                                                                        <!-- <span class="textmuted">.58</span> -->
                                                                    </p>
                                                                    <!-- <p class="ms-3 px-2 bg-green">+10% since last month</p> -->
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <!-- <p class="p-blue"> <span class="fas fa-circle pe-2"></span>Pending </p>
                                                    <p class="fw-bold mb-3">1254  -->
                                                                    <!-- <span class="textmuted">.50</span>  -->
                                                                    </p>
                                                                    <!-- <p class="p-org"><span class="fas fa-circle pe-2"></span>On drafts</p>
                                                    <p class="fw-bold"><span class="fas fa-dollar-sign pe-1"></span>00<span
                                                            class="textmuted">.00</span></p> -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12 px-0 mb-4">
                                                            <div class="box-right">
                                                                <!-- <div class="d-flex pb-2">
                                                    <p class="fw-bold h7"><span class="textmuted">quickpay.to/</span>Publicnote</p>
                                                    <p class="ms-auto p-blue"><span class=" bg btn btn-primary fas fa-pencil-alt me-3"></span>
                                                        <span class=" bg btn btn-primary far fa-clone"></span> </p>
                                                </div> -->
                                                                <!-- <div class="bg-blue p-2"> -->
                                                                <!-- <P class="h8 textmuted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                                                        recusandae dolorem voluptas nemo, modi eos minus nesciunt.
                                                    </P> -->
                                                                <!-- </div> -->
                                                                <!-- <p class="fw-bold h6">#EXP-001</p> -->
                                                                <div class="h8">
                                                                    <div class="row m-0 border mb-3">

                                                                        <!-- <div class="col-6 h8 pe-0 ps-2">
                                                            <p class="textmuted py-2">Items</p> <span class="d-block py-2 border-bottom">Legal
                                                                Advising</span> <span class="d-block py-2">Expert Consulting</span>
                                                        </div>
                                                        <div class="col-2 text-center p-0">
                                                            <p class="textmuted p-2">Qty</p> <span class="d-block p-2 border-bottom">2</span>
                                                            <span class="d-block p-2">1</span>
                                                        </div>
                                                        <div class="col-2 p-0 text-center h8 border-end">
                                                            <p class="textmuted p-2">Price</p> <span class="d-block border-bottom py-2"><span
                                                                    class="fas fa-dollar-sign"></span>500</span> <span
                                                                class="d-block py-2 "><span class="fas fa-dollar-sign"></span>400</span>
                                                        </div>
                                                        <div class="col-2 p-0 text-center">
                                                            <p class="textmuted p-2">Total</p> <span class="d-block py-2 border-bottom"><span
                                                                    class="fas fa-dollar-sign"></span>1000</span> <span
                                                                class="d-block py-2"><span class="fas fa-dollar-sign"></span>400</span>
                                                        </div> -->
                                                                        <table class="table table-bordered">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th><small
                                                                                            class="textmuted py-2">Items</small>
                                                                                    </th>
                                                                                    <th><small
                                                                                            class="textmuted py-2">Qty</small>
                                                                                    </th>
                                                                                    <th><small
                                                                                            class="textmuted py-2">Price</small>
                                                                                    </th>
                                                                                    <th><small
                                                                                            class="textmuted py-2">Total</small>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            </tbody>
                                                                        </table>

                                                                    </div>
                                                                    <div class="d-flex h7 mb-2">
                                                                        <p class="">Total Amount</p>
                                                                        <p class="ms-auto"></p>
                                                                    </div>
                                                                    <!-- <div class="h8 mb-5">
                                                <p class="textmuted">Lorem ipsum dolor sit amet elit. Adipisci ea harum sed quaerat tenetur </p>
                                            </div> -->
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-12 pl-md-5 p-0 ">
                                                    <div class="box-left">
                                                        <p class="textmuted h8">Invoice</p>
                                                        <p class="fw-bold h6"></p>
                                                        <p class="textmuted h8"></p>
                                                        <div class="mt-5">
                                                            <p class="h7 fw-bold mb-1 text-left">Choose an Insurance If Any
                                                            </p>

                                                            <!-- <div class="accordion" id="accordionExample">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingTwo">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                        aria-expanded="true" aria-controls="collapseTwo">

                                                        <div class="d-flex align-items-center">
                                                            <!-- php: = $this->Html->image('../assets/img/momoImg.png', ['style' => 'height:25px;width:auto;']) -->
                                                            <span class="ms-3 mb-2">Mobile Money</span>
                                                        </div>
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" class="accordion-collapse collapse  show"
                                                    aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <p class="textmuted h8 mb-2">Make payment for this invoice by
                                                            filling in the
                                                            details
                                                        </p>
                                                        <form id="makePaymentForm" class="form">
                                                            <div class="row">
                                                                <div class="col-12 my-3">
                                                                    <div class="card border-0">
                                                                        <input class="form-control ps-5" name="phone"
                                                                            id="phone" type="text" value=""
                                                                            placeholder="Mobile Number"> <span
                                                                            class="fa fa-phone"></span>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <div class="card border-0">
                                                                        <i class="fa fa-envelope"></i>
                                                                        <input name="email" class="form-control ps-5"
                                                                            style="font-size:13px;" id="email" value=""
                                                                            type="text" placeholder="Email">
                                                                        <input type="hidden" name="invoice_id"
                                                                            id="invoice_id"
                                                                            value="<!-- php: //= $invoice->id -->">
                                                                        <input type="hidden" id="transaction_no"
                                                                            name="transaction_no" />
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <button
                                                                class="btn w-100 paybtn btn-primary d-block h8">PAY</button>
                                                            <button
                                                                class="btn w-100 completebtn btn-success d-none h8 mt-3">COMPLETED</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            


                                                            </div> -->
                                                            <SearchableSelectField name="insurance_profile_id" id="payer"
                                                                class="form-control mt-2" required>
                                                                <option>Select Payer</option>
                                                                <!-- php: foreach($sponsors as $val) { -->
                                                                <option value="<!-- php: = $val->id -->"><!-- php: = $val->name --></option>
                                                                <!-- php: } -->
                                                            </SearchableSelectField>
                                                            <p class="h7 fw-bold mb-1 mt-5 text-left">Available Sponsors</p>
                                                            <ul class="text-left" id="sponsors">
                                                                <!-- php: foreach($sponsors as $val) { -->
                                                                <li><!-- php: = $val->name --></li>
                                                                <!-- php: } -->
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="button" id="next1" name="next"
                                            class="next action-button btn btn-primary" value="Next" />
                                            <input type="button" name="previous" style="width:125px" class="previous action-button-previous btn btn-secondary" value="Previous" />
                                    </fieldset>
                                    <fieldset>
                                    <div>
                                        <h3 class="text-center mt-5">Are you sure you want book appointment at
                                            <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') -->
                                        </h3>
                                        <p class="text-secondary mt-2 text-center">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium omnis
                                            tempora aliquid amet
                                            molestiae corrupti excepturi minus velit ipsum esse?
                                        </p>
                                        <div class="container mt-5 col-md-6">
                                            <div class="d-flex justify-content-center">
                                                <input type="submit" style="font-size:18px"
                                                    class="btn btn-success p-3 font-weight-bold" value="Yes" />
                                                <button style="font-size:18px"
                                                    class="btn btn-danger p-3 font-weight-bold ml-3">No</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <input type="button" id="next1" name="next" class="next action-button btn btn-primary" value="Next" /> -->
                                    </fieldset>
                                    <!-- php: = $this->Form->end() -->
                                </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="appointments_view">
                             <div class="row mt-4">
                                <div class="col-md-6 d-flex align-items-center">
                                <label style="white-space: nowrap;" for="">Select Specialty</label>
                                    <SearchableSelectField onchange="filterAppointments(this.value)" data-actions-box="true" class="form-control ml-4 input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialty[]" id="specialty_ids" title="Select Speciality"  data-live-search="true" multiple required>
                                           <!-- php: foreach($specialties as $specialty): --> 
                                            <option selected value="<!-- php: = $specialty->id -->" data-content="<!-- php: = h($specialty->name) --> <span class='badge badge-danger'><!-- php: = $specialty->code --></span>"><!-- php: = h($specialty->name) --></option>
                                            <!-- php: endforeach; -->   
                                    </SearchableSelectField>
                                </div>
                             </div>
                                <div class="container-fluid mt-4 p-2">
                                    <!-- <div mbsc-page class="demo-daily-weekly-monthly-yearly-timeline" style="height: 100%;">
                                        <div id="demo-work-order-scheduling"
                                            class="md-switching-timeline-view-cont md-shift-template"></div>
                                    </div> -->

                                    <div class="mbsc-grid mbsc-no-padding">
                                        <div class="mbsc-row">
                                            <div class="mbsc-col-sm-9 dynamic-resources-calendar">
                                                <div id="demo-dynamic-filter"></div>
                                            </div>
                                            <div class="mbsc-col-sm-3">
                                                <div class="mbsc-form-group-title">Show available tasks</div>
                                                <!-- php: foreach($doctors as $doctor){ -->
                                                <label>
                                                    <!-- php: = $doctor['name'] -->
                                                    <input value="<!-- php: = $doctor['id'] -->" mbsc-checkbox type="checkbox"
                                                        class="demo-shared-events-checkbox" checked>
                                                </label>
                                                <!-- <label>
                                                    Kate
                                                    <input value="2" mbsc-checkbox type="checkbox"
                                                        class="demo-shared-events-checkbox" checked>
                                                </label>
                                                <label>
                                                    John
                                                    <input value="3" mbsc-checkbox type="checkbox"
                                                        class="demo-shared-events-checkbox" checked>
                                                </label> -->
                                                <!-- php: } -->
                                            </div>
                                        </div>
                                    </div>

                                    <div id="demo-work-order-popup">
                                        <div class="mbsc-form-group">
                                            <label>
                                                Title
                                                <input mbsc-input id="work-order-title" />
                                            </label>
                                            <label>
                                                Location
                                                <input mbsc-input id="work-order-location" />
                                            </label>
                                            <label>
                                                Notes
                                                <textarea mbsc-textarea id="work-order-notes"></textarea>
                                            </label>
                                        </div>
                                        <div class="mbsc-form-group">
                                            <label>
                                                Starts
                                                <input mbsc-input id="work-order-start" />
                                            </label>
                                            <label>
                                                Ends
                                                <input mbsc-input id="work-order-end" />
                                            </label>
                                            <div id="work-order-date"></div>
                                        </div>
                                        <div id="work-order-resources" class="mbsc-form-group">

                                        </div>

                                        <div class="mbsc-button-group">
                                            <button class="mbsc-button-block" id="work-order-delete" mbsc-button
                                                data-color="danger" data-variant="outline">Delete work order</button>
                                        </div>
                                    </div>
                                </div>
<!--                                 
                            <input type="button" id="next1" name="next"
                                            class="next action-button btn btn-primary" value="Next" /> -->
                            </div>
                        </div>
                    </div>
                </div>

<script>
     function isSomeone(value){
        if(value == 1){

             $("#is-someone-div").html('<div class="col-md-1 d-flex align-items-center"><h6>Booked By</h6></div><div class="col-md-5"><input type="text" class="form-control"></div>');
        } else {
            $("#is-someone-div").html("");
        }
    }
    // $("#appointments-page").load("<!-- php: //= Cake\Routing\Router::url(['controller' => 'Book', 'action' => 'index']) -->");
    var appointment_day_id = '';
    $(document).ready(function(){

var current_fs, next_fs, previous_fs; //fieldsets
var opacity;
var current = 1;
var steps = $("fieldset").length;

setProgressBar(current);

$(".next").click(function(){

current_fs = $(this).parent();
next_fs = $(this).parent().next();

//Add Class Active
$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//show the next fieldset
next_fs.show();
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_fs.css({
'display': 'none',
'position': 'relative'
});
next_fs.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(++current);
});

$(".previous").click(function(){

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
            'display': 'none',
            'position': 'relative'
            });
            previous_fs.css({'opacity': opacity});
        },
        duration: 500
    });
setProgressBar(--current);
});

    function setProgressBar(curStep){
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar").css("width",percent+"%");
    }
});

function getConsultations(specialty_id){
        //passing specialty id to hidden text field
        $("#specialty_id").val(specialty_id)

        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getConsultationsBySpecialty']) -->/'+ specialty_id,
            type: 'GET',
            cache: false,
            success: function(res){
                
                res = JSON.parse(res);
                res = res.consultations
                console.log(res);
                for (var i in res){
                    $('#appointment_type').append($('<option data-price="'+res[i].price+'" data-name="'+res[i].name+'"></option>').val(res[i].id).html(res[i].name));  
                }
                $("#appointment_type").selectpicker("refresh");
                // step1.navigate(3);
                
            },
            error: function(){
                console.log("Error Occured");
            }
        }); 
}

$("#appointment_type").on('change', function(e){
   console.log($(this).attr('data-price'));
});

function getAvailableDoctors(val)
    {
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getAvailableDoctors']) -->/'+ val + '/' + appointment_day_id,
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

    /**
     * displaying extration information about doctors in a modal
     */
    function displayDocotorExtraInfo(doctor_info)
    {
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
    function passTimslotId(time_slot_id, user_id, btn_id)
    {
        $("#time_slot_id").val(time_slot_id);
        $("#user_id").val(user_id);
        $("#"+btn_id).removeClass("bg-white");
        $("#"+btn_id).addClass("bg-primary");
        alert('fds');
        console.log(btn_id);
    }

    /**
     * displaying doctors and their respective day and timeslots selected
     */
    function displayDoctorsAndTheirAvailability(doctors)
    {
        var doctors_and_timslots = ''
        console.log(doctors);
        for(var i in doctors){
            /**
             * drawing out doctors and their times slots based on specialty and consultations selected by user
             */
            timeSlotdata = '';
            for(var q = 0; q < doctors[i].availability.length; q++){
                console.log(doctors[i].availability[q].BookingTimeslots.id);
                timeSlotdata += \`<div class="col-md-3 p-1"> <button type="button" style="font-size:12px" class="btn third-step time-slot-button bg-white p-3" id="\${doctors[i].availability[q].BookingTimeslots.id}" onclick="passTimslotId(\${doctors[i].availability[q].BookingTimeslots.id}, \${doctors[i].user.id}, \${doctors[i].availability[q].BookingTimeslots.id})">\${doctors[i].availability[q].BookingTimeslots.slot}</button></div>\`;
            }
            doctors_and_timslots += "<div style='' class='col-md-4 p-2'><div class='p-3' style='background-color:#90ee904d;border-radius:10px;'><div class='row'><div class='col-md-3 p-2 px-3'><div style='border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url(/hms/assets/img/dp.jpg);' class='doctor-img p-3'></div></div><div class='col-md-5 text-left p-2'><p class='text-secondary mb-0'>DOCTOR</p><h5 class='mt-2'><a href='#' onclick='displayDocotorExtraInfo("+JSON.stringify(doctors[i])+")'>"+doctors[i].user.first_name +" "+doctors[i].user.last_name+"</a></h5></div></div><div class='row mt-2 p-2'>"+timeSlotdata+"</div></div></div>";
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
        $("#day-selected").val(split[0])
    }

    /**
     * functions to run when document is loaded and ready
     */
    $(document).ready(function() 
    {
        getDayFromDate()
        getComorbidities()
        getAppointments()
    });

    /**
     * function to fetch and append comorbidities
     */
    function getComorbidities()
    {
        $.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'PatientVisits', 'action' => 'getPastIllnesses' ] ); -->",
            cache: false,
            success: function (response){
				var res = JSON.parse(response);	
				$('#comorbidity_id').empty()
				$.each(res, function(key, value) {
					$('#comorbidity_id').append($('<option data-name="'+res[key].name+'"></option>').val(res[key].id).html(res[key].name));  
				});	
				$("#comorbidity_id").selectpicker("refresh");
            }
        });
    }
    mobiscroll.setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

var calendar,
    popup,
    range,
    oldEvent,
    tempEvent = {},
    deleteEvent,
    restoreEvent,
    titleInput = document.getElementById('work-order-title'),
    tooltip = document.getElementById('custom-event-tooltip-popup'),
    locationInput = document.getElementById('work-order-location'),
    notesTextarea = document.getElementById('work-order-notes'),
    deleteButton = document.getElementById('work-order-delete'),
    resourceCont = document.getElementById('work-order-resources');

var myData = [];
var slots = [];
var myResources = [];

function createAddPopup(elm) {
    // hide delete button inside add popup
    deleteButton.style.display = 'none';
    deleteEvent = true;
    restoreEvent = false;

    // set popup header text and buttons for adding
    popup.setOptions({
        headerText: 'New work order',
        buttons: [
            'cancel',
            {
                text: 'Add',
                keyCode: 'enter',
                handler: function () {
                    calendar.updateEvent(tempEvent);
                    deleteEvent = false;

                    // navigate the calendar to the correct view
                    calendar.navigate(tempEvent.start);

                    popup.close();
                },
                cssClass: 'mbsc-popup-button-primary'
            }
        ]
    });

    // fill popup with a new event data
    mobiscroll.getInst(titleInput).value = tempEvent.title;
    mobiscroll.getInst(locationInput).value = '';
    mobiscroll.getInst(notesTextarea).value = '';
    range.setVal([tempEvent.start, tempEvent.end]);
    // setCheckboxes(tempEvent.resource);

    // set anchor for the popup
    popup.setOptions({ anchor: elm });

    popup.open();
}

function createEditPopup(args) {
    var ev = args.event;

    // show delete button inside edit popup
    deleteButton.style.display = 'block';

    deleteEvent = false;
    restoreEvent = true;

    // set popup header text and buttons for editing
    popup.setOptions({
        headerText: 'Edit event',
        buttons: [
            'cancel',
            {
                text: 'Save',
                keyCode: 'enter',
                handler: function () {
                    var date = range.getVal();
                    // update event with the new properties on save button click
                    calendar.updateEvent({
                        id: ev.id,
                        title: titleInput.value,
                        location: locationInput.value,
                        notes: notesTextarea.value,
                        start: date[0],
                        end: date[1],
                        color: ev.color,
                        resource: ev.resource,
                    });

                    // navigate the calendar to the correct view
                    calendar.navigate(date[0]);;

                    restoreEvent = false;
                    popup.close();
                },
                cssClass: 'mbsc-popup-button-primary'
            }
        ]
    });

    // fill popup with the selected event data
    mobiscroll.getInst(titleInput).value = ev.title || '';
    mobiscroll.getInst(locationInput).value = ev.location || '';
    mobiscroll.getInst(notesTextarea).value = ev.notes || '';
    range.setVal([ev.start, ev.end]);
    // setCheckboxes(ev.resource);

    // set anchor for the popup
    popup.setOptions({ anchor: args.domEvent.currentTarget });
    popup.open();
}

mobiscroll.setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

// var myResources = [{
//     id: 1,
//     name: 'Ryan',
//     color: '#f7c4b4'
// }, {
//     id: 2,
//     name: 'Kate',
//     color: '#c6f1c9'
// }, {
//     id: 3,
//     name: 'John',
//     color: '#e8d0ef'
// }];

var myResources = <!-- php: = json_encode($doctors) -->

var calendar = mobiscroll.eventcalendar('#demo-dynamic-filter', {
    clickToCreate: true,
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
        schedule: {
            type: 'week',
            allDay: false,
            startDay: 1,
            endDay: 5,
            startTime: '08:00',
            endTime: '17:00'
        },
    },
    renderHeader: function () {
        return '<div mbsc-calendar-nav class="md-work-week-nav"></div>' +
            '<div class="md-work-week-picker">' +
            '<label>Day<input mbsc-segmented type="radio" name="view" value="day" class="md-view-change"></label>' +
            '<label>Week<input mbsc-segmented type="radio" name="view" value="week" class="md-view-change"  checked></label>' +
            '<label>Month<input mbsc-segmented type="radio" name="view" value="month" class="md-view-change"></label>' +
            '<label>Agenda<input mbsc-segmented type="radio" name="view" value="agenda" class="md-view-change"></label>' +
            '</div>' +
            '<div class="d-flex"><div mbsc-calendar-prev class="md-work-week-prev"></div>' +
            '<div mbsc-calendar-today class="md-work-week-today"></div>' +
            '<div mbsc-calendar-next class="md-work-week-next"></div></div>';
    },
    resources: myResources
});

var checkboxList = document.querySelectorAll('.demo-shared-events-checkbox')

checkboxList.forEach(function (elm) {
    elm.addEventListener('change', function () {
        var selected = {};

        for (var i = 0; i < checkboxList.length; i++) {
            var checkbox = checkboxList[i];
            selected[+checkbox.value] = checkbox.checked;
        }

        calendar.setOptions({
            resources: myResources.filter(function (r) {
                return selected[r.id];
            })
        });
    });
});

mobiscroll.util.http.getJson('https://trial.mobiscroll.com/resource-events-shared/', function (events) {
    console.log(events);
    // calendar.setEvents(events);
}, 'jsonp');

// calendar = mobiscroll.eventcalendar('#demo-work-order-scheduling', {
//     clickToCreate: false,
//     dragToCreate: false,
//     dragToMove: false,
//     dragToResize: false,
//     dragTimeStep: 30,
//     view: {
//         timeline: {
//             type: 'week',
//             startDay: 1,
//             eventList: true,
//             endDay: 5
//         },
//         timeCellStep: 1440,
//         timeLabelStep: 1440,
//         weekNumbers: false
            
//     },
//     data: myData,
//     slots: slots,
//     resources: myResources,
//     extendDefaultEvent: function (ev) {
//         var d = ev.start;
//         var start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), ev.slot == 1 ? 7 : 12);
//         var end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), ev.slot == 1 ? 13 : 18);

//         return {
//             title: formatDate('HH:mm', start) + ' - ' + formatDate('HH:mm', end),
//             start: start,
//             end: end,
//             resource: ev.resource
//         };
//     },
//     extendDefaultEvent: function () {
//         return {
//             title: 'Work order',
//             location: ''
//         };
//     },
//     onEventClick: function (args) {
//         oldEvent = { ...args.event };
//         tempEvent = args.event;

//         if (!popup.isVisible()) {
//             createEditPopup(args);
//         }
//     },
//     onEventCreated: function (args) {
//         popup.close();
//         // store temporary event
//         tempEvent = args.event;
//         createAddPopup(args.target);
//     },
//     onEventDeleted: function (args) {
//         mobiscroll.snackbar({            button: {
//                 action: function () {
//                     calendar.addEvent(args.event);
//                 },
//                 text: 'Undo'
//             },
//             message: 'Event deleted'
//         });
//     },
//     renderResource: function (resource) {
//             return '<div class="md-meeting-participant-cont">' +
//                 '<div class="md-meeting-participant-name">' + resource.name + '</div>' +
//                 '<span class="md-meeting-participant-offset">' + (resource.department != undefined ? resource.department : '') + '</span></div>' +
//                 '<img class="md-meeting-participant-avatar" src="' + (resource.img != undefined ? resource.img : '') + '"/>' +
//                 '</div>';
//         },
//         renderHeader: function () {
//         return '<div mbsc-calendar-nav class="md-work-week-nav"></div>' +
//             '<div class="md-work-week-picker">' +
//             '<label>Day<input mbsc-segmented type="radio" name="view" value="day" class="md-view-change"></label>' +
//             '<label>Week<input mbsc-segmented type="radio" name="view" value="week" class="md-view-change"  checked></label>' +
//             '<label>Month<input mbsc-segmented type="radio" name="view" value="month" class="md-view-change"></label>' +
//             '<label>Agenda<input mbsc-segmented type="radio" name="view" value="year" class="md-view-change"></label>' +
//             '</div>' +
//             '<div class="d-flex"><div mbsc-calendar-prev class="md-work-week-prev"></div>' +
//             '<div mbsc-calendar-today class="md-work-week-today"></div>' +
//             '<div mbsc-calendar-next class="md-work-week-next"></div></div>';
//     },
//     renderSlot: function (args) {
//         var slotId = args.slot.id;
//         return '<div style=";padding:4px;">' +
//             '<div class="slot-name">' + args.slot.name + '</div>' +
//             '<div class="slot-time">' + args.slot.start + ' - '+ args.slot.end + '</div>' +
//             '</div>';
//     }
// });
document.querySelectorAll('.md-view-change').forEach(function (elm) {
    elm.addEventListener('change', function (ev) {
        switch (ev.target.value) {
            case 'day':
                calendar.setOptions({
                    view: {
                        timeline: { type: 'day' }
                    }
                })
                break;
            case 'week':
                calendar.setOptions({
                    view: {
                        timeline: {
                            type: 'week',
                            startDay: 1,
                            endDay: 5
                        }
                    }
                })
                break;
            case 'month':
                calendar.setOptions({
                    view: {
                        calendar: {
                            labels: 'true'
                        }
                    }
                })
                break;
                case 'agenda':
                calendar.setOptions({
                    view: {
                        calendar: {
                            label: 'true'
                        },
                        agenda: { type: 'day' }
                    }
                })
                break;
        }
    });
});

popup = mobiscroll.popup('#demo-work-order-popup', {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    scrollLock: false,
    onClose: function () {
        if (deleteEvent) {
            calendar.removeEvent(tempEvent);
        } else if (restoreEvent) {
            calendar.updateEvent(oldEvent);
        }
    },
    responsive: {
        medium: {
            display: 'anchored',
            width: 520,
            fullScreen: false,
            touchUi: false
        }
    }
});

titleInput.addEventListener('input', function (ev) {
    // update current event's title
    tempEvent.title = ev.target.value;
});

locationInput.addEventListener('input', function (ev) {
    // update current event's title
    tempEvent.location = ev.target.value;
});

notesTextarea.addEventListener('change', function (ev) {
    // update current event's title
    tempEvent.notes = ev.target.value;
});

range = mobiscroll.datepicker('#work-order-date', {
    controls: ['time'],
    select: 'range',
    startInput: '#work-order-input',
    endInput: '#work-order-input',
    showRangeLabels: false,
    touchUi: false,
    stepMinute: 30,
    minTime: '06:00',
    maxTime: '22:00',
    onChange: function (args) {
        var date = args.value;
        // update event's start date
        tempEvent.start = date[0];
        tempEvent.end = date[1];
    }
});

document.querySelectorAll('input[name=event-status]').forEach(function (elm) {
    elm.addEventListener('change', function () {
        // update current event's free property
        tempEvent.free = mobiscroll.getInst(freeSegmented).checked;
    });
});

deleteButton.addEventListener('click', function () {
    // delete current event on button click
    calendar.removeEvent(tempEvent);
    popup.close();

    // save a local reference to the deleted event
    var deletedEvent = tempEvent;

    mobiscroll.snackbar({        button: {
            action: function () {
                calendar.addEvent(deletedEvent);
            },
            text: 'Undo'
        },
        message: 'Event deleted'
    });
});

function getAppointments(){
    $.ajax({
        url: '<!-- php: = $this->Url->Build(['controller' => 'Patients', 'action' => 'getRoutineCareAppointments']) -->',
        type: 'GET',
        success: function(res){
            console.log(res);
            calendar.setEvents(res);
        },
        error: function(err){
            console.log(err);
        }
    })
}

function filterAppointments(val){
    console.log(val);
    $.ajax({
        url: '<!-- php: = $this->Url->Build(['controller' => 'Patients', 'action' => 'getRoutineCareAppointments']) -->',
        type: 'POST',
        data: {specialties: $('#specialty_ids').val()},
        success: function(res){
            console.log(res);
            calendar.setEvents(res);
        },
        error: function(err){
            console.log(err);
        }
    });
}

</script>
`;

export default function ElementElementPatientPatientAppointments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
