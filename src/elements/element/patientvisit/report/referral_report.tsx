const rawHtml = `
<!-- php: $referral = sizeof($selectedVisit->patient_visit_referrals) > 0 ? $selectedVisit->patient_visit_referrals[0] : null; -->

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
						<!-- php: = $referral != null ? $referral->health_facility->name : '' -->
						<!-- php: = $referral != null ? $this->Text->autoParagraph($referral->health_facility->address) : '' -->
					</p>
				</address>
			</div>
			<div class="pull-right text-right">
				<address>
					<p class="text-muted m-l-30">
						<!-- php: = $inst_name->institution --><br/>
						<!-- php: = $this->Text->autoParagraph($inst_name->address) -->
					</p>
				</address>
			</div>
		</div>
	</div>
	
	<div style="clear: both"></div>
	
	<div class="row">
		<div class="col-md-12">
			<h4 align="left">Dear Manager</h4>
		</div>
		
		<div class="col-md-12">
			<h4 align="center" style="border-bottom: 1px solid #8a8a8a;">PATIENT REFERRAL TO YOUR FACILITY</h4>
		</div>
	</div>
	
	<div style="clear: both"></div>
	
	<div class="row">
		<div class="col-md-12">
			<!-- php: = $referral != null ? $this->Text->autoParagraph($referral->content) : '' -->
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

	<div class="row" style="margin-top: 20px; padding-bottom: 5px">
		<div class="col-md-12">
			<h3 style="padding: 5px; background: #ef6575; line-height: 25px">Summary</h3>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
			<table>
				<tbody>
					<tr>
						<th style="width: 200px">Type of Visit</th> 
						<td><!-- php: = $selectedVisit->has('patient_visit_purpose') ? $selectedVisit->patient_visit_purpose->name : 'N/A' --> </td>
					</tr>
					<tr>
						<th>Date and Time</th>
						<td><!-- php: = $selectedVisit->date_created->nice() --></td>
					</tr>
					<tr>
						<th>Diagnoses</th>
						<td>
							<!-- php: $diagnosisReport = ''; $baseCount = 0; foreach($selectedVisit->patient_visit_diagnoses as $visitDiagnosis) { foreach($visitDiagnosis->patient_visit_primary_diagnoses as $key => $diag) { $counter = ($key + $baseCount > 0 + $baseCount ? '<br/... -->	
						</td>
					</tr>
					<tr>
						<th>Attending Doctor</th>
						<td>
							<!-- php: $doctorForPatient = ''; foreach($selectedVisit->queue as $queue) { if($queue->status_id == 21) { $doctorForPatient = ($doctorForPatient == '' ? $queue->assigned_user->full_name : (', ' . $queue->assigned_user->full_name)); } } echo $doctorF... -->
						</td>
					</tr>
					<tr>
						<th>Referred By</th>
						<td>
							<!-- php: = $referral != null && $referral->has('user') ? $referral->user->full_name : '' -->
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- div class="row" style="margin-top: 20px; padding-bottom: 5px">
		<div class="col-md-12">
			<h3 style="padding: 5px; background: #ef6575; line-height: 25px">Details</h3>
		</div>
	</div -->

	<!-- Start Vitals Report -->
	<!-- php: if(sizeof($selectedVisit->patient_visit_vitals) > 0) { -->
		<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h3 style="line-height: 25px; padding: 0; margin: 0">Vitals</h3>
			</div>
		</div>

		<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

		<div class="row">
			<div class="col-md-12">
				
				<table class="table">
					<thead>
						<tr>
							<th>BP</th>
							<th>Pulse</th>
							<th>RR</th> 
							<th>Temp</th> 
							<th>SpO<sub>2</sub></th> 
							<th>Wt</th> 
							<th>GCS</th> 
						</tr>
					</thead>
					<tbody>
						<!-- php: // $lastVital = sizeof($selectedVisit->patient_visit_vitals) > 0 ? $selectedVisit->patient_visit_vitals[sizeof($selectedVisit->patient_visit_vitals) - 1] : null; foreach($selectedVisit->patient_visit_vitals as $lastVital) { -->
							<tr>
								<td><!-- php: = $lastVital->blood_pressure_1 -->/<!-- php: = $lastVital->blood_pressure_2 --> </td>
								<td><!-- php: = $lastVital->pulse --> bpm</td>
								<td><!-- php: = $lastVital->respiratory_rate --> cpm</td>
								<td><!-- php: = $lastVital->temperature --> <sup>o</sup>C</td>
								<td><!-- php: = $lastVital->oxygen_saturation --> </td>
								<td><!-- php: = $lastVital->weight --> Kg</td>
								<td><!-- php: = $lastVital->glasgow --></td>
							</tr>
						<!-- php: } -->
					</tbody>
				</table>
			</div>
		</div>
	<!-- php: } -->
	<!-- End Vital Report -->

	<!-- Start History Report -->
	<!-- php: if($selectedVisit->patient_visit_symptom != null) { -->
		<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h3 style="line-height: 25px; padding: 0; margin: 0">History</h3>
			</div>
		</div>

		<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

		<div class="row">
			<div class="col-md-12">
				<!-- php: $lastSymptom = $selectedVisit->patient_visit_symptom; if($lastSymptom != null) { -->
				<p>
					<!-- php: = $lastSymptom->history -->
				</p>
				<!-- php: } -->
			</div>
		</div>
	<!-- php: } -->
	<!-- End History Report -->

	<!-- Start History Report -->
	<!-- php: if(sizeof($selectedVisit->patient_visit_doctor_notes) > 0) { -->
		<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h3 style="line-height: 25px; padding: 0; margin: 0">Notes</h3>
			</div>
		</div>

		<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

		<div class="row">
			<div class="col-md-12">
				<!-- php: foreach ($selectedVisit->patient_visit_doctor_notes as $doctorNote): echo '<h5>' . $doctorNote->title . '</h5>'; echo '<p>' . $doctorNote->notes . '</p>'; endforeach; -->
			</div>
		</div>
	<!-- php: } -->
	<!-- End History Report -->

	<!-- Start Examination Report -->
	<!-- php: if($selectedVisit->has('patient_examination_general')) { -->
		<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h3 style="line-height: 25px; padding: 0; margin: 0">Examination</h3>
			</div>
		</div>

		<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

		<div class="row">
			<div class="col-md-12">
				<!-- php: $patientExam = $selectedVisit->has('patient_examination_general') ? $selectedVisit->patient_examination_general : null; if($patientExam != null) { -->
					<table>
						<tbody>
							<tr>
								<th style="width: 250px">Temperature:</th> 
								<td><!-- php: = (isset($patientExam) ? $patientExam->temperature : 'N/A') --></td>
							</tr>
							<tr>
								<th style="width: 250px">Pulse:</th> 
								<td><!-- php: = (isset($patientExam) ? $patientExam->pulse : 'N/A') --></td>
							</tr>
							<tr>
								<th style="width: 250px">Respiratory Rate:</th> 
								<td><!-- php: = (isset($patientExam) ? $patientExam->respiratory_rate : 'N/A') --></td>
							</tr>
							<tr>
								<th style="width: 250px">Hydration:</th> 
								<td><!-- php: = (isset($patientExam) ? $patientExam->hydration : 'N/A') --></td>
							</tr>
							<tr>
								<th style="width: 250px">Distress:</th> 
								<td><!-- php: = (isset($patientExam) ? $patientExam->distress : 'N/A') --></td>
							</tr>
							<tr>
								<th style="width: 250px">Mental State:</th> 
								<td><!-- php: = (isset($patientExam) ? $patientExam->mental_state : 'N/A') --></td>
							</tr>
							<tr>
								<th style="width: 250px">Constitution:</th> 
								<td><!-- php: = (isset($patientExam) ? $patientExam->constitution : 'N/A') --></td>
							</tr>
						</tbody>
					</table>
				<!-- php: } -->
			</div>
		</div>
	<!-- php: } -->
	<!-- End Examination Report -->

	<!-- Start Investigations Report -->
	<!-- php: if(sizeof($selectedVisit->request_labs) > 0) { -->
		<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h3 style="line-height: 25px; padding: 0; margin: 0">Investigations</h3>
			</div>
		</div>

		<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

		<div class="row">
			<div class="col-md-12">
				<!-- php: $patientLabs = $selectedVisit->request_labs; if(sizeof($patientLabs) > 0) { -->
					<table class="table">
						<thead>
							<tr>
								<th>Investigation</th>
								<th>Lab Test</th>
								<th>Status</th>
								<th>Comment</th>
								<th>Result</th>
							</tr>
						</thead>
						<tbody>
							<!-- php: foreach ($patientLabs as $requestLabItem) { -->
							<tr>
								<td><!-- php: = $requestLabItem->has('investigation') ? $requestLabItem->investigation->name : '' --></td>
								<td><!-- php: = $requestLabItem->has('lab_test') ? $requestLabItem->lab_test->name : '' --></td>
								<td><!-- php: = $requestLabItem->has('status') ? $requestLabItem->status->name : '' --></td>
								<td><!-- php: = h($requestLabItem->comment) --></td>
								<td><!-- php: = h($requestLabItem->result) --></td>
							</tr>
							<!-- php: } -->
						</tbody>
					</table>
				<!-- php: } -->
			</div>
		</div>
	<!-- php: } -->
	<!-- End Investigations Report -->

	<!-- Start Treatment Plan Report -->
	<!-- php: if(sizeof($selectedVisit->patient_visit_treatments) > 0) { -->
		<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h3 style="line-height: 25px; padding: 0; margin: 0">Treatment Plan</h3>
			</div>
		</div>

		<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

		<div class="row">
			<div class="col-md-12">
				<!-- php: if(sizeof($selectedVisit->patient_visit_treatments) > 0) { foreach ($selectedVisit->patient_visit_treatments as $patientTreatment) { echo '<p>' . $patientTreatment->treatment_plan . '</p>'; } } -->
			</div>
		</div>
	<!-- php: } -->
	<!-- End Treatment Plan Report -->

	<!-- Start Medications Report -->
	<!-- php: if(sizeof($selectedVisit->request_medications) > 0) { -->
		<div class="row" style="margin-top: 20px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
			<div class="col-md-12">
				<h3 style="line-height: 25px; padding: 0; margin: 0">Medications</h3>
			</div>
		</div>

		<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

		<div class="row">
			<div class="col-md-12">
				<!-- php: $patientMedications = $selectedVisit->request_medications; if(sizeof($patientMedications) > 0) { -->
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Drug</th>
								<th scope="col">Ruote</th>
								<th scope="col">Type</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							<!-- php: foreach ($patientMedications as $requestMedicationItem): -->
							<tr>
								<td><!-- php: = $requestMedicationItem->has('drug_stock') ? $requestMedicationItem->drug_stock->drug->full_name : '' --></td>
								<td><!-- php: = $requestMedicationItem->has('dosage_form') ? $requestMedicationItem->dosage_form->name : '' --></td>
								<td><!-- php: = $requestMedicationItem->has('medication_type') ? $requestMedicationItem->medication_type->type_name : '' --></td>
								<td><!-- php: = $requestMedicationItem->has('status') ? $requestMedicationItem->status->name : '' --></td>
							</tr>
							<!-- php: endforeach; -->
						</tbody>
					</table>
				<!-- php: } -->
			</div>
		</div>
	<!-- php: } -->
	<!-- End Medications Report -->

	<div class="row" style="margin-top: 40px">
		<div class="col-md-12">
			<h4 align="left">Thank you.</h4>
		</div>
		
		<div class="col-md-12" style="border-bottom: 1px solid #8a8a8a;">
			<h4 align="right">............................</h4>
			<h4 align="right" style="padding-right: 30px;">Signature</h4>
		</div>
	</div>

</div>
`;

export default function ElementElementPatientvisitReportReferralReport() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
