const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Other Services</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#treatmentroom_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#servicestocks_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="treatmentroom_add">
					<h4>Add Other Services</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'addWardService']]); -->
					
						<div class="form-group row">
							<label class="control-label col-md-4">Service Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name"  placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Specialty
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker" name="specialty_id[]" id="specialty_id" data-size="5" data-live-search="true" multiple required>
									<option value="">Select...</option>
									<!-- php: foreach($specialties as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->" data-code="<!-- php: = $selectOption->code -->" data-age-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Gender Specifications
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="gender_specification_id" id="gender_specification_id" required>
									<option value="">Select...</option>
									<!-- php: foreach($genderSpecifications as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->" data-gender-name="<!-- php: = $selectOption->gender -->"><!-- php: = $selectOption->gender --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Age Specifications
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField multiple data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="age_specification_id[]" id="age_specification_id" required>
									<option value="">Select...</option>
									<!-- php: foreach($ageSpecifications as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->" data-age-name="<!-- php: = $selectOption->age -->"><!-- php: = $selectOption->age --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Service Type
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="service_type" id="service_type_id" onchange="handleChangeServiceType()" required>
									<option value="2">Opd</option>
									<option value="1">Ward</option>
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="form-group row" id="ward_options" style="display: none">
							<label class="control-label col-md-4">Wards
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField multiple data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="ward_id[]" id="ward_id">
									<option value="">Select...</option>
									<!-- php: foreach($wards as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->" data-ward-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Price
                                <span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" name="price" id="price" placeholder="Enter price" class="form-control input-height" required/> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Description
                                <span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="description" id="description" placeholder="Enter description" class="form-control input-height" required/> 
							</div>
						</div>

						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearAddRoomFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
				</div>
				<div class="tab-pane active" id="servicestocks_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Specialties</th>
										<th class="left">Age Specifications</th>
										<th class="left">Gender Specifications</th>
										<th class="left">Wards</th>
										<th class="left">Price (<!-- php: = $configs['currency'] -->)</th>
										<th class="left">Description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($wardServices as $value): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->name --></td>
										<!-- php: $specialtyNames = ''; foreach ($value->ward_service_specialties as $ward_service) { $specialty = $ward_service['specialty']; $specialtyNames .= (isset($specialty['name']) ? ($specialty['name']) : '') . '<br>'; } echo '<td class="left">' . $... -->
										<!-- php: $ageSpecs = ''; foreach ($value->ward_service_age_specifications as $age_specification) { $age = $age_specification['age_specification']; $ageSpecs .= $age['age'] . '<br>'; } echo '<td class="left">' . $ageSpecs . '</td>'; -->
										<td class="left"><!-- php: = isset($value->gender_specification) ? $value->gender_specification->gender : '' --></td>
										<!-- php: $wardss = ''; foreach ($value->ward_service_wards as $val) { $ward = $val['ward']; $wardss .= $ward['name'] . '<br>'; } echo '<td class="left">' . $wardss . '</td>'; -->
										<td class="left"><!-- php: = $value->price --></td>
										<td class="left"><!-- php: = $value->description --></td>
										<td class="left">
											<a data-toggle="modal" data-backdrop="static" data-target="#editWardServiceDialogue<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageServices','action'=>'deleteWardService',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.... -->
										</td>
									</tr>
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
<!-- php: $x = 1; foreach ($wardServices as $value): -->
	<div class="modal fade" id="editWardServiceDialogue<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title">Edit Service</h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body">
			
			<div class="row">
				<div class="col-md-12 col-sm-12">
					<div class="card card-box">
						<div class="card-head">
							<header><!-- php: = $value->name --></header>
						</div>
						<div class="card-body" id="bar-parent">
							<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageServices', 'action' => 'editWardService', $value->id], 'class' => 'form-horizontal']) -->
								<div class="form-body">

									<div class="form-group row">
										<label class="control-label col-md-4">Name
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<input type="text" name="name" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-4">Specialty
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<SearchableSelectField class="form-control input-height selectpicker" name="specialty_id[]" id="specialty_id" data-size="5" data-live-search="true" multiple required>
											<!-- php: foreach($specialties as $selectOption) { $isSelected = false; foreach ($value->ward_service_specialties as $selectedSpecialty) { if ($selectedSpecialty->specialty_id == $selectOption->id) { $isSelected = true; break; } } -->
													<option value="<!-- php: = $selectOption->id -->" data-code="<!-- php: = $selectOption->code -->" data-age-name="<!-- php: = $selectOption->name -->" <!-- php: if ($isSelected) echo 'selected' -->>
														<!-- php: = $selectOption->name -->
													</option>
												<!-- php: } -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-4">Gender Specifications
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<SearchableSelectField data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="gender_specification_id" id="gender_specification_id" required>
												<option value="">Select...</option>
												<!-- php: foreach($genderSpecifications as $selectOption) { -->
													<option <!-- php: = $value->gender_specification_id == $selectOption->id ? "selected" : '' --> value="<!-- php: = $selectOption->id -->" data-gender-name="<!-- php: = $selectOption->gender -->"><!-- php: = $selectOption->gender --></option>
												<!-- php: } -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-4">Age Specifications
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<SearchableSelectField multiple data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="age_specification_id[]" id="age_specification_id" required>
												<option value="">Select...</option>
												<!-- php: foreach($ageSpecifications as $selectOption) { $isSelected = false; foreach ($value->ward_service_age_specifications as $selectedAge) { if ($selectedAge->age_specification->id == $selectOption->id) { $isSelected = true; break; } } -->
													<option value="<!-- php: = $selectOption->id -->" data-age-name="<!-- php: = $selectOption->age -->" <!-- php: if ($isSelected) echo 'selected' -->><!-- php: = $selectOption->age --></option>
												<!-- php: } -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-4">Service Type
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<SearchableSelectField data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="service_type" id="edit_service_type_id" onchange="handleEditChangeServiceType()" required>
												<option value="2" <!-- php: = $value->service_type == '2' ? 'selected' : '' -->>Opd</option>
												<option value="1" <!-- php: = $value->service_type == '1' ? 'selected' : '' -->>Ward</option>
											</SearchableSelectField>
										</div>
									</div>
									
									<div class="form-group row" style="display: <!-- php: = $value->service_type == '2' ? 'none' : '' -->" id="edit_ward_options">
										<label class="control-label col-md-4">Wards
											<span class="required"> * </span>
										</label>
										<div class="col-md-5">
											<!-- sadat -->
											<SearchableSelectField multiple data-size="5" data-live-search="true" class="form-control input-height selectpicker" name="ward_id[]" id="edit_ward_id"  <!-- php: = $value->service_type == '1' ? 'required' : '' -->>
											<!-- php: foreach($wards as $selectOption) { $isSelected = false; foreach ($value->ward_service_wards as $selectedWard) { if ($selectedWard->ward->id == $selectOption->id) { $isSelected = true; break; } } -->
													<option value="<!-- php: = $selectOption->id -->" data-ward-name="<!-- php: = $selectOption->name -->" <!-- php: if ($isSelected) echo 'selected' -->><!-- php: = $selectOption->name --></option>
												<!-- php: } -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-4">Price
										</label>
										<div class="col-md-5">
											<input type="number" name="price" value="<!-- php: = $value->price -->" placeholder="Enter price" class="form-control input-height" required/> 
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


<script>
	function clearAddRoomFields(){
        $("#name").val(" ");
        $("#price").val(" ");	
	}

	function handleChangeServiceType() {
		let res = $('#service_type_id').val()

		if (res == 1) {
			$('#ward_options').show()
			$('#ward_id').prop('required', true)
		} else {
			$('#ward_options').hide()
			$('#ward_id').removeAttr('required')
		}
		
	}
	function handleEditChangeServiceType() {
		let res = $('#edit_service_type_id').val()

		if (res == 1) {
			$('#edit_ward_options').show()
			$('#edit_ward_id').prop('required', true)
		} else {
			$('#edit_ward_options').hide()
			$('#edit_ward_id').removeAttr('required')
		}
		
	}
</script>

`;

export default function ElementElementManageservicesWardServices() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
