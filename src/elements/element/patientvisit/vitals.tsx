const rawHtml = `

<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line" style="margin-bottom: -1px;background: <!-- php: = $patient->age <=3 ? '#ffe7f9' : ($patient->age <= 12 ? '#f1e0ff' : '#f4f7ff') -->;">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Triage
				<!-- php: $age = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" -->
					<!-- php: = $age <=3 ? ' - YOUNGER CHILD TEWS' : ($age <= 12 ? ' - OLDER CHILD TEWS' : ' - ADULT TEWS') -->
				</span>
			</div>
			<ul class="nav nav-tabs" id="patientVitalsTab">
				
				<!-- php: if($isCurrentVisit) { -->
					<li class="nav-item vitals_add_vital">
						<a href="#borderBox_tab1" data-toggle="tab"> Add </a>
					</li>
				<!-- php: } -->
				
				<li class="nav-item vitals_view_vitals">
					<a href="#borderBox_tab2" data-toggle="tab"> View </a>
				</li>
				<li class="nav-item vitals_view_vitals">
					<a href="#borderBox_tab3" data-toggle="tab"> Graphical </a>
				</li>
				<!--<li class="nav-item">
					<a href="#borderBox_tab3" data-toggle="tab" class="active"> Tab 3 </a>
				</li>-->
			</ul>
		</div>
		<div class="borderBox-body" style="border-top: 3px solid <!-- php: = $patient->age <=3 ? '#de5190' : ($patient->age <= 12 ? '#7030a0' : '#2e74b5') -->;">
			<div class="tab-content">
				
				<!-- php: if($isCurrentVisit) { -->
				<div class="tab-pane vitals_add_vital " id="borderBox_tab1">
					<div class="row">
						<div class="col-md-8">
							<!-- </?= $this->Form->create(null,['url' => ['controller' => 'PatientVisitVitals', 'action' => 'add',  $selectedVisit->patient_id, $selectedVisit->id], 'id'=>'vitals']);?> -->
								<div class="form-body">
									<div class="form-group row">
										<label class="control-label col-md-4">Temperature(°C)
											<!-- span class="required"> * </span -->
										</label>
										<div class="col-md-6">
											<input type="number" step="any" name="temperature" id="temperature" data-required="1" placeholder="Enter Temperature" class="form-control input-height" /> </div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-4">SpO<sub>2</sub>
											<!-- span class="required"> * </span -->
										</label>
										<div class="col-md-6">
											<input type="number" step="any" name="oxygen_saturation" id="oxygen_saturation" data-required="1" placeholder="Enter Oxygen Saturation" class="form-control input-height" /> </div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-4">Respiratory Rate(cpm)
											<!-- span class="required"> * </span -->
										</label>
										<div class="col-md-6">
											<input type="number" step="any" name="respiratory_rate" id="respiratory_rate" data-required="1" placeholder="Enter Respiratory Rate" class="form-control input-height" /> </div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-4">Pulse(bpm)
											<!-- span class="required"> * </span -->
										</label>
										<div class="col-md-6">
											<input type="number" name="pulse" step="any" id="pulse" data-required="1" placeholder="Enter Pulse" class="form-control input-height" /> </div>
									</div>

									<div class="form-group row">
										<label class="control-label col-md-4">Blood Pressure(mm Hg)
											<!-- span class="required"> * </span -->
										</label>
										<div class="col-md-6">
                                            <div class="input-group">
                                                <input class="form-control input-height" size="3" placeholder="Systolic" name="blood_pressure_1" id="blood_pressure_1" data-required="1" type="number" min="0" >
                                                <span class="input-group-addon"><span class="" style="font-size : 18px"> &frasl; </span></span>
                                                <input class="form-control input-height" size="3" placeholder="Diastolic" name="blood_pressure_2" id="blood_pressure_2" data-required="1" type="number" min="0" >
                                            </div>

										</div>	
										<input type="hidden" id="hidden" name="request_type" value="new_vitals">
										
									</div>
									
									<hr/>
									<div class="form-group row">
										<div class="col-md-12"><a onclick="$('.bmiFields').toggle(500)" class="btn btn-warning btn-sm">Enter BMI(Height and Weight)</a></div>
									</div>
									
									<div class="form-group row bmiFields" style="display: none">
										<label class="control-label col-md-4">Weight (Kg)
											
										</label>
										<div class="col-md-6">
											<input type="number" step="any" name="weight" min="0" id="weight" placeholder="Enter Weight in Kg" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
									</div>
									<div class="form-group row bmiFields" style="display: none">
										<label class="control-label col-md-4">Height (cm)
											
										</label>
										<div class="col-md-6">
											<input type="number" step="any" name="height" min="0" id="height" placeholder="Enter height in cm" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
									</div>
									<div class="form-group row bmiFields" style="display: none">
										<label class="control-label col-md-4">BMI

										</label>
										<div class="col-md-6">
											<input type="number" step="0.01" value="0" id="bmi" readonly class="form-control input-height" /> </div>
									</div>
									<hr/>
									<div class="form-group row">
										<div class="col-md-12"><a onclick="$('.sugarFields').toggle(500)" class="btn btn-warning btn-sm">Record Blood Sugar</a></div>
									</div>
									
									<div class="form-group row sugarFields" style="display: none">
										<label class="control-label col-md-4">FBS (mg/dL)
											
										</label>
										<div class="col-md-6">
											<input type="number" step="any" name="fasting_blood_sugar" min="0" id="fbs" placeholder="Enter Fasting blood Sugar" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
									</div>
									<div class="form-group row sugarFields" style="display: none">
										<label class="control-label col-md-4">RBS (mg/dL)
											
										</label>
										<div class="col-md-6">
											<input type="number" step="any" name="random_blood_sugar" min="0" id="rbs" placeholder="Enter Random blood Sugar" class="form-control input-height" onchange="javascript:updateBMI();" /> </div>
									</div>
									<hr/>
									

									<div class="form-group row">
										<label class="control-label col-md-4">AVPU Score
										</label>
										<div class="col-md-6">
											<SearchableSelectField class="form-control input-height" name="avpu_score" id="avpu_score">
												<option>Select</option>
												<option value="Alert">ALERT</option>
												<option value="Verbal">VERBAL RESPONSE</option>
												<option value="Pain">PAIN RESPONSE</option>
												<option value="Unresponsive">UNRESPONSIVE</option>
												<option value="Confused">CONFUSED</option>
											</SearchableSelectField>
										</div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-4">Mobility
										</label>
										<div class="col-md-6">
											<SearchableSelectField class="form-control input-height" name="mobility" id="mobility">
												<option>Select</option>
												<!-- php: if(Cake\Core\Configure::read('MOBILITIES') != null) { -->
													<!-- php: foreach(Cake\Core\Configure::read('MOBILITIES') as $key => $value) { -->
														<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
													<!-- php: } -->
												<!-- php: } -->
											</SearchableSelectField>
										</div>
									</div>
									<div class="form-group row">
										<label class="control-label col-md-4">Trauma
										</label>
										<div class="col-md-6">
											<SearchableSelectField class="form-control input-height" name="trauma" id="trauma">
												<option>Select</option>
												<option value="No">No</option>
												<option value="Yes">Yes</option>
											</SearchableSelectField>
										</div>
									</div>
									<div class="row">
										<div class="offset-md-4 col-md-8">
											<button type="button" class="btn btn-info" onclick='sumbitPatientVitalsData()'>Submit</button>
											<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
										</div>
									</div>
									
								</div>

						</div>
						
						<div class="col-md-4">
							<h3>Notice </h3>
							
							<div>
								Triage Details use vitals to assign color code based on severity. Click below to download a printable version
								<div style="padding-bottom: 10px">
									<a target='_blank' href="<!-- php: = $this->Url->image('doc/TEWS_firstline24.pdf') -->" class="btn btn-primary">Download</a>
								</div>
								<br/>
							</div>
							
							<div>
								Color Codes<br/><br/>
								<div style="padding-bottom: 10px">
									<span class="label label-mini" style="background: #2f5597">&nbsp;</span> = <span>Deceased</span>
								</div>
								<div style="padding-bottom: 10px">
									<span class="label label-mini" style="background: #ff0000">&nbsp;</span> = <span>Immediate (0mins) </span>
								</div>
								<div style="padding-bottom: 10px">
									<span class="label label-mini" style="background: #ff8800">&nbsp;</span> = <span>Urgent (Within 10mins)</span>
								</div>
								<div style="padding-bottom: 10px">
									<span class="label label-mini" style="background: #ffff00">&nbsp;</span> = <span>Less Urgent (Within the hour)</span>
								</div>
								<div style="padding-bottom: 10px">
									<span class="label label-mini" style="background: #00ff00">&nbsp;</span> = <span>Not Urgent</span>
								</div>
								<br/>
							</div>
							<p>
								When vitals is submitted, Seriousness level is automatically calculated and a colour is assigned to the patients for admission recommendations
							</p>
							<div class="form-group row">
								<label class="control-label col-md-4">Back Date
								</label>
								<div class="col-md-8">
									<input type="datetime-local" class="form-control" name="back_date" id="back_date">
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- php: } -->
				
				<div class="tab-pane vitals_view_vitals" id="borderBox_tab2">
					<div class="card-body ">
						<div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width" id="vitals_table" style="width: 100%">
								<thead>
									<tr>
										<th class="center"> Date</th>
										<th class="center"> Temperature </th>
										<th class="center"> SpO<sub>2</sub> </th>
										<th class="center"> Respiratory Rate </th>
										<th class="center"> Pulse </th>
										<th class="center"> Blood Pressure </th>
										<th class="center"> Weight </th>
										<th class="center"> Height </th>
										<th class="center"> BMI </th>
										<th class="center"> Blood Sugar</th>
										<th class="center"> AVPU</th>
										<th class="center"> Actions</th>
										
									</tr>
								</thead>
								<tbody>
																
								</tbody>
							</table>
						</div>
					</div>
				</div>			
				
				<div class="tab-pane vitals_graph_vitals" id="borderBox_tab3">
					<div class="card-body ">
						
						<!-- php: // if(sizeof($selectedVisit->patient_visit_vitals) <= 0) { -->
						<!-- php: if(sizeof($allVitals) <= 0) { -->
							<h3 style="text-align: left;">Vitals Chart</h3>
							<hr/>
							<h3 style="text-align: center;">No vitals recorded</h3>
						<!-- php: } else { -->
							<div class="row">
								<div id="echarts_line" style="width:100%; height: 500px;"></div>
							</div>
							<div class="row">
								<div id="echarts_blood_sugar" style="width:100%; height: 500px;"></div>
							</div>

							<div class="row">
								<div id="echarts_spo" style="width:100%; height: 500px;"></div>
							</div>
						
							<div class="row">
								<div id="echarts_candle" style="width:100%; height: 500px;"></div>
							</div>
						<!-- php: } -->
						
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>



	


<script>

	const vitalsTab_visit_id = "<!-- php: = $selectedVisit->id -->"
	const vitalsTab_current_visit = "<!-- php: = $isCurrentVisit -->"

	const savePatinetVitalsDataAjax_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'savePatientVisitVitals' ] ); -->"
	const getTriageColor_link = "<!-- php: echo $this->Url->build( [ 'controller' => 'Patients', 'action' => 'getTraigeDetails', $selectedVisit->id, $selectedVisit->patient_id ] ); -->"
	const vitalsTab_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getPatientVisitVitals']) -->"
	const echarts_link = "<!-- php: = $this->Url->webroot('assets/plugins') -->/echarts";
	const vitalsTab_edit_link = '<!-- php: =$this->Url->build(['controller'=>'PatientVisitVitals','action'=>'editVitals']) -->/'
</script>
<!-- php: = $this->Html->script('../assets/js/pages/visit_space/vitals.js') -->
`;

export default function ElementElementPatientvisitVitals() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
