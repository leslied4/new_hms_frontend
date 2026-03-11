import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/OrPlanner/index.php';
const rawHtml = `
<style>
    .work-order-checkbox-label.mbsc-checkbox {
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .lightblue {
        background-color: #51aff124;
    }

    .panel-title:after {
        font-family: FontAwesome;
        content: "\f107";
        float: right;
        color: grey;
        font-size: 16px;
    }

    .panel-title[aria-expanded="true"]:after {
        content: "\f106";
    }
</style>

<!-- php: function isDateLate($date, $format = 'Y-m-d') { $date = new DateTime($date); $date->setTime(0, 0); $currentDate = new DateTime(); $currentDate->setTime(0, 0); if ($date < $currentDate) { return true; } else { return false; } } -->
<div class="card card-topline-<!-- php: = $theme1 -->">

    <div class="card  card-box">
        <div class="card-head">
            <header>OR Planner</header>
        </div>
        <div class="card-body ">
            <div class="card">
                <div class="card-box">
                    <div class="card-head row">

                        <!--Filter -->
                        <div class="row" style="margin-left: 45px;">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="mar_filter" id="all_filter" value="" selected>
                                <label class="form-check-label" for="all_filter">All</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="mar_filter" id="prn_filter" value="23">
                                <label class="form-check-label" for="prn_filter"><span class="badge rounded-pill badge-success" style="">Completed</span></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="mar_filter" id="continuous" value="24">
                                <label class="form-check-label" for="continuous"><span class="badge rounded-pill" style="">Cancelled</span></label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="mar_filter" id="discountnued_filter" value="99">
                                <label class="form-check-label" for="discountnued_filter"><span class="badge rounded-pill badge-danger" style="">Overdue</span></label>
                            </div>
                        </div>


                        <!--Reminder and alert button-->
                        <i class=" fa fa-bell" style="position:absolute; right:20px;font-size: larger;margin-top: 12px;"></i>
                        <!-- <button class="btn btn-sm " style="background-color: white;"></button> -->





                    </div>
                    <div class="card-body p-5">
                        <div id="demo-work-order-scheduling"></div>




                    </div>
                </div>
            </div>
            <!-- Accordions -->
            <div style="margin-top:80px" id="accordion">
                <!-- php: foreach ($mdcSurgeries as $mdcSurgery) { -->
                    <div class="">
                        <div class="lightblue" id="heading<!-- php: = $mdcSurgery['id'] -->">
                            <h5 class="mb-0">
                                <div class="d-flex align-items-center p-1 panel-title" data-toggle="collapse" data-target="#collapse<!-- php: = $mdcSurgery['id'] -->" aria-expanded="true" aria-controls="collapse<!-- php: = $mdcSurgery['id'] -->">
                                    <h4 class="panel-heading my-0"><!-- php: = $mdcSurgery['name'] --> <span class="badge badge-primary"><!-- php: = $mdcSurgery['pending_count'] --></span></h4>
                                </div>
                            </h5>
                        </div>

                        <div id="collapse<!-- php: = $mdcSurgery['id'] -->" class="collapse" aria-labelledby="heading<!-- php: = $mdcSurgery['id'] -->" data-parent="#accordion">
                            <div class="card">
                                <div class="container-fluid py-2 px-5 mt-3">
                                    <table class="table surgeryDataTables">
                                        <thead>
                                            <th>Date</th>
                                            <th>Patient</th>
                                            <th>Surgery</th>
                                            <th>Surgeon</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </thead>
                                        <!-- php: foreach ($mdcSurgery['surgeries'] as $surgery) { -->
                                            <tr>
                                                <td><!-- php: = $surgery->date_created --></td>
                                                <td><!-- php: = $surgery->has('patient_visit') ? $surgery->patient_visit->patient->first_name . ' ' . $surgery->patient_visit->patient->last_name : '' --></td>
                                                <td><!-- php: = $surgery->has('procedure_stockSpecialtiesController') ? $surgery->procedure_stock->name : '' --></td>
                                                <td><!-- php: = $surgery->has('surgeon') ? 'Dr. ' . $surgery->surgeon->full_name : '' --></td>
                                                <td><!-- php: = $surgery->start_time --></td>
                                                <td><!-- php: = $surgery->end_time --></td>
                                                <td>
                                                    <span class="badge badge-<!-- php: = $surgery->status_id == 30 ? 'warning' : ($surgery->status_id == 23 ? 'success' : ($surgery->status_id == 24 ? '' : 'danger')) -->">
                                                        <!-- php: = isset($surgery->theatre_planner_task) ? (isDateLate($surgery->theatre_planner_task->start_date) ? "Overdue" : ($surgery->has('status') ? $surgery->status->name : 'N/A')) : ($surgery->has('status') ? $surgery->status->name : 'N/A') -->
                                                    </span>
                                                </td>
                                                <td>
                                                    <!-- <a href="javascript:" class="btn btn-warning btn-xs">Edit</a><br /> -->
                                                    <!-- php: if($surgery->status_id == 20) { -->
                                                        <a href="javascript:" onclick="assignModal('<!-- php: = $surgery->id -->');" class="btn btn-primary btn-xs">Assign</a><br />
                                                        <!-- <a href="javascript:" onclick="assignModal(<!-- php: = $surgery->id -->);" class="btn btn-warning btn-xs">Assigned</a><br /> -->
                                                        <a href="javascript:" onclick="cancelRequestSurgery('<!-- php: = $surgery->id -->');" class="btn btn-danger btn-xs">Cancel</a>
                                                    <!-- php: } -->
                                                </td>
                                            </tr>
                                        <!-- php: } -->
                                    </table>

                                </div>
                            </div>

                        </div>
                    </div>



                <!-- php: } -->
            </div>
        </div>
    </div>
    <!--Modals-->

    <!--Assign / Add New Surgery Task Modal -->
    <div class="modal fade" id="assignModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center justify-content-between">
                            <h4 class="text-slate-900 my-0">Add Surgery To Planner</h4>

                        </div>
                    </div>
                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'TheatrePlannerTasks', 'action' => 'add'], 'id' => 'addPlannerTaskForm', 'enctype'=>"multipart/form-data"]); -->
                    <div class="container bg-white p-2">
                        <!-- php: //= $this->Form->create($entity, ['url' => ['controller' => 'ControllerName', 'action' => 'actionName']]); -->

                        <div class="container-fluid">

                            <div class="form-body">

                                <article class="card-body ">


                                    <!--Request & issue details -->
                                    <dl class="item-property">
                                        <dt>Patient Details</dt>

                                        <dd>
                                            <p>
                                                Name: <span class="bold text-success" id="patientName_assignModal"></span><br>
                                                Age: <span class="bold text-success" id="patientAge_assignModal"> years </span><br>
                                                Gender: <span class="bold text-success" id="patientGender_assignModal"> </span> <br>
                                                location: <span class="bold text-success" id="patientLocation_assignModal"> </span> <br>
                                                Folder No: <span class="bold text-success" id="patientFolderNo_assignModal"></span>

                                            </p>

                                        </dd>
                                    </dl>
                                    <hr>



                                    <!--Request & issue details -->
                                    <dl class="item-property">
                                        <dt>Request & Issue Details</dt>
                                        <dd>
                                            <p>
                                                Request Date: <span id="reqDate_assignModal"></span> <br>
                                                Requester: <span id="requester_assignModal"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
                                                Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span>


                                            </p>
                                        </dd>
                                    </dl>
                                    <hr>

                                    <!--Procedure-->
                                    <dl class="item-property">
                                        <dt>Procedure </dt>
                                        <dd>
                                            <p><span id="procedure_assignModal"></span> <span id="procedureCode_assignModal" class="ml-2 badge rounded-pill bg-danger"></span></p>
                                        </dd>
                                    </dl>

                                    <hr>

                                    <!--Duration-->
                                    <dl class="item-property">
                                        <dt>Duration </dt>
                                        <dd>
                                            <p>
                                                <span id="assignModal_start_time"></span> - <span id="assignModal_end_time"></span> <br>
                                                Duration: <span id="assignModal_duration"></span> hr(s)
                                            </p>
                                        </dd>
                                    </dl>

                                    <hr>






                                </article>

                                <div class="form-group row">
                                    <label class="control-label col-md-5">Title

                                    </label>
                                    <div class=" col-md-7">

                                        <input class="form-control " id="task_title" name="title" data-required="1">



                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="control-label col-md-5">Select Date

                                    </label>
                                    <div class=" col-md-7">

                                        <input class="form-control surgery_date" placeholder="Start" name="start_date" data-required="1">



                                    </div>
                                </div>



                                <div class="form-group row">
                                    <label class="control-label col-md-5">Select Time

                                    </label>
                                    <div class=" col-md-7">
                                        <div class="input-group">
                                            <input class="form-control surgery_start_time" placeholder="Start" name="start_time" data-required="1">
                                            <span class="input-group-addon"><span class=""> - </span></span>
                                            <input class="form-control surgery_end_time" placeholder="End" name="end_time" data-required="1">
                                        </div>

                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="control-label col-md-5">Allow Over Time (hrs)

                                    </label>
                                    <div class=" col-md-7">
                                        <input name="over_time" placeholder="Over Time" data-required="1" class="form-control" />

                                    </div>
                                </div>




                                <div class="form-group row">
                                    <label class="control-label col-md-5">Surgical Unit

                                    </label>
                                    <div class="col-md-7">
                                        <SearchableSelectField class="selectpicker full-width surgical_units" aria-label="Default select example" data-live-search="false">
                                            <option value="" disabled selected hidden>Select ...</option>
                                        </SearchableSelectField>
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="control-label col-md-5">Primary Surgeon

                                    </label>
                                    <div class="col-md-7">
                                        <SearchableSelectField class="selectpicker full-width surgeon_users" name="surgeon_id" aria-label="Default select example" data-live-search="false">
                                            <option value="" disabled selected hidden>Select ...</option>

                                        </SearchableSelectField>

                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="control-label col-md-5">Primary Anesthesiologist

                                    </label>
                                    <div class="col-md-7">
                                        <SearchableSelectField class="selectpicker full-width anesthesiologist_users" name="anesthesiologist_id" aria-label="Default select example" data-live-search="false">
                                            <option value="" disabled selected hidden>Select ...</option>

                                        </SearchableSelectField>

                                    </div>
                                </div>


                                <div class="form-group row mb-5">
                                    <label class="control-label col-md-5">Primary Nurse

                                    </label>
                                    <div class="col-md-7">
                                        <SearchableSelectField class="selectpicker full-width nurse_users" name="nurse_id" id="nurse_id" aria-label="Default select example" data-live-search="false">
                                            <option value="" disabled selected hidden>Select ...</option>

                                        </SearchableSelectField>
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="control-label col-md-5">Description

                                    </label>
                                    <div class="col-md-7">
                                        <textarea class="form-control full-width" cols="30" rows="5" name="description"></textarea>
                                    </div>
                                </div>

                                <div class="form-group row mb-5">
                                    <label class="control-label col-md-5">Medical Files

                                    </label>
                                    <div class="col-md-7">
                                        <input type="file" accept=".pdf,.xls,.xlsx,.docx" class="form-control full-width"  name="files[]" id="" multiple>
                                    </div>
                                </div>


                                <hr>
                                <h4>Indicate medical equipment, medications, infusions, and any other resources required for the procedure</h4>


                                <div class="form-group row">
                                    <label class="control-label col-md-5">Medications

                                    </label>
                                    <div class="col-md-7">
                                        <SearchableSelectField class="selectpicker add_prescriptions" style="" name="medications[]" id="add_prescriptions" id="nurse_id" aria-label="Default select example" data-live-search="true" multiple>


                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-5">Infusions

                                    </label>
                                    <div class="col-md-7">
                                        <SearchableSelectField class="selectpicker add_infusions" style="" name="infusions[]" id="add_infusions" id="nurse_id" aria-label="Default select example" data-live-search="true" multiple>


                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-5">Medical Equipment

                                    </label>
                                    <div class="col-md-7">
                                        <SearchableSelectField class="selectpicker add_medical_equipment" style="" name="equipments[]" id="add_medical_equipment" id="nurse_id" aria-label="Default select example" data-live-search="true" multiple>


                                        </SearchableSelectField>
                                    </div>
                                </div>




                                <div class="form-group row d-flex justify-content-center mb-3">

                                    <a onclick="showResourceFilter('add_nurse_div')" class="btn btn-md btn-primary mr-3 mb-3 ">Nurse</a>
                                    <a onclick="showResourceFilter('add_surgeon_div')" class="btn btn-md btn-primary mr-3 mb-3 ">Surgeon</a>
                                    <a onclick="showResourceFilter('add_anesthesiologist_div')"class="btn btn-md btn-primary mr-3 mb-3 ">Anesthesiologist</a>


                                </div>


                                <!--Resource Filter section -->
                                <div>
                                    <div class="add_nurse_div d-none">

                                        <h4>Support Nurses (max 3)</h4>

                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Nurse 1

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width nurse_users" name="other_nurse_1" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Nurse 2

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width nurse_users" name="other_nurse_2" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Nurse 3

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width nurse_users" name="other_nurse_3" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>



                                    </div>



                                    <div class="add_surgeon_div d-none">

                                        <h4>Support Surgeons (max 3)</h4>

                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Surgeon 1

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width surgeon_users" name="other_surgeon_1" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Surgeon 2

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width surgeon_users" name="other_surgeon_2" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Surgeon 3

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width surgeon_users" name="other_surgeon_3" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>



                                    </div>

                                    <div class="add_anesthesiologist_div d-none">

                                        <h4>Support Anesthesiologists (max 3)</h4>

                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Anesthesiologist 1

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width anesthesiologist_users" name="other_anesthesiologist_1" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Anesthesiologist 2

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width anesthesiologist_users" name="other_anesthesiologist_2" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="control-label col-md-5">Anesthesiologist 3

                                            </label>
                                            <div class="col-md-7">
                                                <SearchableSelectField class="selectpicker full-width anesthesiologist_users" name="other_anesthesiologist_3" aria-label="Default select example" data-live-search="false">
                                                    <option value="" disabled selected hidden>Select ...</option>

                                                </SearchableSelectField>

                                            </div>
                                        </div>



                                    </div>

                                </div>










                            </div>



                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                            <!-- php: //= $this->Form->end(); -->
                            <button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                            </button>
                        </div>
                    </div>
                    <!-- php: = $this->Form->end() -->
                </div>
            </div>
        </div>
    </div>



    <!--Update Surgery Task Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center justify-content-between">
                            <h4 class="text-slate-900 my-0">Update Surgery To Planner</h4>

                        </div>
                    </div>


                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'TheatrePlannerTasks', 'action' => 'add'], 'id' => 'updatePlannerTaskForm', ]); -->
                    <div class="container bg-white p-2">
                        <!-- php: //= $this->Form->create($entity, ['url' => ['controller' => 'ControllerName', 'action' => 'actionName']]); -->

                        <div class="container-fluid">


                            <div class="form-body">

                                <article class="card-body ">


                                    <!--Request & issue details -->
                                    <dl class="item-property">
                                        <dt>Patient Details</dt>

                                        <dd>
                                            <p>
                                                Name: <span class="bold text-success" id="patientName_updateModal"></span><br>
                                                Age: <span class="bold text-success" id="patientAge_updateModal"> years </span><br>
                                                Gender: <span class="bold text-success" id="patientGender_updateModal"> </span> <br>
                                                location: <span class="bold text-success" id="patientLocation_updateModal"> </span><br>
                                                Folder No: <span class="bold text-success" id="patientFolderNo_updateModal"></span>

                                            </p>

                                        </dd>
                                    </dl>
                                    <hr>



                                    <!--Request & issue details -->
                                    <dl class="item-property">
                                        <dt>Request & Issue Details</dt>
                                        <dd>
                                            <p>
                                                Request Date: <span id="reqDate_updateModal"></span> <br>
                                                Requester: <span id="requester_updateModal"></span> <span class="ml-2 badge rounded-pill bg-secondary" id="req_user_role"></span> <br>
                                                Co-Signer: Ben White <span class="ml-2 badge rounded-pill bg-success">SIGNED</span>


                                            </p>
                                        </dd>
                                    </dl>
                                    <hr>

                                    <!--Procedure-->
                                    <dl class="item-property">
                                        <dt>Procedure & Status</dt>
                                        <dd>
                                            <p><span id="procedure_updateModal"></span>  <span id="procedureCode_updateModal" class="ml-2 badge rounded-pill bg-danger"></span></p>
                                        </dd>
                                    </dl>
                                    <!--//drug name-->
                                    <hr>


                                    <!--primary participants-->
                                    <dl class="item-property">
                                        <dt>Primary Participants</dt>
                                        <dd>
                                            <p>
                                                Surgeon: <span id="surgeon_updateModal"></span> <br>
                                                Nurse: <span id="nurse_updateModal"></span><br>
                                                Anaesthesiologist: <span id="anaesthesiologist_updateModal"></span> <br>



                                            </p>
                                        </dd>
                                    </dl>




                                    <hr>



                                    <!--primary participants-->
                                    <dl class="item-property">
                                        <dt>Participants</dt>
                                        <dd>
                                            <p>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Participant Name</th>
                                                        <th>Role</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="participants_updateModal">

                                                </tbody>
                                            </table>
                                            </p>
                                        </dd>
                                    </dl>

                                    <!--primary participants-->
                                    <dl class="item-property">
                                        <dt>Attached Files</dt>
                                        <dd>
                                            <p>
                                            <table class="table">

                                                <tbody id="files_updateModal">

                                                </tbody>
                                            </table>
                                            </p>
                                        </dd>
                                    </dl>


                                    <hr>
                                    <h4>Indicate medical equipment, medications, infusions, and any other resources required for the procedure</h4>


                                    <div class="form-group row">
                                        <label class="control-label col-md-5">Medications

                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="selectpicker add_prescriptions" style="" name="medications[]" id="update_prescriptions" id="nurse_id" aria-label="Default select example" data-live-search="true" multiple>


                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-5">Infusions

                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="selectpicker add_infusions" style="" name="infusions[]" id="update_infusions" id="nurse_id" aria-label="Default select example" data-live-search="true" multiple>


                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-5">Medical Equipment

                                        </label>
                                        <div class="col-md-7">
                                            <SearchableSelectField class="selectpicker add_medical_equipment" style="" name="equipments[]" id="update_medical_equipment" id="nurse_id" aria-label="Default select example" data-live-search="true" multiple>


                                            </SearchableSelectField>
                                        </div>
                                    </div>




                                    <hr>

                                    <dl class="item-property">
                                        <dt>State</dt>
                                        <dd>
                                            <p>
                                                <a class="btn btn-xs btn-success">Scheduled</a>

                                            </p>
                                        </dd>
                                    </dl>
                                    <hr>




                                </article>












                            </div>



                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                        <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>

                            <span style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                            </span>
                        </div>
                    </div>
                    <!-- php: = $this->Form->end() -->
                </div>
            </div>
        </div>
    </div>


</div>



<!-- End of Accordions -->

<script>
    /**
     * Append Value to Text Function  
     */
    function appendDetails(v1, v2) {
        //Append 
        $(\`#\${v1}\`).text(v2);
    }

    function cancelRequestSurgery(id) {
        if (!confirm("Are you sure you want to cancel this request?")) {
            return
        }
        $.ajax({
            type: "POST",
            url: \`<!-- php: = $this->Url->build(['controller' => 'OrPlanner', 'action' => 'cancelRequestSurgery']) -->/\${id}\`,
            // data: {roles: roles}
        }).done((data) => {
            if(data.status) {

                alertify.success(data.data);
                setTimeout(() => {
                    // location.reload()
                }, 2000);
            }else {
                alertify.error(data.data);
            }
        })
    }

    function getUsers() {
        let roles = [1, 2, 8]
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'OrPlanner', 'action' => 'getUsersByRole']) -->\`,
            data: {roles: roles}
        }).done(data => {
            // $('.nurse_users').html('')
            // $('.surgeon_users').html('')
            // $('.anesthesiologist_users').html('')
            data.forEach(elem => {
                if ([2 , 8].includes(parseInt(elem.role_id))) {
                    console.log("the nurses cam here");
                    // $('.nurse_users').append(\`<option value="">None</option>\`)
                    $('.nurse_users').append(\`<option value="\${elem.id}">\${elem.first_name} \${elem.last_name}</option>\`)
                }
                if (elem.role_id == 1) {
                    // $('.surgeon_users').append(\`<option value="">None</option>\`)
                    $('.surgeon_users').append(\`<option value="\${elem.id}">\${elem.first_name} \${elem.last_name}</option>\`)
                }
                if (elem.role_id == 1) {
                    // $('.anesthesiologist_users').append(\`<option value="">None</option>\`)
                    $('.anesthesiologist_users').append(\`<option value="\${elem.id}">\${elem.first_name} \${elem.last_name}</option>\`)
                }
            });
            // $('.selectpicker').selectpicker("refresh")
        })
    }
    function getPrescriptions() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'filterItemsByTypes', '1']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.add_prescriptions').append(\`<option value=\${elem.id}>\${elem.full_name}</option>\`)
                // }
            });

        })
    }
    function getInfusions() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'Inventory', 'action' => 'filterItemsByTypes', '4']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.add_infusions').append(\`<option value=\${elem.id}>\${elem.full_name}</option>\`)
                // }
            });

        })
    }
    function getMedicalEquipment() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'InventoryList', 'action' => 'overview']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.add_medical_equipment').append(\`<option value=\${elem.id}>\${elem.name}</option>\`)
                // }
            });

        })
    }
    function getSurgicalUnits() {
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'OrPlanner', 'action' => 'getTreatmentRooms']) -->\`
        }).done(data => {
            // $('.surgical_units').html('')
            data.forEach(elem => {
                // if (elem.role_id == 11) {
                $('.surgical_units').append(\`<option value=\${elem.id}>\${elem.name}</option>\`)
                // }
            });
        })
    }
    getSurgicalUnits()
    getUsers()
    getPrescriptions()
    getInfusions()
    getMedicalEquipment()


    function setORPlanner() {

        //Get Planner values 
        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'OrPlanner', 'action' => 'setupORPlanner']) -->/\${$('input[name="mar_filter"]:checked').val()}\`
        }).done((data) => {

            const array = data;

            if (array != null && array.length != 0) {
                mobiscroll.setOptions({
                    theme: 'ios',
                    themeVariant: 'light'
                });

                var calendar,
                    range,
                    oldEvent,
                    tempEvent = {},
                    deleteEvent,
                    restoreEvent,
                    titleInput = document.getElementById('work-order-title'),
                    locationInput = document.getElementById('work-order-location'),
                    notesTextarea = document.getElementById('work-order-notes'),
                    deleteButton = document.getElementById('work-order-delete'),
                    resourceCont = document.getElementById('work-order-resources');

                var myData = array['task'];

                var myResources = array['resource'];

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
                                handler: function() {
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
                    popup.setOptions({
                        anchor: elm
                    });

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
                                handler: function() {
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
                    popup.setOptions({
                        anchor: args.domEvent.currentTarget
                    });
                    popup.open();
                }

                calendar = mobiscroll.eventcalendar('#demo-work-order-scheduling', {
                    clickToCreate: false,
                    dragToCreate: false,
                    dragToMove: false,
                    dragToResize: false,
                    dragTimeStep: 30,
                    view: {
                        timeline: {
                            type: 'week',
                            startDay: 1,
                            eventList: true,
                            endDay: 5
                        },
                        timeCellStep: 1440,
                        timeLabelStep: 1440,
                        weekNumbers: false
                            
                    },
                    data: myData.map(val => {
                        a = val.date.split(/T|\+/)
                        console.log("imagination", a[0] + 'T' + val.start + '+' + a[2])
                        return {
                            ...val,
                            start: a[0] + 'T' + val.start + '+' + a[2],
                            end: a[0] + 'T' + val.end + '+' + a[2],
                        }
                    }),
                    resources: myResources,
                    extendDefaultEvent: function() {
                        return {
                            title: 'Work order',
                            location: ''
                        };
                    },
                    onEventClick: function(args) {
                        updateModal(args.event.task_id);
                    },
                    onEventCreated: function(args) {
                        popup.close();
                        // store temporary event
                        tempEvent = args.event;
                        createAddPopup(args.target);
                    },
                    onEventDeleted: function(args) {
                        mobiscroll.snackbar({
                            button: {
                                action: function() {
                                    calendar.addEvent(args.event);
                                },
                                text: 'Undo'
                            },
                            message: 'Event deleted'
                        });
                    },
                    renderHeader: function () {
                        return '<div class="d-flex justify-content-between align-items-center full-width"><div mbsc-calendar-nav class="md-work-week-nav"></div>' +
                            '<div class="md-work-week-picker w-50">' +
                            '<label>Day<input mbsc-segmented type="radio" name="view" value="day" class="md-view-change"></label>' +
                            '<label>Week<input mbsc-segmented type="radio" name="view" value="week" class="md-view-change"  checked></label>' +
                            '<label>Month<input mbsc-segmented type="radio" name="view" value="month" class="md-view-change"></label>' +
                            '<label>Year<input mbsc-segmented type="radio" name="view" value="year" class="md-view-change"></label>' +
                            '</div>' +
                            '<div class="d-flex"><div mbsc-calendar-prev class="md-work-week-prev"></div>' +
                            '<div mbsc-calendar-today class="md-work-week-today"></div>' +
                            '<div mbsc-calendar-next class="md-work-week-next"></div></div></div>';
                    },
                });


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
                                case 'year':
                                calendar.setOptions({
                                    view: {
                                        calendar: {
                                            type: 'year',
                                            label: 'true'
                                        }
                                    }
                                })
                                break;
                        }
                    });
                });








            } else {
                //Display error
            }

        }).fail((data) => {

        })


    }





    function assignModal(requested_surgery_id) {

        //Get particular surgery

        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'RequestSurgeries', 'action' => 'get']) -->/\${requested_surgery_id}\`
        }).done((data) => {

            //show modal 

            $('#assignModal').modal('show');


            setupAssignModal(data[0]);




        }).fail((data) => {

            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');

        })







        //Submit Add Surgery / Theater task form 
        $('#addPlannerTaskForm').off('submit').submit(function(e) {
            e.preventDefault();

            console.log('Submit form working...');

            if (confirm('Are you sure you want to add task?')) {
                console.log($(this).serialize());


                var formData = new FormData(document.getElementById('addPlannerTaskForm'));

                submitPlannerTask(requested_surgery_id, formData, resetAddPlannerTaskForm);

                //close modal 
                $('#assignModal').modal('hide');
            }


            return false;
        })

    }





    function updateModal(task_id) {

        console.log('Task id:'+task_id);

        //Get particular surgery

        $.ajax({
            type: "GET",
            url: \`<!-- php: = $this->Url->build(['controller' => 'TheatrePlannerTasks', 'action' => 'get']) -->/\${task_id}\`
        }).done((data) => {

            //show modal 

            $('#updateModal').modal('show');


            setupUpdateModal(data[0]);




        }).fail((data) => {

            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');

        })




        //Submit update Surgery / Theater task form 
        $('#updatePlannerTaskForm').off('submit').submit(function(e) {
            e.preventDefault();


            if (confirm('Are you sure you want to update Task?')) {
                console.log($(this).serialize());

                updatePlannerTask(task_id, $(this).serialize(), resetUpdatePlannerTaskForm);

                //close modal 
                $('#assignModal').modal('hide');
            }


            return false;
        })



    }


    function setupUpdateModal(task)
    {
        console.log(task);
        //Patient details 
        appendDetails('patientName_updateModal', task.request_surgery.patient_visit.patient.name);
        appendDetails('patientAge_updateModal', task.request_surgery.patient_visit.patient.age);
        appendDetails('patientGender_updateModal', task.request_surgery.patient_visit.patient.gender.name);
        // appendDetails('patientLocation_updateModal', task.request_surgery.patient_visit.patient.location == null ? 'N/A' : requested_surgery.patient_visit.patient.location.name);
        appendDetails('patientFolderNo_updateModal', task.request_surgery.patient_visit.patient.folder_number);

        //Request Details
        appendDetails('reqDate_updateModal', moment(new Date(task.request_surgery.date_created)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('requester_updateModal', \`\${task.request_surgery.user.first_name} \${task.request_surgery.user.last_name}\`);
        appendDetails('procedure_updateModal', (task.request_surgery.surgery_stock?.procedure_name || task.request_surgery?.procedure_stock.name));
        appendDetails('procedureCode_updateModal', \`\${(task.request_surgery.surgery_stock?.procedure_code || task.request_surgery.procedure_stock?.code) }\`);
        appendDetails('surgeon_updateModal',\`Dr. \${task.surgeon?.first_name || ''} \${task.surgeon?.last_name || ''}\`);
        appendDetails('nurse_updateModal',\` \${task.nurse?.first_name || ''} \${task.nurse?.last_name || ''} \`);
        appendDetails('anaesthesiologist_updateModal', \`Dr. \${task.anesthesiologist?.first_name || ''} \${task.anesthesiologist?.last_name || ''}\`)
        // appendDetails('assignModal_start_time', moment(new Date(requested_surgery.start_time)).format("DD MMM YYYY, hh:mm A"));
        // appendDetails('assignModal_end_time', moment(new Date(requested_surgery.end_time)).format("DD MMM YYYY, hh:mm A"));
        // appendDetails('assignModal_duration', requested_surgery.duration);

        let tableInfo = task.theatre_planner_tasks_participants.reduce((acc, curr) => {
            acc += \`
                <tr>
                    <td>\${curr.user.first_name} \${curr.user.last_name}</td>
                    <td>\${curr.role}</td>
                </tr>
            \`
            return acc
        }, '');
        $('#participants_updateModal').html(tableInfo);

        let filesInfo = task.theatre_planner_tasks_files.reduce((acc, curr, index) => {
            acc += \`
                <tr>
                    <td>
                        <a href="<!-- php: = $this->Url->build('/img/', ['fullBase' => true]) -->\${curr.file_path}" target="_blank" >File \${index + 1}</a>
                    </td>
                </tr>
            \`
            return acc
        }, '');
        
        $('#files_updateModal').html(filesInfo);
        
        let selected_infusions_n_medications = task.request_surgery.theatre_planner_task_medications.map((ele) => {
            return ele.item_id
        });
        let selected_equipments = task.request_surgery.theatre_planner_task_equipments.map((ele) => {
            return ele.item_id
        });

        $('#update_prescriptions').val(selected_infusions_n_medications)
        $('#update_infusions').val(selected_infusions_n_medications)
        $('#update_medical_equipment').val(selected_equipments)

        $('#update_prescriptions').selectpicker('refresh')
        $('#update_infusions').selectpicker('refresh')
        $('#update_medical_equipment').selectpicker('refresh')
        
        // set title
        // $('#task_title_updateModal').val(task.title);








    }


    function resetAddPlannerTaskForm() {
        // //Loop for inputs
        // $('#addPlannerTaskForm').find('input').each(function() {
        //     $(this).val("");
        // });



        // //Loop for selects
        // $('#addPlannerTaskForm').find('select').each(function() {
        //     $(this).val('').selectpicker('refresh');
        // });

    }
    function resetUpdatePlannerTaskForm() {
        // //Loop for inputs
        // $('#updatePlannerTaskForm').find('input').each(function() {
        //     $(this).val("");
        // });



        // //Loop for selects
        // $('#addPlannerTaskForm').find('select').each(function() {
        //     $(this).val('').selectpicker('refresh');
        // });

    }


    function submitPlannerTask(requested_surgery_id, data, resetFormCallback) {
        //ajax 
        $.ajax({

            type: "POST",
            url: \`<!-- php: = $this->Url->build(['controller' => 'TheatrePlannerTasks', 'action' => 'add']) -->/\${requested_surgery_id}\`,
            data: data,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Prevent jQuery from setting the content type
        }).done((data, textstatus, xhr) => {
            if (xhr.status == 200) {
                alertify.success(data);

                //Reload OR Planner calendar
                setORPlanner();



                //Rest Form
                resetFormCallback()

                // location.reload()


            } else {
                alertify.error(data);
            }
        }).fail((data) => {
            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');
        })

    }

    function updatePlannerTask(requested_surgery_id, data, resetFormCallback) {
        //ajax 
        $.ajax({

            type: "POST",
            url: \`<!-- php: = $this->Url->build(['controller' => 'TheatrePlannerTasks', 'action' => 'update']) -->/\${requested_surgery_id}\`,
            data: data,
        }).done((data, textstatus, xhr) => {
            if (xhr.status == 200) {
                alertify.success(data);

                //Reload OR Planner calendar
                $('#updateModal').modal('hide');
                setORPlanner();



                //Rest Form
                resetFormCallback()


            } else {
                alertify.error(data);
            }
        }).fail((data) => {
            console.log("Failed to Add OR Planner Task")
            console.log(data)

            alertify.error('Internal Server Error');
        })

    }



    function showResourceFilter(id) {

        console.log("selected filter:" + id)

        //Get element 
        const element = $(\`.\${id}\`);
        console.log(element);

        if (element.hasClass('d-none')) {
            // console.log(\`\${id} has d-none\`);
            element.removeClass('d-none');
        } else {
            element.addClass('d-none');
        }

        //hide siblings 
        element.siblings().each(function() {
            if (!$(this).hasClass('d-none')) {
                $(this).addClass('d-none');
            }
        })




    }


    function setupAssignModal(requested_surgery) {

        // console.log(requested_surgery);

        appendDetails('patientName_assignModal', requested_surgery.patient_visit.patient.name);
        appendDetails('patientAge_assignModal', requested_surgery.patient_visit.patient.age);
        appendDetails('patientGender_assignModal', requested_surgery.patient_visit.patient.gender.name);
        appendDetails('patientLocation_assignModal', requested_surgery.patient_visit.patient.location == null ? 'N/A' : requested_surgery.patient_visit.patient.location.name);
        appendDetails('patientFolderNo_assignModal', requested_surgery.patient_visit.patient.folder_number);

        appendDetails('reqDate_assignModal', moment(new Date(requested_surgery.date_created)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('requester_assignModal', \`\${requested_surgery.user.first_name} \${requested_surgery.user.last_name}\`);
        appendDetails('procedure_assignModal', (requested_surgery.surgery_stock?.procedure_name || requested_surgery.procedure_stock.name) );
        appendDetails('procedureCode_assignModal', \`\${requested_surgery.surgery_stock?.procedure_code }\`);
        appendDetails('assignModal_start_time', moment(new Date(requested_surgery.start_time)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('assignModal_end_time', moment(new Date(requested_surgery.end_time)).format("DD MMM YYYY, hh:mm A"));
        appendDetails('assignModal_duration', requested_surgery.duration);

        //set title
        $('#task_title').val((requested_surgery.surgery_stock?.procedure_name || requested_surgery.procedure_stock.name));





    }
</script>

<script>
    $('input[type=radio][name=mar_filter]').on('change', function() {
        // switch ($(this).val()) {
        // 	case '1':
        // 		console.log('All Filter clicked');
        // 		break;
        // 	case '2':
        // 		console.log('Scheduled Filter Clicked');
        // 		break;
        // }

        setORPlanner();
    });

    $(function() {

        /*********************GLOBAL***************************/
        mobiscroll.datepicker('.surgery_date', {
            controls: ['calendar'],
            touchUi: true,
            dateFormat: 'YYYY-MM-DD',
            min: moment(new Date()).format("yyyy-mm-dd"),
            returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

        });


        mobiscroll.datepicker('.surgery_start_time', {
            controls: ['time'],
            touchUi: true,
            timeFormat: "HH:mm",
            returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

        });


        mobiscroll.datepicker('.surgery_end_time', {
            controls: ['time'],
            touchUi: true,
            timeFormat: "HH:mm",
            returnFormat: 'moment',
            theme: 'ios',
            themeVariant: 'light'

        });

        //set up or planner on page reload 
        setORPlanner();



        /********************TRIGGERS*******************/







    });
</script>

<!-- php: = $this->Html->script('../assets/plugins/datatables/jquery.dataTables.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/dataTables.buttons.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/jszip.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/pdfmake.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.html5.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/vfs_fonts.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.print.min.js'); -->


<script>
    $('.surgeryDataTables').DataTable( {
        buttons:[
            {
                text: 'Unscheduled',
                action: function ( e, dt, node, config ) {
                    $('.surgeryDataTables').DataTable()
                        .columns(6)
                        .search('New Request')
                        .draw();
                },
                className: 'btn btn-sm btn-danger mr-2'
            },
            {
                text: 'Scheduled',
                action: function ( e, dt, node, config ) {
                    $('.surgeryDataTables').DataTable()
                        .columns(6)
                        .search('submitted')
                        .draw();
                },
                className: 'btn btn-sm btn-warning mr-2'
            },
            {
                text: 'Completed',
                action: function ( e, dt, node, config ) {
                    $('.surgeryDataTables').DataTable()
                        .columns(6)
                        .search('Scheduled')
                        .draw();
                },
                className: 'btn btn-sm btn-success mr-2'
            },
            {
                text: 'Cancelled',
                action: function ( e, dt, node, config ) {
                    $('.surgeryDataTables').DataTable()
                        .columns(6)
                        .search('cancelled')
                        .draw();
                },
                className: 'btn btn-sm mr-2'
            },
            {
                text: 'Overdue',
                action: function ( e, dt, node, config ) {
                    $('.surgeryDataTables').DataTable()
                        .columns(6)
                        .search('overdue')
                        .draw();
                },
                className: 'btn btn-sm btn-danger mr-2'
            },
            {
                text: 'Refresh',
                action: function ( e, dt, node, config ) {
                    $('.surgeryDataTables').DataTable().columns(6).search("").draw();
                },
                className: 'btn btn-sm btn-info mr-2'
            },
        ],
        dom: 'QBfrtip',
        "order": [],
        "stateSave": true,
        "displayLength": 25,
    } );
</script>
`;

export default function OrPlannerIndexPage() {
  return (
    <PageShell title="OrPlanner/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
