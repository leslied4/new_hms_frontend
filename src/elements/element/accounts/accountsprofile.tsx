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
    }

<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo ' .invoice-table-header-green{ border:2px solid #27ae60; border-radius:15px; }'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo ' .invoice-table-header{ b... -->

</style>
<div class="row">
    <div class="borderBox light bordered col-md-12">
        <!-- <div class="borderBox-title tabbable-line">
            <div class="caption">
				<span class="caption-subject font-dark bold uppercase">accounts</span>
			</div>
            <ul class="nav nav-tabs">

                <li class="nav-item">
                    <a href="#create_bank_account" class="dropdown-toggle" data-toggle="tab"> Create</a>
                </li>

                <li class="nav-item">
                    <a href="#view_bank_account" data-toggle="tab">View </a>
                </li>

                 <li class="nav-item">
					 <a href="#pending_account" data-toggle="tab"> Pending </a>
				  </li>
               
                <li class="nav-item">
					<a href="#paid_account" data-toggle="tab"> Paid </a>
				</li>
            </ul>
        </div> -->
        <div class="borderBox-body">
            <div class="tab-content">
              
                <div class="tab-pane active" id="view_bank_account">
                    <div class="container-fluid mt-3 px-5">
                    <div class="table-responsive">
								<table id="accountprofile" class="table table-hover customDatable full-width">
									<thead>
										<tr>
											<th><span style="color:#27ae60" class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo 'invoice-table-header-green'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'invoice-table-header'; } else{ echo 'invoice-table-both'; } --> py-2 px-3">Date</span></th>
									
                                            <th><span class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo 'invoice-table-header-green'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'invoice-table-header'; } else{ echo 'invoice-table-both'; } --> py-2 px-3">Payer Name</span></th>
                                            <th><span class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo 'invoice-table-header-green'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'invoice-table-header'; } else{ echo 'invoice-table-both'; } --> py-2 px-3">Category</span></th>
                                            <th>Tax(%)</th>
                                            <th><span class="<!-- php: if($account->accounts_tags[0]->attribute == "MONEY IN"){ echo 'invoice-table-header-green'; } else if($account->accounts_tags[0]->attribute == "MONEY OUT") { echo 'invoice-table-header'; } else{ echo 'invoice-table-both'; } --> py-2 px-3">Amount</span></th>
                                            <th>Action</th>
										</tr>
									</thead>
									<tbody>
                                        <tr>
                                            <td>2022-05-21</td>
                                            <td>TEST PAYER <span class="badge badge-primary">online</span> </td>
                                            <td>Test Category</td>
                                            <td>20</td>
                                            <td><a href="javascript:">2000</a></td>
                                            <td>
                                                <a href="javascript:" class="btn btn-sm btn-secondary">Disable</a>
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


<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/plugins/bootstrap/dataTables.bootstrap4.min.js') -->
<!-- php: =$this->Html->script('../assets/js/pages/table/table_data.js') -->
<!-- <script src="https://colorlib.com/polygon/vendors/jquery/dist/jquery.min.js"></script> -->
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.js"></script>
<script src="https://colorlib.com/polygon/vendors/pnotify/dist/pnotify.buttons.js"></script>
<script>
    $('#accountstable').DataTable();
    $('#bank_branch').on('change', function () {
        $('#branch_code').val('1234');
    });

</script>

`;

export default function ElementElementAccountsAccountsprofile() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
