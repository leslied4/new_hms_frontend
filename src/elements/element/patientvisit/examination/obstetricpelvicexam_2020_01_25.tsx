const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_obstetricpelvic') ? $selectedVisit->patient_examination_obstetricpelvic : null; -->
<!-- php: $Moulding = [ '0' => '0', '1' => '1', '2' => '2', '3' => '3' ]; $AmnioticFluid = [ 'Clear' => 'Clear', 'G1 meconium' => 'G1 meconium', 'G2 meconium' => 'G2 meconium', 'G3 meconium' => 'G3 meconium', 'Blood stained' => 'Blood Stained' ]; $Me... -->
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
														<input type="text" name="blood_stain_details" data-required="0" placeholder="Enter blood stain details" class="form-control input-height" /> 
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
														<input type="text" name="discharge_details" data-required="0" placeholder="Enter discharge details" class="form-control input-height" /> 
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
														<input type="text" name="masses_details" data-required="0" placeholder="Enter masses details" class="form-control input-height" /> 
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
														<input type="text" name="length" data-required="0" placeholder="Enter length" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Dilation
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="dilation" id="dilation" >
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
														
														<SearchableSelectField class="form-control input-height" name="consistency" id="consistency" >
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
														
														<SearchableSelectField class="form-control input-height" name="position" id="position" >
															<option value="">Select...</option>
															<!-- php: foreach($Consistency as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Station
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="station" id="station" >
															<option value="">Select...</option>
															<!-- php: foreach($Station as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">BISHOP SCORE
													
													</label>
													<div class="col-md-7">
														<input type="text" name="bishop_score" data-required="0" placeholder="" class="form-control input-height" /> 
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
														<input type="text" name="artificial_rom_details" data-required="0" placeholder="Enter artificial rom details" class="form-control input-height" /> 
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
														<input type="text" name="position" data-required="0" placeholder="Enter position" class="form-control input-height" /> 
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
														<input type="text" value="<!-- php: = $value->blood_stain_details -->" name="blood_stain_details" data-required="0" placeholder="" class="form-control input-height" /> 
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
													<label class="control-label col-md-5">Discharges
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->discharge_details -->" name="discharge_details" data-required="0" placeholder="" class="form-control input-height" /> 
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
														<input type="text" value="<!-- php: = $value->masses_details -->" name="masses_details" data-required="0" placeholder="" class="form-control input-height" /> 
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
														
														<SearchableSelectField class="form-control input-height" name="length" id="length" >
															<option value="<!-- php: = $value->length -->"
															>Select...</option>
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
														
														<SearchableSelectField class="form-control input-height" name="dilation" id="dilation" >
															<option value="<!-- php: = $value->dilation -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->dilation == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Consistency
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="consistency" id="consistency" >
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
														
														<SearchableSelectField class="form-control input-height" name="position" id="position" >
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
														
														<SearchableSelectField class="form-control input-height" name="station" id="station" >
															<option value="<!-- php: = $value->station -->">Select...</option>
															<!-- php: foreach($Station as $key => $selectVal) { -->
																	<option <!-- php: = ($value->station == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">BISHOP SCORE
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->bishop_score -->" name="bishop_score" data-required="0" placeholder="" class="form-control input-height" /> 
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
														<input type="text" value="<!-- php: = $value->artificial_rom_details -->" name="artificial_rom_details" data-required="0" placeholder="" class="form-control input-height" /> 
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
														<input type="text" value="<!-- php: = $value->position -->" name="position" data-required="0" placeholder="" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Blood Stained Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->blood_stained_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharges</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharges : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharge Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharge_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Masses</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->masses : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Masses Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->masses_details : 'N/A') -->&nbsp;&nbsp;</a>
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
					&nbsp;&nbsp;<b>BISHOP SCORE</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->bishop_score : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Membranes</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->membranes : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Artificial ROM</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->artificial_rom : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Artificial ROM Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->artificial_rom_details : 'N/A') -->&nbsp;&nbsp;</a>
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


`;

export default function ElementElementPatientvisitExaminationObstetricpelvicexam20200125() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
