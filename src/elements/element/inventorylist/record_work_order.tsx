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
    width: 20%!important;
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

</style>
<div class="row">

    <div class="borderBox light bordered col-md-12">
       
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="create_invoice">
                    <!-- <h4>Add a new Invoice</h4> -->

                    <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container-fluid text-center p-3 mt-3 mb-2">
                                <div class="card px-5 pt-4 pb-0 mt-1 mb-3">
                                    <!-- <form id="msform"> -->
                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'InventoryList', 'action' => 'storeWorkOrderData'],'id' =>'msform','novalidate', 'type' => 'file']); -->

                                    <ul id="progressbar">
                                        <li class="active" id="personal"><strong>Equipment Overview </strong></li>
                                        <li id="file"><strong>Qualitative Tests</strong></li>
                                        <li id="file"><strong>Quantitative Tests</strong></li>
                                        <li id="file"><strong>PM Checks</strong></li>
                                        <li id="file"><strong>Comments</strong></li>
                                    </ul>

                                    <fieldset>
                                        <div class="row mt-4">
                                            <div class="col-md-2 text-left">
                                                <h5>Equipment Name<span class="text-danger">*</span></h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <input type="text" readonly value="<!-- php: = $equip->equipment_management->name -->" name="name" class="form-control" />
                                                <input type="hidden" name="equipment_maintenance_id" value="<!-- php: = $equip->id -->"  />
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Model No. </h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <input readonly value="<!-- php: = $equip->equipment_management->model -->" id="model_no" name="model" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Manufacturer</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <input id="manufacturer" readonly value="<!-- php: = $equip->equipment_management->manufacturer -->" name="manufacturer" type="text"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Service Procedure</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="service_procedure" id="service_procedure"
                                                    class="form-control mb-1 input-height text-danger">
                                                    <option value="non-scheduled" <!-- php: = $order_data->service_procedure == 'non-scheduled' ? 'selected' : '' --> ><span class="text-danger">NON-SCHEDULED</span></option>
                                                    <option value="scheduled" <!-- php: = $order_data->service_procedure == 'scheduled' ? 'selected' : '' --> ><span class="text-danger">SCHEDULED</span></option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Inspector(s)</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="d-flex align-items-center justify-content-between flex-wrap" id="extra_inspects">
                                                    
                                                    <!-- php: if (!isset($order_data->inspectors)): echo '<input type="text" name="inspectors[]" class="form-control">'; else: foreach (explode("||", $order_data->inspectors) as $key => $value): echo '<input type="text" name="inspectors[]" class="form-co... -->
                                                        
                                                    <!-- php:  -->

                                                </div>
                                                <h5 onclick="addExtraInspectors()" style="cursor:pointer"
                                                    class="text-primary ml-3">
                                                    <i class="fa fa-plus"></i>&nbsp;
                                                    Add Inspector
                                                </h5>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>WO Status</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="wo_status" id="wo_status"
                                                    class="form-control mb-1 input-height text-danger">
                                                    <option value="In Progress" <!-- php: = $order_data->wo_status == 'In Progress' ? 'selected' : '' --> ><span class="text-danger">REPAIR IN PROGRESS</span></option>
                                                    <option value="Completed" <!-- php: = $order_data->wo_status == 'Completed' ? 'selected' : '' --> ><span class="text-danger">REPAIR COMPLETED</span></option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Down Time & Service Time</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input name="down_time" placeholder="Down Time" value="<!-- php: = $order_data->down_time -->" type="datetime-local"
                                                            class="w-100 form-control text-danger" />
                                                    </div>
                                                    <div class="col-md-6">
                                                    <input name="service_time" placeholder="Service Time" value="<!-- php: = $order_data->service_time -->" type="datetime-local"
                                                            class="w-100 form-control text-danger" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Started & Finished</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input value="<!-- php: = $order_data->started -->" readonly name="started" placeholder="Started" type="datetime-local"
                                                            class="w-100 form-control text-danger" />
                                                    </div>
                                                    <div class="col-md-6">
                                                    <input readonly value="<!-- php: = $order_data->finished -->" name="finished" placeholder="Finished" type="datetime-local"
                                                            class="w-100 form-control text-danger" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Fail Mode</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="fail_mode" id="fail_mode"
                                                    class="form-control mb-1 input-height text-danger">
                                                    <option <!-- php: = $order_data->fail_mode == 'Component Failure' ? 'selected' : '' -->  value="Component Failure"><span class="text-danger">Component Failure</span></option>
                                                    <option <!-- php: = $order_data->fail_mode == 'Full Failure' ? 'selected' : '' -->  value="Full Failure"><span class="text-danger">Full Failure</span></option>
                                                    <option <!-- php: = $order_data->fail_mode == 'Partial Failure' ? 'selected' : '' -->  value="Partial Failure"><span class="text-danger">Partial Failure</span></option>
                                                    <option <!-- php: = $order_data->fail_mode == 'Intermittent Failure' ? 'selected' : '' -->  value="Intermittent Failure"><span class="text-danger">Intermittent Failure</span></option>
                                                    <option <!-- php: = $order_data->fail_mode == 'Degraded Failure' ? 'selected' : '' -->  value="Degraded Failure"><span class="text-danger">Degraded Failure</span></option>
                                                    <option <!-- php: = $order_data->fail_mode == 'Unintentional Failure' ? 'selected' : '' -->  value="Unintentional Failure"><span class="text-danger">Unintentional Failure</span></option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>


                                        <input style="width:auto;" type="button" id="next1" name="next"
                                            class="next action-button btn btn-primary" value="Next - Qualitative Tests" />
                                        <input style="width:auto;" type="submit" id="" name="draft"
                                            class="action-button btn btn-info mr-1" value="Draft" />
                                    </fieldset>

                                    <fieldset>
                                       <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style="width:10%;">P  F  N</th>
                                                    <th style="width:3%;">#</th>
                                                    <th>Qualitative Tests</th>
                                                    <th>Comments</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="chassis" id="chassis" <!-- php: = $order_data->chassis == 'p' ? 'checked' : '' -->
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="chassis" id="chassis" <!-- php: = $order_data->chassis == 'f' ? 'checked' : '' -->
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="chassis" id="chassis" <!-- php: = $order_data->chassis == 'n' ? 'checked' : '' -->
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>1</td>
                                                    <td>Chassis/Housing</td>
                                                    <td><input type="text" name="chassis_comments" value="<!-- php: = $order_data->chassis -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->mount == 'p' ? 'checked' : '' -->
                                                                name="mount" id="mount"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->mount == 'f' ? 'checked' : '' -->
                                                                name="mount" id="mount"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->mount == 'n' ? 'checked' : '' -->
                                                                name="mount" id="mount"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>2</td>
                                                    <td>Mount</td>
                                                    <td><input type="text" name="mount_comments" value="<!-- php: = $order_data->mount_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="casters_brakes" id="casters_brakes" <!-- php: = $order_data->casters_brakes == 'p' ? 'checked' : '' -->
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="casters_brakes" id="casters_brakes" <!-- php: = $order_data->casters_brakes == 'f' ? 'checked' : '' -->
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio"
                                                                name="casters_brakes" id="casters_brakes" <!-- php: = $order_data->casters_brakes == 'n' ? 'checked' : '' -->
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>3</td>
                                                    <td>Casters/Brakes</td>
                                                    <td><input type="text" name="caster_comments" value="<!-- php: = $order_data->caster_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->ac_plug == 'p' ? 'checked' : '' -->
                                                                name="ac_plug" id="ac_plug"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->ac_plug == 'f' ? 'checked' : '' -->
                                                                name="ac_plug" id="ac_plug"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->ac_plug == 'n' ? 'checked' : '' -->
                                                                name="ac_plug" id=""
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>4</td>
                                                    <td>AC Plug/Receptacles</td>
                                                    <td><input type="text" name="ac_comments" value="<!-- php: = $order_data->ac_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->line_cord == 'p' ? 'checked' : '' -->
                                                                name="line_cord" id="line_cord"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->line_cord == 'f' ? 'checked' : '' -->
                                                                name="line_cord" id="line_cord"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->line_cord == 'n' ? 'checked' : '' -->
                                                                name="line_cord" id="line_cord"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>5</td>
                                                    <td>Line Cord</td>
                                                    <td><input type="text" name="linecomments" value="<!-- php: = $order_data->linecomments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->strain_relief == 'p' ? 'checked' : '' -->
                                                                name="strain_relief" id="strain_relief"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->strain_relief == 'f' ? 'checked' : '' -->
                                                                name="strain_relief" id="strain_relief"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->strain_relief == 'n' ? 'checked' : '' -->
                                                                name="strain_relief" id="strain_relief"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>6</td>
                                                    <td>Stain Reliefs</td>
                                                    <td><input type="text" name="strain_comments" value="<!-- php: = $order_data->strain_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->circuit_breaker == 'p' ? 'checked' : '' -->
                                                                name="circuit_breaker" id="circuit_breaker"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->circuit_breaker == 'f' ? 'checked' : '' -->
                                                                name="circuit_breaker" id="circuit_breaker"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->circuit_breaker == 'n' ? 'checked' : '' -->
                                                                name="circuit_breaker" id="circuit_breaker"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>7</td>
                                                    <td>Circuit Breaker/Fuse</td>
                                                    <td><input type="text" name="circuit_breaker_comments" value="<!-- php: = $order_data->circuit_breaker_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->cables == 'p' ? 'checked' : '' -->
                                                                name="cables" id="cables"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->cables == 'f' ? 'checked' : '' -->
                                                                name="cables" id="cables"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->cables == 'n' ? 'checked' : '' -->
                                                                name="cables" id="cables"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>8</td>
                                                    <td>Cables</td>
                                                    <td><input type="text" name="cables_comments" value="<!-- php: = $order_data->cables_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->fitting == 'p' ? 'checked' : '' -->
                                                                name="fitting" id="fitting"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->fitting == 'f' ? 'checked' : '' -->
                                                                name="fitting" id="fitting"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->fitting == 'n' ? 'checked' : '' -->
                                                                name="fitting" id="fitting"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>9</td>
                                                    <td>Fittings/Connectors</td>
                                                    <td><input type="text" name="fitting_comments" value="<!-- php: = $order_data->fitting_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->controls == 'p' ? 'checked' : '' -->
                                                                name="controls" id="controls"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->controls == 'f' ? 'checked' : '' -->
                                                                name="controls" id="controls"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->controls == 'n' ? 'checked' : '' -->
                                                                name="controls" id="controls"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>10</td>
                                                    <td>Controls/Switches</td>
                                                    <td><input type="text" name="controls_comments" value="<!-- php: = $order_data->controls_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->battery == 'p' ? 'checked' : '' -->
                                                                name="battery" id="battery"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->battery == 'f' ? 'checked' : '' -->
                                                                name="battery" id="battery"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->battery == 'n' ? 'checked' : '' -->
                                                                name="battery" id="battery"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>11</td>
                                                    <td>Battery/Charger</td>
                                                    <td><input type="text" name="battery_comments" value="<!-- php: = $order_data->battery_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->indicators == 'p' ? 'checked' : '' -->
                                                                name="indicators" id="indicators"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->indicators == 'f' ? 'checked' : '' -->
                                                                name="indicators" id="indicators"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->indicators == 'n' ? 'checked' : '' -->
                                                                name="indicators" id="indicators"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>12</td>
                                                    <td>Indicators/Displays</td>
                                                    <td><input type="text" name="indicators_comments" value="<!-- php: = $order_data->indicators_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->alarms == 'p' ? 'checked' : '' -->
                                                                name="alarms" id="alarms"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->alarms == 'f' ? 'checked' : '' -->
                                                                name="alarms" id="alarms"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->alarms == 'n' ? 'checked' : '' -->
                                                                name="alarms" id="alarms"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>13</td>
                                                    <td>Alarms</td>
                                                    <td><input type="text" name="alarms_comments" value="<!-- php: = $order_data->alarms_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->audible == 'p' ? 'checked' : '' -->
                                                                name="audible" id="audible"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->audible == 'f' ? 'checked' : '' -->
                                                                name="audible" id="audible"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->audible == 'n' ? 'checked' : '' -->
                                                                name="audible" id="audible"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>14</td>
                                                    <td>Audible Signals</td>
                                                    <td><input type="text" name="audible_comments" value="<!-- php: = $order_data->audible_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->labeling == 'p' ? 'checked' : '' -->
                                                                name="labeling" id="labeling"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->labeling == 'f' ? 'checked' : '' -->
                                                                name="labeling" id="labeling"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->labeling == 'n' ? 'checked' : '' -->
                                                                name="labeling" id="labeling"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>15</td>
                                                    <td>Labeling</td>
                                                    <td><input type="text" name="labeling_comments" value="<!-- php: = $order_data->labeling_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->acessories == 'p' ? 'checked' : '' -->
                                                                name="acessories" id="acessories"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->acessories == 'f' ? 'checked' : '' -->
                                                                name="acessories" id="acessories"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->acessories == 'n' ? 'checked' : '' -->
                                                                name="acessories" id="acessories"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>16</td>
                                                    <td>Casters/Brakes</td>
                                                    <td><input type="text" name="acessories_comments" value="<!-- php: = $order_data->acessories_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->flow_stop == 'p' ? 'checked' : '' -->
                                                                name="flow_stop" id="flow_stop"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->flow_stop == 'f' ? 'checked' : '' -->
                                                                name="flow_stop" id="flow_stop"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->flow_stop == 'n' ? 'checked' : '' -->
                                                                name="flow_stop" id="flow_stop"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>17</td>
                                                    <td>Flow-Stop Mechanism</td>
                                                    <td><input type="text" name="flow_stop_comments" value="<!-- php: = $order_data->flow_stop_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->lookout_interval == 'p' ? 'checked' : '' -->
                                                                name="lookout_interval" id="lookout_interval"
                                                                value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->lookout_interval == 'f' ? 'checked' : '' -->
                                                                name="lookout_interval" id="lookout_interval"
                                                                value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" <!-- php: = $order_data->lookout_interval == 'n' ? 'checked' : '' -->
                                                                name="lookout_interval" id="lookout_interval"
                                                                value="n">
                                                        </div>
                                                    </td>
                                                    <td>18</td>
                                                    <td>Lockout Interval (PCAs Only)</td>
                                                    <td><input type="text" name="lookout_interval_comments" value="<!-- php: = $order_data->lookout_interval_comments -->" class="form-control w-100"></td>
                                                </tr>

                                               

                                            </tbody>
                                        </table>
                                       </div>

                                        <input type="button" id="" name="next" style="width:auto"
                                            class="next action-button btn btn-primary"
                                            value="Next - Quantitative Tests" />
                                        <input type="button" name="previous" style="width:auto"
                                            class="previous action-button-previous btn btn-secondary"
                                            value="Previous - Equipment Overview" />
                                        <input style="width:auto;" type="submit" id="" name="draft"
                                            class="action-button btn btn-info mr-1" value="Draft" />
                                    </fieldset>

                                    <fieldset>
                                        <div class="table-responsive">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style="width:10%;">P F N</th>
                                                        <th style="width:3%;">#</th>
                                                        <th>Quantitative Tests</th>
                                                        <th></th>
                                                        <th>Comments</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                        <td>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_grounding == 'p' ? 'checked' : '' -->
                                                                    name="quantitative_grounding" id="quantitative_grounding"
                                                                    value="p">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_grounding == 'f' ? 'checked' : '' -->
                                                                    name="quantitative_grounding" id="quantitative_grounding"
                                                                    value="f">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_grounding == 'n' ? 'checked' : '' -->
                                                                    name="quantitative_grounding" id="quantitative_grounding"
                                                                    value="n">
                                                            </div>
                                                        </td>
                                                        <td>1</td>
                                                        <td>Grounding Resistance (mohm)</td>
                                                        <td><input type="text" name="mohm" value="<!-- php: = $order_data->mohm -->" class="form-control w-100"></td>
                                                        <td><input type="text" name="mohm_comments" value="<!-- php: = $order_data->mohm_comments -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                        <td>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_leakage == 'p' ? 'checked' : '' -->
                                                                    name="quantitative_leakage" id="quantitative_leakage"
                                                                    value="p">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_leakage == 'f' ? 'checked' : '' -->
                                                                    name="quantitative_leakage" id="quantitative_leakage"
                                                                    value="f">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_leakage == 'n' ? 'checked' : '' -->
                                                                    name="quantitative_leakage" id="quantitative_leakage"
                                                                    value="n">
                                                            </div>
                                                        </td>
                                                        <td>2</td>
                                                        <td colspan="3"><span class="font-weight-bold">Maximum Leakage Currents</span></td>
                                                        <!-- <td colspan="2"></td> -->
                                                        <!-- <td></td> -->
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Chassis (uA)</td>
                                                    <td><input type="text" name="quantitative_chassis" value="<!-- php: = $order_data->quantitative_chassis -->" class="form-control w-100"></td>
                                                    <td>
                                                    <div class="form-check form-check-inline">
                                                        <h6>Mode</h6>
                                                        <input class="form-check-input ml-3" type="radio" <!-- php: = $order_data->quantitative_mode == 'on' ? 'checked' : '' -->
                                                            name="quantitative_mode" id="quantitative_mode1" value="on">
                                                        <label class="form-check-label" for="quantitative_mode1">On</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_mode == 'off' ? 'checked' : '' -->
                                                            name="quantitative_mode" id="quantitative_mode2" value="off">
                                                        <label class="form-check-label" for="quantitative_mode2">Off</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_mode == 'normal' ? 'checked' : '' -->
                                                            name="quantitative_mode" id="quantitative_mode3" value="normal">
                                                        <label class="form-check-label" for="quantitative_mode3">Normal</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_mode == 'rev' ? 'checked' : '' -->
                                                            name="quantitative_mode" id="quantitative_mode4" value="rev">
                                                        <label class="form-check-label" for="quantitative_mode4">Rev</label>
                                                    </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Leads (uA)</td>
                                                    <td><input type="text" name="quantitative_leads" value="<!-- php: = $order_data->quantitative_leads -->" class="form-control w-100"></td>
                                                    <td>
                                                    <div class="form-check form-check-inline">
                                                        <h6>Mode</h6>
                                                        <input class="form-check-input ml-3" type="radio" <!-- php: = $order_data->quantitative_mode_leads == 'on' ? 'checked' : '' -->
                                                            name="quantitative_mode_leads" id="inlineRadio1" value="on">
                                                        <label class="form-check-label" for="inlineRadio1">On</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_mode_leads == 'off' ? 'checked' : '' -->
                                                            name="quantitative_mode_leads" id="inlineRadio2" value="off">
                                                        <label class="form-check-label" for="inlineRadio2">Off</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_mode_leads == 'normal' ? 'checked' : '' -->
                                                            name="quantitative_mode_leads" id="inlineRadio2" value="normal">
                                                        <label class="form-check-label" for="inlineRadio2">Normal</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_mode_leads == 'rev' ? 'checked' : '' -->
                                                            name="quantitative_mode_leads" id="inlineRadio2" value="rev">
                                                        <label class="form-check-label" for="inlineRadio2">Rev</label>
                                                    </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                        <td>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_accuracy == 'p' ? 'checked' : '' -->
                                                                    name="quantitative_accuracy" id="quantitative_accuracy"
                                                                    value="p">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_accuracy == 'f' ? 'checked' : '' -->
                                                                    name="quantitative_accuracy" id="quantitative_accuracy"
                                                                    value="f">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_accuracy == 'n' ? 'checked' : '' -->
                                                                    name="quantitative_accuracy" id="quantitative_accuracy"
                                                                    value="n">
                                                            </div>
                                                        </td>
                                                        <td>3</td>
                                                        <td colspan="3"><span class="font-weight-bold">Flow Rate Accuracy (%)</span></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Flow Setting 1</td>
                                                    <td><input type="text" name="flow_1_value" value="<!-- php: = $order_data->flow_1_value -->" class="form-control w-100"/></td>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col">
                                                                <input type="text" name="flow_1_Indicated" placeholder="Indicated" value="<!-- php: = $order_data->flow_1_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                            <div class="col">
                                                                <input type="text" name="flow_1_Actual" placeholder="Actual" value="<!-- php: = $order_data->flow_1_Actual -->" class="form-control w-100"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Flow Setting 2</td>
                                                    <td><input type="text" name="flow_2_value" value="<!-- php: = $order_data->flow_2_value -->" class="form-control w-100"/></td>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col">
                                                                <input type="text" name="flow_2_Indicated" placeholder="Indicated" value="<!-- php: = $order_data->flow_2_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                            <div class="col">
                                                                <input type="text" name="flow_2_Actual" placeholder="Actual" value="<!-- php: = $order_data->flow_2_Actual -->" class="form-control w-100"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Flow Setting 3</td>
                                                    <td><input type="text" name="flow_3_value" value="<!-- php: = $order_data->flow_3_value -->" class="form-control w-100"/></td>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col">
                                                                <input type="text" name="flow_3_Indicated" placeholder="Indicated" value="<!-- php: = $order_data->flow_3_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                            <div class="col">
                                                                <input type="text" name="flow_3_Actual" placeholder="Actual" value="<!-- php: = $order_data->flow_3_Actual -->" class="form-control w-100"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                        <td>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_occlussion_alarm == 'p' ? 'checked' : '' -->
                                                                    name="quantitative_occlussion_alarm" id="quantitative_occlussion_alarm"
                                                                    value="p">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_occlussion_alarm == 'f' ? 'checked' : '' -->
                                                                    name="quantitative_occlussion_alarm" id="quantitative_occlussion_alarm"
                                                                    value="f">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->quantitative_occlussion_alarm == 'n' ? 'checked' : '' -->
                                                                    name="quantitative_occlussion_alarm" id="quantitative_occlussion_alarm"
                                                                    value="n">
                                                            </div>
                                                        </td>
                                                        <td>4</td>
                                                        <td colspan="3"><span class="font-weight-bold">Occlussion Alarm</span></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Pressure Setting 1</td>
                                                    <td><input type="text" name="pressure_1_value" value="<!-- php: = $order_data->pressure_1_value -->" class="form-control w-100"/></td>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col">
                                                                <input type="text" name="pressure_1_Indicated" placeholder="Indicated" value="<!-- php: = $order_data->pressure_1_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                            <div class="col">
                                                                <input type="text" name="pressure_1_Actual" placeholder="Actual" value="<!-- php: = $order_data->pressure_1_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Pressure Setting 2</td>
                                                    <td><input type="text" name="pressure_2_value" value="<!-- php: = $order_data->pressure_2_value -->" class="form-control w-100"/></td>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col">
                                                                <input type="text" name="pressure_2_Indicated" placeholder="Indicated" value="<!-- php: = $order_data->pressure_2_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                            <div class="col">
                                                                <input type="text" name="pressure_2_Actual" placeholder="Actual" value="<!-- php: = $order_data->pressure_2_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Pressure Setting 3</td>
                                                    <td><input type="text" name="pressure_3_value" value="<!-- php: = $order_data->pressure_3_value -->" class="form-control w-100"/></td>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col">
                                                                <input type="text" name="pressure_3_Indicated" placeholder="Indicated" value="<!-- php: = $order_data->pressure_3_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                            <div class="col">
                                                                <input type="text" name="pressure_3_Actual" placeholder="Actual" value="<!-- php: = $order_data->pressure_3_Indicated -->" class="form-control w-100"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        


                                        <input type="button" name="next" id="next3" style="width:auto"
                                            class="next action-button btn btn-primary"
                                            value="Next - PM Checks " />
                                        <input type="button" style="width:auto" name="previous"
                                            class="previous btn btn-secondary action-button-previous"
                                            value="Previous - Qualitative Tests" />&nbsp;&nbsp;
                                        <input style="width:auto;" type="submit" id="" name="draft"
                                            class="action-button btn btn-info mr-1" value="Draft" />
                                    </fieldset>
                                    <fieldset>
                                        <div class="table-responsive">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style="width:10%;">P F N</th>
                                                        <th style="width:3%;">#</th>
                                                        <th>PM Checks</th>
                                                        <th>Comments</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                        <td>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_clean == 'p' ? 'checked' : '' -->
                                                                    name="pm_clean" id="pm_clean"
                                                                    value="p">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_clean == 'f' ? 'checked' : '' -->
                                                                    name="pm_clean" id="pm_clean"
                                                                    value="f">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_clean == 'n' ? 'checked' : '' -->
                                                                    name="pm_clean" id="pm_clean"
                                                                    value="n">
                                                            </div>
                                                        </td>
                                                        <td>1</td>
                                                        <td>Clean</td>
                                                        <td><input type="text" name="clean_comment" value="<!-- php: = $order_data->clean_comment -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                        <td>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_lubricate == 'p' ? 'checked' : '' -->
                                                                    name="pm_lubricate" id="pm_lubricate"
                                                                    value="p">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_lubricate == 'f' ? 'checked' : '' -->
                                                                    name="pm_lubricate" id="pm_lubricate"
                                                                    value="f">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_lubricate == 'n' ? 'checked' : '' -->
                                                                    name="pm_lubricate" id="pm_lubricate"
                                                                    value="n">
                                                            </div>
                                                        </td>
                                                        <td>2</td>
                                                        <td>Lubricate</td>
                                                        <td><input type="text" name="lubricate_comment" value="<!-- php: = $order_data->lubricate_comment -->" class="form-control w-100"></td>
                                                </tr>
                                                <tr>
                                                        <td>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_replace == 'p' ? 'checked' : '' -->
                                                                    name="pm_replace" id="pm_replace"
                                                                    value="p">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_replace == 'f' ? 'checked' : '' -->
                                                                    name="pm_replace" id="pm_replace"
                                                                    value="f">
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" <!-- php: = $order_data->pm_replace == 'n' ? 'checked' : '' -->
                                                                    name="pm_replace" id="pm_replace"
                                                                    value="n">
                                                            </div>
                                                        </td>
                                                        <td>3</td>
                                                        <td>Replace</td>
                                                        <td><input type="text" name="replace_comment"  value="<!-- php: = $order_data->replace_comment -->"  class="form-control w-100"></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style="width:10%;">P F N</th>
                                                    <th style="width:3%;">#</th>
                                                    <th>Acceptance Checks</th>
                                                    <th>Comments</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="pm_hipilot" <!-- php: = $order_data->pm_hipilot == 'p' ? 'checked' : '' -->
                                                                id="pm_hipilot" value="p">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="pm_hipilot" <!-- php: = $order_data->pm_hipilot == 'f' ? 'checked' : '' -->
                                                                id="pm_hipilot" value="f">
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="pm_hipilot" <!-- php: = $order_data->pm_hipilot == 'n' ? 'checked' : '' -->
                                                                id="pm_hipilot" value="n">
                                                        </div>
                                                    </td>
                                                    <td>1</td>
                                                    <td>HiPot Primary Supply (CSA)</td>
                                                    <td><input type="text" name="hipilot_comments" value="<!-- php: = $order_data->hipilot_comments -->" class="form-control w-100"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                        <input type="button" name="next" id="next3" style="width:auto"
                                            class="next action-button btn btn-primary"
                                            value="Next - Comments" />
                                        <input type="button" style="width:auto" name="previous"
                                            class="previous btn btn-secondary action-button-previous"
                                            value="Previous - Quantitative Tests" />&nbsp;&nbsp;
                                    </fieldset>

                                                                        
                                    <fieldset>
                                        <div class="table-responsive">
                                            <div>
                                                <h3>Comments</h3>
                                                <div class="">
                                                    <textarea name="comments" id="" class="form-control full-width"><!-- php: = $order_data->comments --></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <input style="width:auto;" type="submit" id="" name="draft"
                                            class="action-button btn btn-info mr-1" value="Draft" />
                                        <input type="submit" id="next4" name="next" style="width:auto"
                                            class="next action-button btn btn-primary"
                                            value="Save" />
                                        <input type="button" name="previous" style="width:auto"
                                            class="previous action-button-previous btn btn-secondary"
                                            value="Previous - Quantitative Tests" />
                                    </fieldset>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- php: =$this->Form->end(); -->
            </div>
        </div>

    </div>
</div>






<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>


$(document).ready(function(){

      var current_fs, next_fs, previous_fs; //fieldsets
      var opacity;
      var current = 1;
      var steps = $("fieldset").length;

      setProgressBar(current);

      $(".next").click(function(){

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      console.log("this is this", $(this).parent())

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

      console.log("this is this", $(this).parent())

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
   $(".progress-bar")
     .css("width",percent+"%")
    }

$(".submit").click(function(){
return false;
})

});

let all_inspectors = <!-- php: if (!isset($order_data->inspectors)): echo 1; else: echo sizeof(explode("||", $order_data->inspectors)); endif; -->
    
<!-- php:  -->
function addExtraInspectors() {
    console.log("hi guys", all_inspectors)
    $('#extra_inspects').append(\`
        <input type="text" name="inspectors[]" class="form-control col-md-11" id="inspector_name\${all_inspectors}">
        <a style="color:red" href="javascript:void(0);" onclick="removeExtraInspecs('\${all_inspectors}')" id="remove_inspector_button\${all_inspectors}"><i class="fa fa-close"></i></a>
    \`)
    all_inspectors++
}

function removeExtraInspecs(id) {
    $('#inspector_name'+id).remove()
    $('#remove_inspector_button'+id).remove()
}



</script>

`;

export default function ElementElementInventorylistRecordWorkOrder() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
