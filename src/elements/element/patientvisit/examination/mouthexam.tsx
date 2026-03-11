const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_mouth') ? $selectedVisit->patient_examination_mouth : null; -->
<!-- php: $lips = [ 'Normal' => 'Normal', 'Fissuring' => 'Fissuring', 'Discharge' => 'Discharge', 'Cheilitis' => 'Cheilitis' ]; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Mouth Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addMouthExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Mouth Examination
				</a>
				
				
				<div class="modal fade" id="addMouthExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Mouth Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addMouthExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
														
												<div class="form-group row">
													<label class="control-label col-md-5">Lips
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="lips" id="lips" >
															<option value="">Select...</option>
															<!-- php: foreach($lips as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Tongue
													
													</label>
													<div class="col-md-7">
														<input type="text" name="tongue" data-required="0" placeholder="Enter tongue" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Teeth
													
													</label>
													<div class="col-md-7">
														<input type="text" name="teeth" data-required="0" placeholder="Enter teeth" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Gums
													
													</label>
													<div class="col-md-7">
														<input type="text" name="gums" data-required="0" placeholder="Enter gum" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Pharynx
													
													</label>
													<div class="col-md-7">
														<input type="text" name="pharynx" data-required="0" placeholder="Enter pharynx" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Signifcant Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" name="other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editMouthExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Mouth Examination
				</a>
				
				<div class="modal fade" id="editMouthExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Mouth Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editMouthExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
																
												<div class="form-group row">
													<label class="control-label col-md-5">Lips
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="lips" id="lips" >
															<option value="<!-- php: = $value->lips -->">Select...</option>
															<!-- php: foreach($lips as $key => $selectVal) { -->
																	<option <!-- php: = ($value->lips == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Tongue
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->tongue -->" name="tongue" data-required="0" placeholder="Enter tongue" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Teeth
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->teeth -->" name="teeth" data-required="0" placeholder="Enter teeth" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Gums
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->gums -->" name="gums" data-required="0" placeholder="Enter gum" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Pharynx
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->pharynx -->" name="pharynx" data-required="0" placeholder="Enter pharynx" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Signifcant Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->other_significant_findings -->" name="other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Lips</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->lips : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Tongue</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->tongue : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Teeth</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->teeth : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Gums</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->gums : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>pharynx</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->pharynx : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Other Signifcant Findings</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_significant_findings : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
		
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitExaminationMouthexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
