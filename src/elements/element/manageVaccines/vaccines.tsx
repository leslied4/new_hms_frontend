const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Vaccines</span>
			</div>
			<ul class="nav nav-tabs">
				<!-- <li class="nav-item">
					<a href="#vaccines_add" data-toggle="tab"> Add </a>
				</li> -->
				<li class="nav-item">
					<a href="#vaccines_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<!-- <div class="tab-pane " id="vaccines_add">
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
				</div> -->
				<div class="tab-pane active" id="vaccines_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Vaccine</th>
										<th class="left">Vaccine Type</th>
										<th class="left">AEFI Category</th>
										<th class="left">AEFI Symptom</th>
										<th class="left">Age</th>
										<th class="left">Gender</th>
										<th class="left">Route</th>
										<th class="left">Site</th>
										<th class="left">Dosage Frequency</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($vaccines as $vaccine): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $vaccine->item->name --></td>
										<td class="left"><!-- php: = $vaccine->has('vaccine_type') ? $vaccine->vaccine_type->type_name : '' --></td>
										<td class="left"><!-- php: = $vaccine->has('aefi_category') ? $vaccine->aefi_category->category_name : '' --></td>
										<td class="left"><!-- php: = $vaccine->has('aefi_symptom') ? $vaccine->aefi_symptom->symptom : '' --></td>
										<td class="left"><!-- php: = $vaccine->age --></td>
										<td class="left"><!-- php: = $vaccine->gender --></td>
										<td class="left"><!-- php: = $vaccine->roa --></td>
										<td class="left"><!-- php: = $vaccine->site --></td>
										<td class="left"><!-- php: = $vaccine->dosage_frequency --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#completeVaccineDialogue_<!-- php: = $vaccine->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>	
											<!-- </?= $this->Form->postLink(__('Delete'), ['controller'=>'ImmunizationRequest','action'=>'deleteAefiCategory',$vaccine->id], ['confirm' => __('Are you sure you want to delete {0}?', $vaccine->id), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delete') . ' btn-xs']) ?> -->
										</td>
									</tr>
									<div class="modal fade" id="completeVaccineDialogue_<!-- php: = $vaccine->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Complete Vaccine Details: <!-- php: = $vaccine->item->name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Complete Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($vaccine, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'completeVaccineDetails', $vaccine->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Vaccine Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input readonly type="text" name="" data-required="1" value="<!-- php: = $vaccine->item->name -->" placeholder="Enter name" class="form-control input-height" /> 
																			<input hidden type="text" name="item_id" data-required="1" value="<!-- php: = $vaccine->item->id -->" placeholder="Enter name" class="form-control input-height" /> 
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Vaccine Type
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="vaccine_type_id" id="vaccine_type_id" required>
																				<option value="">Select...</option>

																				<!-- php: foreach($vaccine_types as $vaccine_type) { -->
																					<option 
																						value="<!-- php: = $vaccine_type->id -->" 
																						<!-- php: = ($vaccine->vaccine_type_id ?? null) == $vaccine_type->id ? 'selected' : '' -->
																					>
																						<!-- php: = h($vaccine_type->type_name) -->
																					</option>

																				<!-- php: } -->
																			</SearchableSelectField>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">AEFI Category
																			<span class="required">  </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" data-live-search="true" name="aefi_category_id" id="aefi_category_id" onchange="AefiCategorySelect(<!-- php: = $vaccine->id -->)">
																				<option value="">Select...</option>
																				<!-- php: foreach($aefi_categories as $aefi_category) { -->
																					<option 
																						value="<!-- php: = $aefi_category->id -->" 
																						<!-- php: = ($vaccine->aefi_category_id ?? null) == $aefi_category->id ? 'selected' : '' -->
																						data-aefi-category-id-<!-- php: = $vaccine->id -->="<!-- php: = $aefi_category->id -->"
																					>
																						<!-- php: = h($aefi_category->category_name) -->
																					</option>

																				<!-- php: } -->
																			</SearchableSelectField>
																			<!-- <input hidden type="text" name="aefi_category_id" id="aefi_category_id_<!-- php: = $vaccine->id -->"/> -->
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">AEFI Symptoms
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="aefi_symptom_id" id="aefi_symptom_id" required>
																				<option value="">Select...</option>
																				<!-- php: foreach($aefi_symptoms as $aefi_symptom) { -->
																					<option 
																						value="<!-- php: = $aefi_symptom->id -->" 
																						<!-- php: = ($vaccine->aefi_symptom_id ?? null) == $aefi_symptom->id ? 'selected' : '' -->
																					>
																						<!-- php: = h($aefi_symptom->symptom) -->
																					</option>

																				<!-- php: } -->
																			</SearchableSelectField>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Time Unit After AEFI
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="time_unit" id="time_unit" required>
																				<option value="">Select...</option>
																				<option value="Minutes"<!-- php: if($vaccine->time_unit == "Minutes") { --> selected="selected"<!-- php: } -->>Minutes</option>
																				<option value="Hours"<!-- php: if($vaccine->time_unit == "Hours") { --> selected="selected"<!-- php: } -->>Hours</option>
																			</SearchableSelectField>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Gender
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="gender" id="gender" required>
																				<option value="">Select...</option>
																				<option value="Male"<!-- php: if($vaccine->gender == "Male") { --> selected="selected"<!-- php: } -->>Male</option>
																				<option value="Female"<!-- php: if($vaccine->gender == "Female") { --> selected="selected"<!-- php: } -->>Female</option>							
																			</SearchableSelectField>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Age
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="age" id="age" required>
																				<option value="">Select...</option>
																				<option value="6-10"<!-- php: if($vaccine->age == "6-10") { --> selected="selected"<!-- php: } -->>6-10</option>
																				<option value="10-20"<!-- php: if($vaccine->age == "10-20") { --> selected="selected"<!-- php: } -->>10-20</option>
																				<option value="20-above"<!-- php: if($vaccine->age == "20-above") { --> selected="selected"<!-- php: } -->>20-above</option>													
																			</SearchableSelectField>
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Count / Dosage Frequency
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="dosage_frequency" id="dosage_frequency">
																				<option value="">Select...</option>
																				<option value="3"<!-- php: if($vaccine->dosage_frequency == "3") { --> selected="selected"<!-- php: } -->>3 Doses</option>
																				<option value="2"<!-- php: if($vaccine->dosage_frequency == "2") { --> selected="selected"<!-- php: } -->>2 Doses</option>
																				<option value="1"<!-- php: if($vaccine->dosage_frequency == "1") { --> selected="selected"<!-- php: } -->>1 Dose</option>
																			</SearchableSelectField>
																		</div>
																	</div>																														
																</div>
																<div class="form-group row">
																	<label class="control-label col-md-5">Route
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<SearchableSelectField class="form-control input-height" name="roa" id="roa" required>
																			<option value="">Select...</option>
																			<option value="Oral"<!-- php: if($vaccine->roa == "Oral") { --> selected="selected"<!-- php: } -->>Oral</option>
																		</SearchableSelectField>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="control-label col-md-5">Site
																		<span class="required"> * </span>
																	</label>
																	<div class="col-md-7">
																		<SearchableSelectField class="form-control input-height" name="site" id="site" required>
																			<option value="">Select...</option>
																			<option value="Left Arm"<!-- php: if($vaccine->site == "Left Arm") { --> selected="selected"<!-- php: } -->>Left Arm</option>
																			<option value="Right Arm"<!-- php: if($vaccine->site == "Right Arm") { --> selected="selected"<!-- php: } -->>Right Arm</option>
																		</SearchableSelectField>
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

	function AefiCategorySelect(id){
		$('#aefi_category_id_select_' + id).change(function(){
			$('#aefi_category_id_' + id).val($(this).children('option:selected').data('aefi-category-id-' + id));
		});
	}
</script>

`;

export default function ElementElementManageVaccinesVaccines() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
