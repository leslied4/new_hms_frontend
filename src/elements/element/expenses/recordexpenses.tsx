const rawHtml = `
<!-- php: =$this->Html->css("../assets/plugins/pnotify/dist/pnotify.css") -->
<!-- php: =$this->Html->css("../assets/plugins/pnotify/dist/pnotify.buttons.css") --> 
<!-- php: = $this->Html->css('../assets/plugins/fullcalendar/fullcalendar.css') -->
<!-- php: = $this->Html->css('../assets/plugins/jquery-ui/jquery-ui.min.css') -->

<style>
   .invoice-table-header 
   {
   border:2px solid tomato;
   border-radius:15px;
   }
   .due-date 
   {
   color: darkorange;
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
         <ul class="nav nav-tabs" id="expensesTabs">
            <li class="nav-item">
               <a href="#create_expense" data-toggle="tab"> Create Expense</a>
            </li>
            <li class="nav-item">
               <a href="#create_bulk_expense" data-toggle="tab"> Create Bulk Expense </a>
            </li>
            <!-- <li class="nav-item">
               <a href="#draft_expense" data-toggle="tab"> Draft </a>
            </li> -->
            <li class="nav-item">
               <a href="#pending_expense" data-toggle="tab"> Pending </a>
            </li>
            <li class="nav-item">
               <a href="#paid_expense" data-toggle="tab"> Paid </a>
            </li>
            <li class="nav-item">
               <a href="#recurring_expense" data-toggle="tab"> Recurring </a>
            </li>
         </ul>
      </div>
      <div class="borderBox-body">
         <div class="tab-content">
            <div class="tab-pane" id="create_expense">
               <!-- <h4>Add a new Invoice</h4> -->
               <div class="container-fluid px-2">
                  <div class="row justify-content-center">
                     <div class="container-fluid text-center p-3 mt-2 mb-2">
                        <div class="card px-5 py-5 mt-1 mb-3">
                           <!-- <form id="msform"> --> 
                           <!-- php: = $this->Form->create($addExpense, ['url' => ['controller' => 'Expenses', 'action' => 'addExpense'],'id' =>'msform','novalidate']); -->
                           <div class="row mt-4">
                            <div class="col-md-2 text-left">
                                <h5>Payee</h5>
                            </div>
                            <div class="col-md-6 d-flex">
                                <SearchableSelectField name="payee_type" id="payer_type" class="form-control mb-1 input-height" required>
                                    <option value="">Select Payee</option>
                                    <option value="patient">Patient</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="company/credit">Company/Credit</option>
                                    <option value="custom">Custom</option>
                                </SearchableSelectField>&nbsp;&nbsp;&nbsp;&nbsp;

                              <div class="form-check form-check-inline">
                                  <input class="form-check-input" name="billable" type="checkbox" id="billable" checked="true"
                                      value="1">
                                  <label class="form-check-label" for="billable">Billable</label>
                              </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-2 text-left">
                                <h5>Payee Name</h5>
                            </div>
                            <div class="col-md-6" id="payee_name_info">
                            <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payee_name" id="payee_name" title="Select Payee Name"  data-live-search="true" required>
		    									
                            </SearchableSelectField>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Expense # </h5>
                            </div>
                            <div class="col-md-6 d-flex align-item-center">
                                <input id="expense_number" value="EXP-<!-- php: = $expenses_gen -->" name="expense_number" type="text" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="row mt-3">
                        <div class="col-md-2 text-left">
                                <h5>Category</h5>
                            </div>
                            <div class="col-md-6">
                                <SearchableSelectField name="category" id="category" class="form-control input-height">
                                    <option value="">Select Category</option>
                                    <!-- php: foreach($expensesCategories as $expenseCat){ -->
                                       <option value="<!-- php: = $expenseCat->name -->"><!-- php: = $expenseCat->name --></option>
                                    <!-- php: } -->
                                    
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="row mt-3">
                        <div class="col-md-2 text-left">
                                <h5>Email</h5>
                            </div>
                            <div class="col-md-6">
                                <input type="email" name="email" class="form-control" required />
                            </div>
                        </div>
                        <div class="row mt-3">
                        <div class="col-md-2 text-left">
                                <h5>Phone</h5>
                            </div>
                            <div class="col-md-6">
                                <input type="text" name="phone" class="form-control" required />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Currency</h5>
                            </div>
                        <div class="col-md-6">
                                <SearchableSelectField name="currency" id="currency" class="form-control input-height" required>
                                    <option value="">Select Currency</option>
                                    <option value="CEDIS">Cedis</option>
                                    <option value="USD">USD</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div id="payment" class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Payment Mode</h5>
                            </div>
                        <div class="col-md-6">
                                <SearchableSelectField name="payment" class="form-control input-height" required>
                                    <option value="">Select Payment Mode</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Vodafone Cash">Vodafone Cash</option>
                                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                                    <option value="AirtelTigo">Airtel Tigo</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </SearchableSelectField>
                            </div>
                        </div>

                        <div class="col-md-9" id="item-table">
                           <table class="table mt-4">
                              <!-- <thead>
                                 <tr>
                                    <th>Item Details</th>
                                             <th>Quantity</th>
                                             <th>Unit Cost</th>
                                             <th>Discount</th>
                                             <th>Amount</th>

                                 </tr>
                              </thead> -->
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

                      
                        <div class="row">
                           <div class="col-md-5 p-2 text-left">
                           <h5 id="add_more_button" style="cursor:pointer" class="text-primary my-0 ml-2">
                              <i class="fa fa-plus"></i>&nbsp;
                              Itemize
                           </h5>
                           </div>
                           <div class="col-md-7 p-2">
                              
                           </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Amount </h5>
                            </div>
                            <div class="col-md-3 pr-0">
                                <input id="totall" name="total_amount" type="number" readonly class="form-control" required />
                                <input type="hidden" id="sub-total">
                                <input type="hidden" id="amount">
                            </div>
                            <div class="col-md-1 px-0">
                                <h5>Tax</h5>
                            </div>
                            <div class="col-md-2 px-0">
                                <input id="add-tax" style="width:93%;" placeholder="Tax (%)" name="tax" type="number" class="form-control">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Reference # </h5>
                            </div>
                            <div class="col-md-6 d-flex align-item-center">
                                <input id="reference" name="reference" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row mt-3">
                        <div class="col-md-2 text-left">
                                <h5>Terms</h5>
                            </div>
                            <div class="col-md-6">
                                <SearchableSelectField name="terms" id="terms" class="form-control input-height" required >
                                    <option value="">Select Terms</option>
                                    <option value="7">Net 7</option>
                                    <option value="15">Net 15</option>
                                    <option value="30">Net 30</option>
                                    <option value="60">Net 60</option>
                                    <option value="end-of-month">Due end of the month</option>
                                    <option value="end-of-next-month">Due end of next month</option>
                                </SearchableSelectField>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 text-left">
                                <h5>Date </h5>
                            </div>
                            <div class="col-md-3 pr-0">
                                <input id="invoice-date" name="expense_date" type="text" readonly class="form-control">
                            </div>
                            <div class="col-md-1 px-0">
                                <h5>Due Date</h5>
                            </div>
                            <div class="col-md-2 px-0">
                                <input id="due-date" style="width:93%;" name="due_date" type="text" class="form-control" required>
                            </div>
                        </div>
                        <div class="row mt-5">
                        <div class="col-md-2"></div>
                        <div class="col-md-6">
                           <div class="accordion" id="accordionExample">
                              <div class="card">
                                 <h5 class="my-0" style="background-color: #90ee904d" id="headingOne">
                                    <button class="btn btn-link text-dark" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <i class="fa fa-file"></i>&nbsp; Make Expense Recurring
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
                                                <input class="form-check-input" type="radio" name="condition" id="stop-date" value="stop-date">
                                                <label class="form-check-label" for="stop-date">Date</label>
                                             </div>
                                             <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="condition" id="stop-occurence" value="stop-occurence">
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
                        <div class="row mt-5 justify-content-end">
                        <!-- php: if(in_array("APPROVE EXPENSE", $statusProtocols)){ -->
                              <button type="button" data-toggle="modal" data-target="#approve_send" class="btn btn-danger">Approve and Send</button>&nbsp;&nbsp;
                           <!-- php: } else{ -->
                              <input type="hidden" value="pending">
                              <button type="submit" class="btn btn-primary">Save</button>&nbsp;&nbsp;
                           <!-- php: } -->
                           
                           
                           <!-- <button type="submit" class="btn btn-secondary">Reset</button> -->
                        </div>
                        <!-- php: if(in_array("APPROVE EXPENSE",$statusProtocols)){ -->
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
<!-- php: } -->
<!-- php: =$this->Form->end(); -->
                          
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div class="tab-pane" id="create_bulk_expense">
                <!-- <h4>Add a new Invoice</h4> -->
                <div class="container-fluid px-2">
                  <div class="row justify-content-center">
                     <div class="container-fluid text-center p-3 mt-3 mb-2">
                        <div class="card px-4 py-5 mt-1 mb-3">
                        <!-- php: = $this->Form->create($addExpense, ['url' => ['controller' => 'Expenses', 'action' => 'addBulkExpense'],'id' =>'msform','novalidate']); -->
                        <div class="col-md-12" id="item-table">
                      <table class="table mt-4">
									<thead>
										<tr>
                                 <th>Due Date</th>
                                 <th>Payee Name</th>
                                 <th style="width:20%">Category</th>
                                 <th style="width:10%">Quantity</th>
                                 <th style="width:10%">Unit Cost</th>
                                 <th style="width:10%">Tax</th>
                                 <th style="width:20%">Amount</th>
										</tr>
									</thead>
									<tbody id="item-body2">
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
                               </tr>
                               <tr>
                                          
                                          <td>
                                              <input type="text" placeholder="Enter Item Name" name="item_name[]" id="item-name_2" class="form-control my-0" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Qty" name="qty[]" id="qty_2" class="form-control" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Unit Cost" name="rate[]" id="rate_2" class="form-control" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Discount (%)" name="discount[]" id="discount_2" class="form-control my-0 discount" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Amount" name="amount[]" id="amount_2" class="form-control" />
                                          </td>
                               </tr>
                               <tr>
                                          
                                          <td>
                                              <input type="text" placeholder="Enter Item Name" name="item_name[]" id="item-name_3" class="form-control my-0" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Qty" name="qty[]" id="qty_3" class="form-control" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Unit Cost" name="rate[]" id="rate_3" class="form-control" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Discount (%)" name="discount[]" id="discount_3" class="form-control my-0 discount" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Amount" name="amount[]" id="amount_3" class="form-control" />
                                          </td>
                               </tr>
                               <tr>
                                          
                                          <td>
                                              <input type="text" placeholder="Enter Item Name" name="item_name[]" id="item-name_4" class="form-control my-0" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Qty" name="qty[]" id="qty_4" class="form-control" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Unit Cost" name="rate[]" id="rate_4" class="form-control" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Discount (%)" name="discount[]" id="discount_4" class="form-control my-0 discount" />
                                          </td>
                                          <td>
                                          <input type="number" placeholder="Amount" name="amount[]" id="amount_4" class="form-control" />
                                          </td>
                               </tr>
                                        -->

									</tbody>
								</table>
                      </div>

                      
                        <div class="row">
                        <div class="col-md-5 p-2 text-left">
                         <h5 id="add_bulk_items" style="cursor:pointer" class="text-primary my-0 ml-2">
                             <i class="fa fa-plus"></i>&nbsp;
                             Add Items
                         </h5>
                        </div>
                        <div class="col-md-7 p-2">
                            
                        </div>
                        </div>
                        
                        <div class="row mt-5 justify-content-end">
                        <!-- php: if(in_array("APPROVE EXPENSE", $statusProtocols)){ -->
                              <button type="button" data-toggle="modal" data-target="#approve_send2" class="btn btn-danger">Approve and Send</button>&nbsp;&nbsp;
                           <!-- php: } else{ -->
                              <input type="hidden" value="pending">
                              <button type="submit" class="btn btn-primary">Save</button>&nbsp;&nbsp;
                           <!-- php: } -->
                           
                           
                           <!-- <button type="submit" class="btn btn-secondary">Reset</button> -->
                        </div>
                   
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!-- php: if(in_array("APPROVE EXPENSE",$statusProtocols)){ -->
<div class="modal fade" id="approve_send2" tabindex="-1" aria-hidden="true">
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
<!-- php: } -->
   
                           <!-- php: =$this->Form->end(); -->
            <div class="tab-pane active" id="pending_expense">
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
                                    <!-- <option value="active">Active</option> -->
                                    <!-- <option class="text-primary" value="billable">Billable</option> -->
                                    <option class="text-warning" value="waiting for approval">Waiting for Approval</option>
                                    <option value="billable full payment" class="text-primary">Billable Full Payment</option>
                                    <option value="billable part payment" class="text-warning">Billable Part Payment</option>
                                    <option class="text-danger" value="non billable">Non Billable</option>
                                    <option class="text-success" value="approved to be paid">Approved to Be Paid</option>
                                    <option class="text-danger" value="overdue by">Overdue by x days</option>
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
                                  <th><span class="invoice-table-header text-danger py-2 px-3">Date</span></th>
                                  <th><span class="invoice-table-header py-2 px-3">Expense#</span></th>
                                  <th><span class="invoice-table-header py-2 px-3">Due Date</span></th>
                                  <th><span class="invoice-table-header py-2 px-3">Payee Name</span></th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th><span class="invoice-table-header py-2 px-3">Amount</span></th>
                                  <!-- <th></th> -->
                                  <!-- <th><span class="invoice-table-header py-2 px-3">Reference</span></th> -->
                                  <th>Action</th>
                              </tr>
                           </thead>
                           <tbody>

                           <!-- php: foreach($expenses as $pendingExpense){ if(($pendingExpense->status == 'pending' || $pendingExpense->status == 'approved') && $pendingExpense->balance_due > 0){ -->
                              <tr>
                                 <td><!-- php: = $pendingExpense->expense_date --></td>
                                 <td><a href="javascript:" onclick="pendingModal('<!-- php: =$pendingExpense->id -->')"><!-- php: = $pendingExpense->expense_number --></a></td>
                                 <td><!-- php: = $pendingExpense->due_date --></td>
                                 <!-- <td><a href="javascript:" data-toggle="modal" data-target="#pending_<!-- php: //$pendingExpense->id -->"><!-- php: //= $pendingExpense->expense_number --></a></td> -->
                                 <td><!-- php: = $pendingExpense->payee_name --> <!-- php: //= $pendingExpense->pay_type == "online" ? '<span class="badge badge-primary">online</span>' : '<span class="badge badge-warning">manual</span>' --></td>
                                 <td><!-- php: = $pendingExpense->category --></td>
                                 <td>
                                 <!-- php: if($pendingExpense->status == 'approved' && $pendingExpense->billable == 1){ -->
                                 <small class="text-success">APPROVED TO BE PAID</small>
                                 <!-- php: } else if($pendingExpense->status == 'approved' && $pendingExpense->billable == 0){ -->
                                 <small class="text-warning">NON BILLABLE</small>
                                 <!-- php: } else if($pendingExpense->status == 'pending') { -->
                                 <small class="due-date">WAITING FOR APPROVAL</small>
                                 <!-- php: } -->
                                 </td>
                                 <td><a href="javascript:"><!-- php: = $pendingExpense->balance_due --></a></td>
                                 <!-- <td><!-- php: //= $pendingExpense->reference --></td> -->


                                 <!-- php: if (count($statusProtocols) > 0 ){ -->
                                 <td>

                                 <!-- php: if($pendingExpense->status == 'pending') { -->
                                 <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                 <a href="<!-- php: = $this->Url->build(['controller' => 'Invoicing', 'action' => 'edit',$pendingExpense->id]) -->" class="btn btn-warning btn-sm">Edit</a><br/>
                                 <!-- php: //= $pendingExpense->enabled == 0 ? $this->Form->postLink(__('Enable'), ['controller'=>'Invoicing','action'=>'toggleIsEnabled',$pendingExpense->id], ['class' => 'btn btn-success btn-sm']) : $this->Form->postLink(__('Disable'), ['controller'... -->
                                 <!-- php: } -->
                                 <!-- php: } -->
                                 <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)) { -->
                                 <!-- php: = $pendingExpense->enabled == 1 ? '<button onclick="disablePendingModal(\''.$pendingExpense->id.'\')" class="btn btn-secondary btn-sm">Disable</button>' : '<button onclick="enablePendingModal(\''.$pendingExpense->id.'\')" class="btn btn-suc... -->
                                 <br/>
                                 <!-- php: } -->
                                 <!-- <a href="<!-- php: //= $this->Url->build(["controller" => "Invoicing","action" => "deleteInvoice",$pendingExpense->id]) -->" class="btn btn-danger btn-sm">Write Off</a><br/> -->
                                 <!-- <a href="<!-- php: //= $this->Url->build(['controller' => 'Invoicing', 'action' => 'recordPayment',$pendingExpense->id]) -->" class="btn btn-primary btn-sm">Record Payments</a> -->
                                 <!-- php: if(in_array("APPROVE WRITE OFF", $statusProtocols)){ -->
                                 <a href="javascript:" class="btn btn-sm btn-danger" onclick="writeoffPendingModal('<!-- php: =$pendingExpense->id -->')">Write Off</a>
                                 <!-- php: } -->
                                 <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols)){ -->
                                 <!-- php: if($pendingExpense->status == 'pending'){ -->
                                 <a href="javascript:" class="btn btn-sm btn-info" onclick="approveInvoiceModal('<!-- php: = $pendingExpense->id -->')">Approve And Send</a> 
                                 <!-- php: } -->
                                 <!-- php: } -->
                                 <!-- php: //= $this->Form->postLink(__('Record Payments'), ['controller'=>'Invoicing','action'=>'recordPayment',$pendingExpense->id], ['confirm' => __('Are you sure you want to record payment {0}?', $pendingExpense->invoice_number), 'class' => 'btn b... -->
                                 <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols) && $pendingExpense->status == 'approved'){ -->
                                 <!-- php: = $pendingExpense->pay_type == "online" ? '' : '<button onclick="pendingRecordModal(\''.$pendingExpense->id.'\')" class="btn btn-sm btn-primary">Record Payments</buttion>' -->
                                 <!-- php: } -->

                                 </td>
                                 <!-- php: } -->
                              </tr>
                           <!-- php: }} -->
                           <!-- php: $x =1; foreach($recurringExpenses as $recurringExpense): -->
                           <!-- php: if(($recurringExpense->status=='pending' || $recurringExpense->status=='approved')){ -->

                              <tr>
                                 <td><!-- php: = $recurringExpense->date --></td>
                                 <td><a href="javascript:" onclick="recurringModal('<!-- php: =$recurringExpense->id -->')" ><!-- php: = $recurringExpense->expense->expense_number -->-<!-- php: = $recurringExpense->occurence --></a></td>
                                 <td><!-- php: = $recurringExpense->expense->due_date --></td>  
                                 <td><!-- php: = $recurringExpense->expense->payee_name --></td>
                                 <td><!-- php: = $recurringExpense->expense->category --></td>
                                 <td>
                                 <!-- php: if($recurringExpense->status == 'approved' && $recurringExpense->expense->billable == 1){ -->
                                 <small class="text-success">APPROVED TO BE PAID</small>
                                 <!-- php: } else if($recurringExpense->status == 'approved' && $recurringExpense->expense->billable == 0){ -->
                                 <small class="text-warning">NON BILLABLE</small>
                                 <!-- php: } else if($recurringExpense->status == 'pending') { -->
                                 <small class="due-date">WAITING FOR APPROVAL</small>
                                 <!-- php: } -->
                                 </td>
                                 <td><a href="javascript:" data-target="recurringAmountModal('<!-- php: =$recurringExpense->id -->')"><!-- php: = $recurringExpense->amount --></a></td>



                                
                              
                                 <!-- php: if (count($statusProtocols) > 0 ){ -->
                                 <td>

                                 <!-- php: if($recurringExpense->status == 'pending') { -->
                                 <!-- php: if(in_array("CREATE INVOICE", $statusProtocols)){ -->
                                 <a href="<!-- php: = $this->Url->build(['controller' => 'expense', 'action' => 'edit',$recurringExpense->id]) -->" class="btn btn-warning btn-sm">Edit</a><br/>
                                 <!-- php: //= $recurringExpense->enabled == 0 ? $this->Form->postLink(__('Enable'), ['controller'=>'expense','action'=>'toggleIsEnabled',$recurringExpense->id], ['class' => 'btn btn-success btn-sm']) : $this->Form->postLink(__('Disable'), ['controlle... -->
                                 <!-- php: = $recurringExpense->enabled == 0 ? '<button onclick="disableRecurringModal(\''.$recurringExpense->id.'\')" class="btn btn-secondary btn-sm">Disable</button>' : '<button onclick="enableRecurringgModal(\''.$recurringExpense->id.'\')" class="... -->
                                 <br/>

                                 <!-- php: } -->
                                 <!-- php: } -->
                                 <!-- <a href="<!-- php: //= $this->Url->build(["controller" => "expense","action" => "deleteInvoice",$recurringExpense->id]) -->" class="btn btn-danger btn-sm">Write Off</a><br/> -->
                                 <!-- <a href="<!-- php: //= $this->Url->build(['controller' => 'expense', 'action' => 'recordPayment',$recurringExpense->id]) -->" class="btn btn-primary btn-sm">Record Payments</a> -->
                                 <!-- php: if(in_array("APPROVE WRITE OFF", $statusProtocols)){ -->
                                 <a href="javascript:" class="btn btn-sm btn-danger" onclick="writeoffRecurringModal('<!-- php: =$recurringExpense->id -->')">Write Off</a>
                                 <!-- php: } -->
                                 <!-- php: if(in_array("APPROVE INVOICE", $statusProtocols)){ -->
                                 <!-- php: if($recurringExpense->status == 'pending'){ -->
                                 <!-- <a href="javascript:" class="btn btn-sm btn-info" data-toggle="modal" data-target="#approve_invoice_<!-- php: // = $recurringExpense->id -->">Approve And Send</a>  -->
                                 <!-- php: } -->
                                 <!-- php: } -->
                                 <!-- php: //= $this->Form->postLink(__('Record Payments'), ['controller'=>'expense','action'=>'recordPayment',$recurringExpense->id], ['confirm' => __('Are you sure you want to record payment {0}?', $recurringExpense->expense_number), 'class' => 'btn... -->
                                 <!-- php: if(in_array("RECORD PAYMENTS", $statusProtocols) && $recurringExpense->status == 'approved'){ -->
                                 <!-- php: = $recurringExpense->pay_type == "online" ? '' : '<button onclick="recurringRecordModal(\''.$recurringExpense->id.'\')" class="btn btn-sm btn-primary">Record Payments</buttion>' -->
                                 <!-- php: } -->

                                 </td>
                                 <!-- php: } -->

                              </tr>
                           <!-- php: } $x++; endforeach; -->
                        </tbody>
                        </table> 
                     </div>
                  </div>
               </div>
            </div>
            <div class="tab-pane" id="paid_expense">
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
                                      <th><span class="invoice-table-header text-danger py-2 px-3">Date</span></th>
                                      <th><span class="invoice-table-header py-2 px-3">Expense#</span></th>
                                      <th><span class="invoice-table-header py-2 px-3">Payee Name</span></th>
                                      <th>Category</th>
                                      <th><span class="invoice-table-header py-2 px-3">Amount</span></th>
                                      <th>Status</th>
                                      <th><span class="invoice-table-header py-2 px-3">Reference</span></th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                 <!-- php: foreach($expenses_paid as $expense){ -->
                                    <tr>
                                      <td><!-- php: = $expense->payment_date --></td>
                                      <td><a href="javascript:">#<!-- php: = $expense->expense->expense_number --></a></td>
                                      <td><!-- php: = $expense->expense->payee_name --></td>
                                      <td><!-- php: = $expense->expense->category --></td>
                                      <td><a href="javascript:"><!-- php: = $expense->amount_final --></a></td>
                                      <td><small class="text-success">Full Payment</small></td>
                                      <td><!-- php: = $expense->reference --></td>
                                      <td>
                                         <!-- php: = $expense->money_out == 1 ? '<button class="btn btn-sm btn-success">Reported Money Out</button>' : ' <a href="javascript:" data-toggle="modal" data-target="#report_money_out_'. $expense->id .'" class="btn btn-sm btn-danger">Report Money Ou... -->
                                      </td>
                                  </tr>
                                 <!-- php: } -->
                               
                              </tbody>
                          </table>
                      </div>
                  </div>
                  </div>

                  </div>
            
            <div class="tab-pane" id="recurring_expense">
               <div class="card  card-box">
                  <div class="card-body ">
                     <div class="container-fluid py-2 mt-4">
                        <h5 class="font-weight-bold">Filter Options:</h5>
                        <div class="row">
                           <div class="col-sm-3 d-flex align-items-center">
                              <div class="center" style="vertical-align: bottom">From:</div>
                              &nbsp;&nbsp;
                              <div class="input-group">
                                 <input class="form-control" placeholder="Start" size="16"  name="datefilter-start1" id="start3" type="text" required >
                                 <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                              </div>
                           </div>
                           <div class="col-sm-3 d-flex align-items-center">
                              <div class="" style="">To:</div>
                              &nbsp;&nbsp;
                              <div class="input-group">
                                 <input class="form-control " placeholder="End" size="16" placeholder="" name = "datefilter-end1" id="end3" type="text" value="" required >
                                 <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                              </div>
                              &nbsp;
                              <button id="recurringBtn" class="btn btn-md btn-info d-flex justify-content-center align-items-center" style="height:100%">GO</button>
                           </div>
                           <div id="filter" class="col-sm-3 d-flex align-items-center">
                              <!-- <div class="" style="">To:</div>&nbsp;&nbsp; -->
                              <div class="input-group">
                                 <SearchableSelectField class="form-control input-height" name = "status_filter" id = "status-filter3">
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
                     <table id="recurring_table" class="table table-hover customDatable full-width recurring_table">
									<thead>
										<tr>
											<th><span class="invoice-table-header text-danger py-2 px-3">Date</span></th>
											<th><span class="invoice-table-header py-2 px-3">Expense #</span></th>
                                            <th><span class="invoice-table-header py-2 px-3">Payee Name</span></th>
                                            <!-- <th>Status</th> -->
                                            <!-- <th><span class="invoice-table-header py-2 px-3">Due Date</span></th> -->
                                            <th><span class="invoice-table-header py-2 px-3">Recurring Amount</span></th>
                                            <th><span class="invoice-table-header py-2 px-3">Amount</span></th>
                                            <th><span class="invoice-table-header py-2 px-3">No. of Occurences</span></th>
                                            <th><span class="invoice-table-header py-2 px-3">Activity</span></th>
                                            <!-- php: = count($statusProtocols) > 0 ? '<th>Action</th>' : '' -->
										</tr>
									</thead>
									<tbody>
                                       
                                        <!-- php: $x=1; $today_date = Date('Y-m-d'); foreach($expenses as $recurringExpense): -->
                                          <!-- php: if($recurringExpense->status == 'recurring'){ $total_paid = 0; foreach ($recurringExpense->expenses_recurring as $key => $recur) { $total_paid += $recur->status == 'paid' ? 1 : 0; # code... } -->

                                              
                                            <tr>
                                                <td><!-- php: = $recurringExpense->expense_date --></td>
                                                <td><a href="javascript:" onclick="pendingModal('<!-- php: = $recurringExpense->id -->')"><!-- php: = $recurringExpense->expense_number --></a></td>
                                                <td><!-- php: = $recurringExpense->payee_name --></td>
                                                
                                                <td><!-- php: = $recurringExpense->expenses_recurring[0]->amount --></td>
                                                <td><!-- php: = $recurringExpense->balance_due --></td>
                                                <td><!-- php: = $total_paid --> / <!-- php: = sizeof($recurringExpense->expenses_recurring) --></td>
                                                <td><!-- php: = $recurringExpense->expenses_recurring[$total_paid]->activity --></td>
                                                <!-- -->
                                        <!-- php: if (count($statusProtocols) > 0 ){ -->
                                           <td>

                                               <!-- <a href="<!-- php: //= $this->Url->build(['controller' => 'expense', 'action' => 'edit',$recurringExpense->expense->id]) -->" class="btn btn-warning btn-sm">Edit</a><br/> -->
                                               <!-- php: // if(in_array("CREATE EXPENSES", $statusProtocols)){ -->
                                                    <!-- php: = $recurringExpense->enabled == 1 ? $this->Form->postLink(__('Disable'), ['controller'=>'Expense','action'=>'toggleIsEnabled',$recurringExpense->id], ['class' => 'btn btn-danger btn-sm']) : $this->Form->postLink(__('Enable'), ['controller'=... --><br/>
                                               <!-- php: //} -->
                                              
                                               
                                               
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
            <div class="tab-pane" id="draft_expense">
               <div class="card  card-box">
                  <div class="card-body ">
                     <div class="table-responsive">
                        <!-- <table class="table table-hover order-column full-width customDataTable">
                           <thead>
                           	<tr>
                           		<th><span class="invoice-table-header text-danger py-2 px-3">Date</span></th>
                           		<th><span class="invoice-table-header py-2 px-3">Invoice#</span></th>
                                                              <th><span class="invoice-table-header py-2 px-3">Payer Name</span></th>
                                                              <th>Status</th>
                                                             <th><span class="invoice-table-header py-2 px-3">Due Date</span></th>
                                                              <th><span class="invoice-table-header py-2 px-3">Amount</span></th> 
                                                              <th>Started By</th>
                                                              <th>Action</th>
                           	</tr>
                           </thead>
                           <tbody> -->
                        <!-- php: /* foreach($draftInvoices as $draftInvoice){ -->
                        <tr>
                           <td><!-- php: = $draftInvoice->invoice_date --></td>
                           <td><a href="javascript:" data-toggle="modal" data-target="#preview"><!-- php: = $draftInvoice->expense_number --></a></td>
                           <td><!-- php: = $draftInvoice->payer_name --></td>
                           <td><small class="text-danger">Not Completed</small></td>
                           <!-- <td><!-- php: //= $draftInvoice->due_date --></td>
                              <td><a href="javascript:">$94.000</a></td> -->
                           <td><!-- php: =$draftInvoice->started_by --></td>
                           <td>
                              <a href="<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'edit',$draftInvoice->id]) -->" class="btn btn-warning btn-sm">Edit</a><br/>
                              <!-- <!-- php: //= $draftInvoice->enabled == 0 ? '<a class="btn btn-success text-slate-900 btn-sm">Enable</a>' : '<a class="btn btn-secondary text-slate-900 btn-sm">Disable</a>'; --><br/> -->
                              <a href="<!-- php: = $this->Url->build(["controller" => "Expenses","action" => "deleteInvoice",$draftInvoice->id]) -->" class="btn btn-danger btn-sm">Remove</a><br/>
                              <!-- <a class="btn btn-primary btn-sm">Record Payments</a> -->
                           </td>
                        </tr>
                        <!-- php: } */ -->
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
                        <!-- </tbody>
                           </table> -->
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- php: /* foreach($paidInvoices as $paidInvoice): -->
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
                              <h5 class="font-weight-bold"># <!-- php: = $paidInvoice->expense_number --></h5>
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
                              <!-- php: foreach($paidInvoice->Expenses_items as $item): -->
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
<!-- php: endforeach; */ -->
<!-- write off pending invoices --> 
<div class="modal fade" id="pending_modal_pop" tabindex="-1" aria-hidden="true">
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
            <div class="modal-body discharge_summary" id="pending_modal_content">


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

<div class="modal fade" id="record_modal_pop" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content" id="pending_record_content">
      </div>
   </div>
</div>
<div class="modal fade" id="pending_amount_pop" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
      <div class="modal-content" id="pending_amount_content">
      </div>
   </div>
</div>
<div class="modal fade" id="disable_pending_pop" tabindex="-1" aria-hidden="true">
<div class="modal-dialog modal-md  modal-dialog-centered" role="document">
   <div class="modal-content" id="disable_pending_content">
      </div>
   </div>
</div>
<div class="modal fade" id="enable_pending_pop" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content" id="enable_pending_content">
      </div>
   </div>
</div>
<div class="modal fade" id="writeoff_pending_pop" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content" id="writeoff_pending_content">
      </div>
   </div>
</div>
<div class="modal fade" id="approve_invoice_pop" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content" id="approve_invoice_content">
      </div>
   </div>
</div>



<!-- php: foreach($expenses_paid as $expense){ -->
   <div class="modal fade" id="report_money_out_<!-- php: =$expense->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Report Money Out For <!-- php: = $pendingExpense->expense_number --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: = $this->Form->create($reportMO, ['url' => ['controller' => 'expenses', 'action' => 'reportMO']]); -->
            <input type="hidden" name="expense_id" value="<!-- php: = $expense->id -->" />
            <div class="container bg-white p-2">
               <div class="container-fluid">
                  <!-- php: $ko = 0; if(sizeof($Accounts) == 0){ -->
                     <h5>Oops! No money out account is configured.<br/> Please create one at accounts section.</h5>
                  <!-- php: } else { -->
                     <div class="row mt-4">
                           <div class="col-md-3">
                              <h5>Select Account: </h5>

                           </div>
                           <div class="col-md-8">
                              <input type="hidden" name="amount_p" value="<!-- php: = $expense->amount_paid -->">
                             
                              <!-- php: foreach($Accounts as $account) { -->
                              <!-- php: if($account->accounts_tags[0]->attribute == "MONEY OUT" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                              <div class="form-check">
                                 <input class="form-check-input" type="radio" name="category_id"
                                       id="category_id<!-- php: = $account->id -->" value="<!-- php: = $account->id -->">
                                 <label class="form-check-label" for="category_id<!-- php: = $account->id -->">
                                       <!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name -->

                                       <span class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'badge bg-danger'; } else { echo 'badge bg-secondary'; } -->"><!-- php: = $account->transaction_code --></span>

                                 </label>
                              </div>
                              <!-- php: } else{ $ko++; } -->
                              <!-- php: } -->
                              <!-- php: if($ko == sizeof($Accounts)){ -->
                                 <label class="text-secondary">Oops! No account has been configured. <br/>Please create one at accounts section.</label>
                              <!-- php: } -->

                           </div>
                     </div>
                  <!-- php: } -->
               </div>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <!-- php: if($ko != sizeof($Accounts)){ -->
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> </button>
                  <!-- php: } -->
                  <!-- php: = $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- php: } -->
<!-- end page content -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
<!-- <script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script> -->
<script>
   function pendingRecordModal(id) {
      $('#pending_record_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'pendingRecordModal']) -->/"+id,
         function () {
            let name = 'record_modal_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function pendingAmountModal(id) {
      $('#pending_amount_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'pendingAmountModal']) -->/"+id,
         function () {
            let name = 'pending_amount_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function disablePendingModal(id) {
      $('#disable_pending_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'disablePendingModal']) -->/"+id,
         function () {
            let name = 'disable_pending_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function enablePendingModal(id) {
      $('#enable_pending_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'enablePendingModal']) -->/"+id,
         function () {
            let name = 'enable_pending_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function pendingModal(id) {
      $('#pending_modal_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'pendingModal']) -->/"+id,
         function () {
            let name = 'pending_modal_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function writeoffPendingModal(id) {
      $('#writeoff_pending_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'writeoffPendingModal']) -->/"+id,
         function () {
            let name = 'writeoff_pending_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function approveInvoiceModal(id) {
      $('#approve_invoice_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'approveInvoiceModal']) -->/"+id,
         function () {
            let name = 'approve_invoice_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function recurringRecordModal(id) {
      $('#pending_record_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'recurringRecordModal']) -->/"+id,
         function () {
            let name = 'record_modal_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function recurringAmountModal(id) {
      $('#pending_amount_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'recurringAmountModal']) -->/"+id,
         function () {
            let name = 'pending_amount_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function disableRecurringModal(id) {
      $('#disable_pending_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'disableRecurringModal']) -->/"+id,
         function () {
            let name = 'disable_pending_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function enableRecurringgModal(id) {
      $('#enable_pending_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'enableRecurringModal']) -->/"+id,
         function () {
            let name = 'enable_pending_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function recurringModal(id) {
      $('#pending_modal_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'recurringModal']) -->/"+id,
         function () {
            let name = 'pending_modal_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function writeoffRecurringModal(id) {
      $('#writeoff_pending_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'writeoffRecurringModal']) -->/"+id,
         function () {
            let name = 'writeoff_pending_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
   function recurringApproveInvoiceModal(id) {
      $('#approve_invoice_content').load(
         "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'recurringApproveInvoiceModal']) -->/"+id,
         function () {
            let name = 'approve_invoice_pop'
            $('#' + name).modal({
               show: true
            });
         });
   }
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
    var table = $('#pending_table').DataTable({
      order: [0, 'desc']
    });
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

$('#payment').hide();
$('#billable').on('change', function(){
  if($(this).is(':checked')){
   $('#payment').show();
  } else {
   $('#payment').hide();
  }
});

   function solveForTotal(counter) {
      let sum = 0
      for (let index = 2; index <= counter; index++) {
         sum += Number($('#amount_'+index).val())
      }
      console.log("ghana web", counter, sum)
      $('#sub-total').val(sum.toFixed(2));
      $('#amount').val(sum.toFixed(2));
      $('#totall').val(sum.toFixed(2));
      
   }
	$(function () {
		$("#specialty").submit(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});

		var counter = 1;
      var total = [];
      $('#add_more_button').on('click', function() {
         counter ++
         console.log("this is counter", counter)
         $('<tr id="name_'+ counter +'"><td><input type="text" placeholder="Enter Item Name" name="item_name[]" id="item-name_'+ counter +'" class=" my-0 form-control" /></td><td><input type="number" placeholder="Qty" name="qty[]" id="qty_'+ counter +'" class="form-control" /></td><td><input type="number" placeholder="Unit Cost" name="rate[]" id="rate_'+ counter +'" class="form-control" /></td><td><input type="number" placeholder="Discount" name="discount[]" id="discount_'+ counter +'" class="form-control my-0 discount" /></td><td style="position:relative;"> <input type="number" readonly placeholder="Amount" name="amount[]" id="amount_'+ counter +'" class="form-control" /><span style="position:absolute; top:20px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body");
         // $('<div id="price_'+ counter +'"><input type="number" name="code[]" id="code"  placeholder="Code" class="form-control input-height" required/><br></div>').appendTo("#mdc_code_div");
         // $('<div id="code_'+ counter +'"><input type="number" name="tariff[]" id="code"  placeholder="Tariff" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#mdc_tariff_div");

         $('#qty_'+ counter).on('change', function(){
            let id = this.id.split("_")[1]
            var qty = Number($('#qty_'+id).val());
            var amt = Number($('#amount_'+id).val());
            var dis = Number($('#discount_'+id).val())/100;
            var cost = Number($('#rate_'+id).val());
            var amt = qty * cost;
            var formula = amt - (amt * dis);


            
            $('#amount_'+id).val(formula.toFixed(2));
            solveForTotal(counter)



            // var sum = 0;

            // $('#sub-total').val(sum.toFixed(2));
            // $('#amount').val(sum.toFixed(2));
            // $('#totall').val(sum.toFixed(2));
         });

         $('#rate_'+ counter).on('change', function(){
            let id = this.id.split("_")[1]
            var qty = Number($('#qty_'+id).val());
            var amt = Number($('#amount_'+id).val());
            var dis = Number($('#discount_'+id).val())/100;
            var cost = Number($('#rate_'+id).val());
            var amt = qty * cost;
            var formula = amt - (amt * dis);


            $('#amount_'+id).val(formula.toFixed(2));
            solveForTotal(counter)



            // var sum = 0;

            // $('#sub-total').val(sum.toFixed(2));
            // $('#amount').val(sum.toFixed(2));
            // $('#totall').val(sum.toFixed(2));
         });
            
         $('#discount_'+ counter).on('change', function(){
            let id = this.id.split("_")[1]
            var qty = Number($('#qty_'+id).val());
            var amt = Number($('#amount_'+id).val());
            var dis = Number($('#discount_'+id).val())/100;
            var cost = Number($('#rate_'+id).val());
            var amt = qty * cost;
            var formula = amt - (amt * dis);

            $('#amount_'+id).val(formula.toFixed(2));

            solveForTotal(counter)


         
            // var sum = 0;

            // $('#sub-total').val(sum.toFixed(2));
            // $('#amount').val(sum.toFixed(2));
            // $('#totall').val(sum.toFixed(2));
         });
   
      });
   });


//bulk settings
var counter_2 = 4;
$('#add_bulk_items').on('click', function() {
            counter_2 ++
            $('<tr id="name_'+ counter_2 +'"><td><input type="date" name="date[]" id="item-date_'+ counter_2 +'" class=" my-0 form-control" /></td><td><input type="text" placeholder="Enter Payee Name" name="payee_name[]" id="item-name_'+ counter_2 +'" class=" my-0 form-control" /></td><td><SearchableSelectField name="item_category[]" class="form-control" required><!-- php: foreach($expensesCategories as $expenseCat){ --><option value="<!-- php: = $expenseCat->name -->"><!-- php: = $expenseCat->name --></option><!-- php: } --></SearchableSelectField></td><td><input type="number" placeholder="Qty" name="qty[]" id="qty_'+ counter_2 +'" class="form-control" /></td><td><input type="number" placeholder="Unit Cost" name="rate[]" id="rate_'+ counter_2 +'" class="form-control" /></td><td><input type="number" placeholder="Tax(%)" name="tax[]" id="item_tax_'+ counter_2 +'" class="form-control my-0 item_discount" /></td><td style="position:relative;display:flex;"> <input type="number" placeholder="Amount" name="amount[]" id="amount_'+ counter_2 +'" class="form-control" />&nbsp;&nbsp;&nbsp;<div class="form-check form-check-inline"><input type="hidden" name="billable[]" value="0"/><input class="form-check-input" name="billable[]" type="checkbox" id="billable" value="1"><label class="form-check-label" for="billable">Billable</label></div></div><span style="position:absolute; top:20px;right:-10px;" class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter_2 +')" id="remove_more_button"><i class="fa fa-close"></i></a></span></td></tr>').appendTo("#item-body2");
            // $('<div id="price_'+ counter_2 +'"><input type="number" name="code[]" id="code"  placeholder="Code" class="form-control input-height" required/><br></div>').appendTo("#mdc_code_div");
            // $('<div id="code_'+ counter_2 +'"><input type="number" name="tariff[]" id="code"  placeholder="Tariff" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter_2 +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#mdc_tariff_div");
            
         $('#item_tax_'+ counter_2).on('change', function(){
           var amt = Number($('#amount_'+counter_2).val());
           var tax = Number(amt * $(this).val()/100);
           var formula = amt + tax;
           $('#amount_'+counter_2).val(formula.toFixed(2));
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
        $('#sub-total').val(sum.toFixed(2));
        $('#amount').val(sum.toFixed(2));
        $('#totall').val(sum.toFixed(2));
    });

    $('#rate_'+ counter_2).on('change', function(){

      
        

        if($('#discount').val() > 0)
      {
        var qty = Number($('#qty_'+counter_2).val());
        var amt = $('#amount_'+counter_2).val();
        var dis = Number($(this).val())/100;
        var cost = Number($('#rate_'+counter_2).val());
        var amt = qty * cost;
        var formula = amt - (amt * dis);

      }
      else {
         var qty = Number($('#qty_'+counter_2).val());
        var amt = $('#amount_'+counter_2).val();
       // var dis = Number($(this).val())/100;
        var cost = Number($('#rate_'+counter_2).val());
        var amt = qty * cost;
        var formula = amt;
         
      }
        
       $('#amount_'+counter_2).val(formula.toFixed(2));
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
        $('#sub-total').val(sum.toFixed(2));
        $('#amount').val(sum.toFixed(2));
        $('#totall').val(sum.toFixed(2));
    });


    
        });
    function removeExtraFields(counter){
        var deduct = parseInt($('#sub-total').val())-$('#amount_'+counter).val();
        $('#sub-total').val(deduct);
        $('#totall').val(deduct);
        $('#amount').val(deduct);
        $('#name_' + counter).remove();
        $('#price_' + counter).remove();
        $('#code_' + counter).remove();

    }

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
$('#payee_name').on('change', function(){
   $('#appr-name').html($('#payee_name').val());
});
$('#invoice-number').on('change', function(){
   $('[id=appr-invoice-num]').html($('#invoice-number').val());
});
$('#address').on('change', function(){
   $('#appr-address').html($('#address').val());
});
$('#invoice-date').on('change', function(){
   $('[id=appr-date]').html($('#invoice-date').val());
});
$('#due-date').on('change', function(){
   $('[id=appr-due-date]').html($('#due-date').val());
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
         $('#payee_name_info')
      .html('<input type="text" name="payer_name" id="payee_name" class="form-control" placeholder="Enter Custom Name"/>');
     }
     else {
      $('#payee_name_info')
    .html('<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="payee_name" id="payee_name" title="Select Payee Name"  data-live-search="true" required></SearchableSelectField>');
      
      $.ajax({
           type:"POST",
           data: {value:$('#payer_type').val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'Invoicing', 'action'=>'getUsers']); -->',
           success: function(html) {
               $('#payee_name').html(html);
               $('#payee_name').selectpicker("refresh");
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
               $('#payee_name2').html(html);
               $('#payee_name2').selectpicker("refresh");
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
    var amt = Number($('#amount').val());
    var tax = Number(amt * $(this).val()/100);
    var formula = amt + tax;
  $('#amount').val(formula);
  $('#totall').val(formula.toFixed(2));
  // tax = subtotal * tax/100

});

$('#add-discount').on('change', function(){
    var amt = Number($('#amount').val());
    var dis = Number($(this).val())/100;
    var formula = amt - (amt * dis);

  $('#amount').val(formula);
  $('#totall').val(formula.toFixed(2));
  // tax = subtotal * tax/100

});

$('#msform').submit(function(e){
  
   if($('#payee_type').val() == "" || $('#payee_name').val() == "" || $('#email').val() == "" || $('#phone').val() == "" || $('#currency').val() == "")
    {
      e.preventDefault();
      alert('Error: Please fill the form completely');
    }
    else{
       $(this).submit();
    }
});

$(".validate-recurr").on("change", function(e){
   e.preventDefault();
   $.ajax({
      url: "<!-- php: = $this->Url->build(['controller' => 'Expenses', 'action' => 'validateRecurring']) -->",
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
</script>
<script type="text/javascript">
	$(document).ready(function() {      			
		
		// save tab in local storage
		$('#expensesTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('expensesTabsLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var expensesTabsLastTab = localStorage.getItem('expensesTabsLastTab');
		if (expensesTabsLastTab) {
		   $('#expensesTabs a[href=' + expensesTabsLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#expensesTabs a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ElementElementExpensesRecordexpenses() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
