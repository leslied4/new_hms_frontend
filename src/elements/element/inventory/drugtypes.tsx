const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
			<span class="font-dark">
				Drug Types
			</span>				 
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#drugtypes_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#drugtypes_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="drugtypes_add">
					<h4>Add a new drug type</h4>
					<!-- php: = $this->Form->create($drugType, ['url' => ['controller' => 'Inventory', 'action' => 'addDrugType']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Type Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="type_name" id="type_name" data-required="1" placeholder="Enter type name" class="form-control input-height" required /> 
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-4">Quantity
							</label>
							<div class="col-md-5">
								<input type="text" name="quantity" id="quantity_id" data-required="1" placeholder="Eg 1 tablet or 10 ml" class="form-control input-height" required/> 
							</div>
						</div>												
						<div class="form-group row">
							<label class="control-label col-md-4">Description
							</label>
							<div class="col-md-5">
								<input type="text" name="type_description" id="type_description" data-required="1" placeholder="Enter type description" class="form-control input-height" /> 
							</div>
						</div>												
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearDrugTypeFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="drugtypes_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Type Name</th>
										<th class="left">Quantity</th>
										<th class="left">Description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($drugTypes as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$value->type_name --></td>
										<td class="left"><!-- php: =$value->quantity --></td>
										<td class="left"><!-- php: =$value->type_description --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editDrugTypeDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Inventory','action'=>'deleteDrugType',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->type_name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Del... -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editDrugTypeDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editDrugTypeTitle">Edit Drug Type: <!-- php: = $value->type_name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editDrugType', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Type Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="type_name" data-required="1" value="<!-- php: = $value->type_name -->" placeholder="Enter type name" class="form-control input-height" required /> 
																		</div>
																	</div>																										
																	<div class="form-group row">
																		<label class="control-label col-md-5">Quantity
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="quantity" data-required="1" value="<!-- php: = $value->quantity -->" placeholder="Eg 1 tablet or 10 ml" class="form-control input-height" required/> 
																		</div>
																	</div>	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Description
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="type_description" data-required="1" value="<!-- php: = $value->type_description -->" placeholder="Enter type descritiopm" class="form-control input-height" /> 
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
	function clearDrugTypeFields(){
		$('#class_name').val('');
	}
</script>

`;

export default function ElementElementInventoryDrugtypes() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
