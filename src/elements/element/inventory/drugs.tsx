const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Drugs</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#drugs_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#drugs_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="drugs_add">
					<h4>Add a new Drug</h4>
					<!-- php: = $this->Form->create($drug, ['url' => ['controller' => 'Inventory', 'action' => 'addDrug']]); -->
					
						<div class="form-group row">
							<label class="control-label col-md-4">Generic Name / Form / Dosage
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter Generic Name / Form/ Dosage" class="form-control input-height" required /> 
							</div>
						</div>										

						<div class="form-group row">
							<label class="control-label col-md-4">Drug Code
								
							</label>
							<div class="col-md-5">
								<input type="text" name="drug_code" id="drug_code" data-required="1" placeholder="Enter drug code" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Drug Form (Unit of Pricing)
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="drug_type_id" id="drug_type_id" required>
									<option value="">Select...</option>
									
									<!-- php: foreach($drugTypes as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->type_name --></option>
									<!-- php: } -->
									
								</SearchableSelectField>
							</div>
						</div>	

						<div class="form-group row">
							<label class="control-label col-md-4">Drug Class
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="drug_class_id" id="drug_class_id" >
									<option value="">Select...</option>
									
									<!-- php: foreach($drugClasses as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->class_name --></option>
									<!-- php: } -->
									
								</SearchableSelectField>
							</div>
						</div>
																	
						<div class="form-group row">
							<label class="control-label col-md-4">Reorder Level

							</label>
							<div class="col-md-5">
								<input type="number" step="1" min="0" name="reorder_level" id="reorder_level" data-required="1" value="0" placeholder="Enter reorder level" class="form-control input-height" required /> 
							</div>
						</div>
					
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<input type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" /> 
							</div>
						</div>																																		
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearDrugFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="drugs_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name / Form / Dosage</th>
										<th class="left">Code</th>
										<th class="left">Drug Type</th>
										<th class="left">Drug Class</th>									
										<th style="text-align: right">Reorder Level</th>									
										<th style="text-align: right">Quantity</th>									
										<th style="text-align: right">Value</th>									
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($drugs as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->full_name --></td>
										<td class="left"><!-- php: = $value->drug_code --></td>
										<td class="left"><!-- php: = $value->has('item_type') ? $value->item_type->type_name : '' --></td>
										<td class="left"><!-- php: = $value->has('drug_class') ? $value->drug_class->class_name : '' --></td>
										<td style="text-align: right"><!-- php: = $value->reorder_level --></td>
										<td style="text-align: right"><!-- php: = $value->total_quantity --></td>
										<td style="text-align: right"><!-- php: = $this->Number->precision($value->total_value, 2) --></td>
									
										<td class="left">
											<a data-toggle="modal" data-target="#editDrugDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>	
											<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'Inventory', 'action' => 'drugConsumption', $value->id]) -->" class="btn btn-xs btn-outline" escape=false>
												Consumption
											</a>
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Inventory','action'=>'deleteDrug',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delete') . '... -->
										</td>
										
									</tr>
									   
									<div class="modal fade" id="editDrugDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editDrugDialogueTitle">Edit Drug: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editDrug', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5"> Generic Name / Form / Dosage
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter Generic name / Form / Dosage" class="form-control input-height" required /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Drug Code
																			
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="drug_code" id="drug_code" data-required="1" value="<!-- php: = $value->drug_code -->" placeholder="Enter drug_code" class="form-control input-height" required /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Drug Type
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="drug_type_id" id="drug_type_id" required>
																				<option value="">Select... </option>
																				
																				<!-- php: foreach($drugTypes as $selectOption) { -->
																					<option <!-- php: = $value->item_type_id == $selectOption->id ? 'selected' : '' --> value="<!-- php: = $selectOption->id -->"> <!-- php: = $selectOption->type_name --></option>
																				<!-- php: } -->
																				
																			</SearchableSelectField>
																		</div>
																	</div>	

																	<div class="form-group row">
																		<label class="control-label col-md-5">Drug Class
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="drug_class_id" id="drug_class_id" >
																				<option value="">Select...</option>
																				
																				<!-- php: foreach($drugClasses as $selectOption) { -->
																					<option <!-- php: = $value->drug_class_id == $selectOption->id ? 'selected' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->class_name --></option>
																				<!-- php: } -->
																				
																			</SearchableSelectField>
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
</div>


<script>
	function clearDrugFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementInventoryDrugs() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
