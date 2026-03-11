const rawHtml = `
<!-- php: // $this->Paginator->options(['defaultModel' => $defaultModel]); $params = $this->request->getAttribute('params'); $queryParams = $this->request->getQueryParams(); $url = Cake\Routing\Router::url([ 'controller' => 'Billings', 'action' => 'e... -->

<div class="card-head">
	<header><!-- php: = $pageTitle --></header>
	<div class="tools">
		<span>Export: </span>
		<!-- a class="btn-color btn-outline btn btn-outline red" title="Export To Excel" href="<!-- php: //= $this->Url->build($this->request->here(false)) . '.xslx' -->"> Excel <!-- php: //= $this->Html->image('../assets/img/excel.png', ['style' => 'width: 25px; height: 25px']) --></a -->
		<a target="_blank" 
			class="btn btn-outline btn-color red" 
			title="Export To Excel" 
			href="<!-- php: = $url -->">
			Excel <!-- php: = $this->Html->image('../assets/img/excel.png', ['style' => 'width: 25px; height: 25px']) -->
		</a>

		<!-- php: $params = $this->request->getAttribute('params'); $queryParams = $this->request->getQueryParams(); $url = $this->Url->build([ 'controller' => 'Billings', 'action' => 'exportDataToPdf', !empty($params[0]) ? $params[0] : null, '?' => $queryPa... -->

		<a target="_blank"
			class="btn btn-outline btn-color red"
			title="Export To PDF"
			href="<!-- php: = $url -->">
			PDF <!-- php: = $this->Html->image('../assets/img/pdf.png', ['style' => 'width: 25px; height: 25px']) -->
		</a>

	</div>
</div>
<div class="card-body ">
	<div class="d-flex align-items-center mb-3" id="patient_location_section">
		<span class="">Working Location</span>
		<div class="col-md-3">

			<SearchableSelectField name="infacilityLocation" class="form-control" id="infacility_user_location">
				<option value=""></option>
			</SearchableSelectField>
		</div>
		<div class="col-md-3">
			<button class="btn btn-info btn-md" onclick="callNextBillingsPatient()">Next Patient</button>
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
		<table class="table table-hover table-checkable table-striped order-column full-width customDataTable" id="all_invoices_table" style="width: 100%">
			<thead>
				<tr>
					<th></th>
					<th></th>
					<th>Visit Date</th>
					<th>Name</th>
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

	function pdInvoices(){
		// let leUrl = ""
        // if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
        //     leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'pending', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        // } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
        //     leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'full', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        // } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
        //     leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'part', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        // } else {
        //     leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'dfs', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        // }
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
        } else if("<!-- php: = $pageTitle -->" == "Written Off Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'writeoff', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoicesAll', 'full', 'ipd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
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

		$('#all_invoices_table').DataTable().destroy();
        $('#all_invoices_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": true,
            "ordering": false,
            // "paging": false,
            "ajax": htmlDecode(leUrl),
        });
	}

	$(document).ready(function() {  
		$('#nopd_table').html('');
		pdInvoices()
		npdInvoices()

	})

	function fetchActiveLocations() {
		$.ajax({
			type: 'GET',
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'infacilityLocations']) -->",
			data: [],
			success: function g(data, textStatus) {
					let result = ''
					data.forEach(ele => {
						result += \`<option data-content='\${ele.name} <span class="badge badge-danger badge-pill">\${ele.specialty.name}</span>' value="\${ele.id}">\${ele.name}</option>\`
					});
					if (data.length < 1) {
						$('#patient_location_section').hide()
					}
					$(\`#infacility_user_location\`).html(result);
					$(\`#infacility_user_location\`).selectpicker('refresh');
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}

	$(document).ready(function () {
		fetchActiveLocations()

		if (sessionStorage.getItem('selectedSoundLocation') != null || sessionStorage.getItem('selectedSoundLocation') != 'null') {
			$('#infacility_user_location').val(sessionStorage.getItem('selectedSoundLocation'))
			$('#infacility_user_location').selectpicker('refresh')
		}
	})

	function callNextBillingsPatient() {
		if (sessionStorage.getItem('selectedSoundLocation') != $('#infacility_user_location').val()) { 
			sessionStorage.setItem('selectedSoundLocation', $('#infacility_user_location').val())
			alertify.success('Your in facility location has been set to ' + $("#infacility_user_location").find(':selected').text())
		}
		let leUrl = ""
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'pending', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'full', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'part', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'dfs', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        }
		$.ajax({
			type: 'POST',
			url: htmlDecode(leUrl),
			data: {
				'infacility_location_id': sessionStorage.getItem('selectedSoundLocation')
			},
			success: function g(data, textStatus) {
				if (data) {
					alertify.success('Fetching Next Patient In queue')
				} else {
					alertify.error('An Error Occured while fetching next patient. Please try again.')

				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}

	function callSelectedBillingsPatient(patient_id) {
		if (sessionStorage.getItem('selectedSoundLocation') != $('#infacility_user_location').val()) {
			sessionStorage.setItem('selectedSoundLocation', $('#infacility_user_location').val())
			alertify.success('Your in facility location has been set to ' + $("#infacility_user_location").find(':selected').text())
		}
		if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'pending', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'full', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'part', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'callNextBillingsOPDPatient', 'dfs', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        }
		$.ajax({
			type: 'POST',
			url: htmlDecode(leUrl),
			data: {
				'infacility_location_id': sessionStorage.getItem('selectedSoundLocation'),
				'patient_id': patient_id,
			},
			success: function g(data, textStatus) {
				if (data) {
					$('#called_me'+patient_id).html('Re-call')
					alertify.success('Fetching Next Patient In queue')
				} else {
					alertify.error('An Error Occured while fetching next patient. Please try again.')

				}
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}

</script>
`;

export default function ElementElementBillingsViewPayments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
