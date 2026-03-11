const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css">

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

#msform input[type="text"],#msform select
 {
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
    width: 20%!important;
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
.invoice-table-header-green 
{
    border:2px solid #27ae60;
    border-radius:15px;
}
.invoice-table-header-yellow
{
    border:2px solid #f9ca24;
    border-radius:15px;
}
.due-date 
{
    color: darkorange;
}
.form-check-label {
    margin-right: 20px;
}

.bxn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 2px 9px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
}
#file-chosen{
  margin-left: 0.3rem;
}

.firstline-table .table .thead-dark th {
    color: black;
    background-color: #e7505a!important;
    border-color: #e7505a!important;
    padding: 5px!important;
}

</style>
<div class="row">

    <div class="borderBox light bordered col-md-12">
        <div class="borderBox-title tabbable-line">
            <!-- <div class="caption">
				<span class="caption-subject font-dark bold uppercase">Invoices</span>
			</div> -->
            <ul class="nav nav-tabs">

                <li class="nav-item">
                    <a href="#create_invoice" data-toggle="tab"> Create</a>
                </li>

                <li class="nav-item">
                    <a href="#pending_invoice" data-toggle="tab"> View</a>
                </li>
            </ul>
        </div>
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane" id="create_invoice">
                    <!-- <h4>Add a new Invoice</h4> -->

                    <div class="container-fluid px-2">
                        <div class="row justify-content-center">
                            <div class="container-fluid text-center p-3 mt-3 mb-2">
                                <div class="card px-5 pt-4 pb-0 mt-1 mb-3">
                                    <!-- <form id="msform"> -->
                                    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'InventoryList', 'action' => 'addEquipment'],'id' =>'msform','novalidate', 'type' => 'file']); -->

                                    <ul id="progressbar">
                                        <li class="active" id="personal"><strong>General Details </strong></li>
                                        <!-- <li id="file"><strong>Upload SOP</strong></li> -->
                                        <li id="cart"><strong>Specifications</strong></li>
                                        <li id="file"><strong>Acceptance Checklist</strong></li>
                                        <li id="file"><strong>Planned Maintenance Schedule</strong></li>
                                        <li id="confirm"><strong>Approval</strong></li>
                                    </ul>

                                    <fieldset>
                                        <div class="row mt-4">
                                            <div class="col-md-2 text-left">
                                                <h5>Equipment Name<span class="text-danger">*</span></h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <input type="text" name="name" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Item Category<span class="text-danger">*</span></h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="item_category" id="item_category"
                                                    class="form-control mb-1 input-height">
                                                    <option value="cat 1">Category #1</option>
                                                    <option value="cat 2">Category #2</option>
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Departments<span class="text-danger">*</span></h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="departments[]" id="departments" multiple
                                                    class="form-control mb-1 input-height selectpicker" data-size='5' data-live-search='true'>
                                                    <!-- php: foreach($departments as $department): -->
                                                    <option value="<!-- php: = $department->id -->"><!-- php: = $department->name --></option>
                                                    <!-- php: endforeach; -->
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Model No. </h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <input id="model_no" name="model" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Manufacturer</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <input id="manufacturer" name="manufacturer" type="text"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Vendor/Supplier</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="vendor_supplier" id="vendor_supplier"
                                                    class="form-control mb-1 input-height">
                                                    <!-- php: foreach($vendors as $vendor): -->
                                                    <option value="<!-- php: = $vendor->id -->"><!-- php: = $vendor->name --></option>
                                                    <!-- php: endforeach; -->
                                                </SearchableSelectField>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Cost Price & Qty</h5>
                                            </div>
                                            <div class="col-md-3 pr-0">
                                                <input name="cost" step="0.1" min="0.1" type="number" id="cost-price"
                                                    placeholder="Cost Price" class="form-control w-100">
                                            </div>
                                            <div class="col-md-3 pr-0">
                                                <input name="quantity" step="1" min="1" type="number" id="qty"
                                                    placeholder="Quantity" class="form-control w-100">
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Total Cost Price</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <input id="total-cost-price" readonly type="number" min="0.1"
                                                    step="0.01" name="total_cost" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Bill per session/hour</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input name="bill_amount" type="number"
                                                            class="w-100 form-control" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <SearchableSelectField name="bill_session" id="" class="form-control">
                                                            <option value="1">1 hour</option>
                                                            <option value="2">2 hours</option>
                                                            <option value="4">4 hours</option>
                                                            <option value="6">6 hours</option>
                                                            <option value="8">8 hours</option>
                                                        </SearchableSelectField>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 text-left">
                                                <h5>Upload SOP</h5>
                                            </div>
                                            <div class="col-md-2 pr-0">
                                                <input type="file" name="sop" id="sop">
                                            </div>
                                        </div>


                                        <input style="width:auto;" type="button" id="next1" name="next"
                                            class="next action-button btn btn-primary" value="Next - Specifications" />
                                        <input type="submit" id="draft1" style="width:auto;margin-right:7px;"
                                            name="draft" value="Save As Draft" class="btn btn-warning action-button">
                                    </fieldset>
                                    <fieldset>
                                        <div class="row mt-3">
                                            <div class="col-md-2 pl-0 text-left">Item Category</div>
                                            <div id="item-preview" class="col-md-6 text-left"></div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 pl-0 text-left">Model No.</div>
                                            <div class="col-md-6 text-left"><span id="model-preview"
                                                    class="badge badge-warning"></span></div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-2 pl-0 text-left">Manufacturer</div>
                                            <div id="manu-preview" class="col-md-6 text-left"></div>
                                        </div>
                                        <div id="item-table">
                                            <table class="table mt-5">
                                                <thead>
                                                    <tr>
                                                        <th>Serial Number</th>
                                                        <th>Location</th>
                                                        <th>Department</th>
                                                        <th>MDC</th>
                                                        <th>Age Specification</th>
                                                        <th>Gender Specification</th>
                                                    </tr>

                                                </thead>
                                                <tbody id="item-body">


                                                </tbody>
                                            </table>
                                        </div>


                                        <div class="row mt-3">
                                            <div class="col-md-5 p-2 text-left">
                                                <h5 id="add_more_button" style="cursor:pointer"
                                                    class="text-primary ml-3">
                                                    <i class="fa fa-plus"></i>&nbsp;
                                                    Add an item
                                                </h5>
                                            </div>
                                            <div class="col-md-7 p-2">

                                            </div>
                                        </div>
                                        <!-- <div class="row my-3">
                                            <div class="col-md-5"></div>
                                            <div class="col-md-7">
                                                <table class="table table-bordered table-fit">
                                                    <tr>
                                                        <th>Subtotal (<span id="cur-val1"></span>)</th>
                                                        <td class="text-center" id="sub-total">0</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Discount (%)</th>
                                                        <td class="text-center" id="sub-dis">
                                                            <input type="number" id="add-discount"
                                                                placeholder="Discount (%)" name="invoice_discount"
                                                                class="form-control text-center">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tax (%)</th>
                                                        <td class="text-center"><input type="number" id="add-tax"
                                                                placeholder="Tax (%)" name="tax"
                                                                class="form-control text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total (<span id="cur-val2"></span>)</th>
                                                        <td class="text-center" id="totall">0</td>
                                                        <input type="hidden" id="amount" name="total_amount">
                                                    </tr>
                                                </table>
                                            </div>
                                        </div> -->

                                        <input type="button" id="" name="next" style="width:auto"
                                            class="next action-button btn btn-primary"
                                            value="Next - Acceptance Checklist" />
                                        <input type="button" name="previous" style="width:auto"
                                            class="previous action-button-previous btn btn-secondary"
                                            value="Previous - General Details" />
                                        <input type="submit" style="width:auto;margin-right:7px;" name="draft"
                                            value="Save As Draft" class="btn btn-warning action-button">
                                    </fieldset>
                                    <fieldset>
                                        <div class="accordion mt-4" id="accordionExample">
                                            <div class="card">
                                                <h4 class="my-0 p-2 text-left text-dark" data-toggle="collapse"
                                                    data-target="#collapseOne" aria-expanded="true"
                                                    aria-controls="collapseOne" style="background-color: #90ee904d"
                                                    id="headingOne">
                                                    1. Delivery
                                                </h4>
                                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                                    data-parent="#accordionExample">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Is the supplier representative present?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="present" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="present" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="present" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Correct number of boxes received?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="received" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="received" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="received" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>After unloading, are the boxes intact?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="intact" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="intact" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="intact" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>if damaged, has this been reported to senior
                                                                    management?<span class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="reported" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="reported" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="reported" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion mt-2" id="accordionExample2">
                                            <div class="card">
                                                <h4 class="my-0 p-2 text-left text-dark" data-toggle="collapse"
                                                    data-target="#collapseTwo" aria-expanded="true"
                                                    aria-controls="collapseTwo" style="background-color: #90ee904d"
                                                    id="headingTwo">
                                                    2. Unpacking (refer to invoices, documents and original
                                                    specifications)
                                                </h4>
                                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                                    data-parent="#accordionExample2">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-4 text-left">
                                                                <h5>is the equipment intact and undamaged?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="undamaged" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="undamaged" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="undamaged" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Equipment complete as ordered?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="ordered" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="ordered" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="ordered" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>User/Operator manual added?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="user_manual_added" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="user_manual_added" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="user_manual_added"
                                                                        id="corrected_if_applicable" value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Service/Technical Manual added?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="technical_manual_added" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="technical_manual_added" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="technical_manual_added"
                                                                        id="corrected_if_applicable" value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Accessories and Consumables added?<span
                                                                        class="text-danger">*</span></h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="consumables_added" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="consumables_added" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="consumables_added"
                                                                        id="corrected_if_applicable" value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Spare parts added?<span class="text-danger">*</span>
                                                                </h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="parts_added" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="parts_added" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="parts_added" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected if
                                                                        Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion mt-2" id="accordionExample3">
                                            <div class="card">
                                                <h4 class="my-0 p-2 text-left text-dark" data-toggle="collapse"
                                                    data-target="#collapseThree" aria-expanded="true"
                                                    aria-controls="collapseThree" style="background-color: #90ee904d"
                                                    id="headingThree">
                                                    3. Installation (refer to manual)
                                                </h4>
                                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                                                    data-parent="#accordionExample3">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Was installation carried out
                                                                    satisfactorily?<span class="text-danger">*</span>
                                                                </h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="satisfactorily" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="satisfactorily" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="satisfactorily"
                                                                        id="corrected_if_applicable" value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected
                                                                        if Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Were all parts present and correctly
                                                                    fitted?<span class="text-danger">*</span>
                                                                </h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="fitted" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="fitted" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="fitted" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected
                                                                        if Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Were technical staff present as
                                                                    learners?<span class="text-danger">*</span>
                                                                </h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="learners" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="learners" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="learners" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected
                                                                        if Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Was the equipment demonstrated as fully
                                                                    working?<span class="text-danger">*</span>
                                                                </h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="working" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="working" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="working" id="corrected_if_applicable"
                                                                        value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected
                                                                        if Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-4 text-left">
                                                                <h5>Were staff in the operation of the
                                                                    equipment?<span class="text-danger">*</span>
                                                                </h5>
                                                            </div>
                                                            <div class="col-md-8 text-left">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="staff_operation" value="1">
                                                                    <label class="form-check-label">Yes</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="staff_operation" value="0">
                                                                    <label class="form-check-label">No</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="staff_operation"
                                                                        id="corrected_if_applicable" value="2">
                                                                    <label class="form-check-label"
                                                                        for="corrected_if_applicable">Corrected
                                                                        if Applicable</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <input type="button" name="next" id="next3" style="width:auto"
                                            class="next action-button btn btn-primary"
                                            value="Next - Planned Maintenance Schedule " />
                                        <input type="button" style="width:auto" name="previous"
                                            class="previous btn btn-secondary action-button-previous"
                                            value="Previous - Specifications" />
                                        <input type="submit" id="draft2" style="width:auto;margin-right:7px;"
                                            name="draft" value="Save As Draft"
                                            class="btn btn-warning action-button" />&nbsp;&nbsp;
                                    </fieldset>
                                    <fieldset>

                                        <div class="row mt-5 mb-3">
                                            <div class="col-md-2 text-left">
                                                <h5>Risk Level<span class="text-danger">*</span></h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="risk_level" id="risk_level"
                                                    class="form-control mb-1 input-height">
                                                    <option selected disabled value="">Select Risk Level</option>
                                                    <option value="12">Class 1 - Low Risk</option>
                                                    <option value="6">Class 2 - Medium Risk</option>
                                                    <option value="3">Class 3 - High Risk</option>
                                                    <option value="0">Custom</option>
                                                </SearchableSelectField>
                                                <h5 class="text-danger mt-2 text-left" id="risk_label"></h5>
                                            </div>
                                        </div>
                                        <div class="row mt-3 mb-3">
                                            <div class="col-md-2 text-left">
                                                <h5>Notice Period<span class="text-danger">*</span></h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <SearchableSelectField name="notice_period" id="notice_period"
                                                    class="form-control mb-1 input-height">
                                                    <option selected disabled value="">Select Notice Period</option>
                                                    <option value="30">30 days</option>
                                                    <option value="7">0-7 days</option>
                                                    <option value="14">14-21 days</option>
                                                    <option value="21">21-28 days</option>
                                                </SearchableSelectField>
                                                <h5 class="text-danger mt-2 text-left" id="risk_label"></h5>
                                            </div>
                                        </div>

                                        <div class="row mt-2">
                                            <div class="col-md-2"></div>
                                            <div class="col-md-6 pr-0">
                                                <div id="custom-maintenance-schedule" class="d-none">
                                                    <div class="accordion" id="accordionExample69">
                                                        <div class="card">
                                                            <h5 class="my-0 d-flex justify-content-start"
                                                                style="background-color: #1880c938" id="heading69">
                                                                <button class="btn btn-link text-dark" type="button"
                                                                    data-toggle="collapse" data-target="#collapse69"
                                                                    aria-expanded="true" aria-controls="collapse69">
                                                                    <i class="fa fa-file"></i>&nbsp; Custom Maintenance
                                                                    Schedule
                                                                </button>
                                                            </h5>
                                                            <div id="collapse69" class="collapse"
                                                                aria-labelledby="heading69"
                                                                data-parent="#accordionExample69">
                                                                <div class="card-body">
                                                                    <!-- <div class="row mt-3">
                                                                <div class="col-md-3">
                                                                    <h5>Repeat Every</h5>
                                                                </div>
                                                                <div class="col-md-7">
                                                                    <SearchableSelectField name="repeat-every" id="repeat-every" class="form-control">
                                                                        <option value="week">Week</option>
                                                                        <option value="2-weeks">2 Weeks</option>
                                                                        <option value="month">Month</option>
                                                                        <option value="2-monts">2 Months</option>
                                                                        <option value="3-months">3 Months</option>
                                                                        <option value="6-months">6 Months</option>
                                                                        <option value="year">Year</option>
                                                                        <option value="2-years">2 Years</option>
                                                                        <option value="3-years">3 years</option>
                                                                    </SearchableSelectField>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-3">
                                                                <div class="col-md-3">
                                                                    <h5>Start On</h5>
                                                                </div>
                                                                <div class="col-md-7">
                                                                    <input id="starts_on" name="starts_on" type="date" class="form-control">
                                                                </div>
                                                            </div>
                                                            <div class="row mt-3">
                                                                <div class="col-md-3">
                                                                    <h5>Ends On</h5>
                                                                </div>
                                                                <div class="col-md-7">
                                                                    <input id="ends_on" name="ends_on" type="date" class="form-control">
                                                                </div>
                                                            </div> -->
                                                                    <div class="row mt-2 pl-2">
                                                                        <div class="col-md-3 p-1">
                                                                            <h5>Recurring:</h5>
                                                                        </div>
                                                                        <div
                                                                            class="col-md-7 d-flex align-items-center p-1">
                                                                            <div class="form-check form-check-inline">
                                                                                <input class="form-check-input"
                                                                                    type="radio" name="type" id="daily"
                                                                                    value="daily">
                                                                                <label class="form-check-label"
                                                                                    for="daily">Daily</label>
                                                                            </div>
                                                                            <div class="form-check form-check-inline">
                                                                                <input class="form-check-input"
                                                                                    type="radio" name="type" id="weekly"
                                                                                    value="weekly">
                                                                                <label class="form-check-label"
                                                                                    for="weekly">Weekly</label>
                                                                            </div>
                                                                            <div class="form-check form-check-inline">
                                                                                <input class="form-check-input"
                                                                                    type="radio" name="type"
                                                                                    id="monthly" value="monthly">
                                                                                <label class="form-check-label"
                                                                                    for="monthly">Monthly</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="repeat-daily3" class="row mt-2 pl-2">
                                                                        <div class="col-md-3 p-1">
                                                                            <h5>Repeat every: </h5>
                                                                        </div>
                                                                        <div
                                                                            class="col-md-3 d-flex align-items-center p-1">
                                                                            <input type="number" name="every_day"
                                                                                class="form-control">
                                                                        </div>
                                                                        <div class="col-md-2 p-1">
                                                                            <h5>day (s)</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div id="repeat-weekly3" class="row mt-2 pl-2">
                                                                        <div class="col-md-3 p-1">
                                                                            <h5>Repeat every: </h5>
                                                                        </div>
                                                                        <div
                                                                            class="col-md-3 d-flex align-items-center p-1">
                                                                            <input type="number" name="every_week"
                                                                                class="form-control">
                                                                        </div>
                                                                        <div class="col-md-2 p-1">
                                                                            <h5>week (s)</h5>
                                                                        </div>
                                                                        <!-- <div class="col-md-12">
                                                                    <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                                                                    <label class="form-check-label" for="mon">Sun</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="week_day" id="mon" value="mon">
                                                                    <label class="form-check-label" for="mon">Mon</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="week_day" id="tue" value="tue">
                                                                    <label class="form-check-label" for="tue">Tue</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="week_day" id="wed" value="wed">
                                                                    <label class="form-check-label" for="wed">Wed</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="week_day" id="thu" value="thu">
                                                                    <label class="form-check-label" for="thu">Thu</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="week_day" id="fri" value="fri">
                                                                    <label class="form-check-label" for="fri">Fri</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="week_day" id="sat" value="sat">
                                                                    <label class="form-check-label" for="sat">Sat</label>
                                                                    </div>
                                                                </div> -->
                                                                    </div>
                                                                    <div id="repeat-monthly3" class="row mt-2 pl-2">
                                                                        <div class="col-md-3 p-1">
                                                                            <h5>Repeat every: </h5>
                                                                        </div>
                                                                        <div
                                                                            class="col-md-2 d-flex align-items-center p-1">
                                                                            <input type="number" name="every_month"
                                                                                class="form-control">
                                                                        </div>
                                                                        <div class="col-md-3 p-1">
                                                                            <h5>month (s)</h5>
                                                                        </div>
                                                                        <!-- <div class="col-md-4 p-1">
                                                                    <SearchableSelectField class="form-control">
                                                                    <option value="first">First</option>
                                                                    <option value="second">Second</option>
                                                                    <option value="third">Third</option>
                                                                    <option value="fourth">Fourth</option>
                                                                    </SearchableSelectField>
                                                                </div> -->
                                                                    </div>
                                                                    <div class="row">
                                                                        <div id="until3" class="container-fluid p-2">
                                                                            <!-- <h5 class="text-left">Stop Condition</h5> -->
                                                                            <div style="border: 1px solid #ccc; border-radius:5px;"
                                                                                class="container py-4 p-3">
                                                                                <!-- <div class="row">
                                                                        <div class="col-md-1"><input type="radio" id="recur-type" name="recur-type"/></div>
                                                                        <div class="col-md-7">
                                                                            <h5 class="text-dark m-0 p-0 text-left">Never Stop</h5>
                                                                            <h6 class="text-left" style="color:#ccc!important">This will repeat indefinitely</h6>
                                                                        </div>
                                                                        </div> -->
                                                                                <div class="row">
                                                                                    <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                                                                    <div class="col-md-11">
                                                                                        <div
                                                                                            class="d-flex align-items-center">
                                                                                            <div class="col-md-5">
                                                                                                <h5
                                                                                                    class="text-dark text-left m-0 p-0">
                                                                                                    Start</h5>
                                                                                            </div>
                                                                                            <div class="col-md-6">
                                                                                                <input type="text"
                                                                                                    readonly
                                                                                                    id="recur-start"
                                                                                                    name="recur_start"
                                                                                                    class="form-control my-0">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row mt-3">
                                                                                    <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                                                                    <div class="col-md-11">
                                                                                        <div
                                                                                            class="d-flex align-items-center">
                                                                                            <div class="col-md-5">
                                                                                                <h5
                                                                                                    class="text-dark text-left m-0 p-0">
                                                                                                    Stop Condition</h5>
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-md-6 text-left">
                                                                                                <div
                                                                                                    class="form-check form-check-inline">
                                                                                                    <input
                                                                                                        class="form-check-input"
                                                                                                        type="radio"
                                                                                                        name="condition"
                                                                                                        id="stop-date"
                                                                                                        value="stop-date">
                                                                                                    <label
                                                                                                        class="form-check-label"
                                                                                                        for="stop-date">Date</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="form-check form-check-inline">
                                                                                                    <input
                                                                                                        class="form-check-input"
                                                                                                        type="radio"
                                                                                                        name="condition"
                                                                                                        id="stop-occurence"
                                                                                                        value="stop-occurence">
                                                                                                    <label
                                                                                                        class="form-check-label"
                                                                                                        for="stop-occurence">Occurence</label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div id="specific-date"
                                                                                    class="row mt-3">
                                                                                    <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                                                                    <div class="col-md-11">
                                                                                        <div
                                                                                            class="d-flex align-items-center">
                                                                                            <div class="col-md-5">
                                                                                                <h5
                                                                                                    class="text-dark text-left m-0 p-0">
                                                                                                    Run until a specific
                                                                                                    date</h5>
                                                                                            </div>
                                                                                            <div class="col-md-6"><input
                                                                                                    type="date"
                                                                                                    class="form-control"
                                                                                                    id="recur-type"
                                                                                                    name="recur_end" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div id="specific-occurence"
                                                                                    class="row mt-3">
                                                                                    <!-- <div class="col-md-1"><input type="radio"/></div> -->
                                                                                    <div class="col-md-11">
                                                                                        <div
                                                                                            class="d-flex align-items-center">
                                                                                            <div class="col-md-5">
                                                                                                <h5 class="text-dark text-left m-0 p-0"
                                                                                                    style="padding-right:33px!important">
                                                                                                    Run until it reaches
                                                                                                </h5>
                                                                                            </div>
                                                                                            <div class="col-md-3"><input
                                                                                                    type="text"
                                                                                                    class="form-control"
                                                                                                    id="recur-type"
                                                                                                    name="occurence" />
                                                                                            </div>
                                                                                            <div style="white-space: nowrap;"
                                                                                                class="col-md-2 pl-1">
                                                                                                occurences
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
                                            </div>
                                        </div>

                                        <!-- php: // if(in_array("APPROVE INVOICE", $statusProtocols)){ -->
                                        <input id="approbtn" type="submit" style="width:auto;margin-right:7px;"
                                            class="btn btn-danger px-2 action-button" value="Submit" />
                                        <!-- php: // } else{ -->
                                        <!-- <input type="submit" name="next" class="next action-button btn btn-primary" value="Finish " />  -->
                                        <!-- php: //} -->
                                        <input type="button" name="previous" style="width:auto"
                                            class="previous btn btn-secondary action-button-previous"
                                            value="Previous - Planned Maintenance Schedule" />


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

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- php: =$this->Form->end(); -->
                <div class="tab-pane active" id="pending_invoice">
                    <!-- border border-left-0 border-right-0 border-bottom-0 border-3 border-primary  -->
                    <div class="card mt-3  card-box">
                        <div class="card-body">
                            <div class="container-fluid py-2 mt-4">

                                <div class="table-responsive mt-2">

                                    <table id="equipment_table"
                                        class="table table-hover customDatable full-width equipment_table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Item Category</th>
                                                <th>Model Number</th>
                                                <th>Manufacturer</th>
                                                <th>Vendor/Supplier</th>
                                                <th>Cost Price</th>
                                                <th>Qty</th>
                                                <th>Total Cost Price</th>
                                                <th>Bill per session/hour</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="equipment_table_body">

                                            <!-- php: foreach($equipments as $equipment): -->
                                            <tr>
                                                <td><!-- php: = $equipment->name --></td>
                                                <td><!-- php: = $equipment->item_category --></td>
                                                <td><!-- php: = $equipment->model --></td>
                                                <td><!-- php: = $equipment->manufacturer --></td>
                                                <td><!-- php: = $equipment->vsp_procurement->name --></td>
                                                <td><!-- php: = $equipment->cost --></td>
                                                <td><!-- php: = $equipment->quantity --></td>
                                                <td><!-- php: = $equipment->total_cost --></td>
                                                <td><!-- php: = $equipment->bill_amount --></td>
                                                <td>
                                                    <button onclick="editEquipment('<!-- php: = $equipment->id -->');"
                                                        class="btn btn-xs btn-warning">Edit</button>
                                                    <button onclick="deleteEquipment(<!-- php: = $equipment->id -->);"
                                                        class="btn btn-xs btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                            <!-- php: endforeach; -->

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
</div>


<div class="modal fade" id="deleteEquipmentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Delete Equipment</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <form id="deleteEquipmentForm">
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            <h4>Are you sure you want to delete equipment ?</h4>
                            <input type="hidden" id="equipment_input_id">
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Yes
                                &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                </form>
                <button style="height:20px;width:auto;"
                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                    data-dismiss="modal" aria-label="Close">No&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                </button>
            </div>
        </div>
    </div>
</div></div></div>
<div class="modal fade" id="editEquipmentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Edit Equipment</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <form id="editEquipmentForm">
                    <div class="container bg-white p-2">
                        <div class="container-fluid">
                            <div class="row mt-4">
                                <div class="col-md-4 text-left">
                                    <h5>Name<span class="text-danger">*</span></h5>
                                </div>
                                <div class="col-md-8 pr-0">
                                    <input type="text" name="name" id="edit_item_name" class="form-control">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4 text-left">
                                    <h5>Item Category<span class="text-danger">*</span></h5>
                                </div>
                                <div class="col-md-8 pr-0">
                                    <SearchableSelectField name="item_category" id="edit_item_category"
                                        class="form-control mb-1 input-height">
                                        <option value="cat 1">Category #1</option>
                                        <option value="cat 2">Category #2</option>
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4 text-left">
                                    <h5>Model No. </h5>
                                </div>
                                <div class="col-md-8 pr-0">
                                    <input id="edit_model_no" name="model" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4 text-left">
                                    <h5>Manufacturer</h5>
                                </div>
                                <div class="col-md-8 pr-0">
                                    <input id="edit_manufacturer" name="manufacturer" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4 text-left">
                                    <h5>Vendor/Supplier</h5>
                                </div>
                                <div class="col-md-8 pr-0">
                                    <SearchableSelectField name="vendor_supplier" id="edit_vendor_supplier"
                                        class="form-control mb-1 input-height">
                                        <!-- php: foreach($vendors as $vendor): -->
                                        <option value="<!-- php: = $vendor->id -->"><!-- php: = $vendor->name --></option>
                                        <!-- php: endforeach; -->
                                    </SearchableSelectField>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4 text-left">
                                    <h5>Cost Price & Qty</h5>
                                </div>
                                <div class="col-md-4 pr-0">
                                    <input name="cost" step="0.1" min="0.1" type="number" id="edit_cost_price"
                                        placeholder="Cost Price" class="form-control w-100">
                                </div>
                                <div class="col-md-4 pr-0">
                                    <input name="quantity" step="1" min="1" type="number" id="edit_qty"
                                        placeholder="Quantity" class="form-control w-100">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4 text-left">
                                    <h5>Total Cost Price</h5>
                                </div>
                                <div class="col-md-8 pr-0">
                                    <input id="edit_total_cost" readonly type="number" min="0.1" step="0.01"
                                        name="edit_total_cost" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4 text-left">
                                    <h5>Bill per session/hour</h5>
                                </div>
                                <div class="col-md-8 pr-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <input id="edit_bill_amount" name="bill_amount" type="number"
                                                class="w-100 form-control" />
                                        </div>
                                        <div class="col-md-6">
                                            <SearchableSelectField name="bill_session" id="edit_bill_session" class="form-control">
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hours</option>
                                                <option value="4">4 hours</option>
                                                <option value="6">6 hours</option>
                                                <option value="8">8 hours</option>
                                            </SearchableSelectField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" name="id" id="equipment_input_id2">
                        </div>
                    </div>
                    <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                        <div class="d-flex align-items-center py-1 justify-content-end">
                            <button id="editSubmitButton" style="height:20px;width:auto;"
                                class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit
                                &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                </form>
                <button style="height:20px;width:auto;"
                    class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                    data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i>
                </button>
            </div>
        </div>
    </div>
</div></div></div>





<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>
$('#equipment_table').dataTable({
    buttons:['searchBuilder'],
    dom: 'QBfrtip', "ordering": false,
});

function deleteEquipment(id){
  $("#deleteEquipmentModal").modal("show");
  $("#equipment_input_id").val(id);
//   console.log("i ran bro;");
}

function editEquipment(id){
  $("#editEquipmentModal").modal("show");
  $("#equipment_input_id2").val(id);

  $.ajax({
    url: '<!-- php: = $this->Url->build(['controller' => 'InventoryList', 'action' => 'getEquipment']); -->',
    type: 'POST',
    cache: false,
    data: {id: id},
    success: function(res){
        console.log(res);
    $("#edit_item_name").val(res.name);
    $("#edit_item_category").val(res.item_category);
    $("#edit_model_no").val(res.model);
    $("#edit_manufacturer").val(res.manufacturer);
    $("#edit_vendor_supplier").val(res.vendor_supplier);
    $("#edit_cost_price").val(res.cost);
    $("#edit_qty").val(res.quantity);
    $("#edit_total_cost").val(res.total_cost);
    $("#edit_bill_amount").val(res.bill_amount);
    $("#edit_bill_time").val(res.bill_time);
    }
  })
}

$("#deleteEquipmentForm").on("submit", function(e){
    e.preventDefault();

    let id = $("#equipment_input_id").val();

    $.ajax({
        url: '<!-- php: = $this->Url->build(['controller'=>'InventoryList', 'action'=>'deleteEquipment']); -->',
        type: 'POST',
        data: {id: id},
        cache: false, 
        success: function(res){
         console.log(res);

         $("#deleteEquipmentModal").modal("hide");
         $("#equipment_table_body").html(res.table_data);
         alertify.success(res.message);
        }
    });
});

$("#editEquipmentForm").on("submit", function(e){
  e.preventDefault();

  $.ajax({
        url: '<!-- php: = $this->Url->build(['controller'=>'InventoryList', 'action'=>'editEquipment']); -->',
        type: 'POST',
        data: $(this).serialize(),
        cache: false, 
        beforeSend: function(){
          $("#editSubmitButton").html("Loading...");
        },
        success: function(res){
         console.log(res);

         $("#editEquipmentModal").modal("hide");
         $("#equipment_table_body").html(res.table_data);
         alertify.success(res.message);
        }
    });
  
});

$('#risk_level').on('change', function(){
  if($(this).val() == 0){
    $('#custom-maintenance-schedule').removeClass('d-none');
    $('#risk_label').text('');
  } 
  else if($(this).val() == 12){
   $('#risk_label').text('*Equipment will be scheduled for maintenance annually');
  }
  else if($(this).val() == 6){
   $('#risk_label').text('*Equipment will be scheduled for maintenance every 6 months');
  }
  else if($(this).val() == 3){
   $('#risk_label').text('*Equipment will be scheduled for maintenance every 3 months');
  }
});

$('#cost-price').on('change', function(){
 var qty = Number($('#qty').val());
 var cost = Number($(this).val());

 if(cost !== ""){
    var total = cost * qty;
    $('#total-cost-price').val(total);
 }
});
$('#qty').on('change', function(){
 var cost = Number($('#cost-price').val());
 var qty = Number($(this).val());

 if(cost !== ""){
    var total = cost * qty;
    $('#total-cost-price').val(total);
 }
});

//controls for the edit modal
$('#edit_cost_price').on('change', function(){
 var qty = Number($('#edit_qty').val());
 var cost = Number($(this).val());

 if(cost !== ""){
    var total = cost * qty;
    $('#edit_total_cost').val(total);
 }
});
$('#edit_qty').on('change', function(){
 var cost = Number($('#edit_cost_price').val());
 var qty = Number($(this).val());

 if(cost !== ""){
    var total = cost * qty;
    $('#edit_total_cost').val(total);
 }
});

$('#item_category').on('change', function(){
    console.log($(this).val());
  $('#item_preview').html($(this).val());
});
$('#model_no').on('change', function(){
    console.log($(this).val());
  $('#model_preview').text($(this).val());
});
$('#manufacturer').on('change', function(){
    console.log($(this).val());
  $('#manu_preview').html($(this).val());
});

    function removeExtraFields(counter){
        t = 0;
        var deduct = parseInt($('#sub-total').html())-$('#amount_'+counter).val();
        if(deduct == 0)
        {
            $('#next2').attr("disabled",true);
        }
        $('#sub-total').html(deduct);
        $('#totall').html(deduct);
        $('#amount').val(deduct);
        $('#name_' + counter).remove();
        $('#price_' + counter).remove();
        $('#code_' + counter).remove();
        
    }

    $('#add_more_button').on('click', function() {
        console.log("information wc wiase")
        if(t == 1)
        {
        return false;
        }
        else {
        t++;
        }
        counter ++
        $('<tr id="name_'+ counter +'"><td><input type="text" placeholder="Enter Serial Number" name="serial_number[]" id="item-name_'+ counter +'" class=" my-0 form-control" /></td><td><input type="text" placeholder="Location" name="location[]" id="qty_'+ counter +'" class="form-control" /></td><td><SearchableSelectField class="form-control my-0" name="department[]" id="rate_'+ counter +'"><!-- php: foreach($departments as $department){echo '<option value="'.$department->id.'">'.$department->name.'</option>';} --></SearchableSelectField></td><td><SearchableSelectField class="form-control my-0" name="mdc[]" id="discount_'+ counter +'"><option>Select MDC</option><!-- php: foreach($mdcs as $mdc){echo '<option value="'.$mdc->id.'">'.$mdc->name.'</option>';} --></SearchableSelectField></td><td><SearchableSelectField name="age[]" id="age_'+ counter +'" class="form-control my-0 discount"><!-- php: foreach($age_specs as $age_spec){echo '<option value="'.$age_spec->id.'">'.$age_spec->age.'</option>';} --></SearchableSelectField></td><td style="position:relative;"><SearchableSelectField class="form-control my-0" name="gender[]" id="gender_'+ counter +'" ><!-- php: foreach($genders as $gender){echo '<option value="'.$gender->id.'">'.$gender->name.'</option>';} --></SearchableSelectField><span style="position:absolute; top:20px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body");
        // $('<div id="price_'+ counter +'"><input type="number" name="code[]" id="code"  placeholder="Code" class="form-control input-height" required/><br></div>').appendTo("#mdc_code_div");
        // $('<div id="code_'+ counter +'"><input type="number" name="tariff[]" id="code"  placeholder="Tariff" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#mdc_tariff_div");
        $('#next2').removeAttr("disabled");

    });

    $(document).ready(function(){
            
        var t  = 0;
        var appr_items = [];
        $(function () {
            $("#specialty").submit(function () {
                return confirm('Are you sure you want to submit ?');
                // return true;
            });

            var counter = 1;
            var total = [];
            
        });


        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;
        var current = 1;
        var steps = $("fieldset").length;

        setProgressBar(current);

        $(".next").click(function(){

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
        step: function(now) {
        // for making fielset appear animation
        opacity = 1 - now;

        current_fs.css({
        'display': 'none',
        'position': 'relative'
        });
        next_fs.css({'opacity': opacity});
        },
        duration: 500
        });
        setProgressBar(++current);
        });

        $(".previous").click(function(){

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
        step: function(now) {
        // for making fielset appear animation
        opacity = 1 - now;

        current_fs.css({
        'display': 'none',
        'position': 'relative'
        });
        previous_fs.css({'opacity': opacity});
        },
        duration: 500
        });
        setProgressBar(--current);
        });

        function setProgressBar(curStep){
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width",percent+"%")
            }

        $(".submit").click(function(){
        return false;
        })



        today = moment(new Date()).format("YYYY-MM-DD");
        $('#invoice-date').val(today);
        $('#recur-start').val(today);

        // $('#gear').on('click', function(){
        //    $('#invoice-number').val('INV-'+Math.floor(100000 + Math.random() * 900000));
        // });

        // $('#terms').on('change', function(){
        //     var value = $('#terms').val();
        //     console.log(typeof value);
        // if(value !== "end-of-month" || value !== "end-of-next-month")
        // { 
        //     var due = new Date();
        //     var new_date = moment(due, "DD-MM-YYYY").add(value, 'days').format('YYYY-MM-DD');
        //         $('#due-date').val(new_date);
        // }
        // else if(value == 'end-of-month')
        // {
        //     var end = moment().format("YYYY-MM-") + moment().daysInMonth();
        //   $('#due-date').val(end);
        // }

        // });

        // for recurring 
        $('#until3').hide();
        $('#repeat-daily3').hide();
        $('#repeat-weekly3').hide();
        $('#repeat-monthly3').hide();
        $('#specific-date').hide();
        $('#specific-occurence').hide();

        $('#daily').on('change', function(){
            $('#repeat-daily3').show();
            $('#repeat-weekly3').hide();
            $('#repeat-monthly3').hide();
            $('#until3').show();
        });
        $('#weekly').on('change', function(){
            $('#repeat-daily3').hide();
            $('#repeat-weekly3').show();
            $('#repeat-monthly3').hide();
            $('#until3').show();
        });
        $('#monthly').on('change', function(){
            $('#repeat-daily3').hide();
            $('#repeat-weekly3').hide();
            $('#repeat-monthly3').show();
            $('#until3').show();
        });
        ////

        $('#stop-occurence').on('change', function(){
        $('#specific-date').hide();
        $('#specific-occurence').show();
        });

        $('#stop-date').on('change', function(){
        $('#specific-date').show();
        $('#specific-occurence').hide();
        });
    });



</script>

`;

export default function ElementElementInventorylistCreate() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
