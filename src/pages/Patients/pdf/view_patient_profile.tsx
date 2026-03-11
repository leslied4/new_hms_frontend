import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/Patients/pdf/view_patient_profile.php';
const rawHtml = `
<style>
	b {
		display: inline-block;
		width: 150px;
	}
	
	.pull-right {
		display: inline-block;
	}
	.pv-header {
		background-color:yellow;
		color:red;

	}
	
</style>
<div class="tab-pane active fontawesome-demo" style="line-height: 27px;" id="tab10">
	<div id="biography" >
	    <center><h3 class="font-bold">Patient Visit Report</h3></center>
		<div id="visit-report">
			<h4 class="font-bold">
				Patient Details
			</h4>
			<hr>
			<div class="col-md-5">
				<ul class="list-group list-group-unbordered">
					<li class="list-group-item">
						<b>Name</b> <a class="pull-right"><!-- php: = $vreports->patient->first_name --> </a>
					</li>
					<li class="list-group-item">
						<b>Address</b> <a class="pull-right"><!-- php: =$vreports->patient->home_address --> </a>
					</li>
					<li class="list-group-item">
						<b>Sex</b> <a class="pull-right"><!-- php: =$vreports->patient->gender->name --> </a>
					</li>
					<li class="list-group-item">
						<b>DOB</b> <a class="pull-right"><!-- php: =$vreports->patient->date_of_birth --> </a>
					</li>
					<li class="list-group-item">
						<b>Tel</b> <a class="pull-right"><!-- php: =$vreports->patient->phone --> </a>
					</li>
					<li class="list-group-item">
						<b>Patient Code</b> <a class="pull-right"><!-- php: =$vreports->patient->code --> </a>
					</li>
					<li class="list-group-item">
						<b>Folder No.</b> <a class="pull-right"><!-- php: =$vreports->patient->folder_number --> </a>
					</li>
				</ul>
			</div>
			<br>
			<h4 class="font-bold">General Practitioner</h4>
			<hr>
			<div class="col-md-5">
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Doctor code</b> <a class="pull-right"><!-- php: = $patient->folder_number --> </a>
						</li>
						<li class="list-group-item">
							<b>Hospital Code</b> <a class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" --> </a>
						</li>
					</ul>
				</div>
			<br>
			<h4 class="font-bold">Admission Details</h4>
			<hr>
			<div class="col-md-5">
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Date</b> <a class="pull-right"><!-- php: = $patient->folder_number --> </a>
						</li>
						<li class="list-group-item">
							<b>Hospital</b> <a class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" --> </a>
						</li>
						<li class="list-group-item">
							<b>Ward</b> <a class="pull-right"><!-- php: =isset($patient->blood_group)? $patient->blood_group->name : "" --> </a>
						</li>
						<li class="list-group-item">
							<b>Method</b> <a class="pull-right"><!-- php: =isset($patient->blood_group)? $patient->blood_group->name : "" --> </a>
						</li>
					</ul>
				</div>
			<br>
			<h4 class="font-bold">Discharge Details</h4>
			<hr>
			<div class="col-md-5">
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Date</b> <a class="pull-right"><!-- php: = $patient->folder_number --> </a>
						</li>
						<li class="list-group-item">
							<b>Consultant</b> <a class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" --> </a>
						</li>
						<li class="list-group-item">
							<b>Specialty</b> <a class="pull-right"><!-- php: =isset($patient->blood_group)? $patient->blood_group->name : "" --> </a>
						</li>
						<li class="list-group-item">
							<b>Discharge Address</b> <a class="pull-right"><!-- php: =isset($patient->blood_group)? $patient->blood_group->name : "" --> </a>
						</li>
					</ul>
				</div>
			<br>
			<h4 class="font-bold">Diagnosis</h4>
			<hr>
			<div class="col-md-5">
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Presenting Complaint</b> <a class="pull-right"><!-- php: = isset($dreports->symptom)? $dreports->symptom->chief_complaint : 'N/A' --> </a>
						</li>
						<li class="list-group-item">
							<b>Primary Diagnosis</b> <a class="pull-right"><!-- php: =isset($dreports->diagnosis)? $dreports->diagnosis->primary_diagnosis : 'N/A' --> </a>
						</li>
						<li class="list-group-item">
							<b>Seconday Diagnosis</b> <a class="pull-right"><!-- php: =isset($dreports->diagnosis)? $dreports->diagnosis->secondary_diagnosis : 'N/A' --> </a>
						</li>
						<li class="list-group-item">
							<b>Co-morbidities</b> <a class="pull-right"><!-- php: =isset($dreports->symptom)? $dreports->symptom->co-mordities : 'N/A' --> </a>
						</li>
						<li class="list-group-item">
							<b>Procedures</b> <a class="pull-right"><!-- php: =isset($dreports->diagnosis) ? $dreports->diagnosis->procedure_instructions : 'N/A' --> </a>
						</li>
					</ul>
				</div>
			<br>
			<h4 class="font-bold">Investigations and Results</h4>
			<hr>
			<div class="col-md-5">
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Labs and Results</b> <a class="pull-right"><!-- php: = $patient->folder_number --> </a>
						</li>
						<li class="list-group-item">
							<b>Other Investigations and Results</b> <a class="pull-right"><!-- php: =isset( $patient->gender)? $patient->gender->name : "" --> </a>
						</li>
					</ul>
				</div>
			<br>
			<h4 class="font-bold">Clinical Summary</h4>
			<hr>
			<div class="col-md-5">
					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Clinical Summary</b> <a class="pull-right"><!-- php: =isset($dreports->diagnosis) ? $dreports->diagnosis->clinical_summary : 'N/A' --> </a>
						</li>
					</ul>
				</div>
			<br>
			<h4 class="font-bold">Allergies and Adverse Reactions</h4>
			<hr>
			<div class="col-md-5">
				<ul class="list-group list-group-unbordered">
					<li class="list-group-item">
						<b>Allergy</b> <a class="pull-right"><!-- php: = $patient->folder_number --> </a>
					</li>
				</ul>
				<ul class="list-group list-group-unbordered">
					<li class="list-group-item">
						<b>Allergen/Reaction</b> <a class="pull-right"><!-- php: = $patient->folder_number --> </a>
					</li>
				</ul>
			</div>
			<br>
		</div>
	</div>
</div>
`;

export default function PatientsPdfViewPatientProfilePage() {
  return (
    <PageShell title="Patients/pdf/view_patient_profile.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
