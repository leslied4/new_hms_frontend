const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_hand') ? $selectedVisit->patient_examination_neurological : null; -->
<!-- php: $Speeches = [ 'Normal' => 'Normal', 'Dysphasia' => 'Dysphasia', 'Dysarthria' => 'Dysarthria', 'Both' => 'Both', 'Not assessible' => 'Not assessible' ]; $YesNo = [ 'Yes' => 'Yes', 'No' => 'No' ]; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Neurological Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addNeurologicalExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Neurological Examination
				</a>
				
				
				<div class="modal fade" id="addNeurologicalExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Neurological Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addNeurologicalExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">
															
												<div class="form-group row">
													<label class="control-label col-md-5">Eye Opening
													
													</label>
													<div class="col-md-7">
														<input type="text" name="eye_opening" data-required="0" placeholder="Enter eye opening" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Verbose Response
													
													</label>
													<div class="col-md-7">
														<input type="text" name="verbose_response" data-required="0" placeholder="Enter verbose response" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Best Motor Response
													
													</label>
													<div class="col-md-7">
														<input type="text" name="best_motor_response" data-required="0" placeholder="Enter best motor response" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Score
													
													</label>
													<div class="col-md-7">
														<input type="text" name="score" data-required="0" placeholder="Enter score" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Pulpillary Response to Light
													
													</label>
													<div class="col-md-7">
														<input type="text" name="pulpillary_response_to_light" data-required="0" placeholder="Enter pulpillary response to light" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Speech
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="speech" id="speech" >
															<option value="">Select...</option>
															<!-- php: foreach($Speeches as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Neck Stiffness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="neck_stiffness" id="neck_stiffness" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Kernig's Sign
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="kernigs_sign" id="kernigs_sign" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Brudzinski Sign
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="brudzinski_sign" id="brudzinski_sign" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Cranial Nerves
													
													</label>
													<div class="col-md-7">
														<input type="text" name="cranial_nerves" data-required="0" placeholder="Enter cranial nerves" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editNeurologicalExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Neurological Examination
				</a>
				
				<div class="modal fade" id="editNeurologicalExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Neurological Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editNeurologicalExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
														
												<div class="form-group row">
													<label class="control-label col-md-5">Eye Opening
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->eye_opening -->" name="eye_opening" data-required="0" placeholder="Enter eye opening" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Verbose Response
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->verbose_response -->" name="verbose_response" data-required="0" placeholder="Enter verbose response" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Best Motor Response
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->best_motor_response -->" name="best_motor_response" data-required="0" placeholder="Enter best motor response" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Score
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->score -->" name="score" data-required="0" placeholder="Enter score" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Pulpillary Response to Light
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->pulpillary_response_to_light -->" name="pulpillary_response_to_light" data-required="0" placeholder="Enter pulpillary response to light" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Speech
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="speech" id="speech"  value="<!-- php: = $value->speech -->" >
															<option value="">Select...</option>
															<!-- php: foreach($Speeches as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Neck Stiffness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="neck_stiffness" id="neck_stiffness" value="<!-- php: = $value->neck_stiffness -->" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Kernig's Sign
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="kernigs_sign" id="kernigs_sign" value="<!-- php: = $value->kernigs_sign -->" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Brudzinski Sign
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="brudzinski_sign" id="brudzinski_sign" value="<!-- php: = $value->brudzinski_sign -->" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Cranial Nerves
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->cranial_nerves -->" name="cranial_nerves" data-required="0" placeholder="Enter cranial nerves" class="form-control input-height" /> 
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
			
			<h5>Glasgow Coma Score</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Eye Opening</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->eye_opening : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Verbose Response</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->verbose_response : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Best Motor Response</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->best_motor_response : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Score</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->score : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Pulpillary Response to Light</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->pulpillary_response_to_light : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Speech</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->speech : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h5>Meningeal Irritation</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Neck Stiffness</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->neck_stiffness : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Kernig's Sign</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->kernigs_sign : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Brudzinski</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->brudzinski_sign : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cranial Nerves</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cranial_nerves : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationNeurologicalexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
