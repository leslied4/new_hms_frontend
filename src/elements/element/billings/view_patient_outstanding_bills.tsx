const rawHtml = `
<!-- php: // $this->Paginator->options(['defaultModel' => $defaultModel]); -->

<div class="card-head">
	<header><!-- php: = $pageTitle --></header>
	<div class="tools">
		<span>Export: </span>
		<!-- a class="btn-color btn-outline btn btn-outline red" title="Export To Excel" href="<!-- php: //= $this->Url->build($this->request->here(false)) . '.xslx' -->"> Excel <!-- php: //= $this->Html->image('../assets/img/excel.png', ['style' => 'width: 25px; height: 25px']) --></a -->
		<a class="btn-color btn-outline btn btn-outline red" title="Export To Excel" href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Billings', 'action' => 'exportDataToExcel', sizeof($this->request->getAttribute('params')) > 0 ? $this->request->getAttribute('params')[0] : null, '_ext' => 'xlsx', '?' => (isset($this->request->... -->"> Excel <!-- php: = $this->Html->image('../assets/img/excel.png', ['style' => 'width: 25px; height: 25px']) --></a>
	</div>
</div>
<div class="card-body ">
	<div class="row justify-content-end">

		<div class="col-md-8">
			<!-- php: = $this->Form->create(null, ['type' => 'get']); -->
				<div class="input-group" style="float: right;">
					<input type="date" name="from" id="from" class="form-control" placeholder="From (Date)">
					<input type="date" name="to" id="to" class="form-control" placeholder="To (Date)">

					<input type="text" class="form-control" name="searchValue" type="text" id="paymentSearchBox" placeholder="Search" value="<!-- php: = $searchValue -->" />
					<span class="input-group-btn">
						<button type="submit" class="btn btn-info btn-flat">Go!</button>
					</span>
				</div>

			<!-- php: = $this->Form->end() -->
		</div>
	</div>
	
	<div style="clear: both"></div>
	
	<div class="table-scrollable">
	<table class="table table-hover table-checkable table-striped order-column full-width">
		<thead>
			<tr>
				<th></th>
				<th></th>
				<th>Visit Date</th>
				<th>Name</th>
				<th>Folder No.</th>
				<th>Co Pay</th>
				<th>Type</th>			
				<th>Status</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody id="nopd_table">
            <!-- php: = $table_data -->
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

	function pdInvoices(){
		let leUrl = ""
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'pending', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'full', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'part', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'dfs', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        }
		$.ajax({
			url: htmlDecode(leUrl),
			type: 'GET',
			success: function(res){

				$('#nopd_table').append(res);
			},
			error: function(err){
				console.log('err');
			},
		})
	}
	function npdInvoices(){
		let leUrl = ""
		console.log("<!-- php: = $pageTitle -->" )
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'pending', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'full', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'part', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'fsd', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        }
		$.ajax({
			url: htmlDecode(leUrl),
			type: 'GET',
			success: function(res){
				$('#nopd_table').append(res);
			},
			error: function(err){
				console.log('err');
			},
		})
	}

	$(document).ready(function() {  
		// $('#nopd_table').html('');
		// pdInvoices()
		// npdInvoices()

	 })

</script>
`;

export default function ElementElementBillingsViewPatientOutstandingBills() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
