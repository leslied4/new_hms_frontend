const rawHtml = `


						<div class="row">
							<div class="borderBox light bordered col-md-12">
								<div class="borderBox-title tabbable-line">
									<div class="caption">
										<span class="caption-subject font-dark bold uppercase">CLINICAL NOTES</span>
									</div>
									<ul class="nav nav-tabs">
										<li class="nav-item add_clinicals_tab">
											<a href="#add_clinicals_tab" data-toggle="tab"> Add </a>
										</li>
										<li class="nav-item view_clinicals_tab">
											<a href="#view_clinicals_tab" data-toggle="tab"> View </a>
										</li>
									</ul>
								</div>
								<div class="borderBox-body">
									<div class="tab-content">
										<div class="tab-pane add_clinicals" id="add_clinicals_tab">
										<!-- php: = $this->Form->create($visitClinical, ['id' => 'clinicalNoteForm']); -->
											<div class="form-body">
												<!-- div class="form-group row">
													<label class="control-label col-md-3">Notes
														<span class="required"> * </span>
													</label>
													<div class="col-md-8">
															<textarea name="notes" id="notes" placeholder="Notes" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div -->
												<div class="form-group row">
													<label class="control-label col-md-3">Past Medical/Surgical History (PM/SHx)
														
													</label>
													<div class="col-md-8">
															<textarea name="history" id="history" placeholder="History" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Family History (FHx)
														
													</label>
													<div class="col-md-8">
															<textarea name="fhx" id="fhistory" placeholder="Family History" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Drug History (Rx)
														
													</label>
													<div class="col-md-8">
															<textarea name="rx" id="dhistory" placeholder="Drug History" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Social History (SHx)
														
													</label>
													<div class="col-md-8">
															<textarea name="shx" id="shistory" placeholder="Social History" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Examination
														
													</label>
													<div class="col-md-8">
															<textarea name="examination" id="examination" placeholder="Examination" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<div class="form-group row">
													<label class="control-label col-md-3">Other Information
														
													</label>
													<div class="col-md-8">
															<textarea name="other_information" id="other_information" placeholder="Other Information" class="form-control-textarea" rows="5" ></textarea>
														</div>
												</div>
												<input type="hidden" id="hidden" name="request_type" value="new_clinical">
												<div class="row">
													<div class="offset-md-4 col-md-8">
														<button type="submit" class="btn btn-info">Submit</button>
														<button type="button" class="btn btn-default" onclick = 'clearFields()'>Reset</button>
													</div>
												</div>
											</div>
										<!-- php: =$this->Form->end(); -->
										</div>
										<!--
										1. Past medical/surgical history (PM/SHx)

										2. Family history (FHx)

										3. Drug History (Rx)

										4. Social History (SHx)
										-->
										<div class="tab-pane active view_clinicals" id="view_clinicals_tab">
											<div class="card-body ">
												<div class="table-scrollable">
													<table class="table table-hover table-checkable order-column full-width" id="nursenote_table">
														<thead>
															<tr>
																<th class="center"> Date </th>
																<!-- th class="center"> Notes </th -->
																<th class="center"> PM/SHx </th>
																<th class="center"> FHx </th>
																<th class="center"> Rx </th>
																<th class="center"> SHx </th>
																<th class="center"> Examination </th>
																<th class="center"> Other Info </th>
																<th class="center"> Action </th>
															</tr>
														</thead>
														<tbody>
														<!-- php: foreach ($visitClinicals as $visitClinical): -->
															<tr class="odd gradeX">
																<td class="center"><!-- php: =$visitClinical->date_created --></td>
																<td class="center"><!-- php: =$visitClinical->history --></td>
																<td class="center"><!-- php: =$visitClinical->fhx --></td>
																<td class="center"><!-- php: =$visitClinical->rx --></td>
																<td class="center"><!-- php: =$visitClinical->shx --></td>
																<td class="center"><!-- php: =$visitClinical->examination --></td>
																<td class="center"><!-- php: =$visitClinical->other_information --></td>
																<td class="center">
																	<a href="<!-- php: =$this->Url->build(['controller'=>'Clinicals','action'=>'editClinicals',$visitClinical->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs symptoms_edit_symptom">
																		Edit
																	</a>
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
	$("#clinicalNoteForm").submit(function () {
		return confirm('Are you sure you want to submit ?');
		// return true;
	});
});
</script>

`;

export default function ElementElementPatientvisitClinicals() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
