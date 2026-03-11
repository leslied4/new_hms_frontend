const rawHtml = `
<div class="row">
	<div class="col-md-12">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card card-topline-<!-- php: = $theme1 -->">
								<div class="card-head">
                                    <header>IPD Coding</header>
									<div class="tools">
										<a class="fa fa-repeat btn-color box-refresh" id="reset" href="javascript:;"></a>
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a>
									</div>
								</div>
								<div class="card-body row">
									<div class="col-md-7">
									</div>
									<div class="col-md-5">
										<!-- php: = $this->Form->create(null, ['type' => 'get']); -->
										<div class="input-group" style="max-width: 600px; float: right;">
											<input type="text" onfocus="(this.type = 'date')" name="from" id="from" class="form-control" placeholder="From (Date)">
											<input type="text" onfocus="(this.type = 'date')" name="to" id="to" class="form-control" placeholder="To (Date)">
											<button type="submit" class="btn btn-info btn-flat">Go!</button>
										</div>
										<!-- php: = $this->Form->end() -->
									</div>
								</div>
								<div class="card-body">
								  <div class="row">
									<div class="col-md-4">
										<div class="input-group" style="">
											<SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick ml-1" data-size="10" name="nhis_inv" id="nhis_inv" title="MDC Filter"  data-live-search="true" width="12px"required>
												<option value="" data-content="MDC/Clinic <span class='badge badge-danger'>2132</span>">Oncology</option>
											</SearchableSelectField>
											<SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick ml-1" data-size="10" name="nhis_inv" id="nhis_inv" title="Insurance Filter"  data-live-search="true" width="12px"required>
												<option value="" data-content="MDC/Clinic <span class='badge badge-danger'>2132</span>">Oncology</option>
											</SearchableSelectField>
											<SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick ml-1" data-size="10" id="status_filter_ipd" title="Status Filter"  data-live-search="true" width="12px"required>
												<option value="All">All</option>
												<option value="New">New</option>
												<option value="Due">Due</option>
												<option value="Duelate">Due Late</option>
												<option value="Overdue">Overdue</option>
											</SearchableSelectField>
										</div>
									</div>
									<div class="col-md-8">
									  <!-- php: = $this->Form->create(null, ['type' => 'get']); -->
										<div class="input-group" style="max-width: 600px; float: right;">
											<button type="button" class="btn btn-warning mr-1">Bed Requested</button>
											<button type="button" class="btn btn-primary mr-1">Admitted</button>
											<button type="button" class="btn btn-success mr-1">Completed</button>
											<input type="text" class="form-control" name="searchValue" type="text" id="searchBox" placeholder="Search" value="" />
											<span class="input-group-btn">
												<button type="submit" class="btn btn-info btn-flat" id="go_button">Go!</button>
											</span>
										</div>
									  <!-- php: = $this->Form->end() -->
									</div>
								  </div>

								  <div style="clear: both"></div>
									
								  <div class="table-scrollable">
									<table class="table table-hover order-column full-width table-checkable" id="ipd_table">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col"></th>
												<th scope="col">Patient</th>
												<th scope="col">Age(Folder)</th>
												<th scope="col">Date</th>
												<th scope="col">MDC</th>
												<th scope="col">Ward(Bed)</th>
												<th scope="col">Diagnosis</th>
												<th scope="col">Service Type</th>
												<th scope="col">III Episode</th>
												<th scope="col">Co Pay</th>
												<th scope="col">To Pay
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>
										<!-- php: $i = 0; -->
										<!-- php: foreach ($invoices as $invoice): $diff=date_diff($invoice->date_added,$now); $days = trim($diff->format("%R%a"), "+"); -->
											<!-- php: if($days >= 20){ $color = "danger"; $status = 'Overdue'; }elseif($days >= 10){ $color = "#FFA07A"; }elseif($days < 10){ $color = "#98FB98"; $status = 'New'; } -->
											<!-- php: $i++; -->
											<tr class ="mainipd" id="<!-- php: = $status -->">
												<td><!-- php: = $i --></td>
												<td>
													<span class="badge badge-<!-- php: = $color -->"><!-- php: = $status --></span>
												</td>
												<td>
													<div class="prog-avatar">
														<!-- php: = $this->Html->image($invoice->patient_visit->patient->has('image') ? $invoice->patient_visit->patient->image->file_path : (($invoice->patient_visit->patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'), ['width' => '40px', 'height' => '40px',... --> <!-- php: = $invoice->patient_visit->patient->name --> <span class='badge badge-success'><!-- php: = $invoice->patient_visit->patient->gender->name --></span>
													</div>
												</td>
												<td><!-- php: = $invoice->patient_visit->patient->age -->years <span class='badge badge-info'><!-- php: = $invoice->patient_visit->patient->folder_number --></span></td>
												<td><!-- php: = $invoice->date_added->nice() --></td>
												<td><!-- php: = isset($invoice->patient_visit->patient_visit_purpose->name) ? $invoice->patient_visit->patient_visit_purpose->name : "" --></td>
												<td><!-- php: = isset($invoice->patient_visit->patient_visit_admissions[0]->bed->ward->name) ? $invoice->patient_visit->patient_visit_admissions[0]->bed->ward->name : "" --> <!-- php: = isset($invoice->patient_visit->patient_visit_admissions[0]->bed) ? $invoice->patient_visit->patient_visit_admissions[0]->bed->name : "" --></td>
												<td>Diagnoses name can be very long
													<!-- php: foreach($invoice->patient_visit->patient_visit_diagnoses as $diagnoses): -->
														<!-- php: $ij = 0 -->
														<!-- php: foreach($diagnoses as $d): -->
															<!-- php: $ij++; -->
															<!-- php: = $ij -->.<!-- php: = $diagnoses->name --><span class='badge badge-danger'>ICD - 10</span><br>
														<!-- php: endforeach; -->
													<!-- php: endforeach; -->
												</td>
												<td>
													<span class='badge badge-secondary'>Bundled</span><br>
												</td>
												<td>Acute</td>
												<td><!-- php: = $invoice->co_payment == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "" --></td>
												<td><!-- php: = $invoice->final_amount --></td>
												<td>	
													<a href="<!-- php: =$this->Url->build(['controller'=>'CreditClaims','action'=>'viewClaimDetails', $invoice->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">
														View
													</a>						
												</td>
												<tr>
													<td colspan="13">
														<div class="row" style="text-align:justify">
															<div class="col-md-2">
																<b>Ward</b></br>
																Name: <!-- php: = isset($invoice->patient_visit->patient_visit_admissions[0]->bed->ward->name) ? $invoice->patient_visit->patient_visit_admissions[0]->bed->ward->name : "" --><br>
																Price: <!-- php: = isset($invoice->patient_visit->patient_visit_admissions[0]->bed->ward->price) ? $invoice->patient_visit->patient_visit_admissions[0]->bed->ward->price : "" --><br>
																Duration:
															</div>
															
															<div class="col-md-2">
																<b>Care Team</b></br>
																<!-- php: $iq = 0; -->
																<!-- php: foreach($invoice->patient_visit->queue as $q): -->
																	<!-- php: $iq++; -->
																	<!-- php: = $iq . ".". $q->assigned_user->first_name --> (<!-- php: = $q->assigned_user->role->name -->)<br>
																<!-- php: endforeach; -->
															</div>
															
															<div class="col-md-2">
																<span class='badge badge-warning'>Medications</span><br>
																<!-- php: if(null !==($invoice->patient_visit->request_medications)){ foreach($invoice->patient_visit->request_medications as $m){ echo $m->drug_stock->item->name . " " . '<span class="badge badge-danger">' . $m->drug_stock->item->item_code . '</span... -->	
															</div>
															
															<div class="col-md-2">
																<span class='badge badge-info'>Investigations</span><br>
																<!-- php: if(null !==($invoice->patient_visit->request_labs)){ foreach($invoice->patient_visit->request_labs as $l){ echo $l->investigation->name ."<br>"; } } -->	
															</div>
															
															<div class="col-md-2">
																<span class='badge badge-secondary'>Procedures</span><br>
																1.Chest X-Ray <span class='badge badge-danger'>8756GH</span>
															</div>
															
															<div class="col-md-2">
																<b>Cost Breakdown</b></br>
																Patient Balance:<br>
																Insurance Balance:<br>
																<!-- Paid: </?= $invoice->amount_paid?><br> -->
																<!-- Balance: </?= $invoice->final_amount-$invoice->amount_paid?> -->
															</div>
														</div>
													</td>
												</tr>
											</tr>
										<!-- php: endforeach; -->
										<tfoot>
											<tr class="mainipd" style="background-color: #eaeef3;">
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td><b>Total</b></td>
												<td><!-- php: = $sumOfInvoiceFinalAmounts --></td>
											</tr>
										</tfoot>
										</tbody>
									</table>
									</div>					
					
									<div class="row">
										<div class="col-md-6">
											<span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) --></span>
										</div>

										<div class="col-md-6">
											<div class="dataTables_paginate paging_simple_numbers" style="float: right;">
												<ul class="pagination">
													<!-- php: = $this->Paginator->prev(__('previous')) -->
													<!-- php: = $this->Paginator->numbers() -->
													<!-- php: = $this->Paginator->next(__('next')) -->
												</ul>
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
	</div>
</div>
<script>
	$(function() {
		$("td[colspan=13]").hide();
		$("table").click(function(event){
			event.stopPropagation();
			var $target = $(event.target);
			if($target.closest("td").attr("colspan") > 1 ){
				$target.slideUp();
			}else{
				$target.closest("tr").next().find("td[colspan=13]").slideToggle();
			}                    
		});
	});

	$("#status_filter_ipd").change(function(){
		var status = $(this).children('option:selected').val();
		$("tr.mainipd").each(function(){
			if(status == "All"){
				$(this).removeAttr('hidden');
			}else{
				if($(this).attr('id') != status){
				$(this).attr('hidden', 'hidden');
				}else{
					$(this).removeAttr('hidden');
				}
			}
		});
	});
</script>

`;

export default function ElementElementCreditclaimsIpdCopy() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
