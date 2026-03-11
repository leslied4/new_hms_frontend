import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Billings/pdf/view_invoice.php';
const rawHtml = `
<div class="card card-topline-<!-- php: = $theme1 -->" id="invoiceSection">
			
			<div class="card  card-box">
				<div class="card-head">
					<header style="margin-left: 20px">INVOICE&nbsp;&nbsp;&nbsp; <span class="pull-right">#<!-- php: = $invoice->invoice_number --></span></header>
				</div>
				
				<div class="card-body ">
					
	            	<div class="row">
	                    <div class="col-md-12">
	                        <div class="white-box">
	                            <div class="row">
	                                <div class="col-md-12" id="invoiceHead">
										<div class="pull-left">
											<address>
												<p class="text-muted m-l-5">
													<p style="margin-bottom: 5px;"><!-- php: = h($facility->institution) --></p>
													<!-- php: = $this->Text->autoParagraph($facility->address) -->
												</p>
											</address>
										</div>
										<div class="pull-right text-right">
											<address>
												<p class="addr-font-h4" style="margin-bottom: 0px">To,</p>
												<p class="font-bold addr-font-h5" style="margin-bottom: 0px"><!-- php: = $invoice->has('provider') ? $invoice->provider->name : $invoice->patient_visit->patient->full_name --></p>
												<p class="text-muted m-l-30" style="margin-bottom: 0px">
													<!-- php: = $this->Text->autoParagraph($invoice->has('provider') ? $invoice->provider->address : $invoice->patient_visit->patient->address) -->
												</p>
												<p class="text-muted m-l-5">
													Patient: <!-- php: = $invoice->patient_visit->patient->full_name -->
												</p>
												<p class="m-t-30" style="margin-bottom: 0px">
													<b>Invoice Date :</b> <i class="fa fa-calendar"></i> 
													<!-- php: = $invoice->date_added->nice(); -->
												</p>
											</address>
										</div>
									</div>
	                                <div class="col-md-12" id="invoiceBody">
	                                    <div class="table-responsive m-t-40">
	                                        <table class="table table-hover">
	                                            <thead>
	                                                <tr>
	                                                    <th class="text-center">#</th>
	                                                    <th>Item Name</th>
														<th>Type</th>

														<!-- php: if($invoice->parent_invoice_id == 0) { -->
															<th>Action</th>
														<!-- php: } -->
	                                                    
														<th class="text-right">Quantity</th>
	                                                    <th class="text-right">Unit Cost</th>
	                                                    <th class="text-right">Discount</th>
	                                                    <th class="text-right">Total</th>
	                                                </tr>
	                                            </thead>
	                                            <tbody>
													<!-- php: $i = 0; $overallTotal = 0; $totalDiscount = 0; $total = 0; $vatAmount = 0; $invoiceItemList = []; if($invoice->parent_invoice_id == 0) { if($type != null && $type == 'insurance') { $invoiceItemList = $invoice->insurance_invoice_items; } els... -->
														<tr>
															<td class="text-center"><!-- php: = $i --></td>
															<td><!-- php: = $invoiceItems->item_name --></td>
															<td><!-- php: = $invoiceItems->has('item_type') ? $invoiceItems->item_type->name : 'N/A' --></td>
															<!-- php: if($invoice->parent_invoice_id == 0) { -->
																<td>
																	<!-- php: = $this->Html->link('Disable', ['controller' => 'Billings', 'action' => 'disableItem', $invoiceItems->id], ['id' => 'disable_' . $invoiceItems->id, 'style' => 'display: none']) -->
																	<!-- php: = $this->Html->link('Enable', ['controller' => 'Billings', 'action' => 'enableItem', $invoiceItems->id], ['id' => 'enable_' . $invoiceItems->id, 'style' => 'display: none']) -->
																	<!-- php: if(in_array($invoiceItems->status_id, [1,26])) { -->
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
																	<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Billings', 'action' => 'updateInvoiceQuantity']]) -->
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
															<td class="text-right">GHS <!-- php: = $this->Number->precision($invoiceItems->discount, 2) --></td>
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
													<p>Discount : GHS <!-- php: = $this->Number->precision($totalDiscount, 2) --></p>
													<p>VAT (<!-- php: = $vatRate -->%) : GHS <!-- php: = $this->Number->precision(($overallTotal / (100 + $vatRate)) * $vatRate, 2) --></p>
													<hr>
													<h3><b>Total :</b> GHS <!-- php: = $this->Number->precision($overallTotal + $invoice->amount_paid, 2) --></h3> 
												<!-- php: } else { -->

													<!-- php: $vatAmount = ($vatRate/100) * $total; -->
													<p>Sub Total : GHS <!-- php: = $this->Number->precision($total, 2) --></p>
													<p>Discount : GHS <!-- php: = $this->Number->precision($totalDiscount, 2) --></p>
													<p>VAT (<!-- php: = $vatRate -->%) : GHS <!-- php: = $this->Number->precision(($vatRate/100) * $total, 2) --></p>
													<!-- php: $overallTotal = $total + (($vatRate/100) * $total); -->
													<hr>
													<h3><b>Total :</b> GHS <!-- php: = $this->Number->precision($overallTotal + $invoice->amount_paid, 2) --></h3> 
												<!-- php: } -->
											<!-- php: } else { $overallTotal = $invoice->final_amount; -->
													<p>Sub Total : GHS <!-- php: = $this->Number->precision($invoice->amount, 2) --></p>
													<p>Discount : GHS <!-- php: = $this->Number->precision($invoice->discount, 2) --></p>
													<p>VAT (<!-- php: = $invoice->vat_rate -->%) : GHS <!-- php: = $this->Number->precision($invoice->vat_rate, 2) --></p>
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
											<!-- php: if($invoice->parent_invoice_id == 0 && $invoice->final_amount - $invoice->amount_paid > 0) { -->
												<button class="btn btn-<!-- php: = $theme2 --> no-print" type="submit"  data-toggle="modal" data-target="#makePayment" > Proceed to payment </button>
	                                        <!-- php: } -->
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

export default function BillingsPdfViewInvoicePage() {
  return (
    <PageShell title="Billings/pdf/view_invoice.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
