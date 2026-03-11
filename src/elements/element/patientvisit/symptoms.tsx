const rawHtml = `

						<div class="row">
							<div class="borderBox light bordered col-md-12">
								<div class="borderBox-title tabbable-line">
									<div class="caption">
										<span class="caption-subject font-dark bold uppercase">SYMPTOMS</span>
									</div>
									<ul class="nav nav-tabs">
										<li class="nav-item symptoms_add_symptom">
											<a href="#borderBox_tab4 " data-toggle="tab"> Add </a>
										</li>
										<li class="nav-item symptoms_view_symptoms">
											<a href="#borderBox_tab5 " data-toggle="tab"> View </a>
										</li>
										<!--<li class="nav-item">
											<a href="#borderBox_tab6" data-toggle="tab" class="active"> Tab 6 </a>
										</li>-->
									</ul>
								</div>
								<div class="borderBox-body">
									<div class="tab-content">
										<div class="tab-pane symptoms_add_symptom" id="borderBox_tab4">
											<!-- php: = $this->Form->create($symptoms, ['id' => 'symptomsForm']); -->
													
												<div class="form-body">	
													<div class="form-group row">
														<label class="control-label col-md-3">Chief Complaint
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
															<input type="text" name="chief_complaint" id="chief_complaint" data-required="1" placeholder="provide concise statement for presenting complaint" class="tags" data-type="fixedWidth-tags" data-highlight-color="#EFC000" required /> </div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">History of Presenting Complaints
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
															<textarea name="history" id="history" placeholder="History of Presenting Complaint" class="tags" data-type="fixedWidth-tags" data-highlight-color="#EFC000" required ></textarea>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">On Direct Questioning (ODQ)
															<span class="required"> * </span>
														</label>
														<div class="col-md-8">
															<textarea name="other_complaint" id="other_complaint" placeholder="enter other complaint" class="tags" data-type="fixedWidth-tags" data-highlight-color="#EFC000" required ></textarea>
														</div>
													</div>
													<div class="form-group row">
														<label class="control-label col-md-3">Co-morbidities
															
														</label>
														<div class="col-md-8">
															
															<SearchableSelectField class="form-control input-height" name="blood_group_id" id="blood_group_id">
																<option value="">Select...</option>
																<!-- php: foreach($illnesses as $illness) { -->
																	<option value="<!-- php: = $illness->id -->"><!-- php: = $illness->name --></option>
																<!-- php: } -->
															</SearchableSelectField>
														</div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_symptoms">
													<div class="row">
														<div class="offset-md-4 col-md-8">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default" onclick = 'clearSymptoms()'>Reset</button>
														</div>
													</div>
													
												</div>
											<!-- php: =$this->Form->end(); -->
										</div>
										<div class="tab-pane active symptoms_view_symptoms" id="borderBox_tab5">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover table-checkable order-column full-width" id="symptomsBox">
														<thead>
															<tr style="width: 100%">
																<th class="center"> Date</th>
																<th class="center"> Chief Complaint </th>
																<th class="center"> History </th>
																<th class="center"> ODQ </th>
																<th class="center"> Co-Morbidities </th>
																<th class="center"> Actions </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: foreach ($patientSymptoms as $patientSymptom): -->
															<tr class="odd gradeX">
																<td class="center"><!-- php: =$patientSymptom->symptom->date_created --></td>
																<td class="center"><!-- php: = $patientSymptom->symptom->chief_complaint --></td>
																<td class="center"><!-- php: = $patientSymptom->symptom->history --></td>
																<td class="center"><!-- php: = $patientSymptom->symptom->other_complaint --></td>
																<td class="center"><!-- php: =$patientSymptom->symptom->co_morbidities --></td>		
																<td class="center">
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Symptoms','action'=>'editSymptoms',$patientSymptom->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs symptoms_edit_symptom">
																		Edit
																	</a>
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Symptoms','action'=>'viewSymptoms',$patientSymptom->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.View') --> btn-xs symptoms_view_patient_symptom">
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
									</div>
								</div>
							</div>
						</div>
					
<script>

$(function () {
	
	$("#symptomsForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
	
	$("#chief_complaint").tagsInput();
	$("#history").tagsInput();
	$("#other_complaint").tagsInput();
	$("#co_morbidities").tagsInput();
});


function clearSymptoms(){
	$('#chief_complaint').importTags('');
	$('#history').importTags('');
	$('#other_complaint').importTags('');
	$('#co_morbidities').importTags('');
	// $('#tags-input').importTags('');
	
}

</script>
`;

export default function ElementElementPatientvisitSymptoms() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
