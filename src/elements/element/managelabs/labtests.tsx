const rawHtml = `
<style>
	.lightblue {
		background-color: #51aff124;
	}

	.small-img {
		height: 20px;
		width: auto;
	}

	.custom-btn {
		height: 20px;
		width: 20px;
		font-size: 15px !important;
	}
</style>
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Lab Tests</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#labtests_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#labtests_view" data-toggle="tab"> View </a>
				</li>
				<li class="nav-item">
					<a href="#service_placetab" data-toggle="tab"> Order Service Place </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="labtests_add">
					<h4>Add a new Test Item</h4>
					<!-- php: = $this->Form->create($labTest, ['url' => ['controller' => 'ManageLabs', 'action' => 'addLabTest']]); -->
					<div class="row">
						<div class="col-md-6  p-2">
							<div class="form-group row">
								<label class="control-label col-md-4"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.TestName') != null ? Cake\Core\Configure::read('LAB_STRINGS.TestName') : 'Name' -->
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required />
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' -->
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField class="form-control input-height" name="investigation_id" id="investigation_id" required>
										<option value="">Select Category</option>

										<!-- php: foreach ($investigations as $selectOption) { -->
											<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
										<!-- php: } -->

									</SearchableSelectField>
								</div>
							</div>
							<div class="form-group row">
								<label for="" class="control-label col-md-4">Sample(s) Collected
									<span class="required">*</span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="samples_collected[]" id="samples_collected" title="Select Sample Type" data-live-search="true" multiple required>
										<!-- <option value="all">All</option> -->
										<!-- php: foreach ($specimenTypes as $specimenType) { -->
											<option value="<!-- php: = $specimenType->id -->" data-content="<!-- php: = h($specimenType->name) --> <span class='badge' style='background: <!-- php: = $specimenType->color -->'>&nbsp;</span>"><!-- php: = h($specimenType->name) --></option>
										<!-- php: } -->
									</SearchableSelectField>

								</div>
							</div>
							<div class="form-group row">
								<label for="" class="control-label col-md-4">Turn Around Time (minutes)
									<span class="required">*</span>
								</label>
								<div class="col-md-6">

									<input type="text" value="0" name="turn_around_time" id="turn_around_time" data-required="1" placeholder="minutes" class="form-control input-height" required />

								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Price
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<input type="text" name="value_new" id="value_new" data-required="1" placeholder="Enter price" class="form-control input-height" required />
								</div>
							</div>

							<div class="form-group row">
								<label class="control-label col-md-4">Description

								</label>
								<div class="col-md-6">
									<input type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" />
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Order Service Place
									<span class="required"> </span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="service_place[]" id="service_place" title="Select Service Place" data-live-search="true" multiple>
										<!-- php: foreach ($orderServices as $serviceplace) { -->
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
									<SearchableSelectField type="text" name="gender" id="gender" data-required="1" class="form-control input-height" required>
										<option value="" disabled selected>Select Age Specification</option>
										<!-- php: foreach ($genders as $gender) { -->
											<option value="<!-- php: = $gender->id -->"><!-- php: = $gender->name --></option>
										<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
						</div>
						<div class="col-md-6 p-2">

							<div class="form-group row" hidden>
								<label class="control-label col-md-4">Age
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField type="text" name="age" id="age" data-required="1" class="form-control input-height">
										<option value="" disabled selected>Select Option</option>
										<!-- php: foreach ($age_categories as $age_cat) { -->
											<option value="<!-- php: = $age_cat->id -->"><!-- php: = $age_cat->name --></option>
										<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Can it be an Outsourced Request ?
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="outsourced" id="outsourced1" value="1">
										<label class="form-check-label" for="outsourced1">Yes</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="outsourced" id="outsourced2" value="0">
										<label class="form-check-label" for="outsourced2">No</label>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Is Blood Compatibility Test?
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="is_blood_compatibility" id="isTransfusion1" value="1">
										<label class="form-check-label" for="outsourced1">Yes</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="is_blood_compatibility" id="isTransfusion2" value="0">
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
										<input class="form-check-input" type="radio" name="copay" id="copay1" value="1">
										<label class="form-check-label" for="copay1">Enable</label>
									</div>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="copay" id="copay2" value="0">
										<label class="form-check-label" for="copay2">Disable</label>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-4">Age Specification
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField type="text" name="age_spec" id="age_spec" data-required="1" class="form-control input-height" required>
										<option value="" disabled selected>Select Age Specification</option>
										<!-- php: foreach ($age_specs as $age_spec) { -->
											<option value="<!-- php: = $age_spec->id -->"><!-- php: = $age_spec->age --></option>
										<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
							<div class="form-group row" hidden>
								<label class="control-label col-md-4">Weight Specification
									<span class="required"> * </span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField type="text" name="weight_spec" id="weight_spec" data-required="1" class="form-control input-height">
										<option value="" disabled selected>Select Weight Specification</option>
										<!-- php: foreach ($weight_specs as $weight_spec) { -->
											<option value="<!-- php: = $weight_spec->id -->"><!-- php: = $weight_spec->weight --></option>
										<!-- php: } -->
									</SearchableSelectField>
								</div>
							</div>
							<div class="form-group row">
								<label for="" class="control-label col-md-4">Specialities/Clinic
									<span class="required">*</span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialities[]" id="specialities" title="Select Specialties/Clinic" data-live-search="true" multiple required>
										<!-- php: foreach ($specialities as $specialty) { -->
											<option value="<!-- php: = $specialty->id -->"><!-- php: = h($specialty->name) --></option>


										<!-- php: } -->

									</SearchableSelectField>
								</div>
							</div>

							<div class="form-group row">
								<label for="" class="control-label col-md-4">NHIS GDRG
									<span class="required"></span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="nhis_investigation_id" id="nhis_investigation_id" title="Select GDRG" data-live-search="true">
										<!-- php: foreach ($nhis_investigations as $val) { -->
											<option value="<!-- php: = $val->id -->" data-content="<!-- php: = h($val->investigation_name) --><!-- php: = h($val->gdrg) --> <span class='badge badge-danger'><!-- php: = $val->tariff --></span>"><!-- php: = h($val->investigation_name) --><!-- php: = h($val->gdrg) --></option>

										<!-- php: } -->

									</SearchableSelectField>
								</div>
							</div>

							<div class="form-group row">
								<label for="" class="control-label col-md-4">Related Consumables (Reagents)
									<span class="required"></span>
								</label>
								<div class="col-md-6">
									<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="item_id[]" onchange="bindConsumableQuantityHandler('item_id', 'consumableQuantities')" id="item_id" multiple title="Select Consumable (Reagent)" data-live-search="true">
										<!-- php: foreach ($consumables as $val) { -->
											<option value="<!-- php: = $val->id -->" data-quantity="<!-- php: = h($val->item_type->quantity) -->" data-content="<!-- php: = h($val->name) --> <span class='badge badge-primary'><!-- php: = $val->item_type->quantity --></span>"><!-- php: = h($val->name) --></option>

										<!-- php: } -->

									</SearchableSelectField>
								</div>
							</div>
							<div id="consumableQuantities"></div>

							<!-- <div class="form-group row" id="nhis-gdrg-div" onmouseover="displayGDRGTooltip()">
							<label class="control-label col-md-4" >NHIS GDRG
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
								<input type="text" value="" name="gdrg" id="gdrg" data-required="0" placeholder="Enter NHIS GDRG" class="form-control input-height text text-uppercase" /> 
							</div>
						</div> -->


							<div class="row">
								<div class="offset-md-4 col-md-8">
									<button type="submit" class="btn btn-info">Submit</button>
									<button type="button" class="btn btn-default" onclick='clearLabtTestFields()'>Reset</button>
								</div>
							</div>
						</div>
					</div>


					<!-- php: = $this->Form->end(); -->

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
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialties[]" id="specialties" title="Select Specialities/Clinic" data-live-search="true" required multiple>
									<!-- php: foreach ($specialities as $speciality) { -->
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
								<button type="button" class="btn btn-default" onclick='clearServiceFields()'>Reset</button>
							</div>
						</div>
					</div>



					<!-- php: = $this->Form->end(); -->

				</div>
				<div class="tab-pane active" id="labtests_view">
					<div class="card  card-box">
						<div class="card-body ">
							<span class="label label-md label-<!-- php: = $theme2 -->"><strong><!-- php: = $this->Paginator->counter(__('Total Records: {{count}}')) --></strong></span> - <span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}')) --></span>
							<!-- php: = $this->Form->create(null, ['type' => 'get']); -->
							<div class="input-group" style="max-width: 250px; float: right;">
								<input type="text" class="form-control" name="searchValue" type="text" id="paymentSearchBox" placeholder="Search" value="<!-- php: = $searchValue -->" />
								<span class="input-group-btn">
									<button type="submit" class="btn btn-info btn-flat">Go!</button>
								</span>
							</div>

							<!-- php: = $this->Form->end() -->
							<div class="table-scrollable">
								<table class="table table-hover order-column full-width">
									<thead>
										<tr>
											<th class="left"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.TestName') != null ? Cake\Core\Configure::read('LAB_STRINGS.TestName') : 'Name' --></th>
											<th class="left"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' --></th>
											<th class="left">Old Price</th>
											<th class="left">New Price</th>
											<th class="left">Copay</th>
											<!-- <th class="left">NHIS GDRG</th> -->
											<th class="left">Outsourced</th>
											<th class="left">Result</th>
											<th class="left">Action</th>
										</tr>
									</thead>
									<tbody>
										<!-- php: $x = 1; foreach ($labTests as $value): -->
											<tr class="odd gradeX ">
												<td class="left"><!-- php: = $value->name --></td>
												<td class="left"><!-- php: = isset($value->investigation) ? $value->investigation->name : '' --></td>
												<td class="left"><!-- php: = $this->Number->precision($value->value_old, 2) --></td>
												<td class="left"><!-- php: = $this->Number->precision($value->value_new, 2) --></td>
												<td><!-- php: = $value->copay == 1 ? "<span class='badge badge-primary'>Co Pay</span>" : "" --></td>
												<!-- <td class="left"></?= isset($value->gdrg) ? strtoupper($value->gdrg) : 'No GDRG' ?></td> -->
												<td class="left"><!-- php: = $value->outsourced == 1 ? "<span class='badge bg-info'>Yes</span>" : "" --></td>
												<td class="left">
													<a href="<!-- php: = $this->Url->build(['controller' => 'ManageLabs', 'action' => 'updateLabTemplate', $value->id]) -->" class="btn btn-xs">
														Template
													</a>
												</td>
												<td class="left">

													<!-- php: = $value->enabled ? $this->Form->postLink(__('Disable'), ['controller' => 'ManageLabs', 'action' => 'toggleEnable', $value->id, 0], ['class' => 'btn btn-secondary btn-xs']) : $this->Form->postLink(__('Enable'), ['controller' => 'ManageLabs'... -->

													<a data-toggle="modal" data-target="#editLabTestDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
														Edit
													</a>


													<!-- php: = $this->Form->postLink(__('Delete'), ['controller' => 'ManageLabs', 'action' => 'deleteLabTest', $value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.De... -->
													<a href="<!-- php: = Cake\Routing\Router::url(['controller' => 'ManageLabs', 'action' => 'viewLabTest', $value->id, 'view_labtest', '_ext' => 'pdf']) -->" class="btn btn-xs">View</a>

												</td>
											</tr>


										<!-- php: $x++; endforeach; -->
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="table-scrollable">
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

<!-- php: function getID($value) { return $value->id; }; function getLabID($value) { return $value->item_id; }; foreach ($labTests as $value): -->

	<div class="modal fade" id="editLabTestDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
			<div class="modal-content">


				<div class="row">
					<div class="col-lg-12">
						<div class="card card-box">
							<div class="card-head">
								<header>Edit Lab Details: <!-- php: = $value->name --></header>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="card-body" id="bar-parent">
								<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageLabs', 'action' => 'editLabTest', $value->id], 'class' => 'form-horizontal', 'id' => ("editLabTestForm" . $value->id),]) -->
								<div class="row">
									<div class="col-md-6  p-2">
										<div class="form-group row">
											<label class="control-label col-md-4"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.TestName') != null ? Cake\Core\Configure::read('LAB_STRINGS.TestName') : 'Name' -->
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<input type="text" value="<!-- php: = $value->name -->" name="name" id="name<!-- php: = $value->id -->" data-required="1" placeholder="Enter name" class="form-control input-height" />
											</div>
										</div>
										<div class="form-group row">
											<label class="control-label col-md-4"><!-- php: = Cake\Core\Configure::read('LAB_STRINGS.Investigation') != null ? Cake\Core\Configure::read('LAB_STRINGS.Investigation') : 'Investigation' -->
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField class="form-control input-height" name="investigation_id" id="investigation_id<!-- php: = $value->id -->">
													<option value="<!-- php: = isset($value->investigation) ? $value->investigation->id : '' -->"><!-- php: = isset($value->investigation) ? $value->investigation->name : '' --></option>

													<!-- php: foreach ($investigations as $selectOption) { -->
														<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
													<!-- php: } -->

												</SearchableSelectField>
											</div>
										</div>
										<div class="form-group row">
											<label for="" class="control-label col-md-4">Sample(s) Collected
												<span class="required">*</span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField class=" selectpicker form-control show-menu-arrow show-tick" data-size="5" name="samples_collected[]" id="samples_collected<!-- php: = $value->id -->" title="Select Sample Type" data-live-search="true" multiple data-required='1' required>
													<!-- php: foreach ($specimenTypes as $specimenType) { -->
														<option value="<!-- php: = $specimenType->id -->" <!-- php: = in_array($specimenType->id, array_map('getID', $value->specimen_types)) ? "selected" : "nope" --> data-content="<!-- php: = h($specimenType->name) --> <span class='badge' style='background: <!-- php: = $specimenType->color -->'>&nbsp;</span>"><!-- php: = h($specimenType->name) --></option>
													<!-- php: } -->
												</SearchableSelectField>

											</div>
										</div>
										<div class="form-group row">
											<label for="" class="control-label col-md-4">Turn Around Time (minutes)
												<span class="required">*</span>
											</label>
											<div class="col-md-6">

												<input type="text" value="<!-- php: = $value->turn_around_time -->" name="turn_around_time" id="turn_around_time<!-- php: = $value->id -->" data-required="1" placeholder="minutes" class="form-control input-height" required />

											</div>
										</div>
										<div class="form-group row">
											<label class="control-label col-md-4">Price
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<input type="text" value="<!-- php: = $value->value_new -->" name="value_new" id="value_new<!-- php: = $value->id -->" data-required="1" placeholder="Enter price" class="form-control input-height" required />
											</div>
										</div>

										<div class="form-group row">
											<label class="control-label col-md-4">Description

											</label>
											<div class="col-md-6">
												<input type="text" value="<!-- php: = $value->description -->" name="description" id="description<!-- php: = $value->id -->" data-required="0" placeholder="Enter description" class="form-control input-height" />
											</div>
										</div>
										<div class="form-group row">
											<label class="control-label col-md-4">Order Service Place
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="service_place[]" id="service_place<!-- php: = $value->id -->" title="Select Service Place" data-live-search="true" multiple required>
													<!-- php: foreach ($orderServices as $serviceplace) { -->
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
												<SearchableSelectField type="text" name="gender" id="gender<!-- php: = $value->id -->" data-required="1" class="form-control input-height" required>

													<!-- php: foreach ($genders as $gender) { -->
														<option <!-- php: = $value->gender == $gender->id ? "selected" : "" --> value="<!-- php: = $gender->id -->"><!-- php: = $gender->name --></option>
													<!-- php: } -->
												</SearchableSelectField>
											</div>
										</div>
										<div class="form-group row">
											<label for="" class="control-label col-md-4">NHIS GDRG
												<span class="required"></span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField class="selectpicker form-control input-height show-menu-arrow show-tick" data-size="5" name="nhis_investigation_id" id="nhis_investigation_id<!-- php: = $value->id -->" title="Select GDRG" data-live-search="true">
													<!-- php: foreach ($nhis_investigations as $val) { -->
														<option <!-- php: = $value->nhis_investigation_id == $val->id ? "selected" : "" --> data-content="<!-- php: = h($val->investigation_name) --><!-- php: = h($val->gdrg) --> <span class='badge badge-danger'><!-- php: = $val->tariff --></span>" value="<!-- php: = $val->id -->"><!-- php: = h($val->investigation_name) --><!-- php: = h($val->gdrg) --></option>

													<!-- php: } -->

												</SearchableSelectField>

											</div>
										</div>
									</div>
									<div class="col-md-6 p-2">

										<div class="form-group row">
											<label class="control-label col-md-4">Age
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField type="text" name="age" id="age<!-- php: = $value->id -->" data-required="1" class="form-control input-height" required>
													<!-- php: // print_r($age_categories); foreach ($age_categories as $age_cat) { -->
														<option <!-- php: = $value->age_category_id == $age_cat->id ? "selected" : "" --> value="<!-- php: = $age_cat->id -->"><!-- php: = $age_cat->name --></option>
													<!-- php: } -->
												</SearchableSelectField>
											</div>
										</div>
										<div class="form-group row">
											<label class="control-label col-md-4">Can it be an Outsourced Request ?
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<div class="form-check form-check-inline">
													<input class="form-check-input" <!-- php: = $value->outsourced == 1 ? 'checked' : '' --> type="radio" name="outsourced" id="outsourced1<!-- php: = $value->id -->" value="1">
													<label class="form-check-label" for="outsourced1">Yes</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" <!-- php: = $value->outsourced == 0 ? 'checked' : '' --> type="radio" name="outsourced" id="outsourced2<!-- php: = $value->id -->" value="0">
													<label class="form-check-label" for="outsourced2">No</label>
												</div>
											</div>
										</div>
										<div class="form-group row">
											<label class="control-label col-md-4">Is Blood Compatibility Test?
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="blood_compatibility" id="isTransfusion1<!-- php: = $value->id -->" value="1">
													<label class="form-check-label" for="outsourced1">Yes</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="outsourced" id="isTransfusion2<!-- php: = $value->id -->" value="0">
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
													<input class="form-check-input" <!-- php: = $value->copay == 1 ? 'checked' : '' --> type="radio" name="copay" id="copay1<!-- php: = $value->id -->" value="1">
													<label class="form-check-label" for="copay1">Enable</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" <!-- php: = $value->copay == 0 ? 'checked' : '' --> type="radio" name="copay" id="copay2<!-- php: = $value->id -->" value="0">
													<label class="form-check-label" for="copay2">Disable</label>
												</div>
											</div>
										</div>
										<div class="form-group row">
											<label class="control-label col-md-4">Age Specification
												<span class="required"> * </span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField type="text" name="age_spec" id="age_spec" data-required="1" class="form-control input-height" required>
													<!-- php: foreach ($age_specs as $age_spec) { -->
														<option <!-- php: = $value->age_spec == $age_spec->id ? "selected" : "" --> value="<!-- php: = $age_spec->id -->"><!-- php: = $age_spec->age --></option>
													<!-- php: } -->
												</SearchableSelectField>
											</div>
										</div>

										<div class="form-group row">
											<label for="" class="control-label col-md-4">Specialities/Clinic
												<span class="required">*</span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="specialities[]" id="specialities<!-- php: = $value->id -->" title="Select Specialties/Clinic" data-live-search="true" multiple required>
													<!-- php: foreach ($specialities as $specialty) { -->
														<option value="<!-- php: = $specialty->id -->"><!-- php: = h($specialty->name) --></option>


													<!-- php: } -->

												</SearchableSelectField>
											</div>
										</div>

										<div class="form-group row">
											<label for="" class="control-label col-md-4">Related Consumables (Reagents)
												<span class="required">*</span>
											</label>
											<div class="col-md-6">
												<SearchableSelectField class=" selectpicker form-control show-menu-arrow show-tick" data-size="5" onchange="bindConsumableQuantityHandler('item_id<!-- php: = $value->id -->', 'consumableQuantities<!-- php: = $value->id -->')" name="item_id[]" id="item_id<!-- php: = $value->id -->" title="Select Reagents" data-live-search="true" multiple data-required='1'>
													<!-- php: debug($value->lab_tests_items); foreach ($consumables as $specimenType) { -->
														<option value="<!-- php: = $specimenType->id -->" <!-- php: = in_array($specimenType->id, array_map('getLabID', $value->lab_tests_items)) ? "selected" : "nope" --> data-quantity="<!-- php: = h($specimenType->item_type->quantity) -->" data-content="<!-- php: = h($specimenType->name) --> <span class='badge badge-primary'><!-- php: = $specimenType->item_type->quantity --></span>"><!-- php: = h($specimenType->name) --></option>
													<!-- php: } -->
												</SearchableSelectField>

											</div>
										</div>
										<div id="consumableQuantities<!-- php: = $value->id -->">
											<!-- php: foreach ($value->lab_tests_items as $key => $reagent): -->
												<div class="form-group row">
													<label class="control-label col-md-4">Qty of <!-- php: = $reagent->item->name -->
														<span class="required"></span>
													</label>
													<div class="col-md-6">
														<input type="text" onkeyup="interpreteItemQuantity('<!-- php: = $reagent->item->item_type->quantity -->', '<!-- php: = $reagent->item_id -->', '<!-- php: = $reagent->item->name -->')" class="form-control" name="item_id_quantity[]" value="<!-- php: = $reagent->quantity -->" placeholder="Add quantity for <!-- php: = $reagent->item->name -->">
														<span class="small" id="data-reading-<!-- php: = $reagent->item_id -->">This test will use <!-- php: = $reagent->quantity_fraction -->% of <!-- php: = $reagent->item->name --> <!-- php: = $reagent->item->item_type->quantity --> <input type="hidden" name="item_id_quantity_fraction[]" value='<!-- php: = $reagent->quantity_fraction -->'></span>
													</div>
												</div>
											<!-- php: endforeach -->
										</div>

										<div class="row">
											<div class="offset-md-4 col-md-8">
												<div onclick="submitEditFormButton('editLabTestForm','<!-- php: = $value->id -->')" type="submit" class="btn btn-info">Submit</div>
												<div type="button" class="btn btn-default" onclick='clearLabtTestFields()'>Reset</button>
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



<!-- php: endforeach; -->


<script>
	function clearLabTestFields() {
		$('#name').val('');
		$('#description').val('');
	}


	$('#nhis_inv_form').hide();
	$('#private_inv_form').hide();
	$('#conf_form').hide();
	$('#company_form').hide();
	$('#nonr_form').hide();


	$('#inlineCheckbox1').change(function() {
		if ($(this).is(':checked')) {
			$('#nhis_inv_form').show();
			$('#conf_form').show();
			$('#private_inv_form').hide();
			$('#conf_form').hide();
			$('#company_form').hide();
			$('#nonr_form').hide();
		} else {
			$('#nhis_inv_form').hide();
		}
	})
	$('#inlineCheckbox2').change(function() {
		if ($(this).is(':checked')) {
			$('#private_inv_form').show();
			$('#conf_form').show();
			$('#nhis_inv_form').hide();
			$('#conf_form').hide();
			$('#company_form').hide();
			$('#nonr_form').hide();
		} else {
			$('#private_inv_form').hide();
		}
	})
	$('#inlineCheckbox3').change(function() {
		if ($(this).is(':checked')) {
			$('#company_form').show();
			$('#conf_form').show();
			// $('#private_inv_form').show();
			$('#nhis_inv_form').hide();
			$('#private_inv_form').hide();
			$('#nonr_form').hide();
		} else {
			$('#company_form').hide();
		}
	})
	$('#inlineCheckbox4').change(function() {
		if ($(this).is(':checked')) {
			$('#nonr_form').show();
			$('#conf_form').show();
			$('#nhis_inv_form').hide();
			$('#private_inv_form').hide();
			$('#company_form').hide();
		} else {
			$('#nonr_form').hide();
		}
	})

	function displayGDRGTooltip() {
		$('#nhis-gdrg-div').tooltip({
			title: 'Provide NHIS GDRG code'
		}).tooltip('show');
	}


	function submitEditFormButton(name, id) {

		console.log(name + id)
		if (confirm('Are you sure you want to submit ?')) {
			let form = document.getElementById('editLabTestForm' + id)
			let data = $('#editLabTestForm' + id).serializeArray();
			let size = data.length
			$(\`#editLabTestForm\${id} .selectpicker\`).each(function() {
				data[size] = {
					[$(this).attr('name')]: $(this).val()
				}
				size += 1
			});
			let action = form.action
			console.log("data", data)
			submitEditForm(action, data)
		}
	}

	function submitEditForm(link, data) {
		$.ajax({
			type: "POST",
			url: link,
			data: data,
			success: function g(data, textStatus) {
				window.location.reload();
			},
			fail: function g(xhr, textStatus, errorThrown) {

			}
		});
	}
</script>

<script>
	function bindConsumableQuantityHandler(selectId, containerId) {
		const selectEl = document.getElementById(selectId);
		const container = document.getElementById(containerId);

		// Get all selected options (works for single or multiple)
		const selectedOptions = Array.from(selectEl.selectedOptions);

		// Clear previous reagent fields
		container.innerHTML = "";

		selectedOptions.forEach(option => {
			const name = option.text;
			const id = option.value;
			const quantity = $("#" + selectId).find(':selected').attr('data-quantity').trim()

			// Create a new reagent quantity field
			const newReagent = document.createElement("div");
			newReagent.className = "form-group row";
			newReagent.id = \`reagent-\${id}\`;
			newReagent.innerHTML = \`
            <label class="control-label col-md-4">Qty of \${name}
                <span class="required"></span>
            </label>
            <div class="col-md-6">
                <input type="text" id="data-reading-value-\${id}" class="form-control" onkeyup="interpreteItemQuantity('\${quantity}', '\${id}', '\${name}')" name="item_id_quantity[]" placeholder="Add quantity per \${quantity} of \${name}">
				<span class="small" id="data-reading-\${id}"></span>
            </div>
        \`;

			container.appendChild(newReagent);
		});
	}

	function getLeadingNumber(str) {
		const match = str.trim().match(/^(\d+(\.\d+)?)/);
		return match ? parseFloat(match[1]) : null;
	}


	function interpreteItemQuantity(quantity, id, name) {
		const qty = getLeadingNumber(quantity)
		const val = $("#data-reading-value-" + id).val()
		let reading = \`This test will use \${parseFloat((val/qty) * 100 || 0).toFixed(2)}% of \${name} \${quantity} <input type="hidden" name="item_id_quantity_fraction[]" value='\${parseFloat((val/qty) * 100 || 0).toFixed(2)}'>\`
		$("#data-reading-" + id).html(reading)
	}
</script>
`;

export default function ElementElementManagelabsLabtests() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
