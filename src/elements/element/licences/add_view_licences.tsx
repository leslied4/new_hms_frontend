const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Licences</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#categories_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#categories_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="categories_add">
					<h4>Configure Licence</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Licences', 'action' => 'add']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Price
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" name="price" id="price" data-required="1" placeholder="Enter price" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Select Features
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="feature_ids[]" id="feature_ids" data-live-search="true" multiple required>
									<!-- php: foreach($features as $value){ -->
										<option value="<!-- php: =$value->id -->"><!-- php: =$value->name --></option>
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
				<div class="tab-pane active" id="categories_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Created By</th>
										<th class="left">Price($)</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($licences as $value): -->
								
									<tr class="odd gradeX">
                                        <td class="left"><!-- php: = $value->name --></td>
										<td class="left"><!-- php: = $value->user->first_name --> <!-- php: = $value->user->last_name --></td>
										<td class="left"><!-- php: = $value->price --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editCategoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>	
											<a data-toggle="modal" data-target="#viewFeatures_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
												Features
											</a>	
										</td>
									</tr>
									   
									<div class="modal fade" id="editCategoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editProviderDialogueTitle">Edit Licence: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Licences', 'action' => 'edit', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Price
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="price" data-required="1" value="<!-- php: = $value->price -->" placeholder="Enter name" class="form-control input-height" required /> 
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
									<div class="modal fade" id="viewFeatures_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editProviderDialogueTitle"><!-- php: = $value->name --> Licence Features || Price($): <!-- php: = $value->price --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>List of Features</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: foreach($value->licence_features as $val): -->
																<ul>
																	<li><!-- php: = $val->feature->name --></li>
																</ul>
															<!-- php: endforeach -->
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
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementLicencesAddViewLicences() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
