const rawHtml = `
<!-- start page content -->
<div class="row">
	<div class="col-md-12 col-sm-12">
	
		<div class="profile-sidebar">
			<div class="card card-topline-<!-- php: = $theme1 -->">
				<div class="card-body no-padding height-9">
					<div class="row">
						<div class="profile-userpic">
							<!-- php: echo $this->Html->image(isset($patient->image) ? $patient->image->file_path : (($patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'),['class' =>'img-responsive']); -->
						</div>
					</div>
					<div class="profile-usertitle">
						<div class="profile-usertitle-name"><!-- php: = $patient->first_name.' '. $patient->last_name --></div>
					</div>
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Visit Date</b> <a class="pull-right"><!-- php: = $visit_date->nice() --> </a>
						</li>
						<li class="list-group-item">
							<b>Folder Number</b> <a class="pull-right"><!-- php: = $patient->folder --> </a>
						</li>
						<li class="list-group-item">
							<b>Sex</b> <a class="pull-right"><!-- php: = isset($patient->gender) ? $patient->gender->name : "N/A" --> </a>
						</li>
						<li class="list-group-item">
							<b>Age</b> <a class="pull-right"><!-- php: = isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A"; --> Years </a>
						</li>
						<li class="list-group-item">
							<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
							<b>Sickling Status</b> <a class="pull-right"><!-- php: = isset($LAB3_STATUSES[$patient->sickling_status]) ? $LAB3_STATUSES[$patient->sickling_status] : 'N/A' --> </a>
						</li>
						<li class="list-group-item">
							<b>Blood Group</b> <a class="pull-right"><!-- php: =isset($patient->blood_group)? $patient->blood_group->name : "N/A" --> </a>
						</li>
						<li class="list-group-item">
							<a type="button" href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPatient', $patient->id]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.View') --> " title="View Patient"><i class="fa fa-pencil"></i> View Patient</a>
							<a type="button" href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewVisit', $patient->id, $visit_id]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.Visit') --> pull-right" title="View Visit"><i class="fa fa-plus"></i> Visit</a>
						</li>
					</ul>
					
					<!-- END SIDEBAR USER TITLE -->
					
				</div>
			</div>
		</div>
			
		<div class="profile-content card card-topline-<!-- php: = $theme1 -->">
			<!-- php: = $this->fetch('content') -->
		</div>
	</div>
</div>

<!-- end page content -->


`;

export default function LayoutLayoutVisitEditRecord() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
