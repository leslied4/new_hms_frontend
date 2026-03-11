const rawHtml = `
<!-- php: $value = $patientHistoryFamily; -->

<div class="row">
	<div class="col-md-8 col-sm-12">
		<div class="table-container">
			<h4>Family History</h4>

			<h5>Mother</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Status</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->mother_status : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Age</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->mother_age : 'N/A') --> years&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->mother_condition : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>

			<h5>Father</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Status</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->father_status : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Age</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->father_age : 'N/A') --> years&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->father_condition : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>

			<h5>Spouse</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Status</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->spouse_status : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Age</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->spouse_age : 'N/A') --> years&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->spouse_condition : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>

			<h5>Children</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Number of Children</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->number_of_children : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Condition</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->children_condition : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>

			<h5>Other Details</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
	
	
	<div class="col-md-4 col-sm-12">

		<div class="table-container">
			
			<h4>Action</h4>
			
			<!-- php: if(!isset($value)) { -->
			<p align="left">
				<a data-toggle="modal" data-target="#addPastFamilyHistoryDialogue" href="javascript:" class="btn btn-primary btn-xs">
					Add Family History
				</a>
			</p>
			
			
			<div class="modal fade" id="addPastFamilyHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Add family history</h4>
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
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastFamily', $patient->id], 'class' => 'form-horizontal']) -->
										<div class="form-body">		
											
											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Status
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" name="mother_status" id="mother_status" >
														<option value="">Select...</option>
														<option value="Alive">Alive</option>
														<option value="Dead">Dead</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Age
												
												</label>
												<div class="col-md-7">
													<input type="number" min="1" step="1" name="mother_age" data-required="0" placeholder="Enter age of mother" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" name="mother_condition" data-required="0" placeholder="Enter condition of mother" class="form-control input-height" /> 
												</div>
											</div>
																	
											<div class="form-group row">
												<label class="control-label col-md-5">Father's Status
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" name="father_status" id="father_status" >
														<option value="">Select...</option>
														<option value="Alive">Alive</option>
														<option value="Dead">Dead</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Father's Age
												
												</label>
												<div class="col-md-7">
													<input type="number" min="1" step="1" name="father_age" data-required="0" placeholder="Enter age of father" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Father's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" name="father_condition" data-required="0" placeholder="Enter condition of father" class="form-control input-height" /> 
												</div>
											</div>
																	
											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Status
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" name="spouse_status" id="spouse_status" >
														<option value="">Select...</option>
														<option value="Alive">Alive</option>
														<option value="Dead">Dead</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Age
												
												</label>
												<div class="col-md-7">
													<input type="number" min="1" step="1" name="spouse_age" data-required="0" placeholder="Enter age of spouse" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" name="spouse_condition" data-required="0" placeholder="Enter condition of spouse" class="form-control input-height" /> 
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Number of Children
												
												</label>
												<div class="col-md-7">
													<input type="number" min="0" step="1" name="number_of_children" data-required="0" placeholder="Enter number of children" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Children's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" name="children_condition" data-required="0" placeholder="Enter condition of children" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Other Details
												
												</label>
												<div class="col-md-7">
													<input type="text" name="other_details" data-required="0" placeholder="Enter other details" class="form-control input-height" /> 
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
			
			<!-- php: } else { -->
			<p align="left">
				<a data-toggle="modal" data-target="#editPastFamilyHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-primary btn-xs">
					Update Family History
				</a>
			</p>
			
			<div class="modal fade" id="editPastFamilyHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Update family history</h4>
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
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'editPastFamily', $value->id], 'class' => 'form-horizontal']) -->
										<div class="form-body">		
											
											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Status
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" name="mother_status" id="mother_status" value="<!-- php: = $value->mother_status -->" >
														<option value="">Select...</option>
														<option value="Alive" <!-- php: = $value->mother_status == 'Alive' ? 'selected="selected"' : '' -->>Alive</option>
														<option value="Dead" <!-- php: = $value->mother_status == 'Dead' ? 'selected="selected"' : '' -->>Dead</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Age
												
												</label>
												<div class="col-md-7">
													<input type="number" value="<!-- php: = $value->mother_age -->" min="1" step="1" name="mother_age" data-required="0" placeholder="Enter age of mother" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Mother's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" value="<!-- php: = $value->mother_condition -->" name="mother_condition" data-required="0" placeholder="Enter condition of mother" class="form-control input-height" /> 
												</div>
											</div>
																	
											<div class="form-group row">
												<label class="control-label col-md-5">Father's Status
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->father_status -->" name="father_status" id="father_status" >
														<option value="">Select...</option>
														<option value="Alive" <!-- php: = $value->father_status == 'Alive' ? 'selected="selected"' : '' --> >Alive</option>
														<option value="Dead" <!-- php: = $value->father_status == 'Dead' ? 'selected="selected"' : '' -->>Dead</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Father's Age
												
												</label>
												<div class="col-md-7">
													<input type="number" value="<!-- php: = $value->father_age -->" min="1" step="1" name="father_age" data-required="0" placeholder="Enter age of father" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Father's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" value="<!-- php: = $value->father_condition -->" name="father_condition" data-required="0" placeholder="Enter condition of father" class="form-control input-height" /> 
												</div>
											</div>
																	
											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Status
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->spouse_status -->" name="spouse_status" id="spouse_status" >
														<option value="">Select...</option>
														<option value="Alive" <!-- php: = $value->spouse_status == 'Alive' ? 'selected="selected"' : '' -->>Alive</option>
														<option value="Dead" <!-- php: = $value->spouse_status == 'Dead' ? 'selected="selected"' : '' -->>Dead</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Age
												
												</label>
												<div class="col-md-7">
													<input type="number" value="<!-- php: = $value->spouse_age -->" min="1" step="1" name="spouse_age" data-required="0" placeholder="Enter age of spouse" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Spouse's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" value="<!-- php: = $value->spouse_condition -->" name="spouse_condition" data-required="0" placeholder="Enter condition of spouse" class="form-control input-height" /> 
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Number of Children
												
												</label>
												<div class="col-md-7">
													<input type="number" value="<!-- php: = $value->number_of_children -->" min="0" step="1" name="number_of_children" data-required="0" placeholder="Enter number of children" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Children's Condition
												
												</label>
												<div class="col-md-7">
													<input type="text" value="<!-- php: = $value->children_condition -->" name="children_condition" data-required="0" placeholder="Enter condition of children" class="form-control input-height" /> 
												</div>
											</div>
											
											<div class="form-group row">
												<label class="control-label col-md-5">Other Details
												
												</label>
												<div class="col-md-7">
													<input type="text" value="<!-- php: = $value->other_details -->" name="other_details" data-required="0" placeholder="Enter condition of children" class="form-control input-height" /> 
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
			
			<!-- php: } -->
			
		</div>
	</div>
		
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitHistoryPastfamilyhistory20190526() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
