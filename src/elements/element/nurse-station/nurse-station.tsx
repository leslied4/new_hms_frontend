const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css"> -->
<!-- php: = $this->Html->css('../assets/plugins/summernote/summernote.css') -->	
<!-- php: $sex = $this->request->getSession()->read()['Auth']['User']['gender_id']; -->
<style>
.main{
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    background-color: #f6f6f6;
}
.one{
    width: 270px;
    background-color: #000;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.pic1{
    position: relative;
    right: 22px;
    top: 23px;
}
.pic2{
    position: relative;
    left: 25px;
    top: 17px;
}
.pic3{
    position: relative;
    right: 13px;
    bottom: 18px;
}
.pic4{
    position: relative;
    left: 14px;
    bottom: 21px;
}
.project{
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: #fd4040;
}
.quote{
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #fff;

}




.two{
    width: 100%;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #eee;    
}
.star{
    font-size: 20px !important;
    color: #b1b4b7;
}
.dot{
    font-size: 20px !important;
    color: #b1b4b7;
}
.round{
    border-radius: 50%;
    background-color: #eee;
    width: 50px;
    height: 50px;
    margin-bottom: -10px;
    align-items: center;
    justify-content: center;
}
.name{
    font-size: 22px;
    color: #464e56;
    font-weight: 600;
    text-align: left;
}
.quote2{
     font-size: 12px;
     color: #868e94;
     text-align: left;
}
.img1{
    position: relative;
    left: 20px;
    z-index: 28;
    border: 0.5px solid #6ebde4;
    border-radius: 50%;
    background-color: #bcd8e6;
}
.img2{
    position: relative;
    left: 10px;
    z-index: 29;
    border: 0.5px solid #6ebde4;
    border-radius: 50%;
    background-color: #bcd8e6;
}
.img3{
    z-index: 30;  
    border: 0.5px solid #6ebde4;
    border-radius: 50%; 
    background-color: #bcd8e6;
}
.task{
     color: #727475;
}
.date{
     color: #727475;
}
.imgfix{
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    top: 2px;
}

.nurse-station-containers {
    height: 75vh;
    overflow-y:scroll;
}

.dropdown-menu{
    min-width: 100%!important;
}

</style>

    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#create_access" data-toggle="tab"> Card View </a>
                </li>
                <!-- <li class="nav-item">
                    <a href="#table_view" data-toggle="tab"> Table View </a>
                </li> -->
                <li class="nav-item">
                    <a href="#notesViewTab" data-toggle="tab"> Patient Visit Notes </a>
                </li>
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="create_access">
                    <!-- <h4>Add a new Invoice</h4> -->
                    <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container-fluid text-center mt-3 mb-2">
                                <!-- <div class="card p-5 mt-1 mb-3"> -->
                                   <div class="d-flex align-items-center">
                                       <div class="col-md-2 pr-3">
                                           <div class="form-group">
                                               <div class="d-flex justify-content-start">
                                                    <label>Filter:</label>
                                               </div>
                                               <SearchableSelectField onchange="filterFunction()" name="" id="date-filter2" class="form-control">
                                                   <option value="">all</option>
                                                   <option value="1">Today</option>
                                                   <option value="2">Tomorrow</option>
                                                   <option value="3">This Week</option>
                                                   <!-- <option value="custom">Custom</option> -->
                                               </SearchableSelectField>

                                               <div class="d-none" id="custom-date-range-container2">
                                                   <div id="range2"></div>
                                                   <label>
                                                       Start
                                                       <input id="start2" mbsc-input placeholder="Please select..." />
                                                   </label>
                                                   <label>
                                                       End
                                                       <input id="end2" mbsc-input placeholder="Please select..." />
                                                   </label>
                                               </div>
                                           </div>
                                       </div>
                                       <div class="col-md-2 d-flex align-start">
                                           <div class="form-group col-md-12 px-0">
                                              <div class="d-flex justify-content-start">
                                                <label>Ward Name</label>
                                              </div>
                                              <SearchableSelectField data-actions-box="true"
                                                  style="min-width:auto!important"
                                                  class="form-control input-height selectpicker w-100 show-menu-arrow show-tick"
                                                  data-size="5" name="wards[]" id="filterCardsByWards" title="Search Ward" onchange="filterFunction()"
                                                  data-live-search="true" multiple required>
                                                   <!-- php: foreach($wards as $ward){ -->
                                                        <option value="<!-- php: = $ward->id -->"><!-- php: = $ward->name --></option>
                                                   <!-- php: } -->
                                              </SearchableSelectField>
                                           </div>
                                       </div>
                                       <div class="col-md-2 d-flex align-start">
                                           <div class="form-group col-md-12 px-0">
                                              <div class="d-flex justify-content-start">
                                                <label>Task Timer</label>
                                              </div>
                                              <SearchableSelectField data-actions-box="true"
                                                  style="min-width:auto!important"
                                                  class="form-control input-height selectpicker w-100 show-menu-arrow show-tick"
                                                  data-size="5" name="timers[]" id="filterCardsByTimer" title="Select.." onchange="filterFunction()"
                                                  data-live-search="true" multiple required>
                                                  <option value="0.5">30mins</option>
                                                  <option value="1">1 hour</option>
                                                  <option value="2">2 hours</option>
                                                  <option value="3">3 hours</option>
                                                  <option value="4">4 hours</option>
                                                  <option value="5">5 hours</option>
                                                  <option value="old">6 hours or more</option>
                                                  <option value="overdue">Over Due</option>
                                              </SearchableSelectField>
                                           </div>
                                       </div>
                                       <div class="form-group col-md-3">
                                            <div class="d-flex justify-content-start">
                                                <label>Search By Patient Name:</label>
                                            </div>
                                            <div class="d-flex align-items-start">
                                                <input id="search_by_patient" type="text" class="form-control">
                                                <button onclick="filterFunction()" id="search-patient-btn" type="submit" class="btn btn-sm btn-primary mt-1">Go</button>
                                            </div>
                                        </div>
                                        <div class="col-md-3 d-flex justify-content-end">
                                            <div>
                                                <button onClick="getData();generateTables();" class="btn mt-3 btn-xs btn-primary">Refresh</button>
                                            </div>
                                        </div>
                                       
                                   </div>
                                   
                                <div class="row">
                                    <div class="col-md-4 bg-light p-3">
                                        <h5 class="text-secondary font-weight-bold mt-2 mb-4 text-left">MEDICATION
                                            ADMINISTRATION</h5>
                                        <div class="nurse-station-containers">
                                            <div id="mar-div"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 bg-light p-3">
                                        <h5 class="text-secondary mt-2 font-weight-bold mb-4 text-left">PENDING REQUESTS
                                        </h5>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" checked type="checkbox" id="labs_check"
                                                value="labs">
                                            <label class="form-check-label" for="labs_check">Labs</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" checked type="checkbox" id="radiology_check"
                                                value="radiology">
                                            <label class="form-check-label" for="radiology_check">Radiology</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" checked type="checkbox" id="prescriptions_check"
                                                value="option3">
                                            <label class="form-check-label" for="prescriptions_check">Prescriptions</label>
                                        </div>
                                        <div class="nurse-station-containers">
                                            <div id="labs-wrapper">
                                                <small class="font-weight-bold">Labs</small>
                                                <div id="pending_request_labs_div"></div>
                                            </div>
                                            </br>
                                            <div id="radiology-wrapper">
                                                <small class="mt-3 font-weight-bold">Radiology</small>
                                                <div id="pending_request_radiologies_div"></div>
                                            </div>
                                            </br>
                                            <div id="prescription-wrapper">
                                                <small class="mt-3 font-weight-bold">Prescriptions</small>
                                                <div id="pending_request_prescriptions_div"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-4 bg-light p-3">
                                        <h5 class="text-secondary mt-2 font-weight-bold mb-4 text-left">FLOWSHEET</h5>
                                        <div class="nurse-station-containers">
                                            <div id="flowsheet_div">

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane" id="table_view">
                    <div class="row">
                        <div class="col-md-2 pr-3">
                            <div class="form-group">
                                <label>Filter:</label>
                                <SearchableSelectField name="" id="date-filter" class="form-control">
                                    <option value="today">Today</option>
                                    <option value="this-week">This Week</option>
                                    <option value="this-month">This Month</option>
                                    <option value="custom">Custom</option>
                                </SearchableSelectField>

                                <div class="d-none" id="custom-date-range-container">
                                    <div id="range"></div>
                                    <label>
                                        Start
                                        <input id="start" mbsc-input placeholder="Please select..." />
                                    </label>
                                    <label>
                                        End
                                        <input id="end" mbsc-input placeholder="Please select..." />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label>Request Type:</label><br />
                                <SearchableSelectField name="" id="request-type" class="form-control">
                                    <option value="lab">Lab</option>
                                    <option value="prescription">Prescription</option>
                                    <option value="radiology">Radiology</option>
                                    <option value="surgery">Surgery</option>
                                    <option value="sample collection">Sample Collection</option>

                            </div>
                        </div>

                        <div class="col-md-4 d-flex align-start">
                            <div class="form-group col-md-6">
                                <label>Ward Name</label>
                                <SearchableSelectField data-actions-box="true"
                                    style="min-width:auto!important"
                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                    data-size="5" name="ward[]" id="search_ward_table" title="Search Ward"
                                    data-live-search="true" multiple required>
                                    <!-- php: foreach($wards as $ward){ -->
                                        <option value="<!-- php: = $ward->id -->"><!-- php: = $ward->name --></option>
                                    <!-- php: } -->
                                </SearchableSelectField>
                            </div>


                        </div>
                    </div>
                    <div class="table-responsive">
                        <table id="nurse-station-table" class="table">
                            <thead>
                                <tr>
                                    <th>Date Admitted</th>
                                    <th>LOS</th>
                                    <th>Patient</th>
                                    <th>Ward (Bed)</th>
                                    <th>Admission Diagnoses</th>
                                    <th>Admitting Doctor</th>
                                    <th>Upcoming Task</th>
                                    <th>Completed Tasks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="nurse-station-tbody">
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane" id="notesViewTab">
                <!-- php: = $this->element('nurse-station/patient_notes_table') -->
                </div>
            </div>

            <div class="modal fade" id="add_comment_modal" tabindex="-1" aria-labelledby="add_comment_modal" aria-hidden="true"
                aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h4 class="text-slate-900 my-0">Add Comment</h4>
                                    <div>
                                        <button data-dismiss="modal" aria-label="Close"
                                            class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                class="fa fa-times text-primary"></i> </button>
                                    </div>
                                </div>
                            </div>
                            <!-- php: =$this->Form->create(null, ['url' => ['controller' => 'PatientVisitNurseNotes', 'action' => 'addNurseNote'], 'id' => 'visitNurseNoteForm']); -->
                                <input type="hidden" name="patient_id" id="patient_id">
                                <input type="hidden" name="visit_id" id="visit_id">
                                <div class="container bg-white p-2">
                                    <div class="container-fluid">
                                        <textarea class="form-control" id="remarkEditor" rows="5" class="full-width"></textarea>
                                    </div>
                                </div>
                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                    <div class="d-flex align-items-center py-1 justify-content-end">
                                        <button style="height:20px;width:auto;" onclick="submitNurseComment()"
                                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i
                                            class="fa fa-check text-success fa-1x"></i> </button>
                                        <button style="height:20px;width:auto;"
                                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                            data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                            class="fa fa-times text-danger fa-1x"></i> </button>
                                    </div>
                                </div>
                            <!-- php: =$this->Form->end(); -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="modal fade" id="view_doctor_notes_modal" tabindex="-1" aria-labelledby="view_doctor_notes_modal" aria-hidden="true"
                aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h4 class="text-slate-900 my-0">View Doctor's Notes</h4>
                                    <div>
                                        <button data-dismiss="modal" aria-label="Close"
                                            class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                class="fa fa-times text-primary"></i> </button>
                                    </div>
                                </div>
                            </div>
                            <div class="container bg-white p-2">
                                <div class="container-fluid">
                                    <div id="accordion">
                                        <div class="card">
       
                                            <div class="doctorsRemarkSummary"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                <div class="d-flex align-items-center py-1 justify-content-end">
                                    <button style="height:20px;width:auto;"
                                        class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit&nbsp;<i
                                            class="fa fa-check text-success fa-1x"></i> </button>
                                    <button style="height:20px;width:auto;"
                                        class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                        data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                            class="fa fa-times text-danger fa-1x"></i> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="modal fade" id="view_nurse_notes_modal" tabindex="-1" aria-labelledby="view_nurse_notes_modal" aria-hidden="true"
                aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h4 class="text-slate-900 my-0">View Nurse's Notes</h4>
                                    <div>
                                        <button data-dismiss="modal" aria-label="Close"
                                            class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                class="fa fa-times text-primary"></i> </button>
                                    </div>
                                </div>
                            </div>
                            <div class="container bg-white p-2">
                                <div class="container-fluid">
                                    <div id="accordion">
                                        <div class="card">
       
                                            <div class="nursesRemarkSummary"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="view_tasks_modal" tabindex="-1" aria-labelledby="view_tasks_modal" aria-hidden="true"
                aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h4 class="text-slate-900 my-0">View Tasks</h4>
                                    <div>
                                        <button data-dismiss="modal" aria-label="Close"
                                            class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                class="fa fa-times text-primary"></i> </button>
                                    </div>
                                </div>
                            </div>
                            <div class="container bg-white p-2">
                                <div class="container-fluid">
                                    <div id="tasks-div"></div>
                                </div>
                            </div>
                            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                <div class="d-flex align-items-center py-1 justify-content-end">
                                 
                                    <button style="height:20px;width:auto;"
                                        class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                        data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                            class="fa fa-times text-danger fa-1x"></i> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
    <!-- php: =$this->Html->script('../assets/plugins/summernote/summernote.min.js') -->

    <script>

        let marTasks;
        let flowsheetTasks;
        let pendingRequests;

        var taskTable = $('#nurse-station-table').DataTable();
        
        $('#remarkEditor').summernote({
			placeholder: '',
			height: 250,
			width: '100%'
		});
       

        $('#date-filter').on('change', function(e){
        if(e.target.value == 'custom'){
            $('#custom-date-range-container').removeClass('d-none')
        } else {
            $('#custom-date-range-container').addClass('d-none')
 
        }
    })
    //     $('#date-filter2').on('change', function(e){
    //     if(e.target.value == 'custom'){
    //         $('#custom-date-range-container2').removeClass('d-none')
    //     } else {
    //         $('#custom-date-range-container2').addClass('d-none')
 
    //     }
    // })

        mobiscroll.datepicker('#range', {
        controls: ['datetime'],
        select: 'range',
        startInput: '#start',
        endInput: '#end',
        touchUi: true
    });
        mobiscroll.datepicker('#range2', {
        controls: ['datetime'],
        select: 'range',
        startInput: '#start2',
        endInput: '#end2',
        touchUi: true
    });

     function getData(){
            $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'NurseStation','action'=>'getAllTasks']) -->', // Replace with your actual API endpoint
            method: 'GET',
            dataType: 'json', // The expected response data type
            beforeSend: function(){
                $('#mar-div').html('Loading')
                $('#flowsheet_div').html('Loading')
                $('#pending_request_labs_div').html('Loading')
                $('#pending_request_prescriptions_div').html('Loading')
                $('#pending_request_radiologies_div').html('Loading')
             
            },
            success: function(data) {
                // Handle successful response
                $('#mar-div').html('')
                $('#flowsheet_div').html('')
                $('#pending_request_labs_div').html('')
                $('#pending_request_prescriptions_div').html('')
                $('#pending_request_radiologies_div').html('')

                marTasks = [...data.mar, ...data.infusions]
                flowsheetTasks = data.flowsheet
                pendingRequests = data

                console.log('Data received:', data);
                getFlowsheet(data.flowsheet)
                getMar([...data.mar, ...data.infusions])
                getPendingRequestCards(data)
                // generateTables(data)
                // console.log('filteredByDate: ',filterPrescriptionTasks(data.mar, '2024-01-15 10:54:22', '2024-01-18 14:54:22'))
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error:', status, error);
            }
        })
     }

     $(document).ready(function() {
        getData();
        // generateTables()
	})
    

     function updateCountdown(date, countdownElementId) {
        // Adjust both current and target dates to UTC time by considering time zone and provided options
        const currentDate = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        const targetDate = new Date(date).getTime() - (options.targetTimeZoneOffset || 0) * 60 * 1000;

        // Calculate time difference in milliseconds, considering absolute value for accurate rounding
        const timeDifference1 = (targetDate - currentDate);
        const timeDifference = Math.abs(targetDate - currentDate);

        // Extract and format individual units using absolute values and rounding appropriately
        const seconds = Math.round(timeDifference / 1000) % 60;
        const minutes = Math.round(timeDifference / 1000 / 60) % 60;
        const hours = Math.floor(timeDifference / 1000 / 60 / 60);

        // Determine direction (ago or away) and build the output string
        const prefix = timeDifference1 < 0 ? "Overdue: " : "Coming Up: ";
        const unitStrings = [];
        if (hours > 0) {
            unitStrings.push(\`\${hours} hour(s)\`);
        }
        if (minutes > 0) {
            unitStrings.push(\`\${minutes} minute(s)\`);
        }
        if (seconds > 0) {
            unitStrings.push(\`\${seconds} second(s)\`);
        }
        const timeString = prefix + unitStrings.join(", ");
        
        $('#'+countdownElementId).html(timeString);
        if (timeDifference1 > 0) {
            $('#b_'+countdownElementId).css("background", "#99CCFF");
            $('#b_'+countdownElementId).css("color", "black");
        }else {
            
            $('#b_'+countdownElementId).css("background", "#e74c3c33");
            $('#b_'+countdownElementId).css("color", "#e74c3c");
        }
    }

     function updateHours(date) {
        // Adjust both current and target dates to UTC time by considering time zone and provided options
        const currentDate = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        const targetDate = new Date(date).getTime() - (options.targetTimeZoneOffset || 0) * 60 * 1000;

        // Calculate time difference in milliseconds, considering absolute value for accurate rounding
        const timeDifference1 = (targetDate - currentDate);
        const timeDifference = Math.abs(targetDate - currentDate);

        // Extract and format individual units using absolute values and rounding appropriately
        const seconds = Math.round(timeDifference / 1000) % 60;
        const minutes = Math.round(timeDifference / 1000 / 60) % 60;
        const hours = Math.floor(timeDifference / 1000 / 60 / 60);

        // Determine direction (ago or away) and build the output string
        const prefix = timeDifference1 < 0 ? "Overdue: " : "Coming Up: ";
        const unitStrings = [];

        let timeInt = 0
        timeInt += hours * (timeDifference1 < 0 ? -1 : 1)
        if (minutes > 0) {

            timeInt += (minutes/(60 * (timeDifference1 < 0 ? -1 : 1)))
        }
        
        return timeInt
    }
    //  function updateCountdown(targetDate, countdownElementId) {
    //     const targetDateObj = new Date(targetDate);
    //     const currentDate = new Date();

    //     const timeRemaining = Math.floor((targetDateObj - currentDate));

    //     const days = Math.floor(timeRemaining / (60 * 60 * 24));
    //     const hours = Math.floor((timeRemaining % (60 * 60 * 24)) / (60 * 60));
    //     const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
    //     const seconds = timeRemaining % 60;

    //     const countdownElement = document.getElementById(countdownElementId);
    //     if(hours < 0){
    //         countdownElement.textContent = \`Overdue by \${Math.abs(hours)}h \${Math.abs(minutes)}m  \`;
    //     } else {
    //         countdownElement.textContent = \`Starting in \${hours}h \${minutes}m \`;
    //     }
        

    //     // setTimeout(() => updateCountdown(targetDate, countdownElementId), 1000);
    // }

    function filterByWardId(data, wardIds) {
    // Assuming 'data' is your JSON object
        const wardIdsAsInt = wardIds.map(String);
        if (wardIdsAsInt.length < 1) {
            return data
        }
        const filteredData =  data.filter(flow => {
            // Check if the 'patient_visit' and 'patient_visit_admissions' properties exist
            if (Object.keys(flow?.patient_visit).length > 0 && flow?.patient_visit?.patient_visit_admissions.length > 0) {
                // Iterate through 'patient_visit_admissions' array
                return flow.patient_visit.patient_visit_admissions.some(admission => {
                    // Check if 'ward' and 'id' properties exist and match any 'wardId' in the array
                    return ('id' in admission.bed) && ('id' in admission.bed.ward) && wardIdsAsInt.includes(admission.bed.ward.id);
                });
            }
            return false; // If the required properties are not found
        });

        return filteredData
    }

    function filterByWardId2(data, wardIds) {
    // Assuming 'data' is your JSON object
        const wardIdsAsInt = wardIds.map(String);
        if (wardIdsAsInt.length < 1) {
            return data
        }
        const filteredData =  data.filter(flow => {
            // Check if the 'patient_visit' and 'patient_visit_admissions' properties exist
            if (flow.patient_visit_admissions) {
                // Iterate through 'patient_visit_admissions' array
                return flow?.patient_visit_admissions?.some(admission => {
                    // Check if 'ward' and 'id' properties exist and match any 'wardId' in the array
                    return admission?.bed && admission?.bed?.ward && wardIdsAsInt.includes(admission.bed.ward.id);
                });
            }
            return false; // If the required properties are not found
        });

        return filteredData
    }

    function filterByPatientName(data, patientName) {
        // Assuming 'data' is your JSON object
        return data.filter(flow => {
            // Check if the 'patient_visit' property exists
            if (flow.patient_visit) {
                // Extract the patient name
                const fullName = \`\${flow.patient_visit.patient.first_name} \${flow.patient_visit.patient.last_name}\`;
                
                // Check if the extracted name contains the provided patientName
                return fullName.toLowerCase().includes(patientName.toLowerCase());
            }
        return false; // If the required properties are not found
        });
    }

    function filterByPatientName2(data, patientName) {
        // Assuming 'data' is your JSON object
        return data.filter(flow => {
            // Check if the 'patient_visit' property exists
            
                // Extract the patient name
                const fullName = \`\${flow.patient.first_name} \${flow.patient.last_name}\`;
                
                // Check if the extracted name contains the provided patientName
                return fullName.toLowerCase().includes(patientName.toLowerCase());
        });
    }

    function filterPrescriptionTasks(data, startDate, endDate) {
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setHours(0, 0, 0, 0 - startOfWeek.getDay() * 24 * 60 * 60 * 1000);

        return data.reduce((filteredTasks, item) => {
            const tasksInDateRange = item.patient_visit_prescription_tasks.filter(task => {
                const taskStartDate = new Date(task.start);

                // Check if the task start date is today
                const isToday = taskStartDate.toDateString() === currentDate.toDateString();

                // Check if the task start date is within this week
                const isThisWeek = taskStartDate >= startOfWeek;

                // Check if the task start date is within the specified date range
                const isInRange = taskStartDate >= new Date(startDate) && taskStartDate <= new Date(endDate);

                return isToday || isThisWeek || isInRange;
            });

            if (tasksInDateRange.length > 0) {
                filteredTasks.push({
                    ...item,
                    patient_visit_prescription_tasks: tasksInDateRange
                });
            }

            return filteredTasks;
        }, []);
    }

    // $("#filterCardsByWards").on('change', function(e){
    //     console.log($(this).val())
    //     $.ajax({
    //         url: '<!-- php: //$this->Url->build(['controller'=>'NurseStation','action'=>'getAllTasks']) -->', // Replace with your actual API endpoint
    //         method: 'GET',
    //         dataType: 'json', // The expected response data type
    //         beforeSend: function(){
    //             $('#mar-div').html('Loading')
    //             $('#flowsheet_div').html('Loading')
    //             $('#pending_request_labs_div').html('Loading')
    //             $('#pending_request_prescriptions_div').html('Loading')
    //             $('#pending_request_radiologies_div').html('Loading')
    //         },
    //         success: function(data) {
    //             // Handle successful response
    //             $('#mar-div').html('')
    //             $('#flowsheet_div').html('')
    //             $('#pending_request_labs_div').html('')
    //             $('#pending_request_prescriptions_div').html('')
    //             $('#pending_request_radiologies_div').html('')
               
    //             getFlowsheet(filterByWardId(data.flowsheet,  $("#filterCardsByWards").val()))
    //             getMar(filterByWardId([...data.mar, ...data.infusions],  $("#filterCardsByWards").val()))
    //             getPendingRequestCards({request_labs:filterByWardId2(data.request_labs, $('#filterCardsByWards').val()), request_radiologies: filterByWardId(data.request_radiologies, $('#filterCardsByWards').val()), request_prescriptions: filterByWardId(data.request_prescriptions, $('#filterCardsByWards').val()) })
    //             // console.log(filterByWardId(data.mar,  $("#filterCardsByWards").val()))
    //         },
    //         error: function(xhr, status, error) {
    //             // Handle error
    //             console.error('Error:', status, error);
    //         }
    //     })
    // })

    // $("#filterCardsByWards").on('change', function(e){
    //     console.log($(this).val())
    //     let data = pendingRequests

    //     $('#mar-div').html('')
    //     $('#flowsheet_div').html('')
    //     $('#pending_request_labs_div').html('')
    //     $('#pending_request_prescriptions_div').html('')
    //     $('#pending_request_radiologies_div').html('')

    //     console.log("these are all pending tasks", [...data.request_labs, ...data.request_prescriptions])
    //     getFlowsheet(filterByWardId(data.flowsheet,  $(this).val()))
    //     getMar(filterByWardId([...data.mar, ...data.infusions],  $(this).val()))
    //     getPendingRequestCards({request_labs:filterByWardId2(data.request_labs, $(this).val()), request_radiologies: filterByWardId(data.request_radiologies, $(this).val()), request_prescriptions: filterByWardId(data.request_prescriptions, $(this).val()) })
    // })


    $("#search_ward_table").on('change', function(e){
        // console.log($(this).val())
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'NurseStation','action'=>'getAllTasks', 'table']) -->', // Replace with your actual API endpoint
            method: 'GET',
            dataType: 'json', // The expected response data type
            beforeSend: function(){
                $('#mar-div').html('Loading')
                $('#flowsheet_div').html('Loading')
            },
            success: function(data) {
                // Handle successful response
                $('#mar-div').html('')
                $('#flowsheet_div').html('')
               
                generateTables({flowsheet: filterByWardId(data.flowsheet,  $("#search_ward_table").val()), mar: filterByWardId(data.mar,  $("#search_ward_table").val()) })
                // getMar(filterByWardId(data.mar,  $("#search_ward_table").val()))
                // console.log(filterByWardId(data.mar,  $("#filterCardsByWards").val()))
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error:', status, error);
            }
        })
    })

    // $("#search-patient-btn").on('click', function(e){
    //     // console.log($(this).val())
    //     $.ajax({
    //         url: '<!-- php: =$this->Url->build(['controller'=>'NurseStation','action'=>'getAllTasks']) -->', // Replace with your actual API endpoint
    //         method: 'GET',
    //         dataType: 'json', // The expected response data type
    //         beforeSend: function(){
    //             $('#mar-div').html('Loading')
    //             $('#flowsheet_div').html('Loading')
    //             $('#mar-div').html('Loading')
    //             $('#flowsheet_div').html('Loading')
    //             $('#pending_request_labs_div').html('Loading')
    //             $('#pending_request_prescriptions_div').html('Loading')
    //             $('#pending_request_radiologies_div').html('Loading')
    //         },
    //         success: function(data) {
    //             // Handle successful response
    //             $('#mar-div').html('')
    //             $('#flowsheet_div').html('')
    //             $('#mar-div').html('')
    //             $('#flowsheet_div').html('')
    //             $('#pending_request_labs_div').html('')
    //             $('#pending_request_prescriptions_div').html('')
    //             $('#pending_request_radiologies_div').html('')
               
    //             getFlowsheet(filterByPatientName(data.mar, $('#search_by_patient').val()))
    //             getMar(filterByPatientName([...data.mar, ...data.infusions], $('#search_by_patient').val()))
    //             getPendingRequestCards({request_labs:filterByPatientName2(data.request_labs, $('#search_by_patient').val()), request_radiologies: filterByPatientName(data.request_radiologies, $('#search_by_patient').val()), request_prescriptions: filterByPatientName(data.request_prescriptions, $('#search_by_patient').val()) })
    //             // console.log(filterByWardId(data.mar,  $("#filterCardsByWards").val()))
    //         },
    //         error: function(xhr, status, error) {
    //             // Handle error
    //             console.error('Error:', status, error);
    //         }
    //     })
    // })

    function sortByStartDate(tasks) {
        // Use the Array.sort() method to sort the tasks based on the "start" property
        tasks.sort((a, b) => new Date(a.start) - new Date(b.start));

        return tasks;
    }

    function calculateAge(birthdate) {
        // Parse the birthdate string to a Date object
        const birthDateObj = new Date(birthdate);

        // Get the current date
        const currentDate = new Date();

        // Calculate the difference in years
        const age = currentDate.getFullYear() - birthDateObj.getFullYear();

        // Check if the birthday has occurred this year
        const hasBirthdayOccurred =
            currentDate.getMonth() > birthDateObj.getMonth() ||
            (currentDate.getMonth() === birthDateObj.getMonth() &&
            currentDate.getDate() >= birthDateObj.getDate());

        // If the birthday hasn't occurred yet, subtract 1 from the age
        const finalAge = hasBirthdayOccurred ? age : age - 1;

        return finalAge;
    }

     function parseMyDate(string) {
        const inputDate = new Date(string);

        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = inputDate.getFullYear();

        const formattedDate = \`\${day}/\${month}/\${year}\`;
        return formattedDate;
        // console.log(formattedDate);

     }

    function getFlowsheet(data){
      
        data.map(d => {
            // console.log(d)
            $("#flowsheet_div").append(
              \`<div style="border-top:10px solid #8e44ad" class="two mt-3">
                  <div class="px-3 pt-2"><h4 class="name mb-0 pb-0">\${d?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(d?.patient_visit?.patient.date_of_birth)}</span>
                      <span class="badge badge-secondary">\${d?.patient_visit?.patient?.gender?.name}</span> <span class="badge badge-warning">\${d?.flow_sheet_type?.name}</span></h4>
                      <p class="quote2 mb-1 mt-2 pb-1">
                          <b>Frequency:</b> \${d?.flow_sheet_frequency?.name}, \${d?.flow_sheet_frequency?.description}<br/>
                          <b>Admitted By</b>: \${d?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${d?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
                      </p>
              </div>
              <div class="d-flex justify-content-start pl-3">
                  <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> 
                        <i class="fa fa-school"></i>
                        \${d?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}
                 </small> 
              </div>
              <div class="d-flex justify-content-start mt-2 pl-3">
                  <small style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                      class="p-1 px-2 d-flex align-items-center font-weight-bold">
                      <i style="font-size:16px" class="material-icons">timer</i>
                      &nbsp;<span id="flowsheet_timer\${d?.id}"></span></small>
              </div>
              <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                  <div class="d-flex justify-content-start mt-2">
                      <!-- <button class="btn btn-xs btn-primary">View</button> -->
                  </div>
                  <div class="d-flex justify-content-end align-items-center">
                      <div class="round">
                         \${d?.patient_visit?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                          <!-- php: // if($sex == ){ // echo $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); // } // else // { // echo $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix im... -->
                      </div>
                  </div>
              </div>
              </div>\`
            )

            updateCountdown(d.start_date, \`flowsheet_timer\${d?.id}\`)
        })

       
    }

    function getMar(data){
        // return console.log(data);
        data.map(mar => {

            let sorted_data = []
            if (mar?.patient_visit_prescription_tasks) {
                sortedData =  sortByStartDate(mar?.patient_visit_prescription_tasks)
                
            } else {
                sortedData =  sortByStartDate(mar?.patient_visit_infusion_tasks)

            }


           sortedData.map(prescription => {
               if(mar.task_started == true){
                $('#mar-div').append(\`
                <div style="border-top:10px solid #27ae60" class="two mt-3">
                    <div class="px-3 pt-2">
                        <h4 class="name mb-0 pb-0">\${mar?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(mar?.patient_visit?.patient.date_of_birth)}</span>
                        <span class="badge badge-secondary">\${mar?.patient_visit?.patient?.gender?.name}</span> </h4>
                        <p class="quote2 mb-1 pb-1">
                            \${prescription?.title}<br/>

                            <b>Admitted By</b>: \${mar?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${mar?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
                        </p>
                    </div>
                    <div class="d-flex justify-content-start pl-3">
                        <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
                                class="fa fa-school"></i>
                                \${mar?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
                    </div>
                    <div class="d-flex justify-content-start mt-2 pl-3">
                        <small id="b_mar_timer\${prescription?.id}\${mar.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                            class="p-1 px-2 d-flex align-items-center font-weight-bold">
                            <i style="font-size:16px" class="material-icons">timer</i>
                            &nbsp;<span id="mar_timer\${prescription?.id}\${mar.id}"></span></small>
                    </div>
                    <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                        <div class="d-flex justify-content-start mt-2">
                            <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${mar?.patient_visit?.patient?.id}" class="btn btn-xs btn-primary">View</a>
                        </div>
                        <div class="d-flex justify-content-end align-items-center">
                            <div class="round">
                            \${mar?.patient_visit?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                                <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                            </div>
                        </div>
                    </div>
                </div>
            \`)

            updateCountdown(prescription.start, \`mar_timer\${prescription?.id}\${mar.id}\`)
           
           
    
                
               }
            })
        })

    }


    function getDoctorRemarks(visit_id){
        $('.doctorsRemarkSummary').load("<!-- php: = $this->Url->build(['controller' => 'PatientVisitDoctorNotes', 'action' => 'getAllDoctorNotes',]) -->/"+visit_id, function() {
            $('#view_doctor_notes_modal').modal({
                show: true
            });
        });
    }
    function getNurseRemarks(visit_id){
        $('.nursesRemarkSummary').load("<!-- php: = $this->Url->build(['controller' => 'PatientVisitNurseNotes', 'action' => 'getAllNurseNotes',]) -->/"+visit_id, function() {
            $('#view_nurse_notes_modal').modal({
                show: true
            });
        });
    }

    function generateTables(){
        $("#nurse-station-tbody").html("")

        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'NurseStation','action'=>'getAllTasks', 'table']) -->', // Replace with your actual API endpoint
            method: 'GET',
            dataType: 'json', // The expected response data type
            beforeSend: function(){
                $("#nurse-station-tbody").html("")
            },
            success: function(data) {
                // Handle successful response
                $("#nurse-station-tbody").html("")

                var completed_task = []

                data.mar.map(mar => {
       
                // Assuming your tasks array is named 'tasks'
                var completedTasks = mar.patient_visit_prescription_tasks.filter(task => task.is_completed);

                if (completedTasks.length > 0) {
                    // Sort the completed tasks by 'date_modified' in descending order
                    completedTasks.sort((a, b) => new Date(b.date_modified) - new Date(a.date_modified));

                    // The most recent completed task is now the first element in the sorted array
                    var mostRecentCompletedTask = completedTasks[0];

                    console.log(mostRecentCompletedTask);
                } else {
                    console.log("No completed tasks found.");
                }

                var upcomingTasks = mar.patient_visit_prescription_tasks.filter(task => new Date(task.start) > new Date());

                if (upcomingTasks.length > 0) {
                    // Sort the upcoming tasks by 'start' time in ascending order
                    upcomingTasks.sort((a, b) => new Date(a.start) - new Date(b.start));

                    // The upcoming task is now the first element in the sorted array
                    var upcomingTask = upcomingTasks[0];

                    console.log(upcomingTask);
                } else {
                    console.log("No upcoming tasks found.");
                }
                
                $('#nurse-station-tbody').append(
                    \`
                    <tr>
                        <td>\${parseMyDate(mar?.date_created)}</td>
                        <td>\${calculateLengthOfStay(mar?.patient_visit?.patient_visit_admissions[0]?.admission_start)}</td>
                        <td>\${mar?.patient_visit?.patient?.name}</td>
                        <td>\${mar?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name} <span class="badge badge-primary">\${mar?.patient_visit?.patient_visit_admissions[0]?.bed?.name}</span></td>
                        <td></td>
                        <td>\${mar?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${mar?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}</td>
                   
                        <td>\${upcomingTask !== undefined ? upcomingTask?.title+ '<span class="badge badge-primary">'+upcomingTask?.task_number+'</span>' : 'No upcoming tasks found.'}</td>
                        <td>\${mostRecentCompletedTask !== undefined ? mostRecentCompletedTask?.title+ '<span class="badge badge-primary">'+mostRecentCompletedTask?.task_number+'</span>' : 'No completed tasks found.'}</td>
                        <td>
                            <button onclick='getMarTasks(\${JSON.stringify(mar?.patient_visit_prescription_tasks)})' class="btn btn-warning btn-xs">View Prescription Tasks</button>
                        </td>
                    </tr>
                    \`
                )
            
    
            
            //    }
            // })
            })


            data.flowsheet.map(d => {

                var completedTasks = data.flowsheet.filter(task => task.is_complete);

                if (completedTasks.length > 0) {
                    // Sort the completed tasks by 'date_modified' in descending order
                    completedTasks.sort((a, b) => new Date(b.date_modified) - new Date(a.date_modified));

                    // The most recent completed task is now the first element in the sorted array
                    var mostRecentCompletedTask = completedTasks[0];

                    console.log(mostRecentCompletedTask);
                } else {
                    console.log("No completed tasks found.");
                }

                var upcomingTasks = data.flowsheet.filter(task => new Date(task.start) > new Date());

                if (upcomingTasks.length > 0) {
                    // Sort the upcoming tasks by 'start' time in ascending order
                    upcomingTasks.sort((a, b) => new Date(a.start) - new Date(b.start));

                    // The upcoming task is now the first element in the sorted array
                    var upcomingTask = upcomingTasks[0];

                    console.log(upcomingTask);
                } else {
                    console.log("No upcoming tasks found.");
                }

                $('#nurse-station-tbody').append(
                    \`
                    <tr>
                        <td>\${parseMyDate(d?.date_created)}</td>
                        <td>\${calculateLengthOfStay(d?.patient_visit?.patient_visit_admissions[0]?.admission_start)}</td>
                        <td>\${d?.patient_visit?.patient?.name}</td>
                        <td>\${d?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name} <span class="badge badge-primary">\${d?.patient_visit?.patient_visit_admissions[0]?.bed?.name}</span></td>
                        <td></td>
                        <td>\${d?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${d?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}</td>
                        <td>\${upcomingTask !== undefined ? upcomingTask?.flow_sheet_frequency.name+ '<span class="badge badge-primary">'+upcomingTask?.flow_sheet_type.name+'</span>' : 'No upcoming tasks found.'}</td>
                        <td>\${upcomingTask !== undefined ? upcomingTask?.flow_sheet_frequency.name+ '<span class="badge badge-primary">'+upcomingTask?.flow_sheet_type.name+'</span>' : 'No upcoming tasks found.'}</td>
                        <td>
                            <button data-toggle="modal" data-target="#add_comment_modal" class="btn btn-primary btn-xs" onclick="$('#patient_id').val('\${d?.patient_visit?.patient_id}');$('#visit_id').val('\${d?.patient_visit?.id}');" >Add Comment</button>
                            <button onclick="getDoctorRemarks('\${d?.patient_visit?.id}')" class="btn btn-secondary btn-xs">View Comments</button>
                        </td>
                    </tr>
                    \`
                )
            
            })
               
                
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error:', status, error);
            }
        })
       



        taskTable.destroy();
        taskTable =  $('#nurse-station-table').DataTable();
    }

    function getMarTasks(data){
        $('#view_tasks_modal').modal('toggle');
        $('#tasks-div').html('')
       console.log(data)
       data.sort((a,b) => {
        return a.task_number.split(" ")[1] - b.task_number.split(" ")[1]
       }).map(dat => {
            badge_result = ''
            if (dat.state == 1) {
                badge_result = '<span class="badge rounded-pill bg-success">Completed</span>'
            } else if (dat.state == 2) {
                badge_result = '<span class="badge rounded-pill bg-warning">Paused</span>'						
            } else if (dat.state == 3) {
                badge_result = '<span class="badge rounded-pill bg-danger">Stopped</span>'
            } else {
                badge_result = '<span class="badge rounded-pill bg-secondary">Pending</span>'
            }
            $('#tasks-div').append(\`
                <p>\${dat.title} <span class="badge badge-primary">\${dat.task_number}</span> <span id="mar_task_modal\${dat?.id}" class="badge badge-secondary"></span> \${badge_result} </p>
            \`)

            updateCountdown(dat.start, \`mar_task_modal\${dat?.id}\`)
        })
    }


    // Assuming your array is named 'mar' and the select element has the id 'filterCardsByTimer'
    // const selectElement = document.getElementById('filterCardsByTimer');
    // // Add an event listener for changes to the select element
    // selectElement.addEventListener('change', function () {
    //     // Get the selected values from the select element
    //     const selectedValues = Array.from(this.selectedOptions).map(option => option.value);


    //     // Handle successful response
    //     $('#mar-div').html('')
    //     $('#flowsheet_div').html('') 
    //     $('#pending_request_labs_div').html('')
    //     $('#pending_request_prescriptions_div').html('')
    //     $('#pending_request_radiologies_div').html('')

    //     let data = pendingRequests

    //     console.log("pendingRequests", pendingRequests)

    //     // Filter tasks based on selected time intervals
    //     const filteredTasks = data.mar.flatMap(marItem => {
    //         const prescriptionTasks = marItem.patient_visit_prescription_tasks;
    //         const currentDate = new Date();

    //         // Filter tasks based on the selected time intervals
    //         const tasks = prescriptionTasks.filter(task => {
    //             let hoursLeftToStart = updateHours(task.start)



    //             return  selectedValues.some(val => {
    //                 if (val == 'overdue') {
    //                     return hoursLeftToStart < 0
    //                 }
    //                 return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
    //             });
    //         });


    //         return tasks.map(task => ({
    //             ...task,
    //             marId: marItem.id,
    //             patient_name: marItem?.patient_visit?.patient?.name,
    //             patient_gender: marItem?.patient_visit?.patient?.gender?.name,
    //             admitted_by: marItem?.patient_visit?.patient_visit_admissions[0]?.user?.first_name+' '+marItem?.patient_visit?.patient_visit_admissions[0]?.user?.last_name,
    //             ward_name: marItem?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name,
    //             patient_id:  marItem?.patient_visit?.patient?.id,
    //             gender_id: marItem?.patient_visit?.patient?.gender?.id,
    //             marDateCreated: marItem.date_created,
    //             // Add other 'mar' item properties as needed
    //         }));
    //     });



    //     // Assuming your flowsheet array is named 'flowsheet'
    //     const flowsheet = data.flowsheet;

    //     // Get the current date and time
    

    //     // Filter flowsheets based on the start time being in the future
    //     const upcomingFlowsheets = data.flowsheet.filter(sheet => {
    //         // const currentDate = new Date();
    //         // const sheetStartDate = new Date(sheet.start_date);
    //         // const timeLeftToStart = sheetStartDate - currentDate;
    //         // const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60);
    //         let hoursLeftToStart = updateHours(sheet.start_date)

    //         // Adjust the condition based on your specific requirements
    //         // return (
    //         //     (selectedValues.includes('old') && hoursLeftToStart >= 6) ||
    //         //     selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`)
    //         // );
    //         return  selectedValues.some(val => {
    //             if (val == 'overdue') {
    //                 return hoursLeftToStart < 0
    //             }
    //             return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
    //         });
    //     });


    //     //filter radiologies
    //     const upcomingRadiologies = data.request_radiologies.filter(radiology => {
    //         // const currentDate = new Date();
    //         // const radiologyStartDate = new Date(radiology.start_date);
    //         // const timeLeftToStart = radiologyStartDate - currentDate;
    //         // const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60);

    //         let hoursLeftToStart = updateHours(radiology.start_date)
    //         return  selectedValues.some(val => {
    //             if (val == 'overdue') {
    //                 return hoursLeftToStart < 0
    //             }
    //             return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
    //         });
    //     });

    //     const upcomingPrescriptions = data.request_prescriptions.filter(prescription => {
    //         // const currentDate = new Date();
    //         // const prescriptionStartDate = new Date(prescription.start_date);
    //         // const timeLeftToStart = prescriptionStartDate - currentDate;
    //         // const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60);

    //         // // Adjust the condition based on your specific requirements
    //         // return (
    //         //     (selectedValues.includes('old') && hoursLeftToStart >= 6) ||
    //         //     selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`)
    //         // );
    //         let hoursLeftToStart = updateHours(prescription.start_date)
    //         return  selectedValues.some(val => {
    //             if (val == 'overdue') {
    //                 return hoursLeftToStart < 0
    //             }
    //             return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
    //         });
    //     });


    //     const upcomingLabs = data.request_labs.flatMap(marItem => {
    //         const labsTasks = marItem.pending_request_labs;
    //         const currentDate = new Date();

    //         // Filter tasks based on the selected time intervals
    //         const tasks = labsTasks.filter(task => {
    //             // const timeLeftToStart = new Date(task.date_created) - currentDate;
    //             // const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60); // Convert milliseconds to hours
    //             // return selectedValues.includes('old') ? hoursLeftToStart >= 6 : selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`);
    //             let hoursLeftToStart = updateHours(task.date_created)
    //             return  selectedValues.some(val => {
    //                 if (val == 'overdue') {
    //                     return hoursLeftToStart < 0
    //                 }
    //                 return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
    //             });
    //         });

    //         return tasks.map(task => ({
    //             ...task,
    //             ...marItem
    //             // Add other 'mar' item properties as needed
    //         }));
    //     });



    //     if (upcomingFlowsheets.length > 0) {
    //         console.log("Upcoming flowsheets:", upcomingFlowsheets);
    //         upcomingFlowsheets.map(d=> {
    //             $("#flowsheet_div").append(
    //                 \`<div style="border-top:10px solid #8e44ad" class="two mt-3">
    //                     <div class="px-3 pt-2">
    //                         <h4 class="name mb-0 pb-0">\${d?.patient_visit?.patient?.name}<span
    //                                 class="badge badge-primary">\${calculateAge(d?.patient_visit?.patient.date_of_birth)}</span>
    //                             <span
    //                                 class="badge badge-secondary">\${d?.patient_visit?.patient?.gender?.name}</span>
    //                             <span class="badge badge-warning">\${d?.flow_sheet_type?.name}</span></h4>
    //                         <p class="quote2 mb-1 mt-2 pb-1">
    //                             <b>Frequency:</b> \${d?.flow_sheet_frequency?.name},
    //                             \${d?.flow_sheet_frequency?.description}<br />
    //                             <b>Admitted By</b>:
    //                             \${d?.patient_visit?.patient_visit_admissions[0]?.user?.first_name}
    //                             \${d?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
    //                         </p>
    //                     </div>
    //                     <div class="d-flex justify-content-start pl-3">
    //                         <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2">
    //                             <i class="fa fa-school"></i>
    //                             \${d?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}
    //                         </small>
    //                     </div>
    //                     <div class="d-flex justify-content-start mt-2 pl-3">
    //                         <small id="b_flowsheet_timer\${d?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                             class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                             <i style="font-size:16px" class="material-icons">timer</i>
    //                             &nbsp;<span id="flowsheet_timer\${d?.id}"></span></small>
    //                     </div>
    //                     <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                         <div class="d-flex justify-content-start mt-2">
    //                             <!-- <button class="btn btn-xs btn-primary">View</button> -->
    //                         </div>
    //                         <div class="d-flex justify-content-end align-items-center">
    //                             <div class="round">
    //                                 \${d?.patient_visit?.patient?.gender?.id == 1 ?
    //                                 '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                 :
    //                                 '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                 }
    //                                 <!-- php: // // if($sex == ){ // // echo $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); // // } // // else // // { // // echo $this->Html->image('../assets/img/nurse-100.jpg',['cl... -->
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>\`
    //             )

    //             updateCountdown(d.start_date, \`flowsheet_timer\${d?.id}\`)
    //         })
    //     } else {
    //         console.log("No upcoming flowsheets found.");
    //     }


    //     // Display or process the filtered tasks as needed
    //     if (filteredTasks.length > 0) {
    //         // console.log("Filtered tasks:", filteredTasks);
    //         // Update or display the filtered tasks in your UI
            
    //         filteredTasks.map(prescription=>{
    //             $('#mar-div').append(\`
    //                 <div style="border-top:10px solid #27ae60" class="two mt-3">
    //                     <div class="px-3 pt-2">
    //                         <h4 class="name mb-0 pb-0">\${prescription?.patient_name}<span
    //                                 class="badge badge-primary">\${calculateAge(prescription?.patient_age)}</span>
    //                             <span class="badge badge-secondary">\${prescription?.patient_gender}</span>
    //                         </h4>
    //                         <p class="quote2 mb-1 pb-1">
    //                             \${prescription?.title}<br />

    //                             <b>Admitted By</b>: \${prescription?.admitted_by}
    //                         </p>
    //                     </div>
    //                     <div class="d-flex justify-content-start pl-3">
    //                         <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2">
    //                             <i class="fa fa-school"></i>
    //                             \${prescription?.ward_name}</small>
    //                     </div>
    //                     <div class="d-flex justify-content-start mt-2 pl-3">
    //                         <small id="b_mar_timer\${prescription?.id}\${prescription.marId}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                             class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                             <i style="font-size:16px" class="material-icons">timer</i>
    //                             &nbsp;<span
    //                                 id="mar_timer\${prescription?.id}\${prescription.marId}"></span></small>
    //                     </div>
    //                     <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                         <div class="d-flex justify-content-start mt-2">
    //                             <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${prescription?.patient_id}"
    //                                 class="btn btn-xs btn-primary">View</a>
    //                         </div>
    //                         <div class="d-flex justify-content-end align-items-center">
    //                             <div class="round">
    //                                 \${prescription?.gender_id == 1 ?
    //                                 '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                 :
    //                                 '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                 }
    //                                 <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             \`)

    //             updateCountdown(prescription.start, \`mar_timer\${prescription?.id}\${prescription.marId}\`)
    //         })
    //     } else {
    //         console.log("No tasks found for the selected time intervals.");
    //         // Handle the case where no tasks match the selected time intervals
    //     }

    //     if (upcomingRadiologies.length > 0) {
    //         upcomingRadiologies.map(radio => {

    //             $('#pending_request_radiologies_div').append(\`
    //                 <div style="border-top:10px solid #fff200" class="two mt-3">
    //                     <div class="px-3 pt-2">
    //                         <h4 class="name mb-0 pb-0">\${radio?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(radio?.patient_visit?.patient.date_of_birth)}</span>
    //                         <span class="badge badge-secondary">\${radio?.patient_visit?.patient?.gender?.name}</span> </h4>
    //                         <p class="quote2 mb-1 pb-1">
    //                             \${radio?.radiology_scan?.name}<br/>
    //                             <b>Indication</b>: \${radio?.radiology_scan?.symptoms_indications}
    //                             <b>Admitted By</b>: \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
    //                         </p>
    //                     </div>
                        
    //                     <div class="d-flex justify-content-start pl-2">
    //                         <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                             <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">
    //                                 <i class="fa fa-money"></i>
    //                             </span>
    //                             <span class="mdl-chip__text">
    //                                 <strong>Insurance </strong>
    //                             </span>
    //                             <span class="mdl-chip__text" style="float: right;">
    //                                 GHS 100
    //                             </span>
    //                         </span>
    //                     </div>
    //                     <div class="d-flex justify-content-start pl-2">
    //                         <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                             <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">
    //                                 <i class="fa fa-question"></i>
    //                             </span>
    //                             <span class="mdl-chip__text">
    //                                 <strong>Not Paid </strong>
    //                             </span>
    //                             <span class="mdl-chip__text" style="float: right;">
    //                                 GHS 100
    //                             </span>
    //                         </span>
    //                     </div>
    //                     <div class="d-flex justify-content-start pl-3">
    //                         <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
    //                                 class="fa fa-school"></i>
    //                                 \${radio?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
    //                     </div>
    //                 <div class="d-flex justify-content-start mt-2 pl-3">
    //                         <small id="b_pending_request_radiologies_timer\${radio?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                             class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                             <i style="font-size:16px" class="material-icons">timer</i>
    //                             &nbsp;<span id="pending_request_radiologies_timer\${radio?.id}"></span></small>
    //                     </div>
    //                     <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                         <div class="d-flex justify-content-start mt-2">
    //                             <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${radio?.patient?.id}" class="btn btn-xs btn-primary">View</a>
    //                         </div>
    //                         <div class="d-flex justify-content-end align-items-center">
    //                             <div class="round">
    //                             \${radio?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
    //                                 <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             \`)

    //             updateCountdown(radio.date_created, \`pending_request_radiologies_timer\${radio?.id}\`)
    //         }) 
    //     } else {

    //     }

    //     if (upcomingPrescriptions.length > 0) {
    //         upcomingPrescriptions.map(prescri => {

    //             $('#pending_request_prescriptions_div').append(\`
    //                 <div style="border-top:10px solid #fff200" class="two mt-3">
    //                     <div class="px-3 pt-2">
    //                         <h4 class="name mb-0 pb-0">\${prescri?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(prescri?.patient_visit?.patient.date_of_birth)}</span>
    //                         <span class="badge badge-secondary">\${prescri?.patient_visit?.patient?.gender?.name}</span> </h4>
    //                         <p class="quote2 mb-1 pb-1">
    //                             \${prescri?.drug_stock?.drug.full_name} \${prescri?.administer_dose}<br/>
    //                             <b>Administration Frequency</b>: \${prescri?.drug_administration_frequency?.description}
    //                             <b>Admitted By</b>: \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
    //                         </p>
    //                     </div>
                        
    //                     <div class="d-flex justify-content-start pl-2">
    //                         <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                             <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">
    //                                 <i class="fa fa-money"></i>
    //                             </span>
    //                             <span class="mdl-chip__text">
    //                                 <strong>Insurance </strong>
    //                             </span>
    //                             <span class="mdl-chip__text" style="float: right;">
    //                                 GHS 100
    //                             </span>
    //                         </span>
    //                     </div>
    //                     <div class="d-flex justify-content-start pl-2">
    //                         <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                             <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">
    //                                 <i class="fa fa-question"></i>
    //                             </span>
    //                             <span class="mdl-chip__text">
    //                                 <strong>Not Paid </strong>
    //                             </span>
    //                             <span class="mdl-chip__text" style="float: right;">
    //                                 GHS 100
    //                             </span>
    //                         </span>
    //                     </div>
    //                     <div class="d-flex justify-content-start pl-3">
    //                         <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
    //                                 class="fa fa-school"></i>
    //                                 \${prescri?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
    //                     </div>
    //                 <div class="d-flex justify-content-start mt-2 pl-3">
    //                         <small id="b_pending_request_prescriptions_timer\${prescri?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                             class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                             <i style="font-size:16px" class="material-icons">timer</i>
    //                             &nbsp;<span id="pending_request_prescriptions_timer\${prescri?.id}"></span></small>
    //                     </div>
    //                     <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                         <div class="d-flex justify-content-start mt-2">
    //                             <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${prescri?.patient?.id}" class="btn btn-xs btn-primary">View</a>
    //                         </div>
    //                         <div class="d-flex justify-content-end align-items-center">
    //                             <div class="round">
    //                             \${prescri?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
    //                                 <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             \`)

    //             updateCountdown(prescri.start_date, \`pending_request_prescriptions_timer\${prescri?.id}\`)
    //         })
    //     } else {

    //     }

    //     if (upcomingLabs.length > 0) {
    //         console.log("Filtered tasks:", upcomingLabs);
    //         upcomingLabs.map(labs => {
    //             labs.pending_request_labs.map(task => {

    //                 $('#pending_request_labs_div').append(\`
    //                     <div style="border-top:10px solid #fff200" class="two mt-3">
    //                         <div class="px-3 pt-2">
    //                             <h4 class="name mb-0 pb-0">\${labs?.patient?.name}<span class="badge badge-primary">\${calculateAge(labs?.patient.date_of_birth)}</span>
    //                             <span class="badge badge-secondary">\${labs?.patient?.gender?.name}</span> </h4>
    //                             <p class="quote2 mb-1 pb-1">
    //                                 \${task?.title}<br/>

    //                                 <b>Admitted By</b>: \${labs?.patient_visit_admissions[0]?.user?.first_name} \${labs?.patient_visit_admissions[0]?.user?.last_name}
    //                             </p>
    //                         </div>
                            
    //                         <div class="d-flex justify-content-start pl-2">
    //                             <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                 <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">
    //                                     <i class="fa fa-money"></i>
    //                                 </span>
    //                                 <span class="mdl-chip__text">
    //                                     <strong>Insurance </strong>
    //                                 </span>
    //                                 <span class="mdl-chip__text" style="float: right;">
    //                                     GHS 100
    //                                 </span>
    //                             </span>
    //                         </div>
    //                         <div class="d-flex justify-content-start pl-2">
    //                             <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                 <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">
    //                                     <i class="fa fa-question"></i>
    //                                 </span>
    //                                 <span class="mdl-chip__text">
    //                                     <strong>Not Paid </strong>
    //                                 </span>
    //                                 <span class="mdl-chip__text" style="float: right;">
    //                                     GHS 100
    //                                 </span>
    //                             </span>
    //                         </div>
    //                         <div class="d-flex justify-content-start pl-3">
    //                             <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
    //                                     class="fa fa-school"></i>
    //                                     \${labs?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
    //                         </div>
    //                     <div class="d-flex justify-content-start mt-2 pl-3">
    //                             <small id="b_pending_request_labs_timer\${task?.id}\${labs.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                                 class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                                 <i style="font-size:16px" class="material-icons">timer</i>
    //                                 &nbsp;<span id="pending_request_labs_timer\${task?.id}\${labs.id}"></span></small>
    //                         </div>
    //                         <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                             <div class="d-flex justify-content-start mt-2">
    //                                 <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${labs?.patient?.id}" class="btn btn-xs btn-primary">View</a>
    //                             </div>
    //                             <div class="d-flex justify-content-end align-items-center">
    //                                 <div class="round">
    //                                 \${labs?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
    //                                     <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 \`)

    //                 updateCountdown(task.date_created, \`pending_request_labs_timer\${task?.id}\${labs.id}\`)
    //             })

    //         })
    //     } else {

    //     }

        
    
    

        
    // });

    function checkDate(date, compare) {
        var currentDate = new Date();
        var targetDate = new Date(date);
        
        // Set the time of both dates to midnight to compare only the dates
        currentDate.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);
        
        var timeDifference = targetDate - currentDate;
        var dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        
        if (dayDifference === 0) {
            return "1" == compare;;
        } else if (dayDifference === 1) {
            return "2" == compare;;
        } else if (dayDifference <= 7 && dayDifference > 0) {
            return "3" == compare;;
        } else {
            return false
        }
    }

    function filterFunction() {
        $('#mar-div').html('')
        $('#flowsheet_div').html('') 
        $('#pending_request_labs_div').html('')
        $('#pending_request_prescriptions_div').html('')
        $('#pending_request_radiologies_div').html('')
        
        let wardFilter = $('#filterCardsByWards').val()
        let timerFilter = $('#filterCardsByTimer').val()
        let patient_name = $('#search_by_patient').val()
        let date_range = $('#date-filter2').val()
        let data = {...pendingRequests}
        console.log("begin", pendingRequests)



        if (patient_name != '') {
            data = {
                ...data,
                flowsheet: filterByPatientName(data.flowsheet,  patient_name),
                mar: filterByPatientName(data.mar,  patient_name),
                infusions: filterByPatientName(data.infusions,  patient_name),
                request_labs:filterByPatientName2(data.request_labs, patient_name),
                request_radiologies: filterByPatientName(data.request_radiologies, patient_name),
                request_prescriptions: filterByPatientName(data.request_prescriptions, patient_name)
            }
            
        }
        if (wardFilter.length > 0) {
            data = {
                ...data,
                flowsheet: filterByWardId(data.flowsheet,  wardFilter),
                mar: filterByWardId(data.mar,  wardFilter),
                infusions: filterByWardId(data.infusions,  wardFilter),
                request_labs:filterByWardId2(data.request_labs, wardFilter),
                request_radiologies: filterByWardId(data.request_radiologies, wardFilter),
                request_prescriptions: filterByWardId(data.request_prescriptions, wardFilter)
            }
        }
        if (date_range != '') {
            const filteredTasks = data.mar.map(marItem => {
                const prescriptionTasks = marItem.patient_visit_prescription_tasks;

                const tasks = prescriptionTasks.filter(task => {
                    return checkDate(task.start, date_range)
                });
                // marItem.patient_visit_prescription_tasks = tasks

                return {
                    ...marItem,
                    patient_visit_prescription_tasks: tasks
                }
            });



            // Assuming your flowsheet array is named 'flowsheet'
            const flowsheet = data.flowsheet;

            // Get the current date and time
    

            // Filter flowsheets based on the start time being in the future
            const upcomingFlowsheets = data.flowsheet.filter(sheet => {
                return checkDate(sheet.start_date, date_range)
            });


            //filter radiologies
            const upcomingRadiologies = data.request_radiologies.filter(radiology => {
                return checkDate(radiology.start_date, date_range)
            });

            const upcomingPrescriptions = data.request_prescriptions.filter(prescription => {
                return checkDate(prescription.start_date, date_range)
            });


            const upcomingLabs = data.request_labs.map(marItem => {
                const labsTasks = marItem.pending_request_labs;


                const tasks = labsTasks.filter(task => {
                    return checkDate(task.date_created, date_range)
                });
                // marItem.pending_request_labs = tasks
                return {
                    ...marItem,
                    pending_request_labs: tasks
                }
            });

            data = {
                ...data,
                flowsheet: upcomingFlowsheets,
                mar: filteredTasks,
                request_labs: upcomingLabs,
                request_radiologies: upcomingRadiologies,
                request_prescriptions: upcomingPrescriptions
            }
        }
        if (timerFilter.length > 0) {
            const selectedValues = timerFilter
            const filteredTasks = data.mar.map(marItem => {
                const prescriptionTasks = marItem.patient_visit_prescription_tasks;

                // Filter tasks based on the selected time intervals
                const tasks = prescriptionTasks.filter(task => {
                    let hoursLeftToStart = updateHours(task.start)
                    return  selectedValues.some(val => {
                        if (val == 'overdue') {
                            return hoursLeftToStart < 0
                        }
                        return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
                    });
                });
                // marItem.patient_visit_prescription_tasks = tasks

                return {
                    ...marItem,
                    patient_visit_prescription_tasks: tasks
                }
            });


            // Filter flowsheets based on the start time being in the future
            const upcomingFlowsheets = data.flowsheet.filter(sheet => {

                let hoursLeftToStart = updateHours(sheet.start_date)

                return  selectedValues.some(val => {
                    if (val == 'overdue') {
                        return hoursLeftToStart < 0
                    }
                    return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
                });
            });


            //filter radiologies
            const upcomingRadiologies = data.request_radiologies.filter(radiology => {

                let hoursLeftToStart = updateHours(radiology.start_date)
                return  selectedValues.some(val => {
                    if (val == 'overdue') {
                        return hoursLeftToStart < 0
                    }
                    return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
                });
            });

            const upcomingPrescriptions = data.request_prescriptions.filter(prescription => {

                let hoursLeftToStart = updateHours(prescription.start_date)
                return  selectedValues.some(val => {
                    if (val == 'overdue') {
                        return hoursLeftToStart < 0
                    }
                    return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
                });
            });


            const upcomingLabs = data.request_labs.map(marItem => {
                const labsTasks = marItem.pending_request_labs;


                const tasks = labsTasks.filter(task => {

                    let hoursLeftToStart = updateHours(task.date_created)
                    return  selectedValues.some(val => {
                        if (val == 'overdue') {
                            return hoursLeftToStart < 0
                        }
                        return val == ('old') ? hoursLeftToStart >= 6 : (hoursLeftToStart <= parseFloat(val) && hoursLeftToStart > 0)
                    });
                });

                // marItem.pending_request_labs = tasks
                return {
                    ...marItem,
                    pending_request_labs: tasks
                }
            });

            data = {
                ...data,
                flowsheet: upcomingFlowsheets,
                mar: filteredTasks,
                request_labs: upcomingLabs,
                request_radiologies: upcomingRadiologies,
                request_prescriptions: upcomingPrescriptions
            }
        }
        console.log("FINAL", pendingRequests)

        let upcomingFlowsheets = data.flowsheet
        let upcomingRadiologies = data.request_radiologies
        let upcomingPrescriptions = data.request_prescriptions
        let filteredTasks = data.mar.flatMap(marItem => {
            const prescriptionTasks = marItem.patient_visit_prescription_tasks;
            const currentDate = new Date();

            // Filter tasks based on the selected time intervals
            const tasks = prescriptionTasks.filter(task => {
                return true
            });


            return tasks.map(task => ({
                ...task,
                marId: marItem.id,
                patient_name: marItem?.patient_visit?.patient?.name,
                patient_gender: marItem?.patient_visit?.patient?.gender?.name,
                admitted_by: marItem?.patient_visit?.patient_visit_admissions[0]?.user?.first_name+' '+marItem?.patient_visit?.patient_visit_admissions[0]?.user?.last_name,
                ward_name: marItem?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name,
                patient_id:  marItem?.patient_visit?.patient?.id,
                gender_id: marItem?.patient_visit?.patient?.gender?.id,
                marDateCreated: marItem.date_created,
                // Add other 'mar' item properties as needed
            }));
        });
        let upcomingLabs = data.request_labs.flatMap(marItem => {
            const labsTasks = marItem.pending_request_labs;
            const currentDate = new Date();

            // Filter tasks based on the selected time intervals
            const tasks = labsTasks.filter(task => {
                true
            });

            return tasks.map(task => ({
                ...task,
                ...marItem
                // Add other 'mar' item properties as needed
            }));
        });

        if (upcomingFlowsheets.length > 0) {
            console.log("Upcoming flowsheets:", upcomingFlowsheets);
            upcomingFlowsheets.map(d=> {
                $("#flowsheet_div").append(
                    \`<div style="border-top:10px solid #8e44ad" class="two mt-3">
                        <div class="px-3 pt-2">
                            <h4 class="name mb-0 pb-0">\${d?.patient_visit?.patient?.name}<span
                                    class="badge badge-primary">\${calculateAge(d?.patient_visit?.patient.date_of_birth)}</span>
                                <span
                                    class="badge badge-secondary">\${d?.patient_visit?.patient?.gender?.name}</span>
                                <span class="badge badge-warning">\${d?.flow_sheet_type?.name}</span></h4>
                            <p class="quote2 mb-1 mt-2 pb-1">
                                <b>Frequency:</b> \${d?.flow_sheet_frequency?.name},
                                \${d?.flow_sheet_frequency?.description}<br />
                                <b>Admitted By</b>:
                                \${d?.patient_visit?.patient_visit_admissions[0]?.user?.first_name}
                                \${d?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
                            </p>
                        </div>
                        <div class="d-flex justify-content-start pl-3">
                            <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2">
                                <i class="fa fa-school"></i>
                                \${d?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}
                            </small>
                        </div>
                        <div class="d-flex justify-content-start mt-2 pl-3">
                            <small id="b_flowsheet_timer\${d?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                class="p-1 px-2 d-flex align-items-center font-weight-bold">
                                <i style="font-size:16px" class="material-icons">timer</i>
                                &nbsp;<span id="flowsheet_timer\${d?.id}"></span></small>
                        </div>
                        <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                            <div class="d-flex justify-content-start mt-2">
                                <!-- <button class="btn btn-xs btn-primary">View</button> -->
                            </div>
                            <div class="d-flex justify-content-end align-items-center">
                                <div class="round">
                                    \${d?.patient_visit?.patient?.gender?.id == 1 ?
                                    '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
                                    :
                                    '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
                                    }
                                    <!-- php: // if($sex == ){ // echo $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); // } // else // { // echo $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix im... -->
                                </div>
                            </div>
                        </div>
                    </div>\`
                )

                updateCountdown(d.start_date, \`flowsheet_timer\${d?.id}\`)
            })
        } else {
            console.log("No upcoming flowsheets found.");
        }


        // Display or process the filtered tasks as needed
        if (filteredTasks.length > 0) {
            // console.log("Filtered tasks:", filteredTasks);
            // Update or display the filtered tasks in your UI
            
            filteredTasks.map(prescription=>{
                $('#mar-div').append(\`
                    <div style="border-top:10px solid #27ae60" class="two mt-3">
                        <div class="px-3 pt-2">
                            <h4 class="name mb-0 pb-0">\${prescription?.patient_name}<span
                                    class="badge badge-primary">\${calculateAge(prescription?.patient_age)}</span>
                                <span class="badge badge-secondary">\${prescription?.patient_gender}</span>
                            </h4>
                            <p class="quote2 mb-1 pb-1">
                                \${prescription?.title}<br />

                                <b>Admitted By</b>: \${prescription?.admitted_by}
                            </p>
                        </div>
                        <div class="d-flex justify-content-start pl-3">
                            <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2">
                                <i class="fa fa-school"></i>
                                \${prescription?.ward_name}</small>
                        </div>
                        <div class="d-flex justify-content-start mt-2 pl-3">
                            <small id="b_mar_timer\${prescription?.id}\${prescription.marId}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                class="p-1 px-2 d-flex align-items-center font-weight-bold">
                                <i style="font-size:16px" class="material-icons">timer</i>
                                &nbsp;<span
                                    id="mar_timer\${prescription?.id}\${prescription.marId}"></span></small>
                        </div>
                        <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                            <div class="d-flex justify-content-start mt-2">
                                <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${prescription?.patient_id}"
                                    class="btn btn-xs btn-primary">View</a>
                            </div>
                            <div class="d-flex justify-content-end align-items-center">
                                <div class="round">
                                    \${prescription?.gender_id == 1 ?
                                    '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
                                    :
                                    '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
                                    }
                                    <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                                </div>
                            </div>
                        </div>
                    </div>
                \`)

                updateCountdown(prescription.start, \`mar_timer\${prescription?.id}\${prescription.marId}\`)
            })
        } else {
            console.log("No tasks found for the selected time intervals.");
            // Handle the case where no tasks match the selected time intervals
        }

        if (upcomingRadiologies.length > 0) {
            upcomingRadiologies.map(radio => {

                $('#pending_request_radiologies_div').append(\`
                    <div style="border-top:10px solid #fff200" class="two mt-3">
                        <div class="px-3 pt-2">
                            <h4 class="name mb-0 pb-0">\${radio?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(radio?.patient_visit?.patient.date_of_birth)}</span>
                            <span class="badge badge-secondary">\${radio?.patient_visit?.patient?.gender?.name}</span> </h4>
                            <p class="quote2 mb-1 pb-1">
                                \${radio?.radiology_scan?.name}<br/>
                                <b>Indication</b>: \${radio?.radiology_scan?.symptoms_indications}
                                <b>Admitted By</b>: \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
                            </p>
                        </div>
                        

                        <div class="d-flex justify-content-start pl-3">
                            <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
                                    class="fa fa-school"></i>
                                    \${radio?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
                        </div>
                    <div class="d-flex justify-content-start mt-2 pl-3">
                            <small id="b_pending_request_radiologies_timer\${radio?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                class="p-1 px-2 d-flex align-items-center font-weight-bold">
                                <i style="font-size:16px" class="material-icons">timer</i>
                                &nbsp;<span id="pending_request_radiologies_timer\${radio?.id}"></span></small>
                        </div>
                        <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                            <div class="d-flex justify-content-start mt-2">
                                <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${radio?.patient?.id}" class="btn btn-xs btn-primary">View</a>
                            </div>
                            <div class="d-flex justify-content-end align-items-center">
                                <div class="round">
                                \${radio?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                                    <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                                </div>
                            </div>
                        </div>
                    </div>
                \`)

                updateCountdown(radio.date_created, \`pending_request_radiologies_timer\${radio?.id}\`)
            }) 
        } else {

        }

        if (upcomingPrescriptions.length > 0) {
            upcomingPrescriptions.map(prescri => {

                $('#pending_request_prescriptions_div').append(\`
                    <div style="border-top:10px solid #fff200" class="two mt-3">
                        <div class="px-3 pt-2">
                            <h4 class="name mb-0 pb-0">\${prescri?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(prescri?.patient_visit?.patient.date_of_birth)}</span>
                            <span class="badge badge-secondary">\${prescri?.patient_visit?.patient?.gender?.name}</span> </h4>
                            <p class="quote2 mb-1 pb-1">
                                \${prescri?.drug_stock?.drug.full_name} \${prescri?.administer_dose}<br/>
                                <b>Administration Frequency</b>: \${prescri?.drug_administration_frequency?.description}
                                <b>Admitted By</b>: \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
                            </p>
                        </div>
                        

                        <div class="d-flex justify-content-start pl-3">
                            <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
                                    class="fa fa-school"></i>
                                    \${prescri?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
                        </div>
                    <div class="d-flex justify-content-start mt-2 pl-3">
                            <small id="b_pending_request_prescriptions_timer\${prescri?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                class="p-1 px-2 d-flex align-items-center font-weight-bold">
                                <i style="font-size:16px" class="material-icons">timer</i>
                                &nbsp;<span id="pending_request_prescriptions_timer\${prescri?.id}"></span></small>
                        </div>
                        <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                            <div class="d-flex justify-content-start mt-2">
                                <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${prescri?.patient?.id}" class="btn btn-xs btn-primary">View</a>
                            </div>
                            <div class="d-flex justify-content-end align-items-center">
                                <div class="round">
                                \${prescri?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                                    <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                                </div>
                            </div>
                        </div>
                    </div>
                \`)

                updateCountdown(prescri.start_date, \`pending_request_prescriptions_timer\${prescri?.id}\`)
            })
        } else {

        }

        if (upcomingLabs.length > 0) {
            console.log("Filtered tasks:", upcomingLabs);
            upcomingLabs.map(labs => {
                labs.pending_request_labs.map(task => {

                    $('#pending_request_labs_div').append(\`
                        <div style="border-top:10px solid #fff200" class="two mt-3">
                            <div class="px-3 pt-2">
                                <h4 class="name mb-0 pb-0">\${labs?.patient?.name}<span class="badge badge-primary">\${calculateAge(labs?.patient.date_of_birth)}</span>
                                <span class="badge badge-secondary">\${labs?.patient?.gender?.name}</span> </h4>
                                <p class="quote2 mb-1 pb-1">
                                    \${task?.title}<br/>

                                    <b>Admitted By</b>: \${labs?.patient_visit_admissions[0]?.user?.first_name} \${labs?.patient_visit_admissions[0]?.user?.last_name}
                                </p>
                            </div>
                            

                            <div class="d-flex justify-content-start pl-3">
                                <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
                                        class="fa fa-school"></i>
                                        \${labs?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
                            </div>
                        <div class="d-flex justify-content-start mt-2 pl-3">
                                <small id="b_pending_request_labs_timer\${task?.id}\${labs.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                    class="p-1 px-2 d-flex align-items-center font-weight-bold">
                                    <i style="font-size:16px" class="material-icons">timer</i>
                                    &nbsp;<span id="pending_request_labs_timer\${task?.id}\${labs.id}"></span></small>
                            </div>
                            <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                                <div class="d-flex justify-content-start mt-2">
                                    <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${labs?.patient?.id}" class="btn btn-xs btn-primary">View</a>
                                </div>
                                <div class="d-flex justify-content-end align-items-center">
                                    <div class="round">
                                    \${labs?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                                        <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    \`)

                    updateCountdown(task.date_created, \`pending_request_labs_timer\${task?.id}\${labs.id}\`)
                })

            })
        } else {

        }


    }

    // selectElement.addEventListener('change', function () {
    //     // Get the selected values from the select element
    //     const selectedValues = Array.from(this.selectedOptions).map(option => option.value);

    //     $.ajax({
    //             url: '<!-- php: //=$this->Url->build(['controller'=>'NurseStation','action'=>'getAllTasks']) -->', // Replace with your actual API endpoint
    //             method: 'GET',
    //             dataType: 'json', // The expected response data type
    //             beforeSend: function(){
    //                 $('#mar-div').html('Loading')
    //                 $('#flowsheet_div').html('Loading')
    //                 $('#pending_request_labs_div').html('Loading')
    //                 $('#pending_request_prescriptions_div').html('Loading')
    //                 $('#pending_request_radiologies_div').html('Loading')
    //             },
    //             success: function(data) {
    //                 // Handle successful response
    //                 $('#mar-div').html('')
    //                 $('#flowsheet_div').html('') 
    //                 $('#pending_request_labs_div').html('Loading')
    //                 $('#pending_request_prescriptions_div').html('Loading')
    //                 $('#pending_request_radiologies_div').html('Loading')

    //                 // Filter tasks based on selected time intervals
    //                 const filteredTasks = data.mar.flatMap(marItem => {
    //                     const prescriptionTasks = marItem.patient_visit_prescription_tasks;
    //                     const currentDate = new Date();

    //                     // Filter tasks based on the selected time intervals
    //                     const tasks = prescriptionTasks.filter(task => {
    //                         const timeLeftToStart = new Date(task.start) - currentDate;
    //                         const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60); // Convert milliseconds to hours
    //                         return selectedValues.includes('old') ? hoursLeftToStart >= 6 : selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`);
    //                     });

    //                     return tasks.map(task => ({
    //                         ...task,
    //                         marId: marItem.id,
    //                         patient_name: marItem?.patient_visit?.patient?.name,
    //                         patient_gender: marItem?.patient_visit?.patient?.gender?.name,
    //                         admitted_by: marItem?.patient_visit?.patient_visit_admissions[0]?.user?.first_name+' '+marItem?.patient_visit?.patient_visit_admissions[0]?.user?.last_name,
    //                         ward_name: marItem?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name,
    //                         patient_id:  marItem?.patient_visit?.patient?.id,
    //                         gender_id: marItem?.patient_visit?.patient?.gender?.id,
    //                         marDateCreated: marItem.date_created,
    //                         // Add other 'mar' item properties as needed
    //                     }));
    //                 });

    //                 // Assuming your flowsheet array is named 'flowsheet'
    //                 const flowsheet = data.flowsheet;

    //                 // Get the current date and time
                

    //                 // Filter flowsheets based on the start time being in the future
    //                 const upcomingFlowsheets = data.flowsheet.filter(sheet => {
    //                 const currentDate = new Date();
    //                 const sheetStartDate = new Date(sheet.start_date);
    //                 const timeLeftToStart = sheetStartDate - currentDate;
    //                 const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60);

    //                     // Adjust the condition based on your specific requirements
    //                     return (
    //                         (selectedValues.includes('old') && hoursLeftToStart >= 6) ||
    //                         selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`)
    //                     );
    //                 });


    //                 //filter radiologies
    //                 const upcomingRadiologies = data.request_radiologies.filter(radiology => {
    //                 const currentDate = new Date();
    //                 const radiologyStartDate = new Date(radiology.start_date);
    //                 const timeLeftToStart = radiologyStartDate - currentDate;
    //                 const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60);

    //                     // Adjust the condition based on your specific requirements
    //                     return (
    //                         (selectedValues.includes('old') && hoursLeftToStart >= 6) ||
    //                         selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`)
    //                     );
    //                 });

    //                 const upcomingPrescriptions = data.request_prescriptions.filter(prescription => {
    //                 const currentDate = new Date();
    //                 const prescriptionStartDate = new Date(prescription.start_date);
    //                 const timeLeftToStart = prescriptionStartDate - currentDate;
    //                 const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60);

    //                     // Adjust the condition based on your specific requirements
    //                     return (
    //                         (selectedValues.includes('old') && hoursLeftToStart >= 6) ||
    //                         selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`)
    //                     );
    //                 });


    //                 const upcomingLabs = data.request_labs.flatMap(marItem => {
    //                     const labsTasks = marItem.pending_request_labs;
    //                     const currentDate = new Date();

    //                     // Filter tasks based on the selected time intervals
    //                     const tasks = labsTasks.filter(task => {
    //                         const timeLeftToStart = new Date(task.date_created) - currentDate;
    //                         const hoursLeftToStart = timeLeftToStart / (1000 * 60 * 60); // Convert milliseconds to hours
    //                         return selectedValues.includes('old') ? hoursLeftToStart >= 6 : selectedValues.includes(\`\${Math.floor(hoursLeftToStart)}\`);
    //                     });

    //                     return tasks.map(task => ({
    //                         ...task,
    //                         ...marItem
    //                         // Add other 'mar' item properties as needed
    //                     }));
    //                 });



    //                 if (upcomingFlowsheets.length > 0) {
    //                     console.log("Upcoming flowsheets:", upcomingFlowsheets);
    //                     upcomingFlowsheets.map(d=> {
    //                         $("#flowsheet_div").append(
    //                             \`<div style="border-top:10px solid #8e44ad" class="two mt-3">
    //                                 <div class="px-3 pt-2">
    //                                     <h4 class="name mb-0 pb-0">\${d?.patient_visit?.patient?.name}<span
    //                                             class="badge badge-primary">\${calculateAge(d?.patient_visit?.patient.date_of_birth)}</span>
    //                                         <span
    //                                             class="badge badge-secondary">\${d?.patient_visit?.patient?.gender?.name}</span>
    //                                         <span class="badge badge-warning">\${d?.flow_sheet_type?.name}</span></h4>
    //                                     <p class="quote2 mb-1 mt-2 pb-1">
    //                                         <b>Frequency:</b> \${d?.flow_sheet_frequency?.name},
    //                                         \${d?.flow_sheet_frequency?.description}<br />
    //                                         <b>Admitted By</b>:
    //                                         \${d?.patient_visit?.patient_visit_admissions[0]?.user?.first_name}
    //                                         \${d?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
    //                                     </p>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start pl-3">
    //                                     <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2">
    //                                         <i class="fa fa-school"></i>
    //                                         \${d?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}
    //                                     </small>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start mt-2 pl-3">
    //                                     <small style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                                         class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                                         <i style="font-size:16px" class="material-icons">timer</i>
    //                                         &nbsp;<span id="flowsheet_timer\${d?.id}"></span></small>
    //                                 </div>
    //                                 <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                                     <div class="d-flex justify-content-start mt-2">
    //                                         <!-- <button class="btn btn-xs btn-primary">View</button> -->
    //                                     </div>
    //                                     <div class="d-flex justify-content-end align-items-center">
    //                                         <div class="round">
    //                                             \${d?.patient_visit?.patient?.gender?.id == 1 ?
    //                                             '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                             :
    //                                             '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                             }
    //                                             <!-- php: // // if($sex == ){ // // echo $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); // // } // // else // // { // // echo $this->Html->image('../assets/img/nurse-100.jpg',['cl... -->
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>\`
    //                         )

    //                         updateCountdown(d.start_date, \`flowsheet_timer\${d?.id}\`)
    //                     })
    //                 } else {
    //                     console.log("No upcoming flowsheets found.");
    //                 }


    //                 // Display or process the filtered tasks as needed
    //                 if (filteredTasks.length > 0) {
    //                     // console.log("Filtered tasks:", filteredTasks);
    //                     // Update or display the filtered tasks in your UI
                        
    //                     filteredTasks.map(prescription=>{
    //                         $('#mar-div').append(\`
    //                             <div style="border-top:10px solid #27ae60" class="two mt-3">
    //                                 <div class="px-3 pt-2">
    //                                     <h4 class="name mb-0 pb-0">\${prescription?.patient_name}<span
    //                                             class="badge badge-primary">\${calculateAge(prescription?.patient_age)}</span>
    //                                         <span class="badge badge-secondary">\${prescription?.patient_gender}</span>
    //                                     </h4>
    //                                     <p class="quote2 mb-1 pb-1">
    //                                         \${prescription?.title}<br />

    //                                         <b>Admitted By</b>: \${prescription?.admitted_by}
    //                                     </p>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start pl-3">
    //                                     <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2">
    //                                         <i class="fa fa-school"></i>
    //                                         \${prescription?.ward_name}</small>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start mt-2 pl-3">
    //                                     <small style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                                         class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                                         <i style="font-size:16px" class="material-icons">timer</i>
    //                                         &nbsp;<span
    //                                             id="mar_timer\${prescription?.id}\${prescription.marId}"></span></small>
    //                                 </div>
    //                                 <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                                     <div class="d-flex justify-content-start mt-2">
    //                                         <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${prescription?.patient_id}"
    //                                             class="btn btn-xs btn-primary">View</a>
    //                                     </div>
    //                                     <div class="d-flex justify-content-end align-items-center">
    //                                         <div class="round">
    //                                             \${prescription?.gender_id == 1 ?
    //                                             '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                             :
    //                                             '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->'
    //                                             }
    //                                             <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         \`)

    //                         updateCountdown(prescription.start, \`mar_timer\${prescription?.id}\${prescription.marId}\`)
    //                     })
    //                 } else {
    //                     console.log("No tasks found for the selected time intervals.");
    //                     // Handle the case where no tasks match the selected time intervals
    //                 }

    //                 if (upcomingRadiologies.length > 0) {
    //                     upcomingRadiologies.map(radio => {

    //                         $('#pending_request_radiologies_div').append(\`
    //                             <div style="border-top:10px solid #fff200" class="two mt-3">
    //                                 <div class="px-3 pt-2">
    //                                     <h4 class="name mb-0 pb-0">\${radio?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(radio?.patient_visit?.patient.date_of_birth)}</span>
    //                                     <span class="badge badge-secondary">\${radio?.patient_visit?.patient?.gender?.name}</span> </h4>
    //                                     <p class="quote2 mb-1 pb-1">
    //                                         \${radio?.radiology_scan?.name}<br/>
    //                                         <b>Indication</b>: \${radio?.radiology_scan?.symptoms_indications}
    //                                         <b>Admitted By</b>: \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
    //                                     </p>
    //                                 </div>
                                    
    //                                 <div class="d-flex justify-content-start pl-2">
    //                                     <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                         <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">
    //                                             <i class="fa fa-money"></i>
    //                                         </span>
    //                                         <span class="mdl-chip__text">
    //                                             <strong>Insurance </strong>
    //                                         </span>
    //                                         <span class="mdl-chip__text" style="float: right;">
    //                                             GHS 100
    //                                         </span>
    //                                     </span>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start pl-2">
    //                                     <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                         <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">
    //                                             <i class="fa fa-question"></i>
    //                                         </span>
    //                                         <span class="mdl-chip__text">
    //                                             <strong>Not Paid </strong>
    //                                         </span>
    //                                         <span class="mdl-chip__text" style="float: right;">
    //                                             GHS 100
    //                                         </span>
    //                                     </span>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start pl-3">
    //                                     <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
    //                                             class="fa fa-school"></i>
    //                                             \${radio?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
    //                                 </div>
    //                             <div class="d-flex justify-content-start mt-2 pl-3">
    //                                     <small style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                                         class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                                         <i style="font-size:16px" class="material-icons">timer</i>
    //                                         &nbsp;<span id="pending_request_radiologies_timer\${radio?.id}"></span></small>
    //                                 </div>
    //                                 <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                                     <div class="d-flex justify-content-start mt-2">
    //                                         <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${radio?.patient?.id}" class="btn btn-xs btn-primary">View</a>
    //                                     </div>
    //                                     <div class="d-flex justify-content-end align-items-center">
    //                                         <div class="round">
    //                                         \${radio?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
    //                                             <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         \`)

    //                         updateCountdown(radio.date_created, \`pending_request_radiologies_timer\${radio?.id}\`)
    //                     }) 
    //                 } else {

    //                 }

    //                 if (upcomingPrescriptions.length > 0) {
    //                     upcomingPrescriptions.map(prescri => {

    //                         $('#pending_request_prescriptions_div').append(\`
    //                             <div style="border-top:10px solid #fff200" class="two mt-3">
    //                                 <div class="px-3 pt-2">
    //                                     <h4 class="name mb-0 pb-0">\${prescri?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(prescri?.patient_visit?.patient.date_of_birth)}</span>
    //                                     <span class="badge badge-secondary">\${prescri?.patient_visit?.patient?.gender?.name}</span> </h4>
    //                                     <p class="quote2 mb-1 pb-1">
    //                                         \${prescri?.drug_stock?.drug.full_name} \${prescri?.administer_dose}<br/>
    //                                         <b>Administration Frequency</b>: \${prescri?.drug_administration_frequency?.description}
    //                                         <b>Admitted By</b>: \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
    //                                     </p>
    //                                 </div>
                                    
    //                                 <div class="d-flex justify-content-start pl-2">
    //                                     <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                         <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">
    //                                             <i class="fa fa-money"></i>
    //                                         </span>
    //                                         <span class="mdl-chip__text">
    //                                             <strong>Insurance </strong>
    //                                         </span>
    //                                         <span class="mdl-chip__text" style="float: right;">
    //                                             GHS 100
    //                                         </span>
    //                                     </span>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start pl-2">
    //                                     <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                         <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">
    //                                             <i class="fa fa-question"></i>
    //                                         </span>
    //                                         <span class="mdl-chip__text">
    //                                             <strong>Not Paid </strong>
    //                                         </span>
    //                                         <span class="mdl-chip__text" style="float: right;">
    //                                             GHS 100
    //                                         </span>
    //                                     </span>
    //                                 </div>
    //                                 <div class="d-flex justify-content-start pl-3">
    //                                     <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
    //                                             class="fa fa-school"></i>
    //                                             \${prescri?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
    //                                 </div>
    //                             <div class="d-flex justify-content-start mt-2 pl-3">
    //                                     <small style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                                         class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                                         <i style="font-size:16px" class="material-icons">timer</i>
    //                                         &nbsp;<span id="pending_request_prescriptions_timer\${prescri?.id}"></span></small>
    //                                 </div>
    //                                 <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                                     <div class="d-flex justify-content-start mt-2">
    //                                         <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${prescri?.patient?.id}" class="btn btn-xs btn-primary">View</a>
    //                                     </div>
    //                                     <div class="d-flex justify-content-end align-items-center">
    //                                         <div class="round">
    //                                         \${prescri?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
    //                                             <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         \`)

    //                         updateCountdown(prescri.start_date, \`pending_request_prescriptions_timer\${prescri?.id}\`)
    //                     })
    //                 } else {

    //                 }

    //                 if (upcomingLabs.length > 0) {
    //                     console.log("Filtered tasks:", upcomingLabs);
    //                     upcomingLabs.map(labs => {
    //                         labs.pending_request_labs.map(task => {

    //                             $('#pending_request_labs_div').append(\`
    //                                 <div style="border-top:10px solid #fff200" class="two mt-3">
    //                                     <div class="px-3 pt-2">
    //                                         <h4 class="name mb-0 pb-0">\${labs?.patient?.name}<span class="badge badge-primary">\${calculateAge(labs?.patient.date_of_birth)}</span>
    //                                         <span class="badge badge-secondary">\${labs?.patient?.gender?.name}</span> </h4>
    //                                         <p class="quote2 mb-1 pb-1">
    //                                             \${task?.title}<br/>

    //                                             <b>Admitted By</b>: \${labs?.patient_visit_admissions[0]?.user?.first_name} \${labs?.patient_visit_admissions[0]?.user?.last_name}
    //                                         </p>
    //                                     </div>
                                        
    //                                     <div class="d-flex justify-content-start pl-2">
    //                                         <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                             <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">
    //                                                 <i class="fa fa-money"></i>
    //                                             </span>
    //                                             <span class="mdl-chip__text">
    //                                                 <strong>Insurance </strong>
    //                                             </span>
    //                                             <span class="mdl-chip__text" style="float: right;">
    //                                                 GHS 100
    //                                             </span>
    //                                         </span>
    //                                     </div>
    //                                     <div class="d-flex justify-content-start pl-2">
    //                                         <span class="mdl-chip mdl-chip--contact" style="min-width: 200px;">
    //                                             <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">
    //                                                 <i class="fa fa-question"></i>
    //                                             </span>
    //                                             <span class="mdl-chip__text">
    //                                                 <strong>Not Paid </strong>
    //                                             </span>
    //                                             <span class="mdl-chip__text" style="float: right;">
    //                                                 GHS 100
    //                                             </span>
    //                                         </span>
    //                                     </div>
    //                                     <div class="d-flex justify-content-start pl-3">
    //                                         <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
    //                                                 class="fa fa-school"></i>
    //                                                 \${labs?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
    //                                     </div>
    //                                 <div class="d-flex justify-content-start mt-2 pl-3">
    //                                         <small style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
    //                                             class="p-1 px-2 d-flex align-items-center font-weight-bold">
    //                                             <i style="font-size:16px" class="material-icons">timer</i>
    //                                             &nbsp;<span id="pending_request_labs_timer\${task?.id}\${labs.id}"></span></small>
    //                                     </div>
    //                                     <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
    //                                         <div class="d-flex justify-content-start mt-2">
    //                                             <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${labs?.patient?.id}" class="btn btn-xs btn-primary">View</a>
    //                                         </div>
    //                                         <div class="d-flex justify-content-end align-items-center">
    //                                             <div class="round">
    //                                             \${labs?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
    //                                                 <!-- php: // // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 's... -->
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             \`)

    //                             updateCountdown(task.date_created, \`pending_request_labs_timer\${task?.id}\${labs.id}\`)
    //                         })
        
    //                     })
    //                 } else {

    //                 }

                    
                
                
    //             },
    //             error: function(xhr, status, error) {
    //                 // Handle error
    //                 console.error('Error:', status, error);
    //             }
    //         })

        
    // });

    function getPendingRequestCards(data){
        data.request_labs.map(labs => {
               labs.pending_request_labs.map(task => {

                $('#pending_request_labs_div').append(\`
                    <div style="border-top:10px solid #fff200" class="two mt-3">
                        <div class="px-3 pt-2">
                            <h4 class="name mb-0 pb-0">\${labs?.patient?.name}<span class="badge badge-primary">\${calculateAge(labs?.patient.date_of_birth)}</span>
                            <span class="badge badge-secondary">\${labs?.patient?.gender?.name}</span> </h4>
                            <p class="quote2 mb-1 pb-1">
                                \${task?.title}<br/>

                                <b>Admitted By</b>: \${labs?.patient_visit_admissions[0]?.user?.first_name} \${labs?.patient_visit_admissions[0]?.user?.last_name}
                            </p>
                        </div>
                        

                        <div class="d-flex justify-content-start pl-3">
                            <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
                                    class="fa fa-school"></i>
                                    \${labs?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
                        </div>
                       <div class="d-flex justify-content-start mt-2 pl-3">
                            <small id="b_pending_request_labs_timer\${task?.id}\${labs.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                                class="p-1 px-2 d-flex align-items-center font-weight-bold">
                                <i style="font-size:16px" class="material-icons">timer</i>
                                &nbsp;<span id="pending_request_labs_timer\${task?.id}\${labs.id}"></span></small>
                        </div>
                        <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                            <div class="d-flex justify-content-start mt-2">
                                <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${labs?.patient?.id}" class="btn btn-xs btn-primary">View</a>
                            </div>
                            <div class="d-flex justify-content-end align-items-center">
                                <div class="round">
                                \${labs?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                                    <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                                </div>
                            </div>
                        </div>
                    </div>
                \`)

                updateCountdown(task.date_created, \`pending_request_labs_timer\${task?.id}\${labs.id}\`)
            })
        
        })
     
        data.request_radiologies.map(radio => {

            $('#pending_request_radiologies_div').append(\`
                <div style="border-top:10px solid #fff200" class="two mt-3">
                    <div class="px-3 pt-2">
                        <h4 class="name mb-0 pb-0">\${radio?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(radio?.patient_visit?.patient.date_of_birth)}</span>
                        <span class="badge badge-secondary">\${radio?.patient_visit?.patient?.gender?.name}</span> </h4>
                        <p class="quote2 mb-1 pb-1">
                            \${radio?.radiology_scan?.name}<br/>
                            <b>Indication</b>: \${radio?.radiology_scan?.symptoms_indications}
                            <b>Admitted By</b>: \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${radio?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
                        </p>
                    </div>
                    

                    <div class="d-flex justify-content-start pl-3">
                        <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
                                class="fa fa-school"></i>
                                \${radio?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
                    </div>
                <div class="d-flex justify-content-start mt-2 pl-3">
                        <small id="b_pending_request_radiologies_timer\${radio?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                            class="p-1 px-2 d-flex align-items-center font-weight-bold">
                            <i style="font-size:16px" class="material-icons">timer</i>
                            &nbsp;<span id="pending_request_radiologies_timer\${radio?.id}"></span></small>
                    </div>
                    <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                        <div class="d-flex justify-content-start mt-2">
                            <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${radio?.patient?.id}" class="btn btn-xs btn-primary">View</a>
                        </div>
                        <div class="d-flex justify-content-end align-items-center">
                            <div class="round">
                            \${radio?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                                <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                            </div>
                        </div>
                    </div>
                </div>
            \`)

                updateCountdown(radio.date_created, \`pending_request_radiologies_timer\${radio?.id}\`)
        })

        data.request_prescriptions.map(prescri => {

            $('#pending_request_prescriptions_div').append(\`
                <div style="border-top:10px solid #fff200" class="two mt-3">
                    <div class="px-3 pt-2">
                        <h4 class="name mb-0 pb-0">\${prescri?.patient_visit?.patient?.name}<span class="badge badge-primary">\${calculateAge(prescri?.patient_visit?.patient.date_of_birth)}</span>
                        <span class="badge badge-secondary">\${prescri?.patient_visit?.patient?.gender?.name}</span> </h4>
                        <p class="quote2 mb-1 pb-1">
                            \${prescri?.drug_stock?.drug.full_name} \${prescri?.administer_dose}<br/>
                            <b>Administration Frequency</b>: \${prescri?.drug_administration_frequency?.description}
                            <b>Admitted By</b>: \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.first_name} \${prescri?.patient_visit?.patient_visit_admissions[0]?.user?.last_name}
                        </p>
                    </div>
                    

                    <div class="d-flex justify-content-start pl-3">
                        <small style="border-radius:5px;" class="bg-success font-weight-bold p-1 px-2"> <i
                                class="fa fa-school"></i>
                                \${prescri?.patient_visit?.patient_visit_admissions[0]?.bed?.ward?.name}</small>
                    </div>
                <div class="d-flex justify-content-start mt-2 pl-3">
                        <small id="b_pending_request_prescriptions_timer\${prescri?.id}" style="border-radius:5px;background:#e74c3c33; color:#e74c3c;"
                            class="p-1 px-2 d-flex align-items-center font-weight-bold">
                            <i style="font-size:16px" class="material-icons">timer</i>
                            &nbsp;<span id="pending_request_prescriptions_timer\${prescri?.id}"></span></small>
                    </div>
                    <div class="d-flex justify-content-between  px-3 align-items-center pb-3 mt-3">
                        <div class="d-flex justify-content-start mt-2">
                            <a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient']) -->/\${prescri?.patient?.id}" class="btn btn-xs btn-primary">View</a>
                        </div>
                        <div class="d-flex justify-content-end align-items-center">
                            <div class="round">
                            \${prescri?.patient?.gender?.id == 1 ? '<!-- php: = $this->Html->image('../assets/img/dp.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' : '<!-- php: = $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'img-fix img-circle user-img-circle', 'style' => 'width:50px']); -->' }
                                <!-- php: // if(null !==($this->request->getSession()->read()['Auth']['User']['image'])) { // echo $this->Html->image($this->request->getSession()->read()['Auth']['User']['image']['file_path'],['class' =>'img-fix img-circle user-img-circle', 'style' ... -->
                            </div>
                        </div>
                    </div>
                </div>
            \`)

            updateCountdown(prescri.start_date, \`pending_request_prescriptions_timer\${prescri?.id}\`)
        })
    }

    $('#labs_check').on('change', function(){
        if(!$(this).is(':checked')){
            $('#labs-wrapper').hide()
        } else {
            $('#labs-wrapper').show()
        }
    })

    $('#radiology_check').on('change', function(){
        if(!$(this).is(':checked')){
            $('#radiology-wrapper').hide()
        } else {
            $('#radiology-wrapper').show()
        }
    })

    $('#prescriptions_check').on('change', function(){
        if(!$(this).is(':checked')){
            $('#prescription-wrapper').hide()
        } else {
            $('#prescription-wrapper').show()
        }
    })

    function calculateLengthOfStay(checkInDate) {
    // Parse the input string to create a Date object for check-in
        const checkIn = new Date(checkInDate);

        // Create a Date object for the current date and time
        const currentDateTime = new Date();

        // Calculate the difference in milliseconds
        const differenceInMs = currentDateTime - checkIn;

        // Calculate the difference in days
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

         // Calculate months, weeks, and remaining days
        const months = Math.floor(differenceInDays / 30);
        const weeks = Math.floor((differenceInDays % 30) / 7);
        const remainingDays = Math.floor(differenceInDays % 7);

        // Format the result as a string
        let resultString = '';
        if (months > 0) {
            resultString += \`\${months} \${months === 1 ? 'month' : 'months'}, \`;
        }
        if (weeks > 0) {
            resultString += \`\${weeks} \${weeks === 1 ? 'week' : 'weeks'}, \`;
        }
        if (remainingDays > 0) {
            resultString += \`\${remainingDays} \${remainingDays === 1 ? 'day' : 'days'}\`;
        }

        return resultString;
    }
    

    $("#visitNurseNoteForm").submit(function (e) {
		e.preventDefault();
		if(confirm('Are you sure you want to submit ?')) {
			
			$.ajax({
				type: "POST",
				url: \`<!-- php: = $this->Url->build(['controller' => 'PatientVisitNurseNotes', 'action' => 'addNurseNote',]) -->/\${$('#patient_id').val()}/\${$('#visit_id').val()}\`,
				data: {
					title: "Nurse's Note",
					notes: $('#remarkEditor').val(),
                    visit_id: $('#visit_id').val(),
                    patient_id: $('#patient_id').val(),
				},
				success: function g(data, textStatus) {
                    alertify.log(data)

				},
				fail: function g(xhr, textStatus, errorThrown) {
					alertify.error('Error Occured. Please try again');
						// console.log(xhr);
				}
			});
		}
	});

    
    </script>

`;

export default function ElementElementNurseStationNurseStation() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
