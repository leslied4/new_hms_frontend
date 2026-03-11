const rawHtml = `

						<div class="row">
							<div class="borderBox light bordered col-md-12">
								<div class="borderBox-title tabbable-line">
									<div class="caption">
										<span class="caption-subject font-dark bold uppercase">LABS</span>
									</div>
									<ul class="nav nav-tabs">
										<li class="nav-item labs_add_lab">
											<a href="#borderBox_tab10" data-toggle="tab"> Add </a>
										</li>
										<li class="nav-item labs_view_labs">
											<a href="#borderBox_tab11" data-toggle="tab"> View </a>
										</li>
										<!--<li class="nav-item">
											<a href="#borderBox_tab12" data-toggle="tab" class="active"> Tab 12 </a>
										</li>-->
									</ul>
								</div>
								<div class="borderBox-body">
									<div class="tab-content">
										<div class="tab-pane labs_add_lab " id="borderBox_tab10">
											<!-- php: = $this->Form->create($labs); -->
												<div class="form-body">
													<div class=" row section-head">
														<div class="col-md-12">
															<h3>Haematology</h3>
														</div>
													</div>
												
													<div class="form-group row">
														<label class="control-label col-md-3">Haemoglobin
															
														</label>
														<div class="col-md-8">
															<input type="text" name="haemoglobin" id="haemoglobin" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Malaria Parasites
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="malaria_parasite" id="malaria_parasite">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Blood Group
															
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="blood_group_id" id="blood_group_id">
																<option value="">Select...</option>
																	<!-- php: foreach($bloodgroups as $bloodgroup) { -->
																<option value="<!-- php: = $bloodgroup->id -->"><!-- php: = $bloodgroup->name --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Electrophoresis
															
														</label>
														<div class="col-md-8">
															<input type="text" name="electrophoresis" id="electrophoresis" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">G6PD Screen
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB2_STATUSES = [ 10 =>'FULL DEFECT', 9 => 'PARTIAL DEFECT', 8 => 'NO DEFECT', 11=> 'NOT DONE' ]; -->
															<SearchableSelectField class="form-control input-height" name="g6pd_screen" id="g6pd_screen">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB2_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Sickling Status
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="sickling_status" id="sickling_status">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class=" row section-head">
														<h3>Serology</h3>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">HIV
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB1_STATUSES = [ 6 => 'REACTIVE', 7 => 'NOT REACTIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="hiv" id="hiv">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB1_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Hepatitis B
															
														</label>
														
														<div class="col-md-5">
														<!-- php: $LAB1_STATUSES = [ 6 => 'REACTIVE', 7 => 'NOT REACTIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="hepatitis_b" id="hepatitis_b">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB1_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Syphillis(VDRL)
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB1_STATUSES = [ 6 => 'REACTIVE', 7 => 'NOT REACTIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="syphillis" id="syphillis">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB1_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class=" row section-head">
														<h3>Urinalysis</h3>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Urine Sugar
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB3_STATUSES = [ 5 => 'NEGATIVE', 13 => '+', 14 => '++', 15 => '+++', 16 => '++++', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="urine_sugar" id="urine_sugar">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Urine Protein
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB3_STATUSES = [ 5 => 'NEGATIVE', 13 => '+', 14 => '++', 15 => '+++', 16 => '++++', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="urine_protein" id="urine_protein">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Specific Gravity
															
														</label>
														<div class="col-md-8">
															<input type="text" name="specific_gravity" id="specific_gravity" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">PH
															
														</label>
														<div class="col-md-8">
															<input type="text" name="ph" id="ph" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Nitrite
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="nitrite" id="nitrite">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Leucocyte
															
														</label>
														<div class="col-md-5">
														<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="leucocyte" id="leucocyte">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Pus Cells
															
														</label>
														<div class="col-md-8">
															<input type="text" name="pus_cell" id="pus_cell" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Blood
															
														</label>
														<div class="col-md-8">
															<input type="text" name="blood" id="labBlood" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class=" row section-head">
														<h3>Others</h3>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Pregnancy Test
															
														</label>
														<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
															<SearchableSelectField class="form-control input-height" name="pregnancy_test" id="pregnancy_test">
																
																<option value="">Select...</option>
																	<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Fasting Blood Sugar
															
														</label>
														<div class="col-md-8">
															<input type="text" name="fasting_blood_sugar" id="fasting_blood_sugar" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Random Blood Sugar
															
														</label>
														<div class="col-md-8">
															<input type="text" name="random_blood_sugar" id="random_blood_sugar" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_labs">
													<div class="row">
														<div class="offset-md-4 col-md-8">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
														</div>
													</div>
													
												</div>
											<!-- php: =$this->Form->end(); -->
										</div>
										
										<div class="tab-pane active labs_view_labs" id="borderBox_tab11">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover table-checkable order-column full-width" id="labs_table">
														<thead>
															<tr>
																<th> Date</th>
																<th> Haemoglobin</th>
																<th> Malaria Parasites </th>
																<th> Blood Group </th>
																<th> Electrophoresis </th>
																<th> G6PD Screeen </th>
																<th> Sickling Status </th>
																<th> Actions </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: foreach ($patientLabs as $patientLab): -->
															<tr class="odd gradeX">
																<td class="center"><!-- php: =$patientLab->lab->date_created --></td>
																<td class="center"><!-- php: = $patientLab->lab->haemoglobin --></td>
																<td class="center"><!-- php: = $LAB3_STATUSES[$patientLab->lab->malaria_parasite] --></td>
																<td class="center"><!-- php: = $patientLab->lab->blood_group->name --></td>
																<td class="center"><!-- php: = $patientLab->lab->electrophoresis --></td>
																<td class="center"><!-- php: = $LAB2_STATUSES[$patientLab->lab->g6pd_screen] --></td>
																<td class="center"><!-- php: = $LAB3_STATUSES[$patientLab->lab->sickling_status] --></td>
																<td class="center">
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Labs','action'=>'editLabs',$patientLab->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs labs_edit_lab">
																		Edit
																	</a>
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Labs','action'=>'viewLabs',$patientLab->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs labs_view_patient_lab">
																		View
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
										<div class="tab-pane" id="borderBox_tab12">
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

export default function ElementElementPatientvisitLabs() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
