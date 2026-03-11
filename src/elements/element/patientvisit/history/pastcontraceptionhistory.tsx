const rawHtml = `
<!-- php: $patientHistoryContraceptions = $patient->patient_history_contraceptions; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
		
			<div style="float: left">
				<h4>Contraception History</h4>
			</div>
			<div style="float: right">			
				<p align="center">
					<a data-toggle="modal" data-target="#addPastContraceptionHistoryDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
						Add Past Contraception
					</a>
				</p>

				<div class="modal fade" id="addPastContraceptionHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add a past illness</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastContraception', $patient->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">																		
												<div class="form-group row">
													<label class="control-label col-md-5">Contraception Type
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														<SearchableSelectField class="form-control input-height" name="contraception_type_id" id="contraception_type_id" required>
															<option>Select...</option>
																<!-- php: foreach($contraceptionTypes as $key => $contraception_type) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $contraception_type --></option>
																<!-- php: } -->
														</SearchableSelectField>
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Date Started
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														
														<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
															<input class="form-control input-height" size="16" placeholder="Enter date started" data-required="1" name = "date_started" id = "date_started" type="text" required >
															<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
														</div>
														<input type="hidden" id="dtp_input2" value="" />
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Duration
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														<input type="text" name="duration" data-required="1" placeholder="Enter duration" class="form-control input-height" required /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Complications
														<span class="required"> * </span>
													</label>
													<div class="col-md-7">
														<input type="text" name="complications" data-required="0" placeholder="Enter complications" class="form-control input-height" /> 
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
				<table class="table table-hover table-checkable order-column full-width" id="illnesses_table">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Contraception Type</th>
							<th scope="col">Date Started</th>
							<th scope="col">Duration</th>
							<th scope="col">Complications</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>
					<tbody>
						<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryContraceptions as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td><!-- php: = $i --></td>
							<td><!-- php: = $value->has('contraception_type') ? $value->contraception_type->name : '' --></td>
							<td><!-- php: = $value->date_started --></td>
							<td><!-- php: = $value->duration --></td>
							<td><!-- php: = $value->complications --></td>
							<td class="actions">
								<a data-toggle="modal" data-target="#editPastContraceptionHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
									Edit
								</a>
							</td>
						</tr>
						
						<div class="modal fade" id="editPastContraceptionHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title">Edit a past contraception</h4>
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
												<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'History', 'action' => 'editPastContraception', $value->id], 'class' => 'form-horizontal']) -->
													<div class="form-body">																		
														<div class="form-group row">
															<label class="control-label col-md-5">Contraception Type
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<SearchableSelectField class="form-control input-height" name="contraception_type_id" id="contraception_type_id" required>
																	<option value="<!-- php: = $value->contraception_type_id -->">Select...</option>
																		<!-- php: foreach($contraceptionTypes as $key => $contraception_type) { -->
																			<option <!-- php: = ($key == $value->contraception_type_id) ? "selected='selected'" : "" --> value="<!-- php: = $key -->"><!-- php: = $contraception_type --></option>
																		<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														
														<div class="form-group row">
															<label class="control-label col-md-5">Date Started
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																
																<div class="input-group date form_date " data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																	<input class="form-control input-height" size="16" placeholder="Enter date started" data-required="1" name = "date_started" id = "date_started" type="text" value="<!-- php: = $value->date_started -->" required >
																	<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																</div>
																<input type="hidden" id="dtp_input2" value="" />
															</div>
														</div>
														
														<div class="form-group row">
															<label class="control-label col-md-5">Duration
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="duration" data-required="1" value="<!-- php: = $value->duration -->" placeholder="Enter duration" class="form-control input-height" required /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Complications
																<span class="required"> * </span>
															</label>
															<div class="col-md-7">
																<input type="text" name="complications" data-required="0" value="<!-- php: = $value->complications -->" placeholder="Enter complications" class="form-control input-height" /> 
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

export default function ElementElementPatientvisitHistoryPastcontraceptionhistory() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
