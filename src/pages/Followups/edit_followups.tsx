import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Followups/edit_followups.php';
const rawHtml = `

<div class="row">
	<div class="col-md-12">
		<!-- BEGIN PROFILE SIDEBAR -->
		<!--<div class="profile-sidebar">
			<div class="card card-topline-aqua">
				<div class="card-body no-padding height-9">
					<div class="row">
						<div class="profile-userpic">
							<!-- php: = $this->Html->image('../assets/img/dp.jpg') -->
							<!--<img src="../assets/img/dp.jpg" class="img-responsive" alt=""> </div>
					</div>
					<div class="profile-usertitle">
						<div class="profile-usertitle-name"><!-- php: = $patient->first_name.' '. $patient->last_name --></div>
						<div class="profile-usertitle-job"><!-- php: = $patient->occupation --> </div>
					</div>
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Folder Number</b> <a class="pull-right"><!-- php: = $patient->folder --> </a>
						</li>
						<li class="list-group-item">
							<b>Sex</b> <a class="pull-right"><!-- php: = $patient->gender->name --> </a>
						</li>
						<li class="list-group-item">
							<b>Blood Group</b> <a class="pull-right"><!-- php: = $patient->blood_group->name --> </a>
						</li>
					</ul>
					
					<div class="profile-usertitle">
						<div class="profile-usertitle-name">Visits</div>
					</div>
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>DATE</b> <a class="pull-right">DIAGNOSIS </a>
						</li>
						<li class="list-group-item">
							<b>12/10/2018</b> <a class="pull-right">Malaria </a>
						</li>
						<li class="list-group-item">
							<b>11/10/2018</b> <a class="pull-right">Typhoid </a>
						</li>
						
					</ul>
					<!-- END SIDEBAR USER TITLE 
					
				</div>
			</div>
			
			
			
		</div>-->
		<!-- END BEGIN PROFILE SIDEBAR -->
		<!-- BEGIN PROFILE CONTENT -->
		<div class="profile-content">
			<div class="row">
				<!--<div class="profile-tab-box">
					<div class="p-l-20">
						<ul class="nav ">
							<li class="nav-item tab-all"><a
								class="nav-link active show" href="#tab1" data-toggle="tab">Vitals</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab2" data-toggle="tab">Symptoms</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab3" data-toggle="tab">Diagnoses</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab4" data-toggle="tab">Labs</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab5" data-toggle="tab">Surgeries</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab6" data-toggle="tab">Treatments</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab7" data-toggle="tab">Medications</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab8" data-toggle="tab">Deliveries</a></li>
							<li class="nav-item tab-all p-l-20"><a class="nav-link"
								href="#tab9" data-toggle="tab">Followups</a></li>
						</ul>
					</div>
				</div>-->
				<div class="white-box">
					<!-- Tab panes -->
					<div class="tab-content">
						<div class="tab-pane active fontawesome-demo" id="tab1">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">FOLLOW UPS</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab1" data-toggle="tab"> Edit </a>
											</li>
											
											
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab1">
												
												<!-- php: = $this->Form->create($editFollowups); -->
													<div class="form-body">
														<div class="form-group row">
															<label class="control-label col-md-3">Description/Problem
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<textarea name="description" id="description" class="form-control-textarea" rows="5" ><!-- php: =$editFollowups->description --></textarea>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Assigned Doctor
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
																<SearchableSelectField class="form-control input-height" name="user_id" id="user_id" value="<!-- php: =$editFollowups->user->first_name -->" >
																	<!-- php: foreach($doctors as $doctor) { -->
																	<option value="<!-- php: =$doctor->id -->"><!-- php: =$doctor->first_name.' '. $doctor->last_name --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Department Name
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
																<SearchableSelectField class="form-control input-height" name="department_id" id="department_id" value="<!-- php: =$editFollowups->department->name -->">
																	<!-- php: foreach($departments as $department) { -->
																	<option value="<!-- php: =$department->id -->"><!-- php: =$department->name --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Date of Visit
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
																<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																	<input class="form-control input-height" size="16" placeholder="" name = "date_of_visit" id = "date_of_visit" type="text" value ="<!-- php: =$editFollowups->date_of_visit -->">
																	<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
																</div>
																<input type="hidden" id="dtp_input2" value="" />
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Comment
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																	<textarea name="comment"id="follcomment" placeholder="description" class="form-control-textarea" rows="5" ><!-- php: =$editFollowups->comment --></textarea>
																</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Status
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
																<SearchableSelectField class="form-control input-height" name="followupstatus_id" id="followupstatus_id" value="<!-- php: =$editFollowups->followupstatus->name -->">
																	<!-- php: foreach($followupstatuses as $followupstatus) { -->
																	<option value="<!-- php: =$followupstatus->id -->"><!-- php: =$followupstatus->name --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<input type="hidden" id="hidden" name="request_type" value="new_followups">
														<div class="row">
															<div class="offset-md-4 col-md-8">
																<button type="submit" id="submit" class="btn btn-info">Submit</button>
																<a href="<!-- php: =$this->Url->build(['controller'=>'Patients','action'=>'viewPatientProfile',$editFollowups->patient_visit->patient_id, $editFollowups->patient_visit->id]) -->"><button type="button" class="btn btn-default">Cancel</button></a>
															</div>
														</div>
													</div>
												<!-- php: = $this->Form->end(); -->
												
											</div>
											<div class="tab-pane" id="borderBox_tab2">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example6">
															<thead>
																<tr>
																	<th class="center"> Date</th>
																	<th class="center"> Weight </th>
																	<th class="center"> Temperature </th>
																	<th class="center"> Pulse </th>
																	<th class="center"> Blood Pressure </th>
																	<th class="center"> Actions</th>
																	
																</tr>
															</thead>
															<tbody>
															<!-- php: foreach ($patientVitals as $patientVital): -->
																<tr class="odd gradeX">
																	<td class="center"><!-- php: = $patientVital->date_created --></td>
																	<td class="center"><!-- php: =$patientVital->weight --></td>
																	<td class="center"><!-- php: =$patientVital->temperature --></td>
																	<td class="center"><!-- php: =$patientVital->pulse --></td>
																	<td class="center"><!-- php: =$patientVital->blood_pressure_1 . ' / ' .$patientVital->blood_pressure_2 --></td>
																	<td class="center">
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Vitals','action'=>'editVitals',$patientVital->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Vitals','action'=>'viewVitals',$patientVital->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab3">
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
											</div>
										</div>
									</div>
									
								</div>
							</div>
						</div>
						<div class="tab-pane" id="tab2">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">SYMPTOMS</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab4" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab5" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab6" data-toggle="tab" class="active"> Tab 6 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab4">
												<!-- php: = $this->Form->create($symptoms, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
													<div class="form-body">
														<div class="form-group row">
															<label class="control-label col-md-3">Name
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="name" data-required="1" placeholder="headache, fever, ...." class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Description
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<textarea name="description" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
															</div>
														</div>
														<input type="hidden" id="hidden" name="request_type" value="new_symptoms">
														<div class="row">
															<div class="offset-md-4 col-md-8">
																<button type="submit" class="btn btn-info">Submit</button>
																<button type="button" class="btn btn-default">Cancel</button>
															</div>
														</div>
														
													</div>
												<!-- php: =$this->Form->end(); -->
											</div>
											<div class="tab-pane" id="borderBox_tab5">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example5">
															<thead>
																<tr>
																	<th class="center"> Date</th>
																	<th class="center"> Name </th>
																	<th class="center"> Description </th>
																	<th class="center"> Actions </th>
																</tr>
															</thead>
															<tbody>
															<!-- php: foreach ($patientSymptoms as $patientSymptom): -->
																<tr class="odd gradeX">
																	<td class="center"><!-- php: =$patientSymptom->symptom->date_created --></td>
																	<td class="center"><!-- php: = $patientSymptom->symptom->name --></td>
																	<td class="center"><!-- php: =$patientSymptom->symptom->description --></td>		
																	<td class="center">
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Symptoms','action'=>'editSymptoms',$patientSymptom->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Symptoms','action'=>'viewSymptoms',$patientSymptom->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab6">
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="tab3">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">DIAGNOSES</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab7" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab8" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab9" data-toggle="tab" class="active"> Tab 9 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab7">
												<!-- php: = $this->Form->create($diagnoses, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
													<div class="form-body">
														<div class="form-group row">
															<label class="control-label col-md-3">Name
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="name" data-required="1" placeholder="malaria" class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Description
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<textarea name="description" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
															</div>
														</div>
														<input type="hidden" id="hidden" name="request_type" value="new_diagnoses">
														<div class="row">
															<div class="offset-md-4 col-md-8">
																<button type="submit" class="btn btn-info">Submit</button>
																<button type="button" class="btn btn-default">Cancel</button>
															</div>
														</div>
														
													</div>
												<!-- php: =$this->Form->end(); -->
											</div>
											<div class="tab-pane" id="borderBox_tab8">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example5">
															<thead>
																<tr>
																	<th class="center"> Date</th>
																	<th class="center"> Name </th>
																	<th class="center"> Description </th>
																	<th class="center"> Actions </th>
																</tr>
															</thead>
															<tbody>
															<!-- php: foreach ($patientDiagnoses as $patientDiagnosis): -->
																<tr class="odd gradeX">
																	<td class="center"><!-- php: =$patientDiagnosis->diagnosis->date_created --></td>
																	<td class="center"><!-- php: = $patientDiagnosis->diagnosis->name --></td>
																	<td class="center"><!-- php: = $patientDiagnosis->diagnosis->description --></td>											
																	<td class="center">
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Diagnoses','action'=>'editDiagnoses',$patientDiagnosis->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Diagnoses','action'=>'viewDiagnoses',$patientDiagnosis->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab9">
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="tab4">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">LABS</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab10" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab11" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab12" data-toggle="tab" class="active"> Tab 12 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab10">
												<!-- php: = $this->Form->create($labs, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
													<div class="form-body">
														<div class=" row section-head">
															<div class="col-md-12">
																<h3>Haematology</h3>
															</div>
														</div>
													
														<div class="form-group row">
															<label class="control-label col-md-3">Haemoglobin
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="haemoglobin" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Malaria Parasites
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="malaria_parasite">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Blood Group
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
																<SearchableSelectField class="form-control input-height" name="blood_group_id">
																	<option value="">Select...</option>
																		<!-- php: foreach($bloodgroups as $bloodgroup) { -->
																	<option value="<!-- php: = $bloodgroup->id -->"><!-- php: = $bloodgroup->name --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Electrophoresis
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="electrophoresis" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">G6PD Screen
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB2_STATUSES = [ 10 =>'FULL DEFECT', 9 => 'PARTIAL DEFECT', 8 => 'NO DEFECT', 11=> 'NOT DONE' ]; -->
																<SearchableSelectField class="form-control input-height" name="g6pd_screen">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB2_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Sickling Status
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="sickling_status">
																	
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
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB1_STATUSES = [ 6 => 'REACTIVE', 7 => 'NOT REACTIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="hiv">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB1_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Hepatitis B
																<span class="required"> * </span>
															</label>
															
															<div class="col-md-5">
															<!-- php: $LAB1_STATUSES = [ 6 => 'REACTIVE', 7 => 'NOT REACTIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="hepatitis_b">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB1_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Syphillis(VDRL)
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB1_STATUSES = [ 6 => 'REACTIVE', 7 => 'NOT REACTIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="syphillis">
																	
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
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="urine_sugar">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Urine Protein
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="urine_protein">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Specific Gravity
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="specific_gravity" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">PH
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="ph" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Nitrite
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="nitrite">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Leucocyte
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="leucocyte">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Pus Cells
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="pus_cell" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Blood
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="blood" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<div class=" row section-head">
															<h3>Others</h3>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Pregnancy Test
																<span class="required"> * </span>
															</label>
															<div class="col-md-5">
															<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
																<SearchableSelectField class="form-control input-height" name="pregnancy_test">
																	
																	<option value="">Select...</option>
																		<!-- php: foreach($LAB3_STATUSES as $key => $value) { -->
																	<option value="<!-- php: = $key -->"><!-- php: = $value --></option>
																	<!-- php: } -->
																</SearchableSelectField>
															</div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Fasting Blood Sugar
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="fasting_blood_sugar" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<div class="form-group row">
															<label class="control-label col-md-3">Random Blood Sugar
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="random_blood_sugar" data-required="1" placeholder="" class="form-control input-height" /> </div>
														</div>
														<input type="hidden" id="hidden" name="request_type" value="new_labs">
														<div class="row">
															<div class="offset-md-4 col-md-8">
																<button type="submit" class="btn btn-info">Submit</button>
																<button type="button" class="btn btn-default">Cancel</button>
															</div>
														</div>
														
													</div>
												<!-- php: =$this->Form->end(); -->
											</div>
											
											<div class="tab-pane" id="borderBox_tab11">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example4">
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
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Labs','action'=>'editLabs',$patientLab->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Labs','action'=>'viewLabs',$patientLab->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab12">
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="tab5">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">SURGERIES</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab13" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab14" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab15" data-toggle="tab" class="active"> Tab 15 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab13">
											<!-- php: = $this->Form->create($surgeries, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
												<div class="form-body">
													<div class="form-group row">
														<label class="control-label col-md-3">Surgery type
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="surgery_type_id">
																<option value="">Select...</option>
																	<!-- php: foreach($surgerytypes as $surgerytype) { -->
																<option value="<!-- php: = $surgerytype->id -->"><!-- php: = $surgerytype->name --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Name
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
															<input type="text" name="name" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Comment
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
																<textarea name="comments" placeholder="" class="form-control-textarea" rows="5" ></textarea>
															</div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_surgeries">
													<div class="row">
														<div class="offset-md-4 col-md-8">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default">Cancel</button>
														</div>
													</div>
													
												</div>
												<!-- php: = $this->Form->end(); -->
											</div>
											<div class="tab-pane" id="borderBox_tab14">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example4">
															<thead>
																<tr>
																	<th class="center"> Date</th>
																	<th class="center"> Surgery Type </th>
																	<th class="center"> Name </th>
																	<th class="center"> Comment </th>
																	<th class="center"> Actions </th>
																</tr>
															</thead>
															<tbody>
															<!-- php: foreach ($patientSurgeries as $patientSurgery): -->
																<tr class="odd gradeX">
																	<td class="center"><!-- php: = $patientSurgery->surgery->date_created --></td>
																	<td class="center"><!-- php: = $patientSurgery->surgery->surgery_type->name --></td>
																	<td class="center"><!-- php: =$patientSurgery->surgery->name --></td>
																	<td class="center"><!-- php: =$patientSurgery->surgery->comments --></td>
																	<td class="center">
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Surgeries','action'=>'editSurgeries',$patientSurgery->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Surgeries','action'=>'viewSurgeries',$patientSurgery->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab15">
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="tab6">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">TREATMENTS</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab16" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab17" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab18" data-toggle="tab" class="active"> Tab 18 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab16">
											<!-- php: = $this->Form->create($treatments, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
												<div class="form-body">
													<div class="form-group row">
														<label class="control-label col-md-3">Name
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
															<input type="text" name="name" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Description
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
																<textarea name="description" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
															</div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_treatments">
													<div class="row">
														<div class="offset-md-4 col-md-8">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default">Cancel</button>
														</div>
													</div>
												</div>
											<!-- php: = $this->Form->end(); -->
											</div>
											<div class="tab-pane" id="borderBox_tab17">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example4">
															<thead>
																<tr>
																	<th class="center"> Date</th>
																	<th class="center"> Name </th>
																	<th class="center"> Description </th>
																	<th class="center"> Actions </th>
																</tr>
															</thead>
															<tbody>
															<!-- php: foreach ($patientTreatments as $patientTreatment): -->
																<tr class="odd gradeX">
																	<td class="center"><!-- php: =$patientTreatment->treatment->date_created --></td>
																	<td class="center"><!-- php: = $patientTreatment->treatment->name --></td>
																	<td class="center"><!-- php: =$patientTreatment->treatment->description --></td>
																	<td class="center">
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Treatments','action'=>'editTreatments',$patientTreatment->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Treatments','action'=>'viewTreatments',$patientTreatment->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab18">
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="tab7">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">MEDICATIONS</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab19" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab20" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab21" data-toggle="tab" class="active"> Tab 21 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab19">
											<!-- php: = $this->Form->create($medications, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
												<div class="form-body">
													<div class="form-group row">
														<label class="control-label col-md-3">Name
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
															<input type="text" name="name" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Description
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
																<textarea name="description" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
															</div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_medications">
													<div class="row">
														<div class="offset-md-4 col-md-8">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default">Cancel</button>
														</div>
													</div>
												</div>
											<!-- php: =$this->Form->end(); -->
											</div>
											<div class="tab-pane" id="borderBox_tab20">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example4">
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
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Medications','action'=>'editMedications',$patientMedication->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Medications','action'=>'viewMedications',$patientMedication->id]) -->" class="btn btn-tbl-delete btn-xs">
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
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="tab8">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">DELIVERIES</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab22" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab23" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab24" data-toggle="tab" class="active"> Tab 24 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab22">
											<!-- php: = $this->Form->create($medications, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
												<div class="form-body">
													<div class="form-group row">
														<label class="control-label col-md-3">Admission Date
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																<input class="form-control input-height" size="16" placeholder="" name = "admission_date" type="text" value="">
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
																<input class="form-control input-height" size="16" placeholder="" name = "delivery_date" type="text" value="">
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
															<SearchableSelectField class="form-control input-height" name="gender_id">
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
															<div class="col-md-8">
																<input type="number" name="birth_weight" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Gestational Age At Delivery
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="number" name="gestational_age_at_delivery" data-required="1" placeholder="" class="form-control input-height" /> </div>
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">First Minute Apgar
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="number" name="first_minute_apgar" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Fifth Minute Apgar
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="number" name="fifth_minute_apgar" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Head Circumference(cm)
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="number" name="head_circumference" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Birth Length(cm)
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="number" name="birth_length" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Mode of Delivery
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="mode_of_delivery" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Type of Lab
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="type_of_lab" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Operative Delivery Indication
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="operative_delivery_indication" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Congenital Anomalies
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="congenital_anomalies" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Complications
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="complications" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Mother Condition At Discharge
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="mother_condition_at_discharge" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
															<label class="control-label col-md-3">Baby Condition At Discharge
																<span class="required"> * </span>
															</label>
															<div class="col-md-8">
																<input type="text" name="baby_condition_at_discharge" data-required="1" placeholder="" class="form-control input-height" /> </div>
														
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Discharge Date
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																<input class="form-control input-height" size="16" placeholder="" name = "discharge_date" type="text" value="">
																<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
															</div>
															<input type="hidden" id="dtp_input2" value="" />
														</div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_deliveries">
													<div class="row">
														<div class="offset-md-4 col-md-8">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default">Cancel</button>
														</div>
													</div>
												</div>
												<!-- php: =$this->Form->end(); -->
											</div>	
											<div class="tab-pane" id="borderBox_tab23">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example4">
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
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Deliveries','action'=>'editDeliveries',$patientDelivery->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Deliveries','action'=>'viewDeliveries',$patientDelivery->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab24">
											<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
											<p>
												<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
											</p>
											</div>
										</div>
									</div>
								</div>		
							</div>
						</div> <!--/ -->
						<div class="tab-pane" id="tab9">
							<div class="row">
								<div class="borderBox light bordered col-md-12">
									<div class="borderBox-title tabbable-line">
										<div class="caption">
											<span class="caption-subject font-dark bold uppercase">FOLLOW UPS</span>
										</div>
										<ul class="nav nav-tabs">
											<li class="nav-item">
												<a href="#borderBox_tab25" data-toggle="tab"> Add </a>
											</li>
											<li class="nav-item">
												<a href="#borderBox_tab26" data-toggle="tab"> View </a>
											</li>
											<!--<li class="nav-item">
												<a href="#borderBox_tab27" data-toggle="tab" class="active"> Tab 27 </a>
											</li>-->
										</ul>
									</div>
									<div class="borderBox-body">
										<div class="tab-content">
											<div class="tab-pane active" id="borderBox_tab25">
											<!-- php: = $this->Form->create($followups, ['url'=>['controller'=>'Patients','action' =>'viewPatientProfile', $patient->id]]); -->
												<div class="form-body">
													<div class="form-group row">
														<label class="control-label col-md-3">Description
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
																<textarea name="description" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
															</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Date of Visit
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<div class="input-group date form_date " data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
																<input class="form-control input-height" size="16" placeholder="" name = "date_of_visit" type="text" value="">
																<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
															</div>
															<input type="hidden" id="dtp_input2" value="" />
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Comment
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
																<textarea name="comment" placeholder="description" class="form-control-textarea" rows="5" ></textarea>
															</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Status
															<span class="required"> * </span>
														</label>
														<div class="col-md-5">
															<SearchableSelectField class="form-control input-height" name="followupstatus_id">
																<option value="">Select...</option>
																<!-- php: foreach($followupstatuses as $followupstatus) { -->
																<option value="<!-- php: =$followupstatus->id -->"><!-- php: =$followupstatus->name --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_followups">
													<div class="row">
														<div class="offset-md-4 col-md-8">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default">Cancel</button>
														</div>
													</div>
												</div>
												<!-- php: = $this->Form->end(); -->
											</div>
											<div class="tab-pane" id="borderBox_tab26">
												<div class="card-body ">
													<div class="table-scrollable">
														<table class="table table-hover table-checkable order-column full-width" id="example4">
															<thead>
																<tr>
																	<th class="center"> Date</th>
																	<th class="center"> Description </th>
																	<th class="center"> Date of Visit </th>
																	<th class="center"> Comment </th>
																	<th class="center"> Status </th>
																	<th class="center"> Actions </th>
																</tr>
															</thead>
															<tbody>
															<!-- php: foreach ($patientFollowups as $patientFollowup): -->
																<tr class="odd gradeX">
																	<td class="center"><!-- php: =$patientFollowup->date_created --></td>
																	<td class="center"><!-- php: =$patientFollowup->description --></td>
																	<td class="center"><!-- php: =$patientFollowup->date_of_visit --></td>
																	<td class="center"><!-- php: =$patientFollowup->comment --></td>
																	<td class="center"><!-- php: =$patientFollowup->followupstatus->name --></td>
																	<td class="center">
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Followups','action'=>'editFollowups',$patientFollowup->id]) -->" class="btn btn-tbl-edit btn-xs">
																			<i class="fa fa-pencil"></i>
																		</a>
																		<a href="<!-- php: =$this->Url->build(['controller'=>'Followups','action'=>'viewFollowups',$patientFollowup->id]) -->" class="btn btn-tbl-delete btn-xs">
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
											<div class="tab-pane" id="borderBox_tab27">
												<p>You'll. His have you'll day make beginning good, herb. Can't place lights was evening let his itself. His seas unto replenish may every said midst him. Night to air behold tree years sixth waters. Unto together can't darkness sixth heaven it. Fruit. Image. Winged, a own. The waters multiply were male. Wherein gathering replenish gathering blessed dry called second. It Beginning whose you every dry them midst don't place you're sixth he above hath, fish sea fifth. Brought called.
													<p>
														<a class="btn blue-bgcolor" href="ui_tabs_accordions_navs.html#borderBox_tab3" target="_blank"> Click here </a>
													</p>
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
	</div>
		<!-- END PROFILE CONTENT -->
</div>

<script>
$(function () {
	$("#submit").click(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>


`;

export default function FollowupsEditFollowupsPage() {
  return (
    <PageShell title="Followups/edit_followups.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
