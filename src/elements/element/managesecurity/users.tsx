const rawHtml = `
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <div class="caption">
                <span class="caption-subject font-dark bold uppercase">Users</span>
            </div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#users_add" data-toggle="tab"> Add </a>
                </li>
                <li class="nav-item">
                    <a href="#users_view" data-toggle="tab"> View </a>
                </li>
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane " id="users_add">
                    <h4>Add a new User</h4>
                    <!-- php: = $this->Form->create($addUser, ['type' => 'file', 'url' =>['controller' => 'Users','action'=>'addUser'],'id'=>'adduser']); -->
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">First Name
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <input type="text" name="first_name" id="first_name" data-required="1"
                                            placeholder="enter first name" class="form-control input-height" required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Last Name
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <input type="text" name="last_name" id="last_name" data-required="1"
                                            placeholder="enter last name" class="form-control input-height" required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Gender
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" title="Select Gender" name="gender_id" id="gender_id"
                                            data-live-search="true" required>
                                            <option value="">Select...</option>
                                            <!-- php: foreach($genders as $gender) { -->
                                            <option value="<!-- php: =$gender->id -->"><!-- php: =$gender->name --></option>
                                            <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Mobile No.
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <input name="phone" id="phone" type="text" placeholder="mobile number"
                                            class="form-control input-height" required /> </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Email
                                    </label>
                                    <div class="col-md-8">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-envelope"></i>
                                            </span>
                                            <input type="text" class="form-control input-height" name="email" id="email"
                                                placeholder="Email Address"> </div>
                                    </div>
                                </div>
								<div class="row">
                                        <label class="control-label col-md-4">Add Signature</label>
                                  
                                    <div class="col-md-4">
                                        <div class="profile-usertitle">
                                            <div class="profile-usertitle-name">
                                                <input type="file" name="signature" id="signature"
                                                    class="btn btn-circle" accept=".jpg,.jpeg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-6" style="background: #fcfcfc; border-radius: 7px; margin-bottom: 10px">
                                <label class="control-label">Upload a Passport Picture</label>
                                <div class="row">
                                    <div class="profile-userpic">
                                        <!-- php: = $this->Html->image('dp1.jpg',['class' =>'img-responsive', 'id' => 'passport-image', 'style' => 'width: 180px; height: 180px']); -->
                                    </div>
                                </div>

                                <div class="profile-usertitle">
                                    <div class="profile-usertitle-name">
                                        <input type="file" name="image" id="image"
                                            onchange="javascript:readURL(this, 'passport-image');"
                                            class="btn btn-circle" accept=".jpg,.jpeg" />
                                    </div>
                                </div>

                              
                            </div>
                        </div>

                        <h4>Login Details</h4>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Username
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <input type="text" name="username" id="username" data-required="1"
                                            placeholder="" class="form-control input-height" required /> </div>
                                </div>

                                <div class="form-group row">
                                    <label class="control-label col-md-4">Status
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <!-- php: $USER_STATUSES = [ 1 => 'ENABLED', 2 => 'DISABLED', ]; -->
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" title="Select Status" name="status_id" id="status_id"
                                            data-live-search="true" required>
                                            <option value="">Select...</option>
                                            <!-- php: foreach($USER_STATUSES as $key => $value) { -->
                                            <option value="<!-- php: = $key -->"><!-- php: = $value --></option>
                                            <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">

                                <div class="form-group row">
                                    <label class="control-label col-md-4">Password
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <input type="password" name="password" id="password" data-required="1"
                                            placeholder="" class="form-control input-height" required /> </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Confirm Password
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <div id="main-div">
                                            <div class="input-icon right" id="bigcheck">
                                                <i class="fa tooltips" data-original-title="please enter password"
                                                    id="check1"></i>
                                                <input type="password" class="form-control input-height"
                                                    name="confirm_password" id="confirm_password" data-required="1"
                                                    required>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <hr style="margin-top: 0" />

                        <h4>Profession / Role</h4>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Specialty
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" title="Select Speciality" name="specialty_id[]"
                                            id="specialty_id" data-live-search="true" required multiple>
                                            <option value="">Select...</option>
                                            <!-- php: foreach($specialties as $specialty) { -->
                                            <option value="<!-- php: =$specialty->id -->"><!-- php: =$specialty->name --></option>
                                            <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Department
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">
                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" title="Select Department" name="department_id[]"
                                            id="department_id" data-live-search="true" required multiple>
                                            <option value="">Select...</option>
                                            <!-- php: foreach($departments as $department) { -->
                                            <option value="<!-- php: =$department->id -->"><!-- php: =$department->name --></option>
                                            <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Position
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">

                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" title="Select Position" name="role_id" id="role_id"
                                            data-live-search="true" required>
                                            <option value="">Select...</option>
                                            <!-- php: foreach($roles as $role) { -->
                                            <option value="<!-- php: =$role->id -->"><!-- php: =$role->name --></option>
                                            <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Roles
                                        <span class="required"> * </span>
                                    </label>
                                    <div class="col-md-8">

                                        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick"
                                            data-size="5" title="Select Roles" name="user_roles[]" id="user_roles"
                                            data-live-search="true" multiple required>

                                            <option value="">Select...</option>
                                            <!-- php: foreach($roles as $role) { -->
                                            <option value="<!-- php: =$role->id -->"><!-- php: =$role->name --></option>
                                            <!-- php: } -->
                                        </SearchableSelectField>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr style="margin-top: 0" />

                        <h4>Bank Details</h4>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Bank
                                    </label>
                                    <div class="col-md-8">
                                        <input type="text" name="bank" id="bank" data-required="0"
                                            placeholder="Enter Bank Name" class="form-control input-height" />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="control-label col-md-4">Bank Branch
                                    </label>
                                    <div class="col-md-8">
                                        <input type="text" name="bank_branch" id="bank_branch" data-required="0"
                                            placeholder="Enter Bank Branch Name" class="form-control input-height" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="control-label col-md-4">Account_number
                                    </label>
                                    <div class="col-md-8">
                                        <input type="text" name="account_number" id="account_number" data-required="0"
                                            placeholder="Enter Account Number" class="form-control input-height" />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="control-label col-md-4">Account Type
                                    </label>
                                    <div class="col-md-8">
                                        <input type="text" name="account_type" id="account_type" data-required="0"
                                            placeholder="Enter Account Type" class="form-control input-height" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr style="margin-top: 0" />

                        <div class="form-actions">
                            <div class="row">
                                <div class="offset-md-3 col-md-9">
                                    <button type="submit" id="submit" class="btn btn-info">Submit</button>
                                    <button type="button" onclick='clearFields()' class="btn btn-success">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- php: =$this->Form->end(); -->
                </div>
                <div class="tab-pane active" id="users_view">
                    <div class="card  card-box">
                        <div class="card-body ">
                            <div class="table-scrollable">
                                <table class="table table-hover order-column full-width customDataTable">
                                    <thead>
                                        <tr>
                                            <th> Name </th>
                                            <th> Sex </th>
                                            <!-- th> Email </th>
											<th> Phone </th !-->
                                            <th> Username </th>
                                            <th> Role </th>
                                            <th> Specialty(s) </th>
                                            <th> Department(s) </th>
                                            <th> Status </th>
                                            <th> Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- php: $x = 1; foreach ($users as $user): -->
                                            <tr class="odd gradeX">
                                                <td><!-- php: =$user->first_name.' '.$user->last_name --></td>
                                                <td><!-- php: = $user->has('gender') ? $user->gender->name : '' --></td>
                                                <td><!-- php: =$user->username --></td>
                                                <td><!-- php: =$user->role->name --></td>

                                                <!-- php: if (!empty($user->user_specialties)) { echo '<td>'; foreach ($user->user_specialties as $specialty) { echo '<span class="badge badge-primary">' . $specialty->specialty->name . '</span></br>'; } echo '</td>'; } else { echo '<td>' . ($user->h... -->

                                                <td><!-- php: =$user->has('status') ? $user->status->name : '' --></td>
                                                <td>
                                                    <div class="btn-group-vertical">
                                                        <button type="button" class="btn btn-warning btn-xs mb-1" onclick="location.href='<!-- php: =$this->Url->build(['controller'=>'Users','action'=>'editUser',$user->id]) -->'">
                                                            Edit
                                                        </button>
                                                        <button type="button" class="btn btn-primary btn-xs mb-1" onclick="location.href='<!-- php: =$this->Url->build(['controller'=>'Users','action'=>'viewUserDetails',$user->id]) -->'">
                                                            View
                                                        </button>
                                                        <button type="button" class="btn btn-danger btn-xs mb-1" onclick="location.href='<!-- php: =$this->Url->build(['controller'=>'Users','action'=>'resetPassword',$user->id]) -->'">
                                                            Password
                                                        </button>
                                                        <!-- php: $authenticatedUserRoleId = $this->request->getSession()->read('Auth.User.role_id'); if ($authenticatedUserRoleId == 5){ -->
                                                            <!-- php: if ($user->accept_payment_status == 0): -->
                                                                <form method="post" action="<!-- php: = $this->Url->build(['controller' => 'ManageSecurity', 'action' => 'acceptPayment', $user->id]) -->" style="display: inline;">
                                                                    <input type="hidden" name="accept_payment_status" value="1">
                                                                    <button type="submit" class="btn btn-success btn-xs mb-1">
                                                                        Enable Payment
                                                                    </button>
                                                                </form>
                                                            <!-- php: else: -->
                                                                <form method="post" action="<!-- php: = $this->Url->build(['controller' => 'ManageSecurity', 'action' => 'disablePayment', $user->id]) -->" style="display: inline;">
                                                                    <input type="hidden" name="accept_payment_status" value="0">
                                                                    <button type="submit" class="btn btn-secondary btn-xs mb-1">
                                                                        Disable Payment
                                                                    </button>
                                                                </form>
                                                            <!-- php: endif; -->
                                                        <!-- php: } -->
                                                    </div>
                                                </td>
                                            </tr>
                                            <!-- php: $x++; endforeach; -->
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>


<!-- end page content -->
<script>
    $(function () {
        $("#adduser").submit(function () {
            var password = $("#password").val();
            var confirmPassword = $("#confirm_password").val();
            if (password != confirmPassword) {
                document.getElementById("check1").className = "fa fa-warning tooltips";
                document.getElementById("bigcheck").className = "input-icon right";
                document.getElementById("main-div").className = "has-error";
                alert("Passwords do not match.");
                return false;
            }
            return confirm('Are you sure you want to submit ?');
            // return true;
        });
    });

    function readURL(input, placeholder) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();


            reader.onload = function (e) {
                $('#' + placeholder)
                    .attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

</script>

`;

export default function ElementElementManagesecurityUsers() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
