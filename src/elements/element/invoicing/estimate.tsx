const rawHtml = `
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css"> -->
<!-- <link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.1.1/css/dataTables.dateTime.min.css"> -->
<!-- php: = $this->Html->css('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.css') -->
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
.invoice-table-header-blue 
{
    border:2px solid #428BCA;
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

</style>
<div class="row">
<div class="borderBox light bordered col-md-12">
   <div class="borderBox-title tabbable-line">
      <!-- <div class="caption">
         <span class="caption-subject font-dark bold uppercase">Invoices</span>
         </div> -->
      <ul class="nav nav-tabs">
         <li class="nav-item">
            <a href="#create_estimate" data-toggle="tab"> Create</a>
         </li>
         <!-- <li class="nav-item">
            <a href="#draft_invoice" data-toggle="tab"> Draft </a>
            </li> -->
         <li class="nav-item">
            <a href="#view_estimate" data-toggle="tab"> View</a>
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
         <div class="tab-pane" id="create_estimate">
            <!-- <h4>Add a new Invoice</h4> -->
            <div class="container-fluid px-5">
               <div class="row justify-content-center">
                  <div class="container-fluid text-center p-3 mt-3 mb-2">
                     <div class="card px-5 pt-4 pb-0 mt-1 mb-3">
                        <!-- <form id="msform"> --> 
                        <!-- php: = $this->Form->create($addInvoice, ['url' => ['controller' => 'Invoicing', 'action' => 'addInvoice'],'id' =>'msform','novalidate']); -->
                        <ul id="progressbar">
                           <li style="width:30%!important" class="active" id="personal"><strong>Customer</strong></li>
                           <li style="width:30%!important" id="cart"><strong>Items</strong></li>
                           <!-- <li id="payment"><strong>Payment</strong></li>
                           <li id="file"><strong>Approval</strong></li> -->
                           <li style="width:30%!important" id="confirm"><strong>Finish</strong></li>
                        </ul>
                        <!-- <div class="progress">
                           <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                           </div> <br> fieldsets -->
                        <fieldset>
                           <div class="row mt-4">
                              <div class="col-md-2 text-left">
                                 <h5>Customer</h5>
                              </div>
                              <div class="col-md-6">
                                 <SearchableSelectField name="payer_type" id="estimate_payer_type" class="form-control mb-1 input-height">
                                    <option>Select Customer</option>
                                    <option value="patient">Patient</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="company/credit">Company/Credit</option>
                                    <option value="default">Default</option>
                                 </SearchableSelectField>
                              </div>
                           </div>
                           <div class="row mt-4">
                              <div class="col-md-2 text-left">
                                 <h5>Customer Name</h5>
                              </div>
                              <div class="col-md-6">
                                 <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payer_name" id="estimate_payer_name" title="Select Customer Name"  data-live-search="true" required>
                                 </SearchableSelectField>
                              </div>
                           </div>
                           <div class="row mt-2">
                              <div class="col-md-2 text-left">
                                 <h5>Currency</h5>
                              </div>
                              <div class="col-md-6">
                                 <SearchableSelectField name="currency" id="est-currency" class="form-control input-height">
                                    <option>Select Currency</option>
                                    <option value="CEDIS">Cedis</option>
                                    <option value="USD">USD</option>
                                 </SearchableSelectField>
                              </div>
                           </div>
                           <div class="row mt-2">
                              <div class="col-md-2 text-left">
                                 <h5>Estimate # </h5>
                              </div>
                              <div class="col-md-6 d-flex align-item-center">
                                 <input id="est-invoice-number" value="EST-<!-- php: =$estimate_gen -->" name="invoice_number" type="text" class="form-control">
                              </div>
                              <div class="col-md-1 d-flex text-left px-0">
                                 <i id="est-gear2" style="font-size:16px;cursor:pointer;" class="fa fa-gear text-primary ml-2 mt-3"></i>
                              </div>
                           </div>
                           <div class="row mt-2">
                              <div class="col-md-2 text-left">
                                 <h5>Order Number </h5>
                              </div>
                              <div class="col-md-6">
                                 <input name="order_number" type="text" class="form-control">
                              </div>
                           </div>
                           <div class="row mt-2">
                              <div class="col-md-2 text-left">
                                 <h5>Terms</h5>
                              </div>
                              <div class="col-md-6">
                                 <SearchableSelectField name="terms" id="est-terms" class="form-control input-height">
                                    <option>Select Terms</option>
                                    <option value="15">Net 15</option>
                                    <option value="30">Net 30</option>
                                    <option value="60">Net 60</option>
                                    <option value="end-of-month">Due end of the month</option>
                                    <option value="end-of-next-month">Due end of next month</option>
                                 </SearchableSelectField>
                              </div>
                           </div>
                           <div class="row mt-2">
                              <div class="col-md-2 text-left">
                                 <h5>Address</h5>
                              </div>
                              <div class="col-md-6">
                                 <textarea name="address" id="address" type="text" style="margin-bottom:10px" class="form-control"></textarea>
                              </div>
                           </div>
                           <div class="row mt-2">
                              <div class="col-md-2 text-left">
                                 <h5>Invoice Date </h5>
                              </div>
                              <div class="col-md-3 pr-0">
                                 <input id="est-invoice-date" name="invoice_date" type="text" readonly class="form-control">
                              </div>
                              <div class="col-md-1 px-0">
                                 <h5>Due Date</h5>
                              </div>
                              <div class="col-md-2 px-0">
                                 <input id="est-due-date" style="width:93%;" name="due_date" type="text" class="form-control">
                              </div>
                           </div>
                           <input type="button" id="next1" name="next" class="next action-button btn btn-primary" value="Next - Items" />
                           <!-- <input type="submit" id="draft1" style="width:auto;margin-right:7px;" name="draft" value="Save As Draft" class="btn btn-warning action-button"> -->
                        </fieldset>
                        <fieldset>
                           <div id="item-table">
                              <table class="table mt-4">
                                 <thead>
                                    <tr>
                                       <th>Item Details</th>
                                       <th>Quantity</th>
                                       <th>Unit Cost</th>
                                       <th>Discount</th>
                                       <th>Amount</th>
                                    </tr>
                                 </thead>
                                 <tbody id="est-item-body">
                                    <!-- <tr>
                                       <td>
                                           <input type="text" placeholder="Enter Item Name" name="item_name[]" id="item-name_1" class="form-control my-0" />
                                       </td>
                                       <td>
                                       <input type="number" placeholder="Qty" name="qty[]" id="qty_1" class="form-control" />
                                       </td>
                                       <td>
                                       <input type="number" placeholder="Unit Cost" name="rate[]" id="rate_1" class="form-control" />
                                       </td>
                                       <td>
                                       <input type="number" placeholder="Discount (%)" name="discount[]" id="discount_1" class="form-control my-0 discount" />
                                       </td>
                                       <td>
                                       <input type="number" placeholder="Amount" name="amount[]" id="amount_1" class="form-control" />
                                       </td>
                                       </tr> -->
                                 </tbody>
                              </table>
                           </div>
                           <div class="row mt-3">
                              <div class="col-md-5 p-2 text-left">
                                 <h5 id="est-add_more_button" style="cursor:pointer" class="text-primary ml-3">
                                    <i class="fa fa-plus"></i>&nbsp;
                                    Add an item
                                 </h5>
                              </div>
                              <div class="col-md-7 p-2">
                              </div>
                           </div>
                           <div class="row my-3">
                              <div class="col-md-5"></div>
                              <div class="col-md-7">
                                 <table class="table table-bordered table-fit">
                                    <tr>
                                       <th>Subtotal (<span id="cur-val1"></span>)</th>
                                       <td class="text-center" id="est-sub-total">0</td>
                                    </tr>
                                    <tr>
                                       <th>Discount (%)</th>
                                       <td class="text-center" id="sub-dis">
                                          <input type="number" id="add-est-discount" placeholder="Discount (%)" name="invoice_discount" class="form-control text-center">
                                       </td>
                                    </tr>
                                    <tr>
                                       <th>Tax (%)</th>
                                       <td class="text-center"><input type="number" id="add-est-tax" placeholder="Tax (%)" name="tax" class="form-control text-center"></td>
                                    </tr>
                                    <tr>
                                       <th>Total (<span id="cur-val2"></span>)</th>
                                       <td class="text-center" id="est-totall">0</td>
                                       <input type="hidden" id="main_amount2" name="total_amount">
                                    </tr>
                                 </table>
                              </div>
                           </div>
                           <input type="hidden" name="status" value="estimate">
                           <input type="submit" id="next2" name="next" style="width:120px" class="next action-button btn btn-primary" value="Finish" /> 
                           <input type="button" name="previous" style="width:125px" class="previous action-button-previous btn btn-secondary" value="Previous - Customer" />
                           <!-- <input type="submit" style="width:auto;margin-right:7px;" name="draft" value="Save As Draft" class="btn btn-warning action-button"> -->
                        </fieldset>
                        <!-- <fieldset>
                           <div class="container my-4">
                              <div class="row">
                                 <div class="col-md-2 text-left">
                                    <h5>Payment Type</h5>
                                 </div>
                                 <div class="col-md-7 text-left">
                                     <SearchableSelectField name="pay_type" id="pay_type" class="form-control">
                                       <option>Select Payment Type</option>
                                       <option value="online">Online</option>
                                       <option value="manual">Manual</option>
                                       </SearchableSelectField> 
                                    <div class="form-check form-check-inline">
                                       <input class="form-check-input" type="radio" name="pay_type" id="online" value="online">
                                       <label class="form-check-label" for="online">Online</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                       <input class="form-check-input" type="radio" name="pay_type" id="manual" value="manual">
                                       <label class="form-check-label" for="manual">Manual</label>
                                    </div>
                                 </div>
                              </div>
                              <div class="row mt-3">
                                 <div class="col-md-2 text-left">
                                    <h5>Payment Options</h5>
                                 </div>
                                 <div class="col-md-7 text-left">
                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="pay_option[]" id="pay_option" title="Select Payment Option(s)"  data-live-search="true" multiple required>
                                    </SearchableSelectField>
                                    <div class="form-check form-check-inline">
                                       <input class="form-check-input" type="checkbox" name="partial" id="partial" value="1">
                                       <label class="form-check-label" for="partial"><small class="text-secondary">Allow customer to make partial payments for this invoice</small></label>
                                    </div>
                                 </div>
                              </div>
                              <div class="row mt-3">
                                 <div class="col-md-2 text-left">
                                    <h5>Email To</h5>
                                 </div>
                                 <div class="col-md-7">
                                    <input name="email_to" id="email-to" class="form-control mb-1" type="text" placeholder="Enter Email">
                                 </div>
                              </div>
                              <div class="row mt-3">
                                 <div class="col-md-2 text-left">
                                    <h5>Phone</h5>
                                 </div>
                                 <div class="col-md-7">
                                    <input name="phone" id="phone" class="form-control mb-1" type="tel" placeholder="Enter Phone Number">
                                 </div>
                              </div>
                              <div class="row mt-4">
                                 <div class="col-md-2 text-left">
                                    <h5>Notes</h5>
                                 </div>
                                 <div class="col-md-7">
                                    <textarea name="notes" class="form-control"></textarea>
                                 </div>
                              </div>
                              <div class="row my-4">
                                 <div class="col-md-2 text-left">
                                    <h5>Terms & Conditions</h5>
                                 </div>
                                 <div class="col-md-7">
                                    <textarea name="terms_conditions" class="form-control"></textarea>
                                    <input type="hidden" name="status" value="estimate">
                                    <div class="container-fluid mt-4 d-flex justify-content-start">
                                       </div>
                                 </div>
                              </div>
                           </div>
                           <input type="button" name="next" id="next3" style="width:auto" class="next action-button btn btn-primary" value="Next - Approval " />
                           <input type="button" style="width:137px" name="previous" class="previous btn btn-secondary action-button-previous" value="Previous - Items" />
                           <input type="submit" id="draft2" style="width:auto;margin-right:7px;" name="draft" value="Save As Draft" class="btn btn-warning action-button"/>&nbsp;&nbsp;
                        </fieldset> -->
                        <!-- <fieldset>
                           <div class="container-fluid p-3 bg-light">
                              <div class="row">
                                 <div class="col-md-2 p-3">
                                    <h6 class="text-secondary p-0 m-0"> Estimate #</h6>
                                    <h5 id="appr-invoice-num" class="p-0 m-0">EST-002342</h5>
                                 </div>
                                 <div class="col-md-2 p-3">
                                    <h6 class="text-secondary p-0 m-0"> Due Date</h6>
                                    <h5 id="appr-due-date" class="p-0 m-0">24 Dec 2019</h5>
                                 </div>
                                 <div class="col-md-4 p-3">
                                 </div>
                                 <div class="col-md-4 p-3">
                                    <button class="btn bg-white btn-sm">
                                    <i class="fa fa-print fa-2x"></i>
                                    </button>&nbsp;
                                    <button class="btn bg-white btn-sm">
                                    <i class="fa fa-download fa-2x"></i>
                                    </button>&nbsp;
                                    <button class="btn btn-danger">Pay Now</button>
                                 </div>
                              </div>
                           </div>
                           <div class="container p-5 mt-4 card p-3">
                              <div class="container-fluid">
                                 <div class="row">
                                    <div class="col-md-6 p-2 text-left">
                                       <p id="appr-address" style="margin-top:24px;">
                                          P.O. Box 1234<br/>
                                          Test Place, Ghana
                                       </p>
                                    </div>
                                    <div class="col-md 6 p-2 text-right">
                                       <h2 class="font-weight-bold mb-1">Invoice</h2>
                                       <h5 id="apr-invoice-num" class="font-weight-bold"># INV-0023233</h5>
                                       <h5 class="mt-3 font-weight-bold">Balance Due</h5>
                                       <h5 id="apr-balance-due" class="font-weight-bold">$165.00</h5>
                                    </div>
                                 </div>
                                 <div class="row mt-5">
                                    <div class="col-md-8 p-2 text-left">
                                       <h5>Bill To</h5>
                                       <h5 id="appr-name" class="font-weight-bold">Aaron Brown</h5>
                                       <h5 id="appr-email">topboy@gmail.com</h5>
                                    </div>
                                    <div class="col-md-4 p-2 text-right">
                                       <div  class="container">
                                          <div class="row">
                                             <div class="col-md-6 text-left">
                                                <h5 style="font-weight:bold">Invoice Date:</h5>
                                             </div>
                                             <div class="col-md-6 pr-0">
                                                <h5 id="appr-date" style="">24/12/22</h5>
                                             </div>
                                          </div>
                                           <div class="row mt-2">
                                             <div class="col-md-6 text-left">
                                                 <h5 style="font-weight:bold">Terms:</h5>
                                             </div>
                                             <div class="col-md-6 pr-0">
                                                 <h5 style="">Due On Receipt</h5>
                                             </div>
                                             </div>
                                          <div class="row mt-2">
                                             <div class="col-md-6 text-left">
                                                <h5 style="font-weight:bold">Due Date:</h5>
                                             </div>
                                             <div class="col-md-6 pr-0">
                                                <h5 id="appr-due-date" style="">24/12/22</h5>
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
                                       <tr>
                                          <td>1</td>
                                          <td>Test #1</td>
                                          <td>2</td>
                                          <td>2</td>
                                          <td>10%</td>
                                          <td>$500</td>
                                       </tr>
                                       <tr>
                                          <td>2</td>
                                          <td>Test #2</td>
                                          <td>5</td>
                                          <td>2</td>
                                          <td>5%</td>
                                          <td>$800</td>
                                       </tr>
                                    </table>
                                    <div class="row mt-4">
                                       <div class="col-md-8 p-3"></div>
                                       <div class="col-md-4 p-3">
                                          <div class="row">
                                             <div class="col-md-6 text-left">
                                                <h5 class="font-weight-bold">Sub Total</h5>
                                             </div>
                                             <div class="col-md-6">
                                                <h5>0</h5>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="col-md-6 text-left">
                                                <h5 class="font-weight-bold">Sub Tax</h5>
                                             </div>
                                             <div class="col-md-6">
                                                <h5>0</h5>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="col-md-6 text-left">
                                                <h5 class="font-weight-bold">Sub Discount</h5>
                                             </div>
                                             <div class="col-md-6">
                                                <h5>0</h5>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="col-md-6 text-left">
                                                <h5 class="font-weight-bold">Total</h5>
                                             </div>
                                             <div class="col-md-6">
                                                <h5 class="font-weight-bold">0</h5>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="col-md-6 text-left">
                                                <h5 class="font-weight-bold">Balance Due</h5>
                                             </div>
                                             <div class="col-md-6">
                                                <h5 class="font-weight-bold">0</h5>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <input type="submit" name="next" class="next action-button btn btn-primary" value="Finish " /> 
                           <input type="button" name="previous" style="width:143px" class="previous btn btn-secondary action-button-previous" value="Previous - Payment" />
                           <button style="width:auto;margin-right:7px;" class="btn btn-danger action-button">Approve and Send</button>
                        </fieldset> -->
                        <fieldset>
                           <div class="form-card">
                              <!-- <div class="row">
                                 <div class="col-7">
                                     <h2 class="fs-title">Finish:</h2>
                                 </div>
                                 <div class="col-5">
                                     <h2 class="steps">Step 4 - 4</h2>
                                 </div>
                                 </div> <br><br> -->
                              <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2>
                              <br>
                              <div class="row justify-content-center">
                                 <div class="col-3"> <img src="https://i.imgur.com/GwStPmg.png" class="fit-image"> </div>
                              </div>
                              <br><br>
                              <div class="row justify-content-center">
                                 <div class="col-7 text-center">
                                    <!-- <h5 class="purple-text text-center">You Have Successfully Signed Up</h5> -->
                                 </div>
                              </div>
                           </div>
                        </fieldset>
                        <!-- php: =$this->Form->end(); -->
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="tab-pane active" id="view_estimate">
            <!-- border border-left-0 border-right-0 border-bottom-0 border-3 border-primary  -->
            <div class="card mt-3  card-box">
               <div class="card-body ">
                  <div class="container-fluid py-2 mt-4">
                     <h5 class="font-weight-bold">Filter Options:</h5>
                     <div class="row">
                        <div class="col-sm-3 d-flex align-items-center">
                           <div class="center" style="vertical-align: bottom">From:</div>
                           &nbsp;&nbsp;
                           <div class="input-group">
                              <input class="form-control" placeholder="Start" size="16"  name="datefilter-start1" id="est-start" type="text" required >
                              <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                           </div>
                        </div>
                        <div class="col-sm-3 d-flex align-items-center">
                           <div class="" style="">To:</div>
                           &nbsp;&nbsp;
                           <div class="input-group">
                              <input class="form-control " placeholder="End" size="16" placeholder="" name = "datefilter-end1" id="est-end" type="text" value="" required >
                              <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                           </div>
                           &nbsp;
                           <button id="estimateFilterBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">GO</button>
                        </div>
                        <div id="filter" class="col-sm-3 d-flex align-items-center">
                           <!-- <div class="" style="">To:</div>&nbsp;&nbsp; -->
                           <div class="input-group">
                              <SearchableSelectField class="form-control input-height" name = "status_filter" id ="est-status-filter">
                                 <option>Select Status</option>
                                 <!-- <option value="active">Active</option> -->
                                 <option class="due-date" value="waiting">Waiting For Approval</option>
                                 <option class="text-success" value="sent">Sent</option>
                                 <!-- <option class="text-primary" value="due">Due Part Payment</option>
                                 <option class="text-warning" value="due-no">Due No Payment</option>
                                 <option class="text-danger" value="due-15">Overdue By x Days</option> -->
                              </SearchableSelectField>
                              <!-- <span class="input-group-addon"><span class="fa fa-calendar"></span></span> -->
                           </div>
                           &nbsp;
                           <!-- <button id="resetBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">Reset</button> -->
                        </div>
                     </div>
                  </div>
                  <div class="table-responsive mt-2">
                     <table id="estimate_table" class="table table-hover customDatable full-width estimate_table">
                        <thead>
                           <tr>
                              <th><span class="invoice-table-header-blue text-primary py-2 px-3">Date</span></th>
                              <th><span class="invoice-table-header-blue py-2 px-3">Estimate#</span></th>
                              <th><span class="invoice-table-header-blue py-2 px-3">Customer Name</span></th>
                              <th>Status</th>
                              <!-- <th><span class="invoice-table-header-blue py-2 px-3">Due Date</span></th> -->
                              <th><span class="invoice-table-header-blue py-2 px-3">Amount</span></th>
                              <!-- <th><span class="invoice-table-header-blue py-2 px-3">Balance Due</span></th> -->
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           <!-- php: foreach($estimates as $estimate){ -->
                            <tr>
                              <td><!-- php: = $estimate->invoice_date --></td>
                              <td><a href="javascript:" data-toggle="modal" data-target="#estimate_<!-- php: =$estimate->id -->"><!-- php: = $estimate->invoice_number --></a></td>
                              <td><!-- php: = $estimate->payer_name --></td>
                              <td><!-- php: = $estimate->status == 'estimate_approved' ? '<small class="text-success">APPROVED AND SENT</small>' : '<small class="due-date">WAITING FOR APPROVAL</small>' --></td>
                              <td><!-- php: = $estimate->total_amount --></td>
                              <!-- php: if (count($statusProtocols) > 0 ){ -->
                                           <td>
                                               
                                               <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                               <a href="<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'edit',$estimate->id]) -->" class="btn btn-warning btn-sm">Edit</a><br/>
                                               <!-- php: = $this->Form->postLink(__('Remove'), ['controller'=>'Invoicing','action'=>'deleteInvoice',$estimate->id], ['class' => 'btn btn-danger btn-sm']) --><br/>
                                               <!-- php: } -->
                                               <!-- <a href="<!-- php: //= $this->Url->build(["controller" => "Invoicing","action" => "deleteInvoice",$estimate->id]) -->" class="btn btn-danger btn-sm">Write Off</a><br/> -->
                                               <!-- <a href="<!-- php: //= $this->Url->build(['controller' => 'Invoicing', 'action' => 'recordPayment',$estimate->id]) -->" class="btn btn-primary btn-sm">Record Payments</a> -->
                                             
                                               <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols)){ -->
                                               <!-- php: if($estimate->status == 'estimate'){ -->
                                                <a href="javascript:" class="btn btn-sm btn-info" data-toggle="modal" data-target="#approve_estimate_<!-- php: = $estimate->id -->">Approve And Send</a><br/>
                                                

                                                <!-- php: } -->
                                                <!-- php: = $estimate->status == 'estimate_approved' ? $this->Form->postLink(__('Make Invoice'), ['controller'=>'Invoicing','action'=>'makeInvoice',$estimate->id], ['class' => 'btn btn-primary btn-sm']) : '' -->
                                               
                                               <!-- php: } -->
                                            </td>
                                            <!-- php: } -->
                                      
                           </tr>
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
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
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
                              <div  class="container">
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
                              <!-- php: $x = 1; foreach($estimate->invoicing_items as $item): -->
                              <tr>
                                 <td><!-- php: = $x --></td>
                                 <td><!-- php: = $item->item_name --></td>
                                 <td><!-- php: = $item->qty --></td>
                                 <td><!-- php: = $item->rate --></td>
                                 <td><!-- php: = $item->discount --></td>
                                 <td><!-- php: = $item->amount --></td>
                              </tr>
                              <!-- php: $x++; endforeach; -->
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
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Print&nbsp;<i class="fa fa-file text-success fa-1x"></i> </button>
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="approve_estimate_<!-- php: =$estimate->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Approve Estimate  #<!-- php: = $estimate->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: = $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'approveSendEstimate']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
               <div class="row mb-3 mt-4">
   <div class="col-md-4">
      <h5>Send Options: </h5>
   </div>
   <div class="col-md-8">
      <div class="form-check form-check-inline">
         <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendEmail" value="email" checked>
         <label class="form-check-label" for="sendEmail">Email</label><br/>
         <!-- php: = '<br/><small class="text-secondary">'.$estimate->email_to.'</small>' -->
      </div>
      <div class="form-check form-check-inline">
         <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendWhatsapp" value="whatsapp">
         <label class="form-check-label" for="sendWhatsapp">Whatsapp</label><br/>
         <!-- php: = '<br/><small class="text-secondary">'.$estimate->phone.'</small>' -->
      </div>
      <div class="form-check form-check-inline">
         <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendSms" value="sms">
         <label class="form-check-label" for="sendSms">SMS</label><br/>
         <!-- php: = '<br/><small class="text-secondary">'.$estimate->phone.'</small>' -->
      </div>
   </div>
</div>
               </div>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                   <input type="hidden" name="invoice_id" value="<!-- php: = $estimate->id -->">
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Approve & Send  &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                  <!-- php: = $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- php: endforeach; -->

<!-- write off pending invoices --> 
<!-- php: foreach($estimates as $estimate): -->
<!-- preview -->
<div class="modal fade" id="writeoff_pending_<!-- php: =$estimate->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Write Off <!-- php: = $estimate->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
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
                         <input type="hidden" name="invoicing_id" value="<!-- php: = $estimate->id -->" />
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
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> </button>
                  <!-- php: = $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- php: endforeach; -->

<!-- end of write off pending invoices -->

<!-- php: foreach($estimates as $estimate): -->
<!-- record payments modal -->
<div class="modal fade" id="record_<!-- php: =$estimate->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Record Payment for <!-- php: = $estimate->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
            <!-- php: = $this->Form->create($recordPayment, ['url' => ['controller' => 'Invoicing', 'action' => 'recordPayment']]); -->
               <div class="container-fluid">
               <div class="row mt-4">
                   <input type="hidden" name="id" value="<!-- php: =$estimate->id -->"/>
                            <div class="col-md-4 text-left">
                                <h5>Payer</h5>
                            </div>
                            <div class="col-md-8">
                               <input type="text" value="<!-- php: =$estimate->payer_name -->" class="form-control">
                            </div>
                        </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Amount to pay(<!-- php: = $estimate->currency -->)
                       </div>
                       <div class="col-md-8">
                           <input type="number" name="balance_due" readonly value="<!-- php: = $estimate->total_amount -->" class="form-control">
                       </div>
                   </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Amount Received(<!-- php: = $estimate->currency -->)
                       </div>
                       <div class="col-md-8">
                           <input <!-- php: = $estimate->partial == 0 ? 'readonly value="'.$estimate->total_amount.'"' : '' --> type="number" name="amount" class="form-control">
                           <!-- php: = $estimate->partial != 0 ? '<span class="badge badge-primary">pp enabled</span>' : '' -->
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
 
                         <input name="invoicing_file" type="file" id="estimate-btn" hidden/>
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
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record Payment</button>
                  <!-- php: = $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
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
<!-- <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script> -->
<script>

// $(document).ready(function(){
// //     var estminDate, estmaxDate;
// // 		// var minDate2, maxDate2;
// // 		// var minDate3, maxDate3;
// 		// var minDate4, maxDate4;
 
// // // Custom filtering function which will search data in column four between two values
// //  $.fn.dataTable.ext.search.push(
// // 	 function( settings, data, dataIndex ) {
// // 		 var estmin = estminDate.val();
// // 		 var estmax = estmaxDate.val();
// // 		//  var min2 = minDate2.val();
// // 		//  var max2 = maxDate2.val();
// // 		//  var min3 = minDate3.val();
// // 		//  var max3 = maxDate3.val();
// // 		//  var min4 = minDate4.val();
// // 		//  var max4 = maxDate4.val();
		

// // 		 var d = new Date( data[0] );
// // 		 switch (settings.nTable.id)
// // 		 {
// // 			 case "estimate_table":
// // 				estmin = estminDate.val();
// // 			 estmax = estmaxDate.val();
// // 			if (
// // 			 ( estmin === null && estmax === null ) ||
// // 			 ( estmin === null && d <= estmax ) ||
// // 			 ( estmin <= d  && estmax === null ) ||
// // 			 ( estmin <= d  && d<= estmax ) 
// // 		 ) {
// // 			 return true;
// // 		 } 
// // 		 break;
		 
// // 		//  case "doctable4":
// // 		// 	min = minDate4.val();
// // 		// 	 max = maxDate4.val();
// // 		// 	if (
// // 		// 	 ( min === null && max === null ) ||
// // 		// 	 ( min === null && date <= max ) ||
// // 		// 	 ( min <= date   && max === null ) ||
// // 		// 	 ( min <= date   && date <= max ) 
// // 		//  ) {
// // 		// 	 return true;
// // 		//  } 
// // 		//  break;

// // 		//   if (
// // 		// 	 ( min2 === null && max2 === null ) ||
// // 		// 	 ( min2 === null && date <= max2 ) ||
// // 		// 	 ( min2 <= date   && max2 === null ) ||
// // 		// 	 ( min2 <= date   && date <= max2 ) 
// // 		//  ) {
// // 		// 	 return true;
// // 		//  } 
		
// // 		//   return false;
// // 	 }
// //     }
// //  );
 
// 	// 	estminDate = new DateTime($('#est-start'), {
//    //      format: 'MMMM Do YYYY'
//    //  });
//    //  estmaxDate = new DateTime($('#est-end'), {
//    //      format: 'MMMM Do YYYY'
//    //  });
// 	// minDate4 = new DateTime($('#min4'), {
//     //     format: 'MMMM Do YYYY'
//     // });
//     // maxDate4 = new DateTime($('#max4'), {
//     //     format: 'MMMM Do YYYY'
//     // });
//     // DataTables initialisation
//      //var table = $('#pending_table').DataTable();
// 	// var table2 = $('#doctable2').DataTable();
    var esttable = $('#estimate_table').DataTable();
// 	// var table3 = $('#recurring_table').DataTable();
// 	// var table2 = $('#paid_table').DataTable();
    
// // $('#est-status-filter').on('change', function(){
// //    esttable.search(this.value).draw();   
// // });
// // $('#estimateFilterBtn').on('click', function () {
// //    esttable.draw();
// //     });
// // });


var t  = 0;
var appr_items = [];
	
		$("#specialty").submit(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});

		var counter = 1;
        var total = [];
        
        $('#est-add_more_button').on('click', function() {
           if(t == 1)
           {
              return false;
           }
           else {
              t++;
           }
            counter ++
            $('<tr id="name_'+ counter +'"><td><input type="text" placeholder="Enter Item Name" name="item_name[]" id="est-item-name_'+ counter +'" class=" my-0 form-control" /></td><td><input type="number" placeholder="Qty" name="qty[]" id="est-qty_'+ counter +'" class="form-control" /></td><td><input type="number" placeholder="Unit Cost" name="rate[]" id="est-rate_'+ counter +'" class="form-control" /></td><td><input type="number" placeholder="Discount" name="discount[]" id="est-discount_'+ counter +'" class="form-control my-0 discount" /></td><td style="position:relative;"> <input type="number" placeholder="Amount" name="amount[]" id="est-amount_'+ counter +'" class="form-control" /><span style="position:absolute; top:20px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="est-remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#est-item-body");
            // $('<div id="price_'+ counter +'"><input type="number" name="code[]" id="code"  placeholder="Code" class="form-control input-height" required/><br></div>').appendTo("#mdc_code_div");
            // $('<div id="code_'+ counter +'"><input type="number" name="tariff[]" id="code"  placeholder="Tariff" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#mdc_tariff_div");
            // $('#next2').removeAttr("disabled");
           
      
            
    $('#est-discount_'+ counter).on('change', function(){
        var qty = Number($('#est-qty_'+counter).val());
        var amt = $('#est-amount_'+counter).val();
        var dis = Number($(this).val())/100;
        var cost = Number($('#est-rate_'+counter).val());
        var amt = qty * cost;
        var formula = amt - (amt * dis);
       $('#est-amount_'+counter).val(formula.toFixed(2));
       total.push(formula.toFixed(2));
      
       //    console.log(total);
     
      var sum = 0;
      for(let i = 0;i<total.length;i++)
      {
         sum+=Number(total[i]);
      }
      //  console.log(sum);
      // subtract after taking out
       console.log(sum);
        $('#est-sub-total').html(sum.toFixed(2));
        $('#est-amount').val(sum.toFixed(2));
        $('#est-totall').html(sum.toFixed(2));

       
    });

    $('#est-rate_'+ counter).on('change', function(){
      t  = 0;
        if($('#est-discount').val() > 0)
      {
        var qty = Number($('#est-qty_'+counter).val());
        var amt = $('#est-amount_'+counter).val();
        var dis = Number($(this).val())/100;
        var cost = Number($('#est-rate_'+counter).val());
        var amt = qty * cost;
        var formula = amt - (amt * dis);
        

      }
      else {
         var qty = Number($('#est-qty_'+counter).val());
        var amt = $('#est-amount_'+counter).val();
       // var dis = Number($(this).val())/100;
        var cost = Number($('#est-rate_'+counter).val());
        var amt = qty * cost;
        var formula = amt;
     
         
      }
        
       $('#est-amount_'+counter).val(formula.toFixed(2));
       total.push(formula.toFixed(2));
       //    console.log(total);
         console.log(appr_items);
     
      var sum = 0;
      for(let i = 0;i<total.length;i++)
      {
         sum+=Number(total[i]);
      }
      //  console.log(sum);
      // subtract after taking out
       console.log(sum);
       if(sum == 0)
       {
         $('#next2').attr("disabled",true);
       }
        $('#est-sub-total').html(sum.toFixed(2));
        $('#est-amount').val(sum.toFixed(2));
        $('#est-totall').html(sum.toFixed(2));
        $('#main_amount2').val(sum.toFixed(2));

      //   $('#appr-sub-total').html(sum.toFixed(2));
      //   $('#appr-total').html(sum.toFixed(2));
    });
   });
    function removeEstExtraFields(counter){
        var deduct2 = parseInt($('#est-sub-total').html())-$('#est_amount_'+counter).val();
        $('#est-sub-total').html(deduct2);
        $('#est-totall').html(deduct2);
        $('#main_amount2').val(deduct2);
        $('#est_name_' + counter).remove();
        // $('#price_' + counter).remove();
        // $('#code_' + counter).remove();

    }
// $(document).ready(function(){

//    var current_fs, next_fs, previous_fs; //fieldsets
//    var opacity;
//    var current = 1;
//    var steps = $("fieldset").length;

//    setProgressBar(current);

//    $(".next").click(function(){

//    current_fs = $(this).parent();
//    next_fs = $(this).parent().next();

//    //Add Class Active
//    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//    //show the next fieldset
//    next_fs.show();
//    //hide the current fieldset with style
//    current_fs.animate({opacity: 0}, {
//    step: function(now) {
//    // for making fielset appear animation
//    opacity = 1 - now;

//    current_fs.css({
//     'display': 'none',
//     'position': 'relative'
//    });
//    next_fs.css({'opacity': opacity});
//    },
//    duration: 500
//    });
//    setProgressBar(++current);
//    });

//    $(".previous").click(function(){

//    current_fs = $(this).parent();
//    previous_fs = $(this).parent().prev();

//    //Remove class active
//    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//    //show the previous fieldset
//    previous_fs.show();

//    //hide the current fieldset with style
//    current_fs.animate({opacity: 0}, {
//    step: function(now) {
//    // for making fielset appear animation
//    opacity = 1 - now;

//    current_fs.css({
//      'display': 'none',
//      'position': 'relative'
//      });
//     previous_fs.css({'opacity': opacity});
//     },
//    duration: 500
//    });
// setProgressBar(--current);
// });

//  function setProgressBar(curStep){
//    var percent = parseFloat(100 / steps) * curStep;
//    percent = percent.toFixed();
//    $(".progress-bar")
//      .css("width",percent+"%")
//     }

// $(".submit").click(function(){
// return false;
// })

// });

est_today = moment(new Date()).format("YYYY-MM-DD");
$('#est-invoice-date').val(est_today);
// // $('#recur-start').val(today);



$('#est-terms').on('change', function(){
    var value = $('#est-terms').val();
    console.log(typeof value);
if(value !== "end-of-month" || value !== "end-of-next-month")
{ 
    var due = new Date();
    var new_date = moment(due, "DD-MM-YYYY").add(value, 'days').format('YYYY-MM-DD');
        $('#est-due-date').val(new_date);
}
else if(value == 'end-of-month')
{
    var end = moment().format("YYYY-MM-") + moment().daysInMonth();
  $('#est-due-date').val(end);
}

});

// // for recurring 
// // $('#until3').hide();
// // $('#repeat-daily3').hide();
// // $('#repeat-weekly3').hide();
// // $('#repeat-monthly3').hide();

// // $('#daily').on('change', function(){
// //     $('#repeat-daily3').show();
// //     $('#repeat-weekly3').hide();
// //     $('#repeat-monthly3').hide();
// //     $('#until3').show();
// // });
// // $('#weekly').on('change', function(){
// //     $('#repeat-daily3').hide();
// //     $('#repeat-weekly3').show();
// //     $('#repeat-monthly3').hide();
// //     $('#until3').show();
// // });
// // $('#monthly').on('change', function(){
// //     $('#repeat-daily3').hide();
// //     $('#repeat-weekly3').hide();
// //     $('#repeat-monthly3').show();
// //     $('#until3').show();
// // });
// ////

// //for approval display
// // $('#payer_name').on('change', function(){
// //    $('#appr-name').html($('#payer_name').val());
// // });
// // $('#invoice-number').on('change', function(){
// //    $('[id=appr-invoice-num]').html($('#invoice-number').val());
// // });
// // $('#address').on('change', function(){
// //    $('#appr-address').html($('#address').val());
// // });
// // $('#invoice-date').on('change', function(){
// //    $('[id=appr-date]').html($('#invoice-date').val());
// // });
// // $('#due-date').on('change', function(){
// //    $('[id=appr-due-date]').html($('#due-date').val());
// // });

if($('#payer-name').val() == "" || $('#invoice-number').val() == "" || $('#invoice-date').val() == "" || $('#due-date').val() == "")
{
  $('#next1').attr("disabled",true);
}
if($('[id=item-name]').val() == "")
{
  $('#next2').attr("disabled",true);
}
if($('#email-to').val() == "" )
{
  $('#next3').attr("disabled",true);
}

    $('#terms').on('change', function(){
        $('#next1').removeAttr("disabled");
    });
    $('[id=item-name]').on('change', function(){
        if($('[id=item-name]').val().length > 0)
        {
            $('#next2').removeAttr("disabled");
        }
    });
    $('#email-to').on('change', function(){
        if($('#email-to').val().length > 0)
        {
          $('#next3').removeAttr("disabled");
        }

    });

    $('#estimate_payer_type').on('change', function(){
       $.ajax({
           type:"POST",
           data: {value:$('#estimate_payer_type').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'Invoicing', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#estimate_payer_name').html(html);
               $('#estimate_payer_name').selectpicker("refresh");
           },
           error: function(){
               alert('false');
           }

       });
    });
    $('#estimate_payer_type2').on('change', function(){
       $.ajax({
           type:"POST",
           data: {value:$('#estimate_payer_type2').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'Invoicing', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#estimate_payer_name2').html(html);
               $('#estimate_payer_name2').selectpicker("refresh");
           },
           error: function(){
               alert('false');
           }

       });
    });

$('#online').on('change', function(){
    $('#pay_option').html('<option value="momo">MTN Mobile Money</option><option value="airtetigo">AirtelTigo</option><option value="vodafone-cash">Vodafone Cash</option><option value="card">Credit or Debit Card</option><option value="bank">Direct Bank</option>');
    $('#pay_option').selectpicker("refresh");
});

$('#manual').on('change', function(){ 
    $('#pay_option').html('<option value="cash">Cash</option><option value="cheque">Cheque</option>');
    $('#pay_option').selectpicker("refresh");
});

$('#currency').on('change', function(){
    $("#cur-val1").html($(this).val().toUpperCase());
    $("#cur-val2").html($(this).val().toUpperCase());
});

$('#add-est-tax').on('change', function(){
    var amt = Number($('#main_amount2').val());
    var tax = Number(amt * $(this).val()/100);
    var formula = amt + tax;
  $('#main_amount2').val(formula);
  $('#est-totall').html(formula.toFixed(2));
  // tax = subtotal * tax/100

});
$('#add-est-discount').on('change', function(){
    var amt = Number($('#main_amount2').val());
    var dis = Number($(this).val())/100;
    var formula = amt - (amt * dis);

  $('#main_amount2').val(formula);
  $('#est-totall').html(formula.toFixed(2));
  // tax = subtotal * tax/100

});

// // const estimateBtn = document.getElementById('estimate-btn');

// // const estimateFileChosen = document.getElementById('estimateFile-chosen');

     

</script>

`;

export default function ElementElementInvoicingEstimate() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
