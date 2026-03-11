const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_respiratory') ? $selectedVisit->patient_examination_respiratory : null; -->
<!-- php: $rhythm = [ 'Regular' => 'Regular', 'Irregular' => 'Irregular' ]; $depth = [ 'Normal' => 'Normal', 'Increased' => 'Increased', 'Shallow' => 'Shallow' ]; $breath_sounds = [ 'Quiet' => 'Quiet', 'Stridor' => 'Stridor', 'Wheezing' => 'Wheezing'... -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Respiratory system Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addrespiratoriesExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update respiratories Examination
				</a>
				
				
				<div class="modal fade" id="addrespiratoriesExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add respiratories Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addRespiratoryExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Respiratory Rate
													
													</label>
													<div class="col-md-7">
														<input type="text" name="respiratory_rate" data-required="0" placeholder="Enter respiratory rate" class="form-control input-height" /> 
													</div>
												</div>			
															
												<div class="form-group row">
													<label class="control-label col-md-5">Rhythm
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="rhythm" id="rhythm" >
															<option value="">Select...</option>
															<!-- php: foreach($rhythm as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Rhythm Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="rhythm_details" data-required="0" placeholder="Enter rhythm details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Depth
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="depth" id="depth" >
															<option value="">Select...</option>
															<!-- php: foreach($depth as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Breath Sounds
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="breath_sounds" id="breath_sounds" >
															<option value="">Select...</option>
															<!-- php: foreach($breath_sounds as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Use of Accessory Muscles
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="use_of_accessory_muscles" id="use_of_accessory_muscles" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Movement
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest_movement" id="chest_movement" >
															<option value="">Select...</option>
															<!-- php: foreach($chest_movement as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Symmetry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest_symmetry" id="chest_symmetry" >
															<option value="">Select...</option>
															<!-- php: foreach($chest_symmetry as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Trachea
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="trachea" id="trachea" >
															<option value="">Select...</option>
															<!-- php: foreach($trachea as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Tenderness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest_tenderness" id="chest_tenderness" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												
															
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Tenderness details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="chest_tenderness_details" data-required="0" placeholder="Enter chest tenderness details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Vocal Fremitus
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="vocal_fremitus" id="vocal_fremitus" >
															<option value="">Select...</option>
															<!-- php: foreach($vocal_fremitus as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Percussion
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="percussion" id="percussion" >
															<option value="">Select...</option>
															<!-- php: foreach($percussion as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Percussion details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="percussion_details" data-required="0" placeholder="Enter percussion details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Air Entry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="air_entry" id="air_entry" >
															<option value="">Select...</option>
															<!-- php: foreach($air_entry as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Breath sounds (auscultation)
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="breath_sounds_auscultation" id="breath_sounds_auscultation" >
															<option value="">Select...</option>
															<!-- php: foreach($breath_sounds_auscultation as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Breath Sounds details (for auscultation) 
													
													</label>
													<div class="col-md-7">
														<input type="text" name="breath_sounds_details_auscultation" data-required="0" placeholder="Enter breath sounds details for auscultation" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Added Sounds
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="added_sounds" id="added_sounds" >
															<option value="">Select...</option>
															<!-- php: foreach($added_sounds as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
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
				<a data-toggle="modal" data-target="#editrespiratoriesExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update respiratories Examination
				</a>
				
				<div class="modal fade" id="editrespiratoriesExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update respiratories Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editRespiratoryExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
											
												<div class="form-group row">
														<label class="control-label col-md-5">Respiratory Rate
														
														</label>
														<div class="col-md-7">
															<input type="text" value="<!-- php: = $value->respiratory_rate -->" name="respiratory_rate" data-required="0" placeholder="Enter respiratory rate" class="form-control input-height" /> 
														</div>
												</div>		

											
															
												<div class="form-group row">
													<label class="control-label col-md-5">Rhythm
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="rhythm" id="rhythm" >
															<option value="<!-- php: = $value->rhythm -->">Select...</option>
															<!-- php: foreach($rhythm as $key => $selectVal) { -->
																	<option <!-- php: = ($value->rhythm == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Rhythm Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->rhythm_details -->" name="rhythm_details" data-required="0" placeholder="Enter rhythm details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Depth
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="depth" id="depth" >
															<option value="<!-- php: = $value->depth -->">Select...</option>
															<!-- php: foreach($depth as $key => $selectVal) { -->
																	<option <!-- php: = ($value->depth == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Breath Sounds
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="breath_sounds" id="breath_sounds" >
															<option value="<!-- php: = $value->breadth_sounds -->">Select...</option>
															<!-- php: foreach($breath_sounds as $key => $selectVal) { -->
																	<option <!-- php: = ($value->breath_sounds == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Use of Accessory Muscles
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="use_of_accessory_muscles" id="use_of_accessory_muscles" >
															<option value="<!-- php: = $value->use_of_accessory_muscles -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->use_of_accessory_muscles == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Movement
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest_movement" id="chest_movement" >
															<option value="<!-- php: = $value->chest_movement -->">Select...</option>
															<!-- php: foreach($chest_movement as $key => $selectVal) { -->
																	<option <!-- php: = ($value->chest_movement == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Symmetry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest_symmetry" id="chest_symmetry" >
															<option value="<!-- php: = $value->chest_symmetry -->">Select...</option>
															<!-- php: foreach($chest_symmetry as $key => $selectVal) { -->
																	<option <!-- php: = ($value->chest_symmetry == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Trachea
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="trachea" id="trachea" >
															<option value="<!-- php: = $value->trachea -->">Select...</option>
															<!-- php: foreach($trachea as $key => $selectVal) { -->
																	<option <!-- php: = ($value->trachea == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Tenderness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest_tenderness" id="chest_tenderness" >
															<option value="<!-- php: = $value->chest_tenderness -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->chest_tenderness == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												
															
												<div class="form-group row">
													<label class="control-label col-md-5">Chest Tenderness details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->chest_tenderness_details -->" name="chest_tenderness_details" data-required="0" placeholder="Enter chest tenderness details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Vocal Fremitus
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="vocal_fremitus" id="vocal_fremitus" >
															<option value="<!-- php: = $value->vocal_fremitus -->">Select...</option>
															<!-- php: foreach($vocal_fremitus as $key => $selectVal) { -->
																	<option <!-- php: = ($value->vocal_fremitus == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Percussion
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="percussion" id="percussion" >
															<option value="<!-- php: = $value->percussion -->">Select...</option>
															<!-- php: foreach($percussion as $key => $selectVal) { -->
																	<option <!-- php: = ($value->percussion == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Percussion details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->percussion_details -->" name="percussion_details" data-required="0" placeholder="Enter percussion details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Air Entry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="air_entry" id="air_entry" >
															<option value="<!-- php: = $value->air_entry -->">Select...</option>
															<!-- php: foreach($air_entry as $key => $selectVal) { -->
																	<option <!-- php: = ($value->air_entry == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Breath sounds (auscultation)
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="breath_sounds_auscultation" id="breath_sounds_auscultation" >
															<option value="<!-- php: = $value->breath_sounds_auscultation -->">Select...</option>
															<!-- php: foreach($breath_sounds_auscultation as $key => $selectVal) { -->
																	<option <!-- php: = ($value->breath_sounds_auscultation == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Breath Sounds details (for auscultation) 
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->breath_sounds_auscultation -->" name="breath_sounds_details_auscultation" data-required="0" placeholder="Enter breath sounds details for auscultation" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Added Sounds
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="added_sounds" id="added_sounds" >
															<option value="<!-- php: = $value->added_sounds -->">Select...</option>
															<!-- php: foreach($added_sounds as $key => $selectVal) { -->
																	<option <!-- php: = ($value->added_sounds == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
																										
											
											
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
					&nbsp;&nbsp;<b>Respiratory Rate</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->respiratory_rate : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Rhythm</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->rhythm : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Rhythm Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->rhythm_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Depth</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->depth : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Breath Sounds</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->breath_sounds : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Use of accessory muscles</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->use_of_accessory_muscles : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Chest Movement</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->chest_movement : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Chest Symmetry</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->chest_symmetry : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Trachea</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->trachea : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Chest Tenderness</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->chest_tenderness : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Chest Tenderness Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->chest_tenderness_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Vocal Fremitus</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->vocal_fremitus : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Percussion</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->percussion : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Percussion Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->percussion_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h4>Auscultation</h4>
			<ul class="list-group list-group-unbordered">
	
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Air Entry</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->air_entry : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Breath Sounds</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->breath_sounds_auscultation : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Breath Sounds Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->breath_sounds_details_auscultation : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Added Sounds</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->added_sounds : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationRespiratoryexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
