const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css">
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css') -->
	<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->
<style>


</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <!-- <div class="caption">
         <span class="caption-subject font-dark bold uppercase">Invoices</span>
         </div> -->
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#create_access" data-toggle="tab"> Create Status Protocol</a>
                </li>
                <!-- <li class="nav-item">
            <a href="#create_access" data-toggle="tab"> Create Terms</a>
         </li> -->
                <!-- <li class="nav-item">
            <a href="#draft_invoice" data-toggle="tab"> Draft </a>
            </li> -->
                <li class="nav-item">
                    <a href="#view_access" data-toggle="tab"> View Status Protocol</a>
                </li>
                <!-- <li class="nav-item">
            <a href="#paid_invoice" data-toggle="tab"> Paid </a>
            </li>  -->
                <!-- <li class="nav-item">
            <a href="#recurring_invoice" data-toggle="tab"> Recurring </a>
            </li>  -->
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane" id="create_access">
                    <!-- <h4>Add a new Invoice</h4> -->
                    <div class="container px-5">
                        <div class="row justify-content-center">
                            <div class="container text-center p-3 mt-3 mb-2">
                                <div class="card p-5 mt-1 mb-3">
                                    <!-- php: = $this->Form->create($addPermission, ['url' => ['controller' => 'Invoicing', 'action' => 'addPermission']]); -->

                                    <div class="row mt-2 pl-2">
                                        <div class="col-md-2 p-1">
                                            Roles
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <SearchableSelectField class="form-control" name="role_id" id="role">
                                                <option>Select Role</option>
                                                <!-- php: foreach($roles as $role) { -->
                                                    <option value='<!-- php: = $role->id -->'><!-- php: = $role->name --></option>
                                                    <!-- php: } -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            Users
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <SearchableSelectField
                                                class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                data-size="5" name="users_id[]" id="user_id" title="Select Users"
                                                data-live-search="true" multiple required>

                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1"><label>Permission:</label></div>
                                        <div class="col-md-10 text-left">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="createinvoice" value="CREATE INVOICE">
                                                <label class="form-check-label" for="createinvoice">Create
                                                    Invoice</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="approveinvoice" value="APPROVE INVOICE">
                                                <label class="form-check-label" for="approveinvoice">Approve
                                                    Invoice</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="approvewrite" value="APPROVE WRITE OFF">
                                                <label class="form-check-label" for="approvewrite">Approve
                                                    WriteOff</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="recordpay" value="RECORD PAYMENTS">
                                                <label class="form-check-label" for="recordpay">Record Payments</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="reportmoney" value="REPORT MONEY IN">
                                                <label class="form-check-label" for="reportmoney">Report Money
                                                    In</label>
                                            </div><br />
                                            <button class="btn btn-primary mt-4">Submit</button>
                                        </div>
                                    </div>

                                    <!-- php: = $this->Form->end() -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane active" id="view_access">
                    <!-- border border-left-0 border-right-0 border-bottom-0 border-3 border-primary  -->
                    <div class="card mt-3  card-box">
                        <div class="card-body ">

                            <div class="table-responsive mt-2">
                                <table id="permission_table"
                                    class="table table-hover customDatable full-width permission_table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Role</th>
                                            <th>Department</th>
                                            <th>Status Protocol</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- php: foreach($permissionRoles as $permissionRole): -->
                                        <tr>
                                            <td><!-- php: = $permissionRole->user->first_name.' '.$permissionRole->user->last_name -->
                                            </td>
                                            <td><!-- php: = $permissionRole->role->name --></td>
                                            <td><!-- php: = $permissionRole->user->department->name --></td>
                                            <td>
                                                <!-- php: foreach($permissionRole->roles_invoicing_permission as $permission): -->
                                                <span><!-- php: = $permission->permission --></span>,
                                                <!-- php: endforeach; -->
                                            </td>
                                            <td>
                                                <button class="btn btn-sm btn-secondary">Disable</button>
                                                <button class="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                        <!-- php: endforeach; -->
                                        <!-- <tr>
                              <td>22 Dec 2022</td>
                              <td><a href="javascript:">INV-002426</a></td>
                              <td>John Doe <span class="badge badge-primary">online</span></td>
                              <td><small class="due-date">OVERDUE BY 199 DAYS</small></td>
                              <td>22 Dec 2017</td>
                              <td><a href="javascript:">$94.000</a></td>
                              <td>$94.000</td>
                              <td>
                                  <a class="btn btn-warning btn-sm">Edit</a><br/>
                                  <a class="btn btn-secondary btn-sm text-slate-900">Disable</a><br/>
                                  <a class="btn btn-danger btn-sm">Write Off</a><br/>
                                  <a class="btn btn-success btn-sm">Record Payments</a>
                              </td>
                              </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- php: foreach($estimates as $estimate): -->
    <!-- preview -->
    <div class="modal fade" id="estimate_<!-- php: =$estimate->id -->" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center justify-content-between">
                            <h4 class="text-slate-900 my-0">Preview</h4>
                            <div>
                                <button data-dismiss="modal" aria-label="Close"
                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                        class="fa fa-times text-primary"></i> </button>
                            </div>
                        </div>
                    </div>
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            <div class="container p-5 mt-4 card p-3">
                                <!-- <h4 style="background-color:#18ce0f !important;border-radius:10px;border:none;width:60px" class="text-center text-slate-900">Paid</h4> -->
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-6 p-2 text-left">
                                            <p id="appr-address" style="margin-top:24px;">
                                                <!-- php: = $estimate->address -->
                                            </p>
                                        </div>
                                        <div class="col-md 6 p-2 text-right">
                                            <h2 class="font-weight-bold mb-1">Estimate</h2>
                                            <h5 class="font-weight-bold"># <!-- php: = $estimate->invoice_number --></h5>
                                            <!-- <h5 class="mt-3 font-weight-bold">Balance Due</h5> -->
                                            <!-- <h5 class="font-weight-bold">$165.00</h5> -->
                                        </div>
                                    </div>
                                    <div class="row mt-5">
                                        <div class="col-md-8 p-2 text-left">
                                            <h5>Bill To</h5>
                                            <h5 class="font-weight-bold"><!-- php: = $estimate->payer_name --></h5>
                                            <h5><!-- php: = $estimate->email_to --></h5>
                                        </div>
                                        <div class="col-md-4 p-2 text-right">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                        <h5 style="font-weight:bold">Invoice Date:</h5>
                                                    </div>
                                                    <div class="col-md-6 pr-0">
                                                        <h5 style=""><!-- php: = $estimate->invoice_date --></h5>
                                                    </div>
                                                </div>
                                                <!-- <div class="row mt-2">
                                    <div class="col-md-6 text-left">
                                        <h5 style="font-weight:bold">Terms:</h5>
                                    </div>
                                    <div class="col-md-6 pr-0">
                                        <h5 style="">Due On Receipt</h5>
                                    </div>
                                    </div> -->
                                                <div class="row mt-2">
                                                    <div class="col-md-6 text-left">
                                                        <h5 style="font-weight:bold">Due Date:</h5>
                                                    </div>
                                                    <div class="col-md-6 pr-0">
                                                        <h5 style=""><!-- php: = $estimate->due_date --></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container-fluid mt-5 px-0 py-3">
                                        <table class="table table-hover">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Items Description</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Cost</th>
                                                    <th>Discount</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <!-- php: foreach($estimate->invoicing_items as $item): -->
                                            <tr>
                                                <td>1</td>
                                                <td><!-- php: = $item->item_name --></td>
                                                <td><!-- php: = $item->qty --></td>
                                                <td><!-- php: = $item->rate --></td>
                                                <td><!-- php: = $item->discount --></td>
                                                <td><!-- php: = $item->amount --></td>
                                            </tr>
                                            <!-- php: endforeach; -->
                                        </table>
                                        <div class="row mt-4">
                                            <div class="col-md-8 p-3"></div>
                                            <div class="col-md-4 p-3">
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                        <h5 class="font-weight-bold">Sub Total</h5>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <h5>
                                                            <!-- php: $sum = 0; foreach($estimate->invoicing_items as $item){ $sum = $sum + $item->amount; } echo $sum; -->
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                        <h5 class="font-weight-bold">Discount</h5>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <h5><!-- php: = $estimate->invoice_discount -->%</h5>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                        <h5 class="font-weight-bold">Tax</h5>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <h5><!-- php: = $estimate->tax -->%</h5>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                        <h5 class="font-weight-bold">Total</h5>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <h5 class="font-weight-bold"><!-- php: = $estimate->total_amount --></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Print&nbsp;<i
                                    class="fa fa-file text-success fa-1x"></i> </button>
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
    <!-- php: endforeach; -->

    <!-- write off pending invoices -->
    <!-- php: foreach($pendingInvoices as $pendingInvoice): -->
    <!-- preview -->
    <div class="modal fade" id="writeoff_pending_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center justify-content-between">
                            <h4 class="text-slate-900 my-0">Write Off <!-- php: = $pendingInvoice->invoice_number --></h4>
                            <div>
                                <button data-dismiss="modal" aria-label="Close"
                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                        class="fa fa-times text-primary"></i> </button>
                            </div>
                        </div>
                    </div>
                    <!-- php: = $this->Form->create($addWriteOff, ['url' => ['controller' => 'Invoicing', 'action' => 'writeOff']]); -->
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            <div class="row mt-4">
                                <div class="col-md-2">
                                    <h5>Date: </h5>
                                </div>
                                <div class="col-md-8">
                                    <input type="date" name="date" class="form-control">
                                    <input type="hidden" name="invoicing_id" value="<!-- php: = $pendingInvoice->id -->" />
                                </div>
                            </div>
                            <div class="row mb-3 mt-4">
                                <div class="col-md-2">
                                    <h5>Reason: </h5>
                                </div>
                                <div class="col-md-8">
                                    <textarea name="reason" rows="3" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit
                                <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> </button>
                            <!-- php: = $this->Form->end(); -->
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
    <!-- php: endforeach; -->

    <!-- end of write off pending invoices -->

    <!-- php: foreach($pendingInvoices as $pendingInvoice): -->
    <!-- record payments modal -->
    <div class="modal fade" id="record_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center justify-content-between">
                            <h4 class="text-slate-900 my-0">Record Payment for <!-- php: = $pendingInvoice->invoice_number --></h4>
                            <div>
                                <button data-dismiss="modal" aria-label="Close"
                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                        class="fa fa-times text-primary"></i> </button>
                            </div>
                        </div>
                    </div>
                    <div class="container bg-white p-2">
                        <!-- php: = $this->Form->create($recordPayment, ['url' => ['controller' => 'Invoicing', 'action' => 'recordPayment']]); -->
                        <div class="container-fluid">
                            <div class="row mt-4">
                                <input type="hidden" name="id" value="<!-- php: =$pendingInvoice->id -->" />
                                <div class="col-md-4 text-left">
                                    <h5>Payer</h5>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" value="<!-- php: =$pendingInvoice->payer_name -->" class="form-control">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    Amount to pay(<!-- php: = $pendingInvoice->currency -->)
                                </div>
                                <div class="col-md-8">
                                    <input type="number" name="balance_due" readonly
                                        value="<!-- php: = $pendingInvoice->total_amount -->" class="form-control">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    Amount Received(<!-- php: = $pendingInvoice->currency -->)
                                </div>
                                <div class="col-md-8">
                                    <input
                                        <!-- php: = $pendingInvoice->partial == 0 ? 'readonly value="'.$pendingInvoice->total_amount.'"' : '' -->
                                        type="number" name="amount" class="form-control">
                                    <!-- php: = $pendingInvoice->partial != 0 ? '<span class="badge badge-primary">pp enabled</span>' : '' -->
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    Payment Date
                                </div>
                                <div class="col-md-8">
                                    <input type="date" name="invoice_date" class="form-control">
                                </div>
                            </div>
                            <!-- <div class="row mt-3">
                       <div class="col-md-4">
                           Payment Mode
                       </div>
                       <div class="col-md-8">
                           <SearchableSelectField name="pay-mode" class="form-control">
                               <option>Select Payment Mode</option>
                           </SearchableSelectField>
                       </div>
                   </div> -->
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    Reference#
                                </div>
                                <div class="col-md-8">
                                    <input name="ref" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    Attachment
                                </div>
                                <div class="col-md-8">

                                    <input name="invoicing_file" type="file" id="estimate-btn" hidden />
                                    <label class="bxn" for="estimate-btn">Choose File</label>
                                    <span id="file-chosen">No file chosen</span>
                                </div>
                            </div>
                            <div class="row mb-3 mt-3">
                                <div class="col-md-4">
                                    Notes
                                </div>
                                <div class="col-md-8">
                                    <textarea name="notes" rows="5" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record
                                Payment</button>
                            <!-- php: = $this->Form->end(); -->
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
    <!-- php: endforeach; -->
    <!-- end page content -->
    <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
    <script>
        $('#role').on('change', function () {
            $.ajax({
                type: "POST",
                data: {value: $('#role').val()},
                url: '<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
                success: function (html) {
                    console.log(html);
                    $('#user_id').html(html);
                    $('#user_id').selectpicker("refresh");
                },
                error: function () {
                    alert('false');
                }

            });
        });
         $('#permission_table').DataTable();

    </script>

`;

export default function ElementElementInvoicingManageinvoice() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
