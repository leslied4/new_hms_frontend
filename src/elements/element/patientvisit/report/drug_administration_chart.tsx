const rawHtml = `
<div>
	<div class="row">
		<div class="col-md-12">
			<center><!-- php: = $this->Html->image("../assets/img/hos_logo.png", ['class' => "login-img", 'style' => 'width: auto; height: 40px', 'fullBase' => true]) --></center>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="pull-left" style="float: left">
				<address>
					<p class="text-muted m-l-5">
						<!-- php: = $this->Text->autoParagraph($inst_name->address) -->
					</p>
				</address>
			</div>
			<div class="pull-right text-right">
				<address>
					<p class="text-muted m-l-30">
						Phones: <!-- php: = $inst_name->phone1 --> , <!-- php: = $inst_name->phone2 --> <br> Email: <!-- php: = $inst_name->email1 --> <br> Alternate Email: <!-- php: = $inst_name->email2 --> 
					</p>
				</address>
			</div>
		</div>
	</div>
	<div style="clear: both"></div>
	<hr style="height: 5px; margin-top: 2px; margin-down: 2px">
	<div class="row">
		<div class="col-md-12">
			<div style="float: left; width 140px; padding: 5px 10px 10px 0; margin-right: 10px">
				<!-- php: $pic = $patient->has('image') && $patient->image->file_path != null ? $patient->image->file_path : (($patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'); echo $this->Html->image($pic,['style' =>'width: 120px; height: auto', 'fullBase' => tru... -->
			</div>

			<table>
				<tbody>
					<tr>
						<th style="width: 200px">Name</th> 
						<td><!-- php: = $patient->first_name.' '. $patient->last_name --> </td>
					</tr>
					<tr>
						<th>Age, Sex</th>
						<td><!-- php: = isset($patient->date_of_birth) ? $patient->age . ' Years' : 'N/A' --> , <!-- php: = $patient->gender->name --></td>
					</tr>
					<tr>
						<th>Folder Number</th>
						<td><!-- php: = $patient->folder --> </td>
					</tr>
					<tr>
						<th>Address</th>
						<td><!-- php: = $patient->home_address --></td>
					</tr>
					<tr>
						<th>Contact Number</th>
						<td><!-- php: = $patient->phone --> </td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div style="max-width: 500px; margin-top: 30px">
		<hr style="background: #ef6575; height: 2px; margin: 0px !important;">
		<div class="row" style="margin-top: 0px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h4 style="line-height: 18px; padding: 0; margin: 0">DRUG HISTORY AND ALLERGY</h4>
			</div>
		</div>

		<!-- php: $value = $selectedVisit->patient->has('patient_history_drugs') && sizeof($selectedVisit->patient->patient_history_drugs) > 0 ? $selectedVisit->patient->patient_history_drugs[0] : null; -->

		<hr style="background: #ef6575; height: 2px; margin: 0px !important;">
		<ul class="list-group list-group-unbordered" style="padding-left: 7px">
			<li class="list-group-item">
				<b>ALLERGY</b>
				<div class="profile-desc-item pull-right" style="width: 200px"><!-- php: = $value != null ? $value->allergies : 'N/A' --></div>
			</li>
			<li class="list-group-item">
				<b>CURRENT MEDICATION</b>
				<div class="profile-desc-item pull-right" style="width: 200px"><!-- php: = $value != null ? $value->current_medication : 'N/A' --></div>
			</li>
			<li class="list-group-item">
				<b>PAST MEDICATION</b>
				<div class="profile-desc-item pull-right" style="width: 200px"><!-- php: = $value != null ? $value->past_medication : 'N/A' --></div>
			</li>
			<li class="list-group-item">
				<b>HERBAL MEDICATION</b>
				<div class="profile-desc-item pull-right" style="width: 200px"><!-- php: = $value != null ? $value->herbal_medication : 'N/A' --></div>
			</li>
			<li class="list-group-item">
				<b>VACCINATION</b>
				<div class="profile-desc-item pull-right" style="width: 200px"><!-- php: = $value != null ? $value->vaccination : 'N/A' --></div>
			</li>
		</ul>
	</div>

	<br/>
	<div class="row" style="margin-top: 0px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12">
			<h4 style="line-height: 18px; padding: 0; margin: 0">PRE-MEDICATION/ONCE ONLY/FREQUENT MEDICATION AND NURSE INITIATED MEDICINES</h4>
		</div>
	</div>

	<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

	<div class="row">
		<div class="col-md-12">

			<table class="table" >
				<thead>
					<tr>
						<th class="left">Date Prescribed</th>
						<th class="left">Drug / Form / Dosage</th>
						<th class="left">Type of Dose</th>
						<th class="left">Dosage Frequency</th>
						<th class="left">Route</th>
						<th class="left">Time Given</th>
						<th class="left">Prescribed By</th>
						<th class="left">Given By</th>
						<th class="left">Comments/Side effects</th>
					</tr>
				</thead>
				<tbody>
				<!-- php: foreach ($selectedVisit->patient_administered_drugs as $administerMedication): -->
					<!-- php: if($administerMedication->drug_administered != 1) { continue; } -->
					<tr class="odd gradeX">
						<td class="left"><!-- php: = $administerMedication->request_medication->date_created != null ? $administerMedication->request_medication->date_created->i18nFormat('Y-MM-dd HH:mm') : '' --></td>
						<td class="left"><!-- php: = $administerMedication->request_medication->has('drug_stock') ? $administerMedication->request_medication->drug_stock->drug->full_name : '' --></td>
						<td class="left"><!-- php: = $administerMedication->request_medication->has('medication_type') ? $administerMedication->request_medication->medication_type->type_name : '' --></td>
						<td class="left"><!-- php: = $administerMedication->request_medication->frequency --></td>
						<td class="left"><!-- php: = $administerMedication->request_medication->has('dosage_form') ? $administerMedication->request_medication->dosage_form->name : '' --></td>
						<td class="left"><!-- php: = $administerMedication->date_created->i18nFormat('Y-MM-dd HH:mm') --></td>
						<td class="left"><!-- php: = $administerMedication->request_medication->has('user') ? $administerMedication->request_medication->user->full_name : '' --></td>
						<td class="left"><!-- php: = $administerMedication->has('user') ? $administerMedication->user->full_name : '' --></td>
						<td class="left"><!-- php: = $administerMedication->drug_administered == 1 ? $administerMedication->notes : $administerMedication->reasons --></td>
					</tr>
				<!-- php: endforeach; -->									
				</tbody>
			</table>
		</div>
	</div>
	<!-- End Medications Report -->

</div>
`;

export default function ElementElementPatientvisitReportDrugAdministrationChart() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
