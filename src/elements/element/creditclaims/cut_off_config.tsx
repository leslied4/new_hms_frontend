const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Claim Cut Off Configuration</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#config_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#config_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="config_add">
					<h4>Add Configuration</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'CreditClaims', 'action' => 'cutOffConfigAdd']]); -->
					
                        <div class="form-group row">
							<label class="control-label col-md-4">Sponsor Type
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="provider_type_id" id="provider_type_id" required>
									<option value="">Select Sponsor Type</option>
									<!-- php: foreach($providerTypes as $type) { --> 
										<option value="<!-- php: = $type->id -->"><!-- php: = $type->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Number of Days
                                <span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" name="cut_off_days" id="cut_off_days" placeholder="Enter cut off days" class="form-control input-height" required/> 
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearAddRoomFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
				</div>
				<div class="tab-pane active" id="config_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Sponsor Type</th>
										<th class="left">Cut Off Days</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($cutOffConfigs as $value): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->provider_type->name --></td>
										<td class="left"><!-- php: = $value->cut_off_days --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editConfig_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'CreditClaims','action'=>'cutOffConfigDelete',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.D... -->
										</td>
									</tr>
									<div class="modal fade" id="editConfig_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title">Edit Treatment room: <!-- php: = $value->name --></h4>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											  <span aria-hidden="true">&times;</span>
											</button>
										  </div>
										  <div class="modal-body">
											
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<div class="card card-box">
														<div class="card-head">
															<header>Edit Details</header>
														</div>
														<div class="card-body" id="bar-parent">
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageServices', 'action' => 'editTreatmentRoom', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>
																	<div class="form-group row">
																		<label class="control-label col-md-5">Price
																		</label>
																		<div class="col-md-7">
																			<input type="number" name="price" value="<!-- php: = $value->price -->" placeholder="Enter price" class="form-control input-height" required/> 
																		</div>
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
															<!-- php: = $this->Form->end() -->
														</div>
													</div>
												</div>
											</div>
										  </div>
										</div>
									  </div>
									</div>
									
									
								<!-- php: $x++; endforeach; -->									
								</tbody>
							</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>

`;

export default function ElementElementCreditclaimsCutOffConfig() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
