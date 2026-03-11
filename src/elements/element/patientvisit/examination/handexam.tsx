const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_hand') ? $selectedVisit->patient_examination_hand : null; -->
<!-- php: $clubbings = [ 'No clubbing' => 'No clubbing', 'Stages 1' => 'Stages 1', 'Stages 2' => 'Stages 2', 'Stages 3' => 'Stages 3', 'Stages 4' => 'Stages 4' ]; $YesNo = [ 'Yes' => 'Yes', 'No' => 'No' ]; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Hand Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addHandExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Hand Examination
				</a>
				
				
				<div class="modal fade" id="addHandExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Hand Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addHandExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Clubbing
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="clubbing" id="clubbing" >
															<option value="">Select...</option>
															<!-- php: foreach($clubbings as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Tremors
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="tremors" id="tremors" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Tremors Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="tremors_details" data-required="0" placeholder="Enter tremors details" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Nails
													
													</label>
													<div class="col-md-7">
														<input type="text" name="nails" data-required="0" placeholder="Enter nails" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Palms
													
													</label>
													<div class="col-md-7">
														<input type="text" name="palms" data-required="0" placeholder="Enter palms" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Joints
													
													</label>
													<div class="col-md-7">
														<input type="text" name="joints" data-required="0" placeholder="Enter joints" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" name="other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editHandExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Hand Examination
				</a>
				
				<div class="modal fade" id="editHandExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Hand Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editHandExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
												<div class="form-group row">
													<label class="control-label col-md-5">Clubbing
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="clubbing" id="clubbing" >
															<option value="<!-- php: = $value->clubbing -->">Select...</option>
															<!-- php: foreach($clubbings as $key => $selectVal) { -->
																	<option <!-- php: = ($value->clubbing == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Tremors
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="tremors" id="tremors" >
															<option value="<!-- php: = $value->tremors -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->tremors == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Tremors Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->tremors_details -->" name="tremors_details" data-required="0" placeholder="Enter tremors details" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Nails
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->nails -->" name="nails" data-required="0" placeholder="Enter nails" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Palms
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->palms -->" name="palms" data-required="0" placeholder="Enter palms" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Joints
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->joints -->" name="joints" data-required="0" placeholder="Enter joints" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->other_findings -->" name="other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height" /> 
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
			
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Clubbing</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->clubbing : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Tremors</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->tremors : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Tremors Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->tremors_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Nails</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->nails : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Palms</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->palms : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Joints</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->joints : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Other Findings</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_findings : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
		
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitExaminationHandexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
