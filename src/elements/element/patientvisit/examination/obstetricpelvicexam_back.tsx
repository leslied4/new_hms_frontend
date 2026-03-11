const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_cardiovasculars') ? $selectedVisit->patient_examination_cardiovasculars : null; -->
<!-- php: $YesNo = [ 'Yes' => 'Yes', 'No' => 'No' ]; $rhythm = [ 'regular' => 'regular', 'regularly irregular' => 'regularly irregular', 'irregularly irregular' => 'irregularly irregular', ]; $volume = [ 'normal' => 'normal', 'large' => 'large', 'sma... -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Cardiovascular Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addCardiovascularExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Cardiovascular Examination
				</a>
				
				
				<div class="modal fade" id="addCardiovascularExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Cardiovascular Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addCardiovascularExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Pulse
													
													</label>
													
													<div class="col-md-7">
														<input type="text" name="pulse" data-required="0" placeholder="Enter pulse" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Rate
													
													</label>
													
													<div class="col-md-7">
														<input type="text" name="rate" data-required="0" placeholder="Enter rate" class="form-control input-height" /> 
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
													<label class="control-label col-md-5">Volume
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="volume" id="volume" >
															<option value="">Select...</option>
															<!-- php: foreach($volume as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Character
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="character" id="character" >
															<option value="">Select...</option>
															<!-- php: foreach($character as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Vessel Walls
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="vessel_walls" id="vessel_walls" >
															<option value="">Select...</option>
															<!-- php: foreach($character as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Radio-Femoral Delay
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="radio_femoral_delay" id="radio_femoral_delay" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Blood Pressure
													
													</label>
													<div class="col-md-7">
														<input type="text" name="blood_pressure" data-required="0" placeholder="Enter blood pressure" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Posture
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="posture" id="posture" >
															<option value="">Select...</option>
															<!-- php: foreach($posture as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Jugular Venous Pressure
													
													</label>
													<div class="col-md-7">
														<input type="text" name="jugular_venous_pressure" data-required="0" placeholder="Enter jugular venous pressure" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Variscosities
													
													</label>
													<div class="col-md-7">
														<input type="text" name="variscosities" data-required="0" placeholder="Enter variscosities" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Oedema Heart
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="oedema_heart" id="oedema_heart" >
															<option value="">Select...</option>
															<!-- php: foreach($oedema_heart as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Oedema Heart Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" name="oedema_heart_comment" data-required="0" placeholder="Enter oedema heart comments" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Dyspnoea
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="dyspnoea" id="dyspnoea" >
															<option value="">Select...</option>
															<!-- php: foreach($dyspnoea as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest" id="chest" >
															<option value="">Select...</option>
															<!-- php: foreach($chest as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Apex beat Location
													
													</label>
													<div class="col-md-7">
														<input type="text" name="apex_beat_location" data-required="0" placeholder="Enter apex beat location" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Percussion
													
													</label>
													<div class="col-md-7">
														<input type="text" name="percussion" data-required="0" placeholder="Enter percussion" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">First Heart Sound
													
													</label>
													<div class="col-md-7">
														<input type="text" name="first_heart_sound" data-required="0" placeholder="Enter first heart sound" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Second Heart Sound
													
													</label>
													<div class="col-md-7">
														<input type="text" name="second_heart_sound" data-required="0" placeholder="Enter second heart sound" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Murmurs and Added Sounds
													
													</label>
													<div class="col-md-7">
														<input type="text" name="murmurs_and_added_sounds" data-required="0" placeholder="Enter murmers and added sounds" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" name="other_findings" data-required="0" placeholder="Enter other_findings" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editCardiovascularExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Cardiovascular Examination
				</a>
				
				<div class="modal fade" id="editCardiovascularExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Cardiovascular Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editGynaecologicExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	

											    <div class="form-group row">
													<label class="control-label col-md-5">Pulse
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->pulse -->" name="vulva" data-required="0" placeholder="Enter pulse" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Rate
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->rate -->" name="rate" data-required="0" placeholder="Enter rate" class="form-control input-height" /> 
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
													<label class="control-label col-md-5">Volume
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="volume" id="volume" >
															<option value="<!-- php: = $value->volume -->">Select...</option>
															<!-- php: foreach($volume as $key => $selectVal) { -->
																	<option <!-- php: = ($value->volume == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Character
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="character" id="character" >
															<option value="<!-- php: = $value->character -->">Select...</option>
															<!-- php: foreach($character as $key => $selectVal) { -->
																	<option <!-- php: = ($value->character == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Vessel Walls
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="vessel_walls" id="vessel_walls" >
															<option value="<!-- php: = $value->rhythm -->">Select...</option>
															<!-- php: foreach($vessel_walls as $key => $selectVal) { -->
																	<option <!-- php: = ($value->vessel_walls == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Radio-Femoral Delay
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="radio_femoral_delay" id="radio_femoral_delay" >
															<option value="<!-- php: = $value->radio_femoral_delay -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->radio_femoral_delay == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Blood Pressure
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->blood_pressure -->" name="blood_pressure" data-required="0" placeholder="Enter blood pressure" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Posture
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="posture" id="posture" >
															<option value="<!-- php: = $value->posture -->">Select...</option>
															<!-- php: foreach($posture as $key => $selectVal) { -->
																	<option <!-- php: = ($value->posture == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Jugular Venous Pressure
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->jugular_venous_pressure -->" name="jugular_venous_pressure" data-required="0" placeholder="Enter jugular venous pressure" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Variscosities
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->variscosities -->" name="variscosities" data-required="0" placeholder="Enter variscosities" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Oedema Heart
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="oedema_heart" id="oedema_heart" >
															<option value="<!-- php: = $value->oedema_heart -->">Select...</option>
															<!-- php: foreach($oedema_heart as $key => $selectVal) { -->
																	<option <!-- php: = ($value->oedema_heart == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Oedema Heart Comments
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->oedema_heart_comment -->" name="oedema_heart_comment" data-required="0" placeholder="Enter oedema heart comments" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Dyspnoea
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="dyspnoea" id="dyspnoea" >
															<option value="<!-- php: = $value->dyspnoea -->">Select...</option>
															<!-- php: foreach($dyspnoea as $key => $selectVal) { -->
																	<option <!-- php: = ($value->dyspnoea == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Chest
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="chest" id="chest" >
															<option value="<!-- php: = $value->chest -->">Select...</option>
															<!-- php: foreach($chest as $key => $selectVal) { -->
																	<option <!-- php: = ($value->chest == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
											    <div class="form-group row">
													<label class="control-label col-md-5">Apex Beat Location
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->apex_beat_location -->" name="apex_beat_location" data-required="0" placeholder="Enter apex beat location" class="form-control input-height" /> 
													</div>
												</div>
												
												 <div class="form-group row">
													<label class="control-label col-md-5">Percussion
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->percussion -->" name="percussion" data-required="0" placeholder="Enter percussion" class="form-control input-height" /> 
													</div>
												</div>
												
												 <div class="form-group row">
													<label class="control-label col-md-5">First Hand Sound
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->first_heart_sound -->" name="first_heart_sound" data-required="0" placeholder="Enter first hand sound" class="form-control input-height" /> 
													</div>
												</div>
												
												 <div class="form-group row">
													<label class="control-label col-md-5">Second Heart Sound
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->second_heart_sound -->" name="second_heart_sound" data-required="0" placeholder="Enter second heart sound" class="form-control input-height" /> 
													</div>
												</div>
												
												 <div class="form-group row">
													<label class="control-label col-md-5">Murmurs and Added Sounds
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->murmurs_and_added_sounds -->" name="murmurs_and_added_sounds" data-required="0" placeholder="Enter murmers and added sounds" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Pulse</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->pulse : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Rate</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->rate : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Rhythm</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->rhythm : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Volume</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->volume : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Character</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->character : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Vessel Walls</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->vessel_walls : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Radio-Femoral Delay</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->radio_femoral_delay : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Blood Pressure</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->blood_pressure : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Jugular Venous Pressure</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->jugular_venous_pressure : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Variscosities</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->variscosities : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Oedema Heart</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->oedema_heart : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Oedema Heart Comments</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->oedema_heart_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dyspnoea</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->dyspnoea : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Chest</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->chest : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Apex Beat Location</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->apex_beat_location : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Percussion</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->percussion : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>First Heart Sound</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->first_heart_sound : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Second Heart Sound</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->second_heart_sound : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Murmurs and Added Sounds</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->murmurs_and_added_sounds : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationObstetricpelvicexamBack() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
