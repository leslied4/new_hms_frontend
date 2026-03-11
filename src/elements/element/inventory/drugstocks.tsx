const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Stock</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#stockitems_add" data-toggle="tab"> Add Stock</a>
				</li>
				<li class="nav-item">
					<a href="#stockitems_view" data-toggle="tab"> Stock History </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="stockitems_add">
					<h4>Add a new Stock Item</h4>
					<!-- php: = $this->Form->create($drugStock, ['url' => ['controller' => 'Inventory', 'action' => 'addDrugStock']]); -->
												
						<div class="form-group row">
							<label class="control-label col-md-4">Drug Name/Form/Dosage
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
							<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select drug" name="drug_id" id="drug_id" data-live-search="true"  required>
									<option value="">Select...</option>									
									<!-- php: foreach($drugs as $selectOption) { -->
											<option value="<!-- php: = $selectOption->id -->" data-content="<!-- php: = h($selectOption->full_name) -->   <span class='badge badge-danger'><!-- php: = ($selectOption->has('item_type') ? $selectOption->item_type->type_name : '') --></span>"><!-- php: = $selectOption->full_name --></option>
										<!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Batch Number
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text"  step="1" name="batch_number" id="batch_number" data-required="1" placeholder="Enter batch_number" class="form-control input-height" required /> 
							</div>
						</div>	
																	
						<div class="form-group row">
							<label class="control-label col-md-4">Quantity
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" oninput="myFunction();  myFunction1(); myFunction2();" step="1" min="1" name="quantity" id="quantity" data-required="1" placeholder="Enter quantity" class="form-control input-height" required /> 
							</div>
						</div>	
								
						<div class="form-group row">
							<label class="control-label col-md-4">Unit Cost Price
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" oninput="myFunction(); myFunction2()" step="0.01" min="0" name="unit_cost_price" id="unit_cost_price" data-required="1" placeholder="Enter unit_cost_cost" class="form-control input-height" required /> 
							</div>
						</div>	
						
						<div id="div_total_cost_price" style="display:none;">
							<div class="form-group row">
								<label class="control-label col-md-4">Total Cost Price
								</label>
								<div class="col-md-5">
									<input type="number" step="0.01" min="0" name="total_cost_price" id="total_cost_price" data-required="1" class="form-control input-height" readonly required /> 
								</div>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Discount(%)
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" oninput="myFunction2()" step="0.01" min="0" max="100" name="discount" id="discount" data-required="1" placeholder="Eg. 25.5" class="form-control input-height" required /> 
							</div>
						</div>

						<div id="div_new_total_cost_price" style="display:none;">
							<div class="form-group row">
								<label class="control-label col-md-4">New Total Cost Price
								</label>
								<div class="col-md-5">
									<input type="number" step="0.01" min="0" name="new_total_cost_price" id="new_total_cost_price" data-required="1" class="form-control input-height" readonly required /> 
								</div>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Unit Selling Price
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" oninput="myFunction1()" step="0.01" min="0" name="unit_selling_price" id="unit_selling_price" data-required="1" placeholder="Enter unit_selling_price" class="form-control input-height" required /> 
							</div>
						</div>	
						
						<div id="div_total_selling_price" style="display:none;">
							<div class="form-group row">
								<label class="control-label col-md-4">Total Selling Price
								</label>
								<div class="col-md-5">
									<input type="number" step="0.01" min="0" name="total_selling_price" id="total_selling_price" data-required="1" class="form-control input-height" readonly required /> 
								</div>
							</div>
						</div>
												
						<div class="form-group row">
							<label class="control-label col-md-4">Supplier
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="supplier_id" id="supplier_id">
									<option value="">Select...</option>
									
									<!-- php: foreach($suppliers as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } --> 
									
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Expiry Date
							</label>
							<div class="col-md-5">
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="Expiry Date" name = "expiry_date" id = "expiry_date" type="text" value="" >
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
									<input type="hidden" id="dtp_input2" value="" />
							</div>
						</div>														
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearDrugStockFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="stockitems_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Date Added</th>
										<th class="left">Name/Form/Dosage</th>
										<th class="left">Batch</th>
										<th class="left">Quantity</th>
										<th class="left">Sold</th>
										<th class="left">Qty Left</th>
										<th class="left">Unit Cost</th>
										<th class="left">Selling Price</th>
										<th class="left">Est. Profit</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($drugStocks as $value): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->date_added --></td>
										<td class="left"><!-- php: = $value->has('drug') ? $value->drug->full_name : '' --></td>
										<td class="left"><!-- php: = $value->batch_number --></td>
										<td class="left"><!-- php: = $value->quantity --></td>
										<td class="left"><!-- php: = $value->quantity_sold --></td>
										<td class="left"><!-- php: = $value->quantity - $value->quantity_sold --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->unit_cost_price, 2) --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->unit_selling_price, 2) --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->estimated_profit, 2) --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#viewDrugStockDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
												View
											</a>	
											<a data-toggle="modal" data-target="#editDrugStockDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit Quantity
											</a>	
										</td>
										
									</tr>
									   
									<div class="modal fade" id="editDrugStockDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
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
									  
									<div class="modal fade" id="viewDrugStockDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
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
																  										
								<!-- php: $x++; endforeach; -->									
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

export default function ElementElementInventoryDrugstocks() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
