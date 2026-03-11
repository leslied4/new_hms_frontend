const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase"><!-- php: = $elementTitle --></span>
			</div>
		</div>
		<div class="borderBox-body">
		
			<div class="tab-pane active" id="drugs_view">
				<div class="card  card-box">
					<div class="card-body ">
						
					
						<div class="table-scrollable">
						<table class="table table-hover full-width">
							<thead>
								<tr>
									<th class="left">Modifier</th>
									<th class="left">Full Name</th>
									<th class="left">Code</th>
									<th class="left">Indicators</th>
									<th class="left">Compatibility Tests</th>
									<th style="text-align: right">Reorder</th>									
									<th style="text-align: right">Quantity</th>									
									<th style="text-align: right">Value</th>									
									<th class="left">Action</th>
								</tr>
							</thead>
							<tbody>
							<!-- php: $x = 1; foreach ($selectedItems as $value): -->
							
								<tr class="odd gradeX">
									<td class="left"><!-- php: = $value->name --></td>
									<td class="left"><!-- php: = $value->item->full_name --></td>
									<td class="left"><!-- php: = $value->item->item_code --></td>
									<td class="left">
										<ol>
											<!-- php: foreach ($value->transfusion_indicators as $key => $indicator): -->
												<li><!-- php: = $indicator->name --></li>
											<!-- php: endforeach; -->
										</ol>
									</td>
									<td class="left">
										<ol>
											<!-- php: foreach ($value->item->item_lab_tests as $key => $item_lab): -->
												<li><!-- php: = $item_lab->lab_test->name --></li>
											<!-- php: endforeach; -->
										</ol>
									</td>
									<td style="text-align: right"><!-- php: = $value->item->reorder_level --></td>
									<td style="text-align: right"><!-- php: = $value->item->total_quantity --></td>
									<td style="text-align: right"><!-- php: = $this->Number->precision($value->total_value, 2) --></td>
								
									<td class="left">
										<a data-toggle="modal" data-target="#editDrugDialogue_<!-- php: = $elementId . '_' . $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
											Edit
										</a>	
										<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Inventory', 'action' => 'drugConsumption', $value->id]) -->" class="btn btn-xs <!-- php: = Cake\Core\Configure::read('Classes.Visit') -->" escape=false>
											Consumption
										</a>
										<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Inventory','action'=>'deleteDrug',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delete') . '... -->
									</td>
									
								</tr>
								
								<div class="modal fade" id="editDrugDialogue_<!-- php: = $elementId . '_' . $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
										<h4 class="modal-title" id="editDrugDialogueTitle">Edit Item: <!-- php: = $value->name --></h4>
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
														<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editItem', $value->id], 'class' => 'form-horizontal']) -->
															<div class="form-body">
																<div class="form-group row">
																	<label class="control-label col-md-5"> Full Name
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Full Name" class="form-control input-height" required /> 
																	</div>
																</div>
																
																
																<div class="form-group row">
																	<label class="control-label col-md-5">Item Code
																		
																	</label>
																	<div class="col-md-7">
																		<input type="text" name="item_code" id="item_code" data-required="1" value="<!-- php: = $value->item_code -->" placeholder="Enter item code" class="form-control input-height" required /> 
																	</div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-5">Item Form (Unit of Pricing)
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<SearchableSelectField class="form-control input-height" name="item_type_id" id="item_type_id" required>
																			<option value="">Select Form </option>
																			
																			<!-- php: foreach($itemTypes as $selectOption) { -->
																				<option <!-- php: = $value->item_type_id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name --></option>
																			<!-- php: } -->
																			
																		</SearchableSelectField>
																	</div>
																</div>	

																<div class="form-group row">
																	<label class="control-label col-md-5">Item Class
																	</label>
																	<div class="col-md-7">
																		<SearchableSelectField class="form-control input-height" name="item_class_id" id="item_class_id" >
																			<option value="">Select Class</option>
																			
																			<!-- php: foreach($itemClasses as $selectOption) { -->
																				<option <!-- php: = $value->item_class_id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->class_name --></option>
																			<!-- php: } -->
																			
																		</SearchableSelectField>
																	</div>
																</div>
										
																<div class="form-group row">
																	<label class="control-label col-md-5">Quantity (Unit Quantity)

																	</label>
																	<div class="col-md-7">
																		<input type="number" step="1" min="0" name="unit_quantity" id="unit_quantity" data-required="1" value="<!-- php: = $value->unit_quantity -->" placeholder="Unit Quantity" class="form-control input-height" required /> 
																	</div>
																</div>

																<div class="form-group row">
																	<label class="control-label col-md-5">Reorder Level
																		
																	</label>
																	<div class="col-md-7">
																		<input type="number" step="1" min="0" name="reorder_level" id="reorder_level" data-required="1" value="<!-- php: = $value->reorder_level -->" placeholder="Enter reorder level" class="form-control input-height" required /> 
																	</div>
																</div>
																
																<div class="form-group row">
																	<label class="control-label col-md-5">Description
																	</label>
																	<div class="col-md-7">
																		<input type="text" name="description" data-required="0" value="<!-- php: = $value->description -->" placeholder="Enter description" class="form-control input-height" /> 
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


<script>
	function clearDrugFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementInventoryBloodItems() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
