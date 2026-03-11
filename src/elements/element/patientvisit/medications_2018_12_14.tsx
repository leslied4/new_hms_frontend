const rawHtml = `

						<div class="row">
							<div class="borderBox light bordered col-md-12">
								<div class="borderBox-title tabbable-line">
									<div class="caption">
										<span class="caption-subject font-dark bold uppercase">MEDICATIONS</span>
									</div>
									<ul class="nav nav-tabs">
										<li class="nav-item medications_add_medication">
											<a href="#borderBox_tab19" data-toggle="tab"> Add </a>
										</li>
										<li class="nav-item medications_view_medications">
											<a href="#borderBox_tab20" data-toggle="tab"> View </a>
										</li>
										<!--<li class="nav-item">
											<a href="#borderBox_tab21" data-toggle="tab" class="active"> Tab 21 </a>
										</li>-->
									</ul>
								</div>
								<div class="borderBox-body">
									<div class="tab-content">
										<div class="tab-pane medications_add_medication " id="borderBox_tab19">
										<!-- php: = $this->Form->create($medications); -->
											<div class="form-body">
												<div class="form-group row">
													<label class="control-label col-md-3">Drug Name
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="drug_name" id="drug_name" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Dosage
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="dosage" id="dosage" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Frequency  
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="frequency" id="frequency" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Route
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="route" id="route" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Treatment Duration
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="treatment_duration" id="treatment_duration" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Instructions
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
															<textarea name="instructions" id="instructions" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Status
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="status" id="status" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Issue
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="issue" id="issue" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Discharge Drug
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
														<input type="text" name="discharge_drug" id="discharge_drug" data-required="1" placeholder="" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Pharmacy Advise
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
															<textarea name="pharmacy_advise" id="pharmacy_advise" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<input type="hidden" id="hidden" name="request_type" value="new_medications">
												<div class="row">
													<div class="offset-md-4 col-md-8">
														<button type="submit" class="btn btn-info">Submit</button>
														<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
													</div>
												</div>
											</div>
										<!-- php: =$this->Form->end(); -->
										</div>
										<div class="tab-pane active medications_view_medications" id="borderBox_tab20">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover table-checkable order-column full-width" id="example10">
														<thead>
															<tr>
																<th class="center"> Date </th>
																<th class="center"> Name </th>
																<th class="center"> Description </th>
																<th class="center"> Actions </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: foreach ($patientMedications as $patientMedication): -->
															<tr class="odd gradeX">
																<td class="center"><!-- php: =$patientMedication->medication->date_created --></td>
																<td class="center"><!-- php: =$patientMedication->medication->name --></td>
																<td class="center"><!-- php: =$patientMedication->medication-> description --></td>
																<td class="center">
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Medications','action'=>'editMedications',$patientMedication->id]) -->" class="btn btn-tbl-edit btn-xs medications_view_patient_medication">
																		<i class="fa fa-pencil"></i>
																	</a>
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Medications','action'=>'viewMedications',$patientMedication->id]) -->" class="btn btn-tbl-delete btn-xs medications_edit_medication">
																		<i class="fa fa-eye"></i>
																	</a>
																	<!--<a class="btn btn-tbl-delete btn-xs">
																		<i class="fa fa-trash-o "></i>
																	</a>-->
																</td>
															</tr>
														<!-- php: endforeach; -->									
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div class="tab-pane" id="borderBox_tab21">
											<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.</p>
												<p>
													<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
												</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					
`;

export default function ElementElementPatientvisitMedications20181214() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
