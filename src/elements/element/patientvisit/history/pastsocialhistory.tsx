const rawHtml = `
<!-- php: // initialize variables $value = isset($patient->patient_history_social) && sizeof($patient->patient_history_social) > 0 ? $patient->patient_history_social[0] : null; -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
		
			<div style="float: left">
				<h4>Social History</h4>
			</div>
			<div style="float: right">
			
				<!-- php: if(!isset($value)) { -->
				<p align="left">
					<a data-toggle="modal" data-target="#addPastSocialHistoryDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
						Add Social History
					</a>
				</p>
				
				
				<div class="modal fade" id="addPastSocialHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Social history</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastSocial', $patient->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Occupation
													
													</label>
													<div class="col-md-7">
														<input type="text" name="occupation" data-required="0" placeholder="Enter occupation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Residence
													
													</label>
													<div class="col-md-7">
														<input type="text" name="residence" data-required="0" placeholder="Enter residence" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Family Circumstance
													
													</label>
													<div class="col-md-7">
														<input type="text" name="family_circumstance" data-required="0" placeholder="Enter family circumstance" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Religion
													
													</label>
													<div class="col-md-7">
														<input type="text" name="religion" data-required="0" placeholder="Enter religion" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Hobbies / Exercise
													
													</label>
													<div class="col-md-7">
														<input type="text" name="hobbies" data-required="0" placeholder="Enter hobbies/exercise " class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Alchohol Intake
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="alcohol_intake" id="alcohol_intake" >
															<option value="">Select...</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Alchohol Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="alcohol_details" data-required="0" placeholder="Enter details " class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Tobacco Intake
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="tobacco_intake" id="tobacco_intake" >
															<option value="">Select...</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Tobacco Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="tobacco_details" data-required="0" placeholder="Enter details " class="form-control input-height" /> 
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
					<a data-toggle="modal" data-target="#editPastSocialHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" style="margin-top: 12px" class="btn btn-primary btn-xs">
						Update Social History
					</a>
				</p>
				
				<div class="modal fade" id="editPastSocialHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Social history</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'editPastSocial', $value->id], 'class' => 'form-horizontal']) -->
												
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Occupation
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->occupation -->" name="occupation" data-required="0" placeholder="Enter occupation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Residence
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->residence -->" name="residence" data-required="0" placeholder="Enter residence" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Family Circumstance
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->family_circumstance -->" name="family_circumstance" data-required="0" placeholder="Enter family circumstance" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Religion
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->religion -->" name="religion" data-required="0" placeholder="Enter religion" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Hobbies / Exercise
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->hobbies -->" name="hobbies" data-required="0" placeholder="Enter hobbies/exercise " class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Alchohol Intake
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->alcohol_intake -->" name="alcohol_intake" id="alcohol_intake" >
															<option value="">Select...</option>
															<option value="Yes" <!-- php: = $value->alcohol_intake == 'Yes' ? 'selected="selected"' : '' -->>Yes</option>
															<option value="No" <!-- php: = $value->alcohol_intake == 'No' ? 'selected="selected"' : '' -->>No</option>
														</SearchableSelectField>
													</div>
												</div>	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Alchohol Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->alcohol_details -->" name="alcohol_details" data-required="0" placeholder="Enter details " class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Tobacco Intake
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->tobacco_intake -->" name="tobacco_intake" id="tobacco_intake" >
															<option value="">Select...</option>
															<option value="Yes" <!-- php: = $value->tobacco_intake == 'Yes' ? 'selected="selected"' : '' -->>Yes</option>
															<option value="No" <!-- php: = $value->tobacco_details == 'No' ? 'selected="selected"' : '' -->>No</option>
														</SearchableSelectField>
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Tobacco Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->tobacco_details -->" name="tobacco_details" data-required="0" placeholder="Enter details " class="form-control input-height" /> 
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
			
			<div style="clear: both"></div>

			<!-- sadat -->

			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Occupation</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->occupation : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Residence</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->residence : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Family Circumstance</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->family_circumstance : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Religion</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->religion : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Hobbies</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->hobbies : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Alcohol Intake</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->alcohol_intake : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Alchohol Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->alcohol_details : 'N/A') --> years&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Tobacco Intake</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->tobacco_intake : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Tobacco Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->tobacco_details : 'N/A') --> years&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
		
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitHistoryPastsocialhistory() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
