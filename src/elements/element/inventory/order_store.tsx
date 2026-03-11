const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Order Store</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#order_store_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#order_store_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="order_store_add">
					<h4>Add a new Order Store</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Inventory', 'action' => 'addOrderStore']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>

                        <div class="form-group row">
							<label class="control-label col-md-4">Parent Store
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="stock_basket_id" id="stock_basket_id">
									<option value="">Select Parent Store</option>
									<!-- php: foreach($stockBaskets as $option) { --> 
										<option value="<!-- php: = $option->id -->"><!-- php: = $option->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>	

                        <div class="form-group row">
							<label class="control-label col-md-4">Clinics / Specialties
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height selectpicker" name="specialties_id" id="specialties_id">
									<option value="">Select Clinics / Specialties</option>
									<!-- php: foreach($specialties as $option) { --> 
										<option value="<!-- php: = $option->id -->"><!-- php: = $option->name --></option>
									<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>	
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'resetForm()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->	
				</div>
				<div class="tab-pane active" id="order_store_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Store Name</th>
										<th class="left">Parent Store</th>
                                        <th class="left">Clinic / Specialty</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($orderStores as $orderStore): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $orderStore->name --></td>
										<td class="left"><!-- php: = $orderStore->stock_basket->name --></td>
                                        <td class="left"><!-- php: = $orderStore->specialty->name --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editOrderStore_<!-- php: = $orderStore->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>	
										</td>
									</tr>
									   
									<div class="modal fade" id="editOrderStore_<!-- php: = $orderStore->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Edit Order Store: <!-- php: = $orderStore->name --></h4>
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
															<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Inventory', 'action' => 'editOrderStore', $orderStore->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="name" data-required="1" value="<!-- php: = $orderStore->name -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">Parent Store
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="stock_basket_id" id="stock_basket_id">
																				<option value="">Select Parent Store</option>
																				<!-- php: foreach($stockBaskets as $option) { --> 
																					<option <!-- php: = $option->id == $orderStore->stock_basket_id ? 'selected' : '' --> value="<!-- php: = $option->id -->"><!-- php: = $option->name --></option>
																				<!-- php: } -->
																			</SearchableSelectField>
																		</div>
																	</div>	

																	<div class="form-group row">
																		<label class="control-label col-md-5">Clinics / Specialties
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control input-height" name="specialties_id" id="specialties_id">
																				<option value="">Select Clinics / Specialties</option>
																				<!-- php: foreach($specialties as $option) { --> 
																					<option <!-- php: = $option->id == $orderStore->specialties_id ? 'selected' : '' --> value="<!-- php: = $option->id -->"><!-- php: = $option->name --></option>
																				<!-- php: } -->
																			</SearchableSelectField>
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


<script>
	function resetForm(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementInventoryOrderStore() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
