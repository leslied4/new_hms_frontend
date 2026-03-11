const rawHtml = `
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/jquery.dataTables.css') -->
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/searchBuilder.dataTables.css') -->
<!-- php: = $this->Html->css('../assets/plugins/jquery-tags-input/jquery-tags-input.css') -->

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
                    <a href="#create_bank_account" class="dropdown-toggle" data-toggle="tab"> Create</a>
                </li>

                <li class="nav-item">
                    <a href="#view_bank_account" data-toggle="tab">View </a>
                </li>

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
                <div class="tab-pane" id="create_bank_account">
                    <!-- <h4>Add a new Invoice</h4> -->
                    <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container text-center p-3 mt-3 mb-2">
                                <div class="card px-5 pt-5 pb-2 mt-1 mb-3">
                                <!-- php: = $this->Form->create($addAccount, ['url' => ['controller' => 'Accounts', 'action' => 'addAccount'],'id' =>'msform']); -->
                                    <!-- -->
                                    <ul id="progressbar">
                                        <li class="active" id="personal"><strong>Account Details</strong></li>
                                        <li id="file"><strong>Account Tags</strong></li>
                                        <li id="payment"><strong>Status Protocols</strong></li>
                                        <li id="file"><strong>Compliance Checks</strong></li>
                                        <li id="confirm"><strong>Finish</strong></li>
                                    </ul>
                                    <!-- <div class="progress">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div> <br> fieldsets -->
                                    <fieldset>
                                        <div class="row mt-5">
                                            <div class="col-md-2 text-left">
                                                <h5>Type</h5>
                                            </div>
                                            <div class="col-md-6 text-left">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="type" type="radio"
                                                        id="type_account" value="Account" checked>
                                                    <label class="form-check-label" for="type_account">Account</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="type" type="radio"
                                                        id="type_bank_account" value="Bank Account">
                                                    <label class="form-check-label" for="type_bank_account">Bank
                                                        Account</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="bank_info">
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Bank Name</h5>
                                                </div>
                                                <div class="col-md-6">
                                                <SearchableSelectField class="form-control selectpicker" data-size="5" data-live-search="true" data-required="1" name="bank_name" id="bank_name">
											<option value="">Select...</option>
											<!-- php: foreach($banks as $bank){ -->
											<option value="<!-- php: = $bank->id -->" data-content="<!-- php: = $bank->name --> <span class='badge' style='background:<!-- php: = $bank->banks_category->color -->'><!-- php: = $bank->banks_category->name -->"></option>
											<!-- php: } -->
										</SearchableSelectField>
                                                </div>
                                            </div>
                                            <!-- <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Branch</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <SearchableSelectField name="bank_branch" id="bank_branch"
                                                        class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                        title="Select Bank Branch" data-live-search="true" required>
                                                        <option value="ACCRA">ACCRA</option>
                                                        <option value="KUMASI">KUMASI</option>
                                                        <option value="TAMALE">TAMALE</option>
                                                        <option value="TAKORADI">TAKORADI</option>
                                                        <option value="SUNYANI">SUNYANI</option>
                                                    </SearchableSelectField>
                                                </div>
                                            </div> -->
                                            <!-- <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Branch Code</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" placeholder="Select Bank Branch"
                                                        name="branch_code" id="branch_code" class="form-control"
                                                        readonly>
                                                </div>
                                            </div> -->
                                        </div>
                                        <div id="account_info">

                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Account Name</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="account_name" id="account_name"
                                                        class="form-control">
                                                </div>
                                            </div>

                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Account Description</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <textarea name="account_description" id="account_description"
                                                        rows="2" class="form-control"></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-3">
                                            <div class="col-md-2 text-left">
                                                <h5>Viable Until</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="date" name="viable_until" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-2 text-left">
                                                <h5>Additional Information</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="file" name="additional_information" class="form-control">
                                            </div>
                                        </div>


                                        <input type="button" id="next2" name="next" style="width:120px"
                                            class="next action-button btn btn-primary" value="Next" />
                                        <!-- <input type="button" name="previous" style="width:125px" class="previous action-button-previous btn btn-secondary" value="Previous - Payer" />
                       -->

                                    </fieldset>
                                    <fieldset>
                                        <div class="row mt-5">
                                            <div class="col-md-2 text-left">
                                                <!-- TODO:
                                                   add field opening balance{input amount} as of {date picker}
                                                 -->
                                                <h5>Opening Balance</h5>
                                            </div>
                                            <div class="col-md-2">
                                                <input name="opening_balance" id="opening_balance" type="number" step="0.01" class="form-control">
                                            </div>
                                            <div class="col-md-1">
                                                <h5>As of</h5>
                                            </div>
                                            <div class="col-md-3">
                                                <input name="opening_date" id="opening_date" type="datetime-local" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-2 text-left">
                                                <h5>Cut Off Period</h5>
                                            </div>
                                            <div class="col-md-6 text-left">
                                               <SearchableSelectField disabled name="cutt_off_period" id="cutt_off_period" class="form-control">
                                                 <option value="1"> 1 Month</option>
                                                 <option value="3">3 Months</option>
                                                 <option value="6"> 6 Months</option>
                                                 <option value="12">12 Months</option>
                                               </SearchableSelectField>
                                               <small id="cut-off-desc" class="text-danger mt-3 d-none">Account cut-off period will be due every 1 month(s) starting from date</small>
                                        </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-2 text-left">
                                                <h5>Atrribute Categorization</h5>
                                            </div>
                                            <div class="col-md-6 text-left">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="attribute"
                                                        type="radio" id="money_in" value="MONEY IN">
                                                    <label class="form-check-label" for="money_in">Money In</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="attribute"
                                                        type="radio" id="money_out" value="MONEY OUT">
                                                    <label class="form-check-label" for="money_out">Money Out</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="attribute"
                                                        type="radio" id="money_in_out" value="MONEY IN OUT">
                                                    <label class="form-check-label" for="money_in_out">Money In & Money
                                                        Out</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Departments</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <SearchableSelectField name="departments[]" id="departments"
                                                        class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                        title="Select Deparment(s)" data-live-search="true" multiple>
                                                        <!-- php: foreach($departments as $department): -->
                                                        <option
                                                            data-content="<!-- php: = $department->name --> <span class='badge badge-danger'><!-- php: = $department->code --></span>"
                                                            value="<!-- php: = $department->id -->"><!-- php: = $department->name -->
                                                        </option>
                                                        <!-- php: endforeach; -->
                                                    </SearchableSelectField>
                                                </div>
                                            </div>
                                        <div id="money_out_div">
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Beneficiaries</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <SearchableSelectField name="beneficiaries[]" id="beneficiaries"
                                                        class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                        title="Select Beneficiaries" data-live-search="true" multiple>
                                                       <!-- php: foreach($benefis as $benefit){ -->
                                                        <option value="<!-- php: = $benefit->id -->"><!-- php: = $benefit->title --></option>
                                                       <!-- php: } -->
                                                    </SearchableSelectField>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="money_in_div">
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Partners/Payers</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <SearchableSelectField name="partners[]" id="partners"
                                                        class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                        title="Select Partner/Payer" data-live-search="true" multiple>
                                                        <!-- php: foreach($partners as $partner){ -->
                                                        <option value="<!-- php: = $partner->id -->"><!-- php: = $partner->title --></option>
                                                       <!-- php: } -->
                                                    </SearchableSelectField>
                                                </div>
                                            </div>
                                        </div>


                                        <input type="button" id="next2" name="next" style="width:120px"
                                            class="next action-button btn btn-primary"
                                            value="Next" />
                                        <input type="button" name="previous" style="width:125px"
                                            class="previous action-button-previous btn btn-secondary"
                                            value="Previous" />

                                    </fieldset>
                                    <fieldset>




                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Approve Deposits
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="approve_deposits[]" id="approve deposits"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Approve Pay In Invoices
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="approve_pay_in[]" id="approve_pay_in"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Approve Pay Out Invoices
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="approve_pay_out[]" id="approve_pay_out"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Approve Pay In Claims
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="approve_claims[]" id="approve_claims"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Approve Transaction Withdrawals
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="approve_withdrawal[]" id="approve_withdrawals"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Approve Transfers
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="approve_transfe[]" id="users_select"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <!-- hidden -->
                                        <!-- <div class="row mt-3 pl-2 d-none">
                                            <div class="col-md-3 p-1 text-left">
                                                Funds Disbursements
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="funds_disbursement[]" id="funds_disbursement"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: // foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: //= $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: //= $userRole->role->name --></span>"
                                                        value="<!-- php: //= $userRole->id -->">
                                                        <!-- php: //= $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: // endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div> -->
                                        <!-- end hidden -->
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                            Account Reconciliations
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="account_recon[]" id="account_recon"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                         <!-- hidden -->
                                        <!-- <div class="row mt-3 pl-2 d-none">
                                            <div class="col-md-3 p-1 text-left">
                                                Handle Account Cash
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="handle_cash[]" id="handle_cash"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: // foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: //= $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: //= $userRole->role->name --></span>"
                                                        value="<!-- php: //= $userRole->id -->">
                                                        <!-- php: //= $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: // endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div> -->
                                         <!-- end hidden -->
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Record Cash
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="record_cash[]" id="record_cash"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Make Payments
                                            </div>
                                            <div class="col-md-7 d-flex align-items-center p-1">
                                                <SearchableSelectField
                                                    class="form-control input-height selectpicker show-menu-arrow show-tick"
                                                    data-size="5" name="make_payment[]" id="make_payment"
                                                    title="Select User(s)" data-live-search="true" multiple required>
                                                    <!-- php: foreach($userRoles as $userRole): -->
                                                    <option
                                                        data-content="<!-- php: = $userRole->first_name.' '.$userRole->last_name --> <span class='badge badge-danger'><!-- php: = $userRole->role->name --></span>"
                                                        value="<!-- php: = $userRole->id -->">
                                                        <!-- php: = $userRole->first_name.' '.$userRole->last_name --></option>
                                                    <!-- php: endforeach; -->

                                                </SearchableSelectField>
                                            </div>
                                        </div>




                                        <input type="button" id="next2" name="next" style="width:120px"
                                            class="next action-button btn btn-primary"
                                            value="Next" />
                                        <input type="button" name="previous" style="width:125px"
                                            class="previous action-button-previous btn btn-secondary"
                                            value="Previous" />

                                    </fieldset>
                                    <fieldset>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Undeposited Cash Accounts
                                                <input type="hidden" name="name[]" value="Undeposited Cash Accounts" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="undeposited" class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Approval Of New Accounts
                                                <input type="hidden" name="name[]" value="Approve Of New Accounts" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                              
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="appr_new_accounts"
                                                    class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Pay-In Invoices
                                                <input type="hidden" name="name[]" value="Pay-In Invoices" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="payinvoices" class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Pay Out Invoices
                                                <input type="hidden" name="name[]" value="Pay Out Invoices" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="payoutinvoices"
                                                    class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                         <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Pay In Claims
                                                <input type="hidden" name="name[]" value="PAY IN CLAIMS" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="payinclaims"
                                                    class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Held Cheques
                                                <input type="hidden" name="name[]" value="Held Cheques" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="heldcheques" class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Account Reconciliations
                                                <input type="hidden" name="name[]" value="Account Reconciliations" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="bankrecon" class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Misstated Cash
                                                <input type="hidden" name="name[]" value="Misstated Cash" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="undeposited" class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Cutoff Period For Reporting
                                                <input type="hidden" name="name[]" value="Cutoff Period For Reporting" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="time_status[]" id="cutoffreporting"
                                                    class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <!-- <div class="row mt-3 pl-2">
                                            <div class="col-md-3 p-1 text-left">
                                                Undeposited Cash Accounts
                                                <input type="hidden" name="name[]" value="Undeposited Cash Accounts" />
                                            </div>
                                            <div
                                                class="col-md-7 d-flex justify-content-between style-select align-items-center p-1">
                                                <SearchableSelectField name="time_status[]" id="undeposited" class="form input-height">
                                                    <option value="">Select Time Status</option>
                                                    <option value="4 hours">4 hours</option>
                                                    <option value="6 hours">6 hours</option>
                                                    <option value="8 hours">8 hours</option>
                                                    <option value="12 hours">12 hours</option>
                                                    <option value="1 day"> 1 day</option>
                                                    <option value="2 days">2 days</option>
                                                    <option value="3 days">3 days</option>
                                                    <option value="4 days">4 days</option>
                                                    <option value="7 days">7 days</option>
                                                </SearchableSelectField>
                                                <SearchableSelectField name="priority[]" id="priority" class="form input-height">
                                                    <option value="">Select Priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div> -->

                                        <input type="submit" id="next2" name="next" style="width:120px"
                                            class="next action-button btn btn-primary" value="Finish" />

                                        <input type="button" name="previous" style="width:125px"
                                            class="previous action-button-previous btn btn-secondary"
                                            value="Previous" />
                                    </fieldset>
                                    <fieldset>
                                        <div class="form-card">
                                            <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br>
                                            <div class="row justify-content-center">
                                                <div class="col-3"> <img src="https://i.imgur.com/GwStPmg.png"
                                                        class="fit-image"> </div>
                                            </div> <br><br>
                                            <div class="row justify-content-center">
                                                <div class="col-7 text-center">
                                                    <!-- <h5 class="purple-text text-center">You Have Successfully Signed Up</h5> -->
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <!-- php: = $this->Form->end(); -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane active" id="view_bank_account">
                    <div class="container-fluid px-5">
                        <div class="table-responsive">
                            <table id="accountstable" class="table table-hover customDatable full-width accountstable">
                                <thead>
                                    <tr>
                                        <th style="width:100px!important;">Name</th>
                                        <th>Type</th>
                                        <th>Viable Until</th>
                                        <th>Account Tag</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                   <!-- php: foreach($accounts as $account) { -->
                                    <tr>
                                        <td><!-- php: = $account->account_name == null ? $account->banks_list->name : $account->account_name --> <span class="badge bg-<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo 'success'; }else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'danger'; } else if($account->accounts_tags[0]->attribute == "MONEY IN OUT") { echo 'secondary'; ... -->"><!-- php: = $account->transaction_code --></span>
                                        <!-- php: = $account->active == 0 ? "<span class='badge badge-secondary'>Disabled</span>": "" -->
                                        <!-- php: = $account->bank_branch != null ? '<br/><small class="text-secondary">'.$account->bank_branch.' BRANCH</small>' : '' -->
                                        <!-- php: //= $account->account_description != null ? '<br/><small style="display:inline-block;width:170px!important" class="text-secondary">'.$account->account_description.'</small>' : '' -->
                                       </td>
                                       <td><!-- php: = $account->type --></td>
                                        <td><!-- php: = $account->viable_until --></td>
                                        <td><!-- php: = $account->accounts_tags[0]->attribute --></td>
                                        <td>
                                            <!-- <a href="javascript:" class="btn btn-sm text-primary">Assign</a><br/> -->
                                            <!-- php: if($account->active == 1){ -->
                                            <!-- php: = $account->cash_category == 0 ? $this->Form->postLink(__('Assign Cash Category'), ['controller'=>'Accounts','action'=>'AssignCash',$account->id], ['class' => 'btn text-primary btn-sm']) : $this->Form->postLink(__('Assigned'), ['controller'... -->
                                          
                                            <!-- <a href="javascript:" class="btn btn-sm btn-primary">View</a> -->
                                            <a href="javascript:" data-toggle="modal" data-target="#editAccountModal_<!-- php: = $account->id -->" class="btn btn-warning btn-sm">Edit</a>
                                            <!-- php: } -->
                                            <!-- php: = $account->active == 0 ? ($this->Form->postLink(__('Enable'), ['controller'=>'Accounts','action'=>'toggleAccountStatus',$account->id], ['class' => 'btn btn-success btn-sm'])) : ($this->Form->postLink(__('Disable'), ['controller'=>'Accounts... -->
                                            <a href="<!-- php: = $this->Url->build(['controller' => 'Accounts', 'action' => 'accountView', $account->id]) -->" class="btn btn-info btn-sm">View</a>
                                            <!-- <a href="javascript:" class="btn btn-sm btn-secondary">Disable</a> -->
                                        </td>

                                    </tr>
                                    <div class="modal fade" id="editAccountModal_<!-- php: =$account->id -->" tabindex="-1"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="container px-0 border border-2 border-danger">
                                                    <div class="container-fluid pr-0 bg-danger">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h4 class="text-slate-900 my-0">Edit Account Information</h4>
                                                            <div>
                                                                <button data-dismiss="modal" aria-label="Close"
                                                                    class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                        class="fa fa-times text-primary"></i> </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container bg-white p-2">
                                                        <div class="container my-2 p-3">
                                                            <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Accounts', 'action' => 'editAccount',$account->id]]); -->
                                                            <!-- php: if($account->bank_name != '') { -->
                                                            <div id="bankinfo">
                                                                <div class="row mt-3">
                                                                    <div class="col-md-3 text-left">
                                                                        <h5>Bank Name</h5>
                                                                    </div>
                                                                    <div class="col-md-8">
                                                                        <SearchableSelectField class="form-control selectpicker"
                                                                            data-size="5" data-live-search="true"
                                                                            data-required="1" name="bank_name">
                                                                            <option value="">Select...</option>
                                                                            <!-- php: foreach($banks as $bank){ -->
                                                                                <option <!-- php: = $account->bank_name == $bank->id ? "selected" : "" --> value="<!-- php: = $bank->id -->"
                                                                                    data-content="<!-- php: = $bank->name --> <span class='badge' style='background:<!-- php: = $bank->banks_category->color -->'><!-- php: = $bank->banks_category->name -->">
                                                                                </option>
                                                                                <!-- php: } -->
                                                                        </SearchableSelectField>
                                                                    </div>
                                                                            </div>
                                                            </div>
                                                            <!-- php: } else { -->
                                                            <div id="accountinfo">

                                                                <div class="row mt-3">
                                                                    <div class="col-md-3 text-left">
                                                                        <h5>Account Name</h5>
                                                                    </div>
                                                                    <div class="col-md-8">
                                                                        <input type="text" value="<!-- php: = $account->account_name -->" name="account_name"
                                                                            id="account_name" class="form-control">
                                                                           
                                                                    </div>
                                                                </div>

                                                                <div class="row mt-3">
                                                                    <div class="col-md-3 text-left">
                                                                        <h5>Account Description</h5>
                                                                    </div>
                                                                    <div class="col-md-8">
                                                                        <textarea name="account_description"
                                                                          rows="2"
                                                                            class="form-control"><!-- php: = $account->account_description --></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- php: } -->
                                                            <div class="row mt-4">
                                                                <div class="col-md-3 text-left">
                                                                    <h5>Cut Off Period</h5>
                                                                </div>
                                                                <div class="col-md-8 text-left">
                                                                    <SearchableSelectField name="cutt_off_period"
                                                                        id="cutt_off_period2" class="form-control">
                                                                        <option <!-- php: = $account->cutt_off_period == "1" ? "selected" : "" --> value="1"> 1 Month</option>
                                                                        <option  <!-- php: = $account->cutt_off_period == "3" ? "selected" : "" --> value="3">3 Months</option>
                                                                        <option  <!-- php: = $account->cutt_off_period == "6" ? "selected" : "" --> value="6"> 6 Months</option>
                                                                        <option  <!-- php: = $account->cutt_off_period == "12" ? "selected" : "" --> value="12">12 Months</option>
                                                                    </SearchableSelectField>
                                                                    <small id="cut-off-desc2"
                                                                        class="text-danger mt-3 d-none">Account cut-off
                                                                        period will be due every 1 month(s) starting
                                                                        from date</small>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-3">
                                                                <div class="col-md-3 text-left">
                                                                    <h5>Viable Until</h5>
                                                                </div>
                                                                <div class="col-md-8">
                                                                <input type="hidden" name="type" value="<!-- php: = $account->type -->">
                                                                    <input type="date" value="<!-- php: = $account->viable_until -->" name="viable_until"
                                                                        class="form-control">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container-fluid pr-0 bg-danger">
                                                        <div class="d-flex align-items-center py-1 justify-content-end">


                                                            <button type="submit" style="height:20px;width:auto;"
                                                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                                                            <!-- php: = $this->Form->end() -->
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



<!-- <script src="https://colorlib.com/polygon/vendors/jquery/dist/jquery.min.js"></script> -->


<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
	<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
	<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<script>
  
    $('#bank_branch').on('change', function () {
        $('#branch_code').val('1234');
    });

    $('#opening_balance').on('change', function(){
        $('#cutt_off_period').removeAttr('disabled');
    });

    // get cut-off inscription text
    $('#cutt_off_period').on('change', function(){
        var raw_date = new Date($('#opening_date').val());
        //var parsed_date = moment(raw_date, 'D-M-YYYY');
        var date = moment().format('D/M/YYYY');

      $('#cut-off-desc').html('Account cut-off period reporting will be due every '+ $(this).val() +' month(s) starting from '+ date);
      $('#cut-off-desc').removeClass('d-none');
    });

    $('#money_in_div').hide();
    $('#money_out_div').hide();
    $('#bank_info').hide();

    $('#money_in').on('change', function () {
        if ($(this).is(':checked')) {
            $('#money_in_out').prop('checked', false);
            $('#money_in_div').show();
            $('#money_out_div').hide();
            // new PNotify({
            //     type: 'success',
            //     styling: 'bootstrap3',
            //     title: 'Money In Enabled',
            //     text: 'Account will able to receive payments.',
            //     icon: true,
            //     buttons: {
            //         closer: true,
            //         sticker: true
            //     }
            // });
            alertify.success('Money In Enabled; Account will be able to receive payments')
        }
    });
    $('#money_out').on('change', function () {
        if ($(this).is(':checked')) {
            // $('#money_in_out').prop('checked', false);
            // new PNotify({
            //     type: 'error',
            //     styling: 'bootstrap3',
            //     title: 'Money Out Enabled',
            //     text: 'Account will able to make payments.',
            //     icon: true,
            //     buttons: {
            //         closer: true,
            //         sticker: true
            //     }
            // });
            alertify.error('Money Out Enabled; Account will be able to make payments')
            $('#money_out_div').show();
            $('#money_in_div').hide();
        } 
    });
    $('#money_in_out').on('change', function () {
        if ($(this).is(':checked')) {
            // $('#money_in').prop('checked', false);
            // $('#money_out').prop('checked', false);
            // new PNotify({
            //     addClass: 'greyteam',
            //     styling: 'bootstrap3',
            //     title: 'Money In and Money Out is Enabled',
            //     text: 'Account will able to receive and make payments.',
            //     icon: true,
            //     buttons: {
            //         closer: true,
            //         sticker: true
            //     }
            // });
            alertify.log('Money In and Out Enabled; Account will be able to receive and make payments')
            $('#money_out_div').show();
            $('#money_in_div').show();
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

export default function ElementElementAccountsAccounts() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
