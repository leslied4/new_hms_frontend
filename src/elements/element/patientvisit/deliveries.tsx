const rawHtml = `

						<div class="row">
							<div class="borderBox light bordered col-md-12">
								<div class="borderBox-title tabbable-line">
									<div class="caption">
										<span class="caption-subject font-dark bold uppercase">DELIVERIES</span>
									</div>
									<ul class="nav nav-tabs">
										<li class="nav-item deliveries_add_delivery">
											<a href="#borderBox_tab22" data-toggle="tab"> Add </a>
										</li>
										<li class="nav-item deliveries_view_deliveries">
											<a href="#borderBox_tab23" data-toggle="tab"> View </a>
										</li>
										<!--<li class="nav-item">
											<a href="#borderBox_tab24" data-toggle="tab" class="active"> Tab 24 </a>
										</li>-->
									</ul>
								</div>
								<div class="borderBox-body">
									<div class="tab-content">
									
									
									
										<div class="tab-pane deliveries_add_delivery " id="borderBox_tab22">
											<!-- php: = $this->Form->create($deliveries, ['id' => 'deliveryForm']); -->
											<div class="form-body">
												<div class="form-group row">
													<label class="control-label col-md-3">Admission Date
														<span class="required"> * </span>
													</label>
													<div class="col-md-5">
														<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
															<input class="form-control input-height" size="16" placeholder="" name = "admission_date" id = "admission_date" type="text" value="" required >
															<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
														</div>
														<input type="hidden" id="dtp_input2" value="" />
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Delivery Date
														<span class="required"> * </span>
													</label>
													<div class="col-md-5">
														<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
															<input class="form-control input-height" size="16" placeholder="" name = "delivery_date" id = "delivery_date" type="text" value="" required >
															<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
														</div>
														<input type="hidden" id="dtp_input2" value="" />
													</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Gender
														<span class="required"> * </span>
													</label>
													<div class="col-md-5">
														<SearchableSelectField class="form-control input-height" name="gender_id" id="delgender_id" required>
															<option value="">Select...</option>
															<!-- php: foreach($genders as $gender) { -->
															<option value="<!-- php: =$gender->id -->"><!-- php: =$gender->name --></option>
															<!-- php: } -->
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Birth Weight(kg)
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="number" step="any" min="0" name="birth_weight" id="birth_weight" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Gestational Age At Delivery
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="number" min="0" name="gestational_age_at_delivery" id="gestational_age_at_delivery" data-required="1" placeholder="" class="form-control input-height" required /> </div>
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">First Minute Apgar
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="number" name="first_minute_apgar" min="0" max="10" id="first_minute_apgar" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Fifth Minute Apgar
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="number" name="fifth_minute_apgar" min="0" max="10" id="fifth_minute_apgar" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Head Circumference(cm)
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="number" step="any" name="head_circumference" id="head_circumference" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Birth Length(cm)
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="number" step="any" name="birth_length" id="birth_length" data-required="1" placeholder="" class="form-control input-height" required  /> </div>
													
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Mode of Delivery
														<span class="required"> * </span>
													</label>
													<div class="col-md-5">
														<!-- php: $DELIVERY_MODES = [ 21 => 'Vaginal Delivery', 22 => 'Elective Caesarean Section', 23 => 'Emergency Caesarean Section', ]; -->
														<SearchableSelectField class="form-control input-height" name="mode_of_delivery" id="mode_of_delivery">
															
															<option value="">Select...</option>
																<!-- php: foreach($DELIVERY_MODES as $key => $value) { -->
															<option value="<!-- php: = $value -->"><!-- php: = $value --></option>
															<!-- php: } -->
														</SearchableSelectField>
													</div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Type of Labor
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
														<!-- php: $LABOR_TYPES = [ 25 => 'Spontaneous', 26 => 'Induced', 27 => 'Augmented', 28 => 'Not Applicable', ]; -->
														<SearchableSelectField class="form-control input-height" name="type_of_labor" id="type_of_labor">
															
															<option value="">Select...</option>
																<!-- php: foreach($LABOR_TYPES as $key => $value) { -->
															<option value="<!-- php: = $value -->"><!-- php: = $value --></option>
															<!-- php: } -->
														</SearchableSelectField>
													</div>
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Operative Delivery Indication
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="text" name="operative_delivery_indication" id="operative_delivery_indication" data-required="1" placeholder="" class="form-control input-height" required  /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Congenital Anomalies
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="text" name="congenital_anomalies" id="congenital_anomalies" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Complications
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="text" name="complications" id="complications" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Mother Condition At Discharge
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="text" name="mother_condition_at_discharge" id="mother_condition_at_discharge" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
														<label class="control-label col-md-3">Baby Condition At Discharge
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<input type="text" name="baby_condition_at_discharge" id="baby_condition_at_discharge" data-required="1" placeholder="" class="form-control input-height" required /> </div>
													
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Discharge Date
														<span class="required"> * </span>
													</label>
													<div class="col-md-5">
														<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
															<input class="form-control input-height" size="16" placeholder="" name = "discharge_date" id = "discharge_date" type="text" value="" required >
															<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
														</div>
														<input type="hidden" id="dtp_input2" value="" />
													</div>
												</div>
												<input type="hidden" id="hidden" name="request_type" value="new_deliveries">
												<div class="row">
													<div class="offset-md-3 col-md-5">
														<button type="submit" class="btn btn-info">Submit</button>
														<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
													</div>
												</div>
											</div>
											<!-- php: =$this->Form->end(); -->
										</div>	


										<div class="tab-pane active deliveries_view_deliveries" id="borderBox_tab23">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover table-checkable order-column full-width" id="deliveries_table">
														<thead>
															<tr>
																<th> Date </th>
																<th> Admission Date </th>
																<th> Delivery Date </th>
																<th> Gender </th>
																<th> Birth Weight </th>
																<th> Gestational Age At Delivery </th>
																<th> Actions </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: foreach ($patientDeliveries as $patientDelivery): -->
															<tr class="odd gradeX">
																<td class="center"><!-- php: = $patientDelivery->delivery->date_created --></td>
																<td class="center"><!-- php: = $patientDelivery->delivery->admission_date --></td>
																<td class="center"><!-- php: = $patientDelivery->delivery->delivery_date --></td>
																<td class="center"><!-- php: = $patientDelivery->delivery->gender->name --></td>
																<td class="center"><!-- php: = $patientDelivery->delivery->birth_weight --></td>
																<td class="center"><!-- php: = $patientDelivery->delivery->gestational_age_at_delivery --></td>
																<td class="center">
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Deliveries','action'=>'editDeliveries',$patientDelivery->id]) -->" class="btn  <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs deliveries_edit_delivery">
																		Edit
																	</a>
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Deliveries','action'=>'viewDeliveries',$patientDelivery->id]) -->" class="btn  <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs deliveries_add_patient_delivery">
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

										
										<div class="tab-pane" id="borderBox_tab24">
										<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.</p>
										<p>
											<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
										</p>
										</div>
									</div>
								</div>
							</div>		
						</div>
					
<script>
$(function () {
	$("#deliveryForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>

`;

export default function ElementElementPatientvisitDeliveries() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
