import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Roles/view_roles.php';
const rawHtml = `

<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="tabbable-line">
			<div class="tab-content">
				<div class="tab-pane active fontawesome-demo" id="tab1">
					<div class="row">
						<div class="col-md-12">
							<div class="card  card-box">
								<div class="card-head">
									<header></header>
									<div class="tools">
										<a class="btn btn-primary" style="margin-top: 5px" href="<!-- php: = $this->Url->build(['controller' => 'Roles', 'action' => 'addRole']) -->">Add Role</a>
									</div>
								</div>
								<div class="card-body ">
								  <div class="table-scrollable">
									<table class="table table-hover table-checkable order-column full-width" id="example4">
										<thead>
											<tr>
												<th class="center"> No. </th>
												<th class="center"> Name </th>
												<th class="center"> Description </th>
												<th class="center"> Status </th>
												<th class="center"> Permissions </th>
												<th class="center"> Action </th>
												
											</tr>
										</thead>
										<tbody>
										<!-- php: $x = 1 ; foreach ($viewRoles as $viewRole): $ROLE_STATUSES = [ 1 => 'ENABLED', 2 => 'DISABLED', ]; -->
										
											<tr class="odd gradeX">
												<td class="center"><!-- php: = $x --></td>
												<td class="center"><!-- php: =$viewRole->name --></td>
												<td class="center"><!-- php: =$viewRole->description --></td>			
												<td class="center"><!-- php: =$ROLE_STATUSES[$viewRole->status_id] --></td>	
												<td class="center"><!-- php: =$this->Html->link(__('Permissions'), ['action' => 'setPermissions', $viewRole->id]); --></td>	
												<td class="center">
													<a href="<!-- php: =$this->Url->build(['controller'=>'Roles','action'=>'editRole',$viewRole->id]) -->" class="btn btn-primary btn-xs">
														Edit
													</a>
													<a href="<!-- php: =$this->Url->build(['controller'=>'Roles','action'=>'viewRoleDetails',$viewRole->id]) -->" class="btn btn-primary btn-xs">
														View
													</a>
													<!--<a class="btn btn-tbl-delete btn-xs">
														<i class="fa fa-trash-o "></i>
													</a>-->
												</td>
											</tr>
										<!-- php: $x++; endforeach; -->									
										</tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane" id="tab2">
					<div class="row">
					<!-- php: $i = 1; $j = sizeof($viewRoles->toArray()); foreach ($viewRoles as $viewRole) { -->
						<div class="col-md-4">
							<div class="card card-box">
								<div class="card-body no-padding ">
									<div class="doctor-profile">
											<!--<img src="../assets/img/user/user10.jpg" class="doctor-pic" alt="">-->
											<!-- php: if(($viewRole->id) == 1){ echo $this->Html->image('../assets/img/doc-100.jpg',['class' =>'doctor-pic']); } else if(($viewRole->id) == 2) { echo $this->Html->image('../assets/img/nurse-100.jpg',['class' =>'doctor-pic']); } else if(($viewRole... -->
										<div class="profile-usertitle">
											<div class="doctor-name"><!-- php: = $viewRole->name --> </div>
										</div>
											<p><!-- php: =$viewRole->description --> <br /></p> 
											<div><p><a href="#"><!-- php: =$ROLE_STATUSES[$viewRole->status_id] --></a></p> </div>
										<!--<div class="profile-userbuttons">
											<a href="patient_profile.html" class="btn btn-circle deepPink-bgcolor btn-sm"></a>
										</div>-->
									</div>
								</div>
							</div>
						</div>
					<!-- php: if($i < $j){ if(($i % 3) == 0){ echo '</div><div class="row">'; } } $i++; } -->
					</div>	
				</div>
			</div>
		</div>
	</div>
</div>


`;

export default function RolesViewRolesPage() {
  return (
    <PageShell title="Roles/view_roles.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
