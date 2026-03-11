const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Treatment or Opretation Rooms</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#treatmentroom_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#servicestocks_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="treatmentroom_add">
					<h4>Add a new treatment or operation room</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ManageServices', 'action' => 'addtreatmentroom']]); -->
					
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name"  placeholder="Enter name" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Price
                                <span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="number" name="price" id="price" placeholder="Enter price" class="form-control input-height" required/> 
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
				<div class="tab-pane active" id="servicestocks_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Name</th>
										<th class="left">Price</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($treatmentRooms as $value): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $value->name --></td>
										<td class="left"><!-- php: = $value->price --></td>
										<td class="left">
											<a data-toggle="modal" data-backdrop="static" data-target="#editTreatmentRoomDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ManageServices','action'=>'deleteTreatmentRoom',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->name), 'class' => 'btn ' . Cake\Core\Configure::read('Classe... -->
										
										</td>
									</tr>
									   
									<div class="modal fade" id="editTreatmentRoomDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
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


<script>
	function clearAddRoomFields(){
        $("#name").val(" ");
        $("#price").val(" ");	
	}
</script>

`;

export default function ElementElementManageservicesTreatmentrooms() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
