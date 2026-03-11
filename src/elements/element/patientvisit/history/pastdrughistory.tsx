const rawHtml = `
<!-- php: // initialize variables $patientHistoryDrugs = $patient->patient_history_drugs; -->
<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			
			<div style="float: left">
				<h4>Drug History</h4>
			</div>
			<div style="float: right">			
				
				<p align="center">
					<a data-toggle="modal" data-target="#addPastDrugHistoryDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
						Add Past Drug
					</a>
				</p>

				<div class="modal fade" id="addPastDrugHistoryDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add a past drug</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'History', 'action' => 'addPastDrug', $patient->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
												
												
												<div class="form-group row">
													<label class="control-label col-md-5">Current Medications
													</label>
													<div class="col-md-7">
														<input type="text" name="current_medication" data-required="0" placeholder="Enter current medication" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Past Medications
													</label>
													<div class="col-md-7">
														<input type="text" name="past_medication" data-required="0" placeholder="Enter past medication" class="form-control input-height" /> 
													</div>
												</div>
												
												<div class="form-group row">
													<label class="control-label col-md-5">Herbal Medications
													</label>
													<div class="col-md-7">
														<input type="text" name="herbal_medication" data-required="0" placeholder="Enter herbal medication" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Allergies
													</label>
													<div class="col-md-7">
														<input type="text" name="allergies" data-required="0" placeholder="Enter past allergy" class="form-control input-height" /> 
													</div>
												</div>
																													
												<div class="form-group row">
													<label class="control-label col-md-5">Vaccination
													</label>
													<div class="col-md-7">
														<input type="text" name="vaccination" data-required="0" placeholder="Enter past vaccination" class="form-control input-height" /> 
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
				<table class="table table-hover table-checkable order-column full-width" id="drugs_table">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Current</th>
							<th scope="col">Past</th>
							<th scope="col">Herbal</th>
							<th scope="col">Allergies</th>
							<th scope="col">Vacinations</th>
							<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
						</tr>
					</thead>
					<tbody>
						<!-- php: $i = 0; -->
						<!-- php: foreach ($patientHistoryDrugs as $value): -->
						<!-- php: $i++; -->
						<tr>
							<td><!-- php: = $i --></td>
							<td><!-- php: = $value->current_medication --></td>
							<td><!-- php: = $value->past_medication --></td>
							<td><!-- php: = $value->herbal_medication --></td>
							<td><!-- php: = $value->allergies --></td>
							<td><!-- php: = $value->vaccination --></td>
							<td class="actions">
								<a data-toggle="modal" data-target="#editPastDrugHistoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn btn-default btn-xs">
									Edit
								</a>
							</td>
						</tr>
						
						<div class="modal fade" id="editPastDrugHistoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h4 class="modal-title">Edit a past drug history: <!-- php: = $value->current_medication --></h4>
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
												<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'History', 'action' => 'editPastDrug', $value->id], 'class' => 'form-horizontal']) -->
													<div class="form-body">
														
														<div class="form-group row">
															<label class="control-label col-md-5">Current Medications
															</label>
															<div class="col-md-7">
																<input type="text" name="current_medication" data-required="0" value="<!-- php: = $value->current_medication -->" placeholder="Enter current medication" class="form-control input-height" /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Past Medications
															</label>
															<div class="col-md-7">
																<input type="text" name="past_medication" data-required="0" value="<!-- php: = $value->past_medication -->" placeholder="Enter past medication" class="form-control input-height" /> 
															</div>
														</div>
														
														<div class="form-group row">
															<label class="control-label col-md-5">Herbal Medications
															</label>
															<div class="col-md-7">
																<input type="text" name="herbal_medication" data-required="0" value="<!-- php: = $value->herbal_medication -->" placeholder="Enter herbal medication" class="form-control input-height" /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Allergies
															</label>
															<div class="col-md-7">
																<input type="text" name="allergies" data-required="0" value="<!-- php: = $value->allergies -->" placeholder="Enter past allergy" class="form-control input-height" /> 
															</div>
														</div>
																															
														<div class="form-group row">
															<label class="control-label col-md-5">Vaccination
															</label>
															<div class="col-md-7">
																<input type="text" name="vaccination" data-required="0" value="<!-- php: = $value->vaccination -->" placeholder="Enter past medication" class="form-control input-height" /> 
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

export default function ElementElementPatientvisitHistoryPastdrughistory() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
