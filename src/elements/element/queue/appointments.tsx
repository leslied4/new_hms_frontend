const rawHtml = `
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/jquery.dataTables.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/searchBuilder.dataTables.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->
<!--main body-->
<div class="row">
<div class="borderBox light bordered col-md-12">
    <!-- <div class="borderBox-title tabbable-line">
        <ul class="nav nav-tabs" id="appointmentsTabs">
            <li class="nav-item">
                <a href="#appointments_tracker" data-toggle="tab">Appointments Tracker</a>
            </li>
            <li class="nav-item">
                <a href="#treatment_tracker" data-toggle="tab">Treatment Tracker </a>
            </li>
            <li class="nav-item">
                <a href="#appointments_statistics" data-toggle="tab"> Statistics</a>
            </li>
           
        </ul>
    </div> -->
    <div class="borderBox-body">
        <div class="tab-content">
            <div class="tab-pane active" id="appointments_tracker">
                <div class="col-md-12">
                    <div class="card card-topline-<!-- php: = $theme1 -->">

                        <div class="card  card-box">
                            <div class="card-head">
                                <header>Appointments Tracker</header>
                            </div>
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col-md-12 pb-5 px-4">
                                        <!-- <h5 class="font-weight-bold">Active Appointments</h5> -->
                                        
                                        <!-- <div class="col-md-6"> -->
                                        <div mbsc-page class="demo-setting-the-timezone">
                                            <div style="height:100%">
                                                <div id="demo-showing-events-timezone"></div>
                                            </div>
                                        <!-- </div> -->
                                        </div>
                                    </div>
                                    <!-- <div class="col-md-6 pb-5 px-2">
                                        <h5 class="font-weight-bold">Waiting List</h5>
                                        <div mbsc-page class="demo-synchronized-views">
                                            <div style="height:100%">
                                                <div class="mbsc-grid md-demo-synchronized-views">
                                                    <div class="mbsc-row mbsc-no-padding">
                                                        <div class="mbsc-col-md-4 mbsc-col-12">
                                                            <div id="demo-month"></div>
                                                        </div>
                                                        <div class="mbsc-col-md-8 mbsc-col-12 md-col-right">
                                                            <div id="demo-day"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="card mt-5 card-topline-<!-- php: = $theme1 -->">

                        <div class="card  card-box">
                            <div class="card-head">
                                <header>Statistics</header>
                            </div>
                            <div class="card-body">
                                <h5 class="mb-4">Weekly Patient Growth</h5>
                                <div class="d-flex col-md-2 align-items-center">
                                    <h6 class="my-0 py-0">Filter:</h6>
                                <SearchableSelectField name="patient_growth_filter" onclick="getActiveAppointmentStats(this.value)" class="ml-2 form-control" id="patient_growth_filter">
                                    <option value="month">This Month</option>
                                    <option selected value="year">This Year</option>
                                </SearchableSelectField>
                                </div>
                                <div id="appointment_stats" style="height: 400px;width:1080px; min-width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
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
                                                        <th>Date</th>
                                                        <th>Participant Name</th>
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
                                        <dt>Actions</dt>
                                        <dd>
                                            <p>
                                                <a class="btn btn-xs btn-success">Complete</a>
                                                <a class="btn btn-xs btn-warning">Flagged</a>
                                                <a class="btn btn-xs btn-danger">Stop</a>

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


<script src="<!-- php: = $this->Url->script('../webroot/js/echarts.js') -->"></script>
<script src="https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js"></script>
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.33/moment-timezone-with-data.min.js"></script>
<script>

  $("#treatment_tracker_table").DataTable();
//   var appointments_data = [];
var appointments_data;
 
  mobiscroll.setOptions({
        theme: 'ios',
        locale: mobiscroll.localeEn
    });

            mobiscroll.momentTimezone.moment = moment;
    
   appointments_data =  mobiscroll.eventcalendar('#demo-showing-events-timezone', {
        timezonePlugin: mobiscroll.momentTimezone,  // More info about timezonePlugin: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-timezonePlugin
        dataTimezone: 'utc',                        // More info about dataTimezone: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-dataTimezone
        displayTimezone: 'local',                   // More info about displayTimezone: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-displayTimezone
        view: {                                     // More info about view: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-view
            agenda: { type: 'week' }
        },
        renderEventContent: function (data) {
            console.log(data);
            return '<div style="text-align:left;display:flex;align-items:center;"><img style="height:30px;width:auto;" src="hms/webroot/img/'+ data.original.patient_img +'"/><div class="d-flex flex-column ml-2"><span><a class="text-primary" href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPatient',]) -->"/'+data.original.user_id+'>'+data.original.patient+' <span class="badge badge-primary">'+ data.original.type +'</span></a></span></div></div><h5 class="mb-3"> has requested for <b>'+data.original.appointment_type+'</b></h5>' +
            '<div style="display: flex;align-items: center;font-size: 13px;border-radius:10px;margin-top:20px" class="md-custom-event-cont w-100">'+data.original.information+'</div>' +
            // '<div class="mbsc-custom-event-name">' + getParticipant(data.original.participant).name + '</div>' +
            '<div class="w-100 d-flex justify-content-end">'+ data.original.buttons +'</div>' +
            '</div>';
        },
    
        // data: appointments_data
    });
    getActiveAppointments();
    getActiveAppointmentStats('year');
	function getActiveAppointments(){
		$.ajax({
			type: 'GET',
			url: '<!-- php: = $this->Url->build(['controller'=> 'Queue', 'action' => 'getActiveAppointments']) -->/<!-- php: = $this->request->getSession()->read()['Auth']['User']['id'] -->',
			cache: false,
			success: function(res){
				console.log(res);
                appointments_data.setEvents(res);
			},
			error: function(res){
				console.log('oops');
			}
		})
	}
	function getActiveAppointmentStats(value){
		$.ajax({
			type: 'GET',
			url: '<!-- php: = $this->Url->build(['controller'=> 'Queue', 'action' => 'getAppointmentStats']) -->/' +value,
			cache: false,
			success: function(res){
				console.log(res);
                // appointments_data.setEvents(res);
                generateStats(res.period, res.values)
			},
			error: function(res){
				console.log('oops');
			}
		})
	}

    function generateStats(period, values){
        option = {
            xAxis: {
                type: 'category',
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                data: period
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                // data: [820, 932, 901, 934, 1290, 1330, 1320],
                data: values,
                type: 'line',
                smooth: true
                }
            ]
        };

    option && myChart.setOption(option);
    }
    

var chartDom = document.getElementById('appointment_stats');
var myChart = echarts.init(chartDom);
var option;

    function appendDetails(v1, v2) {
        //Append 
        $(\`#\${v1}\`).text(v2);
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

    // $(document).ready(function() {
        getPrescriptions()
        getInfusions()
        // getMedicalEquipment()
    // });


</script>
`;

export default function ElementElementQueueAppointments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
