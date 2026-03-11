const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_gynaecologic') ? $selectedVisit->patient_examination_gynaecologic : null; -->
<!-- php: $YesNo = [ 'Yes' => 'Yes', 'No' => 'No' ]; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Gynaecologic Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addGynaecologicExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Gynaecologic Examination
				</a>
				
				
				<div class="modal fade" id="addGynaecologicExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Gynaecologic Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addGynaecologicExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Vulva
													
													</label>
													
													<div class="col-md-7">
														<input type="text" name="vulva" data-required="0" placeholder="Enter vulva" class="form-control input-height" /> 
													</div>
												</div>
												
												
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
													<label class="control-label col-md-5">Blood Stained Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" name="blood_stained_comment" data-required="0" placeholder="Enter blood stained comments" class="form-control input-height" /> 
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
													<label class="control-label col-md-5">Discharges Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" name="discharges_comment" data-required="0" placeholder="Enter discharges comments" class="form-control input-height" /> 
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
													<label class="control-label col-md-5">Masses Details
													
													</label>
													<div class="col-md-7">
														<input type="text" name="masses_comment" data-required="0" placeholder="Enter blood masses comment" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Ulcerations
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="ulcerations" id="ulcerations" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Ulcerations Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" name="ulterations_comment" data-required="0" placeholder="Enter blood ultcerations comment" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Speculum Findings
													
													</label>
													
													<div class="col-md-7">
														<input type="text" name="speculum_findings" data-required="0" placeholder="Enter speculum_findings" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Samples Taken
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="samples_taken" id="samples_taken" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Samples Taken Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" name="samples_taken_comment" data-required="0" placeholder="Enter samples taken comment" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Vaginal Walls
													
													</label>
													<div class="col-md-7">
														<input type="text" name="vaginal_walls" data-required="0" placeholder="Enter vaginal walls" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Cervix
													
													</label>
													<div class="col-md-7">
														<input type="text" name="cervix" data-required="0" placeholder="Enter cervix" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Motion Tenderness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="cervical_motion_tenderness" id="cervical_motion_tenderness" >
															<option value="">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
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
													<label class="control-label col-md-5">Adnexa
													
													</label>
													<div class="col-md-7">
														<input type="text" name="adnexa" data-required="0" placeholder="Enter adnexa" class="form-control input-height" /> 
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
				<a data-toggle="modal" data-target="#editGynaecologicExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Gynaecologic Examination
				</a>
				
				<div class="modal fade" id="editGynaecologicExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Gynaecologic Examination</h4>
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
													<label class="control-label col-md-5">Vulva
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->vulva -->" name="vulva" data-required="0" placeholder="Enter vulva" class="form-control input-height" /> 
													</div>
												</div>
													
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
													<label class="control-label col-md-5">Blood Stained Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->blood_stained_comment -->" name="blood_stained_comment" data-required="0" placeholder="Enter blood stained" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Discharges
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="discharges" id="discharges" >
															<option value="<!-- php: = $value->discharges -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->blood_stained == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
											    <div class="form-group row">
													<label class="control-label col-md-5">Discharges Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->discharges_comment -->" name="discharges_comment" data-required="0" placeholder="Enter discharges comment" class="form-control input-height" /> 
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
													<label class="control-label col-md-5">Masses Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->masses_comment -->" name="masses_comment" data-required="0" placeholder="Enter masses comment" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Ulcerations
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="ulcerations" id="ulcerations" >
															<option value="<!-- php: = $value->ulcerations -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->ulcerations == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
											    <div class="form-group row">
													<label class="control-label col-md-5">Ulcerations Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->ulcerations_comment -->" name="ulcerations_comment" data-required="0" placeholder="Enter ulcerations comment" class="form-control input-height" /> 
													</div>
												</div>
												
												 <div class="form-group row">
													<label class="control-label col-md-5">Speculum Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->speculum_findings -->" name="speculum_findings" data-required="0" placeholder="Enter speculum_findings" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Samples Taken
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="samples_taken" id="samples_taken" >
															<option value="<!-- php: = $value->samples_taken -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->samples_taken == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
													</div>
												</div>
												
												
											    <div class="form-group row">
													<label class="control-label col-md-5">Samples Taken Comment
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->samples_taken_comment -->" name="samples_taken_comment" data-required="0" placeholder="Enter samples taken comment" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Vaginal Walls
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->vaginal_walls -->" name="vaginal_walls" data-required="0" placeholder="Enter vaginal walls" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Cervix
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->cervix -->" name="cervix" data-required="0" placeholder="Enter cervix" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Cervical Motion Tenderness
													
													</label>
													<div class="col-md-7">
														
														<SearchableSelectField class="form-control input-height" name="cervical_motion_tenderness" id="cervical_motion_tenderness" >
															<option value="<!-- php: = $value->cervical_motion_tenderness -->">Select...</option>
															<!-- php: foreach($YesNo as $key => $selectVal) { -->
																	<option <!-- php: = ($value->cervical_motion_tenderness == $selectVal) ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $selectVal --></option>
																<!-- php: } -->
														</SearchableSelectField>
														
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
													<label class="control-label col-md-5">Adnexa
													
													</label>
													<div class="col-md-7">
														<input type="text" value="<!-- php: = $value->adnexa -->" name="adnexa" data-required="0" placeholder="Enter adnexa" class="form-control input-height" /> 
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
					&nbsp;&nbsp;<b>Vulva</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->vulva : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Blood Stained</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->blood_stained : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Blood Stained Comment</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->blood_stained_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharges</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharges : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Discharges Comment</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->discharges_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Masses</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->masses : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Masses Comment</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->masses_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Ulcerations</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->ulcerations : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Ulcerations Comment</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->ulcerations_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Speculum Findings</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->speculum_findings : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Samples Taken</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->samples_taken : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Samples Taken Comment</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->samples_taken_comment : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Vaginal Walls</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->vaginal_walls : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cervix</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cervix : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Cervical Motion Tenderness</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->cervical_motion_tenderness : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Uterus</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->uterus : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Adnexa</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->adnexa : 'N/A') -->&nbsp;&nbsp;</a>
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

export default function ElementElementPatientvisitExaminationGynaecologicexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
