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
			<ul class="nav nav-tabs" id="invoicingTabs">
                <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
				<li class="nav-item">
					<a href="#create_invoice" data-toggle="tab"> Create</a>
				</li>
                
                <li class="nav-item">
					<a href="#draft_invoice" data-toggle="tab"> Draft </a>
				</li>
                <!-- php: } -->
                <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols) || in_array("APPROVE WRITEOFF", $statusProtocols) || in_array("RECORD PAYMENTS", $statusProtocols)){ -->
				  <li class="nav-item">
					 <a href="#pending_invoice" data-toggle="tab"> Pending </a>
				  </li>
                <!-- php: } -->
                <!-- php: if(in_array("REPORT MONEY IN", $statusProtocols)){ -->
                <li class="nav-item">
					<a href="#paid_invoice" data-toggle="tab"> Paid </a>
				</li>
                <!-- php: } -->
                <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols) || in_array("APPROVE WRITEOFF", $statusProtocols) || in_array("RECORD PAYMENTS", $statusProtocols)){ -->
                <li class="nav-item">
					<a href="#recurring_invoice" data-toggle="tab"> Recurring </a>
				</li>
                <!-- php: } -->
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
                    <!-- php: = $this->Form->create($addInvoice, ['url' => ['controller' => 'Invoicing', 'action' => 'addInvoice'],'id' =>'msform','novalidate']); -->
                    
                    <ul id="progressbar">
                        <li class="active" id="personal"><strong>Payer</strong></li>
                        <li id="cart"><strong>Items</strong></li>
                        <li id="payment"><strong>Payment</strong></li>
                        <li id="file"><strong>Approval</strong></li>
                        <li id="confirm"><strong>Finish</strong></li>
                    </ul>
                    <!-- <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> <br> fieldsets -->
                    <fieldset>
                    <div class="row mt-4">
                            <div class="col-md-2 text-left">
                                <h5>Payer <span class="text-danger">*</span></h5> 
                            </div>
                            <div class="col-md-6">
                                <SearchableSelectField name="payer_type" id="payer_type" class="form-control mb-1 input-height">
                                    <option>Select Payer</option>
                                    <option value="patient">Patient</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="company/credit">Company/Credit</option>
                                    <option value="custom">Custom</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-2 text-left">
                                <h5>Payer Name <span class="text-danger">*</span></h5>
                            </div>
                            <div class="col-md-6">
                            <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payer_name" id="payer_name" title="Select Payer Name"  data-live-search="true" required>
		    									
                            </SearchableSelectField>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-2 text-left">
                                <h5>Currency <span class="text-danger">*</span></h5>
                            </div>
                        <div class="col-md-6">
                                <SearchableSelectField name="currency" id="currency" class="form-control input-height">
                                    <option>Select Currency</option>
                                    <option value="CEDIS">Cedis</option>
                                    <option value="USD">USD</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-2 text-left">
                                <h5>Invoice # </h5>
                            </div>
                            <div class="col-md-6 d-flex align-item-center">
                                <input readonly id="invoice-number" value="INV-<!-- php: = $invoice_gen -->" name="invoice_number" type="text" class="form-control">
                            </div>
                            <!-- <div class="col-md-1 d-flex text-left px-0">
                            <i id="gear" style="font-size:16px;cursor:pointer;" class="fa fa-gear text-primary ml-2 mt-3"></i>
                            </div> -->
                        </div>
                        <div class="row mt-2">
                        <div class="col-md-2 text-left">
                                <h5>Terms <span class="text-danger">*</span></h5>
                            </div>
                            <div class="col-md-6">
                                <SearchableSelectField name="terms" id="terms" class="form-control input-height">
                                    <option>Select Terms</option>
                                    <option value="7">Net 7</option>
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
                                <input id="invoice-date" name="invoice_date" type="text" readonly class="form-control">
                            </div>
                            <div class="col-md-1 px-0">
                                <h5>Due Date</h5>
                            </div>
                            <div class="col-md-2 px-0">
                                <input id="due-date" style="width:93%;" name="due_date" type="text" class="form-control">
                            </div>
                        </div>
                          <input type="button" id="next1" name="next" class="next action-button btn btn-primary" value="Next - Items" />
                          <input type="submit" id="draft1" style="width:auto;margin-right:7px;" name="draft" value="Save As Draft" class="btn btn-warning action-button">
                    </fieldset>
                    <fieldset>
                      <div id="item-table">
                        <!-- <div class="table-responsive"></div> -->
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
									<tbody id="item-body">
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
                         <h5 id="add_more_button" style="cursor:pointer" class="text-primary ml-3">
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
                                         <td class="text-center" id="sub-total">0</td>
                                     </tr>
                                     <tr>
                                         <th>Discount (%)</th>
                                         <td class="text-center" id="sub-dis">
                                         <input type="number" id="add-discount" onchange="getTotalDiscount(this.value)" placeholder="Discount (%)" name="invoice_discount" class="form-control text-center">
                                         </td>
                                     </tr>
                                     <tr>
                                         <th>Tax (%)</th>
                                         <td class="text-center"><input type="number" onchange="getTotalTax(this.value)" id="add-tax" placeholder="Tax (%)" name="tax" class="form-control text-center"></td>
                                     </tr>
                                     <tr>
                                         <th>Total (<span id="cur-val2"></span>)</th>
                                         <td class="text-center" id="totall">0</td>
                                         <input type="hidden" id="amount" name="total_amount">
                                     </tr>
                                 </table>
                            </div>
                        </div>

                       <input type="button" id="next2" name="next" style="width:120px" class="next action-button btn btn-primary" value="Next - Payment" /> 
                        <input type="button" name="previous" style="width:125px" class="previous action-button-previous btn btn-secondary" value="Previous - Payer" />
                        <input type="submit" style="width:auto;margin-right:7px;" name="draft" value="Save As Draft" class="btn btn-warning action-button">
                    </fieldset>
                    <fieldset>
                    <div class="container my-4">
                    <div class="row">
                            <div class="col-md-2 text-left">
                                <h5>Payment Type<span class="text-danger">*</span></h5>
                            </div>
                            <div class="col-md-7 text-left">
                                <!-- <SearchableSelectField name="pay_type" id="pay_type" class="form-control">
                                    <option>Select Payment Type</option>
                                    <option value="online">Online</option>
                                    <option value="manual">Manual</option>
                                </SearchableSelectField> -->
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pay_type" id="online"
                                        value="online">
                                    <label class="form-check-label" for="online">Online</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pay_type" id="manual"
                                        value="manual">
                                    <label class="form-check-label" for="manual">Manual</label>
                                </div>
                            </div>
                        </div>
                          <div class="row mt-3">
                              <div class="col-md-2 text-left">
                              <h5>Payment Options<span class="text-danger">*</span></h5>
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
                                 <h5>Email To<span class="text-danger">*</span></h5>
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
                                <!-- <div class="container-fluid mt-4 d-flex justify-content-start">

                                </div> -->
                              </div>
                          </div>
                          <div class="row mt-3">
   <div class="col-md-2"></div>
   <div class="col-md-7">
      <div class="accordion" id="accordionExample">
         <div class="card">
            <h5 class="my-0" style="background-color: #90ee904d" id="headingOne">
               <button class="btn btn-link text-dark" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               <i class="fa fa-file"></i>&nbsp; Make Invoice Recurring
               </button>
            </h5>
            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
               <div class="card-body">
                  <div id="ramot" class="row mt-3 d-none">
                     <div class="col-md-3">
                        <h5>Amount <span class="text-danger">*</span> </h5>
                     </div>
                     <div class="col-md-7">
                        <input type="number" readonly name="recur_amt" id="recur_amt" class="form-control my-0">
                        <!-- <small class="text-danger">Amount to pay over the recurring period of time</small> -->
                     </div>
                  </div>
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
                     <div class="col-md-7 d-flex align-items-center p-1">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="daily" value="daily">
                           <label class="form-check-label" for="daily">Daily</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="weekly" value="weekly">
                           <label class="form-check-label" for="weekly">Weekly</label>
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="type" id="monthly" value="monthly">
                           <label class="form-check-label" for="monthly">Monthly</label>
                        </div> 
                     </div>
                  </div>
                  <div id="repeat-daily3" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_day" class="form-control">
                     </div>
                     <div class="col-md-2 p-1">
                        <h5>day (s)</h5>
                     </div>
                  </div> 
                   <div id="repeat-weekly3" class="row mt-2 pl-2">
                     <div class="col-md-3 p-1">
                        <h5>Repeat every: </h5>
                     </div>
                     <div class="col-md-3 d-flex align-items-center p-1">
                        <input type="number" name="every_week" class="form-control">
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
                     <div class="col-md-2 d-flex align-items-center p-1">
                        <input type="number" name="every_month" class="form-control">
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
                        <div style="border: 1px solid #ccc; border-radius:5px;" class="container py-4 p-3">
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
                                 <div class="d-flex align-items-center">
                                    <div class="col-md-5">
                                    <h5 class="text-dark text-left m-0 p-0">Start</h5>
                                    </div>
                                    <div class="col-md-6"> <input type="text" readonly id="recur-start" name="recur_start" class="form-control my-0"></div>
                                 </div>
                              </div>
                           </div>
                           <div class="row mt-3">
                               <!-- <div class="col-md-1"><input type="radio"/></div> -->
                               <div class="col-md-11">
                                   <div class="d-flex align-items-center">
                                       <div class="col-md-5">
                                           <h5 class="text-dark text-left m-0 p-0">Stop Condition</h5>
                                       </div>
                                       <div class="col-md-6 text-left">
                                           <div class="form-check form-check-inline">
                                               <input class="form-check-input" type="radio"
                                                   name="condition" id="stop-date" value="stop-date">
                                               <label class="form-check-label" for="stop-date">Date</label>
                                           </div>
                                           <div class="form-check form-check-inline">
                                               <input class="form-check-input" type="radio"
                                                   name="condition" id="stop-occurence" value="stop-occurence">
                                               <label class="form-check-label" for="stop-occurence">Occurence</label>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div id="specific-date" class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                    <div class="col-md-5">
                                    <h5 class="text-dark text-left m-0 p-0">Run until a specific date</h5>
                                    </div>
                                    <div class="col-md-6"><input type="date" class="form-control validate-recurr" id="recur-type" name="recur_end"/></div>
                                 </div>
                              </div>
                           </div>
                           <div id="specific-occurence" class="row mt-3">
                              <!-- <div class="col-md-1"><input type="radio"/></div> -->
                              <div class="col-md-11">
                                 <div class="d-flex align-items-center">
                                   <div class="col-md-5">
                                   <h5 class="text-dark text-left m-0 p-0" style="padding-right:33px!important">Run until it reaches</h5>
                                   </div>
                                    <div class="col-md-3"><input type="text" class="form-control validate-recurr" id="recur-type" name="occurence"/></div>
                                    <div style="white-space: nowrap;" class="col-md-2 pl-1">occurences</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <center><span id="indication" style="font-size:15px" class="text-danger font-weight-bold mt-2"></span></center>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</div>

                                  
<input type="button" name="next" id="next3" style="width:auto" class="next action-button btn btn-primary" value="Next - Approval " />
<input type="button" style="width:137px" name="previous" class="previous btn btn-secondary action-button-previous" value="Previous - Items" />
                                  <input type="submit" id="draft2" style="width:auto;margin-right:7px;" name="draft" value="Save As Draft" class="btn btn-warning action-button"/>&nbsp;&nbsp;
                    </fieldset>
                <fieldset>
                    <div class="container-fluid p-3 bg-light">

                        <div class="row">
                            <div class="col-md-2 p-3">
                                <h6 class="text-secondary p-0 m-0"> Invoice #</h6>
                                <h5 id="appr-invoice-num" class="p-0 m-0">INV-002342</h5>
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
                                    Address: <p id="appr-address" style="margin-top:24px;">

                                    </p>

                                </div>
                                <div class="col-md 6 p-2 text-right">
                                    <h2 class="font-weight-bold mb-1">Invoice</h2>
                                    <h5 id="appr-invoice-num2" class="font-weight-bold"># INV-0023233</h5>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-md-8 p-2 text-left">
                                    <h5>Bill To</h5>
                                    <h5 id="appr-name" class="font-weight-bold"></h5>
                                    <h5 id="appr-email"></h5>

                                </div>
                                <div class="col-md-4 p-2 text-right">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-6 text-left">
                                                <h5 style="font-weight:bold">Invoice Date:</h5>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <h5 id="appr-date" style="">24/12/22</h5>
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
                                                <h5 id="appr-due-date2" style="">24/12/22</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="firstline-table container-fluid mt-5 px-0 py-3">
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
                                    <tbody id="appr_items_table"></tbody>
                                </table>
                                <div class="row mt-4">
                                    <div class="col-md-8 p-3"></div>
                                    <div class="col-md-4 p-3">
                                        <div class="row">
                                            <div class="col-md-6 text-left">
                                                <h5 class="font-weight-bold">Sub Total</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 id="appr-sub-total">0</h5>
                                            </div>
                                        </div>
                                        <!-- <div class="row">
                                            <div class="col-md-6 text-left"> <h5 class="font-weight-bold">Sub Tax</h5> </div>
                                            <div class="col-md-6"> <h5 id="appr-sub-tax" >0</h5> </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 text-left"> <h5 class="font-weight-bold">Sub Discount</h5> </div>
                                            <div  class="col-md-6"> <h5 id="appr-sub-discount">0</h5> </div>
                                        </div> -->
                                        <div class="row">
                                            <div class="col-md-6 text-left">
                                                <h5 class="font-weight-bold">Total</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 id="appr-total" class="font-weight-bold">0</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                           <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols)){ -->
                            <input id="approbtn" data-toggle="modal" data-target="#approve_send" style="width:auto;margin-right:7px;" class="btn btn-danger action-button" value ="Approve and Send" />
                            <!-- php: } else{ -->
                              <input type="submit" name="next" class="next action-button btn btn-primary" value="Finish " /> 
                           <!-- php: } -->
                            <input type="button" name="previous" style="width:143px" class="previous btn btn-secondary action-button-previous" value="Previous - Payment" />
     
        
                        </fieldset>
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
                            <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br>
                            <div class="row justify-content-center">
                                <div class="col-3"> <img src="https://i.imgur.com/GwStPmg.png" class="fit-image"> </div>
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
            <div class="modal fade" id="approve_send" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Approve Invoice  #</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
               <div class="container-fluid">
                  <div class="row mb-3 mt-4">
                     <div class="col-md-4">
                        <h5>Send Options: </h5>
                     </div>
                     <div class="col-md-8">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendEmail" value="email" checked>
                           <label class="form-check-label" for="sendEmail">Email</label>
                           <!-- php: = '<br/><small class="text-secondary"></small>' -->
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendWhatsapp" value="whatsapp">
                           <label class="form-check-label" for="sendWhatsapp">Whatsapp</label>
                           <!-- php: = '<br/><small class="text-secondary"></small>' -->
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendSms" value="sms">
                           <label class="form-check-label" for="sendSms">SMS</label>
                           <!-- php: = '<br/><small class="text-secondary"></small>' -->
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <input type="hidden" name="status" value="approved">
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Send  &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
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
   <h5 class="font-weight-bold">Filter Options:</h5>
   <div class="row">
      <div class="col-sm-3 d-flex align-items-center">
         <div class="center" style="vertical-align: bottom">From:</div>
         &nbsp;&nbsp;
         <div class="input-group">
            <input class="form-control" placeholder="Start" size="16"  name="datefilter-start1" id="start1" type="text" required >
            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
         </div>
      </div>
      <div class="col-sm-3 d-flex align-items-center">
         <div class="" style="">To:</div>
         &nbsp;&nbsp;
         <div class="input-group">
            <input class="form-control " placeholder="End" size="16" placeholder="" name = "datefilter-end1" id="end1" type="text" value="" required >
            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
         </div> 
         &nbsp;
         <button id="pendingBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">GO</button>
      </div>
      <div id="filter" class="col-sm-3 d-flex align-items-center">
         <!-- <div class="" style="">To:</div>&nbsp;&nbsp; -->
         <div class="input-group">
            <SearchableSelectField class="form-control input-height" name = "status_filter" id = "status-filter">
               <option>Select Status</option>
               <option class="text-success" value="approved waiting for payment">Approved Waiting for Full Payment</option>
               <option class="text-success" value="approved waiting for payment">Approved Part Payment</option>
               <option class="due-date" value="waiting for approval">Waiting For Approval</option>
               <option class="text-warning" value="due part payment">Due Part Payment</option>
               <option class="text-primary" value="due full payment">Due Full Payment</option>
               <option class="text-danger" value="overdue by">Overdue By x Days</option>
               <!-- <option class="text-warning" value="invoice is due">Invoice is Due</option> -->
            </SearchableSelectField>
            <!-- <span class="input-group-addon"><span class="fa fa-calendar"></span></span> -->
         </div>
         &nbsp;
         <!-- <button id="resetBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">Reset</button> -->
      </div>
   </div>
</div>
						  	<div class="table-responsive mt-2">
								
								<table id="pending_table" class="table table-hover customDatable full-width pending_table">
									<thead>
										<tr>
											<th><span style="color:#27ae60" class="invoice-table-header-green py-2 px-3">Date</span></th>
											<th><span class="invoice-table-header-green py-2 px-3">Invoice#</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Payer Name</span></th>
                                            <th>Status</th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Due Date</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Amount</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Balance Due</span></th>
                                            <!-- php: = count($statusProtocols) > 0 ? '<th>Action</th>' : '' -->
                                            
										</tr>
									</thead>
									<tbody>
                                     
                                    <!-- php: foreach($pendingInvoices as $pendingInvoice){ if ($pendingInvoice->status == 'recurring') { continue; } if($pendingInvoice->balance_due > 0){ -->
                                        <tr>
                                           <td><!-- php: = $pendingInvoice->invoice_date --></td>
                                           <td><a href="javascript:" data-toggle="modal" data-target="#pending_<!-- php: =$pendingInvoice->id -->"><!-- php: = $pendingInvoice->invoice_number --></a></td>
                                           <td><!-- php: = $pendingInvoice->payer_name --> <!-- php: = $pendingInvoice->pay_type == "online" ? '<span class="badge badge-primary">online</span>' : '<span class="badge badge-warning">manual</span>' --></td>
                                           <td>
                                               <!-- php: $now = date('Y-m-d'); //echo strtotime($pendingInvoice->due_date) - strtotime($now); if (isset($pendingInvoice->due_date)) { # code... $diff = abs(strtotime($now) - strtotime($pendingInvoice->due_date)); $days_interval = round($diff/86400);... -->
                                        
                                           </td>
                                           <td><!-- php: = $pendingInvoice->due_date --></td>
                                           <td><a href="javascript:" data-toggle="modal" data-target="#pending_amount_<!-- php: =$pendingInvoice->id -->"><!-- php: = $pendingInvoice->total_amount --></a></td>
                                           <td><!-- php: = $pendingInvoice->balance_due --></td>
                                           <!-- php: if (count($statusProtocols) > 0 ){ -->
                                           <td>
                                               <!--
                                                TODO: 
                                                1. TAKE OFF DISABLE FOR ONLINE PAYMENT
                                                2. TAKE OFF WRITE OFF FOR ONLINE PAYMENT
                                               !-->
                                                <!-- php: if($pendingInvoice->status == 'pending') { -->
                                                    <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                               <a href="<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'edit',$pendingInvoice->id]) -->" class="btn btn-warning btn-sm">Edit</a><br/>
                                               <!-- php: //= $pendingInvoice->enabled == 0 ? $this->Form->postLink(__('Enable'), ['controller'=>'Invoicing','action'=>'toggleIsEnabled',$pendingInvoice->id], ['class' => 'btn btn-success btn-sm']) : $this->Form->postLink(__('Disable'), ['controller'... -->
                                               <!-- php: = $pendingInvoice->pay_type != "online" ? $pendingInvoice->enabled == 1 ? '<button data-toggle="modal" data-target="#disable_pending_'.$pendingInvoice->id.'" class="btn btn-secondary btn-sm">Disable</button>' : '<button data-toggle="modal" ... --><br/>
                                               <!-- <a href="javascript:" class="btn btn-sm btn-primary btn-info"> <i class="fa fa-bell"></i> Send Reminder</a> -->
                                               <!-- php: = $pendingInvoice->pay_type != "online" ? '<a href="javascript:" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#writeoff_pending_'.$pendingInvoice->id.'">Write Off</a>': '' -->
                                           
                                               <br/>
                                            
                                               <!-- php: } -->
                                               <!-- php: } -->
                                               <!-- php: if($pendingInvoice->status == 'approved') { -->
                                                    <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                               <!-- php: //= $pendingInvoice->enabled == 0 ? $this->Form->postLink(__('Enable'), ['controller'=>'Invoicing','action'=>'toggleIsEnabled',$pendingInvoice->id], ['class' => 'btn btn-success btn-sm']) : $this->Form->postLink(__('Disable'), ['controller'... -->
                                               <!-- php: = $pendingInvoice->pay_type != "online" ? $pendingInvoice->enabled == 1 ? '<button data-toggle="modal" data-target="#disable_pending_'.$pendingInvoice->id.'" class="btn btn-secondary btn-sm">Disable</button>' : '<button data-toggle="modal" ... --><br/>
                                               <!-- <a href="javascript:" class="btn btn-sm btn-primary btn-info"> <i class="fa fa-bell"></i> Send Reminder</a> -->
                                               <!-- php: = $pendingInvoice->pay_type != "online" ? '<a href="javascript:" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#writeoff_pending_'.$pendingInvoice->id.'">Write Off</a>' : '' -->
                                              
                                               <br/>
                                               <!-- php: } -->
                                                <!-- php: } -->
                                               <!-- <a href="<!-- php: //= $this->Url->build(["controller" => "Invoicing","action" => "deleteInvoice",$pendingInvoice->id]) -->" class="btn btn-danger btn-sm">Write Off</a><br/> -->
                                               <!-- <a href="<!-- php: //= $this->Url->build(['controller' => 'Invoicing', 'action' => 'recordPayment',$pendingInvoice->id]) -->" class="btn btn-primary btn-sm">Record Payments</a> -->
                                               <!-- php: if(in_array("APPROVE WRITE OFF", $statusProtocols)){ -->
                                                <!-- php: = $pendingInvoice->pay_type == "online" ? '<a href="javascript:" class="btn btn-sm bg-white text-danger" data-toggle="modal" data-target="#reconcile_'.$pendingInvoice->id.'">Reconcile</a>' : '' -->
                                               <!-- php: } -->
                                               <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols)){ -->
                                               <!-- php: if($pendingInvoice->status == 'pending'){ -->
                                                <a href="javascript:" class="btn btn-sm btn-info" data-toggle="modal" data-target="#approve_invoice_<!-- php: = $pendingInvoice->id -->">Approve And Send</a> 
                                                <!-- php: } -->
                                               <!-- php: } -->
                                               <!-- php: //= $this->Form->postLink(__('Record Payments'), ['controller'=>'Invoicing','action'=>'recordPayment',$pendingInvoice->id], ['confirm' => __('Are you sure you want to record payment {0}?', $pendingInvoice->invoice_number), 'class' => 'btn b... -->
                                               <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols) && $pendingInvoice->status == 'approved'){ -->
                                               <!-- php: = $pendingInvoice->pay_type == "online" ? '' : '<button data-toggle="modal" data-target="#record_'.$pendingInvoice->id.'" class="btn btn-sm btn-primary">Record Payments</buttion>' -->
                                               <!-- php: } -->
                                             
                                            </td>
                                            <!-- php: } -->
                                       </tr>
                                       <!-- php: } } -->
                                      <!-- php: $x =1; foreach($recurringInvoices as $recurringInvoice): if($recurringInvoice->amount_balance > 0){ -->
                                          <!-- php: if($recurringInvoice->status=='pending'){ -->
                                              
                                            <tr>
                                                <td><!-- php: = $recurringInvoice->date --></td>
                                                <td><a href="javascript:" data-toggle="modal" data-target="#recurring_preview_<!-- php: = $recurringInvoice->id -->"><!-- php: = $recurringInvoice->invoicing->invoice_number -->-<!-- php: = $recurringInvoice->occurence --></a></td>
                                                <td><!-- php: = $recurringInvoice->invoicing->payer_name --><!-- php: = $recurringInvoice->invoicing->pay_type == "online" ? '<span class="badge badge-primary">online</span>' : '<span class="badge badge-warning">manual</span>' --></td>
                                                <td>
                                               <!-- php: if($recurringInvoice->invoicing->status == 'recurring') { if((strtotime($recurringInvoice->invoicing->due_date) - strtotime($now)) < 7) { if(($recurringInvoice->invoicing->total_amount - $recurringInvoice->balance_due) != 0 ){ echo '<small ... -->
                                                                    
                                           </td>
                                           <td><!-- php: = $recurringInvoice->invoicing->due_date --></td>
                                           <td><a href="javascript:" data-toggle="modal" data-target="#recurring_amount_<!-- php: =$recurringInvoice->id -->"><!-- php: = $recurringInvoice->amount --></a></td>
                                           <td><!-- php: = $recurringInvoice->amount_balance --></td>
                                             
                                           <!-- php: if (count($statusProtocols) > 0 ){ -->
                                           <td>
                                               
                                                <!-- php: if($recurringInvoice->status == 'pending') { -->
                                                    <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                               <!-- php: = $recurringInvoice->invoicing->enabled == 0 ? $this->Form->postLink(__('Enable'), ['controller'=>'Invoicing','action'=>'toggleIsEnabled',$recurringInvoice->invoicing->id], ['class' => 'btn btn-success btn-sm']) : $this->Form->postLink(__('... --><br/>
                                               <!-- php: } -->
                                                <!-- php: } -->
                                               <!-- <a href="<!-- php: //= $this->Url->build(["controller" => "Invoicing","action" => "deleteInvoice",$recurringInvoice->invoicing->id]) -->" class="btn btn-danger btn-sm">Write Off</a><br/> -->
                                               <!-- <a href="<!-- php: //= $this->Url->build(['controller' => 'Invoicing', 'action' => 'recordPayment',$recurringInvoice->invoicing->id]) -->" class="btn btn-primary btn-sm">Record Payments</a> -->
                                               <!-- php: if(in_array("APPROVE WRITE OFF", $statusProtocols)){ -->
                                               <a href="javascript:" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#writeoff_recurring_<!-- php: =$recurringInvoice->id -->">Write Off</a>
                                               <!-- php: } -->
                                               <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols)){ -->
                                               <!-- php: if($recurringInvoice->invoicing->status !='recurring'){ -->
                                                <a href="javascript:" class="btn btn-sm btn-info" data-toggle="modal" data-target="#approve_recurring_<!-- php: = $recurringInvoice->id -->">Approve And Send</a> 
                                                <!-- php: } -->
                                               <!-- php: } -->
                                               <!-- php: //= $this->Form->postLink(__('Record Payments'), ['controller'=>'Invoicing','action'=>'recordPayment',$recurringInvoice->invoicing->id], ['confirm' => __('Are you sure you want to record payment {0}?', $recurringInvoice->invoicing->invoice_... -->
                                               <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols) && $recurringInvoice->invoicing->status == 'recurring'){ -->
                                               <!-- php: = $recurringInvoice->invoicing->pay_type == "online" ? '' : '<button data-toggle="modal" data-target="#record_recurring_'.$recurringInvoice->id.'" class="btn btn-sm btn-primary">Record Payments</buttion>' -->
                                               <!-- php: } -->
                                             
                                            </td>
                                            <!-- php: } -->

                                            </tr>
                                        <!-- php: }} $x++; endforeach; -->

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
                <div class="tab-pane" id="paid_invoice">
                <div class="card  card-box">
                <div class="container-fluid py-2 mt-4">
   <h5 class="font-weight-bold">Filter Options:</h5>
   <div class="row">
      <div class="col-sm-3 d-flex align-items-center">
         <div class="center" style="vertical-align: bottom">From:</div>
         &nbsp;&nbsp;
         <div class="input-group">
            <input class="form-control" placeholder="Start" size="16"  name="datefilter-start1" id="start2" type="text" required >
            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
         </div>
      </div>
      <div class="col-sm-3 d-flex align-items-center">
         <div class="" style="">To:</div>
         &nbsp;&nbsp;
         <div class="input-group">
            <input class="form-control " placeholder="End" size="16" placeholder="" name = "datefilter-end1" id="end2" type="text" value="" required >
            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
         </div>
         &nbsp;
         <button id="paidBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">GO</button>
      </div>
      <div id="filter" class="col-sm-3 d-flex align-items-center">
         <!-- <div class="" style="">To:</div>&nbsp;&nbsp; -->
         <div class="input-group">
            <SearchableSelectField class="form-control input-height" name = "status_filter" id = "status-filter">
               <option>Select Status</option>
               <option class="due-date" value="part">Part Payment</option>
               <option class="text-success" value="full">Full Payment</option>
            </SearchableSelectField>
            <!-- <span class="input-group-addon"><span class="fa fa-calendar"></span></span> -->
         </div>
         &nbsp;
         <!-- <button id="resetBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">Reset</button> -->
      </div>
   </div>
</div>
						<div class="card-body ">

						  	<div class="table-responsive">
								
								<table id="paid_table" class="table table-hover customDatable full-width paid_table">
									<thead>
										<tr>
											<th><span style="color:#27ae60" class="invoice-table-header-green py-2 px-3">Date</span></th>
											<th><span class="invoice-table-header-green py-2 px-3">Invoice#</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Payer Name</span></th>
                                            <th>Status</th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Amount</span></th>
                                            <!-- php: = count($statusProtocols) > 0 ? '<th>Action</th>' : '' -->
										</tr>
									</thead>
									<tbody>

                                    <!-- php: foreach($paidInvoices as $paidInvoice){ -->
                                        <tr>
                                           <td><!-- php: = $paidInvoice->invoice_date --></td>
                                           <td><a href="javascript:" data-toggle="modal" data-target="#paid_<!-- php: = $paidInvoice->id -->"><!-- php: = $paidInvoice->invoice_number --></a></td>
                                           <td><!-- php: = $paidInvoice->payer_name --> <span class="badge badge-warning">manual</span></td>
                                           <td>
                                               <h5 class="text-success">Paid</h5>
                                               <!-- php: = $paidInvoice->invoicing_write_off ? '<small class="text-secondary">'.$paidInvoice->invoicing_write_off->reason.'</small>' : '' -->
                                           </td>
                                           <td><a href="javascript:" data-toggle="modal"><!-- php: = $paidInvoice->balance_due --></a></td>
                                           <!-- php: if (count($statusProtocols) > 0 ){ -->
                                           <td>
                                           <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols)){ -->
                                           <!-- php: = $paidInvoice->money_in == 0 ? '<a href="javascript:" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#rmi'.$paidInvoice->id.'">Report Money In</a>' : '<button class="btn btn-sm btn-success">Reported</button>' -->
                                           <!-- php: } -->
                                           </td>
                                           <!-- php: } -->
                                       </tr>
                                       
                                    <!-- php: } -->
                                    <!-- php: $x =1; // $recurringInvoice->display == 1 && foreach($recurringInvoices as $recurringInvoice): -->
                                          <!-- php: if($recurringInvoice->status=='paid'){ -->
                                              
                                            <tr>
                                                <td><!-- php: = $recurringInvoice->date --></td>
                                                <td><a href="javascript:"><!-- php: = $recurringInvoice->invoicing->invoice_number -->-<!-- php: = $recurringInvoice->occurence --></a></td>
                                                <td><!-- php: = $recurringInvoice->invoicing->payer_name --><!-- php: = $recurringInvoice->invoicing->pay_type == "online" ? '<span class="badge badge-primary">online</span>' : '<span class="badge badge-warning">manual</span>' --></td>
                                                <td>
                                               <h5 class="text-success">Paid</h5>
                                               <!-- php: = $recurringInvoice->invoicing->invoicing_write_off ? '<small class="text-secondary">'.$recurringInvoice->invoicing->invoicing_write_off->reason.'</small>' : '' -->
                                           </td>
                                           <td><a href="javascript:"><!-- php: = $recurringInvoice->amount --></a></td>
                                           <!-- php: if(count($statusProtocols) > 0 ){ -->
                                           <td>
                                           <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols)){ -->
                                           <!-- php: = $recurringInvoice->reported == 0 ? '<a href="javascript:" class="btn btn-sm btn-primary" data-toggle="modal" dataa-target="#rmr_'.$recurringInvoice->id.'">Report Money In</a>' : '<button class="btn btn-sm btn-success">Reported</button>' -->
                                           <!-- php: } }} -->
                                           </td>

                                            </tr>
                                        <!-- php: $x++; endforeach; -->

                                    <!-- php: $x =1; foreach($recordedInvoices as $recordedInvoice): -->
                                              
                                            <tr>
                                                <td><!-- php: = $recordedInvoice->payment_date --></td>
                                                <td><a href="javascript:" data-toggle="modal" data-target="#wpaid_<!-- php: = $recordedInvoice->id -->"><!-- php: = $recordedInvoice->invoicing->invoice_number --></a></td>
                                                <td><!-- php: = $recordedInvoice->invoicing->payer_name --><!-- php: = $recordedInvoice->invoicing->pay_type == "online" ? '<span class="badge badge-primary">online</span>' : '<span class="badge badge-warning">manual</span>' --></td>
                                                <td>
                                               <h5 class="text-success">Paid</h5>
                                               <!-- php: = $recordedInvoice->invoicing->invoicing_write_off ? '<small class="text-secondary">'.$recordedInvoice->invoicing->invoicing_write_off->reason.'</small>' : '' -->
                                           </td>
                                           <td><a href="javascript:" data-target="#paid_breakdown_<!-- php: =$recordedInvoice->id -->"><!-- php: = $recordedInvoice->amount --></a></td>
                                           <!-- php: if(count($statusProtocols) > 0 ){ -->
                                           <td>
                                           <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols)){ -->
                                           <!-- php: = $recordedInvoice->money_in == 0 ? '<a data-toggle="modal" href=":javascript" data-target="#rmd_'.$recordedInvoice->id.'" class="btn btn-primary btn-sm">Report Money In</a>' : '<button class="btn btn-sm btn-success">Reported</button>' -->
                                           
                                           <!-- php: }} -->
                                           </td>

                                            </tr>
                                        <!-- php: $x++; endforeach; -->
                                        <!-- php: $x =1; foreach($writeOffInvoices as $writeOffInvoice): -->
                                              
                                            <tr>
                                                <td><!-- php: = $writeOffInvoice->date->format('Y-m-d') --></td>
                                                <td><a href="javascript:"><!-- php: = $writeOffInvoice->invoicing->invoice_number --></a></td>
                                                <td><!-- php: = $writeOffInvoice->invoicing->payer_name --><!-- php: = $writeOffInvoice->invoicing->pay_type == "online" ? '<span class="badge badge-primary">online</span>' : '<span class="badge badge-warning">manual</span>' --></td>
                                                <td>
                                               <h5 class="text-success">Written Off</h5>
                                               <small class="text-secondary">Transaction Id: <!-- php: = $writeOffInvoice->reason --></small>
                                           </td>
                                           <td><a href="javascript:"><!-- php: = $writeOffInvoice->write_amount_pay --></a></td>
                                           <!-- php: if(count($statusProtocols) > 0 ){ -->
                                           <td>
                                           <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols)){ -->
                                           <!-- php: = $writeOffInvoice->reported == 0 ? '<a class="btn btn-sm btn-primary" href="javascript:" data-toggle="modal" data-target="#rmt_'.$writeOffInvoice->id.'">Report Money In</a>' : '<button class="btn btn-sm btn-success">Reported</button>' -->
                                           
                                           <!-- php: }} -->
                                           </td>

                                            </tr>
                                        <!-- php: $x++; endforeach; -->

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
                <div class="tab-pane" id="recurring_invoice">
                    <div class="card  card-box">
                        <div class="card-body ">
                            <div class="container-fluid py-2 mt-4">
                                <h5 class="font-weight-bold">Filter Options:</h5>
                                <div class="row">
                                    <div class="col-sm-3 d-flex align-items-center">
                                        <div class="center" style="vertical-align: bottom">From:</div>
                                        &nbsp;&nbsp;
                                        <div class="input-group">
                                            <input class="form-control" placeholder="Start" size="16"
                                                name="datefilter-start1" id="start3" type="text" required>
                                            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 d-flex align-items-center">
                                        <div class="" style="">To:</div>
                                        &nbsp;&nbsp;
                                        <div class="input-group">
                                            <input class="form-control " placeholder="End" size="16" placeholder=""
                                                name="datefilter-end1" id="end3" type="text" value="" required>
                                            <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                                        </div>
                                        &nbsp;
                                        <button id="recurringBtn"
                                            class="btn btn-md btn-info d-flex justify-content-center align-items-center"
                                            style="height:100%">GO</button>
                                    </div>
                                    <div id="filter" class="col-sm-3 d-flex align-items-center">
                                        <!-- <div class="" style="">To:</div>&nbsp;&nbsp; -->
                                        <div class="input-group">
                                            <SearchableSelectField class="form-control input-height" name="status_filter"
                                                id="status-filter3">
                                                <option>Select Status</option>
                                                <!-- <option value="active">Active</option> -->
                                                <option class="due-date" value="waiting">Waiting For Approval</option>
                                                <option class="text-primary" value="due">Due Part Payment</option>
                                                <option class="text-warning" value="due-no">Due No Payment</option>
                                                <option class="text-danger" value="due-15">Overdue By x Days</option>
                                            </SearchableSelectField>
                                            <!-- <span class="input-group-addon"><span class="fa fa-calendar"></span></span> -->
                                        </div>
                                        &nbsp;
                                        <!-- <button id="resetBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">Reset</button> -->
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">

                                <table id="recurring_table"
                                    class="table table-hover customDatable full-width recurring_table">
                                    <thead>
                                        <tr>
                                            <th><span style="color:#27ae60"
                                                    class="invoice-table-header-green py-2 px-3">Date</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Invoice#</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Payer Name</span>
                                            </th>
                                            <!-- <th>Status</th> -->
                                            <!-- <th><span class="invoice-table-header-green py-2 px-3">Due Date</span></th> -->
                                            <th><span class="invoice-table-header-green py-2 px-3">Recurring
                                                    Amount</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Amount</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">No. of
                                                    Occurences</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Activity</span></th>
                                            <!-- php: = count($statusProtocols) > 0 ? '<th>Action</th>' : '' -->
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <!-- php: $x=1; $today_date = Date('Y-m-d'); foreach($pendingInvoices as $recurringInvoice): -->
                                        <!-- php: if($recurringInvoice->status == 'recurring'){ $total_paid = 0; foreach ($recurringInvoice->invoicing_recurring as $key => $recur) { $total_paid += $recur->status == 'paid' ? 1 : 0; # code... } -->

                                        <tr>
                                            <td><!-- php: = $recurringInvoice->invoice_date --></td>
                                            <td><a href="javascript:" data-toggle="modal"
                                                    data-target="#pending_<!-- php: = $recurringInvoice->id -->"><!-- php: = $recurringInvoice->invoice_number --></a>
                                            </td>
                                            <td><!-- php: = $recurringInvoice->payer_name --><!-- php: = $recurringInvoice->pay_type == "online" ? '<span class="badge badge-primary">online</span>' : '<span class="badge badge-warning">manual</span>' -->
                                            </td>

                                            <td><!-- php: = $recurringInvoice->invoicing_recurring[0]->amount --></td>
                                            <td><!-- php: = $recurringInvoice->total_amount --></td>
                                            <td><!-- php: = $total_paid -->/
                                                <!-- php: = sizeof($recurringInvoice->invoicing_recurring) --><!-- php: //= count($recurringInvoice) -->
                                            </td>
                                            <td><!-- php: = $recurringInvoice->invoicing_recurring[$total_paid]->activity --></td>
                                            <!-- -->
                                            <!-- php: if (count($statusProtocols) > 0 ){ -->
                                            <td>
                                                <!-- <a href="javascript:" class="btn btn-sm btn-warning">Edit</a> -->
                                                <!-- <a href="<!-- php: //= $this->Url->build(['controller' => 'Invoicing', 'action' => 'edit',$recurringInvoice->invoicing->id]) -->" class="btn btn-warning btn-sm">Edit</a><br/> -->
                                                <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                                <!-- php: = $recurringInvoice->enabled == 0 ? $this->Form->postLink(__('Disable'), ['controller'=>'Invoicing','action'=>'toggleIsEnabledR',$recurringInvoice->id], ['class' => 'btn btn-secondary btn-sm']) : $this->Form->postLink(__('Disable'), ['contr... --><br />
                                                <!-- php: } -->



                                            </td>
                                            <!-- php: } -->
                                            <!-- -->

                                        </tr>
                                        <!-- php: } $x++; endforeach; -->
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </div>
                <div class="tab-pane" id="draft_invoice">
                    <div class="card  card-box">
                        <div class="card-body ">

                            <div class="table-responsive">

                                <table id="draft_table"
                                    class="table table-hover order-column full-width customDataTable">
                                    <thead>
                                        <tr>
                                            <th><span style="color:#f9ca24"
                                                    class="invoice-table-header-yellow py-2 px-3">Date</span></th>
                                            <th><span class="invoice-table-header-yellow py-2 px-3">Invoice#</span></th>
                                            <th><span class="invoice-table-header-yellow py-2 px-3">Payer Name</span>
                                            </th>
                                            <th>Status</th>
                                            <!-- <th><span class="invoice-table-header-green py-2 px-3">Due Date</span></th>
                                            <th><span class="invoice-table-header-green py-2 px-3">Amount</span></th> -->
                                            <th>Started By</th>
                                            <!-- php: = count($statusProtocols) > 0 ? '<th>Action</th>' : '' -->
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <!-- php: foreach($draftInvoices as $draftInvoice){ -->
                                        <tr>
                                            <td><!-- php: = $draftInvoice->invoice_date --></td>
                                            <td><a href="javascript:" data-toggle="modal"
                                                    data-target="#preview"><!-- php: = $draftInvoice->invoice_number --></a></td>
                                            <td><!-- php: = $draftInvoice->payer_name --></td>
                                            <td><small class="text-danger">Not Completed</small></td>
                                            <!-- <td><!-- php: //= $draftInvoice->due_date --></td>
                                           <td><a href="javascript:">$94.000</a></td> -->
                                            <td><!-- php: =$draftInvoice->started_by --></td>
                                            <!-- php: if (count($statusProtocols) > 0 ){ -->
                                            <td>
                                                <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                                <a href="<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'edit',$draftInvoice->id]) -->"
                                                    class="btn btn-warning btn-sm">Edit</a><br />
                                                <!-- <!-- php: //= $draftInvoice->enabled == 0 ? '<a class="btn btn-success text-slate-900 btn-sm">Enable</a>' : '<a class="btn btn-secondary text-slate-900 btn-sm">Disable</a>'; --><br/> -->
                                                <a href="<!-- php: = $this->Url->build(["controller" => "Invoicing","action" => "deleteInvoice",$draftInvoice->id]) -->"
                                                    class="btn btn-danger btn-sm">Remove</a><br />
                                                <!-- php: } -->
                                                <!-- <a class="btn btn-primary btn-sm">Record Payments</a> -->
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
<!-- <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script> -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
<!-- php: = $this->Html->script('../assets/plugins/moment/moment.min.js') -->
<!-- <script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script> -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.datetime.min.js') -->
<!-- php: foreach($paidInvoices as $paidInvoice): -->
<!-- preview -->
<div class="modal fade" id="paid_<!-- php: =$paidInvoice->id -->" tabindex="-1" aria-hidden="true">
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
                  <h4 style="background-color:#18ce0f !important;border-radius:10px;border:none;width:60px" class="text-center text-slate-900">Paid</h4>
                     <div class="container-fluid">
                        <div class="row">
                           <div class="col-md-6 p-2 text-left">
                              <p id="appr-address" style="margin-top:24px;">
                                 <!-- php: = $paidInvoice->address -->
                              </p>
                           </div>
                           <div class="col-md 6 p-2 text-right">
                              <h2 class="font-weight-bold mb-1">Invoice</h2>
                              <h5 class="font-weight-bold"># <!-- php: = $paidInvoice->invoice_number --></h5>
                              <h5 class="mt-3 font-weight-bold">Balance Due</h5>
                              <!-- <h5 class="font-weight-bold">$165.00</h5> -->
                           </div>
                        </div>
                        <div class="row mt-5">
                           <div class="col-md-8 p-2 text-left">
                              <h5>Bill To</h5>
                              <h5 class="font-weight-bold"><!-- php: = $paidInvoice->payer_name --></h5>
                              <h5><!-- php: = $paidInvoice->email_to --></h5>
                           </div>
                           <div class="col-md-4 p-2 text-right">
                              <div  class="container">
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 style="font-weight:bold">Invoice Date:</h5>
                                    </div>
                                    <div class="col-md-6 pr-0">
                                       <h5 style=""><!-- php: = $paidInvoice->invoice_date --></h5>
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
                                       <h5 style=""><!-- php: = $paidInvoice->due_date --></h5>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="firstline-table container-fluid mt-5 px-0 py-3">
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
                              <!-- php: foreach($paidInvoice->invoicing_items as $item): -->
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
<div class="modal fade" id="rmi_<!-- php: =$paidInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Report Money In For <!-- php: = $paidInvoice->invoicing->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: = $this->Form->create($addWriteOff, ['url' => ['controller' => 'Invoicing', 'action' => 'reconcile']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
              
               <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Select Account: </h5>
                     </div>
                     <div class="col-md-8">
                     <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cash category" name="category_id[]" id="category_id" data-live-search="true"  required>
											
											<!-- php: foreach($Accounts as $account) { -->
												<option data-content="<!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name --> <span class=<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'badge bg-danger'; } else { echo 'badge bg-secondary'; } -->><!-- php: = $account->transaction_code --></span>" value="<!-- php: = $account->id -->"><!-- php: = $account->account_name =="" ? $account->bank_name : $account->account_name --></option>
											<!-- php: } -->

										</SearchableSelectField>
                         <input type="hidden" name="invoicing_id" value="<!-- php: = $paidInvoice->id -->" />
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

<!-- php: foreach($writeOffInvoices as $writeOffInvoice){ -->
   <div class="modal fade" id="rmt_<!-- php: =$writeOffInvoice->id -->" tabindex="-1" aria-hidden="true">
       <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
           <div class="modal-content">
               <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                   <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                       <div class="d-flex align-items-center justify-content-between">
                           <h4 class="text-slate-900 my-0">Report Money In For
                               <!-- php: = $writeOffInvoice->invoicing->invoice_number --></h4>
                           <div>
                               <button data-dismiss="modal" aria-label="Close"
                                   class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                       class="fa fa-times text-primary"></i> </button>
                           </div>
                       </div>
                   </div>
                   <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Invoicing', 'action' => 'reportMoneyInWriteOff'], 'class' =>'reportMI']); -->
                   <div class="container bg-white p-2">
                       <div class="container-fluid">

                           <div class="row mt-4">
                               <div class="col-md-3">
                                   <h5>Select Account: </h5>
                               </div>
                               <div class="col-md-8">
                                   <input type="hidden" name="amount_p" value="<!-- php: = $writeOffInvoice->write_amount -->">
                                   <input type="hidden" name="invoice_id" value="<!-- php: = $writeOffInvoice->id -->">
                                   <!-- <SearchableSelectField required class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cash category" name="category_id" id="category_id" data-live-search="true"  required>
											 -->
                                   <!-- php: /* foreach($Accounts as $account) { if($account->accounts_tags[0]->attribute == "MONEY IN" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                                   <option data-content="<!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name --> <span class=<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else { echo 'badge bg-secondary'; } -->><!-- php: = $account->transaction_code --></span>" value="<!-- php: = $account->id -->">
                                       <!-- php: = $account->account_name =="" ? $account->bank_name : $account->account_name -->
                                   </option>
                                   <!-- php: }} */ -->

                                   <!-- </SearchableSelectField> -->

                                    <!-- php: $ko = 0; if(sizeof($Accounts) == 0){ -->
                                    <h5>Oops! No money in account is configured.<br/> Please create one at accounts section.</h5>
                                    <!-- php: } else { -->
                                   <!-- php: foreach($Accounts as $account) { -->
                                   <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                                   <div class="form-check">
                                       <input class="form-check-input" type="radio" name="category_id"
                                           id="category_id<!-- php: = $account->id -->" value="<!-- php: = $account->id -->">
                                       <label class="form-check-label" for="category_id<!-- php: = $account->id -->">
                                           <!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name -->

                                           <span class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else { echo 'badge bg-secondary'; } -->"><!-- php: = $account->transaction_code --></span>

                                       </label>
                                   </div>
                                   <!-- php: } else{ $ko++; } -->
                              <!-- php: }} -->
                              <!-- php: if($ko == sizeof($Accounts)){ -->
                                 <label class="text-secondary">Oops! No account has been configured. <br/>Please create one at accounts section.</label>
                              <!-- php: } -->
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                       <div class="d-flex align-items-center py-1 justify-content-end">
                       <!-- php: if($ko != sizeof($Accounts)){ -->
                           <button style="height:20px;width:auto;"
                               class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit
                               <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> </button>
                        <!-- php: } -->
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
<!-- php: } -->

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
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: = $this->Form->create($addWriteOff, ['url' => ['controller' => 'Invoicing', 'action' => 'writeOff']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
               <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Amount: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="text" value="<!-- php: = $pendingInvoice->balance_due -->"  name="write_amount" class="form-control" readonly>
                     </div>
                 </div>
                 <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Amount To Write Off: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="text" name="write_amount_pay" class="form-control">
                         <input type="hidden" name="invoicing_id" value="<!-- php: = $pendingInvoice->id -->" />
                     </div>
                 </div>
               <!-- <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Date: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="date" name="date" class="form-control">
                     </div>
                 </div> -->
                 <div class="row mb-3 mt-4">
                     <div class="col-md-3">
                         <h5>Reason: </h5>
                     </div>
                     <div class="col-md-8">
                         <SearchableSelectField name="reason" id="reason" class="form-control">
                             <option>Select Reason</option>
                             <option value="amount receiveable cannot be collected">Amount receiveable cannot be collected</option>
                             <option value="items are obsolete">Items are obsolete</option>
                         </SearchableSelectField>
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
<div class="modal fade" id="reconcile_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Reconcile <!-- php: = $pendingInvoice->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: = $this->Form->create($addWriteOff, ['url' => ['controller' => 'Invoicing', 'action' => 'reconcile']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
               <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Transaction ID: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="text" class="form-control"  name="reason" class="form-control" required />
                         <small class="text-danger">Ensure the transaction ID is the same from payer receipt</small>
                     </div>
                     
               </div>
               <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Amount: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="text" value="<!-- php: = $pendingInvoice->balance_due -->"  name="write_amount" class="form-control" readonly required>
                         <input type="hidden" name="invoicing_id" value="<!-- php: = $pendingInvoice->id -->" />
                     </div>
                 </div>
                 <!-- <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Amount To Reconcile: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="text" name="write_amount_pay" class="form-control">
                         <input type="hidden" name="invoicing_id" value="<!-- php: //= $pendingInvoice->id -->" />
                     </div>
                 </div> -->
                 <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Email: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="email" name="email" class="form-control" required/>
                     </div>
                 </div>
                 <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Mobile: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="text" name="mobile" class="form-control" required/>
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
<div class="modal fade" id="approve_invoice_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Approve Invoice #<!-- php: = $pendingInvoice->invoice_number --></h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i> </button>
                        </div>
                    </div>
                </div>
                <!-- php: = $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'approveSend']]); -->
                <div class="container bg-white p-2">
                    <div class="container-fluid">
                        <div class="row mb-3 mt-4">
                            <div class="col-md-4">
                                <h5>Send Options: </h5>
                            </div>
                            <div class="col-md-8">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendEmail"
                                        value="email" checked>
                                    <label class="form-check-label" for="sendEmail">Email</label>
                                    <!-- php: = '<br/><small class="text-secondary">'.$pendingInvoice->email_to.'</small>' -->
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" name="sendOptions[]" type="checkbox"
                                        id="sendWhatsapp" value="whatsapp">
                                    <label class="form-check-label" for="sendWhatsapp">Whatsapp</label>
                                    <!-- php: = '<br/><small class="text-secondary">'.$pendingInvoice->phone.'</small>' -->
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendSms"
                                        value="sms">
                                    <label class="form-check-label" for="sendSms">SMS</label>
                                    <!-- php: = '<br/><small class="text-secondary">'.$pendingInvoice->phone.'</small>' -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                    <div class="d-flex align-items-center py-1 justify-content-end">
                        <input type="hidden" name="invoice_id" value="<!-- php: = $pendingInvoice->id -->">
                        <button style="height:20px;width:auto;"
                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Approve
                            & Send &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
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

<!-- stand alone approve and send -->
<div class="modal fade" id="approve_send" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Approve Invoice  #</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: = $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'sendRecurring']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
                  <div class="row mb-3 mt-4">
                     <div class="col-md-4">
                        <h5>Send Options: </h5>
                     </div>
                     <div class="col-md-8">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendEmail" value="email" checked>
                           <label class="form-check-label" for="sendEmail">Email</label>
                           <!-- php: = '<br/><small class="text-secondary"></small>' -->
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendWhatsapp" value="whatsapp">
                           <label class="form-check-label" for="sendWhatsapp">Whatsapp</label>
                           <!-- php: = '<br/><small class="text-secondary"></small>' -->
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendSms" value="sms">
                           <label class="form-check-label" for="sendSms">SMS</label>
                           <!-- php: = '<br/><small class="text-secondary"></small>' -->
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <input type="hidden" name="invoice_id" value="">
                  <input type="hidden" name="parent_invoice" value="">
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Send  &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                  <!-- php: = $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- end of stand alone approve and send -->


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
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
            <!-- php: = $this->Form->create($recordPayment, ['url' => ['controller' => 'Invoicing', 'action' => 'recordPayment','type' => 'file']]); -->
               <div class="container-fluid">
               <div class="row mt-4">
                   <input type="hidden" name="invoice_id" value="<!-- php: =$pendingInvoice->id -->"/>
                            <div class="col-md-4 text-left">
                                <h5>Payer</h5>
                            </div>
                            <div class="col-md-8">
                               <input type="text" value="<!-- php: =$pendingInvoice->payer_name -->" class="form-control" required>
                               <input type="hidden" name="isRecurring" value="N0"/>
                            </div>
                        </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Amount to pay(<!-- php: = $pendingInvoice->currency -->)
                       </div>
                       <div class="col-md-8">
                           <input step='0.01' type="number" name="amount" readonly value="<!-- php: = $pendingInvoice->balance_due -->" class="form-control">
                       </div>
                   </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Amount Received(<!-- php: = $pendingInvoice->currency -->)
                       </div>
                       <div class="col-md-8">
                           <input step='0.01' max="<!-- php: = $pendingInvoice->balance_due -->" id="amount-received" <!-- php: = $pendingInvoice->partial == 0 ? 'readonly value="'.$pendingInvoice->balance_due.'"' : '' --> type="number" name="amount_paid" class="form-control" required>
                           <!-- php: = $pendingInvoice->partial != 0 ? '<span class="badge badge-primary">pp enabled</span>' : '' -->
                       </div>
                   </div>
                   <!-- php: //if($pendingInvoice->partial != 0){ -->
                     <!-- <div class="row mt-3">
                       <div class="col-md-4">
                           Charges
                       </div>
                       <div class="col-md-8">
                           <input type="number" step='0.01' id="charges" name="charges" class="form-control">
                          
                       </div>
                   </div> 
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Final Amount(<!-- php: = $pendingInvoice->currency -->)
                       </div>
                       <div class="col-md-8">
                           <input type="number" step='0.01' id="finalamount" name="amount_final" class="form-control">
                          
                       </div>
                   </div> -->
                   <!-- php: //} -->
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Payment Date
                       </div>
                       <div class="col-md-8">
                           <input type="date" name="payment_date" class="form-control" required/>
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
                           <input type="text" class="form-control" name="reference" required/>
                       </div>
                   </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Attachment
                       </div>
                       <div class="col-md-8">
 
                         <input name="invoicing_file" type="file" id="actual-btn"/>
                       
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

<!-- amount popup --> 
<div class="modal fade" id="pending_amount_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Summary for <!-- php: = $pendingInvoice->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
          
            <table id='pending_amt_<!-- php: =$pendingInvoice->id -->' class="table table-bordered mt-3 p-3 dataTable">
               <thead>
               <tr>
                   <th>Date</th>
                    <th>Amount</th>
                    <th>Amount Paid</th>
                    <th>Balance Left</th>
                    <th>Recorded By</th>
                </tr>
               </thead>
               <tbody>
                <!-- php: foreach($recordedInvoices as $r): -->
                    <!-- php: if($r->invoicing->id == $pendingInvoice->id){ -->
                     <tr>
                        <td><!-- php: = $r->payment_date --></td>
                        <td><!-- php: = $r->invoicing->total_amount --></td>
                        <td><!-- php: = $r->amount_paid --></td>
                        <td><!-- php: = $r->balance_due --></td>
                        <td><!-- php: = $r->recorded_by --></td>

                     </tr>
                     <!-- php: } -->
               <!-- php: endforeach; -->
               <!-- php: foreach($writeOffInvoices as $q): -->
                    <!-- php: if($q->invoicing->id == $pendingInvoice->id){ -->
                     <tr>
                        <td><!-- php: = $q->date->format('Y-m-d') --></td>
                        <td><!-- php: = $q->invoicing->total_amount -->
                     </td>
                        <td><!-- php: = $q->write_amount_pay -->&nbsp;<span class="badge badge-danger">Written Off</span><br/>
                        <small class="text-danger"><!-- php: = $q->reason --></small>
                     </td>
                        <td><!-- php: = $q->balance_due --></td>
                        <td><!-- php: = $q->recorded_by --></td>

                     </tr>
                     <!-- php: } -->
               <!-- php: endforeach; -->

               </tbody>
                
            </table>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <!-- <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record Payment</button> -->
                 
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="disable_pending_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-danger">
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Are you sure you want to disable Invoice: <!-- php: = $pendingInvoice->invoice_number --> ?</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <h4 class="text-secondary">Disabling Invoice: <!-- php: =$pendingInvoice->invoice_number --> will prevent you from receiving payments  </h4>
                </div>
            </div>
            <div class="container-fluid pr-0 bg-danger">
               <div class="d-flex align-items-center py-1 justify-content-end">
               <!-- php: = $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'toggleIsEnabled',$pendingInvoice->id]]); -->
                  
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Accept</button>
                  <!-- php: = $this->Form->end() -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="enable_pending_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-success">
            <div class="container-fluid pr-0 bg-success">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Are you sure you want to enable Invoice: <!-- php: = $pendingInvoice->invoice_number --> ?</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
                <div class="container my-2 p-3">
                   <h4 class="text-secondary">Enabling Invoice: <!-- php: =$pendingInvoice->invoice_number --> will make it eligible for receiving payments  </h4>
                </div>
            </div>
            <div class="container-fluid pr-0 bg-success">
               <div class="d-flex align-items-center py-1 justify-content-end">
               <!-- php: = $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'toggleIsEnabled',$pendingInvoice->id]]); -->
                  <button type="submit" style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Accept</button>
               <!-- php: = $this->Form->end() -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- preview -->
<div class="modal fade" id="pending_<!-- php: =$pendingInvoice->id -->" tabindex="-1" aria-hidden="true">
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

                        <div class="container mt-4 card p-3">



                            <!-- //border-bottom:2px solid #ef6575; -->
                            <div style="" class="row">
                                <div class="col-md-3" style="width: 25%; float: left; display: flex;">
                                    <center>
                                        <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: 100px; height: auto', 'fullBase' => true]) -->
                                    </center>
                                </div>

                                <div class="col-md-9">
                                    <div class="pull-left d-flex align-items-center" style="float: left">
                                        <address>
                                            <p class="text-muted m-l-5">
                                                <!-- php: = $this->Text->autoParagraph($inst_name->address) -->
                                            </p>
                                        </address>
                                    </div>
                                    <div class="pull-right d-flex align-items-center text-right">
                                        <address>
                                            <p class="text-muted m-l-30 mt-2">
                                                Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br>
                                                Email:
                                                <!-- php: = $inst_name->email1 --> <br> Alternate Email:
                                                <!-- php: = $inst_name->email2 -->
                                            </p>
                                        </address>
                                    </div>
                                </div>
                            </div>
                            <div class="row"
                                style="margin-top: 0px; padding-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-left: 5px; color: black; border-top: 3px solid #ef6575; border-bottom: 3px solid #ef6575; ">
                                <div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">
                                    <h4 align="center"
                                        style="line-height: 18px; padding-top: 10px; padding-bottom: 10px; margin: 0">
                                        INVOICE REPORT FOR #<!-- php: = $pendingInvoice->invoice_number --> </h4>
                                </div>
                            </div>

                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-6 p-2 text-left">

                                    </div>
                                    <div class="col-md 6 p-2 text-right">
                                        <!-- <h2 class="font-weight-bold mb-1">Invoice</h2> -->
                                        <!-- <h5 class="font-weight-bold"># <!-- php: //= $pendingInvoice->invoice_number --></h5> -->
                                        <!-- <h5 class="mt-3 font-weight-bold">Balance Due</h5>
                              <h5 class="font-weight-bold">$165.00</h5> -->
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-8 p-2 text-left">
                                        <h5>Bill To</h5>
                                        <h5 class="font-weight-bold"><!-- php: = $pendingInvoice->payer_name --></h5>
                                        <h5><!-- php: = $pendingInvoice->email_to --></h5>
                                        <h5> <!-- php: = $pendingInvoice->address --></h5>
                                        <div class="d-flex align-items-center">
                                            <h5>Status:
                                                &nbsp;<!-- php: = $pendingInvoice->status == 'approved' ? ' <h5 style=" border-radius:10px;border:none;width:90px" class="text-center bg-success text-slate-900 p-1">Approved</h5>' :'<h4 style=" border-radius:10px;border:none;width:80px" class="text-center bg-w... -->
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-4 p-2 text-right">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-6 text-left">
                                                    <h5 style="font-weight:bold">Invoice No.</h5>
                                                </div>
                                                <div class="col-md-6 pr-0"># <!-- php: = $pendingInvoice->invoice_number -->
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 text-left">
                                                    <h5 style="font-weight:bold">Invoice Date:</h5>
                                                </div>
                                                <div class="col-md-6 pr-0">
                                                    <h5 style=""><!-- php: = $pendingInvoice->invoice_date --></h5>
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
                                                    <h5 style=""><!-- php: = $pendingInvoice->due_date --></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="firstline-table container-fluid mt-5 px-0 py-3">
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
                                        <!-- php: $x=0; foreach($pendingInvoice->invoicing_items as $item): $x++; -->
                                        <tr>
                                            <td><!-- php: = $x --></td>
                                            <td><!-- php: = $item->item_name --></td>
                                            <td><!-- php: = $item->qty --></td>
                                            <td><!-- php: = $item->rate --></td>
                                            <td><!-- php: = $item->discount --></td>
                                            <td><!-- php: = $item->amount --></td>
                                        </tr>
                                        <!-- php: endforeach; -->
                                    </table>
                                    <div class="row mt-4">
                                        <div class="col-md-8 p-3">
                                            <p><!-- php: = $pendingInvoice->notes --></p>
                                        </div>
                                        <div class="col-md-4 p-3">
                                            <div class="row">
                                                <div class="col-md-6 text-left">
                                                    <h5 class="font-weight-bold">Sub Total</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <h5>
                                                        <!-- php: $sum = 0; foreach($pendingInvoice->invoicing_items as $item) { $sum = $sum + $item->amount; } echo $sum; -->
                                                    </h5>
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
                                                    <h5 class="font-weight-bold">Balance Due</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <h5 class="font-weight-bold"><!-- php: = $sum; --></h5>
                                                </div>
                                            </div>
                                            <div style="border-top:2px solid #ef6575; border-bottom: 2px solid #ef6575;"
                                                class="row">
                                                <div class="col-md-6 text-left">
                                                    <h5 class="font-weight-bold">Total</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <h5 class="font-weight-bold"><!-- php: = $sum; --></h5>
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

<script>
   $('#pending_amt_<!-- php: =$pendingInvoice->id -->').DataTable({
      "searching": false
   });
</script>
<!-- php: endforeach; -->


<!-- php: foreach($recurringInvoices as $recurringInvoice): -->
<div class="modal fade" id="approve_recurring_<!-- php: =$recurringInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Approve Invoice  #<!-- php: = $recurringInvoice->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: = $this->Form->create($approveSend, ['url' => ['controller' => 'Invoicing', 'action' => 'sendRecurring']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
                  <div class="row mb-3 mt-4">
                     <div class="col-md-4">
                        <h5>Send Options: </h5>
                     </div>
                     <div class="col-md-8">
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendEmail" value="email" checked>
                           <label class="form-check-label" for="sendEmail">Email</label>
                           <!-- php: = '<br/><small class="text-secondary">'.$recurringInvoice->invoicing->email_to.'</small>' -->
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendWhatsapp" value="whatsapp">
                           <label class="form-check-label" for="sendWhatsapp">Whatsapp</label>
                           <!-- php: = '<br/><small class="text-secondary">'.$recurringInvoice->invoicing->phone.'</small>' -->
                        </div>
                        <div class="form-check form-check-inline">
                           <input class="form-check-input" name="sendOptions[]" type="checkbox" id="sendSms" value="sms">
                           <label class="form-check-label" for="sendSms">SMS</label>
                           <!-- php: = '<br/><small class="text-secondary">'.$recurringInvoice->invoicing->phone.'</small>' -->
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <input type="hidden" name="invoice_id" value="<!-- php: = $recurringInvoice->id -->">
                  <input type="hidden" name="parent_invoice" value="<!-- php: = $recurringInvoice->invoicing_id -->">
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Send  &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button>
                  <!-- php: = $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="writeoff_recurring_<!-- php: =$recurringInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Write Off <!-- php: = $recurringInvoice->invoicing->invoice_number -->-<!-- php: = $recurringInvoice->occurence --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>

            <!-- php: = $this->Form->create($addWriteOff, ['url' => ['controller' => 'Invoicing', 'action' => 'writeOffRecurring']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
                  <div class="row mt-4">
                     <div class="col-md-3">
                        <h5>Amount: </h5>
                     </div>
                     <div class="col-md-8">
                        <input type="text" value="<!-- php: = $recurringInvoice->amount_balance -->"  name="write_amount" class="form-control" readonly>
                     </div>
                  </div>
                  <div class="row mt-4">
                     <div class="col-md-3">
                        <h5>Amount To Write Off: </h5>
                     </div>
                     <div class="col-md-8">
                        <input type="number" step="0.01" min="<!-- php: = $recurringInvoice->amount_balance -->" max="<!-- php: = $recurringInvoice->amount_balance -->" name="write_amount_pay" class="form-control">
                        <input type="hidden" name="invoicing_recurring_id" value="<!-- php: = $recurringInvoice->id -->" />
                     </div>
                  </div>
                  <!-- <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Date: </h5>
                     </div>
                     <div class="col-md-8">
                         <input type="date" name="date" class="form-control">
                     </div>
                     </div> -->
                  <div class="row mb-3 mt-4">
                     <div class="col-md-3">
                        <h5>Reason: </h5>
                     </div>
                     <div class="col-md-8">
                        <SearchableSelectField name="reason" id="reason" class="form-control">
                           <option>Select Reason</option>
                           <option value="amount receiveable cannot be collected">Amount receiveable cannot be collected</option>
                           <option value="items are obsolete">Items are obsolete</option>
                        </SearchableSelectField>
                     </div>
                  </div>
               </div>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">
                     Submit <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> 
                  </button>
                  <!-- php: = $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="modal fade" id="record_recurring_<!-- php: =$recurringInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Record Payment for <!-- php: = $recurringInvoice->invoicing->invoice_number --> - <!-- php: = $recurringInvoice->occurence --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
            <!-- php: = $this->Form->create($recordPayment, ['url' => ['controller' => 'Invoicing', 'action' => 'recordRecurringPayment']]); -->
               <div class="container-fluid">
               <div class="row mt-4">
                   <input type="hidden" name="invoice_id" value="<!-- php: =$recurringInvoice->id -->"/>
                   <input type="hidden" name="isRecurring" value="YES"/>

                            <div class="col-md-4 text-left">
                                <h5>Payer</h5>
                            </div>
                            <div class="col-md-8">
                               <input type="text" value="<!-- php: =$recurringInvoice->invoicing->payer_name -->" class="form-control">
                            </div>
                        </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Amount to pay(<!-- php: = $recurringInvoice->invoicing->currency -->)
                       </div>
                       <div class="col-md-8">
                           <input type="number" name="balance_due" readonly value="<!-- php: = $recurringInvoice->amount -->" class="form-control">
                       </div>
                   </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Amount Received(<!-- php: = $recurringInvoice->invoicing->currency -->)
                       </div>
                       <div class="col-md-8">
                           <input <!-- php: = $recurringInvoice->invoicing->partial == 0 ? 'readonly value="'.$recurringInvoice->amount.'"' : '' --> type="number" name="amount" class="form-control">
                           <!-- php: = $recurringInvoice->invoicing->partial != 0 ? '<span class="badge badge-primary">pp enabled</span>' : '' -->
                       </div>
                   </div>
                   <div class="row mt-3 d-none">
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
                           <input type="text" class="form-control">
                       </div>
                   </div>
                   <div class="row mt-3">
                       <div class="col-md-4">
                           Attachment
                       </div>
                       <div class="col-md-8">
 
                         <input name="invoicing_file" type="file" id="actual-btn" hidden/>
                         <label class="bxn" for="actual-btn">Choose File</label>
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
<!-- amount popup --> 
<div class="modal fade" id="recurring_amount_<!-- php: =$recurringInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Summary for <!-- php: = $recurringInvoice->invoicing->invoice_number -->-<!-- php: = $recurringInvoice->occurence --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
          
            <table class="table table-bordered mt-3 p-3">
                <tr>
                    <th>Date</th>
                    <th>Invoice Number</th>
                    <th>Recurring Amount</th>
                    <th>Amount</th>
                    <th>Balance Left</th>
                    <th>Recorded By</th>
                </tr>
                <!-- php: foreach($recurringInvoices as $r): -->
                    <!-- php: if($r->invoicing->id == $recurringInvoice->invoicing->id && $r->display==1){ -->
                        <tr>
                            <td><!-- php: = $r->date --></td>
                            <td><!-- php: = $r->invoicing->invoice_number -->-<!-- php: = $r->occurence --></td>
                            <td><!-- php: = $r->amount --></td>
                            <td><!-- php: = $r->invoicing->total_amount --></td>
                            <td><!-- php: = $r->balance_due --></td>
                            <td><!-- php: = $r->recorded_by --></td>
                        </tr>
                       
                    <!-- php: } -->
                <!-- php: endforeach; -->
            </table>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <!-- <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record Payment</button> -->
                 
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<div class="modal fade" id="recurring_preview_<!-- php: =$recurringInvoice->id -->" tabindex="-1" aria-hidden="true">
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
                  
                  <div class="container mt-4 card p-3">
                


   <!-- //border-bottom:2px solid #ef6575; -->
    <div style="" class="row">
        <div class="col-md-3" style="width: 25%; float: left; display: flex;">
            <center>
                <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: 100px; height: auto', 'fullBase' => true]) -->
            </center>
        </div>

        <div class="col-md-9">
            <div class="pull-left d-flex align-items-center" style="float: left">
                <address>
                    <p class="text-muted m-l-5">
                        <!-- php: = $this->Text->autoParagraph($inst_name->address) -->
                    </p>
                </address>
            </div>
            <div class="pull-right d-flex align-items-center text-right">
                <address>
                    <p class="text-muted m-l-30 mt-2">
                        Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email:
                        <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 -->
                    </p>
                </address>
            </div>
        </div>
    </div>
            <div class="row"
                style="margin-top: 0px; padding-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-left: 5px; color: black; border-top: 3px solid #ef6575; border-bottom: 3px solid #ef6575; ">
                <div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">
                    <h4 align="center" style="line-height: 18px; padding-top: 10px; padding-bottom: 10px; margin: 0">
                        INVOICE REPORT FOR #<!-- php: = $recurringInvoice->invoicing->invoice_number -->-<!-- php: = $recurringInvoice->occurence --> </h4>
                </div>
            </div>
                
                     <div class="container-fluid">
                        <div class="row">
                           <div class="col-md-6 p-2 text-left">
                            
                           </div>
                           <div class="col-md 6 p-2 text-right">
                              <!-- <h2 class="font-weight-bold mb-1">Invoice</h2> -->
                              <!-- <h5 class="font-weight-bold"># <!-- php: //= $pendingInvoice->invoice_number --></h5> -->
                              <!-- <h5 class="mt-3 font-weight-bold">Balance Due</h5>
                              <h5 class="font-weight-bold">$165.00</h5> -->
                           </div>
                        </div>
                        <div class="row mt-3">
                           <div class="col-md-8 p-2 text-left">
                              <h5>Bill To</h5>
                              <h5 class="font-weight-bold"><!-- php: = $recurringInvoice->invoicing->payer_name --></h5>
                              <h5><!-- php: = $recurringInvoice->invoicing->email_to --></h5>
                              <h5> <!-- php: = $recurringInvoice->invoicing->address --></h5>
                             <div class="d-flex align-items-center"> <h5>Status:   &nbsp;<!-- php: = $recurringInvoice->invoicing->status == 'approved' ? ' <h5 style=" border-radius:10px;border:none;width:90px" class="text-center bg-success text-slate-900 p-1">Approved</h5>' :'<h5 style=" border-radius:10px;border:none;width:80px" class="tex... --></h5></div>
                           </div>
                           <div class="col-md-4 p-2 text-right">
                              <div  class="container">
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                    <h5 style="font-weight:bold">Invoice No.</h5>
                                 </div>
                                    <div class="col-md-6 pr-0"># <!-- php: = $recurringInvoice->invoicing->invoice_number -->-<!-- php: = $recurringInvoice->occurence --></div>
                                 </div>
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 style="font-weight:bold">Invoice Date:</h5>
                                    </div>
                                    <div class="col-md-6 pr-0">
                                       <h5 style=""><!-- php: = $recurringInvoice->date --></h5>
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
                                       <h5 style=""><!-- php: = $recurringInvoice->invoicing->due_date --></h5>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="firstline-table container-fluid mt-5 px-0 py-3">
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
                              <!-- php: $x=0; foreach($recurringInvoice->invoicing->invoicing_items as $item): $x++; -->
                              <tr>
                                 <td><!-- php: = $x --></td>
                                 <td><!-- php: = $item->item_name --></td>
                                 <td><!-- php: = $item->qty --></td>
                                 <td><!-- php: = $item->rate --></td>
                                 <td><!-- php: = $item->discount == NULL ? 0 : $item->discount --></td>
                                 <td><!-- php: = $item->amount --></td>
                              </tr>
                              <!-- php: endforeach; -->
                           </table>
                           <div class="row mt-4">
                              <div class="col-md-8 p-3">
                                  <p><!-- php: = $recurringInvoice->invoicing->notes --></p>
                              </div>
                              <div class="col-md-4 p-3">
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 class="font-weight-bold">Sub Total</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5>
                                           <!-- php: $sum = 0; foreach($recurringInvoice->invoicing->invoicing_items as $item) { $sum = $sum + $item->amount; } echo $sum; -->
                                       </h5>
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
                                       <h5 class="font-weight-bold">Balance Due</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5 class="font-weight-bold"><!-- php: = $sum; --></h5>
                                    </div>
                                 </div>
                                 <div style="border-top:2px solid #ef6575; border-bottom: 2px solid #ef6575;" class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 class="font-weight-bold">Total</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5 class="font-weight-bold"><!-- php: = $sum; --></h5>
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
<!-- php: // if($recurringInvoice->display == 1){ -->
<div class="modal fade" id="recurring_preview_main_<!-- php: =$recurringInvoice->id -->" tabindex="-1" aria-hidden="true">
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
                  
                  <div class="container mt-4 card p-3">
                


   <!-- //border-bottom:2px solid #ef6575; -->
    <div style="" class="row">
        <div class="col-md-3"
            style="width: 25%; float: left; display: flex;">
            <center>
                <!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: 100px; height: auto', 'fullBase' => true]) -->
            </center>
        </div>

        <div class="col-md-9">
            <div class="pull-left d-flex align-items-center" style="float: left">
                <address>
                    <p class="text-muted m-l-5">
                        <!-- php: = $this->Text->autoParagraph($inst_name->address) -->
                    </p>
                </address>
            </div>
            <div class="pull-right d-flex align-items-center text-right">
                <address>
                    <p class="text-muted m-l-30 mt-2">
                        Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email:
                        <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 -->
                    </p>
                </address>
            </div>
            </div>
            </div>
            <div class="row"
                style="margin-top: 0px; padding-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-left: 5px; color: black; border-top: 3px solid #ef6575; border-bottom: 3px solid #ef6575; ">
                <div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">
                    <h4 align="center" style="line-height: 18px; padding-top: 10px; padding-bottom: 10px; margin: 0">
                        INVOICE REPORT FOR #<!-- php: = $recurringInvoice->invoicing->invoice_number --></h4>
                </div>
            </div>
                
                     <div class="container-fluid">
                        <div class="row">
                           <div class="col-md-6 p-2 text-left">
                            
                           </div>
                           <div class="col-md 6 p-2 text-right">
                              <!-- <h2 class="font-weight-bold mb-1">Invoice</h2> -->
                              <!-- <h5 class="font-weight-bold"># <!-- php: //= $pendingInvoice->invoice_number --></h5> -->
                              <!-- <h5 class="mt-3 font-weight-bold">Balance Due</h5>
                              <h5 class="font-weight-bold">$165.00</h5> -->
                           </div>
                        </div>
                        <div class="row mt-3">
                           <div class="col-md-8 p-2 text-left">
                              <h5>Bill To</h5>
                              <h5 class="font-weight-bold"><!-- php: = $recurringInvoice->invoicing->payer_name --></h5>
                              <h5><!-- php: = $recurringInvoice->invoicing->email_to --></h5>
                              <h5> <!-- php: = $recurringInvoice->invoicing->address --></h5>
                             <div class="d-flex align-items-center"> <h5>Status:   &nbsp;<!-- php: = $recurringInvoice->invoicing->status == 'approved' ? ' <h5 style=" border-radius:10px;border:none;width:90px" class="text-center bg-success text-slate-900 p-1">Approved</h5>' :'<h5 style=" border-radius:10px;border:none;width:80px" class="tex... --></h5></div>
                           </div>
                           <div class="col-md-4 p-2 text-right">
                              <div  class="container">
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                    <h5 style="font-weight:bold">Invoice No.</h5>
                                 </div>
                                    <div class="col-md-6 pr-0"># <!-- php: = $recurringInvoice->invoicing->invoice_number --></div>
                                 </div>
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 style="font-weight:bold">Invoice Date:</h5>
                                    </div>
                                    <div class="col-md-6 pr-0">
                                       <h5 style=""><!-- php: = $recurringInvoice->date --></h5>
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
                                       <h5 style=""><!-- php: = $recurringInvoice->invoicing->due_date --></h5>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="firstline-table container-fluid mt-5 px-0 py-3">
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
                              <!-- php: $x=0; foreach($recurringInvoice->invoicing->invoicing_items as $item): $x++; -->
                              <tr>
                                 <td><!-- php: = $x --></td>
                                 <td><!-- php: = $item->item_name --></td>
                                 <td><!-- php: = $item->qty --></td>
                                 <td><!-- php: = $item->rate --></td>
                                 <td><!-- php: = $item->discount == NULL ? 0 : $item->discount --></td>
                                 <td><!-- php: = $item->amount --></td>
                              </tr>
                              <!-- php: endforeach; -->
                           </table>
                           <div class="row mt-4">
                              <div class="col-md-8 p-3">
                                  <p><!-- php: = $recurringInvoice->invoicing->notes --></p>
                              </div>
                              <div class="col-md-4 p-3">
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 class="font-weight-bold">Sub Total</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5>
                                           <!-- php: $sum = 0; foreach($recurringInvoice->invoicing->invoicing_items as $item) { $sum = $sum + $item->amount; } echo $sum; -->
                                       </h5>
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
                                       <h5 class="font-weight-bold">Balance Due</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5 class="font-weight-bold"><!-- php: = $sum; --></h5>
                                    </div>
                                 </div>
                                 <div style="border-top:2px solid #ef6575; border-bottom: 2px solid #ef6575;" class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 class="font-weight-bold">Total</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5 class="font-weight-bold"><!-- php: = $sum; --></h5>
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
<div class="modal fade" id="rmr_<!-- php: =$recurringInvoice->id -->" tabindex="-1" aria-hidden="true">
       <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
           <div class="modal-content">
               <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                   <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                       <div class="d-flex align-items-center justify-content-between">
                           <h4 class="text-slate-900 my-0">Report Money In For
                               <!-- php: = $recurringInvoice->invoicing->invoice_number --></h4>
                           <div>
                               <button data-dismiss="modal" aria-label="Close"
                                   class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                       class="fa fa-times text-primary"></i> </button>
                           </div>
                       </div>
                   </div>
                   <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Invoicing', 'action' => 'reportMoneyInRecurring'], 'class' =>'reportMI']); -->
                   <div class="container bg-white p-2">
                       <div class="container-fluid">

                           <div class="row mt-4">
                               <div class="col-md-3">
                                   <h5>Select Account: </h5>
                               </div>
                               <div class="col-md-8">
                                   <input type="hidden" name="amount_p" value="<!-- php: = $recurringInvoice->amount -->">
                                   <input type="hidden" name="invoice_id" value="<!-- php: = $recurringInvoice->id -->">
                                   <!-- <SearchableSelectField required class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cash category" name="category_id" id="category_id" data-live-search="true"  required>
											 -->
                                   <!-- php: /* foreach($Accounts as $account) { if($account->accounts_tags[0]->attribute == "MONEY IN" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                                   <option data-content="<!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name --> <span class=<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else { echo 'badge bg-secondary'; } -->><!-- php: = $account->transaction_code --></span>" value="<!-- php: = $account->id -->">
                                       <!-- php: = $account->account_name =="" ? $account->bank_name : $account->account_name -->
                                   </option>
                                   <!-- php: }} */ -->

                                   <!-- </SearchableSelectField> -->


                                   <!-- php: foreach($Accounts as $account) { -->
                                   <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                                   <div class="form-check">
                                       <input class="form-check-input" type="radio" name="category_id"
                                           id="category_id<!-- php: = $account->id -->" value="<!-- php: = $account->id -->">
                                       <label class="form-check-label" for="category_id<!-- php: = $account->id -->">
                                           <!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name -->

                                           <span class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else { echo 'badge bg-secondary'; } -->"><!-- php: = $account->transaction_code --></span>

                                       </label>
                                   </div>
                                   <!-- php: } -->
                                   <!-- php: } -->
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
<!-- php: //} -->
<!-- php: endforeach; -->

<!-- php: foreach($recordedInvoices as $recordedInvoice): -->
   <div class="modal fade" id="rmd_<!-- php: =$recordedInvoice->id -->" tabindex="-1" aria-hidden="true">
       <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
           <div class="modal-content">
               <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
                   <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
                       <div class="d-flex align-items-center justify-content-between">
                           <h4 class="text-slate-900 my-0">Report Money In For
                               <!-- php: = $recordedInvoice->invoicing->invoice_number --></h4>
                           <div>
                               <button data-dismiss="modal" aria-label="Close"
                                   class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                       class="fa fa-times text-primary"></i> </button>
                           </div>
                       </div>
                   </div>
                   <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Invoicing', 'action' => 'reportMoneyInPaid'], 'class' =>'reportMI']); -->
                   <div class="container bg-white p-2">
                       <div class="container-fluid">

                           <div class="row mt-4">
                               <div class="col-md-3">
                                   <h5>Select Account: </h5>
                               </div>
                               <div class="col-md-8">
                                   <input type="hidden" name="amount_p" value="<!-- php: = $recordedInvoice->amount -->">
                                   <input type="hidden" name="invoice_id" value="<!-- php: = $recordedInvoice->id -->">
                                   <!-- <SearchableSelectField required class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cash category" name="category_id" id="category_id" data-live-search="true"  required>
											 -->
                                   <!-- php: /* foreach($Accounts as $account) { if($account->accounts_tags[0]->attribute == "MONEY IN" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                                   <option data-content="<!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name --> <span class=<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else { echo 'badge bg-secondary'; } -->><!-- php: = $account->transaction_code --></span>" value="<!-- php: = $account->id -->">
                                       <!-- php: = $account->account_name =="" ? $account->bank_name : $account->account_name -->
                                   </option>
                                   <!-- php: }} */ -->

                                   <!-- </SearchableSelectField> -->


                                   <!-- php: foreach($Accounts as $account) { -->
                                   <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                                   <div class="form-check">
                                       <input class="form-check-input" type="radio" name="category_id"
                                           id="category_id<!-- php: = $account->id -->" value="<!-- php: = $account->id -->">
                                       <label class="form-check-label" for="category_id<!-- php: = $account->id -->">
                                           <!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name -->

                                           <span class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else { echo 'badge bg-secondary'; } -->"><!-- php: = $account->transaction_code --></span>

                                       </label><br/>
                                       <small class="text-danger"><!-- php: = sizeof($account->accounts_compliance_checks) < 1 ? 'Account does not have compliance checks': '' --></small>
                                   </div>
                                   <!-- php: } -->
                                   <!-- php: } -->


                                   <input type="hidden" name="invoicing_id" value="<!-- php: = $recordedInvoice->id -->" />
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
   <div class="modal fade" id="wpaid_<!-- php: =$recordedInvoice->invoicing->id -->" tabindex="-1" aria-hidden="true">
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
                  <h4 style="background-color:#18ce0f !important;border-radius:10px;border:none;width:60px" class="text-center text-slate-900">Paid</h4>
                     <div class="container-fluid">
                        <div class="row">
                           <div class="col-md-6 p-2 text-left">
                              <p id="appr-address" style="margin-top:24px;">
                                 <!-- php: = $recordedInvoice->invoicing->idaddress -->
                              </p>
                           </div>
                           <div class="col-md 6 p-2 text-right">
                              <h2 class="font-weight-bold mb-1">Invoice</h2>
                              <h5 class="font-weight-bold"># <!-- php: = $recordedInvoice->invoicing->idinvoice_number --></h5>
                              <h5 class="mt-3 font-weight-bold">Balance Due</h5>
                              <!-- <h5 class="font-weight-bold">$165.00</h5> -->
                           </div>
                        </div>
                        <div class="row mt-5">
                           <div class="col-md-8 p-2 text-left">
                              <h5>Bill To</h5>
                              <h5 class="font-weight-bold"><!-- php: = $recordedInvoice->invoicing->idpayer_name --></h5>
                              <h5><!-- php: = $recordedInvoice->invoicing->idemail_to --></h5>
                           </div>
                           <div class="col-md-4 p-2 text-right">
                              <div  class="container">
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 style="font-weight:bold">Invoice Date:</h5>
                                    </div>
                                    <div class="col-md-6 pr-0">
                                       <h5 style=""><!-- php: = $recordedInvoice->invoicing->idinvoice_date --></h5>
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
                                       <h5 style=""><!-- php: = $recordedInvoice->invoicing->iddue_date --></h5>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="firstline-table container-fluid mt-5 px-0 py-3">
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
                              <!-- php: foreach($recordedInvoice->invoicing->invoicing_items as $item): -->
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
                                       <h5><!-- php: = $recordedInvoice->amount --></h5>
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
                                       <h5 class="font-weight-bold">Total</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5 class="font-weight-bold"><!-- php: = $recordedInvoice->amount --></h5>
                                    </div>
                                 </div>
                                 <div class="row">
                                    <div class="col-md-6 text-left">
                                       <h5 class="font-weight-bold">Balance Due</h5>
                                    </div>
                                    <div class="col-md-6">
                                       <h5 class="font-weight-bold"><!-- php: = $recordedInvoice->balance_due --></h5>
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
<div class="modal fade" id="paid_breakdown_<!-- php: =$recordedInvoice->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Summary for <!-- php: = $recordedInvoice->invoicing->invoice_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
          
            <table id='paid_amt_<!-- php: =$recordedInvoice->id -->' class="table table-bordered mt-3 p-3">
               <thead>
               <tr>
                   <th>Date</th>
                    <th>Amount</th>
                    <th>Amount Paid</th>
                    <th>Balance Left</th>
                    <th>Recorded By</th>
                </tr>
               </thead>
               <tbody>
                <!-- php: // foreach($recordedInvoices as $r): -->
                    <!-- php: // if($r->invoicing->id == $recordedInvoice->id){ -->
                     <!-- <tr>
                        <td><!-- php: //= $r->payment_date --></td>
                        <td><!-- php: //= $r->invoicing->total_amount --></td>
                        <td><!-- php: //= $r->amount_paid --></td>
                        <td><!-- php: //= $r->balance_due --></td>
                        <td><!-- php: //= $r->recorded_by --></td>

                     </tr> -->
                     <!-- php: // } -->
               <!-- php: // endforeach; -->
               <!-- php: // foreach($writeOffInvoices as $q): -->
                    <!-- php: // if($q->invoicing->id == $recordedInvoice->id){ -->
                     <!-- <tr>
                        <td><!-- php: //= $q->date->format('Y-m-d') --></td>
                        <td><!-- php: //= $q->invoicing->total_amount -->
                     </td>
                        <td><!-- php: //= $q->write_amount_pay -->&nbsp;<span class="badge badge-danger">Written Off</span><br/>
                        <small class="text-danger"><!-- php: //= $q->reason --></small>
                     </td>
                        <td><!-- php: //= $q->balance_due --></td>
                        <td><!-- php: //= $q->recorded_by --></td>

                     </tr> -->
                     <!-- php: //} -->
               <!-- php: // endforeach; -->

               </tbody>
                
            </table>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <!-- <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Record Payment</button> -->
                 
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- php: endforeach; -->
<!-- end page content -->

<script>
// $('.reportMI').on('submit', function(e){
  
//   if(confirm('Are you sure you want to approve pay-in invoice ?')){
//    $(this).submit();
//   }else{
//    e.preventDefault();
//   }
  
  
// });

   $(document).ready(function(){
    var minDate, maxDate;
		var minDate2, maxDate2;
		var minDate3, maxDate3;
		var minDate4, maxDate4;
 
      // Custom filtering function which will search data in column four between two values
      $.fn.dataTable.ext.search.push(
         function( settings, data, dataIndex ) {
            var min = minDate.val();
            var max = maxDate.val();
            var min2 = minDate2.val();
            var max2 = maxDate2.val();
            var min3 = minDate3.val();
            var max3 = maxDate3.val();
            //  var min4 = minDate4.val();
            //  var max4 = maxDate4.val();
            

            var date = new Date(data[0]);
            switch (settings.nTable.id)
            {
               case "pending_table":
                  min = minDate.val();
               max = maxDate.val();
               if (
               ( min === null && max === null ) ||
               ( min === null && date <= max ) ||
               ( min <= date   && max === null ) ||
               ( min <= date   && date <= max ) 
            ) {
               return true;
            } 
            break;
            case "paid_table":
               min = minDate2.val();
               max = maxDate2.val();
               if (
               ( min === null && max === null ) ||
               ( min === null && date <= max ) ||
               ( min <= date   && max === null ) ||
               ( min <= date   && date <= max ) 
            ) {
               return true;
            } 
            break;
            case "recurring_table":
               min = minDate3.val();
               max = maxDate3.val();
               if (
               ( min === null && max === null ) ||
               ( min === null && date <= max ) ||
               ( min <= date   && max === null ) ||
               ( min <= date   && date <= max ) 
            ) {
               return true;
            } 
            break;
            case "draft_table":
               min = minDate4.val();
               max = maxDate4.val();
               if (
               ( min === null && max === null ) ||
               ( min === null && date <= max ) ||
               ( min <= date   && max === null ) ||
               ( min <= date   && date <= max ) 
            ) {
               return true;
            } 
            break;
            //  case "doctable4":
            // 	min = minDate4.val();
            // 	 max = maxDate4.val();
            // 	if (
            // 	 ( min === null && max === null ) ||
            // 	 ( min === null && date <= max ) ||
            // 	 ( min <= date   && max === null ) ||
            // 	 ( min <= date   && date <= max ) 
            //  ) {
            // 	 return true;
            //  } 
            //  break;

            
               
      
            
            //   if (
            // 	 ( min2 === null && max2 === null ) ||
            // 	 ( min2 === null && date <= max2 ) ||
            // 	 ( min2 <= date   && max2 === null ) ||
            // 	 ( min2 <= date   && date <= max2 ) 
            //  ) {
            // 	 return true;
            //  } 
            
            return false;
         }
         }
      );
 

 
            // Create date inputs
            minDate = new DateTime($('#start1'), {
            format: 'MMMM Do YYYY'
         });
         maxDate = new DateTime($('#end1'), {
            format: 'MMMM Do YYYY'
         });

         minDate2 = new DateTime($('#start2'), {
            format: 'MMMM Do YYYY'
         });
         maxDate2 = new DateTime($('#end2'), {
            format: 'MMMM Do YYYY'
         });

         minDate3 = new DateTime($('#start3'), {
            format: 'MMMM Do YYYY'
         });
         maxDate3 = new DateTime($('#end3'), {
            format: 'MMMM Do YYYY'
         });

         // minDate4 = new DateTime($('#min4'), {
         //     format: 'MMMM Do YYYY'
         // });
         // maxDate4 = new DateTime($('#max4'), {
         //     format: 'MMMM Do YYYY'
         // });
         // DataTables initialisation
         //var table = $('#pending_table').DataTable();
         // var table2 = $('#doctable2').DataTable();
         var table = $('#pending_table').DataTable();
         var table3 = $('#recurring_table').DataTable();
         var table2 = $('#paid_table').DataTable();
      
         
      $('#status-filter').on('change', function(){
         table.search(this.value).draw();   
      });
      $('#pendingBtn').on('click', function () {
            table.draw();
         });
         $('#paidBtn').on('click', function () {
            table2.draw();
         });
         $('#recurringBtn').on('click', function () {
            table3.draw();
         });
         // $('#resetBtn').on('click', function () {
         //     table.destroy();
         //     table.draw();
         // });
   });

   var t  = 0;
   var appr_items = [];

   function solveForTotal(counter) {
      let sum = 0
      for (let index = 2; index <= counter; index++) {
         sum += Number($('#amount_'+index).val())
      }
      console.log("ghana web", counter, sum)
      $('#sub-total').val(sum.toFixed(2));
      $('#amount').val(sum.toFixed(2));
      $('#totall').val(sum.toFixed(2));

      $('#appr-sub-total').html(sum.toFixed(2));
      $('#appr-total').html(sum.toFixed(2));
      
   }

      $(function () {
         $("#specialty").submit(function () {
            return confirm('Are you sure you want to submit ?');
            // return true;
         });

         var counter = 1;
         var total = [];
         
         $('#add_more_button').on('click', function() {
            // if(t == 1)
            // {
            //    return false;
            // }
            // else {
            //    t++;
            // }
               counter ++

               $('<tr id="name_'+ counter +'"><td><input type="text" placeholder="Enter Item Name" name="item_name[]" id="item-name_'+ counter +'" onchange="getName(this.value, '+counter+')" class=" my-0 form-control" /></td><td><input type="number" onchange="getQuantity(this.value, '+counter+')" placeholder="Qty" name="qty[]" id="qty_'+ counter +'" class="form-control" /></td><td><input type="number" onchange="getAmount(this.value, '+counter+')" placeholder="Unit Cost" name="rate[]" id="rate_'+ counter +'" class="form-control" /></td><td><input type="number" onchange="getDiscount(this.value, '+counter+')" placeholder="Discount (%)" name="discount[]" value="0" id="discount_'+ counter +'" class="form-control my-0 discount" /></td><td style="position:relative;"> <input type="number" readonly placeholder="Amount" name="amount[]" id="amount_'+ counter +'" class="form-control" /><span style="position:absolute; top:20px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body");
               // $('<div id="price_'+ counter +'"><input type="number" name="code[]" id="code"  placeholder="Code" class="form-control input-height" required/><br></div>').appendTo("#mdc_code_div");
               // $('<div id="code_'+ counter +'"><input type="number" name="tariff[]" id="code"  placeholder="Tariff" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#mdc_tariff_div");
               $('#next2').removeAttr("disabled");
               items_object[counter] = {name: "", qty: 0,cost: 0,discount: 0,amount: 0};

               console.log(items_object);
      
            
               $('#qty_'+ counter).on('change', function(){
                  var qty = Number($('#qty_'+counter).val());
                  var amt = $('#amount_'+counter).val();
                  var dis = Number($('#discount_'+counter).val())/100;
                  var cost = Number($('#rate_'+counter).val());
                  var amt = qty * cost;
                  var formula = amt - (amt * dis);
                  $('#amount_'+counter).val(formula.toFixed(2));
                  total.push(formula.toFixed(2));
                  
                  //    console.log(total);
                  solveForTotal(counter)
               
                  // var sum = 0;
                  // for(let i = 0;i<total.length;i++)
                  // {
                  //    sum+=Number(total[i]);
                  // }
                  // //  console.log(sum);
                  // // subtract after taking out
                  // console.log(sum);
                  // $('#sub-total').html(sum.toFixed(2));
                  // $('#amount').val(sum.toFixed(2));
                  // $('#totall').html(sum.toFixed(2));

                  // $('#appr-sub-total').html(sum.toFixed(2));
                  // $('#appr-total').html(sum.toFixed(2));
               });
      
            
               $('#discount_'+ counter).on('change', function(){
                  var qty = Number($('#qty_'+counter).val());
                  var amt = $('#amount_'+counter).val();
                  var dis = Number($('#discount_'+counter).val())/100;
                  var cost = Number($('#rate_'+counter).val());
                  var amt = qty * cost;
                  var formula = amt - (amt * dis);
                  $('#amount_'+counter).val(formula.toFixed(2));
                  total.push(formula.toFixed(2));
                  
                  //    console.log(total);
                  solveForTotal(counter)
               
                  // var sum = 0;
                  // for(let i = 0;i<total.length;i++)
                  // {
                  //    sum+=Number(total[i]);
                  // }
                  // //  console.log(sum);
                  // // subtract after taking out
                  // console.log(sum);
                  // $('#sub-total').html(sum.toFixed(2));
                  // $('#amount').val(sum.toFixed(2));
                  // $('#totall').html(sum.toFixed(2));

                  // $('#appr-sub-total').html(sum.toFixed(2));
                  // $('#appr-total').html(sum.toFixed(2));
               });


               $('#rate_'+ counter).on('change', function(){
                  t  = 0;
                  if($('#discount').val() > 0)
                  {
                  var qty = Number($('#qty_'+counter).val());
                  var amt = $('#amount_'+counter).val();
                  var dis = Number($('#discount_'+counter).val())/100;
                  var cost = Number($('#rate_'+counter).val());
                  var amt = qty * cost;
                  var formula = amt - (amt * dis);
                  appr_items.push({
                     'id': counter,
                     'name': $('#item-name_'+counter).val(),
                     'quantity': qty,
                     'amount' : amt,
                     'discount' : dis == undefined ? 0 : dis,
                     'cost' : cost,
                     'calculated' : formula.toFixed(2)
                  });

                  }
                  else {
                     var qty = Number($('#qty_'+counter).val());
                  var amt = $('#amount_'+counter).val();
                  // var dis = Number($(this).val())/100;
                  var cost = Number($('#rate_'+counter).val());
                  var amt = qty * cost;
                  var formula = amt;
                  appr_items.push({
                     'id': counter,
                     'name': $('#item-name_'+counter).val(),
                     'quantity': qty,
                     'amount' : amt,
                     'discount' : dis == undefined ? 0 : dis,
                     'cost' : cost,
                     'calculated' : formula.toFixed(2)
                  });
                     
                  }
                  
                  $('#amount_'+counter).val(formula.toFixed(2));
                  solveForTotal(counter)
                  total.push(formula.toFixed(2));
                  //    console.log(total);
                     console.log(appr_items);
               
                  // var sum = 0;
                  // for(let i = 0;i<total.length;i++)
                  // {
                  //    sum+=Number(total[i]);
                  // }
                  // //  console.log(sum);
                  // // subtract after taking out
                  // console.log(sum);
                  // if(sum == 0)
                  // {
                  //    $('#next2').attr("disabled",true);
                  // }
                  // $('#sub-total').html(sum.toFixed(2));
                  // $('#amount').val(sum.toFixed(2));
                  // $('#totall').html(sum.toFixed(2));

                  // $('#appr-sub-total').html(sum.toFixed(2));
                  // $('#appr-total').html(sum.toFixed(2));

                  console.log("it came here for me", appr_items);
                  $('#appr_items_table').html('')
                  appr_items.forEach(items => {
                     
                     if (items.id) {
                        if ($('#' + items.id).length) {
                              $('#' + items.id).append('<a href=# class=list-group-item>' + items.name + '</a>');
                        } else {
                           $('#appr_items_table').append('<tr><td></td><td>'+items.name+'</td><td>'+items.quantity+'</td><td>'+items.cost+'</td><td>'+items.discount+'</td><td>'+items.amount+'</td></tr>');
                        }
                     } else { //list priv (no parent)
                        $('#appr_items_table').append('<tr><td></td><td>'+items.name+'</td><td>'+items.quantity+'</td><td>'+items.cost+'</td><td>'+items.discount+'</td><td>'+items.amount+'</td></tr>');
                     }
                  });

               });
               
         });
    });

    function removeExtraFields(counter, id){
      //  t = 0;
      //   var deduct = parseInt($('#sub-total').html())-$('#amount_'+counter).val();
      //   if(deduct == 0)
      //  {
      //    $('#next2').attr("disabled",true);
      //  }
      //   $('#sub-total').html(deduct);
      //   $('#totall').html(deduct);
      //   $('#amount').val(deduct);
        $('#name_' + counter).remove();
        $('#price_' + counter).remove();
        $('#code_' + counter).remove();
        delete items_object[counter];

        calculateItems();

    }

      // const removeItem = (items, id) => {
      //    delete items[1];
      //    return items;
      // };
   $(document).ready(function(){

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

});

today = moment(new Date()).format("YYYY-MM-DD");
$('#invoice-date').val(today);
$('#recur-start').val(today);

// $('#gear').on('click', function(){
//    $('#invoice-number').val('INV-'+Math.floor(100000 + Math.random() * 900000));
// });

$('#terms').on('change', function(){
    var value = $('#terms').val();
    console.log(typeof value);
if(value !== "end-of-month" || value !== "end-of-next-month")
{ 
    var due = new Date();
    var new_date = moment(due, "DD-MM-YYYY").add(value, 'days').format('YYYY-MM-DD');
        $('#due-date').val(new_date);
}
else if(value == 'end-of-month')
{
    var end = moment().format("YYYY-MM-") + moment().daysInMonth();
  $('#due-date').val(end);
}

});

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

//for approval display
$('#payer_name').on('change', function(){
   $('#appr-name').html($('#payer_name').val());
});
// $('#invoice-number').on('change', function(){
   $('#appr-invoice-num').html($('#invoice-number').val());
   $('#appr-invoice-num2').html($('#invoice-number').val());
// });
$('#address').on('change', function(){
   $('#appr-address').html($('#address').val());
});
// $('#invoice-date').on('change', function(){
   $('#appr-date').html($('#invoice-date').val());
   $('#appr-date2').html($('#invoice-date').val());
// });
$('#terms').on('change', function(){
   $('#appr-due-date').html($('#due-date').val());
   $('#appr-due-date2').html($('#due-date').val());
});
$('#email-to').on('change', function(){
   $('#appr-email').html($('#email-to').val());
});

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
$('#next2').attr("disabled",true);
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

    $('#payer_type').on('change', function(){
     if($(this).val() == 'custom')
     {
      $('#payer_name')
    .replaceWith('<input type="text" name="payer_name" class="form-control" placeholder="Enter Custom Name"/>');
     }
     else {
   //    $('#payer_name')
   //  .replaceWith('<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payer_name" id="payer_name" title="Select Payer Name"  data-live-search="true" required> </SearchableSelectField>');
      
      $.ajax({
           type:"POST",
           data: {value:$('#payer_type').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'Invoicing', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#payer_name').html(html);
               $('#payer_name').selectpicker("refresh");
           },
           error: function(){
               alert('false');
           }

       });
     }
    });
    $('#payer_type2').on('change', function(){
       $.ajax({
           type:"POST",
           data: {value:$('#payer_type2').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'Invoicing', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#payer_name2').html(html);
               $('#payer_name2').selectpicker("refresh");
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

$('#add-tax').on('change', function(){
   console.log("it tried to come here")
   var amt = Number($('#sub-total').html());
   var dis = Number($('#add-discount').val())/100;
   var tax = Number($('#add-tax').val())/100;
   var formula = amt
   formula -= (amt * dis);
   formula += (amt * tax);
   console.log("it tried to come here", formula)
  $('#amount').val(formula);
  $('#totall').html(formula.toFixed(2));
  // tax = subtotal * tax/100

});
$('#add-discount').on('change', function(){
   console.log("it tried to come here")
   var amt = Number($('#sub-total').html());
   var dis = Number($('#add-discount').val())/100;
   var tax = Number($('#add-tax').val())/100;
   var formula = amt
   formula -= (amt * dis);
   formula += (amt * tax);
   console.log("it tried to come here", formula)

  $('#amount').val(formula);
  $('#totall').html(formula.toFixed(2));
  // tax = subtotal * tax/100

});

// const actualBtn = document.getElementById('actual-btn');

// const fileChosen = document.getElementById('file-chosen');

// actualBtn.addEventListener('change', function(){
//   fileChosen.textContent = this.files[0].name
// })
$(".validate-recurr").on("change", function(e){
   // if($(this).is(":checked")){
      
   // }
   e.preventDefault();
   $.ajax({
      url: "<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'validateRecurring']) -->",
      type: "POST",
      data: $("#msform").serialize(),
      beforeSend: function(){
         $("#indication").text("Processing..");
      },
      success: function(res){
         console.log(res);
         $("#indication").text(res.message);
         $("#recur_amt").val(res.amount);
         $("#ramot").removeClass("d-none");

      },
      error: function(err){
         $("#indication").text("Error Calculating");
      }
   });
});

   $(document).ready(function() {      			
		
		// save tab in local storage
		$('#invoicingTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('invoicingLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var invoicingLastTab = localStorage.getItem('invoicingLastTab');
		if (invoicingLastTab) {
		   $('#invoicingTabs a[href=' + invoicingLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#invoicingTabs a[data-toggle="tab"]:first').tab('show');
		}
	});

   // function getName(){

   // }

   var items_object = {};
   var total_items = {
      subtotal: 0,
      discount: 0,
      tax: 0,
      final_total: 0
   };

   function getName(val, id){
     

      items_object[id].name = val;
      console.log(items_object);
   }
   function getQuantity(val, id){
    
      // var id = 1;
      items_object[id].qty = val;
      items_object[id].amount = (items_object[id].cost * items_object[id].qty);
      $('#amount_'+ id).val(items_object[id].amount);

      console.log(items_object[id]);
      calculateItems();

      // console.log(items_object);
   }

   function getAmount(val, id){
      // console.log(val);
      items_object[id].cost = val;
      items_object[id].amount = (val * items_object[id].qty);

      $('#amount_'+ id).val(items_object[id].amount);
      calculateItems();
   }

   function getDiscount(val, id){
      // alert(val);
      calculateItems();
      items_object[id].amount = (items_object[id].cost * items_object[id].qty);
      var dis = Number(val)/100;
      var amt = items_object[id].amount;
      var formula = amt - (amt * dis);

      items_object[id].amount = formula;
      items_object[id].discount = val;
      $('#amount_'+ id).val(items_object[id].amount);
    
      
   }

   function getTotalDiscount(val){}


   // function getTotalDiscount(val){
   //    // alert(val);

   //    var dis = Number(val)/100;
   //    // var amt = items_object[id].amount;
   //    //    total_items = {
   //    //    subtotal: 0,
   //    //    discount: 0,
   //    //    tax: 0,
   //    //    final_total: 0
   //    // };
      
   //    for (const key in items_object) {
   //       console.log(items_object[key].amount);
   //       ttl_amt = ttl_amt + items_object[key].amount;
   //    }

   //    var formula = ttl_amt - (ttl_amt * dis);
     

   //    $('#sub-total').html(ttl_amt.toFixed(2));
   //    $('#amount').val(ttl_amt.toFixed(2));
   //    $("#totall").html(ttl_amt.toFixed(2));

   //    // items_object[id].amount = formula;
   //    // items_object[id].discount = val;
   //    // $('#amount_'+ id).val(items_object[id].amount);
   //    // calculateItems();
   // }

   function getTotalTax(val){

   }

   function addItem(id, name, quantity, unit_cost, disc, amt){
      items_object[id] = {name: name, qty: quantity,cost: unit_cost,discount: disc,amount: amt};

      console.log(items_object);
   }

   function calculateItems(){
      var ttl_amt = 0;
     
      // total_items

      // for (const key in items_object) {
      //    console.log(items_object[key].amount);
      //    ttl_amt = ttl_amt + items_object[key].amount;
      // }
      
      // calculate discount
      var valu = $("#add-discount").val();
      var dis = Number(valu)/100;
      // var amt = items_object[id].amount;
      //    total_items = {
      //    subtotal: 0,
      //    discount: 0,
      //    tax: 0,
      //    final_total: 0
      // };
      
      for (const key in items_object) {
         console.log(items_object[key].amount);
         ttl_amt = ttl_amt + items_object[key].amount;
      }

      var formula = ttl_amt - (ttl_amt * dis);
     

      // $('#sub-total').html(ttl_amt.toFixed(2));
      // $('#amount').val(ttl_amt.toFixed(2));
      // $("#totall").html(ttl_amt.toFixed(2));
      $('#sub-total').html(formula.toFixed(2));
      $('#amount').val(formula.toFixed(2));
      $("#totall").html(formula.toFixed(2));

      
      // console.log("total amount: ");
      // console.log(ttl_amt);
      // $('#sub-total').html(ttl_amt.toFixed(2));
      // $('#amount').val(ttl_amt.toFixed(2));
      // $("#totall").html(ttl_amt.toFixed(2));
   }

</script>

`;

export default function ElementElementInvoicingCreateinvoice() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
