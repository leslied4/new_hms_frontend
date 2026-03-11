const rawHtml = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pnotify/3.2.1/pnotify.buttons.css" />
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
        width: 30% !important;
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
                <!--  
               
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
                                <!-- php: = $this->Form->create($addBudget, ['url' => ['controller' => 'Budgeting', 'action' => 'addBudget'],'id' =>'msform','novalidate', 'type' => 'file']); -->
                                <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Name</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="name" id="name" class="form-control">
                                                </div>
                                            </div>

                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Amount</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="number" name="amount" id="amount" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>From</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="datetime-local" name="start" id="start" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>To</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="datetime-local" name="end" id="end" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Department</h5>
                                                </div>
                                                <div class="col-md-6">
                                                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="department[]" id="department" title="Select Department(s)"  data-live-search="true" multiple required>
								<!-- php: foreach($departments as $department) { echo '<option value="'.$department->id.'">'.$department->name.'</option>'; } -->				
											
							    </SearchableSelectField>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-2 text-left">
                                                    <h5>Expense Category</h5>
                                                </div>
                                                <div class="col-md-6">
                                                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="expense_categories[]" id="expense_categories" title="Select Category/Categories"  data-live-search="true" multiple required>
								<!-- php: foreach($categories as $category){ echo '<option value="'.$category->id.'">'.$category->name.'</option>'; } -->				
											
							    </SearchableSelectField>
                                                </div>
                                            </div>




                                        <input type="submit" id="next2" name="next" style="width:150px"
                                            class="next action-button btn btn-primary" value="Submit" />
                                        <!-- <input type="button" name="previous" style="width:125px" class="previous action-button-previous btn btn-secondary" value="Previous - Payer" />
                       -->

                                   
                                   
                                    <!-- php: = $this->Form->end() -->
                                </div>
                            </div>
                        </div>
                    </div>
</div>
           
                <div class="tab-pane active" id="view_bank_account">
                    <div class="container-fluid px-5">
                        <div class="table-responsive">
                            <table id="budgetstable" class="table table-hover customDatable full-width accountstable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Valid Until</th>
                                        <th>Department</th>
                                        <th>Expense Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <!-- php: foreach($budgets as $budget){ -->
                                    <tr>
                                    <td><!-- php: = $budget->name --></td>
                                    <td> <a class="text-primary" data-toggle="modal" data-target="#budget_summary_<!-- php: =$budget->id -->" href="javascript:"><!-- php: = $budget->amount --></a></td>
                                    <td><!-- php: = $budget->end --></td>
                                    <td><!-- php: foreach($budget->budgets_departments as $department) { -->
                                        <span class="badge badge-primary"><!-- php: = $department->department->name --></span>
                                        <!-- php: } -->
                                    </td>
                                    <td><!-- php: foreach($budget->budget_expense_category as $category) { -->
                                        <span class="badge badge-primary"><!-- php: = $category->expenses_category->name --></span>
                                        <!-- php: } -->
                                    </td>
                                    <td>
                                        <a href="javascript:" class="btn btn-warning btn-sm">Edit</a><br/>
                                        <a href="javascript:" class="btn btn-success btn-sm">Approve</a><br/>
                                        <a href="javascript:" class="btn btn-info btn-sm">Decline</a><br/>
                                        <!-- <a href="javascript:" class="btn btn-danger btn-sm">Delete</a> -->
                                        <!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Budgeting','action'=>'deleteBudget',$budget->id], ['class' => 'btn btn-danger btn-sm']) -->
                                    </td>
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
<!-- php: foreach($budgets as $budget){ -->
    <!-- amount popup --> 
<div class="modal fade" id="budget_summary_<!-- php: =$budget->id -->" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="container px-0 border border-2 border-<!-- php: = $theme2 -->">
            <div class="container-fluid pr-0 bg-<!-- php: = $theme2 -->">
               <div class="d-flex align-items-center justify-content-between">
                  <h4 class="text-slate-900 my-0">Summary for <!-- php: = $budget->name --></h4>
                  <div>
                     <button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
                  </div>
               </div>
            </div>
            <div class="container bg-white p-2">
          
            <table id='pending_amt_<!-- php: $budget->id -->' class="table table-bordered mt-3 p-3">
               <thead>
               <tr>
                   <th>Date</th>
                    <th>Amount</th>
                    <th>Balance Left</th>
                    <th>Recorded By</th>
                </tr>
               </thead>
               <tbody>
                

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
<!-- php: } -->

<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<!-- <script src="https://colorlib.com/polygon/vendors/jquery/dist/jquery.min.js"></script> -->
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.js"></script>
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.buttons.js"></script>

<script>
    $('#budgetstable').dataTable();
</script>
`;

export default function ElementElementBudgetingCreatebudget() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
