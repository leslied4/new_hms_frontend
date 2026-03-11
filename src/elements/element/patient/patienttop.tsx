const rawHtml = `

<div class="card card-topline-<!-- php: = $theme1 -->">
	<div class="card-body no-padding">
		<div class="row">
			<div class="profile-userpic col-md-2 right-border">
				<!-- php: echo $this->Html->image($patientImage,['class' =>'img-responsive', 'style' => 'width: 100px']); -->

				<div class="profile-usertitle">
					<div class="profile-usertitle-name" style="font-size: 16px"><!-- php: = $patient->first_name.' '. $patient->last_name --></div>
				</div>
			</div>
			<div class="col-md-3 right-border">
				<ul class="list-group list-group-unbordered">
					<li class="list-group-item">
						<b>Folder Number</b> <a class="pull-right"><!-- php: = $patient->folder --> </a>
					</li>
					<li class="list-group-item">
						<div class="row">
							<div class="col-md-6" style="border-right: 2px solid #ccc"><b>Sex</b> <a class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" --> </a></div>
							<div class="col-md-6"><b>Age</b> <a class="pull-right"><!-- php: =isset($patient->date_of_birth) ? (date('Y') - $patient->date_of_birth->year) - ($patient->date_of_birth->month >= date("m") && $patient->date_of_birth->day > date("d") ? 1 : 0) : "N/A" --> years </a></div>
						</div>
					</li>
					<li class="list-group-item" style="border-bottom: 0px; padding-top: 22px; padding-bottom: 0px;">
						<a type="button" style="margin-bottom: 10px" href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'editPatient', $patient->id]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.Edit') --> pull-right"><i class="fa fa-pencil" ></i> Edit</a>
						<a type="button" href="<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPatient', $patient->id]) -->" class="btn btn-circle <!-- php: = Cake\Core\Configure::read('Classes.View') --> pull-right" style="margin-right: 5px; margin-bottom: 10px"><i class="fa fa-eye"></i> View</a>
						
					</li>
				</ul>
			</div>
			<div class="col-md-3 right-border">
				<ul class="list-group list-group-unbordered">
					<li class="list-group-item">
						<!-- php: $LAB3_STATUSES = [ 4 => 'POSITIVE', 5 => 'NEGATIVE', 11 =>'NOT DONE', ]; -->
						<b>Sickling Status</b> <a class="pull-right"><!-- php: = isset($LAB3_STATUSES[$patient->sickling_status]) ? $LAB3_STATUSES[$patient->sickling_status] : 'N/A' --> </a>
					</li>
					<li class="list-group-item">
						<b>Blood Group</b> <a class="pull-right"><!-- php: =isset($patient->blood_group)? $patient->blood_group->name : "" --> </a>
					</li>
				</ul>
			</div>

			<div class="profile-usertitle col-md-4">

				<!-- php: = $this->Form->create(null, ['url'=>['controller'=>'Patients','action' =>'previousVisit', $patient->id]]); -->
					<div class="form-group row">
						<label class="col-md-4 control-label">All Visits</label>
						<div class="input-group date col-md-8">
							<SearchableSelectField class="form-control" name="visit_id" type="text" required>
								<option value="">--Pick a Visit--</option>
								<!-- php: foreach($patientVisits as $visit){ echo "<option value='" . $visit->id . "' " . ($visit->id == $selectedVisit->id ? "selected": "") . ">" . $visit->date_visited->nice() . "</option>"; } -->
							</SearchableSelectField>
							<span class="input-group-btn">
								<button type="submit" class="btn btn-info btn-flat">Go!</button>
							</span>
						</div>
						<br>
					</div>		
				<!-- php: = $this->Form->end() -->

			</div>
		</div>
	</div>
</div>
`;

export default function ElementElementPatientPatienttop() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
