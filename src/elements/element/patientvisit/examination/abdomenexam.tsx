const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_abdomen') ? $selectedVisit->patient_examination_abdomen : null; -->
<!-- php: $Skins = [ 'Normal' => 'Normal', 'Wrinkled' => 'Wrinkled', 'Shiny' => 'Shiny', 'Tense' => 'Tense', 'Oedematous' => 'Oedematous' ]; $Contours = [ 'Retracted' => 'Retracted', 'Flat' => 'Flat', 'Full' => 'Full', 'Distended' => 'Distended' ]; $... -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Abdomen Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addAbdomenExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Abdomen Examination
				</a>
				
				
				<div class="modal fade" id="addAbdomenExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Abdomen Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addAbdomenExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Skin
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="skin" id="skin" >
															<option value="">Select...</option>
															<!-- php: foreach($Skins as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Contour
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="contour" id="contour" >
															<option value="">Select...</option>
															<!-- php: foreach($Contours as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Symmetry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="symmetry" id="symmetry" >
															<option value="">Select...</option>
															<!-- php: foreach($Symmetries as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Movement
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="movement" id="movement" >
															<option value="">Select...</option>
															<!-- php: foreach($Movements as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Umbilicus
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="umbilicus" id="umbilicus" >
															<option value="">Select...</option>
															<!-- php: foreach($Umbilicusses as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Hair Distribution
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="hair_distribution" id="hair_distribution" >
															<option value="">Select...</option>
															<!-- php: foreach($HairDistributions as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Visible Viens
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="visible_veins" id="visible_veins" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Visible Veins Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="visible_veins_details" data-required="0" placeholder="Enter visible vein details" class="form-control input-height" /> 
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
													<label class="control-label col-md-5">Light Palpation
													
													</label>
													<div class="col-md-7">
														<input type="text" name="light_palpation" data-required="0" placeholder="Enter light palpation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Liver
													
													</label>
													<div class="col-md-7">
														<input type="text" name="liver" data-required="0" placeholder="Enter liver" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Spleen
													
													</label>
													<div class="col-md-7">
														<input type="text" name="spleen" data-required="0" placeholder="Enter spleen" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Kidneys
													
													</label>
													<div class="col-md-7">
														<input type="text" name="kidneys" data-required="0" placeholder="Enter kidneys" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Uterus
													
													</label>
													<div class="col-md-7">
														<input type="text" name="uterus" data-required="0" placeholder="Enter uterus" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Masses
													
													</label>
													<div class="col-md-7">
														<input type="text" name="other_masses" data-required="0" placeholder="Enter other masses" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Hernial Orifices
													
													</label>
													<div class="col-md-7">
														<input type="text" name="hernial_orifices" data-required="0" placeholder="Enter hernial orifices" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">External Genitalia
													
													</label>
													<div class="col-md-7">
														<input type="text" name="external_genitalia" data-required="0" placeholder="Enter external genitalia" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Rectal Exam
													
													</label>
													<div class="col-md-7">
														<input type="text" name="rectal_exam" data-required="0" placeholder="Enter rectal exam" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Bowel Sounds
													
													</label>
													<div class="col-md-7">
														<input type="text" name="bowel_sounds" data-required="0" placeholder="Enter bowel sounds" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Volume
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="volume" id="volume" >
															<option value="">Select...</option>
															<!-- php: foreach($Volumes as $key => $selectVal) { -->
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
				<a data-toggle="modal" data-target="#editAbdomenExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Abdomen Examination
				</a>
				
				<div class="modal fade" id="editAbdomenExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Abdomen Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editAbdomenExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Skin
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->skin -->" name="skin" id="skin" >
															<option value="">Select...</option>
															<!-- php: foreach($Skins as $key => $selectVal) { -->
																	<option <!-- php: = ($value->skin == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Contour
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->contour -->" name="contour" id="contour" >
															<option value="">Select...</option>
															<!-- php: foreach($Contours as $key => $selectVal) { -->
																	<option <!-- php: = ($value->contour == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Symmetry
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->symmetry -->" name="symmetry" id="symmetry" >
															<option value="">Select...</option>
															<!-- php: foreach($Symmetries as $key => $selectVal) { -->
																	<option <!-- php: = ($value->symmetry == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Movement
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->movement -->" name="movement" id="movement" >
															<option value="">Select...</option>
															<!-- php: foreach($Movements as $key => $selectVal) { -->
																	<option <!-- php: = ($value->movement == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Umbilicus
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->umbilicus -->" name="umbilicus" id="umbilicus" >
															<option value="">Select...</option>
															<!-- php: foreach($Umbilicusses as $key => $selectVal) { -->
																	<option <!-- php: = ($value->umbilicus == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Hair Distribution
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->hair_distribution -->" name="hair_distribution" id="hair_distribution" >
															<option value="">Select...</option>
															<!-- php: foreach($HairDistributions as $key => $selectVal) { -->
																	<option <!-- php: = ($value->hair_distribution == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Visible Viens
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->visible_veins -->" name="visible_veins" id="visible_veins" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->visible_veins == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Visible Veins Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->visible_veins_details -->" name="visible_veins_details" data-required="0" placeholder="Enter visible vein details" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Scars
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->scars -->" name="scars" id="scars" >
															<option value="">Select...</option>
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
													<label class="control-label col-md-5">Light Palpation
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->light_palpation -->" name="light_palpation" data-required="0" placeholder="Enter light palpation" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Liver
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->liver -->" name="liver" data-required="0" placeholder="Enter liver" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Spleen
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->spleen -->" name="spleen" data-required="0" placeholder="Enter spleen" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Kidneys
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->kidneys -->" name="kidneys" data-required="0" placeholder="Enter kidneys" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Uterus
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->uterus -->" name="uterus" data-required="0" placeholder="Enter uterus" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Masses
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->other_masses -->" name="other_masses" data-required="0" placeholder="Enter other masses" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Hernial Orifices
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->hernial_orifices -->" name="hernial_orifices" data-required="0" placeholder="Enter hernial orifices" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">External Genitalia
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->external_genitalia -->" name="external_genitalia" data-required="0" placeholder="Enter external genitalia" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Rectal Exam
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->rectal_exam -->" name="rectal_exam" data-required="0" placeholder="Enter rectal exam" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Bowel Sounds
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->bowel_sounds -->" name="bowel_sounds" data-required="0" placeholder="Enter bowel sounds" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Volume
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->bowel_sounds -->" name="volume" id="volume" >
															<option value="">Select...</option>
															<!-- php: foreach($Volumes as $key => $selectVal) { -->
																	<option <!-- php: = ($value->bowel_sounds == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
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
			
			<h4>Inspection</h4>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Skin</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->skin : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Contour</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->contour : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Symmetry</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->symmetry : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Movement</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->movement : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Umbilicus</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->umbilicus : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Hair Distribution</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->hair_distribution : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Visible Veins</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->visible_veins : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Visible Veins Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->visible_veins_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Scars</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->scars : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Scars Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->scars_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h4>Palpation</h4>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Light Palpation</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->light_palpation : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Liver</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->liver : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Spleen</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->spleen : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Kidneys</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->kidneys : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Uterus</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->uterus : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Other Masses</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_masses : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Hernial Orifices</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->hernial_orifices : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>External Genitalia</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->external_genitalia : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Rectal Exam</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->rectal_exam : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h4>Percussion</h4>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Volume</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->volume : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h4>Auscultation</h4>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Bowel Sounds</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->bowel_sounds : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationAbdomenexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
