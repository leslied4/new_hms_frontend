const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
			<span class="font-dark">
				Drug Classes
			</span>				 
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#drugclasses_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#drugclasses_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="drugclasses_add">
					<h4>Add a new drug class</h4>
					<!-- php: = $this->Form->create($drugClass, ['url' => ['controller' => 'Inventory', 'action' => 'addDrugClass']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Class Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="class_name" id="class_name" data-required="1" placeholder="Enter class name" class="form-control input-height" required /> 
							</div>
						</div>												
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearDrugClassFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="drugclasses_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Class Name</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($drugClasses as $value): -->
								
									<tr class="odd gradeX">
										<td class="left"><!-- php: =$value->class_name --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editDrugClassDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
											
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'Inventory','action'=>'deleteDrugClass',$value->id], ['confirm' => __('Are you sure you want to delete {0}?', $value->class_name), 'class' => 'btn ' . Cake\Core\Configure::read('Classes.D... -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editDrugClassDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editDrugClassTitle">Edit Drug Class: <!-- php: = $value->class_name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Inventory', 'action' => 'editDrugClass', $value->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">Class Name
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="class_name" data-required="1" value="<!-- php: = $value->class_name -->" placeholder="Enter class name" class="form-control input-height" required /> 
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
	function clearDrugClassFields(){
		$('#class_name').val('');
	}
</script>

`;

export default function ElementElementInventoryDrugclasses() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
