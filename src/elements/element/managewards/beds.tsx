const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Beds</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#beds_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#beds_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="beds_add">
					<h4>Add a new Bed</h4>
					<!-- php: = $this->Form->create($bed, ['url' => ['controller' => 'ManageWards', 'action' => 'addBed']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Ward
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="ward_id" id="ward_id" required>
									<option value="">Select...</option>
									
									<!-- php: foreach($wards as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
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
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearBedFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="beds_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<!-- <th class="left">Name</th> -->
										<th class="left">Ward</th>
										<th class="left">Gender</th>
										<th class="left">Age</th>
										<th class="left">Beds</th>
										<th class="left">Occupancy</th>
										<th class="left">Free</th>
										<th class="left">Outliers</th>
										<!-- <th class="left">Status</th> -->
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($wardDetails as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
										<td class="left"><!-- php: =$value->name --></td>
										<td class="left"><!-- php: =$value->gender_specification->gender --></td>
										<td class="left">
											<!-- php: if(null !==($value->ward_age_specifications)){ foreach($value->ward_age_specifications as $val){ echo "<span class='badge badge-primary'>".$val->age_specification->age."</span><br>"; } }else{ echo "No Age Specifications Specified"; } -->
										</td>
										<td class="left"><!-- php: =$value->number_of_beds --></td>
										<td class="left"><!-- php: =$value->occupancy --></td>
										<td class="left"><!-- php: =$value->number_of_beds - $value->occupancy --></td>
										<td class="left"><!-- php: =$value->number_of_outlier_beds ? $value->number_of_outlier_beds: "0" --></td>
										<!-- <td class="left"></?=$value->has('bed_status') ? $value->bed_status->name : '' ?></td> -->
										<td class="left">
											<a data-toggle="modal" data-target="#viewDetailsDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs">
												View Details
											</a>
											
											<!-- </?= $this->Form->postLink(__('Delete'), ['controller'=>'ManageWards','action'=>'deleteBed',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delete') . ' btn-xs']) ?> -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editBedDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Edit Bed: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageWards', 'action' => 'editBed', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Ward
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="ward_id" id="ward_id" required>
																				<option value="">Select...</option>
																				
																				<!-- php: foreach($wards as $selectOption) { -->
																					<option value="<!-- php: = $selectOption->id -->" <!-- php: = $selectOption->id == $value->ward_id ? 'selected="selected"' : "" --> ><!-- php: = $selectOption->name --></option>
																				<!-- php: } -->
																				
																			</SearchableSelectField>
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
									<div class="modal fade" id="viewDetailsDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 1000px;">
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
															<header>View Beds Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<div class="form-body">
																<div class="form-group row">
																<label class="control-label col-md-3"><b>Bed Name</b></label>
																	<label class="control-label col-md-3"><b>Bed Status</b></label>
																	<label class="control-label col-md-3"><b>Patient Name</b></label>
																	<label class="control-label col-md-3"><b>Date of Admission</b></label>
																	<!-- php: $x = 1; foreach ($value->beds as $bed): //echo $bed -->
																	<label class="control-label col-md-3"><!-- php: = $bed->name --></label>
																	<label class="control-label col-md-3"><!-- php: if($bed->status == 18) { --> <span class="badge badge-pill badge-danger">In use</span> <!-- php: } else{ -->  <span class="badge badge-pill badge-success">Available</span> <!-- php: } --></label></label>
																	<label class="control-label col-md-3"><!-- php: if($bed->patient_visit_admissions) { --> <!-- php: = $bed->patient_visit_admissions['0']->patient_visit->patient->name --> <!-- php: } else{ --> None <!-- php: } --></label>
																	<label class="control-label col-md-3"><!-- php: if($bed->patient_visit_admissions) { --> <!-- php: = $bed->patient_visit_admissions['0']->date_admitted --> <!-- php: } else{ --> None <!-- php: } --></label>
																	<!-- php: $x++; endforeach; -->		
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
						</div>
					</div>
				
				</div>
			</div>
		</div>
		
	</div>
</div>


<script>
	function clearBedFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementManagewardsBeds() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
