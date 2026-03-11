const rawHtml = `
<!-- php: // $this->Paginator->options(['defaultModel' => $defaultModel]); -->

<div class="card-head">
    <!-- <header><!-- php: //= $pageTitle --></header> -->
    <header>Out-Patient <!-- php: = $pageTitle --> </header>
    <div class="tools">
        <span>Export: </span>

		<!-- php: $params = $this->request->getAttribute('params'); $queryParams = $this->request->getQueryParams(); $url = $this->Url->build([ 'controller' => 'Billings', 'action' => 'exportDataToExcel', !empty($params[0]) ? $params[0] : null, '_ext' => 'xl... -->

		<a class="btn btn-outline btn-color red"
			title="Export To Excel"
			href="<!-- php: = $url -->">
			Excel <!-- php: = $this->Html->image('../assets/img/excel.png', [ 'style' => 'width: 25px; height: 25px' ]) -->
		</a>

    </div>
    <div class="d-flex align-items-center mb-3" id="patient_location_section">
		<span class="">Working Location</span>
		<div class="col-md-3">

			<SearchableSelectField name="infacilityLocation" class="form-control" id="infacility_user_location_opd">
				<option value=""></option>
			</SearchableSelectField>
		</div>
		<div class="col-md-3">
			<button class="btn btn-info btn-md" onclick="callNextBillingsOpdPatient()">Next Patient</button>
		</div>
	</div>
</div>
<div class="card-body ">
    <div class="container-fluid px-2">

        <div class="row justify-content-center">
            <div style="position:relative" class="container-fluid text-center p-3 mt-3 mb-2">
                <div class="d-flex align-items-center justify-content-end">
                    <button style="background:transparent;z-index:2;" onclick="OpdInvoices();"
                        class="btn btn-xs d-flex align-items-center">
                        <i class="fa fa-refresh"></i>
                        &nbsp;<h5 style="cursor:pointer;font-size:12px!important" class="font-weight-bold">Reset</h5>
                        </button>
                </div>
                <div style="position:relative;top:-40px;" class="container-fluid pl=0">
                    <div class="row">
                        <div class="col-md-2 pl-0">
                            <div style="cursor:pointer;" class="d-flex align-items-center justify-content-start">
                                <button onclick="filterOpdInvoices('0-7days')" style="background:transparent;"
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
                                <button onclick="filterOpdInvoices('7-14days')" style="background:transparent;"
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
                                <button onclick="filterOpdInvoices('14-21days')" style="background:transparent;"
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
                                <button onclick="filterOpdInvoices('21-28days')" style="background:transparent;"
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
                                <button onclick="filterOpdInvoices('>30days')" style="background:transparent;"
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

				<!-- <button onclick="OpdInvoices();" class="btn-primary btn-xs">reset</button> -->
				<!-- <button onclick="filterOpdInvoices('>30days');" class="btn-primary btn-xs">filter</button> -->


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
	<table class="table table-hover table-checkable table-striped order-column full-width" id="all_opd_invoices_table">
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
                <!-- php: if($pageTitle == "Part Payments" || $pageTitle =="Paid Invoices") { -->
					<th>Payment Date</th>
				<!-- php: } -->
				<th>Action</th>
			</tr>
		</thead>
		<tbody id="opd_table">
										
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

	function OpdInvoices(){
        let leUrl = ""
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'pending', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'full', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'part', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else if("<!-- php: = $pageTitle -->" == "Written Off Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'writeoff', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'full', 'opd', '?' => ((isset($this->request->params['?']) ? $this->request->params['?'] : '')) ]) -->'
        }

		$('#all_opd_invoices_table').DataTable().destroy();
        $('#all_opd_invoices_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": true,
            "ordering": false,
            // "paging": false,
            "ajax": htmlDecode(leUrl),
        });
	}


	function fetchActiveLocationsOpd() {
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
					$(\`#infacility_user_location_opd\`).html(result);
					$(\`#infacility_user_location_opd\`).selectpicker('refresh');
			},
			fail: function g(xhr, textStatus, errorThrown) {
					console.log(xhr);
			}
		});
	}

	function filterOpdInvoices(filter){
        let leUrl = ""
        if ("<!-- php: = $pageTitle -->" == "Pending Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'pending', 'opd', ]) -->/'+filter+window.location.search
        } else if("<!-- php: = $pageTitle -->" == "Paid Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'full', 'opd', ]) -->/'+filter+window.location.search
        } else if("<!-- php: = $pageTitle -->" == "Part Payments") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'part', 'opd', ]) -->/'+filter+window.location.search
        } else if("<!-- php: = $pageTitle -->" == "Written Off Invoices") {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'writeoff', 'opd', ]) -->/'+filter+window.location.search
        } else {
            leUrl = '<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getInvoices', 'dfs', 'opd', ]) -->/'+filter+window.location.search
        }
		// $.ajax({
		// 	url: htmlDecode(leUrl),
		// 	type: 'GET',
		// 	success: function(res){
		// 		$('#opd_table').html(res);
		// 	},
		// 	error: function(err){
		// 		console.log('err');
		// 	},
		// })
		$('#all_opd_invoices_table').DataTable().destroy();
        $('#all_opd_invoices_table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": true,
            "ordering": false,
            // "paging": false,
            "ajax": htmlDecode(leUrl),
        });
	}

    $(document).ready(function () {
		fetchActiveLocationsOpd()

		if (sessionStorage.getItem('selectedSoundLocation') != null || sessionStorage.getItem('selectedSoundLocation') != 'null') {
			$('#infacility_user_location_opd').val(sessionStorage.getItem('selectedSoundLocation'))
            $('#infacility_user_location_opd').selectpicker('refresh')
		}
	})

    function callNextBillingsOpdPatient() {
		if (sessionStorage.getItem('selectedSoundLocation') != $('#infacility_user_location_opd').val()) {
			sessionStorage.setItem('selectedSoundLocation', $('#infacility_user_location_opd').val())
			alertify.success('Your in facility location has been set to ' + $("#infacility_user_location_opd").find(':selected').text())
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

    function callSelectedOpdPatient(patient_id) {
		if (sessionStorage.getItem('selectedSoundLocation') != $('#infacility_user_location_opd').val()) {
			sessionStorage.setItem('selectedSoundLocation', $('#infacility_user_location_opd').val())
			alertify.success('Your in facility location has been set to ' + $("#infacility_user_location_opd").find(':selected').text())
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

    $(document).ready(function() {  
		OpdInvoices()
	 })
</script>
`;

export default function ElementElementBillingsViewOpdPayments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
