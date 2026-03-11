const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_general') ? $selectedVisit->patient_examination_general : null; -->
<!-- php: $hydration = [ 'No Hydration' => 'No Hydration', 'Mild Hydration' => 'Mild Hydration', 'Moderate Hydration' => 'Moderate Hydration', 'Severe Hydration' => 'Severe Hydration' ]; $mental_state = [ 'Oriented' => 'Oriented', 'Confused' => 'Conf... -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>General Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addGeneralExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update General Examination
				</a>
				
				
				<div class="modal fade" id="addGeneralExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add General Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addGeneralExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	

										        <div class="form-group row">
													<label class="control-label col-md-5">Temperature
													
													</label>
													<div class="col-md-7">
														<input type="text" name="temperature" data-required="0" placeholder="Enter temperatue" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Pulse
													
													</label>
													<div class="col-md-7">
														<input type="text" name="pulse" data-required="0" placeholder="Enter pulse" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Respiratory Rate
													
													</label>
													<div class="col-md-7">
														<input type="text" name="respiratory_rate" data-required="0" placeholder="Enter respiratory rate" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Hydration
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="hydration" id="hydration" >
															<option value="">Select...</option>
															<!-- php: foreach($hydration as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
													


												<div class="form-group row">
													<label class="control-label col-md-5">Distress
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="distress" id="distress" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Distress Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="distress_details" data-required="0" placeholder="Enter distress details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Mental State
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="mental_state" id="mental_state" >
															<option value="">Select...</option>
															<!-- php: foreach($mental_state as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
													
												<div class="form-group row">
													<label class="control-label col-md-5">Constitution
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="constitution" id="constitution" >
															<option value="">Select...</option>
															<!-- php: foreach($constitution as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												

												<div class="form-group row">
													<label class="control-label col-md-5">Pallor
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="pallor" id="pallor" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Pallor Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="pallor_details" data-required="0" placeholder="pallor details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Jaundice
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="jaundice" id="jaundice" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Jaundice Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="jaundice_details" data-required="0" placeholder="Jaundice Details" class="form-control input-height" /> 
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Cyanosis
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="cyanosis" id="cyanosis" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Cyanosis Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="cyanosis_details" data-required="0" placeholder="Cyanosis Details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Oedema
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="oedema" id="oedema" >
															<option value="">Select...</option>
															<!-- php: foreach($oedema as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Environment
													
													</label>
													<div class="col-md-7">
														<input type="text" name="environment" data-required="0" placeholder="Enter environment" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editGeneralExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update General Examination
				</a>
				
				<div class="modal fade" id="editGeneralExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update General Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editGeneralExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	

												<div class="form-group row">
													<label class="control-label col-md-5">Temperature
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->temperature -->" name="temperature" data-required="0" placeholder="Enter temperature" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Pulse
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->pulse -->" name="pulse" data-required="0" placeholder="pulse" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Respiratory Rate
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->respiratory_rate -->" name="respiratory_rate" data-required="0" placeholder="Enter respiratory_rate" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Hydration
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="hydration" id="hydration" >
															<option value="<!-- php: = $value->hydration -->">Select...</option>
															<!-- php: foreach($hydration as $key => $selectVal) { -->
																	<option <!-- php: = ($value->hydration == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Distress
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="distress" id="distress" >
															<option value="<!-- php: = $value->distress -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->distress == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Distress Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->distress_details -->" name="distress_details" data-required="0" placeholder="Enter distress details" class="form-control input-height" /> 
													</div>
												</div>
														
													


													<div class="form-group row">
													<label class="control-label col-md-5">Mental State
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="mental_state" id="mental_state" >
															<option value="<!-- php: = $value->mental_state -->">Select...</option>
															<!-- php: foreach($mental_state as $key => $selectVal) { -->
																	<option <!-- php: = ($value->mental_state == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Mental State
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->mental_state -->" name="mental_state" data-required="0" placeholder="Enter mental state" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Constitution
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="constitution" id="constitution" >
															<option value="<!-- php: = $value->constitution -->">Select...</option>
															<!-- php: foreach($constitution as $key => $selectVal) { -->
																	<option <!-- php: = ($value->constitution == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Constitution
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->constitution -->" name="constitution" data-required="0" placeholder="Enter constitution" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Pallor
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="pallor" id="pallor" >
															<option value="<!-- php: = $value->pallor -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->pallor == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Pallor Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->pallor -->" name="pallor_details" data-required="0" placeholder="Enter pallor details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Jaundice
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="jaundice" id="jaundice" >
															<option value="<!-- php: = $value->jaundice -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->jaundice == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Jaundice Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->jaundice_details -->" name="jaundice_details" data-required="0" placeholder="Enter jaundice details" class="form-control input-height" /> 
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Cyanosis
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="cyanosis" id="cyanosis" >
															<option value="<!-- php: = $value->cyanosis -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->cyanosis == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Cyanosis Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->cyanosis_details -->" name="cyanosis_details" data-required="0" placeholder="Enter cyanosis details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Oedema
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="oedema" id="oedema" >
															<option value="<!-- php: = $value->oedema -->">Select...</option>
															<!-- php: foreach($oedema as $key => $selectVal) { -->
																	<option <!-- php: = ($value->oedema == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
												
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Environment
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->environment -->" name="environment" data-required="0" placeholder="Enter environment" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Temperature</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->temperature : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Pulse</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->pulse : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Respiratory Rate</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->respiratory_rate : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Hydration</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->hydration : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Distress</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->distress : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Mental State</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->mental_state : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Constitution</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->constitution : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h4>Skin and mucosae </h4>
			
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Pallor</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->pallor : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Jaundice</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->jaundice : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cyanosis</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cyanosis : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Oedema</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->oedema : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Environment</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->environment: 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Other findings</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_findings : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
		
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitExaminationGeneralexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
