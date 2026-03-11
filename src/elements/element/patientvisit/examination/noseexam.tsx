const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_nose') ? $selectedVisit->patient_examination_nose : null; -->
<!-- php: $YesNo = [ 'Yes' => 'Yes', 'No' => 'No' ]; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Nose Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addNoseExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Nose Examination
				</a>
				
				
				<div class="modal fade" id="addNoseExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Nose Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addNoseExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Flaring alae nasae
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="flaring_alae_nasae" id="nasae" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Discharge
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="discharge" id="discharge" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Discharge Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="discharge_details" data-required="0" placeholder="Enter discharge details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Paranasal Tenderness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="paranasal_tenderness" id="paranasal_tenderness" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Paranasal Tenderness Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="paranasal_tenderness_details" data-required="0" placeholder="Enter paranasal tenderness details" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editNoseExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Nose Examination
				</a>
				
				<div class="modal fade" id="editNoseExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Nose Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editNoseExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
												<div class="form-group row">
													<label class="control-label col-md-5">Flaring alae nasae
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="flaring_alae_nasae" id="flaring_alae_nasae" >
															<option value="<!-- php: = $value->flaring_alae_nasae -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->flaring_alae_nasae == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Discharge
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="discharge" id="discharge" >
															<option value="<!-- php: = $value->discharge -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->discharge == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Discharge Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->discharge_details -->" name="discharge_details" data-required="0" placeholder="Enter discharge details" class="form-control input-height" /> 
													</div>
												</div>
												
 												<div class="form-group row">
													<label class="control-label col-md-5">Paranasal Tenderness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="paranasal_tenderness" id="paranasal_tenderness" >
															<option value="<!-- php: = $value->paranasal_tenderness -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->paranasal_tenderness == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Paranasal Tenderness Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->paranasal_tenderness_details -->" name="paranasal_tenderness_details" data-required="0" placeholder="Enter paranasal tenderness details" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Flaring alae nasae</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->flaring_alae_nasae : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharge</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharge : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharge Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharge_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Paranasal Tenderness</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->paranasal_tenderness : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Paranasal Tenderness Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->paranasal_tenderness_details : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationNoseexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
