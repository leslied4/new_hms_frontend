const rawHtml = `
<style>
	.lightblue 
	{
		background-color:#51aff124;
	}
	.small-img {
		height:20px;
		width:auto;
	}
	.custom-btn {
		height:20px;
		width:20px;
		font-size:15px!important;
	}
</style>
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Radiology Scans</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#labtests_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#labtests_view" data-toggle="tab"> View </a>
				</li>
				<!-- <li class="nav-item">
					<a href="#service_placetab" data-toggle="tab"> Order Service Place </a>
				</li> -->
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="labtests_add">
					<h4>Add a new Scan Item</h4>
					<!-- php: = $this->Form->create($labTest, ['url' => ['controller' => 'ManageRadiologies', 'action' => 'addRadiologyScan']]); -->
					<div class="row">
						<div class="col-md-6  p-2">
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<input type="text" name="name" id="scan_name" data-required="1" placeholder="Enter name" class="form-control input-height next-one" required /> 
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Radiology Category
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<SearchableSelectField class="selectpicker form-control input-height next-one selectpicker" data-live-search="true" name="radiology_category_id" id="investigation_id" required>
									<option value="">Select Category</option>
									
									<!-- php: foreach($investigations as $selectOption) { -->
										<option data-content="<!-- php: = $selectOption->name --> <span style='background-color:<!-- php: = $selectOption->anatomical_area->color_code -->' class='badge'><!-- php: = $selectOption->anatomical_area->name --></span>" value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name . ' (' . $selectOption->anatomical_area->name . ')' --></option>
									<!-- php: } -->
									
								</SearchableSelectField>
							</div>
						</div>
						<!-- <div class="form-group row">
							<label for="" class="control-label col-md-4">Sample(s) Collected
								<span class="required">*</span>
							</label>
							<div class="col-md-6">
							<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="samples_collected[]" id="samples_collected" title="Select Sample Type"  data-live-search="true" multiple required>
											<option value="all">All</option>
												<!-- php: // foreach($specimenTypes as $specimenType) // { -->
														<option value="<!-- php: // $specimenType->id -->" data-content="<!-- php: // h($specimenType->name) -->"><!-- php: // h($specimenType->name) --></option>
													<!-- php: // } -->
							</SearchableSelectField>
									
							</div>
						</div> -->
						<div class="form-group row">
							<label class="control-label col-md-4">Price
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<input type="number" min='0' name="value_new" id="price_value_new" data-required="1" placeholder="Enter price" class="form-control input-height next-one" required /> 
							</div>
						</div>
																	
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-6">
								<input type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height next-one" /> 
							</div>
						</div>
						<!-- <div class="form-group row">
							<label class="control-label col-md-4">Order Service Place
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
							<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="service_place[]" id="service_place" title="Select Service Place"  data-live-search="true" multiple required>
							<!-- php: // // foreach($orderServices as $serviceplace) { -->
								<option value="<!-- php: // $serviceplace->id -->"><!-- php: // h($serviceplace->name) --></option>
													
								
							<!-- php: // } -->
							
											
												
							</SearchableSelectField>
							</div>
						</div> -->
						<div class="form-group row">
							<label class="control-label col-md-4">Gender
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<SearchableSelectField type="text" name="gender" id="gender" data-required="1"  class="form-control input-height next-one" required > 
								
								<option value="all">All</option>
								    <option value="male">Male</option>
									<option value="female">Female</option>
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label for="" class="control-label col-md-4">NHIS GDRG
								<span class="required"></span>
							</label>
							<div class="col-md-6">
							<SearchableSelectField class="selectpicker form-control input-height show-menu-arrow show-tick" data-size="5" name="nhis_investigation_id" id="nhis_investigation_id" title="Select GDRG"  data-live-search="true" >
							<!-- php: foreach($nhis_investigations as $val) { -->
								<option value="<!-- php: = $val->id -->" data-content="<!-- php: = h($val->item_name) --><!-- php: = h($val->gdrg) --> <span class='badge badge-danger'><!-- php: = $val->tariff --></span>" ><!-- php: = h($val->investigation_name) --><!-- php: = h($val->gdrg) --></option>
												
							<!-- php: } -->	
											
							</SearchableSelectField>
							</div>
						</div>
						</div>
						<div class="col-md-6 p-2">
					
						<!-- <div class="form-group row">
							<label class="control-label col-md-4">Age
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<SearchableSelectField type="text" name="age" id="age" data-required="1"  class="form-control input-height" required > 
								<option value="" disabled selected>Select Option</option>
								    <option value="infant">Infant</option>
									<option value="child">Child</option>
									<option value="infant-chld">Infant Child</option>
									<option value="adult">Adult</option>
								</SearchableSelectField>
							</div>
						</div> -->
						<div class="form-group row">
							<label class="control-label col-md-4">Can it be an Outsourced Request ?
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<div class="form-check form-check-inline">
                  <input class="form-check-input next-one" type="radio" name="is_outsourced" id="outsourced1" value="1" required>
                  <label class="form-check-label" for="outsourced1">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input next-one" type="radio" name="is_outsourced" id="outsourced2" value="0" required>
                  <label class="form-check-label" for="outsourced2">No</label>
                </div>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">CoPay
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<div class="form-check form-check-inline">
                  <input class="form-check-input next-one" type="radio" name="copay" id="copay1" value="1" required>
                  <label class="form-check-label" for="copay1">Enable</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input next-one" type="radio" name="copay" id="copay2" value="0" required>
                  <label class="form-check-label" for="copay2">Disable</label>
                </div>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Age Specification
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<SearchableSelectField type="text" name="age_specifications[]" id="age_specifications" data-size="5" data-required="1" data-live-search="true" class="form-control input-height selectpicker show-menu-arrow show-tick next-one" required multiple > 
                  <!-- php: foreach ($age_specifications as $age_specification) { -->
                    <option value="<!-- php: = $age_specification->id -->"><!-- php: = $age_specification->age --></option>
                  <!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-4">Process Instructions
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<textarea name="process_instruction" id="" cols="43" rows="5"></textarea>
							</div>
						</div>
						<!-- <div class="form-group row">
							<label class="control-label col-md-4">Weight Specification
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<SearchableSelectField type="text" name="weight_spec" id="weight_spec" data-required="1"  class="form-control input-height" required > 
								<option value="" disabled selected>Select Weight Specification</option>
								    <option value="fat">fat</option>
									<option value="really-fat">really fat</option>
								</SearchableSelectField>
							</div>
						</div> -->
						<!-- <div class="form-group row">
							<label for="" class="control-label col-md-4">Specialities/Clinic
								<span class="required">*</span>
							</label>
							<div class="col-md-6">
							<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialities[]" id="specialities" title="Select Specialties/Clinic"  data-live-search="true" multiple required>
							<!-- php: // foreach($specialities as $specialty) { // -->
								<option value="<!-- php: // $specialty->id -->"><!-- php: // h($specialty->name) --></option>
													
								
							<!-- php: // } -->	
											
							</SearchableSelectField>
							</div>
						</div> -->
				
						
						

						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" id="submit_radio_scan" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearLabtTestFields()'>Reset</button>
							</div>
						</div>
						</div>
					</div>
						
						
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane " id="service_placetab">
					<h4>Add a new Service Place</h4>
					<!-- php: = $this->Form->create($servicePlace, ['url' => ['controller' => 'ManageLabs', 'action' => 'addOrderPlace']]); -->
					
					<div class="col-md-7  p-2">
						<div class="form-group row mt-3">
							<label class="control-label col-md-3">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-7">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>
						<!-- <div class="form-group row mt-3">
							<label class="control-label col-md-3">Parent Store
								<span class="required"> * </span>
							</label>
							<div class="col-md-7">
								<SearchableSelectField type="text" name="parent" id="parent" data-required="1"class="form-control input-height" required> 
									<option>Select Parent Store</option>
									<!-- php: /* foreach($parentStores as $parentStore) { -->
                                        <option value="<!-- php: = $parentStore->id -->"><!-- php: = $parentStore->name --></option>
									<!-- php: } */ -->
									
									
                                </SearchableSelectField> 
							</div>
						</div> -->
						<div class="form-group row mt-3">
							<label class="control-label col-md-3">Clinic/Specialities
								<span class="required"> * </span>
							</label>
							<div class="col-md-7">
							<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialties[]" id="specialties" title="Select Specialities/Clinic"  data-live-search="true"  required multiple>
								<!-- php: foreach($specialities as $speciality) { -->
									<option value="<!-- php: = $speciality->id -->"><!-- php: = $speciality->name --></option>
							
								<!-- php: } -->
							</SearchableSelectField>
							</div>
						</div>
					</div>
					<div class="col-md-3 p-2">

						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearServiceFields()'>Reset</button>
							</div>
						</div>
					</div>
					
						
						
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="labtests_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Category</th>
										<th class="left">Old Price</th>
										<th class="left">New Price</th>
										<th class="left">Copay</th>
										<th class="left">Outsourced</th>
										<th class="left">Result</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($labTests as $value): -->								
									<tr class="odd gradeX ">
										<td class="left"><a href="javascript:" data-toggle="modal" data-target="#viewItem_<!-- php: = $value->id -->"><!-- php: = $value->name --></a></td>
										<td class="left"><!-- php: = isset($value->radiology_category) ? $value->radiology_category->name : '' --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->value_old, 2) --></td>
										<td class="left"><!-- php: = $this->Number->precision($value->value_new, 2) --></td>
										<td><!-- php: = $value->copay == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "" --></td>
										<td class="left"><!-- php: = $value->outsourced == 1 ? "<span class='badge bg-info'>Yes</span>" : "" --></td>
										<td class="left">
											<a href="<!-- php: = $this->Url->build(['controller' => 'ManageRadiologies', 'action' => 'updateScanTemplate', $value->id]) -->" class="btn btn-xs">
												Template
											</a>
										</td>
										<td class="left">
											
									  <!-- php: = $value->enabled ? $this->Form->postLink(__('Disable'), ['controller'=>'ManageRadiologies','action'=>'toggleEnable',$value->id,0], ['class' => 'btn btn-secondary btn-xs']) : $this->Form->postLink(__('Enable'), ['controller'=>'ManageRadiolo... -->
										
											<a data-toggle="modal" data-target="#editLabTestDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>

											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageRadiologies','action'=>'deleteLabTest',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.D... -->
										    <a href="<!-- php: = Cake\Routing\Router::url(['controller'=>'ManageRadiologies','action'=>'viewLabTest',$value->id,'view_labtest', '_ext' => 'pdf']) -->"  class="btn btn-xs">Report</a>
											
										</td>
									</tr>
									   
									<div class="modal fade" id="editLabTestDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Edit Radiology Scan: <!-- php: = $value->name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-lg-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Edit Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageRadiologies', 'action' => 'editRadiologyScan', $value->id], 'class' => 'form-horizontal']) -->
															<div class="row">
															<div class="col-md-6  p-2">
															<div class="form-group row">
																<label class="control-label col-md-4"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.TestName') != null ? Cake\Core\Configure::read('LAB_STRINGS.TestName') : 'Name' -->
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<input type="text" value="<!-- php: = $value->name -->" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height"/> 
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-4"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' -->
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<SearchableSelectField class="form-control input-height" name="investigation_id" id="investigation_id">
																		<option value="<!-- php: = $value->radiology_category->id -->"><!-- php: = $value->radiology_category->name --></option>
																		
																		<!-- php: foreach($investigations as $selectOption) { -->
																			<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																		<!-- php: } -->
																		
																	</SearchableSelectField>
																</div>
															</div>
															<!-- <div class="form-group row">
																<label for="" class="control-label col-md-4">Sample(s) Collected
																	<span class="required">*</span>
																</label>
																<div class="col-md-6">
																<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="samples_collected[]" id="samples_collected" title="Select Sample Type"  data-live-search="true" multiple required>
																				<option value="all">All</option>
																					<!-- php: foreach($specimenTypes as $specimenType) { -->
																							<option value="<!-- php: = $specimenType->id -->" data-content="<!-- php: = h($specimenType->name) -->"><!-- php: = h($specimenType->name) --></option>
																						<!-- php: } -->
																</SearchableSelectField>
																		
																</div>
															</div> -->
															<div class="form-group row">
																<label class="control-label col-md-4">Price
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<input type="text" value="<!-- php: = $value->value_new -->" name="value_new" id="value_new" data-required="1" placeholder="Enter price" class="form-control input-height" required /> 
																</div>
															</div>
																										
															<div class="form-group row">
																<label class="control-label col-md-4">Description
																	
																</label>
																<div class="col-md-6">
																	<input type="text" value="<!-- php: = $value->description -->" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" /> 
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-4">Order Service Place
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="service_place[]" id="service_place" title="Select Service Place"  data-live-search="true" multiple required>
																<!-- php: foreach($orderServices as $serviceplace) { -->
																	<option value="<!-- php: = $serviceplace->id -->"><!-- php: = h($serviceplace->name) --></option>
																						
																	
																<!-- php: } -->
																
																				
																					
																</SearchableSelectField>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-4">Gender
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<SearchableSelectField type="text" name="gender" id="gender" data-required="1"  class="form-control input-height" required > 
																	
																	<option value="all">All</option>
																			<option value="male">Male</option>
																		<option value="female">Female</option>
																	</SearchableSelectField>
																</div>
															</div>
															<div class="form-group row">
																	<label for="" class="control-label col-md-4">NHIS GDRG
																		<span class="required"></span>
																	</label>
																	<div class="col-md-6">
																		<SearchableSelectField class="form-control selectpicker input-height show-menu-arrow show-tick" data-size="5" title="Select GDRG"  data-live-search="true" onchange="$('#nhis_investigation_id').val(this.value)">
																		<!-- php: foreach($nhis_investigations as $val) { -->
																			<option data-content="<!-- php: = h($val->item_name) --><!-- php: = h($val->gdrg) --> <span class='badge badge-danger'><!-- php: = $val->tariff --></span>" <!-- php: = $value->nhis_investigation_id == $val->id ? "selected" : "" --> value="<!-- php: = $val->id -->"><!-- php: = h($val->investigation_name) --><!-- php: = h($val->gdrg) --></option>
																							
																		<!-- php: } -->	
																						
																		</SearchableSelectField>
																		<!-- hidden field to receive selectpicker value -->
																		<input name="nhis_investigation_id" id="nhis_investigation_id" type="text" value="" hidden/>
																	</div>
																</div>
															</div>
															<div class="col-md-6 p-2">
														
															<div class="form-group row">
																<label class="control-label col-md-4">Age
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<SearchableSelectField type="text" name="age" id="age" data-required="1"  class="form-control input-height" required > 
																	<option value="<!-- php: = $value->age -->"><!-- php: = $value->age --></option>
																			<option value="infant">Infant</option>
																		<option value="child">Child</option>
																		<option value="infant-chld">Infant Child</option>
																		<option value="adult">Adult</option>
																	</SearchableSelectField>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-4">Can it be an Outsourced Request ?
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<div class="form-check form-check-inline">
																	<input class="form-check-input" <!-- php: = $value->outsourced == 1 ? 'checked' : '' --> type="radio" name="outsourced" id="outsourced1" value="1">
																	<label class="form-check-label" for="outsourced1">Yes</label>
																</div>
																<div class="form-check form-check-inline">
																	<input class="form-check-input" <!-- php: = $value->outsourced == 0 ? 'checked' : '' --> type="radio" name="outsourced" id="outsourced2" value="0">
																	<label class="form-check-label" for="outsourced2">No</label>
																</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-4">CoPay
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<div class="form-check form-check-inline">
																		<input class="form-check-input" <!-- php: = $value->copay== 1 ? 'checked' : '' --> type="radio" name="copay" id="copay1" value="1">
																		<label class="form-check-label" for="copay1">Enable</label>
																	</div>
																	<div class="form-check form-check-inline">
																		<input class="form-check-input" <!-- php: = $value->copay== 0 ? 'checked' : '' --> type="radio" name="copay" id="copay2" value="0">
																		<label class="form-check-label" for="copay2">Disable</label>
																	</div>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-4">Age Specification
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<SearchableSelectField type="text" name="age_spec" id="age_spec" data-required="1"  class="form-control input-height" required > 
																	<option value="" disabled selected>Select Age Specification</option>
																	<option value="0-28">0-28 days(Neonatal)</option>
																									<option value="1-11">1 - 11 months(Post neonatal)</option>
																	<option value="1-4"> 1 - 4 years</option>
																									<option value="5-9">5 - 9 years</option>
																									<option value="10-14">10 - 14 years</option>
																									<option value="15-19">15 - 19 years</option>
																									<option value="20-34">20 - 34 years</option>
																									<option value="35-49">35 - 49 years</option>
																									<option value="50-59">50 - 59 years</option>
																									<option value="60-69">60 - 69 years</option>
																									<option value="70">70 years and above</option>
																	</SearchableSelectField>
																</div>
															</div>
															<div class="form-group row">
																<label class="control-label col-md-4">Weight Specification
																	<span class="required"> * </span>
																</label>
																<div class="col-md-6">
																	<SearchableSelectField type="text" name="weight_spec" id="weight_spec" data-required="1"  class="form-control input-height" required > 
																	<option value="<!-- php: = $value->weight_spec -->" selected><!-- php: = $value->weight_spec --></option>
																			<option value="fat">fat</option>
																		<option value="really-fat">really fat</option>
																	</SearchableSelectField>
																</div>
															</div>
															<div class="form-group row">
																<label for="" class="control-label col-md-4">Specialities/Clinic
																	<span class="required">*</span>
																</label>
																<div class="col-md-6">
																<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialities[]" id="specialities" title="Select Specialties/Clinic"  data-live-search="true" multiple required>
																<!-- php: foreach($specialities as $specialty) { -->
																	<option value="<!-- php: = $specialty->id -->"><!-- php: = h($specialty->name) --></option>
																						
																	
																<!-- php: } -->	
																				
																</SearchableSelectField>
																</div>
															</div>
				
						
						

															<div class="row">
																<div class="offset-md-4 col-md-8">
																	<button type="submit" class="btn btn-info">Submit</button>
																	<button type="button" class="btn btn-default" onclick = 'clearLabtTestFields()'>Reset</button>
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

									
									<div class="modal fade" id="addclaims_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
										  <h4 class="modal-title">Claim Credit Pricing for <!-- php: = $value->name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
										  
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
															
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageLabs', 'action' => 'editLabTest', $value->id], 'class' => 'form-horizontal']) -->
															<h5 class="modal-title">Facility HCP Level: 1</h5>
															<div class="form-body mt-3">
															<div class="form-check mb-4 form-check-inline">
															    <input class="form-check-input" name="ins_type[]" type="radio" id="inlineCheckbox1" value="option1">
															    <label class="form-check-label" for="inlineCheckbox1">Public Insurance</label>
															</div>
															<div class="form-check form-check-inline">
															    <input class="form-check-input" name="ins_type[]" type="radio" id="inlineCheckbox2" value="option2">
															    <label class="form-check-label" for="inlineCheckbox2">Private Insurance</label>
															</div>
															<div class="form-check form-check-inline">
															    <input class="form-check-input" name="ins_type[]" type="radio" id="inlineCheckbox3" value="option3">
															    <label class="form-check-label" for="inlineCheckbox3">Company/Credit</label>
															</div>
															<div class="form-check form-check-inline">
															    <input class="form-check-input" name="ins_type[]" type="radio" id="inlineCheckbox4" value="option4">
															    <label class="form-check-label" for="inlineCheckbox4">Non-Resident</label>

															</div>

                                                              <div id="nhis_inv_form" class="mt-4" >
																	<div class="form-group row">
																		<label class="control-label col-md-2">NHIS
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="nhis_inv" id="nhis_inv" title="Select NHIS investigation"  data-live-search="true"  required>
																		<option value="inv" data-content="Investigation #1 <span class='badge badge-danger'>2132</span>">Investigation #1</option>
																		  <option value="inv2" data-content="Investigation #2 <span class='badge badge-danger'>342</span>">Investigation #2</option>
																		  <option value="inv3" data-content="Investigation #3 <span class='badge badge-danger'>343</span>">Investigation #3</option>
											
										                            	</SearchableSelectField>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Copay
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<label class="switchToggle">
																				<input type="checkbox" checked="" onclick=" ">
																				<span class="slider green round"></span>
																		</label>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Markup
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7 d-flex">
																		<input class="form-control" type="number" name="markup" id="markup" value="10%" placeholder="Enter Price" required>
											                            <input class="form-control" type="number" name="selling_price" id="selling_price" value="<!-- php: = $value->value_new+9 -->" placeholder="Enter Price" required>
											                            
																		</div>
																	</div>
																	
																	<div class="form-group row d-none">
																		<label class="control-label col-md-2">Other
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="nhis_inv" id="nhis_inv" title="Select NHIS investigation"  data-live-search="true"  required>
																		<option value="inv" data-content="Investigation #1 <span class='badge badge-danger'>2132</span>">Investigation #1</option>
																		  <option value="inv2" data-content="Investigation #2 <span class='badge badge-danger'>342</span>">Investigation #2</option>
																		  <option value="inv3" data-content="Investigation #3 <span class='badge badge-danger'>343</span>">Investigation #3</option>
											
										                            	</SearchableSelectField>
																		</div>
																	</div>
																			</div>
																			<div id="private_inv_form" >
																	<div class="form-group row">
																		<label class="control-label col-md-2">Acacia
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<input class="form-control" name="acacia" id="acacia" value="0" type="number" placeholder="Enter Price" required/>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-2">Insurance 2
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<input class="form-control" type="number" name="insurance2" id="insurance2" value="0" placeholder="Enter Price" required/>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-2">Insurance 3
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<input class="form-control" type="number" name="insurance3" id="insurance3" value="0" placeholder="Enter Price" required/>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Copay
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<label class="switchToggle">
																				<input type="checkbox" checked="" onclick=" ">
																				<span class="slider green round"></span>
																		</label>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Markup
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7 d-flex">
																		<input class="form-control" type="number" name="markup" id="markup" value="10%" placeholder="Enter Price" required>
											                            <input class="form-control" type="number" name="selling_price" id="selling_price" value="<!-- php: = $value->value_new+9 -->" placeholder="Enter Price" required>
											                            
																		</div>
																	</div>
																	
																	</div>
																	<div id="company_form" >
																	<div class="form-group row">
																		<label class="control-label col-md-2">MTN Gold
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<input class="form-control" type="number" name="mtngold" id="mtngold" value="0" placeholder="Enter Price" required/>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-2">MTN Silver
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<input class="form-control" type="number" name="mtnsilver" id="mtnsilver" value="0" placeholder="Enter Price" required/>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Copay
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<label class="switchToggle">
																				<input type="checkbox" checked="" onclick=" ">
																				<span class="slider green round"></span>
																		</label>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Markup
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7 d-flex">
																		<input class="form-control" type="number" name="markup" id="markup" value="10%" placeholder="Enter Price" required>
											                            <input class="form-control" type="number" name="selling_price" id="selling_price" value="<!-- php: = $value->value_new+9 -->" placeholder="Enter Price" required>
											                            
																		</div>
																	</div>
																	
																	</div>
																	<div id="nonr_form" >
																	<div class="form-group row">
																		<label class="control-label col-md-2">Sample #1
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<input class="form-control" name="sample1" id="sample1" value="0" placeholder="Enter Price" required/>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-2">Sample #2
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<input class="form-control" name="sample2" id="sample2" value="0" placeholder="Enter Price" required/>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Copay
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																		<label class="switchToggle">
																				<input type="checkbox" checked="" onclick=" ">
																				<span class="slider green round"></span>
																		</label>
																		</div>
																	</div>
																	<div id="markup" class="form-group row mt-4">
																		<label class="control-label col-md-2">Markup
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7 d-flex">
																		<input class="form-control" type="number" name="markup" id="markup" value="10%" placeholder="Enter Price" required>
											                            <input class="form-control" type="number" name="selling_price" id="selling_price" value="<!-- php: = $value->value_new+9 -->" placeholder="Enter Price" required>
											                            
																		</div>
																	</div>
																	
																	</div>
																	
																	
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="submit" class="btn btn-info">Submit</button>
																			<button type="submit" class="btn btn-success">Reset</button>
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
					
									

									</div>
									<div class="modal fade" id="viewClaim_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											  <h4 class="modal-title">Claim Credit Pricing for <!-- php: = $value->name --></h4>
											  <h5 class="modal-title">Facility HCP Level: 1</h5>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-body" id="bar-parent">
															
																<div class="form-body">
																
																	<div class="form-group row">
																		<label class="control-label col-md-5">Facility HCP Level
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5>Data #1</h5>
																		</div>
																	</div>
																
																	<div class="form-group row">
																		<label class="control-label col-md-5">Item Type Update
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5><!-- php: = $value->name --></h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Price
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5>90</h5>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Markup
																			<span class="required"> : </span>
																		</label>
																		<div class="col-md-7">
																			<h5>10%</h5>
																		</div>
																	</div>

																</div>
																	</div>
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
							<div class="row">
								<div class="col-md-6">
									<span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) --></span>
								</div>

								<div class="col-md-6">
									<div class="dataTables_paginate paging_simple_numbers" style="float: right;">
										<ul class="pagination">
											<!-- php: = $this->Paginator->prev(__('previous')) -->
											<!-- php: = $this->Paginator->numbers() -->
											<!-- php: = $this->Paginator->next(__('next')) -->
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
		
	</div>
</div>


<script>
	function clearLabTestFields(){
		$('#name').val('');
		$('#description').val('');
	}

	
		$('#nhis_inv_form').hide();
		$('#private_inv_form').hide();
		$('#conf_form').hide();
		$('#company_form').hide();
		$('#nonr_form').hide();
	
	
	$('#inlineCheckbox1').change(function(){
		if($(this).is(':checked'))
		{
			$('#nhis_inv_form').show();
			$('#conf_form').show();
			$('#private_inv_form').hide();
			$('#conf_form').hide();
			$('#company_form').hide();
			$('#nonr_form').hide();
		}
		else {
			$('#nhis_inv_form').hide();
		}
	})
	$('#inlineCheckbox2').change(function(){
		if($(this).is(':checked'))
		{
			$('#private_inv_form').show();
			$('#conf_form').show();
			$('#nhis_inv_form').hide();
			$('#conf_form').hide();
			$('#company_form').hide();
			$('#nonr_form').hide();
		}
		else {
			$('#private_inv_form').hide();
		}
	})
	$('#inlineCheckbox3').change(function(){
		if($(this).is(':checked'))
		{
			$('#company_form').show();
			$('#conf_form').show();
			// $('#private_inv_form').show();
			$('#nhis_inv_form').hide();
			$('#private_inv_form').hide();
			$('#nonr_form').hide();
		}
		else {
			$('#company_form').hide();
		}
	})
	$('#inlineCheckbox4').change(function(){
		if($(this).is(':checked'))
		{
			$('#nonr_form').show();
			$('#conf_form').show();
			$('#nhis_inv_form').hide();
			$('#private_inv_form').hide();
			$('#company_form').hide();
		}
		else {
			$('#nonr_form').hide();
		}
	})

</script>

<script>
    //  $(".next-one").click(function(){
    //     radio_scan_is_valid = true;
    //     $("#scan_name, #investigation_id, #price_value_new, #gender, #age_specifications").each(function(){
    //         if($.trim($(this).val()) == ''){
    //           radio_scan_is_valid = false;
    //           $(this).css({
    //             "border": "1px solid red",
    //             "background": ""
    //           });
    //         }else{
    //           $(this).css({
    //             "border": "1px solid green",
    //             "background": ""
    //           });
    //         }
    //       });
    //   });

    // //submit - for company insurance 
    // $('#submit_radio_scan').on('click',function(){
    //   if (typeof radio_scan_is_valid == 'undefined' || radio_scan_is_valid == false ) {
    //     alert('Please Fill the form where required.');
    //     return false;
    //   }
	// })
</script>
`;

export default function ElementElementManageradiologiesRadiologyscans() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
