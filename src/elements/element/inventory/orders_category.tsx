const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#category_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#category_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="category_add">
					<h4>Add a new Category</h4>
					<!-- php: = $this->Form->create($category, ['url' => ['controller' => 'Inventory', 'action' => 'addCategories']]); -->					
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter item name" class="form-control input-height" required /> 
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
				<div class="tab-pane active" id="category_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Category</th>
										<th class="left">Action</th>										
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($categories as $value): -->							
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
                                        <td class="left"><!-- php: =$value->name --></td>										
										<td class="left">
											<a data-toggle="modal" data-target="#editCategoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>									   
									<div class="modal fade" id="editCategoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editCategoryDialogueTitle">Category: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editCategories', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-3">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-9">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter category name" class="form-control input-height" required /> 
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
	function clearCategoryFields(){
        $('#name').val('');
	}
</script>

`;

export default function ElementElementInventoryOrdersCategory() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
