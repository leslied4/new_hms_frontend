const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_extremity') ? $selectedVisit->patient_examination_extremity : null; -->
<!-- php: $Powers = [ '0' => '0', '1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5' ]; $Tones = [ 'Normal' => 'Normal', 'Reduced' => 'Reduced', 'Increased' => 'Increased' ]; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Extremity Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addExtremityExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Extremity Examination
				</a>
				
				
				<div class="modal fade" id="addExtremityExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Extremity Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addExtremityExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Inspection
													
													</label>
													<div class="col-md-7">
														<input type="text" name="left_inspection" data-required="0" placeholder="Enter left inspection" class="form-control input-height" /> 
													</div>
												</div>	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Tone
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="left_tone" id="left_tone" >
															<option value="">Select...</option>
															<!-- php: foreach($Tones as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Power
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="left_power" id="left_power" >
															<option value="">Select...</option>
															<!-- php: foreach($Powers as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Reflexes
													
													</label>
													<div class="col-md-7">
														<input type="text" name="left_reflexes" data-required="0" placeholder="Enter left reflexes" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Sensation
													
													</label>
													<div class="col-md-7">
														<input type="text" name="left_sensation" data-required="0" placeholder="Enter left sensation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Cordination
													
													</label>
													<div class="col-md-7">
														<input type="text" name="left_coordination" data-required="0" placeholder="Enter left coordination" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Right Inspection
													
													</label>
													<div class="col-md-7">
														<input type="text" name="right_inspection" data-required="0" placeholder="Enter right inspection" class="form-control input-height" /> 
													</div>
												</div>	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Tone
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="right_tone" id="right_tone" >
															<option value="">Select...</option>
															<!-- php: foreach($Tones as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Power
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="right_power" id="right_power" >
															<option value="">Select...</option>
															<!-- php: foreach($Powers as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Reflexes
													
													</label>
													<div class="col-md-7">
														<input type="text" name="right_reflexes" data-required="0" placeholder="Enter right reflexes" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Sensation
													
													</label>
													<div class="col-md-7">
														<input type="text" name="right_sensation" data-required="0" placeholder="Enter right sensation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Cordination
													
													</label>
													<div class="col-md-7">
														<input type="text" name="right_coordination" data-required="0" placeholder="Enter right coordination" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Autonomic System
													
													</label>
													<div class="col-md-7">
														<input type="text" name="autonomic_system" data-required="0" placeholder="Enter autonomic system" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editExtremityExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Extremity Examination
				</a>
				
				<div class="modal fade" id="editExtremityExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Extremity Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editExtremityExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Inspection
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->left_inspection -->" name="left_inspection" data-required="0" placeholder="Enter left inspection" class="form-control input-height" /> 
													</div>
												</div>	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Tone
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->left_tone -->" name="left_tone" id="left_tone" >
															<option value="">Select...</option>
															<!-- php: foreach($Tones as $key => $selectVal) { -->
																	<option <!-- php: = ($value->left_tone == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Power
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->left_power -->" name="left_power" id="left_power" >
															<option value="">Select...</option>
															<!-- php: foreach($Powers as $key => $selectVal) { -->
																	<option <!-- php: = ($value->left_power == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Reflexes
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->left_reflexes -->" name="left_reflexes" data-required="0" placeholder="Enter left reflexes" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Sensation
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->left_sensation -->" name="left_sensation" data-required="0" placeholder="Enter left sensation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Left Cordination
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->left_coordination -->" name="left_coordination" data-required="0" placeholder="Enter left coordination" class="form-control input-height" /> 
													</div>
												</div>	
												
												<div class="form-group row">
													<label class="control-label col-md-5">Right Inspection
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->right_inspection -->" name="right_inspection" data-required="0" placeholder="Enter right inspection" class="form-control input-height" /> 
													</div>
												</div>	
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Tone
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->right_tone -->" name="right_tone" id="right_tone" >
															<option value="">Select...</option>
															<!-- php: foreach($Tones as $key => $selectVal) { -->
																	<option <!-- php: = ($value->right_tone == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Power
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->right_inspection -->" name="right_power" id="right_power" >
															<option value="">Select...</option>
															<!-- php: foreach($Powers as $key => $selectVal) { -->
																	<option <!-- php: = ($value->right_tone == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Reflexes
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->right_reflexes -->" name="right_reflexes" data-required="0" placeholder="Enter right reflexes" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Sensation
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->right_sensation -->" name="right_sensation" data-required="0" placeholder="Enter right sensation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Right Cordination
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->right_coordination -->" name="right_coordination" data-required="0" placeholder="Enter right coordination" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Autonomic System
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->autonomic_system -->" name="autonomic_system" data-required="0" placeholder="Enter autonomic system" class="form-control input-height" /> 
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
			
			<div class="row">
				<div class="col-md-6 col-sm-6">
					<h4>Left</h4>
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							&nbsp;&nbsp;<b>Inspection</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->left_inspection : 'N/A') -->&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<b>Tone</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->left_tone : 'N/A') -->&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<b>Power</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->left_power : 'N/A') -->&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<b>Reflexes</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->left_reflexes : 'N/A') -->&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<b>Sensation</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->left_sensation : 'N/A') -->&nbsp;&nbsp;</a>
						</li>
					</ul>
				</div>
			
				<div class="col-md-6 col-sm-6">
					<h4 align="right">Right</h4>
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							&nbsp;&nbsp;<!-- php: = (isset($value) ? $value->right_inspection : 'N/A') --> <a class="pull-right"><b>Inspection</b>&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<!-- php: = (isset($value) ? $value->right_tone : 'N/A') --> <a class="pull-right"><b>Tone</b>&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<!-- php: = (isset($value) ? $value->right_power : 'N/A') --> <a class="pull-right"><b>Power</b>&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<!-- php: = (isset($value) ? $value->right_reflexes : 'N/A') --> <a class="pull-right"><b>Reflexes</b>&nbsp;&nbsp;</a>
						</li>
						<li class="list-group-item">
							&nbsp;&nbsp;<!-- php: = (isset($value) ? $value->right_sensation : 'N/A') --> <a class="pull-right"><b>Sensation</b>&nbsp;&nbsp;</a>
						</li>
					</ul>
				</div>
			</div>
				
			<h4>Others</h4>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Autonomic system</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->autonomic_system : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationExtremityexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
