import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Book/index_copy.php';
const rawHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Appointment</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cdbootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cdbootstrap/css/cdb.min.css"/>
    <!--MobiScroll-->
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/bootstrap.min.css') -->
	<!-- php: =$this->Html->css('../assets/plugins/mobiscroll/css/mobiscroll.javascript.min.css') -->
	
    <!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') --> 
    <!-- php: = $this->Html->css('../assets/plugins/bootstrap-select/css/bootstrap-select.min.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css') -->
  <style>
    input, select, option{
        font-size: 30px!important;
    }
    .bootstrap-select>.dropdown-toggle.bs-placeholder, .bootstrap-select>.dropdown-toggle.bs-placeholder:active, .bootstrap-select>.dropdown-toggle.bs-placeholder:focus, .bootstrap-select>.dropdown-toggle.bs-placeholder:hover {
        color: #999;
        height: 60px;
        font-size:35px;
    }
    .bootstrap-select .dropdown-toggle .filter-option {
        display: flex;
        align-items: center;
        font-size:35px;
    }
    .bootstrap-select .dropdown-toggle .filter-option-inner-inner {
        font-size: 35px;
    }
    .btn{
        width:100%!important;
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
  </style>
</head>
<body>
<div class="d-flex justify-content-center mt-2">
        <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 50px', 'fullBase' => true]) -->
    </div>
    <h3 class="text-center pb-4 pt-3">
        <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h3>
<div class="container">
<div height="auto" class="stepper" id="stepper">
  <div class="steps-container">
    <div class="steps">
      <div class="step" icon="fa fa-pencil-alt" id="1">
        <div class="step-title">
          <span class="step-number">01</span>
          <div class="step-text">Select Care Type</div>
        </div>
      </div>
      <div class="step" icon="fa fa-pencil-alt" id="2">
        <div class="step-title">
          <span class="step-number">02</span>
          <div class="step-text">Book Appointment</div>
        </div>
      </div>
      <div class="step" icon="fa fa-info-circle" id="3">
        <div class="step-title">
          <span class="step-number">03</span>
          <div class="step-text">Personal Data</div>
        </div>
      </div>
      <div class="step" icon="fa fa-book-reader" id="4">
        <div class="step-title">
          <span class="step-number">04</span>
          <div class="step-text">Estimate</div>
        </div>
      </div>
      <div class="step" icon="fa fa-check" id="5">
        <div class="step-title">
          <span class="step-number">05</span>
          <div class="step-text">Finish</div>
        </div>
      </div>
    </div>
  </div>
  <div class="stepper-content-container">
    <div class="stepper-content fade-in" stepper-label="1">
      <div>
      <div class="container-fluid p-3">
        <div class="row">
            <!-- php: foreach($specialties as $specialty){ -->
                <div class="col-md-3 p-3 w-100">
                    <button class="btn bg-Pwhite p-4 second-step" value="<!-- php: = $specialty->id -->" onclick="getConsultations(this.value)"><!-- php: = $specialty->name --></button>
                </div>
            <!-- php: } -->
            <!-- <button class="btn btn-light" id="nextbtn">Next</button> -->
        </div>
        </div>
      </div>
    </div>
    <div class="stepper-content fade-in" stepper-label="2">
      <div>
       <div class="container-fluid pl-0">
        <div class="row">
            <div class="col-md-6">
            <div class="form-group mt-3">
                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="appointment_type" id="appointment_type" title="Appointment Type"  data-live-search="true" required onchange="getAvailableDoctors(this.value)">
                </SearchableSelectField>
            </div>
            </div>
            <div class="col-md-6">
            <div class="form-group mt-3">
                <input type="date" class="form-control p-3">
            </div>
            </div>
        </div>
            <div class="container-fluid p-3 mt-4">
               <div class="row">
                    <div style="" class="col-md-4 p-2">
                        <div class="p-3" style="background-color:#90ee904d;border-radius:10px;">
                        <div class="row">
                                <div class="col-md-3 p-2 px-3">
                                    <div style="border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url('/hms/assets/img/dp.jpg');" class="doctor-img p-3"></div>
                                </div>
                            
                                <div class="col-md-9 p-2 px-3">
                                    <p class="text-secondary mb-0">DOCTOR</p>
                                    <h5 class="mt-2">Dr. Black Dante, DDS</h5>
                                </div>
                            </div>
                            <div class="row mt-2 p-2">
                                <div class="col-md-3 p-0">
                                    <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                                <div class="col-md-3 p-0">
                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                                <div class="col-md-3 p-0">
                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                                <div class="col-md-3 p-0">
                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                            </div>
                            <div class="row mt-2 p-2">
                                <div class="col-md-3 p-0">
                                    <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                                <div class="col-md-3 p-0">
                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                                <div class="col-md-3 p-0">
                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                                <div class="col-md-3 p-0">
                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00 AM</button>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
       </div>
      </div>
    </div>
    <div class="stepper-content fade-in" stepper-label="3">
      <div>
      <div class="accordion mt-5" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                <button style="font-size:17px;" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) -->  Contact Information
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="row my-3">
                        <div class="col-md-1 d-flex align-items-center">
                            <h6>Fullname</h6>
                        </div>
                        <div class="col-md-5">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-1 d-flex align-items-center">
                            <h6>Email</h6>
                        </div>
                        <div class="col-md-5">
                            <input type="email" class="form-control">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-1 d-flex align-items-center">
                            <h6>Phone</h6>
                        </div>
                        <div class="col-md-5">
                            <input type="number" class="form-control">
                        </div>
                    </div>
                    <!-- <div class="row mt-3">
                        <div class="col-md-1 d-flex align-items-center">
                            <h6>Address</h6>
                        </div>
                        <div class="col-md-5">
                            <textarea name="" id="" class="form-control"></textarea>
                        </div>
                    </div> -->
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                <button style="font-size:17px;" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) --> Medical History
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <div class="row mt-3">
                        <div class="col-md-1">
                            <h6>Asthma</h6>
                        </div>
                        <div class="col-md-5">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                                    value="option1">
                                <label class="form-check-label" for="inlineRadio1">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                    value="option2">
                                <label class="form-check-label" for="inlineRadio2">No</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                                    value="option3">
                                <label class="form-check-label" for="inlineRadio3">Other</label>
                            </div>
                            <input type="email" class="form-control mt-3">
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                <button style="font-size:17px;" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) --> COVID Screening
                </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                <button style="font-size:17px;" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) --> HIIPA Form
                </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            </div>
      </div>
    </div>
    <div class="stepper-content fade-in" stepper-label="4">
      <div class="p-3">
      <div class="row m-0">
          <div class="col-md-6 col-12 p-3">
              <div class="row">
                  <div class="col-12 mb-4">
                      <div class="row box-right">
                          <div class="col-md-8 ps-0 ">
                              <p class="ps-3 textmuted fw-bold h6 mb-0">Amount Due</p>
                              <p class="h1 fw-bold d-flex"> <!-- php: = $currency --> <!-- php: = $invoice->balance_due -->
                                  <!-- <span class="textmuted">.58</span> -->
                              </p>
                              <!-- <p class="ms-3 px-2 bg-green">+10% since last month</p> -->
                          </div>
                          <div class="col-md-4">
                              <!-- <p class="p-blue"> <span class="fas fa-circle pe-2"></span>Pending </p>
                            <p class="fw-bold mb-3"><!-- php: = $currency -->1254  -->
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
                          <div class="h8">
                              <div class="row m-0 border mb-3">
                                  <table class="table table-bordered">
                                      <thead>
                                          <tr>
                                              <th><small class="textmuted py-2">Items</small></th>
                                              <th><small class="textmuted py-2">Qty</small></th>
                                              <th><small class="textmuted py-2">Price</small></th>
                                              <th><small class="textmuted py-2">Total</small></th>
                                          </tr>
                                      </thead>
                                      <tbody>

                                          <!-- php: foreach($invoice->invoicing_items as $inv_item){ $sum+=$inv_item->amount; -->
                                          <tr>
                                              <td><small class="py-2"><!-- php: = $inv_item->item_name --></small></td>
                                              <td><small class="py-2"><!-- php: = $inv_item->qty --></small></td>
                                              <td><small class="py-2"><!-- php: = $inv_item->rate --> </small></td>
                                              <td><small class="py-2"><!-- php: = $inv_item->amount --></small></td>
                                          </tr>
                                          <!-- php: } -->
                                      </tbody>
                                  </table>

                              </div>
                              <div class="d-flex h7 mb-2">
                                  <p class="">Total Amount</p>
                                  <p class="ms-auto"><!-- php: = $currency --><!-- php: = $sum --></p>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
          <div class="col-md-6 col-12 pl-md-5 p-0 ">
              <div class="box-left">
                  <p class="textmuted h8">Invoice</p>
                  <p class="fw-bold h6"><!-- php: = $invoice->payer_name --></p>
                  <p class="textmuted h8"><!-- php: = $invoice->address --></p>
                  <!-- <p class="textmuted h8 mb-2">Utah, United States 84104</p> -->
                  <!-- <div class="h8">
                    <div class="row m-0 border mb-3">
                        <div class="col-6 h8 pe-0 ps-2">
                            <p class="textmuted py-2">Items</p> <span class="d-block py-2 border-bottom">Legal
                                Advising</span> <span class="d-block py-2">Expert Consulting</span>
                        </div>
                        <div class="col-2 text-center p-0">
                            <p class="textmuted p-2">Qty</p> <span class="d-block p-2 border-bottom">2</span> <span
                                class="d-block p-2">1</span>
                        </div>
                        <div class="col-2 p-0 text-center h8 border-end">
                            <p class="textmuted p-2">Price</p> <span class="d-block border-bottom py-2"><span
                                    class="fas fa-dollar-sign"></span>500</span> <span class="d-block py-2 "><span
                                    class="fas fa-dollar-sign"></span>400</span>
                        </div>
                        <div class="col-2 p-0 text-center">
                            <p class="textmuted p-2">Total</p> <span class="d-block py-2 border-bottom"><span
                                    class="fas fa-dollar-sign"></span>1000</span> <span class="d-block py-2"><span
                                    class="fas fa-dollar-sign"></span>400</span>
                        </div>
                    </div>
                    <div class="d-flex h7 mb-2">
                        <p class="">Total Amount</p>
                        <p class="ms-auto"><span class="fas fa-dollar-sign"></span>1400</p>
                    </div>
                    <div class="h8 mb-5">
                        <p class="textmuted">Lorem ipsum dolor sit amet elit. Adipisci ea harum sed quaerat tenetur </p>
                    </div>
                </div> -->
                  <div class="mt-5">
                      <p class="h7 fw-bold mb-1">Pay for Invoice</p>

                      <div class="accordion" id="accordionExample">
                          <div class="accordion-item">
                              <h2 class="accordion-header" id="headingTwo">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                      data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">

                                      <div class="d-flex align-items-center">
                                          <!-- php: = $this->Html->image('../assets/img/momoImg.png', ['style' => 'height:25px;width:auto;']) -->
                                          <span class="ms-3 mb-2">Mobile Money</span>
                                      </div>
                                  </button>
                              </h2>
                              <div id="collapseTwo" class="accordion-collapse collapse  show"
                                  aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                  <div class="accordion-body">
                                      <p class="textmuted h8 mb-2">Make payment for this invoice by filling in the
                                          details
                                      </p>
                                      <form id="makePaymentForm" class="form">
                                          <div class="row">
                                              <div class="col-12 my-3">
                                                  <div class="card border-0">
                                                      <input class="form-control ps-5" name="phone" id="phone"
                                                          type="text" value=""
                                                          placeholder="Mobile Number"> <span class="fa fa-phone"></span>
                                                  </div>
                                              </div>
                                              <div class="col-12 mb-3">
                                                  <div class="card border-0">
                                                      <i class="fa fa-envelope"></i>
                                                      <input name="email" class="form-control ps-5"
                                                          style="font-size:13px;" id="email"
                                                          value="" type="text"
                                                          placeholder="Email">
                                                      <input type="hidden" name="invoice_id" id="invoice_id"
                                                          value="<!-- php: //= $invoice->id -->">
                                                      <input type="hidden" id="transaction_no" name="transaction_no" />
                                                  </div>
                                              </div>

                                          </div>

                                          <button class="btn w-100 paybtn btn-primary d-block h8">PAY</button>
                                          <button
                                              class="btn w-100 completebtn btn-success d-none h8 mt-3">COMPLETED</button>
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
    </div>
    <div class="stepper-content fade-in" stepper-label="5">
      <div>
        <h3 class="text-center mt-5">Are you sure you want book appointment at  <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h3>
        <p class="text-secondary mt-2 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium omnis tempora aliquid amet molestiae corrupti excepturi minus velit ipsum esse?
        </p>
       <div class="container mt-5 col-md-6">
       <div class="d-flex">
        <button style="font-size:18px" class="btn btn-success p-3 font-weight-bold">Yes</button>
        <button style="font-size:18px" class="btn btn-danger p-3 font-weight-bold">No</button>
    </div>
       </div>
      </div>
    </div>
  </div>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <!-- php: = $this->Html->script('../assets/plugins/jquery/jquery.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/popper/popper.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/bootstrap/js/bootstrap.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery/jquery-migrate-3.0.0.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery-ui/jquery-ui.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/popper/popper.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/jquery-blockui/jquery.blockui.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/jquery-slimscroll/jquery.slimscroll.js') -->

    <!-- php: = $this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->

<script src="https://cdn.jsdelivr.net/npm/cdbootstrap/js/bootstrap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/cdbootstrap/js/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/cdbootstrap/js/cdb.min.js"></script>
  <script>
    const stepper1 = document.querySelector('#stepper1');
    alert(stepper1)
    const stepper2 = document.querySelector('#stepper2');
    alert(stepper2)
    var step1 = new CDB.Stepper(stepper1);
    var step2 = new CDB.Stepper(stepper2);
    // step1.navigate(3);
    
    // const stepper = document.querySelector('#stepper');
    // var step = new CDB.Stepper(stepper);
    $('.second-step').on('click', function(){
        step1.navigate(2);
    });
    $('.third-step').on('click', function(){
        step1.navigate(3);
    });

    //mobiscroll initialization
        mobiscroll.setOptions({
            theme: 'ios',
            themeVariant: 'light'
        });

        var monthInst,
        dayInst;

        monthInst = mobiscroll.eventcalendar('#demo-month', {
        view: {
            calendar: { popover: false, labels: false }
        },
        onSelectedDateChange: function (event) {
            dayInst.navigate(event.date);
        }
        });

        dayInst = mobiscroll.eventcalendar('#demo-day', {
        view: {
            agenda: { type: 'day' }
        },
        onPageChange: function (event, inst) {
            monthInst.navigate(event.firstDay);
        }
        });

        function navigate(inst, val) {
        if (inst) {
            inst.navigate(val);
        }
        }

        mobiscroll.util.http.getJson('https://trial.mobiscroll.com/events/?vers=5', function (events) {
        dayInst.setEvents(events);
        monthInst.setEvents(events);
        }, 'jsonp');
    //end of mobiscroll


    //sadat
    function getConsultations(specialty_id)
    {
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getConsultationsBySpecialty']) -->/'+ specialty_id,
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                res = res.consultations
                for (var i in res){
                    $('#appointment_type').append($('<option data-name="'+res[i].name+'"></option>').val(res[i].id).html(res[i].name));  
                }
                $("#appointment_type").selectpicker("refresh");
            },
            error: function(){
                console.log("Error Occured");
            }
        });
    }

    function getAvailableDoctors(val)
    {
        //sadat
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getAvailableDoctors']) -->/'+ val,
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                console.log(res);
                displayDoctorsAndTheirAvailability(res)
            },
            error: function(){
                console.log("Error Occured");
            }
        });
    }

    function displayDoctorsAndTheirAvailability(doctors)
    {

    }

    function submitForm()
    {
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'saveBooking']) -->/'+ val,
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                // console.log(res);
                // displayDoctorsAndTheirAvailability(res)
            },
            error: function(){
                console.log("Error Occured");
            }
        })
    }
</script>

</body>
</html>
`;

export default function BookIndexCopyPage() {
  return (
    <PageShell title="Book/index_copy.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
