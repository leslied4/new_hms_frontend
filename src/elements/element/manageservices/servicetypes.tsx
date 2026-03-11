const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Service Types</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#servicetype_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#servicetype_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="servicetype_add">
					<h4>Add a new service type</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'addServiceTypes']]); -->

                        <div class="form-group row">
                            <label class="control-label col-md-4">Service Type Category
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-5">
                                <SearchableSelectField class="form-control input-height" name="service_id" id="service_category_id" required>
                                    <option value="">Select...</option>
                                    
                                    <!-- php: foreach($services as $selectOption) { -->
                                        <option value="<!-- php: = $selectOption->id -->" data-service-name="<!-- php: = $selectOption->name -->"><!-- php: = $selectOption->name --></option>
                                    <!-- php: } -->
                                    
                                </SearchableSelectField>
                            </div>
                        </div>
					
						<div class="form-group row">
							<label class="control-label col-md-4">Service Type Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name"  placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>

                        <!-- <div class="form-group row">
                         <div class="form-group row">
							<label class="control-label col-md-4">Does service Type have Modifiers?
								<span class="required">  </span>
							</label>
							<div class="col-md-5">
                                <SearchableSelectField class="form-control input-height" name="modifiers_question" id="modifiers_question" required>
                                    <option value="">Select...</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </SearchableSelectField> 
							</div>
						</div> -->


                        <div class="form-group row" id="service_type_price_div">
						</div>

                        <div class="form-group row" hidden id="service_type_price_div">
							<label class="control-label col-md-4">Service Type Price
                                <span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" name="price" id="price" placeholder="Enter price" class="form-control input-height"/> 
							</div>
						</div>

                        <div class="form-group row" id="modifier_div" hidden>
							<label class="control-label col-md-4">Modifeir names and Prices
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-6" id="modifier_name_div">
                                        <input type="text" name="modifier_name[]" id="modifier_name"  placeholder="Enter modifier name" class="form-control input-height"/><br>
                                    </div>
                                    <div class="col-md-3" id="modifier_price_div">
                                        <input type="number" name="modifier_price[]" id="modifier_price"  placeholder="Enter price" class="form-control input-height"/><br>
                                    </div>
                                    <div class="col-md-3" id="modifier_code_div">
                                        <input type="text" name="modifier_code[]" id="modifier_code"  placeholder="Enter code" class="form-control input-height"/><span><a href="javascript:void(0);" class="add" id="add_more_button">Add More</a></span><br>
                                    </div>
                                </div>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Does service Type have Modifiers?
								<span class="required">  </span>
							</label>
							<div class="col-md-5">
								<label class="switchToggle">
									<input id="price_modifer_check" type="checkbox" onclick="">
									<span class="slider green round"></span>
								</label>
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
				<div class="tab-pane active" id="servicetype_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Service Name</th>
										<th class="left">Service Category</th>
										<th class="left">Price</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($serviceTypes as $value): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->name --></td>
										<td class="left"><!-- php: = $value->service->name --></td>
										<td class="left"><!-- php: = $value->price ? $value->price: '0.00' --></td>
										<td class="left">
											<a data-toggle="modal" data-backdrop="static" data-target="#editServiceTypeDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageServices','action'=>'deleteServiceType',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.... -->

											<!-- php: if($value->service_type_modifiers != null) { -->
												<a data-toggle="modal" data-backdrop="static" data-target="#viewModifiersDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-info btn-xs">
												Modifiers
												</a>
											<!-- php: } -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editServiceTypeDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title">Edit Service Type: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageServices', 'action' => 'editServiceType', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	
																	<div class="form-group row">
																		<label class="control-label col-md-3">Service Type Category
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-9">
																			<SearchableSelectField class="form-control input-height" name="service_id" id="edit_service_category_id" required>
																				<!-- php: foreach($services as $selectOption) { -->
																					<option <!-- php: = $value->service->id == $selectOption->id ? 'selected="selected"' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																				<!-- php: } -->
																			</SearchableSelectField>
																		</div>
																	</div>
	
																	<div class="form-group row">
																		<label class="control-label col-md-3">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-9">
																			<input type="text" name="name" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>
																	<!-- php: if($value->price == null) { -->
																		<!-- php: $x = 1; foreach ($value->service_type_modifiers as $modifier): -->
																		<div class="form-group row">
																			<label class="control-label col-md-3">Name/Price
																			</label>
																			<div class="col-md-9">
																				<div class="row">
																					<div class="col-md-6">
																						<input type="text" name="modifier_name[]" value="<!-- php: = $modifier->name -->" placeholder="Enter name" class="form-control input-height" required />
																						<input hidden type="text" name="modifier_id[]" value="<!-- php: = $modifier->id -->" placeholder="Enter name" class="form-control input-height" required /> 																																												
																					</div>
																					<div class="col-md-3">
																						<input type="text" name="modifier_price[]" value="<!-- php: = $modifier->price -->" placeholder="Enter name" class="form-control input-height" required /> 
																					</div>
																					<div class="col-md-3">
																						<input type="text" name="modifier_code[]" value="<!-- php: = $modifier->code -->" placeholder="Enter name" class="form-control input-height" required /> 
																					</div>
																				</div>
																			</div>
																		</div>
																		<!-- php: $x++; endforeach; -->
																	<!-- php: }else{ -->	
																		<div class="form-group row">
																			<label class="control-label col-md-3">Price
																			</label>
																			<div class="col-md-9">
																				<input type="number" name="price" value="<!-- php: = $value->price -->" placeholder="Enter price" class="form-control input-height" required/> 
																			</div>
																		</div>
																	<!-- php: } -->
																
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

									<div class="modal fade" id="viewModifiersDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title">Modifiers for <!-- php: = $value->name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Modifier names and Prices</header>
														</div>
														<div class="card-body" id="bar-parent">
																<div class="form-body">
																	<!-- php: $x = 1; foreach ($value->service_type_modifiers as $modifier): -->
																	<div class="form-group row">
																		<label class="control-label col-md-3">Name/Price
																		</label>
																		<div class="col-md-9">
																			<div class="row">
																				<div class="col-md-6 ml-20">
																					<!-- <input id="view_modifier_name" type="text" name="name" value="</?= $modifier->name ?>" placeholder="Enter name" class="form-control input-height" required />  -->
																					<label class="control-label"><!-- php: = $modifier->name --></label> <span class="badge badge-danger label-danger" id="#danger"><!-- php: = $modifier->code --></span>
																					
																				</div>
																				<div class="col-md-4">
																					<!-- <input type="text" name="name" value="</?= $modifier->price ?>" placeholder="Enter name" class="form-control input-height" required />  -->
																					<label class="control-label"><!-- php: = $modifier->price --></label>
																				</div>
																			</div>
																		</div>
																	</div>
																	<!-- php: $x++; endforeach; -->		
		
																</div>
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
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
	function clearAddRoomFields(){
        $("#name").val(" ");
        $("#price").val(" ");	
	}
</script>
<script>
    // $("#modifiers_question").change(function(){
    //     if($(this).val() == 1){
    //         $("#modifier_div").removeAttr("hidden");
    //         $("#service_type_price_div").attr("hidden", "hidden");
    //     }else{
    //         $("#service_type_price_div").removeAttr("hidden");
    //         $("#modifier_div").attr("hidden", "hidden");
    //     }
	// });
	$('input[type="checkbox"]').click(function() {
		if ($(this).is(':checked')) {
			$("#modifier_div").removeAttr("hidden");
            $("#service_type_price_div").attr("hidden", "hidden");
		} else {
			$("#service_type_price_div").removeAttr("hidden");
    		$("#modifier_div").attr("hidden", "hidden");
		}
	})
    $("#modifiers_question").change(function(){
        if($(this).val() == 1){
            $("#modifier_div").removeAttr("hidden");
            $("#service_type_price_div").attr("hidden", "hidden");
        }else{
            $("#service_type_price_div").removeAttr("hidden");
            $("#modifier_div").attr("hidden", "hidden");
        }
	});

    $(document).ready(function() {
        var counter = 0;
        $('#add_more_button').on('click', function() {
            counter ++
            $('<div id="name_'+ counter +'"><input type="text" name="modifier_name[]" id="modifier_name"  placeholder="Enter modifier name" class="form-control input-height" required/><br></div>').appendTo("#modifier_name_div");
            $('<div id="price_'+ counter +'"><input type="number" name="modifier_price[]" id="modifier_price"  placeholder="Enter price" class="form-control input-height" required/><br></div>').appendTo("#modifier_price_div");
            $('<div id="code_'+ counter +'"><input type="text" name="modifier_code[]" id="modifier_code"  placeholder="Enter code" class="form-control input-height" required/><span class="rem"><a href="javascript:void(0);" onclick="removeExtraFields('+ counter +')" id="remove_more_button">Remove</a></span><br></div>').appendTo("#modifier_code_div")
        });
    });

    function removeExtraFields(counter){
        $('#name_' + counter).remove();
        $('#price_' + counter).remove();
        $('#code_' + counter).remove();
    }
</script>

`;

export default function ElementElementManageservicesServicetypes() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
