const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->">

    <div class="card  card-box">
        <div class="card-head">
            <header>Revenue Report</header>
        </div>
        <div class="card-body ">
            <!-- <div class="row">
                <div class="borderBox light bordered col-md-12">
                    <div class="borderBox-body">
                        <div class="tab-content">
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="container">
            <div class="container-fluid d-flex justify-content-end p-3">
                <!-- <button class="btn btn-xs btn-primary">Statement</button> -->
                <button onclick="" class="btn btn-xs btn-danger mx-3">PDF</button>
                <button class="btn btn-xs btn-success">Excel</button>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="">
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">GROSS REVENUE</small>
                            <h3 id="gross_revenue" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">
                               Loading..</h3>
                        </div>
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">ACTUAL/PAID</small>
                            <h3 id="paid" style="margin-top:0px!important;margin-bottom:0px!important;"
                                class="my-0 pb-0">Loading..</h3>
                            <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                        </div>
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">OUTSTANDING/RECEIVABLES</small>
                            <h3 id="outstanding" style="margin-top:0px!important;margin-bottom:0px!important;"
                                class="my-0 pb-0">
                                Loading..</h3>
                            <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="">
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">TAX PAYABLE ON REVENUE</small>
                            <h3 id="tax" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">
                                Loading..</h3>
                        </div>
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">NET EXPECTED REVENUE</small>
                            <h3 id="net" style="margin-top:0px!important;margin-bottom:0px!important;"
                                class="my-0 pb-0">Loading..</h3>
                            <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                        </div>
                    </div>
                </div>
            </div>
            
            <h5 class="mt-5 mb-0 font-weight-bold d-flex justify-content-between align-items-center">Filters: <button
                    class="btn btn-xs" onclick="getRevenueTable()">RESET</button></h5>
                    <div class="row mt-3 d-flex align-items-center">
                        <div class="col-md-2 p-2">
                            <label class="font-weight-bold" for="from">From: </label>
                            <input type="date" name="from" id="from" class="form-control">
                        </div>
                        <div class="col-md-2 p-2">
                            <label class="font-weight-bold" for="to">To: </label>
                            <input type="date" name="to" id="to" class="form-control">
                        </div>
                        <div class="col-md-2 p-2 d-flex align-items-center">
                            <button style="height:30px!important;"
                                class="btn btn-primary btn-xs h-auto mt-4">GO</button>
                        </div>
                    </div>
            <div class="row mt-3">
                <div class="col-md-3 p-2">
                    <SearchableSelectField name="department" id="department" class="form-control">
                        <option value="">Select Department</option>
                        <option value="Inventory">Inventory</option>
                        <option value="Accounts">Accounts</option>
                        <option value="Administration">Administration</option>
                        <option value="Services">Services</option>
                        <option value="Lab">Lab</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Maternal">Maternal</option>
                    </SearchableSelectField>
                </div>
                <div class="col-md-3 p-2">
                    <SearchableSelectField name="payment_method" id="payment_method" class="form-control">
                        <option value="">Select Payment Method</option>
                    </SearchableSelectField>
                </div>
                <div class="col-md-3 p-2">
                    <SearchableSelectField name="revenue_type" id="revenue_type" class="form-control">
                        <option value="">Select Revenue Type</option>
                    </SearchableSelectField>
                </div>
                <div class="col-md-3 p-2">
                    <SearchableSelectField name="status" id="status" class="form-control">
                        <option value="">Select Status</option>
                    </SearchableSelectField>
                </div>
            </div>
           
             <!-- <button onclick="getRevenueTable();" class="btn btn-xs btn-danger">Load Data</button> -->
             <div class="table-responsive mt-5">
                <table class="table table-bordered" id="">
                     <thead>
                        <tr>
                            <th>Period</th>
                            <th>Department</th>
                            <!-- <th>Revenue Type</th> -->
                            <!-- <th>Item</th> -->
                            <th>Amount</th>
                        </tr>
                     </thead>
                     <tbody id="revenue-table-body"></tbody>
                </table>
             </div>
             </div>
        </div>
    </div>
</div>
<!-- <!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') --> -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<script>
   
   getRevenueTable();
   getCashFlowAnalytics();
   
    function getCashFlowAnalytics(){
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'CashFlow', 'action' => 'getCashFlowAnalytics']) -->',
            type: 'GET',
            cache: false,
            beforeSend: function(){
                $("#gross_revenue").html("Loading..");
                $("#paid").html("Loading..");
                $("#tax").html("Loading..");
                $("#net").html("Loading..");
                $("#outstanding").html("Loading..");
            },
            success: function(res){
                console.log(res);
                $("#gross_revenue").html(res.gross_collection);
                $("#paid").html(res.paid);
                $("#tax").html(res.tax);
                $("#net").html(res.net);
                $("#outstanding").html(res.outstanding);
            },
            error: function(err){
                console.log(err);
            }
        })
    }

   
    function getRevenueTable(){
        $.ajax({
            url: '<!-- php: = $this->Url->build(['controller' => 'CashFlow', 'action' => 'getRevenueData']) -->',
            type: 'GET',
            cache: false,
            success: function(res){
                console.log(res);
                $("#revenue-table-body").html("");
                $("#revenue-table-body").html(res);
                $("#revenue-table").DataTable({
                    "order": [ 0, 'desc' ]
                });
            },
            error: function(err){
                console.log(err);
            },
        })
    }
</script>
`;

export default function ElementElementCashflowRevenue() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
