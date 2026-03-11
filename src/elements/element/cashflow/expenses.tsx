const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->">

    <div class="card  card-box">
        <div class="card-head">
            <header>Expenses Report</header>
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
                <button class="btn btn-xs btn-danger mx-3">PDF</button>
                <button class="btn btn-xs btn-success">Excel</button>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="">
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">GROSS EXPECTED EXPENDITURE</small>
                            <h3 id="current" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">
                                Loading..</h3>
                        </div>
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">ACTUAL/PAID</small>
                            <h3 id="approved" style="margin-top:0px!important;margin-bottom:0px!important;"
                                class="my-0 pb-0">Loading..</h3>
                            <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                        </div>
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">OUTSTANDING/PAYABLES</small>
                            <h3 id="approved" style="margin-top:0px!important;margin-bottom:0px!important;"
                                class="my-0 pb-0">Loading..</h3>
                            <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="">
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">TAX PAYABLE ON EXPENSES</small>
                            <h3 id="current" style="margin-top:0px!important;margin-bottom:0px!important;" class="mt-0">
                                Loading..</h3>
                        </div>
                        <div class="col-md-12 card p-3">
                            <small class="text-dark mb-0 pb-0">NET EXPENDITURE</small>
                            <h3 id="approved" style="margin-top:0px!important;margin-bottom:0px!important;"
                                class="my-0 pb-0">Loading..</h3>
                            <!-- <small class="text-secondary mt-0">1-15 days</small> -->
                        </div>
                    </div>
                </div>
            </div>
            
            <h5 class="mt-5 mb-0 font-weight-bold d-none justify-content-between align-items-center">Filters: <button
                    class="btn btn-xs">RESET</button></h5>
            <div class="row mt-3 d-none">
                <div class="col-md-3 p-2">
                    <SearchableSelectField name="department" id="department" class="form-control">
                        <option value="">Select Department</option>
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
            <div class="row mt-3 d-none align-items-center d-none">
                <div class="col-md-2 p-2">
                    <SearchableSelectField name="department" id="department" class="form-control">
                        <option value="">From</option>
                    </SearchableSelectField>
                </div>
                <div class="col-md-2 p-2">
                    <SearchableSelectField name="payment_method" id="payment_method" class="form-control">
                        <option value="">To</option>
                    </SearchableSelectField>
                </div>
                <button style="height:30px!important;" class="btn btn-primary btn-xs h-auto">GO</button>
            </div>

             <div class="table-responsive mt-5">
                <table class="table" id="expense-table">
                     <thead>
                        <tr>
                            <!-- <th>Period</th> -->
                            <th>Department</th>
                            <th>Expense Type</th>
                            <th>Item</th>
                            <th>Amount</th>
                        </tr>
                     </thead>
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
    $("#expense-table").DataTable();
</script>
`;

export default function ElementElementCashflowExpenses() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
