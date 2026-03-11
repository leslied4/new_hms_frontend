const rawHtml = `
<!-- php: // $this->Paginator->options(['defaultModel' => $defaultModel]); -->

<div class="card-head">
	<header><!-- php: = $pageTitle --></header>
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
	<table class="table table-hover table-checkable table-striped order-column full-width customDataTable" id="history_invoices_table" style="width: 100%">
		<thead>
			<tr>
				<th></th>
				<th></th>
				<th>Visit Date</th>
				<th>Name</th>
				<th>Folder No.</th>
				<!-- <th>Co Pay</th> -->
				<th>Type</th>
				<!-- php: if($isClaim) { -->
					<th>Provider</th>
					<th>Visit Status</th>
				<!-- php: } -->				
				<!-- <th>Status</th> -->
				<th>Amount</th>
				<th>Reversed By</th>
				<th>Approved</th>
				<!-- php: if($pageTitle == "Part Payments" || $pageTitle == "Paid Invoices") { -->
					<th>Payment Date</th>
				<!-- php: } -->

			</tr>
		</thead>
		<tbody id="nopd_table">
								
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


	function historyReversed(){
		let leUrl = ""
		console.log("<!-- php: = $pageTitle -->" )
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getReversedInvoicesAll', 'pending', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getReversedInvoicesAll', 'full', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getReversedInvoicesAll', 'part', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getReversedInvoicesAll', 'full', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        }
		// $.ajax({
		// 	url: htmlDecode(leUrl),
		// 	type: 'GET',
		// 	success: function(res){
		// 		$('#nopd_table').append(res);
		// 	},
		// 	error: function(err){
		// 		console.log('err');
		// 	},
		// })

		$('#history_invoices_table').DataTable().destroy();
        $('#history_invoices_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": false,
            "ordering": false,
            // "paging": false,
            "ajax": htmlDecode(leUrl),
        });
	}

	$(document).ready(function() {  
		$('#nopd_table').html('');

		historyReversed()

	})



</script>
`;

export default function ElementElementBillingsHistoryTransactionReversals() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
