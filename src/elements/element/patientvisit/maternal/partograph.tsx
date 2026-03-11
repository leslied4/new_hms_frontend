const rawHtml = `
<style>
  .medicationCard {border-color: #cce5ff ;}
  .medicationCard .card-header {
      background: #cce5ff ;
      color: #004085
      /* font-weight: bold; */
  }
  .fetus_readings {border-color: #cce5ff ;}
  .fetus_readings .card-header {
      background: #cce5ff ;
      color: #004085
      /* font-weight: bold; */
  }
  .amnoitic_reading {border-color: #ffeeba ;}
  .amnoitic_reading .card-header {
      background: #fff3cd ;
      color: #856404
      /* font-weight: bold; */
  }
  .moulding_reading {border-color: #c3e6cb ;}
  .moulding_reading .card-header {
      background: #d4edda ;
      color: #155724
      /* font-weight: bold; */
  }
  .reminder_readings {border-color: #f5c6cb ;}
  .reminder_readings .card-header {
      background: #f8d7da ;
      color: #721c24;
      font-weight: bold;
  }
  .activity_logs_reading {border-color: #bee5eb ;}
  .activity_logs_reading .card-header {
      background: #d1ecf1 ;
      color: #0c5460;
      font-weight: bold;
  }
.clinicalMain .card:hover {
            transition: all 0.2s ease-in-out;
            box-shadow: 15px 10px 15px #999;
            top: -5px;
            border: 1px solid #CCCCCC;
            background-color: white;
        }
        .bg-light-gray {
    background-color: #f7f7f7;
}
.table-bordered thead td, .table-bordered thead th {
    border-bottom-width: 2px;
}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}
.table-bordered td, .table-bordered th {
    border: 1px solid #dee2e6;
}


.bg-sky.box-shadow {
    box-shadow: 0px 5px 0px 0px #00a2a7
}

.bg-orange.box-shadow {
    box-shadow: 0px 5px 0px 0px #af4305
}

.bg-green.box-shadow {
    box-shadow: 0px 5px 0px 0px #4ca520
}

.bg-yellow.box-shadow {
    box-shadow: 0px 5px 0px 0px #dcbf02
}

.bg-pink.box-shadow {
    box-shadow: 0px 5px 0px 0px #e82d8b
}

.bg-purple.box-shadow {
    box-shadow: 0px 5px 0px 0px #8343e8
}

.bg-lightred.box-shadow {
    box-shadow: 0px 5px 0px 0px #d84213
}


.bg-sky {
    background-color: #02c2c7
}

.bg-orange {
    background-color: #e95601
}

.bg-green {
    background-color: #5bbd2a
}

.bg-yellow {
    background-color: #f0d001
}

.bg-pink {
    background-color: #ff48a4
}

.bg-purple {
    background-color: #9d60ff
}

.bg-lightred {
    background-color: #ff5722
}

.padding-15px-lr {
    padding-left: 15px;
    padding-right: 15px;
}
.padding-5px-tb {
    padding-top: 5px;
    padding-bottom: 5px;
}
.margin-10px-bottom {
    margin-bottom: 10px;
}
.border-radius-5 {
    border-radius: 5px;
}

.margin-10px-top {
    margin-top: 10px;
}
.font-size14 {
    font-size: 14px;
}

.text-light-gray {
    color: #d6d5d5;
}
.font-size13 {
    font-size: 13px;
}

.table-bordered td, .table-bordered th {
    border: 1px solid #dee2e6;
}
.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}
</style>
<!-- php: json_encode($fetus) -->
<!-- php: if(!isset($fetus) || $fetus==null || ($fetus->count() == 0)) { -->
  <div class="col-lg-12 col-md-12 col-sm-12 col-12">
    <div class="card card-box">
      
      <div class="card-body no-padding height-9">
        <h3 align="center" style="margin-bottom: 100px; margin-top: 100px">
          Partograph Not started. Please Enter <a href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'maternalVisits']) -->">Maternal Visit</a> to Start Partograph for This Patient
          
        </h3>
      </div>
    </div>
  </div>
<!-- php: }else{ -->


  <!-- php: $obstetrics = isset($patient->patient_history_obstetrics) && sizeof($patient->patient_history_obstetrics) > 0 ? $patient->patient_history_obstetrics[0] : []; $amniotic_fluid = [ 'I', 'C', 'M', 'B', 'A' ]; $moulding = [ '0', '+', '++', '+++'... -->

  <div class="borderBox light col-md-12">
      <div class="borderBox-title tabbable-line">
          <div class="caption">
              <!-- span class="caption-subject font-dark bold uppercase">Delivery</span -->
            <header style="color: #558; line-height: 17px; font-size: 20px; font-weight: 600;">Partograph
            
            <!-- php: if($labor_date_ended == null): -->
              <span>
                <a href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'endLaborCare', $fetus->first()->labor_care_id]) -->" class="btn btn-md btn-success">End LaborCare</a>
              </span>
              <!-- php: else: -->
              <span>
                <button type="button" class="btn btn-md btn-success" disabled>Labor Has Ended</button>
              </span>
              <!-- php: endif -->
            </header>
          </div>
          
          <ul class="nav nav-tabs" id="maternalDeliveryTab">
              <li class="nav-item">
                  <a href="#foetalInformation" class="active" data-toggle="tab">Foetal</a>
              </li>
              <li class="nav-item">
                  <a href="#laborInformation" data-toggle="tab">Labor</a>
              </li>
              <li class="nav-item ">
                  <a href="#maternalInformation" data-toggle="tab">Maternal</a>
              </li>
          </ul>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card card-box">
            <div class="card-head">
              <header style="font-size:18px">Labor Care information</header>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6" style="font-weight:bold">Gestational Information</div><div class="col-md-6">Gestational Information</div>
                  </div>
                  <div class="row">
                    <div class="col-md-6" style="font-weight:bold">Gravida / Parity</div><div class="col-md-6"><!-- php: =method_exists($obstetrics,('no_of_pregnancies')) ? $obstetrics->no_of_pregnancies : 'N/A' --> / <!-- php: = method_exists($obstetrics,('no_of_births')) ? $obstetrics->no_of_births : 'N/A' --></div>
                  </div>
                  <div class="row">
                    <div class="col-md-6" style="font-weight:bold">Labor Onset</div><div class="col-md-6"><!-- php: =$fetus->first()->date_created->nice() --></div>
                  </div>
                  <!-- php: if($labor_date_ended == null): -->
                    <div class="row">
                      <div class="col-md-6" style="font-weight:bold">Duration</div><div class="col-md-6"><div id = "clock" onload="currentTime()"></div></div>
                    </div>
                  <!-- php: else: -->
                    <div class="row">
                      <div class="col-md-6" style="font-weight:bold">Labor End</div><div class="col-md-6"><!-- php: = $labor_date_ended->nice() --></div>
                    </div>
                  <!-- php: endif -->
                </div>
              </div>
            </div>
            <div class="card-head">
              <header style="font-size:18px">Drug Administration Actions</header>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12" style="font-weight:bold">Oxytocin </div>
                    <div class="col-md-12">
                      <button class="btn btn-xs btn-primary"><i class="fa fa-play"></i>Start</button>
                      <button class="btn btn-xs btn-danger"><i class="fa fa-stop"></i>Stop</button>
                      <button class="btn btn-xs btn-primary"><i class="fa fa-plus"></i>Increase</button>
                      <button class="btn btn-xs btn-danger"><i class="fa fa-minus"></i>Decrease</button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" style="font-weight:bold">Epidural </div>
                    <div class="col-md-12">
                      <button class="btn btn-xs btn-primary"><i class="fa fa-play"></i>Start</button>
                      <button class="btn btn-xs btn-danger"><i class="fa fa-stop"></i>Stop</button>
                      <button class="btn btn-xs btn-primary"><i class="fa fa-plus"></i>Increase</button>
                      <button class="btn btn-xs btn-danger"><i class="fa fa-minus"></i>Decrease</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" >
          <div class="card card-box" style="height: 340px; overflow: auto;">
            <div class="card-head">
              <header style="font-size:18px">Click to Select Baby and Assign Readings</header>
            </div>
            <div class="card-body">
              <div class="card-title">
                <div class="col-md-6 ">
                  <span class="label label-md label-<!-- php: = $theme2 -->"><strong>Total Babies : <!-- php: = $fetus->count() --></strong></span>
                </div>
              </div>
              <table class="table table-scrollable">
                <thead style="position: sticky; top: 0; z-index:999; background:white">
                  <tr>
                    <th scope="col" style="position: sticky; top: 0;">Baby</th>
                    <th scope="col" style="position: sticky; top: 0;">Rupture Membrane</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- php: foreach ($fetus as $key => $value): -->
                    <tr id="baby_nav_<!-- php: =$key -->" class="odd gradeX">
                      
                      <td class="" style="border-top:0">
                        <button id="<!-- php: =$key -->" onclick="return clickBaby(this.id);" class="btn btn-xs btn-<!-- php: = $theme2 -->" style="width:">
                          Baby <!-- php: =$key +1 -->
                        </button>
                      </td>
                      
                      <td colspan="" id=""><!-- php: =$value->ruptured_membrane->nice() --></td>
                    </tr>

                  <!-- php: endforeach -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
      <div class="row">
        <div class="col-md-4">
          
        </div>
      </div>
      <div class="borderBox-body">
          <div class="tab-content">
              <div class="tab-pane fade in active show" id="foetalInformation">
                

                <div class="tab-content">

                  <!-- php: foreach ($fetus as $key => $value): -->
                    <div class="" id="showbabydetails<!-- php: =$key -->" style="display:none">
  

                      <div id="accordion">
                        <div class="card fetus_readings with-transform">
                          <div class="card-header" id="headingOne">
                            <div class="caption" style="">
                              <header class="full-width d-flex justify-content-between"  style="color: ; line-height: ; font-size: 16px; font-weight: 600; text-align:;">
                                <div data-toggle="collapse" href="#readingsCollapse<!-- php: =$key -->" role="button" aria-expanded="false" aria-controls="collapseExample">
                                  <i class="fa fa-info-circle" aria-hidden="true"></i> 
                                    Foetal Readings and Observations (Baby <!-- php: =$key+1 -->)
                                </div>
                                <!-- php: if($labor_date_ended == null): -->
                                <div>
                                  <button type="button" class="btn btn-xs btn-<!-- php: = $theme2 -->" data-toggle="modal" data-target="#record_values_modal_<!-- php: =$key -->">Record
                                    <i class="fa fa-plus"></i>
                                  </button>
                                  <button type="button" class="btn btn-xs btn-<!-- php: = $theme2 -->" data-toggle="modal" data-target="#legend">Legend
                                    <i class="fa fa-book"></i>
                                  </button>
                                </div>
                                <!-- php: endif -->
                              </header>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="collapse" id="readingsCollapse<!-- php: =$key -->">
                        <div class="row">
                          <div class="col-md-12 mb-2">
                            <div><header style="; line-height: 20px; font-size: 16px; font-weight: bold; text-align:;">Fetal Heart Rate</header></div>
                            <div class="row">
                              <div class="" style="background:;height:400px;width:86vw;margin:0;padding:0" id="graph<!-- php: =$value->id -->">
                              <div class="card text-center" style="height:80%; font-size:30px">
                                <div class="card-body">
                                  <!-- <h5 class="card-title">Special title treatment</h5> -->
                                  <h3 class="card-text">No Data to Plot in this Graph. Please Enter Information in the record Section.</h3>

                                </div>
                              </div>
                              </div>
                            </div>

                            <div class="row mb-4">
                              <div class="col-md-6 mb-4">
                              <div id="accordion">
                                <div class="card bg-light mb-3 amnoitic_reading with-transform">
                                  <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                      <div class="" data-toggle="collapse" data-target="#amnoitic_fluid_<!-- php: =$value->id -->" aria-expanded="true" aria-controls="collapseTwo">
                                        Amnoitic Fluid
                                      </div>
                                    </h5>
                                  </div>

                                  <div id="amnoitic_fluid_<!-- php: =$value->id -->" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                    <table class="table full-width">
                                      <thead>
                                        <tr>
                                          <th scope="col">Timestamp</th>
                                          <th scope="col">Reading</th>
                                        </tr>
                                      </thead>
                                      <tbody id="amnoitic_fluid_<!-- php: =$value->id -->_section">

                                      </tbody>
                                    </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </div>
                              <div class="col-md-6 mb-4">
                              <div id="accordion">
                                <div class="card bg-light mb-3 moulding_reading with-transform">
                                  <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                      <div class="" data-toggle="collapse" data-target="#moulding_<!-- php: =$value->id -->" aria-expanded="true" aria-controls="collapseOne">
                                        Moulding
                                      </div>
                                    </h5>
                                  </div>

                                  <div id="moulding_<!-- php: =$value->id -->" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                    <table class="table full-width">
                                      <thead>
                                        <tr>
                                          <th scope="col">Timestamp</th>
                                          <th scope="col">Reading</th>
                                        </tr>
                                      </thead>
                                      <tbody id="moulding_<!-- php: =$value->id -->_section">

                                      </tbody>
                                    </table>
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
                  <!-- php: endforeach -->
                  
                </div>
              </div>
              
              <div class="tab-pane fade in" id="laborInformation">
                <div id="accordion">
                  <div class="card medicationCard with-transform">
                    <div class="card-header" id="headingOne">
                      <div class="caption" style="">
                        <header class="full-width d-flex justify-content-between"  style="color: ; line-height: ; font-size: ; font-weight: ; text-align:;">
                          <div data-toggle="collapse" href="#laborConditionsCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fa fa-info-circle" aria-hidden="true"></i> 
                              Labor Readings and Observations
                          </div>
                          <!-- php: if($labor_date_ended == null): -->
                          <div>
                            <button type="button" class="btn btn-xs btn-<!-- php: = $theme2 -->" data-toggle="modal" data-target="#record_labor_values_modal">Record
                              <i class="fa fa-plus"></i>
                            </button>
                            <button type="button" class="btn btn-xs btn-<!-- php: = $theme2 -->" data-toggle="modal" data-target="#legend">Legend
                              <i class="fa fa-book"></i>
                            </button>
                          </div>
                          <!-- php: endif -->
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collapse" id="laborConditionsCollapse">
                  <div class="row">
                    <div class="col-md-12 mb-2">
                      <div><header style="; line-height: 20px; font-size: 16px; font-weight: bold; text-align:;">Cervix / Descent of Head</header></div>
                      <div class="row">
                        <div class="" style="background:;height:400px;width:90vw;margin:0;padding:0" id="laborGraph0">
                        <div class="card text-center" style="height:80%; font-size:30px">
                          <div class="card-body">

                            <h3 class="card-text">No Data to Plot in this Graph. Please Enter Information in the record Section.</h3>
                            
                          </div>
                        </div>
                        </div>
                      </div>
                      <div><header style="; line-height: 20px; font-size: 16px; font-weight: bold; text-align:;">Contractions Per 10 Minutes</header></div>
                      <div class="row">
                        <div class="" style="background:;height:400px;width:90vw;margin:0;padding:0" id="laborGraph1">
                        <div class="card text-center" style="height:80%; font-size:30px">
                          <div class="card-body">
                            <!-- <h5 class="card-title">Special title treatment</h5> -->
                            <h3 class="card-text">No Data to Plot in this Graph. Please Enter Information in the record Section.</h3>
                            
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              
              <div class="tab-pane fade in" id="maternalInformation">
              <div id="accordion">
                  <div class="card medicationCard with-transform">
                    <div class="card-header" id="headingOne">
                      <div class="caption" style="">
                        <header class="full-width d-flex justify-content-between"  style="color: ; line-height: ; font-size: ; font-weight:; text-align:;">
                          <div data-toggle="collapse" href="#maternalConditionsCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fa fa-info-circle" aria-hidden="true"></i> 
                              Maternal Readings and Observations
                          </div>
                          <!-- php: if($labor_date_ended == null): -->
                          <div>
                            <button type="button" class="btn btn-xs btn-<!-- php: = $theme2 -->" data-toggle="modal" data-target="#record_maternal_values_modal">Record
                              <i class="fa fa-plus"></i>
                            </button>
                            <button type="button" class="btn btn-xs btn-<!-- php: = $theme2 -->" data-toggle="modal" data-target="#legend">Legend
                              <i class="fa fa-book"></i>
                            </button>
                          </div>
                          <!-- php: endif -->
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collapse" id="maternalConditionsCollapse">
                  <div class="row">
                    <div class="col-md-12 mb-2">
                      <div><header style="; line-height: 20px; font-size: 16px; font-weight: bold; text-align:;">Pulse / Blood Pressure</header></div>
                      <div class="row">
                        <div class="" style="background:;height:400px;width:90vw;margin:0;padding:0" id="maternalgraph">
                        <div class="card text-center" style="height:80%; font-size:30px">
                          <div class="card-body">
                            <!-- <h5 class="card-title">Special title treatment</h5> -->
                            <h3 class="card-text">No Data to Plot in this Graph. Please Enter Information in the record Section.</h3>
                  
                          </div>
                        </div>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-6 mb-4">
                        <div id="accordion">
                          <div class="card bg-light mb-3 moulding_reading  with-transform">
                            <div class="card-header" id="headingOne">
                              <h5 class="mb-0">
                                <div class="" data-toggle="collapse" data-target="#oxytoxin" aria-expanded="true" aria-controls="collapseTwo">
                                  Oxytoxin
                                </div>
                              </h5>
                            </div>

                            <div id="oxytoxin" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                              <div class="card-body">
                              <table class="table full-width">
                                <thead>
                                  <tr>
                                    <th scope="col">U/L</th>
                                    <th scope="col">drops/min</th>
                                  </tr>
                                </thead>
                                <tbody id="oxytoxin">

                                </tbody>
                              </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div class="col-md-6 mb-4">
                        <div id="accordion">
                          <div class="card bg-light mb-3 amnoitic_reading with-transform">
                            <div class="card-header" id="headingOne">
                              <h5 class="mb-0">
                                <div class="" data-toggle="collapse" data-target="#urine" aria-expanded="true" aria-controls="collapseOne">
                                  Urine
                                </div>
                              </h5>
                            </div>

                            <div class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                              <div class="card-body">
                              <table class="table full-width">
                                <thead>
                                  <tr>
                                    <th scope="col">Protein</th>
                                    <th scope="col">Acetone</th>
                                    <th scope="col">Volume</th>
                                  </tr>
                                </thead>
                                <tbody id="urine">

                                </tbody>
                              </table>
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


              <div id="accordion">
                <div class="card reminder_readings with-transform">
                  <div class="card-header" id="headingOne">
                    <div class="caption" style="">
                      <header class="full-width" data-toggle="collapse" href="#reminderCollapse" role="button" aria-expanded="false" aria-controls="collapseExample" style="color: ; line-height: ; font-size: 16px; font-weight: ; text-align:;"><i class="fa fa-bell"style="color:red"></i> Reminders</header>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collapse" id="reminderCollapse">
                <div class="row d-flex flex-column  mb-5">
                  
                  <div class="col-md-12" id="remindersList">

                  </div>
                
                </div>
              </div>
              <div id="accordion">
                <div class="card activity_logs_reading with-transform">
                  <div class="card-header" id="headingOne">
                    <div class="caption" style="">
                      <header class="full-width" data-toggle="collapse" href="#activityCollapse" role="button" aria-expanded="false" aria-controls="collapseExample" style="color: ; line-height: ; font-size: 16px; font-weight: ; text-align:;"><i class="fa fa-history"></i> Activity Logs</header>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collapse" id="activityCollapse">
                <div class="row">
                  <div class="d-flex col-md-12" style="overflow-x: scroll;">
                    <!-- php: foreach ($labor_care_log as $log): -->
                      
                      <div class="card mr-3 col-md-3" style="width;">
                        <div class="card-body">
                          <p class="card-title" style="font-size:15px">User ID: <!-- php: = $log->user_id --></p>
                          <p class="card-subtitle  text-muted">(<!-- php: = $log->date_created->nice() -->)</p>
                          <div class="card-body">
                            <div class="card-text" style="font-size:16px" ><!-- php: =$log->action --></div>
                          </div>
                        </div>
                      </div>
                    <!-- php: endforeach -->
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
  
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Babies</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- php: foreach($fetus as $key => $value): -->
            <div class="card">
              <div class="card-body">
                <div class="row mb-1" style="">
                  <div class="col-md-6" style="">
                      Baby <!-- php: =$key + 1 -->
                    </div>
                    <div class="col-md-6" style="">
                      <!-- php: = $value->ruptured_membrane->nice() -->
                    </div>
                </div>
              </div>
            </div>
            <!-- php: endforeach -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <!-- php: foreach($fetus as $key => $lefetus): -->
    <div class="modal fade" id="record_values_modal_<!-- php: =$key -->" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><h4> Record Foetal Values  <span style="font-weight:bold;color:<!-- php: = $theme1 -->" class="">Baby <!-- php: =$key+1 --></span></h4></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="card">
            <h5 class="card-title"></h5>
            <div class="card-body">
                <div class="form-group row">
                  <label class="control-label col-md-4" style="">Fetal Heart Rate
                  </label>
                  <div class="col-md-7">
                    <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'fetalHe... -->
                      <input type="number" min="0" name="fetal_heart_rate" placeholder="Enter Heart Rate" class="" style="" required> 
                      <button class="btn btn-xs btn-primary"type="submit">GO</button>
                    <!-- php: = $this->Form->end() -->
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4" style="">Amniotic Fluid
                  </label>
                  <div class="col-md-7">
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'amnioti... -->
                    <!-- php: foreach ($amniotic_fluid as $k => $value): -->
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="amniotic_fluid" id="inlineCheckbox<!-- php: = $key -->" value="<!-- php: =$value -->" required>
                        <label class="form-check-label" for="inlineCheckbox<!-- php: = $k -->">
                          <!-- php: = $value -->
                        </label>
                      </div>
                    <!-- php: endforeach -->
                    <button class="btn btn-xs btn-primary"type="submit">GO</button>
                  <!-- php: = $this->Form->end() -->
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-4" style="">Moulding
                  </label>
                  <div class="col-md-7">
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'mouldin... -->
                    <!-- php: foreach ($moulding as $ke => $value): -->
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="moulding" id="inlineCheckbox<!-- php: = $key -->" value="<!-- php: =$value -->" required>
                        <label class="form-check-label" for="inlineCheckbox<!-- php: = $ke -->">
                          <!-- php: = $value -->
                        </label>
                      </div>
                    <!-- php: endforeach -->
                    <button class="btn btn-xs btn-primary"type="submit">GO</button>
                  <!-- php: = $this->Form->end() -->
                  </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>         
      </div>         
    </div>
  <!-- php: endforeach -->      
  <div class="modal fade" id="record_labor_values_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"><h4> Record Labor Values</h4></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="card">
          <h5 class="card-title"></h5>
          <div class="card-body">
              <div class="form-group row">
                <label class="control-label col-md-4" style="">Cervical Dilation
                </label>
                <div class="col-md-7">
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'cervica... -->
                    <input type="number" min="0" max=10 name="cervical_dilation" placeholder="Enter Cervical Dilation" class="" style="width:80%" required> 
                    <button class="btn btn-xs btn-primary"type="submit">GO</button>
                  <!-- php: = $this->Form->end() -->
                </div>
              </div>
              <div class="form-group row">
                <label class="control-label col-md-4" style="">Descent of Head
                </label>
                <div class="col-md-7">
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'head_de... -->
                    <input type="number" max = "5" min="0" name="head_descent" placeholder="Enter Head Descent" class="" style="width:80%" required> 
                    <button class="btn btn-xs btn-primary"type="submit">GO</button>
                  <!-- php: = $this->Form->end() -->
                </div>
              </div>
              <div class="form-group row">
                <label class="control-label col-md-4" style="">Contractions per 10 mins
                </label>
                <div class="col-md-7">
                  <!-- <!-- php: // $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'contra... -->
                    <input type="number" min="0" name="contractions_per_10_minutes" placeholder="Enter Heart Rate" class="" style="" required> 
                    <button class="btn btn-xs btn-primary"type="submit">GO</button>
                  <!-- php: // $this->Form->end() --> -->
                  <!-- php: $contractions = ['0', '20', '40'] -->
                  <!-- php: $labels = ['<20s', '20-40s', '>40s'] -->
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'contrac... -->
                    <!-- php: foreach ($contractions as $ke => $value): -->
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="contractions_per_10_minutes" id="inlineCheckbox<!-- php: = $key -->" value="<!-- php: =$value -->" required>
                        <label class="form-check-label" for="inlineCheckbox<!-- php: = $ke -->">
                          <!-- php: = $labels[$ke] -->
                        </label>
                      </div>
                    <!-- php: endforeach -->
                    <button class="btn btn-xs btn-primary"type="submit">GO</button>
                  <!-- php: = $this->Form->end() -->
                </div>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>         
    </div>         
  </div>
  <div class="modal fade" id="record_maternal_values_modal" tabindex="-1" role="dialog" aria-labelledby="record_maternal_values_modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"><h4>Record Maternal Values</h4></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="card">
          <h5 class="card-title"></h5>
          <div class="card-body">

              
              <div class="form-group row">
                <label class="control-label col-md-4">Volume
                  <!-- span class="required"> * </span -->
                </label>
                <div class="col-md-7" style="background:">
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'volume'... -->
                    <div class="col-md-9">
                      <div class="row">
                        <input class="col-md-12 form-control" size="3" placeholder="Volume" name="volume" id="volume" data-required="1" type="number" min="0" >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <button class="btn btn-md btn-primary "type="submit">GO</button>
                    </div>
                  <!-- php: = $this->Form->end() -->
                </div>	                
              </div>
              <div class="form-group row">
                <label class="control-label col-md-4">Protein
                  <!-- span class="required"> * </span -->
                </label>
                <div class="col-md-7" style="background:">
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'protein... -->
                    <div class="col-md-9">
                      <div class="row">
                        <input class="col-md-12 form-control" size="3" placeholder="Protein" name="protein" id="protein" data-required="1" type="number" min="0" >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <button class="btn btn-md btn-primary"type="submit">GO</button>
                    </div>
                  <!-- php: = $this->Form->end() -->
                </div>	                
              </div>
              <div class="form-group row">
                <label class="control-label col-md-4">Acetone
                  <!-- span class="required"> * </span -->
                </label>
                <div class="col-md-7" style="background:">
                  <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'recordLaborConditions', $patient->id, $selectedVisit->id, $lefetus->id, $lefetus->labor_care_id],'class'=>"d-flex justify-content-between", 'style'=>"", 'id'=>'acetone... -->
                    <div class="col-md-9">
                      <div class="row">
                        <input class="col-md-12 form-control" size="3" placeholder="Acetone" name="acetone" id="acetone" data-required="1" type="number" min="0" >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <button class="btn btn-md btn-primary "type="submit">GO</button>
                    </div>
                  <!-- php: = $this->Form->end() -->
                </div>	                
              </div>
              <!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action'=>'addMaternalVitals', $patient->id, $selectedVisit->id, $lefetus->labor_care_id, $lefetus->id],'class'=>"", 'style'=>"", 'id'=>'pulse_blood_pressure']) -->
              <div class="card card-box">
                <div class="card-body">
                  <div class="form-group row">
                    <label class="control-label col-md-4">Pulse
                      <!-- span class="required"> * </span -->
                    </label>
                    <div class="col-md-7" style="background:">
                        <div class="col-md-12">
                          <div class="row">
                            <input class="col-md-12 form-control" size="3" placeholder="Heart Rate" name="pulse" id="pulse" data-required="1" type="number" min="0" required>
                          </div>
                        </div>
                    </div>	                
                  </div>
                  <div class="form-group row">
                    <label class="control-label col-md-4">Blood Pressure
                      <!-- span class="required"> * </span -->
                    </label>
                    <div class="col-md-7" style="background:">
                      <div class="col-md-12">
                        <div class="row">
                          <input class="col-md-5 form-control" size="3" placeholder="Systolic" name="blood_pressure_1" id="blood_pressure_1" data-required="1" type="number" min="0" required>
                          <span class="col-md-2 input-group-addon"><span class="" style="font-size : 18px"> &frasl; </span></span>
                          <input class="col-md-5 form-control" size="3" placeholder="Diastolic" name="blood_pressure_2" id="blood_pressure_2" data-required="1" type="number" min="0" required>
                        </div>
                      </div>
                    </div>	                
                  </div>
                  <div class="row">
                    <div class="offset-md-8 col-md-4">
                      <button type="submit" class="btn btn-info">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- php: = $this->Form->end() -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>         
    </div>         
  </div>
  <div class="modal fade" id="legend" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"><h4> Legend</span></h4></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="card">
          <h5 class="card-title" style="text-align:center; font-weight:bold">All Symbols Used are explained Here</h5>
          <div class="card-body">
              <div class="form-group row">
                <label class="control-label col-md-4" style="">Cervix
                </label>
                <div class="col-md-7">
                  
                </div>
              </div>
              <div class="form-group row">
                <label class="control-label col-md-4" style="">Descent of Head
                </label>
                <div class="col-md-7">
                  
                </div>
              </div>
              <div class="form-group row">
                <label class="control-label col-md-4" style="">Contractions per 10 mins
                </label>
                <div class="col-md-7">
                  
                </div>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>         
    </div>         
  </div>

  <!-- php: = $this->Html->script('/js/echarts.js'); -->


  <script>
    function currentTime() {
    let date1 = new Date()
    let date2 = new Date("<!-- php: =$fetus->first()->date_created->nice() -->")
    var date = new Date(date1-date2);

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();


    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
    
    time = hh + ":" + mm + ":" + ss + " " //+ session;
    if(diffDays > 0) {
      time = diffDays + ' day(s) ' + hh + ":" + mm + ":" + ss + " " //+ session;
    }


    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
  }

  currentTime();
  </script>

  <!-- php: =$this->Html->script('../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js') -->
  <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
  <!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
  <script src="<!-- php: = $this->Url->script('../assets/plugins/echarts/echarts.js') -->"></script>
  <script>
    function graphMe(data ,fetus_id) {
      // series = []
      xaxis_data = []
      yaxis_data = []

        xaxis_data= []
        data.fetal_heart_rate.forEach(element => {
          xaxis_data.push(new Date(element.date_created).toLocaleString('pt-PT'))
          yaxis_data.push(element.value)
        })


        var c = echarts.init(document.getElementById(\`graph\${fetus_id}\`));
        window.onresize = function() {
          c.resize();
        };
        window.addEventListener('resize',function(){
          c.resize();
        })

        c.setOption({
            grid: [{
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            }
          },
          lineStyle: {
            type: 'solid'
          },
          xAxis: {
            type: 'category',
            data: xaxis_data,
            showGrid: true,
            boundaryGap: false
          },
          yAxis: {
            type: 'value',
            min: Math.min(...yaxis_data) - 10,
            max: Math.max(...yaxis_data) + 10,
            // boundaryGap: false
          },
          series: [{
            type:'line',
            data: yaxis_data,
            markLine: {
                silent: true,
                data: [[
                    {
                        name: 'Normal Range',
                        yAxis: 160
                    },
                    {
                        yAxis: 180
                    }
                ]]
            }
          }]
        })

    }
    
    function updateActivityLog(data) {
      let newInfo = \`<div class="d-flex col-md-12" style="overflow-x: scroll;">\`
      data.forEach(element => {
        newInfo += \`
          <div class="card mr-3 col-md-3" style="width;">
            <div class="card-body">
              <p class="card-title" style="font-size:15px">User ID: \${element.user.first_name} \${element.user.last_name}</p>
              <p class="card-subtitle  text-muted">(\${new Date(element.date_created).toLocaleString('pt-PT')})</p>
              <div class="card-text">
                <div class="card-text" style="font-size:16px" >\${element.action}</div>
              </div>
            </div>
          </div>
        \`
      });
      newInfo += \`</div>\`
      $('#activityCollapse').html(newInfo)
    }
    function updateMoulding(data){
      let newInfo = ''
      let tableInfo = ''
      data.moulding.reverse().forEach(element => {
        tableInfo += \`
          <tr>
            <td colspan="" id="">\${new Date(element.date_created).toLocaleString('pt-PT')}</td>
            <td colspan="" id="">\${element.value}</td>
          </tr>
        \`
      });
      // data['moulding'].forEach(element => {
      //   newInfo += \`
      //     <div class="mr-1" style="border: 1px solid black; width:50px;height:50px;text-align:center;font-size:20px">
      //       \${element.value}
      //     </div>
      //   \`
      // });
      // for (let index = 0; index < 27; index++) {
      //   result = (data['moulding'][index] && data['moulding'][index].value) == undefined ? '' : data['moulding'][index].value
      //   newInfo += \`
      //     <div class="mr-1" style="border: 1px solid black; width:50px;height:50px;text-align:center;font-size:20px">
      //       \${result}
      //     </div>
      //   \`
      // }
      // $(\`#moulding_fetus_\${data['moulding'][0]['fetus_id']}\`).html(newInfo)
      $(\`#moulding_\${data['moulding'][0]['fetus_id']}_section\`).html(tableInfo)
    }

    function updateUrine(data) {
      let newInfo = ''
      let tableInfo = ''
      // data['amniotic_fluid'].forEach(element => {
      //   newInfo += \`
      //     <div class="mr-1" style="border: 1px solid black; width:50px;height:50px;text-align:center;font-size:20px">
      //       \${element.value}
      //     </div>
      //   \`
      // });
      max = Math.max(data.protein.length, data.acetone.length, data.volume.length)
      for (let index = 0; index < max; index++) {
        tableInfo += \`
          <tr>
            <td colspan="" id="">\${(data.protein[index] != undefined ? data.protein[index].value: '--')}</td>
            <td colspan="" id="">\${(data.acetone[index] != undefined ? data.acetone[index].value: '--')}</td>
            <td colspan="" id="">\${(data.volume[index] != undefined ? data.volume[index].value: '--')}</td>
          </tr>
        \`
      }
      $(\`#urine\`).html(tableInfo)
    }

    function updateAmnoitic(data){
      let newInfo = ''
      let tableInfo = ''
      // data['amniotic_fluid'].forEach(element => {
      //   newInfo += \`
      //     <div class="mr-1" style="border: 1px solid black; width:50px;height:50px;text-align:center;font-size:20px">
      //       \${element.value}
      //     </div>
      //   \`
      // });
      data.amniotic_fluid.reverse().forEach(element => {
        tableInfo += \`
          <tr>
            <td colspan="" id="">\${new Date(element.date_created).toLocaleString('pt-PT')}</td>
            <td colspan="" id="">\${element.value}</td>
          </tr>
        \`
      });
      // for (let index = 0; index < 27; index++) {
      //   result = (data['amniotic_fluid'][index] && data['amniotic_fluid'][index].value) == undefined ? '' : data['amniotic_fluid'][index].value
      //   newInfo += \`
      //     <div class="mr-1" style="border: 1px solid black; width:50px;height:50px;text-align:center;font-size:20px">
      //       \${result}
      //     </div>
      //   \`
      // }
      // $(\`#amniotic_fluid_fetus_\${data['amniotic_fluid'][0]['fetus_id']}\`).html(newInfo)
      $(\`#amnoitic_fluid_\${data['amniotic_fluid'][0]['fetus_id']}_section\`).html(tableInfo)
    }
    function updateGraph(data,fetus_id){
      graphMe(data, fetus_id)
    }
    function findColor(params) {
      switch (params) {
        case 0:
          return 'list-group-item list-group-item-danger'
          break;
        case 1:
          return 'list-group-item list-group-item-warning'
          break;
        case 2:
          return 'list-group-item list-group-item-primary'
          break;
        case 3:
          return 'list-group-item list-group-item-dark'
          break;
      
        default:
          return 'list-group-item'
          break;
      }
    }

    function createReminderRow(value) {
      return \`
      <tr>
        <td class="align-middle">\${value[0]}</td>
        <td>
            <span class="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-slate-900 font-size16 xs-font-size13">\${value[1]}</span>
        </td>
        <td>
            <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-slate-900 font-size16  xs-font-size13">\${value[2]}</span>
        </td>
        <td>
            <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-slate-900 font-size16  xs-font-size13">\${value[3]}</span>
        </td>
                          
      </tr>
      \`
    }

    labor_onset = "<!-- php: =$fetus->first()->date_created->nice() -->"
    function getVitalReadingsIntervals(interval) {
      dates = []
      count = 0;
      init_interval = interval
      increment = interval;
      while (count < 3) {
        if (moment().isBefore(moment(labor_onset).add(interval, 'hours'))){
          dates.push(moment(labor_onset).add(interval, 'hours').format('DD MMMM, YYYY hh:mm A'))
          count ++
        }
        increment = increment + init_interval
        interval = increment
      }
      return dates;
    }

    function getVitalReadingValues(reading) {
      name_value = ''
      switch (reading) {
        case 'fetal_heart_rate':
          name_value = 'Fetal Heart Rate'
          interval = 0.5
          break;
        case 'amniotic_fluid':
          name_value = 'Amniotic Fluid'
          interval = 4
          break;
        case 'moulding':
          name_value = 'Moulding'
          interval = 4
          break;
        case 'cervical_dilation':
          name_value = 'Cervical Dilation'
          interval = 4
          break;
        case 'head_descent':
          name_value = 'Head Descent'
          interval = 4
          break;
        case 'contractions_per_10_minutes':
          name_value = 'Contractions Per 10 Minutes'
          interval = 0.5
          break;
        default:
          break;
      }
      return [name_value, ...getVitalReadingsIntervals(interval)]
    }

    function updateNextReading(data){
      let newInfo = ''
      vital_readings = ['fetal_heart_rate', 'amniotic_fluid', 'cervical_dilation', 'head_descent', 'contractions_per_10_minutes', 'moulding']
      tableinfo = ''
      vital_readings.forEach(vital_reading => {
        tableinfo += createReminderRow(getVitalReadingValues(vital_reading))
      });
      newInfo =\`
      <div class="table-responsive">
        <table class="table table-bordered text-center">
            <thead>
                <tr class="bg-light-gray">
                    <th class="text-uppercase">Vital Reading
                    </th>
                    <th colspan="3" class="text-uppercase">Time Schedule</th>
                </tr>
            </thead>
            <tbody>
              \${tableinfo}
            </tbody>
        </table>
      </div>
      \`
      $('#remindersList').html(newInfo)
    }
    function formatData (data, vitals) {
      return Object.values(data.reduce((res, obj) => {
        //check if the object already exists in the res object
        //if already available then add the y value of the current
        //object to the y value of the object present in res
        if (res[obj['date_created']]) {
          vitals.forEach(element => {
            res[obj['date_created']][\`\${element}\`] += obj[\`\${element}\`];
          });
          res[obj['date_created']].count += 1;
        } else {
        //If the object is not present then add the current object and the count as 1
          res[obj['date_created']] = { 
            ...obj,
            count: 1
          };
        }
        return res
        //then loop through the array and calculate the avg
      }, {})).map((obj) => {
        result = {}
        result['date_created'] = obj['date_created']
        vitals.forEach(element => {
          result[element] = Math.round(obj[\`\${element}\`] / obj.count)
        });
        return result
      });
    }
    function get_minutes(initial, date) {
      first = new Date(initial).getTime();
      last = new Date(date).getTime();
      return Math.round(Math.abs(last-first)/3600000)
    }
    function updateLaborGraph(data) {
      var x_axis = []
      var y_axix1 = []
      var y_axix2 = []
      var y_axix3 = []
      var y_axix4 = []
      start_date1 = data.cervical_dilation[0].date_created
      start_date2 = data.head_descent[0].date_created
      // coordinates = data.cervical_dilation
      coordinates = data.head_descent.map(function(x, index) { 
        return {date_created: get_minutes(start_date1, x.date_created), value: parseFloat(x.value)}
      })
      coordinates = formatData (coordinates, ['value'])
      coordinates2 = data.cervical_dilation.map(function(x, index) { 
        return {date_created: get_minutes(start_date2, x.date_created), value: parseFloat(x.value)}
      })
      coordinates2 = formatData (coordinates2, ['value'])

        x_axis = []
        for (let index = 0; index < 12; index++) {
          x_axis.push((index))
          y_axix1.push('-')
          y_axix2.push('-')
          y_axix3.push('-')
          y_axix4.push('-')
        }
        coordinates.forEach((element,index) => {
          if(x_axis.indexOf(element.date_created) == -1){
            x_axis.push(element.date_created)
            x_axis = x_axis.sort()
            position1 = x_axis.indexOf(element.date_created)
            delete_value1 = 0
          }
          else{
            position1 = x_axis.indexOf(element.date_created)
            delete_value1 = 1
          }
          y_axix3.splice(position1, delete_value1, element.value);
        });

        coordinates2.forEach((element,index) => {
          if(x_axis.indexOf(element.date_created) == -1){
            x_axis.push(element.date_created)
            x_axis = x_axis.sort()
            position2 = x_axis.indexOf(element.date_created)
            delete_value2 = 0
          }
          else{
            position2 = x_axis.indexOf(element.date_created)
            delete_value2 = 1
          }
          y_axix4.splice(position2, delete_value2, element.value);
        });
        x_axis.forEach((element,index) => {
          if(element>-1 && element < 7){
            y_axix1.splice(index, 0, (4+index));
          }
          if(index>3 && index < 11){
            y_axix2.splice(index, 0, (index));
          }

        });


        var component = echarts.init(document.getElementById(\`laborGraph0\`));
        window.onresize = function() {
          component.resize();
        };
        window.addEventListener('resize',function(){
          component.resize();
        })

        component.setOption({
              legend: {
              	data: ['Alert', 'Action','Cervix Dilation', 'Head Descent']
              },
              grid: {
              show: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              }
            },
            lineStyle: {
              type: 'solid'
            },
            xAxis: {
              type: 'category',
              data: x_axis,
              showGrid: true,
              boundaryGap: false
            },
            yAxis: {
              // type: 'value',
              axisLabel: {
                formatter: '{value} cm'
              }
              // symbol: 'triangle',
              // min: yaxis_data[0] - 10,
              // boundaryGap: false
            },
            series: [{
              name: 'Alert',
              type:'line',
              symbol: 'triangle',
              symbolSize: 10,
              data: y_axix1,
              connectNulls: true,
            }, {
              name: 'Action',
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              data: y_axix2,
              connectNulls: true,
            }, {
              name: 'Cervix Dilation',
              type: 'line',
              symbol: 'diamond',
              symbolSize: 10,
              data: y_axix4,
              connectNulls: true,
            }, {
              name: 'Head Descent',
              type: 'line',
              symbol: 'pin',
              symbolSize: 10,
              data: y_axix3,
              connectNulls: true,
            }]
          })
      // })
    }
    function updateLaborBarGraph(data) {
      var x_axis = []
      var zero_twenty = []
      var twenty_fourty = []
      var fourty_above = []
      var myaxis = []
      myaxisLast = ''
      'use strict';
      require.config({
        paths: {
          // echarts: "<!-- php: // $this->Url->build(['controller' => 'assets', 'action' => 'plugins']) -->/echarts"
          echarts: "<!-- php: = $this->Url->webroot('assets/plugins') -->/echarts"
        }
      }), require(["echarts","echarts/chart/bar"], function(echarts) { 
        // data.contractions_per_10_minutes.forEach(element => {
        //   element.value == '0' ? zero_twenty+=1 : null
        //   element.value == '20' ? twenty_fourty+=1: null
        //   element.value == '40' ? fourty_above+=1: null
          
        // });
        x_axis = []
        for (let index = 0; index < 5; index++) {
          x_axis.push(index+1)
        }
        // x_axis.forEach(element => {
        //   for (let index = 0*element; index < 5*element; index++) {
        //     data.contractions_per_10_minutes[index].value == '0' ? zero_twenty.push(1) : null       
        //     data.contractions_per_10_minutes[index].value == '20' ? twenty_fourty.push(1) : null       
        //     data.contractions_per_10_minutes[index].value == '40' ? fourty_above.push(1) : null       
        //   }
        // });
        zero_twenty_sum = 0
        twenty_fourty_sum = 0
        fourty_above_sum = 0
        data.contractions_per_10_minutes.forEach((element,index) => {
          value = index + 1
          a = null
          b = null
          element.value == '0' ? zero_twenty_sum += 1 : null       
          element.value == '20' ? twenty_fourty_sum += 1 : null       
          element.value == '40' ? fourty_above_sum += 1 : null
          
          
          if(index == 0){
            // myaxis += \`\${element.date_created} \`
            today = new Date(element.date_created)
            time_now = today.getHours() + ":" + today.getMinutes() + '(' + today.getDate() + "-" + (today.getMonth() + 1) + ')'
            myaxis.push(\`\${time_now}\`)
            a = \`\${time_now}\`
            myaxisLast += (\`\${a} - \`)
          }


          if((value % 5) == 0 || (data.contractions_per_10_minutes.length - 1 == index )){
            zero_twenty.push(zero_twenty_sum)
            twenty_fourty.push(twenty_fourty_sum)
            fourty_above.push(fourty_above_sum)
            zero_twenty_sum = 0
            twenty_fourty_sum = 0
            fourty_above_sum = 0
            today = new Date(element.date_created)
            time_now = today.getHours() + ":" + today.getMinutes() + '(' + today.getDate() + "-" + (today.getMonth() + 1) + ')'
            myaxis.push(\`\${time_now}\`)
            b = \`\${time_now}\`
            // myaxis.push(\`\${element.date_created}\`)
            // myaxis += \`\${element.date_created} \`
          }
          if(b!=null){
            myaxisLast += (\`\${b},\`)
          }
          if ((value % 5) == 0) {
            today = new Date(element.date_created)
            time_now = today.getHours() + ":" + today.getMinutes() + '(' + today.getDate() + "-" + (today.getMonth() + 1) + ')'
            a = \`\${time_now}\`
            myaxisLast += (\`\${a} - \`)
          }

          // if (a != null){
          //   myaxisLast += (\`\${a} - \`)
          // }

        });
        // zero_twenty = [1,2,2]
        // twenty_fourty = [2,1,2]
        // fourty_above = [2,2,1]
        myaxis = myaxisLast.split(',')
        myaxis.pop()
        
        var component = echarts.init(document.getElementById(\`laborGraph1\`));
        window.onresize = function() {
          component.resize();
        };
        window.addEventListener('resize',function(){
          component.resize();
        })

        component.setOption({
          color: ["#003366", "#006699", "#4cabce", "#e5323e"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend:{
            data: ['Below 20s', 'B/N 20s and 40s', 'Above 40s']
          },
          xAxis: [{
            type: 'category',
            data: myaxis,
            
          }],
          yAxis: {
            type: 'value',
          },
          series: [{
            name: 'Below 20s',
            type:'bar',
            stack: 'total',
            label: {
              show: true
            },
            label: {
              align: "left"
            },
            emphasis: {
              focus: 'series'
            },
            data: zero_twenty,
          },{
            name: 'B/N 20s and 40s',
            type:'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            label: {
              align: "left"
            },
            data: twenty_fourty,
          },{
            name: 'Above 40s',
            type:'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            label: {
              align: "left"
            },
            data: fourty_above,
          }
          ]
        })
      })
    }

    function updateMaternalGraph(data) {
      // series = []
      xaxis_data = []
      diastole = []
      systole = []
      pulse = []

        data.maternal_vitals.forEach(element => {
          if ((new Date(element.date_created)).getTime() > (new Date("<!-- php: = $fetus->first()->labor_care->date_started->nice() -->")).getTime()) {
            xaxis_data.push(new Date(element.date_created).toLocaleString('pt-PT'))
            pulse.push(element.pulse) 
            systole.push(element['blood_pressure_1'])
            diastole.push(element['blood_pressure_2'])
          }
          
        });



        var c = echarts.init(document.getElementById(\`maternalgraph\`));
        window.onresize = function() {
          c.resize();
        };
        window.addEventListener('resize',function(){
          c.resize();
        })

        c.setOption({

          legend: {
          	data: ['Pulse', 'Diastole', 'Systole']
          },
            grid: [{
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true
          }],

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            }
          },
          lineStyle: {
            type: 'solid'
          },
          xAxis: {
            type: 'category',
            data: xaxis_data,
            showGrid: true,
            boundaryGap: false
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            type:'line',
            name: 'Pulse',
            data: pulse,
          },{
            type:'line',
            name: 'Diastole',
            data: diastole,
          },{
            type:'line',
            name: 'Systole',
            data: systole,
          },
        ]
        })


    }
    
    
    function updatePage(data) {
      if (data.moulding.length !=0) {
        updateMoulding(data)
      }
      if (data.amniotic_fluid.length !=0) {
        updateAmnoitic(data)
      }
      if (data.protein.length !=0) {
        updateUrine(data)
      }
      updateActivityLog(data['labor_care_logs'])
      if (data.fetal_heart_rate.length != 0) updateGraph(data, data.fetus_id)
      if (data.head_descent.length != 0 || data.cervical_dilation.length != 0) updateLaborGraph(data)
      if (data.contractions_per_10_minutes.length != 0) updateLaborBarGraph(data)
      if (data.maternal_vitals.length != 0) updateMaternalGraph(data)
      updateNextReading(data)
    }

    function requestReading(link, value) {
      $.ajax({
        type: "POST",
        url: link,
        data: value,
        success: function g(data, textStatus) {
          if(data['status'] == 'success'){
            updatePage(data)
          }else{

          }
        },
        fail: function g(xhr, textStatus, errorThrown) {
          console.log(xhr);
        }
      });
    }

    $('#pulse_blood_pressure').submit(function(e){
      e.preventDefault(),
      form = document.getElementById('pulse_blood_pressure')
      var data = $('#pulse_blood_pressure').serializeArray().reduce(function(obj, item) {
          obj[item.name] = item.value;
          return obj;
      }, {});
      var action = form.action
      requestReading(action,data)
    })
    

    function clickBaby(id){
      <!-- php: foreach ($fetus as $key => $value) { -->
        $('#showbabydetails<!-- php: =$key -->').hide()
        $(\`#baby_nav_<!-- php: =$key -->\`).css("background-color","");
        $(\`#baby_nav_<!-- php: =$key -->\`).css("border-left","");
        $(\`#baby_nav_<!-- php: =$key -->\`).css("color","");
        action = "<!-- php: = $this->Url->build(['controller'=>'Patients','action'=>'getAllFetusVitals', $value->id, $value->labor_care_id, $selectedVisit->id]) -->"
        // console.log(action)
        data = []
        requestReading(action,data)
      <!-- php: } -->
      $(\`#showbabydetails\${id}\`).show()
      // $(\`#baby_nav_\${id}\`).css("background-color","#188ae2");
      $(\`#baby_nav_\${id}\`).css("border-left","4px solid #188ae2");
      // $(\`#baby_nav_\${id}\`).css("color","white");
    }

    <!-- php: foreach ($fetus as $value): -->
        $("#fetalHeartRate_<!-- php: =$value->id -->").submit(function(e){
        e.preventDefault();
        form = document.getElementById('fetalHeartRate_<!-- php: =$value->id -->')
        var data = $('#fetalHeartRate_<!-- php: =$value->id -->').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
        $("#amnioticFluid_<!-- php: =$value->id -->").submit(function(e){
        e.preventDefault();
        form = document.getElementById('amnioticFluid_<!-- php: =$value->id -->')
        var data = $('#amnioticFluid_<!-- php: =$value->id -->').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
        $("#moulding_rec_<!-- php: =$value->id -->").submit(function(e){
        e.preventDefault();
        form = document.getElementById('moulding_rec_<!-- php: =$value->id -->')
        var data = $('#moulding_rec_<!-- php: =$value->id -->').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
    <!-- php: endforeach -->
        $("#cervical_dilation").submit(function(e){
        e.preventDefault();
        form = document.getElementById('cervical_dilation')
        var data = $('#cervical_dilation').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
        $("#head_descent").submit(function(e){
        e.preventDefault();
        form = document.getElementById('head_descent')
        var data = $('#head_descent').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
        $("#volume").submit(function(e){
        e.preventDefault();
        form = document.getElementById('volume')
        var data = $('#volume').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
        $("#protein").submit(function(e){
        e.preventDefault();
        form = document.getElementById('protein')
        var data = $('#protein').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
        $("#acetone").submit(function(e){
        e.preventDefault();
        form = document.getElementById('acetone')
        var data = $('#acetone').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        requestReading(action, data);
        });
        count = 0;
        $("#contractions_per_10_minutes").submit(function(e){
        e.preventDefault();
        count ++;
        form = document.getElementById('contractions_per_10_minutes')
        var data = $('#contractions_per_10_minutes').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var action = form.action
        // console.log(action)
        // console.log(data)
        if (count == 5) {
          alert('You have Successfully Record 5 Contractions per 10 mins');
          count = 0;
        }
        requestReading(action, data);
        });
    $('#0').trigger( "click" )
  </script>
<!-- php: } -->
`;

export default function ElementElementPatientvisitMaternalPartograph() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
