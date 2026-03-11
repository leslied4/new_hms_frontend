const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase"><!-- php: = $elementTitle --></span>
			</div>
		</div>
		<div class="borderBox-body">
			<div class="card  card-box">
				<div class="card-body ">


					
					<div class="table-scrollable">
					<table class="table table-hover order-column full-width customDataTable">
						<thead>
							<tr>
								<th class="left">Date Added</th>
								<th class="left">Item</th>
								<th class="left">Unit/Type</th>
								<th class="left">Category</th>
								<th class="left">Batch No</th>
								<th class="left">Price</th>
								<th class="left">Quantity</th>
								<th class="left">Remaining</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: $x = 1; if (isset($stockList) && $stockList != null) { foreach ($stockList as $value): $itemExpired = $value->expiry_date != null && $value->expiry_date->isPast(); if($itemExpired){ -->
							<tr class="odd gradeX" style="<!-- php: = $itemExpired ? 'background: #ffebeb;' : '' -->">
								<td class="left"><!-- php: = $value->date_added --></td>
								<td class="left">
									<a data-toggle="modal" data-target="#viewItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" title="View Full Details">
										<!-- php: = $value->has('item') ? $value->item->full_name : '' -->
									</a>
								</td>
								<td class="left"><!-- php: = $value->has('item') && $value->item->has('item_type') ? $value->item->item_type->type_name : '' --></td>
								<td class="left"><!-- php: = $value->has('item') && $value->item->has('item_category') ? $value->item->item_category->name : '' --></td>
								<td class="left"><!-- php: = $value->batch_number --></td>
								<td class="left">GHS <!-- php: = $this->Number->precision($value->unit_selling_price, 2) --></td>
								<td class="left"><!-- php: = $value->quantity --></td>
								<td class="left"><!-- php: = $value->quantity_left --> <!-- php: = $itemExpired ? "<span style='margin-bottom: 5px' class='badge badge-danger'>Expired</span>" : '' --></td>
								<td class="left">
									<!-- php: if($value->status_id != 31) { -->
										<!-- php: if(!$itemExpired) { -->
											<a data-toggle="modal" data-target="#editItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit Quantity
											</a>
											<a data-toggle="modal" data-target="#editStockPriceDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Add') --> btn-xs">
												Edit Price
											</a>
											<a data-toggle="modal" data-target="#transferItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Visit') --> btn-xs">
												Transfer
											</a>
										<!-- php: } -->
										<a data-toggle="modal" data-target="#wasteItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn btn-danger btn-xs">
											Waste
										</a>
										<a data-toggle="modal" data-target="#wasteItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
											Consumption
										</a>
										<a data-toggle="modal" data-target="#wasteItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
											Disable
										</a>
										<!-- php: if($itemExpired) { -->
											<a data-toggle="modal" data-target="#transferItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Visit') --> btn-xs">
												Purchase Requisition
											</a>
											<a data-toggle="modal" data-target="#transferItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
												Ignore
											</a>
										<!-- php: } -->
									<!-- php: } -->
								</td>
							</tr>
							
							<div class="modal fade" id="editItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header">
									<h4 class="modal-title" id="editDrugDialogueTitle">Edit Quantity In Stock: <!-- php: = $value->has('item') ? $value->item->full_name : '' --></h4>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									</div>
									<div class="modal-body">
									
									<div class="row">
										<div class="col-md-12 col-sm-12">
											<div class="card card-box">
												<div class="card-head">
													<header>Edit Details</header>
												</div>
												<div class="card-body" id="bar-parent">
													<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editDrugStock', $value->id, in_array($defaultModel, ['ItemStore', 'DrugsItemStore']) ? 'store' : 'stock', $defaultModel], 'class' => 'form-horizontal']) -->
														<div class="form-body">

															<div class="form-group row">
																<label class="control-label col-md-5">Quantity in Stock
																	<span class="required"> * </span>
																</label>
																<div class="col-md-7">
																	<input type="number" step="1" min="0" name="quantity" id="quantity" data-required="1" value="<!-- php: = $value->quantity -->" placeholder="Enter Quantity" class="form-control input-height" required /> 
																</div>
															</div>
															
														</div>
														<div class="form-actions">
															<div class="row">
																<div class="offset-md-3 col-md-9">
																	<button type="submit" class="btn btn-info">Submit</button>
																	<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
																</div>
															</div>
														</div>
													<!-- php: = $this->Form->end() -->
												</div>
											</div>
										</div>
									</div>
									</div>
								</div>
								</div>
							</div>
								
							<div class="modal fade" id="editStockPriceDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header">
									<h4 class="modal-title" id="editDrugDialogueTitle">Edit Price Of Stock: <!-- php: =$value->has('item') ? $value->item->full_name : '' --></h4>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									</div>
									<div class="modal-body">
									
									<div class="row">
										<div class="col-md-12 col-sm-12">
											<div class="card card-box">
												<div class="card-head">
													<header>Edit Price</header>
												</div>
												<div class="card-body" id="bar-parent">
													<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editStockPrice', $value->id, in_array($defaultModel, ['ItemStore', 'DrugsItemStorePrice']) ? 'store' : 'stock', $defaultModel], 'class' => 'form-horizontal']... -->
														<div class="form-body">

															<div class="form-group row">
																<label class="control-label col-md-5">Stock Price
																	<span class="required"> * </span>
																</label>
																<div class="col-md-7">
																	<input type="number" step="0.01" min="0" name="unit_selling_price" id="unit_selling_price" data-required="1" value="<!-- php: = $value->unit_selling_price -->" placeholder="Enter Price" class="form-control input-height" required /> 
																</div>
															</div>
															
														</div>
														<div class="form-actions">
															<div class="row">
																<div class="offset-md-3 col-md-9">
																	<button type="submit" class="btn btn-info">Submit</button>
																	<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
																</div>
															</div>
														</div>
													<!-- php: = $this->Form->end() -->
												</div>
											</div>
										</div>
									</div>
									</div>
								</div>
								</div>
							</div>
								
							<div class="modal fade" id="transferItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title" id="editDrugDialogueTitle">Transfer Stock: <!-- php: = $value->has('item') ? $value->item->full_name : '' --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Transfer Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'transferItemStock', $value->id, isset($transferFrom) ? $transferFrom : 1], 'type' => 'POST', 'class' => 'form-horizontal', 'id' => 'transfer_form_' . $value-... -->
																<div class="form-body">

																	<div class="form-group row">
																		<label class="control-label col-md-5">Quantity to Transfer
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="number" step="1" min="1" max="<!-- php: = $value->quantity - $value->quantity_sold -->" name="quantity" id="quantity" data-required="1" value="<!-- php: = $value->quantity_left -->" placeholder="Enter Quantity" class="form-control input-height" required /> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Destination
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="stock_basket_id" id="stock_basket_id" required>
																				<option value="">Select Destination</option>
																				<!-- php: if(null !==($stockBaskets)) { -->
																					<!-- php: foreach($stockBaskets as $stockBasket) { -->
																						<!-- php: if(null !==($value->stock_basket_id) && $stockBasket->id == $value->stock_basket_id) { continue; } --> 
																						<option value="<!-- php: = $stockBasket->id -->" ><!-- php: = $stockBasket->name --></option>
																					<!-- php: } -->
																				<!-- php: } -->
																			</SearchableSelectField>
																		</div>
																	</div>
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="submit" class="btn btn-info">Submit</button>
																			<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
																		</div>
																	</div>
																</div>
															<!-- php: = $this->Form->end() -->
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="modal fade" id="wasteItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title" id="editDrugDialogueTitle">Details of Stock: <!-- php: = $value->has('item') ? $value->item->full_name : '' --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Waste Stock</header>
														</div>
														<div class="card-body" id="bar-parent-waste">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'wasteItemStock', $value->id, isset($transferFrom) ? $transferFrom : 1], 'type' => 'POST', 'class' => 'form-horizontal', 'id' => 'waste_form_' . $value->id]) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Quantity to Waste
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="number" step="1" min="1" max="<!-- php: = $value->quantity - $value->quantity_sold -->" name="quantity" id="waste_quantity" data-required="1" value="<!-- php: = $value->quantity_left -->" placeholder="Enter Quantity" class="form-control input-height" required /> 
																		</div>
																	</div>
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="submit" class="btn btn-info">Submit</button>
																			<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
																		</div>
																	</div>
																</div>
															<!-- php: = $this->Form->end() -->
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
								
							<div class="modal fade" id="viewItemStockDialogue_<!-- php: = isset($defaultModel) ? $defaultModel : '' -->_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 950px;">
								<div class="modal-content">
									<div class="modal-header">
									<h4 class="modal-title" id="editDrugDialogueTitle">Stock Details: <!-- php: = $value->has('item') ? $value->item->full_name : '' . ' : ' . $value->batch_number --></h4>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									</div>
									<div class="modal-body">
									
									<div class="row">
										<div class="col-md-12 col-sm-12">
											<div class="card card-box">
												<div class="card-head">
													<header>Details</header>
												</div>
												<div class="card-body row" id="bar-parent">
													<div class="form-body col-md-6" style="padding-left:30px;">
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Drug Name</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->has('item') ? $value->item->full_name : '' --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Date Added</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->date_added --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Total Quantity</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->quantity --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Quantity Sold</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->quantity_sold --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Quantity Left</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->quantity - $value->quantity_sold --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Unit of Pricing</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->item->has('item_type') ? $value->item->item_type->type_name : '' --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Expiry Date</label>
															<div class="col-sm-9 details-info"><span><!-- php: = ($value->expiry_date != null) ? $value->expiry_date->nice() : 'N/A' --></span></div>
														</div><br>
														<!-- advanced details section -->
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label"><b>Advanced Details</b></label>
														</div><hr style="background-color:black">
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Copay Status</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->copay --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Manufacturer</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->supplier->name --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Administration Route</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->item->has('dosage_form') ? $value->item->dosage_from->name: '' --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Age Category</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->item->age_category --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Gender Category</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->item->gender_category --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Allergy</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->item->allergies --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Reorder Level</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->item->reorder_level --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-5 details-label">Stock Type</label>
															<div class="col-sm-7 details-info"><span><!-- php: = $value->item->stock_type --></span></div>
														</div>
														<!-- advanced details -->
													</div>
													<div class="form-body col-md-6">
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Supplier Name</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->has('supplier') ? $value->supplier->name : '' --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Unit Cost</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $this->Number->precision($value->unit_cost_price, 2) --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Total Cost</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $this->Number->precision($value->unit_cost_price_total_calc, 2) --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Discount %</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $this->Number->precision($value->discount, 2) --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Unit Selling Price</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $this->Number->precision($value->unit_selling_price, 2) --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Total Selling Price</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $this->Number->precision($value->unit_selling_price_total_calc, 2) --></span></div>
														</div>
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Estimated Profit</label>
															<!-- php: $discount = $value->discount / 100; $discount_value = $discount * $value->unit_cost_price_total_calc; $final_cost_price = $value->unit_cost_price_total_calc - $discount_value; $estimated_profit = $value->unit_selling_price_total_calc - $fin... -->
															<div class="col-sm-9 details-info"><span><!-- php: = $estimated_profit --></span></div>
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
						<!-- php: $x++; } endforeach; } -->									
						</tbody>
					</table>
					</div>
					
				</div>
			</div>
		
		</div>
	</div>
</div>
<script>
	function privateInsurancePricing(id, name, item_id, item_store_id)
	{
		//variable declarations and getting price, markup, copay status
		var price, copay, markup;
		price = $("#"+id+"_"+name).val();
		markup = $("#private_markup").val();
		copay = $("#private_copay").prop('checked');
		if(copay == 1){
			copay = 1;
		}else if(copay == 0){
			copay = 0;
		}
		//passing values to ajax function 
		saveInsurancePrice(id, price, markup, copay, item_id, item_store_id);
	}

	function companyInsurancePricing(id, name, item_id, item_store_id)
	{
		//variable declarations and getting price, markup, copay status
		var price, copay, markup;
		price = $("#"+id+"_"+name).val();
		markup = $("#company_markup").val();
		copay = $("#company_copay").prop('checked');
		if(copay == 1){
			copay = 1;
		}else if(copay == 0){
			copay = 0;
		}
		//passing values to ajax function 
		saveInsurancePrice(id, price, markup, copay, item_id, item_store_id);
	}

	function nonresidentInsurancePricing(id, name, item_id, item_store_id)
	{
		//variable declarations and getting price, markup, copay status
		var price, copay, markup;
		price = $("#"+id+"_"+name).val();
		markup = $("#nonresident_markup").val();
		copay = $("#nonresident_copay").prop('checked');
		if(copay == 1){
			copay = 1;
		}else if(copay == 0){
			copay = 0;
		}
		//passing values to ajax function 
		saveInsurancePrice(id, price, markup, copay, item_id, item_store_id);

	}

	function saveInsurancePrice(id, price, markup, copay, item_id, item_store_id)
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'Inventory', 'action' => 'saveInsurancePrice' ] ); -->",
            data: {insurance_profile_id:id, price:price, markup:markup, copay:copay, item_id:item_id, item_store_id: item_store_id},
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
				console.log('fetching data')
            },
            success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Pricing successfully saved');
				}else if(res = 2){
					alertify.success('Pricing successfully edited');
				}else{
					alertify.error('Something went wrong');
				}
            }
        });
	}

	//getting copay status of insurance pricing
	if($("#private_copay").val() == 1){
		$("#private_copay").attr('checked', 'checked')
	}

	if($("#company_copay").val() == 1){
		$("#company_copay").attr('checked', 'checked')
	}

	if($("#nonresident_copay").val() == 1){
		$("#nonresident_copay").attr('checked', 'checked')
	}
</script>
<script>
	function insuranceFields(stock_id)
	{
		$('#nhis_inv_form_'+stock_id).hide();
		$('#private_inv_form_'+stock_id).hide();
		$('#conf_form_'+stock_id).hide();
		$('#company_form_'+stock_id).hide();
		$('#nonr_form_'+stock_id).hide();
		$('#inlineCheckbox1_'+stock_id).change(function(){
			if($(this).is(':checked'))
			{
				$('#nhis_inv_form_'+stock_id).show();
				$('#conf_form_'+stock_id).show();
				$('#private_inv_form_'+stock_id).hide();
				$('#conf_form_'+stock_id).hide();
				$('#company_form_'+stock_id).hide();
				$('#nonr_form_'+stock_id).hide();
			}
			else {
				$('#nhis_inv_form_'+stock_id).hide();
			}
		})
		$('#inlineCheckbox2_'+stock_id).change(function(){
			if($(this).is(':checked'))
			{
				$('#private_inv_form_'+stock_id).show();
				$('#conf_form_'+stock_id).show();
				$('#nhis_inv_form_'+stock_id).hide();
				$('#conf_form_'+stock_id).hide();
				$('#company_form_'+stock_id).hide();
				$('#nonr_form_'+stock_id).hide();
			}
			else {
				$('#private_inv_form_'+stock_id).hide();
			}
		})
		$('#inlineCheckbox3_'+stock_id).change(function(){
			if($(this).is(':checked'))
			{
				$('#company_form_'+stock_id).show();
				$('#conf_form_'+stock_id).show();
				$('#nhis_inv_form_'+stock_id).hide();
				$('#private_inv_form_'+stock_id).hide();
				$('#nonr_form_'+stock_id).hide();
			}
			else {
				$('#company_form_'+stock_id).hide();
			}
		})
		$('#inlineCheckbox4_'+stock_id).change(function(){
			if($(this).is(':checked'))
			{
				$('#nonr_form_'+stock_id).show();
				$('#conf_form_'+stock_id).show();
				$('#nhis_inv_form_'+stock_id).hide();
				$('#private_inv_form_'+stock_id).hide();
				$('#company_form_'+stock_id).hide();
			}
			else {
				$('#nonr_form_'+stock_id).hide();
			}
		})
	}
</script>
`;

export default function ElementElementInventoryExpiredStocks() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
