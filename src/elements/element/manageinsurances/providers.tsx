const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Providers</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#providers_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#providers_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="providers_add">
					<h4>Add a new Provider</h4>
					<!-- php: = $this->Form->create($provider, ['url' => ['controller' => 'ManageInsurances', 'action' => 'addProvider']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Provider Type
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="provider_type_id" id="provider_type_id" required>
									<option value="">Select...</option>
									
									<!-- php: foreach($providerTypes as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } -->
									
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<textarea name="description" id="description" data-required="0" placeholder="Enter description" class="form-control text-area"></textarea> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Phone
								
							</label>
							<div class="col-md-5">
								<input type="text" name="phone" id="phone" data-required="0" placeholder="Enter phone number" class="form-control input-height" /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Email
								
							</label>
							<div class="col-md-5">
								<input type="text" name="email" id="email" data-required="0" placeholder="Enter email" class="form-control input-height" /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Address
								
							</label>
							<div class="col-md-5">
								<textarea name="address" id="address" data-required="0" placeholder="Enter address" class="form-control text-area"></textarea> 
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearProviderFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="providers_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Type</th>
										<th class="left">Phone</th>
										<th class="left">Email</th>
										<th class="left">Address</th>
										<th class="left">Description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($providers as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->name --></td>
										<td class="left"><!-- php: = $value->has('provider_type') ? $value->provider_type->name : '' --></td>
										<td class="left"><!-- php: = $value->phone --></td>
										<td class="left"><!-- php: = $value->email --></td>
										<td class="left"><!-- php: = $value->address --></td>
										<td class="left"><!-- php: = $value->description --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editProviderDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageInsurances','action'=>'deleteProvider',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.D... -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editProviderDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editProviderDialogueTitle">Edit Provider: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageInsurances', 'action' => 'editProvider', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $value->name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Provider Type
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="provider_type_id" id="provider_type_id" required>
																				<option value="">Select...</option>

																				<!-- php: foreach($providerTypes as $selectOption) { -->
																					<option <!-- php: = $value->provider_type_id == $selectOption->id ? 'selected' : '' --> value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
																				<!-- php: } -->

																			</SearchableSelectField>
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Description
																			
																		</label>
																		<div class="col-md-7">
																			<textarea name="description" data-required="0" placeholder="Enter description" class="form-control text-area"><!-- php: = $value->description --></textarea> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Phone
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="phone" data-required="0" value="<!-- php: = $value->phone -->" placeholder="Enter phone number" class="form-control input-height" /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Email
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="email" data-required="0" value="<!-- php: = $value->email -->" placeholder="Enter email" class="form-control input-height" /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Address
																		</label>
																		<div class="col-md-7">
																			<textarea name="address" data-required="0" placeholder="Enter address" class="form-control text-area"><!-- php: = $value->address --></textarea> 
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
</div>


<script>
	function clearProviderFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementManageinsurancesProviders() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
