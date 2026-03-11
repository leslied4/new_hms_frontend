const rawHtml = `
<div class="row">

    <div class="borderBox light bordered col-md-12">
        
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="actionable_tab">
                    <!-- <h4>Add a new Invoice</h4> -->

                    <div class="container-fluid px-2">
                        <!-- <div style="position:relative" class="alert alert-primary bg-primary border-0 text-slate-900  animated flipInX delay-04s"
                            role="alert">
                            <i class="fa fa-envelope opacity-05 mr-2"></i>
                            Total SMS Sent (2/100)
                            <br> <h6 style="text-decoration:underline;cursor:pointer;" class="text-slate-900 font-weight-bold mb-0 ml-0 mt-1">View all</h6>
                            <button style="position:absolute;right:0;top:10px;right:10px;" type="button" class="close" aria-label="Close">
                                <span aria-hidden="true" style="text-shadow: none;">&times;</span>
                            </button>
                        </div> -->
                        <div class="row justify-content-center">
                            <div style="position:relative" class="container-fluid text-center p-3 mt-3 mb-2">
                            <div class="d-flex align-items-center justify-content-end">
                                            <button style="background:transparent;" onclick="resetRoutineCare()" class="btn btn-xs d-flex align-items-center">
                                                <i class="fa fa-refresh"></i>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important" class="font-weight-bold">Reset</h5></button>
                                            </div>
                                <div style="position:relative;px;z-index:2;" class="container-fluid pl=0">
                                    <div class="row">
                                        <div class="col-md-2 pl-0">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('>30days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#8e44ad;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">>30 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('21-28days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#3867d6;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">21-29 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('14-21days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#26de81;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">14-21 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('7-14days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#fff200;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">7-14 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('0-7days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:tomato;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">0-7 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterByStatus('overdue')" style="background-color:#ff634712" class="btn btn-xs d-flex align-items-center">
                                                <!-- <div style="height:15px;width:15px;border-radius:100px;cursor:pointer;" class="indicator bg-danger"></div> -->
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold text-danger">Overdue</h5></button>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                </div>
                                    <div class="table-responsive mt-2">
                                        <table id="work-order-table" class="table">
                                            <thead>
                                                <tr>
                                                    <th style="width:1%;!important"></th>
                                                    <th style="width:10%!important">Due Date</th>
                                                    <th style="width:20%!important">Patient</th>
                                                    <th>Doctor</th>
                                                    <!-- <th>MDC</th> -->
                                                    <th>Type</th>
                                                    <th>Details</th>
                                                    <th>Next Assignment</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="patient-routine-table"></tbody>
                                        </table>


                                    </div>

                                </div>
                        </div>
                    </div>

                </div>


                <div class="tab-pane" id="snoozed_tab">
                    <!-- border border-left-0 border-right-0 border-bottom-0 border-3 border-primary  -->
                    <div class="card mt-3  card-box">
                        <div class="card-body">
                            <div class="container-fluid py-2 mt-4">

                                <div class="table-responsive mt-2">



                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>
<div class="modal fade" id="cancel_routine" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-danger">
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Are you sure you want to cancel routine care ?</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <h4 class="text-secondary">This routine care will be cancelled and cannot be undone</h4>
                  
                </div>
            </div>
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center py-1 justify-content-end">
                <form id="cancelRoutineCareForm">
               <!-- php: //= $this->Form->create(null, ['id'=>'cancelRoutineCareForm','url' => ['controller' => 'Patients', 'action' => 'canceRoutineCare']]); -->
               <input type="hidden" name="id" id="cancel_id"/>
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                  <!-- php: //= $this->Form->end() -->
                  </form>
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="reschedule_routine" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-danger">
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Are you sure you want to reschedule routine care ?</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <!-- <h4 class="text-secondary">This routine care will be cancelled and cannot be undone</h4> -->
                   <form id="rescheduleRoutineCareForm">
                    <div class="row">
                        <div class="col-md-2 d-flex align-items-center">Date</div>
                        <div class="col-md-7">
                            <input type="datetime-local" class="form-control" name="reschedule_date" id="reschedule_date">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center py-1 justify-content-end">
              
               <!-- php: = $this->Form->create(null, ['id'=>'rescheduleRoutineCareForm','url' => ['controller' => 'Patients', 'action' => 'rescheduleRoutineCare']]); -->
               <input type="hidden" name="id" id="reschedule_id"/>
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                  <!-- php: = $this->Form->end() -->
                  </form>
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<div class="modal fade bd-example-modal-lg" id="createVisit" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Create Session Visit <span id="session_infomation_info"></span></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body create_visit">

            </div>
        </div>
    </div>
</div>



<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->

<!-- php: = $this->Html->script('../assets/plugins/datatables/jquery.dataTables.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/dataTables.buttons.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/jszip.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/pdfmake.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.html5.min.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/vfs_fonts.js'); -->
<!-- php: = $this->Html->script('../assets/plugins/datatables/buttons.print.min.js'); -->

<script>
    
    function createSessionVisitModal(id, name='createVisit') {
        $('#' + name).modal()
        $('.modal-body.create_visit').load(
            "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'createSessionVisit',]) -->/"+id,
            function () {
                $('#' + name).modal({
                    show: true
                });
            });
    }

    function getRoutineCare(){
        // $('#patient-routine-table').html("");
        // table.destroy();
        $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'actionable']) -->',
        type: 'GET',
        success: function(res){
            // console.log(res);
            // var data = JSON.parse(res);
            // table.destroy();
            $('#patient-routine-table').html(res.table);
            const table = $("#work-order-table").DataTable( {
                "dom": 'Bfrtip',
                "order": [],
                "displayLength": 100,
            });
           
            // table.draw();   
            // $("#work-order-table").DataTable({
            //     buttons:['searchBuilder'],
            //     dom: 'QBfrtip', "ordering": false,
            // });
        },
        error: function(err){
            console.log("error");
        }
        })
        // table.draw();
    }

    function resetRoutineCare(){
        // $('#patient-routine-table').html("");
        // table.destroy();
        $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'actionable']) -->',
        type: 'GET',
        success: function(res){
            // console.log(res);
            $("#work-order-table").DataTable().destroy();
            $('#patient-routine-table').html(res.table);
            // $("#work-order-table").DataTable();
        
            $("#work-order-table").DataTable( {
                "dom": 'Bfrtip',
                "order": [],
                "displayLength": 100,
            });
        },
        error: function(err){
            console.log("error");
        }
        })
        // table.draw();
    }
    function filterByStatus(status){
        $('#patient-routine-table').html("");
        $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRoutineByStatus']) -->',
        type: 'POST',
        data: {status: status},
        success: function(res){
            // console.log(res);
            // var data = JSON.parse(res);
            $("#work-order-table").DataTable().destroy();
            $('#patient-routine-table').html(res);
            // $("#work-order-table").DataTable();
        
            $("#work-order-table").DataTable( {
                "dom": 'Bfrtip',
                "order": [],
                "displayLength": 100,
            });
        },
        error: function(err){
            console.log("error");
        }
    })
    }
    getRoutineCare();

    function cancelRoutineCare(id){
        $("#cancel_routine").modal("show");
        $("#cancel_id").val(id);
    }
    function rescheduleModal(id){
        $("#reschedule_routine").modal("show");
        $("#reschedule_id").val(id);
    }
    function notify_assignee(id){
        if (!confirm("Confirm Doctor Notification")) {
            return
        }
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'notifyAssignee']) -->/' + id,
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);
                console.log(res);
                // alertify
                alertify.success(res);
                getRoutineCare();
                $("#cancel_routine").modal("hide");
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");
    
            }
        });
    }

    $("#cancelRoutineCareForm").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'cancelRoutineCare']) -->',
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);
                console.log(res);
                // alertify
                alertify.success(res.message);
                getRoutineCare();
                $("#cancel_routine").modal("hide");
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");

            }
        });
    });
    $("#rescheduleRoutineCareForm").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'rescheduleRoutineCare']) -->',
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                var data = JSON.parse(res);
                console.log(data);
                // alertify
                alertify.success(data.message);
                getRoutineCare();
                $("#reschedule_routine").modal("hide");
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");

            }
        });
    });
  
</script>
`;

export default function ElementElementPatientRoutineOverview() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
