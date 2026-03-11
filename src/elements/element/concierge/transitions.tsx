const rawHtml = `

<style>
    .black_button {
        color:white;
        background: #6c757d;
    }
    .white_button {
        color:black;
        background: white;
    }
</style>
<div class="row">

    <div class="borderBox light bordered col-md-12">
        
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="actionable_tab">
                    <!-- <h4>Add a new Invoice</h4> -->

                    <div class="px-2">

                        <div class="row justify-content-center">
                            <div style="" class="container-fluid text-center p-3 mt-3 mb-2">
                                <div style="z-index:2;" class="container-fluid pl=0">
                                    <div class="row justify-content-between">
                                        <div class="pl-0">
                                            <button style="background:transparent;" onclick="resetRoutineCare()" class="btn btn-xs d-flex align-items-center">
                                                <i class="fa fa-refresh"></i>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important" class="font-weight-bold">Reset</h5></button>
                                        </div>
                                        <div class=" pl-0">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterTransitionByStatus('>30days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#8e44ad;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">>30 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterTransitionByStatus('21-28days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#3867d6;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">21-29 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterTransitionByStatus('14-21days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#26de81;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">14-21 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterTransitionByStatus('7-14days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:#fff200;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">7-14 days</h5></button>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="d-flex align-items-center justify-content-start">
                                            <button onclick="filterTransitionByStatus('0-7days')" style="background:transparent;" class="btn btn-xs d-flex align-items-center">
                                                <div style="height:15px;width:15px;border-radius:100px;background-color:tomato;cursor:pointer;" class="indicator"></div>
                                                &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">0-7 days</h5></button>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                </div>
                                    <div class=" mt-2">
                                        <table class="table table-hover order-column full-width" id="transitions" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Birthday</th>
                                                    <th>Patient</th>
                                                    <th>New Age</th>
                                                    <th>Contact Details</th>
                                                    <th>Last Visit</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                        <input type="hidden"  id="mdc_selector">

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
                  <h4 class="text-slate-900 my-0">Are you sure you want to cancel Booking ?</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <h4 class="text-secondary">This Booking will be cancelled and cannot be undone</h4>
                   <form id="cancelRoutineCareForm">
                    <div class="d-flex align-items-center">

    
                        <label>Inform Patient of Reschedule?</label>
                        <div class="d-flex justify-content-center ml-1">
                            <div>
                                <input type="radio" class="" name="inform_patient" value="email" id="email">
                                <label for="email">Email</label>
                            </div>
                            <div>
                                <input type="radio" class="" name="inform_patient" value="sms" id="sms">
                                <label for="sms">SMS</label>
                            </div>
                            <div>
                                <input type="radio" class="" name="inform_patient" value="autocall" id="autocall">
                                <label for="autocall">Autocall</label>
                            </div>
                            <div>
                                <input type="radio" class="" name="inform_patient" value="none" id="none">
                                <label for="none">None</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center py-1 justify-content-end">
                
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
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>

    function getAge(dateString) {
		var ageInMilliseconds = new Date() - new Date(dateString);
		return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
	}

    function requestTransitions(status) {
        table = $('#transitions').DataTable();
        table.destroy();
        $('#transitions').DataTable({
            "ordering": false,
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Concierge', 'action' => 'patientTransitions',]) -->",
                data: {
                    status: status
                },
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "date_of_birth",
                    render: function(data, type, row) {
                        return \`<div style="height:15px;width:15px;border-radius:100px;background-color:\${row.color}" class="indicator mr-2"></div>\`                    }
                },
                {
                    data: "date_of_birth",
                    render: function(data, type, row) {
                        birthday = moment(row.date_of_birth).format('2024-MM-DD')
                        return moment(birthday).format('dddd. DD/MM/YYYY')
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        gender = row?.gender_id == 1 ?  'Male': 'Female' 
                        age = getAge(row.date_of_birth)
                        return \`\${row?.first_name} \${row?.last_name} <span class="badge badge-primary">\${gender}</span> \${row.date_of_birth == undefined ? '': '<span class="badge badge-success">' + age + ' yrs </span>'}\`
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        age = getAge(row.date_of_birth)
                        return \`\${row.date_of_birth == undefined ? '': '<span class="badge badge-success">' + (parseInt(age) + 1) + ' yrs </span>'}\`
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''
                        
                        return \`\${row.email || ''} \${row.phone || ''}\`
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''
                        
                        return  (row.patient_visits[0]) ? moment(row.patient_visits[0]?.date_created).format('DD/MM/YYYY, hh:mm A') : ''
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''
                        
                        return  \`
                            <button class="btn btn-xs">Sms Note</button>
                            <button class="btn btn-xs">Email Note</button>
                            <button class="btn btn-xs">Attach Card to Email</button>
                        \`
                    }
                },
            ]
        });
    };

    function filterTransitionByStatus(status){
        requestTransitions(status);
        
    }
    
    $(document).ready(function () {
        requestTransitions('');
    })






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

  
</script>

`;

export default function ElementElementConciergeTransitions() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
