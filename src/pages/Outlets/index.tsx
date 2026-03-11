import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/Outlets/index.php';
const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Outlets</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#categories_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#categories_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="categories_add">
					<h4>Add new Outlet</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Outlets', 'action' => 'add']]); -->
						<div class="form-group row">
							<label class="control-label col-md-4">Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="name" id="name" data-required="1" placeholder="Name of outlet" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">GP GPRS (eg:GA1826363)
							</label>
							<div class="col-md-5">
								<input type="text" name="location" id="location" data-required="1" placeholder="Please enter Ghana post GPS address" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Institution
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="institution_id" id="institution_id" data-live-search="true" required>
									<option value="">Select</option>
									<!-- php: foreach($institutions as $value){ -->
										<option value="<!-- php: =$value->id -->"><!-- php: =$value->name --></option>
									<!-- php: } -->			
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Status
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="status_id" id="status_id" data-live-search="true" required>
									<option value="">Select</option>
									<option value="1">Active</option>
									<option value="2">In-Active</option>
								</SearchableSelectField>
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Admin Name
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="admin_name" id="admin_name" data-required="1" placeholder="Name of outlet admin" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-4">Admin Phone
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="admin_phone" id="admin_phone" data-required="1" placeholder="Phone of outlet admin" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Admin Username
							</label>
							<div class="col-md-5">
								<input type="text" name="username" id="username" data-required="1" placeholder="Username of outlet admin" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Admin Password
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="password" name="admin_password" id="admin_password" data-required="1" placeholder="Password of outlet admin" class="form-control input-height" required /> 
							</div>
						</div>

						<div class="form-group row">
							<label class="control-label col-md-4">Gender
							</label>
							<div class="col-md-5">
								<SearchableSelectField class="form-control selectpicker" name="gender_id" id="gender_id" data-live-search="true" required>
									<option value="">Select</option>
									<option value="1">Male</option>
									<option value="2">Female</option>
								</SearchableSelectField>
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-4 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
								<button type="button" class="btn btn-default" onclick = 'clearCategoryFields()'>Reset</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="categories_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table class="table table-hover order-column full-width customDataTable">
								<thead>
									<tr>
										<th class="left">Facility</th>
										<th class="left">Outlet</th>
										<th class="left">Location</th>
										<th class="left">Status</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
								<!-- php: foreach ($outlets as $value): -->
								
									<tr class="odd gradeX">
                                        <td class="left"><!-- php: = $value->institution->name --></td>
										<td class="left"><!-- php: = $value->name --></td>
										<td class="left"><!-- php: = $value->location --></td>
										<td class="left"><!-- php: = $value->status->name --></td>
										<td class="left">
											<a data-toggle="modal" data-target="#editCategoryDialogue_<!-- php: = $value->id -->" href="javascript:" class="btn <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> btn-xs">
												Edit
											</a>
										</td>
									</tr>
									   
									<div class="modal fade" id="editCategoryDialogue_<!-- php: = $value->id -->" tabindex="-1" role="dialog" aria-labelledby="select" aria-hidden="true">
									  <div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
										  <div class="modal-header">
											<h4 class="modal-title" id="editProviderDialogueTitle">Edit Outlet: <!-- php: = $value->name --></h4>
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
															<!-- php: = $this->Form->create($value, ['url' => ['controller' => 'Outlets', 'action' => 'edit', $value->id], 'class' => 'form-horizontal']) -->
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
																		<label class="control-label col-md-5">Location
																			<span class="required"> * </span>
																		</label>
																		<div class="col-md-7">
																			<input type="text" name="location" data-required="1" value="<!-- php: = $value->location -->" placeholder="Enter name" class="form-control input-height" required /> 
																		</div>
																	</div>

																	<div class="form-group row">
																		<label class="control-label col-md-5">Status
																		</label>
																		<div class="col-md-7">
																			<SearchableSelectField class="form-control selectpicker" name="status_id" id="status_id" data-live-search="true" required>
																				<option value="">Select</option>
																				<option <!-- php: = $value->status_id == 1 ? 'selected' : '' --> value="<!-- php: = $value->status_id -->">Enabled</option>
																				<option <!-- php: = $value->status_id == 2 ? 'selected' : '' --> value="<!-- php: = $value->status_id -->">Disabled</option>
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
	function clearCategoryFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function OutletsIndexPage() {
  return (
    <PageShell title="Outlets/index.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
