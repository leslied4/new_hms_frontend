const rawHtml = `
<div class="row">


	<div class="col-md-6">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo">
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
									<table class="table table-hover table-checkable order-column full-width" id="example5">
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
                                                        <!-- php: $count = 1; foreach ($labRequests as $lab): if(null !==($lab->invoice_id) && isset($lab->lab_sale)){ -->								
																<tr>	
                                                                            <td>
																				<!-- php: = $count -->
																			</td>											
                                                                            <td id="lab_paid_<!-- php: = $lab->id -->">

																				<!-- php: = isset($lab->visit)? '<iframe style="display:none" onload="getPaidLabFullName('.$lab->visit->patient_id.'.,'.$lab->id.');"></iframe>' : "" -->
                                                                            </td>
																			<td>
																				<!-- php: = $lab->lab_test->name -->
																			</td>
																			<td>
																				<!-- php: = $lab->has('lab_sale')? $this->Number->precision($lab->lab_sale->amount, 2) : '' -->
																			</td>
																			<td>																			
																				<b><i class="badge btn-success"> paid </i></b>																				
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
                                    <header>Surgery</header>
									<div class="tools">
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="example8">
                                    <thead>
														<tr>
                                                            <th>No.</th>
                                                            <th>Full Name</th>
															<th>Name</th>
															<th>Amount</th>																			
															<th>Status </th>																			
														</tr>
													</thead>
														<tbody>
                                                            <!-- php: $count = 1; foreach ($surgeryRequests as $surgery): if(null !==($surgery->invoice_id) && isset($surgery->surgery_sale)){ -->								
																    <tr>
                                                                            <td>
																				<!-- php: = $count -->
																			</td>			
                                                                            <td id="surgery_paid_<!-- php: = $surgery->id -->">
                                                                                <!-- php: = isset($surgery->visit)? '<iframe style="display:none" onload="getPaidSurgeryFullName('.$surgery->visit->patient_id.'.,'.$surgery->id.');"></iframe>' : "" -->
                                                                            </td>															
																			<td class="text-left">
                                                                                <!-- php: = $surgery->has('surgery_stock')? $surgery->surgery_stock->procedure_name : '' -->
                                                                            </td>
                                                                            <td>
																				<!-- php: = $surgery->has('surgery_sale')? $this->Number-precision($surgery->surgery_sale->amount, 2) : '' -->
																			</td>
																			<td>
																				<b><i class="badge btn-success">Paid</i></b>
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


    <div class="col-md-12">
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
									<table class="table table-hover table-checkable order-column full-width" id="example10">
                                    <thead>
														<tr>
                                                            <th>No.</th>
                                                            <th>Full Name</th>				
															<th>Drug</th>
															<th>Quantity </th>																			
															<th>Unit Cost</th>																		
															<th>Total </th>																			
                                                            <th>Payment Date</th>														
															<th>Status </th>		
														</tr>
													</thead>
														<tbody>
                                                            <!-- php: $count = 1; foreach ($medicationRequests as $value): if(null !==($value->invoice_id) && isset($value->drug_sale)){ -->								
																<tr>	
                                                                            <td>
																				<!-- php: = $count -->
																			</td>			
                                                                            <td id="medication_paid_<!-- php: = $value->id -->">
                                                                                <!-- php: = isset($value->visit)? '<iframe style="display:none" onload="getPaidMedicationFullName('.$value->visit->patient_id.'.,'.$value->id.');"></iframe>' : "" -->
                                                                            </td>											
																			<td><!-- php: = $value->drug->name --></td>
																			<td><!-- php: = $value->has('drug_sale') ? $value->drug_sale->quantity_sold : '' --></td>
																			<td><!-- php: = $value->has('drug_sale') ? $value->drug_sale->unit_selling_price : '' --></td>
																			<td><!-- php: = $value->has('drug_sale') ? $this->Number->precision($value->drug_sale->unit_selling_price * $value->drug_sale->quantity_sold, 2) : '' --></td>
                                                                            <td><!-- php: = $value->has('drug_sale') ? $value->drug_sale->date_added : '' --></td>											
																			<td>
																		         <b><i class="badge btn-success"> paid </i></b>
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
									<table class="table table-hover table-checkable order-column full-width" id="example10">
                                    <thead>
														<tr>
                                                            <th>No.</th>
                                                            <th>Full Name</th>
															<th>Service</th>	
                                                            <th>Amount </th>																													
                                                            <th>Payment Date </th>														
															<th>Status </th>		
														</tr>
													</thead>
														<tbody>
                                                            <!-- php: $count = 1; foreach ($otherServiceRequests as $value): if(null !==($value->invoice_id) && isset($value->other_service_sale)){ -->								
																<tr>	
                                                                            <td>
																			    <!-- php: = $count -->
																			</td>			
                                                                            <td id="other_service_paid_<!-- php: = $value->id -->">
                                                                                <!-- php: = isset($value->visit)? '<iframe style="display:none" onload="getPaidOtherServiceFullName('.$value->visit->patient_id.'.,'.$value->id.');"></iframe>' : "" -->
                                                                            </td>														
																			<td><!-- php: = isset($value->other_service_stock)? $value->other_service_stock->procedure_name: "" --></td>
                                                                            <td><!-- php: = isset($value->other_service_sale)? $value->other_service_sale->amount : "" --></td>
                                                                            <td><!-- php: = isset($value->other_service_sale)? $value->other_service_sale->date_added : "" --></td>
																			<td>
																		         <b><i class="badge btn-success"> paid </i></b>
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
    function getPaidLabFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#lab_paid_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>

<script>
    function getPaidMedicationFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#medication_paid_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>

<script>
    function getPaidSurgeryFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#surgery_paid_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>


<script>
    function getPaidOtherServiceFullName($str, $id) 
    {	
		if ($str == "")
		 {
			 return "";
         }

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (xhttp.status == 200) {	

                var json = JSON.parse(xhttp.responseText);
                $('#other_service_paid_' + $id).text(json[0].first_name + " " + json[0].last_name);
		}
	}	
        xhttp.open("GET", "<!-- php: = $this->Url->build(['controller' => 'Billings', 'action' => 'getFullName']) -->/"+$str, true);
        xhttp.send();												
	}
</script>
`;

export default function ElementElementBillingsPaidTransactions() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
