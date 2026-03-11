import PageShell from '../../../components/PageShell';

const sourcePath = 'templates/RequestMedications/pdf/patient_report.php';
const rawHtml = `
<style>
	.legend-row {
		padding: 5px;
		border: 1px solid #000;
	}
	
	.horizontal-row-title {
		display: inline-block;
		width: 200px;
	}
	
	.horizontal-row-content {
		display: inline-block;
	}
	
</style>

<div class="print-box">
	<div class="print-head">
		<h3 align="center">Medication Report</h3>
	</div>
	
	<div class="print-body">
														
		<div class="legend-row">
			<div class="horizontal-row-title">Patient Name</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->has('visit') && isset($requestMedication->visit->patient) ? $requestMedication->visit->patient->first_name . ' ' . $requestMedication->visit->patient->last_name : '' --></div>
		</div>
	
		<div class="legend-row">
			<div class="horizontal-row-title">Patient Code</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->has('visit') && isset($requestMedication->visit->patient) ? $requestMedication->visit->patient->code : 'N/A' --></div>
		</div>
	
		<div class="legend-row">
			<div class="horizontal-row-title">Drug</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->has('drug') ? $requestMedication->drug->name : 'N/A' --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Dosage</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->frequency --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Number of Days</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->number_of_days --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Quantity</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->quantity --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Dosage Form</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->has('dosage_form') ? $requestMedication->dosage_form->name : 'N/A' --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Allergy</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->allergy --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Repeat Prescription</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->repeat_prescription == 1 ? 'Yes' : 'No' --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Refill Date</div>
			<div class="horizontal-row-content"><!-- php: = isset($requestMedication->refill_date) ? $requestMedication->refill_date->nice() : '' --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Prescribed By</div>
			<div class="horizontal-row-content"><!-- php: = $requestMedication->user->first_name . ' ' . $requestMedication->user->last_name --></div>
		</div>
		
		<div class="legend-row">
			<div class="horizontal-row-title">Completed By</div>
			<div class="horizontal-row-content"><!-- php: = ($requestMedication->has('user_updated')) ? $requestMedication->user_updated->first_name . ' ' . $requestMedication->user_updated->last_name : '' --></div>
		</div>
				
	</div>
</div>
`;

export default function RequestMedicationsPdfPatientReportPage() {
  return (
    <PageShell title="RequestMedications/pdf/patient_report.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
