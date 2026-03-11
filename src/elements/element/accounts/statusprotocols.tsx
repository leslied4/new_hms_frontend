const rawHtml = `
	<!--<link href="../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>-->
	<!-- <!-- php: //= $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css') -->
	<!-- php: //= $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') --> -->
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.buttons.css" /> -->
<style>
    #heading {
        text-transform: uppercase;
        color: #673AB7;
        font-weight: normal
    }

    #msform {
        text-align: center;
        position: relative;
        margin-top: 20px
    }

    #msform fieldset {
        background: white;
        border: 0 none;
        border-radius: 0.5rem;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding-bottom: 20px;
        position: relative
    }

    .form-card {
        text-align: left
    }

    #msform fieldset:not(:first-of-type) {
        display: none
    }

    #msform input[type="text"],
    #msform select {
        padding: 8px 15px 8px 15px;
        border: 1px solid #ccc;
        border-radius: 0px;
        margin-bottom: 10px;
        margin-top: 2px;
        box-sizing: border-box;
    }

    #msform input:focus,
    #msform textarea:focus {
        -moz-box-shadow: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        border: 1px solid #673AB7;
        outline-width: 0
    }

    #msform .action-button {
        width: 100px;
        background: #673AB7;
        font-weight: bold;
        color: white;
        border: 0 none;
        border-radius: 0px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 0px 10px 5px;
        float: right
    }

    #msform .action-button:hover,
    #msform .action-button:focus {
        background-color: #311B92
    }

    #msform .action-button-previous {
        width: 100px;
        background: #616161;
        font-weight: bold;
        color: white;
        border: 0 none;
        border-radius: 0px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 5px 10px 0px;
        float: right
    }

    #msform .action-button-previous:hover,
    #msform .action-button-previous:focus {
        background-color: #000000
    }

    .card {
        z-index: 0;
        border: none;
        position: relative
    }

    .fs-title {
        font-size: 25px;
        color: #673AB7;
        margin-bottom: 15px;
        font-weight: normal;
        text-align: left
    }

    .purple-text {
        color: #673AB7;
        font-weight: normal
    }

    .steps {
        font-size: 25px;
        color: gray;
        margin-bottom: 10px;
        font-weight: normal;
        text-align: right
    }

    .fieldlabels {
        color: gray;
        text-align: left
    }

    #progressbar {
        margin-bottom: 30px;
        overflow: hidden;
        color: lightgrey
    }

    #progressbar .active {
        color: #1880c9
    }

    #progressbar li {
        list-style-type: none;
        font-size: 15px;
        width: 20% !important;
        float: left;
        position: relative;
        font-weight: 400
    }

    #progressbar #cart:before {
        font-family: FontAwesome;
        content: "\f07a"
    }

    #progressbar #personal:before {
        font-family: FontAwesome;
        content: "\f007"
    }

    #progressbar #payment:before {
        font-family: FontAwesome;
        content: "\f0d6"
    }

    #progressbar #confirm:before {
        font-family: FontAwesome;
        content: "\f00c"
    }

    #progressbar #file:before {
        font-family: FontAwesome;
        content: "\f15b"
    }


    #progressbar li:before {
        width: 45px;
        height: 45px;
        line-height: 45px;
        display: block;
        font-size: 15px;
        color: #ffffff;
        background: lightgray;
        border-radius: 50%;
        margin: 0 auto 10px auto;
        padding: 2px
    }

    #progressbar li:after {
        content: '';
        width: 100%;
        height: 2px;
        background: lightgray;
        position: absolute;
        left: 0;
        top: 25px;
        z-index: -1
    }

    #progressbar li.active:before,
    #progressbar li.active:after {
        background: #1880c9
    }

    .progress {
        height: 20px
    }

    .progress-bar {
        background-color: #673AB7
    }

    .fit-image {
        width: 100%;
        object-fit: cover
    }

    .style-select select {
        width: 48%;
    }

    .ui-pnotify.greyteam .ui-pnotify-container {
        background-color: #2d3436 !important;
    }

    .ui-pnotify.greyteam .ui-pnotify-title,
    .ui-pnotify.greyteam .ui-pnotify-text {
        color: #FFF !important;
    }*/

</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <!-- <div class="caption">
				<span class="caption-subject font-dark bold uppercase">accounts</span>
			</div> -->
            <ul class="nav nav-tabs">

                <li class="nav-item">
                    <a href="#invoicing" class="dropdown-toggle" data-toggle="tab"> Invoicing</a>
                </li>

                <li class="nav-item">
                    <a href="#banking" data-toggle="tab">Banking & Accounts </a>
                </li>
                <li class="nav-item">
                    <a href="#expenses" data-toggle="tab">Expenses </a>
                </li>
                <li class="nav-item">
                    <a href="#vsp" data-toggle="tab">VSP </a>
                </li>
                <!-- <li class="nav-item">
                    <a href="#purchase-order" data-toggle="tab">Purchase Order </a>
                </li> -->

                <!--  <li class="nav-item">
					 <a href="#pending_account" data-toggle="tab"> Pending </a>
				  </li>
               
                <li class="nav-item">
					<a href="#paid_account" data-toggle="tab"> Paid </a>
				</li> -->
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <!-- invoicing tab -->
                <div class="tab-pane active" id="invoicing">
                    <div class="container-fluid px-5">
                        <a href="javascript:" data-toggle="modal" data-target="#modal_invoicing" class="btn btn-sm btn-success"><i class="fa fa-plus"></i> Add Status
                            Protocol</a>
                        <div class="table-responsive mt-3">
                            <table id="invoicing_table" class="table table-hover customDatable full-width accountstable">
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
                                                
                                                <a href="<!-- php: = $this->Url->build(["controller" => "Accounts","action" => "deletePermission",$permissionRole->id, 'invoicing']) -->" class="btn btn-sm btn-danger">Delete</a>
                                            </td>
                                        </tr>
                                        <!-- php: endforeach; -->

                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
                <!-- end of invoicing tab -->

                <!-- banking tab -->
                <div class="tab-pane" id="banking">
                    <div class="container-fluid px-5">
                        <a href="javascript:" data-toggle="modal" data-target="#modal_banking"  class="btn btn-sm btn-success"><i class="fa fa-plus"></i> Add Status
                            Protocol</a>
                        <div class="table-responsive mt-3">
                            <table id="accountstable" class="table table-hover customDatable full-width accountstable">
                                <thead>
                                    <tr>
                                            
                                            <th>User</th>
                                            <th>Account</th>
                                            <th>Role</th>
                                            <th>Department</th>
                                            <th>Status Protocol</th>
                                            <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <!-- php: foreach($accountStatusProtocols as $permissionRole): -->
                                        <tr>
                                            <td><!-- php: = $permissionRole->user->first_name.' '.$permissionRole->user->last_name -->
                                            <td>
                                                <!-- php: = $permissionRole->roles_accounts_permission != NULL ? $permissionRole->roles_accounts_permission[0]->account->bank_name != "" ? $permissionRole->roles_accounts_permission[0]->account->banks_list->name : $permissionRole->roles_accounts_perm... -->
                                            </td>
                                            <td><!-- php: = $permissionRole->role->name --></td>
                                            <td><!-- php: = $permissionRole->user->department->name --></td>
                                            <td>
                                                <!-- php: foreach($permissionRole->roles_accounts_permission as $permission): -->
                                                <span><!-- php: = $permission->permission --></span>,
                                                <!-- php: endforeach; -->
                                            </td>
                                            <td>
                                                
                                                <a href="<!-- php: = $this->Url->build(["controller" => "Accounts","action" => "deletePermission",$permissionRole->id, 'accounts']) -->" class="btn btn-sm btn-danger">Delete</a>
                                            </td>
                                        </tr>
                                        <!-- php: endforeach; -->
                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
                <!-- end of banking tab -->

                <!-- expenses tab -->
                <div class="tab-pane" id="expenses">
                    <div class="container-fluid px-5">
                        <a href="javascript:" data-toggle="modal" data-target="#modal_expenses" class="btn btn-sm btn-success"><i class="fa fa-plus"></i> Add Status
                            Protocol</a>
                        <div class="table-responsive mt-3">
                            <table id="expenses_table" class="table table-hover customDatable full-width accountstable">
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
                                <!-- php: foreach($expensesStatusProtocols as $permissionRole): -->
                                        <tr>
                                            <td><!-- php: = $permissionRole->user->first_name.' '.$permissionRole->user->last_name -->
                                            </td>
                                            <td><!-- php: = $permissionRole->role->name --></td>
                                            <td><!-- php: = $permissionRole->user->department->name --></td>
                                            <td>
                                                <!-- php: foreach($permissionRole->roles_expenses_permission as $permission): -->
                                                <span><!-- php: = $permission->permission --></span>,
                                                <!-- php: endforeach; -->
                                            </td>
                                            <td>
                                                
                                                <a href="<!-- php: = $this->Url->build(["controller" => "Accounts","action" => "deletePermission",$permissionRole->id, 'expenses']) -->" class="btn btn-sm btn-danger">Delete</a>
                                            </td>
                                        </tr>
                                        <!-- php: endforeach; -->

                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
                <!-- end of expenses tab -->

                <!-- vsp tab -->
                <div class="tab-pane" id="vsp">
                    <div class="container-fluid px-5">
                        <a href="javascript:" data-toggle="modal" data-target="#modal_vsp" class="btn btn-sm btn-success"><i class="fa fa-plus"></i> Add Status
                            Protocol</a>
                        <div class="table-responsive mt-3">
                            <table id="vsp_table" class="table table-hover customDatable full-width accountstable">
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
                                <!-- php: foreach($vspStatusProtocols as $permissionRole): -->
                                        <tr>
                                        <td>
                                            <!-- php: if ($permissionRole->user && $permissionRole->user->first_name && $permissionRole->user->last_name) { echo $permissionRole->user->first_name . ' ' . $permissionRole->user->last_name; } else { echo "N/A"; // or any default value } -->
                                        </td>
                                        <td>
                                            <!-- php: if ($permissionRole->role && $permissionRole->role->name) { echo $permissionRole->role->name; } else { echo "N/A"; // or any default value } -->
                                        </td>
                                        <td>
                                            <!-- php: if ($permissionRole->user && $permissionRole->user->department && $permissionRole->user->department->name) { echo $permissionRole->user->department->name; } else { echo "N/A"; // or any default value } -->
                                        </td>
                                            <td>
                                                <!-- php: foreach($permissionRole->roles_vsp_permission as $permission): -->
                                                <span><!-- php: = $permission->permission --></span>,
                                                <!-- php: endforeach; -->
                                            </td>
                                            <td>
                                                
                                                <a href="<!-- php: = $this->Url->build(["controller" => "Accounts","action" => "deletePermission",$permissionRole->id, "vsp"]) -->" class="btn btn-sm btn-danger">Delete</a>
                                            </td>
                                        </tr>
                                        <!-- php: endforeach; -->

                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
                <!-- end of vsp tab -->

                <!-- vsp tab -->
                <div class="tab-pane" id="purchase-order">
                    <div class="container-fluid px-5">
                        <a href="javascript:" class="btn btn-sm btn-success"><i class="fa fa-plus"></i> Add Status
                            Protocol</a>
                        <div class="table-responsive mt-3">
                            <table id="purchase_order_table" class="table table-hover customDatable full-width accountstable">
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

                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
                <!-- end of vsp tab -->
            </div>
        </div>
        </div>
        </div>
        </div>
         <!-- Invoicing Modal -->
        <div class="modal fade" id="modal_invoicing" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="container-fluid px-0 border border-2 border-<!-- php: = $theme2 -->">
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="text-slate-900 my-0">Add Status Protocol For Invoicing
                                </h4>
                                <div>
                                    <button data-dismiss="modal" aria-label="Close"
                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                            class="fa fa-times text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="container bg-white p-2">
                            <div class="container">
                                <!-- php: //= $this->Form->create($entity, ['url' => ['controller' => 'ControllerName', 'action' => 'actionName']]); -->

                                <!-- php: = $this->Form->create($addPermission, ['url' => ['controller' => 'Invoicing', 'action' => 'addPermission']]); -->
                                <input type="hidden" name="type" value="invoicing" />
                                <div class="row mt-2 pl-2">
                                    <div class="col-md-2 p-1">
                                        Roles
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control" name="role_id" id="invoicing_role_id">
                                            <option>Select Role</option>
                                            <!-- php: foreach($roles as $role) { echo "<option value='".$role->id."'>".$role->name."</option>";} -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-3 pl-2">
                                    <div class="col-md-2 p-1">
                                        Users
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" name="users_id[]" id="invoicing_user_id" title="Select Users"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center py-1 justify-content-end">
                                <button style="height:20px;width:auto;"
                                    class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                                <!-- php: = $this->Form->end(); -->
                                <button style="height:20px;width:auto;"
                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                        class="fa fa-times text-danger fa-1x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Banking Modal -->
        <div class="modal fade" id="modal_banking" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="container-fluid px-0 border border-2 border-<!-- php: = $theme2 -->">
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="text-slate-900 my-0">Add Status Protocol For Banking & Accounts
                                </h4>
                                <div>
                                    <button data-dismiss="modal" aria-label="Close"
                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                            class="fa fa-times text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="container bg-white p-2">
                            <div class="container">
                                <!-- php: //= $this->Form->create($entity, ['url' => ['controller' => 'ControllerName', 'action' => 'actionName']]); -->

                                <!-- php: = $this->Form->create($addPermission, ['url' => ['controller' => 'Accounts', 'action' => 'addPermission']]); -->
                                <input type="hidden" name="type" value="accounts" />
                                <div class="row mt-2 pl-2">
                                    <div class="col-md-2 p-1">
                                        Account
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" name="accounts_id" id="id" title="Select Account"
                                            data-live-search="true" required>
                                            <!-- php: foreach($accounts as $account) { -->
                                                <option value="<!-- php: = $account->id -->"> <!-- php: = $account->account_name == null ? $account->banks_list->name : $account->account_name --> </option>;
                                                <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-2 pl-2">
                                    <div class="col-md-2 p-1">
                                        Roles
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control" name="role_id" id="banking_role_id">
                                            <option>Select Role</option>
                                            <!-- php: foreach($roles as $role) { echo "<option value='".$role->id."'>".$role->name."</option>";} -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-3 pl-2">
                                    <div class="col-md-2 p-1">
                                        Users
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" name="users_id[]" id="banking_user_id" title="Select Users"
                                            data-live-search="true" multiple required>

                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-3 pl-2">
                                    <div class="col-md-2 p-1"><label>Permission:</label></div>
                                    <div class="col-md-10 text-left">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="createinvoice" value="CREATE ACCOUNTS">
                                            <label class="form-check-label" for="createinvoice">Create
                                                Accounts</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="approveinvoice" value="APPROVE DEPOSITS">
                                            <label class="form-check-label" for="approveinvoice">Approve
                                                Deposits</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="approvewrite" value="APPROVE PAY IN OUT">
                                            <label class="form-check-label" for="approvewrite">Approve
                                                Pay In & Outs</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="recordpay" value="APPROVE WITHDRAWALS">
                                            <label class="form-check-label" for="recordpay">Approve Withdrawals</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="reportmoney" value="FUNDS DISBURSEMENTS">
                                            <label class="form-check-label" for="reportmoney">Funds Disbursements
                                                In</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="recordpay" value="ACCOUNTS RECONCILATIONS">
                                            <label class="form-check-label" for="recordpay">Accounts Reconcilations</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="recordpay" value="HANDLE CASH">
                                            <label class="form-check-label" for="recordpay">Handle Cash</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="recordpay" value="RECORD CASH">
                                            <label class="form-check-label" for="recordpay">Record Cash</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="recordpay" value="MAKE PAYMENTS">
                                            <label class="form-check-label" for="recordpay">Make Payments</label>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center py-1 justify-content-end">
                                <button style="height:20px;width:auto;"
                                    class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                                <!-- php: = $this->Form->end(); -->
                                <button style="height:20px;width:auto;"
                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                        class="fa fa-times text-danger fa-1x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Expenses Modal -->
         <div class="modal fade" id="modal_expenses" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="container-fluid px-0 border border-2 border-<!-- php: = $theme2 -->">
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="text-slate-900 my-0">Add Status Protocol For Expenses
                                </h4>
                                <div>
                                    <button data-dismiss="modal" aria-label="Close"
                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                            class="fa fa-times text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="container bg-white p-2">
                            <div class="container">
                               
                                <!-- php: = $this->Form->create($addPermission, ['url' => ['controller' => 'Expenses', 'action' => 'addPermission']]); -->
                                <input type="hidden" name="type" value="expenses" />
                                <div class="row mt-2 pl-2">
                                    <div class="col-md-2 p-1">
                                        Roles
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control" name="role_id" id="expenses_role_id">
                                            <option>Select Role</option>
                                            <!-- php: foreach($roles as $role) { echo "<option value='".$role->id."'>".$role->name."</option>";} -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-3 pl-2">
                                    <div class="col-md-2 p-1">
                                        Users
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" name="users_id[]" id="expenses_user_id" title="Select Users"
                                            data-live-search="true" multiple required>

                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-3 pl-2">
                                    <div class="col-md-2 p-1"><label>Permission:</label></div>
                                    <div class="col-md-10 text-left">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="createinvoice" value="CREATE EXPENSE">
                                            <label class="form-check-label" for="createinvoice">Create
                                                Expense</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="approveinvoice" value="APPROVE EXPENSE">
                                            <label class="form-check-label" for="approveinvoice">Approve
                                                Expense</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="approvewrite" value="APPROVE WRITE OFF">
                                            <label class="form-check-label" for="approvewrite">WriteOff
                                                Expense</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="recordpay" value="RECORD PAYMENTS">
                                            <label class="form-check-label" for="recordpay">Record Payments</label>
                                        </div><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center py-1 justify-content-end">
                                <button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                                <!-- php: = $this->Form->end(); -->
                                <button style="height:20px;width:auto;"
                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                        class="fa fa-times text-danger fa-1x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <!-- Expenses Modal -->
         <div class="modal fade" id="modal_vsp" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="container-fluid px-0 border border-2 border-<!-- php: = $theme2 -->">
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="text-slate-900 my-0">Add Status Protocol For VSP
                                </h4>
                                <div>
                                    <button data-dismiss="modal" aria-label="Close"
                                        class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                            class="fa fa-times text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="container bg-white p-2">
                            <div class="container">
                               
                                <!-- php: = $this->Form->create($addPermission, ['url' => ['controller' => 'VspProcurement', 'action' => 'addPermission']]); -->
                                <input type="hidden" name="type" value="vsp" />
                                <div class="row mt-2 pl-2">
                                    <div class="col-md-2 p-1">
                                        Roles
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control" name="role_id" id="vsp_role_id">
                                            <option>Select Role</option>
                                            <!-- php: foreach($roles as $role) { echo "<option value='".$role->id."'>".$role->name."</option>";} -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-3 pl-2">
                                    <div class="col-md-2 p-1">
                                        Users
                                    </div>
                                    <div class="col-md-7 d-flex align-items-center p-1">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" name="users_id[]" id="vsp_user_id" title="Select Users"
                                            data-live-search="true" multiple required>

                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="row mt-3 pl-2">
                                    <div class="col-md-2 p-1"><label>Permission:</label></div>
                                    <div class="col-md-10 text-left">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="approveinvoice" value="MAKE REQUESTS">
                                            <label class="form-check-label" for="approveinvoice">Make
                                                Requests</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="approvewrite" value="APPROVE REQUESTS">
                                            <label class="form-check-label" for="approvewrite">Approve
                                                Requests</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="permission[]"
                                                id="makerequests" value="REQUEST TO PO">
                                            <label class="form-check-label" for="makerequests">Make Purchase Order</label>
                                        </div>   
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                            <div class="d-flex align-items-center py-1 justify-content-end">
                                <button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                                <!-- php: = $this->Form->end(); -->
                                <button style="height:20px;width:auto;"
                                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                        class="fa fa-times text-danger fa-1x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        


        <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<!-- <script src="https://colorlib.com/polygon/vendors/jquery/dist/jquery.min.js"></script> -->
<!-- <script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.js"></script>
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.buttons.js"></script> -->
<script>
    $('#invoicing_table').DataTable();
    $('#expenses_table').DataTable();
    $('#vsp_table').DataTable();
    $('#purchase_order_table').DataTable();

    $('#invoicing_role_id').on('change', function () {
            $.ajax({
                type: "POST",
                data: {value: $('#invoicing_role_id').val()},
                url: '<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
                success: function (html) {
                    console.log(html);
                    $('#invoicing_user_id').html(html);
                    $('#invoicing_user_id').selectpicker("refresh");
                },
                error: function () {
                    alert('false');
                }

            });
    });

    $('#banking_role_id').on('change', function () {
            $.ajax({
                type: "POST",
                data: {value: $('#banking_role_id').val()},
                url: '<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
                success: function (html) {
                    console.log(html);
                    $('#banking_user_id').html(html);
                    $('#banking_user_id').selectpicker("refresh");
                },
                error: function () {
                    alert('false');
                }

            });
    });
    $('#expenses_role_id').on('change', function () {
            $.ajax({
                type: "POST",
                data: {value: $('#expenses_role_id').val()},
                url: '<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
                success: function (html) {
                    console.log(html);
                    $('#expenses_user_id').html(html);
                    $('#expenses_user_id').selectpicker("refresh");
                },
                error: function () {
                    alert('false');
                }

            });
    });
    $('#vsp_role_id').on('change', function () {
            $.ajax({
                type: "POST",
                data: {value: $('#vsp_role_id').val()},
                url: '<!-- php: = $this->Url->build(['controller'=>'ShiftScheduler', 'action'=>'getUsers']); -->',
                success: function (html) {
                    console.log(html);
                    $('#vsp_user_id').html(html);
                    $('#vsp_user_id').selectpicker("refresh");
                },
                error: function () {
                    alert('false');
                }

            });
    });


  
    $('#bank_branch').on('change', function () {
        $('#branch_code').val('1234');
    });

    $('#money_in_div').hide();
    $('#money_out_div').hide();
    $('#bank_info').hide();

    $('#money_in').on('change', function () {
        if ($(this).is(':checked')) {
            $('#money_in_out').prop('checked', false);
            $('#money_in_div').show();
            new PNotify({
                type: 'success',
                styling: 'bootstrap3',
                title: 'Money In Enabled',
                text: 'Account will able to receive payments.',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        } else {
            $('#money_in_div').hide();
        }
    });
    $('#money_out').on('change', function () {
        if ($(this).is(':checked')) {
            $('#money_in_out').prop('checked', false);
            new PNotify({
                type: 'error',
                styling: 'bootstrap3',
                title: 'Money Out Enabled',
                text: 'Account will able to make payments.',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
            $('#money_out_div').show();
        } else {
            $('#money_out_div').hide();
        }
    });
    $('#money_in_out').on('change', function () {
        if ($(this).is(':checked')) {
            $('#money_in').prop('checked', false);
            $('#money_out').prop('checked', false);
            new PNotify({
                addClass: 'greyteam',
                styling: 'bootstrap3',
                title: 'Money In and Money Out is Enabled',
                text: 'Account will able to receive and make payments.',
                icon: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
            $('#money_out_div').show();
            $('#money_in_div').show();
        } else {
            $('#money_out_div').hide();
            $('#money_in_div').hide();
        }
    });


    $('#type_bank_account').on('change', function () {
        if ($(this).is(':checked')) {
            $('#bank_info').show();
            $('#account_info').hide();
        } else {
            $('#bank_info').hide();
        }
    });

    $('#type_account').on('change', function () {
        if ($(this).is(':checked')) {
            $('#bank_info').hide();
            $('#account_info').show();
        } else {
            $('#account_info').hide();
        }
    });




    $(document).ready(function () {


        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;
        var current = 1;
        var steps = $("fieldset").length;

        setProgressBar(current);

        $(".next").click(function () {

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            setProgressBar(++current);
        });

        $(".previous").click(function () {

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            setProgressBar(--current);
        });

        function setProgressBar(curStep) {
            var percent = parseFloat(100 / steps) * curStep;
            percent = percent.toFixed();
            $(".progress-bar")
                .css("width", percent + "%")
        }

        $(".submit").click(function () {
            return false;
        })

    });
    $('#accountstable').DataTable();
</script>

`;

export default function ElementElementAccountsStatusprotocols() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
