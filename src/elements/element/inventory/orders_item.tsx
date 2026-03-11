const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#items_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#items_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="items_add">
					<h4>Add a new Item</h4>
					<!-- php: = $this->Form->create($item, ['url' => ['controller' => 'Inventory', 'action' => 'addItems']]); -->
					
						<div class="form-group row">
							<label class="control-label col-md-4">Item Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter item name" class="form-control input-height" required /> 
							</div>
						</div>	
						<div class="form-group row">
							<label class="control-label col-md-4">Category
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select item category" name="category_id" id="category_id" data-live-search="true"  required>
									<option value="">Select...</option>									
									<!-- php: foreach($categories as $selectOption) { -->
											<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
										<!-- php: } -->									
								</SearchableSelectField>
							</div>
						</div>							
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearItemFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="items_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Item</th>
										<th class="left">Category</th>
										<th class="left">Action</th>										
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($items as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
                                        <td class="left"><!-- php: =$value->name --></td>
										<td class="left"><!-- php: =isset($value->order_category)? $value->order_category->name : '' --></td>
										
										<td class="left">
											<a data-toggle="modal" data-target="#editItemDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editItemDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editItemDialogueTitle">Item: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editItems', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-3">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-9">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter item name" class="form-control input-height" required /> 
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
	function clearItemFields(){
        $('#name').val('');
	}
</script>

`;

export default function ElementElementInventoryOrdersItem() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
