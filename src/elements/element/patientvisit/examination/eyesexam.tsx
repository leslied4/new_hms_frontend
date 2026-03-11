const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_eye') ? $selectedVisit->patient_examination_eye : null; -->
<!-- php: $conjunctiva = [ 'Normal' => 'Normal', 'Pale' => 'Pale', 'Congested' => 'Congested' ]; $YesNo = [ 'Yes' => 'Yes', 'No' => 'No' ]; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Eyes Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addEyesExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Eyes Examination
				</a>
				
				
				<div class="modal fade" id="addEyesExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Eyes Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addEyeExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	

											        <div class="form-group row">
													<label class="control-label col-md-5">Sclera Colour
													
													</label>
													<div class="col-md-7">
														<input type="text" name="sclera_colour" data-required="0" placeholder="Enter sclera colour" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Conjunctiva
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="conjunctiva" id="conjunctiva" >
															<option value="">Select...</option>
															<!-- php: foreach($conjunctiva as $key => $selectVal) { -->
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
														<input type="text" name="discharge_details" data-required="0" placeholder="Enter tremors details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Strabismus (squint)
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="strabismus " id="discharge" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Strabismus (squint) Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="strabismus_details" data-required="0" placeholder="Strabismus (squint) details" class="form-control input-height" /> 
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Exophthalmos
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="exophthalmos" id="exophthalmos" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Exophthalmos Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="exophthalmos" data-required="0" placeholder="exophthalmos" class="form-control input-height" /> 
													</div>
												</div>
												
													
												<div class="form-group row">
													<label class="control-label col-md-5">Fundoscopy
													
													</label>
													<div class="col-md-7">
														<input type="text" name="fundoscopy" data-required="0" placeholder="Enter fundoscopy" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editEyesExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Eyes Examination
				</a>
				
				<div class="modal fade" id="editEyesExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Eyes Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editEyeExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	

												<div class="form-group row">
													<label class="control-label col-md-5">Sclera Colour
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->sclera_colour -->" name="sclera-colour" data-required="0" placeholder="Enter sclera colour" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Conjunctiva
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="conjunctiva" id="conjunctiva" >
															<option value="<!-- php: = $value->conjunctiva -->">Select...</option>
															<!-- php: foreach($conjunctiva as $key => $selectVal) { -->
																	<option <!-- php: = ($value->conjunctiva == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
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
													<label class="control-label col-md-5">Strabismus (squint)
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="strabismus" id="strabismus" >
															<option value="<!-- php: = $value->strabismus -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->strabismus == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Strabismus (squint) Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->strabismus_details -->" name="strabismus_details" data-required="0" placeholder="Enter strabismus (squint) details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Exophthalmos
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="exophthalmos" id="exophthalmos" >
															<option value="<!-- php: = $value->exophthalmos -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->exophthalmos == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Exophthalmos Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->exophthalmos_details -->" name="exophthalmos_details" data-required="0" placeholder="Enter exophthalmos details" class="form-control input-height" /> 
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Fundoscopy
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->fundoscopy -->" name="fundoscopy" data-required="0" placeholder="Enter fundoscopy" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Sclera Colour</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->sclera_colour : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Conjunctiva</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->conjunctiva : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharge</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharge : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharge Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharge_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Strabismus</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->strabismus : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Strabismus Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->strabismus_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Exophthalmos</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->exophthalmos : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Exophthalmos Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->exophthalmos_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Fundoscopy</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->fundoscopy : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationEyesexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
