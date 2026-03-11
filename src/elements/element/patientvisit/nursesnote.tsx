const rawHtml = `

						<div class="row">
							<div class="borderBox light bordered col-md-12">
								<div class="borderBox-title tabbable-line">
									<div class="caption">
										<span class="caption-subject font-dark bold uppercase">NURSE'S NOTES</span>
									</div>
									<ul class="nav nav-tabs" id="nurseNoteTab">
										<!-- php: if($isCurrentVisit) { -->
											<li class="nav-item nurses_note_add_medication">
												<a href="#nurses_note_add_medication_tab" data-toggle="tab"> Add </a>
											</li>
										<!-- php: } -->
										<li class="nav-item nurses_note_view_medications">
											<a href="#nurses_note_view_medications_tab" data-toggle="tab"> View </a>
										</li>
									</ul>
								</div>
								<div class="borderBox-body">
									<div class="tab-content">
										<!-- php: if($isCurrentVisit) { -->
											<div class="tab-pane nurses_note_add_medication " id="nurses_note_add_medication_tab">
											<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisitNurseNotes', 'action' => 'addNurseNote', $patient->id, $selectedVisit->id], 'id' => 'nurseNoteForm']); -->
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
																<textarea name="notes" id="nursesummernote" placeholder="Notes" class="form-control " rows="5" ></textarea>
															</div>
													</div>
													<input type="hidden" id="hidden" name="request_type" value="new_nursesnote">
													<div class="row">
														<div class="offset-md-3 col-md-5">
															<button type="submit" class="btn btn-info">Submit</button>
															<button type="button" class="btn btn-default" onclick = 'clearNursesNote()'>Reset</button>
														</div>
													</div>
												</div>
											<!-- php: =$this->Form->end(); -->
											</div>
										<!-- php: } -->
										<div class="tab-pane nurses_note_view_medications" id="nurses_note_view_medications_tab">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover order-column full-width" id="nursenote_table">
														<thead>
															<tr>
																<th> Date </th>
																<th> Title </th>
																<th> Note </th>
																<th class="center"> Actions </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: if (sizeof($selectedVisit->patient_visit_nurse_notes) > 0) { -->
															<!-- php: for ($i = (sizeof($selectedVisit->patient_visit_nurse_notes) - 1); $i >= 0; $i- -) { -->
															<!-- php: // foreach ($selectedVisit->patient_visit_nurse_notes as $nurseNote): -->
															<!-- php: $nurseNote = $selectedVisit->patient_visit_nurse_notes[$i]; -->
																<tr class="odd gradeX">
																	<td><!-- php: =$nurseNote->date_added --></td>
																	<td><!-- php: =$nurseNote->title --></td>
																	<td><!-- php: =$nurseNote->notes --></td>
																	<td class="center">
																		<!-- php: if($isCurrentVisit) { -->
																			<a href="<!-- php: = $this->Url->build(['controller'=>'PatientVisitNurseNotes','action'=>'editNurseNote',$nurseNote->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs medications_view_patient_medication">
																				Edit
																			</a>
																		<!-- php: } -->
																	</td>
																</tr>
															<!-- php: } -->									
														<!-- php: } -->									
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
	$("#nurseNoteForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
		
	// $('#nursesummernote').summernote({
	// 	placeholder: '',
	// 	tabsize: 2,
	// 	height: 350
	// });

	CKEDITOR.replace( 'nursesummernote',
	{
		toolbar : 'Basic',
		uiColor : '#9AB8F3'
	});
});


function clearNursesNote(){
	$('#title').val('');
	$('#notes').val('');
	//document.getElementById('notes').innerHTML = '';
}

</script>

<script>
	$(document).ready(function() {
		// save tab in local storage
		$('#nurseNoteTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
			localStorage.setItem('nurseNoteLastTab', $(this).attr('href'));
		});
		
		// display last tab if exist
		var nurseNoteLastTab = localStorage.getItem('nurseNoteLastTab');
		if (nurseNoteLastTab) {
		   $('#nurseNoteTab a[href=' + nurseNoteLastTab + ']').tab('show');
		}
		
		else
		{
		  // Set the first tab if cookie do not exist
		  $('#nurseNoteTab a[data-toggle="tab"]:first').tab('show');
		}
	})
</script>
`;

export default function ElementElementPatientvisitNursesnote() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
