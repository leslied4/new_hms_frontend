const rawHtml = `
<!-- php: $value = $patientHistoryGynaecologic; -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Gynaecologic History</h4>
			</div>
			<div style="float: right">
				
				<!-- php: if(!isset($value) || $value == null) { -->
				<p align="left">
					<a data-toggle="modal" data-target="#addPastGynaecologicHistoryDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
						Add Gynaecologic History
					</a>
				</p>
				
				
				<div class="modal fade" id="addPastGynaecologicHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Gynaecologic history</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastGynaecologic', $patient->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
												
												<div class="form-group row">
													<label class="control-label col-md-5">Date of last menstrual period
													
													</label>
													<div class="col-md-7">
														
														<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input10" data-link-format="yyyy-mm-dd">
															<input class="form-control input-height" size="16" placeholder="Enter date of last menstrual period" data-required="0" name = "date_of_last_menstrual_period" id = "date_of_last_menstrual_period" type="text"  >
															<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
														</div>
														<input type="hidden" id="dtp_input10" value="" />
														
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Menarche
													
													</label>
													<div class="col-md-7">
														<input type="text" name="menarche" data-required="0" placeholder="Enter mernache" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Menopause
													
													</label>
													<div class="col-md-7">
														<input type="text" name="menopause" data-required="0" placeholder="Enter menopause" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Cycle Length (Days)
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" name="cycle_length" data-required="0" placeholder="Enter cycle length" class="form-control input-height" /> 
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Duration of Bleed (Days)
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" name="duration_of_bleed" data-required="0" placeholder="Enter duration of bleed" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Volume
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="volume" id="volume" >
															<option>Select</option>
															<option value="Spotting">Spotting</option>
															<option value="Moderate">Moderate</option>
															<option value="Heavy">Heavy</option>
															<option value="Clots">Clots</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Intermenstrual Bleeding
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="intermenstrual_bleeding" id="intermenstrual_bleeding" >
															<option>Select</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Intermenstrual Bleeding Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="intermenstrual_bleeding_details" data-required="0" placeholder="Enter intermenstrual bleeding details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dysmenorrhoea
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="dysmenorrhoea" id="dysmenorrhoea" >
															<option>Select</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dysmenorrhoea Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="dysmenorrhoea_details" data-required="0" placeholder="Enter dysmenorrhoea details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Post Coital Bleeding
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="post_coital_bleeding" id="post_coital_bleeding" >
															<option>Select</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Post Coital Bleeding Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="post_coital_bleeding_details" data-required="0" placeholder="Enter post coital bleeding details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dyspareunia
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="dyspareunia" id="dyspareunia" >
															<option>Select</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dyspareunia Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="dyspareunia_details" data-required="0" placeholder="Enter dyspareunia details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Number of Lifetime Sexual Partners
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" name="number_of_lifetime_sexual_partners" data-required="0" placeholder="Enter number of lifetime sexual partners" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Coital Frequency (Days per Week)
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" name="coital_frequency" data-required="0" placeholder="Enter coital frequency" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Cancer Screening
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="cervical_cancer_screening" id="cervical_cancer_screening" >
															<option>Select</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Cancer Screening Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="cervical_cancer_screening_details" data-required="0" placeholder="Enter cervical cancer screening details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Breast Screening
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="breast_screening" id="breast_screening" >
															<option>Select</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Breast Screening Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="breast_screening_details" data-required="0" placeholder="Enter breast screening details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Previous Gynaecologic Procedures
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="previous_gynaecologic_procedures" id="previous_gynaecologic_procedures" >
															<option>Select</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Previous Gynaecologic Procedures Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="previous_gynaecologic_procedures_details" data-required="0" placeholder="Enter previous gynaecologic procedures details" class="form-control input-height" /> 
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
				<p align="left">
					<a data-toggle="modal" data-target="#editPastGynaecologicHistoryDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
						Update Gynaecologic History
					</a>
				</p>
				
				<div class="modal fade" id="editPastGynaecologicHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Gynaecologic history</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'editPastGynaecologic', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
												
												<div class="form-group row">
													<label class="control-label col-md-5">Date of last menstrual period
													
													</label>
													<div class="col-md-7">
														
														<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input10" data-link-format="yyyy-mm-dd">
															<input class="form-control input-height" value="<!-- php: = $value->date_of_last_menstrual_period != null ? $value->date_of_last_menstrual_period->i18nFormat('yyyy-MM-dd') : '' -->" size="16" placeholder="Enter date of last menstrual period" data-required="0" name = "date_of_last_menstrual_period" id = "date_of_last_menstrual_period" type="text"  >
															<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
														</div>
														<input type="hidden" id="dtp_input10" value="" />
														
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Menarche
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->menarche -->" name="menarche" data-required="0" placeholder="Enter mernache" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Menopause
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->menopause -->" name="menopause" data-required="0" placeholder="Enter menopause" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Cycle Length (Days)
													
													</label>
													<div class="col-md-7">
														<input type="number" value="<!-- php: = $value->cycle_length -->" min="0" step="1" name="cycle_length" data-required="0" placeholder="Enter cycle length" class="form-control input-height" /> 
													</div>
												</div>
	
												<div class="form-group row">
													<label class="control-label col-md-5">Duration of Bleed (Days)
													
													</label>
													<div class="col-md-7">
														<input type="number" value="<!-- php: = $value->duration_of_bleed -->" min="0" step="1" name="duration_of_bleed" data-required="0" placeholder="Enter duration of bleed" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Volume
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->volume -->" name="volume" id="volume" >
															<option>Select</option>
															<option value="Spotting" <!-- php: = $value->volume == 'Spotting' ? 'selected="selected"' : '' --> >Spotting</option>
															<option value="Moderate" <!-- php: = $value->volume == 'Moderate' ? 'selected="selected"' : '' --> >Moderate</option>
															<option value="Heavy" <!-- php: = $value->volume == 'Heavy' ? 'selected="selected"' : '' --> >Heavy</option>
															<option value="Clots" <!-- php: = $value->volume == 'Clots' ? 'selected="selected"' : '' --> >Clots</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Intermenstrual Bleeding
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField value="<!-- php: = $value->intermenstrual_bleeding -->" class="form-control input-height" name="intermenstrual_bleeding" id="intermenstrual_bleeding" >
															<option>Select</option>
															<option value="Yes" <!-- php: = $value->intermenstrual_bleeding == 'Yes' ? 'selected="selected"' : '' --> >Yes</option>
															<option value="No" <!-- php: = $value->intermenstrual_bleeding == 'No' ? 'selected="selected"' : '' --> >No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Intermenstrual Bleeding Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->intermenstrual_bleeding_details -->" name="intermenstrual_bleeding_details" data-required="0" placeholder="Enter intermenstrual bleeding details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dysmenorrhoea
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField value="<!-- php: = $value->dysmenorrhoea -->" class="form-control input-height" name="dysmenorrhoea" id="dysmenorrhoea" >
															<option>Select</option>
															<option value="Yes" <!-- php: = $value->dysmenorrhoea == 'Yes' ? 'selected="selected"' : '' --> >Yes</option>
															<option value="No" <!-- php: = $value->dysmenorrhoea == 'No' ? 'selected="selected"' : '' --> >No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dysmenorrhoea Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->dysmenorrhoea_details -->" name="dysmenorrhoea_details" data-required="0" placeholder="Enter dysmenorrhoea details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Post Coital Bleeding
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->post_coital_bleeding -->" name="post_coital_bleeding" id="post_coital_bleeding" >
															<option>Select</option>
															<option value="Yes" <!-- php: = $value->post_coital_bleeding == 'Yes' ? 'selected="selected"' : '' --> >Yes</option>
															<option value="No" <!-- php: = $value->post_coital_bleeding == 'No' ? 'selected="selected"' : '' --> >No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Post Coital Bleeding Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->post_coital_bleeding_details -->" name="post_coital_bleeding_details" data-required="0" placeholder="Enter post coital bleeding details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dyspareunia
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->dyspareunia -->" name="dyspareunia" id="dyspareunia" >
															<option>Select</option>
															<option value="Yes" <!-- php: = $value->dyspareunia == 'Yes' ? 'selected="selected"' : '' --> >Yes</option>
															<option value="No" <!-- php: = $value->dyspareunia == 'No' ? 'selected="selected"' : '' --> >No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Dyspareunia Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->dyspareunia_details -->" name="dyspareunia_details" data-required="0" placeholder="Enter dyspareunia details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Number of Lifetime Sexual Partners
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" value="<!-- php: = $value->number_of_lifetime_sexual_partners -->" name="number_of_lifetime_sexual_partners" data-required="0" placeholder="Enter number of lifetime sexual partners" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Coital Frequency (Days per Week)
													
													</label>
													<div class="col-md-7">
														<input type="number" min="0" step="1" value="<!-- php: = $value->coital_frequency -->" name="coital_frequency" data-required="0" placeholder="Enter coital frequency" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Cancer Screening
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->cervical_cancer_screening -->" name="cervical_cancer_screening" id="cervical_cancer_screening" >
															<option>Select</option>
															<option value="Yes" <!-- php: = $value->cervical_cancer_screening == 'Yes' ? 'selected="selected"' : '' --> >Yes</option>
															<option value="No" <!-- php: = $value->cervical_cancer_screening == 'No' ? 'selected="selected"' : '' --> >No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Cancer Screening Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->cervical_cancer_screening_details -->" name="cervical_cancer_screening_details" data-required="0" placeholder="Enter cervical cancer screening details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Breast Screening
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->breast_screening -->" name="breast_screening" id="breast_screening" >
															<option>Select</option>
															<option value="Yes" <!-- php: = $value->breast_screening == 'Yes' ? 'selected="selected"' : '' --> >Yes</option>
															<option value="No" <!-- php: = $value->breast_screening == 'No' ? 'selected="selected"' : '' --> >No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Breast Screening Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->breast_screening_details -->" name="breast_screening_details" data-required="0" placeholder="Enter breast screening details" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Previous Gynaecologic Procedures
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->previous_gynaecologic_procedures -->" name="previous_gynaecologic_procedures" id="previous_gynaecologic_procedures" >
															<option>Select</option>
															<option value="Yes" <!-- php: = $value->previous_gynaecologic_procedures == 'Yes' ? 'selected="selected"' : '' --> >Yes</option>
															<option value="No" <!-- php: = $value->previous_gynaecologic_procedures == 'No' ? 'selected="selected"' : '' --> >No</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Previous Gynaecologic Procedures Details
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->previous_gynaecologic_procedures_details -->" name="previous_gynaecologic_procedures_details" data-required="0" placeholder="Enter previous gynaecologic procedures details" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Date of last menstrual period</b> <a class="pull-right"><!-- php: = (isset($value) && $value->date_of_last_menstrual_period != null ? $value->date_of_last_menstrual_period->i18nFormat('yyyy-MM-dd') : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Menarche</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->menarche : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Menopause</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->menopause : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h5>Menses</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cycle Length (days)</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cycle_length : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Duration of Bleed (days)</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->duration_of_bleed : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Volume</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->volume : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Intermenstrual Bleeding</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->intermenstrual_bleeding : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Intermenstrual Bleeding Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->intermenstrual_bleeding_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dysmenorrhoea</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->dysmenorrhoea : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dysmenorrhoea Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->dysmenorrhoea_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Post Coital Bleeding</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->post_coital_bleeding : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Post Coital Bleeding Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->post_coital_bleeding_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dyspareunia</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->dyspareunia : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Dyspareunia Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->dyspareunia_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
			<h5>Others</h5>
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Number of Lifetime Sexual Partners</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->number_of_lifetime_sexual_partners : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Coital Frequency (Days per Week)</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->coital_frequency : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cervical Cancer Screening</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cervical_cancer_screening : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cervical Cancer Screening Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cervical_cancer_screening_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Breast Screening</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->breast_screening : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Breast Screening Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->breast_screening_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Previous Gynaecologic Procedures</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->previous_gynaecologic_procedures : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Previous Gynaecologic Procedures Details</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->previous_gynaecologic_procedures_details : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
			
		</div>
	</div>
	
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			
			<div style="float: left">
				<h4>Parity History</h4>
			</div>
			<div style="float: right">
				
				<p align="left">
					<a data-toggle="modal" data-target="#addPastParityHistoryDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
						Add Parity History
					</a>
				</p>

				<div class="modal fade" id="addPastParityHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add parity</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastParity', $patient->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Gestational Age at Delivery
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="gestation_age_at_delivery" id="gestation_age_at_delivery" >
															<option>Select</option>
															<option value="Below 28wks">Less 28wks</option>
															<option value="Between 28-36wks">28-36wks</option>
															<option value="Above 36wks">Greater 36wks</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Outcome
													
													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control input-height" name="outcome" id="outcome" >
															<option>Select</option>
															<option value="Vaginal Delivery">Vaginal Delivery</option>
															<option value="CS">CS</option>
															<option value="Spontaneous Abortion">Spontaneous Abortion</option>
															<option value="Medical Termination">Medical Termination</option>
															<option value="Surgical Termination">Surgical Termination</option>
														</SearchableSelectField>
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Present Condition
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="present_condition" id="present_condition" >
															<option>Select</option>
															<option value="Alive">Alive</option>
															<option value="Dead">Dead</option>
														</SearchableSelectField>
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
			
			</div>
			
			<div style="clear: both"></div>
			
			<div class="table-scrollable">
				<table class="table table-hover table-checkable order-column full-width" id="parity_table">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Ges. Age at Del.</th>
							<th scope="col">Outcome</th>
							<th scope="col">Present Condition</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>
					<tbody>
						<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryParities as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td><!-- php: = $i --></td>
							<td><!-- php: = $value->gestation_age_at_delivery --></td>
							<td><!-- php: = $value->outcome --></td>
							<td><!-- php: = $value->present_condition --></td>
							<td class="actions">
								<a data-toggle="modal" data-target="#editPastParityHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
									Edit
								</a>
							</td>
						</tr>
						
						<div class="modal fade" id="editPastParityHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title">Edit a past parity history</h4>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								  <span aria-hidden="true">&times;</span>
								</button>
							  </div>
							  <div class="modal-body">
								
								<div class="row">
									<div class="col-md-12 col-sm-12">
										<div class="card card-box">
											<div class="card-head">
												<header>Edit Details</header>
											</div>
											<div class="card-body" id="bar-parent">
												<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'History', 'action' => 'editPastParity', $value->id], 'class' => 'form-horizontal']) -->
													<div class="form-body">
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Gestational Age at Delivery
															
															</label>
															<div class="col-md-7">
																
																<SearchableSelectField value="<!-- php: = $value->gestation_age_at_delivery -->" class="form-control input-height" name="gestation_age_at_delivery" id="gestation_age_at_delivery" >
																	<option>Select</option>
																	<option value="Below 28wks" <!-- php: = $value->gestation_age_at_delivery == 'Below 28wks' ? 'selected="selected"' : '' -->>Less 28wks</option>
																	<option value="Between 28-36wks" <!-- php: = $value->gestation_age_at_delivery == 'Between 28-36wks' ? 'selected="selected"' : '' -->>28-36wks</option>
																	<option value="Above 36wks" <!-- php: = $value->gestation_age_at_delivery == 'Above 36wks' ? 'selected="selected"' : '' -->>Greater 36wks</option>
																</SearchableSelectField>
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Outcome
															
															</label>
															<div class="col-md-7">
																<SearchableSelectField value="<!-- php: = $value->outcome -->" class="form-control input-height" name="outcome" id="outcome" >
																	<option>Select</option>
																	<option value="Vaginal Delivery" <!-- php: = $value->outcome == 'Vaginal Delivery' ? 'selected="selected"' : '' -->>Vaginal Delivery</option>
																	<option value="CS" <!-- php: = $value->outcome == 'CS' ? 'selected="selected"' : '' -->>CS</option>
																	<option value="Spontaneous Abortion" <!-- php: = $value->outcome == 'Spontaneous Abortion' ? 'selected="selected"' : '' -->>Spontaneous Abortion</option>
																	<option value="Medical Termination" <!-- php: = $value->outcome == 'Medical Termination' ? 'selected="selected"' : '' -->>Medical Termination</option>
																	<option value="Surgical Termination" <!-- php: = $value->outcome == 'Surgical Termination' ? 'selected="selected"' : '' -->>Surgical Termination</option>
																</SearchableSelectField>
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Present Condition
															
															</label>
															<div class="col-md-7">
																
																<SearchableSelectField value="<!-- php: = $value->present_condition -->" class="form-control input-height" name="present_condition" id="present_condition" >
																	<option>Select</option>
																	<option value="Alive" <!-- php: = $value->present_condition == 'Alive' ? 'selected="selected"' : '' -->>Alive</option>
																	<option value="Dead" <!-- php: = $value->present_condition == 'Alive' ? 'selected="selected"' : '' -->>Dead</option>
																</SearchableSelectField>
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
													
													
						<!-- php: endforeach; -->
					</tbody>
				</table>
			</div>

		</div>
	</div>

	
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitHistoryPastgynaecologichistoryBackupWithParities() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
