const rawHtml = `
<!-- php: $value = $selectedVisit->has('patient_examination_groin') ? $selectedVisit->patient_examination_groin : null; -->

<div class="row">
	<div class="col-md-12 col-sm-12">
		<div class="table-container">
			<div style="float: left">
				<h4>Groin Examination</h4>
			</div>
			<div style="float: right">
					
				<!-- php: if(!isset($value) || $value == null) { -->
				<a data-toggle="modal" data-target="#addGroinExaminationDialogue" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Groin Examination
				</a>
				
				
				<div class="modal fade" id="addGroinExaminationDialogue" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Add Groin Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'addGroinExamination', $selectedVisit->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Lymph Nodes
													
													</label>
													<div class="col-md-7">
														<input type="text" name="lymph_node" data-required="0" placeholder="Enter lymph nodes" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Signifcant Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" name="other_significant_findings" data-required="0" placeholder="Enter other significant findings" class="form-control input-height" /> 
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
				
				<!-- php: } else { -->
				<a data-toggle="modal" data-target="#editGroinExaminationDialogue_<!-- php: = $value->id -->" style="margin-top: 12px" href="javascript:" class="btn btn-primary btn-xs">
					Update Groin Examination
				</a>
				
				<div class="modal fade" id="editGroinExaminationDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Update Groin Examination</h4>
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
										<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Examinations', 'action' => 'editGroinExamination', $value->id], 'class' => 'form-horizontal']) -->
											<div class="form-body">		
															
												<div class="form-group row">
													<label class="control-label col-md-5">Lymph Nodes
													
													</label>
													<div class="col-md-7">
														<input type="text" name="lymph_node" value="<!-- php: = $value->lymph_node -->" data-required="0" placeholder="Enter lymph node" class="form-control input-height" /> 
													</div>
												</div>
															
												<div class="form-group row">
													<label class="control-label col-md-5">Other Signifcant Findings
													
													</label>
													<div class="col-md-7">
														<input type="text" name="other_significant_findings" value="<!-- php: = $value->other_significant_findings -->" data-required="0" placeholder="Enter other significant findings" class="form-control input-height" /> 
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
				
				<!-- php: } -->
				
			</div>
			
			<div style="clear: both"></div>
			
			<ul class="list-group list-group-unbordered">
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Lymph Nodes</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->lymph_node : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
				<li class="list-group-item">
					&nbsp;&nbsp;<b>Other Signifcant Findings</b> <a class="pull-right"><!-- php: = (isset($value) ? $value->other_significant_findings : 'N/A') -->&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
		
</div>

<br/>

<hr/>


`;

export default function ElementElementPatientvisitExaminationGroinexam() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
