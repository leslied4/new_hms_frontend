const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">AEFI Categories</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#aefi_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#aefi_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="aefi_add">
					<h4>Add a new AEFI category</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'addAefiCategory']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Category Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="category_name" id="name" data-required="1" placeholder="Enter type name" class="form-control input-height" required /> 
							</div>
						</div>
																	
						<div class="form-group row">
							<label class="control-label col-md-4"> Category Description
								
							</label>
							<div class="col-md-5">
								<input type="text" name="category_description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" /> 
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'resetForm()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->	
				</div>
				<div class="tab-pane active" id="aefi_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">AEFI Category</th>
										<th class="left">AEFI Description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($aefi_categories as $aefi_category): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $aefi_category->category_name --></td>
										<td class="left"><!-- php: = $aefi_category->category_description --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editAefiCategoryDialogue_<!-- php: = $aefi_category->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>	
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ImmunizationRequest','action'=>'deleteAefiCategory',$aefi_category->id], ['confirm' => __('Are you sure you want to delete {0}?', $aefi_category->id), 'class' => 'btn ' . Cake\Core\Confi... -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editAefiCategoryDialogue_<!-- php: = $aefi_category->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Edit AEFI category: <!-- php: = $aefi_category->id --></h4>
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
															<!-- php: = $this->Form->create($aefi_category, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'editAefiCategory', $aefi_category->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Category Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="category_name" data-required="1" value="<!-- php: = $aefi_category->category_name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Category Description
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="category_description" data-required="0" value="<!-- php: = $aefi_category->category_description -->" placeholder="Enter description" class="form-control input-height" /> 
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
	function resetForm(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementManageVaccinesAefiCategories() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
