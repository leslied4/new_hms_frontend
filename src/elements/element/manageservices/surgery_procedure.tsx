const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Procedure/Surgery</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#sp_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#sp_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane" id="sp_add">
					<div class="container">
						<h4>Add a new Procedure / Surgery</h4>
						<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'addSurgeryOrProcedure']]); -->

							<div class="row">
								<!-- Left column -->
								<div class="col-md-6">
									<div class="form-group" id="procedure_name_div">
										<div class="row">
											<label class="control-label col-md-12">Procedure 
												<span class="required"> * </span>
												<a href="javascript:void(0)" onclick="generateModifierInputs()"> <b>Add Modifier</b> <i class="fa fa-plus"></i></a>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
												<input type="text" name="name" id="name" data-required="1" placeholder="Procedure name" class="form-control input-height" required /> 
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Age Specification
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="age_spec_id" id="age_spec_id" required>
												<option value="">Select...</option>
												<!-- php: foreach($ageSpecifications as $selectOption) { -->
													<option value="<!-- php: = $selectOption->id -->" data-age-name="<!-- php: = $selectOption->age -->"><!-- php: = $selectOption->age --></option>
												<!-- php: } -->
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Pricing
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="pricing" id="pricing" data-size="5" data-live-search="true" required>
												<option value="">Select...</option>		
												<option value="1">Per Hour</option>		
												<option value="2">Per Session</option>		
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Copay
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="copay" id="copay" data-size="5" data-live-search="true" required>
												<option value="">Select...</option>		
												<option value="1">Enable</option>		
												<option value="2">Disable</option>		
											</SearchableSelectField>
											</div>
										</div>
									</div>
								</div>

								<!-- Right column -->
								<div class="col-md-6">
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Specialty
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="specialty_id" id="select_specialty_id" data-size="5" data-live-search="true" onchange="doNothing('select_specialty_id', 'nhis_procedure_selector', editable_value='')" required>
												<option value="">Select...</option>
												<!-- php: foreach($specialties as $selectOption) { -->
													<option value="<!-- php: = $selectOption->id -->" data-code="<!-- php: = $selectOption->code -->" data-age-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
												<!-- php: } -->
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Gender Specification
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="gender_spec_id" id="gender_spec_id" required>
												<option value="">Select...</option>
												<!-- php: foreach($genderSpecifications as $selectOption) { -->
													<option value="<!-- php: = $selectOption->id -->" data-gender-name="<!-- php: = $selectOption->gender -->"><!-- php: = $selectOption->gender --></option>
												<!-- php: } -->
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Price  (<!-- php: = $configs['currency'] -->)
												<span class="required">  </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
												<input type="text" value="0" name="price" id="price" data-required="1" placeholder="Price" class="form-control input-height"/> 
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">NHIS GDRG
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height nhis_procedure_populate" name="nhis_procedure" id="nhis_procedure_selector" data-size="5" data-live-search="true" required>							
											</SearchableSelectField>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="row justify-content-center">
								<div class="col-md-6">
									<div class="text-center">
										<button type="submit" class="btn btn-info">Submit</button>
										<button type="button" class="btn btn-default" onclick="clearServiceFields()">Reset</button>
									</div>
								</div>
							</div>
						<!-- php: =$this->Form->end(); -->
					</div>
				</div>
				<div class="tab-pane active" id="sp_view">
					<div class="card  card-box">
						<div class="card-body ">
						<div class="col-md-4">
							<span class="label label-md label-<!-- php: = $theme2 -->"><strong><!-- php: = $this->Paginator->counter(__('Total Records: {{count}}')) --></strong></span> - <span><!-- php: = $this->Paginator->counter(__('Page {{page}} of {{pages}}')) --></span>
						</div>
						<!-- php: = $this->Form->create(null, ['type' => 'get']); -->
							<div class="input-group" style="max-width: 250px; float: right;">
								<input type="text" class="form-control" name="searchValue" type="text" id="paymentSearchBox" placeholder="Search" value="" />
								<span class="input-group-btn">
									<button type="submit" class="btn btn-info btn-flat">Go!</button>
								</span>
							</div>

						<!-- php: = $this->Form->end() -->
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width">
								<thead>
									<tr>
										<th class="left">Name</th>
                                        <th class="left">Specialty</th>
										<th class="left">GDRG</th>
										<th class="left">Price (<!-- php: = $configs['currency'] -->)</th>
                                        <th class="left">Copay</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($procedure_stocks as $value): -->
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$value->name --></td>
										<td class="left"><!-- php: = $value->specialty ? $value->specialty->name : '' --></td>
										<td class="left"><!-- php: =$value->nhis_procedure ? $value->nhis_procedure->gdrg : '' --></td>
										<td class="left"><!-- php: = isset($value->price) ? $value->price : 0 --></td>
										<td class="left"><!-- php: =$value->copay == 1 ? '<span class="badge badge-primary">Co Pay</span>' : null --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editprocedure_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageServices','action'=>'deleteProcedureOrSurgery', $value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('... -->
											<!-- php: if(!empty($value->procedure_stock_modifiers)){ -->
												<a data-toggle="modal" data-target="#viewmodifiers_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
													Modifiers
												</a>
											<!-- php: } -->
										</td>
									</tr>		
								<!-- php: $x++; endforeach; -->									
								</tbody>
							</table>
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
</div>
<!-- php: foreach($procedure_stocks as $value) { -->
    <div class="modal fade" id="editprocedure_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">Edit <!-- php: = $value->name --></h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" id="modifierModalBody_<!-- php: = $value->id -->">
					<div class="container">
						<h4>Edit Procedure / Surgery</h4>
						<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'editSurgeryOrProcedure']]); -->

							<div class="row">
								<!-- Left column -->
								<input type="text" name="id" id="id" data-required="1" value="<!-- php: = $value->id -->" class="form-control input-height" required readonly hidden/> 
								<div class="col-md-6">
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Procedure 
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
												<input type="text" name="name" id="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Procedure name" class="form-control input-height" required /> 
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Age Specification
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="age_specification_id" id="age_spec_id" required>
												<option value="">Select...</option>
												<!-- php: foreach($ageSpecifications as $selectOption) { -->
													<option <!-- php: = $value->age_specification_id == $selectOption->id ? "selected" : '' --> value="<!-- php: = $selectOption->id -->" data-age-name="<!-- php: = $selectOption->age -->"><!-- php: = $selectOption->age --></option>
												<!-- php: } -->
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Pricing
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="copay" id="copay" data-size="5" data-live-search="true">
												<option value="">Select...</option>		
												<option <!-- php: = $value->pricing == 1 ? "selected" : '' --> value="1">Per Hour</option>		
												<option <!-- php: = $value->pricing == 2 ? "selected" : '' --> value="2">Per Session</option>		
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Copay
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="copay" id="copay" data-size="5" data-live-search="true" required>
												<option value="">Select...</option>		
												<option <!-- php: = $value->copay == 1 ? "selected" : '' --> value="1">Enable</option>		
												<option <!-- php: = $value->copay == 2 ? "selected" : '' --> value="2">Disable</option>		
											</SearchableSelectField>
											</div>
										</div>
									</div>
								</div>

								<!-- Right column -->
								<div class="col-md-6">
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Specialty
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="specialty_id" id="edit_select_specialty_id" data-size="5" data-live-search="true" onchange="doNothing('edit_select_specialty_id', 'edit_nhis_procedure_selector', <!-- php: =$value->nhis_procedure_id -->)" required>
												<option value="">Select...</option>
												<!-- php: foreach($specialties as $selectOption) { -->
													<option <!-- php: = $value->specialty_id == $selectOption->id ? "selected" : '' --> value="<!-- php: = $selectOption->id -->" data-code="<!-- php: = $selectOption->code -->" data-age-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
												<!-- php: } -->
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Gender Specification
												<span class="required"> * </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height selectpicker" name="gender_specification_id" id="gender_spec_id" required>
												<option value="">Select...</option>
												<!-- php: foreach($genderSpecifications as $selectOption) { -->
													<option <!-- php: = $value->gender_specification_id == $selectOption->id ? "selected" : '' --> value="<!-- php: = $selectOption->id -->" data-gender-name="<!-- php: = $selectOption->gender -->"><!-- php: = $selectOption->gender --></option>
												<!-- php: } -->
											</SearchableSelectField>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">Price (<!-- php: = $configs['currency'] -->)
												<span class="required">  </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
												<input type="text" name="price" id="price" value="<!-- php: = $value->price ? $value->price : 0 -->" data-required="1" placeholder="Price" class="form-control input-height"/> 
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<label class="control-label col-md-12">NHIS GDRG
												<span class="required">  </span>
											</label>
										</div>
										<div class="row">
											<div class="col-md-12">
											<SearchableSelectField class="form-control input-height nhis_procedure_populate" name="nhis_procedure" id="edit_nhis_procedure_selector" data-size="5" data-live-search="true">							
											</SearchableSelectField>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="row justify-content-center">
								<div class="col-md-6">
									<div class="text-center">
										<button type="submit" class="btn btn-info">Submit</button>
										<button type="button" class="btn btn-default" onclick="clearServiceFields()">Reset</button>
									</div>
								</div>
							</div>
						<!-- php: =$this->Form->end(); -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="viewmodifiers_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">Modifiers for <!-- php: = $value->name --></h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" id="modifierModalBody_<!-- php: = $value->id -->">
					<!-- php: foreach($value->procedure_stock_modifiers as $modifier) { if ($modifier->procedure_stock_id == $value->id) { -->
							<div>
								<b> Modifier Name: </b><span class="badge badge-primary"><!-- php: = $modifier->name --></span>
								<b> Modifier Price: </b><span class="badge badge-success"><!-- php: = $configs['currency'] --> <!-- php: = $modifier->price --></span>
							</div>
						<!-- php: } } -->
				</div>
			</div>
		</div>
	</div>
<!-- php: } -->




<!-- <!-- php: // foreach($consultations as $value){ -->
	<div class="modal fade" id="editConsultation_<!-- php: // $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="modal-title" id="editServiceDialogueTitle">Edit Consultation: <!-- php: // $value->name --></h4>
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
							<!-- php: // $this->Form->create($value, ['url' => ['controller' => 'ManageServices', 'action' => 'editConsultation', $value->id], 'class' => 'form-horizontal']) -->
								<div class="form-body">
									<div class="form-group row">
										<label class="control-label col-md-5">Name
											<span class="required"> * </span>
										</label>
										<div class="col-md-7">
											<input type="text" name="name" id="consultation_name_edit" data-required="1" value="<!-- php: // $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
										</div>
									</div>
									
									<div class="form-group row">
										<label class="control-label col-md-5">Type
											<span class="required"> * </span>
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="consultation_type_id" id="consultation_type_id" data-live-search="true" required>
												<!-- php: // foreach($consultation_types as $type): -->	
													<option <!-- php: // if($type->id == $value->consultation_type->id) echo 'selected' --> data-name="<!-- php: // $type->name -->" data-content="<span class='badge badge-<!-- php: // $type->color_code -->'><!-- php: // $type->name --></span>" value="<!-- php: // $type->id -->"></option>
												<!-- php: // endforeach; -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-5">Specialty
											<span class="required"> * </span>
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="specialty_id" id="specialty_select_id_edit" data-live-search="true" required>
												<!-- php: // foreach($specialties as $specialty): -->	
													<option <!-- php: // if($specialty->id == $value->specialty->id) echo 'selected' --> data-name="<!-- php: // $specialty->name -->" data-content="<span class='badge badge-primary'><!-- php: // $specialty->name --></span>" value="<!-- php: // $specialty->id -->"></option>
												<!-- php: // endforeach; -->
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-5">Price
											<span class="required"> * </span>
										</label>
										<div class="col-md-7">
											<input type="text" name="price" data-required="1" value="<!-- php: // $value->price -->" placeholder="Enter name" class="form-control input-height" required /> 
										</div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-5">Pricing Unit
											<span class="required"> * </span>
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="pricing_unit" id="pricing_unit" data-live-search="true" required>
												<option value="">Select...</option>		
												<option <!-- php: // if($value->pricing_unit == 1) echo 'selected' --> value="1">Per Visit</option>		
												<option <!-- php: // if($value->pricing_unit == 2) echo 'selected' --> value="2">Per Session</option>
											</SearchableSelectField>
										</div>
									</div>

									<div class="form-group row">
										<label for="" class="control-label col-md-5">NHIS GDRG
											<span class="required"></span>
										</label>
										<div class="col-md-7">
											<SearchableSelectField class="form-control selectpicker input-height show-menu-arrow show-tick" name="nhis_consultation_id" data-size="5" title="Select GDRG"  data-live-search="true">
											<!-- php: // foreach($nhis_consultations as $val) { -->
												<option <!-- php: // $value->nhis_consultation_id == $val->id ? "selected" : "" --> value="<!-- php: // $val->id -->"><!-- php: // h($val->name) --><!-- php: // h($val->gdrg) --></option>		
											<!-- php: // } -->					
											</SearchableSelectField>
										</div>
									</div>
									
								</div>
								<div class="form-actions">
									<div class="row">
										<div class="offset-md-5 col-md-7">
											<button type="submit" class="btn btn-info">Submit</button>
											<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
										</div>
									</div>
								</div>
							<!-- php: // $this->Form->end() -->
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>
<!-- php: // } --> -->
<script>
	//global variables declaration
	var specialty, subtype, editspecialty, editsubtype

	function clearServiceFields(){
		$('#name').val('');
		$('#description').val('');
	}

	$("#specialty_select_id").change(function(){
		specialty = $(this).children('option:selected').data('name');
		generateConsultationName(specialty, subtype);
	});

	$("#consultation_sub_type_id").change(function(){
		//displaying sub type add modal
		if($(this).children('option:selected').val() == 0){
			$("#addSubTypeModal").modal('show');
		}else{
			//getting name of selected subtype
			subtype = $(this).children('option:selected').data('name');
			generateConsultationName(specialty, subtype);
		}
	});

	$("#specialty_select_id_edit").change(function(){
		specialty = $(this).children('option:selected').data('name');
		generateConsultationNameEdit(specialty, subtype);
	});

	$("#consultation_sub_type_id_edit").change(function(){
		subtype = $(this).children('option:selected').data('name');
		generateConsultationNameEdit(specialty, subtype);
	});

	//pricing unit and session length handling
	$("#pricing_unit").change(function(){
		if($(this).children('option:selected').val() == 2){
			$("#session_length_div").removeAttr('hidden');
		}else{
			$("#session_length_div").attr('hidden', 'hidden');
			$("#session_length").removeAttr('required');
		}
	});

	function generateConsultationName(specialty, subtype)
	{
		if(specialty && subtype){
			$("#consultation_name").val(specialty + " " + subtype);
		}
	}

	function generateConsultationNameEdit(editspecialty, editsubtype)
	{
		$("#consultation_name_edit").val(" ")
		if(editspecialty && editsubtype){
			$("#consultation_name_edit").val(editspecialty + " " + editsubtype);
		}
	}

	//populating subtype select options
	function populateConsultationSubTypes()
	{
		$.ajax({
            type: 'GET',
            url: "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getConsultationSubTypes' ] ); -->",
            cache: false,
            dataType: 'HTML',
            beforeSend: function(){
            },
            success: function (response){
				$('#consultation_sub_type_id').empty()
				$('#consultation_sub_type_id').append($('<option data-content="<span class=badge badge-success>Add new subtype</span>"></option>').val(0)); 
				var mdcs = JSON.parse(response);
				var subtypes = mdcs.consultation_sub_types
				var visit_purposes = mdcs.patent_visit_purposes
				$.each(visit_purposes, function(key, value) {
					$('#consultation_sub_type_id').append($('<option data-name="'+visit_purposes[key].name+'"></option>').val(visit_purposes[key].id).html(visit_purposes[key].name)); 
					$("#consultation_sub_type_id").selectpicker("refresh");
				});	
            }
        });
	}

	//submitting sub type form
	function submitSubTypeForm()
	{
		var name = $("#sub_type_name").val();
		$.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'addConsultationSubType' ] ); -->",
			data: {name:name},
			cache: false,
			dataType: 'HTML',
			beforeSend: function(xhr){
			},
			success: function (response){
				var res = JSON.parse(response);
				if(res == 1){
					alertify.success('Sub type added successfully');
					$("#addSubTypeModal").modal('hide');
					$('#consultation_sub_type_id').empty()
					populateConsultationSubTypes()
				}else{
					alertify.error('Something went wrong, please try again');
				}
			}
		});
	}

	//running sub type function on document ready
	$( document ).ready(function() {
		populateConsultationSubTypes()
	});

	//add subtype modal on close event
	$('#addSubTypeModal').on('hidden.bs.modal', function () {
		populateConsultationSubTypes()
	})
</script>
<script>
    var modifierCounter = 1;

    function generateModifierInputs() 
	{
        var newRow = $('<div class="row"></div>');
        var modifierNameInput = $('<div class="col-md-5 mb-2"><input type="text" data-required="1" class="form-control input-height" name="modifier_name[]" placeholder="Modifier Name" required></div>');
        var modifierValueInput = $('<div class="col-md-5 mb-2"><input type="text" data-required="1" class="form-control input-height" name="modifier_price[]" placeholder="Modifier Price" required></div>');
        var removeButton = $('<div><a href="javascript:void(0)" onclick="removeModifierRow(this)"> <b>Remove</b> <i class="fa fa-minus"></i></a></div>');
        
        newRow.append(modifierNameInput).append(modifierValueInput).append(removeButton);
        $('#procedure_name_div').after(newRow);
        modifierCounter++;
    }

    function removeModifierRow(button) 
	{
        $(button).closest('.row').remove();
    }

	function doNothing(params) {
		console.log("Do nothing")
	}
	// function getNhisGdrgsProceudre(specialty_ele_id, nhis_gdrd_select_id, editable_value) 
	// {
	// 	var selectedOption = $('#' + specialty_ele_id).find(':selected');
	// 	var dataCode = selectedOption.data('code');
	// 	alert(dataCode)
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getNhisProcedures' ] ); -->",
	// 		data: {
	// 			code: dataCode,
	// 		},
	// 		cache: false,
	// 		dataType: 'HTML',
	// 		success: function (response) {
	// 			var nhis_procedures = JSON.parse(response);
	// 			$('#' + nhis_gdrd_select_id).empty();
	// 			if (nhis_procedures.length > 0) {
	// 				$.each(nhis_procedures, function (key, value) {
	// 					var optionText = value.name + ' <span class="badge badge-info">' + value.gdrg + '</span>';
	// 					let extra = \`<span class="badge badge-danger">\${value.exclusive_tariff}</span>\`
	// 					// var option = $(\`<option data-content="\${optionText} \${extra}" data-service-type-name="\` + value.name + '"></option>').val(value.id).html(optionText);
	// 					var option = $('<option data-service-type-name="' + value.name + '"></option>').val(value.id).html(optionText);

						
	// 					// Check if editable_value is not empty and matches value.id
	// 					if (editable_value !== "" && editable_value == value.id) {
	// 						option.attr("selected", "selected");
	// 					}

	// 					$('#' + nhis_gdrd_select_id).append(option);
	// 				});
	// 				$("#" + nhis_gdrd_select_id).selectpicker("refresh");
	// 			}
	// 		}
    // 	});
	// }
	function getNhisGdrgsProceudre() 
	{

		$.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getNhisProcedures' ] ); -->",
			cache: false,

			success: function (response) {
				var nhis_procedures = JSON.parse(response);
				$('.nhis_procedure_populate').empty();
				if (nhis_procedures.length > 0) {
					let result = ""
					nhis_procedures.forEach(value => {
						result += \`<option data-service-type-name="\${value.name}" value="\${value.id}">\${value.name}</option>\`
					});

					$('.nhis_procedure_populate').html(result);
					$(".nhis_procedure_populate").selectpicker("refresh");
				}
			}
    	});
	}

	$(document).ready(function () {
		getNhisGdrgsProceudre()
	}) 

</script>






`;

export default function ElementElementManageservicesSurgeryProcedure() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
