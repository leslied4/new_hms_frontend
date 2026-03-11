const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Consultation</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#consulation_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#consultation_manage_subtypes" data-toggle="tab"> Manage Subtypes </a>
				</li>
				<li class="nav-item">
					<a href="#consultation_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="consulation_add">
					<h4>Add a new Consulation</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'addConsulation']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="consultation_name" data-required="1" placeholder="Auto generated name" class="form-control input-height" required readonly/> 
							</div>
						</div>

                        <div class="form-group row">
                            <label class="control-label col-md-4">Type
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="consultation_type_id" id="consultation_type_id" data-live-search="true" required>
                                    <!-- php: foreach($consultation_types as $type): -->	
                                        <option data-name="<!-- php: = $type->name -->" data-content="<span class='badge badge-<!-- php: = $type->color_code -->'><!-- php: = $type->name --></span>" value="<!-- php: = $type->id -->"></option>
                                    <!-- php: endforeach; -->
                                </SearchableSelectField>
                            </div>
                        </div>

						<div class="form-group row">
                            <label class="control-label col-md-4">Sub Type
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="patient_visit_purpose_id" id="consultation_sub_type_id" data-live-search="true" required>
                                </SearchableSelectField>
                            </div>
                        </div>

						<div class="form-group row">
                            <label class="control-label col-md-4">Specialty
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="specialty_id" id="specialty_select_id" data-live-search="true" onchange="getNhisGdrgs()" required>
                                    <!-- php: foreach($specialties as $value): -->	
                                        <option data-name="<!-- php: = $value->name -->" data-code="<!-- php: = $value->code -->" data-content="<span class='badge badge-primary'><!-- php: = $value->name --></span> <span class='badge badge-warning'><!-- php: = isset($value->department) ? $value->department->name : '' --></span>" value="<!-- php: = $value->id -->"></option>
                                    <!-- php: endforeach; -->
                                </SearchableSelectField>
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
                            <label class="control-label col-md-4">Pricing Unit
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                                <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="pricing_unit" id="add_pricing_unit" data-live-search="true" required>
									<option value="">Select...</option>		
                                    <option value="1">Per Visit</option>		
                                    <option value="2">Per Session</option>
                                </SearchableSelectField>
                            </div>
                        </div>

						<div class="form-group row" hidden id="session_length_div">
							<label class="control-label col-md-4">Session Length(In minutes)
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" name="session_length" id="session_length" data-required="1" placeholder="Enter session length" class="form-control input-height"> 
							</div>
						</div>

                
                        <div class="form-group row">
                            <label class="control-label col-md-4">Copay
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                                <SearchableSelectField class="form-control input-height selectpicker" name="copay" id="copay" data-size="5" data-live-search="true" required>
                                    <option value="">Select...</option>		
                                    <option value="1">Enable</option>		
                                    <option value="2">Disable</option>		
                                </SearchableSelectField>
                            </div>
                        </div>

						<div class="form-group row">
							<label for="" class="control-label col-md-4">NHIS GDRG
								<span class="required"></span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField id="nhis_consultation_selector" class="form-control selectpicker input-height show-menu-arrow show-tick" data-size="5" title="Select GDRG"  data-live-search="true" onchange="$('#nhis_consultation_id').val(this.value)">
								<!-- </?php 
								foreach($nhis_consultations as $val)
								{?>
									<option value="</?= $val->id ?>"></?= h($val->name) ?></?= h($val->gdrg) ?></option>
													
								</?php } ?>   -->
												
								</SearchableSelectField>
								<!-- hidden field to receive selectpicker value -->
								<input name="nhis_consultation_id" id="nhis_consultation_id" type="text" value="" hidden/>
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearServiceFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->

					<div class="modal fade" id="addSubTypeModal" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
							<h4 class="modal-title" id="addSubTypeModalTitle">Add Sub Type</h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							</div>
							<div class="modal-body">

							<div class="row">
								<div class="col-md-12 col-sm-12">
									<div class="card card-box">
										<div class="card-head">
											<header>Enter Sub Type Details</header>
										</div>
										<div class="card-body" id="bar-parent">
											<form id="sub_type_form">
												<div class="form-body">
													<div class="form-group row">
														<label class="control-label col-md-5">Name
															<span class="required"> * </span>
														</label>
														<div class="col-md-7">
															<input type="text" name="name" id="sub_type_name" data-required="1" value="" placeholder="Enter sub type name" class="form-control input-height" required /> 
														</div>
													</div>													
												</div>
												<div class="form-actions">
													<div class="row">
														<div class="offset-md-3 col-md-9">
															<button type="button" class="btn btn-info" onclick="submitSubTypeForm()">Submit</button>
															<button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
							</div>
						</div>
						</div>
					</div>
				</div>
				<div class="tab-pane active" id="consultation_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Price</th>
                                        <th class="left">Copay</th>
                                        <th class="left">Type</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($consultations as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$value->name --></td>
                                        <td class="left"><!-- php: =$value->price --></td>
										<td class="left"><!-- php: =$value->copay ? '<span class="badge badge-primary">Co Pay</span>' : null --></td>
										<td class="left"><!-- php: =$value->consultation_type->name --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#bestyModal_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>			
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageServices','action'=>'deleteConsultation', $value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classe... -->
										</td>
									</tr>		
								<!-- php: $x++; endforeach; -->						
								</tbody>
							</table>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane" id="consultation_manage_subtypes">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($visit_purposes as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$value->name --></td>
                                        <td class="left"><!-- php: =$value->description --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editVisitPurpose_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>			
										</td>
									</tr>		
								<!-- php: endforeach; -->						
								</tbody>
							</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- php: foreach($consultations as $value){ -->
		<div class="modal fade" id="bestyModal_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="bestyModalTitle">Edit Consultation: <!-- php: = $value->name --></h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'editConsultation', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">
												<div class="form-group row">
													<label class="control-label col-md-5">Name
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														<input type="text" name="name" id="consultation_name_edit" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Type
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="consultation_type_id" id="consultation_type_id" data-live-search="true" required>
															<!-- php: foreach($consultation_types as $type): -->	
																<option <!-- php: if($type->id == $value->consultation_type->id) echo 'selected' --> data-name="<!-- php: = $type->name -->" data-content="<span class='badge badge-<!-- php: = $type->color_code -->'><!-- php: = $type->name --></span>" value="<!-- php: = $type->id -->"></option>
															<!-- php: endforeach; -->
														</SearchableSelectField>
													</div>
												</div>

												<div class="form-group row">
													<label class="control-label col-md-5">Specialty
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="specialty_id" id="specialty_select_id_edit" data-live-search="true" required>
															<!-- php: foreach($specialties as $specialty): -->	
																<option <!-- php: if($specialty->id == $value->specialty->id) echo 'selected' --> data-name="<!-- php: = $specialty->name -->" data-content="<span class='badge badge-primary'><!-- php: = $specialty->name --></span>" value="<!-- php: = $specialty->id -->"></option>
															<!-- php: endforeach; -->
														</SearchableSelectField>
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

												<div class="form-group row">
													<label class="control-label col-md-5">Pricing Unit
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="10" title="Select Type" name="pricing_unit" id="edit_pricing_unit" data-live-search="true" required>
															<option value="">Select...</option>		
															<option <!-- php: if($value->pricing_unit == 1) echo 'selected' --> value="1">Per Visit</option>		
															<option <!-- php: if($value->pricing_unit == 2) echo 'selected' --> value="2">Per Session</option>
														</SearchableSelectField>
													</div>
												</div>

												<div class="form-group row">
													<label for="" class="control-label col-md-5">NHIS GDRG
														<span class="required"></span>
													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control selectpicker input-height show-menu-arrow show-tick" name="nhis_consultation_id" data-size="5" title="Select GDRG"  data-live-search="true">
															<!-- TODO: Facility Decides through settings whether inclusive or exclusive -->
														<!-- php: foreach($nhis_consultations as $bes) { -->
															<option data-content="<!-- php: = h($bes->name) --><!-- php: = h($bes->gdrg) --> <span class='badge badge-danger'><!-- php: = $bes->exclusive_tariff --></span>" <!-- php: if($value->nhis_consultation_id == $bes->id) echo "selected" --> value="<!-- php: = $bes->id -->"><!-- php: = h($bes->name) --><!-- php: = h($bes->gdrg) --></option>		
														<!-- php: } -->					
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
										<!-- php: = $this->Form->end() -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- php: } -->		
	</div>
</div>

<!-- php: foreach ($visit_purposes as $key => $value): if (!isset($value->institution_id)) { continue; } -->
	<div class="modal fade" id="editVisitPurpose_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">Edit Visit Purpose for <!-- php: = $value->name --></h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'editSubTypes']]); -->
					<div class="modal-body" id="<!-- php: = $value->id -->">
						<input type="hidden" name="id" value="<!-- php: = $value->id -->">
						<div class="form-group">
							<div class="row">
								<label class="control-label col-md-12">Name 
									<span class="required"> * </span>
								</label>
							</div>
							<div class="row">
								<div class="col-md-12">
									<input type="text" name="name" id="subtype_name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Description" class="form-control input-height" required /> 
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<label class="control-label col-md-12">Description 
									<span class="required"> * </span>
								</label>
							</div>
							<div class="row">
								<div class="col-md-12">
									<input type="text" name="description" id="subtype_description" data-required="1" value="<!-- php: = $value->description -->" placeholder="Description" class="form-control input-height" required /> 
								</div>
							</div>
						</div>
					</div>
					<div class="row justify-content-center mb-5">
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
<!-- php: endforeach; -->

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
	$("#add_pricing_unit").change(function () {
		if ($(this).children('option:selected').val() == 2) {
			$("#session_length_div").removeAttr('hidden');
			$("#session_length").attr('required', 'required');
		} else {
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

	function getNhisGdrgs() 
	{
    	// var selectedOption = $('#specialty_select_id').find(':selected');
    	// var dataCode = selectedOption.data('code');

		$.ajax({
			type: 'GET',
			url: "<!-- php: echo $this->Url->build( [ 'controller' => 'ManageServices', 'action' => 'getNhisConsultations' ] ); -->",
			data: {
				code: 'dummy_code',
			},
			cache: false,
			dataType: 'HTML',
			success: function (response) {
				var nhis_consultations = JSON.parse(response);
				$('#nhis_consultation_selector').empty();
				if (nhis_consultations.length > 0) {
					$.each(nhis_consultations, function (key, value) {
						var optionText = value.name + ' <span class="badge badge-info">' + value.gdrg + '</span>';
						let extra = \`<span class="badge badge-danger">\${value.exclusive_tariff}</span>\`
						$('#nhis_consultation_selector').append($(\`<option data-content='\${optionText} \${extra}' data-service-type-name="\` + value.name + '"></option>').val(value.id).html(optionText));
					});
					$("#nhis_consultation_selector").selectpicker("refresh");
				}
			}
		});
	}
</script>
`;

export default function ElementElementManageservicesConsultation() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
