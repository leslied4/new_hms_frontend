const rawHtml = `
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="card-head">
            <header>Reminders </header>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="">

                    <div class="container-fluid px-2">

                        <div class="row justify-content-center">
                            <div style="position:relative" class="container-fluid text-center p-3 mt-3 mb-2">

                                <div style="position:relative;px;z-index:2;" class="container-fluid pl=0">
                                    <div class="row">
                                       

                                        <div class="table-responsive mt-2">
                                            <table class="table" id="reminder-order-table">
                                                <thead>
                                                    <tr>
                                                        <th>Due Date</th>
                                                        <th>name</th>
                                                        <th>Phone</th>
                                                        <th>Email</th>
                                                        <th>Subject</th>
                                                        <th>Status</th>
                                                        <th>Type</th>
                                                        <th>Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody id="reminderTable"></tbody>
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
</div>

<div class="modal fade" id="showMessage" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-danger">
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Message Body</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <h4 class="text-secondary" id="messageBody"></h4>
                  
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

<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>
    
    function getRoutineReminders() {

        $.ajax({
        url: '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getRoutineReminders', '2']) -->',
        type: 'GET',
        success: function(res){
            let result = []
            res.forEach(ele => {
                result.push(\`
                <tr>
                    <td>\${new Date(ele.due_date).toDateString()}</td>
                    <td>\${ele.first_name} \${ele.last_name}</td>
                    <td>\${ele.phone || ele.phone}</td>
                    <td>\${ele.email || ele.phone}</td>
                    <td>\${ele.subject}</td>
                    <td>\${ele.date_delivered ? new Date(ele.date_delivered).toDateString() : 'Pending'}</td>
                    <td>\${ele.message_type}</td>
                    <td><button class="btn btn-xs" onclick='javascript:appendMessage(\${JSON.stringify(ele.body)})'>View</button></td>
                </tr>
                \`)
            });

            $('#reminderTable').html(result.join(""));
            var table = $("#reminder-order-table").DataTable( {
                "order": [],
                "stateSave": true,
                "displayLength": 25,
            } );

        },
        error: function(err){
            console.log("error");
        }
        })
    };

    function appendMessage(body) {
        $("#showMessage").modal("show");
        $("#messageBody").html(body);
    }

    getRoutineReminders()
    console.log("it came here")
  
</script>
`;

export default function ElementElementBookBookAppointment() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
