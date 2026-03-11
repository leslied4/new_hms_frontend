const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Specialties</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#consulting_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#consulting_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="consulting_add">
					<h4>Add Specialty/Clinic</h4>
					<!-- php: = $this->Form->create($addSpecialty, ['url' => ['controller' => 'Specialties', 'action' => 'addSpecialty'], 'id' => 'specialty_info']); -->
						<div class="form-body">
						<div class="form-group row">
								<label class="control-label col-md-2">Department

								</label>
								<div class="col-md-6">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="department_id" id="dept_id" title="Select Deparment" data-live-search="true"  required>
										
                                        <!-- php: foreach($departments as $department){ -->
											<option value="<!-- php: = $department->id -->" data-code="<!-- php: = substr($department->name , 0,4) -->" data-content="<!-- php: = $department->name --> <span class='badge badge-danger'><!-- php: = $department->code ? $department->code : substr($department->name , 0,4) --></span>"><!-- php: = $department->name --></option>
										<!-- php: } -->
									</SearchableSelectField>
								</div>
						</div>
						<div class="form-group row">
						    <label class="control-label col-md-2">Age Specification

						    </label>
						    <div class="col-md-6">
						        <SearchableSelectField data-actions-box="true" class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="age_id[]" id="age_id" title="Select Specification" data-live-search="true" multiple required>

                                     <!-- php: foreach($age_categories as $age_category){ -->
										<option value="<!-- php: = $age_category->id -->"><!-- php: = $age_category->name --></option>
										
									 <!-- php: } -->
									 <!-- <option value="0">None</option> -->
						        </SearchableSelectField>
						    </div>
						</div>
						<div class="form-group row">
						    <label class="control-label col-md-2">Gender Specification

						    </label>
						    <div class="col-md-6">
						        <SearchableSelectField data-actions-box="true" class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="gender_id[]" id="gender_id" title="Select Specification" data-live-search="true" multiple required>

                                     <!-- php: foreach($gender_categories as $gender_category){ -->
										<option value="<!-- php: = $gender_category->id -->"><!-- php: = $gender_category->name --></option>
										
									 <!-- php: } -->
									 <!-- <option value="0">None</option> -->
						        </SearchableSelectField>
						    </div>
						</div>
						<div class="form-group row" id="modifier_div">
							<label class="control-label col-md-2">MDC
								<span class="required"> * </span>
							</label>
							<div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-6" id="modifier_name_div">
                                        
                                    </div>
                                    <div class="col-md-3" id="modifier_price_div">
                                        
                                    </div>
                                    <div class="col-md-3 d-flex align-items-center" id="modifier_code_div">
                                        
                                    </div>
                                </div>
								<span><a href="javascript:void(0);" class="add" id="add_more_button">Add MDC</a></span><br>
							</div>
						</div>
								<div class="form-group row">
								<label class="control-label col-md-2">
                                    Investigation/Lab
								</label>
								<div class="col-md-6">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="investigation[]" id="investigation" title="Select Investigation/Lab"  data-live-search="true" multiple>
								<!-- php: foreach($orderServices as $orderlab) { echo '<option value="'.$orderlab->id.'">'.$orderlab->name.'</option>'; } -->				
											
							    </SearchableSelectField>
								</div>
						</div>
						<div class="form-group row">
								<label class="control-label col-md-2">
                                    Pharmacy
								</label>
								<div class="col-md-6">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="pharmacy[]" id="pharmacy" title="Select Pharmacy"  data-live-search="true" multiple>
								<!-- php: foreach($orderServices as $orderlab) { echo '<option value="'.$orderlab->id.'">'.$orderlab->name.'</option>'; } -->				
											
							    </SearchableSelectField>
								</div>
						</div>
						<div class="form-group row">
								<label class="control-label col-md-2">
                                    Operation Room(s)
								</label>
								<div class="col-md-6">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="operating[]" id="operating" title="Select Operation Room(s)"  data-live-search="true" multiple>
								<!-- php: foreach($orderServices as $orderlab) { echo '<option value="'.$orderlab->id.'">'.$orderlab->name.'</option>'; } -->				
											
							    </SearchableSelectField>
								</div>
						</div>
						<div class="form-group row">
								<label class="control-label col-md-2">
                                    Ward(s)
								</label>
								<div class="col-md-6">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="ward[]" id="ward" title="Select Ward(s)"  data-live-search="true" multiple>
								<!-- php: foreach($orderServices as $orderlab) { echo '<option value="'.$orderlab->id.'">'.$orderlab->name.'</option>'; } -->				
											
							    </SearchableSelectField>
								</div>
						</div>
						<div class="form-group row">
								<label class="control-label col-md-2">
                                    Consulting Room(s)
								</label>
								<div class="col-md-6">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" name="consulting[]" id="consulting" title="Select Consulting Room(s)"  data-live-search="true" multiple>
								<!-- php: foreach($orderServices as $orderlab) { echo '<option value="'.$orderlab->id.'">'.$orderlab->name.'</option>'; } -->				
											
							    </SearchableSelectField>
								</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-2">
								Color Code
							</label>
							<div class="col-md-6">
								<input type="color" name="color_code" id="colorpicker" value="#0000ff">
							</div>
						</div>
							<div class="form-actions">
							<div class="row">
								<div class="offset-md-3 col-md-9">
									<button type="submit" id ="submit" class="btn btn-info">Submit</button>
									<button type="button" onclick = 'clearFields()' class="btn btn-success">Reset</button>
								</div>
							</div>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
				</div>
				<div class="tab-pane active" id="consulting_view">
					<div class="card  card-box">
						<div class="card-body ">
						  	<div class="table-scrollable">
								
								<table class="table table-hover order-column full-width customDataTable">
									<thead>
										<tr>
											<th>Mdc</th>
											<th> Department </th>
                                            <th>Service Places</th>
											<th>Consulting Rooms</th>
											<th>Specification</th>
											<th> Action </th>
										</tr>
									</thead>
									<tbody>
									<!-- php: foreach($specialties as $specialty){ -->
										<tr>
								    <td><!-- php: = $specialty->name -->  <!-- php: = $specialty->has('code') ? '<span class="badge badge-danger">'.$specialty->code.'</span>': '<span class="badge badge-danger">'.substr($department->name, 0,4).'</span>' --></td>
                                    <td><!-- php: = $specialty->has('department') ? $specialty->department->name : '' --></td>
                                    <td>
                                     <ol>
                                         <li><strong>Investigation/Lab:</strong> 
										 <!-- php: if (!empty($specialty->specialties_investigations)): -->
											<!-- php: foreach ($specialty->specialties_investigations as $spVest): -->
												<!-- php: = $spVest->service_place->has('name') ? '<span>' . $spVest->service_place->name . '</span>,' : '' -->
											<!-- php: endforeach; -->
										 <!-- php: endif; -->
										</li>
                                         <li><strong>Pharmacy:</strong> 
										 <!-- php: if (!empty($specialty->specialties_pharmacies)): -->
										 	<!-- php: foreach($specialty->specialties_pharmacies as $spPharm): -->
											<!-- php: = $spPharm->service_place->has('name') ? '<span>'.$spPharm->service_place->name.'</span>,' : '' -->
											<!-- php: endforeach; -->
										 <!-- php: endif; -->
										</li>
                                         <li><strong>Operating Rooms:</strong>
										 <!-- php: if (!empty($specialty->specialties_operation_rooms)): -->
										 	<!-- php: foreach($specialty->specialties_operation_rooms as $spOR): -->
											<!-- php: = $spOR->service_place->has('name') ? '<span>'.$spOR->service_place->name.'</span>,' : '' -->
											<!-- php: endforeach; -->
										<!-- php: endif; -->
										</li>
                                         <li><strong>Wards:</strong> 
											<!-- php: if (!empty($specialty->specialties_wards)): -->
										 	<!-- php: foreach($specialty->specialties_wards as $spWards): -->
											<!-- php: = $spWards->service_place->has('name') ? '<span>'.$spWards->service_place->name.'</span>,' : '' -->
											<!-- php: endforeach; -->
											<!-- php: endif; -->
										</li>
                                    </ol>
                                </td>
								<td></td>
								<td>
								<!-- php: if (!empty($specialty->specialties_gender)): -->
									<!-- php: foreach($specialty->specialties_gender as $gender){ -->
										<span class="badge badge-primary"><!-- php: = $gender->gender->name --></span>
									<!-- php: } --><br/>
									<!-- php: foreach($specialty->specialties_age as $age){ -->
										<span class="badge badge-success"><!-- php: = $age->age_category->name --></span>
									<!-- php: } -->
								<!-- php: endif; -->
								</td>
								<td>
								 <button onclick="javascript:editSpecialty('<!-- php: = $specialty->id -->')" class="btn btn-warning">Edit</button><br/>
								 <!-- <button class="btn btn-danger">Delete</button> -->
								 <!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Specialties','action'=>'deleteSpecialty',$specialty->id], ['class' => 'btn btn-danger btn-sm']); -->
							</td>
									</tr>
							<!-- php: } -->
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

<div class="modal fade bd-example-modal-lg" id="specialty_edit_modal" tabindex="-1" role="dialog"
	aria-labelledby="select" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Edit Specialty </h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body specialty_edit_summary">


			</div>
		</div>
	</div>
</div>

<!-- end page content -->
<script>

		function editSpecialty(id) {
			$('.modal-body.specialty_edit_summary').load(
				"<!-- php: = $this->Url->build(['controller' => 'ManageSecurity', 'action' => 'editSpecialties',]) -->/"+id,
				function () {
					$('#specialty_edit_modal').modal({
						show: true
					});
				}
			);
		}

		$("#specialty_info").submit(function () {
			return confirm('Are you sure you want to submit the information?');
		});
	    var counter = 0;
		$(document).ready(function() {
			$('#dept_id').on('change', function(){
				$.ajax({
           type:"POST",
           data: {value:$(this).val()},
           url:'<!-- php: = $this->Url->build(['controller'=>'Specialties', 'action'=>'getSpecialtiesCount']); -->',
           success: function(val) {
            //    $('#id1').html(html);
            //    $('#id1').selectpicker("refresh");
			 console.log(parseInt(val));
			 counter = val;
           },
           error: function(){
               alert('false');
			   counter = 0
           }

       });
	         });
        
        $('#add_more_button').on('click', function() {
            counter ++
			var str = "" + counter;
            var pad = "000";
            var ans = pad.substring(0, pad.length - str.length) + str;
			var val = $('#dept_id').find(':selected').data("code");
            $('<div id="name_'+ counter +'"><input type="text" name="name[]" id="modifier_name"  placeholder="Name" class="form-control input-height" required/><br></div>').appendTo("#modifier_name_div");
            $('<div id="price_'+ counter +'"><input type="text" name="code[]" id="modifier_price" value="'+val.toUpperCase()+'/'+ans+'"  placeholder="Code" class="form-control input-height" required/><span class="rem"><a style="color:red" href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#modifier_price_div");
            // $('<div id="code_'+ counter +'"><br></div>').appendTo("#modifier_code_div")
        });
    });


    function removeExtraFields(counter){
        $('#name_' + counter).remove();
        $('#price_' + counter).remove();
        $('#code_' + counter).remove();
    }
	
	
</script>

`;

export default function ElementElementManagesecuritySpecialties() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
