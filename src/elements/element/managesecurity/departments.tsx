const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Departments</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#departments_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#departments_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="departments_add">
					<h4>Add a new Department</h4>
					<!-- php: = $this->Form->create($addDepartment, ['url' => ['controller' => 'Departments', 'action' => 'addDepartment'], 'id'=>'department']); -->
						<div class="form-body">
							<div class="form-group row">
								<label class="control-label col-md-3">Name
									<span class="required"> * </span>
								</label>
								<div class="col-md-5">
									<input type="text" name="name" id="deptname" data-required="1" placeholder="" class="form-control input-height" required /> 
									
								</div>
							</div>
							<div class="form-group row">
								<label class="control-label col-md-3">Description

								</label>
								<div class="col-md-5">
									<input type="text" name="description" id="description" data-required="1" placeholder="" class="form-control input-height" /> </div>
							</div>

							<div class="form-actions">
							<div class="row">
								<div class="offset-md-3 col-md-9">
									<button type="submit" id="submit" class="btn btn-info">Submit</button>
									<button type="button" onclick = 'clearFields()' class="btn btn-success">Reset</button>
									<a href="<!-- php: =$this->Url->build(['controller'=>'Departments','action'=>'viewDepartments']) -->"><button type="button" class="btn btn-default">Cancel</button></a>
								</div>
							</div>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="departments_view">
					<div class="card  card-box">
						<div class="card-body ">
							<div class="table-scrollable">
								<table class="table table-hover order-column full-width customDataTable">
									<thead>
										<tr>
											<th>Date Added</th>
											<th> Name </th>
											<th> Action </th>
										</tr>
									</thead>
									<tbody>

									<!-- php: foreach ($departments as $department): -->
										<tr class="odd gradeX">
											<td><!-- php: =$department->date_created --></td>
											<td><!-- php: =$department->name --> <span class="badge badge-danger"><!-- php: = $department->code --></span></td>
											<td>
												<a href="<!-- php: =$this->Url->build(['controller'=>'Departments','action'=>'editDepartment', $department->id]) -->" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs patient_edit_patient_details">
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
</div>

<!-- end page content -->
<script>
	$(function () {
		$("#department").submit(function () {
			return confirm('Are you sure you want to submit ?');
			// return true;
		});
	});
</script>

`;

export default function ElementElementManagesecurityDepartments() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
