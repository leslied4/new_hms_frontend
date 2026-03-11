const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">AEFI Symptoms</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#aefi_symptoms_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#aefi_symptoms_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="aefi_symptoms_add">
					<h4>Add a new AEFI symptoms</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'addAefiSymptom']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Symptom
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="symptom" id="symptom" data-required="1" placeholder="Enter type sympton" class="form-control input-height" required /> 
							</div>
						</div>
																	
						<div class="form-group row">
							<label class="control-label col-md-4"> Symptom Description
								
							</label>
							<div class="col-md-5">
								<input type="text" name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height" /> 
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
				<div class="tab-pane active" id="aefi_symptoms_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">AEFI Symptom</th>
										<th class="left">AEFI Symptom Description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: $x = 1; foreach ($aefi_symptoms as $aefi_symptom): -->								
									<tr class="odd gradeX">
										<td class="left"><!-- php: = $aefi_symptom->symptom --></td>
										<td class="left"><!-- php: = $aefi_symptom->description --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editAefiSymptom_<!-- php: = $aefi_symptom->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>	
											<!-- php: = $this->Form->postLink(__('Delete'), ['controller'=>'ImmunizationRequest','action'=>'deleteAefiSymptom',$aefi_symptom->id], ['confirm' => __('Are you sure you want to delete {0}?', $aefi_symptom->id), 'class' => 'btn ' . Cake\Core\Configur... -->
										</td>
									</tr>
									   
									<div class="modal fade" id="editAefiSymptom_<!-- php: = $aefi_symptom->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editInvestigationDialogueTitle">Edit AEFI Symptom: <!-- php: = $aefi_symptom->id --></h4>
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
															<!-- php: = $this->Form->create($aefi_symptom, ['url' => ['controller' => 'ImmunizationRequest', 'action' => 'editAefiSymptom', $aefi_symptom->id], 'class' => 'form-horizontal']) -->
																<div class="form-body">
																	<div class="form-group row">
																		<label class="control-label col-md-5">AEFI Symptom
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="symptom" data-required="1" value="<!-- php: = $aefi_symptom->symptom -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>
																	
																	<div class="form-group row">
																		<label class="control-label col-md-5">AEFI Symptom Description
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="escription" data-required="0" value="<!-- php: = $aefi_symptom->description -->" placeholder="Enter description" class="form-control input-height" /> 
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

export default function ElementElementManageVaccinesAefiSymptoms() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
