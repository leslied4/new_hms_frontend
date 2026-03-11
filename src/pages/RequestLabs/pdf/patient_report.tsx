import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/RequestLabs/pdf/patient_report.php';
const rawHtml = `
<!-- php: $patient = $requestLab->patient_visit->patient; -->

<div id="drug-chart" style="border-top: 4px solid #dddddd; border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-radius: 7px; padding: 20px">
	
	<!-- php: = $this->element(trim(Cake\Core\Configure::read('LETTER_HEAD')) != '' ? Cake\Core\Configure::read('LETTER_HEAD') : 'letter_head_default') -->
	
	<div class="row" style="border-top: 1px solid #cdcdcd">
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

	<div style="max-width: 600px; margin-top: 5px">
		<hr style="background: #ef6575; height: 2px; margin: 0px !important;">
		<ul class="list-group list-group-unbordered" style="padding-left: 7px">
			<li class="list-group-item" style="height: 65px">
				<b>Lab Test</b>
				<div class="profile-desc-item pull-right" style="width: 350px; display: flex; height: auto"><!-- php: = isset($requestLab->lab_test) ? $requestLab->lab_test->name : 'N/A' --></div>
			</li>
			<li class="list-group-item">
				<b>Lab No.</b>
				<div class="profile-desc-item pull-right" style="width: 350px"><!-- php: = $requestLab->specimen_no --></div>
			</li>
			<li class="list-group-item">
				<b>Sample Type</b>
				<div class="profile-desc-item pull-right" style="width: 350px"><!-- php: = $requestLab->has('specimen_type') ? $requestLab->specimen_type->name : '' --></div>
			</li>
			<li class="list-group-item">
				<b>Performed By</b>
				<div class="profile-desc-item pull-right" style="width: 350px"><!-- php: = ($requestLab->has('assigned_user')) ? $requestLab->assigned_user->first_name . ' ' . $requestLab->assigned_user->last_name : '' --></div>
			</li>
			<li class="list-group-item">
				<b>Report Date/Time</b>
				<div class="profile-desc-item pull-right" style="width: 350px"><!-- php: = date("Y-m-d"); --></div>
			</li>
		</ul>
	</div>

	<br/>
	<div class="row" style="margin-top: 0px; padding-bottom: 0px; padding-left: 5px; color: #ef6575;">
		<div class="col-md-12">
			<h4 style="line-height: 18px; padding: 0; margin: 0">RESULTS AND DETAILS REPORT</h4>
		</div>
	</div>

	<hr style="background: #ef6575; height: 2px; margin-top: 2px; margin-down: 2px">

	<div class="row">
		<div class="col-md-12">

			<table class="table" >
				<thead>
					<tr>
						<th class="left">Test</th>
						<th class="left">Result</th>
						<th class="left">Flag</th>
						<th class="left">Unit</th>
						<th class="left">Reference</th>
					</tr>
				</thead>
				<tbody>
					<!-- php: foreach ($requestLab->lab_test_results as $result): -->
						<tr>
							<td class="left"><!-- php: = $result->has('lab_template') && $result->lab_template->label_name != 'Result' ? $result->lab_template->label_name : '' --></td>
							<td class="left"><!-- php: = $result->normal_value --></td>
							<td class="left"><!-- php: = $result->has('result_flag') ? $result->result_flag->name : '' --></td>
							<td class="left"><!-- php: = $result->unit_of_measurement --></td>
							<td class="left"><!-- php: = $result->reference_value --></td>
						</tr>
					<!-- php: endforeach; -->									
				</tbody>
			</table>
		</div>
	</div>
	<!-- End Medications Report -->
	
	<p>
		<span><strong>FLAG KEY:</strong></span> 
		<b>H</b> = HIGH 
		<b>L</b> = LOW
	</p>
	
	<div style="margin-top: 5px">
		<hr style="background: #ef6575; height: 2px; margin: 0px !important;">
		<ul class="list-group list-group-unbordered" style="padding-left: 7px">
			<li class="list-group-item">
				<b>Comment</b>
				<div class="profile-desc-item pull-right" style="width: 200px"><!-- php: = $requestLab->comment --></div>
			</li>
		</ul>
	</div>
	
</div>
`;

export default function RequestLabsPdfPatientReportPage() {
  return (
    <PageShell title="RequestLabs/pdf/patient_report.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
