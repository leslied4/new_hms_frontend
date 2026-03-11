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
                        <div  class="d-flex justify-content-end">
                            <a onclick="sessionModal('session_modal')" target="_blank" class="btn btn-primary " style="">
                                Create Session
                            </a>
                        </div>
                        <div class="row justify-content-center">
                            <div style="" class="container-fluid text-center p-3 mt-3 mb-2">
                                <div style="z-index:2;" class="container-fluid pl=0">
                                    
                                </div>
                                    <div class=" mt-2">
                                        <table class="table table-hover order-column full-width" id="view_session">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">Date</th>
                                                    <th style="text-align: center">Name</th>
                                                    <th style="text-align: center">Amount</th>
                                                    <th style="text-align: center">User</th>
                                                    <th style="text-align: center">Status</th>
                                                    <th style="text-align: center">Type</th>
                                                    <th style="text-align: center">Actions</th>
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

<div class="modal fade bd-example-modal-lg" id="session_modal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="min-width: 95vw" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Create Session</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body discharge_summary">

            </div>
        </div>
    </div>
</div>

<div class="modal fade bd-example-modal-lg" id="configure_session_modal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Session</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body configuration">

            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="edit_session" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 600px">
	<div class="modal-content">
		<div class="modal-header">
		<h4 class="modal-title" id="exampleModalLongTitle">Edit Session</h4>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		</div>
		<div class="modal-body">
		
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<div class="card card-box">

					<div class="card-body" id="bar-parent">
				

					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Sessions', 'action' => 'editSession']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Title
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="hidden" id="editForm_id" name="id">
								<input type="text" name="code" id="edit_title" data-required="1" placeholder="Enter Title" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Price
								
							</label>
							<div class="col-md-5">
								<input name="amount" id="edit_price" data-required="0" placeholder="Enter price" class="form-control input-height" /> 
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearHealthFacilityFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->

					</div>
				</div>
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

    function requestSessions(status) {
        table = $('#view_session').DataTable();
        table.destroy();
        $('#view_session').DataTable({
            "ordering": false,
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'sessionPrograms',]) -->",
                data: {
                    status: status
                },
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "",
                    render: function(data, type, row) {
                        return moment(row?.date_added).format('DD/MM/YYYY, hh:mm A')
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row?.code
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row?.amount
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row?.user?.first_name} \${row?.user?.last_name}\`
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.status == '1' ? "Active" : "Disabled"
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.session_type == '1' ? "Facility" : "Personal"
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        btn = ''//'<button class="btn btn-xs btn-info">view</button>'
                        btn += \`<button class="btn btn-xs btn-info" onclick="configureSessionModal('\${row.id}')">View</button>\`
                        btn += \`<button class="btn btn-xs btn-\${(row.status == '1' ? "danger" : "success")}" onclick="toggleSession('\${row.id}', \${row.status})">\${(row.status == '1' ? "Disable" : "Enable")}</button>\`
                        btn += \`<button class="btn btn-xs btn-warning" href="javascript:" data-toggle="modal" onclick="setEditModalValues('\${row.id}','\${row.code}','\${row.amount}',)" data-target="#edit_session">Edit</button>\`
                        return btn
                    }
                },
                
            ]
        });
    };

    function setEditModalValues(editForm_id,edit_title,edit_price) {
		$('#editForm_id').val(editForm_id)
		$('#edit_title').val(edit_title)
		$('#edit_price').val(edit_price)
	}

    $(document).ready(function () {
        requestSessions('');
    })

    function sessionModal(name) {
        $('.modal-body.discharge_summary').load(
            "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'createSession',]) -->",
            function () {
                $('#' + name).modal({
                    show: true
                });
            });
    }
    function configureSessionModal(id, name='configure_session_modal') {
        $('.modal-body.configuration').load(
            "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'configureSession',]) -->/"+id,
            function () {
                $('#' + name).modal({
                    show: true
                });
            });
    }

    function toggleSession(id, status) {
        if (!confirm(\`Are you sure you want to \${(status == '1' ? "Disable" : "Enable")}\`)) {
            return
        }
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'toggleSession']) -->/' + id,
            type:'POST',
            data: {
                status: (status == '1' ? "0" : "1")
            },
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);

                // alertify
                alertify.success(res ? (status == '1' ? "Disabled" : "Enabled") + " Successfully" : '');
                requestSessions();

            },
            error: function(err){
                console.log(err);
                alertify.error("Error Disabling");
            }
        });
        
    }



</script>

`;

export default function ElementElementSessionsView() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
