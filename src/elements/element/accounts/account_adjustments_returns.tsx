const rawHtml = `
<div class="card  card-box">
    <div class="card-head">
        <header>Account Adjustments Returns</header>
    </div>
    <div class="card-body ">
        <div class="row">
            <div class="borderBox light bordered col-md-12">
                <div class="borderBox-body">
                    <div class="tab-content">
                       
                        <div class="row mt-5">
                            <div class="col-md-2 pr-3">
                                <div class="form-group">
                                    <label>Filter:</label>
                                    <SearchableSelectField name="" id="date-filter" class="form-control">
                                        <option value="today">Today</option>
                                        <option value="this-week">This Week</option>
                                        <option value="this-month">This Month</option>
                                        <option value="custom">Custom</option>
                                    </SearchableSelectField>

                                    <div class="d-none" id="custom-date-range-container">
                                        <div id="range"></div>
                                        <label>
                                            Start
                                            <input id="start" mbsc-input placeholder="Please select..." />
                                        </label>
                                        <label>
                                            End
                                            <input id="end" mbsc-input placeholder="Please select..." />
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-4 d-flex align-start">

                                <div class="form-group col-md-6">
                                    <label>Sort By:</label>
                                    <div class="d-flex align-items-start">
                                        <SearchableSelectField name="" id="" class="form-control">

                                        </SearchableSelectField>
                                        <button id="go-btn" type="submit" class="btn btn-sm btn-primary">Go</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="table-responsive">
                            <table id="make-transfer-table" class="table">
                                <thead>
                                    <tr>
                                        <th>Date Added</th>
                                        <th>Source</th>
                                        <th>VSP</th>
                                        <th>No of Items</th>
                                        <th>Amount</th>
                                        <th>Category/Reason</th>
                                        <th>Report By</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>
                                <tbody>
                                   <tr>
                                        <td>04/12/2023 05:52:57</td>
                                        <td>Receive Purchase</td>
                                        <td>Okaishie Drug Lane</td>
                                        <td>2</td>
                                        <td>130</td>
                                        <td></td>
                                        <td>Abukari Einus</td>
                                        <td>
                                            <button disabled class="btn btn-xs btn-primary">Adjusted</button>
                                        </td>
                                   </tr>
                                   <tr>
                                        <td>04/12/2023 05:52:57</td>
                                        <td>Receive Purchase</td>
                                        <td>Okaishie Drug Lane</td>
                                        <td>2</td>
                                        <td>130</td>
                                        <td></td>
                                        <td>Abukari Einus</td>
                                        <td>
                                            <button data-toggle="modal" data-target="#report_moneyin" class="btn btn-xs btn-primary">Report Money In</button>
                                        </td>
                                   </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>


<div class="modal fade" id="report_moneyin" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Report Money In</h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <!-- php: //= $this->Form->create($addWriteOff, ['url' => ['controller' => 'Invoicing', 'action' => 'reconcile']]); -->
            <div class="container bg-white p-2">
               <div class="container-fluid">
              
               <div class="row mt-4">
                     <div class="col-md-3">
                         <h5>Select Account: </h5>
                     </div>
                     <div class="col-md-8">
                     <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select cash category" name="category_id[]" id="category_id" data-live-search="true"  required>
											
                            <!-- php: foreach($Accounts as $account) { -->
                                <!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN" || $account->accounts_tags[0]->attribute == "MONEY IN OUT"){ -->
                                <option data-content="<!-- php: = $account->account_name =="" ? $account->banks_list->name : $account->account_name --> <span class='<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN") { echo 'badge bg-success'; } else if($account->accounts_tags[0]->attribute == "MONEY IN OUT") { echo 'badge bg-secondary'; } -->'><!-- php: = $account->transaction_code --></span>" value="<!-- php: = $account->id -->"><!-- php: = $account->account_name =="" ? $account->bank_name : $account->account_name -->
                                </option>
                            <!-- php: } -->
                            <!-- php: } -->

                    </SearchableSelectField>
                     </div>
                 </div>
               </div>
            </div>
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center py-1 justify-content-end">
                  <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit <!-- &nbsp;<i class="fa fa-file text-success fa-1x"></i>--> </button>
                  <!-- php: //= $this->Form->end(); -->
                  <button style="height:20px;width:auto;"  class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i class="fa fa-times text-danger fa-1x"></i> </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

    <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.1.1/js/dataTables.dateTime.min.js"></script>
<!-- php: =$this->Html->script('../assets/plugins/mobiscroll/js/mobiscroll.javascript.min.js') -->

<script>
    $('#make-transfer-table').DataTable();

    $('#date-filter').on('change', function(e){
        if(e.target.value == 'custom'){
            $('#custom-date-range-container').removeClass('d-none')
        } else {
            $('#custom-date-range-container').addClass('d-none')
 
        }
    })

    mobiscroll.datepicker('#range', {
    controls: ['datetime'],
    select: 'range',
    startInput: '#start',
    endInput: '#end',
    touchUi: true
});
</script>
`;

export default function ElementElementAccountsAccountAdjustmentsReturns() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
