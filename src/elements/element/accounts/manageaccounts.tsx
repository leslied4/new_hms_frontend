const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css"> -->

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
                                    <!-- php: = $this->Form->create($addPermission, ['url' => ['controller' => 'Accounting', 'action' => 'addPermission']]); -->

                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            Users
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <SearchableSelectField
                                                class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                data-size="5" name="users_id[]" id="users_select" title="Select Users"
                                                data-live-search="true" multiple required>
                                                <!-- php: foreach($userRoles as $userRole): -->
                                                    <option  data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>" value="<!-- php: = $userRole->id -->"><!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                <!-- php: endforeach; -->

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

 

   
    <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
    <script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
    <script>
        
            
        // $('#permission_table').DataTable();
       

    </script>

`;

export default function ElementElementAccountsManageaccounts() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
