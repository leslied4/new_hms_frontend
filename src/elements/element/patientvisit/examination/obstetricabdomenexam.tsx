const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_obstetricabdomen') ? $selectedVisit->patient_examination_obstetricabdomen : null; -->
<!-- php: $foetal_lie = [ 'Longitudinal' => 'Longitudinal', 'Oblique' => 'Oblique', 'Transverse' => 'Transverse' ]; $presentation = [ '1/5' => '1/5', '2/5' => '2/5', '3/5' => '3/5', '4/5' => '4/5', '5/5' => '5/5' ]; $descent = [ 'Cephalic' => 'Cephal... -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Obstetric exam (abdomen)</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addobstetricabdomensExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update obstetricabdomens Examination
				</a>
				
				
				<div class="modal fade" id="addobstetricabdomensExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add obstetricabdomens Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addObstetricabdomenExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">	
	                                            
												
												<div class="form-group row">
													<label class="control-label col-md-5">Asymmetry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="asymmetry" id="asymmetry" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Linea Nigra
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="linea_nigra" id="linea_nigra" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
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
													<label class="control-label col-md-5">Scars
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="scars" id="scars" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Scars Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="scars_details" data-required="0" placeholder="Enter scars details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Foetal Movements
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="foetal_movements" id="foetal_movements" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Straie Gravidarum
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="straie_gravidarum" id="straie_gravidarum" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Gestational Age
													
													</label>
													<div class="col-md-7">
														<input type="text" name="gestational_age" data-required="0" placeholder="Enter gestational age" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Symphysiofundal Height
													
													</label>
													<div class="col-md-7">
														<input type="text" name="symphysiofundal_height" data-required="0" placeholder="Enter gestational age" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Foetal Poles
													
													</label>
													<div class="col-md-7">
														<input type="text" name="foetal_poles" data-required="0" placeholder="Enter gestational age" class="form-control input-height" /> 
													</div>
												</div>
												
												
												
															
												<div class="form-group row">
													<label class="control-label col-md-5">Foetal Lie
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="foetal_lie" id="foetal_lie" >
															<option value="">Select...</option>
															<!-- php: foreach($foetal_lie as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Presentation
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="presentation" id="presentation" >
															<option value="">Select...</option>
															<!-- php: foreach($presentation as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Descent
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="descent" id="descent" >
															<option value="">Select...</option>
															<!-- php: foreach($descent as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Back of Baby
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="back_of_baby" id="back_of_baby" >
															<option value="">Select...</option>
															<!-- php: foreach($back_of_baby as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Contractions
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="contractions" id="contractions" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Contractions Frequency (10 min)
													
													</label>
													<div class="col-md-7">
														<input type="text" name="contractions_frequency" data-required="0" placeholder="Enter contractions frequency" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Contractions Duration (seconds)
													
													</label>
													<div class="col-md-7">
														<input type="text" name="contractions_duration" data-required="0" placeholder="Enter contractions duration" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Cardiotocograph
													
													</label>
													<div class="col-md-7">
														<input type="text" name="cardiotocograph" data-required="0" placeholder="Enter cardiotocograph" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editobstetricabdomensExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update obstetricabdomens Examination
				</a>
				
				<div class="modal fade" id="editobstetricabdomensExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update obstetricabdomens Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editObstetricabdomenExamination', $value->id], 'class' => 'form-horizontal']) -->
										
										<div class="form-group row">
													<label class="control-label col-md-5">Asymmetry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="asymmetry" id="asymmetry" >
															<option value="<!-- php: = $value->asymmetry -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->asymmetry == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Linea Nigra
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="linea_nigra" id="linea_nigra" >
															<option value="<!-- php: = $value->linea_nigra -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->linea_nigra == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Superficial Veins
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="superficial_veins" id="superficial_veins" >
															<option value="<!-- php: = $value->superficial_veins -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->superficial_veins == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Scars
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="scars" id="scars" >
															<option value="<!-- php: = $value->scars -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->scars == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Scars Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->scars_details -->" name="scars_details" data-required="0" placeholder="Enter scars details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Foetal Movements
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="foetal_movements" id="foetal_movements" >
															<option value="<!-- php: = $value->foetal_movements -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->foetal_movements == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Straie Gravidarum
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="straie_gravidarum" id="straie_gravidarum" >
															<option value="<!-- php: = $value->straie_gravidarum -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->straie_gravidarum == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Gestational Age
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->gestational_age -->" name="gestational_age" data-required="0" placeholder="Enter gestational age" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Symphysiofundal Height
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->symphysiofundal_height -->" name="symphysiofundal_height" data-required="0" placeholder="Enter gestational age" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Foetal Poles
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->foetal_poles -->" name="foetal_poles" data-required="0" placeholder="Enter gestational age" class="form-control input-height" /> 
													</div>
												</div>
												
												
												
															
												<div class="form-group row">
													<label class="control-label col-md-5">Foetal Lie
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="foetal_lie" id="foetal_lie" >
															<option value="<!-- php: = $value->foetal_lie -->">Select...</option>
															<!-- php: foreach($foetal_lie as $key => $selectVal) { -->
																	<option <!-- php: = ($value->foetal_lie == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Presentation
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="presentation" id="presentation" >
															<option value="<!-- php: = $value->presentation -->">Select...</option>
															<!-- php: foreach($presentation as $key => $selectVal) { -->
																	<option <!-- php: = ($value->presentation == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Descent
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="descent" id="descent" >
															<option value="<!-- php: = $value->descent -->">Select...</option>
															<!-- php: foreach($descent as $key => $selectVal) { -->
																	<option <!-- php: = ($value->descent == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Back of Baby
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="back_of_baby" id="back_of_baby" >
															<option value="<!-- php: = $value->back_of_baby -->">Select...</option>
															<!-- php: foreach($back_of_baby as $key => $selectVal) { -->
																	<option <!-- php: = ($value->back_of_baby == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Contractions
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="contractions" id="contractions" >
															<option value="<!-- php: = $value->contractions -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->contractions == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Contractions Frequency (10 min)
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->contractions_frequency -->" name="contractions_frequency" data-required="0" placeholder="Enter contractions frequency" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Contractions Duration (seconds)
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->contractions_duration -->" name="contractions_duration" data-required="0" placeholder="Enter contractions duration" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Cardiotocograph
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->cardiotocograph -->" name="cardiotocograph" data-required="0" placeholder="Enter cardiotocograph" class="form-control input-height" /> 
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
								
				<!-- php: } -->
				
			</div>
			
			<div style="clear: both"></div>
			
			<h4>Inspection</h4>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Asymmetry</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->asymmetry : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Linea Nigra</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->linea_nigra : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Superficial Veins</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->superficial_veins : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Scars</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->scars : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Scars Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->scars_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Foetal Movements</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->foetal_movements : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Straie Gravidarum</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->straie_gravidarum : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Gestational Age</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->gestational_age : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Symphysiofundal Height</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->symphysiofundal_height : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Foetal Poles</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->foetal_poles : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Foetal Lie</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->foetal_lie : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Presentation</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->presentation : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Descent</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->descent : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Contractions</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->contractions : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Contractions Frequency (10 mins)</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->contractions_frequency : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Contractions Duration (seconds)</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->contractions_duration : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cardiotocograph</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cardiotocograph : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Other Findings</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_findings : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			
		</div>
	</div>
</div>
		

`;

export default function ElementElementPatientvisitExaminationObstetricabdomenexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
