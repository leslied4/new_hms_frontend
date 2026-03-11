import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/RequestLabs/pdf/patient_visit_report.php';
const rawHtml = `
<!-- php: = $this->Html->css('../assets/plugins/bootstrap/css/pdffont1.css') -->

<!-- php: $patient = $patientVisit->patient; -->

<div id="drug-chart" class="pdfpage" style="border-top: 4px solid #dddddd; border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-radius: 7px; padding: 20px">
	
	
	<div class="row" style="margin-top: 0px; padding-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-left: 5px; color: #ef6575; border-top: 3px solid #23ad32; border-bottom: 3px solid #23ad32; ">
		<div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">
			<h4 align="center" style="line-height: 18px; padding-top: 10px; padding-bottom: 10px; margin: 0">MEDICAL LABORATORY REPORT</h4>
		</div>
	</div>
	
	<div class="row" style="border-top: 1px solid #cdcdcd; padding-top: 10px">
		<div class="col-md-12">
			<div class="pull-left" style="float: left">
				<!-- php: if(Cake\Core\Configure::read('SHOW_LAB_REPORT_IMAGE') == 1) { -->
					<div style="float: left; width 140px; padding: 5px 10px 10px 0; margin-right: 10px">
						<!-- php: $pic = $patient->has('image') && $patient->image->file_path != null ? $patient->image->file_path : (($patient->gender_id ==2) ? 'dp2.jpg' : 'dp3-.jpg'); echo $this->Html->image($pic,['style' =>'width: 100px; height: auto', 'fullBase' => tru... -->
					</div>
				<!-- php: } -->
				
				<table>
					<tbody>
						<tr>
							<th style="width: 100px">Name</th> 
							<td><!-- php: = $patient->first_name.' '. $patient->last_name --> </td>
						</tr>
						<tr>
							<th>Age</th>
							<td><!-- php: = isset($patient->date_of_birth) ? $patient->age . ' Years' : 'N/A' --></td>
						</tr>
						<tr>
							<th>Sex</th>
							<td><!-- php: = $patient->gender->name --> </td>
						</tr>
						<tr>
							<th>Clinician</th>
							<td><!-- php: = $patientVisit->clinician --> </td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="pull-right" style="float: right">
				<table>
					<tbody>
						<tr>
							<th style="width: 180px">Lab No.</th>
							<td><!-- php: = $patientVisit->lab_no --> </td>
						</tr>
						<tr>
							<th>Sample Type(s)</th>
							<td><!-- php: = $patientVisit->sample_types --> </td>
						</tr>
						<tr>
							<th>Date Sample Taken</th>
							<td><!-- php: = isset($patientVisit->specimen_drawn_date) && $patientVisit->specimen_drawn_date != null ? $patientVisit->specimen_drawn_date->i18nFormat('Y-MM-dd HH:mm') : '' --> </td>
						</tr>
						<tr>
							<th>Date Sample Analysed</th>
							<td><!-- php: = isset($patientVisit->specimen_analyzed_date) && $patientVisit->specimen_analyzed_date != null ? $patientVisit->specimen_analyzed_date->i18nFormat('Y-MM-dd HH:mm') : '' --> </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div style="clear: both"></div>

	<br/>
	
	<div class="row" style="margin-top: 0px; margin-bottom: 3px; margin-left: 0px; margin-right: 0px; padding-top: 7px; padding-bottom: 7px; padding-left: 5px; color: #ef6575; border-top: 3px solid #23ad32; border-bottom: 3px solid #23ad32; ">
		<div class="col-md-12" style="padding-left: 0px; padding-right: 0px">
			<h5 style="line-height: 14px; padding: 0; margin: 0"><strong>TEST REQUESTED: <!-- php: = $patientVisit->completed_lab_tests --></strong></h5>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">

			<table class="table" >
				<thead>
					<tr style="line-height: 12px">
						<th class="left" style="border-bottom: 1px solid #23ad32; border-top: 1px solid #23ad32;">TEST</th>
						<th class="left" style="border-bottom: 1px solid #23ad32; border-top: 1px solid #23ad32;">RESULT</th>
						<th class="left" style="border-bottom: 1px solid #23ad32; border-top: 1px solid #23ad32;">FLAG</th>
						<th class="left" style="border-bottom: 1px solid #23ad32; border-top: 1px solid #23ad32;">UNIT</th>
						<th class="left" style="border-bottom: 1px solid #23ad32; border-top: 1px solid #23ad32;">REFERENCE</th>
					</tr>
				</thead>
				<tbody>
					<!-- php: foreach ($patientVisit->request_labs as $requestLab): -->
						<!-- php: // Skip cancelled labs if($requestLab->status_id == 24) { continue; } -->
                  
						<!-- php: if(sizeof($requestLab->lab_test->lab_templates) > 0 && $requestLab->lab_test->lab_templates[0]->label_name != 'Result') { -->
							<tr style="line-height: 12px">
								<td colspan="1"><span  style="border-bottom: 1px solid #23ad32; color: #23ad32;"><!-- php: = $requestLab->lab_test->name --></span></td>
								<td colspan="4" style="border: none"></td>
							</tr>
						<!-- php: } -->
					
						<!-- php: foreach ($requestLab->lab_test_results as $result): -->
							<tr style="line-height: 10px">
								<td class="left" style="border: none"><!-- php: = $result->has('lab_template') && $result->lab_template->label_name != 'Result' ? $result->lab_template->label_name : $requestLab->lab_test->name --></td>
								<td class="left" style="border: none"><!-- php: = $result->normal_value --></td>
								<td class="left" style="border: none"><!-- php: = $result->has('result_flag') ? $result->result_flag->name : '' --></td>
								<td class="left" style="border: none"><!-- php: = $result->unit_of_measurement --></td>
								<td class="left" style="border: none"><!-- php: = $result->reference_value --></td>
							</tr>
						<!-- php: endforeach; -->						
					
						<!-- php: if(null !==($requestLab->comment) && trim($requestLab->comment) != '') { -->
							<tr style="line-height: 10px">
								<td colspan="5" style="border: none"><small><em>Comment >>> <!-- php: = $requestLab->comment --></em></small></td>
							</tr>
						<!-- php: } -->
							<tr style="line-height: 10px">
								<td colspan="5" style="border: none"></td>
							</tr>
					<!-- php: endforeach; -->									
				</tbody>
			</table>
		</div>
	</div>
	<!-- End Medications Report -->
	
	<!-- p>
		<span><strong>FLAG KEY:</strong></span> 
		<b>H</b> = HIGH 
		<b>N</b> = NORMAL 
		<b>L</b> = LOW
	</p -->

	<br/>
	<br/>
	<span>Report Date: <!-- php: = date('d/m/Y') --></span><br/>
	<span>Biomedical Scientist</span><br/>
	<span><!-- php: = $patientVisit->completed_by --></span>
</div>

<script>
	window.print();
</script>
`;

export default function RequestLabsPdfPatientVisitReportPage() {
  return (
    <PageShell title="RequestLabs/pdf/patient_visit_report.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
