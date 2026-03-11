const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Wards</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#wards_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#wards_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="wards_add">
					<h4>Add a new Ward</h4>
					<!-- php: = $this->Form->create($ward, ['url' => ['controller' => 'ManageWards', 'action' => 'addWard']]); -->
						<div class="row">
							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Name
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
									</div>
								</div>
								
								<div class="form-group row">
									<label class="control-label col-md-4">Ward Type
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<SearchableSelectField class="form-control input-height" name="ward_type_id" id="ward_type_id" required>
											<option value="">Select...</option>
											
											<!-- php: foreach($wardTypes as $selectOption) { -->
												<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
											<!-- php: } -->
											
										</SearchableSelectField>
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Room Type
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<SearchableSelectField class="form-control input-height" name="room_type_id" id="room_type_id" required>
											<option value="">Select...</option>
											
											<!-- php: foreach($roomTypes as $selectOption) { -->
												<option value="<!-- php: = $selectOption->id -->" data-ward-type-code="<!-- php: = $selectOption->ward_type->code -->"><!-- php: = $selectOption->name --></option>
											<!-- php: } -->
											
										</SearchableSelectField>
									</div>
									<input hidden id="ward_type_code" name="ward_type_code"/>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Mofifier	
										<span class="required"> * </span>							
									</label>
									<div class="col-md-5">
										<input readonly type="text" name="modifier" id="modifier" data-required="0" placeholder="Enter mofifier" class="form-control input-height" required /> 
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Short Stay
										<span class="required">  </span>
									</label>
									<div class="col-md-5">
										<label class="switchToggle">
											<input id="stay_check" type="checkbox" onclick="">
											<span class="slider green round"></span>
										</label>
									</div>
									<input hidden type="text" id="stay_type" name="stay_type" value="0"/>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Price	
										<span class="required"> * </span>							
									</label>
									<div class="col-md-5">
										<input type="text" name="new_price" id="new_price" data-required="0" placeholder="Enter price" class="form-control input-height" required /> 
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Number of Beds
										<span class="required"> * </span>							
									</label>
									<div class="col-md-5">
										<input type="number" name="number_of_beds" id="number_of_beds" data-required="0" placeholder="Enter number of beds" class="form-control input-height" required /> 
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Number of Outlier Beds
										<span class="required"> * </span>							
									</label>
									<div class="col-md-5">
										<input type="number" name="number_of_outlier_beds" id="number_of_outlier_beds" data-required="0" placeholder="Enter number of outlier beds" class="form-control input-height"/> 
									</div>
								</div>

							</div>
							<div class="col-md-6">
								<div class="form-group row">
									<label class="control-label col-md-4">Beds Suffix
										<span class="required"> * </span>							
									</label>
									<div class="col-md-5">
										<input type="text" name="beds_suffix" id="beds_suffix" data-required="0" placeholder="Enter suffix of beds" class="form-control input-height" required /> 
										<input hidden type="number" name="occupancy" id="occupancy" value="0" data-required="0" placeholder="Enter suffix of beds" class="form-control input-height" required /> 
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Copay Status
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<SearchableSelectField class="form-control input-height" name="copay" id="copay">
											<option value="">Select...</option>
											<option value="Enabled" data-copay="Enable">Enable</option>
											<option value="Disabled" data-copay="Disable">Disable</option>
										</SearchableSelectField>									
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">MDC (Clinic / Specialty)
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<SearchableSelectField class="form-control input-height selectpicker" data-live-search="true" name="specialty_id[]" id="specialty_id" multiple data-live-search="true" data-size="4">
											<option value="">Select...</option>
											
											<!-- php: foreach($specialties as $selectOption) { -->
												<option value="<!-- php: = $selectOption->id -->" data-specialty-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
											<!-- php: } -->
											
										</SearchableSelectField>
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Age Specification
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="age_spec_id[]" id="age_spec_id" title="Select Age Specifications"  data-live-search="true" multiple required>
											<option value="">Select...</option>
											
											<!-- php: foreach($ageSpecifications as $selectOption) { -->
												<option value="<!-- php: = $selectOption->id -->" data-age-name="<!-- php: = $selectOption->age -->"><!-- php: = $selectOption->age --></option>
											<!-- php: } -->
											
										</SearchableSelectField>
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Gender Specification
										<span class="required"> * </span>
									</label>
									<div class="col-md-5">
										<SearchableSelectField class="form-control input-height" name="gender_spec_id" id="gender_spec_id" required>
											<option value="">Select...</option>
											
											<!-- php: foreach($genderSpecifications as $selectOption) { -->
												<option value="<!-- php: = $selectOption->id -->" data-gender-name="<!-- php: = $selectOption->gender -->"><!-- php: = $selectOption->gender --></option>
											<!-- php: } -->
											
										</SearchableSelectField>
									</div>
								</div>
																			
								<div class="form-group row">
									<label class="control-label col-md-4">Description								
									</label>
									<div class="col-md-5">
										<input type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" /> 
									</div>
								</div>

								<div class="form-group row">
									<label class="control-label col-md-4">Form Actions
										<span class="required">  </span>
									</label>
									<div class="col-md-5">
										<button type="submit" class="btn btn-info">Submit</button>
										<button type="button" class="btn btn-default" onclick = 'clearWardFields()'>Reset</button>								
									</div>
								</div>
								
							</div>
						</div>

					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="wards_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Name</th>
										<th class="left">Modifier</th>
										<th class="left">Category/Type</th>
										<th class="left">Beds</th>
										<th class="left">Outlier Beds</th>
										<th class="left">Copay</th>
										<th class="left">New Price (Ghc)</th>
										<th class="left">Old Price (Ghc)</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($wards as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
										<td class="left"><!-- php: =$value->name --></td>
										<td class="left"><!-- php: =$value->modifier --></td>
										<td class="left"><!-- php: =$value->ward_type->name. " / " .$value->room_type->name --></td>
										<td class="left"><!-- php: =$value->number_of_beds ? $value->number_of_beds: "0" --></td>
										<td class="left"><!-- php: =$value->number_of_outlier_beds ? $value->number_of_outlier_beds: "0" --></td>
										<td class="left"><!-- php: = $value->copay == "Enabled" ? "<span class='badge badge-primary'>Co Pay</span>" : "" --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->new_price, 2) --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->old_price, 2) --></td>

										<td class="left">
											<a data-toggle="modal" data-target="#editWardDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageWards','action'=>'deleteWard',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delete') .... -->

											<a id="view_ward_details" data-toggle="modal" data-target="#viewWardDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
												View
											</a>
										</td>
									</tr>

									<div class="modal fade" id="viewWardDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document"  style="max-width: 1500px;">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">View Ward: <!-- php: = $value->name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>View Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageWards', 'action' => 'editWard', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="row">
																		<div class="col-md-6">
																			<div class="form-group row">
																				<label class="control-label col-md-5">Name
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required readonly/> 
																				</div>
																			</div>
																			
																			<div class="form-group row">
																				<label class="control-label col-md-5">Ward Type
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="ward_type_id" id="ward_type_id" required readonly>
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($wardTypes as $selectOption) { -->
																							<option value="<!-- php: = $selectOption->id -->" <!-- php: = $selectOption->id == $value->ward_type_id ? 'selected="selected"' : "" --> ><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>
											
																			<div class="form-group row">
																				<label class="control-label col-md-5">Room Type
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="room_type_id" id="room_type_id" required readonly>
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($roomTypes as $selectOption) { -->
																							<option value="<!-- php: = $selectOption->id -->" <!-- php: = $selectOption->id == $value->room_type_id ? 'selected="selected"' : "" --> ><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Mofifier	
																					<span class="required">  </span>							
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="modifier" id="modifier" data-required="0" value="<!-- php: = $value->modifier -->" placeholder="Enter mofifier" class="form-control input-height" required readonly/> 
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Short Stay
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<!-- php: = $value->stay_type == 1 ? "<span class='badge badge-primary'>Yes</span>" : "<span class='badge badge-primary'>No</span>" -->
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Price	
																					<span class="required">  </span>							
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="new_price" id="new_price" data-required="0" value="<!-- php: = $value->new_price -->" placeholder="Enter price" class="form-control input-height" required readonly/> 
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Number of Beds
																					<span class="required">  </span>							
																				</label>
																				<div class="col-md-7">
																					<input type="number" name="number_of_beds" id="number_of_beds" value="<!-- php: = $value->number_of_beds -->" data-required="0" placeholder="Enter number of beds" class="form-control input-height" required readonly/> 
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Number of Outlier Beds
																					<span class="required">  </span>							
																				</label>
																				<div class="col-md-7">
																					<input type="number" name="number_of_outlier_beds" id="number_of_outlier_beds" value="<!-- php: = $value->number_of_outlier_beds -->" data-required="0" placeholder="Enter number of outlier beds" class="form-control input-height" readonly/> 
																				</div>
																			</div>
																		</div>
																		<div class="col-md-6">
																			<div class="form-group row">
																				<label class="control-label col-md-5">Copay Status
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="copay" id="copay" readonly required>
																						<option value="">Select...</option>
										
																						<!-- php:  -->
																							<option <!-- php: = $value->copay == "Enabled" ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">Enabled</option>
																							<option <!-- php: = $value->copay == "DIsabled" ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">Disabled</option>
																						<!-- php:  -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">MDC (Clinic / Specialty)
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="specialty_id" id="specialty_id" required readonly>
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($specialties as $selectOption) { -->
																							<option <!-- php: = $value->specialty_id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Age Specifications
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<!-- php: $ward_age_specs = $value->ward_age_specifications; foreach($ward_age_specs as $c){ echo "<span class='badge badge-primary'>".$c->age_specification->age."</span>"; echo "<br>"; } -->
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Gender Specification
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<SearchableSelectField class="form-control input-height" name="gender_spec_id" id="gender_spec_id" required readonly>
																						<option value="">Select...</option>
																						
																						<!-- php: foreach($genderSpecifications as $selectOption) { -->
																							<option <!-- php: = $value->gender_spec_id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->gender --></option>
																						<!-- php: } -->
																						
																					</SearchableSelectField>
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Beds Suffix
																					<span class="required">  </span>							
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="beds_suffix" id="beds_suffix" value="<!-- php: = $value->beds_suffix -->" data-required="0" placeholder="Enter suffix of beds" class="form-control input-height" required readonly/> 
																				</div>
																			</div>
																															
																			<div class="form-group row">
																				<label class="control-label col-md-5">Description
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<input type="text" name="description" data-required="0" value="<!-- php: = $value->description -->" placeholder="Enter description" class="form-control input-height" readonly/> 
																				</div>
																			</div>

																			<div class="form-group row">
																				<label class="control-label col-md-5">Action
																					<span class="required">  </span>
																				</label>
																				<div class="col-md-7">
																					<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
																				</div>
																			</div>
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

<!-- php: foreach ($wards as $key => $value): -->
	<div class="modal fade" id="editWardDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document"  style="max-width: 1500px;">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title" id="editInvestigationDialogueTitle">Edit Ward: <!-- php: = $value->name --></h4>
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
							<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageWards', 'action' => 'editWard', $value->id], 'class' => 'form-horizontal']) -->
								<div class="form-body">
									<div class="row">
										<div class="col-md-6">
											<div class="form-group row">
												<label class="control-label col-md-5">Name
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Ward Type
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control input-height" name="ward_type_id" id="ward_type_id" required>
														<option value="">Select...</option>
														
														<!-- php: foreach($wardTypes as $selectOption) { -->
															<option value="<!-- php: = $selectOption->id -->" <!-- php: = $selectOption->id == $value->ward_type_id ? 'selected="selected"' : "" --> ><!-- php: = $selectOption->name --></option>
														<!-- php: } -->
														
													</SearchableSelectField>
												</div>
											</div>
			
											<div class="form-group row">
												<label class="control-label col-md-5">Room Type
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control input-height" name="room_type_id" id="room_type_id" required>
														<option value="">Select...</option>
														
														<!-- php: foreach($roomTypes as $selectOption) { -->
															<option value="<!-- php: = $selectOption->id -->" <!-- php: = $selectOption->id == $value->room_type_id ? 'selected="selected"' : "" --> ><!-- php: = $selectOption->name --></option>
														<!-- php: } -->
														
													</SearchableSelectField>
												</div>
											</div>
											

											<div class="form-group row">
												<label class="control-label col-md-5">Mofifier	
													<span class="required"> * </span>							
												</label>
												<div class="col-md-7">
													<input type="text" name="modifier" id="modifier" data-required="0" value="<!-- php: = $value->modifier -->" placeholder="Enter mofifier" class="form-control input-height" required /> 
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Price	
													<span class="required"> * </span>							
												</label>
												<div class="col-md-7">
													<input type="text" name="new_price" id="new_price" data-required="0" value="<!-- php: = $value->new_price -->" placeholder="Enter price" class="form-control input-height" required /> 
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Number of Beds
													<span class="required"> * </span>							
												</label>
												<div class="col-md-7">
													<input type="number" name="number_of_beds" id="number_of_beds" value="<!-- php: = $value->number_of_beds -->" data-required="0" placeholder="Enter number of beds" class="form-control input-height" required /> 
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Number of Outlier Beds
													<span class="required">  </span>							
												</label>
												<div class="col-md-7">
													<input type="number" name="number_of_outlier_beds" id="number_of_outlier_beds" value="<!-- php: = $value->number_of_outlier_beds -->" data-required="0" placeholder="Enter number of outlier beds" class="form-control input-height"/> 
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group row">
												<label class="control-label col-md-5">Copay Status
													<span class="required">  </span>
												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control input-height" name="copay" id="copay" required>
														<option value="">Select...</option>
		
														<!-- php:  -->
															<option <!-- php: = $value->copay == "Enabled" ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">Enabled</option>
															<option <!-- php: = $value->copay == "DIsabled" ? 'selected="selected"' : '' --> value="<!-- php: = $value->copay -->">Disabled</option>
														<!-- php:  -->
														
													</SearchableSelectField>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">MDC (Clinic / Specialty)
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control input-height selectpicker" name="specialty_id[]" id="specialty_id" required multiple data-live-search="true" data-size="4">
														<option value="">Select...</option>
														
														<!-- php: $specialtyIds = collection($value->specialties_wards)->extract('specialty_id')->toArray(); foreach($specialties as $selectOption) { -->
															<option <!-- php: = in_array($selectOption->id, $specialtyIds) ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
														<!-- php: } -->
														
													</SearchableSelectField>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Age Specification
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control selectpicker input-height" name="age_spec_id[]" id="age_spec_id" required multiple>
														<option value="">Select...</option>
														
														<!-- php: foreach($ageSpecifications as $selectOption) { if(null !==($value->ward_age_specifications)){ $selected_attribute = ''; foreach($value->ward_age_specifications as $v){ if($v->ward_id == $value->id && $selectOption->id == $v->age_specificati... -->
															<option <!-- php: = $selected_attribute --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->age --></option>
														<!-- php: } -->
														
													</SearchableSelectField>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Gender Specification
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control input-height" name="gender_spec_id" id="gender_spec_id" required>
														<option value="">Select...</option>
														
														<!-- php: foreach($genderSpecifications as $selectOption) { -->
															<option <!-- php: = $value->gender_spec_id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->gender --></option>
														<!-- php: } -->
														
													</SearchableSelectField>
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Beds Suffix
													<span class="required"> * </span>							
												</label>
												<div class="col-md-7">
													<input type="text" name="beds_suffix" id="beds_suffix" value="<!-- php: = $value->beds_suffix -->" data-required="0" placeholder="Enter suffix of beds" class="form-control input-height" required /> 
												</div>
											</div>
																							
											<div class="form-group row">
												<label class="control-label col-md-5">Description
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<input type="text" name="description" data-required="0" value="<!-- php: = $value->description -->" placeholder="Enter description" class="form-control input-height" /> 
												</div>
											</div>

											<div class="form-group row">
												<label class="control-label col-md-5">Form Actions
													<span class="required">  </span>
												</label>
												<div class="col-md-7">
													<button type="submit" class="btn btn-info">Submit</button>
													<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
												</div>
											</div>
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
<!-- php: endforeach -->

<script>
	function clearWardFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>
<script>
	$("#room_type_id").change(function(){
		var wardTypeCode = $(this).children('option:selected').data('ward-type-code')
		var roomTypeId = $(this).children('option:selected').val()
		var roomTypeIdLength = roomTypeId.toString().length;
		if(roomTypeIdLength == 1){
			roomTypeId = roomTypeId.toString().padStart(3, '0');
		}else if(roomTypeIdLength == 2){
			roomTypeId = roomTypeId.toString().padStart(2, '0');
		}else{
			roomTypeId = roomTypeId.toString();
		}
		$("#modifier").val(wardTypeCode+"-"+roomTypeId);
	})
</script>
<script>
	$("#room_type_id").change(function(){ 
		$("#ward_type_code").val($(this).children('option:selected').data('ward-type-code'));
	})

	$('input[type="checkbox"]').click(function() {
		if ($(this).is(':checked')) {
			$('#stay_type').val(1);
		} else {
			$('#stay_type').val(0);
		}
	});
</script>

`;

export default function ElementElementManagewardsWards() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
