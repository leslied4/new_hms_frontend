const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#wastes_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#wastes_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="wastes_add">
					<h4>Add a new Waste</h4>
					<!-- php: // debug($transfers->toArray()); debug($items->toArray()); exit; -->
					<!-- php: = $this->Form->create($waste, ['url' => ['controller' => 'Inventory', 'action' => 'addWastes']]); -->
					
						<div class="form-group row">
							<label class="control-label col-md-4">Item
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								 <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select item name" name="transfer_id" id="transfer_id" data-live-search="true"  required>					                                    
                                    <!-- php: foreach($transfers as $value){ foreach($items as $item){ if($item->id == $value->order->item_id){ -->
												<option value="<!-- php: = $value->id -->" data-content="<!-- php: = $value->order->order_item->name --> <span class='badge badge-danger'><!-- php: = 'box: '. $value->order->box_number .' | '. 'inner: '.$value->order->inner_number --></span> <span class='badge badge-info'><!-- php: = 'batch no.: '.$value->order->batch_number --></span>" ?> </option>
									<!-- php: }}} -->									
								 </SearchableSelectField>
							</div>
						</div>						
						<div class="form-group row">
							<label class="control-label col-md-4">	
                                Box	Quantity
							</label>
							<div class="col-md-5">
								<input type="number" name="box_number" id="box_number" data-required="0" placeholder="Enter number of boxes" class="form-control input-height" /> 
							</div>
						</div>
                        <div class="form-group row">
							<label class="control-label col-md-4">
                                 Inner Quantity								
							</label>
							<div class="col-md-5">
								<input type="number" name="inner_number" id="inner_number" data-required="0" placeholder="Enter inner quantity" class="form-control input-height" /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Reason
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select reason" name="reason_id" id="reason_id" data-live-search="true"  required>					
                                                                         <!-- php: foreach($reasons as $selectOption){ -->
										<option value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->name --> </option>
									<!-- php: } -->									
								</SearchableSelectField>
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
				<div class="tab-pane active" id="wastes_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Item</th>
										<th class="left">Batch</th>
										<th class="left">Box</th>
										<th class="left">Inner</th>
										<th class="left">Unit</th>
                                        <th class="left">Date</th>
                                        <th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($wastes as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
										<!-- php: foreach($transfers as $transfer){ if($transfer->id == $value->transfer_id){ foreach($items as $item){ if($item->id == $transfer->order->item_id){ -->

										<td class="left">
											<!-- php: = $item->name -->
										</td>

										<!-- php: }} -->
                                           <td class="left"><!-- php: =$transfer->order->batch_number --></td>
										<!-- php: }} -->
										</td>
										<td class="left"><!-- php: =$value->box_number --></td>
										<td class="left"><!-- php: =$value->inner_number --></td>
										<td class="left"><!-- php: =($value->box_number * $value->inner_number) --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editWasteDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editWasteDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editWasteDialogueTitle">Item: <!-- php: = isset($value->order_item)? $value->order_item->name : '' --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editWastes', $value->id], 'class' => 'form-horizontal']) -->
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

export default function ElementElementInventoryOrdersWaste() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
