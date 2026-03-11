const rawHtml = `

						<div class="row">
							<div class="borderBox light bordered col-md-12">
								<div class="borderBox-title tabbable-line">
									<div class="caption">
										<span class="caption-subject font-dark bold uppercase">DOCTOR'S NOTES</span>
									</div>
									<ul class="nav nav-tabs">
										<li class="nav-item nurses_note_add_medication">
											<a href="#doctors_note_add_medication_tab" data-toggle="tab"> Add </a>
										</li>
										<li class="nav-item nurses_note_view_medications">
											<a href="#doctors_note_view_medications_tab" data-toggle="tab"> View </a>
										</li>
									</ul>
								</div>
								<div class="borderBox-body">
									<div class="tab-content">
										<div class="tab-pane doctors_note_add_medication " id="doctors_note_add_medication_tab">
										<!-- php: = $this->Form->create($doctorsNote, ['id' => 'doctorNoteForm']); -->
											<div class="form-body">
												<div class="form-group row">
													<label class="control-label col-md-3">Title
														<span class="required"> * </span>
													</label>
													<div class="col-md-5">
														<input type="text" name="title" id="title" data-required="1" placeholder="Title" class="form-control input-height" /> </div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Notes
														<span class="required"> * </span>
													</label>
													<div class="col-md-5">
															<textarea name="notes" id="notes" placeholder="Notes" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<input type="hidden" id="hidden" name="request_type" value="new_doctorsnote">
												<div class="row">
													<div class="offset-md-3 col-md-5">
														<button type="submit" class="btn btn-info">Submit</button>
														<button type="button" class="btn btn-default" onclick = 'clearDoctorsNote()'>Reset</button>
													</div>
												</div>
											</div>
										<!-- php: =$this->Form->end(); -->
										</div>
										<div class="tab-pane active doctors_note_view_medications" id="doctors_note_view_medications_tab">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover table-checkable order-column full-width" id="doctornote_table">
														<thead>
															<tr>
																<th class="center"> Date </th>
																<th class="center"> Name </th>
																<th class="center"> Description </th>
																<th class="center"> Actions </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: foreach ($doctorsNotes as $doctorNote): -->
															<tr class="odd gradeX">
																<td class="center"><!-- php: =$doctorNote->date_added --></td>
																<td class="center"><!-- php: =$doctorNote->title --></td>
																<td class="center"><!-- php: =$doctorNote->notes --></td>
																<td class="center">
																	<a href="<!-- php: = $this->Url->build(['controller'=>'DoctorsNotes','action'=>'editDoctorsNote',$doctorNote->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs medications_view_patient_medication">
																		Edit
																	</a>
																	<!-- a href="<!-- php: //=$this->Url->build(['controller'=>'Medications','action'=>'viewNursesnote',$nurseNote->id]) -->" class="btn btn-tbl-delete btn-xs medications_edit_medication">
																		<i class="fa fa-eye"></i>
																	</a -->
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
	$("#doctorNoteForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
	});
});


function clearDoctorsNote(){
	$('#title').val('');
	$('#notes').val('');
}

</script>
`;

export default function ElementElementPatientvisitDoctorsnoteOld() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
