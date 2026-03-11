const rawHtml = `
<!-- php: // $this->Paginator->options(['defaultModel' => $defaultModel]); -->

<div class="card-head">
    <!-- <header><!-- php: //= $pageTitle --></header> -->
    <header>In-Patient <!-- php: = $pageTitle --> </header>
    <div class="tools">
        <span>Export: </span>
        <!-- a class="btn-color btn-outline btn btn-outline red" title="Export To Excel" href="<!-- php: //= $this->Url->build($this->request->here(false)) . '.xslx' -->"> Excel <!-- php: //= $this->Html->image('../assets/img/excel.png', ['style' => 'width: 25px; height: 25px']) --></a -->
		<!-- php: $params = $this->request->getAttribute('params'); $queryParams = $this->request->getQueryParams(); $url = $this->Url->build([ 'controller' => 'Billings', 'action' => 'exportDataToExcel', $params[0] ?? null, '_ext' => 'xlsx', '?' => $queryPa... -->

        <a class="btn btn-outline btn-color red"
            title="Export To Excel"
            href="<!-- php: = $url -->">
            Excel <!-- php: = $this->Html->image('../assets/img/excel.png', [ 'style' => 'width:25px; height:25px' ]) -->
        </a>

    </div>
</div>
<div class="card-body ">
    <div class="container-fluid px-2">

        <div class="row justify-content-center">
            <div style="position:relative" class="container-fluid text-center p-3 mt-3 mb-2">
                <div class="d-flex align-items-center justify-content-end">
                    <button style="background:transparent;z-index:2;" onclick="IpdInvoices();"
                        class="btn btn-xs d-flex align-items-center">
                        <i class="fa fa-refresh"></i>
                        &nbsp;<h5 style="cursor:pointer;font-size:12px!important" class="font-weight-bold">Reset</h5>
                        </button>
                </div>
                <div style="position:relative;top:-40px;" class="container-fluid pl=0">
                    <div class="row">
                        <div class="col-md-2 pl-0">
                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                <button onclick="filterIpdInvoices('0-7days')" style="background:transparent;"
                                    class="btn btn-xs d-flex align-items-center">
                                    <div style="height:15px;width:15px;border-radius:100px;background-color:#8e44ad;cursor:pointer;"
                                        class="indicator"></div>
                                    &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">
                                        0-7 days</h5>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                <button onclick="filterIpdInvoices('7-14days')" style="background:transparent;"
                                    class="btn btn-xs d-flex align-items-center">
                                    <div style="height:15px;width:15px;border-radius:100px;background-color:#3867d6;cursor:pointer;"
                                        class="indicator"></div>
                                    &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">
                                        7-14 days</h5>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                <button onclick="filterIpdInvoices('14-21days')" style="background:transparent;"
                                    class="btn btn-xs d-flex align-items-center">
                                    <div style="height:15px;width:15px;border-radius:100px;background-color:#26de81;cursor:pointer;"
                                        class="indicator"></div>
                                    &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">
                                        14-21 days</h5>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="d-flex align-items-center justify-content-start">
                                <button onclick="filterIpdInvoices('21-28days')" style="background:transparent;"
                                    class="btn btn-xs d-flex align-items-center">
                                    <div style="height:15px;width:15px;border-radius:100px;background-color:#fff200;cursor:pointer;"
                                        class="indicator"></div>
                                    &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">
                                        21-29 days</h5>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="d-flex align-items-center justify-content-start">
                                <button onclick="filterIpdInvoices('>30days')" style="background:transparent;"
                                    class="btn btn-xs d-flex align-items-center">
                                    <div style="height:15px;width:15px;border-radius:100px;background-color:tomato;cursor:pointer;"
                                        class="indicator"></div>
                                    &nbsp;<h5 style="cursor:pointer;font-size:12px!important;" class="font-weight-bold">
                                        >30 days</h5>
                                </button>
                            </div>
                        </div>


                    </div>
                </div>

				<!-- <button onclick="IpdInvoices();" class="btn-primary btn-xs">reset</button> -->
				<!-- <button onclick="filterIpdInvoices('>30days');" class="btn-primary btn-xs">filter</button> -->


            </div>
        </div>
    </div>
	<div class="row justify-content-end">

		<div class="col-md-8">
			<!-- php: = $this->Form->create(null, ['type' => 'get']); -->
				<div class="input-group" style="float: right;">
					<input type="date" name="from" id="from" class="form-control" placeholder="From (Date)">
					<input type="date" name="to" id="to" class="form-control" placeholder="To (Date)">

					<!-- <input type="text" class="form-control" name="searchValue" type="text" id="paymentSearchBox" placeholder="Search" value="<!-- php: // $searchValue -->" /> -->
					<span class="input-group-btn">
						<button type="submit" class="btn btn-info btn-flat">Go!</button>
					</span>
				</div>

			<!-- php: = $this->Form->end() -->
		</div>
	</div>
	
	<div style="clear: both"></div>
	
	<div class="table-scrollable">
	<table class="table table-hover table-checkable table-striped order-column full-width" id="all_ipd_invoices_table">
		<thead>
			<tr>
				<th></th>
				<th></th>
				<th>Visit Date</th>
				<th>Name</th>
				<th>Length of Stay (LOS) (days)</th>
				<th>Folder No.</th>
				<th>Co Pay</th>
				<th>Type</th>
				<!-- php: if($isClaim) { -->
					<th>Provider</th>
					<th>Visit Status</th>
				<!-- php: } -->				
				<th>Status</th>
                <!-- php: if($pageTitle == "Part Payments" || $pageTitle == "Paid Invoices") { -->
					<th>Payment Date</th>
				<!-- php: } -->
				<th>Action</th>
			</tr>
		</thead>
		<tbody id="ipd_table">
										
		</tbody>
	</table>
	</div>
	
	<div class="row">

	</div>
	

</div>
<script>

    function htmlDecode(input) {
		var doc = new DOMParser().parseFromString(input, "text/html");
		return doc.documentElement.textContent;
	}
	
	function IpdInvoices(){
        let leUrl = ""
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'pending', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'full', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Written Off Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'writeoff', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'part', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'full', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        }
    
        $('#all_ipd_invoices_table').DataTable().destroy();
        $('#all_ipd_invoices_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": true,
            "ordering": false,
            // "paging": false,
            "ajax": htmlDecode(leUrl),
        });
	}

	function filterIpdInvoices(filter){
		let leUrl = ""
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'pending', 'opd', ]) -->/' + filter + window.location.search
        } else if("<!-- php: = $pageTitle -->" == "Part Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'full', 'opd', ]) -->/' + filter + window.location.search
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'part', 'opd', ]) -->/' + filter + window.location.search
        } else if("<!-- php: = $pageTitle -->" == "Written Off Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'writeoff', 'opd', ]) -->/' + filter + window.location.search
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'dfs', 'opd', ]) -->/' + filter + window.location.search
        }
		// $.ajax({
		// 	url: htmlDecode(leUrl),
		// 	type: 'GET',
		// 	success: function(res){
		// 		$('#ipd_table').html(res);
		// 	},
		// 	error: function(err){
		// 		console.log('err');
		// 	},
		// })
        $('#all_ipd_invoices_table').DataTable().destroy();
        $('#all_ipd_invoices_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": true,
            "ordering": false,
            // "paging": false,
            "ajax": htmlDecode(leUrl),
        });
        
	}

    $(document).ready(function() {  
		IpdInvoices()
	 })
</script>
`;

export default function ElementElementBillingsViewIpdPayments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
