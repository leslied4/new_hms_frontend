import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Book/index_copy_abu.php';
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
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    	<!--MobiScroll-->
	<!-- php: =$this->Html->css('../assets/plugins/mobiscroll/css/mobiscroll.javascript.min.css') -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.18/css/bootstrap-select.min.css" integrity="sha512-ARJR74swou2y0Q2V9k0GbzQ/5vJ2RBSoCWokg4zkfM29Fb3vZEQyv0iWBMW/yvKgyHSR/7D64pFMmU8nYmbRkg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    input, select, option{
        font-size: 17px!important;
    }
    .bootstrap-select>.dropdown-toggle.bs-placeholder, .bootstrap-select>.dropdown-toggle.bs-placeholder:active, .bootstrap-select>.dropdown-toggle.bs-placeholder:focus, .bootstrap-select>.dropdown-toggle.bs-placeholder:hover {
        color: #999;
        height: 60px;
        font-size:17px;
    }
    .bootstrap-select .dropdown-toggle .filter-option {
        display: flex;
        align-items: center;
        font-size:17px;
    }
    .bootstrap-select .dropdown-toggle .filter-option-inner-inner {
        font-size: 17px;
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
  </style>
</head>
<body>
<div class="d-flex justify-content-center mt-2">
    <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 50px', 'fullBase' => true]) -->
</div>
<h3 class="text-center pb-4 pt-3">
    <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h3>
<div id="book-appointment" class="container d-none">
    <div height="auto" class="stepper" id="stepper1">
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
                                <button class="btn bg-Pwhite p-4 second-step" value="<!-- php: = $specialty->id -->"
                                    onclick="getConsultations(this.value)"><!-- php: = $specialty->name --></button>
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
                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="appointment_type" id="appointment_type" title="Appointment Type" data-live-search="true" required>
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
                                                <div style="border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url('/hms/assets/img/dp.jpg');"
                                                    class="doctor-img p-3"></div>
                                            </div>

                                            <div class="col-md-9 p-2 px-3">
                                                <p class="text-secondary mb-0">DOCTOR</p>
                                                <h5 class="mt-2">Dr. Black Dante, DDS</h5>
                                            </div>
                                        </div>
                                        <div class="row mt-2 p-2">
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                        </div>
                                        <div class="row mt-2 p-2">
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="" class="col-md-4 p-2">
                                    <div class="p-3" style="background-color:#ff634714;border-radius:10px;">
                                        <div class="row">
                                            <div class="col-md-3 p-2 px-3">
                                                <div style="border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url('/hms/assets/img/dp.jpg');"
                                                    class="doctor-img p-3"></div>
                                            </div>

                                            <div class="col-md-9 p-2 px-3">
                                                <p class="text-secondary mb-0">DOCTOR</p>
                                                <h5 class="mt-2">Dr. Black Dante, DDS</h5>
                                            </div>
                                        </div>
                                        <div class="row mt-2 p-2">
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                        </div>
                                        <div class="row mt-2 p-2">
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="" class="col-md-4 p-2">
                                    <div class="p-3" style="background-color:#add8e642;border-radius:10px;">
                                        <div class="row">
                                            <div class="col-md-3 p-2 px-3">
                                                <div style="border-radius:100px; width: 60px; height:60px; background-size:cover!important; background-position:center;background:url('/hms/assets/img/dp.jpg');"
                                                    class="doctor-img p-3"></div>
                                            </div>

                                            <div class="col-md-9 p-2 px-3">
                                                <p class="text-secondary mb-0">DOCTOR</p>
                                                <h5 class="mt-2">Dr. Black Dante, DDS</h5>
                                            </div>
                                        </div>
                                        <div class="row mt-2 p-2">
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                        </div>
                                        <div class="row mt-2 p-2">
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
                                            </div>
                                            <div class="col-md-3 p-0">
                                                <button style="font-size:12px" class="btn third-step bg-white p-3">10:00
                                                    AM</button>
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
                                <button style="font-size:17px;" class="accordion-button" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                                    aria-controls="collapseOne">
                                    <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) -->
                                    Contact Information
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                <div class="row mt-3">
                                        <!-- <div class="col-md-2">
                                            
                                        </div> -->
                                        <div class="col-md-5">
                                        <div class="d-flex align-items-center">
                                        <h6 class="my-0 mr-3">Are you booking for someone ?</h6>
                                            <div class="form-check form-check-inline">
                                                <input onchange="isSomeone(this.value)" class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="isSomeone" value="yes">
                                                <label class="form-check-label" for="isSomeone">Yes</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input onchange="isSomeone(this.value)" class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="notSomeone" value="no">
                                                <label class="form-check-label" for="notSomeone">No</label>
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

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button style="font-size:17px;" class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                                    aria-controls="collapseTwo">
                                    <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) -->
                                    Medical History
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div class="row mt-3">
                                        <div class="col-md-1">
                                            <h6>Asthma</h6>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="inlineRadio1" value="option1">
                                                <label class="form-check-label" for="inlineRadio1">Yes</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="inlineRadio2" value="option2">
                                                <label class="form-check-label" for="inlineRadio2">No</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="inlineRadio3" value="option3">
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
                                <button style="font-size:17px;" class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                                    aria-controls="collapseThree">
                                    <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) -->
                                    COVID Screening
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It is hidden by default,
                                    until the collapse plugin adds the appropriate classes that we use to style each
                                    element. These classes control the overall appearance, as well as the showing and
                                    hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                                    our default variables. It's also worth noting that just about any HTML can go within
                                    the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingFour">
                                <button style="font-size:17px;" class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
                                    aria-controls="collapseFour">
                                    <!-- php: = $this->Html->image("../assets/img/check-success.png", ['class' => "login-img me-3", 'style' => 'width: auto; height: 30px', 'fullBase' => true]) -->
                                    HIIPA Form
                                </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It is hidden by default,
                                    until the collapse plugin adds the appropriate classes that we use to style each
                                    element. These classes control the overall appearance, as well as the showing and
                                    hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                                    our default variables. It's also worth noting that just about any HTML can go within
                                    the <code>.accordion-body</code>, though the transition does limit overflow.
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
                                                            <th><small class="textmuted py-2">Items</small></th>
                                                            <th><small class="textmuted py-2">Qty</small></th>
                                                            <th><small class="textmuted py-2">Price</small></th>
                                                            <th><small class="textmuted py-2">Total</small></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <!-- php: foreach($invoice->invoicing_items as $inv_item){ $sum+=$inv_item->amount; -->
                                                        <tr>
                                                            <td><small class="py-2"><!-- php: = $inv_item->item_name --></small>
                                                            </td>
                                                            <td><small class="py-2"><!-- php: = $inv_item->qty --></small></td>
                                                            <td><small class="py-2"><!-- php: = $inv_item->rate --> </small></td>
                                                            <td><small class="py-2"><!-- php: = $inv_item->amount --></small>
                                                            </td>
                                                        </tr>
                                                        <!-- php: } -->
                                                    </tbody>
                                                </table>

                                            </div>
                                            <div class="d-flex h7 mb-2">
                                                <p class="">Total Amount</p>
                                                <p class="ms-auto"><!-- php: = $currency --><!-- php: = $sum --></p>
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
                                <p class="fw-bold h6"><!-- php: = $invoice->payer_name --></p>
                                <p class="textmuted h8"><!-- php: = $invoice->address --></p>
                                <div class="mt-5">
                                    <p class="h7 fw-bold mb-1">Pay for Invoice</p>

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
                                    <SearchableSelectField name="payer" id="payer" class="form-control mt-2">
                                        <option>Select Payer</option>
                                        <option value="patient">Patient</option>
                                        <option value="insurance">Insurance</option>
                                        <option value="company/credit">Company/Credit</option>
                                    </SearchableSelectField>
                                    <p class="h7 fw-bold mb-1 mt-5">Payment Option</p>
                                    <SearchableSelectField name="payer" id="payment-option" class="form-control">
                                       
                                    </SearchableSelectField>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="stepper-content fade-in" stepper-label="5">
                <div>
                    <h3 class="text-center mt-5">Are you sure you want book appointment at
                        <!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') -->
                    </h3>
                    <p class="text-secondary mt-2 text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium omnis tempora aliquid amet
                        molestiae corrupti excepturi minus velit ipsum esse?
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
        <button onclick="goHome()" style="width:120px!important;" class="btn btn-secondary mt-5 ml-3"><i class="fa fa-home"></i>&nbsp;Go Home</button>
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
                <!-- <div class="step" icon="fa fa-pencil-alt" id="2">
                    <div class="step-title">
                        <span class="step-number">02</span>
                        <div class="step-text">Book Appointment</div>
                    </div>
                </div> -->
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
        <button onclick="goHome()" style="width:120px!important;" class="btn btn-secondary mt-5 ml-3"><i class="fa fa-home"></i>&nbsp;Go Home</button>
    </div>
</div>
<div id="CRMoptions" class="stepper-content fade-in" stepper-label="5">
    <div class="mt-5">
        <h4 class="text-center text-secondary mt-5">
            What will you be using Patient CRM for?
        </h4>
        <!-- <p class="text-secondary mt-2 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium omnis tempora aliquid amet
            molestiae corrupti excepturi minus velit ipsum esse?
        </p> -->
        <div class="container mt-5 col-md-4">
            <div class="d-flex">
                <button onclick="toggleCRM('book-appointment')" style="font-size:18px;" class="btn p-3">

                    <!-- php: = $this->Html->image("../assets/img/book-service.png", ['class' => "login-img mb-2", 'style' => 'width: auto; height: 80px', 'fullBase' => true]) -->
                    <br />Book Appointment
                </button>
                <button onclick="toggleCRM('manage-appointment')" style="font-size:18px;" class="btn p-3">

                    <!-- php: = $this->Html->image("../assets/img/manage-booking.png", ['class' => "login-img mb-2", 'style' => 'width: auto; height: 80px', 'fullBase' => true]) -->
                    <br />Manage Appointment
                </button>
                <!-- <button style="font-size:18px" class="btn btn-danger p-3 font-weight-bold">No</button> -->
            </div>
        </div>
    </div>
</div>

<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery/jquery.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/popper/popper.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/bootstrap/js/bootstrap.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery/jquery-migrate-3.0.0.min.js') -->
    <!-- php: = $this->Html->script('../assets/plugins/jquery-ui/jquery-ui.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/popper/popper.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/jquery-blockui/jquery.blockui.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/jquery-slimscroll/jquery.slimscroll.js') -->

    <!-- php: = $this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.18/js/bootstrap-select.min.js" integrity="sha512-yDlE7vpGDP7o2eftkCiPZ+yuUyEcaBwoJoIhdXv71KZWugFqEphIS3PU60lEkFaz8RxaVsMpSvQxMBaKVwA5xg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->

<!-- <script src="https://cdn.jsdelivr.net/npm/cdbootstrap/js/bootstrap.min.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/cdbootstrap/js/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/cdbootstrap/js/cdb.min.js"></script>
  <!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->
  <script>
    const stepper1 = document.querySelector('#stepper1');
    alert(stepper1)
    const stepper2 = document.querySelector('#stepper2');
    alert(stepper2)
    var step1 = new CDB.Stepper(stepper1);
    var step2 = new CDB.Stepper(stepper2);
    // step1.navigate(3);
    
    $('.second-step').on('click', function(){
        step1.navigate(2);
    });
    $('.third-step').on('click', function(){
        step1.navigate(3);
    });
    function isSomeone(value){
        if(value == "yes"){

             $("#is-someone-div").html('<div class="col-md-1 d-flex align-items-center"><h6>Patient Name</h6></div><div class="col-md-5"><input type="text" class="form-control"></div>');
        } else {
            $("#is-someone-div").html("");
        }
    }

    $("#payer").on('change', function(){

        if($(this).val() == 'patient'){
            $('#payment-option').html("<option value='mobile-money'>Mobile Money</option>");
        } else {
            $.ajax({
           type:"POST",
           data: {value:$(this).val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'Invoicing', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#payment-option').html(html);
           },
           error: function(){
               alert('false');
           }

       });
        }
    
    });
     var dummy_pic = '<!-- php: = $this->Html->image("../img/dp3-.jpg", ['class' => "login-img", 'style' => 'width: auto; height: 30px; border-radius: 50px;', 'fullBase' => true]) -->';
    getPatientRoutineCare();
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
        renderEventContent: function (data) {
			console.log(data);
			let title = data.title.split('---');

			if(title.length > 1){
				
				return '<h4>Appointment Test</h4><div style="text-align:left;display:flex;align-items:center;"><img style="height:30px;width:auto;" src="'+ data.original.icon +'"/><div class="d-flex flex-column"><span>'+ title[0] + '</span><span>'+ title[1] +'</span></div></div>' +
            '<div style="display: flex;align-items: center;padding-top: 10px;font-size: 13px;" class="md-custom-event-cont">' +'' +
            // '<div class="mbsc-custom-event-name">' + getParticipant(data.original.participant).name + '</div>' +
            '<div style="w-100">'+ data.original.buttons +'</div>' +
            '</div>';

			} else {
				
                return '<h4 class="mb-3">Appointment Test</h4><div style="text-align:left;display:flex;align-items:center;">'+ dummy_pic +'<div class="d-flex flex-column ml-2"><span>Dr. Abu</span></div></div>' +
                '<div style="display: flex;align-items: center;padding-top: 10px;font-size: 13px;" class="md-custom-event-cont">' +'' +
                // '<div class="mbsc-custom-event-name">' + getParticipant(data.original.participant).name + '</div>' +
                '<div style="w-100">'+ data.original.buttons +'</div>' +
                '</div>';

			}
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

        // mobiscroll.util.http.getJson('https://trial.mobiscroll.com/events/?vers=5', function (events) {
        // dayInst.setEvents(events);
        // monthInst.setEvents(events);
        // }, 'jsonp');
        function getPatientRoutineCare(){
        $.ajax({
        // url:"<!-- php: //= $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientRoutineCare', $patient->id]) -->",
        url:"<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientRoutineCare', 14]) -->",
        method: "GET",
        success: function(data){
        //console.log(data);
        // inst.setEvents(data);
        dayInst.setEvents(data);
        monthInst.setEvents(data);
        }
        });

        }
    //end of mobiscroll


    function getConsultations(specialty_id)
    {
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'Book', 'action' => 'getConsultationsBySpecialty']) -->/'+ specialty_id,
            type: 'GET',
            cache: false,
            success: function(res){
                res = JSON.parse(res);
                console.log(res);
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

    function toggleCRM(option){
        $("#CRMoptions").hide();
        $("#"+option).removeClass("d-none");
        sessionStorage.setItem("crmOption", option);
    }

    function checkCRMoption(){
        var option = sessionStorage.getItem("crmOption");
        option ? toggleCRM(option) : console.log('option not saved');

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
    checkCRMoption();





    function goHome(){
        sessionStorage.setItem("crmOption", "");
        window.location.reload();
    }
    
   
</script>

</body>
</html>
`;

export default function BookIndexCopyAbuPage() {
  return (
    <PageShell title="Book/index_copy_abu.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
