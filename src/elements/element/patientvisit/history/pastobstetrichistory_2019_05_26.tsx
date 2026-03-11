const rawHtml = `
<!-- php: $value = $patientHistoryObstetric; -->

<div class="row">
	<div class="col-md-8 col-sm-12">
		<div class="table-container">
			<h4>Obstetric History</h4>

			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Date of last menstrual period</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->date_of_last_menstrual_period->i18nFormat('yyyy-MM-dd') : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Date of positive pregnancy test</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->date_of_positive_pregnancy_test->i18nFormat('yyyy-MM-dd') : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
	
	
	<div class="col-md-4 col-sm-12">

		<div class="table-container">
			
			<h4>Action</h4>
			
			<!-- php: if(!isset($value)) { -->
			<p align="left">
				<a data-toggle="modal" data-target="#addPastObstetricHistoryDialogue" href="javascript:" class="btn btn-primary btn-xs">
					Add Obstetric History
				</a>
			</p>
			
			
			<div class="modal fade" id="addPastObstetricHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Add Obstetric history</h4>
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
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastObstetric', $patient->id], 'class' => 'form-horizontal']) -->
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
												<label class="control-label col-md-5">Date of positive pregnancy test
												
												</label>
												<div class="col-md-7">
													
													<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input11" data-link-format="yyyy-mm-dd">
														<input class="form-control input-height" size="16" placeholder="Enter date of positive pregnant test" data-required="0" name = "date_of_positive_pregnancy_test" id = "date_of_positive_pregnancy_test" type="text"  >
														<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
													</div>
													<input type="hidden" id="dtp_input11" value="" />
													
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
				<a data-toggle="modal" data-target="#editPastObstetricHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-primary btn-xs">
					Update Obstetric History
				</a>
			</p>
			
			<div class="modal fade" id="editPastObstetricHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Update Obstetric history</h4>
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
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'editPastObstetric', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
																
											<div class="form-group row">
												<label class="control-label col-md-5">Date of last menstrual period
												
												</label>
												<div class="col-md-7">
													
													<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input13" data-link-format="yyyy-mm-dd">
														<input class="form-control input-height" value="<!-- php: = $value->date_of_last_menstrual_period->i18nFormat('yyyy-MM-dd') -->" size="16" placeholder="Enter date of last menstrual period" data-required="0" name = "date_of_last_menstrual_period" id = "date_of_last_menstrual_period" type="text"  >
														<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
													</div>
													<input type="hidden" id="dtp_input13" value="" />
													
												</div>
											</div>
				
											<div class="form-group row">
												<label class="control-label col-md-5">Date of positive pregnancy test
												
												</label>
												<div class="col-md-7">
													
													<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input14" data-link-format="yyyy-mm-dd">
														<input class="form-control input-height" value="<!-- php: = $value->date_of_positive_pregnancy_test->i18nFormat('yyyy-MM-dd') -->" size="16" placeholder="Enter date of positive pregnant test" data-required="0" name = "date_of_positive_pregnancy_test" id = "date_of_positive_pregnancy_test" type="text"  >
														<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
													</div>
													<input type="hidden" id="dtp_input14" value="" />
													
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
			
			<p align="left">
				<a data-toggle="modal" data-target="#addPastPregnancyHistoryDialogue" href="javascript:" class="btn btn-primary btn-xs">
					Add Pregnancy History
				</a>
			</p>

			<div class="modal fade" id="addPastPregnancyHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">Add pregnancy</h4>
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
									<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastPregnancy', $patient->id], 'class' => 'form-horizontal']) -->
										<div class="form-body">		
											
											
											<div class="form-group row">
												<label class="control-label col-md-5">Date Conceived
												
												</label>
												<div class="col-md-7">
													<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input15" data-link-format="yyyy-mm-dd">
														<input class="form-control input-height" size="16" placeholder="Enter date conceived" data-required="0" name = "date_conceived" id = "date_conceived" type="text"  >
														<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
													</div>
													<input type="hidden" id="dtp_input15" value="" />
													
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Mode of Conception
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" name="mode_of_conception" id="mode_of_conception" >
														<option>Select</option>
														<option value="Assisted">Assisted</option>
														<option value="Natural">Natural</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Mode of Delivery
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" name="mode_of_delivery" id="mode_of_delivery" >
														<option>Select</option>
														<option value="CS">CS</option>
														<option value="Vaginal Delivery">Vaginal Delivery</option>
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Outcoume
												
												</label>
												<div class="col-md-7">
													<input type="text" name="outcome" data-required="0" placeholder="Enter outcome" class="form-control input-height" /> 
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Pregnancy Complications
												
												</label>
												<div class="col-md-7">
													<input type="text" name="pregnancy_complications" data-required="0" placeholder="Enter pregnancy complications" class="form-control input-height" /> 
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Sex
												
												</label>
												<div class="col-md-7">
													
													<SearchableSelectField class="form-control input-height" name="gender_id" id="gender_id" required>
														<option>Select...</option>
															<!-- php: foreach($genders as $gender) { -->
																<option value="<!-- php: = $gender->id -->"><!-- php: = $gender->name --></option>
															<!-- php: } -->
													</SearchableSelectField>
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Weight (KG)
												
												</label>
												<div class="col-md-7">
													<input type="number" min="0.1" step="0.1" name="weight" data-required="0" placeholder="Enter current info on child" class="form-control input-height" /> 
												</div>
											</div>
																												
											<div class="form-group row">
												<label class="control-label col-md-5">Current Info On Child
												
												</label>
												<div class="col-md-7">
													<input type="text" name="child_info" data-required="0" placeholder="Enter current info on child" class="form-control input-height" /> 
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
	</div>
	
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<h4>Pregnancy History</h4>
			<div class="table-scrollable">
				<table class="table table-hover table-checkable order-column full-width" id="pregnancy_table">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Date</th>
							<th scope="col">Conception Mode</th>
							<th scope="col">Delivery Mode</th>
							<th scope="col">Outcome</th>
							<th scope="col">Complications</th>
							<th scope="col">Sex</th>
							<th scope="col">Weight (KG)</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>
					<tbody>
						<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryPregnancies as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td><!-- php: = $i --></td>
							<td><!-- php: = $value->date_conceived->i18nFormat('yyyy-MM-dd') --></td>
							<td><!-- php: = $value->mode_of_conception --></td>
							<td><!-- php: = $value->mode_of_delivery --></td>
							<td><!-- php: = $value->outcome --></td>
							<td><!-- php: = $value->pregnancy_complications --></td>
							<td><!-- php: = $value->has('gender') ? $value->gender->name : '' --></td>
							<td><!-- php: = $value->weight --></td>
							<td class="actions">
								<a data-toggle="modal" data-target="#editPastPregnancyHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
									Edit
								</a>
							</td>
						</tr>
						
						<div class="modal fade" id="editPastPregnancyHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title">Edit a past pregnancy history</h4>
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
												<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'History', 'action' => 'editPastPregnancy', $value->id], 'class' => 'form-horizontal']) -->
													<div class="form-body">
														<div class="form-group row">
															<label class="control-label col-md-5">Date Conceived
															
															</label>
															<div class="col-md-7">
																<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input15" data-link-format="yyyy-mm-dd">
																	<input class="form-control input-height" value="<!-- php: = isset($value->date_conceived) ? $value->date_conceived->i18nFormat('yyyy-MM-dd') : '' -->" size="16" placeholder="Enter date conceived" data-required="0" name = "date_conceived" id = "date_conceived" type="text"  >
																	<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																</div>
																<input type="hidden" id="dtp_input15" value="" />
																
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Mode of Conception
															
															</label>
															<div class="col-md-7">
																
																<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->mode_of_conception -->" name="mode_of_conception" id="mode_of_conception" >
																	<option>Select</option>
																	<option value="Assisted" <!-- php: = ($value->mode_of_conception == 'Assisted') ? 'selected="selected"' : '' -->>Assisted</option>
																	<option value="Natural" <!-- php: = ($value->mode_of_conception == 'Natural') ? 'selected="selected"' : '' -->>Natural</option>
																</SearchableSelectField>
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Mode of Delivery
															
															</label>
															<div class="col-md-7">
																
																<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->mode_of_delivery -->" name="mode_of_delivery" id="mode_of_delivery" >
																	<option>Select</option>
																	<option value="CS" <!-- php: = ($value->mode_of_delivery == 'CS') ? 'selected="selected"' : '' -->>CS</option>
																	<option value="Vaginal Delivery" <!-- php: = ($value->mode_of_delivery == 'Vaginal Delivery') ? 'selected="selected"' : '' -->>Vaginal Delivery</option>
																</SearchableSelectField>
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Outcoume
															
															</label>
															<div class="col-md-7">
																<input type="text" name="outcome" value="<!-- php: = $value->outcome -->" data-required="0" placeholder="Enter outcome" class="form-control input-height" /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Pregnancy Complications
															
															</label>
															<div class="col-md-7">
																<input type="text" name="pregnancy_complications" value="<!-- php: = $value->pregnancy_complications -->" data-required="0" placeholder="Enter pregnancy complications" class="form-control input-height" /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Sex
															
															</label>
															<div class="col-md-7">
																
																<SearchableSelectField class="form-control input-height" value="<!-- php: = $value->gender_id -->" name="gender_id" id="gender_id" required>
																	<option>Select...</option>
																		<!-- php: foreach($genders as $gender) { -->
																			<option value="<!-- php: = $gender->id -->" <!-- php: = ($value->gender_id == $gender->id) ? 'selected="selected"' : '' -->><!-- php: = $gender->name --></option>
																		<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Weight (KG)
															
															</label>
															<div class="col-md-7">
																<input type="number" min="0.1" step="0.1" value="<!-- php: = $value->weight -->" name="weight" data-required="0" placeholder="Enter current info on child" class="form-control input-height" /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Current Info On Child
															
															</label>
															<div class="col-md-7">
																<input type="text" name="child_info" value="<!-- php: = $value->child_info -->" data-required="0" placeholder="Enter current info on child" class="form-control input-height" /> 
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

export default function ElementElementPatientvisitHistoryPastobstetrichistory20190526() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
