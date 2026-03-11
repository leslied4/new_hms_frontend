const rawHtml = `

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
        width: 40% !important;
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
    }
    .md-stepper-horizontal {
	display:table;
	width:100%;
	margin:0 auto;
	background-color:#FFFFFF;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.50);
}
.md-stepper-horizontal .md-step {
	display:table-cell;
	position:relative;
	padding:24px;
}
.md-stepper-horizontal .md-step:hover,
.md-stepper-horizontal .md-step:active {
	background-color:rgba(0,0,0,0.04);
}
.md-stepper-horizontal .md-step:active {
	border-radius: 15% / 75%;
}
.md-stepper-horizontal .md-step:first-child:active {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}
.md-stepper-horizontal .md-step:last-child:active {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.md-stepper-horizontal .md-step:hover .md-step-circle {
	background-color:#757575;
}
.md-stepper-horizontal .md-step:first-child .md-step-bar-left,
.md-stepper-horizontal .md-step:last-child .md-step-bar-right {
	display:none;
}
.md-stepper-horizontal .md-step .md-step-circle {
	width:30px;
	height:30px;
	margin:0 auto;
	background-color:#999999;
	border-radius: 50%;
	text-align: center;
	line-height:30px;
	font-size: 16px;
	font-weight: 600;
	color:#FFFFFF;
}
.md-stepper-horizontal.green .md-step.active .md-step-circle {
	background-color:#00AE4D;
}
.md-stepper-horizontal.orange .md-step.active .md-step-circle {
	background-color:#F96302;
}
.md-stepper-horizontal .md-step.active .md-step-circle {
	background-color: rgb(33,150,243);
}
.md-stepper-horizontal .md-step.done .md-step-circle:before {
	font-family:'FontAwesome';
	font-weight:100;
	content: "\f00c";
}
.md-stepper-horizontal .md-step.done .md-step-circle *,
.md-stepper-horizontal .md-step.editable .md-step-circle * {
	display:none;
}
.md-stepper-horizontal .md-step.editable .md-step-circle {
	-moz-transform: scaleX(-1);
	-o-transform: scaleX(-1);
	-webkit-transform: scaleX(-1);
	transform: scaleX(-1);
}
.md-stepper-horizontal .md-step.editable .md-step-circle:before {
	font-family:'FontAwesome';
	font-weight:100;
	content: "\f040";
}
.md-stepper-horizontal .md-step .md-step-title {
	margin-top:16px;
	font-size:16px;
	font-weight:600;
}
.md-stepper-horizontal .md-step .md-step-title,
.md-stepper-horizontal .md-step .md-step-optional {
	text-align: center;
	color:rgba(0,0,0,.26);
}
.md-stepper-horizontal .md-step.active .md-step-title {
	font-weight: 600;
	color:rgba(0,0,0,.87);
}
.md-stepper-horizontal .md-step.active.done .md-step-title,
.md-stepper-horizontal .md-step.active.editable .md-step-title {
	font-weight:600;
}
.md-stepper-horizontal .md-step .md-step-optional {
	font-size:12px;
}
.md-stepper-horizontal .md-step.active .md-step-optional {
	color:rgba(0,0,0,.54);
}
.md-stepper-horizontal .md-step .md-step-bar-left,
.md-stepper-horizontal .md-step .md-step-bar-right {
	position:absolute;
	top:36px;
	height:1px;
	border-top:1px solid #DDDDDD;
}
.md-stepper-horizontal .md-step .md-step-bar-right {
	right:0;
	left:50%;
	margin-left:20px;
}
.md-stepper-horizontal .md-step .md-step-bar-left {
	left:0;
	right:50%;
	margin-right:20px;
}
</style>
<!-- php: $makeRequestsPermission = false; $approveRequestsPermission = false; $prToPoPermission = false; // Check if $userPrRoles['roles_vsp_permission'] is not null before iterating foreach ($userPrRoles as $key => $userPrRole) { # code... if (!emp... -->

<div class="row">
    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
          
            <ul class="nav nav-tabs">

                <li class="nav-item">
                    <a href="#create_bank_account" class="dropdown-toggle" data-toggle="tab"> Create</a>
                </li>
                <!-- php: if($this->AuthUser->hasAccess(['controller' => 'ShiftScheduler', 'action' => 'index'])) { -->
                    <li class="nav-item">
                        <a href="#view_bank_account" data-toggle="tab">View </a>
                    </li>
                <!-- php: } -->
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="create_bank_account">
                      <!-- <h4>Add a new Invoice</h4> -->
                      <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container text-center p-3 mt-3 mb-2">
                                <div class="card px-5 pt-5 pb-2 mt-1 mb-3">
                                <!-- php: = $this->Form->create($addRequestApproval, ['url' => ['controller' => 'RequestApproval', 'action' => 'addRequestApproval'],'id' =>'msform','novalidate']); -->
                                  <h4>Purchase Requisition by <!-- php: =$this->request->getSession()->read()['Auth']['User']['first_name'] . ' ' . $this->request->getSession()->read()['Auth']['User']['last_name']; --> - <!-- php: = $this->request->getSession()->read()['Auth']['User']['role']['name'] --> on <!-- php: = date('j F Y'); --></h4>
                                    <table class="table mt-5">
									<thead>
										<tr>
                                            <th style="width:30%">Item Name</th>
                                            <th>Unit Cost (<!-- php: = $configs['currency'] -->)</th>
                                            <th>Quantity</th>
                                            <th>Indicative Price (<!-- php: = $configs['currency'] -->)</th>
										</tr>
									</thead>
									<tbody id="item-body2"></tbody>
								</table>    
                                <div class="row">
                                <div class="col-md-5 p-2 text-left">
                                <h5 id="add_inventory_items" style="cursor:pointer" class="text-primary my-0 ml-2">
                                    <i class="fa fa-plus"></i>&nbsp;
                                    Add Inventory Item
                                </h5>
                                <h5 id="add_catalogue_items" style="cursor:pointer" class="text-primary mt-3 my-0 ml-2">
                                    <i class="fa fa-plus"></i>&nbsp;
                                    Add VSP Catalogue Item
                                </h5>
                                <h5 id="add_non_items" style="cursor:pointer" class="text-primary mt-3 mb-0 ml-2">
                                    <i class="fa fa-plus"></i>&nbsp;
                                    Add Non-catalogue Item
                                </h5>
                                </div>
                                <div class="col-md-7 p-2">
                                    
                                </div>
                                </div>
                                <table class="table mt-5">
									<tbody>
                                        <tr>
                                             <td>
                                                <h5 class="text-left">Indicative Total Price (<!-- php: = $configs['currency'] -->)</h5>
                                                <input placeholder="Indicative Price" type="text" name="indicative_amount" id="indicative-catalogue-items" class="form-control">
                                            </td>
                                            <td>
                                                <h5 class="text-left">Estimated Purchase Value<br/>(Inventory items) (<!-- php: = $configs['currency'] -->)</h5>
                                                <input placeholder="Inventory Items" type="text" id="inventory-items" name="inventory_amount" class="form-control">
                                            </td>
                                            <td>
                                                <h5 class="text-left">Estimated Purchase Value<br/>(VSP Catalogue items) (<!-- php: = $configs['currency'] -->)</h5>
                                                <input placeholder="Catalogue Items" type="text" id="catalogue-items" name="catalogue_amount" class="form-control">
                                            </td>
                                            <td>
                                            <h5 class="text-left">Estimated Purchase Value<br/>(Non-catalogue items) (<!-- php: = $configs['currency'] -->)</h5>
                                                <input placeholder="Non-catalogue Items" type="text" id="non-catalogue-items" name="non_catalogue_amount" class="form-control">
                                            </td>
                                            <td>
                                            <h5 class="text-left">Available Budget (<!-- php: = $configs['currency'] -->)</h5>
                                                <!-- <input readonly name="budget" placeholder="Available Budget"  value="<!-- php: // $dep_budget != "" ? $dep_budget : 'Budget Not Configured' -->" type="text" id="budget" class="form-control <!-- php: // $dep_budget != "" ? '' : 'border border-danger' -->" /> -->
                                                <!-- <input hidden name="budget_id" value="<!-- php: // $department_id -->" /> -->
                                                <SearchableSelectField name="budget" id="all_budgets" class="form-control">
                                                    <option selected Disabled>Select A Budget</option>
                                                    <!-- php: foreach ($budgets as $key => $bud): -->
                                                        <option value="<!-- php: = $bud->id -->"><!-- php: = $bud->expense_category --></option>
                                                    <!-- php: endforeach; -->
                                                </SearchableSelectField>
                                            </td>
                                        </tr>
                                    </tbody>
								</table>
                                    <!-- php: if ($makeRequestsPermission) { -->
                                        <!-- php: if(count($department_dons) < 0) { -->
                                            <input type="submit" disable id="next2" name="next" style="width:150px"
                                                    class="next action-button btn btn-primary"
                                                    value="Submit" /><br/>
                                                    <small class="text-danger">Request approvals not available for your department</small>
                                            <!-- php: } else { -->
                                                <input type="submit" id="next2" name="next" style="width:150px"
                                                    class="next action-button btn btn-primary"
                                                    value="Submit" />
                                        <!-- php: } -->
                                        <!-- php: } else { -->
                                    <div>
                                        <p>You do not have the ability to submit a Purchase Request.</p>
                                    </div>
                                    <!-- php: } -->
                                <!-- php: = $this->Form->end() -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- php: if($this->AuthUser->hasAccess(['controller' => 'ShiftScheduler', 'action' => 'index'])) { -->
                <div class="tab-pane" id="view_bank_account">
                    <div class="container-fluid px-5">
                        <div class="table-responsive">
                            <table id="accountstable" class="table table-hover customDatable full-width accountstable">
                                <thead>
                                    <tr>
                                        <th>PR Date</th>
                                        <th>PR Name/Number</th>
                                        <th>Total Number</th>
                                        <th>Indicative Price</th>
                                        <th>Status</th>
                                        <th>Purchase Status</th>
                                        <th>Requested By</th>
                                        <th>Comments</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <!-- php: foreach($requests as $request){ -->
                                    <tr>
                                        <td><!-- php: = $request->date --></td>
                                        <td><!-- php: = $request->name --></td>
                                        <td><!-- php: = $request->total_number --></td>
                                        <td><!-- php: = $configs['currency'] --> <!-- php: = $request->amount --></td>
                                        <td>
                                        <!-- php: $disabe = 0; if($request->status == "pending"){ $pending_count = 0; foreach($request->vsp_purchase_approval as $ap) { if($ap->status == 0){ $pending_count++; } if($ap->user_id == $this->request->getSession()->read()['Auth']['User']['id'] &&... -->
                                         <!-- php: $cmted = 0; $p = 0; foreach($request->vsp_purchase_approval_comment as $comm) { if($comm->status == 0){ $p++; } if($comm->user_id == $this->request->getSession()->read()['Auth']['User']['id'] && $comm->status !== 0){ $cmted = 1; } } -->
                                        </td>
                                        <td>
                                            <!-- php: = $request->po_status == 0 ? 'Not Ordered' : 'Order Placed' -->
                                        </td>
                                        <td><!-- php: = $request->requested_by --></td>
                                        <td>
                                            <ol>
                                                <!-- php: foreach($request->vsp_purchase_approval_comment as $comment){ -->    
                                                    <li>
                                                        <label><!-- php: = $comment->user->first_name.' '.$comment->user->last_name --> <span class="badge badge-danger"><!-- php: = $comment->user->role->name --></span><br/><!-- php: = $comment->comment --></label>  
                                                    </li>
                                                <!-- php: } -->
                                            </ol>
                                        </td>
                                        <td>
                                            <!-- php: if($request->status != "received"){ -->
                                            <a href="javascript:" data-toggle="modal" data-target="#view_tracking<!-- php: =$request->id -->" class="btn btn-sm btn-primary">Tracking View</a>
                                            <!-- php: if ($prToPoPermission && $request->po_status == 0 && sizeof($request->vsp_purchase_approval) > 0 && $request->vsp_purchase_approval[0]->status == 1) { -->
                                                <a href="<!-- php: = $this->Url->build(['controller' => 'RequestApproval', 'action' => 'requestToPurchaseOrder', $request->id]) -->" class="btn btn-sm btn-secondary">Place Order</a>
                                            <!-- php: } -->
                                            <!-- php: } if($request->status == "pending"){ -->
                                            <!-- php: if ($makeRequestsPermission) { -->
                                                <!-- php: = $disabe == 1 ? '<a href="javascript:" data-toggle="modal" data-target="#view_appr_status'.$request->id.'" class="btn btn-sm btn-info">Approvals Status</a>' : '<a href="javascript:" data-toggle="modal" data-target="#add_approval'.$request-... -->
                                                <!-- php: = $disabe == 1 ? "" : $this->Form->postLink(__('Decline'), ['controller'=>'RequestApproval','action'=>'declineRequest',$request->id, $this->request->getSession()->read()['Auth']['User']['id'] ], ['class' => 'btn btn-danger btn-sm']) -->
                                            <!-- php: } -->
                                            <!-- php: } -->
                                            <!-- php: if($request->status != "received"){ -->
                                            <!-- php: = $cmted == 1 ? '' : '<a href="javascript:" data-toggle="modal" data-target="#add_comment'.$request->id.'" class="btn btn-warning btn-sm">Leave Comment</a>' -->
                                            <!-- php: } -->
                                    </td>
                                    </tr>
                                <!-- php: } -->
                                </tbody>
                            </table>
                            <!-- php: foreach($requests as $request){ -->
                                <div class="modal fade" id="view_appr_status<!-- php: = $request->id -->" tabindex="-1"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <h4 class="text-slate-900 my-0">Approvals Status
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
                                                    <div class="container-fluid">
                                                        <div class="table-responsive">
                                                            <table id="approval-table-<!-- php: =$request->id -->" class="table ">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <!-- php: foreach($request->vsp_purchase_approval as $approvals){ if($approvals->user_id == $this->request->getSession()->read()['Auth']['User']['id'] && $approvals->status != 0){ $user_approvals[$approvals->user_id] = 1; $d = 1; } else { $user_appro... -->
                                                                    <tr>
                                                                        <td>
                                                                            <!-- php: = $approvals->user->first_name.' '.$approvals->user->last_name -->
                                                                            <span
                                                                                class="badge badge-danger"><!-- php: = $approvals->user->role->name --></span>
                                                                        </td>
                                                                        <td>
                                                                            <!-- php: if($approvals->status == 0) { echo "<small class='text-warning'>WAITING FOR APPROVAL</small>"; } else if($approvals->status == -1){ echo "<small class='text-danger'>DECLINED</small>"; }else if($approvals->status == 1){ echo "<small class='t... -->
                                                                        </td>
                                                                    </tr>
                                                                    <!-- php: } -->
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center py-1 justify-content-end">
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
                                <div class="modal fade" id="add_approval<!-- php: = $request->id -->" tabindex="-1"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <h4 class="text-slate-900 my-0">Approval For #<!-- php: = $request->name -->
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
                                                    <!-- php: = $this->Form->create($addApproval, ['url' => ['controller' => 'RequestApproval', 'action' => 'addApproval']]); -->
                                                    <input type="hidden" name="vsp_purchase_id"
                                                        value="<!-- php: = $request->id -->">
                                                    <input type="hidden" name="status" value="1">
                                                    <input type="hidden" name="user_id"
                                                        value="<!-- php: = $this->request->getSession()->read()['Auth']['User']['id'] -->">
                                                    <div class="container-fluid">
                                                        <div class="table-responsive">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr style="line-height: 12px">
                                                                        <th class="left"
                                                                            style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                                            Item Name</th>
                                                                        <th class="left"
                                                                            style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                                            Unit Cost</th>
                                                                        <th class="left"
                                                                            style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                                            Quantity</th>
                                                                        <th class="left"
                                                                            style="border-bottom: 1px solid #ef6575; border-top: 1px solid #ef6575;">
                                                                            Indicative Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <!-- php: $ttl = 0; $inventoryTotal = 0; $vspCatalogueTotal = 0; $nonCatalogueTotal = 0; foreach($request->vsp_purchase_items as $item){ $amount = $item->total_amount; $type = $item->type; switch($type) { case 1: // inventory Item $inventoryTotal += ... -->   
                                                                    <tr>
                                                                        <td>
                                                                            <!-- php: = $item->type == 2 ? $item->item_name : ($item->type == 3 ? $item->item->full_name : ($item->type == 1 ? $item->vsp_procurement_item->name : $item->item->name ?? '')); -->
                                                                        </td>
                                                                        <td><!-- php: = $configs['currency'] --> <!-- php: = $item->total_amount --></td>
                                                                        <td><!-- php: = $item->qty --></td>
                                                                        <td><!-- php: = $configs['currency'] --> <!-- php: = $item->total_amount --></td>
                                                                    </tr>
                                                                    <!-- php: $ttl = $ttl + $item->total_amount; } -->
                                                                    <tr style="line-height: 12px">
                                                                        <th class="left" style="border:none"></th>
                                                                        <th class="left" style="border:none"></th>
                                                                        <th class="left" style="border:none"></th>
                                                                        <th class="left" style="border:none">Inventory Items: <!-- php: = $configs['currency'] --> <!-- php: = $inventoryTotal --></th>
                                                                    </tr>
                                                                    <tr style="line-height: 12px">
                                                                        <th class="left" style="border:none"></th>
                                                                        <th class="left" style="border:none"></th>
                                                                        <th class="left" style="border:none"></th>
                                                                        <th class="left" style="border:none">VSP Catalogue Items: <!-- php: = $configs['currency'] --> <!-- php: = $vspCatalogueTotal --></th>
                                                                    </tr>
                                                                    <tr style="line-height: 12px">
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style="border:none">Non-Catalogue Items: <!-- php: = $configs['currency'] --> <!-- php: = $nonCatalogueTotal --></th>
                                                                    </tr>
                                                                    <tr style="line-height: 12px">
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style="border-top: 2px solid #ef6575;border-bottom: 2px solid #ef6575;"> Total Indicative Price: <!-- php: = $configs['currency'] --> <!-- php: = $ttl --></th>
                                                                    </tr>
                                                                    </tr>
                                                                    <tr style="line-height: 12px">
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left" style=" border:none"></th>
                                                                        <th class="left p-0" style=" border:none">
                                                                            <div
                                                                                class="container-fluid d-none p-5 mt-3">

                                                                            </div>
                                                                        </th>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center py-1 justify-content-end">
                                                        <!-- php: = (isset($user_approvals[$this->request->getSession()->read()['Auth']['User']['id']]) && $user_approvals[$this->request->getSession()->read()['Auth']['User']['id']] == 1) ? '' : '<button style="height:20px;width:auto;" class="btn bg-white b... -->
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

                                <!-- leave comment -->
                                <div class="modal fade" id="add_comment<!-- php: = $request->id -->" tabindex="-1"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <h4 class="text-slate-900 my-0">Leave Comment For #<!-- php: = $request->name -->
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
                                                    <!-- php: = $this->Form->create($addApprovalComment, ['url' => ['controller' => 'RequestApproval', 'action' => 'addComment']]); -->
                                                    <input type="hidden" name="vsp_purchase_id"
                                                        value="<!-- php: = $request->id -->">
                                                    <input type="hidden" name="status" value="1">
                                                    <input type="hidden" name="user_id"
                                                        value="<!-- php: = $this->request->getSession()->read()['Auth']['User']['id'] -->">
                                                    <div class="container-fluid">

                                                    

                                                        <div class="row mt-3 pl-2">
                                                            <label for="" class="col-md-3">Comment</label>
                                                            <div class="col-md-7 p-1">
                                                               <textarea name="comment" rows="5" class="form-control"></textarea>
                                                            </div>
                                                        </div>
                                                       


                                                    </div>
                                                </div>
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center py-1 justify-content-end">
                                                        <!-- php: = (isset($user_approvals[$this->request->getSession()->read()['Auth']['User']['id']]) && $user_approvals[$this->request->getSession()->read()['Auth']['User']['id']] == 1) ? '' : '<button style="height:20px;width:auto;" class="btn bg-white b... -->
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

                                <!-- view comment -->
                                <div class="modal fade" id="view_comment<!-- php: = $request->id -->" tabindex="-1"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <h4 class="text-slate-900 my-0">View Comment For #<!-- php: = $request->name -->
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
                                                    
                                                    <div class="container-fluid">

                                                    
                                                    <!-- php: foreach($request->vsp_purchase_approval_comment as $comment){ -->
                                                          
                                                        <div class="row mt-3 d-flex align-items-center pl-2">
                                                            <label for="" class="col-md-5" style="font-weight:bold"><!-- php: = $comment->user->first_name.' '.$comment->user->last_name --> <span class="badge badge-danger"><!-- php: = $comment->user->role->name --></span></label>
                                                            <div class="col-md-7 p-1">
                                                               <h5 class="d-flex align-items-center m-0"><!-- php: = $comment->comment --></h5>
                                                            </div>
                                                        </div>
                                                    <!-- php: } -->
                                                       


                                                    </div>
                                                </div>
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center py-1 justify-content-end">
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

                                  <!-- Tracking View -->
                                <div class="modal fade" id="view_tracking<!-- php: = $request->id -->" tabindex="-1"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <h4 class="text-slate-900 my-0">Tracking Order #<!-- php: = $request->name -->
                                                        </h4>
                                                        <div>
                                                            <button data-dismiss="modal" aria-label="Close"
                                                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                                                    class="fa fa-times text-primary"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- php: $tr1 = $tr2 = $tr3 = $tr4 = 0; //$tr3 = 'active'; switch($request->status){ case 'pending': $tr1 = 'active'; break; case 'awaiting payment': $tr2 = 'active'; break; case 'shipping': $tr3 = 'active'; break; case 'review': $tr4 = 'active'; br... -->
                                                <div class="container bg-white p-2">
                                                    <div class="md-stepper-horizontal orange">
                                                        <div class="md-step <!-- php: = $tr1 --> ">
                                                            <div class="md-step-circle"><span>1</span></div>
                                                            <div class="md-step-title">Waiting Approval</div>
                                                            <div class="md-step-bar-left"></div>
                                                            <div class="md-step-bar-right"></div>
                                                        </div>
                                                        <div class="md-step <!-- php: = $tr2 --> ">
                                                            <div class="md-step-circle"><span>2</span></div>
                                                            <div class="md-step-title">Approved</div>
                                                            <div class="md-step-bar-left"></div>
                                                            <div class="md-step-bar-right"></div>
                                                        </div>
                                                        <div class="md-step <!-- php: = $tr3 -->">
                                                            <div class="md-step-circle"><span>3</span></div>
                                                            <div class="md-step-title">PO Created</div>
                                                            <div class="md-step-bar-left"></div>
                                                            <div class="md-step-bar-right"></div>
                                                        </div>
                                                        <div class="md-step <!-- php: = $tr4 -->">
                                                            <div class="md-step-circle"><span>4</span></div>
                                                            <div class="md-step-title">Procurement Done</div>
                                                            <div class="md-step-bar-left"></div>
                                                            <div class="md-step-bar-right"></div>
                                                        </div>
                                                        <div class="md-step <!-- php: = $tr4 -->">
                                                            <div class="md-step-circle"><span>5</span></div>
                                                            <div class="md-step-title">Receiving Purchase</div>
                                                            <div class="md-step-bar-left"></div>
                                                            <div class="md-step-bar-right"></div>
                                                        </div>
                                                    </div>
                                                   <div class="container">
                                                   <!-- php: if($request->status == 'awaiting payment'){ -->
                                                        <div class="row mt-3">
                                                            <div class="col-md-2">
                                                                <label>Amount</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="text" id="tracking_amt<!-- php: = $request->id -->" readonly
                                                                    value="<!-- php: = $request->amount -->"
                                                                    class="form-control" />
                                                                <input type="hidden" name="purchase_id" id="purchase_id<!-- php: = $request->id -->"
                                                                    value="<!-- php: = $request->name -->" />
                                                                <input type="hidden" name="req_id" id="req_id<!-- php: = $request->id -->"
                                                                    value="<!-- php: = $request->id -->" />
                                                            </div>
                                                        </div>
                                                        <!-- <div class="row mt-3">
                                                            <div class="col-md-2">
                                                                <label>Email</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="email" id="tracking_email<!-- php: //= $request->id -->"
                                                                    name="tracking_email" required
                                                                    class="form-control" />
                                                            </div>
                                                        </div> -->
                                                        <div class="d-flex justify-content-end">
                                                            <button id="confirm_payment<!-- php: = $request->id -->"
                                                                class="btn btn-info d-none mt-4">Confirm
                                                                Payment</button>
                                                        </div>
                                                    <!-- php: } -->
                                                   </div>
                                                   <div class="container">
                                                   <!-- php: if($request->status == 'shipping'){ -->
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Requested By</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="text" readonly value="<!-- php: = $request->requested_by -->" name="requested_by" id="requested_by" class="form-control">
                                                                <input type="hidden" name="purchase_id" id="purchase_id" value="<!-- php: = $request->name -->" />
                                                                <input type="hidden" name="req_id" id="req_id<!-- php: = $request->id -->" value="<!-- php: = $request->id -->" />
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Facility Name</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="text" readonly value="<!-- php: = $inst_name->institution -->" name="requested_by" id="requested_by" class="form-control"/>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Facility Phone</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="text" readonly value="<!-- php: = $inst_name->phone1 -->" name="requested_by" id="requested_by" class="form-control"/>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Facility Address</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                               <textarea name="tracking_address" value="<!-- php: = $inst_name->address -->" id="tracking_address" rows="2" class="form-control"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-end">
                                                        <button id="confirm_shipping<!-- php: = $request->id -->" class="btn btn-secondary mt-4">Confirm</button>
                                                        </div>
                                                    <!-- php: } -->
                                                   </div>
                                                   <div class="container">
                                                   <!-- php: if($request->status == 'review'){ -->
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Order No.</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="text" readonly value="<!-- php: = $request->name -->" name="requested_by" id="requested_by" class="form-control">
                                                                
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Requested By</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="text" readonly value="<!-- php: = $request->requested_by -->" name="requested_by" id="requested_by" class="form-control">
                                                                
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>No of Items</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="text" readonly value="<!-- php: = $request->total_number -->" name="requested_no_items" id="requested_no_items" class="form-control">
                                                                
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Status</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                               <SearchableSelectField name="tracking_status" id="tracking_received<!-- php: = $request->id -->" class="form-control">
                                                                <option value="received">Received</option>
                                                                <option value="not_received">Not Received</option>
                                                               </SearchableSelectField>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-3">
                                                                <label>Any Problems ?</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <textarea name="problems" id="tracking_problems<!-- php: = $request->id -->" rows="2" class="form-control"></textarea>
                                                                <input type="hidden" value="<!-- php: = $request->id -->" name="req_id" id="req_id<!-- php: = $request->id -->">
                                                                
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-end">
                                                        <button id="confirm_review<!-- php: = $request->id -->" class="btn btn-secondary mt-4">Confirm</button>
                                                        </div>
                                                    <!-- php: } -->
                                                   </div></div>

                                                
                                                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                                                    <div class="d-flex align-items-center py-1 justify-content-end">
                                                        <!-- <button style="height:20px;width:auto;"
                                                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Add</button> -->

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
                                
                            <!-- php: } -->
                        </div>
                    </div>
                </div>
                <!-- php: } -->
            </div>
        </div>
    </div>
</div>


<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<script>
<!-- php: foreach($requests as $request){ -->
  

$('#confirm_payment<!-- php: = $request->id -->').on('click', function(e){
        
	e.preventDefault();
        var id = $("#req_id<!-- php: = $request->id -->").val();
    $.ajax({
      url:'<!-- php: = $this->Url->build(['controller' => 'RequestApproval', 'action' => 'makePayment']) -->',
      method:"POST",
      cache:false,
      data:{
        id: id
      },
      dataType:"json",
      success:function(data)
      {
        //console.log(data);
		if(data.status == "success"){
			console.log(data);
          //alert(data.message);
		  alertify.success(data.message);
          window.location.reload();
		//   $('#patient_email').val("");
		//   $('#phone_number').val("");
		//   $('#transaction_no').val("");
		//   $('#payment_timer').addClass('d-none');
		//   $('#confirm-payment-btn').addClass('d-none');
		//   $('#amount_received').val('');
		//   $('#change_amount').val('');
		//   $('#amount').val('');
		//   $('#makePayment').modal('hide');
		} else{
		  //alert(data.message);
		  alertify.error(data.message);
		}
      }
    });
});
$('#confirm_shipping<!-- php: = $request->id -->').on('click', function(e){
        
        e.preventDefault();
        // var amount = $('#tracking_amt<!-- php: = $request->id -->').val();
        //     var email = $('#tracking_email<!-- php: = $request->id -->').val();
        //     var number = $('#tracking_number<!-- php: = $request->id -->').val();
        //     var purchase_id = $('#purchase_id<!-- php: = $request->id -->').val();
            var req_id = $("#req_id<!-- php: = $request->id -->").val();
        $.ajax({
          url:'<!-- php: = $this->Url->build(['controller' => 'RequestApproval', 'action' => 'confirmShipping']) -->',
          method:"POST",
          cache:false,
          data:{
            req_id: req_id
          },
          dataType:"json",
          success:function(data)
          {
            //console.log(data);
            if(data.status == "success"){
                console.log(data);
              //alert(data.message);
              alertify.success(data.message);
              window.location.reload();
            } else{
              //alert(data.message);
              alertify.error(data.message);
            }
          }
        });
});

$('#confirm_review<!-- php: = $request->id -->').on('click', function(e){
        
        e.preventDefault();
        // var amount = $('#tracking_amt<!-- php: = $request->id -->').val();
        //     var email = $('#tracking_email<!-- php: = $request->id -->').val();
        //     var number = $('#tracking_number<!-- php: = $request->id -->').val();
        //     var purchase_id = $('#purchase_id<!-- php: = $request->id -->').val();
            var req_id = $("#req_id<!-- php: = $request->id -->").val();
            var tracking_problems = $("#tracking_problems<!-- php: = $request->id -->").val();
            var tracking_received = $("#tracking_received<!-- php: = $request->id -->").val();
        $.ajax({
          url:'<!-- php: = $this->Url->build(['controller' => 'RequestApproval', 'action' => 'confirmReview']) -->',
          method:"POST",
          cache:false,
          data:{
            req_id: req_id,
            tracking_problems: tracking_problems,
            tracking_received: tracking_received
          },
          dataType:"json",
          success:function(data)
          {
            //console.log(data);
            if(data.status == "success"){
                console.log(data);
              //alert(data.message);
              alertify.success(data.message);
              window.location.reload();
            } else{
              //alert(data.message);
              alertify.error(data.message);
            }
          }
        });
    });

    <!-- php: } -->
 

    $('#accountstable').DataTable({
        "order": [ 0, 'desc' ]
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

    var counter_3 = 0;
    var counter_2 = 0;
    var count = 0;
    var total = [];
    var total1 = [];
    var total2 = [];

    function removeExtraFields(counter){
        t = 0;
        var deduct = $('#indicative-catalogue-items').val()-$('#amount_'+counter).val();
        var deduct2 = $('#catalogue-items').val()-$('#amount_'+counter).val();
        if(deduct == 0){
            $('#next2').attr("disabled",true);
        }
        $('#indicative-catalogue-items').val(deduct);
        $('#catalogue-items').val(deduct2);
        $('#name_' + counter).remove();
    }

    function removeExtraFieldsInv(counter){
        t = 0;
        var deduct = $('#indicative-catalogue-items').val()-$('#amount_inv_'+counter).val();
        var deduct2 = $('#inventory-items').val()-$('#amount_inv_'+counter).val();
        if(deduct == 0){
            $('#next2').attr("disabled",true);
        }
        $('#indicative-catalogue-items').val(deduct);
        $('#inventory-items').val(deduct2);
        $('#name_inv_' + counter).remove();
    }

    function removeExtraFieldsNon(counter){
        t = 0;
        var deduct = $('#indicative-catalogue-items').val()-$('#amount_non_'+counter).val();
        var deduct2 = $('#catalogue-items').val()-$('#amount_non_'+counter).val();
        $('#indicative-catalogue-items').val(deduct);
        $('#non-catalogue-items').val(deduct2);
        $('#name_non_' + counter).remove();
    }

    $('#add_catalogue_items').on('click', function() {
        counter_2 ++
        $('<tr id="name_'+ counter_2 +'"><td> <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="item_name[]" id="item_name_'+counter_2+'" title="Select Item(s)" data-live-search="true" required><!-- php: foreach($Vsp as $vsp){ foreach($vsp->vsp_procurement_items as $vsp_item){ --> <option data-amount="<!-- php: =$vsp_item->cost -->" data-content="<!-- php: =$vsp_item->name --> <span class='+"badge badge-danger"+'><!-- php: =$vsp->name --></span>"><!-- php: = $vsp_item->id --></option><!-- php: }} --></SearchableSelectField></td><td><input name="unit_cost[]" id="unit_cost_'+counter_2+'" type="number" class="form-control" readonly placeholder="Select Item" /></td><td><input type="number" name="qty[]" id="qty_'+counter_2+'" class="form-control" placeholder="Enter Quantity"></td><td style="position:relative;"><input name="amount[]" placeholder="Amount" readonly id="amount_'+counter_2+'" class="form-control  mt-4"/><input hidden name="type[]" value="1"/>&nbsp;&nbsp;<span style="position:absolute; top:38px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter_2 +')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body2");
        $('.selectpicker').selectpicker('render');
        $('#item_name_'+ counter_2).on('change', function(){
                $('#unit_cost_'+ counter_2).val($(this).find(":selected").data("amount"));
        });
         
        $('#qty_'+ counter_2).on('change', function(){

            var amt = Number($("#item_name_"+counter_2).find(":selected").data("amount"));
            var qty = Number($("#qty_"+counter_2).val());
            var formula = amt * qty;
            $('#amount_'+counter_2).val(formula.toFixed(2));
            
            total.push(formula.toFixed(2));
     
            var sum = 0;
            var arr1 = 0
            var arr2 = 0;
            var arr3 = 0;
            for(let i = 0;i<total.length;i++)
            {
                arr1+=Number(total[i]);
            }
            for(let q = 0;q<total1.length;q++)
            {
                arr2+=Number(total1[q]);
            }
            for(let r = 0;r<total2.length;r++)
            {
                arr3+=Number(total2[r]);
            }

            var sum = arr1 + arr2 + arr3;
            $('#indicative-catalogue-items').val(sum.toFixed(2));
            $('#catalogue-items').val(arr1.toFixed(2));
            if(sum.toFixed(2) > $('#budget').val()){
            
            }
            else {
                $('#budget').css({"border":"1px solid lightgreen"});
            }
        });
    });

    $('#add_non_items').on('click', function() {
        count ++
        $('<tr id="name_non_'+ count +'"><td><input class="form-control" name="item_name[]"</td><td><input name="unit_cost[]" id="unit_cost_non_'+count+'" type="number" class="form-control" placeholder="Enter Unit Cost" /></td><td><input type="number" name="qty[]" id="qty_non_'+count+'" class="form-control" placeholder="Enter Quantity"></td><td style="position:relative;"><input name="amount[]" placeholder="Enter Amount" id="amount_non_'+count+'" class="form-control  mt-4"/><input hidden name="type[]" value="2"/>&nbsp;&nbsp;<span style="position:absolute; top:38px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFieldsNon('+ count +')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body2");
        $('#qty_non_'+ count).on('change', function(){

            var amt = Number($("#unit_cost_non_"+count).val());
            var qty = Number($("#qty_non_"+count).val());
            var formula = amt * qty;
            $('#amount_non_'+count).val(formula.toFixed(2));
            total1.push(formula.toFixed(2));
            var arr1 = 0
            var sum1 =0;
            var arr2 = 0;
            var arr3 = 0;
            for(let i = 0;i<total.length;i++)
            {
                arr1+=Number(total[i]);
            }
            for(let q = 0;q<total1.length;q++)
            {
                arr2+=Number(total1[q]);
            }
            for(let r = 0;r<total2.length;r++)
            {
                arr3+=Number(total2[r]);
            }
        
            var sum1 = arr1 + arr2 + arr3;
            $('#non-catalogue-items').val(arr2.toFixed(2));
            $('#indicative-catalogue-items').val(sum1.toFixed(2));
            if(sum1.toFixed(2) > $('#budget').val()){
            
            }
            else {
                $('#budget').css({"border":"1px solid lightgreen"});
            }
        });

        $('#rate_non_'+ counter_2).on('change', function(){
            var qty = Number($('#qty_non_'+counter_2).val());
            var amt = $('#amount_non_'+counter_2).val();
            var cost = Number($('#rate_non_'+counter_2).val());
            var amt = qty * cost;
            var formula = amt;
            $('#amount_non_'+counter_2).val(formula.toFixed(2));
            total1.push(formula.toFixed(2));
            var arr1 = 0
            var arr2 = 0;
            for(let i = 0;i<total.length;i++)
            {
                arr1+=Number(total[i]);
            }
            for(let q = 0;q<total1.length;q++)
            {
                arr2+=Number(total1[q]);
            }
            var sum1 = arr1 + arr2;
            $('#indicative-catalogue-items').val(sum1.toFixed(2));
        });
    });

    $('#add_inventory_items').on('click', function() {
        counter_3 ++
        $('<tr id="name_inv_'+ counter_3 +'"><td> <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="item_name[]" id="item_name_inv_'+counter_3+'" title="Select Item(s)" data-live-search="true" required><!-- php: foreach($items as $inv_item){ --> <option data-amount="<!-- php: =$inv_item['price'] -->" data-content="<!-- php: =$inv_item['name'] --> <span class='+"badge badge-danger"+'><!-- php: = isset($inv_item['stock_status']) ? $inv_item['stock_status'] : $inv_item['status'] --></span>"><!-- php: = $inv_item['id'] --></option><!-- php: } --></SearchableSelectField></td><td><input name="unit_cost[]" id="unit_cost_inv_'+counter_3+'" type="number" class="form-control" readonly placeholder="Select Item" /></td><td><input type="number" name="qty[]" id="qty_inv_'+counter_3+'" class="form-control" placeholder="Enter Quantity"></td><td style="position:relative;"><input name="amount[]" placeholder="Amount" readonly id="amount_inv_'+counter_3+'" class="form-control  mt-4"/><input hidden name="type[]" value="3"/>&nbsp;&nbsp;<span style="position:absolute; top:38px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFieldsInv('+ counter_3 +')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body2");
        $('.selectpicker').selectpicker('render');
        $('#item_name_inv_'+ counter_3).on('change', function(){
                $('#unit_cost_inv_'+ counter_3).val($(this).find(":selected").data("amount"));
        });
         
        $('#qty_inv_'+ counter_3).on('change', function(){

            var amt = Number($("#item_name_inv_"+counter_3).find(":selected").data("amount"));
            var qty = Number($("#qty_inv_"+counter_3).val());
            var formula = amt * qty;
            $('#amount_inv_'+counter_3).val(formula.toFixed(2));
            
            total2.push(formula.toFixed(2));
     
            var sum = 0;
            var arr1 = 0
            var arr2 = 0;
            var arr3 = 0;

            for(let i = 0;i<total.length;i++)
            {
                arr1+=Number(total[i]);
            }
            for(let q = 0;q<total1.length;q++)
            {
                arr2+=Number(total1[q]);
            }
            for(let r = 0;r<total2.length;r++)
            {
                arr3+=Number(total2[r]);
            }

            var sum = arr1 + arr2 + arr3;
            $('#indicative-catalogue-items').val(sum.toFixed(2));
            $('#inventory-items').val(arr3.toFixed(2));
        });
    });
<!-- php: foreach($requests as $request) { -->
    $('#approval-table-<!-- php: =$request->id -->').DataTable();
<!-- php: } -->
</script>

`;

export default function ElementElementRequestApprovalRequests() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
