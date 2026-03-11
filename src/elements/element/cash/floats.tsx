const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#floats_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#floats_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="floats_add">
					<h4>Add a new Item</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Cash', 'action' => 'addFloat']]); -->					
						<div class="form-group row">
							<label class="control-label col-md-2">Float Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter float name" class="form-control input-height" required /> 
							</div>
						</div>
						<div class="form-group row">
								<label class="control-label col-md-2">Department

								</label>
								<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" multiple data-size="5" name="departments[]" id="dept_id" title="Select Department" data-live-search="true"  required>
										
                                        <!-- php: foreach($departmentz as $department){ -->
											<option value="<!-- php: = $department->id -->" data-code="<!-- php: = substr($department->name , 0,4) -->" data-content="<!-- php: = $department->name --> <span class='badge badge-danger'><!-- php: = $department->code ? $department->code : substr($department->name , 0,4) --></span>"><!-- php: = $department->name --></option>
										<!-- php: } -->
									</SearchableSelectField>
								</div>
						</div>
						<!-- <div class="form-group row">
								<label class="control-label col-md-2">MDC

								</label>
								<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" multiple data-size="5" name="specialties[]" id="specialty" title="Select MDC" data-live-search="true"  required>
										
                                        <!-- php: /* foreach($specialties as $specialty){ -->
											<option value="<!-- php: = $specialty->id -->"  data-content="<!-- php: = $specialty->name --> <span class='badge badge-danger'><!-- php: = $specialty->code --></span>"><!-- php: = $specialty->name --></option>
										<!-- php: } */ -->
									</SearchableSelectField>
								</div>
						</div> -->
															
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearFloatFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="floats_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Department</th>
										<!-- <th class="left">Mdcs</th> -->
										<!-- <th class="left">Consultation Rooms</th> -->
										<th class="left">Status</th>
										<th class="left">Action</th>										
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($floats as $value): -->							
									<tr class="odd gradeX">
                                        <td class="left"><!-- php: = $value->name --></td>
										<td>
											<ul>
												<!-- php: foreach($value->departments_cash_floats as $dfloats){ -->
													<li><!-- php: = $dfloats->department->name --></li>
												<!-- php: } -->
											</ul>
										</td>
										<!-- <td></td>									 -->
                                        <td class="left"><!-- php: = $value->has('status') ? $value->status->name : '' --></td>										
										<td class="left">
											<a data-toggle="modal" data-target="#editFloatDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editFloatDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editFloatDialogueTitle">Float: <!-- php: = $value->name --></h4>
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
															<!-- php: //= $this->Form->create($value, ['url' => ['controller' => 'Cash', 'action' => 'editFloat', $value->id], 'class' => 'form-horizontal']) -->
															   <form class="editFormDiag<!-- php: = $value->id -->">
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-3">Name
																			<!-- <span class="required"> * </span> -->
																		</label>
																		<div class="col-md-9">
																			<input id="name<!-- php: = $value->id -->" type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter float name" class="form-control input-height" required /> 
																		</div>
																	</div>	
																	<div class="form-group row">
																	    <label class="control-label col-md-3">Department
																		<!-- <span class="required"> * </span> -->
																	    </label>
																	    <div class="col-md-9">
																	        <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" multiple
																	            data-size="5" id="deparments<!-- php: = $value->id -->" name="departments[]" title="Select Department"
																	            data-live-search="true" required>

																	            <!-- php: foreach($departmentz as $department){ -->
																	            <option <!-- php: = in_array($value->id, $flds) ? "selected" : "" --> value="<!-- php: = $department->id -->" data-code="<!-- php: = substr($department->name , 0,4) -->"
																	                data-content="<!-- php: = $department->name --> <span class='badge badge-danger'><!-- php: = $department->code ? $department->code : substr($department->name , 0,4) --></span>">
																	                <!-- php: = $department->name --></option>
																	            <!-- php: } -->
																	        </SearchableSelectField>
																	    </div>
																	</div>
                                                                   
																<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-3 col-md-9">
																			<button type="submit" onclick="submitEditForm(<!-- php: = $value->id -->)" class="btn btn-info">Submit</button>
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
	function clearFloatFields(){
        $('#name').val('');
	}
	function submitEditForm(id){
	
		$(".editFormDiag"+ id).on('submit', function(e){
		e.preventDefault();
		var deparments = $('#deparments'+ id).val();
		var name = $('#name'+ id).val();

		$.ajax({
			type: 'POST',
			url: '<!-- php: = $this->Url->build(['controller' => 'Cash', 'action' => 'editFloat']) -->/'+ id,
			data: {departments: deparments, name: name },
			cache: false,
			success: function(res){
				console.log('hey world!');
				window.location.reload();
			},
		})

	});
	// $(".editFormDiag"+ id).submit();

	}
	
</script>

`;

export default function ElementElementCashFloats() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
