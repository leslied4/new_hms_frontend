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

                    <div class="px-2">
                        <div class="row justify-content-center">
                            <div style="" class="container-fluid text-center p-3 mt-3 mb-2">

                                    <div class=" mt-2">
                                        <table class="table table-hover order-column full-width" id="view_session">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">Date</th>
                                                    <th style="text-align: center">Patient</th>
                                                    <th style="text-align: center">User</th>
                                                    <th style="text-align: center">Amount</th>
                                                    <th style="text-align: center">Amount Remaining</th>
                                                    <th style="text-align: center">Status</th>
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
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
                <h4 class="modal-title">Session Configuration</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body configuration">

            </div>
        </div>
    </div>
</div>
<div class="modal fade bd-example-modal-lg" id="voucher_payments_modal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Voucher Payments</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body payments">

            </div>
        </div>
    </div>
</div>
<div class="modal fade bd-example-modal-lg" id="voucher_expenses_modal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Voucher Expenses</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body expenses">

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

<div class="modal fade" id="makePayment" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" >
        <div class="modal-content">
            <div class="card card-topline-green" id="paymentCard">
                <div class="card-head">
                    <header style="margin-left: 20px">Session Voucher for <span id="patient_name"></span></header>
                </div>
                <div class="card-body">
                <!-- php: //'url' =>['controller' => 'Billings', 'action'=>'makePayment', $invoice->id, $type], -->
                    <!-- php: = $this->Form->create(null, ['id' => 'makePaymentForm'] ); -->
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">

                                    <div class="form-group row">
                                        <label class="control-label col-md-4">Amount To Pay
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-8">
                                            <span id="amount_to_pay"></span>
                                        </div>

                                    </div>

                                    <div class="form-group row">
                                        <label class="control-label col-md-4">Payment Type
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-8">
                                            <input type="hidden" name="id" id="id" value=""/>
                                            <input type="hidden" name="type" id="type" value=""/>
                                            <SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick" onchange="javascript:updateReference(this.value);" data-live-search="true" data-required="1" name="payment_type_id" id="payment_type_id" required >
                                                <!-- php: foreach($paymentTypes as $key => $paymentType) { -->
                                                    <option value="<!-- php: = $key -->" ><!-- php: = $paymentType --></option>
                                                <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div id="cheque_info" style="display:none">
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Bank Name
                                            </label>
                                            <div class="col-md-8">
                                                <input type="text" name="bank_name" class="form-control"/>
                                            </div>
                                        </div>
                                        <input type="hidden" name="use_voucher" value="false" id="use_voucher">
                                    </div>
                                    <div id="reference_row" style="display: none">
                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Phone Number
                                            </label>
                                            <div class="col-md-8">
                                                <input type="text" value="+233" name="phone_number" id="phone_number" placeholder="Enter Phone Number"
                                                    class="form-control input-height" />

                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="control-label col-md-4">Reference Number
                                            </label>
                                            <div class="col-md-8">
                                                <input type="text" name="reference_number"
                                                    id="reference_number" placeholder="Enter Reference Number"
                                                    class="form-control input-height" />
                                                <small class="text-danger">Reference can be used to reconcile invoice</small>
                                                <input type="hidden" id="patient_email" name="patient_email" />
                                                <input type="hidden" id="phone_no" name="phone_no" />
                                                <input type="hidden" id="transaction_no" name="transaction_no" />
                                                <input type="hidden" id="forcepay" name="force_pay" value="0" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <label class="control-label col-md-4">Amount Received
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-8">
                                            <input type="number" oninput="javascript:updateAmount(this.value);" min="0" step="0.01" name="amount_received" id="amount_received" data-required="1" placeholder="Enter Amount Received" class="form-control input-height" required /> 
                                        </div>

                                    </div>

                                    <div class="form-group row">
                                        <label class="control-label col-md-4">Change
                                        </label>
                                        <div class="col-md-8">
                                            <input type="number" min="0.01" step="0.01" name="change_amount" id="change_amount" data-required="1" placeholder="Change" class="form-control input-height" readonly /> 
                                        </div>

                                    </div>

                                    <div class="form-group row">
                                        <label class="control-label col-md-4">Amount
                                            <span class="required"> * </span>
                                        </label>
                                        <div class="col-md-8">
                                            <input type="number" min="0.01" step="0.01" name="amount" id="amount" data-required="1" placeholder="Enter Amount" class="form-control input-height" readonly required /> 
                                        </div>

                                    </div>
                                    
                                    

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div id="payment_timer" class="text-left d-none align-items-center">
                                                <h6 style="font-size:15px;">Payment Request will Expire In :&nbsp;<span id="timer" class="font-weight-bold">60</span>&nbsp; seconds</h6>
                                            </div>
                                            <div class="text-right">
                                                <button id="confirm-payment-btn" class="btn btn-info d-none">Confirm</button>
                                                <button id="cancel-payment" class="btn btn-danger d-none">Cancel</button>
                                                <button id="make-payment-btn" class="btn btn-success" type="submit">Make Payment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <!-- php: = $this->Form->end() -->
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
                url: "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'sessionVouchers',]) -->",
                data: {
                    status: status
                },
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "",
                    render: function(data, type, row) {
                        return moment(row?.date_created).format('DD/MM/YYYY, hh:mm A')
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row?.patient?.first_name} \${row?.patient?.last_name} <br> <span class="badge badge-pill badge-danger">\${row?.patient?.folder_number}</span> <span class="badge badge-primary">\${moment().diff(row.patient?.date_of_birth, 'years')} yrs</span>\`
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
                        return row?.amount
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row?.amount - row.payment_amount
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
                        btn += row.invoice_status == 1 ? \`<button class="btn btn-xs btn-info" onclick="voucherPaymentsModal('\${row.id}')">View Payments</button>\` : ''
                        btn += row.invoice_status == 1 ? \`<button class="btn btn-xs btn-info" onclick="voucherExpensesModal('\${row.id}')">View Expenses</button>\` : ''
                        btn += row.invoice_status == 1 ? \`<a href="<!-- php: =$this->Url->build(['controller' => 'Sessions', 'action'=> 'viewVoucherInvoice']) -->/\${row.id}" target="_blank" class="btn btn-xs btn-info" >View Invoice</a>\` : ''
                        // btn += \`<button class="btn btn-xs btn-\${(row.status == '1' ? "danger" : "success")}" onclick="toggleSession('\${row.id}', \${row.status})">\${(row.status == '1' ? "Disable" : "Enable")}</button>\`
                        // btn += \`<button class="btn btn-xs btn-warning" href="javascript:" data-toggle="modal" onclick="setEditModalValues('\${row.id}','\${row.code}','\${row.amount}',)" data-target="#edit_session">Edit</button>\`
                        btn += row.invoice_status == null ? \`<button class="btn btn-xs btn-warning" href="javascript:" data-toggle="modal" onclick="convertToInvoice('\${row.id}','\${row?.amount - row.payment_amount}', '\${row?.patient?.first_name} \${row?.patient?.last_name}')" >Make Invoice</button>\` : ''
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
    function voucherExpensesModal(id, name='voucher_expenses_modal') {
        $('.modal-body.expenses').load(
            "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'voucherInvoiceItems',]) -->/"+id,
            function () {
                $('#' + name).modal({
                    show: true
                });
            });
    }
    function voucherPaymentsModal(id, name='voucher_payments_modal') {
        $('.modal-body.payments').load(
            "<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'voucherPayments',]) -->/"+id,
            function () {
                $('#' + name).modal({
                    show: true
                });
            });
    }

    function updateReference(value) 
	{
		if(value == 3) {
			$('#reference_row').show(500);
			$('#cheque_info').hide(500);
		}
		else if(value == 2){
			$('#reference_row').show(500);
			$('#cheque_info').show(500);
		}
		else {
			$('#reference_row').hide(500);
			$('#cheque_info').hide(500);
		}
	}

    function updateAmount(value) 
	{
		amount = parseFloat($("#amount_to_pay").text().replace(",", ""));
		value = parseFloat(value);
		
		if(value >= amount) {
			document.getElementById('change_amount').value = (value - amount).toFixed(2);
			document.getElementById('amount').value = amount;
		}
		else {
			document.getElementById('change_amount').value = (0).toFixed(2);
			document.getElementById('amount').value = value;
		}	
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

    function makePaymentInfo(id, amount, patient) {
        $('#id').val(id)
        $('#patient_name').text(patient)
        $('#amount_to_pay').text(amount)
    }
    function convertToInvoice(id, amount, patient) {
        if (!confirm(\`Are you sure you want to convert Voucher Into Invoice?\`)) {
            return
        }
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'makeVoucherInvoice']) -->/' + id,
            type:'POST',
            data: {
                id: id,
                patient_id: patient,
            },
            success: function(res){

                alertify.success(res);
                requestSessions('')

            },
            error: function(err){
                console.log(err);
                alertify.error("An Error Occured");
            }
        });
    }

    $('#makePaymentForm').on('submit', function(e){
		e.preventDefault();
		$.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Sessions', 'action' => 'confirmPayment']) -->',
            method:"POST",
            cache:false,
            data: $(this).serialize(),
            dataType:"json",
            beforeSend: function(){
                alertify.success("Processing..");
            },
            success:function(data)
            {
                if(data.status == "success"){
                    alertify.set('notifier','position', 'top-right');
                    alertify.success(data.message);
                    $('#patient_email').val(data.email);
                    $('#phone_no').val(data.number);
                    $('#transaction_no').val(data.trans_id);

                    //displays momo sheninigans if selected
                    if($('#payment_type_id').val() == 3){

                        $('#confirm-payment-btn').removeClass('d-none');
                        $('#cancel-payment').removeClass('d-none');
                        $('#make-payment-btn').prop('disabled', true);				
                    }
                    window.location.reload()

                } else{
                    alertify.error(data.message);
                }
            }
		});
	});

</script>

`;

export default function ElementElementBillingsViewVouchers() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
