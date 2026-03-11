const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Room Types</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#roomTypes_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#roomTypes_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="roomTypes_add">
					<h4>Add a new Room Type</h4>
					<!-- php: = $this->Form->create($wardType, ['url' => ['controller' => 'ManageWards', 'action' => 'addRoomType']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Ward Category
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control input-height" name="ward_type_id" id="ward_type_id" required>
									<option value="">Select...</option>
									
									<!-- php: foreach($wardTypes as $selectOption) { -->
										<option value="<!-- php: = $selectOption->id -->"><!-- php: = $selectOption->name --></option>
									<!-- php: } -->
									
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Description
								
							</label>
							<div class="col-md-5">
								<input type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" /> 
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearRoomTypeFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="roomTypes_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover table-checkable order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">No</th>
										<th class="left">Ward Category</th>
										<th class="left">Name</th>
										<th class="left">Code</th>
										<th class="left">Description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($roomTypes as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$x --></td>
										<td class="left"><!-- php: =$value->has('ward_type') ? $value->ward_type->name: "" --></td>
										<td class="left"><!-- php: =$value->name --></td>
										<td class="left">
											<!-- php: if($value->ward_type->code){ $length = strlen((string)$value->id); if($length == 1){ $id = str_pad($value->id, 3, '0', STR_PAD_LEFT); }else if($length == 2){ $id = str_pad($value->id, 2, '0', STR_PAD_LEFT); }else{ $id = $value->id; } } -->
											<!-- php: =$value->has('ward_type') ? $value->ward_type->code."-".$id : "" -->
										</td>
										<td class="left"><!-- php: =$value->description --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editRoomTypeDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- <!-- php: // $this->Form->postLink(__('Delete'), ['controller'=>'ManageWards','action'=>'deleteRoomType',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.Delet... --> -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editRoomTypeDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editRoomTypeDialogueTitle">Edit Room Type: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'ManageWards', 'action' => 'editRoomType', $value->id], 'class' => 'form-horizontal']) -->
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
																		<label class="control-label col-md-5">Description
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="description" data-required="0" value="<!-- php: = $value->description -->" placeholder="Enter description" class="form-control input-height" /> 
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
	function clearRoomTypeFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementManagewardsRoomtypes() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
