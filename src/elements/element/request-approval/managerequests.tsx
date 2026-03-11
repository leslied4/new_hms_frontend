const rawHtml = `
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#create_access" data-toggle="tab"> Create Status Protocol</a>
                </li>
                <li class="nav-item">
                    <a href="#view_access" data-toggle="tab"> View Status Protocol</a>
                </li>
                <li class="nav-item">
                    <a href="#create_budget" data-toggle="tab"> Create Budget</a>
                </li>
                <li class="nav-item">
                    <a href="#view_budget" data-toggle="tab"> View Budget</a>
                </li>
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane" id="create_access">
                    <div class="container px-5">
                        <div class="row justify-content-center">
                            <div class="container text-center p-3 mt-3 mb-2">
                                <div class="card p-5 mt-1 mb-3">
                                    <!-- php: = $this->Form->create($addBudget, ['url' => ['controller' => 'RequestApproval', 'action' => 'addPermission']]); -->
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            Department
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <SearchableSelectField
                                                class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                data-size="5" name="department[]" id="department" title="Select Department"
                                                data-live-search="true" required>
                                                <!-- php: foreach($departments as $department): -->
                                                    <option  value="<!-- php: = $department->id -->"><!-- php: = $department->name --></option>
                                                <!-- php: endforeach; -->

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
                                                data-size="5" name="users_id[]" id="users_select" title="Select Users"
                                                data-live-search="true" multiple required>
                                                <!-- php: foreach($userRoles as $userRole): -->
                                                    <option  data-sample="<!-- php: = $userRole->role->id -->" data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>" value="<!-- php: = $userRole->id -->"><!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                <!-- php: endforeach; -->

                                            </SearchableSelectField>
                                            <input type="hidden" id="role_id" name="role_id">
                                        </div>
                                    </div>
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1"><label>Permission:</label></div>
                                        <div class="col-md-10 text-left">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="createinvoice" value="APPROVE REQUEST">
                                                <label class="form-check-label" for="createinvoice">Approve Requests</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="makerequests" value="MAKE REQUESTS">
                                                <label class="form-check-label" for="makerequests">Make Requests</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="permission[]"
                                                    id="makerequests" value="REQUEST TO PO">
                                                <label class="form-check-label" for="makerequests">Make Purchase Order</label>
                                            </div>     
                                            <br/>
                                            <button class="btn btn-primary mt-4">Submit</button>
                                        </div>
                                    </div>
                                    <!-- php: = $this->Form->end() -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="create_budget">
                    <div class="container px-5">
                        <div class="row justify-content-center">
                            <div class="container text-center p-3 mt-3 mb-2">
                                <div class="card p-5 mt-1 mb-3">
                                    <!-- php: = $this->Form->create($addBudget, ['url' => ['controller' => 'RequestApproval', 'action' => 'addBudget']]); -->
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            Department
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <SearchableSelectField
                                                class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                data-size="5" name="department_id" id="users_select" title="Select Department"
                                                data-live-search="true" required>
                                                <!-- php: foreach($departments as $department): -->
                                                    <option  value="<!-- php: = $department->id -->"><!-- php: = $department->name --></option>
                                                <!-- php: endforeach; -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            Budget Amount (<!-- php: = $configs['currency'] -->)
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <input type="number" name="budget" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            From
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <input type="date" name="start" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            To
                                        </div>
                                        <div class="col-md-7 d-flex align-items-left p-1">
                                            <input type="date" name="end" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3 pl-2">
                                        <div class="col-md-2 p-1">
                                            Expense Category
                                        </div>
                                        <div class="col-md-7 d-flex align-items-center p-1">
                                            <SearchableSelectField name="expense_category" class="form-control input-height selectpicker" data-size="5" data-live-search="true" title="Select Expense Category" required>
                                                <!-- php: foreach($expense_categorys as $expense_category): -->
                                                    <option value="<!-- php: =$expense_category->name -->"><!-- php: =$expense_category->name --></option>
                                                <!-- php: endforeach; -->
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                    <div class="row d-flex justify-content-end mt-3 pl-2">
                                        <div class="col-md-7">
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
                                            <td><!-- php: = $permissionRole->user->department ? $permissionRole->user->department->name : '' --></td>
                                            <td>
                                                <!-- php: foreach($permissionRole->roles_vsp_permission as $permission): -->
                                                <span><!-- php: = $permission->permission --></span>,
                                                <!-- php: endforeach; -->
                                            </td>
                                            <td>
                                                <!-- <button class="btn btn-sm btn-secondary">Disable</button> -->
                                                <a href="<!-- php: = $this->Url->build(['controller' => 'RequestApproval', 'action' => 'deleteRequestApprovers', $permissionRole->id]) -->" class="btn btn-sm btn-danger">Delete</a>
                                            </td>
                                        </tr>
                                        <!-- php: endforeach; -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="view_budget">
                    <div class="card mt-3  card-box">
                        <div class="card-body ">
                            <div class="table-responsive mt-2">
                                <table id="budget_table"
                                    class="table table-hover customDatable full-width budget_table">
                                    <thead>
                                        <tr>
                                            <th>Department</th>
                                            <th>Budget (<!-- php: = $configs['currency'] -->)</th>
                                            <th>Expense Category</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       <!-- php: foreach($budgets as $budget){ -->
                                        <tr>
                                            <td><!-- php: = $budget->department->name --></td>
                                            <td><!-- php: = $configs['currency'] --> <!-- php: = $budget->budget --></td>
                                            <td><!-- php: = $budget->expense_category --></td>
                                            <td><!-- php: = $budget->start --></td>
                                            <td><!-- php: = $budget->end --></td>
                                            <td>
                                                <a data-toggle="modal" data-target="#editBudget_<!-- php: = $budget->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">Edit</a>
                                            </td>
                                        </tr>
                                        <!-- sadat -->
                                        <div class="modal fade" id="editBudget_<!-- php: = $budget->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 1000px;">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                <h4 class="modal-title" id="editInvestigationDialogueTitle">Edit Budget</h4>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="card card-box">
                                                                <div class="card-body" id="bar-parent">
                                                                    <div class="container px-5">
                                                                        <div class="row justify-content-center">
                                                                            <div class="container text-center p-3 mt-3 mb-2">
                                                                                <div class="p-5 mt-1 mb-3">
                                                                                    <!-- php: = $this->Form->create($budget, ['url' => ['controller' => 'RequestApproval', 'action' => 'addBudget']]); -->
                                                                                        <div class="row mt-3 pl-2">
                                                                                            <div class="col-md-2 p-1">
                                                                                                Department
                                                                                            </div>
                                                                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                                                                <SearchableSelectField
                                                                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                                                                    data-size="5" name="department_id" id="users_select" title="Select Department"
                                                                                                    data-live-search="true" required>
                                                                                                    <!-- php: foreach($departments as $department): -->
                                                                                                        <option  value="<!-- php: = $department->id -->"><!-- php: = $department->name --></option>
                                                                                                    <!-- php: endforeach; -->
                                                                                                </SearchableSelectField>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="row mt-3 pl-2">
                                                                                            <div class="col-md-2 p-1">
                                                                                                Budget Amount (<!-- php: = $configs['currency'] -->)
                                                                                            </div>
                                                                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                                                                <input type="number" name="budget" class="form-control" required>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="row mt-3 pl-2">
                                                                                            <div class="col-md-2 p-1">
                                                                                                From
                                                                                            </div>
                                                                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                                                                <input type="date" name="start" class="form-control" required>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="row mt-3 pl-2">
                                                                                            <div class="col-md-2 p-1">
                                                                                                To
                                                                                            </div>
                                                                                            <div class="col-md-7 d-flex align-items-left p-1">
                                                                                                <input type="date" name="end" class="form-control" required>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="row mt-3 pl-2">
                                                                                            <div class="col-md-2 p-1">
                                                                                                Expense Category
                                                                                            </div>
                                                                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                                                                <SearchableSelectField name="expense_category" class="form-control input-height selectpicker" data-size="5" data-live-search="true" title="Select Expense Category" required>
                                                                                                    <!-- php: foreach($expense_categorys as $expense_category): -->
                                                                                                        <option value="<!-- php: =$expense_category->name -->"><!-- php: =$expense_category->name --></option>
                                                                                                    <!-- php: endforeach; -->
                                                                                                </SearchableSelectField>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="row d-flex justify-content-end mt-3 pl-2">
                                                                                            <div class="col-md-7">
                                                                                                <button class="btn btn-primary mt-4">Submit</button>
                                                                                            </div>  
                                                                                        </div>
                                                                                    <!-- php: = $this->Form->end() -->
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
                                        </div>	
                                       <!-- php: } -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>            
        $('#budget_table').DataTable();
        $('#permission_table').DataTable();

        $('#users_select').on('change',function(){
            console.log($(this).find(':selected').attr('data-sample'));
           $('#role_id').val($(this).find(':selected').attr('data-sample'));
        });
    </script>

`;

export default function ElementElementRequestApprovalManagerequests() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
