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
								<th class="left">Category</th>
								<th class="left">Batch No</th>
								<th class="left">Quantity</th>
								<th class="left">Remaining</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
						<!-- php: $x = 1; if (isset($stockList) && $stockList != null) { foreach ($stockList as $value): -->								
							<tr class="odd gradeX">
								<td class="left"><!-- php: = $value->date_added --></td>
								<td class="left"><!-- php: = $value->has('item') ? $value->item->full_name : '' --></td>
								<td class="left"><!-- php: = $value->has('item') && $value->item->has('item_category') ? $value->item->item_category->name : '' --></td>
								<td class="left"><!-- php: = $value->batch_number --></td>
								<td class="left"><!-- php: = $value->quantity --></td>
								<td class="left"><!-- php: = $value->quantity_left --></td>
								<td class="left">
									<a data-toggle="modal" data-target="#viewItemStockDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
										View
									</a>	
									<a data-toggle="modal" data-target="#editItemStockDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
										Edit Quantity
									</a>	
									<a data-toggle="modal" data-target="#transferItemStockDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Visit') --> btn-xs">
										Transfer
									</a>	
								</td>
							</tr>
								
							<div class="modal fade" id="editItemStockDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header">
									<h4 class="modal-title" id="editDrugDialogueTitle">Edit Quantity In Stock: <!-- php: = $value->drug->full_name --></h4>
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
													<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editDrugStock', $value->id], 'class' => 'form-horizontal']) -->
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
								
							<div class="modal fade" id="transferItemStockDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header">
									<h4 class="modal-title" id="editDrugDialogueTitle">Transfer Stock: <!-- php: = $value->drug->full_name --></h4>
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
													<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'transferItemStock', $value->id], 'type' => 'POST', 'class' => 'form-horizontal', 'id' => 'transfer_form_' . $value->id]) -->
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
																		<!-- php: foreach($stockBaskets as $stockBasket) { --> 
																			<option value="<!-- php: = $stockBasket->id -->" ><!-- php: = $stockBasket->name --></option>
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
								
							<div class="modal fade" id="viewItemStockDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 700px;">
								<div class="modal-content">
									<div class="modal-header">
									<h4 class="modal-title" id="editDrugDialogueTitle">Stock Details: <!-- php: = $value->drug->full_name . ' : ' . $value->batch_number --></h4>
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
												<div class="card-body" id="bar-parent">
													<div class="form-body">
														<div class="form-group row">
															<label class="control-label col-sm-3 details-label">Drug Name</label>
															<div class="col-sm-9 details-info"><span><!-- php: = $value->drug->full_name --></span></div>
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
															<div class="col-sm-9 details-info"><span><!-- php: = $value->drug->has('item_type') ? $value->drug->item_type->type_name : '' --></span></div>
														</div>
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
															<div class="col-sm-9 details-info"><span><!-- php: = $this->Number->precision($value->estimated_profit, 2) --></span></div>
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
																								
						<!-- php: $x++; endforeach; } -->									
						</tbody>
					</table>
					</div>
				</div>
			</div>
		
		</div>
	</div>
	</div>
</div>


<script>
	function clearDrugStockFields(){
	}
	
	function myFunction() {

		var quantity = document.getElementById("quantity").value;
		var unit_cost_price = document.getElementById("unit_cost_price").value;

		if(quantity != "" && unit_cost_price != ""){
			document.getElementById("total_cost_price").value = (quantity * unit_cost_price).toFixed(2);
			setTimeout(function () {
				document.getElementById("div_total_cost_price").style.display='block';
			}, 1000);
		}
		else
		{
			setTimeout(function () {
				document.getElementById("div_total_cost_price").style.display='none';
			}, 1000);
		}
	}

	function myFunction1() {
		var quantity = document.getElementById("quantity").value;
		var unit_selling_price = document.getElementById("unit_selling_price").value;

		if(quantity != "" && unit_selling_price != ""){
			document.getElementById("total_selling_price").value = (quantity * unit_selling_price).toFixed(2);
			setTimeout(function () {
				document.getElementById("div_total_selling_price").style.display='block';
			}, 1000);
		}
		else
		{
			setTimeout(function () {
				document.getElementById("div_total_selling_price").style.display='none';
			}, 1000);
		}
	}

	function myFunction2() {
		var quantity = document.getElementById("quantity").value;
		var unit_cost_price = document.getElementById("unit_cost_price").value;
		var discount = document.getElementById("discount").value;

		if(quantity != "" && unit_cost_price != "" && discount != "")
		{

			if(discount >= 0 && discount <= 100)
			{
				var total = quantity * unit_cost_price;
				var percentage = discount / 100;

				document.getElementById("new_total_cost_price").value = (total - percentage *  total).toFixed(2);
				setTimeout(function () {
					document.getElementById("div_new_total_cost_price").style.display='block';
				}, 1000);
			}
			else
			{
				setTimeout(function () {
				document.getElementById("div_new_total_cost_price").style.display='none';
				document.getElementById("new_total_cost_price").value
			}, 1000);

			}
		

		}
		else
		{
			setTimeout(function () {
				document.getElementById("div_new_total_cost_price").style.display='none';
				document.getElementById("new_total_cost_price").value
			}, 1000);
		}
	}

</script>

`;

export default function ElementElementInventoryPharmacy() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
