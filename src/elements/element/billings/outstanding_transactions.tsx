const rawHtml = `
<div class="row">


	<div class="col-md-6">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card  card-box">
								<div class="card-head">
                                    <header>Labs</header>
									<div class="tools">
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
                                  <table class="table table-hover table-checkable order-column full-width" id="example7">
                                    <thead>
														<tr>
                                                            <th>No.</th>
                                                            <th>Full Name</th>
															<th>Test</th>
															<th>Amount</th>																	
															<th>Status </th>																			
														</tr>
													</thead>
														<tbody>
                                                        <!-- php: $count = 1; foreach ($labRequests as $lab): if(null !==($lab->invoice_id) && !isset($lab->lab_sale)){ -->								
																<tr>			
                                                                            <td>
																				<!-- php: = $count -->
																			</td>											
                                                                            <td id="lab_outstanding_<!-- php: = $lab->id -->">
																				<!-- php: = isset($lab->visit)? '<iframe style="display:none" onload="getOutstandingLabFullName('.$lab->visit->patient_id.'.,'.$lab->id.');"></iframe>' : "" -->
                                                                            </td>												
																			<td>
																				<!-- php: = $lab->lab_test->name -->
																			</td>
																			<td >
																				<!-- php: = $lab->has('lab_test')? $this->Number->precision($lab->lab_test->value_new, 2) : '' -->
																			</td>
																			<td>																			
																				<b><i class="badge btn-primary"> Outstanding </i></b>																				
																			</td>																											
																	</tr>
                                                            <!-- php: $count++; } endforeach; -->	
													</tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

    <div class="col-md-6">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card  card-box">
								<div class="card-head">
                                    <header>Surgery</header>
									<div class="tools">
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="example6">
                                    <thead>
														<tr>
                                                            <th>No.</th>
                                                            <th>Full Name</th>
															<th>Procedure Name</th>
															<th>Amount</th>																	
															<th>Facility Price </th>																			
															<th>Status </th>																			
														</tr>
													</thead>
														<tbody>
                                                            <!-- php: $count = 1; foreach ($surgeryRequests as $surgery): if(null !==($surgery->invoice_id) && !isset($surgery->surgery_sale)){ -->								
																    <tr>			
                                                                            <td>
																			    <!-- php: = $count -->
																			</td>			
                                                                            <td id="surgery_outstanding_<!-- php: = $surgery->id -->">
                                                                                <!-- php: = isset($surgery->visit)? '<iframe style="display:none" onload="getOutstandingSurgeryFullName('.$surgery->visit->patient_id.'.,'.$surgery->id.');"></iframe>' : "" -->
                                                                            </td>													
																			<td>
                                                                                <!-- php: = $surgery->has('surgery_stock')? $surgery->surgery_stock->procedure_name : '' -->
                                                                            </td>
																			<td>
																				<!-- php: = $surgery->has('surgery_stock')? $this->Number->precision($surgery->surgery_stock->unit_value_new, 2) : '' -->
																			</td>
																			<td>
																				<!-- php: = $surgery->has('surgery_stock')? $this->Number->precision($surgery->surgery_stock->facility_price, 2) : '' -->
																			</td>																		
																			<td>
																				<b><i class="badge btn-primary">outstanding</i></b>
																			</td>																														
																	</tr>
                                                            <!-- php: $count++; } endforeach; -->	
													</tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


    <div class="col-md-6">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo">
					<div class="row">
						<div class="col-md-12">
							<div class="card  card-box">
								<div class="card-head">
                                    <header>Drugs</header>
									<div class="tools">
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="example9">
                                    <thead>
														<tr>
                                                            <th>No.</th>
                                                            <th>Full Name</th>
															<th>Drug</th>																
                                                            <th>Requested Date </th>														
															<th>Status </th>		
														</tr>
													</thead>
														<tbody>
                                                            <!-- php: $count = 1; foreach ($medicationRequests as $value): if(null !==($value->invoice_id) && !isset($value->drug_sale)){ -->								
																<tr>			
                                                                            <td>
																				<!-- php: = $count -->
																			</td>			
                                                                            <td id="medication_outstanding_<!-- php: = $value->id -->">
                                                                                <!-- php: = isset($value->visit)? '<iframe style="display:none" onload="getOutstandingMedicationFullName('.$value->visit->patient_id.'.,'.$value->id.');"></iframe>' : "" -->
                                                                            </td>													
																			<td><!-- php: = $value->drug->name --></td>
                                                                            <td><!-- php: = $value->date_created --></td>
																			<td>
																		         <b><i class="badge btn-primary"> outstanding </i></b>
																			</td>	
																	</tr>
                                                            <!-- php: $count++; } endforeach; -->	
													</tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


    <div class="col-md-6">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo">
					<div class="row">
						<div class="col-md-12">
							<div class="card  card-box">
								<div class="card-head">
                                    <header>Other Services</header>
									<div class="tools">
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="example11">
                                    <thead>
														<tr>
                                                            <th>No.</th>
                                                            <th>Full Name</th>
															<th>Service</th>	
                                                            <th>Amount </th>
                                                            <th>Facility Price </th>																																																										
                                                            <th >Requested Date </th>														
															<th>Status </th>		
														</tr>
													</thead>
														<tbody>
                                                            <!-- php: $count = 1; foreach ($otherServiceRequests as $value): if(null !==($value->invoice_id) && !isset($value->other_service_sale)){ -->								
																<tr>	
                                                                            <td>
																			    <!-- php: = $count -->
																			</td>			
                                                                            <td id="other_service_outstanding_<!-- php: = $value->id -->">
                                                                                <!-- php: = isset($value->visit)? '<iframe style="display:none" onload="getOutstandingOtherServiceFullName('.$value->visit->patient_id.'.,'.$value->id.');"></iframe>' : "" -->
                                                                            </td>														
																			<td class="text-left"><!-- php: = isset($value->other_service_stock)? $value->other_service_stock->procedure_name: "" --></td>
                                                                            <td class="text-left"><!-- php: = isset($value->other_service_stock)? $this->Number->precision($value->other_service_stock->unit_value_new, 2) : "" --></td>
                                                                            <td class="text-left"><!-- php: = isset($value->other_service_stock)? $this->Number->precision($value->other_service_stock->facility_price, 2) : "" --></td>
                                                                            <td class="text-left"><!-- php: = $value->date_created --></td>
																			<td>
																		         <b><i class="badge btn-primary"> outstanding </i></b>
																			</td>	
																	</tr>
                                                            <!-- php: $count++; } endforeach; -->	
													</tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



</div>











<script>
    function getOutstandingLabFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#lab_outstanding_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>

<script>
    function getOutstandingMedicationFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#medication_outstanding_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>

<script>
    function getOutstandingSurgeryFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#surgery_outstanding_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>


<script>
    function getOutstandingOtherServiceFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#other_service_outstanding_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>
`;

export default function ElementElementBillingsOutstandingTransactions() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
