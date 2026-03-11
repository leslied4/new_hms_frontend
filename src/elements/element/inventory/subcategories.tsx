const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Sub Categories</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#sub_categories_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#sub_categories_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="sub_categories_add">
					<h4>Add a new Inventory Sub Category</h4>
					<!-- php: = $this->Form->create($category, ['url' => ['controller' => 'Inventory', 'action' => 'addSubCategory']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="category_name" id="category_name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
                            <label class="control-label col-md-4">Parent Category
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                                <SearchableSelectField class="form-control input-height" name="parent_category_id" id="parent_category_id" required>
                                    <option value="">Select Parent Category</option>
                                    <!-- php: foreach($categories as $category) { --> 
										<option value="<!-- php: = $category->id -->"> <!-- php: = $category->name --></option>
                                    <!-- php: } -->
                                </SearchableSelectField>
                            </div>
                        </div>	
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearCategoryFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="sub_categories_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Parent Category</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($sub_categories as $value): -->
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->category_name --></td>
										<!-- php: foreach ($categories as $category): -->
											<!-- php: if($category->id == $value->parent_category_id){ -->
												<td class="left"><!-- php: = $category->name --></td>
											<!-- php: } -->
										<!-- php: endforeach -->	
										<td class="left">
											<a data-toggle="modal" data-target="#editSubCategoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: // = $this->Form->postLink(__('Delete'), ['controller'=>'ManageInsurances','action'=>'deleteProvider',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classe... -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editSubCategoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editProviderDialogueTitle">Edit Sub Category: <!-- php: = $value->category_name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editSubCategory', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="category_name" data-required="1" value="<!-- php: = $value->category_name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Parent Category
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="parent_category_id" id="parent_category_id" required>
																				<option value="">Select Parent Category</option>
																				<!-- php: foreach($categories as $category) { -->
																					<!-- php: if($category->id == $value->parent_category_id){ -->
																						<option selected value="<!-- php: = $value->parent_category_id -->"> <!-- php: = $category->name --></option>
																					<!-- php: }elseif($category->id != $value->parent_category_id){ -->
																						<option value="<!-- php: = $category->id -->"> <!-- php: = $category->name --></option>
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
								<!-- php: endforeach; -->									
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
	function clearCategoryFields(){
		$('#category_name').val('');
		$('#parent_category_id').val('');
	}
</script>

`;

export default function ElementElementInventorySubcategories() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
