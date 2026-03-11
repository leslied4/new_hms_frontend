const rawHtml = `
<style>
    #analyze_flow_sheet_table thead th {
        height: 120px;
        /* transform: rotate(-180deg); */
        writing-mode: vertical-rl;
    }




    .searchbar .search {
        display: inline-block;
        border: 0px solid grey;
        padding: 0px;
        transition: all 0.15s ease;
    }

    .searchbar input[type=text] {
        font-size: 14px;
        border: 1px solid #888;
        border-radius: 5px;
        padding: 10px;
        width: 15em;
        margin: 10px 2px 0 0;
    }




    /*Analysis Section Cards */
    .card-counter {
        box-shadow: 2px 2px 10px #DADADA;
        margin: 5px;
        padding: 20px 10px;
        background-color: #fff;
        height: 100px;
        border-radius: 5px;
        transition: .3s linear all;
    }

    .card-counter:hover {
        box-shadow: 4px 4px 20px #DADADA;
        transition: .3s linear all;
    }

    .card-counter.primary {
        background-color: #007bff;
        color: #FFF;
    }

    .card-counter.danger {
        background-color: #ef5350;
        color: #FFF;
    }

    .card-counter.success {
        background-color: #66bb6a;
        color: #FFF;
    }

    .card-counter.info {
        background-color: #26c6da;
        color: #FFF;
    }

    .card-counter i {
        font-size: 5em;
        opacity: 0.2;
    }

    .card-counter .count-numbers {
        position: absolute;
        right: 35px;
        top: 20px;
        font-size: 28px;
        display: block;
    }

    .card-counter .count-name {
        position: absolute;
        right: 35px;
        top: 65px;
        font-style: italic;
        text-transform: capitalize;
        opacity: 0.5;
        display: block;
        font-size: 18px;
    }
</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <div class="caption">
                <span class="caption-subject font-dark bold uppercase">Flow Sheets</span>
            </div>
            <ul class="nav nav-tabs" id="flowSheet_tabs">


                <li class="nav-item ">
                    <a href="#schedule_flowsheet_tab" class="active" data-toggle="tab" id="add_tab"> Schedule </a>
                </li>





                <li class="nav-item">
                    <a href="#analysis_flowSheet_tab" data-toggle="tab" id="analysis_tab">Analysis</a>
                </li>

                <!--<li class="nav-item">
					<a href="#borderBox_tab3" data-toggle="tab" class="active"> Tab 3 </a>
				</li>-->
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">


                <!--Add Tab content-->
                <div class="tab-pane active show" id="schedule_flowsheet_tab">
                    <div class="card-body">
                        <div class="row">
                            <div>
                                <!-- php: if($isCurrentVisit): -->
                                    <button class="btn btn-md btn-primary text-slate-900 ml-3" style="border-radius:5px;" data-toggle="modal" data-target="#scheduleFlowSheetModal"> Schedule Flow Sheet</button>
                                <!-- php: endif; -->
                            </div>
                            <!--Filter-->
                            <div class="col-md-4 ">
                                <SearchableSelectField class="form-control mt-2" id="flowSheet_filter">
                                    <option value="all">All</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="completed">Completed</option>

                                </SearchableSelectField>

                            </div>

                            <!--Tables-->
                            <div class="table-scrollable ">
                                <table class="table table-hover order-column full-width " id="flowsheet_table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date Created</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Frequency</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Sheet(s) </th>
                                            <th scope="col" class="actions"><!-- php: = __('Actions') --></th>
                                        </tr>
                                    </thead>



                                </table>
                            </div>

                        </div>






                    </div>

                </div>












                <!--Analysis tab content-->
                <div class="tab-pane" id="analysis_flowSheet_tab">
                    <div class="card-body">
                        <!--Dashboard -->
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <div class="card-counter primary">
                                    <i class="fa fa-clock-o"></i>
                                    <span class="count-numbers" id="scheduled_sheet_count">12</span>
                                    <span class="count-name">Scheduled</span>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="card-counter danger">
                                    <i class="fa fa-check"></i>
                                    <span class="count-numbers" id="completed_sheet_count">5</span>
                                    <span class="count-name">Completed</span>
                                </div>
                            </div>

                            <!-- <div class="col-md-3">
                                <div class="card-counter success">
                                    <i class="fa fa-history"></i>
                                    <span class="count-numbers" id="vital_sheet_count">Vitals - 12/01/2022 </span>
                                    <span class="count-name">Recent</span>
                                </div>
                            </div> -->

                            <div class="col-md-3">
                                <div class="card-counter info">
                                    <i class="fa fa-list-alt"></i>
                                    <span class="count-numbers" id="all_sheet_count">35</span>
                                    <span class="count-name">All</span>
                                </div>
                            </div>
                        </div>


                        <!--Analysis section-->
                        <div class="row">
                            <div class="row col-md-12 mb-3">
                                <SearchableSelectField class="form-control col-md-3" onchange="switchCurrentSheet(event)">
                                    <option value="" disabled selected>Sheet Options</option>
                                    <option value="vitals">Vitals</option>
                                    <option value="adls">ADLs</option>
                                    <option value="pca">PCA</option>
                                    <option value="continuousInfusion">Continuous Infusion</option>
                                    <option value="strokeSheet">Stroke</option>
                                    <option value="intakeOutput">Intake Output I/O</option>
                                    <option value="dailyCare">Daily Care</option>
                                </SearchableSelectField>


                                <input type="text" class="form-control col-md-3 " placeholder="Select Date" style="margin-left: auto;">
                            </div>

                            <div class="table-responsive">
                                <table class="table table-striped text-successtable-border border-light">
                                    <tbody class="border-light" id="analyze_flow_sheet_table">

                                    </tbody>

                                </table>
                            </div>



                        </div>




                    </div>

                </div>


            </div>
        </div>

    </div>

    <!--Modal Section-->
    <!--Schedule Modal-->
    <div class="modal fade" id="scheduleFlowSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Schedule Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>Schedule Time</b>
                    </span>
                </div>
                <div>




                </div>
                <form id="scheduleForm">
                    <div class="modal-body">
                        <div class="row">


                            <!--Requested service Details-->
                            <article class="card-body pt-2 pl-5 pr-5 p-0">


                                <div class="row ml-2">
                                    <!--Patient Details-->
                                    <div class="mr-5">
                                        <dl class="item-property">
                                            <dt>Patient Details</dt>

                                            <dd>
                                                <p>
                                                    Name: <span class="bold text-success"><!-- php: = $patient->first_name . ' ' . $patient->last_name --></span><br>
                                                    Age: <span class="bold text-success"><!-- php: = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </span><br>
                                                    Gender: <span class="bold text-success"><!-- php: = isset($patient->gender) ? $patient->gender->name : "" --> </span> <br>
                                                    location: <br>
                                                    Folder No: <span class="bold text-success"><!-- php: = $patient->folder --></span>

                                                </p>

                                            </dd>
                                        </dl>
                                    </div>

                                    <!--Allergy-->
                                    <div>
                                        <dl class="item-property">
                                            <dt>Allergy</dt>

                                            <dd>
                                                <p>
                                                    <span class="badge rounded-pill bg-warning">Allergy 1</span><br>
                                                    <span class="badge rounded-pill bg-warning">Allergy 2</span> <br>
                                                    <span class="badge rounded-pill bg-warning">Allergy 3</span> <br>
                                                    <span class="badge rounded-pill bg-warning">Allergy 4</span> <br>

                                                </p>

                                            </dd>
                                        </dl>
                                    </div>

                                </div>
                                <hr>

                                <dl class="item-property">
                                    <dt>Flow Sheet Type</dt>
                                    <dd>
                                        <SearchableSelectField id="schedule_flow_sheet_type" class="form-control selectpicker" title="Select Sheet">
                                        </SearchableSelectField>
                                    </dd>
                                </dl>

                                <hr>


                                <dl class="item-property">
                                    <dt>Select Frequency</dt>
                                    <dd>
                                        <SearchableSelectField id="schedule_flow_sheet_frequency" onchange="setUpNewSheetSchedule()" class="form-control selectpicker">
                                            <option value="" disabled selected hidden>Select...</option>

                                        </SearchableSelectField>
                                    </dd>
                                </dl>


                                <hr>


                                <dl class="item-property">
                                    <dt>Start Date </dt>
                                    <dd class="input-group">
                                        <input class="form-control set_flow_sheet_dateTime_future" size="16" type="text" id="schedule_flow_sheet_start_date" onchange="setUpNewSheetSchedule()" placeholder="Enter Start Date" style="max-height: 35px;" readonly="">
                                        <span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
                                    </dd>
                                </dl>

                                <hr>

                                <dl class="item-property">
                                    <dt>End Date </dt>
                                    <dd class="input-group">
                                        <input class="form-control set_flow_sheet_dateTime_future" size="16" type="text" id="schedule_flow_sheet_end_date" onchange="setUpNewSheetSchedule()" placeholder="Enter End Date" style="max-height: 35px;" readonly="">
                                        <span class="input-group-addon bg-primary" style="max-height: 35px;"><span class="fa fa-calendar text-slate-900"></span></span>
                                    </dd>
                                </dl>
                                <hr>

                                <dl class="item-property">
                                    <dt>Suggested Sheet Dates <p class="bold pl-3"></p></dt>
									<dd id="suggested_sheet_dates">
										
									</dd>
                                </dl>
                                <hr>

                                <dl class="item-property">
                                    <dt>Notes</dt>
                                    <dd>
                                        <textarea id="schedule_flow_sheet_notes" rows="2" class="full-width form-control "></textarea>

                                        </SearchableSelectField>
                                    </dd>
                                </dl>

                                <hr>

                                <dl class="item-property">
                                    <dt>Bill </dt>
                                    <dd>
                                        <SearchableSelectField id="schedule_flow_sheet_bill" class="form-control selectpicker">

                                        </SearchableSelectField>
                                    </dd>
                                </dl>


                                </section>


                                <!--//Event Paramters -->











                            </article>
                            <!--//Requested Service Details-->





                        </div> <!-- row.// -->



                        <hr>


                    </div> <!-- row.// -->
                    <div class="modal-footer border-top-0 d-flex justify-content-center">
                        <button id="save_schedule_time_sheet" data-dismiss="modal" type="button" class="btn btn-success btn-lg  mb-2"><i class="fa fa-check"></i>
                            save</button>
                        <button data-dismiss="modal" type="button" class="btn btn-danger btn-lg  mb-2"><i class="fa fa-times"></i>
                            Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    </div>

    <!--Vitals FlowSheet Modal-->
    <div class="modal fade" id="vitalFlowSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-fluid" style="width: 60%;" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Scheduled Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>Vitals Sheet # <span id="vitalFlowSheetModal_sheetNumber"></span></b>
                    </span>
                </div>
                <div>




                </div>
                <div class="p-5  vitalsDiv">
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFlowSheetVitals', 'action' => 'add', $selectedVisit->id], 'id' => 'vitalsForm']); -->
                    <div class="form-body">
                        <input type="hidden" name="next" id="vitalFlowSheetModal_next">
                        <input type="hidden" name="request_flow_sheet_id" id="vitalFlowSheetModal_sheet_id">
                        <h4 class="bold mb-2">General</h4>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Temperature <span>&#176;</span>C

                            </label>
                            <div class=" col-md-7">
                                <input type="number" id="temperature" data-required="0" placeholder="Enter Temperature" name="temperature" class="form-control" />

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Temperature Source

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="temperature_source" id="temperature_source" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="oral">Oral</option>
                                    <option value="tympanic">Tympanic</option>
                                    <option value="rectal">Rectal</option>
                                    <option value="axillary">Axillary</option>
                                    <option value="temporal">Temporal</option>
                                    <option value="skin">Skin</option>
                                    <option value="bladder">Bladder</option>
                                    <option value="core">Core</option>
                                    <option value="oesophageal">Oesophageal</option>

                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Heart Rate (beats per minute)

                            </label>
                            <div class="col-md-7">
                                <input type="number" name="heart_rate" data-required="0" placeholder="Enter Heart Rate" class="form-control " />
                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Heart Rate Source

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="heart_rate_source" id="heart_rate_source" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="apical">Apical</option>
                                    <option value="monitor">Monitor</option>
                                    <option value="right">Right</option>
                                    <option value="left">Left</option>
                                    <option value="radial">Radial</option>
                                    <option value="brachial">Brachial</option>
                                    <option value="dorsals pedis">Dorsals Pedis</option>
                                    <option value="femoral">Femoral</option>
                                    <option value="cartotid">Cartotid</option>
                                    <option value="popliteal">Popliteal</option>
                                    <option value="posterior tibial">Posterior Tibial</option>
                                    <option value="0">Other</option>

                                </SearchableSelectField>


                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Respiratory Rate (breath per minute)

                            </label>
                            <div class="col-md-7">
                                <input type="number" name="respiratory_rate" data-required="0" placeholder="Enter Respiratory Rate" class="form-control " />
                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">BP (mmHg)

                            </label>
                            <div class="col-md-7">
                                <div class="input-group">
                                    <input class="form-control " placeholder="Systolic" name="systolic" data-required="1" type="number" min="0">
                                    <span class="input-group-addon"><span class=""> ⁄ </span></span>
                                    <input class="form-control" placeholder="Diastolic" name="diastolic" data-required="1" type="number" min="0">
                                </div>

                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">BP Location

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="bp_location" id="bp_location" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="right arm">Right Arm</option>
                                    <option value="left arm">Left Arm</option>
                                    <option value="left leg">Left Leg</option>
                                    <option value="right leg">Right Leg</option>
                                    <option value="0">Other</option>

                                </SearchableSelectField>
                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">BP Method

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="bp_method" id="bp_method" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="arterial line">Arterial Line</option>
                                    <option value="manual">Manual</option>
                                    <option value="doppler">Doppler</option>
                                    <option value="0">Other</option>

                                </SearchableSelectField>
                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Patient Position

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="patient_position" id="patient_position" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="lying">Lying</option>
                                    <option value="sitting">Sitting</option>
                                    <option value="standing">Standing</option>
                                    <option value="held">Held</option>
                                    <option value="0">Other</option>
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">ETCO2 (mmHg)

                            </label>
                            <div class="col-md-7">
                                <input type="number" name="etco2" data-required="0" placeholder="Enter ETC02" class="form-control " />
                            </div>
                        </div>

                        <h4 class="bold mb-2">SP02</h4>

                        <div class="form-group row">
                            <label class="control-label col-md-5">SP02 (%)

                            </label>
                            <div class="col-md-7">
                                <input type="number" name="spo2" data-required="0" placeholder="Enter SpO2" class="form-control " />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Pulse Oximetry Type

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="pulse_type" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="intermittent">Intermittent</option>
                                    <option value="continuous">Continuous</option>
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Patient Acitivity During SP02 Measurement

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="patient_activity" id="patient_activity" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="walking ">Walking </option>
                                    <option value="at rest">At Rest</option>
                                    <option value="0">Other</option>

                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Oxygen Therapy

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="oxygen_therapy" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="Room Air (None)">Room Air (None)</option>
                                    <option value="Supplemental Oxygen">Supplemental Oxygen</option>

                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">02 Delivery Method

                            </label>
                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="02_delivery_method" id="02_delivery_method" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="Nasal Cannula">Nasal Cannula</option>
                                    <option value="Simple Mask">Simple Mask</option>
                                    <option value="Aerosol Mask">Aerosol Mask</option>
                                    <option value="High Flow Nasal Cannula">High Flow Nasal Cannula</option>
                                    <option value="Blow-by">Blow-by</option>
                                    <option value="Endotracheal Tube">Endotracheal Tube</option>
                                    <option value="Face Tent">Face Tent</option>
                                    <option value="Non-rebreather mask">Non-rebreather mask</option>
                                    <option value="t-piece">T-piece</option>
                                    <option value="trash mask">Trash Mask</option>
                                    <option value="transtracheal catheter">Transtracheal Catheter</option>
                                    <option value="trash tube">Trash Tube</option>
                                    <option value="Venturi mask">Venturi Mask</option>
                                    <option value="CPAP/Bi-PAP Mask">CPAP/Bi-PAP Mask</option>
                                    <option value="CPAP prongs">CPAP Prongs</option>
                                    <option value="Oxyhood">Oxyhood</option>
                                    <option value="bag valve mask">Bag Valve Mask</option>
                                    <option value="0">Other</option>

                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">FiO2 (%)

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="fio2" data-required="0" placeholder="Enter FiO2" class="form-control " />
                            </div>

                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">02 Flow Rate (L/min)

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="flow_rate" data-required="0" placeholder="Enter o2 Flow Rate" class="form-control " />
                            </div>

                        </div>


                        <h4 class="bold mb-2">Height & Weight</h4>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Height (cm)

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="height" data-required="0" placeholder="Enter Heigh" class="form-control " />
                            </div>

                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Height Method

                            </label>

                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="height_method" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="stated">Stated</option>
                                    <option value="measured">Measured</option>
                                    <option value="estimated">Estimated</option>


                                </SearchableSelectField>
                            </div>

                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Weight (Kg)

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="weight" data-required="0" placeholder="Enter Weight" class="form-control " />
                            </div>

                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Weight Method

                            </label>

                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="weight_method" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="standing scale">Standing Scale</option>
                                    <option value="bed scale">Bed Scale</option>
                                    <option value="Hoyer scale">Hoyer Scale</option>
                                    <option value="Chair Scale">Chair Scale</option>
                                    <option value="infant scale">Infant Scale</option>
                                    <option value="stated">Stated</option>
                                    <option value="estimated">Estimated</option>


                                </SearchableSelectField>
                            </div>

                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Estimated Dry Weight

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="estimated_dry_weight" data-required="0" placeholder="Enter Estimated Dry Weight" class="form-control " />
                            </div>

                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Dosage Weight

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="dosage_weight" data-required="0" placeholder="Enter Dosage Weight" class="form-control " />
                            </div>

                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">BMI Amputation Adjustment

                            </label>

                            <div class="col-md-7">
                                <SearchableSelectField class="selectpicker form-control" name="bmi_amputation_adjustment" aria-label="Default select example" data-live-search="false">
                                    <option value="" disabled selected hidden>Select ...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </SearchableSelectField>
                            </div>

                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">BSA

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="bsa" data-required="0" placeholder="Enter BSA" class="form-control " />
                            </div>

                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">BMI (Kg/m2)

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="bmi" data-required="0" placeholder="Enter BMI" class="form-control " />
                            </div>

                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Weight (kg)

                            </label>

                            <div class="col-md-7">
                                <input type="number" name="weight_kg" data-required="0" placeholder="Enter Weight(kg) to BMI" class="form-control " />
                            </div>

                        </div>

                        <input type="number" hidden data-required="0" value="1" name="is_complete" class="form-control" />


















                    </div>
                    <!--Button-->
                    <div class="form-actions">
                        <button type="submit" class="btn btn-md btn-success float-right mr-3 mb-3 ">Record</button>
                    </div>
                    <!-- php: = $this->Form->end() -->

                </div>
            </div>

        </div>
    </div>


    <!--Adls FlowSheet Modal-->
    <div class="modal fade" id="adlFlowSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-fluid" style="width: 60%;" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Scheduled Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>ADLs Sheet # <span id="adlFlowSheetModal_sheetNumber"></span></b>
                    </span>
                </div>
                <div>




                </div>
                <!--ADLs content section -->
                <div class="p-5  adlsDiv">
                    
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFlowSheetAdls', 'action' => 'add', $selectedVisit->id], 'id' => 'adlsForm',]); -->
                    <div class="form-body">
                        <input type="hidden" name="next" id="adlFlowSheetModal_next">
                        <input type="hidden" name="request_flow_sheet_id" id="adlFlowSheetModal_sheet_id">
                        <h4 class="bold mb-2">Eating</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient eat?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="has_eaten" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help eating?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_eating" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>


                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the resident eating?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_eating" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_eating" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>


                            </div>
                        </div>




                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need need eating?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_eating_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="limited help">Limited help</option>
                                    <option value="extensive help">Extensive help</option>
                                    <option value="total dependence">Total dependence</option>
                                </SearchableSelectField>


                            </div>
                        </div>


                        <h4 class="bold mb-2">Dressing</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient dress?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="is_dressed" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>



                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help using the Dressing?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_dressing" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>


                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the patient dressing?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_dressing">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_dressing" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_dressing" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>


                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need dressing?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_dressing_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="limited help">Limited help</option>
                                    <option value="extensive help">Extensive help</option>
                                    <option value="total dependence">Total dependence</option>
                                </SearchableSelectField>


                            </div>
                        </div>


                        <h4 class="bold mb-2">Toilet Use</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient use the toilet?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_use_toilet" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>



                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help using the toilet?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_toilet" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>


                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the patient using the toilet?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_toilet" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_toilet" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>


                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need using the toilet?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_toilet_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="limited help">Limited help</option>
                                    <option value="extensive help">Extensive help</option>
                                    <option value="total dependence">Total dependence</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Personal Hygiene</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient do personal hygiene activities?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_personal_hygiene" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help with personal hygiene?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_personal_hygiene" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the patient doing personal hygiene activities?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_personal_hygiene" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_personal_hygiene" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need with personal hygiene activities?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_personal_hygiene_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="limited help">Limited help</option>
                                    <option value="extensive help">Extensive help</option>
                                    <option value="total dependence">Total dependence</option>

                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Bathing</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient bathe?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_bath" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help bathing?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_bath" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the patient bathing?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_bath" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_bath" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need bathing?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_bath_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="limited help">Limited help</option>
                                    <option value="extensive help">Extensive help</option>
                                    <option value="total dependence">Total dependence</option>

                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Bed Mobility</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient have bed mobility?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_bed_mobility" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help moving in bed?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_bed_mobility" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the patient moving in bed?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_bed_mobility" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_bed_mobility" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need moving in bed?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_bed_mobility_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="limited help">Limited help</option>
                                    <option value="extensive help">Extensive help</option>
                                    <option value="total dependence">Total dependence</option>

                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Transfer</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient transfer?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_transfer" id="" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the resident need help to transfer?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_transfer" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the patient transferring?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_transfer" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_transfer" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need to transfer?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_transfer_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="non-weight bearing help">Non-weight bearing help</option>
                                    <option value="weight-bearing help">Weight-bearing help</option>
                                    <option value="total dependence">Total dependence</option>

                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Walk In Room</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient walk in the room?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_walked_in_room" id="" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help walking in the room?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_walk_in_room" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise patient walking in the room?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_walk_in_room" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_walk_in_room" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the resident need walking in the room?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_walk_in_room_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="non-weight bearing help">Non-weight bearing help</option>
                                    <option value="weight-bearing help">Weight-bearing help</option>
                                    <option value="total dependence">Total dependence</option>

                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Walk In Hall</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient walk in the hall?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_walk_in_hall" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient need help walking in the hall?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_walk_in_hall" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise the patient walking in the hall?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_walk_in_hall" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_walk_in_hall" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need walking in the hall?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_walk_in_hall_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="non-weight bearing help">Non-weight bearing help</option>
                                    <option value="weight-bearing help">Weight-bearing help</option>
                                    <option value="total dependence">Total dependence</option>

                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Locomotion On Unit</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Did the patient locomotive on unit?

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="has_locomotive_on_unit" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Refused</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did patient need help locating on unit?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_locomotive_on_unit" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="didn’t need help">Didn’t need help</option>
                                    <option value="setup help only">Setup help only</option>
                                    <option value="physical help from one person">Physical help from one person</option>
                                    <option value="physical help from two or more people ">Physical help from two or more people </option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Did you supervise patient locomotion on unit?

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_toilet_use">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_locomotive_on_unit" id="true_radio" value="I supervise the activity" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">I supervise the activity</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="supervise_locomotive_on_unit" id="false_radio" value="I did not supervise the activity">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">I did not supervise the activity</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How much help did the patient need locomotion on unit?

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="help_with_locomotive_on_unit_level" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="non-weight bearing help">Non-weight bearing help</option>
                                    <option value="weight-bearing help">Weight-bearing help</option>
                                    <option value="total dependence">Total dependence</option>

                                </SearchableSelectField>

                            </div>
                        </div>

                        <h4 class="bold mb-2">Functional Rehabilitation Potential</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Patient believes he or she is capable of increased independence in at least some ADLs

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="increased_independence_capability_by_patient" class="selectpicker form-control">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="refused">Unable to Determine</option>
                                </SearchableSelectField>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Direct care staff believe resident is capable of increased independence in at least some ADLs

                            </label>
                            <div class=" col-md-7">
                                <div id="adls_supervise_activity_functional_behaviour">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="increased_independence_capability_by_staff" id="true_radio" value="yes" checked>
                                        <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="increased_independence_capability_by_staff" id="false_radio" value="no">
                                        <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-md btn-success float-right mr-3 mb-3 ">Record</button>
                    </div>

                    <!-- php: = $this->Form->end() -->

                </div>
            </div>

        </div>
    </div>

    <!-- PCA Flowsheet Modal -->
    <div class="modal fade" id="pcaFlowSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-fluid" style="width: 60%;" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Scheduled Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>PCAs Sheet # <span id="pcaFlowSheetModal_sheetNumber"></span></b>
                    </span>
                </div>
                <div>




                </div>
                <!--ADLs content section -->
                <div class="p-5  adlsDiv">
                    
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFlowSheetPcas', 'action' => 'add', $selectedVisit->id], 'id' => 'pcasForm',]); -->
                    <div class="form-body">
                        <input type="hidden" name="next" id="pcaFlowSheetModal_next">
                        <input type="hidden" name="request_flow_sheet_id" id="pcaFlowSheetModal_sheet_id">
                        <h4 class="bold mb-2">General</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Assessment

                            </label>
                            <div class=" col-md-7">

                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="pain_assessment" id="pain_assessment_id" value="nps" checked>
                                        <label class="form-check-label" for="pain_assessment"><span class="badge rounded-pill" style="background-color: #d63031;">Nps</span></label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="pain_assessment" id="pain_assessment_id" value="wong-backer">
                                        <label class="form-check-label" for="pain_assessment"><span class="badge rounded-pill" style="background-color: #0984e3;">Wong-Baker Faces</span></label>
                                    </div>
                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Score

                            </label>
                            <div class=" col-md-7" id="nps_pain_assessment_score">
                                <input type="number" min="0" max="10" name="pain_score" placeholder="Select Pain Score" id="nps_pain_score" class="form-control full-width">
                            </div>
                            <div class=" col-md-7" id="wong_backer_pain_assessment_score" style="display:none">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pain_score" id="wong_pain_score" value="1" checked>
                                    <label class="form-check-label" for="wong_pain_score">
                                        <span class="" style="background-color: none;">
                                            <!-- php: = $this->Html->image("no_pain.png",['class' =>'img-responsive', 'style' => 'width: 150px']); -->
                                        </span>
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pain_score" id="wong_pain_score_2" value="2">
                                    <label class="form-check-label" for="wong_pain_score_2">
                                        <span class="" style="background-color: none;">
                                            <!-- php: = $this->Html->image("mid_pain.png",['class' =>'img-responsive', 'style' => 'width: 150px']); -->
                                        </span>
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pain_score" id="wong_pain_score_3" value="3">
                                    <label class="form-check-label" for="wong_pain_score_3">
                                        <span class="" style="background-color: none;">
                                            <!-- php: = $this->Html->image("moderate_pain.png",['class' =>'img-responsive', 'style' => 'width: 150px']); -->
                                        </span>
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pain_score" id="wong_pain_score_4" value="4">
                                    <label class="form-check-label" for="wong_pain_score_4">
                                        <span class="" style="background-color: none;">
                                            <!-- php: = $this->Html->image("severe.png",['class' =>'img-responsive', 'style' => 'width: 150px']); -->
                                        </span>
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pain_score" id="wong_pain_score_5" value="5">
                                    <label class="form-check-label" for="wong_pain_score_5">
                                        <span class="" style="background-color: none;">
                                            <!-- php: = $this->Html->image("very_severe_pain.png",['class' =>'img-responsive', 'style' => 'width: 150px']); -->
                                        </span>
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pain_score" id="wong_pain_score_6" value="6">
                                    <label class="form-check-label" for="wong_pain_score_6">
                                        <span class="" style="background-color: none;">
                                            <!-- php: = $this->Html->image("worst_pain.png",['class' =>'img-responsive', 'style' => 'width: 150px']); -->
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Type

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="pain_type" class="selectpicker form-control" title="Select Pain Type">
                                    <option value="Acute Pain">Acute Pain</option>
                                    <option value="Chronic Pain">Chronic Pain</option>
                                    <option value="Surgical Pain">Surgical Pain</option>
                                    <option value="Neuropathic Pain">Neuropathic Pain</option>
                                    <option value="Deep Somatic Pain">Deep Somatic Pain</option>
                                    <option value="Intractable Pain">Intractable Pain</option>
                                    <option value="Phantom Pain">Phantom Pain</option>
                                    <option value="Referred Pain">Referred Pain</option>
                                    <option value="Superficial Somatic Pain">Superficial Somatic Pain</option>
                                    <option value="Visceral Pain ">Visceral Pain </option>
                                    <option value="Other - Comment">Other - Comment</option>
                                </SearchableSelectField>


                            </div>
                        </div>




                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Location

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="pain_location" id="pain_location_id" title="Select Pain location" class="selectpicker form-control">
                                </SearchableSelectField>
                            </div>
                        </div>


                        <!-- <h4 class="bold mb-2">Dressing</h4> -->
                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Radiating Towards

                            </label>
                            <div class=" col-md-7">

                                <textarea name="pain_radiating_towards" id="" rows="2" class="full-width form-control "></textarea>



                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Descriptors

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="pain_descriptors[]" id="pain_descriptors_id" class="selectpicker form-control" title="Select Pain Descriptors" multiple>
                                </SearchableSelectField>


                            </div>
                        </div>


                        <!-- <h4 class="bold mb-2">Toilet Use</h4> -->
                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Frequency

                            </label>
                            <div class=" col-md-7">

                                <SearchableSelectField name="pain_frequency" title="Select Pain Frequency" class="selectpicker form-control" id="pain_frequencies_id">
                                </SearchableSelectField>



                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Onset

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="pain_onset" title="Select Pain Onset" class="selectpicker form-control" id="pain_onset_id">
                                </SearchableSelectField>


                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Clinical Progression

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="clinical_progression" title="Select Clinical Progression" class="selectpicker form-control" id="clinical_progression_id">
                                </SearchableSelectField>


                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Interventions

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="pain_interventions" title="Select Pain Interventions" class="selectpicker form-control" id="pain_intervention_id">
                                </SearchableSelectField>


                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Pain Orientation

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="pain_orientation" title="Select Pain Orientation" class="selectpicker form-control" id="pain_orientation_id">
                                </SearchableSelectField>


                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Response to Intervention

                            </label>
                            <div class=" col-md-7">
                                <textarea name="intervention_response" id="" class="full-width form-control " rows="2"></textarea>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Patient Stated Pain Goal

                            </label>
                            <div class=" col-md-7">
                                <textarea name="intervention_response" id="" class="full-width form-control " rows="2"></textarea>
                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Multiple Pain Sites

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min="2" max="10" placeholder="Multiple Pain Sites" class="full-width form-control " name="multiple_pain_sites" id="">
                            </div>
                        </div>


                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-md btn-success float-right mr-3 mb-3 ">Record</button>
                    </div>

                    <!-- php: = $this->Form->end() -->

                </div>
            </div>

        </div>
    </div>

    <!-- Daily Care Flowsheet Modal -->
    <div class="modal fade" id="dailyCareFlowSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-fluid" style="width: 60%;" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Scheduled Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>Daily Care Sheet # <span id="dailyCareSheetModal_sheetNumber"></span></b>
                    </span>
                </div>
                <div>




                </div>
                <!--ADLs content section -->
                <div class="p-5  adlsDiv">
                    
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFlowSheetPcas', 'action' => 'add', $selectedVisit->id], 'id' => 'dailyCareForm',]); -->
                    <div class="form-body">
                        <input type="hidden" name="next" id="dailyCareSheetModal_next">
                        <input type="hidden" name="request_flow_sheet_id" id="dailyCareSheetModal_sheet_id">
                        <h4 class="bold mb-2">Precautions</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Precautions

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="precautions" id="daily_care_precautions_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>
                        <h4 class="bold mb-2">Hester Davis Fall Risk Assessment</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Last known fall

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="last_known_fall" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Mobility

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="mobility" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Medications

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="medications" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Mental status/loc/awareness

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="mental_status" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Toileting needs

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="toileting_needs" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Volume/electrolyte+ status

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="volume_electrolyte_status" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Communicaiton/sensory

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="sensory" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Behavior

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="behavior" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Hester davis fall risk total

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="fall_risk_total" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <h4 class="bold mb-2">Fall Risk Interventions</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Toilet every 2 hours-in advance of need

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="toilet_hours_of_need" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Hourly visual checks

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="hourly_visual_checks" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Fall armband on

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="fall_armband_on" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Room door open

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="room_door_open" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Gait belt used for transfers

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="gait_belt" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Alarm on

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="alarm_on" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        
                        <h4 class="bold mb-2">Mobility</h4>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Activity

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="activity" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Level of assistance

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="assistance_level_mobility" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Length of time in chair (min)

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="time_in_chair" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Assistive device

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="assistive_device" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Distance ambulated

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="ambulated_distance" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Repositioned

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="repositioned" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Positioning frequency

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="positioning_frequency" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Head of bed elevated

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="head_of_bed_elevated" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Heels/feet

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="heels" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Range of motion

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="range_of_motion" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Anti-embolism devices

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="anti_embolism_devices" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Anti-embolism intervention

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="anti_embolism_intervention" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <h4 class="bold mb-2">Nutrition</h4>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Feeding

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="feeding" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Diet type

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="diet_type" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Appetite

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="appetite" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Fluid restrictions

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="fluid_restrictions" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Diet supplements

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="diet_supplements" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>

                        <h4 class="bold mb-2">Hygeine</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Hygiene

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="hygiene" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Oral care

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="oral_care" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Incontinence protective devices

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="incontinence_protective_devices" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Skin care

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="skin_care" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Level of assistance

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="assistance_level_hygeine" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>

                        <h4 class="bold mb-2">Patient Preferences</h4>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Clothing preferences

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="clothing_preferences" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Entertainment

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="entertainment" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Entertainment activities

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="entertainment_activities" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Entertainment preferences

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="entertainment_preferences" id="" class="full-width form-control "></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-md btn-success float-right mr-3 mb-3 ">Record</button>
                    </div>

                    <!-- php: = $this->Form->end() -->

                </div>
            </div>

        </div>
    </div>

    <!-- Intake Output Flow Sheet -->
    <div class="modal fade" id="intakeOutputFlowSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-fluid" style="width: 60%;" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Scheduled Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>Intake Output Sheet # <span id="intakeOutputFlowSheetModal_sheetNumber"></span></b>
                    </span>
                </div>
                <div>




                </div>
                <!--ADLs content section -->
                <div class="p-5  adlsDiv">
                    
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFlowSheetIntakeOutputs', 'action' => 'add', $selectedVisit->id], 'id' => 'intakeOutputForm',]); -->
                    <div class="form-body">
                        <input type="hidden" name="next" id="intakeOutputFlowSheetModal_next">
                        <input type="hidden" name="request_flow_sheet_id" id="intakeOutputFlowSheetModal_sheet_id">

                        <h4 class="bold mb-2">General</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Weight

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min="0" name="weight" placeholder="Select Pain Score" class="form-control full-width">
                            </div>
                        </div>
                        
                        
                        <div class="form-group row">
                            <label class="control-label col-md-5">Weight Location
                                
                                </label>
                                <div class=" col-md-7">
                                    <SearchableSelectField name="weight_method" class="selectpicker form-control" title="Select Pain Assessment" id="weight_method_id">
                                    </SearchableSelectField>
                                </div>
                        </div>



                        <div class="form-group row">
                            <label class="control-label col-md-5">Dosing Weight

                            </label>
                            <div class=" col-md-7">
                                <input type="number" name="dose_weight" placeholder="Set Dosing Weight" class="form-control full-width">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">BSA (Calculated - sq m)

                            </label>
                            <div class=" col-md-7">
                                <input type="number" name="bsa" placeholder="Set Dosing Weight" class="form-control full-width">
                            </div>
                        </div>


                        <h4 class="bold mb-2">Intake Fluids</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">P.O ml

                            </label>
                            <div class=" col-md-7">
                                <input type="number" name="po" placeholder="Select P.O ml" class="form-control full-width">

                            </div>
                        </div>


                        <!-- <h4 class="bold mb-2">Dressing</h4> -->
                        <div class="form-group row">
                            <label class="control-label col-md-5">Percent Meals Eaten %

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="percent_meals_eaten" id="percent_meals_eaten_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">I.V ml

                            </label>
                            <div class=" col-md-7">

                                <input type="text" name="iv" id="" rows="2" class="full-width form-control "></textarea>
                            </div>
                        </div>

                        <h4 class="bold mb-2">Urine Output Assessment</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Voided Urine ml

                            </label>
                            <div class=" col-md-7">
                                <input type="number" class="form-control full-width" name="voided_urine" min="0" id="">
                            </div>
                        </div>


                        <!-- <h4 class="bold mb-2">Toilet Use</h4> -->
                        <div class="form-group row">
                            <label class="control-label col-md-5">Unmeasured urine occurrence

                            </label>
                            <div class=" col-md-7">

                                <input type="number" class="form-control full-width" name="unmeasured_urine_occurance" id="">



                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="control-label col-md-5">Urinary Incontinence

                            </label>
                            <div class=" col-md-7">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="urinary_incontinence" id="true_radio" value="yes" checked>
                                    <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="urinary_incontinence" id="false_radio" value="no">
                                    <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                                </div>


                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Urine amount 

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="urine_amount" id="urine_amount_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Urine colour

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="urine_colour" id="urine_colour_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Urine appearance 

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="urine_appearance" id="urine_appearance_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Urine odour

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="urine_odour" id="urine_odour_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Additional urine volume rows

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="additional_urine_volume_rows" id="additional_urine_volume_rows_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Bladder scan volume ml

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min=0 class="form-control full-width" name="bladder_scan_volume" id="">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Intermittent/straight catheter ml

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min=0 class="form-control full-width" name="intermittent_catheter" id="">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Post void catheter residual ml

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min=0 class="form-control full-width" name="post_void_catheter_residual" id="">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Intermittent catheter type

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="intermittent_catheter_type" id="catheter_type_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Intermittent catheter size (Fr)

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="intermittent_catheter_size" id="catheter_size_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Urinary returned

                            </label>
                            <div class=" col-md-7">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="urine_returned" id="true_radio" value="yes" checked>
                                    <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="urine_returned" id="false_radio" value="no">
                                    <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                                </div>


                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">How patient tolerated intermittent catherization

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="intermitten_catherization_patient_tolerance" id="tolerated_catherization_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>
                        <h4 class="bold mb-2">Stool Output / Assessment</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Unmeasured Stool Occurrence

                            </label>
                            <div class=" col-md-7">
                                <input type="number" class="form-control full-width" min=0 name="unmeasured_stool_occurrence" id="">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Stool (ml)

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min=0 name="stool" id="" class="form-control">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Bowel Incontinence

                            </label>
                            <div class=" col-md-7">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bowel_incontinence" id="true_radio" value="yes" checked>
                                    <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bowel_incontinence" id="false_radio" value="no">
                                    <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                                </div>


                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Stool amount

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="stool_amount" id="stool_amount_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Stool appearance

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="stool_apperance" id="stool_appearance_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Stool color 

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="stool_colour" id="stool_color_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Last BM Date 

                            </label>
                            <div class=" col-md-7">
                                <input type="date" name="last_bm_date" class="form-control" id="">
                            </div>
                        </div>

                        <h4 class="bold mb-2">Emesis Output/Assessment</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Emesis (ml)

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min=0 name="emesis" id="" class="form-control">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Unmeasured emesis occurrence

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min=0 name="unmeasured_emesis_occurrence" id="" class="form-control">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Emesis amount

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="emesis_amount" id="emesis_amount_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Emesis colour/appearance

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="emesis_colour_appearance" id="emesis_appearance_id" class="selectpicker form-control" title="Select...">
                                </SearchableSelectField>
                            </div>
                        </div>

                        <h4 class="bold mb-2">BLOOD LOSS OUTPUT/ASSESSMENT</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Est. Blood Loss

                            </label>
                            <div class=" col-md-7">
                                <input type="number" min=0 name="estimated_blood_loss" id="" class="form-control">
                            </div>
                        </div>

                        <h4 class="bold mb-2">Specimen Collection</h4>
                        <div class="form-group row">
                            <label class="control-label col-md-5">

                            </label>
                            <div class=" col-md-7">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="specimen_collection" id="true_radio" value="peak" checked>
                                    <label class="form-check-label" for="true_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Peak</span></label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="specimen_collection" id="false_radio" value="trough">
                                    <label class="form-check-label" for="false_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">Trough</span></label>
                                </div>                            
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">Observations

                            </label>
                            <div class=" col-md-7">
                                <input type="text" name="observations" class="form-control full-width" id="">


                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">What is your dominant hand?

                            </label>
                            <div class=" col-md-7">
                                <input type="text" name="dominant_hand" class="form-control full-width" id="">


                            </div>
                        </div>

                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-md btn-success float-right mr-3 mb-3 ">Record</button>
                    </div>

                    <!-- php: = $this->Form->end() -->

                </div>
            </div>

        </div>
    </div>

    <!-- Sroke Sheet -->
    <div class="modal fade" id="strokeFlowSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-fluid" style="width: 60%;" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Scheduled Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>Stroke Score Sheet # <span id="strokeFlowSheetModal_sheetNumber"></span></b>
                    </span>
                </div>
                <div>




                </div>
                <!--ADLs content section -->
                <div class="p-5  adlsDiv">
                    
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFlowSheetStrokeScores', 'action' => 'add', $selectedVisit->id], 'id' => 'strokeScoreForm',]); -->
                    <div class="form-body">
                        <input type="hidden" name="next" id="strokeFlowSheetModal_next">
                        <input type="hidden" name="request_flow_sheet_id" id="strokeFlowSheetModal_sheet_id">

                        <div class="form-group row">
                            <label class="control-label col-md-5">Level of Consciousness

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="level_of_consciousness" id="" class="selectpicker form-control" title="Select Level of Consciousness">
                                    <option value="0">Alert</option>
                                    <option value="1">Drowsy</option>
                                    <option value="2">Stuporous</option>
                                    <option value="3">Coma</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Level of Consciousness Questions

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="level_of_consciousness_questions" id="" class="selectpicker form-control" title="Select Level of Consciousness Questions">
                                    <option value="0">Answers Both Correctly</option>
                                    <option value="1">Answers One Correctly</option>
                                    <option value="2">Both Incorrect</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Level of Consciousness Commands

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="level_of_consciousness_commands" id="" class="selectpicker form-control" title="Select Level of Consciousness Commands">
                                    <option value="0">Obeys Both Correctly</option>
                                    <option value="1">Obeys One Correctly</option>
                                    <option value="2">Both Incorrect</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Best Gaze

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="best_gaze" id="" class="selectpicker form-control" title="Select Best Gaze">
                                    <option value="0">Normal</option>
                                    <option value="1">Partial Gaze Palsy</option>
                                    <option value="2">Forced Deviation</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Visual

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="visual" id="" class="selectpicker form-control" title="Select Visual">
                                    <option value="0">No Visual Loss</option>
                                    <option value="1">Partial Hemianopia</option>
                                    <option value="2">Complete Hemianopia</option>
                                    <option value="3">Bilateral Hemianopia</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Facial Palsy

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="facial_palsy" id="" class="selectpicker form-control" title="Select Facial Palsy">
                                    <option value="0">Normal</option>
                                    <option value="1">Minor</option>
                                    <option value="2">Partial</option>
                                    <option value="3">Complete</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Motor Left Arm

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="motor_left_arm" id="" class="selectpicker form-control" title="Select Motor Left Arm">
                                    <option value="0">No Drift</option>
                                    <option value="1">Drift</option>
                                    <option value="2">Resist Gravity</option>
                                    <option value="3">No Effort Against Gravity</option>
                                    <option value="4">No Movement</option>
                                    <option value="9">Amputation/Joint Fusion</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Motor Right Arm

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="motor_right_arm" id="" class="selectpicker form-control" title="Select Motor Right Arm">
                                    <option value="0">No Drift</option>
                                    <option value="1">Drift</option>
                                    <option value="2">Can't Resist Gravity</option>
                                    <option value="3">No Effort Against Gravity</option>
                                    <option value="4">No Movement</option>
                                    <option value="9">Amputation/Joint Fusion</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Motor Left Leg

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="motor_left_leg" id="" class="selectpicker form-control" title="Select Motor Left Leg">
                                    <option value="0">No Drift</option>
                                    <option value="1">Drift</option>
                                    <option value="2">Can't Resist Gravity</option>
                                    <option value="3">No Effort Against Gravity</option>
                                    <option value="4">No Movement</option>
                                    <option value="9">Amputation/Joint Fusion</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Motor Right Leg

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="motor_right_leg" id="" class="selectpicker form-control" title="Select Motor Right Leg">
                                    <option value="0">No Drift</option>
                                    <option value="1">Drift</option>
                                    <option value="2">Can't Resist Gravity</option>
                                    <option value="3">No Effort Against Gravity</option>
                                    <option value="4">No Movement</option>
                                    <option value="9">Amputation/Joint Fusion</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Limb Atazia

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="limb_ataxia" id="" class="selectpicker form-control" title="Select Limb Atazia">
                                    <option value="0">Absent</option>
                                    <option value="1">Present in One Limb</option>
                                    <option value="2">Present in Two Limbs</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Sensory

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="sensory" id="" class="selectpicker form-control" title="Select Sensory">
                                    <option value="0">Normal</option>
                                    <option value="1">Partial Loss</option>
                                    <option value="2">Severe Loss</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Best Language

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="best_language" id="" class="selectpicker form-control" title="Select Best Language">
                                    <option value="0">No Aphasia</option>
                                    <option value="1">Mild to Moderate Aphasia</option>
                                    <option value="2">Severe Aphasia</option>
                                    <option value="3">Mute</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Dysarthria

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="dysarthria" id="" class="selectpicker form-control" title="Select Dysarthria">
                                    <option value="0">Normal Articulation</option>
                                    <option value="1">Mild to Moderate Dysarthria</option>
                                    <option value="2">Near to Unintelligible</option>
                                    <option value="9">Intubated or Other Barrier</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">Extinction Inattention

                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="extinction_inattention" id="" class="selectpicker form-control" title="Select Extinction Inattention">
                                    <option value="0">No Neglect</option>
                                    <option value="1">Partial Neglect</option>
                                    <option value="2">Complete Neglect</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-md btn-success float-right mr-3 mb-3 ">Record</button>
                    </div>

                    <!-- php: = $this->Form->end() -->

                </div>
            </div>

        </div>
    </div>

    <!-- Continuous Infusion IV Line Assessment Sheet -->
    <div class="modal fade" id="contInfusionSheetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-fluid" style="width: 60%;" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="pl-4 modal-title" id="exampleModalLabel" style="font-weight: bolder;">Scheduled Flow Sheet</h5>
                    <span class="pull-left" style="color: red;">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="mb-2">
                    <span class="label label-lg bg-primary text-uppercase "><b>Continuous Infusion Sheet # <span id="contInfusionSheetModal_sheetNumber"></span></b>
                    </span>
                </div>
                <div>




                </div>
                <!--ADLs content section -->
                <div class="p-5  adlsDiv">
                    
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitFlowSheetInfusion', 'action' => 'add', $selectedVisit->id], 'id' => 'contInfusionIVForm',]); -->
                    <div class="form-body">
                        <input type="hidden" name="next" id="contInfusionSheetModal_next">
                        <input type="hidden" name="request_flow_sheet_id" id="contInfusionSheetModal_sheet_id">

                        <div class="form-group row">
                            <label class="control-label col-md-5">
                                Site Assessment
                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="site_assessment[]" id="" class="selectpicker form-control" title="Select Site Assessment" multiple>
                                    <option value="clean">clean</option>
                                    <option value="dry">dry</option>
                                    <option value="intact">intact</option>
                                    <option value="bleeding">bleeding</option>
                                    <option value="draining">draining</option>
                                    <option value="ecchymotic">ecchymotic</option>
                                    <option value="edematous">edematous</option>
                                    <option value="extras">extras</option>
                                    <option value="leaking">leaking</option>
                                    <option value="painful">painful</option>
                                    <option value="pink">pink</option>
                                    <option value="positional">positional</option>
                                    <option value="red">red</option>
                                    <option value="tender">tender</option>
                                    <option value="not assessed">not assessed</option>
                                    <option value="other -comment">other -comment</option>
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">
                                Dressing Type
                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="dressing_type[]" id="" class="selectpicker form-control" title="Select Dressing Type" multiple>
                                    <option value="gauze">gauze</option>
                                    <option value="prima pore">prima pore</option>
                                    <option value="transparent">transparent</option>
                                    <option value="securing device">securing device</option>
                                    <option value="other -comment">other -comment</option>
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">
                                Line Status
                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="line_status[]" id="" class="selectpicker form-control" title="Select Line Status" multiple>
                                    <option value="blood return">blood return</option>
                                    <option value="no blood return">no blood return</option>
                                    <option value="capped">capped</option>
                                    <option value="Close Up / Block Off">Close Up / Block Off</option>
                                    <option value="flushed">flushed</option>
                                    <option value="heparin locked">heparin locked</option>
                                    <option value="infiltrated">infiltrated</option>
                                    <option value="infusing">infusing</option>
                                    <option value="lab draw">lab draw</option>
                                    <option value="leaking">leaking</option>
                                    <option value="positional">positional</option>
                                    <option value="saline locked">saline locked</option>
                                    <option value="other -comment">other -comment</option>
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-5">
                                Dressing Status
                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="dressing_status[]" id="" class="selectpicker form-control" title="Select Dressing Status" multiple>
                                    <option value="clean">clean</option>
                                    <option value="dry">dry</option>
                                    <option value="intact">intact</option>
                                    <option value="new drainage">new drainage</option>
                                    <option value="old drainage">old drainage</option>
                                    <option value="removed">removed</option>
                                    <option value="remoistened">remoistened</option>
                                    <option value="other -comment">other -comment</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">
                                Dressing Intervention
                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="dressing_intervention[]" id="" class="selectpicker form-control" title="Select Dressing Intervention" multiple>
                                    <option value="New dressing">New dressing</option>
                                    <option value="dressing changed">dressing changed</option>
                                    <option value="dressing reinforced">dressing reinforced</option>
                                    <option value="removed">removed</option>
                                    <option value="other - comment">other - comment</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">
                                Dressing Change Due
                            </label>
                            <div class=" col-md-7">
                                <input type="datetime-local" class="form-control" name="dressing_change_due" placeholder="Select Date">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-md-5">
                                Reason Not Rotated
                            </label>
                            <div class=" col-md-7">
                                <SearchableSelectField name="reason_not_rotated" id="" class="selectpicker form-control" title="Select Reason">
                                    <option value="Anticipated Discharged">Anticipated Discharged</option>
                                    <option value="Not due">Not due</option>
                                    <option value="Patient refused">Patient refused</option>
                                    <option value="Poor venous access">Poor venous access</option>
                                    <option value="other - comment">other - comment</option>
                                </SearchableSelectField>
                            </div>
                        </div>

                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-md btn-success float-right mr-3 mb-3 ">Record</button>
                    </div>

                    <!-- php: = $this->Form->end() -->

                </div>
            </div>

        </div>
    </div>


</div>



<script type="text/javascript">
    function runLogic() {
        getSheetAnalysis()
        $('input[type=radio][name=pain_assessment]').on('change', function() {
            switch ($(this).val()) {
                case 'nps':
                    $("#nps_pain_assessment_score").show()
                    $("#wong_backer_pain_assessment_score").hide()
                    $('#nps_pain_score').removeAttr('disabled')
                    $('#wong_pain_score'). attr('disabled','disabled');
                    break;
                case 'wong-backer':
                    $("#nps_pain_assessment_score").hide()
                    $("#wong_backer_pain_assessment_score").show()
                    $('#nps_pain_score'). attr('disabled','disabled');
                    $('#wong_pain_score').removeAttr('disabled')
                    break;
            }
        });

        $('#vitalsForm').submit(function(event) {
            event.preventDefault()
            let next_sheet = $('#vitalFlowSheetModal_next').val();
            let request_flow_sheet_id = $('#vitalFlowSheetModal_sheet_id').val();

            submitFlowSheetForm(\`<!-- php: = $this->Url->build(['controller' => 'patientVisitFlowSheetVitals', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetVitalsFlowSheetForm);

            $('#vitalFlowSheetModal').modal('hide');
        
            return false;
        });
    
        $('#adlsForm').submit(function(event) {
            event.preventDefault()
            let next_sheet = $('#adlFlowSheetModal_next').val();
            let request_flow_sheet_id = $('#adlFlowSheetModal_sheet_id').val();

            submitFlowSheetForm(\`<!-- php: = $this->Url->build(['controller' => 'patientVisitFlowSheetAdls', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetAdlsFlowSheetForm);
    
            $('#adlFlowSheetModal').modal('hide');
    
            return false;
        });
    
        //Submit Vitals Form 
        $('#pcasForm').submit(function(event) {
            event.preventDefault()
            if (confirm('Are you sure you want to submit')) {
                let next_sheet = $('#pcaFlowSheetModal_next').val();
                let request_flow_sheet_id = $('#pcaFlowSheetModal_sheet_id').val();

                submitFlowSheetForm(\`<!-- php: = $this->Url->build(['controller' => 'patientVisitFlowSheetPcas', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetPcasFlowSheetForm);
            }
    
            return false;
        });
        $('#intakeOutputForm').submit(function(event) {
            event.preventDefault()
            if (confirm('Are you sure you want to submit')) {
                let next_sheet = $('#intakeOutputFlowSheetModal_next').val();
                let request_flow_sheet_id = $('#intakeOutputFlowSheetModal_sheet_id').val();

                submitFlowSheetForm(\`<!-- php: = $this->Url->build(['controller' => 'patientVisitFlowSheetIntakeOutputs', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetIntakeOutputsFlowSheetForm);

            }
    
            return false;
        });
            //Submit Vitals Form 
        $('#dailyCareForm').submit(function(event) {
            event.preventDefault()
            if (confirm('Are you sure you want to submit')) {
                let next_sheet = $('#dailyCareSheetModal_next').val();
                let request_flow_sheet_id = $('#dailyCareSheetModal_sheet_id').val();

                submitFlowSheetForm(\`<!-- php: = $this->Url->build(['controller' => 'patientVisitFlowSheetDailyCares', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetIntakeOutputsFlowSheetForm);
            }
    
            return false;
        });
        //Submit Vitals Form 
        $('#strokeScoreForm').submit(function(event) {
            event.preventDefault()
            if (confirm('Are you sure you want to submit')) {
                let next_sheet = $('#strokeFlowSheetModal_next').val();
                let request_flow_sheet_id = $('#strokeFlowSheetModal_sheet_id').val();

                submitFlowSheetForm(\`<!-- php: = $this->Url->build(['controller' => 'patientVisitFlowSheetStrokeScores', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetStrokeScoresFlowSheetForm);
            }
    
            return false;
        });
        // $('#contInfusionIVForm').submit(function() {
    
        //     if (confirm('Are you sure you want to submit')) {
        //         let next = ;
        //         let request_flow_sheet_id = ;
        //         submitFlowSheetForm(\`<!-- php: // $this->Url->build(['controller' => 'PatientVisitFlowSheetInfusions', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetStrokeScoresFlowSheetForm);
        //     }
    
        //     return false;
        // });
        $('#contInfusionIVForm').submit(function(event) {
            event.preventDefault()
            if (confirm('Are you sure you want to submit')) {
                // console.log($(this).serializeArray());
                let next_sheet = $('#contInfusionSheetModal_next').val();
                let request_flow_sheet_id = $('#contInfusionSheetModal_sheet_id').val();

                submitFlowSheetForm(\`<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetInfusions', 'action' => 'update']) -->/\${request_flow_sheet_id}/\${next_sheet}\`, $(this).serialize(), resetStrokeScoresFlowSheetForm);
            }
    
            return false;
        });
        /****************************GLOBAL*************************/
        // console.log('Document is ready...');
        // save tab in local storage
        $('#flowSheet_tabs a[data-toggle="tab"]').on('shown.bs.tab', function() {
            localStorage.setItem('flowSheet_lastTab', $(this).attr('href'));
            triggerActiveTabClick($(this).attr('id'));
        });

        // display last tab if exist
        var flowSheet_lastTab = localStorage.getItem('flowSheet_lastTab');
        if (flowSheet_lastTab) {
            $('#flowSheet_tabs a[href=' + flowSheet_lastTab + ']').tab('show');
        } else {
            // Set the first tab if cookie do not exist
            $('#flowSheet_tabs a[data-toggle="tab"]:first').tab('show');
        }


        //Set Dates - Past
        mobiscroll.datepicker('.set_flow_sheet_date', {
            controls: ['calendar'],
            touchUi: true,
            dateFormat: 'YYYY-MM-DD',
            max: moment(new Date()).format("yyyy-mm-dd"),
            returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

        });

        //set Date - Future
        mobiscroll.datepicker('.set_flow_sheet_date_future', {
            controls: ['calendar'],
            touchUi: true,
            dateFormat: 'YYYY-MM-DD',
            min: moment(new Date()).format("yyyy-mm-dd"),
            returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

        })


        //set date time  
        mobiscroll.datepicker('.set_flow_sheet_dateTime', {
            controls: ['calendar', 'time'],
            touchUi: true,
            max: moment(new Date()).format("yyyy-mm-dd HH:mm"),
            returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

        });


        //set start date time - Future
        mobiscroll.datepicker('.set_flow_sheet_dateTime_future', {
            controls: ['calendar', 'time'],
            touchUi: true,
            dateFormat: 'DD MMM YYYY',
            min: moment(new Date()).format("yyyy-mm-dd HH:mm"),
            returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

        });






        /*****************************TRIGGERS***************************/
        //Other Heart Rate Source 
        $('#heart_rate_source').change(function() {
            if ($('#heart_rate_source option:selected').val() == 0) {
                $('#heart_rate_source').after('<input type="text" id="other_heart_rate_source" name="other_heart_rate_source" data-required="0" placeholder="Enter Heart Rate Source" class="form-control " />');
            } else {
                $('#other_heart_rate_source').remove();
            }
        });


        //other Bp location
        $('#bp_location').change(function() {
            if ($('#bp_location option:selected').val() == 0) {
                $('#bp_location').after('<input type="text" id="other_bp_location" name="other_bp_location" data-required="0" placeholder="Enter Bp location" class="form-control " />');
            } else {
                $('#other_bp_location').remove();
            }
        });


        //other Bp method
        $('#bp_method').change(function() {
            if ($('#bp_method option:selected').val() == 0) {
                $('#bp_method').after('<input type="text" id="other_bp_method" name="other_bp_method" data-required="0" placeholder="Enter Bp Method" class="form-control " />');
            } else {
                $('#other_bp_method').remove();
            }
        });


        //other Patient position
        $('#patient_position').change(function() {
            if ($('#patient_position option:selected').val() == 0) {
                $('#patient_position').after('<input type="text" id="other_patient_position" name="other_patient_position" data-required="0" placeholder="Enter Patient Position" class="form-control " />');
            } else {
                $('#other_patient_position').remove();
            }
        });


        //other Patient Activity
        $('#patient_activity').change(function() {
            if ($('#patient_activity option:selected').val() == 0) {
                $('#patient_activity').after('<input type="text" id="other_patient_activity" name="other_patient_activity" data-required="0" placeholder="Enter Patient Activity" class="form-control " />');
            } else {
                $('#other_patient_activity').remove();
            }
        });


        //other  02 delivery method
        $('#02_delivery_method').change(function() {
            if ($('#02_delivery_method option:selected').val() == 0) {
                $('#02_delivery_method').after('<input type="text" id="other_02_delivery_method" name="other_02_delivery_method" data-required="0" placeholder="Enter 02 Delivery Method" class="form-control " />');
            } else {
                $('#other_02_delivery_method').remove();
            }
        });


        //other  pain frequency
        $('#pain_frequency').change(function() {
            if ($('#pain_frequency option:selected').val() == 0) {
                $('#pain_frequency').after('<input type="text" id="other_pain_frequency" name="other_pain_frequency" data-required="0" placeholder="Enter Pain Frequency" class="form-control " />');
            } else {
                $('#other_pain_frequency').remove();
            }
        });


        //other  pain onset
        $('#clinical_progression').change(function() {
            if ($('#clinical_progression option:selected').val() == 0) {
                $('#clinical_progression').after('<input type="text" id="other_clinical_progression" name="other_clinical_progression" data-required="0" placeholder="Enter Clinical Progression" class="form-control " />');
            } else {
                $('#other_clinical_progression').remove();
            }
        });


        //other  pain intervention
        $('#pain_interventions').change(function() {
            if ($('#pain_interventions option:selected').val() == 0) {
                $('#pain_interventions').after('<input type="text" id="other_pain_interventions" name="other_pain_interventions" data-required="0" placeholder="Enter Pain Intervention" class="form-control " />');
            } else {
                $('#other_pain_interventions').remove();
            }
        });


        //other  urine colour
        $('#urine_colour').change(function() {
            if ($('#urine_colour option:selected').val() == 0) {
                $('#urine_colour').after('<input type="text" id="other_urine_colour" name="other_urine_colour" data-required="0" placeholder="Enter Urine Colour" class="form-control " />');
            } else {
                $('#other_urine_colour').remove();
            }
        });




        //other  urine appearance
        $('#urine_appearance').change(function() {
            if ($('#urine_appearance option:selected').val() == 0) {
                $('#urine_appearance').after('<input type="text" id="other_urine_appearance" name="other_urine_appearance" data-required="0" placeholder="Enter Urine Apperance" class="form-control " />');
            } else {
                $('#other_urine_appearance').remove();
            }
        });



        //other  urine odour
        $('#urine_odour').change(function() {
            if ($('#urine_odour option:selected').val() == 0) {
                $('#urine_odour').after('<input type="text" id="other_urine_odour" name="other_urine_odour" data-required="0" placeholder="Enter Urine Odour" class="form-control " />');
            } else {
                $('#other_urine_odour').remove();
            }
        });


        //other intermittent catheter type
        $('#intermittent_catheter_type').change(function() {
            if ($('#intermittent_catheter_type option:selected').val() == 0) {
                $('#intermittent_catheter_type').after('<input type="text" id="other_intermittent_catheter_type" name="other_intermittent_catheter_type" data-required="0" placeholder="Enter Intermittent Catheter Type" class="form-control " />');
            } else {
                $('#other_intermittent_catheter_type').remove();
            }
        });


        //other intermittent catheter patient tolerance
        $('#intermitten_catherization_patient_tolerance').change(function() {
            if ($('#intermitten_catherization_patient_tolerance option:selected').val() == 0) {
                $('#intermitten_catherization_patient_tolerance').after('<input type="text" id="other_intermitten_catherization_patient_tolerance" name="other_intermitten_catherization_patient_tolerance" data-required="0" placeholder="Enter Patient Tolerance" class="form-control " />');
            } else {
                $('#other_intermitten_catherization_patient_tolerance').remove();
            }
        });


        //other Stool amount
        $('#stool_amount').change(function() {
            if ($('#stool_amount option:selected').val() == 0) {
                $('#stool_amount').after('<input type="text" id="other_stool_amount" name="other_stool_amount" data-required="0" placeholder="Enter Stool Amount" class="form-control " />');
            } else {
                $('#other_stool_amount').remove();
            }
        });



        //other Stool amount
        $('#stool_apperance').change(function() {
            if ($('#stool_apperance option:selected').val() == 0) {
                $('#stool_apperance').after('<input type="text" id="other_stool_apperance" name="other_stool_apperance" data-required="0" placeholder="Enter Stool Apperance" class="form-control " />');
            } else {
                $('#other_stool_apperance').remove();
            }
        });



        //other Stool colour
        $('#stool_colour').change(function() {
            if ($('#stool_colour option:selected').val() == 0) {
                $('#stool_colour').after('<input type="text" id="other_stool_colour" name="other_stool_colour" data-required="0" placeholder="Enter Stool Colour" class="form-control " />');
            } else {
                $('#other_stool_colour').remove();
            }
        });



        //other emesis amount
        $('#emesis_amount').change(function() {
            if ($('#emesis_amount option:selected').val() == 0) {
                $('#emesis_amount').after('<input type="text" id="other_emesis_amount" name="other_emesis_amount" data-required="0" placeholder="Enter Emesis Amount" class="form-control " />');
            } else {
                $('#other_emesis_amount').remove();
            }
        });



        //other emesis amount
        $('#emesis_colour_appearance').change(function() {
            if ($('#emesis_colour_appearance option:selected').val() == 0) {
                $('#emesis_colour_appearance').after('<input type="text" id="other_emesis_colour_appearance" name="other_emesis_colour_appearance" data-required="0" placeholder="Enter Emesis Colour/Appearance" class="form-control " />');
            } else {
                $('#other_emesis_colour_appearance').remove();
            }
        });


        //other urine amount
        $('#urine_amount').change(function() {
            if ($('#urine_amount option:selected').val() == 0) {
                $('#urine_amount').after('<input type="text" id="other_urine_amount" name="other_urine_amount" data-required="0" placeholder="Enter Urine Amount" class="form-control " />');
            } else {
                $('#other_urine_amount').remove();
            }
        });

        //Scheduling Flow Sheet 
        $('#save_schedule_time_sheet').off().on('click', function() {
            //data 
            var data = {
                'start_date': $('#schedule_flow_sheet_start_date').val(),
                'end_date': $('#schedule_flow_sheet_end_date').val(),
                'flow_sheet_frequency_id': $('#schedule_flow_sheet_frequency').find(':selected').val(),
                'flow_sheet_type_id': $('#schedule_flow_sheet_type').find(':selected').val(),
                'notes': $('#schedule_flow_sheet_notes').val(),
                'bill': $('#schedule_flow_sheet_bill').find(':selected').val(),
                'scheduled_statuses': $(\`[name='sheet_status[]']\`).map(function(){return $(this).is(":checked");}).get(),
                'scheduled_dates': $(\`[name='sheet_date[]']\`).map(function(){return $(this).val();}).get(),
            }

            console.log(data);

            //post schedule Flow sheet 
            submitFlowSheetRequest('<!-- php: = $this->Url->build(['controller' => 'RequestFlowSheets', 'action' => 'add', $selectedVisit->id]) -->', data, resetScheduleFlowSheetForm)

            //check foe flow sheet type 
            // switch ($('#schedule_flow_sheet_type').val()) {
            //     case 'vitals':
            //         submitFlowSheetForm('<!-- php: // $this->Url->build(['controller' => 'patientVisitFlowSheetVitals', 'action' => 'add', $selectedVisit->id]) -->', data, resetScheduleFlowSheetForm);
            //         break;


            // }
        })

    }

    function flowSheetTab() {
        //Populate View flow sheet Table
        populateViewTable();
        // populateAnalyzeTable();
        getFlowSheetType();
        getFlowSheetFreq();
        runLogic();
    }


    function triggerActiveTabClick(active_tab_id) {
        // console.log(active_tab_id);
        $('#' + active_tab_id).trigger('click');
    }



    function setStrokeScoreText(id, input_id) {
        var text = $(\`#\${id}\`).find(':selected').text();

        //set text 
        $(\`#\${input_id}\`).val(text);
    }


    function showFilterDiv(id) {

        // console.log("selected filter:" + id)

        //Get element 
        const element = $(\`.\${id}\`);
        // console.log(element);

        if (element.hasClass('d-none')) {
            // console.log(\`\${id} has d-none\`);
            element.removeClass('d-none');
        }

        //hide siblings 
        element.siblings().each(function() {
            if (!$(this).hasClass('d-none')) {
                $(this).addClass('d-none');
            }
        })

    }

    function switchCurrentSheet(e) {
        switch (e.target.value) {
            case "vitals":
                getVitalsSheetResults()
                break;
            case "adls":
                getAdlsSheetResults()
                break;
            case "pca":
                getPcaSheetResults()
                break;
            case "continuousInfusion":
                getContinuousInfusionSheetResults()
                break;
            case "strokeSheet":
                getStrokeSheetResults()
                break;
            case "intakeOutput":
                getIOSheetResults()
                break;
            case "dailyCare":
                getDailyCareSheetResults()
                break;
        
            default:
                break;
        }
    }
    function getVitalsSheetResults() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetVitals', 'action' => 'index', $selectedVisit->id, ]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            let keys = [ 'date_created', 'temperature', 'temperature_source', 'heart_rate', 'heart_rate_source', 'respiratory_rate', 'systolic', 'diastolic', 'bp_location', 'bp_method', 'patient_position', 'etco2', 'spo2', 'pulse_type', 'patient_activity', 'oxygen_therapy', '02_delivery_method', 'fio2', 'flow_rate', 'height', 'height_method', 'weight', 'weight_method', 'estimated_dry_weight', 'dosage_weight', 'bmi_amputation_adjustment', 'bsa', 'bmi', 'notes', 'start', ]
            let row = []
            keys.forEach(key => {
                row.push(\`<tr><th scope="col"> \${key.split('_').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")} </th>\`)
                data.forEach(elem => {
                    // console.log(elem)
                    let value = ""
                    if(key == "date_created"){
                        value = moment(elem[key]).format("DD-MM-YY HH:mm")
                    } else {
                        value = elem[key]
                    }
                    row.push(\`<td>\${value}</td>\`)
                })
                row.push("</tr>")
            });
            $("#analyze_flow_sheet_table").html(row.join(""))



        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }
    function getAdlsSheetResults() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetAdls', 'action' => 'index', $selectedVisit->id,]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            let keys = [ 'date_created', 'has_eaten', 'help_with_eating', 'supervise_eating', 'help_with_eating_level', 'is_dressed', 'help_with_dressing', 'supervise_dressing', 'help_with_dressing_level', 'has_toilet', 'help_with_toilet', 'supervise_toilet', 'help_with_toilet_level', 'has_personal_hygiene', 'help_with_personal_hygiene', 'supervise_personal_hygiene', 'help_with_personal_hygiene_level', 'has_bath', 'help_with_bath', 'supervise_bath', 'help_with_bath_level', 'has_bed_mobility', 'help_with_bed_mobility', 'supervise_bed_mobility', 'help_with_bed_mobility_level', 'has_transfer', 'help_with_transfer', 'supervise_transfer', 'help_with_transfer_level', 'has_walked_in_room', 'help_with_walk_in_room', 'supervise_walk_in_room', 'help_with_walk_in_room_level', 'has_walk_in_hall', 'help_with_walk_in_hall', 'supervise_walk_in_hall', 'help_with_walk_in_hall_level', 'has_locomotive_on_unit', 'help_with_locomotive_on_unit', 'supervise_locomotive_on_unit', 'help_with_locomotive_on_unit_level', 'increased_independence_capability_by_patient', 'increased_independence_capability_by_staff', ]
            let row = []
            keys.forEach(key => {
                row.push(\`<tr><th scope="col"> \${key.split('_').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")} </th>\`)
                data.forEach(elem => {
                    // console.log(elem)
                    let value = ""
                    if(key == "date_created"){
                        value = moment(elem[key]).format("DD-MM-YY HH:mm")
                    } else {
                        value = elem[key]
                    }
                    row.push(\`<td>\${value}</td>\`)
                })
                row.push("</tr>")
            });
            $("#analyze_flow_sheet_table").html(row.join(""))
        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }
    function getPcaSheetResults() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetPcas', 'action' => 'index', $selectedVisit->id, ]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            let keys = [ 'date_created', 'pain_assessment', 'pain_score', 'pain_type', 'pain_location', 'pain_orientation', 'pain_radiating_towards', 'pain_descriptors', 'pain_frequency', 'pain_onset', 'clinical_progression', 'pain_effect_on_daily_activities', 'patient_pain_goal', 'pain_interventions', 'intervention_response', 'pain_sites_number', ]
            let row = []
            keys.forEach(key => {
                row.push(\`<tr><th scope="col"> \${key.split('_').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")} </th>\`)
                data.forEach(elem => {
                    // console.log(elem)
                    let value = ""
                    if(key == "date_created"){
                        value = moment(elem[key]).format("DD-MM-YY HH:mm")
                    } else {
                        value = elem[key]
                    }
                    row.push(\`<td>\${value}</td>\`)
                })
                row.push("</tr>")
            });
            $("#analyze_flow_sheet_table").html(row.join(""))
        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }
    function getContinuousInfusionSheetResults() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetInfusions', 'action' => 'index', $selectedVisit->id, ]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            let keys = [ 'date_created', 'site_assessment', 'patient_sheet_number', 'dressing_type', 'line_status', 'dressing_status', 'dressing_intervention', 'dressing_change_due', 'reason_not_rotated', ]
            let row = []
            keys.forEach(key => {
                row.push(\`<tr><th scope="col"> \${key.split('_').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")} </th>\`)
                data.forEach(elem => {
                    // console.log(elem)
                    let value = ""
                    if(key == "date_created" || key == "dressing_change_due"){
                        value = moment(elem[key]).format("DD-MM-YY HH:mm")
                    } else {
                        value = elem[key]
                    }
                    row.push(\`<td>\${value}</td>\`)
                })
                row.push("</tr>")
            });
            $("#analyze_flow_sheet_table").html(row.join(""))
        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }
    function getStrokeSheetResults() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetStrokeScores', 'action' => 'index', $selectedVisit->id, ]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            let keys = [ 'date_created', 'level_of_consciousness', 'level_of_consciousness_questions', 'level_of_consciousness_commands', 'best_gaze', 'visual', 'facial_palsy', 'motor_left_arm', 'motor_right_arm', 'motor_left_leg', 'motor_right_leg', 'limb_ataxia', 'sensory', 'best_language', 'dysarthria', 'extinction_inattention', 'reassessment_score', ]
            let row = []
            let result = 0
            keys.forEach(key => {
                row.push(\`<tr><th scope="col"> \${key.split('_').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")} </th>\`)
                data.forEach(elem => {
                    // console.log(elem)
                    let value = ""
                    if(key == "date_created"){
                        value = moment(elem[key]).format("DD-MM-YY HH:mm")
                    } else {
                        value = elem[key]
                        console.log("This Value", value)
                        result += value == null ? 0 : parseInt(value)
                    }

                    if (key == 'reassessment_score') {
                        value = result
                    }
                    row.push(\`<td>\${value}</td>\`)
                })
                row.push("</tr>")
            });
            $("#analyze_flow_sheet_table").html(row.join(""))
        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }
    function getIOSheetResults() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetIntakeOutputs', 'action' => 'index', $selectedVisit->id, ]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            let keys = [ 'date_created', 'weight', 'patient_sheet_number', 'weight_method', 'dose_weight', 'bsa', 'po', 'percent_meals_eaten', 'iv', 'voided_urine', 'unmeasured_urine_occurrence', 'urinary_incontinence', 'urine_amount', 'urine_colour', 'urine_appearance', 'urine_odour', 'additional_urine_volume_rows', 'bladder_scan_volume', 'intermittent_catheter', 'post_void_catheter_residual', 'intermittent_catheter_type', 'intermittent_catheter_size', 'urine_returned', 'intermitten_catherization_patient_tolerance', 'unmeasured_stool_occurrence', 'stool', 'bowel_incontinence', 'stool_amount', 'stool_apperance', 'stool_colour', 'last_bm_date', 'emesis', 'unmeasured_emesis_occurrence', 'emesis_amount', 'emesis_colour_appearance', 'estimated_blood_loss', 'blood_specimen_collection', 'observations', 'dominant_hand' ]
            let row = []
            keys.forEach(key => {
                row.push(\`<tr><th scope="col"> \${key.split('_').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")} </th>\`)
                data.forEach(elem => {
                    // console.log(elem)
                    let value = ""
                    if(key == "date_created"){
                        value = moment(elem[key]).format("DD-MM-YY HH:mm")
                    } else {
                        value = elem[key]
                    }
                    row.push(\`<td>\${value}</td>\`)
                })
                row.push("</tr>")
            });
            $("#analyze_flow_sheet_table").html(row.join(""))
        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }
    function getDailyCareSheetResults() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheetDailyCares', 'action' => 'index', $selectedVisit->id, ]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            let keys = [ 'date_created', 'precautions', 'last_known_fall', 'mobility', 'medications', 'mental_status', 'toileting_needs', 'volume_electrolyte_status', 'sensory', 'behavior', 'fall_risk_total', 'toilet_hours_of_need', 'hourly_visual_checks', 'fall_armband_on', 'patient_sheet_number', 'room_door_open', 'gait_belt', 'alarm_on', 'activity', 'assistance_level_mobility', 'time_in_chair', 'assistive_device', 'ambulated_distance', 'repositioned', 'positioning_frequency', 'head_of_bed_elevated', 'heels', 'range_of_motion', 'anti_embolism_devices', 'anti_embolism_intervention', 'feeding', 'diet_type', 'appetite', 'fluid_restrictions', 'diet_supplements', 'hygiene', 'oral_care', 'incontinence_protective_devices', 'skin_care', 'assistance_level_hygeine', 'clothing_preferences', 'entertainment', 'entertainment_activities', 'entertainment_preferences' ]
            let row = []
            keys.forEach(key => {
                row.push(\`<tr><th scope="col"> \${key.split('_').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")} </th>\`)
                data.forEach(elem => {
                    // console.log(elem)
                    let value = ""
                    if(key == "date_created"){
                        value = moment(elem[key]).format("DD-MM-YY HH:mm")
                    } else {
                        value = elem[key]
                    }
                    row.push(\`<td>\${value}</td>\`)
                })
                row.push("</tr>")
            });
            $("#analyze_flow_sheet_table").html(row.join(""))
        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }


    function getFlowSheetType() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheet', 'action' => 'getFlowSheetTypes', ]) -->"

        }).done((data) => {

            //populate Flow sheet Types 
            populateSelect('schedule_flow_sheet_type', data);

        }).fail((data) => {

            console.log('Get Flow Sheet Types Fail');
            alertify.error("An error Occured");

        })
    }


    function getFlowSheetFreq() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheet', 'action' => 'getFlowSheetFrequency', ]) -->"

        }).done((data) => {
            // console.log('Get Flow Sheet Frequency Done');
            // console.log(data);

            //populate Flow sheet Types 
            populateSelect('schedule_flow_sheet_frequency', data);

        }).fail((data) => {

            console.log('Get Flow Sheet Frequency Fail');
            console.log(data);

        })

    }

    function populateSelect(id, data) {
        var select = $(\`#\${id}\`);
        $.each(data, function(key, value) {
            // console.log(value.id);
            select.append($("<option />").val(value.id).text(value.name));
        });
        select.selectpicker('refresh');
    }

    function populateNoIdSelect(id, data) {
        var select = $(\`#\${id}\`);
        select.html('');
        $.each(data, function(key, value) {
            select.append($("<option />").val(value.trim()).text(value.trim()));
        });
        select.selectpicker('refresh');
    }




    function populateAnalyzeTable() {
        $('#analyze_flow_sheet_table').DataTable().destroy();
        $('#analyze_flow_sheet_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": false,
            "ordering": false,
            "paging": false,
            // "ajax": "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheet', 'action' => 'analyzeFlowSheet', $patient->id, $selectedVisit->id, ]) -->",

            "ajax": {
                "url": "<!-- php: = $this->Url->build(['controller' => 'PatientVisitFlowSheet', 'action' => 'analyzeFlowSheet', $patient->id, $selectedVisit->id, ]) -->",
                "error": function(xhr, error, thrown) {
                    console.log('Error loading medication table');
                }
            }

        });
    }




    function populateViewTable() {
        $('#flowsheet_table').DataTable().destroy();
        $('#flowsheet_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": false,
            "ordering": false,
            "paging": false,
            "ajax": "<!-- php: = $this->Url->build(['controller' => 'RequestFlowSheets', 'action' => 'getFlowSheetRequests', $selectedVisit->id, ]) -->",
        });
    }


    function recordFlowSheet(id) {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'RequestFlowSheets', 'action' => 'get']) -->/\${id}\`
        }).done((data) => {
            // console.log('Record Flow sheet GET Done');
            // console.log(data);

            //Determine Flow Sheet Type and Display sheet 
            switch (data.flow_sheet_type_id) {
                case '1':
                    showVitalSheet(data.id, data.next_sheet)
                    break;
                case '2':
                    showAdlSheet(data.id, data.next_sheet);
                    break;
                case '3':
                    showPcaSheet(data.id, data.next_sheet);
                    break;
                case '4':
                    showDailyCareSheet(data.id, data.next_sheet);
                    break;
                case '5':
                    showIntakeOutputSheet(data.id, data.next_sheet);
                    break;
                case '6':
                    showStrokeScore(data.id, data.next_sheet);
                    break;
                case '7':
                    showContInfusionScore(data.id, data.next_sheet);
                    break;

            }

        }).fail((data) => {
            console.log('Record Flow sheet GET Fail');
            console.log(data);
        })



    }



    function showVitalSheet(request_flow_sheet_id, next_sheet) {
        //set sheet number 
        $('#vitalFlowSheetModal_next').val(next_sheet);
        $('#vitalFlowSheetModal_sheet_id').val(request_flow_sheet_id);
        $('#vitalFlowSheetModal_sheetNumber').text(next_sheet);
        //show vitals Flow sheet
        $('#vitalFlowSheetModal').modal('show');

        //Submit Vitals Form 
        
        
    }


    function showAdlSheet(request_flow_sheet_id, next_sheet) {
        //set sheet number 
        $('#adlFlowSheetModal_next').val(next_sheet);
        $('#adlFlowSheetModal_sheet_id').val(request_flow_sheet_id);
        $('#adlFlowSheetModal_sheetNumber').text(next_sheet);
        //show adlsFlow sheet
        $('#adlFlowSheetModal').modal('show');

        //Submit adls Form 
    }


    function showPcaSheet(request_flow_sheet_id, next_sheet) {
        //set sheet number 
        $('#pcaFlowSheetModal_next').val(next_sheet);
        $('#pcaFlowSheetModal_sheet_id').val(request_flow_sheet_id);
        $('#pcaFlowSheetModal_sheetNumber').text(next_sheet);
        //show vitals Flow sheet
        $('#pcaFlowSheetModal').modal('show');

        let pain_locations = ['groin', 'hand', 'head', 'hip', 'incision', 'jaw', 'knee', 'leg', 'arm', 'mediastinum', 'mouth', 'neck', 'nose', 'pelvis', 'ankle', 'breast', 'buttocks', 'chest', 'coccyx', 'back', 'ear', 'eye', 'elbow', 'face', 'foot', 'finger (comment which one)', 'generalised', 'perineum', 'penis', 'pretibial', 'rib cage', 'rectum', 'sacrum', 'sclora', 'shoulder', 'scrotum', 'sternum', 'tibia', 'throat', 'toe (comment which one)', 'teeth', 'umbilicus', 'vagina', 'wrist', 'other-comment - multi select']
        let pain_descriptors = ['aching', 'burning', 'cramping', 'crushing', 'discomfort', 'dull', 'headache', 'headache', 'heaviness', 'itching', 'jabbing', 'nagging', 'numbness', 'penetrating', 'pins and needles', 'pounding', 'pressure', 'radiating', 'sharp', 'shooting', 'sore', 'spasm', 'squeezing', 'stabbing', 'tender', 'throbbing', 'tightness', 'patient unable to describe', 'other - comment']
        let pain_frequencies = ['constant/continuous', 'rarely', 'once a week', 'several days a week', 'intermittent', 'other -comment']
        let pain_onset = ['awakened from sleep', 'gradual', 'sudden', 'unable to tell', 'unable to assess', 'other - comment']
        let clinical_progression = ['not changed', 'gradually worsening', 'gradually improving', 'rapidly worsening', 'rapidly improving', 'resolved', 'other - comment']
        let pain_intervention = ['medications (see MAR)', 'home medication', 'heat applied', 'cold applied', 'compression', 'repositioned', 'MD notified (comment)', 'acupressure', 'acupuncture', 'ambulation/increased activity', 'aromatherapy', 'back rub', 'cold pack', 'cutaneous stimulation', 'declines', 'distraction', 'elevated', 'emotional support', 'environmental changes', 'food', 'guided therapy', 'herbal therapy', 'massage', 'music', 'pet therapy', 'prayers', 'relaxation technique', 'rest', 'shower', 'sit bath', 'spiritual care consult', 'splinting', 'TENS. Therapeutic pressure', 'therapeutic touch', 'traction', 'tub bath', 'warm moist pack', 'warm pack', 'other -comment']
        let pain_orientation = ['right', 'left', 'anterior', 'distal', 'inner', 'lower', 'mid', 'outer', 'posterior', 'proximal', 'upper - multi select']

        populateNoIdSelect("pain_location_id", pain_locations)
        populateNoIdSelect("pain_descriptors_id", pain_descriptors)
        populateNoIdSelect("pain_frequencies_id", pain_frequencies)
        populateNoIdSelect("pain_onset_id", pain_onset)
        populateNoIdSelect("clinical_progression_id", clinical_progression)
        populateNoIdSelect("pain_intervention_id", pain_intervention)
        populateNoIdSelect("pain_orientation_id", pain_orientation)

    }


    function showIntakeOutputSheet(request_flow_sheet_id, next_sheet) {
        //set sheet number 
        $('#intakeOutputFlowSheetModal_next').val(next_sheet);
        $('#intakeOutputFlowSheetModal_sheet_id').val(request_flow_sheet_id);
        $('#intakeOutputFlowSheetModal_sheetNumber').text(next_sheet);
        //show vitals Flow sheet
        let weight_method = ['standing scale', 'bed scale', 'Hoyer scale', 'chair scale', 'infant scale', 'stated', 'estimated']
        let percent_meals = ['0', '25', '33', '50', '66', '75', '100', 'other -comment']
        let urine_amount = ['small', 'medium', 'large', 'unable to assess', 'other - comment']
        let urine_colour = ['yellow/straw', 'amber', 'brown', 'colourless', 'red', 'blue', 'orange', 'pink', 'tea coloured', 'unable to assess', 'other - comment']
        let urine_appearance = ['clear', 'cloudy', 'hazy', 'sediment', 'blood clots', 'mucous', 'virulent', 'red flecks', 'stones', 'unable to assess', 'other - comment']
        let urine_odour = ['ammonia', 'fecal', 'fruity', 'no odour', 'malodorous', 'unable to assess', 'other - comment']
        let additional_urine_volume_rows = ['bladder scan', 'intermittent straight catheter', 'post void residual']
        let catheter_type = ['latex', 'non-latex', 'straight', 'code', 'other -comment']
        let catheter_size = ['5', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28']
        let tolerated_catherization = ['tolerated well', 'tolerated fairly well', 'tolerated poorly', 'unable to assess', 'other - comment']
        let stool_amount = ['smear', 'small', 'medium', 'large', 'unable to assess', 'other - comment']
        let stool_appearance = ['formed', 'loose', 'soft', 'hard', 'bloody', 'mucous', 'seedy', 'watery', 'tarry', 'steatorrhea', 'coffee ground', 'unable to assess', 'other - comment']
        let stool_color  = ['black', 'brown', 'clay', 'green', 'meconium', 'red', 'red streaks', 'tan', 'yellow', 'unable to assess', 'other - comment']
        let emesis_amount = ['small', 'medium', 'large', 'unable to assess', 'other - comment']
        let emesis_appearance = ['bilious', 'black', 'blood clots', 'blood-tinged', 'bloody', 'brown', 'coffee ground', 'clear', 'mucous', 'red', 'tan', 'undigested food', 'yellow', 'other - comment']


        populateNoIdSelect("weight_method_id", weight_method)
        populateNoIdSelect("percent_meals_eaten_id", percent_meals)
        populateNoIdSelect("urine_amount_id", urine_amount)
        populateNoIdSelect("urine_colour_id", urine_colour)
        populateNoIdSelect("urine_appearance_id", urine_appearance)
        populateNoIdSelect("urine_odour_id", urine_odour)
        populateNoIdSelect("additional_urine_volume_rows_id", additional_urine_volume_rows)
        populateNoIdSelect("catheter_type_id", catheter_type)
        populateNoIdSelect("catheter_size_id", catheter_size)
        populateNoIdSelect("tolerated_catherization_id", tolerated_catherization)
        populateNoIdSelect("stool_amount_id", stool_amount)
        populateNoIdSelect("stool_appearance_id", stool_appearance)
        populateNoIdSelect("stool_color_id", stool_color)
        populateNoIdSelect("emesis_amount_id", emesis_amount)
        populateNoIdSelect("emesis_appearance_id", emesis_appearance)


        $('#intakeOutputFlowSheetModal').modal('show');


    }

    function showDailyCareSheet(request_flow_sheet_id, next_sheet) {
        //set sheet number 
        $('#dailyCareFlowSheetModal_next').val(next_sheet);
        $('#dailyCareFlowSheetModal_sheet_id').val(request_flow_sheet_id);
        $('#dailyCareSheetModal_sheetNumber').text(next_sheet);
        $('#dailyCareSheetModal_next').val(next_sheet);
        $('#dailyCareSheetModal_sheet_id').val(request_flow_sheet_id);


        let precautions = ['none', 'aspiration', 'fall risk', 'seizure', 'suicide', 'bleeding', 'elopement', 'pica', 'neutropenic', 'spinal', 'sternal', 'total knee', 'total hip', 'victim of violence', 'other -comment.']
        //show vitals Flow sheet
        populateNoIdSelect("daily_care_precautions_id", precautions)
        
        $('#dailyCareFlowSheetModal').modal('show');
    }

    function showStrokeScore(request_flow_sheet_id, next_sheet) {
        //set sheet number 
        $('#strokeFlowSheetModal_next').val(next_sheet);
        $('#strokeFlowSheetModal_sheet_id').val(request_flow_sheet_id);
        $('#strokeFlowSheetModal_sheetNumber').text(next_sheet);
        //show vitals Flow sheet
        $('#strokeFlowSheetModal').modal('show');


    }

    function showContInfusionScore(request_flow_sheet_id, next_sheet) {
        //set sheet number 
        $('#contInfusionSheetModal_next').val(next_sheet);
        $('#contInfusionSheetModal_sheet_id').val(request_flow_sheet_id);
        $('#contInfusionSheetModal_sheetNumber').text(next_sheet);
        //show vitals Flow sheet
        $('#contInfusionSheetModal').modal('show');

        //Submit Vitals Form 
    }




    function submitFlowSheetForm(url, data, resetCallback) {
        //ajax 
        $.ajax({
            type: "POST",
            url: url,
            data: data
        }).done((data, textstatus, xhr) => {

            if (xhr.status == 200) {
                alertify.success(data);

                

                //Reload Table
                populateViewTable();




                //Rest Form
                resetCallback()


            } else {
                alertify.error(data);
            }

        }).fail((data) => {
            console.log("Failed save flow sheet")
            console.log(data)

            alertify.error('Internal Server Error');
        })


    }



    function submitFlowSheetRequest(url, data, resetCallback) {
        //ajax 
        $.ajax({
            type: "POST",
            url: url,
            data: data
        }).done((data, textstatus, xhr) => {

            if (xhr.status == 200) {
                alertify.success(data);

                //Reload Table
                populateViewTable();



                //Rest Form
                resetCallback()


            } else {
                alertify.error(data);
            }

        }).fail((data) => {
            console.log("Failed save flow sheet Request")
            console.log(data)

            alertify.error('Internal Server Error');
        })


    }

    function resetVitalsFlowSheetForm() {
        //Loop for inputs
        $('#vitalsForm').find('input').each(function() {
            $(this).val("");
        });



        //Loop for selects
        $('#vitalsForm').find('select').each(function() {
            $(this).val('').selectpicker('refresh');
        });
    }


    function resetAdlsFlowSheetForm() {
        //Loop for inputs
        $('#adlsForm').find('input').each(function() {
            $(this).val("");
        });



        //Loop for selects
        $('#adlsForm').find('select').each(function() {
            $(this).val('').selectpicker('refresh');
        });

    }




    function resetPcasFlowSheetForm() {
        //Loop for inputs
        $('#pcasForm').find('input').each(function() {
            $(this).val("");
        });



        //Loop for selects
        $('#pcasForm').find('select').each(function() {
            $(this).val('').selectpicker('refresh');
        });

    }



    function resetIntakeOutputsFlowSheetForm() {
        //Loop for inputs
        $('#intakeForm').find('input').each(function() {
            $(this).val("");
        });



        //Loop for selects
        $('#intakeForm').find('select').each(function() {
            $(this).val('').selectpicker('refresh');
        });
    }

    function resetStrokeScoresFlowSheetForm() {
        //Loop for inputs
        $('#strokeForm').find('input').each(function() {
            $(this).val("");
        });



        //Loop for selects
        $('#strokeForm').find('select').each(function() {
            $(this).val('').selectpicker('refresh');
        });

    }


    function resetScheduleFlowSheetForm() {
        //Loop for inputs
        $('#scheduleForm').find('input').each(function() {
            $(this).val("");
        });



        //Loop for selects
        $('#scheduleForm').find('select').each(function() {
            $(this).val('').selectpicker('refresh');
        });

    }

    function setUpNewSheetSchedule() {
        let freq_type = parseInt($('#schedule_flow_sheet_frequency').find(':selected').val());
        let interval;
        switch (freq_type) {
            case 1:
                interval = 2;
                break;
            case 2:
                interval = 3;
                break;
            case 3:
                interval = 4;
                break;
            case 4:
                interval = 6;
                break;
            case 5:
                interval = 8;
                break;
            case 6:
                interval = 12;
                break;
            case 7:
                interval = 24;
                break;
        
            default:
                break;
        }
        let start_date = moment($('#schedule_flow_sheet_start_date').val());
        let end_date = moment($('#schedule_flow_sheet_end_date').val());
        let count = 0;
        let result = [];
        if ($('#schedule_flow_sheet_frequency').find(':selected').val() != '' && $('#schedule_flow_sheet_start_date').val() != '' && $('#schedule_flow_sheet_end_date').val() != '') {
            console.log("I came here too please");
            while (!start_date.isAfter(end_date)) {
                let newAdd = count == 0 ? 0 : interval;
                let date_result = start_date.add(newAdd, 'hours').format("YYYY-MM-DD HH:mm")
                if (start_date.isAfter(end_date)) {
                    break;
                }
                result.push(\`
                    <label class="h5"> Sheet \${count + 1}</label>
                    <div class="form-inline ml-1">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="sheet_status[]" value="1" checked>
                            <label class="form-check-label" for="inlineRadio2">On </label>
                            <div class="form-row">
                                <div class="form-group ml-3">
                                    <input class="mobiTimePicker" class="form-control  w-100 d-none" name="sheet_date[]" value="\${date_result}"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                \`)
                count += 1;
            }
            $('#suggested_sheet_dates').html(result.join(""))
            mobiscroll.datepicker('.mobiTimePicker', {
                controls: ['datetime'],
                // defaultSelection: new Date(2020, 11, 24)
                touchUi: true,
                theme: 'ios',
                themeVariant: 'light',
                dateFormat: 'YYYY-MM-DD',
                returnFormat: 'moment',
            });
        }
    }

    function getSheetAnalysis() {
        $.ajax({
            type: "GET",
            url: "<!-- php: = $this->Url->build(['controller' => 'RequestFlowSheets', 'action' => 'allVisitFlowSheets', $selectedVisit->id,]) -->"

        }).done((data) => {

            $("#scheduled_sheet_count").text(data.scheduled)
            $("#completed_sheet_count").text(data.completed)
            // $("#vital_sheet_count").text(data.)
            $("#all_sheet_count").text(data.all)



        }).fail((data) => {

            alertify.error("An error Occured");

        })
    }
</script>
`;

export default function ElementElementPatientvisitFlowsheet() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
