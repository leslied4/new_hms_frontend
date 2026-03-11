const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_obstetricpelvic') ? $selectedVisit->patient_examination_obstetricpelvic : null; -->
<!-- php: $score = null; $length = 0; $dilation = 0; $effacement = 0; $position = 0; $consistency = 0; $station = 0; if($value != null) { if($value->length != null){ if($value->length == '>2cm'){ $length = 0; } else if($value->length == '>1-2cm'){ $l... -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Obstetric exam (Pelvics)</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addObstetricPelvicExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update obstetricpelvics Examination
				</a>
				
				
				<div class="modal fade" id="addObstetricPelvicExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add obstetricpelvics Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addObstetricPelvicExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	
	                                            
												<h4>Vulva</h4>
												<div class="form-group row">
													<label class="control-label col-md-5">Blood Stained
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="blood_stained" id="blood_stained" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Blood Stain Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="blood_stained_comment" data-required="0" placeholder="Enter blood stain details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Discharges
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="discharges" id="discharges" >
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
														<input type="text" name="discharges_comment" data-required="0" placeholder="Enter discharge details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Masses
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="masses" id="masses" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5"> Masses Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="masses_comment" data-required="0" placeholder="Enter masses details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Superficial Veins
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="superficial_veins" id="superficial_veins" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
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
												
												<h4>Cervix</h4>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" name="other_findings" data-required="0" placeholder="Enter other findings" class="form-control input-height" /> 
													</div>
												</div>
												
												<h4>Cervix </h4>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Length(cm)
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="length" id="length" onchange="javascript:updateBishopScore();" >
															<option value="">Select...</option>
															<!-- php: foreach($Length as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														<!-- input type="number" min="0" name="length" data-required="0" placeholder="Enter length" class="form-control input-height" / --> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Dilation
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="dilation" id="dilation" onchange="javascript:updateBishopScore();" >
															<option value="">Select...</option>
															<!-- php: foreach($Dilation as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Consistency
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="consistency" id="consistency" onchange="javascript:updateBishopScore();" >
															<option value="">Select...</option>
															<!-- php: foreach($Consistency as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Position
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="position" id="position" onchange="javascript:updateBishopScore();" >
															<option value="">Select...</option>
															<!-- php: foreach($Position as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Station
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="station" id="station" onchange="javascript:updateBishopScore();" >
															<option value="">Select...</option>
															<!-- php: foreach($Station as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Effacement (%)
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" max="100" name="effacement" id="effacement" data-required="0" placeholder="Effacement" class="form-control input-height" onchange="javascript:updateBishopScore();" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">BISHOP SCORE
													
													</label>
													<div class="col-md-7">
														<input type="text" name="bishop_score" id="bishop_score" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Membranes
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="membranes" id="membranes" >
															<option value="">Select...</option>
															<!-- php: foreach($Membranes as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Artificial ROM
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="artificial_rom" id="artificial_rom" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Artificial ROM Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="artificial_rom_comment" data-required="0" placeholder="Enter artificial rom details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Amniotic Fluid
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="amniotic_fluid" id="amniotic_fluid" >
															<option value="">Select...</option>
															<!-- php: foreach($AmnioticFluid as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Moulding
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="moulding" id="moulding" >
															<option value="">Select...</option>
															<!-- php: foreach($Moulding as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Caput
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="caput" id="caput" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Position
													
													</label>
													<div class="col-md-7">
														<input type="text" name="position_cervix" data-required="0" placeholder="Enter position" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Pelvimetry
													
													</label>
													<div class="col-md-7">
														<input type="text" name="pelvimetry" data-required="0" placeholder="Enter pelvimetry" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" name="pelvimetry" data-required="0" placeholder="Enter pelvimetry" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editObstetricPelvicExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update obstetricpelvics Examination
				</a>
				
				<div class="modal fade" id="editObstetricPelvicExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update obstetricpelvics Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editObstetricPelvicExamination', $value->id], 'class' => 'form-horizontal']) -->
										
										<div class="form-group row">
													<label class="control-label col-md-5">Blood Stained
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="blood_stained" id="blood_stained" >
															<option value="<!-- php: = $value->blood_stained -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->blood_stained == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Blood Stained Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->blood_stained_comment -->" name="blood_stained_comment" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Discharges
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="discharges" id="discharges" >
															<option value="<!-- php: = $value->discharges -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->discharges == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Discharge Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->discharges_comment -->" name="discharges_comment" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Masses
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="masses" id="masses" >
															<option value="<!-- php: = $value->masses -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->masses == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Masses Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->masses_comment -->" name="masses_comment" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->other_findings -->" name="other_findings" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<h4>Cervix </h4>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Length(cm)
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="length" id="length_edit" onchange="updateBishopScoreEdit();" >
															<option value="<!-- php: = $value->length -->">Select...</option>
															<!-- php: foreach($Length as $key => $selectVal) { -->
																	<option <!-- php: = ($value->length == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Dilation
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="dilation" id="dilation_edit" onchange="updateBishopScoreEdit();" >
															<option value="<!-- php: = $value->dilation -->">Select...</option>
															<!-- php: foreach($Dilation as $key => $selectVal) { -->
																	<option <!-- php: = ($value->dilation == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Consistency
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="consistency" id="consistency_edit" onchange="updateBishopScoreEdit();" >
															<option value="<!-- php: = $value->consistency -->">Select...</option>
															<!-- php: foreach($Consistency as $key => $selectVal) { -->
																	<option <!-- php: = ($value->consistency == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Position
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="position" id="position_edit" onchange="updateBishopScoreEdit();" >
															<option value="<!-- php: = $value->position -->">Select...</option>
															<!-- php: foreach($Position as $key => $selectVal) { -->
																	<option <!-- php: = ($value->position == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Station
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="station" id="station_edit" onchange="updateBishopScoreEdit();" >
															<option value="<!-- php: = $value->station -->">Select...</option>
															<!-- php: foreach($Station as $key => $selectVal) { -->
																	<option <!-- php: = ($value->station == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Effacement (%)
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" max="100" value="<!-- php: = $value->effacement -->" name="effacement" id="effacement_edit" data-required="0" placeholder="" class="form-control input-height" onchange="updateBishopScoreEdit();" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">BISHOP SCORE
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->bishop_score != null && trim($value->bishop_score) != '' ? $score : $score -->" name="bishop_score" id="bishop_score_edit" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Membranes
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="membranes" id="membranes" >
															<option value="<!-- php: = $value->membranes -->">Select...</option>
															<!-- php: foreach($Membranes as $key => $selectVal) { -->
																	<option <!-- php: = ($value->membranes == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Artificial ROM
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="artificial_rom" id="artificial_rom" >
															<option value="<!-- php: = $value->artificial_rom -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->artificial_rom == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Artificial ROM Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->artificial_rom_comment -->" name="artificial_rom_comment" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Amniotic Fluid
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="amniotic_fluid" id="amniotic_fluid" >
															<option value="<!-- php: = $value->amniotic_fluid -->">Select...</option>
															<!-- php: foreach($AmnioticFluid as $key => $selectVal) { -->
																	<option <!-- php: = ($value->amniotic_fluid == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Moulding
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="moulding" id="moulding" >
															<option value="<!-- php: = $value->moulding -->">Select...</option>
															<!-- php: foreach($Moulding as $key => $selectVal) { -->
																	<option <!-- php: = ($value->moulding == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Caput
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="caput" id="caput" >
															<option value="<!-- php: = $value->caput -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->caput == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Position
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->position -->" name="position_cervix" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Pelvimetry
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->pelvimetry -->" name="pelvimetry" data-required="0" placeholder="" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Other Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->other_findings -->" name="other_findings" data-required="0" placeholder="" class="form-control input-height" /> 
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
				
				<!-- php: } -->
			</div>
			
			<div style="clear: both"></div>

			<h4>Vulva</h4>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Blood Stained </b> <a class="pull-right"><!-- php: = (isset($value) ? $value->blood_stained : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Blood Stained Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->blood_stained_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharges</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharges : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharge Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharges_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Masses</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->masses : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Masses Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->masses_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Other  Findings</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_findings : 'N/A') -->&nbsp;&nbsp;</a>
				</li>

				<h4> Cervix </h4>

				<li class="list-group-item">
					&nbsp;&nbsp;<b>Length(cm)</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->length : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dilation</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->dilation : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Consistency</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->consistency : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Position</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->position : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Station</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->station : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Effacement</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->effacement : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>BISHOP SCORE</b> <a class="pull-right"><!-- php: = (isset($value) ? ($value->bishop_score != null && trim($value->bishop_score) != '' ? $score : $score) : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Membranes</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->membranes : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Artificial ROM</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->artificial_rom : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Artificial ROM Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->artificial_rom_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Amniotic Fluid</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->amniotic_fluid : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Moulding</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->moulding : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Caput</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->caput : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Position</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->position : 'N/A') -->&nbsp;&nbsp;</a>
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

<script>
	function updateBishopScore() {
		length = 0;
		dilation = 0;
		effacement = 0;
		position = 0;
		consistency = 0;
		station = 0;
		
		if($('#length').val() == '>2cm'){
			length = 0;
		}
		else if($('#length').val() == '>1-2cm'){
			length = 1;
		}
		else if($('#length').val() == '>0.5-1cm'){
			length = 2;
		}
		else if($('#length').val() == '<0.5cm'){
			length = 3;
		}

		if($('#dilation').val() == '0'){
			dilation = 0;
		}
		else if($('#dilation').val() == '1' || $('#dilation').val() == '2'){
			dilation = 1;
		}
		else if($('#dilation').val() == '3' || $('#dilation').val() == '4'){
			dilation = 2;
		}
		else if($('#dilation').val() >= 5){
			dilation = 3;
		}

		if($('#station').val() == '-3'){
			station = 0;
		}
		else if($('#station').val() == '-2'){
			station = 1;
		}
		else if($('#station').val() == '-1' || $('#station').val() == '0'){
			station = 2;
		}
		else if($('#station').val() == '1' || $('#station').val() == '2'){
			station = 3;
		}

		if($('#effacement').val() <= 30){
			effacement = 0;
		}
		else if($('#effacement').val() <= 50){
			effacement = 1;
		}
		else if($('#effacement').val() <= 70){
			effacement = 2;
		}
		else if($('#effacement').val() > 70){
			effacement = 3;
		}

		if($('#position').val() == 'Posterior'){
			position = 0;
		}
		else if($('#position').val() == 'Central'){
			position = 1;
		}
		else if($('#position').val() == 'Anterior'){
			position = 2;
		}
		
		if($('#consistency').val() == 'Firm'){
			consistency = 0;
		}
		else if($('#consistency').val() == 'Medium'){
			consistency = 1;
		}
		else if($('#consistency').val() == 'Soft'){
			consistency = 2;
		}
		
		score = length + dilation + effacement + position + consistency + station;
		$('#bishop_score').val(score);
		
	}
	
	function updateBishopScoreEdit() {
		
		length = 0;
		dilation = 0;
		effacement = 0;
		position = 0;
		consistency = 0;
		station = 0;
		
		if($('#length_edit').val() == '>2cm'){
			length = 0;
		}
		else if($('#length_edit').val() == '>1-2cm'){
			length = 1;
		}
		else if($('#length_edit').val() == '>0.5-1cm'){
			length = 2;
		}
		else if($('#length_edit').val() == '<0.5cm'){
			length = 3;
		}

		if($('#dilation_edit').val() == '0'){
			dilation = 0;
		}
		else if($('#dilation_edit').val() == '1' || $('#dilation_edit').val() == '2'){
			dilation = 1;
		}
		else if($('#dilation_edit').val() == '3' || $('#dilation_edit').val() == '4'){
			dilation = 2;
		}
		else if($('#dilation_edit').val() >= 5){
			dilation = 3;
		}

		if($('#station_edit').val() == '-3'){
			station = 0;
		}
		else if($('#station_edit').val() == '-2'){
			station = 1;
		}
		else if($('#station_edit').val() == '-1' || $('#station_edit').val() == '0'){
			station = 2;
		}
		else if($('#station_edit').val() == '1' || $('#station_edit').val() == '2'){
			station = 3;
		}

		if($('#effacement_edit').val() <= 30){
			effacement = 0;
		}
		else if($('#effacement_edit').val() <= 50){
			effacement = 1;
		}
		else if($('#effacement_edit').val() <= 70){
			effacement = 2;
		}
		else if($('#effacement_edit').val() > 70){
			effacement = 3;
		}

		if($('#position_edit').val() == 'Posterior'){
			position = 0;
		}
		else if($('#position_edit').val() == 'Central'){
			position = 1;
		}
		else if($('#position_edit').val() == 'Anterior'){
			position = 2;
		}
		
		if($('#consistency_edit').val() == 'Firm'){
			consistency = 0;
		}
		else if($('#consistency_edit').val() == 'Medium'){
			consistency = 1;
		}
		else if($('#consistency_edit').val() == 'Soft'){
			consistency = 2;
		}
		
		score = length + dilation + effacement + position + consistency + station;
		$('#bishop_score_edit').val(score);
		
	}
</script>
`;

export default function ElementElementPatientvisitExaminationObstetricpelvicexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
