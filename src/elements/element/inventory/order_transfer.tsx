const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#transfers_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#transfers_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="transfers_add">
					<h4>Transfer a new Item</h4>
					<!-- php: = $this->Form->create($transfer, ['url' => ['controller' => 'Inventory', 'action' => 'addTransfers']]); -->
					
						<div class="form-group row">
							<label class="control-label col-md-3">Item
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select item name" name="order_id" id="order_id" data-live-search="true"  required>					
                                     
                                	<option value="">Select...</option>									
                                    <!-- php: foreach($orders as $selectOption) { -->
                                                <option value="<!-- php: = $selectOption->id -->" data-content="<!-- php: = isset($selectOption->order_item)? $selectOption->order_item->name : '' --> <span class='badge badge-danger'><!-- php: = 'box: '. ($selectOption->box_number - $selectOption->transfer_quantity) .' | '. 'inner: '.$selectOption->inner_number --></span> <span class='badge badge-info'><!-- php: = 'batch no.: '.$selectOption->batch_number --></span>" ?> </option>
                                            <!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-3">Department
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select department" name="department_id" id="department_id" data-live-search="true"  required>
									<option value="">Select...</option>									
									<!-- php: foreach($departments as $selectOption) { -->
											<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
										<!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>	
                        <div class="form-group row">
							<label class="control-label col-md-3">Supplies
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select supplies" name="supply_id" id="supply_id" data-live-search="true"  required>
									<option value="">Select...</option>									
									<!-- php: foreach($supplies as $selectOption) { -->
											<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
										<!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>					
						<div class="form-group row">
							<label class="control-label col-md-3">	
                                Box	Quantity
							</label>
							<div class="col-md-5">
								<input type="number" min="1" name="box_number" id="box_number" data-required="0" placeholder="Enter number of boxes" class="form-control input-height" /> 
							</div>
						</div>                                              
						<div class="row">
							<div class="offset-md-3 col-md-5">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearStockFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="transfers_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Item</th>
										<th class="left">Department</th>
                                        <th class="left">Supples</th>
										<th class="left">Box</th>
										<th class="left">Inner</th>
										<th class="left">Unit</th>
                                        <th class="left">Batch</th>
                                        <th class="left">Date</th>
                                        <th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($transfers as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
                                        <td class="left"><!-- php: foreach($items as $item){ if($item->id == $value->order->item_id){ -->                                       
                                                
                                               <!-- php: = $item->name -->
                                            
                                            <!-- php: } } -->
                                        </td>
										<td class="left"><!-- php: =isset($value->department)? $value->department->name : '' --></td>
                                        <td class="left"><!-- php: =isset($value->order_supply)? $value->order_supply->name : '' --></td>
										<td class="left"><!-- php: =$value->box_number --></td>
										<td class="left"><!-- php: =$value->inner_number --></td>
										<td class="left"><!-- php: =($value->box_number * $value->inner_number) --></td>
                                        <td class="left"><!-- php: =isset($value->order)? $value->order->batch_number : '' --></td>
										<td class="left"><!-- php: =$value->date_added --></td>


										<td class="left">
											<a data-toggle="modal" data-target="#editTransfersDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editTransfersDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editTransfersDialogueTitle">Item: <!-- php: = isset($value->order_supply)? $value->order_supply->name : '' --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editTransfers', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-3">	
                                                                            Box	Quantity
                                                                        </label>
                                                                        <div class="col-md-9">
                                                                            <input type="number" name="box_number" id="box_number" data-required="0" value="<!-- php: = $value->box_number -->" placeholder="Enter number of boxes" class="form-control input-height" /> 
                                                                        </div>
                                                                    </div>                                                                   
                                                                    <div class="form-group row">
                                                                        <label class="control-label col-md-3">Batch Number								
                                                                        </label>
                                                                        <div class="col-md-9">
                                                                            <input type="text" name="batch_number" id="batch_number" data-required="0" value="<!-- php: = isset($value->order)? $value->order->batch_number : '' -->" readonly class="form-control input-height" /> 
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

export default function ElementElementInventoryOrderTransfer() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
