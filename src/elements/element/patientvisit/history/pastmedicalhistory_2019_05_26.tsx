const rawHtml = `

<div class="row">
	<div class="col-md-6 col-sm-12">
		<div class="table-container">
			<h4>Past Surgeries</h4>
			<div class="table-scrollable">
				<table class="table table-hover table-checkable order-column full-width" id="surgeries_table">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Details</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>
					<tbody>
						<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistorySurgeries as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td><!-- php: = $i --></td>
							<td><!-- php: = $value->description --></td>
							<td class="actions">
								<a data-toggle="modal" data-target="#editPastSurgeryHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
									Edit
								</a>
							</td>
						</tr>
						
						<div class="modal fade" id="editPastSurgeryHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title">Edit a past Surgery: <!-- php: = $value->name --></h4>
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
												<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'History', 'action' => 'editPastSurgery', $value->id], 'class' => 'form-horizontal']) -->
													<div class="form-body">	
														
														<div class="form-group row">
															<label class="control-label col-md-5">Details
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="description" data-required="1" value="<!-- php: = $value->description -->" placeholder="Enter description" class="form-control input-height" required /> 
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
					</tbody>
				</table>
			</div>

			<p align="center">
				<a data-toggle="modal" data-target="#addPastSurgeryHistoryDialogue" href="javascript:" class="btn btn-primary btn-xs">
					Add Past Surgery
				</a>
			</p>
			
			<div class="modal fade" id="addPastSurgeryHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Add a past surgery</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div class="modal-body">
					
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<div class="card card-box">
								<div class="card-head">
									<header>Surgery Details</header>
								</div>
								<div class="card-body" id="bar-parent">
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastSurgery', $patient->id], 'class' => 'form-horizontal']) -->
										<div class="form-body">	
											
											<div class="form-group row">
												<label class="control-label col-md-5">Details
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<input type="text" name="description" data-required="1" placeholder="Enter description" class="form-control input-height" required /> 
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
	</div>

	<div class="col-md-6 col-sm-12">
		<div class="table-container">
			<h4>Past Haemotransfusions</h4>
			<div class="table-scrollable">
				<table class="table table-hover table-checkable order-column full-width" id="haemotransfusions_table">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Details</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>
					<tbody>
						<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryHaemotransfusions as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td><!-- php: = $i --></td>
							<td><!-- php: = $value->description --></td>
							<td class="actions">
								<a data-toggle="modal" data-target="#editPastHaemotransfusionsHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
									Edit
								</a>
							</td>
						</tr>
						
						<div class="modal fade" id="editPastHaemotransfusionsHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title">Edit a past haemotransfusion: <!-- php: = $value->name --></h4>
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
												<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'History', 'action' => 'editPastHaemotransfusions', $value->id], 'class' => 'form-horizontal']) -->
													<div class="form-body">	
														
														<div class="form-group row">
															<label class="control-label col-md-5">Details
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="description" data-required="1" value="<!-- php: = $value->description -->" placeholder="Enter description" class="form-control input-height" required /> 
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
					</tbody>
				</table>
			</div>

			<p align="center">
				<a data-toggle="modal" data-target="#addPastHaemotransfusionsHistoryDialogue" href="javascript:" class="btn btn-primary btn-xs">
					Add Past Haemotransfusions
				</a>
			</p>

			<div class="modal fade" id="addPastHaemotransfusionsHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Add a past haemotransfusion</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div class="modal-body">
					
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<div class="card card-box">
								<div class="card-head">
									<header>Details</header>
								</div>
								<div class="card-body" id="bar-parent">
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastHaemotransfusions', $patient->id], 'class' => 'form-horizontal']) -->
										<div class="form-body">	
											
											<div class="form-group row">
												<label class="control-label col-md-5">Details
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<input type="text" name="description" data-required="1" placeholder="Enter description" class="form-control input-height" required /> 
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
	</div>
	
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<h4>Past Illnesses</h4>
			<div class="table-scrollable">
				<table class="table table-hover table-checkable order-column full-width" id="illnesses_table">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Illness</th>
							<th scope="col">Duration</th>
							<th scope="col">Comment</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>
					<tbody>
						<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryIllnesses as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td><!-- php: = $i --></td>
							<td><!-- php: = $value->has('illness') ? $value->illness->name : '' --></td>
							<td><!-- php: = $value->duration --></td>
							<td><!-- php: = $value->comment --></td>
							<td class="actions">
								<a data-toggle="modal" data-target="#editPastMedicationHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
									Edit
								</a>
							</td>
						</tr>
						
						<div class="modal fade" id="editPastMedicationHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title">Edit a past illness: <!-- php: = $value->name --></h4>
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
												<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'History', 'action' => 'editPastIllness', $value->id], 'class' => 'form-horizontal']) -->
													<div class="form-body">																		
														<div class="form-group row">
															<label class="control-label col-md-5">Illness
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<SearchableSelectField class="form-control input-height" name="illness_id" id="illness_id" required>
																	<option value="">Select...</option>
																		<!-- php: foreach($illnesses as $key => $illness) { -->
																			<option <!-- php: = ($illness->id == $value->illness_id) ? "selected='selected'" : "" --> value="<!-- php: = $illness->id -->"><!-- php: = $illness->name --></option>
																		<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														
														<div class="form-group row">
															<label class="control-label col-md-5">Duration
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="duration" data-required="1" value="<!-- php: = $value->duration -->" placeholder="Enter duration" class="form-control input-height" required /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Comments
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="comment" data-required="0" value="<!-- php: = $value->comment -->" placeholder="Enter comment" class="form-control input-height" /> 
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
					</tbody>
				</table>
			</div>

			<p align="center">
				<a data-toggle="modal" data-target="#addPastIllnessHistoryDialogue" href="javascript:" class="btn btn-primary btn-xs">
					Add Past Surgery
				</a>
			</p>

			<div class="modal fade" id="addPastIllnessHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Add a past illness</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div class="modal-body">
					
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<div class="card card-box">
								<div class="card-head">
									<header>Details</header>
								</div>
								<div class="card-body" id="bar-parent">
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastIllness', $patient->id], 'class' => 'form-horizontal']) -->
										<div class="form-body">																		
											<div class="form-group row">
												<label class="control-label col-md-5">Illness
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<SearchableSelectField class="form-control input-height" name="illness_id" id="illness_id" required>
														<option value="">Select...</option>
															<!-- php: foreach($illnesses as $key => $illness) { -->
																<option value="<!-- php: = $illness->id -->"><!-- php: = $illness->name --></option>
															<!-- php: } -->
													</SearchableSelectField>
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Duration
													<span class="required"> * </span>
												</label>
												<div class="col-md-7">
													<input type="text" name="duration" data-required="1" placeholder="Enter duration" class="form-control input-height" required /> 
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Comments
												
												</label>
												<div class="col-md-7">
													<input type="text" name="comment" data-required="0" placeholder="Enter comment" class="form-control input-height" /> 
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
	</div>
		
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitHistoryPastmedicalhistory20190526() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
