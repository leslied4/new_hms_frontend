import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/CreditClaims/view_claim_details_backup.php';
const rawHtml = `
<style>
.profile-card {
    width: 550px;
    border: none;
    border-radius: 10px;
    background-color: #fff
}

.stats {
    background: #f2f5f8 !important;
    color: #000 !important
}

.articles {
    font-size: 10px;
    color: #a1aab9
}

.number1 {
    font-weight: 500
}

.followers {
    font-size: 10px;
    color: #a1aab9
}

.number2 {
    font-weight: 500
}

.rating {
    font-size: 10px;
    color: #a1aab9
}

.number3 {
    font-weight: 500
}

.insurance-list {
	float:right;
	width:370px
}

.accordion {
  background-color: #F0F0F0;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  transition: 1s;
}

.active, .accordion:hover {
  background-color: #F0F0F0; 
}

.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}
</style>
<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->" id="invoiceSection">
			
			<div class="card  card-box">
				<div class="card-head">
					<header style="margin-left: 20px">CLAIM&nbsp;&nbsp;&nbsp; <span class="pull-right">#<!-- php: = $invoice->invoice_number --></span></header>
				</div>
				<div class="card-body ">
	            	<div class="row">
	                    <div class="col-md-12">
	                        <div class="white-box">
	                            <div class="row">
	                                <div class="col-md-6" id="invoiceHead">
										<div class="pull-left">
											<address>
												<p class="text-muted m-l-5">
													<p style="margin-bottom: 5px;"><!-- php: = h($facility->institution) --></p>
													<!-- php: = $this->Text->autoParagraph($facility->address) -->
												</p>
											</address>
										</div>
									</div>
									<div class="col-md-6">
										<div class="insurance-list">
											<button class="accordion">Patient Insurances</button>
											<div class="panel"  id="insurances">
												<!-- php: $i = 0; foreach($invoice->patient_visit->patient->patient_insurance_profile_policies as $insurance): $i++; -->
													<!-- php: if($invoice->insurance_profile_policy_id == $insurance->insurance_profile_policy->id){ $hcp_accreditation_level = $insurance->insurance_profile_policy->insurance_profile->accreditation_no; $hcp_prescription_level = $insurance->insurance_pro... -->
														<div id="<!-- php: = $concatenated_insurance_data -->">
															<li id ="1sadat" class="list-group-item d-flex justify-content-between align-items-center insurance-list-swap">
																<i class="fa fa-bars"></i><!-- php: = $insurance->insurance_profile_policy->insurance_profile->name -->
																<span class="badge badge-danger badge-pill"><!-- php: = $insurance->insurance_profile_policy->insurance_profile->insurance_profile_type->name --></span>
																<span class="badge badge-secondary badge-pill"><!-- php: = $insurance->insurance_profile_policy->name --></span>
																<span class="badge badge-primary badge-pill"><!-- php: = $insurance->insurance_profile_policy->insurance_profile->copay == 1 ? 'Copay' : 'No Copay' --></span>
															</li>
														</div>
													<!-- php: } -->
												<!-- php: endforeach -->
												<!-- php: $i = 0; foreach($invoice->patient_visit->patient->patient_insurance_profile_policies as $insurance): $i++; -->
													<!-- php: if($invoice->insurance_profile_policy_id != $insurance->insurance_profile_policy->id){ $hcp_accreditation_level = $insurance->insurance_profile_policy->insurance_profile->accreditation_no; $hcp_prescription_level = $insurance->insurance_pro... -->
														<div id="<!-- php: = $concatenated_insurance_data -->">
															<li id ="1sadat" class="list-group-item d-flex justify-content-between align-items-center insurance-list-swap">
																<i class="fa fa-bars"></i><!-- php: = $insurance->insurance_profile_policy->insurance_profile->name -->
																<span class="badge badge-danger badge-pill"><!-- php: = $insurance->insurance_profile_policy->insurance_profile->insurance_profile_type->name --></span>
																<span class="badge badge-secondary badge-pill"><!-- php: = $insurance->insurance_profile_policy->name --></span>
																<span class="badge badge-primary badge-pill"><!-- php: = $insurance->insurance_profile_policy->insurance_profile->copay == 1 ? 'Copay' : 'No Copay' --></span>
															</li>
														</div>
													<!-- php: } -->
												<!-- php: endforeach -->
												<div class="list-group">
													HCP Accreditation Number<input class="form-control" type="text" id="accreditation" />
													HCP Prescription Level<input class="form-control" type="text" id="prescription" />
													Guarantor<input class="form-control" type="text" id="guarantor" />
												</div>
												<!-- php: if(sizeof($suggested_insurance_profile) > 0) { -->
													<div>
														<h4>Recommended Profile: <span class="badge badge-danger"><!-- php: = $suggested_insurance_profile['insurance_profile_name'] --></span> <span class="badge badge-secondary"><!-- php: = $suggested_insurance_profile['insurance_profile_policy'] --></span></h4>
													</div>
												<!-- php: } -->
											</div>
										</div>	
									</div>
									<div class="col-md-6">
										<div class="pb-5 d-flex">
											<div class="profile-card">
												<div class="d-flex align-items-center">
													<div class="w-100">
														<h4 class="mb-0 mt-0"><a target="_blank" href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatient',$invoice->patient_visit->patient_id]) -->"><!-- php: = $invoice->patient_visit->patient->name --> (<!-- php: = $invoice->patient_visit->patient->phone -->)</a></h4>
														<div class="p-2 mt-2 bg-primary d-flex justify-content-between text-slate-900 stats">
															<div class="d-flex flex-column"> <span class="articles">Folder Number</span> <span class="number1"><!-- php: = $invoice->patient_visit->patient->folder_number --></span> </div>
															<div class="d-flex flex-column"> <span class="followers">Date of Birth</span> <span class="number2"><!-- php: = $invoice->patient_visit->patient->date_of_birth->nice() --></span> </div>
															<div class="d-flex flex-column"> <span class="followers">Age</span> <span class="number2"><!-- php: = $invoice->patient_visit->patient->age -->years</span> </div>
															<div class="d-flex flex-column"> <span class="followers">Gender</span> <span class="number2"><!-- php: = $invoice->patient_visit->patient->gender->name --></span></div>
															<div class="d-flex flex-column"> <span class="followers">Copay Status</span> <span class="number2"><!-- php: = $invoice->co_payment == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "" --></span> </div>
															<div class="d-flex flex-column"> <span class="followers">Service Type</span> <span class="number2"><span class='badge badge-secondary'>Bundled</span></span> </div>
														</div>
														<div class="button mt-2 d-flex flex-row align-items-center"><button onclick="tariff()" class="btn btn-sm btn-outline-primary w-100" data-toggle="modal" data-target="#chargesAndDiagnoses"><i class="fa fa-bars"></i>Tariff and Diagnoses</button><button class="btn btn-sm btn-info w-100 ml-2"><i class="fa fa-clock-o"></i>Snooze</button> </div>
													</div>
												</div>
											</div>
										</div>
									</div>	
									<div class="modal fade" id="chargesAndDiagnoses" tabindex="-1" aria-hidden="true">
										<div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
											<div class="modal-content">
												<div class="container px-0 border border-2 border-<!-- php: =$theme2 -->">
													<div class="container-fluid pr-0 bg-danger">
														<div class="d-flex align-items-center justify-content-between">
															<h4 class="text-slate-900 my-0">Tariffs And Diagnoses</h4>
															<div>
																<button data-dismiss="modal" aria-label="Close" class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i class="fa fa-times text-primary"></i> </button>
															</div>
														</div>
													</div>
													<div class="container bg-white p-2">
														<div class="container-fluid">
															<div class="row mb-3 mt-4">
																<div class="col-md-12">
																	<div id="exTab1" class="container">
																		<ul class="nav nav-pills">
																			<li class="">
																				<a class="active" href="#1a" data-toggle="tab">Tariff <span><i class="fa fa-money"></i></span></a>
																			</li>
																			<li><a href="#2a" data-toggle="tab" onclick="diagnosesAndProcedures()"><span>Diagnoses and Procedures</span><span><i class="fa fa-code-fork"></i></span></a>
																			</li>
																			<li><a href="#3a" data-toggle="tab">Add Investigation <span><i class="fa fa-stethoscope"></i></span></a>
																			</li>
																			<li><a href="#4a" data-toggle="tab">Add Medication Tariff <span><i class="fa fa-user-md"></i></span></a>
																			</li>
																		</ul>
																		<div class="tab-content clearfix">
																			<div class="tab-pane active" id="1a" style="background:white">
																				<div id="tariffs">
                    
																				</div><br>
																				<div id="additional_diag_form" style="display: none;">
																					<div class="card">
																						<div class="card-body">
																							<div class="col-md-8">
																								<div class="form-group row">
																									<div class="col-md-6">
																										
																									</div>
																									<div class="col-md-6">
																										<button class="btn btn-info btn-xs" onclick="saveAdditionalDIagnoses()">Submit</button>	
																									</div>
																								</div>		
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="tab-pane" id="2a" style="background:white">
																				<hr>
																				<div class="row">
																					<div class="col-md-12">
																						<!-- <div class="form-group row">
																							<label class="control-label col-md-4">
																								<button class="btn btn-info" onclick="saveDiagnoses()">Submit Selected Diagnoses</button>
																							</label>
																							<div class="col-md-8">
																								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Diagnoses" id="diagnoses_selector" data-live-search="true" required>					
																									</?php foreach($standardDiagnoses as $d):?>				
																										<option data-content="</?= $d->name ?> <span class='badge badge-danger'>ICD-10</span>"
																											data-status-id="</?=$invoice->insurance_invoice_items[0]->status_id?>" data-provider-id="</?=$invoice->insurance_profile_policy_id?>" 
																											data-item-id="</?=$d->id?>" data-item-name="</?=$d->name?>" data-invoice-id="</?=$invoice->id?>"
																										>
																									</option>					
																									</?php endforeach; ?>							
																								</SearchableSelectField>
																								<input hidden type="text" id="diagnoses_status_id" name="status_id"/>
																								<input hidden type="text" id="diagnoeses_provider_id" name="insurance_profile_policy_id"/>
																								<input hidden type="text" id="diagnoses_invoice_id" name="invoice_id">
																								<input hidden type="text" id="diagnoses_id" name="item_id">
																								<input hidden type="text" id="diagnoses_name" name="item_name">
																							</div>
																						</div>		 -->
																						<!-- <div class="form-group row">
																							<label class="control-label col-md-4">Action
																								<span class="required">  </span>
																							</label>
																							<div class="col-md-8">
																								<button class="btn btn-info btn-xs" onclick="saveDiagnoses()">Submit</button>
																							</div>
																						</div> -->
																						<!-- <div class="form-group row">
																							<label class="control-label col-md-4">Procedure / Service
																								<span class="required"> * </span>
																							</label>
																							<div class="col-md-8">
																								
																								<input hidden type="text" id="status_id" name="status_id"/>
																								<input hidden type="text" id="provider_id" name="insurance_profile_policy_id"/>
																								<input hidden type="text" id="service_id" name="service_id"/>
																								<input hidden type="text" id="invoice_id" name="invoice_id">
																							</div>
																						</div>		
																						<div class="form-group row">
																							<label class="control-label col-md-4">Action
																								<span class="required">  </span>
																							</label>
																							<div class="col-md-8">
																								<button class="btn btn-info btn-xs" id="save_procedure" onclick="saveProcedureOrService()">Submit</button>
																							</div>
																						</div> -->
																					</div>
																				</div>
																				<hr>
																				<div class="row">
																					<div class="col-md-12">
																						<label class="control-label"><b>Diagnoses Accessed</b></label>
																						<div id="diags">
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="tab-pane" id="3a" style="background:white">
																				<hr>
																				<div class="form-group row">
																					<label class="control-label col-md-4" style="float:right;">
																						<button class="btn btn-info" onclick="saveInvestigation()">Submit Selected Investigation</button>
																					</label>
																					<div class="col-md-4">
																					<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Investigation" name="investigation_selector" id="investigation_selector" data-live-search="true" required>	
																							<!-- php: foreach($labTests as $l): -->				
																								<option data-content="<!-- php: = $l->name -->" data-investigation-invoice-id="<!-- php: =$invoice->id -->" data-investigation-cost="<!-- php: = $l->value_new -->" 
																								data-provider-id="<!-- php: =$invoice->insurance_profile_policy_id -->" data-status-id="<!-- php: =$invoice->insurance_invoice_items[0]->status_id -->" 
																								data-investigation-name="<!-- php: = $l->name -->" data-investigation-id="<!-- php: = $l->id -->">
																							</option>					
																							<!-- php: endforeach; -->										
																						</SearchableSelectField>
																						
																						<input hidden type="text" id="investigation_status_id" name="status_id"/>
																						<input hidden type="text" id="investigation_provider_id" name="insurance_profile_policy_id"/>
																						<input hidden type="text" id="investigation_cost" name="investigation_cost"/>
																						<input hidden type="text" id="investigation_invoice_id" name="invoice_id">
																						<input hidden type="text" id="investigation_id" name="item_id">
																						<input hidden type="text" id="investigation_name" name="item_name">
																					</div>
																				</div>		
																				<!-- <div class="form-group row">
																					<label class="control-label col-md-4">Action
																						<span class="required">  </span>
																					</label>
																					<div class="col-md-8">
																						<button class="btn btn-info" onclick="saveInvestigation()">Submit</button>
																					</div>
																				</div> -->
																			</div>
																			<div class="tab-pane" id="4a" style="background:white">
																				<hr>
																				<div class="form-group row">
																					<label class="control-label col-md-4">
																						<button class="btn btn-info" onclick="saveMedication()">Submit Selected Medication</button>
																					</label>
																					<div class="col-md-4">
																						<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Medication" name="medication_selector" id="medication_selector" data-live-search="true" required>					
																							<!-- php: foreach($medications as $m): -->				
																								<option data-content="<!-- php: = $m->drug->full_name --> <span class='badge badge-danger'><!-- php: = $m->drug->item_code --></span>" data-invoice-id="<!-- php: =$invoice->id -->"
																									data-status-id="<!-- php: =$invoice->insurance_invoice_items[0]->status_id -->" data-provider-id="<!-- php: =$invoice->insurance_profile_policy_id -->" 
																									data-unit-cost="<!-- php: =$m->unit_selling_price -->" data-item-id="<!-- php: =$m->item_id -->" data-item-name="<!-- php: =$m->drug->full_name -->"
																								></option>					
																							<!-- php: endforeach; -->							
																						</SearchableSelectField>
																						<input hidden type="text" id="medication_status_id" name="status_id"/>
																						<input hidden type="text" id="medication_provider_id" name="insurance_profile_policy_id"/>
																						<input hidden type="text" id="unit_cost" name="unit_cost"/>
																						<input hidden type="text" id="medication_invoice_id" name="invoice_id">
																						<input hidden type="text" id="item_id" name="item_id">
																						<input hidden type="text" id="item_name" name="item_name">
																					</div>
																				</div>		
																				<!-- <div class="form-group row">
																					<label class="control-label col-md-4">Action
																						<span class="required">  </span>
																					</label>
																					<div class="col-md-8">
																						<button class="btn btn-info btn-xs" onclick="saveMedication()">Submit</button>
																					</div>
																				</div> -->
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="container-fluid pr-0 bg-<!-- php: =$theme2 -->">
														<div class="d-flex align-items-center py-1 justify-content-end">
															<!-- <button style="height:20px;width:auto;" class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Save &nbsp;<i class="fa fa-check text-success fa-1x"></i> </button> -->
															<button style="height:20px;width:auto;" class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">Cancel&nbsp;<iclass="fa fa-times text-danger fa-1x"></i> </button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
	                                <div class="col-md-12" id="invoiceBody">
	                                    <div class="table-responsive m-t-40">
	                                        <table class="table table-hover">
	                                            <thead>
	                                                <tr>
	                                                    <th class="text-center">#</th>
	                                                    <th>Item</th>
														<th>Type</th>
														<!-- php: if($invoice->parent_invoice_id == 0) { -->
															<th>Action</th>
														<!-- php: } -->
														<th class="text-right">Quantity</th>
	                                                    <th class="text-right">Unit Cost</th>
	                                                    <th class="text-right">Total</th>
	                                                </tr>
	                                            </thead>
	                                            <tbody>
													<!-- php: $i = 0; $overallTotal = 0; $totalDiscount = 0; $total = 0; $vatAmount = 0; $invoiceItemList = []; if($invoice->parent_invoice_id == 0) { if($type != null && $type == 'insurance') { $invoiceItemList = $invoice->insurance_invoice_items; } els... -->
														<tr style="background-color: <!-- php: = $backgroundColor -->">
															<td class="text-center"><!-- php: = $i --></td>
															<td>
																<!-- php: = $invoiceItems->item_name -->
																<span class='badge badge-danger'><!-- php: = $invoiceItems->has('item') ? $invoiceItems->item->item_code : "" --></span>
																<span class='badge badge-success'><!-- php: = $invoiceItems->has('request_medication') ? $invoiceItems->request_medication->frequency : "" --></span>
															</td>
															<td><!-- php: = $invoiceItems->has('item_type') ? $invoiceItems->item_type->name : 'N/A' --></td>
															<!-- php: if($invoice->parent_invoice_id == 0) { -->
																<td>
																	<!-- php: = $this->Html->link('Disable', ['controller' => 'CreditClaims', 'action' => 'disableItem', $invoiceItems->id], ['id' => 'disable_' . $invoiceItems->id, 'style' => 'display: none']) -->
																	<!-- php: = $this->Html->link('Enable', ['controller' => 'CreditClaims', 'action' => 'enableItem', $invoiceItems->id], ['id' => 'enable_' . $invoiceItems->id, 'style' => 'display: none']) -->
																	<!-- php: if(in_array($invoiceItems->status_id, [1,23])) { -->
																			<label class="switchToggle">
																				<input type="checkbox" checked="" onclick="javascript:document.getElementById('<!-- php: = 'disable_' . $invoiceItems->id -->').click(); ">
																				<span class="slider green round"></span>
																			</label>
																	<!-- php: } else if($invoiceItems->status_id == 2) { -->
																			<label class="switchToggle">
																				<input type="checkbox" onclick="javascript:document.getElementById('<!-- php: = 'enable_' . $invoiceItems->id -->').click(); ">
																				<span class="slider green round"></span>
																			</label>
																	<!-- php: } else if($invoiceItems->status_id == 27) { -->
																		<span class="mdl-chip mdl-chip--contact">
																			<span class="mdl-chip__contact mdl-color--green mdl-color-text--white"><i class="fa fa-money"></i></span>
																			<span class="mdl-chip__text">Paid</span>
																		</span>
																	<!-- php: } -->
																</td>
															<!-- php: } -->
															<td class="text-right">
																<!-- php: if($invoice->parent_invoice_id == 0 && $invoice->final_amount - $invoice->amount_paid > 0) { -->
																	<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'CreditClaims', 'action' => 'updateInvoiceQuantity']]) -->
																		<!-- php: = $this->Form->hidden('invoice_item_id', ['value' => $invoiceItems->id]) -->
																		<div class="input-group" style="max-width: 150px; float: right">
																			<input type="number" min="1" step="1" value="<!-- php: = $invoiceItems->quantity -->" class="form-control" name="quantity" id="quantityUpdate" placeholder="Quantity" required >
																			<span class="input-group-btn">
																				<button type="submit" class="btn btn-info btn-flat"><i class="fa fa-arrow-right"></i></button>
																			</span>
																		</div>
																	<!-- php: = $this->Form->end() -->
																<!-- php: } else { echo $invoiceItems->quantity; } -->
															</td>
															<td class="text-right">GHS <!-- php: = $this->Number->precision($invoiceItems->unit_cost, 2) --></td>
															<td class="text-right"><!-- php: = (in_array($invoiceItems->status_id, [1,26]) || $invoice->parent_invoice_id != 0) ? $this->Number->precision($invoiceItems->final_amount, 2) : '' --></td>
														</tr>
													<!-- php: } -->
	                                            </tbody>
	                                        </table>
	                                    </div>
	                                </div>
	                                <div class="col-md-12">
	                                    <div class="pull-right m-t-30 text-right" id="invoiceTotal">
	                                        
											<!-- php: if($invoice->parent_invoice_id == 0) { -->
												<!-- php: if($facility->vat_inclusive == 1) { -->
													<!-- php: $overallTotal = $total; -->
													<!-- php: $vatAmount = ($overallTotal / (100 + $vatRate)) * $vatRate; -->
													<!-- php: $total = $overallTotal - (($overallTotal / (100 + $vatRate)) * $vatRate); -->
													<p>Sub Total : GHS <!-- php: = $this->Number->precision($total, 2) --></p>
													<!-- <p>Discount : GHS <!-- php: = $this->Number->precision($totalDiscount, 2) --></p> -->
													<!-- <p>VAT (<!-- php: = $vatRate -->%) : GHS <!-- php: = $this->Number->precision(($overallTotal / (100 + $vatRate)) * $vatRate, 2) --></p> -->
													<hr>
													<h3><b>Total :</b> GHS <!-- php: = $this->Number->precision($overallTotal + $invoice->amount_paid, 2) --></h3> 
												<!-- php: } else { -->

													<!-- php: $vatAmount = ($vatRate/100) * $total; -->
													<p>Sub Total : GHS <!-- php: = $this->Number->precision($total, 2) --></p>
													<!-- <p>Discount : GHS <!-- php: = $this->Number->precision($totalDiscount, 2) --></p> -->
													<!-- <p>VAT (<!-- php: = $vatRate -->%) : GHS <!-- php: = $this->Number->precision(($vatRate/100) * $total, 2) --></p> -->
													<!-- php: $overallTotal = $total + (($vatRate/100) * $total); -->
													<hr>
													<h3><b>Total :</b> GHS <!-- php: = $this->Number->precision($overallTotal + $invoice->amount_paid, 2) --></h3> 
												<!-- php: } -->
											<!-- php: } else { $overallTotal = $invoice->final_amount; -->
													<p>Sub Total : GHS <!-- php: = $this->Number->precision($invoice->amount, 2) --></p>
													<!-- <p>Discount : GHS <!-- php: = $this->Number->precision($invoice->discount, 2) --></p> -->
													<!-- <p>VAT (<!-- php: = $invoice->vat_rate -->%) : GHS <!-- php: = $this->Number->precision($invoice->vat_rate, 2) --></p> -->
													<hr>
													<h4><b>Total :</b> GHS <!-- php: = $this->Number->precision($invoice->final_amount, 2) --></h4>  
											<!-- php: } -->
											<!-- php: if($invoice->amount_paid > 0) { -->
											<!-- php: // $overallTotal-= $invoice->amount_paid; -->
													<h4><b>Amount Paid :</b> GHS <!-- php: = $this->Number->precision($invoice->amount_paid, 2) --></h4>
											<!-- php: } -->
											<!-- php: if($invoice->final_amount - $invoice->amount_paid > 0) { -->
													<h4><b>Remaining Amount :</b> GHS <!-- php: = $this->Number->precision($overallTotal, 2) --></h4>
											<!-- php: } -->
										</div>
	                                    <div class="clearfix"></div>
	                                    <hr>
	                                    <div class="text-right">
											<!-- php: if($invoice->parent_invoice_id == 0 && $invoice->final_amount - $invoice->amount_paid > 0 && $invoice->status_id == 19 || $invoice->status_id == 31) { -->
												<a href="<!-- php: =$this->Url->build(['controller'=>'CreditClaims','action'=>'flagOrSubmitClaim', $invoice->id, $status_id = 30]) -->" class="btn btn-success">
													Proceed
												</a>
												<!-- php: if($invoice->status_id != 31){ -->
												<a href="<!-- php: =$this->Url->build(['controller'=>'CreditClaims','action'=>'flagOrSubmitClaim', $invoice->id, $status_id = 31]) -->" class="btn btn-danger">
													Flag
												</a>
												<!-- php: } -->
	                                        <!-- php: } -->
											<a href="<!-- php: = Cake\Routing\Router::url(['controller'=>'Billings','action'=>'viewInvoice',$invoice->id,'billingreport', '_ext' => 'pdf']) -->" class="btn btn-default btn-outline no-print" type="button"> <span><i class="fa fa-print"></i> Print</span> </a>
											<button onclick="javascript:printPOSDiv('invoiceReceipt')" class="btn btn-default btn-outline no-print" type="button"> <span><i class="fa fa-print"></i> Print Receipt</span> </button>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
				</div>
			</div>
		</div>
		<div class="row d-flex justify-content-center">
			<div class="col-md-12">
				<div class="card shadow-0 border" style="background-color: #f0f2f5;">
					<div class="card-header">
						<button type="button" class="btn btn-outline-success" onclick="reloadScrbberChecks()"><i class="fa fa-refresh"></i>Reload All Checks</button> <button type="button" class="btn btn-outline-danger"><i class="fa fa-remove"></i>Dismiss All Checks</button>
					</div>
					<div class="card-body p-4">
						<div class="card mb-4">
							<!-- php: if(count($scrubberResults) > 0){ -->
								<div class="card-body">
									<!-- php: foreach($scrubberResults as $value): -->
										<h6 class="<!-- php: = $value['text-color'] -->"><i class="<!-- php: = $value['icon'] -->"></i> <!-- php: = $value['message'] --></h6>
									<!-- php: endforeach -->
								</div>
							<!-- php: } --> 
						</div>
					</div>
					<div class="card-header">
						Activity Log
					</div>
					<div class="card-body p-4">
						<div class="input-group mb-3">
							<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'CreditClaims', 'action' => 'getClaimComments']]); -->
							<div class="input-group-prepend">
								<button class="btn btn-warning" type="submit">Submit</button><input type="text" class="form-control" placeholder="" name="message" aria-label="" aria-describedby="basic-addon1" style="width:100.5rem">
							</div>
							<input hidden type="text" class="form-control" placeholder="" name="invoice_id" value="<!-- php: = $invoice->id -->">
							<!-- php: =$this->Form->end(); -->
						</div>
						<div class="card mb-4">
							<div class="card-body">
								<!-- php: foreach($Logs as $log): -->	
									<h6><i class="fa fa-history	"></i> <!-- php: =$log->message -->,<!-- php: = $log->date_of_added->nice() --></h6>			
								<!-- php: endforeach; -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- php: = $this->Form->create(null, ['id' => 'createPaidInvoice']) -->
			<div class="modal fade" id="printReceipt" role="dialog">
				<div class="modal-dialog modal-xs" style="width: 400px">
					<div class="modal-content">
						<div class="modal-body" id="invoiceReceipt">
							<div style="text-align: center;">
								<!-- php: = $this->Html->image('../assets/img/logo.jpg', ['style' => 'width: 50px; height: auto;']) -->
								<br/>
								<h4><!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --></h4>
							</div>
							<h4 style="text-align: center;">Receipt</h4>
							<hr/>
							<table>
							    <tr><th style="text-align: left;">Patient:</th><td>Sadat</td></tr>
								<tr><th style="text-align: left;">Invoice #: &nbsp;&nbsp;&nbsp;&nbsp;</th><td>12335</td></tr>
								<tr><th style="text-align: left;">Visit: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><td>2020-15-10</td></tr>
								<tr><th style="text-align: left;">Type: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><td>generar</td></tr>
							</table>
							<hr/>
							<div class="">
								<table class="table">
									<thead>
										<tr>
											<th style="text-align: left;">Item</th>
											<th style="text-align: right;">Price</th>
											<th style="text-align: right;">Qty</th>
											<th style="text-align: right;">Amount</th>
										</tr>
									</thead>
									<tbody id="invoice_body">
										
									</tbody>
									<tfoot>
										<tr>
											<td>------</td>
											<td>------</td>
											<td>------</td>
											<td>------</td>
										</tr>
										<!-- php: $receiptTotal = 0; $receiptDiscount = 0; $receiptFinalTotal = 0; foreach($invoiceItemList as $invoiceItem) { if($invoiceItem->status_id != 27) { continue; } $receiptTotal+= $this->Number->precision($invoiceItem->final_amount, 2); $receiptDi... -->
											<tr>
												<th style="text-align: left;"><!-- php: = $invoiceItem->item_name --></th>
												<th><!-- php: = $this->Number->precision($invoiceItem->unit_cost, 2) --></th>
												<th><!-- php: = $invoiceItem->quantity --></th>
												<th><!-- php: = $this->Number->precision($invoiceItem->final_amount, 2) --></th>
											</tr>
										<!-- php: } -->
										<!-- php: $receiptFinalTotal = $receiptTotal - $receiptDiscount; -->
										<tr>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Total</b></td>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="sub_total"><!-- php: = $this->Number->precision($receiptTotal, 2) --></span></td>
										</tr>
										<tr>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Discount</b></td>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="discount_total"><!-- php: = $this->Number->precision($receiptDiscount, 2) --></span></td>
										</tr>
										<tr>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Final Total</b></td>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="main_total"><!-- php: = $this->Number->precision($receiptFinalTotal, 2) --></span></td>
										</tr>
										<tr>
											<td colspan="4" style="text-align: right;">============================</td>
										</tr>
										<tr>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;"><b>Amount Paid</b></td>
											<td colspan="2" style="text-align: right; border-top: 0px; padding-bottom: 2px; padding-top: 2px;">GHS <span id="invoice_amount_paid"><!-- php: = $this->Number->precision($invoice->amount_paid, 2) --></span></td>
										</tr>
									</tfoot>
								</table>
							</div>

							<p style="text-align: center; margin-top: 20px;">
								Thank you for giving us<br/>
								the opportunity to serve you.<br/>
								<!-- php: = ($inst_name != null) ? $inst_name->institution : Cake\Core\Configure::read('FacilityName') --><br/>
                                sadfg
							</p>
							<p style="text-align: center;"><!-- php: = date("d/m/Y H:i:s") --></p>
						</div>
					</div>
				</div>
			</div>
		<!-- php: = $this->Form->end() -->	
	</div>
</div>

<script>
	function updateAmount(value) {
		// amount = parseFloat(document.getElementById('amount_to_pay').value);
		amount = parseFloat("<!-- php: = $overallTotal -->");
		value = parseFloat(value);
		
		if(value >= amount) {
			document.getElementById('change_amount').value = (value - amount).toFixed(2);
			document.getElementById('amount').value = amount;
		}
		else {
			document.getElementById('change_amount').value = (0).toFixed(2);
			document.getElementById('amount').value = value;
		}
			
	}
	
	function updateReference(value) {
		
		if(value == 2 || value == 3) {
			$('#reference_row').show(500);
		}
		else {
			$('#reference_row').hide(500);
		}
	}
</script>
<script>
	function printPOSDiv(divName) {
		var printContents = document.getElementById(divName).innerHTML;

		var printwindow = window.open('', 'PRINT', 'height=400,width=700');

		printwindow.document.write('<html><head><title>' + document.title  + '</title>' + '</head><body >');
	    printwindow.document.write(printContents);
		printwindow.document.write('</body></html>');

		printwindow.document.close(); // necessary for IE >= 10
		printwindow.focus(); // necessary for IE >= 10*/

		printwindow.print();
		printwindow.close();

	    return true;
	}
</script>
<script>
	$(".insurance-list-swap" ).first().css("background-color", "#FFB236");

	$("#insurances").sortable({
		create: function(event, ui){
			var insuranceProfilePolicyIds = $(this).sortable('toArray'); 
			var insurance_profile_data = insuranceProfilePolicyIds[0].split(":");
			var insuranceProfilePolicyId = insurance_profile_data[0];
			var hcp_accreditation_no = insurance_profile_data[1];
			var hcp_facility_level = insurance_profile_data[2];
			var guarantor_name = insurance_profile_data[3];
			showHcpsAndGuarantor(insurance_profile_data);
		},
		update: function(event, ui) {  
			var insuranceProfilePolicyIds = $(this).sortable('toArray'); 
			var insurance_profile_data = insuranceProfilePolicyIds[0].split(":");
			var insuranceProfilePolicyId = insurance_profile_data[0];
			var hcp_accreditation_no = insurance_profile_data[1];
			var hcp_facility_level = insurance_profile_data[2];
			var guarantor_name = insurance_profile_data[3];
			var invoice_id = insurance_profile_data[4];
			showHcpsAndGuarantor(insurance_profile_data);
			var position = ui.item.index();
			$(".insurance-list-swap" ).first().css("background-color", "#FFB236");
			$(".insurance-list-swap").not(":eq(0)").css("background-color", "white");
			updateInvoiceProviderId(insuranceProfilePolicyId, invoice_id);
		},
	});

	function showHcpsAndGuarantor(insurance_profile_data){
		$("#accreditation").val(insurance_profile_data[1]);
		$("#prescription").val(insurance_profile_data[2]);
		$("#guarantor").val(insurance_profile_data[3]);
	}

	//sadat
	function updateInvoiceProviderId(insuranceProfilePolicyId, invoice_id){
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'updateInvoiceInsuranceProfilePolicyId'] ); -->",
            data: {insurance_profile_policy_id:insuranceProfilePolicyId, id: <!-- php: echo $invoice->id; -->},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				// console.log('fetching data')
            },
            success: function (response){
				var results = JSON.parse(response); 
				if(results == 1){
					updateInvoiceInsuranceProfilePolicy(insuranceProfilePolicyId, invoice_id)
				}
				console.log(results);
            }
        });
	}

	function updateInvoiceInsuranceProfilePolicy(insuranceProfilePolicyId, invoice_id){
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'updateInvoiceInsuranceProfilePolicy'] ); -->",
            data: {insurance_profile_policy_id:insuranceProfilePolicyId, id: invoice_id},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				// console.log('fetching data')
            },
            success: function (response){
				var results = JSON.parse(response); 
				if(results == 1){
					alertify.success('Insurance successfully swapped')
				}else{
					alertify.error('Opps something went wrong, kindly try again')
				}
            }
        });

	}
</script>
<script>
	var acc = document.getElementsByClassName("accordion");
	var i;
	for(i = 0; i < acc.length; i++){
			acc[i].addEventListener("click", function() {
				this.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
				panel.style.display = "none";
				} else {
					panel.style.display = "block";
			}
		});
	}
</script>
<script>
	$("#service_id_selector").change(function(){
		$("#service_id").val($(this).children('option:selected').data('service-id'));
		$("#invoice_id").val($(this).children('option:selected').data('invoice-id'));
		$("#provider_id").val($(this).children('option:selected').data('provider-id'));
		$("#status_id").val($(this).children('option:selected').data('status-id'));
	});

	function saveProcedureOrService()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'saveProcedureOrService' ] ); -->",
            data: {
				service_id: $("#service_id").val(),
				invoice_id: $("#invoice_id").val(),
				provider_id: $("#provider_id").val(),
				status_id: $("#status_id").val(),
			},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
            },
            success: function (response){
				alertify.success('Service/Procedure sccessfully saved');
				tariff();
				resetSelectPicker(id='service_id_selector');
            }
        });
	}

	$("#medication_selector").change(function(){
		$("#unit_cost").val($(this).children('option:selected').data('unit-cost'));
		$("#medication_invoice_id").val($(this).children('option:selected').data('invoice-id'));
		$("#medication_provider_id").val($(this).children('option:selected').data('provider-id'));
		$("#medication_status_id").val($(this).children('option:selected').data('status-id'));
		$("#item_id").val($(this).children('option:selected').data('item-id'));
		$("#item_name").val($(this).children('option:selected').data('item-name'));
	});

	function saveMedication()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'saveMedication' ] ); -->",
            data: {
				unit_cost: $("#unit_cost").val(),
				medication_invoice_id: $("#medication_invoice_id").val(),
				medication_provider_id: $("#medication_provider_id").val(),
				medication_status_id: $("#medication_status_id").val(),
				item_id: $("#item_id").val(),
				item_name: $("#item_name").val(),
			},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
            },
            success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Medication sccessfully saved');
					tariff();
					resetSelectPicker(id='medication_selector');
				}else{
					alertify.error('Something went wrong, please try again');
				}
            }
        });
	}

	$("#investigation_selector").change(function(){
		$("#investigation_cost").val($(this).children('option:selected').data('investigation-cost'));
		$("#investigation_invoice_id").val($(this).children('option:selected').data('investigation-invoice-id'));
		$("#investigation_provider_id").val($(this).children('option:selected').data('provider-id'));
		$("#investigation_status_id").val($(this).children('option:selected').data('status-id'));
		$("#investigation_id").val($(this).children('option:selected').data('investigation-id'));
		$("#investigation_name").val($(this).children('option:selected').data('investigation-name'));
	});

	function saveInvestigation()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'saveInvestigation' ] ); -->",
            data: {
				investigation_cost: $("#investigation_cost").val(),
				investigation_invoice_id: $("#investigation_invoice_id").val(),
				investigation_provider_id: $("#investigation_provider_id").val(),
				investigation_status_id: $("#investigation_status_id").val(),
				investigation_name: $("#investigation_name").val(),
				investigation_id: $("#investigation_id").val(),
			},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
            },
            success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Investigation sccessfully saved');
					tariff();
					resetSelectPicker(id='investigation_selector');
				}else{
					alertify.error('Something went wrong, please try again');
				}
            }
        });
	}

	$("#diagnoses_selector").change(function(){
		$("#diagnoses_invoice_id").val($(this).children('option:selected').data('invoice-id'));
		$("#diagnoeses_provider_id").val($(this).children('option:selected').data('provider-id'));
		$("#diagnoses_status_id").val($(this).children('option:selected').data('status-id'));
		$("#diagnoses_id").val($(this).children('option:selected').data('item-id'));
		$("#diagnoses_name").val($(this).children('option:selected').data('item-name'));
		poupulateMappedProcedures($(this).children('option:selected').data('item-id'))
	});
	
	function saveDiagnoses()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'saveDiagnoses' ] ); -->",
            data: {
				diagnoses_invoice_id: $("#diagnoses_invoice_id").val(),
				diagnoeses_provider_id: $("#diagnoeses_provider_id").val(),
				diagnoses_status_id: $("#diagnoses_status_id").val(),
				diagnoses_id: $("#diagnoses_id").val(),
				diagnoses_name: $("#diagnoses_name").val(),
			},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
            },
            success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Diagnoses sccessfully saved');
					tariff();
					diagnoses();
					resetSelectPicker(id='diagnoses_selector');
				}else{
					alertify.error('Something went wrong, please try again');
				}
            }
        });
	}

	$("#additional_diagnoses_selector").change(function(){
		$("#diagnoses_invoice_id").val($(this).children('option:selected').data('invoice-id'));
		
	});

	function addAdditionalDiagnoses(procedure_id)
	{
		alert(procedure_id);
		$('#additional_diag_form').toggle(500)

	}

	function saveAdditionalDIagnoses()
	{
		
	}

	function deleteInvoiceItem(invoice_item_id)
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'deleteInvoiceItem' ] ); -->",
            data: {invoice_item_id: invoice_item_id},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				// console.log('fetching data')
            },
            success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Item cost successfully billed to patient ');
					tariff();
					diagnoses();
				}else{
					alertify.error('Something went wrong');
				}
            }
        });
	}

	function reloadScrbberChecks()
	{
		location.reload();
	}

	function resetSelectPicker(id)
	{
		$("#"+id).val('default');
		$("#"+id).selectpicker("refresh");
	}
</script>
<script>
	function tariff()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'CreditClaims', 'action' => 'getInvoiceItems' ] ); -->",
            data: {invoice_id:<!-- php: = $invoice->id -->},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				// console.log('fetching data')
            },
            success: function (response){
				var res = JSON.parse(response);
				var res = res.insurance_invoice_items;
				$("#tariffs").empty();
				$.each(res, function(key, value) {
					var diagnoses = '';
					var add_diagnoses_button = '';
					if(res[key].service_stock != null){
						console.log(res[key].service_stock.standard_diagnosis.name)
						var diagnoses = '  <span class="text-info">was linked to</span>  ' + '<span class="text-danger">' +res[key].service_stock.standard_diagnosis.name + '</span>';
						var add_diagnoses_button = '<button onclick="addAdditionalDiagnoses('+res[key].id+')" class="btn btn-success btn-xs"><i class="fa fa-plus"></i>Add Diagnoses</button>'
					}
					$("#tariffs").append(
						'<div id="invoice_item"><b class="text-primary">'+moment(res[key].date_added).format('DD-MMM-YYYY HH:MM:SS')+'</b>   <span>'+res[key].item_name+'</span>'+ diagnoses +' +GHS: '+res[key].final_amount+'  <button onclick="deleteInvoiceItem('+res[key].id+')" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i>Delete</button>'+ add_diagnoses_button +'</div>'
					)
				});	
            }
        });
	}
</script>
<!-- 
<script>
	function diagnosesAndProcedures()
	{
		alert('here')
		diags_and_pros = "<!-- php: echo $invoice->patient_visit->patient_visit_diagnoses_procedures; -->";
		console.log(diags_and_procedures);
	}
</script> -->




`;

export default function CreditClaimsViewClaimDetailsBackupPage() {
  return (
    <PageShell title="CreditClaims/view_claim_details_backup.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
