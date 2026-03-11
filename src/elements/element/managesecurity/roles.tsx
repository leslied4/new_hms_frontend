const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Roles</span>
			</div>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane active" id="roles_view">
					<div class="card  card-box">
						<div class="card-body ">

							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th> Name </th>
										<th> Description </th>
										<th> Status </th>
										<th> Action </th>

									</tr>
								</thead>
								<tbody>
								<!-- php: $ROLE_STATUSES = [ 1 => 'ENABLED', 2 => 'DISABLED', ]; foreach ($roles as $viewRole): -->

									<tr class="odd gradeX">
										<td><!-- php: =$viewRole->name --></td>
										<td><!-- php: =$viewRole->description --></td>
										<td><!-- php: =$ROLE_STATUSES[$viewRole->status_id] --></td>
										<td>
											<a data-toggle="modal" data-target="#editDiagnosisDialogue<!-- php: = $viewRole->id -->" href="javascript:" class="btn btn-primary btn-xs">
												Edit
											</a>
										</td>
									</tr>
									
									<div class="modal fade" id="editDiagnosisDialogue<!-- php: = $viewRole->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title">Edit Role</h4>
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
														<div class="card-body">

															<!-- php: = $this->Form->create($viewRole, ['url' => ['controller' => 'Roles', 'action' => 'editRole', $viewRole->id]]); -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-4">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-8">
																			<input type="text" name="name" id="name" data-required="1" placeholder="" value="<!-- php: =$viewRole->name --> " class="form-control input-height" /> </div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-4">Description
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-8">
																			<input type="text" name="description"  id="description" data-required="1" placeholder="" value="<!-- php: =$viewRole->description --> " class="form-control input-height" /> </div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-4">Status
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-8">
																			<!-- php: $ROLE_STATUSES = [ 1 => 'ENABLED', 2 => 'DISABLED', ]; -->
																			<SearchableSelectField class="form-control input-height" name="status_id" id="status_id">
																				<!--<option value="">Select...</option>-->
																				<!-- php: foreach($ROLE_STATUSES as $key => $value) { -->
																				<option value="<!-- php: = $key -->" <!-- php: = $viewRole->status_id == $key ? "selected" : "" -->><!-- php: = $value --></option>
																				<!-- php: } -->
																			</SearchableSelectField>
																		</div>
																	</div>
																	<div class="form-actions">
																	<div class="row">
																		<div class="offset-md-4 col-md-8">
																			<button type="submit" class="btn btn-info">Submit</button>
																			<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Cancel</button>
																		</div>
																	</div>
																	</div>
																</div>
															<!-- php: =$this->Form->end(); -->
														</div>
													</div>
												</div>
											</div>
										  </div>
										</div>
									  </div>
									</div>

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
`;

export default function ElementElementManagesecurityRoles() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
