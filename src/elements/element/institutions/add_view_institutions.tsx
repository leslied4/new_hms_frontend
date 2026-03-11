const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Institutions</span>
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
					<h4>Add new Institution</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Institutions', 'action' => 'add']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Name of institution" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">URI (eg:firstline24.com/<b>uri</b>)
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="uri" id="uri" data-required="1" placeholder="Name of institution" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">GP GPRS (eg:GA1826363)
							</label>
							<div class="col-md-5">
								<input type="text" name="location" id="location" data-required="1" placeholder="Please enter Ghana post GPS Address" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Deployment Type
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="deployment_type_id" id="deployment_type_id" data-live-search="true" required>
									<option value="">Select</option>
									<!-- php: foreach($deployment_types as $value){ -->
										<option value="<!-- php: =$value->id -->"><!-- php: =$value->name --></option>
									<!-- php: } -->			
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Add Ons
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="add_ons_id" id="add_ons_id" data-live-search="true" required>
									<option value="">Select</option>
									<!-- php: foreach($add_ons as $value){ -->
										<option value="<!-- php: =$value->id -->"><!-- php: =$value->name --></option>
									<!-- php: } -->			
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Licence Type
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="licence_type_id" id="licence_type_id" data-live-search="true" required>
									<option value="">Select</option>
									<!-- php: foreach($licence_types as $value){ -->
										<option value="<!-- php: =$value->id -->"><!-- php: =$value->name --></option>
									<!-- php: } -->			
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Administrator Name
							</label>
							<div class="col-md-5">
								<input type="text" name="name_of_admin" id="name_of_admin" data-required="1" placeholder="Administrator name" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Administrator Phone
							</label>
							<div class="col-md-5">
								<input type="text" name="phone" id="phone" data-required="1" placeholder="Administrator phone" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Administrator Username
							</label>
							<div class="col-md-5">
								<input type="text" name="username" id="username" data-required="1" placeholder="Administrator username" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Gender
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="gender_id" id="gender_id" data-live-search="true" required>
									<option value="">Select</option>
									<option value="1">Male</option>
									<option value="2">Female</option>
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
										<th class="left">Facility ID</th>
										<th class="left">Facility Name</th>
										<th class="left">Outlets</th>
										<th class="left">Location</th>
										<th class="left">Deployment Type</th>
										<th class="left">URI</th>
										<th class="left">Status</th>
										<th class="left">Admin Name</th>
										<th class="left">Admin Phone</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($institutions as $value): -->
								
									<tr class="odd gradeX">
                                        <td class="left"><!-- php: = $value->id --></td>
										<td class="left"><!-- php: = $value->name --></td>
										<td class="left"><!-- php: = count($value->outlets) --></td>
										<td class="left"><!-- php: = $value->location --></td>
										<td class="left"><!-- php: = $value->deployment_type->name --></td>
										<td class="left"><!-- php: = $value->uri --></td>
										<td class="left"><!-- php: = $value->has('status') && $value->status->id == 19 ? 'Pending Activation' : 'Activated' --></td>
										<td class="left"><!-- php: = $value->institution_administrator->name --></td>
										<td class="left"><!-- php: = $value->institution_administrator->phone --></td>

										<td class="left">
											<a data-toggle="modal" data-target="#editCategoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											<a data-toggle="modal" data-target="#view_institution_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
												View
											</a>	
											<a data-toggle="modal" data-target="#editCategoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Visit') --> btn-xs">
												Activate
											</a>
											<a data-toggle="modal" data-target="#editCategoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Delete') --> btn-xs">
												Apply Licence
											</a>		
										</td>
									</tr>
									   
									<div class="modal fade" id="editCategoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editProviderDialogueTitle">Edit Facility: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Institutions', 'action' => 'edit', $value->id], 'class' => 'form-horizontal']) -->
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
																		<label class="control-label col-md-5">Location
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="location" data-required="1" value="<!-- php: = $value->location -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Deployment Type
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control selectpicker" name="deployment_type_id" id="deployment_type_id" data-live-search="true" required>
																				<option value="">Select</option>
																				<!-- php: foreach($deployment_types as $deployment_type){ -->
																					<option <!-- php: = $value->deployment_type->id == $deployment_type->id ? 'selected' : '' --> value="<!-- php: =$deployment_type->id -->"><!-- php: =$deployment_type->name --></option>
																				<!-- php: } -->			
																			</SearchableSelectField>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Licence Type
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control selectpicker" name="licence_type_id" id="licence_type_id" data-live-search="true" required>
																				<option value="">Select</option>
																				<!-- php: foreach($licence_types as $licence_type){ -->
																					<option <!-- php: = $value->licence_type->id == $licence_type->id ? 'selected' : '' --> value="<!-- php: =$licence_type->id -->"><!-- php: =$licence_type->name --></option>
																				<!-- php: } -->			
																			</SearchableSelectField>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Add On
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control selectpicker" name="add_ons_id" id="add_ons_id" data-live-search="true" required>
																				<option value="">Select</option>
																				<!-- php: foreach($add_ons as $add_on){ -->
																					<option <!-- php: = $value->add_on->id == $add_on->id ? 'selected' : '' --> value="<!-- php: =$add_on->id -->"><!-- php: =$add_on->name --></option>
																				<!-- php: } -->			
																			</SearchableSelectField>
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Admin Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name_of_admin" data-required="1" value="<!-- php: = $value->institution_administrator->name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Admin Phone
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="phone" data-required="1" value="<!-- php: = $value->institution_administrator->phone -->" placeholder="Enter name" class="form-control input-height" required /> 
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

									<div class="modal fade" id="view_institution_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editProviderDialogueTitle">View Facility: <!-- php: = $value->name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Facility Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Institutions', 'action' => 'edit', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required readonly/> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Location
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->location -->" placeholder="Enter name" class="form-control input-height" required readonly/> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Deployment Type
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->deployment_type->name -->" placeholder="Enter name" class="form-control input-height" required readonly/> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Licence Type
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->licence_type->name -->" placeholder="Enter name" class="form-control input-height" required readonly/> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Add Ons
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->has('add_on') ? $value->name : "" -->" placeholder="Enter name" class="form-control input-height" required readonly/> 
																		</div>
																	</div>

																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-6 col-md-6">
																			<!-- <button type="submit" class="btn btn-info">Submit</button> -->
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
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementInstitutionsAddViewInstitutions() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
