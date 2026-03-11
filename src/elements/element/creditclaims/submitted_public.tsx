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
                                    <header>Submissions - Public</header>
									<div class="tools">
										<!-- <a class="fa fa-repeat btn-color box-refresh" id="reset" href="javascript:;"></a>
										<a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;"></a>
										<a class="t-close btn-color fa fa-times" href="javascript:;"></a> -->
										<span>Export:</span>
										<a target="_blank"
											class="btn-color btn-outline btn btn-outline red"
											title="Export To Excel"
											href="<!-- php: = $this->Url->build([ 'controller' => 'CreditClaims', 'action' => 'exportDataToExcel', 1, '?' => $this->request->getQueryParams() ]) -->">
											Excel
											<!-- php: = $this->Html->image('../assets/img/excel.png', ['style' => 'width: 25px; height: 25px']) -->
										</a>
										<a target="_blank"
											class="btn-color btn-outline btn btn-outline red"
											title="Export To PDF"
											href="<!-- php: = $this->Url->build([ 'controller' => 'CreditClaims', 'action' => 'exportDataToPdf', 1 ]) -->">
											PDF <!-- php: = $this->Html->image('../assets/img/pdf.png', ['style' => 'width: 25px; height: 25px']) -->
										</a>

										<a class="btn-color btn-outline btn btn-outline red"
											title="Export To XML"
											href="<!-- php: = $this->Url->build([ 'controller' => 'CreditClaims', 'action' => 'generateNhisXml' ]) -->">
											XML <!-- php: = $this->Html->image('../assets/img/folder.png', ['style' => 'width: 25px; height: 25px']) -->
										</a>

									</div>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col-md-4">
											<!-- <div class="input-group" style="">
												<SearchableSelectField class="form-control selectpicker show-menu-arrow show-tick ml-1" data-size="10" name="nhis_inv" id="nhis_inv" title="MDC Filter"  data-live-search="true" width="12px"required>
													<option value="" data-content="MDC/Clinic <span class='badge badge-danger'>2132</span>">Oncology</option>
												</SearchableSelectField>
											</div> -->
										</div>
										<div class="col-md-8">
										<!-- php: = $this->Form->create(null, ['type' => 'get']); -->
											<div class="input-group" style="max-width: 600px; float: right;">
												<input type="text" onfocus="(this.type = 'date')" name="from" id="from" class="form-control" placeholder="From (Date)">
												<input type="text" onfocus="(this.type = 'date')" name="to" id="to" class="form-control" placeholder="To (Date)">
												<button type="submit" class="btn btn-info btn-flat">Go!</button>
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
									<table class="table table-hover order-column full-width table-checkable">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Patient</th>
												<th scope="col">Age(Folder)</th>
												<th scope="col">Date</th>
												<th scope="col">MDC</th>
												<!-- <th scope="col">Ward(Bed)</th> -->
												<!-- <th scope="col">Diagnosis</th> -->
												<!-- <th scope="col">Service Type</th> -->
												<!-- <th scope="col">III Episode</th> -->
												<th scope="col">Co Pay</th>
												<th scope="col">To Pay
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>
										<!-- php: $i = 0; -->
										<!-- php: foreach ($public as $invoice): -->
											<!-- php: $i++; -->
											<tr>
												<td><input type="checkbox" class="form-check-input" id="exampleCheck1"><!-- php: = $i --></td>
												<td>
													<div class="prog-avatar">
														<!-- php: = $this->Html->image($invoice->patient_visit->patient->has('image') ? ($invoice->patient_visit->patient->image->file_path ? $invoice->patient_visit->patient->image->file_path : (($invoice->patient_visit->patient->gender_id ==2) ? 'dp2.jpg' ... --> <!-- php: = $invoice->patient_visit->patient->name --> <span class='badge badge-success'><!-- php: = $invoice->patient_visit->patient->gender->name --></span>
													</div>
												</td>
												<td><!-- php: = $invoice->patient_visit->patient->age -->years <span class='badge badge-info'><!-- php: = $invoice->patient_visit->patient->folder_number --></span></td>
												<td><!-- php: = $invoice->date_added->nice() --></td>
												<td><!-- php: = isset($invoice->patient_visit->specialty->name) ? $invoice->patient_visit->specialty->name : "" --></td>
												<!-- <td></?= isset($invoice->patient_visit->patient_visit_admissions[0]->bed->ward->name) ? $invoice->patient_visit->patient_visit_admissions[0]->bed->ward->name : "" ?> <!-- php: = isset($invoice->patient_visit->patient_visit_admissions[0]->bed) ? $invoice->patient_visit->patient_visit_admissions[0]->bed->name : "" --></td> -->
												<!-- <td> -->
													<!-- </?php foreach($invoice->patient_visit->patient_visit_diagnoses as $diagnoses):?>
														</?php $ij = 0 ?>
														</?php foreach($diagnoses as $d):?>
															</?php $ij++; ?>
															</?= $ij ?>.</?= $diagnoses->name?><span class='badge badge-danger'>ICD - 10</span><br>
														</?php endforeach; ?>
													</?php endforeach; ?> -->
												<!-- </td> -->
												<!-- <td>
													<span class='badge badge-secondary'>Bundled</span><br>
												</td> -->
												<!-- <td>Acute</td> -->
												<td><!-- php: = $invoice->co_payment == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "Disabled" --></td>
												<td><!-- php: = $invoice->claim_status_id == 30 ? '<span class="badge badge-primary ">Paid</span>' : $invoice->provider_amount --></td>
												<td>	
													<a href="<!-- php: =$this->Url->build(['controller'=>'CreditClaims','action'=>'viewClaimDetails', $invoice->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs patient_view_patient_info">
														View
													</a>
													<a target="_blank" class="btn-color btn-outline btn btn-outline red btn-xs" title="Export To PDF" href="<!-- php: = $this->Url->build(['controller' => 'CreditClaims', 'action' => 'claim-pdf', $invoice->id]) -->"> PDF <!-- php: = $this->Html->image('../assets/img/pdf.png', ['style' => 'width: 10px; height: 10px']) --></a>					
												</td>
											</tr>
										<!-- php: endforeach; -->
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

`;

export default function ElementElementCreditclaimsSubmittedPublic() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
