const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">			
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#stocks_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#stocks_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">



				<div class="tab-pane " id="stocks_add">
					<h4>Add a new Stock</h4>
					<!-- php: = $this->Form->create($order, ['url' => ['controller' => 'Inventory', 'action' => 'addOrders']]); -->
					
						<div class="form-group row">
							<label class="control-label col-md-4">Item
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select item name" name="item_id" id="item_id" data-live-search="true"  required>
									<option value="">Select...</option>									
									<!-- php: foreach($items as $selectOption) { -->
											<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
										<!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>						
						<div class="form-group row">
							<label class="control-label col-md-4">	
                                Box	Quantity
							</label>
							<div class="col-md-5">
								<input type="number" min="1" name="box_number" id="box_number" data-required="0" placeholder="Enter number of boxes" class="form-control input-height" /> 
							</div>
						</div>
                        <div class="form-group row">
							<label class="control-label col-md-4">
                                 Inner Quantity								
							</label>
							<div class="col-md-5">
								<input type="number" min="1" name="inner_number" id="inner_number" data-required="0" placeholder="Enter inner quantity" class="form-control input-height" /> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">
                                 Unit Cost								
							</label>
							<div class="col-md-5">
								<input type="text"  min="0" name="unit_cost" id="unit_cost" data-required="0" placeholder="Enter unit cost of item" class="form-control input-height" /> 
							</div>
						</div>
                        <div class="form-group row">
							<label class="control-label col-md-4">Batch Number								
							</label>
							<div class="col-md-5">
								<input type="text" name="batch_number" id="batch_number" data-required="0" placeholder="Enter batch number" class="form-control input-height" /> 
							</div>
						</div>
				
						<div class="form-group row">
							<label class="control-label col-md-4">Expiry Date
							<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
									<input class="form-control input-height" placeholder="Expiry Date" name = "expiry_date" id = "expiry_date" type="text" value="" required>
										<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
								</div>
									<input type="hidden" id="dtp_input2" value="" />
							</div>
						</div>		

						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearStockFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>



				<div class="tab-pane active" id="stocks_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Item</th>
										<th class="left">Box</th>
										<th class="left">Inner</th>
										<th class="left">Unit</th>
										<th class="left">Unit Cost</th>
										<th class="left">Total</th>
										<th class="left">Transfered</th>
                                        <th class="left">Batch</th>
										<th class="left">Expiry Date</th>
                                        <th class="left">Date</th>
                                        <th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($orders as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
                                        <td class="left"><!-- php: =isset($value->order_item)? $value->order_item->name : '' --></td>
										<td class="left"><!-- php: =$value->box_number --></td>
										<td class="left"><!-- php: =$value->inner_number --></td>
										<td class="left"><!-- php: =($value->box_number * $value->inner_number) --></td>
										<td class="left"><!-- php: =$value->unit_cost --></td>
										<td class="left"><!-- php: =($value->unit_cost * $value->box_number * $value->inner_number) --></td>
                                        <td class="left"><!-- php: =$value->transfer_quantity --></td>
										<td class="left"><!-- php: =$value->batch_number --></td>
										<td class="left"><!-- php: =$value->expiry_date --></td>
										<td class="left"><!-- php: =$value->date_added --></td>


										<td class="left">
											<a data-toggle="modal" data-target="#editStockItemDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editStockItemDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editStockItemDialogueTitle">Item: <!-- php: = isset($value->order_item)? $value->order_item->name : '' --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editOrders', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">																										
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-4">	
                                                                            Box	Quantity
                                                                        </label>
                                                                        <div class="col-md-8">
                                                                            <input type="number" name="box_number" id="box_number" data-required="0" value="<!-- php: = $value->box_number -->" placeholder="Enter number of boxes" class="form-control input-height" /> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-4">
                                                                            Inner Quantity								
                                                                        </label>
                                                                        <div class="col-md-8">
                                                                            <input type="number" name="inner_number" id="inner_number" data-required="0" value="<!-- php: = $value->inner_number -->" placeholder="Enter inner quantity" class="form-control input-height" /> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-4">Batch Number								
                                                                        </label>
                                                                        <div class="col-md-8">
                                                                            <input type="text" name="batch_number" id="batch_number" data-required="0" value="<!-- php: = $value->batch_number -->" placeholder="Enter batch number" class="form-control input-height" /> 
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
	function clearStockFields(){
        $('#box_number').val('');
		$('#inner_number').val('');
		$('#batch_number').val('');
	}
</script>

`;

export default function ElementElementInventoryOrdersStock() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
